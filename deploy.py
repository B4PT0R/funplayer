#!/usr/bin/env python3
"""
deploy.py – Pipeline de déploiement dual React/Streamlit
--------------------------------------------------------

Pipeline entièrement automatisé pour projet séparé en deux packages :
    1. Git repo clean check
    2. Version source depuis funplayer.toml
    3. Check versions déjà publiées
    4. Increment patch + sync vers tous les fichiers de config
    5. Build funplayer (React package normal)
    6. Build funplayer embed 
    7. Build frontend Streamlit
    8. Set _RELEASE=True si nécessaire
    9. Build package Python Streamlit
    10. Validation des builds
    11. Git push + tag
    12. Publish funplayer-react sur npm (avec gestion gracieuse erreurs)
    13. Publish streamlit-funplayer sur PyPI (avec gestion gracieuse erreurs)
    14. Install local -e upgrade

Usage:
    python deploy.py          # Déploiement complet
    python deploy.py --dry-run # Test sans publication

Chaque étape est loggée ; en cas d'échec, message clair.
"""

def main():
    # ────────────────────────── IMPORTS STANDARD ─────────────────────────
    import os
    import sys
    import json
    import shutil
    import subprocess
    import textwrap
    from pathlib import Path
    from contextlib import contextmanager

    # ────────────────────────── LOGGING HELPERS ──────────────────────────
    def log(step: str, msg: str):
        print(f"▶️  [{step}] {msg}")

    def fail(step: str, msg: str, code: int = 1):
        print(f"❌ [{step}] {msg}")
        sys.exit(code)

    def run(cmd, step, cwd=None, quiet=False):
        """Subprocess wrapper avec message d'erreur propre."""
        if not quiet:
            log(step, " ".join(cmd))
        try:
            subprocess.run(cmd, cwd=cwd, check=True)
        except subprocess.CalledProcessError as e:
            fail(step, f"commande « {' '.join(e.cmd)} » → code {e.returncode}")

    def run_publish(cmd, step, cwd=None, ignore_already_published=True):
        """Subprocess wrapper spécial pour publications avec gestion gracieuse des erreurs."""
        log(step, " ".join(cmd))
        try:
            result = subprocess.run(cmd, cwd=cwd, check=True, capture_output=True, text=True)
            return True
        except subprocess.CalledProcessError as e:
            error_output = e.stderr.lower() if e.stderr else ""
            
            if ignore_already_published and any(phrase in error_output for phrase in [
                "already exists", "cannot publish over", "version already published"
            ]):
                log(step, "Version déjà publiée (skipped)")
                return False
            else:
                fail(step, f"commande « {' '.join(e.cmd)} » → code {e.returncode}\n{e.stderr}")
                
        return False

    @contextmanager
    def step(name: str):
        log(name, "démarrage…")
        try:
            yield
            log(name, "OK")
        except Exception as exc:
            fail(name, str(exc))

    # ────────────────────────── PRÉ-REQUIS SYSTÈME ───────────────────────
    if shutil.which("git") is None:
        fail("Pré-requis", "git introuvable dans le PATH")
    
    if shutil.which("npm") is None:
        fail("Pré-requis", "npm introuvable dans le PATH")

    # ────────────────────────── LIBS PYTHON ──────────────────────────────
    def ensure_libs():
        try:
            import toml, build, twine, dotenv, requests  # noqa
        except ImportError:
            run(
                [
                    sys.executable,
                    "-m",
                    "pip",
                    "install",
                    "--upgrade",
                    "build",
                    "twine",
                    "toml",
                    "python-dotenv",
                    "requests",
                ],
                step="Install dépendances",
                quiet=True,
            )

    ensure_libs()
    import toml, requests
    from dotenv import load_dotenv
    from requests.exceptions import RequestException

    # ────────────────────────── FONCTIONS UTIL ───────────────────────────
    def safe_get(url, **kw):
        try:
            return requests.get(url, timeout=10, **kw)
        except RequestException as e:
            raise RuntimeError(f"erreur réseau : {e}") from None

    def bump_patch(version: str) -> str:
        """Incrémente le patch X.Y.Z → X.Y.(Z+1) avec validation."""
        parts = version.split(".")
        if len(parts) != 3 or not all(p.isdigit() for p in parts):
            raise RuntimeError(f"format de version invalide : « {version} »")
        major, minor, patch = map(int, parts)
        return f"{major}.{minor}.{patch + 1}"

    def update_json_file(file_path: Path, version: str, step_name: str):
        """Met à jour la version dans un fichier JSON."""
        if file_path.exists():
            data = json.loads(file_path.read_text())
            data["version"] = version
            file_path.write_text(json.dumps(data, indent=2))
            log(step_name, f"{file_path.name} version → {version}")

    def update_init_release_flag(init_file: Path):
        """Met _RELEASE=True dans __init__.py si actuellement False."""
        if not init_file.exists():
            return False
        
        content = init_file.read_text()
        if "_RELEASE = False" in content:
            new_content = content.replace("_RELEASE = False", "_RELEASE = True")
            init_file.write_text(new_content)
            log("_RELEASE flag", f"{init_file} → _RELEASE = True")
            return True
        return False

    # ────────────────────────── CONTEXTE GLOBAL ─────────────────────────
    # Répertoire racine = répertoire du script deploy.py 
    ROOT = Path(__file__).parent
    FUNPLAYER_TOML = ROOT / "funplayer.toml"
    FUNPLAYER_DIR = ROOT / "funplayer"
    STREAMLIT_DIR = ROOT / "streamlit_funplayer"
    
    # Mode dry-run
    DRY_RUN = "--dry-run" in sys.argv
    if DRY_RUN:
        print("🔍 Mode DRY-RUN activé - aucune publication ne sera effectuée")
    
    # Vérification structure projet
    if not FUNPLAYER_TOML.exists():
        fail("Structure", "funplayer.toml introuvable à la racine")
    if not FUNPLAYER_DIR.exists():
        fail("Structure", "dossier /funplayer introuvable")
    if not STREAMLIT_DIR.exists():
        fail("Structure", "dossier /streamlit_funplayer introuvable")

    load_dotenv()  # Load .env if present, but tokens can come from .bashrc
    GITHUB_TOKEN = os.getenv("GITHUB_TOKEN") or fail("ENV", "GITHUB_TOKEN manquant dans l'environnement")
    HEADERS = {"Authorization": f"Bearer {GITHUB_TOKEN}"}

    # ────────────────────────── PIPELINE ────────────────────────────────
    try:
        with step("Infos GitHub"):
            user = safe_get("https://api.github.com/user", headers=HEADERS).json()
            GH_LOGIN = user.get("login") or "unknown"
            GH_NAME = user.get("name") or GH_LOGIN
            GH_MAIL = user.get("email") or f"{GH_LOGIN}@users.noreply.github.com"

        with step("Version depuis funplayer.toml"):
            funplayer_config = toml.load(FUNPLAYER_TOML)
            old_version = funplayer_config["project"]["version"]
            new_version = bump_patch(old_version)
            
            # Mise à jour funplayer.toml
            funplayer_config["project"]["version"] = new_version
            FUNPLAYER_TOML.write_text(toml.dumps(funplayer_config))
            log("Version", f"funplayer.toml: {old_version} → {new_version}")

        with step("Check versions déjà publiées"):
            if not DRY_RUN:
                # Check npm - lire le nom du package depuis package.json
                funplayer_pkg = json.loads((FUNPLAYER_DIR / "package.json").read_text())
                npm_package_name = funplayer_pkg.get("name", "funplayer-react")
                
                npm_check = subprocess.run(
                    ["npm", "view", f"{npm_package_name}@{new_version}"],
                    capture_output=True, cwd=FUNPLAYER_DIR
                )
                if npm_check.returncode == 0:
                    fail("Version check", f"Version {new_version} déjà publiée sur npm")
                
                # Check PyPI
                pypi_check = safe_get(f"https://pypi.org/pypi/streamlit-funplayer/{new_version}/json")
                if pypi_check.status_code == 200:
                    fail("Version check", f"Version {new_version} déjà publiée sur PyPI")
                    
                log("Check versions", f"Version {new_version} disponible sur npm et PyPI ✓")
            else:
                log("Check versions", "[DRY-RUN] Check versions skippé")

        with step("Sync versions"):
            # Update /funplayer/package.json
            update_json_file(
                FUNPLAYER_DIR / "package.json", 
                new_version, 
                "Sync versions"
            )
            
            # Update /streamlit_funplayer/streamlit_funplayer/frontend/package.json
            update_json_file(
                STREAMLIT_DIR / "streamlit_funplayer" / "frontend" / "package.json",
                new_version,
                "Sync versions"
            )
            
            # Update /streamlit_funplayer/pyproject.toml
            streamlit_pyproject = STREAMLIT_DIR / "pyproject.toml"
            if streamlit_pyproject.exists():
                streamlit_config = toml.load(streamlit_pyproject)
                streamlit_config["project"]["version"] = new_version
                streamlit_pyproject.write_text(toml.dumps(streamlit_config))
                log("Sync versions", f"streamlit pyproject.toml → {new_version}")

        with step("Nettoyage builds"):
            # Clean funplayer builds
            for build_dir in ["build", "build-embed"]:
                shutil.rmtree(FUNPLAYER_DIR / build_dir, ignore_errors=True)
            
            # Clean streamlit builds  
            shutil.rmtree(STREAMLIT_DIR / "streamlit_funplayer" / "frontend" / "build", ignore_errors=True)
            shutil.rmtree(STREAMLIT_DIR / "build", ignore_errors=True)
            shutil.rmtree(STREAMLIT_DIR / "dist", ignore_errors=True)
            
            # Clean Python artifacts
            for egg in STREAMLIT_DIR.glob("*.egg-info"):
                shutil.rmtree(egg, ignore_errors=True)
            for p in ROOT.rglob("__pycache__"):
                shutil.rmtree(p, ignore_errors=True)

        with step("Build funplayer React"):
            # Install npm dependencies
            run(["npm", "install"], "npm install", cwd=FUNPLAYER_DIR, quiet=True)
            
            # Build normal
            run(["npm", "run", "build"], "npm build", cwd=FUNPLAYER_DIR)
            
            # Build embed
            run(["npm", "run", "build:embed"], "npm build:embed", cwd=FUNPLAYER_DIR)
            
            log("Build funplayer React", "Builds normal + embed terminés")

        with step("Build frontend Streamlit"):
            streamlit_frontend = STREAMLIT_DIR / "streamlit_funplayer" / "frontend"
            
            # Install npm dependencies
            run(["npm", "install"], "streamlit npm install", cwd=streamlit_frontend, quiet=True)
            
            # Build
            run(["npm", "run", "build"], "streamlit npm build", cwd=streamlit_frontend)

        with step("Check _RELEASE flag"):
            init_file = STREAMLIT_DIR / "streamlit_funplayer" / "streamlit_funplayer" / "__init__.py"
            release_updated = update_init_release_flag(init_file)
            if not release_updated:
                log("_RELEASE flag", "_RELEASE déjà à True ou non trouvé")

        with step("Build package Python Streamlit"):
            run([sys.executable, "-m", "build"], "python build", cwd=STREAMLIT_DIR, quiet=True)

        with step("Validation builds"):
            # Vérifier builds funplayer React
            required_files = [
                FUNPLAYER_DIR / "build" / "index.js",
                FUNPLAYER_DIR / "build" / "style.css", 
                FUNPLAYER_DIR / "build-embed" / "funplayer-embed.js"
            ]
            
            for file in required_files:
                if not file.exists():
                    fail("Validation builds", f"Fichier manquant: {file}")
                    
            # Vérifier build Streamlit
            streamlit_build = STREAMLIT_DIR / "streamlit_funplayer" / "frontend" / "build"
            if not streamlit_build.exists() or not list(streamlit_build.glob("index.html")):
                fail("Validation builds", "Build frontend Streamlit manquant ou vide")
                
            # Vérifier package Python
            dist_files = list((STREAMLIT_DIR / "dist").glob("*.whl"))
            if not dist_files:
                fail("Validation builds", "Package Python (.whl) manquant")
                
            log("Validation builds", "Tous les builds sont présents ✓")

        with step("Git push"):
            if not (ROOT / ".git").exists():
                run(["git", "init"], "git init")
                run(["git", "add", "."], "git add .")
                run(["git", "commit", "-m", "Initial commit"], "git commit")
                
                # Setup remote si nécessaire
                remotes = subprocess.run(["git", "remote"], capture_output=True, text=True).stdout.splitlines()
                if "origin" not in remotes:
                    repo_url = f"https://github.com/{GH_LOGIN}/funplayer.git"
                    run(["git", "remote", "add", "origin", repo_url], "git remote add")
                    run(["git", "branch", "-M", "main"], "git branch -M main")
                    run(["git", "push", "-u", "origin", "main"], "git push -u origin main")

            run(["git", "add", "."], "git add .")
            run(["git", "commit", "-m", f"Release v{new_version}"], "git commit")
            run(["git", "tag", f"v{new_version}"], "git tag")
            run(["git", "push"], "git push")
            run(["git", "push", "--tags"], "git push tags")

        with step("Publish funplayer-react sur npm"):
            # Lire le nom du package depuis package.json
            funplayer_pkg = json.loads((FUNPLAYER_DIR / "package.json").read_text())
            npm_package_name = funplayer_pkg.get("name", "funplayer-react")
            
            if DRY_RUN:
                log("Publish npm", f"[DRY-RUN] npm publish {npm_package_name} (skipped)")
            else:
                run_publish(["npm", "publish"], f"npm publish {npm_package_name}", cwd=FUNPLAYER_DIR)

        with step("Publish streamlit-funplayer sur PyPI"):
            if shutil.which("twine") is None:
                raise RuntimeError("twine introuvable")
            
            if DRY_RUN:
                log("Publish PyPI", "[DRY-RUN] twine upload (skipped)")
            else:
                run_publish(["twine", "upload", "dist/*"], "twine upload", cwd=STREAMLIT_DIR)

        with step("Install local upgrade"):
            run(
                [sys.executable, "-m", "pip", "install", "--upgrade", "-e", "."],
                "pip install -e upgrade",
                cwd=STREAMLIT_DIR,
                quiet=True,
            )

        if DRY_RUN:
            print("🔍 DRY-RUN terminé avec succès !")
            print(f"Version {new_version} prête à être déployée:")
            print("   • Tous les builds validés ✓")
            print("   • Git pushé ✓") 
            print("   • Publications skippées (mode dry-run)")
            print("\nPour publier réellement: relancer sans --dry-run")
        else:
            print("🎉  Déploiement terminé avec succès !")
            print(f"🔗 Version {new_version} déployée :")
            
            # Lire le nom du package npm pour l'affichage
            funplayer_pkg = json.loads((FUNPLAYER_DIR / "package.json").read_text())
            npm_package_name = funplayer_pkg.get("name", "funplayer-react")
            
            print(f"   • npm: https://www.npmjs.com/package/{npm_package_name}")
            print(f"   • PyPI: https://pypi.org/project/streamlit-funplayer/")
            print(f"   • GitHub: https://github.com/{GH_LOGIN}/funplayer")
            print(f"   • Installé localement en mode dev")

    except KeyboardInterrupt:
        fail("Global", "interrompu par l'utilisateur")
    except Exception as e:
        fail(
            "Global",
            textwrap.dedent(
                f"""
                Erreur inattendue : {type(e).__name__}: {e}
                Active un mode verbose ou consulte la trace pour le détail.
                """
            ).strip(),
        )


if __name__ == "__main__":
    main()
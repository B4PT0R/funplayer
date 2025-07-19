# FunPlayer - Development Guidelines

## 🏗️ Architecture Patterns

### ✅ **Pattern Core + Managers Autonomes**

```javascript
// ✅ BON: class FunPlayerCore centralisant l'accès aux managers avec notifier unique passé en prop
class FunPlayerCore {
  get buttplug() {
    if (!this._buttplug) {
      this._buttplug = new ButtPlugManager(this._notify);
    }
    return this._buttplug;
  }
}

// ✅ BON: Managers autonomes, pas de dépendances entre eux
class ButtPlugManager {
  constructor(notify) {
    this.notify = notify;
    // Logique autonome device/actuators
  }
}
```

```javascript
// ❌ ÉVITER: Dépendances directes entre managers
class ButtPlugManager {
  constructor(funscriptManager) {  // ❌ Couplage tight
    this.funscript = funscriptManager;
  }
}
```

### ✅ **Pattern Notification Centralisé**

```javascript
// ✅ BON: Notifications directes dans les méthodes devant avoir un impact réactif
setGlobalScale(scale) {
  this.globalScale = scale;
  // Notification immédiate là où ça se passe
  this.notify?.('buttplug:globalScale', { scale });
}

// ✅ BON: Event handlers centralisés dans Core 
handleCoreEvents(event, data) {
  switch (event) {
    case 'buttplug:device':
      this._handleButtplugDevice(data);
      break;
  }
}
```

```javascript
// ❌ ÉVITER: Indirections inutiles
setGlobalScale(scale) {
  this.globalScale = scale;
  this._notifyGlobalScaleChanged(scale);  // ❌ indirection supplémentaire
}

_notifyGlobalScaleChanged(scale) {        // ❌ Code verbeux
  if (this.notify) {
    this.notify('buttplug:globalScale', { scale });
  }
}
```

## 🎨 Séparation UI / Business Logic

### ✅ **Composants UI Purs**

```javascript
// ✅ BON: Composant UI avec appels directs + events pour re-render
class HapticSettingsComponent extends Component {

  constructor(props) {
    super(props);

    this.core=props.core // core as unique business dependency
    
    ...
    
    this.coreListener = null;
  }

  componentDidMount() {
    // S'abonner aux événements pour déclencher re-render
    this.coreListener = this.core.addListener(this.handleCoreEvent);
  }
  
  handleCoreEvent = (event, data) => {
    // Les composants UI ne font QUE déclencher re-render
    const eventsToReact = ['buttplug:globalScale', 'buttplug:device'];
    if (eventsToReact.includes(event)) {
      this._triggerRender();  // ✅ Juste re-render, c'est tout
    }
  }
  
  handleGlobalScaleChange = (scale) => {
    // Appel direct au core/manager
    this.core.buttplug.setGlobalScale(scale);  //  ✅ Bon, mais pas optimal! indirection suppélementaire alors qu'il suffit d'appler directement l'outil core au bon endroit
  }
  
  render() {
    // UI pure basée sur l'état actuel des managers
    const globalScale = this.core.buttplug.getGlobalScale();// Acceptable, même si c'est encore une indirection
    return <input value={globalScale} onChange={this.handleGlobalScaleChange}/>; // pas optimal !

    return <input value={globalScale} onChange={this.core.buttplug.setGlobalScale}/> // ✅ Bon, pas d'indirection vers le bon outil

    return <input value={this.core.buttplug.getGlobalScale()} onChange={this.core.buttplug.setGlobalScale}/> //// ✅ visuellement plus lourd mais optimal, pas d'indrection du tout.

  }
}
```

```javascript
// ❌ ÉVITER: Business logic dans les event handlers UI
handleCoreEvent = (event, data) => {
  switch (event) {
    case 'buttplug:device':
      // ❌ JAMAIS de business logic dans UI
      if (data.device && this.hasFunscript()) {
        const mapResult = this.autoMapChannels();
        this.setState({ status: `Mapped ${mapResult.mapped} channels` });
      }
      this._triggerRender();
      break;
  }
}

// ❌ ÉVITER: Props callback pour business logic
class HapticSettingsComponent extends Component {
  render() {
    return (
      <input 
        onChange={(scale) => this.props.onGlobalScaleChange(scale)}  // ❌
      />
    );
  }
}
```

> **⚠️ RÈGLE SIMPLE**: Les composants UI s'abonnent aux événements choisis pour déclencher leur `triggerRender()`, c'est tout. Aucune business logic dans les event handlers UI.

### ✅ **Business Logic Centralisée**

```javascript
// ✅ BON: Logique business dans Core avec handlers spécialisés, déclenchés par le bus d'évenement
handleButtplugDevice(data) {
  const { device } = data;
  
  // Logique business réactive : auto-map si device + funscript
  if (device && this.funscript.getChannels().length > 0) {
    setTimeout(() => {
      const mapResult = this.autoMapChannels();
      console.log(`Auto-mapped ${mapResult.mapped} channels`);
    }, 100);
  }
}
```

## 🔧 Code Quality & Style

### ✅ **API Simplifiée et Directe**

```javascript
// ✅ BON: API claire et directe
core.buttplug.setGlobalScale(0.8);
core.funscript.load(data);
core.playlist.goTo(2);

// ✅ BON: Méthodes business courtes avec responsabilité claire et pertinente
getActuator(index) {
  return this.actuators.find(actuator => actuator.index === index) || null;
}
```

```javascript
// ❌ ÉVITER: Verbosité excessive
const buttplugManager = core.getButtPlugManager();
const settings = buttplugManager.getGlobalSettings();
settings.setScale(0.8);
buttplugManager.applyGlobalSettings(settings);

// ❌ ÉVITER: Méthodes trop longues
processComplexWorkflowWithMultipleStepsAndValidation() {
  // 50+ lignes de code...
}

// ❌ ÉVITER: Indirections inutiles qui ne font que rediriger
handleGlobalScaleChange(scale) {
  this.updateGlobalScale(scale);  // ❌ Wrapper inutile
}

updateGlobalScale(scale) {
  this.core.buttplug.setGlobalScale(scale);  // ❌ Juste une redirection
}

// ✅ À LA PLACE: Appel direct
handleGlobalScaleChange(scale) {
  this.core.buttplug.setGlobalScale(scale);  // ✅ Direct
}
```

> **⚠️ RÈGLE IMPORTANTE**: On évite à tout prix les indirections vers des méthodes intermédiaires qui ne font rien à part rediriger. On appelle directement `core` ou ses managers avec la fonction business appropriée.

### ✅ **Gestion d'État Locale**

```javascript
// ✅ BON: État technique UI dans les composants
class FunPlayer extends Component {
  state = {
    showVisualizer: true,    // État UI
    updateRate: 60,          // Config technique
    currentActuatorData: new Map()  // Cache UI
  }
}

// ✅ BON: État business dans les managers
class PlaylistManager {
  constructor() {
    this.currentIndex = -1;  // État business
    this.isPlaying = false;  // État business
  }
}
```

### ✅ **Patterns de Nommage Cohérents**

```javascript
// ✅ BON: Conventions cohérentes
// Getters simples
getActuators()
getCurrentItem()
getGlobalScale()

// Setters simples  
setGlobalScale(scale)
setIntifaceUrl(url)

// Actions métier
connect()
scan()
load()
reset()

// Événements descriptifs
'buttplug:connection'
'funscript:load'
'playlist:itemChanged'
```

## 🚫 Anti-Patterns à Éviter

### ❌ **Couplage Tight**
```javascript
// ❌ Managers qui se connaissent directement
// ❌ Props callback pour business logic  
// ❌ État business dupliqué dans UI
```

### ❌ **Verbosité Excessive**
```javascript
// ❌ Méthodes wrapper sans valeur ajoutée
// ❌ Indirections multiples pour un simple appel
// ❌ Callbacks en cascade
```

### ❌ **Responsabilités Mélangées**
```javascript
// ❌ Business logic dans les composants React
// ❌ UI state dans les managers business
// ❌ Event handling éparpillé partout
```

## 📋 Checklist Développement

### **Avant d'ajouter du code :**
- [ ] La responsabilité est-elle dans le bon manager/composant ?
- [ ] Peut-on faire plus simple/direct ?
- [ ] Évite-t-on la duplication de code ?
- [ ] L'API reste-t-elle intuitive ?

### **Pour les managers business :**
- [ ] Autonome (pas de dépendance vers autres managers)
- [ ] Utilise `this.notify()` directement dans les méthodes
- [ ] API simple et prévisible
- [ ] Responsabilité claire et délimitée

### **Pour les composants UI :**
- [ ] Appels directs `this.core.manager.method()`
- [ ] Pas de business logic (sauf technique UI)
- [ ] État local uniquement pour UI/technique
- [ ] Props callback uniquement pour coordination UI

### **Pour les événements :**
- [ ] Noms descriptifs et cohérents
- [ ] Handlers centralisés dans Core
- [ ] Business logic dans les handlers, pas dans UI

## 🎯 Objectifs Qualité

**Élégance mathématique** : Moins de code, plus de fonctionnalité  
**Prévisibilité** : Patterns cohérents partout  
**Maintenabilité** : Séparation claire des responsabilités, découplage des blocs logiques qui peuvent être autonomes
**Efficacité** : Pas de verbosité, pas de redondance, code peu saturé de bruit visuel qui parasite sa compréhension et sa navigation.

> *"Le code parfait est celui qu'on n'a pas eu besoin d'écrire"*
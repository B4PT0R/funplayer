var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import React, { Component } from "react";
import videojs from "video.js";
import { ButtplugClient, ButtplugBrowserWebsocketClientConnector, ActuatorType } from "buttplug";
import feather from "feather-icons";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = React, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  __name(q, "q");
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
__name(requireReactJsxRuntime_production_min, "requireReactJsxRuntime_production_min");
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var React$1 = React;
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      __name(getIteratorFn, "getIteratorFn");
      var ReactSharedInternals = React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      __name(error, "error");
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      __name(printWarning, "printWarning");
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      __name(isValidElementType, "isValidElementType");
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      __name(getWrappedName, "getWrappedName");
      function getContextName(type) {
        return type.displayName || "Context";
      }
      __name(getContextName, "getContextName");
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        {
          if (typeof type.tag === "number") {
            error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type === "function") {
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      __name(getComponentNameFromType, "getComponentNameFromType");
      var assign = Object.assign;
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      __name(disabledLog, "disabledLog");
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      __name(disableLogs, "disableLogs");
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      __name(reenableLogs, "reenableLogs");
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      __name(describeBuiltInComponentFrame, "describeBuiltInComponentFrame");
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = /* @__PURE__ */ __name(function() {
              throw Error();
            }, "Fake");
            Object.defineProperty(Fake.prototype, "props", {
              set: /* @__PURE__ */ __name(function() {
                throw Error();
              }, "set")
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split("\n");
            var controlLines = control.stack.split("\n");
            var s = sampleLines.length - 1;
            var c = controlLines.length - 1;
            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
              c--;
            }
            for (; s >= 1 && c >= 0; s--, c--) {
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--;
                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      __name(describeNativeComponentFrame, "describeNativeComponentFrame");
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      __name(describeFunctionComponentFrame, "describeFunctionComponentFrame");
      function shouldConstruct(Component2) {
        var prototype = Component2.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      __name(shouldConstruct, "shouldConstruct");
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      __name(describeUnknownElementTypeFrameInDEV, "describeUnknownElementTypeFrameInDEV");
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      __name(setCurrentlyValidatingElement, "setCurrentlyValidatingElement");
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error("Failed %s type: %s", location, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      __name(checkPropTypes, "checkPropTypes");
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      __name(isArray, "isArray");
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      __name(typeName, "typeName");
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      __name(willCoercionThrow, "willCoercionThrow");
      function testStringCoercion(value) {
        return "" + value;
      }
      __name(testStringCoercion, "testStringCoercion");
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      __name(checkKeyStringCoercion, "checkKeyStringCoercion");
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== void 0;
      }
      __name(hasValidRef, "hasValidRef");
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== void 0;
      }
      __name(hasValidKey, "hasValidKey");
      function warnIfStringRefCannotBeAutoConverted(config, self) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self) ;
        }
      }
      __name(warnIfStringRefCannotBeAutoConverted, "warnIfStringRefCannotBeAutoConverted");
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = /* @__PURE__ */ __name(function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          }, "warnAboutAccessingKey");
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      __name(defineKeyPropWarningGetter, "defineKeyPropWarningGetter");
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = /* @__PURE__ */ __name(function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          }, "warnAboutAccessingRef");
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      __name(defineRefPropWarningGetter, "defineRefPropWarningGetter");
      var ReactElement = /* @__PURE__ */ __name(function(type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type,
          key,
          ref,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      }, "ReactElement");
      function jsxDEV(type, config, maybeKey, source, self) {
        {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          if (maybeKey !== void 0) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            ref = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self);
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
      }
      __name(jsxDEV, "jsxDEV");
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      __name(setCurrentlyValidatingElement$1, "setCurrentlyValidatingElement$1");
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function isValidElement(object) {
        {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      __name(isValidElement, "isValidElement");
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      __name(getDeclarationErrorAddendum, "getDeclarationErrorAddendum");
      function getSourceInfoErrorAddendum(source) {
        {
          return "";
        }
      }
      __name(getSourceInfoErrorAddendum, "getSourceInfoErrorAddendum");
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      __name(getCurrentComponentErrorInfo, "getCurrentComponentErrorInfo");
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      __name(validateExplicitKey, "validateExplicitKey");
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      __name(validateChildKeys, "validateChildKeys");
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === void 0 || typeof type === "string") {
            return;
          }
          var propTypes;
          if (typeof type === "function") {
            propTypes = type.propTypes;
          } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
            error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      __name(validatePropTypes, "validatePropTypes");
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      __name(validateFragmentProps, "validateFragmentProps");
      var didWarnAboutKeySpread = {};
      function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum();
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV(type, props, key, source, self);
          if (element == null) {
            return element;
          }
          if (validType) {
            var children = props.children;
            if (children !== void 0) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i = 0; i < children.length; i++) {
                    validateChildKeys(children[i], type);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children, type);
              }
            }
          }
          {
            if (hasOwnProperty.call(props, "key")) {
              var componentName = getComponentNameFromType(type);
              var keys = Object.keys(props).filter(function(k) {
                return k !== "key";
              });
              var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
              if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                didWarnAboutKeySpread[componentName + beforeExample] = true;
              }
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      }
      __name(jsxWithValidation, "jsxWithValidation");
      function jsxWithValidationStatic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, true);
        }
      }
      __name(jsxWithValidationStatic, "jsxWithValidationStatic");
      function jsxWithValidationDynamic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, false);
        }
      }
      __name(jsxWithValidationDynamic, "jsxWithValidationDynamic");
      var jsx = jsxWithValidationDynamic;
      var jsxs = jsxWithValidationStatic;
      reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
      reactJsxRuntime_development.jsx = jsx;
      reactJsxRuntime_development.jsxs = jsxs;
    })();
  }
  return reactJsxRuntime_development;
}
__name(requireReactJsxRuntime_development, "requireReactJsxRuntime_development");
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  if (process.env.NODE_ENV === "production") {
    jsxRuntime.exports = requireReactJsxRuntime_production_min();
  } else {
    jsxRuntime.exports = requireReactJsxRuntime_development();
  }
  return jsxRuntime.exports;
}
__name(requireJsxRuntime, "requireJsxRuntime");
var jsxRuntimeExports = requireJsxRuntime();
const Logo = /* @__PURE__ */ __name(({ className, size = 24, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    className,
    width: size,
    height: size,
    viewBox: "0 0 1080 1080",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 0 C0.98444092 0.5667041 1.96888184 1.1334082 2.9831543 1.71728516 C11.79915747 6.81238697 20.55182327 12.01772296 29.30053711 17.22729492 C37.01717971 21.82181521 44.77417417 26.34062674 52.5625 30.8125 C62.57980932 36.56588394 72.52928972 42.42565338 82.45703125 48.33203125 C90.12448945 52.88651911 97.8292319 57.37078011 105.5625 61.8125 C114.43778787 66.91015627 123.26634893 72.079483 132.0625 77.3125 C141.99754115 83.22183413 151.97901105 89.0432911 161.99951172 94.80639648 C172.23102058 100.69094782 182.42633052 106.6363648 192.61669922 112.59179688 C195.53644319 114.29727968 198.4574316 116.00060877 201.37890625 117.703125 C212.90258952 124.4190222 224.4149979 131.15385372 235.91986084 137.9019165 C248.12240577 145.05881903 260.33991794 152.1898696 272.5625 159.3125 C286.02539523 167.15791485 299.4792247 175.01844523 312.91986084 182.9019165 C325.12240577 190.05881903 337.33991794 197.1898696 349.5625 204.3125 C365.49682551 213.59812481 381.42242035 222.89837799 397.32331848 232.24113464 C401.20081641 234.51783098 405.08665952 236.77969177 408.9765625 239.03515625 C410.92190154 240.1692253 412.86721561 241.30333721 414.8125 242.4375 C415.67439941 242.9332251 416.53629883 243.4289502 417.42431641 243.93969727 C428.5826319 250.4687809 437.81827372 257.53747917 442.03125 270.2265625 C444.71822729 280.77689979 443.53244603 291.21111996 438.20263672 300.76245117 C432.38406589 309.80903829 423.80579166 314.96817322 414.5625 320 C413.32178993 320.69045676 412.08189495 321.38237999 410.84277344 322.07568359 C408.31436743 323.48725669 405.78159044 324.89039462 403.24414062 326.28564453 C397.75033325 329.30652091 392.28298862 332.37466853 386.8125 335.4375 C385.7915625 336.00686279 384.770625 336.57622559 383.71875 337.1628418 C375.61125834 341.69308281 367.5897463 346.36086587 359.58105469 351.06298828 C351.41990626 355.84255592 343.17773139 360.46616602 334.91357422 365.06469727 C327.78621733 369.04065635 320.72310908 373.11413998 313.6875 377.25 C304.08543764 382.89231859 294.38029042 388.32652817 284.62939453 393.70678711 C277.21334148 397.80977022 269.86734825 402.01495979 262.5625 406.3125 C254.13027249 411.27329255 245.62827077 416.08609533 237.0625 420.8125 C227.40911754 426.14016517 217.846847 431.59932246 208.33984375 437.18359375 C200.67269608 441.68233073 192.94655455 446.0675082 185.19726562 450.42285156 C178.36018663 454.27423541 171.57869784 458.21313675 164.8125 462.1875 C155.16785768 467.84821163 145.42103902 473.30399746 135.62988281 478.70654297 C128.21364613 482.80957113 120.86750517 487.01486748 113.5625 491.3125 C105.13027394 496.27329169 96.62829665 501.08614413 88.0625 505.8125 C78.45433937 511.11456842 68.94070912 516.55210957 59.48046875 522.11328125 C51.36176661 526.87510919 43.16048432 531.47736805 34.93505859 536.05175781 C27.58740089 540.14898179 20.31389293 544.36008532 13.0625 548.625 C6.09749914 552.70974586 -0.88343497 556.74654328 -8 560.5625 C-8.66 560.92126221 -9.32 561.28002441 -10 561.6496582 C-19.49529425 566.65763629 -29.21138742 567.92877808 -39.625 565.1875 C-49.40844994 561.8063397 -58.01164742 554.96617899 -62.7890625 545.6875 C-65.1476677 539.98612341 -66.56491893 534.61368906 -66.55741024 528.41808891 C-66.55861445 527.45107135 -66.55981866 526.48405378 -66.56105936 525.48773265 C-66.55717915 524.4307918 -66.55329894 523.37385095 -66.54930115 522.28488159 C-66.54886525 520.58665532 -66.54886525 520.58665532 -66.54842055 518.85412145 C-66.54582889 515.02755993 -66.53561089 511.20105929 -66.52514648 507.37451172 C-66.52169149 505.31279562 -66.51896442 503.25107937 -66.5162843 501.18936213 C-66.46723654 464.5493012 -66.26073688 427.90939215 -66.06657338 391.26988077 C-66.03462433 385.23361215 -66.00328587 379.19734044 -65.97207451 373.16106796 C-65.86792731 353.02984479 -65.762487 332.89862903 -65.65524632 312.76742209 C-65.64953506 311.69529585 -65.64382379 310.62316961 -65.63793945 309.51855469 C-65.63222053 308.44504036 -65.62650161 307.37152604 -65.6206094 306.26548098 C-65.52818096 288.90048705 -65.43889183 271.5354786 -65.35104198 254.17046095 C-65.2596399 236.11053942 -65.16582381 218.05063172 -65.06965441 199.99073493 C-65.01619733 189.94345699 -64.96361915 179.89617657 -64.9136219 169.84888077 C-64.80062734 147.24727372 -64.66957889 124.64591045 -64.49601831 102.0446801 C-64.46274307 97.70566778 -64.43062744 93.36665294 -64.40105963 89.02761364 C-64.33650029 79.5765968 -64.26338248 70.12579335 -64.16400493 60.67507078 C-64.122571 56.72736636 -64.0853881 52.77976061 -64.06062138 48.83191323 C-64.03764267 45.21186234 -64.0008162 41.59221645 -63.95323582 37.97240773 C-63.93128529 36.04647398 -63.92344112 34.12039518 -63.91618669 32.19435 C-63.71565532 19.30425802 -60.63728685 9.53992519 -51.40234375 0.26953125 C-35.29393739 -13.44161682 -16.79770512 -9.85262895 0 0 Z ", fill: "currentColor", transform: "translate(78.4375,266.6875)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 0 C10.32329688 10.12206302 15.43615919 25.94156498 20.8125 39.125 C21.11336517 39.8592218 21.41423035 40.5934436 21.72421265 41.34991455 C27.61188675 55.7421791 33.02150178 70.26584945 38 85 C38.57741943 86.70349609 38.57741943 86.70349609 39.16650391 88.44140625 C54.10899445 132.86198141 64.02602688 178.32585278 69.25 224.875 C69.33317474 225.61141724 69.41634949 226.34783447 69.50204468 227.10656738 C71.79828653 247.68010947 72.24389529 268.12198877 72.25 288.8125 C72.25066278 289.8433736 72.25066278 289.8433736 72.25133896 290.89507294 C72.25855596 312.34548781 71.86461832 333.62042507 69.25323486 354.93243408 C68.98919779 357.08819591 68.73437843 359.24493646 68.47998047 361.40185547 C61.35292101 421.02861519 45.76501631 479.47924086 23.25 535.125 C22.9876355 535.77660095 22.725271 536.4282019 22.45495605 537.09954834 C9.02987164 570.29702276 9.02987164 570.29702276 -7 578 C-17.72736492 582.36004862 -28.20065077 581.91965167 -38.984375 577.8828125 C-48.55476332 573.58342486 -56.02818825 566.70574915 -60.29296875 556.98828125 C-65.89344349 541.23887992 -61.76640772 527.30490002 -55.125 512.5625 C-30.0737579 454.99550864 -15.7886637 393.36843627 -10 331 C-9.89469971 329.93362305 -9.78939941 328.86724609 -9.6809082 327.76855469 C-8.71772342 316.63499471 -8.81392777 305.467739 -8.81469727 294.30078125 C-8.81253054 290.79935168 -8.79437695 287.2982483 -8.77539062 283.796875 C-8.72339401 263.16129731 -9.990864 242.65124978 -12.6875 222.1875 C-12.85411133 220.92164063 -13.02072266 219.65578125 -13.19238281 218.3515625 C-17.9169081 183.52793385 -25.75729187 149.2999983 -37 116 C-37.33080566 115.00258789 -37.66161133 114.00517578 -38.00244141 112.97753906 C-44.27861608 94.07593429 -51.57668965 75.66749695 -59.40625 57.359375 C-59.77290771 56.49948975 -60.13956543 55.63960449 -60.51733398 54.75366211 C-61.18491116 53.19442263 -61.85832848 51.63766207 -62.53930664 50.08422852 C-67.09251982 39.50524741 -69.14158402 28.43989337 -65.375 17.25 C-60.31379474 5.07479295 -52.7160209 -2.97224469 -40.5234375 -8.06640625 C-26.18561119 -13.37095809 -11.63699433 -9.1625641 0 0 Z ", fill: "currentColor", transform: "translate(991,265)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 0 C0.71800781 0.24492187 1.43601562 0.48984375 2.17578125 0.7421875 C13.88563866 5.3128745 20.2220512 14.25032782 26 25 C26.40976074 25.76054687 26.81952148 26.52109375 27.24169922 27.3046875 C68.40069131 104.70862073 79.83368986 194.25818804 57 279 C56.7932666 279.77827148 56.5865332 280.55654297 56.37353516 281.35839844 C50.67826733 302.44971309 42.65347343 322.9271035 33.375 342.6875 C32.87347412 343.77877197 32.37194824 344.87004395 31.85522461 345.99438477 C26.82794386 356.39228459 19.20937211 367.00107292 8 371.1875 C-3.56511576 375.09945862 -14.49749428 374.80112021 -25.65625 369.8125 C-35.66147775 364.37756147 -42.52286667 356.26443448 -46.19140625 345.5 C-49.74931552 330.09958111 -44.57410568 317.81750338 -38.25 304.0625 C-8.53025778 238.05676683 -3.54858745 167.48630877 -29.09521484 99.17749023 C-34.67863837 84.83123608 -41.28944333 70.75080457 -48.53881836 57.17114258 C-53.8524583 46.96498699 -54.71988293 35.71167665 -51.375 24.6875 C-49.37327184 19.34955825 -46.7839695 15.23291503 -43 11 C-42.24783203 10.07574219 -42.24783203 10.07574219 -41.48046875 9.1328125 C-31.5359111 -2.14252537 -13.80998523 -4.79628229 0 0 Z ", fill: "currentColor", transform: "translate(800,363)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 0 C20.36797209 17.5208362 30.98152094 48.65216331 33.25 74.875 C34.66601923 105.04141347 29.99407499 140.23347324 9.25 163.875 C2.33437498 171.2402957 -6.767565 174.89927327 -16.75 175.875 C-29.27439391 176.03859876 -39.73763503 171.67182096 -48.65625 163.02734375 C-57.30505975 153.81049777 -59.15690908 144.16178785 -58.96484375 131.91796875 C-58.6585184 123.68904251 -55.38521402 117.01020231 -51.953125 109.66015625 C-46.34038834 96.66703535 -45.36581086 83.40730035 -49.75 69.875 C-51.70175288 65.01460373 -54.2229643 60.45698781 -56.75 55.875 C-62.88742914 44.32124959 -65.72598793 34.36956431 -62.625 21.25 C-59.29685073 10.41810676 -51.73490932 2.40718705 -42.1875 -3.5 C-28.61773045 -9.91480015 -12.25454701 -8.86098015 0 0 Z ", fill: "currentColor", transform: "translate(637.75,466.125)" })
    ]
  }
), "Logo");
var __defProp$8 = Object.defineProperty;
var __defNormalProp$8 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp$8");
var __publicField$8 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp$8(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField$8");
let videojsVR = null;
let videojsPlaylist = null;
const loadVRPlugin = /* @__PURE__ */ __name(async () => {
  if (!videojsVR) {
    try {
      videojsVR = await import("videojs-vr/dist/videojs-vr");
      await import("videojs-vr/dist/videojs-vr.css");
      return videojsVR;
    } catch (error) {
      return null;
    }
  }
  return videojsVR;
}, "loadVRPlugin");
const loadPlaylistPlugin = /* @__PURE__ */ __name(async () => {
  if (!videojsPlaylist) {
    try {
      videojsPlaylist = await import("videojs-playlist");
      return videojsPlaylist;
    } catch (error) {
      return null;
    }
  }
  return videojsPlaylist;
}, "loadPlaylistPlugin");
const _MediaPlayer = class _MediaPlayer extends Component {
  constructor(props) {
    super(props);
    __publicField$8(this, "handlePlaylistPropsChange", () => {
      if (this.player && this.isPlayerReady) {
        this.updatePlaylistFromProps();
      }
    });
    __publicField$8(this, "updatePlaylistFromProps", async () => {
      if (!this.player || !this.isPlayerReady || typeof this.player.playlist !== "function") {
        return;
      }
      const playlistItems = this.props.playlist || [];
      if (playlistItems.length === 0) {
        this.player.playlist([]);
        this.notify?.("status:media", { message: "Playlist cleared", type: "info" });
        return;
      }
      try {
        this.notify?.("status:media", { message: `Updating Video.js playlist: ${playlistItems.length} items`, type: "log" });
        const vjsPlaylist = this.filterForVideojs(playlistItems);
        this.player.playlist(vjsPlaylist);
        if (this.player.playlist.currentItem() === -1) {
          this.player.playlist.currentItem(0);
        }
        this.notify?.("status:media", { message: `Video.js playlist updated successfully`, type: "success" });
        this._triggerRender();
      } catch (error) {
        this.notify?.("status:media", { message: "Failed to update Video.js playlist", type: "error", error: error.message });
        this.props.onError?.(error);
      }
    });
    __publicField$8(this, "_hasValidPlaylist", () => {
      const items = this.props.playlist;
      return items && items.length > 0;
    });
    __publicField$8(this, "_triggerRender", () => {
      this.setState((prevState) => ({
        renderTrigger: prevState.renderTrigger + 1
      }));
    });
    __publicField$8(this, "_isPlaylistMode", () => {
      return this.player && typeof this.player.playlist === "function" && this.player.playlist().length > 0;
    });
    __publicField$8(this, "initPlaylistPlugin", async () => {
      if (!this.player || this.isDestroyed) return;
      try {
        this.notify?.("status:media", { message: "Loading Video.js playlist plugin...", type: "log" });
        const playlistPlugin = await loadPlaylistPlugin();
        if (!playlistPlugin) {
          this.notify?.("status:media", { message: "Playlist plugin not available, skipping", type: "info" });
          return;
        }
        if (typeof this.player.playlist !== "function" && playlistPlugin.default) {
          videojs.registerPlugin("playlist", playlistPlugin.default);
        }
        if (typeof this.player.playlist !== "function") {
          throw new Error("Playlist plugin failed to register");
        }
        this.player.on("playlistchange", this.handlePlaylistChange);
        this.player.on("playlistitem", this.handlePlaylistItem);
        this.notify?.("status:media", { message: "Video.js playlist plugin loaded successfully", type: "success" });
      } catch (error) {
        this.notify?.("status:media", { message: "Playlist plugin initialization failed", type: "error", error: error.message });
        throw error;
      }
    });
    __publicField$8(this, "filterForVideojs", (playlist) => {
      return playlist.map((item) => {
        const { funscript, ...vjsItem } = item;
        return vjsItem;
      });
    });
    __publicField$8(this, "handlePlaylistChange", () => {
      this.notify?.("status:media", { message: "Video.js playlist changed", type: "log" });
      this._triggerRender();
      this.updatePlaylistButtons();
    });
    __publicField$8(this, "handlePlaylistItem", () => {
      setTimeout(() => {
        const newVideoJsIndex = this.player.playlist.currentItem();
        this.notify?.("status:media", { message: `Video.js switched to item ${newVideoJsIndex}`, type: "log" });
        this.props.onPlaylistItemChange?.(newVideoJsIndex);
        setTimeout(() => {
          const currentItem = this.getCurrentPlaylistItem();
          if (currentItem && currentItem.poster) {
            this.player.poster(currentItem.poster);
          }
        }, 100);
        this.updatePlaylistButtons();
      }, 0);
    });
    __publicField$8(this, "getCurrentPlaylistItem", () => {
      if (!this._isPlaylistMode()) return null;
      const index = this.player.playlist.currentItem();
      const playlist = this.player.playlist();
      return index >= 0 && index < playlist.length ? playlist[index] : null;
    });
    __publicField$8(this, "goToPlaylistItem", (index) => {
      if (!this._isPlaylistMode()) return false;
      try {
        const playlist = this.player.playlist();
        if (index < 0 || index >= playlist.length) {
          this.notify?.("status:media", { message: `Invalid playlist index: ${index}`, type: "error" });
          return false;
        }
        this.player.playlist.currentItem(index);
        this.notify?.("status:media", { message: `Navigated to playlist item ${index}`, type: "log" });
        setTimeout(() => {
          const actualIndex = this.player.playlist.currentItem();
          if (actualIndex !== index) {
            this.notify?.("status:media", { message: `Navigation mismatch: requested ${index}, got ${actualIndex}`, type: "error" });
          }
        }, 10);
        return true;
      } catch (error) {
        this.notify?.("status:media", { message: `Failed to navigate to playlist item ${index}`, type: "error", error: error.message });
        return false;
      }
    });
    __publicField$8(this, "handleNext", () => {
      if (this._isPlaylistMode()) {
        this.player.playlist.next();
        this.notify?.("status:media", { message: "Video.js playlist: next item", type: "log" });
      }
    });
    __publicField$8(this, "handlePrevious", () => {
      if (this._isPlaylistMode()) {
        this.player.playlist.previous();
        this.notify?.("status:media", { message: "Video.js playlist: previous item", type: "log" });
      }
    });
    __publicField$8(this, "getPlaylistInfo", () => {
      if (!this._isPlaylistMode()) {
        return { hasPlaylist: false, currentIndex: -1, totalItems: 0 };
      }
      const currentIndex = this.player.playlist.currentItem();
      const totalItems = this.player.playlist().length;
      return {
        hasPlaylist: true,
        currentIndex,
        totalItems,
        canNext: currentIndex < totalItems - 1,
        canPrevious: currentIndex > 0
      };
    });
    __publicField$8(this, "registerPlaylistComponents", () => {
      const Button = videojs.getComponent("Button");
      const _PreviousButton = class _PreviousButton extends Button {
        constructor(player, options) {
          super(player, options);
          this.controlText("Previous item");
        }
        handleClick() {
          if (this.player().playlist) {
            this.player().playlist.previous();
          }
        }
        createEl() {
          const el = super.createEl("button", {
            className: "vjs-previous-button vjs-control vjs-button"
          });
          el.innerHTML = '<span aria-hidden="true">⏮</span>';
          el.title = "Previous item";
          return el;
        }
      };
      __name(_PreviousButton, "PreviousButton");
      let PreviousButton = _PreviousButton;
      const _NextButton = class _NextButton extends Button {
        constructor(player, options) {
          super(player, options);
          this.controlText("Next item");
        }
        handleClick() {
          if (this.player().playlist) {
            this.player().playlist.next();
          }
        }
        createEl() {
          const el = super.createEl("button", {
            className: "vjs-next-button vjs-control vjs-button"
          });
          el.innerHTML = '<span aria-hidden="true">⏭</span>';
          el.title = "Next item";
          return el;
        }
      };
      __name(_NextButton, "NextButton");
      let NextButton = _NextButton;
      videojs.registerComponent("PreviousButton", PreviousButton);
      videojs.registerComponent("NextButton", NextButton);
      this.notify?.("status:media", { message: "Video.js playlist control buttons registered", type: "log" });
    });
    __publicField$8(this, "updatePlaylistButtons", () => {
      if (!this.player) return;
      const controlBar = this.player.getChild("controlBar");
      if (!controlBar) return;
      const prevBtn = controlBar.getChild("PreviousButton");
      const nextBtn = controlBar.getChild("NextButton");
      const playlistInfo = this.getPlaylistInfo();
      if (prevBtn) {
        prevBtn.el().disabled = !playlistInfo.canPrevious;
        prevBtn.el().style.opacity = playlistInfo.canPrevious ? "1" : "0.3";
      }
      if (nextBtn) {
        nextBtn.el().disabled = !playlistInfo.canNext;
        nextBtn.el().style.opacity = playlistInfo.canNext ? "1" : "0.3";
      }
    });
    __publicField$8(this, "initPlayer", async () => {
      if (this.isDestroyed || this.isInitialized || this.isInitializing) {
        return;
      }
      if (!this.videoRef?.current) {
        this.notify?.("status:media", { message: "Video element not available for initialization", type: "error" });
        return;
      }
      this.isInitializing = true;
      this.notify?.("status:media", { message: "Initializing Video.js player...", type: "processing" });
      try {
        const videoElement = this.videoRef.current;
        this.registerPlaylistComponents();
        const options = {
          controls: true,
          responsive: true,
          fluid: true,
          playsinline: true,
          preload: "metadata",
          techOrder: ["html5"],
          html5: {
            vhs: {
              overrideNative: false
            }
          },
          controlBar: {
            children: [
              "playToggle",
              "currentTimeDisplay",
              "timeDivider",
              "durationDisplay",
              "progressControl",
              "PreviousButton",
              "NextButton",
              "volumePanel",
              "fullscreenToggle"
            ]
          }
        };
        this.player = videojs(videoElement, options);
        if (!this.player) {
          throw new Error("Failed to create Video.js player instance");
        }
        this.player.ready(() => {
          if (this.isDestroyed) return;
          this.isPlayerReady = true;
          this.isInitialized = true;
          this.isInitializing = false;
          this.notify?.("status:media", { message: "Video.js player ready", type: "success" });
          this.initPlugins().then(() => {
            this.setupCallbacks();
            this.notify?.("status:media", { message: "Video.js player initialization complete", type: "success" });
            this._triggerRender();
          }).catch((error) => {
            this.notify?.("status:media", { message: "Plugin initialization failed", type: "error", error: error.message });
            this.props.onError?.(error);
          });
        });
      } catch (error) {
        this.notify?.("status:media", { message: "Failed to initialize Video.js player", type: "error", error: error.message });
        this.isInitializing = false;
        this.props.onError?.(error);
      }
    });
    __publicField$8(this, "initPlugins", async () => {
      if (this.isDestroyed || !this.player) return;
      try {
        this.notify?.("status:media", { message: "Loading Video.js plugins...", type: "processing" });
        const [vrResult, playlistResult] = await Promise.allSettled([
          this.initVRPlugin(),
          this.initPlaylistPlugin()
        ]);
        if (vrResult.status === "rejected") {
          this.notify?.("status:media", { message: "VR plugin initialization failed", type: "log", error: vrResult.reason?.message });
        }
        if (playlistResult.status === "rejected") {
          this.notify?.("status:media", { message: "Playlist plugin initialization failed", type: "error", error: playlistResult.reason?.message });
        }
        if (this._hasValidPlaylist()) {
          await this.updatePlaylistFromProps();
        }
        this.notify?.("status:media", { message: "Video.js plugins loaded", type: "success" });
      } catch (error) {
        this.notify?.("status:media", { message: "Plugin initialization error", type: "error", error: error.message });
        throw error;
      }
    });
    __publicField$8(this, "initVRPlugin", async () => {
      if (!this.player || this.isDestroyed) return;
      try {
        this.notify?.("status:media", { message: "Loading Video.js VR plugin...", type: "log" });
        const vrPlugin = await loadVRPlugin();
        if (!vrPlugin) {
          this.notify?.("status:media", { message: "VR plugin not available", type: "info" });
          return;
        }
        if (typeof this.player.vr === "function") {
          this.configureVRPlugin();
          return;
        }
        if (!videojs.getPlugin("vr")) {
          if (vrPlugin.default) {
            const vrWrapper = /* @__PURE__ */ __name(function(options = {}) {
              return new vrPlugin.default(this, options);
            }, "vrWrapper");
            videojs.registerPlugin("vr", vrWrapper);
          }
        }
        this.configureVRPlugin();
        this.notify?.("status:media", { message: "VR plugin loaded successfully", type: "success" });
      } catch (error) {
        this.notify?.("status:media", { message: "VR plugin initialization failed", type: "log", error: error.message });
      }
    });
    __publicField$8(this, "configureVRPlugin", () => {
      if (!this.player || this.isDestroyed) return;
      try {
        if (!this.player.mediainfo) {
          this.player.mediainfo = {};
        }
        this.player.vr({
          projection: "AUTO",
          debug: false,
          forceCardboard: false
        });
        this.notify?.("status:media", { message: "VR plugin configured", type: "log" });
      } catch (error) {
        this.notify?.("status:media", { message: "VR configuration failed", type: "log", error: error.message });
      }
    });
    __publicField$8(this, "setupCallbacks", () => {
      if (!this.player) return;
      this.player.on("error", (error) => {
        this.notify?.("status:media", { message: "Video.js player error occurred", type: "error", error: error?.message || "Unknown Video.js error" });
        this.props.onError?.(error);
      });
      this.player.on("play", () => {
        const currentTime = this.player.currentTime() || 0;
        this.notify?.("status:media", { message: `Playback started at ${currentTime.toFixed(1)}s`, type: "log" });
        this.updatePlaylistButtons();
        this.props.onPlay?.({ currentTime });
      });
      this.player.on("pause", () => {
        const currentTime = this.player.currentTime() || 0;
        this.notify?.("status:media", { message: `Playback paused at ${currentTime.toFixed(1)}s`, type: "log" });
        this.props.onPause?.({ currentTime });
      });
      this.player.on("ended", () => {
        this.notify?.("status:media", { message: "Media playback ended", type: "info" });
        this.props.onEnded?.({ currentTime: 0 });
      });
      this.player.on("seeking", () => {
        const currentTime = this.player.currentTime() || 0;
        this.notify?.("status:media", { message: `Seeking to ${currentTime.toFixed(1)}s`, type: "log" });
        this.props.onSeeking?.({ currentTime });
      });
      this.player.on("seeked", () => {
        const currentTime = this.player.currentTime() || 0;
        this.notify?.("status:media", { message: `Seeked to ${currentTime.toFixed(1)}s`, type: "log" });
        this.props.onSeeked?.({ currentTime });
      });
      this.player.on("timeupdate", () => {
        const currentTime = this.player.currentTime() || 0;
        this.props.onTimeUpdate?.({ currentTime });
      });
      this.player.on("durationchange", () => {
        const duration = this.player.duration() || 0;
        this.notify?.("status:media", { message: `Duration changed: ${duration.toFixed(1)}s`, type: "log" });
        this.props.onDurationChange?.({ duration });
      });
      this.player.on("loadstart", () => {
        this.notify?.("status:media", { message: "Media loading started", type: "log" });
        this.props.onLoadStart?.({});
      });
      this.player.on("loadeddata", () => {
        const duration = this.player.duration() || 0;
        this.notify?.("status:media", { message: "Media data loaded", type: "log" });
        this.props.onLoadedData?.({ duration });
      });
      this.player.on("loadedmetadata", () => {
        const duration = this.player.duration() || 0;
        this.notify?.("status:media", { message: `Media loaded: ${duration.toFixed(1)}s duration`, type: "success" });
        this.updatePlaylistButtons();
        this._triggerRender();
        this.props.onLoadedMetadata?.({
          duration,
          type: this._isPlaylistMode() ? "playlist" : "media"
        });
      });
      this.player.on("canplay", () => {
        const currentTime = this.player.currentTime() || 0;
        this.notify?.("status:media", { message: "Media ready to play", type: "log" });
        this.props.onCanPlay?.({ currentTime });
      });
      this.player.on("canplaythrough", () => {
        const currentTime = this.player.currentTime() || 0;
        this.notify?.("status:media", { message: "Media can play through", type: "log" });
        this.props.onCanPlayThrough?.({ currentTime });
      });
      this.player.on("waiting", () => {
        const currentTime = this.player.currentTime() || 0;
        this.notify?.("status:media", { message: "Media buffering...", type: "log" });
        this.props.onWaiting?.({ currentTime });
      });
      this.player.on("stalled", () => {
        const currentTime = this.player.currentTime() || 0;
        this.notify?.("status:media", { message: "Media connection stalled", type: "warning" });
        this.props.onStalled?.({ currentTime });
      });
      this.player.on("suspend", () => {
        const currentTime = this.player.currentTime() || 0;
        this.notify?.("status:media", { message: "Media loading suspended", type: "log" });
        this.props.onSuspend?.({ currentTime });
      });
      this.player.on("volumechange", () => {
        const volume = this.player.volume();
        const muted = this.player.muted();
        this.notify?.("status:media", { message: `Volume: ${muted ? "muted" : Math.round(volume * 100) + "%"}`, type: "log" });
        this.props.onVolumeChange?.({ volume, muted });
      });
      this.player.on("error", (error) => {
        this.notify?.("status:media", { message: "Video.js player error occurred", type: "error", error: error?.message || "Unknown Video.js error" });
        this.props.onError?.(error);
      });
      this.player.on("resize", () => {
        const dimensions = {
          width: this.player.currentWidth(),
          height: this.player.currentHeight()
        };
        this.notify?.("status:media", { message: `Player resized: ${dimensions.width}x${dimensions.height}`, type: "log" });
        this.props.onResize?.(dimensions);
      });
      if (this.player.playlist) {
        this.player.on("playlistitem", (event) => {
          const currentIndex = this.player.playlist.currentItem();
          const totalItems = this.player.playlist().length;
          this.notify?.("status:media", {
            message: `Playlist item changed: ${currentIndex + 1}/${totalItems}`,
            type: "info"
          });
          this.updatePlaylistButtons();
          this._triggerRender();
          this.props.onPlaylistItemChange?.({
            index: currentIndex,
            total: totalItems,
            item: this.player.playlist()[currentIndex]
          });
        });
      }
    });
    __publicField$8(this, "cleanup", () => {
      this.isDestroyed = true;
      this.isInitialized = false;
      this.isInitializing = false;
      if (this.player) {
        try {
          if (!this.player.paused()) {
            this.player.pause();
          }
          if (typeof this.player.dispose === "function") {
            this.player.dispose();
          }
          this.notify?.("status:media", { message: "Video.js player disposed", type: "log" });
        } catch (error) {
          this.notify?.("status:media", { message: "Error during player cleanup", type: "error", error: error.message });
        } finally {
          this.player = null;
          this.isPlayerReady = false;
          this.initRetries = 0;
          this.setState({
            renderTrigger: 0
          });
        }
      }
    });
    __publicField$8(this, "play", () => this.player?.play());
    __publicField$8(this, "pause", () => this.player?.pause());
    __publicField$8(this, "stop", () => {
      this.player?.pause();
      this.player?.currentTime(0);
    });
    __publicField$8(this, "seek", (time) => this.player?.currentTime(time));
    __publicField$8(this, "getTime", () => this.player?.currentTime() || 0);
    __publicField$8(this, "getDuration", () => this.player?.duration() || 0);
    __publicField$8(this, "isPlaying", () => this.player ? !this.player.paused() : false);
    __publicField$8(this, "nextItem", () => this.handleNext());
    __publicField$8(this, "previousItem", () => this.handlePrevious());
    __publicField$8(this, "goToItem", (index) => this.goToPlaylistItem(index));
    __publicField$8(this, "getCurrentItem", () => this.getCurrentPlaylistItem());
    __publicField$8(this, "getPlaylist", () => this._isPlaylistMode() ? this.player.playlist() : []);
    __publicField$8(this, "getState", () => ({
      currentTime: this.getTime(),
      duration: this.getDuration(),
      isPlaying: this.isPlaying(),
      mediaType: this._isPlaylistMode() ? "playlist" : "media",
      playlistInfo: this.getPlaylistInfo()
    }));
    this.videoRef = React.createRef();
    this.player = null;
    this.isPlayerReady = false;
    this.initRetries = 0;
    this.maxRetries = 3;
    this.state = {
      renderTrigger: 0
    };
    this.isInitialized = false;
    this.isInitializing = false;
    this.isDestroyed = false;
    this.notify = props.notify;
  }
  // ============================================================================
  // LIFECYCLE
  // ============================================================================
  componentDidMount() {
    this.isDestroyed = false;
    this.isInitialized = false;
    this.isInitializing = false;
    const hasContent = this._hasValidPlaylist();
    if (hasContent && !this.isInitialized && !this.isInitializing) {
      setTimeout(() => {
        if (!this.isDestroyed) {
          this.initPlayer();
        }
      }, 50);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.isDestroyed) return;
    if (prevProps.playlist === this.props.playlist) return;
    this.handlePlaylistPropsChange();
    const hasContent = this._hasValidPlaylist();
    if (hasContent && !this.isInitialized && !this.isInitializing) {
      setTimeout(() => {
        if (!this.isDestroyed) {
          this.initPlayer();
        }
      }, 50);
    }
  }
  componentWillUnmount() {
    this.cleanup();
  }
  // ============================================================================
  // RENDER
  // ============================================================================
  render() {
    const hasContent = this._hasValidPlaylist();
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-media-player", children: hasContent ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        ref: this.videoRef,
        className: "video-js vjs-default-skin fp-media-player-video",
        playsInline: true,
        "data-setup": "{}"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-media-player-placeholder", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { className: "fp-media-player-placeholder-logo", size: 240 }) }) });
  }
};
__name(_MediaPlayer, "MediaPlayer");
let MediaPlayer = _MediaPlayer;
const HapticType = {
  SCALAR: "scalar",
  // Signal unidirectionnel (0 à 1) - pour linear, vibrate, oscillate
  POLAR: "polar"
  // Signal bidirectionnel (-1 à +1) - pour rotate
};
const Capability = {
  LINEAR: "linear",
  // Mouvement linéaire
  VIBRATE: "vibrate",
  // Vibration
  OSCILLATE: "oscillate",
  // Oscillation
  ROTATE: "rotate"
  // Rotation
};
const CapabilityToHapticType = {
  [Capability.LINEAR]: HapticType.SCALAR,
  [Capability.VIBRATE]: HapticType.SCALAR,
  [Capability.OSCILLATE]: HapticType.SCALAR,
  [Capability.ROTATE]: HapticType.POLAR
};
const _VirtualDevice = class _VirtualDevice {
  constructor(notify = null) {
    this.index = -1;
    this.name = "Virtual Device";
    this.notify = notify;
    this.messageTimingGap = 0;
    this.actuatorConfig = [];
    this.messageAttributes = {};
    this.setConfig("default");
    this.commandCounts = {
      total: 0,
      byActuator: /* @__PURE__ */ new Map(),
      lastCommand: null,
      lastCommandTime: null
    };
    this.notify?.("status:virtual", { message: "Virtual Device initialized with default config", type: "success" });
  }
  // ============================================================================
  // SECTION 1: CONFIGURATION DYNAMIQUE
  // ============================================================================
  /**
   * Configure les actuateurs du device virtuel
   * @param {string|Array} config - Preset name ou array de configs d'actuateurs
   * 
   * Exemples:
   * - setConfig('default') -> 1 linear + 1 vibrate + 1 oscillate + 1 rotate
   * - setConfig('simple') -> 1 linear + 1 vibrate  
   * - setConfig([{capability: 'linear'}, {capability: 'vibrate'}])
   * - setConfig('stroker') -> 1 linear seulement
   * - setConfig('multi-vibe') -> 3 vibrate
   */
  setConfig(config) {
    let newConfig = [];
    if (typeof config === "string") {
      newConfig = this._getPresetConfig(config);
    } else if (Array.isArray(config)) {
      newConfig = this._validateCustomConfig(config);
    } else {
      this.notify?.("status:virtual", { message: "Invalid config type. Use preset name or array", type: "error" });
      return false;
    }
    const oldConfig = [...this.actuatorConfig];
    this.actuatorConfig = newConfig;
    this._rebuildMessageAttributes();
    this._resetCommandCounts();
    this.notify?.("status:virtual", { message: `Config changed from ${oldConfig.length} to ${newConfig.length} actuators`, type: "success" });
    this.notify?.("buttplug:device", {
      device: this,
      configChanged: true,
      oldConfig,
      newConfig: [...newConfig]
    });
    return true;
  }
  /**
   * Configurations prédéfinies
   * @private
   */
  _getPresetConfig(preset) {
    const presets = {
      "default": [
        { capability: Capability.LINEAR, name: "Main Stroke" },
        { capability: Capability.VIBRATE, name: "Vibration" },
        { capability: Capability.OSCILLATE, name: "Oscillation" },
        { capability: Capability.ROTATE, name: "Rotation" }
      ],
      "simple": [
        { capability: Capability.LINEAR, name: "Stroke" },
        { capability: Capability.VIBRATE, name: "Buzz" }
      ],
      "stroker": [
        { capability: Capability.LINEAR, name: "Main Stroke" }
      ],
      "multi-vibe": [
        { capability: Capability.VIBRATE, name: "Vibe 1" },
        { capability: Capability.VIBRATE, name: "Vibe 2" },
        { capability: Capability.VIBRATE, name: "Vibe 3" }
      ],
      "full-featured": [
        { capability: Capability.LINEAR, name: "Main Stroke" },
        { capability: Capability.LINEAR, name: "Secondary" },
        { capability: Capability.VIBRATE, name: "Tip Vibe" },
        { capability: Capability.VIBRATE, name: "Base Vibe" },
        { capability: Capability.ROTATE, name: "Twist" },
        { capability: Capability.OSCILLATE, name: "Swing" }
      ],
      "rotator": [
        { capability: Capability.ROTATE, name: "Main Rotation" },
        { capability: Capability.VIBRATE, name: "Secondary Vibe" }
      ]
    };
    if (!presets[preset]) {
      this.notify?.("status:virtual", { message: `Unknown preset '${preset}', using 'default'`, type: "info" });
      return presets["default"];
    }
    this.notify?.("status:virtual", { message: `Applied preset: ${preset}`, type: "log" });
    return presets[preset];
  }
  /**
   * Valide une configuration custom
   * @private
   */
  _validateCustomConfig(config) {
    const validCapabilities = Object.values(Capability);
    return config.map((actuatorDef, index) => {
      if (!actuatorDef.capability || !validCapabilities.includes(actuatorDef.capability)) {
        this.notify?.("status:virtual", { message: `Invalid capability for actuator ${index}, using linear`, type: "error" });
        return { capability: Capability.LINEAR, name: `Actuator ${index}` };
      }
      return {
        capability: actuatorDef.capability,
        name: actuatorDef.name || `${actuatorDef.capability} ${index}`,
        stepCount: actuatorDef.stepCount || 20,
        featureDescriptor: actuatorDef.featureDescriptor || `Virtual ${actuatorDef.capability}`
      };
    });
  }
  /**
   * Reconstruit messageAttributes selon la config actuelle
   * @private
   */
  _rebuildMessageAttributes() {
    this.messageAttributes = {};
    const scalarCmds = [];
    const linearCmds = [];
    const rotateCmds = [];
    this.actuatorConfig.forEach((actuator, index) => {
      const baseAttrs = {
        Index: index,
        StepCount: actuator.stepCount || 20,
        FeatureDescriptor: actuator.featureDescriptor || actuator.name
      };
      switch (actuator.capability) {
        case Capability.VIBRATE:
          scalarCmds.push({ ...baseAttrs, ActuatorType: "Vibrate" });
          break;
        case Capability.OSCILLATE:
          scalarCmds.push({ ...baseAttrs, ActuatorType: "Oscillate" });
          break;
        case Capability.LINEAR:
          linearCmds.push(baseAttrs);
          break;
        case Capability.ROTATE:
          rotateCmds.push(baseAttrs);
          break;
      }
    });
    if (scalarCmds.length > 0) {
      this.messageAttributes["ScalarCmd"] = scalarCmds;
    }
    if (linearCmds.length > 0) {
      this.messageAttributes["LinearCmd"] = linearCmds;
    }
    if (rotateCmds.length > 0) {
      this.messageAttributes["RotateCmd"] = rotateCmds;
    }
    this.messageAttributes["StopDeviceCmd"] = {};
    this.notify?.("status:virtual", { message: `MessageAttributes rebuilt: ${Object.keys(this.messageAttributes).join(", ")}`, type: "log" });
  }
  // ============================================================================
  // SECTION 2: API DEVICE (compatible ButtplugClientDevice)
  // ============================================================================
  async vibrate(values) {
    this._countCommand("ScalarCmd", "Vibrate", values);
    return Promise.resolve();
  }
  async oscillate(values) {
    this._countCommand("ScalarCmd", "Oscillate", values);
    return Promise.resolve();
  }
  async linear(values) {
    this._countCommand("LinearCmd", null, values);
    return Promise.resolve();
  }
  async rotate(values) {
    this._countCommand("RotateCmd", null, values);
    return Promise.resolve();
  }
  async stop() {
    this._countCommand("StopDeviceCmd");
    return Promise.resolve();
  }
  getAllowedMessages() {
    return Object.keys(this.messageAttributes);
  }
  // ============================================================================
  // SECTION 3: COMPTAGE INTELLIGENT
  // ============================================================================
  /**
   * Compte les commandes par actuateur intelligent
   * @private
   */
  _countCommand(messageType, actuatorType = null, values = null) {
    this.commandCounts.total++;
    this.commandCounts.lastCommand = messageType;
    this.commandCounts.lastCommandTime = Date.now();
    const affectedActuators = this._getAffectedActuators(messageType, actuatorType, values);
    affectedActuators.forEach((actuatorIndex) => {
      if (!this.commandCounts.byActuator.has(actuatorIndex)) {
        this.commandCounts.byActuator.set(actuatorIndex, 0);
      }
      this.commandCounts.byActuator.set(
        actuatorIndex,
        this.commandCounts.byActuator.get(actuatorIndex) + 1
      );
    });
  }
  /**
   * Détermine quels actuateurs sont affectés par une commande
   * @private
   */
  _getAffectedActuators(messageType, actuatorType, values) {
    const affected = [];
    if (messageType === "StopDeviceCmd") {
      return this.actuatorConfig.map((_, index) => index);
    }
    this.actuatorConfig.forEach((actuator, index) => {
      let isAffected = false;
      if (messageType === "ScalarCmd" && actuatorType) {
        isAffected = actuatorType === "Vibrate" && actuator.capability === Capability.VIBRATE || actuatorType === "Oscillate" && actuator.capability === Capability.OSCILLATE;
      } else if (messageType === "LinearCmd") {
        isAffected = actuator.capability === Capability.LINEAR;
      } else if (messageType === "RotateCmd") {
        isAffected = actuator.capability === Capability.ROTATE;
      }
      if (isAffected) {
        affected.push(index);
      }
    });
    return affected;
  }
  _resetCommandCounts() {
    this.commandCounts = {
      total: 0,
      byActuator: /* @__PURE__ */ new Map(),
      lastCommand: null,
      lastCommandTime: null
    };
    this.notify?.("status:virtual", { message: "Command counts reset", type: "log" });
  }
  // ============================================================================
  // SECTION 4: API PUBLIQUE - Configuration et Stats
  // ============================================================================
  /**
   * Récupère la configuration actuelle
   */
  getConfig() {
    return {
      actuatorCount: this.actuatorConfig.length,
      actuators: this.actuatorConfig.map((actuator, index) => ({
        index,
        capability: actuator.capability,
        name: actuator.name
      })),
      presets: this.getAvailablePresets()
    };
  }
  /**
   * Récupère les presets disponibles
   */
  getAvailablePresets() {
    return ["default", "simple", "stroker", "multi-vibe", "full-featured", "rotator"];
  }
  /**
   * Ajoute un actuateur à la config existante
   */
  addActuator(capability, name = null) {
    const newActuator = {
      capability,
      name: name || `${capability} ${this.actuatorConfig.length}`,
      stepCount: 20,
      featureDescriptor: `Virtual ${capability}`
    };
    this.actuatorConfig.push(newActuator);
    this._rebuildMessageAttributes();
    this.notify?.("status:virtual", { message: `Added ${capability} actuator`, type: "success" });
    this.notify?.("buttplug:device", {
      device: this,
      actuatorAdded: true,
      newActuator
    });
    return true;
  }
  /**
   * Supprime un actuateur par index
   */
  removeActuator(index) {
    if (index < 0 || index >= this.actuatorConfig.length) {
      this.notify?.("status:virtual", { message: `Invalid actuator index ${index}`, type: "error" });
      return false;
    }
    const removed = this.actuatorConfig.splice(index, 1)[0];
    this._rebuildMessageAttributes();
    this._resetCommandCounts();
    this.notify?.("status:virtual", { message: `Removed actuator ${index} (${removed.capability})`, type: "success" });
    this.notify?.("buttplug:device", {
      device: this,
      actuatorRemoved: true,
      removedActuator: removed
    });
    return true;
  }
  /**
   * Stats détaillées
   */
  getCommandStats() {
    const byActuator = {};
    this.commandCounts.byActuator.forEach((count, index) => {
      const actuator = this.actuatorConfig[index];
      byActuator[index] = {
        count,
        capability: actuator?.capability || "unknown",
        name: actuator?.name || `Actuator ${index}`
      };
    });
    return {
      total: this.commandCounts.total,
      byActuator,
      lastCommand: this.commandCounts.lastCommand,
      lastCommandTime: this.commandCounts.lastCommandTime,
      actuatorCount: this.actuatorConfig.length
    };
  }
  resetCommandStats() {
    this._resetCommandCounts();
    this.notify?.("status:virtual", { message: "Command stats reset", type: "info" });
  }
  /**
   * Debug info complète
   */
  getDebugInfo() {
    const debugInfo = {
      config: this.getConfig(),
      stats: this.getCommandStats(),
      messageAttributes: this.messageAttributes,
      name: this.name,
      index: this.index
    };
    this.notify?.("status:virtual", { message: "Debug info requested", type: "log" });
    return debugInfo;
  }
};
__name(_VirtualDevice, "VirtualDevice");
let VirtualDevice = _VirtualDevice;
const _Actuator = class _Actuator {
  constructor(index, capability, options = {}, notify = null) {
    this.index = index;
    this.type = CapabilityToHapticType[capability];
    this.capability = capability;
    this.notify = notify;
    this.settings = {
      enabled: true,
      scale: 1,
      invert: false,
      timeOffset: 0,
      range: [0, 1],
      // [min, max] pour clamp final
      ...options.settings
    };
    this.assignedChannel = null;
    this.previousMappedChannel = null;
    this.metadata = {
      name: `Actuator ${index}`,
      featureDescriptor: "",
      stepCount: 20,
      ...options.metadata
    };
    this.notify?.("status:actuator", { message: `Actuator ${index} (${capability}) initialized`, type: "log" });
  }
  // ============================================================================
  // SYSTÈME DE BRANCHEMENT AVEC NOTIFY + PERSISTANCE MAPPING
  // ============================================================================
  /**
   * Branche cet actuateur à un canal
   */
  plug(channel) {
    const success = channel.plug(this);
    if (success) {
      this.previousMappedChannel = channel.name;
      this.notify?.("status:actuator", { message: `Actuator ${this.index} plugged to channel "${channel.name}"`, type: "success" });
      this.notify?.("actuator:plugged", {
        actuatorIndex: this.index,
        channelName: channel.name,
        channel: {
          name: channel.name,
          type: channel.type,
          duration: channel.duration
        },
        actuator: {
          index: this.index,
          type: this.type,
          capability: this.capability
        }
      });
    } else {
      this.notify?.("status:actuator", { message: `Failed to plug actuator ${this.index} to channel "${channel.name}" (incompatible)`, type: "error" });
    }
    return success;
  }
  /**
   * Débranche cet actuateur de son canal actuel
   */
  unplug() {
    if (this.assignedChannel) {
      const channelName = this.assignedChannel.name;
      if (!this.previousMappedChannel) {
        this.previousMappedChannel = channelName;
      }
      this.assignedChannel.unplug(this);
      this.notify?.("status:actuator", { message: `Actuator ${this.index} unplugged from channel "${channelName}"`, type: "info" });
      this.notify?.("actuator:unplugged", {
        actuatorIndex: this.index,
        channelName,
        actuator: {
          index: this.index,
          type: this.type,
          capability: this.capability
        }
      });
    } else {
      this.notify?.("status:actuator", { message: `Actuator ${this.index} was not plugged to any channel`, type: "info" });
    }
  }
  /**
   * ✅ NOUVEAU: Force l'oubli du mapping précédent (reset manuel)
   */
  forgetPreviousMapping() {
    const oldMapping = this.previousMappedChannel;
    this.previousMappedChannel = null;
    this.notify?.("status:actuator", { message: `Actuator ${this.index} forgot previous mapping to "${oldMapping}"`, type: "info" });
    this.notify?.("actuator:mappingForgotten", {
      actuatorIndex: this.index,
      forgottenChannelName: oldMapping,
      actuator: {
        index: this.index,
        type: this.type,
        capability: this.capability
      }
    });
  }
  /**
   * Vérifie si cet actuateur peut être branché à un canal
   */
  canPlugTo(channel) {
    const compatible = this.settings.enabled && this.type === channel.type;
    if (!compatible) {
      this.notify?.("status:actuator", { message: `Actuator ${this.index} incompatible with channel "${channel.name}" (${this.type} vs ${channel.type})`, type: "log" });
    }
    return compatible;
  }
  /**
   * Récupère le nom du canal assigné
   */
  getAssignedChannelName() {
    return this.assignedChannel ? this.assignedChannel.name : null;
  }
  /**
   * ✅ NOUVEAU: Récupère le nom du canal mappé précédemment
   */
  getPreviousMappedChannelName() {
    return this.previousMappedChannel;
  }
  /**
   * ✅ NOUVEAU: Vérifie si l'actuateur a un mapping précédent
   */
  hasPreviousMapping() {
    return this.previousMappedChannel !== null;
  }
  /**
   * Vérifie si l'actuateur est branché à un canal
   */
  isPlugged() {
    return this.assignedChannel !== null;
  }
  // ============================================================================
  // CONFIGURATION ET ÉTAT AVEC NOTIFY
  // ============================================================================
  /**
   * Met à jour les settings avec notification
   */
  updateSettings(newSettings) {
    const oldSettings = { ...this.settings };
    this.settings = { ...this.settings, ...newSettings };
    const changedKeys = Object.keys(newSettings);
    this.notify?.("status:actuator", { message: `Actuator ${this.index} settings updated: ${changedKeys.join(", ")}`, type: "log" });
    this.notify?.("actuator:settingsChanged", {
      actuatorIndex: this.index,
      oldSettings,
      newSettings: { ...this.settings },
      changes: changedKeys,
      actuator: {
        index: this.index,
        type: this.type,
        capability: this.capability,
        channelName: this.getAssignedChannelName()
      }
    });
  }
  /**
   * Reset des settings par défaut avec notification
   */
  resetSettings() {
    const oldSettings = { ...this.settings };
    this.settings = {
      enabled: true,
      scale: 1,
      invert: false,
      timeOffset: 0,
      range: [0, 1]
    };
    this.notify?.("status:actuator", { message: `Actuator ${this.index} settings reset to defaults`, type: "info" });
    this.notify?.("actuator:settingsReset", {
      actuatorIndex: this.index,
      oldSettings,
      newSettings: { ...this.settings },
      actuator: {
        index: this.index,
        type: this.type,
        capability: this.capability,
        channelName: this.getAssignedChannelName()
      }
    });
  }
  // ============================================================================
  // COMPATIBILITÉ
  // ============================================================================
  /**
   * Vérifie si cet actuateur est compatible avec un canal
   */
  isCompatibleWith(channel) {
    return this.type === channel.type;
  }
  /**
   * Vérifie si cet actuateur peut traiter un canal spécifique
   */
  canProcess(channel) {
    if (!this.settings.enabled) {
      this.notify?.("status:actuator", { message: `Actuator ${this.index} cannot process: disabled`, type: "log" });
      return false;
    }
    if (this.assignedChannel && this.assignedChannel !== channel) {
      this.notify?.("status:actuator", { message: `Actuator ${this.index} cannot process: assigned to different channel`, type: "log" });
      return false;
    }
    return this.isCompatibleWith(channel);
  }
  // ============================================================================
  // TRAITEMENT DES VALEURS
  // ============================================================================
  /**
   * Calcule la valeur de sortie finale à partir de la valeur brute interpolée
   */
  processValue(rawValue, globalScale = 1) {
    if (!this.settings.enabled || rawValue === null || rawValue === void 0) {
      return 0;
    }
    let value = rawValue;
    if (this.settings.invert) {
      if (this.type === HapticType.POLAR) {
        value = -value;
      } else {
        value = 1 - value;
      }
    }
    value *= this.settings.scale;
    value *= globalScale;
    const [minRange, maxRange] = this.settings.range;
    if (this.type === HapticType.POLAR) {
      const amplitude = Math.abs(value);
      const clampedAmplitude = Math.max(0, Math.min(1, amplitude));
      value = Math.sign(value) * clampedAmplitude;
    } else {
      value = Math.max(0, Math.min(1, value));
    }
    return value;
  }
  /**
   * Génère l'objet de commande pour le device
   */
  generateCommand(processedValue, options = {}) {
    if (!this.settings.enabled || processedValue === 0) {
      return {
        capability: this.capability,
        value: 0,
        options: {}
      };
    }
    const command = {
      capability: this.capability,
      value: processedValue,
      options: {}
    };
    switch (this.capability) {
      case Capability.LINEAR:
        command.options.duration = options.duration || 100;
        break;
      case Capability.ROTATE:
        command.value = Math.abs(processedValue);
        command.options.clockwise = processedValue >= 0;
        break;
      case Capability.VIBRATE:
      case Capability.OSCILLATE:
        break;
    }
    return command;
  }
  /**
   * Pipeline complet : rawValue → command
   */
  process(rawValue, globalScale = 1, options = {}) {
    const processedValue = this.processValue(rawValue, globalScale);
    const command = this.generateCommand(processedValue, options);
    return command;
  }
  // ============================================================================
  // UTILITAIRES ET DEBUG
  // ============================================================================
  /**
   * ✅ AMÉLIORÉ: Export de la configuration avec previousMappedChannel
   */
  toConfig() {
    return {
      index: this.index,
      type: this.type,
      capability: this.capability,
      settings: { ...this.settings },
      assignedChannelName: this.getAssignedChannelName(),
      previousMappedChannel: this.previousMappedChannel,
      // ✅ NOUVEAU
      metadata: { ...this.metadata }
    };
  }
  /**
   * ✅ AMÉLIORÉ: Import de configuration avec previousMappedChannel
   */
  fromConfig(config) {
    if (config.settings) {
      ({ ...this.settings });
      this.settings = { ...this.settings, ...config.settings };
      this.notify?.("status:actuator", { message: `Actuator ${this.index} loaded settings from config`, type: "log" });
    }
    if (config.metadata) {
      this.metadata = { ...this.metadata, ...config.metadata };
    }
    if (config.previousMappedChannel) {
      this.previousMappedChannel = config.previousMappedChannel;
      this.notify?.("status:actuator", { message: `Actuator ${this.index} restored previous mapping to "${config.previousMappedChannel}"`, type: "log" });
    }
  }
  /**
   * ✅ AMÉLIORÉ: Informations de debug avec previousMappedChannel
   */
  getDebugInfo() {
    const debugInfo = {
      index: this.index,
      type: this.type,
      capability: this.capability,
      settings: { ...this.settings },
      assignedChannel: this.assignedChannel ? {
        name: this.assignedChannel.name,
        type: this.assignedChannel.type,
        duration: this.assignedChannel.duration
      } : null,
      previousMappedChannel: this.previousMappedChannel,
      // ✅ NOUVEAU
      isPlugged: this.isPlugged(),
      hasPreviousMapping: this.hasPreviousMapping(),
      // ✅ NOUVEAU
      metadata: { ...this.metadata }
    };
    return debugInfo;
  }
  /**
   * ✅ AMÉLIORÉ: Représentation string avec info mapping précédent
   */
  toString() {
    const channel = this.getAssignedChannelName() || "unassigned";
    const status = this.settings.enabled ? "enabled" : "disabled";
    const plugged = this.isPlugged() ? "plugged" : "unplugged";
    const previousInfo = this.previousMappedChannel ? ` (prev: ${this.previousMappedChannel})` : "";
    return `Actuator[${this.index}](${this.capability}, ${this.type}, ${status}, ${plugged} to ${channel}${previousInfo})`;
  }
};
__name(_Actuator, "Actuator");
let Actuator = _Actuator;
const _ButtPlugManager = class _ButtPlugManager {
  constructor(notify) {
    // ============================================================================
    // SECTION 8: PRIVATE METHODS
    // ============================================================================
    __publicField(this, "_sendScalarCommand", /* @__PURE__ */ __name(async (actuatorType, value, actuatorIndex = null) => {
      if (!this.selectedDevice) throw new Error("No device selected");
      const capability = actuatorType === ActuatorType.Vibrate ? Capability.VIBRATE : Capability.OSCILLATE;
      const resolvedIndex = this._resolveActuatorIndex(capability, actuatorIndex);
      if (resolvedIndex === null) {
        throw new Error(`No ${actuatorType} actuator available`);
      }
      try {
        const clampedValue = Math.max(0, Math.min(1, value));
        if (actuatorType === ActuatorType.Vibrate) {
          await this.selectedDevice.vibrate(clampedValue);
        } else if (actuatorType === ActuatorType.Oscillate) {
          await this.selectedDevice.oscillate(clampedValue);
        }
        return true;
      } catch (error) {
        this.notify?.("status:buttplug", {
          message: `${actuatorType} command failed: ${error.message}`,
          type: "log"
        });
        return false;
      }
    }, "_sendScalarCommand"));
    __publicField(this, "_resolveActuatorIndex", /* @__PURE__ */ __name((capability, requestedIndex) => {
      if (requestedIndex !== null && requestedIndex !== void 0) {
        const actuator = this.getActuator(requestedIndex);
        if (actuator && actuator.capability === capability) {
          return requestedIndex;
        }
        return null;
      }
      const available = this.getActuatorsByCapability(capability);
      return available.length > 0 ? available[0].index : null;
    }, "_resolveActuatorIndex"));
    __publicField(this, "_resetDevice", /* @__PURE__ */ __name(() => {
      this.selectedDevice = this.virtualDevice;
      this._initActuators();
      this._notifyDeviceChanged(this.virtualDevice);
    }, "_resetDevice"));
    __publicField(this, "_resetConnectionState", /* @__PURE__ */ __name(() => {
      this.isConnected = false;
      this.isScanning = false;
      this.devices.clear();
      this.devices.set(-1, this.virtualDevice);
      this.throttleMap.clear();
      this._resetDevice();
      this.notify?.("buttplug:connection", { connected: false });
    }, "_resetConnectionState"));
    // ============================================================================
    // SECTION 9: EVENT HANDLERS & NOTIFICATIONS
    // ============================================================================
    __publicField(this, "_onDeviceAdded", /* @__PURE__ */ __name((device) => {
      this.devices.set(device.index, device);
      this.notify?.("status:buttplug", {
        message: `Device connected: ${device.name}`,
        type: "success"
      });
      this.notify?.("buttplug:device", { device: void 0 });
    }, "_onDeviceAdded"));
    __publicField(this, "_onDeviceRemoved", /* @__PURE__ */ __name((device) => {
      this.devices.delete(device.index);
      if (this.selectedDevice?.index === device.index) {
        this.selectDevice(-1);
      }
      this.notify?.("status:buttplug", {
        message: `Device disconnected: ${device.name}`,
        type: "info"
      });
      this.notify?.("buttplug:device", { device: void 0 });
    }, "_onDeviceRemoved"));
    __publicField(this, "_onDisconnect", /* @__PURE__ */ __name(() => {
      this.notify?.("status:buttplug", {
        message: "Lost connection to Intiface Central",
        type: "error"
      });
      this._resetConnectionState();
    }, "_onDisconnect"));
    this.notify = notify;
    this.client = null;
    this.connector = null;
    this.initialized = false;
    this.intifaceUrl = "ws://localhost:12345";
    this.devices = /* @__PURE__ */ new Map();
    this.isConnected = false;
    this.isScanning = false;
    this.virtualDevice = new VirtualDevice(this.notify);
    this.devices.set(-1, this.virtualDevice);
    this.selectedDevice = this.virtualDevice;
    this.actuators = [];
    this._initActuators();
    this.globalScale = 1;
    this.globalOffset = 0;
    this.throttleMap = /* @__PURE__ */ new Map();
    this.minCommandInterval = 16;
  }
  // ============================================================================
  // SECTION 1: DEVICE CONNECTION & MANAGEMENT
  // ============================================================================
  async init() {
    if (this.initialized) return true;
    try {
      this.notify?.("status:buttplug", {
        message: "Initializing ButtPlug client...",
        type: "processing"
      });
      this.client = new ButtplugClient("FunPlayer");
      this.connector = new ButtplugBrowserWebsocketClientConnector(this.intifaceUrl);
      this.client.addListener("deviceadded", this._onDeviceAdded);
      this.client.addListener("deviceremoved", this._onDeviceRemoved);
      this.client.addListener("disconnect", this._onDisconnect);
      this.initialized = true;
      this.notify?.("status:buttplug", {
        message: "ButtPlug client initialized successfully",
        type: "log"
      });
      return true;
    } catch (error) {
      this.notify?.("status:buttplug", {
        message: "Failed to initialize ButtPlug client",
        type: "error",
        error: error.message || String(error)
      });
      this.notify?.("buttplug:error", { message: "Initialization failed", error: error.message || String(error) });
      return false;
    }
  }
  async connect(address = null) {
    if (this.isConnected) return true;
    const targetUrl = address || this.intifaceUrl;
    if (!this.initialized) {
      const initSuccess = await this.init();
      if (!initSuccess) return false;
    }
    if (this.connector._url !== targetUrl) {
      this.connector = new ButtplugBrowserWebsocketClientConnector(targetUrl);
    }
    try {
      this.notify?.("status:buttplug", {
        message: `Connecting to ${targetUrl}...`,
        type: "processing"
      });
      await this.client.connect(this.connector);
      this.isConnected = true;
      if (address && address !== this.intifaceUrl) {
        this.setIntifaceUrl(address);
      }
      const existingDevices = this.client.devices;
      existingDevices.forEach((device) => {
        this.devices.set(device.index, device);
      });
      this.notify?.("status:buttplug", {
        message: `Connected to Intiface Central`,
        type: "success"
      });
      this.notify?.("status:buttplug", {
        message: `Found ${existingDevices.length} existing devices (+ Virtual)`,
        type: "log"
      });
      this.notify?.("buttplug:connection", { connected: true });
      return true;
    } catch (error) {
      this.notify?.("status:buttplug", {
        message: "Failed to connect to Intiface Central",
        type: "error",
        error: error.message || String(error)
      });
      this.notify?.("buttplug:error", { message: "Connection failed", error: error.message || String(error) });
      return false;
    }
  }
  async scan(timeout = 5e3) {
    if (!this.isConnected || this.isScanning) return [];
    try {
      this.isScanning = true;
      const existingIndices = new Set(this.devices.keys());
      this.notify?.("status:buttplug", {
        message: "Scanning for devices...",
        type: "processing"
      });
      await this.client.startScanning();
      await new Promise((resolve) => setTimeout(resolve, timeout));
      await this.client.stopScanning();
      const foundDevices = this.client.devices;
      foundDevices.forEach((device) => {
        this.devices.set(device.index, device);
      });
      const newDevices = Array.from(this.devices.values()).filter((device) => !existingIndices.has(device.index));
      if (newDevices.length > 0) {
        this.notify?.("status:buttplug", {
          message: `Found ${newDevices.length} new device(s)`,
          type: "success"
        });
      } else {
        this.notify?.("status:buttplug", {
          message: "No new devices found",
          type: "info"
        });
      }
      return newDevices;
    } catch (error) {
      this.notify?.("status:buttplug", {
        message: "Device scan failed",
        type: "error",
        error: error.message || String(error)
      });
      return [];
    } finally {
      this.isScanning = false;
    }
  }
  async disconnect() {
    if (!this.isConnected) return;
    try {
      if (this.client) {
        await this.client.disconnect();
      }
      this.notify?.("status:buttplug", {
        message: "Disconnected from Intiface Central",
        type: "info"
      });
    } catch (error) {
      this.notify?.("status:buttplug", {
        message: `Disconnect error: ${error.message}`,
        type: "log"
      });
    }
    this._resetConnectionState();
  }
  selectDevice(deviceIndex) {
    if (deviceIndex === null || deviceIndex === void 0) {
      return this.selectDevice(-1);
    }
    const device = this.devices.get(deviceIndex);
    if (!device) {
      this.notify?.("status:buttplug", {
        message: `Device ${deviceIndex} not found`,
        type: "error"
      });
      return false;
    }
    this.selectedDevice = device;
    this._initActuators();
    const deviceType = deviceIndex === -1 ? "Virtual Device" : device.name;
    this.notify?.("status:buttplug", {
      message: `Selected: ${deviceType}`,
      type: "success"
    });
    this.notify?.("buttplug:device", { device });
    return true;
  }
  // ============================================================================
  // SECTION 2: ACTUATORS MANAGEMENT
  // ============================================================================
  _initActuators() {
    this.actuators.forEach((actuator) => actuator.unplug());
    this.actuators = [];
    if (!this.selectedDevice) return;
    this.actuators = this._buildActuators(this.selectedDevice);
    this.notify?.("status:buttplug", {
      message: `Built ${this.actuators.length} actuators for ${this.selectedDevice.name}`,
      type: "log"
    });
  }
  _buildActuators(device) {
    const messageAttrs = device.messageAttributes;
    const actuators = [];
    this.notify?.("status:buttplug", {
      message: `Building actuators for device: ${device.name}`,
      type: "log"
    });
    this.notify?.("status:buttplug", {
      message: `Device messageAttributes: ${JSON.stringify(messageAttrs)}`,
      type: "log"
    });
    if (messageAttrs.ScalarCmd) {
      messageAttrs.ScalarCmd.forEach((attr) => {
        this.notify?.("status:buttplug", {
          message: `Processing ScalarCmd attr: ${JSON.stringify(attr)}`,
          type: "log"
        });
        let capability;
        if (attr.ActuatorType === ActuatorType.Vibrate) {
          this.notify?.("status:buttplug", {
            message: "Matched Vibrate actuator",
            type: "log"
          });
          capability = Capability.VIBRATE;
          HapticType.SCALAR;
        } else if (attr.ActuatorType === ActuatorType.Oscillate) {
          this.notify?.("status:buttplug", {
            message: "Matched Oscillate actuator",
            type: "log"
          });
          capability = Capability.OSCILLATE;
          HapticType.SCALAR;
        } else {
          this.notify?.("status:buttplug", {
            message: `No match for ActuatorType: ${attr.ActuatorType}`,
            type: "log"
          });
        }
        if (capability) {
          this.notify?.("status:buttplug", {
            message: `Creating actuator with capability: ${capability}`,
            type: "log"
          });
          const actuator = new Actuator(attr.Index, capability, {
            metadata: {
              name: `${device.name} #${attr.Index}`,
              featureDescriptor: attr.FeatureDescriptor || "",
              stepCount: attr.StepCount || 20
            }
          }, this.notify);
          actuators.push(actuator);
        }
      });
    }
    if (messageAttrs.LinearCmd) {
      messageAttrs.LinearCmd.forEach((attr) => {
        this.notify?.("status:buttplug", {
          message: `Processing LinearCmd attr: ${JSON.stringify(attr)}`,
          type: "log"
        });
        const actuator = new Actuator(attr.Index, Capability.LINEAR, {
          metadata: {
            name: `${device.name} #${attr.Index}`,
            featureDescriptor: attr.FeatureDescriptor || "",
            stepCount: attr.StepCount || 20
          }
        }, this.notify);
        actuators.push(actuator);
      });
    }
    if (messageAttrs.RotateCmd) {
      messageAttrs.RotateCmd.forEach((attr) => {
        this.notify?.("status:buttplug", {
          message: `Processing RotateCmd attr: ${JSON.stringify(attr)}`,
          type: "log"
        });
        const actuator = new Actuator(attr.Index, Capability.ROTATE, {
          metadata: {
            name: `${device.name} #${attr.Index}`,
            featureDescriptor: attr.FeatureDescriptor || "",
            stepCount: attr.StepCount || 20
          }
        }, this.notify);
        actuators.push(actuator);
      });
    }
    actuators.sort((a, b) => a.index - b.index);
    this.notify?.("status:buttplug", {
      message: `Final actuators array: ${actuators.length} actuators`,
      type: "log"
    });
    return actuators;
  }
  // ============================================================================
  // SECTION 3: API SIMPLIFIÉE
  // ============================================================================
  getActuators() {
    return [...this.actuators];
  }
  getActuator(index) {
    return this.actuators.find((actuator) => actuator.index === index) || null;
  }
  getActuatorsByCapability(capability) {
    return this.actuators.filter((actuator) => actuator.capability === capability);
  }
  setActuatorSettings(actuatorIndex, settings) {
    const actuator = this.getActuator(actuatorIndex);
    if (!actuator) return false;
    actuator.updateSettings(settings);
    this.notify?.("buttplug:actuatorOptions", { actuatorIndex, options: actuator.settings });
    return true;
  }
  getActuatorSettings(actuatorIndex) {
    const actuator = this.getActuator(actuatorIndex);
    return actuator ? { ...actuator.settings } : null;
  }
  plugChannelToActuator(channel, actuatorIndex) {
    const actuator = this.getActuator(actuatorIndex);
    if (!actuator) return false;
    const success = channel.plug(actuator);
    if (success) {
      this.notify?.("buttplug:mapping", { channel: channel.name, actuatorIndex });
    }
    return success;
  }
  unplugChannelFromActuator(channel, actuatorIndex) {
    const actuator = this.getActuator(actuatorIndex);
    if (!actuator) return false;
    channel.unplug(actuator);
    this.notify?.("buttplug:mapping", { channel: channel.name, actuatorIndex: null });
    return true;
  }
  unplugAllChannels() {
    this.actuators.forEach((actuator) => actuator.unplug());
    this.notify?.("buttplug:mapping", { channel: null, actuatorIndex: null });
  }
  // ============================================================================
  // SECTION 4: GLOBAL MODULATION
  // ============================================================================
  setGlobalScale(scale) {
    const newScale = typeof scale === "number" ? Math.max(0, Math.min(5, scale)) : 1;
    if (this.globalScale !== newScale) {
      this.globalScale = newScale;
      this.notify?.("buttplug:globalScale", { scale: newScale });
    }
  }
  getGlobalScale() {
    return this.globalScale;
  }
  setGlobalOffset(offset) {
    const newOffset = typeof offset === "number" ? offset : 0;
    if (this.globalOffset !== newOffset) {
      this.globalOffset = newOffset;
      this.notify?.("buttplug:globalOffset", { offset: newOffset });
    }
  }
  getGlobalOffset() {
    return this.globalOffset;
  }
  // ============================================================================
  // SECTION 5: HAPTIC ORCHESTRATION
  // ============================================================================
  getTimeWithOffsets(currentTime) {
    const channelTimings = /* @__PURE__ */ new Map();
    for (const actuator of this.actuators) {
      if (actuator.isPlugged() && actuator.settings.enabled) {
        const channel = actuator.assignedChannel;
        const adjustedTime = currentTime + this.globalOffset + actuator.settings.timeOffset;
        channelTimings.set(channel.name, adjustedTime);
      }
    }
    return channelTimings;
  }
  async processChannels(rawValues) {
    if (!this.selectedDevice) {
      return /* @__PURE__ */ new Map();
    }
    const visualizerData = /* @__PURE__ */ new Map();
    for (const actuator of this.actuators) {
      if (actuator.isPlugged() && actuator.settings.enabled) {
        const channel = actuator.assignedChannel;
        const rawValue = rawValues[channel.name];
        if (rawValue !== void 0 && rawValue !== null) {
          const command = actuator.process(rawValue, this.globalScale);
          await this.sendThrottled(actuator.capability, command.value, actuator.index, command.options);
          visualizerData.set(actuator.index, {
            value: command.value,
            type: actuator.capability
          });
        }
      }
    }
    return visualizerData;
  }
  // ============================================================================
  // SECTION 6: DEVICE COMMANDS
  // ============================================================================
  async vibrate(value, actuatorIndex = null) {
    return this._sendScalarCommand(ActuatorType.Vibrate, value, actuatorIndex);
  }
  async oscillate(value, actuatorIndex = null) {
    return this._sendScalarCommand(ActuatorType.Oscillate, value, actuatorIndex);
  }
  async linear(value, duration = 100, actuatorIndex = null) {
    if (!this.selectedDevice) throw new Error("No device selected");
    const resolvedIndex = this._resolveActuatorIndex(Capability.LINEAR, actuatorIndex);
    if (resolvedIndex === null) throw new Error("No linear actuator available");
    try {
      const clampedValue = Math.max(0, Math.min(1, value));
      const clampedDuration = Math.max(1, Math.min(2e4, duration));
      await this.selectedDevice.linear([[clampedValue, clampedDuration]]);
      return true;
    } catch (error) {
      this.notify?.("status:buttplug", {
        message: `Linear command failed: ${error.message}`,
        type: "log"
      });
      return false;
    }
  }
  async rotate(value, actuatorIndex = null) {
    if (!this.selectedDevice) throw new Error("No device selected");
    const resolvedIndex = this._resolveActuatorIndex(Capability.ROTATE, actuatorIndex);
    if (resolvedIndex === null) throw new Error("No rotate actuator available");
    try {
      const speed = Math.abs(value);
      const clockwise = value >= 0;
      await this.selectedDevice.rotate([[speed, clockwise]]);
      return true;
    } catch (error) {
      this.notify?.("status:buttplug", {
        message: `Rotate command failed: ${error.message}`,
        type: "log"
      });
      return false;
    }
  }
  async sendThrottled(capability, value, actuatorIndex, options = {}) {
    const now = Date.now();
    const key = `${capability}-${actuatorIndex}`;
    const lastSent = this.throttleMap.get(key) || 0;
    if (now - lastSent < this.minCommandInterval && !options.force) {
      return true;
    }
    this.throttleMap.set(key, now);
    try {
      switch (capability) {
        case Capability.VIBRATE:
          return await this.vibrate(value, actuatorIndex);
        case Capability.OSCILLATE:
          return await this.oscillate(value, actuatorIndex);
        case Capability.LINEAR:
          return await this.linear(value, options.duration || 100, actuatorIndex);
        case Capability.ROTATE:
          return await this.rotate(value, actuatorIndex);
        default:
          this.notify?.("status:buttplug", {
            message: `Unknown capability: ${capability}`,
            type: "log"
          });
          return false;
      }
    } catch (error) {
      return false;
    }
  }
  async stopAll() {
    if (!this.isConnected || !this.client) return;
    try {
      await this.client.stopAllDevices();
      this.notify?.("status:buttplug", {
        message: "All devices stopped",
        type: "log"
      });
    } catch (error) {
      this.notify?.("status:buttplug", {
        message: `Stop all failed: ${error.message}`,
        type: "log"
      });
    }
  }
  // ============================================================================
  // SECTION 7: UTILITIES & INFO
  // ============================================================================
  getDevices() {
    return Array.from(this.devices.values());
  }
  getSelected() {
    return this.selectedDevice;
  }
  getDeviceInfo() {
    if (!this.selectedDevice) return null;
    return {
      deviceName: this.selectedDevice.name,
      deviceIndex: this.selectedDevice.index,
      actuatorCount: this.actuators.length,
      actuators: this.actuators.map((actuator) => ({
        index: actuator.index,
        type: actuator.type,
        capability: actuator.capability,
        enabled: actuator.settings.enabled,
        assignedChannel: actuator.getAssignedChannelName(),
        metadata: actuator.metadata
      })),
      messageTimingGap: this.selectedDevice.messageTimingGap || 0
    };
  }
  getStatus() {
    return {
      isConnected: this.isConnected,
      isScanning: this.isScanning,
      deviceCount: this.devices.size,
      selectedDevice: this.selectedDevice ? {
        index: this.selectedDevice.index,
        name: this.selectedDevice.name
      } : null,
      actuatorCount: this.actuators.length,
      globalScale: this.globalScale,
      globalOffset: this.globalOffset,
      config: { intifaceUrl: this.intifaceUrl }
    };
  }
  setIntifaceUrl(url) {
    const cleanUrl = this._validateAndCleanUrl(url);
    if (this.intifaceUrl !== cleanUrl) {
      const wasConnected = this.isConnected;
      const oldUrl = this.intifaceUrl;
      this.intifaceUrl = cleanUrl;
      if (this.connector && this.connector._url !== cleanUrl) {
        this.connector = new ButtplugBrowserWebsocketClientConnector(cleanUrl);
      }
      this.notify?.("status:buttplug", {
        message: `URL changed: ${oldUrl} → ${cleanUrl}`,
        type: "log"
      });
      this.notify?.("buttplug:config", {
        key: "intifaceUrl",
        data: { oldUrl, newUrl: cleanUrl, wasConnected }
      });
    }
  }
  getIntifaceUrl() {
    return this.intifaceUrl;
  }
  _validateAndCleanUrl(url) {
    if (!url || typeof url !== "string") {
      return "ws://localhost:12345";
    }
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith("ws://") && !cleanUrl.startsWith("wss://")) {
      cleanUrl = "ws://" + cleanUrl;
    }
    try {
      const urlObj = new URL(cleanUrl);
      if (!urlObj.port) {
        urlObj.port = "12345";
        cleanUrl = urlObj.toString();
      }
    } catch (error) {
      this.notify?.("status:buttplug", {
        message: `Invalid WebSocket URL, using default: ${url}`,
        type: "log"
      });
      return "ws://localhost:12345";
    }
    return cleanUrl;
  }
  // ============================================================================
  // SECTION 10: CLEANUP
  // ============================================================================
  async cleanup() {
    if (this.isConnected && this.client) {
      try {
        await this.client.stopAllDevices();
      } catch (error) {
        this.notify?.("status:buttplug", {
          message: `Stop all devices failed during cleanup: ${error.message}`,
          type: "log"
        });
      }
    }
    if (this.isConnected && this.client) {
      try {
        await this.client.disconnect();
      } catch (error) {
        this.notify?.("status:buttplug", {
          message: `Disconnect failed during cleanup: ${error.message}`,
          type: "log"
        });
      }
    }
    if (this.client) {
      try {
        this.client.removeAllListeners();
      } catch (error) {
        this.notify?.("status:buttplug", {
          message: `Remove listeners failed during cleanup: ${error.message}`,
          type: "log"
        });
      }
      this.client = null;
    }
    this.connector = null;
    this.throttleMap.clear();
    this.actuators.forEach((actuator) => actuator.unplug());
    this.actuators = [];
    this.initialized = false;
    this.isConnected = false;
    this.isScanning = false;
    this.devices.clear();
    this.devices.set(-1, this.virtualDevice);
    this._resetDevice();
    this.notify?.("status:buttplug", {
      message: "ButtPlug cleanup completed",
      type: "log"
    });
  }
};
__name(_ButtPlugManager, "ButtPlugManager");
let ButtPlugManager = _ButtPlugManager;
const _Channel = class _Channel {
  constructor(name, rawActions, fieldConfig = {}, metadata = {}, notify = null) {
    if (!name || typeof name !== "string") {
      throw new Error("Channel name must be a non-empty string");
    }
    this.name = name;
    this.metadata = metadata;
    this.notify = notify;
    this.fieldConfig = {
      timeField: "at",
      // Champ temps par défaut
      valueField: "pos",
      // Champ valeur par défaut
      directionField: null,
      // Champ direction optionnel (pour rotation)
      durationField: null,
      // Champ durée optionnel (pour linear)
      ...fieldConfig
    };
    if (!this.fieldConfig.timeField || !this.fieldConfig.valueField) {
      throw new Error(`Channel "${name}": timeField and valueField must be specified`);
    }
    this.interpolationCache = {
      leftIndex: 0,
      rightIndex: 1,
      lastTime: -1
    };
    this.seekThreshold = 1e3;
    this.connectedActuators = /* @__PURE__ */ new Map();
    this.notify?.("status:channel", { message: `Creating channel "${name}"...`, type: "log" });
    this.actions = this._processActions(rawActions);
    this.likelyCapability = this._determineLikelyCapability();
    this.type = this._determineType();
    this.duration = this._calculateDuration();
    this.averageIntervalMs = this.actions.length > 1 ? this.duration * 1e3 / (this.actions.length - 1) : 100;
    this.valueRange = this._calculateValueRange();
    this.notify?.("status:channel", { message: `Channel "${name}" created: ${this.type} type, likely_capability: ${this.likelyCapability}, ${this.actions.length} actions, ${this.duration.toFixed(2)}s`, type: "success" });
  }
  // ============================================================================
  // ✅ NOUVEAU: DÉTERMINATION LIKELY_CAPABILITY
  // ============================================================================
  /**
   * Détermine la capability la plus probable pour ce canal
   * Combine analyse du nom + fieldConfig + données
   */
  _determineLikelyCapability() {
    if (this.metadata.capability) {
      this.notify?.("status:channel", { message: `Channel "${this.name}": Using explicit capability from metadata: ${this.metadata.capability}`, type: "log" });
      return this.metadata.capability;
    }
    const heuristicResult = this._heuristicCapabilityAnalysis();
    const validatedResult = this._validateCapabilityWithContext(heuristicResult);
    this.notify?.("status:channel", { message: `Channel "${this.name}": Likely capability determined as "${validatedResult}" (from heuristic: "${heuristicResult}")`, type: "log" });
    return validatedResult;
  }
  /**
   * Analyse heuristique du nom du canal pour déterminer la capability
   */
  _heuristicCapabilityAnalysis() {
    const nameLower = this.name.toLowerCase();
    const patterns = [
      { capability: Capability.ROTATE, regex: /^(rot|rotat|twist|spin|turn|roll|angle|pitch|yaw)$/i },
      { capability: Capability.LINEAR, regex: /^(pos|position|stroke|linear|up|down|vertical|y)$/i },
      { capability: Capability.OSCILLATE, regex: /^(osc|oscill|swing|wave|sway)$/i },
      { capability: Capability.VIBRATE, regex: /^(vib|vibr|vibrat|buzz|rumble|shake)$/i },
      // Patterns étendus pour types non-officiels → mappés vers capabilities officielles
      { capability: Capability.VIBRATE, regex: /^(squeeze|constrict|pressure|grip|clamp)$/i },
      { capability: Capability.VIBRATE, regex: /^(suck|suction|vacuum|pump)$/i }
    ];
    for (const { capability, regex } of patterns) {
      if (regex.test(nameLower)) {
        this.notify?.("status:channel", { message: `Channel "${this.name}": Pattern match for ${capability}`, type: "log" });
        return capability;
      }
    }
    return this._inferCapabilityFromFieldConfig();
  }
  /**
   * Inférence de capability basée sur la structure du fieldConfig
   */
  _inferCapabilityFromFieldConfig() {
    if (this.fieldConfig.directionField) {
      this.notify?.("status:channel", { message: `Channel "${this.name}": Direction field detected, suggesting rotate`, type: "log" });
      return Capability.ROTATE;
    }
    if (this.fieldConfig.durationField) {
      this.notify?.("status:channel", { message: `Channel "${this.name}": Duration field detected, suggesting linear`, type: "log" });
      return Capability.LINEAR;
    }
    const valueField = this.fieldConfig.valueField.toLowerCase();
    if (valueField.includes("speed") || valueField.includes("spd")) {
      this.notify?.("status:channel", { message: `Channel "${this.name}": Speed field detected, suggesting rotate`, type: "log" });
      return Capability.ROTATE;
    }
    if (valueField.includes("pos") || valueField.includes("position")) {
      this.notify?.("status:channel", { message: `Channel "${this.name}": Position field detected, suggesting linear`, type: "log" });
      return Capability.LINEAR;
    }
    this.notify?.("status:channel", { message: `Channel "${this.name}": No clear indicators, defaulting to linear`, type: "log" });
    return Capability.LINEAR;
  }
  /**
   * Validation de la capability avec le contexte (détection des downgrades)
   */
  _validateCapabilityWithContext(heuristicCapability) {
    const hasNegativeValues = this.actions.some((a) => a.value < 0);
    const hasDirectionField = !!this.fieldConfig.directionField;
    if (heuristicCapability === Capability.ROTATE) {
      if (!hasDirectionField && !hasNegativeValues) {
        this.notify?.("status:channel", { message: `Channel "${this.name}": Rotate detected but no rotation data, downgrading to linear`, type: "warning" });
        return Capability.LINEAR;
      }
    }
    if (heuristicCapability === Capability.LINEAR && hasDirectionField) {
      this.notify?.("status:channel", { message: `Channel "${this.name}": Linear detected but has direction field, upgrading to rotate`, type: "log" });
      return Capability.ROTATE;
    }
    return heuristicCapability;
  }
  // ============================================================================
  // SYSTÈME DE BRANCHEMENT AVEC NOTIFY
  // ============================================================================
  /**
   * Branche un actuateur à ce canal
   */
  plug(actuator) {
    if (!this.canPlugTo(actuator)) {
      this.notify?.("status:channel", { message: `Cannot plug actuator ${actuator.index} to channel "${this.name}" (incompatible: ${actuator.type} vs ${this.type})`, type: "error" });
      return false;
    }
    if (actuator.assignedChannel && actuator.assignedChannel !== this) {
      actuator.assignedChannel.unplug(actuator);
    }
    this.connectedActuators.set(actuator.index, actuator);
    actuator.assignedChannel = this;
    actuator.previousMappedChannel = this.name;
    this.notify?.("status:channel", { message: `Channel "${this.name}" plugged to actuator ${actuator.index} (${actuator.capability})`, type: "success" });
    this.notify?.("channel:plugged", {
      channelName: this.name,
      actuatorIndex: actuator.index,
      actuator: {
        index: actuator.index,
        type: actuator.type,
        capability: actuator.capability
      },
      connectedCount: this.connectedActuators.size
    });
    return true;
  }
  /**
   * Débranche un actuateur de ce canal
   */
  unplug(actuator) {
    if (this.connectedActuators.get(actuator.index) === actuator) {
      this.connectedActuators.delete(actuator.index);
      if (actuator.assignedChannel === this) {
        actuator.assignedChannel = null;
      }
      this.notify?.("status:channel", { message: `Channel "${this.name}" unplugged from actuator ${actuator.index}`, type: "info" });
      this.notify?.("channel:unplugged", {
        channelName: this.name,
        actuatorIndex: actuator.index,
        actuator: {
          index: actuator.index,
          type: actuator.type,
          capability: actuator.capability
        },
        connectedCount: this.connectedActuators.size
      });
    } else {
      this.notify?.("status:channel", { message: `Actuator ${actuator.index} was not connected to channel "${this.name}"`, type: "warning" });
    }
  }
  /**
   * Débranche tous les actuateurs
   */
  unplugAll() {
    const actuatorsToUnplug = Array.from(this.connectedActuators.values());
    actuatorsToUnplug.forEach((actuator) => this.unplug(actuator));
  }
  /**
   * Vérifie si un actuateur peut être branché à ce canal
   */
  canPlugTo(actuator) {
    return actuator.settings.enabled && this.type === actuator.type;
  }
  /**
   * Retourne la liste des actuateurs connectés
   */
  getConnectedActuators() {
    return Array.from(this.connectedActuators.values());
  }
  // ============================================================================
  // GETTERS ET API PUBLIQUE
  // ============================================================================
  /**
   * ✅ NOUVEAU: Getter pour likely_capability
   */
  getLikelyCapability() {
    return this.likelyCapability;
  }
  /**
   * Retourne les métadonnées du canal
   */
  getMetadata() {
    return { ...this.metadata };
  }
  /**
   * Vérifie si le canal a des actions
   */
  hasActions() {
    return this.actions.length > 0;
  }
  /**
   * Retourne le nombre d'actions
   */
  getActionCount() {
    return this.actions.length;
  }
  // ============================================================================
  // TRAITEMENT DES ACTIONS
  // ============================================================================
  _processActions(rawActions) {
    if (!Array.isArray(rawActions) || rawActions.length === 0) {
      this.notify?.("status:channel", { message: `Channel "${this.name}": No actions provided`, type: "error" });
      return [];
    }
    this.notify?.("status:channel", { message: `Channel "${this.name}": Processing ${rawActions.length} raw actions...`, type: "log" });
    const { timeField, valueField, directionField } = this.fieldConfig;
    const validActions = [];
    for (const [index, action] of rawActions.entries()) {
      const time = action[timeField];
      let value = action[valueField];
      if (directionField && action[directionField] !== void 0) {
        const direction = action[directionField];
        const magnitude = Math.abs(value);
        if (value < 0) {
          this.notify?.("status:channel", { message: `Channel "${this.name}": Negative value with direction field, applying Math.abs()`, type: "warning" });
        }
        if (typeof direction === "boolean") {
          value = direction ? magnitude : -magnitude;
        } else if (typeof direction === "string") {
          const isPositive = ["cw", "clockwise", "right", "positive", "+", "true", "1"].includes(direction.toLowerCase());
          value = isPositive ? magnitude : -magnitude;
        } else if (typeof direction === "number") {
          value = direction >= 0 ? magnitude : -magnitude;
        } else {
          this.notify?.("status:channel", { message: `Channel "${this.name}": Invalid direction "${direction}", using absolute value`, type: "warning" });
          value = magnitude;
        }
      }
      if (typeof time === "number" && typeof value === "number") {
        const actionMetadata = { ...action };
        delete actionMetadata[timeField];
        delete actionMetadata[valueField];
        if (directionField) delete actionMetadata[directionField];
        validActions.push({ time, value, metadata: actionMetadata });
      } else {
        this.notify?.("status:channel", { message: `Channel "${this.name}": Invalid action at index ${index} (time: ${typeof time}, value: ${typeof value})`, type: "log" });
      }
    }
    if (validActions.length === 0) {
      this.notify?.("status:channel", { message: `Channel "${this.name}": No valid actions found. Check "${timeField}" and "${valueField}" fields`, type: "error" });
      throw new Error(
        `Channel "${this.name}": No valid actions. Check "${timeField}" and "${valueField}" fields.`
      );
    }
    validActions.sort((a, b) => a.time - b.time);
    const maxAbsValue = Math.max(...validActions.map((a) => Math.abs(a.value)));
    const normFactor = maxAbsValue > 0 ? 1 / maxAbsValue : 1;
    this.notify?.("status:channel", { message: `Channel "${this.name}": ${validActions.length} valid actions, normalization factor: ${normFactor.toFixed(3)}`, type: "log" });
    return validActions.map(({ time, value, metadata }) => ({
      time,
      value: value * normFactor,
      metadata
    }));
  }
  _determineType() {
    if (this.actions.length === 0) return HapticType.SCALAR;
    if (this.fieldConfig.directionField) {
      this.notify?.("status:channel", { message: `Channel "${this.name}": Type determined as POLAR (has direction field)`, type: "log" });
      return HapticType.POLAR;
    }
    const hasNegative = this.actions.some((a) => a.value < 0);
    const type = hasNegative ? HapticType.POLAR : HapticType.SCALAR;
    this.notify?.("status:channel", { message: `Channel "${this.name}": Type determined as ${type} (${hasNegative ? "has negative values" : "all positive values"})`, type: "log" });
    return type;
  }
  _calculateDuration() {
    const duration = this.actions.length > 0 ? this.actions[this.actions.length - 1].time / 1e3 : 0;
    this.notify?.("status:channel", { message: `Channel "${this.name}": Duration calculated as ${duration.toFixed(2)}s`, type: "log" });
    return duration;
  }
  _calculateValueRange() {
    if (this.actions.length === 0) return [0, 0];
    const values = this.actions.map((a) => a.value);
    const range = [Math.min(...values), Math.max(...values)];
    this.notify?.("status:channel", { message: `Channel "${this.name}": Value range: [${range[0].toFixed(3)}, ${range[1].toFixed(3)}]`, type: "log" });
    return range;
  }
  // ============================================================================
  // INTERPOLATION OPTIMISÉE
  // ============================================================================
  interpolateAt(time) {
    if (this.actions.length === 0) {
      return 0;
    }
    const timeMs = time * 1e3;
    if (timeMs <= this.actions[0].time) {
      return 0;
    }
    if (timeMs >= this.actions[this.actions.length - 1].time) {
      return 0;
    }
    const { leftIndex, rightIndex, lastTime } = this.interpolationCache;
    if (timeMs < this.actions[leftIndex].time || timeMs >= this.actions[rightIndex].time) {
      this._updateInterpolationCache(timeMs);
    }
    const left = this.actions[this.interpolationCache.leftIndex];
    const right = this.actions[this.interpolationCache.rightIndex];
    const factor = (timeMs - left.time) / (right.time - left.time);
    const result = left.value + factor * (right.value - left.value);
    this.interpolationCache.lastTime = timeMs;
    return result;
  }
  _updateInterpolationCache(timeMs) {
    const { leftIndex: currentLeft, rightIndex: currentRight, lastTime } = this.interpolationCache;
    if (lastTime >= 0 && Math.abs(timeMs - lastTime) <= this.seekThreshold) {
      if (this._tryIncrementalSlide(timeMs)) {
        return;
      }
    }
    this._performBinarySearch(timeMs);
  }
  /**
   * ✅ NOUVEAU: Glissement incrémental des bornes du cache
   * Retourne true si l'encadrement a pu être rétabli, false sinon
   */
  _tryIncrementalSlide(timeMs) {
    let { leftIndex, rightIndex } = this.interpolationCache;
    const maxSlideSteps = this.seekThreshold / this.averageIntervalMs;
    let steps = 0;
    while (timeMs < this.actions[leftIndex]?.time && leftIndex > 0 && steps < maxSlideSteps) {
      leftIndex--;
      rightIndex--;
      steps++;
    }
    while (timeMs >= this.actions[rightIndex]?.time && rightIndex < this.actions.length - 1 && steps < maxSlideSteps) {
      leftIndex++;
      rightIndex++;
      steps++;
    }
    const isValid = leftIndex >= 0 && rightIndex < this.actions.length && leftIndex < rightIndex && timeMs >= this.actions[leftIndex].time && timeMs < this.actions[rightIndex].time;
    if (isValid) {
      this.interpolationCache.leftIndex = leftIndex;
      this.interpolationCache.rightIndex = rightIndex;
      return true;
    }
    return false;
  }
  /**
   * ✅ OPTIMISÉ: Recherche dichotomique avec bornes intelligentes
   * Exploite la position actuelle du cache pour réduire l'espace de recherche
   */
  _performBinarySearch(timeMs) {
    const { leftIndex: currentLeft, rightIndex: currentRight } = this.interpolationCache;
    let leftBound, rightBound;
    if (timeMs < this.actions[currentLeft]?.time) {
      leftBound = 0;
      rightBound = currentLeft;
    } else if (timeMs > this.actions[currentRight]?.time) {
      leftBound = currentRight;
      rightBound = this.actions.length - 1;
    } else {
      leftBound = currentLeft;
      rightBound = currentRight;
    }
    let leftIndex = leftBound;
    let rightIndex = rightBound;
    while (rightIndex - leftIndex > 1) {
      const mid = Math.floor((leftIndex + rightIndex) / 2);
      if (this.actions[mid].time <= timeMs) {
        leftIndex = mid;
      } else {
        rightIndex = mid;
      }
    }
    this.interpolationCache.leftIndex = leftIndex;
    this.interpolationCache.rightIndex = rightIndex;
  }
  // ============================================================================
  // DEBUG ET UTILITAIRES
  // ============================================================================
  /**
   * ✅ AMÉLIORÉ: Informations de debug avec likely_capability
   */
  getDebugInfo() {
    const debugInfo = {
      name: this.name,
      type: this.type,
      likelyCapability: this.likelyCapability,
      // ✅ NOUVEAU
      duration: this.duration,
      actionCount: this.actions.length,
      valueRange: this.valueRange,
      fieldConfig: { ...this.fieldConfig },
      metadata: { ...this.metadata },
      connectedActuators: Object.fromEntries(
        Array.from(this.connectedActuators.entries()).map(([idx, actuator]) => [
          idx,
          { index: actuator.index, type: actuator.type, enabled: actuator.settings.enabled }
        ])
      ),
      sampleActions: this.actions.slice(0, 3).map((a) => ({
        ...a,
        metadata: a.metadata ? a.metadata : void 0
      })),
      cache: { ...this.interpolationCache }
    };
    return debugInfo;
  }
  toString() {
    const fieldInfo = `${this.fieldConfig.valueField}${this.fieldConfig.directionField ? "+" + this.fieldConfig.directionField : ""}`;
    const connectedCount = this.connectedActuators.size;
    return `Channel[${this.name}](${this.type}/${this.likelyCapability}, ${fieldInfo}, ${this.actions.length} actions, ${this.duration.toFixed(2)}s, ${connectedCount} actuators)`;
  }
};
__name(_Channel, "Channel");
let Channel = _Channel;
const _FunscriptManager = class _FunscriptManager {
  constructor(notify) {
    this.notify = notify;
    this.data = null;
    this.channels = [];
    this.duration = 0;
    this.customFieldConfig = null;
  }
  // ============================================================================
  // SECTION 1: LOADING & RESET
  // ============================================================================
  /**
   * Charge un funscript depuis URL ou objet
   */
  async loadFromSource(src) {
    try {
      this.notify?.("status:funscript", { message: "Loading funscript from source...", type: "processing" });
      let data;
      if (typeof src === "string") {
        if (src.startsWith("http") || src.startsWith("/")) {
          data = await this._fetchWithCorsProxy(src);
        } else {
          data = JSON.parse(src);
        }
      } else {
        data = src;
      }
      return this.load(data);
    } catch (error) {
      this.notify?.("status:funscript", { message: "Failed to load funscript from source", type: "error", error: error.message });
      throw error;
    }
  }
  /**
   * Charge un funscript et extrait tous les canaux en instances Channel
   */
  load(funscriptData) {
    try {
      this.notify?.("status:funscript", { message: "Processing funscript data...", type: "processing" });
      this.data = typeof funscriptData === "string" ? JSON.parse(funscriptData) : funscriptData;
      this._extractChannels();
      this._calculateDuration();
      this.notify?.("status:funscript", { message: `Loaded ${this.channels.length} channels, ${this.duration.toFixed(2)}s`, type: "success" });
      this.notify?.("status:funscript", { message: `Channel extraction complete: ${this.channels.map((ch) => ch.name).join(", ")}`, type: "log" });
      this.notify?.("funscript:load", {
        data: this.data,
        channels: this.channels.map((ch) => ch.name),
        channelInstances: this.channels,
        duration: this.duration
      });
      this.notify?.("funscript:channels", {
        channels: this.channels.map((ch) => ch.name),
        channelInstances: this.channels,
        total: this.channels.length
      });
      return true;
    } catch (error) {
      this.notify?.("status:funscript", { message: "Failed to process funscript", type: "error", error: error.message });
      this._reset();
      return false;
    }
  }
  /**
   * Charge un funscript avec config utilisateur custom
   */
  loadWithCustomFieldConfig(funscriptData, customFieldConfig = null) {
    this.customFieldConfig = customFieldConfig;
    return this.load(funscriptData);
  }
  /**
   * Charge le funscript d'un item de playlist
   */
  async loadFromPlaylistItem(item) {
    if (!item) {
      this.reset();
      return true;
    }
    try {
      this.notify?.("status:funscript", { message: `Loading funscript for item: ${item.name || "Untitled"}`, type: "processing" });
      if (item.funscript) {
        if (typeof item.funscript === "object") {
          this.load(item.funscript);
        } else {
          await this.loadFromSource(item.funscript);
        }
        this.notify?.("status:funscript", { message: `Funscript loaded for: ${item.name || "Untitled"}`, type: "success" });
      } else {
        this.reset();
        this.notify?.("status:funscript", { message: "No funscript for current item", type: "info" });
      }
      return true;
    } catch (error) {
      this.notify?.("status:funscript", { message: `Failed to load funscript from playlist item: ${error.message}`, type: "error" });
      this.reset();
      return false;
    }
  }
  /**
   * Fetch avec proxy CORS si besoin
   */
  async _fetchWithCorsProxy(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      try {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
      } catch (proxyErr) {
        throw new Error(`Failed to fetch funscript. Direct: ${error.message}, Proxy: ${proxyErr.message}`);
      }
    }
  }
  /**
   * Vérifie si des canaux sont chargés
   */
  hasFunscript() {
    return this.channels.length > 0;
  }
  /**
   * Reset complet du manager
   */
  reset() {
    this._reset();
    this.notify?.("status:funscript", { message: "Funscript manager reset", type: "info" });
    this.notify?.("funscript:reset", {});
  }
  /**
   * Reset interne
   */
  _reset() {
    this.channels.forEach((channel) => channel.unplugAll());
    this.data = null;
    this.channels = [];
    this.duration = 0;
    this.customFieldConfig = null;
  }
  // ============================================================================
  // SECTION 2: GETTERS & BASIC INFO
  // ============================================================================
  getChannels() {
    return [...this.channels];
  }
  getChannelNames() {
    return this.channels.map((channel) => channel.name);
  }
  getChannel(channelName) {
    return this.channels.find((channel) => channel.name === channelName) || null;
  }
  hasChannel(channelName) {
    return this.getChannel(channelName) !== null;
  }
  getChannelsByType(hapticType) {
    return this.channels.filter((channel) => channel.type === hapticType);
  }
  getDuration() {
    return this.duration;
  }
  // ============================================================================
  // SECTION 3: INTERPOLATION PURE
  // ============================================================================
  interpolateAll(channelTimings) {
    const result = {};
    for (const [channelName, t_canal] of Object.entries(channelTimings)) {
      const channel = this.getChannel(channelName);
      if (channel) {
        const value = channel.interpolateAt(t_canal);
        if (value != null) {
          result[channelName] = value;
        }
      }
    }
    return result;
  }
  // ============================================================================
  // SECTION 4: AUTO-MAPPING OPTIMISÉ avec likely_capability
  // ============================================================================
  autoMapChannels(actuators) {
    if (this.channels.length === 0) {
      this.notify?.("status:funscript", { message: "No channels available for auto-mapping", type: "info" });
      return { suggestions: [], mapped: 0, total: 0, mode: "no channels" };
    }
    if (!actuators || actuators.length === 0) {
      this.notify?.("status:funscript", { message: "No actuators available for auto-mapping", type: "info" });
      return { suggestions: [], mapped: 0, total: this.channels.length, mode: "no actuators" };
    }
    this.notify?.("status:funscript", { message: `Starting auto-mapping for ${this.channels.length} channels with ${actuators.length} actuators...`, type: "processing" });
    const suggestions = [];
    let mappedCount = 0;
    for (const channel of this.channels) {
      const bestActuator = this._findBestActuatorMatch(channel, actuators);
      if (bestActuator) {
        suggestions.push({
          channelName: channel.name,
          actuatorIndex: bestActuator.index,
          confidence: "high",
          // Basé sur likely_capability, donc high confidence
          reason: `${channel.likelyCapability} match`
        });
        mappedCount++;
      } else {
        this.notify?.("status:funscript", { message: `No compatible actuator found for channel "${channel.name}" (${channel.type}, likely: ${channel.likelyCapability})`, type: "warning" });
      }
    }
    const mode = mappedCount === this.channels.length ? "complete" : mappedCount > 0 ? "partial" : "none";
    this.notify?.("status:funscript", { message: `Auto-mapping complete: ${mappedCount}/${this.channels.length} channels mapped`, type: mappedCount > 0 ? "success" : "warning" });
    return {
      suggestions,
      mapped: mappedCount,
      total: this.channels.length,
      mode
    };
  }
  /**
   * ✅ SIMPLIFIÉ: Trouve le meilleur actuateur pour un canal basé sur likely_capability
   */
  _findBestActuatorMatch(channel, actuators) {
    const compatibleActuators = actuators.filter(
      (actuator) => actuator.settings.enabled && channel.canPlugTo(actuator)
    );
    if (compatibleActuators.length === 0) {
      this.notify?.("status:funscript", { message: `No compatible actuators for channel "${channel.name}" (${channel.type})`, type: "log" });
      return null;
    }
    const exactMatch = compatibleActuators.find(
      (actuator) => actuator.capability === channel.likelyCapability
    );
    if (exactMatch) {
      this.notify?.("status:funscript", { message: `Perfect match: ${channel.name} → ${exactMatch.capability} (likely_capability match)`, type: "log" });
      return exactMatch;
    }
    const priorityOrder = ["linear", "vibrate", "oscillate", "rotate"];
    for (const capability of priorityOrder) {
      const actuator = compatibleActuators.find((a) => a.capability === capability);
      if (actuator) {
        this.notify?.("status:funscript", { message: `Fallback mapping: ${channel.name} → ${capability} (priority order)`, type: "log" });
        return actuator;
      }
    }
    const fallbackActuator = compatibleActuators[0] || null;
    if (fallbackActuator) {
      this.notify?.("status:funscript", { message: `Last resort mapping: ${channel.name} → ${fallbackActuator.capability} (first available)`, type: "log" });
    }
    return fallbackActuator;
  }
  // ============================================================================
  // SECTION 5: FUNSCRIPT PARSING SIMPLIFIÉ
  // ============================================================================
  /**
   * Extrait tous les canaux du funscript en créant des instances Channel
   */
  _extractChannels() {
    this.channels = [];
    this.notify?.("status:funscript", { message: "Extracting channels from funscript data...", type: "processing" });
    const metadata = this._extractMetadata();
    if (this.data.actions?.length) {
      const channel = this._createChannelFromActions("pos", this.data.actions, metadata);
      if (channel) {
        this.channels.push(channel);
        this.notify?.("status:funscript", { message: `Found main channel: ${channel.name} (${this.data.actions.length} actions)`, type: "log" });
      }
    }
    this._extractMultiAxisChannels(metadata);
    if (this.data.tracks) {
      this.notify?.("status:funscript", { message: `Processing ${Object.keys(this.data.tracks).length} nested tracks...`, type: "log" });
      for (const [trackName, trackData] of Object.entries(this.data.tracks)) {
        if (trackData.actions?.length) {
          const trackMetadata = { ...metadata, ...trackData.metadata };
          const channel = this._createChannelFromActions(trackName, trackData.actions, trackMetadata);
          if (channel) {
            this.channels.push(channel);
            this.notify?.("status:funscript", { message: `Found track channel: ${channel.name} (${trackData.actions.length} actions)`, type: "log" });
          }
        }
      }
    }
    if (this.channels.length === 0) {
      throw new Error("No valid channels found in funscript data");
    }
    this.notify?.("status:funscript", { message: `Channel extraction complete: ${this.channels.length} channels created`, type: "success" });
  }
  /**
   * Scan des canaux multi-axes dans les propriétés root
   */
  _extractMultiAxisChannels(metadata) {
    this.notify?.("status:funscript", { message: "Scanning for multi-axis channels...", type: "log" });
    let foundMultiAxis = 0;
    for (const [key, value] of Object.entries(this.data)) {
      if (this._isActionArray(value)) {
        if (key === "actions") continue;
        const channel = this._createChannelFromActions(key, value, metadata);
        if (channel) {
          this.channels.push(channel);
          foundMultiAxis++;
        }
      }
    }
    if (foundMultiAxis > 0) {
      this.notify?.("status:funscript", { message: `Found ${foundMultiAxis} multi-axis channels`, type: "log" });
    }
  }
  /**
   * Test si un objet est un array d'actions valide
   */
  _isActionArray(value) {
    return Array.isArray(value) && value.length > 0 && value.every(
      (action) => typeof action === "object" && action !== null && (action.at !== void 0 || action.t !== void 0 || action.time !== void 0)
    );
  }
  /**
   * ✅ SIMPLIFIÉ: Création d'une instance Channel (heuristique déléguée au Channel)
   */
  _createChannelFromActions(fieldName, actions, metadata = {}) {
    try {
      this.notify?.("status:funscript", { message: `Creating channel from field: ${fieldName} (${actions.length} actions)`, type: "log" });
      if (this.customFieldConfig && this.customFieldConfig[fieldName]) {
        const userConfig = this.customFieldConfig[fieldName];
        const fieldConfig2 = {
          timeField: userConfig.timeField || "at",
          valueField: userConfig.valueField || "pos",
          directionField: userConfig.directionField || null,
          durationField: userConfig.durationField || null
        };
        this.notify?.("status:funscript", { message: `Using user-defined config for ${fieldName}`, type: "success" });
        return new Channel(fieldName, actions, fieldConfig2, {
          ...metadata,
          originalField: fieldName
        }, this.notify);
      }
      const fieldConfig = this._buildBasicFieldConfig(fieldName, actions, metadata);
      const channel = new Channel(fieldName, actions, fieldConfig, {
        ...metadata,
        originalField: fieldName
      }, this.notify);
      this.notify?.("status:funscript", { message: `Channel created: ${channel.name} (${channel.type}, likely: ${channel.likelyCapability}, ${channel.actions.length} actions)`, type: "log" });
      return channel;
    } catch (error) {
      this.notify?.("status:funscript", { message: `Failed to create channel "${fieldName}": ${error.message}`, type: "error" });
      return null;
    }
  }
  /**
   * ✅ NOUVEAU: Construit un fieldConfig basique en détectant les champs disponibles
   */
  _buildBasicFieldConfig(fieldName, actions, metadata) {
    if (actions.length === 0) {
      return { timeField: "at", valueField: "pos" };
    }
    const firstAction = actions[0];
    const availableFields = Object.keys(firstAction);
    const timeField = this._detectTimeField(availableFields);
    const valueField = this._detectValueField(availableFields, fieldName);
    const directionField = this._detectDirectionField(availableFields);
    const durationField = this._detectDurationField(availableFields);
    this.notify?.("status:funscript", { message: `Field detection for ${fieldName}: time=${timeField}, value=${valueField}, direction=${directionField || "none"}, duration=${durationField || "none"}`, type: "log" });
    return {
      timeField,
      valueField,
      directionField,
      durationField
    };
  }
  /**
   * Détecte le champ temps dans les actions
   */
  _detectTimeField(availableFields) {
    const timeFields = ["at", "t", "time", "timestamp"];
    for (const field of timeFields) {
      if (availableFields.includes(field)) {
        return field;
      }
    }
    return "at";
  }
  /**
   * Détecte le champ valeur principal
   */
  _detectValueField(availableFields, fieldName) {
    if (availableFields.includes(fieldName.toLowerCase())) {
      return fieldName.toLowerCase();
    }
    const valueFields = [
      "pos",
      "position",
      "value",
      "val",
      "v",
      "speed",
      "spd",
      "s",
      "scalar",
      "intensity",
      "i"
    ];
    for (const field of valueFields) {
      if (availableFields.includes(field)) {
        return field;
      }
    }
    return "pos";
  }
  /**
   * Détecte le champ direction optionnel
   */
  _detectDirectionField(availableFields) {
    const directionFields = [
      "clockwise",
      "cw",
      "direction",
      "dir",
      "ccw",
      "counterclockwise"
    ];
    for (const field of directionFields) {
      if (availableFields.includes(field)) {
        return field;
      }
    }
    return null;
  }
  /**
   * Détecte le champ durée optionnel
   */
  _detectDurationField(availableFields) {
    const durationFields = ["duration", "dur", "d"];
    for (const field of durationFields) {
      if (availableFields.includes(field)) {
        return field;
      }
    }
    return null;
  }
  /**
   * Extrait métadonnées du funscript
   */
  _extractMetadata() {
    if (!this.data) return {};
    return {
      metadata: this.data.metadata || {},
      channels: this.data.channels || {},
      mapping: this.data.mapping || {},
      ...this.data.metadata
      // Flatten au niveau racine
    };
  }
  /**
   * Calcule la durée totale du funscript
   */
  _calculateDuration() {
    this.duration = Math.max(
      ...this.channels.map((channel) => channel.duration),
      0
    );
  }
  // ============================================================================
  // SECTION 6: HELPERS ET DEBUG
  // ============================================================================
  /**
   * ✅ NOUVEAU: Retourne les likely_capability de tous les canaux
   */
  getChannelSuggestions() {
    return this.channels.map((channel) => ({
      name: channel.name,
      type: channel.type,
      likelyCapability: channel.likelyCapability,
      actionCount: channel.getActionCount(),
      duration: channel.duration
    }));
  }
  /**
   * Informations de debug complètes
   */
  getDebugInfo() {
    return {
      loaded: this.hasFunscript(),
      channelCount: this.channels.length,
      duration: this.duration,
      channels: this.channels.map((ch) => ({
        name: ch.name,
        type: ch.type,
        likelyCapability: ch.likelyCapability,
        actionCount: ch.getActionCount(),
        connectedActuators: ch.getConnectedActuators().length
      })),
      customFieldConfig: this.customFieldConfig,
      dataKeys: this.data ? Object.keys(this.data) : []
    };
  }
  /**
   * Métadonnées d'un canal spécifique
   */
  getChannelMetadata(channelName) {
    const channel = this.getChannel(channelName);
    return channel ? channel.getMetadata() : {};
  }
  /**
   * Vérifie si un canal a des valeurs négatives
   */
  hasNegativeValues(channelName) {
    const channel = this.getChannel(channelName);
    return channel ? channel.type === HapticType.POLAR : false;
  }
  // ============================================================================
  // SECTION 7: DÉTECTION DES CHAMPS POUR CHANNELSETTINGS
  // ============================================================================
  /**
   * ✅ NOUVEAU: Analyse des champs disponibles dans chaque canal pour ChannelSettings
   */
  getDetectedFields() {
    if (!this.data) return {};
    const detectedFields = {};
    if (this.data.actions?.length > 0) {
      detectedFields["pos"] = this._analyzeFieldsInActions(this.data.actions);
    }
    for (const [key, value] of Object.entries(this.data)) {
      if (this._isActionArray(value) && key !== "actions") {
        detectedFields[key] = this._analyzeFieldsInActions(value);
      }
    }
    if (this.data.tracks) {
      for (const [trackName, trackData] of Object.entries(this.data.tracks)) {
        if (trackData.actions?.length) {
          detectedFields[trackName] = this._analyzeFieldsInActions(trackData.actions);
        }
      }
    }
    return detectedFields;
  }
  /**
   * ✅ NOUVEAU: Analyse les champs dans un array d'actions
   */
  _analyzeFieldsInActions(actions) {
    if (!actions || actions.length === 0) {
      return {
        availableTimeFields: ["at"],
        availableValueFields: ["pos"],
        availableDirectionFields: [],
        availableDurationFields: [],
        otherFields: [],
        sampleAction: null
      };
    }
    const firstAction = actions[0];
    const allFields = Object.keys(firstAction);
    return {
      // Champs de temps (étendus avec conventions buttplug)
      availableTimeFields: allFields.filter((k) => {
        const lower = k.toLowerCase();
        return ["at", "t", "time", "timestamp", "ms"].includes(lower);
      }),
      // Champs de valeur (étendus avec conventions buttplug)
      availableValueFields: allFields.filter((k) => {
        const lower = k.toLowerCase();
        return [
          "pos",
          "p",
          "position",
          "scalar",
          "speed",
          "spd",
          "s",
          "val",
          "v",
          "value",
          "intensity",
          "i"
        ].includes(lower);
      }),
      // Champs de direction (étendus avec conventions buttplug)
      availableDirectionFields: allFields.filter((k) => {
        const lower = k.toLowerCase();
        return ["clockwise", "cw", "direction", "dir", "ccw", "counterclockwise"].includes(lower);
      }),
      // Champs de durée (étendus avec conventions buttplug)
      availableDurationFields: allFields.filter((k) => {
        const lower = k.toLowerCase();
        return ["duration", "dur", "d", "delay", "ms", "millis", "time"].includes(lower);
      }),
      // Autres champs (non reconnus)
      otherFields: allFields.filter((k) => {
        const lower = k.toLowerCase();
        const knownFields = [
          // Time
          "at",
          "t",
          "time",
          "timestamp",
          "ms",
          // Value
          "pos",
          "p",
          "position",
          "scalar",
          "speed",
          "spd",
          "s",
          "val",
          "v",
          "value",
          "intensity",
          "i",
          // Direction
          "clockwise",
          "cw",
          "direction",
          "dir",
          "ccw",
          "counterclockwise",
          // Duration
          "duration",
          "dur",
          "d",
          "delay",
          "millis"
        ];
        return !knownFields.includes(lower);
      }),
      sampleAction: firstAction
    };
  }
};
__name(_FunscriptManager, "FunscriptManager");
let FunscriptManager = _FunscriptManager;
const _PlaylistUtils = class _PlaylistUtils {
  // ============================================================================
  // SECTION 1: MIME TYPE DETECTION
  // ============================================================================
  /**
   * Détecte le type MIME d'un fichier depuis son URL/extension
   */
  static detectMimeType(src) {
    if (src.startsWith("data:")) {
      const mimeMatch = src.match(/data:([^;]+)/);
      return mimeMatch ? mimeMatch[1] : "video/mp4";
    }
    const url = new URL(src, window.location.href);
    const extension = url.pathname.toLowerCase().split(".").pop();
    const mimeTypes = {
      // Video formats
      "mp4": "video/mp4",
      "webm": "video/webm",
      "ogg": "video/ogg",
      "mov": "video/quicktime",
      "avi": "video/x-msvideo",
      "mkv": "video/x-matroska",
      "m4v": "video/mp4",
      "ogv": "video/ogg",
      // Audio formats  
      "mp3": "audio/mpeg",
      "wav": "audio/wav",
      "ogg": "audio/ogg",
      "m4a": "audio/mp4",
      "aac": "audio/aac",
      "flac": "audio/flac",
      "oga": "audio/ogg",
      // Streaming formats
      "m3u8": "application/x-mpegURL",
      // HLS
      "mpd": "application/dash+xml",
      // DASH
      "ism": "application/vnd.ms-sstr+xml",
      // Smooth Streaming
      // Autres
      "json": "application/json",
      "funscript": "application/json"
    };
    return mimeTypes[extension] || "video/mp4";
  }
  // ============================================================================
  // SECTION 2: AUDIO GENERATION
  // ============================================================================
  /**
   * Génère un fichier audio silencieux de la durée spécifiée
   */
  static generateSilentAudio(duration) {
    const sampleRate = 44100;
    const channels = 1;
    const samples = Math.floor(duration * sampleRate);
    const buffer = new ArrayBuffer(44 + samples * 2);
    const view = new DataView(buffer);
    const writeString = /* @__PURE__ */ __name((offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }, "writeString");
    writeString(0, "RIFF");
    view.setUint32(4, 36 + samples * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, samples * 2, true);
    for (let i = 0; i < samples; i++) {
      view.setInt16(44 + i * 2, 0, true);
    }
    const blob = new Blob([buffer], { type: "audio/wav" });
    return URL.createObjectURL(blob);
  }
  // ============================================================================
  // SECTION 3: SVG POSTER GENERATION
  // ============================================================================
  /**
   * Génère un poster SVG de fallback basé sur le type d'item
   */
  static generateSVGPoster(item, index) {
    let iconName = "file";
    const bgColor = "#000000";
    if (item.sources && item.sources.length > 0) {
      const firstSource = item.sources[0];
      const srcLower = firstSource.src.toLowerCase();
      const typeLower = (firstSource.type || "").toLowerCase();
      if (typeLower.startsWith("audio/") || [".mp3", ".wav", ".ogg", ".m4a", ".aac"].some((ext) => srcLower.includes(ext))) {
        iconName = "music";
      } else if (typeLower.startsWith("video/") || [".mp4", ".webm", ".mov", ".avi", ".mkv"].some((ext) => srcLower.includes(ext))) {
        iconName = "film";
      }
    } else if (item.funscript) {
      iconName = "activity";
    } else if (item.duration) {
      iconName = "clock";
    }
    const iconSvg = feather.icons[iconName].toSvg({
      width: 16,
      height: 16,
      stroke: "white",
      "stroke-width": 2
    });
    const svg = `<svg width="48" height="32" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" fill="${bgColor}" rx="4"/>
      <g transform="translate(16, 8)">
        ${iconSvg}
      </g>
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
  // ============================================================================
  // SECTION 4: FUNSCRIPT METADATA EXTRACTION
  // ============================================================================
  /**
   * Extrait la durée d'un funscript depuis ses métadonnées ou actions
   */
  static extractFunscriptDuration(funscriptData) {
    try {
      let data = funscriptData;
      if (typeof funscriptData === "string") {
        if (funscriptData.startsWith("http") || funscriptData.startsWith("/")) {
          console.warn("Cannot extract duration from funscript URL synchronously");
          return 0;
        }
        data = JSON.parse(funscriptData);
      }
      if (!data || typeof data !== "object") {
        return 0;
      }
      if (data.duration && typeof data.duration === "number") {
        return data.duration;
      }
      let maxTime = 0;
      if (data.actions && Array.isArray(data.actions) && data.actions.length > 0) {
        const lastAction = data.actions[data.actions.length - 1];
        if (lastAction && typeof lastAction.at === "number") {
          maxTime = Math.max(maxTime, lastAction.at);
        }
      }
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value) && value.length > 0) {
          const lastItem = value[value.length - 1];
          if (lastItem && typeof lastItem.at === "number") {
            maxTime = Math.max(maxTime, lastItem.at);
          } else if (lastItem && typeof lastItem.t === "number") {
            maxTime = Math.max(maxTime, lastItem.t);
          } else if (lastItem && typeof lastItem.time === "number") {
            maxTime = Math.max(maxTime, lastItem.time);
          }
        }
      }
      const durationSeconds = maxTime > 0 ? maxTime / 1e3 + 1 : 0;
      return durationSeconds;
    } catch (error) {
      return 0;
    }
  }
  // ============================================================================
  // SECTION 5: VIDEO THUMBNAIL GENERATION
  // ============================================================================
  /**
   * Génère un poster depuis une frame vidéo
   */
  static async generatePosterFromVideo(videoSrc, timeOffset = 10, maxWidth = 480) {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.style.display = "none";
      document.body.appendChild(video);
      const cleanup = /* @__PURE__ */ __name(() => {
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      }, "cleanup");
      video.onloadedmetadata = () => {
        const aspectRatio = video.videoWidth / video.videoHeight;
        if (video.videoWidth > maxWidth) {
          canvas.width = maxWidth;
          canvas.height = maxWidth / aspectRatio;
        } else {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        video.currentTime = Math.min(timeOffset, video.duration - 1);
      };
      video.onseeked = () => {
        try {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataURL = canvas.toDataURL("image/jpeg", 0.8);
          if (dataURL && dataURL.length > 1e3) {
            const sizeKB = Math.round(dataURL.length * 0.75 / 1024);
            cleanup();
            resolve(dataURL);
          } else {
            cleanup();
            reject(new Error("Failed to generate valid poster"));
          }
        } catch (error) {
          cleanup();
          reject(error);
        }
      };
      video.onerror = () => {
        cleanup();
        reject(new Error("Video loading failed"));
      };
      video.src = videoSrc;
      video.load();
    });
  }
  // ============================================================================
  // SECTION 6: FILE VALIDATION & HELPERS
  // ============================================================================
  /**
   * Vérifie si un fichier est un media supporté
   */
  static isSupportedMediaFile(filename) {
    const extension = filename.toLowerCase().split(".").pop();
    const supportedExtensions = [
      // Video
      "mp4",
      "webm",
      "mov",
      "avi",
      "mkv",
      "ogv",
      "m4v",
      // Audio  
      "mp3",
      "wav",
      "ogg",
      "m4a",
      "aac",
      "flac"
    ];
    return supportedExtensions.includes(extension);
  }
  /**
   * Vérifie si un fichier est un funscript
   */
  static isFunscriptFile(filename) {
    const extension = filename.toLowerCase().split(".").pop();
    return ["funscript", "json"].includes(extension);
  }
  /**
   * Extrait le nom de fichier depuis une URL
   */
  static extractFilename(src) {
    if (src.startsWith("data:")) {
      return "uploaded_file";
    }
    try {
      const url = new URL(src, window.location.href);
      return url.pathname.split("/").pop().split(".")[0] || "unnamed";
    } catch {
      return "unnamed";
    }
  }
  // ============================================================================
  // COMPARAISON PROFONDE DE PLAYLISTS
  // ============================================================================
  /**
   * Compare deux playlists en profondeur pour détecter les vrais changements
   * Ignore les propriétés générées automatiquement (_id, poster généré, etc.)
   * @param {Array} playlist1 - Première playlist à comparer
   * @param {Array} playlist2 - Deuxième playlist à comparer
   * @returns {boolean} true si les playlists sont identiques en contenu
   */
  static deepComparePlaylist(playlist1, playlist2) {
    if (playlist1 === playlist2) return true;
    if (!playlist1 || !playlist2) return playlist1 === playlist2;
    if (playlist1.length !== playlist2.length) return false;
    for (let i = 0; i < playlist1.length; i++) {
      if (!_PlaylistUtils.deepComparePlaylistItem(playlist1[i], playlist2[i])) {
        return false;
      }
    }
    return true;
  }
  /**
   * Compare deux items de playlist en profondeur
   * Ignore les propriétés générées automatiquement
   * @param {Object} item1 - Premier item à comparer
   * @param {Object} item2 - Deuxième item à comparer
   * @returns {boolean} true si les items sont identiques en contenu
   */
  static deepComparePlaylistItem(item1, item2) {
    if (item1 === item2) return true;
    if (!item1 || !item2) return item1 === item2;
    const ignoredProps = /* @__PURE__ */ new Set([
      "_id",
      // ID généré automatiquement
      "_generatedPoster",
      // Flag de poster généré
      "poster"
      // Poster peut être généré automatiquement
    ]);
    const keys1 = Object.keys(item1).filter((key) => !ignoredProps.has(key));
    const keys2 = Object.keys(item2).filter((key) => !ignoredProps.has(key));
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      const val1 = item1[key];
      const val2 = item2[key];
      if (typeof val1 === "object" && typeof val2 === "object") {
        if (Array.isArray(val1) && Array.isArray(val2)) {
          if (!_PlaylistUtils.deepCompareArray(val1, val2)) return false;
        } else if (Array.isArray(val1) || Array.isArray(val2)) {
          return false;
        } else {
          if (!_PlaylistUtils.deepCompareObject(val1, val2)) return false;
        }
      } else {
        if (val1 !== val2) return false;
      }
    }
    return true;
  }
  /**
   * Compare deux arrays en profondeur
   * @param {Array} arr1 - Premier array
   * @param {Array} arr2 - Deuxième array
   * @returns {boolean} true si identiques
   */
  static deepCompareArray(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      const val1 = arr1[i];
      const val2 = arr2[i];
      if (typeof val1 === "object" && typeof val2 === "object") {
        if (Array.isArray(val1) && Array.isArray(val2)) {
          if (!_PlaylistUtils.deepCompareArray(val1, val2)) return false;
        } else if (!Array.isArray(val1) && !Array.isArray(val2)) {
          if (!_PlaylistUtils.deepCompareObject(val1, val2)) return false;
        } else {
          return false;
        }
      } else if (val1 !== val2) {
        return false;
      }
    }
    return true;
  }
  /**
   * Compare deux objets en profondeur
   * @param {Object} obj1 - Premier objet
   * @param {Object} obj2 - Deuxième objet
   * @returns {boolean} true si identiques
   */
  static deepCompareObject(obj1, obj2) {
    if (!obj1 || !obj2) return obj1 === obj2;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      const val1 = obj1[key];
      const val2 = obj2[key];
      if (typeof val1 === "object" && typeof val2 === "object") {
        if (Array.isArray(val1) && Array.isArray(val2)) {
          if (!_PlaylistUtils.deepCompareArray(val1, val2)) return false;
        } else if (!Array.isArray(val1) && !Array.isArray(val2)) {
          if (!_PlaylistUtils.deepCompareObject(val1, val2)) return false;
        } else {
          return false;
        }
      } else if (val1 !== val2) {
        return false;
      }
    }
    return true;
  }
};
__name(_PlaylistUtils, "PlaylistUtils");
let PlaylistUtils = _PlaylistUtils;
const _PlaylistManager = class _PlaylistManager {
  constructor(notify) {
    // ============================================================================
    // SECTION 1: TRAITEMENT PLAYLIST
    // ============================================================================
    /**
     * Point d'entrée principal enrichi avec notifications status
     */
    __publicField(this, "loadPlaylist", /* @__PURE__ */ __name(async (playlist) => {
      if (!playlist || playlist.length === 0) {
        this._resetPlaylist();
        this.notify?.("status:playlist", { message: "No playlist to load", type: "info" });
        this.notify?.("playlist:loaded", { items: [], originalPlaylist: [], totalItems: 0 });
        return [];
      }
      try {
        if (PlaylistUtils.deepComparePlaylist(this.originalPlaylist, playlist)) {
          this.notify?.("status:playlist", {
            message: "Playlist content identical, keeping current state",
            type: "log"
          });
          return this.items;
        }
        this.notify?.("status:playlist", {
          message: `Playlist content changed, processing ${playlist.length} items...`,
          type: "processing"
        });
        this.originalPlaylist = [...playlist];
        const processedItems = await this.processPlaylist(playlist);
        this.items = processedItems;
        this.currentIndex = processedItems.length > 0 ? 0 : -1;
        this.notify?.("status:playlist", {
          message: `Playlist loaded: ${processedItems.length} items processed`,
          type: "success"
        });
        this.notify?.("playlist:loaded", {
          items: this.items,
          originalPlaylist: this.originalPlaylist,
          totalItems: this.items.length
        });
        return this.items;
      } catch (error) {
        this.notify?.("status:playlist", {
          message: "Playlist loading failed",
          type: "error",
          error: error.message
        });
        throw error;
      }
    }, "loadPlaylist"));
    /**
     * Pipeline complet de traitement playlist
     */
    __publicField(this, "processPlaylist", /* @__PURE__ */ __name(async (playlist) => {
      this.notify?.("status:playlist", { message: `Starting playlist processing pipeline...`, type: "log" });
      const validItems = this.filterValidItems(playlist);
      this.notify?.("status:playlist", { message: `Filtered to ${validItems.length} valid items`, type: "log" });
      const withTypes = this.markItemTypes(validItems);
      this.notify?.("status:playlist", { message: `Item types marked`, type: "log" });
      const withFallbacks = this.addFallbackPosters(withTypes);
      this.notify?.("status:playlist", { message: `Fallback posters generated`, type: "log" });
      const withMedia = this.processNoMediaItems(withFallbacks);
      this.notify?.("status:playlist", { message: `Silent audio generated for haptic-only items`, type: "log" });
      const normalizedPlaylist = this.normalizeSources(withMedia);
      this.notify?.("status:playlist", { message: `Source normalization complete`, type: "log" });
      return normalizedPlaylist;
    }, "processPlaylist"));
    /**
     * Filtre les items de playlist valides
     */
    __publicField(this, "filterValidItems", /* @__PURE__ */ __name((playlist) => {
      this.notify?.("status:playlist", { message: `Filtering ${playlist.length} items for validity...`, type: "log" });
      const validItems = playlist.filter((item, index) => {
        if (item.sources && item.sources.length > 0) {
          return true;
        }
        if (item.funscript) {
          return true;
        }
        if (item.duration && !item.sources && !item.funscript) {
          this.notify?.("status:playlist", { message: `Filtered out timeline-only item ${index + 1}`, type: "log" });
          return false;
        }
        this.notify?.("status:playlist", { message: `Filtered out empty item ${index + 1}`, type: "log" });
        return false;
      });
      const filteredCount = playlist.length - validItems.length;
      if (filteredCount > 0) {
        this.notify?.("status:playlist", { message: `Filtered out ${filteredCount} invalid items`, type: "info" });
      }
      return validItems;
    }, "filterValidItems"));
    /**
     * Marquer les types avant enrichissement
     */
    __publicField(this, "markItemTypes", /* @__PURE__ */ __name((playlist) => {
      this.notify?.("status:playlist", { message: `Analyzing item types...`, type: "log" });
      return playlist.map((item, index) => {
        let itemType = "unknown";
        if (item.sources && item.sources.length > 0) {
          const firstSource = item.sources[0];
          const typeLower = (firstSource.type || PlaylistUtils.detectMimeType(firstSource.src)).toLowerCase();
          if (typeLower.startsWith("video/")) {
            itemType = item.funscript ? "video_haptic" : "video";
          } else if (typeLower.startsWith("audio/")) {
            itemType = item.funscript ? "audio_haptic" : "audio";
          } else {
            itemType = "media";
          }
        } else if (item.funscript) {
          itemType = "haptic";
        }
        this.notify?.("status:playlist", { message: `Item ${index + 1}: ${itemType}`, type: "log" });
        return {
          ...item,
          item_type: itemType
        };
      });
    }, "markItemTypes"));
    /**
     * Génère des sources audio silencieuses pour items sans media
     */
    __publicField(this, "processNoMediaItems", /* @__PURE__ */ __name((playlist) => {
      this.notify?.("status:playlist", { message: `Processing haptic-only items...`, type: "log" });
      let processedCount = 0;
      const result = playlist.map((item, index) => {
        if (item.sources && item.sources.length > 0) {
          return item;
        }
        if (item.funscript) {
          try {
            const funscriptDuration = PlaylistUtils.extractFunscriptDuration(item.funscript);
            if (funscriptDuration > 0) {
              const silentAudioUrl = PlaylistUtils.generateSilentAudio(funscriptDuration);
              processedCount++;
              this.notify?.("status:playlist", { message: `Generated ${funscriptDuration.toFixed(1)}s silent audio for item ${index + 1}`, type: "log" });
              return {
                ...item,
                sources: [{ src: silentAudioUrl, type: "audio/wav" }]
              };
            }
          } catch (error) {
            this.notify?.("status:playlist", { message: `Failed to process funscript for item ${index + 1}: ${error.message}`, type: "error" });
          }
        }
        this.notify?.("status:playlist", { message: `Unexpected item without sources or funscript at index ${index}`, type: "log" });
        return item;
      });
      if (processedCount > 0) {
        this.notify?.("status:playlist", { message: `Generated silent audio for ${processedCount} haptic-only items`, type: "info" });
      }
      return result;
    }, "processNoMediaItems"));
    /**
     * Normalise les sources via PlaylistUtils
     */
    __publicField(this, "normalizeSources", /* @__PURE__ */ __name((playlist) => {
      this.notify?.("status:playlist", { message: `Normalizing source MIME types...`, type: "log" });
      return playlist.map((item) => {
        if (!item.sources || item.sources.length === 0) {
          return item;
        }
        const normalizedSources = item.sources.map((source) => ({
          ...source,
          type: source.type || PlaylistUtils.detectMimeType(source.src)
        }));
        return {
          ...item,
          sources: normalizedSources
        };
      });
    }, "normalizeSources"));
    /**
     * Génère des fallbacks SVG via PlaylistUtils
     */
    __publicField(this, "addFallbackPosters", /* @__PURE__ */ __name((playlist) => {
      this.notify?.("status:playlist", { message: `Generating fallback posters...`, type: "log" });
      let generatedCount = 0;
      const result = playlist.map((item, index) => {
        if (item.poster) return item;
        generatedCount++;
        return {
          ...item,
          poster: PlaylistUtils.generateSVGPoster(item, index),
          _generatedPoster: true
        };
      });
      if (generatedCount > 0) {
        this.notify?.("status:playlist", { message: `Generated ${generatedCount} SVG fallback posters`, type: "log" });
      }
      return result;
    }, "addFallbackPosters"));
    // ============================================================================
    // SECTION 2: NAVIGATION
    // ============================================================================
    /**
     * Navigation vers l'item suivant
     */
    __publicField(this, "next", /* @__PURE__ */ __name(() => {
      if (this.items.length === 0) {
        this.notify?.("status:playlist", { message: "Cannot go next: empty playlist", type: "info" });
        return false;
      }
      const nextIndex = this.currentIndex + 1;
      if (nextIndex >= this.items.length) {
        this.notify?.("status:playlist", { message: "Cannot go next: end of playlist reached", type: "info" });
        return false;
      }
      return this.goTo(nextIndex);
    }, "next"));
    /**
     * Navigation vers l'item précédent
     */
    __publicField(this, "previous", /* @__PURE__ */ __name(() => {
      if (this.items.length === 0) {
        this.notify?.("status:playlist", { message: "Cannot go previous: empty playlist", type: "info" });
        return false;
      }
      const prevIndex = this.currentIndex - 1;
      if (prevIndex < 0) {
        this.notify?.("status:playlist", { message: "Cannot go previous: beginning of playlist reached", type: "info" });
        return false;
      }
      return this.goTo(prevIndex);
    }, "previous"));
    /**
     * Navigation vers un item spécifique
     */
    __publicField(this, "goTo", /* @__PURE__ */ __name((index) => {
      if (this.items.length === 0) {
        this.notify?.("status:playlist", { message: "Cannot navigate: empty playlist", type: "error" });
        return false;
      }
      if (index < 0 || index >= this.items.length) {
        this.notify?.("status:playlist", { message: `Cannot navigate to index ${index}: out of bounds`, type: "error" });
        return false;
      }
      const previousIndex = this.currentIndex;
      this.currentIndex = index;
      const currentItem = this.items[index];
      const itemName = currentItem?.name || `Item ${index + 1}`;
      this.notify?.("status:playlist", { message: `Playing: ${itemName} (${index + 1}/${this.items.length})`, type: "success" });
      this.notify?.("playlist:itemChanged", {
        index,
        item: currentItem ? { ...currentItem } : null,
        previousIndex,
        hasNext: this.canNext(),
        hasPrevious: this.canPrevious()
      });
      return true;
    }, "goTo"));
    /**
     * Vérifie si on peut aller au suivant
     */
    __publicField(this, "canNext", /* @__PURE__ */ __name(() => {
      return this.items.length > 0 && this.currentIndex < this.items.length - 1;
    }, "canNext"));
    /**
     * Vérifie si on peut aller au précédent
     */
    __publicField(this, "canPrevious", /* @__PURE__ */ __name(() => {
      return this.items.length > 0 && this.currentIndex > 0;
    }, "canPrevious"));
    // ============================================================================
    // SECTION 3: GETTERS D'ÉTAT
    // ============================================================================
    __publicField(this, "getCurrentIndex", /* @__PURE__ */ __name(() => this.currentIndex, "getCurrentIndex"));
    __publicField(this, "getCurrentItem", /* @__PURE__ */ __name(() => {
      if (this.currentIndex >= 0 && this.currentIndex < this.items.length) {
        return this.items[this.currentIndex];
      }
      return null;
    }, "getCurrentItem"));
    __publicField(this, "getOriginalPlaylist", /* @__PURE__ */ __name(() => [...this.originalPlaylist], "getOriginalPlaylist"));
    __publicField(this, "getPlaylistInfo", /* @__PURE__ */ __name(() => ({
      currentIndex: this.currentIndex,
      totalItems: this.items.length,
      hasPlaylist: this.items.length > 0,
      canNext: this.canNext(),
      canPrevious: this.canPrevious(),
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      duration: this.duration
    }), "getPlaylistInfo"));
    // ============================================================================
    // SECTION 4: SYNCHRONISATION PLAYBACK
    // ============================================================================
    /**
     * Synchronise l'état de lecture avec MediaPlayer
     */
    __publicField(this, "updatePlaybackState", /* @__PURE__ */ __name((isPlaying, currentTime = null, duration = null) => {
      let hasChanged = false;
      if (this.isPlaying !== isPlaying) {
        this.isPlaying = isPlaying;
        hasChanged = true;
      }
      if (currentTime !== null && this.currentTime !== currentTime) {
        this.currentTime = currentTime;
        hasChanged = true;
      }
      if (duration !== null && this.duration !== duration) {
        this.duration = duration;
        hasChanged = true;
      }
      if (hasChanged) {
        this.notify?.("status:playlist", { message: `Playback state: ${isPlaying ? "playing" : "paused"} ${currentTime?.toFixed(1)}s/${duration?.toFixed(1)}s`, type: "log" });
        this.notify?.("playlist:playbackChanged", {
          isPlaying: this.isPlaying,
          currentTime: this.currentTime,
          duration: this.duration,
          currentIndex: this.currentIndex,
          currentItem: this.getCurrentItem(),
          playlistInfo: this.getPlaylistInfo()
        });
      }
    }, "updatePlaybackState"));
    __publicField(this, "updateCurrentItemDuration", /* @__PURE__ */ __name((realDuration) => {
      const currentItem = this.getCurrentItem();
      if (!currentItem) return false;
      const oldDuration = currentItem.duration;
      currentItem.duration = realDuration;
      this.notify?.("status:playlist", { message: `Duration corrected: ${oldDuration?.toFixed(1) || "unknown"}s → ${realDuration.toFixed(1)}s`, type: "log" });
      this.notify?.("playlist:itemUpdated", {
        index: this.currentIndex,
        item: { ...currentItem },
        change: {
          field: "duration",
          oldValue: oldDuration,
          newValue: realDuration
        }
      });
      return true;
    }, "updateCurrentItemDuration"));
    // ============================================================================
    // SECTION 5: RESET & CLEANUP
    // ============================================================================
    __publicField(this, "_resetPlaylist", /* @__PURE__ */ __name(() => {
      this.currentIndex = -1;
      this.items = [];
      this.originalPlaylist = [];
      this.isPlaying = false;
      this.currentTime = 0;
      this.duration = 0;
    }, "_resetPlaylist"));
    __publicField(this, "reset", /* @__PURE__ */ __name(() => {
      this._resetPlaylist();
      this.notify?.("status:playlist", { message: "Playlist manager reset", type: "info" });
    }, "reset"));
    __publicField(this, "cleanup", /* @__PURE__ */ __name(() => {
      this._resetPlaylist();
      this.notify?.("status:playlist", { message: "Playlist manager cleanup completed", type: "log" });
    }, "cleanup"));
    // ============================================================================
    // SECTION 6: DEBUG & STATS
    // ============================================================================
    __publicField(this, "getStats", /* @__PURE__ */ __name(() => ({
      totalItems: this.items.length,
      currentIndex: this.currentIndex,
      isPlaying: this.isPlaying,
      hasGeneratedPosters: this.items.filter((item) => item._generatedPoster).length,
      processingComplete: true
    }), "getStats"));
    __publicField(this, "getDebugInfo", /* @__PURE__ */ __name(() => {
      const stats = this.getStats();
      this.notify?.("status:playlist", { message: `Debug info requested: ${stats.totalItems} items, index ${stats.currentIndex}, ${stats.hasGeneratedPosters} generated posters`, type: "log" });
      return {
        state: {
          currentIndex: this.currentIndex,
          totalItems: this.items.length,
          isPlaying: this.isPlaying,
          currentTime: this.currentTime,
          duration: this.duration
        },
        currentItem: this.getCurrentItem(),
        navigation: {
          canNext: this.canNext(),
          canPrevious: this.canPrevious()
        },
        stats
      };
    }, "getDebugInfo"));
    this.notify = notify;
    this.currentIndex = -1;
    this.items = [];
    this.originalPlaylist = [];
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
  }
};
__name(_PlaylistManager, "PlaylistManager");
let PlaylistManager = _PlaylistManager;
const _LoggingManager = class _LoggingManager {
  constructor(notify) {
    this.notify = notify;
    this.enableConsoleLogging = process.env.NODE_ENV !== "production";
    this.maxDebugLogs = 1e3;
    this.sessionStart = performance.now();
    this.debugLogs = [];
    this.statusEmojis = {
      "log": "📝",
      "info": "ℹ️",
      "success": "✅",
      "warning": "⚠️",
      "error": "❌",
      "processing": "⏳",
      "device": "🔌",
      "funscript": "📊",
      "playlist": "📋",
      "media": "🎬"
    };
  }
  // ============================================================================
  // CRÉATION ET FORMATAGE DES MESSAGES
  // ============================================================================
  /**
   * Crée un objet message structuré
   * @param {string} event - Nom de l'événement (ex: 'status:core', 'buttplug:device')
   * @param {object} data - Données du message { message, type, error }
   * @returns {object} Message structuré avec metadata
   */
  createMessage(event, data = {}) {
    return {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      relativeTime: ((performance.now() - this.sessionStart) / 1e3).toFixed(3),
      source: this._extractSource(event),
      type: data.type || "log",
      message: data.message || "",
      error: data.error || null,
      event,
      id: this._generateMessageId()
    };
  }
  /**
   * ✅ CORRIGÉ: Formate un message pour l'affichage console avec type toujours visible
   * @param {object} messageObj - Message structuré
   * @param {boolean} includeTimestamp - Inclure le timestamp relatif
   * @returns {string} Message formaté
   */
  formatMessage(messageObj, includeTimestamp = false) {
    const emoji = this.statusEmojis[messageObj.type] || "📝";
    const time = includeTimestamp ? `[${messageObj.relativeTime.padStart(8)}s] ` : "";
    const source = `[${messageObj.source.padEnd(13)}]`;
    const typeMap = {
      "log": "LOG",
      "info": "INFO",
      "success": "SUCCESS",
      "warning": "WARNING",
      "error": "ERROR",
      "processing": "PROCESSING"
    };
    const typeLabel = typeMap[messageObj.type] || messageObj.type.toUpperCase();
    const type = `[${typeLabel.padEnd(13)}]`;
    const message = messageObj.message;
    const error = messageObj.error ? ` (ERROR: ${messageObj.error})` : "";
    return `${emoji} ${time}${source} ${type} ${message}${error}`;
  }
  // ============================================================================
  // AJOUT ET GESTION DES LOGS
  // ============================================================================
  addInitialSessionMessage() {
    this.notify("status:core", {
      message: "FunPlayerCore session started",
      type: "info"
    });
  }
  /**
   * Ajoute un message de log (interface principale)
   * @param {string} event - Nom de l'événement
   * @param {object} data - Données du message
   */
  log(event, data = {}) {
    const messageObj = this.createMessage(event, data);
    this._addMessage(messageObj);
    if (this.enableConsoleLogging) {
      this._outputToConsole(messageObj);
    }
    this.notify?.("logging:new-message", { messageObj });
    return messageObj;
  }
  // ============================================================================
  // RÉCUPÉRATION DES LOGS
  // ============================================================================
  /**
   * Récupère tous les logs bruts
   * @returns {Array} Copie des logs pour éviter les mutations
   */
  getLogs() {
    return [...this.debugLogs];
  }
  /**
   * Récupère les logs formatés pour l'affichage
   * @returns {string} Logs formatés avec timestamps
   */
  getFormattedLogs() {
    return this.debugLogs.map((msg) => this.formatMessage(msg, true)).join("\n");
  }
  /**
   * Filtre les logs par critères
   * @param {object} filters - { source, type, since, until }
   * @returns {Array} Logs filtrés
   */
  getFilteredLogs(filters = {}) {
    return this.debugLogs.filter((log) => {
      if (filters.source && log.source !== filters.source) return false;
      if (filters.type && log.type !== filters.type) return false;
      if (filters.since && new Date(log.timestamp) < filters.since) return false;
      if (filters.until && new Date(log.timestamp) > filters.until) return false;
      return true;
    });
  }
  // ============================================================================
  // GESTION DES LOGS
  // ============================================================================
  /**
   * Vide tous les logs
   */
  clear() {
    this.debugLogs = [];
    this.sessionStart = performance.now();
    this.addInitialSessionMessage();
    this.notify("status:logging", { message: "Logs cleared", type: "info" });
  }
  /**
   * Génère le contenu complet des logs pour export
   * @returns {string} Contenu formaté pour fichier
   */
  generateExportContent() {
    const header = `FunPlayer Debug Log
Generated: ${(/* @__PURE__ */ new Date()).toISOString()}
Total entries: ${this.debugLogs.length}
Session duration: ${((performance.now() - this.sessionStart) / 1e3).toFixed(1)}s
Console logging: ${this.enableConsoleLogging ? "enabled" : "disabled"}

${"=".repeat(80)}

`;
    const content = this.debugLogs.map((msg) => this.formatMessage(msg, true)).join("\n");
    return header + content;
  }
  // ============================================================================
  // CONFIGURATION
  // ============================================================================
  /**
   * Active/désactive le logging console
   * @param {boolean} enabled 
   */
  setConsoleLogging(enabled) {
    this.enableConsoleLogging = enabled;
    this.notify?.("status:config", {
      message: `Console logging ${enabled ? "enabled" : "disabled"}`,
      type: "info"
    });
  }
  getConsoleLogging() {
    return this.enableConsoleLogging;
  }
  /**
   * Configure la limite de logs
   * @param {number} maxLogs 
   */
  setMaxLogs(maxLogs) {
    this.maxDebugLogs = Math.max(100, maxLogs);
    this._rotateLogsIfNeeded();
    this.notify?.("logging:config", {
      message: `Max logs set to ${this.maxDebugLogs}`,
      type: "info"
    });
  }
  getMaxLogs() {
    return this.maxDebugLogs;
  }
  // ============================================================================
  // MÉTHODES PRIVÉES
  // ============================================================================
  _addMessage(messageObj) {
    this.debugLogs.push(messageObj);
    this._rotateLogsIfNeeded();
  }
  _rotateLogsIfNeeded() {
    if (this.debugLogs.length > this.maxDebugLogs) {
      this.debugLogs = this.debugLogs.slice(-this.maxDebugLogs);
    }
  }
  _extractSource(event) {
    return event.split(":")[1] || event.split(":")[0] || "unknown";
  }
  _generateMessageId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  _outputToConsole(messageObj) {
    const formattedMsg = this.formatMessage(messageObj);
    switch (messageObj.type) {
      case "error":
        console.error(formattedMsg, messageObj.error || "");
        break;
      case "warning":
        console.warn(formattedMsg);
        break;
      case "info":
      case "success":
        console.info(formattedMsg);
        break;
      default:
        console.log(formattedMsg);
    }
  }
};
__name(_LoggingManager, "LoggingManager");
let LoggingManager = _LoggingManager;
const _FunPlayerCore = class _FunPlayerCore {
  constructor() {
    __publicField(this, "notify", /* @__PURE__ */ __name((event, data) => {
      this.listeners.forEach((callback) => {
        try {
          callback(event, data);
        } catch (error) {
          if (this.enableConsoleLogging) {
            console.error("Core: Listener error:", error);
          }
        }
      });
    }, "notify"));
    __publicField(this, "handleEvent", /* @__PURE__ */ __name((event, data) => {
      if (event.startsWith("status:")) {
        this._handleStatusEvent(event, data);
      } else if (event.startsWith("buttplug:")) {
        this._handleButtplugEvent(event, data);
      } else if (event.startsWith("channel:")) {
        this._handleChannelEvent(event, data);
      } else if (event.startsWith("actuator:")) {
        this._handleActuatorEvent(event, data);
      } else if (event.startsWith("funscript:")) {
        this._handleFunscriptEvent(event, data);
      } else if (event.startsWith("playlist:")) {
        this._handlePlaylistEvent(event, data);
      } else if (event.startsWith("media:")) {
        this._handleMediaEvent(event, data);
      } else if (event.startsWith("core:")) {
        this._handleCoreEvent(event, data);
      } else if (event.startsWith("logging:")) {
        this._handleLoggingEvent(event, data);
      } else if (event.startsWith("component:")) {
        this._handleComponentEvent(event, data);
      } else {
        if (this.enableConsoleLogging) {
          console.warn(`FunPlayerCore: Unknown event type ${event}`);
        }
      }
    }, "handleEvent"));
    // ============================================================================
    // EVENT HANDLERS MÉTIER (SIMPLIFIÉS)
    // ============================================================================
    /**
     * ✅ Handler unifié pour tous les status avec extraction automatique de la source
     */
    __publicField(this, "_handleStatusEvent", /* @__PURE__ */ __name((event, data) => {
      const messageObj = this.logging.log(event, data);
      switch (messageObj.type) {
        case "log":
          break;
        case "error":
          this.setError(messageObj);
          break;
        case "success":
        case "info":
        case "processing":
        default:
          this.setStatus(messageObj);
          break;
      }
    }, "_handleStatusEvent"));
    /**
     * ✅ CORRIGÉ: Handler d'événements core avec messageObj structuré
     */
    __publicField(this, "_handleCoreEvent", /* @__PURE__ */ __name((event, data) => {
      switch (event) {
        case "core:autoConnect":
          if (data.success) {
            this.setStatus({
              source: "core",
              message: `Auto-connected to ${data.device.name} (${data.mapResult.mapped}/${data.mapResult.total} channels mapped)`,
              type: "success"
            });
          } else {
            this.setError({
              source: "core",
              message: "Auto-connect failed",
              type: "error",
              error: data.error
            });
          }
          break;
        case "core:autoMap":
          this.setStatus({
            source: "core",
            message: `Auto-mapped ${data.result.mapped} new channels`,
            type: "success"
          });
          break;
      }
    }, "_handleCoreEvent"));
    /**
     * ✅ CORRIGÉ: Handler d'événements buttplug avec messageObj structuré
     */
    __publicField(this, "_handleButtplugEvent", /* @__PURE__ */ __name((event, data) => {
      switch (event) {
        case "buttplug:connection":
          this.setStatus({
            source: "buttplug",
            message: data.connected ? "Connected to Intiface" : "Disconnected from Intiface",
            type: data.connected ? "success" : "info"
          });
          break;
        case "buttplug:device":
          this.setStatus({
            source: "buttplug",
            message: data.device ? `Device selected: ${data.device.name}` : "No device selected",
            type: data.device ? "success" : "info"
          });
          if (data.device) {
            setTimeout(() => {
              this.autoMapChannels();
            }, 100);
          }
          break;
        case "buttplug:error":
          this.setError({
            source: "buttplug",
            message: "Device error",
            type: "error",
            error: data.error
          });
          break;
      }
    }, "_handleButtplugEvent"));
    /**
     * ✅ CORRIGÉ: Handler d'événements funscript (si utilisé)
     */
    __publicField(this, "_handleFunscriptEvent", /* @__PURE__ */ __name((event, data) => {
      switch (event) {
        case "funscript:load":
          setTimeout(() => {
            this.autoMapChannels();
          }, 100);
          break;
      }
    }, "_handleFunscriptEvent"));
    /**
     * ✅ CORRIGÉ: Handler d'événements playlist avec messageObj structuré
     */
    __publicField(this, "_handlePlaylistEvent", /* @__PURE__ */ __name((event, data) => {
      switch (event) {
        case "playlist:loaded":
          this.isReady = false;
          if (data.items && data.items.length > 0) {
            const firstItem = data.items[0];
            this.notify?.("status:core", {
              message: `Preloading funscript for first item: ${firstItem.name || "Untitled"}`,
              type: "log"
            });
            this.funscript.loadFromPlaylistItem(firstItem).then(() => {
              this.notify?.("status:core", {
                message: `First item ready: ${firstItem.name || "Untitled"}`,
                type: "success"
              });
              this.setReady(true);
            }).catch((error) => {
              this.notify?.("status:core", {
                message: `Failed to preload funscript for first item`,
                type: "error",
                error: error.message
              });
              this.setReady(true);
            });
          } else {
            this.setReady(true);
          }
          break;
        case "playlist:itemChanged":
          this.isReady = false;
          this.buttplug.stopAll().catch((err) => console.warn("Failed to stop devices:", err));
          if (data.item) {
            this.funscript.loadFromPlaylistItem(data.item).then(() => {
              this.setReady(true);
            }).catch((error) => {
              console.error("Failed to load funscript for item:", error);
              this.setReady(true);
            });
          } else {
            this.setReady(true);
          }
          break;
      }
    }, "_handlePlaylistEvent"));
    __publicField(this, "_handleActuatorEvent", /* @__PURE__ */ __name((event, data) => {
    }, "_handleActuatorEvent"));
    __publicField(this, "_handleChannelEvent", /* @__PURE__ */ __name((event, data) => {
    }, "_handleChannelEvent"));
    __publicField(this, "_handleLoggingEvent", /* @__PURE__ */ __name((event, data) => {
    }, "_handleLoggingEvent"));
    __publicField(this, "_handleMediaEvent", /* @__PURE__ */ __name((event, data) => {
    }, "_handleMediaEvent"));
    __publicField(this, "_handleComponentEvent", /* @__PURE__ */ __name((event, data) => {
    }, "_handleComponentEvent"));
    // ============================================================================
    // GLOBAL STATE HELPERS (INCHANGÉ)
    // ============================================================================
    /**
     * Met à jour le status à partir d'un messageObj
     */
    __publicField(this, "setStatus", /* @__PURE__ */ __name((messageObj) => {
      const formattedMessage = `[${messageObj.source.charAt(0).toUpperCase() + messageObj.source.slice(1)}] ${messageObj.message}`;
      this.status = formattedMessage;
      this.error = null;
      this.notify("core:status", { status: formattedMessage, error: null, messageObj });
    }, "setStatus"));
    /**
     * Met à jour l'erreur à partir d'un messageObj
     */
    __publicField(this, "setError", /* @__PURE__ */ __name((messageObj) => {
      const formattedMessage = `[${messageObj.source.charAt(0).toUpperCase() + messageObj.source.slice(1)}] ${messageObj.message}`;
      this.error = formattedMessage;
      this.status = "error";
      this.isReady = false;
      if (messageObj.error) {
        console.error(`FunPlayer Core Error: ${formattedMessage}`, messageObj.error);
      }
      this.notify("core:status", { status: "error", error: formattedMessage, messageObj });
    }, "setError"));
    __publicField(this, "setReady", /* @__PURE__ */ __name((ready) => {
      this.isReady = ready;
      this.notify("core:ready", { isReady: ready });
    }, "setReady"));
    this.enableConsoleLogging = process.env.NODE_ENV !== "production";
    this.debugLogs = [];
    this.maxDebugLogs = 1e3;
    this.sessionStart = performance.now();
    this._buttplug = null;
    this._funscript = null;
    this._playlist = null;
    this._logging = null;
    this.status = "idle";
    this.error = null;
    this.isReady = false;
    this.listeners = /* @__PURE__ */ new Set();
    this.addListener(this.handleEvent);
    this.logging.addInitialSessionMessage();
  }
  // ============================================================================
  // BUS D'ÉVÉNEMENTS (INCHANGÉ)
  // ============================================================================
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
  // ============================================================================
  // GETTERS DECLARATIFS VERS LES MANAGERS (INCHANGÉ)
  // ============================================================================
  get buttplug() {
    if (!this._buttplug) {
      this._buttplug = new ButtPlugManager(this.notify);
    }
    return this._buttplug;
  }
  get funscript() {
    if (!this._funscript) {
      this._funscript = new FunscriptManager(this.notify);
    }
    return this._funscript;
  }
  get playlist() {
    if (!this._playlist) {
      this._playlist = new PlaylistManager(this.notify);
    }
    return this._playlist;
  }
  get logging() {
    if (!this._logging) {
      this._logging = new LoggingManager(this.notify);
    }
    return this._logging;
  }
  // ============================================================================
  // CHANNEL/ACTUATOR HELPERS (INCHANGÉ)
  // ============================================================================
  plugChannel(channelName, actuatorIndex) {
    const channel = this.funscript.getChannel(channelName);
    const actuator = this.buttplug.getActuator(actuatorIndex);
    if (!channel || !actuator) return false;
    return channel.plug(actuator);
  }
  unplugChannel(channelName, actuatorIndex) {
    const channel = this.funscript.getChannel(channelName);
    const actuator = this.buttplug.getActuator(actuatorIndex);
    if (!channel || !actuator) return false;
    channel.unplug(actuator);
    return true;
  }
  unplugAllChannels() {
    this.funscript.getChannels().forEach((channel) => {
      channel.unplugAll();
    });
  }
  // ============================================================================
  // CORE METHODS (INCHANGÉ)
  // ============================================================================
  /**
   * ✅ CORRIGÉ: autoConnect avec gestion d'erreur cohérente
   */
  async autoConnect(scanTimeout = 3e3) {
    try {
      const connected = await this.buttplug.connect();
      if (!connected) {
        throw new Error("Failed to connect to Intiface Central");
      }
      const devices = this.buttplug.getDevices().filter((device) => device.index >= 0);
      if (devices.length === 0) {
        throw new Error("No physical device found");
      }
      const selectSuccess = this.buttplug.selectDevice(devices[0].index);
      if (!selectSuccess) {
        throw new Error("Failed to select device");
      }
      const mapResult = this.autoMapChannels();
      this.notify("core:autoConnect", {
        success: true,
        device: devices[0],
        mapResult,
        deviceInfo: this.buttplug.getDeviceInfo()
      });
      this.notify("status:core", {
        message: `AutoConnect successful: ${devices[0].name}`,
        type: "success"
      });
      return {
        success: true,
        device: devices[0],
        mapResult
      };
    } catch (error) {
      this.notify("core:autoConnect", {
        success: false,
        error: error.message
      });
      this.notify("status:core", {
        message: "AutoConnect failed",
        type: "error",
        error: error.message
      });
      return {
        success: false,
        error: error.message
      };
    }
  }
  async processHapticFrame(currentTime, options = {}) {
    const channels = this.funscript.getChannels();
    if (channels.length === 0) {
      return /* @__PURE__ */ new Map();
    }
    const times = this.buttplug.getTimeWithOffsets(currentTime);
    const channelTimings = Object.fromEntries(times.entries());
    const values = this.funscript.interpolateAll(channelTimings);
    const actuatorData = await this.buttplug.processChannels(values);
    return actuatorData;
  }
  // ============================================================================
  // SECTION: AUTOMAP INTELLIGENT AVEC PERSISTANCE
  // ============================================================================
  /**
   * ✅ NOUVEAU: AutoMap intelligent qui préserve la configuration utilisateur entre funscripts
   * 
   * STRATÉGIE:
   * 1. Sauvegarder les mappings actuels avant reset
   * 2. Pour chaque actuateur :
   *    - Priorité 1: Canal même nom que previousMappedChannel (si compatible)
   *    - Priorité 2: Canal avec capability matching (parmi non-mappés)
   *    - Priorité 3: Canal avec type matching (parmi non-mappés)
   *    - Priorité 4: Répéter 2-3 sur canaux déjà mappés (multi-assignment)
   */
  autoMapChannels() {
    const actuators = this.buttplug.getActuators();
    const channels = this.funscript.getChannels();
    if (actuators.length === 0) {
      this.notify("status:core", { message: "No actuators available for auto-mapping", type: "info" });
      return { mapped: 0, total: 0, skippedIncompatible: 0, strategy: "no_actuators" };
    }
    if (channels.length === 0) {
      this.notify("status:core", { message: "No channels available for auto-mapping", type: "info" });
      return { mapped: 0, total: actuators.length, skippedIncompatible: 0, strategy: "no_channels" };
    }
    this.notify("status:core", { message: `🎯 Starting intelligent autoMap: ${actuators.length} actuators → ${channels.length} channels`, type: "processing" });
    this._savePreviousMappings(actuators);
    const assignmentTracker = {
      mappedActuators: /* @__PURE__ */ new Set(),
      assignedChannels: /* @__PURE__ */ new Map(),
      // channelName → [actuatorIndex, ...]
      unmappedChannels: new Set(channels.map((ch) => ch.name)),
      statistics: {
        priorityByName: 0,
        priorityByCapability: 0,
        priorityByType: 0,
        fallbackMultiAssignment: 0,
        incompatible: 0
      }
    };
    this._phase1PriorityMapping(actuators, channels, assignmentTracker);
    this._phase2FallbackMapping(actuators, channels, assignmentTracker);
    const result = this._buildAutoMapResult(assignmentTracker, actuators.length);
    this.notify("core:autoMap", {
      result,
      deviceInfo: this.buttplug.getDeviceInfo(),
      strategy: "intelligent_persistent"
    });
    return result;
  }
  /**
   * ✅ NOUVEAU: Sauvegarde les mappings actuels dans previousMappedChannel
   */
  _savePreviousMappings(actuators) {
    let savedMappings = 0;
    for (const actuator of actuators) {
      if (actuator.isPlugged()) {
        const channelName = actuator.getAssignedChannelName();
        this.notify("status:core", { message: `💾 Saving mapping: Actuator ${actuator.index} was connected to "${channelName}"`, type: "log" });
        savedMappings++;
      }
    }
    if (savedMappings > 0) {
      this.notify("status:core", { message: `💾 Saved ${savedMappings} previous mappings for intelligent autoMap`, type: "info" });
    }
  }
  /**
   * ✅ NOUVEAU: Phase 1 - Mappings prioritaires
   */
  _phase1PriorityMapping(actuators, channels, tracker) {
    this.notify("status:core", { message: "🎯 Phase 1: Priority mapping (name → capability → type)", type: "log" });
    for (const actuator of actuators) {
      if (!actuator.settings.enabled) {
        this.notify("status:core", { message: `⏭️ Skipping disabled actuator ${actuator.index}`, type: "log" });
        continue;
      }
      if (this._tryMapByPreviousName(actuator, channels, tracker)) continue;
      if (this._tryMapByCapability(actuator, channels, tracker, false)) continue;
      if (this._tryMapByType(actuator, channels, tracker, false)) continue;
    }
  }
  /**
   * ✅ NOUVEAU: Phase 2 - Fallback multi-assignment
   */
  _phase2FallbackMapping(actuators, channels, tracker) {
    this.notify("status:core", { message: "🎯 Phase 2: Fallback multi-assignment on already mapped channels", type: "log" });
    for (const actuator of actuators) {
      if (!actuator.settings.enabled || tracker.mappedActuators.has(actuator.index)) {
        continue;
      }
      if (this._tryMapByCapability(actuator, channels, tracker, true)) continue;
      if (this._tryMapByType(actuator, channels, tracker, true)) continue;
      tracker.statistics.incompatible++;
      this.notify("status:core", { message: `❌ No mapping found for actuator ${actuator.index} (${actuator.capability}/${actuator.type})`, type: "warning" });
    }
  }
  /**
   * ✅ NOUVEAU: Tentative de mapping par nom précédent
   */
  _tryMapByPreviousName(actuator, channels, tracker) {
    const previousChannelName = actuator.getPreviousMappedChannelName();
    if (!previousChannelName) {
      return false;
    }
    const targetChannel = channels.find((ch) => ch.name === previousChannelName);
    if (!targetChannel) {
      this.notify("status:core", { message: `🔍 Previous channel "${previousChannelName}" not found in new funscript for actuator ${actuator.index}`, type: "log" });
      return false;
    }
    if (!actuator.canPlugTo(targetChannel)) {
      this.notify("status:core", { message: `🔍 Previous channel "${previousChannelName}" incompatible with actuator ${actuator.index} (${actuator.type} vs ${targetChannel.type})`, type: "log" });
      return false;
    }
    const success = targetChannel.plug(actuator);
    if (success) {
      this._recordSuccessfulMapping(actuator, targetChannel, tracker, "previous_name");
      tracker.statistics.priorityByName++;
      this.notify("status:core", { message: `✅ [PRIORITY NAME] Actuator ${actuator.index} → "${targetChannel.name}" (restored previous mapping)`, type: "success" });
      return true;
    }
    return false;
  }
  /**
   * ✅ NOUVEAU: Tentative de mapping par capability
   */
  _tryMapByCapability(actuator, channels, tracker, allowAlreadyMapped) {
    const candidateChannels = channels.filter((channel) => {
      if (!actuator.canPlugTo(channel)) return false;
      if (channel.likelyCapability !== actuator.capability) return false;
      const isAlreadyMapped = tracker.assignedChannels.has(channel.name);
      return allowAlreadyMapped || !isAlreadyMapped;
    });
    if (candidateChannels.length === 0) return false;
    const targetChannel = candidateChannels[0];
    const success = targetChannel.plug(actuator);
    if (success) {
      const phase = allowAlreadyMapped ? "MULTI-CAPABILITY" : "CAPABILITY";
      this._recordSuccessfulMapping(actuator, targetChannel, tracker, "capability");
      if (allowAlreadyMapped) {
        tracker.statistics.fallbackMultiAssignment++;
      } else {
        tracker.statistics.priorityByCapability++;
      }
      this.notify("status:core", { message: `✅ [${phase}] Actuator ${actuator.index} → "${targetChannel.name}" (${actuator.capability} match)`, type: "success" });
      return true;
    }
    return false;
  }
  /**
   * ✅ NOUVEAU: Tentative de mapping par type
   */
  _tryMapByType(actuator, channels, tracker, allowAlreadyMapped) {
    const candidateChannels = channels.filter((channel) => {
      if (!actuator.canPlugTo(channel)) return false;
      const isAlreadyMapped = tracker.assignedChannels.has(channel.name);
      return allowAlreadyMapped || !isAlreadyMapped;
    });
    if (candidateChannels.length === 0) return false;
    const targetChannel = candidateChannels[0];
    const success = targetChannel.plug(actuator);
    if (success) {
      const phase = allowAlreadyMapped ? "MULTI-TYPE" : "TYPE";
      this._recordSuccessfulMapping(actuator, targetChannel, tracker, "type");
      if (allowAlreadyMapped) {
        tracker.statistics.fallbackMultiAssignment++;
      } else {
        tracker.statistics.priorityByType++;
      }
      this.notify("status:core", { message: `✅ [${phase}] Actuator ${actuator.index} → "${targetChannel.name}" (${actuator.type} type match)`, type: "success" });
      return true;
    }
    return false;
  }
  /**
   * ✅ NOUVEAU: Enregistre un mapping réussi dans le tracker
   */
  _recordSuccessfulMapping(actuator, channel, tracker, reason) {
    tracker.mappedActuators.add(actuator.index);
    if (!tracker.assignedChannels.has(channel.name)) {
      tracker.assignedChannels.set(channel.name, []);
      tracker.unmappedChannels.delete(channel.name);
    }
    tracker.assignedChannels.get(channel.name).push({
      actuatorIndex: actuator.index,
      reason
    });
  }
  /**
   * ✅ NOUVEAU: Construit le résultat final de l'autoMap
   */
  _buildAutoMapResult(tracker, totalActuators) {
    const mapped = tracker.mappedActuators.size;
    const multiAssignedChannels = Array.from(tracker.assignedChannels.entries()).filter(([channelName, assignments]) => assignments.length > 1).length;
    this.notify("status:core", {
      message: `🎯 AutoMap completed: ${mapped}/${totalActuators} actuators mapped` + (multiAssignedChannels > 0 ? `, ${multiAssignedChannels} channels multi-assigned` : ""),
      type: mapped > 0 ? "success" : "warning"
    });
    const stats = tracker.statistics;
    if (stats.priorityByName > 0) {
      this.notify("status:core", { message: `📊 Priority mappings: ${stats.priorityByName} by name, ${stats.priorityByCapability} by capability, ${stats.priorityByType} by type`, type: "log" });
    }
    if (stats.fallbackMultiAssignment > 0) {
      this.notify("status:core", { message: `📊 Fallback multi-assignments: ${stats.fallbackMultiAssignment}`, type: "log" });
    }
    if (stats.incompatible > 0) {
      this.notify("status:core", { message: `📊 Incompatible actuators: ${stats.incompatible}`, type: "log" });
    }
    return {
      mapped,
      total: totalActuators,
      skippedIncompatible: stats.incompatible,
      strategy: "intelligent_persistent",
      statistics: {
        ...stats,
        multiAssignedChannels,
        unmappedChannels: tracker.unmappedChannels.size
      },
      details: {
        assignedChannels: Object.fromEntries(tracker.assignedChannels.entries()),
        unmappedChannels: Array.from(tracker.unmappedChannels)
      }
    };
  }
  // ============================================================================
  // UTILITAIRES POUR DEBUG ET GESTION MANUELLE
  // ============================================================================
  /**
   * ✅ NOUVEAU: Force l'oubli de tous les mappings précédents
   */
  clearAllPreviousMappings() {
    const actuators = this.buttplug.getActuators();
    let clearedCount = 0;
    for (const actuator of actuators) {
      if (actuator.hasPreviousMapping()) {
        actuator.forgetPreviousMapping();
        clearedCount++;
      }
    }
    this.notify("status:core", { message: `🧹 Cleared ${clearedCount} previous mappings`, type: "info" });
    return { cleared: clearedCount, total: actuators.length };
  }
  /**
   * ✅ NOUVEAU: Diagnostic des mappings précédents
   */
  getPreviousMappingsDiagnostic() {
    const actuators = this.buttplug.getActuators();
    const channels = this.funscript.getChannelNames();
    const diagnostics = actuators.map((actuator) => {
      const previousChannel = actuator.getPreviousMappedChannelName();
      const currentChannel = actuator.getAssignedChannelName();
      const isAvailable = previousChannel ? channels.includes(previousChannel) : false;
      const isCompatible = isAvailable ? actuator.canPlugTo(this.funscript.getChannel(previousChannel)) : false;
      return {
        actuatorIndex: actuator.index,
        capability: actuator.capability,
        type: actuator.type,
        currentChannel,
        previousChannel,
        isAvailable,
        isCompatible,
        canRestore: isAvailable && isCompatible
      };
    });
    const stats = {
      total: actuators.length,
      withPreviousMapping: diagnostics.filter((d) => d.previousChannel).length,
      canRestore: diagnostics.filter((d) => d.canRestore).length,
      lost: diagnostics.filter((d) => d.previousChannel && !d.isAvailable).length,
      incompatible: diagnostics.filter((d) => d.previousChannel && d.isAvailable && !d.isCompatible).length
    };
    return { diagnostics, stats };
  }
  getCompatibilityDiagnostic() {
    const allChannels = this.funscript.getChannels();
    const allActuators = this.buttplug.getActuators();
    if (allChannels.length === 0) {
      return { channels: [], actuators: [], issues: ["No funscript loaded"] };
    }
    const channelDiag = allChannels.map((channel) => {
      const compatibleActuators = allActuators.filter(
        (actuator) => channel.canPlugTo(actuator)
      ).map((actuator) => actuator.index);
      return {
        channel: channel.name,
        type: channel.type,
        valueRange: channel.valueRange,
        compatibleActuators,
        isOrphaned: compatibleActuators.length === 0,
        connectedActuators: Array.from(channel.connectedActuators.keys())
      };
    });
    const actuatorDiag = allActuators.map((actuator) => {
      const compatibleChannels = allChannels.filter(
        (channel) => channel.canPlugTo(actuator)
      ).map((channel) => channel.name);
      return {
        index: actuator.index,
        type: actuator.type,
        capability: actuator.capability,
        compatibleChannels,
        isUnused: compatibleChannels.length === 0,
        assignedChannel: actuator.getAssignedChannelName()
      };
    });
    const issues = [];
    const orphanedChannels = channelDiag.filter((c) => c.isOrphaned);
    const unusedActuators = actuatorDiag.filter((a) => a.isUnused);
    if (orphanedChannels.length > 0) {
      issues.push(`${orphanedChannels.length} channel(s) have no compatible actuators`);
    }
    if (unusedActuators.length > 0) {
      issues.push(`${unusedActuators.length} actuator(s) have no compatible channels`);
    }
    return {
      channels: channelDiag,
      actuators: actuatorDiag,
      issues
    };
  }
  // ============================================================================
  // STATUS & CLEANUP HELPERS (INCHANGÉ)
  // ============================================================================
  getStatus() {
    return {
      status: this.status,
      error: this.error,
      isReady: this.isReady,
      buttplug: this.buttplug.getStatus(),
      funscript: this.funscript?.getDebugInfo() || { loaded: false },
      playlist: this.playlist.getStats()
    };
  }
  async cleanup() {
    if (this._buttplug) {
      await this._buttplug.cleanup();
      this._buttplug = null;
    }
    if (this._playlist) {
      this._playlist.cleanup();
      this._playlist = null;
    }
    if (this._funscript) {
      this._funscript.reset();
      this._funscript = null;
    }
    this.status = "idle";
    this.error = null;
    this.isReady = false;
    this.listeners.clear();
    if (this.logging.enableConsoleLogging) {
      console.log("Core: Cleanup complete");
    }
    if (this._logging) {
      this._logging.cleanup();
      this._logging = null;
    }
  }
};
__name(_FunPlayerCore, "FunPlayerCore");
__publicField(_FunPlayerCore, "instance", null);
let FunPlayerCore = _FunPlayerCore;
var __defProp$7 = Object.defineProperty;
var __defNormalProp$7 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp$7");
var __publicField$7 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField$7");
const _PlaylistComponent = class _PlaylistComponent extends Component {
  constructor(props) {
    super(props);
    __publicField$7(this, "handleEvent", (event, data) => {
      const eventsToReact = [
        "playlist:loaded",
        "playlist:itemChanged"
      ];
      if (eventsToReact.includes(event)) {
        this._triggerRender();
        this.core.notify("component:resize", {
          source: "PlaylistComponent",
          reason: event === "playlist:loaded" ? "playlist-loaded" : "item-changed"
        });
      }
    });
    __publicField$7(this, "_triggerRender", () => {
      this.setState((prevState) => ({
        renderTrigger: prevState.renderTrigger + 1
      }));
    });
    __publicField$7(this, "handleItemClick", (index) => {
      const success = this.core.playlist.goTo(index);
      if (!success) {
        console.error("PlaylistComponent: Failed to go to item", index);
      }
    });
    __publicField$7(this, "getItemTitle", (item, index) => {
      if (item.name) {
        return item.name;
      }
      if (item.title) {
        return item.title;
      }
      if (item.sources && item.sources.length > 0) {
        const firstSource = item.sources[0];
        if (firstSource.src.startsWith("data:")) {
          const mimeMatch = firstSource.src.match(/data:([^;]+)/);
          const mimeType = mimeMatch ? mimeMatch[1] : "unknown";
          return `Uploaded ${mimeType.split("/")[0]}`;
        }
        const filename = firstSource.src.split("/").pop().split(".")[0];
        return filename || `Item ${index + 1}`;
      }
      if (item.funscript && typeof item.funscript === "string") {
        if (item.funscript.startsWith("data:")) {
          return `Uploaded funscript`;
        }
        const filename = item.funscript.split("/").pop().split(".")[0];
        return filename || `Haptic ${index + 1}`;
      }
      return `Item ${index + 1}`;
    });
    __publicField$7(this, "getItemInfo", (item) => {
      const info = [];
      switch (item.item_type) {
        case "video":
          info.push("VIDEO");
          break;
        case "video_haptic":
          info.push("VIDEO");
          break;
        case "audio":
          info.push("AUDIO");
          break;
        case "audio_haptic":
          info.push("AUDIO");
          break;
        case "haptic":
          info.push("HAPTIC");
          break;
      }
      if (item.duration) {
        const minutes = Math.floor(item.duration / 60);
        const seconds = Math.floor(item.duration % 60);
        info.push(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      }
      if (["video_haptic", "audio_haptic", "haptic"].includes(item.item_type)) {
        info.push("🎮");
      }
      return info.join(" • ");
    });
    this.core = props.core;
    this.state = {
      renderTrigger: 0
    };
    this.coreListener = null;
  }
  componentDidMount() {
    this.coreListener = this.core.addListener(this.handleEvent);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      const reason = this.props.visible ? "shown" : "hidden";
      this.core.notify("component:resize", {
        source: "PlaylistComponent",
        reason: `visibility-${reason}`
      });
    }
  }
  componentWillUnmount() {
    if (this.coreListener) {
      this.coreListener();
      this.coreListener = null;
    }
  }
  // ============================================================================
  // RENDER 
  // ============================================================================
  render() {
    const { visible = true } = this.props;
    if (!visible) {
      return null;
    }
    const playlist = this.core.playlist.items;
    const currentIndex = this.core.playlist.getCurrentIndex();
    if (playlist.length <= 1) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-playlist", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-playlist-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "fp-playlist-title", children: [
        "Playlist (",
        playlist.length,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-playlist-items", children: playlist.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `fp-playlist-item ${index === currentIndex ? "fp-playlist-item-active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => this.handleItemClick(index), "onClick"),
          title: item.description || this.getItemTitle(item, index),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-playlist-item-thumbnail", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                className: "fp-playlist-item-image",
                src: item.poster,
                alt: this.getItemTitle(item, index),
                onError: /* @__PURE__ */ __name((e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = "📄";
                }, "onError")
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-playlist-item-content", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-playlist-item-title", children: this.getItemTitle(item, index) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-playlist-item-info", children: this.getItemInfo(item) })
            ] })
          ]
        },
        index
      )) })
    ] });
  }
};
__name(_PlaylistComponent, "PlaylistComponent");
let PlaylistComponent = _PlaylistComponent;
const FeatherIcon = /* @__PURE__ */ __name(({
  name,
  size = 16,
  color = null,
  strokeWidth = 2,
  className = "",
  style = {},
  ...props
}) => {
  const icon = feather.icons[name];
  if (!icon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`FeatherIcon: icon '${name}' not found`);
    }
    return null;
  }
  const svgAttrs = {
    width: `var(--icon-size, ${size}px)`,
    height: `var(--icon-size, ${size}px)`,
    "stroke-width": `var(--icon-stroke-width, ${strokeWidth})`,
    stroke: color || `var(--icon-color, currentColor)`,
    class: className
  };
  const svgString = icon.toSvg(svgAttrs);
  const wrapperStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    verticalAlign: "middle",
    transform: "translateY(1px)",
    ...style
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      style: wrapperStyle,
      dangerouslySetInnerHTML: { __html: svgString },
      ...props
    }
  );
}, "FeatherIcon");
var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp$6");
var __publicField$6 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField$6");
const _ButtPlugSettingsComponent = class _ButtPlugSettingsComponent extends Component {
  constructor(props) {
    super(props);
    __publicField$6(this, "handleEvent", (event, data) => {
      const buttplugEvents = [
        "buttplug:connection",
        // Status connexion changé
        "buttplug:scan",
        // Scan démarré/arrêté
        "buttplug:device",
        // Device sélectionné
        "funscript:load",
        // Nouveaux canaux → affecte la validité connection
        "funscript:channels"
        // Canaux mis à jour → affecte la validité connection
      ];
      if (buttplugEvents.includes(event)) {
        this._triggerRender();
        if (event === "buttplug:connection") {
          this.setState({ isAutoConnecting: false });
        }
        if (event === "buttplug:scan") {
          this.setState({ isRescanActive: false });
        }
      }
    });
    __publicField$6(this, "_triggerRender", () => {
      this.setState((prevState) => ({
        renderTrigger: prevState.renderTrigger + 1
      }));
    });
    __publicField$6(this, "handleAutoConnect", async () => {
      if (this.state.isAutoConnecting) return;
      this.setState({ isAutoConnecting: true });
      try {
        const success = await this.core.buttplug.connect();
        if (success) {
          await this.core.buttplug.scan();
        }
      } catch (error) {
        console.error("Auto-connect failed:", error);
      }
    });
    __publicField$6(this, "handleDisconnect", async () => {
      try {
        await this.core.buttplug.disconnect();
      } catch (error) {
        console.error("Disconnect failed:", error);
      }
    });
    __publicField$6(this, "handleRescan", async () => {
      if (this.state.isRescanActive) return;
      this.setState({ isRescanActive: true });
      try {
        await this.core.buttplug.scan();
      } catch (error) {
        console.error("Rescan failed:", error);
      }
    });
    __publicField$6(this, "handleDeviceChange", (deviceIndex) => {
      try {
        const numericIndex = deviceIndex === "-1" ? -1 : parseInt(deviceIndex);
        this.core.buttplug.selectDevice(numericIndex);
      } catch (error) {
        console.error("Device selection failed:", error);
      }
    });
    this.core = props.core;
    this.state = {
      isAutoConnecting: false,
      isRescanActive: false,
      // ✅ NOUVEAU: État pour le bouton rescan
      renderTrigger: 0
    };
    this.coreListener = null;
  }
  componentDidMount() {
    this.coreListener = this.core.addListener(this.handleEvent);
  }
  componentWillUnmount() {
    if (this.coreListener) {
      this.coreListener();
      this.coreListener = null;
    }
  }
  // ============================================================================
  // RENDER SIMPLIFIÉ - Accès direct aux données via core
  // ============================================================================
  render() {
    const {
      onToggleSettings,
      isSettingsExpanded
    } = this.props;
    const { isAutoConnecting, isRescanActive } = this.state;
    const buttplugStatus = this.core.buttplug.getStatus();
    const funscriptChannels = this.core.funscript.getChannelNames();
    const devices = this.core.buttplug.getDevices();
    const selectedDevice = this.core.buttplug.getSelected();
    const isConnected = buttplugStatus?.isConnected || false;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-buttplug-settings", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-buttplug-settings-status", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FeatherIcon,
          {
            name: isConnected ? "wifi" : "wifi-off",
            size: 18,
            className: "fp-buttplug-settings-connection-icon"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fp-buttplug-settings-device-name", children: selectedDevice?.name || "Unknown device" }),
        funscriptChannels.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fp-buttplug-settings-no-haptic-hint", children: "No haptic" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-buttplug-settings-actions", children: [
        !isConnected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "fp-buttplug-settings-connect-btn",
            onClick: this.handleAutoConnect,
            disabled: isAutoConnecting || funscriptChannels.length === 0,
            title: funscriptChannels.length === 0 ? "Load funscript first" : "Connect to Intiface Central",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FeatherIcon,
                {
                  name: isAutoConnecting ? "loader" : "zap",
                  size: 14,
                  className: "fp-icon-button",
                  style: { marginRight: "4px" }
                }
              ),
              isAutoConnecting ? "Connecting..." : "Connect"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "fp-buttplug-settings-disconnect-btn",
              onClick: this.handleDisconnect,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FeatherIcon,
                  {
                    name: "zap-off",
                    size: 14,
                    className: "fp-icon-button",
                    style: { marginRight: "4px" }
                  }
                ),
                "Disconnect"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "fp-buttplug-settings-rescan-btn",
              onClick: this.handleRescan,
              disabled: isRescanActive,
              title: "Scan for new devices",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                FeatherIcon,
                {
                  name: isRescanActive ? "loader" : "search",
                  size: 14,
                  className: "fp-icon-button"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            className: "fp-buttplug-settings-device-select",
            value: selectedDevice?.index ?? -1,
            onChange: /* @__PURE__ */ __name((e) => this.handleDeviceChange(e.target.value), "onChange"),
            disabled: funscriptChannels.length === 0,
            title: funscriptChannels.length === 0 ? "Load funscript first" : "Select haptic device",
            children: devices.map((device) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: device.index, children: [
              device.name,
              " ",
              device.index === -1 ? "(Virtual)" : ""
            ] }, device.index))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "fp-buttplug-settings-toggle",
            onClick: onToggleSettings,
            title: isSettingsExpanded ? "Hide haptic settings" : "Show haptic settings",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              FeatherIcon,
              {
                name: isSettingsExpanded ? "chevron-up" : "chevron-down",
                size: 20,
                className: "fp-icon-button",
                style: { marginLeft: "6px", marginRight: "6px" }
              }
            )
          }
        )
      ] })
    ] });
  }
};
__name(_ButtPlugSettingsComponent, "ButtPlugSettingsComponent");
let ButtPlugSettingsComponent = _ButtPlugSettingsComponent;
var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp$5");
var __publicField$5 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField$5");
const _ActuatorSettingsComponent = class _ActuatorSettingsComponent extends Component {
  constructor(props) {
    super(props);
    __publicField$5(this, "handleEvent", (event, data) => {
      const { actuator } = this.props;
      if (!actuator) return;
      if (event === "actuator:settingsChanged" || event === "actuator:settingsReset" || event === "actuator:plugged" || event === "actuator:unplugged") {
        if (data.actuatorIndex === actuator.index) {
          this._triggerRender();
        }
        return;
      }
      if (event === "channel:plugged" || event === "channel:unplugged") {
        if (data.actuatorIndex === actuator.index) {
          this._triggerRender();
        }
        return;
      }
      const globalEvents = [
        "funscript:load",
        // Nouveaux canaux disponibles
        "funscript:channels",
        // Liste des canaux mise à jour
        "buttplug:device"
        // Device changé (peut affecter l'actuateur)
      ];
      if (globalEvents.includes(event)) {
        this._triggerRender();
      }
    });
    __publicField$5(this, "_triggerRender", () => {
      this.setState((prevState) => ({
        renderTrigger: prevState.renderTrigger + 1
      }));
    });
    __publicField$5(this, "handleToggleExpanded", () => {
      this.setState({ isExpanded: !this.state.isExpanded }, () => {
        this.core.notify("component:resize", {
          source: "ActuatorSettingsComponent",
          reason: `actuator-${this.props.actuator?.index}-${this.state.isExpanded ? "expanded" : "collapsed"}`
        });
      });
    });
    __publicField$5(this, "handleGlobalScaleChange", (scale) => {
      this.core.buttplug.setGlobalScale(scale);
    });
    __publicField$5(this, "handleActuatorSettingChange", (key, value) => {
      const { actuator } = this.props;
      if (!actuator) return;
      actuator.updateSettings({ [key]: value });
    });
    __publicField$5(this, "handleChannelMapping", (channelName) => {
      const { actuator } = this.props;
      if (!actuator) return;
      if (channelName === "" || channelName === null) {
        actuator.unplug();
      } else {
        const channel = this.core.funscript.getChannel(channelName);
        if (channel) {
          channel.plug(actuator);
        }
      }
    });
    this.core = props.core;
    this.state = {
      isExpanded: false,
      renderTrigger: 0
    };
    this.coreListener = null;
  }
  componentDidMount() {
    this.coreListener = this.core.addListener(this.handleEvent);
  }
  componentWillUnmount() {
    if (this.coreListener) {
      this.coreListener();
      this.coreListener = null;
    }
  }
  // ============================================================================
  // RENDER PRINCIPAL - Structure simplifiée
  // ============================================================================
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-actuator-settings", children: [
      this.renderCompactLine(),
      this.renderExpandedSettings()
    ] });
  }
  // ============================================================================
  // LIGNE COMPACTE - Suppression du sur-nesting fp-expandable > fp-compact-line
  // ============================================================================
  renderCompactLine() {
    const { actuator } = this.props;
    const { isExpanded } = this.state;
    if (!actuator) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-actuator-settings-error", children: "No actuator provided" });
    }
    const allChannels = this.core.funscript.getChannels();
    const compatibleChannels = allChannels.filter(
      (channel) => channel.canPlugTo(actuator)
    );
    const assignedChannel = actuator.assignedChannel;
    let usabilityMessage = null;
    if (actuator.settings.enabled) {
      if (allChannels.length === 0) {
        usabilityMessage = "Load funscript first";
      } else if (compatibleChannels.length === 0) {
        const hasRotateCapability = actuator.capability === "rotate";
        const hasNegativeChannels = allChannels.some((channel) => channel.type === "polar");
        if (hasNegativeChannels && !hasRotateCapability) {
          usabilityMessage = "Funscript has bipolar channels (needs rotate actuator)";
        } else if (!hasNegativeChannels && hasRotateCapability) {
          usabilityMessage = "Funscript has only unipolar channels (rotate not needed)";
        } else {
          usabilityMessage = "No compatible channels in current funscript";
        }
      }
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-actuator-settings-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `fp-actuator-settings-badge ${!actuator.settings.enabled ? "fp-actuator-settings-badge-disabled" : ""}`, children: [
        "#",
        actuator.index,
        " (",
        actuator.capability,
        ")",
        !actuator.settings.enabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "fp-actuator-settings-warning",
            title: usabilityMessage,
            children: "⚠️"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "fp-actuator-settings-enable-toggle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "fp-actuator-settings-enable-checkbox",
          type: "checkbox",
          checked: actuator.settings.enabled,
          onChange: /* @__PURE__ */ __name((e) => this.handleActuatorSettingChange("enabled", e.target.checked), "onChange"),
          title: !actuator.settings.enabled ? usabilityMessage : "Enable/disable this actuator"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          className: "fp-actuator-settings-channel-select",
          value: assignedChannel?.name || "",
          onChange: /* @__PURE__ */ __name((e) => this.handleChannelMapping(e.target.value), "onChange"),
          disabled: !actuator.settings.enabled,
          title: !actuator.settings.enabled ? usabilityMessage : "Assign compatible channel to this actuator",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "None" }),
            compatibleChannels.map((channel) => {
              const bipolarIndicator = channel.type === "polar" ? " (±)" : "";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: channel.name, children: [
                channel.name,
                bipolarIndicator
              ] }, channel.name);
            })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "fp-actuator-settings-expand-toggle",
          onClick: this.handleToggleExpanded,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeatherIcon,
            {
              name: isExpanded ? "chevron-up" : "chevron-down",
              size: 18,
              className: "fp-icon-button"
            }
          )
        }
      )
    ] });
  }
  // ============================================================================
  // SETTINGS EXPANDUS - Suppression du sur-nesting fp-expanded > fp-layout-column
  // ============================================================================
  renderExpandedSettings() {
    if (!this.state.isExpanded) return null;
    const { actuator } = this.props;
    if (!actuator) return null;
    const allChannels = this.core.funscript.getChannels();
    const compatibleChannels = allChannels.filter(
      (channel) => channel.canPlugTo(actuator)
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-actuator-settings-expanded", children: [
      !actuator.settings.enabled && allChannels.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-actuator-settings-warning-message", children: "📄 Load a funscript first" }),
      actuator.settings.enabled && compatibleChannels.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-actuator-settings-compatibility-info", children: [
        "Compatible with ",
        compatibleChannels.length,
        " channel(s): ",
        compatibleChannels.map((ch) => ch.name).join(", ")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-actuator-settings-controls", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-actuator-settings-scale-control", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fp-actuator-settings-scale-label", children: [
            "Scale: ",
            ((actuator.settings.scale || 1) * 100).toFixed(0),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "fp-actuator-settings-scale-range",
              type: "range",
              min: "0",
              max: "2",
              step: "0.01",
              value: actuator.settings.scale || 1,
              onChange: /* @__PURE__ */ __name((e) => this.handleActuatorSettingChange("scale", parseFloat(e.target.value)), "onChange"),
              disabled: !actuator.settings.enabled
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-actuator-settings-offset-control", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fp-actuator-settings-offset-label", children: [
            "Time Offset: ",
            ((actuator.settings.timeOffset || 0) * 1e3).toFixed(0),
            "ms"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "fp-actuator-settings-offset-range",
              type: "range",
              min: "-0.5",
              max: "0.5",
              step: "0.001",
              value: actuator.settings.timeOffset || 0,
              onChange: /* @__PURE__ */ __name((e) => this.handleActuatorSettingChange("timeOffset", parseFloat(e.target.value)), "onChange"),
              disabled: !actuator.settings.enabled
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fp-actuator-settings-invert-toggle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "fp-actuator-settings-invert-checkbox",
            type: "checkbox",
            checked: actuator.settings.invert || false,
            onChange: /* @__PURE__ */ __name((e) => this.handleActuatorSettingChange("invert", e.target.checked), "onChange"),
            disabled: !actuator.settings.enabled
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fp-actuator-settings-invert-label", children: "Invert Values" })
      ] })
    ] });
  }
};
__name(_ActuatorSettingsComponent, "ActuatorSettingsComponent");
let ActuatorSettingsComponent = _ActuatorSettingsComponent;
var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp$4");
var __publicField$4 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField$4");
const _ChannelSettingsComponent = class _ChannelSettingsComponent extends Component {
  constructor(props) {
    super(props);
    __publicField$4(this, "handleEvent", (event, data) => {
      const eventsToReact = [
        "funscript:load",
        // Nouveau funscript → reset config
        "funscript:reset"
        // Reset → masquer
      ];
      if (eventsToReact.includes(event)) {
        if (event === "funscript:load") {
          this.setState({ pendingConfig: {} });
        }
        if (event === "funscript:reset") {
          this.setState({ isExpanded: false });
        }
        this._triggerRender();
      }
    });
    __publicField$4(this, "_triggerRender", () => {
      this.setState((prevState) => ({
        renderTrigger: prevState.renderTrigger + 1
      }));
    });
    __publicField$4(this, "handleToggleExpanded", () => {
      this.setState({ isExpanded: !this.state.isExpanded }, () => {
        this.core.notify("component:resize", {
          source: "ChannelSettingsComponent",
          reason: `config-${this.state.isExpanded ? "expanded" : "collapsed"}`
        });
      });
    });
    __publicField$4(this, "handleFieldChange", (channelName, fieldType, value) => {
      this.setState((prevState) => ({
        pendingConfig: {
          ...prevState.pendingConfig,
          [channelName]: {
            ...prevState.pendingConfig[channelName],
            [fieldType]: value === "none" ? null : value
          }
        }
      }));
    });
    __publicField$4(this, "handleValidate", () => {
      try {
        const originalData = this.core.funscript.data;
        if (originalData) {
          this.core.funscript.loadWithCustomFieldConfig(originalData, pendingConfig);
          this.setState({ pendingConfig: {}, isExpanded: false });
        }
      } catch (error) {
        console.error("Failed to apply channel configuration:", error);
      }
    });
    __publicField$4(this, "getCurrentConfig", (channelName, fieldType) => {
      const { pendingConfig: pendingConfig2 } = this.state;
      const channel = this.core.funscript.getChannel(channelName);
      if (pendingConfig2[channelName] && pendingConfig2[channelName][fieldType] !== void 0) {
        return pendingConfig2[channelName][fieldType] || "none";
      }
      if (channel && channel.fieldConfig) {
        return channel.fieldConfig[fieldType] || "none";
      }
      const defaults = {
        timeField: "at",
        valueField: "pos",
        directionField: "none",
        durationField: "none"
      };
      return defaults[fieldType] || "none";
    });
    __publicField$4(this, "getAvailableFields", (detectedFields, fieldType) => {
      const fieldMap = {
        timeField: "availableTimeFields",
        valueField: "availableValueFields",
        directionField: "availableDirectionFields",
        durationField: "availableDurationFields"
      };
      const availableKey = fieldMap[fieldType];
      return detectedFields[availableKey] || [];
    });
    __publicField$4(this, "hasPendingChanges", () => {
      return Object.keys(this.state.pendingConfig).length > 0;
    });
    __publicField$4(this, "renderExpandedSettings", () => {
      if (!this.state.isExpanded) return null;
      const detectedFields = this.core.funscript.getDetectedFields();
      const channelNames = Object.keys(detectedFields);
      if (channelNames.length === 0) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-channel-settings-empty", children: "No channels detected. Load a funscript first." });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-channel-settings-expanded", children: [
        channelNames.map(
          (channelName) => this.renderChannelConfig(channelName, detectedFields[channelName])
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-channel-settings-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "fp-channel-settings-validate-btn",
              onClick: this.handleValidate,
              disabled: !this.hasPendingChanges(),
              children: "✓ Validate Changes"
            }
          ),
          this.hasPendingChanges() && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "fp-channel-settings-cancel-btn",
              onClick: /* @__PURE__ */ __name(() => this.setState({ pendingConfig: {} }), "onClick"),
              children: "Cancel"
            }
          )
        ] })
      ] });
    });
    __publicField$4(this, "renderChannelConfig", (channelName, detectedFields) => {
      const fieldTypes = [
        { key: "timeField", label: "Time" },
        { key: "valueField", label: "Value" },
        { key: "directionField", label: "Direction" },
        { key: "durationField", label: "Duration" }
      ];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-channel-settings-channel", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fp-channel-settings-channel-name", children: channelName }),
        fieldTypes.map(({ key, label }) => {
          const availableFields = this.getAvailableFields(detectedFields, key);
          const currentValue = this.getCurrentConfig(channelName, key);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-channel-settings-field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fp-channel-settings-field-label", children: [
              label,
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "fp-channel-settings-field-select",
                value: currentValue,
                onChange: /* @__PURE__ */ __name((e) => this.handleFieldChange(channelName, key, e.target.value), "onChange"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", children: "none" }),
                  availableFields.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: field, children: field }, field))
                ]
              }
            )
          ] }, key);
        })
      ] });
    });
    this.core = props.core;
    this.state = {
      isExpanded: false,
      renderTrigger: 0,
      pendingConfig: {}
      // Config en cours avant validation
    };
    this.coreListener = null;
  }
  componentDidMount() {
    this.coreListener = this.core.addListener(this.handleEvent);
  }
  componentWillUnmount() {
    if (this.coreListener) {
      this.coreListener();
      this.coreListener = null;
    }
  }
  // ============================================================================
  // RENDER
  // ============================================================================
  render() {
    const { isExpanded } = this.state;
    if (!this.core.funscript.hasFunscript()) {
      return null;
    }
    const detectedFields = this.core.funscript.getDetectedFields();
    const channelCount = Object.keys(detectedFields).length;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-channel-settings", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-channel-settings-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "fp-channel-settings-title", children: [
          "Configure Action Channels (",
          channelCount,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "fp-channel-settings-toggle",
            onClick: this.handleToggleExpanded,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              FeatherIcon,
              {
                name: isExpanded ? "chevron-up" : "chevron-down",
                size: 18,
                className: "fp-icon-button"
              }
            )
          }
        )
      ] }),
      this.renderExpandedSettings()
    ] });
  }
};
__name(_ChannelSettingsComponent, "ChannelSettingsComponent");
let ChannelSettingsComponent = _ChannelSettingsComponent;
var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp$3");
var __publicField$3 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField$3");
const _HapticSettingsComponent = class _HapticSettingsComponent extends Component {
  constructor(props) {
    super(props);
    __publicField$3(this, "handleEvent", (event, data) => {
      const structuralEvents = [
        "buttplug:device",
        // Device changé → nouveaux actuateurs
        "funscript:load",
        // Nouveau funscript → nouveaux canaux
        "funscript:channels",
        // Canaux mis à jour
        "buttplug:connection"
        // Connection status → affecte l'affichage global
      ];
      const masterEvents = [
        "buttplug:globalScale",
        // Master scale changé
        "buttplug:globalOffset",
        // Master offset changé
        "core:autoConnect",
        // Auto-connect terminé
        "core:autoMap"
        // Auto-map terminé
      ];
      if (structuralEvents.includes(event) || masterEvents.includes(event)) {
        this._triggerRender();
      }
    });
    __publicField$3(this, "_triggerRender", () => {
      this.setState((prevState) => ({
        renderTrigger: prevState.renderTrigger + 1
      }));
    });
    __publicField$3(this, "handleToggleExpanded", () => {
      this.setState({ isExpanded: !this.state.isExpanded }, () => {
        this.core.notify("component:resize", {
          source: "HapticSettingsComponent",
          reason: `main-settings-${this.state.isExpanded ? "expanded" : "collapsed"}`
        });
      });
    });
    __publicField$3(this, "handleAutoMap", () => {
      this.core.autoMapChannels();
    });
    __publicField$3(this, "handleUpdateRateChange", (newRate) => {
      this.props.onUpdateRateChange?.(newRate);
    });
    __publicField$3(this, "handleGlobalScaleChange", (scale) => {
      this.core.buttplug.setGlobalScale(scale);
    });
    __publicField$3(this, "handleGlobalOffsetChange", (offset) => {
      this.core.buttplug.setGlobalOffset(offset);
    });
    __publicField$3(this, "handleIntifaceUrlChange", (newUrl) => {
      this.core.buttplug.setIntifaceUrl(newUrl);
    });
    this.core = props.core;
    this.state = {
      isExpanded: false,
      renderTrigger: 0
    };
    this.coreListener = null;
  }
  componentDidMount() {
    this.coreListener = this.core.addListener(this.handleEvent);
  }
  componentWillUnmount() {
    if (this.coreListener) {
      this.coreListener();
      this.coreListener = null;
    }
  }
  // ============================================================================
  // RENDER PRINCIPAL - Déjà clean
  // ============================================================================
  render() {
    const { isExpanded } = this.state;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ButtPlugSettingsComponent,
        {
          core: this.core,
          onToggleSettings: this.handleToggleExpanded,
          isSettingsExpanded: isExpanded
        }
      ),
      this.renderExpandedSettings()
    ] });
  }
  // ============================================================================
  // SETTINGS EXPANDUS - Suppression de tout le sur-nesting
  // ============================================================================
  renderExpandedSettings() {
    if (!this.state.isExpanded) return null;
    const funscriptChannels = this.core.funscript.getChannelNames();
    const actuators = this.core.buttplug.getActuators();
    const updateRate = this.props.onGetUpdateRate?.() || 60;
    const globalOffset = this.core.buttplug.getGlobalOffset();
    const globalScale = this.core.buttplug.getGlobalScale();
    const intifaceUrl = this.core.buttplug.getIntifaceUrl();
    const isConnected = this.core.buttplug.getStatus()?.isConnected || false;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-expanded", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-connection-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h6", { className: "fp-haptic-settings-section-title", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeatherIcon,
            {
              name: "bluetooth",
              size: 18,
              className: "fp-haptic-settings-section-header-icon"
            }
          ),
          "Connection"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-connection-controls", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-url-control", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "fp-haptic-settings-url-label", children: "Intiface WebSocket URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-url-input-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "fp-haptic-settings-url-input",
                  type: "text",
                  value: intifaceUrl,
                  onChange: /* @__PURE__ */ __name((e) => this.handleIntifaceUrlChange(e.target.value), "onChange"),
                  placeholder: "ws://localhost:12345",
                  title: "WebSocket URL for Intiface Central connection"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "fp-haptic-settings-url-reset-btn",
                  onClick: /* @__PURE__ */ __name(() => this.handleIntifaceUrlChange("ws://localhost:12345"), "onClick"),
                  title: "Reset to default",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FeatherIcon,
                    {
                      name: "rotate-ccw",
                      size: 14,
                      className: "fp-icon-button"
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "fp-haptic-settings-url-status", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FeatherIcon,
                {
                  name: isConnected ? `check-circle` : `alert-triangle`,
                  size: 14,
                  className: "fp-icon",
                  style: { marginRight: "6px" }
                }
              ),
              isConnected ? `Connected to ${intifaceUrl}` : `Not connected`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-rate-control", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "fp-haptic-settings-rate-label", children: "Update Rate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "fp-haptic-settings-rate-select",
                value: updateRate,
                onChange: /* @__PURE__ */ __name((e) => this.handleUpdateRateChange(parseInt(e.target.value)), "onChange"),
                title: "Haptic command frequency (higher = smoother but more CPU)",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 10, children: "10 Hz" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 30, children: "30 Hz" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 60, children: "60 Hz" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 90, children: "90 Hz" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 120, children: "120 Hz" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "fp-haptic-settings-rate-info", children: [
              (1e3 / updateRate).toFixed(1),
              "ms interval"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-haptic-settings-divider" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-master-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h6", { className: "fp-haptic-settings-section-title", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeatherIcon,
            {
              name: "sliders",
              size: 18,
              className: "fp-haptic-settings-section-header-icon"
            }
          ),
          "Master"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-master-controls", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-scale-control", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fp-haptic-settings-scale-label", children: [
              "Global Scale: ",
              ((globalScale || 1) * 100).toFixed(0),
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-scale-input-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "fp-haptic-settings-scale-range",
                  type: "range",
                  min: "0",
                  max: "2",
                  step: "0.01",
                  value: globalScale || 1,
                  onChange: /* @__PURE__ */ __name((e) => this.handleGlobalScaleChange(parseFloat(e.target.value)), "onChange"),
                  title: "Master intensity control for all actuators"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "fp-haptic-settings-scale-number",
                  type: "number",
                  value: globalScale || 1,
                  onChange: /* @__PURE__ */ __name((e) => this.handleGlobalScaleChange(parseFloat(e.target.value) || 1), "onChange"),
                  step: "0.01",
                  min: "0",
                  max: "2"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-offset-control", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fp-haptic-settings-offset-label", children: [
              "Global Offset: ",
              ((globalOffset || 0) * 1e3).toFixed(0),
              "ms"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-offset-input-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "fp-haptic-settings-offset-range",
                  type: "range",
                  value: globalOffset || 0,
                  onChange: /* @__PURE__ */ __name((e) => this.handleGlobalOffsetChange(parseFloat(e.target.value)), "onChange"),
                  min: "-1",
                  max: "1",
                  step: "0.01",
                  title: "Global timing offset for all actuators"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "fp-haptic-settings-offset-number",
                  type: "number",
                  value: globalOffset || 0,
                  onChange: /* @__PURE__ */ __name((e) => this.handleGlobalOffsetChange(parseFloat(e.target.value) || 0), "onChange"),
                  step: "0.01",
                  min: "-1",
                  max: "1"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      funscriptChannels.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-haptic-settings-divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-haptic-settings-channels-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h6", { className: "fp-haptic-settings-section-title", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeatherIcon,
            {
              name: "music",
              size: 18,
              className: "fp-haptic-settings-section-header-icon"
            }
          ),
          "Channels"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChannelSettingsComponent, { core: this.core })
      ] }),
      funscriptChannels.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-haptic-settings-divider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-actuators-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-settings-actuators-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h6", { className: "fp-haptic-settings-section-title", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FeatherIcon,
                {
                  name: "activity",
                  size: 18,
                  className: "fp-haptic-settings-section-header-icon"
                }
              ),
              "Actuators"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: "fp-haptic-settings-automap-btn",
                onClick: this.handleAutoMap,
                children: [
                  "Auto Map All (",
                  actuators.length,
                  ")"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-haptic-settings-actuators-list", children: actuators.map((actuator) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActuatorSettingsComponent,
            {
              core: this.core,
              actuator
            },
            actuator.index
          )) })
        ] })
      ] })
    ] });
  }
};
__name(_HapticSettingsComponent, "HapticSettingsComponent");
let HapticSettingsComponent = _HapticSettingsComponent;
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp$2");
var __publicField$2 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField$2");
const _HapticVisualizerComponent = class _HapticVisualizerComponent extends Component {
  constructor(props) {
    super(props);
    __publicField$2(this, "initCanvas", () => {
      const canvas = this.canvasRef.current;
      if (!canvas) return;
      this.ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      this.ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    });
    __publicField$2(this, "gaussian", (x, mu, sigma) => {
      const coef = 1 / (sigma * Math.sqrt(2 * Math.PI));
      const exp = Math.exp(-Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2)));
      return coef * exp;
    });
    __publicField$2(this, "calculateSigma", (intensity) => {
      const { sigmaMin, sigmaMax } = this.config;
      return sigmaMax - intensity * (sigmaMax - sigmaMin);
    });
    __publicField$2(this, "getActuatorPosition", (index, total) => {
      if (total <= 1) return 0.5;
      return (index + 1) / (total + 1);
    });
    __publicField$2(this, "getCurrentActuatorData", () => {
      return this.props.getCurrentActuatorData?.() || /* @__PURE__ */ new Map();
    });
    __publicField$2(this, "getConfiguredActuatorCount", () => {
      const actuatorData = this.getCurrentActuatorData();
      return Math.max(1, actuatorData.size);
    });
    __publicField$2(this, "calculateNormalizationFactor", (n) => {
      if (this.normalizationCache.has(n)) {
        return this.normalizationCache.get(n);
      }
      const { resolution, sigmaMin } = this.config;
      let maxIntensity = 0;
      for (let i = 0; i <= resolution; i++) {
        const x = i / resolution;
        let total = 0;
        for (let j = 0; j < n; j++) {
          const mu = this.getActuatorPosition(j, n);
          total += this.gaussian(x, mu, sigmaMin);
        }
        maxIntensity = Math.max(maxIntensity, total);
      }
      const factor = maxIntensity > 0 ? 1 / maxIntensity : 1;
      this.normalizationCache.set(n, factor);
      return factor;
    });
    __publicField$2(this, "getActiveActuators", (actuatorData) => {
      return Array.from(actuatorData.entries());
    });
    __publicField$2(this, "rebuildColorCache", () => {
      const { resolution, rainbowRotation } = this.config;
      this.colorCache.rainbowColors = Array.from(
        { length: resolution + 1 },
        (_, i) => this.getColorAt(i / resolution)
      );
      this.colorCache.actuatorColors = /* @__PURE__ */ new Map();
      for (let nActuators = 1; nActuators <= 8; nActuators++) {
        for (let i = 0; i < nActuators; i++) {
          const mu = this.getActuatorPosition(i, nActuators);
          const color = this.getColorAt(mu);
          this.colorCache.actuatorColors.set(`${nActuators}-${i}`, color);
        }
      }
      this.colorCache.lastRotation = rainbowRotation;
      this.colorCache.lastResolution = resolution;
    });
    __publicField$2(this, "ensureColorCache", (nActive) => {
      const { resolution, rainbowRotation } = this.config;
      if (this.colorCache.lastRotation !== rainbowRotation || this.colorCache.lastResolution !== resolution || this.colorCache.lastNActive !== nActive) {
        this.rebuildColorCache();
        this.colorCache.lastNActive = nActive;
      }
    });
    __publicField$2(this, "getCachedRainbowColor", (xIndex) => {
      return this.colorCache.rainbowColors[xIndex];
    });
    __publicField$2(this, "getCachedActuatorColor", (nActuators, actuatorIndex, intensity = 1) => {
      const baseColor = this.colorCache.actuatorColors.get(`${nActuators}-${actuatorIndex}`);
      if (!baseColor) return [255, 255, 255];
      return [
        Math.round(baseColor[0] * intensity),
        Math.round(baseColor[1] * intensity),
        Math.round(baseColor[2] * intensity)
      ];
    });
    __publicField$2(this, "hsvToRgb", (h, s, v) => {
      const c = v * s;
      const x = c * (1 - Math.abs(h / 60 % 2 - 1));
      const m = v - c;
      let r, g, b;
      if (h >= 0 && h < 60) {
        [r, g, b] = [c, x, 0];
      } else if (h >= 60 && h < 120) {
        [r, g, b] = [x, c, 0];
      } else if (h >= 120 && h < 180) {
        [r, g, b] = [0, c, x];
      } else if (h >= 180 && h < 240) {
        [r, g, b] = [0, x, c];
      } else if (h >= 240 && h < 300) {
        [r, g, b] = [x, 0, c];
      } else {
        [r, g, b] = [c, 0, x];
      }
      return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255)
      ];
    });
    __publicField$2(this, "getColorAt", (x) => {
      const hue = (x + this.config.rainbowRotation) % 1 * 360;
      const saturation = 1;
      const value = 1;
      return this.hsvToRgb(hue, saturation, value);
    });
    __publicField$2(this, "getActuatorColor", (mu, intensity = 1) => {
      const baseColor = this.getColorAt(mu);
      return [
        Math.round(baseColor[0] * intensity),
        Math.round(baseColor[1] * intensity),
        Math.round(baseColor[2] * intensity)
      ];
    });
    __publicField$2(this, "getRainbowBackgroundColor", (x) => {
      return this.getColorAt(x);
    });
    __publicField$2(this, "calculatePoints", (activeActuators, width, height) => {
      const nConfigured = this.getConfiguredActuatorCount();
      const nActive = activeActuators.length;
      const { resolution, heightScale } = this.config;
      const normFactor = this.calculateNormalizationFactor(nConfigured);
      this.ensureColorCache(nActive);
      const points = [];
      for (let i = 0; i <= resolution; i++) {
        const x = i / resolution;
        let totalIntensity = 0;
        let weightedColor = [0, 0, 0];
        activeActuators.forEach(([actuatorIndex, data], arrayIndex) => {
          const mu = this.getActuatorPosition(arrayIndex, nActive);
          const intensity = Math.abs(data.value);
          const sigma = this.calculateSigma(intensity);
          const gaussianValue = this.gaussian(x, mu, sigma) * intensity;
          if (gaussianValue > 1e-3) {
            const actuatorColor = this.getCachedActuatorColor(nActive, arrayIndex, intensity);
            const rainbowColorAtX = this.getCachedRainbowColor(i);
            const blendFactor = this.config.rainbowIntensity;
            const finalColor = [
              actuatorColor[0] * (1 - blendFactor) + rainbowColorAtX[0] * blendFactor,
              actuatorColor[1] * (1 - blendFactor) + rainbowColorAtX[1] * blendFactor,
              actuatorColor[2] * (1 - blendFactor) + rainbowColorAtX[2] * blendFactor
            ];
            weightedColor[0] += finalColor[0] * gaussianValue;
            weightedColor[1] += finalColor[1] * gaussianValue;
            weightedColor[2] += finalColor[2] * gaussianValue;
            totalIntensity += gaussianValue;
          }
        });
        if (totalIntensity > 0) {
          weightedColor = weightedColor.map((c) => Math.round(c / totalIntensity));
        }
        points.push({
          x: x * width,
          y: height - totalIntensity * normFactor * heightScale * height,
          intensity: totalIntensity * normFactor,
          color: weightedColor
        });
      }
      return points;
    });
    __publicField$2(this, "renderGradientFill", (points, width, height) => {
      if (points.length < 2) return;
      this.ctx.beginPath();
      this.ctx.moveTo(0, height);
      points.forEach((point, i) => {
        if (i === 0) {
          this.ctx.lineTo(point.x, point.y);
        } else {
          const prevPoint = points[i - 1];
          const cpX = (prevPoint.x + point.x) / 2;
          this.ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cpX, (prevPoint.y + point.y) / 2);
        }
      });
      this.ctx.lineTo(width, height);
      this.ctx.closePath();
      const gradient = this.ctx.createLinearGradient(0, 0, width, 0);
      points.forEach((point, i) => {
        const stop = i / (points.length - 1);
        const [r, g, b] = point.color;
        const alpha = Math.min(1, point.intensity * 0.8);
        gradient.addColorStop(stop, `rgba(${r}, ${g}, ${b}, ${alpha})`);
      });
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      this.ctx.shadowColor = "rgba(255, 255, 255, 0.2)";
      this.ctx.shadowBlur = 8;
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
      this.ctx.shadowBlur = 0;
    });
    __publicField$2(this, "renderCurrentFrame", () => {
      const actuatorData = this.getCurrentActuatorData();
      const activeActuators = this.getActiveActuators(actuatorData);
      if (activeActuators.length === 0) return;
      const canvas = this.canvasRef.current;
      if (!canvas) {
        return;
      }
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const points = this.calculatePoints(activeActuators, width, height);
      this.renderGradientFill(points, width, height);
    });
    __publicField$2(this, "startAnimation", () => {
      const animate = /* @__PURE__ */ __name(() => {
        if (!this.canvasRef.current) {
          return;
        }
        this.renderFrame();
        this.animationId = requestAnimationFrame(animate);
      }, "animate");
      this.animationId = requestAnimationFrame(animate);
    });
    __publicField$2(this, "renderFrame", () => {
      if (!this.ctx) return;
      const canvas = this.canvasRef.current;
      if (!canvas) {
        return;
      }
      this.ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      this.renderCurrentFrame();
    });
    __publicField$2(this, "toggleConfig", () => {
      const newState = !this.state.showConfig;
      this.setState({ showConfig: newState }, () => {
        this.core.notify("component:resize", {
          source: "HapticVisualizerComponent",
          reason: `config-panel-${newState ? "expanded" : "collapsed"}`
        });
      });
    });
    __publicField$2(this, "updateConfig", (key, value) => {
      this.config[key] = value;
      if (key === "sigmaMin" || key === "sigmaMax") {
        this.normalizationCache.clear();
      }
      this.forceUpdate();
    });
    this.core = props.core;
    this.state = {
      isPlaying: false,
      showConfig: false
    };
    this.canvasRef = React.createRef();
    this.ctx = null;
    this.animationId = null;
    this.config = {
      resolution: 300,
      heightScale: 0.95,
      sigmaMin: 0.07,
      sigmaMax: 0.15,
      rainbowIntensity: 0.25,
      rainbowRotation: 0
      // ✅ NOUVEAU: Rotation de l'arc-en-ciel (0 à 1)
    };
    this.normalizationCache = /* @__PURE__ */ new Map();
    this.colorCache = {
      rainbowColors: null,
      // Array[resolution+1] des couleurs arc-en-ciel
      actuatorColors: null,
      // Map des couleurs par position µ
      lastRotation: -1,
      lastResolution: -1,
      lastNActive: -1
      // ✅ AJOUT: Nombre d'actuateurs actifs
    };
  }
  // ============================================================================
  // LIFECYCLE
  // ============================================================================
  componentDidMount() {
    if (this.props.visible) {
      setTimeout(() => {
        this.initCanvas();
        this.startAnimation();
      }, 50);
    }
  }
  componentDidUpdate(prevProps) {
    const isPlaying = this.props.isPlaying || false;
    if (isPlaying !== this.state.isPlaying) {
      this.setState({ isPlaying });
    }
    if (prevProps.visible !== this.props.visible) {
      this.core.notify("component:resize", {
        source: "HapticVisualizerComponent",
        reason: `visibility-${this.props.visible ? "shown" : "hidden"}`
      });
      if (!prevProps.visible && this.props.visible) {
        setTimeout(() => {
          this.initCanvas();
          this.startAnimation();
        }, 50);
      } else if (prevProps.visible && !this.props.visible) {
        if (this.animationId) {
          cancelAnimationFrame(this.animationId);
          this.animationId = null;
        }
      }
    }
  }
  componentWillUnmount() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
      console.log("🧹 HapticVisualizer animation cleanup completed");
    }
  }
  // ============================================================================
  // RENDER PRINCIPAL
  // ============================================================================
  render() {
    const { visible = true } = this.props;
    if (!visible) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-visualizer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-visualizer-canvas-area", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "canvas",
          {
            ref: this.canvasRef,
            className: "fp-haptic-visualizer-canvas"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "fp-haptic-visualizer-config-btn",
            onClick: this.toggleConfig,
            title: "Visualizer settings",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              FeatherIcon,
              {
                name: "settings",
                size: 14,
                className: "fp-icon-button"
              }
            )
          }
        )
      ] }),
      this.state.showConfig && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-visualizer-config", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-visualizer-config-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fp-haptic-visualizer-config-label", children: [
            "Resolution: ",
            this.config.resolution
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "fp-haptic-visualizer-config-range",
              type: "range",
              min: "50",
              max: "500",
              step: "25",
              value: this.config.resolution,
              onChange: /* @__PURE__ */ __name((e) => this.updateConfig("resolution", parseInt(e.target.value)), "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-visualizer-config-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fp-haptic-visualizer-config-label", children: [
            "Height: ",
            (this.config.heightScale * 100).toFixed(0),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "fp-haptic-visualizer-config-range",
              type: "range",
              min: "0.1",
              max: "1.0",
              step: "0.05",
              value: this.config.heightScale,
              onChange: /* @__PURE__ */ __name((e) => this.updateConfig("heightScale", parseFloat(e.target.value)), "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-visualizer-config-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fp-haptic-visualizer-config-label", children: [
            "Sigma Min: ",
            this.config.sigmaMin.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "fp-haptic-visualizer-config-range",
              type: "range",
              min: "0.01",
              max: "0.2",
              step: "0.01",
              value: this.config.sigmaMin,
              onChange: /* @__PURE__ */ __name((e) => this.updateConfig("sigmaMin", parseFloat(e.target.value)), "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-visualizer-config-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fp-haptic-visualizer-config-label", children: [
            "Sigma Max: ",
            this.config.sigmaMax.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "fp-haptic-visualizer-config-range",
              type: "range",
              min: "0.05",
              max: "0.3",
              step: "0.01",
              value: this.config.sigmaMax,
              onChange: /* @__PURE__ */ __name((e) => this.updateConfig("sigmaMax", parseFloat(e.target.value)), "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-visualizer-config-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fp-haptic-visualizer-config-label", children: [
            "Rainbow: ",
            (this.config.rainbowIntensity * 100).toFixed(0),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "fp-haptic-visualizer-config-range",
              type: "range",
              min: "0.0",
              max: "1",
              step: "0.05",
              value: this.config.rainbowIntensity,
              onChange: /* @__PURE__ */ __name((e) => this.updateConfig("rainbowIntensity", parseFloat(e.target.value)), "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-haptic-visualizer-config-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "fp-haptic-visualizer-config-label", children: [
            "Hue: ",
            (this.config.rainbowRotation * 360).toFixed(0),
            "°"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "fp-haptic-visualizer-config-range",
              type: "range",
              min: "0.0",
              max: "1.0",
              step: "0.02",
              value: this.config.rainbowRotation,
              onChange: /* @__PURE__ */ __name((e) => this.updateConfig("rainbowRotation", parseFloat(e.target.value)), "onChange")
            }
          )
        ] })
      ] })
    ] });
  }
};
__name(_HapticVisualizerComponent, "HapticVisualizerComponent");
let HapticVisualizerComponent = _HapticVisualizerComponent;
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp$1");
var __publicField$1 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField$1");
const _LoggingComponent = class _LoggingComponent extends Component {
  constructor(props) {
    super(props);
    __publicField$1(this, "setupResizeObserver", () => {
      if (!this.textareaRef.current || !window.ResizeObserver) return;
      this.resizeObserver = new ResizeObserver(() => {
        setTimeout(() => {
          this.core.notify("component:resize", {
            source: "LoggingComponent",
            reason: "textarea-content-changed"
          });
        }, 0);
      });
      this.resizeObserver.observe(this.textareaRef.current);
    });
    __publicField$1(this, "handleEvent", (event, data) => {
      if (event.startsWith("status:")) {
        this.updateTextarea();
      }
    });
    __publicField$1(this, "updateTextarea", () => {
      if (this.textareaRef.current) {
        this.textareaRef.current.value = this.core.logging.getFormattedLogs();
        if (this.state.autoScroll) {
          this.textareaRef.current.scrollTop = this.textareaRef.current.scrollHeight;
        }
      }
    });
    __publicField$1(this, "handleClear", () => {
      this.core.logging.clear();
    });
    __publicField$1(this, "handleDownload", () => {
      const content = this.core.generateExportContent();
      const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const filename = `funplayer-debug-${timestamp}.log`;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.core.notify?.("status:logging", { message: `Debug logs downloaded: ${filename}`, type: "success" });
    });
    __publicField$1(this, "handleCopy", async () => {
      try {
        const content = this.core.generateExportContent();
        await navigator.clipboard.writeText(content);
        this.core.notify?.("status:logging", { message: "Debug logs copied to clipboard", type: "success" });
      } catch (error) {
        if (this.textareaRef.current) {
          this.textareaRef.current.select();
          this.core.notify?.("status:logging", { message: "Logs selected, press Ctrl+C to copy", type: "info" });
        }
      }
    });
    __publicField$1(this, "handleToggleAutoScroll", () => {
      this.setState((prevState) => ({
        autoScroll: !prevState.autoScroll
      }));
    });
    this.core = props.core;
    this.state = {
      autoScroll: true
    };
    this.textareaRef = React.createRef();
    this.coreListener = null;
    this.resizeObserver = null;
  }
  // ============================================================================
  // LIFECYCLE
  // ============================================================================
  componentDidMount() {
    this.coreListener = this.core.addListener(this.handleEvent);
    this.updateTextarea();
    if (this.props.visible) {
      setTimeout(() => {
        this.setupResizeObserver();
      }, 10);
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      setTimeout(() => {
        this.setupResizeObserver();
      }, 10);
    }
    if (prevProps.visible && !this.props.visible) {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
    }
  }
  componentWillUnmount() {
    console.log("LoggingComponent unmounting");
    if (this.coreListener) {
      this.coreListener();
      this.coreListener = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
  // ============================================================================
  // RENDER
  // ============================================================================
  render() {
    const { visible = true } = this.props;
    if (!visible) {
      return null;
    }
    const { autoScroll } = this.state;
    const logCount = this.core.logging.getLogs().length;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-logging", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-logging-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-logging-title", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeatherIcon,
            {
              name: "file-text",
              size: 16,
              className: "fp-icon"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fp-logging-label", children: "Debug Logs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fp-logging-count", children: logCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-logging-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "fp-logging-clear-btn",
              onClick: this.handleClear,
              title: "Clear logs",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                FeatherIcon,
                {
                  name: "trash-2",
                  size: 14,
                  className: "fp-icon-button"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "fp-logging-download-btn",
              onClick: this.handleDownload,
              title: "Download logs",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                FeatherIcon,
                {
                  name: "download",
                  size: 14,
                  className: "fp-icon-button"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "fp-logging-copy-btn",
              onClick: this.handleCopy,
              title: "Copy to clipboard",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                FeatherIcon,
                {
                  name: "copy",
                  size: 14,
                  className: "fp-icon-button"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `fp-logging-autoscroll-btn ${autoScroll ? "fp-logging-autoscroll-btn-active" : ""}`,
              onClick: this.handleToggleAutoScroll,
              title: "Toggle auto-scroll",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                FeatherIcon,
                {
                  name: autoScroll ? "lock" : "unlock",
                  size: 14,
                  className: "fp-icon-button"
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          ref: this.textareaRef,
          className: "fp-logging-textarea",
          readOnly: true,
          placeholder: "Debug logs will appear here..."
        }
      )
    ] });
  }
};
__name(_LoggingComponent, "LoggingComponent");
let LoggingComponent = _LoggingComponent;
const _StatusBarComponent = class _StatusBarComponent extends Component {
  render() {
    const {
      isPlaying,
      updateRate,
      showVisualizer,
      showDebug,
      showPlaylist,
      onToggleVisualizer,
      onToggleDebug,
      onTogglePlaylist
    } = this.props;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-status-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "fp-status-bar-status", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FeatherIcon,
          {
            name: isPlaying ? "play" : "pause",
            className: "fp-status-bar-status-icon"
          }
        ),
        updateRate,
        "Hz"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fp-status-bar-logo-area", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { className: "fp-status-bar-logo", size: 30 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-status-bar-controls", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "fp-status-bar-playlist-btn",
            onClick: onTogglePlaylist,
            title: showPlaylist ? "Hide Playlist" : "Show Playlist",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              FeatherIcon,
              {
                name: "list",
                size: 16,
                className: "fp-icon-button"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "fp-status-bar-visualizer-btn",
            onClick: onToggleVisualizer,
            title: showVisualizer ? "Hide Visualizer" : "Show Visualizer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              FeatherIcon,
              {
                name: "bar-chart-2",
                size: 16,
                className: "fp-icon-button"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "fp-status-bar-debug-btn",
            onClick: onToggleDebug,
            title: showDebug ? "Hide Debug" : "Show Debug",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              FeatherIcon,
              {
                name: "search",
                size: 16,
                className: "fp-icon-button"
              }
            )
          }
        )
      ] })
    ] });
  }
};
__name(_StatusBarComponent, "StatusBarComponent");
let StatusBarComponent = _StatusBarComponent;
const CSS_VAR_MAPPINGS = {
  "primaryColor": "--fp-primary-color",
  "backgroundColor": "--fp-background-color",
  "secondaryBackgroundColor": "--fp-secondary-background-color",
  "textColor": "--fp-text-color",
  "borderColor": "--fp-border-color",
  "fontFamily": "--fp-font-family",
  "baseRadius": "--fp-base-radius",
  "spacing": "--fp-spacing"
};
function convertToCssVar(key) {
  return CSS_VAR_MAPPINGS[key] || `--fp-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}
__name(convertToCssVar, "convertToCssVar");
function sanitizeTheme(theme) {
  if (!theme || typeof theme !== "object") return {};
  const sanitized = {};
  Object.entries(theme).forEach(([key, value]) => {
    if (value !== null && value !== void 0 && value !== "") {
      sanitized[key] = String(value).trim();
    }
  });
  return sanitized;
}
__name(sanitizeTheme, "sanitizeTheme");
function isValidTheme(theme) {
  if (!theme || typeof theme !== "object") return false;
  return Object.keys(theme).some(
    (key) => theme[key] !== null && theme[key] !== void 0 && theme[key] !== ""
  );
}
__name(isValidTheme, "isValidTheme");
function applyThemeToElement(theme, element, options = {}) {
  if (!theme || !element) return false;
  const { setDataTheme = true } = options;
  try {
    const sanitizedTheme = sanitizeTheme(theme);
    Object.entries(sanitizedTheme).forEach(([key, value]) => {
      if (key !== "base") {
        const cssVar = convertToCssVar(key);
        element.style.setProperty(cssVar, value);
      }
    });
    if (setDataTheme && sanitizedTheme.base) {
      element.setAttribute("data-theme", sanitizedTheme.base);
    }
    return true;
  } catch (error) {
    console.error("Failed to apply theme to element:", error);
    return false;
  }
}
__name(applyThemeToElement, "applyThemeToElement");
const ThemeUtils = {
  convertToCssVar,
  sanitizeTheme,
  isValidTheme,
  applyThemeToElement,
  CSS_VAR_MAPPINGS
};
var __defProp2 = Object.defineProperty;
var __defNormalProp2 = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __publicField2 = /* @__PURE__ */ __name((obj, key, value) => __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value), "__publicField");
const _FunPlayer = class _FunPlayer extends Component {
  constructor(props) {
    super(props);
    __publicField2(this, "initializeComponent", () => {
      try {
        this.core.notify?.("status:funplayer", { message: "Initializing FunPlayer component...", type: "processing" });
        this.coreListener = this.core.addListener(this.handleEvent);
        if (this.props.playlist) {
          this.handlePlaylistUpdate();
        }
        this.core.notify?.("status:funplayer", { message: "FunPlayer component initialized", type: "success" });
      } catch (error) {
        this.core.notify?.("status:funplayer", { message: "FunPlayer initialization failed", type: "error", error: error.message });
      }
    });
    __publicField2(this, "handlePlaylistUpdate", async () => {
      const { playlist } = this.props;
      this.core.notify?.("status:funplayer", { message: `Synchronizing playlist: ${playlist?.length || 0} items`, type: "log" });
      await this.core.playlist.loadPlaylist(playlist);
    });
    __publicField2(this, "applyTheme", () => {
      const { theme } = this.props;
      if (!theme) return;
      const element = this.containerRef.current;
      if (!element) {
        console.warn("Cannot apply theme: container ref not available");
        return;
      }
      const success = ThemeUtils.applyThemeToElement(theme, element);
      if (success) {
        this.core.notify?.("status:funplayer", {
          message: "Theme applied successfully with fp- prefixed variables",
          type: "log"
        });
      } else {
        this.core.notify?.("status:funplayer", {
          message: "Failed to apply theme",
          type: "error"
        });
      }
    });
    __publicField2(this, "handleEvent", (event, data) => {
      switch (event) {
        // ============================================================================
        // MEDIA EVENTS - Router vers handlers internes (noms harmonisés)
        // ============================================================================
        case "media:play":
          this.handleMediaPlayEvent(data);
          break;
        case "media:pause":
          this.handleMediaPauseEvent(data);
          break;
        case "media:ended":
          this.handleMediaEndedEvent(data);
          break;
        // ✅ CORRIGÉ: seeking/seeked (événements natifs Video.js)
        case "media:seeking":
          this.handleMediaSeekingEvent(data);
          break;
        case "media:seeked":
          this.handleMediaSeekedEvent(data);
          break;
        // Time events
        case "media:timeupdate":
          this.handleMediaTimeUpdateEvent(data);
          break;
        case "media:durationchange":
          this.handleMediaDurationChangeEvent(data);
          break;
        // Loading events
        case "media:loadstart":
          this.handleMediaLoadStartEvent(data);
          break;
        case "media:loadeddata":
          this.handleMediaLoadedDataEvent(data);
          break;
        case "media:loadedmetadata":
          this.handleMediaLoadedMetadataEvent(data);
          break;
        case "media:canplay":
          this.handleMediaCanPlayEvent(data);
          break;
        case "media:canplaythrough":
          this.handleMediaCanPlayThroughEvent(data);
          break;
        // Buffering events
        case "media:waiting":
          this.handleMediaWaitingEvent(data);
          break;
        case "media:stalled":
          this.handleMediaStalledEvent(data);
          break;
        case "media:suspend":
          this.handleMediaSuspendEvent(data);
          break;
        // Volume events
        case "media:volumechange":
          this.handleMediaVolumeChangeEvent(data);
          break;
        // Error events
        case "media:error":
          this.handleMediaErrorEvent(data);
          break;
        // Playlist events
        case "media:playlistitemchange":
          this.handleMediaPlaylistItemChangeEvent(data);
          break;
        // Size events
        case "media:resize":
          this.handleMediaResizeEvent(data);
          break;
        // ============================================================================
        // FUNPLAYER SPECIFIC EVENTS
        // ============================================================================
        case "buttplug:device":
          if (data.connected !== false) {
            this.handleDeviceConnect(data);
          } else {
            this.handleDeviceDisconnect(data);
          }
          this._triggerRender();
          break;
        case "buttplug:connection":
          if (data.connected === false && data.reason) {
            const disconnectData = { device: { name: "All devices" }, reason: data.reason };
            this.handleDeviceDisconnect(disconnectData);
          }
          this._triggerRender();
          break;
        case "haptic:started":
          this.handleHapticStart(data);
          break;
        case "haptic:stopped":
          this.handleHapticStop(data);
          break;
        // ============================================================================
        // OTHER EVENTS
        // ============================================================================
        case "core:ready":
          this.core.notify("status:funplayer", { message: "Core systems ready", type: "success" });
          this._triggerRender();
          break;
        case "playlist:playbackChanged":
          this.setState({ isPlaying: data.isPlaying });
          break;
        case "playlist:itemChanged":
          if (this.mediaPlayerRef.current && data.index >= 0) {
            const currentMediaPlayerIndex = this.mediaPlayerRef.current.getPlaylistInfo().currentIndex;
            if (currentMediaPlayerIndex !== data.index) {
              this.core.notify?.("status:funplayer", {
                message: `Syncing MediaPlayer: ${currentMediaPlayerIndex} → ${data.index}`,
                type: "log"
              });
              this.mediaPlayerRef.current.goToPlaylistItem(data.index);
            }
          }
          break;
        case "funscript:load":
        case "funscript:channels":
          this._triggerRender();
          break;
        case "component:resize":
          this.handleResize(data);
          break;
      }
    });
    __publicField2(this, "_triggerRender", () => {
      this.setState((prevState) => ({
        renderTrigger: prevState.renderTrigger + 1
      }));
    });
    __publicField2(this, "handleResize", (data) => {
      const element = this.containerRef.current;
      if (!element) {
        console.warn("📏 FunPlayer container ref not available");
        return;
      }
      const dimensions = {
        width: element.offsetWidth,
        height: element.offsetHeight
      };
      if (data && typeof data === "object") {
        const source = data.source || "unknown";
        const reason = data.reason ? ` (${data.reason})` : "";
        this.core.notify?.("status:funplayer", {
          message: `Resize from ${source}${reason}: ${dimensions.width}×${dimensions.height}px`,
          type: "log"
        });
      } else {
        this.core.notify?.("status:funplayer", {
          message: `Resize (legacy call): ${dimensions.width}×${dimensions.height}px`,
          type: "log"
        });
      }
      this.props.onResize?.(dimensions);
    });
    __publicField2(this, "handleDeviceConnect", (data) => {
      this.core.notify?.("status:funplayer", {
        message: `Device connected: ${data.device?.name || "Unknown"}`,
        type: "log"
      });
      this.props.onDeviceConnect?.(data);
    });
    __publicField2(this, "handleDeviceDisconnect", (data) => {
      this.core.notify?.("status:funplayer", {
        message: `Device disconnected: ${data.device?.name || "Unknown"}`,
        type: "log"
      });
      this.props.onDeviceDisconnect?.(data);
    });
    __publicField2(this, "handleHapticStart", (data) => {
      this.core.notify?.("status:funplayer", {
        message: `Haptic playback started: ${data.channels} channels at ${data.updateRate}Hz`,
        type: "log"
      });
      this.props.onHapticStart?.(data);
    });
    __publicField2(this, "handleHapticStop", (data) => {
      this.core.notify?.("status:funplayer", {
        message: `Haptic playback stopped: ${data.reason}`,
        type: "log"
      });
      this.props.onHapticStop?.(data);
    });
    __publicField2(this, "handleMediaPlay", (data) => {
      this.core.notify("media:play", data);
      this.props.onPlay?.(data);
    });
    __publicField2(this, "handleMediaPause", (data) => {
      this.core.notify("media:pause", data);
      this.props.onPause?.(data);
    });
    __publicField2(this, "handleMediaEnded", (data) => {
      this.core.notify("media:ended", data);
      this.props.onEnded?.(data);
    });
    __publicField2(this, "handleMediaSeeking", (data) => {
      this.core.notify("media:seeking", data);
      this.props.onSeeking?.(data);
    });
    __publicField2(this, "handleMediaSeeked", (data) => {
      this.core.notify("media:seeked", data);
      this.props.onSeeked?.(data);
    });
    __publicField2(this, "handleMediaTimeUpdate", (data) => {
      this.core.notify("media:timeupdate", data);
      this.props.onTimeUpdate?.(data);
    });
    __publicField2(this, "handleMediaDurationChange", (data) => {
      this.core.notify("media:durationchange", data);
      this.props.onDurationChange?.(data);
    });
    __publicField2(this, "handleMediaLoadStart", (data) => {
      this.core.notify("media:loadstart", data);
      this.props.onLoadStart?.(data);
    });
    __publicField2(this, "handleMediaLoadedData", (data) => {
      this.core.notify("media:loadeddata", data);
      this.props.onLoadedData?.(data);
    });
    __publicField2(this, "handleMediaLoadedMetadata", (data) => {
      this.core.notify("media:loadedmetadata", data);
      this.props.onLoadedMetadata?.(data);
    });
    __publicField2(this, "handleMediaCanPlay", (data) => {
      this.core.notify("media:canplay", data);
      this.props.onCanPlay?.(data);
    });
    __publicField2(this, "handleMediaCanPlayThrough", (data) => {
      this.core.notify("media:canplaythrough", data);
      this.props.onCanPlayThrough?.(data);
    });
    __publicField2(this, "handleMediaWaiting", (data) => {
      this.core.notify("media:waiting", data);
      this.props.onWaiting?.(data);
    });
    __publicField2(this, "handleMediaStalled", (data) => {
      this.core.notify("media:stalled", data);
      this.props.onStalled?.(data);
    });
    __publicField2(this, "handleMediaSuspend", (data) => {
      this.core.notify("media:suspend", data);
      this.props.onSuspend?.(data);
    });
    __publicField2(this, "handleMediaVolumeChange", (data) => {
      this.core.notify("media:volumechange", data);
      this.props.onVolumeChange?.(data);
    });
    __publicField2(this, "handleMediaError", (data) => {
      this.core.notify("media:error", data);
      this.props.onError?.(data);
    });
    __publicField2(this, "handleMediaPlaylistItemChange", (data) => {
      this.core.notify("media:playlistitemchange", data);
      this.props.onPlaylistItemChange?.(data);
    });
    __publicField2(this, "handleMediaResize", (data) => {
      this.core.notify("media:resize", data);
    });
    __publicField2(this, "handleMediaPlayEvent", ({ currentTime }) => {
      this.hapticTime = currentTime || 0;
      this.lastMediaTime = this.hapticTime;
      this.lastSyncTime = performance.now();
      const duration = this.mediaPlayerRef.current?.getDuration() || 0;
      this.core.playlist.updatePlaybackState(true, currentTime, duration);
      if (this.core.funscript.hasFunscript()) {
        this.startHapticLoop();
        this.core.notify?.("status:funplayer", { message: `Haptic playback started at ${currentTime.toFixed(1)}s`, type: "log" });
      }
    });
    __publicField2(this, "handleMediaPauseEvent", async ({ currentTime }) => {
      if (this.core.funscript.hasFunscript()) {
        this.stopHapticLoop();
        try {
          await this.core.buttplug.stopAll();
          this.core.notify?.("status:funplayer", { message: "Haptic devices stopped", type: "log" });
        } catch (error) {
          this.core.notify?.("status:funplayer", { message: "Failed to stop haptic devices", type: "log", error: error.message });
        }
      }
      const duration = this.mediaPlayerRef.current?.getDuration() || 0;
      this.core.playlist.updatePlaybackState(false, currentTime, duration);
      this.setState({ currentActuatorData: /* @__PURE__ */ new Map() });
    });
    __publicField2(this, "handleMediaEndedEvent", async ({ currentTime }) => {
      if (this.core.funscript.hasFunscript()) {
        this.stopHapticLoop();
        try {
          await this.core.buttplug.stopAll();
          this.core.notify?.("status:funplayer", { message: "Haptic playback ended", type: "log" });
        } catch (error) {
          this.core.notify?.("status:funplayer", { message: "Failed to stop haptic devices on end", type: "log", error: error.message });
        }
      }
      this.core.playlist.updatePlaybackState(false, 0, 0);
      this.hapticTime = 0;
      this.lastMediaTime = 0;
      this.setState({ currentActuatorData: /* @__PURE__ */ new Map() });
    });
    __publicField2(this, "handleMediaSeekingEvent", ({ currentTime }) => {
      this.core.notify?.("status:funplayer", { message: `Seeking to ${currentTime.toFixed(1)}s`, type: "log" });
    });
    __publicField2(this, "handleMediaSeekedEvent", ({ currentTime }) => {
      if (this.core.funscript.hasFunscript() && this.hapticIntervalId) {
        this.hapticTime = currentTime;
        this.lastMediaTime = currentTime;
        this.lastSyncTime = performance.now();
        this.core.notify?.("status:funplayer", { message: `Seeked to ${currentTime.toFixed(1)}s`, type: "log" });
      }
    });
    __publicField2(this, "handleMediaTimeUpdateEvent", ({ currentTime }) => {
      if (this.isHapticAborted) {
        return;
      }
      if (!this.core.funscript.hasFunscript() || !this.hapticIntervalId) {
        return;
      }
      const now = performance.now();
      const timeSinceLastSync = (now - this.lastSyncTime) / 1e3;
      const mediaTimeDelta = currentTime - this.lastMediaTime;
      if (timeSinceLastSync > 1 && Math.abs(mediaTimeDelta) < 0.01 && !this.isBuffering) {
        this.core.notify?.("status:funplayer", { message: "Player stall detected (1s+ frozen), starting timeout", type: "error" });
        this._startBuffering("stall_detection", currentTime);
        return;
      }
      const drift = Math.abs(currentTime - this.hapticTime);
      const shouldResync = drift > 0.05 || timeSinceLastSync > 1;
      if (shouldResync) {
        this.hapticTime = currentTime;
        this.lastMediaTime = currentTime;
        this.lastSyncTime = now;
        if (drift > 0.1) {
          this.core.notify?.("status:funplayer", { message: `Haptic drift detected: ${(drift * 1e3).toFixed(1)}ms, resyncing`, type: "log" });
        }
      }
    });
    __publicField2(this, "handleMediaDurationChangeEvent", ({ duration }) => {
      this.core.notify?.("status:funplayer", { message: `Duration changed: ${duration.toFixed(1)}s`, type: "log" });
    });
    __publicField2(this, "handleMediaLoadStartEvent", (data) => {
      this.core.notify?.("status:funplayer", { message: "Media loading started", type: "log" });
    });
    __publicField2(this, "handleMediaLoadedDataEvent", ({ duration }) => {
      this.core.notify?.("status:funplayer", { message: `Media data loaded: ${duration.toFixed(1)}s`, type: "log" });
    });
    __publicField2(this, "handleMediaLoadedMetadataEvent", (data) => {
      this.core.notify?.("status:funplayer", { message: `Media loaded: ${data.duration.toFixed(1)}s`, type: "log" });
      const currentItem = this.core.playlist.getCurrentItem();
      if (currentItem && Math.abs((currentItem.duration || 0) - data.duration) > 1) {
        this.core.notify?.("status:funplayer", { message: `Duration corrected: ${currentItem.duration?.toFixed(1) || "unknown"}s → ${data.duration.toFixed(1)}s`, type: "log" });
        this.core.playlist.updateCurrentItemDuration(data.duration);
      }
      this.handleResize();
    });
    __publicField2(this, "handleMediaCanPlayEvent", ({ currentTime }) => {
      this.core.notify?.("status:funplayer", { message: "Media can play", type: "log" });
      if (this.isBuffering) {
        this._endBuffering("canplay", currentTime);
      }
    });
    __publicField2(this, "handleMediaCanPlayThroughEvent", ({ currentTime }) => {
      this.core.notify?.("status:funplayer", { message: "Media can play through", type: "log" });
    });
    __publicField2(this, "handleMediaWaitingEvent", ({ currentTime }) => {
      if (this.isBuffering && this.bufferingSource === "waiting") {
        return;
      }
      if (this.stallTimeoutId) {
        clearTimeout(this.stallTimeoutId);
        this.stallTimeoutId = null;
      }
      this._startBuffering("waiting", currentTime);
    });
    __publicField2(this, "handleMediaStalledEvent", ({ currentTime }) => {
      this.handleMediaWaitingEvent({ currentTime });
    });
    __publicField2(this, "handleMediaSuspendEvent", ({ currentTime }) => {
      this.core.notify?.("status:funplayer", { message: "Media loading suspended", type: "log" });
    });
    __publicField2(this, "handleMediaVolumeChangeEvent", ({ volume, muted }) => {
      this.core.notify?.("status:funplayer", {
        message: `Volume: ${muted ? "muted" : Math.round(volume * 100) + "%"}`,
        type: "log"
      });
    });
    __publicField2(this, "handleMediaErrorEvent", (error) => {
      this.core.notify?.("status:funplayer", { message: "Media loading failed", type: "error", error: error.message });
      this.core.setError("Media loading failed", error);
    });
    __publicField2(this, "handleMediaPlaylistItemChangeEvent", (newVideoJsIndex) => {
      this.core.notify?.("status:funplayer", { message: `MediaPlayer switched to item ${newVideoJsIndex}`, type: "log" });
      if (newVideoJsIndex >= 0) {
        const currentPlaylistIndex = this.core.playlist.getCurrentIndex();
        if (newVideoJsIndex !== currentPlaylistIndex) {
          this.core.notify?.("status:funplayer", { message: `Syncing core playlist to Video.js index ${newVideoJsIndex}`, type: "log" });
          this.core.playlist.goTo(newVideoJsIndex);
        }
      }
    });
    __publicField2(this, "handleMediaResizeEvent", (data) => {
      this.core.notify("component:resize", {
        source: "MediaPlayer",
        reason: "video-js-resize",
        dimensions: data
        // Video.js fournit { width, height } pour information
      });
    });
    __publicField2(this, "_startBuffering", (source, currentTime) => {
      if (this.isBuffering && this.bufferingSource === "waiting") {
        return;
      }
      this.isBuffering = true;
      this.bufferingSource = source;
      this.bufferingStartTime = performance.now();
      if (this.hapticIntervalId) {
        this.stopHapticLoop();
        try {
          this.core.buttplug.stopAll();
          this.core.notify?.("status:funplayer", { message: `Buffering suspended (${source})`, type: "log" });
        } catch (error) {
          this.core.notify?.("status:funplayer", { message: "Failed to stop haptic devices", type: "log", error: error.message });
        }
      }
      this.setState({ currentActuatorData: /* @__PURE__ */ new Map() });
      if (source === "stall_detection") {
        this.stallTimeoutId = setTimeout(() => {
          this._abortHapticPlayback();
        }, this.stallTimeout);
        this.core.notify?.("status:funplayer", { message: `Player stall timeout started (${this.stallTimeout}ms)`, type: "error" });
      }
    });
    __publicField2(this, "_endBuffering", (trigger, currentTime) => {
      if (!this.isBuffering) return;
      const bufferingDuration = performance.now() - this.bufferingStartTime;
      const wasStallDetection = this.bufferingSource === "stall_detection";
      if (this.stallTimeoutId) {
        clearTimeout(this.stallTimeoutId);
        this.stallTimeoutId = null;
      }
      this.isBuffering = false;
      this.bufferingSource = null;
      if (this.isHapticAborted && trigger === "canplay") {
        this.isHapticAborted = false;
        this.core.notify?.("status:funplayer", { message: "Player recovered, haptic playback re-enabled", type: "success" });
      }
      const mediaPlayer = this.mediaPlayerRef.current;
      if (mediaPlayer && mediaPlayer.isPlaying() && this.core.funscript.hasFunscript() && !this.isHapticAborted) {
        this.hapticTime = currentTime || mediaPlayer.getTime();
        this.lastMediaTime = this.hapticTime;
        this.lastSyncTime = performance.now();
        this.startHapticLoop();
        const sourceInfo = wasStallDetection ? " (stall recovered)" : "";
        this.core.notify?.("status:funplayer", { message: `Buffering ended via ${trigger} (${bufferingDuration.toFixed(0)}ms)${sourceInfo}, haptic resumed`, type: "success" });
      }
    });
    __publicField2(this, "_abortHapticPlayback", () => {
      const bufferingDuration = performance.now() - this.bufferingStartTime;
      if (this.stallTimeoutId) {
        clearTimeout(this.stallTimeoutId);
        this.stallTimeoutId = null;
      }
      this.isHapticAborted = true;
      this.isBuffering = false;
      this.bufferingSource = null;
      this.stopHapticLoop();
      try {
        this.core.buttplug.stopAll();
      } catch (error) {
      }
      const mediaPlayer = this.mediaPlayerRef.current;
      if (mediaPlayer) {
        try {
          mediaPlayer.pause();
          this.core.notify?.("status:funplayer", { message: "Sent pause command to unresponsive player", type: "log" });
        } catch (error) {
          this.core.notify?.("status:funplayer", { message: "Failed to send pause to player", type: "log", error: error.message });
        }
      }
      this.setState({ currentActuatorData: /* @__PURE__ */ new Map() });
      this.core.notify?.("status:funplayer", {
        message: `Media playing aborted due to unresponsive player (${bufferingDuration.toFixed(0)}ms stall)`,
        type: "error"
      });
    });
    __publicField2(this, "processHapticFrame", async (timeDelta) => {
      const mediaPlayer = this.mediaPlayerRef.current;
      if (!mediaPlayer) return;
      if (this.isHapticAborted || this.isBuffering) {
        return;
      }
      this.hapticTime += timeDelta;
      const currentTime = this.hapticTime;
      const mediaRefreshRate = this.getMediaRefreshRate(mediaPlayer);
      const adjustedDuration = this.calculateLinearDuration(timeDelta, mediaRefreshRate);
      const visualizerData = await this.core.processHapticFrame(currentTime, {
        duration: adjustedDuration * 1e3
      });
      this.setState({ currentActuatorData: visualizerData });
    });
    __publicField2(this, "startHapticLoop", () => {
      if (this.hapticIntervalId) return;
      this.expectedHapticTime = performance.now();
      const targetInterval = 1e3 / this.state.updateRate;
      this.core.notify?.("status:funplayer", { message: `Starting haptic loop at ${this.state.updateRate}Hz`, type: "log" });
      const hapticData = {
        channels: this.core.funscript.getChannels().length,
        updateRate: this.state.updateRate,
        reason: "media_play"
      };
      this.core.notify("haptic:started", hapticData);
      const optimizedLoop = /* @__PURE__ */ __name(() => {
        try {
          const currentTime = performance.now();
          const drift = currentTime - this.expectedHapticTime;
          const hapticDelta = targetInterval / 1e3;
          this.processHapticFrame(hapticDelta);
          this.expectedHapticTime += targetInterval;
          const adjustedDelay = Math.max(0, targetInterval - drift);
          const currentTargetInterval = 1e3 / this.state.updateRate;
          if (currentTargetInterval !== targetInterval) {
            this.expectedHapticTime = currentTime + currentTargetInterval;
            this.hapticIntervalId = setTimeout(() => this.restartWithNewRate(), currentTargetInterval);
          } else {
            this.hapticIntervalId = setTimeout(optimizedLoop, adjustedDelay);
          }
        } catch (error) {
          this.core.notify?.("status:funplayer", { message: "Haptic loop error", type: "error", error: error.message });
          this.hapticIntervalId = setTimeout(optimizedLoop, targetInterval);
        }
      }, "optimizedLoop");
      this.hapticIntervalId = setTimeout(optimizedLoop, targetInterval);
    });
    __publicField2(this, "stopHapticLoop", () => {
      if (this.hapticIntervalId) {
        clearTimeout(this.hapticIntervalId);
        this.hapticIntervalId = null;
        this.core.notify?.("status:funplayer", { message: "Haptic loop stopped", type: "log" });
        const hapticData = {
          reason: "media_pause"
        };
        this.core.notify("haptic:stopped", hapticData);
      }
      this.expectedHapticTime = 0;
      this.lastSyncTime = 0;
    });
    __publicField2(this, "restartWithNewRate", () => {
      const wasPlaying = this.hapticIntervalId !== null;
      if (wasPlaying) {
        this.core.notify?.("status:funplayer", { message: `Restarting haptic loop with new rate: ${this.state.updateRate}Hz`, type: "log" });
        this.stopHapticLoop();
        this.startHapticLoop();
      }
    });
    __publicField2(this, "getCurrentActuatorData", () => {
      return this.state.currentActuatorData;
    });
    __publicField2(this, "getMediaRefreshRate", (mediaPlayer) => {
      const state = mediaPlayer.getState();
      const mediaType = state.mediaType;
      switch (mediaType) {
        case "playlist":
          const currentItem = mediaPlayer.getCurrentItem();
          if (!currentItem || !currentItem.sources || currentItem.sources.length === 0) {
            return this.state.updateRate;
          }
          const mimeType = currentItem.sources[0].type || "";
          return mimeType.startsWith("audio/") ? this.state.updateRate : 30;
        case "media":
          return 30;
        default:
          return this.state.updateRate;
      }
    });
    __publicField2(this, "calculateLinearDuration", (hapticDelta, mediaRefreshRate) => {
      const mediaFrameDuration = 1 / mediaRefreshRate;
      const safeDuration = Math.max(hapticDelta, mediaFrameDuration) * 1.2;
      return Math.max(0.01, Math.min(0.1, safeDuration));
    });
    __publicField2(this, "getUpdateRate", () => this.state.updateRate);
    __publicField2(this, "handleUpdateRateChange", (newRate) => {
      this.core.notify?.("status:funplayer", { message: `Update rate changed: ${this.state.updateRate}Hz → ${newRate}Hz`, type: "log" });
      this.setState({ updateRate: newRate });
    });
    __publicField2(this, "handleToggleVisualizer", () => {
      const newState = !this.state.showVisualizer;
      this.core.notify?.("status:funplayer", { message: `Visualizer ${newState ? "shown" : "hidden"}`, type: "log" });
      this.setState({ showVisualizer: newState }, () => {
        this.handleResize();
      });
    });
    __publicField2(this, "handleToggleDebug", () => {
      const newState = !this.state.showDebug;
      this.core.notify?.("status:funplayer", { message: `Debug panel ${newState ? "shown" : "hidden"}`, type: "log" });
      this.setState({ showDebug: newState }, () => {
        this.handleResize();
      });
    });
    __publicField2(this, "handleTogglePlaylist", () => {
      const newState = !this.state.showPlaylist;
      this.core.notify?.("status:funplayer", { message: `Playlist ${newState ? "shown" : "hidden"}`, type: "log" });
      this.setState({ showPlaylist: newState }, () => {
        this.handleResize();
      });
    });
    this.core = new FunPlayerCore();
    this.state = {
      updateRate: 60,
      isPlaying: false,
      currentActuatorData: /* @__PURE__ */ new Map(),
      showVisualizer: true,
      showDebug: false,
      showPlaylist: true,
      renderTrigger: 0
    };
    this.containerRef = React.createRef();
    this.mediaPlayerRef = React.createRef();
    this.hapticIntervalId = null;
    this.expectedHapticTime = 0;
    this.hapticTime = 0;
    this.lastMediaTime = 0;
    this.lastSyncTime = 0;
    this.isBuffering = false;
    this.bufferingStartTime = 0;
    this.bufferingSource = null;
    this.stallTimeoutId = null;
    this.stallTimeout = 5e3;
    this.isHapticAborted = false;
    this.coreListener = null;
  }
  // ============================================================================
  // LIFECYCLE
  // ============================================================================
  componentDidMount() {
    this.applyTheme();
    this.initializeComponent();
  }
  // ✅ Dans FunPlayer.jsx
  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.applyTheme();
    }
    if (prevProps.playlist === this.props.playlist) return;
    this.handlePlaylistUpdate();
  }
  componentWillUnmount() {
    this.stopHapticLoop();
    if (this.stallTimeoutId) {
      clearTimeout(this.stallTimeoutId);
      this.stallTimeoutId = null;
    }
    if (this.coreListener) {
      this.coreListener();
    }
  }
  // ============================================================================
  // RENDER
  // ============================================================================
  render() {
    const { showVisualizer, showDebug, showPlaylist } = this.state;
    const playlistItems = this.core.playlist.items;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fp-funplayer", ref: this.containerRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HapticSettingsComponent,
        {
          core: this.core,
          onUpdateRateChange: this.handleUpdateRateChange,
          onGetUpdateRate: this.getUpdateRate
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MediaPlayer,
        {
          ref: this.mediaPlayerRef,
          playlist: playlistItems,
          notify: this.core.notify,
          onPlay: this.handleMediaPlay,
          onPause: this.handleMediaPause,
          onEnded: this.handleMediaEnded,
          onSeeking: this.handleMediaSeeking,
          onSeeked: this.handleMediaSeeked,
          onTimeUpdate: this.handleMediaTimeUpdate,
          onDurationChange: this.handleMediaDurationChange,
          onLoadStart: this.handleMediaLoadStart,
          onLoadedData: this.handleMediaLoadedData,
          onLoadedMetadata: this.handleMediaLoadedMetadata,
          onCanPlay: this.handleMediaCanPlay,
          onCanPlayThrough: this.handleMediaCanPlayThrough,
          onWaiting: this.handleMediaWaiting,
          onStalled: this.handleMediaStalled,
          onSuspend: this.handleMediaSuspend,
          onVolumeChange: this.handleMediaVolumeChange,
          onError: this.handleMediaError,
          onResize: this.handleResize
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HapticVisualizerComponent,
        {
          core: this.core,
          visible: showVisualizer,
          isPlaying: this.state.isPlaying,
          getCurrentActuatorData: this.getCurrentActuatorData
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LoggingComponent,
        {
          core: this.core,
          visible: showDebug
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatusBarComponent,
        {
          core: this.core,
          isPlaying: this.state.isPlaying,
          updateRate: this.state.updateRate,
          showVisualizer,
          showDebug,
          showPlaylist,
          onToggleVisualizer: this.handleToggleVisualizer,
          onToggleDebug: this.handleToggleDebug,
          onTogglePlaylist: this.handleTogglePlaylist
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PlaylistComponent,
        {
          core: this.core,
          visible: showPlaylist
        }
      )
    ] });
  }
};
__name(_FunPlayer, "FunPlayer");
let FunPlayer = _FunPlayer;
export {
  FunPlayer,
  FunPlayer as default
};
//# sourceMappingURL=index.js.map

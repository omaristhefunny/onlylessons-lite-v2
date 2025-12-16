define(['exports', 'mobx', 'mobx-react', 'react', 'react-dom', 'react-dom/client'], (function (exports, mobx, mobxReact, React, ReactDOM, client) { 'use strict';

  function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n.default = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);
  var ReactDOM__namespace = /*#__PURE__*/_interopNamespaceDefault(ReactDOM);

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise, SuppressedError, Symbol */


  function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  function getReactElementType(obj) {
      if (!React.isValidElement(obj)) {
          return undefined;
      }
      return obj.type;
  }
  function isFragment(obj) {
      return getReactElementType(obj) === React.Fragment;
  }
  function unwrapFragments(children) {
      const nodes = [];
      for (const child of React.Children.toArray(children)) {
          if (isFragment(child)) {
              nodes.push(...unwrapFragments(child.props.children));
          }
          else {
              nodes.push(child);
          }
      }
      return nodes;
  }

  let configuration = {
      assetBaseUri: ""
  };
  const Configuration = React.createContext(configuration);
  function setDefaultConfiguration(props) {
      Object.assign(configuration, props);
  }

  const MaterialIconComponent = React__namespace.forwardRef((_a, ref) => {
      var { filename, size, className, style = {} } = _a, otherProps = __rest(_a, ["filename", "size", "className", "style"]);
      let config = React.useContext(Configuration);
      if (!filename) {
          throw new Error("filename cannot be blank");
      }
      if (filename.endsWith(".svg")) {
          filename = filename.substring(0, filename.length - 4);
      }
      if (filename.endsWith("-20")) {
          size = 20;
      }
      else if (filename.endsWith("-24")) {
          size = 24;
      }
      else if (filename.endsWith("-40")) {
          size = 40;
      }
      const classNames = ["e2-material-icon"];
      if (size) {
          classNames.push("e2-material-icon--" + size);
      }
      if (className) {
          classNames.push(className);
      }
      const assetBaseUri = config.assetBaseUri;
      const materialIconsDirectory = `icons/material`;
      const uri = `${materialIconsDirectory}/${filename}.svg`;
      return React__namespace.createElement("span", Object.assign({ ref: ref, className: classNames.join(" "), style: Object.assign(Object.assign({}, style), { maskImage: `url(${assetBaseUri}/${uri})`, WebkitMaskImage: `url(${assetBaseUri}/${uri})` }) }, otherProps));
  });
  const MaterialIcon = Object.assign(MaterialIconComponent, {
      "displayName": "MaterialIcon",
  });

  const Variant$8 = {
      MAJOR: "MAJOR",
      MINOR: "MINOR",
  };
  class AccordionState {
      constructor(limitToOneOpenSection = false) {
          Object.defineProperty(this, "limitToOneOpenSection", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: limitToOneOpenSection
          });
          Object.defineProperty(this, "hasEverOpenedUuids", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: new Set()
          });
          Object.defineProperty(this, "openUuids", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: new Map()
          });
          mobx.makeAutoObservable(this);
      }
      setLimitToOneOpenSection(limitToOneOpenSection) {
          this.limitToOneOpenSection = !!limitToOneOpenSection;
      }
      isOpen(uuid, defaultOpen) {
          if (!this.openUuids.has(uuid)) {
              this._setOpenStatus(uuid, defaultOpen);
          }
          return this.openUuids.get(uuid);
      }
      hasEverOpened(uuid) {
          return this.hasEverOpenedUuids.has(uuid);
      }
      setOpen(uuid, shouldBeOpen) {
          this._setOpenStatus(uuid, shouldBeOpen);
          if (shouldBeOpen) {
              if (this.limitToOneOpenSection) {
                  for (const [otherUuid] of this.openUuids) {
                      if (uuid !== otherUuid) {
                          this._setOpenStatus(otherUuid, false);
                      }
                  }
              }
          }
      }
      registerUuid(uuid, defaultOpen) {
          this.isOpen(uuid, defaultOpen);
      }
      setAllOpen(shouldBeOpen) {
          const length = this.openUuids.size;
          if (length > 1 && shouldBeOpen && this.limitToOneOpenSection) {
              throw new Error("This Accordion is limited to at most one open section; you cannot open them all.");
          }
          for (const [uuid] of this.openUuids) {
              this._setOpenStatus(uuid, shouldBeOpen);
          }
      }
      _setOpenStatus(uuid, shouldBeOpen) {
          shouldBeOpen = !!shouldBeOpen;
          if (shouldBeOpen && !this.hasEverOpenedUuids.has(uuid)) {
              this.hasEverOpenedUuids.add(uuid);
          }
          this.openUuids.set(uuid, shouldBeOpen);
      }
      areAllSectionsOpen() {
          return Object.values(this.openUuids).every(v => v);
      }
      areAllSectionsClosed() {
          return Object.values(this.openUuids).every(v => !v);
      }
  }
  const accordionStateContext = React.createContext(null);
  const variantContext = React.createContext(Variant$8.MAJOR);
  const invertDisclosureIconContext = React.createContext(false);
  const AccordionComponent = (({ children, commands, limitToOneOpenSection = false, variant = Variant$8.MAJOR, invertDisclosureIcon = false, }) => {
      const [store] = React.useState(() => new AccordionState(limitToOneOpenSection));
      React.useEffect(() => store.setLimitToOneOpenSection(limitToOneOpenSection), [limitToOneOpenSection]);
      React.useImperativeHandle(commands, () => {
          return {
              openAll: () => store.setAllOpen(true),
              closeAll: () => store.setAllOpen(false),
              areAllSectionsOpen: () => store.areAllSectionsOpen(),
              areAllSectionsClosed: () => store.areAllSectionsClosed(),
          };
      }, [commands, store]);
      return React__namespace.createElement(accordionStateContext.Provider, { value: store },
          React__namespace.createElement(variantContext.Provider, { value: variant },
              React__namespace.createElement(invertDisclosureIconContext.Provider, { value: invertDisclosureIcon }, children)));
  });
  const AccordionSectionComponent = mobxReact.observer(React__namespace.forwardRef((_a, ref) => {
      var { children, className, "data-cname": cname, "test-id": testId = cname, defaultOpen = false, heading, variant: innerVariant, renderChildrenLazily = false } = _a, otherProps = __rest(_a, ["children", "className", "data-cname", "test-id", "defaultOpen", "heading", "variant", "renderChildrenLazily"]);
      const [uuid] = React.useState(() => Math.random().toString(36).slice(2));
      const sharedStore = React.useContext(accordionStateContext);
      const [fallbackStore] = React.useState(() => sharedStore ? null : new AccordionState());
      const store = sharedStore !== null && sharedStore !== void 0 ? sharedStore : fallbackStore;
      store.registerUuid(uuid, defaultOpen);
      const outerVariant = React.useContext(variantContext);
      const variant = innerVariant !== null && innerVariant !== void 0 ? innerVariant : outerVariant;
      const invertDisclosureIcon = React.useContext(invertDisclosureIconContext);
      if (!store) {
          throw new Error("Accordion state provider not configured correctly.");
      }
      if (unwrapFragments(heading).length !== 1) {
          throw new Error("Accordion section heading may only have one child element; found " + children);
      }
      const isOpen = store.isOpen(uuid, defaultOpen);
      const sectionClassNames = ["e2-accordion-section"];
      if (variant === Variant$8.MAJOR) {
          sectionClassNames.push("e2-accordion-section--major");
      }
      else if (variant === Variant$8.MINOR) {
          sectionClassNames.push("e2-accordion-section--minor");
      }
      if (isOpen) {
          sectionClassNames.push("e2-accordion-section--open");
      }
      const headingClassNames = ["e2-accordion-section__heading"];
      const contentClassNames = ["e2-accordion-section__content"];
      if (className) {
          contentClassNames.push(className);
      }
      const shouldRenderChildren = !renderChildrenLazily || store.hasEverOpened(uuid);
      return React__namespace.createElement("div", { className: sectionClassNames.join(" ") },
          React__namespace.createElement("div", { className: headingClassNames.join(" "), "data-cname": cname + "__heading", "test-id": testId + "__heading", onClick: () => store.setOpen(uuid, !isOpen) },
              heading,
              React__namespace.createElement(MaterialIcon, { className: "e2-accordion-section__disclosure-icon", filename: `icon-chevron-${invertDisclosureIcon ? 'up' : 'down'}-24.svg` })),
          React__namespace.createElement("div", Object.assign({ ref: ref, className: contentClassNames.join(" "), "data-cname": cname, "test-id": testId }, otherProps), shouldRenderChildren && children));
  }));
  const Accordion = Object.assign(AccordionComponent, {
      displayName: "Accordion",
      Variant: Variant$8,
      Section: Object.assign(AccordionSectionComponent, {
          displayName: "Accordion.Section",
          Variant: Variant$8,
      }),
  });

  function convertInitialsToHashNumber(initials, max = 5) {
      if (!initials) {
          return 0;
      }
      let hash = 0;
      for (const letter of initials) {
          hash = ((hash << 5) - hash) + letter.charCodeAt(0);
      }
      return 1 + (hash % max);
  }
  const Size$1 = {
      SMALL: "SMALL",
      MEDIUM: "MEDIUM",
      LARGE: "LARGE",
  };
  const Variant$7 = {
      FULL: "FULL",
      IMAGE_ONLY: "IMAGE_ONLY",
      TEXT_ONLY: "TEXT_ONLY",
  };
  function getInitials(name) {
      if (!name) {
          return undefined;
      }
      const normalized = name.replace(/[^a-zA-Z\s]/g, "").trim();
      if (!normalized) {
          return undefined;
      }
      return normalized.split(/\s+/)
          .map((v, i, a) => (i === 0 || i === a.length - 1) ? v[0].toUpperCase() : undefined)
          .join("");
  }
  const AvatarComponent = (_a) => {
      var { description, imageUrl, initials, name, size = Size$1.MEDIUM, variant = Variant$7.FULL } = _a, otherProps = __rest(_a, ["description", "imageUrl", "initials", "name", "size", "variant"]);
      const [imageSrc, setImageSrc] = React.useState(imageUrl);
      React.useEffect(() => setImageSrc(imageUrl), [imageUrl]);
      const showByline = variant != Variant$7.IMAGE_ONLY && name;
      const hideAvatarIcon = variant === Variant$7.TEXT_ONLY;
      if (!initials) {
          initials = getInitials(name);
      }
      let circleContent;
      const classNames = ["e2-avatar"];
      if (size === Size$1.SMALL) {
          circleContent = React__namespace.createElement(MaterialIcon, { className: "e2-avatar__default-icon", filename: "icon-student-20.svg" });
          classNames.push("e2-avatar--small");
          if (initials) {
              initials = initials[0];
          }
      }
      else if (size === Size$1.MEDIUM) {
          circleContent = React__namespace.createElement(MaterialIcon, { className: "e2-avatar__default-icon", filename: "icon-student-24.svg" });
          classNames.push("e2-avatar--medium");
      }
      else if (size === Size$1.LARGE) {
          circleContent = React__namespace.createElement(MaterialIcon, { className: "e2-avatar__default-icon", filename: "icon-student-40.svg" });
          classNames.push("e2-avatar--large");
      }
      classNames.push("e2-avatar--hash-" + convertInitialsToHashNumber(initials));
      const avatarNameClasses = ["e2-avatar__name"];
      if (hideAvatarIcon) {
          avatarNameClasses.push("e2-avatar__name--iconless");
      }
      if (imageSrc) {
          circleContent = React__namespace.createElement("img", { className: "e2-avatar__image", src: imageUrl, onError: () => setImageSrc(null), alt: name });
      }
      else if (initials) {
          circleContent = React__namespace.createElement("div", { className: "e2-avatar__initials" }, initials);
      }
      let title = "";
      if (name) {
          title += name;
          if (description) {
              title += "\n" + description;
          }
      }
      return React__namespace.createElement("div", Object.assign({ className: classNames.join(" ") }, otherProps, { title: title }),
          !hideAvatarIcon && React__namespace.createElement("div", { className: "e2-avatar__circle" }, circleContent),
          showByline && React__namespace.createElement("div", { className: avatarNameClasses.join(" ") }, name),
          showByline && description && React__namespace.createElement("div", { className: "e2-avatar__description" }, description));
  };
  const Avatar = Object.assign(AvatarComponent, {
      displayName: "Avatar",
      Size: Size$1,
      Variant: Variant$7,
  });

  const Size = {
      MEDIUM: "MEDIUM",
      LARGE: "LARGE",
  };
  const MAX_PERSONS_IN_GROUP = 4;
  const AvatarGroupComponent = (_a) => {
      var { persons = [], size = Size.LARGE } = _a, otherProps = __rest(_a, ["persons", "size"]);
      if ((persons === null || persons === void 0 ? void 0 : persons.length) < 1) {
          return null;
      }
      let displayPersons = persons;
      const etAl = { name: " " };
      if (persons.length > MAX_PERSONS_IN_GROUP) {
          const extraPersons = persons.slice(MAX_PERSONS_IN_GROUP - 1);
          etAl.name = `And ${extraPersons.length} other${extraPersons.length != 1 ? "s" : ""}:`;
          etAl.initials = "+" + extraPersons.length;
          etAl.description = persons.slice(MAX_PERSONS_IN_GROUP - 1).map(person => person.name).filter(p => !!p).join("\n");
          displayPersons = [...persons.slice(0, MAX_PERSONS_IN_GROUP - 1), etAl];
      }
      const classNames = ["e2-avatar-group"];
      if (size == Size.MEDIUM) {
          classNames.push("e2-avatar-group--medium");
      }
      else if (size == Size.LARGE) {
          classNames.push("e2-avatar-group--large");
      }
      classNames.push("e2-avatar-group--count-" + Math.min(persons.length, 4));
      return React__namespace.createElement("div", Object.assign({ className: classNames.join(" ") }, otherProps), displayPersons.map((person, index) => React__namespace.createElement(ShallowAvatar, { key: person.imageUrl || person.name || index, person: person })));
  };
  const ShallowAvatar = ({ person: { imageUrl, name, initials, description } }) => {
      const [imageSrc, setImageSrc] = React.useState(imageUrl);
      React.useEffect(() => setImageSrc(imageUrl), [imageUrl]);
      if (!initials) {
          initials = getInitials(name);
      }
      const classNames = ["e2-avatar-group__person"];
      let circleContent = React__namespace.createElement(MaterialIcon, { className: "e2-avatar-group__default-icon", filename: "icon-student-20.svg" });
      if (imageSrc) {
          circleContent = React__namespace.createElement("img", { className: "e2-avatar-group__image", src: imageUrl, onError: () => setImageSrc(null), alt: name });
      }
      else if (initials) {
          circleContent = React__namespace.createElement("div", { className: "e2-avatar-group__initials" }, initials);
      }
      classNames.push("e2-avatar-group__person--hash-" + convertInitialsToHashNumber(initials));
      const style = {
          backgroundImage: imageSrc ? `url(${imageSrc})` : null,
      };
      let title = "";
      if (name) {
          title += name;
          if (description) {
              title += "\n" + description;
          }
      }
      return React__namespace.createElement("div", { className: classNames.join(" "), style: style, title: title }, circleContent);
  };
  const AvatarGroup = Object.assign(AvatarGroupComponent, {
      displayName: "AvatarGroup",
      Size,
  });

  const MAX_PERSONS_IN_ROW = 3;
  const AvatarRowComponent = (_a) => {
      var { persons = [], size = Avatar.Size.MEDIUM } = _a, otherProps = __rest(_a, ["persons", "size"]);
      let displayPersons = persons;
      const etAl = { name: " " };
      if (persons.length > MAX_PERSONS_IN_ROW) {
          const extraPersons = persons.slice(MAX_PERSONS_IN_ROW - 1);
          etAl.name = `And ${extraPersons.length} other${extraPersons.length != 1 ? "s" : ""}:`;
          etAl.initials = "+" + extraPersons.length;
          etAl.description = persons.slice(MAX_PERSONS_IN_ROW - 1).map(person => person.name).filter(p => !!p).join("\n");
          displayPersons = [...persons.slice(0, MAX_PERSONS_IN_ROW - 1), etAl];
      }
      const classNames = ["e2-avatar-row"];
      if (size === Avatar.Size.SMALL) {
          classNames.push("e2-avatar-row--small");
          etAl.initials = "…";
      }
      else if (size === Avatar.Size.MEDIUM) {
          classNames.push("e2-avatar-row--medium");
      }
      else if (size === Avatar.Size.LARGE) {
          classNames.push("e2-avatar-row--large");
      }
      return React__namespace.createElement("div", Object.assign({ className: classNames.join(" ") }, otherProps), displayPersons.map((person, index) => React__namespace.createElement(Avatar, { key: person.imageUrl || person.name || index, name: person.name, imageUrl: person.imageUrl, initials: person.initials, description: person.description, variant: Avatar.Variant.IMAGE_ONLY, size: size })));
  };
  const AvatarRow = Object.assign(AvatarRowComponent, {
      displayName: "AvatarRow",
      Size: Avatar.Size,
  });

  function useCombinedRef$1(...refs) {
      return React.useCallback(legacyCombinedRef(...refs), [...refs]);
  }
  function legacyCombinedRef(...refs) {
      return (current) => {
          for (const ref of refs) {
              if (typeof ref === "function") {
                  ref(current);
              }
              else if (ref) {
                  ref.current = current;
              }
          }
      };
  }

  // Current version.
  var VERSION = '1.13.7';

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = (typeof self == 'object' && self.self === self && self) ||
            (typeof global == 'object' && global.global === global && global) ||
            Function('return this')() ||
            {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // Modern feature detection.
  var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
      supportsDataView = typeof DataView !== 'undefined';

  // All **ECMAScript 5+** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create,
      nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;

  // Create references to these builtin functions because we override them.
  var _isNaN = isNaN,
      _isFinite = isFinite;

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  // The largest integer that can be represented exactly.
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  // Some functions take a variable number of arguments, or a few expected
  // arguments at the beginning and then a variable number of values to operate
  // on. This helper accumulates all remaining arguments past the function’s
  // argument length (or an explicit `startIndex`), into an array that becomes
  // the last argument. Similar to ES6’s "rest parameter".
  function restArguments(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  }

  // Is a given variable an object?
  function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || (type === 'object' && !!obj);
  }

  // Is a given value equal to null?
  function isNull(obj) {
    return obj === null;
  }

  // Is a given variable undefined?
  function isUndefined(obj) {
    return obj === void 0;
  }

  // Is a given value a boolean?
  function isBoolean(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  }

  // Is a given value a DOM element?
  function isElement$1(obj) {
    return !!(obj && obj.nodeType === 1);
  }

  // Internal function for creating a `toString`-based type tester.
  function tagTester(name) {
    var tag = '[object ' + name + ']';
    return function(obj) {
      return toString.call(obj) === tag;
    };
  }

  var isString = tagTester('String');

  var isNumber = tagTester('Number');

  var isDate = tagTester('Date');

  var isRegExp = tagTester('RegExp');

  var isError = tagTester('Error');

  var isSymbol = tagTester('Symbol');

  var isArrayBuffer = tagTester('ArrayBuffer');

  var isFunction = tagTester('Function');

  // Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
  // v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  var isFunction$1 = isFunction;

  var hasObjectTag = tagTester('Object');

  // In IE 10 - Edge 13, `DataView` has string tag `'[object Object]'`.
  // In IE 11, the most common among them, this problem also applies to
  // `Map`, `WeakMap` and `Set`.
  // Also, there are cases where an application can override the native
  // `DataView` object, in cases like that we can't use the constructor
  // safely and should just rely on alternate `DataView` checks
  var hasDataViewBug = (
        supportsDataView && (!/\[native code\]/.test(String(DataView)) || hasObjectTag(new DataView(new ArrayBuffer(8))))
      ),
      isIE11 = (typeof Map !== 'undefined' && hasObjectTag(new Map));

  var isDataView = tagTester('DataView');

  // In IE 10 - Edge 13, we need a different heuristic
  // to determine whether an object is a `DataView`.
  // Also, in cases where the native `DataView` is
  // overridden we can't rely on the tag itself.
  function alternateIsDataView(obj) {
    return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer);
  }

  var isDataView$1 = (hasDataViewBug ? alternateIsDataView : isDataView);

  // Is a given value an array?
  // Delegates to ECMA5's native `Array.isArray`.
  var isArray = nativeIsArray || tagTester('Array');

  // Internal function to check whether `key` is an own property name of `obj`.
  function has$1(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  }

  var isArguments = tagTester('Arguments');

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  (function() {
    if (!isArguments(arguments)) {
      isArguments = function(obj) {
        return has$1(obj, 'callee');
      };
    }
  }());

  var isArguments$1 = isArguments;

  // Is a given object a finite number?
  function isFinite$1(obj) {
    return !isSymbol(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
  }

  // Is the given value `NaN`?
  function isNaN$1(obj) {
    return isNumber(obj) && _isNaN(obj);
  }

  // Predicate-generating function. Often useful outside of Underscore.
  function constant(value) {
    return function() {
      return value;
    };
  }

  // Common internal logic for `isArrayLike` and `isBufferLike`.
  function createSizePropertyCheck(getSizeProperty) {
    return function(collection) {
      var sizeProperty = getSizeProperty(collection);
      return typeof sizeProperty == 'number' && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
    }
  }

  // Internal helper to generate a function to obtain property `key` from `obj`.
  function shallowProperty(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  }

  // Internal helper to obtain the `byteLength` property of an object.
  var getByteLength = shallowProperty('byteLength');

  // Internal helper to determine whether we should spend extensive checks against
  // `ArrayBuffer` et al.
  var isBufferLike = createSizePropertyCheck(getByteLength);

  // Is a given value a typed array?
  var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
  function isTypedArray(obj) {
    // `ArrayBuffer.isView` is the most future-proof, so use it when available.
    // Otherwise, fall back on the above regular expression.
    return nativeIsView ? (nativeIsView(obj) && !isDataView$1(obj)) :
                  isBufferLike(obj) && typedArrayPattern.test(toString.call(obj));
  }

  var isTypedArray$1 = supportsArrayBuffer ? isTypedArray : constant(false);

  // Internal helper to obtain the `length` property of an object.
  var getLength = shallowProperty('length');

  // Internal helper to create a simple lookup structure.
  // `collectNonEnumProps` used to depend on `_.contains`, but this led to
  // circular imports. `emulatedSet` is a one-off solution that only works for
  // arrays of strings.
  function emulatedSet(keys) {
    var hash = {};
    for (var l = keys.length, i = 0; i < l; ++i) hash[keys[i]] = true;
    return {
      contains: function(key) { return hash[key] === true; },
      push: function(key) {
        hash[key] = true;
        return keys.push(key);
      }
    };
  }

  // Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
  // be iterated by `for key in ...` and thus missed. Extends `keys` in place if
  // needed.
  function collectNonEnumProps(obj, keys) {
    keys = emulatedSet(keys);
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (isFunction$1(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (has$1(obj, prop) && !keys.contains(prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  function keys(obj) {
    if (!isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (has$1(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  function isEmpty(obj) {
    if (obj == null) return true;
    // Skip the more expensive `toString`-based type checks if `obj` has no
    // `.length`.
    var length = getLength(obj);
    if (typeof length == 'number' && (
      isArray(obj) || isString(obj) || isArguments$1(obj)
    )) return length === 0;
    return getLength(keys(obj)) === 0;
  }

  // Returns whether an object has a given set of `key:value` pairs.
  function isMatch(object, attrs) {
    var _keys = keys(attrs), length = _keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = _keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  }

  // If Underscore is called as a function, it returns a wrapped object that can
  // be used OO-style. This wrapper holds altered versions of all functions added
  // through `_.mixin`. Wrapped objects may be chained.
  function _$1(obj) {
    if (obj instanceof _$1) return obj;
    if (!(this instanceof _$1)) return new _$1(obj);
    this._wrapped = obj;
  }

  _$1.VERSION = VERSION;

  // Extracts the result from a wrapped and chained object.
  _$1.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxies for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _$1.prototype.valueOf = _$1.prototype.toJSON = _$1.prototype.value;

  _$1.prototype.toString = function() {
    return String(this._wrapped);
  };

  // Internal function to wrap or shallow-copy an ArrayBuffer,
  // typed array or DataView to a new view, reusing the buffer.
  function toBufferView(bufferSource) {
    return new Uint8Array(
      bufferSource.buffer || bufferSource,
      bufferSource.byteOffset || 0,
      getByteLength(bufferSource)
    );
  }

  // We use this string twice, so give it a name for minification.
  var tagDataView = '[object DataView]';

  // Internal recursive comparison function for `_.isEqual`.
  function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  }

  // Internal recursive comparison function for `_.isEqual`.
  function deepEq(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _$1) a = a._wrapped;
    if (b instanceof _$1) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    // Work around a bug in IE 10 - Edge 13.
    if (hasDataViewBug && className == '[object Object]' && isDataView$1(a)) {
      if (!isDataView$1(b)) return false;
      className = tagDataView;
    }
    switch (className) {
      // These types are compared by value.
      case '[object RegExp]':
        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
      case '[object ArrayBuffer]':
      case tagDataView:
        // Coerce to typed array so we can fall through.
        return deepEq(toBufferView(a), toBufferView(b), aStack, bStack);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays && isTypedArray$1(a)) {
        var byteLength = getByteLength(a);
        if (byteLength !== getByteLength(b)) return false;
        if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
        areArrays = true;
    }
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(isFunction$1(aCtor) && aCtor instanceof aCtor &&
                               isFunction$1(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var _keys = keys(a), key;
      length = _keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = _keys[length];
        if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  }

  // Perform a deep comparison to check if two objects are equal.
  function isEqual(a, b) {
    return eq(a, b);
  }

  // Retrieve all the enumerable property names of an object.
  function allKeys(obj) {
    if (!isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }

  // Since the regular `Object.prototype.toString` type tests don't work for
  // some types in IE 11, we use a fingerprinting heuristic instead, based
  // on the methods. It's not great, but it's the best we got.
  // The fingerprint method lists are defined below.
  function ie11fingerprint(methods) {
    var length = getLength(methods);
    return function(obj) {
      if (obj == null) return false;
      // `Map`, `WeakMap` and `Set` have no enumerable keys.
      var keys = allKeys(obj);
      if (getLength(keys)) return false;
      for (var i = 0; i < length; i++) {
        if (!isFunction$1(obj[methods[i]])) return false;
      }
      // If we are testing against `WeakMap`, we need to ensure that
      // `obj` doesn't have a `forEach` method in order to distinguish
      // it from a regular `Map`.
      return methods !== weakMapMethods || !isFunction$1(obj[forEachName]);
    };
  }

  // In the interest of compact minification, we write
  // each string in the fingerprints only once.
  var forEachName = 'forEach',
      hasName = 'has',
      commonInit = ['clear', 'delete'],
      mapTail = ['get', hasName, 'set'];

  // `Map`, `WeakMap` and `Set` each have slightly different
  // combinations of the above sublists.
  var mapMethods = commonInit.concat(forEachName, mapTail),
      weakMapMethods = commonInit.concat(mapTail),
      setMethods = ['add'].concat(commonInit, forEachName, hasName);

  var isMap = isIE11 ? ie11fingerprint(mapMethods) : tagTester('Map');

  var isWeakMap = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester('WeakMap');

  var isSet = isIE11 ? ie11fingerprint(setMethods) : tagTester('Set');

  var isWeakSet = tagTester('WeakSet');

  // Retrieve the values of an object's properties.
  function values(obj) {
    var _keys = keys(obj);
    var length = _keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[_keys[i]];
    }
    return values;
  }

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of `_.object` with one argument.
  function pairs(obj) {
    var _keys = keys(obj);
    var length = _keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [_keys[i], obj[_keys[i]]];
    }
    return pairs;
  }

  // Invert the keys and values of an object. The values must be serializable.
  function invert(obj) {
    var result = {};
    var _keys = keys(obj);
    for (var i = 0, length = _keys.length; i < length; i++) {
      result[obj[_keys[i]]] = _keys[i];
    }
    return result;
  }

  // Return a sorted list of the function names available on the object.
  function functions(obj) {
    var names = [];
    for (var key in obj) {
      if (isFunction$1(obj[key])) names.push(key);
    }
    return names.sort();
  }

  // An internal function for creating assigner functions.
  function createAssigner(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  }

  // Extend a given object with all the properties in passed-in object(s).
  var extend = createAssigner(allKeys);

  // Assigns a given object with all the own properties in the passed-in
  // object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  var extendOwn = createAssigner(keys);

  // Fill in a given object with default properties.
  var defaults = createAssigner(allKeys, true);

  // Create a naked function reference for surrogate-prototype-swapping.
  function ctor() {
    return function(){};
  }

  // An internal function for creating a new object that inherits from another.
  function baseCreate(prototype) {
    if (!isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    var Ctor = ctor();
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  }

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  function create(prototype, props) {
    var result = baseCreate(prototype);
    if (props) extendOwn(result, props);
    return result;
  }

  // Create a (shallow-cloned) duplicate of an object.
  function clone(obj) {
    if (!isObject(obj)) return obj;
    return isArray(obj) ? obj.slice() : extend({}, obj);
  }

  // Invokes `interceptor` with the `obj` and then returns `obj`.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  function tap(obj, interceptor) {
    interceptor(obj);
    return obj;
  }

  // Normalize a (deep) property `path` to array.
  // Like `_.iteratee`, this function can be customized.
  function toPath$1(path) {
    return isArray(path) ? path : [path];
  }
  _$1.toPath = toPath$1;

  // Internal wrapper for `_.toPath` to enable minification.
  // Similar to `cb` for `_.iteratee`.
  function toPath(path) {
    return _$1.toPath(path);
  }

  // Internal function to obtain a nested property in `obj` along `path`.
  function deepGet(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  }

  // Get the value of the (deep) property on `path` from `object`.
  // If any property in `path` does not exist or if the value is
  // `undefined`, return `defaultValue` instead.
  // The `path` is normalized through `_.toPath`.
  function get(object, path, defaultValue) {
    var value = deepGet(object, toPath(path));
    return isUndefined(value) ? defaultValue : value;
  }

  // Shortcut function for checking if an object has a given property directly on
  // itself (in other words, not on a prototype). Unlike the internal `has`
  // function, this public version can also traverse nested properties.
  function has(obj, path) {
    path = toPath(path);
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (!has$1(obj, key)) return false;
      obj = obj[key];
    }
    return !!length;
  }

  // Keep the identity function around for default iteratees.
  function identity(value) {
    return value;
  }

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  function matcher(attrs) {
    attrs = extendOwn({}, attrs);
    return function(obj) {
      return isMatch(obj, attrs);
    };
  }

  // Creates a function that, when passed an object, will traverse that object’s
  // properties down the given `path`, specified as an array of keys or indices.
  function property(path) {
    path = toPath(path);
    return function(obj) {
      return deepGet(obj, path);
    };
  }

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  function optimizeCb(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-argument case is omitted because we’re not using it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  }

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `_.identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  function baseIteratee(value, context, argCount) {
    if (value == null) return identity;
    if (isFunction$1(value)) return optimizeCb(value, context, argCount);
    if (isObject(value) && !isArray(value)) return matcher(value);
    return property(value);
  }

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only `argCount` argument.
  function iteratee(value, context) {
    return baseIteratee(value, context, Infinity);
  }
  _$1.iteratee = iteratee;

  // The function we call internally to generate a callback. It invokes
  // `_.iteratee` if overridden, otherwise `baseIteratee`.
  function cb(value, context, argCount) {
    if (_$1.iteratee !== iteratee) return _$1.iteratee(value, context);
    return baseIteratee(value, context, argCount);
  }

  // Returns the results of applying the `iteratee` to each element of `obj`.
  // In contrast to `_.map` it returns an object.
  function mapObject(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var _keys = keys(obj),
        length = _keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = _keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  }

  // Predicate-generating function. Often useful outside of Underscore.
  function noop$2(){}

  // Generates a function for a given object that returns a given property.
  function propertyOf(obj) {
    if (obj == null) return noop$2;
    return function(path) {
      return get(obj, path);
    };
  }

  // Run a function **n** times.
  function times(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  }

  // Return a random integer between `min` and `max` (inclusive).
  function random(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  // A (possibly faster) way to get the current timestamp as an integer.
  var now = Date.now || function() {
    return new Date().getTime();
  };

  // Internal helper to generate functions for escaping and unescaping strings
  // to/from HTML interpolation.
  function createEscaper(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  }

  // Internal list of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };

  // Function for escaping strings to HTML interpolation.
  var escape = createEscaper(escapeMap);

  // Internal list of HTML entities for unescaping.
  var unescapeMap = invert(escapeMap);

  // Function for unescaping strings from HTML interpolation.
  var unescape = createEscaper(unescapeMap);

  // By default, Underscore uses ERB-style template delimiters. Change the
  // following template settings to use alternative delimiters.
  var templateSettings = _$1.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `_.templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  function escapeChar(match) {
    return '\\' + escapes[match];
  }

  // In order to prevent third-party code injection through
  // `_.templateSettings.variable`, we test it against the following regular
  // expression. It is intentionally a bit more liberal than just matching valid
  // identifiers, but still prevents possible loopholes through defaults or
  // destructuring assignment.
  var bareIdentifier = /^\s*(\w|\$)+\s*$/;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  function template(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = defaults({}, settings, _$1.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    var argument = settings.variable;
    if (argument) {
      // Insure against third-party code injection. (CVE-2021-23358)
      if (!bareIdentifier.test(argument)) throw new Error(
        'variable is not a bare identifier: ' + argument
      );
    } else {
      // If a variable is not specified, place data values in local scope.
      source = 'with(obj||{}){\n' + source + '}\n';
      argument = 'obj';
    }

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(argument, '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _$1);
    };

    // Provide the compiled source as a convenience for precompilation.
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  }

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  function result(obj, path, fallback) {
    path = toPath(path);
    var length = path.length;
    if (!length) {
      return isFunction$1(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = isFunction$1(prop) ? prop.call(obj) : prop;
    }
    return obj;
  }

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter$1 = 0;
  function uniqueId(prefix) {
    var id = ++idCounter$1 + '';
    return prefix ? prefix + id : id;
  }

  // Start chaining a wrapped Underscore object.
  function chain(obj) {
    var instance = _$1(obj);
    instance._chain = true;
    return instance;
  }

  // Internal function to execute `sourceFunc` bound to `context` with optional
  // `args`. Determines whether to execute a function as a constructor or as a
  // normal function.
  function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (isObject(result)) return result;
    return self;
  }

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. `_` acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
  var partial = restArguments(function(func, boundArgs) {
    var placeholder = partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  partial.placeholder = _$1;

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally).
  var bind = restArguments(function(func, context, args) {
    if (!isFunction$1(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArguments(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Internal helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var isArrayLike = createSizePropertyCheck(getLength);

  // Internal implementation of a recursive `flatten` function.
  function flatten$1(input, depth, strict, output) {
    output = output || [];
    if (!depth && depth !== 0) {
      depth = Infinity;
    } else if (depth <= 0) {
      return output.concat(input);
    }
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (isArray(value) || isArguments$1(value))) {
        // Flatten current level of array or arguments object.
        if (depth > 1) {
          flatten$1(value, depth - 1, strict, output);
          idx = output.length;
        } else {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  }

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  var bindAll = restArguments(function(obj, keys) {
    keys = flatten$1(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = bind(obj[key], obj);
    }
    return obj;
  });

  // Memoize an expensive function by storing its results.
  function memoize(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!has$1(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  }

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  var delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  var defer = partial(delay, _$1, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var _now = now();
      if (!previous && options.leading === false) previous = _now;
      var remaining = wait - (_now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = _now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }

  // When a sequence of calls of the returned function ends, the argument
  // function is triggered. The end of a sequence is defined by the `wait`
  // parameter. If `immediate` is passed, the argument function will be
  // triggered at the beginning of the sequence instead of at the end.
  function debounce(func, wait, immediate) {
    var timeout, previous, args, result, context;

    var later = function() {
      var passed = now() - previous;
      if (wait > passed) {
        timeout = setTimeout(later, wait - passed);
      } else {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
        // This check is needed because `func` can recursively invoke `debounced`.
        if (!timeout) args = context = null;
      }
    };

    var debounced = restArguments(function(_args) {
      context = this;
      args = _args;
      previous = now();
      if (!timeout) {
        timeout = setTimeout(later, wait);
        if (immediate) result = func.apply(context, args);
      }
      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = args = context = null;
    };

    return debounced;
  }

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  function wrap(func, wrapper) {
    return partial(wrapper, func);
  }

  // Returns a negated version of the passed-in predicate.
  function negate(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  }

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  }

  // Returns a function that will only be executed on and after the Nth call.
  function after(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  }

  // Returns a function that will only be executed up to (but not including) the
  // Nth call.
  function before(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  }

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  var once = partial(before, 2);

  // Returns the first key on an object that passes a truth test.
  function findKey(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = keys(obj), key;
    for (var i = 0, length = _keys.length; i < length; i++) {
      key = _keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  }

  // Internal function to generate `_.findIndex` and `_.findLastIndex`.
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a truth test.
  var findIndex = createPredicateIndexFinder(1);

  // Returns the last index on an array-like that passes a truth test.
  var findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  function sortedIndex(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  }

  // Internal function to generate the `_.indexOf` and `_.lastIndexOf` functions.
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), isNaN$1);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  var indexOf = createIndexFinder(1, findIndex, sortedIndex);

  // Return the position of the last occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  var lastIndexOf = createIndexFinder(-1, findLastIndex);

  // Return the first value which passes a truth test.
  function find(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? findIndex : findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  }

  // Convenience version of a common use case of `_.find`: getting the first
  // object containing specific `key:value` pairs.
  function findWhere(obj, attrs) {
    return find(obj, matcher(attrs));
  }

  // The cornerstone for collection functions, an `each`
  // implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  function each(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var _keys = keys(obj);
      for (i = 0, length = _keys.length; i < length; i++) {
        iteratee(obj[_keys[i]], _keys[i], obj);
      }
    }
    return obj;
  }

  // Return the results of applying the iteratee to each element.
  function map(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  }

  // Internal helper to create a reducing function, iterating left or right.
  function createReduce(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var _keys = !isArrayLike(obj) && keys(obj),
          length = (_keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[_keys ? _keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = _keys ? _keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  var reduce = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  var reduceRight = createReduce(-1);

  // Return all the elements that pass a truth test.
  function filter(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  }

  // Return all the elements for which a truth test fails.
  function reject(obj, predicate, context) {
    return filter(obj, negate(cb(predicate)), context);
  }

  // Determine whether all of the elements pass a truth test.
  function every(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  }

  // Determine if at least one element in the object passes a truth test.
  function some(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  }

  // Determine if the array or object contains a given item (using `===`).
  function contains$2(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return indexOf(obj, item, fromIndex) >= 0;
  }

  // Invoke a method (with arguments) on every item in a collection.
  var invoke = restArguments(function(obj, path, args) {
    var contextPath, func;
    if (isFunction$1(path)) {
      func = path;
    } else {
      path = toPath(path);
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  // Convenience version of a common use case of `_.map`: fetching a property.
  function pluck(obj, key) {
    return map(obj, property(key));
  }

  // Convenience version of a common use case of `_.filter`: selecting only
  // objects containing specific `key:value` pairs.
  function where(obj, attrs) {
    return filter(obj, matcher(attrs));
  }

  // Return the maximum element (or element-based computation).
  function max$1(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null)) {
      obj = isArrayLike(obj) ? obj : values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || (computed === -Infinity && result === -Infinity)) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  }

  // Return the minimum element (or element-based computation).
  function min$1(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null)) {
      obj = isArrayLike(obj) ? obj : values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || (computed === Infinity && result === Infinity)) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  }

  // Safely create a real, live array from anything iterable.
  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  function toArray(obj) {
    if (!obj) return [];
    if (isArray(obj)) return slice.call(obj);
    if (isString(obj)) {
      // Keep surrogate pair characters together.
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return map(obj, identity);
    return values(obj);
  }

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `_.map`.
  function sample(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = values(obj);
      return obj[random(obj.length - 1)];
    }
    var sample = toArray(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  }

  // Shuffle a collection.
  function shuffle(obj) {
    return sample(obj, Infinity);
  }

  // Sort the object's values by a criterion produced by an iteratee.
  function sortBy(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return pluck(map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  }

  // An internal function used for aggregate "group by" operations.
  function group(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  }

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  var groupBy = group(function(result, value, key) {
    if (has$1(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `_.groupBy`, but for
  // when you know that your index values will be unique.
  var indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  var countBy = group(function(result, value, key) {
    if (has$1(result, key)) result[key]++; else result[key] = 1;
  });

  // Split a collection into two arrays: one whose elements all pass the given
  // truth test, and one whose elements all do not pass the truth test.
  var partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Return the number of elements in a collection.
  function size(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : keys(obj).length;
  }

  // Internal `_.pick` helper function to determine whether `key` is an enumerable
  // property name of `obj`.
  function keyInObj(value, key, obj) {
    return key in obj;
  }

  // Return a copy of the object only containing the allowed properties.
  var pick = restArguments(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (isFunction$1(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten$1(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the disallowed properties.
  var omit = restArguments(function(obj, keys) {
    var iteratee = keys[0], context;
    if (isFunction$1(iteratee)) {
      iteratee = negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = map(flatten$1(keys, false, false), String);
      iteratee = function(value, key) {
        return !contains$2(keys, key);
      };
    }
    return pick(obj, iteratee, context);
  });

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  function initial(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  }

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. The **guard** check allows it to work with `_.map`.
  function first(array, n, guard) {
    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
    if (n == null || guard) return array[0];
    return initial(array, array.length - n);
  }

  // Returns everything but the first entry of the `array`. Especially useful on
  // the `arguments` object. Passing an **n** will return the rest N values in the
  // `array`.
  function rest(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  }

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  function last(array, n, guard) {
    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
    if (n == null || guard) return array[array.length - 1];
    return rest(array, Math.max(0, array.length - n));
  }

  // Trim out all falsy values from an array.
  function compact(array) {
    return filter(array, Boolean);
  }

  // Flatten out an array, either recursively (by default), or up to `depth`.
  // Passing `true` or `false` as `depth` means `1` or `Infinity`, respectively.
  function flatten(array, depth) {
    return flatten$1(array, depth, false);
  }

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = restArguments(function(array, rest) {
    rest = flatten$1(rest, true, true);
    return filter(array, function(value){
      return !contains$2(rest, value);
    });
  });

  // Return a version of the array that does not contain the specified value(s).
  var without = restArguments(function(array, otherArrays) {
    return difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  function uniq(array, isSorted, iteratee, context) {
    if (!isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!contains$2(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!contains$2(result, value)) {
        result.push(value);
      }
    }
    return result;
  }

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  var union = restArguments(function(arrays) {
    return uniq(flatten$1(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  function intersection(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (contains$2(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!contains$2(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  }

  // Complement of zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  function unzip(array) {
    var length = (array && max$1(array, getLength).length) || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = pluck(array, index);
    }
    return result;
  }

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  var zip = restArguments(unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of `_.pairs`.
  function object(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  }

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](https://docs.python.org/library/functions.html#range).
  function range(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  }

  // Chunk a single array into multiple arrays, each containing `count` or fewer
  // items.
  function chunk(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  }

  // Helper function to continue chaining intermediate results.
  function chainResult(instance, obj) {
    return instance._chain ? _$1(obj).chain() : obj;
  }

  // Add your own custom functions to the Underscore object.
  function mixin(obj) {
    each(functions(obj), function(name) {
      var func = _$1[name] = obj[name];
      _$1.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_$1, args));
      };
    });
    return _$1;
  }

  // Add all mutator `Array` functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _$1.prototype[name] = function() {
      var obj = this._wrapped;
      if (obj != null) {
        method.apply(obj, arguments);
        if ((name === 'shift' || name === 'splice') && obj.length === 0) {
          delete obj[0];
        }
      }
      return chainResult(this, obj);
    };
  });

  // Add all accessor `Array` functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _$1.prototype[name] = function() {
      var obj = this._wrapped;
      if (obj != null) obj = method.apply(obj, arguments);
      return chainResult(this, obj);
    };
  });

  // Named Exports
  // =============

  var allExports = /*#__PURE__*/Object.freeze({
      __proto__: null,
      VERSION: VERSION,
      after: after,
      all: every,
      allKeys: allKeys,
      any: some,
      assign: extendOwn,
      before: before,
      bind: bind,
      bindAll: bindAll,
      chain: chain,
      chunk: chunk,
      clone: clone,
      collect: map,
      compact: compact,
      compose: compose,
      constant: constant,
      contains: contains$2,
      countBy: countBy,
      create: create,
      debounce: debounce,
      default: _$1,
      defaults: defaults,
      defer: defer,
      delay: delay,
      detect: find,
      difference: difference,
      drop: rest,
      each: each,
      escape: escape,
      every: every,
      extend: extend,
      extendOwn: extendOwn,
      filter: filter,
      find: find,
      findIndex: findIndex,
      findKey: findKey,
      findLastIndex: findLastIndex,
      findWhere: findWhere,
      first: first,
      flatten: flatten,
      foldl: reduce,
      foldr: reduceRight,
      forEach: each,
      functions: functions,
      get: get,
      groupBy: groupBy,
      has: has,
      head: first,
      identity: identity,
      include: contains$2,
      includes: contains$2,
      indexBy: indexBy,
      indexOf: indexOf,
      initial: initial,
      inject: reduce,
      intersection: intersection,
      invert: invert,
      invoke: invoke,
      isArguments: isArguments$1,
      isArray: isArray,
      isArrayBuffer: isArrayBuffer,
      isBoolean: isBoolean,
      isDataView: isDataView$1,
      isDate: isDate,
      isElement: isElement$1,
      isEmpty: isEmpty,
      isEqual: isEqual,
      isError: isError,
      isFinite: isFinite$1,
      isFunction: isFunction$1,
      isMap: isMap,
      isMatch: isMatch,
      isNaN: isNaN$1,
      isNull: isNull,
      isNumber: isNumber,
      isObject: isObject,
      isRegExp: isRegExp,
      isSet: isSet,
      isString: isString,
      isSymbol: isSymbol,
      isTypedArray: isTypedArray$1,
      isUndefined: isUndefined,
      isWeakMap: isWeakMap,
      isWeakSet: isWeakSet,
      iteratee: iteratee,
      keys: keys,
      last: last,
      lastIndexOf: lastIndexOf,
      map: map,
      mapObject: mapObject,
      matcher: matcher,
      matches: matcher,
      max: max$1,
      memoize: memoize,
      methods: functions,
      min: min$1,
      mixin: mixin,
      negate: negate,
      noop: noop$2,
      now: now,
      object: object,
      omit: omit,
      once: once,
      pairs: pairs,
      partial: partial,
      partition: partition,
      pick: pick,
      pluck: pluck,
      property: property,
      propertyOf: propertyOf,
      random: random,
      range: range,
      reduce: reduce,
      reduceRight: reduceRight,
      reject: reject,
      rest: rest,
      restArguments: restArguments,
      result: result,
      sample: sample,
      select: filter,
      shuffle: shuffle,
      size: size,
      some: some,
      sortBy: sortBy,
      sortedIndex: sortedIndex,
      tail: rest,
      take: first,
      tap: tap,
      template: template,
      templateSettings: templateSettings,
      throttle: throttle,
      times: times,
      toArray: toArray,
      toPath: toPath$1,
      transpose: unzip,
      unescape: unescape,
      union: union,
      uniq: uniq,
      unique: uniq,
      uniqueId: uniqueId,
      unzip: unzip,
      values: values,
      where: where,
      without: without,
      wrap: wrap,
      zip: zip
  });

  // Default Export
  // ==============
  // In this module, we mix our bundled exports into the `_` object and export
  // the result. This is analogous to setting `module.exports = _` in CommonJS.
  // Hence, this module is also the entry point of our UMD bundle and the package
  // entry point for CommonJS and AMD users. In other words, this is (the source
  // of) the module you are interfacing with when you do any of the following:
  //
  // ```js
  // // CommonJS
  // var _ = require('underscore');
  //
  // // AMD
  // define(['underscore'], function(_) {...});
  //
  // // UMD in the browser
  // // _ is available as a global variable
  // ```

  // Add all of the Underscore functions to the wrapper object.
  var _ = mixin(allExports);
  // Legacy Node.js API.
  _._ = _;

  function useScrollToEdgeObservingRef(tolerancePx = 0) {
      const [previousEl, setPreviousEl] = React.useState(null);
      const [flushTop, setFlushTop] = React.useState(true);
      const [flushBottom, setFlushBottom] = React.useState(true);
      const [flushLeft, setFlushLeft] = React.useState(true);
      const [flushRight, setFlushRight] = React.useState(true);
      const update = React.useCallback(_.debounce((el) => {
          const { scrollLeft, clientWidth, scrollWidth, scrollTop, clientHeight, scrollHeight } = el;
          setFlushTop(Math.floor(scrollTop) <= tolerancePx);
          setFlushBottom(Math.ceil(scrollTop) + clientHeight >= scrollHeight - tolerancePx);
          setFlushLeft(Math.floor(scrollLeft) <= tolerancePx);
          setFlushRight(Math.ceil(scrollLeft) + clientWidth >= scrollWidth - tolerancePx);
      }, 0), []);
      const onScroll = React.useCallback(event => {
          update(event.currentTarget);
      }, []);
      const [observer, setObserver] = React.useState(undefined);
      React.useEffect(() => {
          let resizeObserver = new ResizeObserver(([entry]) => update(entry.target));
          if (previousEl) {
              resizeObserver.observe(previousEl);
          }
          setObserver(resizeObserver);
          return () => resizeObserver.disconnect();
      }, []);
      const ref = (el) => {
          if (previousEl) {
              observer === null || observer === void 0 ? void 0 : observer.unobserve(previousEl);
              previousEl.removeEventListener("scroll", onScroll);
          }
          if (el) {
              observer === null || observer === void 0 ? void 0 : observer.observe(el);
              el.addEventListener("scroll", onScroll);
          }
          setPreviousEl(el);
      };
      return { ref, flushTop, flushRight, flushBottom, flushLeft };
  }

  const ITEM_CLASS_NAME = "e2-overflow-frame__item";
  const Component$d = React__namespace.forwardRef((_a, forward) => {
      var { children, "data-cname": cname, inverted = false, "test-id": testId } = _a, otherProps = __rest(_a, ["children", "data-cname", "inverted", "test-id"]);
      const baseRef = React.useRef(undefined);
      const { ref: scrollRef, flushLeft, flushRight } = useScrollToEdgeObservingRef(1);
      const combinedRef = useCombinedRef$1(baseRef, scrollRef);
      const scroll = React.useCallback((next) => {
          const container = baseRef.current;
          const center = container.scrollLeft + container.clientWidth / 2;
          const itemElements = Array.from(container.querySelectorAll(`.${ITEM_CLASS_NAME}`));
          if (itemElements.length <= 0) {
              return;
          }
          const sortedItems = itemElements
              .map(element => {
              const midpoint = element.offsetLeft + element.clientWidth / 2;
              return { element, midpoint, distanceFromCenter: midpoint - center };
          })
              .sort((a, b) => a.midpoint - b.midpoint);
          const targets = sortedItems.reduce((memo, item, idx, items) => {
              if (!memo || Math.abs(item.distanceFromCenter) < Math.abs(memo.middle.distanceFromCenter)) {
                  return {
                      previous: items[Math.max(0, idx - 1)],
                      middle: item,
                      next: items[Math.min(items.length - 1, idx + 1)],
                  };
              }
              else {
                  return memo;
              }
          }, undefined);
          const targetItem = targets[next ? "next" : "previous"];
          if (targetItem === sortedItems[0]) {
              targetItem.element.scrollIntoView({ inline: "start", block: "nearest", behavior: "smooth" });
          }
          else if (targetItem === sortedItems[sortedItems.length - 1]) {
              targetItem.element.scrollIntoView({ inline: "end", block: "nearest", behavior: "smooth" });
          }
          else {
              targetItem.element.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
          }
      }, [baseRef]);
      if (!(testId || "").trim()) {
          testId = cname;
      }
      const classNames = ["e2-overflow-frame"];
      if (inverted) {
          classNames.push("e2-overflow-frame--inverted");
      }
      const leftClassNames = ["e2-overflow-frame__scroll-left"];
      if (flushLeft) {
          leftClassNames.push("e2-overflow-frame__scroll-left--hidden");
      }
      const rightClassNames = ["e2-overflow-frame__scroll-right"];
      if (flushRight) {
          rightClassNames.push("e2-overflow-frame__scroll-right--hidden");
      }
      return React__namespace.createElement("div", Object.assign({ ref: forward, className: classNames.join(" "), "data-cname": cname, "test-id": testId }, otherProps),
          React__namespace.createElement("div", { className: "e2-overflow-frame__mask" },
              React__namespace.createElement("div", { ref: combinedRef, className: "e2-overflow-frame__scrollable" },
                  React__namespace.createElement("div", { className: "e2-overflow-frame__content" }, children))),
          React__namespace.createElement("button", { className: leftClassNames.join(" "), onClick: () => scroll(false), "data-cname": cname + "__scroll_left", "test-id": testId + "__scroll_left" },
              React__namespace.createElement(MaterialIcon, { filename: "icon-chevron-left-24" })),
          React__namespace.createElement("button", { className: rightClassNames.join(" "), onClick: () => scroll(true), "data-cname": cname + "__scroll_right", "test-id": testId + "__scroll_right" },
              React__namespace.createElement(MaterialIcon, { filename: "icon-chevron-right-24" })));
  });
  const OverflowFrame = Object.assign(Component$d, {
      displayName: "OverflowFrame",
      ITEM_CLASS_NAME
  });

  var __assign$1 = function () {
      __assign$1 = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign$1.apply(this, arguments);
  };
  // This file is autogenerated by tools/process-named-references.ts
  var pairDivider = "~";
  var blockDivider = "~~";
  function generateNamedReferences(input, prev) {
      var entities = {};
      var characters = {};
      var blocks = input.split(blockDivider);
      var isOptionalBlock = false;
      for (var i = 0; blocks.length > i; i++) {
          var entries = blocks[i].split(pairDivider);
          for (var j = 0; j < entries.length; j += 2) {
              var entity = entries[j];
              var character = entries[j + 1];
              var fullEntity = '&' + entity + ';';
              entities[fullEntity] = character;
              if (isOptionalBlock) {
                  entities['&' + entity] = character;
              }
              characters[character] = fullEntity;
          }
          isOptionalBlock = true;
      }
      return prev ?
          { entities: __assign$1(__assign$1({}, entities), prev.entities), characters: __assign$1(__assign$1({}, characters), prev.characters) } :
          { entities: entities, characters: characters };
  }
  var bodyRegExps = {
      xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
      html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
      html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
  };
  var namedReferences = {};
  namedReferences['xml'] = generateNamedReferences("lt~<~gt~>~quot~\"~apos~'~amp~&");
  namedReferences['html4'] = generateNamedReferences("apos~'~OElig~Œ~oelig~œ~Scaron~Š~scaron~š~Yuml~Ÿ~circ~ˆ~tilde~˜~ensp~ ~emsp~ ~thinsp~ ~zwnj~‌~zwj~‍~lrm~‎~rlm~‏~ndash~–~mdash~—~lsquo~‘~rsquo~’~sbquo~‚~ldquo~“~rdquo~”~bdquo~„~dagger~†~Dagger~‡~permil~‰~lsaquo~‹~rsaquo~›~euro~€~fnof~ƒ~Alpha~Α~Beta~Β~Gamma~Γ~Delta~Δ~Epsilon~Ε~Zeta~Ζ~Eta~Η~Theta~Θ~Iota~Ι~Kappa~Κ~Lambda~Λ~Mu~Μ~Nu~Ν~Xi~Ξ~Omicron~Ο~Pi~Π~Rho~Ρ~Sigma~Σ~Tau~Τ~Upsilon~Υ~Phi~Φ~Chi~Χ~Psi~Ψ~Omega~Ω~alpha~α~beta~β~gamma~γ~delta~δ~epsilon~ε~zeta~ζ~eta~η~theta~θ~iota~ι~kappa~κ~lambda~λ~mu~μ~nu~ν~xi~ξ~omicron~ο~pi~π~rho~ρ~sigmaf~ς~sigma~σ~tau~τ~upsilon~υ~phi~φ~chi~χ~psi~ψ~omega~ω~thetasym~ϑ~upsih~ϒ~piv~ϖ~bull~•~hellip~…~prime~′~Prime~″~oline~‾~frasl~⁄~weierp~℘~image~ℑ~real~ℜ~trade~™~alefsym~ℵ~larr~←~uarr~↑~rarr~→~darr~↓~harr~↔~crarr~↵~lArr~⇐~uArr~⇑~rArr~⇒~dArr~⇓~hArr~⇔~forall~∀~part~∂~exist~∃~empty~∅~nabla~∇~isin~∈~notin~∉~ni~∋~prod~∏~sum~∑~minus~−~lowast~∗~radic~√~prop~∝~infin~∞~ang~∠~and~∧~or~∨~cap~∩~cup~∪~int~∫~there4~∴~sim~∼~cong~≅~asymp~≈~ne~≠~equiv~≡~le~≤~ge~≥~sub~⊂~sup~⊃~nsub~⊄~sube~⊆~supe~⊇~oplus~⊕~otimes~⊗~perp~⊥~sdot~⋅~lceil~⌈~rceil~⌉~lfloor~⌊~rfloor~⌋~lang~〈~rang~〉~loz~◊~spades~♠~clubs~♣~hearts~♥~diams~♦~~nbsp~ ~iexcl~¡~cent~¢~pound~£~curren~¤~yen~¥~brvbar~¦~sect~§~uml~¨~copy~©~ordf~ª~laquo~«~not~¬~shy~­~reg~®~macr~¯~deg~°~plusmn~±~sup2~²~sup3~³~acute~´~micro~µ~para~¶~middot~·~cedil~¸~sup1~¹~ordm~º~raquo~»~frac14~¼~frac12~½~frac34~¾~iquest~¿~Agrave~À~Aacute~Á~Acirc~Â~Atilde~Ã~Auml~Ä~Aring~Å~AElig~Æ~Ccedil~Ç~Egrave~È~Eacute~É~Ecirc~Ê~Euml~Ë~Igrave~Ì~Iacute~Í~Icirc~Î~Iuml~Ï~ETH~Ð~Ntilde~Ñ~Ograve~Ò~Oacute~Ó~Ocirc~Ô~Otilde~Õ~Ouml~Ö~times~×~Oslash~Ø~Ugrave~Ù~Uacute~Ú~Ucirc~Û~Uuml~Ü~Yacute~Ý~THORN~Þ~szlig~ß~agrave~à~aacute~á~acirc~â~atilde~ã~auml~ä~aring~å~aelig~æ~ccedil~ç~egrave~è~eacute~é~ecirc~ê~euml~ë~igrave~ì~iacute~í~icirc~î~iuml~ï~eth~ð~ntilde~ñ~ograve~ò~oacute~ó~ocirc~ô~otilde~õ~ouml~ö~divide~÷~oslash~ø~ugrave~ù~uacute~ú~ucirc~û~uuml~ü~yacute~ý~thorn~þ~yuml~ÿ~quot~\"~amp~&~lt~<~gt~>");
  namedReferences['html5'] = generateNamedReferences("Abreve~Ă~Acy~А~Afr~𝔄~Amacr~Ā~And~⩓~Aogon~Ą~Aopf~𝔸~ApplyFunction~⁡~Ascr~𝒜~Assign~≔~Backslash~∖~Barv~⫧~Barwed~⌆~Bcy~Б~Because~∵~Bernoullis~ℬ~Bfr~𝔅~Bopf~𝔹~Breve~˘~Bscr~ℬ~Bumpeq~≎~CHcy~Ч~Cacute~Ć~Cap~⋒~CapitalDifferentialD~ⅅ~Cayleys~ℭ~Ccaron~Č~Ccirc~Ĉ~Cconint~∰~Cdot~Ċ~Cedilla~¸~CenterDot~·~Cfr~ℭ~CircleDot~⊙~CircleMinus~⊖~CirclePlus~⊕~CircleTimes~⊗~ClockwiseContourIntegral~∲~CloseCurlyDoubleQuote~”~CloseCurlyQuote~’~Colon~∷~Colone~⩴~Congruent~≡~Conint~∯~ContourIntegral~∮~Copf~ℂ~Coproduct~∐~CounterClockwiseContourIntegral~∳~Cross~⨯~Cscr~𝒞~Cup~⋓~CupCap~≍~DD~ⅅ~DDotrahd~⤑~DJcy~Ђ~DScy~Ѕ~DZcy~Џ~Darr~↡~Dashv~⫤~Dcaron~Ď~Dcy~Д~Del~∇~Dfr~𝔇~DiacriticalAcute~´~DiacriticalDot~˙~DiacriticalDoubleAcute~˝~DiacriticalGrave~`~DiacriticalTilde~˜~Diamond~⋄~DifferentialD~ⅆ~Dopf~𝔻~Dot~¨~DotDot~⃜~DotEqual~≐~DoubleContourIntegral~∯~DoubleDot~¨~DoubleDownArrow~⇓~DoubleLeftArrow~⇐~DoubleLeftRightArrow~⇔~DoubleLeftTee~⫤~DoubleLongLeftArrow~⟸~DoubleLongLeftRightArrow~⟺~DoubleLongRightArrow~⟹~DoubleRightArrow~⇒~DoubleRightTee~⊨~DoubleUpArrow~⇑~DoubleUpDownArrow~⇕~DoubleVerticalBar~∥~DownArrow~↓~DownArrowBar~⤓~DownArrowUpArrow~⇵~DownBreve~̑~DownLeftRightVector~⥐~DownLeftTeeVector~⥞~DownLeftVector~↽~DownLeftVectorBar~⥖~DownRightTeeVector~⥟~DownRightVector~⇁~DownRightVectorBar~⥗~DownTee~⊤~DownTeeArrow~↧~Downarrow~⇓~Dscr~𝒟~Dstrok~Đ~ENG~Ŋ~Ecaron~Ě~Ecy~Э~Edot~Ė~Efr~𝔈~Element~∈~Emacr~Ē~EmptySmallSquare~◻~EmptyVerySmallSquare~▫~Eogon~Ę~Eopf~𝔼~Equal~⩵~EqualTilde~≂~Equilibrium~⇌~Escr~ℰ~Esim~⩳~Exists~∃~ExponentialE~ⅇ~Fcy~Ф~Ffr~𝔉~FilledSmallSquare~◼~FilledVerySmallSquare~▪~Fopf~𝔽~ForAll~∀~Fouriertrf~ℱ~Fscr~ℱ~GJcy~Ѓ~Gammad~Ϝ~Gbreve~Ğ~Gcedil~Ģ~Gcirc~Ĝ~Gcy~Г~Gdot~Ġ~Gfr~𝔊~Gg~⋙~Gopf~𝔾~GreaterEqual~≥~GreaterEqualLess~⋛~GreaterFullEqual~≧~GreaterGreater~⪢~GreaterLess~≷~GreaterSlantEqual~⩾~GreaterTilde~≳~Gscr~𝒢~Gt~≫~HARDcy~Ъ~Hacek~ˇ~Hat~^~Hcirc~Ĥ~Hfr~ℌ~HilbertSpace~ℋ~Hopf~ℍ~HorizontalLine~─~Hscr~ℋ~Hstrok~Ħ~HumpDownHump~≎~HumpEqual~≏~IEcy~Е~IJlig~Ĳ~IOcy~Ё~Icy~И~Idot~İ~Ifr~ℑ~Im~ℑ~Imacr~Ī~ImaginaryI~ⅈ~Implies~⇒~Int~∬~Integral~∫~Intersection~⋂~InvisibleComma~⁣~InvisibleTimes~⁢~Iogon~Į~Iopf~𝕀~Iscr~ℐ~Itilde~Ĩ~Iukcy~І~Jcirc~Ĵ~Jcy~Й~Jfr~𝔍~Jopf~𝕁~Jscr~𝒥~Jsercy~Ј~Jukcy~Є~KHcy~Х~KJcy~Ќ~Kcedil~Ķ~Kcy~К~Kfr~𝔎~Kopf~𝕂~Kscr~𝒦~LJcy~Љ~Lacute~Ĺ~Lang~⟪~Laplacetrf~ℒ~Larr~↞~Lcaron~Ľ~Lcedil~Ļ~Lcy~Л~LeftAngleBracket~⟨~LeftArrow~←~LeftArrowBar~⇤~LeftArrowRightArrow~⇆~LeftCeiling~⌈~LeftDoubleBracket~⟦~LeftDownTeeVector~⥡~LeftDownVector~⇃~LeftDownVectorBar~⥙~LeftFloor~⌊~LeftRightArrow~↔~LeftRightVector~⥎~LeftTee~⊣~LeftTeeArrow~↤~LeftTeeVector~⥚~LeftTriangle~⊲~LeftTriangleBar~⧏~LeftTriangleEqual~⊴~LeftUpDownVector~⥑~LeftUpTeeVector~⥠~LeftUpVector~↿~LeftUpVectorBar~⥘~LeftVector~↼~LeftVectorBar~⥒~Leftarrow~⇐~Leftrightarrow~⇔~LessEqualGreater~⋚~LessFullEqual~≦~LessGreater~≶~LessLess~⪡~LessSlantEqual~⩽~LessTilde~≲~Lfr~𝔏~Ll~⋘~Lleftarrow~⇚~Lmidot~Ŀ~LongLeftArrow~⟵~LongLeftRightArrow~⟷~LongRightArrow~⟶~Longleftarrow~⟸~Longleftrightarrow~⟺~Longrightarrow~⟹~Lopf~𝕃~LowerLeftArrow~↙~LowerRightArrow~↘~Lscr~ℒ~Lsh~↰~Lstrok~Ł~Lt~≪~Map~⤅~Mcy~М~MediumSpace~ ~Mellintrf~ℳ~Mfr~𝔐~MinusPlus~∓~Mopf~𝕄~Mscr~ℳ~NJcy~Њ~Nacute~Ń~Ncaron~Ň~Ncedil~Ņ~Ncy~Н~NegativeMediumSpace~​~NegativeThickSpace~​~NegativeThinSpace~​~NegativeVeryThinSpace~​~NestedGreaterGreater~≫~NestedLessLess~≪~NewLine~\n~Nfr~𝔑~NoBreak~⁠~NonBreakingSpace~ ~Nopf~ℕ~Not~⫬~NotCongruent~≢~NotCupCap~≭~NotDoubleVerticalBar~∦~NotElement~∉~NotEqual~≠~NotEqualTilde~≂̸~NotExists~∄~NotGreater~≯~NotGreaterEqual~≱~NotGreaterFullEqual~≧̸~NotGreaterGreater~≫̸~NotGreaterLess~≹~NotGreaterSlantEqual~⩾̸~NotGreaterTilde~≵~NotHumpDownHump~≎̸~NotHumpEqual~≏̸~NotLeftTriangle~⋪~NotLeftTriangleBar~⧏̸~NotLeftTriangleEqual~⋬~NotLess~≮~NotLessEqual~≰~NotLessGreater~≸~NotLessLess~≪̸~NotLessSlantEqual~⩽̸~NotLessTilde~≴~NotNestedGreaterGreater~⪢̸~NotNestedLessLess~⪡̸~NotPrecedes~⊀~NotPrecedesEqual~⪯̸~NotPrecedesSlantEqual~⋠~NotReverseElement~∌~NotRightTriangle~⋫~NotRightTriangleBar~⧐̸~NotRightTriangleEqual~⋭~NotSquareSubset~⊏̸~NotSquareSubsetEqual~⋢~NotSquareSuperset~⊐̸~NotSquareSupersetEqual~⋣~NotSubset~⊂⃒~NotSubsetEqual~⊈~NotSucceeds~⊁~NotSucceedsEqual~⪰̸~NotSucceedsSlantEqual~⋡~NotSucceedsTilde~≿̸~NotSuperset~⊃⃒~NotSupersetEqual~⊉~NotTilde~≁~NotTildeEqual~≄~NotTildeFullEqual~≇~NotTildeTilde~≉~NotVerticalBar~∤~Nscr~𝒩~Ocy~О~Odblac~Ő~Ofr~𝔒~Omacr~Ō~Oopf~𝕆~OpenCurlyDoubleQuote~“~OpenCurlyQuote~‘~Or~⩔~Oscr~𝒪~Otimes~⨷~OverBar~‾~OverBrace~⏞~OverBracket~⎴~OverParenthesis~⏜~PartialD~∂~Pcy~П~Pfr~𝔓~PlusMinus~±~Poincareplane~ℌ~Popf~ℙ~Pr~⪻~Precedes~≺~PrecedesEqual~⪯~PrecedesSlantEqual~≼~PrecedesTilde~≾~Product~∏~Proportion~∷~Proportional~∝~Pscr~𝒫~Qfr~𝔔~Qopf~ℚ~Qscr~𝒬~RBarr~⤐~Racute~Ŕ~Rang~⟫~Rarr~↠~Rarrtl~⤖~Rcaron~Ř~Rcedil~Ŗ~Rcy~Р~Re~ℜ~ReverseElement~∋~ReverseEquilibrium~⇋~ReverseUpEquilibrium~⥯~Rfr~ℜ~RightAngleBracket~⟩~RightArrow~→~RightArrowBar~⇥~RightArrowLeftArrow~⇄~RightCeiling~⌉~RightDoubleBracket~⟧~RightDownTeeVector~⥝~RightDownVector~⇂~RightDownVectorBar~⥕~RightFloor~⌋~RightTee~⊢~RightTeeArrow~↦~RightTeeVector~⥛~RightTriangle~⊳~RightTriangleBar~⧐~RightTriangleEqual~⊵~RightUpDownVector~⥏~RightUpTeeVector~⥜~RightUpVector~↾~RightUpVectorBar~⥔~RightVector~⇀~RightVectorBar~⥓~Rightarrow~⇒~Ropf~ℝ~RoundImplies~⥰~Rrightarrow~⇛~Rscr~ℛ~Rsh~↱~RuleDelayed~⧴~SHCHcy~Щ~SHcy~Ш~SOFTcy~Ь~Sacute~Ś~Sc~⪼~Scedil~Ş~Scirc~Ŝ~Scy~С~Sfr~𝔖~ShortDownArrow~↓~ShortLeftArrow~←~ShortRightArrow~→~ShortUpArrow~↑~SmallCircle~∘~Sopf~𝕊~Sqrt~√~Square~□~SquareIntersection~⊓~SquareSubset~⊏~SquareSubsetEqual~⊑~SquareSuperset~⊐~SquareSupersetEqual~⊒~SquareUnion~⊔~Sscr~𝒮~Star~⋆~Sub~⋐~Subset~⋐~SubsetEqual~⊆~Succeeds~≻~SucceedsEqual~⪰~SucceedsSlantEqual~≽~SucceedsTilde~≿~SuchThat~∋~Sum~∑~Sup~⋑~Superset~⊃~SupersetEqual~⊇~Supset~⋑~TRADE~™~TSHcy~Ћ~TScy~Ц~Tab~\t~Tcaron~Ť~Tcedil~Ţ~Tcy~Т~Tfr~𝔗~Therefore~∴~ThickSpace~  ~ThinSpace~ ~Tilde~∼~TildeEqual~≃~TildeFullEqual~≅~TildeTilde~≈~Topf~𝕋~TripleDot~⃛~Tscr~𝒯~Tstrok~Ŧ~Uarr~↟~Uarrocir~⥉~Ubrcy~Ў~Ubreve~Ŭ~Ucy~У~Udblac~Ű~Ufr~𝔘~Umacr~Ū~UnderBar~_~UnderBrace~⏟~UnderBracket~⎵~UnderParenthesis~⏝~Union~⋃~UnionPlus~⊎~Uogon~Ų~Uopf~𝕌~UpArrow~↑~UpArrowBar~⤒~UpArrowDownArrow~⇅~UpDownArrow~↕~UpEquilibrium~⥮~UpTee~⊥~UpTeeArrow~↥~Uparrow~⇑~Updownarrow~⇕~UpperLeftArrow~↖~UpperRightArrow~↗~Upsi~ϒ~Uring~Ů~Uscr~𝒰~Utilde~Ũ~VDash~⊫~Vbar~⫫~Vcy~В~Vdash~⊩~Vdashl~⫦~Vee~⋁~Verbar~‖~Vert~‖~VerticalBar~∣~VerticalLine~|~VerticalSeparator~❘~VerticalTilde~≀~VeryThinSpace~ ~Vfr~𝔙~Vopf~𝕍~Vscr~𝒱~Vvdash~⊪~Wcirc~Ŵ~Wedge~⋀~Wfr~𝔚~Wopf~𝕎~Wscr~𝒲~Xfr~𝔛~Xopf~𝕏~Xscr~𝒳~YAcy~Я~YIcy~Ї~YUcy~Ю~Ycirc~Ŷ~Ycy~Ы~Yfr~𝔜~Yopf~𝕐~Yscr~𝒴~ZHcy~Ж~Zacute~Ź~Zcaron~Ž~Zcy~З~Zdot~Ż~ZeroWidthSpace~​~Zfr~ℨ~Zopf~ℤ~Zscr~𝒵~abreve~ă~ac~∾~acE~∾̳~acd~∿~acy~а~af~⁡~afr~𝔞~aleph~ℵ~amacr~ā~amalg~⨿~andand~⩕~andd~⩜~andslope~⩘~andv~⩚~ange~⦤~angle~∠~angmsd~∡~angmsdaa~⦨~angmsdab~⦩~angmsdac~⦪~angmsdad~⦫~angmsdae~⦬~angmsdaf~⦭~angmsdag~⦮~angmsdah~⦯~angrt~∟~angrtvb~⊾~angrtvbd~⦝~angsph~∢~angst~Å~angzarr~⍼~aogon~ą~aopf~𝕒~ap~≈~apE~⩰~apacir~⩯~ape~≊~apid~≋~approx~≈~approxeq~≊~ascr~𝒶~ast~*~asympeq~≍~awconint~∳~awint~⨑~bNot~⫭~backcong~≌~backepsilon~϶~backprime~‵~backsim~∽~backsimeq~⋍~barvee~⊽~barwed~⌅~barwedge~⌅~bbrk~⎵~bbrktbrk~⎶~bcong~≌~bcy~б~becaus~∵~because~∵~bemptyv~⦰~bepsi~϶~bernou~ℬ~beth~ℶ~between~≬~bfr~𝔟~bigcap~⋂~bigcirc~◯~bigcup~⋃~bigodot~⨀~bigoplus~⨁~bigotimes~⨂~bigsqcup~⨆~bigstar~★~bigtriangledown~▽~bigtriangleup~△~biguplus~⨄~bigvee~⋁~bigwedge~⋀~bkarow~⤍~blacklozenge~⧫~blacksquare~▪~blacktriangle~▴~blacktriangledown~▾~blacktriangleleft~◂~blacktriangleright~▸~blank~␣~blk12~▒~blk14~░~blk34~▓~block~█~bne~=⃥~bnequiv~≡⃥~bnot~⌐~bopf~𝕓~bot~⊥~bottom~⊥~bowtie~⋈~boxDL~╗~boxDR~╔~boxDl~╖~boxDr~╓~boxH~═~boxHD~╦~boxHU~╩~boxHd~╤~boxHu~╧~boxUL~╝~boxUR~╚~boxUl~╜~boxUr~╙~boxV~║~boxVH~╬~boxVL~╣~boxVR~╠~boxVh~╫~boxVl~╢~boxVr~╟~boxbox~⧉~boxdL~╕~boxdR~╒~boxdl~┐~boxdr~┌~boxh~─~boxhD~╥~boxhU~╨~boxhd~┬~boxhu~┴~boxminus~⊟~boxplus~⊞~boxtimes~⊠~boxuL~╛~boxuR~╘~boxul~┘~boxur~└~boxv~│~boxvH~╪~boxvL~╡~boxvR~╞~boxvh~┼~boxvl~┤~boxvr~├~bprime~‵~breve~˘~bscr~𝒷~bsemi~⁏~bsim~∽~bsime~⋍~bsol~\\~bsolb~⧅~bsolhsub~⟈~bullet~•~bump~≎~bumpE~⪮~bumpe~≏~bumpeq~≏~cacute~ć~capand~⩄~capbrcup~⩉~capcap~⩋~capcup~⩇~capdot~⩀~caps~∩︀~caret~⁁~caron~ˇ~ccaps~⩍~ccaron~č~ccirc~ĉ~ccups~⩌~ccupssm~⩐~cdot~ċ~cemptyv~⦲~centerdot~·~cfr~𝔠~chcy~ч~check~✓~checkmark~✓~cir~○~cirE~⧃~circeq~≗~circlearrowleft~↺~circlearrowright~↻~circledR~®~circledS~Ⓢ~circledast~⊛~circledcirc~⊚~circleddash~⊝~cire~≗~cirfnint~⨐~cirmid~⫯~cirscir~⧂~clubsuit~♣~colon~:~colone~≔~coloneq~≔~comma~,~commat~@~comp~∁~compfn~∘~complement~∁~complexes~ℂ~congdot~⩭~conint~∮~copf~𝕔~coprod~∐~copysr~℗~cross~✗~cscr~𝒸~csub~⫏~csube~⫑~csup~⫐~csupe~⫒~ctdot~⋯~cudarrl~⤸~cudarrr~⤵~cuepr~⋞~cuesc~⋟~cularr~↶~cularrp~⤽~cupbrcap~⩈~cupcap~⩆~cupcup~⩊~cupdot~⊍~cupor~⩅~cups~∪︀~curarr~↷~curarrm~⤼~curlyeqprec~⋞~curlyeqsucc~⋟~curlyvee~⋎~curlywedge~⋏~curvearrowleft~↶~curvearrowright~↷~cuvee~⋎~cuwed~⋏~cwconint~∲~cwint~∱~cylcty~⌭~dHar~⥥~daleth~ℸ~dash~‐~dashv~⊣~dbkarow~⤏~dblac~˝~dcaron~ď~dcy~д~dd~ⅆ~ddagger~‡~ddarr~⇊~ddotseq~⩷~demptyv~⦱~dfisht~⥿~dfr~𝔡~dharl~⇃~dharr~⇂~diam~⋄~diamond~⋄~diamondsuit~♦~die~¨~digamma~ϝ~disin~⋲~div~÷~divideontimes~⋇~divonx~⋇~djcy~ђ~dlcorn~⌞~dlcrop~⌍~dollar~$~dopf~𝕕~dot~˙~doteq~≐~doteqdot~≑~dotminus~∸~dotplus~∔~dotsquare~⊡~doublebarwedge~⌆~downarrow~↓~downdownarrows~⇊~downharpoonleft~⇃~downharpoonright~⇂~drbkarow~⤐~drcorn~⌟~drcrop~⌌~dscr~𝒹~dscy~ѕ~dsol~⧶~dstrok~đ~dtdot~⋱~dtri~▿~dtrif~▾~duarr~⇵~duhar~⥯~dwangle~⦦~dzcy~џ~dzigrarr~⟿~eDDot~⩷~eDot~≑~easter~⩮~ecaron~ě~ecir~≖~ecolon~≕~ecy~э~edot~ė~ee~ⅇ~efDot~≒~efr~𝔢~eg~⪚~egs~⪖~egsdot~⪘~el~⪙~elinters~⏧~ell~ℓ~els~⪕~elsdot~⪗~emacr~ē~emptyset~∅~emptyv~∅~emsp13~ ~emsp14~ ~eng~ŋ~eogon~ę~eopf~𝕖~epar~⋕~eparsl~⧣~eplus~⩱~epsi~ε~epsiv~ϵ~eqcirc~≖~eqcolon~≕~eqsim~≂~eqslantgtr~⪖~eqslantless~⪕~equals~=~equest~≟~equivDD~⩸~eqvparsl~⧥~erDot~≓~erarr~⥱~escr~ℯ~esdot~≐~esim~≂~excl~!~expectation~ℰ~exponentiale~ⅇ~fallingdotseq~≒~fcy~ф~female~♀~ffilig~ﬃ~fflig~ﬀ~ffllig~ﬄ~ffr~𝔣~filig~ﬁ~fjlig~fj~flat~♭~fllig~ﬂ~fltns~▱~fopf~𝕗~fork~⋔~forkv~⫙~fpartint~⨍~frac13~⅓~frac15~⅕~frac16~⅙~frac18~⅛~frac23~⅔~frac25~⅖~frac35~⅗~frac38~⅜~frac45~⅘~frac56~⅚~frac58~⅝~frac78~⅞~frown~⌢~fscr~𝒻~gE~≧~gEl~⪌~gacute~ǵ~gammad~ϝ~gap~⪆~gbreve~ğ~gcirc~ĝ~gcy~г~gdot~ġ~gel~⋛~geq~≥~geqq~≧~geqslant~⩾~ges~⩾~gescc~⪩~gesdot~⪀~gesdoto~⪂~gesdotol~⪄~gesl~⋛︀~gesles~⪔~gfr~𝔤~gg~≫~ggg~⋙~gimel~ℷ~gjcy~ѓ~gl~≷~glE~⪒~gla~⪥~glj~⪤~gnE~≩~gnap~⪊~gnapprox~⪊~gne~⪈~gneq~⪈~gneqq~≩~gnsim~⋧~gopf~𝕘~grave~`~gscr~ℊ~gsim~≳~gsime~⪎~gsiml~⪐~gtcc~⪧~gtcir~⩺~gtdot~⋗~gtlPar~⦕~gtquest~⩼~gtrapprox~⪆~gtrarr~⥸~gtrdot~⋗~gtreqless~⋛~gtreqqless~⪌~gtrless~≷~gtrsim~≳~gvertneqq~≩︀~gvnE~≩︀~hairsp~ ~half~½~hamilt~ℋ~hardcy~ъ~harrcir~⥈~harrw~↭~hbar~ℏ~hcirc~ĥ~heartsuit~♥~hercon~⊹~hfr~𝔥~hksearow~⤥~hkswarow~⤦~hoarr~⇿~homtht~∻~hookleftarrow~↩~hookrightarrow~↪~hopf~𝕙~horbar~―~hscr~𝒽~hslash~ℏ~hstrok~ħ~hybull~⁃~hyphen~‐~ic~⁣~icy~и~iecy~е~iff~⇔~ifr~𝔦~ii~ⅈ~iiiint~⨌~iiint~∭~iinfin~⧜~iiota~℩~ijlig~ĳ~imacr~ī~imagline~ℐ~imagpart~ℑ~imath~ı~imof~⊷~imped~Ƶ~in~∈~incare~℅~infintie~⧝~inodot~ı~intcal~⊺~integers~ℤ~intercal~⊺~intlarhk~⨗~intprod~⨼~iocy~ё~iogon~į~iopf~𝕚~iprod~⨼~iscr~𝒾~isinE~⋹~isindot~⋵~isins~⋴~isinsv~⋳~isinv~∈~it~⁢~itilde~ĩ~iukcy~і~jcirc~ĵ~jcy~й~jfr~𝔧~jmath~ȷ~jopf~𝕛~jscr~𝒿~jsercy~ј~jukcy~є~kappav~ϰ~kcedil~ķ~kcy~к~kfr~𝔨~kgreen~ĸ~khcy~х~kjcy~ќ~kopf~𝕜~kscr~𝓀~lAarr~⇚~lAtail~⤛~lBarr~⤎~lE~≦~lEg~⪋~lHar~⥢~lacute~ĺ~laemptyv~⦴~lagran~ℒ~langd~⦑~langle~⟨~lap~⪅~larrb~⇤~larrbfs~⤟~larrfs~⤝~larrhk~↩~larrlp~↫~larrpl~⤹~larrsim~⥳~larrtl~↢~lat~⪫~latail~⤙~late~⪭~lates~⪭︀~lbarr~⤌~lbbrk~❲~lbrace~{~lbrack~[~lbrke~⦋~lbrksld~⦏~lbrkslu~⦍~lcaron~ľ~lcedil~ļ~lcub~{~lcy~л~ldca~⤶~ldquor~„~ldrdhar~⥧~ldrushar~⥋~ldsh~↲~leftarrow~←~leftarrowtail~↢~leftharpoondown~↽~leftharpoonup~↼~leftleftarrows~⇇~leftrightarrow~↔~leftrightarrows~⇆~leftrightharpoons~⇋~leftrightsquigarrow~↭~leftthreetimes~⋋~leg~⋚~leq~≤~leqq~≦~leqslant~⩽~les~⩽~lescc~⪨~lesdot~⩿~lesdoto~⪁~lesdotor~⪃~lesg~⋚︀~lesges~⪓~lessapprox~⪅~lessdot~⋖~lesseqgtr~⋚~lesseqqgtr~⪋~lessgtr~≶~lesssim~≲~lfisht~⥼~lfr~𝔩~lg~≶~lgE~⪑~lhard~↽~lharu~↼~lharul~⥪~lhblk~▄~ljcy~љ~ll~≪~llarr~⇇~llcorner~⌞~llhard~⥫~lltri~◺~lmidot~ŀ~lmoust~⎰~lmoustache~⎰~lnE~≨~lnap~⪉~lnapprox~⪉~lne~⪇~lneq~⪇~lneqq~≨~lnsim~⋦~loang~⟬~loarr~⇽~lobrk~⟦~longleftarrow~⟵~longleftrightarrow~⟷~longmapsto~⟼~longrightarrow~⟶~looparrowleft~↫~looparrowright~↬~lopar~⦅~lopf~𝕝~loplus~⨭~lotimes~⨴~lowbar~_~lozenge~◊~lozf~⧫~lpar~(~lparlt~⦓~lrarr~⇆~lrcorner~⌟~lrhar~⇋~lrhard~⥭~lrtri~⊿~lscr~𝓁~lsh~↰~lsim~≲~lsime~⪍~lsimg~⪏~lsqb~[~lsquor~‚~lstrok~ł~ltcc~⪦~ltcir~⩹~ltdot~⋖~lthree~⋋~ltimes~⋉~ltlarr~⥶~ltquest~⩻~ltrPar~⦖~ltri~◃~ltrie~⊴~ltrif~◂~lurdshar~⥊~luruhar~⥦~lvertneqq~≨︀~lvnE~≨︀~mDDot~∺~male~♂~malt~✠~maltese~✠~map~↦~mapsto~↦~mapstodown~↧~mapstoleft~↤~mapstoup~↥~marker~▮~mcomma~⨩~mcy~м~measuredangle~∡~mfr~𝔪~mho~℧~mid~∣~midast~*~midcir~⫰~minusb~⊟~minusd~∸~minusdu~⨪~mlcp~⫛~mldr~…~mnplus~∓~models~⊧~mopf~𝕞~mp~∓~mscr~𝓂~mstpos~∾~multimap~⊸~mumap~⊸~nGg~⋙̸~nGt~≫⃒~nGtv~≫̸~nLeftarrow~⇍~nLeftrightarrow~⇎~nLl~⋘̸~nLt~≪⃒~nLtv~≪̸~nRightarrow~⇏~nVDash~⊯~nVdash~⊮~nacute~ń~nang~∠⃒~nap~≉~napE~⩰̸~napid~≋̸~napos~ŉ~napprox~≉~natur~♮~natural~♮~naturals~ℕ~nbump~≎̸~nbumpe~≏̸~ncap~⩃~ncaron~ň~ncedil~ņ~ncong~≇~ncongdot~⩭̸~ncup~⩂~ncy~н~neArr~⇗~nearhk~⤤~nearr~↗~nearrow~↗~nedot~≐̸~nequiv~≢~nesear~⤨~nesim~≂̸~nexist~∄~nexists~∄~nfr~𝔫~ngE~≧̸~nge~≱~ngeq~≱~ngeqq~≧̸~ngeqslant~⩾̸~nges~⩾̸~ngsim~≵~ngt~≯~ngtr~≯~nhArr~⇎~nharr~↮~nhpar~⫲~nis~⋼~nisd~⋺~niv~∋~njcy~њ~nlArr~⇍~nlE~≦̸~nlarr~↚~nldr~‥~nle~≰~nleftarrow~↚~nleftrightarrow~↮~nleq~≰~nleqq~≦̸~nleqslant~⩽̸~nles~⩽̸~nless~≮~nlsim~≴~nlt~≮~nltri~⋪~nltrie~⋬~nmid~∤~nopf~𝕟~notinE~⋹̸~notindot~⋵̸~notinva~∉~notinvb~⋷~notinvc~⋶~notni~∌~notniva~∌~notnivb~⋾~notnivc~⋽~npar~∦~nparallel~∦~nparsl~⫽⃥~npart~∂̸~npolint~⨔~npr~⊀~nprcue~⋠~npre~⪯̸~nprec~⊀~npreceq~⪯̸~nrArr~⇏~nrarr~↛~nrarrc~⤳̸~nrarrw~↝̸~nrightarrow~↛~nrtri~⋫~nrtrie~⋭~nsc~⊁~nsccue~⋡~nsce~⪰̸~nscr~𝓃~nshortmid~∤~nshortparallel~∦~nsim~≁~nsime~≄~nsimeq~≄~nsmid~∤~nspar~∦~nsqsube~⋢~nsqsupe~⋣~nsubE~⫅̸~nsube~⊈~nsubset~⊂⃒~nsubseteq~⊈~nsubseteqq~⫅̸~nsucc~⊁~nsucceq~⪰̸~nsup~⊅~nsupE~⫆̸~nsupe~⊉~nsupset~⊃⃒~nsupseteq~⊉~nsupseteqq~⫆̸~ntgl~≹~ntlg~≸~ntriangleleft~⋪~ntrianglelefteq~⋬~ntriangleright~⋫~ntrianglerighteq~⋭~num~#~numero~№~numsp~ ~nvDash~⊭~nvHarr~⤄~nvap~≍⃒~nvdash~⊬~nvge~≥⃒~nvgt~>⃒~nvinfin~⧞~nvlArr~⤂~nvle~≤⃒~nvlt~<⃒~nvltrie~⊴⃒~nvrArr~⤃~nvrtrie~⊵⃒~nvsim~∼⃒~nwArr~⇖~nwarhk~⤣~nwarr~↖~nwarrow~↖~nwnear~⤧~oS~Ⓢ~oast~⊛~ocir~⊚~ocy~о~odash~⊝~odblac~ő~odiv~⨸~odot~⊙~odsold~⦼~ofcir~⦿~ofr~𝔬~ogon~˛~ogt~⧁~ohbar~⦵~ohm~Ω~oint~∮~olarr~↺~olcir~⦾~olcross~⦻~olt~⧀~omacr~ō~omid~⦶~ominus~⊖~oopf~𝕠~opar~⦷~operp~⦹~orarr~↻~ord~⩝~order~ℴ~orderof~ℴ~origof~⊶~oror~⩖~orslope~⩗~orv~⩛~oscr~ℴ~osol~⊘~otimesas~⨶~ovbar~⌽~par~∥~parallel~∥~parsim~⫳~parsl~⫽~pcy~п~percnt~%~period~.~pertenk~‱~pfr~𝔭~phiv~ϕ~phmmat~ℳ~phone~☎~pitchfork~⋔~planck~ℏ~planckh~ℎ~plankv~ℏ~plus~+~plusacir~⨣~plusb~⊞~pluscir~⨢~plusdo~∔~plusdu~⨥~pluse~⩲~plussim~⨦~plustwo~⨧~pm~±~pointint~⨕~popf~𝕡~pr~≺~prE~⪳~prap~⪷~prcue~≼~pre~⪯~prec~≺~precapprox~⪷~preccurlyeq~≼~preceq~⪯~precnapprox~⪹~precneqq~⪵~precnsim~⋨~precsim~≾~primes~ℙ~prnE~⪵~prnap~⪹~prnsim~⋨~profalar~⌮~profline~⌒~profsurf~⌓~propto~∝~prsim~≾~prurel~⊰~pscr~𝓅~puncsp~ ~qfr~𝔮~qint~⨌~qopf~𝕢~qprime~⁗~qscr~𝓆~quaternions~ℍ~quatint~⨖~quest~?~questeq~≟~rAarr~⇛~rAtail~⤜~rBarr~⤏~rHar~⥤~race~∽̱~racute~ŕ~raemptyv~⦳~rangd~⦒~range~⦥~rangle~⟩~rarrap~⥵~rarrb~⇥~rarrbfs~⤠~rarrc~⤳~rarrfs~⤞~rarrhk~↪~rarrlp~↬~rarrpl~⥅~rarrsim~⥴~rarrtl~↣~rarrw~↝~ratail~⤚~ratio~∶~rationals~ℚ~rbarr~⤍~rbbrk~❳~rbrace~}~rbrack~]~rbrke~⦌~rbrksld~⦎~rbrkslu~⦐~rcaron~ř~rcedil~ŗ~rcub~}~rcy~р~rdca~⤷~rdldhar~⥩~rdquor~”~rdsh~↳~realine~ℛ~realpart~ℜ~reals~ℝ~rect~▭~rfisht~⥽~rfr~𝔯~rhard~⇁~rharu~⇀~rharul~⥬~rhov~ϱ~rightarrow~→~rightarrowtail~↣~rightharpoondown~⇁~rightharpoonup~⇀~rightleftarrows~⇄~rightleftharpoons~⇌~rightrightarrows~⇉~rightsquigarrow~↝~rightthreetimes~⋌~ring~˚~risingdotseq~≓~rlarr~⇄~rlhar~⇌~rmoust~⎱~rmoustache~⎱~rnmid~⫮~roang~⟭~roarr~⇾~robrk~⟧~ropar~⦆~ropf~𝕣~roplus~⨮~rotimes~⨵~rpar~)~rpargt~⦔~rppolint~⨒~rrarr~⇉~rscr~𝓇~rsh~↱~rsqb~]~rsquor~’~rthree~⋌~rtimes~⋊~rtri~▹~rtrie~⊵~rtrif~▸~rtriltri~⧎~ruluhar~⥨~rx~℞~sacute~ś~sc~≻~scE~⪴~scap~⪸~sccue~≽~sce~⪰~scedil~ş~scirc~ŝ~scnE~⪶~scnap~⪺~scnsim~⋩~scpolint~⨓~scsim~≿~scy~с~sdotb~⊡~sdote~⩦~seArr~⇘~searhk~⤥~searr~↘~searrow~↘~semi~;~seswar~⤩~setminus~∖~setmn~∖~sext~✶~sfr~𝔰~sfrown~⌢~sharp~♯~shchcy~щ~shcy~ш~shortmid~∣~shortparallel~∥~sigmav~ς~simdot~⩪~sime~≃~simeq~≃~simg~⪞~simgE~⪠~siml~⪝~simlE~⪟~simne~≆~simplus~⨤~simrarr~⥲~slarr~←~smallsetminus~∖~smashp~⨳~smeparsl~⧤~smid~∣~smile~⌣~smt~⪪~smte~⪬~smtes~⪬︀~softcy~ь~sol~/~solb~⧄~solbar~⌿~sopf~𝕤~spadesuit~♠~spar~∥~sqcap~⊓~sqcaps~⊓︀~sqcup~⊔~sqcups~⊔︀~sqsub~⊏~sqsube~⊑~sqsubset~⊏~sqsubseteq~⊑~sqsup~⊐~sqsupe~⊒~sqsupset~⊐~sqsupseteq~⊒~squ~□~square~□~squarf~▪~squf~▪~srarr~→~sscr~𝓈~ssetmn~∖~ssmile~⌣~sstarf~⋆~star~☆~starf~★~straightepsilon~ϵ~straightphi~ϕ~strns~¯~subE~⫅~subdot~⪽~subedot~⫃~submult~⫁~subnE~⫋~subne~⊊~subplus~⪿~subrarr~⥹~subset~⊂~subseteq~⊆~subseteqq~⫅~subsetneq~⊊~subsetneqq~⫋~subsim~⫇~subsub~⫕~subsup~⫓~succ~≻~succapprox~⪸~succcurlyeq~≽~succeq~⪰~succnapprox~⪺~succneqq~⪶~succnsim~⋩~succsim~≿~sung~♪~supE~⫆~supdot~⪾~supdsub~⫘~supedot~⫄~suphsol~⟉~suphsub~⫗~suplarr~⥻~supmult~⫂~supnE~⫌~supne~⊋~supplus~⫀~supset~⊃~supseteq~⊇~supseteqq~⫆~supsetneq~⊋~supsetneqq~⫌~supsim~⫈~supsub~⫔~supsup~⫖~swArr~⇙~swarhk~⤦~swarr~↙~swarrow~↙~swnwar~⤪~target~⌖~tbrk~⎴~tcaron~ť~tcedil~ţ~tcy~т~tdot~⃛~telrec~⌕~tfr~𝔱~therefore~∴~thetav~ϑ~thickapprox~≈~thicksim~∼~thkap~≈~thksim~∼~timesb~⊠~timesbar~⨱~timesd~⨰~tint~∭~toea~⤨~top~⊤~topbot~⌶~topcir~⫱~topf~𝕥~topfork~⫚~tosa~⤩~tprime~‴~triangle~▵~triangledown~▿~triangleleft~◃~trianglelefteq~⊴~triangleq~≜~triangleright~▹~trianglerighteq~⊵~tridot~◬~trie~≜~triminus~⨺~triplus~⨹~trisb~⧍~tritime~⨻~trpezium~⏢~tscr~𝓉~tscy~ц~tshcy~ћ~tstrok~ŧ~twixt~≬~twoheadleftarrow~↞~twoheadrightarrow~↠~uHar~⥣~ubrcy~ў~ubreve~ŭ~ucy~у~udarr~⇅~udblac~ű~udhar~⥮~ufisht~⥾~ufr~𝔲~uharl~↿~uharr~↾~uhblk~▀~ulcorn~⌜~ulcorner~⌜~ulcrop~⌏~ultri~◸~umacr~ū~uogon~ų~uopf~𝕦~uparrow~↑~updownarrow~↕~upharpoonleft~↿~upharpoonright~↾~uplus~⊎~upsi~υ~upuparrows~⇈~urcorn~⌝~urcorner~⌝~urcrop~⌎~uring~ů~urtri~◹~uscr~𝓊~utdot~⋰~utilde~ũ~utri~▵~utrif~▴~uuarr~⇈~uwangle~⦧~vArr~⇕~vBar~⫨~vBarv~⫩~vDash~⊨~vangrt~⦜~varepsilon~ϵ~varkappa~ϰ~varnothing~∅~varphi~ϕ~varpi~ϖ~varpropto~∝~varr~↕~varrho~ϱ~varsigma~ς~varsubsetneq~⊊︀~varsubsetneqq~⫋︀~varsupsetneq~⊋︀~varsupsetneqq~⫌︀~vartheta~ϑ~vartriangleleft~⊲~vartriangleright~⊳~vcy~в~vdash~⊢~vee~∨~veebar~⊻~veeeq~≚~vellip~⋮~verbar~|~vert~|~vfr~𝔳~vltri~⊲~vnsub~⊂⃒~vnsup~⊃⃒~vopf~𝕧~vprop~∝~vrtri~⊳~vscr~𝓋~vsubnE~⫋︀~vsubne~⊊︀~vsupnE~⫌︀~vsupne~⊋︀~vzigzag~⦚~wcirc~ŵ~wedbar~⩟~wedge~∧~wedgeq~≙~wfr~𝔴~wopf~𝕨~wp~℘~wr~≀~wreath~≀~wscr~𝓌~xcap~⋂~xcirc~◯~xcup~⋃~xdtri~▽~xfr~𝔵~xhArr~⟺~xharr~⟷~xlArr~⟸~xlarr~⟵~xmap~⟼~xnis~⋻~xodot~⨀~xopf~𝕩~xoplus~⨁~xotime~⨂~xrArr~⟹~xrarr~⟶~xscr~𝓍~xsqcup~⨆~xuplus~⨄~xutri~△~xvee~⋁~xwedge~⋀~yacy~я~ycirc~ŷ~ycy~ы~yfr~𝔶~yicy~ї~yopf~𝕪~yscr~𝓎~yucy~ю~zacute~ź~zcaron~ž~zcy~з~zdot~ż~zeetrf~ℨ~zfr~𝔷~zhcy~ж~zigrarr~⇝~zopf~𝕫~zscr~𝓏~~AMP~&~COPY~©~GT~>~LT~<~QUOT~\"~REG~®", namedReferences['html4']);

  var numericUnicodeMap = {
      0: 65533,
      128: 8364,
      130: 8218,
      131: 402,
      132: 8222,
      133: 8230,
      134: 8224,
      135: 8225,
      136: 710,
      137: 8240,
      138: 352,
      139: 8249,
      140: 338,
      142: 381,
      145: 8216,
      146: 8217,
      147: 8220,
      148: 8221,
      149: 8226,
      150: 8211,
      151: 8212,
      152: 732,
      153: 8482,
      154: 353,
      155: 8250,
      156: 339,
      158: 382,
      159: 376
  };

  var fromCodePoint = String.fromCodePoint ||
      function (astralCodePoint) {
          return String.fromCharCode(Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xd800, ((astralCodePoint - 0x10000) % 0x400) + 0xdc00);
      };

  var __assign = function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  var allNamedReferences = __assign(__assign({}, namedReferences), { all: namedReferences.html5 });
  var defaultDecodeOptions = {
      scope: 'body',
      level: 'all'
  };
  var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
  var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
  var baseDecodeRegExps = {
      xml: {
          strict: strict,
          attribute: attribute,
          body: bodyRegExps.xml
      },
      html4: {
          strict: strict,
          attribute: attribute,
          body: bodyRegExps.html4
      },
      html5: {
          strict: strict,
          attribute: attribute,
          body: bodyRegExps.html5
      }
  };
  var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
  var fromCharCode = String.fromCharCode;
  var outOfBoundsChar = fromCharCode(65533);
  function getDecodedEntity(entity, references, isAttribute, isStrict) {
      var decodeResult = entity;
      entity[entity.length - 1];
      {
          var decodeResultByReference = references[entity];
          if (decodeResultByReference) {
              decodeResult = decodeResultByReference;
          }
          else if (entity[0] === '&' && entity[1] === '#') {
              var decodeSecondChar = entity[2];
              var decodeCode = decodeSecondChar == 'x' || decodeSecondChar == 'X'
                  ? parseInt(entity.substr(3), 16)
                  : parseInt(entity.substr(2));
              decodeResult =
                  decodeCode >= 0x10ffff
                      ? outOfBoundsChar
                      : decodeCode > 65535
                          ? fromCodePoint(decodeCode)
                          : fromCharCode(numericUnicodeMap[decodeCode] || decodeCode);
          }
      }
      return decodeResult;
  }
  /** Decodes all entities in the text */
  function decode(text, _a) {
      var _b = defaultDecodeOptions , _c = _b.level, level = _c, _d = _b.scope, scope = _d;
      if (!text) {
          return '';
      }
      var decodeRegExp = decodeRegExps[level][scope];
      var references = allNamedReferences[level].entities;
      return text.replace(decodeRegExp, function (entity) { return getDecodedEntity(entity, references); });
  }

  const BreadcrumbComponent = React__namespace.forwardRef((_a, ref) => {
      var _b;
      var { className, crumbs = [], disableAllCrumbs: allCrumbsDisabled = false, includeSchema = true, invertColor = false } = _a, otherProps = __rest(_a, ["className", "crumbs", "disableAllCrumbs", "includeSchema", "invertColor"]);
      if (!crumbs || crumbs.length === 0) {
          return null;
      }
      const crumbClassNames = ["e2-breadcrumb__crumb", OverflowFrame.ITEM_CLASS_NAME];
      if (invertColor) {
          crumbClassNames.push("e2-breadcrumb__crumb--grey");
      }
      const crumbElements = crumbs.map((_a) => {
          var { disabled, label, url } = _a, otherProps = __rest(_a, ["disabled", "label", "url"]);
          return (allCrumbsDisabled || disabled)
              ? React__namespace.createElement("span", Object.assign({ className: crumbClassNames.join(" ") + " e2-breadcrumb__crumb--disabled" }, otherProps), decode(label))
              : React__namespace.createElement("a", Object.assign({ className: crumbClassNames.join(" "), href: url }, otherProps), decode(label));
      });
      const classNames = ["e2-breadcrumb"];
      if (className) {
          classNames.push(className);
      }
      const schema = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": crumbs.map((crumb, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": crumb.label,
              "item": crumb.url
          }))
      });
      return (React__namespace.createElement(React__namespace.Fragment, null,
          includeSchema && React__namespace.createElement("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: schema } }),
          React__namespace.createElement(OverflowFrame, { "data-cname": ((_b = otherProps["data-cname"]) !== null && _b !== void 0 ? _b : "breadcrumb") + "__overflow_frame" },
              React__namespace.createElement("nav", Object.assign({ ref: ref, className: classNames.join(" ") }, otherProps),
                  React__namespace.createElement("ol", null, crumbElements.map((el, index) => React__namespace.createElement("li", { key: index, className: "e2-breadcrumb__wrapper" }, el)))))));
  });
  const Breadcrumb = Object.assign(BreadcrumbComponent, {
      displayName: "Breadcrumb",
  });

  class MutableIntersectionObserver {
      constructor(callback, options) {
          Object.defineProperty(this, "_observer", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_callbacks", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: []
          });
          Object.defineProperty(this, "_root", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_rootMargin", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_thresholds", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_observedElements", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: []
          });
          const { root, rootMargin, threshold } = options;
          if (callback) {
              this._callbacks.push(callback);
          }
          this._root = root;
          this._rootMargin = rootMargin;
          if (Array.isArray(threshold)) {
              this._thresholds = threshold;
          }
          else if (Number.isFinite(threshold)) {
              this._thresholds = [threshold];
          }
          this.constructObserver();
      }
      reconstructObserver() {
          this.deconstructObserver();
          this.constructObserver();
      }
      deconstructObserver() {
          var _a, _b;
          for (const el of this._observedElements) {
              (_a = this._observer) === null || _a === void 0 ? void 0 : _a.unobserve(el);
          }
          (_b = this._observer) === null || _b === void 0 ? void 0 : _b.disconnect();
          this._observer = undefined;
      }
      constructObserver() {
          this._observer = new IntersectionObserver(entries => {
              for (const callback of this._callbacks) {
                  try {
                      callback(entries, this._observer);
                  }
                  catch (e) {
                      console.error(e);
                  }
              }
          }, {
              root: this.root,
              rootMargin: this.rootMargin,
              threshold: this.thresholds,
          });
          for (const el of this._observedElements) {
              this._observer.observe(el);
          }
      }
      addCallback(callback) {
          if (this._callbacks.indexOf(callback) < 0) {
              this._callbacks.push(callback);
          }
          return () => {
              const idx = this._callbacks.indexOf(callback);
              if (idx >= 0) {
                  this._callbacks.splice(idx, 1);
              }
          };
      }
      get root() {
          return this._root;
      }
      set root(obj) {
          if (this._root !== obj) {
              this._root = obj;
              this.reconstructObserver();
          }
      }
      get rootMargin() {
          return this._rootMargin;
      }
      set rootMargin(value) {
          if (this._rootMargin !== value) {
              this._rootMargin = value;
              this.reconstructObserver();
          }
      }
      get thresholds() {
          return this._thresholds;
      }
      set thresholds(value) {
          const betterValue = typeof value === "number" ? [value] : value;
          if (this._thresholds !== betterValue) {
              this._thresholds = betterValue;
              this.reconstructObserver();
          }
      }
      disconnect() {
          var _a;
          (_a = this._observer) === null || _a === void 0 ? void 0 : _a.disconnect();
          this._observedElements.splice(0, this._observedElements.length);
      }
      observe(target) {
          var _a;
          let idx = this.getObservedElementIndex(target);
          if (idx < 0) {
              (_a = this._observer) === null || _a === void 0 ? void 0 : _a.observe(target);
              this._observedElements.push(target);
          }
      }
      takeRecords() {
          var _a, _b;
          return (_b = (_a = this._observer) === null || _a === void 0 ? void 0 : _a.takeRecords()) !== null && _b !== void 0 ? _b : [];
      }
      unobserve(target) {
          var _a;
          (_a = this._observer) === null || _a === void 0 ? void 0 : _a.unobserve(target);
          let idx = this.getObservedElementIndex(target);
          if (idx >= 0) {
              this._observedElements.splice(idx, 1);
          }
      }
      getObservedElementIndex(target) {
          return this._observedElements.indexOf(target);
      }
  }

  const SLIDE_IDENTIFIER_ATTRIBUTE_NAME = "data-slide-id";
  const ItemsLayout = {
      EXACTLY_ONE_EVEN: "EXACTLY_ONE_EVEN",
      MAX_TWO_EVEN: "MAX_TWO_EVEN",
      MAX_FOUR: "MAX_FOUR",
      MAX_SIX: "MAX_SIX",
  };
  function buildTransitionRefCallback(callback) {
      let prev = null;
      return (curr) => {
          callback(curr, prev);
          prev = curr;
      };
  }
  function buildAutoIntersectionObservableRef(observer) {
      const callbackRef = buildTransitionRefCallback((curr, prev) => {
          if (prev) {
              observer.unobserve(prev);
          }
          if (curr) {
              observer.observe(curr);
          }
      });
      let current = undefined;
      const ref = function (curr) {
          callbackRef(curr);
          current = curr;
      };
      Object.defineProperty(ref, "current", {
          get: () => current,
          set: function (curr) {
              this(curr);
          },
      });
      return ref;
  }
  function scrollToLeft(element) {
      if (element) {
          const parent = element.parentElement;
          const left = element.offsetLeft - parent.offsetLeft;
          parent.scrollTo({ left });
      }
  }
  class CarouselStore {
      constructor(children) {
          Object.defineProperty(this, "_slides", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: []
          });
          Object.defineProperty(this, "_slideContent", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: []
          });
          Object.defineProperty(this, "_refs", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: []
          });
          Object.defineProperty(this, "observer", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          Object.defineProperty(this, "_scrollingContainer", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_lastAddedSlideIdentifier", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: -1
          });
          this.updateSlidesFromChildren(children);
          mobx.makeAutoObservable(this, {
              _slides: mobx.observable,
              _refs: false,
              _slideContent: false,
              _scrollingContainer: false,
              canScrollToPrev: false,
              canScrollToNext: false,
          });
      }
      scrollingContainer(element) {
          this._scrollingContainer = element;
          this.observer.root = element;
      }
      get slides() {
          return this._slides.map((slide, index) => Object.assign({}, slide, {
              content: this._slideContent[index],
              ref: this._refs[index]
          }));
      }
      setupObserver() {
          if (this.observer) {
              return;
          }
          this.observer = new MutableIntersectionObserver(mobx.action((entries) => {
              entries.forEach(entry => {
                  const identifier = entry.target.getAttribute(SLIDE_IDENTIFIER_ATTRIBUTE_NAME);
                  const slide = this._slides.find(slide => slide.identifier === identifier);
                  if (slide) {
                      slide.visible = entry.isIntersecting;
                  }
              });
          }), { threshold: 0.99 });
          this.observer.root = this._scrollingContainer;
      }
      updateSlidesFromChildren(children) {
          const elements = [];
          let looseNodes = undefined;
          const createElementForLooseNodes = () => {
              if (looseNodes) {
                  elements.push(React__namespace.createElement(React__namespace.Fragment, { key: elements.length }, looseNodes));
                  looseNodes = undefined;
              }
          };
          const childNodes = unwrapFragments(children);
          React__namespace.Children.forEach(childNodes, child => {
              if (isNotReactElement(child)) {
                  if (!looseNodes) {
                      looseNodes = [];
                  }
                  looseNodes.push(child);
              }
              else {
                  createElementForLooseNodes();
                  elements.push(child);
              }
          });
          createElementForLooseNodes();
          this.setupObserver();
          for (let index = elements.length; index < this._refs.length; index++) {
              this._refs[index].current = null;
          }
          this._refs.length = elements.length;
          for (let index = this._slides.length; index < elements.length; index++) {
              this._lastAddedSlideIdentifier = this._lastAddedSlideIdentifier + 1;
              this._slides[index] = {
                  visible: index == 0,
                  identifier: "slide" + this._lastAddedSlideIdentifier,
              };
              this._slideContent[index] = elements[index];
              this._refs[index] = buildAutoIntersectionObservableRef(this.observer);
          }
          this._slides.length = elements.length;
      }
      get visibleSlideCount() {
          return this._slides.filter(slide => slide.visible).length;
      }
      get canScrollToPrev() {
          let firstSlide = this._slides[0];
          if (!firstSlide) {
              return false;
          }
          return !firstSlide.visible;
      }
      scrollToPrev() {
          if (!this.canScrollToPrev) {
              return;
          }
          const firstVisibleIndex = this._slides.findIndex(slide => slide.visible);
          const scrollToIndex = Math.max(0, firstVisibleIndex - this.visibleSlideCount);
          const scrollToRef = this._refs[scrollToIndex];
          scrollToLeft(scrollToRef === null || scrollToRef === void 0 ? void 0 : scrollToRef.current);
      }
      get canScrollToNext() {
          let lastSlide = this._slides[this._slides.length - 1];
          if (!lastSlide) {
              return false;
          }
          return !lastSlide.visible;
      }
      scrollToNext() {
          if (!this.canScrollToNext) {
              return;
          }
          let sawVisibleSlide;
          let nextHiddenIndex;
          for (let i = 0; i < this._slides.length; i++) {
              const slide = this._slides[i];
              if (!sawVisibleSlide && slide.visible) {
                  sawVisibleSlide = true;
              }
              else if (sawVisibleSlide && !slide.visible) {
                  nextHiddenIndex = i;
                  break;
              }
          }
          const scrollToRef = this._refs[nextHiddenIndex];
          scrollToLeft(scrollToRef === null || scrollToRef === void 0 ? void 0 : scrollToRef.current);
      }
  }
  const CarouselComponent = mobxReact.observer(React__namespace.forwardRef((_a, forwardedRef) => {
      var { children, "data-cname": cname, itemsLayout = ItemsLayout.EXACTLY_ONE_EVEN, "test-id": testId } = _a, props = __rest(_a, ["children", "data-cname", "itemsLayout", "test-id"]);
      const [store] = React.useState(() => new CarouselStore(children));
      const slidesRef = React.useCallback((element) => store.scrollingContainer(element), []);
      React.useEffect(() => store.updateSlidesFromChildren(children), [children]);
      const slides = store.slides;
      if (slides.length <= 0) {
          return null;
      }
      const classNames = ["e2-carousel"];
      const { className: forwardedClassName } = props;
      if (itemsLayout === ItemsLayout.MAX_SIX) {
          classNames.push("e2-carousel--layout-max-six");
      }
      else if (itemsLayout === ItemsLayout.MAX_FOUR) {
          classNames.push("e2-carousel--layout-max-four");
      }
      else if (itemsLayout === ItemsLayout.MAX_TWO_EVEN) {
          classNames.push("e2-carousel--layout-max-two-even");
      }
      else if (itemsLayout === ItemsLayout.EXACTLY_ONE_EVEN) {
          classNames.push("e2-carousel--layout-exactly-one-even");
      }
      if (forwardedClassName) {
          classNames.push(forwardedClassName);
      }
      props.className = classNames.join(" ");
      if (cname && !testId) {
          testId = cname;
      }
      const leftTracking = {};
      const rightTracking = {};
      if (cname) {
          leftTracking["data-cname"] = cname + "__prev_arrow";
          rightTracking["data-cname"] = cname + "__next_arrow";
      }
      if (testId) {
          leftTracking["test-id"] = testId + "__prev_arrow";
          rightTracking["test-id"] = testId + "__next_arrow";
      }
      return React__namespace.createElement("div", Object.assign({ ref: forwardedRef, "data-cname": cname, "test-id": testId }, props),
          React__namespace.createElement("div", { ref: slidesRef, className: "e2-carousel__slides" }, slides.map(slide => React__namespace.createElement(CarouselSlideView, { key: slide.identifier, slide: slide }))),
          React__namespace.createElement("div", Object.assign({ className: "e2-carousel__left-arrow" + (store.canScrollToPrev ? " visible" : "") }, leftTracking, { onClick: () => store.scrollToPrev() }),
              React__namespace.createElement(MaterialIcon, { filename: "icon-arrow-left-20.svg" })),
          React__namespace.createElement("div", Object.assign({ className: "e2-carousel__right-arrow" + (store.canScrollToNext ? " visible" : "") }, rightTracking, { onClick: () => store.scrollToNext() }),
              React__namespace.createElement(MaterialIcon, { filename: "icon-arrow-right-20.svg" })));
  }));
  const CarouselSlideView = ({ slide }) => {
      return React__namespace.createElement("div", { ref: slide.ref, className: "e2-carousel__slide", [SLIDE_IDENTIFIER_ATTRIBUTE_NAME]: slide.identifier }, slide.content);
  };
  function isNotReactElement(obj) {
      return !React__namespace.isValidElement(obj);
  }
  const Carousel = Object.assign(CarouselComponent, {
      displayName: "Carousel",
      ItemsLayout,
  });

  const trackingPropNames = ["data-cname", "data-extra", "data-track-visible", "test-id", "test-extra"];
  function addSuffixToTrackingProps(trackingProps, suffix) {
      let propsWithSuffix = {};
      for (const key of Object.keys(trackingProps)) {
          if (trackingPropNames.includes(key)) {
              propsWithSuffix[key] = trackingProps[key] + suffix;
          }
      }
      return propsWithSuffix;
  }
  function mergeTrackingProps(defaultProps, ...otherProps) {
      return (otherProps !== null && otherProps !== void 0 ? otherProps : []).reduce((memo, curr) => {
          return Object.assign(memo, pickTrackingProps(curr));
      }, defaultProps);
  }
  function pickTrackingProps(props, defaultValueProvider) {
      let tracking = {};
      if (typeof defaultValueProvider === "object") {
          tracking = Object.assign({}, defaultValueProvider);
      }
      else if (typeof defaultValueProvider === "function") {
          try {
              tracking = defaultValueProvider();
          }
          catch (e) {
              console.error("defaultValueProvider failed", e);
          }
      }
      for (const key of Object.keys(props !== null && props !== void 0 ? props : {})) {
          if (trackingPropNames.includes(key)) {
              tracking[key] = props[key];
          }
      }
      if (!tracking["test-id"] && tracking["data-cname"]) {
          tracking["test-id"] = tracking["data-cname"];
      }
      if (!tracking["test-extra"] && tracking["data-extra"]) {
          tracking["test-extra"] = tracking["data-extra"];
      }
      return tracking;
  }
  function omitTrackingProps(props) {
      const rest = {};
      for (const key of Object.keys(props !== null && props !== void 0 ? props : {})) {
          if (!trackingPropNames.includes(key)) {
              rest[key] = props[key];
          }
      }
      return rest;
  }

  const Direction = {
      "row": "row",
      "row-reverse": "row-reverse",
      "column": "column",
      "column-reverse": "column-reverse",
  };
  const Component$c = React__namespace.forwardRef((_a, ref) => {
      var { as, direction = "row", children, className } = _a, otherProps = __rest(_a, ["as", "direction", "children", "className"]);
      const classNames = ["e2-flexbox", "e2-flexbox--" + direction];
      if (className) {
          classNames.push(className);
      }
      return React__namespace.createElement(as !== null && as !== void 0 ? as : "div", Object.assign({ ref, className: classNames.join(" ") }, otherProps), children);
  });
  const Flexbox = Object.assign(Component$c, {
      "displayName": "Flexbox",
      Direction,
  });

  const Variant$6 = {
      PRIMARY: "PRIMARY",
      SECONDARY: "SECONDARY",
      TERTIARY: "TERTIARY",
      TERTIARY_INVERTED: "TERTIARY_INVERTED",
      LINK: "LINK",
      PILL: "PILL",
  };
  const Wrap = {
      NO_WRAP: "NO_WRAP",
      WRAP: "WRAP",
  };
  const ButtonComponent = React__namespace.forwardRef((_a, ref) => {
      var { children, className, disabled = false, fillWidth = false, loading = false, marketingSize = false, onClick, tag = "button", type = "button" == tag.toLowerCase() ? "button" : undefined, variant = Variant$6.SECONDARY, wrap = Wrap.NO_WRAP } = _a, otherProps = __rest(_a, ["children", "className", "disabled", "fillWidth", "loading", "marketingSize", "onClick", "tag", "type", "variant", "wrap"]);
      const classNames = ["e2-button"];
      if (disabled) {
          classNames.push("e2-button--disabled");
      }
      if (variant === Variant$6.PRIMARY) {
          classNames.push("e2-button--primary");
      }
      else if (variant === Variant$6.SECONDARY) {
          classNames.push("e2-button--secondary");
      }
      else if (variant === Variant$6.TERTIARY) {
          classNames.push("e2-button--tertiary");
      }
      else if (variant === Variant$6.TERTIARY_INVERTED) {
          classNames.push("e2-button--tertiary-inverted");
      }
      else if (variant === Variant$6.LINK) {
          classNames.push("e2-button--link");
      }
      else if (variant === Variant$6.PILL) {
          classNames.push("e2-button--pill");
      }
      if (loading) {
          classNames.push("e2-button--loading");
      }
      if (marketingSize) {
          classNames.push("e2-button--marketing-size");
      }
      if (fillWidth) {
          classNames.push("e2-button--fill-width");
      }
      if (className) {
          classNames.push(className);
      }
      if (wrap === Wrap.WRAP) {
          classNames.push("e2-button--wrap");
      }
      return React__namespace.createElement(tag !== null && tag !== void 0 ? tag : "button", Object.assign({ ref, className: classNames.join(" "), disabled, onClick: (disabled || loading) ? null : onClick, type }, otherProps), React__namespace.createElement(React__namespace.Fragment, null,
          React__namespace.createElement(Flexbox, { className: "e2-button__content" }, children),
          React__namespace.createElement("div", { className: "e2-button__spinner" })));
  });
  const Button = Object.assign(ButtonComponent, {
      "displayName": "Button",
      Variant: Variant$6,
      Wrap,
  });

  const LayoutVariables = (() => {
      const screenFudge = -0.1;
      const screenDesktopMin = 1280;
      const screenTabletMax = screenDesktopMin + screenFudge;
      const screenTabletMin = 768;
      const screenMobileMax = screenTabletMin + screenFudge;
      const screenMobileMin = 320;
      return {
          screenDesktopMin,
          screenTabletMax,
          screenTabletMin,
          screenMobileMax,
          screenMobileMin,
      };
  })();
  const MediaQueries = (() => {
      const onDesktop = `(min-width: ${LayoutVariables.screenDesktopMin}px)`;
      const onTablet = `(min-width: ${LayoutVariables.screenTabletMin}px) and (max-width: ${LayoutVariables.screenTabletMax}px)`;
      const notOnTablet = `(max-width: ${LayoutVariables.screenMobileMax}px) or (min-width: ${LayoutVariables.screenDesktopMin}px)`;
      const onMobileAndTablet = `(max-width: ${LayoutVariables.screenTabletMax}px)`;
      const onMobile = `(max-width: ${LayoutVariables.screenMobileMax}px)`;
      const notOnMobile = `(min-width: ${LayoutVariables.screenTabletMin}px)`;
      return {
          onDesktop,
          notOnDesktop: onMobileAndTablet,
          onTablet,
          notOnTablet,
          onMobileAndTablet,
          onMobile,
          notOnMobile,
      };
  })();
  const DeviceType = {
      DESKTOP: "DESKTOP",
      TABLET: "TABLET",
      MOBILE: "MOBILE",
  };
  const ExpectedDeviceContext = Object.assign(React.createContext(DeviceType.MOBILE), {
      Type: DeviceType
  });
  const ExpectedScreenSizeContext = React.createContext(undefined);
  function useMatchMedia(query, sizeComparator, deviceComparator) {
      const matchMedia = React.useMemo(() => window.matchMedia(query), []);
      const [matches, setMatches] = React.useState(matchMedia.matches);
      React.useEffect(() => matchMedia.addEventListener("change", event => setMatches(event.matches)), []);
      return matches;
  }
  const LayoutHooks = {
      useOnDesktop: () => useMatchMedia(MediaQueries.onDesktop),
      useNotOnDesktop: () => useMatchMedia(MediaQueries.notOnDesktop),
      useOnTablet: () => useMatchMedia(MediaQueries.onTablet),
      useNotOnTablet: () => useMatchMedia(MediaQueries.notOnTablet),
      useOnMobileAndTablet: () => useMatchMedia(MediaQueries.onMobileAndTablet),
      useOnMobile: () => useMatchMedia(MediaQueries.onMobile),
      useNotOnMobile: () => useMatchMedia(MediaQueries.notOnMobile),
  };

  const Layout$1 = {
      HORIZONTAL: "HORIZONTAL",
      HORIZONTAL_IMAGE_RIGHT: "HORIZONTAL_IMAGE_RIGHT",
      VERTICAL: "VERTICAL"
  };
  const TagColor = {
      DEFAULT: "DEFAULT",
      GREEN: "GREEN"
  };
  const Tag$1 = {
      POPULAR: "POPULAR"
  };
  const TagColorCssMap = {
      DEFAULT: {
          cssClass: "e2-content-card__tag--gray"
      },
      GREEN: {
          cssClass: "e2-content-card__tag--green"
      }
  };
  const TagMap = {
      POPULAR: {
          label: "Popular",
          color: TagColor.GREEN
      }
  };
  const Component$b = React__namespace.forwardRef((_a, ref) => {
      var { button, dataCourseId, href, imageUrl, layout = Layout$1.VERTICAL, linkText, mobileLayout = layout, onClick, tag, tagLabel, tagColor = TagColor.DEFAULT, text, textMaxLines = 2, title, usePlayIcon = false } = _a, restWithTrackingProps = __rest(_a, ["button", "dataCourseId", "href", "imageUrl", "layout", "linkText", "mobileLayout", "onClick", "tag", "tagLabel", "tagColor", "text", "textMaxLines", "title", "usePlayIcon"]);
      const isMobile = LayoutHooks.useOnMobile();
      if (!href && !onClick) {
          console.warn("ContentCard is missing required field, one of: href, onClick");
      }
      if (!title) {
          console.warn("ContentCard is missing required field: title");
      }
      const classNames = ["e2-content-card"];
      if (imageUrl) {
          const layoutToUse = isMobile ? mobileLayout : layout;
          classNames.push("e2-content-card--" + layoutToUse.toLowerCase().replace(/_/g, "-") + "-layout");
      }
      else {
          classNames.push("e2-content-card--no-image-layout");
      }
      if (usePlayIcon) {
          classNames.push("e2-content-card-with-play-icon");
      }
      if (tag) {
          tagLabel = TagMap[tag].label;
          tagColor = TagMap[tag].color;
      }
      const rest = omitTrackingProps(restWithTrackingProps);
      const cardTrackingProps = pickTrackingProps(restWithTrackingProps);
      return (React__namespace.createElement("a", Object.assign({ ref: ref, onClick: onClick, className: classNames.join(" "), href: href !== null && href !== void 0 ? href : "javascript:void(0)", "data-course-id": dataCourseId, "data-virtual": dataCourseId }, rest, cardTrackingProps),
          imageUrl &&
              React__namespace.createElement("div", { className: "e2-content-card__image-container" },
                  usePlayIcon &&
                      React__namespace.createElement(MaterialIcon, { className: "e2-content-card__play-icon", filename: "icon-play-40.svg" }),
                  React__namespace.createElement("img", { src: imageUrl, className: "e2-content-card__image", alt: title })),
          React__namespace.createElement("div", { className: "e2-content-card__text-container" },
              tagLabel && React__namespace.createElement("div", { className: "e2-content-card__tag " + TagColorCssMap[tagColor].cssClass }, tagLabel),
              title && React__namespace.createElement("div", { className: "e2-content-card__title" }, title),
              text && React__namespace.createElement("div", { className: "e2-content-card__text", style: { WebkitLineClamp: textMaxLines } }, text),
              linkText && React__namespace.createElement("div", { className: "e2-content-card__link-text" }, linkText),
              button && React__namespace.createElement(Button, Object.assign({}, button)))));
  });
  const ContentCard = Object.assign(Component$b, {
      displayName: "ContentCard",
      Layout: Layout$1,
      Tag: Tag$1,
      TagColor: TagColor
  });

  const Component$a = React__namespace.forwardRef((_a, ref) => {
      var { course } = _a, otherProps = __rest(_a, ["course"]);
      return React__namespace.createElement(ContentCard, Object.assign({}, otherProps, { ref: ref, href: course.uri, imageUrl: course.imageUriLarge, title: course.title }));
  });
  const CourseCard = Object.assign(Component$a, {
      displayName: "CourseCard",
  });

  const Orientation = {
      HORIZONTAL: "HORIZONTAL",
      VERTICAL: "VERTICAL",
      SYMBOL_ONLY: "SYMBOL_ONLY",
  };
  const SymbolColor = {
      COLOR: "COLOR",
      DARK: "DARK",
      LIGHT: "LIGHT",
  };
  const WordmarkColor = {
      DARK: "DARK",
      LIGHT: "LIGHT",
  };
  function buildPath(orientation, symbolColor, wordmarkColor, withoutGutter) {
      let pathPrefix = "/images/logos/";
      if (withoutGutter) {
          pathPrefix += "without-gutter/";
      }
      if (orientation === Orientation.SYMBOL_ONLY) {
          if (symbolColor === SymbolColor.LIGHT) {
              return pathPrefix + "study-com_symbol_light.svg";
          }
          else if (symbolColor === SymbolColor.DARK) {
              return pathPrefix + "study-com_symbol_dark.svg";
          }
          else {
              return pathPrefix + "study-com_symbol_color.svg";
          }
      }
      else if (orientation === Orientation.VERTICAL) {
          if (symbolColor === SymbolColor.LIGHT) {
              return pathPrefix + "study-com_logo-vertical_all-light.svg";
          }
          else if (symbolColor === SymbolColor.DARK) {
              return pathPrefix + "study-com_logo-vertical_all-dark.svg";
          }
          else {
              if (wordmarkColor === WordmarkColor.LIGHT) {
                  return pathPrefix + "study-com_logo-vertical_text-light.svg";
              }
              else {
                  return pathPrefix + "study-com_logo-vertical_text-dark.svg";
              }
          }
      }
      else {
          if (symbolColor === SymbolColor.LIGHT) {
              return pathPrefix + "study-com_logo-horizontal_all-light.svg";
          }
          else if (symbolColor === SymbolColor.DARK) {
              return pathPrefix + "study-com_logo-horizontal_all-dark.svg";
          }
          else {
              if (wordmarkColor === WordmarkColor.LIGHT) {
                  return pathPrefix + "study-com_logo-horizontal_text-light.svg";
              }
              else {
                  return pathPrefix + "study-com_logo-horizontal_text-dark.svg";
              }
          }
      }
  }
  const StudyDotComLogoComponent = React__namespace.forwardRef((_a, ref) => {
      var _b;
      var { imageHost = "", withOrientation = Orientation.HORIZONTAL, withSymbolColor = SymbolColor.COLOR, withWordmarkColor = WordmarkColor.DARK, withoutGutter = false, className } = _a, imgProps = __rest(_a, ["imageHost", "withOrientation", "withSymbolColor", "withWordmarkColor", "withoutGutter", "className"]);
      const config = React.useContext(Configuration);
      const assetBaseUri = (_b = config.assetBaseUri) !== null && _b !== void 0 ? _b : "";
      const path = assetBaseUri + buildPath(withOrientation, withSymbolColor, withWordmarkColor, withoutGutter);
      const sanitizedImageHost = imageHost
          .replace(/\/+$/, "")
          .trim();
      const sanitizedPath = path
          .replace(/^\/+/, "")
          .trim();
      const src = sanitizedImageHost + "/" + sanitizedPath;
      const classNames = ["study-dot-com-logo"];
      if (withOrientation === Orientation.HORIZONTAL) {
          classNames.push("study-dot-com-logo--horizontal");
      }
      if (withOrientation === Orientation.VERTICAL) {
          classNames.push("study-dot-com-logo--vertical");
      }
      if (withoutGutter) {
          classNames.push("study-dot-com-logo--without-gutter");
      }
      if (className) {
          classNames.unshift(className);
      }
      return React__namespace.createElement("img", Object.assign({ ref: ref, src: src, alt: "Study.com", className: classNames.join(" ") }, imgProps));
  });
  const StudyDotComLogo = Object.assign(StudyDotComLogoComponent, {
      "displayName": "StudyDotComLogo",
      Orientation,
      SymbolColor,
      WordmarkColor,
  });

  function fillTrackingProps(props) {
      const { "data-cname": cname, "test-id": testId } = props;
      if (cname && !testId) {
          props["test-id"] = cname;
      }
  }
  const SUBDOMAIN = [
      "collegeprep",
      "graduateexams",
      "homework",
      "medical",
      "nursing",
      "realestate",
      "teachinglicense"
  ];
  const Variant$5 = {
      FULL: "FULL",
      MINIMAL: "MINIMAL",
      REG_FUNNEL: "REG_FUNNEL",
  };
  const VariantContext = React.createContext(Variant$5.FULL);
  const FooterComponent = (_a) => {
      var { baseUrl = "study.com", className, disclaimerHtml, sections = EUREKA_SECTIONS, variant = Variant$5.FULL, androidAppLink, iosAppLink } = _a, props = __rest(_a, ["baseUrl", "className", "disclaimerHtml", "sections", "variant", "androidAppLink", "iosAppLink"]);
      const classNames = ["e2-footer"];
      if (variant === Variant$5.MINIMAL) {
          classNames.push("e2-footer--minimal");
      }
      else if (variant === Variant$5.REG_FUNNEL) {
          classNames.push("e2-footer--reg-funnel");
      }
      if (className) {
          classNames.push(className);
      }
      let split = baseUrl.split(".");
      const index = split.findIndex(item => SUBDOMAIN.some(entry => entry === item));
      if (index > -1) {
          split.splice(index, 1);
      }
      const rootDomainBaseUrl = "https://" + split.join(".");
      return React__namespace.createElement(VariantContext.Provider, { value: variant },
          React__namespace.createElement("footer", Object.assign({ className: classNames.join(" "), "data-cname": "footer", "test-id": "footer" }, props),
              variant === Variant$5.FULL && React__namespace.createElement(React__namespace.Fragment, null,
                  React__namespace.createElement(CompanySection, null),
                  React__namespace.createElement(LinkSections, { sections: sections, rootDomainBaseUrl: rootDomainBaseUrl }),
                  React__namespace.createElement(AppSection, { androidAppLink: androidAppLink, iosAppLink: iosAppLink })),
              variant === Variant$5.MINIMAL && React__namespace.createElement(React__namespace.Fragment, null,
                  React__namespace.createElement(MinimalContentSection, { rootDomainBaseUrl: rootDomainBaseUrl })),
              variant === Variant$5.REG_FUNNEL && React__namespace.createElement(React__namespace.Fragment, null,
                  React__namespace.createElement(RegFunnelLinksSection, { rootDomainBaseUrl: rootDomainBaseUrl })),
              React__namespace.createElement(CopyrightSection, { disclaimerHtml: disclaimerHtml })));
  };
  const CompanySection = () => {
      const config = React.useContext(Configuration);
      const assetBaseUri = config.assetBaseUri;
      return React__namespace.createElement("div", { className: "e2-footer__company-section" },
          React__namespace.createElement(StudyDotComLogo, { withOrientation: StudyDotComLogo.Orientation.SYMBOL_ONLY, withoutGutter: true, className: "e2-footer__logo" }),
          React__namespace.createElement("div", null, "Study.com is an online platform offering affordable courses and study materials for K-12, college, and professional development. It enables flexible, self-paced learning."),
          React__namespace.createElement("a", { href: "https://www.bbb.org/us/ca/mountain-view/profile/online-education/studycom-1216-1000006412", target: "_blank", "data-external-link": "", title: "Study.com is a BBB Accredited Educational Consultant in Mountain View, CA", className: "e2-footer__bbb-link", "data-cname": "bbb_logo", "test-id": "bbb_logo" },
              React__namespace.createElement("img", { className: "e2-footer__bbb-image", src: `${assetBaseUri}/images/bbb/bbb.png`, loading: "lazy" })));
  };
  const LinkSections = ({ sections = [], rootDomainBaseUrl }) => {
      const isOnDesktop = LayoutHooks.useOnDesktop();
      sections === null || sections === void 0 ? void 0 : sections.forEach(({ headingLink, links }) => {
          fillTrackingProps(headingLink);
          links.forEach(fillTrackingProps);
      });
      if (isOnDesktop) {
          return React__namespace.createElement(React__namespace.Fragment, null, sections === null || sections === void 0 ? void 0 : sections.map(({ headingLink, links }) => React__namespace.createElement("div", { className: "e2-footer__link-section", key: headingLink.label },
              React__namespace.createElement(LinksHeader, Object.assign({}, headingLink)),
              React__namespace.createElement(LinksList, { links: links, rootDomainBaseUrl: rootDomainBaseUrl }))));
      }
      else {
          return React__namespace.createElement(Accordion, { variant: Accordion.Variant.MINOR, limitToOneOpenSection: true }, sections === null || sections === void 0 ? void 0 : sections.map(({ headingLink, links }) => {
              const heading = React__namespace.createElement(LinksHeader, Object.assign({}, headingLink));
              return React__namespace.createElement(Accordion.Section, { className: "e2-footer__link-section", "data-cname": "footer__section", heading: heading, key: headingLink.label },
                  React__namespace.createElement(LinksList, { links: links, rootDomainBaseUrl: rootDomainBaseUrl }));
          }));
      }
  };
  const LinksHeader = (_a) => {
      var { label } = _a, props = __rest(_a, ["label"]);
      return React__namespace.createElement("div", { className: "e2-footer__link-section-header" },
          React__namespace.createElement("a", Object.assign({}, props), label));
  };
  const LinksList = ({ links, rootDomainBaseUrl }) => React__namespace.createElement("ul", { className: "e2-footer__link-list" }, links.map((_a) => {
      var { label, href, externalLink } = _a, props = __rest(_a, ["label", "href", "externalLink"]);
      return React__namespace.createElement("li", { className: "e2-footer__link-list-item", key: label },
          React__namespace.createElement("a", Object.assign({}, props, { href: !href.startsWith("http") ? rootDomainBaseUrl + href : href, "data-external-link": externalLink ? "" : undefined }), label));
  }));
  const AppSection = ({ androidAppLink = "https://play.google.com/store/apps/details?id=com.study.app", iosAppLink = "https://apps.apple.com/us/app/study-com/id1128875336" }) => {
      const config = React.useContext(Configuration);
      const assetBaseUri = config.assetBaseUri;
      return React__namespace.createElement("div", { className: "e2-footer__apps-section" },
          React__namespace.createElement("div", { className: "e2-footer__mobile-apps" },
              React__namespace.createElement("div", { className: "e2-footer__mobile-apps-header" }, "Mobile Apps"),
              React__namespace.createElement("div", { className: "e2-footer__mobile-apps-buttons" },
                  React__namespace.createElement("a", { className: "e2-footer__mobile-app-button", href: androidAppLink, target: "_blank", rel: "noopener", "data-external-link": "", "data-cname": "footer_google_play_mobile_app_download", "test-id": "google_play_mobile_app_download" },
                      React__namespace.createElement("img", { className: "e2-footer__google-play-image", src: `${assetBaseUri}/images/mobile-app-stores/google.png`, alt: "Get it on Google Play", loading: "lazy" })),
                  React__namespace.createElement("a", { className: "e2-footer__mobile-app-button", href: iosAppLink, target: "_blank", rel: "noopener", "data-external-link": "", "data-cname": "footer_ios_mobile_app_download", "test-id": "ios_mobile_app_download" },
                      React__namespace.createElement("img", { className: "e2-footer__apple-store-image", src: `${assetBaseUri}/images/mobile-app-stores/apple.svg`, alt: "Get it on the App Store", loading: "lazy" })))));
  };
  const CopyrightSection = ({ disclaimerHtml }) => {
      const config = React.useContext(Configuration);
      const assetBaseUri = config.assetBaseUri;
      const currentYear = new Date().getFullYear();
      const variant = React.useContext(VariantContext);
      return React__namespace.createElement("div", { className: "e2-footer__copyright-section" },
          React__namespace.createElement("div", { className: "e2-footer__copyright-text" },
              disclaimerHtml && React__namespace.createElement("div", { className: "e2-footer__copyright-text-item", dangerouslySetInnerHTML: { __html: disclaimerHtml } }),
              variant !== Variant$5.REG_FUNNEL && React__namespace.createElement("div", { className: "e2-footer__copyright-text-item" }, "Contact us by phone at (877) 266-4919, or by mail at 100 View Street #202, Mountain View, CA 94041."),
              React__namespace.createElement("div", { className: "e2-footer__copyright-text-item" },
                  "\u00A9 Copyright ",
                  currentYear,
                  " Study.com. All other trademarks and copyrights are the property of their respective owners. All rights reserved.")),
          variant === Variant$5.FULL && React__namespace.createElement("div", { className: "e2-footer__social-media-buttons" },
              React__namespace.createElement("a", { className: "e2-footer__social-media-button", href: "https://www.facebook.com/StudyDotCom", "data-external-link": "", "data-cname": "bottom_facebook", "test-id": "bottom_facebook", title: "Study.com on Facebook" },
                  React__namespace.createElement("img", { src: `${assetBaseUri}/images/social-media/facebook.png`, loading: "lazy" })),
              React__namespace.createElement("a", { className: "e2-footer__social-media-button", href: "https://www.youtube.com/user/EducationPortalVideo/", "data-external-link": "", "data-cname": "bottom_youtube", "test-id": "bottom_youtube", title: "Study.com on Youtube" },
                  React__namespace.createElement("img", { src: `${assetBaseUri}/images/social-media/youtube.png`, loading: "lazy" })),
              React__namespace.createElement("a", { className: "e2-footer__social-media-button", href: "https://instagram.com/studydotcom", "data-external-link": "", "data-cname": "bottom_instagram", "test-id": "bottom_instagram", title: "Study.com on Instagram" },
                  React__namespace.createElement("img", { src: `${assetBaseUri}/images/social-media/instagram.svg`, loading: "lazy" })),
              React__namespace.createElement("a", { className: "e2-footer__social-media-button", href: "https://x.com/studydotcom", "data-external-link": "", "data-cname": "bottom_twitter", "test-id": "bottom_twitter", title: "Study.com on X" },
                  React__namespace.createElement("img", { src: `${assetBaseUri}/images/social-media/x.svg`, loading: "lazy" })),
              React__namespace.createElement("a", { className: "e2-footer__social-media-button", href: "https://www.linkedin.com/company/4825617", "data-external-link": "", "data-cname": "bottom_linkedin", "test-id": "bottom_linkedin", title: "Study.com on LinkedIn" },
                  React__namespace.createElement("img", { src: `${assetBaseUri}/images/social-media/linkedin.png`, loading: "lazy" }))));
  };
  const MinimalContentSection = ({ rootDomainBaseUrl }) => {
      const config = React.useContext(Configuration);
      const assetBaseUri = config.assetBaseUri;
      return React__namespace.createElement("div", { className: "e2-footer__minimal-content-section" },
          React__namespace.createElement(StudyDotComLogo, { withOrientation: StudyDotComLogo.Orientation.SYMBOL_ONLY, withoutGutter: true, className: "e2-footer__logo" }),
          React__namespace.createElement(MinimalLinksSection, { rootDomainBaseUrl: rootDomainBaseUrl }),
          React__namespace.createElement("a", { href: "https://www.bbb.org/us/ca/mountain-view/profile/online-education/studycom-1216-1000006412", target: "_blank", "data-external-link": "", title: "Study.com is a BBB Accredited Educational Consultant in Mountain View, CA", className: "e2-footer__bbb-link", "data-cname": "bbb_logo", "test-id": "bbb_logo" },
              React__namespace.createElement("img", { className: "e2-footer__bbb-image", src: `${assetBaseUri}/images/bbb/bbb.png`, loading: "lazy" })));
  };
  const MinimalLinksSection = ({ rootDomainBaseUrl }) => {
      return React__namespace.createElement("div", { className: "e2-footer__minimal-link-section" },
          React__namespace.createElement("a", { className: "e2-footer__minimal-link", href: rootDomainBaseUrl + "/academy/plans.html", "data-cname": "products", "test-id": "products" }, "Plans & Pricing"),
          React__namespace.createElement("a", { className: "e2-footer__minimal-link", href: rootDomainBaseUrl + "/contact/index.html", "data-cname": "support", "test-id": "support" }, "Contact Support"),
          React__namespace.createElement("a", { className: "e2-footer__minimal-link", href: rootDomainBaseUrl + "/pages/privacy_policy.html", "data-cname": "privacy_policy", "test-id": "privacy_policy" }, "Privacy Policy"),
          React__namespace.createElement("a", { className: "e2-footer__minimal-link", href: rootDomainBaseUrl + "/pages/terms_of_use.html", "data-cname": "terms_of_use", "test-id": "terms_of_use" }, "Terms of Use"),
          React__namespace.createElement("a", { className: "e2-footer__minimal-link", href: rootDomainBaseUrl + "/pages/ada.html", "data-cname": "ada", "test-id": "ada" }, "ADA Compliance"));
  };
  const RegFunnelLinksSection = ({ rootDomainBaseUrl }) => {
      return React__namespace.createElement("ul", { className: "e2-footer__link-section" },
          React__namespace.createElement("li", { className: "e2-footer__link-list-item" },
              React__namespace.createElement("a", { href: rootDomainBaseUrl + "/pages/privacy_policy.html", "data-cname": "privacy_policy", "test-id": "privacy_policy" }, "Privacy Policy")),
          React__namespace.createElement("li", { className: "e2-footer__link-list-item" },
              React__namespace.createElement("a", { href: rootDomainBaseUrl + "/pages/terms_of_use.html", "data-cname": "terms_of_use", "test-id": "terms_of_use" }, "Terms of Use")));
  };
  const CONTROL_PLANS_SECTION = {
      headingLink: { label: "Plans", href: "/academy/plans.html", "data-cname": "products" },
      links: [
          { label: "Study help", href: "/learn.html", "data-cname": "student_solutions" },
          { label: "Test prep", href: "/test-prep/index.html", "data-cname": "test_prep" },
          { label: "College credit", href: "/college/index.html", "data-cname": "college_credit" },
          { label: "Teacher resources", href: "/academy/plans/teacher.html", "data-cname": "teacher_solutions" },
          { label: "Working Scholars®", href: "/pages/working-scholars-overview.html", "data-cname": "working_scholars_solutions" },
          { label: "Online tutoring", href: "/tutoring.html", "data-cname": "online_tutoring" },
      ],
  };
  const CONTROL_ABOUT_US_SECTION = {
      headingLink: { label: "About us", href: "/pages/About_Us.html", "data-cname": "about_us" },
      links: [
          { label: "Blog", href: "/blog/index.html", "data-cname": "bottom_blog" },
          { label: "Careers", href: "/pages/Employment.html", "data-cname": "careers" },
          { label: "Teach for us", href: "/pages/Contractors.html", "data-cname": "teach_for_us" },
          { label: "Press Center", href: "/press.html", "data-cname": "press_center" },
          { label: "Ambassador", href: "/ambassador.html", "data-cname": "ambassador" },
          { label: "Scholarships", href: "/resources/student-scholarships", "data-cname": "student-scholarships" },
      ],
  };
  const CONTROL_SUPPORT_SECTION = {
      headingLink: { label: "Support", href: "/contact/index.html", "data-cname": "support" },
      links: [
          { label: "Contact support", href: "/contact/index.html", "data-cname": "contact_support" },
          { label: "FAQ", href: "https://support.study.com/", "data-cname": "faq", externalLink: true },
          { label: "Site feedback", href: "/contact/index.html", "data-cname": "site_feedback" },
          { label: "Expert Help", href: "https://homework.study.com/", "data-cname": "tutoring_help" },
          { label: "Resources and Guides", href: "/resources/index", "data-cname": "educational_resources" },
      ],
  };
  const CONTROL_SECTIONS = [CONTROL_PLANS_SECTION, CONTROL_ABOUT_US_SECTION, CONTROL_SUPPORT_SECTION];
  const EUREKA_PLANS_SECTION = {
      headingLink: { label: "Plans", href: "/academy/plans.html", "data-cname": "products" },
      links: [
          { label: "Study Help", href: "/learn.html", "data-cname": "student_solutions" },
          { label: "Test Preparation", href: "/test-prep/index.html", "data-cname": "test_prep" },
          { label: "College Credit", href: "/college/index.html", "data-cname": "college_credit" },
          { label: "Teacher Resources", href: "/academy/plans/teacher.html", "data-cname": "teacher_solutions" },
          { label: "Working Scholars®", href: "/pages/working-scholars-overview.html", "data-cname": "working_scholars_solutions" },
          { label: "Online Tutoring", href: "/tutoring.html", "data-cname": "online_tutoring" },
      ],
  };
  const EUREKA_ABOUT_US_SECTION = {
      headingLink: { label: "About us", href: "/pages/About_Us.html", "data-cname": "about_us" },
      links: [
          { label: "Blog", href: "/blog/index.html", "data-cname": "bottom_blog" },
          { label: "Careers", href: "/pages/Employment.html", "data-cname": "careers" },
          { label: "Teach for Us", href: "/pages/Contractors.html", "data-cname": "teach_for_us" },
          { label: "Press Center", href: "/press.html", "data-cname": "press_center" },
          { label: "Ambassador", href: "/ambassador.html", "data-cname": "ambassador" },
          { label: "Scholarships", href: "/resources/student-scholarships", "data-cname": "student-scholarships" },
      ],
  };
  const EUREKA_SUPPORT_SECTION = {
      headingLink: { label: "Support", href: "/contact/index.html", "data-cname": "support" },
      links: [
          { label: "FAQ", href: "https://support.study.com/", "data-cname": "faq", externalLink: true },
          { label: "Site Feedback", href: "/contact/index.html", "data-cname": "site_feedback" },
          { label: "Terms of Use", href: "/pages/terms_of_use.html", "data-cname": "terms_of_use" },
          { label: "Privacy Policy", href: "/pages/privacy_policy.html", "data-cname": "privacy_policy" },
          { label: "DMCA Notice", href: "/pages/dmca.html", "data-cname": "dmca" },
          { label: "ADA Compliance", href: "/pages/ada.html", "data-cname": "ada" },
          { label: "Honor Code for Students", href: "/pages/honor_code_for_students.html", "data-cname": "honor_code_for_students" },
          { label: "Resources and Guides", href: "/resources/index", "data-cname": "educational_resources" },
      ],
  };
  const EUREKA_SECTIONS = [EUREKA_PLANS_SECTION, EUREKA_ABOUT_US_SECTION, EUREKA_SUPPORT_SECTION];
  const Footer = Object.assign(FooterComponent, {
      displayName: "Footer",
      CONTROL_PLANS_SECTION,
      CONTROL_ABOUT_US_SECTION,
      CONTROL_SUPPORT_SECTION,
      CONTROL_SECTIONS,
      EUREKA_PLANS_SECTION,
      EUREKA_ABOUT_US_SECTION,
      EUREKA_SUPPORT_SECTION,
      EUREKA_SECTIONS,
      Variant: Variant$5,
  });

  const Component$9 = React__namespace.forwardRef((_a, ref) => {
      var _b;
      var { lesson } = _a, otherProps = __rest(_a, ["lesson"]);
      let imageUrl = lesson.videoPreviewImageUri;
      if (lesson.videoPreviewImageUri && !lesson.videoPreviewImageUri.startsWith("https://") && !lesson.videoPreviewImageUri.startsWith("/cimages/")) {
          imageUrl = "/cimages/videopreview/videopreview-small/" + lesson.videoPreviewImageUri;
      }
      const usePlayIcon = ((_b = lesson.type) === null || _b === void 0 ? void 0 : _b.toString()) === "LESSON";
      return React__namespace.createElement(ContentCard, Object.assign({}, otherProps, { ref: ref, dataCourseId: lesson.courseAcademyAssetId, href: lesson.uri, imageUrl: imageUrl, title: lesson.title, usePlayIcon: usePlayIcon }));
  });
  const LessonCard = Object.assign(Component$9, {
      displayName: "LessonCard",
  });

  const ModalContext = React.createContext({
      "data-cname": "e2_modal",
  });

  const Component$8 = React__namespace.forwardRef((_a, forwardedRef) => {
      var { children, className } = _a, propsWithTracking = __rest(_a, ["children", "className"]);
      const otherProps = omitTrackingProps(propsWithTracking);
      const modalContext = React__namespace.useContext(ModalContext);
      const inheritedTrackingProps = {
          "data-cname": modalContext["data-cname"],
          "test-id": modalContext["test-id"],
      };
      const trackingProps = addSuffixToTrackingProps(mergeTrackingProps(inheritedTrackingProps, pickTrackingProps(propsWithTracking)), "__content");
      const classes = ["e2-modal__content"];
      if (className) {
          classes.push(className);
      }
      return React__namespace.createElement("div", Object.assign({ className: classes.join(" "), ref: forwardedRef }, trackingProps, otherProps), children);
  });
  const ModalContent = Object.assign(Component$8, {
      "displayName": "Modal.Content",
  });

  const Component$7 = React__namespace.forwardRef((_a, forwardedRef) => {
      var { children, className } = _a, propsWithTracking = __rest(_a, ["children", "className"]);
      const otherProps = omitTrackingProps(propsWithTracking);
      const modalContext = React__namespace.useContext(ModalContext);
      const inheritedTrackingProps = {
          "data-cname": modalContext["data-cname"],
          "test-id": modalContext["test-id"],
      };
      const trackingProps = addSuffixToTrackingProps(mergeTrackingProps(inheritedTrackingProps, pickTrackingProps(propsWithTracking)), "__footer");
      const classes = ["e2-modal__footer"];
      if (className) {
          classes.push(className);
      }
      return React__namespace.createElement("div", Object.assign({ className: classes.join(" "), ref: forwardedRef }, trackingProps, otherProps), children);
  });
  const ModalFooter = Object.assign(Component$7, {
      "displayName": "Modal.Footer",
  });

  const Component$6 = React__namespace.forwardRef((_a, forwardedRef) => {
      var { children, className } = _a, propsWithTracking = __rest(_a, ["children", "className"]);
      const otherProps = omitTrackingProps(propsWithTracking);
      const modalContext = React__namespace.useContext(ModalContext);
      const inheritedTrackingProps = {
          "data-cname": modalContext["data-cname"],
          "test-id": modalContext["test-id"],
      };
      const trackingProps = addSuffixToTrackingProps(mergeTrackingProps(inheritedTrackingProps, pickTrackingProps(propsWithTracking)), "__header");
      const classes = ["e2-modal__header"];
      if (className) {
          classes.push(className);
      }
      return React__namespace.createElement("div", Object.assign({ className: classes.join(" "), ref: forwardedRef }, trackingProps, otherProps), children);
  });
  const ModalHeader = Object.assign(Component$6, {
      "displayName": "Modal.Header",
  });

  const Alignment = {
      TOP: "TOP",
      CENTER: "CENTER",
  };
  const Variant$4 = {
      BASIC: "BASIC",
      CENTERED: "CENTERED",
      SIDEBAR: "SIDEBAR",
  };
  const CLICKED_ON_MODAL_BODY_EVENT_KEY = "studyClickedOnModalBody";
  const ModalComponent = React__namespace.forwardRef((_a, forwardedRef) => {
      var { alignment = Alignment.CENTER, children, className, closeOnBackdropClick = true, closeButtonTrackingProps, fullscreen, imageAlt, imageUrl, isOpen, onClose, variant = Variant$4.BASIC } = _a, propsWithTracking = __rest(_a, ["alignment", "children", "className", "closeOnBackdropClick", "closeButtonTrackingProps", "fullscreen", "imageAlt", "imageUrl", "isOpen", "onClose", "variant"]);
      const internalRef = React__namespace.useRef(null);
      const [shouldFade, setShouldFade] = React__namespace.useState(false);
      const [prevIsOpen, setPrevIsOpen] = React__namespace.useState(isOpen);
      const ref = useCombinedRef$1(internalRef, forwardedRef);
      const otherProps = omitTrackingProps(propsWithTracking);
      const trackingProps = pickTrackingProps(propsWithTracking);
      const closeTrackingProps = mergeTrackingProps(addSuffixToTrackingProps(trackingProps, "__close"), closeButtonTrackingProps);
      React.useEffect(() => {
          if (!internalRef.current) {
              return;
          }
          setPrevIsOpen(isOpen);
          const closeModal = () => {
              internalRef.current.close();
          };
          if (isOpen) {
              internalRef.current.showModal();
              setTimeout(() => setShouldFade(true));
          }
          else if (!isOpen && prevIsOpen) {
              setShouldFade(false);
              internalRef.current.addEventListener("transitionend", closeModal, { once: true });
          }
          return () => {
              var _a;
              (_a = internalRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener("transitionend", closeModal);
          };
      }, [isOpen]);
      const isOnMobile = LayoutHooks.useOnMobile();
      const isFullscreen = fullscreen === true || (isOnMobile && fullscreen !== false);
      const dialogClassNames = ["e2-modal"];
      if (isFullscreen) {
          dialogClassNames.push("e2-modal--fullscreen");
      }
      else if (alignment === Alignment.TOP) {
          dialogClassNames.push("e2-modal--align-top");
      }
      if (variant === Variant$4.BASIC) {
          dialogClassNames.push("e2-modal--basic");
      }
      else if (variant === Variant$4.CENTERED) {
          dialogClassNames.push("e2-modal--centered");
      }
      else if (variant === Variant$4.SIDEBAR) {
          dialogClassNames.push("e2-modal--sidebar");
      }
      if (shouldFade) {
          dialogClassNames.push("e2-modal--fade-in");
      }
      if (className) {
          dialogClassNames.push(className);
      }
      if (variant === Variant$4.BASIC && imageUrl) {
          console.warn("Using imageUrl in BASIC variant is probably an error.");
      }
      if (variant === Variant$4.SIDEBAR && !imageUrl) {
          console.warn("Using SIDEBAR variant without imageUrl is probably an error.");
      }
      if (imageUrl && imageAlt === undefined) {
          console.warn("Using imageUrl with an undefined imageAlt is probably an error. "
              + "If intentional, please pass imageAlt as a descriptive string or null if intentionally blank for decorative images.");
      }
      const renderableChildren = React__namespace.Children.toArray(children);
      const headers = renderableChildren
          .filter(c => getReactElementType(c) === ModalHeader);
      if (headers.length !== 1) {
          console.warn("Every modal should have exactly one <Modal.Header> child.");
      }
      const header = headers[0];
      const contents = renderableChildren
          .filter(c => getReactElementType(c) === ModalContent);
      if (contents.length !== 1) {
          console.warn("Every modal should have exactly one <Modal.Content> child.");
      }
      const content = contents[0];
      const footers = renderableChildren
          .filter(c => getReactElementType(c) === ModalFooter);
      if (footers.length > 1) {
          console.warn("Every modal should have at most one <Modal.Content> child.");
      }
      const footer = footers[0];
      return (React__namespace.createElement(ModalContext.Provider, { value: trackingProps },
          React__namespace.createElement("dialog", Object.assign({ className: dialogClassNames.join(" "), onClick: event => {
                  if (closeOnBackdropClick && !event[CLICKED_ON_MODAL_BODY_EVENT_KEY]) {
                      onClose();
                  }
              }, onClose: onClose, ref: ref }, trackingProps, otherProps),
              React__namespace.createElement("div", { className: "e2-modal__body", onClick: event => event[CLICKED_ON_MODAL_BODY_EVENT_KEY] = true },
                  React__namespace.createElement("button", Object.assign({ type: "button", className: "e2-modal__close", onClick: onClose }, closeTrackingProps),
                      React__namespace.createElement(MaterialIcon, { filename: "icon-close-24.svg" })),
                  imageUrl && React__namespace.createElement("img", { className: "e2-modal__image", src: imageUrl, alt: imageAlt }),
                  header,
                  content,
                  footer))));
  });
  const Modal = Object.assign(ModalComponent, {
      "displayName": "Modal",
      Content: ModalContent,
      Header: ModalHeader,
      Footer: ModalFooter,
      Alignment,
      Variant: Variant$4,
  });

  const Pagination = (_a) => {
      var { currentPage, totalPages, onPageChange, className = "", 'data-cname': dataCname, 'test-id': testId } = _a; __rest(_a, ["currentPage", "totalPages", "onPageChange", "className", 'data-cname', 'test-id']);
      const isMobile = LayoutHooks.useOnMobile();
      if (totalPages <= 1) {
          return null;
      }
      const renderPageNumbers = () => {
          const pages = [];
          const maxVisible = isMobile ? 3 : 5;
          if (totalPages <= maxVisible) {
              for (let i = 1; i <= totalPages; i++) {
                  const classes = ['e2-pagination__btn'];
                  if (i === currentPage) {
                      classes.push('e2-pagination__btn--active');
                  }
                  pages.push(React.createElement("button", { type: "button", key: i, onClick: () => onPageChange(i), className: classes.join(' '), "data-cname": `${dataCname}_page_number`, "data-extra": "index_" + i, "test-id": testId ? `${testId}_${i}` : undefined }, i));
              }
          }
          else {
              let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
              let endPage = Math.min(totalPages, startPage + maxVisible - 1);
              if (endPage - startPage < maxVisible - 1) {
                  startPage = Math.max(1, endPage - maxVisible + 1);
              }
              for (let i = startPage; i <= endPage; i++) {
                  const classes = ['e2-pagination__btn'];
                  if (i === currentPage) {
                      classes.push('e2-pagination__btn--active');
                  }
                  pages.push(React.createElement("button", { type: "button", key: i, onClick: () => onPageChange(i), className: classes.join(' '), "data-cname": `${dataCname}_page_number`, "data-extra": "index_" + i, "test-id": testId ? `${testId}_${i}` : undefined }, i));
              }
          }
          return pages;
      };
      const containerClasses = ['e2-pagination'];
      if (className) {
          containerClasses.push(className);
      }
      return (React.createElement("div", { className: containerClasses.join(' '), "data-cname": dataCname },
          React.createElement("button", { type: "button", onClick: () => onPageChange(Math.max(1, currentPage - 1)), disabled: currentPage === 1, className: "e2-pagination__btn e2-pagination__btn--nav e2-pagination__btn--prev", "data-cname": `${dataCname}_prev`, "test-id": testId ? `${testId}_prev` : undefined },
              React.createElement("div", { className: "e2-pagination__icon" })),
          renderPageNumbers(),
          React.createElement("button", { type: "button", onClick: () => onPageChange(Math.min(totalPages, currentPage + 1)), disabled: currentPage === totalPages, className: "e2-pagination__btn e2-pagination__btn--nav e2-pagination__btn--next", "data-cname": `${dataCname}_next`, "test-id": testId ? `${testId}_next` : undefined },
              React.createElement("div", { className: "e2-pagination__icon" }))));
  };

  function useStudyImperativeHandle(initialValue = undefined) {
      const [value, setValue] = React.useState(initialValue);
      const ref = React__namespace.useRef(value);
      const proxy = React.useMemo(() => {
          return new Proxy(ref, {
              get: (target, key) => {
                  var _a;
                  if (key === "current") {
                      return target === null || target === void 0 ? void 0 : target.current;
                  }
                  const current = (_a = target === null || target === void 0 ? void 0 : target.current) !== null && _a !== void 0 ? _a : {};
                  if (Object.keys(current !== null && current !== void 0 ? current : {}).some(k => k == key)) {
                      return current[key];
                  }
                  return target[key];
              },
              set: (target, key, newValue) => {
                  var _a;
                  if (key === "current") {
                      ref.current = newValue;
                      setValue(newValue);
                      return true;
                  }
                  else {
                      const current = (_a = target === null || target === void 0 ? void 0 : target.current) !== null && _a !== void 0 ? _a : {};
                      current[key] = newValue;
                      return true;
                  }
              },
          });
      }, []);
      return proxy;
  }

  function useCombinedRef(...refs) {
      return React.useCallback((current) => {
          for (const ref of refs) {
              if (typeof ref === "function") {
                  ref(current);
              }
              else if (ref) {
                  ref.current = current;
              }
          }
      }, [...refs]);
  }

  function useEventBindingRef(eventMap, deps, capture = false) {
      const previousHandlersRef = React.useRef({});
      return React.useCallback((el) => {
          if (!el) {
              return;
          }
          const previousHandlers = previousHandlersRef.current;
          for (const event in eventMap) {
              if (previousHandlers[event]) {
                  el.removeEventListener(event, previousHandlers[event], capture);
                  delete previousHandlers[event];
              }
              const handler = eventMap[event];
              el.addEventListener(event, handler, capture);
              previousHandlers[event] = handler;
          }
      }, deps);
  }

  const Variant$3 = {
      BLOCK: "BLOCK",
      TEXT: "TEXT",
      CIRCLE: "CIRCLE",
  };
  const Component$5 = React__namespace.forwardRef((_a, forwardedRef) => {
      var { children, className, ref: propsRef, variant } = _a, otherProps = __rest(_a, ["children", "className", "ref", "variant"]);
      let ref = useCombinedRef(propsRef, forwardedRef);
      if (!variant) {
          variant = children ? Variant$3.TEXT : Variant$3.BLOCK;
      }
      const classNames = ["e2-skeleton"];
      if (variant == Variant$3.BLOCK) {
          classNames.push("e2-skeleton--block");
      }
      else if (variant == Variant$3.TEXT) {
          classNames.push("e2-skeleton--text");
      }
      else if (variant == Variant$3.CIRCLE) {
          classNames.push("e2-skeleton--circle");
      }
      if (className) {
          classNames.push(className);
      }
      return React__namespace.createElement("div", Object.assign({ ref: ref, className: classNames.join(" ") }, otherProps), variant == Variant$3.TEXT ? children : null);
  });
  const Skeleton = Object.assign(Component$5, {
      displayName: "Skeleton",
      Variant: Variant$3,
  });

  class StepsState {
      constructor(props) {
          Object.defineProperty(this, "isControlled", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: false
          });
          Object.defineProperty(this, "activeStep", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "initialActiveStep", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "steps", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: []
          });
          this.initialActiveStep = props.activeStep;
          this.isControlled = typeof props.activeStep !== "undefined";
          mobx.makeAutoObservable(this);
      }
      registerStep(id, index) {
          let step = this.steps.find(s => s.id === id);
          if (!step) {
              step = new StepState(this, id, index);
              this.steps.push(step);
          }
          else {
              step.index = index;
          }
          if (step.id === this.initialActiveStep || this.steps.length === this.initialActiveStep) {
              this.activeStep = step;
          }
          return step;
      }
      setActiveStep(step) {
          if (typeof step === 'string') {
              this.activeStep = this.stepsById[step];
          }
          else if (typeof step === 'number') {
              this.activeStep = this.orderedSteps[step];
          }
          else {
              this.activeStep = step;
          }
      }
      get stepsById() {
          let ret = {};
          this.steps.forEach((step) => ret[step.id] = step);
          return ret;
      }
      get orderedSteps() {
          return this.steps.slice().sort((a, b) => a.index - b.index);
      }
  }
  class StepState {
      constructor(parent, id, index) {
          Object.defineProperty(this, "id", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "index", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "parent", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          this.parent = parent;
          this.id = id;
          this.index = index;
          mobx.makeAutoObservable(this);
      }
      get status() {
          var _a;
          if (this.parent.activeStep === this) {
              return "active";
          }
          else if (((_a = this.parent.activeStep) === null || _a === void 0 ? void 0 : _a.index) < this.index) {
              return "inactive";
          }
          else {
              return "complete";
          }
      }
  }
  const StepsContext = React.createContext(null);
  const StepStatus = {
      COMPLETE: "complete",
      ACTIVE: "active",
      INACTIVE: "inactive"
  };
  const StepsLayout = {
      HORIZONTAL: "horizontal",
      VERTICAL: "vertical"
  };
  const StepsComponent = (props) => {
      let { layout, children, activeStep } = props;
      layout = layout || StepsLayout.HORIZONTAL;
      const [state] = React.useState(() => new StepsState(props));
      const idChildren = React.useMemo(() => {
          let genId = 0;
          return React__namespace.Children.map(children, (step, idx) => {
              let element = step;
              if (!step.props.id) {
                  element = React.cloneElement(step, { id: String(genId++) });
              }
              state.registerStep(element.props.id, idx);
              return element;
          });
      }, [children]);
      React.useEffect(() => state.setActiveStep(activeStep), [activeStep]);
      return React__namespace.createElement(StepsContext.Provider, { value: state },
          React__namespace.createElement("ol", { className: `e2-steps e2-steps--${layout}` }, idChildren));
  };
  const StepComponent = mobxReact.observer((props) => {
      let { status, heading, description, indicator } = props;
      const parent = React.useContext(StepsContext);
      if (!parent) {
          throw new Error("Steps.Step must be used within a Steps component");
      }
      const [state, setState] = React.useState(() => parent.stepsById[props.id]);
      React.useEffect(() => {
          setState(parent.stepsById[props.id]);
      }, [props.id]);
      let classes = [`e2-step`];
      if (!status) {
          status = parent.isControlled ? state.status : "inactive";
      }
      classes.push(`e2-step--${status}`);
      let indicatorObj = { "data-indicator": indicator !== null && indicator !== void 0 ? indicator : state.index + 1 };
      return React__namespace.createElement("li", { className: classes.join(" ") },
          React__namespace.createElement("div", { className: "e2-step__indicator" },
              React__namespace.createElement("div", Object.assign({ className: "e2-step__circle" }, indicatorObj)),
              React__namespace.createElement("div", { className: "e2-step__rule" })),
          React__namespace.createElement("div", { className: "e2-step__body" },
              heading && React__namespace.createElement("span", { className: "e2-step__heading" }, heading),
              description && React__namespace.createElement("span", { className: "e2-step__description" }, description)));
  });
  const Steps = Object.assign(StepsComponent, {
      displayName: "Steps",
      Layout: StepsLayout,
      Step: Object.assign(StepComponent, {
          displayName: "Steps.Step",
          Status: StepStatus
      }),
  });

  const FilterPill = mobxReact.observer(React.forwardRef((_a, ref) => {
      var { children, selected = false, disabled = false, selectMultiple = false, onClick, className = '', 'data-cname': dataCname, 'test-id': testId } = _a, trackingProps = __rest(_a, ["children", "selected", "disabled", "selectMultiple", "onClick", "className", 'data-cname', 'test-id']);
      const handleClick = () => {
          if (!disabled && onClick) {
              onClick();
          }
      };
      const handleKeyDown = (event) => {
          if (!disabled && onClick && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault();
              onClick();
          }
      };
      const classes = [
          'e2-filter-pill',
          selected && 'e2-filter-pill--selected',
          disabled && 'e2-filter-pill--disabled',
          !selectMultiple && 'e2-filter-pill--no-icons',
          className
      ].filter(Boolean).join(' ');
      const iconType = selected ? 'check' : disabled ? 'plus-disabled' : 'add';
      return (React.createElement("button", Object.assign({ ref: ref, type: "button", className: classes, onClick: handleClick, onKeyDown: handleKeyDown, disabled: disabled, "data-cname": dataCname, "test-id": testId }, trackingProps),
          React.createElement("span", { className: "e2-filter-pill__content" },
              React.createElement("span", { className: "e2-filter-pill__label" }, children),
              selectMultiple && (React.createElement("span", { className: `e2-filter-pill__icon e2-filter-pill__icon--${iconType}` })))));
  }));
  FilterPill.displayName = "FilterPill";

  const FilterPills = (_a) => {
      var { options, allowMultipleSelection = false, defaultSelected = [], selected, onSelectionChange, className = '', 'data-cname': dataCname, 'test-id': testId } = _a, trackingProps = __rest(_a, ["options", "allowMultipleSelection", "defaultSelected", "selected", "onSelectionChange", "className", 'data-cname', 'test-id']);
      const [internalSelected, setInternalSelected] = React.useState(defaultSelected);
      const selectedIds = selected !== undefined ? selected : internalSelected;
      const handleSelectionChange = React.useCallback((newSelected) => {
          if (selected === undefined) {
              setInternalSelected(newSelected);
          }
          onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(newSelected);
      }, [selected, onSelectionChange]);
      const handlePillClick = React.useCallback((optionId) => {
          let newSelected;
          if (allowMultipleSelection) {
              if (selectedIds.includes(optionId)) {
                  newSelected = selectedIds.filter(id => id !== optionId);
              }
              else {
                  newSelected = [...selectedIds, optionId];
              }
          }
          else {
              if (selectedIds.includes(optionId)) {
                  newSelected = [];
              }
              else {
                  newSelected = [optionId];
              }
          }
          handleSelectionChange(newSelected);
      }, [allowMultipleSelection, selectedIds, handleSelectionChange]);
      const containerClasses = [
          'e2-filter-pills',
          className
      ].filter(Boolean).join(' ');
      return (React.createElement("div", Object.assign({ className: containerClasses, "data-cname": dataCname, "test-id": testId }, trackingProps), options.map((option) => (React.createElement(FilterPill, Object.assign({ key: option.id, selected: selectedIds.includes(option.id), disabled: option.disabled, selectMultiple: allowMultipleSelection, onClick: () => handlePillClick(option.id), "data-cname": `${dataCname}-${option.id}` }, option.pillProps), option.label)))));
  };

  const ScoreStyle = {
      STUDY: "STUDY",
      TRUSTPILOT: "TRUSTPILOT",
  };
  const Layout = {
      CARD: "CARD",
      INLINE: "INLINE",
  };
  const Component$4 = React__namespace.forwardRef((_a, ref) => {
      var { "data-cname": cname = "testimonial_card", "test-id": testId = cname, accomplishment, authorDescription, authorImageSize = Avatar.Size.MEDIUM, authorImageUrl, authorName, body, header, hideAuthorImage = false, layout = Layout.CARD, score, scoreStyle = ScoreStyle.STUDY, truncateTestimonial = false } = _a, otherProps = __rest(_a, ["data-cname", "test-id", "accomplishment", "authorDescription", "authorImageSize", "authorImageUrl", "authorName", "body", "header", "hideAuthorImage", "layout", "score", "scoreStyle", "truncateTestimonial"]);
      const [isTextClamped, setIsTextClamped] = React.useState(false);
      const [isModalOpen, setIsModalOpen] = React.useState(false);
      if (score != null && (score <= 0 || score > 5)) {
          console.warn("Testimonial score is out of range: ", score);
          score = null;
      }
      const bodyClasses = ["e2-testimonial__body"];
      if (truncateTestimonial) {
          bodyClasses.push("e2-testimonial__body--truncate");
      }
      const resizeCallback = React.useCallback((entry) => {
          if (entry && truncateTestimonial) {
              setIsTextClamped(entry.target.scrollHeight > entry.target.clientHeight);
          }
          else if (isTextClamped) {
              setIsTextClamped(false);
          }
      }, [truncateTestimonial, body]);
      let resizeCallbackRef = useResizeObserverCallback(resizeCallback);
      if (!truncateTestimonial) {
          if (isTextClamped) {
              setIsTextClamped(false);
          }
          resizeCallbackRef = null;
      }
      return (React__namespace.createElement(React__namespace.Fragment, null,
          React__namespace.createElement("div", Object.assign({ className: `e2-testimonial ${layout == Layout.INLINE ? "e2-testimonial--inline" : "e2-testimonial--card"}`, "test-id": testId, ref: ref }, otherProps),
              header && React__namespace.createElement("div", { className: "e2-testimonial__header" }, header),
              score != null && React__namespace.createElement(TestimonialScoreContent, { score: score, scoreStyle: scoreStyle }),
              React__namespace.createElement("div", { className: "e2-testimonial__body-container" },
                  React__namespace.createElement("div", { className: bodyClasses.join(" "), ref: resizeCallbackRef, dangerouslySetInnerHTML: { __html: body } }),
                  isTextClamped && (React__namespace.createElement("a", { className: "e2-testimonial__read-more", "data-cname": `${cname}_read_more`, "test-id": `${testId}_read_more`, onClick: () => setIsModalOpen(true) }, "Read more"))),
              (authorName || accomplishment) && React__namespace.createElement(TestimonialAuthorContent, { accomplishment: accomplishment, authorName: authorName, authorDescription: authorDescription, authorImageSize: authorImageSize, authorImageUrl: authorImageUrl, hideAvatar: hideAuthorImage })),
          React__namespace.createElement(Modal, { isOpen: isModalOpen, "data-cname": `${cname}_modal_container`, "test-id": `${testId}_modal_container`, onClose: () => setIsModalOpen(false) },
              React__namespace.createElement(Modal.Content, { "data-cname": `${cname}_modal`, "test-id": `${testId}_modal` },
                  React__namespace.createElement("div", { className: "e2-testimonial" },
                      header && React__namespace.createElement("div", { className: "e2-testimonial__header" }, header),
                      score != null && React__namespace.createElement(TestimonialScoreContent, { score: score, scoreStyle: scoreStyle }),
                      React__namespace.createElement("div", { className: "e2-testimonial__body" }, body),
                      (authorName || accomplishment) && React__namespace.createElement(TestimonialAuthorContent, { accomplishment: accomplishment, authorName: authorName, authorDescription: authorDescription, authorImageSize: authorImageSize, authorImageUrl: authorImageUrl, hideAvatar: hideAuthorImage }))))));
  });
  const TestimonialScoreContent = ({ score, scoreStyle }) => {
      const config = React.useContext(Configuration);
      const assetBaseUri = config.assetBaseUri;
      return (React__namespace.createElement("div", { className: "e2-testimonial__star-score" },
          Array.from({ length: 5 }, (_, i) => {
              const fillPercentage = (() => {
                  if (i < Math.floor(score)) {
                      return 100;
                  }
                  else if (i === Math.floor(score)) {
                      return (score - Math.floor(score)) * 100;
                  }
                  else {
                      return 0;
                  }
              })();
              return (React__namespace.createElement("div", { key: `testimonial-star-${i}`, className: `e2-testimonial__star ${scoreStyle === ScoreStyle.TRUSTPILOT ? 'trustpilot' : 'default'}`, style: { "--star-fill-percentage": `${fillPercentage}%` } }, scoreStyle === ScoreStyle.TRUSTPILOT && (React__namespace.createElement("img", { src: `${assetBaseUri}/icons/material/icon-trustpilot-24.svg`, alt: "Star" }))));
          }),
          React__namespace.createElement("div", { className: "e2-testimonial__score" }, score)));
  };
  const TestimonialAuthorContent = ({ accomplishment, authorDescription, authorImageSize, authorImageUrl, authorName, hideAvatar }) => {
      return (React__namespace.createElement("div", { className: "e2-testimonial__footer" },
          authorName &&
              React__namespace.createElement(Avatar, { size: authorImageSize, imageUrl: authorImageUrl, name: authorName, description: authorDescription, variant: hideAvatar ? Avatar.Variant.TEXT_ONLY : Avatar.Variant.FULL }),
          accomplishment &&
              React__namespace.createElement("div", { className: "e2-testimonial__accomplishment" },
                  React__namespace.createElement("div", { className: "e2-testimonial__accomplishment-icon" },
                      React__namespace.createElement(MaterialIcon, { filename: "icon-check-circle-filled-20.svg" })),
                  React__namespace.createElement("span", { className: "e2-testimonial__accomplishment-text" }, accomplishment))));
  };
  function useResizeObserverCallback(callback) {
      const observerRef = React.useRef();
      const currentElementRef = React.useRef();
      const callbackRef = React.useRef();
      const observedElementRef = React.useCallback((element) => {
          var _a, _b;
          if (callbackRef.current != callback) {
              callbackRef.current = callback;
          }
          if (!element) {
              (_a = observerRef.current) === null || _a === void 0 ? void 0 : _a.disconnect();
              currentElementRef.current = null;
              return;
          }
          if (observerRef.current == null) {
              observerRef.current = new ResizeObserver((entries) => {
                  requestAnimationFrame(() => {
                      callbackRef === null || callbackRef === void 0 ? void 0 : callbackRef.current(entries[0]);
                  });
              });
          }
          if (currentElementRef.current != element) {
              (_b = observerRef.current) === null || _b === void 0 ? void 0 : _b.disconnect();
              observerRef.current.observe(element);
              currentElementRef.current = element;
          }
      }, [callback]);
      return observedElementRef;
  }
  const Testimonial = Object.assign(Component$4, {
      displayName: "Testimonial",
      ScoreStyle: ScoreStyle,
      Layout: Layout,
  });

  const Component$3 = React__namespace.forwardRef((_a, ref) => {
      var { "data-cname": cname = "study_testimonial_card", "test-id": testId = cname, accomplishmentOverride, authorImageSize = Avatar.Size.MEDIUM, header, hideAuthorImage = false, layout, score, testimonial, truncateTestimonial = false } = _a, otherProps = __rest(_a, ["data-cname", "test-id", "accomplishmentOverride", "authorImageSize", "header", "hideAuthorImage", "layout", "score", "testimonial", "truncateTestimonial"]);
      if (!testimonial) {
          throw new Error("StudyTestimonial is missing required field: testimonial");
      }
      const imageUrl = (() => {
          if (testimonial.imageFilename
              && !testimonial.imageFilename.startsWith("https://")
              && !testimonial.imageFilename.startsWith("/cimages/")) {
              return "/cimages/testimonials/" + testimonial.imageFilename;
          }
          else {
              return testimonial.imageFilename;
          }
      })();
      const accomplishment = (accomplishmentOverride === null || accomplishmentOverride === void 0 ? void 0 : accomplishmentOverride.length) > 0 ? accomplishmentOverride : testimonial.accomplishment;
      const caption = [testimonial.userType, testimonial.location].filter(a => a === null || a === void 0 ? void 0 : a.trim()).join(", ");
      return (React__namespace.createElement(Testimonial, Object.assign({ "data-cname": cname, "test-id": testId, "data-testimonial-id": testimonial.id, ref: ref, accomplishment: accomplishment, authorDescription: caption, authorImageSize: authorImageSize, authorImageUrl: imageUrl, authorName: testimonial.authorName, body: testimonial.body, header: header, hideAuthorImage: hideAuthorImage, layout: layout, score: score, scoreStyle: Testimonial.ScoreStyle.STUDY, truncateTestimonial: truncateTestimonial }, otherProps)));
  });
  const StudyTestimonial = Object.assign(Component$3, {
      displayName: "StudyTestimonial",
  });

  function getIdentifier(tabItem) {
      return isTabAnchorItem(tabItem) ? tabItem.identifier : tabItem.href;
  }
  function isTabAnchorItem(tabItem) {
      return tabItem && "identifier" in tabItem;
  }
  function isTabLinkItem(tabItem) {
      return tabItem && "href" in tabItem;
  }
  const Variant$2 = {
      LEVEL_1: "LEVEL_1",
      LEVEL_2: "LEVEL_2",
      PILLS: "PILLS",
  };
  const TabsComponent = React__namespace.forwardRef((_a, ref) => {
      var { commands, className, "data-cname": cname, defaultSelectedItem, disabled: allTabsDisabled = false, isCentered = false, items = [], variant = Variant$2.LEVEL_1, onChange, "test-id": testId } = _a, otherProps = __rest(_a, ["commands", "className", "data-cname", "defaultSelectedItem", "disabled", "isCentered", "items", "variant", "onChange", "test-id"]);
      if (!defaultSelectedItem) {
          defaultSelectedItem =
              items.filter(isTabAnchorItem).filter(item => !item.disabled)[0]
                  || items.filter(isTabAnchorItem)[0];
      }
      const [selectedItem, setSelectedItem] = React.useState(defaultSelectedItem);
      const tabItemRefsByIdentifier = React.useMemo(() => ({}), []);
      React.useImperativeHandle(commands, () => ({
          setSelectedItemWithoutChangeHandler: item => {
              setSelectedItem(item);
          },
          getElementRef: item => {
              const identifier = getIdentifier(item);
              return tabItemRefsByIdentifier[identifier];
          },
          scrollItemIntoView: item => {
              const identifier = getIdentifier(item);
              const ref = tabItemRefsByIdentifier[identifier];
              const element = ref === null || ref === void 0 ? void 0 : ref.current;
              let inline = "center";
              if (item == items[0]) {
                  inline = "start";
              }
              else if (item == items[items.length - 1]) {
                  inline = "end";
              }
              element === null || element === void 0 ? void 0 : element.scrollIntoView({ inline, block: "nearest", behavior: "smooth" });
          },
      }), [commands, tabItemRefsByIdentifier, items]);
      if (!Array.isArray(items) || items.length <= 1) {
          return null;
      }
      const classNames = ["e2-tabs"];
      if (variant === Variant$2.LEVEL_1) {
          classNames.push("e2-tabs--level-1");
      }
      else if (variant === Variant$2.LEVEL_2) {
          classNames.push("e2-tabs--level-2");
      }
      else if (variant === Variant$2.PILLS) {
          classNames.push("e2-tabs--pills");
      }
      if (isCentered) {
          classNames.push("e2-tabs--centered");
      }
      if (className) {
          classNames.push(className);
      }
      const itemElements = items.map(item => {
          const identifier = getIdentifier(item);
          const classNames = ["e2-tabs__item", OverflowFrame.ITEM_CLASS_NAME];
          if (isTabAnchorItem(selectedItem) && isTabAnchorItem(item) && (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.identifier) === item.identifier) {
              classNames.push("e2-tabs__item--selected");
          }
          if (isTabLinkItem(selectedItem) && isTabLinkItem(item) && (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.href) === item.href) {
              classNames.push("e2-tabs__item--selected");
          }
          const itemDisabled = allTabsDisabled || item.disabled;
          let onClick = event => {
              if (isTabAnchorItem(item)) {
                  setSelectedItem(item);
                  onChange === null || onChange === void 0 ? void 0 : onChange(item, selectedItem, event);
              }
              else {
                  onChange === null || onChange === void 0 ? void 0 : onChange(item, null, event);
              }
          };
          if (itemDisabled) {
              classNames.push("e2-tabs__item--disabled");
              onClick = null;
          }
          const trackingProps = {
              "data-cname": item["data-cname"],
              "data-extra": item["data-extra"],
              "test-id": item["test-id"],
              "test-extra": item["test-extra"],
          };
          if (!trackingProps["data-cname"]) {
              trackingProps["data-cname"] = cname + "__item";
              if (!trackingProps["data-extra"]) {
                  trackingProps["data-extra"] = identifier;
              }
          }
          if (!trackingProps["test-id"]) {
              trackingProps["test-id"] = trackingProps["data-cname"];
              if (!trackingProps["test-extra"]) {
                  trackingProps["test-extra"] = identifier;
              }
          }
          if (!tabItemRefsByIdentifier[identifier]) {
              tabItemRefsByIdentifier[identifier] = React.createRef();
          }
          return React__namespace.createElement("a", Object.assign({ ref: tabItemRefsByIdentifier[identifier], key: identifier, className: classNames.join(" "), onClick: onClick, href: isTabLinkItem(item) && !itemDisabled ? item.href : undefined }, trackingProps), item.label);
      });
      return React__namespace.createElement(OverflowFrame, { "data-cname": cname + "__overflow-frame" },
          React__namespace.createElement("div", Object.assign({ ref: ref, className: classNames.join(" "), "data-cname": cname, "test-id": testId !== null && testId !== void 0 ? testId : cname }, otherProps), itemElements));
  });
  const Tabs = Object.assign(TabsComponent, {
      "displayName": "Tabs",
      Variant: Variant$2,
      isTabAnchorItem,
      isTabLinkItem,
  });
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || '').toLowerCase();
    }
    // Mocked nodes in testing environments may not be instances of Node. By
    // returning `#document` an infinite loop won't occur.
    // https://github.com/floating-ui/floating-ui/issues/2317
    return '#document';
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle$1(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
  }
  function isTableElement(element) {
    return ['table', 'td', 'th'].includes(getNodeName(element));
  }
  function isTopLayer(element) {
    return [':popover-open', ':modal'].some(selector => {
      try {
        return element.matches(selector);
      } catch (e) {
        return false;
      }
    });
  }
  function isContainingBlock(elementOrCss) {
    const webkit = isWebKit();
    const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    // https://drafts.csswg.org/css-transforms-2/#individual-transforms
    return ['transform', 'translate', 'scale', 'rotate', 'perspective'].some(value => css[value] ? css[value] !== 'none' : false) || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
  }
  function isLastTraversableNode(node) {
    return ['html', 'body', '#document'].includes(getNodeName(node));
  }
  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.scrollX,
      scrollTop: element.scrollY
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === 'html') {
      return node;
    }
    const result =
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot ||
    // DOM Element detected.
    node.parentNode ||
    // ShadowRoot detected.
    isShadowRoot(node) && node.host ||
    // Fallback.
    getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      const frameElement = getFrameElement(win);
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }

  /**
   * Custom positioning reference element.
   * @see https://floating-ui.com/docs/virtual-elements
   */

  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const createCoords = v => ({
    x: v,
    y: v
  });
  const oppositeSideMap = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  const oppositeAlignmentMap = {
    start: 'end',
    end: 'start'
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === 'function' ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split('-')[0];
  }
  function getAlignment(placement) {
    return placement.split('-')[1];
  }
  function getOppositeAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }
  function getAxisLength(axis) {
    return axis === 'y' ? 'height' : 'width';
  }
  function getSideAxis(placement) {
    return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
  }
  function getSideList(side, isStart, rtl) {
    const lr = ['left', 'right'];
    const rl = ['right', 'left'];
    const tb = ['top', 'bottom'];
    const bt = ['bottom', 'top'];
    switch (side) {
      case 'top':
      case 'bottom':
        if (rtl) return isStart ? rl : lr;
        return isStart ? lr : rl;
      case 'left':
      case 'right':
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === 'start', rtl);
    if (alignment) {
      list = list.map(side => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
  }
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    const {
      x,
      y,
      width,
      height
    } = rect;
    return {
      width,
      height,
      top: y,
      left: x,
      right: x + width,
      bottom: y + height,
      x,
      y
    };
  }

  /*!
  * tabbable 6.2.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  */
  // NOTE: separate `:not()` selectors has broader browser support than the newer
  //  `:not([inert], [inert] *)` (Feb 2023)
  // CAREFUL: JSDom does not support `:not([inert] *)` as a selector; using it causes
  //  the entire query to fail, resulting in no nodes found, which will break a lot
  //  of things... so we have to rely on JS to identify nodes inside an inert container
  var candidateSelectors = ['input:not([inert])', 'select:not([inert])', 'textarea:not([inert])', 'a[href]:not([inert])', 'button:not([inert])', '[tabindex]:not(slot):not([inert])', 'audio[controls]:not([inert])', 'video[controls]:not([inert])', '[contenteditable]:not([contenteditable="false"]):not([inert])', 'details>summary:first-of-type:not([inert])', 'details:not([inert])'];
  var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
  var NoElement = typeof Element === 'undefined';
  var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
    var _element$getRootNode;
    return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
  } : function (element) {
    return element === null || element === void 0 ? void 0 : element.ownerDocument;
  };

  /**
   * Determines if a node is inert or in an inert ancestor.
   * @param {Element} [node]
   * @param {boolean} [lookUp] If true and `node` is not inert, looks up at ancestors to
   *  see if any of them are inert. If false, only `node` itself is considered.
   * @returns {boolean} True if inert itself or by way of being in an inert ancestor.
   *  False if `node` is falsy.
   */
  var isInert = function isInert(node, lookUp) {
    var _node$getAttribute;
    if (lookUp === void 0) {
      lookUp = true;
    }
    // CAREFUL: JSDom does not support inert at all, so we can't use the `HTMLElement.inert`
    //  JS API property; we have to check the attribute, which can either be empty or 'true';
    //  if it's `null` (not specified) or 'false', it's an active element
    var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, 'inert');
    var inert = inertAtt === '' || inertAtt === 'true';

    // NOTE: this could also be handled with `node.matches('[inert], :is([inert] *)')`
    //  if it weren't for `matches()` not being a function on shadow roots; the following
    //  code works for any kind of node
    // CAREFUL: JSDom does not appear to support certain selectors like `:not([inert] *)`
    //  so it likely would not support `:is([inert] *)` either...
    var result = inert || lookUp && node && isInert(node.parentNode); // recursive

    return result;
  };

  /**
   * Determines if a node's content is editable.
   * @param {Element} [node]
   * @returns True if it's content-editable; false if it's not or `node` is falsy.
   */
  var isContentEditable = function isContentEditable(node) {
    var _node$getAttribute2;
    // CAREFUL: JSDom does not support the `HTMLElement.isContentEditable` API so we have
    //  to use the attribute directly to check for this, which can either be empty or 'true';
    //  if it's `null` (not specified) or 'false', it's a non-editable element
    var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, 'contenteditable');
    return attValue === '' || attValue === 'true';
  };

  /**
   * @param {Element} el container to check in
   * @param {boolean} includeContainer add container to check
   * @param {(node: Element) => boolean} filter filter candidates
   * @returns {Element[]}
   */
  var getCandidates = function getCandidates(el, includeContainer, filter) {
    // even if `includeContainer=false`, we still have to check it for inertness because
    //  if it's inert, all its children are inert
    if (isInert(el)) {
      return [];
    }
    var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
    if (includeContainer && matches.call(el, candidateSelector)) {
      candidates.unshift(el);
    }
    candidates = candidates.filter(filter);
    return candidates;
  };

  /**
   * @callback GetShadowRoot
   * @param {Element} element to check for shadow root
   * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
   */

  /**
   * @callback ShadowRootFilter
   * @param {Element} shadowHostNode the element which contains shadow content
   * @returns {boolean} true if a shadow root could potentially contain valid candidates.
   */

  /**
   * @typedef {Object} CandidateScope
   * @property {Element} scopeParent contains inner candidates
   * @property {Element[]} candidates list of candidates found in the scope parent
   */

  /**
   * @typedef {Object} IterativeOptions
   * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
   *  if a function, implies shadow support is enabled and either returns the shadow root of an element
   *  or a boolean stating if it has an undisclosed shadow root
   * @property {(node: Element) => boolean} filter filter candidates
   * @property {boolean} flatten if true then result will flatten any CandidateScope into the returned list
   * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
   */

  /**
   * @param {Element[]} elements list of element containers to match candidates from
   * @param {boolean} includeContainer add container list to check
   * @param {IterativeOptions} options
   * @returns {Array.<Element|CandidateScope>}
   */
  var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
    var candidates = [];
    var elementsToCheck = Array.from(elements);
    while (elementsToCheck.length) {
      var element = elementsToCheck.shift();
      if (isInert(element, false)) {
        // no need to look up since we're drilling down
        // anything inside this container will also be inert
        continue;
      }
      if (element.tagName === 'SLOT') {
        // add shadow dom slot scope (slot itself cannot be focusable)
        var assigned = element.assignedElements();
        var content = assigned.length ? assigned : element.children;
        var nestedCandidates = getCandidatesIteratively(content, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: nestedCandidates
          });
        }
      } else {
        // check candidate element
        var validCandidate = matches.call(element, candidateSelector);
        if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
          candidates.push(element);
        }

        // iterate over shadow content if possible
        var shadowRoot = element.shadowRoot ||
        // check for an undisclosed shadow
        typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);

        // no inert look up because we're already drilling down and checking for inertness
        //  on the way down, so all containers to this root node should have already been
        //  vetted as non-inert
        var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
        if (shadowRoot && validShadowRoot) {
          // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
          //  shadow exists, so look at light dom children as fallback BUT create a scope for any
          //  child candidates found because they're likely slotted elements (elements that are
          //  children of the web component element (which has the shadow), in the light dom, but
          //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
          //  _after_ we return from this recursive call
          var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
          if (options.flatten) {
            candidates.push.apply(candidates, _nestedCandidates);
          } else {
            candidates.push({
              scopeParent: element,
              candidates: _nestedCandidates
            });
          }
        } else {
          // there's not shadow so just dig into the element's (light dom) children
          //  __without__ giving the element special scope treatment
          elementsToCheck.unshift.apply(elementsToCheck, element.children);
        }
      }
    }
    return candidates;
  };

  /**
   * @private
   * Determines if the node has an explicitly specified `tabindex` attribute.
   * @param {HTMLElement} node
   * @returns {boolean} True if so; false if not.
   */
  var hasTabIndex = function hasTabIndex(node) {
    return !isNaN(parseInt(node.getAttribute('tabindex'), 10));
  };

  /**
   * Determine the tab index of a given node.
   * @param {HTMLElement} node
   * @returns {number} Tab order (negative, 0, or positive number).
   * @throws {Error} If `node` is falsy.
   */
  var getTabIndex = function getTabIndex(node) {
    if (!node) {
      throw new Error('No node provided');
    }
    if (node.tabIndex < 0) {
      // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
      // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
      // yet they are still part of the regular tab order; in FF, they get a default
      // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
      // order, consider their tab index to be 0.
      // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
      // so if they don't have a tabindex attribute specifically set, assume it's 0.
      if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
        return 0;
      }
    }
    return node.tabIndex;
  };

  /**
   * Determine the tab index of a given node __for sort order purposes__.
   * @param {HTMLElement} node
   * @param {boolean} [isScope] True for a custom element with shadow root or slot that, by default,
   *  has tabIndex -1, but needs to be sorted by document order in order for its content to be
   *  inserted into the correct sort position.
   * @returns {number} Tab order (negative, 0, or positive number).
   */
  var getSortOrderTabIndex = function getSortOrderTabIndex(node, isScope) {
    var tabIndex = getTabIndex(node);
    if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
      return 0;
    }
    return tabIndex;
  };
  var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
    return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
  };
  var isInput = function isInput(node) {
    return node.tagName === 'INPUT';
  };
  var isHiddenInput = function isHiddenInput(node) {
    return isInput(node) && node.type === 'hidden';
  };
  var isDetailsWithSummary = function isDetailsWithSummary(node) {
    var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
      return child.tagName === 'SUMMARY';
    });
    return r;
  };
  var getCheckedRadio = function getCheckedRadio(nodes, form) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].checked && nodes[i].form === form) {
        return nodes[i];
      }
    }
  };
  var isTabbableRadio = function isTabbableRadio(node) {
    if (!node.name) {
      return true;
    }
    var radioScope = node.form || getRootNode(node);
    var queryRadios = function queryRadios(name) {
      return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
    };
    var radioSet;
    if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
      radioSet = queryRadios(window.CSS.escape(node.name));
    } else {
      try {
        radioSet = queryRadios(node.name);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
        return false;
      }
    }
    var checked = getCheckedRadio(radioSet, node.form);
    return !checked || checked === node;
  };
  var isRadio = function isRadio(node) {
    return isInput(node) && node.type === 'radio';
  };
  var isNonTabbableRadio = function isNonTabbableRadio(node) {
    return isRadio(node) && !isTabbableRadio(node);
  };

  // determines if a node is ultimately attached to the window's document
  var isNodeAttached = function isNodeAttached(node) {
    var _nodeRoot;
    // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
    //  (but NOT _the_ document; see second 'If' comment below for more).
    // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
    //  is attached, and the one we need to check if it's in the document or not (because the
    //  shadow, and all nodes it contains, is never considered in the document since shadows
    //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
    //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
    //  visibility, including all the nodes it contains). The host could be any normal node,
    //  or a custom element (i.e. web component). Either way, that's the one that is considered
    //  part of the document, not the shadow root, nor any of its children (i.e. the node being
    //  tested).
    // To further complicate things, we have to look all the way up until we find a shadow HOST
    //  that is attached (or find none) because the node might be in nested shadows...
    // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
    //  document (per the docs) and while it's a Document-type object, that document does not
    //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
    //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
    //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
    //  node is actually detached.
    // NOTE: If `nodeRootHost` or `node` happens to be the `document` itself (which is possible
    //  if a tabbable/focusable node was quickly added to the DOM, focused, and then removed
    //  from the DOM as in https://github.com/focus-trap/focus-trap-react/issues/905), then
    //  `ownerDocument` will be `null`, hence the optional chaining on it.
    var nodeRoot = node && getRootNode(node);
    var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;

    // in some cases, a detached node will return itself as the root instead of a document or
    //  shadow root object, in which case, we shouldn't try to look further up the host chain
    var attached = false;
    if (nodeRoot && nodeRoot !== node) {
      var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
      attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
      while (!attached && nodeRootHost) {
        var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
        // since it's not attached and we have a root host, the node MUST be in a nested shadow DOM,
        //  which means we need to get the host's host and check if that parent host is contained
        //  in (i.e. attached to) the document
        nodeRoot = getRootNode(nodeRootHost);
        nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
        attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
      }
    }
    return attached;
  };
  var isZeroArea = function isZeroArea(node) {
    var _node$getBoundingClie = node.getBoundingClientRect(),
      width = _node$getBoundingClie.width,
      height = _node$getBoundingClie.height;
    return width === 0 && height === 0;
  };
  var isHidden = function isHidden(node, _ref) {
    var displayCheck = _ref.displayCheck,
      getShadowRoot = _ref.getShadowRoot;
    // NOTE: visibility will be `undefined` if node is detached from the document
    //  (see notes about this further down), which means we will consider it visible
    //  (this is legacy behavior from a very long way back)
    // NOTE: we check this regardless of `displayCheck="none"` because this is a
    //  _visibility_ check, not a _display_ check
    if (getComputedStyle(node).visibility === 'hidden') {
      return true;
    }
    var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
    var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
    if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
      return true;
    }
    if (!displayCheck || displayCheck === 'full' || displayCheck === 'legacy-full') {
      if (typeof getShadowRoot === 'function') {
        // figure out if we should consider the node to be in an undisclosed shadow and use the
        //  'non-zero-area' fallback
        var originalNode = node;
        while (node) {
          var parentElement = node.parentElement;
          var rootNode = getRootNode(node);
          if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
          ) {
            // node has an undisclosed shadow which means we can only treat it as a black box, so we
            //  fall back to a non-zero-area test
            return isZeroArea(node);
          } else if (node.assignedSlot) {
            // iterate up slot
            node = node.assignedSlot;
          } else if (!parentElement && rootNode !== node.ownerDocument) {
            // cross shadow boundary
            node = rootNode.host;
          } else {
            // iterate up normal dom
            node = parentElement;
          }
        }
        node = originalNode;
      }
      // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
      //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
      //  it might be a falsy value, which means shadow DOM support is disabled

      // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
      //  now we can just test to see if it would normally be visible or not, provided it's
      //  attached to the main document.
      // NOTE: We must consider case where node is inside a shadow DOM and given directly to
      //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.

      if (isNodeAttached(node)) {
        // this works wherever the node is: if there's at least one client rect, it's
        //  somehow displayed; it also covers the CSS 'display: contents' case where the
        //  node itself is hidden in place of its contents; and there's no need to search
        //  up the hierarchy either
        return !node.getClientRects().length;
      }

      // Else, the node isn't attached to the document, which means the `getClientRects()`
      //  API will __always__ return zero rects (this can happen, for example, if React
      //  is used to render nodes onto a detached tree, as confirmed in this thread:
      //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
      //
      // It also means that even window.getComputedStyle(node).display will return `undefined`
      //  because styles are only computed for nodes that are in the document.
      //
      // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
      //  somehow. Though it was never stated officially, anyone who has ever used tabbable
      //  APIs on nodes in detached containers has actually implicitly used tabbable in what
      //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
      //  considering __everything__ to be visible because of the innability to determine styles.
      //
      // v6.0.0: As of this major release, the default 'full' option __no longer treats detached
      //  nodes as visible with the 'none' fallback.__
      if (displayCheck !== 'legacy-full') {
        return true; // hidden
      }
      // else, fallback to 'none' mode and consider the node visible
    } else if (displayCheck === 'non-zero-area') {
      // NOTE: Even though this tests that the node's client rect is non-zero to determine
      //  whether it's displayed, and that a detached node will __always__ have a zero-area
      //  client rect, we don't special-case for whether the node is attached or not. In
      //  this mode, we do want to consider nodes that have a zero area to be hidden at all
      //  times, and that includes attached or not.
      return isZeroArea(node);
    }

    // visible, as far as we can tell, or per current `displayCheck=none` mode, we assume
    //  it's visible
    return false;
  };

  // form fields (nested) inside a disabled fieldset are not focusable/tabbable
  //  unless they are in the _first_ <legend> element of the top-most disabled
  //  fieldset
  var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
      var parentNode = node.parentElement;
      // check if `node` is contained in a disabled <fieldset>
      while (parentNode) {
        if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
          // look for the first <legend> among the children of the disabled <fieldset>
          for (var i = 0; i < parentNode.children.length; i++) {
            var child = parentNode.children.item(i);
            // when the first <legend> (in document order) is found
            if (child.tagName === 'LEGEND') {
              // if its parent <fieldset> is not nested in another disabled <fieldset>,
              // return whether `node` is a descendant of its first <legend>
              return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
            }
          }
          // the disabled <fieldset> containing `node` has no <legend>
          return true;
        }
        parentNode = parentNode.parentElement;
      }
    }

    // else, node's tabbable/focusable state should not be affected by a fieldset's
    //  enabled/disabled state
    return false;
  };
  var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
    if (node.disabled ||
    // we must do an inert look up to filter out any elements inside an inert ancestor
    //  because we're limited in the type of selectors we can use in JSDom (see related
    //  note related to `candidateSelectors`)
    isInert(node) || isHiddenInput(node) || isHidden(node, options) ||
    // For a details element with a summary, the summary element gets the focus
    isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
      return false;
    }
    return true;
  };
  var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
    if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
      return false;
    }
    return true;
  };
  var isValidShadowRootTabbable = function isValidShadowRootTabbable(shadowHostNode) {
    var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);
    if (isNaN(tabIndex) || tabIndex >= 0) {
      return true;
    }
    // If a custom element has an explicit negative tabindex,
    // browsers will not allow tab targeting said element's children.
    return false;
  };

  /**
   * @param {Array.<Element|CandidateScope>} candidates
   * @returns Element[]
   */
  var sortByOrder = function sortByOrder(candidates) {
    var regularTabbables = [];
    var orderedTabbables = [];
    candidates.forEach(function (item, i) {
      var isScope = !!item.scopeParent;
      var element = isScope ? item.scopeParent : item;
      var candidateTabindex = getSortOrderTabIndex(element, isScope);
      var elements = isScope ? sortByOrder(item.candidates) : element;
      if (candidateTabindex === 0) {
        isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
      } else {
        orderedTabbables.push({
          documentOrder: i,
          tabIndex: candidateTabindex,
          item: item,
          isScope: isScope,
          content: elements
        });
      }
    });
    return orderedTabbables.sort(sortOrderedTabbables).reduce(function (acc, sortable) {
      sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
      return acc;
    }, []).concat(regularTabbables);
  };
  var tabbable = function tabbable(container, options) {
    options = options || {};
    var candidates;
    if (options.getShadowRoot) {
      candidates = getCandidatesIteratively([container], options.includeContainer, {
        filter: isNodeMatchingSelectorTabbable.bind(null, options),
        flatten: false,
        getShadowRoot: options.getShadowRoot,
        shadowRootFilter: isValidShadowRootTabbable
      });
    } else {
      candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
    }
    return sortByOrder(candidates);
  };
  var focusable = function focusable(container, options) {
    options = options || {};
    var candidates;
    if (options.getShadowRoot) {
      candidates = getCandidatesIteratively([container], options.includeContainer, {
        filter: isNodeMatchingSelectorFocusable.bind(null, options),
        flatten: true,
        getShadowRoot: options.getShadowRoot
      });
    } else {
      candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
    }
    return candidates;
  };
  var isTabbable = function isTabbable(node, options) {
    options = options || {};
    if (!node) {
      throw new Error('No node provided');
    }
    if (matches.call(node, candidateSelector) === false) {
      return false;
    }
    return isNodeMatchingSelectorTabbable(options, node);
  };

  // Avoid Chrome DevTools blue warning.
  function getPlatform() {
    const uaData = navigator.userAgentData;
    if (uaData != null && uaData.platform) {
      return uaData.platform;
    }
    return navigator.platform;
  }
  function getUserAgent() {
    const uaData = navigator.userAgentData;
    if (uaData && Array.isArray(uaData.brands)) {
      return uaData.brands.map(_ref => {
        let {
          brand,
          version
        } = _ref;
        return brand + "/" + version;
      }).join(' ');
    }
    return navigator.userAgent;
  }
  function isSafari() {
    // Chrome DevTools does not complain about navigator.vendor
    return /apple/i.test(navigator.vendor);
  }
  function isAndroid() {
    const re = /android/i;
    return re.test(getPlatform()) || re.test(getUserAgent());
  }
  function isMac() {
    return getPlatform().toLowerCase().startsWith('mac') && !navigator.maxTouchPoints;
  }
  function isJSDOM() {
    return getUserAgent().includes('jsdom/');
  }

  const FOCUSABLE_ATTRIBUTE$1 = 'data-floating-ui-focusable';
  const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled])," + "[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";

  function activeElement(doc) {
    let activeElement = doc.activeElement;
    while (((_activeElement = activeElement) == null || (_activeElement = _activeElement.shadowRoot) == null ? void 0 : _activeElement.activeElement) != null) {
      var _activeElement;
      activeElement = activeElement.shadowRoot.activeElement;
    }
    return activeElement;
  }
  function contains$1(parent, child) {
    if (!parent || !child) {
      return false;
    }
    const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();

    // First, attempt with faster native method
    if (parent.contains(child)) {
      return true;
    }

    // then fallback to custom implementation with Shadow DOM support
    if (rootNode && isShadowRoot(rootNode)) {
      let next = child;
      while (next) {
        if (parent === next) {
          return true;
        }
        // @ts-ignore
        next = next.parentNode || next.host;
      }
    }

    // Give up, the result is false
    return false;
  }
  function getTarget$1(event) {
    if ('composedPath' in event) {
      return event.composedPath()[0];
    }

    // TS thinks `event` is of type never as it assumes all browsers support
    // `composedPath()`, but browsers without shadow DOM don't.
    return event.target;
  }
  function isEventTargetWithin(event, node) {
    if (node == null) {
      return false;
    }
    if ('composedPath' in event) {
      return event.composedPath().includes(node);
    }

    // TS thinks `event` is of type never as it assumes all browsers support composedPath, but browsers without shadow dom don't
    const e = event;
    return e.target != null && node.contains(e.target);
  }
  function isRootElement(element) {
    return element.matches('html,body');
  }
  function getDocument$1(node) {
    return (node == null ? void 0 : node.ownerDocument) || document;
  }
  function isTypeableElement(element) {
    return isHTMLElement(element) && element.matches(TYPEABLE_SELECTOR);
  }
  function isTypeableCombobox(element) {
    if (!element) return false;
    return element.getAttribute('role') === 'combobox' && isTypeableElement(element);
  }
  function matchesFocusVisible(element) {
    // We don't want to block focus from working with `visibleOnly`
    // (JSDOM doesn't match `:focus-visible` when the element has `:focus`)
    if (!element || isJSDOM()) return true;
    try {
      return element.matches(':focus-visible');
    } catch (_e) {
      return true;
    }
  }
  function getFloatingFocusElement(floatingElement) {
    if (!floatingElement) {
      return null;
    }
    // Try to find the element that has `{...getFloatingProps()}` spread on it.
    // This indicates the floating element is acting as a positioning wrapper, and
    // so focus should be managed on the child element with the event handlers and
    // aria props.
    return floatingElement.hasAttribute(FOCUSABLE_ATTRIBUTE$1) ? floatingElement : floatingElement.querySelector("[" + FOCUSABLE_ATTRIBUTE$1 + "]") || floatingElement;
  }

  function getNodeChildren$1(nodes, id) {
    let allChildren = nodes.filter(node => {
      var _node$context;
      return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
    });
    let currentChildren = allChildren;
    while (currentChildren.length) {
      currentChildren = nodes.filter(node => {
        var _currentChildren;
        return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some(n => {
          var _node$context2;
          return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
        });
      });
      allChildren = allChildren.concat(currentChildren);
    }
    return allChildren;
  }
  function getNodeAncestors(nodes, id) {
    var _nodes$find;
    let allAncestors = [];
    let currentParentId = (_nodes$find = nodes.find(node => node.id === id)) == null ? void 0 : _nodes$find.parentId;
    while (currentParentId) {
      const currentNode = nodes.find(node => node.id === currentParentId);
      currentParentId = currentNode == null ? void 0 : currentNode.parentId;
      if (currentNode) {
        allAncestors = allAncestors.concat(currentNode);
      }
    }
    return allAncestors;
  }

  function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  function isReactEvent(event) {
    return 'nativeEvent' in event;
  }

  // License: https://github.com/adobe/react-spectrum/blob/b35d5c02fe900badccd0cf1a8f23bb593419f238/packages/@react-aria/utils/src/isVirtualEvent.ts
  function isVirtualClick(event) {
    // FIXME: Firefox is now emitting a deprecation warning for `mozInputSource`.
    // Try to find a workaround for this. `react-aria` source still has the check.
    if (event.mozInputSource === 0 && event.isTrusted) {
      return true;
    }
    if (isAndroid() && event.pointerType) {
      return event.type === 'click' && event.buttons === 1;
    }
    return event.detail === 0 && !event.pointerType;
  }
  function isVirtualPointerEvent(event) {
    if (isJSDOM()) return false;
    return !isAndroid() && event.width === 0 && event.height === 0 || isAndroid() && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'mouse' ||
    // iOS VoiceOver returns 0.333• for width/height.
    event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'touch';
  }
  function isMouseLikePointerType(pointerType, strict) {
    // On some Linux machines with Chromium, mouse inputs return a `pointerType`
    // of "pen": https://github.com/floating-ui/floating-ui/issues/2015
    const values = ['mouse', 'pen'];
    if (!strict) {
      values.push('', undefined);
    }
    return values.includes(pointerType);
  }

  var isClient$1 = typeof document !== 'undefined';

  var noop$1 = function noop() {};
  var index$1 = isClient$1 ? React.useLayoutEffect : noop$1;

  // https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
  const SafeReact$1 = {
    ...React__namespace
  };

  function useLatestRef$1(value) {
    const ref = React__namespace.useRef(value);
    index$1(() => {
      ref.current = value;
    });
    return ref;
  }
  const useInsertionEffect = SafeReact$1.useInsertionEffect;
  const useSafeInsertionEffect = useInsertionEffect || (fn => fn());
  function useEffectEvent(callback) {
    const ref = React__namespace.useRef(() => {
      {
        throw new Error('Cannot call an event handler while rendering.');
      }
    });
    useSafeInsertionEffect(() => {
      ref.current = callback;
    });
    return React__namespace.useCallback(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return ref.current == null ? void 0 : ref.current(...args);
    }, []);
  }

  const getTabbableOptions = () => ({
    getShadowRoot: true,
    displayCheck:
    // JSDOM does not support the `tabbable` library. To solve this we can
    // check if `ResizeObserver` is a real function (not polyfilled), which
    // determines if the current environment is JSDOM-like.
    typeof ResizeObserver === 'function' && ResizeObserver.toString().includes('[native code]') ? 'full' : 'none'
  });
  function getTabbableIn(container, dir) {
    const list = tabbable(container, getTabbableOptions());
    const len = list.length;
    if (len === 0) return;
    const active = activeElement(getDocument$1(container));
    const index = list.indexOf(active);
    const nextIndex = index === -1 ? dir === 1 ? 0 : len - 1 : index + dir;
    return list[nextIndex];
  }
  function getNextTabbable(referenceElement) {
    return getTabbableIn(getDocument$1(referenceElement).body, 1) || referenceElement;
  }
  function getPreviousTabbable(referenceElement) {
    return getTabbableIn(getDocument$1(referenceElement).body, -1) || referenceElement;
  }
  function isOutsideEvent(event, container) {
    const containerElement = container || event.currentTarget;
    const relatedTarget = event.relatedTarget;
    return !relatedTarget || !contains$1(containerElement, relatedTarget);
  }
  function disableFocusInside(container) {
    const tabbableElements = tabbable(container, getTabbableOptions());
    tabbableElements.forEach(element => {
      element.dataset.tabindex = element.getAttribute('tabindex') || '';
      element.setAttribute('tabindex', '-1');
    });
  }
  function enableFocusInside(container) {
    const elements = container.querySelectorAll('[data-tabindex]');
    elements.forEach(element => {
      const tabindex = element.dataset.tabindex;
      delete element.dataset.tabindex;
      if (tabindex) {
        element.setAttribute('tabindex', tabindex);
      } else {
        element.removeAttribute('tabindex');
      }
    });
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : window ;

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var jsxRuntime = {exports: {}};

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

  {
    (function() {

  var React$1 = React;

  // ATTENTION
  // When adding new symbols to this file,
  // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
  // The Symbol used to tag the ReactElement-like types.
  var REACT_ELEMENT_TYPE = Symbol.for('react.element');
  var REACT_PORTAL_TYPE = Symbol.for('react.portal');
  var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
  var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
  var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
  var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
  var REACT_CONTEXT_TYPE = Symbol.for('react.context');
  var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
  var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
  var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
  var REACT_MEMO_TYPE = Symbol.for('react.memo');
  var REACT_LAZY_TYPE = Symbol.for('react.lazy');
  var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
  var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';
  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || typeof maybeIterable !== 'object') {
      return null;
    }

    var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

    if (typeof maybeIterator === 'function') {
      return maybeIterator;
    }

    return null;
  }

  var ReactSharedInternals = React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

  function error(format) {
    {
      {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        printWarning('error', format, args);
      }
    }
  }

  function printWarning(level, format, args) {
    // When changing this logic, you might want to also
    // update consoleWithStackDev.www.js as well.
    {
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var stack = ReactDebugCurrentFrame.getStackAddendum();

      if (stack !== '') {
        format += '%s';
        args = args.concat([stack]);
      } // eslint-disable-next-line react-internal/safe-string-coercion


      var argsWithFormat = args.map(function (item) {
        return String(item);
      }); // Careful: RN currently depends on this prefix

      argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610
      // eslint-disable-next-line react-internal/no-production-logging

      Function.prototype.apply.call(console[level], console, argsWithFormat);
    }
  }

  // -----------------------------------------------------------------------------

  var enableScopeAPI = false; // Experimental Create Event Handle API.
  var enableCacheElement = false;
  var enableTransitionTracing = false; // No known bugs, but needs performance testing

  var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
  // stuff. Intended to enable React core members to more easily debug scheduling
  // issues in DEV builds.

  var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

  var REACT_MODULE_REFERENCE;

  {
    REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
  }

  function isValidElementType(type) {
    if (typeof type === 'string' || typeof type === 'function') {
      return true;
    } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


    if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
      return true;
    }

    if (typeof type === 'object' && type !== null) {
      if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
        return true;
      }
    }

    return false;
  }

  function getWrappedName(outerType, innerType, wrapperName) {
    var displayName = outerType.displayName;

    if (displayName) {
      return displayName;
    }

    var functionName = innerType.displayName || innerType.name || '';
    return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
  } // Keep in sync with react-reconciler/getComponentNameFromFiber


  function getContextName(type) {
    return type.displayName || 'Context';
  } // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


  function getComponentNameFromType(type) {
    if (type == null) {
      // Host root, text node or just invalid type.
      return null;
    }

    {
      if (typeof type.tag === 'number') {
        error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
      }
    }

    if (typeof type === 'function') {
      return type.displayName || type.name || null;
    }

    if (typeof type === 'string') {
      return type;
    }

    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return 'Fragment';

      case REACT_PORTAL_TYPE:
        return 'Portal';

      case REACT_PROFILER_TYPE:
        return 'Profiler';

      case REACT_STRICT_MODE_TYPE:
        return 'StrictMode';

      case REACT_SUSPENSE_TYPE:
        return 'Suspense';

      case REACT_SUSPENSE_LIST_TYPE:
        return 'SuspenseList';

    }

    if (typeof type === 'object') {
      switch (type.$$typeof) {
        case REACT_CONTEXT_TYPE:
          var context = type;
          return getContextName(context) + '.Consumer';

        case REACT_PROVIDER_TYPE:
          var provider = type;
          return getContextName(provider._context) + '.Provider';

        case REACT_FORWARD_REF_TYPE:
          return getWrappedName(type, type.render, 'ForwardRef');

        case REACT_MEMO_TYPE:
          var outerName = type.displayName || null;

          if (outerName !== null) {
            return outerName;
          }

          return getComponentNameFromType(type.type) || 'Memo';

        case REACT_LAZY_TYPE:
          {
            var lazyComponent = type;
            var payload = lazyComponent._payload;
            var init = lazyComponent._init;

            try {
              return getComponentNameFromType(init(payload));
            } catch (x) {
              return null;
            }
          }

        // eslint-disable-next-line no-fallthrough
      }
    }

    return null;
  }

  var assign = Object.assign;

  // Helpers to patch console.logs to avoid logging during side-effect free
  // replaying on render function. This currently only patches the object
  // lazily which won't cover if the log function was extracted eagerly.
  // We could also eagerly patch the method.
  var disabledDepth = 0;
  var prevLog;
  var prevInfo;
  var prevWarn;
  var prevError;
  var prevGroup;
  var prevGroupCollapsed;
  var prevGroupEnd;

  function disabledLog() {}

  disabledLog.__reactDisabledLog = true;
  function disableLogs() {
    {
      if (disabledDepth === 0) {
        /* eslint-disable react-internal/no-production-logging */
        prevLog = console.log;
        prevInfo = console.info;
        prevWarn = console.warn;
        prevError = console.error;
        prevGroup = console.group;
        prevGroupCollapsed = console.groupCollapsed;
        prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

        var props = {
          configurable: true,
          enumerable: true,
          value: disabledLog,
          writable: true
        }; // $FlowFixMe Flow thinks console is immutable.

        Object.defineProperties(console, {
          info: props,
          log: props,
          warn: props,
          error: props,
          group: props,
          groupCollapsed: props,
          groupEnd: props
        });
        /* eslint-enable react-internal/no-production-logging */
      }

      disabledDepth++;
    }
  }
  function reenableLogs() {
    {
      disabledDepth--;

      if (disabledDepth === 0) {
        /* eslint-disable react-internal/no-production-logging */
        var props = {
          configurable: true,
          enumerable: true,
          writable: true
        }; // $FlowFixMe Flow thinks console is immutable.

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
        /* eslint-enable react-internal/no-production-logging */
      }

      if (disabledDepth < 0) {
        error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
      }
    }
  }

  var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
  var prefix;
  function describeBuiltInComponentFrame(name, source, ownerFn) {
    {
      if (prefix === undefined) {
        // Extract the VM specific prefix used by each line.
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = match && match[1] || '';
        }
      } // We use the prefix to ensure our stacks line up with native stack frames.


      return '\n' + prefix + name;
    }
  }
  var reentry = false;
  var componentFrameCache;

  {
    var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
    componentFrameCache = new PossiblyWeakMap();
  }

  function describeNativeComponentFrame(fn, construct) {
    // If something asked for a stack inside a fake render, it should get ignored.
    if ( !fn || reentry) {
      return '';
    }

    {
      var frame = componentFrameCache.get(fn);

      if (frame !== undefined) {
        return frame;
      }
    }

    var control;
    reentry = true;
    var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

    Error.prepareStackTrace = undefined;
    var previousDispatcher;

    {
      previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
      // for warnings.

      ReactCurrentDispatcher.current = null;
      disableLogs();
    }

    try {
      // This should throw.
      if (construct) {
        // Something should be setting the props in the constructor.
        var Fake = function () {
          throw Error();
        }; // $FlowFixMe


        Object.defineProperty(Fake.prototype, 'props', {
          set: function () {
            // We use a throwing setter instead of frozen or non-writable props
            // because that won't throw in a non-strict mode function.
            throw Error();
          }
        });

        if (typeof Reflect === 'object' && Reflect.construct) {
          // We construct a different control for this case to include any extra
          // frames added by the construct call.
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
      // This is inlined manually because closure doesn't do it for us.
      if (sample && control && typeof sample.stack === 'string') {
        // This extracts the first frame from the sample that isn't also in the control.
        // Skipping one frame that we assume is the frame that calls the two.
        var sampleLines = sample.stack.split('\n');
        var controlLines = control.stack.split('\n');
        var s = sampleLines.length - 1;
        var c = controlLines.length - 1;

        while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
          // We expect at least one stack frame to be shared.
          // Typically this will be the root most one. However, stack frames may be
          // cut off due to maximum stack limits. In this case, one maybe cut off
          // earlier than the other. We assume that the sample is longer or the same
          // and there for cut off earlier. So we should find the root most frame in
          // the sample somewhere in the control.
          c--;
        }

        for (; s >= 1 && c >= 0; s--, c--) {
          // Next we find the first one that isn't the same which should be the
          // frame that called our sample function and the control.
          if (sampleLines[s] !== controlLines[c]) {
            // In V8, the first line is describing the message but other VMs don't.
            // If we're about to return the first line, and the control is also on the same
            // line, that's a pretty good indicator that our sample threw at same line as
            // the control. I.e. before we entered the sample frame. So we ignore this result.
            // This can happen if you passed a class to function component, or non-function.
            if (s !== 1 || c !== 1) {
              do {
                s--;
                c--; // We may still have similar intermediate frames from the construct call.
                // The next one that isn't the same should be our match though.

                if (c < 0 || sampleLines[s] !== controlLines[c]) {
                  // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                  var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                  // but we have a user-provided "displayName"
                  // splice it in to make the stack more readable.


                  if (fn.displayName && _frame.includes('<anonymous>')) {
                    _frame = _frame.replace('<anonymous>', fn.displayName);
                  }

                  {
                    if (typeof fn === 'function') {
                      componentFrameCache.set(fn, _frame);
                    }
                  } // Return the line we found.


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
    } // Fallback to just using the name if we couldn't make it throw.


    var name = fn ? fn.displayName || fn.name : '';
    var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

    {
      if (typeof fn === 'function') {
        componentFrameCache.set(fn, syntheticFrame);
      }
    }

    return syntheticFrame;
  }
  function describeFunctionComponentFrame(fn, source, ownerFn) {
    {
      return describeNativeComponentFrame(fn, false);
    }
  }

  function shouldConstruct(Component) {
    var prototype = Component.prototype;
    return !!(prototype && prototype.isReactComponent);
  }

  function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

    if (type == null) {
      return '';
    }

    if (typeof type === 'function') {
      {
        return describeNativeComponentFrame(type, shouldConstruct(type));
      }
    }

    if (typeof type === 'string') {
      return describeBuiltInComponentFrame(type);
    }

    switch (type) {
      case REACT_SUSPENSE_TYPE:
        return describeBuiltInComponentFrame('Suspense');

      case REACT_SUSPENSE_LIST_TYPE:
        return describeBuiltInComponentFrame('SuspenseList');
    }

    if (typeof type === 'object') {
      switch (type.$$typeof) {
        case REACT_FORWARD_REF_TYPE:
          return describeFunctionComponentFrame(type.render);

        case REACT_MEMO_TYPE:
          // Memo may contain any component type so we recursively resolve it.
          return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

        case REACT_LAZY_TYPE:
          {
            var lazyComponent = type;
            var payload = lazyComponent._payload;
            var init = lazyComponent._init;

            try {
              // Lazy may contain any component type so we recursively resolve it.
              return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
            } catch (x) {}
          }
      }
    }

    return '';
  }

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

  function checkPropTypes(typeSpecs, values, location, componentName, element) {
    {
      // $FlowFixMe This is okay but Flow doesn't know it.
      var has = Function.call.bind(hasOwnProperty);

      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.

          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              // eslint-disable-next-line react-internal/prod-error-codes
              var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
              err.name = 'Invariant Violation';
              throw err;
            }

            error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
          } catch (ex) {
            error$1 = ex;
          }

          if (error$1 && !(error$1 instanceof Error)) {
            setCurrentlyValidatingElement(element);

            error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

            setCurrentlyValidatingElement(null);
          }

          if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error$1.message] = true;
            setCurrentlyValidatingElement(element);

            error('Failed %s type: %s', location, error$1.message);

            setCurrentlyValidatingElement(null);
          }
        }
      }
    }
  }

  var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

  function isArray(a) {
    return isArrayImpl(a);
  }

  /*
   * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
   * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
   *
   * The functions in this module will throw an easier-to-understand,
   * easier-to-debug exception with a clear errors message message explaining the
   * problem. (Instead of a confusing exception thrown inside the implementation
   * of the `value` object).
   */
  // $FlowFixMe only called in DEV, so void return is not possible.
  function typeName(value) {
    {
      // toStringTag is needed for namespaced types like Temporal.Instant
      var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
      var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
      return type;
    }
  } // $FlowFixMe only called in DEV, so void return is not possible.


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

  function testStringCoercion(value) {
    // If you ended up here by following an exception call stack, here's what's
    // happened: you supplied an object or symbol value to React (as a prop, key,
    // DOM attribute, CSS property, string ref, etc.) and when React tried to
    // coerce it to a string using `'' + value`, an exception was thrown.
    //
    // The most common types that will cause this exception are `Symbol` instances
    // and Temporal objects like `Temporal.Instant`. But any object that has a
    // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
    // exception. (Library authors do this to prevent users from using built-in
    // numeric operators like `+` or comparison operators like `>=` because custom
    // methods are needed to perform accurate arithmetic or comparison.)
    //
    // To fix the problem, coerce this object or symbol value to a string before
    // passing it to React. The most reliable way is usually `String(value)`.
    //
    // To find which value is throwing, check the browser or debugger console.
    // Before this exception was thrown, there should be `console.error` output
    // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
    // problem and how that type was used: key, atrribute, input value prop, etc.
    // In most cases, this console output also shows the component and its
    // ancestor components where the exception happened.
    //
    // eslint-disable-next-line react-internal/safe-string-coercion
    return '' + value;
  }
  function checkKeyStringCoercion(value) {
    {
      if (willCoercionThrow(value)) {
        error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

        return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
      }
    }
  }

  var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
  var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
  };
  var specialPropKeyWarningShown;
  var specialPropRefWarningShown;
  var didWarnAboutStringRefs;

  {
    didWarnAboutStringRefs = {};
  }

  function hasValidRef(config) {
    {
      if (hasOwnProperty.call(config, 'ref')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }

    return config.ref !== undefined;
  }

  function hasValidKey(config) {
    {
      if (hasOwnProperty.call(config, 'key')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }

    return config.key !== undefined;
  }

  function warnIfStringRefCannotBeAutoConverted(config, self) {
    {
      if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
        var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

        if (!didWarnAboutStringRefs[componentName]) {
          error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

          didWarnAboutStringRefs[componentName] = true;
        }
      }
    }
  }

  function defineKeyPropWarningGetter(props, displayName) {
    {
      var warnAboutAccessingKey = function () {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;

          error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
        }
      };

      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
  }

  function defineRefPropWarningGetter(props, displayName) {
    {
      var warnAboutAccessingRef = function () {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;

          error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
        }
      };

      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }
  }
  /**
   * Factory method to create a new React element. This no longer adheres to
   * the class pattern, so do not use new to call it. Also, instanceof check
   * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
   * if something is a React Element.
   *
   * @param {*} type
   * @param {*} props
   * @param {*} key
   * @param {string|object} ref
   * @param {*} owner
   * @param {*} self A *temporary* helper to detect places where `this` is
   * different from the `owner` when React.createElement is called, so that we
   * can warn. We want to get rid of owner and replace string `ref`s with arrow
   * functions, and as long as `this` and owner are the same, there will be no
   * change in behavior.
   * @param {*} source An annotation object (added by a transpiler or otherwise)
   * indicating filename, line number, and/or other information.
   * @internal
   */


  var ReactElement = function (type, key, ref, self, source, owner, props) {
    var element = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: REACT_ELEMENT_TYPE,
      // Built-in properties that belong on the element
      type: type,
      key: key,
      ref: ref,
      props: props,
      // Record the component responsible for creating this element.
      _owner: owner
    };

    {
      // The validation flag is currently mutative. We put it on
      // an external backing store so that we can freeze the whole object.
      // This can be replaced with a WeakMap once they are implemented in
      // commonly used development environments.
      element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
      // the validation flag non-enumerable (where possible, which should
      // include every environment we run tests in), so the test framework
      // ignores it.

      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      }); // self and source are DEV only properties.

      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      }); // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.

      Object.defineProperty(element, '_source', {
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
  };
  /**
   * https://github.com/reactjs/rfcs/pull/107
   * @param {*} type
   * @param {object} props
   * @param {string} key
   */

  function jsxDEV(type, config, maybeKey, source, self) {
    {
      var propName; // Reserved names are extracted

      var props = {};
      var key = null;
      var ref = null; // Currently, key can be spread in as a prop. This causes a potential
      // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
      // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
      // but as an intermediary step, we will use jsxDEV for everything except
      // <div {...props} key="Hi" />, because we aren't currently able to tell if
      // key is explicitly declared to be undefined or not.

      if (maybeKey !== undefined) {
        {
          checkKeyStringCoercion(maybeKey);
        }

        key = '' + maybeKey;
      }

      if (hasValidKey(config)) {
        {
          checkKeyStringCoercion(config.key);
        }

        key = '' + config.key;
      }

      if (hasValidRef(config)) {
        ref = config.ref;
        warnIfStringRefCannotBeAutoConverted(config, self);
      } // Remaining properties are added to a new props object


      for (propName in config) {
        if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          props[propName] = config[propName];
        }
      } // Resolve default props


      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;

        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      if (key || ref) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

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

  var propTypesMisspellWarningShown;

  {
    propTypesMisspellWarningShown = false;
  }
  /**
   * Verifies the object is a ReactElement.
   * See https://reactjs.org/docs/react-api.html#isvalidelement
   * @param {?object} object
   * @return {boolean} True if `object` is a ReactElement.
   * @final
   */


  function isValidElement(object) {
    {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
  }

  function getDeclarationErrorAddendum() {
    {
      if (ReactCurrentOwner$1.current) {
        var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }

      return '';
    }
  }

  function getSourceInfoErrorAddendum(source) {
    {

      return '';
    }
  }
  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */


  var ownerHasKeyUseWarning = {};

  function getCurrentComponentErrorInfo(parentType) {
    {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

        if (parentName) {
          info = "\n\nCheck the top-level render call using <" + parentName + ">.";
        }
      }

      return info;
    }
  }
  /**
   * Warn if the element doesn't have an explicit key assigned to it.
   * This element is in an array. The array could grow and shrink or be
   * reordered. All children that haven't already been validated are required to
   * have a "key" property assigned to it. Error statuses are cached so a warning
   * will only be shown once.
   *
   * @internal
   * @param {ReactElement} element Element that requires a key.
   * @param {*} parentType element's parent's type.
   */


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

      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.

      var childOwner = '';

      if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
        // Give the component that originally created this child.
        childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
      }

      setCurrentlyValidatingElement$1(element);

      error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

      setCurrentlyValidatingElement$1(null);
    }
  }
  /**
   * Ensure that every element either is passed in a static location, in an
   * array with an explicit keys property defined, or in an object literal
   * with valid key property.
   *
   * @internal
   * @param {ReactNode} node Statically passed child of any type.
   * @param {*} parentType node's parent's type.
   */


  function validateChildKeys(node, parentType) {
    {
      if (typeof node !== 'object') {
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
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);

        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
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
  /**
   * Given an element, validate that its props follow the propTypes definition,
   * provided by the type.
   *
   * @param {ReactElement} element
   */


  function validatePropTypes(element) {
    {
      var type = element.type;

      if (type === null || type === undefined || typeof type === 'string') {
        return;
      }

      var propTypes;

      if (typeof type === 'function') {
        propTypes = type.propTypes;
      } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      type.$$typeof === REACT_MEMO_TYPE)) {
        propTypes = type.propTypes;
      } else {
        return;
      }

      if (propTypes) {
        // Intentionally inside to avoid triggering lazy initializers:
        var name = getComponentNameFromType(type);
        checkPropTypes(propTypes, element.props, 'prop', name, element);
      } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

        var _name = getComponentNameFromType(type);

        error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
      }

      if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
        error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }
  }
  /**
   * Given a fragment, validate that it can only be provided with fragment props
   * @param {ReactElement} fragment
   */


  function validateFragmentProps(fragment) {
    {
      var keys = Object.keys(fragment.props);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== 'children' && key !== 'key') {
          setCurrentlyValidatingElement$1(fragment);

          error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

          setCurrentlyValidatingElement$1(null);
          break;
        }
      }

      if (fragment.ref !== null) {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid attribute `ref` supplied to `React.Fragment`.');

        setCurrentlyValidatingElement$1(null);
      }
    }
  }

  var didWarnAboutKeySpread = {};
  function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
    {
      var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.

      if (!validType) {
        var info = '';

        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum();

        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        var typeString;

        if (type === null) {
          typeString = 'null';
        } else if (isArray(type)) {
          typeString = 'array';
        } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
          typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
          info = ' Did you accidentally export a JSX literal instead of a component?';
        } else {
          typeString = typeof type;
        }

        error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
      }

      var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.

      if (element == null) {
        return element;
      } // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)


      if (validType) {
        var children = props.children;

        if (children !== undefined) {
          if (isStaticChildren) {
            if (isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                validateChildKeys(children[i], type);
              }

              if (Object.freeze) {
                Object.freeze(children);
              }
            } else {
              error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
            }
          } else {
            validateChildKeys(children, type);
          }
        }
      }

      {
        if (hasOwnProperty.call(props, 'key')) {
          var componentName = getComponentNameFromType(type);
          var keys = Object.keys(props).filter(function (k) {
            return k !== 'key';
          });
          var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

          if (!didWarnAboutKeySpread[componentName + beforeExample]) {
            var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

            error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

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
  } // These two functions exist to still get child warnings in dev
  // even with the prod transform. This means that jsxDEV is purely
  // opt-in behavior for better messages but that we won't stop
  // giving you warnings if you use production apis.

  function jsxWithValidationStatic(type, props, key) {
    {
      return jsxWithValidation(type, props, key, true);
    }
  }
  function jsxWithValidationDynamic(type, props, key) {
    {
      return jsxWithValidation(type, props, key, false);
    }
  }

  var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
  // for now we can ship identical prod functions

  var jsxs =  jsxWithValidationStatic ;

  reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_development.jsx = jsx;
  reactJsxRuntime_development.jsxs = jsxs;
    })();
  }

  {
    jsxRuntime.exports = reactJsxRuntime_development;
  }

  var jsxRuntimeExports = jsxRuntime.exports;

  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === 'y';
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case 'top':
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case 'bottom':
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case 'right':
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case 'left':
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case 'start':
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case 'end':
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a given reference element.
   *
   * This export does not have any `platform` interface logic. You will need to
   * write one for the platform you are using Floating UI with.
   */
  const computePosition$1 = async (reference, floating, config) => {
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
    let rects = await platform.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < validMiddleware.length; i++) {
      const {
        name,
        fn
      } = validMiddleware[i];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === 'object') {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };

  /**
   * Resolves with an object of overflow side offsets that determine how much the
   * element is overflowing a given clipping boundary on each side.
   * - positive = overflowing the boundary by that number of pixels
   * - negative = how many pixels left before it will overflow
   * - 0 = lies flush with the boundary
   * @see https://floating-ui.com/docs/detectOverflow
   */
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = 'clippingAncestors',
      rootBoundary = 'viewport',
      elementContext = 'floating',
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === 'floating' ? 'reference' : 'floating';
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform.getClippingRect({
      element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === 'floating' ? {
      x,
      y,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
    const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }

  /**
   * Provides data to position an inner element of the floating element so that it
   * appears centered to the reference element.
   * @see https://floating-ui.com/docs/arrow
   */
  const arrow$3 = options => ({
    name: 'arrow',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        platform,
        elements,
        middlewareData
      } = state;
      // Since `element` is required, we don't Partial<> the type.
      const {
        element,
        padding = 0
      } = evaluate(options, state) || {};
      if (element == null) {
        return {};
      }
      const paddingObject = getPaddingObject(padding);
      const coords = {
        x,
        y
      };
      const axis = getAlignmentAxis(placement);
      const length = getAxisLength(axis);
      const arrowDimensions = await platform.getDimensions(element);
      const isYAxis = axis === 'y';
      const minProp = isYAxis ? 'top' : 'left';
      const maxProp = isYAxis ? 'bottom' : 'right';
      const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
      let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

      // DOM platform can return `window` as the `offsetParent`.
      if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;

      // If the padding is large enough that it causes the arrow to no longer be
      // centered, modify the padding so that it is centered.
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

      // Make sure the arrow doesn't overflow the floating element if the center
      // point is outside the floating element's bounds.
      const min$1 = minPadding;
      const max = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset = clamp(min$1, center, max);

      // If the reference is small enough that the arrow's padding causes it to
      // to point to nothing for an aligned placement, adjust the offset of the
      // floating element itself. To ensure `shift()` continues to take action,
      // a single reset is performed when this is true.
      const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
      return {
        [axis]: coords[axis] + alignmentOffset,
        data: {
          [axis]: offset,
          centerOffset: center - offset - alignmentOffset,
          ...(shouldAddOffset && {
            alignmentOffset
          })
        },
        reset: shouldAddOffset
      };
    }
  });

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip$2 = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'flip',
      options,
      async fn(state) {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = 'bestFit',
          fallbackAxisSideDirection = 'none',
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);

        // If a reset by the arrow was caused due to an alignment offset being
        // added, we should skip any logic now since `flip()` has already done its
        // work.
        // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const initialSideAxis = getSideAxis(initialPlacement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
        if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides[0]], overflow[sides[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];

        // One or more sides is overflowing.
        if (!overflows.every(side => side <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            const ignoreCrossAxisOverflow = checkCrossAxis === 'alignment' ? initialSideAxis !== getSideAxis(nextPlacement) : false;
            if (!ignoreCrossAxisOverflow ||
            // We leave the current main axis only if every placement on that axis
            // overflows the main axis.
            overflowsData.every(d => d.overflows[0] > 0 && getSideAxis(d.placement) === initialSideAxis)) {
              // Try next placement and re-run the lifecycle.
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }
          }

          // First, find the candidates that fit on the mainAxis side of overflow,
          // then find the placement that fits the best on the main crossAxis side.
          let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

          // Otherwise fallback.
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case 'bestFit':
                {
                  var _overflowsData$filter2;
                  const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d.placement);
                      return currentSideAxis === initialSideAxis ||
                      // Create a bias to the `y` side axis due to horizontal
                      // reading directions favoring greater width.
                      currentSideAxis === 'y';
                    }
                    return true;
                  }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                  if (placement) {
                    resetPlacement = placement;
                  }
                  break;
                }
              case 'initialPlacement':
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };

  function getBoundingRect(rects) {
    const minX = min(...rects.map(rect => rect.left));
    const minY = min(...rects.map(rect => rect.top));
    const maxX = max(...rects.map(rect => rect.right));
    const maxY = max(...rects.map(rect => rect.bottom));
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  function getRectsByLine(rects) {
    const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
    const groups = [];
    let prevRect = null;
    for (let i = 0; i < sortedRects.length; i++) {
      const rect = sortedRects[i];
      if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
        groups.push([rect]);
      } else {
        groups[groups.length - 1].push(rect);
      }
      prevRect = rect;
    }
    return groups.map(rect => rectToClientRect(getBoundingRect(rect)));
  }
  /**
   * Provides improved positioning for inline reference elements that can span
   * over multiple lines, such as hyperlinks or range selections.
   * @see https://floating-ui.com/docs/inline
   */
  const inline$2 = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'inline',
      options,
      async fn(state) {
        const {
          placement,
          elements,
          rects,
          platform,
          strategy
        } = state;
        // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
        // ClientRect's bounds, despite the event listener being triggered. A
        // padding of 2 seems to handle this issue.
        const {
          padding = 2,
          x,
          y
        } = evaluate(options, state);
        const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);
        const clientRects = getRectsByLine(nativeClientRects);
        const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
        const paddingObject = getPaddingObject(padding);
        function getBoundingClientRect() {
          // There are two rects and they are disjoined.
          if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
            // Find the first rect in which the point is fully inside.
            return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
          }

          // There are 2 or more connected rects.
          if (clientRects.length >= 2) {
            if (getSideAxis(placement) === 'y') {
              const firstRect = clientRects[0];
              const lastRect = clientRects[clientRects.length - 1];
              const isTop = getSide(placement) === 'top';
              const top = firstRect.top;
              const bottom = lastRect.bottom;
              const left = isTop ? firstRect.left : lastRect.left;
              const right = isTop ? firstRect.right : lastRect.right;
              const width = right - left;
              const height = bottom - top;
              return {
                top,
                bottom,
                left,
                right,
                width,
                height,
                x: left,
                y: top
              };
            }
            const isLeftSide = getSide(placement) === 'left';
            const maxRight = max(...clientRects.map(rect => rect.right));
            const minLeft = min(...clientRects.map(rect => rect.left));
            const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
            const top = measureRects[0].top;
            const bottom = measureRects[measureRects.length - 1].bottom;
            const left = minLeft;
            const right = maxRight;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }
          return fallback;
        }
        const resetRects = await platform.getElementRects({
          reference: {
            getBoundingClientRect
          },
          floating: elements.floating,
          strategy
        });
        if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
          return {
            reset: {
              rects: resetRects
            }
          };
        }
        return {};
      }
    };
  };

  // For type backwards-compatibility, the `OffsetOptions` type was also
  // Derivable.

  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform,
      elements
    } = state;
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === 'y';
    const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);

    // eslint-disable-next-line prefer-const
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === 'number' ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: rawValue.mainAxis || 0,
      crossAxis: rawValue.crossAxis || 0,
      alignmentAxis: rawValue.alignmentAxis
    };
    if (alignment && typeof alignmentAxis === 'number') {
      crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  const offset$2 = function (options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: 'offset',
      options,
      async fn(state) {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x,
          y,
          placement,
          middlewareData
        } = state;
        const diffCoords = await convertValueToCoords(state, options);

        // If the placement is the same and the arrow caused an alignment offset
        // then we don't need to change the positioning coordinates.
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: {
            ...diffCoords,
            placement
          }
        };
      }
    };
  };

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift$2 = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'shift',
      options,
      async fn(state) {
        const {
          x,
          y,
          placement
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: _ref => {
              let {
                x,
                y
              } = _ref;
              return {
                x,
                y
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(getSide(placement));
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === 'y' ? 'top' : 'left';
          const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
          const min = mainAxisCoord + overflow[minSide];
          const max = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = clamp(min, mainAxisCoord, max);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === 'y' ? 'top' : 'left';
          const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
          const min = crossAxisCoord + overflow[minSide];
          const max = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = clamp(min, crossAxisCoord, max);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y,
            enabled: {
              [mainAxis]: checkMainAxis,
              [crossAxis]: checkCrossAxis
            }
          }
        };
      }
    };
  };

  function getCssDimensions(element) {
    const css = getComputedStyle$1(element);
    // In testing environments, the `width` and `height` properties are empty
    // strings for SVG elements, returning NaN. Fallback to `0` in this case.
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }

  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }

  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;

    // 0, NaN, or Infinity should always fallback to 1.

    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }

  const noOffsets = /*#__PURE__*/createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
      return false;
    }
    return isFixed;
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetParent && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle$1(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x,
      y
    });
  }

  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  function getWindowScrollBarX(element, rect) {
    const leftScroll = getNodeScroll(element).scrollLeft;
    if (!rect) {
      return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
    }
    return rect.left + leftScroll;
  }

  function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
    if (ignoreScrollbarX === void 0) {
      ignoreScrollbarX = false;
    }
    const htmlRect = documentElement.getBoundingClientRect();
    const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 :
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect));
    const y = htmlRect.top + scroll.scrollTop;
    return {
      x,
      y
    };
  }

  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isFixed = strategy === 'fixed';
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
    };
  }

  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }

  // Gets the entire size of the scrollable document area, even extending outside
  // of the `<html>` and `<body>` rect bounds if horizontally scrollable.
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle$1(body).direction === 'rtl') {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  // Returns the inner client rect, subtracting scrollbars if present.
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === 'viewport') {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === 'document') {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y,
        width: clippingAncestor.width,
        height: clippingAncestor.height
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
  }

  // A "clipping ancestor" is an `overflow` element with the characteristic of
  // clipping (or hiding) child elements. This returns all clipping ancestors
  // of the given element up the tree.
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
    let currentNode = elementIsFixed ? getParentNode(element) : element;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle$1(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        // Drop non-containing blocks.
        result = result.filter(ancestor => ancestor !== currentNode);
      } else {
        // Record last containing block for next iteration.
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }

  // Gets the maximum area that the element is visible in due to any number of
  // clipping ancestors.
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }

  function getDimensions(element) {
    const {
      width,
      height
    } = getCssDimensions(element);
    return {
      width,
      height
    };
  }

  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === 'fixed';
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);

    // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
    // Firefox with layout.scrollbar.side = 3 in about:config to test this.
    function setLeftRTLScrollbarOffset() {
      offsets.x = getWindowScrollBarX(documentElement);
    }
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        setLeftRTLScrollbarOffset();
      }
    }
    if (isFixed && !isOffsetParentAnElement && documentElement) {
      setLeftRTLScrollbarOffset();
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
    const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
    return {
      x,
      y,
      width: rect.width,
      height: rect.height
    };
  }

  function isStaticPositioned(element) {
    return getComputedStyle$1(element).position === 'static';
  }

  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    let rawOffsetParent = element.offsetParent;

    // Firefox returns the <html> element as the offsetParent if it's non-static,
    // while Chrome and Safari return the <body> element. The <body> element must
    // be used to perform the correct calculations even if the <html> element is
    // non-static.
    if (getDocumentElement(element) === rawOffsetParent) {
      rawOffsetParent = rawOffsetParent.ownerDocument.body;
    }
    return rawOffsetParent;
  }

  // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.
  function getOffsetParent(element, polyfill) {
    const win = getWindow(element);
    if (isTopLayer(element)) {
      return win;
    }
    if (!isHTMLElement(element)) {
      let svgOffsetParent = getParentNode(element);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element) || win;
  }

  const getElementRects = async function (data) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = await getDimensionsFn(data.floating);
    return {
      reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  };

  function isRTL(element) {
    return getComputedStyle$1(element).direction === 'rtl';
  }

  const platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  const offset$1 = offset$2;

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift$1 = shift$2;

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip$1 = flip$2;

  /**
   * Provides data to position an inner element of the floating element so that it
   * appears centered to the reference element.
   * @see https://floating-ui.com/docs/arrow
   */
  const arrow$2 = arrow$3;

  /**
   * Provides improved positioning for inline reference elements that can span
   * over multiple lines, such as hyperlinks or range selections.
   * @see https://floating-ui.com/docs/inline
   */
  const inline$1 = inline$2;

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a given reference element.
   */
  const computePosition = (reference, floating, options) => {
    // This caches the expensive `getClippingElementAncestors` function so that
    // multiple lifecycle resets re-use the same result. It only lives for a
    // single call. If other functions become expensive, we can add them as well.
    const cache = new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition$1(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

  var isClient = typeof document !== 'undefined';

  var noop = function noop() {};
  var index = isClient ? React.useLayoutEffect : noop;

  // Fork of `fast-deep-equal` that only does the comparisons we need and compares
  // functions
  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (typeof a !== typeof b) {
      return false;
    }
    if (typeof a === 'function' && a.toString() === b.toString()) {
      return true;
    }
    let length;
    let i;
    let keys;
    if (a && b && typeof a === 'object') {
      if (Array.isArray(a)) {
        length = a.length;
        if (length !== b.length) return false;
        for (i = length; i-- !== 0;) {
          if (!deepEqual(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) {
        return false;
      }
      for (i = length; i-- !== 0;) {
        if (!{}.hasOwnProperty.call(b, keys[i])) {
          return false;
        }
      }
      for (i = length; i-- !== 0;) {
        const key = keys[i];
        if (key === '_owner' && a.$$typeof) {
          continue;
        }
        if (!deepEqual(a[key], b[key])) {
          return false;
        }
      }
      return true;
    }
    return a !== a && b !== b;
  }

  function getDPR(element) {
    const win = element.ownerDocument.defaultView || window;
    return win.devicePixelRatio || 1;
  }

  function roundByDPR(element, value) {
    const dpr = getDPR(element);
    return Math.round(value * dpr) / dpr;
  }

  function useLatestRef(value) {
    const ref = React__namespace.useRef(value);
    index(() => {
      ref.current = value;
    });
    return ref;
  }

  /**
   * Provides data to position a floating element.
   * @see https://floating-ui.com/docs/useFloating
   */
  function useFloating$1(options) {
    if (options === void 0) {
      options = {};
    }
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform,
      elements: {
        reference: externalReference,
        floating: externalFloating
      } = {},
      transform = true,
      whileElementsMounted,
      open
    } = options;
    const [data, setData] = React__namespace.useState({
      x: 0,
      y: 0,
      strategy,
      placement,
      middlewareData: {},
      isPositioned: false
    });
    const [latestMiddleware, setLatestMiddleware] = React__namespace.useState(middleware);
    if (!deepEqual(latestMiddleware, middleware)) {
      setLatestMiddleware(middleware);
    }
    const [_reference, _setReference] = React__namespace.useState(null);
    const [_floating, _setFloating] = React__namespace.useState(null);
    const setReference = React__namespace.useCallback(node => {
      if (node !== referenceRef.current) {
        referenceRef.current = node;
        _setReference(node);
      }
    }, []);
    const setFloating = React__namespace.useCallback(node => {
      if (node !== floatingRef.current) {
        floatingRef.current = node;
        _setFloating(node);
      }
    }, []);
    const referenceEl = externalReference || _reference;
    const floatingEl = externalFloating || _floating;
    const referenceRef = React__namespace.useRef(null);
    const floatingRef = React__namespace.useRef(null);
    const dataRef = React__namespace.useRef(data);
    const hasWhileElementsMounted = whileElementsMounted != null;
    const whileElementsMountedRef = useLatestRef(whileElementsMounted);
    const platformRef = useLatestRef(platform);
    const openRef = useLatestRef(open);
    const update = React__namespace.useCallback(() => {
      if (!referenceRef.current || !floatingRef.current) {
        return;
      }
      const config = {
        placement,
        strategy,
        middleware: latestMiddleware
      };
      if (platformRef.current) {
        config.platform = platformRef.current;
      }
      computePosition(referenceRef.current, floatingRef.current, config).then(data => {
        const fullData = {
          ...data,
          // The floating element's position may be recomputed while it's closed
          // but still mounted (such as when transitioning out). To ensure
          // `isPositioned` will be `false` initially on the next open, avoid
          // setting it to `true` when `open === false` (must be specified).
          isPositioned: openRef.current !== false
        };
        if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
          dataRef.current = fullData;
          ReactDOM__namespace.flushSync(() => {
            setData(fullData);
          });
        }
      });
    }, [latestMiddleware, placement, strategy, platformRef, openRef]);
    index(() => {
      if (open === false && dataRef.current.isPositioned) {
        dataRef.current.isPositioned = false;
        setData(data => ({
          ...data,
          isPositioned: false
        }));
      }
    }, [open]);
    const isMountedRef = React__namespace.useRef(false);
    index(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);
    index(() => {
      if (referenceEl) referenceRef.current = referenceEl;
      if (floatingEl) floatingRef.current = floatingEl;
      if (referenceEl && floatingEl) {
        if (whileElementsMountedRef.current) {
          return whileElementsMountedRef.current(referenceEl, floatingEl, update);
        }
        update();
      }
    }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
    const refs = React__namespace.useMemo(() => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating
    }), [setReference, setFloating]);
    const elements = React__namespace.useMemo(() => ({
      reference: referenceEl,
      floating: floatingEl
    }), [referenceEl, floatingEl]);
    const floatingStyles = React__namespace.useMemo(() => {
      const initialStyles = {
        position: strategy,
        left: 0,
        top: 0
      };
      if (!elements.floating) {
        return initialStyles;
      }
      const x = roundByDPR(elements.floating, data.x);
      const y = roundByDPR(elements.floating, data.y);
      if (transform) {
        return {
          ...initialStyles,
          transform: "translate(" + x + "px, " + y + "px)",
          ...(getDPR(elements.floating) >= 1.5 && {
            willChange: 'transform'
          })
        };
      }
      return {
        position: strategy,
        left: x,
        top: y
      };
    }, [strategy, transform, elements.floating, data.x, data.y]);
    return React__namespace.useMemo(() => ({
      ...data,
      update,
      refs,
      elements,
      floatingStyles
    }), [data, update, refs, elements, floatingStyles]);
  }

  /**
   * Provides data to position an inner element of the floating element so that it
   * appears centered to the reference element.
   * This wraps the core `arrow` middleware to allow React refs as the element.
   * @see https://floating-ui.com/docs/arrow
   */
  const arrow$1 = options => {
    function isRef(value) {
      return {}.hasOwnProperty.call(value, 'current');
    }
    return {
      name: 'arrow',
      options,
      fn(state) {
        const {
          element,
          padding
        } = typeof options === 'function' ? options(state) : options;
        if (element && isRef(element)) {
          if (element.current != null) {
            return arrow$2({
              element: element.current,
              padding
            }).fn(state);
          }
          return {};
        }
        if (element) {
          return arrow$2({
            element,
            padding
          }).fn(state);
        }
        return {};
      }
    };
  };

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  const offset = (options, deps) => ({
    ...offset$1(options),
    options: [options, deps]
  });

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift = (options, deps) => ({
    ...shift$1(options),
    options: [options, deps]
  });

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip = (options, deps) => ({
    ...flip$1(options),
    options: [options, deps]
  });

  /**
   * Provides improved positioning for inline reference elements that can span
   * over multiple lines, such as hyperlinks or range selections.
   * @see https://floating-ui.com/docs/inline
   */
  const inline = (options, deps) => ({
    ...inline$1(options),
    options: [options, deps]
  });

  /**
   * Provides data to position an inner element of the floating element so that it
   * appears centered to the reference element.
   * This wraps the core `arrow` middleware to allow React refs as the element.
   * @see https://floating-ui.com/docs/arrow
   */
  const arrow = (options, deps) => ({
    ...arrow$1(options),
    options: [options, deps]
  });

  const FOCUSABLE_ATTRIBUTE = 'data-floating-ui-focusable';
  const ACTIVE_KEY = 'active';
  const SELECTED_KEY = 'selected';

  // https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
  const SafeReact = {
    ...React__namespace
  };

  let serverHandoffComplete = false;
  let count = 0;
  const genId = () => // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++;
  function useFloatingId() {
    const [id, setId] = React__namespace.useState(() => serverHandoffComplete ? genId() : undefined);
    index$1(() => {
      if (id == null) {
        setId(genId());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React__namespace.useEffect(() => {
      serverHandoffComplete = true;
    }, []);
    return id;
  }
  const useReactId = SafeReact.useId;

  /**
   * Uses React 18's built-in `useId()` when available, or falls back to a
   * slightly less performant (requiring a double render) implementation for
   * earlier React versions.
   * @see https://floating-ui.com/docs/react-utils#useid
   */
  const useId = useReactId || useFloatingId;

  let devMessageSet;
  {
    devMessageSet = /*#__PURE__*/new Set();
  }
  function warn() {
    var _devMessageSet;
    for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
      messages[_key] = arguments[_key];
    }
    const message = "Floating UI: " + messages.join(' ');
    if (!((_devMessageSet = devMessageSet) != null && _devMessageSet.has(message))) {
      var _devMessageSet2;
      (_devMessageSet2 = devMessageSet) == null || _devMessageSet2.add(message);
      console.warn(message);
    }
  }
  function error() {
    var _devMessageSet3;
    for (var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      messages[_key2] = arguments[_key2];
    }
    const message = "Floating UI: " + messages.join(' ');
    if (!((_devMessageSet3 = devMessageSet) != null && _devMessageSet3.has(message))) {
      var _devMessageSet4;
      (_devMessageSet4 = devMessageSet) == null || _devMessageSet4.add(message);
      console.error(message);
    }
  }

  /**
   * Renders a pointing arrow triangle.
   * @see https://floating-ui.com/docs/FloatingArrow
   */
  const FloatingArrow = /*#__PURE__*/React__namespace.forwardRef(function FloatingArrow(props, ref) {
    const {
      context: {
        placement,
        elements: {
          floating
        },
        middlewareData: {
          arrow,
          shift
        }
      },
      width = 14,
      height = 7,
      tipRadius = 0,
      strokeWidth = 0,
      staticOffset,
      stroke,
      d,
      style: {
        transform,
        ...restStyle
      } = {},
      ...rest
    } = props;
    {
      if (!ref) {
        warn('The `ref` prop is required for `FloatingArrow`.');
      }
    }
    const clipPathId = useId();
    const [isRTL, setIsRTL] = React__namespace.useState(false);

    // https://github.com/floating-ui/floating-ui/issues/2932
    index$1(() => {
      if (!floating) return;
      const isRTL = getComputedStyle$1(floating).direction === 'rtl';
      if (isRTL) {
        setIsRTL(true);
      }
    }, [floating]);
    if (!floating) {
      return null;
    }
    const [side, alignment] = placement.split('-');
    const isVerticalSide = side === 'top' || side === 'bottom';
    let computedStaticOffset = staticOffset;
    if (isVerticalSide && shift != null && shift.x || !isVerticalSide && shift != null && shift.y) {
      computedStaticOffset = null;
    }

    // Strokes must be double the border width, this ensures the stroke's width
    // works as you'd expect.
    const computedStrokeWidth = strokeWidth * 2;
    const halfStrokeWidth = computedStrokeWidth / 2;
    const svgX = width / 2 * (tipRadius / -8 + 1);
    const svgY = height / 2 * tipRadius / 4;
    const isCustomShape = !!d;
    const yOffsetProp = computedStaticOffset && alignment === 'end' ? 'bottom' : 'top';
    let xOffsetProp = computedStaticOffset && alignment === 'end' ? 'right' : 'left';
    if (computedStaticOffset && isRTL) {
      xOffsetProp = alignment === 'end' ? 'left' : 'right';
    }
    const arrowX = (arrow == null ? void 0 : arrow.x) != null ? computedStaticOffset || arrow.x : '';
    const arrowY = (arrow == null ? void 0 : arrow.y) != null ? computedStaticOffset || arrow.y : '';
    const dValue = d || 'M0,0' + (" H" + width) + (" L" + (width - svgX) + "," + (height - svgY)) + (" Q" + width / 2 + "," + height + " " + svgX + "," + (height - svgY)) + ' Z';
    const rotation = {
      top: isCustomShape ? 'rotate(180deg)' : '',
      left: isCustomShape ? 'rotate(90deg)' : 'rotate(-90deg)',
      bottom: isCustomShape ? '' : 'rotate(180deg)',
      right: isCustomShape ? 'rotate(-90deg)' : 'rotate(90deg)'
    }[side];
    return /*#__PURE__*/jsxRuntimeExports.jsxs("svg", {
      ...rest,
      "aria-hidden": true,
      ref: ref,
      width: isCustomShape ? width : width + computedStrokeWidth,
      height: width,
      viewBox: "0 0 " + width + " " + (height > width ? height : width),
      style: {
        position: 'absolute',
        pointerEvents: 'none',
        [xOffsetProp]: arrowX,
        [yOffsetProp]: arrowY,
        [side]: isVerticalSide || isCustomShape ? '100%' : "calc(100% - " + computedStrokeWidth / 2 + "px)",
        transform: [rotation, transform].filter(t => !!t).join(' '),
        ...restStyle
      },
      children: [computedStrokeWidth > 0 && /*#__PURE__*/jsxRuntimeExports.jsx("path", {
        clipPath: "url(#" + clipPathId + ")",
        fill: "none",
        stroke: stroke
        // Account for the stroke on the fill path rendered below.
        ,
        strokeWidth: computedStrokeWidth + (d ? 0 : 1),
        d: dValue
      }), /*#__PURE__*/jsxRuntimeExports.jsx("path", {
        stroke: computedStrokeWidth && !d ? rest.fill : 'none',
        d: dValue
      }), /*#__PURE__*/jsxRuntimeExports.jsx("clipPath", {
        id: clipPathId,
        children: /*#__PURE__*/jsxRuntimeExports.jsx("rect", {
          x: -halfStrokeWidth,
          y: halfStrokeWidth * (isCustomShape ? -1 : 1),
          width: width + computedStrokeWidth,
          height: width
        })
      })]
    });
  });

  function createEventEmitter() {
    const map = new Map();
    return {
      emit(event, data) {
        var _map$get;
        (_map$get = map.get(event)) == null || _map$get.forEach(listener => listener(data));
      },
      on(event, listener) {
        if (!map.has(event)) {
          map.set(event, new Set());
        }
        map.get(event).add(listener);
      },
      off(event, listener) {
        var _map$get2;
        (_map$get2 = map.get(event)) == null || _map$get2.delete(listener);
      }
    };
  }

  const FloatingNodeContext = /*#__PURE__*/React__namespace.createContext(null);
  const FloatingTreeContext = /*#__PURE__*/React__namespace.createContext(null);

  /**
   * Returns the parent node id for nested floating elements, if available.
   * Returns `null` for top-level floating elements.
   */
  const useFloatingParentNodeId = () => {
    var _React$useContext;
    return ((_React$useContext = React__namespace.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
  };

  /**
   * Returns the nearest floating tree context, if available.
   */
  const useFloatingTree = () => React__namespace.useContext(FloatingTreeContext);

  function createAttribute(name) {
    return "data-floating-ui-" + name;
  }

  function clearTimeoutIfSet(timeoutRef) {
    if (timeoutRef.current !== -1) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = -1;
    }
  }

  const safePolygonIdentifier = /*#__PURE__*/createAttribute('safe-polygon');
  function getDelay(value, prop, pointerType) {
    if (pointerType && !isMouseLikePointerType(pointerType)) {
      return 0;
    }
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'function') {
      const result = value();
      if (typeof result === 'number') {
        return result;
      }
      return result == null ? void 0 : result[prop];
    }
    return value == null ? void 0 : value[prop];
  }
  function getRestMs(value) {
    if (typeof value === 'function') {
      return value();
    }
    return value;
  }
  /**
   * Opens the floating element while hovering over the reference element, like
   * CSS `:hover`.
   * @see https://floating-ui.com/docs/useHover
   */
  function useHover(context, props) {
    if (props === void 0) {
      props = {};
    }
    const {
      open,
      onOpenChange,
      dataRef,
      events,
      elements
    } = context;
    const {
      enabled = true,
      delay = 0,
      handleClose = null,
      mouseOnly = false,
      restMs = 0,
      move = true
    } = props;
    const tree = useFloatingTree();
    const parentId = useFloatingParentNodeId();
    const handleCloseRef = useLatestRef$1(handleClose);
    const delayRef = useLatestRef$1(delay);
    const openRef = useLatestRef$1(open);
    const restMsRef = useLatestRef$1(restMs);
    const pointerTypeRef = React__namespace.useRef();
    const timeoutRef = React__namespace.useRef(-1);
    const handlerRef = React__namespace.useRef();
    const restTimeoutRef = React__namespace.useRef(-1);
    const blockMouseMoveRef = React__namespace.useRef(true);
    const performedPointerEventsMutationRef = React__namespace.useRef(false);
    const unbindMouseMoveRef = React__namespace.useRef(() => {});
    const restTimeoutPendingRef = React__namespace.useRef(false);
    const isHoverOpen = useEffectEvent(() => {
      var _dataRef$current$open;
      const type = (_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type;
      return (type == null ? void 0 : type.includes('mouse')) && type !== 'mousedown';
    });

    // When closing before opening, clear the delay timeouts to cancel it
    // from showing.
    React__namespace.useEffect(() => {
      if (!enabled) return;
      function onOpenChange(_ref) {
        let {
          open
        } = _ref;
        if (!open) {
          clearTimeoutIfSet(timeoutRef);
          clearTimeoutIfSet(restTimeoutRef);
          blockMouseMoveRef.current = true;
          restTimeoutPendingRef.current = false;
        }
      }
      events.on('openchange', onOpenChange);
      return () => {
        events.off('openchange', onOpenChange);
      };
    }, [enabled, events]);
    React__namespace.useEffect(() => {
      if (!enabled) return;
      if (!handleCloseRef.current) return;
      if (!open) return;
      function onLeave(event) {
        if (isHoverOpen()) {
          onOpenChange(false, event, 'hover');
        }
      }
      const html = getDocument$1(elements.floating).documentElement;
      html.addEventListener('mouseleave', onLeave);
      return () => {
        html.removeEventListener('mouseleave', onLeave);
      };
    }, [elements.floating, open, onOpenChange, enabled, handleCloseRef, isHoverOpen]);
    const closeWithDelay = React__namespace.useCallback(function (event, runElseBranch, reason) {
      if (runElseBranch === void 0) {
        runElseBranch = true;
      }
      if (reason === void 0) {
        reason = 'hover';
      }
      const closeDelay = getDelay(delayRef.current, 'close', pointerTypeRef.current);
      if (closeDelay && !handlerRef.current) {
        clearTimeoutIfSet(timeoutRef);
        timeoutRef.current = window.setTimeout(() => onOpenChange(false, event, reason), closeDelay);
      } else if (runElseBranch) {
        clearTimeoutIfSet(timeoutRef);
        onOpenChange(false, event, reason);
      }
    }, [delayRef, onOpenChange]);
    const cleanupMouseMoveHandler = useEffectEvent(() => {
      unbindMouseMoveRef.current();
      handlerRef.current = undefined;
    });
    const clearPointerEvents = useEffectEvent(() => {
      if (performedPointerEventsMutationRef.current) {
        const body = getDocument$1(elements.floating).body;
        body.style.pointerEvents = '';
        body.removeAttribute(safePolygonIdentifier);
        performedPointerEventsMutationRef.current = false;
      }
    });
    const isClickLikeOpenEvent = useEffectEvent(() => {
      return dataRef.current.openEvent ? ['click', 'mousedown'].includes(dataRef.current.openEvent.type) : false;
    });

    // Registering the mouse events on the reference directly to bypass React's
    // delegation system. If the cursor was on a disabled element and then entered
    // the reference (no gap), `mouseenter` doesn't fire in the delegation system.
    React__namespace.useEffect(() => {
      if (!enabled) return;
      function onReferenceMouseEnter(event) {
        clearTimeoutIfSet(timeoutRef);
        blockMouseMoveRef.current = false;
        if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current) || getRestMs(restMsRef.current) > 0 && !getDelay(delayRef.current, 'open')) {
          return;
        }
        const openDelay = getDelay(delayRef.current, 'open', pointerTypeRef.current);
        if (openDelay) {
          timeoutRef.current = window.setTimeout(() => {
            if (!openRef.current) {
              onOpenChange(true, event, 'hover');
            }
          }, openDelay);
        } else if (!open) {
          onOpenChange(true, event, 'hover');
        }
      }
      function onReferenceMouseLeave(event) {
        if (isClickLikeOpenEvent()) {
          clearPointerEvents();
          return;
        }
        unbindMouseMoveRef.current();
        const doc = getDocument$1(elements.floating);
        clearTimeoutIfSet(restTimeoutRef);
        restTimeoutPendingRef.current = false;
        if (handleCloseRef.current && dataRef.current.floatingContext) {
          // Prevent clearing `onScrollMouseLeave` timeout.
          if (!open) {
            clearTimeoutIfSet(timeoutRef);
          }
          handlerRef.current = handleCloseRef.current({
            ...dataRef.current.floatingContext,
            tree,
            x: event.clientX,
            y: event.clientY,
            onClose() {
              clearPointerEvents();
              cleanupMouseMoveHandler();
              if (!isClickLikeOpenEvent()) {
                closeWithDelay(event, true, 'safe-polygon');
              }
            }
          });
          const handler = handlerRef.current;
          doc.addEventListener('mousemove', handler);
          unbindMouseMoveRef.current = () => {
            doc.removeEventListener('mousemove', handler);
          };
          return;
        }

        // Allow interactivity without `safePolygon` on touch devices. With a
        // pointer, a short close delay is an alternative, so it should work
        // consistently.
        const shouldClose = pointerTypeRef.current === 'touch' ? !contains$1(elements.floating, event.relatedTarget) : true;
        if (shouldClose) {
          closeWithDelay(event);
        }
      }

      // Ensure the floating element closes after scrolling even if the pointer
      // did not move.
      // https://github.com/floating-ui/floating-ui/discussions/1692
      function onScrollMouseLeave(event) {
        if (isClickLikeOpenEvent()) return;
        if (!dataRef.current.floatingContext) return;
        handleCloseRef.current == null || handleCloseRef.current({
          ...dataRef.current.floatingContext,
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            clearPointerEvents();
            cleanupMouseMoveHandler();
            if (!isClickLikeOpenEvent()) {
              closeWithDelay(event);
            }
          }
        })(event);
      }
      function onFloatingMouseEnter() {
        clearTimeoutIfSet(timeoutRef);
      }
      function onFloatingMouseLeave(event) {
        if (!isClickLikeOpenEvent()) {
          closeWithDelay(event, false);
        }
      }
      if (isElement(elements.domReference)) {
        const reference = elements.domReference;
        const floating = elements.floating;
        if (open) {
          reference.addEventListener('mouseleave', onScrollMouseLeave);
        }
        if (move) {
          reference.addEventListener('mousemove', onReferenceMouseEnter, {
            once: true
          });
        }
        reference.addEventListener('mouseenter', onReferenceMouseEnter);
        reference.addEventListener('mouseleave', onReferenceMouseLeave);
        if (floating) {
          floating.addEventListener('mouseleave', onScrollMouseLeave);
          floating.addEventListener('mouseenter', onFloatingMouseEnter);
          floating.addEventListener('mouseleave', onFloatingMouseLeave);
        }
        return () => {
          if (open) {
            reference.removeEventListener('mouseleave', onScrollMouseLeave);
          }
          if (move) {
            reference.removeEventListener('mousemove', onReferenceMouseEnter);
          }
          reference.removeEventListener('mouseenter', onReferenceMouseEnter);
          reference.removeEventListener('mouseleave', onReferenceMouseLeave);
          if (floating) {
            floating.removeEventListener('mouseleave', onScrollMouseLeave);
            floating.removeEventListener('mouseenter', onFloatingMouseEnter);
            floating.removeEventListener('mouseleave', onFloatingMouseLeave);
          }
        };
      }
    }, [elements, enabled, context, mouseOnly, move, closeWithDelay, cleanupMouseMoveHandler, clearPointerEvents, onOpenChange, open, openRef, tree, delayRef, handleCloseRef, dataRef, isClickLikeOpenEvent, restMsRef]);

    // Block pointer-events of every element other than the reference and floating
    // while the floating element is open and has a `handleClose` handler. Also
    // handles nested floating elements.
    // https://github.com/floating-ui/floating-ui/issues/1722
    index$1(() => {
      var _handleCloseRef$curre;
      if (!enabled) return;
      if (open && (_handleCloseRef$curre = handleCloseRef.current) != null && (_handleCloseRef$curre = _handleCloseRef$curre.__options) != null && _handleCloseRef$curre.blockPointerEvents && isHoverOpen()) {
        performedPointerEventsMutationRef.current = true;
        const floatingEl = elements.floating;
        if (isElement(elements.domReference) && floatingEl) {
          var _tree$nodesRef$curren;
          const body = getDocument$1(elements.floating).body;
          body.setAttribute(safePolygonIdentifier, '');
          const ref = elements.domReference;
          const parentFloating = tree == null || (_tree$nodesRef$curren = tree.nodesRef.current.find(node => node.id === parentId)) == null || (_tree$nodesRef$curren = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren.elements.floating;
          if (parentFloating) {
            parentFloating.style.pointerEvents = '';
          }
          body.style.pointerEvents = 'none';
          ref.style.pointerEvents = 'auto';
          floatingEl.style.pointerEvents = 'auto';
          return () => {
            body.style.pointerEvents = '';
            ref.style.pointerEvents = '';
            floatingEl.style.pointerEvents = '';
          };
        }
      }
    }, [enabled, open, parentId, elements, tree, handleCloseRef, isHoverOpen]);
    index$1(() => {
      if (!open) {
        pointerTypeRef.current = undefined;
        restTimeoutPendingRef.current = false;
        cleanupMouseMoveHandler();
        clearPointerEvents();
      }
    }, [open, cleanupMouseMoveHandler, clearPointerEvents]);
    React__namespace.useEffect(() => {
      return () => {
        cleanupMouseMoveHandler();
        clearTimeoutIfSet(timeoutRef);
        clearTimeoutIfSet(restTimeoutRef);
        clearPointerEvents();
      };
    }, [enabled, elements.domReference, cleanupMouseMoveHandler, clearPointerEvents]);
    const reference = React__namespace.useMemo(() => {
      function setPointerRef(event) {
        pointerTypeRef.current = event.pointerType;
      }
      return {
        onPointerDown: setPointerRef,
        onPointerEnter: setPointerRef,
        onMouseMove(event) {
          const {
            nativeEvent
          } = event;
          function handleMouseMove() {
            if (!blockMouseMoveRef.current && !openRef.current) {
              onOpenChange(true, nativeEvent, 'hover');
            }
          }
          if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current)) {
            return;
          }
          if (open || getRestMs(restMsRef.current) === 0) {
            return;
          }

          // Ignore insignificant movements to account for tremors.
          if (restTimeoutPendingRef.current && event.movementX ** 2 + event.movementY ** 2 < 2) {
            return;
          }
          clearTimeoutIfSet(restTimeoutRef);
          if (pointerTypeRef.current === 'touch') {
            handleMouseMove();
          } else {
            restTimeoutPendingRef.current = true;
            restTimeoutRef.current = window.setTimeout(handleMouseMove, getRestMs(restMsRef.current));
          }
        }
      };
    }, [mouseOnly, onOpenChange, open, openRef, restMsRef]);
    return React__namespace.useMemo(() => enabled ? {
      reference
    } : {}, [enabled, reference]);
  }

  let rafId = 0;
  function enqueueFocus(el, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      preventScroll = false,
      cancelPrevious = true,
      sync = false
    } = options;
    cancelPrevious && cancelAnimationFrame(rafId);
    const exec = () => el == null ? void 0 : el.focus({
      preventScroll
    });
    if (sync) {
      exec();
    } else {
      rafId = requestAnimationFrame(exec);
    }
  }

  function contains(parent, child) {
    if (!parent || !child) {
      return false;
    }
    const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();

    // First, attempt with faster native method
    if (parent.contains(child)) {
      return true;
    }

    // then fallback to custom implementation with Shadow DOM support
    if (rootNode && isShadowRoot(rootNode)) {
      let next = child;
      while (next) {
        if (parent === next) {
          return true;
        }
        // @ts-ignore
        next = next.parentNode || next.host;
      }
    }

    // Give up, the result is false
    return false;
  }
  function getTarget(event) {
    if ('composedPath' in event) {
      return event.composedPath()[0];
    }

    // TS thinks `event` is of type never as it assumes all browsers support
    // `composedPath()`, but browsers without shadow DOM don't.
    return event.target;
  }
  function getDocument(node) {
    return (node == null ? void 0 : node.ownerDocument) || document;
  }

  // Modified to add conditional `aria-hidden` support:
  // https://github.com/theKashey/aria-hidden/blob/9220c8f4a4fd35f63bee5510a9f41a37264382d4/src/index.ts
  const counters = {
    inert: /*#__PURE__*/new WeakMap(),
    'aria-hidden': /*#__PURE__*/new WeakMap(),
    none: /*#__PURE__*/new WeakMap()
  };
  function getCounterMap(control) {
    if (control === 'inert') return counters.inert;
    if (control === 'aria-hidden') return counters['aria-hidden'];
    return counters.none;
  }
  let uncontrolledElementsSet = /*#__PURE__*/new WeakSet();
  let markerMap = {};
  let lockCount$1 = 0;
  const supportsInert = () => typeof HTMLElement !== 'undefined' && 'inert' in HTMLElement.prototype;
  const unwrapHost = node => node && (node.host || unwrapHost(node.parentNode));
  const correctElements = (parent, targets) => targets.map(target => {
    if (parent.contains(target)) {
      return target;
    }
    const correctedTarget = unwrapHost(target);
    if (parent.contains(correctedTarget)) {
      return correctedTarget;
    }
    return null;
  }).filter(x => x != null);
  function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert) {
    const markerName = 'data-floating-ui-inert';
    const controlAttribute = inert ? 'inert' : ariaHidden ? 'aria-hidden' : null;
    const avoidElements = correctElements(body, uncorrectedAvoidElements);
    const elementsToKeep = new Set();
    const elementsToStop = new Set(avoidElements);
    const hiddenElements = [];
    if (!markerMap[markerName]) {
      markerMap[markerName] = new WeakMap();
    }
    const markerCounter = markerMap[markerName];
    avoidElements.forEach(keep);
    deep(body);
    elementsToKeep.clear();
    function keep(el) {
      if (!el || elementsToKeep.has(el)) {
        return;
      }
      elementsToKeep.add(el);
      el.parentNode && keep(el.parentNode);
    }
    function deep(parent) {
      if (!parent || elementsToStop.has(parent)) {
        return;
      }
      [].forEach.call(parent.children, node => {
        if (getNodeName(node) === 'script') return;
        if (elementsToKeep.has(node)) {
          deep(node);
        } else {
          const attr = controlAttribute ? node.getAttribute(controlAttribute) : null;
          const alreadyHidden = attr !== null && attr !== 'false';
          const counterMap = getCounterMap(controlAttribute);
          const counterValue = (counterMap.get(node) || 0) + 1;
          const markerValue = (markerCounter.get(node) || 0) + 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          hiddenElements.push(node);
          if (counterValue === 1 && alreadyHidden) {
            uncontrolledElementsSet.add(node);
          }
          if (markerValue === 1) {
            node.setAttribute(markerName, '');
          }
          if (!alreadyHidden && controlAttribute) {
            node.setAttribute(controlAttribute, controlAttribute === 'inert' ? '' : 'true');
          }
        }
      });
    }
    lockCount$1++;
    return () => {
      hiddenElements.forEach(element => {
        const counterMap = getCounterMap(controlAttribute);
        const currentCounterValue = counterMap.get(element) || 0;
        const counterValue = currentCounterValue - 1;
        const markerValue = (markerCounter.get(element) || 0) - 1;
        counterMap.set(element, counterValue);
        markerCounter.set(element, markerValue);
        if (!counterValue) {
          if (!uncontrolledElementsSet.has(element) && controlAttribute) {
            element.removeAttribute(controlAttribute);
          }
          uncontrolledElementsSet.delete(element);
        }
        if (!markerValue) {
          element.removeAttribute(markerName);
        }
      });
      lockCount$1--;
      if (!lockCount$1) {
        counters.inert = new WeakMap();
        counters['aria-hidden'] = new WeakMap();
        counters.none = new WeakMap();
        uncontrolledElementsSet = new WeakSet();
        markerMap = {};
      }
    };
  }
  function markOthers(avoidElements, ariaHidden, inert) {
    if (ariaHidden === void 0) {
      ariaHidden = false;
    }
    if (inert === void 0) {
      inert = false;
    }
    const body = getDocument(avoidElements[0]).body;
    return applyAttributeToOthers(avoidElements.concat(Array.from(body.querySelectorAll('[aria-live]'))), body, ariaHidden, inert);
  }

  const HIDDEN_STYLES = {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: '1px',
    top: 0,
    left: 0
  };
  const FocusGuard = /*#__PURE__*/React__namespace.forwardRef(function FocusGuard(props, ref) {
    const [role, setRole] = React__namespace.useState();
    index$1(() => {
      if (isSafari()) {
        // Unlike other screen readers such as NVDA and JAWS, the virtual cursor
        // on VoiceOver does trigger the onFocus event, so we can use the focus
        // trap element. On Safari, only buttons trigger the onFocus event.
        // NB: "group" role in the Sandbox no longer appears to work, must be a
        // button role.
        setRole('button');
      }
    }, []);
    const restProps = {
      ref,
      tabIndex: 0,
      // Role is only for VoiceOver
      role,
      'aria-hidden': role ? undefined : true,
      [createAttribute('focus-guard')]: '',
      style: HIDDEN_STYLES
    };
    return /*#__PURE__*/jsxRuntimeExports.jsx("span", {
      ...props,
      ...restProps
    });
  });

  const PortalContext = /*#__PURE__*/React__namespace.createContext(null);
  const attr = /*#__PURE__*/createAttribute('portal');
  /**
   * @see https://floating-ui.com/docs/FloatingPortal#usefloatingportalnode
   */
  function useFloatingPortalNode(props) {
    if (props === void 0) {
      props = {};
    }
    const {
      id,
      root
    } = props;
    const uniqueId = useId();
    const portalContext = usePortalContext();
    const [portalNode, setPortalNode] = React__namespace.useState(null);
    const portalNodeRef = React__namespace.useRef(null);
    index$1(() => {
      return () => {
        portalNode == null || portalNode.remove();
        // Allow the subsequent layout effects to create a new node on updates.
        // The portal node will still be cleaned up on unmount.
        // https://github.com/floating-ui/floating-ui/issues/2454
        queueMicrotask(() => {
          portalNodeRef.current = null;
        });
      };
    }, [portalNode]);
    index$1(() => {
      // Wait for the uniqueId to be generated before creating the portal node in
      // React <18 (using `useFloatingId` instead of the native `useId`).
      // https://github.com/floating-ui/floating-ui/issues/2778
      if (!uniqueId) return;
      if (portalNodeRef.current) return;
      const existingIdRoot = id ? document.getElementById(id) : null;
      if (!existingIdRoot) return;
      const subRoot = document.createElement('div');
      subRoot.id = uniqueId;
      subRoot.setAttribute(attr, '');
      existingIdRoot.appendChild(subRoot);
      portalNodeRef.current = subRoot;
      setPortalNode(subRoot);
    }, [id, uniqueId]);
    index$1(() => {
      // Wait for the root to exist before creating the portal node. The root must
      // be stored in state, not a ref, for this to work reactively.
      if (root === null) return;
      if (!uniqueId) return;
      if (portalNodeRef.current) return;
      let container = root || (portalContext == null ? void 0 : portalContext.portalNode);
      if (container && !isElement(container)) container = container.current;
      container = container || document.body;
      let idWrapper = null;
      if (id) {
        idWrapper = document.createElement('div');
        idWrapper.id = id;
        container.appendChild(idWrapper);
      }
      const subRoot = document.createElement('div');
      subRoot.id = uniqueId;
      subRoot.setAttribute(attr, '');
      container = idWrapper || container;
      container.appendChild(subRoot);
      portalNodeRef.current = subRoot;
      setPortalNode(subRoot);
    }, [id, root, uniqueId, portalContext]);
    return portalNode;
  }
  /**
   * Portals the floating element into a given container element — by default,
   * outside of the app root and into the body.
   * This is necessary to ensure the floating element can appear outside any
   * potential parent containers that cause clipping (such as `overflow: hidden`),
   * while retaining its location in the React tree.
   * @see https://floating-ui.com/docs/FloatingPortal
   */
  function FloatingPortal(props) {
    const {
      children,
      id,
      root,
      preserveTabOrder = true
    } = props;
    const portalNode = useFloatingPortalNode({
      id,
      root
    });
    const [focusManagerState, setFocusManagerState] = React__namespace.useState(null);
    const beforeOutsideRef = React__namespace.useRef(null);
    const afterOutsideRef = React__namespace.useRef(null);
    const beforeInsideRef = React__namespace.useRef(null);
    const afterInsideRef = React__namespace.useRef(null);
    const modal = focusManagerState == null ? void 0 : focusManagerState.modal;
    const open = focusManagerState == null ? void 0 : focusManagerState.open;
    const shouldRenderGuards =
    // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!focusManagerState &&
    // Guards are only for non-modal focus management.
    !focusManagerState.modal &&
    // Don't render if unmount is transitioning.
    focusManagerState.open && preserveTabOrder && !!(root || portalNode);

    // https://codesandbox.io/s/tabbable-portal-f4tng?file=/src/TabbablePortal.tsx
    React__namespace.useEffect(() => {
      if (!portalNode || !preserveTabOrder || modal) {
        return;
      }

      // Make sure elements inside the portal element are tabbable only when the
      // portal has already been focused, either by tabbing into a focus trap
      // element outside or using the mouse.
      function onFocus(event) {
        if (portalNode && isOutsideEvent(event)) {
          const focusing = event.type === 'focusin';
          const manageFocus = focusing ? enableFocusInside : disableFocusInside;
          manageFocus(portalNode);
        }
      }
      // Listen to the event on the capture phase so they run before the focus
      // trap elements onFocus prop is called.
      portalNode.addEventListener('focusin', onFocus, true);
      portalNode.addEventListener('focusout', onFocus, true);
      return () => {
        portalNode.removeEventListener('focusin', onFocus, true);
        portalNode.removeEventListener('focusout', onFocus, true);
      };
    }, [portalNode, preserveTabOrder, modal]);
    React__namespace.useEffect(() => {
      if (!portalNode) return;
      if (open) return;
      enableFocusInside(portalNode);
    }, [open, portalNode]);
    return /*#__PURE__*/jsxRuntimeExports.jsxs(PortalContext.Provider, {
      value: React__namespace.useMemo(() => ({
        preserveTabOrder,
        beforeOutsideRef,
        afterOutsideRef,
        beforeInsideRef,
        afterInsideRef,
        portalNode,
        setFocusManagerState
      }), [preserveTabOrder, portalNode]),
      children: [shouldRenderGuards && portalNode && /*#__PURE__*/jsxRuntimeExports.jsx(FocusGuard, {
        "data-type": "outside",
        ref: beforeOutsideRef,
        onFocus: event => {
          if (isOutsideEvent(event, portalNode)) {
            var _beforeInsideRef$curr;
            (_beforeInsideRef$curr = beforeInsideRef.current) == null || _beforeInsideRef$curr.focus();
          } else {
            const domReference = focusManagerState ? focusManagerState.domReference : null;
            const prevTabbable = getPreviousTabbable(domReference);
            prevTabbable == null || prevTabbable.focus();
          }
        }
      }), shouldRenderGuards && portalNode && /*#__PURE__*/jsxRuntimeExports.jsx("span", {
        "aria-owns": portalNode.id,
        style: HIDDEN_STYLES
      }), portalNode && /*#__PURE__*/ReactDOM__namespace.createPortal(children, portalNode), shouldRenderGuards && portalNode && /*#__PURE__*/jsxRuntimeExports.jsx(FocusGuard, {
        "data-type": "outside",
        ref: afterOutsideRef,
        onFocus: event => {
          if (isOutsideEvent(event, portalNode)) {
            var _afterInsideRef$curre;
            (_afterInsideRef$curre = afterInsideRef.current) == null || _afterInsideRef$curre.focus();
          } else {
            const domReference = focusManagerState ? focusManagerState.domReference : null;
            const nextTabbable = getNextTabbable(domReference);
            nextTabbable == null || nextTabbable.focus();
            (focusManagerState == null ? void 0 : focusManagerState.closeOnFocusOut) && (focusManagerState == null ? void 0 : focusManagerState.onOpenChange(false, event.nativeEvent, 'focus-out'));
          }
        }
      })]
    });
  }
  const usePortalContext = () => React__namespace.useContext(PortalContext);

  function useLiteMergeRefs(refs) {
    return React__namespace.useMemo(() => {
      return value => {
        refs.forEach(ref => {
          if (ref) {
            ref.current = value;
          }
        });
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs);
  }

  const LIST_LIMIT = 20;
  let previouslyFocusedElements = [];
  function addPreviouslyFocusedElement(element) {
    previouslyFocusedElements = previouslyFocusedElements.filter(el => el.isConnected);
    if (element && getNodeName(element) !== 'body') {
      previouslyFocusedElements.push(element);
      if (previouslyFocusedElements.length > LIST_LIMIT) {
        previouslyFocusedElements = previouslyFocusedElements.slice(-20);
      }
    }
  }
  function getPreviouslyFocusedElement() {
    return previouslyFocusedElements.slice().reverse().find(el => el.isConnected);
  }
  function getFirstTabbableElement(container) {
    const tabbableOptions = getTabbableOptions();
    if (isTabbable(container, tabbableOptions)) {
      return container;
    }
    return tabbable(container, tabbableOptions)[0] || container;
  }
  function handleTabIndex(floatingFocusElement, orderRef) {
    var _floatingFocusElement;
    if (!orderRef.current.includes('floating') && !((_floatingFocusElement = floatingFocusElement.getAttribute('role')) != null && _floatingFocusElement.includes('dialog'))) {
      return;
    }
    const options = getTabbableOptions();
    const focusableElements = focusable(floatingFocusElement, options);
    const tabbableContent = focusableElements.filter(element => {
      const dataTabIndex = element.getAttribute('data-tabindex') || '';
      return isTabbable(element, options) || element.hasAttribute('data-tabindex') && !dataTabIndex.startsWith('-');
    });
    const tabIndex = floatingFocusElement.getAttribute('tabindex');
    if (orderRef.current.includes('floating') || tabbableContent.length === 0) {
      if (tabIndex !== '0') {
        floatingFocusElement.setAttribute('tabindex', '0');
      }
    } else if (tabIndex !== '-1' || floatingFocusElement.hasAttribute('data-tabindex') && floatingFocusElement.getAttribute('data-tabindex') !== '-1') {
      floatingFocusElement.setAttribute('tabindex', '-1');
      floatingFocusElement.setAttribute('data-tabindex', '-1');
    }
  }
  const VisuallyHiddenDismiss = /*#__PURE__*/React__namespace.forwardRef(function VisuallyHiddenDismiss(props, ref) {
    return /*#__PURE__*/jsxRuntimeExports.jsx("button", {
      ...props,
      type: "button",
      ref: ref,
      tabIndex: -1,
      style: HIDDEN_STYLES
    });
  });
  /**
   * Provides focus management for the floating element.
   * @see https://floating-ui.com/docs/FloatingFocusManager
   */
  function FloatingFocusManager(props) {
    const {
      context,
      children,
      disabled = false,
      order = ['content'],
      guards: _guards = true,
      initialFocus = 0,
      returnFocus = true,
      restoreFocus = false,
      modal = true,
      visuallyHiddenDismiss = false,
      closeOnFocusOut = true,
      outsideElementsInert = false,
      getInsideElements: _getInsideElements = () => []
    } = props;
    const {
      open,
      onOpenChange,
      events,
      dataRef,
      elements: {
        domReference,
        floating
      }
    } = context;
    const getNodeId = useEffectEvent(() => {
      var _dataRef$current$floa;
      return (_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.nodeId;
    });
    const getInsideElements = useEffectEvent(_getInsideElements);
    const ignoreInitialFocus = typeof initialFocus === 'number' && initialFocus < 0;
    // If the reference is a combobox and is typeable (e.g. input/textarea),
    // there are different focus semantics. The guards should not be rendered, but
    // aria-hidden should be applied to all nodes still. Further, the visually
    // hidden dismiss button should only appear at the end of the list, not the
    // start.
    const isUntrappedTypeableCombobox = isTypeableCombobox(domReference) && ignoreInitialFocus;

    // Force the guards to be rendered if the `inert` attribute is not supported.
    const inertSupported = supportsInert();
    const guards = inertSupported ? _guards : true;
    const useInert = !guards || inertSupported && outsideElementsInert;
    const orderRef = useLatestRef$1(order);
    const initialFocusRef = useLatestRef$1(initialFocus);
    const returnFocusRef = useLatestRef$1(returnFocus);
    const tree = useFloatingTree();
    const portalContext = usePortalContext();
    const startDismissButtonRef = React__namespace.useRef(null);
    const endDismissButtonRef = React__namespace.useRef(null);
    const preventReturnFocusRef = React__namespace.useRef(false);
    const isPointerDownRef = React__namespace.useRef(false);
    const tabbableIndexRef = React__namespace.useRef(-1);
    const isInsidePortal = portalContext != null;
    const floatingFocusElement = getFloatingFocusElement(floating);
    const getTabbableContent = useEffectEvent(function (container) {
      if (container === void 0) {
        container = floatingFocusElement;
      }
      return container ? tabbable(container, getTabbableOptions()) : [];
    });
    const getTabbableElements = useEffectEvent(container => {
      const content = getTabbableContent(container);
      return orderRef.current.map(type => {
        if (domReference && type === 'reference') {
          return domReference;
        }
        if (floatingFocusElement && type === 'floating') {
          return floatingFocusElement;
        }
        return content;
      }).filter(Boolean).flat();
    });
    React__namespace.useEffect(() => {
      if (disabled) return;
      if (!modal) return;
      function onKeyDown(event) {
        if (event.key === 'Tab') {
          // The focus guards have nothing to focus, so we need to stop the event.
          if (contains$1(floatingFocusElement, activeElement(getDocument$1(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
            stopEvent(event);
          }
          const els = getTabbableElements();
          const target = getTarget$1(event);
          if (orderRef.current[0] === 'reference' && target === domReference) {
            stopEvent(event);
            if (event.shiftKey) {
              enqueueFocus(els[els.length - 1]);
            } else {
              enqueueFocus(els[1]);
            }
          }
          if (orderRef.current[1] === 'floating' && target === floatingFocusElement && event.shiftKey) {
            stopEvent(event);
            enqueueFocus(els[0]);
          }
        }
      }
      const doc = getDocument$1(floatingFocusElement);
      doc.addEventListener('keydown', onKeyDown);
      return () => {
        doc.removeEventListener('keydown', onKeyDown);
      };
    }, [disabled, domReference, floatingFocusElement, modal, orderRef, isUntrappedTypeableCombobox, getTabbableContent, getTabbableElements]);
    React__namespace.useEffect(() => {
      if (disabled) return;
      if (!floating) return;
      function handleFocusIn(event) {
        const target = getTarget$1(event);
        const tabbableContent = getTabbableContent();
        const tabbableIndex = tabbableContent.indexOf(target);
        if (tabbableIndex !== -1) {
          tabbableIndexRef.current = tabbableIndex;
        }
      }
      floating.addEventListener('focusin', handleFocusIn);
      return () => {
        floating.removeEventListener('focusin', handleFocusIn);
      };
    }, [disabled, floating, getTabbableContent]);
    React__namespace.useEffect(() => {
      if (disabled) return;
      if (!closeOnFocusOut) return;

      // In Safari, buttons lose focus when pressing them.
      function handlePointerDown() {
        isPointerDownRef.current = true;
        setTimeout(() => {
          isPointerDownRef.current = false;
        });
      }
      function handleFocusOutside(event) {
        const relatedTarget = event.relatedTarget;
        const currentTarget = event.currentTarget;
        const target = getTarget$1(event);
        queueMicrotask(() => {
          const nodeId = getNodeId();
          const movedToUnrelatedNode = !(contains$1(domReference, relatedTarget) || contains$1(floating, relatedTarget) || contains$1(relatedTarget, floating) || contains$1(portalContext == null ? void 0 : portalContext.portalNode, relatedTarget) || relatedTarget != null && relatedTarget.hasAttribute(createAttribute('focus-guard')) || tree && (getNodeChildren$1(tree.nodesRef.current, nodeId).find(node => {
            var _node$context, _node$context2;
            return contains$1((_node$context = node.context) == null ? void 0 : _node$context.elements.floating, relatedTarget) || contains$1((_node$context2 = node.context) == null ? void 0 : _node$context2.elements.domReference, relatedTarget);
          }) || getNodeAncestors(tree.nodesRef.current, nodeId).find(node => {
            var _node$context3, _node$context4, _node$context5;
            return [(_node$context3 = node.context) == null ? void 0 : _node$context3.elements.floating, getFloatingFocusElement((_node$context4 = node.context) == null ? void 0 : _node$context4.elements.floating)].includes(relatedTarget) || ((_node$context5 = node.context) == null ? void 0 : _node$context5.elements.domReference) === relatedTarget;
          })));
          if (currentTarget === domReference && floatingFocusElement) {
            handleTabIndex(floatingFocusElement, orderRef);
          }

          // Restore focus to the previous tabbable element index to prevent
          // focus from being lost outside the floating tree.
          if (restoreFocus && currentTarget !== domReference && !(target != null && target.isConnected) && activeElement(getDocument$1(floatingFocusElement)) === getDocument$1(floatingFocusElement).body) {
            // Let `FloatingPortal` effect knows that focus is still inside the
            // floating tree.
            if (isHTMLElement(floatingFocusElement)) {
              floatingFocusElement.focus();
            }
            const prevTabbableIndex = tabbableIndexRef.current;
            const tabbableContent = getTabbableContent();
            const nodeToFocus = tabbableContent[prevTabbableIndex] || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
            if (isHTMLElement(nodeToFocus)) {
              nodeToFocus.focus();
            }
          }

          // https://github.com/floating-ui/floating-ui/issues/3060
          if (dataRef.current.insideReactTree) {
            dataRef.current.insideReactTree = false;
            return;
          }

          // Focus did not move inside the floating tree, and there are no tabbable
          // portal guards to handle closing.
          if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current &&
          // Fix React 18 Strict Mode returnFocus due to double rendering.
          relatedTarget !== getPreviouslyFocusedElement()) {
            preventReturnFocusRef.current = true;
            onOpenChange(false, event, 'focus-out');
          }
        });
      }
      if (floating && isHTMLElement(domReference)) {
        domReference.addEventListener('focusout', handleFocusOutside);
        domReference.addEventListener('pointerdown', handlePointerDown);
        floating.addEventListener('focusout', handleFocusOutside);
        return () => {
          domReference.removeEventListener('focusout', handleFocusOutside);
          domReference.removeEventListener('pointerdown', handlePointerDown);
          floating.removeEventListener('focusout', handleFocusOutside);
        };
      }
    }, [disabled, domReference, floating, floatingFocusElement, modal, tree, portalContext, onOpenChange, closeOnFocusOut, restoreFocus, getTabbableContent, isUntrappedTypeableCombobox, getNodeId, orderRef, dataRef]);
    const beforeGuardRef = React__namespace.useRef(null);
    const afterGuardRef = React__namespace.useRef(null);
    const mergedBeforeGuardRef = useLiteMergeRefs([beforeGuardRef, portalContext == null ? void 0 : portalContext.beforeInsideRef]);
    const mergedAfterGuardRef = useLiteMergeRefs([afterGuardRef, portalContext == null ? void 0 : portalContext.afterInsideRef]);
    React__namespace.useEffect(() => {
      var _portalContext$portal, _ancestors$find;
      if (disabled) return;
      if (!floating) return;

      // Don't hide portals nested within the parent portal.
      const portalNodes = Array.from((portalContext == null || (_portalContext$portal = portalContext.portalNode) == null ? void 0 : _portalContext$portal.querySelectorAll("[" + createAttribute('portal') + "]")) || []);
      const ancestors = tree ? getNodeAncestors(tree.nodesRef.current, getNodeId()) : [];
      const ancestorFloatingNodes = tree && !modal ? ancestors.map(node => {
        var _node$context6;
        return (_node$context6 = node.context) == null ? void 0 : _node$context6.elements.floating;
      }) : [];
      const rootAncestorComboboxDomReference = (_ancestors$find = ancestors.find(node => {
        var _node$context7;
        return isTypeableCombobox(((_node$context7 = node.context) == null ? void 0 : _node$context7.elements.domReference) || null);
      })) == null || (_ancestors$find = _ancestors$find.context) == null ? void 0 : _ancestors$find.elements.domReference;
      const insideElements = [floating, rootAncestorComboboxDomReference, ...portalNodes, ...ancestorFloatingNodes, ...getInsideElements(), startDismissButtonRef.current, endDismissButtonRef.current, beforeGuardRef.current, afterGuardRef.current, portalContext == null ? void 0 : portalContext.beforeOutsideRef.current, portalContext == null ? void 0 : portalContext.afterOutsideRef.current, orderRef.current.includes('reference') || isUntrappedTypeableCombobox ? domReference : null].filter(x => x != null);
      const cleanup = modal || isUntrappedTypeableCombobox ? markOthers(insideElements, !useInert, useInert) : markOthers(insideElements);
      return () => {
        cleanup();
      };
    }, [disabled, domReference, floating, modal, orderRef, portalContext, isUntrappedTypeableCombobox, guards, useInert, tree, getNodeId, getInsideElements]);
    index$1(() => {
      if (disabled || !isHTMLElement(floatingFocusElement)) return;
      const doc = getDocument$1(floatingFocusElement);
      const previouslyFocusedElement = activeElement(doc);

      // Wait for any layout effect state setters to execute to set `tabIndex`.
      queueMicrotask(() => {
        const focusableElements = getTabbableElements(floatingFocusElement);
        const initialFocusValue = initialFocusRef.current;
        const elToFocus = (typeof initialFocusValue === 'number' ? focusableElements[initialFocusValue] : initialFocusValue.current) || floatingFocusElement;
        const focusAlreadyInsideFloatingEl = contains$1(floatingFocusElement, previouslyFocusedElement);
        if (!ignoreInitialFocus && !focusAlreadyInsideFloatingEl && open) {
          enqueueFocus(elToFocus, {
            preventScroll: elToFocus === floatingFocusElement
          });
        }
      });
    }, [disabled, open, floatingFocusElement, ignoreInitialFocus, getTabbableElements, initialFocusRef]);
    index$1(() => {
      if (disabled || !floatingFocusElement) return;
      const doc = getDocument$1(floatingFocusElement);
      const previouslyFocusedElement = activeElement(doc);
      addPreviouslyFocusedElement(previouslyFocusedElement);

      // Dismissing via outside press should always ignore `returnFocus` to
      // prevent unwanted scrolling.
      function onOpenChange(_ref) {
        let {
          reason,
          event,
          nested
        } = _ref;
        if (['hover', 'safe-polygon'].includes(reason) && event.type === 'mouseleave') {
          preventReturnFocusRef.current = true;
        }
        if (reason !== 'outside-press') return;
        if (nested) {
          preventReturnFocusRef.current = false;
        } else if (isVirtualClick(event) || isVirtualPointerEvent(event)) {
          preventReturnFocusRef.current = false;
        } else {
          let isPreventScrollSupported = false;
          document.createElement('div').focus({
            get preventScroll() {
              isPreventScrollSupported = true;
              return false;
            }
          });
          if (isPreventScrollSupported) {
            preventReturnFocusRef.current = false;
          } else {
            preventReturnFocusRef.current = true;
          }
        }
      }
      events.on('openchange', onOpenChange);
      const fallbackEl = doc.createElement('span');
      fallbackEl.setAttribute('tabindex', '-1');
      fallbackEl.setAttribute('aria-hidden', 'true');
      Object.assign(fallbackEl.style, HIDDEN_STYLES);
      if (isInsidePortal && domReference) {
        domReference.insertAdjacentElement('afterend', fallbackEl);
      }
      function getReturnElement() {
        if (typeof returnFocusRef.current === 'boolean') {
          const el = domReference || getPreviouslyFocusedElement();
          return el && el.isConnected ? el : fallbackEl;
        }
        return returnFocusRef.current.current || fallbackEl;
      }
      return () => {
        events.off('openchange', onOpenChange);
        const activeEl = activeElement(doc);
        const isFocusInsideFloatingTree = contains$1(floating, activeEl) || tree && getNodeChildren$1(tree.nodesRef.current, getNodeId()).some(node => {
          var _node$context8;
          return contains$1((_node$context8 = node.context) == null ? void 0 : _node$context8.elements.floating, activeEl);
        });
        const returnElement = getReturnElement();
        queueMicrotask(() => {
          // This is `returnElement`, if it's tabbable, or its first tabbable child.
          const tabbableReturnElement = getFirstTabbableElement(returnElement);
          if (
          // eslint-disable-next-line react-hooks/exhaustive-deps
          returnFocusRef.current && !preventReturnFocusRef.current && isHTMLElement(tabbableReturnElement) && (
          // If the focus moved somewhere else after mount, avoid returning focus
          // since it likely entered a different element which should be
          // respected: https://github.com/floating-ui/floating-ui/issues/2607
          tabbableReturnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)) {
            tabbableReturnElement.focus({
              preventScroll: true
            });
          }
          fallbackEl.remove();
        });
      };
    }, [disabled, floating, floatingFocusElement, returnFocusRef, dataRef, events, tree, isInsidePortal, domReference, getNodeId]);
    React__namespace.useEffect(() => {
      // The `returnFocus` cleanup behavior is inside a microtask; ensure we
      // wait for it to complete before resetting the flag.
      queueMicrotask(() => {
        preventReturnFocusRef.current = false;
      });
    }, [disabled]);

    // Synchronize the `context` & `modal` value to the FloatingPortal context.
    // It will decide whether or not it needs to render its own guards.
    index$1(() => {
      if (disabled) return;
      if (!portalContext) return;
      portalContext.setFocusManagerState({
        modal,
        closeOnFocusOut,
        open,
        onOpenChange,
        domReference
      });
      return () => {
        portalContext.setFocusManagerState(null);
      };
    }, [disabled, portalContext, modal, open, onOpenChange, closeOnFocusOut, domReference]);
    index$1(() => {
      if (disabled) return;
      if (!floatingFocusElement) return;
      handleTabIndex(floatingFocusElement, orderRef);
    }, [disabled, floatingFocusElement, orderRef]);
    function renderDismissButton(location) {
      if (disabled || !visuallyHiddenDismiss || !modal) {
        return null;
      }
      return /*#__PURE__*/jsxRuntimeExports.jsx(VisuallyHiddenDismiss, {
        ref: location === 'start' ? startDismissButtonRef : endDismissButtonRef,
        onClick: event => onOpenChange(false, event.nativeEvent),
        children: typeof visuallyHiddenDismiss === 'string' ? visuallyHiddenDismiss : 'Dismiss'
      });
    }
    const shouldRenderGuards = !disabled && guards && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
    return /*#__PURE__*/jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [shouldRenderGuards && /*#__PURE__*/jsxRuntimeExports.jsx(FocusGuard, {
        "data-type": "inside",
        ref: mergedBeforeGuardRef,
        onFocus: event => {
          if (modal) {
            const els = getTabbableElements();
            enqueueFocus(order[0] === 'reference' ? els[0] : els[els.length - 1]);
          } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
            preventReturnFocusRef.current = false;
            if (isOutsideEvent(event, portalContext.portalNode)) {
              const nextTabbable = getNextTabbable(domReference);
              nextTabbable == null || nextTabbable.focus();
            } else {
              var _portalContext$before;
              (_portalContext$before = portalContext.beforeOutsideRef.current) == null || _portalContext$before.focus();
            }
          }
        }
      }), !isUntrappedTypeableCombobox && renderDismissButton('start'), children, renderDismissButton('end'), shouldRenderGuards && /*#__PURE__*/jsxRuntimeExports.jsx(FocusGuard, {
        "data-type": "inside",
        ref: mergedAfterGuardRef,
        onFocus: event => {
          if (modal) {
            enqueueFocus(getTabbableElements()[0]);
          } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
            if (closeOnFocusOut) {
              preventReturnFocusRef.current = true;
            }
            if (isOutsideEvent(event, portalContext.portalNode)) {
              const prevTabbable = getPreviousTabbable(domReference);
              prevTabbable == null || prevTabbable.focus();
            } else {
              var _portalContext$afterO;
              (_portalContext$afterO = portalContext.afterOutsideRef.current) == null || _portalContext$afterO.focus();
            }
          }
        }
      })]
    });
  }

  function isButtonTarget(event) {
    return isHTMLElement(event.target) && event.target.tagName === 'BUTTON';
  }
  function isAnchorTarget(event) {
    return isHTMLElement(event.target) && event.target.tagName === 'A';
  }
  function isSpaceIgnored(element) {
    return isTypeableElement(element);
  }
  /**
   * Opens or closes the floating element when clicking the reference element.
   * @see https://floating-ui.com/docs/useClick
   */
  function useClick(context, props) {
    if (props === void 0) {
      props = {};
    }
    const {
      open,
      onOpenChange,
      dataRef,
      elements: {
        domReference
      }
    } = context;
    const {
      enabled = true,
      event: eventOption = 'click',
      toggle = true,
      ignoreMouse = false,
      keyboardHandlers = true,
      stickIfOpen = true
    } = props;
    const pointerTypeRef = React__namespace.useRef();
    const didKeyDownRef = React__namespace.useRef(false);
    const reference = React__namespace.useMemo(() => ({
      onPointerDown(event) {
        pointerTypeRef.current = event.pointerType;
      },
      onMouseDown(event) {
        const pointerType = pointerTypeRef.current;

        // Ignore all buttons except for the "main" button.
        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
        if (event.button !== 0) return;
        if (eventOption === 'click') return;
        if (isMouseLikePointerType(pointerType, true) && ignoreMouse) return;
        if (open && toggle && (dataRef.current.openEvent && stickIfOpen ? dataRef.current.openEvent.type === 'mousedown' : true)) {
          onOpenChange(false, event.nativeEvent, 'click');
        } else {
          // Prevent stealing focus from the floating element
          event.preventDefault();
          onOpenChange(true, event.nativeEvent, 'click');
        }
      },
      onClick(event) {
        const pointerType = pointerTypeRef.current;
        if (eventOption === 'mousedown' && pointerTypeRef.current) {
          pointerTypeRef.current = undefined;
          return;
        }
        if (isMouseLikePointerType(pointerType, true) && ignoreMouse) return;
        if (open && toggle && (dataRef.current.openEvent && stickIfOpen ? dataRef.current.openEvent.type === 'click' : true)) {
          onOpenChange(false, event.nativeEvent, 'click');
        } else {
          onOpenChange(true, event.nativeEvent, 'click');
        }
      },
      onKeyDown(event) {
        pointerTypeRef.current = undefined;
        if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event)) {
          return;
        }
        if (event.key === ' ' && !isSpaceIgnored(domReference)) {
          // Prevent scrolling
          event.preventDefault();
          didKeyDownRef.current = true;
        }
        if (isAnchorTarget(event)) {
          return;
        }
        if (event.key === 'Enter') {
          if (open && toggle) {
            onOpenChange(false, event.nativeEvent, 'click');
          } else {
            onOpenChange(true, event.nativeEvent, 'click');
          }
        }
      },
      onKeyUp(event) {
        if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event) || isSpaceIgnored(domReference)) {
          return;
        }
        if (event.key === ' ' && didKeyDownRef.current) {
          didKeyDownRef.current = false;
          if (open && toggle) {
            onOpenChange(false, event.nativeEvent, 'click');
          } else {
            onOpenChange(true, event.nativeEvent, 'click');
          }
        }
      }
    }), [dataRef, domReference, eventOption, ignoreMouse, keyboardHandlers, onOpenChange, open, stickIfOpen, toggle]);
    return React__namespace.useMemo(() => enabled ? {
      reference
    } : {}, [enabled, reference]);
  }

  const bubbleHandlerKeys = {
    pointerdown: 'onPointerDown',
    mousedown: 'onMouseDown',
    click: 'onClick'
  };
  const captureHandlerKeys = {
    pointerdown: 'onPointerDownCapture',
    mousedown: 'onMouseDownCapture',
    click: 'onClickCapture'
  };
  const normalizeProp = normalizable => {
    var _normalizable$escapeK, _normalizable$outside;
    return {
      escapeKey: typeof normalizable === 'boolean' ? normalizable : (_normalizable$escapeK = normalizable == null ? void 0 : normalizable.escapeKey) != null ? _normalizable$escapeK : false,
      outsidePress: typeof normalizable === 'boolean' ? normalizable : (_normalizable$outside = normalizable == null ? void 0 : normalizable.outsidePress) != null ? _normalizable$outside : true
    };
  };
  /**
   * Closes the floating element when a dismissal is requested — by default, when
   * the user presses the `escape` key or outside of the floating element.
   * @see https://floating-ui.com/docs/useDismiss
   */
  function useDismiss(context, props) {
    if (props === void 0) {
      props = {};
    }
    const {
      open,
      onOpenChange,
      elements,
      dataRef
    } = context;
    const {
      enabled = true,
      escapeKey = true,
      outsidePress: unstable_outsidePress = true,
      outsidePressEvent = 'pointerdown',
      referencePress = false,
      referencePressEvent = 'pointerdown',
      ancestorScroll = false,
      bubbles,
      capture
    } = props;
    const tree = useFloatingTree();
    const outsidePressFn = useEffectEvent(typeof unstable_outsidePress === 'function' ? unstable_outsidePress : () => false);
    const outsidePress = typeof unstable_outsidePress === 'function' ? outsidePressFn : unstable_outsidePress;
    const endedOrStartedInsideRef = React__namespace.useRef(false);
    const {
      escapeKey: escapeKeyBubbles,
      outsidePress: outsidePressBubbles
    } = normalizeProp(bubbles);
    const {
      escapeKey: escapeKeyCapture,
      outsidePress: outsidePressCapture
    } = normalizeProp(capture);
    const isComposingRef = React__namespace.useRef(false);
    const blurTimeoutRef = React__namespace.useRef(-1);
    const closeOnEscapeKeyDown = useEffectEvent(event => {
      var _dataRef$current$floa;
      if (!open || !enabled || !escapeKey || event.key !== 'Escape') {
        return;
      }

      // Wait until IME is settled. Pressing `Escape` while composing should
      // close the compose menu, but not the floating element.
      if (isComposingRef.current) {
        return;
      }
      const nodeId = (_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.nodeId;
      const children = tree ? getNodeChildren$1(tree.nodesRef.current, nodeId) : [];
      if (!escapeKeyBubbles) {
        event.stopPropagation();
        if (children.length > 0) {
          let shouldDismiss = true;
          children.forEach(child => {
            var _child$context;
            if ((_child$context = child.context) != null && _child$context.open && !child.context.dataRef.current.__escapeKeyBubbles) {
              shouldDismiss = false;
              return;
            }
          });
          if (!shouldDismiss) {
            return;
          }
        }
      }
      onOpenChange(false, isReactEvent(event) ? event.nativeEvent : event, 'escape-key');
    });
    const closeOnEscapeKeyDownCapture = useEffectEvent(event => {
      var _getTarget2;
      const callback = () => {
        var _getTarget;
        closeOnEscapeKeyDown(event);
        (_getTarget = getTarget$1(event)) == null || _getTarget.removeEventListener('keydown', callback);
      };
      (_getTarget2 = getTarget$1(event)) == null || _getTarget2.addEventListener('keydown', callback);
    });
    const closeOnPressOutside = useEffectEvent(event => {
      var _dataRef$current$floa2;
      // Given developers can stop the propagation of the synthetic event,
      // we can only be confident with a positive value.
      const insideReactTree = dataRef.current.insideReactTree;
      dataRef.current.insideReactTree = false;

      // When click outside is lazy (`click` event), handle dragging.
      // Don't close if:
      // - The click started inside the floating element.
      // - The click ended inside the floating element.
      const endedOrStartedInside = endedOrStartedInsideRef.current;
      endedOrStartedInsideRef.current = false;
      if (outsidePressEvent === 'click' && endedOrStartedInside) {
        return;
      }
      if (insideReactTree) {
        return;
      }
      if (typeof outsidePress === 'function' && !outsidePress(event)) {
        return;
      }
      const target = getTarget$1(event);
      const inertSelector = "[" + createAttribute('inert') + "]";
      const markers = getDocument$1(elements.floating).querySelectorAll(inertSelector);
      let targetRootAncestor = isElement(target) ? target : null;
      while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
        const nextParent = getParentNode(targetRootAncestor);
        if (isLastTraversableNode(nextParent) || !isElement(nextParent)) {
          break;
        }
        targetRootAncestor = nextParent;
      }

      // Check if the click occurred on a third-party element injected after the
      // floating element rendered.
      if (markers.length && isElement(target) && !isRootElement(target) &&
      // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !contains$1(target, elements.floating) &&
      // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      Array.from(markers).every(marker => !contains$1(targetRootAncestor, marker))) {
        return;
      }

      // Check if the click occurred on the scrollbar
      if (isHTMLElement(target) && floating) {
        const lastTraversableNode = isLastTraversableNode(target);
        const style = getComputedStyle$1(target);
        const scrollRe = /auto|scroll/;
        const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
        const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
        const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
        const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
        const isRTL = style.direction === 'rtl';

        // Check click position relative to scrollbar.
        // In some browsers it is possible to change the <body> (or window)
        // scrollbar to the left side, but is very rare and is difficult to
        // check for. Plus, for modal dialogs with backdrops, it is more
        // important that the backdrop is checked but not so much the window.
        const pressedVerticalScrollbar = canScrollY && (isRTL ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
        const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
        if (pressedVerticalScrollbar || pressedHorizontalScrollbar) {
          return;
        }
      }
      const nodeId = (_dataRef$current$floa2 = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa2.nodeId;
      const targetIsInsideChildren = tree && getNodeChildren$1(tree.nodesRef.current, nodeId).some(node => {
        var _node$context;
        return isEventTargetWithin(event, (_node$context = node.context) == null ? void 0 : _node$context.elements.floating);
      });
      if (isEventTargetWithin(event, elements.floating) || isEventTargetWithin(event, elements.domReference) || targetIsInsideChildren) {
        return;
      }
      const children = tree ? getNodeChildren$1(tree.nodesRef.current, nodeId) : [];
      if (children.length > 0) {
        let shouldDismiss = true;
        children.forEach(child => {
          var _child$context2;
          if ((_child$context2 = child.context) != null && _child$context2.open && !child.context.dataRef.current.__outsidePressBubbles) {
            shouldDismiss = false;
            return;
          }
        });
        if (!shouldDismiss) {
          return;
        }
      }
      onOpenChange(false, event, 'outside-press');
    });
    const closeOnPressOutsideCapture = useEffectEvent(event => {
      var _getTarget4;
      const callback = () => {
        var _getTarget3;
        closeOnPressOutside(event);
        (_getTarget3 = getTarget$1(event)) == null || _getTarget3.removeEventListener(outsidePressEvent, callback);
      };
      (_getTarget4 = getTarget$1(event)) == null || _getTarget4.addEventListener(outsidePressEvent, callback);
    });
    React__namespace.useEffect(() => {
      if (!open || !enabled) {
        return;
      }
      dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
      dataRef.current.__outsidePressBubbles = outsidePressBubbles;
      let compositionTimeout = -1;
      function onScroll(event) {
        onOpenChange(false, event, 'ancestor-scroll');
      }
      function handleCompositionStart() {
        window.clearTimeout(compositionTimeout);
        isComposingRef.current = true;
      }
      function handleCompositionEnd() {
        // Safari fires `compositionend` before `keydown`, so we need to wait
        // until the next tick to set `isComposing` to `false`.
        // https://bugs.webkit.org/show_bug.cgi?id=165004
        compositionTimeout = window.setTimeout(() => {
          isComposingRef.current = false;
        },
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        isWebKit() ? 5 : 0);
      }
      const doc = getDocument$1(elements.floating);
      if (escapeKey) {
        doc.addEventListener('keydown', escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
        doc.addEventListener('compositionstart', handleCompositionStart);
        doc.addEventListener('compositionend', handleCompositionEnd);
      }
      outsidePress && doc.addEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
      let ancestors = [];
      if (ancestorScroll) {
        if (isElement(elements.domReference)) {
          ancestors = getOverflowAncestors(elements.domReference);
        }
        if (isElement(elements.floating)) {
          ancestors = ancestors.concat(getOverflowAncestors(elements.floating));
        }
        if (!isElement(elements.reference) && elements.reference && elements.reference.contextElement) {
          ancestors = ancestors.concat(getOverflowAncestors(elements.reference.contextElement));
        }
      }

      // Ignore the visual viewport for scrolling dismissal (allow pinch-zoom)
      ancestors = ancestors.filter(ancestor => {
        var _doc$defaultView;
        return ancestor !== ((_doc$defaultView = doc.defaultView) == null ? void 0 : _doc$defaultView.visualViewport);
      });
      ancestors.forEach(ancestor => {
        ancestor.addEventListener('scroll', onScroll, {
          passive: true
        });
      });
      return () => {
        if (escapeKey) {
          doc.removeEventListener('keydown', escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
          doc.removeEventListener('compositionstart', handleCompositionStart);
          doc.removeEventListener('compositionend', handleCompositionEnd);
        }
        outsidePress && doc.removeEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
        ancestors.forEach(ancestor => {
          ancestor.removeEventListener('scroll', onScroll);
        });
        window.clearTimeout(compositionTimeout);
      };
    }, [dataRef, elements, escapeKey, outsidePress, outsidePressEvent, open, onOpenChange, ancestorScroll, enabled, escapeKeyBubbles, outsidePressBubbles, closeOnEscapeKeyDown, escapeKeyCapture, closeOnEscapeKeyDownCapture, closeOnPressOutside, outsidePressCapture, closeOnPressOutsideCapture]);
    React__namespace.useEffect(() => {
      dataRef.current.insideReactTree = false;
    }, [dataRef, outsidePress, outsidePressEvent]);
    const reference = React__namespace.useMemo(() => ({
      onKeyDown: closeOnEscapeKeyDown,
      ...(referencePress && {
        [bubbleHandlerKeys[referencePressEvent]]: event => {
          onOpenChange(false, event.nativeEvent, 'reference-press');
        },
        ...(referencePressEvent !== 'click' && {
          onClick(event) {
            onOpenChange(false, event.nativeEvent, 'reference-press');
          }
        })
      })
    }), [closeOnEscapeKeyDown, onOpenChange, referencePress, referencePressEvent]);
    const floating = React__namespace.useMemo(() => ({
      onKeyDown: closeOnEscapeKeyDown,
      onMouseDown() {
        endedOrStartedInsideRef.current = true;
      },
      onMouseUp() {
        endedOrStartedInsideRef.current = true;
      },
      [captureHandlerKeys[outsidePressEvent]]: () => {
        dataRef.current.insideReactTree = true;
      },
      onBlurCapture() {
        if (tree) return;
        clearTimeoutIfSet(blurTimeoutRef);
        dataRef.current.insideReactTree = true;
        blurTimeoutRef.current = window.setTimeout(() => {
          dataRef.current.insideReactTree = false;
        });
      }
    }), [closeOnEscapeKeyDown, outsidePressEvent, dataRef, tree]);
    return React__namespace.useMemo(() => enabled ? {
      reference,
      floating
    } : {}, [enabled, reference, floating]);
  }

  function useFloatingRootContext(options) {
    const {
      open = false,
      onOpenChange: onOpenChangeProp,
      elements: elementsProp
    } = options;
    const floatingId = useId();
    const dataRef = React__namespace.useRef({});
    const [events] = React__namespace.useState(() => createEventEmitter());
    const nested = useFloatingParentNodeId() != null;
    {
      const optionDomReference = elementsProp.reference;
      if (optionDomReference && !isElement(optionDomReference)) {
        error('Cannot pass a virtual element to the `elements.reference` option,', 'as it must be a real DOM element. Use `refs.setPositionReference()`', 'instead.');
      }
    }
    const [positionReference, setPositionReference] = React__namespace.useState(elementsProp.reference);
    const onOpenChange = useEffectEvent((open, event, reason) => {
      dataRef.current.openEvent = open ? event : undefined;
      events.emit('openchange', {
        open,
        event,
        reason,
        nested
      });
      onOpenChangeProp == null || onOpenChangeProp(open, event, reason);
    });
    const refs = React__namespace.useMemo(() => ({
      setPositionReference
    }), []);
    const elements = React__namespace.useMemo(() => ({
      reference: positionReference || elementsProp.reference || null,
      floating: elementsProp.floating || null,
      domReference: elementsProp.reference
    }), [positionReference, elementsProp.reference, elementsProp.floating]);
    return React__namespace.useMemo(() => ({
      dataRef,
      open,
      onOpenChange,
      elements,
      events,
      floatingId,
      refs
    }), [open, onOpenChange, elements, events, floatingId, refs]);
  }

  /**
   * Provides data to position a floating element and context to add interactions.
   * @see https://floating-ui.com/docs/useFloating
   */
  function useFloating(options) {
    if (options === void 0) {
      options = {};
    }
    const {
      nodeId
    } = options;
    const internalRootContext = useFloatingRootContext({
      ...options,
      elements: {
        reference: null,
        floating: null,
        ...options.elements
      }
    });
    const rootContext = options.rootContext || internalRootContext;
    const computedElements = rootContext.elements;
    const [_domReference, setDomReference] = React__namespace.useState(null);
    const [positionReference, _setPositionReference] = React__namespace.useState(null);
    const optionDomReference = computedElements == null ? void 0 : computedElements.domReference;
    const domReference = optionDomReference || _domReference;
    const domReferenceRef = React__namespace.useRef(null);
    const tree = useFloatingTree();
    index$1(() => {
      if (domReference) {
        domReferenceRef.current = domReference;
      }
    }, [domReference]);
    const position = useFloating$1({
      ...options,
      elements: {
        ...computedElements,
        ...(positionReference && {
          reference: positionReference
        })
      }
    });
    const setPositionReference = React__namespace.useCallback(node => {
      const computedPositionReference = isElement(node) ? {
        getBoundingClientRect: () => node.getBoundingClientRect(),
        getClientRects: () => node.getClientRects(),
        contextElement: node
      } : node;
      // Store the positionReference in state if the DOM reference is specified externally via the
      // `elements.reference` option. This ensures that it won't be overridden on future renders.
      _setPositionReference(computedPositionReference);
      position.refs.setReference(computedPositionReference);
    }, [position.refs]);
    const setReference = React__namespace.useCallback(node => {
      if (isElement(node) || node === null) {
        domReferenceRef.current = node;
        setDomReference(node);
      }

      // Backwards-compatibility for passing a virtual element to `reference`
      // after it has set the DOM reference.
      if (isElement(position.refs.reference.current) || position.refs.reference.current === null ||
      // Don't allow setting virtual elements using the old technique back to
      // `null` to support `positionReference` + an unstable `reference`
      // callback ref.
      node !== null && !isElement(node)) {
        position.refs.setReference(node);
      }
    }, [position.refs]);
    const refs = React__namespace.useMemo(() => ({
      ...position.refs,
      setReference,
      setPositionReference,
      domReference: domReferenceRef
    }), [position.refs, setReference, setPositionReference]);
    const elements = React__namespace.useMemo(() => ({
      ...position.elements,
      domReference: domReference
    }), [position.elements, domReference]);
    const context = React__namespace.useMemo(() => ({
      ...position,
      ...rootContext,
      refs,
      elements,
      nodeId
    }), [position, refs, elements, nodeId, rootContext]);
    index$1(() => {
      rootContext.dataRef.current.floatingContext = context;
      const node = tree == null ? void 0 : tree.nodesRef.current.find(node => node.id === nodeId);
      if (node) {
        node.context = context;
      }
    });
    return React__namespace.useMemo(() => ({
      ...position,
      context,
      refs,
      elements
    }), [position, refs, elements, context]);
  }

  function isMacSafari() {
    return isMac() && isSafari();
  }
  /**
   * Opens the floating element while the reference element has focus, like CSS
   * `:focus`.
   * @see https://floating-ui.com/docs/useFocus
   */
  function useFocus(context, props) {
    if (props === void 0) {
      props = {};
    }
    const {
      open,
      onOpenChange,
      events,
      dataRef,
      elements
    } = context;
    const {
      enabled = true,
      visibleOnly = true
    } = props;
    const blockFocusRef = React__namespace.useRef(false);
    const timeoutRef = React__namespace.useRef(-1);
    const keyboardModalityRef = React__namespace.useRef(true);
    React__namespace.useEffect(() => {
      if (!enabled) return;
      const win = getWindow(elements.domReference);

      // If the reference was focused and the user left the tab/window, and the
      // floating element was not open, the focus should be blocked when they
      // return to the tab/window.
      function onBlur() {
        if (!open && isHTMLElement(elements.domReference) && elements.domReference === activeElement(getDocument$1(elements.domReference))) {
          blockFocusRef.current = true;
        }
      }
      function onKeyDown() {
        keyboardModalityRef.current = true;
      }
      function onPointerDown() {
        keyboardModalityRef.current = false;
      }
      win.addEventListener('blur', onBlur);
      if (isMacSafari()) {
        win.addEventListener('keydown', onKeyDown, true);
        win.addEventListener('pointerdown', onPointerDown, true);
      }
      return () => {
        win.removeEventListener('blur', onBlur);
        if (isMacSafari()) {
          win.removeEventListener('keydown', onKeyDown, true);
          win.removeEventListener('pointerdown', onPointerDown, true);
        }
      };
    }, [elements.domReference, open, enabled]);
    React__namespace.useEffect(() => {
      if (!enabled) return;
      function onOpenChange(_ref) {
        let {
          reason
        } = _ref;
        if (reason === 'reference-press' || reason === 'escape-key') {
          blockFocusRef.current = true;
        }
      }
      events.on('openchange', onOpenChange);
      return () => {
        events.off('openchange', onOpenChange);
      };
    }, [events, enabled]);
    React__namespace.useEffect(() => {
      return () => {
        clearTimeoutIfSet(timeoutRef);
      };
    }, []);
    const reference = React__namespace.useMemo(() => ({
      onMouseLeave() {
        blockFocusRef.current = false;
      },
      onFocus(event) {
        if (blockFocusRef.current) return;
        const target = getTarget$1(event.nativeEvent);
        if (visibleOnly && isElement(target)) {
          // Safari fails to match `:focus-visible` if focus was initially
          // outside the document.
          if (isMacSafari() && !event.relatedTarget) {
            if (!keyboardModalityRef.current && !isTypeableElement(target)) {
              return;
            }
          } else if (!matchesFocusVisible(target)) {
            return;
          }
        }
        onOpenChange(true, event.nativeEvent, 'focus');
      },
      onBlur(event) {
        blockFocusRef.current = false;
        const relatedTarget = event.relatedTarget;
        const nativeEvent = event.nativeEvent;

        // Hit the non-modal focus management portal guard. Focus will be
        // moved into the floating element immediately after.
        const movedToFocusGuard = isElement(relatedTarget) && relatedTarget.hasAttribute(createAttribute('focus-guard')) && relatedTarget.getAttribute('data-type') === 'outside';

        // Wait for the window blur listener to fire.
        timeoutRef.current = window.setTimeout(() => {
          var _dataRef$current$floa;
          const activeEl = activeElement(elements.domReference ? elements.domReference.ownerDocument : document);

          // Focus left the page, keep it open.
          if (!relatedTarget && activeEl === elements.domReference) return;

          // When focusing the reference element (e.g. regular click), then
          // clicking into the floating element, prevent it from hiding.
          // Note: it must be focusable, e.g. `tabindex="-1"`.
          // We can not rely on relatedTarget to point to the correct element
          // as it will only point to the shadow host of the newly focused element
          // and not the element that actually has received focus if it is located
          // inside a shadow root.
          if (contains$1((_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.refs.floating.current, activeEl) || contains$1(elements.domReference, activeEl) || movedToFocusGuard) {
            return;
          }
          onOpenChange(false, nativeEvent, 'focus');
        });
      }
    }), [dataRef, elements.domReference, onOpenChange, visibleOnly]);
    return React__namespace.useMemo(() => enabled ? {
      reference
    } : {}, [enabled, reference]);
  }

  function mergeProps(userProps, propsList, elementKey) {
    const map = new Map();
    const isItem = elementKey === 'item';
    let domUserProps = userProps;
    if (isItem && userProps) {
      const {
        [ACTIVE_KEY]: _,
        [SELECTED_KEY]: __,
        ...validProps
      } = userProps;
      domUserProps = validProps;
    }
    return {
      ...(elementKey === 'floating' && {
        tabIndex: -1,
        [FOCUSABLE_ATTRIBUTE]: ''
      }),
      ...domUserProps,
      ...propsList.map(value => {
        const propsOrGetProps = value ? value[elementKey] : null;
        if (typeof propsOrGetProps === 'function') {
          return userProps ? propsOrGetProps(userProps) : null;
        }
        return propsOrGetProps;
      }).concat(userProps).reduce((acc, props) => {
        if (!props) {
          return acc;
        }
        Object.entries(props).forEach(_ref => {
          let [key, value] = _ref;
          if (isItem && [ACTIVE_KEY, SELECTED_KEY].includes(key)) {
            return;
          }
          if (key.indexOf('on') === 0) {
            if (!map.has(key)) {
              map.set(key, []);
            }
            if (typeof value === 'function') {
              var _map$get;
              (_map$get = map.get(key)) == null || _map$get.push(value);
              acc[key] = function () {
                var _map$get2;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }
                return (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.map(fn => fn(...args)).find(val => val !== undefined);
              };
            }
          } else {
            acc[key] = value;
          }
        });
        return acc;
      }, {})
    };
  }
  /**
   * Merges an array of interaction hooks' props into prop getters, allowing
   * event handler functions to be composed together without overwriting one
   * another.
   * @see https://floating-ui.com/docs/useInteractions
   */
  function useInteractions(propsList) {
    if (propsList === void 0) {
      propsList = [];
    }
    const referenceDeps = propsList.map(key => key == null ? void 0 : key.reference);
    const floatingDeps = propsList.map(key => key == null ? void 0 : key.floating);
    const itemDeps = propsList.map(key => key == null ? void 0 : key.item);
    const getReferenceProps = React__namespace.useCallback(userProps => mergeProps(userProps, propsList, 'reference'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    referenceDeps);
    const getFloatingProps = React__namespace.useCallback(userProps => mergeProps(userProps, propsList, 'floating'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    floatingDeps);
    const getItemProps = React__namespace.useCallback(userProps => mergeProps(userProps, propsList, 'item'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    itemDeps);
    return React__namespace.useMemo(() => ({
      getReferenceProps,
      getFloatingProps,
      getItemProps
    }), [getReferenceProps, getFloatingProps, getItemProps]);
  }

  const componentRoleToAriaRoleMap = /*#__PURE__*/new Map([['select', 'listbox'], ['combobox', 'listbox'], ['label', false]]);

  /**
   * Adds base screen reader props to the reference and floating elements for a
   * given floating element `role`.
   * @see https://floating-ui.com/docs/useRole
   */
  function useRole(context, props) {
    var _elements$domReferenc, _componentRoleToAriaR;
    if (props === void 0) {
      props = {};
    }
    const {
      open,
      elements,
      floatingId: defaultFloatingId
    } = context;
    const {
      enabled = true,
      role = 'dialog'
    } = props;
    const defaultReferenceId = useId();
    const referenceId = ((_elements$domReferenc = elements.domReference) == null ? void 0 : _elements$domReferenc.id) || defaultReferenceId;
    const floatingId = React__namespace.useMemo(() => {
      var _getFloatingFocusElem;
      return ((_getFloatingFocusElem = getFloatingFocusElement(elements.floating)) == null ? void 0 : _getFloatingFocusElem.id) || defaultFloatingId;
    }, [elements.floating, defaultFloatingId]);
    const ariaRole = (_componentRoleToAriaR = componentRoleToAriaRoleMap.get(role)) != null ? _componentRoleToAriaR : role;
    const parentId = useFloatingParentNodeId();
    const isNested = parentId != null;
    const reference = React__namespace.useMemo(() => {
      if (ariaRole === 'tooltip' || role === 'label') {
        return {
          ["aria-" + (role === 'label' ? 'labelledby' : 'describedby')]: open ? floatingId : undefined
        };
      }
      return {
        'aria-expanded': open ? 'true' : 'false',
        'aria-haspopup': ariaRole === 'alertdialog' ? 'dialog' : ariaRole,
        'aria-controls': open ? floatingId : undefined,
        ...(ariaRole === 'listbox' && {
          role: 'combobox'
        }),
        ...(ariaRole === 'menu' && {
          id: referenceId
        }),
        ...(ariaRole === 'menu' && isNested && {
          role: 'menuitem'
        }),
        ...(role === 'select' && {
          'aria-autocomplete': 'none'
        }),
        ...(role === 'combobox' && {
          'aria-autocomplete': 'list'
        })
      };
    }, [ariaRole, floatingId, isNested, open, referenceId, role]);
    const floating = React__namespace.useMemo(() => {
      const floatingProps = {
        id: floatingId,
        ...(ariaRole && {
          role: ariaRole
        })
      };
      if (ariaRole === 'tooltip' || role === 'label') {
        return floatingProps;
      }
      return {
        ...floatingProps,
        ...(ariaRole === 'menu' && {
          'aria-labelledby': referenceId
        })
      };
    }, [ariaRole, floatingId, referenceId, role]);
    const item = React__namespace.useCallback(_ref => {
      let {
        active,
        selected
      } = _ref;
      const commonProps = {
        role: 'option',
        ...(active && {
          id: floatingId + "-fui-option"
        })
      };

      // For `menu`, we are unable to tell if the item is a `menuitemradio`
      // or `menuitemcheckbox`. For backwards-compatibility reasons, also
      // avoid defaulting to `menuitem` as it may overwrite custom role props.
      switch (role) {
        case 'select':
          return {
            ...commonProps,
            'aria-selected': active && selected
          };
        case 'combobox':
          {
            return {
              ...commonProps,
              'aria-selected': selected
            };
          }
      }
      return {};
    }, [floatingId, role]);
    return React__namespace.useMemo(() => enabled ? {
      reference,
      floating,
      item
    } : {}, [enabled, reference, floating, item]);
  }

  // Converts a JS style key like `backgroundColor` to a CSS transition-property
  // like `background-color`.
  const camelCaseToKebabCase = str => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());
  function execWithArgsOrReturn(valueOrFn, args) {
    return typeof valueOrFn === 'function' ? valueOrFn(args) : valueOrFn;
  }
  function useDelayUnmount(open, durationMs) {
    const [isMounted, setIsMounted] = React__namespace.useState(open);
    if (open && !isMounted) {
      setIsMounted(true);
    }
    React__namespace.useEffect(() => {
      if (!open && isMounted) {
        const timeout = setTimeout(() => setIsMounted(false), durationMs);
        return () => clearTimeout(timeout);
      }
    }, [open, isMounted, durationMs]);
    return isMounted;
  }
  /**
   * Provides a status string to apply CSS transitions to a floating element,
   * correctly handling placement-aware transitions.
   * @see https://floating-ui.com/docs/useTransition#usetransitionstatus
   */
  function useTransitionStatus(context, props) {
    if (props === void 0) {
      props = {};
    }
    const {
      open,
      elements: {
        floating
      }
    } = context;
    const {
      duration = 250
    } = props;
    const isNumberDuration = typeof duration === 'number';
    const closeDuration = (isNumberDuration ? duration : duration.close) || 0;
    const [status, setStatus] = React__namespace.useState('unmounted');
    const isMounted = useDelayUnmount(open, closeDuration);
    if (!isMounted && status === 'close') {
      setStatus('unmounted');
    }
    index$1(() => {
      if (!floating) return;
      if (open) {
        setStatus('initial');
        const frame = requestAnimationFrame(() => {
          // Ensure it opens before paint. With `FloatingDelayGroup`,
          // this avoids a flicker when moving between floating elements
          // to ensure one is always open with no missing frames.
          ReactDOM__namespace.flushSync(() => {
            setStatus('open');
          });
        });
        return () => {
          cancelAnimationFrame(frame);
        };
      }
      setStatus('close');
    }, [open, floating]);
    return {
      isMounted,
      status
    };
  }
  /**
   * Provides styles to apply CSS transitions to a floating element, correctly
   * handling placement-aware transitions. Wrapper around `useTransitionStatus`.
   * @see https://floating-ui.com/docs/useTransition#usetransitionstyles
   */
  function useTransitionStyles(context, props) {
    if (props === void 0) {
      props = {};
    }
    const {
      initial: unstable_initial = {
        opacity: 0
      },
      open: unstable_open,
      close: unstable_close,
      common: unstable_common,
      duration = 250
    } = props;
    const placement = context.placement;
    const side = placement.split('-')[0];
    const fnArgs = React__namespace.useMemo(() => ({
      side,
      placement
    }), [side, placement]);
    const isNumberDuration = typeof duration === 'number';
    const openDuration = (isNumberDuration ? duration : duration.open) || 0;
    const closeDuration = (isNumberDuration ? duration : duration.close) || 0;
    const [styles, setStyles] = React__namespace.useState(() => ({
      ...execWithArgsOrReturn(unstable_common, fnArgs),
      ...execWithArgsOrReturn(unstable_initial, fnArgs)
    }));
    const {
      isMounted,
      status
    } = useTransitionStatus(context, {
      duration
    });
    const initialRef = useLatestRef$1(unstable_initial);
    const openRef = useLatestRef$1(unstable_open);
    const closeRef = useLatestRef$1(unstable_close);
    const commonRef = useLatestRef$1(unstable_common);
    index$1(() => {
      const initialStyles = execWithArgsOrReturn(initialRef.current, fnArgs);
      const closeStyles = execWithArgsOrReturn(closeRef.current, fnArgs);
      const commonStyles = execWithArgsOrReturn(commonRef.current, fnArgs);
      const openStyles = execWithArgsOrReturn(openRef.current, fnArgs) || Object.keys(initialStyles).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {});
      if (status === 'initial') {
        setStyles(styles => ({
          transitionProperty: styles.transitionProperty,
          ...commonStyles,
          ...initialStyles
        }));
      }
      if (status === 'open') {
        setStyles({
          transitionProperty: Object.keys(openStyles).map(camelCaseToKebabCase).join(','),
          transitionDuration: openDuration + "ms",
          ...commonStyles,
          ...openStyles
        });
      }
      if (status === 'close') {
        const styles = closeStyles || initialStyles;
        setStyles({
          transitionProperty: Object.keys(styles).map(camelCaseToKebabCase).join(','),
          transitionDuration: closeDuration + "ms",
          ...commonStyles,
          ...styles
        });
      }
    }, [closeDuration, closeRef, initialRef, openRef, commonRef, openDuration, status, fnArgs]);
    return {
      isMounted,
      styles
    };
  }

  function getNodeChildren(nodes, id) {
    let allChildren = nodes.filter(node => {
      var _node$context;
      return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
    });
    let currentChildren = allChildren;
    while (currentChildren.length) {
      currentChildren = nodes.filter(node => {
        var _currentChildren;
        return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some(n => {
          var _node$context2;
          return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
        });
      });
      allChildren = allChildren.concat(currentChildren);
    }
    return allChildren;
  }

  function isPointInPolygon(point, polygon) {
    const [x, y] = point;
    let isInside = false;
    const length = polygon.length;
    for (let i = 0, j = length - 1; i < length; j = i++) {
      const [xi, yi] = polygon[i] || [0, 0];
      const [xj, yj] = polygon[j] || [0, 0];
      const intersect = yi >= y !== yj >= y && x <= (xj - xi) * (y - yi) / (yj - yi) + xi;
      if (intersect) {
        isInside = !isInside;
      }
    }
    return isInside;
  }
  function isInside(point, rect) {
    return point[0] >= rect.x && point[0] <= rect.x + rect.width && point[1] >= rect.y && point[1] <= rect.y + rect.height;
  }
  /**
   * Generates a safe polygon area that the user can traverse without closing the
   * floating element once leaving the reference element.
   * @see https://floating-ui.com/docs/useHover#safepolygon
   */
  function safePolygon(options) {
    if (options === void 0) {
      options = {};
    }
    const {
      buffer = 0.5,
      blockPointerEvents = false,
      requireIntent = true
    } = options;
    const timeoutRef = {
      current: -1
    };
    let hasLanded = false;
    let lastX = null;
    let lastY = null;
    let lastCursorTime = performance.now();
    function getCursorSpeed(x, y) {
      const currentTime = performance.now();
      const elapsedTime = currentTime - lastCursorTime;
      if (lastX === null || lastY === null || elapsedTime === 0) {
        lastX = x;
        lastY = y;
        lastCursorTime = currentTime;
        return null;
      }
      const deltaX = x - lastX;
      const deltaY = y - lastY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const speed = distance / elapsedTime; // px / ms

      lastX = x;
      lastY = y;
      lastCursorTime = currentTime;
      return speed;
    }
    const fn = _ref => {
      let {
        x,
        y,
        placement,
        elements,
        onClose,
        nodeId,
        tree
      } = _ref;
      return function onMouseMove(event) {
        function close() {
          clearTimeoutIfSet(timeoutRef);
          onClose();
        }
        clearTimeoutIfSet(timeoutRef);
        if (!elements.domReference || !elements.floating || placement == null || x == null || y == null) {
          return;
        }
        const {
          clientX,
          clientY
        } = event;
        const clientPoint = [clientX, clientY];
        const target = getTarget(event);
        const isLeave = event.type === 'mouseleave';
        const isOverFloatingEl = contains(elements.floating, target);
        const isOverReferenceEl = contains(elements.domReference, target);
        const refRect = elements.domReference.getBoundingClientRect();
        const rect = elements.floating.getBoundingClientRect();
        const side = placement.split('-')[0];
        const cursorLeaveFromRight = x > rect.right - rect.width / 2;
        const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
        const isOverReferenceRect = isInside(clientPoint, refRect);
        const isFloatingWider = rect.width > refRect.width;
        const isFloatingTaller = rect.height > refRect.height;
        const left = (isFloatingWider ? refRect : rect).left;
        const right = (isFloatingWider ? refRect : rect).right;
        const top = (isFloatingTaller ? refRect : rect).top;
        const bottom = (isFloatingTaller ? refRect : rect).bottom;
        if (isOverFloatingEl) {
          hasLanded = true;
          if (!isLeave) {
            return;
          }
        }
        if (isOverReferenceEl) {
          hasLanded = false;
        }
        if (isOverReferenceEl && !isLeave) {
          hasLanded = true;
          return;
        }

        // Prevent overlapping floating element from being stuck in an open-close
        // loop: https://github.com/floating-ui/floating-ui/issues/1910
        if (isLeave && isElement(event.relatedTarget) && contains(elements.floating, event.relatedTarget)) {
          return;
        }

        // If any nested child is open, abort.
        if (tree && getNodeChildren(tree.nodesRef.current, nodeId).length) {
          return;
        }

        // If the pointer is leaving from the opposite side, the "buffer" logic
        // creates a point where the floating element remains open, but should be
        // ignored.
        // A constant of 1 handles floating point rounding errors.
        if (side === 'top' && y >= refRect.bottom - 1 || side === 'bottom' && y <= refRect.top + 1 || side === 'left' && x >= refRect.right - 1 || side === 'right' && x <= refRect.left + 1) {
          return close();
        }

        // Ignore when the cursor is within the rectangular trough between the
        // two elements. Since the triangle is created from the cursor point,
        // which can start beyond the ref element's edge, traversing back and
        // forth from the ref to the floating element can cause it to close. This
        // ensures it always remains open in that case.
        let rectPoly = [];
        switch (side) {
          case 'top':
            rectPoly = [[left, refRect.top + 1], [left, rect.bottom - 1], [right, rect.bottom - 1], [right, refRect.top + 1]];
            break;
          case 'bottom':
            rectPoly = [[left, rect.top + 1], [left, refRect.bottom - 1], [right, refRect.bottom - 1], [right, rect.top + 1]];
            break;
          case 'left':
            rectPoly = [[rect.right - 1, bottom], [rect.right - 1, top], [refRect.left + 1, top], [refRect.left + 1, bottom]];
            break;
          case 'right':
            rectPoly = [[refRect.right - 1, bottom], [refRect.right - 1, top], [rect.left + 1, top], [rect.left + 1, bottom]];
            break;
        }
        function getPolygon(_ref2) {
          let [x, y] = _ref2;
          switch (side) {
            case 'top':
              {
                const cursorPointOne = [isFloatingWider ? x + buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4, y + buffer + 1];
                const cursorPointTwo = [isFloatingWider ? x - buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4, y + buffer + 1];
                const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.bottom - buffer : isFloatingWider ? rect.bottom - buffer : rect.top], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.bottom - buffer : rect.top : rect.bottom - buffer]];
                return [cursorPointOne, cursorPointTwo, ...commonPoints];
              }
            case 'bottom':
              {
                const cursorPointOne = [isFloatingWider ? x + buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4, y - buffer];
                const cursorPointTwo = [isFloatingWider ? x - buffer / 2 : cursorLeaveFromRight ? x + buffer * 4 : x - buffer * 4, y - buffer];
                const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.top + buffer : isFloatingWider ? rect.top + buffer : rect.bottom], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.top + buffer : rect.bottom : rect.top + buffer]];
                return [cursorPointOne, cursorPointTwo, ...commonPoints];
              }
            case 'left':
              {
                const cursorPointOne = [x + buffer + 1, isFloatingTaller ? y + buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4];
                const cursorPointTwo = [x + buffer + 1, isFloatingTaller ? y - buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4];
                const commonPoints = [[cursorLeaveFromBottom ? rect.right - buffer : isFloatingTaller ? rect.right - buffer : rect.left, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.right - buffer : rect.left : rect.right - buffer, rect.bottom]];
                return [...commonPoints, cursorPointOne, cursorPointTwo];
              }
            case 'right':
              {
                const cursorPointOne = [x - buffer, isFloatingTaller ? y + buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4];
                const cursorPointTwo = [x - buffer, isFloatingTaller ? y - buffer / 2 : cursorLeaveFromBottom ? y + buffer * 4 : y - buffer * 4];
                const commonPoints = [[cursorLeaveFromBottom ? rect.left + buffer : isFloatingTaller ? rect.left + buffer : rect.right, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.left + buffer : rect.right : rect.left + buffer, rect.bottom]];
                return [cursorPointOne, cursorPointTwo, ...commonPoints];
              }
          }
        }
        if (isPointInPolygon([clientX, clientY], rectPoly)) {
          return;
        }
        if (hasLanded && !isOverReferenceRect) {
          return close();
        }
        if (!isLeave && requireIntent) {
          const cursorSpeed = getCursorSpeed(event.clientX, event.clientY);
          const cursorSpeedThreshold = 0.1;
          if (cursorSpeed !== null && cursorSpeed < cursorSpeedThreshold) {
            return close();
          }
        }
        if (!isPointInPolygon([clientX, clientY], getPolygon([x, y]))) {
          close();
        } else if (!hasLanded && requireIntent) {
          timeoutRef.current = window.setTimeout(close, 40);
        }
      };
    };
    fn.__options = {
      blockPointerEvents
    };
    return fn;
  }

  const AnimationConstants = {
      DURATION_SHORT: 200,
      DURATION_MEDIUM: 400,
      DURATION_LONG: 600,
      DURATION_X_LONG: 800,
      FN_STANDARD: "cubic-bezier(0.2, 0.0, 0.0, 1.0)",
      FN_DECELERATE: "cubic-bezier(0.0, 0.0, 0.0, 1.0)",
      FN_ACCELERATE: "cubic-bezier(0.3, 0.0, 1.0, 1.0)",
  };

  const base = Object.freeze({
      Black: "#000",
      Transparent_Black: "rgba(0, 0, 0, 0)",
      White: "#fff",
      Transparent_White: "rgba(255, 255, 255, 0)",
      Red_50: "#fef7f7",
      Red_100: "#f9ebec",
      Red_200: "#f4dbdc",
      Red_300: "#ecc1c2",
      Red_400: "#e3a2a4",
      Red_500: "#dc898c",
      Red_600: "#d16b6e",
      Red_700: "#c1393e",
      Red_800: "#7d2528",
      Red_900: "#480303",
      Orange_50: "#fff1ea",
      Orange_100: "#fcefe1",
      Orange_200: "#fcdbb7",
      Orange_300: "#f9c180",
      Orange_400: "#f6a03c",
      Orange_500: "#e68a21",
      Orange_600: "#c87517",
      Orange_700: "#9f5d12",
      Orange_800: "#6e400c",
      Orange_900: "#392106",
      Yellow_50: "#fcf8ee",
      Yellow_100: "#fff3d9",
      Yellow_200: "#ffde82",
      Yellow_300: "#ffc340",
      Yellow_400: "#e7a807",
      Yellow_500: "#d59311",
      Yellow_600: "#af8123",
      Yellow_700: "#8b661a",
      Yellow_800: "#5c4913",
      Yellow_900: "#2d2609",
      Green_50: "#f1faf1",
      Green_100: "#e6f5e7",
      Green_200: "#c0ebc5",
      Green_300: "#9bdba2",
      Green_400: "#6dc67c",
      Green_500: "#53b76a",
      Green_600: "#0ca71c",
      Green_700: "#177d21",
      Green_800: "#075f10",
      Green_900: "#043109",
      Teal_50: "#e7faff",
      Teal_100: "#d3f9fc",
      Teal_200: "#a5eaf1",
      Teal_300: "#78dce6",
      Teal_400: "#49cad7",
      Teal_500: "#13b1b7",
      Teal_600: "#1c9ca0",
      Teal_700: "#14748f",
      Teal_800: "#0e485a",
      Teal_900: "#04242d",
      Sky_50: "#f4fbfe",
      Sky_100: "#e3f3ff",
      Sky_200: "#c4e5ff",
      Sky_300: "#a3d7ff",
      Sky_400: "#63bee4",
      Sky_500: "#2eb2ec",
      Sky_600: "#289bda",
      Sky_700: "#007bba",
      Sky_800: "#164e75",
      Sky_900: "#072435",
      Slate_50: "#eff5f6",
      Slate_100: "#e0eaed",
      Slate_200: "#d0dee4",
      Slate_300: "#bdcad1",
      Slate_400: "#a6b5bd",
      Slate_500: "#8fa3ad",
      Slate_600: "#788c97",
      Slate_700: "#627680",
      Slate_800: "#374f5c",
      Slate_900: "#203a49",
      Frost_50: "#f8f8f9",
      Frost_100: "#f0f1f3",
      Frost_200: "#dde1e4",
      Frost_300: "#c8ccd2",
      Frost_400: "#adb4bc",
      Frost_500: "#98a1ab",
      Frost_600: "#808a97",
      Frost_700: "#5e6b7d",
      Frost_800: "#3d4651",
      Frost_900: "#242930",
      Neutral_50: "#f8f8f8",
      Neutral_100: "#f1f1f1",
      Neutral_200: "#e1e1e1",
      Neutral_300: "#ccc",
      Neutral_400: "#b3b3b3",
      Neutral_500: "#a0a0a0",
      Neutral_600: "#898989",
      Neutral_700: "#6c6c6c",
      Neutral_800: "#4b4b4b",
      Neutral_900: "#272727",
  });
  const background = Object.freeze({
      dark_blue: base.Sky_900,
      card_standard: base.White,
      accent_1: base.Yellow_50,
      accent_2: base.Slate_100,
      accent_3: base.Teal_50,
      accent_4: base.Orange_50,
      disabled: base.Neutral_100,
      gray: base.Slate_50,
      hover: base.Sky_100,
      inverted: base.Teal_900,
      muted: base.Slate_100,
  });
  const border = Object.freeze({
      standard: base.Neutral_100,
      input: base.Slate_200,
      disabled: base.Neutral_600,
      interactive: base.Sky_700,
  });
  const call_to_action = Object.freeze({
      primary: base.Yellow_300,
      secondary: base.Sky_300,
      tertiary: base.Sky_700,
  });
  const data_visualization = Object.freeze({
      positive_1: base.Green_800,
      positive_2: base.Green_600,
      positive_3: base.Green_300,
      warning_1: base.Orange_700,
      warning_2: base.Orange_500,
      warning_3: base.Orange_300,
      negative_1: base.Red_800,
      negative_2: base.Red_700,
      negative_3: base.Red_600,
      generic_1: base.Sky_800,
      generic_2: base.Sky_700,
      generic_3: base.Sky_400,
      disabled_1: base.Neutral_600,
      disabled_2: base.Neutral_300,
      disabled_3: base.Neutral_100,
  });
  const status = Object.freeze({
      positive: base.Green_600,
      positive_light: base.Green_100,
      warning: base.Orange_500,
      warning_light: base.Yellow_100,
      muted: base.Slate_50,
      negative: base.Red_700,
      negative_light: base.Red_100,
  });
  const text = Object.freeze({
      strong: base.Black,
      regular: base.Slate_800,
      muted: base.Slate_700,
      disabled: base.Neutral_600,
      strong_inverted: base.White,
      regular_inverted: base.Slate_400,
      muted_inverted: base.Frost_600,
      disabled_inverted: base.Slate_900,
      link: base.Sky_700,
      link__hover: base.Sky_800,
      link__active: base.Sky_800,
      link_inverted: base.Sky_300,
      link_inverted__hover: base.Sky_700,
      link_inverted__active: base.Sky_700,
  });
  const Color = Object.freeze({
      base,
      background,
      border,
      call_to_action,
      data_visualization,
      status,
      text,
  });

  function buildSsrWrapper(Component, initialRenderJustChildren) {
      return props => {
          const [ssrComplete, setSsrComplete] = React__namespace.useState(false);
          React__namespace.useEffect(() => setSsrComplete(true), []);
          return ssrComplete
              ? React__namespace.createElement(Component, Object.assign({}, props))
              : (initialRenderJustChildren ? props["children"] : null);
      };
  }
  const justChildrenDuringSsr = component => buildSsrWrapper(component, true);

  const Placement = {
      "top": "top",
      "top-start": "top-start",
      "top-end": "top-end",
      "right": "right",
      "right-start": "right-start",
      "right-end": "right-end",
      "bottom": "bottom",
      "bottom-start": "bottom-start",
      "bottom-end": "bottom-end",
      "left": "left",
      "left-start": "left-start",
      "left-end": "left-end",
  };
  const Theme = {
      DARK: "DARK",
      LIGHT: "LIGHT",
  };
  const Scale = {
      SMALL: "SMALL",
      MEDIUM: "MEDIUM",
  };
  const ARROW_HEIGHT = 8;
  const ARROW_WIDTH = 2 * ARROW_HEIGHT;
  const DEFAULT_PLACEMENTS = [Placement.top, Placement.bottom];
  function buildAllowedPlacements(preferred) {
      const filtered = (preferred !== null && preferred !== void 0 ? preferred : []).filter((placement) => Object.values(Placement).includes(placement));
      if (filtered.length == 0) {
          return DEFAULT_PLACEMENTS;
      }
      const fallback = {
          [Placement["top"]]: Placement["bottom"],
          [Placement["top-start"]]: Placement["bottom-start"],
          [Placement["top-end"]]: Placement["bottom-end"],
          [Placement["bottom"]]: Placement["top"],
          [Placement["bottom-start"]]: Placement["top-start"],
          [Placement["bottom-end"]]: Placement["top-end"],
          [Placement["left"]]: Placement["right"],
          [Placement["left-start"]]: Placement["right-start"],
          [Placement["left-end"]]: Placement["right-end"],
          [Placement["right"]]: Placement["left"],
          [Placement["right-start"]]: Placement["left-start"],
          [Placement["right-end"]]: Placement["left-end"],
      }[filtered[0]];
      return [...filtered, fallback];
  }
  function useStudyInteractions(context) {
      const showOnHover = useHover(context, {
          mouseOnly: true,
          restMs: 150,
          move: false,
          handleClose: safePolygon(),
      });
      const showOnFocus = useFocus(context, {});
      const showOnClick = useClick(context, {
          ignoreMouse: true,
      });
      const hideOnEvents = useDismiss(context, {
          escapeKey: true,
          outsidePress: true,
          ancestorScroll: true,
      });
      const aria = useRole(context, {
          role: "tooltip",
      });
      return useInteractions([showOnHover, showOnFocus, showOnClick, hideOnEvents, aria]);
  }
  function useStudyTransitionStyles(context) {
      return useTransitionStyles(context, {
          duration: {
              open: AnimationConstants.DURATION_SHORT,
              close: AnimationConstants.DURATION_SHORT,
          },
          open: ({ side }) => ({
              transform: ((side === "top" && "translateY(0)")
                  || (side === "bottom" && "translateY(0)")
                  || (side === "left" && "translateX(0)")
                  || (side === "right" && "translateX(0)")),
              opacity: 1,
              transitionTimingFunction: AnimationConstants.FN_DECELERATE,
          }),
          initial: ({ side }) => ({
              transform: ((side === "top" && "translateY(8px)")
                  || (side === "bottom" && "translateY(-8px)")
                  || (side === "left" && "translateX(8px)")
                  || (side === "right" && "translateX(-8px)")),
              opacity: 0,
              transitionTimingFunction: AnimationConstants.FN_ACCELERATE,
          }),
      });
  }
  const TooltipComponent = React__namespace.forwardRef((_a, forwardedRef) => {
      var { body, children, className, disablePortal = false, preferredPlacements = [], scale = Scale.MEDIUM, theme = Theme.DARK } = _a, rest = __rest(_a, ["body", "children", "className", "disablePortal", "preferredPlacements", "scale", "theme"]);
      const [isOpen, setIsOpen] = React.useState(false);
      const arrowRef = React.useRef();
      const allowedPlacements = React.useMemo(() => buildAllowedPlacements(preferredPlacements), [preferredPlacements]);
      const preferredPlacement = allowedPlacements[0];
      const fallbackPlacements = allowedPlacements.slice(1);
      const { refs, floatingStyles, context } = useFloating({
          open: isOpen,
          onOpenChange: (newIsOpen, event, options) => setIsOpen(newIsOpen),
          placement: preferredPlacement,
          middleware: [
              offset(ARROW_HEIGHT),
              inline(),
              ...(() => {
                  const flipMiddleware = flip({
                      crossAxis: "alignment",
                      fallbackPlacements,
                  });
                  const shiftMiddleware = shift();
                  if (preferredPlacement.includes("-")) {
                      return [flipMiddleware, shiftMiddleware];
                  }
                  else {
                      return [shiftMiddleware, flipMiddleware];
                  }
              })(),
              arrow({
                  element: arrowRef,
                  padding: {
                      [Scale.SMALL]: 4,
                      [Scale.MEDIUM]: 8,
                  }[scale],
              }),
          ],
      });
      const { getReferenceProps, getFloatingProps } = useStudyInteractions(context);
      const { isMounted, styles: transitionStyles } = useStudyTransitionStyles(context);
      if (!(React__namespace.Children.count(children) == 1 && React__namespace.isValidElement(children))) {
          throw new Error("Children of <Tooltip> must be a single HTML element or forwarded to such.");
      }
      const clonedChildForReference = React__namespace.cloneElement(children, Object.assign({ ref: refs.setReference }, getReferenceProps()));
      const classNames = ["e2-tooltip"];
      if (scale === Scale.SMALL) {
          classNames.push("e2-tooltip--scale-small");
      }
      else if (scale === Scale.MEDIUM) {
          classNames.push("e2-tooltip--scale-medium");
      }
      if (theme === Theme.DARK) {
          classNames.push("e2-tooltip--theme-dark");
      }
      else if (theme === Theme.LIGHT) {
          classNames.push("e2-tooltip--theme-light");
      }
      if (className === null || className === void 0 ? void 0 : className.trim()) {
          classNames.push(className.trim());
      }
      let tooltip = null;
      if (isMounted) {
          const arrow = React__namespace.createElement(FloatingArrow, { ref: arrowRef, context: context, fill: theme === Theme.DARK ? Color.background.inverted : Color.background.card_standard, height: ARROW_HEIGHT, width: ARROW_WIDTH });
          const floatingElement = React__namespace.createElement("div", Object.assign({ ref: refs.setFloating, style: floatingStyles }, getFloatingProps()),
              React__namespace.createElement("div", { style: transitionStyles },
                  arrow,
                  React__namespace.createElement("div", Object.assign({ ref: forwardedRef, className: classNames.join(" ") }, rest), body)));
          tooltip = React__namespace.createElement(FloatingFocusManager, { context: context, modal: false, order: ["reference", "content"], restoreFocus: true, returnFocus: true }, floatingElement);
          if (!disablePortal) {
              tooltip = React__namespace.createElement(FloatingPortal, null, tooltip);
          }
      }
      return React__namespace.createElement(React__namespace.Fragment, null,
          clonedChildForReference,
          tooltip);
  });
  const Tooltip = Object.assign(justChildrenDuringSsr(TooltipComponent), {
      displayName: "Tooltip",
      Placement,
      Scale,
      Theme,
  });

  const Component$2 = React__namespace.forwardRef((_a, ref) => {
      var { "data-cname": cname = "trust_pilot_testimonial_card", "test-id": testId = cname, accomplishment, authorImageSize = Avatar.Size.MEDIUM, authorImageUrl, header, hideAuthorImage = false, layout, testimonial, truncateTestimonial = false } = _a, otherProps = __rest(_a, ["data-cname", "test-id", "accomplishment", "authorImageSize", "authorImageUrl", "header", "hideAuthorImage", "layout", "testimonial", "truncateTestimonial"]);
      if (!testimonial) {
          throw new Error("TrustPilotTestimonial is missing required field: testimonial");
      }
      return (React__namespace.createElement(Testimonial, Object.assign({ "data-cname": cname, "test-id": testId, ref: ref, authorDescription: accomplishment, authorName: testimonial.name, authorImageUrl: authorImageUrl, authorImageSize: authorImageSize, body: testimonial.review, header: header, hideAuthorImage: hideAuthorImage, layout: layout, score: testimonial.rating, scoreStyle: Testimonial.ScoreStyle.TRUSTPILOT, truncateTestimonial: truncateTestimonial }, otherProps)));
  });
  const TrustPilotTestimonial = Object.assign(Component$2, {
      displayName: "TrustPilotTestimonial",
  });

  const isFeaturedReviewJustFirstReview = (featuredReview, reviews) => {
      if (!featuredReview || !reviews || reviews.length === 0) {
          return false;
      }
      const firstReview = reviews[0];
      return firstReview.name === featuredReview.name && firstReview.review === featuredReview.review &&
          firstReview.rating === featuredReview.rating && firstReview.date === featuredReview.date;
  };
  const TrustPilotFeatureReview = mobxReact.observer(({ featuredReview, featuredReviewProduct, description }) => {
      const testimonialDescription = !!description ? description : (!!featuredReviewProduct ? `On ${featuredReviewProduct} success` : null);
      return (React__namespace.createElement("div", { className: "e2-trustpilot-reviews-featured-testimonial", "test-id": "trustpilot-reviews-featured-review" },
          React__namespace.createElement("div", { className: "e2-trustpilot-reviews-featured-testimonial__title" }, "What students are saying"),
          React__namespace.createElement("div", { className: "e2-trustpilot-reviews-featured-testimonial__content" },
              React__namespace.createElement("div", { className: "e2-trustpilot-reviews-featured-testimonial__quote" }, featuredReview.review),
              React__namespace.createElement("div", { className: "e2-trustpilot-reviews-featured-testimonial__author" },
                  React__namespace.createElement("div", { className: "e2-trustpilot-reviews-featured-testimonial__author-name" }, featuredReview.name),
                  React__namespace.createElement("div", { className: "e2-trustpilot-reviews-featured-testimonial__author-success-message" }, testimonialDescription),
                  React__namespace.createElement("div", { className: "e2-trustpilot-reviews-featured-testimonial__via-trustpilot" },
                      "Via ",
                      React__namespace.createElement("img", { src: "/images/ratings-reviews/trust-pilot-star.svg", alt: "trustpilot star" }),
                      " Trustpilot")))));
  });
  const TrustPilotReviews = mobxReact.observer(class TrustPilotReviews extends React__namespace.Component {
      constructor(props) {
          super(props);
          this.state = { isViewMoreExpanded: false };
      }
      render() {
          const trackingProps = pickTrackingProps(this.props);
          const featuredReviewTrackingProps = addSuffixToTrackingProps(trackingProps, "_featured_review");
          const trustpilotTestimonialTrackingProps = addSuffixToTrackingProps(trackingProps, "_testimonial");
          const viewMoreBtnTrackingProps = addSuffixToTrackingProps(trackingProps, "_view-more-btn");
          let reviews = this.props.reviews;
          if (isFeaturedReviewJustFirstReview(this.props.featuredReview, reviews)) {
              reviews = reviews.slice(1);
          }
          if (!this.props.featuredReview && (!reviews || reviews.length === 0)) {
              return null;
          }
          reviews = (reviews || []).map(review => { review.date = new Date(review.date); return review; });
          let scoreRoundedDown = 4;
          let starScoreImagePath = "";
          if ((reviews === null || reviews === void 0 ? void 0 : reviews.length) > 0) {
              scoreRoundedDown = Math.floor(this.props.reviewScore);
              if (!scoreRoundedDown || scoreRoundedDown < 4) {
                  scoreRoundedDown = 4;
              }
              starScoreImagePath = `/images/ratings-reviews/trust-pilot-stars-${scoreRoundedDown}.svg`;
          }
          const reviewsAlwaysDisplayed = reviews ? reviews.slice(0, 3) : [];
          const reviewsBehindViewMore = (reviews === null || reviews === void 0 ? void 0 : reviews.length) > 3 ? reviews.slice(3) : [];
          return React__namespace.createElement(React__namespace.Fragment, null,
              !!this.props.featuredReview && (React__namespace.createElement(TrustPilotFeatureReview, Object.assign({ featuredReview: this.props.featuredReview, featuredReviewProduct: this.props.featuredReviewProduct, description: this.props.featuredReviewAlternativeDescription }, featuredReviewTrackingProps))),
              (reviewsAlwaysDisplayed === null || reviewsAlwaysDisplayed === void 0 ? void 0 : reviewsAlwaysDisplayed.length) > 0 && (React__namespace.createElement("div", Object.assign({ className: "e2-trustpilot-reviews" }, trackingProps),
                  React__namespace.createElement("div", { className: "e2-trustpilot-reviews__info" },
                      React__namespace.createElement("div", { className: "e2-trustpilot-reviews__title" },
                          React__namespace.createElement("img", { src: "/images/ratings-reviews/trust-pilot-star.svg", alt: "trustpilot star" }),
                          React__namespace.createElement("div", null, "Trustpilot\u00A0reviews")),
                      React__namespace.createElement("div", { className: "e2-trustpilot-reviews__score-and-stars" },
                          React__namespace.createElement("div", { className: "e2-trustpilot-reviews__score" }, this.props.reviewScore),
                          React__namespace.createElement("div", { className: "e2-trustpilot-reviews__stars" },
                              React__namespace.createElement("img", { src: starScoreImagePath, alt: "trustpilot score" })),
                          React__namespace.createElement("div", { className: "e2-trustpilot-reviews__review-count" },
                              this.props.reviewCount,
                              " reviews"))),
                  React__namespace.createElement("div", { className: "e2-trustpilot-reviews__review-container" },
                      reviewsAlwaysDisplayed.map((review, index) => (React__namespace.createElement(React__namespace.Fragment, { key: `review__${index}` },
                          React__namespace.createElement(TrustPilotTestimonial, Object.assign({ testimonial: review }, trustpilotTestimonialTrackingProps))))),
                      (reviewsBehindViewMore === null || reviewsBehindViewMore === void 0 ? void 0 : reviewsBehindViewMore.length) > 0 &&
                          React__namespace.createElement(React__namespace.Fragment, null,
                              React__namespace.createElement("div", { className: "e2-trustpilot-reviews__view-more-review-container" + (this.state.isViewMoreExpanded ? " active" : "") }, reviewsBehindViewMore.map((review, index) => React__namespace.createElement(TrustPilotTestimonial, Object.assign({ key: `review__${index}`, testimonial: review }, trustpilotTestimonialTrackingProps)))),
                              React__namespace.createElement(Button, Object.assign({ className: "e2-trustpilot-reviews__view-more-btn", variant: Button.Variant.SECONDARY }, viewMoreBtnTrackingProps, { onClick: () => this.setState({ isViewMoreExpanded: !this.state.isViewMoreExpanded }) }), this.state.isViewMoreExpanded ? "View less" : "View more"))))));
      }
  });

  const _doesQueryOrSuggestionContainEachOther = (suggestion, query) => {
      if (!suggestion || !query) {
          return false;
      }
      const containsLowerCase = (s, substr) => s.toLowerCase().includes(substr.toLowerCase());
      return containsLowerCase(query, suggestion) || suggestion.split(' ').some(word => containsLowerCase(query, word));
  };
  const createFetchSuggestionsFnFromStringArray = (suggestions) => {
      return (query, signal) => {
          if (!suggestions || !(query === null || query === void 0 ? void 0 : query.trim())) {
              return Promise.resolve(null);
          }
          return Promise.resolve(suggestions.filter(suggestion => _doesQueryOrSuggestionContainEachOther(suggestion, query)));
      };
  };
  const requireMinimumCharacters = (minLength, fetchSuggestionsFn) => {
      return (query, signal) => {
          if ((query !== null && query !== void 0 ? query : "").length < minLength) {
              return Promise.resolve(null);
          }
          return fetchSuggestionsFn(query, signal);
      };
  };
  const TypeaheadUtil = {
      createFetchSuggestionsFnFromStringArray,
      requireMinimumCharacters
  };

  const Variant$1 = {
      ERROR: "ERROR",
      INFO: "INFO",
      POSITIVE: "POSITIVE",
      WARNING: "WARNING",
  };
  class ToastStore {
      constructor() {
          Object.defineProperty(this, "shouldPauseAutoDismiss", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: false
          });
          Object.defineProperty(this, "toastsMarkedForRemoval", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: []
          });
          Object.defineProperty(this, "toasts", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: []
          });
          mobx.makeAutoObservable(this, {
              toasts: mobx.observable.shallow,
          });
      }
      addToast(toast) {
          if (!toast.id) {
              toast.id = Math.random().toString(36).substring(2, 15);
          }
          if (toast.id && this.toasts.find((t) => t.id === toast.id)) {
              console.error("Tried to add a toast with a duplicate id", toast.id);
              toast.id = Math.random().toString(36).substring(2, 15);
          }
          this.toasts.push(toast);
      }
      markToastForRemoval(toastId) {
          const targetToast = this.toasts.find((toast) => toast.id === toastId);
          if (targetToast) {
              this.toastsMarkedForRemoval.push(toastId);
          }
          else {
              console.error("Tried to remove a toast that doesn't exist", toastId);
          }
      }
      removeToast(toastId) {
          this.toasts = this.toasts.filter((toast) => toast.id !== toastId);
      }
      pauseAutoDismiss() {
          this.shouldPauseAutoDismiss = true;
      }
      resumeAutoDismiss() {
          this.shouldPauseAutoDismiss = false;
      }
  }

  const useFlipAnimation = (dependencies) => {
      const boundingClientRectSnapshot = React__namespace.useRef(null);
      const elementRef = React__namespace.useRef(null);
      React.useLayoutEffect(() => {
          const element = elementRef.current;
          if (!element) {
              return;
          }
          const runningAnimations = element.getAnimations().filter((animation => animation.playState === "running"));
          if (runningAnimations.length > 0) {
              const runningAnimation = runningAnimations[0];
              runningAnimation.addEventListener("finish", () => {
                  boundingClientRectSnapshot.current = element.getBoundingClientRect();
              });
              return;
          }
          const originalPosition = boundingClientRectSnapshot.current;
          if (!originalPosition) {
              boundingClientRectSnapshot.current = element.getBoundingClientRect();
              return;
          }
          const destinationPosition = element.getBoundingClientRect();
          const deltaX = originalPosition.left - destinationPosition.left;
          const deltaY = originalPosition.top - destinationPosition.top;
          const deltaWidth = originalPosition.width / destinationPosition.width;
          const deltaHeight = originalPosition.height / destinationPosition.height;
          if (deltaX === 0
              && deltaY === 0
              && deltaWidth === 0
              && deltaHeight === 0) {
              return;
          }
          let transforms = [];
          if (deltaX !== 0 || deltaY !== 0) {
              transforms.push(`translate(${deltaX}px, ${deltaY}px)`);
          }
          if (deltaHeight !== 0 || deltaWidth !== 0) {
              transforms.push(`scale(${deltaWidth}, ${deltaHeight})`);
          }
          const animation = element.animate([{
                  transformOrigin: "top left",
                  transform: transforms.join(" ")
              }, {
                  transformOrigin: "top left",
                  transform: "none"
              }], {
              duration: AnimationConstants.DURATION_SHORT,
              easing: AnimationConstants.FN_STANDARD,
              fill: "both",
          });
          animation.onfinish = () => {
              boundingClientRectSnapshot.current = destinationPosition;
          };
      }, dependencies);
      return elementRef;
  };

  const setPausableTimeout = (doneFn, delay, minimumRemainingDelay) => {
      if (delay < 0) {
          console.warn("Delay cannot be negative, setting to 0");
          delay = 0;
      }
      let startTime = null;
      let timeLeft = delay;
      let timeout = null;
      const start = () => {
          if (timeout) {
              console.warn("This timeout has already started, resetting...");
              clearTimeout(timeout);
              timeLeft = delay;
          }
          startTime = Date.now();
          timeout = setTimeout(() => {
              doneFn();
              timeout = null;
              startTime = null;
          }, timeLeft);
      };
      const pause = () => {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          else {
              console.warn("No timeout to pause");
          }
          if (startTime) {
              const elapsed = Date.now() - startTime;
              timeLeft = Math.max(timeLeft - elapsed, 0);
              startTime = null;
          }
      };
      const resume = () => {
          if (timeout) {
              return;
          }
          if (timeLeft < minimumRemainingDelay) {
              timeLeft = minimumRemainingDelay;
          }
          startTime = Date.now();
          timeout = setTimeout(() => {
              doneFn();
              timeout = null;
              startTime = null;
          }, timeLeft);
      };
      const clear = () => {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          startTime = null;
          timeLeft = delay;
      };
      return {
          start,
          pause,
          resume,
          clear,
      };
  };

  const AnimationState = {
      ANIMATING_IN: "ANIMATING_IN",
      IDLE: "IDLE",
      ANIMATING_OUT: "ANIMATING_OUT",
  };
  const ToastIcon = ({ variant }) => {
      let svgSrc;
      if (variant === Variant$1.POSITIVE) {
          svgSrc = "icon-check-circle-20";
      }
      else {
          svgSrc = "icon-info-circle-20";
      }
      return React__namespace.createElement(MaterialIcon, { filename: svgSrc });
  };
  const ToastComponent = (mobxReact.observer(React__namespace.forwardRef(function ToastComponent(_a, forwardRef) {
      var { id, header, description, variant = Variant$1.INFO, store, "data-cname": dataCname, "test-id": testId = dataCname } = _a, otherProps = __rest(_a, ["id", "header", "description", "variant", "store", "data-cname", "test-id"]);
      const [animationState, setAnimationState] = React__namespace.useState(AnimationState.ANIMATING_IN);
      const flipRef = useFlipAnimation([store.toasts.length]);
      const toastRef = React__namespace.useRef(null);
      const mergedRefs = useCombinedRef(toastRef, flipRef, forwardRef);
      React.useEffect(() => {
          const toastEl = toastRef.current;
          if (!toastEl) {
              return;
          }
          const handleAnimationEnd = () => {
              setAnimationState(AnimationState.IDLE);
              toastEl.removeEventListener("animationend", handleAnimationEnd);
          };
          toastEl.addEventListener("animationend", handleAnimationEnd);
      }, []);
      React.useEffect(() => {
          const disposer = mobx.when(() => store.toastsMarkedForRemoval.includes(id), () => {
              const toastEl = toastRef.current;
              if (!toastEl || !store.toastsMarkedForRemoval.includes(id)) {
                  return;
              }
              setAnimationState(AnimationState.ANIMATING_OUT);
              const handleAnimationEnd = () => {
                  toastEl.removeEventListener("animationend", handleAnimationEnd);
                  store.removeToast(id);
              };
              toastEl.addEventListener("animationend", handleAnimationEnd);
          });
          return () => disposer();
      }, []);
      let dismissalDelay = 4000;
      if (variant === Variant$1.ERROR || variant === Variant$1.WARNING) {
          dismissalDelay = 7000;
      }
      let minimumRemainingDelay = 1000;
      const dismissalTimeout = setPausableTimeout(() => store.markToastForRemoval(id), dismissalDelay, minimumRemainingDelay);
      React.useEffect(() => {
          const disposer = mobx.reaction(() => store.shouldPauseAutoDismiss, () => {
              if (store.shouldPauseAutoDismiss) {
                  dismissalTimeout.pause();
              }
              else {
                  dismissalTimeout.resume();
              }
          });
          dismissalTimeout.start();
          return () => {
              dismissalTimeout.clear();
              disposer();
          };
      }, []);
      const toastClass = ["e2-toast"];
      if (variant === Variant$1.ERROR) {
          toastClass.push("e2-toast--error");
      }
      else if (variant === Variant$1.INFO) {
          toastClass.push("e2-toast--info");
      }
      else if (variant === Variant$1.POSITIVE) {
          toastClass.push("e2-toast--positive");
      }
      else if (variant === Variant$1.WARNING) {
          toastClass.push("e2-toast--warning");
      }
      if (animationState === AnimationState.ANIMATING_IN) {
          toastClass.push("e2-toast--animating-in");
      }
      else if (animationState === AnimationState.ANIMATING_OUT) {
          toastClass.push("e2-toast--animating-out");
      }
      return (React__namespace.createElement("div", Object.assign({ className: toastClass.join(" "), ref: mergedRefs, "data-cname": dataCname, "test-id": testId }, otherProps),
          React__namespace.createElement(ToastIcon, { variant: variant }),
          React__namespace.createElement("div", { className: "e2-toast__content" },
              React__namespace.createElement("h5", { className: "e2-toast__header", "test-id": "e2-toast-header" }, header),
              description &&
                  React__namespace.createElement("p", { className: "e2-toast__description", "test-id": "e2-toast-description" }, description)),
          React__namespace.createElement("button", { className: "e2-toast__dismiss", onClick: () => store.markToastForRemoval(id), "data-cname": dataCname + "__dismiss", "test-id": testId + "__dismiss" },
              React__namespace.createElement(MaterialIcon, { filename: "icon-close-20" }))));
  })));
  const Toast = Object.assign(ToastComponent, {
      "displayName": "Toast",
      Variant: Variant$1,
  });
  const ToastManager = mobxReact.observer(({ store }) => {
      if (store.toasts.length === 0) {
          return null;
      }
      return (React__namespace.createElement("div", { className: "e2-toasts-container", onMouseEnter: () => store.pauseAutoDismiss(), onMouseLeave: () => store.resumeAutoDismiss() }, store.toasts.map((toast) => (React__namespace.createElement(Toast, Object.assign({ key: toast.id, store: store }, toast))))));
  });

  const toastStore = new ToastStore();
  if (typeof document !== "undefined") {
      const portal = ReactDOM__namespace.createPortal(React__namespace.createElement(ToastManager, { store: toastStore }), document.body);
      const detachedDivElement = document.createElement("div");
      const root = client.createRoot(detachedDivElement);
      root.render(portal);
  }

  const JUSTIFY = {
      CENTER: "center",
      LEFT: "left"
  };
  const SIZE = {
      LARGE: "lg",
      SMALL: "sm"
  };
  let idCounter = 0;
  const InheritContext = React__namespace.createContext({});
  const SelectedContext = React__namespace.createContext(null);
  const Boxes = (_a) => {
      var { multiple, children } = _a, inheritable = __rest(_a, ["multiple", "children"]);
      const [selectedIds, setSelectedIds] = React.useState(new Set());
      const updateId = (id, shouldBeSelected) => {
          const wasSelected = selectedIds.has(id);
          shouldBeSelected = shouldBeSelected !== null && shouldBeSelected !== void 0 ? shouldBeSelected : !wasSelected;
          setSelectedIds(previouslySelected => {
              let updated = new Set(previouslySelected);
              if (shouldBeSelected) {
                  if (!multiple) {
                      updated.clear();
                  }
                  updated.add(id);
              }
              else {
                  updated.delete(id);
              }
              return updated;
          });
      };
      const deleteId = (id) => {
          setSelectedIds(previouslySelected => {
              let updated = new Set(previouslySelected);
              updated.delete(id);
              return updated;
          });
      };
      React.useEffect(() => {
          if (!multiple && selectedIds.size > 0) {
              const firstSelectedId = selectedIds.values().next().value;
              setSelectedIds(new Set([firstSelectedId]));
          }
      }, [multiple]);
      let classes = ["e2-button-boxes"];
      if (inheritable.size === SIZE.SMALL) {
          classes.push("e2-button-box--sm");
      }
      return React__namespace.createElement(SelectedContext.Provider, { value: { selectedIds, updateId, deleteId } },
          React__namespace.createElement(InheritContext.Provider, { value: Object.assign({}, inheritable) },
              React__namespace.createElement("div", { className: classes.join(" ") }, children)));
  };
  const Box = (_a) => {
      var _b, _c, _d;
      var { as, caption, defaultSelected, disabled, icon, iconSize, justify, onChange, selected, size, text } = _a, elProps = __rest(_a, ["as", "caption", "defaultSelected", "disabled", "icon", "iconSize", "justify", "onChange", "selected", "size", "text"]);
      let inheritable = React.useContext(InheritContext);
      as = (_b = as !== null && as !== void 0 ? as : inheritable.as) !== null && _b !== void 0 ? _b : "button";
      justify = (_c = justify !== null && justify !== void 0 ? justify : inheritable.justify) !== null && _c !== void 0 ? _c : JUSTIFY.LEFT;
      size = (_d = size !== null && size !== void 0 ? size : inheritable.size) !== null && _d !== void 0 ? _d : SIZE.LARGE;
      disabled = disabled !== null && disabled !== void 0 ? disabled : inheritable.disabled;
      let { selectedIds, updateId, deleteId } = React.useContext(SelectedContext);
      const [id] = React.useState(() => {
          const id = idCounter++;
          selectedIds = new Set([]);
          if (selected !== null && selected !== void 0 ? selected : defaultSelected) {
              selectedIds.add(id);
          }
          return id;
      });
      const isSelected = !!(selected !== null && selected !== void 0 ? selected : selectedIds.has(id));
      React.useEffect(() => {
          updateId(id, isSelected);
          return () => deleteId(id);
      }, [id, isSelected]);
      let className = ["e2-button-box", `e2-button-box--${justify}`, `e2-button-box--${size}`];
      if (caption) {
          className.push("e2-button-box--with-caption");
      }
      if (isSelected) {
          className.push("e2-button-box--selected");
      }
      if (as === "a" && disabled) {
          className.push("e2-button-box--disabled");
      }
      else {
          elProps = Object.assign({}, elProps);
          elProps['disabled'] = disabled;
      }
      let onClick = React.useCallback((e) => {
          if (!disabled) {
              onChange === null || onChange === void 0 ? void 0 : onChange(!isSelected);
              updateId(id, !isSelected);
          }
      }, [disabled, isSelected, onChange]);
      return React__namespace.createElement(as, Object.assign({ className: className.join(" "), onClick: onClick }, elProps), React__namespace.createElement(React__namespace.Fragment, null,
          icon ? (React__namespace.createElement("div", { className: "e2-button-box__image" },
              React__namespace.createElement(MaterialIcon, { filename: `icon-${icon}-${iconSize}`, size: iconSize }))) : (React__namespace.createElement("div", { className: "e2-button-box__image" },
              React__namespace.createElement("span", { className: "e2-button-box__icon--no-filler" }))),
          React__namespace.createElement("div", { className: "e2-button-box__body" },
              React__namespace.createElement("span", { className: "e2-button-box__text" }, text),
              caption && React__namespace.createElement("span", { className: "e2-button-box__caption" }, caption))));
  };
  var ButtonBoxes = Object.assign(Boxes, {
      displayName: "ButtonBoxes",
      Size: SIZE,
      Justify: JUSTIFY,
      Box: Object.assign(Box, {
          displayName: "ButtonBoxes.Box"
      })
  });

  var dayjs_min = {exports: {}};

  (function (module, exports) {
  	!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return "["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0;}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return b},m.isValid=function(){return !(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g;}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O})); 
  } (dayjs_min));

  var dayjs_minExports = dayjs_min.exports;
  var dayjs = /*@__PURE__*/getDefaultExportFromCjs(dayjs_minExports);

  const DIRECTION_ENUM = {
      UP: "up",
      DOWN: "down",
      LEFT: "left",
      RIGHT: "right"
  };
  const opposites = {
      [DIRECTION_ENUM.UP]: DIRECTION_ENUM.DOWN,
      [DIRECTION_ENUM.DOWN]: DIRECTION_ENUM.UP,
      [DIRECTION_ENUM.LEFT]: DIRECTION_ENUM.RIGHT,
      [DIRECTION_ENUM.RIGHT]: DIRECTION_ENUM.LEFT
  };
  function isEdgeOffscreen(direction, boundingRect) {
      if (direction === DIRECTION_ENUM.UP) {
          return boundingRect.top < 0;
      }
      if (direction === DIRECTION_ENUM.DOWN) {
          return boundingRect.bottom > window.innerHeight;
      }
      if (direction === DIRECTION_ENUM.LEFT) {
          return boundingRect.left < 0;
      }
      if (direction === DIRECTION_ENUM.RIGHT) {
          return boundingRect.right > window.innerHeight;
      }
  }
  const Component$1 = React.forwardRef((_a, ref) => {
      var { show = false, dropDirection = DIRECTION_ENUM.DOWN, flipToFitScreen = true, className, children } = _a, divProps = __rest(_a, ["show", "dropDirection", "flipToFitScreen", "className", "children"]);
      let [flip, setFlip] = React.useState(false);
      let [flipFailed, setFlipFailed] = React.useState(false);
      let box = React.useRef(null);
      let combined = useCombinedRef(ref, box);
      {
          React.useLayoutEffect(() => {
              if (!flipToFitScreen) {
                  return;
              }
              if (!show) {
                  setFlip(false);
                  setFlipFailed(false);
                  return;
              }
              if (flipFailed) {
                  return;
              }
              if (!box.current) {
                  return;
              }
              let rect = box.current.getBoundingClientRect();
              if (isEdgeOffscreen(flip ? opposites[dropDirection] : dropDirection, rect)) {
                  setFlipFailed(flip);
                  setFlip(!flip);
              }
          }, [dropDirection, flip, show]);
      }
      let classes = ["e2-drop-box"];
      if (className) {
          classes.push(className);
      }
      if (show) {
          classes.push("e2-drop-box--show");
      }
      let finalDirection = flip ? opposites[dropDirection] : dropDirection;
      classes.push(`e2-drop-box--${finalDirection}`);
      return React__namespace.createElement("div", Object.assign({ className: classes.join(" "), ref: combined }, divProps), children);
  });
  const DropBox = Object.assign(Component$1, {
      displayName: "DropBox",
      Direction: DIRECTION_ENUM
  });

  class CalendarState {
      constructor(props) {
          var _a;
          Object.defineProperty(this, "minDate", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          Object.defineProperty(this, "maxDate", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          Object.defineProperty(this, "cursorMonth", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          Object.defineProperty(this, "cursorDay", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          Object.defineProperty(this, "hoverDay", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          Object.defineProperty(this, "rangeDay", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          Object.defineProperty(this, "anchorDay", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          Object.defineProperty(this, "selected", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          Object.defineProperty(this, "focusStealAllowed", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: false
          });
          let start = dayjs((_a = props.initialDate) !== null && _a !== void 0 ? _a : undefined);
          this.cursorMonth = start.startOf("month");
          this.cursorDay = start.startOf("day");
          if (props.initialDate) {
              this.selected = start;
          }
          if (props.rangeMode) {
              this.anchorDay = this.cursorDay;
          }
          if (props.min) {
              this.minDate = dayjs(props.min);
          }
          if (props.max) {
              this.maxDate = dayjs(props.max);
          }
          mobx.makeAutoObservable(this);
          mobx.reaction(() => this.hoverDay, mobx.action(() => this.rangeDay = this.hoverDay));
          mobx.reaction(() => this.cursorDay, mobx.action(() => this.rangeDay = this.cursorDay));
      }
      select(day) {
          this.selected = day;
          this.moveCursor(day);
      }
      moveCursor(day, stealFocus = true) {
          var _a, _b;
          if (((_a = this.minDate) === null || _a === void 0 ? void 0 : _a.isAfter(day)) || ((_b = this.maxDate) === null || _b === void 0 ? void 0 : _b.isBefore(day))) {
              return;
          }
          this.cursorDay = day;
          this.focusStealAllowed = stealFocus;
          if (day.isBefore(this.cursorMonth) || day.isAfter(this.cursorMonth.endOf("month"))) {
              this.cursorMonth = day.startOf("month");
          }
      }
      get monthTitle() {
          return this.cursorMonth.format("MMMM YYYY");
      }
      get monthGrid() {
          let monthStart = this.cursorMonth.startOf("month");
          let monthEnd = this.cursorMonth.endOf("month").startOf("day");
          let prefillDays = monthStart.day();
          let postfillDays = 6 - monthEnd.day();
          let grid = [];
          for (let i = 0, day = monthStart.subtract(1, "day"); i < prefillDays; i++, day = day.subtract(1, "day")) {
              grid.unshift(day);
          }
          for (let day = monthStart; !day.isAfter(monthEnd); day = day.add(1, "day")) {
              grid.push(day);
          }
          for (let i = 0, day = monthEnd.add(1, "day"); i < postfillDays; i++, day = day.add(1, "day")) {
              grid.push(day);
          }
          return grid;
      }
  }
  const CalendarContext = React.createContext(null);
  const Day = mobxReact.observer(React.forwardRef((props, forward) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      let { day } = props;
      let state = React.useContext(CalendarContext);
      let buttonRef = React.useRef(null);
      let hoverRef = useEventBindingRef({
          'mouseenter': (e) => {
              mobx.runInAction(() => state.hoverDay = day);
          }
      }, []);
      let combinedRef = useCombinedRef(buttonRef, hoverRef, forward);
      React.useEffect(() => mobx.autorun(() => {
          if (buttonRef.current && state.focusStealAllowed && day.isSame(state.cursorDay)) {
              buttonRef.current.focus();
          }
      }), []);
      let classes = ["e2-calendar__day"];
      if (((_a = state.selected) === null || _a === void 0 ? void 0 : _a.isSame(day)) || ((_b = state.anchorDay) === null || _b === void 0 ? void 0 : _b.isSame(day))) {
          classes.push("e2-calendar__day--selected");
      }
      else if (day.isBefore(state.cursorMonth) || day.isAfter(state.cursorMonth.endOf("month"))) {
          classes.push("e2-calendar__day--distant");
      }
      if ((((_c = state.anchorDay) === null || _c === void 0 ? void 0 : _c.isBefore(day)) && ((_d = state.rangeDay) === null || _d === void 0 ? void 0 : _d.isAfter(day)))
          || ((_e = state.anchorDay) === null || _e === void 0 ? void 0 : _e.isAfter(day)) && ((_f = state.rangeDay) === null || _f === void 0 ? void 0 : _f.isBefore(day))) {
          classes.push("e2-calendar__day--in-range");
      }
      let outOfMinMax = ((_g = state.maxDate) === null || _g === void 0 ? void 0 : _g.isBefore(day)) || ((_h = state.minDate) === null || _h === void 0 ? void 0 : _h.isAfter(day));
      return React__namespace.createElement("button", { className: classes.join(" "), ref: combinedRef, "aria-label": day.format("MMMM D"), onClick: () => state.select(day), tabIndex: state.cursorDay.isSame(day) ? 0 : -1, disabled: outOfMinMax }, day.date());
  }));
  const Calendar = mobxReact.observer(React.forwardRef((props, forward) => {
      let [state,] = React.useState(() => new CalendarState(props));
      React.useEffect(() => {
          return mobx.reaction(() => state.selected, (now, prev) => {
              var _a;
              if (now !== null && !(prev === null || prev === void 0 ? void 0 : prev.isSame(now))) {
                  (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, now);
              }
          });
      }, []);
      let ref = useEventBindingRef({
          "keydown": (e) => {
              let shifted = e.getModifierState("Shift");
              let unhandled = false;
              switch (e.key) {
                  case "ArrowUp":
                      state.moveCursor(state.cursorDay.subtract(1, "week"));
                      break;
                  case "ArrowDown":
                      state.moveCursor(state.cursorDay.add(1, "week"));
                      break;
                  case "ArrowLeft":
                      state.moveCursor(state.cursorDay.subtract(1, "day"));
                      break;
                  case "ArrowRight":
                      state.moveCursor(state.cursorDay.add(1, "day"));
                      break;
                  case "Home":
                      state.moveCursor(state.cursorDay.startOf("week"));
                      break;
                  case "End":
                      state.moveCursor(state.cursorDay.endOf("week"));
                      break;
                  case "PageUp":
                      state.moveCursor(state.cursorDay.subtract(1, shifted ? "year" : "month"));
                      break;
                  case "PageDown":
                      state.moveCursor(state.cursorDay.add(1, shifted ? "year" : "month"));
                      break;
                  default: unhandled = true;
              }
              if (!unhandled) {
                  e.preventDefault();
              }
          },
          "mouseleave": (e) => {
              mobx.runInAction(() => state.hoverDay = null);
          }
      }, []);
      return React__namespace.createElement(CalendarContext.Provider, { value: state },
          React__namespace.createElement("div", { className: "e2-calendar" },
              React__namespace.createElement("div", { className: "e2-calendar__header" },
                  React__namespace.createElement("button", { className: "e2-calendar__arrow-prev", "aria-label": "Previous Month", onClick: () => state.moveCursor(state.cursorDay.subtract(1, "month"), false), tabIndex: 0 }),
                  React__namespace.createElement("div", { className: "e2-calendar__month" }, state.monthTitle),
                  React__namespace.createElement("button", { className: "e2-calendar__arrow-next", "aria-label": "Next Month", onClick: () => state.moveCursor(state.cursorDay.add(1, "month"), false), tabIndex: 0 }),
                  React__namespace.createElement("div", { className: "e2-calendar__day-heading", "aria-label": "Sunday" }, "Sun"),
                  React__namespace.createElement("div", { className: "e2-calendar__day-heading", "aria-label": "Monday" }, "Mon"),
                  React__namespace.createElement("div", { className: "e2-calendar__day-heading", "aria-label": "Tuesday" }, "Tue"),
                  React__namespace.createElement("div", { className: "e2-calendar__day-heading", "aria-label": "Wednesday" }, "Wed"),
                  React__namespace.createElement("div", { className: "e2-calendar__day-heading", "aria-label": "Thursday" }, "Thu"),
                  React__namespace.createElement("div", { className: "e2-calendar__day-heading", "aria-label": "Friday" }, "Fri"),
                  React__namespace.createElement("div", { className: "e2-calendar__day-heading", "aria-label": "Saturday" }, "Sat")),
              React__namespace.createElement("div", { className: "e2-calendar__body", ref: ref }, state.monthGrid.map(day => React__namespace.createElement(Day, { ref: state.cursorDay.isSame(day) ? forward : null, day: day, key: day.format("MM/DD") })))));
  }));
  var Calendar$1 = Object.assign(Calendar, {
      "displayName": "Calendar"
  });

  let Datepicker = (props) => {
      var _a, _b;
      let { disabled, invalid, initialValue, onChange: propsOnChange } = props, rest = __rest(props, ["disabled", "invalid", "initialValue", "onChange"]);
      let [open, setOpen] = React.useState(false);
      let [key, setKey] = React.useState(0);
      let today = React.useMemo(() => dayjs().startOf("day"), []);
      let [date1, setDate1] = React.useState(() => (initialValue) ? dayjs(initialValue) : null);
      let focusDay = React.useRef(null);
      let wrapper = React.useRef(null);
      let input = React.useRef(null);
      React.useLayoutEffect(() => {
          if (!open) {
              setKey(key + 1);
          }
      }, [open]);
      React.useLayoutEffect(() => {
          var _a, _b, _c;
          if (open) {
              (_a = focusDay.current) === null || _a === void 0 ? void 0 : _a.focus();
          }
          else if ((_b = wrapper.current) === null || _b === void 0 ? void 0 : _b.contains(document.activeElement)) {
              (_c = input.current) === null || _c === void 0 ? void 0 : _c.focus();
          }
      }, [open, key]);
      let escapeBind = useEventBindingRef({
          "keydown": (e) => {
              switch (e.key) {
                  case 'Escape':
                      if (open) {
                          setOpen(false);
                      }
                      break;
              }
          },
      }, [open], true);
      let blurCheck = useEventBindingRef({ "focusout": (ev) => {
              var _a;
              if (!((_a = wrapper.current) === null || _a === void 0 ? void 0 : _a.contains(ev.relatedTarget))) {
                  setOpen(false);
              }
          }
      }, []);
      let onChange = React.useCallback((day) => {
          var _a;
          setDate1(day);
          setOpen(false);
          (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, day.toDate());
      }, [open]);
      let onButton = React.useCallback(() => {
          if (!disabled) {
              setOpen(!open);
          }
      }, [open]);
      let wrapperRef = useCombinedRef(wrapper, escapeBind);
      let classes = ["e2-datepicker__wrapper"];
      if (invalid) {
          classes.push("e2-datepicker--invalid");
      }
      if (disabled) {
          classes.push("e2-datepicker--disabled");
      }
      return React__namespace.createElement("div", { className: classes.join(" "), ref: wrapperRef },
          React__namespace.createElement("label", { className: "e2-datepicker" },
              React__namespace.createElement(MaterialIcon, { filename: "icon-calendar-24", className: "e2-datepicker__icon" }),
              React__namespace.createElement("button", { className: "e2-datepicker__button", onClick: onButton, ref: input, disabled: disabled }, (_a = date1 === null || date1 === void 0 ? void 0 : date1.format("D MMM YYYY")) !== null && _a !== void 0 ? _a : "-- --- ----")),
          React__namespace.createElement(DropBox, { dropDirection: "down", show: open, ref: blurCheck, className: "e2-dropdown-calendar-wrapper" },
              React__namespace.createElement(Calendar$1, Object.assign({ initialDate: (_b = date1 === null || date1 === void 0 ? void 0 : date1.toDate()) !== null && _b !== void 0 ? _b : today, ref: focusDay, key: key, rangeMode: false, onChange: onChange }, rest))));
  };
  var Datepicker$1 = Object.assign(Datepicker, {
      "displayName": "Datepicker"
  });

  const CheckboxComponent = React__namespace.forwardRef((_a, forwardedRef) => {
      var { indeterminate = false, label } = _a, restWithTrackingProps = __rest(_a, ["indeterminate", "label"]);
      const input = React.useRef();
      const combined = useCombinedRef(input, forwardedRef);
      const rest = omitTrackingProps(restWithTrackingProps);
      const inputTrackingProps = pickTrackingProps(restWithTrackingProps);
      const labelTrackingProps = addSuffixToTrackingProps(inputTrackingProps, "__label");
      React.useEffect(() => {
          input.current.indeterminate = indeterminate;
      }, [indeterminate]);
      return React__namespace.createElement("label", { className: "e2-checkbox" },
          React__namespace.createElement("input", Object.assign({ ref: combined, type: "checkbox", className: "e2-checkbox__input" }, rest, inputTrackingProps)),
          React__namespace.createElement("span", Object.assign({ className: "e2-checkbox__label" }, labelTrackingProps), label));
  });
  const Checkbox = Object.assign(CheckboxComponent, {
      "displayName": "Checkbox"
  });

  const FormFieldComponent = (_a) => {
      var { children, className, error, helper, inline, label, required } = _a, restWithTrackingProps = __rest(_a, ["children", "className", "error", "helper", "inline", "label", "required"]);
      let classNames = ["e2-form-field"];
      if (inline) {
          classNames.push("e2-form-field--inline");
      }
      if (required) {
          classNames.push("e2-form-field--required");
      }
      if (className) {
          classNames.push(className);
      }
      const rest = omitTrackingProps(restWithTrackingProps);
      const trackingProps = pickTrackingProps(restWithTrackingProps);
      return React__namespace.createElement("label", Object.assign({ className: classNames.join(" ") }, rest, trackingProps),
          label && React__namespace.createElement("div", { className: "e2-form-field__label" }, label),
          React__namespace.createElement("div", { className: "e2-form-field__body" }, children),
          helper && !error && React__namespace.createElement("div", { className: "e2-form-field__helper" }, helper),
          error && React__namespace.createElement("div", { className: "e2-form-field__error" }, error));
  };
  const Field = Object.assign(FormFieldComponent, {
      "displayName": "Field",
  });

  const countryData = [
      {
          name: "Afghanistan",
          callingCode: "93",
          twoDigitCode: "AF",
          threeDigitCode: "AFG",
      },
      {
          name: "Albania",
          callingCode: "355",
          twoDigitCode: "AL",
          threeDigitCode: "ALB",
      },
      {
          name: "Algeria",
          callingCode: "213",
          twoDigitCode: "DZ",
          threeDigitCode: "DZA",
      },
      {
          name: "American Samoa",
          callingCode: "1-684",
          twoDigitCode: "AS",
          threeDigitCode: "ASM",
      },
      {
          name: "Andorra",
          callingCode: "376",
          twoDigitCode: "AD",
          threeDigitCode: "AND",
      },
      {
          name: "Angola",
          callingCode: "244",
          twoDigitCode: "AO",
          threeDigitCode: "AGO",
      },
      {
          name: "Anguilla",
          callingCode: "1-264",
          twoDigitCode: "AI",
          threeDigitCode: "AIA",
      },
      {
          name: "Antarctica",
          callingCode: "672",
          twoDigitCode: "AQ",
          threeDigitCode: "ATA",
      },
      {
          name: "Antigua and Barbuda",
          callingCode: "1-268",
          twoDigitCode: "AG",
          threeDigitCode: "ATG",
      },
      {
          name: "Argentina",
          callingCode: "54",
          twoDigitCode: "AR",
          threeDigitCode: "ARG",
      },
      {
          name: "Armenia",
          callingCode: "374",
          twoDigitCode: "AM",
          threeDigitCode: "ARM",
      },
      {
          name: "Aruba",
          callingCode: "297",
          twoDigitCode: "AW",
          threeDigitCode: "ABW",
      },
      {
          name: "Australia",
          callingCode: "61",
          twoDigitCode: "AU",
          threeDigitCode: "AUS",
      },
      {
          name: "Austria",
          callingCode: "43",
          twoDigitCode: "AT",
          threeDigitCode: "AUT",
      },
      {
          name: "Azerbaijan",
          callingCode: "994",
          twoDigitCode: "AZ",
          threeDigitCode: "AZE",
      },
      {
          name: "Bahamas",
          callingCode: "1-242",
          twoDigitCode: "BS",
          threeDigitCode: "BHS",
      },
      {
          name: "Bahrain",
          callingCode: "973",
          twoDigitCode: "BH",
          threeDigitCode: "BHR",
      },
      {
          name: "Bangladesh",
          callingCode: "880",
          twoDigitCode: "BD",
          threeDigitCode: "BGD",
      },
      {
          name: "Barbados",
          callingCode: "1-246",
          twoDigitCode: "BB",
          threeDigitCode: "BRB",
      },
      {
          name: "Belarus",
          callingCode: "375",
          twoDigitCode: "BY",
          threeDigitCode: "BLR",
      },
      {
          name: "Belgium",
          callingCode: "32",
          twoDigitCode: "BE",
          threeDigitCode: "BEL",
      },
      {
          name: "Belize",
          callingCode: "501",
          twoDigitCode: "BZ",
          threeDigitCode: "BLZ",
      },
      {
          name: "Benin",
          callingCode: "229",
          twoDigitCode: "BJ",
          threeDigitCode: "BEN",
      },
      {
          name: "Bermuda",
          callingCode: "1-441",
          twoDigitCode: "BM",
          threeDigitCode: "BMU",
      },
      {
          name: "Bhutan",
          callingCode: "975",
          twoDigitCode: "BT",
          threeDigitCode: "BTN",
      },
      {
          name: "Bolivia",
          callingCode: "591",
          twoDigitCode: "BO",
          threeDigitCode: "BOL",
      },
      {
          name: "Bosnia and Herzegovina",
          callingCode: "387",
          twoDigitCode: "BA",
          threeDigitCode: "BIH",
      },
      {
          name: "Botswana",
          callingCode: "267",
          twoDigitCode: "BW",
          threeDigitCode: "BWA",
      },
      {
          name: "Brazil",
          callingCode: "55",
          twoDigitCode: "BR",
          threeDigitCode: "BRA",
      },
      {
          name: "British Indian Ocean Territory",
          callingCode: "246",
          twoDigitCode: "IO",
          threeDigitCode: "IOT",
      },
      {
          name: "British Virgin Islands",
          callingCode: "1-284",
          twoDigitCode: "VG",
          threeDigitCode: "VGB",
      },
      {
          name: "Brunei",
          callingCode: "673",
          twoDigitCode: "BN",
          threeDigitCode: "BRN",
      },
      {
          name: "Bulgaria",
          callingCode: "359",
          twoDigitCode: "BG",
          threeDigitCode: "BGR",
      },
      {
          name: "Burkina Faso",
          callingCode: "226",
          twoDigitCode: "BF",
          threeDigitCode: "BFA",
      },
      {
          name: "Burundi",
          callingCode: "257",
          twoDigitCode: "BI",
          threeDigitCode: "BDI",
      },
      {
          name: "Cambodia",
          callingCode: "855",
          twoDigitCode: "KH",
          threeDigitCode: "KHM",
      },
      {
          name: "Cameroon",
          callingCode: "237",
          twoDigitCode: "CM",
          threeDigitCode: "CMR",
      },
      {
          name: "Canada",
          callingCode: "1",
          twoDigitCode: "CA",
          threeDigitCode: "CAN",
      },
      {
          name: "Cape Verde",
          callingCode: "238",
          twoDigitCode: "CV",
          threeDigitCode: "CPV",
      },
      {
          name: "Cayman Islands",
          callingCode: "1-345",
          twoDigitCode: "KY",
          threeDigitCode: "CYM",
      },
      {
          name: "Central African Republic",
          callingCode: "236",
          twoDigitCode: "CF",
          threeDigitCode: "CAF",
      },
      {
          name: "Chad",
          callingCode: "235",
          twoDigitCode: "TD",
          threeDigitCode: "TCD",
      },
      {
          name: "Chile",
          callingCode: "56",
          twoDigitCode: "CL",
          threeDigitCode: "CHL",
      },
      {
          name: "China",
          callingCode: "86",
          twoDigitCode: "CN",
          threeDigitCode: "CHN",
      },
      {
          name: "Christmas Island",
          callingCode: "61",
          twoDigitCode: "CX",
          threeDigitCode: "CXR",
      },
      {
          name: "Cocos Islands",
          callingCode: "61",
          twoDigitCode: "CC",
          threeDigitCode: "CCK",
      },
      {
          name: "Colombia",
          callingCode: "57",
          twoDigitCode: "CO",
          threeDigitCode: "COL",
      },
      {
          name: "Comoros",
          callingCode: "269",
          twoDigitCode: "KM",
          threeDigitCode: "COM",
      },
      {
          name: "Cook Islands",
          callingCode: "682",
          twoDigitCode: "CK",
          threeDigitCode: "COK",
      },
      {
          name: "Costa Rica",
          callingCode: "506",
          twoDigitCode: "CR",
          threeDigitCode: "CRI",
      },
      {
          name: "Croatia",
          callingCode: "385",
          twoDigitCode: "HR",
          threeDigitCode: "HRV",
      },
      {
          name: "Cuba",
          callingCode: "53",
          twoDigitCode: "CU",
          threeDigitCode: "CUB",
      },
      {
          name: "Curacao",
          callingCode: "599",
          twoDigitCode: "CW",
          threeDigitCode: "CUW",
      },
      {
          name: "Cyprus",
          callingCode: "357",
          twoDigitCode: "CY",
          threeDigitCode: "CYP",
      },
      {
          name: "Czech Republic",
          callingCode: "420",
          twoDigitCode: "CZ",
          threeDigitCode: "CZE",
      },
      {
          name: "Democratic Republic of the Congo",
          callingCode: "243",
          twoDigitCode: "CD",
          threeDigitCode: "COD",
      },
      {
          name: "Denmark",
          callingCode: "45",
          twoDigitCode: "DK",
          threeDigitCode: "DNK",
      },
      {
          name: "Djibouti",
          callingCode: "253",
          twoDigitCode: "DJ",
          threeDigitCode: "DJI",
      },
      {
          name: "Dominica",
          callingCode: "1-767",
          twoDigitCode: "DM",
          threeDigitCode: "DMA",
      },
      {
          name: "Dominican Republic",
          callingCode: "1-809,1-829, 1-849",
          twoDigitCode: "DO",
          threeDigitCode: "DOM",
      },
      {
          name: "East Timor",
          callingCode: "670",
          twoDigitCode: "TL",
          threeDigitCode: "TLS",
      },
      {
          name: "Ecuador",
          callingCode: "593",
          twoDigitCode: "EC",
          threeDigitCode: "ECU",
      },
      {
          name: "Egypt",
          callingCode: "20",
          twoDigitCode: "EG",
          threeDigitCode: "EGY",
      },
      {
          name: "El Salvador",
          callingCode: "503",
          twoDigitCode: "SV",
          threeDigitCode: "SLV",
      },
      {
          name: "Equatorial Guinea",
          callingCode: "240",
          twoDigitCode: "GQ",
          threeDigitCode: "GNQ",
      },
      {
          name: "Eritrea",
          callingCode: "291",
          twoDigitCode: "ER",
          threeDigitCode: "ERI",
      },
      {
          name: "Estonia",
          callingCode: "372",
          twoDigitCode: "EE",
          threeDigitCode: "EST",
      },
      {
          name: "Ethiopia",
          callingCode: "251",
          twoDigitCode: "ET",
          threeDigitCode: "ETH",
      },
      {
          name: "Falkland Islands",
          callingCode: "500",
          twoDigitCode: "FK",
          threeDigitCode: "FLK",
      },
      {
          name: "Faroe Islands",
          callingCode: "298",
          twoDigitCode: "FO",
          threeDigitCode: "FRO",
      },
      {
          name: "Fiji",
          callingCode: "679",
          twoDigitCode: "FJ",
          threeDigitCode: "FJI",
      },
      {
          name: "Finland",
          callingCode: "358",
          twoDigitCode: "FI",
          threeDigitCode: "FIN",
      },
      {
          name: "France",
          callingCode: "33",
          twoDigitCode: "FR",
          threeDigitCode: "FRA",
      },
      {
          name: "French Polynesia",
          callingCode: "689",
          twoDigitCode: "PF",
          threeDigitCode: "PYF",
      },
      {
          name: "Gabon",
          callingCode: "241",
          twoDigitCode: "GA",
          threeDigitCode: "GAB",
      },
      {
          name: "Gambia",
          callingCode: "220",
          twoDigitCode: "GM",
          threeDigitCode: "GMB",
      },
      {
          name: "Georgia",
          callingCode: "995",
          twoDigitCode: "GE",
          threeDigitCode: "GEO",
      },
      {
          name: "Germany",
          callingCode: "49",
          twoDigitCode: "DE",
          threeDigitCode: "DEU",
      },
      {
          name: "Ghana",
          callingCode: "233",
          twoDigitCode: "GH",
          threeDigitCode: "GHA",
      },
      {
          name: "Gibraltar",
          callingCode: "350",
          twoDigitCode: "GI",
          threeDigitCode: "GIB",
      },
      {
          name: "Greece",
          callingCode: "30",
          twoDigitCode: "GR",
          threeDigitCode: "GRC",
      },
      {
          name: "Greenland",
          callingCode: "299",
          twoDigitCode: "GL",
          threeDigitCode: "GRL",
      },
      {
          name: "Grenada",
          callingCode: "1-473",
          twoDigitCode: "GD",
          threeDigitCode: "GRD",
      },
      {
          name: "Guam",
          callingCode: "1-671",
          twoDigitCode: "GU",
          threeDigitCode: "GUM",
      },
      {
          name: "Guatemala",
          callingCode: "502",
          twoDigitCode: "GT",
          threeDigitCode: "GTM",
      },
      {
          name: "Guernsey",
          callingCode: "44-1481",
          twoDigitCode: "GG",
          threeDigitCode: "GGY",
      },
      {
          name: "Guinea",
          callingCode: "224",
          twoDigitCode: "GN",
          threeDigitCode: "GIN",
      },
      {
          name: "Guinea-Bissau",
          callingCode: "245",
          twoDigitCode: "GW",
          threeDigitCode: "GNB",
      },
      {
          name: "Guyana",
          callingCode: "592",
          twoDigitCode: "GY",
          threeDigitCode: "GUY",
      },
      {
          name: "Haiti",
          callingCode: "509",
          twoDigitCode: "HT",
          threeDigitCode: "HTI",
      },
      {
          name: "Honduras",
          callingCode: "504",
          twoDigitCode: "HN",
          threeDigitCode: "HND",
      },
      {
          name: "Hong Kong",
          callingCode: "852",
          twoDigitCode: "HK",
          threeDigitCode: "HKG",
      },
      {
          name: "Hungary",
          callingCode: "36",
          twoDigitCode: "HU",
          threeDigitCode: "HUN",
      },
      {
          name: "Iceland",
          callingCode: "354",
          twoDigitCode: "IS",
          threeDigitCode: "ISL",
      },
      {
          name: "India",
          callingCode: "91",
          twoDigitCode: "IN",
          threeDigitCode: "IND",
      },
      {
          name: "Indonesia",
          callingCode: "62",
          twoDigitCode: "ID",
          threeDigitCode: "IDN",
      },
      {
          name: "Iran",
          callingCode: "98",
          twoDigitCode: "IR",
          threeDigitCode: "IRN",
      },
      {
          name: "Iraq",
          callingCode: "964",
          twoDigitCode: "IQ",
          threeDigitCode: "IRQ",
      },
      {
          name: "Ireland",
          callingCode: "353",
          twoDigitCode: "IE",
          threeDigitCode: "IRL",
      },
      {
          name: "Isle of Man",
          callingCode: "44-1624",
          twoDigitCode: "IM",
          threeDigitCode: "IMN",
      },
      {
          name: "Israel",
          callingCode: "972",
          twoDigitCode: "IL",
          threeDigitCode: "ISR",
      },
      {
          name: "Italy",
          callingCode: "39",
          twoDigitCode: "IT",
          threeDigitCode: "ITA",
      },
      {
          name: "Ivory Coast",
          callingCode: "225",
          twoDigitCode: "CI",
          threeDigitCode: "CIV",
      },
      {
          name: "Jamaica",
          callingCode: "1-876",
          twoDigitCode: "JM",
          threeDigitCode: "JAM",
      },
      {
          name: "Japan",
          callingCode: "81",
          twoDigitCode: "JP",
          threeDigitCode: "JPN",
      },
      {
          name: "Jersey",
          callingCode: "44-1534",
          twoDigitCode: "JE",
          threeDigitCode: "JEY",
      },
      {
          name: "Jordan",
          callingCode: "962",
          twoDigitCode: "JO",
          threeDigitCode: "JOR",
      },
      {
          name: "Kazakhstan",
          callingCode: "7",
          twoDigitCode: "KZ",
          threeDigitCode: "KAZ",
      },
      {
          name: "Kenya",
          callingCode: "254",
          twoDigitCode: "KE",
          threeDigitCode: "KEN",
      },
      {
          name: "Kiribati",
          callingCode: "686",
          twoDigitCode: "KI",
          threeDigitCode: "KIR",
      },
      {
          name: "Kosovo",
          callingCode: "383",
          twoDigitCode: "XK",
          threeDigitCode: "XKX",
      },
      {
          name: "Kuwait",
          callingCode: "965",
          twoDigitCode: "KW",
          threeDigitCode: "KWT",
      },
      {
          name: "Kyrgyzstan",
          callingCode: "996",
          twoDigitCode: "KG",
          threeDigitCode: "KGZ",
      },
      {
          name: "Laos",
          callingCode: "856",
          twoDigitCode: "LA",
          threeDigitCode: "LAO",
      },
      {
          name: "Latvia",
          callingCode: "371",
          twoDigitCode: "LV",
          threeDigitCode: "LVA",
      },
      {
          name: "Lebanon",
          callingCode: "961",
          twoDigitCode: "LB",
          threeDigitCode: "LBN",
      },
      {
          name: "Lesotho",
          callingCode: "266",
          twoDigitCode: "LS",
          threeDigitCode: "LSO",
      },
      {
          name: "Liberia",
          callingCode: "231",
          twoDigitCode: "LR",
          threeDigitCode: "LBR",
      },
      {
          name: "Libya",
          callingCode: "218",
          twoDigitCode: "LY",
          threeDigitCode: "LBY",
      },
      {
          name: "Liechtenstein",
          callingCode: "423",
          twoDigitCode: "LI",
          threeDigitCode: "LIE",
      },
      {
          name: "Lithuania",
          callingCode: "370",
          twoDigitCode: "LT",
          threeDigitCode: "LTU",
      },
      {
          name: "Luxembourg",
          callingCode: "352",
          twoDigitCode: "LU",
          threeDigitCode: "LUX",
      },
      {
          name: "Macau",
          callingCode: "853",
          twoDigitCode: "MO",
          threeDigitCode: "MAC",
      },
      {
          name: "Macedonia",
          callingCode: "389",
          twoDigitCode: "MK",
          threeDigitCode: "MKD",
      },
      {
          name: "Madagascar",
          callingCode: "261",
          twoDigitCode: "MG",
          threeDigitCode: "MDG",
      },
      {
          name: "Malawi",
          callingCode: "265",
          twoDigitCode: "MW",
          threeDigitCode: "MWI",
      },
      {
          name: "Malaysia",
          callingCode: "60",
          twoDigitCode: "MY",
          threeDigitCode: "MYS",
      },
      {
          name: "Maldives",
          callingCode: "960",
          twoDigitCode: "MV",
          threeDigitCode: "MDV",
      },
      {
          name: "Mali",
          callingCode: "223",
          twoDigitCode: "ML",
          threeDigitCode: "MLI",
      },
      {
          name: "Malta",
          callingCode: "356",
          twoDigitCode: "MT",
          threeDigitCode: "MLT",
      },
      {
          name: "Marshall Islands",
          callingCode: "692",
          twoDigitCode: "MH",
          threeDigitCode: "MHL",
      },
      {
          name: "Mauritania",
          callingCode: "222",
          twoDigitCode: "MR",
          threeDigitCode: "MRT",
      },
      {
          name: "Mauritius",
          callingCode: "230",
          twoDigitCode: "MU",
          threeDigitCode: "MUS",
      },
      {
          name: "Mayotte",
          callingCode: "262",
          twoDigitCode: "YT",
          threeDigitCode: "MYT",
      },
      {
          name: "Mexico",
          callingCode: "52",
          twoDigitCode: "MX",
          threeDigitCode: "MEX",
      },
      {
          name: "Micronesia",
          callingCode: "691",
          twoDigitCode: "FM",
          threeDigitCode: "FSM",
      },
      {
          name: "Moldova",
          callingCode: "373",
          twoDigitCode: "MD",
          threeDigitCode: "MDA",
      },
      {
          name: "Monaco",
          callingCode: "377",
          twoDigitCode: "MC",
          threeDigitCode: "MCO",
      },
      {
          name: "Mongolia",
          callingCode: "976",
          twoDigitCode: "MN",
          threeDigitCode: "MNG",
      },
      {
          name: "Montenegro",
          callingCode: "382",
          twoDigitCode: "ME",
          threeDigitCode: "MNE",
      },
      {
          name: "Montserrat",
          callingCode: "1-664",
          twoDigitCode: "MS",
          threeDigitCode: "MSR",
      },
      {
          name: "Morocco",
          callingCode: "212",
          twoDigitCode: "MA",
          threeDigitCode: "MAR",
      },
      {
          name: "Mozambique",
          callingCode: "258",
          twoDigitCode: "MZ",
          threeDigitCode: "MOZ",
      },
      {
          name: "Myanmar",
          callingCode: "95",
          twoDigitCode: "MM",
          threeDigitCode: "MMR",
      },
      {
          name: "Namibia",
          callingCode: "264",
          twoDigitCode: "NA",
          threeDigitCode: "NAM",
      },
      {
          name: "Nauru",
          callingCode: "674",
          twoDigitCode: "NR",
          threeDigitCode: "NRU",
      },
      {
          name: "Nepal",
          callingCode: "977",
          twoDigitCode: "NP",
          threeDigitCode: "NPL",
      },
      {
          name: "Netherlands",
          callingCode: "31",
          twoDigitCode: "NL",
          threeDigitCode: "NLD",
      },
      {
          name: "Netherlands Antilles",
          callingCode: "599",
          twoDigitCode: "AN",
          threeDigitCode: "ANT",
      },
      {
          name: "New Caledonia",
          callingCode: "687",
          twoDigitCode: "NC",
          threeDigitCode: "NCL",
      },
      {
          name: "New Zealand",
          callingCode: "64",
          twoDigitCode: "NZ",
          threeDigitCode: "NZL",
      },
      {
          name: "Nicaragua",
          callingCode: "505",
          twoDigitCode: "NI",
          threeDigitCode: "NIC",
      },
      {
          name: "Niger",
          callingCode: "227",
          twoDigitCode: "NE",
          threeDigitCode: "NER",
      },
      {
          name: "Nigeria",
          callingCode: "234",
          twoDigitCode: "NG",
          threeDigitCode: "NGA",
      },
      {
          name: "Niue",
          callingCode: "683",
          twoDigitCode: "NU",
          threeDigitCode: "NIU",
      },
      {
          name: "North Korea",
          callingCode: "850",
          twoDigitCode: "KP",
          threeDigitCode: "PRK",
      },
      {
          name: "Northern Mariana Islands",
          callingCode: "1-670",
          twoDigitCode: "MP",
          threeDigitCode: "MNP",
      },
      {
          name: "Norway",
          callingCode: "47",
          twoDigitCode: "NO",
          threeDigitCode: "NOR",
      },
      {
          name: "Oman",
          callingCode: "968",
          twoDigitCode: "OM",
          threeDigitCode: "OMN",
      },
      {
          name: "Pakistan",
          callingCode: "92",
          twoDigitCode: "PK",
          threeDigitCode: "PAK",
      },
      {
          name: "Palau",
          callingCode: "680",
          twoDigitCode: "PW",
          threeDigitCode: "PLW",
      },
      {
          name: "Palestine",
          callingCode: "970",
          twoDigitCode: "PS",
          threeDigitCode: "PSE",
      },
      {
          name: "Panama",
          callingCode: "507",
          twoDigitCode: "PA",
          threeDigitCode: "PAN",
      },
      {
          name: "Papua New Guinea",
          callingCode: "675",
          twoDigitCode: "PG",
          threeDigitCode: "PNG",
      },
      {
          name: "Paraguay",
          callingCode: "595",
          twoDigitCode: "PY",
          threeDigitCode: "PRY",
      },
      {
          name: "Peru",
          callingCode: "51",
          twoDigitCode: "PE",
          threeDigitCode: "PER",
      },
      {
          name: "Philippines",
          callingCode: "63",
          twoDigitCode: "PH",
          threeDigitCode: "PHL",
      },
      {
          name: "Pitcairn",
          callingCode: "64",
          twoDigitCode: "PN",
          threeDigitCode: "PCN",
      },
      {
          name: "Poland",
          callingCode: "48",
          twoDigitCode: "PL",
          threeDigitCode: "POL",
      },
      {
          name: "Portugal",
          callingCode: "351",
          twoDigitCode: "PT",
          threeDigitCode: "PRT",
      },
      {
          name: "Puerto Rico",
          callingCode: "1-787, 1-939",
          twoDigitCode: "PR",
          threeDigitCode: "PRI",
      },
      {
          name: "Qatar",
          callingCode: "974",
          twoDigitCode: "QA",
          threeDigitCode: "QAT",
      },
      {
          name: "Republic of the Congo",
          callingCode: "242",
          twoDigitCode: "CG",
          threeDigitCode: "COG",
      },
      {
          name: "Reunion",
          callingCode: "262",
          twoDigitCode: "RE",
          threeDigitCode: "REU",
      },
      {
          name: "Romania",
          callingCode: "40",
          twoDigitCode: "RO",
          threeDigitCode: "ROU",
      },
      {
          name: "Russia",
          callingCode: "7",
          twoDigitCode: "RU",
          threeDigitCode: "RUS",
      },
      {
          name: "Rwanda",
          callingCode: "250",
          twoDigitCode: "RW",
          threeDigitCode: "RWA",
      },
      {
          name: "Saint Barthelemy",
          callingCode: "590",
          twoDigitCode: "BL",
          threeDigitCode: "BLM",
      },
      {
          name: "Saint Helena",
          callingCode: "290",
          twoDigitCode: "SH",
          threeDigitCode: "SHN",
      },
      {
          name: "Saint Kitts and Nevis",
          callingCode: "1-869",
          twoDigitCode: "KN",
          threeDigitCode: "KNA",
      },
      {
          name: "Saint Lucia",
          callingCode: "1-758",
          twoDigitCode: "LC",
          threeDigitCode: "LCA",
      },
      {
          name: "Saint Martin",
          callingCode: "590",
          twoDigitCode: "MF",
          threeDigitCode: "MAF",
      },
      {
          name: "Saint Pierre and Miquelon",
          callingCode: "508",
          twoDigitCode: "PM",
          threeDigitCode: "SPM",
      },
      {
          name: "Saint Vincent and the Grenadines",
          callingCode: "1-784",
          twoDigitCode: "VC",
          threeDigitCode: "VCT",
      },
      {
          name: "Samoa",
          callingCode: "685",
          twoDigitCode: "WS",
          threeDigitCode: "WSM",
      },
      {
          name: "San Marino",
          callingCode: "378",
          twoDigitCode: "SM",
          threeDigitCode: "SMR",
      },
      {
          name: "Sao Tome and Principe",
          callingCode: "239",
          twoDigitCode: "ST",
          threeDigitCode: "STP",
      },
      {
          name: "Saudi Arabia",
          callingCode: "966",
          twoDigitCode: "SA",
          threeDigitCode: "SAU",
      },
      {
          name: "Senegal",
          callingCode: "221",
          twoDigitCode: "SN",
          threeDigitCode: "SEN",
      },
      {
          name: "Serbia",
          callingCode: "381",
          twoDigitCode: "RS",
          threeDigitCode: "SRB",
      },
      {
          name: "Seychelles",
          callingCode: "248",
          twoDigitCode: "SC",
          threeDigitCode: "SYC",
      },
      {
          name: "Sierra Leone",
          callingCode: "232",
          twoDigitCode: "SL",
          threeDigitCode: "SLE",
      },
      {
          name: "Singapore",
          callingCode: "65",
          twoDigitCode: "SG",
          threeDigitCode: "SGP",
      },
      {
          name: "Sint Maarten",
          callingCode: "1-721",
          twoDigitCode: "SX",
          threeDigitCode: "SXM",
      },
      {
          name: "Slovakia",
          callingCode: "421",
          twoDigitCode: "SK",
          threeDigitCode: "SVK",
      },
      {
          name: "Slovenia",
          callingCode: "386",
          twoDigitCode: "SI",
          threeDigitCode: "SVN",
      },
      {
          name: "Solomon Islands",
          callingCode: "677",
          twoDigitCode: "SB",
          threeDigitCode: "SLB",
      },
      {
          name: "Somalia",
          callingCode: "252",
          twoDigitCode: "SO",
          threeDigitCode: "SOM",
      },
      {
          name: "South Africa",
          callingCode: "27",
          twoDigitCode: "ZA",
          threeDigitCode: "ZAF",
      },
      {
          name: "South Korea",
          callingCode: "82",
          twoDigitCode: "KR",
          threeDigitCode: "KOR",
      },
      {
          name: "South Sudan",
          callingCode: "211",
          twoDigitCode: "SS",
          threeDigitCode: "SSD",
      },
      {
          name: "Spain",
          callingCode: "34",
          twoDigitCode: "ES",
          threeDigitCode: "ESP",
      },
      {
          name: "Sri Lanka",
          callingCode: "94",
          twoDigitCode: "LK",
          threeDigitCode: "LKA",
      },
      {
          name: "Sudan",
          callingCode: "249",
          twoDigitCode: "SD",
          threeDigitCode: "SDN",
      },
      {
          name: "Suriname",
          callingCode: "597",
          twoDigitCode: "SR",
          threeDigitCode: "SUR",
      },
      {
          name: "Svalbard and Jan Mayen",
          callingCode: "47",
          twoDigitCode: "SJ",
          threeDigitCode: "SJM",
      },
      {
          name: "Swaziland",
          callingCode: "268",
          twoDigitCode: "SZ",
          threeDigitCode: "SWZ",
      },
      {
          name: "Sweden",
          callingCode: "46",
          twoDigitCode: "SE",
          threeDigitCode: "SWE",
      },
      {
          name: "Switzerland",
          callingCode: "41",
          twoDigitCode: "CH",
          threeDigitCode: "CHE",
      },
      {
          name: "Syria",
          callingCode: "963",
          twoDigitCode: "SY",
          threeDigitCode: "SYR",
      },
      {
          name: "Taiwan",
          callingCode: "886",
          twoDigitCode: "TW",
          threeDigitCode: "TWN",
      },
      {
          name: "Tajikistan",
          callingCode: "992",
          twoDigitCode: "TJ",
          threeDigitCode: "TJK",
      },
      {
          name: "Tanzania",
          callingCode: "255",
          twoDigitCode: "TZ",
          threeDigitCode: "TZA",
      },
      {
          name: "Thailand",
          callingCode: "66",
          twoDigitCode: "TH",
          threeDigitCode: "THA",
      },
      {
          name: "Togo",
          callingCode: "228",
          twoDigitCode: "TG",
          threeDigitCode: "TGO",
      },
      {
          name: "Tokelau",
          callingCode: "690",
          twoDigitCode: "TK",
          threeDigitCode: "TKL",
      },
      {
          name: "Tonga",
          callingCode: "676",
          twoDigitCode: "TO",
          threeDigitCode: "TON",
      },
      {
          name: "Trinidad and Tobago",
          callingCode: "1-868",
          twoDigitCode: "TT",
          threeDigitCode: "TTO",
      },
      {
          name: "Tunisia",
          callingCode: "216",
          twoDigitCode: "TN",
          threeDigitCode: "TUN",
      },
      {
          name: "Turkey",
          callingCode: "90",
          twoDigitCode: "TR",
          threeDigitCode: "TUR",
      },
      {
          name: "Turkmenistan",
          callingCode: "993",
          twoDigitCode: "TM",
          threeDigitCode: "TKM",
      },
      {
          name: "Turks and Caicos Islands",
          callingCode: "1-649",
          twoDigitCode: "TC",
          threeDigitCode: "TCA",
      },
      {
          name: "Tuvalu",
          callingCode: "688",
          twoDigitCode: "TV",
          threeDigitCode: "TUV",
      },
      {
          name: "U.S. Virgin Islands",
          callingCode: "1-340",
          twoDigitCode: "VI",
          threeDigitCode: "VIR",
      },
      {
          name: "Uganda",
          callingCode: "256",
          twoDigitCode: "UG",
          threeDigitCode: "UGA",
      },
      {
          name: "Ukraine",
          callingCode: "380",
          twoDigitCode: "UA",
          threeDigitCode: "UKR",
      },
      {
          name: "United Arab Emirates",
          callingCode: "971",
          twoDigitCode: "AE",
          threeDigitCode: "ARE",
      },
      {
          name: "United Kingdom",
          callingCode: "44",
          twoDigitCode: "GB",
          threeDigitCode: "GBR",
      },
      {
          name: "United States",
          callingCode: "1",
          twoDigitCode: "US",
          threeDigitCode: "USA",
      },
      {
          name: "Uruguay",
          callingCode: "598",
          twoDigitCode: "UY",
          threeDigitCode: "URY",
      },
      {
          name: "Uzbekistan",
          callingCode: "998",
          twoDigitCode: "UZ",
          threeDigitCode: "UZB",
      },
      {
          name: "Vanuatu",
          callingCode: "678",
          twoDigitCode: "VU",
          threeDigitCode: "VUT",
      },
      {
          name: "Vatican",
          callingCode: "379",
          twoDigitCode: "VA",
          threeDigitCode: "VAT",
      },
      {
          name: "Venezuela",
          callingCode: "58",
          twoDigitCode: "VE",
          threeDigitCode: "VEN",
      },
      {
          name: "Vietnam",
          callingCode: "84",
          twoDigitCode: "VN",
          threeDigitCode: "VNM",
      },
      {
          name: "Wallis and Futuna",
          callingCode: "681",
          twoDigitCode: "WF",
          threeDigitCode: "WLF",
      },
      {
          name: "Western Sahara",
          callingCode: "212",
          twoDigitCode: "EH",
          threeDigitCode: "ESH",
      },
      {
          name: "Yemen",
          callingCode: "967",
          twoDigitCode: "YE",
          threeDigitCode: "YEM",
      },
      {
          name: "Zambia",
          callingCode: "260",
          twoDigitCode: "ZM",
          threeDigitCode: "ZMB",
      },
      {
          name: "Zimbabwe",
          callingCode: "263",
          twoDigitCode: "ZW",
          threeDigitCode: "ZWE",
      },
  ];
  const CountryData = countryData;

  const Border = {
      BOX: "BOX",
      PILL: "PILL"
  };
  const ShowClear = {
      NEVER: "NEVER",
      WHEN_FOCUSED: "WHEN_FOCUSED",
      WHEN_FILLED: "WHEN_FILLED",
      ALWAYS: "ALWAYS",
  };
  const BaseInput = React.forwardRef((_a, forwardedRef) => {
      var _b;
      var { border = Border.BOX, commands, iconsLeft = [], iconsRight = [], invalid, label, onChange, showClear = ShowClear.WHEN_FILLED, type } = _a, inputProps = __rest(_a, ["border", "commands", "iconsLeft", "iconsRight", "invalid", "label", "onChange", "showClear", "type"]);
      const wrapperRef = useEventBindingRef({
          focus: () => {
              var _a;
              (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
          },
          focusin: () => {
              setHasFocus(true);
          },
          focusout: () => {
              setHasFocus(false);
          },
      }, []);
      const inputRef = React.useRef();
      const [hasValue, setHasValue] = React.useState(() => !!inputProps.value);
      const [hasFocus, setHasFocus] = React.useState(false);
      const combinedInputRef = useCombinedRef$1(forwardedRef, inputRef);
      const changeHandler = React.useCallback(newValue => {
          setHasValue(!!newValue);
          onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
      }, [onChange]);
      const clearIcon = React__namespace.createElement(ClearIcon, { border: border, changeHandler: changeHandler, disabled: (_b = inputProps.disabled) !== null && _b !== void 0 ? _b : false, hasFocus: hasFocus, hasValue: hasValue, inputRef: inputRef, showClear: showClear });
      React.useImperativeHandle(commands, () => ({
          getValue: () => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value; },
          setValue: newValue => {
              if (inputRef.current) {
                  inputRef.current.value = newValue;
              }
          },
      }), [commands, inputRef]);
      const wrapperClassNames = ["e2-input__wrapper"];
      if (inputProps.required) {
          wrapperClassNames.push("e2-input--required");
      }
      if (invalid) {
          wrapperClassNames.push("e2-input--invalid");
      }
      if (inputProps.disabled) {
          wrapperClassNames.push("e2-input--disabled");
      }
      if (border === Border.BOX) {
          wrapperClassNames.push("e2-input--border-box");
      }
      else if (border === Border.PILL) {
          wrapperClassNames.push("e2-input--border-pill");
      }
      return React__namespace.createElement("div", { ref: wrapperRef, className: wrapperClassNames.join(" "), tabIndex: hasFocus ? -1 : 0 },
          React__namespace.createElement(IconsRow, { className: "e2-input__icons e2-input__icons--left", icons: iconsLeft }),
          React__namespace.createElement("input", Object.assign({ ref: combinedInputRef, className: "e2-input__input", type: type !== null && type !== void 0 ? type : "text", onChange: event => changeHandler(event.currentTarget.value) }, inputProps)),
          React__namespace.createElement(IconsRow, { className: "e2-input__icons e2-input__icons--right", icons: [...iconsRight, clearIcon] }));
  });
  const IconsRow = ({ className, icons = [] }) => {
      const realIcons = icons.filter(i => i != null).map(icon => {
          if (React__namespace.isValidElement(icon)) {
              return icon;
          }
          else {
              return React__namespace.createElement("span", null, icon);
          }
      });
      if (realIcons.length < 1) {
          return null;
      }
      return React__namespace.createElement("div", { className: className }, realIcons.map((x, i) => React__namespace.createElement(React__namespace.Fragment, { key: i }, x)));
  };
  const ClearIcon = ({ border, changeHandler, disabled, hasFocus, hasValue, inputRef, showClear, }) => {
      const onClick = React.useCallback(() => {
          if (inputRef.current) {
              inputRef.current.value = "";
              changeHandler("");
              inputRef.current.focus();
          }
      }, [inputRef, changeHandler]);
      const onKeyDown = React.useCallback(event => {
          if (event.key === " " || event.key === "Enter") {
              onClick();
              event.preventDefault();
          }
      }, [onClick]);
      if (disabled) {
          return null;
      }
      if (showClear === ShowClear.NEVER || showClear === false) {
          return null;
      }
      if (showClear === ShowClear.WHEN_FILLED && !hasValue) {
          return null;
      }
      if (showClear === ShowClear.WHEN_FOCUSED && !hasFocus) {
          return null;
      }
      let filename = "icon-missed-24.svg";
      if (border === Border.PILL) {
          filename = "icon-missed-20.svg";
      }
      return React__namespace.createElement(MaterialIcon, { className: "e2-input__icon-clear", filename: filename, onClick: onClick, onKeyDown: onKeyDown, tabIndex: 0 });
  };
  const TextInput = React__namespace.forwardRef((props, forwardedRef) => {
      return React__namespace.createElement(BaseInput, Object.assign({ ref: forwardedRef, border: Border.BOX }, props));
  });
  const PasswordInput = React__namespace.forwardRef((_a, forwardedRef) => {
      var { iconsRight: defaultIconsRight = [], onChange: defaultOnChange, showClear } = _a, props = __rest(_a, ["iconsRight", "onChange", "showClear"]);
      const [hidden, setHidden] = React.useState(true);
      const [hasValue, setHasValue] = React.useState(() => { var _a; return !!((_a = props.value) !== null && _a !== void 0 ? _a : props.defaultValue); });
      const inputRef = React.useRef();
      const ref = useCombinedRef$1(forwardedRef, inputRef);
      const toggleVisibility = React.useCallback(() => {
          setHidden(prevHidden => !prevHidden);
          setTimeout(() => { var _a; return (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, 0);
      }, []);
      const onChange = (newValue) => {
          setHasValue(!!newValue);
          if (!newValue) {
              setHidden(true);
          }
          defaultOnChange === null || defaultOnChange === void 0 ? void 0 : defaultOnChange(newValue);
      };
      const iconsRight = [...defaultIconsRight];
      if (hasValue) {
          const eyeCon = React__namespace.createElement(MaterialIcon, { filename: `icon-${hidden ? "eye-hidden" : "eye"}-24.svg`, onClick: toggleVisibility, onKeyDown: event => {
                  if (event.key === " " || event.key === "Enter") {
                      toggleVisibility();
                      event.preventDefault();
                  }
              }, tabIndex: 0 });
          iconsRight.push(eyeCon);
      }
      return React__namespace.createElement(BaseInput, Object.assign({ ref: ref, border: Border.BOX, iconsRight: iconsRight, onChange: onChange, showClear: ShowClear.NEVER }, props, { type: hidden ? "password" : "text" }));
  });
  const SearchInput = React__namespace.forwardRef((_a, forwardedRef) => {
      var { iconsLeft = [] } = _a, props = __rest(_a, ["iconsLeft"]);
      const icon = React__namespace.createElement(MaterialIcon, { filename: "icon-search-24.svg", style: { pointerEvents: "none" } });
      return React__namespace.createElement(BaseInput, Object.assign({ ref: forwardedRef, type: "search", iconsLeft: [icon, ...iconsLeft] }, props));
  });
  const PhoneInput = React__namespace.forwardRef((_a, forwardedRef) => {
      var { countryCode, iconsLeft = [] } = _a, props = __rest(_a, ["countryCode", "iconsLeft"]);
      const config = React.useContext(Configuration);
      const assetBaseUri = config.assetBaseUri;
      const countryInfo = React.useMemo(() => {
          if (!(countryCode !== null && countryCode !== void 0 ? countryCode : "").trim()) {
              return null;
          }
          return CountryData.find(d => [d.twoDigitCode, d.threeDigitCode].includes(countryCode.toUpperCase()));
      }, [countryCode]);
      const prefix = React.useMemo(() => {
          if (!countryInfo) {
              return null;
          }
          const flagIconPath = `${assetBaseUri}/images/flags/${countryInfo.twoDigitCode.toLowerCase()}.svg`;
          const callingCode = `+${countryInfo.callingCode}`;
          return React__namespace.createElement("span", { className: "e2-input__phone-country", title: countryInfo.name },
              React__namespace.createElement("img", { className: "e2-input__phone-country-flag", src: flagIconPath }),
              React__namespace.createElement("span", { className: "e2-input__phone-country-calling-code" }, callingCode));
      }, [countryInfo]);
      return React__namespace.createElement(BaseInput, Object.assign({ ref: forwardedRef, type: "tel", border: Border.BOX, iconsLeft: [prefix, ...iconsLeft] }, props));
  });
  const Input = Object.assign(BaseInput, {
      displayName: "Input",
      Border,
      ShowClear,
      Text: Object.assign(TextInput, { displayName: "Input.Text" }),
      Password: Object.assign(PasswordInput, { displayName: "Input.Password" }),
      Phone: Object.assign(PhoneInput, { displayName: "Input.Phone" }),
      Search: Object.assign(SearchInput, { displayName: "Input.Search" }),
  });

  const RadioButtonComponent = React__namespace.forwardRef((_a, forwardedRef) => {
      var { className, label } = _a, restWithTrackingProps = __rest(_a, ["className", "label"]);
      const input = React.useRef();
      const combined = useCombinedRef(input, forwardedRef);
      const rest = omitTrackingProps(restWithTrackingProps);
      const inputTrackingProps = pickTrackingProps(restWithTrackingProps);
      const labelTrackingProps = addSuffixToTrackingProps(inputTrackingProps, "__label");
      const inputClassNames = ["e2-radio__input"];
      if (className) {
          inputClassNames.push(className);
      }
      return React__namespace.createElement("label", { className: "e2-radio" },
          React__namespace.createElement("input", Object.assign({ ref: combined, type: "radio", className: inputClassNames.join(" ") }, rest, inputTrackingProps)),
          React__namespace.createElement("span", Object.assign({ className: "e2-radio__label" }, labelTrackingProps), label));
  });
  const RadioButton = Object.assign(RadioButtonComponent, {
      "displayName": "RadioButton"
  });

  function strOptToObjOpt(option) {
      if (typeof option === "string") {
          return {
              value: option,
              display: option
          };
      }
      return Object.assign({}, option);
  }
  function propOptsToIndexedOpts(options) {
      return options.flatMap((o) => {
          if (typeof o === "object" && "options" in o) {
              return o.options.map(strOptToObjOpt);
          }
          return strOptToObjOpt(o);
      }).map((o, idx) => { return Object.assign(Object.assign({}, o), { idx: idx }); });
  }
  function selectionAsArray(value) {
      if (Array.isArray(value)) {
          return value;
      }
      else {
          return [value];
      }
  }
  function arrayToSelection(value, multiple) {
      if (multiple) {
          let ret = value;
          return ret;
      }
      let ret = value[0];
      return ret;
  }

  class State {
      constructor(props) {
          Object.defineProperty(this, "selectedIds", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: []
          });
          Object.defineProperty(this, "multiple", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "options", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          Object.defineProperty(this, "focusIdx", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: -1
          });
          Object.defineProperty(this, "onChange", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          this.multiple = props.multiple;
          this.options = propOptsToIndexedOpts(props.options);
          if (props.value) {
              this.value = props.value;
          }
          this.onChange = props.onChange;
          mobx.makeAutoObservable(this);
      }
      decrementFocus() {
          if (this.allDisabled) {
              return;
          }
          if (this.focusIdx > 0) {
              this.focusIdx--;
              if (this.options[this.focusIdx].disabled) {
                  if (this.focusIdx === 0) {
                      this.incrementFocus();
                  }
                  else {
                      this.decrementFocus();
                  }
              }
          }
      }
      incrementFocus() {
          if (this.allDisabled) {
              return;
          }
          if (this.focusIdx < this.options.length - 1) {
              this.focusIdx++;
              if (this.options[this.focusIdx].disabled) {
                  if (this.focusIdx === this.options.length - 1) {
                      this.decrementFocus();
                  }
                  else {
                      this.incrementFocus();
                  }
              }
          }
      }
      select(id) {
          var _a;
          if (this.multiple) {
              let array = this.selectedIds;
              if (array.includes(id)) {
                  array = array.filter(i => i !== id);
              }
              else {
                  array = [...array, id];
              }
              this.selectedIds = array;
          }
          else {
              this.selectedIds = [id];
          }
          (_a = this.onChange) === null || _a === void 0 ? void 0 : _a.call(this, this.value, arrayToSelection(this.selectedOptions.map(o => o.display), this.multiple));
          this.focusIdx = id;
      }
      get allDisabled() {
          return this.options.every(o => o.disabled);
      }
      get selectedOptions() {
          return this.selectedIds.map((i) => this.options[i]);
      }
      get value() {
          let asArray = this.selectedIds.map((i) => this.options[i].value);
          return arrayToSelection(asArray, this.multiple);
      }
      set value(value) {
          let valueArray = Array.isArray(value) ? value : [value];
          this.selectedIds = [];
          valueArray.forEach(v => {
              let targets = this.options.filter(o => mobx.comparer.structural(mobx.toJS(o.value), mobx.toJS(v))).map(o => o.idx);
              targets = targets.filter((i) => !this.selectedIds.includes(i));
              if (targets.length > 0) {
                  this.selectedIds.push(targets[0]);
              }
          });
      }
  }
  const DropdownContext = React.createContext(null);
  function useAutofocusRef(idx) {
      let state = React.useContext(DropdownContext);
      let el = React.useRef(null);
      React.useEffect(() => mobx.autorun(() => {
          var _a;
          if (state.focusIdx === idx) {
              (_a = el.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
          }
      }), []);
      return el;
  }
  const MenuItem = mobxReact.observer((props) => {
      const { option } = props, restWithTrackingProps = __rest(props, ["option"]);
      let state = React.useContext(DropdownContext);
      let ref = useAutofocusRef(props.option.idx);
      let classes = ["e2-dropdown-menu__item"];
      if (state.selectedIds.includes(props.option.idx)) {
          classes.push("e2-dropdown-menu__item--selected");
      }
      if (props.option.disabled) {
          classes.push("e2-dropdown-menu__item--disabled");
      }
      let onClick = React.useCallback((e) => {
          if (!props.option.disabled) {
              e.preventDefault();
              state.select(props.option.idx);
          }
      }, [state, props.option.disabled]);
      const rest = omitTrackingProps(restWithTrackingProps);
      const trackingProps = pickTrackingProps(restWithTrackingProps, () => ({
          "data-extra": JSON.stringify(mobx.toJS(option.value)),
      }));
      return React__namespace.createElement("li", Object.assign({ className: classes.join(" "), role: state.multiple ? "menuitemcheckbox" : "menuitemradio", tabIndex: props.option.disabled ? undefined : -1, ref: ref, onClick: onClick, "data-test-is-checked": state.selectedIds.includes(props.option.idx) }, rest, trackingProps),
          React__namespace.createElement("span", { className: 'e2-dropdown-menu__item-body' }, props.option.display),
          React__namespace.createElement("span", { className: 'e2-dropdown-menu__item-icon' }));
  });
  function ComponentFunction(props, forwardRef) {
      var _a, _b;
      let state = React.useMemo(() => new State(props), []);
      let rootMenu = React.useRef(null);
      let keybinding = useEventBindingRef({
          "keydown": (e) => {
              switch (e.key) {
                  case 'ArrowUp':
                      state.decrementFocus();
                      e.preventDefault();
                      break;
                  case 'ArrowDown':
                      state.incrementFocus();
                      e.preventDefault();
                      break;
                  case 'Enter':
                  case ' ':
                      if (state.focusIdx >= 0) {
                          state.select(state.focusIdx);
                          e.preventDefault();
                      }
                      break;
                  default:
                      return false;
              }
          },
          "focus": (e) => {
              mobx.runInAction(() => {
                  if (!state.multiple && state.selectedIds.length > 0) {
                      state.focusIdx = state.selectedIds[0];
                  }
                  else {
                      state.focusIdx = 0;
                  }
              });
          }
      }, []);
      React.useEffect(() => {
          if ("value" in props && props.value !== null) {
              state.value = props.value;
          }
      }, [props.value]);
      React.useEffect(() => {
          state.onChange = props.onChange;
      }, [props.onChange]);
      React.useEffect(() => {
          if (!props.show) {
              mobx.runInAction(() => { state.focusIdx = -1; });
          }
      }, [props.show]);
      let ref = useCombinedRef(rootMenu, keybinding, forwardRef);
      let classes = ["e2-dropdown-menu"];
      if (props.multiple) {
          classes.push("e2-dropdown-menu--multiple");
      }
      const dropboxTrackingProps = pickTrackingProps(props);
      const defaultOptionTrackingProps = {
          "data-cname": dropboxTrackingProps["data-cname"] + "__option",
          "test-id": ((_a = dropboxTrackingProps["test-id"]) !== null && _a !== void 0 ? _a : dropboxTrackingProps["data-cname"]) + "__option",
      };
      const listTestId = ((_b = dropboxTrackingProps["test-id"]) !== null && _b !== void 0 ? _b : dropboxTrackingProps["data-cname"]) + "__list";
      const menuItems = state.options.map(o => {
          const optionTrackingProps = pickTrackingProps(o, defaultOptionTrackingProps);
          return React__namespace.createElement(MenuItem, Object.assign({ option: o, key: o.idx }, optionTrackingProps));
      });
      return React__namespace.createElement(DropdownContext.Provider, { value: state },
          React__namespace.createElement(DropBox, Object.assign({ dropDirection: "down", show: props.show, flipToFitScreen: true, className: "e2-dropdown-menu-wrapper" }, dropboxTrackingProps, { key: "dropbox" }),
              React__namespace.createElement("ul", { className: classes.join(" "), tabIndex: -1, ref: ref, key: "list", "test-id": listTestId }, menuItems)));
  }
  const ForwardingObserverComponent = mobxReact.observer(React__namespace.forwardRef(ComponentFunction));
  const DropdownMenu = Object.assign(ForwardingObserverComponent, {
      "displayName": "DropdownMenu",
  });

  const Variant = {
      BUTTON: "BUTTON",
      LINK: "LINK",
  };
  const SelectComponent = (_a, forwardRef) => {
      var _b, _c;
      var { alwaysPlaceholder, disabled, initialValue, value: valueProp, invalid, multiple, onChange, options, placeholder, selectAll, variant, valueRef } = _a, restWithTrackingProps = __rest(_a, ["alwaysPlaceholder", "disabled", "initialValue", "value", "invalid", "multiple", "onChange", "options", "placeholder", "selectAll", "variant", "valueRef"]);
      const [open, setOpen] = React.useState(false);
      const [knownValue, setKnownValue] = React.useState(initialValue);
      const list = React.useRef(null);
      const buttonRef = React.useRef(null);
      const wrapper = React.useRef(null);
      const isControlled = valueProp != undefined;
      const value = isControlled ? valueProp : knownValue;
      React.useImperativeHandle(valueRef, () => {
          return { getValue: () => value };
      }, [value]);
      const containerTrackingProps = pickTrackingProps(restWithTrackingProps, {
          "data-cname": "e2_select",
          "test-id": (_b = restWithTrackingProps["data-cname"]) !== null && _b !== void 0 ? _b : "e2_select",
      });
      const buttonTrackingProps = addSuffixToTrackingProps(containerTrackingProps, "__button");
      const dropdownTrackingProps = Object.assign(Object.assign({}, addSuffixToTrackingProps(containerTrackingProps, "__dropdown")), { "data-track-visible": true });
      const parsedOptions = React.useMemo(() => propOptsToIndexedOpts(options), [options]);
      const buildOptionDisplay = React.useCallback((v, d) => {
          if (!multiple) {
              return d;
          }
          else if (Array.isArray(v) && v.length > 0) {
              return `${v.length} Selected`;
          }
          else {
              return null;
          }
      }, [multiple]);
      const optionDisplay = React.useMemo(() => {
          const displays = selectionAsArray(value).map(v => { var _a; return (_a = parsedOptions.find(o => o.value === v)) === null || _a === void 0 ? void 0 : _a.display; });
          const display = arrayToSelection(displays, multiple);
          return buildOptionDisplay(value, display);
      }, [value, multiple, parsedOptions, buildOptionDisplay]);
      const wrappedOnChange = React.useCallback((v, d) => {
          var _a;
          onChange === null || onChange === void 0 ? void 0 : onChange(v, d);
          if (!multiple) {
              setOpen(false);
              (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
          }
          if (!isControlled) {
              setKnownValue(v);
          }
      }, [onChange, multiple, isControlled]);
      {
          React.useLayoutEffect(() => {
              var _a, _b, _c;
              if (open) {
                  (_a = list.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
              }
              else if ((_b = wrapper.current) === null || _b === void 0 ? void 0 : _b.contains(document.activeElement)) {
                  (_c = buttonRef.current) === null || _c === void 0 ? void 0 : _c.focus({ preventScroll: true });
              }
          }, [open]);
      }
      const escapeBind = useEventBindingRef({
          "keydown": (e) => {
              if (disabled) {
                  return;
              }
              switch (e.key) {
                  case "ArrowDown":
                      if (!open) {
                          setOpen(true);
                      }
                      e.preventDefault();
                      break;
                  case "Escape":
                      if (open) {
                          setOpen(false);
                      }
                      break;
              }
          },
      }, [open, disabled], true);
      const blurCheck = useEventBindingRef({
          "focusout": (ev) => {
              var _a;
              if (!((_a = wrapper.current) === null || _a === void 0 ? void 0 : _a.contains(ev.relatedTarget))) {
                  setOpen(false);
              }
          },
      }, []);
      const wrapperRef = useCombinedRef(forwardRef, wrapper, escapeBind);
      const listRef = useCombinedRef(list, blurCheck);
      const selectClassNames = ["e2-select"];
      if (multiple) {
          selectClassNames.push("e2-select--multiple");
      }
      if (invalid) {
          selectClassNames.push("e2-select--invalid");
      }
      if (disabled) {
          selectClassNames.push("e2-select--disabled");
      }
      if (variant === Variant.LINK) {
          selectClassNames.push("e2-select--link");
      }
      if (alwaysPlaceholder || optionDisplay == undefined) {
          selectClassNames.push("e2-select--placeholder-visible");
      }
      return React__namespace.createElement("div", Object.assign({ className: "e2-select__wrapper", ref: wrapperRef, "data-test-select-type": "e2", "data-test-multiple": !!multiple }, containerTrackingProps),
          React__namespace.createElement("label", { className: selectClassNames.join(" ") },
              React__namespace.createElement("button", Object.assign({ ref: buttonRef, type: "button", className: "e2-select__button", disabled: disabled, onClick: () => setOpen(open => !open) }, buttonTrackingProps),
                  alwaysPlaceholder && placeholder,
                  !alwaysPlaceholder && ((_c = optionDisplay !== null && optionDisplay !== void 0 ? optionDisplay : placeholder) !== null && _c !== void 0 ? _c : (multiple ? "Select Any" : "Select One")),
                  React__namespace.createElement(MaterialIcon, { className: "e2-select__icon", filename: "icon-caret-20.svg" }))),
          React__namespace.createElement(DropdownMenu, Object.assign({ ref: listRef, show: open, options: options, multiple: multiple, value: value, onChange: wrappedOnChange }, dropdownTrackingProps)));
  };
  const ForwardingSelectComponent = React__namespace.forwardRef(SelectComponent);
  const Select = Object.assign(ForwardingSelectComponent, {
      "displayName": "Select",
      Variant
  });

  const Component = React.forwardRef((_a, ref) => {
      var { className, invalid, resizable } = _a, props = __rest(_a, ["className", "invalid", "resizable"]);
      let classes = ["e2-textarea"];
      if (invalid) {
          classes.push("e2-textarea--invalid");
      }
      if (resizable === true) {
          classes.push("e2-textarea--resizable");
      }
      else if (resizable) {
          classes.push("e2-textarea--resizable-" + resizable);
      }
      if (className) {
          classes.push(className);
      }
      return React__namespace.createElement("textarea", Object.assign({ className: classes.join(" "), ref: ref }, props));
  });
  var TextArea = Object.assign(Component, {
      "displayName": "TextArea"
  });

  let Toggle = React.forwardRef((props, forward) => {
      var _a;
      let [checked, setChecked] = React.useState((_a = props.checked) !== null && _a !== void 0 ? _a : false);
      React.useEffect(() => {
          if (props.checked === true || props.checked === false) {
              setChecked(props.checked);
          }
      }, [props.checked]);
      let onClick = React.useCallback((e) => {
          var _a, _b;
          if (props.disabled) {
              return;
          }
          (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, e);
          (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, !checked);
          if (props.checked !== true && props.checked !== false) {
              setChecked(!checked);
          }
      }, [checked, props.onClick]);
      let classes = ['e2-toggle'];
      if (checked) {
          classes.push('e2-toggle--checked');
      }
      return React__namespace.createElement("button", { disabled: props.disabled, className: classes.join(" "), ref: forward, role: "switch", "aria-checked": checked, onClick: onClick });
  });
  var Toggle$1 = Object.assign(Toggle, {
      "displayName": "Toggle"
  });

  const InputType = {
      TEXT: "TEXT",
      SEARCH: "SEARCH",
  };
  function isExactKeystroke(event, key, ...modifiers) {
      if (event.shiftKey !== modifiers.includes("shiftKey")) {
          return false;
      }
      if (event.altKey !== modifiers.includes("altKey")) {
          return false;
      }
      if (event.ctrlKey !== modifiers.includes("ctrlKey")) {
          return false;
      }
      if (event.metaKey !== modifiers.includes("metaKey")) {
          return false;
      }
      return event.key === key;
  }
  const NO_RESULTS_FOUND = [{ value: null, display: "No results found", disabled: true }];
  const useConsumablePostRenderCallbacks = () => {
      const callbacks = React.useRef([]);
      React.useEffect(() => {
          for (const callback of callbacks.current) {
              try {
                  callback === null || callback === void 0 ? void 0 : callback();
              }
              catch (e) {
                  console.error(e);
              }
          }
          callbacks.current.length = 0;
      });
      return callback => {
          callbacks.current.push(callback);
      };
  };
  const TypeaheadComponent = (_a) => {
      var _b;
      var { onChange, type = InputType.TEXT, fetchSuggestions } = _a, inputProps = __rest(_a, ["onChange", "type", "fetchSuggestions"]);
      const [suggestions, setSuggestions] = React.useState();
      const [isLoadingSuggestions, setIsLoadingSuggestions] = React.useState(false);
      const [showSuggestions, setShowSuggestions] = React.useState(false);
      const lastSuggestionLoad = React.useRef();
      const dropdownHadFocusRef = React.useRef(false);
      const addConsumablePostRenderCallback = useConsumablePostRenderCallbacks();
      const ignoreNextInputFocus = React.useRef(null);
      const containerClassNames = ["e2-typeahead", "e2-typeahead--loading-bar-style"];
      if (isLoadingSuggestions) {
          containerClassNames.push("e2-typeahead--loading");
      }
      const containerTrackingProps = pickTrackingProps(inputProps, {
          "data-cname": "e2_typeahead",
          "test-id": (_b = inputProps["data-cname"]) !== null && _b !== void 0 ? _b : "e2_typeahead",
      });
      const inputPropsNoTracking = omitTrackingProps(inputProps);
      const inputTrackingProps = addSuffixToTrackingProps(containerTrackingProps, "__input");
      const InputComponent = type === InputType.SEARCH ? Input.Search : Input.Text;
      const inputCommands = useStudyImperativeHandle();
      const inputRef = React.useRef();
      const inputKeydownHandler = React.useCallback(event => {
          var _a, _b;
          if (inputProps.disabled) {
              return;
          }
          if (isExactKeystroke(event, "Tab")) {
              if (showSuggestions) {
                  (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
                  dropdownHadFocusRef.current = true;
                  event.preventDefault();
              }
          }
          else if (isExactKeystroke(event, "ArrowDown")) {
              if (!showSuggestions) {
                  setShowSuggestions(true);
                  addConsumablePostRenderCallback(() => {
                      var _a;
                      (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
                      dropdownHadFocusRef.current = true;
                  });
              }
              else {
                  (_b = dropdownRef.current) === null || _b === void 0 ? void 0 : _b.focus({ preventScroll: true });
                  dropdownHadFocusRef.current = true;
              }
              event.preventDefault();
          }
          else if (event.key === "Escape") {
              setShowSuggestions(false);
          }
      }, [showSuggestions, inputProps.disabled]);
      const inputFocusHandler = React.useCallback(() => {
          if (inputProps.disabled) {
              return;
          }
          if (ignoreNextInputFocus.current && (new Date().getTime() - ignoreNextInputFocus.current) <= 100) {
              return;
          }
          if ((suggestions === null || suggestions === void 0 ? void 0 : suggestions.length) > 0) {
              setShowSuggestions(true);
          }
      }, [suggestions, inputProps.disabled]);
      const inputChangeHandler = React.useCallback(newValue => {
          var _a;
          try {
              onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
          }
          catch (e) {
              console.error("Change handler failed", e);
          }
          try {
              const abortController = new AbortController();
              const promise = fetchSuggestions === null || fetchSuggestions === void 0 ? void 0 : fetchSuggestions(newValue, abortController.signal);
              if (promise) {
                  (_a = lastSuggestionLoad.current) === null || _a === void 0 ? void 0 : _a.abortController.abort("new typeahead query submitted");
                  lastSuggestionLoad.current = { promise, abortController };
                  setIsLoadingSuggestions(true);
                  setShowSuggestions(true);
                  promise.then(newSuggestions => {
                      if (lastSuggestionLoad.current.promise == promise) {
                          setSuggestions(newSuggestions);
                          setShowSuggestions(newSuggestions != null);
                      }
                  })
                      .catch(reason => {
                      console.error("Suggestions callback failed", reason);
                      if (lastSuggestionLoad.current.promise == promise) {
                          setSuggestions(null);
                          setShowSuggestions(false);
                      }
                  })
                      .finally(() => {
                      if (lastSuggestionLoad.current.promise == promise) {
                          setIsLoadingSuggestions(false);
                      }
                  });
              }
          }
          catch (e) {
              console.error("Suggestions callback failed", e);
          }
      }, [onChange, fetchSuggestions]);
      const dropdownRef = React.useRef();
      const dropdownKeybindings = useEventBindingRef({
          keydown: event => {
              var _a, _b;
              if (inputProps.disabled) {
                  return;
              }
              if (isExactKeystroke(event, "Tab", "shiftKey")) {
                  (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
                  dropdownHadFocusRef.current = false;
                  event.preventDefault();
              }
              else if (event.key === "Escape") {
                  (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.focus({ preventScroll: true });
                  dropdownHadFocusRef.current = false;
                  event.preventDefault();
                  setShowSuggestions(false);
              }
          },
      }, []);
      const dropdownChangeHandler = React.useCallback(newValue => {
          const inputEl = inputRef.current;
          if (inputEl) {
              inputEl.value = newValue;
              inputEl.dispatchEvent(new InputEvent("input", {
                  inputType: "insertReplacementText",
                  data: newValue,
                  bubbles: true,
              }));
              inputEl.dispatchEvent(new Event("change", {
                  bubbles: true,
              }));
              onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
              ignoreNextInputFocus.current = new Date().getTime();
              inputEl.focus();
              dropdownHadFocusRef.current = false;
          }
          setShowSuggestions(false);
      }, []);
      const dropdownTrackingProps = addSuffixToTrackingProps(containerTrackingProps, "__dropdown");
      dropdownTrackingProps["data-track-visible"] = true;
      const reallyShowSuggestions = (showSuggestions && suggestions != null) || isLoadingSuggestions;
      let options;
      if ((suggestions === null || suggestions === void 0 ? void 0 : suggestions.length) > 0) {
          options = suggestions;
      }
      else if ((suggestions === null || suggestions === void 0 ? void 0 : suggestions.length) == 0) {
          options = NO_RESULTS_FOUND;
      }
      else {
          options = [];
      }
      React.useEffect(() => {
          if (dropdownHadFocusRef.current) {
              setTimeout(() => {
                  inputRef.current.focus({ preventScroll: true });
                  setTimeout(() => {
                      var _a;
                      (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
                  }, 0);
              }, 0);
          }
      }, [options]);
      return React__namespace.createElement("div", Object.assign({ className: containerClassNames.join(" ") }, containerTrackingProps),
          React__namespace.createElement(InputComponent, Object.assign({ ref: inputRef, commands: inputCommands, onChange: inputChangeHandler, onFocusCapture: inputFocusHandler, onKeyDownCapture: inputKeydownHandler }, inputPropsNoTracking, inputTrackingProps)),
          React__namespace.createElement(DropdownMenu, Object.assign({ ref: useCombinedRef$1(dropdownRef, dropdownKeybindings), show: reallyShowSuggestions, options: options, onChange: dropdownChangeHandler }, dropdownTrackingProps, { key: JSON.stringify(options) })));
  };
  const Typeahead = Object.assign(TypeaheadComponent, {
      displayName: "Typeahead",
      InputType,
  });

  const ProgressBar = React.forwardRef((_a, ref) => {
      var { value, inverted } = _a, rest = __rest(_a, ["value", "inverted"]);
      const clampedValue = Math.max(0, Math.min(value, 100));
      const containerClass = inverted ? "e2-progress-bar__container--inverted" : "e2-progress-bar__container";
      const labelClass = "e2-progress-bar__label" + (inverted ? " e2-typography-label-small--inverted" : " e2-typography-label-small");
      return (React.createElement("div", Object.assign({ className: containerClass }, rest),
          React.createElement("div", { ref: ref, className: "e2-progress-bar__outer" },
              React.createElement("div", { className: "e2-progress-bar__inner", style: { width: `${clampedValue}%` } })),
          React.createElement("span", { className: labelClass },
              Math.round(clampedValue),
              "%"),
          React.createElement("span", { className: "e2-progress-bar__label--placeholder" }, "100%")));
  });

  const TagComponent = (_a) => {
      var { status, text, muted, outline } = _a, rest = __rest(_a, ["status", "text", "muted", "outline"]);
      const baseClass = `e2-tag__${status.toLowerCase()}`;
      const tagClass = [
          baseClass,
          muted ? `${baseClass}--muted` : '',
          outline ? `${baseClass}--outline` : '',
      ].filter(Boolean).join(' ');
      return (React.createElement("div", Object.assign({ className: `e2-tag ${tagClass}` }, rest), text));
  };
  const Tag = Object.assign(TagComponent, {
      "displayName": "Tag",
      Variant: Variant$1,
  });

  exports.Accordion = Accordion;
  exports.Avatar = Avatar;
  exports.AvatarGroup = AvatarGroup;
  exports.AvatarRow = AvatarRow;
  exports.Breadcrumb = Breadcrumb;
  exports.Button = Button;
  exports.ButtonBoxes = ButtonBoxes;
  exports.Carousel = Carousel;
  exports.Checkbox = Checkbox;
  exports.Configuration = Configuration;
  exports.ContentCard = ContentCard;
  exports.CourseCard = CourseCard;
  exports.Datepicker = Datepicker$1;
  exports.DropBox = DropBox;
  exports.ExpectedDeviceContext = ExpectedDeviceContext;
  exports.ExpectedScreenSizeContext = ExpectedScreenSizeContext;
  exports.Field = Field;
  exports.FilterPill = FilterPill;
  exports.FilterPills = FilterPills;
  exports.Footer = Footer;
  exports.Input = Input;
  exports.LayoutHooks = LayoutHooks;
  exports.LessonCard = LessonCard;
  exports.MaterialIcon = MaterialIcon;
  exports.Modal = Modal;
  exports.OverflowFrame = OverflowFrame;
  exports.Pagination = Pagination;
  exports.ProgressBar = ProgressBar;
  exports.RadioButton = RadioButton;
  exports.Select = Select;
  exports.Skeleton = Skeleton;
  exports.Steps = Steps;
  exports.StudyDotComLogo = StudyDotComLogo;
  exports.StudyTestimonial = StudyTestimonial;
  exports.Tabs = Tabs;
  exports.Tag = Tag;
  exports.Testimonial = Testimonial;
  exports.TextArea = TextArea;
  exports.ToastVariant = Variant$1;
  exports.Toggle = Toggle$1;
  exports.Tooltip = Tooltip;
  exports.TrustPilotReviews = TrustPilotReviews;
  exports.TrustPilotTestimonial = TrustPilotTestimonial;
  exports.Typeahead = Typeahead;
  exports.TypeaheadUtil = TypeaheadUtil;
  exports.addSuffixToTrackingProps = addSuffixToTrackingProps;
  exports.mergeTrackingProps = mergeTrackingProps;
  exports.omitTrackingProps = omitTrackingProps;
  exports.pickTrackingProps = pickTrackingProps;
  exports.setDefaultConfiguration = setDefaultConfiguration;
  exports.toastStore = toastStore;
  exports.useCombinedRef = useCombinedRef;
  exports.useEventBindingRef = useEventBindingRef;
  exports.useScrollToEdgeObservingRef = useScrollToEdgeObservingRef;
  exports.useStudyImperativeHandle = useStudyImperativeHandle;

}));
//# sourceMappingURL=eureka-design-system.js.map

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
define(["require", "exports", "components/GenericErrorBoundary", "eventLogging", "react", "react", "react-dom/client", "@sites-study-com/remspect", "compatibility/promise-polyfill"], function (require, exports, GenericErrorBoundary_1, eventLogging, React, react_1, client_1, Remspect) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extractStudyHTMLAttributes = exports.useMeasureElementSize = exports.renderReplace = exports.MathJaxText = exports.ReactTransitionBetweenComponents = exports.SessionStorageManager = exports.LocalStorageManager = exports.useIsIntersecting = exports.IntersectionObserverRef = exports.currency = exports.StudyThemeProvider = exports.getQueryParams = exports.renderMathJaxCallback = void 0;
    exports.renderMathJax = renderMathJax;
    exports.containsMathJax = containsMathJax;
    exports.replaceDelimiterWithCamelCase = replaceDelimiterWithCamelCase;
    exports.reactBootstrap = reactBootstrap;
    exports.rehydrateReactSSR = rehydrateReactSSR;
    function renderMathJax(ref) {
        (0, exports.renderMathJaxCallback)(ref.current);
    }
    var renderMathJaxCallback = function (node) {
        if (!node) {
            return;
        }
        require(["mathjax"], function (MathJax) {
            MathJax.startup.promise = MathJax.startup.promise
                .then(function () { return MathJax.typesetPromise([node]); })
                .catch(function (e) {
                console.warn("issue rendering mathjax");
                console.warn(e);
            });
        });
    };
    exports.renderMathJaxCallback = renderMathJaxCallback;
    function containsMathJax(value) {
        return value.indexOf("{eq}") > -1 || value.indexOf("{am}") > -1 || value.indexOf("$$") > -1;
    }
    var LazyThemeProvider = React.lazy(function () {
        return new Promise(function (resolve_1, reject_1) { require(["lib/react-bootstrap"], resolve_1, reject_1); }).then(function (ReactBootstrapModule) {
            return { default: ReactBootstrapModule.ThemeProvider };
        });
    });
    var getQueryParams = function () {
        var queryString = (window.location.search || "").replace(/^\?/, "");
        var pairs = queryString.split("&");
        var queryParams = {};
        pairs.forEach(function (p) {
            var _a = p.split("=", 2).map(decodeURIComponent), key = _a[0], value = _a[1];
            queryParams[key] = value;
        });
        return queryParams;
    };
    exports.getQueryParams = getQueryParams;
    var StudyThemeProvider = (function (_super) {
        __extends(StudyThemeProvider, _super);
        function StudyThemeProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(StudyThemeProvider.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return React.createElement(React.Suspense, { fallback: null },
                    React.createElement(LazyThemeProvider, { prefixes: StudyThemeProvider.STUDY_CLASS_PREFIXES }, React.createElement(LazyComponentInner, { lazyComponentDidMount: this.props.lazyComponentDidMount }, this.props.children)));
            }
        });
        Object.defineProperty(StudyThemeProvider, "STUDY_CLASS_PREFIXES", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                "modal": "bs5-modal",
                "modal-body": "bs5-modal-body",
                "modal-dialog": "bs5-modal-dialog",
                "modal-footer": "bs5-modal-footer",
                "modal-header": "bs5-modal-header",
                "modal-title": "bs5-modal-title",
                "carousel": "bs5-carousel",
                "carousel-caption": "bs5-carousel-caption",
                "carousel-item": "bs5-carousel-item",
                "tooltip": "bs5-tooltip",
                "tooltip-inner": "bs5-tooltip-inner",
                "popover": "bs5-popover",
                "dropdown": "bs5-dropdown",
                "dropdown-toggle": "bs5-dropdown-toggle",
                "dropdown-menu": "bs5-dropdown-menu",
                "dropdown-header": "bs5-dropdown-header",
                "dropdown-item": "bs5-dropdown-item",
            }
        });
        return StudyThemeProvider;
    }(React.Component));
    exports.StudyThemeProvider = StudyThemeProvider;
    var LazyComponentInner = (function (_super) {
        __extends(LazyComponentInner, _super);
        function LazyComponentInner() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(LazyComponentInner.prototype, "componentDidMount", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.props.lazyComponentDidMount != null) {
                    this.props.lazyComponentDidMount();
                }
            }
        });
        Object.defineProperty(LazyComponentInner.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return React.createElement(React.Fragment, null, this.props.children);
            }
        });
        return LazyComponentInner;
    }(React.Component));
    var currency = function (value, withTrailingZeroCents) {
        if (value == null) {
            return "";
        }
        if (!value.toString().split(".")[1]) {
            return '$' + value.toFixed(0) + (withTrailingZeroCents ? ".00" : "");
        }
        return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
    exports.currency = currency;
    function replaceDelimiterWithCamelCase(input, delimiter, flags) {
        if (flags === void 0) { flags = "g"; }
        var regExp = new RegExp(delimiter + "(?<nextChar>.)", flags);
        return input.replace(regExp, function () {
            var groups = arguments[arguments.length - 1];
            return groups.nextChar.toUpperCase();
        });
    }
    var ChildrenToJsxHelper = (function () {
        function ChildrenToJsxHelper(element) {
            Object.defineProperty(this, "childJsxElements", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            for (var i = 0; i < element.children.length; i++) {
                var child = element.children.item(i);
                var childTagName = child.tagName.toLowerCase();
                var childContent = child.innerHTML;
                var childAttributes = {};
                for (var _i = 0, _a = child.getAttributeNames(); _i < _a.length; _i++) {
                    var attributeName = _a[_i];
                    var attributeValue = child.getAttribute(attributeName);
                    if (attributeName === "class") {
                        attributeName = "className";
                    }
                    else if (attributeName === "style") {
                        var reactStyles = {};
                        for (var _b = 0, _c = attributeValue.split(/;/); _b < _c.length; _b++) {
                            var rule = _c[_b];
                            var firstColonIndex = rule.indexOf(":");
                            var propertyValue = rule.slice(firstColonIndex + 1).trim();
                            var htmlPropertyName = rule.slice(0, firstColonIndex).trim();
                            var reactPropertyName = htmlPropertyName;
                            if (!rule.startsWith("--")) {
                                reactPropertyName = replaceDelimiterWithCamelCase(htmlPropertyName, "-");
                            }
                            reactStyles[reactPropertyName] = propertyValue;
                        }
                        attributeValue = reactStyles;
                    }
                    childAttributes[attributeName] = attributeValue;
                }
                childAttributes.dangerouslySetInnerHTML = {
                    __html: childContent,
                };
                this.childJsxElements.push(React.createElement(childTagName, childAttributes));
            }
        }
        return ChildrenToJsxHelper;
    }());
    var ParsePropsFromAttributesHelper = (function () {
        function ParsePropsFromAttributesHelper() {
        }
        Object.defineProperty(ParsePropsFromAttributesHelper, "parsePropsFromAttributes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (element) {
                var props = {};
                for (var _i = 0, _a = element.getAttributeNames(); _i < _a.length; _i++) {
                    var attributeName = _a[_i];
                    if (!this.startsWith(attributeName, ParsePropsFromAttributesHelper.PROPS_ATTRIBUTE_PREFIX)) {
                        continue;
                    }
                    var splitName = attributeName.split("-");
                    if (splitName.length < 3) {
                        throw new Error("React-ng prop- attribute name must follow the format prop-type-propname. E.g: prop-bool-show-see-all. Error parsing "
                            + attributeName);
                    }
                    var propType = splitName[1];
                    var fullPropName = this.camelCaseifyArray(splitName);
                    var propName = this.camelCaseifyArray(splitName.slice(2));
                    var attributeValue = element.getAttribute(attributeName);
                    var propValue = this.castAttributeValueToPropType(attributeValue, propType);
                    props[propName] = propValue;
                }
                return props;
            }
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "castAttributeValueToPropType", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, propType) {
                if (propType === ParsePropsFromAttributesHelper.BOOLEAN_PREFIX) {
                    return !(value == null || value === "false" || value === "");
                }
                else if (propType === ParsePropsFromAttributesHelper.NUMBER_PREFIX) {
                    return parseFloat(value);
                }
                else if (propType === ParsePropsFromAttributesHelper.STRING_PREFIX) {
                    return value;
                }
                else {
                    throw new Error("Attempted to cast attribute value to unsupported propType. propType=".concat(propType));
                }
            }
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "startsWith", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (string, subString) {
                return string.indexOf(subString) == 0;
            }
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "camelCaseifyArray", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (strings) {
                var result = strings.map(function (string, i) {
                    if (i !== 0) {
                        return string[0].toUpperCase() + string.slice(1);
                    }
                    else {
                        return string;
                    }
                }).join("");
                return result;
            }
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "PROPS_ATTRIBUTE_PREFIX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "prop-"
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "BOOLEAN_PREFIX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "boolean"
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "NUMBER_PREFIX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "number"
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "STRING_PREFIX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "string"
        });
        return ParsePropsFromAttributesHelper;
    }());
    var hasReactBootstrapped = false;
    function reactBootstrap(target) {
        if (hasReactBootstrapped) {
            console.warn("reactBootstrap was called twice. Please make sure that if global.js is either the only one calling it or not imported.");
            return;
        }
        hasReactBootstrapped = true;
        var reactInitElements = target.querySelectorAll("react-init, [react-init]");
        reactInitElements.forEach(function (ele) {
            var isLazy = ele.getAttribute("data-load-on-click") === "true";
            if (isLazy) {
                lazyReactBootstrapElement(ele);
            }
            else {
                reactBootstrapElement(ele);
            }
        });
    }
    var hasRehydratedReactSSR = false;
    function rehydrateReactSSR(target) {
        if (hasRehydratedReactSSR) {
            console.warn("rehydrateReactSSR was called twice. Please make sure that if global.js is either the only one calling it or not imported.");
            return;
        }
        hasRehydratedReactSSR = true;
        var ssrReactElements = target.querySelectorAll("react-ssr");
        ssrReactElements.forEach(function (ele) {
            rehydrateComponent(ele);
        });
    }
    var hydrateDebugCounter = 0;
    function rehydrateComponent(element) {
        return __awaiter(this, void 0, void 0, function () {
            var delay, moduleName, componentName, propsScript, props, component, module, e_1, reactElement, fallback, root, root, sentError_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        delay = element.hasAttribute("debug-delay-load") || !Remspect.isControl("ssrDelayHydration");
                        moduleName = element.getAttribute("module");
                        componentName = (_a = element.getAttribute("component")) !== null && _a !== void 0 ? _a : "default";
                        if (delay && !element.hasAttribute("debug-id")) {
                            console.debug("".concat(moduleName, "/").concat(componentName, " is dehydrated for debugging SEO. Re-hydrate it with hydrateDebug(").concat(hydrateDebugCounter, ") or hydrateDebug(\"all\")"));
                            element.setAttribute("debug-id", String(hydrateDebugCounter++));
                            return [2];
                        }
                        propsScript = element.querySelector("[data-props]");
                        props = JSON.parse(propsScript.innerHTML);
                        propsScript.remove();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, new Promise(function (resolve_2, reject_2) { require([moduleName], resolve_2, reject_2); })];
                    case 2:
                        module = _b.sent();
                        component = module[componentName];
                        if (!component) {
                            if (componentName === "default") {
                                component = module;
                            }
                            if (!component) {
                                throw new Error("Component does not exist in module");
                            }
                        }
                        return [3, 4];
                    case 3:
                        e_1 = _b.sent();
                        console.error("Could not find ".concat(moduleName, "/").concat(componentName, "."), e_1);
                        return [3, 4];
                    case 4:
                        reactElement = React.createElement(component, props);
                        fallback = element.innerHTML;
                        try {
                            if (element.querySelector("ssr-failed")) {
                                console.warn("".concat(moduleName, "/").concat(componentName, " was not rendered by the server. Investigate the server logs for what went wrong."));
                                root = (0, client_1.createRoot)(element);
                                root.render(React.createElement(GenericErrorBoundary_1.GenericErrorBoundaryView, { errorHtml: fallback }, reactElement));
                            }
                            else if (element.querySelector("ssr-skipped")) {
                                root = (0, client_1.createRoot)(element);
                                root.render(React.createElement(GenericErrorBoundary_1.GenericErrorBoundaryView, { errorHtml: fallback }, reactElement));
                            }
                            else {
                                sentError_1 = false;
                                (0, client_1.hydrateRoot)(element, React.createElement(GenericErrorBoundary_1.GenericErrorBoundaryView, { errorHtml: fallback }, reactElement), {
                                    onRecoverableError: (function (error, stack) {
                                        if (sentError_1) {
                                            return;
                                        }
                                        var component = "".concat(moduleName, "/").concat(componentName);
                                        var reactComponentStack = stack.componentStack.trim().split("\n").map(function (item) { return item.trim(); });
                                        if (reactComponentStack.length == 1 && reactComponentStack[0] == "") {
                                            reactComponentStack[0] = "unknown";
                                        }
                                        console.error("SSR Hydration Error: " + component + "\n", "Component Stack:\n", reactComponentStack, "\n", error);
                                        eventLogging.logError(error, "ssrHydrationError", function (loggableEvent) {
                                            loggableEvent.component = component;
                                            loggableEvent.reactComponentStack = reactComponentStack;
                                        });
                                        sentError_1 = true;
                                    }),
                                });
                            }
                        }
                        catch (e) {
                            console.error("Rehydration of ".concat(moduleName, "/").concat(componentName, " failed! Falling back."), e);
                        }
                        return [2];
                }
            });
        });
    }
    window['hydrateDebug'] = function (id) {
        if (typeof id === "number") {
            var element = void 0;
            element = document.querySelector("react-ssr[debug-id=\"".concat(id, "\"]"));
            rehydrateComponent(element);
        }
        else if (id === "all") {
            var elements = document.querySelectorAll("react-ssr[debug-id]");
            elements.forEach(function (element) { return rehydrateComponent(element); });
        }
        else {
            console.error("Could not find module(s) to rehydrate based on id=" + id);
        }
    };
    function lazyReactBootstrapElement(element) {
        var onClick = function (event) {
            reactBootstrapElement(element);
            element.removeEventListener("click", onClick);
        };
        element.addEventListener("click", onClick);
    }
    function reactBootstrapElement(element) {
        var componentName = element.getAttribute("component-name");
        var functionName = element.getAttribute("function-name");
        if (componentName != null && functionName != null) {
            throw new Error("Cannot have both component name and function name defined! componentName=" + componentName);
        }
        if (functionName != null) {
            bootstrapViaFunction(element);
        }
        else {
            bootstrapViaComponent(element);
        }
    }
    function bootstrapViaComponent(element) {
        var path = element.getAttribute("require-path");
        var componentName = element.getAttribute("component-name");
        var parsedProps = ParsePropsFromAttributesHelper.parsePropsFromAttributes(element);
        var jsxElementsHelper = new ChildrenToJsxHelper(element);
        var depsPromise = Promise.all([new Promise(function (resolve_3, reject_3) { require(["react"], resolve_3, reject_3); }), new Promise(function (resolve_4, reject_4) { require(["react-dom/client"], resolve_4, reject_4); }), new Promise(function (resolve_5, reject_5) { require(["components/GenericErrorBoundary"], resolve_5, reject_5); })]);
        depsPromise.then(function (_a) {
            var React = _a[0], ReactDOMClient = _a[1], GenericErrorBoundaryModule = _a[2];
            var GenericErrorBoundaryView = GenericErrorBoundaryModule.GenericErrorBoundaryView;
            var fallback = null;
            if (jsxElementsHelper.childJsxElements.length == 1) {
                fallback = jsxElementsHelper.childJsxElements[0];
            }
            else if (jsxElementsHelper.childJsxElements.length > 1) {
                fallback = React.createElement(React.Fragment, null, jsxElementsHelper.childJsxElements);
            }
            var LazyComponent = React.lazy(function () {
                if (componentName) {
                    return new Promise(function (resolve_6, reject_6) { require([path], resolve_6, reject_6); }).then(function (module) {
                        return { "default": module[componentName] };
                    });
                }
                else {
                    return new Promise(function (resolve_7, reject_7) { require([path], resolve_7, reject_7); });
                }
            });
            var root = ReactDOMClient.createRoot(element);
            root.render(React.createElement(GenericErrorBoundaryView, { errorView: fallback },
                React.createElement(React.Suspense, { fallback: fallback },
                    React.createElement(LazyComponent, __assign({}, parsedProps)))));
        });
    }
    function bootstrapViaFunction(element) {
        var path = element.getAttribute("require-path");
        var functionName = element.getAttribute("function-name");
        var parsedProps = ParsePropsFromAttributesHelper.parsePropsFromAttributes(element);
        new Promise(function (resolve_8, reject_8) { require([path], resolve_8, reject_8); }).then(function (module) {
            module[functionName](element, parsedProps);
        });
    }
    var IntersectionObserverRef = (function () {
        function IntersectionObserverRef(callback, options) {
            var _this = this;
            Object.defineProperty(this, "current", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "ref", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (el) { return _this.handleChange(el); }
            });
            Object.defineProperty(this, "intersectionObserver", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            if (typeof window.IntersectionObserver == "undefined") {
                return;
            }
            var wrappedCallback = function (entries, observer) {
                if ((entries === null || entries === void 0 ? void 0 : entries.length) == 1) {
                    callback(entries[0], observer);
                }
            };
            this.intersectionObserver = new IntersectionObserver(wrappedCallback, options);
        }
        Object.defineProperty(IntersectionObserverRef.prototype, "handleChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (el) {
                var _a, _b;
                if (el != null && this.current == null) {
                    this.current = el;
                    (_a = this.intersectionObserver) === null || _a === void 0 ? void 0 : _a.observe(this.current);
                }
                else if (el == null && this.current != null) {
                    (_b = this.intersectionObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
                    this.current = null;
                }
            }
        });
        return IntersectionObserverRef;
    }());
    exports.IntersectionObserverRef = IntersectionObserverRef;
    var useIsIntersecting = function (options) {
        if (options === void 0) { options = {}; }
        var _a = (0, react_1.useState)(false), isIntersecting = _a[0], setIsIntersecting = _a[1];
        var elementRef = (0, react_1.useRef)(null);
        var intersectionObserverRef = (0, react_1.useRef)(null);
        var refCallback = (0, react_1.useCallback)(function (el) {
            var _a, _b;
            if (el != null && elementRef.current == null) {
                elementRef.current = el;
                (_a = intersectionObserverRef.current) === null || _a === void 0 ? void 0 : _a.observe(elementRef.current);
            }
            else if (el == null && elementRef.current != null) {
                (_b = intersectionObserverRef.current) === null || _b === void 0 ? void 0 : _b.disconnect();
                elementRef.current = null;
            }
        }, []);
        if (typeof window.IntersectionObserver != "undefined" && intersectionObserverRef.current == null) {
            var onCallback_1 = options.onCallback, observerOptions = __rest(options, ["onCallback"]);
            if (onCallback_1 == null) {
                onCallback_1 = function (entry) { return entry.isIntersecting; };
            }
            intersectionObserverRef.current = new IntersectionObserver(function (entries, observer) {
                if ((entries === null || entries === void 0 ? void 0 : entries.length) == 1) {
                    var isIntersecting_1 = onCallback_1(entries[0]);
                    setIsIntersecting(isIntersecting_1);
                    if (options.disconnectOnFirstIntersection && isIntersecting_1) {
                        observer.disconnect();
                    }
                }
            }, observerOptions);
        }
        return [isIntersecting, refCallback];
    };
    exports.useIsIntersecting = useIsIntersecting;
    var StorageManager = (function () {
        function StorageManager(storage, identifier) {
            Object.defineProperty(this, "_hasAccessToStorage", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "identifier", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "storage", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.identifier = identifier;
            this.storage = storage;
        }
        Object.defineProperty(StorageManager.prototype, "hasAccessToStorage", {
            get: function () {
                if (this._hasAccessToStorage != null) {
                    return this._hasAccessToStorage;
                }
                try {
                    if (!this.storage) {
                        return false;
                    }
                    this.storage.setItem("storageManager.check", "true");
                    this.storage.removeItem("storageManager.check");
                    this._hasAccessToStorage = true;
                }
                catch (e) {
                    this._hasAccessToStorage = false;
                }
                return this._hasAccessToStorage;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StorageManager.prototype, "hasKey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key) {
                try {
                    if (!this.storage) {
                        return false;
                    }
                    return this.storage.getItem(key) != null;
                }
                catch (e) {
                    console.warn("Failed to get ".concat(this.identifier));
                    return false;
                }
            }
        });
        Object.defineProperty(StorageManager.prototype, "getNum", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key, defaultValue) {
                try {
                    if (!this.storage) {
                        return defaultValue;
                    }
                    var num = parseInt(this.storage.getItem(key));
                    if (isNaN(num)) {
                        return defaultValue;
                    }
                    return num;
                }
                catch (e) {
                    console.warn("Failed to get ".concat(this.identifier));
                    return defaultValue;
                }
            }
        });
        Object.defineProperty(StorageManager.prototype, "getBoolean", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key, defaultValue) {
                try {
                    if (!this.storage) {
                        return defaultValue;
                    }
                    var value = this.storage.getItem(key);
                    if (value == null) {
                        return defaultValue;
                    }
                    return value === "true";
                }
                catch (e) {
                    console.warn("Failed to get ".concat(this.identifier));
                    return defaultValue;
                }
            }
        });
        Object.defineProperty(StorageManager.prototype, "getString", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key, defaultValue) {
                try {
                    if (!this.storage) {
                        return defaultValue;
                    }
                    var value = this.storage.getItem(key);
                    return value !== null && value !== void 0 ? value : defaultValue;
                }
                catch (e) {
                    console.warn("Failed to get ".concat(this.identifier));
                    return defaultValue;
                }
            }
        });
        Object.defineProperty(StorageManager.prototype, "setKey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key, value) {
                try {
                    if (!this.storage) {
                        return;
                    }
                    return this.storage.setItem(key, value.toString());
                }
                catch (e) {
                    console.warn("Failed to get ".concat(this.identifier));
                }
            }
        });
        return StorageManager;
    }());
    exports.LocalStorageManager = new StorageManager(localStorage, "localStorage");
    exports.SessionStorageManager = new StorageManager(sessionStorage, "sessionStorage");
    var ReactTransitionBetweenComponents = (function (_super) {
        __extends(ReactTransitionBetweenComponents, _super);
        function ReactTransitionBetweenComponents() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ReactTransitionBetweenComponents.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var initialComponentClass = this.props.showInitial ? this.props.onMountClassStr : this.props.onUnmountClassStr;
                var secondComponentClass = this.props.showSecondary ? this.props.onMountClassStr : this.props.onUnmountClassStr;
                return (React.createElement("div", { className: this.props.customClassStr },
                    React.createElement("div", { className: initialComponentClass }, this.props.initialComponent),
                    React.createElement("div", { className: secondComponentClass }, this.props.secondaryComponent)));
            }
        });
        return ReactTransitionBetweenComponents;
    }(React.Component));
    exports.ReactTransitionBetweenComponents = ReactTransitionBetweenComponents;
    var MathJaxText = (function (_super) {
        __extends(MathJaxText, _super);
        function MathJaxText() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            Object.defineProperty(_this, "elementRef", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: React.createRef()
            });
            return _this;
        }
        Object.defineProperty(MathJaxText.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a = this.props, dangerousText = _a.dangerousText, as = _a.as, props = __rest(_a, ["dangerousText", "as"]);
                if (as == "div") {
                    return React.createElement("div", __assign({}, props, { ref: this.elementRef, dangerouslySetInnerHTML: { __html: dangerousText } }));
                }
                if (as == "li") {
                    return React.createElement("li", __assign({}, props, { ref: this.elementRef, dangerouslySetInnerHTML: { __html: dangerousText } }));
                }
                if (as == "span") {
                    return React.createElement("span", __assign({}, props, { ref: this.elementRef, dangerouslySetInnerHTML: { __html: dangerousText } }));
                }
                if (as == "td") {
                    return React.createElement("td", __assign({}, props, { ref: this.elementRef, dangerouslySetInnerHTML: { __html: dangerousText } }));
                }
                if (as == "th") {
                    return React.createElement("th", __assign({}, props, { ref: this.elementRef, dangerouslySetInnerHTML: { __html: dangerousText } }));
                }
                console.warn("unexpected MathJax element type=" + as + ". you must add support for it.");
                return null;
            }
        });
        Object.defineProperty(MathJaxText.prototype, "componentDidMount", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.renderMathJaxIfNeeded();
            }
        });
        Object.defineProperty(MathJaxText.prototype, "componentDidUpdate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (prevProps, prevState, snapshot) {
                if (prevProps.dangerousText == this.props.dangerousText) {
                    return;
                }
                this.renderMathJaxIfNeeded();
            }
        });
        Object.defineProperty(MathJaxText.prototype, "renderMathJaxIfNeeded", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var text = this.props.dangerousText;
                if (text == null || !containsMathJax(text) || this.elementRef.current == null) {
                    return;
                }
                renderMathJax(this.elementRef);
            }
        });
        return MathJaxText;
    }(React.Component));
    exports.MathJaxText = MathJaxText;
    var renderReplace = function (component, targetElement, tagName) {
        var placeHolderContainer = document.createElement(tagName !== null && tagName !== void 0 ? tagName : "div");
        targetElement.parentNode.insertBefore(placeHolderContainer, targetElement.nextSibling);
        targetElement.remove();
        (0, client_1.createRoot)(placeHolderContainer).render(component);
    };
    exports.renderReplace = renderReplace;
    var useMeasureElementSize = function () {
        var _a = (0, react_1.useState)(null), dimensions = _a[0], setDimensions = _a[1];
        var observerRef = (0, react_1.useRef)(null);
        var currentElement = (0, react_1.useRef)(null);
        var measureElementRef = (0, react_1.useCallback)(function (element) {
            var _a, _b;
            if (!element) {
                (_a = observerRef.current) === null || _a === void 0 ? void 0 : _a.disconnect();
                setDimensions(null);
                return;
            }
            if (observerRef.current == null) {
                observerRef.current = new ResizeObserver(function (e) {
                    setDimensions(e[0]);
                });
            }
            if (currentElement.current !== element) {
                (_b = observerRef.current) === null || _b === void 0 ? void 0 : _b.disconnect();
                observerRef.current.observe(element);
                currentElement.current = element;
            }
        }, []);
        return { dimensions: dimensions, measureElementRef: measureElementRef };
    };
    exports.useMeasureElementSize = useMeasureElementSize;
    var extractStudyHTMLAttributes = function (props) {
        var studyProps = {};
        if (props == null) {
            return studyProps;
        }
        for (var key in props) {
            if (key.startsWith("data-")) {
                studyProps[key] = props[key];
            }
        }
        if (props["test-id"]) {
            studyProps["test-id"] = props["test-id"];
        }
        return studyProps;
    };
    exports.extractStudyHTMLAttributes = extractStudyHTMLAttributes;
});

//# sourceMappingURL=react-study-helpers.js.map

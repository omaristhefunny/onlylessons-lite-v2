var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
define(["require", "exports", "lib/axios", "react", "react", "react-utils/react-study-helpers", "compatibility/polyfill/element-get-attribute-names", "compatibility/promise-polyfill"], function (require, exports, axios_1, React, react_1, react_study_helpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InlineSvg = exports.SimpleSvgView = exports.service = void 0;
    exports.replaceFillAndStrokeWithCurrentColor = replaceFillAndStrokeWithCurrentColor;
    exports.removeExplicitDimensions = removeExplicitDimensions;
    exports.useCachedSvgClone = useCachedSvgClone;
    var cloneCount = 0;
    function adjustIds(svg) {
        var clone = cloneCount++;
        var toManip = svg.querySelectorAll("[id]");
        var manips = new Set();
        toManip.forEach(function (e) {
            var newId = e.getAttribute("id") + "-" + clone;
            manips.add({
                from: new RegExp(String.raw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["(?<=[(,]s*|^)#", "(?=s*[),]|$)"], ["(?<=[\\(,]\\s*|^)#", "(?=\\s*[\\),]|$)"])), e.getAttribute("id"))),
                to: "#" + newId
            });
            e.id = newId;
        });
        svg.querySelectorAll("[href]").forEach(function (e) {
            manips.forEach(function (manip) {
                e.setAttribute("href", (e.getAttribute("href").replace(manip.from, manip.to)));
            });
        });
        svg.querySelectorAll("[mask]").forEach(function (e) {
            manips.forEach(function (manip) {
                e.setAttribute("mask", (e.getAttribute("mask").replace(manip.from, manip.to)));
            });
        });
        svg.querySelectorAll("[stroke]").forEach(function (e) {
            manips.forEach(function (manip) {
                e.setAttribute("stroke", (e.getAttribute("stroke").replace(manip.from, manip.to)));
            });
        });
        svg.querySelectorAll("[fill]").forEach(function (e) {
            manips.forEach(function (fill) {
                e.setAttribute("fill", (e.getAttribute("fill").replace(fill.from, fill.to)));
            });
        });
        return svg;
    }
    var FetchSvgService = (function () {
        function FetchSvgService() {
            Object.defineProperty(this, "parser", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: new DOMParser()
            });
            Object.defineProperty(this, "svgCache", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
        }
        Object.defineProperty(FetchSvgService.prototype, "fetchSvg", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (url) {
                var _this = this;
                if (!this.svgCache[url]) {
                    this.svgCache[url] = axios_1.default.get(url).then(function (response) {
                        var svgDocument = _this.parser.parseFromString(response.data, "image/svg+xml");
                        return svgDocument.querySelector("svg");
                    });
                }
                return this.svgCache[url].then(function (svg) { return adjustIds(svg.cloneNode(true)); });
            }
        });
        return FetchSvgService;
    }());
    exports.service = new FetchSvgService();
    var SimpleSvgView = (function (_super) {
        __extends(SimpleSvgView, _super);
        function SimpleSvgView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SimpleSvgView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var svgProps = {
                    src: this.props.src,
                    className: this.props.className,
                    onSvgWillRender: function (svg) {
                        if (_this.props.removeExplicitColor) {
                            replaceFillAndStrokeWithCurrentColor(svg);
                        }
                        if (_this.props.removeExplicitDimensions) {
                            removeExplicitDimensions(svg);
                        }
                    }
                };
                return React.createElement(InlineSvg, __assign({}, svgProps, { ref: null }));
            }
        });
        Object.defineProperty(SimpleSvgView, "defaultProps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                removeExplicitColor: true,
                removeExplicitDimensions: true,
            }
        });
        return SimpleSvgView;
    }(React.Component));
    exports.SimpleSvgView = SimpleSvgView;
    var EmptySvg = function (props) { return React.createElement("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1 1" }, props)); };
    var InlineSvg = (function (_super) {
        __extends(InlineSvg, _super);
        function InlineSvg(props) {
            var _this = _super.call(this, props) || this;
            Object.defineProperty(_this, "currentPromise", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: Promise.resolve(null)
            });
            Object.defineProperty(_this, "isMounted", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            _this.state = { svg: undefined };
            return _this;
        }
        Object.defineProperty(InlineSvg.prototype, "componentDidMount", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.isMounted = true;
                this.loadSvg(this.props.src);
            }
        });
        Object.defineProperty(InlineSvg.prototype, "componentDidUpdate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (prevProps, prevState) {
                if (prevProps.src != this.props.src) {
                    this.loadSvg(this.props.src);
                }
            }
        });
        Object.defineProperty(InlineSvg.prototype, "loadSvg", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (newSrc) {
                var _this = this;
                this.currentPromise = this.currentPromise
                    .then(function () { return exports.service.fetchSvg(newSrc); })
                    .then(function (svg) { return _this.isMounted && _this.setState({ svg: svg }); });
            }
        });
        Object.defineProperty(InlineSvg.prototype, "componentWillUnmount", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.isMounted = false;
            }
        });
        Object.defineProperty(InlineSvg.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var svg = this.state.svg;
                var _a = this.props, src = _a.src, onSvgWillRender = _a.onSvgWillRender, overrideAttributes = __rest(_a, ["src", "onSvgWillRender"]);
                if (!svg) {
                    if (overrideAttributes.height == null && overrideAttributes.width == null) {
                        if (src.endsWith("-20.svg")) {
                            overrideAttributes.height = "20px";
                            overrideAttributes.width = "20px";
                        }
                        else if (src.endsWith("-24.svg")) {
                            overrideAttributes.height = "24px";
                            overrideAttributes.width = "24px";
                        }
                        else if (src.endsWith("-40.svg")) {
                            overrideAttributes.height = "40px";
                            overrideAttributes.width = "40px";
                        }
                    }
                    return React.createElement(EmptySvg, __assign({}, overrideAttributes));
                }
                if (onSvgWillRender) {
                    svg = svg.cloneNode(true);
                    onSvgWillRender(svg);
                }
                var attributes = {};
                attributes["data-src"] = this.props.src;
                for (var _i = 0, _b = svg.getAttributeNames(); _i < _b.length; _i++) {
                    var attributeName = _b[_i];
                    var jsxAttributeName = (0, react_study_helpers_1.replaceDelimiterWithCamelCase)(attributeName, ":");
                    if (jsxAttributeName === "stroke-width") {
                        jsxAttributeName = (0, react_study_helpers_1.replaceDelimiterWithCamelCase)(jsxAttributeName, "-");
                    }
                    if (jsxAttributeName === "style") {
                        attributes["style"] = {};
                        for (var _c = 0, _d = svg.getAttribute("style").split(/;/); _c < _d.length; _c++) {
                            var rule = _d[_c];
                            var firstColonIndex = rule.indexOf(":");
                            var propertyValue = rule.slice(firstColonIndex + 1).trim();
                            var htmlPropertyName = rule.slice(0, firstColonIndex).trim();
                            var reactPropertyName = htmlPropertyName;
                            if (!rule.startsWith("--")) {
                                reactPropertyName = (0, react_study_helpers_1.replaceDelimiterWithCamelCase)(htmlPropertyName, "-");
                            }
                            attributes["style"][reactPropertyName] = propertyValue;
                        }
                    }
                    else {
                        attributes[jsxAttributeName] = svg.getAttribute(attributeName);
                    }
                }
                overrideAttributes && Object.keys(overrideAttributes).forEach(function (key) { return attributes[key] = overrideAttributes[key]; });
                return React.createElement("svg", __assign({}, attributes, { dangerouslySetInnerHTML: { __html: svg.innerHTML } }));
            }
        });
        return InlineSvg;
    }(React.Component));
    exports.InlineSvg = InlineSvg;
    var TRANSPARENT_COLOR_KEYWORDS = ["none", "transparent"];
    function replaceAttributeWithCurrentColor(el, attributeName) {
        var value = el.getAttribute(attributeName);
        if (value && TRANSPARENT_COLOR_KEYWORDS.indexOf(value.toLowerCase()) === -1) {
            el.setAttribute(attributeName, "currentColor");
        }
    }
    function getSelfAndDescendantsMatchingSelector(element, selector) {
        var matchingElements = Array.prototype.slice.apply(element.querySelectorAll(selector));
        var matches = element.matches ? element.matches(selector) : element.msMatchesSelector(selector);
        if (matches) {
            matchingElements.push(element);
        }
        return matchingElements;
    }
    function replaceFillAndStrokeWithCurrentColor(svg) {
        var selfAndDescendantsMatchingElements = getSelfAndDescendantsMatchingSelector(svg, "[stroke], [fill]");
        if (selfAndDescendantsMatchingElements.length > 0) {
            selfAndDescendantsMatchingElements.forEach(function (el) {
                replaceAttributeWithCurrentColor(el, "stroke");
                replaceAttributeWithCurrentColor(el, "fill");
            });
        }
        else {
            svg.setAttribute("fill", "currentColor");
        }
    }
    function removeExplicitDimensions(svg) {
        svg.removeAttribute("height");
        svg.removeAttribute("width");
    }
    function useCachedSvgClone(path) {
        var _a = (0, react_1.useState)(null), fetched = _a[0], setFetched = _a[1];
        (0, react_1.useEffect)(function () {
            exports.service.fetchSvg(path).then(function (svg) {
                setFetched(svg);
            });
        }, []);
        return fetched;
    }
    var templateObject_1;
});

//# sourceMappingURL=InlineSvgComponents.js.map

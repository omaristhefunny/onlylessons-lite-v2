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
define(["require", "exports", "react", "react", "util/InlineSvgComponents", "@study-com/react-utils"], function (require, exports, React, react_1, InlineSvgComponents_1, react_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EurekaButton = exports.EurekaButtonSize = exports.EurekaButtonShape = exports.EurekaButtonType = void 0;
    var useMeasureElementLastSize = function () {
        var _a = (0, react_1.useState)(null), dimensions = _a[0], setDimensions = _a[1];
        var observerRef = (0, react_1.useRef)(null);
        var currentElement = (0, react_1.useRef)(null);
        var measureElementRef = (0, react_1.useCallback)(function (element) {
            var _a, _b;
            if (!element) {
                (_a = observerRef.current) === null || _a === void 0 ? void 0 : _a.disconnect();
                return;
            }
            if (observerRef.current == null) {
                observerRef.current = new ResizeObserver(function (e) {
                    if (e[0].target.clientHeight === 0 || e[0].target.clientWidth === 0) {
                        return;
                    }
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
    var EurekaButtonType;
    (function (EurekaButtonType) {
        EurekaButtonType["PRIMARY"] = "PRIMARY";
        EurekaButtonType["SECONDARY"] = "SECONDARY";
        EurekaButtonType["TERTIARY"] = "TERTIARY";
        EurekaButtonType["TERTIARY_LINK"] = "TERTIARY_LINK";
        EurekaButtonType["MANGO"] = "MANGO";
    })(EurekaButtonType || (exports.EurekaButtonType = EurekaButtonType = {}));
    var EurekaButtonShape;
    (function (EurekaButtonShape) {
        EurekaButtonShape["BUTTON"] = "BUTTON";
        EurekaButtonShape["CIRCLE"] = "CIRCLE";
        EurekaButtonShape["PILL"] = "PILL";
    })(EurekaButtonShape || (exports.EurekaButtonShape = EurekaButtonShape = {}));
    var EurekaButtonSize;
    (function (EurekaButtonSize) {
        EurekaButtonSize["SMALL"] = "SMALL";
        EurekaButtonSize["LARGE"] = "LARGE";
    })(EurekaButtonSize || (exports.EurekaButtonSize = EurekaButtonSize = {}));
    exports.EurekaButton = React.forwardRef(function (props, forwardedRef) {
        var _a, _b, _c;
        var _d = props.as, as = _d === void 0 ? "button" : _d, _e = props.buttonShape, buttonShape = _e === void 0 ? EurekaButtonShape.BUTTON : _e, _f = props.buttonType, buttonType = _f === void 0 ? EurekaButtonType.PRIMARY : _f, _g = props.buttonSize, buttonSize = _g === void 0 ? EurekaButtonSize.LARGE : _g, children = props.children, className = props.className, isLoading = props.isLoading, buttonProps = __rest(props, ["as", "buttonShape", "buttonType", "buttonSize", "children", "className", "isLoading"]);
        var _h = useMeasureElementLastSize(), dimensions = _h.dimensions, measureElementRef = _h.measureElementRef;
        var combinedRef = (0, react_utils_1.useCombinedRef)(forwardedRef, measureElementRef);
        var classNames = ["eureka-button"];
        if (buttonType === EurekaButtonType.PRIMARY) {
            classNames.push("eureka-button--primary");
        }
        else if (buttonType === EurekaButtonType.SECONDARY) {
            classNames.push("eureka-button--secondary");
        }
        else if (buttonType === EurekaButtonType.TERTIARY) {
            classNames.push("eureka-button--tertiary");
        }
        else if (buttonType === EurekaButtonType.TERTIARY_LINK) {
            classNames.push("eureka-button--tertiary", "eureka-button--tertiary-link");
        }
        else if (buttonType === EurekaButtonType.MANGO) {
            classNames.push("eureka-button--mango");
        }
        if (buttonShape === EurekaButtonShape.PILL) {
            classNames.push("eureka-button--pill");
        }
        else if (buttonShape === EurekaButtonShape.CIRCLE) {
            classNames.push("eureka-button--circle");
        }
        if (buttonSize === EurekaButtonSize.SMALL) {
            classNames.push("eureka-button--small");
        }
        if (className) {
            classNames.push(className);
        }
        if (isLoading) {
            classNames.push("eureka-button--loading");
            var size = (_a = dimensions === null || dimensions === void 0 ? void 0 : dimensions.borderBoxSize) === null || _a === void 0 ? void 0 : _a[0];
            var loadingSpinnerClasses = ["eureka-button__loading-spinner"];
            var renderedProps_1 = __assign({ key: "loadingButton", disabled: true, className: classNames.join(" "), style: { minWidth: (_b = size === null || size === void 0 ? void 0 : size.inlineSize) !== null && _b !== void 0 ? _b : "auto", height: (_c = size === null || size === void 0 ? void 0 : size.blockSize) !== null && _c !== void 0 ? _c : "auto" } }, buttonProps);
            var loadingChild = React.createElement(InlineSvgComponents_1.InlineSvg, { className: loadingSpinnerClasses.join(" "), src: "/images/reDesign/svg/white/spinner.svg" });
            return React.createElement(as, renderedProps_1, loadingChild);
        }
        var renderedProps = __assign({ key: "button", ref: combinedRef, className: classNames.join(" ") }, buttonProps);
        return React.createElement(as, renderedProps, children);
    });
});

//# sourceMappingURL=EurekaButton.js.map

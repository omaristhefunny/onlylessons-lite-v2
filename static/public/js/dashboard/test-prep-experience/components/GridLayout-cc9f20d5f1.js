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
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GridLayout = void 0;
    var GridLayout = function (_a) {
        var as = _a.as, children = _a.children, className = _a.className, otherProps = __rest(_a, ["as", "children", "className"]);
        var ElementType = as ? as : "div";
        var classNames = ["ds-grid-layout"];
        if (className) {
            classNames.push(className);
        }
        return React.createElement(ElementType, __assign({ className: classNames.join(" ") }, otherProps), children);
    };
    exports.GridLayout = GridLayout;
});

//# sourceMappingURL=GridLayout.js.map

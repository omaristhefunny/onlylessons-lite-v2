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
define(["require", "exports", "mobx-react", "react", "react-utils/react-study-helpers", "util/InlineSvgComponents"], function (require, exports, mobx_react_1, React, react_study_helpers_1, InlineSvgComponents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EurekaRadioButton = void 0;
    exports.EurekaRadioButton = (0, mobx_react_1.observer)(function (props) {
        var className = props.className, children = props.children, labelClass = props.labelClass, labelCname = props.labelCname, _a = props.size, size = _a === void 0 ? 24 : _a, inputProps = __rest(props, ["className", "children", "labelClass", "labelCname", "size"]);
        var inputClasses = ["eureka-input__hide"];
        if (className) {
            inputClasses.push(className);
        }
        var labelClasses = ["eureka-radio-input__container", "eureka-input__container"];
        if (!!labelClass) {
            labelClasses.push(labelClass);
        }
        if (inputProps.disabled) {
            labelClasses.push("eureka-input__container--disabled");
        }
        var dataAndTestProps = (0, react_study_helpers_1.extractStudyHTMLAttributes)(props);
        if (!dataAndTestProps["test-id"] && labelCname) {
            dataAndTestProps["test-id"] = labelCname;
        }
        if (!dataAndTestProps["data-cname"] && labelCname) {
            dataAndTestProps["data-cname"] = labelCname;
        }
        var svgContainerClasses = ["eureka-input__icon-container"];
        return React.createElement("label", __assign({ className: labelClasses.join(" ") }, dataAndTestProps),
            React.createElement("input", __assign({ className: inputClasses.join(" "), type: "radio" }, inputProps)),
            React.createElement("div", { className: svgContainerClasses.join(" ") }, inputProps.checked ?
                React.createElement(InlineSvgComponents_1.InlineSvg, { className: "eureka-input__icon icon-default__filled svg-".concat(size), src: "/images/icons/material/icon-radio-filled-".concat(size, ".svg"), "test-id": "".concat(inputProps["test-id"], "_svg"), "data-extra": inputProps.value })
                :
                    React.createElement(InlineSvgComponents_1.InlineSvg, { className: "eureka-input__icon icon-default__empty svg-".concat(size), src: "/images/icons/material/icon-radio-empty-".concat(size, ".svg"), "test-id": "".concat(inputProps["test-id"], "_svg"), "data-extra": inputProps.value })),
            children && React.createElement("span", { className: "eureka-input__text" }, children));
    });
});

//# sourceMappingURL=EurekaRadioButton.js.map

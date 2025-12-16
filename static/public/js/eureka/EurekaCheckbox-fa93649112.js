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
define(["require", "exports", "react-utils/react-study-helpers", "util/InlineSvgComponents", "react", "mobx-react"], function (require, exports, react_study_helpers_1, InlineSvgComponents_1, React, mobx_react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EurekaCheckbox = void 0;
    exports.EurekaCheckbox = (0, mobx_react_1.observer)(function (props) {
        var _a;
        var children = props.children, className = props.className, _b = props.size, size = _b === void 0 ? 24 : _b, labelClass = props.labelClass, labelCname = props.labelCname, indeterminate = props.indeterminate, testId = props["test-id"], dataCname = props["data-cname"], inputProps = __rest(props, ["children", "className", "size", "labelClass", "labelCname", "indeterminate", "test-id", "data-cname"]);
        var dataAndTestProps = (0, react_study_helpers_1.extractStudyHTMLAttributes)(props);
        if (!dataAndTestProps["test-id"] && labelCname) {
            dataAndTestProps["test-id"] = labelCname;
        }
        if (!dataAndTestProps["data-cname"] && labelCname) {
            dataAndTestProps["data-cname"] = labelCname;
        }
        var inputClasses = ["eureka-input__hide"];
        if (className) {
            inputClasses.push(className);
        }
        var labelClasses = ["checkbox-input__container", "eureka-input__container"];
        if (!!labelClass) {
            labelClasses.push(labelClass);
        }
        if (inputProps.disabled) {
            labelClasses.push("eureka-input__container--disabled", "checkbox-input__container--disabled");
        }
        dataAndTestProps["data-test-disabled"] = (_a = inputProps.disabled) !== null && _a !== void 0 ? _a : false;
        var svgClassNames = ["eureka-input__icon", "svg-".concat(size)];
        var svgSrc;
        if (indeterminate) {
            svgClassNames.push("icon-default__filled");
            svgSrc = "/images/icons/material/icon-checkbox-mixed-".concat(size, ".svg");
            dataAndTestProps["data-test-state"] = "MIXED";
        }
        else if (inputProps.checked) {
            svgClassNames.push("icon-default__filled");
            svgSrc = "/images/icons/material/icon-checkbox-filled-".concat(size, ".svg");
            dataAndTestProps["data-test-state"] = "CHECKED";
        }
        else {
            svgClassNames.push("icon-default__empty");
            svgSrc = "/images/icons/material/icon-checkbox-empty-".concat(size, ".svg");
            dataAndTestProps["data-test-state"] = "EMPTY";
        }
        return React.createElement("label", __assign({ className: labelClasses.join(" ") }, dataAndTestProps),
            React.createElement("input", __assign({ className: inputClasses.join(" "), type: "checkbox" }, inputProps)),
            React.createElement(InlineSvgComponents_1.InlineSvg, { className: svgClassNames.join(" "), src: svgSrc, "test-id": "".concat(testId, "_checkbox_svg"), "data-extra": inputProps.value }),
            children && React.createElement("span", { className: "eureka-input__text" }, children));
    });
});

//# sourceMappingURL=EurekaCheckbox.js.map

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
define(["require", "exports", "mobx-react", "react", "react", "testPrep/TestPrepConstants", "util/InlineSvgComponents", "moment", "lib/react-bootstrap", "mobx"], function (require, exports, mobx_react_1, react_1, React, TestPrepConstants_1, InlineSvgComponents_1, moment, react_bootstrap_1, mobx_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EurekaDatePicker = void 0;
    exports.EurekaDatePicker = (0, mobx_react_1.observer)(function (props) {
        var _a, _b;
        var dateChangeCallback = props.dateChangeCallback, dateValidationCallback = props.dateValidationCallback, value = props.value, invalid = props.invalid, disabled = props.disabled, hideTimeframeToggle = props.hideTimeframeToggle, inputProps = __rest(props, ["dateChangeCallback", "dateValidationCallback", "value", "invalid", "disabled", "hideTimeframeToggle"]);
        var _c = React.useState(value), date = _c[0], setDate = _c[1];
        var _d = React.useState(TestPrepConstants_1.EXAM_WHEN_OPTIONS.some(function (option) { return option.value == value; })), showTimeframeInput = _d[0], setShowTimeframeInput = _d[1];
        (0, react_1.useEffect)(function () {
            setDate(value);
        }, [value]);
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        var getFormattedDateStr = function (dateStr) {
            return moment(dateStr).format('MMMM D, YYYY');
        };
        var dateChange = function (value) {
            setDate(value);
            dateChangeCallback(value);
            if (dateValidationCallback) {
                dateValidationCallback();
            }
        };
        var toggleShowTimeframeInput = function () {
            setShowTimeframeInput(!showTimeframeInput);
            setDate(null);
            dateChangeCallback(null);
        };
        var dateInputClasses = ["eureka-date-input"];
        if (isFirefox) {
            dateInputClasses.push("eureka-date-input--firefox");
        }
        if (invalid) {
            dateInputClasses.push("eureka-input__invalid");
        }
        return React.createElement(React.Fragment, null,
            !showTimeframeInput && React.createElement("label", { className: "eureka-calendar-input__container" },
                !isFirefox && React.createElement(React.Fragment, null,
                    React.createElement(InlineSvgComponents_1.InlineSvg, { className: "eureka-date-input__icon icon-default__empty svg-20", src: "/images/icons/material/icon-calendar-20.svg" }),
                    !date && React.createElement("span", { className: "eureka-date-input__placeholder eureka-date-input__text" }, "Select date"),
                    date && React.createElement("span", { className: "eureka-date-input__selected-date eureka-date-input__text" }, getFormattedDateStr(date))),
                React.createElement("input", __assign({ className: dateInputClasses.join(" "), type: "date", "data-cname": "date_input_calendar_input", "test-id": "date_input_calendar_input", onChange: function (e) { return dateChange(e.target.value); }, disabled: disabled, value: date }, inputProps))),
            showTimeframeInput && React.createElement("div", { className: "eureka-select-input-container" },
                React.createElement(react_bootstrap_1.Dropdown, null,
                    React.createElement(react_bootstrap_1.Dropdown.Toggle, { className: "eureka-select-dropdown\n\t\t\t\t".concat(date !== null && date !== void 0 ? date : "eureka-select-dropdown__unselected", "\n\t\t\t\t").concat(invalid && "eureka-select-dropdown__invalid"), "data-cname": "date_input_timeframe_select", "test-id": "date_input_timeframe_select", disabled: disabled }, (_b = (_a = TestPrepConstants_1.EXAM_WHEN_OPTIONS.find(function (option) { return option.value == date; })) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : "Select an estimate"),
                    React.createElement(react_bootstrap_1.Dropdown.Menu, null, TestPrepConstants_1.EXAM_WHEN_OPTIONS.map(function (_a) {
                        var value = _a.value, text = _a.text;
                        return React.createElement(react_bootstrap_1.Dropdown.Item, { onClick: (0, mobx_1.action)(function () { return dateChange(value); }), key: value, "date-cname": "date_input_timeframe_option_" + value, "test-id": "date_input_timeframe_option_" + value }, text);
                    }))),
                React.createElement(InlineSvgComponents_1.InlineSvg, { className: "eureka-select-input__icon svg-20", src: "/images/icons/material/icon-caret-20.svg" })),
            !hideTimeframeToggle && React.createElement("span", { className: "eureka-show-timeframe__toggle", onClick: function () { return toggleShowTimeframeInput(); }, "data-cname": "date_input_select", "test-id": "date_input_select" }, showTimeframeInput ? "Select a date instead" : "Select an estimated date"));
    });
});

//# sourceMappingURL=EurekaDatePicker.js.map

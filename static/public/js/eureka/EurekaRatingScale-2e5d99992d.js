define(["require", "exports", "mobx-react", "react"], function (require, exports, mobx_react_1, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EurekaRatingScale = void 0;
    var RatingScaleButton = (0, mobx_react_1.observer)(function (props) {
        var onClickCallback = props.onClickCallback, setNumSelected = props.setNumSelected, numSelected = props.numSelected, num = props.num, name = props.name, disabled = props.disabled;
        var cname = name + "_rating_scale_button";
        var ratingScaleButtonClassNames = ["eureka-rating-scale__button"];
        if (numSelected === num) {
            ratingScaleButtonClassNames.push("eureka-rating-scale__button-selected");
        }
        return React.createElement("input", { type: "button", value: num, "test-id": cname, "data-cname": cname, "data-extra": num, className: ratingScaleButtonClassNames.join(" "), disabled: disabled, onClick: function () {
                setNumSelected(num);
                onClickCallback(num);
            } });
    });
    exports.EurekaRatingScale = (0, mobx_react_1.observer)(function (props) {
        var numButtons = props.numButtons, startingIndex = props.startingIndex, desktopHelperText = props.desktopHelperText, mobileHelperText = props.mobileHelperText, onChangeCallback = props.onChangeCallback, name = props.name, value = props.value, disabled = props.disabled;
        var _a = React.useState(value), numSelected = _a[0], setNumSelected = _a[1];
        return React.createElement("div", { className: "eureka-rating-scale" },
            React.createElement("div", { className: "eureka-rating-scale__container", "data-cname": "exam_confidence", "test-id": "exam_confidence" }, Array.from(Array(numButtons).keys()).map(function (index) { return (React.createElement(RatingScaleButton, { onClickCallback: onChangeCallback, setNumSelected: setNumSelected, numSelected: numSelected, num: startingIndex != null ? startingIndex + index : index + 1, key: "rating-scale-button__".concat(index), name: name, disabled: disabled })); })),
            React.createElement("div", { className: "eureka-rating-scale__text-container" },
                desktopHelperText.map(function (desktopHelperText, index) { return React.createElement("span", { className: "eureka-rating-scale__text eureka-rating-scale__desktop-text", key: "rating-scale-desktop-text__".concat(index) }, desktopHelperText); }),
                mobileHelperText.map(function (mobileHelperText, index) { return React.createElement("span", { className: "eureka-rating-scale__text eureka-rating-scale__mobile-text", key: "rating-scale-mobile-text__".concat(index) }, mobileHelperText); })));
    });
});

//# sourceMappingURL=EurekaRatingScale.js.map

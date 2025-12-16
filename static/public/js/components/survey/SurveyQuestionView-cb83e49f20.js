define(["require", "exports", "eureka/EurekaDropdown", "mobx", "react", "mobx-react", "eureka/EurekaButton"], function (require, exports, EurekaDropdown_1, mobx_1, React, mobx_react_1, EurekaButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextInputQuestionView = (0, mobx_react_1.observer)(function (_a) {
        var store = _a.store, question = _a.question;
        return (React.createElement("div", { className: "survey-body-content" },
            React.createElement("div", { className: "prompt" }, question.prompt),
            React.createElement("div", { className: "response" },
                React.createElement("textarea", { className: "text-input-response", placeholder: "Type your answer here", onChange: function (e) { return store.updateResponseText(e.target.value); } })),
            React.createElement(BottomActions, { store: store, submitDisabled: !store.responseTextHolder, submitAction: function () { return store.submitTextResponse(); } })));
    });
    var NumberScaleQuestionView = (0, mobx_react_1.observer)(function (_a) {
        var store = _a.store, question = _a.question;
        var sliderElements = [];
        var _loop_1 = function (i) {
            sliderElements.push(React.createElement("div", { key: "number-scale-option-".concat(i), className: "number-scale-option survey-button-option", onClick: function () { return store.numberOptionSelected(i); } }, i));
        };
        for (var i = 1; i <= question.maxValue; i++) {
            _loop_1(i);
        }
        return (React.createElement("div", { className: "survey-body-content" },
            React.createElement("div", { className: "prompt" }, question.prompt),
            React.createElement("div", { className: "response" },
                React.createElement("div", { className: "number-scale" }, sliderElements),
                React.createElement("div", { className: "labels" },
                    React.createElement("div", { className: "left-label" }, question.leftLabel),
                    React.createElement("div", { className: "right-label" }, question.rightLabel))),
            React.createElement("div", { className: "bottom-actions" },
                store.isCurrentQuestionFirst() ? React.createElement("div", null) : (React.createElement("a", { className: "back-link", onClick: function () { return store.goToPreviousQuestion(); } }, "Back")),
                React.createElement("div", null))));
    });
    var LabeledButtonQuestionView = (0, mobx_react_1.observer)(function (_a) {
        var store = _a.store, question = _a.question;
        var buttonElements = [];
        question.buttonLabels.forEach(function (label, i) {
            buttonElements.push(React.createElement("div", { key: "labeled-button-option-".concat(i), className: "labeled-button-option survey-button-option", onClick: function () { return store.submitStringResponse(label); } }, label));
        });
        return (React.createElement("div", { className: "survey-body-content" },
            React.createElement("div", { className: "prompt" }, question.prompt),
            React.createElement("div", { className: "response" },
                React.createElement("div", { className: "labeled-buttons" }, buttonElements)),
            React.createElement("div", { className: "bottom-actions" },
                store.isCurrentQuestionFirst() ? React.createElement("div", null) : (React.createElement("a", { className: "back-link", onClick: function () { return store.goToPreviousQuestion(); } }, "Back")),
                React.createElement("div", null))));
    });
    var DropdownQuestionView = (0, mobx_react_1.observer)(function (_a) {
        var store = _a.store, question = _a.question;
        var _b = React.useState(""), specificationText = _b[0], setSpecificationText = _b[1];
        var showSpecificationInput = question.specificationTrigger != null && store.responseTextHolder === question.specificationTrigger;
        var buildStringResponse = function () {
            if (showSpecificationInput && (specificationText === null || specificationText === void 0 ? void 0 : specificationText.length) > 0) {
                return specificationText;
            }
            return store.responseTextHolder;
        };
        return React.createElement("div", { className: "survey-body-content" },
            React.createElement("div", { className: "prompt" }, question.prompt),
            React.createElement("div", { className: "response" },
                React.createElement(EurekaDropdown_1.EurekaDropdown, { value: store.responseTextHolder, items: question.optionList, onChange: (0, mobx_1.action)(function (option) { return store.responseTextHolder = option; }), placeholder: "Select an option" }),
                showSpecificationInput && React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "specification-prompt" }, "Optional, please specify:"),
                    React.createElement("input", { type: "text", className: "specification-prompt__input eureka-input__text-medium", placeholder: "Enter details here", value: specificationText, onChange: function (e) { return setSpecificationText(e.target.value); } }))),
            React.createElement(BottomActions, { store: store, submitDisabled: !store.responseTextHolder, submitAction: function () { return store.submitStringResponse(buildStringResponse()); } }));
    });
    var MultiSelectDropdownQuestionView = (0, mobx_react_1.observer)(function (_a) {
        var store = _a.store, question = _a.question;
        var _b = React.useState([]), selectedOptions = _b[0], setSelectedOptions = _b[1];
        var _c = React.useState(""), specificationText = _c[0], setSpecificationText = _c[1];
        var showSpecificationInput = question.specificationTrigger != null && selectedOptions.includes(question.specificationTrigger);
        var buildStringResponse = function () {
            if (showSpecificationInput && (specificationText === null || specificationText === void 0 ? void 0 : specificationText.length) > 0) {
                return selectedOptions.join(", ") + ", " + specificationText;
            }
            return selectedOptions.join(", ");
        };
        return React.createElement("div", { className: "survey-body-content" },
            React.createElement("div", { className: "prompt" },
                question.prompt,
                React.createElement("br", null),
                "Please select all that apply"),
            React.createElement("div", { className: "response" },
                React.createElement(EurekaDropdown_1.EurekaDropdown, { value: selectedOptions, multiple: true, items: question.optionList, onChange: (0, mobx_1.action)(function (options) { return setSelectedOptions(options); }), placeholder: "Select an option" }),
                showSpecificationInput && React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "specification-prompt" }, "Optional, please specify:"),
                    React.createElement("input", { type: "text", className: "specification-prompt__input eureka-input__text-medium", value: specificationText, placeholder: "Enter details here", onChange: function (e) { return setSpecificationText(e.target.value); } }))),
            React.createElement(BottomActions, { store: store, submitDisabled: !(selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.length), submitAction: function () { return store.submitStringResponse(buildStringResponse()); } }));
    });
    var BottomActions = (0, mobx_react_1.observer)(function (props) {
        var store = props.store, submitDisabled = props.submitDisabled, submitAction = props.submitAction;
        return React.createElement("div", { className: "bottom-actions" },
            store.isCurrentQuestionFirst() ? React.createElement("div", null) : (React.createElement("a", { className: "back-link", onClick: function () { return store.goToPreviousQuestion(); } }, "Back")),
            React.createElement(EurekaButton_1.EurekaButton, { buttonType: EurekaButton_1.EurekaButtonType.PRIMARY, disabled: submitDisabled, onClick: function () { return submitAction(); } }, "Submit"));
    });
    var SurveyQuestionView = (0, mobx_react_1.observer)(function (_a) {
        var store = _a.store, question = _a.question;
        if (question.type === "DROPDOWN") {
            return React.createElement(DropdownQuestionView, { store: store, question: question });
        }
        else if (question.type === "LABELED_BUTTON_SELECT") {
            return React.createElement(LabeledButtonQuestionView, { store: store, question: question });
        }
        else if (question.type === "MULTI_SELECT_DROPDOWN") {
            return React.createElement(MultiSelectDropdownQuestionView, { store: store, question: question });
        }
        else if (question.type === "NUMBER_SCALE_SELECT") {
            return React.createElement(NumberScaleQuestionView, { store: store, question: question });
        }
        else if (question.type === "TEXT_INPUT") {
            return React.createElement(TextInputQuestionView, { store: store, question: question });
        }
        else {
            console.error("unexpected question type for survey question");
            return null;
        }
    });
    exports.default = SurveyQuestionView;
});

//# sourceMappingURL=SurveyQuestionView.js.map

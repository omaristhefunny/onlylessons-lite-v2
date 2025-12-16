define(["require", "exports", "eureka/EurekaModal", "mobx", "mobx-react", "react"], function (require, exports, EurekaModal_1, mobx_1, mobx_react_1, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SurveyModalQuestionView = (0, mobx_react_1.observer)(function (_a) {
        var store = _a.store;
        if (store.currentQuestion.type === "TEXT_INPUT") {
            return React.createElement(SurveyModalTextInputQuestionView, { store: store });
        }
        else {
            console.error("unexpected question type for survey question");
            return null;
        }
    });
    var SurveyModalTextInputQuestionView = (0, mobx_react_1.observer)(function (_a) {
        var _b, _c;
        var store = _a.store;
        return (React.createElement("div", { className: "survey-modal-text-input-question" },
            React.createElement("label", null, (_b = store.currentQuestion) === null || _b === void 0 ? void 0 : _b.prompt),
            React.createElement("textarea", { placeholder: (_c = store.currentQuestion) === null || _c === void 0 ? void 0 : _c.textareaPlaceholderText, onChange: (0, mobx_1.action)(function (e) { return store.responseTextHolder = e.target.value; }), value: store.responseTextHolder, "data-cname": "ux_survey_modal_textarea" })));
    });
    var SurveyModalView = (0, mobx_react_1.observer)(function (_a) {
        var _b, _c;
        var store = _a.store;
        return (React.createElement(EurekaModal_1.EurekaModal, { className: "user-experience-survey-modal", cnameTestIdPrefix: "user_experience_survey", onClose: (0, mobx_1.action)(function () { return store.dismissSurvey(); }), title: (_b = store.surveyTriggerConfig) === null || _b === void 0 ? void 0 : _b.modalHeaderTitle, show: store.showSurvey, submitLabel: (_c = store.surveyTriggerConfig) === null || _c === void 0 ? void 0 : _c.submitButtonText, onSubmit: (0, mobx_1.action)(function () { return store.submitTextResponse(); }), showFooterCancelButton: false, centered: true },
            React.createElement(SurveyModalQuestionView, { store: store })));
    });
    exports.default = SurveyModalView;
});

//# sourceMappingURL=SurveyModalView.js.map

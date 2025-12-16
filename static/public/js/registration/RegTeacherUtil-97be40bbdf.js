define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ASK_SUBJECT_GOALS = void 0;
    exports.shouldAskTeacherSubjectQuestion = shouldAskTeacherSubjectQuestion;
    exports.ASK_SUBJECT_GOALS = ["SUPPLEMENTING", "HOMEWORK", "OTHER", "PROFESSIONAL_DEVELOPMENT"];
    function shouldAskTeacherSubjectQuestion(registrationData) {
        if (registrationData == null) {
            return false;
        }
        return registrationData.userType === "INSTRUCTOR"
            && exports.ASK_SUBJECT_GOALS.indexOf(registrationData.goals) > -1;
    }
});

//# sourceMappingURL=RegTeacherUtil.js.map

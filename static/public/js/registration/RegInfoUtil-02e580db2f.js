define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hasPaidTrialEligibleGoal = hasPaidTrialEligibleGoal;
    function hasPaidTrialEligibleGoal(goal) {
        if (!goal || goal === "") {
            return true;
        }
        var paidTrialEligibleGoals = [
            "HOME_ALL_IN_ONE",
            "HOME_EARN_CREDIT",
            "HOME_SUBJECT",
            "HOME_SUPPLEMENT",
            "HOMEWORK",
            "IMPROVE_GRADES",
            "PROFESSIONAL_DEVELOPMENT",
            "RESEARCH",
            "STUDY",
            "SUPPLEMENTING",
        ];
        return paidTrialEligibleGoals.indexOf(goal) > -1;
    }
});

//# sourceMappingURL=RegInfoUtil.js.map

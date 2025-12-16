define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getActiveVoiceGoalTextForUserType = exports.getGoalText = exports.getGoalsForState = void 0;
    var getGoalsForState = function (registrationData) {
        var goals = [];
        if (registrationData.userType === "STUDENT") {
            goals = [
                "STUDY",
                "EARN_CREDIT",
                "RESEARCH",
                "EXAM_PREP",
                "IMPROVE_GRADES",
                "HOMESCHOOL"
            ];
        }
        else if (registrationData.userType === "INSTRUCTOR" || registrationData.userType === "TUTOR") {
            goals = [
                "SUPPLEMENTING",
                "HOMEWORK",
                "TEACHER_CERTIFICATION",
                "PROFESSIONAL_DEVELOPMENT",
                "HOMESCHOOL"
            ];
        }
        else if (registrationData.userType === "HOMESCHOOLER") {
            goals = [
                "HOME_ALL_IN_ONE",
                "HOME_SUBJECT",
                "HOME_SUPPLEMENT",
                "HOME_EARN_CREDIT"
            ];
        }
        else if (registrationData.userType === "PARENT") {
            goals = [
                "HELPING_CHILD",
                "IMPROVE_CHILD_GRADES",
                "PERSONAL_REVIEW",
                "CHILD_CREDIT_EXAM",
                "FUN",
                "HOMESCHOOL"
            ];
        }
        if (registrationData.userType !== "HOMESCHOOLER") {
            goals.push("OTHER");
        }
        return goals;
    };
    exports.getGoalsForState = getGoalsForState;
    var getGoalText = function (goal) {
        if (goal === "CHILD_CREDIT_EXAM") {
            return "My child is studying for a credit granting exam";
        }
        else if (goal === "EARN_CREDIT") {
            return "Earn college credit";
        }
        else if (goal === "EXAM_PREP") {
            return "Prepare for an exam";
        }
        else if (goal === "FUN") {
            return "Just for fun";
        }
        else if (goal === "HELPING_CHILD") {
            return "Helping my child with a difficult subject";
        }
        else if (goal === "HOME_ALL_IN_ONE") {
            return "All-in-one curriculum";
        }
        else if (goal === "HOME_SUBJECT") {
            return "Complete curriculum for certain subjects";
        }
        else if (goal === "HOME_SUPPLEMENT") {
            return "Supplement my existing curriculum";
        }
        else if (goal === "HOME_EARN_CREDIT") {
            return "College/Dual-credit from home";
        }
        else if (goal === "HOMESCHOOL") {
            return "Homeschool";
        }
        else if (goal === "HOMEWORK") {
            return "Assigning my students material";
        }
        else if (goal === "IMPROVE_CHILD_GRADES") {
            return "Improving my child's grades";
        }
        else if (goal === "IMPROVE_GRADES") {
            return "Improve my grades";
        }
        else if (goal === "PERSONAL_REVIEW") {
            return "Personal review to better assist my child";
        }
        else if (goal === "PROFESSIONAL_DEVELOPMENT") {
            return "Professional development";
        }
        else if (goal === "RESEARCH") {
            return "Research colleges";
        }
        else if (goal === "STUDY") {
            return "Study for class";
        }
        else if (goal === "SUPPLEMENTING") {
            return "Supplementing my in-classroom material";
        }
        else if (goal === "TEACHER_CERTIFICATION") {
            return "Teacher certification exam prep";
        }
        else if (goal === "OTHER") {
            return "Other";
        }
        else if (goal === "TUTORING") {
            return "Get tutoring help";
        }
        else if (goal === "TUTORING_CHILD") {
            return "Get tutoring help for my child";
        }
        return "";
    };
    exports.getGoalText = getGoalText;
    var getActiveVoiceGoalTextForUserType = function (goal, userType) {
        if (goal === "OTHER") {
            return "Find something else";
        }
        else if (goal === "SUPPLEMENTING") {
            return "Supplement my in-classroom material";
        }
        else if (goal === "HOMEWORK") {
            return "Assign my students material";
        }
        else if (goal === "TEACHER_CERTIFICATION") {
            return "Prepare for my teacher certification exam";
        }
        else if (goal === "PROFESSIONAL_DEVELOPMENT") {
            return "Do professional development";
        }
        else if (goal === "HELPING_CHILD") {
            return "Help my child with a difficult subject";
        }
        else if (goal === "PERSONAL_REVIEW") {
            return "Review materials to better assist my child";
        }
        else if (goal === "IMPROVE_CHILD_GRADES") {
            return "Improve my child's grades";
        }
        else if (goal === "CHILD_CREDIT_EXAM") {
            return "Help my child study for a credit granting exam";
        }
        else if (goal === "FUN") {
            return "Have fun";
        }
        else if (goal === "HOMESCHOOL" && userType === "PARENT") {
            return "Homeschool my child";
        }
        else {
            return (0, exports.getGoalText)(goal);
        }
    };
    exports.getActiveVoiceGoalTextForUserType = getActiveVoiceGoalTextForUserType;
});

//# sourceMappingURL=RegUserTypeGoalUtil.js.map

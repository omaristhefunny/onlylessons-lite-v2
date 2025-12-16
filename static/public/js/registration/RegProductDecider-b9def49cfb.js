define(["require", "exports", "@sites-study-com/remspect", "jquery", "util/subdomainUrlUtil"], function (require, exports, remspect, $, subdomainUrlUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.determineProductFromState = determineProductFromState;
    exports.buildRegUrl = buildRegUrl;
    function determineProductFromState(state) {
        var productKey = _determineProductFromState(state);
        return enhanceSelectedProductWithAnnual(productKey, state.currentProductBillingTerm);
    }
    function hasValidProductKeyOverride(state) {
        if (!state.productKeyOverride) {
            return false;
        }
        if (state.productKeyOverride !== "CS_COLLEGE_CONNECT") {
            return true;
        }
        return state.cxPlannedSchoolSupportsCollegeConnect;
    }
    function _determineProductFromState(state) {
        if (hasValidProductKeyOverride(state)) {
            return state.productKeyOverride;
        }
        else if (state.wantsFamilyPlan) {
            if (state.goals === "HOMESCHOOL") {
                return "HOMESCHOOL";
            }
            else if (state.userType === "HOMESCHOOLER") {
                switch (state.goals) {
                    case "HOME_SUPPLEMENT":
                        return getBasicProduct();
                    case "HOME_EARN_CREDIT":
                        return "COLLEGE_ACCELERATOR";
                    default:
                        return "HOMESCHOOL";
                }
            }
            return "PREMIUM";
        }
        else if (state.isSpecificTestPrep) {
            if (state.defaultProductKey) {
                return state.defaultProductKey;
            }
            console.warn("Unexpected state - could not find specific test prep product key");
            return "TEST_PREP_AND_CERTIFICATES";
        }
        else if (state.defaultProductKey) {
            return state.defaultProductKey;
        }
        else if (determineIfUserGetsAnswersPlanFromStudyAnswersPage(state)) {
            return getAnswersProduct();
        }
        else if (state.userType === "HOMESCHOOLER") {
            switch (state.goals) {
                case "HOME_SUPPLEMENT":
                    return getBasicProduct();
                case "HOME_EARN_CREDIT":
                    return "COLLEGE_ACCELERATOR";
                default:
                    return "HOMESCHOOL";
            }
        }
        else if (state.userType === "STUDENT") {
            switch (state.goals) {
                case "STUDY":
                    if (isPremiumProductUri() || state.landedOnCourseExamOrPractice) {
                        return "PREMIUM";
                    }
                    return getBasicProduct();
                case "EXAM_PREP":
                    return "PREMIUM";
                case "IN_CLASS_EXAM":
                    return "PREMIUM";
                case "EARN_CREDIT":
                    return "COLLEGE_ACCELERATOR";
                case "STANDARD_EXAM_PREP":
                    return "TEST_PREP_AND_CERTIFICATES";
                case "HOMESCHOOL":
                    return "HOMESCHOOL";
                case "OTHER":
                    if (isPremiumProductUri() || state.landedOnCourseExamOrPractice) {
                        return "PREMIUM";
                    }
                    return getBasicProduct();
                case "IMPROVE_GRADES":
                    return "PREMIUM";
                case "ONLINE_HOMEWORK_HELP":
                    return "PREMIUM";
                case "TUTORING":
                    return "PREMIUM";
                default:
                    return "PREMIUM";
            }
        }
        else if (state.userType === "PARENT") {
            switch (state.goals) {
                case "HELPING_CHILD":
                    return "PREMIUM";
                case "CHILD_CREDIT_EXAM":
                    return "COLLEGE_ACCELERATOR";
                case "OTHER":
                    return "PREMIUM";
                case "IMPROVE_CHILD_GRADES":
                    return "PREMIUM";
                case "HOMESCHOOL":
                    return "HOMESCHOOL";
                case "DISTANCE_LEARNING":
                    return "HOMESCHOOL";
                case "TUTORING_CHILD":
                    return "PREMIUM";
                default:
                    return "PREMIUM";
            }
        }
        else if (state.userType === "INSTRUCTOR") {
            switch (state.goals) {
                case "TEACHER_CERTIFICATION":
                    return "TEST_PREP_AND_CERTIFICATES";
                case "HOMESCHOOL":
                    return "HOMESCHOOL";
                case "PROFESSIONAL_DEVELOPMENT":
                    return "TEACHER";
                default:
                    return "CLASSROOM_TEACHER";
            }
        }
        else if (state.userType === "TUTOR") {
            switch (state.goals) {
                case "TEACHER_CERTIFICATION":
                    return "TEST_PREP_AND_CERTIFICATES";
                case "HOMESCHOOL":
                    return "HOMESCHOOL";
                case "PROFESSIONAL_DEVELOPMENT":
                    return "TEACHER";
                default:
                    return "CLASSROOM_TEACHER";
            }
        }
        else {
            return "PREMIUM";
        }
    }
    function enhanceSelectedProductWithAnnual(productKey, currentProductBillingTerm) {
        if (currentProductBillingTerm === "ANNUAL") {
            var monthlyToAnnualMap = {};
            monthlyToAnnualMap["CLASSROOM_TEACHER"] = "CLASSROOM_TEACHER_ANNUAL";
            monthlyToAnnualMap["TEACHER"] = "TEACHER_ANNUAL";
            monthlyToAnnualMap["HOMESCHOOL"] = "HOMESCHOOL_ANNUAL";
            return monthlyToAnnualMap[productKey] || productKey;
        }
        return productKey;
    }
    function determineIfUserGetsAnswersPlanFromStudyAnswersPage(state) {
        var isStudyAnswersPage = location.href.indexOf("/explanation/") > -1 || subdomainUrlUtil_1.SubdomainUrlUtil.isRequestToSubdomain("HOMEWORK");
        if (!isStudyAnswersPage) {
            return false;
        }
        if (isPremiumProductUri() || state.landedOnCourseExamOrPractice) {
            return false;
        }
        if (state.goals === "TUTORING_CHILD" || state.goals === "TUTORING") {
            return false;
        }
        return true;
    }
    function getBasicProduct() {
        return "BASIC";
    }
    function getAnswersProduct() {
        if (!remspect.isControl("noAnswersPlan")) {
            return "BASIC";
        }
        return "ANSWERS";
    }
    function isPremiumProductUri() {
        var uris = ["/exam/", "/academy/practice/", "/course/"];
        return uris.some(function (uri) { return window.location.href.indexOf(uri) > -1; });
    }
    function buildRegUrl(state) {
        var host = subdomainUrlUtil_1.SubdomainUrlUtil.getStudyBaseUrl();
        var url = host + "/academy/get-started.html?product=" + state.product;
        var gscElements = $("[gsc]");
        if (gscElements.length > 0) {
            var gsc = gscElements[0].getAttribute("gsc");
            url += "&gsc=" + gsc;
        }
        if (state.couponCode) {
            url += "&couponCode=" + state.couponCode;
        }
        if (state.getFullAccessHeader) {
            url += "&fullAccessHeader=true";
        }
        return url;
    }
});

//# sourceMappingURL=RegProductDecider.js.map

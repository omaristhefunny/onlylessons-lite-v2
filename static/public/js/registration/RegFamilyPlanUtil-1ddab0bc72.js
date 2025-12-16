define(["require", "exports", "registration/RegProductDecider"], function (require, exports, RegProductDecider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shouldAskFamilyPlanQuestion = shouldAskFamilyPlanQuestion;
    exports.isFamilyPlanEligibleProduct = isFamilyPlanEligibleProduct;
    function shouldAskFamilyPlanQuestion(info) {
        if (info == null) {
            return false;
        }
        var possibleProductKey = info.product;
        if (!possibleProductKey) {
            possibleProductKey = RegProductDecider.determineProductFromState(info);
        }
        var hasFamilyPlanCompatibleProduct = isFamilyPlanEligibleProduct(possibleProductKey);
        var hasFamilyPlanCompatibleRegData = info.goals === "HOMESCHOOL";
        return hasFamilyPlanCompatibleRegData && hasFamilyPlanCompatibleProduct;
    }
    function isFamilyPlanEligibleProduct(productKey) {
        return productKey === "HOMESCHOOL"
            || productKey === "HOMESCHOOL_ANNUAL"
            || productKey === "PREMIUM"
            || productKey === "PREMIUM_ANNUAL";
    }
});

//# sourceMappingURL=RegFamilyPlanUtil.js.map

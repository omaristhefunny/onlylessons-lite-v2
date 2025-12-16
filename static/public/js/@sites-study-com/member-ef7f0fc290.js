define(['exports'], (function (exports) { 'use strict';

    exports.CocoonType = void 0;
    (function (CocoonType) {
        CocoonType["AGNOSTIC"] = "AGNOSTIC";
        CocoonType["CX"] = "CX";
        CocoonType["HOMESCHOOL"] = "HOMESCHOOL";
        CocoonType["NONE"] = "NONE";
        CocoonType["TEST_PREP"] = "TEST_PREP";
    })(exports.CocoonType || (exports.CocoonType = {}));
    class MemberInfoUtil {
        static instance() {
            if (!this.__INSTANCE) {
                this.__INSTANCE = new MemberInfoUtil();
            }
            return this.__INSTANCE;
        }
        constructor() {
            var _a, _b;
            Object.defineProperty(this, "memberInfo", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            const info = {};
            const el = (_a = window === null || window === void 0 ? void 0 : window.document) === null || _a === void 0 ? void 0 : _a.querySelector("#memberData");
            if (el) {
                const getNumberAttribute = (qualifiedName) => {
                    let attrValueStr = el.getAttribute(qualifiedName);
                    return parseInt(attrValueStr, 10);
                };
                const getBooleanAttribute = (qualifiedName) => {
                    let attrValueStr = el.getAttribute(qualifiedName);
                    if (!attrValueStr) {
                        return false;
                    }
                    return attrValueStr.toLowerCase() === "true";
                };
                const getNumberArray = (qualifiedName) => {
                    let attrValueStr = el.getAttribute(qualifiedName);
                    if (!attrValueStr) {
                        return [];
                    }
                    return attrValueStr.split(",").map(str => Number(str));
                };
                const memberId = getNumberAttribute("data-member-id");
                info.accountType = el.getAttribute("data-member-account-type");
                info.availableTutorSubjects = ((_b = el.getAttribute("data-available-tutor-subjects")) !== null && _b !== void 0 ? _b : "").split(",");
                info.canvasId = el.getAttribute("data-canvas-id");
                info.cocoon = el.getAttribute("data-cocoon");
                const cocoonTypeStr = el.getAttribute("data-cocoon-type");
                info.cocoonType = (cocoonTypeStr) ? cocoonTypeStr : exports.CocoonType.NONE;
                info.contentBundleIds = getNumberArray("data-content-bundle-ids");
                info.firstName = el.getAttribute("data-member-first-name");
                info.goalKey = el.getAttribute("data-goal-key");
                info.googleUserId = el.getAttribute("data-google-user-id");
                info.hasAccessToTutoringChat = getBooleanAttribute("data-member-has-access-to-tutoring-chat");
                info.hasInstitutionLicense = getBooleanAttribute("data-member-has-institution-license");
                info.institutionId = getNumberAttribute("data-member-institution-id");
                info.institutionName = el.getAttribute("data-member-institution-name");
                info.institutionType = el.getAttribute("data-institution-type");
                info.isAllowSms = getBooleanAttribute("data-is-allow-sms");
                info.isDomestic = getBooleanAttribute("data-is-domestic");
                info.isFamilyAdminActingAsStudent = getBooleanAttribute("data-is-family-admin-acting-as-student");
                info.isFamilyPlanStudent = getBooleanAttribute("data-is-family-plan-student");
                info.isLoggedIn = !isNaN(memberId);
                info.isPaidTrialEligible = getBooleanAttribute("data-is-paid-trial-eligible");
                info.isTestPrep = getBooleanAttribute("data-is-test-prep");
                info.landedOnCourseExamOrPractice = getBooleanAttribute("data-landed-on-course-exam-or-practice");
                info.lastName = el.getAttribute("data-member-last-name");
                info.maxAssignmentDurationInMonths = getNumberAttribute("data-max-assignment-duration");
                info.memberAgeDays = getNumberAttribute("data-member-age-days");
                info.dateCreated = el.getAttribute("data-member-date-created");
                info.emailAddress = el.getAttribute("data-member-email");
                info.memberId = memberId;
                info.oauthConfigProvider = el.getAttribute("data-oauth-config-provider");
                info.paymentProviderStatus = el.getAttribute("data-member-status");
                info.persona = el.getAttribute("data-member-persona");
                info.productId = getNumberAttribute("data-member-product-id");
                info.productKey = el.getAttribute("data-member-product-key");
                info.schoologyId = el.getAttribute("data-schoology-id");
                info.shouldShowLmsCanvas = getBooleanAttribute("data-should-show-lms-canvas");
                info.shouldShowLmsSchoology = getBooleanAttribute("data-should-show-lms-schoology");
                info.stateCodeFromIp = el.getAttribute("data-state-code-from-ip");
                info.taxStatus = el.getAttribute("data-tax-status");
                info.tutoringUpgradableProductIds = getNumberArray("data-tutoring-upgradable-products");
            }
            hydrateMemberInfoDates(info);
            this.memberInfo = info;
        }
        memberHasToDoList() {
            return this.memberInfo.productKey === "TUTORING"
                || this.memberInfo.accountType === "TEST_PREP_PLUS_TUTORING";
        }
    }
    function hydrateMemberInfoDates(info) {
        const dateFields = ["dateCreated"];
        for (const fieldName of dateFields) {
            const originalValue = info[fieldName];
            if (typeof originalValue === "string") {
                const realValue = parseDate(originalValue);
                if (!realValue) {
                    console.warn("Error parsing date for MemberInfo field", fieldName, originalValue);
                }
                info[fieldName] = realValue;
            }
        }
    }
    function parseDate(str) {
        try {
            return new Date(Date.parse(str));
        }
        catch (e) {
            return undefined;
        }
    }
    function useMemberInfo() {
        let info;
        {
            info = MemberInfoUtil.instance().memberInfo;
        }
        return info;
    }

    exports.useMemberInfo = useMemberInfo;

}));
//# sourceMappingURL=member.js.map

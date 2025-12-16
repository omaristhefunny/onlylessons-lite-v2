define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MemberInfoUtil = exports.CocoonType = void 0;
    var CocoonType;
    (function (CocoonType) {
        CocoonType["AGNOSTIC"] = "AGNOSTIC";
        CocoonType["CX"] = "CX";
        CocoonType["HOMESCHOOL"] = "HOMESCHOOL";
        CocoonType["NONE"] = "NONE";
        CocoonType["TEST_PREP"] = "TEST_PREP";
    })(CocoonType || (exports.CocoonType = CocoonType = {}));
    var MemberInfoUtil = (function () {
        function MemberInfoUtil() {
            Object.defineProperty(this, "memberInfo", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.memberInfo = this.buildMemberInfoFromDOM();
        }
        Object.defineProperty(MemberInfoUtil, "instance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.__INSTANCE) {
                    this.__INSTANCE = new MemberInfoUtil();
                }
                return this.__INSTANCE;
            }
        });
        Object.defineProperty(MemberInfoUtil.prototype, "buildMemberInfoFromDOM", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var memberInfo = {};
                var memberDataElement = document.querySelector("#memberData");
                if (memberDataElement) {
                    var memberId = this.getNumberAttribute(memberDataElement, "data-member-id");
                    memberInfo.accountType = memberDataElement.getAttribute("data-member-account-type");
                    memberInfo.availableTutorSubjects = memberDataElement.getAttribute("data-available-tutor-subjects");
                    memberInfo.canvasId = memberDataElement.getAttribute("data-canvas-id");
                    memberInfo.cocoon = memberDataElement.getAttribute("data-cocoon");
                    var cocoonTypeStr = memberDataElement.getAttribute("data-cocoon-type");
                    memberInfo.cocoonType = (cocoonTypeStr) ? cocoonTypeStr : CocoonType.NONE;
                    memberInfo.contentBundleIds = this.getNumberArray(memberDataElement, "data-content-bundle-ids");
                    memberInfo.firstName = memberDataElement.getAttribute("data-member-first-name");
                    memberInfo.goalKey = memberDataElement.getAttribute("data-goal-key");
                    memberInfo.googleUserId = memberDataElement.getAttribute("data-google-user-id");
                    memberInfo.hasAccessToTutoringChat = this.getBooleanAttribute(memberDataElement, "data-member-has-access-to-tutoring-chat");
                    memberInfo.hasInstitutionLicense = this.getBooleanAttribute(memberDataElement, "data-member-has-institution-license");
                    memberInfo.institutionId = Number(memberDataElement.getAttribute("data-member-institution-id"));
                    memberInfo.institutionName = memberDataElement.getAttribute("data-member-institution-name");
                    memberInfo.institutionType = memberDataElement.getAttribute("data-institution-type");
                    memberInfo.isAllowSms = this.getBooleanAttribute(memberDataElement, "data-is-allow-sms");
                    memberInfo.isDomestic = this.getBooleanAttribute(memberDataElement, "data-is-domestic");
                    memberInfo.isFamilyAdminActingAsStudent = this.getBooleanAttribute(memberDataElement, "data-is-family-admin-acting-as-student");
                    memberInfo.isFamilyPlanStudent = this.getBooleanAttribute(memberDataElement, "data-is-family-plan-student");
                    memberInfo.isLoggedIn = !isNaN(memberId);
                    memberInfo.isPaidTrialEligible = this.getBooleanAttribute(memberDataElement, "data-is-paid-trial-eligible");
                    memberInfo.isPpcSession = this.getBooleanAttribute(memberDataElement, "data-is-ppc-session");
                    memberInfo.isTestPrep = this.getBooleanAttribute(memberDataElement, "data-is-test-prep");
                    memberInfo.isVisitorReferredByEts = this.getBooleanAttribute(memberDataElement, "data-is-visitor-referred-by-ets");
                    memberInfo.landedOnCourseExamOrPractice = this.getBooleanAttribute(memberDataElement, "data-landed-on-course-exam-or-practice");
                    memberInfo.lastName = memberDataElement.getAttribute("data-member-last-name");
                    memberInfo.maxAssignmentDurationInMonths = Number(memberDataElement.getAttribute("data-max-assignment-duration"));
                    memberInfo.memberAgeDays = this.getNumberAttribute(memberDataElement, "data-member-age-days");
                    memberInfo.memberDateCreated = memberDataElement.getAttribute("data-member-date-created");
                    memberInfo.memberEmail = memberDataElement.getAttribute("data-member-email");
                    memberInfo.memberId = memberId;
                    memberInfo.oauthConfigProvider = memberDataElement.getAttribute("data-oauth-config-provider");
                    memberInfo.paymentProviderStatus = memberDataElement.getAttribute("data-member-status");
                    memberInfo.persona = memberDataElement.getAttribute("data-member-persona");
                    memberInfo.productId = Number(memberDataElement.getAttribute("data-member-product-id"));
                    memberInfo.productKey = memberDataElement.getAttribute("data-member-product-key");
                    memberInfo.schoologyId = memberDataElement.getAttribute("data-schoology-id");
                    memberInfo.shouldShowLmsCanvas = this.getBooleanAttribute(memberDataElement, "data-should-show-lms-canvas");
                    memberInfo.shouldShowLmsSchoology = this.getBooleanAttribute(memberDataElement, "data-should-show-lms-schoology");
                    memberInfo.stateCodeFromIp = memberDataElement.getAttribute("data-state-code-from-ip");
                    memberInfo.taxStatus = memberDataElement.getAttribute("data-tax-status");
                    memberInfo.tutoringUpgradableProductIds = this.getNumberArray(memberDataElement, "data-tutoring-upgradable-products");
                }
                return memberInfo;
            }
        });
        Object.defineProperty(MemberInfoUtil.prototype, "getNumberAttribute", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (memberDataElement, attributeName) {
                var attrValueStr = memberDataElement.getAttribute(attributeName);
                return parseInt(attrValueStr, 10);
            }
        });
        Object.defineProperty(MemberInfoUtil.prototype, "getBooleanAttribute", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (memberDataElement, attributeName) {
                var attrValueStr = memberDataElement.getAttribute(attributeName);
                if (!attrValueStr) {
                    return false;
                }
                return attrValueStr.toLowerCase() === "true";
            }
        });
        Object.defineProperty(MemberInfoUtil.prototype, "getNumberArray", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (memberDataElement, attributeName) {
                var attrValueStr = memberDataElement.getAttribute(attributeName);
                if (!attrValueStr) {
                    return [];
                }
                return attrValueStr.split(",").map(function (str) { return Number(str); });
            }
        });
        Object.defineProperty(MemberInfoUtil.prototype, "memberHasToDoList", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this.memberInfo.productKey === "TUTORING" || this.memberInfo.accountType === "TEST_PREP_PLUS_TUTORING";
            }
        });
        return MemberInfoUtil;
    }());
    exports.MemberInfoUtil = MemberInfoUtil;
});

//# sourceMappingURL=member-info.util.js.map

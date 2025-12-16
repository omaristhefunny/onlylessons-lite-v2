define(["require", "exports", "@sites-study-com/remspect"], function (require, exports, Remspect) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProductBulletUtil = exports.HelperTextUtil = void 0;
    var HelperTextUtil = (function () {
        function HelperTextUtil(regData) {
            Object.defineProperty(this, "regData", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "isSpecificTestPrep", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "schoolPathTokensMap", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: { "University of Phoenix": "uopx",
                    "Western Governors University": "wgu" }
            });
            Object.defineProperty(this, "schoolPathTokens", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: ["uopx", "wgu"]
            });
            this.regData = regData;
            this.isSpecificTestPrep = !!document.querySelector("[data-specific-test-prep='true']");
        }
        Object.defineProperty(HelperTextUtil.prototype, "calculateHelperTextIdentifierForQuestion", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (formGroupName) {
                var schoolPathToken = this.schoolPathTokensMap.hasOwnProperty(this.regData.cxPlannedSchool) ? "-" + this.schoolPathTokensMap[this.regData.cxPlannedSchool] : "";
                if (formGroupName === "familyPlanIntent") {
                    return "homeschool-family-plan-bullets";
                }
                else if (formGroupName === "homeschoolIntent") {
                    return "homeschool-intent";
                }
                else if (formGroupName === "userType") {
                }
                else if (formGroupName === "goal") {
                }
                else if (formGroupName === "email") {
                    if (this.regData.goals === 'HOMESCHOOL'
                        && this.regData.product.indexOf("COLLEGE_ACCELERATOR") < 0) {
                        return "homeschool-chemistry-classes";
                    }
                    if (!Remspect.isControl("cxRegFlowTestimonial")) {
                        if (this.regData.goals === 'EARN_CREDIT') {
                            return "cx-email" + schoolPathToken;
                        }
                    }
                }
                else if (formGroupName === "password") {
                    var helperText = this.calculatePasswordHelperText(schoolPathToken);
                    if (!!helperText) {
                        return helperText;
                    }
                }
                else if (formGroupName === "country") {
                    if (this.regData.goals === 'HOMESCHOOL'
                        && this.regData.product.indexOf("COLLEGE_ACCELERATOR") < 0) {
                        return "homeschool-chemistry-classes";
                    }
                    if (!Remspect.isControl("cxRegFlowTestimonial")) {
                        if (this.regData.goals === 'EARN_CREDIT') {
                            return "cx-country" + schoolPathToken;
                        }
                    }
                }
                else if (formGroupName === "name") {
                    if (this.regData.goals === 'HOMESCHOOL'
                        && this.regData.product.indexOf("COLLEGE_ACCELERATOR") < 0) {
                        return "homeschool-chemistry-classes";
                    }
                    if (!Remspect.isControl("cxRegFlowTestimonial")) {
                        if (this.regData.goals === 'EARN_CREDIT') {
                            return "cx-full-name" + schoolPathToken;
                        }
                    }
                }
                else if (formGroupName === "hasTransferSchool") {
                    if (!Remspect.isControl("cxRegFlowTestimonial")) {
                        if (this.regData.goals === 'EARN_CREDIT') {
                            return "cx-has-transfer-school" + schoolPathToken;
                        }
                    }
                }
                else if (formGroupName === "transferSchool") {
                    if (!Remspect.isControl("cxRegFlowTestimonial")) {
                        if (this.regData.goals === 'EARN_CREDIT') {
                            return "cx-transfer-school" + schoolPathToken;
                        }
                    }
                }
                return null;
            }
        });
        Object.defineProperty(HelperTextUtil.prototype, "getTokenFromHelperText", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (helperText) {
                if (!helperText) {
                    return "";
                }
                var words = helperText.split("-");
                if (this.schoolPathTokens.indexOf(words[words.length - 1]) >= 0) {
                    return words[words.length - 1];
                }
                return "non-partner-school";
            }
        });
        Object.defineProperty(HelperTextUtil.prototype, "calculatePasswordHelperText", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (schoolPathToken) {
                if (this.regData.goals === 'HOMESCHOOL'
                    && this.regData.product.indexOf("COLLEGE_ACCELERATOR") < 0) {
                    return "homeschool-chemistry-classes";
                }
                if (!Remspect.isControl("cxRegFlowTestimonial")) {
                    if (this.regData.goals === 'EARN_CREDIT') {
                        return "cx-password" + schoolPathToken;
                    }
                }
                return null;
            }
        });
        return HelperTextUtil;
    }());
    exports.HelperTextUtil = HelperTextUtil;
    var ProductBulletUtil = (function () {
        function ProductBulletUtil(regData) {
            Object.defineProperty(this, "regData", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.regData = regData;
        }
        Object.defineProperty(ProductBulletUtil.prototype, "getBulletHeaderText", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return "Your Plan Includes";
            }
        });
        Object.defineProperty(ProductBulletUtil.prototype, "getProductNameForBulletText", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.regData.product) {
                    if (this.regData.product.indexOf("PRAXIS") > -1) {
                        return "Praxis";
                    }
                    else if (this.regData.product.indexOf("FTCE") > -1) {
                        return "FTCE";
                    }
                    else if (this.regData.product.indexOf("HESI") > -1) {
                        return "HESI";
                    }
                    else if (this.regData.product.indexOf("TEAS") > -1) {
                        return "TEAS";
                    }
                }
                return "Test Prep";
            }
        });
        Object.defineProperty(ProductBulletUtil.prototype, "calculateProductBulletTextIdentifierForProduct", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegPageApp) {
                if (this.regData.wantsFamilyPlan) {
                    return "family-plan-product-bullets";
                }
                else if (!this.regData.product) {
                    return null;
                }
                else if (this.regData.homeschoolIntentSelectedOption
                    && this.regData.homeschoolIntentSelectedOption === "SUPPLEMENT_CURRICULUM"
                    && this.regData.product.indexOf("ACCELERATOR") < 0) {
                    return "new-student-other-basic-bullets";
                }
                else if (this.regData.product.indexOf("ANSWERS") < 0
                    && (this.regData.goals === "EXAM_PREP" || this.regData.goals === "TEACHER_CERTIFICATION")) {
                    return "test-prep-reg-bullets";
                }
                else if (this.regData.product.indexOf("CLASSROOM_TEACHER") > -1) {
                    return "classroom-teacher-product-bullets";
                }
                else if (this.regData.product.indexOf("TEACHER") > -1) {
                    return "teacher-product-bullets";
                }
                else if (this.regData.product.indexOf("ACCELERATOR") > -1) {
                    return "cx-reg-bullets";
                }
                else if (this.regData.product.indexOf("CS_") > -1 || this.regData.product === "CS1" || this.regData.product === "CS3") {
                    return "college-package-reg-bullets";
                }
                else if (this.regData.product.indexOf("TUTORING") > -1) {
                    return "tutoring-reg-bullets";
                }
                else {
                    if (this.regData.product.indexOf("PREMIUM") > -1) {
                        return null;
                    }
                    else if (this.regData.product.indexOf("HOMESCHOOL") > -1) {
                        return "homeschool-product-bullets";
                    }
                    else if (this.regData.product.indexOf("ANSWERS") > -1) {
                        return "new-student-expert-product-bullets";
                    }
                    else if (this.regData.product.indexOf("BASIC") > -1) {
                        if ((this.regData.userType === "STUDENT" || this.regData.userType === 'HOMESCHOOLER')
                            && (this.regData.goals === "OTHER" || this.regData.goals === "STUDY" || this.regData.goals === "HOME_SUPPLEMENT")) {
                            return "new-student-other-basic-bullets";
                        }
                    }
                }
                return null;
            }
        });
        return ProductBulletUtil;
    }());
    exports.ProductBulletUtil = ProductBulletUtil;
});

//# sourceMappingURL=reg-form-utils.js.map

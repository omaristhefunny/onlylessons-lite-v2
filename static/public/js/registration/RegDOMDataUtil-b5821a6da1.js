define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadRegDataValuesFromDOM = loadRegDataValuesFromDOM;
    exports.loadRegDataValuesFromDOMForPartialModalOpen = loadRegDataValuesFromDOMForPartialModalOpen;
    exports.loadDataFromSpecificTestPrepElement = loadDataFromSpecificTestPrepElement;
    function loadRegDataValuesFromDOM() {
        var regDataValues = {};
        regDataValues.billingAddressCountry = "US";
        var dataElement = document.querySelector("#guestRegData");
        if (dataElement != null) {
            var advisorMemberId = dataElement.getAttribute("data-advisor-member-id");
            if (advisorMemberId === null || advisorMemberId === void 0 ? void 0 : advisorMemberId.trim()) {
                regDataValues.advisorMemberId = parseInt(advisorMemberId);
            }
            var countryAttr = dataElement.getAttribute("data-country");
            if (countryAttr === null || countryAttr === void 0 ? void 0 : countryAttr.trim()) {
                regDataValues.billingAddressCountry = countryAttr;
            }
            var cxAdvisorEmail = dataElement.getAttribute("data-cx-advisor-email");
            if (cxAdvisorEmail === null || cxAdvisorEmail === void 0 ? void 0 : cxAdvisorEmail.trim()) {
                regDataValues.cxAdvisorEmail = decodeUnicode(cxAdvisorEmail);
            }
            var cxAdvisorName = dataElement.getAttribute("data-cx-advisor-name");
            if (cxAdvisorName === null || cxAdvisorName === void 0 ? void 0 : cxAdvisorName.trim()) {
                regDataValues.cxAdvisorName = decodeUnicode(cxAdvisorName);
            }
            var cxPlannedSchool = dataElement.getAttribute("data-cx-planned-school");
            if (cxPlannedSchool === null || cxPlannedSchool === void 0 ? void 0 : cxPlannedSchool.trim()) {
                regDataValues.cxPlannedSchool = decodeUnicode(cxPlannedSchool);
            }
            var cxPlannedSchoolCompanyId = dataElement.getAttribute("data-cx-planned-school-company-id");
            if (cxPlannedSchoolCompanyId === null || cxPlannedSchoolCompanyId === void 0 ? void 0 : cxPlannedSchoolCompanyId.trim()) {
                regDataValues.cxPlannedSchoolCompanyId = parseInt(cxPlannedSchoolCompanyId);
            }
            var emailAttr = dataElement.getAttribute("data-email");
            if (emailAttr === null || emailAttr === void 0 ? void 0 : emailAttr.trim()) {
                regDataValues.email = emailAttr;
            }
            var firstNameAttr = dataElement.getAttribute("data-first-name");
            if (firstNameAttr === null || firstNameAttr === void 0 ? void 0 : firstNameAttr.trim()) {
                regDataValues.billingFirstName = decodeUnicode(firstNameAttr);
            }
            var goalsAttr = dataElement.getAttribute("data-goals");
            if (goalsAttr === null || goalsAttr === void 0 ? void 0 : goalsAttr.trim()) {
                regDataValues.goals = goalsAttr;
            }
            var hasTransferSchool = dataElement.getAttribute("data-has-transfer-school");
            if (hasTransferSchool === null || hasTransferSchool === void 0 ? void 0 : hasTransferSchool.trim()) {
                regDataValues.hasTransferSchool = hasTransferSchool.toLowerCase() === "true";
            }
            var ignoreCollegePackageRouting = dataElement.getAttribute("data-ignore-college-package-routing");
            if (ignoreCollegePackageRouting === null || ignoreCollegePackageRouting === void 0 ? void 0 : ignoreCollegePackageRouting.trim()) {
                regDataValues.ignoreCollegePackageRouting = ignoreCollegePackageRouting.toLowerCase() === "true";
            }
            var lastNameAttr = dataElement.getAttribute("data-last-name");
            if (lastNameAttr === null || lastNameAttr === void 0 ? void 0 : lastNameAttr.trim()) {
                regDataValues.billingLastName = decodeUnicode(lastNameAttr);
            }
            var phoneAttr = dataElement.getAttribute("data-phone");
            if (phoneAttr === null || phoneAttr === void 0 ? void 0 : phoneAttr.trim()) {
                regDataValues.phoneNumber = phoneAttr;
            }
            var phoneSmsAttr = dataElement.getAttribute("data-phone-sms");
            if (phoneSmsAttr === null || phoneSmsAttr === void 0 ? void 0 : phoneSmsAttr.trim()) {
                regDataValues.phoneSms = phoneSmsAttr;
            }
            var productAttr = dataElement.getAttribute("data-product");
            if (productAttr === null || productAttr === void 0 ? void 0 : productAttr.trim()) {
                regDataValues.product = productAttr;
            }
            var productKeyOverrideAttr = dataElement.getAttribute("data-product-key-override");
            if (productKeyOverrideAttr === null || productKeyOverrideAttr === void 0 ? void 0 : productKeyOverrideAttr.trim()) {
                regDataValues.product = productKeyOverrideAttr;
                regDataValues.productKeyOverride = productKeyOverrideAttr;
            }
            var referredByAdvisor = dataElement.getAttribute("data-referred-by-advisor");
            if (referredByAdvisor === null || referredByAdvisor === void 0 ? void 0 : referredByAdvisor.trim()) {
                regDataValues.referredByAdvisor = referredByAdvisor.toLowerCase() === "true";
            }
            var enrolledInSchool = dataElement.getAttribute("data-enrolled-in-school");
            if (enrolledInSchool === null || enrolledInSchool === void 0 ? void 0 : enrolledInSchool.trim()) {
                regDataValues.enrolledInSchool = enrolledInSchool === "true";
            }
            var schoolEnrollmentGradeLevel = dataElement.getAttribute("data-school-enrollment-grade-level");
            if (schoolEnrollmentGradeLevel === null || schoolEnrollmentGradeLevel === void 0 ? void 0 : schoolEnrollmentGradeLevel.trim()) {
                regDataValues.schoolEnrollmentGradeLevel = schoolEnrollmentGradeLevel;
            }
            var schoolEnrollmentSchoolId = dataElement.getAttribute("data-school-enrollment-school-id");
            if (schoolEnrollmentSchoolId === null || schoolEnrollmentSchoolId === void 0 ? void 0 : schoolEnrollmentSchoolId.trim()) {
                regDataValues.schoolEnrollmentSchoolId = parseInt(schoolEnrollmentSchoolId, 10);
            }
            var schoolEnrollmentUnknownSchoolName = dataElement.getAttribute("data-school-enrollment-unknown-school-name");
            if (schoolEnrollmentUnknownSchoolName === null || schoolEnrollmentUnknownSchoolName === void 0 ? void 0 : schoolEnrollmentUnknownSchoolName.trim()) {
                regDataValues.schoolEnrollmentUnknownSchoolName = decodeUnicode(schoolEnrollmentUnknownSchoolName);
            }
            var teacherSubjectAttr = dataElement.getAttribute("data-teacher-subject");
            if (teacherSubjectAttr === null || teacherSubjectAttr === void 0 ? void 0 : teacherSubjectAttr.trim()) {
                regDataValues.teacherSubject = teacherSubjectAttr;
            }
            var userTypeAttr = dataElement.getAttribute("data-user-type");
            if (userTypeAttr === null || userTypeAttr === void 0 ? void 0 : userTypeAttr.trim()) {
                regDataValues.userType = userTypeAttr;
            }
            var wantsFamilyPlanAttr = dataElement.getAttribute("data-wants-family-plan");
            if (wantsFamilyPlanAttr === null || wantsFamilyPlanAttr === void 0 ? void 0 : wantsFamilyPlanAttr.trim()) {
                regDataValues.wantsFamilyPlan = wantsFamilyPlanAttr.toLowerCase() === "true";
            }
            var subjectSiloAttr = dataElement.getAttribute("data-subject-silo");
            if (subjectSiloAttr === null || subjectSiloAttr === void 0 ? void 0 : subjectSiloAttr.trim()) {
                regDataValues.subjectSilo = subjectSiloAttr;
            }
            var examNameAttr = dataElement.getAttribute("data-exam-name");
            if (examNameAttr === null || examNameAttr === void 0 ? void 0 : examNameAttr.trim()) {
                regDataValues.examName = examNameAttr;
            }
        }
        return regDataValues;
    }
    function loadRegDataValuesFromDOMForPartialModalOpen(triggerElement) {
        var _a, _b, _c, _d;
        var regDataValues = {};
        if (triggerElement) {
            regDataValues.productKeyOverride = triggerElement.getAttribute('data-product-key');
            regDataValues.userType = triggerElement.getAttribute("data-user-type");
            if (triggerElement.hasAttribute("data-wants-family-plan")) {
                regDataValues.wantsFamilyPlan = ((_a = triggerElement.getAttribute("data-wants-family-plan")) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "true";
            }
            regDataValues.isSpecificTestPrep = ((_b = triggerElement.getAttribute("data-specific-test-prep")) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === "true";
            regDataValues.defaultProductKey = triggerElement.getAttribute("data-default-product");
            regDataValues.getFullAccessHeader = ((_c = triggerElement.getAttribute("data-use-full-access-header")) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === "true";
            if (regDataValues.productKeyOverride === "TEACHER") {
                regDataValues.userType = "INSTRUCTOR";
            }
            regDataValues.email = triggerElement.getAttribute('data-user-email');
            regDataValues.goals = triggerElement.getAttribute("data-goal");
            var examNameAttr = triggerElement.getAttribute("data-exam-name");
            if (examNameAttr === null || examNameAttr === void 0 ? void 0 : examNameAttr.trim()) {
                regDataValues.examName = examNameAttr;
            }
        }
        if (!regDataValues.isSpecificTestPrep) {
            regDataValues.isSpecificTestPrep = !!document.querySelector("[data-specific-test-prep='true']");
        }
        if (!regDataValues.defaultProductKey) {
            var dataElement = document.querySelector("[data-default-product]");
            if (dataElement != null && dataElement.getAttribute("data-default-product") != null) {
                regDataValues.defaultProductKey = dataElement.getAttribute("data-default-product");
            }
        }
        if (!regDataValues.productKeyOverride) {
            var dataElement = document.querySelector("#guestRegData");
            if (dataElement != null && dataElement.getAttribute("data-product-key-override") != null) {
                regDataValues.productKeyOverride = dataElement.getAttribute("data-product-key-override");
            }
        }
        if (!regDataValues.skipPreFilledQuestions) {
            var dataElement = document.querySelector("#guestRegData");
            if (dataElement != null && dataElement.getAttribute("data-skip-pre-filled-questions") != null) {
                regDataValues.skipPreFilledQuestions = ((_d = dataElement.getAttribute("data-skip-pre-filled-questions")) === null || _d === void 0 ? void 0 : _d.toLowerCase()) === "true";
            }
        }
        return regDataValues;
    }
    function loadDataFromSpecificTestPrepElement() {
        var defaultIsSpecificTestPrepEl = document.querySelector("[data-specific-test-prep='true']");
        return defaultIsSpecificTestPrepEl === null || defaultIsSpecificTestPrepEl === void 0 ? void 0 : defaultIsSpecificTestPrepEl.getAttribute("data-default-product");
    }
    function decodeUnicode(encoded) {
        encoded = encoded.replace(/\\'/g, '\'');
        encoded = encoded.replace(/\\\\/g, '\\');
        return decodeURIComponent(JSON.parse('"' + encoded + '"'));
    }
    function extractEnumArray(element, attributeName) {
        var _a;
        var rawAttributeValue = (_a = element.getAttribute(attributeName)) === null || _a === void 0 ? void 0 : _a.trim();
        if (rawAttributeValue) {
            if (rawAttributeValue[0] == '[') {
                return JSON.parse(rawAttributeValue);
            }
            return [rawAttributeValue];
        }
        return null;
    }
});

//# sourceMappingURL=RegDOMDataUtil.js.map

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "@sites-study-com/remspect", "@study-com/dynamic-form", "@study-com/eureka-design-system", "@tippyjs/react", "forms/FormConstants", "jquery", "lib/axios", "member/info/member-info.util", "mobx", "mobx-react", "react", "react", "registration/RegFamilyPlanUtil", "registration/RegProductDecider", "registration/RegTeacherUtil", "registration/RegUserTypeGoalUtil", "testPrep/TestPrepProductUtil", "../eureka/util/AxiosTypeaheadUtil", "compatibility/polyfill/element-get-attribute-names"], function (require, exports, remspect, dynamic_form_1, eureka_design_system_1, react_1, FormConstants_1, $, axios_1, member_info_util_1, mobx_1, mobx_react_1, React, react_2, RegFamilyPlanUtil, RegProductDecider, RegTeacherUtil, RegUserTypeGoalUtil, TestPrepProductUtil_1, AxiosTypeaheadUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reactRegAppUtil = exports.TestPrepDisclaimer = exports.ReactRegAppUtil = exports.LAST_COURSE_RELATED_URL_COOKIE_NAME = exports.SENSITIVE_FIELD_KEYS_FOR_LOGGING = exports.SENSITIVE_FIELD_KEYS_FOR_REGISTRATION = void 0;
    exports.SENSITIVE_FIELD_KEYS_FOR_REGISTRATION = [
        "creditCardNumber", "expirationDate", "expirationMonth", "expirationYear", "creditCardCvc",
    ];
    exports.SENSITIVE_FIELD_KEYS_FOR_LOGGING = [
        "creditCardNumber", "expirationDate", "expirationMonth", "expirationYear", "creditCardCvc", "password", "passwordConfirm"
    ];
    exports.LAST_COURSE_RELATED_URL_COOKIE_NAME = "lcru";
    var ReactRegAppUtil = (function () {
        function ReactRegAppUtil() {
            Object.defineProperty(this, "FORM_FACTOR_COOKIE", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: "_sv"
            });
            Object.defineProperty(this, "MOBILE_COOKIE_VALUE", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: "M"
            });
            Object.defineProperty(this, "DO_NOT_REPLACE_PRODUCT_KEYS", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: ["ACT_TEST_PREP_6_MONTHS_ONLY", "SAT_TEST_PREP_6_MONTHS_ONLY"]
            });
            Object.defineProperty(this, "longTestNameProductMap", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {
                    "ANCC ADULT GERONTOLOGY ACUTE NURSE CARE": "ANCC_GERONTOLOGY_ACUTE_NURSE_CARE",
                    "ANCC ADULT GERONTOLOGY PRIMARY NURSE CARE": "ANCC_GERONTOLOGY_PRIMARY_NURSE_CARE",
                    "ANCC FAMILY NURSE PRACTITIONER": "ANCC_FAMILY_NURSE_PRACTITIONER",
                    "ANCC GERONTOLOGICAL NURSING": "ANCC_GERONTOLOGY_NURSING",
                    "CNA FLORIDA": "CNA_FL",
                    "CNA NEW YORK": "CNA_NY",
                    "CNA TEXAS": "CNA_TX",
                    "FOUNDATIONS OF READING": "FOUNDATIONS_OF_READING",
                    "KAPLAN NURSING ENTRANCE": "KAPLAN_NURSING_ENTRANCE",
                    "LIFE & HEALTH INSURANCE SALES": "LIFE_HEALTH_INSURANCE_SALES",
                    "LITERACY AND NUMERACY INITIAL TEACHER EDUCATION": "LITERACY_NUMERACY_INIT_TEACHER_ED",
                    "PA KEYSTONE EXAMS": "PA_KEYSTONE"
                }
            });
            Object.defineProperty(this, "phoneSmsPenultimateSaveEventType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "DefaultControls", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: (0, mobx_react_1.observer)(function (props) {
                    var _a, _b, _c, _d;
                    var store = props.store;
                    var isMobile = false;
                    if (!remspect.isControl("regFormRebrand")) {
                        isMobile = eureka_design_system_1.LayoutHooks.useOnMobile();
                    }
                    var continueCname = (_b = (_a = store.currentPage.questions.filter(function (question) { return !!question.continueCname; })) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.continueCname;
                    if (!continueCname) {
                        continueCname = (_d = (_c = store.currentPage.visibleQuestions) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.key;
                    }
                    return React.createElement(React.Fragment, null,
                        !remspect.isControl("regFormRebrand") &&
                            React.createElement(eureka_design_system_1.Button, { type: "submit", variant: "PRIMARY", marketingSize: true, fillWidth: isMobile, "data-cname": "continue_" + continueCname + "Form", "test-id": "continue_" + continueCname + "Form" }, "Continue"),
                        remspect.isControl("regFormRebrand") &&
                            React.createElement("button", { type: "submit", className: "dynamic-form__submit", "test-id": "continue_" + continueCname + "Form", "data-cname": "continue_" + continueCname + "Form" }, "Continue"),
                        store.firstPage !== store.currentPage && !store.submitting &&
                            React.createElement("div", { className: "dynamic-form__back" },
                                React.createElement("a", { "test-id": "back", "data-cname": "reg_back_button", onClick: function () { return store.goBack(); } }, "Back")),
                        (store.currentPage.questions.filter(function (question) { return question.key === "phoneSms"; }).length) ? React.createElement("div", { className: "phone-number__disclaimer" }, "By proceeding and providing your phone number, you consent to receive text messages from Study.com. Text messages may be autodialed and frequency varies. You may text stop to cancel any time.") : null);
                })
            });
        }
        Object.defineProperty(ReactRegAppUtil.prototype, "saveValues", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (toSave) {
                if (Object.keys(toSave).length > 0) {
                    var config = {
                        headers: { "Content-Type": "application/x-www-form-urlencoded" }
                    };
                    var stringifiedToSave = $.param(toSave);
                    return axios_1.default.post("/academy/register/save.ajax", stringifiedToSave, config).then(function () { });
                }
                return Promise.resolve();
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "registrationData", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                var registrationData = __assign({}, this.rawRegistrationData(reactRegApp));
                return this.obscureSensitiveRegistrationDataFields(registrationData);
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "obscureSensitiveRegistrationDataFields", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (registrationData) {
                for (var key in registrationData) {
                    if (exports.SENSITIVE_FIELD_KEYS_FOR_LOGGING.indexOf(key) > -1) {
                        registrationData[key] = "xxxxx";
                    }
                }
                return registrationData;
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "rawRegistrationData", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                var registrationData = __assign({}, reactRegApp.regMetadata);
                for (var key in reactRegApp.form.values) {
                    var value = reactRegApp.form.values[key];
                    if (value !== null && value !== undefined) {
                        registrationData[key] = value;
                    }
                }
                return registrationData;
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "shouldShowAnswersSidebar", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                return reactRegApp.dataFromReactElement["should-show-answers-sidebar"] === "true";
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "askedQuestion", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                return reactRegApp.dataFromReactElement["asked-question"];
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "lastViewedStudyAnswerTitle", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                return reactRegApp.dataFromReactElement["last-viewed-study-answer-title"];
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "studyAnswerRelatedConceptName", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                return reactRegApp.dataFromReactElement["study-answer-related-concept-name"];
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "shouldShowTrackingPixels", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                return reactRegApp.dataFromReactElement["should-show-tracking-pixels"] === "true";
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "shouldShowFamilyPlanQuestion", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                return RegFamilyPlanUtil.shouldAskFamilyPlanQuestion(this.registrationData(reactRegApp));
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "advancePageMaybeAsync", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                if (remspect.isControl("regFormRebrand")) {
                    reactRegApp.form.advancePage();
                }
                else {
                    window.setTimeout(function () { return reactRegApp.form.advancePage(); }, 0);
                }
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "onUserTypeChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                var userType = reactRegApp.form.values.userType;
                window._kiq = window._kiq || [];
                window._kiq.push(["set", { memberMemberPersona: userType }]);
                if (window['gtag']) {
                    window['gtag']('event', "usertype_".concat(userType).toLowerCase());
                }
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "onGoalChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                var goal = reactRegApp.form.values["goals"];
                if (window['gtag']) {
                    window['gtag']('event', "goals_".concat(goal).toLowerCase());
                }
                this.clearFamilyPlanDataIfNotValid(reactRegApp);
                this.clearExamNameDataIfNotValid(reactRegApp);
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "clearFamilyPlanDataIfNotValid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                var _a, _b;
                if (((_b = (_a = reactRegApp.form) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.wantsFamilyPlan) != null
                    && !RegFamilyPlanUtil.shouldAskFamilyPlanQuestion(reactRegApp.registrationData)) {
                    reactRegApp.form.setQuestionValue("wantsFamilyPlan", null);
                }
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "clearExamNameDataIfNotValid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                var examNameExistsAnywhereInClientData = !!(((_a = reactRegApp === null || reactRegApp === void 0 ? void 0 : reactRegApp.regMetadata) === null || _a === void 0 ? void 0 : _a.examName)
                    || ((_b = reactRegApp === null || reactRegApp === void 0 ? void 0 : reactRegApp.registrationData) === null || _b === void 0 ? void 0 : _b.examName)
                    || ((_d = (_c = reactRegApp === null || reactRegApp === void 0 ? void 0 : reactRegApp.form) === null || _c === void 0 ? void 0 : _c.values) === null || _d === void 0 ? void 0 : _d.examName));
                var isExamPrepGoal = ["STANDARD_EXAM_PREP", "TEACHER_CERTIFICATION", "EXAM_PREP"].includes((_f = (_e = reactRegApp === null || reactRegApp === void 0 ? void 0 : reactRegApp.form) === null || _e === void 0 ? void 0 : _e.values) === null || _f === void 0 ? void 0 : _f.goals);
                if (examNameExistsAnywhereInClientData && !isExamPrepGoal) {
                    reactRegApp.form.setQuestionValue("examName", "");
                    reactRegApp.regMetadata.examName = null;
                    reactRegApp.registrationData.examName = null;
                    (_h = (_g = reactRegApp).setProductFromRegData) === null || _h === void 0 ? void 0 : _h.call(_g, reactRegApp.registrationData);
                }
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "buildFamilyPlanChangeEmailLoginUrl", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                var _a, _b;
                return "/academy/login.html?email=" + encodeURIComponent((_b = (_a = reactRegApp.form) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.email) + "&redirect-url=" + encodeURIComponent("/member/email/form.html?changingFamilyPlanStudentEmail=true");
            }
        });
        ;
        Object.defineProperty(ReactRegAppUtil.prototype, "isProductCX", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (product) {
                return ["COLLEGE_ACCELERATOR", "CS1", "CS2", "CS3"].indexOf(product) > -1 || (product === null || product === void 0 ? void 0 : product.indexOf("CS_")) > -1;
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "regModalPageListDef", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return [
                    "userType",
                    "goals",
                    "examName",
                    "wantsFamilyPlan",
                    "teacherSubject",
                    "email",
                    "phoneSms",
                ];
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "isUserScreenViewMobile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return !remspect.isControl("regFormRebrand") ? false : $.cookie(this.FORM_FACTOR_COOKIE) == this.MOBILE_COOKIE_VALUE;
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "shouldAutoAdvance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return true;
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "isUserEligibleForSmsAcquisition", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                var _a, _b, _c, _d, _e, _f, _g;
                var goal = ((_b = (_a = reactRegApp.form) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.goals) || ((_c = reactRegApp.registrationData) === null || _c === void 0 ? void 0 : _c.goals);
                var goalEligible = goal === "EXAM_PREP" || goal === "EARN_CREDIT" || goal === "TEACHER_CERTIFICATION";
                var isAnswersProduct = (((_d = reactRegApp.registrationData) === null || _d === void 0 ? void 0 : _d.product) == "ANSWERS" ||
                    ((_e = reactRegApp.registrationData) === null || _e === void 0 ? void 0 : _e.product) == "ANSWERS_ANNUAL") &&
                    !this.getMatchingProductKeyForSelectedTest((_g = (_f = reactRegApp === null || reactRegApp === void 0 ? void 0 : reactRegApp.form) === null || _f === void 0 ? void 0 : _f.values) === null || _g === void 0 ? void 0 : _g.examName);
                return member_info_util_1.MemberInfoUtil.instance().memberInfo.isDomestic && goalEligible && !isAnswersProduct;
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "isPhoneNumberValid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (phone) {
                if (!FormConstants_1.BASIC_PHONE_REGEX.test(phone)) {
                    return false;
                }
                var digits = phone.replace(/\D/g, '').length;
                return digits >= 10 && digits <= 16;
            }
        });
        Object.defineProperty(ReactRegAppUtil, "isPhoneNumberValidForSmsAcquisition", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (phone) {
                if (!FormConstants_1.BASIC_PHONE_REGEX.test(phone)) {
                    return false;
                }
                var digits = phone.replace(/\D/g, '').length;
                return digits === 10;
            }
        });
        Object.defineProperty(ReactRegAppUtil, "formatPhoneNumber", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (e) {
                var sanitizedPhone = e.target.value.replace(/\D/g, '');
                if (sanitizedPhone.length > 10) {
                    e.target.value = sanitizedPhone;
                    return;
                }
                var input = e.target.value.replace(/\D/g, '').substring(0, 10);
                var areaCode = input.substring(0, 3);
                var middle = input.substring(3, 6);
                var last = input.substring(6, 10);
                if (input.length > 6) {
                    e.target.value = "".concat(areaCode, "-").concat(middle, "-").concat(last);
                }
                else if (input.length > 3) {
                    e.target.value = "".concat(areaCode, "-").concat(middle);
                }
                else if (input.length > 0) {
                    e.target.value = "".concat(areaCode);
                }
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "getLabel", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (labelText, longDelighter) {
                return this.isUserScreenViewMobile() ?
                    React.createElement("span", { className: "dynamic-form__label--delighter ".concat(!!longDelighter ? "dynamic-form__label--delighter--long" : "") },
                        " ",
                        labelText,
                        " ") :
                    labelText;
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "getPlaceholder", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (placeholderTextForDesktopControl) {
                return this.isUserScreenViewMobile() ?
                    "" :
                    placeholderTextForDesktopControl;
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "emailInUseErrorElement", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return React.createElement("div", { "data-track-visible": true, "data-cname": "reg_error_email_in_use", "test-id": "reg_error_email_in_use" },
                    "Email already in use. Already a member? ",
                    React.createElement("a", { href: "/academy/login.html", "data-cname": "already_in_use_log_in", "test-id": "already_in_use_log_in" }, "Log In"),
                    " instead.");
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "getEmailLabel", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                var _a, _b, _c, _d;
                if (reactRegApp.isInHighIntentSinglePageCheckoutAnyVariation) {
                    return "Email";
                }
                if (!this.isUserScreenViewMobile()) {
                    return ((_b = (_a = reactRegApp.form) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.wantsFamilyPlan) ? "Parent account email" : "Email";
                }
                else {
                    return ((_d = (_c = reactRegApp.form) === null || _c === void 0 ? void 0 : _c.values) === null || _d === void 0 ? void 0 : _d.wantsFamilyPlan)
                        ? React.createElement("span", { className: "dynamic-form__label--delighter" }, "Parent account email")
                        : React.createElement("span", { className: "dynamic-form__label--delighter" }, "Email");
                }
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "getEmailPlaceholder", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                if (reactRegApp.isInHighIntentSinglePageCheckoutAnyVariation) {
                    return "Email";
                }
                if (reactRegApp.form.isEureka) {
                    return "Email address";
                }
                if (!this.isUserScreenViewMobile()) {
                    return "Email Address";
                }
                return undefined;
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "regModalQuestions", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                var _this = this;
                return {
                    userType: {
                        type: dynamic_form_1.QuestionType.SELECT,
                        required: true,
                        label: this.getLabel("What best describes you?"),
                        placeholder: this.getPlaceholder("Choose one"),
                        cname: "reg_form_user_type",
                        pageCname: reactRegApp.processPageCnameFromQuestion("user_type"),
                        continueCname: "userType",
                        messageForIsRequiredError: React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_user_type_required", "test-id": "reg_error_user_type_required" }, !this.isUserScreenViewMobile() ? "Wait! Who are you?"
                            : "Please choose what best describes you"),
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        onChange: function () {
                            reactRegApp.form.clearValue("goals");
                            if (_this.shouldAutoAdvance()) {
                                reactRegApp.advancePageMaybeAsync();
                            }
                        },
                        options: function () {
                            return [
                                { value: "STUDENT", text: "Student" },
                                { value: "INSTRUCTOR", text: "Teacher" },
                                { value: "PARENT", text: "Parent" },
                                { value: "TUTOR", text: "Tutor" },
                            ];
                        },
                        addOptionDataToDataExtra: true,
                    },
                    goals: {
                        type: dynamic_form_1.QuestionType.SELECT,
                        required: true,
                        label: this.getLabel("What's your main goal?"),
                        placeholder: this.getPlaceholder("Choose a goal"),
                        cname: "reg_form_goal",
                        pageCname: reactRegApp.processPageCnameFromQuestion("goals"),
                        continueCname: "mainGoal",
                        messageForIsRequiredError: React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_goal_required", "test-id": "reg_error_goal_required" }, !this.isUserScreenViewMobile() ? "Your goal is required"
                            : "Please choose a goal"),
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        onChange: function () {
                            if (_this.shouldAutoAdvance()) {
                                reactRegApp.advancePageMaybeAsync();
                            }
                        },
                        options: function () {
                            if (!reactRegApp.form || !reactRegApp.form.values) {
                                return [];
                            }
                            return RegUserTypeGoalUtil.getGoalsForState(reactRegApp.registrationData).map(function (goal) {
                                return { value: goal, text: RegUserTypeGoalUtil.getGoalText(goal) };
                            });
                        },
                    },
                    examName: {
                        type: dynamic_form_1.QuestionType.CUSTOM,
                        required: false,
                        cname: "test_search",
                        pageCname: reactRegApp.processPageCnameFromQuestion("test_search"),
                        continueCname: "testSearch",
                        label: this.getLabel("What exam are you preparing for?"),
                        body: function (formStore, questionStore) {
                            var LazyTestPrepExamPickerView = React.lazy(function () { return new Promise(function (resolve_1, reject_1) { require(["registration/question/TestPrepExamPickerViews"], resolve_1, reject_1); }).then(function (module) {
                                var TestPrepExamPickerView = module.TestPrepExamPickerView;
                                var fc = function () {
                                    var onChange = function (value) {
                                        if ((value === null || value === void 0 ? void 0 : value.length) > 0) {
                                            reactRegApp.regMetadata.examName = value;
                                            questionStore.setValue(value);
                                        }
                                    };
                                    var params = { userType: formStore.values.userType };
                                    var fetchSuggestionsFn = eureka_design_system_1.TypeaheadUtil.requireMinimumCharacters(2, AxiosTypeaheadUtil_1.AxiosTypeaheadUtil.createFetchSuggestionsFnFromAxiosCall("/academy/test-prep/search/get-test-name-matches.ajax", "searchWords", params));
                                    return (!remspect.isControl("regFormRebrand") ?
                                        React.createElement(eureka_design_system_1.Typeahead, { type: eureka_design_system_1.Typeahead.InputType.SEARCH, fetchSuggestions: fetchSuggestionsFn, placeholder: !exports.reactRegAppUtil.isUserScreenViewMobile() ? "Search for your exam" : null, ref: (0, react_2.useRef)(), onChange: onChange, defaultValue: questionStore.value, "data-cname": "test_search", "test-id": "test_prep_exam_picker", "data-track-visible": true }) :
                                        React.createElement(TestPrepExamPickerView, { regApp: reactRegApp, questionStore: questionStore, userType: formStore.values.userType }));
                                };
                                return { "default": fc };
                            }); });
                            return (React.createElement(React.Suspense, { fallback: null },
                                React.createElement(LazyTestPrepExamPickerView, null)));
                        },
                        hidden: function (form) {
                            var _a, _b, _c;
                            var isExamPrepGoal = ((_a = form === null || form === void 0 ? void 0 : form.values) === null || _a === void 0 ? void 0 : _a.goals) === "STANDARD_EXAM_PREP" || ((_b = form === null || form === void 0 ? void 0 : form.values) === null || _b === void 0 ? void 0 : _b.goals) === "TEACHER_CERTIFICATION"
                                || ((_c = form === null || form === void 0 ? void 0 : form.values) === null || _c === void 0 ? void 0 : _c.goals) === "EXAM_PREP";
                            if (reactRegApp.regMetadata.isSpecificTestPrep || !isExamPrepGoal) {
                                return true;
                            }
                            if (_this.DO_NOT_REPLACE_PRODUCT_KEYS.indexOf(reactRegApp.regMetadata.product) > -1) {
                                return true;
                            }
                            return false;
                        }
                    },
                    phoneSms: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        textType: dynamic_form_1.TextType.TEL,
                        maxLength: 12,
                        required: true,
                        autocomplete: "tel-national",
                        saveTriggers: [dynamic_form_1.SaveTrigger.ON_CHANGE_WHEN_DIRTY, dynamic_form_1.SaveTrigger.ON_BLUR, dynamic_form_1.SaveTrigger.ON_ENTER_KEY],
                        autofocus: !this.isUserScreenViewMobile(),
                        useDivInsteadOfLabel: true,
                        label: function () { return !_this.isUserScreenViewMobile() ?
                            React.createElement("div", { className: "phone-number__label" },
                                reactRegApp.isInHighIntentSinglePageCheckoutAnyVariation ? "Phone number" : "What's your phone number?",
                                React.createElement("div", { className: "phone-number__sublabel" }, "This will be your login. We\u2019ll text you a link to the app."))
                            : React.createElement("span", { className: "dynamic-form__label--delighter" }, reactRegApp.isInHighIntentSinglePageCheckoutAnyVariation ? "Phone number" : "What's your phone number?"); },
                        placeholder: reactRegApp.isInHighIntentSinglePageCheckoutAnyVariation ? "(xxx) xxx-xxxx" : this.getPlaceholder("Enter your mobile phone"),
                        cname: "reg_form_phone",
                        pageCname: reactRegApp.processPageCnameFromQuestion("phone"),
                        continueCname: "phone",
                        messageForIsRequiredError: React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_phone_required", "test-id": "reg_error_email_required" }, !this.isUserScreenViewMobile() ? "Phone number is required"
                            : "Please enter your phone number"),
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        inputMode: "tel",
                        onKeyUp: function (e) { return ReactRegAppUtil.formatPhoneNumber(e); },
                        onKeyDown: function (e) { return ReactRegAppUtil.enforceFormat(e); },
                        elementsBeforeInput: remspect.isControl("regFormRebrand") ? React.createElement("div", { className: "phone-number__before-elements" },
                            React.createElement("img", { src: "/images/registration/smsAcquisition/usa-flag.svg", className: "phone-number__flag" }),
                            React.createElement("div", { className: "phone-number__divider" }),
                            React.createElement("span", { className: "phone-number__country-code" }, "+1")) : undefined,
                        validator: function (value, form, lastSaveEventType) {
                            if (lastSaveEventType !== dynamic_form_1.SaveEventType.UNKNOWN) {
                                _this.phoneSmsPenultimateSaveEventType = lastSaveEventType;
                            }
                            else if (_this.phoneSmsPenultimateSaveEventType == undefined) {
                                return null;
                            }
                            var isInvalidPhoneErrorVisible = document.querySelector("[test-id='reg_error_phone_invalid']");
                            if (_this.phoneSmsPenultimateSaveEventType === dynamic_form_1.SaveEventType.ON_CHANGE && !isInvalidPhoneErrorVisible) {
                                return null;
                            }
                            if (!ReactRegAppUtil.isPhoneNumberValidForSmsAcquisition(value)) {
                                return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_phone_invalid", "test-id": "reg_error_phone_invalid" }, "Phone number is not a valid phone number");
                            }
                            return ReactRegAppUtil.submitPhoneForValidation(value)
                                .then(function (r) {
                                var _a;
                                if (((_a = r.data) === null || _a === void 0 ? void 0 : _a.usernameExists) !== true) {
                                    return null;
                                }
                                if (form.getDynamicFormQuestionWithKey("phoneSms").serverSideErrors.length !== 0) {
                                    return null;
                                }
                                return React.createElement(React.Fragment, null,
                                    React.createElement("div", { "data-track-visible": true, "data-cname": "reg_error_phone_in_use", "test-id": "reg_error_phone_in_use" },
                                        "Phone number already in use.\u00A0",
                                        !reactRegApp.isInHighIntentSinglePageCheckoutAnyVariation && React.createElement("span", null,
                                            "Already a member? ",
                                            React.createElement("a", { href: "/academy/login.html", "data-cname": "already_in_use_log_in", "test-id": "already_in_use_log_in" }, "Log in"),
                                            " instead.")));
                            })
                                .catch(function (response) {
                                if (typeof response === "string") {
                                    form.setServerErrors("phone", [response]);
                                }
                                return null;
                            });
                        },
                        hidden: function () {
                            return !_this.isUserEligibleForSmsAcquisition(reactRegApp);
                        },
                    },
                    teacherSubject: {
                        type: dynamic_form_1.QuestionType.SELECT,
                        required: true,
                        label: this.getLabel("What subject do you teach?"),
                        cname: "reg_form_teacher_subject",
                        placeholder: this.getPlaceholder(undefined),
                        pageCname: reactRegApp.processPageCnameFromQuestion("teacher_subject"),
                        continueCname: "teacherSubject",
                        messageForIsRequiredError: React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_teacher_subject_required", "test-id": "reg_error_teacher_subject_required" }, "Your answer is required"),
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        onChange: function () {
                            if (_this.shouldAutoAdvance()) {
                                reactRegApp.advancePageMaybeAsync();
                            }
                        },
                        hidden: function () {
                            return !RegTeacherUtil.shouldAskTeacherSubjectQuestion(reactRegApp.registrationData);
                        },
                        options: [
                            { value: "ENGLISH_LANGUAGE_ARTS", text: "English Language Arts" },
                            { value: "ART_MUSIC_THEATER", text: "Art / Music / Theater" },
                            { value: "SOCIAL_SCIENCES", text: "Social Sciences" },
                            { value: "MATH", text: "Math" },
                            { value: "SCIENCE", text: "Science" },
                            { value: "WORLD_LANGUAGE", text: "World Language" },
                            { value: "PROFESSIONAL_CAREER", text: "Professional Career" },
                            { value: "MULTIPLE_SUBJECTS", text: "Multiple Subjects" },
                            { value: "OTHER", text: "Other" }
                        ]
                    },
                    wantsFamilyPlan: {
                        type: !this.isUserScreenViewMobile() ? dynamic_form_1.QuestionType.SELECT : dynamic_form_1.QuestionType.RADIO,
                        required: true,
                        useDivInsteadOfLabel: !remspect.isControl("regFormRebrand"),
                        label: function () {
                            if (reactRegApp.form.isEureka) {
                                return React.createElement("span", { className: "reg-form-e2__learn-about-family-plan" },
                                    "Would you like a Family Plan?",
                                    React.createElement(eureka_design_system_1.Tooltip, { body: React.createElement(React.Fragment, null,
                                            "Link a free parent account to",
                                            React.createElement("br", null),
                                            "any student subscription to",
                                            React.createElement("br", null),
                                            "assign courses and track",
                                            React.createElement("br", null),
                                            "your student's learning."), disablePortal: true, scale: eureka_design_system_1.Tooltip.Scale.SMALL, "data-cname": "family_plan_tooltip__e2_tooltip" },
                                        React.createElement(eureka_design_system_1.MaterialIcon, { filename: "icon-info-circle-20", "data-cname": "family_plan_tooltip", "test-id": "family_plan_tooltip" })));
                            }
                            return !_this.isUserScreenViewMobile() ? React.createElement("span", null,
                                React.createElement("span", { className: "family-plan-label" }, "Would you like a Family Plan?"),
                                React.createElement(react_1.default, { content: "Link a free parent account to any student subscription to assign courses and track your student's learning." },
                                    React.createElement("div", { className: "form-group__tooltip-link", "test-id": "family_plan_tooltip", "data-cname": "family_plan_tooltip" }, "Learn about Family Plan"))) : React.createElement("span", { className: "dynamic-form__label--delighter" }, "Would you like a Family Plan?");
                        },
                        cname: "reg_form_wants_family_plan",
                        pageCname: reactRegApp.processPageCnameFromQuestion("family_plan_intent"),
                        continueCname: "familyPlan",
                        messageForIsRequiredError: "Your answer is required",
                        defaultValue: !this.isUserScreenViewMobile() ? true : undefined,
                        includePlaceholderSelectOption: false,
                        autofocus: false,
                        onChange: function () {
                            if (_this.shouldAutoAdvance()) {
                                reactRegApp.advancePageMaybeAsync();
                            }
                        },
                        hidden: function () {
                            return !RegFamilyPlanUtil.shouldAskFamilyPlanQuestion(reactRegApp.registrationData);
                        },
                        options: [
                            { value: true, text: "Yes" },
                            { value: false, text: "No" }
                        ]
                    },
                    email: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        textType: dynamic_form_1.TextType.EMAIL,
                        required: true,
                        saveTriggers: [dynamic_form_1.SaveTrigger.ON_CHANGE_WHEN_DIRTY, dynamic_form_1.SaveTrigger.ON_BLUR, dynamic_form_1.SaveTrigger.ON_ENTER_KEY],
                        autofocus: !this.isUserScreenViewMobile() || !this.isUserScreenViewMobile(),
                        label: function () { return _this.getEmailLabel(reactRegApp); },
                        placeholder: function () { return _this.getEmailPlaceholder(reactRegApp); },
                        tooltip: (!this.isUserScreenViewMobile() && remspect.isControl("regFormRebrand")) ? "Must be a valid email address. Your email will serve as your username when logging into Study.com" : undefined,
                        sublabel: (!this.isUserScreenViewMobile())
                            ? function () {
                                var _a, _b;
                                return React.createElement("span", { className: "trustText" }, ((_b = (_a = reactRegApp.form) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.wantsFamilyPlan)
                                    ? "You'll use this email to administer your student accounts."
                                    : "You'll use this email to log in.");
                            }
                            : undefined,
                        cname: "reg_form_email",
                        pageCname: reactRegApp.processPageCnameFromQuestion("email"),
                        continueCname: "email",
                        messageForIsRequiredError: React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_email_required", "test-id": "reg_error_email_required" }, !this.isUserScreenViewMobile() ? "Email is required" : "Please enter your email"),
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        validator: function (value, form, lastSaveEventType) {
                            if (!(FormConstants_1.EMAIL_REGEX.test(value))) {
                                return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_email_invalid", "test-id": "reg_error_email_invalid" }, "Email is not a valid email");
                            }
                            if (lastSaveEventType === dynamic_form_1.SaveEventType.ON_CHANGE || lastSaveEventType === dynamic_form_1.SaveEventType.UNKNOWN) {
                                return null;
                            }
                            else {
                                return ReactRegAppUtil.submitEmailForValidation(value)
                                    .then(function (r) {
                                    var _a, _b;
                                    if (((_a = r.data) === null || _a === void 0 ? void 0 : _a.emailExists) !== true) {
                                        return null;
                                    }
                                    if (!((_b = form === null || form === void 0 ? void 0 : form.values) === null || _b === void 0 ? void 0 : _b.wantsFamilyPlan)) {
                                        if (form.getDynamicFormQuestionWithKey("email").serverSideErrors.length !== 0) {
                                            return null;
                                        }
                                        return _this.emailInUseErrorElement();
                                    }
                                    return React.createElement("div", { "data-track-visible": true, "data-cname": "reg_error_email_in_use", "test-id": "reg_error_email_in_use" },
                                        "This email is already in use with a student account. In order to use this email as the parent login to your Family Plan, you need to ",
                                        React.createElement("a", { href: reactRegApp.buildFamilyPlanChangeEmailLoginUrl(), "data-cname": "reg_form_family_plan_change_email_link", "test-id": "reg_form_family_plan_change_email_link" }, "log in to your student's account and change the email."));
                                })
                                    .catch(function (response) {
                                    if (typeof response === "string") {
                                        form.setServerErrors("email", [response]);
                                    }
                                    return null;
                                });
                            }
                        }
                    },
                };
            }
        });
        Object.defineProperty(ReactRegAppUtil, "submitFieldForValidation", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, checkFunction) {
                return new Promise(function (resolve, reject) {
                    (0, mobx_1.action)(function () {
                        checkFunction(value)
                            .then(function (response) {
                            resolve(response);
                        })
                            .catch(function (response) {
                            reject(response);
                        });
                    })();
                });
            }
        });
        Object.defineProperty(ReactRegAppUtil, "submitPhoneForValidation", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value) {
                return ReactRegAppUtil.submitFieldForValidation(value, ReactRegAppUtil.checkForExistingPhone);
            }
        });
        Object.defineProperty(ReactRegAppUtil, "submitEmailForValidation", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value) {
                return ReactRegAppUtil.submitFieldForValidation(value, ReactRegAppUtil.checkForExistingEmail);
            }
        });
        Object.defineProperty(ReactRegAppUtil, "checkForExistingPhone", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value) {
                return axios_1.default.get("/member/existing-username.ajax", {
                    params: { username: value.replaceAll("-", "") }
                });
            }
        });
        Object.defineProperty(ReactRegAppUtil, "checkForExistingEmail", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value) {
                return axios_1.default.get("/member/existing-email.ajax", {
                    params: { email: value },
                    responseType: "text"
                });
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "updateFormValuesAndRegMetadata", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp, regDataValues) {
                if (!regDataValues) {
                    return;
                }
                for (var key in regDataValues) {
                    if (regDataValues[key] !== null && regDataValues[key] !== undefined && regDataValues[key] !== '') {
                        if (!reactRegApp.form.hasQuestionKey(key)) {
                            reactRegApp.regMetadata[key] = regDataValues[key];
                        }
                    }
                }
                reactRegApp.form.pages.forEach(function (page) {
                    page.questions.forEach(function (question) {
                        var key = question.key;
                        if (regDataValues[key] !== null && regDataValues[key] !== undefined && regDataValues[key] !== '') {
                            reactRegApp.form.setQuestionValue(key, regDataValues[key], true);
                        }
                    });
                });
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "setDataPropertiesFromDom", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (target) {
                var dataPrefix = "data-";
                var dataPropertiesFromDom = {};
                target.getAttributeNames().forEach(function (att) {
                    if (att.indexOf(dataPrefix) === 0) {
                        var propertyName = att.substring(dataPrefix.length);
                        dataPropertiesFromDom[propertyName] = target.getAttribute(att);
                    }
                });
                return dataPropertiesFromDom;
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "getMatchingProductKeyForSelectedTest", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (testName, strictMatch) {
                if (strictMatch === void 0) { strictMatch = false; }
                if (!testName) {
                    return undefined;
                }
                var upperCaseTestName = testName.toUpperCase();
                var upperCaseWithUnderscoresTestName = upperCaseTestName.replace(" ", "_");
                var testPrepProducts = TestPrepProductUtil_1.default.testPrepProductListValueProxy.value;
                if ((testPrepProducts === null || testPrepProducts === void 0 ? void 0 : testPrepProducts.indexOf(upperCaseWithUnderscoresTestName)) > -1) {
                    return upperCaseWithUnderscoresTestName;
                }
                else if (!!this.longTestNameProductMap[upperCaseTestName]) {
                    return this.longTestNameProductMap[upperCaseTestName];
                }
                if (strictMatch) {
                    return undefined;
                }
                for (var index in testPrepProducts) {
                    var productKey = testPrepProducts[index];
                    if (productKey.indexOf(upperCaseWithUnderscoresTestName + "_") > -1 || productKey.indexOf("_" + upperCaseWithUnderscoresTestName) > -1) {
                        return productKey;
                    }
                    else if (productKey == upperCaseWithUnderscoresTestName.replace("/", "_")) {
                        return productKey;
                    }
                }
                return undefined;
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "setTestPrepProductFromRegData", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                var state = reactRegApp.registrationData;
                if (!!state.examName) {
                    var strictMatch = true;
                    var matchingProductKey = this.getMatchingProductKeyForSelectedTest(state.examName, strictMatch);
                    if (matchingProductKey != null) {
                        reactRegApp.regMetadata.defaultProductKey = matchingProductKey;
                        state.defaultProductKey = matchingProductKey;
                        state.isSpecificTestPrep = true;
                    }
                }
                reactRegApp.regMetadata.product = RegProductDecider.determineProductFromState(state);
            }
        });
        Object.defineProperty(ReactRegAppUtil.prototype, "isTestPrepGoal", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reactRegApp) {
                var _a, _b, _c, _d;
                var userType = (_b = (_a = reactRegApp.form) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.userType;
                var goal = (_d = (_c = reactRegApp.form) === null || _c === void 0 ? void 0 : _c.values) === null || _d === void 0 ? void 0 : _d.goals;
                return ((userType === "STUDENT" && goal === "EXAM_PREP")
                    || (userType === "INSTRUCTOR" && goal === "TEACHER_CERTIFICATION"));
            }
        });
        Object.defineProperty(ReactRegAppUtil, "isNumericInput", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (e) {
                var key = e.keyCode;
                return ((key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
            }
        });
        Object.defineProperty(ReactRegAppUtil, "isModifierKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (e) {
                var key = e.keyCode;
                return (e.shiftKey === true || key === 35 || key === 36) ||
                    (key === 8 || key === 9 || key === 13 || key === 46) ||
                    (key > 36 && key < 41) ||
                    ((e.ctrlKey === true || e.metaKey === true) &&
                        (key === 65 || key === 67 || key === 86 || key === 88 || key === 90));
            }
        });
        Object.defineProperty(ReactRegAppUtil, "enforceFormat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (e) {
                if (!ReactRegAppUtil.isNumericInput(e) && !ReactRegAppUtil.isModifierKey(e)) {
                    e.preventDefault();
                }
            }
        });
        return ReactRegAppUtil;
    }());
    exports.ReactRegAppUtil = ReactRegAppUtil;
    var TestPrepDisclaimer = function () {
        return React.createElement("div", { className: "test-prep-claims-disclaimer", "test-id": "test_prep_claims_disclaimer", "data-cname": "test_prep_claims_disclaimer" },
            React.createElement("sup", null, "*"),
            "Percentages come from surveys of over 300 test prep customers");
    };
    exports.TestPrepDisclaimer = TestPrepDisclaimer;
    exports.reactRegAppUtil = new ReactRegAppUtil();
});

//# sourceMappingURL=ReactRegAppUtil.js.map

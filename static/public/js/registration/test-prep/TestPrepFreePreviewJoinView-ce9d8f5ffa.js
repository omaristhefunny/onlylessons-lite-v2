define(["require", "exports", "dashboard/DashboardAppBase", "dashboard/test-prep-experience/components/GridLayout", "eureka/EurekaButton", "mobx", "mobx-react", "react", "react", "registration/test-prep/TestPrepFreePreviewJoinStore", "registration/test-prep/TestPrepSelectExamInput", "util/InlineSvgComponents"], function (require, exports, DashboardAppBase_1, GridLayout_1, EurekaButton_1, mobx_1, mobx_react_1, React, react_1, TestPrepFreePreviewJoinStore_1, TestPrepSelectExamInput_1, InlineSvgComponents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatPhoneNumber = exports.TestPrepFreePreviewJoinView = exports.Store = void 0;
    var renderInputErrorText = function (invalidQuestion, trackError, errorText) {
        var store = React.useContext(exports.Store);
        return React.createElement("div", { className: "reg-form-error__container", "data-cname": store.getTestIdOrCnameForFormQuestion(invalidQuestion), "test-id": store.getTestIdOrCnameForFormQuestion(invalidQuestion), "data-track-visible": !!trackError },
            React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-warning-circle-outline-20.svg", className: "svg-20 input-warning-circle" }),
            React.createElement("span", { className: "eureka-input__invalid-text" }, errorText ? errorText : store.invalidQuestionSet.get(invalidQuestion)));
    };
    var FirstNameInput = (0, mobx_react_1.observer)(function () {
        var store = React.useContext(exports.Store);
        return React.createElement("div", { className: "reg-form__field" },
            React.createElement("span", { className: "reg-form__field-name" }, "First name"),
            React.createElement("input", { type: "text", placeholder: "Enter first name", "test-id": "reg_form_field_first_name", "data-cname": "reg_form_field_first_name", className: "reg-form__field-input\n\t\t\t\t\t\t  ".concat(store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.FIRST_NAME) ? "eureka-input__invalid" : ""), autoComplete: "given-name", onChange: (0, mobx_1.action)(function (e) { return store.regData.billingFirstName = e.target.value; }), value: store.regData.billingFirstName, disabled: store.isSubmitting, onBlur: function () { return store.validateInput(store.regData.billingFirstName, TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.FIRST_NAME); } }),
            store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.FIRST_NAME) && renderInputErrorText(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.FIRST_NAME));
    });
    var LastNameInput = (0, mobx_react_1.observer)(function () {
        var store = React.useContext(exports.Store);
        return React.createElement("div", { className: "reg-form__field" },
            React.createElement("span", { className: "reg-form__field-name" }, "Last name"),
            React.createElement("input", { type: "text", placeholder: "Enter last name", "test-id": "reg_form_field_last_name", "data-cname": "reg_form_field_last_name", className: "reg-form__field-input\n\t\t\t\t\t\t  ".concat(store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.LAST_NAME) ? "eureka-input__invalid" : ""), autoComplete: "family-name", value: store.regData.billingLastName, disabled: store.isSubmitting, onChange: (0, mobx_1.action)(function (e) { return store.regData.billingLastName = e.target.value; }), onBlur: function () { return store.validateInput(store.regData.billingLastName, TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.LAST_NAME); } }),
            store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.LAST_NAME) && renderInputErrorText(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.LAST_NAME));
    });
    var renderEmailExistsActiveErrorText = function () {
        var store = React.useContext(exports.Store);
        return React.createElement("div", { className: "reg-form-error__container", "data-cname": "email_address_exists_active", "test-id": "email_address_exists_active", "data-track-visible": true },
            React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-warning-circle-outline-20.svg", className: "svg-20 input-warning-circle" }),
            React.createElement("span", { className: "eureka-input__invalid-text" },
                "This email is already linked to a Study.com account. ",
                React.createElement("a", { href: store.loginUrl, "data-cname": "email_address_exists_log_in", "test-id": "email_address_exists_log_in" }, "Log\u00A0in"),
                "."));
    };
    var EmailAddressInput = (0, mobx_react_1.observer)(function () {
        var store = React.useContext(exports.Store);
        return React.createElement("div", { className: "reg-form__field" },
            React.createElement("span", { className: "reg-form__field-name" }, "Email"),
            React.createElement("input", { type: "text", inputMode: "email", placeholder: "Enter email address", "test-id": "reg_form_field_email_address", "data-cname": "reg_form_field_email_address", className: "reg-form__field-input\n\t\t\t\t\t\t  ".concat(store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.EMAIL_ADDRESS) ? "eureka-input__invalid" : ""), autoComplete: "email", value: store.regData.email, disabled: store.isSubmitting, onChange: (0, mobx_1.action)(function (e) { return store.regData.email = e.target.value; }), onBlur: function () { return store.validateEmailAddress(); } }),
            store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.EMAIL_ADDRESS)
                && store.invalidQuestionSet.get(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.EMAIL_ADDRESS) !== "Email exists - active"
                && renderInputErrorText(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.EMAIL_ADDRESS),
            store.invalidQuestionSet.get(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.EMAIL_ADDRESS) === "Email exists - active" &&
                renderEmailExistsActiveErrorText());
    });
    var PhoneNumberInput = (0, mobx_react_1.observer)(function () {
        var store = React.useContext(exports.Store);
        var handleChange = (0, mobx_1.action)(function (e) {
            store.regData.phoneNumber = (0, exports.formatPhoneNumber)(e.target.value);
        });
        var isPhoneExistsError = false;
        var phoneExistsErrorElement = React.createElement(React.Fragment, null);
        if (store.invalidQuestionSet.get(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.PHONE_NUMBER) === "Phone exists - active") {
            isPhoneExistsError = true;
            phoneExistsErrorElement =
                React.createElement(React.Fragment, null,
                    "This phone number is already linked to a Study.com account. ",
                    React.createElement("a", { href: store.loginUrl, "data-cname": "phone_number_exists_log_in", "test-id": "phone_number_exists_log_in" }, "Log\u00A0in"),
                    ".");
        }
        return (React.createElement("div", { className: "reg-form__field" },
            React.createElement("span", { className: "reg-form__field-name" }, "Phone number"),
            React.createElement("div", { className: "reg-form__field-input-wrapper" },
                React.createElement("div", { className: "reg-form__country-code" },
                    React.createElement("img", { src: "/images/registration/smsAcquisition/usa-flag.svg", className: "reg-form__flag", alt: "USA flag" }),
                    React.createElement("span", { className: "reg-form__country-code-text" }, "+1")),
                React.createElement("input", { type: "text", inputMode: "tel", placeholder: "Enter phone number", "test-id": "reg_form_field_phone_number", "data-cname": "reg_form_field_phone_number", className: "reg-form__field-input\n            ".concat(store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.PHONE_NUMBER) ? "eureka-input__invalid" : ""), autoComplete: "tel", value: store.regData.phoneNumber, disabled: store.isSubmitting, onChange: handleChange, onBlur: function () { return store.validatePhoneNumber(); } })),
            store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.PHONE_NUMBER) &&
                renderInputErrorText(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.PHONE_NUMBER, isPhoneExistsError, isPhoneExistsError ? phoneExistsErrorElement : null)));
    });
    var PasswordInput = (0, mobx_react_1.observer)(function () {
        var store = React.useContext(exports.Store);
        return React.createElement("div", { className: "reg-form__field reg-form__field__password" },
            React.createElement("span", { className: "reg-form__field-name" }, "Password"),
            React.createElement("input", { type: "password", placeholder: "Enter a secure password", "test-id": "reg_form_field_password", "data-cname": "reg_form_field_password", className: "reg-form__field-input\n\t\t\t\t\t\t  ".concat(store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.PASSWORD) ? "eureka-input__invalid" : ""), autoComplete: "new-password", value: store.regData.password, disabled: store.isSubmitting, onChange: (0, mobx_1.action)(function (e) { return store.regData.password = e.target.value; }), onBlur: function () { return store.validatePassword(); } }),
            React.createElement("span", { className: "reg-form__field-helper-text" }, "Minimum length: 8 characters"),
            store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.PASSWORD) && renderInputErrorText(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.PASSWORD));
    });
    var PasswordConfirmationInput = (0, mobx_react_1.observer)(function () {
        var store = React.useContext(exports.Store);
        return React.createElement("div", { className: "reg-form__field reg-form__field__confirm_password" },
            React.createElement("span", { className: "reg-form__field-name" }, "Confirm your password"),
            React.createElement("input", { type: "password", placeholder: "Enter a secure password", "test-id": "reg_form_field_password_confirm", "data-cname": "reg_form_field_password_confirm", autoComplete: "new-password", value: store.regData.passwordConfirm, disabled: store.isSubmitting, className: "reg-form__field-input\n\t\t\t\t\t\t  ".concat(store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.PASSWORD_CONFIRMATION) ? "eureka-input__invalid" : ""), onChange: (0, mobx_1.action)(function (e) { return store.regData.passwordConfirm = e.target.value; }), onBlur: function () { return store.validatePasswordConfirmation(); } }),
            store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.PASSWORD_CONFIRMATION) &&
                renderInputErrorText(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.PASSWORD_CONFIRMATION));
    });
    var TestPrepFreePreviewRegistrationForm = (0, mobx_react_1.observer)(function () {
        var store = React.useContext(exports.Store);
        return React.createElement("div", { className: "reg-form" },
            React.createElement("form", { className: "reg-form__main", autoComplete: "on", "data-cname": "tp_free_preview_join_form", "test-id": "tp_free_preview_join_form" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "reg-form__header" }, "Create an account to take your free practice test"),
                    React.createElement("div", { className: "reg-form__sub-header" },
                        "Already have an account? ",
                        React.createElement("a", { href: "/academy/login.html", "data-cname": "already_have_account_log_in", "test-id": "already_have_account_log_in" }, "Sign in"))),
                React.createElement("div", { className: "reg-form__info-text" }, "No commitment. No credit card."),
                React.createElement("div", { className: "reg-form__fields" },
                    React.createElement(FirstNameInput, null),
                    React.createElement(LastNameInput, null),
                    React.createElement(EmailAddressInput, null),
                    store.showPhoneNumberInput && React.createElement(PhoneNumberInput, null),
                    React.createElement(PasswordInput, null),
                    React.createElement(PasswordConfirmationInput, null)),
                store.isLoading && React.createElement(DashboardAppBase_1.LoadingDotsView, null),
                !store.isLoading && React.createElement("div", { className: "tpe-onboarding-question" },
                    React.createElement("span", { className: "tpe-onboarding-question-text" }, "Which exam are you preparing for?"),
                    React.createElement(TestPrepSelectExamInput_1.SelectExamInput, { disabled: store.isSubmitting, defaultInputValue: store.selectedCourse, clearTypeahead: function () {
                            store.regData.courseId = null;
                            store.selectedCourse = null;
                        }, onChange: (0, mobx_1.action)(function (selected) {
                            if (selected.length) {
                                store.regData.courseId = selected[0].academyAssetId;
                                store.selectedCourse = selected[0];
                            }
                            else {
                                store.regData.courseId = null;
                                store.selectedCourse = null;
                            }
                            store.validateCourseSelection();
                        }), onInputChange: function (input) {
                            if (!input) {
                                store.invalidQuestionSet.set(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.COURSE_ID, "Required");
                            }
                        }, isInputInvalid: store.invalidQuestionSet.has(TestPrepFreePreviewJoinStore_1.FreePreviewJoinFormQuestion.COURSE_ID), hiddenCourseResults: ["TOEFL iBT (2025) Study Guide and Test Prep", "TOEFL iBT (2026) Study Guide and Test Prep"] }))),
            React.createElement("div", { className: "reg-form__btn-container" },
                !store.isSubmitting && React.createElement(EurekaButton_1.EurekaButton, { buttonType: EurekaButton_1.EurekaButtonType.MANGO, onClick: function () { return store.submitForm(); }, "test-id": "reg_form_submit", "data-cname": "reg_form_submit" }, "Create account and start test"),
                store.isSubmitting && React.createElement("div", { className: "spinner-container" },
                    React.createElement(InlineSvgComponents_1.InlineSvg, { className: "spinner", src: "/images/reDesign/svg/white/spinner.svg" })),
                React.createElement("div", { className: "reg-form__disclaimers" },
                    React.createElement("div", { className: "reg-form__disclaimer" },
                        "By creating an account, you agree to Study.com's\u00A0",
                        React.createElement("a", { href: "https://study.com/pages/terms_of_use.html" }, "Terms of Use"),
                        " and\u00A0",
                        React.createElement("a", { href: "https://study.com/pages/privacy_policy.html" }, "Privacy Policy")),
                    React.createElement("div", { className: "reg-form__disclaimer" }, "By proceeding and providing your phone number, you consent to receive text messages from Study.com. Text messages may be autodialed and frequency varies. You may text stop to cancel any time."))));
    });
    var freePreviewFeatures = [
        {
            title: "Find out what to study fast",
            description: "Start with a quick diagnostic."
        },
        {
            title: "Get a plan to fit your needs",
            description: "We'll prioritize a list of topics to study."
        },
        {
            title: "Learn the right way",
            description: "Adaptive practice and short review lessons."
        }
    ];
    var TestPrepFreePreviewInfoSection = (0, mobx_react_1.observer)(function () {
        return React.createElement("div", { className: 'info-section' },
            React.createElement("h2", { className: 'info-section__header' }, "Everything you need to pass. Personalized for you."),
            React.createElement("ul", { className: 'info-section__features' }, freePreviewFeatures.map(function (feature, index) { return (React.createElement("li", { key: index, className: 'info-section__features__feature' },
                React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-check-circle-filled-20.svg", className: "icon-check-circle-filled-20--green" }),
                React.createElement("div", { className: 'info-section__text' },
                    React.createElement("h5", { className: 'info-section__text__title' }, feature.title),
                    React.createElement("div", { className: 'info-section__text__description' }, feature.description)))); })),
            React.createElement("div", { className: 'info-section__testimonial' },
                React.createElement("img", { src: "/images/teacher/teacher-in-classroom.png", alt: "Teacher in classroom", className: 'info-section__testimonial__image' }),
                React.createElement("div", { className: 'info-section__testimonial__content' },
                    React.createElement("div", { className: 'info-section__testimonial__content__quote' }, "\u201CIf you follow the guided practice, you will pass your exam. I used the study guide for 20 days, and the information aligned with my exam.\u201D"),
                    React.createElement("div", { className: 'info-section__testimonial__content__author-name' }, "Efren \u2013 Passed on first attempt"))));
    });
    exports.Store = React.createContext(null);
    exports.TestPrepFreePreviewJoinView = (0, mobx_react_1.observer)(function (params) {
        var store = (0, react_1.useMemo)(function () {
            return new TestPrepFreePreviewJoinStore_1.FreePreviewJoinStore(params);
        }, [params === null || params === void 0 ? void 0 : params.courseAaId, params === null || params === void 0 ? void 0 : params.courseTitle]);
        return React.createElement(exports.Store.Provider, { value: store },
            React.createElement("div", { className: "test-prep-free-account-form-app test-prep-free-preview-join " },
                store.canGoBack &&
                    React.createElement("div", { className: "test-prep-free-preview__back-button-container" },
                        React.createElement(EurekaButton_1.EurekaButton, { buttonType: EurekaButton_1.EurekaButtonType.TERTIARY, className: "test-prep-free-preview__back-button", onClick: function () { return store.onBack(); }, "test-id": "tp_free_preview_join_back_button", "data-cname": "tp_free_preview_join_back_button" },
                            React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-arrow-left-20.svg", className: "svg-24" }),
                            React.createElement("span", { className: "test-prep-free-preview__back-button__text" }, "Back"))),
                React.createElement(GridLayout_1.GridLayout, { className: 'form-container' },
                    React.createElement(TestPrepFreePreviewRegistrationForm, null),
                    React.createElement(TestPrepFreePreviewInfoSection, null))));
    });
    var formatPhoneNumber = function (value) {
        var sanitized = value.replace(/\D/g, "").substring(0, 10);
        var area = sanitized.substring(0, 3);
        var mid = sanitized.substring(3, 6);
        var last = sanitized.substring(6, 10);
        if (sanitized.length > 6) {
            return "".concat(area, "-").concat(mid, "-").concat(last);
        }
        if (sanitized.length > 3) {
            return "".concat(area, "-").concat(mid);
        }
        if (sanitized.length > 0) {
            return "".concat(area);
        }
        return "";
    };
    exports.formatPhoneNumber = formatPhoneNumber;
});

//# sourceMappingURL=TestPrepFreePreviewJoinView.js.map

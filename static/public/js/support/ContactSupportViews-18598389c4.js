var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
define(["require", "exports", "@study-com/dynamic-form", "components/GenericErrorBoundary", "forms/FormConstants", "lib/axios", "lib/toastr", "logging/visible/react-track-visible", "member/info/member-info.util", "mobx", "mobx-react", "react", "react-dom/client"], function (require, exports, dynamic_form_1, GenericErrorBoundary_1, FormConstants_1, axios_1, toastr, react_track_visible_1, member_info_util_1, mobx_1, mobx_react_1, React, client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ContactSupportFormView = exports.ContactSupportFormStore = void 0;
    exports.initializeComponent = initializeComponent;
    var questionCategoryOptions = [
        { value: "Account Cancellation", text: "Account Cancellation" },
        { value: "Billing Questions", text: "Billing Questions" },
        { value: "College Credit Questions", text: "College Credit Questions" },
        { value: "Find a Course", text: "Find a Course" },
        { value: "Group Plan Inquiries", text: "Group Plan Inquiries" },
        { value: "Login Issues", text: "Login Issues" },
        { value: "Make a Suggestion", text: "Make a Suggestion" },
        { value: "Membership Plans & Features", text: "Membership Plans & Features" },
        { value: "Proctored Exam Support", text: "Proctored Exam Support" },
        { value: "Registration Help", text: "Registration Help" },
        { value: "Report an Error", text: "Report an Error" },
        { value: "Request Certificate", text: "Request Certificate" },
        { value: "Teacher Feature Questions", text: "Teacher Feature Questions" },
        { value: "Technical Support", text: "Technical Support" },
        { value: "Instant Answers/Ask the Expert", text: "Instant Answers/Ask the Expert" },
        { value: "Working Scholars®", text: "Working Scholars®" },
        { value: "Other", text: "Other" }
    ];
    var membershipOptions = [
        { value: "Basic Edition", text: "Basic Edition" },
        { value: "Premium Edition", text: "Premium Edition" },
        { value: "Tutoring Edition", text: "Tutoring Edition" },
        { value: "Answers Edition", text: "Answers Edition" },
        { value: "College Saver Edition", text: "College Saver Edition" },
        { value: "Teacher Edition", text: "Teacher Edition" },
        { value: "Institution Edition", text: "Institution Edition" },
        { value: "I don't have a membership", text: "I don't have a membership" }
    ];
    var ContactSupportFormStore = (function () {
        function ContactSupportFormStore(props) {
            var _this = this;
            Object.defineProperty(this, "formStore", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "isSubmitting", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "defaultQuestionCategory", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "hideSubmitButton", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "onSubmitSuccess", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "tags", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "useCoachingText", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.defaultQuestionCategory = props.defaultQuestionCategory;
            this.hideSubmitButton = props.hideSubmitButton;
            this.tags = props.tags;
            this.useCoachingText = props.useCoachingText;
            this.formStore = this.buildFormStore();
            this.formStore.onSubmit(function () { return _this.handleFormSubmit(); });
            (0, mobx_1.makeAutoObservable)(this);
            this.onSubmitSuccess = props.onSubmitSuccess;
        }
        Object.defineProperty(ContactSupportFormStore.prototype, "handleFormSubmit", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    _this.submit();
                    resolve();
                });
            }
        });
        Object.defineProperty(ContactSupportFormStore.prototype, "submit", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                this.isSubmitting = true;
                var _a = this.formStore.values, email = _a.email, subject = _a.subject, description = _a.description, question = _a.question, file = _a.file, membership = _a.membership, phoneNumber = _a.phoneNumber;
                var formData = new FormData();
                formData.append("emailAddress", email);
                formData.append("subject", subject);
                formData.append("description", description);
                formData.append("question", question);
                formData.append("productName", membership);
                formData.append("phone", phoneNumber);
                if (file) {
                    formData.append("screenshot", file);
                }
                if (this.tags) {
                    formData.append("tags", this.tags);
                }
                axios_1.default.post("/contact/contact-support.ajax", formData)
                    .then(function (res) {
                    if (res.data.error != null) {
                        toastr.error(res.data.error);
                    }
                    else {
                        if (_this.onSubmitSuccess) {
                            _this.onSubmitSuccess();
                        }
                        else {
                            window.location.href = "/contact/thankYou.html";
                        }
                    }
                })
                    .catch(function () {
                    toastr.error("An error occurred. Please try again or call customer support.");
                })
                    .finally((0, mobx_1.action)(function () {
                    _this.isSubmitting = false;
                }));
            }
        });
        Object.defineProperty(ContactSupportFormStore.prototype, "buildFormStore", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var _a;
                var page = ["subject", "description", "file", "question", "phoneNumber"];
                if (!member_info_util_1.MemberInfoUtil.instance().memberInfo.isLoggedIn) {
                    page = ["email", "subject", "description", "file", "question", "membership", "phoneNumber"];
                }
                var formConfig = {
                    questions: this.contactSupportFormQuestions,
                    layout: {
                        pages: [page],
                        controls: function () { return (React.createElement(React.Fragment, null, !_this.hideSubmitButton &&
                            React.createElement("button", { type: "submit", className: "dynamic-form__submit btn btn-default", "test-id": "contact_support_form__submit_btn", "data-cname": "contact_support_form__submit_btn", disabled: _this.isSubmitting || !_this.isFormValid }, "Submit"))); },
                    }
                };
                return new dynamic_form_1.DynamicFormStore(__assign(__assign({}, formConfig), { config: {
                        questionRefFn: react_track_visible_1.trackingRef,
                        initial: {
                            question: (_a = this.defaultQuestionCategory) !== null && _a !== void 0 ? _a : undefined
                        },
                        skipInitial: false
                    } }));
            }
        });
        Object.defineProperty(ContactSupportFormStore.prototype, "contactSupportFormQuestions", {
            get: function () {
                var _this = this;
                return {
                    email: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        textType: dynamic_form_1.TextType.EMAIL,
                        label: "Your email address",
                        required: true,
                        messageForIsRequiredError: "Please enter your email address",
                        cname: "contact_support_form__email",
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        validator: function (value) { return FormConstants_1.EMAIL_REGEX.test(value) ? null : "Invalid email address"; }
                    },
                    subject: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        textType: dynamic_form_1.TextType.TEXT,
                        label: "Subject",
                        required: true,
                        messageForIsRequiredError: "Please enter a subject",
                        cname: "contact_support_form__subject",
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        validator: function (value) { return value.length >= 3 ? null : "Invalid subject"; }
                    },
                    description: {
                        type: dynamic_form_1.QuestionType.TEXTAREA,
                        label: "Describe your ".concat(!this.useCoachingText ? "problem/" : "", "question"),
                        required: true,
                        messageForIsRequiredError: "Please enter a description of your  ".concat(!this.useCoachingText ? "problem/" : "", "question"),
                        cname: "contact_support_form__description",
                        rows: 6,
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        validator: function (value) { return value.length >= 10 ? null : "Invalid description"; },
                    },
                    file: {
                        type: dynamic_form_1.QuestionType.CUSTOM,
                        label: "Attach a file regarding your ".concat(!this.useCoachingText ? "problem/" : "", "question"),
                        required: false,
                        cname: "contact_support_form__file",
                        body: function (form) {
                            return (React.createElement("input", { type: "file", name: "screenshot", id: "ticket_file", className: "original_input", onChange: function (event) {
                                    var _a;
                                    var file = ((_a = event.target.files) === null || _a === void 0 ? void 0 : _a.length) ? event.target.files[0] : undefined;
                                    form.setQuestionValue("file", file);
                                } }));
                        }
                    },
                    question: {
                        type: dynamic_form_1.QuestionType.SELECT,
                        label: "What is your ".concat(!this.useCoachingText ? "problem/" : "", "question regarding?"),
                        required: true,
                        placeholder: "Select one",
                        messageForIsRequiredError: "Please select a category for your ".concat(!this.useCoachingText ? "problem/" : "", "question"),
                        cname: "contact_support_form__question",
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        options: questionCategoryOptions
                    },
                    membership: {
                        type: dynamic_form_1.QuestionType.SELECT,
                        label: "What type of membership plan do you have?",
                        required: true,
                        messageForIsRequiredError: "Please select your membership plan",
                        cname: "contact_support_form__membership",
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        options: membershipOptions
                    },
                    phoneNumber: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        textType: dynamic_form_1.TextType.TEL,
                        required: true,
                        label: "What is your phone number?",
                        placeholder: "555-555-5555",
                        cname: "contact_support_form__phone_number",
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        validator: function (value) { return _this.isPhoneNumberValid(value) ? null : "Invalid phone number"; }
                    }
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ContactSupportFormStore.prototype, "isPhoneNumberValid", {
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
        Object.defineProperty(ContactSupportFormStore.prototype, "isFormValid", {
            get: function () {
                return this.formStore.hasNoErrors && this.formStore.valid;
            },
            enumerable: false,
            configurable: true
        });
        return ContactSupportFormStore;
    }());
    exports.ContactSupportFormStore = ContactSupportFormStore;
    function initializeComponent(element, props) {
        var store = new ContactSupportFormStore(props);
        var root = (0, client_1.createRoot)(element);
        root.render(React.createElement(GenericErrorBoundary_1.GenericErrorBoundaryView, null,
            React.createElement(exports.ContactSupportFormView, { store: store })));
    }
    exports.ContactSupportFormView = (0, mobx_react_1.observer)((function (_super) {
        __extends(ContactSupportFormView, _super);
        function ContactSupportFormView(props) {
            return _super.call(this, props) || this;
        }
        Object.defineProperty(ContactSupportFormView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var props = this.props;
                return (React.createElement("div", { className: "formContainer contact-support-form__container" },
                    React.createElement(dynamic_form_1.DynamicFormView, { store: props.store.formStore })));
            }
        });
        return ContactSupportFormView;
    }(React.Component)));
});

//# sourceMappingURL=ContactSupportViews.js.map

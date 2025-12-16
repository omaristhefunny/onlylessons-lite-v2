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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "dashboard/test-prep-experience/components/toast/ToastStore", "forms/FormConstants", "lib/axios", "mobx", "registration/ReactRegAppUtil"], function (require, exports, ToastStore_1, FormConstants_1, axios_1, mobx_1, ReactRegAppUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FreePreviewJoinStore = exports.FreePreviewJoinFormQuestion = void 0;
    var FreePreviewJoinFormQuestion;
    (function (FreePreviewJoinFormQuestion) {
        FreePreviewJoinFormQuestion["FIRST_NAME"] = "first_name";
        FreePreviewJoinFormQuestion["LAST_NAME"] = "last_name";
        FreePreviewJoinFormQuestion["EMAIL_ADDRESS"] = "email_address";
        FreePreviewJoinFormQuestion["PHONE_NUMBER"] = "phone_number";
        FreePreviewJoinFormQuestion["PASSWORD"] = "password";
        FreePreviewJoinFormQuestion["PASSWORD_CONFIRMATION"] = "password_confirmation";
        FreePreviewJoinFormQuestion["COURSE_ID"] = "courseId";
    })(FreePreviewJoinFormQuestion || (exports.FreePreviewJoinFormQuestion = FreePreviewJoinFormQuestion = {}));
    var FreePreviewJoinStore = (function () {
        function FreePreviewJoinStore(params) {
            var _this = this;
            Object.defineProperty(this, "invalidQuestionSet", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: new Map()
            });
            Object.defineProperty(this, "regData", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {
                    billingFirstName: null,
                    billingLastName: null,
                    courseId: null,
                    email: null,
                    phoneNumber: null,
                    password: null,
                    passwordConfirm: null
                }
            });
            Object.defineProperty(this, "selectedCourse", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            });
            Object.defineProperty(this, "isInternational", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "isLoading", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "isSubmitting", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "onBack", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            if (params === null || params === void 0 ? void 0 : params.firstName) {
                this.regData.billingFirstName = params.firstName;
            }
            if (params === null || params === void 0 ? void 0 : params.lastName) {
                this.regData.billingLastName = params.lastName;
            }
            if (params === null || params === void 0 ? void 0 : params.emailAddress) {
                this.regData.email = params.emailAddress;
                this.validateEmailAddress();
            }
            if (params === null || params === void 0 ? void 0 : params.phoneNumber) {
                this.regData.phoneNumber = params.phoneNumber;
                this.validatePhoneNumber();
            }
            if (params === null || params === void 0 ? void 0 : params.password) {
                this.regData.password = params.password;
                this.validatePassword();
            }
            if (params === null || params === void 0 ? void 0 : params.passwordConfirm) {
                this.regData.passwordConfirm = params.passwordConfirm;
                this.validatePasswordConfirmation();
            }
            if (params === null || params === void 0 ? void 0 : params.onBack) {
                this.onBack = params.onBack;
            }
            if (params === null || params === void 0 ? void 0 : params.isInternational) {
                this.isInternational = params.isInternational;
            }
            this.initRegDataFromParams();
            (0, mobx_1.makeAutoObservable)(this);
            this.initRegSaveEvents();
            if ((params === null || params === void 0 ? void 0 : params.courseAaId) && (params === null || params === void 0 ? void 0 : params.courseTitle)) {
                this.selectedCourse = {
                    aaId: params.courseAaId,
                    title: params.courseTitle,
                };
                this.regData.courseId = params.courseAaId;
            }
            else {
                this.isLoading = true;
                axios_1.default.get('/academy/test-prep/last-visited-course.ajax')
                    .then((0, mobx_1.action)(function (res) {
                    var _a, _b;
                    if (((_a = res.data) === null || _a === void 0 ? void 0 : _a.academyAssetId) && ((_b = res.data) === null || _b === void 0 ? void 0 : _b.title)) {
                        _this.selectedCourse = {
                            aaId: res.data.academyAssetId,
                            title: res.data.title,
                        };
                        _this.regData.courseId = res.data.academyAssetId;
                    }
                }))
                    .finally((0, mobx_1.action)(function () {
                    _this.isLoading = false;
                }));
            }
        }
        Object.defineProperty(FreePreviewJoinStore.prototype, "initRegDataFromParams", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var dataElement = document.querySelector("#tpFreePreviewRegData");
                if (dataElement != null) {
                    var billingFirstName = dataElement.getAttribute("data-first-name");
                    this.regData.billingFirstName = billingFirstName ? billingFirstName : null;
                    var billingLastName = dataElement.getAttribute("data-last-name");
                    this.regData.billingLastName = billingLastName ? billingLastName : null;
                    var emailAddress = dataElement.getAttribute("data-email-address");
                    this.regData.email = emailAddress ? emailAddress : null;
                    if (emailAddress) {
                        this.validateEmailAddress();
                    }
                    var phoneNumber = dataElement.getAttribute("data-phone-number");
                    this.regData.phoneNumber = phoneNumber ? phoneNumber : null;
                }
            }
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "initRegSaveEvents", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                (0, mobx_1.autorun)(function () {
                    ReactRegAppUtil_1.reactRegAppUtil.saveValues(ReactRegAppUtil_1.reactRegAppUtil.obscureSensitiveRegistrationDataFields(__assign({}, _this.regData)));
                }, {
                    delay: 500,
                });
            }
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "getTestIdOrCnameForFormQuestion", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (formQuestion) {
                return formQuestion.toString() + "_" + this.invalidQuestionSet.get(formQuestion).toLowerCase().split(' ').join('_');
            }
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "validateInput", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (inputValue, inputType) {
                if (!inputValue) {
                    this.invalidQuestionSet.set(inputType, "Required");
                }
                else {
                    this.invalidQuestionSet.delete(inputType);
                }
            }
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "validatePhoneNumber", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (!this.regData.phoneNumber) {
                    this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.PHONE_NUMBER, "Required");
                    return;
                }
                if (!FormConstants_1.BASIC_PHONE_REGEX.test(this.regData.phoneNumber)) {
                    this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.PHONE_NUMBER, "Phone number is not a valid phone number");
                    return;
                }
                var digits = this.regData.phoneNumber.replace(/\D/g, '').length;
                if (digits < 10 || digits > 16) {
                    this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.PHONE_NUMBER, "Phone number is not a valid phone number");
                    return;
                }
                else {
                    this.invalidQuestionSet.delete(FreePreviewJoinFormQuestion.PHONE_NUMBER);
                }
                axios_1.default.get('/academy/test-prep/join/does-account-exist-for-phone-number.ajax', { params: { phoneNumber: this.regData.phoneNumber } })
                    .then((0, mobx_1.action)(function (response) {
                    if (response.data) {
                        _this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.PHONE_NUMBER, "Phone exists - active");
                    }
                }));
            }
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "validateEmailAddress", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (!this.regData.email) {
                    this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.EMAIL_ADDRESS, "Required");
                }
                else if (!FormConstants_1.EMAIL_REGEX.test(this.regData.email)) {
                    this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.EMAIL_ADDRESS, "Email is not a valid email");
                }
                else {
                    this.invalidQuestionSet.delete(FreePreviewJoinFormQuestion.EMAIL_ADDRESS);
                }
                axios_1.default.get('/academy/test-prep/join/does-account-exist-for-email.ajax', { params: { emailAddress: this.regData.email } })
                    .then((0, mobx_1.action)(function (response) {
                    if (response.data) {
                        _this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.EMAIL_ADDRESS, "Email exists - active");
                    }
                }));
            }
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "validatePassword", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.regData.password == null) {
                    this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.PASSWORD, "Required");
                }
                else if (this.regData.password.length < 8) {
                    this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.PASSWORD, "Password must be at least 8 characters long");
                }
                else {
                    this.invalidQuestionSet.delete(FreePreviewJoinFormQuestion.PASSWORD);
                }
            }
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "validatePasswordConfirmation", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.regData.passwordConfirm == null) {
                    this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.PASSWORD_CONFIRMATION, "Required");
                }
                else if (this.regData.passwordConfirm.length < 8) {
                    this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.PASSWORD_CONFIRMATION, "Password must be at least 8 characters long");
                }
                else if (this.regData.password != this.regData.passwordConfirm) {
                    this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.PASSWORD_CONFIRMATION, "Passwords do not match");
                }
                else {
                    this.invalidQuestionSet.delete(FreePreviewJoinFormQuestion.PASSWORD_CONFIRMATION);
                }
            }
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "validateCourseSelection", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.selectedCourse) {
                    this.invalidQuestionSet.set(FreePreviewJoinFormQuestion.COURSE_ID, "Required");
                }
                else {
                    this.invalidQuestionSet.delete(FreePreviewJoinFormQuestion.COURSE_ID);
                }
            }
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "validateForm", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.validateInput(this.regData.billingFirstName, FreePreviewJoinFormQuestion.FIRST_NAME);
                this.validateInput(this.regData.billingLastName, FreePreviewJoinFormQuestion.LAST_NAME);
                this.validatePassword();
                this.validatePasswordConfirmation();
                this.validatePhoneNumber();
                this.validateEmailAddress();
                this.validateCourseSelection();
            }
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "submitForm", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.isSubmitting = true;
                                return [4, this.validateForm()];
                            case 1:
                                _a.sent();
                                if (this.invalidQuestionSet.size) {
                                    this.isSubmitting = false;
                                    return [2, Promise.resolve()];
                                }
                                return [2, axios_1.default.post('/academy/test-prep/join.ajax', (0, mobx_1.toJS)(this.regData), {
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                        transformRequest: [function (data) { return new URLSearchParams(data).toString(); }]
                                    })
                                        .then(function (data) {
                                        window.location.href = data.data.redirectUrl;
                                    })
                                        .catch((0, mobx_1.action)(function (exception) {
                                        var _a;
                                        if ((_a = exception === null || exception === void 0 ? void 0 : exception.response) === null || _a === void 0 ? void 0 : _a.data) {
                                            ToastStore_1.default.showToast(ToastStore_1.ToastType.ERROR, "Error", "Oops! Something went wrong. Please try again later.");
                                        }
                                    }))
                                        .finally((0, mobx_1.action)(function () {
                                        _this.isSubmitting = false;
                                    }))];
                        }
                    });
                });
            }
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "loginUrl", {
            get: function () {
                var params = "";
                if (!!this.regData.email) {
                    params = "?email=" + this.regData.email;
                }
                return "/academy/login.html" + params;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "canGoBack", {
            get: function () {
                return !!this.onBack;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FreePreviewJoinStore.prototype, "showPhoneNumberInput", {
            get: function () {
                return !this.isInternational;
            },
            enumerable: false,
            configurable: true
        });
        return FreePreviewJoinStore;
    }());
    exports.FreePreviewJoinStore = FreePreviewJoinStore;
});

//# sourceMappingURL=TestPrepFreePreviewJoinStore.js.map

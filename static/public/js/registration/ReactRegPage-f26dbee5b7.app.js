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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports", "@sites-study-com/remspect", "@sites-study-com/ssr-test-prep", "@study-com/dynamic-form", "@study-com/eureka-design-system", "@tippyjs/react", "academy/collegeAccelerator/CXSchoolUtil", "card-validator", "components/GenericErrorBoundary", "eureka/EurekaButton", "forms/FormConstants", "jquery", "lib/moment", "logging/visible/react-track-visible", "member/info/member-info.util", "mobx", "mobx-react", "notification/remilonNotification", "react", "react", "react-dom/client", "registration/AccountRegistrationService", "registration/college-saver/CxCourseStickyBar", "registration/college-saver/MajorUtil", "registration/product-map.util", "registration/ReactRegAppUtil", "registration/RegDOMDataUtil", "registration/RegFaqViews", "registration/RegFormConstants", "registration/RegPaymentMethodTabsViews", "registration/RegProductDecider", "registration/RegProductModalSwitcher", "registration/RegSidebarViews", "registration/SinglePageRegView", "registration/test-prep/TestPrepFreeAccountCtaModalUtil", "registration/TestPrepFreePreviewRegistrationViews", "school-class/SchoolClassUtil", "testPrep/TestPrepConstants", "testPrep/TestPrepProductUtil", "util/window-location.service", "./college-saver/CxCourseSelector", "lib/jquery/cookie"], function (require, exports, remspect, ssr_test_prep_1, dynamic_form_1, eureka_design_system_1, react_1, CXSchoolUtil, card_validator_1, GenericErrorBoundary_1, EurekaButton_1, FormConstants_1, $, moment, react_track_visible_1, member_info_util_1, mobx_1, mobx_react_1, notifications, React, react_2, client_1, AccountRegistrationService_1, CxCourseStickyBar_1, MajorUtil_1, product_map_util_1, ReactRegAppUtil_1, RegDOMDataUtil, RegFaqViews_1, RegFormConstants_1, RegPaymentMethodTabsViews_1, RegProductDecider, RegProductModalSwitcher_1, RegSidebarViews_1, SinglePageRegView_1, TestPrepFreeAccountCtaModalUtil_1, TestPrepFreePreviewRegistrationViews_1, SchoolClassUtil_1, TestPrepConstants_1, TestPrepProductUtil_1, WindowLocationService, CxCourseSelector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BillingPageControls = exports.SecuritySeal = exports.RegFormTooltip = exports.ReactRegPageApp = void 0;
    exports.initReactRegPageApp = initReactRegPageApp;
    function initReactRegPageApp() {
        var app = new ReactRegPageApp();
        app.init();
    }
    var ReactRegPageApp = (function () {
        function ReactRegPageApp() {
            var _this = this;
            Object.defineProperty(this, "admissionsLandingPage", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "applyingCouponState", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "coupon", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "couponValidationError", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "customViewRefExpirationDate", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: React.createRef()
            });
            Object.defineProperty(this, "dataFromReactElement", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
            Object.defineProperty(this, "form", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "initialProductKey", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "isAppReg", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "isAudioReg", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "isCXPartnerStudent", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "isDesktop", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "isInterstitialOverlayOpen", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "isVideoCurtainSegmenterReg", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "memberInfoUtil", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: member_info_util_1.MemberInfoUtil.instance()
            });
            Object.defineProperty(this, "paidTrialAddonKey", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "paidTrialDays", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "paidTrialPrice", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "paidTrialVariation", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "product", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "productMap", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "productMapUtil", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: product_map_util_1.ProductMapUtil.instance()
            });
            Object.defineProperty(this, "referred", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "regMetadata", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
            Object.defineProperty(this, "relatedMonthlyProduct", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            });
            Object.defineProperty(this, "scoreBasedProducts", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            Object.defineProperty(this, "shouldPreventCouponEdit", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "showAnnualToggle", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "showCouponCodeInput", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "showPaypalButton", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "submittingPaypal", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "userRelief", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "validCoupon", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "isReferFriendAmazon", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "productBeforeTestMatch", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "cxPlannedSchoolNotSure", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "cxSlimCourseList", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            Object.defineProperty(this, "cxCourseIdListNotSure", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "majorNotSure", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "longTestNameProductMap", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            (0, mobx_1.makeAutoObservable)(this, {
                "customViewRefExpirationDate": false
            });
            TestPrepProductUtil_1.default.getScoreBasedProductList().then((0, mobx_1.action)(function (value) { return _this.scoreBasedProducts = value; }));
            TestPrepProductUtil_1.default.testPrepProductListValueProxy.getValue();
            var accountRegistrationService = AccountRegistrationService_1.AccountRegistrationService.instance();
            accountRegistrationService.braintreeClient().then(function (braintreeClient) {
                if (AccountRegistrationService_1.AccountRegistrationService.canUseApplePay()) {
                    accountRegistrationService.initApplePayClientInstanceAndClickHandler(braintreeClient, function (applePayInstance) { return _this.initApplePayClickHandler(applePayInstance); });
                }
            });
            this.longTestNameProductMap = {
                "LIFE & HEALTH INSURANCE SALES": "LIFE_HEALTH_INSURANCE_SALES",
                "CNA FLORIDA": "CNA_FL",
                "CNA NEW YORK": "CNA_NY",
                "CNA TEXAS": "CNA_TX",
                "LITERACY AND NUMERACY INITIAL TEACHER EDUCATION": "LITERACY_NUMERACY_INIT_TEACHER_ED",
                "ANCC FAMILY NURSE PRACTITIONER": "ANCC_FAMILY_NURSE_PRACTITIONER",
                "ANCC GERONTOLOGICAL NURSING": "ANCC_GERONTOLOGY_NURSING",
                "ANCC ADULT GERONTOLOGY ACUTE NURSE CARE": "ANCC_GERONTOLOGY_ACUTE_NURSE_CARE",
                "ANCC ADULT GERONTOLOGY PRIMARY NURSE CARE": "ANCC_GERONTOLOGY_PRIMARY_NURSE_CARE",
                "KAPLAN NURSING ENTRANCE": "KAPLAN_NURSING_ENTRANCE",
                "PA KEYSTONE EXAMS": "PA_KEYSTONE"
            };
        }
        Object.defineProperty(ReactRegPageApp.prototype, "getBraintreePaypalClient", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                AccountRegistrationService_1.AccountRegistrationService.instance().braintreePaypalClient(this.rawRegistrationData, this.form, this);
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "initApplePayClickHandler", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (applePayInstance) {
                var _this = this;
                $("body").on("click", "[data-apple-pay-click]", function () {
                    var estimatedPrice = _this.getEstimatedTotalPrice();
                    var paymentRequest;
                    paymentRequest = applePayInstance.createPaymentRequest({
                        total: {
                            label: 'Study.com',
                            amount: estimatedPrice
                        }
                    });
                    var session = new ApplePaySession(3, paymentRequest);
                    session.onvalidatemerchant = function (event) {
                        return applePayInstance.performValidation({
                            validationURL: event.validationURL,
                            displayName: 'Study.com'
                        }).then(function (merchantSession) {
                            return session.completeMerchantValidation(merchantSession);
                        }).catch(function (validationErr) {
                            console.error('Error validating merchant:', validationErr);
                            return session.abort();
                        });
                    };
                    session.onpaymentauthorized = function (event) {
                        console.log('Your shipping address is:', event.payment.shippingContact);
                        return applePayInstance.tokenize({
                            token: event.payment.token
                        }).then(function (payload) {
                            console.log('nonce:', payload.nonce);
                            var data = _this.rawRegistrationData;
                            data.verificationToken = payload.nonce;
                            data.token = payload.nonce;
                            data.paymentMethod = "BRAINTREE";
                            data.paymentGateway = "BRAINTREE";
                            data.paymentType = "APPLE_PAY";
                            var preprocessedData = _this.preprocessRegFormData(data);
                            AccountRegistrationService_1.AccountRegistrationService.instance().postRegistration(preprocessedData).then(function (response) {
                                _this.handleFormSubmitResponse(response);
                            });
                            session.completePayment(ApplePaySession.STATUS_SUCCESS);
                        }).catch(function (tokenizeErr) {
                            console.error('Error tokenizing Apple Pay:', tokenizeErr);
                            session.completePayment(ApplePaySession.STATUS_FAILURE);
                        });
                    };
                    session.begin();
                });
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "registrationData", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.registrationData(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "rawRegistrationData", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.rawRegistrationData(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "shouldShowAnswersSidebar", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.shouldShowAnswersSidebar(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "studyAnswerRelatedConceptName", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.studyAnswerRelatedConceptName(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "shouldShowTrackingPixels", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.shouldShowTrackingPixels(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "shouldShowFamilyPlanQuestion", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.shouldShowFamilyPlanQuestion(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "advancePageMaybeAsync", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.advancePageMaybeAsync(this);
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "regModalQuestions", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.regModalQuestions(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "regModalPageListDef", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.regModalPageListDef();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "askedQuestion", {
            get: function () {
                return this.dataFromReactElement["asked-question"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "lastViewedStudyAnswerTitle", {
            get: function () {
                return this.dataFromReactElement["last-viewed-study-answer-title"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "lastViewedCourseId", {
            get: function () {
                return this.dataFromReactElement["last-viewed-course-id"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isSeo", {
            get: function () {
                return this.dataFromReactElement["is-seo"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "lastViewedStudyAnswerCategory", {
            get: function () {
                return this.dataFromReactElement["last-viewed-study-answer-category"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "paidTrialMessagingEligible", {
            get: function () {
                return !!this.paidTrialPrice;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isAnswersRegFlow", {
            get: function () {
                return this.dataFromReactElement["is-answers-reg-flow"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "gsCourseTitle", {
            get: function () {
                return this.dataFromReactElement["google-shopping-course-title"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "priceString", {
            get: function () {
                return this.dataFromReactElement["price-string"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "originalPriceString", {
            get: function () {
                return this.dataFromReactElement["original-price-string"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "discount", {
            get: function () {
                return this.dataFromReactElement["discount"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "prefillCouponCode", {
            get: function () {
                return this.dataFromReactElement["prefill-coupon-code"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "adkey", {
            get: function () {
                return this.dataFromReactElement["ad-key"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "testPrepProductType", {
            get: function () {
                return this.dataFromReactElement["test-prep-product-type"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isLocationEligibleForSchoolClassQuestions", {
            get: function () {
                return this.dataFromReactElement["is-location-eligible-for-school-class-questions"] === "true";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "lastViewedPartnerPageCompanyName", {
            get: function () {
                return this.dataFromReactElement["last-viewed-partner-page-company-name"];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "hasAlreadyIndicatedSchool", {
            get: function () {
                var _a, _b, _c, _d;
                var hasTransferSchool = (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.hasTransferSchool;
                var hasIndicatedTransferSchool = hasTransferSchool !== undefined;
                var needsToIndicateSchool = false;
                if (hasIndicatedTransferSchool) {
                    needsToIndicateSchool = hasTransferSchool ? ((_d = (_c = this.form) === null || _c === void 0 ? void 0 : _c.values) === null || _d === void 0 ? void 0 : _d.cxPlannedSchoolCompanyId) === undefined : false;
                }
                return (this.isCXPartnerStudent && !!this.regMetadata.cxPlannedSchoolCompanyId) || (hasIndicatedTransferSchool && !needsToIndicateSchool);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "hasAlreadyIndicatedMajor", {
            get: function () {
                var queryString = window.location.search;
                var urlParams = new URLSearchParams(queryString);
                return !!urlParams.get("majorId");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isInHighIntentSinglePageCheckoutAnyVariation", {
            get: function () {
                var queryString = window.location.search;
                var urlParams = new URLSearchParams(queryString);
                return !!urlParams.get("singlePage");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isInHighIntentSinglePageCheckoutNovemberExpanded", {
            get: function () {
                var queryString = window.location.search;
                var urlParams = new URLSearchParams(queryString);
                return urlParams.get("singlePage") === "expanded";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isInHighIntentSinglePageCheckoutNovemberProgressive", {
            get: function () {
                var queryString = window.location.search;
                var urlParams = new URLSearchParams(queryString);
                return urlParams.get("singlePage") === "progressive";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "endPaidTrialDate", {
            get: function () {
                return moment().add(this.paidTrialDays, "days");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isFamilyPlanAdminWithoutSubscription", {
            get: function () {
                return this.memberInfoUtil.memberInfo.accountType === "FAMILY_PLAN_ADMIN";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isPaidTrialEligible", {
            get: function () {
                return this.memberInfoUtil.memberInfo.isPaidTrialEligible;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "endTrialDate", {
            get: function () {
                if (this.coupon) {
                    return moment().add(this.coupon.trialDays, "days");
                }
                if (this.product) {
                    return moment().add(this.product.defaultTrialDays, "days");
                }
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "loadDataFromUrlParams", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (regDataValues) {
                var _a;
                var queryString = window.location.search;
                var urlParams = new URLSearchParams(queryString);
                var regularParamList = ["email", "userType", "goals", "billingAddressCountry", "billingFirstName", "billingLastName",
                    "phoneNumber", "subjectSilo", "couponCode", "phoneSms"];
                for (var _i = 0, regularParamList_1 = regularParamList; _i < regularParamList_1.length; _i++) {
                    var key = regularParamList_1[_i];
                    var param = urlParams.get(key);
                    if (param) {
                        regDataValues[key] = param;
                    }
                }
                var product = urlParams.get("product");
                if (product && !regDataValues.productKeyOverride) {
                    regDataValues.product = product;
                }
                var zipcode = urlParams.get("zipcode");
                if (zipcode) {
                    regDataValues.billingAddressZipCode = zipcode;
                }
                var error = urlParams.get("err");
                if (error) {
                    notifications.error("An error occurred during registration. Please try again in a moment or contact customer support.");
                }
                var wantsFamilyPlan = urlParams.get("wantsFamilyPlan");
                if (wantsFamilyPlan) {
                    regDataValues.wantsFamilyPlan = wantsFamilyPlan == "true";
                }
                this.setBooleanPropertyIfPresent("showAnnualToggle", urlParams.get("showAnnualToggle"));
                this.setBooleanPropertyIfPresent("isAppReg", urlParams.get("app"));
                this.setBooleanPropertyIfPresent("isAudioReg", urlParams.get("audio"));
                if (urlParams.get("from") === "video") {
                    this.isVideoCurtainSegmenterReg = true;
                }
                var plannedTransferUniversity = urlParams.get("plannedTransferUniversity");
                if (plannedTransferUniversity) {
                    regDataValues.cxPlannedSchoolCompanyId = undefined;
                    regDataValues.cxPlannedSchool = plannedTransferUniversity;
                    this.dataFromReactElement["last-viewed-partner-page-company-name"] = plannedTransferUniversity;
                }
                var googleShoppingCourseId = urlParams.get("gsc");
                if (googleShoppingCourseId) {
                    this.regMetadata.isNonRecurring = true;
                    this.regMetadata.billingInterval = 12;
                }
                this.userRelief = !!urlParams.get("userRelief");
                this.shouldPreventCouponEdit = this.userRelief;
                if (((_a = regDataValues.product) === null || _a === void 0 ? void 0 : _a.indexOf("TEACHER")) >= 0 && regDataValues.product !== "LITERACY_NUMERACY_INIT_TEACHER_ED") {
                    regDataValues.userType = "INSTRUCTOR";
                }
                var majorId = urlParams.get("majorId");
                if (majorId) {
                    this.form.setQuestionValue("majorId", parseInt(majorId));
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "loadDataFromCookies", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (regDataValues) {
                var emailValueFromCookie = $.cookie("sscst");
                if (emailValueFromCookie) {
                    regDataValues.email = emailValueFromCookie;
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "setBooleanPropertyIfPresent", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (propertyName, value) {
                if (value) {
                    this[propertyName] = value === "true";
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "init", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                this.setupResponsiveMql();
                this.form = this.buildFormStore();
                this.form.onSubmit(function () { return _this.submitRegPage(); });
                var target = document.getElementById("regPageGoHere");
                this.setDataPropertiesFromDom(target);
                if (!remspect.isControl("regFormRebrand")) {
                    (0, mobx_1.runInAction)(function () {
                        _this.form.isEureka = true;
                    });
                }
                var initialRegData = RegDOMDataUtil.loadRegDataValuesFromDOM();
                var testNameFromDOM = RegDOMDataUtil.loadDataFromSpecificTestPrepElement();
                if (testNameFromDOM) {
                    initialRegData.testName = testNameFromDOM;
                }
                this.loadDataFromUrlParams(initialRegData);
                if (initialRegData.product === "TUTORING") {
                    initialRegData.product = "PREMIUM";
                }
                if (this.regMetadata.isSpecificTestPrep) {
                    this.registrationData.userType = "STUDENT";
                    this.registrationData.goals = "EXAM_PREP";
                }
                this.loadDataFromCookies(initialRegData);
                this.isCXPartnerStudent = this.lastViewedPartnerPageCompanyName && this.isProductCX(initialRegData.product);
                if (this.isCXPartnerStudent) {
                    initialRegData.cxPlannedSchool = this.lastViewedPartnerPageCompanyName;
                    var _kiq = window._kiq = window._kiq || [];
                    _kiq.push(['set', { 'partnerTraffic': true }]);
                }
                if (this.prefillCouponCode) {
                    initialRegData.couponCode = this.prefillCouponCode;
                    if (!this.userRelief) {
                        this.showCouponCodeInput = true;
                    }
                    this.applyCoupon();
                }
                this.updateFormValuesAndRegMetadata(initialRegData);
                if (this.regMetadata.product) {
                    this.initialProductKey = this.regMetadata.product;
                }
                if (this.isCXPartnerStudent) {
                    CXSchoolUtil.searchCXSchoolsByName(this.lastViewedPartnerPageCompanyName)
                        .then(function (schools) {
                        if ((schools === null || schools === void 0 ? void 0 : schools[0]) && schools[0].companyName === _this.lastViewedPartnerPageCompanyName) {
                            _this.regMetadata.cxPlannedSchool = schools[0].companyName;
                            _this.regMetadata.cxPlannedSchoolCompanyId = schools[0].companyId;
                            _this.regMetadata.cxPlannedSchoolLogoUrl = schools[0].regFormLogoUrl;
                            _this.regMetadata.cxPlannedSchoolSupportsCollegeConnect = schools[0].enableCollegeConnect;
                            _this.registrationData.cxPlannedSchoolCompanyId = schools[0].companyId;
                            CXSchoolUtil.getAdmissionsLandingPage(_this.regMetadata.cxPlannedSchoolCompanyId)
                                .then(function (admissionsLandingPage) { return _this.admissionsLandingPage = admissionsLandingPage; });
                        }
                    })
                        .catch(function (reason) { });
                }
                if (this.lastViewedCourseId) {
                    this.regMetadata.cxCourseIdList = [parseInt(this.lastViewedCourseId)];
                }
                if (this.isVideoCurtainSegmenterReg) {
                    this.form.goToFirstErrorOrFirstCleanUnansweredQuestion();
                }
                else {
                    this.form.goToFirstError();
                }
                var isFirstProductMapLoad = true;
                var loadProductMapPromise = this.loadProductMap(isFirstProductMapLoad);
                loadProductMapPromise.then(function () {
                    if (_this.form.values.examName != null) {
                        _this.setProductToSelectedTestIfAppropriate(true);
                    }
                });
                if (this.isInHighIntentSinglePageCheckoutAnyVariation) {
                    var root = (0, client_1.createRoot)(target);
                    root.render(React.createElement(SinglePageRegView_1.default, { app: this }));
                }
                else {
                    var root = (0, client_1.createRoot)(target);
                    root.render(React.createElement(RegPageView, { app: this }));
                }
                var updateBrowserElement = document.getElementsByTagName("update-browser-cause-no-support")[0];
                if (updateBrowserElement) {
                    var root = (0, client_1.createRoot)(updateBrowserElement);
                    root.render(React.createElement(UpdateBrowserBanner, null));
                }
                var isProductClassroomTeacher = this.registrationData.product === "CLASSROOM_TEACHER";
                var isProductClassroomTeacherAnnual = this.registrationData.product === "CLASSROOM_TEACHER_ANNUAL";
                var isAlternativeReg = this.isAppReg || this.isAudioReg;
                var shouldAllowProductChangesWhenGoalChanges = isProductClassroomTeacher || isProductClassroomTeacherAnnual || isAlternativeReg || this.initialProductKey == null;
                (0, mobx_1.reaction)(function () { return _this.form.values; }, function () {
                    _this.saveValues();
                }, {
                    equals: mobx_1.comparer.shallow,
                    delay: 500,
                    fireImmediately: true
                });
                (0, mobx_1.reaction)(function () { return _this.form.values["userType"]; }, function () {
                    _this.onUserTypeChange();
                }, {
                    equals: mobx_1.comparer.shallow
                });
                (0, mobx_1.reaction)(function () { return _this.form.values["goals"]; }, function () {
                    _this.onGoalChange();
                }, {
                    equals: mobx_1.comparer.shallow
                });
                (0, mobx_1.reaction)(function () { return _this.regMetadata.examName; }, function () {
                    _this.setProductToSelectedTestIfAppropriate();
                });
                (0, mobx_1.reaction)(function () { return _this.form.visiblePageIndex; }, function () {
                    if ($(window).scrollTop() > 0) {
                        $("html, body").animate({ scrollTop: 0 }, "fast");
                    }
                }, {
                    equals: mobx_1.comparer.shallow
                });
                loadProductMapPromise.then(function () {
                    if (_this.isVideoCurtainSegmenterReg) {
                        (0, mobx_1.reaction)(function () { return [_this.form.values.userType, _this.form.values.goals, _this.form.values.wantsFamilyPlan]; }, function () {
                            if (!_this.form.values.userType || !_this.form.values.goals) {
                                return;
                            }
                            var shouldUpdatePaidTrialInfo = true;
                            _this.setProductFromRegData(_this.registrationData, shouldUpdatePaidTrialInfo);
                        }, { fireImmediately: true, equals: mobx_1.comparer.shallow });
                    }
                    else if (shouldAllowProductChangesWhenGoalChanges) {
                        var disposeProductChangeReaction_1 = (0, mobx_1.reaction)(function () { return [_this.form.values.goals]; }, function () {
                            _this.setProductFromRegData(_this.registrationData);
                            if (_this.initialProductKey == null && _this.registrationData.product != null) {
                                disposeProductChangeReaction_1();
                            }
                        });
                    }
                });
                (0, mobx_1.reaction)(function () { return _this.regMetadata.couponCode; }, function () {
                    _this.loadProductMap();
                });
                (0, mobx_1.reaction)(function () { return _this.regMetadata.hasSelectedPaidTrial; }, function () {
                    if (_this.paidTrialPrice && _this.regMetadata.hasSelectedPaidTrial) {
                        _this.regMetadata.swo = _this.paidTrialVariation;
                    }
                    else {
                        _this.regMetadata.swo = undefined;
                    }
                });
                (0, mobx_1.reaction)(function () { return _this.regMetadata.product; }, function () {
                    _this.onProductChange();
                });
                (0, mobx_1.reaction)(function () { return _this.shouldOfferTestPrepTwoWeekPlan; }, function (selectPaidTrial) { return _this.regMetadata.hasSelectedPaidTrial = selectPaidTrial; });
                (0, mobx_1.autorun)(function () {
                    if (_this.isTestPrepPaidTrialEligible) {
                        var tryItSubHeaderElement = document.querySelector("#regFormHeader > h3");
                        if (tryItSubHeaderElement) {
                            tryItSubHeaderElement.innerText = "Try it risk-FREE. No obligation; cancel anytime.";
                        }
                        var regFormElement = document.querySelector(".creRegForm");
                        if (regFormElement) {
                            if (!regFormElement.classList.contains("paid-trial-body")) {
                                regFormElement.classList.add("paid-trial-body");
                            }
                        }
                    }
                });
                (0, mobx_1.autorun)(function () {
                    var _a;
                    if (!_this.shouldShowFamilyPlanQuestion && ((_a = _this.form) === null || _a === void 0 ? void 0 : _a.values)) {
                        _this.form.values.wantsFamilyPlan = undefined;
                    }
                });
                if ((this.isAppReg || this.isAudioReg) && this.registrationData.userType && this.registrationData.goals && this.registrationData.product == null) {
                    this.setProductFromRegData(this.registrationData);
                }
                this.referred = !!document.querySelector('[data-user-has-referral]');
                this.isReferFriendAmazon = !!document.querySelector('[data-user-amazon-referral]');
                if (this.isReferFriendAmazon) {
                    this.shouldPreventCouponEdit = true;
                }
                if (this.isPaidTrialEligible && this.paidTrialPrice && !this.referred && this.shouldOfferTestPrepTwoWeekPlan) {
                    this.regMetadata.hasSelectedPaidTrial = false;
                    this.regMetadata.swo = undefined;
                }
                (0, mobx_1.reaction)(function () { return _this.form.visiblePageIndex; }, function () {
                    WindowLocationService.setHash((_this.form.visiblePageIndex + 1).toString());
                }, {
                    equals: mobx_1.comparer.shallow,
                    fireImmediately: true
                });
                window.addEventListener("hashchange", function () {
                    var numberFromHash = parseInt(WindowLocationService.getHash()) - 1;
                    var pageIndex = _this.form.visiblePageIndex;
                    if (numberFromHash != pageIndex) {
                        _this.form.goToPageIndex(numberFromHash);
                    }
                });
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isProductCX", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (product) {
                return ReactRegAppUtil_1.reactRegAppUtil.isProductCX(product);
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "onProductKeySelection", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (shouldUpdatePaidTrialInfo) {
                var _this = this;
                var _a, _b, _c, _d, _e;
                if (shouldUpdatePaidTrialInfo === void 0) { shouldUpdatePaidTrialInfo = false; }
                var productKey = this.regMetadata.product;
                this.regMetadata.currentProductBillingTerm = productKey.indexOf("ANNUAL") >= 0 ? "ANNUAL" : "MONTHLY";
                var currentProduct = this.productMap[productKey];
                this.setProduct(currentProduct);
                if ((currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.billingIntervalType) === 'YEAR') {
                    this.relatedMonthlyProduct = this.getMonthlyProductForAnnualProductKey(productKey);
                }
                var annualProductsWithAnnualToggle = ["HOMESCHOOL_ANNUAL", "TEACHER_ANNUAL", "CLASSROOM_TEACHER_ANNUAL"];
                var monthlyProductsWithAnnualToggle = ["HOMESCHOOL", "TEACHER", "CLASSROOM_TEACHER"];
                var hasAnnualProductWithMonthlyVersion = annualProductsWithAnnualToggle.indexOf(productKey) >= 0 && this.relatedMonthlyProduct !== null;
                var hasMonthlyProductAndInitialAnnual = annualProductsWithAnnualToggle.indexOf(this.initialProductKey) >= 0 && monthlyProductsWithAnnualToggle.indexOf(productKey) >= 0;
                var isHomeSchoolProduct = ((_a = this.product) === null || _a === void 0 ? void 0 : _a.key) === "HOMESCHOOL" || ((_b = this.product) === null || _b === void 0 ? void 0 : _b.key) === "HOMESCHOOL_ANNUAL";
                var shouldHideCouponCodeForProduct = ((_c = this.product) === null || _c === void 0 ? void 0 : _c.key) === "CS_UOPX" || ((_d = this.product) === null || _d === void 0 ? void 0 : _d.key) === "CS_COLLEGE_CONNECT" || ((_e = this.product) === null || _e === void 0 ? void 0 : _e.key) === "CS1";
                if (shouldHideCouponCodeForProduct) {
                    this.shouldPreventCouponEdit = true;
                }
                this.showAnnualToggle = hasAnnualProductWithMonthlyVersion || hasMonthlyProductAndInitialAnnual || isHomeSchoolProduct;
                if (this.regMetadata.couponCode) {
                    this.applyCoupon();
                }
                var eligibleForPaidTrial = this.paidTrialPrice
                    || (this.isVideoCurtainSegmenterReg && this.memberInfoUtil.memberInfo.isPaidTrialEligible);
                if (shouldUpdatePaidTrialInfo && eligibleForPaidTrial) {
                    AccountRegistrationService_1.AccountRegistrationService.instance().getUpdatedPaidTrialInformation(productKey)
                        .then(function (paidTrialInfo) {
                        _this.paidTrialDays = paidTrialInfo.paidTrialDays;
                        _this.paidTrialPrice = paidTrialInfo.paidTrialPrice;
                        _this.paidTrialVariation = paidTrialInfo.paidTrialVariation;
                        _this.setHasSelectedPaidTrial();
                    });
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "initializeCart", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var productRedirectUrl = '/academy/plans.html#pricing';
                if (!this.product && productRedirectUrl && !this.isAppReg && !this.isFamilyPlanAdminWithoutSubscription && !this.isAudioReg) {
                    window.location.replace(productRedirectUrl);
                }
                if (this.product && this.product.defaultTrialDays) {
                    this.endTrialDate.add(this.product.defaultTrialDays, 'days');
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "getMonthlyProductForAnnualProductKey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (annualProductKey) {
                var monthlyProduct = null;
                var searchString = "_ANNUAL";
                var endsWithSearchString = annualProductKey.substring(annualProductKey.length - searchString.length, annualProductKey.length) === searchString;
                if (endsWithSearchString) {
                    var monthlyProductKey = annualProductKey.substring(0, annualProductKey.length - searchString.length);
                    monthlyProduct = this.productMap[monthlyProductKey];
                }
                return monthlyProduct;
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "loadProductMap", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (isFirstLoad) {
                var _this = this;
                if (isFirstLoad === void 0) { isFirstLoad = false; }
                return this.productMapUtil.getProductMapForCouponCode(this.regMetadata.couponCode).then(function (productMap) {
                    _this.productMap = productMap;
                    if (isFirstLoad) {
                        if (_this.regMetadata.product) {
                            _this.onProductKeySelection();
                            _this.initializeCart();
                        }
                    }
                    return _this.productMap;
                });
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "setProductFromRegData", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (regData, shouldUpdatePaidTrialInfo) {
                if (shouldUpdatePaidTrialInfo === void 0) { shouldUpdatePaidTrialInfo = false; }
                this.setProductKey(RegProductDecider.determineProductFromState(regData));
                this.onProductKeySelection(shouldUpdatePaidTrialInfo);
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "onProductChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.regMetadata.product) {
                    window._kiq = window._kiq || [];
                    window._kiq.push(['set', { 'product': this.regMetadata.product }]);
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "setProductKey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (productKey) {
                this.regMetadata.product = productKey;
                this.product = this.productMap[this.regMetadata.product];
                ReactRegPageApp.setDataCurrentProductKey(this.regMetadata.product);
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "setProduct", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (product) {
                this.regMetadata.product = product.key;
                this.product = product;
                ReactRegPageApp.setDataCurrentProductKey(this.regMetadata.product);
            }
        });
        Object.defineProperty(ReactRegPageApp, "setDataCurrentProductKey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (productKey) {
                var element = document.querySelector("[data-current-product-key]");
                if (element) {
                    element.setAttribute("data-current-product-key", productKey);
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "getProductDisplayName", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (productKey) {
                return this.productMap[productKey].displayName;
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "setBillingTerm", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (billingTerm) {
                this.regMetadata.currentProductBillingTerm = billingTerm;
                var newProductKey = this.regMetadata.product;
                if (billingTerm === "ANNUAL" && newProductKey.indexOf("ANNUAL") < 0) {
                    newProductKey += "_ANNUAL";
                }
                else if (billingTerm !== "ANNUAL" && newProductKey.indexOf("ANNUAL") > -1) {
                    newProductKey = newProductKey.replace(/_ANNUAL$/, "");
                }
                this.regMetadata.product = newProductKey;
                this.onProductKeySelection();
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isTestPrepProduct", {
            get: function () {
                var _a;
                return ((_a = TestPrepProductUtil_1.default.testPrepProductListValueProxy.value) === null || _a === void 0 ? void 0 : _a.indexOf(this.registrationData.product)) >= 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "regPageQuestions", {
            get: function () {
                var _this = this;
                var pastValidator = function (value, form) {
                    var year = new Date().getFullYear();
                    var month = new Date().getMonth() + 1;
                    if (form.values.expirationMonth && form.values.expirationYear) {
                        if (Number(form.values.expirationYear) < year) {
                            return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_expiration_year_invalid", "test-id": "reg_error_expiration_year_invalid" }, "Expiration is not a valid, future date");
                        }
                        if (Number(form.values.expirationYear) === year && Number(form.values.expirationMonth) < month) {
                            return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_expiration_month_invalid", "test-id": "reg_error_expiration_month_invalid" }, "Expiration is not a valid, future date");
                        }
                    }
                    return null;
                };
                var ccValidator = function (value, form) {
                    if (!(0, card_validator_1.number)(value).isValid) {
                        return (React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_credit_card_invalid_number", "test-id": "reg_error_credit_card_invalid_number" }, "Credit card number invalid. Please correct or use a different card"));
                    }
                    return null;
                };
                var ccLabel = function (form) {
                    var cardType = "unknown";
                    var cardNum = form.values.creditCardNumber;
                    var card = (0, card_validator_1.number)(cardNum).card;
                    if (card) {
                        if (ReactRegPageApp.KNOWN_CARD_TYPES.indexOf(card.type) >= 0) {
                            cardType = card.type;
                        }
                    }
                    var labelText = (function () {
                        if (form.isEureka) {
                            return "Card number";
                        }
                        else if (_this.isInHighIntentSinglePageCheckoutAnyVariation) {
                            return "Credit card number";
                        }
                        else {
                            return "Card Number";
                        }
                    })();
                    if (ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                        return (React.createElement("span", { className: "credit-card-number-label-wrapper" },
                            React.createElement("span", { className: "dynamic-form__subwrapper" },
                                React.createElement("span", { className: "dynamic-form__label--delighter" }, labelText),
                                React.createElement("span", { className: "cardIcons card-" + cardType })),
                            React.createElement(RegPaymentMethodTabsViews_1.CouponCodeLink, { app: _this })));
                    }
                    return (React.createElement("span", { className: "credit-card-number-label-wrapper" },
                        React.createElement("span", { className: "dynamic-form__subwrapper" },
                            React.createElement("span", { className: "dynamic-form__label-text" }, labelText),
                            React.createElement("span", { className: "cardIcons card-" + cardType })),
                        React.createElement(RegPaymentMethodTabsViews_1.CouponCodeLink, { app: _this })));
                };
                var cvvValidator = function (value, form) {
                    if (value == null || value.trim().length == 0) {
                        return null;
                    }
                    var cardNum = form.values.creditCardNumber;
                    var cvv = value;
                    var card = (0, card_validator_1.number)(cardNum).card;
                    var cvvLabel = cvvText(form);
                    if (isNaN(parseInt(cvv))) {
                        return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_cvc_numeric", "test-id": "reg_error_cvc_numeric" },
                            cvvLabel,
                            " must be numeric");
                    }
                    if (card) {
                        var expectedCodeLen = card.code.size;
                        if (expectedCodeLen && expectedCodeLen !== cvv.length) {
                            return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_cvc_length", "test-id": "reg_error_cvc_length" },
                                cvvLabel,
                                " length must be ",
                                expectedCodeLen,
                                " digits");
                        }
                    }
                    else {
                        if (cvv.length < 3 || cvv.length > 4) {
                            return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_cvc_invalid", "test-id": "reg_error_cvc_invalid" },
                                "Invalid ",
                                cvvLabel);
                        }
                    }
                    return null;
                };
                var cvvText = function (form) {
                    var card = (0, card_validator_1.number)(form.values.creditCardNumber).card;
                    return card ? card.code.name : "CVC";
                };
                var couponCodeLabel = function (form) {
                    if (!_this.showCouponCodeInput) {
                        return React.createElement(RegPaymentMethodTabsViews_1.CouponCodeLink, { app: _this });
                    }
                    return "Coupon Code";
                };
                var cvvTooltip = function (formStore, questionStore) {
                    var cvvTooltipImageUri = !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && remspect.isControl("regFormRebrand") ? "/images/securityCode.jpg" : "/images/registration/modernizeRegForm/cvc_message.svg";
                    return {
                        content: React.createElement("img", { src: cvvTooltipImageUri, alt: "CVC Location" }),
                        theme: remspect.isControl("regFormRebrand") ? "custom-white-cvc" : "LIGHT"
                    };
                };
                var autofocus = !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() || !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile();
                var cxPlannedSchoolLabel;
                var cxPlannedSchoolLabelText = "What school do you plan on transferring credit to?";
                cxPlannedSchoolLabel = cxPlannedSchoolLabelText;
                if (ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                    cxPlannedSchoolLabel = React.createElement("span", { className: "dynamic-form__label--delighter" }, cxPlannedSchoolLabelText);
                }
                var getPhoneNumberLabel = function () {
                    if (!remspect.isControl("regFormRebrand")) {
                        return "Phone number";
                    }
                    if (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                        return "Phone Number";
                    }
                    return React.createElement(React.Fragment, null,
                        React.createElement("span", { className: "dynamic-form__label--delighter hidden-xs" }, "Phone Number"),
                        React.createElement("span", { className: "dynamic-form__label--delighter visible-xs" }, "Phone Number"));
                };
                var getFirstNameLabel = function (form) {
                    var _a, _b;
                    if (_this.isInHighIntentSinglePageCheckoutAnyVariation) {
                        return React.createElement("div", null, "First name");
                    }
                    if (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                        return React.createElement(React.Fragment, null,
                            ((_a = form.values) === null || _a === void 0 ? void 0 : _a.wantsFamilyPlan) && React.createElement("p", { className: "family-plan-name__parent dynamic-form__label-title" }, "Parent"),
                            React.createElement("div", null, form.isEureka ? "First name" : "First Name"));
                    }
                    else {
                        if ((_b = form.values) === null || _b === void 0 ? void 0 : _b.wantsFamilyPlan) {
                            if (form.isEureka) {
                                return React.createElement("span", { className: "dynamic-form__label--delighter" }, "Parent first name");
                            }
                            else {
                                return React.createElement("span", { className: "dynamic-form__label--delighter" }, "Parent First Name");
                            }
                        }
                        else {
                            if (form.isEureka) {
                                return React.createElement("span", { className: "dynamic-form__label--delighter" }, "First name");
                            }
                            else {
                                return React.createElement("span", { className: "dynamic-form__label--delighter" }, "First Name");
                            }
                        }
                    }
                };
                var getLastNameLabel = function (form) {
                    var _a, _b;
                    if (_this.isInHighIntentSinglePageCheckoutAnyVariation) {
                        return React.createElement("div", null, "Last name");
                    }
                    if (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                        return React.createElement(React.Fragment, null,
                            ((_a = form.values) === null || _a === void 0 ? void 0 : _a.wantsFamilyPlan) && React.createElement("p", { className: "family-plan-name__parent dynamic-form__label-title" }),
                            React.createElement("div", null, form.isEureka ? "Last name" : "Last Name"));
                    }
                    else {
                        if ((_b = form.values) === null || _b === void 0 ? void 0 : _b.wantsFamilyPlan) {
                            if (form.isEureka) {
                                return React.createElement("span", { className: "dynamic-form__label--delighter" }, "Parent last name");
                            }
                            else {
                                return React.createElement("span", { className: "dynamic-form__label--delighter" }, "Parent Last Name");
                            }
                        }
                        else {
                            if (form.isEureka) {
                                return React.createElement("span", { className: "dynamic-form__label--delighter" }, "Last name");
                            }
                            else {
                                return React.createElement("span", { className: "dynamic-form__label--delighter" }, "Last Name");
                            }
                        }
                    }
                };
                var getCvcPlaceholder = function (form) {
                    if (_this.isInHighIntentSinglePageCheckoutAnyVariation) {
                        return cvvText(form);
                    }
                    if (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                        return cvvText(form);
                    }
                    return "";
                };
                var getCvcLabel = function (form) {
                    if (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                        return React.createElement(React.Fragment, null, cvvText(form));
                    }
                    else {
                        return React.createElement("span", { className: "dynamic-form__label--delighter" }, "CVC");
                    }
                };
                var getZipcodePlaceholder = function () {
                    if (_this.isInHighIntentSinglePageCheckoutAnyVariation) {
                        return "Zip code";
                    }
                    else if (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                        return "Zip Code";
                    }
                    return "";
                };
                return {
                    password: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        textType: dynamic_form_1.TextType.PASSWORD,
                        required: true,
                        tooltip: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()
                            ? {
                                content: "Must be at least 8 characters long. We suggest using uppercase letters, numbers, and special characters in your password to increase your security.",
                                theme: "mobileOnlyBlueberry"
                            }
                            : undefined,
                        label: this.isInHighIntentSinglePageCheckoutAnyVariation ? "Password" : ReactRegAppUtil_1.reactRegAppUtil.getLabel("Password"),
                        sublabel: React.createElement("span", { className: "trustText" }, "Minimum length: 8 characters"),
                        placeholder: this.isInHighIntentSinglePageCheckoutAnyVariation ? "Password" : ReactRegAppUtil_1.reactRegAppUtil.getPlaceholder("Password"),
                        autocomplete: (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? undefined : "new-password"),
                        cname: "reg_form_password",
                        pageCname: this.processPageCnameFromQuestion("password"),
                        continueCname: "password",
                        blockEventLoggingOfValue: true,
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        messageForIsRequiredError: React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_password_required", "test-id": "reg_error_password_required" }, "Password is required"),
                        validator: function (value) {
                            if (value.length < 8) {
                                return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_password_too_short", "test-id": "reg_error_password_too_short" }, "Password must be at least 8 characters long");
                            }
                            else if (value.length > 56) {
                                return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_password_too_long", "test-id": "reg_error_password_too_long" }, "Password may only be 56 characters long");
                            }
                            else if (RegFormConstants_1.passwordBlacklist.indexOf(value) > -1) {
                                return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_password_blacklist", "test-id": "reg_error_password_blacklist" }, "The password you have entered may be too easy for others to guess. Please choose another password.");
                            }
                            return null;
                        }
                    },
                    passwordConfirm: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        textType: dynamic_form_1.TextType.PASSWORD,
                        required: true,
                        label: ReactRegAppUtil_1.reactRegAppUtil.getLabel(remspect.isControl("regFormRebrand") ? "Password Confirm" : "Confirm your password"),
                        placeholder: ReactRegAppUtil_1.reactRegAppUtil.getPlaceholder("Password"),
                        autocomplete: (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? undefined : "new-password"),
                        cname: "reg_form_password_confirm",
                        blockEventLoggingOfValue: true,
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        messageForIsRequiredError: React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_password_confirm_required", "test-id": "reg_error_password_confirm_required" }, "Password confirm is required"),
                        validator: function (value, form) {
                            if (value !== form.values.password) {
                                return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_password_confirm_no_matchy", "test-id": "reg_error_password_confirm_no_matchy" }, "Password confirm does not match password");
                            }
                            else if (value.length < 8) {
                                return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_password_confirm_too_short", "test-id": "reg_error_password_confirm_too_short" }, "Password confirm must be at least 8 characters long");
                            }
                            else if (value.length > 56) {
                                return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_password_confirm_too_long", "test-id": "reg_error_password_confirm_too_long" }, "Password confirm may only be 56 characters long");
                            }
                            return null;
                        },
                        saveTriggers: [dynamic_form_1.SaveTrigger.ON_CHANGE_ALWAYS, dynamic_form_1.SaveTrigger.ON_BLUR, dynamic_form_1.SaveTrigger.ON_ENTER_KEY, dynamic_form_1.SaveTrigger.ON_SUBMIT],
                    },
                    schoolTeachingGradeLevel: {
                        type: dynamic_form_1.QuestionType.SELECT,
                        required: false,
                        cname: "reg_is_teaching_in_school",
                        pageCname: this.processPageCnameFromQuestion("is_teaching_in_school"),
                        continueCname: "teachingSchool",
                        label: ReactRegAppUtil_1.reactRegAppUtil.getLabel('Are you currently teaching at a school?', true),
                        placeholder: ReactRegAppUtil_1.reactRegAppUtil.getPlaceholder("Select One"),
                        onChange: function () {
                            if (ReactRegAppUtil_1.reactRegAppUtil.shouldAutoAdvance()) {
                                _this.form.advancePage();
                            }
                        },
                        hidden: function () {
                            return !_this.shouldAskTeachingInSchoolQuestion;
                        },
                        options: [
                            { value: 'ELEMENTARY', text: 'Yes, K-5' },
                            { value: 'MIDDLE', text: 'Yes, 6-8' },
                            { value: 'HIGH', text: 'Yes, 9-12' },
                            { value: 'COLLEGE', text: 'Yes, College/University' },
                            { value: 'NOT_ENROLLED', text: 'No / Tutoring / Other' },
                        ]
                    },
                    schoolTeachingSchoolId: {
                        type: dynamic_form_1.QuestionType.TYPEAHEAD,
                        required: false,
                        cname: "reg_pick_teaching_school",
                        pageCname: this.processPageCnameFromQuestion("pick_teaching_school"),
                        continueCname: "pickTeaching",
                        autofocus: autofocus,
                        label: ReactRegAppUtil_1.reactRegAppUtil.getLabel("What is the name of the school?"),
                        placeholder: ReactRegAppUtil_1.reactRegAppUtil.getPlaceholder("Search for schools"),
                        sublabel: React.createElement("div", { className: "why-school-and-class-info", "test-id": "reg_why_school_and_class_info" },
                            React.createElement("div", { className: "why-school-and-class-info__label" }, "Why are we asking?"),
                            React.createElement("div", { className: "why-school-and-class-info__explanation" }, "We will personalize your experience based on the info you provide."),
                            React.createElement("div", { className: "why-school-and-class-info__trust-text trustText" }, "Your information will never be shared without your permission.")),
                        onChange: function () {
                            if (ReactRegAppUtil_1.reactRegAppUtil.shouldAutoAdvance()) {
                                _this.form.advancePage();
                            }
                        },
                        beforeSubmit: function () {
                            if (!_this.form.values.schoolTeachingSchoolId) {
                                _this.regMetadata.schoolTeachingUnknownSchoolName = _this.form.getTypeaheadSearchText("schoolTeachingSchoolId");
                            }
                            else {
                                _this.regMetadata.schoolTeachingUnknownSchoolName = undefined;
                            }
                        },
                        hidden: function (form) {
                            var _a, _b;
                            return !_this.shouldAskTeachingInSchoolQuestion || !((_a = form.values) === null || _a === void 0 ? void 0 : _a.schoolTeachingGradeLevel)
                                || ((_b = form.values) === null || _b === void 0 ? void 0 : _b.schoolTeachingGradeLevel) === "NOT_ENROLLED";
                        },
                        minLengthToTriggerTypeahead: 2,
                        typeaheadOptions: function (schoolName, form) {
                            var _a;
                            return SchoolClassUtil_1.schoolClassUtil.searchForSchoolsByGradeLevel(schoolName, (_a = form.values) === null || _a === void 0 ? void 0 : _a.schoolTeachingGradeLevel);
                        },
                        typeaheadOptionDisplayFn: function (school) {
                            return React.createElement("div", { className: "school-search-input__result", "test-id": "enrolled_school_option" },
                                React.createElement("div", { className: "school-search-input__result-name" }, school.name),
                                React.createElement("div", { className: "school-search-input__result-sub-text" },
                                    school.city,
                                    ", ",
                                    school.state));
                        },
                        typeaheadOptionTextFn: function (school) { return school.name; },
                        typeaheadOptionValueFn: function (school) { return school.id; }
                    },
                    billingAddressCountry: {
                        type: dynamic_form_1.QuestionType.SELECT,
                        defaultValue: 'US',
                        includePlaceholderSelectOption: false,
                        onChange: function () {
                            if (ReactRegAppUtil_1.reactRegAppUtil.shouldAutoAdvance()) {
                                _this.form.advancePage();
                            }
                        },
                        hidden: function () { return _this.form.isEureka || ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile(); },
                        options: RegFormConstants_1.countryOptions,
                        required: true,
                        label: ReactRegAppUtil_1.reactRegAppUtil.getLabel("Country"),
                        placeholder: ReactRegAppUtil_1.reactRegAppUtil.getPlaceholder("Country"),
                        autocomplete: (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && remspect.isControl("regFormRebrand") ? undefined : "country"),
                        cname: "reg_form_country",
                        pageCname: this.processPageCnameFromQuestion("country"),
                        continueCname: "country"
                    },
                    billingFirstName: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        placeholder: this.isInHighIntentSinglePageCheckoutAnyVariation ? "First name" : ReactRegAppUtil_1.reactRegAppUtil.getPlaceholder("First name"),
                        autocomplete: (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && remspect.isControl("regFormRebrand") ? undefined : "cc-given-name"),
                        autofocus: autofocus,
                        required: true,
                        messageForIsRequiredError: React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_first_name_required", "test-id": "reg_form_billing_name_first_error" }, "First Name is required"),
                        cname: "reg_form_billing_name_first",
                        pageCname: this.processPageCnameFromQuestion("name"),
                        continueCname: "billingName",
                        label: function (form) { return getFirstNameLabel(form); },
                        validator: function (firstName) {
                            if (!ReactRegPageApp.NAME_REGEX.test(firstName)) {
                                return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_first_name_invalid", "test-id": "reg_form_billing_name_first_error" }, "Only letters, apostrophes ('), hyphens (-), periods (.), and spaces are allowed in First Name.");
                            }
                            return null;
                        },
                        saveTriggers: [dynamic_form_1.SaveTrigger.ON_CHANGE_ALWAYS, dynamic_form_1.SaveTrigger.ON_BLUR, dynamic_form_1.SaveTrigger.ON_ENTER_KEY, dynamic_form_1.SaveTrigger.ON_SUBMIT]
                    },
                    billingLastName: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        placeholder: this.isInHighIntentSinglePageCheckoutAnyVariation ? "Last name" : ReactRegAppUtil_1.reactRegAppUtil.getPlaceholder("Last name"),
                        autocomplete: (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && remspect.isControl("regFormRebrand") ? undefined : "cc-family-name"),
                        required: true,
                        messageForIsRequiredError: React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_last_name_required", "test-id": "reg_form_billing_name_last_error" }, "Last Name is required"),
                        cname: "reg_form_billing_name_last",
                        pageCname: this.processPageCnameFromQuestion("name"),
                        continueCname: "billingName",
                        label: function (form) { return getLastNameLabel(form); },
                        validator: function (lastName) {
                            if (!ReactRegPageApp.NAME_REGEX.test(lastName)) {
                                return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_last_name_invalid", "test-id": "reg_form_billing_name_last_error" }, "Only letters, apostrophes ('), hyphens (-), periods (.), and spaces are allowed in Last Name.");
                            }
                            return null;
                        },
                        saveTriggers: [dynamic_form_1.SaveTrigger.ON_CHANGE_ALWAYS, dynamic_form_1.SaveTrigger.ON_BLUR, dynamic_form_1.SaveTrigger.ON_ENTER_KEY, dynamic_form_1.SaveTrigger.ON_SUBMIT]
                    },
                    hasTransferSchool: {
                        type: dynamic_form_1.QuestionType.RADIO,
                        required: true,
                        label: "Do you know what school you want to go to?",
                        cname: "reg_form_do_you_know_what_school_",
                        pageCname: this.processPageCnameFromQuestion("hasTransferSchool"),
                        continueCname: "doYouKnowWhatSchool",
                        testId: "reg-form__do-you-know-what-school__",
                        options: [
                            { value: true, text: "Yes" },
                            { value: false, text: "No" }
                        ],
                        hidden: function (form) {
                            return true;
                        },
                        onChange: function () {
                            if (ReactRegAppUtil_1.reactRegAppUtil.shouldAutoAdvance()) {
                                _this.form.advancePage();
                            }
                        },
                    },
                    cxPlannedSchool: {
                        type: dynamic_form_1.QuestionType.CUSTOM,
                        required: false,
                        hidden: true,
                    },
                    cxPlannedSchoolCompanyId: {
                        type: dynamic_form_1.QuestionType.TYPEAHEAD,
                        required: false,
                        label: cxPlannedSchoolLabel,
                        cname: "reg_form_school_search",
                        pageCname: this.processPageCnameFromQuestion("cxPlannedSchoolCompanyId"),
                        continueCname: "schoolSearch",
                        sublabel: function () { return React.createElement(React.Fragment, null,
                            remspect.isControl("regFormRebrand") &&
                                React.createElement("label", { className: "not-sure-checkbox-container" },
                                    React.createElement("input", { type: "checkbox", className: "not-sure-checkbox", "test-id": "reg_form_school_search_not_sure", "data-cname": "reg_form_school_search_not_sure", onChange: function () { return _this.cxPlannedSchoolNotSure = !_this.cxPlannedSchoolNotSure; }, defaultChecked: _this.cxPlannedSchoolNotSure }),
                                    "I'm not sure"),
                            !remspect.isControl("regFormRebrand") &&
                                React.createElement(eureka_design_system_1.Checkbox, { "data-cname": "reg_form_school_search_not_sure", "test-id": "reg_form_school_search_not_sure", checked: _this.cxPlannedSchoolNotSure, onChange: function () { return _this.cxPlannedSchoolNotSure = !_this.cxPlannedSchoolNotSure; }, label: "I'm not sure" })); },
                        hidden: function (form) {
                            return !_this.isProductCX(_this.regMetadata.product) || _this.hasAlreadyIndicatedSchool;
                        },
                        onChange: function () {
                            _this.setCXPlannedSchoolFromSchoolCompanyId();
                            if (ReactRegAppUtil_1.reactRegAppUtil.shouldAutoAdvance()) {
                                _this.form.advancePage();
                            }
                        },
                        beforeSubmit: function () {
                            _this.setCXPlannedSchoolFromSchoolCompanyId();
                        },
                        minLengthToTriggerTypeahead: 1,
                        typeaheadOptions: function (schoolName, form) {
                            return _this.getCxPlannedSchoolCompanyOptions(schoolName);
                        },
                        typeaheadOptionDisplayFn: function (school) {
                            return school.companyName;
                        },
                        typeaheadOptionTextFn: function (school) { return school.companyName; },
                        typeaheadOptionValueFn: function (school) { return school.companyId; },
                    },
                    creditCardNumber: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        textType: remspect.isControl("regFormRebrand") ? dynamic_form_1.TextType.TEL : dynamic_form_1.TextType.CREDIT_CARD,
                        required: true,
                        placeholder: function () { return _this.isInHighIntentSinglePageCheckoutAnyVariation ? "Credit card number" : ReactRegAppUtil_1.reactRegAppUtil.getPlaceholder("Credit Card Number"); },
                        autocomplete: (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && remspect.isControl("regFormRebrand") ? undefined : "cc-number"),
                        cname: "reg_form_cc_number",
                        label: ccLabel,
                        validator: ccValidator,
                        autofocus: false,
                        blockEventLoggingOfValue: true,
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        messageForIsRequiredError: function () {
                            return (React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_credit_card_required", "test-id": "reg_error_credit_card_required" }, "Card number is required"));
                        }
                    },
                    couponCodeField: {
                        type: dynamic_form_1.QuestionType.CUSTOM,
                        required: false,
                        label: couponCodeLabel,
                        hidden: function () { return !_this.showCouponCodeInput; },
                        body: function () { return React.createElement(RegPaymentMethodTabsViews_1.CouponCode, { app: _this }); },
                    },
                    expirationDate: {
                        type: dynamic_form_1.QuestionType.CUSTOM,
                        required: true,
                        label: ReactRegAppUtil_1.reactRegAppUtil.getLabel(this.isInHighIntentSinglePageCheckoutAnyVariation ? "Expiration" : "Exp. date"),
                        placeholder: this.isInHighIntentSinglePageCheckoutAnyVariation ? "MM/YY" : null,
                        tooltip: function (formStore, questionStore) {
                            var valueStr = questionStore.value;
                            var errorMessage = RegPaymentMethodTabsViews_1.ExpirationDateTextInputView.getErrorMessageIfInvalid(valueStr);
                            if (!errorMessage) {
                                return null;
                            }
                            if (ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                                return null;
                            }
                            return errorMessage;
                        },
                        hidden: function () { return !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile(); },
                        validator: function (expirationDateVal) {
                            var errorMessage = RegPaymentMethodTabsViews_1.ExpirationDateTextInputView.getErrorMessageIfInvalid(expirationDateVal);
                            return (RegPaymentMethodTabsViews_1.ExpirationDateTextInputView.isValid(expirationDateVal)) ? null : React.createElement("span", { "test-id": "reg_form_expiry_date_error" }, !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "Invalid" : React.createElement("span", null,
                                "Expiration invalid\u00A0",
                                errorMessage && React.createElement(react_1.default, { content: errorMessage, theme: "mobileOnlyBlueberry" },
                                    React.createElement("span", { className: "icon icon-question-sign" }))));
                        },
                        body: function (formStore, questionStore) {
                            return React.createElement(RegPaymentMethodTabsViews_1.ExpirationDateTextInputView, { questionStore: questionStore, ref: _this.customViewRefExpirationDate });
                        },
                        beforeSubmit: function () {
                            var _a;
                            (_a = _this.customViewRefExpirationDate.current) === null || _a === void 0 ? void 0 : _a.onSubmit();
                        },
                        messageForIsRequiredError: React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_expiration_date_required", "test-id": "reg_error_expiration_date_required" }, "Required")
                    },
                    expirationMonth: {
                        type: dynamic_form_1.QuestionType.SELECT,
                        label: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? 'Expiration' : React.createElement("span", { className: "dynamic-form__label--delighter" }, "Month"),
                        placeholder: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? 'Month' : "",
                        autocomplete: (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && remspect.isControl("regFormRebrand") ? undefined : "cc-exp-month"),
                        cname: "reg_form_cc_expiration_month",
                        required: true,
                        options: !remspect.isControl("regFormRebrand") ?
                            [
                                { value: '01', text: '01 - Jan' },
                                { value: '02', text: '02 - Feb' },
                                { value: '03', text: '03 - Mar' },
                                { value: '04', text: '04 - Apr' },
                                { value: '05', text: '05 - May' },
                                { value: '06', text: '06 - Jun' },
                                { value: '07', text: '07 - Jul' },
                                { value: '08', text: '08 - Aug' },
                                { value: '09', text: '09 - Sep' },
                                { value: '10', text: '10 - Oct' },
                                { value: '11', text: '11 - Nov' },
                                { value: '12', text: '12 - Dec' }
                            ] :
                            [
                                { value: '01', text: '01 - January' },
                                { value: '02', text: '02 - February' },
                                { value: '03', text: '03 - March' },
                                { value: '04', text: '04 - April' },
                                { value: '05', text: '05 - May' },
                                { value: '06', text: '06 - June' },
                                { value: '07', text: '07 - July' },
                                { value: '08', text: '08 - August' },
                                { value: '09', text: '09 - September' },
                                { value: '10', text: '10 - October' },
                                { value: '11', text: '11 - November' },
                                { value: '12', text: '12 - December' }
                            ],
                        validator: pastValidator,
                        messageForIsRequiredError: React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_expiration_month_required", "test-id": "reg_error_expiration_month_required" }, "Expiration Month is required")
                    },
                    expirationYear: {
                        type: dynamic_form_1.QuestionType.SELECT,
                        placeholder: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? 'Year' : "",
                        autocomplete: (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && remspect.isControl("regFormRebrand") ? undefined : "cc-exp-year"),
                        label: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? undefined : React.createElement("span", { className: "dynamic-form__label--delighter" }, "Year"),
                        cname: "reg_form_cc_expiration_year",
                        required: true,
                        options: function () {
                            var thisYear = new Date().getFullYear();
                            var yearOpts = [];
                            for (var i = 0; i < 21; i++) {
                                yearOpts.push("".concat(thisYear + i));
                            }
                            return yearOpts;
                        },
                        validator: pastValidator,
                        messageForIsRequiredError: React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_expiration_year_required", "test-id": "reg_error_expiration_year_required" }, "Expiration Year is required")
                    },
                    creditCardCvc: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        textType: ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? dynamic_form_1.TextType.TEL : dynamic_form_1.TextType.TEXT,
                        label: function (form) { return getCvcLabel(form); },
                        cname: "reg_form_cc_cvc",
                        required: true,
                        placeholder: function (form) { return getCvcPlaceholder(form); },
                        autocomplete: (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && remspect.isControl("regFormRebrand") ? undefined : "cc-csc"),
                        tooltip: cvvTooltip,
                        validator: function (value, form) { return cvvValidator(value, form); },
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        blockEventLoggingOfValue: true,
                        messageForIsRequiredError: function () {
                            return (React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_cvc_required", "test-id": "reg_error_cvc_required" }, "CVC is required"));
                        }
                    },
                    billingAddressZipCode: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        textType: ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? dynamic_form_1.TextType.TEL : dynamic_form_1.TextType.TEXT,
                        label: (function () {
                            if (_this.isInHighIntentSinglePageCheckoutAnyVariation || !remspect.isControl("regFormRebrand")) {
                                return "Zip code";
                            }
                            else {
                                return ReactRegAppUtil_1.reactRegAppUtil.getLabel("Zip Code");
                            }
                        })(),
                        placeholder: function () { return getZipcodePlaceholder(); },
                        autocomplete: (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && remspect.isControl("regFormRebrand") ? undefined : "postal-code"),
                        cname: "reg_form_zip_code",
                        required: function () { return _this.isDomestic; },
                        hidden: function () { return _this.isInternational; },
                        validator: function (zipcode) {
                            if (!FormConstants_1.ZIPCODE_REGEX.test(zipcode)) {
                                return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_zip_code_invalid", "test-id": "reg_error_zip_code_invalid" }, "Zip code invalid");
                            }
                            return null;
                        },
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        messageForIsRequiredError: function () {
                            return (React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_zip_code_required", "test-id": "reg_error_zip_code_required" }, "Zip code is required"));
                        }
                    },
                    phoneNumber: {
                        type: dynamic_form_1.QuestionType.TEXT,
                        textType: ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() || !remspect.isControl("regFormRebrand") ? dynamic_form_1.TextType.TEL : dynamic_form_1.TextType.TEXT,
                        label: getPhoneNumberLabel(),
                        tooltip: function (formStore, questionStore) {
                            var tooltipString = "Your phone number will only be used for security & verification. We will never share your info or call you without your permission.";
                            if (ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                                tooltipString = "Include your mobile phone number so we can text you a link to our mobile app.";
                            }
                            return { content: tooltipString, theme: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "" : "mobileOnlyBlueberry" };
                        },
                        placeholder: ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "" : "xxx-xxx-xxxx",
                        autocomplete: "tel-national",
                        inputMode: "tel",
                        cname: "reg_form_phone",
                        validator: function (phone) {
                            if (!ReactRegAppUtil_1.reactRegAppUtil.isPhoneNumberValid(phone)) {
                                return React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_phone_invalid", "test-id": "reg_error_phone_invalid" }, "Phone number is invalid");
                            }
                            return null;
                        },
                        required: function () { return !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile(); },
                        hidden: function () { return _this.shouldHidePhoneNumberQuestion(); },
                        doNotSetDirtyOnUndefinedToEmptyChange: true,
                        messageForIsRequiredError: function () {
                            return (React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_phone_required", "test-id": "reg_error_phone_required" }, "Phone number is required"));
                        },
                    },
                    majorName: {
                        type: dynamic_form_1.QuestionType.CUSTOM,
                        required: false,
                        hidden: true,
                    },
                    majorId: {
                        type: dynamic_form_1.QuestionType.TYPEAHEAD,
                        required: false,
                        cname: "reg_form_major_search",
                        pageCname: this.processPageCnameFromQuestion("major"),
                        continueCname: "majorSearch",
                        label: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? 'What is your major?' : React.createElement("span", { className: "dynamic-form__label--delighter" }, "What is your major?"),
                        onChange: function () {
                            if (ReactRegAppUtil_1.reactRegAppUtil.shouldAutoAdvance()) {
                                _this.form.advancePage();
                            }
                        },
                        beforeSubmit: function () {
                            if (_this.form.values.majorId == null) {
                                _this.form.setQuestionValue("majorName", _this.form.getTypeaheadSearchText("majorId"));
                            }
                        },
                        sublabel: function () { return React.createElement(React.Fragment, null,
                            remspect.isControl("regFormRebrand") &&
                                React.createElement("label", { className: "not-sure-checkbox-container" },
                                    React.createElement("input", { type: "checkbox", className: "not-sure-checkbox", "test-id": "reg_form_major_search_not_sure", "data-cname": "reg_form_major_search_not_sure", onChange: function () { return _this.majorNotSure = !_this.majorNotSure; }, defaultChecked: _this.majorNotSure }),
                                    "I'm not sure"),
                            !remspect.isControl("regFormRebrand") &&
                                React.createElement(eureka_design_system_1.Checkbox, { "data-cname": "reg_form_major_search_not_sure", "test-id": "reg_form_major_search_not_sure", checked: _this.majorNotSure, onChange: function () { return _this.majorNotSure = !_this.majorNotSure; }, label: "I'm not sure" })); },
                        typeaheadOptions: function (majorUserInput) {
                            if (!majorUserInput) {
                                return [];
                            }
                            return MajorUtil_1.default.searchForMajor(_this.registrationData.cxPlannedSchoolCompanyId, majorUserInput).catch(function () { return []; });
                        },
                        typeaheadOptionDisplayFn: function (major) { return major.majorName; },
                        typeaheadOptionTextFn: function (major) { return major.majorName; },
                        typeaheadOptionValueFn: function (major) { return major.id; },
                        hidden: function (form) {
                            if (_this.hasAlreadyIndicatedMajor) {
                                return true;
                            }
                            return !_this.isProductCX(_this.regMetadata.product);
                        }
                    },
                    cxCourseIdList: {
                        type: dynamic_form_1.QuestionType.CUSTOM,
                        required: false,
                        useDivInsteadOfLabel: true,
                        hidden: function (form) {
                            return !_this.isProductCX(_this.regMetadata.product);
                        },
                        label: this.shouldShowCXCourseSelectorTest ? "Select courses to get your best plan" : "What courses do you plan on taking on Study.com?",
                        pageCname: "reg_form_course_search",
                        body: function (formStore, questionStore) { return React.createElement(CxCourseSelector_1.CxCourseSelector, { app: _this, questionStore: questionStore }); },
                        beforeSubmit: function () {
                            _this.saveValues();
                        },
                        sublabel: function () {
                            if (_this.shouldShowCXCourseSelectorTest) {
                                return React.createElement(React.Fragment, null);
                            }
                            var onChange = function () {
                                _this.cxCourseIdListNotSure = !_this.cxCourseIdListNotSure;
                                if (_this.cxCourseIdListNotSure) {
                                    _this.regMetadata.cxCourseIdList = [];
                                    _this.saveValues();
                                }
                            };
                            return React.createElement(React.Fragment, null,
                                remspect.isControl("regFormRebrand") &&
                                    React.createElement("label", { className: "not-sure-checkbox-container" },
                                        React.createElement("input", { type: "checkbox", className: "not-sure-checkbox", "test-id": "reg_form_course_search_not_sure", "data-cname": "reg_form_course_search_not_sure", onChange: onChange, defaultChecked: _this.cxCourseIdListNotSure }),
                                        "I'm not sure"),
                                !remspect.isControl("regFormRebrand") &&
                                    React.createElement(eureka_design_system_1.Checkbox, { "data-cname": "reg_form_course_search_not_sure", "test-id": "reg_form_course_search_not_sure", checked: _this.cxCourseIdListNotSure, onChange: onChange, label: "I'm not sure" }));
                        }
                    },
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "shouldHidePhoneNumberQuestion", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this.isInternational || ReactRegAppUtil_1.reactRegAppUtil.isUserEligibleForSmsAcquisition(this);
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "shouldAskTeachingInSchoolQuestion", {
            get: function () {
                if (!this.isLocationEligibleForSchoolClassQuestions) {
                    return false;
                }
                var regData = this.registrationData;
                if (regData.userType !== "INSTRUCTOR") {
                    return false;
                }
                var productKey = regData.product;
                var validProductKeys = ["TEACHER", "TEACHER_ANNUAL", "CLASSROOM_TEACHER", "CLASSROOM_TEACHER_ANNUAL"];
                if (validProductKeys.indexOf(productKey) < 0) {
                    return false;
                }
                if (ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                    return false;
                }
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "canUseApplePay", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return AccountRegistrationService_1.AccountRegistrationService.canUseApplePay();
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "remspectPriceWithReferralDiscountCents", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (productKey) {
                if (!!this.product) {
                    var referralDiscount = this.referralDiscountCents(productKey);
                    if (referralDiscount) {
                        return !!this.coupon ? this.coupon.discountPriceCents - referralDiscount : this.product.remspectPriceCents - referralDiscount;
                    }
                }
                return null;
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "referralDiscountCents", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (productKey) {
                var amazonReferralDiscountPercent = 0.20;
                var collegeAcceleratorDiscountCents = 2000;
                var defaultReferralDiscountCents = 1000;
                if (!!this.product) {
                    if (this.isReferFriendAmazon) {
                        return Math.ceil(this.product.remspectPriceCents * amazonReferralDiscountPercent);
                    }
                    return this.isProductCX(productKey) ? collegeAcceleratorDiscountCents : defaultReferralDiscountCents;
                }
                return null;
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "saveValues", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (toSave) {
                if (toSave === void 0) { toSave = this.registrationData; }
                return ReactRegAppUtil_1.reactRegAppUtil.saveValues(toSave);
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isRegPageNotRegModal", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return true;
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "onUserTypeChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.onUserTypeChange(this);
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "onGoalChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.onGoalChange(this);
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "clearFamilyPlanDataIfNotValid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.clearFamilyPlanDataIfNotValid(this);
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "buildFamilyPlanChangeEmailLoginUrl", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.buildFamilyPlanChangeEmailLoginUrl(this);
            }
        });
        ;
        Object.defineProperty(ReactRegPageApp.prototype, "updateFormValuesAndRegMetadata", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (regDataValues) {
                return ReactRegAppUtil_1.reactRegAppUtil.updateFormValuesAndRegMetadata(this, regDataValues);
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "processPageCnameFromQuestion", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (questionCname) {
                if (questionCname === "hasTransferSchool") {
                    return "fields_doYouKnowWhatSchoolForm";
                }
                if (questionCname === "cxPlannedSchoolCompanyId") {
                    return "fields_schoolSearchForm";
                }
                return "academy_reg_page_fields_" + questionCname;
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "setDataPropertiesFromDom", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (target) {
                this.dataFromReactElement = ReactRegAppUtil_1.reactRegAppUtil.setDataPropertiesFromDom(target);
                this.paidTrialPrice = this.dataFromReactElement["paid-trial-price"];
                this.paidTrialVariation = this.dataFromReactElement["paid-trial-variation"];
                this.paidTrialDays = parseInt(this.dataFromReactElement["paid-trial-days"] || "0");
                this.paidTrialAddonKey = this.dataFromReactElement["paid-trial-addon-key"];
                this.regMetadata.isSpecificTestPrep = this.dataFromReactElement["specific-test-prep"] === "true";
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "onClickPaymentMethod", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (paymentMethod) {
                this.showPaypalButton = paymentMethod === "PAYPAL";
                this.regMetadata.paymentMethod = paymentMethod;
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "applyCoupon", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (shouldClearCouponInputOnError) {
                var _this = this;
                if (shouldClearCouponInputOnError === void 0) { shouldClearCouponInputOnError = true; }
                if (!this.regMetadata.couponCode) {
                    return Promise.resolve();
                }
                this.applyingCouponState = true;
                this.couponValidationError = "";
                this.validCoupon = null;
                var isOnCartPage = this.form.currentPage === this.form.lastPage;
                var pageContext = isOnCartPage ? "cart" : "early_registration";
                return AccountRegistrationService_1.AccountRegistrationService.instance().checkCoupon(this.regMetadata.couponCode, this.regMetadata.product, pageContext)
                    .then((0, mobx_1.action)(function (coupon) {
                    _this.coupon = coupon;
                    _this.validCoupon = true;
                    _this.couponValidationError = "";
                    if (!_this.isInHighIntentSinglePageCheckoutAnyVariation && _this.adkey) {
                        _this.showCouponCodeInput = false;
                        _this.shouldPreventCouponEdit = true;
                    }
                }))
                    .catch((0, mobx_1.action)(function (validationError) {
                    _this.coupon = null;
                    if (shouldClearCouponInputOnError && !_this.adkey) {
                        _this.regMetadata.couponCode = "";
                    }
                    _this.validCoupon = null;
                    _this.couponValidationError = (validationError === null || validationError === void 0 ? void 0 : validationError.length) ? validationError : "Invalid Coupon";
                }))
                    .finally((0, mobx_1.action)(function () {
                    _this.applyingCouponState = false;
                }));
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isDesktopView", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this.isDesktop;
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "setHasSelectedPaidTrial", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (window.location.search.indexOf("swo=") > -1 && this.paidTrialPrice) {
                    this.regMetadata.hasSelectedPaidTrial = true;
                }
                else {
                    this.regMetadata.hasSelectedPaidTrial = false;
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "submitRegFormWithPayPal", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var _a, _b;
                this.ifInHighIntentSinglePageCheckoutMarkEmailAndPhoneDirty();
                this.form.setQuestionValue("billingAddressZipCode", null, true);
                if (!((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.wantsFamilyPlan)) {
                    this.submitPayPalRegistration();
                }
                else {
                    this.openParentEmailConfirmationModal()
                        .then(function () {
                        _this.submitPayPalRegistration();
                    })
                        .catch(function () {
                        _this.form.showQuestion("email");
                    });
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "submitRegFormWithGoogle", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var _a, _b;
                this.ifInHighIntentSinglePageCheckoutMarkEmailAndPhoneDirty();
                if (!((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.wantsFamilyPlan)) {
                    this.submitRegFormWithGoogleInternal();
                }
                else {
                    this.openParentEmailConfirmationModal()
                        .then(function () {
                        _this.submitRegFormWithGoogleInternal();
                    })
                        .catch(function () {
                        _this.form.showQuestion("email");
                    });
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "ifInHighIntentSinglePageCheckoutMarkEmailAndPhoneDirty", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.isInHighIntentSinglePageCheckoutAnyVariation) {
                    this.form.getDynamicFormQuestionWithKey("email").dirty = true;
                    this.form.getDynamicFormQuestionWithKey("phoneSms").dirty = true;
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "buildFormStore", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var questions = __assign(__assign({}, this.regModalQuestions), this.regPageQuestions);
                var majorQuestion = [];
                majorQuestion.push("majorId");
                majorQuestion.push("majorName");
                var courseQuestion = [];
                courseQuestion.push("cxCourseIdList");
                var formConfig = {
                    questions: questions,
                    layout: {
                        pages: function (store) {
                            var creditCardQuestions = ["creditCardNumber", "couponCodeField", "expirationMonth",
                                "expirationYear", "creditCardCvc", "billingAddressZipCode"];
                            if (ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                                creditCardQuestions = ["creditCardNumber", "couponCodeField", "expirationDate", "creditCardCvc", "billingAddressZipCode"];
                            }
                            creditCardQuestions.push("phoneNumber");
                            if (_this.isInHighIntentSinglePageCheckoutAnyVariation) {
                                creditCardQuestions.push("expirationDate");
                            }
                            return store.combinePageListDefs(_this.regModalPageListDef, __spreadArray(__spreadArray(__spreadArray([
                                ["password", "passwordConfirm"],
                                "schoolTeachingGradeLevel",
                                "schoolTeachingSchoolId",
                                "billingAddressCountry",
                                !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? [["billingFirstName", "billingLastName"]] : ["billingFirstName", "billingLastName"],
                                "hasTransferSchool",
                                "cxPlannedSchool",
                                "cxPlannedSchoolCompanyId"
                            ], majorQuestion, true), courseQuestion, true), [
                                creditCardQuestions,
                            ], false));
                        },
                        controls: function (page, store) {
                            var _a, _b, _c, _d, _e, _f;
                            if (_this.adkey) {
                                _this.showOrHideAmbassadorCouponCodeBanner();
                            }
                            if (store.lastPage === page) {
                                var isPpcSession = (_b = (_a = _this.memberInfoUtil) === null || _a === void 0 ? void 0 : _a.memberInfo) === null || _b === void 0 ? void 0 : _b.isPpcSession;
                                var isVisitorReferredByEts = (_d = (_c = _this.memberInfoUtil) === null || _c === void 0 ? void 0 : _c.memberInfo) === null || _d === void 0 ? void 0 : _d.isVisitorReferredByEts;
                                var isTestPrepProduct = _this.regMetadata.isSpecificTestPrep || _this.isTestPrepProduct || _this.hasTestPrepProduct;
                                if (remspect.isVariation("tpFreePreview", "interstitial")
                                    && !isPpcSession
                                    && !isVisitorReferredByEts
                                    && isTestPrepProduct) {
                                    _this.isInterstitialOverlayOpen = true;
                                }
                                return React.createElement(exports.BillingPageControls, { store: store, product: _this.product, app: _this });
                            }
                            if (page.questions.filter(function (question) { return question.key === "cxCourseIdList"; }).length && _this.shouldShowCXCourseSelectorTest) {
                                return React.createElement(React.Fragment, null, (ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() || window.matchMedia("(max-width: 767.9px)").matches) ?
                                    React.createElement(React.Fragment, null,
                                        React.createElement(CxCourseStickyBar_1.CxCourseStickyBar, { app: _this }),
                                        React.createElement("div", { className: "dynamic-form__controls--cx-course-selector" },
                                            React.createElement("div", { className: "dynamic-form__back" },
                                                React.createElement("a", { "test-id": "back", "data-cname": "reg_back_button", onClick: function () { return store.goBack(); } }, "Back")),
                                            React.createElement("div", { className: "dynamic-form__skip visible-xs" },
                                                React.createElement("a", { "test-id": "skip", "data-cname": "reg_back_skip", className: ((_e = _this.regMetadata.cxCourseIdList) === null || _e === void 0 ? void 0 : _e.length) > 0 ? 'disabled' : '', onClick: ((_f = _this.regMetadata.cxCourseIdList) === null || _f === void 0 ? void 0 : _f.length) > 0 ? undefined : function () {
                                                        _this.setProductFromRegData(_this.registrationData);
                                                        _this.saveValues();
                                                        store.advancePage();
                                                    } }, "skip"))))
                                    :
                                        React.createElement("div", { className: "dynamic-form__controls--cx-course-selector" },
                                            React.createElement("div", { className: "dynamic-form__back" },
                                                React.createElement("a", { "test-id": "back", "data-cname": "reg_back_button", onClick: function () { return store.goBack(); } }, "Back"))));
                            }
                            if (page.questions.filter(function (question) { return question.key === "schoolTeachingGradeLevel"; }).length) {
                                return React.createElement(SchoolTeachingGradeLevelControls, { store: store, regMetaData: _this.regMetadata });
                            }
                            if (page.questions.filter(function (question) { return question.key === "schoolTeachingSchoolId"; }).length) {
                                return React.createElement(SchoolTeachingSchoolIdControls, { store: store, regMetaData: _this.regMetadata });
                            }
                            return React.createElement(ReactRegAppUtil_1.reactRegAppUtil.DefaultControls, { store: store });
                        }
                    }
                };
                return new dynamic_form_1.DynamicFormStore(__assign({ config: { skipInitial: false, shouldCleanNextPageOnAdvance: true, questionRefFn: react_track_visible_1.trackingRef } }, formConfig));
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "getEstimatedTotalPrice", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var data = this.rawRegistrationData;
                if (this.paidTrialPrice && data.hasSelectedPaidTrial) {
                    var p = this.paidTrialPrice.split("$");
                    return parseFloat(p[1]);
                }
                if (this.referred) {
                    return this.remspectPriceWithReferralDiscountCents(data.product) / 100;
                }
                if (this.coupon) {
                    return this.coupon.discountPriceCents / 100;
                }
                return this.product.remspectPriceCents / 100;
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "setupResponsiveMql", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var mql = window.matchMedia("(min-width: 768px)");
                this.isDesktop = mql.matches;
                if (mql.addEventListener) {
                    mql.addEventListener("change", (0, mobx_1.action)(function (e) {
                        _this.isDesktop = e.matches;
                    }));
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "setCXPlannedSchoolFromSchoolCompanyId", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.form.values.cxPlannedSchoolCompanyId) {
                    this.form.setQuestionValue("cxPlannedSchool", this.form.getTypeaheadSearchText("cxPlannedSchoolCompanyId"));
                }
                else {
                    this.form.clearValue("cxPlannedSchool");
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "setProductToSelectedTestIfAppropriate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (onlyIfUnset) {
                var _a;
                if (onlyIfUnset === void 0) { onlyIfUnset = false; }
                var regData = this.registrationData;
                var examName = (_a = this.regMetadata.examName) !== null && _a !== void 0 ? _a : regData.examName;
                var shouldTryToSelectTestSpecificProduct = (regData.userType === "STUDENT")
                    || (regData.userType === "INSTRUCTOR");
                if (shouldTryToSelectTestSpecificProduct) {
                    var productKey = ReactRegAppUtil_1.reactRegAppUtil.getMatchingProductKeyForSelectedTest(examName, true);
                    if (productKey) {
                        if (!this.productBeforeTestMatch) {
                            this.productBeforeTestMatch = this.product;
                        }
                        if (!this.product || !onlyIfUnset) {
                            this.setProductKey(productKey);
                        }
                        var shouldUpdatePaidTrialInfo = true;
                        this.onProductKeySelection(shouldUpdatePaidTrialInfo);
                    }
                    else if (this.productBeforeTestMatch) {
                        this.setProduct(this.productBeforeTestMatch);
                    }
                    else if (!this.product) {
                        this.setProductFromRegData(regData);
                    }
                }
                if (regData.product === "PREMIUM" && examName) {
                    var knownTestMatch = false;
                    for (var _i = 0, ALL_TEST_NAMES_1 = TestPrepConstants_1.ALL_TEST_NAMES; _i < ALL_TEST_NAMES_1.length; _i++) {
                        var item = ALL_TEST_NAMES_1[_i];
                        if (item.toLowerCase() === examName.toLowerCase()) {
                            knownTestMatch = true;
                            examName = item;
                            break;
                        }
                    }
                    if (knownTestMatch) {
                        this.productMap["PREMIUM"].displayName = examName + " Test Prep";
                    }
                    else {
                        this.productMap["PREMIUM"].displayName = "Premium Edition";
                    }
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "getCxPlannedSchoolCompanyOptions", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (schoolName) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2, CXSchoolUtil.getCxPlannedSchoolCompanyOptions(schoolName)];
                    });
                });
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isDomestic", {
            get: function () {
                var _a, _b, _c, _d;
                return ((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.billingAddressCountry) === "US" || ((_d = (_c = this.form) === null || _c === void 0 ? void 0 : _c.values) === null || _d === void 0 ? void 0 : _d.billingAddressCountry) === "USA";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isInternational", {
            get: function () {
                return !this.isDomestic;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "showOrHideAmbassadorCouponCodeBanner", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var isLastPage = this.form.currentPage === this.form.lastPage;
                if (isLastPage) {
                    var ambassadorCouponCodeBannerElement = $('.ambassador-coupon-code-banner');
                    if (ambassadorCouponCodeBannerElement) {
                        ambassadorCouponCodeBannerElement.hide();
                    }
                }
                else {
                    var ambassadorCouponCodeBannerElement = $('.ambassador-coupon-code-banner');
                    if (!$.cookie("ambassadorCouponCodeBanner-isClosed") && ambassadorCouponCodeBannerElement) {
                        ambassadorCouponCodeBannerElement.show();
                    }
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "translateValidationErrors", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (err) {
                var errorMap = {};
                if (typeof err.errors === "object") {
                    var sourceErrors = err.errors;
                    for (var key in sourceErrors) {
                        if (/password/i.test(key)) {
                            errorMap.password = sourceErrors[key];
                        }
                        else if (/email/i.test(key)) {
                            errorMap.email = sourceErrors[key];
                        }
                        else if (/zipcode/i.test(key)) {
                            errorMap.billingAddressZipCode = sourceErrors[key];
                        }
                        else if (/(payment)|(card)|(subscr)/i.test(key)) {
                            errorMap.creditCardNumber = sourceErrors[key];
                        }
                        else {
                            errorMap[key] = sourceErrors[key];
                        }
                    }
                    return errorMap;
                }
                else {
                    var errorArray = void 0;
                    if (Array.isArray(err.errors)) {
                        errorArray = err.errors;
                    }
                    else {
                        errorArray = [err.errors];
                    }
                    errorArray.forEach(function (e) {
                        if (/password/i.test(e)) {
                            errorMap.password = e;
                        }
                        else if (/email/i.test(e)) {
                            errorMap.email = e;
                        }
                        else if (/zipcode/i.test(e)) {
                            errorMap.billingAddressZipCode = e;
                        }
                        else if (/(payment)|(card)|(subscr)/i.test(e)) {
                            errorMap.creditCardNumber = e;
                        }
                        else {
                            console.warn("Unhandled validation exception", e);
                        }
                    });
                }
                return errorMap;
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "openParentEmailConfirmationModal", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return (0, RegPaymentMethodTabsViews_1.loadAndOpenParentEmailConfirmationModal)(this);
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "submitPayPalRegistration", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var registrationData = this.rawRegistrationData;
                var submitButton = $('[data-paypal-submit-button]');
                if (submitButton.hasClass('disabled')) {
                    return;
                }
                this.submittingPaypal = true;
                submitButton.addClass('disabled');
                var preprocessedData = this.preprocessRegFormData(registrationData);
                var ignoredFields = [
                    "creditCardNumber", "expirationDate", "expirationMonth", "expirationYear",
                    "creditCardCvc", "billingAddressZipCode", "phoneNumber"
                ];
                for (var key in preprocessedData) {
                    if (ignoredFields.indexOf(key) >= 0) {
                        delete preprocessedData[key];
                    }
                }
                AccountRegistrationService_1.AccountRegistrationService.instance().submitPayPalRegistration(preprocessedData)
                    .then(function (response) {
                    if (!response.data.success) {
                        _this.submittingPaypal = false;
                        submitButton.removeClass('disabled');
                        _this.handleFormSubmitResponse(response);
                    }
                    else {
                        if (window.localStorage) {
                            window.localStorage.setItem('ob', 'reg');
                        }
                        window.location.href = response.data['redirectUrl'];
                    }
                })
                    .catch(function (response) {
                    _this.submittingPaypal = false;
                    submitButton.removeClass('disabled');
                    _this.handleFormSubmitResponse(response);
                });
            }
        });
        ;
        Object.defineProperty(ReactRegPageApp.prototype, "submitRegFormWithGoogleInternal", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var estimatedPrice = this.getEstimatedTotalPrice();
                var accountRegistrationService = AccountRegistrationService_1.AccountRegistrationService.instance();
                var data = this.rawRegistrationData;
                accountRegistrationService.submitWithBraintreeGoogle(estimatedPrice, this.dataFromReactElement["google-pay-merchant-id"])
                    .then((0, mobx_1.action)(function (nonce) {
                    _this.form.submitting = true;
                    if (nonce != null) {
                        data.paymentMethod = "BRAINTREE";
                        data.paymentGateway = "BRAINTREE";
                        data.paymentType = "GOOGLE_PAY";
                        data.verificationToken = nonce;
                        data.token = nonce;
                        var preprocessedData = _this.preprocessRegFormData(data);
                        accountRegistrationService.postRegistration(preprocessedData).then(function (response) {
                            _this.handleFormSubmitResponse(response);
                        });
                    }
                    else {
                        _this.form.submitting = false;
                    }
                }))
                    .catch((0, mobx_1.action)(function (e) {
                    _this.form.submitting = false;
                }));
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "submitRegPage", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var _a, _b;
                if (!((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.wantsFamilyPlan)) {
                    return this.submitRegPageWithCreditCard();
                }
                else {
                    return this.openParentEmailConfirmationModal()
                        .then(function () {
                        return _this.submitRegPageWithCreditCard();
                    })
                        .catch(function () {
                        _this.form.showQuestion("email");
                        return null;
                    });
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "submitRegPageWithCreditCard", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var regData = this.rawRegistrationData;
                var preprocessedData = this.preprocessRegFormData(regData);
                return AccountRegistrationService_1.AccountRegistrationService.instance().createAccount(preprocessedData).then(function (response) {
                    _this.handleFormSubmitResponse(response);
                }).catch(function (ex) {
                    if ('validationError' in ex) {
                        if (ex.validationError) {
                            throw _this.translateValidationErrors(ex);
                        }
                        else {
                            console.error("Unhandled payment error: ".concat(ex.errors));
                            throw new Error("Unhandled payment error: ".concat(ex.errors));
                        }
                    }
                    else {
                        console.error("Unhandled payment error: ".concat(ex));
                        throw new Error("Unhandled payment error: ".concat(ex));
                    }
                });
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "preprocessRegFormData", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (data) {
                var preprocessedData = __assign({}, data);
                if (preprocessedData.phoneNumber != null) {
                    if (this.shouldHidePhoneNumberQuestion() && !ReactRegAppUtil_1.reactRegAppUtil.isPhoneNumberValid(preprocessedData.phoneNumber)) {
                        delete preprocessedData.phoneNumber;
                    }
                }
                if (["SAT_TEST_PREP_6_MONTHS_ONLY", "ACT_TEST_PREP_6_MONTHS_ONLY"].indexOf(preprocessedData['product']) >= 0) {
                    preprocessedData.billingInterval = 6;
                }
                if (this.majorNotSure) {
                    delete preprocessedData.majorId;
                    preprocessedData.majorName = "Not sure";
                }
                if (this.cxPlannedSchoolNotSure) {
                    delete preprocessedData.cxPlannedSchoolCompanyId;
                    preprocessedData.cxPlannedSchool = "Not sure";
                }
                if (!this.validCoupon) {
                    preprocessedData.couponCode = null;
                }
                return preprocessedData;
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "handleFormSubmitResponse", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (response) {
                var _a;
                this.form.submitting = false;
                if (response.data['success']) {
                    if (window.localStorage) {
                        window.localStorage.setItem('ob', 'reg');
                    }
                    window.location.href = response.data['redirectUrl'];
                }
                else {
                    var questionKey = response.data.errorField;
                    if (questionKey && response.data.errorValue) {
                        logRegError(response.data.errorField, response.data.errorValue);
                        var fieldMismatchConversionMap = {
                            "cardCvc": "creditCardCvc",
                            "expMonth": "expirationMonth",
                            "expYear": "expirationYear",
                        };
                        if (questionKey in fieldMismatchConversionMap) {
                            questionKey = fieldMismatchConversionMap[questionKey];
                        }
                        if (this.form.hasQuestionKey(questionKey)) {
                            var rawErrorValue = response.data.errorValue;
                            var regServerErrorMessageMap = {
                                "creditCardNumber": {
                                    "invalidCreditCardDeclined": React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_credit_card_declined", "test-id": "reg_error_credit_card_declined" }, "This card has been declined. Please use a different card"),
                                    "insufficientFunds": React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_credit_card_declined", "test-id": "reg_error_credit_card_declined" }, "This card has been declined. Please use a different card"),
                                    "prePaidCard": React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_credit_card_prepaid_not_allowed", "test-id": "reg_error_credit_card_prepaid_not_allowed" }, "Prepaid cards not accepted. Please use a different card"),
                                },
                                "creditCardCvc": {
                                    "invalidCvcNumber": React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_cvc_invalid", "test-id": "reg_error_cvc_invalid" }, "Invalid CVC"),
                                },
                                "expirationMonth": {
                                    "invalidExpirationDate": React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_expiration_month_invalid", "test-id": "reg_error_expiration_month_invalid" }, "Expiration is not a valid, future date."),
                                },
                                "expirationYear": {
                                    "invalidExpirationDate": React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_expiration_year_invalid", "test-id": "reg_error_expiration_year_invalid" }, "Expiration is not a valid, future date."),
                                },
                                "phoneSms": {
                                    "phoneUnavailable": React.createElement(React.Fragment, null,
                                        React.createElement("div", { "data-track-visible": true, "data-cname": "reg_error_phone_in_use", "test-id": "reg_error_phone_in_use" },
                                            "Phone number already in use.\u00A0",
                                            !this.isInHighIntentSinglePageCheckoutAnyVariation && React.createElement("span", null,
                                                "Already a member? ",
                                                React.createElement("a", { href: "/academy/login.html", "data-cname": "already_in_use_log_in", "test-id": "already_in_use_log_in" }, "Log in"),
                                                " instead."))),
                                },
                                "email": {
                                    "emailAvailable": ReactRegAppUtil_1.reactRegAppUtil.emailInUseErrorElement()
                                }
                            };
                            var errorMsg = ((_a = regServerErrorMessageMap[questionKey]) === null || _a === void 0 ? void 0 : _a[rawErrorValue]) || rawErrorValue;
                            this.form.setServerErrors(questionKey, [errorMsg]);
                            if (!this.isInHighIntentSinglePageCheckoutAnyVariation) {
                                this.form.showQuestion(questionKey);
                            }
                            return;
                        }
                    }
                    var unknownError = "";
                    if (response && response.status === 403) {
                        unknownError = "An error occurred during registration. Please reload the page and try again.";
                    }
                    else {
                        unknownError = "An error occurred during registration. Please review and try again.";
                    }
                    notifications.error(unknownError);
                    logRegError("regError", unknownError);
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "hasTestPrepProduct", {
            get: function () {
                return TestPrepConstants_1.ALL_TEST_NAMES.includes(this.registrationData.product);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "hasTestPrepIntroPlanPaidTrialData", {
            get: function () {
                return this.paidTrialAddonKey &&
                    this.paidTrialAddonKey.startsWith("intro-plan--") &&
                    !this.paidTrialAddonKey.endsWith("18000");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isTestPrepPaidTrialEligible", {
            get: function () {
                return this.hasTestPrepProduct
                    && this.hasTestPrepIntroPlanPaidTrialData
                    && this.isPaidTrialEligible && this.paidTrialPrice;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "shouldOfferTestPrepTwoWeekPlan", {
            get: function () {
                return this.isPaidTrialEligible
                    && this.paidTrialPrice
                    && this.hasTestPrepIntroPlanPaidTrialData;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "hasOptedForTestPrepTwoWeekPlan", {
            get: function () {
                return this.shouldOfferTestPrepTwoWeekPlan && this.regMetadata.hasSelectedPaidTrial;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isCollegePackageProduct", {
            get: function () {
                var _a, _b, _c, _d;
                return (((_b = (_a = this.product) === null || _a === void 0 ? void 0 : _a.key) === null || _b === void 0 ? void 0 : _b.indexOf("CS_")) > -1 || ((_c = this.product) === null || _c === void 0 ? void 0 : _c.key) === "CS1" || ((_d = this.product) === null || _d === void 0 ? void 0 : _d.key) === "CS3");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "isNonUOPXCollegePackageProduct", {
            get: function () {
                var _a, _b;
                return ((_a = this.product) === null || _a === void 0 ? void 0 : _a.key) === "CS1" || ((_b = this.product) === null || _b === void 0 ? void 0 : _b.key) === "CS3";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "shouldShowCXCourseSelectorTest", {
            get: function () {
                if (remspect.isControl("cxCourseSelector")) {
                    return false;
                }
                return this.isNonUOPXCollegePackageProduct;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp.prototype, "setDefaultCxPnPProduct", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (remspect.isVariation("collegePackagePlansSwitcherModal", "defaultCS1")) {
                    this.regMetadata.defaultProductKey = "CS1";
                }
                else {
                    this.regMetadata.defaultProductKey = "CS3";
                }
            }
        });
        Object.defineProperty(ReactRegPageApp.prototype, "canShowTpCtaModal", {
            get: function () {
                var _a, _b, _c, _d, _e, _f;
                var isLastPage = ((_a = this.form) === null || _a === void 0 ? void 0 : _a.currentPage) === ((_b = this.form) === null || _b === void 0 ? void 0 : _b.lastPage);
                var isPppSession = (_d = (_c = this.memberInfoUtil) === null || _c === void 0 ? void 0 : _c.memberInfo) === null || _d === void 0 ? void 0 : _d.isPpcSession;
                var isVisitorReferredByEts = (_f = (_e = this.memberInfoUtil) === null || _e === void 0 ? void 0 : _e.memberInfo) === null || _f === void 0 ? void 0 : _f.isVisitorReferredByEts;
                var isTestPrepProduct = this.regMetadata.isSpecificTestPrep || this.isTestPrepProduct || this.hasTestPrepProduct;
                return isLastPage
                    && isTestPrepProduct
                    && isPppSession
                    && !isVisitorReferredByEts
                    && !remspect.isControl("tpFreeCtaModal");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegPageApp, "NAME_REGEX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /^[A-Za-z'-. \u00c0-\uabff\uf900-\ufeff\ufffc-\ufffd]*$/
        });
        Object.defineProperty(ReactRegPageApp, "KNOWN_CARD_TYPES", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["american-express", "discover", "mastercard", "visa"]
        });
        return ReactRegPageApp;
    }());
    exports.ReactRegPageApp = ReactRegPageApp;
    var UpdateBrowserBanner = (0, mobx_react_1.observer)((function (_super) {
        __extends(_UpdateBrowserBannerInnerView, _super);
        function _UpdateBrowserBannerInnerView(props) {
            var _this = _super.call(this, props) || this;
            var shouldIgnoreBannerFromCookie = $.cookie("hideUpdateBrowserBanner") === 'true';
            var stripeIsNotDefined = !window.Stripe;
            _this.state = {
                shouldShowBanner: !shouldIgnoreBannerFromCookie && stripeIsNotDefined
            };
            return _this;
        }
        Object.defineProperty(_UpdateBrowserBannerInnerView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (!this.state.shouldShowBanner) {
                    return null;
                }
                return React.createElement("div", { id: "updateBrowserBanner", "test-id": "update-browser-banner", "data-cname": "update-browser-banner", "data-track-visible": true },
                    React.createElement("span", { className: "outdated-header" }, "Your browser is outdated. "),
                    React.createElement("span", { className: "outdated-subheader" }, "For a better experience, keep your browser up to date. "),
                    React.createElement("span", { className: "outdated-ignore", onClick: function () {
                            $.cookie("hideUpdateBrowserBanner", true, { path: "/" });
                            _this.setState({ shouldShowBanner: false });
                        } }, "Ignore"));
            }
        });
        return _UpdateBrowserBannerInnerView;
    }(React.Component)));
    var RegFormTooltip = function (_a) {
        var content = _a.content, theme = _a.theme, children = _a.children, cname = _a.cname;
        return remspect.isControl("regFormRebrand")
            ? React.createElement(react_1.default, { content: content, theme: theme }, children)
            : React.createElement(eureka_design_system_1.Tooltip, { body: content, theme: theme == "LIGHT" ? "LIGHT" : "DARK", "data-cname": cname }, children);
    };
    exports.RegFormTooltip = RegFormTooltip;
    var SecuritySeal = function (_a) {
        var useSvgLock = _a.useSvgLock;
        var tellMeMoreText = [
            "We take your security seriously. We safeguard your payment information with SSL (Secure Sockets Layer) when sent over the internet.",
            "SSL encrypts personal information, including your name and payment information, so that it cannot be read in transit by a third party.",
        ].join(" ");
        return React.createElement("div", { className: "securitySeals", "data-cname": "right_secure", "test-id": "right_secure" },
            React.createElement("div", { className: "security" },
                React.createElement(exports.RegFormTooltip, { content: "We encrypt your information with a Secure Server using SSL to ensure your privacy and security.", theme: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "" : "mobileOnlyBlueberry", cname: "right_secure__icon" }, useSvgLock
                    ? React.createElement(eureka_design_system_1.MaterialIcon, { className: "gold-lock", filename: "icon-lock-20.svg" })
                    : React.createElement("img", { src: "/images/productPageImages/icons/icon-lock-gold.png", alt: "Secure lock icon", width: "17", className: "tip" })),
                "\u00A0",
                React.createElement("span", null, "Secure Server"),
                React.createElement("p", { className: "small" },
                    React.createElement(exports.RegFormTooltip, { content: tellMeMoreText, cname: "right_secure__tell_me_more", theme: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "" : "mobileOnlyBlueberry" },
                        React.createElement("a", { className: "right tip", "data-cname": "right_secure__tell_me_more" }, "tell me more")))));
    };
    exports.SecuritySeal = SecuritySeal;
    var CollegePackageSecuritySeal = (0, mobx_react_1.observer)(function (_a) {
        var isLastPage = _a.isLastPage, useSvgLock = _a.useSvgLock;
        var tellMeMoreText = [
            "We take your security seriously. We safeguard your payment information with SSL (Secure Sockets Layer) when sent over the internet.",
            "SSL encrypts personal information, including your name and payment information, so that it cannot be read in transit by a third party.",
        ].join(" ");
        var collegePackageSecuritySealsClassNames = ["securitySeals", "securitySeals--college-package"];
        if (!isLastPage) {
            collegePackageSecuritySealsClassNames.push("securitySeals--not-last-page");
        }
        return React.createElement("div", { className: collegePackageSecuritySealsClassNames.join(" "), "data-cname": "right_secure", "test-id": "right_secure" },
            React.createElement("div", { className: "security security--college-package" },
                React.createElement(react_1.default, { content: "We encrypt your information with a Secure Server using SSL to ensure your privacy and security.", theme: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "" : "mobileOnlyBlueberry" }, useSvgLock
                    ? React.createElement(eureka_design_system_1.MaterialIcon, { className: "gold-lock", filename: "icon-lock-20.svg" })
                    : React.createElement("img", { src: "/images/productPageImages/icons/icon-lock-gold.png", alt: "Secure lock icon", width: "17", className: "tip" })),
                React.createElement("span", null, "Secure Server"),
                React.createElement("p", null,
                    React.createElement(react_1.default, { content: tellMeMoreText, theme: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "" : "mobileOnlyBlueberry" },
                        React.createElement("a", { className: "right tip", "data-cname": "right_secure__tell_me_more" }, "Learn more")))));
    });
    exports.BillingPageControls = (0, mobx_react_1.observer)(function (props) {
        var store = props.store;
        var app = props.app;
        var buttonBaseClasses = "next btn cre-reg-submit-btn wider next with-small-text";
        var buttonTestId = "create_account_final";
        var buttonCname = "create_account_final";
        var buttonDisabled = store.submitting || !props.product || !store.hasNoErrors;
        var ccButton = React.createElement(React.Fragment, null,
            React.createElement("button", { type: "submit", className: buttonBaseClasses, "test-id": buttonTestId, "data-cname": buttonCname, "data-track-visible": true, disabled: buttonDisabled },
                React.createElement("b", null, store.submitting ? "Processing..." : "Join Now")));
        if (app.isInHighIntentSinglePageCheckoutAnyVariation) {
            ccButton = React.createElement(React.Fragment, null,
                React.createElement(EurekaButton_1.EurekaButton, { type: "submit", isLoading: store.submitting, className: buttonBaseClasses + "center-loading-spinner-vertical", "test-id": buttonTestId, "data-cname": buttonCname, "data-track-visible": true, disabled: buttonDisabled, buttonType: EurekaButton_1.EurekaButtonType.MANGO }, "Join now"));
        }
        else if (store.isEureka) {
            ccButton = React.createElement(eureka_design_system_1.Button, { variant: "PRIMARY", type: "submit", "test-id": buttonTestId, "data-cname": buttonCname, "data-track-visible": true, loading: store.submitting, disabled: buttonDisabled && !store.submitting, marketingSize: true }, "Join now");
        }
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "clearfix" }),
            !app.isInHighIntentSinglePageCheckoutNovemberProgressive && React.createElement(React.Fragment, null,
                React.createElement("div", { className: "disclaimer-text" },
                    React.createElement("p", { className: "small" },
                        "By creating an account, you agree to Study.com's ",
                        React.createElement("a", { href: "/pages/terms_of_use.html", "data-cname": "terms_of_use", target: "_blank" }, "Terms of Use"),
                        " and ",
                        React.createElement("a", { href: "https://study.com/pages/privacy_policy.html", "data-cname": "privacy_policy", target: "_blank" }, "Privacy Policy"),
                        "."))),
            ccButton,
            store.submitting &&
                React.createElement("div", { className: "process-time-text" },
                    React.createElement("div", { className: "media" },
                        !store.isEureka && React.createElement("div", { className: "media-left" },
                            React.createElement("img", { className: "spinner", src: "/images/reDesign/global/spinner-dark-teal.png", alt: "" })),
                        React.createElement("div", { className: "media-body" }, "Hooray! You're on your way to a new account. This shouldn't take more than a minute."))),
            !app.isCollegePackageProduct && !store.submitting &&
                React.createElement("div", { className: "dynamic-form__back" },
                    React.createElement("a", { "test-id": "back", "data-cname": "reg_back_button", href: "#", onClick: function () { return store.goBack(); } }, "Back")));
    });
    var SchoolTeachingGradeLevelControls = (0, mobx_react_1.observer)(function (props) {
        var _a, _b;
        var store = props.store;
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "dynamic-form__controls-with-skip" },
                !remspect.isControl("regFormRebrand") ?
                    (React.createElement(eureka_design_system_1.Button, { type: "submit", variant: "PRIMARY", marketingSize: true, "test-id": "continue_pickTeachingForm", disabled: !((_a = store.values) === null || _a === void 0 ? void 0 : _a.schoolTeachingGradeLevel), "data-cname": "continue_pickTeachingForm" }, "Continue"))
                    :
                        (React.createElement("button", { type: "submit", "test-id": "continue_pickTeachingForm", className: "dynamic-form__submit ", disabled: !((_b = store.values) === null || _b === void 0 ? void 0 : _b.schoolTeachingGradeLevel), "data-cname": "continue_pickTeachingForm" }, "Continue")),
                React.createElement("a", { id: "skip-button-pickTeachingForm", onClick: function () {
                        store.setQuestionValue("schoolTeachingGradeLevel", null);
                        store.setQuestionValue("schoolTeachingSchoolId", null);
                        props.regMetaData.schoolTeachingUnknownSchoolName = null;
                        store.advancePage();
                    }, className: "skip-link", "test-id": "skip_link", "data-cname": "pick_teaching_skip" },
                    React.createElement("small", null, "Skip"))),
            React.createElement("a", { className: "dynamic-form__back", "test-id": "back", "data-cname": "reg_back_button", onClick: function () { return store.goBack(); } }, "Back"));
    });
    var SchoolTeachingSchoolIdControls = (0, mobx_react_1.observer)(function (props) {
        var _a, _b;
        var store = props.store;
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "dynamic-form__controls-with-skip" },
                !remspect.isControl("regFormRebrand") ? (React.createElement(eureka_design_system_1.Button, { type: "submit", variant: "PRIMARY", marketingSize: true, "test-id": "continue_teachingSchoolForm", "data-cname": "continue_teachingSchoolForm", disabled: !((_a = store.values) === null || _a === void 0 ? void 0 : _a.schoolTeachingSchoolId) && !store.getTypeaheadSearchText("schoolTeachingSchoolId") }, "Continue")) : (React.createElement("button", { type: "submit", "test-id": "continue_teachingSchoolForm", className: "dynamic-form__submit", "data-cname": "continue_teachingSchoolForm", disabled: !((_b = store.values) === null || _b === void 0 ? void 0 : _b.schoolTeachingSchoolId) && !store.getTypeaheadSearchText("schoolTeachingSchoolId") }, "Continue")),
                React.createElement("a", { id: "skip-button-pickTeachingForm", onClick: function () {
                        store.setQuestionValue("schoolTeachingSchoolId", null);
                        props.regMetaData.schoolTeachingUnknownSchoolName = null;
                        store.advancePage();
                    }, className: "skip-link", "test-id": "skip_link", "data-cname": "reg_school_skip" },
                    React.createElement("small", null, "Skip"))),
            React.createElement("a", { className: "dynamic-form__back", "test-id": "back", "data-cname": "reg_back_button", onClick: function () { return store.goBack(); } }, "Back"));
    });
    var RegPageView = (0, mobx_react_1.observer)(function (props) {
        var _a, _b, _c, _d, _e, _f;
        var app = props.app;
        var isLastPage = app.form.currentPage === app.form.lastPage;
        var userType = (_b = (_a = app.form) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.userType;
        var goal = (_d = (_c = app.form) === null || _c === void 0 ? void 0 : _c.values) === null || _d === void 0 ? void 0 : _d.goals;
        var mainFormContainerClass = ["main-form-container"];
        if (isLastPage && app.isCollegePackageProduct) {
            mainFormContainerClass.push("main-form-container--college-package");
        }
        var isNewPaypal = !remspect.isControl("newPaypal");
        var _g = (0, react_2.useState)(false), isTpCtaModalMouseLeaveTriggered = _g[0], setTpCtaModalMouseLeaveTriggered = _g[1];
        var _h = (0, react_2.useState)(false), isTpCtaModalAlreadyInitialized = _h[0], setTpCtaModalAlreadyInitialized = _h[1];
        if (app.canShowTpCtaModal && !isTpCtaModalAlreadyInitialized) {
            setTpCtaModalAlreadyInitialized(true);
            TestPrepFreeAccountCtaModalUtil_1.TestPrepFreeAccountCtaModalUtil.setShowModalOnNextPageOrMouseout(setTpCtaModalMouseLeaveTriggered);
        }
        var isCxSwitcher = (0, RegProductModalSwitcher_1.shouldRenderCXProductModalSwitcherOnCart)(app, isLastPage, (_e = app.regMetadata) === null || _e === void 0 ? void 0 : _e.productKeyOverride);
        return React.createElement(React.StrictMode, null,
            React.createElement(GenericErrorBoundary_1.GenericErrorBoundaryView, null,
                app.isInterstitialOverlayOpen &&
                    React.createElement(TestPrepFreePreviewRegistrationViews_1.TestPrepFreePreviewInterstitialView, { app: app, onHideOverlay: (0, mobx_1.action)(function () { return app.isInterstitialOverlayOpen = false; }) }),
                isLastPage && ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && React.createElement(RegSidebarViews_1.ModernizedRegHeaderView, __assign({}, props)),
                React.createElement("div", { className: "row primary" + (isLastPage ? " row--cart" : "") + (ReactRegAppUtil_1.reactRegAppUtil.isUserEligibleForSmsAcquisition(app) ? " sms-acquisition" : "") },
                    isLastPage && !app.isDesktop && React.createElement(RegSidebarViews_1.RegSidebarMobileCartView, __assign({}, props)),
                    !app.isDesktop && React.createElement(RegProductModalSwitcher_1.RegProductModalSwitcherOnCartWrapper, { app: app, isLastPage: isLastPage, productOverride: (_f = app.regMetadata) === null || _f === void 0 ? void 0 : _f.productKeyOverride }),
                    React.createElement("div", { className: "formContainer" },
                        React.createElement("div", { className: "innerContainer" },
                            React.createElement("div", { className: "form-section ".concat(isLastPage && app.isCollegePackageProduct && "form-section--college-package", " ").concat(isCxSwitcher && "form-section--cx-switcher") },
                                React.createElement("div", __assign({ className: mainFormContainerClass.join(" ") }, (isLastPage && { "data-cname": "academy_reg_page_fields_payment" })),
                                    !isLastPage && ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && React.createElement(RegSidebarViews_1.ModernizedRegHeaderView, __assign({}, props)),
                                    isLastPage && React.createElement(RegPaymentMethodTabsViews_1.RegPaymentMethodTabs, __assign({}, props)),
                                    (!isLastPage || !app.showPaypalButton) && !(app.form.submitting && app.submittingPaypal && isNewPaypal) && React.createElement(dynamic_form_1.DynamicFormView, { store: app.form })),
                                !isLastPage && React.createElement(RegSidebarViews_1.RegSidebarView, __assign({}, props)),
                                isLastPage && app.gsCourseTitle && app.isDesktop &&
                                    React.createElement(RegSidebarViews_1.RegSidebarGoogleShoppingCartView, __assign({}, props)),
                                isLastPage && !app.gsCourseTitle && app.isDesktop && React.createElement(RegSidebarViews_1.RegSidebarCartView, __assign({}, props))),
                            React.createElement("div", { className: remspect.isControl("regFormRebrand") ? "col-xs-10 col-sm-10 col-md-10 col-lg-10 col-sm-offset-1" : "" },
                                React.createElement("div", { className: "helper-cart" }, app.form.values.userType === "INSTRUCTOR" && isLastPage && React.createElement(RegSidebarViews_1.TeacherTestimonial, { teacherSubject: app.form.values["teacherSubject"] }))),
                            (app.lastViewedStudyAnswerTitle || app.askedQuestion) && !isLastPage &&
                                React.createElement("div", { className: "study-answer-question" },
                                    React.createElement("div", { className: "study-answer-question__label" }, "Question to be answered"),
                                    React.createElement("div", { className: "study-answer-question__question", "test-id": "question_to_be_answered" }, truncateString(app.askedQuestion || app.lastViewedStudyAnswerTitle, 100, "..."))),
                            !app.isCollegePackageProduct && (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() || isLastPage) &&
                                React.createElement("div", { className: "row security-row" },
                                    React.createElement("div", { className: "col-sm-7 col-sm-offset-1", id: "qod" }),
                                    React.createElement("div", { className: "col-sm-4 security-row__security-seals-container" },
                                        React.createElement(exports.SecuritySeal, { useSvgLock: !remspect.isControl("regFormRebrand") }))),
                            app.isCollegePackageProduct && (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() || isLastPage) &&
                                React.createElement(CollegePackageSecuritySeal, { isLastPage: isLastPage, useSvgLock: !remspect.isControl("regFormRebrand") })))),
                React.createElement("div", { className: "row secondary faq-row", id: "faq-row" },
                    React.createElement("div", { className: remspect.isControl("regFormRebrand") ? "col-sm-12" : "reg-rebrand__faq" },
                        React.createElement(RegFaqViews_1.RegFaqView, null))),
                ((userType === "STUDENT" && goal === "EXAM_PREP") || (userType === "INSTRUCTOR" && goal === "TEACHER_CERTIFICATION"))
                    && React.createElement("div", { className: "test-prep-claims-disclaimer--reg-page ".concat(app.scoreBasedProducts.indexOf(app.regMetadata.product) > -1 ? 'score-based' : '') },
                        React.createElement(ReactRegAppUtil_1.TestPrepDisclaimer, null)),
                isTpCtaModalMouseLeaveTriggered && React.createElement(ssr_test_prep_1.TestPrepFreeAccountCtaModal, null)));
    });
    var truncateString = function (s, maxLen, terminator) {
        if (maxLen >= s.length) {
            return s;
        }
        maxLen -= terminator.length;
        if (s[maxLen] === ' ') {
            return s.substring(0, maxLen) + terminator;
        }
        var fragment = s.substring(0, maxLen);
        var lastSpacePos = fragment.lastIndexOf(" ");
        if (lastSpacePos > -1) {
            return fragment.substring(0, lastSpacePos) + terminator;
        }
        return fragment + terminator;
    };
    var logRegError = function (field, value) {
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent("regError", true, true, {
            errorField: field,
            errorValue: value
        });
        document.dispatchEvent(event);
    };
});

//# sourceMappingURL=ReactRegPage.app.js.map

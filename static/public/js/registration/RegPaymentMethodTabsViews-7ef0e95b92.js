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
define(["require", "exports", "@sites-study-com/remspect", "@study-com/eureka-design-system", "components/GenericErrorBoundary", "lib/react-bootstrap", "mobx", "mobx-react", "react", "react-dom/client", "react-utils/react-study-helpers", "registration/ReactRegAppUtil", "util/InlineSvgComponents", "util/remspect-affected-event-util"], function (require, exports, remspect, eureka_design_system_1, GenericErrorBoundary_1, react_bootstrap_1, mobx_1, mobx_react_1, React, client_1, react_study_helpers_1, ReactRegAppUtil_1, InlineSvgComponents_1, RemspectAffectedEventUtil) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExpirationDateTextInputView = exports.ExpirationDateTextInputViewClazz = exports.WhyPaymentInfoModalView = exports.ParentEmailConfirmationModalView = exports.BackButton = exports.FreeTrialDisclaimer = exports.CouponCode = exports.CouponCodeLink = exports.SinglePageMobileAltPaymentMethodsButtons = exports.PaymentSuccessMessageAndSpinner = exports.MobileAltPaymentMethodsButtons = exports.PaypalTab = exports.PaypalButton = exports.RegPaymentMethodTabs = exports.MOBILE_CART_BREAKPOINT = void 0;
    exports.loadAndOpenParentEmailConfirmationModal = loadAndOpenParentEmailConfirmationModal;
    exports.loadAndOpenWhyPaymentInfoModal = loadAndOpenWhyPaymentInfoModal;
    exports.MOBILE_CART_BREAKPOINT = 599;
    var getCouponErrorTrackingName = function (errorMessage) {
        switch (errorMessage) {
            case "Invalid Coupon":
                return "reg_error_coupon_invalid";
            case "Expired Coupon":
                return "reg_error_coupon_expired";
            case "Coupon Invalid for current product":
                return "reg_error_coupon_product_mismatch";
            case "This coupon is only valid for existing users":
                return "reg_error_coupon_new_subscriber_restriction";
            case "This coupon is only valid for new users":
                return "reg_error_coupon_existing_subscriber_restriction";
            default:
                return "reg_error_coupon_unknown";
        }
    };
    exports.RegPaymentMethodTabs = (0, mobx_react_1.observer)((function (_super) {
        __extends(_RegPaymentMethodTabs, _super);
        function _RegPaymentMethodTabs(props) {
            var _this = _super.call(this, props) || this;
            Object.defineProperty(_this, "mobileCart", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: window.matchMedia("(max-width: " + (exports.MOBILE_CART_BREAKPOINT + 1) + "px)")
            });
            return _this;
        }
        Object.defineProperty(_RegPaymentMethodTabs.prototype, "componentDidMount", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.firePaymentPageRemspectAffectedEvents();
                var _kiq = window._kiq = window._kiq || [];
                _kiq.push(['set', { 'sawCCPage': true }]);
                var app = this.props.app;
                this.mobileCart.addEventListener("change", function (event) {
                    if (event.matches) {
                        app.onClickPaymentMethod('CREDIT CARD');
                    }
                });
            }
        });
        Object.defineProperty(_RegPaymentMethodTabs.prototype, "firePaymentPageRemspectAffectedEvents", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var app = this.props.app;
                var regData = app.registrationData;
                if (regData.product === "BASIC" || regData.product === "BASIC_ANNUAL") {
                    var factor = "basic2020";
                    var eventInfo = "logged-out";
                    RemspectAffectedEventUtil.sendUniqueRemspectAffectedEventIfAssigned(factor, eventInfo);
                }
                if (regData.product === "TEACHER" || regData.product === "TEACHER_ANNUAL"
                    || regData.product === "CLASSROOM_TEACHER" || regData.product === "CLASSROOM_TEACHER_ANNUAL") {
                    var factor = "classTeacherPriceTest";
                    var eventInfo = "logged-out";
                    RemspectAffectedEventUtil.sendUniqueRemspectAffectedEventIfAssigned(factor, eventInfo);
                }
            }
        });
        Object.defineProperty(_RegPaymentMethodTabs.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var app = this.props.app;
                var isNewPaypal = !remspect.isControl("newPaypal");
                if (isNewPaypal) {
                    app.getBraintreePaypalClient();
                }
                return React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "lastStep hidden-xs" },
                        React.createElement("h4", null, "Last step! To create your account, enter your payment info\u00A0below."),
                        React.createElement("p", null,
                            "Don't worry, ",
                            React.createElement("span", { className: "green" }, "we'll email you right away with all the details.")),
                        this.renderBulletPoints()),
                    React.createElement("p", { className: "why-info hidden-xs" },
                        "Choose your payment option below",
                        (!app.paidTrialMessagingEligible || app.shouldOfferTestPrepTwoWeekPlan) && !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() &&
                            React.createElement("a", { className: "whyPaymentInfoTrigger", onClick: function () { return loadAndOpenWhyPaymentInfoModal(); }, "test-id": "why_payment_trigger", "data-cname": "why_payment_trigger" }, "Why do I need to enter my payment info?")),
                    (!app.isPaidTrialEligible || app.shouldOfferTestPrepTwoWeekPlan) && !app.isCollegePackageProduct && React.createElement("p", { className: "visible-xs payment-title" }, "Preferred Payment Method"),
                    app.isPaidTrialEligible && ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && !app.shouldOfferTestPrepTwoWeekPlan && React.createElement("p", { className: "why-info visible-xs" }, "Choose your payment option below"),
                    app.isPaidTrialEligible && !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && !app.shouldOfferTestPrepTwoWeekPlan && React.createElement("p", { className: "visible-xs" }, "Choose your payment option below"),
                    React.createElement("div", { className: "tabArea", "test-id": "payment_method_tabs" },
                        React.createElement("ul", { id: "paymentMethodTabs", className: "blockTabs hidden-phone-xl" },
                            React.createElement("li", { id: "creditCardTab", className: "tab first-child" + (!app.showPaypalButton ? " active" : ""), "data-cname": "credit_card_tab", "test-id": "credit_card_tab", "data-test-selected": !app.showPaypalButton, onClick: function () { return app.onClickPaymentMethod('CREDIT CARD'); } },
                                React.createElement("div", { className: "radio-button-container" },
                                    React.createElement("span", { className: "radio-button hidden-phone" },
                                        React.createElement("div", { className: "radio-button-dot" })),
                                    app.form.isEureka ? "Credit card" : "Credit Card")),
                            React.createElement("li", { id: "paypalTab", className: "tab" + (app.showPaypalButton ? " active" : ""), "data-cname": "paypal_tab", "test-id": "paypal_tab", "data-test-selected": app.showPaypalButton, onClick: function () { return app.onClickPaymentMethod('PAYPAL'); } },
                                React.createElement("div", { className: "radio-button-container" },
                                    React.createElement("span", { className: "radio-button hidden-phone" },
                                        React.createElement("div", { className: "radio-button-dot" })),
                                    React.createElement("img", { className: "payPalLogo", src: '/images/payment/pp-logo-200px.png', alt: "PayPal" })))),
                        React.createElement(exports.MobileAltPaymentMethodsButtons, __assign({}, this.props)),
                        app.showPaypalButton && React.createElement(exports.PaypalTab, __assign({}, this.props))));
            }
        });
        Object.defineProperty(_RegPaymentMethodTabs.prototype, "renderBulletPoints", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var app = this.props.app;
                var registrationData = app.registrationData;
                var usePaidTrialBullets = app.isPaidTrialEligible
                    && app.paidTrialPrice
                    && !app.referred
                    && registrationData.hasSelectedPaidTrial;
                var paidTrialBulletPoints = undefined;
                if (usePaidTrialBullets) {
                    var paidTrialPriceString = (0, react_study_helpers_1.currency)((app.coupon ? app.coupon.discountPriceCents : app.product.remspectPriceCents) / 100);
                    var paidTrialExplanationContent = React.createElement(React.Fragment, null,
                        "After your first week your ",
                        " " + app.product.displayName + " ",
                        " plan is billed thereafter at",
                        React.createElement("span", { "data-price": paidTrialPriceString },
                            "\u00A0",
                            paidTrialPriceString,
                            "/mo"));
                    paidTrialBulletPoints = React.createElement(React.Fragment, null,
                        React.createElement("li", { "test-id": "paid_trial_bullet" },
                            "Try your first week for ",
                            React.createElement("span", null, app.paidTrialPrice),
                            " - our lowest price!"),
                        React.createElement("li", { className: "paid-trial-explanation" }, paidTrialExplanationContent));
                }
                var cancelBulletPoint = (React.createElement("li", null,
                    "You are free to ",
                    React.createElement("b", null, "cancel online, anytime, with just a few simple clicks")));
                if (app.gsCourseTitle) {
                    cancelBulletPoint = React.createElement("li", null,
                        "Your account will be active for ",
                        React.createElement("strong", null, "12 months"));
                }
                return React.createElement("ul", null,
                    !app.shouldOfferTestPrepTwoWeekPlan && paidTrialBulletPoints,
                    cancelBulletPoint,
                    React.createElement("li", null,
                        "And if you have any questions, ",
                        React.createElement("b", null, "you can reach out anytime")));
            }
        });
        return _RegPaymentMethodTabs;
    }(React.Component)));
    var ApplePayButton = (0, mobx_react_1.observer)(function (_a) {
        var app = _a.app, btnClass = _a.btnClass, imgSrc = _a.imgSrc, logoClass = _a.logoClass;
        if (!app.canUseApplePay()) {
            return null;
        }
        var regData = app.registrationData;
        var shouldDisable = !regData.billingFirstName || !regData.billingLastName || !regData.billingAddressCountry || app.form.submitting;
        if (app.isInHighIntentSinglePageCheckoutAnyVariation) {
            shouldDisable = shouldDisable
                || !regData.email
                || !regData.password
                || !regData.phoneSms
                || !app.form.getDynamicFormQuestionWithKey("email").valid
                || !app.form.getDynamicFormQuestionWithKey("password").valid
                || !app.form.getDynamicFormQuestionWithKey("phoneSms").valid;
        }
        return app.form.isEureka ?
            (React.createElement(eureka_design_system_1.Button, { type: "button", variant: "TERTIARY", "data-apple-pay-click": "", className: btnClass, onClick: function () { return app.ifInHighIntentSinglePageCheckoutMarkEmailAndPhoneDirty(); }, disabled: shouldDisable, alt: "Pay with Apple Pay", "data-track-visible": true, "test-id": "apple_pay", "data-cname": "apple_pay" },
                React.createElement("img", { src: imgSrc ? imgSrc : "/images/payment/apple-pay-black.png", className: logoClass }))) :
            (React.createElement("button", { type: "button", className: btnClass, "data-apple-pay-click": "", onClick: function () { return app.ifInHighIntentSinglePageCheckoutMarkEmailAndPhoneDirty(); }, disabled: shouldDisable },
                React.createElement("img", { src: imgSrc ? imgSrc : "/images/payment/apple-pay-black.png", alt: "Pay with Apple Pay", "data-track-visible": true, "test-id": "apple_pay", "data-cname": "apple_pay", className: logoClass })));
    });
    var GooglePayButton = (0, mobx_react_1.observer)(function (_a) {
        var app = _a.app, btnClass = _a.btnClass, imgSrc = _a.imgSrc, logoClass = _a.logoClass;
        if (app.canUseApplePay()) {
            return null;
        }
        var regData = app.registrationData;
        var shouldDisable = !regData.billingFirstName || !regData.billingLastName || !regData.billingAddressCountry || app.form.submitting;
        if (app.isInHighIntentSinglePageCheckoutAnyVariation) {
            shouldDisable = shouldDisable
                || !regData.email
                || !regData.password
                || !regData.phoneSms
                || !app.form.getDynamicFormQuestionWithKey("email").valid
                || !app.form.getDynamicFormQuestionWithKey("password").valid
                || !app.form.getDynamicFormQuestionWithKey("phoneSms").valid;
        }
        return app.form.isEureka ?
            (React.createElement(eureka_design_system_1.Button, { type: "button", variant: "TERTIARY", className: btnClass, onClick: function () { return app.submitRegFormWithGoogle(); }, disabled: shouldDisable, alt: "Pay with Google Pay", "data-track-visible": true, "test-id": "google_pay", "data-cname": "google_pay" },
                React.createElement("img", { src: imgSrc ? imgSrc : "/images/payment/google-pay-black.png", className: logoClass }))) :
            (React.createElement("button", { type: "button", className: btnClass, onClick: function () { return app.submitRegFormWithGoogle(); }, disabled: shouldDisable },
                React.createElement("img", { src: imgSrc ? imgSrc : "/images/payment/google-pay-black.png", alt: "Pay with Google Pay", "data-track-visible": true, "test-id": "google_pay", "data-cname": "google_pay", className: logoClass })));
    });
    exports.PaypalButton = (0, mobx_react_1.observer)(function (_a) {
        var app = _a.app, btnClass = _a.btnClass, imgSrc = _a.imgSrc, logoClass = _a.logoClass;
        var regData = app.registrationData;
        var shouldDisable = !regData.billingFirstName || !regData.billingLastName || !regData.billingAddressCountry || app.form.submitting;
        if (app.isInHighIntentSinglePageCheckoutAnyVariation) {
            shouldDisable = shouldDisable
                || !regData.email
                || !regData.password
                || !regData.phoneSms
                || !app.form.getDynamicFormQuestionWithKey("email").valid
                || !app.form.getDynamicFormQuestionWithKey("password").valid
                || !app.form.getDynamicFormQuestionWithKey("phoneSms").valid;
        }
        return app.form.isEureka ? (React.createElement(eureka_design_system_1.Button, { type: "button", "data-cname": "create_account_paypal_final", variant: "TERTIARY", "test-id": "create_account_paypal_final", className: btnClass, onClick: function () { return app.submitRegFormWithPayPal(); }, disabled: shouldDisable, "data-paypal-submit-button": "" },
            React.createElement("img", { src: imgSrc ? imgSrc : "/images/payment/paypal.svg", alt: "Check out with PayPal", className: logoClass }))) : (React.createElement("button", { type: "button", "data-cname": "create_account_paypal_final", "test-id": "create_account_paypal_final", className: btnClass, onClick: function () { return app.submitRegFormWithPayPal(); }, disabled: shouldDisable, "data-paypal-submit-button": "" },
            React.createElement("img", { src: imgSrc ? imgSrc : "/images/payment/paypal.svg", alt: "Check out with PayPal", className: logoClass })));
    });
    exports.PaypalTab = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        var isNewPaypal = !remspect.isControl("newPaypal");
        var isNewPaypalAndInDesktop = isNewPaypal && window.innerWidth >= exports.MOBILE_CART_BREAKPOINT;
        var couponLabel = (function () {
            if (app.form.isEureka) {
                return "Have a coupon code?";
            }
            else {
                return "Have a Coupon Code?";
            }
        })();
        return React.createElement("div", { className: "featureElementsContainer tabContent tab-content" },
            React.createElement("div", { id: "paypal-tab" },
                !app.gsCourseTitle && React.createElement(React.Fragment, null,
                    !app.showCouponCodeInput && !app.shouldPreventCouponEdit && !app.isFamilyPlanAdminWithoutSubscription &&
                        React.createElement("div", { className: "haveCouponText" },
                            React.createElement("a", { className: "grey right", onClick: (0, mobx_1.action)(function () { return app.showCouponCodeInput = true; }), "data-cname": "have_coupon_code", "test-id": "have_coupon_code" }, couponLabel)),
                    app.showCouponCodeInput &&
                        React.createElement("div", { className: "haveCouponText" })),
                React.createElement("div", { className: "payPalInfo clearfix", "test-id": "paypal_info" },
                    React.createElement("div", { className: "text" },
                        React.createElement("strong", null, "You're almost there!")),
                    React.createElement("div", { className: "text" }, "Continue to PayPal to create your account."),
                    isNewPaypal ?
                        React.createElement("div", { className: "additionalInfo" }, "Once your payment is confirmed, your account setup will continue automatically.") :
                        React.createElement("div", { className: "additionalInfo" }, "Once your payment is confirmed through PayPal, you'll get automatically redirected to Study.com.")),
                React.createElement(exports.CouponCode, __assign({}, props)),
                isNewPaypalAndInDesktop ?
                    React.createElement("div", { className: "col-xs-12" },
                        React.createElement("div", { id: "paypal-button", className: app.showCouponCodeInput ? "paypal-button--with-coupon" : "" })) :
                    (!app.isCollegePackageProduct && React.createElement(PayPalButtonDesktop, { app: app })),
                app.form.submitting && React.createElement(exports.PaymentSuccessMessageAndSpinner, null),
                React.createElement("div", { className: "hidden-xs disclaimer-wrapper" },
                    React.createElement(exports.FreeTrialDisclaimer, null)),
                (app.isCollegePackageProduct && !isNewPaypalAndInDesktop) && React.createElement(PayPalButtonDesktop, { app: app }),
                !app.isCollegePackageProduct && React.createElement("div", { className: "payPalBack" },
                    React.createElement(exports.BackButton, __assign({}, props)))));
    });
    var PayPalButtonDesktop = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        var registrationData = app.registrationData;
        return app.form.isEureka ? (React.createElement("button", { className: "payPalButton", type: "submit", "data-cname": "create_account_paypal_final", "test-id": "create_account_paypal_final", onClick: function () { return app.submitRegFormWithPayPal(); } },
            React.createElement("img", { "data-paypal-submit-button": true, src: "https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png", alt: "Check out with PayPal", className: !registrationData.billingFirstName || !registrationData.billingLastName || !registrationData.billingAddressCountry
                    ? "disabled" : "" }))) : (React.createElement("div", { className: "col-xs-12" },
            React.createElement("button", { className: "payPalButton", type: "submit", "data-cname": "create_account_paypal_final", "test-id": "create_account_paypal_final", onClick: function () { return app.submitRegFormWithPayPal(); } },
                React.createElement("img", { "data-paypal-submit-button": true, src: "https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png", alt: "Check out with PayPal", className: !registrationData.billingFirstName || !registrationData.billingLastName || !registrationData.billingAddressCountry
                        ? "disabled" : "" }))));
    });
    exports.MobileAltPaymentMethodsButtons = (0, mobx_react_1.observer)(function (props) {
        var _a;
        var isNewPaypal = !remspect.isControl("newPaypal");
        var altPaymentsClasses = "alt-payments visible-phone-xl";
        if (isNewPaypal) {
            altPaymentsClasses += " alt-payments--match-paypal-size";
        }
        var isSubmittingPaypal = ((_a = props.app.form) === null || _a === void 0 ? void 0 : _a.submitting) && props.app.submittingPaypal && isNewPaypal;
        if (isSubmittingPaypal) {
            altPaymentsClasses += " alt-payments--submitting";
        }
        var app = props.app;
        return React.createElement("div", { className: altPaymentsClasses },
            React.createElement(ApplePayButton, { app: app, btnClass: "alt-payments__alt" }),
            React.createElement(GooglePayButton, { app: app, btnClass: "alt-payments__alt" }),
            !app.form.isEureka && React.createElement("div", { className: "alt-payments__spacer" }),
            isNewPaypal ?
                React.createElement("div", { className: "alt-payments__alt--paypal-mobile" }, (window.innerWidth < exports.MOBILE_CART_BREAKPOINT) && React.createElement("div", { id: "paypal-button" })) :
                React.createElement(exports.PaypalButton, { app: app, btnClass: "alt-payments__alt alt-payments__alt--paypal" }),
            isSubmittingPaypal && React.createElement(exports.PaymentSuccessMessageAndSpinner, null));
    });
    exports.PaymentSuccessMessageAndSpinner = (0, mobx_react_1.observer)(function () {
        return React.createElement("div", { className: "process-time-text" },
            React.createElement("div", { className: "media" },
                React.createElement("div", { className: "media-left" },
                    React.createElement("img", { className: "spinner", src: "/images/reDesign/global/spinner-dark-teal.png", alt: "" })),
                React.createElement("div", { className: "media-body" }, "Hooray! You're on your way to a new account. This\u00A0shouldn't take more than a minute.")));
    });
    exports.SinglePageMobileAltPaymentMethodsButtons = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        return React.createElement("div", { className: "alt-payments visible-phone-xl" },
            React.createElement(ApplePayButton, { app: app, btnClass: "alt-payments__alt alt-payments__background-black", imgSrc: "/images/payment/apple-pay-white.svg" }),
            React.createElement(GooglePayButton, { app: app, btnClass: "alt-payments__alt alt-payments__background-black", imgSrc: "/images/payment/google-pay-white.svg" }),
            React.createElement("div", { className: "alt-payments__spacer" }),
            React.createElement(exports.PaypalButton, { app: app, btnClass: "alt-payments__alt alt-payments__alt--paypal", imgSrc: "/images/payment/paypal-white.png" }));
    });
    exports.CouponCodeLink = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        var couponLabel = (function () {
            if (app.form.isEureka) {
                return "Have a coupon code?";
            }
            else if (app.isInHighIntentSinglePageCheckoutAnyVariation) {
                return "Add coupon";
            }
            else {
                return "Have a Coupon Code?";
            }
        })();
        return React.createElement(React.Fragment, null, !app.showCouponCodeInput && !app.shouldPreventCouponEdit && !app.isFamilyPlanAdminWithoutSubscription && !app.gsCourseTitle &&
            React.createElement("span", { className: "small coupon-code-link" },
                React.createElement("a", { className: "grey have-coupon-code right", onClick: (0, mobx_1.action)(function () { return app.showCouponCodeInput = !app.showCouponCodeInput; }), "data-cname": "have_coupon_code", "test-id": "have_coupon_code" }, couponLabel)));
    });
    exports.CouponCode = (0, mobx_react_1.observer)((function (_super) {
        __extends(_CouponCode, _super);
        function _CouponCode(props) {
            var _this = _super.call(this, props) || this;
            Object.defineProperty(_this, "inputRef", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            _this.inputRef = React.createRef();
            return _this;
        }
        Object.defineProperty(_CouponCode.prototype, "componentDidMount", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                setTimeout(function () {
                    var _a;
                    (_a = _this.inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                }, 100);
            }
        });
        Object.defineProperty(_CouponCode.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var _a, _b;
                var app = this.props.app;
                var topDivClassName = "form-group coupon-group";
                if ((app.validCoupon != null && !app.validCoupon) || !!app.couponValidationError) {
                    topDivClassName += " has-error";
                }
                if (app.validCoupon) {
                    topDivClassName += " has-success";
                }
                if (app.validCoupon === null && !!app.regMetadata.couponCode) {
                    topDivClassName += " is-incomplete";
                }
                var onInputChange = (0, mobx_1.action)(function () {
                    app.regMetadata.couponCode = _this.inputRef.current.value;
                    app.couponValidationError = '';
                    app.validCoupon = null;
                    if (!app.isInHighIntentSinglePageCheckoutAnyVariation) {
                        app.coupon = null;
                    }
                });
                var onSubmit = (0, mobx_1.action)(function () {
                    if (app.isInHighIntentSinglePageCheckoutAnyVariation) {
                        app.coupon = null;
                    }
                });
                var onApply = (0, mobx_1.action)(function () {
                    if (app.isInHighIntentSinglePageCheckoutAnyVariation && app.coupon) {
                        app.regMetadata.couponCode = '';
                        app.couponValidationError = '';
                        app.validCoupon = null;
                    }
                });
                if (app.regMetadata.couponCode != null && app.regMetadata.couponCode !== "") {
                    topDivClassName += " dynamic-form__question--not-empty";
                }
                var feedbackClasses = app.form.isEureka ? "dynamic-form__success" : "";
                var feedback = React.createElement(React.Fragment, null,
                    app.validCoupon && (!app.paidTrialPrice || app.referred) &&
                        React.createElement("div", { className: "feedbackText successText ".concat(feedbackClasses), "test-id": "reg_form_coupon_code_success" }, "Coupon Code Successful"),
                    !!app.couponValidationError &&
                        React.createElement("div", { className: "feedbackText errorText ".concat(app.form.isEureka && "dynamic-form__error"), "test-id": "reg_form_coupon_code_failed", "data-track-visible": true, "data-cname": getCouponErrorTrackingName(app.couponValidationError) },
                            app.isInHighIntentSinglePageCheckoutAnyVariation && React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-warning-circle-outline-20.svg" }),
                            app.couponValidationError),
                    app.validCoupon === null && !!app.regMetadata.couponCode &&
                        React.createElement("div", { className: "feedbackText errorText ".concat(app.form.isEureka && "dynamic-form__error"), "test-id": "reg_form_coupon_code_not_applied" }, "You have not applied your coupon"));
                var getApplyCouponButtonLabel = function () {
                    if (app.applyingCouponState) {
                        return 'Applying...';
                    }
                    if (!app.isInHighIntentSinglePageCheckoutAnyVariation && !app.form.isEureka) {
                        return "Apply Coupon";
                    }
                    if (app.coupon && !app.regMetadata.couponCode) {
                        return React.createElement(React.Fragment, null,
                            React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-check-circle-filled-20.svg" }),
                            React.createElement("span", null, "Coupon applied"));
                    }
                    return "Apply coupon";
                };
                var getPlaceholder = function () {
                    if (app.isInHighIntentSinglePageCheckoutAnyVariation) {
                        return "Coupon code";
                    }
                    if (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                        return "Coupon code";
                    }
                    return "";
                };
                return React.createElement(React.Fragment, null, app.form.isEureka ? (React.createElement(React.Fragment, null, app.showCouponCodeInput &&
                    React.createElement("div", { className: topDivClassName },
                        app.isInHighIntentSinglePageCheckoutAnyVariation && React.createElement("div", { className: "coupon-code-header" }, "Coupon code"),
                        React.createElement("div", { className: "coupon-code-input" },
                            !app.isInHighIntentSinglePageCheckoutAnyVariation && ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && React.createElement("span", { className: "dynamic-form__label" },
                                React.createElement("span", { className: "dynamic-form__label--delighter" }, "Coupon Code")),
                            React.createElement(eureka_design_system_1.Input, { autoComplete: "placeholder-coupon", "data-cname": "reg_form_coupon_code", "test-id": "reg_form_coupon_code", size: 10, type: "text", name: "couponCode", placeholder: getPlaceholder(), ref: this.inputRef, value: (_a = app.regMetadata.couponCode) !== null && _a !== void 0 ? _a : "", onChange: onInputChange, maxLength: 50 }),
                            !app.isInHighIntentSinglePageCheckoutAnyVariation && feedback,
                            app.isInHighIntentSinglePageCheckoutAnyVariation && React.createElement(React.Fragment, null,
                                React.createElement("div", { className: "coupon-code-success" }, feedback))),
                        React.createElement("div", { className: "coupon-code-btn" },
                            React.createElement(eureka_design_system_1.Button, { type: "button", onClick: function () {
                                    onSubmit();
                                    app.applyCoupon().then(onApply);
                                }, "data-cname": "reg_form_apply_coupon_code", "test-id": "reg_form_apply_coupon_code" }, getApplyCouponButtonLabel())),
                        !app.isInHighIntentSinglePageCheckoutAnyVariation && React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "coupon-code-success" }, app.validCoupon && app.paidTrialPrice && !app.referred &&
                                React.createElement("div", { className: "feedbackText successText ".concat(app.form.isEureka && "dynamic-form__success"), "test-id": "reg_form_coupon_code_success" },
                                    "Coupon Code Successful. Your new monthly price is ",
                                    (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100),
                                    "/mo")))))) : (React.createElement(React.Fragment, null, app.showCouponCodeInput && React.createElement("div", { className: topDivClassName },
                    app.isInHighIntentSinglePageCheckoutAnyVariation && React.createElement("div", { className: "coupon-code-header" }, "Coupon code"),
                    React.createElement("div", { className: "col-xs-12 col-sm-10 col-md-7 coupon-code-input" },
                        !app.isInHighIntentSinglePageCheckoutAnyVariation && ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && React.createElement("span", { className: "dynamic-form__label" },
                            React.createElement("span", { className: "dynamic-form__label--delighter" }, "Coupon Code")),
                        React.createElement("input", { autoComplete: "placeholder-coupon", className: "form-control coupon-code-input-element", "data-cname": "reg_form_coupon_code", "test-id": "reg_form_coupon_code", size: 10, type: "text", name: "couponCode", placeholder: getPlaceholder(), ref: this.inputRef, value: (_b = app.regMetadata.couponCode) !== null && _b !== void 0 ? _b : "", onChange: onInputChange, maxLength: 50 }),
                        !app.isInHighIntentSinglePageCheckoutAnyVariation && feedback,
                        app.isInHighIntentSinglePageCheckoutAnyVariation && React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "coupon-code-success" }, feedback))),
                    React.createElement("div", { className: "col-xs-12 col-sm-10 col-md-5 coupon-code-btn" },
                        React.createElement("button", { type: "button", className: "".concat(app.isInHighIntentSinglePageCheckoutAnyVariation ? 'apply-coupon-single-page-btn'
                                : 'btn btn-sm btn-blue btn-block', " coupon form-control"), onClick: function () {
                                onSubmit();
                                app.applyCoupon().then(onApply);
                            }, "data-cname": "reg_form_apply_coupon_code", "test-id": "reg_form_apply_coupon_code" }, getApplyCouponButtonLabel())),
                    !app.isInHighIntentSinglePageCheckoutAnyVariation && React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "col-xs-12 coupon-code-success" }, app.validCoupon && app.paidTrialPrice && !app.referred &&
                            React.createElement("div", { className: "feedbackText successText", "test-id": "reg_form_coupon_code_success" },
                                "Coupon Code Successful. Your new monthly price is ",
                                (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100),
                                "/mo")))))));
            }
        });
        return _CouponCode;
    }(React.Component)));
    var FreeTrialDisclaimer = function () {
        return React.createElement("div", { className: "col-xs-12 disclaimer-text" },
            React.createElement("p", { className: "small" },
                "By creating an account, you agree to Study.com's ",
                React.createElement("a", { href: "https://study.com/pages/terms_of_use.html", target: "_blank", tabIndex: -1, "data-cname": "terms_of_use" }, "Terms of Use"),
                " and ",
                React.createElement("a", { href: "https://study.com/pages/privacy_policy.html", target: "_blank", tabIndex: -1, "data-cname": "privacy_policy" }, "Privacy Policy"),
                "."));
    };
    exports.FreeTrialDisclaimer = FreeTrialDisclaimer;
    exports.BackButton = (0, mobx_react_1.observer)(function (props) {
        return React.createElement(React.Fragment, null, !props.app.form.submitting && React.createElement("a", { type: 'button', className: "back", "data-cname": "reg_back_button", "test-id": "reg_back_button", onClick: function () { return props.app.form.goBack(); } }, "back"));
    });
    exports.ParentEmailConfirmationModalView = (0, mobx_react_1.observer)((function (_super) {
        __extends(_ParentEmailConfirmationModalView, _super);
        function _ParentEmailConfirmationModalView(props) {
            var _this = _super.call(this, props) || this;
            _this.state = { isOpen: true };
            return _this;
        }
        Object.defineProperty(_ParentEmailConfirmationModalView.prototype, "doConfirm", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.setState({ isOpen: false });
                this.props.confirm();
            }
        });
        Object.defineProperty(_ParentEmailConfirmationModalView.prototype, "doChangeEmail", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.setState({ isOpen: false });
                this.props.changeEmail();
            }
        });
        Object.defineProperty(_ParentEmailConfirmationModalView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                return React.createElement(react_bootstrap_1.Modal, { show: this.state.isOpen, className: "parent-email-confirm-modal", "data-cname": "parent_email_confirm_modal", "test-id": "parent_email_confirm_modal" },
                    React.createElement(react_bootstrap_1.Modal.Body, { className: "modal-body" },
                        React.createElement("div", { className: "parent-email-confirm-modal__disclaimer" }, "Confirm this is the parent's email address and not the student's"),
                        React.createElement("div", { className: "parent-email-confirm-modal__email", "test-id": "parent_email_confirm_modal_email" }, this.props.app.registrationData.email),
                        React.createElement("div", { className: "parent-email-confirm-modal__buttons" },
                            React.createElement("button", { onClick: function () { return _this.doConfirm(); }, className: "btn btn-md btn-primary", "data-cname": "parent_email_confirm_modal_continue", "test-id": "parent_email_confirm_modal_continue" }, "Confirm & Join")),
                        React.createElement("div", { className: "parent-email-confirm-modal__buttons" },
                            React.createElement("button", { onClick: function () { return _this.doChangeEmail(); }, className: "btn btn-link parent-email-confirm-modal__buttons--link", "data-cname": "parent_email_confirm_modal_change", "test-id": "parent_email_confirm_modal_change" }, "Change email"))));
            }
        });
        return _ParentEmailConfirmationModalView;
    }(React.Component)));
    function loadAndOpenParentEmailConfirmationModal(app) {
        var modalElement = document.createElement("div");
        document.body.appendChild(modalElement);
        var confirm = undefined;
        var changeEmail = undefined;
        var promise = new Promise(function (resolve, reject) {
            confirm = function () {
                resolve();
            };
            changeEmail = function () {
                reject();
            };
        });
        var root = (0, client_1.createRoot)(modalElement);
        root.render(React.createElement(GenericErrorBoundary_1.GenericErrorBoundaryView, null,
            React.createElement(react_study_helpers_1.StudyThemeProvider, null,
                React.createElement(exports.ParentEmailConfirmationModalView, { confirm: confirm, changeEmail: changeEmail, app: app }))));
        return promise;
    }
    exports.WhyPaymentInfoModalView = (0, mobx_react_1.observer)((function (_super) {
        __extends(_WhyPaymentInfoModalView, _super);
        function _WhyPaymentInfoModalView(props) {
            var _this = _super.call(this, props) || this;
            _this.state = { isOpen: true };
            return _this;
        }
        Object.defineProperty(_WhyPaymentInfoModalView.prototype, "closeModal", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.setState({ isOpen: false });
                this.props.cleanup();
            }
        });
        ;
        Object.defineProperty(_WhyPaymentInfoModalView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                return React.createElement(react_bootstrap_1.Modal, { show: this.state.isOpen, className: "infoModal", dialogClassName: "payment-info-modal" },
                    React.createElement(react_bootstrap_1.Modal.Header, null,
                        React.createElement(react_bootstrap_1.CloseButton, { onClick: function () { return _this.closeModal(); }, "test-id": "close_why_payment_modal", "data-cname": "close_why_payment_modal" })),
                    React.createElement(react_bootstrap_1.Modal.Body, { className: "modal-body infoModal__body", "data-cname": "why_payment_modal", "test-id": "why_payment_modal", "data-track-visible": true },
                        React.createElement("h3", { className: "modal-title infoModal__title", id: "myModalLabel" }, "Payment Information"),
                        React.createElement("h4", { className: "infoModal__subheading" }, "Here's why we ask for your payment info:"),
                        React.createElement("ol", { className: "infoModal__list" },
                            React.createElement("li", { className: "infoModal__text" },
                                React.createElement("b", null, "Integrity."),
                                " Without a credit card on file, spammers could create fake accounts and ruin the integrity of our program. Credit cards ensure people like you, who are serious about their education, can access this incredible resource."),
                            React.createElement("li", { className: "infoModal__text" },
                                React.createElement("b", null, "Easy for you to continue."),
                                " This also makes it easy for you to save your progress and continue studying.")),
                        React.createElement("p", { className: "infoModal__text" }, "Remember, you can cancel anytime in just a few simple clicks."),
                        React.createElement("button", { className: "e2-button e2-button--primary infoModal__button", onClick: function () { return _this.closeModal(); }, "aria-label": "Close", "data-cname": "close_why_payment_modal_bottom", "test-id": "close_why_payment_modal_bottom" }, "Close")));
            }
        });
        return _WhyPaymentInfoModalView;
    }(React.Component)));
    function loadAndOpenWhyPaymentInfoModal() {
        var modalElement = document.createElement("div");
        document.body.appendChild(modalElement);
        var cleanup = function () {
            document.body.removeChild(modalElement);
        };
        var root = (0, client_1.createRoot)(modalElement);
        root.render(React.createElement(GenericErrorBoundary_1.GenericErrorBoundaryView, null,
            React.createElement(react_study_helpers_1.StudyThemeProvider, null,
                React.createElement(exports.WhyPaymentInfoModalView, { cleanup: cleanup }))));
    }
    var ExpirationDateTextInputViewClazz = (function (_super) {
        __extends(ExpirationDateTextInputViewClazz, _super);
        function ExpirationDateTextInputViewClazz() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            Object.defineProperty(_this, "inputRef", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: React.createRef()
            });
            return _this;
        }
        Object.defineProperty(ExpirationDateTextInputViewClazz.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var placeholder = this.props.questionStore.placeholder;
                if (!placeholder) {
                    placeholder = "mm/yy";
                    if (!ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile()) {
                        placeholder = "01/24";
                    }
                }
                return React.createElement("input", { type: "text", inputMode: "numeric", name: "expirationDate", "data-cname": "reg_form_cc_expiration_date", "test-id": "reg_form_cc_expiration_date", className: "dynamic-form__text", placeholder: placeholder, ref: this.inputRef, maxLength: 5, onBlur: (0, mobx_1.action)(function () { return _this.onBlur(); }), onKeyUp: (0, mobx_1.action)(function (e) { return _this.onKeyUp(e); }), "data-no-log": true, autoComplete: "cc-exp" });
            }
        });
        Object.defineProperty(ExpirationDateTextInputViewClazz.prototype, "getInputValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a;
                return (_a = this.inputRef.current.value) !== null && _a !== void 0 ? _a : "";
            }
        });
        Object.defineProperty(ExpirationDateTextInputViewClazz.prototype, "onKeyUp", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (e) {
                var questionStore = this.props.questionStore;
                var newValue = this.getInputValue();
                var shouldMassageInput = !(e.key == "Backspace");
                if (shouldMassageInput) {
                    var beforeValue = newValue;
                    newValue = this.massageValue(beforeValue);
                    if (beforeValue != newValue) {
                        this.inputRef.current.value = newValue;
                    }
                }
                if (questionStore.dirty) {
                    this.persistInputValueToStore(newValue);
                }
            }
        });
        Object.defineProperty(ExpirationDateTextInputViewClazz.prototype, "onBlur", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var questionStore = this.props.questionStore;
                var inputValue = this.getInputValue();
                if (inputValue.trim().length == 0 && !questionStore.dirty) {
                    return;
                }
                this.persistInputValueToStore(inputValue);
            }
        });
        Object.defineProperty(ExpirationDateTextInputViewClazz.prototype, "persistInputValueToStore", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value) {
                var questionStore = this.props.questionStore;
                questionStore.setValue(value);
            }
        });
        Object.defineProperty(ExpirationDateTextInputViewClazz.prototype, "massageValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (rawValue) {
                return (rawValue !== null && rawValue !== void 0 ? rawValue : "")
                    .replace(/^([1-9]\/|[2-9])$/g, '0$1/')
                    .replace(/^(0[1-9]|1[0-2])(\d?)$/g, '$1/$2')
                    .replace(/^([0-1])([3-9])$/g, '0$1/$2')
                    .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2')
                    .replace(/^([0]+)\/|[0]+$/g, '0')
                    .replace(/[^\d\/]|^[\/]*$/g, '')
                    .replace(/\/\//g, '/');
            }
        });
        Object.defineProperty(ExpirationDateTextInputViewClazz.prototype, "onSubmit", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var inputValue = this.getInputValue();
                this.persistInputValueToStore(inputValue);
            }
        });
        Object.defineProperty(ExpirationDateTextInputViewClazz, "extractMonthStr", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (expirationDateVal) {
                if ((expirationDateVal !== null && expirationDateVal !== void 0 ? expirationDateVal : "").trim().length == 0) {
                    return null;
                }
                var parts = expirationDateVal.trim().split("/");
                if (parts.length != 2) {
                    return null;
                }
                var monthVal = Number(parts[0]);
                if (isNaN(monthVal)) {
                    return null;
                }
                return monthVal.toString();
            }
        });
        Object.defineProperty(ExpirationDateTextInputViewClazz, "extractYearStr", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (expirationDateVal) {
                if ((expirationDateVal !== null && expirationDateVal !== void 0 ? expirationDateVal : "").trim().length == 0) {
                    return null;
                }
                var parts = expirationDateVal.trim().split("/");
                if (parts.length != 2) {
                    return null;
                }
                var yearVal = Number(parts[1]);
                if (isNaN(yearVal)) {
                    return null;
                }
                return (yearVal + 2000).toString();
            }
        });
        Object.defineProperty(ExpirationDateTextInputViewClazz, "isValid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (expirationDateVal) {
                return this.getErrorMessageIfInvalid(expirationDateVal) == null;
            }
        });
        Object.defineProperty(ExpirationDateTextInputViewClazz, "getErrorMessageIfInvalid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (expirationDateVal) {
                var rawValue = expirationDateVal !== null && expirationDateVal !== void 0 ? expirationDateVal : "";
                if (rawValue.trim().length == 0) {
                    return null;
                }
                var DEFAULT_ERROR_MESSAGE = (React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_expiration_date_invalid", "test-id": "reg_error_expiration_date_invalid" }, "Make sure your credit card's expiration date is MM/YY and has not yet expired"));
                if (rawValue.length != 5 || rawValue.indexOf("/") != 2) {
                    return DEFAULT_ERROR_MESSAGE;
                }
                var parts = rawValue.split("/");
                if (parts.length != 2) {
                    return DEFAULT_ERROR_MESSAGE;
                }
                var monthVal = Number(parts[0]);
                var yearVal = Number(parts[1]) + 2000;
                if (isNaN(monthVal) || isNaN(yearVal)) {
                    return DEFAULT_ERROR_MESSAGE;
                }
                var currentYear = new Date().getFullYear();
                var currentMonth = new Date().getMonth() + 1;
                var EXPIRATION_DATE_IS_PAST = (React.createElement("span", { "data-track-visible": true, "data-cname": "reg_error_expiration_date_expired", "test-id": "reg_error_expiration_date_expired" }, "Your credit card's expiration date must be in the future"));
                if (yearVal < currentYear) {
                    return EXPIRATION_DATE_IS_PAST;
                }
                if (yearVal == currentYear && monthVal < currentMonth) {
                    return EXPIRATION_DATE_IS_PAST;
                }
                return null;
            }
        });
        return ExpirationDateTextInputViewClazz;
    }(React.Component));
    exports.ExpirationDateTextInputViewClazz = ExpirationDateTextInputViewClazz;
    exports.ExpirationDateTextInputView = (0, mobx_react_1.observer)(ExpirationDateTextInputViewClazz);
});

//# sourceMappingURL=RegPaymentMethodTabsViews.js.map

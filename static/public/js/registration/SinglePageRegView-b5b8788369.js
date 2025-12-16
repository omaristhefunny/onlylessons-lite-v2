var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports", "@sites-study-com/marketing-constants", "@study-com/dynamic-form", "card-validator", "components/CollapsibleAutoSizeComponent", "components/GenericErrorBoundary", "eureka/EurekaButton", "lib/axios", "@sites-study-com/marketing", "mobx", "mobx-react", "react", "react", "react-utils/media-query-store-util", "react-utils/react-study-helpers", "registration/ReactRegAppUtil", "registration/ReactRegPage.app", "registration/RegPaymentMethodTabsViews", "registration/RegProductBulletsViews", "registration/RegSidebarViews", "util/InlineSvgComponents"], function (require, exports, Marketing, dynamic_form_1, card_validator_1, CollapsibleAutoSizeComponent_1, GenericErrorBoundary_1, EurekaButton_1, axios_1, marketing_1, mobx_1, mobx_react_1, React, react_1, media_query_store_util_1, react_study_helpers_1, ReactRegAppUtil_1, ReactRegPage_app_1, RegPaymentMethodTabsViews_1, RegProductBulletsViews_1, RegSidebarViews_1, InlineSvgComponents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SinglePageCouponDiscount = void 0;
    var getDynamicFormQuestionsForAccountInformation = function (app) {
        return app.form.pages.flatMap(function (page) { return page.questions; })
            .filter(function (question) { return question.key === "billingFirstName" || question.key === "billingLastName" || question.key === "email" || question.key
            === "phoneSms" || question.key === "password"; });
    };
    var getDynamicFormQuestionsForPaymentDetails = function (app) {
        return app.form.pages.flatMap(function (page) { return page.questions; })
            .filter(function (question) { return question.key === "creditCardNumber" || question.key === "expirationDate" || question.key === "creditCardCvc" || question.key
            === "billingAddressZipCode" || question.key === "billingAddressCountry"; });
    };
    var toggleDynamicFormPasswordVisibility = function (setShowPassword) {
        var passwordInput = $(".dynamic-form__question--password .dynamic-form__text");
        if (!passwordInput || !passwordInput.attr("type")) {
            return;
        }
        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");
            setShowPassword(true);
        }
        else {
            passwordInput.attr("type", "password");
            setShowPassword(false);
        }
    };
    var SinglePageRegView = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        var submitting = app.form.submitting ? 'dynamic-form--submitting' : '';
        var isMobile = media_query_store_util_1.mediumMaxQuery.matches;
        var _a = React.useState(true), accountInformationIsOpen = _a[0], setAccountInformationIsOpen = _a[1];
        var _b = React.useState(false), paymentDetailsIsOpen = _b[0], setPaymentDetailsIsOpen = _b[1];
        var markAllSinglePageCheckoutFieldsDirty = function () {
            var allDynamicFormQuestionsOnPage = __spreadArray(__spreadArray([], getDynamicFormQuestionsForAccountInformation(app), true), getDynamicFormQuestionsForPaymentDetails(app), true);
            allDynamicFormQuestionsOnPage.forEach(function (q) { return q.dirty = true; });
        };
        var singlePageCheckoutFormIsValid = function () {
            var allDynamicFormQuestionsOnPage = __spreadArray(__spreadArray([], getDynamicFormQuestionsForAccountInformation(app), true), getDynamicFormQuestionsForPaymentDetails(app), true);
            return allDynamicFormQuestionsOnPage.reduce(function (r, q) { return r && q.valid; }, true);
        };
        var onFormSubmit = function (e) {
            e.preventDefault();
            markAllSinglePageCheckoutFieldsDirty();
            if (singlePageCheckoutFormIsValid()) {
                app.form.submitting = true;
                app.submitRegPage().then(function () {
                    if (app.isInHighIntentSinglePageCheckoutNovemberProgressive) {
                        var emailQuestion = app.form.getDynamicFormQuestionWithKey("email");
                        var phoneSmsQuestion = app.form.getDynamicFormQuestionWithKey("phoneSms");
                        if (emailQuestion.displayedErrors.length > 0 || phoneSmsQuestion.displayedErrors.length > 0) {
                            setAccountInformationIsOpen(true);
                        }
                    }
                });
            }
            else {
                console.error("Form is not valid");
            }
        };
        return React.createElement(React.StrictMode, null,
            React.createElement(GenericErrorBoundary_1.GenericErrorBoundaryView, null,
                React.createElement("form", { onSubmit: (0, mobx_1.action)(function (e) { return onFormSubmit(e); }), className: "dynamic-form dynamic-form--last-page ".concat(submitting) },
                    React.createElement("div", { className: "single-page-reg-view" },
                        React.createElement("div", { className: "reg-form-container" },
                            React.createElement("div", { className: "reg-form" },
                                React.createElement(RegFormHeaderView, null),
                                React.createElement(AccountInformationView, { app: app, accountInformationIsOpen: accountInformationIsOpen, setAccountInformationIsOpen: setAccountInformationIsOpen, setPaymentDetailsIsOpen: setPaymentDetailsIsOpen }),
                                React.createElement(PaymentDetailsView, { app: app, paymentDetailsIsOpen: paymentDetailsIsOpen }))),
                        React.createElement("div", { className: "reg-sidebar-container ".concat(app.isInHighIntentSinglePageCheckoutNovemberProgressive ? "checkout-v2" : "") },
                            React.createElement("div", { className: "reg-sidebar-november " },
                                (!isMobile && app.isInHighIntentSinglePageCheckoutNovemberExpanded) && React.createElement(ProductInfoViewNovember, { app: app }),
                                React.createElement("div", { className: "reg-sidebar-claim-container" },
                                    React.createElement("div", { className: "reg-sidebar-claim" },
                                        React.createElement("div", { className: "claim-circle" },
                                            React.createElement("h4", { className: "claim-amount" }, "92%")),
                                        React.createElement("div", { className: "claim-description" },
                                            "of students passed their exam after using Study.com",
                                            React.createElement("span", { className: "sup" }, "*")))),
                                React.createElement(ProductBulletsView, { app: app })))),
                    React.createElement(SinglePageFaq, { app: app }))));
    });
    var SinglePageFaq = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        return React.createElement("div", { className: "single-page-reg-faq" },
            React.createElement("div", { className: "faq-container" },
                React.createElement("div", { className: "faq-section" },
                    React.createElement("div", { className: "faq-question" }, "Can I cancel my subscription at any time?"),
                    React.createElement("div", { className: "faq-answer" }, "Yes! You can cancel your Study.com subscription at any time. After you cancel your subscription, you will have access to our website for the rest of your billing cycle. On your next billing date, your credit card will not be charged and your Study.com access will be restricted. If you cancel your membership during a Special Offer period, your Study.com access will be terminated immediately upon cancellation. Special Offer periods are non-refundable.")),
                React.createElement("div", { className: "faq-section" },
                    React.createElement("div", { className: "faq-question" }, "How does Study.com\u2019s money-back guarantee work?"),
                    React.createElement("div", { className: "faq-answer" },
                        "Study.com's ",
                        React.createElement(marketing_1.RiskFreeLanguage, null),
                        " allows you to sign up for a membership and start using Study.com right away. If you are not satisfied in your first 30 days you can request a refund by emailing ",
                        React.createElement("a", { href: "email:support@study.com" }, "support@study.com"),
                        ". Refunds are not automatically issued and must be requested.")),
                React.createElement("div", { className: "faq-section" },
                    React.createElement("div", { className: "faq-question" }, "How does Study.com work?"),
                    React.createElement("div", { className: "faq-answer" }, "Test prep members get full access to practice questions, practice tests, video lessons, flashcards, and chat tutoring. We create personalized study plans for every learner. Members can complete a short assessment to get prioritized recommendations for test-aligned topics to study, practice, and learn. Personalized study recommendations adapt as learners\u2019 skills improve.")),
                React.createElement("div", { className: "faq-section" },
                    React.createElement("div", { className: "faq-question" }, "Who creates your curriculum and materials?"),
                    React.createElement("div", { className: "faq-answer" }, "Study.com is proud of providing a curriculum you can trust. All of our learning materials are crafted by expert instructors (teachers, professors, M.Ed., Ph.D., etc.) who have mastered their subject matter and strive to make learning exciting and easy."))),
            React.createElement("div", { className: "disclaimer" },
                React.createElement(TestPrepDisclaimerView, { app: app })));
    });
    var RegFormHeaderView = function () {
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "reg-form-header" },
                React.createElement("div", { className: "reg-form-heading" }, "Create your account"),
                React.createElement("div", { className: "reg-form-subheading" }, "Try it risk-free. No obligation; cancel anytime.")));
    };
    var AccountInformationView = (0, mobx_react_1.observer)(function (props) {
        var app = props.app, accountInformationIsOpen = props.accountInformationIsOpen, setAccountInformationIsOpen = props.setAccountInformationIsOpen, setPaymentDetailsIsOpen = props.setPaymentDetailsIsOpen;
        var _a = React.useState(false), showPassword = _a[0], setShowPassword = _a[1];
        var onSaveAndContinue = function (e) {
            e.preventDefault();
            getDynamicFormQuestionsForAccountInformation(app).forEach(function (q) { return q.dirty = true; });
            if (getDynamicFormQuestionsForAccountInformation(app).reduce(function (r, q) { return r && (q.valid); }, true)) {
                setAccountInformationIsOpen(false);
                setPaymentDetailsIsOpen(true);
            }
        };
        var phoneNumberTermText = "By proceeding and providing your phone number, you consent to receive text messages from Study.com. Text messages may be autodialed and frequency varies. You may text stop to cancel any time.";
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "reg-form-account-information" },
                React.createElement("div", { className: "account-information__header", "test-id": "account_information_header" },
                    app.isInHighIntentSinglePageCheckoutNovemberProgressive && !accountInformationIsOpen && React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "account-information__header-contents" },
                            React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-check-circle-filled-24.svg", className: "account-information__header-checkbox" }),
                            React.createElement("span", null, "Account information")),
                        React.createElement("div", { className: "account-information__edit", onClick: function () { return setAccountInformationIsOpen(true); } },
                            React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-edit-20.svg" }),
                            React.createElement("span", null, "Edit"))),
                    (!app.isInHighIntentSinglePageCheckoutNovemberProgressive || accountInformationIsOpen) && React.createElement(React.Fragment, null,
                        React.createElement("div", null, "Account information"))),
                app.isInHighIntentSinglePageCheckoutNovemberProgressive && !accountInformationIsOpen && React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "account-information__summary" },
                        React.createElement("div", { className: "account-information__summary-name" },
                            app.form.values.billingFirstName,
                            " ",
                            app.form.values.billingLastName),
                        React.createElement("div", null, app.form.values.email),
                        React.createElement("div", null, app.form.values.phoneSms))),
                React.createElement(CollapsibleAutoSizeComponent_1.CollapsibleAutoSizeComponent, { collapsed: app.isInHighIntentSinglePageCheckoutNovemberProgressive && !accountInformationIsOpen, className: "account-information__collapsible", overflow: "hidden" },
                    React.createElement("div", { className: "account-information__fields" },
                        React.createElement("div", { className: "account-information__name-fields" },
                            React.createElement("div", { className: "account-information__first-name" },
                                React.createElement(dynamic_form_1.DynamicFormQuestionView, { store: app.form.getDynamicFormQuestionWithKey("billingFirstName") })),
                            React.createElement("div", { className: "account-information__last-name" },
                                React.createElement(dynamic_form_1.DynamicFormQuestionView, { store: app.form.getDynamicFormQuestionWithKey("billingLastName") }))),
                        React.createElement("div", { className: "account-information__contact-fields" },
                            React.createElement("div", { className: "account-information__email" },
                                React.createElement(dynamic_form_1.DynamicFormQuestionView, { store: app.form.getDynamicFormQuestionWithKey("email") })),
                            React.createElement("div", { className: "account-information__phone-number" },
                                React.createElement(dynamic_form_1.DynamicFormQuestionView, { store: app.form.getDynamicFormQuestionWithKey("phoneSms") }))),
                        React.createElement("div", { className: "account-information__password" },
                            React.createElement(dynamic_form_1.DynamicFormQuestionView, { store: app.form.getDynamicFormQuestionWithKey("password") }),
                            React.createElement("div", { className: "account-information__password-show", onClick: function () { return toggleDynamicFormPasswordVisibility(setShowPassword); } }, showPassword ? "Hide" : "Show"))),
                    (app.isInHighIntentSinglePageCheckoutNovemberProgressive) && React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "account-information__save-continue" },
                            React.createElement(EurekaButton_1.EurekaButton, { buttonType: EurekaButton_1.EurekaButtonType.PRIMARY, className: "account-information__save-continue-button", "test-id": "save_account_information", "data-cname": "save_account_information", onClick: function (e) { return onSaveAndContinue(e); } }, "Save & continue"))),
                    React.createElement("div", { className: "account-information__terms-of-use ".concat(app.isInHighIntentSinglePageCheckoutNovemberProgressive ? "terms-v2" : "") }, app.isInHighIntentSinglePageCheckoutNovemberProgressive ? React.createElement(React.Fragment, null,
                        "By clicking \u201CSave & continue,\u201D you agree to Study.com's ",
                        React.createElement("a", { href: "https://study.com/pages/terms_of_use.html", className: "account-information__links" }, "Terms of Use"),
                        " and ",
                        React.createElement("a", { href: "https://study.com/pages/privacy_policy.html", className: "account-information__links" }, "Privacy Policy"),
                        ". ",
                        phoneNumberTermText) : React.createElement(React.Fragment, null, phoneNumberTermText)))));
    });
    var PaymentDetailsView = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        var isMobile = media_query_store_util_1.mediumMaxQuery.matches;
        var paymentDetailsIsOpen = props.paymentDetailsIsOpen;
        var _a = React.useState("CREDIT_CARD"), currentDesktopPaymentType = _a[0], setCurrentDesktopPaymentType = _a[1];
        var cardType = "unknown";
        var cardNum = app.form.values.creditCardNumber;
        var card = (0, card_validator_1.number)(cardNum).card;
        if (card) {
            if (ReactRegPage_app_1.ReactRegPageApp.KNOWN_CARD_TYPES.indexOf(card.type) >= 0) {
                cardType = card.type;
            }
        }
        return React.createElement("div", { className: "reg-form-payment-details" },
            React.createElement("div", { className: "reg-form-payment-details__header" },
                React.createElement("h1", null, "Payment details"),
                (paymentDetailsIsOpen || !app.isInHighIntentSinglePageCheckoutNovemberProgressive) && React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "reg-form-payment-details__secure-server" },
                        React.createElement(ReactRegPage_app_1.SecuritySeal, { useSvgLock: true })))),
            React.createElement(CollapsibleAutoSizeComponent_1.CollapsibleAutoSizeComponent, { collapsed: app.isInHighIntentSinglePageCheckoutNovemberProgressive && !paymentDetailsIsOpen, overflow: "hidden" },
                React.createElement("div", { className: "payment-details__collapsible" },
                    (isMobile || app.isInHighIntentSinglePageCheckoutNovemberProgressive) &&
                        React.createElement("div", { className: "reg-sidebar-november mobile-pricebox" },
                            React.createElement(ProductInfoViewNovember, { app: app })),
                    React.createElement(RegPaymentMethodTabsViews_1.SinglePageMobileAltPaymentMethodsButtons, { app: app }),
                    React.createElement("div", { className: "alt-payments hidden-phone-xl" },
                        React.createElement("div", { className: "payment-switcher-tabs" },
                            React.createElement("div", { className: "payment-switcher-tab", onClick: function () { return setCurrentDesktopPaymentType("CREDIT_CARD"); } },
                                currentDesktopPaymentType === "CREDIT_CARD" ? React.createElement(React.Fragment, null,
                                    React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-radio-filled-24.svg", className: "payment-switcher-radio-icon" })) : React.createElement(React.Fragment, null,
                                    React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-radio-empty-24.svg", className: "payment-switcher-radio-icon" })),
                                React.createElement("span", null, "Credit card")),
                            React.createElement("div", { className: "payment-switcher-tab", onClick: function () { return setCurrentDesktopPaymentType("PAYPAL"); } },
                                currentDesktopPaymentType === "PAYPAL" ? React.createElement(React.Fragment, null,
                                    React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-radio-filled-24.svg", className: "payment-switcher-radio-icon" })) : React.createElement(React.Fragment, null,
                                    React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-radio-empty-24.svg", className: "payment-switcher-radio-icon" })),
                                React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/payment/paypal2.svg", className: "payment-switcher-tab-paypal-logo" })))),
                    React.createElement("div", { className: "visible-phone-xl reg-form-payment-details__divider" },
                        React.createElement("div", { className: "reg-form-payment-details__divider-line" }),
                        React.createElement("div", { className: "reg-form-payment-details__divider-text" }, "OR PAY WITH CREDIT CARD"),
                        React.createElement("div", { className: "reg-form-payment-details__divider-line" })),
                    currentDesktopPaymentType === "CREDIT_CARD" && React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "reg-form-payment-details__card-section ".concat(!app.showCouponCodeInput ? "coupon-link-visible" : "") },
                            React.createElement("div", { className: "reg-form-payment-details__credit-card-number" },
                                React.createElement(dynamic_form_1.DynamicFormQuestionView, { store: app.form.getDynamicFormQuestionWithKey("creditCardNumber") })),
                            React.createElement("span", { className: "single-page-mobile-card-icons cardIcons card-" + cardType })),
                        React.createElement("div", { className: "reg-form-payment-details__card-details-section ".concat(!app.showCouponCodeInput ? "coupon-link-visible" : "") },
                            React.createElement("div", { className: "reg-form-payment-details__expiration-date" },
                                React.createElement(dynamic_form_1.DynamicFormQuestionView, { store: app.form.getDynamicFormQuestionWithKey("expirationDate") })),
                            React.createElement("div", { className: "reg-form-payment-details__cvc" },
                                React.createElement(dynamic_form_1.DynamicFormQuestionView, { store: app.form.getDynamicFormQuestionWithKey("creditCardCvc") })),
                            !app.isInternational && React.createElement(React.Fragment, null,
                                React.createElement("div", { className: "reg-form-payment-details__zip-code" },
                                    React.createElement(dynamic_form_1.DynamicFormQuestionView, { store: app.form.getDynamicFormQuestionWithKey("billingAddressZipCode") })))),
                        app.showCouponCodeInput && React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "reg-form-payment-details__coupon-section" },
                                React.createElement("div", { className: "reg-form-payment-details__coupon-code" },
                                    React.createElement(dynamic_form_1.DynamicFormQuestionView, { store: app.form.getDynamicFormQuestionWithKey("couponCodeField") })))),
                        React.createElement("div", { className: "reg-form-payment-details__location-section" },
                            React.createElement("div", { className: "reg-form-payment-details__country" },
                                React.createElement(dynamic_form_1.DynamicFormQuestionView, { store: app.form.getDynamicFormQuestionWithKey("billingAddressCountry") }))),
                        React.createElement(SubmitRegFormView, { app: app })),
                    currentDesktopPaymentType === "PAYPAL" && React.createElement("div", { className: "paypal-section" },
                        React.createElement("div", { className: "paypal-header" }, "Continue to PayPal to create your account."),
                        React.createElement("div", { className: "paypal-subheader" }, "Once your payment is confirmed through PayPal, you'll get automatically redirected to Study.com."),
                        React.createElement(SinglePageDesktopPaypalButton, { app: app })))));
    });
    var SinglePageDesktopPaypalButton = function (_a) {
        var app = _a.app;
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
        return React.createElement(EurekaButton_1.EurekaButton, { buttonType: EurekaButton_1.EurekaButtonType.PRIMARY, className: "single-page-desktop-paypal-button", onClick: function () { return app.submitRegFormWithPayPal(); }, "data-paypal-submit-button": "", disabled: shouldDisable },
            React.createElement("span", null, "Check out with"),
            React.createElement("img", { src: "/images/payment/paypal-white.png", className: "paypal-button-white" }));
    };
    var SubmitRegFormView = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        return React.createElement("div", { className: "reg-form-join-submit ".concat(app.isInHighIntentSinglePageCheckoutNovemberProgressive ? "v2-checkout" : "") },
            React.createElement(ReactRegPage_app_1.BillingPageControls, { app: app, product: app.product, store: app.form }));
    });
    var TestPrepDisclaimerView = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        return React.createElement(React.Fragment, null, ReactRegAppUtil_1.reactRegAppUtil.isTestPrepGoal(app)
            && React.createElement("div", { className: "test-prep-claims-disclaimer--reg-page test-prep-claims-disclaimer--single-page-reg-view ".concat(app.scoreBasedProducts.indexOf(app.regMetadata.product) > -1 ? 'score-based' : '') },
                React.createElement(ReactRegAppUtil_1.TestPrepDisclaimer, null)));
    });
    var ProductInfoViewNovember = (0, mobx_react_1.observer)(function (props) {
        var _a;
        var app = props.app;
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "cart-product__product-title", "data-track-visible": true, "data-cname": "cart_product", "data-extra": ((_a = app.product) === null || _a === void 0 ? void 0 : _a.displayName) + (app.paidTrialPrice ? " PAID_TRIAL" : "") },
                !app.registrationData.wantsFamilyPlan && React.createElement("span", { className: "product-title-style", "test-id": "cart_product_name" }, (0, RegSidebarViews_1.buildProductName)(app)),
                app.registrationData.wantsFamilyPlan && React.createElement("span", { className: "product-title-style", "test-id": "cart_product_name" }, "Family Plan")),
            React.createElement("div", { className: "cart-product__price-box-container" },
                React.createElement(RegSidebarViews_1.NonInstitutionPriceBox, { app: app })));
    });
    var ProductInfoView = (0, mobx_react_1.observer)(function (props) {
        var _a, _b, _c, _d;
        var app = props.app;
        var billingInterval = "Monthly";
        if (((_a = app.product) === null || _a === void 0 ? void 0 : _a.billingIntervalType) == "YEAR") {
            billingInterval = "Annual";
        }
        var totalPriceCents = (_b = app.product) === null || _b === void 0 ? void 0 : _b.discountPriceCents;
        if (!app.referred && app.coupon) {
            totalPriceCents = app.coupon.discountPriceCents;
        }
        else if (app.referred) {
            totalPriceCents = app.remspectPriceWithReferralDiscountCents((_c = app.product) === null || _c === void 0 ? void 0 : _c.key);
        }
        var imageFilename = "college-saver.png";
        if (app.testPrepProductType) {
            imageFilename = app.testPrepProductType.toLowerCase().replace(" ", "-") + ".png";
        }
        return React.createElement("div", { className: "reg-sidebar-product-info" },
            React.createElement("div", { className: "reg-sidebar-product-info__header" },
                React.createElement("div", { className: "reg-sidebar-product-info__icon" },
                    React.createElement("img", { src: "/images/registration/productSidebar/".concat(imageFilename) })),
                React.createElement("div", null,
                    React.createElement("div", { className: "reg-sidebar-product-info__name" }, (0, RegSidebarViews_1.buildProductName)(app)),
                    React.createElement("div", { className: "reg-sidebar-product-info__term" },
                        billingInterval,
                        " membership"))),
            app.regMetadata.product.indexOf("PRAXIS") > -1
                ? React.createElement("div", { className: "reg-sidebar-product-info__notes" }, "Get thousands of practice questions, 60+ Praxis study guides, and 7000+ Praxis test prep video lessons.")
                : app.regMetadata.product.indexOf("ACCELERATOR") > -1
                    ? React.createElement("div", { className: "reg-sidebar-product-info__notes" },
                        "Earn credit with hundreds of flexible courses that can transfer to over ",
                        Marketing.transferableSchoolCount,
                        " universities.")
                    : React.createElement(React.Fragment, null),
            React.createElement("div", { className: "reg-sidebar-product-info__pricebox" },
                !app.regMetadata.hasSelectedPaidTrial && app.coupon &&
                    React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "reg-sidebar-product-info__subtotal" },
                            React.createElement("div", { className: "reg-sidebar-product-info__subtotal_label" }, "Subtotal"),
                            React.createElement("div", { className: "reg-sidebar-product-info__subtotal_amount" }, (0, react_study_helpers_1.currency)(((_d = app.product) === null || _d === void 0 ? void 0 : _d.remspectPriceCents) / 100))),
                        React.createElement("div", { className: "reg-sidebar-product-info__offer" },
                            React.createElement(exports.SinglePageCouponDiscount, { app: app }))),
                React.createElement("div", { className: "reg-sidebar-product-info__total" },
                    React.createElement("div", { className: "reg-sidebar-product-info__total_label" }, "Total"),
                    React.createElement("div", { className: "reg-sidebar-product-info__total_amount" }, (0, react_study_helpers_1.currency)(totalPriceCents / 100)))));
    });
    exports.SinglePageCouponDiscount = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        var prefillCouponCode = app.prefillCouponCode;
        var discountText = app.coupon.percentOff ? app.coupon.percentOff + "%" : (0, react_study_helpers_1.currency)(app.coupon.amountOffCents / 100);
        var termText = "";
        var couponDurationInMonths = app.coupon.duration == "ONCE" ? 1 : app.coupon.durationInMonths;
        if (couponDurationInMonths) {
            termText = "For ".concat(couponDurationInMonths, " month").concat(couponDurationInMonths > 1 ? "s" : "");
        }
        return React.createElement(React.Fragment, null,
            React.createElement("div", null,
                React.createElement("div", { className: "reg-sidebar-product-info__offer_label" }, !!prefillCouponCode ? "Best offer applied" : "Discount"),
                React.createElement("div", { className: "reg-sidebar-product-info__offer_amount" },
                    "-",
                    discountText)),
            termText && React.createElement("div", { className: "reg-sidebar-product-info__offer_note" }, termText));
    });
    var ProductBulletsView = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        var bullets = (0, RegProductBulletsViews_1.getBulletsNovember)();
        if (!bullets || !bullets.length) {
            if (ReactRegAppUtil_1.reactRegAppUtil.isTestPrepGoal(app)) {
                return React.createElement("div", { className: "reg-sidebar-product-nobullets" },
                    React.createElement("div", { className: "reg-sidebar-product-nobullets__bug" }, "92%"),
                    React.createElement("div", { className: "reg-sidebar-product-nobullets__note" },
                        "of students ",
                        React.createElement("span", { className: "reg-sidebar-product-nobullets__highlight" }, "passed their exam"),
                        " after using Study.com*"));
            }
            else {
                return React.createElement(React.Fragment, null);
            }
        }
        else {
            var header = app.isInHighIntentSinglePageCheckoutNovemberExpanded ? "Your plan includes" : (0, RegSidebarViews_1.buildProductName)(app);
            return React.createElement("div", { className: "reg-sidebar-product-bullets" },
                React.createElement("div", { className: "reg-sidebar-product-bullets__header" },
                    header,
                    ":"),
                React.createElement("ul", { className: "reg-sidebar-product-bullet-items" }, bullets.map(function (bullet, index) { return React.createElement("li", { key: index, className: "reg-sidebar-product-bullet-item" },
                    React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-check-24.svg", className: "check-green" }),
                    bullet); })));
        }
    });
    var ProductTestimonialView = (0, mobx_react_1.observer)(function (props) {
        var _a;
        var _b = React.useState([]), testimonials = _b[0], setTestimonials = _b[1];
        var app = props.app;
        var segment = app.regMetadata.product.indexOf("ACCELERATOR") > -1 ? "CX" : (((_a = app.product) === null || _a === void 0 ? void 0 : _a.key) || "general");
        (0, react_1.useEffect)(function () {
            axios_1.default.get("/academy/testimonials/trustPilot.ajax?segment=" + segment).then(function (response) {
                setTestimonials(response.data);
            });
        }, [segment]);
        if (!testimonials || !testimonials.length) {
            return React.createElement(React.Fragment, null);
        }
        var testimonial = testimonials[0];
        return React.createElement("div", { className: "reg-sidebar-product-testimonial" },
            React.createElement("img", { className: "reg-sidebar-product-testimonial__rating", src: "/images/ratings-reviews/trust-pilot-stars-".concat(testimonial.rating, ".svg"), alt: "trust pilot ".concat(testimonial.rating, " stars") }),
            React.createElement("div", { className: "reg-sidebar-product-testimonial__quote" }, testimonial.review),
            React.createElement("div", { className: "reg-sidebar-product-testimonial__author" }, testimonial.name));
    });
    exports.default = SinglePageRegView;
});

//# sourceMappingURL=SinglePageRegView.js.map

define(["require", "exports", "@study-com/eureka-design-system", "mobx-react", "react", "react", "react-utils/react-study-helpers", "registration/test-prep/TestPrepFreePreviewJoinView", "util/InlineSvgComponents", "vfx/TransitionFX", "react-dom"], function (require, exports, eureka_design_system_1, mobx_react_1, React, react_1, react_study_helpers_1, TestPrepFreePreviewJoinView_1, InlineSvgComponents_1, TransitionFX_1, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TestPrepFreePreviewInterstitialView = void 0;
    var freePreviewFeatures = [
        {
            title: "Personalized study plan",
            description: "Your complete, guided path to success."
        },
        {
            title: "Unlimited lessons and videos",
            description: "Study smarter with expert-created content, anytime."
        },
        {
            title: "Full-length, realistic practice tests",
            description: "Feel confident on test day."
        },
        {
            title: "24/7 AI Tutor Support",
            description: "Instant help and feedback when you need it."
        }
    ];
    exports.TestPrepFreePreviewInterstitialView = (0, mobx_react_1.observer)(function (_a) {
        var app = _a.app, onHideOverlay = _a.onHideOverlay;
        var _b = React.useState("upgrade"), viewType = _b[0], setViewType = _b[1];
        var _c = React.useState(true), isInitialRender = _c[0], setIsInitialRender = _c[1];
        var slideDirection = viewType === "upgrade" ? "right" : "left";
        if (isInitialRender) {
            slideDirection = "left";
            setIsInitialRender(false);
        }
        (0, react_1.useEffect)(function () {
            if (app.isInterstitialOverlayOpen) {
                document.querySelector("body").classList.add("overlay-open");
            }
            else {
                document.querySelector("body").classList.remove("overlay-open");
            }
        }, [app.isInterstitialOverlayOpen]);
        return ReactDOM.createPortal(React.createElement("div", { className: "reg-page-interstitial-overlay", "test-id": "reg_page_interstitial_overlay" },
            React.createElement(TransitionFX_1.TransitionSlide, { direction: slideDirection },
                React.createElement("div", { key: viewType },
                    viewType === "upgrade" && React.createElement(TestPrepFreePreviewUpgradeView, { app: app, onHideOverlay: onHideOverlay, setViewType: setViewType }),
                    viewType === "free_account" && React.createElement(TestPrepFreePreviewFreeAccountView, { app: app, setViewType: setViewType })))), document.querySelector('body'));
    });
    var TestPrepFreePreviewFreeAccountView = (0, mobx_react_1.observer)(function (_a) {
        var app = _a.app, setViewType = _a.setViewType;
        return React.createElement(TestPrepFreePreviewJoinView_1.TestPrepFreePreviewJoinView, { firstName: app.registrationData.billingFirstName, lastName: app.registrationData.billingLastName, emailAddress: app.registrationData.email, phoneNumber: app.registrationData.phoneSms, password: app.rawRegistrationData.password, passwordConfirm: app.rawRegistrationData.passwordConfirm, onBack: function () { return setViewType("upgrade"); } });
    });
    var TestPrepFreePreviewUpgradeView = (0, mobx_react_1.observer)(function (_a) {
        var _b;
        var app = _a.app, onHideOverlay = _a.onHideOverlay, setViewType = _a.setViewType;
        return React.createElement("div", { className: "reg-page-interstitial" },
            React.createElement("div", { className: "reg-page-interstitial__col-left" },
                React.createElement("div", { className: "reg-page-interstitial__content-container" },
                    React.createElement("h1", { className: "reg-page-interstitial__header" }, "Upgrade your account and achieve your breakthrough"),
                    React.createElement("div", { className: "reg-page-interstitial__props" },
                        React.createElement("h2", { className: "reg-page-interstitial__props-header" }, "Get premium tools to help you succeed:"),
                        React.createElement("ul", { className: "reg-page-interstitial__props-list" }, freePreviewFeatures.map(function (feature, index) {
                            return React.createElement("li", { key: index, className: 'props-list-item' },
                                React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-check-circle-filled-20.svg", className: "icon-check-circle-filled-20--green" }),
                                React.createElement("div", { className: 'props-list-item__text' },
                                    React.createElement("div", { className: 'props-list-item__text__title' }, feature.title),
                                    React.createElement("div", { className: 'props-list-item__text__description' }, feature.description)));
                        }))),
                    React.createElement("div", { className: "reg-page-interstitial__price-summary" },
                        React.createElement("span", { className: "reg-page-interstitial__semibold-text" },
                            React.createElement("span", { className: "reg-page-interstitial__price" }, (0, react_study_helpers_1.currency)(((_b = app.product) === null || _b === void 0 ? void 0 : _b.remspectPriceCents) / 100)),
                            " / month"),
                        React.createElement("span", { className: "reg-page-interstitial__price__note" }, "No obligation, cancel anytime.")),
                    React.createElement("div", { className: "reg-page-interstitial__actions" },
                        React.createElement(eureka_design_system_1.Button, { variant: eureka_design_system_1.Button.Variant.SECONDARY, onClick: function () { return setViewType("free_account"); }, "test-id": "reg_page_interstitial_no_thanks_button", "data-cname": "reg_page_interstitial_no_thanks_button" }, "No, thanks"),
                        React.createElement(eureka_design_system_1.Button, { variant: eureka_design_system_1.Button.Variant.PRIMARY, onClick: function () {
                                onHideOverlay();
                                document.querySelector("body").classList.remove("overlay-open");
                            }, "test-id": "reg_page_interstitial_upgrade_button", "data-cname": "reg_page_interstitial_upgrade_button" }, "Upgrade to full account")))),
            React.createElement("div", { className: "reg-page-interstitial__col-right" },
                React.createElement("div", { className: "reg-page-interstitial__testimonial-container" },
                    React.createElement("h2", { className: "reg-page-interstitial__testimonial-header" }, "Everything you need to pass your exam"),
                    React.createElement("div", { className: "reg-page-interstitial__testimonial" },
                        React.createElement("div", { className: "reg-page-interstitial__testimonial-content" },
                            React.createElement("div", { className: "reg-page-interstitial__testimonial-content-quote" }, "\u201CIf you follow the guided practice, you will pass your exam. I used the study guide for 20 days and the information aligned with my exam. I passed first time!\u201D"),
                            React.createElement("div", { className: "reg-page-interstitial__testimonial-content-author" }, "Efren \u2013 Passed on first attempt")),
                        React.createElement("img", { src: "/images/teacher/teacher-in-classroom.png", alt: "Teacher in classroom", className: 'reg-page-interstitial__testimonial__image' })))));
    });
});

//# sourceMappingURL=TestPrepFreePreviewRegistrationViews.js.map

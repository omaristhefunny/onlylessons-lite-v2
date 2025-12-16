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
define(["require", "exports", "@sites-study-com/remspect", "@study-com/dynamic-form", "@study-com/eureka-design-system", "components/GenericErrorBoundary", "jquery", "logging/visible/react-track-visible", "member/info/member-info.util", "mobx", "mobx-react", "react", "react-dom/client", "registration/ReactRegAppUtil", "registration/RegDOMDataUtil", "registration/RegFamilyPlanUtil", "registration/RegInfoUtil", "registration/RegProductDecider", "registration/RegSidebarViews", "testPrep/TestPrepProductUtil"], function (require, exports, remspect, dynamic_form_1, eureka_design_system_1, GenericErrorBoundary_1, $, react_track_visible_1, member_info_util_1, mobx_1, mobx_react_1, React, client_1, ReactRegAppUtil_1, RegDOMDataUtil, RegFamilyPlanUtil, RegInfoUtil, RegProductDecider, RegSidebarViews_1, TestPrepProductUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReactRegModalApp = void 0;
    exports.openE2RegModal = openE2RegModal;
    exports.initReactRegModalApp = initReactRegModalApp;
    var openStore = new (function () {
        function OpenStore() {
            Object.defineProperty(this, "_isOpen", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "_hasEverOpened", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            (0, mobx_1.makeAutoObservable)(this);
        }
        Object.defineProperty(OpenStore.prototype, "isOpen", {
            get: function () {
                return this._isOpen;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OpenStore.prototype, "hasEverOpened", {
            get: function () {
                return this._hasEverOpened;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OpenStore.prototype, "open", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this._isOpen = true;
                if (!this._hasEverOpened) {
                    this._hasEverOpened = true;
                }
            }
        });
        Object.defineProperty(OpenStore.prototype, "close", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this._isOpen = false;
            }
        });
        Object.defineProperty(OpenStore.prototype, "toggle", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this._isOpen = !this._isOpen;
                if (!this._hasEverOpened && this._isOpen) {
                    this._hasEverOpened = true;
                }
            }
        });
        return OpenStore;
    }());
    var appInstance = undefined;
    function openE2RegModal(triggerElement) {
        if (!appInstance) {
            initReactRegModalApp(triggerElement);
        }
        else {
            appInstance.onModalOpen(triggerElement);
        }
    }
    function initReactRegModalApp(triggerElement) {
        if (!document.querySelector("[data-partial-reg-form-modal]") && !appInstance) {
            appInstance = new ReactRegModalApp();
            appInstance.init();
            appInstance.onModalOpen(triggerElement);
        }
    }
    var ReactRegModalApp = (function () {
        function ReactRegModalApp() {
            Object.defineProperty(this, "form", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "memberInfoUtil", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: member_info_util_1.MemberInfoUtil.instance()
            });
            Object.defineProperty(this, "regMetadata", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
            Object.defineProperty(this, "dataFromReactElement", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
            (0, mobx_1.makeAutoObservable)(this);
        }
        Object.defineProperty(ReactRegModalApp.prototype, "saveValues", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (toSave) {
                if (toSave === void 0) { toSave = this.registrationData; }
                return ReactRegAppUtil_1.reactRegAppUtil.saveValues(toSave);
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "registrationData", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.registrationData(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegModalApp.prototype, "rawRegistrationData", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.rawRegistrationData(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegModalApp.prototype, "shouldShowAnswersSidebar", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.shouldShowAnswersSidebar(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegModalApp.prototype, "askedQuestion", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.askedQuestion(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegModalApp.prototype, "lastViewedStudyAnswerTitle", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.lastViewedStudyAnswerTitle(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegModalApp.prototype, "studyAnswerRelatedConceptName", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.studyAnswerRelatedConceptName(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegModalApp.prototype, "shouldShowTrackingPixels", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.shouldShowTrackingPixels(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegModalApp.prototype, "shouldShowFamilyPlanQuestion", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.shouldShowFamilyPlanQuestion(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegModalApp.prototype, "advancePageMaybeAsync", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.advancePageMaybeAsync(this);
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "isRegPageNotRegModal", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return false;
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "onUserTypeChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.onUserTypeChange(this);
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "onGoalChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.onGoalChange(this);
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "clearFamilyPlanDataIfNotValid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.clearFamilyPlanDataIfNotValid(this);
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "buildFamilyPlanChangeEmailLoginUrl", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.buildFamilyPlanChangeEmailLoginUrl(this);
            }
        });
        ;
        Object.defineProperty(ReactRegModalApp.prototype, "isProductCX", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (product) {
                return ReactRegAppUtil_1.reactRegAppUtil.isProductCX(product);
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "regModalQuestions", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.regModalQuestions(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegModalApp.prototype, "regModalPageListDef", {
            get: function () {
                return ReactRegAppUtil_1.reactRegAppUtil.regModalPageListDef();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ReactRegModalApp.prototype, "updateFormValuesAndRegMetadata", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (regDataValues) {
                return ReactRegAppUtil_1.reactRegAppUtil.updateFormValuesAndRegMetadata(this, regDataValues);
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "buildFormStore", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var questions = this.regModalQuestions;
                var pages = this.regModalPageListDef;
                var formConfig = {
                    questions: questions,
                    layout: {
                        pages: pages,
                        controls: function (page, store) {
                            return React.createElement(ReactRegAppUtil_1.reactRegAppUtil.DefaultControls, { store: store });
                        }
                    }
                };
                return new dynamic_form_1.DynamicFormStore(__assign({ config: { skipInitial: false, shouldCleanNextPageOnAdvance: true, questionRefFn: react_track_visible_1.trackingRef } }, formConfig));
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "submitForm", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                ReactRegAppUtil_1.reactRegAppUtil.setTestPrepProductFromRegData(this);
                var state = this.registrationData;
                return this.saveValues(state).then(function () {
                    window.location.href = RegProductDecider.buildRegUrl(state);
                });
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "init", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                this.form = this.buildFormStore();
                this.form.onSubmit(function () { return _this.submitForm(); });
                var target = document.getElementById("regModalGoHere");
                this.setDataPropertiesFromDom(target);
                this.removeRiskFreeAttribute(target);
                var initialRegData = RegDOMDataUtil.loadRegDataValuesFromDOM();
                var testNameFromDOM = RegDOMDataUtil.loadDataFromSpecificTestPrepElement();
                if (testNameFromDOM && testNameFromDOM !== "TEST_PREP_AND_CERTIFICATES") {
                    if (initialRegData.examName == null) {
                        initialRegData.examName = testNameFromDOM;
                    }
                }
                this.updateFormValuesAndRegMetadata(initialRegData);
                var root = (0, client_1.createRoot)(target);
                root.render(React.createElement(RegModalView, { app: this }));
                (0, mobx_1.reaction)(function () { return _this.form.values; }, function () {
                    _this.saveValues();
                }, {
                    equals: mobx_1.comparer.shallow,
                    delay: 500
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
                (0, mobx_1.reaction)(function () { return [_this.form.values.userType, _this.form.values.goals, _this.form.values.email]; }, function () {
                    var regData = _this.registrationData;
                    _this.regMetadata.product = RegProductDecider.determineProductFromState(regData);
                });
                (0, mobx_1.autorun)(function () {
                    var _a;
                    if (!_this.shouldShowFamilyPlanQuestion && ((_a = _this.form) === null || _a === void 0 ? void 0 : _a.values)) {
                        _this.form.values.wantsFamilyPlan = undefined;
                    }
                });
                $("#partialRegFormModal").on("show.bs.modal", function (e) {
                    _this.onModalOpen(e.relatedTarget);
                });
                $("#partialRegFormModal").on("shown.bs.modal", function (e) {
                    _this.form.allowTransitions = true;
                });
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "setDataPropertiesFromDom", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (target) {
                this.dataFromReactElement = ReactRegAppUtil_1.reactRegAppUtil.setDataPropertiesFromDom(target);
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "removeRiskFreeAttribute", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (target) {
                var _a;
                if (!!((_a = this.dataFromReactElement) === null || _a === void 0 ? void 0 : _a["remove-risk-free"])) {
                    target.removeAttribute("data-remove-risk-free");
                }
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "processPageCnameFromQuestion", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (questionCname) {
                if (questionCname === "goals") {
                    questionCname = "goal";
                }
                if (questionCname === "user_type") {
                    questionCname = "usertype";
                }
                return "fields_" + questionCname;
            }
        });
        Object.defineProperty(ReactRegModalApp.prototype, "onModalOpen", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (triggerElement) {
                TestPrepProductUtil_1.default.testPrepProductListValueProxy.getValue();
                this.form.allowTransitions = false;
                var event = document.createEvent("CustomEvent");
                event.initCustomEvent("partialRegModalOpen", true, true, {});
                document.dispatchEvent(event);
                var regDataValues = RegDOMDataUtil.loadRegDataValuesFromDOMForPartialModalOpen(triggerElement);
                if (regDataValues.productKeyOverride) {
                    regDataValues.product = RegProductDecider.determineProductFromState(regDataValues);
                }
                if (regDataValues.productKeyOverride === "TEST_PREP_AND_CERTIFICATES" || regDataValues.isSpecificTestPrep) {
                    regDataValues.userType = "STUDENT";
                    regDataValues.goals = "EXAM_PREP";
                }
                else if (this.memberInfoUtil.memberInfo.cocoon === "TEACHER") {
                    if (!regDataValues.userType) {
                        regDataValues.userType = "INSTRUCTOR";
                    }
                }
                else if (!regDataValues.userType) {
                    regDataValues.userType = "";
                }
                if (!RegFamilyPlanUtil.shouldAskFamilyPlanQuestion(regDataValues) && regDataValues.wantsFamilyPlan != null) {
                    regDataValues.wantsFamilyPlan = null;
                }
                if (regDataValues.goals === "TUTORING" || regDataValues.goals === "TUTORING_CHILD") {
                    regDataValues.goals = "";
                }
                regDataValues.landedOnCourseExamOrPractice = this.memberInfoUtil.memberInfo.landedOnCourseExamOrPractice;
                this.form.resetState();
                this.updateFormValuesAndRegMetadata(regDataValues);
                if (regDataValues.productKeyOverride === "TEST_PREP_AND_CERTIFICATES" || regDataValues.isSpecificTestPrep) {
                    this.form.goToFirstError();
                }
                if (regDataValues.skipPreFilledQuestions) {
                    this.form.goToFirstErrorOrFirstCleanUnansweredQuestion();
                }
                if (triggerElement) {
                    this.saveValues();
                    if (triggerElement.getAttribute('data-skip-pre-filled-questions') === "true") {
                        this.form.goToFirstError();
                    }
                    else if (triggerElement.getAttribute('data-skip-third-step') === "true") {
                        this.form.goToPageIndex(3);
                    }
                    else if (triggerElement.getAttribute('data-skip-second-step') === "true") {
                        this.form.goToPageIndex(2);
                    }
                    else if (triggerElement.getAttribute('data-skip-first-step') === "true") {
                        this.form.advancePage();
                    }
                }
                openStore.open();
                this.form.allowTransitions = true;
            }
        });
        return ReactRegModalApp;
    }());
    exports.ReactRegModalApp = ReactRegModalApp;
    var RegPixelsView = (0, mobx_react_1.observer)(function (_a) {
        var app = _a.app;
        var userType = app.form.values.userType;
        var goal = app.form.values.goals;
        var isModalOpenNow = openStore.isOpen;
        return React.createElement(React.Fragment, null,
            userType === "INSTRUCTOR" && React.createElement("img", { height: "1", width: "1", style: { border: "none", position: "absolute" }, alt: "", src: "//googleads.g.doubleclick.net/pagead/viewthroughconversion/954796532/?guid=ON&script=0" }),
            userType && React.createElement("img", { height: "1", width: "1", style: { border: "none", position: "absolute" }, alt: "", src: "https://www.facebook.com/tr?id=878950682167250&ev=UserTypeSelected&cd[user_type]=" + userType }),
            goal && isModalOpenNow && React.createElement("img", { height: "1", width: "1", style: { border: "none", position: "absolute" }, alt: "", src: "https://www.facebook.com/tr?id=878950682167250&ev=GoalSelected&cd[goal]=" + goal }));
    });
    var TestPrepDisclaimerView = function () { return React.createElement("div", { className: "test-prep-claims-disclaimer--reg-modal" },
        React.createElement(ReactRegAppUtil_1.TestPrepDisclaimer, null)); };
    var RegModalView = (0, mobx_react_1.observer)(function (_a) {
        var _b, _c, _d;
        var app = _a.app;
        var form = app.form;
        var userType = (_b = form.values) === null || _b === void 0 ? void 0 : _b.userType;
        var goal = (_c = form.values) === null || _c === void 0 ? void 0 : _c.goals;
        var isTestPrepStudent = userType === "STUDENT" && goal === "EXAM_PREP";
        var isTestPrepTeacher = userType === "INSTRUCTOR" && goal === "TEACHER_CERTIFICATION";
        var shouldShowSocialProof = (isTestPrepStudent || isTestPrepTeacher) && !app.shouldShowAnswersSidebar;
        var modalTop = (_d = document.getElementById("partialRegFormModal")) === null || _d === void 0 ? void 0 : _d.dataset.modalTop;
        if (modalTop !== undefined && modalTop !== null) {
            delete document.getElementById("partialRegFormModal").dataset.modalTop;
        }
        var modalTrackingProps = {
            "data-cname": "partial_reg_form_modal",
            "data-track-visible": true,
            "test-id": "partial_reg_form_modal",
        };
        var modalClassNames = [];
        if (ReactRegAppUtil_1.reactRegAppUtil.isUserEligibleForSmsAcquisition(app)) {
            modalClassNames.push("sms-acquisition");
        }
        if (!remspect.isControl("regFormRebrand")) {
            (0, mobx_1.runInAction)(function () {
                form.isEureka = true;
            });
            var studyAnswerQuestion = app.askedQuestion || app.lastViewedStudyAnswerTitle;
            var isLastPage = form.currentPage === form.lastPage;
            return React.createElement(React.StrictMode, null,
                React.createElement(GenericErrorBoundary_1.GenericErrorBoundaryView, null,
                    React.createElement(eureka_design_system_1.Modal, __assign({ isOpen: openStore.isOpen, alignment: eureka_design_system_1.Modal.Alignment.TOP, fullscreen: false, onClose: function () { return openStore.close(); }, closeOnBackdropClick: false, "close-data-cname": "partial_reg_form_modal_close" }, modalTrackingProps),
                        React.createElement(eureka_design_system_1.Modal.Header, { "data-cname": "partial_reg_form_modal__header", className: form.isQuestionKeyVisible("wantsFamilyPlan") ? "reg-subheader--blue" : undefined }, buildRegModalHeaderText(app)),
                        React.createElement(eureka_design_system_1.Modal.Content, { className: "reg-modal-e2__content" },
                            app.shouldShowTrackingPixels && React.createElement("div", { className: "reg-modal-e2__pixels" },
                                React.createElement(RegPixelsView, { app: app })),
                            React.createElement("div", { className: "main-form-container" },
                                React.createElement(dynamic_form_1.DynamicFormView, { store: app.form })),
                            React.createElement(RegSidebarViews_1.RegSidebarView, { app: app }),
                            studyAnswerQuestion && !isLastPage &&
                                React.createElement("div", { className: "reg-modal-e2__study-answer study-answer-question" },
                                    React.createElement("div", { className: "study-answer-question__label" }, "Question to be answered"),
                                    React.createElement("div", { className: "study-answer-question__question", "test-id": "question_to_be_answered", dangerouslySetInnerHTML: { __html: studyAnswerQuestion } })),
                            shouldShowSocialProof && React.createElement("div", { className: "reg-modal-e2__disclaimer" },
                                React.createElement(TestPrepDisclaimerView, null))))));
        }
        return React.createElement(React.StrictMode, null,
            React.createElement(GenericErrorBoundary_1.GenericErrorBoundaryView, null,
                React.createElement("div", __assign({ className: modalClassNames.join(" "), "data-partial-reg-form-modal": true }, modalTrackingProps),
                    app.shouldShowTrackingPixels && React.createElement(RegPixelsView, { app: app }),
                    !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && React.createElement("div", { className: "headerContainer" },
                        React.createElement(RegModalHeaderView, { app: app })),
                    React.createElement("div", { className: "form-section" },
                        React.createElement("div", { className: "main-form-container" },
                            ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && React.createElement("div", { className: "headerContainer" },
                                React.createElement(ModernizedRegModalHeaderView, { app: app })),
                            React.createElement(dynamic_form_1.DynamicFormView, { store: form })),
                        React.createElement(RegSidebarViews_1.RegSidebarView, { app: app })),
                    shouldShowSocialProof && React.createElement(TestPrepDisclaimerView, null))));
    });
    var buildRegModalHeaderText = function (app) {
        if (app.form.isQuestionKeyVisible("wantsFamilyPlan")) {
            return "Congratulations, you are eligible for the Family Plan";
        }
        if (app.memberInfoUtil.memberInfo.isPaidTrialEligible) {
            var goal = app.form.values["goals"];
            if (goal === "EXAM_PREP") {
                return "Create your account, risk-free";
            }
            if (RegInfoUtil.hasPaidTrialEligibleGoal(goal)) {
                return "Create your account. No obligation, cancel anytime.";
            }
        }
        else if (!app.dataFromReactElement["remove-risk-free"]) {
            return "Create your account, risk-free";
        }
        return "Create your account";
    };
    var RegModalHeaderView = (0, mobx_react_1.observer)(function (_a) {
        var app = _a.app;
        var classNames = [];
        if (app.form.isQuestionKeyVisible("wantsFamilyPlan")) {
            classNames.push("reg-subheader--blue");
        }
        return React.createElement("h2", { "test-id": "reg_header", className: classNames.join(" ") }, buildRegModalHeaderText(app));
    });
    var ModernizedRegModalHeaderView = (0, mobx_react_1.observer)(function (_a) {
        var _b;
        var app = _a.app;
        var currentlyShowingFamilyPlanIntentQuestion = app.form.isQuestionKeyVisible("wantsFamilyPlan");
        var paidTrialEligible = app.memberInfoUtil.memberInfo.isPaidTrialEligible;
        var twoWeekPriceEligible = ((_b = app.registrationData) === null || _b === void 0 ? void 0 : _b.goals)
            && app.registrationData.goals == "EXAM_PREP";
        var paidTrialEligibleGoal = RegInfoUtil.hasPaidTrialEligibleGoal(app.form.values["goals"]);
        var classNames = ["modernized-header__main-text"];
        var headerText = "Create your account";
        var subHeaderText;
        if (currentlyShowingFamilyPlanIntentQuestion) {
            headerText = "Congratulations, you are eligible for the Family Plan";
            classNames.push("reg-subheader--blue");
        }
        else if (!paidTrialEligible || twoWeekPriceEligible) {
            if (!!app.dataFromReactElement["remove-risk-free"] === false) {
                headerText = "Create your account, risk-free";
            }
        }
        else if (paidTrialEligibleGoal) {
            headerText = "Create your account.";
            subHeaderText = "No obligation, cancel anytime.";
        }
        return React.createElement("div", { className: "modernized-header" },
            React.createElement("h2", { className: classNames.join(" "), "test-id": "reg_header" }, headerText),
            subHeaderText && React.createElement("h5", { className: "modernized-header__sub-text", "test-id": "reg_header_subtext_modernized" }, subHeaderText));
    });
});

//# sourceMappingURL=ReactRegModal.app.js.map

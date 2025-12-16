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
define(["require", "exports", "components/survey/SurveyModalView", "components/survey/SurveyQuestionView", "dashboard/test-prep-experience/components/toast/ToastStore", "dashboard/test-prep-experience/components/toast/ToastView", "jquery", "lib/axios", "mobx", "mobx-react", "react", "react-dom/client", "lib/jquery/cookie"], function (require, exports, SurveyModalView_1, SurveyQuestionView_1, ToastStore_1, ToastView_1, $, axios_1, mobx_1, mobx_react_1, React, client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UserExperienceSurveyStore = void 0;
    var UserExperienceSurveyStore = (function () {
        function UserExperienceSurveyStore() {
            Object.defineProperty(this, "modalId", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "currentQuestion", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "previousQuestionResponse", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "questions", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "responseTextHolder", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "showMessage", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "showSurvey", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "slidePanelDown", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "surveyTriggerConfig", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.modalId = "uxModal";
            this.fetchSurveyDataIfCookieIsValid();
            (0, mobx_1.makeAutoObservable)(this);
        }
        Object.defineProperty(UserExperienceSurveyStore.prototype, "fetchSurveyDataIfCookieIsValid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.isCriteriaCookieValid()) {
                    this.fetchSurveyData();
                }
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "isCriteriaCookieValid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var value = this.getCriteriaCookieValue();
                if (value && !value.startsWith("INVALID")) {
                    var patterns = value.split(", ");
                    if (patterns.some(function (pattern) { return new RegExp(pattern).test(window.location.href); })) {
                        return true;
                    }
                }
                return false;
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "getCriteriaCookieValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var arePopupsDisabled = $.cookie("disablePopups") === "true";
                if (arePopupsDisabled || !document.querySelector("#user-experience-survey")) {
                    return null;
                }
                var value = $.cookie("surveyCriteriaUrlPatterns");
                if (!value) {
                    return null;
                }
                if (value.charAt(0) === "\"" && value.charAt(value.length - 1) === "\"") {
                    return value.substring(1, value.length - 1);
                }
                return value;
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "fetchSurveyData", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var config = {
                    params: {
                        currentPageUri: encodeURIComponent(window.location.pathname + window.location.hash + window.location.search)
                    }
                };
                axios_1.default.get("/user/survey/get-survey-questions.ajax", config)
                    .then((0, mobx_1.action)(function (res) {
                    if (res.data.questions) {
                        _this.questions = res.data.questions.sort(function (a, b) { return a.order - b.order; });
                        if (_this.questions.length > 0) {
                            _this.currentQuestion = _this.questions[0];
                        }
                        _this.surveyTriggerConfig = res.data.surveyTriggerConfig;
                        _this.calculateTriggerConditionsAndShowSurvey();
                    }
                }));
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "calculateTriggerConditionsAndShowSurvey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a, _b, _c;
                if ((_a = this.surveyTriggerConfig) === null || _a === void 0 ? void 0 : _a.showOnMouseOut) {
                    this.addMouseOutEventToWindow();
                }
                else if ((_b = this.surveyTriggerConfig) === null || _b === void 0 ? void 0 : _b.pageScrollDistance) {
                    this.calculatePageScrollDistanceAndShowSurvey();
                }
                else if ((_c = this.surveyTriggerConfig) === null || _c === void 0 ? void 0 : _c.delayInMillis) {
                    this.calculateDelayAndShowSurvey();
                }
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "calculateDelayAndShowSurvey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var _a;
                var delayInMillis = 0;
                if (((_a = this.surveyTriggerConfig) === null || _a === void 0 ? void 0 : _a.delayInMillis) != null) {
                    delayInMillis = this.surveyTriggerConfig.delayInMillis < 0 ? 0 : this.surveyTriggerConfig.delayInMillis;
                }
                this.afterGlobalDefer((0, mobx_1.action)(function () {
                    setTimeout((0, mobx_1.action)(function () {
                        _this.showSurvey = true;
                    }), delayInMillis);
                }));
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "calculatePageScrollDistanceAndShowSurvey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a;
                var pageScrollDistance;
                if (((_a = this.surveyTriggerConfig) === null || _a === void 0 ? void 0 : _a.pageScrollDistance) != null) {
                    var distanceFromConfig = this.surveyTriggerConfig.pageScrollDistance;
                    pageScrollDistance = (distanceFromConfig > 0 && distanceFromConfig <= 100) ? distanceFromConfig : 0;
                }
                var store = this;
                window.onscroll = function () {
                    var totalPageHeight = document.body.offsetHeight;
                    var scrollPoint = window.scrollY + window.innerHeight;
                    var scrollPercent = scrollPoint / totalPageHeight * 100;
                    if (scrollPercent >= pageScrollDistance) {
                        store.afterGlobalDefer((0, mobx_1.action)(function () {
                            store.showSurvey = true;
                            window.onscroll = null;
                        }));
                    }
                };
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "addMouseOutEventToWindow", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var body = document.getElementById("subscriptionMain");
                var mouseleaveEventCallback = function () {
                    _this.showSurvey = true;
                    body.removeEventListener("mouseleave", mouseleaveEventCallback);
                };
                body.addEventListener("mouseleave", mouseleaveEventCallback);
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "afterGlobalDefer", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (cb) {
                var head = document.getElementsByTagName('head')[0];
                var globalDeferElem = document.getElementById("globalDefer");
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                var href = globalDeferElem === null || globalDeferElem === void 0 ? void 0 : globalDeferElem.getAttribute("href");
                if (href) {
                    link.href = href;
                    link.onload = cb;
                    head.appendChild(link);
                }
                else {
                    console.error("could not find link element for global defer");
                }
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "getQuestionForQuestionNumber", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (number) {
                var _this = this;
                var questions = this.questions.filter(function (question) { return question.order === number; });
                if (questions.length === 0) {
                    console.error("tried to get question for question number " + number + "but failed");
                    return null;
                }
                if (questions.length === 1) {
                    return questions[0];
                }
                return questions.find(function (question) { return question.previousQuestionValueSelector == _this.previousQuestionResponse; });
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "submitStringResponse", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (response) {
                this.previousQuestionResponse = response;
                var params = new URLSearchParams();
                params.append("surveyQuestionId", this.currentQuestion.questionId.toString());
                params.append("response", response);
                axios_1.default.post("/user/survey/submit-survey-response.ajax", params).then(function () { });
                this.setCriteriaCookieWithValue("INVALID_ALREADY_COMPLETED");
                this.goToNextQuestion();
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "numberOptionSelected", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (number) {
                this.submitStringResponse(number.toString());
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "submitTextResponse", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.submitStringResponse(this.responseTextHolder);
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "updateResponseText", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (str) {
                this.responseTextHolder = str;
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "isCurrentQuestionFirst", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var _a;
                return ((_a = this.questions) === null || _a === void 0 ? void 0 : _a.filter(function (question) { return question.order < _this.currentQuestion.order; }).length) === 0;
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "goToNextQuestion", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.hasNextQuestion()) {
                    this.closeSurvey(true);
                }
                else {
                    var nextQuestion = this.getQuestionForQuestionNumber(this.currentQuestion.order + 1);
                    if (!nextQuestion) {
                        this.closeSurvey(true);
                    }
                    else {
                        this.currentQuestion = nextQuestion;
                    }
                }
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "hasNextQuestion", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var _a;
                return ((_a = this.questions) === null || _a === void 0 ? void 0 : _a.filter(function (question) { return question.order === _this.currentQuestion.order + 1; }).length) > 0;
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "goToPreviousQuestion", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.currentQuestion = this.getQuestionForQuestionNumber(this.currentQuestion.order - 1);
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "dismissSurvey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.closeSurvey(false);
                this.declineSurvey();
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "declineSurvey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var params = new URLSearchParams();
                params.append("surveyQuestionId", this.questions[0].questionId.toString());
                axios_1.default.post("/user/survey/decline-survey-question.ajax", params).then(function () { });
                this.setCriteriaCookieWithValue("INVALID_DECLINED");
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "closeSurvey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (showMessage) {
                var _a;
                if (showMessage === void 0) { showMessage = false; }
                if ((_a = this.surveyTriggerConfig) === null || _a === void 0 ? void 0 : _a.displayAsModal) {
                    this.closeModal();
                    showMessage && ToastStore_1.default.showToast(ToastStore_1.ToastType.SUCCESS, "Your feedback has been submitted");
                }
                else {
                    this.closeSlidingPanel();
                    this.showMessage = showMessage;
                }
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "closeSlidingPanel", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                this.slidePanelDown = true;
                setTimeout((0, mobx_1.action)(function () {
                    _this.showSurvey = false;
                }), 1250);
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "closeModal", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.showSurvey = false;
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "setCriteriaCookieWithValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value) {
                var oneHourFromNow = new Date();
                oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
                var domain = "study.com";
                var hostParts = window.location.host.split(".");
                var numHostParts = hostParts.length;
                if (numHostParts > 1) {
                    domain = hostParts[numHostParts - 2] + '.' + hostParts[numHostParts - 1];
                }
                $.cookie("surveyCriteriaUrlPatterns", value, { path: "/", expires: oneHourFromNow, domain: domain });
            }
        });
        Object.defineProperty(UserExperienceSurveyStore.prototype, "doesCriteriaCookieContainString", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (str) {
                var value = this.getCriteriaCookieValue();
                return value && value.includes(str);
            }
        });
        return UserExperienceSurveyStore;
    }());
    exports.UserExperienceSurveyStore = UserExperienceSurveyStore;
    var UserExperienceSurveyView = (0, mobx_react_1.observer)((function (_super) {
        __extends(_UserExperienceSurveyView, _super);
        function _UserExperienceSurveyView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(_UserExperienceSurveyView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a;
                var store = this.props.store;
                if ((_a = store.surveyTriggerConfig) === null || _a === void 0 ? void 0 : _a.displayAsModal) {
                    return React.createElement(React.Fragment, null,
                        React.createElement(SurveyModalView_1.default, { store: store }),
                        React.createElement(ToastView_1.ToastView, null));
                }
                if (!store.showSurvey) {
                    if (store.showMessage) {
                        ToastStore_1.default.showToast(ToastStore_1.ToastType.SUCCESS, "Thank you for answering our survey!");
                        return React.createElement(ToastView_1.ToastView, null);
                    }
                    return null;
                }
                if (store.questions.length === 0) {
                    return null;
                }
                return (React.createElement("div", { className: "survey-panel" + (store.slidePanelDown ? " slide-down" : ""), "data-track-visible": true, "data-cname": "user_experience_survey" },
                    React.createElement("div", { className: "survey-panel-header" },
                        React.createElement("div", null),
                        React.createElement("img", { src: "/images/eureka/logos/study-com_logo-horizontal_text-light.svg", alt: "Study.com Logo" }),
                        React.createElement("div", { className: "close-panel-btn", onClick: function () { return store.dismissSurvey(); } }, "\u00D7")),
                    React.createElement("div", { className: "survey-panel-body" },
                        React.createElement(SurveyQuestionView_1.default, { store: store, question: store.currentQuestion }))));
            }
        });
        return _UserExperienceSurveyView;
    }(React.Component)));
    var userExperienceSurveyStore = new UserExperienceSurveyStore();
    exports.default = userExperienceSurveyStore;
    var userExperienceSurveyContainer = document.getElementById("user-experience-survey");
    if (userExperienceSurveyContainer) {
        var root = (0, client_1.createRoot)(document.querySelector("#user-experience-survey"));
        root.render(React.createElement(UserExperienceSurveyView, { store: userExperienceSurveyStore }));
    }
});

//# sourceMappingURL=UserExperienceSurveyView.js.map

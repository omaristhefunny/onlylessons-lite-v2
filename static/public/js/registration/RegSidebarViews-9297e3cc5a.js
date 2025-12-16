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
define(["require", "exports", "@sites-study-com/marketing", "@sites-study-com/marketing-constants", "@sites-study-com/remspect", "@sites-study-com/ssr-cx", "@study-com/eureka-design-system", "components/CollapsibleAutoSizeComponent", "mobx", "mobx-react", "react", "react-utils/react-study-helpers", "registration/college-saver/CxCourseCart", "registration/ReactRegAppUtil", "registration/ReactRegPage.app", "registration/RegProductBulletsViews", "registration/RegProductModalSwitcher", "testPrep/TestPrepConstants", "util/InlineSvgComponents"], function (require, exports, marketing_1, Marketing, remspect, ssr_cx_1, eureka_design_system_1, CollapsibleAutoSizeComponent_1, mobx_1, mobx_react_1, React, react_study_helpers_1, CxCourseCart_1, ReactRegAppUtil_1, ReactRegPage_app_1, RegProductBulletsViews_1, RegProductModalSwitcher_1, TestPrepConstants_1, InlineSvgComponents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NonInstitutionPriceBox = exports.ProductDuration = exports.RegSidebarGoogleShoppingCartView = exports.RegSidebarMobileCartView = exports._RegSidebarMobileCartView = exports.RegSidebarCartView = exports._RegSidebarCartView = exports.TeacherTestimonial = exports.ModernizedRegHeaderView = exports.RegSidebarView = void 0;
    exports.buildProductName = buildProductName;
    var PAID_TRIAL_DATE_FORMAT = "MMM[\u00a0]D,[\u00a0]YYYY";
    var PAID_TRIAL_DATE_FORMAT_NO_YEAR = "MMM[\u00a0]D";
    var TEST_PREP_6_MONTHS_ONLY_PLANS = ["ACT_TEST_PREP_6_MONTHS_ONLY", "SAT_TEST_PREP_6_MONTHS_ONLY"];
    var _RegSidebarView = (function (_super) {
        __extends(_RegSidebarView, _super);
        function _RegSidebarView(props) {
            return _super.call(this, props) || this;
        }
        Object.defineProperty(_RegSidebarView.prototype, "mappingFromHelperTextIdentifierToQuestionKeys", {
            get: function () {
                return {
                    "1": ["userType", "goals", "teacherSubject"],
                    "2": ["email"],
                    "4": ["password"],
                    "5": ["billingAddressCountry", "billingFirstName", "billingLastName"],
                    "family-plan": ["wantsFamilyPlan"],
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(_RegSidebarView.prototype, "isQuestionKeyMatchForHelperTextIdentifier", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key, helperTextIdentifier) {
                var _a;
                return ((_a = this.mappingFromHelperTextIdentifierToQuestionKeys[helperTextIdentifier]) === null || _a === void 0 ? void 0 : _a.indexOf(key)) > -1;
            }
        });
        Object.defineProperty(_RegSidebarView.prototype, "innerSidebar", {
            get: function () {
                var _a;
                var app = this.props.app;
                var store = app.form;
                var questionKey = store.currentPage.questions[0].key;
                if (app.shouldShowAnswersSidebar) {
                    if (this.isQuestionKeyMatchForHelperTextIdentifier(questionKey, "1")) {
                        return React.createElement(AnswersSidebar1, { relatedConceptName: app.studyAnswerRelatedConceptName });
                    }
                    if (this.isQuestionKeyMatchForHelperTextIdentifier(questionKey, "2") || this.isQuestionKeyMatchForHelperTextIdentifier(questionKey, "3")) {
                        return React.createElement(AnswersSidebar2, null);
                    }
                    if (this.isQuestionKeyMatchForHelperTextIdentifier(questionKey, "4")) {
                        return React.createElement(AnswersSidebar4, null);
                    }
                    if (this.isQuestionKeyMatchForHelperTextIdentifier(questionKey, "5")) {
                        return React.createElement(AnswersSidebar5, null);
                    }
                    if (this.isQuestionKeyMatchForHelperTextIdentifier(questionKey, "family-plan")) {
                        return React.createElement(FamilyPlanSidebar, null);
                    }
                    return React.createElement(DefaultSidebar, null);
                }
                var userType = store.values["userType"];
                var productKey = (_a = app.regMetadata) === null || _a === void 0 ? void 0 : _a.product;
                if (app.isProductCX(productKey)) {
                    return React.createElement(CXSidebar, { app: app });
                }
                if (shouldShowSocialProof(store)) {
                    var isOnCartPage = false;
                    return React.createElement(TestPrepSocialProofSidebar, { isOnCartPage: isOnCartPage, productKey: productKey });
                }
                if (this.isQuestionKeyMatchForHelperTextIdentifier(questionKey, "family-plan")) {
                    return React.createElement(FamilyPlanSidebar, null);
                }
                var isStudent = userType !== "INSTRUCTOR" && userType !== "TUTOR";
                if (isStudent) {
                    if (this.isQuestionKeyMatchForHelperTextIdentifier(questionKey, "1")) {
                        return React.createElement(StudentSidebar1, null);
                    }
                    if (this.isQuestionKeyMatchForHelperTextIdentifier(questionKey, "2")) {
                        if (app.registrationData.product === "TUTORING") {
                            return React.createElement(TutoringSidebar, null);
                        }
                        return React.createElement(DefaultSidebar, null);
                    }
                    if (this.isQuestionKeyMatchForHelperTextIdentifier(questionKey, "3")) {
                        return React.createElement(StudentSidebar3, null);
                    }
                }
                if (userType === "TUTOR") {
                    return React.createElement(TutorSidebar, null);
                }
                if (userType === "INSTRUCTOR") {
                    return React.createElement(TeacherSidebar, { teacherSubject: store.values["teacherSubject"] });
                }
                return React.createElement(DefaultSidebar, null);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(_RegSidebarView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var classNames = ["side-form-container"];
                return React.createElement("div", { className: classNames.join(" "), "test-id": "partial_reg_form_sidebar" }, this.innerSidebar);
            }
        });
        return _RegSidebarView;
    }(React.Component));
    exports.RegSidebarView = (0, mobx_react_1.observer)(_RegSidebarView);
    var _ModernizedRegHeaderView = (function (_super) {
        __extends(_ModernizedRegHeaderView, _super);
        function _ModernizedRegHeaderView(props) {
            return _super.call(this, props) || this;
        }
        Object.defineProperty(_ModernizedRegHeaderView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var isPaidTrialEligible = this.props.app.isPaidTrialEligible &&
                    !this.props.app.shouldOfferTestPrepTwoWeekPlan;
                return React.createElement("div", { className: "heading headingTwo payPalMobileHeader" },
                    React.createElement("h2", { className: "payPalMobileHeaderText" }, "Create your account"),
                    React.createElement("h3", { className: "paidTrialSubtitle", "test-id": "paid_trial_subtitle" }, isPaidTrialEligible ? "No obligation; cancel anytime." :
                        !!this.props.app.dataFromReactElement["remove-risk-free"] ?
                            "Try it now. No obligation; cancel anytime." :
                            "Try it risk-FREE. No obligation; cancel anytime."));
            }
        });
        return _ModernizedRegHeaderView;
    }(React.Component));
    exports.ModernizedRegHeaderView = (0, mobx_react_1.observer)(_ModernizedRegHeaderView);
    function shouldShowSocialProof(store) {
        var userType = store.values.userType;
        var isTestPrepStudent = userType === "STUDENT" && store.values.goals === "EXAM_PREP";
        var isTestPrepTeacher = userType === "INSTRUCTOR" && store.values.goals === "TEACHER_CERTIFICATION";
        var shouldShowSocialProof = isTestPrepStudent || isTestPrepTeacher;
        return shouldShowSocialProof;
    }
    function getClaimText(productKey) {
        var asterisk = React.createElement("sup", null, "*");
        if (TEST_PREP_6_MONTHS_ONLY_PLANS.indexOf(productKey) > -1) {
            return React.createElement("p", { className: "test-prep-claim-reg-form__text" },
                "were ",
                React.createElement("em", { className: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "red bold" : "blueberry bold" }, "more confident"),
                " after using Study.com",
                asterisk);
        }
        return React.createElement("p", { className: "test-prep-claim-reg-form__text" },
            "of students ",
            React.createElement("em", { className: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "red bold" : "blueberry bold" }, "passed their exam"),
            " after using Study.com",
            asterisk);
    }
    function getClaimStats(productKey) {
        if (TEST_PREP_6_MONTHS_ONLY_PLANS.indexOf(productKey) > -1) {
            return Marketing.com_study_testprep_claims_more_confident;
        }
        return Marketing.com_study_testprep_claims_exam_passed;
    }
    var TestPrepSocialProofSidebar = function (_a) {
        var isOnCartPage = _a.isOnCartPage, productKey = _a.productKey;
        var classNames = ["test-prep-claim-reg-form"];
        if (isOnCartPage) {
            classNames.push("on-cart-page");
        }
        return React.createElement("div", { className: classNames.join(" "), "data-cname": "test_prep_reg_claim", "test-id": "test_prep_reg_claim", "data-track-visible": true },
            React.createElement("div", { className: "test-prep-claim-reg-form__stat" },
                React.createElement("div", { className: "test-prep-claim-reg-form__stat-pencil" }),
                React.createElement("div", { className: "test-prep-claim-reg-form__stat-circle" }, getClaimStats(productKey)),
                React.createElement("div", { className: "test-prep-claim-reg-form__stat-book" })),
            getClaimText(productKey));
    };
    var DefaultSidebar = function (_a) {
        var header = _a.header, testimonialText = _a.testimonialText, authorName = _a.authorName;
        return React.createElement("div", { className: "helper-text__fade-in", "test-id": "helper-text-not-cart" },
            React.createElement("div", { className: "helperText fade-in" },
                ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && React.createElement("img", { src: "/images/registration/modernizeRegForm/people-icon.svg", className: "claim-icon-people" }),
                React.createElement("h4", { className: ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "blueberry" : "", "test-id": "testimonial_header" }, header ? header : "Students Love Study.com"),
                React.createElement("p", { "test-id": "testimonial_text" }, testimonialText ? testimonialText : React.createElement(React.Fragment, null,
                    "\"I learned more in ",
                    React.createElement("em", { className: "teal bold" }, "10 minutes"),
                    " than 1 month of chemistry classes\"")),
                remspect.isControl("regFormRebrand") &&
                    React.createElement("p", { className: ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "italic" : "", "test-id": "testimonial_author" }, authorName ? authorName : "- Ashlee P."),
                !remspect.isControl("regFormRebrand") &&
                    React.createElement("p", { "test-id": "testimonial_author" },
                        React.createElement("em", { className: "bold" }, authorName ? authorName : "Ashlee P."))));
    };
    var CXSidebar = function (_a) {
        var app = _a.app;
        if (app.shouldShowCXCourseSelectorTest
            && app.form.currentPage.questions.filter(function (question) { return question.key === "cxCourseIdList"; }).length == 1) {
            return !(ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && window.matchMedia("(max-width: 767.9px)").matches) ? React.createElement(CxCourseCart_1.CxCourseCart, { app: app }) : React.createElement(React.Fragment, null);
        }
        else {
            var quoteAuthor = "Kayla J.";
            var quote = React.createElement("i", null,
                "\"Study.com is so easy and less stressful than taking regular online college courses. I love that everything is self-paced. ",
                React.createElement("b", null, "It\u2019s amazing!"),
                "\"");
            var clas = !remspect.isControl("regFormRebrand") ? "testimonial_author" : "";
            return React.createElement("div", { className: "helper-text__fade-in", "test-id": "helper-text-not-cart-cx" },
                React.createElement("div", { className: "helperText fade-in" },
                    ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && React.createElement("img", { src: "/images/registration/modernizeRegForm/people-icon.svg", className: "claim-icon-people" }),
                    React.createElement(React.Fragment, null,
                        React.createElement("h4", { className: ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "blueberry" : "" }, "Students Love Study.com"),
                        React.createElement("p", null, quote),
                        React.createElement("p", { className: ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "italic" : clas },
                            "- ",
                            quoteAuthor))));
        }
    };
    var AnswersSidebar1 = function (_a) {
        var relatedConceptName = _a.relatedConceptName;
        return React.createElement("div", { className: "helperText answers-helper-text", "test-id": "answers_helper_1" },
            React.createElement("div", { className: "answer-icon" },
                React.createElement("img", { src: "/images/studyAnswers/icon-teacher-blocks.svg", className: "teacher-icon" })),
            React.createElement("div", { className: "helperText__text" },
                React.createElement("h4", null, "Get expert help 24/7"),
                React.createElement("p", null,
                    "Sign up and access a network of thousands of ",
                    relatedConceptName,
                    " experts.")));
    };
    var AnswersSidebar2 = function () {
        return React.createElement("div", { className: "helperText answers-helper-text videoQuizHelperText", "test-id": "answers_helper_2" },
            React.createElement("div", { className: "answer-icon video-icon" },
                React.createElement("img", { src: "/images/studyAnswers/icon-videos.svg", className: "video-icon" })),
            React.createElement("h4", null,
                "Unlock access to ", " ".concat(Marketing.studyAnswersCount),
                " + answered questions"),
            React.createElement("p", null,
                "Study.com has a library of over  ", " ".concat(Marketing.studyAnswersCount, " "),
                "questions and answers for your toughest homework problems"));
    };
    var AnswersSidebar4 = function () {
        return React.createElement("div", { className: "helperText answers-helper-text videoQuizHelperText", "test-id": "answers_helper_4" },
            React.createElement("div", { className: "answer-icon" },
                React.createElement("img", { src: "/images/studyAnswers/icon-qa.svg", className: "qa-icon" })),
            React.createElement("h4", null, "Did you know?"),
            React.createElement("p", null,
                "Study.com has a library of ", " ".concat(Marketing.studyAnswersCount),
                " + questions and answers for covering your toughest textbook problems"));
    };
    var AnswersSidebar5 = function () {
        return React.createElement("div", { className: "helperText answers-helper-text videoQuizHelperText", "test-id": "answers_helper_5" },
            React.createElement("div", { className: "answer-icon" },
                React.createElement("img", { src: "/images/studyAnswers/icon-persona.svg", className: "persona-icon" })),
            React.createElement("h4", null, "Students love Study.com"),
            React.createElement("p", null, "I love the way expert tutors clearly explains the answers to my homework questions. Keep up the good work!"),
            React.createElement("small", null,
                React.createElement("em", null, "- Maritess, College Student")));
    };
    var FamilyPlanSidebar = function () {
        return React.createElement("div", { className: "helperText fade-in", "test-id": "reg_form_helper_text_family_plan" },
            React.createElement("h4", null, "Family Plan Includes"),
            React.createElement("ul", { className: "reg-modal-product-bullets" },
                React.createElement("li", null, "Free parent account"),
                React.createElement("li", null, "Add one or more paid student subscriptions"),
                React.createElement("li", null, "View individual student lesson progress"),
                React.createElement("li", null, "Monitor quiz scores"),
                React.createElement("li", null, "Receive weekly email status updates")));
    };
    var StudentSidebar1 = function () {
        return React.createElement("div", { className: "helperText fade-in" },
            ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && React.createElement("img", { src: "/images/registration/postModernRegFormV3/video-lessons-icon.svg", className: "claim-icon-video-lessons" }),
            React.createElement("p", { className: ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "font-size-18" : "" },
                "Study.com video lessons have helped over",
                React.createElement("em", { className: !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "red bold" : "teal bold" }, " ".concat(Marketing.activeMemberCount, " ")),
                "students."));
    };
    var StudentSidebar3 = function () {
        return React.createElement("div", { className: "helperText fade-in" },
            React.createElement("h4", null, "Earn College Credit"),
            React.createElement("p", null,
                "\"I aced the CLEP exam and earned ",
                React.createElement("em", { className: "green bold" }, "3 college credits!"),
                "\""),
            React.createElement("p", null, "- Clair S."));
    };
    var TutoringSidebar = function () {
        return React.createElement("div", { className: "helperText fade-in" },
            React.createElement("h4", null, "Students Love Study.com"),
            React.createElement("p", null, "\"The tutor that helped me was perfect! My tutor was very helpful and was able to explain the solution to me.\""),
            React.createElement("p", null, "- Xinyu Z."));
    };
    var TeacherTestimonial = function (_a) {
        var teacherSubject = _a.teacherSubject;
        switch (teacherSubject) {
            case "ENGLISH_LANGUAGE_ARTS":
                return React.createElement(EnglishLanguageArtsTestimonial, null);
            case "ART_MUSIC_THEATER":
                return React.createElement(ArtMusicTheaterTestimonial, null);
            case "SOCIAL_SCIENCES":
                return React.createElement(SocialSciencesTestimonial, null);
            case "MATH":
                return React.createElement(MathTestimonial, null);
            case "SCIENCE":
                return React.createElement(ScienceTestimonial, null);
            case "WORLD_LANGUAGE":
                return React.createElement(WorldLanguageTestimonial, null);
            case "PROFESSIONAL_CAREER":
                return React.createElement(ProfessionalCareerTestimonial, null);
            case "MULTIPLE_SUBJECTS":
                return React.createElement(MultipleSubjectsTestimonial, null);
            default:
                return React.createElement(DefaultTeacherTestimonial, null);
        }
    };
    exports.TeacherTestimonial = TeacherTestimonial;
    var TeacherSidebar = function (_a) {
        var teacherSubject = _a.teacherSubject;
        return React.createElement("div", { className: "helperText fade-in" },
            ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && React.createElement("img", { src: "/images/registration/modernizeRegForm/teacher-icon.svg", className: "claim-icon-teacher" }),
            React.createElement("h4", null, "Teachers Love Study.com"),
            React.createElement("div", { className: "reg-form-testimonial" },
                React.createElement(exports.TeacherTestimonial, { teacherSubject: teacherSubject })));
    };
    var EnglishLanguageArtsTestimonial = function () {
        return React.createElement("div", { className: "reg-form-testimonial" },
            React.createElement("div", { className: "reg-form-testimonial__text", "test-id": "english_language_arts_teacher_testimonial", "data-cname": "english_language_arts_teacher_testimonial" }, "\"It provides a quick and engaging way to cover material needed to understand readings we are covering in class.\""),
            React.createElement("div", { className: "reg-form-testimonial__credit" },
                React.createElement("div", { className: "testimonial__credit__image icon-user3" }),
                React.createElement("div", { className: "testimonial__credit__info" },
                    React.createElement("div", { className: "testimonial__credit__info__name" }, "Teresa P."),
                    React.createElement("div", { className: "testimonial__credit__info__role" }),
                    React.createElement("div", null, "Ohio, United States"))));
    };
    var ArtMusicTheaterTestimonial = function () {
        return React.createElement("div", { className: "reg-form-testimonial" },
            React.createElement("div", { className: "reg-form-testimonial__text", "test-id": "art_music_theater_teacher_testimonial", "data-cname": "art_music_theater_teacher_testimonial" }, "\"It provides a quick and engaging way to cover material needed to understand readings we are covering in class.\""),
            React.createElement("div", { className: "reg-form-testimonial__credit" },
                React.createElement("div", { className: "testimonial__credit__image icon-user3" }),
                React.createElement("div", { className: "testimonial__credit__info" },
                    React.createElement("div", { className: "testimonial__credit__info__name" }, "Teresa P."),
                    React.createElement("div", { className: "testimonial__credit__info__role" }),
                    React.createElement("div", null, "Ohio, United States"))));
    };
    var SocialSciencesTestimonial = function () {
        return React.createElement("div", { className: "reg-form-testimonial" },
            React.createElement("div", { className: "reg-form-testimonial__text", "test-id": "social_sciences_teacher_testimonial", "data-cname": "social_sciences_teacher_testimonial" }, "\"A teacher friend recommended Study.com for social studies. I enjoy assigning the videos to my students. The videos are short, to the point, and the quiz allows me to test their knowledge on whatever subject in social studies I am teaching at the time.\""),
            React.createElement("div", { className: "reg-form-testimonial__credit" },
                React.createElement("div", { className: "testimonial__credit__image icon-user3" }),
                React.createElement("div", { className: "testimonial__credit__info" },
                    React.createElement("div", { className: "testimonial__credit__info__name" }, "Nancy A."),
                    React.createElement("div", { className: "testimonial__credit__info__role" }),
                    React.createElement("div", null, "Ohio, United States"))));
    };
    var MathTestimonial = function () {
        return React.createElement("div", { className: "reg-form-testimonial" },
            React.createElement("div", { className: "reg-form-testimonial__text", "test-id": "math_teacher_testimonial", "data-cname": "math_teacher_testimonial" }, "\"Every time I have searched for a lesson, there has been a perfect match to my needs as a middle school teacher of science, and algebra.\""),
            React.createElement("div", { className: "reg-form-testimonial__credit" },
                React.createElement("div", { className: "testimonial__credit__image icon-user3" }),
                React.createElement("div", { className: "testimonial__credit__info" },
                    React.createElement("div", { className: "testimonial__credit__info__name" }, "Kathy S."),
                    React.createElement("div", { className: "testimonial__credit__info__role" }),
                    React.createElement("div", null, "New Jersey, United States"))));
    };
    var ScienceTestimonial = function () {
        return React.createElement("div", { className: "reg-form-testimonial" },
            React.createElement("div", { className: "reg-form-testimonial__text", "test-id": "science_teacher_testimonial", "data-cname": "science_teacher_testimonial" }, "\"Your lessons are very well developed, especially the videos that use analogies for scientific phenomena. Great way to memorize science concepts.\""),
            React.createElement("div", { className: "reg-form-testimonial__credit" },
                React.createElement("div", { className: "testimonial__credit__image icon-user3" }),
                React.createElement("div", { className: "testimonial__credit__info" },
                    React.createElement("div", { className: "testimonial__credit__info__name" }, "Lusy D."),
                    React.createElement("div", { className: "testimonial__credit__info__role" }),
                    React.createElement("div", null, "California, United States"))));
    };
    var WorldLanguageTestimonial = function () {
        return React.createElement("div", { className: "reg-form-testimonial" },
            React.createElement("div", { className: "reg-form-testimonial__text", "test-id": "world_language_teacher_testimonial", "data-cname": "world_language_teacher_testimonial" }, "\"I love the way the lessons are laid out in small chunks with quizzes to make sure you understand a concept before moving on. Excellent!\""),
            React.createElement("div", { className: "reg-form-testimonial__credit" },
                React.createElement("div", { className: "testimonial__credit__image icon-user3" }),
                React.createElement("div", { className: "testimonial__credit__info" },
                    React.createElement("div", { className: "testimonial__credit__info__name" }, "Brandy K."),
                    React.createElement("div", { className: "testimonial__credit__info__role" }),
                    React.createElement("div", null))));
    };
    var ProfessionalCareerTestimonial = function () {
        return React.createElement("div", { className: "reg-form-testimonial" },
            React.createElement("div", { className: "reg-form-testimonial__text", "test-id": "professional_career_teacher_testimonial", "data-cname": "professional_career_teacher_testimonial" }, "\"I am a 7th-grade teacher and often use it for language arts and world history. The students find it quite engaging. On a professional note, it has helped me pass 2 out of the for 4 Single Subject CSET English Exams! Now I am using it to help me pass the last 2 subtest exams.\""),
            React.createElement("div", { className: "reg-form-testimonial__credit" },
                React.createElement("div", { className: "testimonial__credit__image icon-user3" }),
                React.createElement("div", { className: "testimonial__credit__info" },
                    React.createElement("div", { className: "testimonial__credit__info__name" }, "Scott S."),
                    React.createElement("div", { className: "testimonial__credit__info__role" }),
                    React.createElement("div", null, "California, United States"))));
    };
    var MultipleSubjectsTestimonial = function () {
        return React.createElement("div", { className: "reg-form-testimonial" },
            React.createElement("div", { className: "reg-form-testimonial__text", "test-id": "multiple_subjects_teacher_testimonial", "data-cname": "multiple_subjects_teacher_testimonial" }, "\"As a math/science tutor I find these lessons extremely helpful when introducing concepts to my students or reinforcing what they have been taught.\""),
            React.createElement("div", { className: "reg-form-testimonial__credit" },
                React.createElement("div", { className: "testimonial__credit__image icon-user3" }),
                React.createElement("div", { className: "testimonial__credit__info" },
                    React.createElement("div", { className: "testimonial__credit__info__name" }, "Tim H."),
                    React.createElement("div", { className: "testimonial__credit__info__role" }),
                    React.createElement("div", null, "Barbados"))));
    };
    var DefaultTeacherTestimonial = function () {
        return React.createElement("div", { className: "reg-form-testimonial" },
            React.createElement("div", { className: "reg-form-testimonial__text", "test-id": "teacher_testimonial", "data-cname": "teacher_testimonial" }, "\"I like that students can retake quizzes until they achieve a perfect score. I also like the ability to create \"guided note templates\" from the transcripts of each video lesson.\""),
            React.createElement("div", { className: "reg-form-testimonial__credit" },
                React.createElement("div", { className: "testimonial__credit__image" },
                    React.createElement("img", { className: "testimonial__credit__image__image", src: "/images/registration/teacher/jaime-b-50.png" })),
                React.createElement("div", { className: "testimonial__credit__info" },
                    React.createElement("div", { className: "testimonial__credit__info__name" }, "Jaime B."),
                    React.createElement("div", { className: "testimonial__credit__info__role" }, !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() ? "Teacher, High School 9-12 Computer Science" : "Teacher, High School"),
                    !ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && React.createElement("div", null, "West Plains, MO"))));
    };
    var TutorSidebar = function () {
        return React.createElement("div", { className: "helperText fade-in" },
            ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && React.createElement("img", { src: "/images/registration/modernizeRegForm/teacher-icon.svg", className: "claim-icon-teacher" }),
            React.createElement("h4", null, "Teachers Love Study.com"),
            React.createElement("p", { "test-id": "testimonial_control_text" },
                "\"The videos have changed the way I teach! The videos on Study.com accomplish in ",
                React.createElement("em", { className: "red bold" }, "5 minutes"),
                " what would take me an entire class.\""),
            React.createElement("p", null, "- Chris F."));
    };
    var showingCXOffer = function (app) {
        var _a;
        return app.isProductCX(app.regMetadata.product) && app.coupon && (!!((_a = app.admissionsLandingPage) === null || _a === void 0 ? void 0 : _a.specialOffer) || !!app.prefillCouponCode);
    };
    var showingEmphasizeCoupon = function (app) {
        return app.adkey && app.prefillCouponCode && app.coupon && isCouponValid(app.coupon) && !app.paidTrialPrice;
    };
    function buildProductName(app) {
        var product = app.product;
        if (!product) {
            return null;
        }
        var productName = product.displayName;
        return React.createElement("span", { dangerouslySetInnerHTML: { __html: productName } });
    }
    function buildProductBoxPlanLabel(app, defaultValue) {
        var _a, _b;
        if (((_a = app.product) === null || _a === void 0 ? void 0 : _a.key) === "CS_UOPX") {
            return "University of Phoenix";
        }
        if (((_b = app.product) === null || _b === void 0 ? void 0 : _b.key) === "CS_COLLEGE_CONNECT") {
            return app.registrationData.cxPlannedSchool || "College Connect";
        }
        return defaultValue;
    }
    var _RegSidebarCartView = (function (_super) {
        __extends(_RegSidebarCartView, _super);
        function _RegSidebarCartView(props) {
            return _super.call(this, props) || this;
        }
        Object.defineProperty(_RegSidebarCartView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a, _b, _c, _d;
                var app = this.props.app;
                var store = app.form;
                var regData = app.registrationData;
                var shouldAddDataTrackRemspect = app.isProductCX(app.regMetadata.product);
                var isOnCartPage = store.currentPage === store.lastPage;
                var inCXCartSwitchVariation = (0, RegProductModalSwitcher_1.shouldRenderCXProductModalSwitcherOnCart)(app, isOnCartPage, (_a = app.regMetadata) === null || _a === void 0 ? void 0 : _a.productKeyOverride);
                var sidebarClassNames = ["form-sidebar"];
                var cartProductClassNames = ["cart-product cart-product--tableless"];
                if (app.isCollegePackageProduct) {
                    sidebarClassNames.push("form-sidebar--college-package");
                    cartProductClassNames.push("cart-product--college-package");
                    if (inCXCartSwitchVariation) {
                        cartProductClassNames.push("cart-product--cx-switch-variation");
                    }
                }
                return React.createElement("div", { className: sidebarClassNames.join(" "), "test-id": "partial_reg_form_sidebar" },
                    React.createElement("div", __assign({ className: "cart ".concat(app.isAnswersRegFlow ? "answers-reg-flow-cart" : "", " ").concat(inCXCartSwitchVariation && app.regMetadata.product === "CS3" ? "cart--gradient-border" : ""), "data-cname": "cart-parent", "data-track-visible": true }, (shouldAddDataTrackRemspect && { "data-track-remspect": "cxRegBullets" })),
                        inCXCartSwitchVariation && app.regMetadata.product === "CS3" && React.createElement("div", { className: "cart__recommended-header" }, ((_b = app.cxSlimCourseList) === null || _b === void 0 ? void 0 : _b.length) > 0 ? "Recommended based on your courses" : "Most popular"),
                        React.createElement("div", { className: cartProductClassNames.join(" ") },
                            inCXCartSwitchVariation &&
                                React.createElement(React.Fragment, null,
                                    app.regMetadata.product === "CS1" && React.createElement(ssr_cx_1.CXCS1PlanInfoBox, { selectedCourses: app.cxSlimCourseList }),
                                    app.regMetadata.product === "CS3" && React.createElement(ssr_cx_1.CXCS3PlanInfoBox, { selectedCourses: app.cxSlimCourseList }),
                                    !((_c = app.product) === null || _c === void 0 ? void 0 : _c.institutionName) && React.createElement("div", { className: "cart-product__price-box-container ".concat(showingCXOffer(app) ? "cart-product__price-box-container--with-cx-offer" : "") },
                                        React.createElement(exports.NonInstitutionPriceBox, __assign({}, this.props)),
                                        !app.paidTrialPrice && app.showAnnualToggle &&
                                            React.createElement("div", { className: "annual-billing-term-toggle-container" },
                                                React.createElement(AnnualToggle, __assign({}, this.props))))),
                            !inCXCartSwitchVariation &&
                                React.createElement(React.Fragment, null,
                                    !app.isCollegePackageProduct && React.createElement(RegistrationHeaderView, { app: app }),
                                    app.isCollegePackageProduct && React.createElement(CollegePackageHeaderView, { app: app }),
                                    React.createElement(RegProductBulletsViews_1.ProductBulletsView, { app: this.props.app }),
                                    shouldShowSocialProof(store) &&
                                        React.createElement("div", { className: "test-prep-claim-reg-form-wrapper" },
                                            React.createElement(TestPrepSocialProofSidebar, { isOnCartPage: isOnCartPage, productKey: app.product.key }))))),
                    !app.product && React.createElement("div", { className: "cart-empty", "data-track-visible": true, "data-cname": "empty_cart" },
                        React.createElement("p", null, "Your Cart is Empty. Please Choose a Product.")),
                    React.createElement(RegProductModalSwitcher_1.RegProductModalSwitcherOnCartWrapper, { app: app, isLastPage: true, productOverride: (_d = app.regMetadata) === null || _d === void 0 ? void 0 : _d.productKeyOverride }));
            }
        });
        return _RegSidebarCartView;
    }(React.Component));
    exports._RegSidebarCartView = _RegSidebarCartView;
    var SavingsImagesView = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        var paidTrialIsActive = app.isPaidTrialEligible && app.paidTrialPrice && app.regMetadata.hasSelectedPaidTrial;
        var isAnswersProduct = app.regMetadata.product === "ANSWERS";
        return React.createElement(React.Fragment, null,
            paidTrialIsActive && isAnswersProduct &&
                React.createElement("img", { src: "/images/registration/limited-time-offer-burst.png", className: "cart-product__limited-offer-burst" }),
            paidTrialIsActive && !isAnswersProduct && !app.shouldOfferTestPrepTwoWeekPlan && remspect.isControl("regFormRebrand") &&
                React.createElement("img", { src: "/images/registration/20off.svg", className: "cart-product__percent-off-burst" }));
    });
    var ProductTitleView = (0, mobx_react_1.observer)(function (props) {
        var _a;
        var app = props.app;
        var regData = app.registrationData;
        return React.createElement("div", { className: "cart-product__product-title", "data-track-visible": true, "data-cname": "cart_product", "data-extra": ((_a = app.product) === null || _a === void 0 ? void 0 : _a.displayName) + (app.paidTrialPrice ? " PAID_TRIAL" : "") },
            !regData.wantsFamilyPlan && React.createElement("span", { className: "product-title-style", "test-id": "cart_product_name" }, buildProductName(app)),
            regData.wantsFamilyPlan && React.createElement("span", { className: "product-title-style", "test-id": "cart_product_name" }, "Family Plan"));
    });
    var BestPlanCoursesView = (0, mobx_react_1.observer)(function (props) {
        var _a, _b, _c, _d, _e, _f;
        var app = props.app;
        var usePlural = ((_a = app.regMetadata.cxCourseIdList) === null || _a === void 0 ? void 0 : _a.length) !== 1;
        if (!((_c = (_b = app.regMetadata) === null || _b === void 0 ? void 0 : _b.cxCourseIdList) === null || _c === void 0 ? void 0 : _c.length)) {
            return null;
        }
        var _g = React.useState(true), collapsed = _g[0], setCollapsed = _g[1];
        var toggleCollapse = function () {
            setCollapsed(!collapsed);
        };
        var currentProduct = app.regMetadata.product;
        var selectedCourses = (_d = app.cxSlimCourseList) === null || _d === void 0 ? void 0 : _d.slice().sort(function (a, b) { return a.inCS1 === b.inCS1 ? 0 : !a.inCS1 ? -1 : 1; });
        var allCoursesIncludedInPlan = "CS3" === currentProduct || ("CS1" === currentProduct && selectedCourses.every(function (course) { return course.inCS1; }));
        var titleOverride = allCoursesIncludedInPlan ? "Included with this plan" : "Some courses aren't included with this plan";
        return React.createElement("div", { className: "best-plan-section" },
            React.createElement("div", { className: "best-plan-section__body" }, (0, RegProductModalSwitcher_1.shouldRenderCXProductModalSwitcherOnCart)(app, true, (_e = app.regMetadata) === null || _e === void 0 ? void 0 : _e.productKeyOverride) ?
                React.createElement(RegProductModalSwitcher_1.CXCoursesAvailabilities, { product: currentProduct, selectedCourses: selectedCourses, collapsed: collapsed, toggleCollapsed: toggleCollapse, titleOverride: titleOverride }) :
                React.createElement("div", null,
                    "The ", (_f = app.regMetadata.cxCourseIdList) === null || _f === void 0 ? void 0 :
                    _f.length,
                    " course",
                    usePlural ? "s" : "",
                    " you selected ",
                    usePlural ? "are" : "is",
                    " included with this plan")));
    });
    var RegistrationHeaderView = (0, mobx_react_1.observer)(function (props) {
        var _a, _b, _c;
        var app = props.app;
        var planHeader = remspect.isControl("regFormRebrand") ? "Your Selected Plan" : "Your selected plan";
        return React.createElement(React.Fragment, null,
            React.createElement(SavingsImagesView, { app: app }),
            React.createElement("h6", { className: "cart-product__subhead" }, buildProductBoxPlanLabel(app, planHeader)),
            React.createElement(ProductTitleView, { app: app }),
            ((_a = app.product) === null || _a === void 0 ? void 0 : _a.institutionName) &&
                React.createElement("div", null,
                    React.createElement("h6", null, "You are joining:"),
                    React.createElement("div", { className: "cart-product__product-title" },
                        React.createElement("span", { "data-cname": "cart_institution_name", "test-id": "cart_institution_name" }, (_b = app.product) === null || _b === void 0 ? void 0 : _b.institutionName))),
            !((_c = app.product) === null || _c === void 0 ? void 0 : _c.institutionName) && React.createElement("div", { className: "cart-product__price-box-container ".concat(showingCXOffer(app) ? "cart-product__price-box-container--with-cx-offer" : "") },
                React.createElement(exports.NonInstitutionPriceBox, __assign({}, props)),
                !app.paidTrialPrice && app.showAnnualToggle &&
                    React.createElement("div", { className: "annual-billing-term-toggle-container" },
                        React.createElement(AnnualToggle, __assign({}, props)))));
    });
    var CollegePackageHeaderView = (0, mobx_react_1.observer)(function (props) {
        var _a, _b, _c, _d, _e, _f, _g;
        var app = props.app;
        var isUOPX = ((_a = app.product) === null || _a === void 0 ? void 0 : _a.key) === "CS_UOPX";
        var collegeConnectLogoUrl = ((_b = app.product) === null || _b === void 0 ? void 0 : _b.key) === "CS_COLLEGE_CONNECT" && app.regMetadata.cxPlannedSchoolLogoUrl;
        return React.createElement(React.Fragment, null,
            React.createElement(SavingsImagesView, { app: app }),
            React.createElement("h6", { className: "cart-product__subhead" }, buildProductBoxPlanLabel(app, "Your selected plan:")),
            React.createElement("div", { className: "cart-product__college-package-header" },
                React.createElement("div", null,
                    React.createElement(ProductTitleView, { app: app }),
                    React.createElement("div", { className: "cart-product__promotion cart-product__promotion--college-package" },
                        React.createElement("b", null,
                            React.createElement(marketing_1.MoneyBackGuaranteeLanguage, null),
                            "\u00A0"),
                        React.createElement(ReactRegPage_app_1.RegFormTooltip, { content: React.createElement(React.Fragment, null,
                                "If within ",
                                React.createElement(marketing_1.RiskFreeDays, null),
                                " days you are not satisfied, we will refund your money."), cname: "cart_money_back_guarantee" }, remspect.isControl("regFormRebrand") ? React.createElement("span", { className: "icon-question-sign tip" }) : React.createElement(eureka_design_system_1.MaterialIcon, { filename: "icon-question-filled-20.svg" })))),
                isUOPX && React.createElement("img", { src: "/images/company/partnersPage/uopx-logo-only.png", className: "cart-product__college-connect-logo" }),
                collegeConnectLogoUrl && React.createElement("img", { src: collegeConnectLogoUrl, className: "cart-product__college-connect-logo" })),
            React.createElement("div", { className: "cart-product__college-package-body" },
                ((_c = app.product) === null || _c === void 0 ? void 0 : _c.institutionName) &&
                    React.createElement("div", null,
                        React.createElement("h6", null, "You are joining:"),
                        React.createElement("div", { className: "cart-product__product-title" },
                            React.createElement("span", { "data-cname": "cart_institution_name", "test-id": "cart_institution_name" }, (_d = app.product) === null || _d === void 0 ? void 0 : _d.institutionName))),
                !((_e = app.product) === null || _e === void 0 ? void 0 : _e.institutionName) && React.createElement("div", { className: "cart-product__price-box-container cart-product__price-box-container--college-package ".concat(showingCXOffer(app) ? "cart-product__price-box-container--with-cx-offer" : "") },
                    React.createElement(exports.NonInstitutionPriceBox, __assign({}, props)),
                    !app.paidTrialPrice && app.showAnnualToggle &&
                        React.createElement("div", { className: "annual-billing-term-toggle-container" },
                            React.createElement(AnnualToggle, __assign({}, props))))),
            !isUOPX && ((_g = (_f = app.regMetadata) === null || _f === void 0 ? void 0 : _f.cxCourseIdList) === null || _g === void 0 ? void 0 : _g.length) > 0 && React.createElement(BestPlanCoursesView, { app: app }));
    });
    exports.RegSidebarCartView = (0, mobx_react_1.observer)(_RegSidebarCartView);
    var _RegSidebarMobileCartView = (function (_super) {
        __extends(_RegSidebarMobileCartView, _super);
        function _RegSidebarMobileCartView(props) {
            return _super.call(this, props) || this;
        }
        Object.defineProperty(_RegSidebarMobileCartView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a, _b, _c, _d, _e, _f, _g;
                var app = this.props.app;
                var regData = app.registrationData;
                var product = ((_a = app.regMetadata) === null || _a === void 0 ? void 0 : _a.product) || "";
                var isOnCartPage = app.form.currentPage === app.form.lastPage;
                var inCXCartSwitchVariation = (0, RegProductModalSwitcher_1.shouldRenderCXProductModalSwitcherOnCart)(app, isOnCartPage, (_b = app.regMetadata) === null || _b === void 0 ? void 0 : _b.productKeyOverride);
                var mobileCartClassNames = ["mobile-cart"];
                if (app.isCollegePackageProduct) {
                    mobileCartClassNames.push("mobile-cart--college-package");
                }
                var cartClassNames = ["cart"];
                if (inCXCartSwitchVariation && app.regMetadata.product === "CS3") {
                    cartClassNames.push("cart--gradient-border");
                }
                if ((0, RegProductModalSwitcher_1.inCXCartSwitchMobileV2Variation)()) {
                    cartClassNames.push("cart--plans-switcher-mobileV2");
                }
                var selectedCourses = (0, RegProductModalSwitcher_1.inCXCartSwitchMobileV2Variation)() ? app.cxSlimCourseList : [];
                if (inCXCartSwitchVariation) {
                    mobileCartClassNames.push("mobile-cart--cx-switch-variation");
                    return React.createElement("div", { className: cartClassNames.join(" ") },
                        inCXCartSwitchVariation && app.regMetadata.product === "CS3" && React.createElement("div", { className: "cart__recommended-header" }, ((_c = app.cxSlimCourseList) === null || _c === void 0 ? void 0 : _c.length) > 0 ? "Recommended for you" : "Most popular"),
                        React.createElement("div", { className: "cart-product cart-product--tableless cart-product--cx-switch-variation" },
                            React.createElement("div", { className: mobileCartClassNames.join(" "), "data-cname": "mobile_cart", "data-extra": (_d = app.product) === null || _d === void 0 ? void 0 : _d.displayName, "data-track-visible": true, "test-id": "mobile_cart" },
                                app.regMetadata.product === "CS1" && React.createElement(ssr_cx_1.CXCS1PlanInfoBox, { selectedCourses: selectedCourses }),
                                app.regMetadata.product === "CS3" && React.createElement(ssr_cx_1.CXCS3PlanInfoBox, { selectedCourses: selectedCourses }),
                                !((_e = app.product) === null || _e === void 0 ? void 0 : _e.institutionName) && React.createElement("div", { className: "cart-product__price-box-container ".concat(showingCXOffer(app) ? "cart-product__price-box-container--with-cx-offer" : "") },
                                    React.createElement(exports.NonInstitutionPriceBox, __assign({}, this.props)),
                                    !app.paidTrialPrice && app.showAnnualToggle &&
                                        React.createElement("div", { className: "annual-billing-term-toggle-container" },
                                            React.createElement(AnnualToggle, __assign({}, this.props)))))));
                }
                return React.createElement("div", { className: mobileCartClassNames.join(" "), "data-cname": "mobile_cart", "data-extra": (_f = app.product) === null || _f === void 0 ? void 0 : _f.displayName, "data-track-visible": true, "test-id": "mobile_cart" },
                    app.gsCourseTitle && React.createElement(React.Fragment, null,
                        React.createElement(exports.RegSidebarGoogleShoppingCartView, __assign({}, this.props)),
                        React.createElement("div", { className: "price-details" },
                            React.createElement("div", null,
                                "Your account will be active for ",
                                React.createElement("strong", null, "12 months")),
                            React.createElement("div", null,
                                "And if you have any questions, ",
                                React.createElement("b", null, "you can reach out anytime")))),
                    !app.gsCourseTitle && React.createElement(React.Fragment, null,
                        regData.wantsFamilyPlan && React.createElement("p", { className: "family-plan-mobile-cart-message", "test-id": "family_plan_mobile_cart" }, "Family Plan includes one admin account and one student account. Add additional student accounts after sign up."),
                        app.paidTrialPrice && !app.referred && !app.shouldOfferTestPrepTwoWeekPlan && React.createElement("div", { className: "month-paid-trial month-paid-trial--plan-name" },
                            "Your selected plan: ",
                            React.createElement("span", { className: "month-paid-trial__product", "data-cname": "cart_product", "test-id": "cart_product_name", "data-extra": ((_g = app.product) === null || _g === void 0 ? void 0 : _g.displayName) + ' PAID_TRIAL' }, buildProductName(app))),
                        app.shouldOfferTestPrepTwoWeekPlan &&
                            React.createElement("div", { className: "price-details price-details--flush-left price-details--small-margin-bottom", "data-cname": "bullet_list", "data-track-remspect": "taxLanguage" },
                                React.createElement("div", { className: "price-details__row" },
                                    React.createElement("div", { className: "price-details__your-plan" },
                                        React.createElement("span", null, buildProductBoxPlanLabel(app, "Your plan:"))),
                                    React.createElement("b", { className: "price-details__product-price" },
                                        React.createElement("span", { "test-id": "cart_product_name" },
                                            React.createElement("span", null, buildProductName(app)))))),
                        app.paidTrialPrice && !app.referred && !app.shouldOfferTestPrepTwoWeekPlan &&
                            React.createElement(MobilePaidTrialPriceDetails, __assign({}, this.props)),
                        app.paidTrialPrice && !app.referred && !regData.wantsFamilyPlan &&
                            React.createElement(PaidTrialToggles, __assign({}, this.props)),
                        React.createElement("div", { className: "price-details price-details--flush-left ".concat((app.paidTrialMessagingEligible && !app.shouldOfferTestPrepTwoWeekPlan) ? 'price-details--border' : '', " ").concat(showingCXOffer(app) ? "price-details--with-cx-offer" : ""), "data-cname": "bullet_list", "data-track-visible": true, "data-track-remspect": "taxLanguage" },
                            React.createElement(MobilePriceDetails, __assign({}, this.props))),
                        app.showAnnualToggle && React.createElement("div", { className: "annual-billing-term-toggle-mobile-container" },
                            React.createElement(AnnualToggle, __assign({}, this.props))),
                        showingCXOffer(app) &&
                            React.createElement(CXOfferView, { app: app }),
                        showingEmphasizeCoupon(app) &&
                            React.createElement(EmphasizeCouponMobile, { app: app })),
                    app.isCollegePackageProduct && React.createElement(BestPlanCoursesView, { app: app }),
                    !remspect.isControl("passGuarantee") && TestPrepConstants_1.PASS_OR_FAIL_EXAM_NAMES.indexOf(product) != -1 && React.createElement(MobilePassGuaranteeDetails, null),
                    React.createElement(RegProductBulletsViews_1.MobileProductBullets, __assign({}, this.props)));
            }
        });
        return _RegSidebarMobileCartView;
    }(React.Component));
    exports._RegSidebarMobileCartView = _RegSidebarMobileCartView;
    var MobilePassGuaranteeDetails = function () {
        var _a = React.useState(false), isViewDetailsOpen = _a[0], setIsViewDetailsOpen = _a[1];
        var collapsedClassName = isViewDetailsOpen ? '' : 'collapsed';
        var title;
        var details;
        if (remspect.isVariation("passGuarantee", "mbg")) {
            title = "Money-back guarantee";
            details = "Score 80%+ on a Study.com full-length Practice Test and pass your real exam or get 2 months of membership costs back.";
        }
        else if (remspect.isVariation("passGuarantee", "pg")) {
            title = "Pass guarantee";
            details = "Score 80%+ on a Study.com full-length Practice Test and pass your real exam or get an additional 2 months free of charge to prepare for another try.";
        }
        return React.createElement("div", { className: "mobile-pass-guarantee-details" },
            React.createElement("hr", { className: "cart-hr" }),
            React.createElement("div", { className: "mobile-pass-guarantee-details__title ".concat(collapsedClassName) },
                React.createElement("span", null, title),
                React.createElement("div", { className: "view-detail-toggle", onClick: function () { return setIsViewDetailsOpen(!isViewDetailsOpen); } },
                    isViewDetailsOpen && React.createElement(React.Fragment, null,
                        React.createElement("span", null, "Hide details "),
                        React.createElement("span", { className: "icon icon-angle-up" })),
                    !isViewDetailsOpen && React.createElement(React.Fragment, null,
                        React.createElement("span", null, "View details "),
                        React.createElement("span", { className: "icon icon-angle-down" })))),
            React.createElement(CollapsibleAutoSizeComponent_1.CollapsibleAutoSizeComponent, { collapsed: !isViewDetailsOpen, className: "mobile-pass-guarantee-details__details" }, details));
    };
    exports.RegSidebarMobileCartView = (0, mobx_react_1.observer)(_RegSidebarMobileCartView);
    exports.RegSidebarGoogleShoppingCartView = (0, mobx_react_1.observer)((function (_super) {
        __extends(_RegSidebarGoogleShoppingCartView, _super);
        function _RegSidebarGoogleShoppingCartView(props) {
            return _super.call(this, props) || this;
        }
        Object.defineProperty(_RegSidebarGoogleShoppingCartView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var app = this.props.app;
                return React.createElement("div", { className: "cart cart--gs", "test-id": "google_shopping_cart", "data-cname": "google_shopping_cart", "data-track-visible": true },
                    React.createElement("div", { className: "cart-product" },
                        React.createElement("h6", null, "Your selected product:"),
                        React.createElement("div", { className: "product-title ".concat(!remspect.isControl("regFormRebrand") && "cart-product__product-title") },
                            React.createElement("span", { "test-id": "google_shopping_cart_course_name" }, app.gsCourseTitle),
                            React.createElement("br", null),
                            "(12\u00A0month subscription)"),
                        React.createElement("div", { className: "cart__details" },
                            React.createElement("div", { className: "cart__details__date" }, "Starting Today:"),
                            React.createElement("div", { className: "cart__details__price" }, app.priceString),
                            React.createElement("div", { className: "cart__details__original-price" }, app.originalPriceString)),
                        React.createElement("div", { className: "cart__savings" },
                            "Save ",
                            app.discount,
                            "%")));
            }
        });
        return _RegSidebarGoogleShoppingCartView;
    }(React.Component)));
    var MobilePaidTrialPriceDetails = (0, mobx_react_1.observer)(function (props) {
        var _a;
        var app = props.app;
        var content = undefined;
        if (app.hasOptedForTestPrepTwoWeekPlan) {
            var price = app.paidTrialPrice;
            content = React.createElement("div", { className: "pull-right price-per-month--tax", "data-price": price },
                React.createElement("span", { className: "text-align-right" },
                    React.createElement("span", { "test-id": "reg_form_current_product_price" }, price),
                    React.createElement("span", { className: "month-paid-trial--pricing-per" })),
                React.createElement("div", { className: "must-be-grey-very-important pull-right tax_text" }, "(+ tax if applicable)"));
        }
        else if (app.coupon) {
            var price = (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100);
            content = React.createElement("div", { className: "pull-right", "data-price": price },
                React.createElement("span", { "test-id": "reg_form_current_product_price" }, price),
                React.createElement("span", { className: "month-paid-trial--pricing-per" }, "/mo"));
        }
        else if (app.regMetadata.hasSelectedPaidTrial) {
            content = React.createElement("div", { className: "pull-right", "data-price": app.paidTrialPrice },
                React.createElement("span", { "test-id": "reg_form_current_product_price" }, app.paidTrialPrice),
                React.createElement("span", { className: "month-paid-trial--pricing-per" }));
        }
        else {
            var price = (0, react_study_helpers_1.currency)(((_a = app.product) === null || _a === void 0 ? void 0 : _a.remspectPriceCents) / 100);
            content = React.createElement("div", { className: "pull-right price-per-month--tax", "data-price": price },
                React.createElement("span", { className: "text-align-right" },
                    React.createElement("span", { "test-id": "reg_form_current_product_price" }, price),
                    React.createElement("span", { className: "month-paid-trial--pricing-per" }, "/mo")),
                React.createElement("div", { className: "must-be-grey-very-important pull-right tax_text" }, "(+ tax if applicable)"));
        }
        return React.createElement("div", { className: "month-paid-trial month-paid-trial--pricing month-paid-trial--tax" },
            React.createElement("span", null,
                "Starting ",
                React.createElement("span", { "test-id": "paid_trial_start_date" }, app.endTrialDate.format(PAID_TRIAL_DATE_FORMAT))),
            content);
    });
    var PaidTrialToggles = (0, mobx_react_1.observer)(function (props) {
        var _a, _b, _c;
        var app = props.app;
        var trialOptionContent = React.createElement(React.Fragment, null,
            app.shouldOfferTestPrepTwoWeekPlan &&
                React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "month-paid-trial__product-price" },
                        React.createElement("span", null, "Two week access"),
                        React.createElement("span", { "test-id": "reg_form_current_product_price" }, app.paidTrialPrice)),
                    React.createElement("div", { className: "month-paid-trial__product-price-details" },
                        "Renews on ",
                        React.createElement("span", { "test-id": "reg_form_renewal_date" }, app.endPaidTrialDate.format(PAID_TRIAL_DATE_FORMAT)),
                        " for ",
                        (0, react_study_helpers_1.currency)((app.product.remspectPriceCents) / 100),
                        "/mo")),
            !app.shouldOfferTestPrepTwoWeekPlan && React.createElement(React.Fragment, null,
                "Try it first for ",
                app.paidTrialDays,
                " days. ",
                React.createElement("span", { className: "green semibold" }, "Special Offer!")));
        var trialOptionCname = "select_paid_trial";
        var monthlyOptionContent;
        if (app.shouldOfferTestPrepTwoWeekPlan) {
            var price = void 0;
            if (app.coupon) {
                price = React.createElement(React.Fragment, null,
                    React.createElement("span", { className: "month-paid-trial__product-price-original" }, (0, react_study_helpers_1.currency)((app.product.remspectPriceCents) / 100)),
                    React.createElement("span", { "test-id": "reg_form_current_product_price" }, (0, react_study_helpers_1.currency)((app.coupon.discountPriceCents) / 100)),
                    React.createElement("span", { className: "month-paid-trial__product-price-details" }, "/mo"));
            }
            else {
                price = React.createElement(React.Fragment, null,
                    React.createElement("span", { className: "month-paid-trial__product-price-item", "test-id": "reg_form_current_product_price" }, (0, react_study_helpers_1.currency)((app.product.remspectPriceCents) / 100)),
                    React.createElement("span", { className: "month-paid-trial__product-price-details" }, "/mo"));
            }
            monthlyOptionContent =
                React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "month-paid-trial__product-price" },
                        React.createElement("span", null, "Monthly access"),
                        React.createElement("span", null, price)),
                    React.createElement("div", null,
                        React.createElement("div", { className: "month-paid-trial__product-price-details" },
                            React.createElement("span", null, "Just\u00A0"),
                            !app.coupon && React.createElement("span", null, (0, react_study_helpers_1.currency)(((_a = app.product) === null || _a === void 0 ? void 0 : _a.remspectPriceCents) / 100 / (30 * ((_b = app.product) === null || _b === void 0 ? void 0 : _b.billingIntervalCount)))),
                            app.coupon && React.createElement("span", null, (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100 / (30 * ((_c = app.product) === null || _c === void 0 ? void 0 : _c.billingIntervalCount)))),
                            React.createElement("span", null, "/day (+ tax if applicable) "))));
        }
        else {
            monthlyOptionContent = React.createElement(React.Fragment, null, "Start now with our monthly plan");
        }
        return !remspect.isControl("regFormRebrand") ?
            (React.createElement("div", { className: "paid-trial__options" },
                React.createElement(eureka_design_system_1.RadioButton, { className: "month-paid-trial__label", "data-cname": "no_paid_trial", label: monthlyOptionContent, name: "paidTrialOption", value: "false", onClick: (0, mobx_1.action)(function () {
                        app.regMetadata.hasSelectedPaidTrial = false;
                        if (app.shouldOfferTestPrepTwoWeekPlan) {
                            app.shouldPreventCouponEdit = false;
                        }
                    }), checked: !app.regMetadata.hasSelectedPaidTrial, readOnly: true }),
                React.createElement(eureka_design_system_1.RadioButton, { className: "month-paid-trial__label", "data-cname": trialOptionCname, label: trialOptionContent, name: "paidTrialOption", onClick: (0, mobx_1.action)(function () {
                        app.regMetadata.hasSelectedPaidTrial = true;
                        if (app.shouldOfferTestPrepTwoWeekPlan) {
                            app.showCouponCodeInput = false;
                            app.shouldPreventCouponEdit = true;
                            app.regMetadata.couponCode = "";
                        }
                    }), checked: app.regMetadata.hasSelectedPaidTrial, value: "true", readOnly: true })))
            :
                (React.createElement("div", { className: "month-paid-trial month-paid-trial--toggles" + (app.shouldOfferTestPrepTwoWeekPlan && " no-border") },
                    React.createElement("label", { className: "month-paid-trial__label", "test-id": "no_paid_trial", "data-cname": "no_paid_trial" },
                        React.createElement("input", { type: "radio", className: "month-paid-trial__radio hidden", onClick: (0, mobx_1.action)(function () {
                                app.regMetadata.hasSelectedPaidTrial = false;
                                if (app.shouldOfferTestPrepTwoWeekPlan) {
                                    app.shouldPreventCouponEdit = false;
                                }
                            }), checked: !app.regMetadata.hasSelectedPaidTrial, value: "false", readOnly: true }),
                        React.createElement("span", { className: "month-paid-trial__radio-custom" },
                            React.createElement("span", null)),
                        React.createElement("span", null, monthlyOptionContent)),
                    React.createElement("label", { className: "month-paid-trial__label", "test-id": trialOptionCname, "data-cname": trialOptionCname },
                        React.createElement("input", { type: "radio", className: "month-paid-trial__radio hidden", onClick: (0, mobx_1.action)(function () {
                                app.regMetadata.hasSelectedPaidTrial = true;
                                if (app.shouldOfferTestPrepTwoWeekPlan) {
                                    app.showCouponCodeInput = false;
                                    app.shouldPreventCouponEdit = true;
                                    app.regMetadata.couponCode = "";
                                }
                            }), checked: app.regMetadata.hasSelectedPaidTrial, value: "true", readOnly: true }),
                        React.createElement("span", { className: "month-paid-trial__radio-custom" },
                            React.createElement("span", null)),
                        React.createElement("span", null, trialOptionContent))));
    });
    var MobilePriceDetails = (0, mobx_react_1.observer)(function (props) {
        var _a, _b;
        var app = props.app;
        var regData = app.registrationData;
        if (app.hasOptedForTestPrepTwoWeekPlan) {
            return React.createElement("div", { className: "price-details__row price-details__free-to-cancel" },
                "You are free to ",
                React.createElement("b", null, "cancel online, anytime"));
        }
        var nextMonthChargeRow;
        if (app.paidTrialPrice && !app.referred && regData.hasSelectedPaidTrial) {
            nextMonthChargeRow = React.createElement("div", { className: "price-details__row price-details__row--next-month-charge" },
                "You will not be charged for your next month until ",
                React.createElement("span", null, app.endPaidTrialDate.format(PAID_TRIAL_DATE_FORMAT)));
        }
        var familyAdminChargeRow;
        if (regData.wantsFamilyPlan) {
            familyAdminChargeRow = React.createElement("div", { className: "price-details__row price-details__row--family-admin", "test-id": "family_plan_mobile_admin_bullet" },
                "Your admin account: ",
                React.createElement("b", null, "$0.00/mo"));
        }
        var referralRows;
        if (app.referred) {
            referralRows = React.createElement(React.Fragment, null,
                React.createElement("div", { className: "price-details__row" },
                    "One-time discount: ",
                    React.createElement("span", { className: "mobile-cart__savings" },
                        React.createElement("span", null, (0, react_study_helpers_1.currency)(app.referralDiscountCents((_a = app.product) === null || _a === void 0 ? void 0 : _a.key)
                            / 100)),
                        " off")),
                React.createElement("div", { className: "price-details__row" },
                    "First month's price: ",
                    React.createElement("b", null,
                        React.createElement("span", null, (0, react_study_helpers_1.currency)(app.remspectPriceWithReferralDiscountCents((_b = app.product) === null || _b === void 0 ? void 0 : _b.key) / 100)))));
        }
        var couponRow;
        if (app.coupon && !app.paidTrialPrice) {
            couponRow = React.createElement("div", { className: "price-details__row price-details__coupon-discount" },
                "Coupon discount: ",
                React.createElement("span", { className: "mobile-cart__savings" },
                    app.coupon.percentOff && React.createElement("span", null,
                        app.coupon.percentOff,
                        "%"),
                    !app.coupon.percentOff && React.createElement("span", null, (0, react_study_helpers_1.currency)(app.coupon.amountOffCents / 100)),
                    "\u00A0off",
                    app.coupon.durationInMonths && React.createElement("span", null,
                        " for ",
                        React.createElement("span", null, app.coupon.durationInMonths),
                        " month",
                        app.coupon.durationInMonths > 1 &&
                            React.createElement("span", null, "s"))));
        }
        var freeToCancelRow = app.isCollegePackageProduct
            ? React.createElement("div", { className: "price-details__row price-details__free-to-cancel price-details__free-to-cancel--college-package" },
                "You are free to ",
                React.createElement("span", { className: "price-details__free-to-cancel--tag" }, "cancel online, anytime"))
            : React.createElement("div", { className: "price-details__row price-details__free-to-cancel" },
                "You are free to ",
                React.createElement("b", null, "cancel online, anytime"));
        return React.createElement(React.Fragment, null,
            nextMonthChargeRow,
            familyAdminChargeRow,
            React.createElement(PrimaryPriceDetailsRow, { app: app }),
            referralRows,
            couponRow,
            freeToCancelRow);
    });
    var PrimaryPriceDetailsRow = (0, mobx_react_1.observer)(function (_a) {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var app = _a.app;
        var regData = app.registrationData;
        if (!regData.hasSelectedPaidTrial && app.paidTrialPrice) {
            return null;
        }
        var priceDetailsTitleClassName = app.isCollegePackageProduct ? "price-details-title--college-package" : "";
        var productNameClassName = app.isCollegePackageProduct ? "cart-product-name--college-package" : "";
        var classNames = ["price-details__row"];
        if (regData.hasSelectedPaidTrial) {
            classNames.push("price-details__row--paid-trial-selected-cart");
        }
        var yourPlanDetailsEl;
        if (regData.wantsFamilyPlan) {
            yourPlanDetailsEl = React.createElement("span", null, buildProductBoxPlanLabel(app, "Your student plan:"));
        }
        else {
            yourPlanDetailsEl = React.createElement("span", { className: priceDetailsTitleClassName }, buildProductBoxPlanLabel(app, "Your plan:"));
        }
        var commaDelim = remspect.isControl("regFormRebrand") ? "" : React.createElement(React.Fragment, null,
            ",",
            "\u00a0");
        var priceEl;
        if (app.paidTrialPrice) {
            var priceCents = app.coupon
                ? app.coupon.discountPriceCents
                : (_b = app.product) === null || _b === void 0 ? void 0 : _b.remspectPriceCents;
            priceEl = React.createElement("span", { className: "price-details__mobile-product-and-price" },
                React.createElement("span", { "test-id": "cart_product_name", className: productNameClassName }, buildProductName(app)),
                ",\u00A0",
                React.createElement("span", null,
                    React.createElement("span", { "test-id": "reg_form_current_product_price" }, (0, react_study_helpers_1.currency)(priceCents / 100)),
                    "/",
                    ((_c = app.product) === null || _c === void 0 ? void 0 : _c.billingIntervalType) == "YEAR" ? "yr" : "mo"));
        }
        else if (app.isCollegePackageProduct) {
            var noCouponEl = void 0;
            var withCouponEl = void 0;
            if (app.coupon) {
                var originalPriceSuffixEl = void 0;
                if (showingEmphasizeCoupon(app)) {
                    originalPriceSuffixEl = React.createElement("span", { className: "billing-price--previous billing-price__college-package--previous" },
                        React.createElement("s", null, (0, react_study_helpers_1.currency)(((_d = app.product) === null || _d === void 0 ? void 0 : _d.remspectPriceCents)
                            / 100)),
                        "\u00A0");
                }
                withCouponEl = React.createElement("span", null,
                    originalPriceSuffixEl,
                    React.createElement("span", { "test-id": "reg_form_current_product_price" }, (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100)),
                    "/",
                    ((_e = app.product) === null || _e === void 0 ? void 0 : _e.billingIntervalType) == "YEAR" ? "yr" : "mo");
            }
            else {
                noCouponEl = React.createElement("span", null,
                    React.createElement("span", { "test-id": "reg_form_current_product_price", className: "price-details__current-price--college-package" }, (0, react_study_helpers_1.currency)(((_f = app.product) === null || _f === void 0 ? void 0 : _f.remspectPriceCents) / 100)),
                    "/",
                    ((_g = app.product) === null || _g === void 0 ? void 0 : _g.billingIntervalType) == "YEAR" ? "yr" : "mo");
            }
            priceEl = React.createElement("b", { className: "price-details__product-price" },
                React.createElement("div", { className: "price-details__college-package" },
                    React.createElement("span", { "test-id": "cart_product_name", className: "cart-product-name--college-package" }, buildProductName(app)),
                    commaDelim,
                    noCouponEl),
                withCouponEl);
        }
        else {
            var priceSuffix = void 0;
            if (app.coupon) {
                var originalPriceSuffixEl = void 0;
                if (showingEmphasizeCoupon(app)) {
                    originalPriceSuffixEl = React.createElement("span", { className: "billing-price--previous" },
                        React.createElement("s", null, (0, react_study_helpers_1.currency)(((_h = app.product) === null || _h === void 0 ? void 0 : _h.remspectPriceCents)
                            / 100)),
                        "\u00A0");
                }
                priceSuffix = React.createElement("span", null,
                    originalPriceSuffixEl,
                    React.createElement("span", { "test-id": "reg_form_current_product_price" }, (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100)),
                    "/",
                    ((_j = app.product) === null || _j === void 0 ? void 0 : _j.billingIntervalType) == "YEAR" ? "yr" : "mo");
            }
            else {
                priceSuffix = React.createElement("span", null,
                    React.createElement("span", { "test-id": "reg_form_current_product_price" }, (0, react_study_helpers_1.currency)(((_k = app.product) === null || _k === void 0 ? void 0 : _k.remspectPriceCents) / 100)),
                    "/",
                    ((_l = app.product) === null || _l === void 0 ? void 0 : _l.billingIntervalType) == "YEAR" ? "yr" : "mo");
            }
            priceEl = React.createElement("b", { className: "price-details__product-price" },
                React.createElement("span", { "test-id": "cart_product_name" }, buildProductName(app)),
                ",\u00A0",
                priceSuffix);
        }
        return React.createElement("div", { className: classNames.join(" ") },
            React.createElement("div", { className: "price-details__your-plan" }, yourPlanDetailsEl),
            priceEl,
            !app.isCollegePackageProduct && !app.form.isEureka && React.createElement("br", null),
            React.createElement(TaxLineItemsView, { app: app }));
    });
    var TaxLineItemsView = (0, mobx_react_1.observer)(function (_a) {
        var _b, _c, _d, _e, _f, _g, _h;
        var app = _a.app;
        var regData = app.registrationData;
        var className = app.isCollegePackageProduct
            ? "mobile-tax-line-item mobile-tax-line-item--college-package"
            : "mobile-tax-line-item";
        var plusTaxIfApplicable = React.createElement("span", { className: "must-be-grey-very-important" }, " (+ tax if applicable)");
        var contents;
        if (regData.hasSelectedPaidTrial) {
            contents = React.createElement("span", null);
        }
        else if (app.referred) {
            contents = React.createElement(React.Fragment, null,
                React.createElement("span", null,
                    React.createElement("span", { className: "must-be-grey-very-important" }, "Just\u00A0")),
                React.createElement("span", { className: "must-be-grey-very-important" },
                    (0, react_study_helpers_1.currency)(app.remspectPriceWithReferralDiscountCents((_b = app.product) === null || _b === void 0 ? void 0 : _b.key) / 100 / (30 * ((_c = app.product) === null || _c === void 0 ? void 0 : _c.billingIntervalCount))),
                    " / day"));
        }
        else if (app.coupon) {
            contents = React.createElement("span", null,
                React.createElement("span", { className: "must-be-grey-very-important" }, "Just\u00A0"),
                React.createElement("span", { className: "must-be-grey-very-important" }, (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100 / (((_d = app.product) === null || _d === void 0 ? void 0 : _d.billingIntervalType) == "YEAR" ? 365 : 30 * ((_e = app.product) === null || _e === void 0 ? void 0 : _e.billingIntervalCount)))),
                React.createElement("span", { className: "must-be-grey-very-important" }, " / day"));
        }
        else {
            contents = React.createElement("span", null,
                React.createElement("span", { className: "must-be-grey-very-important" }, "Just\u00A0"),
                React.createElement("span", { className: "must-be-grey-very-important" }, (0, react_study_helpers_1.currency)(((_f = app.product) === null || _f === void 0 ? void 0 : _f.remspectPriceCents) / 100 / (((_g = app.product) === null || _g === void 0 ? void 0 : _g.billingIntervalType) == "YEAR" ? 365 : 30 * ((_h = app.product) === null || _h === void 0 ? void 0 : _h.billingIntervalCount)))),
                React.createElement("span", { className: "must-be-grey-very-important" }, " / day"));
        }
        return React.createElement("em", { className: className, "test-id": "tax_line_item", "data-cname": "tax_line_item", "data-track-visible": true },
            contents,
            plusTaxIfApplicable);
    });
    var getCouponDuration = function (coupon) {
        if (coupon.duration === "ONCE") {
            return "your first month";
        }
        if (coupon.durationInMonths === 1) {
            return "your first month";
        }
        return "your first ".concat(coupon.durationInMonths, " months");
    };
    var isCouponValid = function (coupon) {
        return (!!coupon.amountOffCents || !!coupon.percentOff) && (coupon.duration === "ONCE" || !!coupon.durationInMonths);
    };
    var CXOfferView = (0, mobx_react_1.observer)(function (props) {
        var _a, _b;
        var app = props.app;
        var getCouponAmount = function (coupon) {
            if (coupon.amountOffCents) {
                return (0, react_study_helpers_1.currency)(coupon.amountOffCents / 100) + " off";
            }
            if (coupon.percentOff) {
                return coupon.percentOff + "% off";
            }
            return null;
        };
        var showingStudyOffer = app.prefillCouponCode && app.coupon && isCouponValid(app.coupon);
        var showingUniversityOffer = !!((_a = app.admissionsLandingPage) === null || _a === void 0 ? void 0 : _a.specialOffer);
        if (!showingStudyOffer && !showingUniversityOffer) {
            return null;
        }
        var cxStudyOfferLabel = showingStudyOffer && showingUniversityOffer ? "Study.com discount" : "Your offer";
        var cxStudyOfferPillClasses = ["cx-offer__pill"];
        if (showingStudyOffer && showingUniversityOffer) {
            cxStudyOfferPillClasses.push("cx-offer__pill--bottom-margin");
        }
        var extraConsumableFeatureCountPerMonth = 0;
        if (((_b = app.coupon) === null || _b === void 0 ? void 0 : _b.consumableFeatureCountPerMonth) != null) {
            var defaultConsumableFeatureCountPerMonth = 2;
            extraConsumableFeatureCountPerMonth = app.coupon.consumableFeatureCountPerMonth - defaultConsumableFeatureCountPerMonth;
        }
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "cx-offer" },
                !app.adkey &&
                    React.createElement(React.Fragment, null,
                        showingStudyOffer && showingUniversityOffer && React.createElement("div", { className: "cx-offer__heading" }, "Your offers"),
                        showingStudyOffer && React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "cx-offer__label" }, cxStudyOfferLabel),
                            React.createElement("div", { className: cxStudyOfferPillClasses.join(" ") },
                                getCouponAmount(app.coupon),
                                " ",
                                getCouponDuration(app.coupon)),
                            extraConsumableFeatureCountPerMonth > 0 && React.createElement("div", { className: "cx-offer__pill cx-offer__pill--top-margin" },
                                extraConsumableFeatureCountPerMonth,
                                " extra courses for ",
                                getCouponDuration(app.coupon))),
                        showingUniversityOffer && React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "cx-offer__label" }, app.admissionsLandingPage.company.name),
                            React.createElement("div", { className: "cx-offer__pill" }, app.admissionsLandingPage.specialOffer))),
                app.adkey &&
                    React.createElement(React.Fragment, null, showingUniversityOffer && React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "cx-offer__label" },
                            "Special ",
                            app.admissionsLandingPage.company.name,
                            " Offer"),
                        React.createElement("div", { className: "cx-offer__pill" }, app.admissionsLandingPage.specialOffer)))));
    });
    var EmphasizeCoupon = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        return React.createElement("div", { className: "price-box__item" },
            React.createElement("span", { className: "price-box__item--orange price-box__item--strong" },
                "Best offer applied",
                React.createElement("br", null),
                app.coupon.durationInMonths && React.createElement("small", { className: "price-box__item--faded", "data-cname": "reg_form_discount_duration", "test-id": "reg_form_discount_duration" },
                    "For ",
                    React.createElement("span", null, app.coupon.durationInMonths),
                    " month",
                    app.coupon.durationInMonths > 1 && "s")),
            app.coupon.percentOff && React.createElement("span", { className: "price-box__item--orange price-box__item--bold", "data-cname": "reg_form_discount_percentage", "test-id": "reg_form_discount_percentage" },
                "Save ",
                app.coupon.percentOff,
                "%"),
            app.coupon.amountOffCents && React.createElement("span", { className: "price-box__item--orange price-box__item--bold", "data-cname": "reg_form_amount_off_dollar", "test-id": "reg_form_amount_off_dollar" },
                "Save ",
                (0, react_study_helpers_1.currency)(app.coupon.amountOffCents / 100)),
            React.createElement(exports.ProductDuration, { app: app }));
    });
    var EmphasizeCouponMobile = (0, mobx_react_1.observer)(function (props) {
        var app = props.app;
        var couponDurationText = getCouponDuration(app.coupon);
        return React.createElement("div", { className: "price-box__item" },
            React.createElement("span", { className: "price-box__item--strong" },
                "Best offer applied",
                React.createElement("br", null)),
            app.coupon.percentOff && React.createElement("span", { className: "price-box__item--orange price-box__item--bold", "data-cname": "reg_form_discount_percentage", "test-id": "reg_form_discount_percentage" },
                "Save ",
                app.coupon.percentOff,
                "% ",
                couponDurationText,
                " "),
            app.coupon.amountOffCents && React.createElement("span", { className: "price-box__item--orange price-box__item--bold", "data-cname": "reg_form_amount_off_dollar", "test-id": "reg_form_amount_off_dollar" },
                "Save ",
                (0, react_study_helpers_1.currency)(app.coupon.amountOffCents / 100),
                " ",
                couponDurationText));
    });
    exports.ProductDuration = (0, mobx_react_1.observer)(function (props) {
        var _a, _b, _c, _d;
        var app = props.app;
        var isOnCartPage = app.form.currentPage === app.form.lastPage;
        var inCXCartSwitchVariation = (0, RegProductModalSwitcher_1.shouldRenderCXProductModalSwitcherOnCart)(app, isOnCartPage, (_a = app.regMetadata) === null || _a === void 0 ? void 0 : _a.productKeyOverride);
        var monthText = inCXCartSwitchVariation ? "month" : "mo";
        if (((_b = app.product) === null || _b === void 0 ? void 0 : _b.billingIntervalType) === "YEAR") {
            return React.createElement("span", { className: props.spanClassName }, "/yr");
        }
        else {
            return React.createElement("span", { className: props.spanClassName },
                "/",
                ((_c = app.product) === null || _c === void 0 ? void 0 : _c.billingIntervalCount) > 1 && React.createElement("span", null, ((_d = app.product) === null || _d === void 0 ? void 0 : _d.billingIntervalCount)
                    + " "),
                monthText);
        }
    });
    exports.NonInstitutionPriceBox = (0, mobx_react_1.observer)((function (_super) {
        __extends(_NonInstitutionPriceBox, _super);
        function _NonInstitutionPriceBox(props) {
            return _super.call(this, props) || this;
        }
        Object.defineProperty(_NonInstitutionPriceBox.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15;
                var app = this.props.app;
                var regData = app.registrationData;
                var product = ((_a = app.regMetadata) === null || _a === void 0 ? void 0 : _a.product) || "";
                var isOnCartPage = app.form.currentPage === app.form.lastPage;
                var inCXCartSwitchVariation = (0, RegProductModalSwitcher_1.shouldRenderCXProductModalSwitcherOnCart)(app, isOnCartPage, (_b = app.regMetadata) === null || _b === void 0 ? void 0 : _b.productKeyOverride);
                var tooltipIcon = remspect.isControl("regFormRebrand") ? React.createElement("span", { className: "icon-question-sign tip" }) : React.createElement(eureka_design_system_1.MaterialIcon, { filename: "icon-question-filled-20.svg" });
                var cartProductPromotionContents;
                if (app.isInHighIntentSinglePageCheckoutAnyVariation) {
                    cartProductPromotionContents = React.createElement(React.Fragment, null,
                        React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-check-circle-filled-20.svg", className: "icon-checkmark" }),
                        React.createElement("span", null,
                            React.createElement(marketing_1.MoneyBackGuaranteeLanguage, null),
                            "\u00A0"));
                }
                else if (remspect.isVariation("passGuarantee", "mbg") && TestPrepConstants_1.PASS_OR_FAIL_EXAM_NAMES.indexOf(product) != -1) {
                    cartProductPromotionContents = React.createElement(React.Fragment, null,
                        React.createElement("span", { className: "money-back-guarantee-promotion" }, "Money-back guarantee"),
                        "\u00A0",
                        React.createElement(ReactRegPage_app_1.RegFormTooltip, { content: "Score 80%+ on a Study.com full-length Practice Test and pass your real exam or get 2 months of membership costs back.", cname: "cart_money_back_guarantee" }, tooltipIcon));
                }
                else if (remspect.isVariation("passGuarantee", "pg") && TestPrepConstants_1.PASS_OR_FAIL_EXAM_NAMES.indexOf(product) != -1) {
                    cartProductPromotionContents = React.createElement(React.Fragment, null,
                        React.createElement("span", { className: "money-back-guarantee-promotion" }, "Pass guarantee"),
                        "\u00A0",
                        React.createElement(ReactRegPage_app_1.RegFormTooltip, { cname: "cart_money_back_guarantee", content: "Score 80%+ on a Study.com full-length Practice Test and pass your real exam or get an additional 2 months free of charge to prepare for another try." }, tooltipIcon));
                }
                else {
                    cartProductPromotionContents = React.createElement(React.Fragment, null,
                        React.createElement(marketing_1.MoneyBackGuaranteeLanguage, { forIntroPlan: app.shouldOfferTestPrepTwoWeekPlan }),
                        "\u00A0",
                        React.createElement(ReactRegPage_app_1.RegFormTooltip, { content: React.createElement(React.Fragment, null,
                                "If within ",
                                React.createElement(marketing_1.RiskFreeDays, { forIntroPlan: app.shouldOfferTestPrepTwoWeekPlan }),
                                " days you are not satisfied, we will refund your money."), cname: "cart_money_back_guarantee" }, tooltipIcon));
                }
                var priceBoxClass = "price-box";
                if (app.shouldOfferTestPrepTwoWeekPlan) {
                    priceBoxClass += " price-box--margin";
                }
                var shouldShowCartProductPromotionContents = app.shouldOfferTestPrepTwoWeekPlan || !app.paidTrialMessagingEligible;
                if (app.isCollegePackageProduct) {
                    shouldShowCartProductPromotionContents = false;
                }
                var priceBoxItemClassNames = ["price-box__item"];
                if (app.isCollegePackageProduct && !inCXCartSwitchVariation) {
                    priceBoxItemClassNames.push("price-box__item--semibold price-box__item--larger-price");
                }
                var dateFormat = (0, RegProductModalSwitcher_1.inCXCartSwitchMobileV2Variation)() ? PAID_TRIAL_DATE_FORMAT_NO_YEAR : PAID_TRIAL_DATE_FORMAT;
                return React.createElement(React.Fragment, null,
                    showingCXOffer(app) &&
                        React.createElement(CXOfferView, { app: app }),
                    shouldShowCartProductPromotionContents && React.createElement("div", { className: "cart-product__promotion" }, cartProductPromotionContents),
                    React.createElement("div", { className: priceBoxClass },
                        regData.wantsFamilyPlan && React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "price-box__item" },
                                React.createElement("span", null, "Admin Account"),
                                React.createElement("span", { "test-id": "reg_form_parent_product_price" }, "$0"),
                                React.createElement("span", { className: "billing-interval" }, "/mo")),
                            React.createElement("div", { className: "price-box__item" },
                                React.createElement("span", null, (_c = app.product) === null || _c === void 0 ? void 0 : _c.displayName),
                                React.createElement("span", { "data-price": (0, react_study_helpers_1.currency)(((_d = app.product) === null || _d === void 0 ? void 0 : _d.remspectPriceCents) / 100), "test-id": "reg_form_child_product_price" }, (0, react_study_helpers_1.currency)(((_e = app.product) === null || _e === void 0 ? void 0 : _e.remspectPriceCents) / 100)),
                                React.createElement(exports.ProductDuration, { app: app, spanClassName: "price-box__item--smaller" }))),
                        app.paidTrialMessagingEligible && !app.referred && React.createElement("div", { className: "price-box__paid-trial-container" },
                            !app.shouldOfferTestPrepTwoWeekPlan &&
                                React.createElement("div", { className: "price-box__item price-box__item-starting price-box__item--border" },
                                    React.createElement("span", { className: "billing-starting-date", "test-id": "billing_starting_date" },
                                        "Starting\u00A0",
                                        React.createElement("span", { "test-id": "paid_trial_start_date" }, app.endTrialDate.format(dateFormat))),
                                    React.createElement("span", null),
                                    !app.regMetadata.hasSelectedPaidTrial && !app.coupon && React.createElement("span", { className: "price-box__price", "data-price": (0, react_study_helpers_1.currency)(((_f = app.product) === null || _f === void 0 ? void 0 : _f.remspectPriceCents) / 100), "test-id": "reg_form_current_product_price" }, (0, react_study_helpers_1.currency)(((_g = app.product) === null || _g === void 0 ? void 0 : _g.remspectPriceCents) / 100)),
                                    app.regMetadata.hasSelectedPaidTrial && React.createElement("span", { className: "price-box__price", "data-price": app.paidTrialPrice, "test-id": "reg_form_current_product_price" }, app.paidTrialPrice),
                                    !app.regMetadata.hasSelectedPaidTrial && app.coupon && React.createElement("span", { className: "price-box__price", "data-price": (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100), "test-id": "reg_form_current_product_price" }, (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100))),
                            React.createElement(PaidTrialToggles, __assign({}, this.props))),
                        (app.coupon || app.referred) && !regData.wantsFamilyPlan && !app.paidTrialMessagingEligible && React.createElement("div", { className: priceBoxItemClassNames.join(" ") },
                            React.createElement("span", null, "Original Price"),
                            React.createElement("span", { "data-price": (0, react_study_helpers_1.currency)(((_h = app.product) === null || _h === void 0 ? void 0 : _h.remspectPriceCents) / 100), "test-id": "original_price" }, (0, react_study_helpers_1.currency)(((_j = app.product) === null || _j === void 0 ? void 0 : _j.remspectPriceCents) / 100)),
                            React.createElement(exports.ProductDuration, { app: app })),
                        app.coupon && !app.paidTrialMessagingEligible && !app.adkey && React.createElement("div", { className: priceBoxItemClassNames.join(" ") },
                            React.createElement("span", null,
                                "Discount",
                                React.createElement("br", null),
                                app.coupon.durationInMonths && React.createElement("small", { className: "price-box__item--faded", "data-cname": "reg_form_discount_duration", "test-id": "reg_form_discount_duration" },
                                    "For ",
                                    React.createElement("span", null, app.coupon.durationInMonths),
                                    " month",
                                    app.coupon.durationInMonths > 1 && "s")),
                            app.coupon.percentOff && React.createElement("span", { "data-cname": "reg_form_discount_percentage", "test-id": "reg_form_discount_percentage" },
                                "\u2212\u00A0",
                                app.coupon.percentOff,
                                "%"),
                            !app.coupon.percentOff && React.createElement("span", { "data-cname": "reg_form_amount_off_percentage", "test-id": "reg_form_amount_off_percentage" },
                                "\u2212\u00A0",
                                (0, react_study_helpers_1.currency)(app.coupon.amountOffCents / 100)),
                            React.createElement(exports.ProductDuration, { app: app })),
                        showingEmphasizeCoupon(app) &&
                            React.createElement(EmphasizeCoupon, { app: app }),
                        app.referred && React.createElement("div", { className: priceBoxItemClassNames.join(" ") },
                            React.createElement("span", null,
                                "Referral Credit",
                                React.createElement("br", null)),
                            React.createElement("span", { "data-cname": "reg_form_amount_off_percentage", "test-id": "reg_form_amount_off_percentage" },
                                "\u2212\u00A0",
                                (0, react_study_helpers_1.currency)(app.referralDiscountCents((_k = app.product) === null || _k === void 0 ? void 0 : _k.key) / 100)),
                            React.createElement("span", null)),
                        ((_l = app.product) === null || _l === void 0 ? void 0 : _l.billingIntervalType) === "MONTH" && !app.paidTrialMessagingEligible && React.createElement("div", { className: priceBoxItemClassNames.join(" ") },
                            React.createElement("span", { className: (app.coupon || app.referred) ? "price-box__item--strong price-box__item--larger" : "" },
                                React.createElement("span", null, (app.coupon || app.referred) ? "Price " : "Starting "),
                                !regData.hasSelectedPaidTrial && !app.coupon && React.createElement("span", { "test-id": "start_date" }, app.endTrialDate
                                    .format(dateFormat)),
                                regData.hasSelectedPaidTrial && React.createElement("span", { "test-id": "start_date" }, app.endPaidTrialDate.format(dateFormat))),
                            !app.referred && !app.coupon && React.createElement("span", { className: "billing-price", "data-price": (0, react_study_helpers_1.currency)(((_m = app.product) === null || _m === void 0 ? void 0 : _m.remspectPriceCents) / 100), "test-id": "reg_form_current_product_price" }, (0, react_study_helpers_1.currency)(((_o = app.product) === null || _o === void 0 ? void 0 : _o.remspectPriceCents) / 100)),
                            !app.referred && app.coupon && app.adkey && React.createElement("span", { className: "billing-price--previous", "data-price": (0, react_study_helpers_1.currency)(((_p = app.product) === null || _p === void 0 ? void 0 : _p.remspectPriceCents) / 100), "test-id": "reg_form_previous_product_price" },
                                React.createElement("s", null, (0, react_study_helpers_1.currency)(((_q = app.product) === null || _q === void 0 ? void 0 : _q.remspectPriceCents) / 100)),
                                "\u00A0"),
                            !app.referred && app.coupon && React.createElement("span", { className: "billing-price price-box__item--strong price-box__item--larger ".concat(!inCXCartSwitchVariation ? "price-box__item--font-serif" : ""), "test-id": "reg_form_current_product_price" }, (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100)),
                            app.referred && React.createElement("span", { className: "price-box__item--strong billing-price price-box__item--strong price-box__item--larger ".concat(!inCXCartSwitchVariation ? "price-box__item--font-serif" : ""), "test-id": "reg_form_current_product_price" }, (0, react_study_helpers_1.currency)(app.remspectPriceWithReferralDiscountCents((_r = app.product) === null || _r === void 0 ? void 0 : _r.key) / 100)),
                            app.isCollegePackageProduct && React.createElement("span", { className: "billing-interval billing-interval--college-package" },
                                "/",
                                ((_s = app.product) === null || _s === void 0 ? void 0 : _s.billingIntervalCount) > 1 && React.createElement("span", null, ((_t = app.product) === null || _t === void 0 ? void 0 : _t.billingIntervalCount) + " "),
                                "month"),
                            !app.isCollegePackageProduct && React.createElement("span", { className: "billing-interval" },
                                "/",
                                ((_u = app.product) === null || _u === void 0 ? void 0 : _u.billingIntervalCount) > 1 && React.createElement("span", null, ((_v = app.product) === null || _v === void 0 ? void 0 : _v.billingIntervalCount) + " "),
                                "mo")),
                        !app.paidTrialMessagingEligible && ((_w = app.product) === null || _w === void 0 ? void 0 : _w.billingIntervalType) === "MONTH" &&
                            React.createElement("div", { className: "price-box__item price-box__item--smaller price-box__item--faded price-box__item--taxParent\n\t\t\t\t \t".concat(app.isCollegePackageProduct ? "price-box__item--no-padding" : "") },
                                React.createElement("span", null, "Just\u00A0"),
                                !app.referred && !app.coupon && React.createElement("span", { className: "price-box__item--faded" }, (0, react_study_helpers_1.currency)(((_x = app.product) === null || _x === void 0 ? void 0 : _x.remspectPriceCents) / 100 / (30 * ((_y = app.product) === null || _y === void 0 ? void 0 : _y.billingIntervalCount)))),
                                !app.referred && app.coupon && React.createElement("span", { className: "price-box__item--faded" }, (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100 / (30 * ((_z = app.product) === null || _z === void 0 ? void 0 : _z.billingIntervalCount)))),
                                app.referred && React.createElement("span", { className: "price-box__item--faded" }, (0, react_study_helpers_1.currency)(app.remspectPriceWithReferralDiscountCents((_0 = app.product) === null || _0 === void 0 ? void 0 : _0.key) / 100 / (30 * ((_1 = app.product) === null || _1 === void 0 ? void 0 : _1.billingIntervalCount)))),
                                React.createElement("span", { "data-cname": "per_day", "data-track-visible": true }, "/day"),
                                React.createElement("span", { className: "price-box__item--tax", "data-cname": "tax_line_item", "data-track-visible": true, "test-id": "tax_line_item" },
                                    app.isInHighIntentSinglePageCheckoutAnyVariation && " (+tax if applicable)",
                                    !app.isInHighIntentSinglePageCheckoutAnyVariation && " (+ tax if applicable)")),
                        app.paidTrialMessagingEligible && ((_2 = app.product) === null || _2 === void 0 ? void 0 : _2.billingIntervalType) === "MONTH" && !app.shouldOfferTestPrepTwoWeekPlan && React.createElement("div", { className: "price-box__item price-box__item--smaller price-box__item--faded price-box__item--taxParent" },
                            React.createElement("span", null),
                            React.createElement("span", { className: "price-box__item--tax", "data-cname": "tax_line_item", "data-track-visible": true, "test-id": "tax_line_item" }, "(+ tax if applicable)")),
                        !app.coupon && !app.referred && ((_3 = app.product) === null || _3 === void 0 ? void 0 : _3.billingIntervalType) === "YEAR" && app.relatedMonthlyProduct && React.createElement("div", { className: "price-box__item price-box__item--emphasis" },
                            React.createElement("span", { className: "price-box__item--smaller", "test-id": "monthly_savings_message" },
                                "Save ",
                                Math.round(100 * (1 - (((_4 = app.product) === null || _4 === void 0 ? void 0 : _4.discountPriceCents) / (12 * app.relatedMonthlyProduct.remspectPriceCents)))),
                                "% off monthly plan"),
                            React.createElement("span", { "test-id": "monthly_price" }, (0, react_study_helpers_1.currency)(app.relatedMonthlyProduct.remspectPriceCents / 100)),
                            React.createElement("span", null, "/mo")),
                        ((_5 = app.product) === null || _5 === void 0 ? void 0 : _5.billingIntervalType) === "YEAR" && TEST_PREP_6_MONTHS_ONLY_PLANS.indexOf((_6 = app.product) === null || _6 === void 0 ? void 0 : _6.key) < 0 &&
                            React.createElement("div", { className: "price-box__item ".concat(!remspect.isControl("regFormRebrand") && "price-box__item--faded") },
                                React.createElement("span", null),
                                React.createElement("span", null,
                                    React.createElement("span", { className: "price-box__item--faded" }, "Just\u00A0"),
                                    !app.referred && !app.coupon && React.createElement("span", null, (0, react_study_helpers_1.currency)(((_7 = app.product) === null || _7 === void 0 ? void 0 : _7.discountPriceCents) / 12 / 100)),
                                    !app.referred && app.coupon && React.createElement("span", null, (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 12 / 100)),
                                    app.referred && React.createElement("span", null, (0, react_study_helpers_1.currency)(app.remspectPriceWithReferralDiscountCents((_8 = app.product) === null || _8 === void 0 ? void 0 : _8.key) / 12 / 100))),
                                React.createElement("span", null, "/mo"),
                                React.createElement("span", { className: "price-box__item--tax", "data-cname": "tax_line_item", "data-track-visible": true, "test-id": "tax_line_item" }, "(+ tax if applicable)")),
                        ((_9 = app.product) === null || _9 === void 0 ? void 0 : _9.billingIntervalType) === "YEAR" && React.createElement("div", { className: "price-box__item price-box__item--dark-teal price-box__item--total-price" },
                            React.createElement("span", { className: "price-box__item--price-annual" }, "Price"),
                            React.createElement("span", { className: "price-box__item--price-annual", "test-id": "reg_form_current_product_price" },
                                !app.referred && !app.coupon && React.createElement("span", { "data-price": (0, react_study_helpers_1.currency)(((_10 = app.product) === null || _10 === void 0 ? void 0 : _10.discountPriceCents) / 100) }, (0, react_study_helpers_1.currency)(((_11 = app.product) === null || _11 === void 0 ? void 0 : _11.discountPriceCents) / 100)),
                                !app.referred && app.coupon && React.createElement("span", { "data-price": (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100), className: "price-box__item--strong price-box__item--larger ".concat(!inCXCartSwitchVariation ? "price-box__item--font-serif" : "") }, (0, react_study_helpers_1.currency)(app.coupon.discountPriceCents / 100)),
                                app.referred && React.createElement("span", { "data-price": (0, react_study_helpers_1.currency)(app.remspectPriceWithReferralDiscountCents((_12 = app.product) === null || _12 === void 0 ? void 0 : _12.key) / 100), className: "price-box__item--strong price-box__item--larger ".concat(!inCXCartSwitchVariation ? "price-box__item--font-serif" : "") }, (0, react_study_helpers_1.currency)(app.remspectPriceWithReferralDiscountCents((_13 = app.product) === null || _13 === void 0 ? void 0 : _13.key) / 100))),
                            TEST_PREP_6_MONTHS_ONLY_PLANS.indexOf((_14 = app.product) === null || _14 === void 0 ? void 0 : _14.key) < 0 && React.createElement("span", { className: "price-box__item--dark-teal" }, "/yr"),
                            TEST_PREP_6_MONTHS_ONLY_PLANS.indexOf((_15 = app.product) === null || _15 === void 0 ? void 0 : _15.key) > -1 && React.createElement("span", { className: "price-box__item--empty", style: { minWidth: 0 } })),
                        inCXCartSwitchVariation && React.createElement("div", { className: "cart-money-back-guarantee" },
                            React.createElement(marketing_1.MoneyBackGuaranteeLanguage, null),
                            "\u00A0",
                            React.createElement(ReactRegPage_app_1.RegFormTooltip, { content: React.createElement(React.Fragment, null,
                                    "If within ",
                                    React.createElement(marketing_1.RiskFreeDays, null),
                                    " days you are not satisfied, we will refund your money."), cname: "cart_money_back_guarantee" },
                                React.createElement("span", { className: "cart-money-back-guarantee__icon" })))));
            }
        });
        return _NonInstitutionPriceBox;
    }(React.Component)));
    var AnnualToggle = (0, mobx_react_1.observer)((function (_super) {
        __extends(_AnnualToggle, _super);
        function _AnnualToggle(props) {
            return _super.call(this, props) || this;
        }
        Object.defineProperty(_AnnualToggle.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var app = this.props.app;
                { }
                return React.createElement(React.Fragment, null,
                    React.createElement("hr", { className: "cart-hr" }),
                    React.createElement("div", { className: "billing-term-options" },
                        React.createElement("div", { className: "billing-term-options__item" },
                            React.createElement("label", { className: "btn ".concat(app.regMetadata.currentProductBillingTerm === "ANNUAL" ? "active" : ""), "data-cname": "billing-controls-1-annual-btn", "test-id": "billing-controls-1-annual-btn" },
                                React.createElement("input", { type: "radio", checked: app.regMetadata.currentProductBillingTerm === "ANNUAL", onClick: (0, mobx_1.action)(function () {
                                        app.setBillingTerm("ANNUAL");
                                    }), value: "ANNUAL", readOnly: true }),
                                React.createElement("div", { className: "btn__text" },
                                    "Annual ",
                                    React.createElement("span", { className: "btn__text__desktop" }, "Billing")))),
                        React.createElement("div", { className: "billing-term-options__item" },
                            React.createElement("label", { className: "btn ".concat(app.regMetadata.currentProductBillingTerm === "MONTHLY" ? "active" : ""), "data-cname": "billing-controls-1-monthly-btn", "test-id": "billing-controls-1-monthly-btn" },
                                React.createElement("input", { type: "radio", checked: app.regMetadata.currentProductBillingTerm === "MONTHLY", onClick: (0, mobx_1.action)(function () {
                                        app.setBillingTerm("MONTHLY");
                                    }), value: "MONTHLY", readOnly: true }),
                                React.createElement("div", { className: "btn__text" },
                                    "Monthly ",
                                    React.createElement("span", { className: "btn__text__desktop" }, "Billing"))))));
            }
        });
        return _AnnualToggle;
    }(React.Component)));
});

//# sourceMappingURL=RegSidebarViews.js.map

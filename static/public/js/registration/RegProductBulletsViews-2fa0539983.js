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
define(["require", "exports", "@sites-study-com/marketing-constants", "components/CollapsibleAutoSizeComponent", "mobx-react", "react", "registration/reg-form/reg-form-utils", "testPrep/TestPrepConstants", "@sites-study-com/remspect"], function (require, exports, Marketing, CollapsibleAutoSizeComponent_1, mobx_react_1, React, reg_form_utils_1, TestPrepConstants_1, remspect) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getProductNameForBulletText = exports.getProductDisplayName = exports.MobileProductBullets = exports.ProductBulletsView = exports.getBullets = exports.getBulletsNovember = void 0;
    var getBulletsNovember = function () {
        return [
            React.createElement(React.Fragment, null, "Practice tests with strength and weakness assessments"),
            React.createElement(React.Fragment, null, "Comprehensive access to video lessons"),
            React.createElement(React.Fragment, null, "Unlimited practice questions"),
            React.createElement(React.Fragment, null, "24/7 chat-based tutoring"),
            React.createElement(React.Fragment, null, "Test-taking strategies and study guides")
        ];
    };
    exports.getBulletsNovember = getBulletsNovember;
    var getBullets = function (app, isMobile) {
        var _a;
        var institutionName = (_a = app.product) === null || _a === void 0 ? void 0 : _a.institutionName;
        var textIdentifier = new reg_form_utils_1.ProductBulletUtil(app.registrationData).calculateProductBulletTextIdentifierForProduct();
        if (institutionName) {
            return null;
        }
        if (!textIdentifier) {
            return null;
        }
        var bulletTextProductName = (0, exports.getProductNameForBulletText)(app.registrationData);
        var productDisplayName = (0, exports.getProductDisplayName)(app.registrationData);
        var hasSelectedPaidTrial = app.registrationData.hasSelectedPaidTrial;
        var productKey = app.registrationData.product;
        var spanForDesktop = function (text) { return !isMobile ? React.createElement("span", null, text) : text; };
        var BULLETS = {
            'new-student-expert-product-bullets': [
                React.createElement(React.Fragment, null,
                    "Step-by-step solutions to over ",
                    spanForDesktop(Marketing.studyAnswersCount + '+'),
                    " practice problems'"),
                React.createElement(React.Fragment, null, "24/7 expert help with any question if you get stuck"),
                React.createElement(React.Fragment, null, "An engaging video lesson on each Study Answer to improve your understanding"),
                React.createElement(React.Fragment, null, "Free mobile app to help you study anywhere, anytime"),
            ],
            'tutoring-reg-bullets': [
                React.createElement(React.Fragment, null, "Personalized, step-by-step feedback and answers for any question"),
                React.createElement(React.Fragment, null, "Flexible and stress-free tutoring options: chat live, schedule for later, or send a message"),
                React.createElement(React.Fragment, null, "Unlimited access to millions of homework questions and answers"),
                React.createElement(React.Fragment, null, "Access to all premium features on Study.com, including practice tests, video lessons, and more"),
            ],
            'new-student-other-basic-bullets': [
                React.createElement(React.Fragment, null,
                    "Over ",
                    spanForDesktop(Marketing.lessonCount),
                    " video and text lessons covering all subjects and grade levels"),
                React.createElement(React.Fragment, null,
                    "Step-by-step solutions to ",
                    spanForDesktop(Marketing.studyAnswersCount + '+'),
                    " practice problems"),
                React.createElement(React.Fragment, null, "24/7 expert help with any question if you get stuck"),
                React.createElement(React.Fragment, null, "Free mobile app to help you study anywhere, anytime"),
            ],
            'classroom-teacher-product-bullets': [
                React.createElement(React.Fragment, null,
                    spanForDesktop(Marketing.videoLessonCount),
                    " streaming videos to use in the classroom"),
                React.createElement(React.Fragment, null,
                    spanForDesktop(Marketing.teacherResourcesCount),
                    " rich lesson plans, activities, games, project ideas, and more to supplement your lessons"),
                React.createElement(React.Fragment, null,
                    spanForDesktop(Marketing.englishLanguageLearnerResources),
                    " English Language Learner Resources"),
                React.createElement(React.Fragment, null, "Create classrooms and assign homework, lessons or quizzes to your students"),
                React.createElement(React.Fragment, null, "Google Single Sign On"),
                React.createElement(React.Fragment, null, "Printable invoices"),
                React.createElement(React.Fragment, null, "Download videos"),
                React.createElement(React.Fragment, null, "Mobile app"),
            ],
            'teacher-product-bullets': [
                React.createElement(React.Fragment, null,
                    spanForDesktop(Marketing.videoLessonCount),
                    " streaming videos to use in the classroom"),
                React.createElement(React.Fragment, null,
                    spanForDesktop(Marketing.teacherResourcesCount),
                    " rich lesson plans, activities, games, project ideas, and more to supplement your lessons"),
                React.createElement(React.Fragment, null,
                    spanForDesktop(Marketing.englishLanguageLearnerResources),
                    " English Language Learner Resources"),
                React.createElement(React.Fragment, null, "Create classrooms and assign homework, lessons or quizzes to your students"),
                React.createElement(React.Fragment, null, "Google Single Sign On"),
                React.createElement(React.Fragment, null, "Printable invoices"),
                React.createElement(React.Fragment, null, "Download videos"),
                React.createElement(React.Fragment, null, "Mobile app"),
            ],
            'homeschool-product-bullets': [
                React.createElement(React.Fragment, null, "Comprehensive core subject and grade levels"),
                React.createElement(React.Fragment, null,
                    spanForDesktop(Marketing.videoLessonCount + '+'),
                    " short, interactive video lessons"),
                React.createElement(React.Fragment, null, "AP, CLEP, & remedial courses"),
                React.createElement(React.Fragment, null, "Quizzes and tests with automatic grading"),
                React.createElement(React.Fragment, null, "Flashcards and transcripts for review"),
                React.createElement(React.Fragment, null, "Mobile app with downloadable lessons"),
                React.createElement(React.Fragment, null, "On-demand help from expert instructors"),
                React.createElement(React.Fragment, null, "Complex subjects (like calculus) made easy"),
                React.createElement(React.Fragment, null, "Detailed goal tracking and progress reporting"),
                React.createElement(React.Fragment, null, "Certificates of Completion"),
                React.createElement(React.Fragment, null,
                    "Used by over ",
                    spanForDesktop(Marketing.parentCount),
                    " families"),
            ],
            'family-plan-product-bullets': [
                React.createElement(React.Fragment, null, "Free parent account. Oversee one or more separate student accountsFree parent account. Oversee one or more separate student accounts"),
                React.createElement(React.Fragment, null,
                    "One student ",
                    spanForDesktop(productDisplayName),
                    " account. Add additional accounts after sign up"),
                React.createElement(React.Fragment, null, "Easily view each student's lesson progress and quiz scores"),
                React.createElement(React.Fragment, null, "Enroll individual students in courses and set study goals"),
                React.createElement(React.Fragment, null, "Document course completion"),
                React.createElement(React.Fragment, null, "Receive weekly status updates in email")
            ],
            'college-package-reg-bullets': getCollegePackageProductBullets(productKey, isMobile),
            'cx-reg-bullets': [
                React.createElement(React.Fragment, null,
                    "Earn transferrable credits for ",
                    spanForDesktop(Marketing.transferableSchoolCount + '+'),
                    " colleges"),
                React.createElement(React.Fragment, null,
                    "Expanded library of ",
                    spanForDesktop(Marketing.aceCourseCount + '+'),
                    " upper & lower-division courses"),
                React.createElement(React.Fragment, null, "Coaching assistance for degree and course planning"),
                React.createElement(React.Fragment, null, "Short, animated video lessons and quizzes"),
                React.createElement(React.Fragment, null, "Course progress tracking and scheduling"),
                React.createElement(React.Fragment, null, "Study anytime, anywhere! Access your courses from a desktop or mobile device"),
                React.createElement(React.Fragment, null, "Flexible monthly plan you can stop and start anytime"),
            ]
        };
        if (!BULLETS[textIdentifier]) {
            return null;
        }
        return BULLETS[textIdentifier].filter(function (item) { return item !== null; });
    };
    exports.getBullets = getBullets;
    var ProductBulletWithTitle = function (_a) {
        var title = _a.title, text = _a.text;
        return (React.createElement("div", { className: "cart-product__bullet--with-title" },
            React.createElement("div", { className: "cart-product__bullet-title" }, title),
            React.createElement("div", { className: "cart-product__bullet-text" }, text)));
    };
    var getCollegePackageProductBullets = function (productKey, isMobile) {
        var courseLibraryText = "Access to all ".concat(Marketing.aceCourseCount + '+', " lower & upper division courses");
        if (productKey === "CS1") {
            courseLibraryText = "Core General Ed and pre-requisite courses";
        }
        var monthlyCourseCompletionText = "Unlimited, but enroll in 2 at a time";
        if (productKey === "CS3") {
            monthlyCourseCompletionText = "Unlimited, but enroll in 3 at a time";
        }
        var bullets = [
            React.createElement(ProductBulletWithTitle, { title: "Course Library", text: courseLibraryText }),
            React.createElement(ProductBulletWithTitle, { title: "Monthly Course Completion", text: monthlyCourseCompletionText }),
        ];
        if (productKey === "CS3") {
            bullets.push(React.createElement(ProductBulletWithTitle, { title: "Coaching & Support", text: "Get college coaching and course guidance" }));
        }
        if (productKey === "CS3" || productKey === "CS_UOPX" || productKey === "CS_COLLEGE_CONNECT") {
            bullets.push(React.createElement(ProductBulletWithTitle, { title: "Academic Tutoring", text: "Personalized AI tutoring" }));
        }
        if (productKey !== "CS_UOPX" && productKey !== "CS_COLLEGE_CONNECT") {
            bullets.push(React.createElement(ProductBulletWithTitle, { title: "Transferable Credit", text: "Accepted at over ".concat(Marketing.transferableSchoolCount + "+", " colleges") }));
        }
        bullets.push(React.createElement(ProductBulletWithTitle, { title: "Learning Format", text: "100% online, self-paced with videos" }), React.createElement(ProductBulletWithTitle, { title: "Testing Format", text: "Test confidently with open book exams" }), React.createElement(ProductBulletWithTitle, { title: "Mobile Access", text: "College on the go with our mobile app" }), React.createElement(ProductBulletWithTitle, { title: "Flexibility", text: "24/7: Start, pause, or cancel anytime" }));
        return bullets;
    };
    exports.ProductBulletsView = (0, mobx_react_1.observer)((function (_super) {
        __extends(_ProductBulletsView, _super);
        function _ProductBulletsView(props) {
            return _super.call(this, props) || this;
        }
        Object.defineProperty(_ProductBulletsView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a;
                var app = this.props.app;
                if (app.shouldOfferTestPrepTwoWeekPlan) {
                    return null;
                }
                var bulletParams = {
                    textIdentifier: new reg_form_utils_1.ProductBulletUtil(app.registrationData).calculateProductBulletTextIdentifierForProduct(app),
                    lastViewedAnswerCategory: app.lastViewedStudyAnswerCategory,
                    productDisplayName: (0, exports.getProductDisplayName)(app.registrationData),
                    productKey: app.registrationData.product,
                    hasSelectedPaidTrial: app.registrationData.hasSelectedPaidTrial,
                    bulletTextProductName: (0, exports.getProductNameForBulletText)(app.registrationData),
                    productBullets: (0, exports.getBullets)(app)
                };
                var institutionName = (_a = app.product) === null || _a === void 0 ? void 0 : _a.institutionName;
                var textIdentifier = bulletParams.textIdentifier;
                return (React.createElement(React.Fragment, null, !!textIdentifier &&
                    React.createElement("div", { className: "bullet-container ".concat(!remspect.isControl("regFormRebrand") && textIdentifier) }, !institutionName &&
                        React.createElement("div", { className: "non-institution-inner-container" }, textIdentifier &&
                            React.createElement("div", null,
                                React.createElement(ProductBulletsInnerView, { app: app, params: bulletParams }))))));
            }
        });
        return _ProductBulletsView;
    }(React.Component)));
    var ProductBulletsInnerView = (0, mobx_react_1.observer)((function (_super) {
        __extends(_ProductBulletsInnerView, _super);
        function _ProductBulletsInnerView(props) {
            return _super.call(this, props) || this;
        }
        Object.defineProperty(_ProductBulletsInnerView.prototype, "renderBullets", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (productBullets) {
                return productBullets.map(function (bullet, index) { return React.createElement("li", { key: index },
                    React.createElement("div", null, bullet)); });
            }
        });
        Object.defineProperty(_ProductBulletsInnerView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a = this.props.params, textIdentifier = _a.textIdentifier, productDisplayName = _a.productDisplayName, bulletTextProductName = _a.bulletTextProductName, lastViewedAnswerCategory = _a.lastViewedAnswerCategory, hasSelectedPaidTrial = _a.hasSelectedPaidTrial, productBullets = _a.productBullets;
                var _b = (function () {
                    if (remspect.isControl("regFormRebrand")) {
                        return ["Your Plan Includes", "/images/studyAnswers/experts.png"];
                    }
                    else {
                        return ["Your plan includes", "/images/studyAnswers/experts-e2.png"];
                    }
                })(), planHeader = _b[0], expertsImage = _b[1];
                return (React.createElement("div", null,
                    React.createElement("div", null,
                        textIdentifier === 'new-student-expert-product-bullets' &&
                            React.createElement("div", { "test-id": "new_student_expert_product_bullets", "data-cname": "new_student_expert_product_bullets", "data-track-visible": true },
                                React.createElement("hr", { className: "cart-hr" }),
                                React.createElement("h6", null, planHeader),
                                React.createElement("ul", null, this.renderBullets(productBullets)),
                                React.createElement("div", { className: "experts-online", "data-cname": "answers_cart_experts_access", "test-id": "answers_cart_experts_access", "data-track-visible": true },
                                    React.createElement("div", { className: "experts-online__image" },
                                        React.createElement("img", { src: expertsImage })),
                                    React.createElement("div", { className: "experts-online__text" },
                                        "Access a network of 1,000+",
                                        lastViewedAnswerCategory ?
                                            React.createElement("span", null,
                                                React.createElement("span", null, " " + lastViewedAnswerCategory + " ")) : " ",
                                        "experts"))),
                        textIdentifier === 'tutoring-reg-bullets' &&
                            React.createElement("div", { "test-id": "tutoring_reg_bullets", "data-cname": "tutoring_reg_bullets", "data-track-visible": true },
                                React.createElement("hr", { className: "cart-hr" }),
                                React.createElement("h6", null, planHeader),
                                React.createElement("ul", null, this.renderBullets(productBullets)),
                                React.createElement("div", { className: "experts-online", "data-cname": "answers_cart_experts_access", "test-id": "answers_cart_experts_access", "data-track-visible": true },
                                    React.createElement("div", { className: "experts-online__image" },
                                        React.createElement("img", { src: expertsImage })),
                                    React.createElement("div", { className: "experts-online__text" },
                                        "Access a network of 1,000+",
                                        lastViewedAnswerCategory ?
                                            React.createElement("span", null,
                                                React.createElement("span", null, " " + lastViewedAnswerCategory + " ")) : " ",
                                        "experts"))),
                        textIdentifier === 'new-student-other-basic-bullets' &&
                            React.createElement("div", { className: "new-student-other-basic-bullets", "test-id": "new_student-other-basic-bullets", "data-cname": "new_student-other-basic-bullets", "data-track-visible": true },
                                React.createElement("hr", { className: "cart-hr" }),
                                React.createElement("h6", null, planHeader),
                                React.createElement("ul", null, this.renderBullets(productBullets)),
                                React.createElement("div", { className: "experts-online", "data-cname": "answers_cart_experts_access", "test-id": "answers_cart_experts_access", "data-track-visible": true },
                                    React.createElement("div", { className: "experts-online__image" },
                                        React.createElement("img", { src: expertsImage })),
                                    React.createElement("div", { className: "experts-online__text" },
                                        "Access a network of 1,000+",
                                        lastViewedAnswerCategory ?
                                            React.createElement("span", null,
                                                React.createElement("span", null, " " + lastViewedAnswerCategory + " ")) : " ",
                                        "experts"))),
                        textIdentifier === 'classroom-teacher-product-bullets' &&
                            React.createElement("div", { "test-id": "classroom_teacher_product_bullets", "data-cname": "classroom_teacher_product_bullets", "data-track-visible": true },
                                React.createElement("hr", { className: "cart-hr" }),
                                React.createElement("h6", null, planHeader),
                                React.createElement("ul", { "data-cname": "classroom_teacher_product_bullets_list" }, this.renderBullets(productBullets))),
                        textIdentifier === 'teacher-product-bullets' &&
                            React.createElement("div", { "test-id": "teacher_product_bullets", "data-cname": "teacher_product_bullets", "data-track-visible": true },
                                React.createElement("hr", { className: "cart-hr" }),
                                React.createElement("h6", null, planHeader),
                                React.createElement("ul", { "data-cname": "teacher_product_bullets" }, this.renderBullets(productBullets))),
                        textIdentifier === 'homeschool-product-bullets' &&
                            React.createElement("div", { "test-id": "homeschool_product_bullets", "data-cname": "homeschool_product_bullets", "data-track-visible": true },
                                React.createElement("hr", { className: "cart-hr" }),
                                React.createElement("h6", null, planHeader),
                                React.createElement("ul", { "data-cname": "homeschool_product_bullets" }, this.renderBullets(productBullets))),
                        textIdentifier === 'family-plan-product-bullets' &&
                            React.createElement("div", { "test-id": "family_plan_bullets", "data-cname": "family_plan_bullets", "data-track-visible": true, className: "family-plan-bullets" },
                                React.createElement("hr", { className: "cart-hr" }),
                                React.createElement("h6", null, "Family Plan pricing and billing"),
                                React.createElement(FamilyPlanProductBulletsView, { params: this.props.params })),
                        textIdentifier === 'cx-reg-bullets' &&
                            React.createElement(CXProductBulletsView, { hasSelectedPaidTrial: hasSelectedPaidTrial, productBullets: productBullets }),
                        textIdentifier === 'college-package-reg-bullets' &&
                            React.createElement(CollegePackageProductBulletsView, { hasSelectedPaidTrial: hasSelectedPaidTrial, productBullets: productBullets }),
                        textIdentifier === "teacher-cert-bullets" &&
                            React.createElement(TeacherCertIntroPlanBullets, { app: this.props.app }))));
            }
        });
        return _ProductBulletsInnerView;
    }(React.Component)));
    var getCxProductBullets = function (isMobile) {
        return [
            !isMobile
                ? React.createElement(React.Fragment, null,
                    "Earn transferrable credits for ",
                    React.createElement("span", null,
                        Marketing.transferableSchoolCount,
                        "+"),
                    " colleges")
                : React.createElement(React.Fragment, null,
                    "Earn transferrable credits for ",
                    Marketing.transferableSchoolCount,
                    "+ colleges"),
            !isMobile
                ? React.createElement(React.Fragment, null,
                    "Expanded library of ",
                    React.createElement("span", null,
                        Marketing.aceCourseCount,
                        "+"),
                    " upper & lower-division courses")
                : React.createElement(React.Fragment, null,
                    "Expanded library of ",
                    Marketing.aceCourseCount,
                    "+ upper & lower-division courses"),
            React.createElement(React.Fragment, null, "Coaching assistance for degree and course planning"),
            React.createElement(React.Fragment, null, "Short, animated video lessons and quizzes"),
            React.createElement(React.Fragment, null, "Course progress tracking and scheduling"),
            React.createElement(React.Fragment, null, "Study anytime, anywhere! Access your courses from a desktop or mobile device"),
            React.createElement(React.Fragment, null, "Flexible monthly plan you can stop and start anytime"),
        ];
    };
    var CXProductBulletsView = function (_a) {
        var hasSelectedPaidTrial = _a.hasSelectedPaidTrial, productBullets = _a.productBullets;
        var planHeader = remspect.isControl("regFormRebrand") ? "Your Plan Includes" : "Your plan includes";
        return React.createElement("div", { "test-id": "cx-reg-bullets", "data-cname": "cx-reg-bullets", "data-track-visible": true, className: "cx-reg-bullets" },
            React.createElement("hr", { className: "cart-hr" }),
            React.createElement("h6", null, planHeader),
            React.createElement("ul", { "data-cname": "cx-reg-bullets" }, productBullets.map(function (bullet, index) { return React.createElement("li", { key: index }, bullet); })),
            hasSelectedPaidTrial &&
                React.createElement("div", { className: "paid-trial-cx-disclaimer" },
                    React.createElement("i", null, "Note: Proctored exams require full membership activation.")));
    };
    var CollegePackageProductBulletsView = function (_a) {
        var hasSelectedPaidTrial = _a.hasSelectedPaidTrial, productBullets = _a.productBullets;
        return React.createElement("div", { "test-id": "cx-reg-bullets", "data-cname": "cx-reg-bullets", "data-track-visible": true, className: "cx-reg-bullets" },
            React.createElement("ul", { className: "cart-product__bullets--college-package", "data-cname": "cx-reg-bullets" }, productBullets.map(function (bullet, index) {
                return React.createElement("li", { className: "cart-product__bullet--college-package", key: index }, bullet);
            })),
            hasSelectedPaidTrial &&
                React.createElement("div", { className: "paid-trial-cx-disclaimer" },
                    React.createElement("i", null, "Note: Proctored exams require full membership activation.")));
    };
    var FamilyPlanProductBulletsView = (0, mobx_react_1.observer)((function (_super) {
        __extends(_ProductBulletsInnerView, _super);
        function _ProductBulletsInnerView(props) {
            return _super.call(this, props) || this;
        }
        Object.defineProperty(_ProductBulletsInnerView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a = this.props.params, productDisplayName = _a.productDisplayName, productKey = _a.productKey, hasSelectedPaidTrial = _a.hasSelectedPaidTrial, productBullets = _a.productBullets;
                return (React.createElement("ul", null,
                    React.createElement("li", null, "Free parent account. Oversee one or more separate student accounts"),
                    React.createElement("li", null,
                        "One student ",
                        React.createElement("span", null, productDisplayName),
                        " account. Add additional accounts after sign up"),
                    productBullets.map(function (bullet, index) { return React.createElement("li", { key: index }, bullet); })));
            }
        });
        return _ProductBulletsInnerView;
    }(React.Component)));
    var TeacherCertIntroPlanBullets = function (_a) {
        var app = _a.app;
        var planHeader = remspect.isControl("regFormRebrand") ? "Your Plan Includes" : "Your plan includes";
        return React.createElement("div", { "data-cname": "teacher_cert_intro_plan_bullets", "test-id": "teacher_cert_intro_plan_bullets", "data-track-visible": true },
            React.createElement("hr", { className: "cart-hr" }),
            React.createElement("h6", null, planHeader),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Full access to ",
                    app.product.displayName),
                React.createElement("li", null, "Save time with a diagnostic that identifies strengths and weaknesses"),
                React.createElement("li", null, "Customized study plan with video lessons, practice questions, and step-by-step explanations"),
                React.createElement("li", null, "Practice tests that mirror the exam topics and experience")));
    };
    var MobileProductBulletsInternal = (0, mobx_react_1.observer)((function (_super) {
        __extends(_MobileProductBulletsInternal, _super);
        function _MobileProductBulletsInternal(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                showAllBullets: false
            };
            return _this;
        }
        Object.defineProperty(_MobileProductBulletsInternal.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var app = this.props.app;
                var regData = app.registrationData;
                var bulletTextIdentifier = this.props.bulletTextIdentifier;
                var bulletTextProductName = (0, exports.getProductNameForBulletText)(regData);
                var viewMoreLinkClass = "view-more-bullets ".concat(this.state.showAllBullets ? '' : 'collapsed');
                var _a = (function () {
                    if (remspect.isControl("regFormRebrand")) {
                        return ["Your Plan Includes", "/images/studyAnswers/experts.png"];
                    }
                    else {
                        return ["Your plan includes", "/images/studyAnswers/experts-e2.png"];
                    }
                })(), planHeader = _a[0], expertsImage = _a[1];
                return React.createElement("div", { className: "mobile-product-bullets" },
                    bulletTextIdentifier === 'cx-reg-bullets' &&
                        React.createElement(CxMobileProductBullets, { viewMoreLinkClass: viewMoreLinkClass, showAllBullets: this.state.showAllBullets, setShowAllBullets: function () { return _this.setState({ showAllBullets: !_this.state.showAllBullets }); }, regData: regData }),
                    bulletTextIdentifier === 'college-package-reg-bullets' &&
                        React.createElement(CollegePackageProductBullets, { viewMoreLinkClass: viewMoreLinkClass, showAllBullets: this.state.showAllBullets, setShowAllBullets: function () { return _this.setState({ showAllBullets: !_this.state.showAllBullets }); }, regData: regData }),
                    bulletTextIdentifier === 'new-student-expert-product-bullets' && React.createElement("div", { "test-id": "new_student_expert_product_bullets_mobile", "data-cname": "new_student_expert_product_bullets_mobile", "data-track-visible": true },
                        React.createElement("hr", { className: "cart-hr" }),
                        React.createElement("h6", null, planHeader),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("div", null,
                                    "Step-by-step solutions to ",
                                    Marketing.studyAnswersCount,
                                    "+ practice problems")),
                            React.createElement("li", null,
                                React.createElement("div", null, "24/7 expert help with any question if you get stuck"))),
                        React.createElement(CollapsibleAutoSizeComponent_1.CollapsibleAutoSizeComponent, { collapsed: !this.state.showAllBullets },
                            React.createElement("div", { id: "student-expert-mobile-reg-bullets-hidden" },
                                React.createElement("ul", null,
                                    React.createElement("li", null,
                                        React.createElement("div", null, "An engaging video lesson on each Study Answer to improve your understanding")),
                                    React.createElement("li", null,
                                        React.createElement("div", null, "Free mobile app to help you study anywhere, anytime"))),
                                React.createElement("div", { className: "experts-online", "data-cname": "answers_cart_experts_access", "test-id": "answers_cart_experts_access", "data-track-visible": true },
                                    React.createElement("div", { className: "experts-online__image" },
                                        React.createElement("img", { src: expertsImage })),
                                    React.createElement("div", { className: "experts-online__text" },
                                        "Access a network of 1,000+ ",
                                        app.lastViewedStudyAnswerCategory && React.createElement("span", null,
                                            React.createElement("span", null, app.lastViewedStudyAnswerCategory)),
                                        " experts")))),
                        React.createElement("div", { className: viewMoreLinkClass, onClick: function () { return _this.setState({ showAllBullets: !_this.state.showAllBullets }); } },
                            "View ",
                            React.createElement("span", { className: "more-span" },
                                "More ",
                                React.createElement("span", { className: "icon icon-angle-down" })),
                            React.createElement("span", { className: "less-span" },
                                "Less ",
                                React.createElement("span", { className: "icon icon-angle-up" }))),
                        React.createElement("hr", { className: "cart-hr" })),
                    bulletTextIdentifier === 'test-prep-reg-bullets' && React.createElement("div", { "test-id": "test-prep-reg-bullets-mobile", "data-cname": "test-prep-reg-bullets-mobile", "data-track-remspect": "testPrepBullets", "data-track-visible": true },
                        React.createElement(React.Fragment, null,
                            React.createElement("hr", { className: "cart-hr" }),
                            React.createElement("h6", null, planHeader),
                            React.createElement("ul", { "data-cname": "test-prep-reg-bullets-mobile-control", "data-track-visible": true },
                                React.createElement("li", null, "Engaging lessons that cover every part of the exam to help you get your best score"),
                                React.createElement("li", null, "Unlimited practice tests so you're completely confident on test day")),
                            React.createElement(CollapsibleAutoSizeComponent_1.CollapsibleAutoSizeComponent, { collapsed: !this.state.showAllBullets },
                                React.createElement("ul", { id: "test-prep-mobile-reg-bullets-hidden" },
                                    React.createElement("li", null, "Full transcripts of each lesson"),
                                    React.createElement("li", null, "Free mobile app with video downloads so you can study anywhere and anytime"),
                                    React.createElement("li", null, "Get help from experts if you are stuck"))),
                            React.createElement("div", { className: viewMoreLinkClass, onClick: function () { return _this.setState({ showAllBullets: !_this.state.showAllBullets }); }, "data-cname": "mobile_reg_bullets_toggle", "data-track-visible": true },
                                "View ",
                                React.createElement("span", { className: "more-span" },
                                    "More ",
                                    React.createElement("span", { className: "icon icon-angle-down" })),
                                React.createElement("span", { className: "less-span" },
                                    "Less ",
                                    React.createElement("span", { className: "icon icon-angle-up" }))),
                            React.createElement("hr", { className: "cart-hr" }))));
            }
        });
        return _MobileProductBulletsInternal;
    }(React.Component)));
    exports.MobileProductBullets = (0, mobx_react_1.observer)(function (props) {
        var _a, _b;
        var app = props.app;
        var regData = app.registrationData;
        var bulletTextIdentifier = new reg_form_utils_1.ProductBulletUtil(regData).calculateProductBulletTextIdentifierForProduct(app);
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "mobile-product-bullets--container" },
                bulletTextIdentifier === "teacher-cert-bullets" &&
                    React.createElement("div", { "data-cname": "mobile_reg_bullets", "test-id": "mobile_reg_bullets", "data-track-visible": true },
                        React.createElement(TeacherCertIntroPlanBullets, { app: app }),
                        React.createElement("hr", { className: "cart-hr" })),
                (bulletTextIdentifier === 'cx-reg-bullets'
                    || bulletTextIdentifier === 'new-student-expert-product-bullets'
                    || bulletTextIdentifier === 'test-prep-reg-bullets'
                    || bulletTextIdentifier === 'college-package-reg-bullets') &&
                    React.createElement("div", { "data-cname": "mobile_reg_bullets", "test-id": "mobile_reg_bullets", "data-track-visible": true },
                        ((_a = app.product) === null || _a === void 0 ? void 0 : _a.key.indexOf('ANSWERS')) !== -1 && React.createElement("div", null,
                            React.createElement(MobileProductBulletsInternal, { app: app, bulletTextIdentifier: bulletTextIdentifier })),
                        ((_b = app.product) === null || _b === void 0 ? void 0 : _b.key.indexOf('ANSWERS')) === -1 &&
                            React.createElement(MobileProductBulletsInternal, { app: app, bulletTextIdentifier: bulletTextIdentifier }))));
    });
    var CxMobileProductBullets = (0, mobx_react_1.observer)(function (props) {
        var viewMoreLinkClass = props.viewMoreLinkClass, regData = props.regData, showAllBullets = props.showAllBullets, setShowAllBullets = props.setShowAllBullets;
        var productBullets = getCxProductBullets(true);
        var planHeader = remspect.isControl("regFormRebrand") ? "Your Plan Includes" : "Your plan includes";
        return React.createElement("div", { "test-id": "cx-reg-bullets-mobile", "data-cname": "cx-reg-bullets-mobile", "data-track-visible": true },
            React.createElement("hr", { className: "cart-hr" }),
            React.createElement("h6", null, planHeader),
            React.createElement("ul", null, productBullets.slice(0, 2).map(function (bullet, index) { return React.createElement("li", { key: index }, bullet); })),
            React.createElement(CollapsibleAutoSizeComponent_1.CollapsibleAutoSizeComponent, { collapsed: !showAllBullets },
                React.createElement("ul", { id: "cx-mobile-reg-bullets-hidden" }, productBullets.slice(2, productBullets.length).map(function (bullet, index) { return React.createElement("li", { key: index }, bullet); }))),
            React.createElement("div", { className: viewMoreLinkClass, onClick: function () { return setShowAllBullets(); } },
                "View ",
                React.createElement("span", { className: "more-span" },
                    "More ",
                    React.createElement("span", { className: "icon icon-angle-down" })),
                React.createElement("span", { className: "less-span" },
                    "Less ",
                    React.createElement("span", { className: "icon icon-angle-up" }))),
            regData.hasSelectedPaidTrial && React.createElement("div", { className: "paid-trial-cx-disclaimer" },
                React.createElement("i", null, "Note: Proctored exams require full membership activation.")),
            React.createElement("hr", { className: "cart-hr" }));
    });
    var CollegePackageProductBullets = (0, mobx_react_1.observer)(function (props) {
        var viewMoreLinkClass = props.viewMoreLinkClass, regData = props.regData, showAllBullets = props.showAllBullets, setShowAllBullets = props.setShowAllBullets;
        var productBullets = getCollegePackageProductBullets(regData.product, true);
        return React.createElement("div", { className: "college-package-bullets-mobile", "test-id": "college_package_bullets_mobile", "data-cname": "college_package_bullets_mobile", "data-track-visible": true },
            React.createElement("ul", null, productBullets.slice(0, 2).map(function (bullet, index) { return React.createElement("li", { key: index }, bullet); })),
            React.createElement(CollapsibleAutoSizeComponent_1.CollapsibleAutoSizeComponent, { collapsed: !showAllBullets },
                React.createElement("ul", { id: "college-package-mobile-reg-bullets-hidden" }, productBullets.slice(2, productBullets.length).map(function (bullet, index) { return React.createElement("li", { key: index }, bullet); }))),
            React.createElement("div", { className: viewMoreLinkClass, onClick: function () { return setShowAllBullets(); } },
                React.createElement("span", { className: "more-span" },
                    "More benefits ",
                    React.createElement("span", { className: "icon icon-angle-down" })),
                React.createElement("span", { className: "less-span" },
                    "Close ",
                    React.createElement("span", { className: "icon icon-angle-up" }))));
    });
    var getProductDisplayName = function (registrationData) {
        if (registrationData.product === "PREMIUM" && registrationData.examName) {
            var testName = registrationData.examName;
            var knownTestMatch = false;
            for (var _i = 0, ALL_TEST_NAMES_1 = TestPrepConstants_1.ALL_TEST_NAMES; _i < ALL_TEST_NAMES_1.length; _i++) {
                var item = ALL_TEST_NAMES_1[_i];
                if (item.toLowerCase() === testName.toLowerCase()) {
                    knownTestMatch = true;
                    testName = item;
                    break;
                }
            }
            if (knownTestMatch) {
                return testName + " Test Prep";
            }
            else {
                return "Premium Edition";
            }
        }
        return "";
    };
    exports.getProductDisplayName = getProductDisplayName;
    var getProductNameForBulletText = function (regData) {
        if (regData.product) {
            if (regData.product.indexOf("PRAXIS") > -1) {
                return "Praxis";
            }
            else if (regData.product.indexOf("FTCE") > -1) {
                return "FTCE";
            }
            else if (regData.product.indexOf("HESI") > -1) {
                return "HESI";
            }
            else if (regData.product.indexOf("TEAS") > -1) {
                return "TEAS";
            }
        }
        return "Test Prep";
    };
    exports.getProductNameForBulletText = getProductNameForBulletText;
});

//# sourceMappingURL=RegProductBulletsViews.js.map

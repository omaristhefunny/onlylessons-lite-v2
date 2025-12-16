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
define(["require", "exports", "dashboard/test-prep-experience/services/TestPrepDashboardService", "mobx", "registration/post-registration/test-prep-experience/AsvabOnboardingStore", "registration/post-registration/test-prep-experience/TestPrepCourseSurveyUtil", "registration/post-registration/test-prep-experience/TestPrepExperienceCourseSurveyService", "registration/post-registration/test-prep-experience/TestPrepExperienceCourseSurveyService", "testPrep/TestPrepConstants"], function (require, exports, TestPrepDashboardService_1, mobx_1, AsvabOnboardingStore_1, TestPrepCourseSurveyUtil_1, TestPrepExperienceCourseSurveyService_1, TestPrepExperienceCourseSurveyService_2, TestPrepConstants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.etsCourseSurveyStore = exports.dateCourseSurveyStore = exports.addCourseSpecificCourseSurveyStore = exports.addCourseAllCourseSurveyStore = exports.onboardingCourseSurveyStore = exports.TestPrepExperienceCourseSurveyStore = exports.TestPrepExperienceCourseSurveyStoreType = void 0;
    var TestPrepExperienceCourseSurveyStoreType;
    (function (TestPrepExperienceCourseSurveyStoreType) {
        TestPrepExperienceCourseSurveyStoreType[TestPrepExperienceCourseSurveyStoreType["Onboarding"] = 0] = "Onboarding";
        TestPrepExperienceCourseSurveyStoreType[TestPrepExperienceCourseSurveyStoreType["AddCourseAll"] = 1] = "AddCourseAll";
        TestPrepExperienceCourseSurveyStoreType[TestPrepExperienceCourseSurveyStoreType["AddCourseSpecific"] = 2] = "AddCourseSpecific";
        TestPrepExperienceCourseSurveyStoreType[TestPrepExperienceCourseSurveyStoreType["Date"] = 3] = "Date";
        TestPrepExperienceCourseSurveyStoreType[TestPrepExperienceCourseSurveyStoreType["EtsFreemium"] = 4] = "EtsFreemium";
    })(TestPrepExperienceCourseSurveyStoreType || (exports.TestPrepExperienceCourseSurveyStoreType = TestPrepExperienceCourseSurveyStoreType = {}));
    var TestPrepExperienceCourseSurveyStore = (function () {
        function TestPrepExperienceCourseSurveyStore(testPrepExperienceCourseSurveyStoreType) {
            Object.defineProperty(this, "_isLoadingTypeahead", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "_courseTypeaheadOptions", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            Object.defineProperty(this, "_showTypeaheadMenu", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "isCourseBundle", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "isSpecificExam", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "isLoaded", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "invalidQuestionSet", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: new Set()
            });
            Object.defineProperty(this, "isSubmitting", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "isEnrolledInCurrentCourse", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "testPrepExperienceCourseSurveyStoreType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "onlyTestSuite", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "examDisplayName", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "asvabCourseSurvey", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {
                    militaryBranches: new Array(),
                    examFormat: null
                }
            });
            Object.defineProperty(this, "testPrepCourseSurvey", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {
                    courseId: null,
                    plannedExamDate: null,
                    hasTakenExam: null,
                    mostRecentExamScore: null,
                    targetExamScore: null,
                    examConfidenceLevel: null,
                    examFamiliarityLevel: null,
                }
            });
            Object.defineProperty(this, "emailSmsOptIn", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "testPrepCourseSurveysValueProxy", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "course", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "typeaheadRef", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "typeaheadHasFocus", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            (0, mobx_1.makeAutoObservable)(this);
            this.testPrepExperienceCourseSurveyStoreType = testPrepExperienceCourseSurveyStoreType;
            if (testPrepExperienceCourseSurveyStoreType === TestPrepExperienceCourseSurveyStoreType.Date) {
                return;
            }
            if (testPrepExperienceCourseSurveyStoreType === TestPrepExperienceCourseSurveyStoreType.Onboarding) {
                this.emailSmsOptIn = true;
            }
            if (testPrepExperienceCourseSurveyStoreType === TestPrepExperienceCourseSurveyStoreType.EtsFreemium) {
                this.isLoaded = false;
            }
            this.testPrepCourseSurveysValueProxy = TestPrepDashboardService_1.testPrepDashboardService.getTestPrepCourseSurveysValueProxy();
        }
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "onCourseTypeaheadSearch", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (searchText) {
                var _this = this;
                this._isLoadingTypeahead = true;
                this._showTypeaheadMenu = false;
                this._courseTypeaheadOptions = [];
                return this.searchForCourses(searchText)
                    .then((0, mobx_1.action)(function (results) {
                    _this._courseTypeaheadOptions = results;
                }))
                    .finally((0, mobx_1.action)(function () {
                    _this._isLoadingTypeahead = false;
                    _this._showTypeaheadMenu = true;
                }));
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "onInputChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (input) {
                if (!input) {
                    this._showTypeaheadMenu = false;
                }
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "isAsvabSurvey", {
            get: function () {
                return this.testPrepCourseSurvey.courseId === AsvabOnboardingStore_1.ASVAB_COURSE_ID;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "isLoadingTypeahead", {
            get: function () {
                return this._isLoadingTypeahead;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "showTypeaheadMenu", {
            get: function () {
                return this._showTypeaheadMenu;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "courseTypeaheadOptions", {
            get: function () {
                return this._courseTypeaheadOptions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "searchForCourses", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (searchText) {
                return TestPrepExperienceCourseSurveyService_1.default.searchForTestPrepCourses(searchText, this.onlyTestSuite);
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "ensureCoursesAreLoaded", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.isLoaded) {
                    return;
                }
                if (this.testPrepExperienceCourseSurveyStoreType === TestPrepExperienceCourseSurveyStoreType.Onboarding ||
                    this.testPrepExperienceCourseSurveyStoreType === TestPrepExperienceCourseSurveyStoreType.AddCourseSpecific) {
                    this.getCourseIfSelected();
                }
                this.isLoaded = true;
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "setCourseSurveyCourse", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (course) {
                var _this = this;
                this.isSpecificExam = true;
                this.testPrepCourseSurvey.courseId = course.academyAssetId;
                this.course = course;
                var examShortNamePromise = TestPrepDashboardService_1.testPrepDashboardService.getExamShortName(this.course.academyAssetId)
                    .then((0, mobx_1.action)(function (data) {
                    _this.course.shortTitle = data || course.title;
                }))
                    .catch(function () {
                });
                var enrollmentCheckPromise = this.isEnrolledInCourse(course.academyAssetId)
                    .then((0, mobx_1.action)(function (isEnrolled) {
                    _this.isEnrolledInCurrentCourse = isEnrolled;
                }));
                return Promise.all([examShortNamePromise, enrollmentCheckPromise])
                    .then(function () { return void 0; })
                    .finally((0, mobx_1.action)(function () {
                    _this.isLoaded = true;
                }));
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "selectCourseChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (e) {
                if (e.length) {
                    this.testPrepCourseSurvey.courseId = e[0].academyAssetId;
                    this.course = e[0];
                    this.typeaheadHasFocus = false;
                }
                else {
                    this.testPrepCourseSurvey.courseId = null;
                    this.course = null;
                }
                if (this.typeaheadRef) {
                    this.typeaheadRef.blur();
                }
                TestPrepCourseSurveyUtil_1.default.validateInput("selectCourse", this.testPrepCourseSurvey.courseId, this.invalidQuestionSet);
                if (this.testPrepCourseSurvey.plannedExamDate) {
                    TestPrepCourseSurveyUtil_1.default.validatePlannedExamDate(this.testPrepCourseSurvey.courseId, this.testPrepCourseSurvey.plannedExamDate, this.invalidQuestionSet, this.isEnrolledInCurrentCourse);
                }
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "selectedMilitaryBranchChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value) {
                if (value === "NOT_SURE") {
                    var shouldHaveNotSureSelected = !this.asvabCourseSurvey.militaryBranches.includes(value);
                    this.asvabCourseSurvey.militaryBranches.length = 0;
                    if (shouldHaveNotSureSelected) {
                        this.asvabCourseSurvey.militaryBranches.push(value);
                    }
                }
                else if (this.asvabCourseSurvey.militaryBranches.some(function (branch) { return branch === value; })) {
                    this.asvabCourseSurvey.militaryBranches = this.asvabCourseSurvey.militaryBranches.filter(function (branch) { return branch !== value; });
                }
                else {
                    this.asvabCourseSurvey.militaryBranches = this.asvabCourseSurvey.militaryBranches.filter(function (branch) { return branch !== "NOT_SURE"; });
                    this.asvabCourseSurvey.militaryBranches.push(value);
                }
                this.validateMilitaryBranches();
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "plannedExamDateChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (date) {
                if (date === "") {
                    this.testPrepCourseSurvey.plannedExamDate = null;
                }
                else {
                    this.testPrepCourseSurvey.plannedExamDate = date;
                }
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "examFamiliarityLevelChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (familiarityLevel) {
                this.testPrepCourseSurvey.examFamiliarityLevel = familiarityLevel;
                if (this.testPrepExperienceCourseSurveyStoreType !== TestPrepExperienceCourseSurveyStoreType.EtsFreemium
                    && !this.testPrepCourseSurvey.hasTakenExam) {
                    TestPrepCourseSurveyUtil_1.default.validateInput("examFamiliarityLevel", this.testPrepCourseSurvey.examFamiliarityLevel, this.invalidQuestionSet);
                }
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "examFormatChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (examFormat) {
                this.asvabCourseSurvey.examFormat = examFormat;
                this.validateExamFormat();
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "hasTakenExamChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (hasTakenExam) {
                this.testPrepCourseSurvey.hasTakenExam = hasTakenExam;
                this.testPrepCourseSurvey.mostRecentExamScore = null;
                this.testPrepCourseSurvey.examFamiliarityLevel = null;
                TestPrepCourseSurveyUtil_1.default.validateExamScore(this.testPrepCourseSurvey.mostRecentExamScore, "mostRecentExamScore", this.invalidQuestionSet);
                TestPrepCourseSurveyUtil_1.default.validateInput("hasTakenExam", this.testPrepCourseSurvey.hasTakenExam, this.invalidQuestionSet);
                this.invalidQuestionSet.delete("examFamiliarityLevel");
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "mostRecentExamScoreChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (e) {
                var value = e.target.value;
                if (value === "") {
                    this.testPrepCourseSurvey.mostRecentExamScore = null;
                }
                else if (this.isScoreInputValid(value)) {
                    this.testPrepCourseSurvey.mostRecentExamScore = Number(value);
                }
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "targetExamScoreChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (e) {
                var value = e.target.value;
                if (value === "") {
                    this.testPrepCourseSurvey.targetExamScore = null;
                }
                else if (this.isScoreInputValid(value)) {
                    this.testPrepCourseSurvey.targetExamScore = Number(value);
                }
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "isCefrLevelScore", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a;
                return ((_a = this.course) === null || _a === void 0 ? void 0 : _a.academyAssetId) == TestPrepConstants_1.TOEFL_2026_COURSE_ID;
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "hasTakenExam", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a;
                return ((_a = this.testPrepCourseSurvey) === null || _a === void 0 ? void 0 : _a.hasTakenExam) === true;
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "isScoreInputValid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value) {
                var isValid = /^\d+$/.test(value) || value === "" || value === null;
                return isValid;
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "validateMilitaryBranches", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.isAsvabSurvey || this.asvabCourseSurvey.militaryBranches.length > 0) {
                    this.invalidQuestionSet.delete(AsvabOnboardingStore_1.SELECTED_MILITARY_BRANCHES_QUESTION_VALIDATION_KEY);
                }
                else {
                    this.invalidQuestionSet.add(AsvabOnboardingStore_1.SELECTED_MILITARY_BRANCHES_QUESTION_VALIDATION_KEY);
                }
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "validateExamFormat", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.isAsvabSurvey || this.asvabCourseSurvey.examFormat !== null) {
                    this.invalidQuestionSet.delete(AsvabOnboardingStore_1.EXAM_FORMAT_QUESTION_VALIDATION_KEY);
                }
                else {
                    this.invalidQuestionSet.add(AsvabOnboardingStore_1.EXAM_FORMAT_QUESTION_VALIDATION_KEY);
                }
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "validateForm", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                TestPrepCourseSurveyUtil_1.default.validateInput("selectCourse", this.testPrepCourseSurvey.courseId, this.invalidQuestionSet);
                TestPrepCourseSurveyUtil_1.default.validatePlannedExamDate(this.testPrepCourseSurvey.courseId, this.testPrepCourseSurvey.plannedExamDate, this.invalidQuestionSet, this.isEnrolledInCurrentCourse);
                if (this.testPrepExperienceCourseSurveyStoreType !== TestPrepExperienceCourseSurveyStoreType.EtsFreemium
                    && !this.testPrepCourseSurvey.hasTakenExam) {
                    TestPrepCourseSurveyUtil_1.default.validateInput("examFamiliarityLevel", this.testPrepCourseSurvey.examFamiliarityLevel, this.invalidQuestionSet);
                }
                TestPrepCourseSurveyUtil_1.default.validateInput("hasTakenExam", this.testPrepCourseSurvey.hasTakenExam, this.invalidQuestionSet);
                TestPrepCourseSurveyUtil_1.default.validateExamScore(this.testPrepCourseSurvey.mostRecentExamScore, "mostRecentExamScore", this.invalidQuestionSet);
                if (this.testPrepCourseSurvey.targetExamScore != null) {
                    TestPrepCourseSurveyUtil_1.default.validateExamScore(this.testPrepCourseSurvey.targetExamScore, "targetExamScore", this.invalidQuestionSet);
                }
                this.validateMilitaryBranches();
                this.validateExamFormat();
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "clearTypeahead", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.typeaheadRef.clear();
                this.testPrepCourseSurvey.courseId = null;
                this.course = null;
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "submitForm", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, isCourseNitpuxEligible, e_1;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 4, , 5]);
                                this.isSubmitting = true;
                                this.validateForm();
                                if (this.hasBlockingValidationIssues) {
                                    this.isSubmitting = false;
                                    return [2, Promise.reject("validationError")];
                                }
                                return [4, this.saveFormResponses()];
                            case 1:
                                _c.sent();
                                _a = this;
                                return [4, this.enrollInCourse()];
                            case 2:
                                _a.isCourseBundle = (_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.data;
                                this.testPrepCourseSurveysValueProxy.reloadValue();
                                if (this.testPrepExperienceCourseSurveyStoreType !== TestPrepExperienceCourseSurveyStoreType.Onboarding) {
                                    return [2, Promise.resolve()];
                                }
                                return [4, this.isCourseNitpuxEligible()];
                            case 3:
                                isCourseNitpuxEligible = _c.sent();
                                if (isCourseNitpuxEligible && !this.isCourseBundle) {
                                    this.getCourseUri(this.testPrepCourseSurvey.courseId).then(function (courseUri) {
                                        window.location.replace("".concat(courseUri, "#/courseDashboard/studyGuide"));
                                    });
                                }
                                else {
                                    window.location.replace("/member/test-prep-dashboard.html");
                                }
                                return [3, 5];
                            case 4:
                                e_1 = _c.sent();
                                console.log(e_1);
                                this.isSubmitting = false;
                                return [2, Promise.reject(e_1)];
                            case 5: return [2];
                        }
                    });
                });
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "saveOnboardingInformation", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var e_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                this.isSubmitting = true;
                                this.validateForm();
                                if (this.hasBlockingValidationIssues) {
                                    this.isSubmitting = false;
                                    return [2, Promise.reject("validationError")];
                                }
                                return [4, this.saveFormResponses()];
                            case 1:
                                _a.sent();
                                return [4, this.testPrepCourseSurveysValueProxy.reloadValue()];
                            case 2:
                                _a.sent();
                                return [2, Promise.resolve()];
                            case 3:
                                e_2 = _a.sent();
                                this.isSubmitting = false;
                                return [2, Promise.reject(e_2)];
                            case 4: return [2];
                        }
                    });
                });
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "getCourseUri", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseAcademyAssetId) {
                return TestPrepExperienceCourseSurveyService_1.default.getCourse(this.testPrepCourseSurvey.courseId).then(function (course) {
                    return course.uri;
                });
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "setTestPrepCourseSurvey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (testPrepCourseSurvey, courseId) {
                var _this = this;
                var _a;
                this.isLoaded = false;
                this.testPrepCourseSurvey = testPrepCourseSurvey;
                this.isSpecificExam = true;
                if (courseId === ((_a = this.course) === null || _a === void 0 ? void 0 : _a.academyAssetId)) {
                    this.isLoaded = true;
                    return;
                }
                TestPrepExperienceCourseSurveyService_1.default.getCourse(courseId).then(function (course) {
                    _this.course = course;
                    _this.isLoaded = true;
                });
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "getCourseIfSelected", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                TestPrepExperienceCourseSurveyService_1.default.getCourseIfSelected().then((0, mobx_1.action)(function (course) {
                    if (course) {
                        _this.isSpecificExam = true;
                        _this.testPrepCourseSurvey.courseId = course.academyAssetId;
                        _this.course = course;
                        _this.isLoaded = true;
                    }
                    else {
                        _this.onlyTestSuite = true;
                        _this.searchForCourses("").then((0, mobx_1.action)(function (resultArray) {
                            _this._courseTypeaheadOptions = resultArray;
                            if (resultArray.length == 1) {
                                _this.isSpecificExam = true;
                                _this.testPrepCourseSurvey.courseId = resultArray[0].academyAssetId;
                                _this.course = resultArray[0];
                                _this.isLoaded = true;
                            }
                            else {
                                _this.isSpecificExam = false;
                                _this.getExamDisplayName();
                            }
                        }));
                    }
                }));
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "getExamDisplayName", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                return TestPrepExperienceCourseSurveyService_1.default.getExamDisplayName().then((0, mobx_1.action)(function (examDisplayName) {
                    _this.examDisplayName = examDisplayName;
                }));
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "saveFormResponses", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.isAsvabSurvey) {
                    return TestPrepExperienceCourseSurveyService_1.default.saveAsvabCourseSurveyResponses(this.testPrepCourseSurvey, this.emailSmsOptIn, this.asvabCourseSurvey);
                }
                else {
                    return TestPrepExperienceCourseSurveyService_1.default.saveFormResponses(this.testPrepCourseSurvey, this.emailSmsOptIn);
                }
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "enrollInCourse", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return TestPrepExperienceCourseSurveyService_2.default.enrollInCourse(this.testPrepCourseSurvey.courseId);
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "isCourseNitpuxEligible", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return TestPrepExperienceCourseSurveyService_1.default.isCourseNitpuxElgible(this.testPrepCourseSurvey.courseId);
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "isEnrolledInCourse", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                return TestPrepExperienceCourseSurveyService_2.default.isEnrolledInCourse(courseId);
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyStore.prototype, "hasBlockingValidationIssues", {
            get: function () {
                if (!this.invalidQuestionSet || !this.invalidQuestionSet.size) {
                    return false;
                }
                return this.invalidQuestionSet.size > 1 || !this.invalidQuestionSet.has("plannedExamDateObsoleteToefl");
            },
            enumerable: false,
            configurable: true
        });
        return TestPrepExperienceCourseSurveyStore;
    }());
    exports.TestPrepExperienceCourseSurveyStore = TestPrepExperienceCourseSurveyStore;
    exports.onboardingCourseSurveyStore = new TestPrepExperienceCourseSurveyStore(TestPrepExperienceCourseSurveyStoreType.Onboarding);
    exports.addCourseAllCourseSurveyStore = new TestPrepExperienceCourseSurveyStore(TestPrepExperienceCourseSurveyStoreType.AddCourseAll);
    exports.addCourseSpecificCourseSurveyStore = new TestPrepExperienceCourseSurveyStore(TestPrepExperienceCourseSurveyStoreType.AddCourseSpecific);
    exports.dateCourseSurveyStore = new TestPrepExperienceCourseSurveyStore(TestPrepExperienceCourseSurveyStoreType.Date);
    exports.etsCourseSurveyStore = new TestPrepExperienceCourseSurveyStore(TestPrepExperienceCourseSurveyStoreType.EtsFreemium);
});

//# sourceMappingURL=TestPrepExperienceCourseSurveyStore.js.map

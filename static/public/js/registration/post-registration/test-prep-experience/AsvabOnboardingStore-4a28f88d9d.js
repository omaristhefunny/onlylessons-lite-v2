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
define(["require", "exports", "dashboard/test-prep-experience/components/toast/ToastStore", "mobx", "registration/post-registration/test-prep-experience/TestPrepCourseSurveyUtil", "registration/post-registration/test-prep-experience/TestPrepExperienceCourseSurveyService", "registration/post-registration/test-prep-experience/TestPrepExperienceCourseSurveyService", "eventLogging"], function (require, exports, ToastStore_1, mobx_1, TestPrepCourseSurveyUtil_1, TestPrepExperienceCourseSurveyService_1, TestPrepExperienceCourseSurveyService_2, eventLogging) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.asvabOnboardingStore = exports.ASVAB_COURSE_ID = exports.EXAM_SCORE_LIMIT = exports.MAX_EXAM_SCORE = exports.EXAM_FORMAT_QUESTION_VALIDATION_KEY = exports.SELECTED_MILITARY_BRANCHES_QUESTION_VALIDATION_KEY = void 0;
    exports.SELECTED_MILITARY_BRANCHES_QUESTION_VALIDATION_KEY = "selectedMilitaryBranches";
    exports.EXAM_FORMAT_QUESTION_VALIDATION_KEY = "examFormat";
    exports.MAX_EXAM_SCORE = 99;
    exports.EXAM_SCORE_LIMIT = 100;
    exports.ASVAB_COURSE_ID = 50247;
    var AsvabOnboardingStore = (function () {
        function AsvabOnboardingStore() {
            var _this = this;
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
            Object.defineProperty(this, "_asvabCourseSurvey", {
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
                    courseId: exports.ASVAB_COURSE_ID,
                    plannedExamDate: null,
                    hasTakenExam: null,
                    mostRecentExamScore: null,
                    targetExamScore: null,
                    examConfidenceLevel: null,
                    examFamiliarityLevel: null,
                }
            });
            Object.defineProperty(this, "_emailSmsOptIn", {
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
            Object.defineProperty(this, "changeMilitaryBranchSelection", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (value) {
                    if (value === "NOT_SURE") {
                        var shouldHaveNotSureSelected = !_this.asvabCourseSurvey.militaryBranches.includes(value);
                        _this._asvabCourseSurvey.militaryBranches.length = 0;
                        if (shouldHaveNotSureSelected) {
                            _this._asvabCourseSurvey.militaryBranches.push(value);
                        }
                    }
                    else if (_this._asvabCourseSurvey.militaryBranches.some(function (branch) { return branch === value; })) {
                        _this._asvabCourseSurvey.militaryBranches = _this._asvabCourseSurvey.militaryBranches.filter(function (branch) { return branch !== value; });
                    }
                    else {
                        _this._asvabCourseSurvey.militaryBranches = _this._asvabCourseSurvey.militaryBranches.filter(function (branch) { return branch !== "NOT_SURE"; });
                        _this._asvabCourseSurvey.militaryBranches.push(value);
                    }
                    _this.validateMilitaryBranches();
                }
            });
            Object.defineProperty(this, "targetExamScoreChange", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (e) {
                    _this.testPrepCourseSurvey.targetExamScore = e.target.value;
                }
            });
            Object.defineProperty(this, "hasTakenExamChange", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (hasTakenExam) {
                    _this.testPrepCourseSurvey.hasTakenExam = hasTakenExam;
                    _this.testPrepCourseSurvey.mostRecentExamScore = null;
                    _this.testPrepCourseSurvey.examFamiliarityLevel = null;
                    _this.validateExamScore(_this.testPrepCourseSurvey.mostRecentExamScore, "mostRecentExamScore", _this.invalidQuestionSet);
                    TestPrepCourseSurveyUtil_1.default.validateInput("hasTakenExam", _this.testPrepCourseSurvey.hasTakenExam, _this.invalidQuestionSet);
                    _this.invalidQuestionSet.delete("examFamiliarityLevel");
                }
            });
            Object.defineProperty(this, "examFamiliarityLevelChange", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (familiarityLevel) {
                    _this.testPrepCourseSurvey.examFamiliarityLevel = familiarityLevel;
                    if (!_this.testPrepCourseSurvey.hasTakenExam) {
                        TestPrepCourseSurveyUtil_1.default.validateInput("examFamiliarityLevel", _this.testPrepCourseSurvey.examFamiliarityLevel, _this.invalidQuestionSet);
                    }
                }
            });
            Object.defineProperty(this, "mostRecentExamScoreChange", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (e) {
                    _this.testPrepCourseSurvey.mostRecentExamScore = e.target.value;
                }
            });
            Object.defineProperty(this, "emailSmsOptInChange", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (emailSmsOptIn) {
                    _this._emailSmsOptIn = emailSmsOptIn;
                }
            });
            Object.defineProperty(this, "plannedExamDateChange", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (plannedExamDate) {
                    _this.testPrepCourseSurvey.plannedExamDate = plannedExamDate;
                    TestPrepCourseSurveyUtil_1.default.validatePlannedExamDate(_this.testPrepCourseSurvey.courseId, _this.testPrepCourseSurvey.plannedExamDate, _this.invalidQuestionSet);
                }
            });
            Object.defineProperty(this, "validateMilitaryBranches", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function () {
                    if (_this._asvabCourseSurvey.militaryBranches.length === 0) {
                        _this.invalidQuestionSet.add(exports.SELECTED_MILITARY_BRANCHES_QUESTION_VALIDATION_KEY);
                    }
                    else {
                        _this.invalidQuestionSet.delete(exports.SELECTED_MILITARY_BRANCHES_QUESTION_VALIDATION_KEY);
                    }
                }
            });
            Object.defineProperty(this, "validateExamFormat", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function () {
                    if (_this._asvabCourseSurvey.examFormat === null) {
                        _this.invalidQuestionSet.add(exports.EXAM_FORMAT_QUESTION_VALIDATION_KEY);
                    }
                    else {
                        _this.invalidQuestionSet.delete(exports.EXAM_FORMAT_QUESTION_VALIDATION_KEY);
                    }
                }
            });
            Object.defineProperty(this, "validateForm", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function () {
                    TestPrepCourseSurveyUtil_1.default.validatePlannedExamDate(_this.testPrepCourseSurvey.courseId, _this.testPrepCourseSurvey.plannedExamDate, _this.invalidQuestionSet);
                    if (!_this.testPrepCourseSurvey.hasTakenExam) {
                        TestPrepCourseSurveyUtil_1.default.validateInput("examFamiliarityLevel", _this.testPrepCourseSurvey.examFamiliarityLevel, _this.invalidQuestionSet);
                    }
                    TestPrepCourseSurveyUtil_1.default.validateInput("hasTakenExam", _this.testPrepCourseSurvey.hasTakenExam, _this.invalidQuestionSet);
                    _this.validateExamScore(_this.testPrepCourseSurvey.mostRecentExamScore, "mostRecentExamScore", _this.invalidQuestionSet);
                    if (_this.testPrepCourseSurvey.targetExamScore != null) {
                        TestPrepCourseSurveyUtil_1.default.validateExamScore(_this.testPrepCourseSurvey.targetExamScore, "targetExamScore", _this.invalidQuestionSet);
                    }
                    _this.validateMilitaryBranches();
                    _this.validateExamFormat();
                }
            });
            Object.defineProperty(this, "submitForm", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.validateForm();
                        if (this.isSubmitting || this.invalidQuestionSet.size > 0) {
                            return [2];
                        }
                        this.isSubmitting = true;
                        TestPrepExperienceCourseSurveyService_2.default.saveAsvabCourseSurveyResponses(this.testPrepCourseSurvey, this.emailSmsOptIn, this._asvabCourseSurvey)
                            .then(function (data) {
                            TestPrepExperienceCourseSurveyService_1.default.enrollInCourse(_this.testPrepCourseSurvey.courseId)
                                .then(function () {
                                _this.getCourseUri().then(function (courseUri) {
                                    window.location.replace("".concat(courseUri, "#/courseDashboard/studyGuide"));
                                    return;
                                });
                            });
                        })
                            .catch(function (error) {
                            ToastStore_1.default.showToast(ToastStore_1.ToastType.ERROR, "There was an error submitting your form. Please try again.");
                            eventLogging.logError(error, "error submitting asvab onboarding form");
                            _this.isSubmitting = false;
                        });
                        return [2];
                    });
                }); }
            });
            (0, mobx_1.makeAutoObservable)(this);
        }
        Object.defineProperty(AsvabOnboardingStore.prototype, "selectedMilitaryBranches", {
            get: function () {
                return this._asvabCourseSurvey.militaryBranches;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AsvabOnboardingStore.prototype, "examFormat", {
            get: function () {
                return this._asvabCourseSurvey.examFormat;
            },
            set: function (value) {
                this._asvabCourseSurvey.examFormat = value;
                this.validateExamFormat();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AsvabOnboardingStore.prototype, "emailSmsOptIn", {
            get: function () {
                return this._emailSmsOptIn;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AsvabOnboardingStore.prototype, "asvabCourseSurvey", {
            get: function () {
                return this._asvabCourseSurvey;
            },
            set: function (value) {
                this._asvabCourseSurvey = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AsvabOnboardingStore.prototype, "validateExamScore", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (score, examScoreType, invalidQuestionSet) {
                if (score === null) {
                    invalidQuestionSet.delete(examScoreType + "Limit");
                    return;
                }
                var parsedScore = Number(score);
                if (!parsedScore) {
                    invalidQuestionSet.add(examScoreType);
                }
                else {
                    invalidQuestionSet.delete(examScoreType);
                }
                if (!!score && parsedScore > exports.MAX_EXAM_SCORE) {
                    invalidQuestionSet.add(examScoreType + "Limit");
                }
                else {
                    invalidQuestionSet.delete(examScoreType + "Limit");
                }
            }
        });
        Object.defineProperty(AsvabOnboardingStore.prototype, "getCourseUri", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return TestPrepExperienceCourseSurveyService_2.default.getCourse(this.testPrepCourseSurvey.courseId).then(function (course) {
                    return course.uri;
                });
            }
        });
        return AsvabOnboardingStore;
    }());
    exports.asvabOnboardingStore = new AsvabOnboardingStore();
});

//# sourceMappingURL=AsvabOnboardingStore.js.map

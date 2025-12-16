define(["require", "exports", "member/info/member-info.util", "testPrep/TestPrepConstants"], function (require, exports, member_info_util_1, TestPrepConstants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.testPrepCourseSurveyUtil = exports.TestPrepCourseSurveyUtil = void 0;
    var TestPrepCourseSurveyUtil = (function () {
        function TestPrepCourseSurveyUtil() {
            Object.defineProperty(this, "MAX_EXAM_SCORE", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 10000
            });
        }
        Object.defineProperty(TestPrepCourseSurveyUtil.prototype, "validatePlannedExamDate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId, date, invalidQuestionSet, isEnrolledInCurrentCourse) {
                if (isEnrolledInCurrentCourse === void 0) { isEnrolledInCurrentCourse = false; }
                if (date == null) {
                    invalidQuestionSet.add("plannedExamDate");
                }
                else {
                    invalidQuestionSet.delete("plannedExamDate");
                    if (!this.isDateStringValid(date)) {
                        invalidQuestionSet.add("plannedExamDatePassed");
                    }
                    else {
                        invalidQuestionSet.delete("plannedExamDatePassed");
                        if (TestPrepConstants_1.TOEFL_EXAM_DEPRECATION.has(courseId) && !this.isDateStringBefore(date, TestPrepConstants_1.TOEFL_EXAM_DEPRECATION.get(courseId)) && !isEnrolledInCurrentCourse) {
                            invalidQuestionSet.add("plannedExamDateObsoleteToefl");
                        }
                        else if (TestPrepConstants_1.TOEFL_EXAM_ACTIVATION.has(courseId) && this.isDateStringBefore(date, TestPrepConstants_1.TOEFL_EXAM_ACTIVATION.get(courseId)) && !isEnrolledInCurrentCourse) {
                            invalidQuestionSet.add("plannedExamDateObsoleteToefl");
                        }
                        else {
                            invalidQuestionSet.delete("plannedExamDateObsoleteToefl");
                        }
                    }
                }
            }
        });
        Object.defineProperty(TestPrepCourseSurveyUtil.prototype, "isDateStringValid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (date) {
                if (date instanceof Date) {
                    return this.isDateValid(date);
                }
                if (TestPrepConstants_1.EXAM_WHEN_OPTIONS.find(function (option) { return option.value == date || option.text == date; })) {
                    return true;
                }
                var parsedDate = new Date(date + "T00:00");
                if (!parsedDate.getTime()) {
                    parsedDate = new Date(date);
                }
                return this.isDateValid(parsedDate);
            }
        });
        Object.defineProperty(TestPrepCourseSurveyUtil.prototype, "isDateStringBefore", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (date, beforeDate) {
                if (TestPrepConstants_1.EXAM_WHEN_OPTIONS.find(function (option) { return option.value == date || option.text == date; })) {
                    var targetDate = new Date(new Date().toDateString());
                    switch (TestPrepConstants_1.EXAM_WHEN_OPTIONS.find(function (option) { return option.value == date || option.text == date; }).value) {
                        case "two_weeks":
                            targetDate.setDate(targetDate.getDate() + 14);
                            break;
                        case "one_month":
                            targetDate.setMonth(targetDate.getMonth() + 1);
                            break;
                        case "three_months":
                            targetDate.setMonth(targetDate.getMonth() + 3);
                            break;
                        case "six_months":
                            targetDate.setMonth(targetDate.getMonth() + 6);
                            break;
                        case "one_year":
                            targetDate.setMonth(targetDate.getMonth() + 12);
                            break;
                        default:
                            return false;
                    }
                    date = targetDate;
                }
                else if (!(date instanceof Date)) {
                    date = new Date(date + "T00:00");
                }
                return date < beforeDate;
            }
        });
        Object.defineProperty(TestPrepCourseSurveyUtil.prototype, "isDateValid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (date) {
                var todayAtMidnight = new Date(new Date().toDateString());
                return date > todayAtMidnight;
            }
        });
        Object.defineProperty(TestPrepCourseSurveyUtil.prototype, "validateInput", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (propertyName, propertyValue, invalidQuestionSet, invalidValue) {
                if (propertyValue == invalidValue) {
                    invalidQuestionSet.add(propertyName);
                }
                else {
                    invalidQuestionSet.delete(propertyName);
                }
            }
        });
        Object.defineProperty(TestPrepCourseSurveyUtil.prototype, "convertScoreToCefrLevel", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (score) {
                var level = null;
                if (score != null && score >= 0) {
                    for (var _i = 0, CEFR_LEVEL_OPTIONS_1 = TestPrepConstants_1.CEFR_LEVEL_OPTIONS; _i < CEFR_LEVEL_OPTIONS_1.length; _i++) {
                        var option = CEFR_LEVEL_OPTIONS_1[_i];
                        if (option.score < score) {
                            break;
                        }
                        level = option.level;
                    }
                }
                return level;
            }
        });
        Object.defineProperty(TestPrepCourseSurveyUtil.prototype, "validateExamScore", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (score, examScoreType, invalidQuestionSet) {
                if (score === null) {
                    invalidQuestionSet.delete(examScoreType + "Limit");
                    return;
                }
                var parsedScore = Number(score);
                if (!!score && parsedScore > this.MAX_EXAM_SCORE) {
                    invalidQuestionSet.add(examScoreType + "Limit");
                }
                else {
                    invalidQuestionSet.delete(examScoreType + "Limit");
                }
            }
        });
        Object.defineProperty(TestPrepCourseSurveyUtil.prototype, "replaceHtmlTrademarkEntityWithSymbol", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (str) {
                return str.replace("&REG;", "®");
            }
        });
        Object.defineProperty(TestPrepCourseSurveyUtil.prototype, "isScoreBased", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var memberInfoUtil = member_info_util_1.MemberInfoUtil.instance();
                return !memberInfoUtil.memberInfo.accountType.includes("NCLEX");
            }
        });
        return TestPrepCourseSurveyUtil;
    }());
    exports.TestPrepCourseSurveyUtil = TestPrepCourseSurveyUtil;
    exports.testPrepCourseSurveyUtil = new TestPrepCourseSurveyUtil();
    exports.default = exports.testPrepCourseSurveyUtil;
});

//# sourceMappingURL=TestPrepCourseSurveyUtil.js.map

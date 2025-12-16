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
define(["require", "exports", "jquery", "lib/axios"], function (require, exports, $, axios_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.testPrepExperienceOnboardingService = exports.TestPrepExperienceCourseSurveyService = void 0;
    var TestPrepExperienceCourseSurveyService = (function () {
        function TestPrepExperienceCourseSurveyService() {
        }
        Object.defineProperty(TestPrepExperienceCourseSurveyService.prototype, "getCourseIfSelected", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return axios_1.default.get("/academy/register/test-prep-dashboard/get-course-if-selected.ajax")
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyService.prototype, "enrollInCourse", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                return axios_1.default.post("/academy/register/test-prep-dashboard/enroll-in-course.ajax", null, { params: { courseId: courseId } });
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyService.prototype, "isCourseNitpuxElgible", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                return axios_1.default.get("/academy/register/test-prep-dashboard/is-course-nitpux-eligible.ajax", { params: { courseId: courseId } }).then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyService.prototype, "getFormUrlEncodedHeadersConfig", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                };
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyService.prototype, "preparePostData", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (testPrepCourseSurvey, emailSmsOptIn, asvabCourseSurvey) {
                var data = __assign(__assign(__assign({}, testPrepCourseSurvey), { emailSmsOptIn: emailSmsOptIn }), asvabCourseSurvey);
                return $.param(data);
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyService.prototype, "saveAsvabCourseSurveyResponses", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (testPrepCourseSurvey, emailSmsOptIn, asvabCourseSurvey) {
                var stringifiedData = this.preparePostData(testPrepCourseSurvey, emailSmsOptIn, asvabCourseSurvey);
                var config = this.getFormUrlEncodedHeadersConfig();
                return axios_1.default.post("/academy/register/test-prep-dashboard/save-asvab-onboarding-responses.ajax", stringifiedData, config)
                    .catch(function (error) {
                    if (error.response.status === 401) {
                        window.location.replace("/academy/login.html");
                    }
                });
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyService.prototype, "saveFormResponses", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (testPrepCourseSurvey, emailSmsOptIn) {
                var stringifiedData = this.preparePostData(testPrepCourseSurvey, emailSmsOptIn);
                var config = this.getFormUrlEncodedHeadersConfig();
                return axios_1.default.post("/academy/register/test-prep-dashboard/save-onboarding-responses.ajax", stringifiedData, config)
                    .catch(function (error) {
                    if (error.response.status === 401) {
                        window.location.replace("/academy/login.html");
                    }
                });
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyService.prototype, "searchForTestPrepCourses", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (searchTerm, onlyTestSuite) {
                var config = {
                    params: {
                        searchTerm: searchTerm,
                        onlyTestSuite: onlyTestSuite
                    }
                };
                return axios_1.default.get("/member/test-prep-dashboard/search-test-prep-courses.ajax", config)
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyService.prototype, "getExamDisplayName", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return axios_1.default.get("/member/test-prep-dashboard/get-exam-display-name.ajax").then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyService.prototype, "getCourse", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = {
                    params: {
                        courseId: courseId,
                    }
                };
                return axios_1.default.get("/member/test-prep-dashboard/get-course.ajax", config)
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepExperienceCourseSurveyService.prototype, "isEnrolledInCourse", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = {
                    params: {
                        courseId: courseId,
                    }
                };
                return axios_1.default.get("/academy/register/test-prep-dashboard/is-enrolled-in-course.ajax", config)
                    .then(function (response) { return response.data; });
            }
        });
        return TestPrepExperienceCourseSurveyService;
    }());
    exports.TestPrepExperienceCourseSurveyService = TestPrepExperienceCourseSurveyService;
    exports.testPrepExperienceOnboardingService = new TestPrepExperienceCourseSurveyService();
    exports.default = exports.testPrepExperienceOnboardingService;
});

//# sourceMappingURL=TestPrepExperienceCourseSurveyService.js.map

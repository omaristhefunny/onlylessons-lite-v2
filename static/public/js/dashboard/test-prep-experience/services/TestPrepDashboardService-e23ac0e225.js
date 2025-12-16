define(["require", "exports", "lib/axios", "mobx", "util/value-pro-promise"], function (require, exports, axios_1, mobx_1, value_pro_promise_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.testPrepDashboardService = void 0;
    var TestPrepDashboardService = (function () {
        function TestPrepDashboardService() {
            Object.defineProperty(this, "slimEnrolledCourseDataValueProxy", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
            Object.defineProperty(this, "slimEnrolledCoursesValueProxy", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "recommendationValueProxy", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
            Object.defineProperty(this, "studyPrioritiesValueProxy", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
            Object.defineProperty(this, "testPrepCourseSurveysValueProxy", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "surveyEligibilityData", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
        }
        Object.defineProperty(TestPrepDashboardService.prototype, "getExamAvailability", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = { courseId: courseId };
                return axios_1.default.get("/member/test-prep-dashboard/get-exam-availability.ajax", { params: config })
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getIsInitialAssessment", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (examInstanceId) {
                var config = {
                    params: {
                        examInstanceId: examInstanceId,
                    },
                };
                return axios_1.default.get("/member/test-prep-dashboard/get-is-initial-assessment.ajax", config)
                    .then((0, mobx_1.action)(function (response) {
                    return response.data;
                }));
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "fetchExamInstanceTaxonomyBreakdown", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (examInstanceId) {
                var config = {
                    params: {
                        examInstanceId: examInstanceId,
                    },
                };
                return axios_1.default.get("/member/test-prep-dashboard/fetch-practice-results-data.ajax", config)
                    .then((0, mobx_1.action)(function (response) {
                    return response.data;
                }));
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "fetchExamInstanceTaxonomyBreakdownAsAdmin", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (examInstanceId) {
                var config = {
                    params: {
                        examInstanceId: examInstanceId,
                        isAdmin: true,
                    },
                };
                return axios_1.default.get("/member/test-prep-dashboard/fetch-practice-results-data.ajax", config)
                    .then((0, mobx_1.action)(function (response) {
                    return response.data;
                }));
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getTestPrepCourseSurveysValueProxy", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (!this.testPrepCourseSurveysValueProxy) {
                    this.testPrepCourseSurveysValueProxy = new value_pro_promise_1.default([], function () {
                        return _this.getTestPrepCourseSurveys();
                    });
                }
                return this.testPrepCourseSurveysValueProxy;
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getTestPrepCourseSurveys", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return axios_1.default.get("/member/test-prep-dashboard/get-test-prep-course-surveys.ajax")
                    .then((0, mobx_1.action)(function (response) {
                    return response.data;
                }));
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getHasAsvabCourseSurvey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return axios_1.default.get("/member/test-prep-dashboard/has-asvab-course-survey.ajax")
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getExamShortName", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = {
                    params: {
                        courseId: courseId,
                    },
                };
                return axios_1.default.get("/member/test-prep-dashboard/get-exam-short-name-for-course.ajax", config)
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "isMemberAndCourseIdEligibleForNitpuxDashboard", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = {
                    params: {
                        courseId: courseId,
                    },
                };
                return axios_1.default.get("/member/test-prep-dashboard/is-member-and-course-eligible-for-nitpux-dashboard.ajax", config)
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "isMemberAndCourseUriEligibleForNitpuxDashboard", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseUri) {
                var config = {
                    params: {
                        courseUri: courseUri,
                    },
                };
                return axios_1.default.get("/member/test-prep-dashboard/is-member-and-course-eligible-for-nitpux-dashboard.ajax", config)
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getTaxonomiesForCourseWithProgress", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseSiteResourceId, depth, taxonomyNodeType) {
                var config = {
                    params: {
                        courseSiteResourceId: courseSiteResourceId,
                        depth: depth,
                        taxonomyNodeType: taxonomyNodeType
                    }
                };
                return axios_1.default.get("/member/test-prep-dashboard/get-taxonomies-for-course-with-progress.ajax", config)
                    .then(function (response) {
                    Object.values(response.data.lessonProgressListForTaxonomyNodeId).flat().forEach(function (lp) {
                        lp.lastViewedDate = new Date(lp.lastViewedDate);
                    });
                    return response.data;
                });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getLessonsForExamTaxonomyNode", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseAcademyAssetId, maxDepth, examTaxonomyNodeId) {
                var config = {
                    params: {
                        courseAcademyAssetId: courseAcademyAssetId,
                        maxDepth: maxDepth,
                        examTaxonomyNodeId: examTaxonomyNodeId,
                    }
                };
                return axios_1.default.get("/member/test-prep-dashboard/get-taxonomy-lessons.ajax", config)
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getExamTaxonomyNodes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (examTaxonomyNodeIds) {
                return axios_1.default.post("/member/test-prep-dashboard/get-exam-taxonomy-nodes.ajax", examTaxonomyNodeIds)
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getLastActiveTopicId", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseAcademyAssetId) {
                return axios_1.default.get("/member/test-prep-dashboard/get-last-active-topic-id.ajax", { params: { courseAcademyAssetId: courseAcademyAssetId } })
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getCourseProgress", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                return axios_1.default.get("/member/test-prep-dashboard/get-course-progress.ajax", { params: { courseId: courseId } })
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "updateDateOfExam", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (dateOfExam, targetScore, testPrepCourseSurveyId) {
                var _this = this;
                return axios_1.default.put("/member/test-prep-dashboard/update-date-of-exam.ajax", undefined, { params: { dateOfExam: dateOfExam, targetScore: targetScore, testPrepCourseSurveyId: testPrepCourseSurveyId } })
                    .then(function () { return _this.getTestPrepCourseSurveysValueProxy().reloadValue(); });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getRecommendationValueProxy", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var _this = this;
                if (!this.recommendationValueProxy[courseId]) {
                    this.recommendationValueProxy[courseId] = new value_pro_promise_1.default(null, function () {
                        return _this.getRecommendation(courseId);
                    });
                }
                return this.recommendationValueProxy[courseId];
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getCourseFromExamInstance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (examInstanceId) {
                return axios_1.default.get("/member/test-prep-dashboard/get-course-from-exam-instance.ajax", { params: { examInstanceId: examInstanceId } })
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getRecommendation", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = {
                    params: {
                        courseId: courseId,
                    },
                };
                return axios_1.default.get("/member/test-prep-dashboard/get-recommendation.ajax", config)
                    .then((0, mobx_1.action)(function (response) {
                    return response.data;
                }));
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getExamInfo", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = {
                    params: {
                        courseId: courseId,
                    },
                };
                return axios_1.default.get("/member/test-prep-dashboard/get-exam-info.ajax", config)
                    .then((0, mobx_1.action)(function (response) {
                    return response.data;
                }));
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getStudyPrioritiesValueProxy", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var _this = this;
                if (!this.studyPrioritiesValueProxy[courseId]) {
                    this.studyPrioritiesValueProxy[courseId] = new value_pro_promise_1.default([], function () {
                        return _this.getStudyPriorities(courseId);
                    });
                }
                return this.studyPrioritiesValueProxy[courseId];
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "fetchCompletedTestPrepExamsCount", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = {
                    params: {
                        courseId: courseId,
                    },
                };
                return axios_1.default.get("/member/test-prep-dashboard/fetch-completed-test-prep-exams-count-for-course.ajax", config)
                    .then((0, mobx_1.action)(function (response) {
                    return response.data;
                }));
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getAllowedAcademyAssetIds", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return axios_1.default.get("/member/test-prep-dashboard/get-allowed-academy-asset-ids.ajax")
                    .then((0, mobx_1.action)(function (response) {
                    return response.data;
                }));
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getStudyPriorities", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = {
                    params: {
                        courseId: courseId,
                    },
                };
                return axios_1.default.get("/member/test-prep-dashboard/get-study-priority.ajax", config)
                    .then((0, mobx_1.action)(function (response) {
                    return response.data;
                }));
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getCurrentQuestionOrderIfDiagnostic", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = {
                    params: {
                        courseId: courseId,
                    },
                };
                return axios_1.default.get("/academy/practice/course/get-current-question-order-if-diagnostic.ajax", config)
                    .then((0, mobx_1.action)(function (response) {
                    return response.data.currentQuestionOrder;
                }));
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getSlimEnrolledCourseDataValueProxy", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var _this = this;
                if (!this.slimEnrolledCourseDataValueProxy[courseId]) {
                    this.slimEnrolledCourseDataValueProxy[courseId] = new value_pro_promise_1.default(null, function () {
                        return _this.getSlimEnrolledCourseData(courseId);
                    });
                }
                return this.slimEnrolledCourseDataValueProxy[courseId];
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getSlimEnrolledCourseData", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = {
                    params: {
                        courseId: courseId,
                    }
                };
                return axios_1.default.get("/member/test-prep-dashboard/get-slim-enrolled-course-data-for-course.ajax", config)
                    .then(function (response) {
                    return response.data;
                });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getSlimEnrolledCoursesValueProxy", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (!this.slimEnrolledCoursesValueProxy) {
                    this.slimEnrolledCoursesValueProxy = new value_pro_promise_1.default([], function () {
                        return _this.getSlimEnrolledCourses();
                    });
                }
                return this.slimEnrolledCoursesValueProxy;
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getSlimEnrolledCourses", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return axios_1.default.get("/member/test-prep-dashboard/get-slim-enrolled-courses.ajax")
                    .then(function (response) {
                    return response.data;
                });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getSurveyEligibilityProxy", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var _this = this;
                if (!this.surveyEligibilityData) {
                    this.surveyEligibilityData = new value_pro_promise_1.default(null, function () {
                        return _this.getSurveyEligibility(courseId);
                    });
                }
                return this.surveyEligibilityData;
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getSurveyEligibility", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = {
                    params: {
                        courseId: courseId,
                    },
                };
                return axios_1.default.get("/member/test-prep-dashboard/get-survey-banner-eligibility.ajax", config)
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getLicenseCodeApplied", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return axios_1.default.get("/member/test-prep-dashboard/get-applied-license-code.ajax")
                    .then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "dismissSurveyNotification", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                return axios_1.default.post("/member/test-prep-dashboard/dismiss-survey-notification.ajax", { courseId: courseId }).then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "dismissSurveyBanner", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return axios_1.default.post("/member/test-prep-dashboard/dismiss-survey-banner.ajax", {}).then(function (response) { return response.data; });
            }
        });
        Object.defineProperty(TestPrepDashboardService.prototype, "getToeflProficiency", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseId) {
                var config = {
                    params: {
                        courseId: courseId,
                    },
                };
                return axios_1.default.get("/toefl/fetch-proficiency.ajax", config).then(function (response) { return response.data; });
            }
        });
        return TestPrepDashboardService;
    }());
    exports.testPrepDashboardService = new TestPrepDashboardService();
});

//# sourceMappingURL=TestPrepDashboardService.js.map

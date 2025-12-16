define(["require", "exports", "angularDependency", "member/authentication/FeatureCheckService", "angularDependency", "angular/util/http-post-params-as-form.provider"], function (require, exports, angular, FeatureCheckService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RecentActivityService = void 0;
    exports.activityUsesIcon = activityUsesIcon;
    exports.activityUsesSvg = activityUsesSvg;
    function activityUsesIcon(activity) {
        var _a;
        var usingIcon = ACTIVITY_META_DATA[activity.type];
        return !!((_a = usingIcon.icon) === null || _a === void 0 ? void 0 : _a.trim());
    }
    function activityUsesSvg(activity) {
        var _a;
        var usingSvg = ACTIVITY_META_DATA[activity.type];
        return !!((_a = usingSvg.svgPath) === null || _a === void 0 ? void 0 : _a.trim());
    }
    var ACTIVITY_META_DATA = {
        TEXT: {
            icon: "article",
            cssClass: "lesson",
            description: "Lesson",
        },
        LESSON: {
            icon: "video_lesson",
            cssClass: "lesson",
            description: "Lesson",
        },
        VIDEO: {
            icon: "play",
            cssClass: "video",
            description: "Video",
        },
        COURSE: {
            icon: "courses",
            cssClass: "course",
            description: "Course",
        },
        ARTICLE: {
            icon: "document-small",
            cssClass: "article",
            description: "Article",
        },
        SCHOOL: {
            icon: "library",
            cssClass: "school",
            description: "School",
        },
        FORM: {
            icon: "list-ol",
            cssClass: "form-complete",
            description: "Form Complete",
        },
        FORM_INCOMPLETE: {
            icon: "warning-sign gold",
            cssClass: "form",
            description: "Form",
        },
        TEXTBOOK_COURSE: {
            icon: "literature",
            cssClass: "textbook",
            description: "Textbook Match",
        },
        TOPIC_EXAM: {
            icon: "final_exam",
            cssClass: "topic_exam",
            description: "Practice Chapter Exam",
        },
        COURSE_EXAM: {
            icon: "final_exam",
            cssClass: "course_exam",
            description: "Practice Final Exam",
        },
        FULL_LENGTH_EXAM: {
            icon: "final_exam",
            cssClass: "course_exam",
            description: "Full Length Practice Exam",
        },
        STUDY_ANSWER: {
            icon: "icon_answer",
            cssClass: "study_answer",
            description: "Answer",
        },
        SKILL_SET: {
            cssClass: "skills",
            description: "Skill",
            svgPath: "/images/icons/standardized/square/icon-skill-puzzle.svg",
        },
        LEARNING_ASSET: {
            cssClass: "skills",
            description: "Instructional Resource",
            svgPath: "/images/icons/standardized/square/icon-skill-puzzle.svg",
        },
        PRACTICE_SET: {
            cssClass: "skills",
            description: "Practice Questions",
            svgPath: "/images/icons/standardized/square/icon-skill-puzzle.svg",
        }
    };
    var module = angular.module("recent-activity.service", []);
    var RecentActivityService = (function () {
        function RecentActivityService($http, $q, httpPostParamsAsFormConfig) {
            var _this = this;
            Object.defineProperty(this, "activityMetaData", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: ACTIVITY_META_DATA
            });
            Object.defineProperty(this, "MAX_ACTIVITY_COUNT_PER_REQUEST", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 20
            });
            Object.defineProperty(this, "$http", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "$q", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "httpPostParamsAsFormConfig", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "activities", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "featureEnabledMap", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.$http = $http;
            this.$q = $q;
            this.httpPostParamsAsFormConfig = httpPostParamsAsFormConfig;
            this.activities = [];
            FeatureCheckService_1.featureCheckService.getAllFeatures().then(function (featuresEnabledMap) {
                _this.featureEnabledMap = featuresEnabledMap;
            });
        }
        Object.defineProperty(RecentActivityService.prototype, "getActivityDescription", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (activity) {
                if (activity.type === "PRACTICE_SET") {
                    if (activity.uri.indexOf("/practice/course") !== -1) {
                        return "Practice Questions";
                    }
                }
                if (activity.type === "TOPIC_EXAM" && this.featureEnabledMap["FEATURE_COLLEGE_LEARNER_USER_EXPERIENCE"]) {
                    return "Chapter Exam";
                }
                return this.activityMetaData[activity.type].description;
            }
        });
        Object.defineProperty(RecentActivityService.prototype, "getActivities", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (config) {
                var _this = this;
                var offset = config.offset || 0;
                var count = Math.min(config.count, this.MAX_ACTIVITY_COUNT_PER_REQUEST);
                return this.$q(function (resolve) {
                    if (count + offset <= _this.activities.length) {
                        resolve(_this.activities.slice(offset, count + offset));
                    }
                    else {
                        var url = RecentActivityService.getActivityEndpointURL(config);
                        _this.$http.get(url)
                            .then(function (response) {
                            var data = response.data;
                            if (data && data.length > 0) {
                                this.addActivities(data, count, offset);
                                resolve(this.activities.slice(offset, count + offset));
                            }
                            else {
                                resolve([]);
                            }
                        }.bind(_this));
                    }
                });
            }
        });
        ;
        Object.defineProperty(RecentActivityService, "getActivityEndpointURL", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (config) {
                var url = undefined;
                if (config.withCourseData) {
                    url = "/member/activity/getMemberActivityWithCourseData.ajax";
                }
                else if (config.withImages) {
                    url = "/member/activity/getMemberActivityWithImages.ajax";
                }
                else {
                    url = "/member/activity/getMemberActivity.ajax";
                }
                url += "?count=" + config.count;
                if (config.type) {
                    url += '&type=' + config['type'];
                }
                if (config.offset) {
                    url += "&offset=" + config.offset;
                }
                if (config.withFullUri) {
                    url += "&withFullUri=" + config.withFullUri;
                }
                return url;
            }
        });
        Object.defineProperty(RecentActivityService.prototype, "addActivities", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (activities, count, offset) {
                for (var o = 0; o < offset; o++) {
                    if (o >= this.activities.length) {
                        this.activities.push(null);
                    }
                }
                for (var c = 0; c < count; c++) {
                    if (activities[c]) {
                        if (c >= this.activities.length) {
                            this.activities.push(activities[c]);
                        }
                        else if (!this.activities[offset + c].imageUri) {
                            this.activities[offset + c] = activities[c];
                        }
                    }
                }
            }
        });
        ;
        Object.defineProperty(RecentActivityService.prototype, "logCourseAsViewed", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courseAcademyAssetId) {
                var data = {
                    courseAcademyAssetId: courseAcademyAssetId
                };
                this.$http.post("/member/activity/logCourseAsViewed.ajax", data, this.httpPostParamsAsFormConfig);
            }
        });
        Object.defineProperty(RecentActivityService, "$inject", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ['$http', '$q', 'httpPostParamsAsFormConfig']
        });
        return RecentActivityService;
    }());
    exports.RecentActivityService = RecentActivityService;
    module.service("RecentActivityService", RecentActivityService);
});

//# sourceMappingURL=recent-activity.service.js.map

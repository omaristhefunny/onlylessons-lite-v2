"use strict";
(function () {
    var windowWithWistia = window;
    require(["jquery", "eventLogging", "video/remVideo"], function ($, eventLogging, RemVideo) {
        windowWithWistia._wq = windowWithWistia._wq || [];
        windowWithWistia._wistiaVideos = windowWithWistia._wistiaVideos || [];
        windowWithWistia._wq.push({
            id: "_all", onReady: function (video) {
                var videoLoadReadyEvent = new eventLogging.LoggableEvent("videoLoad", false);
                eventLogging.queueEvent(videoLoadReadyEvent);
            }
        });
        windowWithWistia._wq.push({
            id: "_all",
            options: {
                plugin: {
                    "captions-v1": {
                        onByDefault: false,
                        language: 'eng'
                    }
                }
            }
        });
        var feedbackElement = document.querySelector("skills-video-feedback");
        if (feedbackElement != null) {
            var embedId_1 = feedbackElement.getAttribute("data-wistiaid");
            require(["feedback/SkillsVideoFeedbackViews"], function (SkillsVideoFeedbackViews) {
                windowWithWistia._wq.push({
                    id: embedId_1, onReady: function (video) {
                        SkillsVideoFeedbackViews.loadAndInitializePlugin(video, feedbackElement);
                    }
                });
            });
        }
        var postRollElement = document.querySelector("#todoPostRoll");
        if (postRollElement) {
            var embedId_2 = postRollElement.getAttribute("data-wistiaid");
            var todoItemId_1 = parseInt(postRollElement.getAttribute("data-todo-item-id"));
            if (isNaN(todoItemId_1)) {
                todoItemId_1 = null;
            }
            var nextTodoItemUrl_1 = postRollElement.getAttribute("data-next-todo-item-url");
            var nextTodoItemTitle_1 = postRollElement.getAttribute("data-next-todo-item-title");
            var nextTodoItemType_1 = postRollElement.getAttribute("data-next-todo-item-type");
            var nextCourseItemUrl_1 = postRollElement.getAttribute("data-next-course-item-url");
            var nextCourseItemTitle_1 = postRollElement.getAttribute("data-next-course-item-title");
            var nextCourseItemType_1 = postRollElement.getAttribute("data-next-course-item-type");
            require(["academy/lesson/video/post-roll/LessonVideoTodoPostRollViews"], function (LessonVideoTodoPostRollViews) {
                windowWithWistia._wq.push({
                    id: embedId_2, onReady: function (video) {
                        LessonVideoTodoPostRollViews.loadAndInitializePlugin(video, postRollElement, todoItemId_1, nextTodoItemTitle_1, nextTodoItemUrl_1, nextTodoItemType_1, nextCourseItemTitle_1, nextCourseItemUrl_1, nextCourseItemType_1);
                    }
                });
            });
        }
        windowWithWistia._wq.push({
            id: "_all", onReady: function (video) {
                windowWithWistia._wistiaVideos.push(video);
                var event = document.createEvent("CustomEvent");
                event.initCustomEvent("wistiaVideoReady", true, false, { video: video });
                document.dispatchEvent(event);
            }
        });
        windowWithWistia._wq.push({
            id: "_all", onReady: function (video) {
                var _a;
                try {
                    var wistiaVideoCaption = document.querySelector('.wistia_embed .notranslate');
                    if (wistiaVideoCaption) {
                        (_a = wistiaVideoCaption === null || wistiaVideoCaption === void 0 ? void 0 : wistiaVideoCaption.classList) === null || _a === void 0 ? void 0 : _a.remove('notranslate');
                    }
                }
                catch (e) { }
            }
        });
        $(document).ready(function () {
            $('.wistia_embed:not(.no-rem-video)').each(function () {
                var embedElement = $(this);
                var wistiaId = embedElement.attr('data-wistiaid');
                var options = embedElement.data('wistiaoptions');
                var features = embedElement.data();
                if (RemVideo) {
                    new RemVideo(wistiaId, options, features, this);
                }
            });
        });
    });
})();

//# sourceMappingURL=initEmbeds.js.map

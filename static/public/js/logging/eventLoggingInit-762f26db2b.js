"use strict";
(function () {
    'use strict';
    require(['lib/underscore', 'eventLogging', 'logging/visible/visibility-tester', 'lib/web-vitals'], init);
    function init(_, eventLogging, VisibilityTesterModule, webMetrics) {
        function handleClickEvent(event) {
            if (eventLogging.whichButton(event) !== 'RIGHT') {
                eventLogging.processDOMEvent(event);
            }
        }
        function onReady() {
            eventLogging.init();
            var uiEvents = {
                click: handleClickEvent,
                focus: eventLogging.processDOMEvent.bind(eventLogging),
                blur: eventLogging.processDOMEvent.bind(eventLogging),
                change: eventLogging.processDOMEvent.bind(eventLogging)
            };
            Object.keys(uiEvents).forEach(function (key) {
                document.body.addEventListener(key, uiEvents[key], true);
            });
            var customEvents = ['stripeError', 'regError', 'videoEvent', 'fullscreenEvent', 'barShown', 'videoToolbarEvent', 'videoLoad', 'qualarooShown', 'qualarooClosed', 'regFormModalError', 'videoPlayEvent', 'debugInfo', 'braintreeError', 'ssrHydrationError'];
            function handleCustomEvent(event) {
                var eventDetail = eventLogging.LoggableEvent.new(event.type);
                Object.keys(event.detail).forEach(function (key) { eventDetail[key] = event.detail[key]; });
                eventLogging.queueEvent(eventDetail);
            }
            customEvents.forEach(function (key) {
                document.addEventListener(key, handleCustomEvent.bind(this), true);
            });
            var visibilityTester = new VisibilityTesterModule.VisibilityTester();
            visibilityTester.addElementsToCheck(Array.prototype.slice.call(document.querySelectorAll("[data-track-visible]")));
            visibilityTester.start();
            var processMutations = function () {
                while (outstandingMutations.length > 0) {
                    var mutation = outstandingMutations.pop();
                    if (mutation.type === "childList") {
                        mutation.addedNodes.forEach(function (node) {
                            if (shouldTrack(node)) {
                                visibilityTester.addElementToCheck(node);
                            }
                            if (node['querySelectorAll']) {
                                node.querySelectorAll("[data-track-visible]").forEach(function (el) {
                                    if (shouldTrack(el)) {
                                        visibilityTester.addElementToCheck(el);
                                    }
                                });
                            }
                        });
                        mutation.removedNodes.forEach(function (node) {
                            if (shouldTrack(node)) {
                                visibilityTester.removeElementToCheck(node);
                            }
                            if (node['querySelectorAll']) {
                                node.querySelectorAll("[data-track-visible]").forEach(function (el) {
                                    if (shouldTrack(el)) {
                                        visibilityTester.removeElementToCheck(el);
                                    }
                                });
                            }
                        });
                    }
                    else if (mutation.type === "attributes") {
                        var element = mutation.target;
                        if (mutation.attributeName === "data-cname") {
                            if (mutation.oldValue) {
                                visibilityTester.removeElementToCheck(element, mutation.oldValue);
                            }
                            if (shouldTrack(element)) {
                                visibilityTester.addElementToCheck(element);
                            }
                        }
                        else if (mutation.attributeName === "data-track-visible") {
                            if (shouldTrack(element)) {
                                visibilityTester.addElementToCheck(element);
                            }
                            else {
                                visibilityTester.removeElementToCheck(element);
                            }
                        }
                    }
                }
            };
            var outstandingMutations = [];
            var shouldTrack = VisibilityTesterModule.VisibilityTester.isValidToCheck;
            var elvisObserver = new MutationObserver(function (mutations) {
                outstandingMutations.push.apply(outstandingMutations, mutations);
                requestAnimationFrame(processMutations);
            });
            elvisObserver.observe(document, {
                subtree: true,
                childList: true,
                attributes: true,
                attributeFilter: ["data-cname", "data-track-visible"],
                attributeOldValue: true,
            });
        }
        if (document.readyState !== 'loading') {
            onReady();
        }
        else {
            document.addEventListener('DOMContentLoaded', onReady, false);
        }
        window.globalUtils.handleErrorEvent = function (loggableEvent) {
            loggableEvent.loggerType = "javascriptError-postEventTracking";
            eventLogging.queueEvent(loggableEvent);
        };
        window.addEventListener("load", function () {
            if (!window.performance || !window.performance.timing || !window.performance.navigation) {
                return;
            }
            setTimeout(function () {
                var _a, _b;
                var loggableEvent = eventLogging.LoggableEvent.new("pageLoad");
                loggableEvent.timing = window.performance.timing;
                loggableEvent.redirectCount = window.performance.navigation.redirectCount;
                loggableEvent.navigationType = eventLogging.getNavigationType(window.performance.navigation.type);
                loggableEvent.initialScrollPixels = window.scrollY;
                try {
                    loggableEvent.urlWithAnchor = (_a = window.performance.getEntries().filter(function (_a) {
                        var entryType = _a.entryType;
                        return entryType === 'navigation';
                    })[0]) === null || _a === void 0 ? void 0 : _a.name;
                }
                catch (e) {
                    loggableEvent.urlWithAnchor = "ERROR_GETTING_URL_WITH_ANCHOR";
                }
                try {
                    var PaintPerformance = window.PaintPerformance;
                    if (PaintPerformance) {
                        loggableEvent.paintTiming = {};
                        PaintPerformance.queue.forEach(function (entry) {
                            loggableEvent.paintTiming[entry.name] = Math.round(entry.startTime + entry.duration);
                        });
                        PaintPerformance.observer.disconnect();
                    }
                }
                catch (e) {
                }
                eventLogging.queueEvent(loggableEvent);
                var loggableEventMetrics = eventLogging.LoggableEvent.new("metrics");
                var wp = window.performance;
                loggableEventMetrics.metrics = {
                    eventUrl: window.location.href
                };
                var timing = wp.timing;
                var addPerformanceTimingDuration = function (metrics, metricsKey, timingKey) {
                    if (timing.navigationStart > 0 && timing[timingKey] > 0) {
                        var t = timing[timingKey] - timing.navigationStart;
                        if (t > 0 && t < 60000) {
                            metrics[metricsKey] = t;
                        }
                    }
                };
                try {
                    addPerformanceTimingDuration(loggableEventMetrics.metrics, "req_s", "requestStart");
                    addPerformanceTimingDuration(loggableEventMetrics.metrics, "res_s", "responseStart");
                    addPerformanceTimingDuration(loggableEventMetrics.metrics, "res_e", "responseEnd");
                    addPerformanceTimingDuration(loggableEventMetrics.metrics, "di", "domInteractive");
                    addPerformanceTimingDuration(loggableEventMetrics.metrics, "dcl_s", "domContentLoadedEventStart");
                    addPerformanceTimingDuration(loggableEventMetrics.metrics, "dcl_e", "domContentLoadedEventEnd");
                    addPerformanceTimingDuration(loggableEventMetrics.metrics, "dc", "domComplete");
                    addPerformanceTimingDuration(loggableEventMetrics.metrics, "le_e", "loadEventEnd");
                    loggableEventMetrics.viewportWidth = window.innerWidth;
                    loggableEventMetrics.viewportHeight = window.innerHeight;
                    loggableEventMetrics._sv = (_b = (document.cookie || "").match(/\b_sv=(\w*)\b/)) === null || _b === void 0 ? void 0 : _b[1];
                }
                catch (e) {
                }
                loggableEventMetrics.redirectCount = wp.redirectCount;
                eventLogging.queueEvent(loggableEventMetrics);
            }, 100);
            var secondsOnPageDelays = [10, 30, 60, 300, 600];
            secondsOnPageDelays.forEach(function (delay) {
                setTimeout(function () {
                    var e = eventLogging.LoggableEvent.new("timeOnPage");
                    e.secondsSincePageLoad = delay;
                    eventLogging.queueEvent(e);
                }, delay * 1000);
            });
        }, true);
        function googleMetricEvent(metric) {
            var _a, _b;
            var event = eventLogging.LoggableEvent.new("debugInfo");
            event.subType = "googleMetrics";
            event.name = metric.name;
            event.isCoreVital = ["INP", "CLS", "LCP"].includes(metric.name);
            event.rating = metric.rating;
            event.value = metric.value;
            event.navigationType = metric.navigationType;
            var element = (_b = (_a = metric.entries) === null || _a === void 0 ? void 0 : _a.filter((function (e) { return e.element; }))[0]) === null || _b === void 0 ? void 0 : _b.element;
            if (element) {
                eventLogging.addElementInfoToEventDetail(event, element);
            }
            eventLogging.queueEvent(event);
        }
        try {
            webMetrics.onLCP(googleMetricEvent);
            webMetrics.onFCP(googleMetricEvent);
            webMetrics.onTTFB(googleMetricEvent);
            webMetrics.onINP(googleMetricEvent);
            webMetrics.onCLS(googleMetricEvent);
        }
        catch (e) {
            eventLogging.logError(e, "web-vitals-init-fail");
        }
        var HeroTracking = window.HeroTracking;
        if (HeroTracking && window.performance && window.performance.timing && window.performance.timing.navigationStart) {
            var queue = HeroTracking.queue;
            var navigationStart = window.performance.timing.navigationStart;
            setInterval(function () {
                while (queue.length > 0) {
                    var heroEvent = queue.shift();
                    var loggableEvent = eventLogging.LoggableEvent.new("heroEvent");
                    eventLogging.addElementInfoToEventDetail(loggableEvent, heroEvent.element);
                    loggableEvent.heroType = heroEvent.type;
                    loggableEvent.heroTimestamp = heroEvent.timestamp.getTime() - navigationStart;
                    loggableEvent.boundingClientRect = heroEvent.boundingClientRect;
                    var extraData = heroEvent.extraData;
                    for (var i in extraData) {
                        if (extraData.hasOwnProperty(i) && i !== "eventType") {
                            loggableEvent[i] = extraData[i];
                        }
                    }
                    eventLogging.queueEvent(loggableEvent);
                }
            }, 1000);
        }
        {
            var nextThrottledEventDate_1 = new Date(0);
            var logPrintPreview_1 = function (event) {
                var now = new Date();
                if (nextThrottledEventDate_1 <= now) {
                    var printEvent = eventLogging.LoggableEvent.new("printPreview");
                    eventLogging.queueEvent(printEvent);
                    nextThrottledEventDate_1 = new Date(now.getTime() + 30 * 1000);
                }
            };
            var mql = window.matchMedia("print");
            var mqlHandler = function (event) {
                if (event.matches) {
                    logPrintPreview_1(event);
                }
            };
            if (mql.addEventListener) {
                mql.addEventListener("change", mqlHandler);
            }
            else if (mql.addListener) {
                mql.addListener(mqlHandler);
            }
            window.addEventListener("beforeprint", logPrintPreview_1);
        }
        if (typeof window.sessionStorage !== "undefined" && !window.sessionStorage.browserfp) {
            window.addEventListener("load", function () {
                var hash = function (input) {
                    var hash = 0;
                    for (var i = 0; i < input.length; i++) {
                        var char = input.charCodeAt(i);
                        hash = ((hash << 5) - hash) + char;
                        hash = hash & hash;
                    }
                    return hash;
                };
                require(['logging/fpjs/umd'], function (fpjs) {
                    var fpPromise = fpjs.load();
                    fpPromise
                        .then(function (fp) { return fp.get(); })
                        .then(function (result) {
                        result.components.canvas.value.geometry = hash(result.components.canvas.value.geometry);
                        result.components.canvas.value.text = hash(result.components.canvas.value.text);
                        var e = eventLogging.LoggableEvent.new("browserfp");
                        e.data = result;
                        eventLogging.queueEvent(e);
                        window.sessionStorage.browserfp = 1;
                    });
                });
            });
        }
    }
})();

//# sourceMappingURL=eventLoggingInit.js.map

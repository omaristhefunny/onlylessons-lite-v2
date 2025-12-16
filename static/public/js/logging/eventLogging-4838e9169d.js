define(["require", "exports"], function (require, exports) {
    "use strict";
    var EventLoggingQueue = (function () {
        function EventLoggingQueue() {
            Object.defineProperty(this, "READY_STATE_DONE", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 4
            });
            Object.defineProperty(this, "memoryQueue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
        }
        Object.defineProperty(EventLoggingQueue.prototype, "queueEvent", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (eventDetail) {
                var uuid = eventDetail.javascriptUUID;
                var stringified;
                try {
                    stringified = JSON.stringify(eventDetail);
                }
                catch (e) {
                    stringified = this._stringifyEvents(eventDetail);
                }
                this.memoryQueue[uuid] = stringified;
                if (typeof window.sessionStorage !== "undefined") {
                    try {
                        window.sessionStorage.setItem("et-" + uuid, stringified);
                    }
                    catch (e) {
                    }
                }
            }
        });
        Object.defineProperty(EventLoggingQueue.prototype, "start", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                setTimeout(this._flushStorageQueue.bind(this), 100);
                setTimeout(function () {
                    setInterval(this._flushStorageQueue.bind(this), 5000);
                }.bind(this), 500);
                setInterval(this._flushMemoryQueue.bind(this), 1000);
                document.addEventListener("visibilitychange", function () {
                    if (document.visibilityState === "hidden") {
                        this._flushStorageQueue();
                        this._flushMemoryQueue();
                    }
                }.bind(this));
                window.addEventListener("pagehide", function () {
                    this._flushStorageQueue();
                    this._flushMemoryQueue();
                }.bind(this));
            }
        });
        Object.defineProperty(EventLoggingQueue.prototype, "_flushMemoryQueue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (Object.keys(this.memoryQueue).length > 0) {
                    this._sendEvents(this.memoryQueue);
                }
            }
        });
        Object.defineProperty(EventLoggingQueue.prototype, "_flushStorageQueue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (typeof window.sessionStorage !== "undefined") {
                    var events = {};
                    for (var keyIndex = 0; keyIndex < sessionStorage.length; keyIndex++) {
                        var key = sessionStorage.key(keyIndex);
                        var keyMatch = key.match(/^et-(.*)/);
                        if (!keyMatch) {
                            continue;
                        }
                        events[keyMatch[1]] = sessionStorage.getItem(key);
                    }
                    if (Object.keys(events).length > 0) {
                        this._sendEvents(events);
                    }
                }
            }
        });
        Object.defineProperty(EventLoggingQueue.prototype, "_stringifyEvents", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (events) {
                var cache = [];
                JSON.stringify(events, function (key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (cache.indexOf(value) !== -1) {
                            return "backReference";
                        }
                        cache.push(value);
                    }
                    return value;
                });
                cache = null;
            }
        });
        Object.defineProperty(EventLoggingQueue.prototype, "_sendEvents", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (eventsObject) {
                var uuids = Object.keys(eventsObject);
                var events = [];
                for (var i = 0; i < uuids.length; i++) {
                    events.push(eventsObject[uuids[i]]);
                }
                if (window.globalUtils.logLimit > 0) {
                    window.globalUtils.logLimit--;
                    if (isRemoteSite(window.location.host)) {
                        this._sendEventsWithHttpRequest(events, uuids);
                    }
                    else {
                        this._sendEventsWithBeacon(events, uuids);
                    }
                }
            }
        });
        Object.defineProperty(EventLoggingQueue.prototype, "_sendEventsWithBeacon", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (events, uuids) {
                var payloadChunkSize = 5;
                this._markSent(uuids);
                for (var i = 0; i < events.length; i += payloadChunkSize) {
                    var eventChunk = events.slice(i, i + payloadChunkSize);
                    var eventChunkData = "[" + eventChunk.join(",") + "]";
                    navigator.sendBeacon("/eventLogger/eventLog.ajax", eventChunkData);
                }
            }
        });
        Object.defineProperty(EventLoggingQueue.prototype, "_sendEventsWithHttpRequest", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (events, uuids) {
                var request = new XMLHttpRequest();
                request.withCredentials = true;
                request.open("POST", "https://study.com/eventLogger/eventLog.ajax");
                request.setRequestHeader("Referrer-Policy", "no-referrer-when-downgrade");
                request.setRequestHeader("Content-Type", "application/json");
                request.onreadystatechange = function () {
                    if (request.readyState === this.READY_STATE_DONE && request.status >= 200 && request.status < 300) {
                        this._markSent(uuids);
                    }
                }.bind(this);
                request.send("[" + events.join(",") + "]");
            }
        });
        Object.defineProperty(EventLoggingQueue.prototype, "_markSent", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (uuids) {
                for (var i = 0; i < uuids.length; i++) {
                    var uuid = uuids[i];
                    delete this.memoryQueue[uuid];
                    if (typeof window.sessionStorage !== "undefined") {
                        try {
                            sessionStorage.removeItem("et-" + uuid);
                        }
                        catch (e) {
                        }
                    }
                }
            }
        });
        return EventLoggingQueue;
    }());
    var EventLogging = (function () {
        function EventLogging() {
            Object.defineProperty(this, "queue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: new EventLoggingQueue()
            });
            Object.defineProperty(this, "debug", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "cNameAttr", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: "cname"
            });
            Object.defineProperty(this, "extraDataAttr", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: "extra"
            });
            Object.defineProperty(this, "NO_LOG_VALUE", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: "NO_LOG_VALUE"
            });
            Object.defineProperty(this, "TRUNCATED", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: "truncated"
            });
            Object.defineProperty(this, "fieldErrorList", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
            Object.defineProperty(this, "verifiedHumanity", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "LoggableEvent", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: LoggableEvent
            });
        }
        Object.defineProperty(EventLogging.prototype, "newLoggableEvent", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (eventType) {
                return LoggableEvent.new(eventType);
            }
        });
        Object.defineProperty(EventLogging.prototype, "logError", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (error, type, mutator) {
                window.globalUtils.logError(error, type, mutator);
            }
        });
        Object.defineProperty(EventLogging.prototype, "init", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.queue.start();
            }
        });
        Object.defineProperty(EventLogging.prototype, "queueEvent", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (eventDetail) {
                this.queue.queueEvent(eventDetail);
            }
        });
        Object.defineProperty(EventLogging.prototype, "verifyHumanity", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.verifiedHumanity) {
                    var request = new XMLHttpRequest();
                    if (isRemoteSite(window.location.host)) {
                        request.withCredentials = true;
                        request.open("POST", "https://study.com/usr/usrpost.xyz");
                    }
                    else {
                        request.open("POST", "/usr/usrpost.xyz");
                    }
                    request.send();
                    this.verifiedHumanity = true;
                }
            }
        });
        Object.defineProperty(EventLogging.prototype, "addElementInfoToEventDetail", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (eventDetail, el, cnameOverride) {
                var lastPath = null;
                var paths = this.getPathsTo(el, lastPath, cnameOverride);
                if (paths.xPath && paths.xPath.length > 0) {
                    eventDetail.xPath = '/html/' + paths.xPath.reverse().join('/');
                }
                else {
                    eventDetail.xPath = '/html';
                }
                eventDetail.canonicalPath = (paths.canonicalPath.length > 0) ? paths.canonicalPath : null;
                eventDetail.xmlNode = {};
                eventDetail.xmlNode.xmlNodeName = el.nodeName;
                if (el.value) {
                    eventDetail.xmlNode.xmlNodeValue = !this.isNoLogValue(el) ? el.value : this.NO_LOG_VALUE;
                }
                if (el.innerHTML) {
                    eventDetail.xmlNode.xmlNodeText = (el.innerHTML.length <= 512) ? el.innerHTML : this.TRUNCATED;
                }
                eventDetail.xmlNode.xmlNodeAttributes = {};
                if (el.attributes) {
                    for (var i = 0; i < el.attributes.length; i++) {
                        var a = el.attributes[i];
                        if (a.specified) {
                            eventDetail.xmlNode.xmlNodeAttributes[a.name] = a.value.length <= 512 ? a.value : this.TRUNCATED;
                        }
                    }
                }
                this.addSelectOptionDataToDataExtraIfApplicable(eventDetail, el);
            }
        });
        Object.defineProperty(EventLogging.prototype, "addSelectOptionDataToDataExtraIfApplicable", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (eventDetail, element) {
                if (element.tagName.toLowerCase() !== "select"
                    || !element.hasAttribute("data-add-option-data-to-data-extra")
                    || !element.hasAttribute("data-cname")
                    || eventDetail.canonicalPath == null
                    || eventDetail.canonicalPath.length == 0) {
                    return;
                }
                var selectElement = element;
                if (typeof selectElement.options === "undefined") {
                    return;
                }
                var options = selectElement.options;
                if (selectElement.options.length === 0 || options.selectedIndex == null) {
                    return;
                }
                var selectedOption = options[options.selectedIndex];
                if (selectedOption == null) {
                    return;
                }
                var label = selectedOption.label;
                var value = selectedOption.value;
                var firstCanonicalPathNode = eventDetail.canonicalPath[0];
                firstCanonicalPathNode.extraData = { "label": label, "value": value };
            }
        });
        Object.defineProperty(EventLogging.prototype, "processDOMEvent", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event) {
                this.verifyHumanity();
                var el = event.target;
                var eventDetail = LoggableEvent.new(event.type);
                if (el && el !== document) {
                    this.addElementInfoToEventDetail(eventDetail, el);
                }
                eventDetail.scrollCoordinate = this.getScrollCoordinate();
                eventDetail.viewportSize = this.getViewPortSize();
                if (eventDetail.eventType === 'click') {
                    this.addClickEventData(event, eventDetail);
                }
                eventDetail.url = window.location.href;
                eventDetail.fieldErrorList = this.fieldErrorList;
                this.fieldErrorList = {};
                this.queue.queueEvent(eventDetail);
            }
        });
        Object.defineProperty(EventLogging.prototype, "isNoLogValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (el) {
                if (el.getAttribute("data-no-log") === null) {
                    return false;
                }
                else if (el.getAttribute("data-no-log") === "false") {
                    return false;
                }
                else {
                    return true;
                }
            }
        });
        Object.defineProperty(EventLogging.prototype, "getScrollCoordinate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return {
                    x: Math.floor(window.pageXOffset),
                    y: Math.floor(window.pageYOffset)
                };
            }
        });
        Object.defineProperty(EventLogging.prototype, "getViewPortSize", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return {
                    x: Math.floor(window.innerWidth),
                    y: Math.floor(window.innerHeight)
                };
            }
        });
        Object.defineProperty(EventLogging.prototype, "addClickEventData", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event, eventDetail) {
                eventDetail.clickCoordinate = {
                    x: Math.floor(event.pageX),
                    y: Math.floor(event.pageY)
                };
                eventDetail.clientCoordinate = {
                    x: Math.floor((event.clientX) ? event.clientX : ((event.originalEvent) ? event.originalEvent.clientX : null)),
                    y: Math.floor((event.clientY) ? event.clientY : ((event.originalEvent) ? event.originalEvent.clientY : null))
                };
                eventDetail.mouseButtonName = this.whichButton(event);
                eventDetail.mouseButtonValue = this.whichButtonValue(event);
            }
        });
        Object.defineProperty(EventLogging.prototype, "handleCanonicalPathMember", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (el, lastPath, cnameOverride) {
                var cname;
                if (cnameOverride) {
                    cname = cnameOverride;
                }
                else {
                    cname = el.getAttribute("data-" + this.cNameAttr);
                }
                if (cname) {
                    var pair = {
                        canonicalValue: cname,
                        extraData: el.getAttribute("data-" + this.extraDataAttr)
                    };
                    lastPath.canonicalPath.push(pair);
                }
            }
        });
        Object.defineProperty(EventLogging.prototype, "getSiblingIndexOfElement", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (el) {
                var childrenOfParent = (el.parentNode) ? el.parentNode.childNodes : [];
                var indexAmongSiblings = 0;
                for (var i = 0; i < childrenOfParent.length; i++) {
                    var currentChild = childrenOfParent[i];
                    if (currentChild === el) {
                        return indexAmongSiblings;
                    }
                    var elementNode = (typeof Node !== 'undefined') ? Node.ELEMENT_NODE : 1;
                    if (currentChild.nodeType === elementNode && currentChild.tagName === el.tagName) {
                        indexAmongSiblings++;
                    }
                }
                return null;
            }
        });
        Object.defineProperty(EventLogging.prototype, "getPathsTo", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (el, lastPath, cnameOverride) {
                var _a;
                if (!lastPath) {
                    lastPath = {
                        xPath: [],
                        canonicalPath: []
                    };
                }
                var tagName = el.tagName;
                if (tagName && tagName.toLowerCase() === "html") {
                    return lastPath;
                }
                if (tagName && tagName.toLowerCase() === "body") {
                    lastPath.xPath.push(tagName);
                    this.handleCanonicalPathMember(el, lastPath, cnameOverride);
                    return lastPath;
                }
                if (el.id) {
                    lastPath.xPath.push(tagName + '[@id="' + el.id + '"]');
                    this.handleCanonicalPathMember(el, lastPath, cnameOverride);
                    return this.getPathsTo(el.parentNode, lastPath);
                }
                else {
                    if (!el.parentNode) {
                        var errMsg = "Race Condition Fail in DOM scan- el no longer has a defined parent";
                        this.addFieldError("xPath", errMsg);
                        lastPath.xPath.push(tagName);
                        try {
                            this.handleCanonicalPathMember(el, lastPath, cnameOverride);
                        }
                        catch (e) {
                            var errMsg_1 = (_a = e === null || e === void 0 ? void 0 : e.toString()) !== null && _a !== void 0 ? _a : "Unable to read cname attribute";
                            this.addFieldError("handleCanonicalPathMember", errMsg_1);
                        }
                        return lastPath;
                    }
                    else {
                        var indexAmongSiblings = this.getSiblingIndexOfElement(el);
                        if (indexAmongSiblings !== null) {
                            lastPath.xPath.push(tagName + '[' + (indexAmongSiblings + 1) + ']');
                            this.handleCanonicalPathMember(el, lastPath, cnameOverride);
                            return this.getPathsTo(el.parentNode, lastPath);
                        }
                    }
                }
            }
        });
        Object.defineProperty(EventLogging.prototype, "addFieldError", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key, errorMessage) {
                if (this.fieldErrorList[key]) {
                    this.fieldErrorList[key].push(errorMessage);
                }
                else {
                    this.fieldErrorList[key] = [errorMessage];
                }
            }
        });
        Object.defineProperty(EventLogging.prototype, "log", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (logThis) {
                if (this.debug) {
                    if (!window.console || !window.console.log) {
                        window.console = {
                            log: function () {
                            }
                        };
                    }
                    console.log(logThis);
                }
            }
        });
        Object.defineProperty(EventLogging.prototype, "whichButton", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event) {
                var button;
                event = event || window.event;
                if (event.which === null) {
                    button = (event.button < 2) ? 'LEFT' :
                        ((event.button === 4) ? 'MIDDLE' : 'RIGHT');
                }
                else {
                    button = (event.which < 2) ? 'LEFT' :
                        ((event.which === 2) ? 'MIDDLE' : 'RIGHT');
                }
                return button;
            }
        });
        Object.defineProperty(EventLogging.prototype, "whichButtonValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event) {
                event = event || window.event;
                return (event.which === null) ? event.button : event.which;
            }
        });
        Object.defineProperty(EventLogging.prototype, "getNavigationType", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (typeInt) {
                if (typeInt === 0) {
                    return 'NAVIGATE';
                }
                else if (typeInt === 1) {
                    return 'RELOAD';
                }
                else if (typeInt === 2) {
                    return 'BACK_FORWARD';
                }
                else {
                    return null;
                }
            }
        });
        Object.defineProperty(EventLogging.prototype, "truncateText", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (text, maxLength) {
                return window.globalUtils.truncateText(text, maxLength);
            }
        });
        return EventLogging;
    }());
    var LoggableEvent = (function () {
        function LoggableEvent(eventType, deprecatedLogToSplunk) {
            Object.defineProperty(this, "eventType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "javascriptUUID", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: window.globalUtils.generateGuid()
            });
            Object.defineProperty(this, "javascriptTimestamp", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: new Date().getTime()
            });
            Object.defineProperty(this, "pageRequestGuid", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: window.globalUtils.getRequestGuid()
            });
            Object.defineProperty(this, "pageImpressionGuid", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: window.globalUtils.getPageImpressionGuid()
            });
            this.eventType = eventType;
        }
        Object.defineProperty(LoggableEvent, "new", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (eventType) {
                return new LoggableEvent(eventType);
            }
        });
        return LoggableEvent;
    }());
    var isRemoteSite = function (site) {
        var remoteSites = ["ext.study.com", "tutoring.enhancedprep.com"];
        return remoteSites.indexOf(site) > -1;
    };
    return new EventLogging();
});

//# sourceMappingURL=eventLogging.js.map

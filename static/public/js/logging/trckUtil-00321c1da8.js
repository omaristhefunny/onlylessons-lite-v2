define(["require", "exports", "lib/jquery/guid", "lib/axios"], function (require, exports, Guid, axios_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.trackUtil = void 0;
    var TrackUtil = (function () {
        function TrackUtil() {
            var _this = this;
            Object.defineProperty(this, "pageViewGuid", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: window.globalUtils.getPageImpressionGuid()
            });
            Object.defineProperty(this, "submittedData", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "maxScroll", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "intervalsWithMovement", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "intervalsWithoutMovement", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "timeMap", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "searchGuid", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "currentCompany", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "currentType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "beginTime", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "lastX", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "lastY", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "currentX", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "currentY", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            var isInitialCall = true;
            this.reset(isInitialCall);
            if (document.readyState === 'complete') {
                this.onReady();
            }
            else {
                document.addEventListener("readystatechange", function () {
                    if (document.readyState === "complete") {
                        _this.onReady();
                    }
                });
            }
        }
        Object.defineProperty(TrackUtil.prototype, "setImpressionGuidElementValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var impressionGuidElement = document.querySelector("meta[name=impressionGuid]");
                if (impressionGuidElement) {
                    impressionGuidElement.setAttribute("content", this.pageViewGuid);
                }
            }
        });
        Object.defineProperty(TrackUtil.prototype, "setRequestGuidElementValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (newGuid) {
                var previousRequestGuid = window.globalUtils.getRequestGuid();
                this.setPreviousRequestGuidElement(previousRequestGuid);
                var requestGuidElement = document.querySelector("meta[name=requestGuid]");
                if (requestGuidElement) {
                    requestGuidElement.setAttribute("content", newGuid);
                }
                else {
                    requestGuidElement = document.getElementById("requestGuid");
                    if (requestGuidElement) {
                        requestGuidElement.value = newGuid;
                    }
                }
            }
        });
        Object.defineProperty(TrackUtil.prototype, "setPreviousRequestGuidElement", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (previousGuid) {
                var previousRequestGuid = document.querySelector("meta[name=previousRequestGuid]");
                if (previousRequestGuid) {
                    previousRequestGuid.setAttribute("content", previousGuid);
                }
                else {
                    previousRequestGuid = document.getElementById("previousRequestGuid");
                    if (previousRequestGuid) {
                        previousRequestGuid.value = previousGuid;
                    }
                }
            }
        });
        Object.defineProperty(TrackUtil.prototype, "onReady", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.logLoad(this.pageViewGuid);
                this.initializeEventListeners();
            }
        });
        Object.defineProperty(TrackUtil.prototype, "reset", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (isInitialCall) {
                if (isInitialCall === void 0) { isInitialCall = false; }
                if (!isInitialCall) {
                    this.pageViewGuid = Guid.New();
                    this.setImpressionGuidElementValue();
                }
                this.submittedData = false;
                this.maxScroll = 0;
                this.intervalsWithMovement = 0;
                this.intervalsWithoutMovement = 0;
                this.timeMap = {};
                var searchGuidElement = document.querySelector(".searchGuid");
                this.searchGuid = searchGuidElement ? searchGuidElement.value : null;
                this.currentCompany = null;
                this.currentType = null;
                this.beginTime = null;
                this.lastX = 10000;
                this.lastY = 10000;
                this.currentX = 0;
                this.currentY = 0;
            }
        });
        Object.defineProperty(TrackUtil.prototype, "initializeEventListeners", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                document.addEventListener("mousemove", function (e) {
                    _this.currentX = e.pageX;
                    _this.currentY = e.pageY;
                    if (_this.lastX === 10000 && _this.lastY === 10000) {
                        _this.lastX = _this.currentX;
                        _this.lastY = _this.currentY;
                    }
                });
                setInterval(function () { return _this.checkForMouseMovement(); }, 100);
                window.addEventListener("pagehide", function () {
                    var clickedType = null;
                    var clickedCompany = null;
                    var clickedText = null;
                    var clickedUrl = null;
                    _this.endPageView(clickedType, clickedCompany, clickedText, clickedUrl);
                }, false);
                window.addEventListener("scroll", function () {
                    var standardScrollTop = window.pageYOffset;
                    var ieQuirksScrollTop = document.body.scrollTop;
                    var ieDoctypeScrollTop = document.documentElement.scrollTop;
                    var scrollTop = Math.max(standardScrollTop, ieQuirksScrollTop, ieDoctypeScrollTop, 0);
                    if (scrollTop > _this.maxScroll) {
                        _this.maxScroll = scrollTop;
                    }
                }, false);
            }
        });
        Object.defineProperty(TrackUtil.prototype, "logClick", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (text, url) {
                this.endPageView(this.currentType, this.currentCompany, text, url);
            }
        });
        Object.defineProperty(TrackUtil.prototype, "endPageView", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (clickedType, clickedCompany, clickedText, clickedUrl, useBeacon) {
                if (useBeacon === void 0) { useBeacon = true; }
                this.mouseOutResult();
                return this.logUnload(this.pageViewGuid, clickedType, clickedCompany, clickedText, clickedUrl, useBeacon);
            }
        });
        Object.defineProperty(TrackUtil.prototype, "mouseOutResult", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.currentCompany) {
                    var timeDiff = new Date().getTime() - this.beginTime;
                    var timeMapKey = this.currentCompany + "*|*" + this.currentType;
                    if (!this.timeMap[timeMapKey]) {
                        this.timeMap[timeMapKey] = 0;
                    }
                    this.timeMap[timeMapKey] += timeDiff;
                }
            }
        });
        Object.defineProperty(TrackUtil.prototype, "logLoad", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (pageViewGuid) {
                var urlWithoutHash = window.location.href.replace(location.hash, "");
                var pageView = {
                    impressionGuid: pageViewGuid,
                    action: "load",
                    url: urlWithoutHash,
                    hashRoute: window.location.hash,
                    requestGuid: window.globalUtils.getRequestGuid(),
                    tabGuid: window.globalUtils.getTabGuid(),
                    viewportHeight: Math.max(document.documentElement.clientHeight, window.innerHeight, 0),
                    viewportWidth: Math.max(document.documentElement.clientWidth, window.innerWidth, 0),
                };
                this.logPageViewAjax(pageView);
            }
        });
        Object.defineProperty(TrackUtil.prototype, "logUnload", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (pageViewGuid, clickedType, clickedCompany, clickedText, clickedUrl, useBeacon) {
                if (!this.submittedData) {
                    var pageViewObject = {
                        impressionGuid: pageViewGuid,
                        action: "unload",
                        pageHeight: Math.round(document.body.getBoundingClientRect().height),
                        pageWidth: window.innerWidth,
                        maxScrollPixels: Math.floor(this.maxScroll),
                        intervalsWithMouseMovement: this.intervalsWithMovement,
                        intervalsWithoutMouseMovement: this.intervalsWithoutMovement,
                        mouseOverTimes: this.timeMap,
                        searchGuid: this.searchGuid,
                        clickedText: clickedText,
                        clickedCompany: clickedCompany,
                        clickedType: clickedType,
                        clickedUrl: clickedUrl,
                    };
                    this.submittedData = true;
                    if (useBeacon) {
                        this.logPageViewBeacon(pageViewObject);
                        return Promise.resolve();
                    }
                    return this.logPageViewAjax(pageViewObject);
                }
                return Promise.resolve();
            }
        });
        Object.defineProperty(TrackUtil.prototype, "logPageViewBeacon", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (pageView) {
                try {
                    navigator.sendBeacon("/logging/pageView", JSON.stringify(pageView));
                }
                catch (e) {
                    this.logPageViewAjax(pageView);
                }
            }
        });
        Object.defineProperty(TrackUtil.prototype, "logPageViewAjax", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (pageView) {
                try {
                    return axios_1.default.post("/logging/pageView", pageView).then(function (res) { return res.data; });
                }
                catch (e) {
                    return Promise.resolve();
                }
            }
        });
        Object.defineProperty(TrackUtil.prototype, "logPageRequestAjax", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                try {
                    return axios_1.default.post("/router-logging/log-page-request.ajax").then(function (res) { return res.data; });
                }
                catch (e) {
                    return Promise.resolve();
                }
            }
        });
        Object.defineProperty(TrackUtil.prototype, "checkForMouseMovement", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.lastX === 10000 && this.lastY === 10000) {
                }
                else if (this.currentX !== this.lastX || this.currentY !== this.lastY) {
                    this.intervalsWithMovement++;
                }
                else {
                    this.intervalsWithoutMovement++;
                }
                this.lastX = this.currentX;
                this.lastY = this.currentY;
            }
        });
        Object.defineProperty(TrackUtil.prototype, "simulateNewPageView", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var clickedType = null;
                var clickedCompany = null;
                var clickedText = null;
                var clickedUrl = null;
                var useBeacon = false;
                this.endPageView(clickedType, clickedCompany, clickedText, clickedUrl, useBeacon).then(function () {
                    _this.reset();
                    _this.generateNewRequestGuid().then(function () {
                        _this.logPageRequestAjax().then(function () {
                            _this.logLoad(_this.pageViewGuid);
                        });
                    });
                });
            }
        });
        Object.defineProperty(TrackUtil.prototype, "generateNewRequestGuid", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                return axios_1.default.get("/router-logging/generate-new-guid.ajax").then(function (res) {
                    _this.setRequestGuidElementValue(res.data);
                });
            }
        });
        Object.defineProperty(TrackUtil, "getInstance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this._INSTANCE == null) {
                    this._INSTANCE = new TrackUtil();
                }
                return this._INSTANCE;
            }
        });
        return TrackUtil;
    }());
    exports.trackUtil = TrackUtil.getInstance();
});

//# sourceMappingURL=trckUtil.js.map

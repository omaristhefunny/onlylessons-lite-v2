define(["require", "exports"], function (require, exports) {
    "use strict";
    var WindowLocationService = (function () {
        function WindowLocationService() {
        }
        Object.defineProperty(WindowLocationService.prototype, "parseSearchParams", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var searchParams = {};
                var searchString = window.location.search.substr(1).trim();
                if (searchString.length > 0) {
                    var keyValuePairStrings = searchString.split("&");
                    for (var _i = 0, keyValuePairStrings_1 = keyValuePairStrings; _i < keyValuePairStrings_1.length; _i++) {
                        var keyValuePairString = keyValuePairStrings_1[_i];
                        var keyValuePair = keyValuePairString.split("=");
                        var value = null;
                        if (keyValuePair.length > 1) {
                            value = keyValuePair[1];
                        }
                        searchParams[keyValuePair[0]] = value;
                    }
                }
                return searchParams;
            }
        });
        Object.defineProperty(WindowLocationService.prototype, "updateSearchParams", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (searchParams, urlChangeBehavior) {
                var keyValuePairs = [];
                for (var key in searchParams) {
                    var value = searchParams[key];
                    keyValuePairs.push("".concat(key, "=").concat(value));
                }
                if (urlChangeBehavior === "RELOAD") {
                    window.location.search = keyValuePairs.join("&");
                }
                else if (urlChangeBehavior === "PUSH_STATE" || urlChangeBehavior === "REPLACE_STATE") {
                    var relativeUrl = window.location.pathname + '?' + keyValuePairs.join("&");
                    if (urlChangeBehavior === "PUSH_STATE") {
                        window.history.pushState(null, "", relativeUrl);
                    }
                    else {
                        window.history.replaceState(null, "", relativeUrl);
                    }
                }
            }
        });
        Object.defineProperty(WindowLocationService.prototype, "getPathParts", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return window.location.pathname.split("/");
            }
        });
        Object.defineProperty(WindowLocationService.prototype, "getHash", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var hashString = window.location.hash;
                if (hashString && hashString.length > 1 && hashString[0] === "#") {
                    return window.location.hash.substr(1);
                }
                else {
                    return "";
                }
            }
        });
        Object.defineProperty(WindowLocationService.prototype, "setHash", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value) {
                window.location.hash = value;
            }
        });
        Object.defineProperty(WindowLocationService.prototype, "getSearchParam", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key) {
                var searchParams = this.parseSearchParams();
                return searchParams[key];
            }
        });
        Object.defineProperty(WindowLocationService.prototype, "setSearchParam", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key, value, urlChangeBehavior) {
                var searchParams = this.parseSearchParams();
                searchParams[key] = value;
                this.updateSearchParams(searchParams, urlChangeBehavior);
            }
        });
        Object.defineProperty(WindowLocationService.prototype, "deleteSearchParam", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key, urlChangeBehavior) {
                var searchParams = this.parseSearchParams();
                var paramNames = Object.keys(searchParams);
                if (paramNames.indexOf(key) < 0) {
                    return;
                }
                delete searchParams[key];
                this.updateSearchParams(searchParams, urlChangeBehavior);
            }
        });
        return WindowLocationService;
    }());
    var service = new WindowLocationService();
    return service;
});

//# sourceMappingURL=window-location.service.js.map

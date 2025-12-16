define(["require", "exports", "lib/axios", "member/info/MemberInfoService", "member/info/MemberInfoService"], function (require, exports, axios_1, MemberInfoService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.featureCheckService = exports.FeatureCheckService = void 0;
    var FeatureCheckService = (function () {
        function FeatureCheckService() {
            Object.defineProperty(this, "allFeaturesPromise", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "memberId", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: -1
            });
        }
        Object.defineProperty(FeatureCheckService.prototype, "getAllFeatures", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (this.allFeaturesPromise) {
                    return this.allFeaturesPromise;
                }
                this.allFeaturesPromise = MemberInfoService_1.memberInfoService.memberInfoProxy.getValue().then(function (memberInfo) {
                    if (memberInfo.isLoggedIn) {
                        _this.memberId = memberInfo.memberId;
                        return axios_1.default.get("/member/feature-check/get-features.ajax").then(function (response) {
                            return response.data;
                        });
                    }
                    else {
                        return new Promise(function (resolve) { return resolve({}); });
                    }
                });
                return this.allFeaturesPromise;
            }
        });
        ;
        Object.defineProperty(FeatureCheckService.prototype, "hasFeature", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (featureKeys) {
                return this.getAllFeatures()
                    .then(function (featureToEnabledMap) {
                    var keys = featureKeys.split(",");
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var feature = keys_1[_i];
                        if (featureToEnabledMap[feature.trim()] === true) {
                            return true;
                        }
                    }
                    return false;
                });
            }
        });
        ;
        Object.defineProperty(FeatureCheckService.prototype, "hasPermission", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (featureKey, accessType, memberId) {
                var _this = this;
                return this.getAllFeatures()
                    .then(function (featureToEnabledMap) {
                    if (memberId == null) {
                        memberId = _this.memberId;
                    }
                    var specificKey = "PACL/" + featureKey + "/" + memberId + "/" + accessType;
                    var allAccessKey = "PACL/" + featureKey + "/" + memberId + "/*";
                    var hasSpecificAccessMatch = (featureToEnabledMap[specificKey] === true);
                    var hasFullAccessMatch = (featureToEnabledMap[allAccessKey] === true);
                    return hasSpecificAccessMatch || hasFullAccessMatch;
                });
            }
        });
        ;
        return FeatureCheckService;
    }());
    exports.FeatureCheckService = FeatureCheckService;
    exports.featureCheckService = new FeatureCheckService();
});

//# sourceMappingURL=FeatureCheckService.js.map

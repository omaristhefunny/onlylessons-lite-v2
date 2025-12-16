define(["require", "exports", "lib/axios", "registration/StopWordUtil", "util/value-pro-promise"], function (require, exports, axios_1, StopWordUtil_1, value_pro_promise_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.majorUtil = void 0;
    var MajorUtil = (function () {
        function MajorUtil() {
            Object.defineProperty(this, "majorValueProxy", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "companyId", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
        }
        Object.defineProperty(MajorUtil.prototype, "searchForMajor", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (companyId, searchQuery) {
                var containsLowerCase = function (s, substr) {
                    return s.toLowerCase().indexOf(substr.toLowerCase()) >= 0;
                };
                return exports.majorUtil.getMajorListValueProxy(companyId).getValue().then(function (majorList) {
                    return majorList.filter(function (majorFromList) {
                        var majorNameFromList = majorFromList.majorName;
                        var majorNameFromListSplit = StopWordUtil_1.default.removeStopWordsFromList(majorNameFromList.split(' '));
                        return containsLowerCase(searchQuery, majorNameFromList)
                            || containsLowerCase(majorNameFromList, searchQuery)
                            || majorNameFromListSplit.some(function (stateWord) { return containsLowerCase(searchQuery, stateWord); });
                    });
                });
            }
        });
        Object.defineProperty(MajorUtil.prototype, "getMajorListValueProxy", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (companyId) {
                var _this = this;
                if (!this.majorValueProxy || this.companyId && this.companyId != companyId) {
                    this.majorValueProxy = new value_pro_promise_1.default([], function () {
                        _this.companyId = companyId;
                        return _this.getMajorList(companyId);
                    });
                }
                return this.majorValueProxy;
            }
        });
        Object.defineProperty(MajorUtil.prototype, "getMajorList", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (companyId) {
                var config = {
                    params: { companyId: companyId }
                };
                return axios_1.default.get("/academy/register/get-major-list.ajax", config)
                    .then(function (response) { return response.data; });
            }
        });
        return MajorUtil;
    }());
    exports.majorUtil = new MajorUtil();
    exports.default = exports.majorUtil;
});

//# sourceMappingURL=MajorUtil.js.map

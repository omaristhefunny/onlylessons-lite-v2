define(["require", "exports", "member/info/member-info.util", "util/promise-util", "util/value-proxy-promise"], function (require, exports, member_info_util_1, promise_util_1, value_proxy_promise_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.memberInfoService = exports.MemberInfoService = void 0;
    var MemberInfoService = (function () {
        function MemberInfoService() {
            Object.defineProperty(this, "memberInfoProxy", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.memberInfoProxy = this.memberInfoLoader();
        }
        Object.defineProperty(MemberInfoService.prototype, "memberInfoLoader", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                this.memberInfoProxy = new value_proxy_promise_1.default({}, function () {
                    var deferred = new promise_util_1.Deferred();
                    var memberInfo = _this.buildMemberInfoFromDOM();
                    deferred.resolve(memberInfo);
                    return deferred.promise;
                });
                return this.memberInfoProxy;
            }
        });
        Object.defineProperty(MemberInfoService.prototype, "buildMemberInfoFromDOM", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var memberInfoUtil = member_info_util_1.MemberInfoUtil.instance();
                return memberInfoUtil.memberInfo;
            }
        });
        return MemberInfoService;
    }());
    exports.MemberInfoService = MemberInfoService;
    exports.memberInfoService = new MemberInfoService();
});

//# sourceMappingURL=MemberInfoService.js.map

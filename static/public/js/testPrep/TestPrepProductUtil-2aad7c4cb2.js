define(["require", "exports", "lib/axios", "util/value-pro-promise"], function (require, exports, axios_1, value_pro_promise_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestPrepProductUtil = (function () {
        function TestPrepProductUtil() {
            var _this = this;
            Object.defineProperty(this, "testPrepProductListValueProxy", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: new value_pro_promise_1.default([], function () { return _this.getTestPrepProductList(); })
            });
        }
        Object.defineProperty(TestPrepProductUtil.prototype, "getScoreBasedProductList", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return axios_1.default.get("/academy/register/score-based-product-list.ajax")
                    .then(function (value) {
                    return value.data;
                });
            }
        });
        Object.defineProperty(TestPrepProductUtil.prototype, "getTestPrepProductList", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return axios_1.default.get("/academy/register/test-prep-product-list.ajax")
                    .then(function (value) {
                    return value.data;
                });
            }
        });
        return TestPrepProductUtil;
    }());
    var testPrepProductUtil = new TestPrepProductUtil();
    exports.default = testPrepProductUtil;
});

//# sourceMappingURL=TestPrepProductUtil.js.map

define(["require", "exports", "lib/axios"], function (require, exports, axios_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProductMapUtil = void 0;
    var ProductMapUtil = (function () {
        function ProductMapUtil() {
            Object.defineProperty(this, "productMapByCouponCodeCache", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
        }
        Object.defineProperty(ProductMapUtil, "instance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.__INSTANCE) {
                    this.__INSTANCE = new ProductMapUtil();
                }
                return this.__INSTANCE;
            }
        });
        Object.defineProperty(ProductMapUtil.prototype, "getProductMapForCouponCode", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (couponCode) {
                var _this = this;
                var couponKeyForCache = couponCode || "NO_COUPON";
                var result = this.productMapByCouponCodeCache[couponKeyForCache];
                if (result) {
                    return Promise.resolve(result);
                }
                return ProductMapUtil.getProductMapForCouponCodeFromAjax(couponCode)
                    .then(function (productMap) {
                    _this.productMapByCouponCodeCache[couponKeyForCache] = productMap;
                    return productMap;
                });
            }
        });
        Object.defineProperty(ProductMapUtil, "getProductMapForCouponCodeFromAjax", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (couponCode) {
                var config = {};
                if (couponCode) {
                    config.params = {
                        couponCode: couponCode
                    };
                }
                return axios_1.default.get("/academy/register/get-product-map.ajax", config).then(function (response) {
                    return response.data;
                });
            }
        });
        return ProductMapUtil;
    }());
    exports.ProductMapUtil = ProductMapUtil;
});

//# sourceMappingURL=product-map.util.js.map

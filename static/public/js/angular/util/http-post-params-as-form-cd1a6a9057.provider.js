define(["require", "exports", "jquery", "angularDependency"], function (require, exports, $, angular) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpPostParamsAsFormProvider = void 0;
    var TRANSFORM_REQUEST_FUNCTION = function (data, headersGetter) {
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };
    var TRANSFORM_REQUEST_FUNCTION_NO_FUNCTIONS_CALLED = function (data) {
        if (data === undefined) {
            return data;
        }
        return angular.injector(["ng"]).invoke(["$httpParamSerializerJQLike", function ($httpParamSerializerJQLike) {
                return $httpParamSerializerJQLike(data);
            }]);
    };
    var POST_CONFIG_WILL_CALL_FUNCTIONS = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requestGuid": window.globalUtils.getRequestGuid()
        },
        transformRequest: TRANSFORM_REQUEST_FUNCTION
    };
    var POST_CONFIG_WILL_NOT_CALL_FUNCTIONS = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requestGuid": window.globalUtils.getRequestGuid()
        },
        transformRequest: TRANSFORM_REQUEST_FUNCTION_NO_FUNCTIONS_CALLED
    };
    var HttpPostParamsAsFormProvider = (function () {
        function HttpPostParamsAsFormProvider($httpProvider) {
            Object.defineProperty(this, "$get", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: ["$httpProvider",
                    function httpPostParamsAsFormFactory() {
                        return {};
                    }
                ]
            });
            Object.defineProperty(this, "$httpProvider", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.$httpProvider = $httpProvider;
        }
        Object.defineProperty(HttpPostParamsAsFormProvider.prototype, "configureHttpPostRequestDefaults", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.$httpProvider.defaults.headers.post["Content-Type"] = POST_CONFIG_WILL_CALL_FUNCTIONS.headers["Content-Type"];
                this.$httpProvider.defaults.transformRequest = [TRANSFORM_REQUEST_FUNCTION];
            }
        });
        ;
        return HttpPostParamsAsFormProvider;
    }());
    exports.HttpPostParamsAsFormProvider = HttpPostParamsAsFormProvider;
    var module = angular.module("study.http-post-params-as-form", []);
    module.provider("httpPostParamsAsForm", HttpPostParamsAsFormProvider);
    module.constant("httpPostParamsAsFormConfig", POST_CONFIG_WILL_CALL_FUNCTIONS);
    module.constant("httpPostParamsAsFormConfigNoFunctions", POST_CONFIG_WILL_NOT_CALL_FUNCTIONS);
});

//# sourceMappingURL=http-post-params-as-form.provider.js.map

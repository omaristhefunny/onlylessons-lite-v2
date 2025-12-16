var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports", "angularDependency", "angularDependency", "compatibility/polyfill/element-get-attribute-names", "compatibility/promise-polyfill"], function (require, exports, angular) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LazyLoadService = exports.LazyLoadAngularFromReactHelper = void 0;
    var module = angular.module("lazy-load.module", []);
    var LazyLoadAngularFromReactHelper = (function () {
        function LazyLoadAngularFromReactHelper() {
            Object.defineProperty(this, "lazyLoadService", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "lazyLoadServicePromise", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "lazyLoadServiceResolve", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
        }
        Object.defineProperty(LazyLoadAngularFromReactHelper, "instance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this._instance) {
                    this._instance = new LazyLoadAngularFromReactHelper();
                }
                return this._instance;
            }
        });
        Object.defineProperty(LazyLoadAngularFromReactHelper.prototype, "getOrLoadModule", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (moduleName, requirePath) {
                return this.getLazyLoadServicePromise().then(function (service) { return service.getOrLoadModule(moduleName, requirePath); });
            }
        });
        Object.defineProperty(LazyLoadAngularFromReactHelper.prototype, "getOrLoadInjectable", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (moduleName, requirePath, injectableName) {
                return this.getLazyLoadServicePromise().then(function (service) { return service.getOrLoadInjectable(moduleName, requirePath, injectableName); });
            }
        });
        Object.defineProperty(LazyLoadAngularFromReactHelper.prototype, "getBuiltInAngularInjectable", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (injectableName) {
                return this.getLazyLoadServicePromise().then(function (service) { return service.getAngularBuiltInInjectable(injectableName); });
            }
        });
        Object.defineProperty(LazyLoadAngularFromReactHelper.prototype, "getLazyLoadServicePromise", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (this.lazyLoadServicePromise != null) {
                    return this.lazyLoadServicePromise;
                }
                this.lazyLoadServicePromise = new Promise(function (resolve, reject) {
                    var timeout = setTimeout(function () {
                        reject("timed out waiting for LazyLoadService to be injectable");
                    }, 30 * 1000);
                    _this.lazyLoadServiceResolve = function (service) {
                        clearTimeout(timeout);
                        resolve(service);
                    };
                });
                if (this.lazyLoadService != null) {
                    this.lazyLoadServiceResolve(this.lazyLoadService);
                }
                return this.lazyLoadServicePromise;
            }
        });
        Object.defineProperty(LazyLoadAngularFromReactHelper.prototype, "setAngularServiceInstance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (lazyLoadService) {
                if (this.lazyLoadServiceResolve != null) {
                    this.lazyLoadServiceResolve(lazyLoadService);
                }
                else {
                    this.lazyLoadService = lazyLoadService;
                }
            }
        });
        return LazyLoadAngularFromReactHelper;
    }());
    exports.LazyLoadAngularFromReactHelper = LazyLoadAngularFromReactHelper;
    var LazyLoadService = (function () {
        function LazyLoadService($injector, $q) {
            Object.defineProperty(this, "$injector", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "$q", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.$injector = $injector;
            this.$q = $q;
            LazyLoadAngularFromReactHelper.instance().setAngularServiceInstance(this);
        }
        Object.defineProperty(LazyLoadService.prototype, "getOrLoadModule", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (moduleName, requirePath) {
                var _this = this;
                if (this.$injector.modules[moduleName]) {
                    return this.$q.when();
                }
                var deferred = this.$q.defer();
                require([requirePath], function () {
                    if (_this.$injector.modules[moduleName]) {
                        deferred.resolve();
                    }
                    _this.$injector.loadNewModules([moduleName]);
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            }
        });
        Object.defineProperty(LazyLoadService.prototype, "getOrLoadInjectable", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (moduleName, requirePath, injectableName) {
                var _this = this;
                if (this.$injector.has(injectableName)) {
                    return this.$q.when(this.$injector.get(injectableName));
                }
                return this.getOrLoadModule(moduleName, requirePath)
                    .then(function () {
                    if (_this.$injector.has(injectableName)) {
                        return _this.$q.when(_this.$injector.get(injectableName));
                    }
                    throw "unable to load injectable=" + injectableName + " module=" + moduleName + " requirePath=" + requirePath;
                });
            }
        });
        Object.defineProperty(LazyLoadService.prototype, "getAngularBuiltInInjectable", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (injectableName) {
                if (!this.$injector.has(injectableName)) {
                    throw new Error("Unable to find Angular built in injectable " + injectableName);
                }
                return this.$injector.get(injectableName);
            }
        });
        Object.defineProperty(LazyLoadService, "lazyLoadModuleForUiRouter", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function ($transition, requireModule, angularModule) {
                var injector = $transition.injector();
                var lazyLoadService = injector.get("LazyLoadService");
                return lazyLoadService.getOrLoadModule(angularModule, requireModule);
            }
        });
        Object.defineProperty(LazyLoadService, "$inject", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["$injector", "$q"]
        });
        return LazyLoadService;
    }());
    exports.LazyLoadService = LazyLoadService;
    module.service("LazyLoadService", LazyLoadService);
    module.directive("loadThenCompile", ["$animate", "$compile", "LazyLoadService",
        function ($animate, $compile, lazyLoadService) {
            var directiveDefinition = {
                restrict: "AE",
                compile: function ($compileElement, templateAttributes) {
                    var angularModuleName = templateAttributes["ngModuleName"];
                    var requireModulePath = templateAttributes["requireModulePath"];
                    var hideWhileLoading = templateAttributes["hideWhileLoading"] == "true";
                    var originalContent = $compileElement[0].innerHTML;
                    if (hideWhileLoading) {
                        $compileElement.html('');
                    }
                    return function ($scope, $postLinkElement, attrs, ctrl, $transclude) {
                        lazyLoadService.getOrLoadModule(angularModuleName, requireModulePath)
                            .then(function () {
                            if (!hideWhileLoading) {
                                $postLinkElement.html("");
                                if ($postLinkElement.children().length > 0) {
                                    $postLinkElement.html("");
                                }
                            }
                            $animate.enter(originalContent, $postLinkElement)
                                .then(function () {
                                $compile($postLinkElement.contents())($scope);
                            });
                        });
                    };
                }
            };
            return directiveDefinition;
        }
    ]);
    function replaceDelimiterWithCamelCase(input, delimiter, flags) {
        if (flags === void 0) { flags = "g"; }
        var regExp = new RegExp(delimiter + "(?<nextChar>.)", flags);
        return input.replace(regExp, function () {
            var groups = arguments[arguments.length - 1];
            return groups.nextChar.toUpperCase();
        });
    }
    var JqueryToJsxHelper = (function () {
        function JqueryToJsxHelper($element) {
            Object.defineProperty(this, "firstChildAttributes", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
            Object.defineProperty(this, "firstChildTagName", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            var firstChild = $element[0].firstElementChild;
            if (firstChild == null) {
                return null;
            }
            this.firstChildTagName = firstChild.tagName.toLowerCase();
            var firstChildContent = firstChild.innerHTML;
            for (var _i = 0, _a = firstChild.getAttributeNames(); _i < _a.length; _i++) {
                var attributeName = _a[_i];
                var attributeValue = firstChild.getAttribute(attributeName);
                if (attributeName === "class") {
                    attributeName = "className";
                }
                else if (attributeName === "style") {
                    var reactStyles = {};
                    for (var _b = 0, _c = attributeValue.split(/;/); _b < _c.length; _b++) {
                        var rule = _c[_b];
                        var firstColonIndex = rule.indexOf(":");
                        var propertyValue = rule.slice(firstColonIndex + 1).trim();
                        var htmlPropertyName = rule.slice(0, firstColonIndex).trim();
                        var reactPropertyName = htmlPropertyName;
                        if (!rule.startsWith("--")) {
                            reactPropertyName = replaceDelimiterWithCamelCase(htmlPropertyName, "-");
                        }
                        reactStyles[reactPropertyName] = propertyValue;
                    }
                    attributeValue = reactStyles;
                }
                this.firstChildAttributes[attributeName] = attributeValue;
            }
            this.firstChildAttributes.dangerouslySetInnerHTML = {
                __html: firstChildContent
            };
        }
        return JqueryToJsxHelper;
    }());
    var ParsePropsFromAttributesHelper = (function () {
        function ParsePropsFromAttributesHelper() {
        }
        Object.defineProperty(ParsePropsFromAttributesHelper, "parsePropsFromAttributes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function ($scope, element, instanceAttributes) {
                var props = {};
                for (var _i = 0, _a = element.getAttributeNames(); _i < _a.length; _i++) {
                    var attributeName = _a[_i];
                    if (!this.startsWith(attributeName, ParsePropsFromAttributesHelper.PROPS_ATTRIBUTE_PREFIX)) {
                        continue;
                    }
                    var splitName = attributeName.split("-");
                    if (splitName.length < 3) {
                        throw new Error("React-ng prop- attribute name must follow the format prop-type-propname. E.g: prop-bool-show-see-all. Error parsing "
                            + attributeName);
                    }
                    var propType = splitName[1];
                    var fullPropName = this.camelCaseifyArray(splitName);
                    var propName = this.camelCaseifyArray(splitName.slice(2));
                    var attributeValue = instanceAttributes[fullPropName];
                    var propValue = void 0;
                    if (propType == "eval") {
                        propValue = $scope.$eval(attributeValue);
                    }
                    else {
                        propValue = this.castAttributeValueToPropType(attributeValue, propType);
                    }
                    props[propName] = propValue;
                }
                return props;
            }
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "castAttributeValueToPropType", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, propType) {
                if (propType === ParsePropsFromAttributesHelper.BOOLEAN_PREFIX) {
                    return !(value == null || value === "false" || value === "");
                }
                else if (propType === ParsePropsFromAttributesHelper.NUMBER_PREFIX) {
                    return parseFloat(value);
                }
                else if (propType === ParsePropsFromAttributesHelper.STRING_PREFIX) {
                    return value;
                }
                else {
                    throw new Error("Attempted to cast attribute value to unsupported propType. propType=".concat(propType));
                }
            }
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "startsWith", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (string, subString) {
                return string.indexOf(subString) == 0;
            }
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "camelCaseifyArray", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (strings) {
                var result = strings.map(function (string, i) {
                    if (i !== 0) {
                        return string[0].toUpperCase() + string.slice(1);
                    }
                    else {
                        return string;
                    }
                }).join("");
                return result;
            }
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "PROPS_ATTRIBUTE_PREFIX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "prop-"
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "BOOLEAN_PREFIX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "boolean"
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "NUMBER_PREFIX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "number"
        });
        Object.defineProperty(ParsePropsFromAttributesHelper, "STRING_PREFIX", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "string"
        });
        return ParsePropsFromAttributesHelper;
    }());
    module.directive("reactNg", function () {
        return {
            restrict: "E",
            scope: false,
            compile: function ($compileElement) {
                var helper = new JqueryToJsxHelper($compileElement);
                var path = $compileElement[0].getAttribute("require-path");
                var componentName = $compileElement[0].getAttribute("component-name");
                var functionName = $compileElement[0].getAttribute("function-name");
                if (componentName != null && functionName != null) {
                    throw new Error("Cannot have both component name and function name defined! componentName=" + componentName);
                }
                var passChildren = $compileElement[0].getAttribute("pass-children") == "true";
                var depsPromise = Promise.all([new Promise(function (resolve_1, reject_1) { require(["react"], resolve_1, reject_1); }), new Promise(function (resolve_2, reject_2) { require(["react-dom/client"], resolve_2, reject_2); }), new Promise(function (resolve_3, reject_3) { require(["components/GenericErrorBoundary"], resolve_3, reject_3); })]);
                return function ($scope, $postLinkElement, instanceAttributes) {
                    var parsedProps = ParsePropsFromAttributesHelper.parsePropsFromAttributes($scope, $compileElement[0], instanceAttributes);
                    depsPromise.then(function (_a) {
                        var React = _a[0], ReactDOMClient = _a[1], GenericErrorBoundaryModule = _a[2];
                        var GenericErrorBoundaryView = GenericErrorBoundaryModule.GenericErrorBoundaryView;
                        var firstChildAsJsx = (helper.firstChildTagName != null) ?
                            React.createElement(helper.firstChildTagName, helper.firstChildAttributes) : null;
                        if (passChildren) {
                            parsedProps.children = firstChildAsJsx;
                        }
                        if (functionName) {
                            new Promise(function (resolve_4, reject_4) { require([path], resolve_4, reject_4); }).then(function (module) {
                                module[functionName]($postLinkElement[0], parsedProps);
                            });
                            $scope.$on("$destroy", function () {
                                if ($postLinkElement[0]) {
                                    ReactDOMClient.createRoot($postLinkElement[0]).unmount();
                                }
                            });
                        }
                        else {
                            var LazyComponent = React.lazy(function () {
                                if (componentName) {
                                    return new Promise(function (resolve_5, reject_5) { require([path], resolve_5, reject_5); }).then(function (module) {
                                        return { "default": module[componentName] };
                                    });
                                }
                                else {
                                    return new Promise(function (resolve_6, reject_6) { require([path], resolve_6, reject_6); });
                                }
                            });
                            var root_1 = ReactDOMClient.createRoot($postLinkElement[0]);
                            root_1.render(React.createElement(GenericErrorBoundaryView, { errorView: firstChildAsJsx },
                                React.createElement(React.Suspense, { fallback: firstChildAsJsx },
                                    React.createElement(LazyComponent, __assign({}, parsedProps)))));
                            $scope.$on("$destroy", function () {
                                root_1.unmount();
                            });
                        }
                    });
                };
            }
        };
    });
    module.run(['LazyLoadService', function (service) { }]);
});

//# sourceMappingURL=lazy-load.module.js.map

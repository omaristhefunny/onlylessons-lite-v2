var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "mobx", "compatibility/promise-polyfill"], function (require, exports, mobx_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValueProxy = (function () {
        function ValueProxy(initialValue, valueLoader, eventKey) {
            Object.defineProperty(this, "isLoading", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "value", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            });
            Object.defineProperty(this, "eventKey", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            });
            Object.defineProperty(this, "promiseToLoadData", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            });
            Object.defineProperty(this, "valueLoader", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            });
            Object.defineProperty(this, "callbacks", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {}
            });
            this.value = initialValue;
            this.valueLoader = valueLoader;
            if (eventKey) {
                this.eventKey = ValueProxy.buildEventKey(eventKey);
                this.addReloadEventListener();
            }
            (0, mobx_1.makeObservable)(this, {
                isLoading: mobx_1.observable,
                value: mobx_1.observable,
            });
        }
        Object.defineProperty(ValueProxy.prototype, "getValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (this.promiseToLoadData) {
                            return [2, this.promiseToLoadData];
                        }
                        return [2, this.reloadValue()];
                    });
                });
            }
        });
        ;
        Object.defineProperty(ValueProxy.prototype, "reloadValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var emitEvent;
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (this.isLoading) {
                            return [2, this.promiseToLoadData.then(function () { return _this.reloadValue(); })];
                        }
                        (0, mobx_1.runInAction)(function () {
                            _this.isLoading = true;
                        });
                        emitEvent = true;
                        this.promiseToLoadData = this.handleNewValue(this.valueLoader(), emitEvent)
                            .finally((0, mobx_1.action)(function () { return _this.isLoading = false; }));
                        return [2, this.promiseToLoadData];
                    });
                });
            }
        });
        ;
        Object.defineProperty(ValueProxy.prototype, "handleNewValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (promise, emitEvent) {
                var _this = this;
                return promise
                    .then(function (value) {
                    if (typeof Object["assign"] === "function") {
                        return value;
                    }
                    return new Promise(function (resolve_1, reject_1) { require(["core-js"], resolve_1, reject_1); }).finally(function () { }).then(function () { return value; });
                })
                    .then((0, mobx_1.action)(function (value) {
                    _this.clearValue();
                    if (_this.value == null) {
                        _this.value = {};
                    }
                    Object["assign"](_this.value, value);
                    _this.triggerListeners();
                    if (emitEvent) {
                        _this.emitReloadEvent();
                    }
                    return _this.value;
                }));
            }
        });
        Object.defineProperty(ValueProxy.prototype, "addReloadEventListener", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (this.eventKey == null) {
                    return;
                }
                document.addEventListener(this.eventKey, function (event) {
                    if (_this === event.detail.origin) {
                        return;
                    }
                    var emitEvent = false;
                    _this.handleNewValue(Promise.resolve(event.detail.value), emitEvent)
                        .then((0, mobx_1.action)(function (value) {
                        _this.isLoading = false;
                        if (_this.promiseToLoadData == null) {
                            _this.promiseToLoadData = Promise.resolve(value);
                        }
                    }));
                });
            }
        });
        Object.defineProperty(ValueProxy.prototype, "emitReloadEvent", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.eventKey == null) {
                    return;
                }
                var data = {
                    origin: this,
                    value: (0, mobx_1.toJS)(this.value),
                };
                var newEvent = new CustomEvent(this.eventKey, { detail: data });
                document.dispatchEvent(newEvent);
            }
        });
        Object.defineProperty(ValueProxy.prototype, "triggerListeners", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                for (var key in this.callbacks) {
                    var callback = this.callbacks[key];
                    callback(this.value);
                }
            }
        });
        Object.defineProperty(ValueProxy.prototype, "addValueListener", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (callback) {
                var assignedKey = null;
                while (!assignedKey) {
                    var unusedKey = Math.random().toString().substring(2);
                    var existingCallback = this.callbacks[unusedKey];
                    if (!existingCallback) {
                        assignedKey = unusedKey;
                        this.callbacks[assignedKey] = callback;
                    }
                }
                if (!this.isLoading && this.promiseToLoadData != null) {
                    callback(this.value);
                }
                return assignedKey;
            }
        });
        Object.defineProperty(ValueProxy.prototype, "removeValueListener", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key) {
                delete this.callbacks[key];
            }
        });
        Object.defineProperty(ValueProxy.prototype, "clearValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.value) {
                    if (this.value instanceof Array) {
                        this.value.length = 0;
                    }
                    else {
                        var valueObject = this.value;
                        for (var member in valueObject) {
                            if (valueObject.hasOwnProperty(member)) {
                                delete valueObject[member];
                            }
                        }
                    }
                }
            }
        });
        ;
        Object.defineProperty(ValueProxy.prototype, "isActive", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this.promiseToLoadData != null;
            }
        });
        Object.defineProperty(ValueProxy, "addValueProxyListener", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (valueProxyIdentifier, callback) {
                var eventKey = this.buildEventKey(valueProxyIdentifier);
                var handleEvent = function (event) { return callback(event.detail.value); };
                document.addEventListener(eventKey, handleEvent);
                var deregisterEventListener = function () {
                    removeEventListener(eventKey, handleEvent);
                };
                return deregisterEventListener;
            }
        });
        Object.defineProperty(ValueProxy, "buildEventKey", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (eventKey) {
                return "valueProxy." + eventKey;
            }
        });
        return ValueProxy;
    }());
    exports.default = ValueProxy;
});

//# sourceMappingURL=value-pro-promise.js.map

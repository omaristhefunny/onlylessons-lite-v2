define(["require", "exports", "mobx", "underscore"], function (require, exports, mobx_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PromiseUtil = exports.SequentialSave = exports.Deferred = void 0;
    var Deferred = (function () {
        function Deferred() {
            var _this = this;
            Object.defineProperty(this, "_resolve", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_reject", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "promise", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.promise = new Promise(function (resolve, reject) {
                _this._resolve = resolve;
                _this._reject = reject;
            });
        }
        Object.defineProperty(Deferred.prototype, "then", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (onfulfilled, onrejected) {
                return this.promise.then(onfulfilled, onrejected);
            }
        });
        Object.defineProperty(Deferred.prototype, "catch", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (onrejected) {
                return this.promise.catch(onrejected);
            }
        });
        Object.defineProperty(Deferred.prototype, "resolve", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (thenableOrResult) {
                this._resolve(thenableOrResult);
            }
        });
        Object.defineProperty(Deferred.prototype, "reject", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (error) {
                this._reject(error);
            }
        });
        return Deferred;
    }());
    exports.Deferred = Deferred;
    var SequentialSave = (function () {
        function SequentialSave(saveFunc, saveProps) {
            if (saveProps === void 0) { saveProps = {}; }
            var _this = this;
            Object.defineProperty(this, "callerSaveFunc", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "internalSaveDebounced", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "defersForPendingSave", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            Object.defineProperty(this, "_isSaveInFlight", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "_isSavePending", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            (0, mobx_1.makeAutoObservable)(this, { callerSaveFunc: false, internalSaveDebounced: false });
            this.callerSaveFunc = saveFunc;
            this.internalSaveDebounced = (saveProps.debounceMillis)
                ? _.debounce(function () { return _this.saveInternal(); }, saveProps.debounceMillis)
                : function () { return _this.saveInternal(); };
        }
        Object.defineProperty(SequentialSave.prototype, "isSavingOrPendingSave", {
            get: function () {
                return this.isSavePending || this._isSaveInFlight;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SequentialSave.prototype, "isSaveInFlight", {
            get: function () {
                return this._isSaveInFlight;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SequentialSave.prototype, "isSavePending", {
            get: function () {
                return this._isSavePending || this.defersForPendingSave.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SequentialSave.prototype, "save", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this._isSavePending = true;
                return this.internalSaveDebounced();
            }
        });
        Object.defineProperty(SequentialSave.prototype, "saveInternal", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (this._isSaveInFlight) {
                    var deferred = new Deferred();
                    this.defersForPendingSave.push(deferred);
                    return deferred.promise;
                }
                this._isSavePending = false;
                this._isSaveInFlight = true;
                var defersForThisSave = this.defersForPendingSave;
                this.defersForPendingSave = [];
                return this.callerSaveFunc()
                    .then(function (result) {
                    for (var _i = 0, defersForThisSave_1 = defersForThisSave; _i < defersForThisSave_1.length; _i++) {
                        var deferForThisSave = defersForThisSave_1[_i];
                        deferForThisSave.resolve(result);
                    }
                    return result;
                })
                    .catch(function (reason) {
                    for (var _i = 0, defersForThisSave_2 = defersForThisSave; _i < defersForThisSave_2.length; _i++) {
                        var deferForThisSave = defersForThisSave_2[_i];
                        deferForThisSave.reject(reason);
                    }
                    throw reason;
                })
                    .finally((0, mobx_1.action)(function () {
                    _this._isSaveInFlight = false;
                    if (_this.defersForPendingSave.length > 0) {
                        _this.save();
                    }
                }));
            }
        });
        return SequentialSave;
    }());
    exports.SequentialSave = SequentialSave;
    var PromiseUtil = (function () {
        function PromiseUtil() {
        }
        Object.defineProperty(PromiseUtil, "executeInSeries", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (inputList, toPromise) {
                return inputList.reduce(function (promiseChain, inputValue) {
                    return promiseChain.then(function (results) {
                        return toPromise(inputValue).then(function (result) {
                            results.push(result);
                            return results;
                        });
                    });
                }, Promise.resolve([]));
            }
        });
        return PromiseUtil;
    }());
    exports.PromiseUtil = PromiseUtil;
});

//# sourceMappingURL=promise-util.js.map

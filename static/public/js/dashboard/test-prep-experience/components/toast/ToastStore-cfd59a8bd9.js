define(["require", "exports", "mobx", "react-utils/react-study-helpers"], function (require, exports, mobx_1, react_study_helpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toastStore = exports.ToastStore = exports.SHOW_TOAST_ON_RELOAD_KEY = exports.ToastType = void 0;
    var ToastType;
    (function (ToastType) {
        ToastType["SUCCESS"] = "SUCCESS";
        ToastType["ERROR"] = "ERROR";
    })(ToastType || (exports.ToastType = ToastType = {}));
    exports.SHOW_TOAST_ON_RELOAD_KEY = "showToastOnReload";
    var ToastStore = (function () {
        function ToastStore() {
            Object.defineProperty(this, "toastType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: ToastType.SUCCESS
            });
            Object.defineProperty(this, "toastHeader", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            });
            Object.defineProperty(this, "toastMessage", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            });
            Object.defineProperty(this, "isShowing", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            (0, mobx_1.makeAutoObservable)(this);
        }
        Object.defineProperty(ToastStore.prototype, "showToast", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (toastType, toastHeader, toastMessage) {
                if (toastType === void 0) { toastType = ToastType.SUCCESS; }
                if (toastHeader === void 0) { toastHeader = "Success"; }
                if (toastMessage === void 0) { toastMessage = ""; }
                this.toastType = toastType;
                this.toastHeader = toastHeader;
                this.toastMessage = toastMessage;
                this.isShowing = true;
            }
        });
        Object.defineProperty(ToastStore.prototype, "checkForVariables", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (react_study_helpers_1.LocalStorageManager.hasKey(exports.SHOW_TOAST_ON_RELOAD_KEY)) {
                    var rawString = react_study_helpers_1.LocalStorageManager.getString(exports.SHOW_TOAST_ON_RELOAD_KEY, "");
                    if (rawString) {
                        var toastLocalStorage = JSON.parse(rawString);
                        react_study_helpers_1.LocalStorageManager.setKey(exports.SHOW_TOAST_ON_RELOAD_KEY, "");
                        this.showToast(toastLocalStorage.type, toastLocalStorage.header, toastLocalStorage.message);
                    }
                }
            }
        });
        return ToastStore;
    }());
    exports.ToastStore = ToastStore;
    exports.toastStore = new ToastStore();
    exports.default = exports.toastStore;
});

//# sourceMappingURL=ToastStore.js.map

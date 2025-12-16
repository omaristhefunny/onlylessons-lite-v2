define(["require", "exports", "mobx"], function (require, exports, mobx_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.eurekaDesktopQuery = exports.eurekaTabletQuery = exports.eurekaMobileQuery = exports.xLargeMinQuery = exports.largeMinQuery = exports.mediumMaxQuery = exports.mediumMinQuery = exports.smallMaxQuery = exports.MediaQueryStore = void 0;
    var MediaQueryStore = (function () {
        function MediaQueryStore(query) {
            var _this = this;
            Object.defineProperty(this, "_matches", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "mediaQuery", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "mqListener", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: (0, mobx_1.action)(function (e) {
                    _this._matches = e.matches;
                })
            });
            this.mediaQuery = window.matchMedia(query);
            this._matches = this.mediaQuery.matches;
            if (typeof this.mediaQuery.addEventListener == "function") {
                this.mediaQuery.addEventListener("change", this.mqListener);
            }
            else {
                this.mediaQuery.addListener(this.mqListener);
            }
            (0, mobx_1.makeObservable)(this, {
                "_matches": mobx_1.observable,
                "matches": mobx_1.computed,
            });
        }
        Object.defineProperty(MediaQueryStore.prototype, "matches", {
            get: function () {
                return this._matches;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MediaQueryStore.prototype, "removeListener", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (typeof this.mediaQuery.addEventListener == "function") {
                    this.mediaQuery.removeEventListener("change", this.mqListener);
                }
                else {
                    this.mediaQuery.removeListener(this.mqListener);
                }
            }
        });
        Object.defineProperty(MediaQueryStore, "desktopMediaQuery", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return new MediaQueryStore("(min-width: 768px)");
            }
        });
        return MediaQueryStore;
    }());
    exports.MediaQueryStore = MediaQueryStore;
    exports.smallMaxQuery = new MediaQueryStore("(max-width: 479px)");
    exports.mediumMinQuery = new MediaQueryStore("(min-width: 480px)");
    exports.mediumMaxQuery = new MediaQueryStore("(max-width: 767px)");
    exports.largeMinQuery = new MediaQueryStore("(min-width: 768px)");
    exports.xLargeMinQuery = new MediaQueryStore("(min-width: 1024px)");
    exports.eurekaMobileQuery = new MediaQueryStore("(max-width: 768px)");
    exports.eurekaTabletQuery = new MediaQueryStore("(max-width: 1280px)");
    exports.eurekaDesktopQuery = new MediaQueryStore("(min-width: 1280px)");
});

//# sourceMappingURL=media-query-store-util.js.map

define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.trackingRef = trackingRef;
    function trackingRef() {
        var current;
        return function (el) {
            if (el && !el.hasAttribute("data-track-visible")) {
                el.setAttribute("data-track-visible", "");
            }
        };
    }
});

//# sourceMappingURL=react-track-visible.js.map

define(["require", "exports", "lib/axios"], function (require, exports, axios_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TestPrepFreeAccountCtaModalUtil = void 0;
    var TestPrepFreeAccountCtaModalUtil = (function () {
        function TestPrepFreeAccountCtaModalUtil() {
        }
        Object.defineProperty(TestPrepFreeAccountCtaModalUtil, "setShowModalOnNextPageOrMouseout", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (setTpCtaModalMouseLeaveTriggered) {
                TestPrepFreeAccountCtaModalUtil.setShowModalOnNextPage();
                var eventListener = function (event) {
                    if (event.relatedTarget && event.relatedTarget !== document.documentElement) {
                        return;
                    }
                    document.body.removeEventListener("mouseout", eventListener);
                    TestPrepFreeAccountCtaModalUtil.resetModalSessionAttribute();
                    setTpCtaModalMouseLeaveTriggered(true);
                };
                document.body.addEventListener("mouseout", eventListener);
            }
        });
        Object.defineProperty(TestPrepFreeAccountCtaModalUtil, "setShowModalOnNextPage", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                axios_1.default.post("/test-prep/set-free-account-cta-modal-to-show.ajax");
            }
        });
        Object.defineProperty(TestPrepFreeAccountCtaModalUtil, "resetModalSessionAttribute", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                axios_1.default.post("/test-prep/reset-free-account-cta-modal.ajax");
            }
        });
        return TestPrepFreeAccountCtaModalUtil;
    }());
    exports.TestPrepFreeAccountCtaModalUtil = TestPrepFreeAccountCtaModalUtil;
});

//# sourceMappingURL=TestPrepFreeAccountCtaModalUtil.js.map

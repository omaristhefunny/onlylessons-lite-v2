var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "react", "mobx-react"], function (require, exports, React, mobx_react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoadingDotsView = exports.TabViewState = void 0;
    var TabViewState;
    (function (TabViewState) {
        TabViewState[TabViewState["LOADING"] = 0] = "LOADING";
        TabViewState[TabViewState["ERROR"] = 1] = "ERROR";
        TabViewState[TabViewState["READY"] = 2] = "READY";
        TabViewState[TabViewState["UPDATING"] = 3] = "UPDATING";
    })(TabViewState || (exports.TabViewState = TabViewState = {}));
    exports.LoadingDotsView = (0, mobx_react_1.observer)((function (_super) {
        __extends(_LoadingDotsView, _super);
        function _LoadingDotsView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(_LoadingDotsView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return React.createElement("div", { className: "loading-dots-container", "test-id": this.props.testId },
                    React.createElement("span", { className: "loading-dots" }));
            }
        });
        return _LoadingDotsView;
    }(React.Component)));
});

//# sourceMappingURL=DashboardAppBase.js.map

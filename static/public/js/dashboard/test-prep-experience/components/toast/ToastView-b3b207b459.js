define(["require", "exports", "components/GenericErrorBoundary", "dashboard/test-prep-experience/components/toast/ToastStore", "lib/react-bootstrap", "mobx", "mobx-react", "react", "react-dom/client", "util/InlineSvgComponents"], function (require, exports, GenericErrorBoundary_1, ToastStore_1, react_bootstrap_1, mobx_1, mobx_react_1, React, client_1, InlineSvgComponents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ToastView = void 0;
    exports.initializeToastView = initializeToastView;
    function initializeToastView(element, props) {
        var root = (0, client_1.createRoot)(element);
        root.render(React.createElement(React.StrictMode, null,
            React.createElement(GenericErrorBoundary_1.GenericErrorBoundaryView, null,
                React.createElement(exports.ToastView, null))));
    }
    exports.ToastView = (0, mobx_react_1.observer)(function (_a) {
        var containerClassName = _a.containerClassName;
        var store = ToastStore_1.default;
        store.checkForVariables();
        var isSuccess = store.toastType === ToastStore_1.ToastType.SUCCESS;
        var toastContainerClasses = containerClassName !== null && containerClassName !== void 0 ? containerClassName : "toast-view bottom-right";
        return (React.createElement(react_bootstrap_1.ToastContainer, { className: toastContainerClasses },
            React.createElement(react_bootstrap_1.Toast, { show: store.isShowing, onClose: (0, mobx_1.action)(function () { return store.isShowing = false; }), delay: 5000, autohide: true },
                React.createElement(react_bootstrap_1.Toast.Body, null,
                    React.createElement("div", { className: "toast-background " + (isSuccess ? "success" : "error") },
                        React.createElement("div", { className: "toast-content " + (isSuccess ? "success" : "error") },
                            React.createElement("div", { className: "toast-text" },
                                React.createElement("div", { className: "toast-header", "test-id": "toast_header", "data-cname": "toast_header" },
                                    React.createElement("div", { className: "toast-icon" }, isSuccess ?
                                        React.createElement(InlineSvgComponents_1.InlineSvg, { className: "check-green", src: "/images/icons/material/icon-check-circle-filled-24.svg" }) :
                                        React.createElement(InlineSvgComponents_1.InlineSvg, { className: "missed-red", src: "/images/icons/material/icon-missed-filled-24.svg" })),
                                    React.createElement("span", null, store.toastHeader)),
                                store.toastMessage && React.createElement("div", { className: "toast-message", "test-id": "toast_message", "data-cname": "toast_message" }, store.toastMessage)),
                            React.createElement(react_bootstrap_1.CloseButton, { type: "button", "aria-label": "Close", className: "close-toast " + (isSuccess ? "success" : "error"), onClick: (0, mobx_1.action)(function () { return store.isShowing = false; }), "data-cname": "close_toast", "test-id": "close_toast" })))))));
    });
});

//# sourceMappingURL=ToastView.js.map

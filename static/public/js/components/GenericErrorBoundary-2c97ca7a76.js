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
define(["require", "exports", "eventLogging", "react"], function (require, exports, eventLogging, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GenericErrorBoundaryView = void 0;
    var GenericErrorBoundaryView = (function (_super) {
        __extends(GenericErrorBoundaryView, _super);
        function GenericErrorBoundaryView(props) {
            var _this = _super.call(this, props) || this;
            _this.state = { hasError: false, errorCount: 0 };
            return _this;
        }
        Object.defineProperty(GenericErrorBoundaryView, "getDerivedStateFromError", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (_) {
                return { hasError: true };
            }
        });
        Object.defineProperty(GenericErrorBoundaryView.prototype, "componentDidCatch", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (error, errorInfo) {
                this.setState(function (prevState) {
                    var _a;
                    return { errorCount: ((_a = prevState.errorCount) !== null && _a !== void 0 ? _a : 0) + 1 };
                });
                if (this.props.errorCallback != null) {
                    this.props.errorCallback(error, errorInfo);
                }
                console.error(error);
                if (errorInfo === null || errorInfo === void 0 ? void 0 : errorInfo.componentStack) {
                    console.error(errorInfo.componentStack);
                }
                eventLogging.logError(error, "reactJS-uncaughtComponentError", (function (loggableEvent) {
                    if (errorInfo === null || errorInfo === void 0 ? void 0 : errorInfo.componentStack) {
                        loggableEvent.componentStack = eventLogging.truncateText(errorInfo.componentStack);
                    }
                }));
            }
        });
        Object.defineProperty(GenericErrorBoundaryView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.state.hasError && this.props.removeComponentOnError) {
                    return null;
                }
                if (this.state.hasError && this.props.errorView != null) {
                    return (React.createElement(React.StrictMode, null, this.props.errorView));
                }
                if (this.state.hasError && this.props.errorHtml != null) {
                    return React.createElement(React.StrictMode, null,
                        React.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.errorHtml } }));
                }
                if (this.state.hasError && this.state.errorCount > 50) {
                    console.error("error boundary exceeding error count threshold");
                    return null;
                }
                return (React.createElement(React.StrictMode, null, this.props.children));
            }
        });
        return GenericErrorBoundaryView;
    }(React.Component));
    exports.GenericErrorBoundaryView = GenericErrorBoundaryView;
});

//# sourceMappingURL=GenericErrorBoundary.js.map

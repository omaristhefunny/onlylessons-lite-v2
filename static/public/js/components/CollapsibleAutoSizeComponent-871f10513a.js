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
define(["require", "exports", "mobx-react", "react"], function (require, exports, mobx_react_1, React) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CollapsibleAutoSizeComponent = exports.AutoSizeProperties = void 0;
    var AutoSizeProperties = (function () {
        function AutoSizeProperties() {
            Object.defineProperty(this, "containerSizeProperty", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "contentSizeProperty", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "currentSizeProperty", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "transverseSizeProperty", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
        }
        Object.defineProperty(AutoSizeProperties, "HEIGHT", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                containerSizeProperty: "height",
                contentSizeProperty: "scrollHeight",
                currentSizeProperty: "clientHeight",
                transverseSizeProperty: "inlineSize",
            }
        });
        Object.defineProperty(AutoSizeProperties, "WIDTH", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                containerSizeProperty: "width",
                contentSizeProperty: "scrollWidth",
                currentSizeProperty: "clientWidth",
                transverseSizeProperty: "blockSize",
            }
        });
        return AutoSizeProperties;
    }());
    exports.AutoSizeProperties = AutoSizeProperties;
    var TransitionState;
    (function (TransitionState) {
        TransitionState["COLLAPSED"] = "COLLAPSED";
        TransitionState["EXPANDED_HAS_EXPLICIT_HEIGHT"] = "EXPANDED_HAS_EXPLICIT_HEIGHT";
        TransitionState["EXPANDED_NO_EXPLICIT_HEIGHT"] = "EXPANDED_NO_EXPLICIT_HEIGHT";
    })(TransitionState || (TransitionState = {}));
    exports.CollapsibleAutoSizeComponent = (0, mobx_react_1.observer)((_a = (function (_super) {
            __extends(CollapsibleAutoSizeComponent, _super);
            function CollapsibleAutoSizeComponent(props) {
                var _this = _super.call(this, props) || this;
                Object.defineProperty(_this, "actualInnerSize", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                });
                Object.defineProperty(_this, "animationFromHandle", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                });
                Object.defineProperty(_this, "innerRef", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: React.createRef()
                });
                Object.defineProperty(_this, "outerRef", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: React.createRef()
                });
                var initialState = (_this.props.collapsed) ? TransitionState.COLLAPSED : TransitionState.EXPANDED_NO_EXPLICIT_HEIGHT;
                _this.state = { transitionState: initialState };
                return _this;
            }
            Object.defineProperty(CollapsibleAutoSizeComponent.prototype, "componentDidMount", {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function () {
                    this.updateActualInnerSize();
                }
            });
            Object.defineProperty(CollapsibleAutoSizeComponent.prototype, "componentDidUpdate", {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function (prevProps, prevState, snapshot) {
                    if (prevProps.collapsed != null && prevProps.collapsed != this.props.collapsed) {
                        this.startTransition();
                    }
                }
            });
            Object.defineProperty(CollapsibleAutoSizeComponent.prototype, "render", {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function () {
                    var _b = this.props, axis = _b.axis, overflow = _b.overflow, className = _b.className, children = _b.children;
                    var classNames = ["collapsible-auto-size"];
                    if (this.state.transitionState == TransitionState.COLLAPSED) {
                        classNames.push("collapsible-auto-size--collapsed");
                    }
                    if (className) {
                        classNames.push(className);
                    }
                    var containerSizeProperty = axis.containerSizeProperty;
                    var styles = {
                        overflow: overflow,
                    };
                    if (this.state.transitionState == TransitionState.COLLAPSED) {
                        styles[containerSizeProperty] = "0px";
                    }
                    else if (this.state.transitionState == TransitionState.EXPANDED_HAS_EXPLICIT_HEIGHT) {
                        styles[containerSizeProperty] = this.actualInnerSize + "px";
                    }
                    else {
                    }
                    return React.createElement("div", { ref: this.outerRef, className: classNames.join(" "), style: styles },
                        React.createElement("div", { ref: this.innerRef }, children));
                }
            });
            Object.defineProperty(CollapsibleAutoSizeComponent.prototype, "startTransition", {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function () {
                    var _this = this;
                    if (this.animationFromHandle != null) {
                        this.conditionalLog("cancel handle=" + this.animationFromHandle);
                        window.cancelAnimationFrame(this.animationFromHandle);
                        this.animationFromHandle = null;
                    }
                    this.updateActualInnerSize();
                    this.setTransitionState(TransitionState.EXPANDED_HAS_EXPLICIT_HEIGHT);
                    var transitionDurationMillis = this.determineTransitionDurationMillis() + 200;
                    var startTime = null;
                    var transitionAnimationFrameStep = function (time) {
                        _this.conditionalLog("FrameStep state=" + _this.state.transitionState);
                        if (startTime == null) {
                            startTime = time;
                        }
                        var elapsedTime = time - startTime;
                        if (elapsedTime > transitionDurationMillis) {
                            console.warn("collapse: forced loop exit due to timeout");
                            return;
                        }
                        if (_this.state.transitionState != TransitionState.EXPANDED_HAS_EXPLICIT_HEIGHT) {
                            console.warn("collapse: unexpected transition state in animation loop state=" + _this.state.transitionState);
                            return;
                        }
                        if (_this.props.collapsed) {
                            var currentSizeStyle = _this.outerRef.current.style[_this.props.axis.containerSizeProperty];
                            var expectedSizeStyle = _this.actualInnerSize + "px";
                            if (currentSizeStyle != expectedSizeStyle) {
                                _this.animationFromHandle = window.requestAnimationFrame(transitionAnimationFrameStep);
                                return;
                            }
                            _this.setTransitionState(TransitionState.COLLAPSED);
                            return;
                        }
                        var currentOuterSize = _this.outerRef.current[_this.props.axis.currentSizeProperty];
                        _this.conditionalLog("clientSize=" + currentOuterSize + " targetSize=" + _this.actualInnerSize);
                        if (currentOuterSize == _this.actualInnerSize) {
                            _this.setTransitionState(TransitionState.EXPANDED_NO_EXPLICIT_HEIGHT);
                            return;
                        }
                        _this.animationFromHandle = window.requestAnimationFrame(transitionAnimationFrameStep);
                    };
                    this.animationFromHandle = window.requestAnimationFrame(transitionAnimationFrameStep);
                }
            });
            Object.defineProperty(CollapsibleAutoSizeComponent.prototype, "setTransitionState", {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function (transitionState) {
                    this.setState({ transitionState: transitionState });
                }
            });
            Object.defineProperty(CollapsibleAutoSizeComponent.prototype, "updateActualInnerSize", {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function () {
                    var _b, _c;
                    this.actualInnerSize = (_b = this.innerRef.current) === null || _b === void 0 ? void 0 : _b[this.props.axis.contentSizeProperty];
                    this.conditionalLog("updateActualInnerSize size=" + ((_c = this.innerRef.current) === null || _c === void 0 ? void 0 : _c[this.props.axis.contentSizeProperty]));
                }
            });
            Object.defineProperty(CollapsibleAutoSizeComponent.prototype, "determineTransitionDurationMillis", {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function () {
                    var transitionDurationCssString = window.getComputedStyle(this.outerRef.current).transitionDuration;
                    if (!transitionDurationCssString) {
                        return this.props.fallbackTransitionDurationMillis;
                    }
                    return parseFloat(transitionDurationCssString) * (/\ds$/.test(transitionDurationCssString) ? 1000 : 1);
                }
            });
            Object.defineProperty(CollapsibleAutoSizeComponent.prototype, "conditionalLog", {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function (message) {
                    var shouldLog = false;
                    if (!shouldLog) {
                        return;
                    }
                    console.log("collapse: vid=" + this.props.debugName + " " + message);
                }
            });
            return CollapsibleAutoSizeComponent;
        }(React.Component)),
        Object.defineProperty(_a, "defaultProps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { axis: AutoSizeProperties.HEIGHT, collapsed: false, debugName: Math.random(), fallbackTransitionDurationMillis: 300, overflow: "visible" }
        }),
        _a));
});

//# sourceMappingURL=CollapsibleAutoSizeComponent.js.map

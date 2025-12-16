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
define(["require", "exports", "vfx/EventPassthroughRef", "react"], function (require, exports, EventPassthroughRef_1, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransitionFadeAndSlideLeft = exports.TransitionFadeIn = exports.TransitionSlide = exports.TransitionSlideRight = exports.TransitionSlideLeft = exports.StudyTransitionFX = void 0;
    function extractChild(props) {
        if (!(props === null || props === void 0 ? void 0 : props.children)) {
            return null;
        }
        var arr = React.Children.toArray(props.children);
        return (arr.length == 1 ? arr[0] : null);
    }
    var StudyTransitionFX = (function (_super) {
        __extends(StudyTransitionFX, _super);
        function StudyTransitionFX(props) {
            var _this = _super.call(this, props) || this;
            Object.defineProperty(_this, "containerRef", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "previousRef", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "currentRef", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "onEffectStart", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (event) {
                    var _a, _b;
                    (_b = (_a = _this.props).onEffectStart) === null || _b === void 0 ? void 0 : _b.call(_a, event);
                }
            });
            Object.defineProperty(_this, "onEffectCancel", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (event) {
                    var _a, _b;
                    (_b = (_a = _this.props).onEffectCancel) === null || _b === void 0 ? void 0 : _b.call(_a, event);
                }
            });
            Object.defineProperty(_this, "onEffectEnd", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (event) {
                    var _a, _b;
                    _this.setState({ effectState: "DONE" });
                    (_b = (_a = _this.props).onEffectEnd) === null || _b === void 0 ? void 0 : _b.call(_a, event);
                }
            });
            var onEffectStart = _this.wrapEventListener(_this.onEffectStart);
            var onEffectCancel = _this.wrapEventListener(_this.onEffectCancel);
            var onEffectEnd = _this.wrapEventListener(_this.onEffectEnd);
            _this.containerRef = (0, EventPassthroughRef_1.buildEventPassthroughRef)({
                onAnimationStart: onEffectStart,
                onAnimationCancel: onEffectCancel,
                onAnimationEnd: onEffectEnd,
                onTransitionStart: onEffectStart,
                onTransitionCancel: onEffectCancel,
                onTransitionEnd: onEffectEnd,
            });
            _this.previousRef = React.createRef();
            _this.currentRef = React.createRef();
            _this.state = {
                effectState: _this.props.animateInitialChild ? "READY" : "DONE",
            };
            return _this;
        }
        Object.defineProperty(StudyTransitionFX.prototype, "componentDidMount", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.props.animateInitialChild) {
                    this.triggerEffect();
                }
            }
        });
        Object.defineProperty(StudyTransitionFX.prototype, "componentDidUpdate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (prevProps, prevState) {
                var _this = this;
                var oldChild = extractChild(prevProps);
                var oldKey = oldChild === null || oldChild === void 0 ? void 0 : oldChild.key;
                var newChild = extractChild(this.props);
                var newKey = newChild === null || newChild === void 0 ? void 0 : newChild.key;
                if ((oldChild && !oldChild.key) || (newChild && !newChild.key)) {
                    throw new Error("StudyTransitionFX children must have a key");
                }
                if (newKey != oldKey) {
                    this.setState({ previous: oldChild, effectState: "READY" }, function () { return _this.triggerEffect(); });
                }
            }
        });
        Object.defineProperty(StudyTransitionFX.prototype, "triggerEffect", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var effectState = this.state.effectState;
                if (effectState !== "READY") {
                    throw new Error("StudyTransitionFX not ready to trigger the effect, effectState=" + effectState);
                }
                requestAnimationFrame(function () {
                    _this.setState({ effectState: "ANIMATING" });
                });
            }
        });
        Object.defineProperty(StudyTransitionFX.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var previous = this.state.previous;
                var current = this.props.children;
                var previousElement = null;
                if (previous) {
                    previousElement = React.createElement("div", { ref: this.previousRef, className: "study-transitionfx__previous" }, previous);
                }
                var currentElement = null;
                if (current) {
                    currentElement = React.createElement("div", { ref: this.currentRef, className: "study-transitionfx__current" }, current);
                }
                var classNames = ["study-transitionfx", this.props.className];
                return React.createElement("div", { className: classNames.join(" "), ref: this.containerRef, "data-effect-state": this.state.effectState },
                    this.state.effectState !== 'DONE' && previousElement,
                    currentElement);
            }
        });
        Object.defineProperty(StudyTransitionFX.prototype, "wrapEventListener", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (listener) {
                if (!listener) {
                    return undefined;
                }
                var self = this;
                return function (event) {
                    if (event.target === self.previousRef.current || event.target === self.currentRef.current) {
                        listener.apply(this, [event]);
                    }
                };
            }
        });
        return StudyTransitionFX;
    }(React.Component));
    exports.StudyTransitionFX = StudyTransitionFX;
    var StudyTransitionFXEffect = (function (_super) {
        __extends(StudyTransitionFXEffect, _super);
        function StudyTransitionFXEffect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StudyTransitionFXEffect;
    }(React.Component));
    var TransitionSlideLeft = (function (_super) {
        __extends(TransitionSlideLeft, _super);
        function TransitionSlideLeft() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TransitionSlideLeft.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a;
                var duration = (_a = this.props.duration) !== null && _a !== void 0 ? _a : "normal";
                return React.createElement(StudyTransitionFX, { className: "study-transitionfx-slide-left--".concat(duration), animateInitialChild: true }, this.props.children);
            }
        });
        return TransitionSlideLeft;
    }(StudyTransitionFXEffect));
    exports.TransitionSlideLeft = TransitionSlideLeft;
    var TransitionSlideRight = (function (_super) {
        __extends(TransitionSlideRight, _super);
        function TransitionSlideRight() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TransitionSlideRight.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a;
                var duration = (_a = this.props.duration) !== null && _a !== void 0 ? _a : "normal";
                return React.createElement(StudyTransitionFX, { className: "study-transitionfx-slide-right--".concat(duration), animateInitialChild: true }, this.props.children);
            }
        });
        return TransitionSlideRight;
    }(StudyTransitionFXEffect));
    exports.TransitionSlideRight = TransitionSlideRight;
    var TransitionSlide = (function (_super) {
        __extends(TransitionSlide, _super);
        function TransitionSlide() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TransitionSlide.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a;
                var duration = (_a = this.props.duration) !== null && _a !== void 0 ? _a : "normal";
                return React.createElement(StudyTransitionFX, { className: "study-transitionfx-slide-".concat(this.props.direction, "--").concat(duration) }, this.props.children);
            }
        });
        return TransitionSlide;
    }(StudyTransitionFXEffect));
    exports.TransitionSlide = TransitionSlide;
    var TransitionFadeIn = (function (_super) {
        __extends(TransitionFadeIn, _super);
        function TransitionFadeIn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TransitionFadeIn.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a;
                var duration = (_a = this.props.duration) !== null && _a !== void 0 ? _a : "normal";
                return React.createElement(StudyTransitionFX, { className: "study-transitionfx-fade-in--".concat(duration), animateInitialChild: true }, this.props.children);
            }
        });
        return TransitionFadeIn;
    }(StudyTransitionFXEffect));
    exports.TransitionFadeIn = TransitionFadeIn;
    var TransitionFadeAndSlideLeft = (function (_super) {
        __extends(TransitionFadeAndSlideLeft, _super);
        function TransitionFadeAndSlideLeft() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TransitionFadeAndSlideLeft.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a;
                var duration = (_a = this.props.duration) !== null && _a !== void 0 ? _a : "normal";
                return React.createElement(StudyTransitionFX, { className: "study-transitionfx-fade-and-slide-left--".concat(duration) }, this.props.children);
            }
        });
        return TransitionFadeAndSlideLeft;
    }(StudyTransitionFXEffect));
    exports.TransitionFadeAndSlideLeft = TransitionFadeAndSlideLeft;
});

//# sourceMappingURL=TransitionFX.js.map

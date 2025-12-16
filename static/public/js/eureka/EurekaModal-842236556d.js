var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
define(["require", "exports", "eureka/EurekaButton", "eureka/EurekaSkeletonBox", "eureka/EurekaSkeletonText", "lib/react-bootstrap", "mobx-react", "react", "react-utils/media-query-store-util", "react-utils/react-study-helpers", "util/InlineSvgComponents"], function (require, exports, EurekaButton_1, EurekaSkeletonBox_1, EurekaSkeletonText_1, react_bootstrap_1, mobx_react_1, React, media_query_store_util_1, react_study_helpers_1, InlineSvgComponents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EurekaModal = exports.EurekaModalBodyType = void 0;
    var EurekaModalBodySkeleton = function (props) {
        if (!props.isLoading) {
            return React.createElement(React.Fragment, null, props.children);
        }
        return React.createElement(React.Fragment, null, Array.from(Array(5).keys()).map(function () { return (React.createElement("div", { className: "eureka-modal-skeleton-question" },
            React.createElement(EurekaSkeletonText_1.EurekaSkeletonText, { className: "eureka-modal-skeleton-question__text", type: EurekaSkeletonText_1.EurekaSkeletonTextType.HEADER }),
            React.createElement(EurekaSkeletonBox_1.EurekaSkeletonBox, { className: "eureka-modal-skeleton-question__input" }))); }));
    };
    var EurekaModalFooterSkeleton = function (props) {
        if (!props.isLoading) {
            return React.createElement(React.Fragment, null, props.children);
        }
        return React.createElement(React.Fragment, null,
            React.createElement(EurekaSkeletonText_1.EurekaSkeletonText, { className: "eureka-modal-skeleton__button", type: EurekaSkeletonText_1.EurekaSkeletonTextType.PARAGRAPH }),
            React.createElement(EurekaSkeletonText_1.EurekaSkeletonText, { className: "eureka-modal-skeleton__button", type: EurekaSkeletonText_1.EurekaSkeletonTextType.PARAGRAPH }));
    };
    var EurekaModalBodyType;
    (function (EurekaModalBodyType) {
        EurekaModalBodyType["DEFAULT"] = "DEFAULT";
        EurekaModalBodyType["FULL"] = "FULL";
    })(EurekaModalBodyType || (exports.EurekaModalBodyType = EurekaModalBodyType = {}));
    exports.EurekaModal = (0, mobx_react_1.observer)(function (props) {
        var _a = props.bodyType, bodyType = _a === void 0 ? EurekaModalBodyType.DEFAULT : _a, bodyClassName = props.bodyClassName, cancelLabel = props.cancelLabel, children = props.children, className = props.className, cnameTestIdPrefix = props.cnameTestIdPrefix, _b = props.enableTracking, enableTracking = _b === void 0 ? false : _b, footerCancelButtonClick = props.footerCancelButtonClick, headerClassName = props.headerClassName, _c = props.isLoading, isLoading = _c === void 0 ? false : _c, isSubmitDisabled = props.isSubmitDisabled, isSubmitting = props.isSubmitting, onClose = props.onClose, onSubmit = props.onSubmit, _d = props.showCloseButton, showCloseButton = _d === void 0 ? true : _d, _e = props.showFooter, showFooter = _e === void 0 ? true : _e, _f = props.showFooterCancelButton, showFooterCancelButton = _f === void 0 ? true : _f, _g = props.submitButtonType, submitButtonType = _g === void 0 ? EurekaButton_1.EurekaButtonType.PRIMARY : _g, submitLabel = props.submitLabel, title = props.title, otherProps = __rest(props, ["bodyType", "bodyClassName", "cancelLabel", "children", "className", "cnameTestIdPrefix", "enableTracking", "footerCancelButtonClick", "headerClassName", "isLoading", "isSubmitDisabled", "isSubmitting", "onClose", "onSubmit", "showCloseButton", "showFooter", "showFooterCancelButton", "submitButtonType", "submitLabel", "title"]);
        var modalClasses = ["eureka-modal"];
        if (className) {
            modalClasses.push(className);
        }
        var modalBodyClasses = ["eureka-modal__body"];
        if (isLoading) {
            modalBodyClasses.push("eureka-modal-skeleton-body");
        }
        if (bodyType === EurekaModalBodyType.DEFAULT) {
            modalBodyClasses.push("eureka-modal__body--padding");
        }
        if (bodyClassName) {
            modalBodyClasses.push(bodyClassName);
        }
        var modalHeaderClasses = ["eureka-modal__header"];
        if (headerClassName) {
            modalHeaderClasses.push(headerClassName);
        }
        return React.createElement(react_study_helpers_1.StudyThemeProvider, null,
            React.createElement(react_bootstrap_1.Modal, __assign({ className: modalClasses.join(" "), onHide: onClose, "data-cname": "".concat(cnameTestIdPrefix, "_modal"), "test-id": "".concat(cnameTestIdPrefix, "_modal"), backdrop: props.backdrop }, (media_query_store_util_1.smallMaxQuery.matches && { fullscreen: true }), otherProps),
                React.createElement(react_bootstrap_1.Modal.Header, { className: modalHeaderClasses.join(" ") },
                    React.createElement(react_bootstrap_1.Modal.Title, { className: "eureka-modal__title", "data-cname": "".concat(cnameTestIdPrefix, "_modal_title") }, title),
                    showCloseButton && React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-close-24.svg", className: "eureka-modal__close svg-24", "data-cname": "".concat(cnameTestIdPrefix, "_modal_close"), "test-id": "".concat(cnameTestIdPrefix, "_modal_close"), onClick: onClose })),
                React.createElement(react_bootstrap_1.Modal.Body, { className: modalBodyClasses.join(" "), "data-track-visible": !!enableTracking, "data-cname": "".concat(cnameTestIdPrefix, "_modal_body") },
                    React.createElement(EurekaModalBodySkeleton, { isLoading: isLoading }, children)),
                showFooter && React.createElement(react_bootstrap_1.Modal.Footer, { className: "eureka-modal__footer" },
                    React.createElement(EurekaModalFooterSkeleton, { isLoading: isLoading },
                        showFooterCancelButton && React.createElement(EurekaButton_1.EurekaButton, { className: "eureka-modal__cancel", buttonType: EurekaButton_1.EurekaButtonType.TERTIARY_LINK, "data-cname": "".concat(cnameTestIdPrefix, "_modal_cancel"), "test-id": "".concat(cnameTestIdPrefix, "_modal_cancel"), onClick: footerCancelButtonClick || onClose }, cancelLabel !== null && cancelLabel !== void 0 ? cancelLabel : "Cancel"),
                        onSubmit && React.createElement(EurekaButton_1.EurekaButton, { isLoading: isSubmitting, buttonType: submitButtonType, "data-cname": "".concat(cnameTestIdPrefix, "_modal_submit"), "test-id": "".concat(cnameTestIdPrefix, "_modal_submit"), disabled: isSubmitDisabled, onClick: onSubmit }, submitLabel !== null && submitLabel !== void 0 ? submitLabel : "Submit")))));
    });
});

//# sourceMappingURL=EurekaModal.js.map

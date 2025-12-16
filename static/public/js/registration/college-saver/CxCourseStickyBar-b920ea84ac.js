define(["require", "exports", "@study-com/eureka-design-system", "mobx-react", "react", "./CxCourseCart"], function (require, exports, eureka_design_system_1, mobx_react_1, React, CxCourseCart_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CxCourseStickyBar = void 0;
    exports.CxCourseStickyBar = (0, mobx_react_1.observer)(function (_a) {
        var _b;
        var app = _a.app;
        var _c = React.useState(false), isModalOpen = _c[0], setIsModalOpen = _c[1];
        var selectedCoursesCount = ((_b = app.cxSlimCourseList) === null || _b === void 0 ? void 0 : _b.length) || 0;
        var handleOpenModal = function () {
            setIsModalOpen(true);
        };
        var handleCloseModal = function () {
            setIsModalOpen(false);
        };
        var getCoursesButtonText = function () {
            if (selectedCoursesCount === 0) {
                return "Your courses";
            }
            return "Your courses (".concat(selectedCoursesCount, ")");
        };
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "cx-course-sticky-bar", "data-cname": "cx_course_sticky_bar", "test-id": "cx_course_sticky_bar" },
                React.createElement("div", { className: "cx-course-sticky-bar__container" },
                    React.createElement(React.Fragment, null,
                        React.createElement(eureka_design_system_1.Button, { type: "button", variant: eureka_design_system_1.Button.Variant.LINK, className: "cx-course-sticky-bar__courses-button", onClick: handleOpenModal, "data-cname": "cx_course_sticky_bar_courses_button", "test-id": "cx_course_sticky_bar_courses_button" }, getCoursesButtonText()),
                        React.createElement(eureka_design_system_1.Button, { variant: eureka_design_system_1.Button.Variant.PRIMARY, type: "submit", className: "cx-course-sticky-bar__continue-button", "data-cname": "cx_course_sticky_bar_continue_button", "test-id": "cx_course_sticky_bar_continue_button", disabled: selectedCoursesCount === 0 }, "Continue")))),
            React.createElement(eureka_design_system_1.Modal, { className: "cx-course-sticky-bar-modal", isOpen: isModalOpen, onClose: handleCloseModal, "data-cname": "cx_course_sticky_bar_modal", "data-track-visible": true },
                React.createElement(eureka_design_system_1.Modal.Header, { "data-cname": "cx_course_sticky_bar_modal_header" }, "Your Selected Courses"),
                React.createElement(eureka_design_system_1.Modal.Content, { "data-cname": "cx_course_sticky_bar_modal_content" },
                    React.createElement(CxCourseCart_1.CxCourseCart, { app: app })),
                React.createElement(eureka_design_system_1.Modal.Footer, null,
                    React.createElement(eureka_design_system_1.Button, { variant: eureka_design_system_1.Button.Variant.LINK, type: "button", onClick: handleCloseModal, "data-cname": "cx_course_sticky_bar_modal_close_button", "test-id": "cx_course_sticky_bar_modal_close_button" }, "Add courses"),
                    React.createElement(eureka_design_system_1.Button, { variant: eureka_design_system_1.Button.Variant.PRIMARY, type: "submit", onClick: function () {
                            handleCloseModal();
                        }, "data-cname": "cx_course_sticky_bar_modal_continue_button", "test-id": "cx_course_sticky_bar_modal_continue_button", disabled: selectedCoursesCount === 0 }, "Continue")))));
    });
});

//# sourceMappingURL=CxCourseStickyBar.js.map

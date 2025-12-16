define(["require", "exports", "@sites-study-com/remspect", "@sites-study-com/ssr-cx", "@study-com/eureka-design-system", "mobx", "mobx-react", "react", "react", "util/InlineSvgComponents"], function (require, exports, remspect, ssr_cx_1, eureka_design_system_1, mobx_1, mobx_react_1, React, react_1, InlineSvgComponents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CxCourseCart = void 0;
    exports.CxCourseCart = (0, mobx_react_1.observer)(function (_a) {
        var app = _a.app;
        var cartRef = (0, react_1.useRef)(null);
        var containerRef = (0, react_1.useRef)(null);
        var courses = app.cxSlimCourseList || [];
        courses = courses.filter(function (course) {
            return app.regMetadata.cxCourseIdList.includes(course.academyAssetId);
        });
        var handleRemoveCourse = function (e, course) {
            if (app.regMetadata.cxCourseIdList) {
                app.regMetadata.cxCourseIdList = app.regMetadata.cxCourseIdList.filter(function (courseId) { return courseId !== course.academyAssetId; });
                if (app.regMetadata.cxCourseIdList.length == 0) {
                    app.setDefaultCxPnPProduct();
                }
            }
            if (app.cxSlimCourseList) {
                app.cxSlimCourseList = app.cxSlimCourseList.filter(function (slimCourse) { return slimCourse.academyAssetId !== course.academyAssetId; });
            }
            app.saveValues();
        };
        var handleSubmit = function (clearCourseSelection) {
            if (clearCourseSelection === void 0) { clearCourseSelection = false; }
            if (clearCourseSelection) {
                app.regMetadata.cxCourseIdList = [];
                app.setProductFromRegData(app.registrationData);
                app.saveValues();
            }
            app.form.advancePage();
        };
        var getAvailabilityText = function (course) {
            return course.inCS1 ? "Available in all college plans" : "Only available in the College Saver plan";
        };
        var classNames = ["cx-course-cart"];
        if (!remspect.isControl("regFormRebrand")) {
            classNames.push("cx-course-cart-rebrand");
        }
        return (React.createElement("div", { ref: containerRef, className: "cx-course-cart-container" },
            React.createElement("div", { ref: cartRef, className: classNames.join(" "), "data-cname": "cx_course_cart", "test-id": "cx_course_cart" },
                React.createElement("div", { className: "cx-course-cart__container" },
                    React.createElement("div", { className: "cx-course-cart__header" }, "Your courses"),
                    React.createElement("div", { className: "cx-course-cart__content" },
                        courses.length > 0 ?
                            React.createElement("div", { className: "cx-course-cart__list" }, courses.map(function (course) { return (React.createElement(ssr_cx_1.RegFormCourseCard, { key: course.academyAssetId, title: course.title, course: course, imageUrl: course.imageUrl, text: remspect.isVariation("cxCourseSelector", "v2") ? getAvailabilityText(course) : "", dataCourseId: course.academyAssetId, variant: "cart", onClick: function (e, course) { return handleRemoveCourse === null || handleRemoveCourse === void 0 ? void 0 : handleRemoveCourse(e, course); }, "data-cname": "cx_course_cart_course_card_".concat(course.academyAssetId), "test-id": "cx_course_cart_course_card_".concat(course.academyAssetId), forceShowImage: true })); }))
                            :
                                React.createElement("div", { className: "cx-course-cart__empty" },
                                    React.createElement("div", { className: "cx-course-cart__empty-icon" },
                                        React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/cx/lightbulb.svg" })),
                                    React.createElement("div", { className: "cx-course-cart__empty-text" },
                                        React.createElement("div", { className: "cx-course-cart__empty-title" }, "Your course list is empty"),
                                        React.createElement("div", { className: "cx-course-cart__empty-subtitle" }, "We'll recommend a plan based on your selected courses."))),
                        React.createElement(eureka_design_system_1.Button, { "data-cname": "course-cart-continue", "test-id": "course-cart-continue", onClick: (0, mobx_1.action)(function () { return handleSubmit(); }), variant: "PRIMARY", fillWidth: true, disabled: courses.length === 0, className: "cx-course-cart__continue-btn" }, "Continue"))),
                React.createElement(eureka_design_system_1.Button, { "data-cname": "course-cart-skip", "test-id": "course-cart-skip", variant: "LINK", onClick: (0, mobx_1.action)(function () { return handleSubmit(true); }), disabled: courses.length > 0, className: "cx-course-cart__skip-btn" }, "Skip"))));
    });
});

//# sourceMappingURL=CxCourseCart.js.map

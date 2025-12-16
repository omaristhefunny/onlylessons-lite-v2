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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports", "@sites-study-com/marketing-constants", "@sites-study-com/remspect", "@sites-study-com/ssr-cx", "@study-com/eureka-design-system", "components/CollapsibleAutoSizeComponent", "mobx", "mobx-react", "react", "react", "registration/ReactRegAppUtil"], function (require, exports, Marketing, remspect, ssr_cx_1, eureka_design_system_1, CollapsibleAutoSizeComponent_1, mobx_1, mobx_react_1, React, react_1, ReactRegAppUtil_1) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RegProductModalSwitcherOnCartWrapper = exports.RegProductModalSwitcher = exports.CXCoursesAvailabilities = exports.ProductMetaInfo = void 0;
    exports.shouldRenderCXProductModalSwitcherOnCart = shouldRenderCXProductModalSwitcherOnCart;
    exports.inCXCartSwitchMobileV2Variation = inCXCartSwitchMobileV2Variation;
    exports.ProductMetaInfo = (_a = {},
        _a["CS1"] = {
            name: "College Starter",
            description: "Best for students completing General Eds and pre-requisite courses",
        },
        _a["CS3"] = {
            name: "College Saver",
            description: "Best for full access to all " + Marketing.com_study_cx_claims_transferableCourses + "+ lower & upper division courses"
        },
        _a);
    var SingleProductWrapper = function (props) {
        var _a;
        var _b, _c, _d;
        var productViews = (_a = {},
            _a["CS1"] = React.createElement(CollegeStarterProductView, __assign({}, props)),
            _a["CS3"] = React.createElement(CollegeSaverProductView, __assign({}, props)),
            _a);
        var product = props.product, isBest = props.isBest, isCurrent = props.isCurrent, onProductConfirm = props.onProductConfirm, isOpen = props.isOpen, isMobileActive = props.isMobileActive;
        var productView = productViews[product.key];
        var metaInfo = exports.ProductMetaInfo[product.key];
        if (!productViews || !metaInfo) {
            return null;
        }
        var _e = React.useState(false), delayedCurrent = _e[0], setDelayedCurrent = _e[1];
        (0, react_1.useEffect)(function () {
            if (isOpen && delayedCurrent != isCurrent) {
                setDelayedCurrent(isCurrent);
            }
        }, [isOpen, isCurrent]);
        var rootClass = "reg-product-switcher-product";
        var extraClasses = [];
        if (isBest) {
            extraClasses.push("best-product");
        }
        if (isCurrent) {
            extraClasses.push("current-product");
        }
        if (isMobileActive) {
            extraClasses.push("mobile-active");
        }
        var actionText = delayedCurrent ? "Continue with" : "Change to";
        var productName = (_b = product.displayName) !== null && _b !== void 0 ? _b : metaInfo.name;
        var buttonText = "".concat(actionText, " ").concat(productName);
        var trackingAttr = "btn_" + buttonText.replace(/\s+/g, "_").toLowerCase();
        var labelText = isMobileActive ? "Recommended for you" : "Recommended based on your courses";
        return React.createElement("div", { className: [rootClass].concat(extraClasses).join(" ") },
            isBest && React.createElement("div", { className: "best-product-label" }, ((_c = props.selectedCourses) === null || _c === void 0 ? void 0 : _c.length) > 0 ? labelText : "Most popular"),
            React.createElement("div", { className: "".concat(extraClasses.join(" "), " ").concat(rootClass, "__body") },
                productView,
                React.createElement("div", { className: "reg-product-switcher-product__price" },
                    React.createElement("span", { className: "price-number" }, product.remspectPriceStringDollars.replace(/(\.\d+)?$/, "")),
                    React.createElement("span", { className: "billing-term" },
                        "/", (_d = product.billingIntervalType) === null || _d === void 0 ? void 0 :
                        _d.toLowerCase())),
                React.createElement("div", { className: "reg-product-switcher-product__button-container" },
                    React.createElement(eureka_design_system_1.Button, { "data-cname": trackingAttr, "test-id": trackingAttr, fillWidth: true, "data-track-visible": true, variant: isBest ? eureka_design_system_1.Button.Variant.PRIMARY : eureka_design_system_1.Button.Variant.TERTIARY, onClick: function (e) { return onProductConfirm(product.key); } }, buttonText))));
    };
    var ProductComparison = function (props) {
        var _a, _b;
        var products = props.products, currentProduct = props.currentProduct, onProductConfirm = props.onProductConfirm, isOpen = props.isOpen, selectedCourses = props.selectedCourses;
        var _c = React.useState(currentProduct), delayedCurrent = _c[0], setDelayedCurrent = _c[1];
        (0, react_1.useEffect)(function () {
            if (isOpen && delayedCurrent !== currentProduct) {
                setDelayedCurrent(currentProduct);
            }
        }, [isOpen, currentProduct]);
        var comparisonFeatures = __spreadArray(__spreadArray([
            {
                label: "".concat(Marketing.com_study_cx_claims_cs1CourseCount, " general education courses"),
                cs3Available: true,
                cs1Available: true
            },
            {
                label: "".concat(parseInt(Marketing.com_study_cx_claims_transferableCourses) - parseInt(Marketing.com_study_cx_claims_cs1CourseCount), "+ premium & upper-division courses"),
                cs3Available: true,
                cs1Available: false
            }
        ], ((selectedCourses === null || selectedCourses === void 0 ? void 0 : selectedCourses.length) > 0 ? [{
                label: selectedCourses.map(function (course) { return course.title; }).join(", ") + " (selected by you)",
                cs3Available: true,
                cs1Available: selectedCourses.every(function (course) { return course.inCS1; })
            }] : []), true), [
            {
                label: "Complete unlimited courses each month",
                cs3Available: true,
                cs1Available: true
            },
            {
                label: "Active course enrollment limit",
                cs3Available: "3 courses",
                cs1Available: "2 courses"
            },
            {
                label: "Save course progress if you unenroll",
                cs3Available: true,
                cs1Available: false
            },
            {
                label: "Get college coaching & course guidance",
                cs3Available: true,
                cs1Available: false
            },
            {
                label: "Personalized AI tutoring",
                cs3Available: true,
                cs1Available: false
            },
            {
                label: "Price",
                cs3Available: "$235/mo",
                cs1Available: "$95/mo"
            }
        ], false);
        var renderFeatureValue = function (value) {
            if (typeof value === 'boolean') {
                if (value) {
                    return (React.createElement("div", { className: "comparison-chart__check-icon" },
                        React.createElement("span", { className: "comparison-chart__icon comparison-chart__icon--check" })));
                }
                else {
                    return (React.createElement("div", { className: "comparison-chart__x-icon" },
                        React.createElement("span", { className: "comparison-chart__icon comparison-chart__icon--x" })));
                }
            }
            return React.createElement("span", { className: "comparison-chart__text-value" }, value);
        };
        var cs3Product = React.useMemo(function () {
            return Object.values(products || {}).find(function (p) { return p.key === "CS3"; });
        }, [products]);
        var cs1Product = React.useMemo(function () {
            return Object.values(products || {}).find(function (p) { return p.key === "CS1"; });
        }, [products]);
        if (!cs3Product || !cs1Product) {
            return null;
        }
        var cs3ActionText = delayedCurrent === "CS3" ? "Continue with" : "Change to";
        var cs1ActionText = delayedCurrent === "CS1" ? "Continue with" : "Change to";
        var cs3ButtonText = "".concat(cs3ActionText, " ").concat(cs3Product.displayName || ((_a = exports.ProductMetaInfo["CS3"]) === null || _a === void 0 ? void 0 : _a.name));
        var cs1ButtonText = "".concat(cs1ActionText, " ").concat(cs1Product.displayName || ((_b = exports.ProductMetaInfo["CS1"]) === null || _b === void 0 ? void 0 : _b.name));
        var cs3TrackingAttr = "btn_" + cs3ButtonText.replace(/\s+/g, "_").toLowerCase();
        var cs1TrackingAttr = "btn_" + cs1ButtonText.replace(/\s+/g, "_").toLowerCase();
        return (React.createElement("div", { className: "product-comparison-mobile" },
            React.createElement("div", { className: "comparison-chart" },
                React.createElement("div", { className: "comparison-chart__header" },
                    React.createElement("div", { className: "comparison-chart__label-col" }),
                    React.createElement("div", { className: "comparison-chart__product-col" },
                        React.createElement("span", { className: "comparison-chart__product-name" }, "College Saver")),
                    React.createElement("div", { className: "comparison-chart__product-col" },
                        React.createElement("span", { className: "comparison-chart__product-name" }, "College Starter"))),
                React.createElement("div", { className: "comparison-chart__body" }, comparisonFeatures.map(function (feature, index) { return (React.createElement("div", { key: index, className: "comparison-chart__row" },
                    React.createElement("div", { className: "comparison-chart__label" },
                        React.createElement("span", { className: "comparison-chart__label-text" }, feature.label)),
                    React.createElement("div", { className: "comparison-chart__value" }, renderFeatureValue(feature.cs3Available)),
                    React.createElement("div", { className: "comparison-chart__value" }, renderFeatureValue(feature.cs1Available)))); })),
                React.createElement("div", { className: "comparison-chart__selected-highlight" },
                    React.createElement("div", { className: "comparison-chart__label-col" }),
                    React.createElement("div", { className: "comparison-chart__product-col comparison-chart__product-col--highlighted" }),
                    React.createElement("div", { className: "comparison-chart__product-col product-col--highlighted" }))),
            React.createElement("div", { className: "product-comparison-mobile__actions" },
                React.createElement(eureka_design_system_1.Button, { "data-cname": cs3TrackingAttr, "test-id": cs3TrackingAttr, fillWidth: true, "data-track-visible": true, variant: eureka_design_system_1.Button.Variant.PRIMARY, onClick: function () { return onProductConfirm("CS3"); } }, cs3ButtonText),
                React.createElement(eureka_design_system_1.Button, { "data-cname": cs1TrackingAttr, "test-id": cs1TrackingAttr, fillWidth: true, "data-track-visible": true, variant: eureka_design_system_1.Button.Variant.TERTIARY, onClick: function () { return onProductConfirm("CS1"); } }, cs1ButtonText))));
    };
    var CXCoursesAvailabilities = function (_a) {
        var product = _a.product, selectedCourses = _a.selectedCourses, collapsed = _a.collapsed, toggleCollapsed = _a.toggleCollapsed, titleOverride = _a.titleOverride;
        if (!selectedCourses || selectedCourses.length === 0) {
            return null;
        }
        var firstThreeCourses = selectedCourses.slice(0, Math.min(3, selectedCourses.length));
        var restCourses = selectedCourses.slice(3);
        var isCS1 = "CS1" === product;
        var isCS3 = "CS3" === product;
        var renderCourseAvailabilityItem = function (course, index, keyOffset) {
            if (keyOffset === void 0) { keyOffset = 0; }
            return (React.createElement("div", { key: "course_".concat(index + keyOffset), className: "course-availability__item" },
                React.createElement("span", { className: "course-availability__item-icon ".concat((isCS1 && !course.inCS1) ? 'not-available' : '') }),
                React.createElement("div", { className: "course-availability__item-title" }, course.title)));
        };
        return React.createElement("div", { className: "reg-product-switcher-course-availability" },
            !!titleOverride && React.createElement("div", { className: "course-availability__title" }, titleOverride),
            !titleOverride && (isCS1 || isCS3) &&
                React.createElement("div", { className: "course-availability__title" }, isCS1 ? "Limited Course Library" : "Full Access to Course Library"),
            React.createElement("div", { className: "course-availability__list" },
                firstThreeCourses.map(function (course, index) { return renderCourseAvailabilityItem(course, index); }),
                (restCourses === null || restCourses === void 0 ? void 0 : restCourses.length) > 0 &&
                    React.createElement(CollapsibleAutoSizeComponent_1.CollapsibleAutoSizeComponent, { collapsed: collapsed }, restCourses.map(function (course, index) { return renderCourseAvailabilityItem(course, index, 3); }))),
            (restCourses === null || restCourses === void 0 ? void 0 : restCourses.length) > 0 &&
                React.createElement(eureka_design_system_1.Button, { "data-cname": "courses_availability_toggle_btn", "test-id": "courses_availability_toggle_btn", variant: eureka_design_system_1.Button.Variant.LINK, className: "course-availability__toggle-btn ".concat(collapsed ? 'collapsed' : ''), onClick: function () { return toggleCollapsed(); } }, collapsed ? "Show more" : "Show less"));
    };
    exports.CXCoursesAvailabilities = CXCoursesAvailabilities;
    var CollegeStarterProductView = function (props) {
        return React.createElement("div", null,
            React.createElement(ssr_cx_1.CXCS1PlanInfoBox, { allowCourseListModal: false, selectedCourses: props.selectedCourses, allFeaturesCollapse: true }));
    };
    var CollegeSaverProductView = function (props) {
        return React.createElement("div", null,
            React.createElement(ssr_cx_1.CXCS3PlanInfoBox, { allowCourseListModal: false, selectedCourses: props.selectedCourses, allFeaturesCollapse: true }));
    };
    exports.RegProductModalSwitcher = (0, mobx_react_1.observer)(function (_a) {
        var products = _a.products, initialProduct = _a.initialProduct, bestProduct = _a.bestProduct, onProductConfirm = _a.onProductConfirm, selectedCourses = _a.selectedCourses;
        if (!products || Object.keys(products).length === 0) {
            return null;
        }
        var _b = React.useState(false), isOpen = _b[0], setIsOpen = _b[1];
        var _c = React.useState(true), isCollapsed = _c[0], setCollapsed = _c[1];
        var _d = React.useState(initialProduct), activeProduct = _d[0], setActiveProduct = _d[1];
        var isMobile = eureka_design_system_1.LayoutHooks.useOnMobile();
        var additionalOnProductConfirm = (0, react_1.useCallback)(function (productKey) {
            setIsOpen(false);
            onProductConfirm(productKey);
        }, [products, initialProduct, onProductConfirm]);
        if ((selectedCourses === null || selectedCourses === void 0 ? void 0 : selectedCourses.length) > 0) {
            selectedCourses = selectedCourses === null || selectedCourses === void 0 ? void 0 : selectedCourses.sort(function (a, b) { return a.inCS1 === b.inCS1 ? 0 : !a.inCS1 ? -1 : 1; });
        }
        var dialogBody;
        if (inCXCartSwitchMobileV2Variation()) {
            dialogBody = React.createElement(ProductComparison, { products: products, currentProduct: initialProduct, onProductConfirm: additionalOnProductConfirm, isOpen: isOpen, selectedCourses: selectedCourses, collapsed: isCollapsed, toggleCollapsed: function () { return setCollapsed(!isCollapsed); } });
        }
        else {
            dialogBody = Object.entries(products).map(function (entry, index) {
                var productKey = entry[0], product = entry[1];
                return React.createElement(SingleProductWrapper, { key: "product_".concat(index, "_").concat(productKey), product: product, isBest: productKey == bestProduct, isCurrent: productKey == initialProduct, onProductConfirm: additionalOnProductConfirm, isOpen: isOpen, selectedCourses: selectedCourses, collapsed: isCollapsed, toggleCollapsed: function () { return setCollapsed(!isCollapsed); }, isMobileActive: isMobile && activeProduct === productKey });
            });
        }
        return React.createElement("div", { className: "reg-change-plan-and-modal-wrapper", "data-cname": "reg_change_plan_" + initialProduct, "data-track-visible": true },
            React.createElement(eureka_design_system_1.Button, { className: "reg-change-plan-button", "data-cname": "reg_change_plan_btn", "test-id": "reg_change_plan_btn", variant: eureka_design_system_1.Button.Variant.LINK, onClick: function () { return setIsOpen(true); } }, "Compare all plan options"),
            React.createElement(eureka_design_system_1.Modal, { className: "reg-product-switcher-modal", fullscreen: ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile(), isOpen: isOpen, onClose: function () { return setIsOpen(false); }, "data-cname": "reg_product_switcher_modal", "data-track-visible": true },
                React.createElement(eureka_design_system_1.Modal.Header, { "data-cname": "reg_product_switcher_modal_header" }, "Choose your plan"),
                React.createElement(eureka_design_system_1.Modal.Content, { "data-cname": "reg-product_switcher_modal_content", "test-id": "reg-product_switcher_modal_content" },
                    React.createElement("div", { className: "reg-product-switcher-modal-content" }, dialogBody))));
    });
    function shouldRenderCXProductModalSwitcherOnCart(app, isLastPage, productOverride) {
        if (remspect.isControl("collegePackagePlansSwitcherModal")) {
            return false;
        }
        if (!app || !app.productMap || !app.isNonUOPXCollegePackageProduct) {
            return false;
        }
        if (!!productOverride) {
            return false;
        }
        return isLastPage;
    }
    function inCXCartSwitchMobileV2Variation() {
        return ReactRegAppUtil_1.reactRegAppUtil.isUserScreenViewMobile() && !remspect.isControl("cxCartSwitcherMobileV2");
    }
    var cxProductSwitcherOnProductConfirm = (0, mobx_1.action)(function (app, selectedProduct) {
        app.regMetadata.product = selectedProduct;
        app.registrationData.productKeyOverride = selectedProduct;
        app.setProductFromRegData(app.registrationData);
        app.saveValues();
    });
    var RegProductModalSwitcherOnCartWrapper = function (_a) {
        var _b;
        var app = _a.app, isLastPage = _a.isLastPage, productOverride = _a.productOverride;
        if (!shouldRenderCXProductModalSwitcherOnCart(app, isLastPage, productOverride)) {
            return null;
        }
        var collegePackageProducts = (_b = {},
            _b["CS3"] = app.productMap["CS3"],
            _b["CS1"] = app.productMap["CS1"],
            _b);
        var selectedCourses = [];
        if (!!app.cxSlimCourseList && app.cxSlimCourseList.length > 0) {
            selectedCourses = app.cxSlimCourseList.slice().sort(function (a, b) { return a.inCS1 === b.inCS1 ? 0 : !a.inCS1 ? -1 : 1; });
        }
        return React.createElement(exports.RegProductModalSwitcher, { initialProduct: app.registrationData.product, products: collegePackageProducts, bestProduct: "CS3", onProductConfirm: function (selectedProduct) { return cxProductSwitcherOnProductConfirm(app, selectedProduct); }, selectedCourses: selectedCourses });
    };
    exports.RegProductModalSwitcherOnCartWrapper = RegProductModalSwitcherOnCartWrapper;
});

//# sourceMappingURL=RegProductModalSwitcher.js.map

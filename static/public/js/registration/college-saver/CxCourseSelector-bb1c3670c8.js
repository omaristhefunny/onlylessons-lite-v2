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
define(["require", "exports", "@sites-study-com/ssr-cx", "lib/axios", "mobx", "mobx-react", "react", "react", "react-bootstrap-typeahead"], function (require, exports, ssr_cx_1, axios_1, mobx_1, mobx_react_1, React, react_1, react_bootstrap_typeahead_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CxCourseSelector = void 0;
    var CxCourseSelectorStore = (function () {
        function CxCourseSelectorStore(app) {
            var _this = this;
            Object.defineProperty(this, "app", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: app
            });
            Object.defineProperty(this, "courseList", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "cs1SiteResourceIdSet", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "companyShortName", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "majorName", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            (0, mobx_1.makeAutoObservable)(this);
            this.loadCourseList();
            this.loadCompanyShortName();
            this.loadMajorName();
            (0, mobx_1.reaction)(function () { return _this.app.registrationData.cxPlannedSchoolCompanyId; }, function () {
                _this.loadCourseList();
                _this.loadCompanyShortName();
            });
            (0, mobx_1.reaction)(function () { return _this.app.registrationData.majorId; }, function () {
                _this.loadCourseList();
                _this.loadMajorName();
            });
            if (this.app.isCollegePackageProduct) {
                this.app.regMetadata.defaultProductKey = this.app.regMetadata.product;
            }
            else {
                app.setDefaultCxPnPProduct();
            }
        }
        Object.defineProperty(CxCourseSelectorStore.prototype, "loadCourseList", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                var params = {};
                if (this.app.registrationData.cxPlannedSchoolCompanyId) {
                    params["cxPlannedSchoolCompanyId"] = this.app.registrationData.cxPlannedSchoolCompanyId;
                }
                if (this.app.registrationData.majorId) {
                    params["majorId"] = this.app.registrationData.majorId;
                }
                axios_1.default.get("/cx/course-selector.ajax", { params: params }).then(function (response) {
                    _this.courseList = response.data.courseList;
                    _this.cs1SiteResourceIdSet = new Set(response.data.cs1SiteResourceIdSet);
                });
            }
        });
        Object.defineProperty(CxCourseSelectorStore.prototype, "loadCompanyShortName", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (!this.app.shouldShowCXCourseSelectorTest) {
                    return;
                }
                if (this.app.registrationData.cxPlannedSchoolCompanyId) {
                    var params = { companyId: this.app.registrationData.cxPlannedSchoolCompanyId };
                    axios_1.default.get("/cx/company-short-name.ajax", { params: params }).then(function (response) {
                        _this.companyShortName = response.data;
                    }).catch(function () {
                        _this.companyShortName = null;
                    });
                }
                else {
                    this.companyShortName = null;
                }
            }
        });
        Object.defineProperty(CxCourseSelectorStore.prototype, "loadMajorName", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (!this.app.shouldShowCXCourseSelectorTest) {
                    return;
                }
                var majorId = this.app.registrationData.majorId;
                if (majorId) {
                    var params = { majorId: majorId };
                    axios_1.default.get("/cx/major-name.ajax", { params: params }).then(function (response) {
                        _this.majorName = response.data;
                    }).catch(function () {
                        _this.majorName = null;
                    });
                }
                else {
                    this.majorName = null;
                }
            }
        });
        Object.defineProperty(CxCourseSelectorStore.prototype, "getSchoolAndMajorDisplayName", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var schoolName = this.companyShortName || this.app.registrationData.cxPlannedSchool;
                var majorName = this.majorName;
                if (schoolName && majorName) {
                    return "".concat(schoolName, " ").concat(majorName);
                }
                else if (schoolName) {
                    return schoolName;
                }
                else if (majorName) {
                    return majorName;
                }
                return "";
            }
        });
        Object.defineProperty(CxCourseSelectorStore.prototype, "setCollegePackageProductFromRegData", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (courses) {
                var _this = this;
                var state = this.app.registrationData;
                if (state.ignoreCollegePackageRouting || !this.app.isProductCX(state.product)) {
                    return;
                }
                if (!this.cs1SiteResourceIdSet) {
                    (0, mobx_1.when)(function () { return !!_this.cs1SiteResourceIdSet; }, function () {
                        _this.setCollegePackageProductFromRegData(courses);
                    });
                    return;
                }
                if (state.cxCourseIdList && state.cxCourseIdList.length > 0) {
                    var allCoursesInCS1Set = courses.every(function (course) { return _this.cs1SiteResourceIdSet.has(course.siteResourceId); });
                    if (allCoursesInCS1Set) {
                        this.app.regMetadata.product = "CS1";
                        this.app.regMetadata.defaultProductKey = "CS1";
                    }
                    else {
                        this.app.regMetadata.product = "CS3";
                        this.app.regMetadata.defaultProductKey = "CS3";
                    }
                }
                this.app.setProductFromRegData(this.app.registrationData);
                return;
            }
        });
        return CxCourseSelectorStore;
    }());
    var setSlimCourseListFromSelectedCourse = (0, mobx_1.action)(function (app, store, courses) {
        app.cxSlimCourseList = courses.map(function (course) {
            var _a;
            return ({
                academyAssetId: course.academyAssetId,
                title: course.title,
                inCS1: (_a = store.cs1SiteResourceIdSet) === null || _a === void 0 ? void 0 : _a.has(course.siteResourceId),
                imageUrl: course.imageUriSmall
            });
        });
    });
    exports.CxCourseSelector = (0, mobx_react_1.observer)(function (props) {
        var _a;
        var app = props.app;
        var store = (0, react_1.useState)(function () { return new CxCourseSelectorStore(app); })[0];
        var _b = (0, react_1.useState)([]), multiSelections = _b[0], setMultiSelections = _b[1];
        var _c = (0, react_1.useState)(null), selectedCourse = _c[0], setSelectedCourse = _c[1];
        var _d = (0, react_1.useState)(false), isModalOpen = _d[0], setIsModalOpen = _d[1];
        (0, mobx_1.reaction)(function () { return app.cxCourseIdListNotSure; }, (0, mobx_1.action)(function () {
            if (app.cxCourseIdListNotSure) {
                setMultiSelections([]);
                app.regMetadata.cxCourseIdList = [];
                app.cxSlimCourseList = [];
                store.setCollegePackageProductFromRegData(multiSelections);
            }
        }));
        (0, mobx_1.reaction)(function () { return app.regMetadata.cxCourseIdList; }, function (newCourseIdList) {
            var _a;
            if (((_a = store.courseList) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                var updatedSelections = (newCourseIdList === null || newCourseIdList === void 0 ? void 0 : newCourseIdList.map(function (courseId) {
                    return store.courseList.find(function (course) { return course.academyAssetId === courseId; });
                }).filter(function (course) { return course !== undefined; })) || [];
                setMultiSelections(updatedSelections);
            }
        });
        (0, react_1.useEffect)(function () {
            var _a, _b;
            if (((_a = app.regMetadata.cxCourseIdList) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                if (((_b = store.courseList) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                    var courses = app.regMetadata.cxCourseIdList.map(function (courseId) {
                        return store.courseList.find(function (course) { return course.academyAssetId === courseId; });
                    }).filter(function (course) { return course !== undefined; });
                    setMultiSelections(courses);
                    store.setCollegePackageProductFromRegData(courses);
                    setSlimCourseListFromSelectedCourse(app, store, courses);
                }
                else {
                    (0, mobx_1.when)(function () { var _a; return ((_a = store.courseList) === null || _a === void 0 ? void 0 : _a.length) > 0; }, function () {
                        var courses = app.regMetadata.cxCourseIdList.map(function (courseId) {
                            return store.courseList.find(function (course) { return course.academyAssetId === courseId; });
                        }).filter(function (course) { return course !== undefined; });
                        setMultiSelections(courses);
                        store.setCollegePackageProductFromRegData(courses);
                        setSlimCourseListFromSelectedCourse(app, store, courses);
                    });
                }
            }
            else {
                store.setCollegePackageProductFromRegData([]);
            }
        }, []);
        var onChangeHandler = (0, mobx_1.action)(function (selected, e) {
            if (!app.shouldShowCXCourseSelectorTest) {
                app.regMetadata.cxCourseIdList = selected.map(function (course) { return course.academyAssetId; });
                setMultiSelections(selected);
                store.setCollegePackageProductFromRegData(selected);
                setSlimCourseListFromSelectedCourse(app, store, selected);
                app.saveValues();
            }
            else {
                var selectedCourse_1 = selected[0];
                var isAlreadySelected = multiSelections.some(function (course) { return course.academyAssetId === selectedCourse_1.academyAssetId; });
                var updatedSelections = void 0;
                if (isAlreadySelected) {
                    updatedSelections = multiSelections.filter(function (course) { return course.academyAssetId !== selectedCourse_1.academyAssetId; });
                }
                else {
                    updatedSelections = __spreadArray(__spreadArray([], multiSelections, true), [selectedCourse_1], false);
                }
                app.regMetadata.cxCourseIdList = updatedSelections.map(function (course) { return course.academyAssetId; });
                setMultiSelections(updatedSelections);
                store.setCollegePackageProductFromRegData(updatedSelections);
                setSlimCourseListFromSelectedCourse(app, store, updatedSelections);
                app.saveValues();
            }
        });
        var renderMenu = function (results, menuProps, state) {
            return React.createElement(react_bootstrap_typeahead_1.TypeaheadMenu, __assign({}, menuProps, { maxHeight: "220px", options: results, labelKey: function (option) { return option.title; }, text: state.text, renderMenuItemChildren: function (option, menuProps) {
                    return React.createElement("div", { className: "cx-course-selector-option", "data-cname": "cx_course_selector_option", "test-id": "cx_course_selector_option", "data-extra": option.academyAssetId },
                        React.createElement(react_bootstrap_typeahead_1.Highlighter, { search: menuProps.text }, option.title));
                } }));
        };
        var typeahead = React.createElement(react_bootstrap_typeahead_1.Typeahead, { id: "cx-course-selector", options: (0, mobx_1.toJS)(store.courseList), multiple: true, onChange: (0, mobx_1.action)(function (selected) { return onChangeHandler(selected); }), selected: multiSelections, placeholder: "Select courses", disabled: app.cxCourseIdListNotSure, labelKey: function (option) { return option.title; }, inputProps: { "data-cname": "reg_form_cx_course_selector_input", "test-id": "reg_form_cx_course_selector_input" }, renderMenu: renderMenu });
        var courseSelectorTest = React.createElement(React.Fragment, null, ((_a = store.courseList) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
            React.createElement(ssr_cx_1.CXCourseSearch, { allCourses: Array.from(store.courseList), cs1SiteResourceIds: Array.from(store.cs1SiteResourceIdSet), distinctRootSubjectNames: Array.from(new Set(store.courseList.map(function (course) { return course.rootSubjectName; }).filter(function (name) { return !!name; }))), hideHeader: true, hideSubheader: true, hideFilters: true, useRegFormCard: true, enableCourseCardModal: true, onClickElement: function (e, course) {
                    onChangeHandler([course]);
                }, onClickTitle: function (e, course) {
                    setSelectedCourse(course);
                    setIsModalOpen(true);
                }, onAddCourse: function (course) {
                    onChangeHandler([course]);
                }, selectedCourses: multiSelections, plannedSchoolName: store.getSchoolAndMajorDisplayName(), major: store.majorName }));
        return React.createElement("div", { "data-track-visible": true, "data-cname": "reg_form_cx_course_selector", "test-id": "reg_form_cx_course_selector" }, !app.shouldShowCXCourseSelectorTest ? typeahead : courseSelectorTest);
    });
});

//# sourceMappingURL=CxCourseSelector.js.map

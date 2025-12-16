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
define(["require", "exports", "dashboard/test-prep-experience/components/GridLayout", "dashboard/test-prep-experience/components/skeletons/SkeletonBox", "dashboard/test-prep-experience/components/skeletons/SkeletonText", "dashboard/test-prep-experience/components/toast/ToastView", "dashboard/test-prep-experience/dashboard/components/ContactSupportModal", "eureka/EurekaButton", "eureka/EurekaCheckbox", "eureka/EurekaDatePicker", "eureka/EurekaRadioButton", "eureka/EurekaRatingScale", "jquery", "lib/react-bootstrap", "member/info/member-info.util", "mobx", "mobx-react", "moment", "react", "react-dom", "react", "react-bootstrap-typeahead", "react-utils/media-query-store-util", "registration/post-registration/test-prep-experience/TestPrepCourseSurveyUtil", "registration/post-registration/test-prep-experience/TestPrepExperienceCourseSurveyStore", "testPrep/TestPrepConstants", "util/InlineSvgComponents"], function (require, exports, GridLayout_1, SkeletonBox_1, SkeletonText_1, ToastView_1, ContactSupportModal_1, EurekaButton_1, EurekaCheckbox_1, EurekaDatePicker_1, EurekaRadioButton_1, EurekaRatingScale_1, $, react_bootstrap_1, member_info_util_1, mobx_1, mobx_react_1, moment, React, ReactDOM, react_1, react_bootstrap_typeahead_1, media_query_store_util_1, TestPrepCourseSurveyUtil_1, TestPrepExperienceCourseSurveyStore_1, TestPrepConstants_1, InlineSvgComponents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TestPrepExperienceOnboardingView = exports.ExamConfidenceInput = exports.TargetScoreHelperText = exports.ToeflTargetScoreInput = exports.TargetScoreInput = exports.ToeflRecentScoreInput = exports.RecentScoreInput = exports.HasTakenExamInput = exports.ExamFamiliarityQuestion = exports.DateInput = exports.SelectExamInput = exports.TestPrepCourseTypeahead = exports.Navbar = void 0;
    var LoadingSkeleton = function () {
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "tpe-onboarding-skeleton__form-container" },
                React.createElement("div", null,
                    React.createElement("div", { className: "tpe-onboarding-skeleton__form-section" },
                        React.createElement("div", { className: "tpe-onboarding-skeleton__question" },
                            React.createElement(SkeletonText_1.SkeletonText, { type: SkeletonText_1.SkeletonTextType.HEADER, className: "skeleton-question__header" }),
                            React.createElement(SkeletonText_1.SkeletonText, { type: SkeletonText_1.SkeletonTextType.PARAGRAPH, className: "skeleton-question__sub-header" })),
                        React.createElement("div", { className: "tpe-onboarding-skeleton__question" },
                            React.createElement(SkeletonText_1.SkeletonText, { type: SkeletonText_1.SkeletonTextType.PARAGRAPH, className: "skeleton-question__text" }),
                            React.createElement(SkeletonBox_1.SkeletonBox, { className: "skeleton-question__input-large" })),
                        React.createElement("div", { className: "tpe-onboarding-skeleton__question" },
                            React.createElement(SkeletonText_1.SkeletonText, { type: SkeletonText_1.SkeletonTextType.PARAGRAPH, className: "skeleton-question__text" }),
                            React.createElement(SkeletonBox_1.SkeletonBox, { className: "skeleton-question__input-large" })),
                        React.createElement("div", { className: "tpe-onboarding-skeleton__question" },
                            React.createElement(SkeletonText_1.SkeletonText, { type: SkeletonText_1.SkeletonTextType.PARAGRAPH, className: "skeleton-question__text" }),
                            React.createElement(SkeletonBox_1.SkeletonBox, { className: "skeleton-question__input-small" })),
                        React.createElement("div", { className: "tpe-onboarding-skeleton__question" },
                            React.createElement(SkeletonText_1.SkeletonText, { type: SkeletonText_1.SkeletonTextType.PARAGRAPH, className: "skeleton-question__text" }),
                            React.createElement(SkeletonBox_1.SkeletonBox, { className: "skeleton-question__input-medium" })),
                        React.createElement("div", { className: "tpe-onboarding-skeleton__question" },
                            React.createElement(SkeletonText_1.SkeletonText, { type: SkeletonText_1.SkeletonTextType.PARAGRAPH, className: "skeleton-question__text" }),
                            React.createElement(SkeletonBox_1.SkeletonBox, { className: "skeleton-question__input-large" })))),
                React.createElement("div", { className: "tpe-onboarding-skeleton__question" },
                    React.createElement(SkeletonText_1.SkeletonText, { type: SkeletonText_1.SkeletonTextType.PARAGRAPH, className: "skeleton-question__text" }),
                    React.createElement(SkeletonBox_1.SkeletonBox, { className: "skeleton-question__input-large" }))),
            React.createElement("div", { className: "tpe-onboarding-illustration-container" },
                React.createElement("img", { src: "/images/test-prep-experience/nitpux-onboarding-illustration.svg" })));
    };
    var Navbar = function () {
        return React.createElement("div", { className: "nitpux-study-nav onboarding-navbar-container" },
            React.createElement("div", { className: "nitpux-study-nav-container" },
                React.createElement("div", { className: "nav-left" },
                    React.createElement("div", { className: "navbar-brand navbar-onboarding", "data-cname": "logo", "test-id": "logo" },
                        React.createElement("img", { src: "/images/logos/study-logo.svg", alt: "Study.com" }))),
                React.createElement("div", { className: "nav-right" },
                    React.createElement("div", { className: "nitpux-user-dropdown dropdown show", "data-cname": "nitpux_top_nav_question", "test-id": "nitpux_top_nav_question" },
                        React.createElement("a", { className: "nitpux-dropdown-icons", id: "showUserDropdown", role: "button", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
                            React.createElement(InlineSvgComponents_1.InlineSvg, { src: "/images/icons/material/icon-question-24.svg", className: "bell-icon svg-24" })),
                        React.createElement("div", { className: "nitpux-user-dropdown-menu dropdown-menu dropdown-menu-right", "aria-labelledby": "showUserDropdown" },
                            React.createElement("a", { className: "nitpux-user-dropdown-item", "data-cname": "nitpux_top_nav_contact_support", "test-id": "nitpux_top_nav_contact_support", onClick: (0, mobx_1.action)(function () { return ContactSupportModal_1.contactSupportModalStore.openModal(); }) }, "Contact Support"),
                            React.createElement(ContactSupportModal_1.default, { store: ContactSupportModal_1.contactSupportModalStore }))))));
    };
    exports.Navbar = Navbar;
    exports.TestPrepCourseTypeahead = (0, mobx_react_1.observer)(function (props) {
        var setRef = props.setRef, placeholder = props.placeholder, options = props.options, onSearch = props.onSearch, onInputChange = props.onInputChange, isLoading = props.isLoading, onChange = props.onChange, disabled = props.disabled, minLength = props.minLength, defaultInputValue = props.defaultInputValue, showTypeaheadMenu = props.showTypeaheadMenu, typeaheadHasFocus = props.typeaheadHasFocus, setTypeaheadHasFocus = props.setTypeaheadHasFocus, isCourseSelected = props.isCourseSelected, clearTypeahead = props.clearTypeahead, isInputInvalid = props.isInputInvalid, _a = props.useFullPageForMobile, useFullPageForMobile = _a === void 0 ? true : _a, _b = props.usePortalForMobile, usePortalForMobile = _b === void 0 ? false : _b, onFocus = props.onFocus, onBlur = props.onBlur;
        var renderMenuItemChildren = function (option, props, index) {
            return React.createElement("span", { "data-cname": "select_exam_typeahead_option", "test-id": "select_exam_typeahead_option", "data-extra": option.academyAssetId, dangerouslySetInnerHTML: { __html: option.title } });
        };
        var renderTypeaheadMenu = function (results, menuProps, state) {
            var _a;
            if (((_a = results === null || results === void 0 ? void 0 : results.length) !== null && _a !== void 0 ? _a : 0) === 0) {
                return React.createElement("div", { className: "select-exam-typeahead__empty" },
                    React.createElement("div", { className: "select-exam-typeahead__empty-title" }, "No results"),
                    React.createElement("div", { className: "select-exam-typeahead__empty-text" }, "Please check spelling or try searching for another term"));
            }
            return React.createElement(react_bootstrap_typeahead_1.TypeaheadMenu, __assign({}, menuProps, { id: "selectExamTypeahead", className: useFullPageForMobile ? "dropdown-menu__full-page-mobile" : "", options: results, labelKey: function (course) { return TestPrepCourseSurveyUtil_1.default.replaceHtmlTrademarkEntityWithSymbol(course.title); }, text: state.text, renderMenuItemChildren: function (option, props, index) {
                    return renderMenuItemChildren(option, props, index);
                } }));
        };
        var classNames = [];
        if (typeaheadHasFocus && useFullPageForMobile) {
            classNames.push("select-exam-typeahead__mobile-container");
        }
        var element = React.createElement("div", { className: classNames.join(" ") },
            React.createElement(InlineSvgComponents_1.InlineSvg, { className: "mobile-arrow-icon icon-default__filled svg-24", src: "/images/icons/material/icon-arrow-left-24.svg", onClick: function () { return setTypeaheadHasFocus(false); } }),
            React.createElement("label", { className: "select-exam-typeahead__container\n\t\t".concat(isInputInvalid ? "select-exam-typeahead__container-invalid" : ""), "data-cname": "select_exam_typeahead", "test-id": "select_exam_typeahead" },
                !isCourseSelected && React.createElement(InlineSvgComponents_1.InlineSvg, { className: "select-exam-typeahead__search-icon svg-20", src: "/images/icons/material/icon-search-20.svg" }),
                isCourseSelected && React.createElement(InlineSvgComponents_1.InlineSvg, { className: "select-exam-typeahead__cancel-icon svg-20", src: "/images/icons/material/icon-close-20.svg", onClick: function () { return clearTypeahead(); } }),
                React.createElement(react_bootstrap_typeahead_1.AsyncTypeahead, { id: "selectExamAsyncTypeahead", ref: function (ref) { return setRef(ref); }, options: options, filterBy: function (course) { return true; }, labelKey: function (course) { return TestPrepCourseSurveyUtil_1.default.replaceHtmlTrademarkEntityWithSymbol(course.title); }, onSearch: (0, mobx_1.action)(function (query) { return onSearch(query); }), onInputChange: (0, mobx_1.action)(function (input) { onInputChange(input); }), isLoading: isLoading, onChange: function (selected) { return onChange(selected); }, onFocus: function () { return onFocus && onFocus(); }, onBlur: function () { return onBlur && onBlur(); }, placeholder: placeholder, className: "select-exam-typeahead__input ".concat(isCourseSelected
                        && "select-exam-typeahead__input-show"), paginate: false, useCache: false, delay: 500, maxResults: 10, minLength: minLength ? minLength : 0, disabled: disabled, defaultInputValue: defaultInputValue ? defaultInputValue : "", renderMenu: !showTypeaheadMenu ? function () { return null; } : function (results, menuProps, state) {
                        return renderTypeaheadMenu(results, menuProps, state);
                    } }),
                isLoading && React.createElement("div", { className: "select-exam-typeahead__spinner-container" },
                    React.createElement(InlineSvgComponents_1.InlineSvg, { className: "spinner", src: "/images/reDesign/svg/white/spinner.svg" })),
                isInputInvalid &&
                    React.createElement("span", { className: "eureka-input__invalid-text", "data-cname": "select_exam_typeahead_required", "test-id": "select_exam_typeahead_required" }, "Required")));
        var isOnMobile = media_query_store_util_1.smallMaxQuery.matches;
        if (isOnMobile && usePortalForMobile && typeaheadHasFocus && useFullPageForMobile) {
            return ReactDOM.createPortal(element, document.querySelector('body'));
        }
        return React.createElement(React.Fragment, null, element);
    });
    exports.SelectExamInput = (0, mobx_react_1.observer)(function (props) {
        var placeholder = props.placeholder, store = props.store;
        return React.createElement(exports.TestPrepCourseTypeahead, { setRef: (0, mobx_1.action)(function (ref) { return store.typeaheadRef = ref; }), options: store.courseTypeaheadOptions, onSearch: function (query) { return store.onCourseTypeaheadSearch(query); }, onInputChange: function (input) { store.onInputChange(input); }, isLoading: store.isLoadingTypeahead, onChange: function (selected) { return store.selectCourseChange(selected); }, setTypeaheadHasFocus: (0, mobx_1.action)(function (hasFocus) { return store.typeaheadHasFocus = hasFocus; }), minLength: store.testPrepExperienceCourseSurveyStoreType === TestPrepExperienceCourseSurveyStore_1.TestPrepExperienceCourseSurveyStoreType.AddCourseAll
                ? 2 : 0, disabled: store.isSubmitting || store.testPrepCourseSurvey.courseId != null, defaultInputValue: store.course ? store.course.title : "", showTypeaheadMenu: store.showTypeaheadMenu, placeholder: placeholder, isCourseSelected: store.testPrepCourseSurvey.courseId != null, clearTypeahead: function () { return store.clearTypeahead(); }, isInputInvalid: store.invalidQuestionSet.has("selectCourse"), typeaheadHasFocus: store.typeaheadHasFocus, onFocus: (0, mobx_1.action)(function () {
                store.typeaheadHasFocus = true;
                var isOnIOS = (navigator.userAgent != null && /iPad|iPhone|iPod/.test(navigator.userAgent)
                    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && !window.MSStream;
                if (isOnIOS) {
                    setTimeout(function () {
                        $("html").animate({ scrollTop: 0 });
                    }, 500);
                }
            }), onBlur: (0, mobx_1.action)(function () {
                setTimeout(function () {
                    store.typeaheadHasFocus = false;
                }, 300);
            }) });
    });
    exports.DateInput = (0, mobx_react_1.observer)(function (props) {
        var store = props.store;
        var tomorrow = moment().add("1", "day").format("YYYY-MM-DD");
        return React.createElement("div", { className: "tpe-onboarding-question eureka-date-input__container" },
            React.createElement("span", { className: "tpe-onboarding-question-text" }, "When do you plan to take the exam? *"),
            React.createElement(EurekaDatePicker_1.EurekaDatePicker, { dateChangeCallback: (0, mobx_1.action)(function (date) { return store.plannedExamDateChange(date); }), dateValidationCallback: (0, mobx_1.action)(function () { return TestPrepCourseSurveyUtil_1.default.validatePlannedExamDate(store.testPrepCourseSurvey.courseId, store.testPrepCourseSurvey.plannedExamDate, store.invalidQuestionSet, store.isEnrolledInCurrentCourse); }), value: store.testPrepCourseSurvey.plannedExamDate, invalid: store.invalidQuestionSet.has("plannedExamDate") || store.invalidQuestionSet.has("plannedExamDatePassed"), disabled: store.isSubmitting, min: tomorrow }),
            store.invalidQuestionSet.has("plannedExamDate") && React.createElement("span", { className: "eureka-input__invalid-text", "data-cname": "date_input_required", "test-id": "date_input_required" }, "Required"),
            store.invalidQuestionSet.has("plannedExamDatePassed") && React.createElement("span", { className: "eureka-input__invalid-text", "data-cname": "date_input_passed", "test-id": "date_input_passed" }, "Please enter a future date"),
            store.invalidQuestionSet.has("plannedExamDateObsoleteToefl") && React.createElement("span", { className: "eureka-input__invalid-text", "data-cname": "date_input_obsolete", "test-id": "date_input_obsolete" }, "The version of the TOEFL test you have chosen will not be supported on this date"));
    });
    exports.ExamFamiliarityQuestion = (0, mobx_react_1.observer)(function (props) {
        var store = props.store;
        var questionText = "How would you rate your knowledge of the topics and skills assessed on the test?";
        if (store.testPrepExperienceCourseSurveyStoreType !== TestPrepExperienceCourseSurveyStore_1.TestPrepExperienceCourseSurveyStoreType.EtsFreemium) {
            questionText += " *";
        }
        var classes = ["tpe-onboarding-question", "eureka-date-input__container", "tpe-exam-familiarity-level"];
        if (store.testPrepCourseSurvey.hasTakenExam === false) {
            classes.push("tpe-exam-familiarity-level__show");
        }
        return (React.createElement("div", { className: classes.join(" ") },
            React.createElement("span", { className: "tpe-onboarding-question-text" }, questionText),
            React.createElement("div", { className: "tpe-radio-input-group-container tpe-radio-input-group-container--vertical" },
                React.createElement(EurekaRadioButton_1.EurekaRadioButton, { name: "tpe-exam-familiarity-level", checked: store.testPrepCourseSurvey.examFamiliarityLevel === "NONE", onClick: (0, mobx_1.action)(function () { return store.examFamiliarityLevelChange("NONE"); }), disabled: store.isSubmitting, labelCname: "exam_familiarity_none", size: 24 }, "I have little to no knowledge of the exam material"),
                React.createElement(EurekaRadioButton_1.EurekaRadioButton, { name: "tpe-exam-familiarity-level", checked: store.testPrepCourseSurvey.examFamiliarityLevel === "SOME", onClick: (0, mobx_1.action)(function () { return store.examFamiliarityLevelChange("SOME"); }), disabled: store.isSubmitting, labelCname: "exam_familiarity_some", size: 24 }, "I have some familiarity of the exam material"),
                React.createElement(EurekaRadioButton_1.EurekaRadioButton, { name: "tpe-exam-familiarity-level", checked: store.testPrepCourseSurvey.examFamiliarityLevel === "SOLID", onClick: (0, mobx_1.action)(function () { return store.examFamiliarityLevelChange("SOLID"); }), disabled: store.isSubmitting, labelCname: "exam_familiarity_solid", size: 24 }, "I have a solid understanding of the exam material")),
            store.invalidQuestionSet.has("examFamiliarityLevel") &&
                React.createElement("span", { className: "eureka-input__invalid-text", "data-cname": "exam_familiarity_level_required", "test-id": "exam_familiarity_level_required" }, "Required")));
    });
    exports.HasTakenExamInput = (0, mobx_react_1.observer)(function (props) {
        var store = props.store;
        return React.createElement("div", { className: "tpe-onboarding-question" },
            React.createElement("span", { className: "tpe-onboarding-question-text" }, "Have you taken this exam before? *"),
            React.createElement("div", { className: "tpe-radio-input-group-container" },
                React.createElement(EurekaRadioButton_1.EurekaRadioButton, { name: "tpe-has-taken-exam", checked: store.testPrepCourseSurvey.hasTakenExam === false, onClick: (0, mobx_1.action)(function () { return store.hasTakenExamChange(false); }), disabled: store.isSubmitting, labelCname: "has_taken_exam_false", size: 24 }, "No"),
                React.createElement(EurekaRadioButton_1.EurekaRadioButton, { name: "tpe-has-taken-exam", checked: store.testPrepCourseSurvey.hasTakenExam, onClick: (0, mobx_1.action)(function () { return store.hasTakenExamChange(true); }), disabled: store.isSubmitting, labelCname: "has_taken_exam_true", size: 24 }, "Yes")),
            store.invalidQuestionSet.has("hasTakenExam") &&
                React.createElement("span", { className: "eureka-input__invalid-text", "data-cname": "has_taken_exam_required", "test-id": "has_taken_exam_required" }, "Required"));
    });
    exports.RecentScoreInput = (0, mobx_react_1.observer)(function (props) {
        var _a;
        var store = props.store;
        var hasError = store.invalidQuestionSet.has("mostRecentExamScore")
            || store.invalidQuestionSet.has("mostRecentExamScoreLimit")
            || store.invalidQuestionSet.has("mostRecentExamScoreDecimal");
        var inputClasses = ["eureka-input__text-medium"];
        if (hasError) {
            inputClasses.push("eureka-input__invalid");
        }
        var questionText = (0, react_1.useMemo)(function () {
            if (store.isAsvabSurvey) {
                return "What was your Military Entrance Score (AFQT)?";
            }
            return "What was your most recent score on the actual exam?";
        }, [store.course]);
        return React.createElement("div", { className: "tpe-onboarding-question tpe-recent-score ".concat(store.hasTakenExam() ? "tpe-recent-score__show" : "") },
            React.createElement("span", { className: "tpe-onboarding-question-text" }, questionText),
            React.createElement("input", { className: inputClasses.join(" "), inputMode: "numeric", pattern: "[0-9]*", type: "text", placeholder: "Enter a number", "data-cname": "recent_score_input", "test-id": "recent_score_input", onChange: (0, mobx_1.action)(function (e) {
                    store.mostRecentExamScoreChange(e);
                    TestPrepCourseSurveyUtil_1.default.validateExamScore(store.testPrepCourseSurvey.mostRecentExamScore, "mostRecentExamScore", store.invalidQuestionSet);
                }), value: (_a = store.testPrepCourseSurvey.mostRecentExamScore) !== null && _a !== void 0 ? _a : "" }),
            store.invalidQuestionSet.has("mostRecentExamScoreLimit") && (React.createElement("span", { className: "eureka-input__invalid-text", "data-cname": "recent_score_limit", "test-id": "recent_score_limit" },
                "Please enter a number less than ",
                TestPrepCourseSurveyUtil_1.default.MAX_EXAM_SCORE)));
    });
    exports.ToeflRecentScoreInput = (0, mobx_react_1.observer)(function (props) {
        var _a, _b;
        var store = props.store;
        if (!store.hasTakenExam()) {
            return React.createElement(React.Fragment, null);
        }
        var hasError = store.invalidQuestionSet.has("mostRecentExamScore");
        var cefrLevel = TestPrepCourseSurveyUtil_1.default.convertScoreToCefrLevel(store.testPrepCourseSurvey.mostRecentExamScore);
        return React.createElement("div", { className: "tpe-onboarding-question" },
            React.createElement("div", { className: "tpe-recent-score ".concat(store.hasTakenExam() ? "tpe-recent-score__show" : "") },
                React.createElement("span", { className: "tpe-onboarding-question-text" }, "What was your most recent CEFR level on the actual exam?"),
                React.createElement("div", { className: "eureka-select-input-container" },
                    React.createElement(react_bootstrap_1.Dropdown, null,
                        React.createElement(react_bootstrap_1.Dropdown.Toggle, { className: "eureka-select-dropdown\n\t\t\t\t\t".concat(cefrLevel !== null && cefrLevel !== void 0 ? cefrLevel : "eureka-select-dropdown__unselected", "\n\t\t\t\t\t").concat(hasError && "eureka-select-dropdown__invalid"), "data-cname": "recent_cefr_level_input_select", "test-id": "recent_cefr_level_input_select" }, (_b = (_a = TestPrepConstants_1.CEFR_LEVEL_OPTIONS.find(function (option) { return option.level == cefrLevel; })) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : "Select an CEFR level"),
                        React.createElement(react_bootstrap_1.Dropdown.Menu, null, TestPrepConstants_1.CEFR_LEVEL_OPTIONS.map(function (_a) {
                            var level = _a.level, score = _a.score, description = _a.description;
                            return React.createElement(react_bootstrap_1.Dropdown.Item, { onClick: (0, mobx_1.action)(function () {
                                    store.testPrepCourseSurvey.mostRecentExamScore = score;
                                    TestPrepCourseSurveyUtil_1.default.validateExamScore(store.testPrepCourseSurvey.mostRecentExamScore, "mostRecentExamScore", store.invalidQuestionSet);
                                }), key: description, "date-cname": "recent_cefr_level_input_select_option_" + level, "test-id": "recent_cefr_level_input_select_option_" + level }, description);
                        }))),
                    React.createElement(InlineSvgComponents_1.InlineSvg, { className: "eureka-select-input__icon svg-20", src: "/images/icons/material/icon-caret-20.svg" })),
                store.invalidQuestionSet.has("mostRecentExamScore") && (React.createElement("span", { className: "eureka-input__invalid-text", "data-cname": "recent_score_limit", "test-id": "recent_score_limit" }, "Please select a CEFR level"))));
    });
    exports.TargetScoreInput = (0, mobx_react_1.observer)(function (props) {
        var _a;
        var store = props.store;
        var hasError = store.invalidQuestionSet.has("targetExamScore")
            || store.invalidQuestionSet.has("targetExamScoreLimit");
        var inputClasses = ["eureka-input__text-medium"];
        if (hasError) {
            inputClasses.push("eureka-input__invalid");
        }
        var questionText = "What’s your target score?";
        if (store.isAsvabSurvey) {
            questionText = "What’s your target Military Entrance Score (AFQT)?";
        }
        return React.createElement("div", { className: "tpe-onboarding-question" },
            React.createElement("span", { className: "tpe-onboarding-question-text" }, questionText),
            React.createElement("input", { className: inputClasses.join(" "), inputMode: "numeric", pattern: "[0-9]*", type: "text", placeholder: "Enter a number", "data-cname": "target_score_input", "test-id": "target_score_input", onChange: (0, mobx_1.action)(function (e) {
                    store.targetExamScoreChange(e);
                    TestPrepCourseSurveyUtil_1.default.validateExamScore(store.testPrepCourseSurvey.targetExamScore, "targetExamScore", store.invalidQuestionSet);
                }), value: (_a = store.testPrepCourseSurvey.targetExamScore) !== null && _a !== void 0 ? _a : "" }),
            store.invalidQuestionSet.has("targetExamScoreLimit") && (React.createElement("span", { className: "eureka-input__invalid-text", "data-cname": "target_score_limit", "test-id": "target_score_limit" },
                "Please enter a number less than ",
                TestPrepCourseSurveyUtil_1.default.MAX_EXAM_SCORE)),
            React.createElement(exports.TargetScoreHelperText, { store: store }));
    });
    exports.ToeflTargetScoreInput = (0, mobx_react_1.observer)(function (props) {
        var _a, _b;
        var store = props.store;
        var hasError = store.invalidQuestionSet.has("targetExamScore");
        var cefrLevel = TestPrepCourseSurveyUtil_1.default.convertScoreToCefrLevel(store.testPrepCourseSurvey.targetExamScore);
        return React.createElement("div", { className: "tpe-onboarding-question" },
            React.createElement("span", { className: "tpe-onboarding-question-text" }, "What\u2019s your target CEFR level?"),
            React.createElement("div", { className: "eureka-select-input-container" },
                React.createElement(react_bootstrap_1.Dropdown, null,
                    React.createElement(react_bootstrap_1.Dropdown.Toggle, { className: "eureka-select-dropdown\n\t\t\t\t".concat(cefrLevel !== null && cefrLevel !== void 0 ? cefrLevel : "eureka-select-dropdown__unselected", "\n\t\t\t\t").concat(hasError && "eureka-select-dropdown__invalid"), "data-cname": "target_cefr_level_input_select", "test-id": "target_cefr_level_input_select" }, (_b = (_a = TestPrepConstants_1.CEFR_LEVEL_OPTIONS.find(function (option) { return option.level == cefrLevel; })) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : "Select an CEFR level"),
                    React.createElement(react_bootstrap_1.Dropdown.Menu, null, TestPrepConstants_1.CEFR_LEVEL_OPTIONS.map(function (_a) {
                        var level = _a.level, score = _a.score, description = _a.description;
                        return React.createElement(react_bootstrap_1.Dropdown.Item, { onClick: (0, mobx_1.action)(function () {
                                store.testPrepCourseSurvey.targetExamScore = score;
                                TestPrepCourseSurveyUtil_1.default.validateExamScore(store.testPrepCourseSurvey.targetExamScore, "targetExamScore", store.invalidQuestionSet);
                            }), key: description, "date-cname": "target_cefr_level_input_select_option_" + level, "test-id": "target_cefr_level_input_select_option_" + level }, description);
                    }))),
                React.createElement(InlineSvgComponents_1.InlineSvg, { className: "eureka-select-input__icon svg-20", src: "/images/icons/material/icon-caret-20.svg" })),
            store.invalidQuestionSet.has("targetExamScore") && (React.createElement("span", { className: "eureka-input__invalid-text", "data-cname": "target_score_limit", "test-id": "target_score_limit" }, "Please select a CEFR level")));
    });
    exports.TargetScoreHelperText = (0, mobx_react_1.observer)(function (props) {
        var _a;
        var store = props.store;
        if (!store.isAsvabSurvey) {
            return null;
        }
        var filter = (_a = Array.from(TestPrepConstants_1.ASVAB_MINIMUM_SCORE_FOR_BRANCH)
            .filter(function (_a) {
            var branch = _a[0], score = _a[1];
            return store.asvabCourseSurvey.militaryBranches.includes(branch);
        })
            .sort(function (_a, _b) {
            var scoreA = _a[1];
            var scoreB = _b[1];
            return scoreB - scoreA;
        })[0]) !== null && _a !== void 0 ? _a : null;
        if (!filter) {
            return null;
        }
        return React.createElement("div", { className: "tpe-onboarding-question-helper-text" }, React.createElement(React.Fragment, null,
            "A target score of ",
            React.createElement("span", { "test-id": "recommended-score" }, filter[1]),
            " or higher is recommended"));
    });
    exports.ExamConfidenceInput = (0, mobx_react_1.observer)(function (props) {
        var store = props.store;
        var desktopHelperText = ["Not at all confident", "Very confident"];
        var mobileHelperText = ["1 - Not at all confident", "10 - Very confident"];
        return React.createElement("div", { className: "tpe-onboarding-question" },
            React.createElement("span", { className: "tpe-onboarding-question-text" }, "How confident do you feel that you will achieve your target score?"),
            React.createElement(EurekaRatingScale_1.EurekaRatingScale, { numButtons: 10, onChangeCallback: (0, mobx_1.action)(function (num) { return store.testPrepCourseSurvey.examConfidenceLevel = num; }), desktopHelperText: desktopHelperText, mobileHelperText: mobileHelperText, name: "test_prep_course_survey", disabled: store.isSubmitting, value: store.testPrepCourseSurvey.examConfidenceLevel }));
    });
    var RequiredFormSection = (0, mobx_react_1.observer)(function (props) {
        var store = props.store;
        return React.createElement(React.Fragment, null,
            !store.isSpecificExam &&
                React.createElement("div", { className: "tpe-onboarding-question" },
                    React.createElement("span", { className: "tpe-onboarding-question-text" },
                        "Which ",
                        store.examDisplayName,
                        " exam are you preparing for? *"),
                    store.examDisplayName === "TOEFL" &&
                        React.createElement(ToeflTestSelection, { store: store }),
                    store.examDisplayName !== "TOEFL" &&
                        React.createElement(exports.SelectExamInput, { placeholder: store.examDisplayName ? "Search ".concat(store.examDisplayName, " exams") : "Search exams", store: store })),
            store.isSpecificExam && React.createElement("div", { className: "your-exam-text" },
                React.createElement("span", { className: "your-exam-text__bold" }, "Your exam: "),
                " ",
                React.createElement("span", { "data-cname": "test_prep_onboarding_your_exam", "test-id": "test_prep_onboarding_your_exam" }, store.course.title && TestPrepCourseSurveyUtil_1.default.replaceHtmlTrademarkEntityWithSymbol(store.course.title))),
            React.createElement(exports.DateInput, { store: store }));
    });
    var ToeflTestSelection = (0, mobx_react_1.observer)(function (props) {
        var _a, _b;
        var store = props.store;
        var options = store.courseTypeaheadOptions.map(function (courseOption) {
            return React.createElement(react_bootstrap_1.Dropdown.Item, { onClick: (0, mobx_1.action)(function () { return store.selectCourseChange([courseOption]); }), key: courseOption.academyAssetId, "date-cname": "toefl_exam_option_" + courseOption.academyAssetId, "test-id": "toefl_exam_option_" + courseOption.academyAssetId }, courseOption.title);
        });
        return React.createElement("div", { className: "eureka-select-input-container" },
            React.createElement(react_bootstrap_1.Dropdown, null,
                React.createElement(react_bootstrap_1.Dropdown.Toggle, { className: "eureka-select-dropdown\n\t\t\t\t".concat(store.course ? "" : " eureka-select-dropdown__unselected"), "data-cname": "toefl_exam_select", "test-id": "toefl_exam_select", disabled: store.isSubmitting }, (_b = (_a = store.course) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "Select an exam"),
                React.createElement(react_bootstrap_1.Dropdown.Menu, null, options)),
            React.createElement(InlineSvgComponents_1.InlineSvg, { className: "eureka-select-input__icon svg-20", src: "/images/icons/material/icon-caret-20.svg" }));
    });
    var OptionalFormSection = (0, mobx_react_1.observer)(function (props) {
        var store = props.store;
        return React.createElement(React.Fragment, null,
            React.createElement(exports.HasTakenExamInput, { store: store }),
            React.createElement(exports.ExamFamiliarityQuestion, { store: store }),
            TestPrepCourseSurveyUtil_1.default.isScoreBased() && React.createElement(React.Fragment, null, store.isCefrLevelScore() ? React.createElement(React.Fragment, null,
                React.createElement(exports.ToeflRecentScoreInput, { store: store }),
                React.createElement(exports.ToeflTargetScoreInput, { store: store })) : React.createElement(React.Fragment, null,
                React.createElement(exports.RecentScoreInput, { store: store }),
                React.createElement(exports.TargetScoreInput, { store: store }))),
            React.createElement(exports.ExamConfidenceInput, { store: store }));
    });
    var SubmitButton = (0, mobx_react_1.observer)(function (props) {
        var store = props.store;
        return React.createElement(React.Fragment, null, !store.isSubmitting
            ?
                React.createElement(EurekaButton_1.EurekaButton, { buttonType: EurekaButton_1.EurekaButtonType.PRIMARY, "data-cname": "test_prep_onboarding_submit", "test-id": "test_prep_onboarding_submit", onClick: (0, mobx_1.action)(function () { return store.submitForm(); }) }, "Get started")
            : React.createElement("div", { className: "spinner-container" },
                React.createElement(InlineSvgComponents_1.InlineSvg, { className: "spinner", src: "/images/reDesign/svg/white/spinner.svg" })));
    });
    var FormContainer = (0, mobx_react_1.observer)(function (props) {
        var store = props.store;
        var memberInfoUtil = member_info_util_1.MemberInfoUtil.instance();
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "tpe-onboarding-form-container" },
                React.createElement("div", { className: "form-section" },
                    React.createElement("div", { className: "tpe-onboarding-header-container" },
                        React.createElement("h1", { className: "tpe-onboarding-header" },
                            "Hi ",
                            memberInfoUtil.memberInfo.firstName,
                            ", welcome to Study.com!"),
                        React.createElement("h2", { className: "tpe-onboarding-subheader" }, "Tell us about yourself so we can personalize your test prep experience.")),
                    React.createElement("form", { className: "tpe-onboarding-form ".concat(store.isSubmitting ? "tpe-onboarding-form--submitting" : ""), "data-cname": "test_prep_onboarding_form", "test-id": "test_prep_onboarding_form" },
                        React.createElement(RequiredFormSection, { store: store }),
                        React.createElement(OptionalFormSection, { store: store }))),
                React.createElement(EurekaCheckbox_1.EurekaCheckbox, { name: "email-sms-opt-in", onChange: (0, mobx_1.action)(function (e) { return store.emailSmsOptIn = e.currentTarget.checked; }), labelCname: "email_sms_opt_in_checkbox", checked: store.emailSmsOptIn, disabled: store.isSubmitting, size: 20 }, "Send me occasional texts to help me meet my goals"),
                React.createElement(SubmitButton, { store: store })),
            React.createElement("div", { className: "illustration-container" },
                React.createElement("img", { src: "/images/test-prep-experience/nitpux-onboarding-illustration.svg" })));
    });
    exports.TestPrepExperienceOnboardingView = (0, mobx_react_1.observer)((function (_super) {
        __extends(TestPrepExperienceOnboardingView, _super);
        function TestPrepExperienceOnboardingView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            Object.defineProperty(_this, "store", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: TestPrepExperienceCourseSurveyStore_1.onboardingCourseSurveyStore
            });
            return _this;
        }
        Object.defineProperty(TestPrepExperienceOnboardingView.prototype, "componentDidMount", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.store.ensureCoursesAreLoaded();
            }
        });
        Object.defineProperty(TestPrepExperienceOnboardingView.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return (React.createElement(React.Fragment, null,
                    React.createElement(exports.Navbar, null),
                    React.createElement(GridLayout_1.GridLayout, null, !this.store.isLoaded ? React.createElement(LoadingSkeleton, null) : React.createElement(FormContainer, { store: this.store })),
                    React.createElement(ToastView_1.ToastView, null)));
            }
        });
        return TestPrepExperienceOnboardingView;
    }(React.Component)));
});

//# sourceMappingURL=TestPrepExperienceOnboardingView.js.map

define(["require", "exports", "mobx", "mobx-react", "react", "registration/post-registration/test-prep-experience/TestPrepExperienceCourseSurveyService", "registration/post-registration/test-prep-experience/TestPrepExperienceOnboardingView"], function (require, exports, mobx_1, mobx_react_1, React, TestPrepExperienceCourseSurveyService_1, TestPrepExperienceOnboardingView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectExamInput = void 0;
    exports.SelectExamInput = (0, mobx_react_1.observer)(function (props) {
        var _a = React.useState([]), courseTypeaheadOptions = _a[0], setCourseTypeaheadOptions = _a[1];
        var _b = React.useState(false), isLoading = _b[0], setIsLoading = _b[1];
        var _c = React.useState(false), showTypeaheadMenu = _c[0], setShowTypeaheadMenu = _c[1];
        var _d = React.useState(false), typeaheadHasFocus = _d[0], setTypeaheadHasFocus = _d[1];
        var _e = React.useState(null), selectedCourse = _e[0], setSelectedCourse = _e[1];
        var _f = React.useState(null), ref = _f[0], setRef = _f[1];
        return React.createElement(TestPrepExperienceOnboardingView_1.TestPrepCourseTypeahead, { setRef: (0, mobx_1.action)(function (ref) { return setRef(ref); }), options: courseTypeaheadOptions, onSearch: function (query) {
                setIsLoading(true);
                setShowTypeaheadMenu(false);
                setCourseTypeaheadOptions([]);
                return TestPrepExperienceCourseSurveyService_1.default.searchForTestPrepCourses(query)
                    .then((0, mobx_1.action)(function (results) {
                    var _a;
                    var filteredResults = results;
                    if (((_a = props.hiddenCourseResults) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        filteredResults = results.filter(function (course) { return !props.hiddenCourseResults.includes(course.title); });
                    }
                    setCourseTypeaheadOptions(filteredResults);
                }))
                    .finally((0, mobx_1.action)(function () {
                    setIsLoading(false);
                    setShowTypeaheadMenu(true);
                }));
            }, onInputChange: function (input) {
                props.onInputChange(input);
                if (!input) {
                    setShowTypeaheadMenu(false);
                }
            }, isLoading: isLoading, onChange: function (selected) {
                props.onChange(selected);
                ref.blur();
                if (selected.length > 0) {
                    setSelectedCourse(selected[0]);
                    setTypeaheadHasFocus(false);
                }
            }, setTypeaheadHasFocus: function (hasFocus) { return setTypeaheadHasFocus(hasFocus); }, minLength: 0, disabled: props.disabled, defaultInputValue: props.defaultInputValue ? props.defaultInputValue.title : "", showTypeaheadMenu: showTypeaheadMenu, placeholder: "Search exams", isCourseSelected: !!selectedCourse, isInputInvalid: props.isInputInvalid, clearTypeahead: function () {
                props.clearTypeahead();
                ref.clear();
            }, typeaheadHasFocus: typeaheadHasFocus, usePortalForMobile: true, onFocus: (0, mobx_1.action)(function () {
                setTypeaheadHasFocus(true);
                var isOnIOS = (navigator.userAgent != null && /iPad|iPhone|iPod/.test(navigator.userAgent)
                    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && !window.MSStream;
                if (isOnIOS) {
                    setTimeout(function () {
                        $("html").animate({ scrollTop: 0 });
                    }, 500);
                }
            }) });
    });
});

//# sourceMappingURL=TestPrepSelectExamInput.js.map

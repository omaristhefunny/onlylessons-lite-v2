define(["require", "exports", "lib/axios"], function (require, exports, axios_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.schoolClassUtil = exports.SchoolGradeLevel = void 0;
    var SchoolGradeLevel;
    (function (SchoolGradeLevel) {
        SchoolGradeLevel["OTHER"] = "OTHER";
        SchoolGradeLevel["ELEMENTARY"] = "ELEMENTARY";
        SchoolGradeLevel["MIDDLE"] = "MIDDLE";
        SchoolGradeLevel["HIGH"] = "HIGH";
        SchoolGradeLevel["COLLEGE"] = "COLLEGE";
        SchoolGradeLevel["NOT_ENROLLED"] = "NOT_ENROLLED";
    })(SchoolGradeLevel || (exports.SchoolGradeLevel = SchoolGradeLevel = {}));
    var SchoolClassUtil = (function () {
        function SchoolClassUtil() {
        }
        Object.defineProperty(SchoolClassUtil.prototype, "searchForSchoolsByGradeLevel", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (searchTerm, gradeLevel) {
                if (gradeLevel === SchoolGradeLevel.COLLEGE) {
                    return this.searchForSchools(searchTerm, "COLLEGE", "ADULT_EDUCATION");
                }
                else if (gradeLevel === SchoolGradeLevel.HIGH) {
                    return this.searchForSchools(searchTerm, "HIGH", "SECONDARY", "COMBINED_ELEMENTARY_AND_SECONDARY", "OTHER");
                }
                else if (gradeLevel === SchoolGradeLevel.MIDDLE) {
                    return this.searchForSchools(searchTerm, "MIDDLE", "COMBINED_ELEMENTARY_AND_SECONDARY", "SECONDARY", "HIGH", "OTHER");
                }
                else if (gradeLevel === SchoolGradeLevel.ELEMENTARY) {
                    return this.searchForSchools(searchTerm, "ELEMENTARY", "COMBINED_ELEMENTARY_AND_SECONDARY", "PREKINDERGARTEN", "MIDDLE", "OTHER");
                }
                throw "Unexpected gradeLevel=" + gradeLevel;
            }
        });
        Object.defineProperty(SchoolClassUtil.prototype, "searchForSchools", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (searchTerm) {
                var eduLevels = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    eduLevels[_i - 1] = arguments[_i];
                }
                if (!searchTerm) {
                    return Promise.resolve([]);
                }
                var params = new URLSearchParams();
                params.append("searchTerm", searchTerm);
                eduLevels.forEach((function (eduLevel) {
                    params.append("eduLevel[]", eduLevel);
                }));
                return axios_1.default.get("/school-class/search-schools.ajax", {
                    params: params
                })
                    .then(function (value) {
                    return value.data;
                });
            }
        });
        return SchoolClassUtil;
    }());
    exports.schoolClassUtil = new SchoolClassUtil();
});

//# sourceMappingURL=SchoolClassUtil.js.map

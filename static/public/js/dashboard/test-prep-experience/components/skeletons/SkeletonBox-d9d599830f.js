define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SkeletonBox = exports.SkeletonBoxType = void 0;
    var SkeletonBoxType;
    (function (SkeletonBoxType) {
        SkeletonBoxType["DEFAULT"] = "DEFAULT";
        SkeletonBoxType["FULL"] = "FULL";
    })(SkeletonBoxType || (exports.SkeletonBoxType = SkeletonBoxType = {}));
    var SkeletonBox = function (_a) {
        var className = _a.className, type = _a.type;
        var classNames = ["loading-box"];
        if (className) {
            classNames.push(className);
        }
        if (type === SkeletonBoxType.FULL) {
            classNames.push("loading-box--full");
        }
        return React.createElement("div", { className: classNames.join(" ") });
    };
    exports.SkeletonBox = SkeletonBox;
});

//# sourceMappingURL=SkeletonBox.js.map

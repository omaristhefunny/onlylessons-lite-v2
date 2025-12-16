define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SkeletonText = exports.SkeletonTextType = void 0;
    var SkeletonTextType;
    (function (SkeletonTextType) {
        SkeletonTextType["HEADER"] = "HEADER";
        SkeletonTextType["PARAGRAPH"] = "PARAGRAPH";
    })(SkeletonTextType || (exports.SkeletonTextType = SkeletonTextType = {}));
    var SkeletonText = function (_a) {
        var className = _a.className, type = _a.type;
        var classNames = ["loading-text"];
        if (className) {
            classNames.push(className);
        }
        if (type === SkeletonTextType.PARAGRAPH) {
            classNames.push("loading-text--paragraph");
        }
        return React.createElement("div", { className: classNames.join(" ") });
    };
    exports.SkeletonText = SkeletonText;
});

//# sourceMappingURL=SkeletonText.js.map

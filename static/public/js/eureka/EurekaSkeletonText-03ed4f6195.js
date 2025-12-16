define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EurekaSkeletonText = exports.EurekaSkeletonTextType = void 0;
    var EurekaSkeletonTextType;
    (function (EurekaSkeletonTextType) {
        EurekaSkeletonTextType["HEADER"] = "HEADER";
        EurekaSkeletonTextType["PARAGRAPH"] = "PARAGRAPH";
    })(EurekaSkeletonTextType || (exports.EurekaSkeletonTextType = EurekaSkeletonTextType = {}));
    var EurekaSkeletonText = function (_a) {
        var className = _a.className, type = _a.type;
        var classNames = ["eureka-skeleton-text"];
        if (className) {
            classNames.push(className);
        }
        if (type === EurekaSkeletonTextType.PARAGRAPH) {
            classNames.push("eureka-skeleton-text--paragraph");
        }
        return React.createElement("div", { className: classNames.join(" ") });
    };
    exports.EurekaSkeletonText = EurekaSkeletonText;
});

//# sourceMappingURL=EurekaSkeletonText.js.map

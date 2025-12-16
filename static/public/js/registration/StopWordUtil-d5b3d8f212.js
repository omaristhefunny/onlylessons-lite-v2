define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stopWordUtil = void 0;
    var StopWordUtil = (function () {
        function StopWordUtil() {
        }
        Object.defineProperty(StopWordUtil.prototype, "removeStopWordsFromList", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (list) {
                return list.filter(function (word) { return !StopWordUtil.stopWords.includes(word); });
            }
        });
        Object.defineProperty(StopWordUtil, "stopWords", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "if", "in", "into", "is", "it", "no",
                "not", "of", "on", "or", "that", "the", "their", "then", "there", "these", "they", "this", "to", "was", "will", "with"]
        });
        return StopWordUtil;
    }());
    exports.stopWordUtil = new StopWordUtil();
    exports.default = exports.stopWordUtil;
});

//# sourceMappingURL=StopWordUtil.js.map

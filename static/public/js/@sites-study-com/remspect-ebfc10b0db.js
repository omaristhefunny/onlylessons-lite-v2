define(['exports'], (function (exports) { 'use strict';

    if (typeof globalThis == "undefined" && 'object' !== "undefined") {
        window.globalThis = {};
    }
    if (!globalThis.sites_study_com_remspect_map) {
        globalThis.sites_study_com_remspect_map = {};
    }
    if (typeof document !== 'undefined') {
        let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)ssoe_debug\s*=\s*([^;]*).*$)|^.*$/, "$1");
        let ssoeRegex = /([^-]+)-([^\.]+)\.?/g;
        let match = ssoeRegex.exec(cookieValue);
        while (match !== null) {
            let factor = match[1].toLowerCase();
            let variation = match[2].toLowerCase();
            globalThis.sites_study_com_remspect_map[factor] = variation;
            match = ssoeRegex.exec(cookieValue);
        }
    }
    function getVariationMap() {
        var _a, _b;
        let theGlobals = (_b = (_a = globalThis.ssrThreadGlobals) === null || _a === void 0 ? void 0 : _a.getStore()) !== null && _b !== void 0 ? _b : globalThis;
        const originalMap = theGlobals.sites_study_com_remspect_map;
        const lowerCaseMap = {};
        for (const key in originalMap) {
            lowerCaseMap[key.toLowerCase()] = originalMap[key].toLowerCase();
        }
        return lowerCaseMap;
    }
    function isVariation(factor, variation) {
        const variationMap = getVariationMap();
        factor = factor.toLowerCase();
        if (variation === 'control') {
            return this.isControl(factor);
        }
        let orVariationRegex = /([^|]+)/g;
        let notVariationRegex = /^!(.*)/g;
        let match = orVariationRegex.exec(variation);
        while (match !== null) {
            let v = match[1].toLowerCase();
            let notMatch = v.match(notVariationRegex);
            let variationDesired = (notMatch === null);
            if (!variationDesired) {
                v = v.slice(1);
            }
            let foundVariation = (variationMap[factor] === v);
            if (foundVariation && variationDesired) {
                return true;
            }
            else if (!foundVariation && !variationDesired) {
                return true;
            }
            match = orVariationRegex.exec(variation);
        }
        return false;
    }
    function isControl(factor) {
        const variationMap = getVariationMap();
        return !variationMap[factor.toLowerCase()] || variationMap[factor.toLowerCase()] === 'control';
    }
    function isAssignedToFactor(factor) {
        return getVariationMap()[factor.toLowerCase()] != null;
    }
    function getVariation(factor) {
        return getVariationMap()[factor.toLowerCase()];
    }
    function printVariations() {
        console.log(getVariationMap());
    }

    exports.getVariation = getVariation;
    exports.isAssignedToFactor = isAssignedToFactor;
    exports.isControl = isControl;
    exports.isVariation = isVariation;
    exports.printVariations = printVariations;

}));
//# sourceMappingURL=remspect.js.map

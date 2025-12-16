define(['exports', 'react'], (function (exports, React) { 'use strict';

    function useCombinedRef(...refs) {
        return React.useCallback(legacyCombinedRef(...refs), [...refs]);
    }
    function legacyCombinedRef(...refs) {
        return (current) => {
            for (const ref of refs) {
                if (typeof ref === "function") {
                    ref(current);
                }
                else if (ref) {
                    ref.current = current;
                }
            }
        };
    }

    exports.legacyCombinedRef = legacyCombinedRef;
    exports.useCombinedRef = useCombinedRef;

}));
//# sourceMappingURL=react-utils.js.map

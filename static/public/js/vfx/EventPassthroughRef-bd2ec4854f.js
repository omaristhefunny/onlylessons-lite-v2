define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildEventPassthroughRef = buildEventPassthroughRef;
    function buildEventPassthroughRef(eventBindings) {
        var current;
        var boundEvents = [];
        return function (element) {
            if (current != element) {
                if (current) {
                    for (var _i = 0, boundEvents_1 = boundEvents; _i < boundEvents_1.length; _i++) {
                        var record = boundEvents_1[_i];
                        current.removeEventListener(record.type, record.listener, record.options);
                    }
                    boundEvents = [];
                }
                if (element) {
                    for (var attributeName in eventBindings) {
                        var match = /^on(?<type>[A-Z][a-zA-Z]*)(?<capture>Capture)?$/.exec(attributeName);
                        if (match) {
                            var listener = eventBindings[attributeName];
                            if (typeof listener === "function") {
                                var type = match.groups.type.toLowerCase();
                                var capture = !!match.groups.capture;
                                var options = { capture: capture };
                                var record = { type: type, listener: listener, options: options };
                                element.addEventListener(record.type, record.listener, record.options);
                                boundEvents.push(record);
                            }
                        }
                    }
                }
                current = element;
            }
        };
    }
});

//# sourceMappingURL=EventPassthroughRef.js.map

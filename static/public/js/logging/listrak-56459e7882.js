"use strict";
(function () {
    "use strict";
    require(['jquery'], init);
    function init() {
        function checkUrl(value) {
            return window.location.href.indexOf(value) > -1;
        }
        function loadListrak() {
            require(['lib/listrak']);
        }
        if (checkUrl("_channel=email")) {
            loadListrak();
        }
    }
})();

//# sourceMappingURL=listrak.js.map

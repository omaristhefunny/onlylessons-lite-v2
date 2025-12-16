define(["require", "exports", "jquery", "jquery"], function (require, exports, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        var hash = decodeURI(self.document.location.hash.substring(1));
        var element = $("form#loginForm");
        element[0]["action"] = "/academy/login.ajax#" + hash;
    });
});

//# sourceMappingURL=login-form.js.map

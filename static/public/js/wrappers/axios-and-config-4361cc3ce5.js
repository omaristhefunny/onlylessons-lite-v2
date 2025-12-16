define(["require", "exports", "lib/axios"], function (require, exports, axios_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    axios_1.default.interceptors.request.use(function (config) {
        var _a;
        if (!isRequestForStudyDomain(config)) {
            return config;
        }
        config.headers["x-requestGuid"] = window.globalUtils.getRequestGuid();
        if (((_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) == "POST") {
            var csrfElement = document.querySelector("meta[name=_csrf]");
            var csrfHeaderElement = document.querySelector("meta[name=_csrf_header]");
            if (csrfElement && csrfHeaderElement) {
                var headerName = csrfHeaderElement.attributes['content'].value;
                var headerValue = csrfElement.attributes['content'].value;
                if (headerName && headerValue) {
                    config.headers[headerName] = headerValue;
                }
            }
        }
        return config;
    });
    var isRequestForStudyDomain = function (config) {
        if (config.url.startsWith("/")) {
            return true;
        }
        try {
            var url = new URL(config.url);
            return url.hostname.endsWith("study.com");
        }
        catch (e) {
            console.error("failed checking if request is for study domain. url=" + config.url);
            console.error(e);
            return true;
        }
    };
    exports.default = axios_1.default;
});

//# sourceMappingURL=axios-and-config.js.map

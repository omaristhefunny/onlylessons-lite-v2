define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SubdomainUrlUtil = void 0;
    var Subdomain;
    (function (Subdomain) {
        Subdomain["COLLEGEPREP"] = "COLLEGEPREP";
        Subdomain["GRADUATEEXAMS"] = "GRADUATEEXAMS";
        Subdomain["HOMEWORK"] = "HOMEWORK";
        Subdomain["MEDICAL"] = "MEDICAL";
        Subdomain["NURSING"] = "NURSING";
        Subdomain["REALESTATE"] = "REALESTATE";
        Subdomain["TEACHINGLICENSE"] = "TEACHINGLICENSE";
    })(Subdomain || (Subdomain = {}));
    var SubdomainUrlUtil = (function () {
        function SubdomainUrlUtil() {
        }
        Object.defineProperty(SubdomainUrlUtil, "isRequestToStudy", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this.determineSubdomain(window.location.hostname) === null;
            }
        });
        Object.defineProperty(SubdomainUrlUtil, "isRequestToSubdomain", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (subdomain) {
                return this.determineSubdomain(window.location.hostname) === subdomain;
            }
        });
        Object.defineProperty(SubdomainUrlUtil, "getSubdomainBaseUrl", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (subdomain) {
                var serverName = window.location.hostname;
                if (!this.isRequestToStudy()) {
                    serverName = this.getStudyBaseUrlWithoutProtocol();
                }
                var rootDomain = this.getRootDomainFromHostName();
                var rootDomainIndex = serverName.indexOf(rootDomain);
                var prefix = serverName.substring(0, rootDomainIndex);
                return this.SECURE_SCHEME + prefix + subdomain.toLowerCase() + "." + rootDomain;
            }
        });
        Object.defineProperty(SubdomainUrlUtil, "getStudyBaseUrl", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var studyHostName = this.getStudyBaseUrlWithoutProtocol();
                return this.SECURE_SCHEME + studyHostName;
            }
        });
        Object.defineProperty(SubdomainUrlUtil, "linkToStudy", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (uri) {
                if (uri.indexOf("/") != 0) {
                    uri = "/" + uri;
                }
                return this.getStudyBaseUrl() + uri;
            }
        });
        Object.defineProperty(SubdomainUrlUtil, "getStudyBaseUrlWithoutProtocol", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var serverName = window.location.hostname;
                var subdomainPrefix = this.determineSubdomainPrefix();
                if (subdomainPrefix != "") {
                    return serverName.replace(subdomainPrefix + ".", "");
                }
                return serverName;
            }
        });
        Object.defineProperty(SubdomainUrlUtil, "determineSubdomainPrefix", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var serverName = window.location.hostname;
                var subdomain = this.determineSubdomain(serverName);
                return subdomain != null ? subdomain.toLowerCase() : "";
            }
        });
        Object.defineProperty(SubdomainUrlUtil, "determineSubdomain", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (serverName) {
                for (var _i = 0, _a = Object.keys(Subdomain); _i < _a.length; _i++) {
                    var subdomain = _a[_i];
                    var subdomainLower = subdomain.toLowerCase();
                    if (serverName.indexOf(subdomainLower) >= 0) {
                        return Subdomain[subdomain];
                    }
                }
                return null;
            }
        });
        Object.defineProperty(SubdomainUrlUtil, "getRootDomainFromHostName", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var hostName = window.location.hostname;
                if (hostName.endsWith(this.STUDY_COM_LOCAL_ROOT_DOMAIN)) {
                    return this.STUDY_COM_LOCAL_ROOT_DOMAIN;
                }
                else if (hostName.endsWith(this.STUDY_COM_STAGE_ROOT_DOMAIN)) {
                    return this.STUDY_COM_STAGE_ROOT_DOMAIN;
                }
                return this.STUDY_COM_PROD_ROOT_DOMAIN;
            }
        });
        Object.defineProperty(SubdomainUrlUtil, "SECURE_SCHEME", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "https://"
        });
        Object.defineProperty(SubdomainUrlUtil, "STUDY_COM_LOCAL_ROOT_DOMAIN", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "local.stage-study.com"
        });
        Object.defineProperty(SubdomainUrlUtil, "STUDY_COM_STAGE_ROOT_DOMAIN", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "stage-study.com"
        });
        Object.defineProperty(SubdomainUrlUtil, "STUDY_COM_PROD_ROOT_DOMAIN", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "study.com"
        });
        return SubdomainUrlUtil;
    }());
    exports.SubdomainUrlUtil = SubdomainUrlUtil;
});

//# sourceMappingURL=subdomainUrlUtil.js.map

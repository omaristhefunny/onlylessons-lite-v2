"use strict";
(function () {
    "use strict";
    var isInControlOfTest = function (factorName) {
        var factorsToVariations = {};
        var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)ssoe_debug\s*=\s*([^;]*).*$)|^.*$/, "$1");
        var ssoeRegex = /([^-]+)-([^\.]+)\.?/g;
        var match = ssoeRegex.exec(cookieValue);
        while (match !== null) {
            var factor = match[1];
            var variation = match[2];
            factorsToVariations[factor] = variation;
            match = ssoeRegex.exec(cookieValue);
        }
        return !factorsToVariations[factorName] || factorsToVariations[factorName] === 'control';
    };
    var requireModules = [
        "angularDependency",
        "jquery",
        "dashboard/recentActivity/recent-activity.service",
        "lib/jquery/bootstrap",
        "redesign/referFriend",
        "angular/util/lazy-load.module"
    ];
    var angularModules = ["lazy-load.module", "recent-activity.service"];
    function addAngularModule(requireModuleName, angularModuleName) {
        angularModules.push(angularModuleName);
        requireModules.push(requireModuleName);
    }
    var memberDataElement = document.querySelector("#memberData");
    var isLoggedIn = false;
    if (memberDataElement) {
        var memberIdStr = memberDataElement.getAttribute("data-member-id");
        var memberId = parseInt(memberIdStr, 10);
        if (!isNaN(memberId)) {
            isLoggedIn = true;
        }
    }
    if (document.querySelector("[data-load-ng-animate]")) {
        addAngularModule("lib/angular/animate", "ngAnimate");
    }
    if (document.querySelector("[data-load-ng-sanitize]")) {
        addAngularModule("lib/angular-sanitize", "ngSanitize");
    }
    function init(angular, $) {
        var module = angular.module("globalModules", angularModules);
        module.config(["$locationProvider", function ($locationProvider) {
                $locationProvider.hashPrefix("");
            }]);
        module.config(["$animateProvider", function ($animateProvider) {
                $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
            }]);
    }
    define(requireModules, init);
})();

//# sourceMappingURL=globalModules.js.map

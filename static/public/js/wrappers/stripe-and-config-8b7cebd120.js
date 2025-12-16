define(["require", "exports", "lib/stripe", "lib/stripe"], function (require, exports, Stripe) {
    "use strict";
    var element = document.querySelector("[data-remilon-env]");
    var env = element ? element.getAttribute("data-remilon-env") : "prod";
    if (env.indexOf("prod") !== -1) {
        Stripe.setPublishableKey("pk_live_iliKBs0kFwP1aXfKSfAYB0JT");
    }
    else {
        Stripe.setPublishableKey("pk_test_am41P9owJPqEG8VYW31ifWEY");
    }
    return Stripe;
});

//# sourceMappingURL=stripe-and-config.js.map

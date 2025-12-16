define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ZIPCODE_REGEX = exports.NAME_REGEX = exports.EMAIL_REGEX = exports.BASIC_PHONE_REGEX = void 0;
    exports.BASIC_PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/;
    exports.EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    exports.NAME_REGEX = /^[A-Za-z'\-. \u00c0-\uabff\uf900-\ufeff\ufffc-\ufffd]*$/;
    exports.ZIPCODE_REGEX = /^\d{5}([\-]?\d{4})?$/;
});

//# sourceMappingURL=FormConstants.js.map

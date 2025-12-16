var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "eventLogging", "lib/braintree/client", "lib/braintree/paypal-checkout", "@sites-study-com/remspect", "jquery", "lib/axios", "lib/stripe", "registration/ReactRegAppUtil", "registration/RegPaymentMethodTabsViews"], function (require, exports, eventLogging, braintreeClient, braintreePaypalClient, remspect, $, axios_1, Stripe, ReactRegAppUtil_1, RegPaymentMethodTabsViews_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AccountRegistrationService = void 0;
    var PAYPAL_BTN_ELEMENT_NOT_EXISTS_MESSAGE = "Document is ready and element #paypal-button does not exist";
    var AccountRegistrationService = (function () {
        function AccountRegistrationService() {
            Object.defineProperty(this, "__braintree", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
        }
        Object.defineProperty(AccountRegistrationService, "instance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _a;
                return (_a = this._instance) !== null && _a !== void 0 ? _a : (this._instance = new AccountRegistrationService());
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "braintreeClient", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (this.__braintree) {
                    return this.__braintree;
                }
                return this.__braintree = axios_1.default.post("/academy/register/subscriber/braintree-client-token.ajax", {}, { responseType: 'text' })
                    .then(function (response) {
                    var authToken = response.data["token"];
                    return braintreeClient.create({
                        authorization: authToken
                    });
                }).catch(function () {
                    _this.__braintree = null;
                    throw {
                        validationError: false,
                        errors: "Unable to create braintree client!"
                    };
                });
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "getOrLoadBraintreePayal", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var promise = new Promise(function (resolve, reject) {
                    require(["lib/braintree/paypal-checkout"], function (Paypal) {
                        resolve(Paypal);
                    }, function (error) {
                        reject(error);
                    });
                });
                return promise;
            }
        });
        ;
        Object.defineProperty(AccountRegistrationService.prototype, "braintreePaypalClient", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (regData, form, app) {
                var paypalBtnStyle = {
                    color: 'gold'
                };
                if (window.innerWidth < RegPaymentMethodTabsViews_1.MOBILE_CART_BREAKPOINT) {
                    paypalBtnStyle = {
                        color: 'white',
                        height: 50
                    };
                }
                return this.braintreeClient().then(function (braintreeClient) {
                    return braintreePaypalClient.create({
                        client: braintreeClient
                    }).then(function (paypalCheckoutInstance) {
                        return paypalCheckoutInstance.loadPayPalSDK({
                            vault: true
                        });
                    }).then(function (paypalCheckoutInstance) {
                        return window.paypal.Buttons({
                            fundingSource: window.paypal.FUNDING.PAYPAL,
                            style: paypalBtnStyle,
                            createBillingAgreement: function () {
                                return paypalCheckoutInstance.createPayment({
                                    flow: 'vault'
                                });
                            },
                            onApprove: function (data, actions) {
                                return paypalCheckoutInstance.tokenizePayment(data).then(function (payload) {
                                    form.submitting = true;
                                    app.submittingPaypal = true;
                                    regData.token = payload.nonce;
                                    regData.verificationToken = payload.nonce;
                                    regData.paymentMethod = "PAYPAL";
                                    regData.paymentGateway = "BRAINTREE";
                                    regData.paymentType = "PAYPAL";
                                    AccountRegistrationService.instance().postRegistration(regData)
                                        .then((function (regResponse) {
                                        window.location.href = regResponse.data['redirectUrl'];
                                    }));
                                });
                            },
                            onCancel: function (data) {
                            },
                            onError: function (error) {
                                if ((error === null || error === void 0 ? void 0 : error.message) === PAYPAL_BTN_ELEMENT_NOT_EXISTS_MESSAGE || (error === null || error === void 0 ? void 0 : error.message) === "Detected popup close") {
                                    return;
                                }
                                console.error('PayPal error', error);
                            }
                        }).render('#paypal-button');
                    }).catch(function (error) {
                        if ((error === null || error === void 0 ? void 0 : error.message) === PAYPAL_BTN_ELEMENT_NOT_EXISTS_MESSAGE) {
                            return;
                        }
                        console.error(error);
                    });
                });
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "createBillingToken", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (billing) {
                return __awaiter(this, void 0, void 0, function () {
                    var request, client;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                request = {
                                    endpoint: 'payment_methods/credit_cards',
                                    method: 'post',
                                    data: {
                                        creditCard: __assign(__assign({}, billing), { options: {
                                                validate: false
                                            } })
                                    }
                                };
                                return [4, this.braintreeClient()];
                            case 1:
                                client = _a.sent();
                                return [2, new Promise(function (resolve, reject) {
                                        client.request(request, function (err, response) {
                                            if (err) {
                                                reject({
                                                    validationError: err.type === "CUSTOMER",
                                                    errors: { "card": err.message }
                                                });
                                            }
                                            else {
                                                resolve(response);
                                            }
                                        });
                                    })];
                        }
                    });
                });
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "createAccount", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (data.creditCardNumber) {
                            return [2, this.submitWithPayment(data)];
                        }
                        return [2, this.submitWithoutPayment(data)];
                    });
                });
            }
        });
        Object.defineProperty(AccountRegistrationService, "countryIsUSA", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (data) {
                return data.billingAddressCountry === "USA" || data.billingAddressCountry === "US";
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "submitWithPayment", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var dateParts;
                    return __generator(this, function (_a) {
                        if (!AccountRegistrationService.countryIsUSA(data) && !!data.billingAddressZipCode) {
                            data.billingAddressZipCode = "";
                        }
                        if (data.expirationDate) {
                            dateParts = data.expirationDate.split("/");
                            if (!data.expirationMonth && !data.expirationYear) {
                                data.expirationMonth = dateParts[0];
                                data.expirationYear = dateParts[1];
                            }
                        }
                        if (remspect.isVariation("braintree", "V3")) {
                            return [2, this.submitWithBraintreeV3(data)];
                        }
                        else {
                            return [2, this.submitWithPaymentStripe(data)];
                        }
                        return [2];
                    });
                });
            }
        });
        Object.defineProperty(AccountRegistrationService, "getBillingInfoForStripe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (data) {
                var billingInfo = {};
                AccountRegistrationService.setValueIfDefined(billingInfo, 'name', data.billingFirstName + " " + data.billingLastName);
                AccountRegistrationService.setValueIfDefined(billingInfo, 'number', data.creditCardNumber);
                AccountRegistrationService.setValueIfDefined(billingInfo, 'exp_month', data.expirationMonth);
                AccountRegistrationService.setValueIfDefined(billingInfo, 'exp_year', data.expirationYear);
                AccountRegistrationService.setValueIfDefined(billingInfo, 'cvc', data.creditCardCvc);
                AccountRegistrationService.setValueIfDefined(billingInfo, 'address_zip', data.billingAddressZipCode);
                AccountRegistrationService.setValueIfDefined(billingInfo, 'address_country', data.billingAddressCountry);
                return billingInfo;
            }
        });
        Object.defineProperty(AccountRegistrationService, "setValueIfDefined", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (obj, key, value) {
                obj[key] = value ? value : '';
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "submitWithPaymentStripe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var stripeBillingInfo, stripeTokenRequestEventDetail;
                    var _this = this;
                    return __generator(this, function (_a) {
                        stripeBillingInfo = AccountRegistrationService.getBillingInfoForStripe(data);
                        stripeTokenRequestEventDetail = new eventLogging.LoggableEvent("stripeTokenRequest", false);
                        stripeTokenRequestEventDetail.verification = false;
                        eventLogging.queueEvent(stripeTokenRequestEventDetail);
                        return [2, new Promise(function (resolve, reject) {
                                Stripe.createToken(stripeBillingInfo, function (status, response) {
                                    var stripeTokenResponseEventDetail = new eventLogging.LoggableEvent("stripeTokenResponse", false);
                                    stripeTokenResponseEventDetail.response = response;
                                    stripeTokenResponseEventDetail.requestUUID = stripeTokenRequestEventDetail.javascriptUUID;
                                    stripeTokenResponseEventDetail.verification = false;
                                    eventLogging.queueEvent(stripeTokenResponseEventDetail);
                                    var responseError = response['error'];
                                    if (responseError) {
                                        reject(responseError);
                                    }
                                    else {
                                        data.token = response['id'];
                                        data.paymentMethod = "STRIPE";
                                        data.paymentGateway = "STRIPE";
                                        data.paymentType = "CARD";
                                        _this.postRegistration(data)
                                            .then(function (successResponse) { return resolve(successResponse); })
                                            .catch(function (errorResponse) { return reject(errorResponse); });
                                    }
                                });
                            })];
                    });
                });
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "submitWithBraintreeV3", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var braintreeTokenRequestEventDetail, card;
                    var _this = this;
                    return __generator(this, function (_a) {
                        braintreeTokenRequestEventDetail = new eventLogging.LoggableEvent("braintreeTokenRequest", false);
                        braintreeTokenRequestEventDetail.verification = false;
                        eventLogging.queueEvent(braintreeTokenRequestEventDetail);
                        card = {
                            number: data.creditCardNumber,
                            cvv: data.creditCardCvc,
                            expirationMonth: data.expirationMonth,
                            expirationYear: data.expirationYear,
                            billingAddress: {
                                postalCode: data.billingAddressZipCode,
                                countryCodeAlpha2: data.billingAddressCountry
                            }
                        };
                        return [2, this.createBillingToken(card).then(function (response) {
                                var nonce = response.creditCards[0].nonce;
                                data.verificationToken = nonce;
                                data.token = nonce;
                                data.paymentMethod = "BRAINTREE";
                                data.paymentGateway = "BRAINTREE";
                                data.paymentType = "CARD";
                                var braintreeTokenResponseEventDetail = new eventLogging.LoggableEvent("braintreeTokenResponse", false);
                                braintreeTokenResponseEventDetail.response = response;
                                braintreeTokenResponseEventDetail.requestUUID = braintreeTokenRequestEventDetail.javascriptUUID;
                                braintreeTokenResponseEventDetail.verification = false;
                                eventLogging.queueEvent(braintreeTokenResponseEventDetail);
                                return _this.postRegistration(data);
                            })];
                    });
                });
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "submitWithoutPayment", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2, this.postRegistration(data)];
                    });
                });
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "postRegistration", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (data) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    _this.submitSubscriber(data)
                        .then(function (response) {
                        resolve(response);
                    })
                        .catch(function (response) {
                        if (response.errors === null) {
                            window.location.href = '/academy/login.html?message=timeout';
                        }
                        else if (response.errors.redirectUrl != null) {
                            window.location.href = response.errors.redirectUrl;
                        }
                        reject(response);
                    });
                });
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "getCleanData", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (data) {
                var cleanData = __assign({}, data);
                for (var key in cleanData) {
                    if (ReactRegAppUtil_1.SENSITIVE_FIELD_KEYS_FOR_REGISTRATION.indexOf(key) > -1) {
                        delete cleanData[key];
                    }
                }
                return cleanData;
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "submitWithBraintreeGoogle", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (estimatedPrice, googlePayMerchantId) {
                var _this = this;
                var env = "TEST";
                if (!!googlePayMerchantId) {
                    env = "PRODUCTION";
                }
                return this.getOrLoadGooglePay().then(function (GooglePay) {
                    var paymentsClient = new GooglePay.payments.api.PaymentsClient({
                        environment: env
                    });
                    var braintreeTokenRequestEventDetail = new eventLogging.LoggableEvent("braintreeTokenRequest", false);
                    braintreeTokenRequestEventDetail.verification = false;
                    eventLogging.queueEvent(braintreeTokenRequestEventDetail);
                    return _this.getOrLoadBraintreeGooglePay().then(function (BraintreeGooglePay) {
                        return _this.braintreeClient().then(function (braintreeClient) {
                            return BraintreeGooglePay.create({
                                client: braintreeClient,
                                googlePayVersion: 2,
                                googleMerchantId: googlePayMerchantId
                            }).then(function (googlePaymentInstance) {
                                return paymentsClient.isReadyToPay({
                                    apiVersion: 2,
                                    apiVersionMinor: 0,
                                    allowedPaymentMethods: googlePaymentInstance.createPaymentDataRequest().allowedPaymentMethods,
                                    existingPaymentMethodRequired: true
                                }).then(function (isReadyToPay) {
                                    if (isReadyToPay['result']) {
                                        var paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
                                            transactionInfo: {
                                                currencyCode: 'USD',
                                                totalPriceStatus: 'ESTIMATED',
                                                totalPrice: estimatedPrice.toString()
                                            }
                                        });
                                        return paymentsClient.loadPaymentData(paymentDataRequest).then(function (paymentData) {
                                            return googlePaymentInstance.parseResponse(paymentData);
                                        }).then(function (result) {
                                            var braintreeTokenResponseEventDetail = eventLogging.newLoggableEvent("braintreeTokenResponse");
                                            braintreeTokenResponseEventDetail.response =
                                                result;
                                            braintreeTokenResponseEventDetail.requestUUID = braintreeTokenRequestEventDetail.javascriptUUID;
                                            braintreeTokenResponseEventDetail.verification = false;
                                            eventLogging.queueEvent(braintreeTokenResponseEventDetail);
                                            return result.nonce;
                                        }).catch(function (err) {
                                            return;
                                        });
                                    }
                                });
                            });
                        });
                    });
                }).catch(function (err) {
                    console.log("Error creating google client instance", err);
                });
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "submitPayPalRegistration", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (data) {
                var cleanData = this.getCleanData(data);
                cleanData.paymentGateway = 'PAYPAL';
                cleanData.paymentMethod = 'PAYPAL';
                cleanData.paymentType = 'PAYPAL';
                var headers = __assign(__assign({}, this.getCsrfHeaders()), { "Content-Type": "application/x-www-form-urlencoded" });
                var stringifiedData = $.param(cleanData);
                return axios_1.default.post("/academy/register/beginPayPalRegistration.ajax", stringifiedData, {
                    headers: headers
                });
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "submitSubscriber", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (data) {
                var _a;
                var cleanData = this.getCleanData(data);
                var headers = __assign(__assign({}, this.getCsrfHeaders()), { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Remilon-Reg-Displayed-Price": (_a = document.querySelector("[test-id=reg_form_current_product_price]")) === null || _a === void 0 ? void 0 : _a.textContent });
                var stringifiedData = $.param(cleanData);
                return axios_1.default.post("/academy/register/subscriber/submit-subscriber.ajax", stringifiedData, {
                    timeout: 1000 * 60 * 4,
                    headers: headers
                })
                    .catch(function (response) {
                    return Promise.reject({
                        validationError: response.response.status === 400,
                        errors: response.response.data
                    });
                });
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "getUpdatedPaidTrialInformation", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (productKey) {
                var config = {
                    params: {
                        product: productKey,
                    }
                };
                return axios_1.default.get("/academy/register/subscriber/get-paid-trial.ajax", config)
                    .then(function (response) {
                    return response.data;
                });
            }
        });
        Object.defineProperty(AccountRegistrationService, "canUseApplePay", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (window["ApplePaySession"] != null) {
                    return window["ApplePaySession"].supportsVersion(3) && window["ApplePaySession"].canMakePayments();
                }
                return false;
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "initApplePayClientInstanceAndClickHandler", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (braintreeClient, initClickHandlerCallback) {
                this.getOrLoadBraintreeApplePay().then(function (BraintreeApplePay) {
                    BraintreeApplePay.create({
                        client: braintreeClient
                    }).then(function (applePayInstance) {
                        initClickHandlerCallback(applePayInstance);
                    });
                }).catch(function (err) {
                    var event = document.createEvent("CustomEvent");
                    event.initCustomEvent("braintreeAppleError", true, true, {
                        type: "braintree apple client error",
                        error: err
                    });
                    document.dispatchEvent(event);
                });
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "checkCoupon", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (couponCode, product, pageContext) {
                var config = {
                    params: {
                        couponCode: couponCode,
                        product: product,
                        isNewSubscriber: true,
                        pageContext: pageContext || "unknown"
                    }
                };
                return axios_1.default.get("/member/coupon.ajax", config)
                    .then(function (response) {
                    return response.data;
                })
                    .catch(function (response) {
                    var _a, _b;
                    throw (_b = (_a = response.response) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.couponerror;
                });
            }
        });
        Object.defineProperty(AccountRegistrationService.prototype, "getOrLoadBraintreeApplePay", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var promise = new Promise(function (resolve, reject) {
                    require(["lib/braintree/apple-pay"], function (ApplePay) {
                        resolve(ApplePay);
                    }, function (error) {
                        reject(error);
                    });
                });
                return promise;
            }
        });
        ;
        Object.defineProperty(AccountRegistrationService.prototype, "getOrLoadGooglePay", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var promise = new Promise(function (resolve, reject) {
                    require(["lib/google/pay"], function (Google) {
                        resolve(Google);
                    }, function (error) {
                        reject(error);
                    });
                });
                return promise;
            }
        });
        ;
        Object.defineProperty(AccountRegistrationService.prototype, "getOrLoadBraintreeGooglePay", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var promise = new Promise(function (resolve, reject) {
                    require(["lib/braintree/google-pay"], function (GooglePay) {
                        resolve(GooglePay);
                    }, function (error) {
                        reject(error);
                    });
                });
                return promise;
            }
        });
        ;
        Object.defineProperty(AccountRegistrationService.prototype, "getCsrfHeaders", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var headers = {};
                var csrfElement = document.querySelector("meta[name=_csrf]");
                var csrfHeaderElement = document.querySelector("meta[name=_csrf_header]");
                if (csrfElement && csrfHeaderElement) {
                    var headerName = csrfHeaderElement.attributes['content'].value;
                    var headerValue = csrfElement.attributes['content'].value;
                    if (headerName && headerValue) {
                        headers[headerName] = headerValue;
                    }
                }
                return headers;
            }
        });
        return AccountRegistrationService;
    }());
    exports.AccountRegistrationService = AccountRegistrationService;
});

//# sourceMappingURL=AccountRegistrationService.js.map

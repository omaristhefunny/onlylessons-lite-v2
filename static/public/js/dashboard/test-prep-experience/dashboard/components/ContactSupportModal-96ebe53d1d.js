define(["require", "exports", "mobx", "react", "mobx-react", "support/ContactSupportViews", "eureka/EurekaModal", "dashboard/test-prep-experience/components/toast/ToastStore"], function (require, exports, mobx_1, React, mobx_react_1, ContactSupportViews_1, EurekaModal_1, ToastStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.contactSupportModalStore = exports.ContactSupportModalStore = void 0;
    var ContactSupportModalStore = (function () {
        function ContactSupportModalStore() {
            var _this = this;
            Object.defineProperty(this, "isLoading", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: true
            });
            Object.defineProperty(this, "isSubmitting", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "shouldShowModal", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "contactSupportStore", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            });
            this.contactSupportStore =
                new ContactSupportViews_1.ContactSupportFormStore({ hideSubmitButton: true, onSubmitSuccess: function () { return _this.onSubmitSuccess(); }, tags: '', useCoachingText: false });
            (0, mobx_1.makeAutoObservable)(this);
        }
        Object.defineProperty(ContactSupportModalStore.prototype, "closeModal", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.shouldShowModal = false;
            }
        });
        Object.defineProperty(ContactSupportModalStore.prototype, "openModal", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.shouldShowModal = true;
            }
        });
        Object.defineProperty(ContactSupportModalStore.prototype, "onSubmitSuccess", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.closeModal();
                ToastStore_1.default.showToast(ToastStore_1.ToastType.SUCCESS, "Your contact form was submitted.", "We’ll get back to you shortly.");
            }
        });
        return ContactSupportModalStore;
    }());
    exports.ContactSupportModalStore = ContactSupportModalStore;
    function ContactSupportModal(_a) {
        var store = _a.store;
        return (React.createElement(EurekaModal_1.EurekaModal, { animation: true, cnameTestIdPrefix: "contact_support", isSubmitDisabled: store.contactSupportStore.isSubmitting || !store.contactSupportStore.isFormValid, show: store.shouldShowModal, title: "Contact Support", onClose: function () { return store.closeModal(); }, onSubmit: function () { return store.contactSupportStore.handleFormSubmit(); } },
            React.createElement(ContactSupportViews_1.ContactSupportFormView, { store: store.contactSupportStore })));
    }
    exports.default = (0, mobx_react_1.observer)(ContactSupportModal);
    exports.contactSupportModalStore = new ContactSupportModalStore();
});

//# sourceMappingURL=ContactSupportModal.js.map

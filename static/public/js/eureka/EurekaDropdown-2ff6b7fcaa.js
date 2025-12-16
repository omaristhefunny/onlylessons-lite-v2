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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports", "eureka/EurekaButton", "mobx", "mobx-react", "react", "react"], function (require, exports, EurekaButton_1, mobx_1, mobx_react_1, React, react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EurekaDropdown = exports.DropdownLinkDisplay = void 0;
    var DropdownLinkDisplay;
    (function (DropdownLinkDisplay) {
        DropdownLinkDisplay["CURRENT_ITEM"] = "item";
        DropdownLinkDisplay["PLACEHOLDER"] = "placeholder";
    })(DropdownLinkDisplay || (exports.DropdownLinkDisplay = DropdownLinkDisplay = {}));
    function toValue(item) {
        if ("value" in item) {
            return item.value;
        }
        return null;
    }
    function isSelectAllOption(item) {
        return typeof item !== "string" && "internalAction" in item && item.internalAction === "SELECT_ALL";
    }
    function isLink(item) {
        return typeof item !== "string" && typeof item !== "number" && "linkAction" in item;
    }
    function isDropdownOption(item) {
        return typeof item !== "string" && typeof item !== "number" && "value" in item;
    }
    var EurekaDropdownState = (function () {
        function EurekaDropdownState(multiple, items, defaultValue, includeSelectAllOption, doNotCloseOnSelect) {
            if (includeSelectAllOption === void 0) { includeSelectAllOption = false; }
            if (doNotCloseOnSelect === void 0) { doNotCloseOnSelect = false; }
            Object.defineProperty(this, "isOpen", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "value", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "items", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            Object.defineProperty(this, "keyboardIndex", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: -1
            });
            Object.defineProperty(this, "multiple", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "includeSelectAllOption", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "doNotCloseOnSelect", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.multiple = multiple;
            this.items = items;
            if (defaultValue) {
                this.value = defaultValue;
            }
            else if (multiple) {
                this.value = [];
            }
            else {
                this.value = null;
            }
            this.includeSelectAllOption = includeSelectAllOption;
            this.doNotCloseOnSelect = doNotCloseOnSelect;
            (0, mobx_1.makeAutoObservable)(this, { items: mobx_1.observable.shallow, value: mobx_1.observable.ref });
        }
        Object.defineProperty(EurekaDropdownState.prototype, "selectedItems", {
            get: function () {
                var valueArray;
                if (Array.isArray(this.value)) {
                    valueArray = this.value;
                }
                else {
                    valueArray = [this.value];
                }
                return this.selectableItems.filter(function (item) { return valueArray.includes(item.value); });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EurekaDropdownState.prototype, "selectableItems", {
            get: function () {
                var ret = [];
                for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (isDropdownOption(item)) {
                        ret.push(item);
                    }
                }
                return ret;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EurekaDropdownState.prototype, "isEveryOptionSelected", {
            get: function () {
                return this.selectedItems.length == this.selectableItems.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EurekaDropdownState.prototype, "isSelected", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (option) {
                return this.selectedItems.includes(option);
            }
        });
        Object.defineProperty(EurekaDropdownState.prototype, "setItems", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (items) {
                if (this.multiple && this.includeSelectAllOption) {
                    this.items = __spreadArray([
                        {
                            internalAction: "SELECT_ALL"
                        }
                    ], items, true);
                }
                else {
                    this.items = items;
                }
                if (!this.doNotCloseOnSelect) {
                    this.setOpen(false);
                }
            }
        });
        Object.defineProperty(EurekaDropdownState.prototype, "interactWith", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (item) {
                if (isSelectAllOption(item)) {
                    this.toggleSelectAll();
                }
                else if (isLink(item)) {
                    item.linkAction();
                    if (item.closeDropdownOnSelect) {
                        this.setOpen(false);
                    }
                }
                else {
                    this.toggleValue(toValue(item));
                }
                this.setKeyboardIndex(this.items.indexOf(item));
            }
        });
        Object.defineProperty(EurekaDropdownState.prototype, "toggleSelectAll", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.multiple) {
                    return;
                }
                if (this.isEveryOptionSelected) {
                    this.value = [];
                    return;
                }
                this.value = this.selectableItems.map(function (i) { return i.value; });
            }
        });
        Object.defineProperty(EurekaDropdownState.prototype, "toggleValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value) {
                if (this.multiple) {
                    var array = this.value;
                    if (array.includes(value)) {
                        array = array.filter(function (i) { return i !== value; });
                    }
                    else {
                        array = __spreadArray(__spreadArray([], array, true), [value], false);
                    }
                    this.value = array;
                }
                else {
                    this.value = value;
                    this.isOpen = false;
                }
            }
        });
        Object.defineProperty(EurekaDropdownState.prototype, "incrementKeyboard", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.keyboardIndex = Math.min(this.keyboardIndex + 1, this.items.length - 1);
            }
        });
        Object.defineProperty(EurekaDropdownState.prototype, "decrementKeyboard", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.keyboardIndex = Math.max(this.keyboardIndex - 1, 0);
            }
        });
        Object.defineProperty(EurekaDropdownState.prototype, "setKeyboardIndex", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (idx) {
                this.keyboardIndex = idx;
            }
        });
        Object.defineProperty(EurekaDropdownState.prototype, "setOpen", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (open) {
                if (open === void 0) { open = true; }
                if (open === false) {
                    this.keyboardIndex = -1;
                }
                this.isOpen = open;
            }
        });
        Object.defineProperty(EurekaDropdownState.prototype, "toggleOpen", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.setOpen(!this.isOpen);
            }
        });
        Object.defineProperty(EurekaDropdownState.prototype, "setValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value) {
                this.value = value;
            }
        });
        return EurekaDropdownState;
    }());
    var dropdownContext = (0, react_1.createContext)(null);
    function stringsToItems(items) {
        return items.map(function (item) { return typeof item === "string" ? {
            display: item,
            value: item
        } : item; });
    }
    exports.EurekaDropdown = (0, mobx_react_1.observer)(function (props) {
        var _a;
        var itemObjs = (0, react_1.useMemo)(function () { return stringsToItems(props.items); }, [props.items]);
        var state = (0, react_1.useMemo)(function () {
            return new EurekaDropdownState(props.multiple, itemObjs, props.defaultValue, props.includeSelectAllOption, props.doNotCloseOnSelect);
        }, []);
        var listRef = (0, react_1.useRef)(null);
        var dropdownRef = (0, react_1.useRef)(null);
        (0, react_1.useEffect)(function () {
            if (typeof props.value !== "undefined") {
                state.setValue(props.value);
            }
        }, [props.value]);
        (0, react_1.useEffect)(function () { return (0, mobx_1.reaction)(function () { return state.value; }, function () {
            if (props.onChange) {
                props.onChange(state.value);
            }
        }); }, []);
        (0, react_1.useEffect)(function () { return state.setItems(itemObjs); }, [itemObjs]);
        (0, react_1.useEffect)(function () { return (0, mobx_1.autorun)(function () {
            if (state.isOpen) {
                requestAnimationFrame(function () {
                    state.setKeyboardIndex(0);
                    listRef.current.scrollTop = 0;
                });
            }
        }); }, []);
        var checkFocusLoss = (0, react_1.useCallback)(function (e) {
            var _a;
            if (!((_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))) {
                state.setOpen(false);
            }
        }, [dropdownRef.current]);
        var keybinding = (0, react_1.useCallback)(function (ul) {
            listRef.current = ul;
            ul === null || ul === void 0 ? void 0 : ul.addEventListener("keydown", function (e) {
                switch (e.key) {
                    case 'ArrowUp':
                        state.decrementKeyboard();
                        e.preventDefault();
                        break;
                    case 'ArrowDown':
                        state.incrementKeyboard();
                        e.preventDefault();
                        break;
                    case 'Escape':
                        state.setOpen(false);
                        break;
                    case ' ':
                    case 'Enter':
                        if (state.keyboardIndex >= 0) {
                            state.interactWith(state.items[state.keyboardIndex]);
                            e.preventDefault();
                        }
                        break;
                }
            });
        }, []);
        var linkDisplay;
        if (typeof props.linkDisplay === "function") {
            linkDisplay = props.linkDisplay(state.value);
        }
        else {
            linkDisplay = props.linkDisplay;
        }
        if (!linkDisplay || linkDisplay === DropdownLinkDisplay.CURRENT_ITEM) {
            if (state.selectedItems.length === 0) {
                linkDisplay = DropdownLinkDisplay.PLACEHOLDER;
            }
            else if (state.selectedItems.length === 1) {
                var selectedItem = state.selectedItems[0];
                linkDisplay = selectedItem.display;
            }
            else {
                linkDisplay = "".concat(state.selectedItems.length, " Selected");
            }
        }
        if (linkDisplay === DropdownLinkDisplay.PLACEHOLDER) {
            linkDisplay = (_a = props.placeholder) !== null && _a !== void 0 ? _a : ("Select" + (!props.multiple ? " One" : ""));
        }
        var itemElements = state.items.map(function (i, idx) {
            if (isSelectAllOption(i)) {
                return React.createElement(SelectAllItem, { option: i, key: idx, idx: idx });
            }
            else if (isLink(i)) {
                return React.createElement(LinkItem, { o: i, key: idx, idx: idx });
            }
            else if (props.multiple) {
                return React.createElement(MultiItem, { o: i, key: idx, idx: idx });
            }
            else {
                return React.createElement(SingleItem, { o: i, key: idx, idx: idx });
            }
        });
        var extraProps = {};
        if (props.cname) {
            extraProps["data-cname"] = props.cname;
        }
        if (props.testId) {
            extraProps["test-id"] = props.testId;
        }
        var classes = ["eureka-dropdown"];
        if (state.isOpen) {
            classes.push("eureka-dropdown--open");
        }
        if (props.extraClasses) {
            classes.push(props.extraClasses);
        }
        var buttonClasses = ["eureka-dropdown__link"];
        if (props.buttonClasses) {
            buttonClasses.push(props.buttonClasses);
        }
        if (props.placeholder != linkDisplay) {
            buttonClasses.push("eureka-dropdown__link--selected");
        }
        var buttonProps = { "test-id": "eureka-dropdown-button" };
        var listProps = { "test-id": "eureka-dropdown-list" };
        var listClasses = props.alignDropdownRight ? ["eureka-dropdown__list--right"] : [];
        return React.createElement(dropdownContext.Provider, { value: state },
            React.createElement("div", __assign({ className: classes.join(" ") }, extraProps, { ref: dropdownRef }),
                React.createElement(EurekaButton_1.EurekaButton, __assign({}, buttonProps, { as: "button", className: buttonClasses.join(" "), tabIndex: 0, buttonType: EurekaButton_1.EurekaButtonType.TERTIARY_LINK, onClick: function () { return state.toggleOpen(); } }), linkDisplay),
                React.createElement("ul", __assign({}, listProps, { role: "menu", className: "eureka-dropdown__list ".concat(listClasses.join(" ")), ref: keybinding, onBlur: checkFocusLoss, tabIndex: -1 }),
                    props.placeholderAsOption && React.createElement(PlaceholderOption, { body: props.placeholder }),
                    itemElements)));
    });
    var PlaceholderOption = function (props) {
        return React.createElement("li", { className: "eureka-dropdown__placeholder", key: "placeholder" }, props.body);
    };
    function useKeyboardFocusRef(idx) {
        var state = (0, react_1.useContext)(dropdownContext);
        var el = (0, react_1.useRef)(null);
        (0, react_1.useEffect)(function () { return (0, mobx_1.autorun)(function () {
            var _a;
            if (state.keyboardIndex === idx) {
                (_a = el.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }); }, []);
        return el;
    }
    var SingleItem = (0, mobx_react_1.observer)(function (props) {
        var state = (0, react_1.useContext)(dropdownContext);
        var li = useKeyboardFocusRef(props.idx);
        return React.createElement("li", { role: "menuitem", className: "eureka-dropdown__item", ref: li, "test-id": "eureka-dropdown-item", onClick: function () { return state.interactWith(props.o); }, tabIndex: -1 }, props.o.display);
    });
    var MultiItem = (0, mobx_react_1.observer)(function (props) {
        var state = (0, react_1.useContext)(dropdownContext);
        var li = useKeyboardFocusRef(props.idx);
        var classes = ["eureka-dropdown__item", "eureka-dropdown__item--multiple"];
        var isSelected = state.isSelected(props.o);
        if (isSelected) {
            classes.push("eureka-dropdown__item--selected");
        }
        return React.createElement("li", { role: "menuitemcheckbox", className: classes.join(" "), tabIndex: -1, "data-test-is-checked": isSelected, onClick: function () { return state.interactWith(props.o); }, ref: li, "test-id": "eureka-dropdown-item" }, props.o.display);
    });
    var LinkItem = (0, mobx_react_1.observer)(function (props) {
        var state = (0, react_1.useContext)(dropdownContext);
        var li = useKeyboardFocusRef(props.idx);
        return React.createElement("li", { role: "menuitem", className: "eureka-dropdown__link-item", ref: li, onClick: function () { return state.interactWith(props.o); }, tabIndex: -1 }, props.o.display);
    });
    var SelectAllItem = (0, mobx_react_1.observer)(function (props) {
        var state = (0, react_1.useContext)(dropdownContext);
        var li = useKeyboardFocusRef(props.idx);
        var classes = ["eureka-dropdown__item", "eureka-dropdown__item--multiple"];
        if (state.isEveryOptionSelected) {
            classes.push("eureka-dropdown__item--selected");
        }
        return React.createElement("li", { role: "menuitemcheckbox", className: classes.join(" "), tabIndex: -1, onClick: function () { return state.interactWith(props.option); }, ref: li, "test-id": "eureka-dropdown-item" }, "Select all");
    });
});

//# sourceMappingURL=EurekaDropdown.js.map

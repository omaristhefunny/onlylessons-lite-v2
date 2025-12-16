define(['exports', '@sites-study-com/marketing-constants', 'react', '@sites-study-com/member', '@sites-study-com/marketing'], (function (exports, Marketing, React, member, marketing) { 'use strict';

    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var Marketing__namespace = /*#__PURE__*/_interopNamespaceDefault(Marketing);
    var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

    const RiskFreeDays = ({ forIntroPlan }) => {
        if (member.useMemberInfo().isPaidTrialEligible && !forIntroPlan) {
            console.error(new Error("Using 'risk-free' language for paid trial visitors"));
        }
        return Marketing__namespace.com_study_refund_defaultDays;
    };
    const MoneyBackGuaranteeLanguage = ({ forIntroPlan }) => {
        if (member.useMemberInfo().isPaidTrialEligible && !forIntroPlan) {
            console.error(new Error("Using 'risk-free' language for paid trial visitors"));
        }
        return React__namespace.createElement("span", null,
            React__namespace.createElement("span", { className: "risk-free-days" },
                React__namespace.createElement(RiskFreeDays, { forIntroPlan: forIntroPlan }),
                "-day"),
            " money back guarantee");
    };
    const RiskFreeLanguage = ({ showXDayLanguage, showCancelLanguage, punctuation }) => {
        if (member.useMemberInfo().isPaidTrialEligible) {
            return React__namespace.createElement(React__namespace.Fragment, null, "Try it now");
        }
        if (showXDayLanguage && showCancelLanguage) {
            return React__namespace.createElement(React__namespace.Fragment, null,
                "Try it risk-free for ",
                React__namespace.createElement(RiskFreeDays, null),
                " days. Cancel anytime",
                punctuation);
        }
        if (showXDayLanguage) {
            return React__namespace.createElement(React__namespace.Fragment, null,
                "Try it risk-free for ",
                React__namespace.createElement(RiskFreeDays, null),
                " days",
                punctuation);
        }
        if (showCancelLanguage) {
            return React__namespace.createElement(React__namespace.Fragment, null,
                "Try it risk-free. Cancel anytime",
                punctuation);
        }
        return React__namespace.createElement(React__namespace.Fragment, null,
            "Try it risk-free",
            punctuation);
    };

    const CtaText = ({ show30DayLanguage, showCancelLanguage, showStartTodayLanguage, children, }) => {
        const memberInfo = member.useMemberInfo();
        let paidTrialEligible = memberInfo.isPaidTrialEligible;
        if (children == undefined && paidTrialEligible) {
            return React__namespace.createElement("span", null,
                showStartTodayLanguage ? "Start today. " : "",
                " Try it now");
        }
        else if (children == undefined) {
            return React__namespace.createElement("span", null,
                React__namespace.createElement(marketing.RiskFreeLanguage, { showXDayLanguage: show30DayLanguage, showCancelLanguage: showCancelLanguage }));
        }
        else {
            return React__namespace.createElement("span", null, children);
        }
    };
    const CtaSubText = (props) => {
        const memberInfo = member.useMemberInfo();
        let paidTrialEligible = memberInfo.isPaidTrialEligible;
        let displayText;
        if (!props.bodyText && paidTrialEligible) {
            displayText = "Try it now";
        }
        else if (!props.bodyText) {
            displayText = React__namespace.createElement(marketing.RiskFreeLanguage, { showXDayLanguage: props.show30DayLanguage, showCancelLanguage: props.showCancelLanguage });
        }
        else {
            displayText = props.bodyText;
        }
        let isInTestPrepCocoon = memberInfo.cocoonType === member.CocoonType.TEST_PREP;
        if (isInTestPrepCocoon || props.forceRiskFreeLanguage) {
            return React__namespace.createElement("span", null, displayText);
        }
        else if (paidTrialEligible) {
            return React__namespace.createElement("span", null, "It only takes a few minutes to setup and you can cancel any time.");
        }
        else {
            return React__namespace.createElement("span", null, displayText);
        }
    };

    exports.CtaSubText = CtaSubText;
    exports.CtaText = CtaText;
    exports.MoneyBackGuaranteeLanguage = MoneyBackGuaranteeLanguage;
    exports.RiskFreeDays = RiskFreeDays;
    exports.RiskFreeLanguage = RiskFreeLanguage;

}));
//# sourceMappingURL=marketing.js.map

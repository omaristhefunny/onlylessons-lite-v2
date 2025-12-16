define(["require", "exports", "react", "@sites-study-com/remspect"], function (require, exports, React, remspect) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RegFaqView = void 0;
    var RegFaqView = function () {
        var c = remspect.isControl("regFormRebrand") ? "col-sm-6" : "reg-rebrand-faq__cols";
        return (React.createElement("div", { className: "innerContainer contentList" },
            React.createElement("div", { className: c },
                React.createElement("h4", null, "Who creates your curriculum and materials?"),
                React.createElement("p", null, "Study.com is proud of providing a curriculum you can trust. All of our learning materials are crafted by expert instructors (teachers, professors, M.Ed., Ph.D., etc.) who have mastered their subject matter and strive to make learning exciting and easy."),
                React.createElement("h4", null, "What makes Study.com different than other learning solutions online?"),
                React.createElement("p", null, "The Study.com difference is our approach to learning - we've built a bite-sized learning experience that delivers complex concepts in a simple, fun, and engaging way. With 5-10 minute video lessons and assessments to test your knowledge, Study.com members are learning faster than ever before."),
                React.createElement("h4", null, "Who is Study.com for?"),
                React.createElement("p", null, "We offer personalized memberships for all learners, k-12, through college. Whether you're a student, teacher, college learner, parent, or working professional, Study.com's platform of 1.9m learning resources are customized to help each learner achieve their education goals.")),
            React.createElement("div", { className: c },
                React.createElement("h4", null, "Is my membership flexible? Can I stop and start based on my needs?"),
                React.createElement("p", null, "Yes, with Study.com you can stop, start, pause or change plans at any time. When you're ready to reactivate, your account history will be easily accessible."),
                React.createElement("h4", null, "How does Study.com give back?"),
                React.createElement("p", null, "In service of our mission to make education more accessible, Study.com has donated $23m in-kind value across social impact programs since 2017."))));
    };
    exports.RegFaqView = RegFaqView;
});

//# sourceMappingURL=RegFaqViews.js.map

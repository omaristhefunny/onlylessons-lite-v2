define(['require', 'exports', 'react', '@study-com/eureka-design-system', 'mobx-react'], (function (require, exports, React, eurekaDesignSystem, mobxReact) { 'use strict';

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

    var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

    const openSidebarWithMessage = (starter) => {
        new Promise(function (resolve, reject) { require(['ai/AIAssistantStore'], function (m) { resolve(/*#__PURE__*/_interopNamespaceDefault(m)); }, reject); }).then(({ AIAssistantStore }) => {
            const instance = AIAssistantStore.instance;
            instance.init().then(() => {
                if (starter) {
                    instance.openAndSendMessage(starter);
                }
                else {
                    instance.openSidebar();
                }
            });
        });
    };

    var __rest$4 = (window && window.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    const MultipleLineLinkButton = (_a) => {
        var { children, className, disabled = false, onClick, "data-cname": dataCname, "test-id": testId = dataCname } = _a, otherProps = __rest$4(_a, ["children", "className", "disabled", "onClick", "data-cname", "test-id"]);
        return (React__namespace.createElement("button", Object.assign({}, otherProps, { "data-cname": dataCname, "test-id": testId, className: `e2-button e2-button--link multiple-line-link-button ${className}`, onClick: onClick, disabled: disabled, type: "button" }),
            React__namespace.createElement("div", { className: "multiple-line-link-button__children-container" }, children)));
    };

    var __rest$3 = (window && window.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    const TestPrepAiSalesAssistantBannerChatStarterActions = (_a) => {
        var { chatStarters, "data-cname": dataCname, "test-id": testId = dataCname, openSidebar } = _a, otherProps = __rest$3(_a, ["chatStarters", "data-cname", "test-id", "openSidebar"]);
        if (!chatStarters || chatStarters.length === 0) {
            console.warn("No chat starters provided");
            return null;
        }
        const starterElements = chatStarters.map((starter, index) => (React__namespace.createElement(MultipleLineLinkButton, { className: "test-prep-ai-assistant__chat-starter", "data-cname": dataCname + "__chat_starter", "test-id": testId + "__chat_starter", onClick: () => openSidebar(starter.llmMessage), key: index },
            React__namespace.createElement("div", { className: "test-prep-ai-assistant__chat-starter-content" },
                React__namespace.createElement("div", { className: "test-prep-ai-assistant__chat-starter-title" },
                    React__namespace.createElement("span", { className: "test-prep-ai-assistant__chat-starter-sparkle" }),
                    React__namespace.createElement("span", null, starter.title))))));
        return (React__namespace.createElement("div", Object.assign({ className: "test-prep-ai-assistant__actions", "test-id": testId, "data-cname": dataCname, "data-track-visible": true }, otherProps),
            React__namespace.createElement("div", { className: "test-prep-ai-assistant__chat-starters" }, starterElements)));
    };

    var __rest$2 = (window && window.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    const TestPrepAiSalesAssistantBannerTextInputAction = (_a) => {
        var { testName, "data-cname": dataCname, "test-id": testId = dataCname, openSidebar } = _a, otherProps = __rest$2(_a, ["testName", "data-cname", "test-id", "openSidebar"]);
        const [text, setText] = React__namespace.useState("");
        const onKeyDown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                e.currentTarget.blur();
                openSidebar(text);
                setText("");
            }
        };
        return (React__namespace.createElement("div", Object.assign({ className: "test-prep-ai-assistant__actions test-prep-ai-assistant__actions--text-input", "test-id": testId, "data-cname": dataCname, "data-track-visible": true }, otherProps),
            React__namespace.createElement("div", { className: "test-prep-ai-assistant__text-input" },
                React__namespace.createElement(eurekaDesignSystem.Input, { placeholder: "Ask any question about preparing for the " + testName + " exam", onChange: value => setText(value), value: text, type: "text", "data-cname": dataCname + "__text_input", "test-id": testId + "__text_input", onKeyDown: onKeyDown })),
            React__namespace.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.SECONDARY, onClick: () => { openSidebar(text); }, className: "test-prep-ai-assistant__text-input-submit", "data-cname": dataCname + "__text_input_submit", "test-id": testId + "__text_input_submit" },
                React__namespace.createElement("div", { className: "test-prep-ai-assistant__text-input-submit-label" },
                    React__namespace.createElement("span", { className: "test-prep-ai-assistant__text-input-submit-sparkle" }),
                    React__namespace.createElement("span", null, "Submit")))));
    };

    const TestPrepAiSalesAssistantFloatingChatDriver = ({ chatStarters, scrollTriggerElementId, testName, showMobileAiSalesBanner, userHasInteractedOnce, openSidebar, }) => {
        const [userHasScrolledPastAIModuleOnce, setUserHasScrolledPastAIModuleOnce] = React.useState(false);
        React.useEffect(() => {
            if (userHasScrolledPastAIModuleOnce) {
                return;
            }
            const handleScroll = () => {
                const banner = document.getElementById(scrollTriggerElementId);
                if (!banner) {
                    return;
                }
                const rect = banner.getBoundingClientRect();
                if (rect.bottom < 0) {
                    setUserHasScrolledPastAIModuleOnce(true);
                    window.removeEventListener("scroll", handleScroll);
                }
            };
            window.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll();
            return () => window.removeEventListener("scroll", handleScroll);
        }, [scrollTriggerElementId]);
        const isMobile = eurekaDesignSystem.LayoutHooks.useOnMobile();
        if (!userHasScrolledPastAIModuleOnce) {
            return null;
        }
        let classNames = ["test-prep-ai-assistant__floating-chat-driver"];
        if (!showMobileAiSalesBanner) {
            classNames.push("mobile-banner-hidden");
        }
        if (userHasInteractedOnce) {
            return (React.createElement("button", { className: "test-prep-ai-assistant__floating-chat-driver-sparkle-btn", "aria-label": "Open Study AI chat", onClick: () => openSidebar(), type: "button" }));
        }
        return (React.createElement("div", { className: classNames.join(" "), onClick: isMobile ? () => openSidebar() : undefined, "data-cname": "test_prep_ai_assistant_floating_chat_driver" },
            React.createElement("div", { className: "test-prep-ai-assistant__floating-chat-driver-title" },
                React.createElement("span", { className: "test-prep-ai-assistant__floating-chat-driver-sparkle" }),
                "Study AI"),
            React.createElement("div", { className: "test-prep-ai-assistant__floating-chat-driver-subtitle" },
                "Hello! \uD83D\uDC4B Want help finding the perfect ",
                testName,
                " study solution?"),
            React.createElement("div", { className: "test-prep-ai-assistant__floating-chat-driver-list" }, chatStarters.map((starter, idx) => (React.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.PILL, key: idx, className: "test-prep-ai-assistant__floating-chat-driver-starter-button", onClick: () => {
                    openSidebar(starter.llmMessage);
                }, "data-cname": "test_prep_ai_assistant_floating_chat_driver_starter_button" },
                React.createElement("span", null, starter.floatingDriverTitle)))))));
    };

    var __rest$1 = (window && window.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    const ChatStarterSets = {
        PRAXIS: [
            {
                title: "Learn how to study for the Praxis exam",
                llmMessage: "Tell me how to study for the Praxis exam",
                floatingDriverTitle: "Learn how to study for Praxis"
            },
            {
                title: "Get help studying for your specific Praxis exam",
                llmMessage: "Help me study for my specific Praxis exam",
                floatingDriverTitle: "Get help with your specific exam"
            },
            {
                title: "Find out what learners like about their study resources",
                llmMessage: "What do learners like about their Praxis study resources?",
                floatingDriverTitle: "Find out what other learners like"
            },
            {
                title: "Compare Praxis test prep resources",
                llmMessage: "Tell me about the differences between Study.com and other Praxis test prep resources.",
                floatingDriverTitle: "Compare test prep resources"
            },
        ],
    };
    const TestPrepAiSalesAssistantBanner = (_a) => {
        var { testName, chatStarterSetKey = "", "data-cname": dataCname, "test-id": testId = dataCname, showMobileAiSalesBanner } = _a, otherProps = __rest$1(_a, ["testName", "chatStarterSetKey", "data-cname", "test-id", "showMobileAiSalesBanner"]);
        const [userHasInteractedOnce, setUserHasInteractedOnce] = React.useState(false);
        const openSidebarAndMarkInteraction = (message) => {
            openSidebarWithMessage(message);
            setUserHasInteractedOnce(true);
        };
        if (testName == null) {
            console.error("TestPrepAiSalesAssistant: test-name prop is required");
            return null;
        }
        if (dataCname == null) {
            console.error("TestPrepAiSalesAssistant: data-cname prop is required");
            return null;
        }
        let chatStarters = ChatStarterSets[chatStarterSetKey] || [];
        let bannerId = "test-prep-ai-assistant-banner";
        return (React.createElement(React.Fragment, null,
            React.createElement("div", Object.assign({ id: bannerId, className: "section-content__body test-prep-ai-assistant__body" }, otherProps),
                React.createElement("h2", null,
                    "How do I prepare for the ",
                    testName,
                    " exam?"),
                React.createElement("div", null, "The best way to prepare for the Praxis is by studying in the weeks leading up to test day. Many students choose to use a test prep program like Study.com to ensure they get the highest score possible."),
                React.createElement("h3", null, "Get personalized help preparing for the exam"),
                React.createElement("div", null, "Start a chat with Study AI to get advice, find resources, and learn more about the Praxis exam."),
                React.createElement(TestPrepAiSalesAssistantBannerChatStarterActions, { chatStarters: chatStarters, "data-cname": dataCname + "__chat_starters", "test-id": testId + "__chat_starters", openSidebar: openSidebarAndMarkInteraction }),
                React.createElement(TestPrepAiSalesAssistantBannerTextInputAction, { "data-cname": dataCname + "__input-container", "test-id": testId + "__input-container", testName: testName, openSidebar: openSidebarAndMarkInteraction })),
            React.createElement(TestPrepAiSalesAssistantFloatingChatDriver, { showMobileAiSalesBanner: showMobileAiSalesBanner, scrollTriggerElementId: bannerId, chatStarters: chatStarters, userHasInteractedOnce: userHasInteractedOnce, openSidebar: openSidebarAndMarkInteraction, testName: testName })));
    };

    var __rest = (window && window.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    const TestPrepCourseCard = (props) => {
        const course = props.course;
        if (!course || !course.imageUriSmall || !course.title || !course.uri) {
            console.warn("Course prop passed in to test prep course card module is empty or missing required fields");
            return null;
        }
        return (React__namespace.createElement("div", { className: "ssr-course-card", "test-id": "test-prep-course-card" },
            React__namespace.createElement("div", { className: "ssr-course-card__image" },
                React__namespace.createElement(ImgWithFallback, { fallbackSrc: "/cimages/videopreview/homeCoursePreview.jpg", loading: "lazy", src: course.imageUriSmall, alt: course.title })),
            React__namespace.createElement("div", { className: "ssr-course-card__details" },
                React__namespace.createElement("a", { className: "ssr-course-card__title", href: course.uri, title: course.title, "test-extra": course.title, "data-cname": "test-prep-course-card--link", "test-id": "test-prep-course-card--link", dangerouslySetInnerHTML: { __html: course.title } }),
                course.lessonCount && (React__namespace.createElement("div", { className: "ssr-course-card__lesson-count" },
                    course.lessonCount,
                    " Lessons")))));
    };
    const ImgWithFallback = (props) => {
        const { fallbackSrc, src } = props, imgProps = __rest(props, ["fallbackSrc", "src"]);
        const [hasSeenError, setHasSeenError] = React.useState(false);
        const finalSrc = hasSeenError ? fallbackSrc : src;
        return React__namespace.createElement("img", Object.assign({ src: finalSrc }, imgProps, { onError: () => setHasSeenError(true) }));
    };

    const TestPrepFreeAccountCtaModal = mobxReact.observer(props => {
        const [isModalOpen, setIsModalOpen] = React.useState(true);
        function createModalBulletItem(label, text) {
            return (React__namespace.createElement("div", null,
                React__namespace.createElement("div", { className: "tp-free-account-cta-modal__bullet-item-label-row" },
                    React__namespace.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-check-circle-filled-20.svg", className: "tp-free-account-cta-modal__bullet-item-icon" }),
                    React__namespace.createElement("span", { className: "tp-free-account-cta-modal__bullet-item-label" }, label)),
                React__namespace.createElement("div", { className: "tp-free-account-cta-modal__bullet-item-text" }, text)));
        }
        const takePracticeTestCtaButton = React__namespace.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.PRIMARY, "data-cname": "tp_free_account_cta_modal__cta-btn", fillWidth: true, href: "/test-prep/join.html", tag: "a", "test-id": "tp-free-account-cta-modal__cta-btn" }, "Take a free practice test");
        const riskFreeText = React__namespace.createElement("div", { className: "tp-free-account-cta-modal__risk-free-text" }, "A free Study.com account will be created for you. No credit card required.");
        return React__namespace.createElement(eurekaDesignSystem.Modal, { className: "tp-free-account-cta-modal", "data-cname": "tp_free_account_cta_modal", isOpen: isModalOpen, onClose: () => setIsModalOpen(false), "test-id": "test-prep-free-account-cta-modal", variant: eurekaDesignSystem.Modal.Variant.BASIC },
            React__namespace.createElement(eurekaDesignSystem.Modal.Header, null, "Special offer: take a free practice test"),
            React__namespace.createElement(eurekaDesignSystem.Modal.Content, null,
                React__namespace.createElement("div", { className: "tp-free-account-cta-modal__content" },
                    React__namespace.createElement("div", { className: "tp-free-account-cta-modal__title" }, "Get your personalized study plan. No credit card required."),
                    React__namespace.createElement("div", { className: "tp-free-account-cta-modal__bullets-and-image" },
                        React__namespace.createElement("div", { className: "tp-free-account-cta-modal__bullets-container" },
                            createModalBulletItem("Instant practice test results", "Quickly find out where you're strong and where to focus"),
                            createModalBulletItem("Your personalized study plan", "A focused path built around your knowledge."),
                            createModalBulletItem("Targeted videos and practice questions", "Dive into content that matches your test goals.")),
                        React__namespace.createElement("div", { className: "tp-free-account-cta-modal__image-container" },
                            React__namespace.createElement("img", { src: "/images/test-prep/free-account-cta/laptop.png", alt: "laptop" }))),
                    React__namespace.createElement("div", { className: "tp-free-account-cta-modal__desktop-risk-free-and-cta" },
                        takePracticeTestCtaButton,
                        riskFreeText))),
            eurekaDesignSystem.LayoutHooks.useOnMobile() &&
                React__namespace.createElement(eurekaDesignSystem.Modal.Footer, null,
                    React__namespace.createElement("div", { className: "tp-free-account-cta-modal__footer" },
                        riskFreeText,
                        React__namespace.createElement("div", { className: "tp-free-account-cta-modal__footer-buttons" },
                            React__namespace.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.TERTIARY, "data-cname": "tp_free_account_cta_modal__no_thanks_btn", onClick: () => setIsModalOpen(false), "test-id": "tp-free-account-cta-modal__no-thanks-btn" }, "No, thanks"),
                            takePracticeTestCtaButton))));
    });

    const TestPrepPopularCourses = (props) => {
        var _a;
        let [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
        const { tabTitles, tabContent, coursesUri } = props;
        if (!(tabTitles === null || tabTitles === void 0 ? void 0 : tabTitles.length) || !(tabContent === null || tabContent === void 0 ? void 0 : tabContent.length) || tabTitles.length !== tabContent.length) {
            console.warn("Tab titles or content passed in for popular courses module empty or not aligned");
            return null;
        }
        let items = tabTitles.map((tabTitle, i) => {
            return ({
                label: tabTitle,
                identifier: `courseListTab-${i}`
            });
        });
        if (coursesUri) {
            items.push({
                label: "View All",
                href: coursesUri
            });
        }
        let switchTabContent = React.useCallback((currentTabItem) => {
            if (currentTabItem.label !== "View All") {
                setSelectedTabIndex(tabTitles.indexOf(currentTabItem.label));
            }
        }, [selectedTabIndex]);
        return (React__namespace.createElement("div", { className: "ssr-popular-courses", "test-id": "test-prep-popular-courses-module" },
            React__namespace.createElement("div", { className: "ssr-popular-courses__tabs" },
                React__namespace.createElement(eurekaDesignSystem.Tabs, { "data-cname": "test-prep-popular-courses-module--tabs", items: items, defaultSelectedItem: items[0], onChange: switchTabContent })),
            React__namespace.createElement("div", { className: "ssr-popular-courses__content" }, (_a = tabContent[selectedTabIndex]) === null || _a === void 0 ? void 0 : _a.map(course => React__namespace.createElement("div", { key: course.uri },
                React__namespace.createElement(TestPrepCourseCard, { course: course }))))));
    };

    const TestPrepPracticeTestCard = (props) => {
        const course = props.course;
        const subtext = props.subtext;
        if (!course || !course.title || !course.uri) {
            console.warn("Course prop passed in to test prep practice test card module is empty or missing required fields");
            return null;
        }
        let courseTitle = course.title;
        const colonIndex = courseTitle.indexOf(":");
        if (colonIndex > -1) {
            courseTitle = courseTitle.substring(0, colonIndex).trim();
        }
        const examUri = course.uri.replace("academy/", "academy/exam/");
        return (React__namespace.createElement("div", { className: "ssr-test-prep-practice-test-card" },
            React__namespace.createElement("div", { className: "ssr-test-prep-practice-test-card__icon" },
                React__namespace.createElement("img", { src: "/images/academy/course/byType/icons/icon_asset_quiz.svg" })),
            React__namespace.createElement("div", { className: "ssr-test-prep-practice-test-card__details" },
                React__namespace.createElement("div", null,
                    React__namespace.createElement("a", { className: "ssr-test-prep-practice-test-card__details__text", "data-cname": "test_prep_practice_test_title", "test-id": "test_prep_practice_test_title", href: examUri, dangerouslySetInnerHTML: { __html: courseTitle + " Practice Test" } }),
                    React__namespace.createElement("div", { className: "ssr-test-prep-practice-test-card__details__small-text" }, subtext))),
            React__namespace.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.SECONDARY, href: examUri, tag: "a", className: "ssr-test-prep-practice-test-card__details__btn", "data-cname": "test_prep_practice_test_button", "test-id": "test_prep_practice_test_button" }, "Take Practice Test")));
    };

    const TestPrepPracticeTests = (props) => {
        var _a;
        let [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
        const { tabTitles, tabContent, practiceTestsUri } = props;
        if (!(tabTitles === null || tabTitles === void 0 ? void 0 : tabTitles.length) || !(tabContent === null || tabContent === void 0 ? void 0 : tabContent.length) || tabTitles.length !== tabContent.length) {
            console.warn("Tab titles or content passed in for popular courses module empty or not aligned");
            return null;
        }
        let items = tabTitles.map((tabTitle, i) => {
            return ({
                label: tabTitle,
                identifier: `courseListTab-${i}`
            });
        });
        if (practiceTestsUri) {
            items.push({
                label: "View All",
                href: practiceTestsUri
            });
        }
        let switchTabContent = React.useCallback((currentTabItem) => {
            if (currentTabItem.label !== "View All") {
                setSelectedTabIndex(tabTitles.indexOf(currentTabItem.label));
            }
        }, [selectedTabIndex]);
        return (React__namespace.createElement("div", { className: "ssr-test-prep-practice-tests", "test-id": "test-prep-practice-tests-module" },
            React__namespace.createElement("div", { className: "ssr-test-prep-practice-tests__tabs" },
                React__namespace.createElement(eurekaDesignSystem.Tabs, { "data-cname": "test-prep-practice-tests-module--tabs", items: items, defaultSelectedItem: items[0], onChange: switchTabContent })),
            React__namespace.createElement("div", { className: "ssr-test-prep-practice-tests__content" }, (_a = tabContent[selectedTabIndex]) === null || _a === void 0 ? void 0 : _a.map(course => { var _a; return React__namespace.createElement(TestPrepPracticeTestCard, { key: course.uri, course: course, subtext: (_a = items[selectedTabIndex]) === null || _a === void 0 ? void 0 : _a.label }); }))));
    };

    var LandingTestimonialColor;
    (function (LandingTestimonialColor) {
        LandingTestimonialColor["TEAL"] = "teal";
        LandingTestimonialColor["SKY"] = "sky";
        LandingTestimonialColor["RED"] = "red";
        LandingTestimonialColor["ORANGE"] = "orange";
    })(LandingTestimonialColor || (LandingTestimonialColor = {}));
    const DEFAULT_TESTIMONIALS = [
        {
            author: "Efren H.",
            body: "If you follow the guided practice, you will pass your exam. I used the study guide for 20 days and the information aligned with my exam. I passed first time!",
            color: LandingTestimonialColor.TEAL,
            iconPath: "icon-practice-test-24.svg",
            imagePath: "/images/teacher/teacher-in-classroom.png",
            imageAlt: "teacher in classroom",
            subject: "Guided practice"
        },
        {
            author: "Tonia F.",
            body: "I passed my test by watching 5-minute videos and answering questions. I was done for the day and nothing had to be scheduled.",
            color: LandingTestimonialColor.RED,
            iconPath: "icon-lesson-video-24.svg",
            imagePath: "/images/test-prep/test-prep-rebrand-2025/smiling-person-with-glasses.png",
            imageAlt: "person with glasses",
            subject: "On-demand video"
        },
        {
            author: "Kevin R.",
            body: "Study.com taught me so much in such a fast and condensed format. The quizzes helped me retain all the important information.",
            color: LandingTestimonialColor.SKY,
            iconPath: "icon-document-24.svg",
            imagePath: "/images/test-prep/test-prep-rebrand-2025/happy-doctor-with-patient.png",
            imageAlt: "doctor with patient",
            subject: "A library of lessons"
        },
        {
            author: "David S.",
            body: "Easy-to-follow videos, lessons, and flashcards to master the content. Awesome!",
            color: LandingTestimonialColor.ORANGE,
            iconPath: "icon-flashcards-24.svg",
            imagePath: "/images/test-prep/test-prep-rebrand-2025/student-learning-on-laptop.png",
            imageAlt: "student learning",
            subject: "Flashcards to help you"
        }
    ];
    const TESTIMONIAL_TABS = DEFAULT_TESTIMONIALS.map((testimonial) => ({
        label: testimonial.subject,
        identifier: testimonial.subject,
        "data-cname": "tp_landing_testimonials__tab_item",
        "data-extra": testimonial.subject,
        "test-id": "tp_landing_testimonials__tab_item"
    }));
    const TestPrepLandingTestimonialsTabs = () => {
        const [activeTab, setActiveTab] = React.useState(TESTIMONIAL_TABS[0]);
        React.useEffect(() => {
            const interval = setInterval(() => {
                setActiveTab(currentTab => {
                    const currentIndex = TESTIMONIAL_TABS.findIndex(tab => tab.label === currentTab.label);
                    const nextIndex = (currentIndex + 1) % TESTIMONIAL_TABS.length;
                    return TESTIMONIAL_TABS[nextIndex];
                });
            }, 10000);
            return () => clearInterval(interval);
        }, [activeTab]);
        return (React__namespace.createElement("div", { className: "tp-landing-testimonials--tabs-container", "test-id": "tp-landing-testimonials--tabs-variant" },
            React__namespace.createElement("div", { className: "tp-landing-testimonials__header" }, "Everything you need to pass your exam. Personalized for you."),
            React__namespace.createElement(eurekaDesignSystem.Tabs, { items: TESTIMONIAL_TABS, "data-cname": "tp_landing_testimonials__tabs", defaultSelectedItem: activeTab, isCentered: true, key: activeTab.label, onChange: (curr) => {
                    if (curr.label !== activeTab.label) {
                        setActiveTab(curr);
                    }
                } }),
            DEFAULT_TESTIMONIALS.map((testimonial) => {
                if (activeTab.label !== testimonial.subject) {
                    return null;
                }
                return React__namespace.createElement(TestimonialCard, { testimonial: testimonial, key: testimonial.author });
            })));
    };
    const TestPrepLandingTestimonialsText = () => {
        return (React__namespace.createElement("div", { className: "tp-landing-testimonials--text-container", "test-id": "tp-landing-testimonials--text-variant" },
            React__namespace.createElement("div", { className: "tp-landing-testimonials__header" }, "Everything you need to pass your exam. Personalized for you."),
            React__namespace.createElement(eurekaDesignSystem.Carousel, { "data-cname": "tp_landing_testimonials__text", itemsLayout: eurekaDesignSystem.Carousel.ItemsLayout.MAX_FOUR }, DEFAULT_TESTIMONIALS.map((testimonial, i) => {
                const headerClasses = ["tp-landing-testimonials__item-header"];
                if (testimonial.color) {
                    headerClasses.push(`tp-landing-testimonials__item-header--${testimonial.color}`);
                }
                return (React__namespace.createElement("div", { className: "tp-landing-testimonials__item", key: testimonial.author },
                    React__namespace.createElement("div", { className: headerClasses.join(" ") },
                        React__namespace.createElement("div", { className: "tp-landing-testimonials__item-icon-background" },
                            React__namespace.createElement(eurekaDesignSystem.MaterialIcon, { filename: testimonial.iconPath, className: "tp-landing-testimonials__item-icon" })),
                        React__namespace.createElement("div", { className: "tp-landing-testimonials__item-subject" }, testimonial.subject)),
                    React__namespace.createElement("div", { className: "tp-landing-testimonials__item-body" }, testimonial.body),
                    React__namespace.createElement("div", { className: "tp-landing-testimonials__item-author" }, testimonial.author)));
            }))));
    };
    const TestPrepLandingTestimonialsCarousel = () => {
        return (React__namespace.createElement("div", { className: "tp-landing-testimonials--carousel-container", "test-id": "tp-landing-testimonials--carousel-variant" },
            React__namespace.createElement("div", { className: "tp-landing-testimonials__header" }, "Everything you need to pass your exam. Personalized for you."),
            React__namespace.createElement(eurekaDesignSystem.Carousel, { "data-cname": "tp_landing_testimonials__carousel", itemsLayout: eurekaDesignSystem.Carousel.ItemsLayout.MAX_FOUR }, DEFAULT_TESTIMONIALS.map((testimonial) => React__namespace.createElement(TestimonialCard, { testimonial: testimonial, key: testimonial.author })))));
    };
    const TestimonialCard = ({ testimonial }) => {
        const subjectClasses = ["tp-landing-testimonials__item-subject"];
        if (testimonial.color) {
            subjectClasses.push(`tp-landing-testimonials__item-subject--${testimonial.color}`);
        }
        return (React__namespace.createElement("div", { className: "tp-landing-testimonials__item" },
            React__namespace.createElement("img", { src: testimonial.imagePath, className: "tp-landing-testimonials__item-image", alt: testimonial.imageAlt }),
            React__namespace.createElement("div", { className: "tp-landing-testimonials__item-details" },
                React__namespace.createElement("div", { className: subjectClasses.join(" ") }, testimonial.subject),
                React__namespace.createElement("div", { className: "tp-landing-testimonials__item-body" }, testimonial.body),
                React__namespace.createElement("div", { className: "tp-landing-testimonials__item-author" }, testimonial.author))));
    };

    exports.TestPrepAiSalesAssistantBanner = TestPrepAiSalesAssistantBanner;
    exports.TestPrepCourseCard = TestPrepCourseCard;
    exports.TestPrepFreeAccountCtaModal = TestPrepFreeAccountCtaModal;
    exports.TestPrepLandingTestimonialsCarousel = TestPrepLandingTestimonialsCarousel;
    exports.TestPrepLandingTestimonialsTabs = TestPrepLandingTestimonialsTabs;
    exports.TestPrepLandingTestimonialsText = TestPrepLandingTestimonialsText;
    exports.TestPrepPopularCourses = TestPrepPopularCourses;
    exports.TestPrepPracticeTestCard = TestPrepPracticeTestCard;
    exports.TestPrepPracticeTests = TestPrepPracticeTests;

}));
//# sourceMappingURL=ssr-test-prep.js.map

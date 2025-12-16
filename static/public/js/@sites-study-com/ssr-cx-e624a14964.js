define(['require', 'exports', '@sites-study-com/marketing', '@sites-study-com/remspect', '@study-com/eureka-design-system', 'react', 'mobx-react', '@sites-study-com/marketing-constants'], (function (require, exports, marketing, remspect, eurekaDesignSystem, React, mobxReact, Marketing) { 'use strict';

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

    var remspect__namespace = /*#__PURE__*/_interopNamespaceDefault(remspect);
    var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);
    var Marketing__namespace = /*#__PURE__*/_interopNamespaceDefault(Marketing);

    var ImageStyle;
    (function (ImageStyle) {
        ImageStyle["IMAGE"] = "IMAGE";
        ImageStyle["LOGO"] = "LOGO";
    })(ImageStyle || (ImageStyle = {}));
    const CXHero = (props) => {
        var _a, _b;
        const regModalDataAttributes = (_a = props.regModalDataAttributes) !== null && _a !== void 0 ? _a : {};
        if (!props.ctaUrl) {
            regModalDataAttributes["data-remote"] = "false";
            regModalDataAttributes["data-toggle"] = "modal";
            regModalDataAttributes["data-target"] = "#partialRegFormModal";
        }
        const ctaText = (_b = props.ctaText) !== null && _b !== void 0 ? _b : "Start saving on credits";
        const eurekaBreadcrumbs = toStandardBreadcrumbs(props.breadcrumbs, props.cnamePrefix);
        let riskFreeText = '';
        if (props.showRiskFreeText && !props.loggedIn) {
            riskFreeText = React__namespace.createElement("div", { className: "hero__risk-free-text" },
                React__namespace.createElement(marketing.RiskFreeLanguage, { showXDayLanguage: true }));
        }
        const inCtaLanguageTest = !remspect__namespace.isControl("ctaLanguage");
        return (React__namespace.createElement("div", { className: "hero", "test-id": props.cnamePrefix + "_hero" },
            React__namespace.createElement("div", { className: "hero__content" },
                (eurekaBreadcrumbs === null || eurekaBreadcrumbs === void 0 ? void 0 : eurekaBreadcrumbs.length) > 0 &&
                    React__namespace.createElement("div", { className: "hero__breadcrumbs" },
                        React__namespace.createElement(eurekaDesignSystem.Breadcrumb, { crumbs: eurekaBreadcrumbs, invertColor: true, "test-id": props.cnamePrefix + "_hero__breadcrumbs" })),
                React__namespace.createElement("div", { className: "hero__title" },
                    React__namespace.createElement("h1", { dangerouslySetInnerHTML: { __html: props.title } })),
                !!props.body &&
                    React__namespace.createElement("div", { className: "hero__text", dangerouslySetInnerHTML: { __html: props.body } }),
                React__namespace.createElement("div", { className: "hero__btn-container" },
                    (!props.hideCta && !props.loggedIn && !!props.ctaUrl) &&
                        React__namespace.createElement("div", { className: "hero__btn" },
                            React__namespace.createElement(eurekaDesignSystem.Button, { marketingSize: true, variant: eurekaDesignSystem.Button.Variant.PRIMARY, wrap: inCtaLanguageTest ? eurekaDesignSystem.Button.Wrap.WRAP : eurekaDesignSystem.Button.Wrap.NO_WRAP, tag: "a", "data-track-visible": true, className: "hero__btn-cta", href: props.ctaUrl, "data-cname": props.cnamePrefix + "_hero__cta", "test-id": props.cnamePrefix + "_hero__cta", "data-extra": `cta_language=${ctaText}` }, ctaText)),
                    (!props.hideCta && !props.loggedIn && !props.ctaUrl) &&
                        React__namespace.createElement("div", { className: "hero__btn" },
                            React__namespace.createElement(eurekaDesignSystem.Button, Object.assign({ className: "hero__btn-cta", marketingSize: true, variant: eurekaDesignSystem.Button.Variant.PRIMARY, wrap: inCtaLanguageTest ? eurekaDesignSystem.Button.Wrap.WRAP : eurekaDesignSystem.Button.Wrap.NO_WRAP, "test-id": props.cnamePrefix + "_hero__cta", "data-track-visible": true, "data-cname": props.cnamePrefix + "_hero__cta", "data-toggle": "modal", "data-target": "#partialRegFormModal", "data-remote": "false", "data-extra": `cta_language=${ctaText}` }, regModalDataAttributes), ctaText)),
                    riskFreeText)),
            !!props.image && props.imageStyle !== ImageStyle.LOGO &&
                React__namespace.createElement("div", { className: props.imageVerticalAlignment ? `hero__image hero__image--${props.imageVerticalAlignment}` : "hero__image" },
                    React__namespace.createElement("img", { src: (eurekaDesignSystem.LayoutHooks.useOnTablet() && !!props.imageTablet) ? props.imageTablet : props.image, alt: props.imageAlt })),
            !!props.image && props.imageStyle === ImageStyle.LOGO &&
                React__namespace.createElement("div", { className: !!props.specialOfferHeader ? "hero-logo-image-content-section hero-logo-image-content-section--with-special-offer" : "hero-logo-image-content-section" },
                    React__namespace.createElement("div", { className: "hero-logo-image-content-section__logo-and-text" },
                        React__namespace.createElement("div", { className: `hero-logo-image-content-section__logo-and-text--logos
					 ${!props.imageLogoText && !props.imageLogoTextEmphasizedPrefix ? ' hero-logo-image-content-section__logo-and-text--logos-no-text' : ''}` },
                            React__namespace.createElement("img", { className: "hero-logo-image-content-section__logo-and-text--logo", src: props.image, alt: props.imageAlt })),
                        (!!props.imageLogoText || !!props.imageLogoTextEmphasizedPrefix) &&
                            React__namespace.createElement("div", { className: "hero-logo-image-content-section__logo-and-text--text" },
                                props.imageLogoTextEmphasizedPrefix &&
                                    React__namespace.createElement("span", { className: "hero-logo-image-content-section__logo-and-text--emphasized-prefix" }, props.imageLogoTextEmphasizedPrefix),
                                props.imageLogoText),
                        (!!props.specialOfferHeader || !!props.specialOfferText) &&
                            React__namespace.createElement("div", { className: "hero-logo-image-content-section__special-offer" },
                                React__namespace.createElement("div", { className: "hero-logo-image-content-section__special-offer-icon" },
                                    React__namespace.createElement("img", { src: "/images/icons/material/icon-discount-no-fill-24.svg", alt: "cx special offer discount tag" })),
                                !!props.specialOfferHeader &&
                                    React__namespace.createElement("div", { className: "hero-logo-image-content-section__special-offer-header" }, props.specialOfferHeader),
                                !!props.specialOfferText &&
                                    React__namespace.createElement("div", { className: "hero-logo-image-content-section__special-offer-language" },
                                        React__namespace.createElement("span", { dangerouslySetInnerHTML: { __html: props.specialOfferText } }))))),
            React__namespace.createElement("div", { className: "hero__btn-container--mobile" },
                (!props.hideCta && !props.loggedIn) &&
                    React__namespace.createElement("div", { className: "hero__btn hero__btn--mobile" },
                        React__namespace.createElement(eurekaDesignSystem.Button, Object.assign({ className: "hero__btn-cta", "data-cname": props.cnamePrefix + "_hero__cta_mobile", href: props.ctaUrl, marketingSize: true, tag: !!props.ctaUrl ? "a" : "button", "test-id": props.cnamePrefix + "_hero__cta", variant: eurekaDesignSystem.Button.Variant.PRIMARY, wrap: inCtaLanguageTest ? eurekaDesignSystem.Button.Wrap.WRAP : eurekaDesignSystem.Button.Wrap.NO_WRAP, "data-extra": `cta_language=${ctaText}` }, regModalDataAttributes), ctaText)),
                riskFreeText),
            props.belowCtaContentMobile && React__namespace.createElement("div", { className: "hero__below-cta-content", dangerouslySetInnerHTML: { __html: props.belowCtaContentMobile } }),
            props.showImageOnMobile &&
                React__namespace.createElement("div", { className: "hero__image-mobile" + ((props.imageVerticalAlignment === "bottom") ? " hero__image-mobile--bottom" : "") },
                    React__namespace.createElement("img", { src: props.image }))));
    };
    function isBreadCrumbImpl(crumbs) {
        const firstCrumb = crumbs === null || crumbs === void 0 ? void 0 : crumbs[0];
        return typeof firstCrumb.mBreadCrumbDisplayURL == "string"
            || typeof firstCrumb.mBreadCrumbName == "string";
    }
    function isAcademyBreadcrumb(crumbs) {
        const firstCrumb = crumbs === null || crumbs === void 0 ? void 0 : crumbs[0];
        return typeof firstCrumb.name == "string"
            && typeof firstCrumb.displayUrl == "string"
            && typeof firstCrumb.type == "string";
    }
    function isBreadcrumbPair(crumbs) {
        const firstCrumb = crumbs === null || crumbs === void 0 ? void 0 : crumbs[0];
        const typeofRight = typeof firstCrumb.right;
        return typeof firstCrumb.left == "string"
            && (typeofRight == "string" || typeofRight == "undefined");
    }
    function isStudyBreadcrumb(crumbs) {
        const firstCrumb = crumbs === null || crumbs === void 0 ? void 0 : crumbs[0];
        return typeof firstCrumb.crumbName == "string"
            && (typeof firstCrumb.crumbUrl == "string" || typeof firstCrumb.crumbUrl == "undefined")
            && typeof firstCrumb.isDisabled == "boolean";
    }
    const toStandardBreadcrumbs = (crumbs, cnamePrefix) => {
        if (crumbs == null || crumbs.length == 0) {
            return null;
        }
        if (isBreadCrumbImpl(crumbs)) {
            return crumbs.map(crumb => {
                const url = toStandardUrlOrNull(crumb.mBreadCrumbDisplayURL);
                return {
                    label: crumb.mBreadCrumbName,
                    url: url,
                    disabled: (url == null),
                    "data-cname": `${cnamePrefix}_breadcrumb`,
                    "data-extra": crumb.mBreadCrumbName,
                    "test-id": `${cnamePrefix}_breadcrumb`
                };
            });
        }
        if (isAcademyBreadcrumb(crumbs)) {
            const eurekaBreadcrumbs = [];
            crumbs.forEach(academyCrumb => {
                const url = toStandardUrlOrNull(academyCrumb.displayUrl);
                switch (academyCrumb.type) {
                    case "COURSE":
                        eurekaBreadcrumbs.unshift({
                            label: academyCrumb.name,
                            url: url,
                            disabled: (url == null),
                            "data-cname": "back_to_course",
                            "test-id": "back_to_course"
                        });
                        break;
                    case "TOPIC":
                        break;
                    default:
                        eurekaBreadcrumbs.unshift({
                            label: `${academyCrumb.name} Courses`,
                            url: url,
                            disabled: (url == null),
                            "data-cname": "top_back_to_subject",
                            "test-id": "top_back_to_subject"
                        });
                        break;
                }
            });
            return eurekaBreadcrumbs;
        }
        if (isBreadcrumbPair(crumbs)) {
            return crumbs.map(crumbPair => {
                const url = toStandardUrlOrNull(crumbPair["right"]);
                const name = crumbPair["left"];
                return {
                    label: name,
                    url: url,
                    disabled: (url == null),
                    "data-cname": "breadcrumb",
                    "test-id": "breadcrumb",
                    "data-extra": name,
                };
            });
        }
        if (isStudyBreadcrumb(crumbs)) {
            return crumbs.map(studyCrumb => {
                var _a;
                const url = toStandardUrlOrNull(studyCrumb.crumbUrl);
                return {
                    label: studyCrumb.crumbName,
                    url: url,
                    disabled: (_a = studyCrumb.isDisabled) !== null && _a !== void 0 ? _a : (url == null),
                    "data-cname": "breadcrumb",
                    "test-id": "breadcrumb",
                    "data-extra": studyCrumb.crumbName,
                };
            });
        }
        console.warn("Unknown breadcrumb type for CXHero. Not showing breadcrumb");
        return [];
    };
    function toStandardUrlOrNull(url) {
        if (url == null || url.trim() == "") {
            return null;
        }
        if (url.startsWith("/") || url.startsWith("http")) {
            return url;
        }
        return "/" + url;
    }

    const CXHubHero = ({ title, subtitle, subtitleHtml, ctaUrl, ctaText = "Try it risk-free", cnamePrefix, imageUrl, imageUrlLarge, imageUrlMed, imageUrlSmall, imageAlt, loggedIn, showStars = true, reviewText = "Over 2,000 five-star reviews on Trustpilot", additionalClass, secondaryCtaText, secondaryCtaUrl, fineprintText, imageOnLeft = false }) => {
        eurekaDesignSystem.LayoutHooks.useOnMobile();
        const renderStars = () => {
            const stars = [];
            for (let i = 0; i < 5; i++) {
                stars.push(React__namespace.createElement(eurekaDesignSystem.MaterialIcon, { key: i, filename: "icon-star-20.svg", className: "cx-hub-hero__star" }));
            }
            return stars;
        };
        return (React__namespace.createElement("div", { className: `cx-hub-hero ${additionalClass ? ` ${additionalClass}` : ''}`, "test-id": `${cnamePrefix}_hero` },
            React__namespace.createElement("div", { className: `cx-hub-hero__container ${imageOnLeft ? 'cx-hub-hero__container--image-left' : ''}` },
                React__namespace.createElement("div", { className: "cx-hub-hero__content" },
                    React__namespace.createElement("div", { className: "cx-hub-hero__text-content" },
                        React__namespace.createElement("h1", { className: "cx-hub-hero__title" }, title),
                        React__namespace.createElement("div", { className: "cx-hub-hero__subtitle-section" },
                            subtitleHtml && (React__namespace.createElement("div", { className: "cx-hub-hero__subtitle", dangerouslySetInnerHTML: { __html: subtitleHtml } })),
                            !subtitleHtml && subtitle && (React__namespace.createElement("p", { className: "cx-hub-hero__subtitle" }, subtitle)))),
                    !loggedIn && (React__namespace.createElement("div", { className: "cx-hub-hero__cta-container" },
                        React__namespace.createElement("div", { className: "cx-hub-hero__cta-button-container" },
                            React__namespace.createElement(eurekaDesignSystem.Button, { href: ctaUrl, className: "cx-hub-hero__cta-button", "data-cname": `${cnamePrefix}_hero_cta`, "test-id": `${cnamePrefix}_hero_cta`, marketingSize: true, variant: eurekaDesignSystem.Button.Variant.PRIMARY, "data-user-type": "STUDENT", "data-goal": "EARN_CREDIT", "data-skip-pre-filled-questions": true, "data-track-visible": true, "data-default-product": "COLLEGE_ACCELERATOR", "data-remote": "false", "data-toggle": "modal", "data-target": "#partialRegFormModal" }, ctaText),
                            secondaryCtaText && secondaryCtaUrl &&
                                React__namespace.createElement(eurekaDesignSystem.Button, { href: secondaryCtaUrl, tag: "a", className: "cx-hub-hero__secondary-button", "data-cname": `${cnamePrefix}_secondary_cta`, "test-id": `${cnamePrefix}_secondary_cta`, marketingSize: true, variant: eurekaDesignSystem.Button.Variant.TERTIARY_INVERTED }, secondaryCtaText)),
                        fineprintText &&
                            React__namespace.createElement("div", { className: "cx-hub-hero__button-fineprint" }, fineprintText))),
                    showStars && (React__namespace.createElement("div", { className: "cx-hub-hero__rating" },
                        React__namespace.createElement("div", { className: "cx-hub-hero__stars-container" },
                            React__namespace.createElement("div", { className: "cx-hub-hero__stars" }, renderStars())),
                        React__namespace.createElement("p", { className: "cx-hub-hero__review-text" }, reviewText)))),
                React__namespace.createElement("div", { className: `cx-hub-hero__image-section ${!imageUrl && !imageUrlSmall ? 'cx-hub-hero__image-section--no-mobile' : ''}` },
                    React__namespace.createElement("picture", { className: "cx-hub-hero__picture" },
                        imageUrl && (React__namespace.createElement("source", { srcSet: imageUrl })),
                        imageUrlLarge && (React__namespace.createElement("source", { media: "(min-width: 1280px)", srcSet: imageUrlLarge })),
                        imageUrlMed && (React__namespace.createElement("source", { media: "(min-width: 768px)", srcSet: imageUrlMed })),
                        imageUrlSmall && (React__namespace.createElement("source", { media: "(max-width: 767px)", srcSet: imageUrlSmall })),
                        React__namespace.createElement("img", { alt: imageAlt, className: "cx-hub-hero__image" }))))));
    };

    const CourseDetailsModal = mobxReact.observer(({ course, isOpen, onClose, onAddCourse, isAlreadySelected = false, cxPlannedSchoolCompanyId, cxPlannedSchool, showAddButton = true }) => {
        var _a;
        const [courseDetails, setCourseDetails] = React.useState(null);
        const [isLoading, setIsLoading] = React.useState(false);
        const [error, setError] = React.useState(null);
        React.useEffect(() => {
        }, []);
        React.useEffect(() => {
            new Promise(function (resolve, reject) { require(['lib/axios'], function (m) { resolve(/*#__PURE__*/_interopNamespaceDefault(m)); }, reject); })
                .then(module => module.default.default)
                .then(axios => {
                if (isOpen && (course === null || course === void 0 ? void 0 : course.siteResourceId)) {
                    setIsLoading(true);
                    setError(null);
                    const params = { siteResourceId: course.siteResourceId };
                    if (cxPlannedSchoolCompanyId) {
                        params.cxPlannedSchoolCompanyId = cxPlannedSchoolCompanyId;
                    }
                    axios.get("/cx/course-details.ajax", {
                        params: params
                    }).then((response) => {
                        setCourseDetails(response.data);
                    }).catch((error) => {
                        console.error("Failed to fetch course details:", error);
                        setError("Failed to load course details");
                    }).finally(() => {
                        setIsLoading(false);
                    });
                }
            });
        }, [isOpen, course === null || course === void 0 ? void 0 : course.siteResourceId, cxPlannedSchoolCompanyId]);
        React.useEffect(() => {
            if (!isOpen) {
                const timeoutId = setTimeout(() => {
                    setCourseDetails(null);
                    setError(null);
                }, 300);
                return () => clearTimeout(timeoutId);
            }
            return () => { };
        }, [isOpen]);
        const getRequirements = (details) => {
            const requirements = [];
            if (details.chapterTestCount > 0) {
                requirements.push({
                    title: "Chapter tests",
                    count: `${details.chapterTestCount} required`
                });
            }
            if (details.assignmentCount > 0) {
                requirements.push({
                    title: "Assignments",
                    count: `${details.assignmentCount} required`
                });
            }
            if (details.finalExamCount > 0) {
                requirements.push({
                    title: "Open book final exam",
                    count: `${details.finalExamCount} required`
                });
            }
            return requirements;
        };
        const getChapterSummary = (details) => {
            var _a;
            const chapterCount = ((_a = details.chapters) === null || _a === void 0 ? void 0 : _a.length) || 0;
            const lessonCount = details.lessonCount || 0;
            const duration = details.lessonDurationTotal || "";
            let lessonInfo = "";
            if (lessonCount > 0) {
                lessonInfo = `${lessonCount} lessons`;
                if (duration) {
                    lessonInfo += ` (${duration})`;
                }
            }
            return {
                chapterCount,
                lessonInfo
            };
        };
        return (React__namespace.createElement(eurekaDesignSystem.Modal, { className: "course-modal", fullscreen: false, isOpen: isOpen, onClose: onClose, "data-cname": "course_modal", "data-track-visible": true },
            React__namespace.createElement(eurekaDesignSystem.Modal.Header, { "data-cname": "course_modal_header" }, course.title),
            React__namespace.createElement(eurekaDesignSystem.Modal.Content, { "data-cname": "course_modal_content", "test-id": "course_modal_content" },
                React__namespace.createElement("div", { className: "course-modal__content" },
                    isLoading && (React__namespace.createElement("div", { className: "course-modal__loading" },
                        React__namespace.createElement("p", null, "Loading course details..."))),
                    error && (React__namespace.createElement("div", { className: "course-modal__error" },
                        React__namespace.createElement("p", null,
                            "Error: ",
                            error))),
                    courseDetails && (React__namespace.createElement(React__namespace.Fragment, null,
                        React__namespace.createElement("div", { className: "course-modal__tldr" },
                            cxPlannedSchool && courseDetails.equivalentCourses && (React__namespace.createElement("div", { className: "course-modal__equivalent-courses" },
                                React__namespace.createElement("p", null,
                                    React__namespace.createElement("strong", null,
                                        "Equivalent to ",
                                        cxPlannedSchool,
                                        " courses:"),
                                    " ",
                                    courseDetails.equivalentCourses))),
                            React__namespace.createElement("div", { className: "course-modal__description" }, courseDetails.description && (courseDetails.description.split('\n\n').map((paragraph, index) => (React__namespace.createElement("p", { key: index }, paragraph))))),
                            React__namespace.createElement("div", { className: "course-modal__requirements" }, getRequirements(courseDetails).map((req, index) => (React__namespace.createElement("div", { key: index, className: "course-modal__requirement" },
                                React__namespace.createElement("h3", null, req.title),
                                React__namespace.createElement("p", null, req.count)))))),
                        React__namespace.createElement("div", { className: "course-modal__chapters" },
                            React__namespace.createElement("div", { className: "course-modal__chapters-header" },
                                React__namespace.createElement("h2", null,
                                    getChapterSummary(courseDetails).chapterCount,
                                    " chapters in this course"),
                                React__namespace.createElement("p", null, getChapterSummary(courseDetails).lessonInfo)),
                            React__namespace.createElement("div", { className: "course-modal__chapters-list" }, (_a = courseDetails.chapters) === null || _a === void 0 ? void 0 : _a.map((chapter, index) => (React__namespace.createElement("div", { key: index, className: "course-modal__chapter" },
                                React__namespace.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-chapter-20.svg" }),
                                React__namespace.createElement("span", null,
                                    "Ch ",
                                    index + 1,
                                    ". ",
                                    chapter.title)))))))))),
            React__namespace.createElement(eurekaDesignSystem.Modal.Footer, null,
                React__namespace.createElement(eurekaDesignSystem.Button, { type: "button", variant: eurekaDesignSystem.Button.Variant.LINK, onClick: onClose, "data-cname": "course_modal_close_button" }, "Close"),
                showAddButton && onAddCourse && (React__namespace.createElement(eurekaDesignSystem.Button, { type: "button", variant: eurekaDesignSystem.Button.Variant.SECONDARY, disabled: isAlreadySelected, onClick: () => {
                        onAddCourse(course);
                        onClose();
                    }, "data-cname": "course_modal_add_course_button" }, isAlreadySelected ? 'Already Added' : 'Add Course')))));
    });

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
    const CXUpgradeCourseCardComponent = (_a) => {
        var { course, imageUrl, title, isLocked, isEnrolled = false, isAtEnrollmentLimit = false, courseUrl, onClickTitle, onEnrollClick, dataExtra } = _a, restWithTrackingProps = __rest$4(_a, ["course", "imageUrl", "title", "isLocked", "isEnrolled", "isAtEnrollmentLimit", "courseUrl", "onClickTitle", "onEnrollClick", "dataExtra"]);
        const isMobile = eurekaDesignSystem.LayoutHooks.useOnMobile();
        const classNames = [
            "e2-cx-upgrade-course-card",
            "e2-content-card",
            "e2-content-card--horizontal-button-on-right-layout"
        ];
        if (isLocked) {
            classNames.push("e2-cx-upgrade-course-card--locked");
        }
        const rest = eurekaDesignSystem.omitTrackingProps(restWithTrackingProps);
        const testId = restWithTrackingProps["test-id"];
        const cname = restWithTrackingProps["data-cname"];
        const upgradeUrl = "/member/manage-membership.html?t=upgrade";
        const shouldCardLink = !isLocked && !isEnrolled && !isAtEnrollmentLimit;
        const CardWrapper = shouldCardLink ? 'a' : 'div';
        const cardProps = shouldCardLink ? { href: courseUrl } : {};
        const handleEnrollClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onEnrollClick && !isEnrolled && !isAtEnrollmentLimit) {
                onEnrollClick(course);
            }
        };
        return (React__namespace.createElement(CardWrapper, Object.assign({ className: classNames.join(" "), "data-cname": cname, "test-id": testId, "data-extra": dataExtra }, cardProps, rest),
            React__namespace.createElement("div", { className: "e2-cx-upgrade-course-card__image-container" }, isLocked ? (React__namespace.createElement("div", { className: "e2-cx-upgrade-course-card__locked-image" },
                React__namespace.createElement("div", { className: "e2-cx-upgrade-course-card__locked-overlay" }),
                React__namespace.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-lock-20.svg", className: "e2-cx-upgrade-course-card__lock-icon" }))) : (React__namespace.createElement("img", { src: imageUrl, className: "e2-cx-upgrade-course-card__image", alt: title }))),
            React__namespace.createElement("div", { className: "e2-cx-upgrade-course-card__text-container" },
                React__namespace.createElement("div", { className: "e2-cx-upgrade-course-card__title" },
                    React__namespace.createElement("span", { className: "e2-cx-upgrade-course-card__title-link", "data-cname": `${cname}__title`, "test-id": `${testId}__title`, "data-extra": dataExtra }, title)),
                (isEnrolled || isLocked) && (React__namespace.createElement(React__namespace.Fragment, null,
                    React__namespace.createElement("div", { className: "e2-cx-upgrade-course-card__subtitle" }, isEnrolled ? (React__namespace.createElement(React__namespace.Fragment, null,
                        React__namespace.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-check-circle-filled-20.svg" }),
                        " Enrolled")) : ("Only available in the College Saver plan")),
                    isLocked && !isEnrolled && isMobile && (React__namespace.createElement("a", { href: upgradeUrl, className: "e2-cx-upgrade-course-card__upgrade-link", "data-cname": `${cname}__upgrade_link`, "test-id": `${testId}__upgrade_link` }, "Upgrade for access"))))),
            !isEnrolled && (React__namespace.createElement("div", { className: "e2-cx-upgrade-course-card__cta-container" },
                isLocked && !isMobile && (React__namespace.createElement("a", { href: upgradeUrl, className: "e2-cx-upgrade-course-card__upgrade-link", "data-cname": `${cname}__upgrade_link`, "test-id": `${testId}__upgrade_link` }, "Upgrade for access")),
                React__namespace.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.SECONDARY, disabled: isLocked, tag: isAtEnrollmentLimit ? 'a' : 'button', href: isAtEnrollmentLimit ? courseUrl : undefined, onClick: (!isLocked && !isAtEnrollmentLimit) ? handleEnrollClick : undefined, "data-cname": `${cname}__${(isLocked || isAtEnrollmentLimit) ? 'view' : 'enroll'}_button${isLocked ? '_disabled' : ''}`, "test-id": `${testId}__${(isLocked || isAtEnrollmentLimit) ? 'view' : 'enroll'}_button${isLocked ? '_disabled' : ''}`, style: { minWidth: '120px' } }, (isLocked || isAtEnrollmentLimit) ? 'View course' : 'Enroll')))));
    };
    const CXUpgradeCourseCard = Object.assign(CXUpgradeCourseCardComponent, {
        displayName: "CXUpgradeCourseCard"
    });

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
    const RegFormCourseCard = React__namespace.forwardRef((_a, ref) => {
        var { course, dataCourseId, href, imageUrl, linkText, text, textMaxLines = 2, title, onClick, onClickTitle, isSelected = false, variant = 'default', forceShowImage = false, dataExtra } = _a, restWithTrackingProps = __rest$3(_a, ["course", "dataCourseId", "href", "imageUrl", "linkText", "text", "textMaxLines", "title", "onClick", "onClickTitle", "isSelected", "variant", "forceShowImage", "dataExtra"]);
        const isMobile = eurekaDesignSystem.LayoutHooks.useOnMobile();
        const classNames = ["e2-content-card", "reg-form-course-card", "e2-content-card--horizontal-button-on-right-layout"];
        if (variant === 'cart') {
            classNames.push("e2-content-card--cart");
        }
        else if (isSelected) {
            classNames.push("e2-content-card--selected");
        }
        else {
            classNames.push("e2-content-card--unselected");
        }
        const rest = eurekaDesignSystem.omitTrackingProps(restWithTrackingProps);
        const testId = restWithTrackingProps["test-id"];
        const cname = restWithTrackingProps["data-cname"];
        const getIcon = () => {
            if (variant === 'cart') {
                return "icon-trash-24.svg";
            }
            else if (isSelected) {
                return "icon-check-circle-filled-24.svg";
            }
            else {
                return "icon-add-filled-24.svg";
            }
        };
        return React__namespace.createElement("div", Object.assign({ ref: ref, className: classNames.join(" "), onClick: (e) => variant !== 'cart' && (onClick === null || onClick === void 0 ? void 0 : onClick(e, course)), "data-course-id": dataCourseId, "data-virtual": dataCourseId, "data-cname": `${cname}`, "test-id": `${testId}`, "data-extra": dataExtra }, rest),
            (!isMobile || forceShowImage) &&
                React__namespace.createElement("div", { className: "e2-content-card__image-container" },
                    React__namespace.createElement("img", { src: imageUrl, className: "e2-content-card__image", alt: title })),
            React__namespace.createElement("div", { className: "e2-content-card__text-container" },
                title && React__namespace.createElement("div", { className: "e2-content-card__title" },
                    React__namespace.createElement("span", { className: "e2-content-card__title-link", "data-cname": `${cname}__title`, "test-id": `${testId}__title`, "data-extra": dataExtra, onClick: (e) => {
                            e.stopPropagation();
                            onClickTitle === null || onClickTitle === void 0 ? void 0 : onClickTitle(e, course);
                        } }, title)),
                text && React__namespace.createElement("div", { className: "e2-content-card__text", style: { WebkitLineClamp: textMaxLines } }, text)),
            React__namespace.createElement("div", { className: "e2-content-card__button-on-right" },
                React__namespace.createElement(eurekaDesignSystem.MaterialIcon, { filename: getIcon(), onClick: (e) => onClick === null || onClick === void 0 ? void 0 : onClick(e, course), "data-cname": `${cname}__button`, "test-id": `${testId}__button`, "data-extra": dataExtra })));
    });

    const COURSES_PER_PAGE = 10;
    function filterCoursesBySearchTerm(courses, searchTerm) {
        if (!searchTerm.trim()) {
            return courses;
        }
        return courses.filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    function filterCoursesByPlan(courses, activeFilter, filterType, cs1SiteResourceIds, upperDivisionAcademyAssetIds) {
        if (activeFilter === 'all') {
            return courses;
        }
        if (filterType === 'courseLevel') {
            if (activeFilter === 'lower') {
                return courses.filter(course => !upperDivisionAcademyAssetIds.includes(course.academyAssetId));
            }
            if (activeFilter === 'upper') {
                return courses.filter(course => upperDivisionAcademyAssetIds.includes(course.academyAssetId));
            }
        }
        else {
            if (activeFilter === 'starter') {
                return courses.filter(course => cs1SiteResourceIds.includes(course.siteResourceId));
            }
            if (activeFilter === 'saver') {
                return courses;
            }
        }
        return courses;
    }
    function filterCoursesBySubject(courses, activeSubject) {
        if (activeSubject === 'all') {
            return courses;
        }
        return courses.filter(course => course.rootSubjectName === activeSubject);
    }
    function createSubjectOptions(distinctRootSubjectNames) {
        const sortedSubjects = [...distinctRootSubjectNames].sort();
        return [
            {
                value: 'all',
                display: 'All subjects',
                'data-cname': 'cx_course_search_subject_option_all'
            },
            ...sortedSubjects.map(subject => ({
                value: subject,
                display: subject,
                'data-cname': `cx_course_search_subject_option_${subject.toLowerCase().replace(/\s+/g, '_')}`
            }))
        ];
    }
    function CXCourseSearch({ allCourses, cs1SiteResourceIds, distinctRootSubjectNames, enrolledCourseAcademyAssetIds = [], filterType = 'planNames', hideHeader = false, hideSubheader = false, hideFilters = false, upperDivisionAcademyAssetIds = [], useRegFormCard = false, enableCourseCardModal = false, useCxUpgradeCard = false, isCS1User = false, isCS3User = false, isAtEnrollmentLimit = false, onEnrollClick, onClickElement, onClickTitle, onAddCourse, selectedCourses = [], plannedSchoolName, major, header, subheader, coursesPerPage = COURSES_PER_PAGE, showCta = false, ctaText, ctaUserType, ctaGoal, ctaDefaultProduct, ctaCname, ctaTestId }) {
        const [searchTerm, setSearchTerm] = React.useState('');
        const [activeFilter, setActiveFilter] = React.useState('all');
        const [activeSubject, setActiveSubject] = React.useState('all');
        const [currentPage, setCurrentPage] = React.useState(1);
        const [selectedCourse, setSelectedCourse] = React.useState(null);
        const [isModalOpen, setIsModalOpen] = React.useState(false);
        const [initialSubjectApplied, setInitialSubjectApplied] = React.useState(false);
        const hasActiveFilters = searchTerm.trim() !== '' || activeFilter !== 'all' || activeSubject !== 'all';
        const filteredCourses = React.useMemo(() => {
            let filtered = allCourses;
            filtered = filterCoursesBySearchTerm(filtered, searchTerm);
            filtered = filterCoursesByPlan(filtered, activeFilter, filterType, cs1SiteResourceIds, upperDivisionAcademyAssetIds);
            filtered = filterCoursesBySubject(filtered, activeSubject);
            return filtered;
        }, [allCourses, searchTerm, activeFilter, activeSubject, cs1SiteResourceIds, upperDivisionAcademyAssetIds, filterType]);
        const coursesToDisplay = hasActiveFilters ? filteredCourses : allCourses;
        const totalPages = Math.ceil(coursesToDisplay.length / coursesPerPage);
        const startIndex = (currentPage - 1) * coursesPerPage;
        const paginatedCourses = coursesToDisplay.slice(startIndex, startIndex + coursesPerPage);
        const handlePageChange = (page) => {
            setCurrentPage(page);
        };
        React.useEffect(() => {
            setCurrentPage(1);
        }, [searchTerm, activeFilter, activeSubject]);
        React.useEffect(() => {
            const handlePlanFilterChange = (event) => {
                const plan = event.detail.plan;
                if (plan === 'starter' || plan === 'saver') {
                    setActiveFilter(plan);
                }
            };
            window.addEventListener('planFilterChange', handlePlanFilterChange);
            return () => {
                window.removeEventListener('planFilterChange', handlePlanFilterChange);
            };
        }, []);
        const subjectOptions = React.useMemo(() => {
            return createSubjectOptions(distinctRootSubjectNames);
        }, [distinctRootSubjectNames]);
        const handleSubjectChange = (value) => {
            setActiveSubject(value);
        };
        React.useEffect(() => {
            const handleSubjectFilterChange = (event) => {
                const subject = event.detail.subject;
                handleSubjectChange(subject);
                if (!initialSubjectApplied) {
                    setInitialSubjectApplied(true);
                }
            };
            window.addEventListener('subjectFilterChange', handleSubjectFilterChange);
            return () => {
                window.removeEventListener('subjectFilterChange', handleSubjectFilterChange);
            };
        }, [initialSubjectApplied]);
        const renderSubjectDropdown = () => (React.createElement("div", { className: "course-search__subject-dropdown-container" },
            React.createElement(eurekaDesignSystem.Select, { options: subjectOptions, value: activeSubject, onChange: handleSubjectChange, "data-cname": "cx_course_search_subject_dropdown", placeholder: "All subjects", variant: eurekaDesignSystem.Select.Variant.LINK })));
        const renderCoursesView = () => {
            const cnamePrefix = hasActiveFilters ? 'filtered' : 'all';
            const listModifier = hasActiveFilters ? '--filtered' : '--all';
            const paginationModifier = hasActiveFilters ? '--filtered' : '--all';
            let courseCountText = `${coursesToDisplay.length} courses`;
            const filterOptions = filterType === 'courseLevel' ? [
                {
                    id: 'all',
                    label: 'All divisions'
                },
                {
                    id: 'lower',
                    label: 'Lower division'
                },
                {
                    id: 'upper',
                    label: 'Upper division'
                }
            ] : [
                {
                    id: 'all',
                    label: 'All plans'
                },
                {
                    id: 'starter',
                    label: 'College Starter'
                },
                {
                    id: 'saver',
                    label: 'College Saver'
                }
            ];
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "course-search__filter-bar" },
                    React.createElement("div", { className: "course-search__filter-controls" },
                        !hideFilters && filterOptions.map(option => (React.createElement(eurekaDesignSystem.FilterPill, { key: option.id, selected: activeFilter === option.id, onClick: () => {
                                setActiveFilter(option.id);
                            }, "data-cname": `cx_course_search_filter_pill_${option.id}`, "test-id": `cx_course_search_filter_pill_${option.id}` }, option.label))),
                        !hideFilters && React.createElement("div", { className: "course-search__filter-divider" }),
                        renderSubjectDropdown()),
                    coursesToDisplay.length > 0 && (React.createElement("span", { className: "course-search__course-count", "test-id": "cx_course_search_course_count" },
                        courseCountText,
                        (major || plannedSchoolName) && (React.createElement(eurekaDesignSystem.Tooltip, { body: React.createElement("div", null,
                                "Courses are filtered based on your selected",
                                ' ',
                                plannedSchoolName && major ? 'college & degree' :
                                    plannedSchoolName ? 'college' : 'degree',
                                "."), className: "tooltip-demo__tooltip", "data-cname": "tooltip_demo" },
                            React.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-info-circle-filled-20.svg" })))))),
                React.createElement("div", { className: `course-search__course-list course-search__course-list${listModifier}`, "data-track-visible": true, "data-cname": `cx_course_search`, style: { '--courses-per-page': coursesPerPage } }, paginatedCourses.length > 0 ? (paginatedCourses.map((course) => {
                    if (useCxUpgradeCard) {
                        const isLocked = isCS1User && !cs1SiteResourceIds.includes(course.siteResourceId);
                        const isEnrolled = enrolledCourseAcademyAssetIds.includes(course.academyAssetId);
                        return React.createElement(CXUpgradeCourseCard, { key: course.academyAssetId, course: course, title: course.title, imageUrl: course.imageUriSmall, isLocked: isLocked, isEnrolled: isEnrolled, isAtEnrollmentLimit: isAtEnrollmentLimit, courseUrl: course.uri, onEnrollClick: onEnrollClick, onClickTitle: (e, course) => {
                                setSelectedCourse(course);
                                setIsModalOpen(true);
                                onClickTitle === null || onClickTitle === void 0 ? void 0 : onClickTitle(e, course);
                            }, "data-cname": `cx_course_search_course_card_${cnamePrefix}`, "test-id": `cx_course_search_course_card_${cnamePrefix}_${course.academyAssetId}`, dataExtra: `${course.academyAssetId}` });
                    }
                    if (useRegFormCard) {
                        const isSelected = selectedCourses.some(selectedCourse => selectedCourse.academyAssetId === course.academyAssetId);
                        const planAvailabilityText = cs1SiteResourceIds.includes(course.siteResourceId)
                            ? "Available in all college plans"
                            : "Only available in the College Saver plan";
                        return React.createElement(RegFormCourseCard, { key: course.academyAssetId, course: course, title: course.title, imageUrl: course.imageUriSmall, "data-cname": `cx_course_search_course_card_${cnamePrefix}`, "test-id": `cx_course_search_course_card_${cnamePrefix}_${course.academyAssetId}`, dataExtra: `${course.academyAssetId}`, onClick: (e, course) => onClickElement === null || onClickElement === void 0 ? void 0 : onClickElement(e, course), onClickTitle: (e, course) => {
                                setSelectedCourse(course);
                                setIsModalOpen(true);
                                onClickTitle === null || onClickTitle === void 0 ? void 0 : onClickTitle(e, course);
                            }, isSelected: isSelected, text: remspect__namespace.isVariation("cxCourseSelector", "v2") ? planAvailabilityText : "" });
                    }
                    return enableCourseCardModal ? (React.createElement("div", { key: course.academyAssetId, onClick: (e) => {
                            e.preventDefault();
                            setSelectedCourse(course);
                            setIsModalOpen(true);
                            onClickElement === null || onClickElement === void 0 ? void 0 : onClickElement(e, course);
                        }, style: { cursor: 'pointer' } },
                        React.createElement(eurekaDesignSystem.CourseCard, { course: course, "data-cname": `cx_course_search_course_card_${cnamePrefix}`, "test-id": `cx_course_search_course_card_${cnamePrefix}_${course.academyAssetId}`, "data-extra": `${course.academyAssetId}`, layout: eurekaDesignSystem.ContentCard.Layout.HORIZONTAL }))) : (React.createElement(eurekaDesignSystem.CourseCard, { key: course.academyAssetId, course: course, "data-cname": `cx_course_search_course_card_${cnamePrefix}`, "test-id": `cx_course_search_course_card_${cnamePrefix}_${course.academyAssetId}`, "data-extra": `${course.academyAssetId}`, layout: eurekaDesignSystem.ContentCard.Layout.HORIZONTAL }));
                })) : hasActiveFilters ? (React.createElement("div", { className: "course-search__no-results" },
                    React.createElement("p", null, "No courses found matching your search criteria."))) : null),
                coursesToDisplay.length > 0 && (React.createElement(eurekaDesignSystem.Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange, "data-cname": cnamePrefix, "test-id": cnamePrefix, className: `course-search__pagination${paginationModifier}` }))));
        };
        return (React.createElement("div", { className: "course-search" },
            React.createElement("div", { className: "course-search__container" },
                !hideHeader &&
                    React.createElement("div", { className: "course-search__header" },
                        React.createElement("h2", { className: "course-search__title" }, header),
                        !hideSubheader && React.createElement("p", { className: "course-search__subtitle" }, subheader)),
                React.createElement("div", { className: "course-search__content" },
                    React.createElement("div", { className: "course-search__search-filter" },
                        React.createElement("div", { className: "course-search__search-section" },
                            React.createElement("div", { className: "course-search__search-field" },
                                React.createElement(eurekaDesignSystem.Field, { label: "Search courses", "data-track-visible": true, "data-cname": "cx_course_search__label" },
                                    React.createElement(eurekaDesignSystem.Input.Search, { placeholder: "Start typing course name", value: searchTerm, onChange: (value) => {
                                            setSearchTerm(value);
                                        }, "data-cname": "cx_course_search__input", "test-id": "cx_course_search__input", onKeyDown: (e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                            }
                                        } }))))),
                    renderCoursesView(),
                    showCta && (React.createElement("div", { className: "course-search__cta" },
                        React.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.PRIMARY, "data-cname": ctaCname, "test-id": ctaTestId, marketingSize: true, "data-track-visible": true, "data-toggle": "modal", href: "#partialRegFormModal", tag: "button", "data-user-type": ctaUserType, "data-goal": ctaGoal, "data-default-product": ctaDefaultProduct, "data-skip-pre-filled-questions": "true" }, ctaText))))),
            enableCourseCardModal && selectedCourse && (React.createElement(CourseDetailsModal, { course: selectedCourse, isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onAddCourse: onAddCourse, showAddButton: !!onAddCourse, isAlreadySelected: selectedCourses.some(course => course.academyAssetId === selectedCourse.academyAssetId) }))));
    }

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
    const CXHubTestimonialCarousel = React__namespace.forwardRef((_a, ref) => {
        var restWithTrackingProps = __rest$2(_a, []);
        const testimonials = [
            {
                id: 1,
                authorName: 'Demetria',
                body: 'I absolutely love this website! The college membership is amazing. I was able to get <b>29 credit hours for just $1,000!</b> '
                    + 'Do you know how much that would be at a community college or university?.. It was tough, but I did it with a newborn and a two year old and my husband working full time. '
                    + 'I have recommended this site to everyone I know going to college.',
                location: 'Earned college credit through Study.com',
            },
            {
                id: 2,
                authorName: 'Michael',
                body: 'Study.com has <b>saved me thousands of dollars</b> and allowed me the opportunity to advance my progress towards a degree. '
                    + '<b>I finished 10 courses</b> on Study.com. I’m graduating in three months rather than a year from now for this '
                    + 'reason. You can complete an entire course '
                    + 'for about $70-$100 on Study.com or pay $2000-$10,000 for a single course at a university…. It’s a no-brainer. I am very grateful for '
                    + 'Study.com.',
                location: 'Earned college credit through Study.com',
            },
            {
                id: 3,
                authorName: 'Tristan',
                body: 'The college program really did save...<b>I saved $5000 and 21 weeks of time</b>. The lessons were easy to fit in in between things, '
                    + 'and the tests were fair and decent to study for.',
                location: 'Earned college credit through Study.com',
            }
        ];
        return (React__namespace.createElement(eurekaDesignSystem.Carousel, Object.assign({}, restWithTrackingProps, { itemsLayout: eurekaDesignSystem.Carousel.ItemsLayout.EXACTLY_ONE_EVEN, ref: ref }), testimonials.map((testimonial) => (React__namespace.createElement(eurekaDesignSystem.StudyTestimonial, { key: testimonial.id, layout: "INLINE", testimonial: testimonial })))));
    });

    const MAJORS_PER_PAGE = 10;
    function CXMajorSearch({ allMajors, partnerSchoolCardMap, majorCoursesCountMap, majorsPerPage = MAJORS_PER_PAGE, hideSubheader = false, header, subheader }) {
        const isMobile = eurekaDesignSystem.LayoutHooks.useOnMobile();
        const [searchTerm, setSearchTerm] = React.useState('');
        const [activeSchool, setActiveSchool] = React.useState(0);
        const [currentPage, setCurrentPage] = React.useState(1);
        const hasActiveFilters = searchTerm.trim() !== '' || activeSchool !== 0;
        const filteredMajors = React.useMemo(() => {
            let filtered = allMajors;
            if (searchTerm.trim()) {
                filtered = filtered.filter(major => major.majorName.toLowerCase().includes(searchTerm.toLowerCase()));
            }
            if (activeSchool !== 0) {
                filtered = filtered.filter(major => major.companyId === activeSchool);
            }
            return filtered;
        }, [allMajors, searchTerm, activeSchool]);
        const majorsToDisplay = hasActiveFilters ? filteredMajors : allMajors;
        const totalPages = Math.ceil(majorsToDisplay.length / majorsPerPage);
        const startIndex = (currentPage - 1) * majorsPerPage;
        const paginatedMajors = majorsToDisplay.slice(startIndex, startIndex + majorsPerPage);
        const handlePageChange = (page) => {
            setCurrentPage(page);
        };
        React__namespace.useEffect(() => {
            setCurrentPage(1);
        }, [searchTerm, activeSchool]);
        const schoolOptions = React.useMemo(() => {
            const sortedPartners = Object.entries(partnerSchoolCardMap)
                .map(([id, partnerSchoolCard]) => {
                partnerSchoolCard.id = Number(id);
                return partnerSchoolCard;
            })
                .sort((a, b) => a.displayName.localeCompare(b.displayName));
            return [
                {
                    value: 0,
                    display: 'All colleges',
                    'data-cname': 'cx_major_search_school_option_all'
                },
                ...sortedPartners.map(partnerPage => ({
                    value: partnerPage.id,
                    display: partnerPage.displayName,
                    'data-cname': `cx_major_search_school_option_${partnerPage.id}`
                }))
            ];
        }, [partnerSchoolCardMap]);
        const handleSchoolChange = (value) => {
            setActiveSchool(value);
        };
        const renderSchoolDropdown = () => (React__namespace.createElement("div", { className: "major-search__school-dropdown-container" },
            React__namespace.createElement(eurekaDesignSystem.Select, { options: schoolOptions, initialValue: activeSchool, onChange: handleSchoolChange, "data-cname": "cx_major_search_school_dropdown", "test-id": "cx_major_search_school_dropdown", placeholder: "All schools", variant: eurekaDesignSystem.Select.Variant.LINK })));
        const getMajorCardClasses = () => {
            const classNames = [
                "e2-content-card",
                "major-search__card",
                "e2-content-card--horizontal-layout"
            ];
            return classNames;
        };
        const renderMajorsView = () => {
            const cnamePrefix = hasActiveFilters ? 'filtered' : 'all';
            const listModifier = hasActiveFilters ? '--filtered' : '--all';
            const paginationModifier = hasActiveFilters ? '--filtered' : '--all';
            let courseCountText = `${majorsToDisplay.length} degrees`;
            return (React__namespace.createElement(React__namespace.Fragment, null,
                React__namespace.createElement("div", { className: "major-search__filter-bar" },
                    React__namespace.createElement("div", { className: "major-search__filter-controls" }, renderSchoolDropdown()),
                    majorsToDisplay.length > 0 && (React__namespace.createElement("span", { className: "major-search__major-count" }, courseCountText))),
                React__namespace.createElement("div", { className: `major-search__course-list major-search__course-list${listModifier}`, "data-track-visible": true, style: { '--major-per-page': majorsPerPage } }, paginatedMajors.length > 0 ? (paginatedMajors.map((major) => {
                    const courseCount = majorCoursesCountMap[major.id];
                    const partner = partnerSchoolCardMap[major.companyId];
                    const classNames = getMajorCardClasses();
                    return (React__namespace.createElement("a", { href: major.externalDegreePageUrl, className: classNames.join(" "), key: major.id, "data-cname": "cx_major_search__major_card", "test-id": "cx_major_search__major_card", role: "listitem", "aria-label": `${major.majorName} from ${(partner === null || partner === void 0 ? void 0 : partner.displayName) || 'partner school'}` },
                        (partner === null || partner === void 0 ? void 0 : partner.logoUrl) && (!isMobile || partner) && (React__namespace.createElement("div", { className: "e2-content-card__image-container" },
                            React__namespace.createElement("img", { src: partner.logoUrl, className: "e2-content-card__image", alt: partner.displayName || "Partner logo", loading: "lazy" }))),
                        React__namespace.createElement("div", { className: "e2-content-card__text-container" },
                            React__namespace.createElement("div", { className: "e2-content-card__title" }, major.majorName),
                            courseCount && (React__namespace.createElement("div", { className: "e2-content-card__text" },
                                courseCount,
                                " recommended courses")))));
                })) : hasActiveFilters ? (React__namespace.createElement("div", { className: "major-search__no-results" },
                    React__namespace.createElement("p", null, "No majors found matching your search criteria."))) : null),
                majorsToDisplay.length > 0 && (React__namespace.createElement(eurekaDesignSystem.Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange, "data-cname": cnamePrefix, "test-id": cnamePrefix, className: `major-search__pagination${paginationModifier}` }))));
        };
        return (React__namespace.createElement("div", { className: "major-search" },
            React__namespace.createElement("div", { className: "major-search__container" },
                React__namespace.createElement("div", { className: "major-search__header" },
                    React__namespace.createElement("div", { className: "major-search__title" }, header),
                    !hideSubheader && React__namespace.createElement("div", { className: "major-search__subtitle" }, subheader)),
                React__namespace.createElement("div", { className: "major-search__content" },
                    React__namespace.createElement("div", { className: "major-search__search-filter" },
                        React__namespace.createElement("div", { className: "major-search__search-section" },
                            React__namespace.createElement("div", { className: "major-search__search-field" },
                                React__namespace.createElement(eurekaDesignSystem.Field, { label: "Search degrees & majors", "data-track-visible": true, "data-cname": "cx_major_search__label" },
                                    React__namespace.createElement(eurekaDesignSystem.Input.Search, { placeholder: "Start typing degree or major", value: searchTerm, onChange: (value) => {
                                            setSearchTerm(value);
                                        }, "data-cname": "cx_major_search__input", "test-id": "cx_major_search__input", onKeyDown: (e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                            }
                                        } }))))),
                    renderMajorsView()))));
    }

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
    const UPPER_DIVISION_COURSE_COUNT = parseInt(Marketing__namespace.com_study_cx_claims_upperDivisionCourses);
    const CXWhyStudentsChoose = mobxReact.observer((_a) => {
        var { title = "Why smart students choose Study.com", imageUrl = "/images/cx/cxhub/cx-how.png", imageAlt = "Students learning online", ctaText = "Try it risk-free", ctaUrl = "/academy/get-started.html", cs1Price = "95" } = _a, trackingProps = __rest$1(_a, ["title", "imageUrl", "imageAlt", "ctaText", "ctaUrl", "cs1Price"]);
        const benefits = [
            {
                icon: "icon-increase-24.svg",
                text: "The largest course library available"
            },
            {
                icon: "icon-grad-24.svg",
                text: `${UPPER_DIVISION_COURSE_COUNT}+ upper-division courses`
            },
            {
                icon: "icon-lesson-video-24.svg",
                text: "Engaging video lessons"
            },
            {
                icon: "icon-bulb-24.svg",
                text: "A mobile app for learning on the go"
            },
            {
                icon: "icon-discount-no-fill-24.svg",
                text: `Save on tuition—start earning credit for just $${cs1Price}/mo`
            },
            {
                icon: "icon-rocket-24.svg",
                text: "Guaranteed credit transfer to partner schools"
            }
        ];
        return (React__namespace.createElement("div", Object.assign({ className: "cx-why-students-choose" }, trackingProps, { "data-track-visible": true }),
            React__namespace.createElement("div", { className: "cx-why-students-choose__content" },
                React__namespace.createElement("div", { className: "cx-why-students-choose__image-container" },
                    React__namespace.createElement("img", { src: imageUrl, alt: imageAlt, className: "cx-why-students-choose__image" })),
                React__namespace.createElement("div", { className: "cx-why-students-choose__text-content" },
                    React__namespace.createElement("h3", { className: "cx-why-students-choose__title" }, title),
                    React__namespace.createElement("div", { className: "cx-why-students-choose__benefits" }, benefits.map((benefit, index) => (React__namespace.createElement("div", { key: index, className: "cx-why-students-choose__benefit" },
                        React__namespace.createElement("div", { className: "cx-why-students-choose__benefit-icon" },
                            React__namespace.createElement(eurekaDesignSystem.MaterialIcon, { filename: benefit.icon })),
                        React__namespace.createElement("div", { className: "cx-why-students-choose__benefit-text" }, benefit.text))))),
                    React__namespace.createElement("div", { className: "cx-why-students-choose__buttons" },
                        React__namespace.createElement(eurekaDesignSystem.Button, { className: "cx-why-students-choose__cta", "data-cname": `${trackingProps["data-cname"]}_cta`, "test-id": `${trackingProps["data-cname"]}_cta`, variant: eurekaDesignSystem.Button.Variant.PRIMARY, marketingSize: true, "data-user-type": "STUDENT", "data-goal": "EARN_CREDIT", "data-skip-pre-filled-questions": true, "data-track-visible": true, "data-default-product": "COLLEGE_ACCELERATOR", "data-remote": "false", "data-toggle": "modal", "data-target": "#partialRegFormModal" }, ctaText),
                        React__namespace.createElement(eurekaDesignSystem.Button, { className: "cx-why-students-choose__cta", tag: "a", href: "/college/pricing.html", "data-cname": `${trackingProps["data-cname"]}_see_plans`, "test-id": `${trackingProps["data-cname"]}_see_plans`, variant: eurekaDesignSystem.Button.Variant.TERTIARY, marketingSize: true }, "See plans & pricing"))))));
    });

    const aceCourseCount = React__namespace.createElement("span", { "test-id": "ace-course-count" }, Marketing__namespace.aceCourseCount);
    const transferableSchoolCount = React__namespace.createElement("span", { "test-id": "transferable-school-count" }, Marketing__namespace.transferableSchoolCount);
    const CX_CREDIT_TRANSFER_FAQS = () => {
        return [
            {
                question: "Is Study.com an accredited college?",
                answer: React__namespace.createElement(React__namespace.Fragment, null,
                    "Study.com is not an accredited college and does not award degrees. However, it offers ACE- and NCCRS-recommended courses that can be transferred for credit to over ",
                    transferableSchoolCount,
                    " accredited colleges and universities. Many students use Study.com to complete general education and major courses online, then transfer those credits toward their degree."),
                dataCname: "faq_is_study_accredited_college",
            },
            {
                question: "How can I earn college credit with Study.com courses?",
                answer: React__namespace.createElement(React__namespace.Fragment, null,
                    "Study.com offers over ",
                    aceCourseCount,
                    " courses recommended for college credit by ACE and NCCRS. This designation means that over ",
                    transferableSchoolCount,
                    " colleges and universities will accept these courses. You can transfer Study.com courses to your college and earn credit towards your degree. At many colleges you can complete 50% or more of your degree by transferring in Study.com courses. The process is easy: when you complete your courses we'll send your Study.com transcript directly to your school."),
                dataCname: "faq_how_to_earn_credit",
            },
            {
                question: "How do I request a transcript from Study.com?",
                answer: React__namespace.createElement(React__namespace.Fragment, null, "Once you've successfully completed a credit-recommended course, you can request a transcript directly from Study.com. Your transcript will be processed and sent within 2 business days, and can be sent via email or postal mail, depending on your university's preferences."),
                dataCname: "faq_request_transcript_from_study",
            },
            {
                question: "Why is Study.com the best online alternative credit provider?",
                answer: React__namespace.createElement(React__namespace.Fragment, null,
                    "Study.com is the best online alternative credit provider because we offer the most ACE- and NCCRS-recommended courses\u2014over ",
                    aceCourseCount,
                    "\u2014transferable to more than ",
                    transferableSchoolCount,
                    " accredited colleges and universities. With self-paced mobile learning, open-book exams, and unlimited courses through College Saver or College Starter, Study.com makes earning affordable, transferable credit simple and flexible."),
                dataCname: "faq_why_study_best",
            },
            {
                question: "How are courses graded?",
                answer: React__namespace.createElement(React__namespace.Fragment, null, "Study.com courses are graded on a 300-point scale. To pass and become eligible for college credit, you must earn at least 210 points (70%). Points are earned from: chapter tests, final exam (always open-book and non-proctored), and assignments (for applicable courses). Each course syllabus provides a detailed breakdown of how points are distributed."),
                dataCname: "faq_how_courses_graded",
            },
        ];
    };
    const CX_MEMBERSHIP_FAQS = (collegeStarterPrice, collegeSaverPrice) => {
        return [
            {
                question: "How much does the College Starter plan cost?",
                answer: (React__namespace.createElement(React__namespace.Fragment, null,
                    "Our College Starter plan costs ",
                    React__namespace.createElement("span", { "test-id": "college-starter-price" }, collegeStarterPrice),
                    " per month, and users can pause their account at anytime. It is perfect for anyone just beginning their college journey!")),
                dataCname: "faq_college_starter_price",
                isHidden: !collegeStarterPrice,
            },
            {
                question: "How much does the College Saver plan cost?",
                answer: (React__namespace.createElement(React__namespace.Fragment, null,
                    "Our College Saver plan costs ",
                    React__namespace.createElement("span", { "test-id": "college-saver-price" }, collegeSaverPrice),
                    " per month, and users can pause their account at anytime. It is perfect for students who are ready to take multiple lower- and upper-division courses.")),
                dataCname: "faq_college_saver_price",
                isHidden: !collegeSaverPrice,
            },
            {
                question: "How many courses can I take to earn credit per month?",
                answer: React__namespace.createElement(React__namespace.Fragment, null, "There's no monthly limit on the number of Study.com College Saver courses you can complete. You can enroll in 3 courses at a time, and when you complete a course you can immediately enroll in another in the next course."),
                dataCname: "faq_how_many_courses_per_month",
            },
            {
                question: "Can I cancel anytime?",
                answer: React__namespace.createElement(React__namespace.Fragment, null, "Yes, you can cancel your Study.com membership at anytime. You can also choose to pause your account, which stops billing and temporarily restricts access but keeps your membership active for when you return."),
                dataCname: "faq_how_to_cancel",
            },
        ];
    };
    const FAQAccordion = (props) => {
        const collegeStarterPrice = props.collegeStarterPrice;
        const collegeSaverPrice = props.collegeSaverPrice;
        if (!props.collegeStarterPrice || !props.collegeSaverPrice) {
            console.warn("FAQAccordion: collegeStarterPrice and collegeSaverPrice are missing");
        }
        const creditTransferFaqs = CX_CREDIT_TRANSFER_FAQS();
        const membershipFaqs = CX_MEMBERSHIP_FAQS(collegeStarterPrice, collegeSaverPrice);
        return React__namespace.createElement(eurekaDesignSystem.Accordion, { variant: "MAJOR" },
            React__namespace.createElement(eurekaDesignSystem.Accordion.Section, { "data-cname": "credit_transfer", defaultOpen: true, heading: "Credit & Transfer" }, creditTransferFaqs.map((faq) => (React__namespace.createElement("div", { className: "faq-question__container", "data-cname": faq.dataCname, key: faq.dataCname },
                React__namespace.createElement("div", { className: "faq-question" },
                    React__namespace.createElement("p", { className: "faq-question__header" }, faq.question),
                    React__namespace.createElement("p", { className: "faq-answer" }, faq.answer)))))),
            React__namespace.createElement(eurekaDesignSystem.Accordion.Section, { "data-cname": "subscription_membership", heading: "Subscription & Membership" }, membershipFaqs.map((faq) => (!faq.isHidden &&
                React__namespace.createElement("div", { className: "faq-question__container", "data-cname": faq.dataCname, key: faq.dataCname },
                    React__namespace.createElement("div", { className: "faq-question" },
                        React__namespace.createElement("p", { className: "faq-question__header" }, faq.question),
                        React__namespace.createElement("p", { className: "faq-answer" }, faq.answer)))))));
    };

    const FeaturedFAQAccordion = () => {
        const transferableSchoolCount = Marketing__namespace.transferableSchoolCount;
        return React__namespace.createElement(eurekaDesignSystem.Accordion, { variant: "MINOR" },
            React__namespace.createElement(eurekaDesignSystem.Accordion.Section, { "data-cname": "faq_college_level_work", heading: "Are Study.com courses equivalent to college-level work?" },
                React__namespace.createElement("div", { className: "faq-question__container" },
                    React__namespace.createElement("div", { className: "faq-question" },
                        React__namespace.createElement("p", { className: "faq-answer" }, "Yes, Study.com\u2019s college courses are designed by experts to meet the standards of college-level courses. Our courses have college level rigor combined with a simple, engaging platform and self-paced structure. You\u2019ll learn as much as at a traditional college but have more control over your time and pace.")))),
            React__namespace.createElement(eurekaDesignSystem.Accordion.Section, { "data-cname": "faq_ace_nccrs", heading: "What are ACE and NCCRS?" },
                React__namespace.createElement("div", { className: "faq-question__container" },
                    React__namespace.createElement("div", { className: "faq-question" },
                        React__namespace.createElement("p", { className: "faq-answer" }, "The American Council on Education (ACE) and the National College Credit Recommendation Service (NCCRS) are independent organizations that evaluate non-traditional learning programs\u2014like Study.com courses\u2014and recommend whether they should be accepted for college credit.")))),
            React__namespace.createElement(eurekaDesignSystem.Accordion.Section, { "data-cname": "faq_accept_credit", heading: "Which colleges accept credit from Study.com?" },
                React__namespace.createElement("div", { className: "faq-question__container" },
                    React__namespace.createElement("div", { className: "faq-question" },
                        React__namespace.createElement("p", { className: "faq-answer" },
                            "Study.com's credit-recommended courses are eligible for transfer credit with over ",
                            transferableSchoolCount,
                            " universities. In addition to this, Study.com partners with a number of universities to guarantee that the credit you earn here will transfer to one of their institutions. Find your university and see how your courses transfer on ",
                            React__namespace.createElement("a", { "data-cname": "faq_college_school_main", href: "/college/school/index.html" }, "our Partners page"),
                            ".")))),
            React__namespace.createElement(eurekaDesignSystem.Accordion.Section, { "data-cname": "faq_accept_credit", heading: "How can I be sure that my school will accept credit from Study.com?" },
                React__namespace.createElement("div", { className: "faq-question__container" },
                    React__namespace.createElement("div", { className: "faq-question" },
                        React__namespace.createElement("p", { className: "faq-answer" },
                            "To be sure your school accepts Study.com credit, contact your registrar, admissions office, or academic advisor and ask if they accept ACE- or NCCRS-recommended courses. While over ",
                            transferableSchoolCount,
                            " accredited schools accept Study.com credit, your school has the final decision.")))));
    };

    const ConfigurableFAQAccordion = (props) => {
        const { faqs } = props;
        return (React__namespace.createElement(eurekaDesignSystem.Accordion, { variant: eurekaDesignSystem.Accordion.Variant.MINOR }, faqs.map((faq, index) => (React__namespace.createElement(eurekaDesignSystem.Accordion.Section, { key: index, "data-cname": faq.dataCname, heading: faq.question },
            React__namespace.createElement("div", { className: "faq-question__container" },
                React__namespace.createElement("div", { className: "faq-question" },
                    React__namespace.createElement("div", { className: "faq-answer" }, faq.answer))))))));
    };

    const CxHubCoursesFAQAccordion = () => {
        const creditFaqs = CX_CREDIT_TRANSFER_FAQS();
        const membershipFaqs = CX_MEMBERSHIP_FAQS();
        const faqs = [
            creditFaqs.find(f => f.dataCname === "faq_how_courses_graded"),
            creditFaqs.find(f => f.dataCname === "faq_why_study_best"),
            membershipFaqs.find(f => f.dataCname === "faq_how_many_courses_per_month"),
        ].filter(faq => !!faq);
        return React__namespace.createElement(ConfigurableFAQAccordion, { faqs: faqs });
    };
    const CxHubTransferCreditFAQAccordion = () => {
        const creditTransferFaqs = CX_CREDIT_TRANSFER_FAQS();
        const faqs = [
            creditTransferFaqs.find(f => f.dataCname === "faq_how_to_earn_credit"),
            creditTransferFaqs.find(f => f.dataCname === "faq_request_transcript_from_study"),
        ].filter(faq => !!faq);
        return React__namespace.createElement(ConfigurableFAQAccordion, { faqs: faqs });
    };
    const CxHubPricingFAQAccordion = () => {
        const membershipFaqs = CX_MEMBERSHIP_FAQS();
        const faqs = [
            membershipFaqs.find(f => f.dataCname === "faq_how_many_courses_per_month"),
            membershipFaqs.find(f => f.dataCname === "faq_how_to_cancel"),
        ].filter(faq => !!faq);
        return React__namespace.createElement(ConfigurableFAQAccordion, { faqs: faqs });
    };

    const SchoolCard = (props) => {
        const testIdOrCname = "school_card";
        return (React__namespace.createElement("a", { href: "/college/school/" + props.pathToken + ".html", className: "cx-partner-content-card", "test-id": testIdOrCname, "data-cname": testIdOrCname, "data-extra": props.pathToken.replace(/-/g, "_") },
            React__namespace.createElement("div", { className: "cx-partner-content-card__content" },
                React__namespace.createElement("div", { className: "cx-partner-content-card__image-container" },
                    React__namespace.createElement("div", { className: "cx-partner-content-card__image-container__wrapper" },
                        React__namespace.createElement("img", { src: props.logoUrl, alt: props.displayName }))),
                React__namespace.createElement("div", { className: "cx-partner-content-card__text-container" },
                    React__namespace.createElement("div", { className: "cx-partner-content-card__title" }, props.displayName)),
                !!props.specialOffer && React__namespace.createElement("div", { className: "cx-partner-content-card__special-offer" }, props.specialOffer),
                (!props.specialOffer && !!props.transferableCourseCount) && React__namespace.createElement("div", { className: "cx-partner-content-card__course-count" },
                    props.transferableCourseCount,
                    " transferable courses"))));
    };

    const PartnerSchoolCard = (props) => {
        const partner = props.partner;
        return (React__namespace.createElement(SchoolCard, { pathToken: partner.pathToken, logoUrl: partner.logoUrl, displayName: partner.displayName, specialOffer: partner.specialOffer, transferableCourseCount: null }));
    };

    const PartnerCarouselThenCards = (props) => {
        var _a;
        let partnerList = props.partnerList;
        if (props.showFirstEight) {
            partnerList = partnerList.slice(0, 8);
        }
        return React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement("div", { className: props.carouselContainerClasses, "test-id": props.carouselContainerTestId },
                React__namespace.createElement(PartnerCarousel, { partnerList: props.partnerList, showFirstEight: (_a = props.showFirstEight) !== null && _a !== void 0 ? _a : false })),
            React__namespace.createElement("div", { className: props.cardsContainerClasses, "test-id": props.cardsContainerTestId }, partnerList.map(partner => React__namespace.createElement(PartnerSchoolCard, { partner: partner, key: partner.id }))));
    };
    const PartnerCarousel = (props) => {
        let partnerList = props.partnerList;
        if (props.showFirstEight) {
            partnerList = partnerList.slice(0, 8);
        }
        return React__namespace.createElement("div", { className: "cx-partner-carousel" },
            React__namespace.createElement(eurekaDesignSystem.Carousel, { itemsLayout: eurekaDesignSystem.Carousel.ItemsLayout.MAX_SIX }, partnerList.map(partner => React__namespace.createElement(PartnerSchoolCard, { partner: partner, key: partner.id }))));
    };

    var SchoolType;
    (function (SchoolType) {
        SchoolType["PRIVATE"] = "PRIVATE";
        SchoolType["PUBLIC_IN_STATE"] = "PUBLIC_IN_STATE";
        SchoolType["PUBLIC_OUT_OF_STATE"] = "PUBLIC_OUT_OF_STATE";
    })(SchoolType || (SchoolType = {}));
    const schoolOptions = [
        {
            dollarsPerCourse: 4240,
            key: SchoolType.PRIVATE,
            title: "Private",
            subTitle: "University",
        },
        {
            dollarsPerCourse: 2983,
            key: SchoolType.PUBLIC_OUT_OF_STATE,
            title: "Public",
            subTitle: "Out-of-State",
        },
        {
            dollarsPerCourse: 1066,
            key: SchoolType.PUBLIC_IN_STATE,
            title: "Public",
            subTitle: "In-State",
        },
    ];
    const schoolSelectOptions = schoolOptions.map((schoolOption) => ({
        value: schoolOption,
        display: `${schoolOption.title} ${schoolOption.subTitle.toLowerCase()}`,
    }));
    const SavingsCalculator = (props) => {
        var _a;
        const [selectedSchool, setSelectedSchool] = React.useState(schoolOptions[0]);
        const [numCourses, setNumCourses] = React.useState(4);
        const dollarsSaved = selectedSchool.dollarsPerCourse * numCourses;
        let ctaText = (_a = props.ctaText) !== null && _a !== void 0 ? _a : "Try it risk-free";
        return (React__namespace.createElement("div", { className: "calc-savings__controls-and-savings-module", "test-id": "savings-calculator-container" },
            React__namespace.createElement("div", { className: "calc-savings__controls-module" },
                React__namespace.createElement("div", { className: "calc-savings__control-group" },
                    React__namespace.createElement("div", { className: "calc-savings__control-label" }, "School type:"),
                    React__namespace.createElement("div", { className: "calc-savings__school-boxes" },
                        React__namespace.createElement(eurekaDesignSystem.ButtonBoxes, { size: "sm" }, schoolOptions.map((schoolOption) => (React__namespace.createElement(eurekaDesignSystem.ButtonBoxes.Box, { key: schoolOption.key, text: schoolOption.title, caption: schoolOption.subTitle, selected: schoolOption == selectedSchool, onChange: () => setSelectedSchool(schoolOption), "test-id": "calc_savings_school_btn_box", "data-cname": "calc_savings_school_btn_box", "data-extra": schoolOption.subTitle }))))),
                    React__namespace.createElement("div", { className: "calc-savings__school-dropdown" },
                        React__namespace.createElement(eurekaDesignSystem.Select, { options: schoolSelectOptions, initialValue: schoolOptions[0], "data-cname": "calc_savings_school_dropdown", onChange: (schoolOption) => setSelectedSchool(schoolOption) }))),
                React__namespace.createElement("div", { className: "calc-savings__control-group" },
                    React__namespace.createElement("div", { className: "calc-savings__control-label" }, "Number of courses:"),
                    React__namespace.createElement(NumCoursesRangeInput, { numCourses: numCourses, setNumCourses: setNumCourses }))),
            React__namespace.createElement("div", { className: "calc-savings__savings-module" },
                React__namespace.createElement("div", { className: "calc-savings__savings-title" }, "Estimated tuition savings:"),
                React__namespace.createElement("div", { className: "calc-savings__your-savings" },
                    React__namespace.createElement(AnimatedDollarValue, { dollarsSaved: dollarsSaved })),
                props.linkToPricingPage &&
                    React__namespace.createElement(eurekaDesignSystem.Button, { className: "calc-savings__savings-cta", tag: "a", variant: eurekaDesignSystem.Button.Variant.SECONDARY, "data-cname": "calc_savings_pricing_link", "test-id": "calc_savings_pricing_link", href: "/college/pricing.html", "data-track-visible": true, marketingSize: true }, "See plans & pricing"),
                !props.isLoggedIn && !props.linkToPricingPage &&
                    React__namespace.createElement(eurekaDesignSystem.Button, { className: "calc-savings__savings-cta", variant: "PRIMARY", "data-cname": "calc_savings_cta_btn", "test-id": "calc_savings_cta_btn", marketingSize: true, "data-user-type": "STUDENT", "data-goal": "EARN_CREDIT", "data-skip-pre-filled-questions": true, "data-track-visible": true, "data-default-product": "COLLEGE_ACCELERATOR", "data-remote": "false", "data-toggle": "modal", "data-target": "#partialRegFormModal" }, ctaText))));
    };
    SavingsCalculator.displayName = "SavingsCalculator";
    const NumCoursesRangeInput = (props) => {
        const { numCourses, setNumCourses } = props;
        const thumbWidth = 40;
        const halfThumbWidth = thumbWidth / 2;
        const minCourses = 1;
        const maxCourses = 15;
        const stepIndex = numCourses - minCourses;
        const maxStepIndex = maxCourses - minCourses;
        const rangeCalc = `calc((${stepIndex} * (100% - ${thumbWidth}px) / ${maxStepIndex}) + ${halfThumbWidth}px)`;
        const thumbCalc = `calc(${stepIndex} * (100% - ${thumbWidth}px) / ${maxStepIndex})`;
        const rangeStyle = {
            background: `linear-gradient(to right, #0CA71C ${rangeCalc}, #F3F6F8 ${rangeCalc}`
        };
        const thumbStyle = {
            left: `${thumbCalc}`
        };
        return (React__namespace.createElement("div", { className: "calc-savings__course-range-container" },
            React__namespace.createElement("input", { className: "calc-savings__course-range", style: rangeStyle, type: "range", min: minCourses, max: maxCourses, value: numCourses, onChange: (e) => setNumCourses(parseInt(e.target.value)), "data-cname": "calc_savings_num_schools_input", "test-id": "calc_savings_num_schools_input" }),
            React__namespace.createElement("div", { className: "calc-savings__course-range-thumb", style: thumbStyle }, numCourses)));
    };
    NumCoursesRangeInput.displayName = "NumCoursesRangeInput";
    const AnimatedDollarValue = (props) => {
        const animationDurationMillis = 1000;
        const [animatedDollarsSaved, setAnimatedDollarsSaved] = React.useState(props.dollarsSaved);
        const startValueRef = React.useRef(null);
        const targetValueRef = React.useRef(null);
        const animationIdRef = React.useRef(null);
        const animationEndTimeMillisRef = React.useRef(null);
        React.useEffect(() => {
            startValueRef.current = animatedDollarsSaved;
            targetValueRef.current = props.dollarsSaved;
            animationIdRef.current = window.requestAnimationFrame((timestamp) => {
                animationTick(timestamp);
            });
            return () => {
                window.cancelAnimationFrame(animationIdRef.current);
                animationEndTimeMillisRef.current = null;
            };
        }, [props.dollarsSaved]);
        const animationTick = React.useCallback((timestamp) => {
            const startValue = startValueRef.current;
            const targetValue = targetValueRef.current;
            if (animationEndTimeMillisRef.current == null) {
                animationEndTimeMillisRef.current = timestamp + animationDurationMillis;
            }
            if (timestamp > animationEndTimeMillisRef.current) {
                setAnimatedDollarsSaved(targetValue);
                return;
            }
            const percentRemaining = (animationEndTimeMillisRef.current - timestamp) / animationDurationMillis;
            if (percentRemaining <= .01) {
                setAnimatedDollarsSaved(targetValue);
                return;
            }
            const newAnimatedValue = Math.round(startValue + ((targetValue - startValue) * (1 - percentRemaining)));
            setAnimatedDollarsSaved(newAnimatedValue);
            if (newAnimatedValue != targetValue) {
                animationIdRef.current = window.requestAnimationFrame((timestamp) => {
                    animationTick(timestamp);
                });
            }
        }, []);
        return React__namespace.createElement(React__namespace.Fragment, null,
            "$",
            animatedDollarsSaved.toLocaleString('en-US'));
    };
    AnimatedDollarValue.displayName = "AnimatedDollarValue";

    const SubjectCard = (props) => {
        const underscoreTitle = props.subjectTitle.replace(" ", "_");
        return React__namespace.createElement("a", { href: `/college/online-college-courses.html#subject_${underscoreTitle}`, className: `subject-card ${underscoreTitle}`, "test-id": `subject-card_${underscoreTitle}`, "data-cname": `subject-card_${underscoreTitle}` },
            React__namespace.createElement("div", { className: "subject-card__title" }, props.subjectTitle),
            React__namespace.createElement("div", { className: "subject-card__count" },
                props.courseCount,
                " courses"));
    };

    const SubjectCarousel = (props) => {
        return (!!props.coursesByPlan && React__namespace.createElement("div", { className: "cx-partner-carousel" },
            React__namespace.createElement(eurekaDesignSystem.Carousel, { itemsLayout: eurekaDesignSystem.Carousel.ItemsLayout.MAX_SIX }, Object.keys(props.coursesByPlan).map((key) => React__namespace.createElement(SubjectCard, { courseCount: props.coursesByPlan[key].length, subjectTitle: key, key: key })))));
    };

    const TestimonialCarousel = (props) => {
        const { testimonials, hideFromSeo, accomplishmentOverride, truncateTestimonials, hideAuthorImage, showHeader, isTrustPilotTestimonial } = props;
        const [testimonialList, setTestimonialList] = React.useState(() => {
            return (!hideFromSeo && testimonials) ? testimonials.filter(testimonial => testimonial.body) : [];
        });
        if (!(testimonials === null || testimonials === void 0 ? void 0 : testimonials.length)) {
            console.warn("No testimonials to render for component");
            return null;
        }
        React.useEffect(() => {
            if (hideFromSeo && 'object' !== "undefined") {
                setTestimonialList(testimonials.filter(testimonial => testimonial.body));
            }
        }, ['object']);
        if (testimonialList.length === 0) {
            return null;
        }
        return (React__namespace.createElement("div", { className: "ssr-testimonial-carousel--container" },
            React__namespace.createElement(eurekaDesignSystem.Carousel, { "data-cname": "testimonial_carousel", itemsLayout: eurekaDesignSystem.Carousel.ItemsLayout.MAX_FOUR }, testimonialList.map((testimonial) => {
                const accomplishmentText = accomplishmentOverride !== null && accomplishmentOverride !== void 0 ? accomplishmentOverride : testimonial.accomplishment;
                const headerText = showHeader && testimonial.summary ? testimonial.summary : null;
                return (isTrustPilotTestimonial ?
                    React__namespace.createElement(React__namespace.Fragment, { key: `testimonial-${testimonial.authorName}` },
                        React__namespace.createElement(eurekaDesignSystem.TrustPilotTestimonial, { accomplishment: accomplishmentText, header: headerText, truncateTestimonial: truncateTestimonials !== null && truncateTestimonials !== void 0 ? truncateTestimonials : false, hideAuthorImage: hideAuthorImage !== null && hideAuthorImage !== void 0 ? hideAuthorImage : false, authorImageUrl: testimonial.imageFilename, testimonial: {
                                date: new Date(testimonial.dateCreated),
                                name: testimonial.authorName,
                                rating: 5,
                                review: testimonial.body
                            } }))
                    :
                        React__namespace.createElement(React__namespace.Fragment, { key: `testimonial-${testimonial.id}` },
                            React__namespace.createElement(eurekaDesignSystem.StudyTestimonial, { testimonial: testimonial, header: headerText, accomplishmentOverride: accomplishmentText, truncateTestimonial: truncateTestimonials !== null && truncateTestimonials !== void 0 ? truncateTestimonials : false, hideAuthorImage: hideAuthorImage !== null && hideAuthorImage !== void 0 ? hideAuthorImage : false })));
            }))));
    };

    const CXValuePropModule = mobxReact.observer(({}) => {
        return React__namespace.createElement("div", { className: "cx-value-prop-module", "data-cname": "cx_value_prop_module", "data-track-visible": true },
            React__namespace.createElement("div", { className: "cx-value-prop-module__content" },
                React__namespace.createElement("h3", { className: "cx-value-prop__title" }, "Accelerate your degree progress"),
                React__namespace.createElement("h5", { className: "cx-value-prop__subtitle" }, "Our college courses are designed to make learning fast and simple"),
                React__namespace.createElement("div", { className: "cx-value-prop__values-container" },
                    React__namespace.createElement("div", { className: "cx-value-prop__value skip-what-you-know" },
                        React__namespace.createElement("img", { className: "cx-value-prop__value-img", alt: "cx value prop image", src: "/images/cx/pricing/icon-transfer-credit.svg" }),
                        React__namespace.createElement("div", { className: "cx-value-prop__value-text" }, "Skip what you know"),
                        React__namespace.createElement("p", { className: "cx-value-prop__value-description" }, "Save time when you complete placement test to skip lessons you already understand.")),
                    React__namespace.createElement("div", { className: "cx-value-prop__value open-book-exams" },
                        React__namespace.createElement("img", { className: "cx-value-prop__value-img", alt: "cx value prop image", src: "/images/cx/pricing/icon-engaging-courses.svg" }),
                        React__namespace.createElement("div", { className: "cx-value-prop__value-text" }, "Ace our open book exams"),
                        React__namespace.createElement("p", { className: "cx-value-prop__value-description" }, "Exams are built for critical thinking\u2014not memorization. Bring notes to the final exam and stress less.")),
                    React__namespace.createElement("div", { className: "cx-value-prop__value finish-faster" },
                        React__namespace.createElement("img", { className: "cx-value-prop__value-img", alt: "cx value prop image", src: "/images/cx/pricing/icon-calendar.svg" }),
                        React__namespace.createElement("div", { className: "cx-value-prop__value-text" }, "Finish faster & save money"),
                        React__namespace.createElement("p", { className: "cx-value-prop__value-description" }, "Earn course credit in weeks, not months with fewer requirements focused on essential topics.")))));
    });

    const CS1_COURSE_COUNT = parseInt(Marketing__namespace.com_study_cx_claims_cs1CourseCount);
    const CS3_COURSE_COUNT = parseInt(Marketing__namespace.com_study_cx_claims_cs3CourseCount);
    var ProductKey;
    (function (ProductKey) {
        ProductKey["CS1"] = "CS1";
        ProductKey["CS3"] = "CS3";
    })(ProductKey || (ProductKey = {}));
    const CS1_PLAN_DATA = {
        key: ProductKey.CS1,
        name: "College Starter",
        subtitle: "Best for students completing general education courses",
        viewCoursesLinkText: `${CS1_COURSE_COUNT}+ general education courses`,
        features: [
            {
                title: "Course enrollment",
                items: [
                    { text: "Complete unlimited courses each month", planHasFeature: true },
                    { text: React__namespace.createElement(React__namespace.Fragment, null,
                            "Limited to ",
                            React__namespace.createElement("strong", null, "2 courses"),
                            " at a time"), planHasFeature: true },
                    { text: "Save course progress if you unenroll", planHasFeature: false }
                ]
            },
            {
                title: "Learning support",
                items: [
                    { text: "Study anytime, anywhere with the app", planHasFeature: true },
                    { text: "Get college coaching & course guidance", planHasFeature: false },
                    { text: "Personalized AI tutoring", planHasFeature: false }
                ]
            }
        ]
    };
    const CS3_PLAN_DATA = {
        key: ProductKey.CS3,
        name: "College Saver",
        subtitle: `Best for full access to all ${Marketing__namespace.com_study_cx_claims_transferableCourses}+ upper- and lower-division courses`,
        viewCoursesLinkText: `${CS1_COURSE_COUNT}+ general education courses`,
        features: [
            {
                title: "Course enrollment",
                items: [
                    { text: "Complete unlimited courses each month", planHasFeature: true },
                    { text: React__namespace.createElement(React__namespace.Fragment, null,
                            "Enroll in up to ",
                            React__namespace.createElement("strong", null, "3 courses"),
                            " at a time"), planHasFeature: true },
                    { text: "Save course progress if you unenroll", planHasFeature: true }
                ]
            },
            {
                title: "Learning support",
                items: [
                    { text: "Study anytime, anywhere with the app", planHasFeature: true },
                    { text: "Get college coaching & course guidance", planHasFeature: true },
                    { text: "Personalized AI tutoring", planHasFeature: true }
                ]
            }
        ]
    };
    const CourseListModal = (props) => {
        const [searchTerm, setSearchTerm] = React.useState("");
        const [courses, setCourses] = React.useState([]);
        const [loading, setLoading] = React.useState(false);
        const accordionCommands = eurekaDesignSystem.useStudyImperativeHandle();
        React.useEffect(() => {
            var _a, _b;
            if (searchTerm.length > 0) {
                (_a = accordionCommands.openAll) === null || _a === void 0 ? void 0 : _a.call(accordionCommands);
            }
            else {
                (_b = accordionCommands.closeAll) === null || _b === void 0 ? void 0 : _b.call(accordionCommands);
            }
        }, [searchTerm]);
        React__namespace.useEffect(() => {
            if (courses.length > 0) {
                return;
            }
            setLoading(true);
            new Promise(function (resolve, reject) { require(['lib/axios'], function (m) { resolve(/*#__PURE__*/_interopNamespaceDefault(m)); }, reject); })
                .then(module => module.default.default)
                .then(axios => axios.get("/cx/simple-course-list.ajax"))
                .then(response => {
                if (response.data) {
                    setCourses(response.data);
                }
                else {
                    setCourses([]);
                }
                setLoading(false);
            });
        }, []);
        const filteredCourses = courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPlan = props.selectedPlan === ProductKey.CS3 || course.inCS1;
            return matchesSearch && matchesPlan;
        });
        const coursesBySubject = {};
        filteredCourses.forEach(course => {
            if (!coursesBySubject[course.subject]) {
                coursesBySubject[course.subject] = [];
            }
            coursesBySubject[course.subject].push(course);
        });
        const sortedSubjectToCourseMap = Object.entries(coursesBySubject)
            .sort(([subjectA, courseListA], [subjectB, courseListB]) => subjectA.localeCompare(subjectB));
        return (React__namespace.createElement(eurekaDesignSystem.Modal, { isOpen: props.isOpen, onClose: props.onClose, className: "cx-course-list-modal", "data-cname": "cx_course_list_modal", "data-track-visible": true },
            React__namespace.createElement(eurekaDesignSystem.Modal.Header, { className: "cx-course-list-modal__header", "data-cname": "cx_course_list_modal_header" }, (props.selectedPlan == ProductKey.CS1 ? "College Starter" : "College Saver") + " course library"),
            React__namespace.createElement(eurekaDesignSystem.Modal.Content, null,
                React__namespace.createElement(CourseListModalValueProp, { productKey: props.selectedPlan }),
                React__namespace.createElement("div", { className: "course-filters" },
                    React__namespace.createElement(eurekaDesignSystem.Input.Search, { placeholder: "Search to filter course titles", value: searchTerm, onChange: (e) => setSearchTerm(e), "data-cname": "cx_course_list_modal_search" })),
                loading && React__namespace.createElement("div", null, "Loading courses..."),
                React__namespace.createElement("div", { className: "course-list" },
                    filteredCourses.length === 0 && !loading &&
                        React__namespace.createElement("div", { className: "no-courses-message" }, `No courses match your search for "${searchTerm}"`),
                    React__namespace.createElement(eurekaDesignSystem.Accordion, { commands: accordionCommands }, !loading && sortedSubjectToCourseMap.map(([subject, courseList]) => (React__namespace.createElement(eurekaDesignSystem.Accordion.Section, { key: subject, className: "subject-section", heading: subject + " courses", variant: eurekaDesignSystem.Accordion.Variant.MINOR, "data-cname": "cx_course_list_modal_subject_section_" + subject }, courseList.map(course => (React__namespace.createElement("div", { key: course.academyAssetId, className: "course-item-content" },
                        React__namespace.createElement("span", { className: "course-title" }, course.title)))))))))),
            props.showFooterControls && React__namespace.createElement(eurekaDesignSystem.Modal.Footer, null,
                React__namespace.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.LINK, onClick: props.onClose, "data-cname": "cx_course_list_modal_close_btn" }, "Close"),
                React__namespace.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.PRIMARY, onClick: props.onClose, "data-cname": "cx_course_list_modal_close_btn", "data-extra": props.selectedPlan, "data-user-type": "STUDENT", "data-goal": "EARN_CREDIT", "data-skip-pre-filled-questions": true, "data-default-product": props.selectedPlan, "data-remote": "false", "data-toggle": "modal", "data-target": "#partialRegFormModal" }, "Create an account"))));
    };
    const CourseListModalValueProp = (props) => {
        let headerText;
        let subtitleText;
        let imageUri;
        let extraClass;
        if (props.productKey === ProductKey.CS1) {
            headerText = CS1_COURSE_COUNT + "+ courses to accelerate your degree";
            subtitleText = "Access our most popular courses for general education—for just $95 per month";
            imageUri = "/images/cx/pricing/icon-laptop.svg";
            extraClass = "course-list-modal-value-prop-cs1";
        }
        else {
            headerText = "Over " + Marketing__namespace.com_study_cx_claims_transferableCourses + " courses for every degree";
            subtitleText = "Access our full library of upper- and lower-division courses to save more on tuition";
            imageUri = "/images/cx/pricing/icon-engaging-courses.svg";
            extraClass = "course-list-modal-value-prop-cs3";
        }
        return React__namespace.createElement("div", { className: "course-list-modal-value-prop " + extraClass },
            React__namespace.createElement("div", null,
                React__namespace.createElement("h3", { className: "value-prop-header" }, headerText),
                React__namespace.createElement("div", { className: "value-prop-subtitle" }, subtitleText)),
            React__namespace.createElement("img", { className: "value-prop-img", alt: "course list icon", src: imageUri }));
    };
    const CXPlanInfoBox = (props) => {
        const [collapsed, setCollapsed] = React.useState(true);
        const { plan, handleViewCoursesClick, allowCourseListModal, selectedCourses } = props;
        const inCXCartSwitchMobileV2Variation = eurekaDesignSystem.LayoutHooks.useOnMobile() && !remspect__namespace.isControl("cxCartSwitcherMobileV2");
        const subtitle = inCXCartSwitchMobileV2Variation
            ? "You are free to cancel online, anytime"
            : plan.subtitle;
        let collapsedText = collapsed ? "See more" : "See less";
        if (inCXCartSwitchMobileV2Variation) {
            collapsedText = collapsed ? "More benefits" : "Less benefits";
        }
        else if (props.allFeaturesCollapse) {
            collapsedText = "See what's included";
        }
        return React__namespace.createElement("div", { key: plan.key, className: "cx-plan-info-box", "data-cname": "cx_plan_info_box_" + plan.key, "test-id": "cx_plan_info_box", "data-track-visible": true },
            React__namespace.createElement("div", { className: "plan-header", "data-cname": "cx_plan_info_box_header", "test-id": "cx_plan_info_box_header" },
                React__namespace.createElement("h3", { className: "plan-name" }, plan.name),
                React__namespace.createElement("p", { className: `plan-subtitle ${props.allFeaturesCollapse ? '' : 'hide-on-mobile'}` }, subtitle)),
            React__namespace.createElement("div", { className: "plan-features" },
                React__namespace.createElement("div", { className: `feature-section ${(props.allFeaturesCollapse && collapsed) ? 'collapsed' : ''}` },
                    React__namespace.createElement("div", { className: "feature-section-title" }, "Course library"),
                    React__namespace.createElement(CourseLibraryFeature, { featureText: `${CS1_COURSE_COUNT}+ general education courses`, includedInPlan: true, shouldShowAsButton: true, allowCourseListModal: allowCourseListModal, handleViewCoursesClick: () => handleViewCoursesClick(ProductKey.CS1), dataCname: "cx_course_lower_div_library_btn" }),
                    React__namespace.createElement(CourseLibraryFeature, { featureText: `${CS3_COURSE_COUNT}+ premium & upper-division courses`, includedInPlan: plan.key === ProductKey.CS3, shouldShowAsButton: plan.key === ProductKey.CS3, allowCourseListModal: allowCourseListModal, handleViewCoursesClick: () => handleViewCoursesClick(ProductKey.CS3), dataCname: "cx_course_upper_div_library_btn" }),
                    selectedCourses && selectedCourses.length > 0 && selectedCourses.map((course, index) => (React__namespace.createElement(FeatureItem, { key: "selectedCourse" + index, includedInPlan: (plan.key == ProductKey.CS3 || course.inCS1), featureText: course.title })))),
                plan.features.map((section, sectionIndex) => (React__namespace.createElement("div", { key: sectionIndex, className: `feature-section ${collapsed ? 'collapsed' : ''}` },
                    React__namespace.createElement("div", { className: "feature-section-title" }, section.title),
                    section.items.map((item, itemIndex) => (React__namespace.createElement(FeatureItem, { key: "feature" + sectionIndex + "-" + itemIndex, includedInPlan: item.planHasFeature, featureText: item.text }))))))),
            React__namespace.createElement(eurekaDesignSystem.Button, { "data-cname": "cx_plan_info_box_toggle_btn", variant: eurekaDesignSystem.Button.Variant.LINK, className: `plan_information__toggle-btn ${collapsed ? 'collapsed' : ''}`, onClick: () => setCollapsed(!collapsed) }, collapsedText));
    };
    const FeatureItem = (props) => {
        return (React__namespace.createElement("div", { className: "feature-item" },
            React__namespace.createElement("div", { className: `feature-icon ${props.includedInPlan ? 'included' : 'excluded'}` }),
            props.featureText && (typeof props.featureText !== 'string' || props.featureText.trim() !== "") &&
                React__namespace.createElement("span", { className: `feature-text ${props.includedInPlan ? 'included' : 'excluded'}` }, props.featureText),
            props.children));
    };
    const CourseLibraryFeature = (props) => {
        const { featureText, includedInPlan, shouldShowAsButton, allowCourseListModal, handleViewCoursesClick, dataCname } = props;
        if (shouldShowAsButton && allowCourseListModal) {
            return (React__namespace.createElement(FeatureItem, { includedInPlan: includedInPlan },
                React__namespace.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.LINK, onClick: () => handleViewCoursesClick(), className: "view-courses-btn", "data-cname": dataCname || "cx_course_library_feature_btn" }, featureText)));
        }
        return (React__namespace.createElement(FeatureItem, { includedInPlan: includedInPlan, featureText: featureText }));
    };
    const CXCS1PlanInfoBox = (props) => {
        var _a, _b, _c;
        const [isModalOpen, setIsModalOpen] = React.useState(false);
        const allowCourseListModal = (_a = props.allowCourseListModal) !== null && _a !== void 0 ? _a : true;
        let selectedCourses = [...((_b = props.selectedCourses) !== null && _b !== void 0 ? _b : [])];
        const allFeaturesCollapse = (_c = props.allFeaturesCollapse) !== null && _c !== void 0 ? _c : false;
        selectedCourses = selectedCourses.sort((a, b) => Number(b.inCS1) - Number(a.inCS1));
        const handleViewCoursesClick = () => {
            if (props.anchor) {
                const element = document.getElementById(props.anchor);
                if (element) {
                    if (props.enablePlanFilterEvents) {
                        window.dispatchEvent(new CustomEvent('planFilterChange', {
                            detail: { plan: 'starter' }
                        }));
                    }
                    element.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
            }
            setIsModalOpen(true);
        };
        return React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement(CXPlanInfoBox, { plan: CS1_PLAN_DATA, handleViewCoursesClick: handleViewCoursesClick, allowCourseListModal: allowCourseListModal, selectedCourses: selectedCourses, allFeaturesCollapse: allFeaturesCollapse }),
            allowCourseListModal &&
                React__namespace.createElement(CourseListModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), selectedPlan: ProductKey.CS1, showFooterControls: props.showFooterControls }));
    };
    const CXCS3PlanInfoBox = (props) => {
        var _a, _b, _c;
        const [isModalOpen, setIsModalOpen] = React.useState(false);
        const allowCourseListModal = (_a = props.allowCourseListModal) !== null && _a !== void 0 ? _a : true;
        let selectedCourses = [...((_b = props.selectedCourses) !== null && _b !== void 0 ? _b : [])];
        const allFeaturesCollapse = (_c = props.allFeaturesCollapse) !== null && _c !== void 0 ? _c : false;
        selectedCourses = selectedCourses.sort((a, b) => Number(b.inCS1) - Number(a.inCS1));
        const handleViewCoursesClick = (planKey) => {
            if (props.anchor) {
                const element = document.getElementById(props.anchor);
                if (element) {
                    if (props.enablePlanFilterEvents) {
                        let planFilter = planKey === ProductKey.CS1 ? 'starter' : 'saver';
                        window.dispatchEvent(new CustomEvent('planFilterChange', {
                            detail: { plan: planFilter }
                        }));
                    }
                    element.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
            }
            setIsModalOpen(true);
        };
        return React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement(CXPlanInfoBox, { plan: CS3_PLAN_DATA, handleViewCoursesClick: handleViewCoursesClick, allowCourseListModal: allowCourseListModal, selectedCourses: selectedCourses, allFeaturesCollapse: allFeaturesCollapse }),
            allowCourseListModal &&
                React__namespace.createElement(CourseListModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), selectedPlan: ProductKey.CS3, showFooterControls: props.showFooterControls }));
    };
    const CXPlanSideBySide = (props) => {
        return React__namespace.createElement("div", { className: "cx-plan-compare" },
            React__namespace.createElement("div", { className: props.showMostPopularGradiantBox ? "cx-plan-compare__plan-wrapper cx-plan-compare__plan-wrapper--gradient"
                    : "cx-plan-compare__plan-wrapper" },
                props.showMostPopularGradiantBox && React__namespace.createElement("div", { className: "cx-plan-compare__popular" }, "Most popular"),
                React__namespace.createElement("div", { className: "cx-plan-compare__plan" },
                    React__namespace.createElement(CXCS3PlanInfoBox, { allFeaturesCollapse: true, showFooterControls: props.showFooterControls, anchor: props.anchor, enablePlanFilterEvents: props.enablePlanFilterEvents }),
                    React__namespace.createElement("div", { className: "cx-plan-compare__cost" },
                        React__namespace.createElement("span", { className: "cx-plan-compare__price" },
                            "$",
                            props.CS3priceMonthly),
                        React__namespace.createElement("span", { className: "cx-plan-compare__month" }, "/month")),
                    props.showInProductCta && React__namespace.createElement("div", { className: "cx-plan-compare__in-product-cta" },
                        React__namespace.createElement(eurekaDesignSystem.Button, { "data-cname": "cx_plan_compare_cs3", "test-id": "cx_plan_compare_cs3", fillWidth: true, variant: eurekaDesignSystem.Button.Variant.PRIMARY, marketingSize: true, "data-track-visible": true, "data-user-type": "STUDENT", "data-goal": "EARN_CREDIT", "data-skip-pre-filled-questions": true, "data-default-product": "CS3", "data-remote": "false", "data-toggle": "modal", "data-target": "#partialRegFormModal" }, "Create an account")))),
            React__namespace.createElement("div", { className: "cx-plan-compare__plan-wrapper " },
                React__namespace.createElement("div", { className: "cx-plan-compare__plan" },
                    React__namespace.createElement(CXCS1PlanInfoBox, { allFeaturesCollapse: true, showFooterControls: props.showFooterControls, anchor: props.anchor, enablePlanFilterEvents: props.enablePlanFilterEvents }),
                    React__namespace.createElement("div", { className: "cx-plan-compare__cost" },
                        React__namespace.createElement("span", { className: "cx-plan-compare__price" },
                            "$",
                            props.CS1priceMonthly),
                        React__namespace.createElement("span", { className: "cx-plan-compare__month" }, "/month")),
                    props.showInProductCta && React__namespace.createElement("div", { className: "cx-plan-compare__in-product-cta" },
                        React__namespace.createElement(eurekaDesignSystem.Button, { "data-cname": "cx_plan_compare_cs1", "test-id": "cx_plan_compare_cs1", fillWidth: true, variant: eurekaDesignSystem.Button.Variant.PRIMARY, marketingSize: true, "data-track-visible": true, "data-user-type": "STUDENT", "data-goal": "EARN_CREDIT", "data-skip-pre-filled-questions": true, "data-default-product": "CS1", "data-remote": "false", "data-toggle": "modal", "data-target": "#partialRegFormModal" }, "Create an account")))));
    };

    const CXClaimStatsModule = (props) => (React__namespace.createElement("div", { className: "cx-claim-stats", "data-track-visible": true },
        React__namespace.createElement("span", { className: "cx-claim-stats__stat" }, props.stat),
        React__namespace.createElement("span", { className: "cx-claim-stats__text" }, props.text)));

    const InterrupterTestimonial = (props) => (React__namespace.createElement("div", { className: "cx-interrupter-testimonial" },
        React__namespace.createElement("div", { className: "cx-interrupter-testimonial__image-wrapper" },
            React__namespace.createElement("img", { src: "/images/cx/christina-cx.png" })),
        React__namespace.createElement("div", { className: "cx-interrupter-testimonial__content" },
            React__namespace.createElement("div", { className: "cx-interrupter-testimonial__header" }, "Christina saved $10,000 & one year of school"),
            React__namespace.createElement("div", { className: "cx-interrupter-testimonial__testimonial" }, "Study.com allowed me to finish my degree a year sooner than expected. All of my credits transferred over. I was able to save over $10,000!! I recommend Study.com to all of my friends, coworkers, and family."),
            React__namespace.createElement("div", { className: "cx-interrupter-testimonial__name" }, "Christina B."),
            React__namespace.createElement("div", { className: "cx-interrupter-testimonial__accomplishment" }, "Study.com college learner"))));

    const CXStepsHowItWorks = ({ steps }) => {
        let parsedSteps;
        try {
            if (typeof steps === 'string') {
                parsedSteps = JSON.parse(steps);
            }
            else if (Array.isArray(steps)) {
                parsedSteps = steps;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('Failed to parse steps', error, steps);
            return null;
        }
        return (React.createElement(eurekaDesignSystem.Steps, { activeStep: "all", layout: "vertical" }, parsedSteps.map((step, index) => (React.createElement(eurekaDesignSystem.Steps.Step, { key: index, id: "all", indicator: index + 1, heading: step.heading, description: step.description })))));
    };

    var __awaiter = (window && window.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    const CXUpgradePlanSelector = (props) => {
        const { currentProductKey, cs1priceMonthly, cs3priceMonthly } = props;
        const [isUpgrading, setIsUpgrading] = React.useState(false);
        const [isModalOpen, setIsModalOpen] = React.useState(false);
        const [selectedProduct, setSelectedProduct] = React.useState(null);
        const handleUpgradeClick = (targetProduct) => {
            if (targetProduct === currentProductKey) {
                return;
            }
            setSelectedProduct(targetProduct);
            setIsModalOpen(true);
        };
        const handleConfirmUpgrade = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            if (!selectedProduct)
                return;
            setIsUpgrading(true);
            try {
                const axiosModule = yield new Promise(function (resolve, reject) { require(['lib/axios'], function (m) { resolve(/*#__PURE__*/_interopNamespaceDefault(m)); }, reject); });
                const axios = axiosModule.default.default;
                const response = yield axios.post(`/member/update-subscription.ajax?product=${selectedProduct}`);
                if ((_a = response.data) === null || _a === void 0 ? void 0 : _a.success) {
                    const toastrModule = yield new Promise(function (resolve, reject) { require(['lib/toastr'], function (m) { resolve(/*#__PURE__*/_interopNamespaceDefault(m)); }, reject); });
                    const toastr = toastrModule.default;
                    const planName = selectedProduct === "CS3" ? "College Saver" : "College Starter";
                    toastr.success(`Your plan has been updated to ${planName}. Redirecting to dashboard...`, "Success", { positionClass: "toast-top-center" });
                    setTimeout(() => {
                        window.location.href = "/member/my-dashboard.html";
                    }, 2000);
                }
                else {
                    throw new Error(((_b = response.data) === null || _b === void 0 ? void 0 : _b.errors) || "Unknown error");
                }
            }
            catch (error) {
                const toastrModule = yield new Promise(function (resolve, reject) { require(['lib/toastr'], function (m) { resolve(/*#__PURE__*/_interopNamespaceDefault(m)); }, reject); });
                const toastr = toastrModule.default;
                let errorMessage = "An error occurred while updating your plan. Please try again.";
                if ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.errors) {
                    const errors = error.response.data.errors;
                    if (errors.payment_collection || errors.payment || errors.insufficient_funds) {
                        errorMessage = errors.payment_collection || errors.payment || errors.insufficient_funds;
                    }
                }
                toastr.error(errorMessage, "Error", {
                    positionClass: "toast-top-center",
                    timeOut: 8000
                });
                setIsUpgrading(false);
                setIsModalOpen(false);
            }
        });
        const isCS1 = currentProductKey === "CS1";
        const targetPlanName = selectedProduct === "CS3" ? "College Saver" : "College Starter";
        const currentPlanName = isCS1 ? "College Starter" : "College Saver";
        return (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement("div", { className: "cx-upgrade-plan-selector", "data-cname": "cx_upgrade_plan_selector", "test-id": "cx_upgrade_plan_selector" },
                React__namespace.createElement("div", { className: "cx-plan-compare" },
                    React__namespace.createElement("div", { className: "cx-plan-compare__plan-wrapper" },
                        React__namespace.createElement("div", { className: "cx-plan-compare__plan" },
                            React__namespace.createElement(CXCS3PlanInfoBox, { allFeaturesCollapse: true }),
                            React__namespace.createElement("div", { className: "cx-plan-compare__cost" },
                                React__namespace.createElement("span", { className: "cx-plan-compare__price" },
                                    "$",
                                    cs3priceMonthly),
                                React__namespace.createElement("span", { className: "cx-plan-compare__month" }, "/month")),
                            React__namespace.createElement("div", { className: "cx-plan-compare__in-product-cta" },
                                React__namespace.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.PRIMARY, disabled: !isCS1 || isUpgrading, onClick: () => handleUpgradeClick("CS3"), fillWidth: true, marketingSize: true, "data-cname": "cx_upgrade_plan_selector_cs3_btn", "test-id": "cx_upgrade_plan_selector_cs3_btn" }, isCS1 ? "Choose College Saver" : "Continue with current plan")))),
                    React__namespace.createElement("div", { className: "cx-plan-compare__plan-wrapper" },
                        React__namespace.createElement("div", { className: "cx-plan-compare__plan" },
                            React__namespace.createElement(CXCS1PlanInfoBox, { allFeaturesCollapse: true }),
                            React__namespace.createElement("div", { className: "cx-plan-compare__cost" },
                                React__namespace.createElement("span", { className: "cx-plan-compare__price" },
                                    "$",
                                    cs1priceMonthly),
                                React__namespace.createElement("span", { className: "cx-plan-compare__month" }, "/month")),
                            React__namespace.createElement("div", { className: "cx-plan-compare__in-product-cta" },
                                React__namespace.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.SECONDARY, disabled: isCS1 || isUpgrading, onClick: () => handleUpgradeClick("CS1"), fillWidth: true, marketingSize: true, "data-cname": "cx_upgrade_plan_selector_cs1_btn", "test-id": "cx_upgrade_plan_selector_cs1_btn" }, isCS1 ? "Continue with current plan" : "Choose College Starter")))))),
            React__namespace.createElement(eurekaDesignSystem.Modal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), className: "cx-upgrade-confirmation-modal", "data-cname": "cx_upgrade_confirmation_modal", "test-id": "cx_upgrade_confirmation_modal" },
                React__namespace.createElement(eurekaDesignSystem.Modal.Header, null, "Confirm plan change"),
                React__namespace.createElement(eurekaDesignSystem.Modal.Content, null,
                    React__namespace.createElement("p", null,
                        "You are about to change your plan from ",
                        React__namespace.createElement("strong", null, currentPlanName),
                        " to",
                        " ",
                        React__namespace.createElement("strong", null, targetPlanName),
                        "."),
                    selectedProduct === "CS3" && isCS1 && (React__namespace.createElement("p", null,
                        "Your new plan will give you access to all ",
                        Marketing__namespace.com_study_cx_claims_transferableCourses,
                        "+ courses, the ability to enroll in up to 3 courses at a time, and personalized AI tutoring.")),
                    selectedProduct === "CS1" && !isCS1 && (React__namespace.createElement("p", null, "Your new plan will limit you to general education courses only and 2 course enrollments at a time. You will lose access to premium & upper-division courses, AI tutoring, and college coaching.")),
                    React__namespace.createElement("p", null, "Your billing will be updated immediately. Do you want to continue?")),
                React__namespace.createElement(eurekaDesignSystem.Modal.Footer, null,
                    React__namespace.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.LINK, onClick: () => setIsModalOpen(false), disabled: isUpgrading, "data-cname": "cx_upgrade_confirmation_cancel", "test-id": "cx_upgrade_confirmation_cancel" }, "Cancel"),
                    React__namespace.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.PRIMARY, onClick: handleConfirmUpgrade, disabled: isUpgrading, "data-cname": "cx_upgrade_confirmation_confirm", "test-id": "cx_upgrade_confirmation_confirm" }, isUpgrading ? "Processing..." : "Confirm plan change")))));
    };

    const TrustpilotTestimonialConfigurable = (props) => {
        const { header, accomplishment, authorName, rating = 5, body, authorImageUrl, truncateTestimonial = false, hideAuthorImage = false } = props;
        return (React__namespace.createElement(eurekaDesignSystem.TrustPilotTestimonial, { accomplishment: accomplishment, header: header, truncateTestimonial: truncateTestimonial, hideAuthorImage: hideAuthorImage, authorImageUrl: authorImageUrl, testimonial: {
                date: new Date(),
                name: authorName,
                rating: rating,
                review: body
            } }));
    };

    const CoursesByPlan = ({ allCourses, courseSearchAnchorId, enableSubjectFiltering = false }) => {
        const subjectMap = React__namespace.useMemo(() => {
            const map = new Map();
            allCourses.forEach(course => {
                const subjectName = course.rootSubjectName;
                map.set(subjectName, (map.get(subjectName) || 0) + 1);
            });
            return map;
        }, [allCourses]);
        const subjects = React__namespace.useMemo(() => {
            return Array.from(subjectMap.entries())
                .map(([name, courseCount]) => ({ name, courseCount }))
                .sort((a, b) => a.name.localeCompare(b.name));
        }, [subjectMap]);
        const handleSubjectClick = (e, subjectName) => {
            if (!enableSubjectFiltering) {
                return;
            }
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('subjectFilterChange', {
                detail: { subject: subjectName }
            }));
            if (courseSearchAnchorId) {
                const element = document.getElementById(courseSearchAnchorId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };
        return (React__namespace.createElement("ul", { className: "cx-courses-by-plan__grid" }, subjects.map((subject) => {
            const subjectUnderscoredTitle = subject.name.replace(/ /g, '_');
            return (React__namespace.createElement("li", { key: subject.name, className: `cx-courses-by-plan__tile ${subjectUnderscoredTitle}` },
                React__namespace.createElement("a", { className: "cx-courses-by-plan__link", onClick: (e) => handleSubjectClick(e, subject.name), "data-cname": `cx_courses_by_plan_link`, "test-id": `cx_courses_by_plan_link_${subjectUnderscoredTitle}`, "data-extra": subjectUnderscoredTitle },
                    React__namespace.createElement("span", { className: "cx-courses-by-plan__subject-name" }, subject.name),
                    React__namespace.createElement("span", { className: "cx-courses-by-plan__course-count" },
                        subject.courseCount,
                        " Courses"))));
        })));
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
    const CollegeStarterModal = (_a) => {
        var { isOpen, onClose, imageUrl, seeDetailsHref = "/college/index.html", price, onShowDismissedCard } = _a, trackingProps = __rest(_a, ["isOpen", "onClose", "imageUrl", "seeDetailsHref", "price", "onShowDismissedCard"]);
        const isMobile = eurekaDesignSystem.LayoutHooks.useOnMobile();
        const handleClose = () => {
            onClose();
            if (onShowDismissedCard) {
                onShowDismissedCard();
            }
        };
        return (React.createElement(eurekaDesignSystem.Modal, { className: "e2-college-starter-modal", "data-cname": trackingProps["data-cname"], isOpen: isOpen, onClose: handleClose, "test-id": trackingProps["test-id"] || trackingProps["data-cname"], variant: eurekaDesignSystem.Modal.Variant.BASIC, "data-track-visible": true },
            React.createElement(eurekaDesignSystem.Modal.Content, null,
                React.createElement("div", { className: `e2-college-starter-modal__container ${isMobile ? "e2-college-starter-modal__container--mobile"
                    : "e2-college-starter-modal__container--desktop"}` },
                    React.createElement("div", { className: "e2-college-starter-modal__image-section" },
                        React.createElement("img", { src: imageUrl, className: "e2-college-starter-modal__image", alt: "Student celebrating graduation" })),
                    React.createElement("div", { className: "e2-college-starter-modal__content-section" },
                        React.createElement("div", { className: "e2-college-starter-modal__header" },
                            React.createElement("div", { className: "e2-college-starter-modal__title" },
                                "Earn college credit for less\u2014just $",
                                price,
                                "/month")),
                        React.createElement("div", { className: "e2-college-starter-modal__body" },
                            React.createElement("p", { className: "e2-college-starter-modal__description" }, "Take college courses. Earn credit. Save more with our new College Starter plan."),
                            React.createElement("ul", { className: "e2-college-starter-modal__features" },
                                React.createElement("li", { className: "e2-college-starter-modal__feature" },
                                    React.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-check-circle-filled-24.svg", className: "e2-college-starter-modal__feature-icon" }),
                                    React.createElement("span", { className: "e2-college-starter-modal__feature-text" },
                                        "Get ",
                                        Marketing__namespace.com_study_cx_claims_cs1CourseCount,
                                        "+ general education college courses for credit")),
                                React.createElement("li", { className: "e2-college-starter-modal__feature" },
                                    React.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-check-circle-filled-24.svg", className: "e2-college-starter-modal__feature-icon" }),
                                    React.createElement("span", { className: "e2-college-starter-modal__feature-text" }, "Complete unlimited courses each month")),
                                React.createElement("li", { className: "e2-college-starter-modal__feature" },
                                    React.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-check-circle-filled-24.svg", className: "e2-college-starter-modal__feature-icon" }),
                                    React.createElement("span", { className: "e2-college-starter-modal__feature-text" }, "Study anytime, anywhere with the app")))),
                        React.createElement("div", { className: "e2-college-starter-modal__buttons" },
                            React.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.PRIMARY, href: seeDetailsHref, tag: "a", className: "e2-college-starter-modal__see-details", "data-cname": `${trackingProps["data-cname"]}__see_details`, "test-id": `${trackingProps["test-id"] || trackingProps["data-cname"]}__see_details` }, "Learn more")))))));
    };
    const CollegeStarter = Object.assign(CollegeStarterModal, {
        displayName: "CollegeStarterModal"
    });
    const CollegeStarterAutoModal = (_a) => {
        var { delaySeconds = 3, imageUrl = "/images/cx/cxhub/graduate-hugging-mother.png", seeDetailsHref = "/college/index.html", price } = _a, trackingProps = __rest(_a, ["delaySeconds", "imageUrl", "seeDetailsHref", "price"]);
        const [isModalOpen, setIsModalOpen] = React.useState(false);
        const [hasShown, setHasShown] = React.useState(false);
        const [showDismissedCard, setShowDismissedCard] = React.useState(false);
        React.useEffect(() => {
            const modalShown = sessionStorage.getItem('college-starter-modal-shown');
            if (!modalShown) {
                const timer = setTimeout(() => {
                    setIsModalOpen(true);
                    setHasShown(true);
                    sessionStorage.setItem('college-starter-modal-shown', 'true');
                }, delaySeconds * 1000);
                return () => clearTimeout(timer);
            }
            else {
                setShowDismissedCard(true);
            }
        }, [delaySeconds]);
        const handleClose = () => {
            setIsModalOpen(false);
        };
        const handleShowDismissedCard = () => {
            setShowDismissedCard(true);
        };
        const handleDismissedCardClose = () => {
            setShowDismissedCard(false);
        };
        return (React.createElement(React.Fragment, null,
            React.createElement(CollegeStarterModal, Object.assign({ isOpen: isModalOpen, onClose: handleClose, imageUrl: imageUrl, seeDetailsHref: seeDetailsHref, price: price, onShowDismissedCard: handleShowDismissedCard }, trackingProps)),
            showDismissedCard && (React.createElement(CollegeStarterDismissed, { seeDetailsHref: seeDetailsHref, price: price, onClose: handleDismissedCardClose, "data-cname": `${trackingProps["data-cname"]}__dismissed`, "test-id": `${trackingProps["test-id"] || trackingProps["data-cname"]}__dismissed` }))));
    };
    const CollegeStarterAuto = Object.assign(CollegeStarterAutoModal, {
        displayName: "CollegeStarterAutoModal"
    });
    const CollegeStarterBanner = (_a) => {
        var { imageUrl = "/images/cx/cxhub/college-starter-illustration.svg", seeDetailsHref = "/college/index.html", price, onClose, showCloseButton = false } = _a, trackingProps = __rest(_a, ["imageUrl", "seeDetailsHref", "price", "onClose", "showCloseButton"]);
        eurekaDesignSystem.LayoutHooks.useOnMobile();
        return (React.createElement("div", { className: "e2-college-starter-banner", "data-cname": trackingProps["data-cname"], "test-id": trackingProps["test-id"] || trackingProps["data-cname"] },
            showCloseButton && onClose && (React.createElement("button", { className: "e2-college-starter-banner__close-button", onClick: onClose, "aria-label": "Close banner", "data-cname": `${trackingProps["data-cname"]}__close`, "test-id": `${trackingProps["test-id"] || trackingProps["data-cname"]}__close` },
                React.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-close-24.svg" }))),
            React.createElement("div", { className: "e2-college-starter-banner__container" },
                React.createElement("div", { className: "e2-college-starter-banner__illustration-section" },
                    React.createElement("img", { src: imageUrl, className: "e2-college-starter-banner__image", alt: "Student celebrating graduation" })),
                React.createElement("div", { className: "e2-college-starter-banner__content-section" },
                    React.createElement("div", { className: "e2-college-starter-banner__copy-section" },
                        React.createElement("h2", { className: "e2-college-starter-banner__headline" },
                            "Earn college credit with College Starter\u2014just $",
                            price,
                            "/month"),
                        React.createElement("div", { className: "e2-college-starter-banner__feature-list" },
                            React.createElement("div", { className: "e2-college-starter-banner__feature" },
                                React.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-check-circle-filled-24.svg", className: "e2-college-starter-banner__feature-icon" }),
                                React.createElement("span", { className: "e2-college-starter-banner__feature-text" },
                                    "Access ",
                                    Marketing__namespace.com_study_cx_claims_cs1CourseCount,
                                    "+ college courses for credit")),
                            React.createElement("div", { className: "e2-college-starter-banner__feature" },
                                React.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-check-circle-filled-24.svg", className: "e2-college-starter-banner__feature-icon" }),
                                React.createElement("span", { className: "e2-college-starter-banner__feature-text" }, "Complete unlimited courses each month")),
                            React.createElement("div", { className: "e2-college-starter-banner__feature" },
                                React.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-check-circle-filled-24.svg", className: "e2-college-starter-banner__feature-icon" }),
                                React.createElement("span", { className: "e2-college-starter-banner__feature-text" }, "Study anytime, anywhere with the app")))),
                    React.createElement("div", { className: "e2-college-starter-banner__cta-section" },
                        React.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.PRIMARY, href: seeDetailsHref, tag: "a", className: "e2-college-starter-banner__primary-cta", "data-cname": `${trackingProps["data-cname"]}__learn_more`, "test-id": `${trackingProps["test-id"] || trackingProps["data-cname"]}__learn_more` }, "Learn more"))))));
    };
    const CollegeStarterOverlay = (_a) => {
        var { seeDetailsHref = "/college/index.html", price, onClose, showCloseButton = false } = _a, trackingProps = __rest(_a, ["seeDetailsHref", "price", "onClose", "showCloseButton"]);
        const accordionCommands = eurekaDesignSystem.useStudyImperativeHandle();
        const overlayShown = sessionStorage.getItem('college-starter-overlay-shown');
        const isFirstTime = !overlayShown;
        React.useEffect(() => {
            if (isFirstTime) {
                sessionStorage.setItem('college-starter-overlay-shown', 'true');
            }
        }, [isFirstTime]);
        return (React.createElement("div", { className: "e2-college-starter-overlay", "data-cname": trackingProps["data-cname"], "test-id": trackingProps["test-id"] || trackingProps["data-cname"] },
            showCloseButton && onClose && (React.createElement("button", { className: "e2-college-starter-overlay__close-button", onClick: onClose, "aria-label": "Close overlay", "data-cname": `${trackingProps["data-cname"]}__close`, "test-id": `${trackingProps["test-id"] || trackingProps["data-cname"]}__close` },
                React.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-close-24.svg" }))),
            React.createElement("div", { className: "e2-college-starter-overlay__container" },
                React.createElement("div", { className: "e2-college-starter-overlay__accordion" },
                    React.createElement(eurekaDesignSystem.Accordion, { commands: accordionCommands, invertDisclosureIcon: true },
                        React.createElement(eurekaDesignSystem.Accordion.Section, { className: "e2-college-starter-overlay__accordion-section", heading: `College credit—now just $${price}/month`, variant: eurekaDesignSystem.Accordion.Variant.MINOR, defaultOpen: isFirstTime, "data-cname": `${trackingProps["data-cname"]}__accordion_section`, "test-id": `${trackingProps["test-id"] || trackingProps["data-cname"]}__accordion_section` },
                            React.createElement("p", { className: "e2-college-starter-overlay__description" }, "Earn college credit for less when you sign up for College Starter."),
                            React.createElement("div", { className: "e2-college-starter-overlay__cta-section" },
                                React.createElement(eurekaDesignSystem.Button, { variant: eurekaDesignSystem.Button.Variant.PRIMARY, href: seeDetailsHref, tag: "a", className: "e2-college-starter-overlay__primary-cta", "data-cname": `${trackingProps["data-cname"]}__learn_more`, "test-id": `${trackingProps["test-id"] || trackingProps["data-cname"]}__learn_more` }, "Learn more"))))))));
    };
    const CollegeStarterDismissed = (_a) => {
        var { seeDetailsHref = "/college/index.html", price, onClose, onLearnMoreClick } = _a, trackingProps = __rest(_a, ["seeDetailsHref", "price", "onClose", "onLearnMoreClick"]);
        const handleLearnMoreClick = (e) => {
            if (onLearnMoreClick) {
                e.preventDefault();
                onLearnMoreClick();
            }
        };
        return (React.createElement("div", { className: "e2-college-starter-dismissed", "data-cname": trackingProps["data-cname"], "test-id": trackingProps["test-id"] || trackingProps["data-cname"] },
            React.createElement("div", { className: "e2-college-starter-dismissed__container" },
                React.createElement("div", { className: "e2-college-starter-dismissed__icon" },
                    React.createElement(eurekaDesignSystem.MaterialIcon, { filename: "icon-grad-40.svg" })),
                React.createElement("div", { className: "e2-college-starter-dismissed__content" },
                    React.createElement("div", { className: "e2-college-starter-dismissed__title" },
                        "College credit\u2014now just $",
                        price,
                        "/month"),
                    React.createElement("a", { href: seeDetailsHref, className: "e2-college-starter-dismissed__learn-more", onClick: handleLearnMoreClick, "data-cname": `${trackingProps["data-cname"]}__learn_more`, "test-id": `${trackingProps["test-id"] || trackingProps["data-cname"]}__learn_more` }, "Learn more")))));
    };

    exports.CXCS1PlanInfoBox = CXCS1PlanInfoBox;
    exports.CXCS3PlanInfoBox = CXCS3PlanInfoBox;
    exports.CXClaimStatsModule = CXClaimStatsModule;
    exports.CXCourseSearch = CXCourseSearch;
    exports.CXHero = CXHero;
    exports.CXHubHero = CXHubHero;
    exports.CXHubTestimonialCarousel = CXHubTestimonialCarousel;
    exports.CXMajorSearch = CXMajorSearch;
    exports.CXPlanSideBySide = CXPlanSideBySide;
    exports.CXStepsHowItWorks = CXStepsHowItWorks;
    exports.CXUpgradeCourseCard = CXUpgradeCourseCard;
    exports.CXUpgradePlanSelector = CXUpgradePlanSelector;
    exports.CXValuePropModule = CXValuePropModule;
    exports.CXWhyStudentsChoose = CXWhyStudentsChoose;
    exports.CollegeStarter = CollegeStarter;
    exports.CollegeStarterAuto = CollegeStarterAuto;
    exports.CollegeStarterBanner = CollegeStarterBanner;
    exports.CollegeStarterOverlay = CollegeStarterOverlay;
    exports.CourseDetailsModal = CourseDetailsModal;
    exports.CoursesByPlan = CoursesByPlan;
    exports.CxHubCoursesFAQAccordion = CxHubCoursesFAQAccordion;
    exports.CxHubPricingFAQAccordion = CxHubPricingFAQAccordion;
    exports.CxHubTransferCreditFAQAccordion = CxHubTransferCreditFAQAccordion;
    exports.FAQAccordion = FAQAccordion;
    exports.FeaturedFAQAccordion = FeaturedFAQAccordion;
    exports.InterrupterTestimonial = InterrupterTestimonial;
    exports.PartnerCarousel = PartnerCarousel;
    exports.PartnerCarouselThenCards = PartnerCarouselThenCards;
    exports.PartnerSchoolCard = PartnerSchoolCard;
    exports.RegFormCourseCard = RegFormCourseCard;
    exports.SavingsCalculator = SavingsCalculator;
    exports.SchoolCard = SchoolCard;
    exports.SubjectCard = SubjectCard;
    exports.SubjectCarousel = SubjectCarousel;
    exports.TestimonialCarousel = TestimonialCarousel;
    exports.TrustpilotTestimonialConfigurable = TrustpilotTestimonialConfigurable;

}));
//# sourceMappingURL=ssr-cx.js.map

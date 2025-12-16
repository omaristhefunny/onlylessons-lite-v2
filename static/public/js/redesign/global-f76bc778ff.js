"use strict";
(function () {
    "use strict";
    var requireModules = [
        'jquery',
        '@sites-study-com/remspect',
        "@study-com/eureka-design-system",
        'lib/toastr',
        'logging/listrak',
        'lib/jquery/bootstrap',
        'lib/jquery/cookie',
        'bootstrapJs/bootstrap-tabcollapse',
        'lib/jquery-unveil/study.unveil',
        'components/survey/UserExperienceSurveyView',
    ];
    var shouldGoogleTranslate = document.querySelector("#shouldGoogleTranslate");
    if (shouldGoogleTranslate) {
        requireModules.push('lib/google/translate');
    }
    if (document.querySelector("#useGenericFreshchatWidget")) {
        requireModules.push('redesign/generic-advisor');
    }
    window.setTimeout(function () {
        var linkAlternateList = document.querySelectorAll("[data-deferred-css]");
        for (var i = 0; i < linkAlternateList.length; i++) {
            var link = linkAlternateList[i];
            link.setAttribute("rel", "stylesheet");
        }
    }, 1000);
    require(requireModules, init);
    window["googleTranslateElementInit"] = function () {
        new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false }, 'google_translate_element');
    };
    function init($, remspect, eureka) {
        "use strict";
        eureka.setDefaultConfiguration({ assetBaseUri: "/images/eureka-lib" });
        setUpStickyMenu();
        setUpCarouselSwiping();
        var regModalGoHere = document.getElementById("regModalGoHere");
        if (regModalGoHere) {
            if (remspect.isControl("regFormRebrand")) {
                setUpPartialRegModal();
            }
            else {
                setUpE2PartialRegModal();
            }
        }
        if (document.querySelector("react-init, [react-init]") !== null) {
            require(["react-utils/react-study-helpers"], function (reactHelperModule) {
                reactHelperModule.reactBootstrap(document);
            });
        }
        if (document.querySelector("react-ssr") !== null) {
            require(["react-utils/react-study-helpers"], function (reactHelperModule) {
                reactHelperModule.rehydrateReactSSR(document);
            });
        }
        $(document).ready(function () {
            removeNavItemIfWraps();
            navSearch();
            collapseMobileNav();
            googleTranslateListeners();
            preventDefaultMobileNav();
            if (remspect.isControl('requireResearch')) {
                submitMiniForms();
            }
            $('.ios-scrollable').on('touchstart', function (e) { });
            navOverride();
            triggerTooltips();
            initSeeMoreSeeLessToggle();
            $('[data-preventDefault="true"]').on('click', function (e) { e.preventDefault(); });
            $('.vertSubTabs').tabCollapse({
                tabsClass: 'visible',
                accordionClass: ''
            });
            dropdownAccordion();
            initPlaceholderSwap();
            hideStudyTrainerCtas();
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
            $("[study-nav-popout], .course-popout").each(function (index, dom) {
                var element = $(dom);
                var parent = element.closest(".popoutContainer");
                var popoutId = element.attr("study-nav-popout") || element.attr("id");
                var indexToShow = $(element).attr('data-nav-popout');
                var subelementToShow = $(parent).find(".course-popout")[parseInt(indexToShow)];
                element.on("mouseover", function () {
                    parent.addClass("show-popout-nav");
                    element.addClass("nav-dropdown-2nd-level__selected");
                    try {
                        $(subelementToShow).addClass("selected");
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
                element.on("mouseout", function () {
                    parent.removeClass("show-popout-nav");
                    element.removeClass("nav-dropdown-2nd-level__selected");
                    try {
                        $(subelementToShow).removeClass("selected");
                    }
                    catch (e) {
                        console.error(e);
                    }
                });
            });
        });
        function googleTranslateListeners() {
            $("[data-language-list]").on("click", "a", function () {
                var lang = $(this).attr("data-googtrans-cookie");
                var domain = "study.com";
                var hostParts = window.location.host.split(".");
                var numHostParts = hostParts.length;
                if (numHostParts > 1) {
                    domain = hostParts[numHostParts - 2] + '.' + hostParts[numHostParts - 1];
                }
                $.cookie("googtrans", lang, { path: "/", domain: domain });
                $.cookie("googtrans", lang, { path: "/" });
                location.reload();
            });
        }
        function preventDefaultMobileNav() {
            var maxWidth = window.matchMedia("(max-width: 991.9px)");
            $("body").on("click", "[data-prevent-default-mobile]", function (e) {
                if (maxWidth.matches) {
                    e.preventDefault();
                }
            });
        }
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        function initSeeMoreSeeLessToggle() {
            $('.seeMore').click(function () {
                $(this).parent().children('.displayNone').toggle();
                if ($(window).width() < 481) {
                    $(this).parent().children('.displayDesktop').toggle();
                }
                else {
                    $(this).parent().children('.displayDesktop').show();
                }
                var showMoreToggleText = $(this).html();
                if (showMoreToggleText.match(/more/i) !== null) {
                    $(this).html($(this).html().replace('more', 'less'));
                }
                else {
                    $(this).html($(this).html().replace('less', 'more'));
                }
            });
        }
        function submitMiniForms() {
            $('body').on('change', '.miniformSelect', function () {
                $(this).closest('.miniform').submit();
            });
        }
        function triggerTooltips() {
            $('#fullSchoolDisclaimer, #sidebarDisclaimer').tooltip();
            $("[data-tooltip]").each(function () {
                var elem = $(this);
                var triggers = elem.data('tooltip').split(' ');
                var showTooltip = function () {
                    elem.tooltip('show');
                };
                for (var i = 0; i < triggers.length; i++) {
                    elem.on(triggers[i], showTooltip);
                }
            });
            $('body').on('click', function (e) {
                $('[data-toggle="tooltip"]').each(function () {
                    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.tooltip').has(e.target).length === 0) {
                        $(this).tooltip('hide');
                    }
                });
            });
        }
        function navOverride() {
            $('.newNavContainer .collapseHeader').on('click touch', function () { });
            $('.mNav').on('click', function () {
                $(this).parent().toggleClass('open');
            });
            $(window).on('resize', function () {
                if ($(window).width() > 768) {
                    $('.newNavContainer .dropdown').removeClass('open');
                }
            });
        }
        function dropdownAccordion() {
            $('.dropdown-accordion').on('click', 'a[data-toggle="collapse"]', function (event) {
                event.preventDefault();
                event.stopPropagation();
                $($(this).data('parent')).find('.panel-collapse.in').collapse('hide');
                $($(this).attr('href')).collapse('show');
            });
        }
        function initPlaceholderSwap() {
            var placeholders = $('[placeholder]');
            placeholders.each(function () {
                var $elem = $(this);
                $elem.attr('data-placeholder', $elem.attr('placeholder'));
            });
            placeholders.on('focusin', function () {
                $(this).attr('placeholder', '');
            });
            placeholders.on('focusout', function () {
                $(this).attr('placeholder', $(this).attr('data-placeholder'));
            });
        }
        function isLocalStorageEnabled() {
            var testString = 'testString';
            try {
                window.localStorage.setItem(testString, testString);
                window.localStorage.removeItem(testString);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        function hideStudyTrainerCtas() {
            if (isLocalStorageEnabled() && window.localStorage.getItem('hasStudyTrainer') === 'false') {
                $('[data-study-trainer-cta]').each(function () {
                    $(this).removeClass('hidden');
                    var replacementSelector = $(this).data('study-trainer-cta');
                    if (replacementSelector) {
                        $(replacementSelector).addClass('hidden');
                    }
                });
            }
        }
        function collapseMobileNav() {
            var navBar = $('.study-nav');
            navBar.on('click', '.collapse .study-nav__member-nav a', function () {
                $('#navsContainer').collapse('hide');
            });
        }
        function navSearch() {
            $(document).ready(function () {
                $(".searchTrigger").unbind("click");
                $(".searchTrigger").click(function () {
                    var mobileSearchBar = $(".xs-search");
                    if (mobileSearchBar.hasClass("open")) {
                        mobileSearchBar.removeClass("open");
                    }
                    else {
                        mobileSearchBar.addClass("open");
                    }
                });
            });
        }
        function removeNavItemIfWraps() {
            var fudgeFactor = 1;
            var singleLineHeight = (remspect.isControl("topNavRebrand2025") ? 60 : 80) + fudgeFactor;
            var nav = document.querySelector(".study-nav__main");
            var items = document.querySelectorAll("[data-top-nav-overflow-removal]");
            if (window.matchMedia('(min-width: 992px)').matches) {
                if (nav != null && nav.getBoundingClientRect().height > singleLineHeight && items != null && items.length > 0) {
                    items.forEach(function (item) {
                        if (item != null) {
                            item.classList.add("hidden");
                        }
                    });
                }
            }
        }
        function setUpStickyMenu() {
            var $stickyMenu = $("#sticky-menu");
            if ($stickyMenu.length <= 0) {
                return;
            }
            var $menuAnchors = $stickyMenu.find("a.nav-link");
            var idToOffset = {};
            var idList = [];
            for (var _i = 0, $menuAnchors_1 = $menuAnchors; _i < $menuAnchors_1.length; _i++) {
                var menuAnchor = $menuAnchors_1[_i];
                var href = $(menuAnchor).attr("href");
                var id = href.substring(1);
                var offsetTop = $(href).offset().top;
                if (offsetTop > 0) {
                    idToOffset[id] = offsetTop;
                    idList.push(id);
                }
            }
            window.onscroll = function () {
                var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
                var lastIdBeforeScroll = null;
                for (var _i = 0, idList_1 = idList; _i < idList_1.length; _i++) {
                    var id = idList_1[_i];
                    var offset = idToOffset[id];
                    if (offset <= (scrollPosition + 60)) {
                        lastIdBeforeScroll = id;
                    }
                }
                if (lastIdBeforeScroll) {
                    $stickyMenu.find("a.nav-link").removeClass("active");
                    $stickyMenu.find('[href="#' + lastIdBeforeScroll + '"]').addClass("active");
                }
            };
        }
        function setUpCarouselSwiping() {
            var carousel = $(".carousel");
            carousel.on('slide.bs.carousel', function (event) {
                var items = $(event.currentTarget).find(".item");
                $(items).removeClass("next");
                $(items).removeClass("prev");
            });
            carousel.on('slid.bs.carousel', function (event) {
                var items = $(event.currentTarget).find(".item");
                var activeSlideIndex;
                $.each(items, function (index, item) {
                    if ($(item).hasClass("active")) {
                        activeSlideIndex = index;
                    }
                });
                if (activeSlideIndex >= 0) {
                    $(items[activeSlideIndex - 1]).addClass("prev");
                }
                if ((activeSlideIndex + 1) < items.length) {
                    $(items[activeSlideIndex + 1]).addClass("next");
                }
            });
            carousel.on("touchstart", function (event) {
                var touchStartEvent = event.originalEvent;
                var toucheStartX = touchStartEvent.touches[0].pageX;
                $(this).one("touchmove", function (event) {
                    var touchMoveEvent = event.originalEvent;
                    var touchMoveX = touchMoveEvent.touches[0].pageX;
                    if (Math.floor(toucheStartX - touchMoveX) < -5) {
                        $(this).carousel('prev');
                    }
                    else if (Math.floor(toucheStartX - touchMoveX) > 5) {
                        $(this).carousel('next');
                    }
                });
                $(this).on("touchend", function () {
                    $(this).off("touchmove");
                });
            });
        }
    }
    function setUpPartialRegModal() {
        var $regModal = $("#partialRegFormModal");
        var triggerElement;
        $regModal.one("show.bs.modal", function (event) { return triggerElement = event.relatedTarget; });
        require(["registration/ReactRegModal.app"], function (ReactRegModalApp) {
            var isModalOpened = $("#partialRegFormModal.in").length > 0;
            if (isModalOpened) {
                ReactRegModalApp.initReactRegModalApp(triggerElement);
            }
            else {
                $regModal.one("show.bs.modal", function (e) { return ReactRegModalApp.initReactRegModalApp(triggerElement); });
                $regModal.one("shown.bs.modal", function (e) { return ReactRegModalApp.initReactRegModalApp(triggerElement); });
            }
        });
    }
    function setUpE2PartialRegModal() {
        var CTA_SELECTOR = "[data-toggle=modal][data-target=\"#partialRegFormModal\"], [data-toggle=modal][href=\"#partialRegFormModal\"]";
        document.addEventListener("click", function (event) {
            var cta = event.target.closest(CTA_SELECTOR);
            if (cta) {
                require(["registration/ReactRegModal.app"], function (_a) {
                    var openE2RegModal = _a.openE2RegModal;
                    openE2RegModal(cta);
                });
                event.preventDefault();
            }
        });
    }
})();

//# sourceMappingURL=global.js.map

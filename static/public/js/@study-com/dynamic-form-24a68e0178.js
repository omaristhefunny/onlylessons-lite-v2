define(['exports', '@study-com/eureka-design-system', 'react', 'react-dom', 'mobx-react', 'mobx'], (function (exports, eurekaDesignSystem, React, ReactDOM, mobxReact, mobx) { 'use strict';

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

  function legacyCombinedRef(...refs) {
      return (current) => {
          for (const ref of refs) {
              if (typeof ref === "function") {
                  ref(current);
              }
              else if (ref) {
                  ref.current = current;
              }
          }
      };
  }

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function isElement$1(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }

    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  var applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$2,
    requires: ['computeStyles']
  };

  function getBasePlacement$1(placement) {
    return placement.split('-')[0];
  }

  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function getUAString() {
    var uaData = navigator.userAgentData;

    if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
      return uaData.brands.map(function (item) {
        return item.brand + "/" + item.version;
      }).join(' ');
    }

    return navigator.userAgent;
  }

  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
      includeScale = false;
    }

    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }

    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;

    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }

    var _ref = isElement$1(element) ? getWindow(element) : window,
        visualViewport = _ref.visualViewport;

    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width: width,
      height: height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x: x,
      y: y
    };
  }

  // means it doesn't take into account transforms.

  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }

    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }

    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    };
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || ( // DOM Element detected
      isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());

    if (isIE && isHTMLElement(element)) {
      // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
      var elementCss = getComputedStyle(element);

      if (elementCss.position === 'fixed') {
        return null;
      }
    }

    var currentNode = getParentNode(element);

    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

      if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min, value, max) {
    var v = within(min, value, max);
    return v > max ? max : v;
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement$1(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect$1(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {
      return;
    }

    state.elements.arrow = arrowElement;
  } // eslint-disable-next-line import/no-unused-modules


  var arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$1,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x,
        y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets,
        isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x,
        x = _offsets$x === void 0 ? 0 : _offsets$x,
        _offsets$y = offsets.y,
        y = _offsets$y === void 0 ? 0 : _offsets$y;

    var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };

    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = 'clientHeight';
      var widthProp = 'clientWidth';

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);

        if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
          heightProp = 'scrollHeight';
          widthProp = 'scrollWidth';
        }
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


      offsetParent = offsetParent;

      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
        offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
        offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x: x,
      y: y
    }, getWindow(popper)) : {
      x: x,
      y: y
    };

    x = _ref4.x;
    y = _ref4.y;

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref5) {
    var state = _ref5.state,
        options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement$1(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration,
      isFixed: state.options.strategy === 'fixed'
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  var passive = {
    passive: true
  };

  function effect(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  var eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect,
    data: {}
  };

  var hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash$1[matched];
    });
  }

  var hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash[matched];
    });
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var layoutViewport = isLayoutViewport();

      if (layoutViewport || !layoutViewport && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var _element$ownerDocumen;

    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */

  function listScrollParents(element, list) {
    var _element$ownerDocumen;

    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === 'fixed');
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement$1(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent, strategy));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement$1(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$strategy = _options.strategy,
        strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement$1(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement$1(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement$1(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement$1(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement$1(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  var flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  var hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement$1(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement$1(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis) {
      var _offsetModifierState$;

      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min$1 = offset + overflow[mainSide];
      var max$1 = offset - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _offsetModifierState$2;

      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _len = altAxis === 'y' ? 'height' : 'width';

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  } // Returns the composite rect of an element relative to its offsetParent.
  // Composite means it takes into account transforms as well as layout.


  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce$1(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(setOptionsAction) {
          var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          });
          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {
            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });

          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce$1(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {
        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref) {
          var name = _ref.name,
              _ref$options = _ref.options,
              options = _ref$options === void 0 ? {} : _ref$options,
              effect = _ref.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  /**!
  * tippy.js v6.3.7
  * (c) 2017-2021 atomiks
  * MIT License
  */
  var BOX_CLASS = "tippy-box";
  var CONTENT_CLASS = "tippy-content";
  var BACKDROP_CLASS = "tippy-backdrop";
  var ARROW_CLASS = "tippy-arrow";
  var SVG_ARROW_CLASS = "tippy-svg-arrow";
  var TOUCH_OPTIONS = {
    passive: true,
    capture: true
  };
  var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
    return document.body;
  };
  function getValueAtIndexOrReturn(value, index, defaultValue) {
    if (Array.isArray(value)) {
      var v = value[index];
      return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
    }

    return value;
  }
  function isType(value, type) {
    var str = {}.toString.call(value);
    return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
  }
  function invokeWithArgsOrReturn(value, args) {
    return typeof value === 'function' ? value.apply(void 0, args) : value;
  }
  function debounce(fn, ms) {
    // Avoid wrapping in `setTimeout` if ms is 0 anyway
    if (ms === 0) {
      return fn;
    }

    var timeout;
    return function (arg) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        fn(arg);
      }, ms);
    };
  }
  function splitBySpaces(value) {
    return value.split(/\s+/).filter(Boolean);
  }
  function normalizeToArray(value) {
    return [].concat(value);
  }
  function pushIfUnique(arr, value) {
    if (arr.indexOf(value) === -1) {
      arr.push(value);
    }
  }
  function unique(arr) {
    return arr.filter(function (item, index) {
      return arr.indexOf(item) === index;
    });
  }
  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }
  function arrayFrom(value) {
    return [].slice.call(value);
  }
  function removeUndefinedProps(obj) {
    return Object.keys(obj).reduce(function (acc, key) {
      if (obj[key] !== undefined) {
        acc[key] = obj[key];
      }

      return acc;
    }, {});
  }

  function div() {
    return document.createElement('div');
  }
  function isElement(value) {
    return ['Element', 'Fragment'].some(function (type) {
      return isType(value, type);
    });
  }
  function isNodeList(value) {
    return isType(value, 'NodeList');
  }
  function isMouseEvent(value) {
    return isType(value, 'MouseEvent');
  }
  function isReferenceElement(value) {
    return !!(value && value._tippy && value._tippy.reference === value);
  }
  function getArrayOfElements(value) {
    if (isElement(value)) {
      return [value];
    }

    if (isNodeList(value)) {
      return arrayFrom(value);
    }

    if (Array.isArray(value)) {
      return value;
    }

    return arrayFrom(document.querySelectorAll(value));
  }
  function setTransitionDuration(els, value) {
    els.forEach(function (el) {
      if (el) {
        el.style.transitionDuration = value + "ms";
      }
    });
  }
  function setVisibilityState(els, state) {
    els.forEach(function (el) {
      if (el) {
        el.setAttribute('data-state', state);
      }
    });
  }
  function getOwnerDocument(elementOrElements) {
    var _element$ownerDocumen;

    var _normalizeToArray = normalizeToArray(elementOrElements),
        element = _normalizeToArray[0]; // Elements created via a <template> have an ownerDocument with no reference to the body


    return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
  }
  function isCursorOutsideInteractiveBorder(popperTreeData, event) {
    var clientX = event.clientX,
        clientY = event.clientY;
    return popperTreeData.every(function (_ref) {
      var popperRect = _ref.popperRect,
          popperState = _ref.popperState,
          props = _ref.props;
      var interactiveBorder = props.interactiveBorder;
      var basePlacement = getBasePlacement(popperState.placement);
      var offsetData = popperState.modifiersData.offset;

      if (!offsetData) {
        return true;
      }

      var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
      var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
      var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
      var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
      var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
      var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
      var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
      var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
      return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
    });
  }
  function updateTransitionEndListener(box, action, listener) {
    var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
    // `webkitTransitionEnd`...

    ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
      box[method](event, listener);
    });
  }
  /**
   * Compared to xxx.contains, this function works for dom structures with shadow
   * dom
   */

  function actualContains(parent, child) {
    var target = child;

    while (target) {
      var _target$getRootNode;

      if (parent.contains(target)) {
        return true;
      }

      target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
    }

    return false;
  }

  var currentInput = {
    isTouch: false
  };
  var lastMouseMoveTime = 0;
  /**
   * When a `touchstart` event is fired, it's assumed the user is using touch
   * input. We'll bind a `mousemove` event listener to listen for mouse input in
   * the future. This way, the `isTouch` property is fully dynamic and will handle
   * hybrid devices that use a mix of touch + mouse input.
   */

  function onDocumentTouchStart() {
    if (currentInput.isTouch) {
      return;
    }

    currentInput.isTouch = true;

    if (window.performance) {
      document.addEventListener('mousemove', onDocumentMouseMove);
    }
  }
  /**
   * When two `mousemove` event are fired consecutively within 20ms, it's assumed
   * the user is using mouse input again. `mousemove` can fire on touch devices as
   * well, but very rarely that quickly.
   */

  function onDocumentMouseMove() {
    var now = performance.now();

    if (now - lastMouseMoveTime < 20) {
      currentInput.isTouch = false;
      document.removeEventListener('mousemove', onDocumentMouseMove);
    }

    lastMouseMoveTime = now;
  }
  /**
   * When an element is in focus and has a tippy, leaving the tab/window and
   * returning causes it to show again. For mouse users this is unexpected, but
   * for keyboard use it makes sense.
   * TODO: find a better technique to solve this problem
   */

  function onWindowBlur() {
    var activeElement = document.activeElement;

    if (isReferenceElement(activeElement)) {
      var instance = activeElement._tippy;

      if (activeElement.blur && !instance.state.isVisible) {
        activeElement.blur();
      }
    }
  }
  function bindGlobalEventListeners() {
    document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
    window.addEventListener('blur', onWindowBlur);
  }

  var isBrowser$1 = typeof document !== 'undefined';
  var isIE11 = isBrowser$1 ? // @ts-ignore
  !!window.msCrypto : false;

  var pluginProps = {
    animateFill: false,
    followCursor: false,
    inlinePositioning: false,
    sticky: false
  };
  var renderProps = {
    allowHTML: false,
    animation: 'fade',
    arrow: true,
    content: '',
    inertia: false,
    maxWidth: 350,
    role: 'tooltip',
    theme: '',
    zIndex: 9999
  };
  var defaultProps = Object.assign({
    appendTo: TIPPY_DEFAULT_APPEND_TO,
    aria: {
      content: 'auto',
      expanded: 'auto'
    },
    delay: 0,
    duration: [300, 250],
    getReferenceClientRect: null,
    hideOnClick: true,
    ignoreAttributes: false,
    interactive: false,
    interactiveBorder: 2,
    interactiveDebounce: 0,
    moveTransition: '',
    offset: [0, 10],
    onAfterUpdate: function onAfterUpdate() {},
    onBeforeUpdate: function onBeforeUpdate() {},
    onCreate: function onCreate() {},
    onDestroy: function onDestroy() {},
    onHidden: function onHidden() {},
    onHide: function onHide() {},
    onMount: function onMount() {},
    onShow: function onShow() {},
    onShown: function onShown() {},
    onTrigger: function onTrigger() {},
    onUntrigger: function onUntrigger() {},
    onClickOutside: function onClickOutside() {},
    placement: 'top',
    plugins: [],
    popperOptions: {},
    render: null,
    showOnCreate: false,
    touch: true,
    trigger: 'mouseenter focus',
    triggerTarget: null
  }, pluginProps, renderProps);
  var defaultKeys = Object.keys(defaultProps);
  var setDefaultProps = function setDefaultProps(partialProps) {

    var keys = Object.keys(partialProps);
    keys.forEach(function (key) {
      defaultProps[key] = partialProps[key];
    });
  };
  function getExtendedPassedProps(passedProps) {
    var plugins = passedProps.plugins || [];
    var pluginProps = plugins.reduce(function (acc, plugin) {
      var name = plugin.name,
          defaultValue = plugin.defaultValue;

      if (name) {
        var _name;

        acc[name] = passedProps[name] !== undefined ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
      }

      return acc;
    }, {});
    return Object.assign({}, passedProps, pluginProps);
  }
  function getDataAttributeProps(reference, plugins) {
    var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
      plugins: plugins
    }))) : defaultKeys;
    var props = propKeys.reduce(function (acc, key) {
      var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

      if (!valueAsString) {
        return acc;
      }

      if (key === 'content') {
        acc[key] = valueAsString;
      } else {
        try {
          acc[key] = JSON.parse(valueAsString);
        } catch (e) {
          acc[key] = valueAsString;
        }
      }

      return acc;
    }, {});
    return props;
  }
  function evaluateProps(reference, props) {
    var out = Object.assign({}, props, {
      content: invokeWithArgsOrReturn(props.content, [reference])
    }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
    out.aria = Object.assign({}, defaultProps.aria, out.aria);
    out.aria = {
      expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
      content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
    };
    return out;
  }

  var innerHTML = function innerHTML() {
    return 'innerHTML';
  };

  function dangerouslySetInnerHTML(element, html) {
    element[innerHTML()] = html;
  }

  function createArrowElement(value) {
    var arrow = div();

    if (value === true) {
      arrow.className = ARROW_CLASS;
    } else {
      arrow.className = SVG_ARROW_CLASS;

      if (isElement(value)) {
        arrow.appendChild(value);
      } else {
        dangerouslySetInnerHTML(arrow, value);
      }
    }

    return arrow;
  }

  function setContent(content, props) {
    if (isElement(props.content)) {
      dangerouslySetInnerHTML(content, '');
      content.appendChild(props.content);
    } else if (typeof props.content !== 'function') {
      if (props.allowHTML) {
        dangerouslySetInnerHTML(content, props.content);
      } else {
        content.textContent = props.content;
      }
    }
  }
  function getChildren(popper) {
    var box = popper.firstElementChild;
    var boxChildren = arrayFrom(box.children);
    return {
      box: box,
      content: boxChildren.find(function (node) {
        return node.classList.contains(CONTENT_CLASS);
      }),
      arrow: boxChildren.find(function (node) {
        return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
      }),
      backdrop: boxChildren.find(function (node) {
        return node.classList.contains(BACKDROP_CLASS);
      })
    };
  }
  function render(instance) {
    var popper = div();
    var box = div();
    box.className = BOX_CLASS;
    box.setAttribute('data-state', 'hidden');
    box.setAttribute('tabindex', '-1');
    var content = div();
    content.className = CONTENT_CLASS;
    content.setAttribute('data-state', 'hidden');
    setContent(content, instance.props);
    popper.appendChild(box);
    box.appendChild(content);
    onUpdate(instance.props, instance.props);

    function onUpdate(prevProps, nextProps) {
      var _getChildren = getChildren(popper),
          box = _getChildren.box,
          content = _getChildren.content,
          arrow = _getChildren.arrow;

      if (nextProps.theme) {
        box.setAttribute('data-theme', nextProps.theme);
      } else {
        box.removeAttribute('data-theme');
      }

      if (typeof nextProps.animation === 'string') {
        box.setAttribute('data-animation', nextProps.animation);
      } else {
        box.removeAttribute('data-animation');
      }

      if (nextProps.inertia) {
        box.setAttribute('data-inertia', '');
      } else {
        box.removeAttribute('data-inertia');
      }

      box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

      if (nextProps.role) {
        box.setAttribute('role', nextProps.role);
      } else {
        box.removeAttribute('role');
      }

      if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
        setContent(content, instance.props);
      }

      if (nextProps.arrow) {
        if (!arrow) {
          box.appendChild(createArrowElement(nextProps.arrow));
        } else if (prevProps.arrow !== nextProps.arrow) {
          box.removeChild(arrow);
          box.appendChild(createArrowElement(nextProps.arrow));
        }
      } else if (arrow) {
        box.removeChild(arrow);
      }
    }

    return {
      popper: popper,
      onUpdate: onUpdate
    };
  } // Runtime check to identify if the render function is the default one; this
  // way we can apply default CSS transitions logic and it can be tree-shaken away

  render.$$tippy = true;

  var idCounter = 1;
  var mouseMoveListeners = []; // Used by `hideAll()`

  var mountedInstances = [];
  function createTippy(reference, passedProps) {
    var props = evaluateProps(reference, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
    // 🔒 Private members
    // ===========================================================================

    var showTimeout;
    var hideTimeout;
    var scheduleHideAnimationFrame;
    var isVisibleFromClick = false;
    var didHideDueToDocumentMouseDown = false;
    var didTouchMove = false;
    var ignoreOnFirstUpdate = false;
    var lastTriggerEvent;
    var currentTransitionEndListener;
    var onFirstUpdate;
    var listeners = [];
    var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
    var currentTarget; // ===========================================================================
    // 🔑 Public members
    // ===========================================================================

    var id = idCounter++;
    var popperInstance = null;
    var plugins = unique(props.plugins);
    var state = {
      // Is the instance currently enabled?
      isEnabled: true,
      // Is the tippy currently showing and not transitioning out?
      isVisible: false,
      // Has the instance been destroyed?
      isDestroyed: false,
      // Is the tippy currently mounted to the DOM?
      isMounted: false,
      // Has the tippy finished transitioning in?
      isShown: false
    };
    var instance = {
      // properties
      id: id,
      reference: reference,
      popper: div(),
      popperInstance: popperInstance,
      props: props,
      state: state,
      plugins: plugins,
      // methods
      clearDelayTimeouts: clearDelayTimeouts,
      setProps: setProps,
      setContent: setContent,
      show: show,
      hide: hide,
      hideWithInteractivity: hideWithInteractivity,
      enable: enable,
      disable: disable,
      unmount: unmount,
      destroy: destroy
    }; // TODO: Investigate why this early return causes a TDZ error in the tests —
    // it doesn't seem to happen in the browser

    /* istanbul ignore if */

    if (!props.render) {

      return instance;
    } // ===========================================================================
    // Initial mutations
    // ===========================================================================


    var _props$render = props.render(instance),
        popper = _props$render.popper,
        onUpdate = _props$render.onUpdate;

    popper.setAttribute('data-tippy-root', '');
    popper.id = "tippy-" + instance.id;
    instance.popper = popper;
    reference._tippy = instance;
    popper._tippy = instance;
    var pluginsHooks = plugins.map(function (plugin) {
      return plugin.fn(instance);
    });
    var hasAriaExpanded = reference.hasAttribute('aria-expanded');
    addListeners();
    handleAriaExpandedAttribute();
    handleStyles();
    invokeHook('onCreate', [instance]);

    if (props.showOnCreate) {
      scheduleShow();
    } // Prevent a tippy with a delay from hiding if the cursor left then returned
    // before it started hiding


    popper.addEventListener('mouseenter', function () {
      if (instance.props.interactive && instance.state.isVisible) {
        instance.clearDelayTimeouts();
      }
    });
    popper.addEventListener('mouseleave', function () {
      if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
        getDocument().addEventListener('mousemove', debouncedOnMouseMove);
      }
    });
    return instance; // ===========================================================================
    // 🔒 Private methods
    // ===========================================================================

    function getNormalizedTouchSettings() {
      var touch = instance.props.touch;
      return Array.isArray(touch) ? touch : [touch, 0];
    }

    function getIsCustomTouchBehavior() {
      return getNormalizedTouchSettings()[0] === 'hold';
    }

    function getIsDefaultRenderFn() {
      var _instance$props$rende;

      // @ts-ignore
      return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
    }

    function getCurrentTarget() {
      return currentTarget || reference;
    }

    function getDocument() {
      var parent = getCurrentTarget().parentNode;
      return parent ? getOwnerDocument(parent) : document;
    }

    function getDefaultTemplateChildren() {
      return getChildren(popper);
    }

    function getDelay(isShow) {
      // For touch or keyboard input, force `0` delay for UX reasons
      // Also if the instance is mounted but not visible (transitioning out),
      // ignore delay
      if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
        return 0;
      }

      return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
    }

    function handleStyles(fromHide) {
      if (fromHide === void 0) {
        fromHide = false;
      }

      popper.style.pointerEvents = instance.props.interactive && !fromHide ? '' : 'none';
      popper.style.zIndex = "" + instance.props.zIndex;
    }

    function invokeHook(hook, args, shouldInvokePropsHook) {
      if (shouldInvokePropsHook === void 0) {
        shouldInvokePropsHook = true;
      }

      pluginsHooks.forEach(function (pluginHooks) {
        if (pluginHooks[hook]) {
          pluginHooks[hook].apply(pluginHooks, args);
        }
      });

      if (shouldInvokePropsHook) {
        var _instance$props;

        (_instance$props = instance.props)[hook].apply(_instance$props, args);
      }
    }

    function handleAriaContentAttribute() {
      var aria = instance.props.aria;

      if (!aria.content) {
        return;
      }

      var attr = "aria-" + aria.content;
      var id = popper.id;
      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function (node) {
        var currentValue = node.getAttribute(attr);

        if (instance.state.isVisible) {
          node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
        } else {
          var nextValue = currentValue && currentValue.replace(id, '').trim();

          if (nextValue) {
            node.setAttribute(attr, nextValue);
          } else {
            node.removeAttribute(attr);
          }
        }
      });
    }

    function handleAriaExpandedAttribute() {
      if (hasAriaExpanded || !instance.props.aria.expanded) {
        return;
      }

      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function (node) {
        if (instance.props.interactive) {
          node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
        } else {
          node.removeAttribute('aria-expanded');
        }
      });
    }

    function cleanupInteractiveMouseListeners() {
      getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
      mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
        return listener !== debouncedOnMouseMove;
      });
    }

    function onDocumentPress(event) {
      // Moved finger to scroll instead of an intentional tap outside
      if (currentInput.isTouch) {
        if (didTouchMove || event.type === 'mousedown') {
          return;
        }
      }

      var actualTarget = event.composedPath && event.composedPath()[0] || event.target; // Clicked on interactive popper

      if (instance.props.interactive && actualContains(popper, actualTarget)) {
        return;
      } // Clicked on the event listeners target


      if (normalizeToArray(instance.props.triggerTarget || reference).some(function (el) {
        return actualContains(el, actualTarget);
      })) {
        if (currentInput.isTouch) {
          return;
        }

        if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
          return;
        }
      } else {
        invokeHook('onClickOutside', [instance, event]);
      }

      if (instance.props.hideOnClick === true) {
        instance.clearDelayTimeouts();
        instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
        // currentTarget. This lets a tippy with `focus` trigger know that it
        // should not show

        didHideDueToDocumentMouseDown = true;
        setTimeout(function () {
          didHideDueToDocumentMouseDown = false;
        }); // The listener gets added in `scheduleShow()`, but this may be hiding it
        // before it shows, and hide()'s early bail-out behavior can prevent it
        // from being cleaned up

        if (!instance.state.isMounted) {
          removeDocumentPress();
        }
      }
    }

    function onTouchMove() {
      didTouchMove = true;
    }

    function onTouchStart() {
      didTouchMove = false;
    }

    function addDocumentPress() {
      var doc = getDocument();
      doc.addEventListener('mousedown', onDocumentPress, true);
      doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
      doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
      doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
    }

    function removeDocumentPress() {
      var doc = getDocument();
      doc.removeEventListener('mousedown', onDocumentPress, true);
      doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
      doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
      doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
    }

    function onTransitionedOut(duration, callback) {
      onTransitionEnd(duration, function () {
        if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
          callback();
        }
      });
    }

    function onTransitionedIn(duration, callback) {
      onTransitionEnd(duration, callback);
    }

    function onTransitionEnd(duration, callback) {
      var box = getDefaultTemplateChildren().box;

      function listener(event) {
        if (event.target === box) {
          updateTransitionEndListener(box, 'remove', listener);
          callback();
        }
      } // Make callback synchronous if duration is 0
      // `transitionend` won't fire otherwise


      if (duration === 0) {
        return callback();
      }

      updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
      updateTransitionEndListener(box, 'add', listener);
      currentTransitionEndListener = listener;
    }

    function on(eventType, handler, options) {
      if (options === void 0) {
        options = false;
      }

      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function (node) {
        node.addEventListener(eventType, handler, options);
        listeners.push({
          node: node,
          eventType: eventType,
          handler: handler,
          options: options
        });
      });
    }

    function addListeners() {
      if (getIsCustomTouchBehavior()) {
        on('touchstart', onTrigger, {
          passive: true
        });
        on('touchend', onMouseLeave, {
          passive: true
        });
      }

      splitBySpaces(instance.props.trigger).forEach(function (eventType) {
        if (eventType === 'manual') {
          return;
        }

        on(eventType, onTrigger);

        switch (eventType) {
          case 'mouseenter':
            on('mouseleave', onMouseLeave);
            break;

          case 'focus':
            on(isIE11 ? 'focusout' : 'blur', onBlurOrFocusOut);
            break;

          case 'focusin':
            on('focusout', onBlurOrFocusOut);
            break;
        }
      });
    }

    function removeListeners() {
      listeners.forEach(function (_ref) {
        var node = _ref.node,
            eventType = _ref.eventType,
            handler = _ref.handler,
            options = _ref.options;
        node.removeEventListener(eventType, handler, options);
      });
      listeners = [];
    }

    function onTrigger(event) {
      var _lastTriggerEvent;

      var shouldScheduleClickHide = false;

      if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
        return;
      }

      var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
      lastTriggerEvent = event;
      currentTarget = event.currentTarget;
      handleAriaExpandedAttribute();

      if (!instance.state.isVisible && isMouseEvent(event)) {
        // If scrolling, `mouseenter` events can be fired if the cursor lands
        // over a new target, but `mousemove` events don't get fired. This
        // causes interactive tooltips to get stuck open until the cursor is
        // moved
        mouseMoveListeners.forEach(function (listener) {
          return listener(event);
        });
      } // Toggle show/hide when clicking click-triggered tooltips


      if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
        shouldScheduleClickHide = true;
      } else {
        scheduleShow(event);
      }

      if (event.type === 'click') {
        isVisibleFromClick = !shouldScheduleClickHide;
      }

      if (shouldScheduleClickHide && !wasFocused) {
        scheduleHide(event);
      }
    }

    function onMouseMove(event) {
      var target = event.target;
      var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);

      if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
        return;
      }

      var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
        var _instance$popperInsta;

        var instance = popper._tippy;
        var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

        if (state) {
          return {
            popperRect: popper.getBoundingClientRect(),
            popperState: state,
            props: props
          };
        }

        return null;
      }).filter(Boolean);

      if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
        cleanupInteractiveMouseListeners();
        scheduleHide(event);
      }
    }

    function onMouseLeave(event) {
      var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

      if (shouldBail) {
        return;
      }

      if (instance.props.interactive) {
        instance.hideWithInteractivity(event);
        return;
      }

      scheduleHide(event);
    }

    function onBlurOrFocusOut(event) {
      if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
        return;
      } // If focus was moved to within the popper


      if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
        return;
      }

      scheduleHide(event);
    }

    function isEventListenerStopped(event) {
      return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
    }

    function createPopperInstance() {
      destroyPopperInstance();
      var _instance$props2 = instance.props,
          popperOptions = _instance$props2.popperOptions,
          placement = _instance$props2.placement,
          offset = _instance$props2.offset,
          getReferenceClientRect = _instance$props2.getReferenceClientRect,
          moveTransition = _instance$props2.moveTransition;
      var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
      var computedReference = getReferenceClientRect ? {
        getBoundingClientRect: getReferenceClientRect,
        contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
      } : reference;
      var tippyModifier = {
        name: '$$tippy',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: function fn(_ref2) {
          var state = _ref2.state;

          if (getIsDefaultRenderFn()) {
            var _getDefaultTemplateCh = getDefaultTemplateChildren(),
                box = _getDefaultTemplateCh.box;

            ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
              if (attr === 'placement') {
                box.setAttribute('data-placement', state.placement);
              } else {
                if (state.attributes.popper["data-popper-" + attr]) {
                  box.setAttribute("data-" + attr, '');
                } else {
                  box.removeAttribute("data-" + attr);
                }
              }
            });
            state.attributes.popper = {};
          }
        }
      };
      var modifiers = [{
        name: 'offset',
        options: {
          offset: offset
        }
      }, {
        name: 'preventOverflow',
        options: {
          padding: {
            top: 2,
            bottom: 2,
            left: 5,
            right: 5
          }
        }
      }, {
        name: 'flip',
        options: {
          padding: 5
        }
      }, {
        name: 'computeStyles',
        options: {
          adaptive: !moveTransition
        }
      }, tippyModifier];

      if (getIsDefaultRenderFn() && arrow) {
        modifiers.push({
          name: 'arrow',
          options: {
            element: arrow,
            padding: 3
          }
        });
      }

      modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
      instance.popperInstance = createPopper(computedReference, popper, Object.assign({}, popperOptions, {
        placement: placement,
        onFirstUpdate: onFirstUpdate,
        modifiers: modifiers
      }));
    }

    function destroyPopperInstance() {
      if (instance.popperInstance) {
        instance.popperInstance.destroy();
        instance.popperInstance = null;
      }
    }

    function mount() {
      var appendTo = instance.props.appendTo;
      var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
      // it's directly after the reference element so the elements inside the
      // tippy can be tabbed to
      // If there are clipping issues, the user can specify a different appendTo
      // and ensure focus management is handled correctly manually

      var node = getCurrentTarget();

      if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === 'parent') {
        parentNode = node.parentNode;
      } else {
        parentNode = invokeWithArgsOrReturn(appendTo, [node]);
      } // The popper element needs to exist on the DOM before its position can be
      // updated as Popper needs to read its dimensions


      if (!parentNode.contains(popper)) {
        parentNode.appendChild(popper);
      }

      instance.state.isMounted = true;
      createPopperInstance();
    }

    function getNestedPopperTree() {
      return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
    }

    function scheduleShow(event) {
      instance.clearDelayTimeouts();

      if (event) {
        invokeHook('onTrigger', [instance, event]);
      }

      addDocumentPress();
      var delay = getDelay(true);

      var _getNormalizedTouchSe = getNormalizedTouchSettings(),
          touchValue = _getNormalizedTouchSe[0],
          touchDelay = _getNormalizedTouchSe[1];

      if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
        delay = touchDelay;
      }

      if (delay) {
        showTimeout = setTimeout(function () {
          instance.show();
        }, delay);
      } else {
        instance.show();
      }
    }

    function scheduleHide(event) {
      instance.clearDelayTimeouts();
      invokeHook('onUntrigger', [instance, event]);

      if (!instance.state.isVisible) {
        removeDocumentPress();
        return;
      } // For interactive tippies, scheduleHide is added to a document.body handler
      // from onMouseLeave so must intercept scheduled hides from mousemove/leave
      // events when trigger contains mouseenter and click, and the tip is
      // currently shown as a result of a click.


      if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
        return;
      }

      var delay = getDelay(false);

      if (delay) {
        hideTimeout = setTimeout(function () {
          if (instance.state.isVisible) {
            instance.hide();
          }
        }, delay);
      } else {
        // Fixes a `transitionend` problem when it fires 1 frame too
        // late sometimes, we don't want hide() to be called.
        scheduleHideAnimationFrame = requestAnimationFrame(function () {
          instance.hide();
        });
      }
    } // ===========================================================================
    // 🔑 Public methods
    // ===========================================================================


    function enable() {
      instance.state.isEnabled = true;
    }

    function disable() {
      // Disabling the instance should also hide it
      // https://github.com/atomiks/tippy.js-react/issues/106
      instance.hide();
      instance.state.isEnabled = false;
    }

    function clearDelayTimeouts() {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      cancelAnimationFrame(scheduleHideAnimationFrame);
    }

    function setProps(partialProps) {

      if (instance.state.isDestroyed) {
        return;
      }

      invokeHook('onBeforeUpdate', [instance, partialProps]);
      removeListeners();
      var prevProps = instance.props;
      var nextProps = evaluateProps(reference, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
        ignoreAttributes: true
      }));
      instance.props = nextProps;
      addListeners();

      if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
        cleanupInteractiveMouseListeners();
        debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
      } // Ensure stale aria-expanded attributes are removed


      if (prevProps.triggerTarget && !nextProps.triggerTarget) {
        normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
          node.removeAttribute('aria-expanded');
        });
      } else if (nextProps.triggerTarget) {
        reference.removeAttribute('aria-expanded');
      }

      handleAriaExpandedAttribute();
      handleStyles();

      if (onUpdate) {
        onUpdate(prevProps, nextProps);
      }

      if (instance.popperInstance) {
        createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
        // and the nested ones get re-rendered first.
        // https://github.com/atomiks/tippyjs-react/issues/177
        // TODO: find a cleaner / more efficient solution(!)

        getNestedPopperTree().forEach(function (nestedPopper) {
          // React (and other UI libs likely) requires a rAF wrapper as it flushes
          // its work in one
          requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
        });
      }

      invokeHook('onAfterUpdate', [instance, partialProps]);
    }

    function setContent(content) {
      instance.setProps({
        content: content
      });
    }

    function show() {


      var isAlreadyVisible = instance.state.isVisible;
      var isDestroyed = instance.state.isDestroyed;
      var isDisabled = !instance.state.isEnabled;
      var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
      var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

      if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
        return;
      } // Normalize `disabled` behavior across browsers.
      // Firefox allows events on disabled elements, but Chrome doesn't.
      // Using a wrapper element (i.e. <span>) is recommended.


      if (getCurrentTarget().hasAttribute('disabled')) {
        return;
      }

      invokeHook('onShow', [instance], false);

      if (instance.props.onShow(instance) === false) {
        return;
      }

      instance.state.isVisible = true;

      if (getIsDefaultRenderFn()) {
        popper.style.visibility = 'visible';
      }

      handleStyles();
      addDocumentPress();

      if (!instance.state.isMounted) {
        popper.style.transition = 'none';
      } // If flipping to the opposite side after hiding at least once, the
      // animation will use the wrong placement without resetting the duration


      if (getIsDefaultRenderFn()) {
        var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
            box = _getDefaultTemplateCh2.box,
            content = _getDefaultTemplateCh2.content;

        setTransitionDuration([box, content], 0);
      }

      onFirstUpdate = function onFirstUpdate() {
        var _instance$popperInsta2;

        if (!instance.state.isVisible || ignoreOnFirstUpdate) {
          return;
        }

        ignoreOnFirstUpdate = true; // reflow

        void popper.offsetHeight;
        popper.style.transition = instance.props.moveTransition;

        if (getIsDefaultRenderFn() && instance.props.animation) {
          var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
              _box = _getDefaultTemplateCh3.box,
              _content = _getDefaultTemplateCh3.content;

          setTransitionDuration([_box, _content], duration);
          setVisibilityState([_box, _content], 'visible');
        }

        handleAriaContentAttribute();
        handleAriaExpandedAttribute();
        pushIfUnique(mountedInstances, instance); // certain modifiers (e.g. `maxSize`) require a second update after the
        // popper has been positioned for the first time

        (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
        invokeHook('onMount', [instance]);

        if (instance.props.animation && getIsDefaultRenderFn()) {
          onTransitionedIn(duration, function () {
            instance.state.isShown = true;
            invokeHook('onShown', [instance]);
          });
        }
      };

      mount();
    }

    function hide() {


      var isAlreadyHidden = !instance.state.isVisible;
      var isDestroyed = instance.state.isDestroyed;
      var isDisabled = !instance.state.isEnabled;
      var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

      if (isAlreadyHidden || isDestroyed || isDisabled) {
        return;
      }

      invokeHook('onHide', [instance], false);

      if (instance.props.onHide(instance) === false) {
        return;
      }

      instance.state.isVisible = false;
      instance.state.isShown = false;
      ignoreOnFirstUpdate = false;
      isVisibleFromClick = false;

      if (getIsDefaultRenderFn()) {
        popper.style.visibility = 'hidden';
      }

      cleanupInteractiveMouseListeners();
      removeDocumentPress();
      handleStyles(true);

      if (getIsDefaultRenderFn()) {
        var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
            box = _getDefaultTemplateCh4.box,
            content = _getDefaultTemplateCh4.content;

        if (instance.props.animation) {
          setTransitionDuration([box, content], duration);
          setVisibilityState([box, content], 'hidden');
        }
      }

      handleAriaContentAttribute();
      handleAriaExpandedAttribute();

      if (instance.props.animation) {
        if (getIsDefaultRenderFn()) {
          onTransitionedOut(duration, instance.unmount);
        }
      } else {
        instance.unmount();
      }
    }

    function hideWithInteractivity(event) {

      getDocument().addEventListener('mousemove', debouncedOnMouseMove);
      pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
      debouncedOnMouseMove(event);
    }

    function unmount() {

      if (instance.state.isVisible) {
        instance.hide();
      }

      if (!instance.state.isMounted) {
        return;
      }

      destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
      // tree by default. This seems mainly for interactive tippies, but we should
      // find a workaround if possible

      getNestedPopperTree().forEach(function (nestedPopper) {
        nestedPopper._tippy.unmount();
      });

      if (popper.parentNode) {
        popper.parentNode.removeChild(popper);
      }

      mountedInstances = mountedInstances.filter(function (i) {
        return i !== instance;
      });
      instance.state.isMounted = false;
      invokeHook('onHidden', [instance]);
    }

    function destroy() {

      if (instance.state.isDestroyed) {
        return;
      }

      instance.clearDelayTimeouts();
      instance.unmount();
      removeListeners();
      delete reference._tippy;
      instance.state.isDestroyed = true;
      invokeHook('onDestroy', [instance]);
    }
  }

  function tippy(targets, optionalProps) {
    if (optionalProps === void 0) {
      optionalProps = {};
    }

    var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);

    bindGlobalEventListeners();
    var passedProps = Object.assign({}, optionalProps, {
      plugins: plugins
    });
    var elements = getArrayOfElements(targets);

    var instances = elements.reduce(function (acc, reference) {
      var instance = reference && createTippy(reference, passedProps);

      if (instance) {
        acc.push(instance);
      }

      return acc;
    }, []);
    return isElement(targets) ? instances[0] : instances;
  }

  tippy.defaultProps = defaultProps;
  tippy.setDefaultProps = setDefaultProps;
  tippy.currentInput = currentInput;

  // every time the popper is destroyed (i.e. a new target), removing the styles
  // and causing transitions to break for singletons when the console is open, but
  // most notably for non-transform styles being used, `gpuAcceleration: false`.

  Object.assign({}, applyStyles$1, {
    effect: function effect(_ref) {
      var state = _ref.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: {
          position: 'absolute'
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;

      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      } // intentionally return no cleanup function
      // return () => { ... }

    }
  });

  tippy.setDefaultProps({
    render: render
  });

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  var isBrowser = typeof document !== 'undefined';
  function preserveRef(ref, node) {
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      }

      if ({}.hasOwnProperty.call(ref, 'current')) {
        ref.current = node;
      }
    }
  }
  function ssrSafeCreateDiv() {
    return isBrowser && document.createElement('div');
  }
  function toDataAttributes(attrs) {
    var dataAttrs = {
      'data-placement': attrs.placement
    };

    if (attrs.referenceHidden) {
      dataAttrs['data-reference-hidden'] = '';
    }

    if (attrs.escaped) {
      dataAttrs['data-escaped'] = '';
    }

    return dataAttrs;
  }

  function deepEqual(x, y) {
    if (x === y) {
      return true;
    } else if (typeof x === 'object' && x != null && typeof y === 'object' && y != null) {
      if (Object.keys(x).length !== Object.keys(y).length) {
        return false;
      }

      for (var prop in x) {
        if (y.hasOwnProperty(prop)) {
          if (!deepEqual(x[prop], y[prop])) {
            return false;
          }
        } else {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }

  function uniqueByShape(arr) {
    var output = [];
    arr.forEach(function (item) {
      if (!output.find(function (outputItem) {
        return deepEqual(item, outputItem);
      })) {
        output.push(item);
      }
    });
    return output;
  }
  function deepPreserveProps(instanceProps, componentProps) {
    var _instanceProps$popper, _componentProps$poppe;

    return Object.assign({}, componentProps, {
      popperOptions: Object.assign({}, instanceProps.popperOptions, componentProps.popperOptions, {
        modifiers: uniqueByShape([].concat(((_instanceProps$popper = instanceProps.popperOptions) == null ? void 0 : _instanceProps$popper.modifiers) || [], ((_componentProps$poppe = componentProps.popperOptions) == null ? void 0 : _componentProps$poppe.modifiers) || []))
      })
    });
  }

  var useIsomorphicLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;
  function useMutableBox(initialValue) {
    // Using refs instead of state as it's recommended to not store imperative
    // values in state due to memory problems in React(?)
    var ref = React.useRef();

    if (!ref.current) {
      ref.current = typeof initialValue === 'function' ? initialValue() : initialValue;
    }

    return ref.current;
  }

  function updateClassName(box, action, classNames) {
    classNames.split(/\s+/).forEach(function (name) {
      if (name) {
        box.classList[action](name);
      }
    });
  }

  var classNamePlugin = {
    name: 'className',
    defaultValue: '',
    fn: function fn(instance) {
      var box = instance.popper.firstElementChild;

      var isDefaultRenderFn = function isDefaultRenderFn() {
        var _instance$props$rende;

        return !!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy);
      };

      function add() {
        if (instance.props.className && !isDefaultRenderFn()) {

          return;
        }

        updateClassName(box, 'add', instance.props.className);
      }

      function remove() {
        if (isDefaultRenderFn()) {
          updateClassName(box, 'remove', instance.props.className);
        }
      }

      return {
        onCreate: add,
        onBeforeUpdate: remove,
        onAfterUpdate: add
      };
    }
  };

  function TippyGenerator(tippy) {
    function Tippy(_ref) {
      var children = _ref.children,
          content = _ref.content,
          visible = _ref.visible,
          singleton = _ref.singleton,
          render = _ref.render,
          reference = _ref.reference,
          _ref$disabled = _ref.disabled,
          disabled = _ref$disabled === void 0 ? false : _ref$disabled,
          _ref$ignoreAttributes = _ref.ignoreAttributes,
          ignoreAttributes = _ref$ignoreAttributes === void 0 ? true : _ref$ignoreAttributes;
          _ref.__source;
          _ref.__self;
          var restOfNativeProps = _objectWithoutPropertiesLoose(_ref, ["children", "content", "visible", "singleton", "render", "reference", "disabled", "ignoreAttributes", "__source", "__self"]);

      var isControlledMode = visible !== undefined;
      var isSingletonMode = singleton !== undefined;

      var _useState = React.useState(false),
          mounted = _useState[0],
          setMounted = _useState[1];

      var _useState2 = React.useState({}),
          attrs = _useState2[0],
          setAttrs = _useState2[1];

      var _useState3 = React.useState(),
          singletonContent = _useState3[0],
          setSingletonContent = _useState3[1];

      var mutableBox = useMutableBox(function () {
        return {
          container: ssrSafeCreateDiv(),
          renders: 1
        };
      });
      var props = Object.assign({
        ignoreAttributes: ignoreAttributes
      }, restOfNativeProps, {
        content: mutableBox.container
      });

      if (isControlledMode) {

        props.trigger = 'manual';
        props.hideOnClick = false;
      }

      if (isSingletonMode) {
        disabled = true;
      }

      var computedProps = props;
      var plugins = props.plugins || [];

      if (render) {
        computedProps = Object.assign({}, props, {
          plugins: isSingletonMode && singleton.data != null ? [].concat(plugins, [{
            fn: function fn() {
              return {
                onTrigger: function onTrigger(instance, event) {
                  var node = singleton.data.children.find(function (_ref2) {
                    var instance = _ref2.instance;
                    return instance.reference === event.currentTarget;
                  });
                  instance.state.$$activeSingletonInstance = node.instance;
                  setSingletonContent(node.content);
                }
              };
            }
          }]) : plugins,
          render: function render() {
            return {
              popper: mutableBox.container
            };
          }
        });
      }

      var deps = [reference].concat(children ? [children.type] : []); // CREATE

      useIsomorphicLayoutEffect(function () {
        var element = reference;

        if (reference && reference.hasOwnProperty('current')) {
          element = reference.current;
        }

        var instance = tippy(element || mutableBox.ref || ssrSafeCreateDiv(), Object.assign({}, computedProps, {
          plugins: [classNamePlugin].concat(props.plugins || [])
        }));
        mutableBox.instance = instance;

        if (disabled) {
          instance.disable();
        }

        if (visible) {
          instance.show();
        }

        if (isSingletonMode) {
          singleton.hook({
            instance: instance,
            content: content,
            props: computedProps,
            setSingletonContent: setSingletonContent
          });
        }

        setMounted(true);
        return function () {
          instance.destroy();
          singleton == null ? void 0 : singleton.cleanup(instance);
        };
      }, deps); // UPDATE

      useIsomorphicLayoutEffect(function () {
        var _instance$popperInsta;

        // Prevent this effect from running on 1st render
        if (mutableBox.renders === 1) {
          mutableBox.renders++;
          return;
        }

        var instance = mutableBox.instance;
        instance.setProps(deepPreserveProps(instance.props, computedProps)); // Fixes #264

        (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.forceUpdate();

        if (disabled) {
          instance.disable();
        } else {
          instance.enable();
        }

        if (isControlledMode) {
          if (visible) {
            instance.show();
          } else {
            instance.hide();
          }
        }

        if (isSingletonMode) {
          singleton.hook({
            instance: instance,
            content: content,
            props: computedProps,
            setSingletonContent: setSingletonContent
          });
        }
      });
      useIsomorphicLayoutEffect(function () {
        var _instance$props$poppe;

        if (!render) {
          return;
        }

        var instance = mutableBox.instance;
        instance.setProps({
          popperOptions: Object.assign({}, instance.props.popperOptions, {
            modifiers: [].concat((((_instance$props$poppe = instance.props.popperOptions) == null ? void 0 : _instance$props$poppe.modifiers) || []).filter(function (_ref3) {
              var name = _ref3.name;
              return name !== '$$tippyReact';
            }), [{
              name: '$$tippyReact',
              enabled: true,
              phase: 'beforeWrite',
              requires: ['computeStyles'],
              fn: function fn(_ref4) {
                var _state$modifiersData;

                var state = _ref4.state;
                var hideData = (_state$modifiersData = state.modifiersData) == null ? void 0 : _state$modifiersData.hide; // WARNING: this is a high-risk path that can cause an infinite
                // loop. This expression _must_ evaluate to false when required

                if (attrs.placement !== state.placement || attrs.referenceHidden !== (hideData == null ? void 0 : hideData.isReferenceHidden) || attrs.escaped !== (hideData == null ? void 0 : hideData.hasPopperEscaped)) {
                  setAttrs({
                    placement: state.placement,
                    referenceHidden: hideData == null ? void 0 : hideData.isReferenceHidden,
                    escaped: hideData == null ? void 0 : hideData.hasPopperEscaped
                  });
                }

                state.attributes.popper = {};
              }
            }])
          })
        });
      }, [attrs.placement, attrs.referenceHidden, attrs.escaped].concat(deps));
      return /*#__PURE__*/React.createElement(React.Fragment, null, children ? /*#__PURE__*/React.cloneElement(children, {
        ref: function ref(node) {
          mutableBox.ref = node;
          preserveRef(children.ref, node);
        }
      }) : null, mounted && /*#__PURE__*/ReactDOM.createPortal(render ? render(toDataAttributes(attrs), singletonContent, mutableBox.instance) : content, mutableBox.container));
    }

    return Tippy;
  }

  var forwardRef = (function (Tippy, defaultProps) {
    return /*#__PURE__*/React.forwardRef(function TippyWrapper(_ref, _ref2) {
      var children = _ref.children,
          props = _objectWithoutPropertiesLoose(_ref, ["children"]);

      return (
        /*#__PURE__*/
        // If I spread them separately here, Babel adds the _extends ponyfill for
        // some reason
        React.createElement(Tippy, Object.assign({}, defaultProps, props), children ? /*#__PURE__*/React.cloneElement(children, {
          ref: function ref(node) {
            preserveRef(_ref2, node);
            preserveRef(children.ref, node);
          }
        }) : null)
      );
    });
  });
  var index = /*#__PURE__*/forwardRef( /*#__PURE__*/TippyGenerator(tippy));

  function toFn(fn) {
      if (fn === null || fn === undefined) {
          return null;
      }
      else if (typeof fn === 'function') {
          return fn;
      }
      else {
          return (() => fn);
      }
  }
  function toArray(arg, nullsEmpty = true) {
      if (Array.isArray(arg)) {
          return arg;
      }
      else {
          if (nullsEmpty && (arg === null || arg === undefined)) {
              return [];
          }
          return [arg];
      }
  }
  function isPromise(thing) {
      return !!(thing === null || thing === void 0 ? void 0 : thing["then"]);
  }
  class AsyncComputed {
      constructor(value) {
          Object.defineProperty(this, "pending", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: true
          });
          Object.defineProperty(this, "result", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          Object.defineProperty(this, "promise", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          mobx.makeAutoObservable(this);
          if (isPromise(value)) {
              this.promise = value;
              this.promise.then(mobx.action((r) => {
                  this.pending = false;
                  this.result = r;
              }));
          }
          else {
              this.pending = false;
              this.result = value;
              this.promise = Promise.resolve(value);
          }
      }
  }
  class DynamicFormPage {
      constructor(questions, index, groups) {
          Object.defineProperty(this, "questions", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_groups", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "index", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          this.questions = questions;
          let qMap = {};
          questions.forEach(q => qMap[q.key] = q);
          this._groups = groups.map(group => {
              return group.map(key => qMap[key]);
          });
          this.index = index;
          mobx.makeAutoObservable(this);
      }
      get hasNoErrorsOnCurrentPage() {
          return this.visibleQuestions.reduce((noErrorsSoFar, currentQuestion) => noErrorsSoFar && currentQuestion.displayedErrors.length === 0, true);
      }
      get questionsForDisplay() {
          return this._groups.map(g => g.filter(q => q.visible)).filter(g => g.length > 0);
      }
      get visibleQuestions() {
          return this.questions.filter(q => q.visible);
      }
      get visible() {
          return this.visibleQuestions.length > 0;
      }
      get valid() {
          return this.visibleQuestions.reduce((r, q) => r && q.valid, true);
      }
      get dirty() {
          return this.visibleQuestions.reduce((r, q) => r || q.dirty, false);
      }
      get hasCleanUnansweredQuestion() {
          return this.visibleQuestions.reduce((r, q) => r || (!q.dirty && (q.value == null || q.value == "")), false);
      }
      get invalidQuestions() {
          return this.visibleQuestions.filter(q => !q.valid);
      }
      get serverValid() {
          return this.visibleQuestions.reduce((r, q) => r && q.serverValid, true);
      }
      setDirty() {
          this.questions.forEach(q => q.dirty = true);
      }
      setClean() {
          this.questions.forEach(q => q.dirty = false);
      }
  }
  class DynamicFormStore {
      constructor(def) {
          var _a, _b, _c, _d, _e, _f;
          Object.defineProperty(this, "questions", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_pageListDefFunc", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_currentPageIndex", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: 0
          });
          Object.defineProperty(this, "_submitHandlers", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: []
          });
          Object.defineProperty(this, "_controlsFn", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_submittedOnce", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: false
          });
          Object.defineProperty(this, "_shouldCleanNextPageOnAdvance", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "questionRefWrapper", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "submitting", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: false
          });
          Object.defineProperty(this, "allowTransitions", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: true
          });
          Object.defineProperty(this, "isEureka", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: false
          });
          this.questions = {};
          this._controlsFn = toFn(def.layout.controls);
          this._pageListDefFunc = toFn(def.layout.pages);
          this.questionRefWrapper = (_a = def.config) === null || _a === void 0 ? void 0 : _a.questionRefFn;
          this._shouldCleanNextPageOnAdvance = (_c = (_b = def.config) === null || _b === void 0 ? void 0 : _b.shouldCleanNextPageOnAdvance) !== null && _c !== void 0 ? _c : false;
          for (let key in def.questions) {
              this.questions[key] = new DynamicFormQuestion(def.questions[key], key, this);
              this.questions[key].setValue((_e = (_d = def.config) === null || _d === void 0 ? void 0 : _d.initial) === null || _e === void 0 ? void 0 : _e[key], true);
          }
          mobx.makeAutoObservable(this, {
              _submitHandlers: false,
              questionRefWrapper: false
          });
          if ((_f = def.config) === null || _f === void 0 ? void 0 : _f.skipInitial) {
              this.goToFirstError();
          }
      }
      get hasNoErrors() {
          return this.visiblePages.reduce((noErrorsSoFar, curPage) => noErrorsSoFar && curPage.hasNoErrorsOnCurrentPage, true);
      }
      get pages() {
          let pageDefs = this.expandPageListDefFunc(this._pageListDefFunc);
          return pageDefs.map((page, i) => {
              let keys = page.reduce((prev, group) => prev.concat(group), []);
              return new DynamicFormPage(keys.map(k => this.questions[k]), i, page);
          });
      }
      getDynamicFormQuestionWithKey(key) {
          return this.questions[key];
      }
      combinePageListDefs(...pageListDefFuncs) {
          let combinedList = [];
          for (const pageListDefFunc of pageListDefFuncs) {
              combinedList.push(...this.expandPageListDefFunc(pageListDefFunc));
          }
          return combinedList;
      }
      expandPageListDefFunc(pageListDefFunc) {
          return toFn(pageListDefFunc)(this).map(page => toArray(page).map(groups => toArray(groups)));
      }
      onSubmit(handler) {
          this._submitHandlers.push(handler);
      }
      get firstPage() {
          return this.visiblePages[0];
      }
      get lastPage() {
          return this.visiblePages[this.visiblePages.length - 1];
      }
      get previousPage() {
          var _a;
          return (_a = this.visiblePages[this.visiblePageIndex - 1]) !== null && _a !== void 0 ? _a : null;
      }
      get nextPage() {
          var _a;
          return (_a = this.visiblePages[this.visiblePageIndex + 1]) !== null && _a !== void 0 ? _a : null;
      }
      get currentPage() {
          return this.pages[this._currentPageIndex];
      }
      get visiblePages() {
          return this.pages.filter(p => p.visible);
      }
      get visiblePageIndex() {
          return this.visiblePages.indexOf(this.currentPage);
      }
      clearValue(key) {
          if (this.questions[key]) {
              this.questions[key].setValue(null, true);
          }
      }
      hasQuestionKey(key) {
          return this.questions.hasOwnProperty(key);
      }
      isQuestionKeyVisible(key) {
          return this.currentPage.visibleQuestions.filter((q) => q.key === key).length > 0;
      }
      isQuestionDirty(key) {
          return this.questions[key].dirty;
      }
      setQuestionValue(key, value, leaveClean = false) {
          this.questions[key].setValue(value, leaveClean);
      }
      setServerErrors(key, errors) {
          if (this.questions[key]) {
              this.questions[key].setServerErrors(errors);
          }
      }
      get values() {
          let ret = {};
          for (let key in this.questions) {
              ret[key] = this.questions[key].value;
          }
          return ret;
      }
      getTypeaheadSearchText(key) {
          return this.questions[key].typeaheadSearchText;
      }
      get valid() {
          return this.visiblePages.reduce((r, p) => r && p.valid, true);
      }
      loadControls(page) {
          return this._controlsFn(page, this);
      }
      advancePage() {
          this.currentPage.setDirty();
          if (this._shouldCleanNextPageOnAdvance && this.nextPage) {
              this.nextPage.setClean();
          }
          if (!this.currentPage.valid) {
              this.advanceAfterPromisesResolve();
              return;
          }
          let remainingPages = this.pages.slice(this.currentPage.index + 1).filter(p => p.visible);
          if (remainingPages.length == 0) {
              if (this.valid) {
                  this.submit();
              }
              else {
                  this.goToFirstError();
              }
          }
          else {
              if (this._submittedOnce) {
                  let retryPages = remainingPages.filter(p => !p.serverValid);
                  if (retryPages.length === 0) {
                      this._currentPageIndex = remainingPages[remainingPages.length - 1].index;
                  }
                  else {
                      this._currentPageIndex = retryPages[0].index;
                  }
              }
              else {
                  this._currentPageIndex = remainingPages[0].index;
              }
          }
      }
      advanceAfterPromisesResolve() {
          let validations = this.currentPage.invalidQuestions.map(q => q.validation);
          if (validations.reduce((r, v) => r && v.pending, true)) {
              let page = this.currentPage;
              Promise.all(validations.map(v => v.promise)).then(mobx.action(() => {
                  if (this.currentPage === page) {
                      this.advancePage();
                  }
              }));
          }
      }
      showQuestion(key) {
          if (this.hasQuestionKey(key)) {
              this.pages.forEach(page => {
                  if (page.questions.filter(question => question.key === key).length) {
                      this._currentPageIndex = page.index;
                  }
              });
          }
      }
      goBack() {
          if (this.visiblePageIndex > 0) {
              this._currentPageIndex = this.visiblePages[this.visiblePageIndex - 1].index;
          }
      }
      goToFirstError(useServerErrors = false) {
          this._currentPageIndex = this.getFirstErrorPage(useServerErrors).index;
      }
      getFirstErrorPage(useServerErrors = false) {
          for (let page of this.visiblePages) {
              if (!page.valid) {
                  return page;
              }
              if (useServerErrors && !page.serverValid) {
                  return page;
              }
          }
          return this.visiblePages[this.visiblePages.length - 1];
      }
      goToFirstErrorOrFirstCleanUnansweredQuestion(useServerErrors = false) {
          this._currentPageIndex = this.getFirstPageWithErrorOrWithCleanUnansweredQuestion(useServerErrors).index;
      }
      getFirstPageWithErrorOrWithCleanUnansweredQuestion(useServerErrors = false) {
          for (let page of this.visiblePages) {
              if (!page.valid) {
                  return page;
              }
              if (useServerErrors && !page.serverValid) {
                  return page;
              }
              if (page.hasCleanUnansweredQuestion) {
                  return page;
              }
          }
          return this.visiblePages[this.visiblePages.length - 1];
      }
      goToPageIndex(pageIndex, preventSkippingInvalidQuestions = true) {
          let firstErrorIndex = this.visiblePages.indexOf(this.getFirstErrorPage());
          if (preventSkippingInvalidQuestions && firstErrorIndex < pageIndex) {
              this.goToFirstError();
          }
          else if (this.visiblePages[pageIndex]) {
              this._currentPageIndex = this.visiblePages[pageIndex].index;
          }
      }
      submit() {
          if (this.submitting) {
              console.log("Double submit attempted. Cancelling.");
              return;
          }
          for (let key in this.questions) {
              this.questions[key].setServerErrors([]);
          }
          this._submittedOnce = true;
          this.submitting = true;
          Promise.all(this._submitHandlers.map((h) => h(this.values))).catch((e) => {
              if (typeof e === 'object') {
                  for (let key in this.questions) {
                      if (Array.isArray(e[key]) || typeof e[key] === "string") {
                          this.questions[key].setServerErrors(toArray(e[key]));
                      }
                  }
                  this.goToFirstError(true);
              }
          }).finally(mobx.action(() => this.submitting = false));
      }
      resetState() {
          this._submittedOnce = false;
          this._currentPageIndex = this.visiblePages[0].index;
          this.pages.forEach(page => page.setClean());
      }
      reset(initial, shouldGoToFirstError = true) {
          for (let questionKey in this.questions) {
              const key = questionKey;
              this.questions[key].reset();
              if (initial[key] !== undefined) {
                  this.questions[key].setValue(initial[key], true);
              }
              this._submittedOnce = false;
              this._currentPageIndex = this.visiblePages[0].index;
              if (shouldGoToFirstError) {
                  this.goToFirstError();
              }
          }
      }
  }
  class DynamicFormQuestion {
      constructor(def, key, parent) {
          var _a, _b, _c, _d, _e, _f, _g;
          Object.defineProperty(this, "form", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "type", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "textType", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "saveTriggers", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "key", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_label", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_placeholder", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_autocomplete", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_maxLength", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_tooltip", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_sublabel", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_body", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_regErrorPlacement", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_cname", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_pageCname", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_dataExtra", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_continueCname", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_blockEventLoggingOfValue", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_testId", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "defaultValue", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_options", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_typeaheadOptions", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_typeaheadOptionDisplayFn", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_typeaheadOptionTextFn", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_typeaheadOptionValueFn", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_typeaheadUseInputValueIfNoOptions", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "minLengthToTriggerTypeahead", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_required", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_messageForIsRequiredError", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "onChange", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "beforeSubmit", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_autofocus", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_hidden", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_validator", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_doNotSetDirtyOnUndefinedToEmptyChange", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_addOptionDataToDataExtra", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_includePlaceholderSelectOption", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_useDivInsteadOfLabel", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_passwordToggleable", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_passwordFieldType", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_minRatingScale", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_maxRatingScale", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_ratingScaleLeftLabel", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_ratingScaleRightLabel", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_rows", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_inputMode", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_onKeyDown", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_onKeyUp", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_elementsBeforeInput", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_elementsAfterInput", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "_disabled", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "serverErrors", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: []
          });
          Object.defineProperty(this, "dirty", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: false
          });
          Object.defineProperty(this, "lastSaveEventType", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: exports.SaveEventType.UNKNOWN
          });
          Object.defineProperty(this, "_value", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: null
          });
          Object.defineProperty(this, "_typeaheadSearchText", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: ""
          });
          this.form = parent;
          this.key = key;
          this.type = def.type;
          this.textType = def.textType;
          this._autofocus = toFn(def.autofocus);
          this.beforeSubmit = def.beforeSubmit;
          this._blockEventLoggingOfValue = (_a = def.blockEventLoggingOfValue) !== null && _a !== void 0 ? _a : false;
          this._body = toFn(def.body);
          this._cname = def.cname;
          this._continueCname = def.continueCname;
          this.defaultValue = def.defaultValue;
          this._doNotSetDirtyOnUndefinedToEmptyChange = (_b = def.doNotSetDirtyOnUndefinedToEmptyChange) !== null && _b !== void 0 ? _b : false;
          this._hidden = toFn(def.hidden);
          this._addOptionDataToDataExtra = (_c = def.addOptionDataToDataExtra) !== null && _c !== void 0 ? _c : false;
          this._includePlaceholderSelectOption = (_d = def.includePlaceholderSelectOption) !== null && _d !== void 0 ? _d : true;
          this._label = toFn(def.label);
          this._maxLength = toFn(def.maxLength);
          this._messageForIsRequiredError = toFn(def.messageForIsRequiredError);
          this.minLengthToTriggerTypeahead = def.minLengthToTriggerTypeahead || 1;
          this._minRatingScale = toFn(def.minRatingScale);
          this._maxRatingScale = toFn(def.maxRatingScale);
          this.onChange = def.onChange;
          this._options = toFn(def.options);
          this._pageCname = def.pageCname;
          this._dataExtra = toFn(def.dataExtra);
          this._placeholder = toFn(def.placeholder);
          this._autocomplete = toFn(def.autocomplete);
          this._ratingScaleLeftLabel = toFn(def.ratingScaleLeftLabel);
          this._ratingScaleRightLabel = toFn(def.ratingScaleRightLabel);
          this._regErrorPlacement = toFn(def.regErrorPlacement);
          this._required = toFn(def.required);
          this._rows = def.rows;
          this.saveTriggers = (_e = def.saveTriggers) !== null && _e !== void 0 ? _e : this.defaultSaveTriggers;
          this._sublabel = toFn(def.sublabel);
          this._testId = def.testId;
          this._tooltip = toFn(def.tooltip);
          this._typeaheadOptions = def.typeaheadOptions;
          this._typeaheadOptionDisplayFn = def.typeaheadOptionDisplayFn;
          this._typeaheadOptionTextFn = def.typeaheadOptionTextFn;
          this._typeaheadOptionValueFn = def.typeaheadOptionValueFn;
          this._typeaheadUseInputValueIfNoOptions = def.typeaheadUseInputValueIfNoOptions;
          this._useDivInsteadOfLabel = (_f = def.useDivInsteadOfLabel) !== null && _f !== void 0 ? _f : false;
          this._passwordToggleable = (_g = def.passwordToggleable) !== null && _g !== void 0 ? _g : false;
          this._passwordFieldType = "password";
          this._validator = def.validator;
          this._inputMode = def.inputMode;
          this._onKeyDown = def.onKeyDown;
          this._onKeyUp = def.onKeyUp;
          this._elementsBeforeInput = toFn(def.elementsBeforeInput);
          this._elementsAfterInput = toFn(def.elementsAfterInput);
          this._disabled = def.disabled;
          mobx.makeAutoObservable(this, {
              _autofocus: false,
              beforeSubmit: false,
              _blockEventLoggingOfValue: false,
              _body: false,
              _cname: false,
              _continueCname: false,
              _doNotSetDirtyOnUndefinedToEmptyChange: false,
              form: false,
              _hidden: false,
              _addOptionDataToDataExtra: false,
              _includePlaceholderSelectOption: false,
              _label: false,
              _maxLength: false,
              _messageForIsRequiredError: false,
              minLengthToTriggerTypeahead: false,
              _minRatingScale: false,
              _maxRatingScale: false,
              onChange: false,
              _options: false,
              _pageCname: false,
              _dataExtra: false,
              _placeholder: false,
              _autocomplete: false,
              _ratingScaleLeftLabel: false,
              _ratingScaleRightLabel: false,
              _regErrorPlacement: false,
              _rows: false,
              _sublabel: false,
              textType: false,
              _typeaheadOptions: false,
              _typeaheadOptionDisplayFn: false,
              _typeaheadOptionTextFn: false,
              _typeaheadOptionValueFn: false,
              _typeaheadUseInputValueIfNoOptions: false,
              _useDivInsteadOfLabel: false,
              _passwordToggleable: false,
              _passwordFieldType: true,
              _validator: false,
              _inputMode: false,
              _onKeyDown: false,
              _onKeyUp: false,
              _elementsBeforeInput: false,
              _elementsAfterInput: false,
              _disabled: false,
              validation: mobx.computed({ keepAlive: true })
          });
      }
      get defaultSaveTriggers() {
          if (this.type === exports.QuestionType.SELECT) {
              return DEFAULT_SELECT_SAVE_TRIGGERS;
          }
          if (this.type === exports.QuestionType.TYPEAHEAD) {
              return DEFAULT_TYPEAHEAD_SAVE_TRIGGERS;
          }
          if (this.type === exports.QuestionType.RATING_SCALE) {
              return [];
          }
          return DEFAULT_TEXT_SAVE_TRIGGERS;
      }
      get value() {
          return this._value;
      }
      get typeaheadSearchText() {
          return this._typeaheadSearchText;
      }
      set typeaheadSearchText(s) {
          this._typeaheadSearchText = s;
      }
      get placeholder() {
          var _a;
          return (_a = this._placeholder) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get autocomplete() {
          var _a;
          return (_a = this._autocomplete) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get maxLength() {
          var _a;
          return (_a = this._maxLength) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get maxRatingScale() {
          var _a;
          return (_a = this._maxRatingScale) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get minRatingScale() {
          var _a;
          return (_a = this._minRatingScale) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get subLabel() {
          var _a;
          return (_a = this._sublabel) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get ratingScaleLeftLabel() {
          var _a;
          return (_a = this._ratingScaleLeftLabel) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get ratingScaleRightLabel() {
          var _a;
          return (_a = this._ratingScaleRightLabel) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get body() {
          var _a;
          return (_a = this._body) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get regErrorPlacement() {
          var _a, _b;
          return (_b = (_a = this._regErrorPlacement) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this)) !== null && _b !== void 0 ? _b : "BELOW_SUB_LABEL";
      }
      get cname() {
          return this._cname;
      }
      get pageCname() {
          return this._pageCname;
      }
      get dataExtra() {
          var _a;
          return (_a = this._dataExtra) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get continueCname() {
          return this._continueCname;
      }
      get blockEventLoggingOfValue() {
          return this._blockEventLoggingOfValue;
      }
      get testId() {
          return this._testId;
      }
      get tooltip() {
          var _a;
          return (_a = this._tooltip) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get serverSideErrors() {
          return this.serverErrors;
      }
      get options() {
          var _a, _b;
          let ret = (_a = this._options) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
          return (_b = ret === null || ret === void 0 ? void 0 : ret.map(r => typeof r === "string" ? { value: r, text: r } : r)) !== null && _b !== void 0 ? _b : [];
      }
      get typeaheadOptions() {
          return new AsyncComputed(this._typeaheadOptions(this.typeaheadSearchText, this.form));
      }
      get typeaheadOptionDisplayFn() {
          let defaultDisplayFn = (option) => option;
          return this._typeaheadOptionDisplayFn || defaultDisplayFn;
      }
      get typeaheadOptionTextFn() {
          let defaultTextFn = (option) => option;
          return this._typeaheadOptionTextFn || defaultTextFn;
      }
      get typeaheadOptionValueFn() {
          let defaultValueFn = (option) => option;
          return this._typeaheadOptionValueFn || defaultValueFn;
      }
      get typeaheadUseInputValueIfNoOptions() {
          return this._typeaheadUseInputValueIfNoOptions;
      }
      setValue(value, leaveClean = false) {
          let hasValueChangedFromUndefinedToEmpty = false;
          if (this.type === 'SELECT' && this.options.filter(o => o.value === value).length === 0) {
              this._value = null;
          }
          else {
              hasValueChangedFromUndefinedToEmpty = !this._value && !value;
              this._value = value;
          }
          if (!leaveClean) {
              if (!(this._doNotSetDirtyOnUndefinedToEmptyChange && hasValueChangedFromUndefinedToEmpty)) {
                  this.dirty = true;
              }
          }
      }
      setServerErrors(errors) {
          this.serverErrors = errors;
      }
      get required() {
          return this._required(this.form, this);
      }
      get rows() {
          return this._rows;
      }
      get inputMode() {
          return this._inputMode;
      }
      get onKeyDown() {
          return this._onKeyDown;
      }
      get onKeyUp() {
          return this._onKeyUp;
      }
      get elementsBeforeInput() {
          var _a;
          return (_a = this._elementsBeforeInput) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get elementsAfterInput() {
          var _a;
          return (_a = this._elementsAfterInput) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get disabled() {
          return this._disabled;
      }
      get messageForIsRequiredError() {
          var _a, _b;
          return (_b = (_a = this._messageForIsRequiredError) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this)) !== null && _b !== void 0 ? _b : 'Required Field';
      }
      get addOptionDataToDataExtra() {
          return this._addOptionDataToDataExtra;
      }
      get includePlaceholderSelectOption() {
          return this._includePlaceholderSelectOption;
      }
      get useDivInsteadOfLabel() {
          return this._useDivInsteadOfLabel;
      }
      get passwordToggleable() {
          return this._passwordToggleable;
      }
      get passwordFieldType() {
          return this._passwordFieldType;
      }
      setPasswordFieldType(newFieldType) {
          this._passwordFieldType = newFieldType;
      }
      get autofocus() {
          var _a, _b;
          return (_b = (_a = this._autofocus) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this)) !== null && _b !== void 0 ? _b : true;
      }
      get visible() {
          var _a;
          return !((_a = this._hidden) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this));
      }
      get label() {
          var _a;
          return (_a = this._label) === null || _a === void 0 ? void 0 : _a.call(this, this.form, this);
      }
      get validation() {
          let value = this._value;
          if (this.required && (value === null || value === undefined || value === "")) {
              return new AsyncComputed([this.messageForIsRequiredError]);
          }
          if (!this._validator || (value === null || value === undefined || value === "")) {
              return new AsyncComputed([]);
          }
          return new AsyncComputed(this._validator(this.value, this.form, this.lastSaveEventType));
      }
      get localErrors() {
          return toArray(this.validation.result);
      }
      get valid() {
          return this.localErrors.length === 0 && !this.validation.pending;
      }
      get serverValid() {
          return this.valid && this.serverErrors.length === 0;
      }
      get displayedErrors() {
          if (!this.dirty) {
              return [];
          }
          return this.localErrors.concat(this.serverErrors);
      }
      setLastSaveEventType(saveEvent) {
          this.lastSaveEventType = saveEvent;
      }
      reset() {
          this._value = null;
          this.dirty = false;
          this.serverErrors = [];
      }
  }
  exports.SaveTrigger = void 0;
  (function (SaveTrigger) {
      SaveTrigger[SaveTrigger["ON_CHANGE_WHEN_DIRTY"] = 0] = "ON_CHANGE_WHEN_DIRTY";
      SaveTrigger[SaveTrigger["ON_CHANGE_ALWAYS"] = 1] = "ON_CHANGE_ALWAYS";
      SaveTrigger[SaveTrigger["ON_BLUR"] = 2] = "ON_BLUR";
      SaveTrigger[SaveTrigger["ON_ENTER_KEY"] = 3] = "ON_ENTER_KEY";
      SaveTrigger[SaveTrigger["ON_SUBMIT"] = 4] = "ON_SUBMIT";
  })(exports.SaveTrigger || (exports.SaveTrigger = {}));
  exports.SaveEventType = void 0;
  (function (SaveEventType) {
      SaveEventType[SaveEventType["ON_CHANGE"] = 0] = "ON_CHANGE";
      SaveEventType[SaveEventType["ON_BLUR"] = 1] = "ON_BLUR";
      SaveEventType[SaveEventType["ON_ENTER_KEY"] = 2] = "ON_ENTER_KEY";
      SaveEventType[SaveEventType["ON_SUBMIT"] = 3] = "ON_SUBMIT";
      SaveEventType[SaveEventType["UNKNOWN"] = 4] = "UNKNOWN";
  })(exports.SaveEventType || (exports.SaveEventType = {}));
  const DEFAULT_TEXT_SAVE_TRIGGERS = [exports.SaveTrigger.ON_CHANGE_WHEN_DIRTY, exports.SaveTrigger.ON_BLUR, exports.SaveTrigger.ON_ENTER_KEY, exports.SaveTrigger.ON_SUBMIT];
  const DEFAULT_SELECT_SAVE_TRIGGERS = [exports.SaveTrigger.ON_BLUR, exports.SaveTrigger.ON_SUBMIT];
  const DEFAULT_TYPEAHEAD_SAVE_TRIGGERS = [exports.SaveTrigger.ON_ENTER_KEY, exports.SaveTrigger.ON_SUBMIT];
  const SUPPRESS_ON_CHANGE_FOR_TEXT_SAVE_TRIGGERS = DEFAULT_TEXT_SAVE_TRIGGERS.filter(st => st != exports.SaveTrigger.ON_CHANGE_WHEN_DIRTY);
  exports.QuestionType = void 0;
  (function (QuestionType) {
      QuestionType["CHECKBOX"] = "CHECKBOX";
      QuestionType["CUSTOM"] = "CUSTOM";
      QuestionType["RADIO"] = "RADIO";
      QuestionType["RATING_SCALE"] = "RATING_SCALE";
      QuestionType["SELECT"] = "SELECT";
      QuestionType["TEXT"] = "TEXT";
      QuestionType["TEXTAREA"] = "TEXTAREA";
      QuestionType["TYPEAHEAD"] = "TYPEAHEAD";
  })(exports.QuestionType || (exports.QuestionType = {}));
  exports.TextType = void 0;
  (function (TextType) {
      TextType["CREDIT_CARD"] = "credit-card";
      TextType["EMAIL"] = "email";
      TextType["NUMBER"] = "number";
      TextType["PASSWORD"] = "password";
      TextType["TEL"] = "tel";
      TextType["TEXT"] = "text";
  })(exports.TextType || (exports.TextType = {}));

  var PageTransitionPosition;
  (function (PageTransitionPosition) {
      PageTransitionPosition["NEXT"] = "next";
      PageTransitionPosition["PREVIOUS"] = "previous";
      PageTransitionPosition["CURRENT"] = "current";
  })(PageTransitionPosition || (PageTransitionPosition = {}));
  class _DynamicFormView extends React__namespace.Component {
      constructor(props) {
          super(props);
          Object.defineProperty(this, "currentPageEl", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: React__namespace.createRef()
          });
          this.state = {
              recentPage: this.props.store.currentPage,
              transitioning: false
          };
      }
      componentDidUpdate() {
          if (this.state.recentPage.index !== this.props.store.currentPage.index && !this.state.transitioning) {
              this.setState({
                  transitioning: true
              });
          }
      }
      transitionEnd() {
          var _a, _b;
          if (this.state.transitioning) {
              this.setState({
                  transitioning: false,
                  recentPage: this.props.store.currentPage
              });
              (_b = (_a = this.currentPageEl) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.doAutofocus();
          }
      }
      handleSubmit() {
          var _a, _b;
          (_b = (_a = this.currentPageEl) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.handleSubmit();
          this.props.store.advancePage();
      }
      render() {
          let store = this.props.store;
          let pages;
          if (store.currentPage.index !== this.state.recentPage.index) {
              pages = this.transitionPages(store);
          }
          else {
              pages = React__namespace.createElement(DynamicFormPageView, { form: store, page: store.currentPage, key: store.currentPage.index, ref: this.currentPageEl });
          }
          const extraClassesStr = [
              (store.submitting) ? 'dynamic-form--submitting' : '',
              (store.lastPage === store.currentPage) ? 'dynamic-form--last-page' : '',
              (this.state.transitioning) ? "dynamic-form--transitioning" : '',
          ].filter(val => !!val).join(" ");
          return (React__namespace.createElement("form", { className: `dynamic-form ${extraClassesStr}`, onSubmit: (e) => {
                  e.preventDefault();
                  this.handleSubmit();
              } }, pages));
      }
      transitionPages(store) {
          let isForward = this.props.store.currentPage.index > this.state.recentPage.index;
          let recentPageTransition = {
              transitionEnd: () => this.transitionEnd(),
              transitionPosition: isForward ? PageTransitionPosition.PREVIOUS :
                  PageTransitionPosition.NEXT
          };
          let currentPageTransition = {
              transitionPosition: isForward ? PageTransitionPosition.NEXT :
                  PageTransitionPosition.PREVIOUS
          };
          if (this.state.transitioning) {
              currentPageTransition.transitionPosition = PageTransitionPosition.CURRENT;
          }
          else {
              recentPageTransition.transitionPosition = PageTransitionPosition.CURRENT;
          }
          let recentPage = React__namespace.createElement(DynamicFormPageView, Object.assign({ form: store, page: this.state.recentPage, key: this.state.recentPage.index }, recentPageTransition));
          let currentPage = React__namespace.createElement(DynamicFormPageView, Object.assign({ ref: this.currentPageEl, form: store, page: store.currentPage, key: store.currentPage.index }, currentPageTransition));
          return isForward ? [recentPage, currentPage] : [currentPage, recentPage];
      }
  }
  function convertCssTimeToMillis(cssTimeString, defaultMillis) {
      const value = parseFloat(cssTimeString);
      if (isNaN(value)) {
          return defaultMillis;
      }
      if (cssTimeString.endsWith('ms')) {
          return value;
      }
      if (cssTimeString.endsWith('s')) {
          return value * 1000;
      }
      return defaultMillis;
  }
  const DynamicFormView = mobxReact.observer(_DynamicFormView);
  class _DynamicFormPageView extends React__namespace.Component {
      constructor() {
          super(...arguments);
          Object.defineProperty(this, "page", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: React__namespace.createRef()
          });
          Object.defineProperty(this, "questionEls", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: {}
          });
          Object.defineProperty(this, "supportsTransition", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "transitionEndTimeoutHandle", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
      }
      componentDidMount() {
          this.supportsTransition = !!window.getComputedStyle(this.page.current).transitionDuration;
      }
      componentDidUpdate(prevProps) {
          if (this.props.transitionPosition != prevProps.transitionPosition) {
              if (this.supportsTransition && this.props.form.allowTransitions && this.props.transitionEnd) {
                  this.clearTransitionEndTimeout();
                  const transitionEndCallbackFunc = this.props.transitionEnd;
                  const transitionDurationStr = window.getComputedStyle(this.page.current).transitionDuration;
                  const defaultMillis = 1000;
                  const durationMillis = convertCssTimeToMillis(transitionDurationStr, defaultMillis) + 100;
                  this.transitionEndTimeoutHandle = window.setTimeout(() => {
                      console.info("form page transition did not end through transitionend event. Calling transitionEnd callback manually");
                      transitionEndCallbackFunc();
                  }, durationMillis);
              }
              else if (this.props.transitionEnd) {
                  this.props.transitionEnd();
              }
          }
      }
      clearTransitionEndTimeout() {
          if (this.transitionEndTimeoutHandle) {
              window.clearTimeout(this.transitionEndTimeoutHandle);
              this.transitionEndTimeoutHandle = null;
          }
      }
      handleSubmit() {
          this.props.page.questions.forEach(q => {
              var _a;
              let questionEl = this.questionEls[q.key];
              if (questionEl && ((_a = q.saveTriggers) === null || _a === void 0 ? void 0 : _a.indexOf(exports.SaveTrigger.ON_SUBMIT)) > -1) {
                  questionEl.saveValue(exports.SaveEventType.ON_SUBMIT);
              }
              if (q.beforeSubmit) {
                  q.beforeSubmit();
              }
          });
      }
      doAutofocus() {
          var _a;
          if (this.props.page.questions[0].autofocus) {
              (_a = this.questionEls[this.props.page.questions[0].key]) === null || _a === void 0 ? void 0 : _a.focus();
          }
      }
      render() {
          var _a, _b, _c;
          let page = this.props.page;
          let form = this.props.form;
          let groupedQuestions = page.questionsForDisplay.map(g => g.map(q => React__namespace.createElement(DynamicFormQuestionView, { store: q, key: q.key, ref: (el) => this.questionEls[q.key] = el })));
          let groups = groupedQuestions.map((g, i) => {
              if (g.length > 1) {
                  return React__namespace.createElement("div", { className: "dynamic-form__question-group", key: page.index + "_" + i }, g);
              }
              else {
                  return g;
              }
          });
          let pageCname = (_b = (_a = page.questions.filter((question) => { return !!question.pageCname; })) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.pageCname;
          let transitionClass = this.props.transitionPosition ? `dynamic-form__page--transitioning dynamic-form__page--transition-${this.props.transitionPosition}` : "";
          let controls = (_c = form.loadControls(page)) !== null && _c !== void 0 ? _c : React__namespace.createElement(React__namespace.Fragment, null,
              React__namespace.createElement("button", { type: "submit", "test-id": "dynamic-form-continue", className: "dynamic-form__submit" }, "Continue"),
              form.firstPage !== page &&
                  React__namespace.createElement("a", { className: "dynamic-form__back", "test-id": "back", onClick: () => form.goBack() }, "Back"));
          let transitionEndHandler = null;
          if (this.supportsTransition && this.props.form.allowTransitions && this.props.transitionEnd) {
              transitionEndHandler = (e) => {
                  if (this.page.current === e.target) {
                      this.clearTransitionEndTimeout();
                      this.props.transitionEnd();
                  }
              };
          }
          return (React__namespace.createElement("div", Object.assign({ className: `dynamic-form__page ${transitionClass}`, ref: this.page }, (pageCname && { "data-cname": pageCname }), { onTransitionEnd: transitionEndHandler }),
              groups,
              React__namespace.createElement("div", { className: "dynamic-form__controls" }, controls)));
      }
  }
  let DynamicFormPageView = mobxReact.observer(_DynamicFormPageView);
  class _DynamicFormQuestionView extends React__namespace.Component {
      constructor(props) {
          super(props);
          Object.defineProperty(this, "input", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "ref", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: void 0
          });
          Object.defineProperty(this, "valueRef", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: React__namespace.createRef()
          });
          Object.defineProperty(this, "hideTypeaheadDropdown", {
              enumerable: true,
              configurable: true,
              writable: true,
              value: true
          });
          this.input = this.ref = React__namespace.createRef();
          if (props.store.form.questionRefWrapper) {
              this.ref = legacyCombinedRef(this.input, props.store.form.questionRefWrapper.apply(null, []));
          }
      }
      saveValue(saveEventType = exports.SaveEventType.UNKNOWN, valueOverride = undefined) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j;
          this.props.store.setLastSaveEventType(saveEventType);
          let newValue = (_d = valueOverride !== null && valueOverride !== void 0 ? valueOverride : ((_c = (_b = (_a = this.valueRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.getValue) === null || _c === void 0 ? void 0 : _c.call(_b))) !== null && _d !== void 0 ? _d : ((_f = (_e = this.input) === null || _e === void 0 ? void 0 : _e.current) === null || _f === void 0 ? void 0 : _f.value);
          switch (this.props.store.type) {
              case exports.QuestionType.TEXT:
              case exports.QuestionType.TEXTAREA:
              case exports.QuestionType.RATING_SCALE:
                  this.props.store.setValue(newValue);
                  break;
              case exports.QuestionType.TYPEAHEAD:
                  if (valueOverride !== undefined && valueOverride !== null) {
                      this.props.store.setValue(valueOverride);
                  }
                  break;
              case exports.QuestionType.SELECT:
                  if (this.props.store.form.isEureka) {
                      this.props.store.setValue(newValue);
                  }
                  else {
                      this.props.store.setValue((_g = this.props.store.options[newValue]) === null || _g === void 0 ? void 0 : _g.value);
                  }
                  break;
              case exports.QuestionType.RADIO:
                  this.props.store.setValue(valueOverride);
                  break;
              case exports.QuestionType.CHECKBOX:
                  this.props.store.setValue((_j = (_h = this.input) === null || _h === void 0 ? void 0 : _h.current) === null || _j === void 0 ? void 0 : _j.checked);
                  break;
          }
      }
      resetValue() {
          this.props.store.setValue(null);
      }
      focus() {
          var _a;
          (_a = this.input.current) === null || _a === void 0 ? void 0 : _a.focus();
      }
      isTippyProps(obj) {
          return obj && obj["content"] !== undefined;
      }
      render() {
          var _a;
          let store = this.props.store;
          let body = this.buildQuestionBody();
          let classes = ["dynamic-form__question--" + store.type.toLowerCase()];
          let hasErrors = store.displayedErrors.length > 0;
          if (hasErrors) {
              classes.push("dynamic-form__question--errored");
          }
          if (store.validation.pending) {
              classes.push("dynamic-form__question--validating");
          }
          if (this.shouldAddNotEmptyClass()) {
              classes.push("dynamic-form__question--not-empty");
          }
          let tooltip;
          if (store.tooltip) {
              let tooltipProps;
              if (this.isTippyProps(store.tooltip)) {
                  tooltipProps = store.tooltip;
              }
              else {
                  tooltipProps = {
                      content: store.tooltip,
                  };
              }
              if (store.form.isEureka) {
                  tooltip = React__namespace.createElement(eurekaDesignSystem.Tooltip, { body: tooltipProps.content, scale: eurekaDesignSystem.Tooltip.Scale.SMALL, disablePortal: true, theme: tooltipProps.theme == "LIGHT" ? "LIGHT" : "DARK", "data-cname": store.cname + "__tooltip" },
                      React__namespace.createElement("span", { className: "dynamic-form__tooltip-icon" }));
              }
              else {
                  tooltipProps.theme = tooltipProps.theme || 'dynamic-form__tooltip-tippy';
                  tooltip = React__namespace.createElement(index, Object.assign({}, tooltipProps),
                      React__namespace.createElement("span", { className: "dynamic-form__tooltip-icon" }));
              }
          }
          const sublabelContent = store.subLabel && React__namespace.createElement("span", { key: "sublabel", className: "dynamic-form__sublabel" }, store.subLabel);
          const errorMessageContent = hasErrors && store.displayedErrors.map((e, i) => React__namespace.createElement("span", { className: "dynamic-form__error", key: i }, e));
          let contentBelowBody;
          if (store.regErrorPlacement == "ABOVE_SUB_LABEL") {
              contentBelowBody = [errorMessageContent, sublabelContent];
          }
          else if (store.regErrorPlacement == "BELOW_SUB_LABEL") {
              contentBelowBody = [sublabelContent, errorMessageContent];
          }
          else if (store.regErrorPlacement == "CUSTOM") {
              contentBelowBody = null;
          }
          else {
              throw new Error("Unexpected regErrorPlacement=" + store.regErrorPlacement);
          }
          let innerHTML = React__namespace.createElement(React__namespace.Fragment, null,
              React__namespace.createElement("span", { className: "dynamic-form__label dynamic-form__label--" + store.key + (store.required ? ' dynamic-form__label--required' : '') }, (_a = store.label) !== null && _a !== void 0 ? _a : "\xa0",
                  tooltip),
              body,
              contentBelowBody);
          return React__namespace.createElement("div", { className: "dynamic-form__question dynamic-form__question--" + store.key },
              !store.useDivInsteadOfLabel &&
                  React__namespace.createElement("label", { className: classes.join(" ") }, innerHTML),
              store.useDivInsteadOfLabel &&
                  React__namespace.createElement("div", { className: classes.join(" ") }, innerHTML));
      }
      buildQuestionBody() {
          let store = this.props.store;
          switch (store.type) {
              case exports.QuestionType.CHECKBOX:
                  return this.createCheckboxField();
              case exports.QuestionType.CUSTOM:
                  return this.createCustomField();
              case exports.QuestionType.SELECT:
                  return this.createSelectField();
              case exports.QuestionType.TYPEAHEAD:
                  return this.createTypeaheadField();
              case exports.QuestionType.TEXT:
                  return this.createTextField();
              case exports.QuestionType.TEXTAREA:
                  return this.createTextAreaField();
              case exports.QuestionType.RADIO:
                  return this.createRadioField();
              case exports.QuestionType.RATING_SCALE:
                  return this.createRatingScaleField();
          }
      }
      createCheckboxField() {
          var _a;
          let store = this.props.store;
          const cname = (_a = store.cname) !== null && _a !== void 0 ? _a : "dynamic_form_" + store.key;
          const testId = store.testId || cname;
          let onBlur = () => {
              if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_BLUR) > -1) {
                  this.saveValue(exports.SaveEventType.ON_BLUR);
              }
          };
          let onKeyDown = (e) => {
              if (e.code === "Enter") {
                  if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_ENTER_KEY) > -1) {
                      this.saveValue(exports.SaveEventType.ON_ENTER_KEY);
                  }
              }
          };
          const onChange = () => {
              if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_CHANGE_ALWAYS) > -1) {
                  this.saveValue(exports.SaveEventType.ON_CHANGE);
              }
              else if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_CHANGE_WHEN_DIRTY) > -1) {
                  store.dirty && this.saveValue(exports.SaveEventType.ON_CHANGE);
              }
              if (store.dirty && store.serverSideErrors.length > 0) {
                  store.setServerErrors([]);
              }
              if (store.onChange) {
                  store.onChange();
              }
          };
          if (store.form.isEureka) {
              return React__namespace.createElement(eurekaDesignSystem.Checkbox, { name: store.key, "data-cname": cname, "test-id": testId, className: "dynamic-form__checkbox", ref: this.ref, onChange: onChange, onBlur: onBlur, onKeyDown: onKeyDown });
          }
          return React__namespace.createElement("input", { type: "checkbox", name: store.key, "data-cname": cname, "test-id": testId, className: "dynamic-form__checkbox", ref: this.ref, onChange: onChange, onBlur: onBlur, onKeyDown: onKeyDown });
      }
      createCustomField() {
          let store = this.props.store;
          return store.body;
      }
      createSelectField() {
          var _a, _b;
          let store = this.props.store;
          const cname = (_a = store.cname) !== null && _a !== void 0 ? _a : "dynamic_form_" + store.key;
          const testId = store.testId || cname;
          const optionalProps = {};
          if (store.addOptionDataToDataExtra) {
              optionalProps["data-add-option-data-to-data-extra"] = true;
          }
          let options = store.options;
          let isStoreValueLegit = store.value != null && store.value !== "";
          const value = (store.dirty || isStoreValueLegit) ? store.value : store.defaultValue;
          let selectedOptionIndex = null;
          for (let i = 0; i < options.length; i++) {
              const option = options[i];
              const isOptionSelected = (value === option.value);
              if (isOptionSelected) {
                  selectedOptionIndex = i;
                  break;
              }
          }
          if (store.form.isEureka) {
              const optionsList = options.map((o) => {
                  return { value: o.value, display: o.text };
              });
              return React__namespace.createElement(eurekaDesignSystem.Select, Object.assign({ placeholder: store.includePlaceholderSelectOption ? store.placeholder : "", "data-cname": cname, "test-id": testId }, optionalProps, { onChange: (value, display) => {
                      this.saveValue(exports.SaveEventType.ON_CHANGE, value);
                      if (store.serverSideErrors.length > 0) {
                          store.setServerErrors([]);
                      }
                      if (store.onChange) {
                          store.onChange();
                      }
                  }, valueRef: this.valueRef, options: optionsList, ref: this.ref, value: value }));
          }
          return React__namespace.createElement("select", Object.assign({ "data-cname": cname, "test-id": testId, className: "dynamic-form__select", name: store.key }, optionalProps, { onChange: () => {
                  this.saveValue(exports.SaveEventType.ON_CHANGE);
                  if (store.serverSideErrors.length > 0) {
                      store.setServerErrors([]);
                  }
                  if (store.onChange) {
                      store.onChange();
                  }
              }, onBlur: () => {
                  if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_BLUR) > -1) {
                      store.dirty && this.saveValue(exports.SaveEventType.ON_BLUR);
                  }
              }, ref: this.ref, value: selectedOptionIndex !== null && selectedOptionIndex !== void 0 ? selectedOptionIndex : "", autoComplete: store.autocomplete }),
              store.includePlaceholderSelectOption && React__namespace.createElement("option", { key: "placeholder", className: "dynamic-form__select--placeholder", value: "" }, (_b = store.placeholder) !== null && _b !== void 0 ? _b : "Choose One"),
              options.map((o, i) => React__namespace.createElement("option", { key: i, value: i }, o.text)));
      }
      createRadioField() {
          var _a;
          let store = this.props.store;
          let options = store.options;
          let cname = (_a = store.cname) !== null && _a !== void 0 ? _a : "dynamic_form_" + store.key;
          let dataExtra = store.dataExtra;
          const testId = store.testId || cname;
          return React__namespace.createElement(React__namespace.Fragment, null, options.map((option, index) => {
              let optionCname = cname + option.text.toLowerCase().replace(/\s+/g, "_");
              let optionTestId = testId + option.text.toLowerCase().replace(/\s+/g, "_");
              return (store.form.isEureka ? (React__namespace.createElement(React__namespace.Fragment, null,
                  React__namespace.createElement(eurekaDesignSystem.RadioButton, { label: option.text, name: cname, "data-cname": !!dataExtra ? cname : optionCname, "data-extra": dataExtra === "text" ? option.text : dataExtra === "value" ? option.value : dataExtra, defaultChecked: option.value === store.defaultValue, value: option.value, id: optionCname, onClick: (event) => {
                          this.saveValue(exports.SaveEventType.ON_CHANGE, option.value);
                          if (store.serverSideErrors.length > 0) {
                              store.setServerErrors([]);
                          }
                          if (store.onChange) {
                              store.onChange();
                          }
                      } })))
                  :
                      (React__namespace.createElement("div", { className: "dynamic-form__radio" },
                          React__namespace.createElement("input", { type: "radio", "data-cname": !!dataExtra ? cname : optionCname, "data-extra": dataExtra === "text" ? option.text : dataExtra === "value" ? option.value : dataExtra, name: cname, defaultChecked: option.value === store.defaultValue, value: option.value, id: optionCname, onClick: (event) => {
                                  this.saveValue(exports.SaveEventType.ON_CHANGE, option.value);
                                  if (store.serverSideErrors.length > 0) {
                                      store.setServerErrors([]);
                                  }
                                  if (store.onChange) {
                                      store.onChange();
                                  }
                              } }),
                          React__namespace.createElement("label", { "test-id": optionTestId, htmlFor: optionCname }, " " + option.text + " "))));
          }));
      }
      createRatingScaleField() {
          var _a;
          let store = this.props.store;
          const cname = (_a = store.cname) !== null && _a !== void 0 ? _a : "dynamic_form_" + store.key;
          const testId = store.testId || cname;
          let sliderElements = [];
          for (let i = 1; i <= store.maxRatingScale; i++) {
              sliderElements.push(React__namespace.createElement("div", { key: `number-scale-option-${i}`, tabIndex: 0, className: "dynamic-form-scale__option" + (i === store.value ? ' dynamic-form-scale__option-selected' : ''), onClick: (event) => {
                      this.saveValue(exports.SaveEventType.ON_CHANGE, i);
                  }, onKeyDown: (event) => {
                      if (event.code === "Enter") {
                          this.saveValue(exports.SaveEventType.ON_ENTER_KEY, i);
                      }
                  }, ref: this.ref }, i));
          }
          return React__namespace.createElement(React__namespace.Fragment, null,
              React__namespace.createElement("div", { className: "dynamic-form__scale" },
                  React__namespace.createElement("div", { className: "dynamic-form-scale__options", "test-id": testId }, sliderElements),
                  React__namespace.createElement("div", { className: "dynamic-form-scale__labels" },
                      React__namespace.createElement("div", { className: "dynamic-form-scale__label-left" }, store.ratingScaleLeftLabel),
                      React__namespace.createElement("div", { className: "dynamic-form-scale__label-right" }, store.ratingScaleRightLabel))));
      }
      createTextField() {
          var _a, _b;
          let store = this.props.store;
          const cname = (_a = store.cname) !== null && _a !== void 0 ? _a : "dynamic_form_" + store.key;
          const testId = store.testId || cname;
          let dataExtra = store.dataExtra;
          let passwordToggleable = (_b = store.passwordToggleable) !== null && _b !== void 0 ? _b : false;
          let inputMode = store.inputMode;
          let onKeyDownCallback = store.onKeyDown;
          let onKeyUpCallback = store.onKeyUp;
          let elementsBeforeInput = store.elementsBeforeInput;
          let elementsAfterInput = store.elementsAfterInput;
          let onBlur = () => {
              if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_BLUR) > -1) {
                  this.saveValue(exports.SaveEventType.ON_BLUR);
              }
          };
          let onKeyDown = (e) => {
              if (e.code === "Enter") {
                  if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_ENTER_KEY) > -1) {
                      this.saveValue(exports.SaveEventType.ON_ENTER_KEY);
                  }
              }
              if (onKeyDownCallback) {
                  onKeyDownCallback(e);
              }
          };
          let onChange = () => {
              if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_CHANGE_ALWAYS) > -1) {
                  this.saveValue(exports.SaveEventType.ON_CHANGE);
              }
              else if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_CHANGE_WHEN_DIRTY) > -1) {
                  store.dirty && this.saveValue(exports.SaveEventType.ON_CHANGE);
              }
              if (store.dirty && store.serverSideErrors.length > 0) {
                  store.setServerErrors([]);
              }
              if (store.onChange) {
                  store.onChange();
              }
          };
          if (store.autocomplete) {
              let interval = setInterval(() => {
                  var _a;
                  if ((_a = this.input.current) === null || _a === void 0 ? void 0 : _a.value) {
                      this.saveValue();
                      clearInterval(interval);
                  }
              }, 100);
          }
          let type = store.textType || "text";
          let togglePassword = ['password', 'passwordConfirm'].indexOf(store.key) >= 0 && store.textType === 'password' && passwordToggleable;
          let inputElement;
          if (store.form.isEureka) {
              const inputProps = {
                  name: store.key,
                  "data-cname": cname,
                  "data-extra": dataExtra,
                  "test-id": testId,
                  placeholder: store.placeholder,
                  ref: this.ref,
                  maxLength: store.maxLength,
                  onChange: () => onChange(),
                  onBlur: onBlur,
                  onKeyDown: onKeyDown,
                  onKeyUp: onKeyUpCallback,
                  defaultValue: store.value,
                  autoComplete: store.autocomplete,
                  disabled: store.disabled,
                  invalid: store.displayedErrors.length > 0
              };
              if (store.blockEventLoggingOfValue) {
                  inputProps["data-no-log"] = true;
              }
              inputElement = (() => {
                  if (type === exports.TextType.TEL) {
                      return React__namespace.createElement(eurekaDesignSystem.Input.Phone, Object.assign({ countryCode: "US" }, inputProps));
                  }
                  else if (type === exports.TextType.CREDIT_CARD) {
                      return React__namespace.createElement(eurekaDesignSystem.Input.Text, Object.assign({ inputMode: "numeric", pattern: "[0-9 ]+", autoComplete: "cc-number" }, inputProps));
                  }
                  else if (type === exports.TextType.PASSWORD && store.passwordFieldType === 'password') {
                      return React__namespace.createElement(eurekaDesignSystem.Input.Password, Object.assign({}, inputProps));
                  }
                  else {
                      return React__namespace.createElement(eurekaDesignSystem.Input, Object.assign({}, inputProps, { type: type }));
                  }
              })();
          }
          else {
              inputElement = React__namespace.createElement("input", { type: togglePassword ? store.passwordFieldType : type, inputMode: inputMode, name: store.key, "data-cname": cname, "data-extra": dataExtra, "test-id": testId, className: "dynamic-form__text", placeholder: store.placeholder, ref: this.ref, maxLength: store.maxLength, onChange: onChange, onBlur: onBlur, onKeyDown: onKeyDown, onKeyUp: onKeyUpCallback, defaultValue: store.value, "data-no-log": store.blockEventLoggingOfValue || undefined, autoComplete: store.autocomplete, disabled: store.disabled });
          }
          let inputField = React__namespace.createElement(React__namespace.Fragment, null,
              elementsBeforeInput,
              inputElement,
              elementsAfterInput);
          return togglePassword ? (React__namespace.createElement("div", { style: { position: 'relative' } },
              inputField,
              React__namespace.createElement("span", { id: 'passwordToggle', style: { position: 'absolute', cursor: 'pointer', top: '50%', right: '13px', fontSize: '20px', transform: 'translateY(-50%)', color: '#555555' }, "data-cname": 'password-visibility-toggle', className: 'glyphicon ' + (store.passwordFieldType === 'password' ? 'glyphicon-eye-open' : 'glyphicon-eye-close'), onClick: () => {
                      if (store.passwordFieldType === 'password') {
                          store.setPasswordFieldType("text");
                      }
                      else {
                          store.setPasswordFieldType("password");
                      }
                  } }))) : inputField;
      }
      createTextAreaField() {
          var _a;
          let store = this.props.store;
          const cname = (_a = store.cname) !== null && _a !== void 0 ? _a : "dynamic_form_" + store.key;
          const testId = store.testId || cname;
          let onBlur = () => {
              if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_BLUR) > -1) {
                  this.saveValue(exports.SaveEventType.ON_BLUR);
              }
          };
          let onKeyDown = (e) => {
              if (e.code === "Enter") {
                  if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_ENTER_KEY) > -1) {
                      this.saveValue(exports.SaveEventType.ON_ENTER_KEY);
                  }
              }
          };
          let onChange = () => {
              if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_CHANGE_ALWAYS) > -1) {
                  this.saveValue(exports.SaveEventType.ON_CHANGE);
              }
              else if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_CHANGE_WHEN_DIRTY) > -1) {
                  store.dirty && this.saveValue(exports.SaveEventType.ON_CHANGE);
              }
              if (store.dirty && store.serverSideErrors.length > 0) {
                  store.setServerErrors([]);
              }
              if (store.onChange) {
                  store.onChange();
              }
          };
          return React__namespace.createElement("textarea", { name: store.key, "data-cname": cname, "test-id": testId, className: "dynamic-form__textarea", placeholder: store.placeholder, ref: this.ref, maxLength: store.maxLength, onChange: onChange, onBlur: onBlur, onKeyDown: onKeyDown, defaultValue: store.value, "data-no-log": store.blockEventLoggingOfValue || undefined, autoComplete: store.autocomplete, rows: store.rows || undefined });
      }
      createTypeaheadField() {
          var _a, _b, _c, _d;
          let store = this.props.store;
          const cname = (_a = store.cname) !== null && _a !== void 0 ? _a : "dynamic_form_" + store.key;
          const optionCname = cname + "_result";
          const testId = store.testId || cname;
          const optionTestId = testId + "_result";
          let doSave = (saveEventType, option) => {
              this.input.current.value = store.typeaheadOptionTextFn(option);
              store.typeaheadSearchText = this.input.current.value;
              this.saveValue(saveEventType, store.typeaheadOptionValueFn(option));
              this.hideTypeaheadDropdown = true;
              if (store.onChange) {
                  store.onChange();
              }
          };
          let onBlur = () => {
              var _a;
              if (store.typeaheadUseInputValueIfNoOptions && !((_a = store.typeaheadOptions.result) === null || _a === void 0 ? void 0 : _a.length)) {
                  if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_BLUR) > -1) {
                      this.saveValue(exports.SaveEventType.ON_BLUR);
                  }
              }
          };
          let onKeyDown = (e) => {
              if (e.code === "Enter") {
                  if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_ENTER_KEY) > -1) {
                      let option = store.typeaheadOptions.result[0];
                      if (option) {
                          doSave(exports.SaveEventType.ON_ENTER_KEY, option);
                      }
                  }
              }
          };
          let onChange = () => {
              var _a, _b, _c, _d, _e, _f, _g;
              store.typeaheadSearchText = (_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.value;
              this.hideTypeaheadDropdown = false;
              if (store.typeaheadUseInputValueIfNoOptions && !((_c = store.typeaheadOptions.result) === null || _c === void 0 ? void 0 : _c.length)) {
                  if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_CHANGE_ALWAYS) > -1) {
                      this.saveValue(exports.SaveEventType.ON_CHANGE, (_e = (_d = this.input) === null || _d === void 0 ? void 0 : _d.current) === null || _e === void 0 ? void 0 : _e.value);
                  }
                  else if (store.saveTriggers.indexOf(exports.SaveTrigger.ON_CHANGE_WHEN_DIRTY) > -1) {
                      store.dirty && this.saveValue(exports.SaveEventType.ON_CHANGE, (_g = (_f = this.input) === null || _f === void 0 ? void 0 : _f.current) === null || _g === void 0 ? void 0 : _g.value);
                  }
                  if (store.onChange) {
                      store.onChange();
                  }
              }
              else if (!store.typeaheadUseInputValueIfNoOptions) {
                  this.resetValue();
              }
          };
          return React__namespace.createElement(React__namespace.Fragment, null,
              React__namespace.createElement("input", { type: "text", name: store.key, "data-cname": cname, "test-id": testId, className: "dynamic-form__text", placeholder: store.placeholder, ref: this.ref, onBlur: onBlur, onKeyDown: onKeyDown, onChange: onChange, defaultValue: (store.value != null) ? String(store.value) : undefined, value: store.typeaheadSearchText, autoComplete: store.autocomplete }),
              !this.hideTypeaheadDropdown && !!((_b = store.typeaheadOptions.result) === null || _b === void 0 ? void 0 : _b.length) && ((_d = (_c = this.input.current) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.length) > store.minLengthToTriggerTypeahead &&
                  React__namespace.createElement("div", { className: "dynamic-form__typeahead-option-list" }, store.typeaheadOptions.result.map((option) => {
                      var _a, _b;
                      let value = store.typeaheadOptionValueFn(option);
                      let text = store.typeaheadOptionDisplayFn(option, (_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.value);
                      return React__namespace.createElement("div", { className: "dynamic-form__typeahead-option", onClick: () => {
                              doSave(exports.SaveEventType.ON_CHANGE, option);
                          }, "test-id": optionTestId, "data-cname": optionCname, "data-extra": value, key: value }, text);
                  })));
      }
      shouldAddNotEmptyClass() {
          var _a, _b;
          let store = this.props.store;
          if (!(store.type === exports.QuestionType.TYPEAHEAD
              || store.type === exports.QuestionType.TEXT
              || store.type === exports.QuestionType.SELECT
              || store.type === exports.QuestionType.CUSTOM)) {
              return false;
          }
          if (store.value != null && store.value !== "") {
              return true;
          }
          if (store.type === exports.QuestionType.TYPEAHEAD && ((_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.value)) {
              return true;
          }
          return false;
      }
  }
  let DynamicFormQuestionView = mobxReact.observer(_DynamicFormQuestionView);

  exports.DEFAULT_SELECT_SAVE_TRIGGERS = DEFAULT_SELECT_SAVE_TRIGGERS;
  exports.DEFAULT_TEXT_SAVE_TRIGGERS = DEFAULT_TEXT_SAVE_TRIGGERS;
  exports.DEFAULT_TYPEAHEAD_SAVE_TRIGGERS = DEFAULT_TYPEAHEAD_SAVE_TRIGGERS;
  exports.DynamicFormPage = DynamicFormPage;
  exports.DynamicFormPageView = DynamicFormPageView;
  exports.DynamicFormQuestion = DynamicFormQuestion;
  exports.DynamicFormQuestionView = DynamicFormQuestionView;
  exports.DynamicFormStore = DynamicFormStore;
  exports.DynamicFormView = DynamicFormView;
  exports.SUPPRESS_ON_CHANGE_FOR_TEXT_SAVE_TRIGGERS = SUPPRESS_ON_CHANGE_FOR_TEXT_SAVE_TRIGGERS;

}));
//# sourceMappingURL=dynamic-form.js.map

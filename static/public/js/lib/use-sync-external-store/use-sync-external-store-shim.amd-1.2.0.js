/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
define(['react'],function(e){'use strict';function h(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var k=typeof Object.is==='function'?Object.is:h;var l=e.useState;var m=e.useEffect;var n=e.useLayoutEffect;var p=e.useDebugValue;function q(a,b){var d=b();var f=l({inst:{value:d,getSnapshot:b}});var c=f[0].inst;var g=f[1];n(function(){c.value=d;c.getSnapshot=b;r(c)&&g({inst:c})},[a,d,b]);m(function(){r(c)&&g({inst:c});return a(function(){r(c)&&g({inst:c})})},[a]);p(d);return d}function r(a){var b=a.getSnapshot;var aValue=a.value;try{var d=b();return!k(aValue,d)}catch(f){return true}}function t(a,b){return b()}var u=typeof window==='undefined'||typeof window.document==='undefined'||typeof window.document.createElement==='undefined'?t:q;return{useSyncExternalStore:typeof e.useSyncExternalStore!=='undefined'?e.useSyncExternalStore:u}});
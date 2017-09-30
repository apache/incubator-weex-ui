// { "framework": "Vue" }

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["npm/weex-ui/index"] = factory();
	else
		root["npm/weex-ui/index"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(20)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var required = __webpack_require__(30),
    qs = __webpack_require__(31),
    protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
    slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [['#', 'hash'], // Extract from the back.
['?', 'query'], // Extract from the back.
['/', 'pathname'], // Extract from the back.
['@', 'auth', 1], // Extract from the front.
[NaN, 'host', undefined, 1, 1], // Set left over value.
[/:(\d+)$/, 'port', undefined, 1], // RegExp the back.
[NaN, 'hostname', undefined, 1, 1] // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @api public
 */
function lolcation(loc) {
  loc = loc || {}.location || {};

  var finaldestination = {},
      type = typeof loc === 'undefined' ? 'undefined' : _typeof(loc),
      key;

  if ('blob:' === loc.protocol) {
    finaldestination = new URL(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new URL(loc, {});
    for (key in ignore) {
      delete finaldestination[key];
    }
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @api private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @api private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/')),
      i = path.length,
      last = path[i - 1],
      unshift = false,
      up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @api public
 */
function URL(address, location, parser) {
  if (!(this instanceof URL)) {
    return new URL(address, location, parser);
  }

  var relative,
      extracted,
      parse,
      instruction,
      index,
      key,
      instructions = rules.slice(),
      type = typeof location === 'undefined' ? 'undefined' : _typeof(location),
      url = this,
      i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if (index = parse.exec(address)) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (relative && instruction[3] ? location[key] || '' : '');

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (relative && location.slashes && url.pathname.charAt(0) !== '/' && (url.pathname !== '' || location.pathname !== '')) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL}
 * @api public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname + ':' + value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':' + url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
      url.pathname = value.length && value.charAt(0) !== '/' ? '/' + value : value;

      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String}
 * @api public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query,
      url = this,
      protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':' + url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === _typeof(url.query) ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?' + query : query;

  if (url.hash) result += url.hash;

  return result;
}

URL.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
URL.extractProtocol = extractProtocol;
URL.location = lolcation;
URL.qs = qs;

module.exports = URL;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(24);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(91);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Tw93 on 2017/6/26.
 */
var UrlParser = __webpack_require__(3);
var Utils = {
  UrlParser: UrlParser,
  /**
   * 对象类型
   * @memberOf Utils
   * @param obj
   * @returns {string}
   * @private
   */
  _typeof: function _typeof(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },


  /**
   * 判断 obj 是否为 `object`
   * @memberOf Utils
   * @param obj
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wxv-bridge');
   * const { isPlainObject } = Utils;
   * console.log(isPlainObject({})); // true
   * console.log(isPlainObject('')); // false
   */
  isPlainObject: function isPlainObject(obj) {
    return Utils._typeof(obj) === 'object';
  },


  /**
   * 判断 obj 是否为 `string`
   * @memberOf Utils
   * @param obj
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wxv-bridge');
   * const { isString } = Utils;
   * console.log(isString({})); // false
   * console.log(isString('')); // true
   */
  isString: function isString(obj) {
    return typeof obj === 'string';
  },


  /**
   * 判断 obj 是否为 `非空数组`
   * @memberOf Utils
   * @param obj
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wxv-bridge');
   * const { isNonEmptyArray } = Utils;
   * console.log(isNonEmptyArray([])); // false
   * console.log(isNonEmptyArray([1,1,1,1])); // true
   */
  isNonEmptyArray: function isNonEmptyArray() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  },
  appendProtocol: function appendProtocol(url) {
    if (/^\/\//.test(url)) {
      var bundleUrl = weex.config.bundleUrl;

      return 'http' + (/^https:/.test(bundleUrl) ? 's' : '') + ':' + url;
    }
    return url;
  },
  encodeURLParams: function encodeURLParams(url) {
    var parsedUrl = new UrlParser(url, true);
    return parsedUrl.toString();
  },
  goToH5Page: function goToH5Page(jumpUrl) {
    var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var Navigator = weex.requireModule('navigator');
    var jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
    var url = appendProtocol(jumpUrlObj.toString());
    Navigator.push({
      url: Utils.encodeURLParams(url),
      animated: animated
    }, callback);
  }
};
module.exports = Utils;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(181)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(183),
  /* template */
  __webpack_require__(184),
  /* scopeId */
  "data-v-72879af8",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-text.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] wxc-rich-text-text.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72879af8", Component.options)
  } else {
    hotAPI.reload("data-v-72879af8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(34)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(36),
  /* template */
  __webpack_require__(38),
  /* scopeId */
  "data-v-702739a6",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-checkbox/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-702739a6", Component.options)
  } else {
    hotAPI.reload("data-v-702739a6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(87);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Tw93 on 2016/10/29.
 */
module.exports = {
  GIF: "//img.alicdn.com/tfs/TB1aks3PpXXXXcXXFXXXXXXXXXX-150-150.gif",
  BLACK_GIF: "//img.alicdn.com/tfs/TB1Ep_9NVXXXXb8XVXXXXXXXXXX-74-74.gif",
  PNG: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAMAAAAPkIrYAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAI6UExURUxpcf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////5U/27QAAAC9dFJOUwBCaz78AvsB/f7E4Egk9tCgLbAfVSmu7AjtC/HqvQQoDpSeNzMbswYhieZk9fkNuuVY93UZStFFr5tpqzysK7VOyLLLCpoD1n6GGnoYjRLp+GwPmRx9Q9J/8+cVIsrcHdsHbfITbtVNw5f0cyCRDKaMBbmkikA/gkldpXseUceTt5iiFuSLtDifhLw7JipSFICpg3jZ092+zDFau3I0lW/G2t4JEIHJYKNqrV7o4WVGpyV8Zzac7i/Y4sJUOVnIpSYAAAM1SURBVFjD7ZjVWxtBFMUDJFlCgACBAAlQ3IprgVJaChRanCLFoVCgQN3d3d3d3f38b72B9mOzzCY7+8JL7tueud9vNzNzz52JRuMOd8xV5I3kTlp6jJ3f/L3hPLKccsxNQVlQHOXyoOWtJnBFtRxp4UX9dIbt1+Tw7z8TXc1hOkmKIA567w42KfDAFCct8eVHQdGsJgDaaNZAdNHUNF/PDlO8QvOBpSzdy0ggbewZntW2ACkMeYX9oxaEcG2cpNXA3VlqVCWRQoM5N2E20DsbFUSoyFreDf0AaJVqQgChAjbyojyAnC6pWEOoDdxlJtwAWqSir4FmXeBm0YbwT5CWcQRQsI4bdT4cuBYTE7NbLK4HIsz8TnLiXz3uEpcgPRfyo7z+13axSOwBNqkwOF9PimEtEDijbQUM8Wodsw1IFS3aMaBEtfvSFt8vsj4DvOepRSVTDYt+033AR/Vn1QH7RI8+wGW1qAl/YPHMo1XvsBB8UU5OKDiU51u1KHIcQ5zYAYExlajAtUClWCCz+awOVdsLrLGKlVHAQxXK3A+scnR06hfdalBffgKN+Y4a+cYQPynqKS1/jq9ETQeSuFGnr9obTZtUJv5jblYpoTLzZsnU4FZys24DlxiW3gB852Y9BFh28EPFntClw8A6cmQCvM1a00cGyNK/AoMqnJ5pU+PABxV98YXMO97wsl4B4yzdSi57lg81QP7gxxwhX23iY+WTP7BHcoFEPlYLUMMe8QNnH8ogO4iTGYsEDvGwOoB+uTPRXkCfrBxVbwNuyQ1WLQMOKmelAO062dEROokrrskQx5bIqskIhcbTfAVY4izh8BFKUOSuQiI1jEVOU46TUxcpOa9up+56zkVOMZluqdWlbx2ltJMuXxhLWaY9znOiyyipTOfaKrdQXsM2Zyl+tHdQUqFkWnc2UqpFdl7rU9Jori4ovATEdRLMezPTTTKqbfYrqnI3T7DYT9j6U3ck974nwbHh9hHTTZ6yLSyYPrEbx955JA+FDfTF5z/vGNVOaaGeVbyH9kgD867/aLBCwx/m3Gda6Z8Z97wEjcrIeP8pwMcYmqO1pbYH1b3u1rjDHXMbfwFhDJatfL699wAAAABJRU5ErkJggg==",
  PART: '//gtms02.alicdn.com/tfs/TB1y4QbSXXXXXbgapXXXXXXXXXX-50-50.gif'
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(110);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isIOS = isIOS;
exports.isWeb = isWeb;
exports.getPageHeight = getPageHeight;
/**
 * Created by Tw93 on 2017/6/26.
 */

function isIOS() {
  var platform = weex.config.env.platform;

  return platform.toLowerCase() === 'ios';
}

function isWeb() {
  var platform = weex.config.env.platform;

  return (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
}

function getPageHeight() {
  var env = weex.config.env;

  var navHeight = isWeb() ? 0 : 130;
  return env.deviceHeight / env.deviceWidth * 750 - navHeight;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(188)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(190),
  /* template */
  __webpack_require__(191),
  /* scopeId */
  "data-v-fb43e778",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-icon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] wxc-rich-text-icon.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fb43e778", Component.options)
  } else {
    hotAPI.reload("data-v-fb43e778", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(192)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(194),
  /* template */
  __webpack_require__(195),
  /* scopeId */
  "data-v-8c80ddc2",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-tag.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] wxc-rich-text-tag.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8c80ddc2", Component.options)
  } else {
    hotAPI.reload("data-v-8c80ddc2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WxcTag = exports.WxcTabPage = exports.WxcStepper = exports.WxcSliderBar = exports.WxcSlideNav = exports.WxcSimpleFlow = exports.WxcSearchbar = exports.WxcSpecialRichText = exports.WxcRichText = exports.WxcResult = exports.WxcRadio = exports.WxcProgress = exports.WxcPopup = exports.WxcPageCalendar = exports.WxcOverlay = exports.WxcNoticebar = exports.WxcLotteryRain = exports.WxcMinibar = exports.WxcMask = exports.WxcPartLoading = exports.WxcLoading = exports.WxcLightbox = exports.WxcIndexlist = exports.WxcGridSelect = exports.WxcEpSlider = exports.WxcDialog = exports.WxcCountdown = exports.WxcCheckboxList = exports.WxcCheckbox = exports.WxcCell = exports.WxcButton = undefined;

var _wxcButton = __webpack_require__(16);

var _wxcButton2 = _interopRequireDefault(_wxcButton);

var _wxcCell = __webpack_require__(4);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _wxcCheckbox = __webpack_require__(33);

var _wxcCheckbox2 = _interopRequireDefault(_wxcCheckbox);

var _wxcCheckboxList = __webpack_require__(39);

var _wxcCheckboxList2 = _interopRequireDefault(_wxcCheckboxList);

var _wxcCountdown = __webpack_require__(45);

var _wxcCountdown2 = _interopRequireDefault(_wxcCountdown);

var _wxcDialog = __webpack_require__(51);

var _wxcDialog2 = _interopRequireDefault(_wxcDialog);

var _wxcEpSlider = __webpack_require__(58);

var _wxcEpSlider2 = _interopRequireDefault(_wxcEpSlider);

var _wxcGridSelect = __webpack_require__(65);

var _wxcGridSelect2 = _interopRequireDefault(_wxcGridSelect);

var _wxcIndexlist = __webpack_require__(75);

var _wxcIndexlist2 = _interopRequireDefault(_wxcIndexlist);

var _wxcLightbox = __webpack_require__(82);

var _wxcLightbox2 = _interopRequireDefault(_wxcLightbox);

var _wxcLoading = __webpack_require__(99);

var _wxcLoading2 = _interopRequireDefault(_wxcLoading);

var _wxcPartLoading = __webpack_require__(106);

var _wxcPartLoading2 = _interopRequireDefault(_wxcPartLoading);

var _wxcMask = __webpack_require__(9);

var _wxcMask2 = _interopRequireDefault(_wxcMask);

var _wxcMinibar = __webpack_require__(11);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

var _wxcLotteryRain = __webpack_require__(116);

var _wxcLotteryRain2 = _interopRequireDefault(_wxcLotteryRain);

var _wxcNoticebar = __webpack_require__(130);

var _wxcNoticebar2 = _interopRequireDefault(_wxcNoticebar);

var _wxcOverlay = __webpack_require__(5);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

var _wxcPageCalendar = __webpack_require__(138);

var _wxcPageCalendar2 = _interopRequireDefault(_wxcPageCalendar);

var _wxcPopup = __webpack_require__(145);

var _wxcPopup2 = _interopRequireDefault(_wxcPopup);

var _wxcProgress = __webpack_require__(151);

var _wxcProgress2 = _interopRequireDefault(_wxcProgress);

var _wxcRadio = __webpack_require__(157);

var _wxcRadio2 = _interopRequireDefault(_wxcRadio);

var _wxcResult = __webpack_require__(169);

var _wxcResult2 = _interopRequireDefault(_wxcResult);

var _wxcRichText = __webpack_require__(176);

var _wxcRichText2 = _interopRequireDefault(_wxcRichText);

var _wxcSpecialRichText = __webpack_require__(197);

var _wxcSpecialRichText2 = _interopRequireDefault(_wxcSpecialRichText);

var _wxcSearchbar = __webpack_require__(203);

var _wxcSearchbar2 = _interopRequireDefault(_wxcSearchbar);

var _wxcSimpleFlow = __webpack_require__(210);

var _wxcSimpleFlow2 = _interopRequireDefault(_wxcSimpleFlow);

var _wxcSlideNav = __webpack_require__(216);

var _wxcSlideNav2 = _interopRequireDefault(_wxcSlideNav);

var _wxcSliderBar = __webpack_require__(222);

var _wxcSliderBar2 = _interopRequireDefault(_wxcSliderBar);

var _wxcStepper = __webpack_require__(229);

var _wxcStepper2 = _interopRequireDefault(_wxcStepper);

var _wxcTabPage = __webpack_require__(235);

var _wxcTabPage2 = _interopRequireDefault(_wxcTabPage);

var _wxcTag = __webpack_require__(242);

var _wxcTag2 = _interopRequireDefault(_wxcTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.WxcButton = _wxcButton2.default;
exports.WxcCell = _wxcCell2.default;
exports.WxcCheckbox = _wxcCheckbox2.default;
exports.WxcCheckboxList = _wxcCheckboxList2.default;
exports.WxcCountdown = _wxcCountdown2.default;
exports.WxcDialog = _wxcDialog2.default;
exports.WxcEpSlider = _wxcEpSlider2.default;
exports.WxcGridSelect = _wxcGridSelect2.default;
exports.WxcIndexlist = _wxcIndexlist2.default;
exports.WxcLightbox = _wxcLightbox2.default;
exports.WxcLoading = _wxcLoading2.default;
exports.WxcPartLoading = _wxcPartLoading2.default;
exports.WxcMask = _wxcMask2.default;
exports.WxcMinibar = _wxcMinibar2.default;
exports.WxcLotteryRain = _wxcLotteryRain2.default;
exports.WxcNoticebar = _wxcNoticebar2.default;
exports.WxcOverlay = _wxcOverlay2.default;
exports.WxcPageCalendar = _wxcPageCalendar2.default;
exports.WxcPopup = _wxcPopup2.default;
exports.WxcProgress = _wxcProgress2.default;
exports.WxcRadio = _wxcRadio2.default;
exports.WxcResult = _wxcResult2.default;
exports.WxcRichText = _wxcRichText2.default;
exports.WxcSpecialRichText = _wxcSpecialRichText2.default;
exports.WxcSearchbar = _wxcSearchbar2.default;
exports.WxcSimpleFlow = _wxcSimpleFlow2.default;
exports.WxcSlideNav = _wxcSlideNav2.default;
exports.WxcSliderBar = _wxcSliderBar2.default;
exports.WxcStepper = _wxcStepper2.default;
exports.WxcTabPage = _wxcTabPage2.default;
exports.WxcTag = _wxcTag2.default; /**
                                    * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
                                    * Created by Tw93 on 17/09/25
                                    */

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(17);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(18)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(23),
  /* scopeId */
  "data-v-36f80855",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-button/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-36f80855", Component.options)
  } else {
    hotAPI.reload("data-v-36f80855", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f2ecc62a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-36f80855\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-36f80855\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-btn[data-v-36f80855] {\n  width: 702px;\n  height: 88px;\n  align-items: center;\n  justify-content: center;\n  border-radius: 12px;\n}\n.btn-text[data-v-36f80855] {\n  text-overflow: ellipsis;\n  lines: 1;\n  font-size: 36px;\n  color: #FFFFFF;\n}\n\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-button/index.vue?1ad8844c"],"names":[],"mappings":";AA2DA;EACA,aAAA;EACA,aAAA;EACA,oBAAA;EACA,wBAAA;EACA,oBAAA;CACA;AAEA;EACA,wBAAA;EACA,SAAA;EACA,gBAAA;EACA,eAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n<template>\n  <div class=\"wxc-btn\"\n       :style=\"mrBtnStyle\"\n       @click=\"onClicked\">\n    <text class=\"btn-text\"\n          :style=\"mrTextStyle\">{{text}}</text>\n  </div>\n</template>\n\n<script>\n  import { STYLE_MAP, TEXT_STYLE_MAP } from './type'\n  export default {\n    props: {\n      text: {\n        type: String,\n        default: '确认'\n      },\n      type: {\n        type: String,\n        default: 'taobao'\n      },\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      btnStyle: Object,\n      textStyle: Object\n    },\n    computed: {\n      mrBtnStyle () {\n        const { type, disabled, btnStyle } = this;\n        const mrBtnStyle = {\n          ...STYLE_MAP[type],\n          ...btnStyle\n        };\n        return disabled ? {\n          ...mrBtnStyle,\n          backgroundColor: 'rgba(0, 0, 0, 0.1)',\n          borderWidth: 0\n        } : mrBtnStyle;\n      },\n      mrTextStyle () {\n        const { type, disabled, textStyle } = this;\n        const mrTextStyle = { ...TEXT_STYLE_MAP[type], ...textStyle };\n        return disabled ? { ...mrTextStyle, color: '#FFFFFF' } : mrTextStyle;\n      }\n    },\n    methods: {\n      onClicked (e) {\n        const { type, disabled } = this;\n        this.$emit('wxcButtonClicked', { e, type, disabled })\n      }\n    }\n  }\n</script>\n\n<style scoped>\n  .wxc-btn {\n    width: 702px;\n    height: 88px;\n    align-items: center;\n    justify-content: center;\n    border-radius: 12px;\n  }\n\n  .btn-text {\n    text-overflow: ellipsis;\n    lines: 1;\n    font-size: 36px;\n    color: #FFFFFF;\n  }\n\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//

var _type = __webpack_require__(22);

exports.default = {
  props: {
    text: {
      type: String,
      default: '确认'
    },
    type: {
      type: String,
      default: 'taobao'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    btnStyle: Object,
    textStyle: Object
  },
  computed: {
    mrBtnStyle: function mrBtnStyle() {
      var type = this.type,
          disabled = this.disabled,
          btnStyle = this.btnStyle;

      var mrBtnStyle = _extends({}, _type.STYLE_MAP[type], btnStyle);
      return disabled ? _extends({}, mrBtnStyle, {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 0
      }) : mrBtnStyle;
    },
    mrTextStyle: function mrTextStyle() {
      var type = this.type,
          disabled = this.disabled,
          textStyle = this.textStyle;

      var mrTextStyle = _extends({}, _type.TEXT_STYLE_MAP[type], textStyle);
      return disabled ? _extends({}, mrTextStyle, { color: '#FFFFFF' }) : mrTextStyle;
    }
  },
  methods: {
    onClicked: function onClicked(e) {
      var type = this.type,
          disabled = this.disabled;

      this.$emit('wxcButtonClicked', { e: e, type: type, disabled: disabled });
    }
  }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var STYLE_MAP = exports.STYLE_MAP = {
  taobao: {
    backgroundColor: '#FF5000'
  },
  fliggy: {
    backgroundColor: '#FFC900'
  },
  normal: {
    backgroundColor: '#FFFFFF',
    borderColor: '#A5A5A5',
    borderWidth: '1px'
  },
  highlight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EE9900',
    borderWidth: '1px'
  }
};

var TEXT_STYLE_MAP = exports.TEXT_STYLE_MAP = {
  taobao: {
    color: '#FFFFFF'
  },
  fliggy: {
    color: '#3D3D3D'
  },
  normal: {
    color: '#3D3D3D'
  },
  highlight: {
    color: '#EE9900'
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-btn",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrBtnStyle)),
    on: {
      "click": _vm.onClicked
    }
  }, [_c('text', {
    staticClass: "btn-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrTextStyle))
  }, [_vm._v(_vm._s(_vm.text))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-36f80855", module.exports)
  }
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(25)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(32),
  /* scopeId */
  "data-v-289df085",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-cell/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-289df085", Component.options)
  } else {
    hotAPI.reload("data-v-289df085", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0ce6f0a6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-289df085\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-289df085\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-cell[data-v-289df085] {\n  height: 100px;\n  position: relative;\n  flex-direction: row;\n  align-items: center;\n  padding-left: 24px;\n  padding-right: 24px;\n  background-color: #ffffff;\n}\n.cell-margin[data-v-289df085] {\n  margin-bottom: 24px;\n}\n.cell-title[data-v-289df085] {\n  flex: 1;\n}\n.cell-indent[data-v-289df085] {\n  padding-bottom: 30px;\n  padding-top: 30px;\n}\n.has-desc[data-v-289df085] {\n  padding-bottom: 18px;\n  padding-top: 18px;\n}\n.cell-top-border[data-v-289df085] {\n  border-top-color: #e2e2e2;\n  border-top-width: 1px;\n}\n.cell-bottom-border[data-v-289df085] {\n  border-bottom-color: #e2e2e2;\n  border-bottom-width: 1px;\n}\n.cell-label-text[data-v-289df085] {\n  font-size: 30px;\n  color: #666666;\n  width: 188px;\n  margin-right: 10px;\n}\n.cell-arrow-icon[data-v-289df085] {\n  width: 22px;\n  height: 22px;\n  position: absolute;\n  top: 41px;\n  right: 24px;\n}\n.cell-content[data-v-289df085] {\n  color: #333333;\n  font-size: 30px;\n  line-height: 40px;\n}\n.cell-desc-text[data-v-289df085] {\n  color: #999999;\n  font-size: 24px;\n  line-height: 30px;\n  margin-top: 4px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-cell/index.vue?dd94e6c0"],"names":[],"mappings":";AA+BA;EACA,cAAA;EACA,mBAAA;EACA,oBAAA;EACA,oBAAA;EACA,mBAAA;EACA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,oBAAA;CACA;AAEA;EACA,QAAA;CACA;AAEA;EACA,qBAAA;EACA,kBAAA;CACA;AAEA;EACA,qBAAA;EACA,kBAAA;CACA;AAEA;EACA,0BAAA;EACA,sBAAA;CACA;AAEA;EACA,6BAAA;EACA,yBAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,UAAA;EACA,YAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,gBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/09/25. -->\n<!--A Cell -->\n\n<template>\n  <div\n    :class=\"['wxc-cell', hasTopBorder && 'cell-top-border', hasBottomBorder && 'cell-bottom-border', hasMargin && 'cell-margin', hasVerticalIndent && 'cell-indent', desc && 'has-desc']\"\n    :style=\"cellStyle\"\n    @click=\"cellClicked\"\n    :link=\"link\">\n    <slot name=\"label\">\n      <div v-if=\"label\">\n        <text class=\"cell-label-text\">{{label}}</text>\n      </div>\n    </slot>\n    <div class=\"cell-title\">\n      <slot name=\"title\">\n        <text class=\"cell-content\">{{title}}</text>\n        <text class=\"cell-desc-text\"\n              v-if=\"desc\">{{desc}}</text>\n      </slot>\n    </div>\n    <slot name=\"value\"></slot>\n    <slot></slot>\n    <image :src=\"arrowIcon\"\n           class=\"cell-arrow-icon\"\n           v-if=\"hasArrow\"></image>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-cell {\n    height: 100px;\n    position: relative;\n    flex-direction: row;\n    align-items: center;\n    padding-left: 24px;\n    padding-right: 24px;\n    background-color: #ffffff;\n  }\n\n  .cell-margin {\n    margin-bottom: 24px;\n  }\n\n  .cell-title {\n    flex: 1;\n  }\n\n  .cell-indent {\n    padding-bottom: 30px;\n    padding-top: 30px;\n  }\n\n  .has-desc {\n    padding-bottom: 18px;\n    padding-top: 18px;\n  }\n\n  .cell-top-border {\n    border-top-color: #e2e2e2;\n    border-top-width: 1px;\n  }\n\n  .cell-bottom-border {\n    border-bottom-color: #e2e2e2;\n    border-bottom-width: 1px;\n  }\n\n  .cell-label-text {\n    font-size: 30px;\n    color: #666666;\n    width: 188px;\n    margin-right: 10px;\n  }\n\n  .cell-arrow-icon {\n    width: 22px;\n    height: 22px;\n    position: absolute;\n    top: 41px;\n    right: 24px;\n  }\n\n  .cell-content {\n    color: #333333;\n    font-size: 30px;\n    line-height: 40px;\n  }\n\n  .cell-desc-text {\n    color: #999999;\n    font-size: 24px;\n    line-height: 30px;\n    margin-top: 4px;\n  }\n</style>\n\n<script>\n  const icon = require('./icon.base64.js');\n  const Utils = require('./utils');\n  module.exports = {\n    props: {\n      label: {\n        type: String,\n        default: ''\n      },\n      title: {\n        type: String,\n        default: ''\n      },\n      desc: {\n        type: String,\n        default: ''\n      },\n      link: {\n        type: String,\n        default: ''\n      },\n      hasTopBorder: {\n        type: Boolean,\n        default: false\n      },\n      hasMargin: {\n        type: Boolean,\n        default: false\n      },\n      hasBottomBorder: {\n        type: Boolean,\n        default: true\n      },\n      hasArrow: {\n        type: Boolean,\n        default: false\n      },\n      hasVerticalIndent: {\n        type: Boolean,\n        default: true\n      },\n      cellStyle: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    data: () => ({\n      arrowIcon: icon.arrowIcon\n    }),\n    methods: {\n      cellClicked (e) {\n        const link = this.link;\n        this.$emit('wxcCellDivClick', { e });\n        link && Utils.goToH5Page(link, true);\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var icon = __webpack_require__(28);
var Utils = __webpack_require__(29);
module.exports = {
  props: {
    label: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    hasMargin: {
      type: Boolean,
      default: false
    },
    hasBottomBorder: {
      type: Boolean,
      default: true
    },
    hasArrow: {
      type: Boolean,
      default: false
    },
    hasVerticalIndent: {
      type: Boolean,
      default: true
    },
    cellStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      arrowIcon: icon.arrowIcon
    };
  },
  methods: {
    cellClicked: function cellClicked(e) {
      var link = this.link;
      this.$emit('wxcCellDivClick', { e: e });
      link && Utils.goToH5Page(link, true);
    }
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Tw93 on 2016/10/29.
 */
module.exports = {
  arrowIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWBAMAAAA2mnEIAAAAMFBMVEUAAAAgIyUgIyUgIyUgIyUgIyUgIyUgIyUgIyUgIyUgIyUgIyUgIyUgIyUgIyUgIyXxqNxkAAAAEHRSTlMATEYxFA4CPTgqCUMlIhsZEJGcAQAAAE5JREFUGNNjAIKLDxjgQFAewT4o6ABncwqKICQmIkkwC6oiJAyFArBKsDUKLYBzMgR3ISQKxTHZCDUIvQgzMe1CCCPchnAzwi+YfkT4HQA98hAFt122dQAAAABJRU5ErkJggg==",
  extendIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAMAAAA1k+1bAAAAM1BMVEUAAACYmJiXl5eZmZmampqYmJiYmJiXl5eZmZmYmJiYmJiZmZmZmZmYmJibm5ubm5uZmZlAoLvfAAAAEHRSTlMA9fZuSmhhUfhzVziEQ0IhhORZQgAAAEJJREFUCNdFyzkSwCAMQ1Ehg9my6P6nTeF4eI3mFwJsTjNrrbn7hS2NUX4CHipxAajM6sDpUhE6o9KieOPYil96Yz7ijwK/GAbG3wAAAABJRU5ErkJggg=="
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Tw93 on 2017/6/26.
 */
var UrlParser = __webpack_require__(3);
var Utils = {
  UrlParser: UrlParser,
  appendProtocol: function appendProtocol(url) {
    if (/^\/\//.test(url)) {
      var bundleUrl = weex.config.bundleUrl;

      return 'http' + (/^https:/.test(bundleUrl) ? 's' : '') + ':' + url;
    }
    return url;
  },
  encodeURLParams: function encodeURLParams(url) {
    var parsedUrl = new UrlParser(url, true);
    return parsedUrl.toString();
  },
  goToH5Page: function goToH5Page(jumpUrl) {
    var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var Navigator = weex.requireModule('navigator');
    var jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
    var url = Utils.appendProtocol(jumpUrlObj.toString());
    Navigator.push({
      url: Utils.encodeURLParams(url),
      animated: animated
    }, callback);
  }
};
module.exports = Utils;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */

module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
      return port !== 80;

    case 'https':
    case 'wss':
      return port !== 443;

    case 'ftp':
      return port !== 21;

    case 'gopher':
      return port !== 70;

    case 'file':
      return false;
  }

  return port !== 0;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g,
      result = {},
      part;

  //
  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
  // the lastIndex property so we can continue executing this loop until we've
  // parsed all results.
  //
  for (; part = parser.exec(query); result[decode(part[1])] = decode(part[2])) {}

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['wxc-cell', _vm.hasTopBorder && 'cell-top-border', _vm.hasBottomBorder && 'cell-bottom-border', _vm.hasMargin && 'cell-margin', _vm.hasVerticalIndent && 'cell-indent', _vm.desc && 'has-desc'],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.cellStyle)),
    attrs: {
      "link": _vm.link
    },
    on: {
      "click": _vm.cellClicked
    }
  }, [_vm._t("label", [(_vm.label) ? _c('div', [_c('text', {
    staticClass: "cell-label-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.label))])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "cell-title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("title", [_c('text', {
    staticClass: "cell-content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.desc) ? _c('text', {
    staticClass: "cell-desc-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.desc))]) : _vm._e()])], 2), _vm._v(" "), _vm._t("value"), _vm._v(" "), _vm._t("default"), _vm._v(" "), (_vm.hasArrow) ? _c('image', {
    staticClass: "cell-arrow-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.arrowIcon
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-289df085", module.exports)
  }
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(8);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f2b7ed72", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-702739a6\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-702739a6\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.checkbox[data-v-702739a6] {\n  width: 48px;\n  height: 48px;\n}\n.title-text[data-v-702739a6]{\n  font-size: 30px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-checkbox/index.vue?004ad62c"],"names":[],"mappings":";AAgBA;EACA,YAAA;EACA,aAAA;CACA;AACA;EACA,gBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <wxc-cell :has-top-border=\"hasTopBorder\"\n            v-on:wxcCellDivClick=\"wxcCellDivClick\">\n    <text :style=\"{color:color}\"\n          class=\"title-text\"\n          slot=\"title\">{{title}}</text>\n    <image :src=\"checkIcon\"\n           slot=\"value\"\n           class=\"checkbox\"></image>\n  </wxc-cell>\n</template>\n\n<style scoped>\n  .checkbox {\n    width: 48px;\n    height: 48px;\n  }\n  .title-text{\n    font-size: 30px;\n  }\n</style>\n\n<script>\n  import WxcCell from '../wxc-cell';\n  import { CHECKED, UNCHECKED, CHECKED_DISABLED, UNCHECKED_DISABLED } from './icon.base64.js'\n  export default {\n    components: { WxcCell },\n    props: {\n      hasTopBorder: {\n        type: Boolean,\n        default: false\n      },\n      title: {\n        type: String,\n        require: true\n      },\n      value: {\n        type: [String, Number, Object],\n        require: true\n      },\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      checked: {\n        type: Boolean,\n        default: false\n      }\n    },\n    data: () => ({\n      icon: [CHECKED, UNCHECKED, CHECKED_DISABLED, UNCHECKED_DISABLED],\n      color: '#3D3D3D',\n      innerChecked: false\n    }),\n    computed: {\n      checkIcon () {\n        const { icon, disabled, innerChecked } = this;\n        if (disabled) {\n          return icon[innerChecked ? 2 : 3];\n        } else {\n          return icon[innerChecked ? 0 : 1];\n        }\n      }\n    },\n    created () {\n      const { checked, disabled } = this;\n      this.innerChecked = checked;\n      this.color = checked && !disabled ? '#EE9900' : '#3D3D3D';\n    },\n    methods: {\n      wxcCellDivClick () {\n        const { disabled, innerChecked, value } = this;\n        if (!disabled) {\n          this.innerChecked = !innerChecked;\n          this.color = (this.innerChecked ? '#EE9900' : '#3D3D3D');\n          this.$emit('wxcCheckBoxItemChecked', { value, checked: this.innerChecked })\n        }\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wxcCell = __webpack_require__(4);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _iconBase = __webpack_require__(37);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: { WxcCell: _wxcCell2.default },
  props: {
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      require: true
    },
    value: {
      type: [String, Number, Object],
      require: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      icon: [_iconBase.CHECKED, _iconBase.UNCHECKED, _iconBase.CHECKED_DISABLED, _iconBase.UNCHECKED_DISABLED],
      color: '#3D3D3D',
      innerChecked: false
    };
  },
  computed: {
    checkIcon: function checkIcon() {
      var icon = this.icon,
          disabled = this.disabled,
          innerChecked = this.innerChecked;

      if (disabled) {
        return icon[innerChecked ? 2 : 3];
      } else {
        return icon[innerChecked ? 0 : 1];
      }
    }
  },
  created: function created() {
    var checked = this.checked,
        disabled = this.disabled;

    this.innerChecked = checked;
    this.color = checked && !disabled ? '#EE9900' : '#3D3D3D';
  },

  methods: {
    wxcCellDivClick: function wxcCellDivClick() {
      var disabled = this.disabled,
          innerChecked = this.innerChecked,
          value = this.value;

      if (!disabled) {
        this.innerChecked = !innerChecked;
        this.color = this.innerChecked ? '#EE9900' : '#3D3D3D';
        this.$emit('wxcCheckBoxItemChecked', { value: value, checked: this.innerChecked });
      }
    }
  }
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  CHECKED: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEjUExURUxpce2YAO2ZAAAAANuSAO6YAO6ZAO2XAO2ZAICAAOyXAO2YAO6ZAO6ZAO6YAOyVAO6ZAOyWAO2XAO6ZAO6ZAOyZAO6ZAOyYAOiLAO2YAO2YAOuWAO6XAOOOAO6ZAOuTAOqVAO6ZAO2YAO2ZAO6ZAO6YAL+AAMyZAO6YAO6YAOyYAO6YAO6ZAO6ZAO2UAOyXAO6YAO2ZAOuJAO2YAOuXAOyYAOyYAO6ZAOOOAO2YANWAAOyXAO2YAOyXAOyYAO2YAO6ZAO2YAO6ZAO2SAO6WAO6ZAOyZAO6ZAO6YAO6ZAO6ZAKpVAOqYAOuXAO6ZAO6ZAO6ZAOmWAO2YAO2YAOuYAO6ZAO2YAO6YAO2ZAO2ZAO2ZAOmWAOyZAO2ZAO6XAO2YAO6ZAJf2tK4AAABgdFJOUwDa9wEHsvmAfwJs8bQe/SmHRGJ4/G4tQwvpYz8sEvAaDMya8vq/BAX43WqzadwrG5XlDctbXHn+CUUGQlddXirAkEsOSe1foqHPsQM+QK88kyKNtU3N9t+R2eMuiZhYmUNfjO0AAAF/SURBVFjD7ZhnV8IwFIYpKbRNgCqtE9nLCQKKDPfee8/8/18hiHqObQMJqccP5v2e5/TJvfe0tx6PiIgnqkNDZY4B9agFpC9KCDMHSQu6BQQlc4kdhE0JWkBGDK8rzMnimGEBqRgr7DfrcEqABEiAXAJp+a1azg1QYfdgo57jBmnDQ4c7+5t5XpA2GvaFvHvb3E80MT7mnxxo5jnvqOXl808FBoOcVet4BaZl3vJ3vEZkzj6yefUJsnv1CbJ79QYFj5sXwMFrbuaHV2/QiXJ5XXbympXZhhZKt5X5hGbx8lq9eoPq96hUWS2AbvWiAsUjUjrjWyl3qxcVCMiRFMokv+xIXhTlB8XXVPrTjlAv2j76tiPVixbUtou17Z7IXnSdDYrLb+lSEj6TvWhHJB55QGbykexFC/qwM0NkL+qhbdm93N2cEr0Ypj9+dnUebrjwggRHiVpDfEQIkAD9OQgo9lMGwlnWHVtRsxhVf2s5dm1dj67BKvuW7fADQeRf5h2SyMmxXTU0BgAAAABJRU5ErkJggg==',

  UNCHECKED: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA8UExURUxpcd/f39XV1eDg4N/f3+Dg4N/f39/f39/f397e3t/f3+Dg4N7e3t3d3d/f39/f39/f39vb2wAAAODg4FDIs8gAAAATdFJOUwDxEvzaKXiAf2y//lxb8HnAKgHBpjqJAAAAeElEQVRYw+3YOxaAIAxEUb4JQQU1+9+rPdLkHG10Xp9b0A3OIeRCFirmSHIYoLwmr+Z82vIASYqLHdKYZICo6c7mqjYaoKLK9pedXAECBAgQIECAAAECBAgQoA9BJ9+vyGu1bmwuVX1/axw/NtfDId2+sicfCOiXXfhNK3VzfJS4AAAAAElFTkSuQmCC',

  CHECKED_DISABLED: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACZUExURUxpceDg4N/f3+Dg4OXm5t7e3t/f3+Xm5t/f39/f39PT0+Dh4d3d3d/f393d3d/f39vb2+Hh4eDg4PLz9PHy8+Xl5uzt7u7v8OLi4u3u7/Dw8eHh4erq6+jo6ePk5O/w8evs7Ofn6Orr7PHy8urr6+vr7Ofo6O3t7uvs7eLi4+fn5+bn5/Dx8uzt7e/w8OPj4+np6uTl5eHh4kIni68AAAASdFJOUwBLuP7eqvrfwL8j85a5l/5N85cf5NYAAAFDSURBVFjD7ZhtUoMwFAAhEGjBWn0+IBQKrQpVa/26/+G0VhmFhiSEjj/MHmCH5SUTgmUZDFZgUzJVhlA7aInsc88BZRzvzG6JqAeD8GhLROZw6SsTwpy0RFMA/0oZF2BiREZkRKcRIeIjjiFKqud6g9oiTPIo2+60RXizigC2+k+U3GYAy1j3He274D6KF5pTO3RF16g7/lbXUFGna6Co2zVQ1O0SixZp/IRHutjvLrEofal3KO4Si3KWFQ+Ioi6xaFMDK6oE++YlJSpT9tFRoaBLLEJM1wBNHa9LYvxY3q2/6zjzkl1HTV1Pl5SoqevpklvZX3X5kt8lu0U+6wrG75IVHep6uqQ37b7ureB3Kez+Mn2tVzjCAfnzLDQfEUZkRH8nQr8rIg6EriK+G4IzO9XleLTrenBBZxNljvxAMPxL3gERb+o/eS/XGwAAAABJRU5ErkJggg==',

  UNCHECKED_DISABLED: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUxpceDg4N/f39/f3+zu7t7e3t/f3+zu7t/f39/f39XV1eDg4OXm5t3d3eDg4N7e3t/f39/f39vb2+Xm5uDg4PLz9Kf8uvkAAAAUdFJOUwApePG+bNq/gH8S/M5b/lzweSrPOXjjsgAAAHZJREFUWMPt2DsWgCAQQ1EYGFDEf9z/Vu3RZs7RRvMWcPvEOcZc8Sq9OVFfGsjPKcBcSKNvIE3DZIcwJG0gWbBncxWLNFAP5MNcBDpChAgRIkSIECFChAgRIvRhKF8hCajRWI4VYX1rHD8218uma2fu5kBgv+wEo835c4Jy4u8AAAAASUVORK5CYII='
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-cell', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "has-top-border": _vm.hasTopBorder
    },
    on: {
      "wxcCellDivClick": _vm.wxcCellDivClick
    }
  }, [_c('text', {
    staticClass: "title-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.color
    })),
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('image', {
    staticClass: "checkbox",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "slot": "value",
      "src": _vm.checkIcon
    },
    slot: "value"
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-702739a6", module.exports)
  }
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(40);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(41)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(43),
  /* template */
  __webpack_require__(44),
  /* scopeId */
  "data-v-2d0e23fb",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-checkbox-list/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d0e23fb", Component.options)
  } else {
    hotAPI.reload("data-v-2d0e23fb", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("53ce8d72", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2d0e23fb\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2d0e23fb\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(8);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { WxcCheckbox: _index2.default },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      checkedList: []
    };
  },
  created: function created() {
    var _this = this;

    var list = this.list;

    if (list && list.length > 0) {
      list.forEach(function (item, i) {
        item.checked && _this.checkedList.push(item.value);
      });
    }
  },

  methods: {
    wxcCheckBoxItemChecked: function wxcCheckBoxItemChecked(e) {
      if (e.checked) {
        this.checkedList.push(e.value);
      } else {
        var index = this.checkedList.indexOf(e.value);
        this.checkedList.splice(index, 1);
      }
      this.$emit('wxcCheckBoxListChecked', { checkedList: this.checkedList });
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.list), function(item, i) {
    return _c('wxc-checkbox', _vm._b({
      key: i,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      on: {
        "wxcCheckBoxItemChecked": _vm.wxcCheckBoxItemChecked
      }
    }, 'wxc-checkbox', item, false))
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2d0e23fb", module.exports)
  }
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(46);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(47)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(49),
  /* template */
  __webpack_require__(50),
  /* scopeId */
  "data-v-8dcc12f8",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-countdown/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8dcc12f8", Component.options)
  } else {
    hotAPI.reload("data-v-8dcc12f8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(48);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("54f8708d", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-8dcc12f8\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-8dcc12f8\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.time-dot-wrap[data-v-8dcc12f8] {\n  flex-direction: row;\n  align-items: center;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-countdown/index.vue?530f8046"],"names":[],"mappings":";AAkBA;EACA,oBAAA;EACA,oBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div :style=\"mrTimeWrapStyle\">\n    <div class=\"time-dot-wrap\">\n      <div :style=\"mrTimeBoxStyle\"><text :style=\"mrTimeTextStyle\">{{countDownData.hour}}</text></div>\n      <div :style=\"mrDotBoxStyle\"><text :style=\"mrDotTextStyle\">{{tplObj().firstDot}}</text></div>\n\n      <div :style=\"mrTimeBoxStyle\"><text :style=\"mrTimeTextStyle\">{{countDownData.minute}}</text></div>\n      <div :style=\"mrDotBoxStyle\"><text :style=\"mrDotTextStyle\">{{tplObj().secondDot}}</text></div>\n\n      <div :style=\"mrTimeBoxStyle\"><text :style=\"mrTimeTextStyle\">{{countDownData.second}}</text></div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .time-dot-wrap {\n    flex-direction: row;\n    align-items: center;\n  }\n</style>\n\n<script>\n  export default {\n    props: {\n      // 时间戳\n      time: {\n        type: Number,\n        default: 1501200000000\n      },\n      // 倒计时的间隔,单位为\"毫秒\"\n      interval: {\n        type: Number,\n        default: 1000\n      },\n      tpl: {\n        type: String,\n        default: '{h}:{m}:{s}'\n      },\n      // 最外层包裹 style\n      timeWrapStyle: Object,\n      // 数字盒子 style\n      timeBoxStyle: Object,\n      // : 盒子Style\n      dotBoxStyle: Object,\n      // 数字文字 Style\n      timeTextStyle: Object,\n      // : 文字Style\n      dotTextStyle: Object\n    },\n    data: () => ({\n      NOW_DATE: new Date().getTime(),\n      completed: false,\n      TIME_WRAP_STYLE: {\n        flexDirection: 'row',\n        alignItems: 'center',\n        marginLeft: '12px',\n        marginRight: '12px'\n      },\n      TIME_BOX_STYLE: {\n        flexDirection: 'row',\n        justifyContent: 'center',\n        alignItems: 'center',\n        backgroundColor: '#333333',\n        height: '30px',\n        width: '30px'\n      },\n      DOT_BOX_STYLE: {\n        width: '18px',\n        flexDirection: 'row',\n        justifyContent: 'center',\n        alignItems: 'center'\n      },\n      TIME_TEXT_STYLE: {\n        color: '#FFCC80',\n        fontSize: '18px'\n      },\n      DOT_TEXT_STYLE: {\n        color: '#333333',\n        fontSize: '18px',\n        fontWeight: 'bold'\n      }\n    }),\n    mounted () {\n      setInterval(() => {\n        this.NOW_DATE = new Date().getTime();\n      }, this.interval)\n    },\n    computed: {\n      mrTimeWrapStyle () {\n        return {\n          ...this.TIME_WRAP_STYLE,\n          ...this.timeWrapStyle\n        }\n      },\n      mrTimeBoxStyle () {\n        return {\n          ...this.TIME_BOX_STYLE,\n          ...this.timeBoxStyle\n        }\n      },\n      mrDotBoxStyle () {\n        return {\n          ...this.DOT_BOX_STYLE,\n          ...this.dotBoxStyle\n        }\n      },\n      mrTimeTextStyle () {\n        return {\n          ...this.TIME_TEXT_STYLE,\n          ...this.timeTextStyle\n        }\n      },\n      mrDotTextStyle () {\n        return {\n          ...this.DOT_TEXT_STYLE,\n          ...this.dotTextStyle\n        }\n      },\n\n      countDownData () {\n        const timeSpacing = this.time - this.NOW_DATE;\n\n        // 倒计时结束了\n        if (timeSpacing < 0) {\n          if (this.completed === false) {\n            this.$emit('wxcOnComplete');\n          }\n          this.completed = true;\n          return {\n            hour: '00',\n            minute: '00',\n            second: '00'\n          }\n        }\n\n        // 计算小时\n        const hours = Math.floor(timeSpacing / (3600 * 1000));\n\n        // 计算分钟(去除小时)\n        const minute = Math.floor(timeSpacing % (3600 * 1000) / (60 * 1000));\n\n        // 计算秒数(去除分钟)\n        const second = Math.floor(timeSpacing % (60 * 1000) / 1000);\n\n        return {\n          hour: hours < 10 ? '0' + hours : hours,\n          minute: minute < 10 ? '0' + minute : minute,\n          second: second < 10 ? '0' + second : second\n        }\n      }\n    },\n\n    methods: {\n      // 分析模板\n      tplObj () {\n        const tplIndexOfHours = this.tpl.indexOf('h');\n        const tplIndexOfMinutes = this.tpl.indexOf('m');\n        const tplIndexOfSeconds = this.tpl.indexOf('s');\n\n        return {\n          firstDot: this.tpl.slice(tplIndexOfHours + 2, tplIndexOfMinutes - 1),\n          secondDot: this.tpl.slice(tplIndexOfMinutes + 2, tplIndexOfSeconds - 1)\n        }\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    // 时间戳
    time: {
      type: Number,
      default: 1501200000000
    },
    // 倒计时的间隔,单位为"毫秒"
    interval: {
      type: Number,
      default: 1000
    },
    tpl: {
      type: String,
      default: '{h}:{m}:{s}'
    },
    // 最外层包裹 style
    timeWrapStyle: Object,
    // 数字盒子 style
    timeBoxStyle: Object,
    // : 盒子Style
    dotBoxStyle: Object,
    // 数字文字 Style
    timeTextStyle: Object,
    // : 文字Style
    dotTextStyle: Object
  },
  data: function data() {
    return {
      NOW_DATE: new Date().getTime(),
      completed: false,
      TIME_WRAP_STYLE: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '12px',
        marginRight: '12px'
      },
      TIME_BOX_STYLE: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        height: '30px',
        width: '30px'
      },
      DOT_BOX_STYLE: {
        width: '18px',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      TIME_TEXT_STYLE: {
        color: '#FFCC80',
        fontSize: '18px'
      },
      DOT_TEXT_STYLE: {
        color: '#333333',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    setInterval(function () {
      _this.NOW_DATE = new Date().getTime();
    }, this.interval);
  },

  computed: {
    mrTimeWrapStyle: function mrTimeWrapStyle() {
      return _extends({}, this.TIME_WRAP_STYLE, this.timeWrapStyle);
    },
    mrTimeBoxStyle: function mrTimeBoxStyle() {
      return _extends({}, this.TIME_BOX_STYLE, this.timeBoxStyle);
    },
    mrDotBoxStyle: function mrDotBoxStyle() {
      return _extends({}, this.DOT_BOX_STYLE, this.dotBoxStyle);
    },
    mrTimeTextStyle: function mrTimeTextStyle() {
      return _extends({}, this.TIME_TEXT_STYLE, this.timeTextStyle);
    },
    mrDotTextStyle: function mrDotTextStyle() {
      return _extends({}, this.DOT_TEXT_STYLE, this.dotTextStyle);
    },
    countDownData: function countDownData() {
      var timeSpacing = this.time - this.NOW_DATE;

      // 倒计时结束了
      if (timeSpacing < 0) {
        if (this.completed === false) {
          this.$emit('wxcOnComplete');
        }
        this.completed = true;
        return {
          hour: '00',
          minute: '00',
          second: '00'
        };
      }

      // 计算小时
      var hours = Math.floor(timeSpacing / (3600 * 1000));

      // 计算分钟(去除小时)
      var minute = Math.floor(timeSpacing % (3600 * 1000) / (60 * 1000));

      // 计算秒数(去除分钟)
      var second = Math.floor(timeSpacing % (60 * 1000) / 1000);

      return {
        hour: hours < 10 ? '0' + hours : hours,
        minute: minute < 10 ? '0' + minute : minute,
        second: second < 10 ? '0' + second : second
      };
    }
  },

  methods: {
    // 分析模板
    tplObj: function tplObj() {
      var tplIndexOfHours = this.tpl.indexOf('h');
      var tplIndexOfMinutes = this.tpl.indexOf('m');
      var tplIndexOfSeconds = this.tpl.indexOf('s');

      return {
        firstDot: this.tpl.slice(tplIndexOfHours + 2, tplIndexOfMinutes - 1),
        secondDot: this.tpl.slice(tplIndexOfMinutes + 2, tplIndexOfSeconds - 1)
      };
    }
  }
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrTimeWrapStyle))
  }, [_c('div', {
    staticClass: "time-dot-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrTimeBoxStyle))
  }, [_c('text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrTimeTextStyle))
  }, [_vm._v(_vm._s(_vm.countDownData.hour))])]), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrDotBoxStyle))
  }, [_c('text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrDotTextStyle))
  }, [_vm._v(_vm._s(_vm.tplObj().firstDot))])]), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrTimeBoxStyle))
  }, [_c('text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrTimeTextStyle))
  }, [_vm._v(_vm._s(_vm.countDownData.minute))])]), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrDotBoxStyle))
  }, [_c('text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrDotTextStyle))
  }, [_vm._v(_vm._s(_vm.tplObj().secondDot))])]), _vm._v(" "), _c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrTimeBoxStyle))
  }, [_c('text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mrTimeTextStyle))
  }, [_vm._v(_vm._s(_vm.countDownData.second))])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8dcc12f8", module.exports)
  }
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(52);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(53)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(57),
  /* scopeId */
  "data-v-7a03baeb",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-dialog/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a03baeb", Component.options)
  } else {
    hotAPI.reload("data-v-7a03baeb", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(54);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ae3c0492", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7a03baeb\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7a03baeb\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.container[data-v-7a03baeb] {\n  width: 750px;\n}\n.mask[data-v-7a03baeb] {\n  top: 0;\n  width: 750px;\n  height: 1344px;\n  justify-content: center;\n  align-items: center;\n}\n.dialog-box[data-v-7a03baeb] {\n  background-color: #FFFFFF;\n  width: 558px;\n}\n.dialog-content[data-v-7a03baeb] {\n  padding-top: 36px;\n  padding-bottom: 36px;\n  padding-left: 36px;\n  padding-right: 36px;\n}\n.content-title[data-v-7a03baeb] {\n  color: #333333;\n  font-size: 36px;\n  text-align: center;\n  margin-bottom: 24px;\n}\n.content-subtext[data-v-7a03baeb] {\n  color: #666666;\n  font-size: 26px;\n  line-height: 36px;\n  text-align: center;\n}\n.dialog-footer[data-v-7a03baeb] {\n  flex-direction: row;\n  align-items: center;\n  border-top-color: #F3F3F3;\n  border-top-width: 1px;\n  /*H5处理兼容*/\n  border-top: 1px solid #F3F3F3;\n}\n.footer-btn[data-v-7a03baeb] {\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  flex: 1;\n  height: 90px;\n}\n.cancel[data-v-7a03baeb] {\n  border-right-color: #F3F3F3;\n  border-right-width: 1px;\n  /*H5处理兼容*/\n  border-right: 1px solid #F3F3F3;\n}\n.btn-text[data-v-7a03baeb] {\n  font-size: 36px;\n  color: #666666;\n}\n.no-prompt[data-v-7a03baeb] {\n  width: 486px;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  margin-top: 24px;\n}\n.no-prompt-icon[data-v-7a03baeb] {\n  width: 24px;\n  height: 24px;\n  margin-right: 12px;\n}\n.no-prompt-text[data-v-7a03baeb] {\n  font-size: 24px;\n  color: #A5A5A5;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-dialog/index.vue?85d30e28"],"names":[],"mappings":";AA4CA;EACA,aAAA;CACA;AAEA;EACA,OAAA;EACA,aAAA;EACA,eAAA;EACA,wBAAA;EACA,oBAAA;CACA;AAEA;EACA,0BAAA;EACA,aAAA;CACA;AAEA;EACA,kBAAA;EACA,qBAAA;EACA,mBAAA;EACA,oBAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;EACA,mBAAA;EACA,oBAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,oBAAA;EACA,oBAAA;EACA,0BAAA;EACA,sBAAA;EACA,UAAA;EACA,8BAAA;CACA;AAEA;EACA,oBAAA;EACA,oBAAA;EACA,wBAAA;EACA,QAAA;EACA,aAAA;CACA;AAEA;EACA,4BAAA;EACA,wBAAA;EACA,UAAA;EACA,gCAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;CACA;AAEA;EACA,aAAA;EACA,oBAAA;EACA,wBAAA;EACA,oBAAA;EACA,iBAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/11/07. -->\n<!--A dialog. -->\n\n<template>\n  <div class=\"container\">\n    <mask class=\"mask\"\n          v-if=\"show\"\n          :style=\"{backgroundColor: maskBgColor,height:pageHeight+'px'}\">\n      <div class=\"dialog-box\">\n        <div class=\"dialog-content\">\n          <slot name=\"title\">\n            <text class=\"content-title\">{{title}}</text>\n          </slot>\n          <slot name=\"content\">\n            <text class=\"content-subtext\">{{content}}</text>\n          </slot>\n          <div class=\"no-prompt\"\n               v-if=\"showNoPrompt\"\n               @click=\"noPromptClicked\">\n            <image :src=\"noPromptIcon\"\n                   class=\"no-prompt-icon\"></image>\n            <text class=\"no-prompt-text\">{{noPromptText}}</text>\n          </div>\n        </div>\n        <div class=\"dialog-footer\">\n          <div class=\"footer-btn cancel\"\n               v-if=\"!single\"\n               @click=\"secondaryClicked\">\n            <text class=\"btn-text\"\n                  :style=\"{ color: secondBtnColor }\">{{cancelText}}</text>\n          </div>\n          <div class=\"footer-btn confirm\"\n               @click=\"primaryClicked\">\n            <text class=\"btn-text\"\n                  :style=\"{ color: mainBtnColor }\">{{confirmText}}</text>\n          </div>\n        </div>\n      </div>\n    </mask>\n  </div>\n</template>\n\n<style scoped>\n  .container {\n    width: 750px;\n  }\n\n  .mask {\n    top: 0;\n    width: 750px;\n    height: 1344px;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .dialog-box {\n    background-color: #FFFFFF;\n    width: 558px;\n  }\n\n  .dialog-content {\n    padding-top: 36px;\n    padding-bottom: 36px;\n    padding-left: 36px;\n    padding-right: 36px;\n  }\n\n  .content-title {\n    color: #333333;\n    font-size: 36px;\n    text-align: center;\n    margin-bottom: 24px;\n  }\n\n  .content-subtext {\n    color: #666666;\n    font-size: 26px;\n    line-height: 36px;\n    text-align: center;\n  }\n\n  .dialog-footer {\n    flex-direction: row;\n    align-items: center;\n    border-top-color: #F3F3F3;\n    border-top-width: 1px;\n    /*H5处理兼容*/\n    border-top: 1px solid #F3F3F3;\n  }\n\n  .footer-btn {\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    flex: 1;\n    height: 90px;\n  }\n\n  .cancel {\n    border-right-color: #F3F3F3;\n    border-right-width: 1px;\n    /*H5处理兼容*/\n    border-right: 1px solid #F3F3F3;\n  }\n\n  .btn-text {\n    font-size: 36px;\n    color: #666666;\n  }\n\n  .no-prompt {\n    width: 486px;\n    align-items: center;\n    justify-content: center;\n    flex-direction: row;\n    margin-top: 24px;\n  }\n\n  .no-prompt-icon {\n    width: 24px;\n    height: 24px;\n    margin-right: 12px;\n  }\n\n  .no-prompt-text {\n    font-size: 24px;\n    color: #A5A5A5;\n  }\n</style>\n\n<script>\n  const icon = require('./icon.base64.js');\n  module.exports = {\n    props: {\n      show: {\n        type: Boolean,\n        default: false\n      },\n      single: {\n        type: Boolean,\n        default: false\n      },\n      title: {\n        type: String,\n        default: ''\n      },\n      content: {\n        type: String,\n        default: ''\n      },\n      cancelText: {\n        type: String,\n        default: '取消'\n      },\n      confirmText: {\n        type: String,\n        default: '确定'\n      },\n      mainBtnColor: {\n        type: String,\n        default: '#EE9900'\n      },\n      secondBtnColor: {\n        type: String,\n        default: '#666666'\n      },\n      showNoPrompt: {\n        type: Boolean,\n        default: true\n      },\n      noPromptText: {\n        type: String,\n        default: '不再提示'\n      },\n      isChecked: {\n        type: Boolean,\n        default: false\n      },\n      maskBgColor: {\n        type: String,\n        default: 'rgba(0,0,0,0.6)'\n      }\n    },\n    data: () => ({\n      noPromptIcon: icon.unChecked,\n      ref: 'viewport',\n      pageHeight: 1334\n    }),\n    created () {\n      const { env } = weex.config;\n      this.pageHeight = env.deviceHeight / env.deviceWidth * 750;\n    },\n    methods: {\n      secondaryClicked () {\n        this.$emit('wxcDialogCancelBtnClicked', {\n          type: 'cancel'\n        });\n      },\n      primaryClicked (e) {\n        this.$emit('wxcDialogConfirmBtnClicked', {\n          type: 'confirm'\n        });\n      },\n      noPromptClicked (e) {\n        const isChecked = !this.isChecked;\n        this.noPromptIcon = isChecked ? icon.checked : icon.unChecked;\n        this.$emit('wxcDialogNoPromptClicked', { isChecked });\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var icon = __webpack_require__(56);
module.exports = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    mainBtnColor: {
      type: String,
      default: '#EE9900'
    },
    secondBtnColor: {
      type: String,
      default: '#666666'
    },
    showNoPrompt: {
      type: Boolean,
      default: true
    },
    noPromptText: {
      type: String,
      default: '不再提示'
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    maskBgColor: {
      type: String,
      default: 'rgba(0,0,0,0.6)'
    }
  },
  data: function data() {
    return {
      noPromptIcon: icon.unChecked,
      ref: 'viewport',
      pageHeight: 1334
    };
  },
  created: function created() {
    var env = weex.config.env;

    this.pageHeight = env.deviceHeight / env.deviceWidth * 750;
  },

  methods: {
    secondaryClicked: function secondaryClicked() {
      this.$emit('wxcDialogCancelBtnClicked', {
        type: 'cancel'
      });
    },
    primaryClicked: function primaryClicked(e) {
      this.$emit('wxcDialogConfirmBtnClicked', {
        type: 'confirm'
      });
    },
    noPromptClicked: function noPromptClicked(e) {
      var isChecked = !this.isChecked;
      this.noPromptIcon = isChecked ? icon.checked : icon.unChecked;
      this.$emit('wxcDialogNoPromptClicked', { isChecked: isChecked });
    }
  }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Tw93 on 2016/10/29.
 */
module.exports = {
  checked: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAADsUlEQVRYCe2Za4hNURTH/3vf91teMwx5k7xf4zGRPJopJCVfaDDKK4R88EnKB4UiMh4pCfFB+TBDEVFKJmHIUIy3YR7mjjn3zr1zH+ccrX2diUz3njuOO1fd/eGeffZae63fXevsszt7MfxsNXth7dN32AbO+UpVxRjG4NZkmbyqKoKMoUZRlItNjW9OjdmLKPln9PPpxIACO3NUMmBiJqFS+VKB6nY1vHjgps91jCLZN39EFUFy32A4p++CtWAWmLVbAgo1GkS07j5CVYegtL4HwTbWv57OGsuHbeWcHyVI37Ir4DZvqj+aEbkSkdB6dbmAVRRlG6dnkjxTJLMFkniIhZhEn/OVnBYO3VC6s61pTMTItdXdXc9ksuBoTMTIkylmkywHanQ2chHNRdToCKSyF6t/DP/5IgRubkmlKuRmXVoGK8UbnyFwfR3UWBtiDU90Wc/4Yop/ewHpWpmAhNkBz4Ij2Qca97+GdG0t1KgEmGzwlpyEpd+07AKVv7+FVFkKtb0F4BZ4isthKZipC5KUMpJ6WfoIqWI11HAzwM3wLDwG68DZuiEzAioH6iBVlEIJNQDMBPf8w7AOnpcWZNqgqhxLy4HcVp+ADH4BGId73kHYhhanZUNT1p361opS+M8VIvrhjjY36VUJNSUgA5/Ep5lr7n7Yhi9OOieZUDeoIn0AYm0I3NiMSG1FMptQwn5IlavFZwQpuubsg33ksqRzUgl1g3pKToM5egOqjODtXWh/cblT20qkVbyC5JZaIXcV7YF99IpOddMZ1A1q7jUKvqWXwN39Aahou7cH4adnfvOlRIMJyOaXYtw5YzfsY1f9ptPVG92g5MDkGwTv0svgviHCX+jBAYQeJnYW2g4D18sgNz0XMkfhTjgmlHWV6495ae/1Jne+iCztMHLzS4Qfl4PSLftfId5QnYCcsgXOSRv/cPY3A2lFVHPEHT3hXXIB5rzJYihScxHxrw9F3z5xPZxTt2mqhl27BEreuc0D76KzsAwo6oCxj1sD189v8Y5Bgzppp/5Xv8zigKfkFMKPjoPZe8Axfu2vYkP7fwVKJMxkhbNwh6FQnRnrcuo7M/Yvx3KgRkc3F1HDI0pn5mSUTnqzrWlMxEjHjjUESMfR2dY0JmLkVH0gQHFmHpGyhpWOxomJGjGa1kxrqXa5ey1B5Ht+9N1NcFceTK488SLvDmpRbPh4F8Fb2zuKDU0NtRv/m/KNeD1RHYdKJFR9AFClLbBuiWhicVcRCzERG3H8AAOtX+I/9HP9AAAAAElFTkSuQmCC",

  unChecked: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAABmElEQVRYCe2ZoU7DUBSGz7mi6ZaR4FEz25Ia3F4AiUHvAVCgeQQ0jgfoGyB5gTpMkw3R1uBJaNqmYof8S5tULWE9HVtyrlhFc//75eu5E+cwNSuOY280Gt0z84qZAyKatO+O/MxFJBaRsCzL1yAIapzP+NlsNlee570x8/WRofYeJyIfdV3fzufzL4bJ8XgcAVJEPpn5qaqq98Vi8bM3ZaCX6/X6wvf9GxF5ZuYZYIuiWHKSJA/OuRdAEtFyOp1+D8Twp9g0TS+JCAJn2+320aEmkQCTpwIJHrCAqWFbARQXh/C58Tyl1TKB0bW3+79qcp+YDtMEoGexDFT7M5lRM6ptQDvPatSMahvQzrMaNaPaBrTzrEbNqLYB7TyrUTOqbUA7z2rUjGob0M6zGh3CaI5QdHq1w/vmdZhyh8Y+AtGO7husvb9lAiNAQxyAnnnTjtY+76A8sICpYQsdRiRo6KNXjp55lmV3HeUHHdJnE84GQ9u/BxsYz2Z8s/t7whwHIxJMH0QkIqLdBetjpsdeDMQisIAJbMj6Bdz9uoyhg7P4AAAAAElFTkSuQmCC"
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [(_vm.show) ? _c('mask', {
    staticClass: "mask",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      backgroundColor: _vm.maskBgColor,
      height: _vm.pageHeight + 'px'
    }))
  }, [_c('div', {
    staticClass: "dialog-box",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "dialog-content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("title", [_c('text', {
    staticClass: "content-title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _vm._t("content", [_c('text', {
    staticClass: "content-subtext",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.content))])]), _vm._v(" "), (_vm.showNoPrompt) ? _c('div', {
    staticClass: "no-prompt",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.noPromptClicked
    }
  }, [_c('image', {
    staticClass: "no-prompt-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.noPromptIcon
    }
  }), _vm._v(" "), _c('text', {
    staticClass: "no-prompt-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.noPromptText))])]) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [(!_vm.single) ? _c('div', {
    staticClass: "footer-btn cancel",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.secondaryClicked
    }
  }, [_c('text', {
    staticClass: "btn-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.secondBtnColor
    }))
  }, [_vm._v(_vm._s(_vm.cancelText))])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "footer-btn confirm",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.primaryClicked
    }
  }, [_c('text', {
    staticClass: "btn-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.mainBtnColor
    }))
  }, [_vm._v(_vm._s(_vm.confirmText))])])])])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7a03baeb", module.exports)
  }
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(59);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(60)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(62),
  /* template */
  __webpack_require__(64),
  /* scopeId */
  "data-v-15fdfbd4",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-ep-slider/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-15fdfbd4", Component.options)
  } else {
    hotAPI.reload("data-v-15fdfbd4", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(61);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("18a721fc", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-15fdfbd4\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-15fdfbd4\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.slider-content[data-v-15fdfbd4] {\n  position: relative;\n}\n.slider[data-v-15fdfbd4] {\n  position: absolute;\n  top: 0;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-ep-slider/index.vue?0ecefde2"],"names":[],"mappings":";AAyBA;EACA,mBAAA;CACA;AAEA;EACA,mBAAA;EACA,OAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div :style=\"containerS\">\n    <div :ref=\"`sliderCtn_${sliderId}`\"\n         class=\"slider-content\"\n         :prevent-move-event=\"preventMove\"\n         :style=\"{width:cardWidth,height:cardS.height+'px',transform: `translateX(-${currentIndex * (cardS.width + cardS.spacing)}px)`}\"\n         @panstart=\"onTouchStart\"\n         @panmove=\"onTouchMove\"\n         @panend=\"onTouchEnd\"\n         @horizontalpan=\"onEpTouchStart\">\n      <div class=\"slider\"\n           v-for=\"(v,index) in cardList\"\n           :ref=\"`card${index}_${sliderId}`\"\n           :style=\"{transform: `scale(${index===currentIndex ? 1 : cardS.scale})`,left: `${index * cardS.width}px`,marginLeft:`${(containerS.width - cardS.width) / 2}px`,width: cardS.width+'px', height: cardS.height+'px'}\">\n        <slot :name=\"`card${index}_${sliderId}`\"></slot>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n\n  .slider-content {\n    position: relative;\n  }\n\n  .slider {\n    position: absolute;\n    top: 0;\n  }\n</style>\n\n<script>\n  const expressionBinding = weex.requireModule('expressionBinding');\n  const animation = weex.requireModule('animation');\n  const Utils = require('./utils');\n\n  export default {\n    props: {\n      sliderId: {\n        type: [String, Number],\n        default: 1\n      },\n      panOffset: {\n        type: Number,\n        default: 80\n      },\n      cardLength: {\n        type: Number,\n        default: 1\n      },\n      selectIndex: {\n        type: Number,\n        default: 0\n      },\n      enableSwipe: {\n        type: Boolean,\n        default: true\n      },\n      containerS: {\n        type: Object,\n        default: () => ({\n          position: 'relative',\n          width: 750,\n          height: 352,\n          overflow: 'hidden'\n        })\n      },\n      cardS: {\n        type: Object,\n        default: () => ({\n          width: 360,\n          height: 300,\n          spacing: 0,\n          scale: 0.75\n        })\n      }\n    },\n    data: () => ({\n      preventMove: true,\n      moving: false,\n      firstTouch: true,\n      startX: 0,\n      startTime: 0,\n      currentIndex: 0\n    }),\n    computed: {\n      cardList () {\n        return new Array(this.cardLength + 1).join().split('');\n      },\n      cardWidth () {\n        return (this.cardLength - 1) * this.cardS.width + this.containerS.width + 235 + 'px';\n      }\n    },\n    created () {\n      this.currentIndex = this.selectIndex;\n    },\n    mounted () {\n      setTimeout(() => {\n        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];\n        if (Utils.env.supportsEB() && sliderCtn && sliderCtn.ref) {\n          expressionBinding.enableBinding(sliderCtn.ref, 'pan');\n        }\n      }, 10);\n    },\n    methods: {\n      onTouchStart (e) {\n        if (Utils.env.supportsEB()) {\n          return;\n        }\n        this.startX = e.changedTouches[0].clientX;\n        this.startTime = Date.now();\n      },\n      onTouchMove (e) {\n        if (Utils.env.supportsEB()) {\n          return;\n        }\n        const moveX = e.changedTouches[0].clientX - this.startX;\n        const index = this.loopedIndex(this.currentIndex, this.cardLength);\n        const cardLength = this.cardLength;\n        const currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);\n        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];\n        animation.transition(sliderCtn, {\n          styles: {\n            transform: `translateX(${moveX - currentCardLeft}px)`\n          },\n          timingFunction: 'ease',\n          delay: 0,\n          duration: 0\n        }, () => {\n        });\n        if (this.cardS.scale !== 1) {\n          const currentCard = this.$refs[`card${this.loopedIndex(index, cardLength)}_${this.sliderId}`][0];\n          animation.transition(currentCard, {\n            styles: {\n              transform: `scale(${1 - Math.abs(moveX) / (this.cardS.width) * (1 - this.cardS.scale)})`\n            },\n            timingFunction: 'ease',\n            delay: 0,\n            duration: 0\n          }, () => {\n          });\n          // 左边的卡片\n          const leftCard = this.$refs[`card${this.loopedIndex(index - 1, cardLength)}_${this.sliderId}`][0];\n          // loop 函数负数返回 0，这里有点冲突\n          if (leftCard && index !== 0) {\n            animation.transition(leftCard, {\n              styles: {\n                transform: `scale(${1 - Math.abs(moveX - this.cardS.width) / (this.cardS.width) * (1 - this.cardS.scale)})`\n              },\n              timingFunction: 'ease',\n              delay: 0,\n              duration: 0\n            }, () => {\n            });\n          }\n          // 右边卡片\n          const rightCard = this.$refs[`card${this.loopedIndex(index + 1, cardLength)}_${this.sliderId}`][0];\n          if (rightCard) {\n            animation.transition(rightCard, {\n              styles: {\n                transform: `scale(${1 - Math.abs(this.cardS.width + moveX) / (this.cardS.width) * (1 - this.cardS.scale)})`\n              },\n              timingFunction: 'ease',\n              delay: 0,\n              duration: 0\n            }, () => {\n            });\n          }\n        }\n      },\n      onTouchEnd (e) {\n        if (Utils.env.supportsEB()) {\n          return;\n        }\n        this.moving = true;\n        const moveX = e.changedTouches[0].clientX - this.startX;\n        const originIndex = this.currentIndex;\n        const cardLength = this.cardLength;\n        let selectIndex = originIndex;\n        const panOffset = (this.panOffset || this.cardS.width / 2);\n\n        if (moveX < -panOffset) {\n          if (this.loop || selectIndex !== cardLength - 1) {\n            selectIndex++;\n          }\n        } else if (moveX > panOffset) {\n          if (this.loop || selectIndex !== 0) {\n            selectIndex--;\n          }\n        }\n        this.slideTo(originIndex, selectIndex);\n      },\n      onEpTouchStart (e) {\n        if (Utils.env.supportsEB() && e.state === 'start' || (e.state === 'move' && this.firstTouch)) {\n          this.firstTouch = false;\n          const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];\n          this.bindExp(sliderCtn);\n        }\n      },\n      panEnd (e) {\n        if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {\n          this.firstTouch = true;\n          this.moving = true;\n          const moveX = e.deltaX;\n          const originIndex = this.currentIndex;\n          let selectIndex = originIndex;\n          const duration = Date.now() - this.startTime;\n          const panOffset = this.panOffset || (this.cardS.width / 2);\n          if (moveX < -panOffset || (this.enableSwipe && moveX < -10 && duration < 200)) {\n            if (selectIndex !== this.cardLength - 1) {\n              selectIndex++;\n            }\n          } else if (moveX > panOffset || (this.enableSwipe && moveX > 10 && duration < 500)) {\n            if (selectIndex !== 0) {\n              selectIndex--;\n            }\n          }\n          this.slideTo(originIndex, selectIndex);\n        }\n      },\n      slideTo (originIndex, selectIndex) {\n        let currentCardScale = 1;\n        let rightCardScale = this.cardS.scale;\n        let leftCardScale = this.cardS.scale;\n        this.$emit('wxcEpSliderCurrentIndexSelected', { currentIndex: selectIndex });\n        if (originIndex < selectIndex) {\n          currentCardScale = this.cardS.scale;\n          rightCardScale = 1;\n        } else if (originIndex > selectIndex) {\n          currentCardScale = this.cardS.scale;\n          leftCardScale = 1;\n        }\n        const currentCard = this.$refs[`card${this.loopedIndex(originIndex, this.cardLength)}_${this.sliderId}`][0];\n        animation.transition(currentCard, {\n          styles: {\n            transform: `scale(${currentCardScale})`\n          },\n          timingFunction: 'ease',\n          delay: 0,\n          duration: 300\n        }, () => {\n        });\n        const leftCard = this.$refs[`card${this.loopedIndex(originIndex - 1, this.cardLength)}_${this.sliderId}`][0];\n        if (leftCard && originIndex !== 0) {\n          animation.transition(leftCard, {\n            styles: {\n              transform: `scale(${leftCardScale})`\n            },\n            timingFunction: 'ease',\n            delay: 0,\n            duration: 300\n          }, () => {\n          });\n        }\n        const rightCard = this.$refs[`card${this.loopedIndex(originIndex + 1, this.cardLength)}_${this.sliderId}`][0];\n        if (rightCard && originIndex !== this.cardLength - 1) {\n          animation.transition(rightCard, {\n            styles: {\n              transform: `scale(${rightCardScale})`\n            },\n            timingFunction: 'ease',\n            delay: 0,\n            duration: 300\n          }, () => {\n          });\n        }\n        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];\n        animation.transition(sliderCtn, {\n          styles: {\n            transform: `translateX(-${selectIndex * (this.cardS.width + this.cardS.spacing)}px)`\n          },\n          timingFunction: 'ease',\n          delay: 0,\n          duration: 300\n        }, () => {\n          this.moving = false;\n          if (originIndex !== selectIndex) {\n            this.currentIndex = selectIndex;\n          }\n        });\n      },\n      // 使index维持在0-length之间循环\n      loopedIndex (index, total) {\n        if (index < 0) {\n          index = index + (1 - index / total) * total;\n        }\n        return index % total;\n      },\n      bindExp (element) {\n        if (element && element.ref && !this.moving) {\n          this.startTime = Date.now();\n          const index = this.loopedIndex(this.currentIndex, this.cardLength);\n          const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];\n          const currentCard = this.$refs[`card${index}_${this.sliderId}`][0];\n          let rightCard = null;\n          let leftCard = null;\n          const currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);\n          // 卡片容器\n          // x - currentCardLeft\n          const sliderCtnExpOri = `x - ${currentCardLeft}`;\n          const sliderCtnExp = `{\\\"type\\\":\\\"-\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"x\\\"},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${currentCardLeft}}]}`;\n          const args = [\n            {\n              element: sliderCtn.ref,\n              property: 'transform.translateX',\n              expression: sliderCtnExp,\n              'ori_expression': sliderCtnExpOri\n            }\n          ];\n\n          if (this.cardS.scale !== 1) {\n            // 当前显示的卡片\n            // 1-abs(x)/588*${1-this.cardS.scale}\n            const currentCardExpOri = `1-abs(x)/${this.cardS.width}*${1 - this.cardS.scale}`;\n            const currentCardExp = `{\\\"type\\\":\\\"-\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":1},{\\\"type\\\":\\\"*\\\",\\\"children\\\":[{\\\"type\\\":\\\"/\\\",\\\"children\\\":[{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"abs\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"x\\\"}]}]},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${this.cardS.width}}]},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${1 - this.cardS.scale}}]}]}`;\n            args.push({\n              element: currentCard.ref,\n              property: 'transform.scale',\n              expression: currentCardExp,\n              'ori_expression': currentCardExpOri\n            });\n\n            if (index === 0) {\n              // 右边卡片\n              rightCard = this.$refs[`card${index + 1}_${this.sliderId}`][0];\n              // 1-abs(588+x)/588*${1-this.cardS.scale}\n              const rightCardExpOri = `{sx: 1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1 - this.cardS.scale}, sy: 1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1 - this.cardS.scale}}`;\n              const rightCardExp = `{\\\"type\\\":\\\"-\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":1},{\\\"type\\\":\\\"*\\\",\\\"children\\\":[{\\\"type\\\":\\\"/\\\",\\\"children\\\":[{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"abs\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"+\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${this.cardS.width}},{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"x\\\"}]}]}]},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${this.cardS.width}}]},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${1 - this.cardS.scale}}]}]}`;\n              args.push({\n                element: rightCard.ref,\n                property: 'transform.scale',\n                expression: rightCardExp,\n                'ori_expression': rightCardExpOri\n              });\n            } else if (index === this.cardLength - 1) {\n              // 左边的卡片\n              leftCard = this.$refs[`card${index - 1}_${this.sliderId}`][0];\n              // 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1-this.cardS.scale}\n              const leftCardExpOri = `{sx: 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1 - this.cardS.scale}, sy: 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1 - this.cardS.scale}}`;\n              const leftCardExp = `{\\\"type\\\":\\\"-\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":1},{\\\"type\\\":\\\"*\\\",\\\"children\\\":[{\\\"type\\\":\\\"/\\\",\\\"children\\\":[{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"abs\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"-\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"x\\\"},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${this.cardS.width}}]}]}]},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${this.cardS.width}}]},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${1 - this.cardS.scale}}]}]}`;\n              args.push({\n                element: leftCard.ref,\n                property: 'transform.scale',\n                expression: leftCardExp,\n                'ori_expression': leftCardExpOri\n              });\n            } else {\n              // 左边卡片\n              leftCard = this.$refs[`card${index - 1}_${this.sliderId}`][0];\n              // 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1-this.cardS.scale}\n              const leftCardExpOri = `{sx: 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1 - this.cardS.scale}, sy: 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1 - this.cardS.scale}}`;\n              const leftCardExp = `{\\\"type\\\":\\\"-\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":1},{\\\"type\\\":\\\"*\\\",\\\"children\\\":[{\\\"type\\\":\\\"/\\\",\\\"children\\\":[{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"abs\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"-\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"x\\\"},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${this.cardS.width}}]}]}]},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${this.cardS.width}}]},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${1 - this.cardS.scale}}]}]}`;\n\n              args.push({\n                element: leftCard.ref,\n                property: 'transform.scale',\n                expression: leftCardExp,\n                'ori_expression': leftCardExpOri\n              });\n\n              // 右边卡片\n              rightCard = this.$refs[`card${index + 1}_${this.sliderId}`][0];\n              // 1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1-this.cardS.scale}\n              const rightCardExpOri = `{sx: 1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1 - this.cardS.scale}, sy: 1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1 - this.cardS.scale}}`;\n              const rightCardExp = `{\\\"type\\\":\\\"-\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":1},{\\\"type\\\":\\\"*\\\",\\\"children\\\":[{\\\"type\\\":\\\"/\\\",\\\"children\\\":[{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"abs\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"+\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${this.cardS.width}},{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"x\\\"}]}]}]},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${this.cardS.width}}]},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${1 - this.cardS.scale}}]}]}`;\n              args.push({\n                element: rightCard.ref,\n                property: 'transform.scale',\n                expression: rightCardExp,\n                'ori_expression': rightCardExpOri\n              });\n            }\n          }\n          expressionBinding.createBinding(element.ref, 'pan', '', args, (e) => {\n            if (!this.moving) {\n              this.panEnd(e);\n            }\n          });\n        }\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var expressionBinding = weex.requireModule('expressionBinding');
var animation = weex.requireModule('animation');
var Utils = __webpack_require__(63);

exports.default = {
  props: {
    sliderId: {
      type: [String, Number],
      default: 1
    },
    panOffset: {
      type: Number,
      default: 80
    },
    cardLength: {
      type: Number,
      default: 1
    },
    selectIndex: {
      type: Number,
      default: 0
    },
    enableSwipe: {
      type: Boolean,
      default: true
    },
    containerS: {
      type: Object,
      default: function _default() {
        return {
          position: 'relative',
          width: 750,
          height: 352,
          overflow: 'hidden'
        };
      }
    },
    cardS: {
      type: Object,
      default: function _default() {
        return {
          width: 360,
          height: 300,
          spacing: 0,
          scale: 0.75
        };
      }
    }
  },
  data: function data() {
    return {
      preventMove: true,
      moving: false,
      firstTouch: true,
      startX: 0,
      startTime: 0,
      currentIndex: 0
    };
  },
  computed: {
    cardList: function cardList() {
      return new Array(this.cardLength + 1).join().split('');
    },
    cardWidth: function cardWidth() {
      return (this.cardLength - 1) * this.cardS.width + this.containerS.width + 235 + 'px';
    }
  },
  created: function created() {
    this.currentIndex = this.selectIndex;
  },
  mounted: function mounted() {
    var _this = this;

    setTimeout(function () {
      var sliderCtn = _this.$refs['sliderCtn_' + _this.sliderId];
      if (Utils.env.supportsEB() && sliderCtn && sliderCtn.ref) {
        expressionBinding.enableBinding(sliderCtn.ref, 'pan');
      }
    }, 10);
  },

  methods: {
    onTouchStart: function onTouchStart(e) {
      if (Utils.env.supportsEB()) {
        return;
      }
      this.startX = e.changedTouches[0].clientX;
      this.startTime = Date.now();
    },
    onTouchMove: function onTouchMove(e) {
      if (Utils.env.supportsEB()) {
        return;
      }
      var moveX = e.changedTouches[0].clientX - this.startX;
      var index = this.loopedIndex(this.currentIndex, this.cardLength);
      var cardLength = this.cardLength;
      var currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);
      var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
      animation.transition(sliderCtn, {
        styles: {
          transform: 'translateX(' + (moveX - currentCardLeft) + 'px)'
        },
        timingFunction: 'ease',
        delay: 0,
        duration: 0
      }, function () {});
      if (this.cardS.scale !== 1) {
        var currentCard = this.$refs['card' + this.loopedIndex(index, cardLength) + '_' + this.sliderId][0];
        animation.transition(currentCard, {
          styles: {
            transform: 'scale(' + (1 - Math.abs(moveX) / this.cardS.width * (1 - this.cardS.scale)) + ')'
          },
          timingFunction: 'ease',
          delay: 0,
          duration: 0
        }, function () {});
        // 左边的卡片
        var leftCard = this.$refs['card' + this.loopedIndex(index - 1, cardLength) + '_' + this.sliderId][0];
        // loop 函数负数返回 0，这里有点冲突
        if (leftCard && index !== 0) {
          animation.transition(leftCard, {
            styles: {
              transform: 'scale(' + (1 - Math.abs(moveX - this.cardS.width) / this.cardS.width * (1 - this.cardS.scale)) + ')'
            },
            timingFunction: 'ease',
            delay: 0,
            duration: 0
          }, function () {});
        }
        // 右边卡片
        var rightCard = this.$refs['card' + this.loopedIndex(index + 1, cardLength) + '_' + this.sliderId][0];
        if (rightCard) {
          animation.transition(rightCard, {
            styles: {
              transform: 'scale(' + (1 - Math.abs(this.cardS.width + moveX) / this.cardS.width * (1 - this.cardS.scale)) + ')'
            },
            timingFunction: 'ease',
            delay: 0,
            duration: 0
          }, function () {});
        }
      }
    },
    onTouchEnd: function onTouchEnd(e) {
      if (Utils.env.supportsEB()) {
        return;
      }
      this.moving = true;
      var moveX = e.changedTouches[0].clientX - this.startX;
      var originIndex = this.currentIndex;
      var cardLength = this.cardLength;
      var selectIndex = originIndex;
      var panOffset = this.panOffset || this.cardS.width / 2;

      if (moveX < -panOffset) {
        if (this.loop || selectIndex !== cardLength - 1) {
          selectIndex++;
        }
      } else if (moveX > panOffset) {
        if (this.loop || selectIndex !== 0) {
          selectIndex--;
        }
      }
      this.slideTo(originIndex, selectIndex);
    },
    onEpTouchStart: function onEpTouchStart(e) {
      if (Utils.env.supportsEB() && e.state === 'start' || e.state === 'move' && this.firstTouch) {
        this.firstTouch = false;
        var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
        this.bindExp(sliderCtn);
      }
    },
    panEnd: function panEnd(e) {
      if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
        this.firstTouch = true;
        this.moving = true;
        var moveX = e.deltaX;
        var originIndex = this.currentIndex;
        var selectIndex = originIndex;
        var duration = Date.now() - this.startTime;
        var panOffset = this.panOffset || this.cardS.width / 2;
        if (moveX < -panOffset || this.enableSwipe && moveX < -10 && duration < 200) {
          if (selectIndex !== this.cardLength - 1) {
            selectIndex++;
          }
        } else if (moveX > panOffset || this.enableSwipe && moveX > 10 && duration < 500) {
          if (selectIndex !== 0) {
            selectIndex--;
          }
        }
        this.slideTo(originIndex, selectIndex);
      }
    },
    slideTo: function slideTo(originIndex, selectIndex) {
      var _this2 = this;

      var currentCardScale = 1;
      var rightCardScale = this.cardS.scale;
      var leftCardScale = this.cardS.scale;
      this.$emit('wxcEpSliderCurrentIndexSelected', { currentIndex: selectIndex });
      if (originIndex < selectIndex) {
        currentCardScale = this.cardS.scale;
        rightCardScale = 1;
      } else if (originIndex > selectIndex) {
        currentCardScale = this.cardS.scale;
        leftCardScale = 1;
      }
      var currentCard = this.$refs['card' + this.loopedIndex(originIndex, this.cardLength) + '_' + this.sliderId][0];
      animation.transition(currentCard, {
        styles: {
          transform: 'scale(' + currentCardScale + ')'
        },
        timingFunction: 'ease',
        delay: 0,
        duration: 300
      }, function () {});
      var leftCard = this.$refs['card' + this.loopedIndex(originIndex - 1, this.cardLength) + '_' + this.sliderId][0];
      if (leftCard && originIndex !== 0) {
        animation.transition(leftCard, {
          styles: {
            transform: 'scale(' + leftCardScale + ')'
          },
          timingFunction: 'ease',
          delay: 0,
          duration: 300
        }, function () {});
      }
      var rightCard = this.$refs['card' + this.loopedIndex(originIndex + 1, this.cardLength) + '_' + this.sliderId][0];
      if (rightCard && originIndex !== this.cardLength - 1) {
        animation.transition(rightCard, {
          styles: {
            transform: 'scale(' + rightCardScale + ')'
          },
          timingFunction: 'ease',
          delay: 0,
          duration: 300
        }, function () {});
      }
      var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
      animation.transition(sliderCtn, {
        styles: {
          transform: 'translateX(-' + selectIndex * (this.cardS.width + this.cardS.spacing) + 'px)'
        },
        timingFunction: 'ease',
        delay: 0,
        duration: 300
      }, function () {
        _this2.moving = false;
        if (originIndex !== selectIndex) {
          _this2.currentIndex = selectIndex;
        }
      });
    },

    // 使index维持在0-length之间循环
    loopedIndex: function loopedIndex(index, total) {
      if (index < 0) {
        index = index + (1 - index / total) * total;
      }
      return index % total;
    },
    bindExp: function bindExp(element) {
      var _this3 = this;

      if (element && element.ref && !this.moving) {
        this.startTime = Date.now();
        var index = this.loopedIndex(this.currentIndex, this.cardLength);
        var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
        var currentCard = this.$refs['card' + index + '_' + this.sliderId][0];
        var rightCard = null;
        var leftCard = null;
        var currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);
        // 卡片容器
        // x - currentCardLeft
        var sliderCtnExpOri = 'x - ' + currentCardLeft;
        var sliderCtnExp = '{"type":"-","children":[{"type":"Identifier","value":"x"},{"type":"NumericLiteral","value":' + currentCardLeft + '}]}';
        var args = [{
          element: sliderCtn.ref,
          property: 'transform.translateX',
          expression: sliderCtnExp,
          'ori_expression': sliderCtnExpOri
        }];

        if (this.cardS.scale !== 1) {
          // 当前显示的卡片
          // 1-abs(x)/588*${1-this.cardS.scale}
          var currentCardExpOri = '1-abs(x)/' + this.cardS.width + '*' + (1 - this.cardS.scale);
          var currentCardExp = '{"type":"-","children":[{"type":"NumericLiteral","value":1},{"type":"*","children":[{"type":"/","children":[{"type":"CallExpression","children":[{"type":"Identifier","value":"abs"},{"type":"Arguments","children":[{"type":"Identifier","value":"x"}]}]},{"type":"NumericLiteral","value":' + this.cardS.width + '}]},{"type":"NumericLiteral","value":' + (1 - this.cardS.scale) + '}]}]}';
          args.push({
            element: currentCard.ref,
            property: 'transform.scale',
            expression: currentCardExp,
            'ori_expression': currentCardExpOri
          });

          if (index === 0) {
            // 右边卡片
            rightCard = this.$refs['card' + (index + 1) + '_' + this.sliderId][0];
            // 1-abs(588+x)/588*${1-this.cardS.scale}
            var rightCardExpOri = '{sx: 1-abs(' + this.cardS.width + '+x)/' + this.cardS.width + '*' + (1 - this.cardS.scale) + ', sy: 1-abs(' + this.cardS.width + '+x)/' + this.cardS.width + '*' + (1 - this.cardS.scale) + '}';
            var rightCardExp = '{"type":"-","children":[{"type":"NumericLiteral","value":1},{"type":"*","children":[{"type":"/","children":[{"type":"CallExpression","children":[{"type":"Identifier","value":"abs"},{"type":"Arguments","children":[{"type":"+","children":[{"type":"NumericLiteral","value":' + this.cardS.width + '},{"type":"Identifier","value":"x"}]}]}]},{"type":"NumericLiteral","value":' + this.cardS.width + '}]},{"type":"NumericLiteral","value":' + (1 - this.cardS.scale) + '}]}]}';
            args.push({
              element: rightCard.ref,
              property: 'transform.scale',
              expression: rightCardExp,
              'ori_expression': rightCardExpOri
            });
          } else if (index === this.cardLength - 1) {
            // 左边的卡片
            leftCard = this.$refs['card' + (index - 1) + '_' + this.sliderId][0];
            // 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1-this.cardS.scale}
            var leftCardExpOri = '{sx: 1-abs(x-' + this.cardS.width + ')/' + this.cardS.width + '*' + (1 - this.cardS.scale) + ', sy: 1-abs(x-' + this.cardS.width + ')/' + this.cardS.width + '*' + (1 - this.cardS.scale) + '}';
            var leftCardExp = '{"type":"-","children":[{"type":"NumericLiteral","value":1},{"type":"*","children":[{"type":"/","children":[{"type":"CallExpression","children":[{"type":"Identifier","value":"abs"},{"type":"Arguments","children":[{"type":"-","children":[{"type":"Identifier","value":"x"},{"type":"NumericLiteral","value":' + this.cardS.width + '}]}]}]},{"type":"NumericLiteral","value":' + this.cardS.width + '}]},{"type":"NumericLiteral","value":' + (1 - this.cardS.scale) + '}]}]}';
            args.push({
              element: leftCard.ref,
              property: 'transform.scale',
              expression: leftCardExp,
              'ori_expression': leftCardExpOri
            });
          } else {
            // 左边卡片
            leftCard = this.$refs['card' + (index - 1) + '_' + this.sliderId][0];
            // 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1-this.cardS.scale}
            var _leftCardExpOri = '{sx: 1-abs(x-' + this.cardS.width + ')/' + this.cardS.width + '*' + (1 - this.cardS.scale) + ', sy: 1-abs(x-' + this.cardS.width + ')/' + this.cardS.width + '*' + (1 - this.cardS.scale) + '}';
            var _leftCardExp = '{"type":"-","children":[{"type":"NumericLiteral","value":1},{"type":"*","children":[{"type":"/","children":[{"type":"CallExpression","children":[{"type":"Identifier","value":"abs"},{"type":"Arguments","children":[{"type":"-","children":[{"type":"Identifier","value":"x"},{"type":"NumericLiteral","value":' + this.cardS.width + '}]}]}]},{"type":"NumericLiteral","value":' + this.cardS.width + '}]},{"type":"NumericLiteral","value":' + (1 - this.cardS.scale) + '}]}]}';

            args.push({
              element: leftCard.ref,
              property: 'transform.scale',
              expression: _leftCardExp,
              'ori_expression': _leftCardExpOri
            });

            // 右边卡片
            rightCard = this.$refs['card' + (index + 1) + '_' + this.sliderId][0];
            // 1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1-this.cardS.scale}
            var _rightCardExpOri = '{sx: 1-abs(' + this.cardS.width + '+x)/' + this.cardS.width + '*' + (1 - this.cardS.scale) + ', sy: 1-abs(' + this.cardS.width + '+x)/' + this.cardS.width + '*' + (1 - this.cardS.scale) + '}';
            var _rightCardExp = '{"type":"-","children":[{"type":"NumericLiteral","value":1},{"type":"*","children":[{"type":"/","children":[{"type":"CallExpression","children":[{"type":"Identifier","value":"abs"},{"type":"Arguments","children":[{"type":"+","children":[{"type":"NumericLiteral","value":' + this.cardS.width + '},{"type":"Identifier","value":"x"}]}]}]},{"type":"NumericLiteral","value":' + this.cardS.width + '}]},{"type":"NumericLiteral","value":' + (1 - this.cardS.scale) + '}]}]}';
            args.push({
              element: rightCard.ref,
              property: 'transform.scale',
              expression: _rightCardExp,
              'ori_expression': _rightCardExpOri
            });
          }
        }
        expressionBinding.createBinding(element.ref, 'pan', '', args, function (e) {
          if (!_this3.moving) {
            _this3.panEnd(e);
          }
        });
      }
    }
  }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 工具方法库
 * @namespace Utils
 * @example
 */
var Utils = {

  /**
   * 环境判断辅助 API
   * @namespace Utils.env
   * @example
   *
   *
   * const { env } = Utils;
   */
  env: {

    /**
     * 是否是手淘容器
     * @method
     * @memberOf Utils.env
     * @returns {boolean}
     * @example
     *
     * const isTaobao = env.isTaobao();
     */
    isTaobao: function isTaobao() {
      var appName = weex.config.env.appName;

      return (/(tb|taobao|淘宝)/i.test(appName)
      );
    },


    /**
     * 是否是旅客容器
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isTrip = env.isTrip();
     */
    isTrip: function isTrip() {
      var appName = weex.config.env.appName;

      return appName === 'LX';
    },

    /**
     * 是否是 web 环境
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isWeb = env.isWeb();
     */
    isWeb: function isWeb() {
      var platform = weex.config.env.platform;

      return (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
    },

    /**
     * 是否是 iOS 系统
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isIOS = env.isIOS();
     */
    isIOS: function isIOS() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'ios';
    },

    /**
     * 是否是 Android 系统
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isAndroid = env.isAndroid();
     */
    isAndroid: function isAndroid() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'android';
    },


    /**
     * 是否是支付宝容器
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isAlipay = env.isAlipay();
     */
    isAlipay: function isAlipay() {
      var appName = weex.config.env.appName;

      return appName === 'AP';
    },


    /**
     * 是否是支付宝H5容器(防止以后支付宝接入weex)
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isAlipayWeb = env.isAlipayWeb();
     */
    isAlipayWeb: function isAlipayWeb() {
      return Utils.env.isAlipay() && Utils.env.isWeb();
    },


    /**
     * 判断是否支持expressionBinding
     * 当weex版本大于0.10.1.6，为客户端即可以支持expressionBinding
     * @returns {Boolean}
     */
    supportsEB: function supportsEB() {
      var weexVersion = weex.config.env.weexVersion || '0';
      var isHighWeex = Utils.compareVersion(weexVersion, '0.10.1.4') && (Utils.env.isIOS() || Utils.env.isAndroid());
      var expressionBinding = weex.requireModule('expressionBinding');
      return expressionBinding && expressionBinding.enableBinding && isHighWeex;
    },


    /**
     * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
     * @returns {boolean}
     */
    supportsEBForAndroid: function supportsEBForAndroid() {
      return Utils.env.isAndroid() && Utils.env.supportsEB();
    },


    /**
     * 判断IOS容器是否支持是否支持expressionBinding
     * @returns {boolean}
     */
    supportsEBForIos: function supportsEBForIos() {
      return Utils.env.isIOS() && Utils.env.supportsEB();
    },


    /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
    getPageHeight: function getPageHeight() {
      var env = weex.config.env;

      var navHeight = Utils.env.isWeb() ? 0 : 130;
      return env.deviceHeight / env.deviceWidth * 750 - navHeight;
    }
  },

  /**
   * 版本号比较
   * @memberOf Utils
   * @param currVer {string}
   * @param promoteVer {string}
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wx-bridge');
   * const { compareVersion } = Utils;
   * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
   */
  compareVersion: function compareVersion() {
    var currVer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "0.0.0";
    var promoteVer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "0.0.0";

    if (currVer === promoteVer) return true;
    var currVerArr = currVer.split(".");
    var promoteVerArr = promoteVer.split(".");
    var len = Math.max(currVerArr.length, promoteVerArr.length);
    for (var i = 0; i < len; i++) {
      var proVal = ~~promoteVerArr[i];
      var curVal = ~~currVerArr[i];
      if (proVal < curVal) {
        return true;
      } else if (proVal > curVal) {
        return false;
      }
    }
    return false;
  }
};

module.exports = Utils;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.containerS))
  }, [_c('div', {
    ref: ("sliderCtn_" + _vm.sliderId),
    staticClass: "slider-content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      width: _vm.cardWidth,
      height: _vm.cardS.height + 'px',
      transform: ("translateX(-" + (_vm.currentIndex * (_vm.cardS.width + _vm.cardS.spacing)) + "px)")
    })),
    attrs: {
      "prevent-move-event": _vm.preventMove
    },
    on: {
      "panstart": _vm.onTouchStart,
      "panmove": _vm.onTouchMove,
      "panend": _vm.onTouchEnd,
      "horizontalpan": _vm.onEpTouchStart
    }
  }, _vm._l((_vm.cardList), function(v, index) {
    return _c('div', {
      ref: ("card" + index + "_" + _vm.sliderId),
      refInFor: true,
      staticClass: "slider",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        transform: ("scale(" + (index===_vm.currentIndex ? 1 : _vm.cardS.scale) + ")"),
        left: ((index * _vm.cardS.width) + "px"),
        marginLeft: (((_vm.containerS.width - _vm.cardS.width) / 2) + "px"),
        width: _vm.cardS.width + 'px',
        height: _vm.cardS.height + 'px'
      }))
    }, [_vm._t(("card" + index + "_" + _vm.sliderId))], 2)
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-15fdfbd4", module.exports)
  }
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(66)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(68),
  /* template */
  __webpack_require__(74),
  /* scopeId */
  "data-v-50bc0536",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-grid-select/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50bc0536", Component.options)
  } else {
    hotAPI.reload("data-v-50bc0536", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("152b3352", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-50bc0536\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-50bc0536\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.grid-select[data-v-50bc0536] {\n  flex-direction: row;\n  justify-content: space-between;\n  flex-wrap: wrap;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-grid-select/index.vue?b041f0c6"],"names":[],"mappings":";AA+HA;EACA,oBAAA;EACA,+BAAA;EACA,gBAAA;CACA","file":"index.vue","sourcesContent":["<!-- Created by 南麓<haonan.whn@alibaba-inc.com> on 2017/8/10. -->\n\n<template>\n  <div class=\"grid-select\">\n    <option\n      v-for=\"(item, index) in dList\"\n      v-bind=\"Object.assign({}, customStyles, item)\"\n      :key=\"index\"\n      :index=\"index\"\n      :style=\"{marginTop: index >= cols ? lineSpacing : null}\"\n      @select=\"onSelect(index)\"/>\n\n    <option\n      v-for=\"(item, index) in cHackList\"\n      v-bind=\"Object.assign({}, customStyles, item)\"\n      :key=\"index\"\n      :style=\"{opacity: 0, marginTop: dList.length >= cols ? lineSpacing : null}\"/>\n  </div>\n</template>\n\n<script>\n  import Option from './option.vue';\n\n  export default {\n    components: { Option },\n    props: {\n      // 列数\n      cols: {\n        type: Number,\n        default: 4\n      },\n      // 是否单选\n      single: {\n        type: Boolean,\n        default: false\n      },\n      // 数据\n      list: {\n        type: Array,\n        default: () => ([])\n      },\n      // 选择个数限制\n      limit: {\n        type: Number\n      },\n      // 用户自定义样式，用于个性化设置option样式\n      customStyles: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    data () {\n      return {\n        dList: this.initList()\n      }\n    },\n    computed: {\n      cHackList () {\n        const { list, cols } = this;\n        const remainder = list.length % cols;\n        const len = remainder ? cols - remainder : 0;\n\n        return Array.apply(null, { length: len });\n      }\n    },\n    watch: {\n      list () {\n        this.dList = this.initList();\n      }\n    },\n    created () {\n      // 行间距\n      this.lineSpacing = this.customStyles.lineSpacing || '12px';\n    },\n    methods: {\n      onSelect (index) {\n        const checked = this.dList[index].checked;\n        if (this.limit <= this.checkedCount && !checked) {\n          this.$emit('overLimit', this.limit);\n        } else {\n          this.updateList(index);\n          this.$emit('select', {\n            selectIndex: index,\n            checked: !checked,\n            checkedList: this.dList.filter(item => item.checked)\n          });\n        }\n      },\n      initList () {\n        const single = this.single;\n        let checkedCount = 0;\n\n        const dList = this.list.map((item, i) => {\n          let { checked, disabled } = item;\n          disabled = !!disabled;\n          // disabled为true时认为checked无效，同时单选模式下只认为第一个checked为true的为有效值\n          checked = !disabled && !!checked && (!single || checkedCount === 0);\n          if (item.checked) checkedCount += 1;\n          return {\n            ...item,\n            checked,\n            disabled\n          }\n        });\n\n        this.checkedCount = checkedCount;\n        return dList;\n      },\n      updateList (index) {\n        const single = this.single;\n        let checkedCount = 0;\n        this.dList = this.dList.map((item, i) => {\n          if (single) {\n            item.checked = index === i && !item.checked;\n          } else {\n            if (i === index) item.checked = !item.checked;\n          }\n          if (item.checked) checkedCount += 1;\n          return item;\n        });\n        this.checkedCount = checkedCount;\n      }\n    }\n  };\n</script>\n\n<style scoped>\n  .grid-select {\n    flex-direction: row;\n    justify-content: space-between;\n    flex-wrap: wrap;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _option = __webpack_require__(69);

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { Option: _option2.default },
  props: {
    // 列数
    cols: {
      type: Number,
      default: 4
    },
    // 是否单选
    single: {
      type: Boolean,
      default: false
    },
    // 数据
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 选择个数限制
    limit: {
      type: Number
    },
    // 用户自定义样式，用于个性化设置option样式
    customStyles: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      dList: this.initList()
    };
  },

  computed: {
    cHackList: function cHackList() {
      var list = this.list,
          cols = this.cols;

      var remainder = list.length % cols;
      var len = remainder ? cols - remainder : 0;

      return Array.apply(null, { length: len });
    }
  },
  watch: {
    list: function list() {
      this.dList = this.initList();
    }
  },
  created: function created() {
    // 行间距
    this.lineSpacing = this.customStyles.lineSpacing || '12px';
  },

  methods: {
    onSelect: function onSelect(index) {
      var checked = this.dList[index].checked;
      if (this.limit <= this.checkedCount && !checked) {
        this.$emit('overLimit', this.limit);
      } else {
        this.updateList(index);
        this.$emit('select', {
          selectIndex: index,
          checked: !checked,
          checkedList: this.dList.filter(function (item) {
            return item.checked;
          })
        });
      }
    },
    initList: function initList() {
      var single = this.single;
      var checkedCount = 0;

      var dList = this.list.map(function (item, i) {
        var checked = item.checked,
            disabled = item.disabled;

        disabled = !!disabled;
        // disabled为true时认为checked无效，同时单选模式下只认为第一个checked为true的为有效值
        checked = !disabled && !!checked && (!single || checkedCount === 0);
        if (item.checked) checkedCount += 1;
        return _extends({}, item, {
          checked: checked,
          disabled: disabled
        });
      });

      this.checkedCount = checkedCount;
      return dList;
    },
    updateList: function updateList(index) {
      var single = this.single;
      var checkedCount = 0;
      this.dList = this.dList.map(function (item, i) {
        if (single) {
          item.checked = index === i && !item.checked;
        } else {
          if (i === index) item.checked = !item.checked;
        }
        if (item.checked) checkedCount += 1;
        return item;
      });
      this.checkedCount = checkedCount;
    }
  }
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(70)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(72),
  /* template */
  __webpack_require__(73),
  /* scopeId */
  "data-v-2289217e",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-grid-select/option.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] option.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2289217e", Component.options)
  } else {
    hotAPI.reload("data-v-2289217e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("34558351", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2289217e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./option.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2289217e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./option.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.grid-option[data-v-2289217e] {\n  justify-content: center;\n  border-radius: 8px;\n  border-width: 2px;\n  padding-left: 6px;\n  padding-right: 6px;\n}\n.text-title[data-v-2289217e] {\n  lines: 2;\n  line-height: 30px;\n  text-overflow: ellipsis;\n  text-align: center;\n  font-size: 26px;\n}\n.image-checked[data-v-2289217e] {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  width: 38px;\n  height: 34px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-grid-select/option.vue?0c2694b1"],"names":[],"mappings":";AA0HA;EACA,wBAAA;EACA,mBAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,SAAA;EACA,kBAAA;EACA,wBAAA;EACA,mBAAA;EACA,gBAAA;CACA;AAEA;EACA,mBAAA;EACA,SAAA;EACA,UAAA;EACA,YAAA;EACA,aAAA;CACA","file":"option.vue","sourcesContent":["<!-- Created by 南麓<haonan.whn@alibaba-inc.com> on 2017/8/10. -->\n\n<template>\n  <div\n    class=\"grid-option\"\n    :style=\"cWrapperStyle\"\n    @click=\"onClick\">\n    <text v-if=\"title\" class=\"text-title\" :style=\"cTitleStyle\">{{title}}</text>\n\n    <image v-if=\"checked && icon\" class=\"image-checked\" :src=\"icon\"></image>\n  </div>\n</template>\n\n<script>\n  export default {\n    props: {\n      index: {\n        type: Number,\n        default: -1\n      },\n      // 是否选中\n      checked: {\n        type: Boolean,\n        default: false\n      },\n      // 是否可选\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      // 标题\n      title: {\n        type: String,\n        default: ''\n      },\n      width: {\n        type: String,\n        default: '166px'\n      },\n      height: {\n        type: String,\n        default: '72px'\n      },\n      // 默认 x\n      icon: {\n        type: String,\n        default: '//gw.alicdn.com/tfs/TB1IAByhgMPMeJjy1XdXXasrXXa-38-34.png'\n      },\n      // 正常状态文字色值\n      color: {\n        type: String,\n        default: '#3d3d3d'\n      },\n      // 选中状态文字色值\n      checkedColor: {\n        type: String,\n        default: '#3d3d3d'\n      },\n      // 不可选状态文字色值\n      disabledColor: {\n        type: String,\n        default: '#9b9b9b'\n      },\n      // 正常状态边框色值\n      borderColor: {\n        type: String,\n        default: 'transparent'\n      },\n      // 选中状态边框色值\n      checkedBorderColor: {\n        type: String,\n        default: '#ffb200'\n      },\n      // 不可选状态边框色值\n      disabledBorderColor: {\n        type: String,\n        default: 'transparent'\n      },\n      // 正常状态背景色值\n      backgroundColor: {\n        type: String,\n        default: '#f6f6f6'\n      },\n      // 选中状态背景色值\n      checkedBackgroundColor: {\n        type: String,\n        default: '#fff'\n      },\n      // 不可选状态背景色值\n      disabledBackgroundColor: {\n        type: String,\n        default: '#f6f6f6'\n      }\n    },\n    computed: {\n      cWrapperStyle () {\n        const { checked, disabled, width, height, borderColor, checkedBorderColor, disabledBorderColor, backgroundColor, checkedBackgroundColor, disabledBackgroundColor } = this;\n        return {\n          width,\n          height,\n          borderColor: disabled ? disabledBorderColor : checked ? checkedBorderColor : borderColor,\n          backgroundColor: disabled ? disabledBackgroundColor : checked ? checkedBackgroundColor : backgroundColor\n        }\n      },\n      cTitleStyle () {\n        const { checked, disabled, color, checkedColor, disabledColor } = this;\n        return {\n          color: disabled ? disabledColor : checked ? checkedColor : color\n        }\n      }\n    },\n    methods: {\n      onClick () {\n        if (!this.disabled) {\n          this.$emit('select', this.index);\n        }\n      }\n    }\n  }\n</script>\n\n<style scoped>\n  .grid-option {\n    justify-content: center;\n    border-radius: 8px;\n    border-width: 2px;\n    padding-left: 6px;\n    padding-right: 6px;\n  }\n\n  .text-title {\n    lines: 2;\n    line-height: 30px;\n    text-overflow: ellipsis;\n    text-align: center;\n    font-size: 26px;\n  }\n\n  .image-checked {\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    width: 38px;\n    height: 34px;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    index: {
      type: Number,
      default: -1
    },
    // 是否选中
    checked: {
      type: Boolean,
      default: false
    },
    // 是否可选
    disabled: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '166px'
    },
    height: {
      type: String,
      default: '72px'
    },
    // 默认 x
    icon: {
      type: String,
      default: '//gw.alicdn.com/tfs/TB1IAByhgMPMeJjy1XdXXasrXXa-38-34.png'
    },
    // 正常状态文字色值
    color: {
      type: String,
      default: '#3d3d3d'
    },
    // 选中状态文字色值
    checkedColor: {
      type: String,
      default: '#3d3d3d'
    },
    // 不可选状态文字色值
    disabledColor: {
      type: String,
      default: '#9b9b9b'
    },
    // 正常状态边框色值
    borderColor: {
      type: String,
      default: 'transparent'
    },
    // 选中状态边框色值
    checkedBorderColor: {
      type: String,
      default: '#ffb200'
    },
    // 不可选状态边框色值
    disabledBorderColor: {
      type: String,
      default: 'transparent'
    },
    // 正常状态背景色值
    backgroundColor: {
      type: String,
      default: '#f6f6f6'
    },
    // 选中状态背景色值
    checkedBackgroundColor: {
      type: String,
      default: '#fff'
    },
    // 不可选状态背景色值
    disabledBackgroundColor: {
      type: String,
      default: '#f6f6f6'
    }
  },
  computed: {
    cWrapperStyle: function cWrapperStyle() {
      var checked = this.checked,
          disabled = this.disabled,
          width = this.width,
          height = this.height,
          borderColor = this.borderColor,
          checkedBorderColor = this.checkedBorderColor,
          disabledBorderColor = this.disabledBorderColor,
          backgroundColor = this.backgroundColor,
          checkedBackgroundColor = this.checkedBackgroundColor,
          disabledBackgroundColor = this.disabledBackgroundColor;

      return {
        width: width,
        height: height,
        borderColor: disabled ? disabledBorderColor : checked ? checkedBorderColor : borderColor,
        backgroundColor: disabled ? disabledBackgroundColor : checked ? checkedBackgroundColor : backgroundColor
      };
    },
    cTitleStyle: function cTitleStyle() {
      var checked = this.checked,
          disabled = this.disabled,
          color = this.color,
          checkedColor = this.checkedColor,
          disabledColor = this.disabledColor;

      return {
        color: disabled ? disabledColor : checked ? checkedColor : color
      };
    }
  },
  methods: {
    onClick: function onClick() {
      if (!this.disabled) {
        this.$emit('select', this.index);
      }
    }
  }
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "grid-option",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.cWrapperStyle)),
    on: {
      "click": _vm.onClick
    }
  }, [(_vm.title) ? _c('text', {
    staticClass: "text-title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.cTitleStyle))
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), (_vm.checked && _vm.icon) ? _c('image', {
    staticClass: "image-checked",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.icon
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2289217e", module.exports)
  }
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "grid-select",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._l((_vm.dList), function(item, index) {
    return _c('option', _vm._b({
      key: index,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        marginTop: index >= _vm.cols ? _vm.lineSpacing : null
      })),
      attrs: {
        "index": index
      },
      on: {
        "select": function($event) {
          _vm.onSelect(index)
        }
      }
    }, 'option', Object.assign({}, _vm.customStyles, item), false))
  }), _vm._v(" "), _vm._l((_vm.cHackList), function(item, index) {
    return _c('option', _vm._b({
      key: index,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        opacity: 0,
        marginTop: _vm.dList.length >= _vm.cols ? _vm.lineSpacing : null
      }))
    }, 'option', Object.assign({}, _vm.customStyles, item), false))
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-50bc0536", module.exports)
  }
}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(76);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(77)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(79),
  /* template */
  __webpack_require__(81),
  /* scopeId */
  "data-v-8a0583fa",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-indexlist/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8a0583fa", Component.options)
  } else {
    hotAPI.reload("data-v-8a0583fa", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(78);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("30dbfaf2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-8a0583fa\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-8a0583fa\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-index-list[data-v-8a0583fa] {\n  position: relative;\n}\n.index-list[data-v-8a0583fa] {\n  width: 750px;\n  height: 1334px;\n}\n.index-list-title[data-v-8a0583fa] {\n  border-bottom-width: 1px;\n  border-color: rgba(32, 35, 37, 0.15);\n  background-color: #FBFBFB;\n  font-size: 24px;\n  color: #666666;\n  padding-bottom: 14px;\n  padding-top: 14px;\n  padding-left: 23px;\n  width: 750px;\n}\n.group-title[data-v-8a0583fa] {\n  border-bottom-width: 0;\n  padding-bottom: 0;\n  padding-top: 24px;\n}\n.index-list-item[data-v-8a0583fa] {\n  width: 750px;\n  flex-direction: row;\n  align-items: center;\n  border-bottom-width: 1px;\n  border-bottom-color: #e0e0e0;\n  height: 92px;\n  padding-left: 24px;\n  padding-right: 24px;\n  background-color: #FFFFFF;\n}\n.title[data-v-8a0583fa] {\n  font-size: 32px;\n  color: #3D3D3D;\n}\n.desc[data-v-8a0583fa] {\n  font-size: 24px;\n  color: #A5A5A5;\n  margin-left: 30px;\n}\n.index-list-nav[data-v-8a0583fa] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin-bottom: 60px;\n  margin-top: 60px;\n  padding-bottom: 20px;\n  padding-top: 20px;\n  width: 70px;\n}\n.list-nav-key[data-v-8a0583fa] {\n  text-align: center;\n  font-size: 24px;\n  height: 40px;\n  color: #666666;\n}\n.index-list-pop[data-v-8a0583fa] {\n  position: fixed;\n  top: 550px;\n  left: 316px;\n  width: 118px;\n  height: 118px;\n  text-align: center;\n  justify-content: center;\n  background-color: rgba(32, 35, 37, .6);\n  border-radius: 59px;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 35px;\n  padding-bottom: 35px;\n  color: #ffffff;\n  opacity: 1;\n}\n.list-pop-text[data-v-8a0583fa] {\n  font-size: 40px;\n  text-align: center;\n  color: #ffffff;\n}\n.group[data-v-8a0583fa] {\n  padding-bottom: 18px;\n  padding-right: 70px;\n  background-color: #FBFBFB;\n}\n.group-list[data-v-8a0583fa] {\n  flex-direction: row;\n  margin-left: 18px;\n  margin-top: 18px;\n  background-color: #FBFBFB;\n}\n.group-item[data-v-8a0583fa] {\n  width: 146px;\n  height: 64px;\n  border-width: 1px;\n  border-color: #e0e0e0;\n  margin-right: 18px;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  background-color: #FFF;\n}\n.item-content[data-v-8a0583fa] {\n  flex-direction: column;\n}\n.item-name[data-v-8a0583fa] {\n  font-size: 24px;\n  line-height: 26px;\n  color: #333;\n}\n.item-desc[data-v-8a0583fa] {\n  margin-top: 2px;\n  color: #999;\n  font-size: 20px;\n  text-align: center;\n}\n.location-icon[data-v-8a0583fa] {\n  width: 32px;\n  height: 32px;\n  margin-right: 8px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-indexlist/index.vue?9431656e"],"names":[],"mappings":";AAkIA;EACA,mBAAA;CACA;AAEA;EACA,aAAA;EACA,eAAA;CACA;AAEA;EACA,yBAAA;EACA,qCAAA;EACA,0BAAA;EACA,gBAAA;EACA,eAAA;EACA,qBAAA;EACA,kBAAA;EACA,mBAAA;EACA,aAAA;CACA;AAEA;EACA,uBAAA;EACA,kBAAA;EACA,kBAAA;CACA;AAEA;EACA,aAAA;EACA,oBAAA;EACA,oBAAA;EACA,yBAAA;EACA,6BAAA;EACA,aAAA;EACA,mBAAA;EACA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,kBAAA;CACA;AAEA;EACA,mBAAA;EACA,OAAA;EACA,SAAA;EACA,oBAAA;EACA,iBAAA;EACA,qBAAA;EACA,kBAAA;EACA,YAAA;CACA;AAEA;EACA,mBAAA;EACA,gBAAA;EACA,aAAA;EACA,eAAA;CACA;AAEA;EACA,gBAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,cAAA;EACA,mBAAA;EACA,wBAAA;EACA,uCAAA;EACA,oBAAA;EACA,gBAAA;EACA,iBAAA;EACA,kBAAA;EACA,qBAAA;EACA,eAAA;EACA,WAAA;CACA;AAEA;EACA,gBAAA;EACA,mBAAA;EACA,eAAA;CACA;AAEA;EACA,qBAAA;EACA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,oBAAA;EACA,kBAAA;EACA,iBAAA;EACA,0BAAA;CACA;AAEA;EACA,aAAA;EACA,aAAA;EACA,kBAAA;EACA,sBAAA;EACA,mBAAA;EACA,oBAAA;EACA,oBAAA;EACA,wBAAA;EACA,uBAAA;CACA;AAEA;EACA,uBAAA;CACA;AAEA;EACA,gBAAA;EACA,kBAAA;EACA,YAAA;CACA;AAEA;EACA,gBAAA;EACA,YAAA;EACA,gBAAA;EACA,mBAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/11/02. -->\n<!-- Update by Tw93 on 17/06/20. -->\n<!--A index list. -->\n\n<template>\n  <div class=\"wxc-index-list\">\n    <list class=\"index-list\"\n          :style=\"{height: height+'px'}\">\n      <cell v-for=\"(v,i) in formatList\"\n            :key=\"i\"\n            :ref=\"'index-item-title-' + v.title\">\n        <text :class=\"['index-list-title',v.type && v.type=='group' && 'group-title']\"\n              v-if=\"!onlyShowList\">{{v.title}}</text>\n        <div v-if=\"v.type && v.type=='group' && !onlyShowList\"\n             class=\"group\">\n          <div v-for=\"(group,index) in v.data\"\n               :key=\"index\"\n               class=\"group-list\">\n            <div v-for=\"(item,i) in group\"\n                 :key=\"i\"\n                 @click=\"itemClicked(item)\"\n                 class=\"group-item\">\n              <image v-if=\"item.isLocation\"\n                     class=\"location-icon\"\n                     src=\"//gw.alicdn.com/tfs/TB1JUiUPFXXXXXUXXXXXXXXXXXX-32-32.png\"></image>\n              <div class=\"item-content\">\n                <text class=\"item-name\">{{item.name}}</text>\n                <text class=\"item-desc\"\n                      v-if=\"item.desc\">{{item.desc}}</text>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"index-list-item\"\n             v-if=\"v.type=='list'\"\n             v-for=\"(item,index) in v.data\"\n             @click=\"itemClicked(item)\"\n             :key=\"index\">\n          <text class=\"title\">{{item.name}}</text>\n          <text class=\"desc\">{{item.desc}}</text>\n        </div>\n      </cell>\n    </list>\n    <div class=\"index-list-nav\"\n         :style=\"navStyle\"\n         v-if=\"showIndex && !onlyShowList\">\n      <text v-for=\"(item,index) in formatList\"\n            :key=\"index\"\n            :title=\"item.title\"\n            @click=\"go2Key(item.title)\"\n            class=\"list-nav-key\">{{item.title}}</text>\n    </div>\n    <div class=\"index-list-pop\"\n         v-if=\"popKeyShow\">\n      <text class=\"list-pop-text\">{{popKey}}</text>\n    </div>\n  </div>\n</template>\n\n<script>\n  const dom = weex.requireModule('dom');\n  const Util = require('./util');\n  module.exports = {\n    props: {\n      height: {\n        type: [Number, String],\n        default: Util.getPageHeight()\n      },\n      normalList: {\n        type: Array,\n        default: () => ([])\n      },\n      onlyShowList: {\n        type: Boolean,\n        default: false\n      },\n      showIndex: {\n        type: Boolean,\n        default: true\n      },\n      navStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      hotListConfig: {\n        type: Object,\n        default: () => ({})\n      },\n      // 城市选择子组件 特殊情况支持\n      cityLocationConfig: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    computed: {\n      formatList () {\n        const { normalList, hotListConfig, cityLocationConfig } = this;\n        return Util.formatTotalList(normalList, hotListConfig, cityLocationConfig);\n      }\n    },\n    data: () => ({\n      popKeyShow: false,\n      popKey: '',\n      navOffsetY: 0\n    }),\n    methods: {\n      itemClicked (item) {\n        const self = this;\n        self.$emit('wxcIndexlistItemClicked', {\n          item\n        });\n      },\n      go2Key (key) {\n        const self = this;\n        const keyEl = self.$refs['index-item-title-' + key][0];\n        dom.scrollToElement(keyEl, {\n          offset: 0\n        });\n        self.popKey = key;\n        self.popKeyShow = true;\n        setTimeout(function () {\n          self.popKeyShow = false;\n        }, 600);\n      }\n    }\n  };\n</script>\n\n<style scoped>\n  .wxc-index-list {\n    position: relative;\n  }\n\n  .index-list {\n    width: 750px;\n    height: 1334px;\n  }\n\n  .index-list-title {\n    border-bottom-width: 1px;\n    border-color: rgba(32, 35, 37, 0.15);\n    background-color: #FBFBFB;\n    font-size: 24px;\n    color: #666666;\n    padding-bottom: 14px;\n    padding-top: 14px;\n    padding-left: 23px;\n    width: 750px;\n  }\n\n  .group-title {\n    border-bottom-width: 0;\n    padding-bottom: 0;\n    padding-top: 24px;\n  }\n\n  .index-list-item {\n    width: 750px;\n    flex-direction: row;\n    align-items: center;\n    border-bottom-width: 1px;\n    border-bottom-color: #e0e0e0;\n    height: 92px;\n    padding-left: 24px;\n    padding-right: 24px;\n    background-color: #FFFFFF;\n  }\n\n  .title {\n    font-size: 32px;\n    color: #3D3D3D;\n  }\n\n  .desc {\n    font-size: 24px;\n    color: #A5A5A5;\n    margin-left: 30px;\n  }\n\n  .index-list-nav {\n    position: absolute;\n    top: 0;\n    right: 0;\n    margin-bottom: 60px;\n    margin-top: 60px;\n    padding-bottom: 20px;\n    padding-top: 20px;\n    width: 70px;\n  }\n\n  .list-nav-key {\n    text-align: center;\n    font-size: 24px;\n    height: 40px;\n    color: #666666;\n  }\n\n  .index-list-pop {\n    position: fixed;\n    top: 550px;\n    left: 316px;\n    width: 118px;\n    height: 118px;\n    text-align: center;\n    justify-content: center;\n    background-color: rgba(32, 35, 37, .6);\n    border-radius: 59px;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 35px;\n    padding-bottom: 35px;\n    color: #ffffff;\n    opacity: 1;\n  }\n\n  .list-pop-text {\n    font-size: 40px;\n    text-align: center;\n    color: #ffffff;\n  }\n\n  .group {\n    padding-bottom: 18px;\n    padding-right: 70px;\n    background-color: #FBFBFB;\n  }\n\n  .group-list {\n    flex-direction: row;\n    margin-left: 18px;\n    margin-top: 18px;\n    background-color: #FBFBFB;\n  }\n\n  .group-item {\n    width: 146px;\n    height: 64px;\n    border-width: 1px;\n    border-color: #e0e0e0;\n    margin-right: 18px;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    background-color: #FFF;\n  }\n\n  .item-content {\n    flex-direction: column;\n  }\n\n  .item-name {\n    font-size: 24px;\n    line-height: 26px;\n    color: #333;\n  }\n\n  .item-desc {\n    margin-top: 2px;\n    color: #999;\n    font-size: 20px;\n    text-align: center;\n  }\n\n  .location-icon {\n    width: 32px;\n    height: 32px;\n    margin-right: 8px;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');
var Util = __webpack_require__(80);
module.exports = {
  props: {
    height: {
      type: [Number, String],
      default: Util.getPageHeight()
    },
    normalList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    onlyShowList: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    navStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    hotListConfig: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    // 城市选择子组件 特殊情况支持
    cityLocationConfig: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    formatList: function formatList() {
      var normalList = this.normalList,
          hotListConfig = this.hotListConfig,
          cityLocationConfig = this.cityLocationConfig;

      return Util.formatTotalList(normalList, hotListConfig, cityLocationConfig);
    }
  },
  data: function data() {
    return {
      popKeyShow: false,
      popKey: '',
      navOffsetY: 0
    };
  },
  methods: {
    itemClicked: function itemClicked(item) {
      var self = this;
      self.$emit('wxcIndexlistItemClicked', {
        item: item
      });
    },
    go2Key: function go2Key(key) {
      var self = this;
      var keyEl = self.$refs['index-item-title-' + key][0];
      dom.scrollToElement(keyEl, {
        offset: 0
      });
      self.popKey = key;
      self.popKeyShow = true;
      setTimeout(function () {
        self.popKeyShow = false;
      }, 600);
    }
  }
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.formatTotalList = formatTotalList;
exports.arrayChunk = arrayChunk;
exports.getSpecialData = getSpecialData;
exports.getPageHeight = getPageHeight;
exports.isWeb = isWeb;
/**
 * 根据26个字母取每一项首字母对数据进行排序,处理数据变换
 * @param  {object}
 * @return {[array]}
 */
function formatTotalList(source, hotListConfig, cityLocationConfig) {
  var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var res = [];
  LETTERS.split('').forEach(function (letter) {
    var _data = source.filter(function (item) {
      if (item.pinYin) {
        return item.pinYin.slice(0, 1).toLowerCase() === letter.toLowerCase();
      } else if (item.py) {
        return item.py.slice(0, 1).toLowerCase() === letter.toLowerCase();
      } else {
        return false;
      }
    });
    if (_data.length) {
      res.push({
        title: letter,
        data: _data,
        type: 'list'
      });
    }
  });

  // 处理热门数据
  var hotList = getSpecialData(hotListConfig);
  hotList && res.unshift(hotList);

  // 处理特殊定位数据
  var cityLocation = getSpecialData(cityLocationConfig);
  cityLocation && res.unshift(cityLocation);

  return res;
}

/**
 * 分割数组
 * @param arr 被分割数组
 * @param size 分割数组的长度
 * @returns {Array}
 */
function arrayChunk() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

  var groups = [];
  if (arr && arr.length > 0) {
    groups = arr.map(function (e, i) {
      return i % size === 0 ? arr.slice(i, i + size) : null;
    }).filter(function (e) {
      return e;
    });
  }
  return groups;
}

function getSpecialData(data) {
  if (data && data.type && data.list && data.list.length > 0) {
    var type = data.type,
        title = data.title,
        list = data.list;

    var res = {
      title: title,
      type: type,
      data: type === 'group' ? arrayChunk(list) : list
    };
    return res;
  } else {
    return null;
  }
}

function getPageHeight() {
  var env = weex.config.env;

  var navHeight = isWeb() ? 0 : 130;
  return env.deviceHeight / env.deviceWidth * 750 - navHeight;
}

function isWeb() {
  var platform = weex.config.env.platform;

  return (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-index-list",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('list', {
    staticClass: "index-list",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: _vm.height + 'px'
    }))
  }, _vm._l((_vm.formatList), function(v, i) {
    return _c('cell', {
      key: i,
      ref: 'index-item-title-' + v.title,
      refInFor: true,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [(!_vm.onlyShowList) ? _c('text', {
      class: ['index-list-title', v.type && v.type == 'group' && 'group-title'],
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_vm._v(_vm._s(v.title))]) : _vm._e(), _vm._v(" "), (v.type && v.type == 'group' && !_vm.onlyShowList) ? _c('div', {
      staticClass: "group",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, _vm._l((v.data), function(group, index) {
      return _c('div', {
        key: index,
        staticClass: "group-list",
        staticStyle: _vm.$processStyle(undefined),
        style: (_vm.$processStyle(undefined))
      }, _vm._l((group), function(item, i) {
        return _c('div', {
          key: i,
          staticClass: "group-item",
          staticStyle: _vm.$processStyle(undefined),
          style: (_vm.$processStyle(undefined)),
          on: {
            "click": function($event) {
              _vm.itemClicked(item)
            }
          }
        }, [(item.isLocation) ? _c('image', {
          staticClass: "location-icon",
          staticStyle: _vm.$processStyle(undefined),
          style: (_vm.$processStyle(undefined)),
          attrs: {
            "src": "//gw.alicdn.com/tfs/TB1JUiUPFXXXXXUXXXXXXXXXXXX-32-32.png"
          }
        }) : _vm._e(), _vm._v(" "), _c('div', {
          staticClass: "item-content",
          staticStyle: _vm.$processStyle(undefined),
          style: (_vm.$processStyle(undefined))
        }, [_c('text', {
          staticClass: "item-name",
          staticStyle: _vm.$processStyle(undefined),
          style: (_vm.$processStyle(undefined))
        }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), (item.desc) ? _c('text', {
          staticClass: "item-desc",
          staticStyle: _vm.$processStyle(undefined),
          style: (_vm.$processStyle(undefined))
        }, [_vm._v(_vm._s(item.desc))]) : _vm._e()])])
      }))
    })) : _vm._e(), _vm._v(" "), _vm._l((v.data), function(item, index) {
      return (v.type == 'list') ? _c('div', {
        key: index,
        staticClass: "index-list-item",
        staticStyle: _vm.$processStyle(undefined),
        style: (_vm.$processStyle(undefined)),
        on: {
          "click": function($event) {
            _vm.itemClicked(item)
          }
        }
      }, [_c('text', {
        staticClass: "title",
        staticStyle: _vm.$processStyle(undefined),
        style: (_vm.$processStyle(undefined))
      }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('text', {
        staticClass: "desc",
        staticStyle: _vm.$processStyle(undefined),
        style: (_vm.$processStyle(undefined))
      }, [_vm._v(_vm._s(item.desc))])]) : _vm._e()
    })], 2)
  })), _vm._v(" "), (_vm.showIndex && !_vm.onlyShowList) ? _c('div', {
    staticClass: "index-list-nav",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.navStyle))
  }, _vm._l((_vm.formatList), function(item, index) {
    return _c('text', {
      key: index,
      staticClass: "list-nav-key",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "title": item.title
      },
      on: {
        "click": function($event) {
          _vm.go2Key(item.title)
        }
      }
    }, [_vm._v(_vm._s(item.title))])
  })) : _vm._e(), _vm._v(" "), (_vm.popKeyShow) ? _c('div', {
    staticClass: "index-list-pop",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "list-pop-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.popKey))])]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8a0583fa", module.exports)
  }
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(83);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(84)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(86),
  /* template */
  __webpack_require__(98),
  /* scopeId */
  "data-v-1f2af058",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-lightbox/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f2af058", Component.options)
  } else {
    hotAPI.reload("data-v-1f2af058", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(85);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6f0b4a82", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1f2af058\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1f2af058\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.indicator[data-v-1f2af058] {\n  position: absolute;\n  item-color: rgba(255, 195, 0, .5);\n  item-selected-color: #ffc300;\n  item-size: 20px;\n  height: 20px;\n  bottom: 24px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-lightbox/index.vue?71fb297d"],"names":[],"mappings":";AA8BA;EACA,mBAAA;EACA,kCAAA;EACA,6BAAA;EACA,gBAAA;EACA,aAAA;EACA,aAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div>\n    <wxc-mask :width=\"width\"\n              :height=\"height\"\n              mask-bg-color=\"transparent\"\n              overlay-opacity=\"0.8\"\n              v-on:wxcMaskSetHidden=\"maskOverlayClick\"\n              :show=\"show\"\n              :show-close=\"showClose\">\n      <slider auto-play=\"false\"\n              v-if=\"show\"\n              :style=\"{ height: height  + 'px'}\">\n        <div v-for=\"(v,index) in imageList\"\n             :style=\"{ height: height  + 'px'}\"\n             :key=\"index\">\n          <image resize=\"cover\"\n                 :src=\"v.src\"\n                 :style=\"{ height: height + 'px', width: width  + 'px'}\"></image>\n        </div>\n        <indicator class=\"indicator\"\n                   :style=\"indicatorStyle\"></indicator>\n      </slider>\n    </wxc-mask>\n  </div>\n</template>\n\n<style scoped>\n  .indicator {\n    position: absolute;\n    item-color: rgba(255, 195, 0, .5);\n    item-selected-color: #ffc300;\n    item-size: 20px;\n    height: 20px;\n    bottom: 24px;\n  }\n</style>\n\n<script>\n  import WxcMask from '../wxc-mask';\n  module.exports = {\n    components: {\n      WxcMask\n    },\n    props: {\n      width: {\n        type: [Number, String],\n        default: 750\n      },\n      height: {\n        type: [Number, String],\n        default: 750\n      },\n      show: {\n        type: Boolean,\n        default: false\n      },\n      imageList: Array,\n      indicatorColor: {\n        type: Object,\n        default: () => ({\n          'item-color': 'rgba(255, 195, 0, .5)',\n          'item-selected-color': '#ffc300',\n          'item-size': '20px'\n        })\n      }\n    },\n    computed: {\n      indicatorStyle () {\n        return {\n          width: this.width + 'px',\n          ...this.indicatorColor\n        }\n      }\n    },\n    data: () => ({\n      showClose: false\n    }),\n    methods: {\n      maskOverlayClick () {\n        this.$emit('wxcLightboxOverlayClicked', {});\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _wxcMask = __webpack_require__(9);

var _wxcMask2 = _interopRequireDefault(_wxcMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  components: {
    WxcMask: _wxcMask2.default
  },
  props: {
    width: {
      type: [Number, String],
      default: 750
    },
    height: {
      type: [Number, String],
      default: 750
    },
    show: {
      type: Boolean,
      default: false
    },
    imageList: Array,
    indicatorColor: {
      type: Object,
      default: function _default() {
        return {
          'item-color': 'rgba(255, 195, 0, .5)',
          'item-selected-color': '#ffc300',
          'item-size': '20px'
        };
      }
    }
  },
  computed: {
    indicatorStyle: function indicatorStyle() {
      return _extends({
        width: this.width + 'px'
      }, this.indicatorColor);
    }
  },
  data: function data() {
    return {
      showClose: false
    };
  },
  methods: {
    maskOverlayClick: function maskOverlayClick() {
      this.$emit('wxcLightboxOverlayClicked', {});
    }
  }
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(88)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(90),
  /* template */
  __webpack_require__(97),
  /* scopeId */
  "data-v-3b9aece2",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-mask/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b9aece2", Component.options)
  } else {
    hotAPI.reload("data-v-3b9aece2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(89);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3c3a9530", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3b9aece2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3b9aece2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.container[data-v-3b9aece2] {\n  position: fixed;\n  width: 750px;\n  /*兼容H5异常*/\n  z-index: 99999;\n}\n.wxc-mask[data-v-3b9aece2] {\n  position: fixed;\n  top: 300px;\n  left: 60px;\n  width: 702px;\n  height: 800px;\n}\n.mask-bottom[data-v-3b9aece2] {\n  width: 100px;\n  height: 100px;\n  background-color: transparent;\n  justify-content: center;\n  align-items: center;\n}\n.mask-close-icon[data-v-3b9aece2] {\n  width: 64px;\n  height: 64px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-mask/index.vue?de1d8b52"],"names":[],"mappings":";AA8BA;EACA,gBAAA;EACA,aAAA;EACA,UAAA;EACA,eAAA;CACA;AAEA;EACA,gBAAA;EACA,WAAA;EACA,WAAA;EACA,aAAA;EACA,cAAA;CACA;AAEA;EACA,aAAA;EACA,cAAA;EACA,8BAAA;EACA,wBAAA;EACA,oBAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A Mask.-->\n<template>\n  <div class=\"container\">\n    <wxc-overlay :show=\"show && hasOverlay\"\n                 v-if=\"show\"\n                 v-bind=\"mergeOverlayCfg\"\n                 v-on:wxcOverlayBodyClicking=\"wxcOverlayBodyClicking\"\n                 v-on:wxcOverlayBodyClicked=\"wxcOverlayBodyClicked\"></wxc-overlay>\n    <div ref=\"wxc-mask\"\n         class=\"wxc-mask\"\n         v-if=\"show\"\n         :hack=\"shouldShow\"\n         :style=\"maskStyle\">\n      <div :style=\"contentStyle\">\n        <slot></slot>\n      </div>\n      <div class=\"mask-bottom\"\n           :style=\"{ width: width + 'px' }\"\n           @click=\"closeIconClicked\"\n           v-if=\"showClose\">\n        <image :src=\"closeIcon\"\n               class=\"mask-close-icon\"></image>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .container {\n    position: fixed;\n    width: 750px;\n    /*兼容H5异常*/\n    z-index: 99999;\n  }\n\n  .wxc-mask {\n    position: fixed;\n    top: 300px;\n    left: 60px;\n    width: 702px;\n    height: 800px;\n  }\n\n  .mask-bottom {\n    width: 100px;\n    height: 100px;\n    background-color: transparent;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .mask-close-icon {\n    width: 64px;\n    height: 64px;\n  }\n</style>\n\n<script>\n  const animation = weex.requireModule('animation');\n  const icon = require('./icon.base64.js');\n  import WxcOverlay from '../wxc-overlay';\n  module.exports = {\n    components: { WxcOverlay },\n    props: {\n      height: {\n        type: [String, Number],\n        default: 800\n      },\n      width: {\n        type: [String, Number],\n        default: 702\n      },\n      show: {\n        type: Boolean,\n        default: false\n      },\n      showClose: {\n        type: Boolean,\n        default: false\n      },\n      duration: {\n        type: [String, Number],\n        default: 300\n      },\n      hasOverlay: {\n        type: Boolean,\n        default: true\n      },\n      hasAnimation: {\n        type: Boolean,\n        default: true\n      },\n      timingFunction: {\n        type: Array,\n        default: () => (['ease-in', 'ease-out'])\n      },\n      overlayCfg: {\n        type: Object,\n        default: () => ({\n          hasAnimation: true,\n          timingFunction: ['ease-in', 'ease-out'],\n          duration: 300,\n          opacity: 0.6\n        })\n      },\n      borderRadius: {\n        type: [String, Number],\n        default: 0\n      },\n      overlayCanClose: {\n        type: Boolean,\n        default: true\n      },\n      maskBgColor: {\n        type: String,\n        default: '#ffffff'\n      }\n    },\n    data: () => ({\n      closeIcon: icon.closeIcon,\n      maskTop: 264,\n      opacity: 0\n    }),\n    computed: {\n      mergeOverlayCfg () {\n        return {\n          ...this.overlayCfg,\n          hasAnimation: this.hasAnimation\n        }\n      },\n      maskStyle () {\n        const { width, height, showClose, hasAnimation, opacity } = this;\n        const newHeight = showClose ? height - 0 + 100 : height;\n        const { deviceHeight, deviceWidth, platform } = weex.config.env;\n        const _deviceHeight = deviceHeight || 1334;\n        const isWeb = typeof (window) === 'object' && platform.toLowerCase() === 'web';\n        const navHeight = isWeb ? 0 : 130;\n        const pageHeight = _deviceHeight / deviceWidth * 750 - navHeight;\n        return {\n          width: width + 'px',\n          height: newHeight + 'px',\n          left: (750 - width) / 2 + 'px',\n          top: (pageHeight - height) / 2 + 'px',\n          opacity: hasAnimation ? opacity : 1\n        }\n      },\n      contentStyle () {\n        return {\n          width: this.width + 'px',\n          backgroundColor: this.maskBgColor,\n          height: this.height + 'px',\n          borderRadius: this.borderRadius + 'px'\n        }\n      },\n      shouldShow () {\n        const { show, hasAnimation } = this;\n        hasAnimation && setTimeout(() => {\n          this.appearMask(show);\n        }, 50);\n        return show;\n      }\n    },\n    methods: {\n      closeIconClicked () {\n        this.appearMask(false);\n      },\n      wxcOverlayBodyClicking () {\n        if (this.hasAnimation) {\n          this.appearMask(false);\n          this.$emit('wxcOverlayBodyClicking', {});\n        }\n      },\n      wxcOverlayBodyClicked () {\n        if (!this.hasAnimation) {\n          this.appearMask(false);\n          this.$emit('wxcOverlayBodyClicked', {});\n        }\n      },\n      needEmit (bool = false) {\n        !bool && (this.$emit('wxcMaskSetHidden', {}));\n      },\n      appearMask (bool, duration = this.duration) {\n        const { hasAnimation, timingFunction } = this;\n        const maskEl = this.$refs['wxc-mask'];\n        if (hasAnimation && maskEl) {\n          animation.transition(maskEl, {\n            styles: {\n              opacity: bool ? 1 : 0\n            },\n            duration,\n            timingFunction: timingFunction[bool ? 0 : 1],\n            delay: 0\n          }, () => {\n            this.needEmit(bool);\n          });\n        } else {\n          this.needEmit(bool);\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _wxcOverlay = __webpack_require__(5);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
var icon = __webpack_require__(96);

module.exports = {
  components: { WxcOverlay: _wxcOverlay2.default },
  props: {
    height: {
      type: [String, Number],
      default: 800
    },
    width: {
      type: [String, Number],
      default: 702
    },
    show: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [String, Number],
      default: 300
    },
    hasOverlay: {
      type: Boolean,
      default: true
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    timingFunction: {
      type: Array,
      default: function _default() {
        return ['ease-in', 'ease-out'];
      }
    },
    overlayCfg: {
      type: Object,
      default: function _default() {
        return {
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          duration: 300,
          opacity: 0.6
        };
      }
    },
    borderRadius: {
      type: [String, Number],
      default: 0
    },
    overlayCanClose: {
      type: Boolean,
      default: true
    },
    maskBgColor: {
      type: String,
      default: '#ffffff'
    }
  },
  data: function data() {
    return {
      closeIcon: icon.closeIcon,
      maskTop: 264,
      opacity: 0
    };
  },
  computed: {
    mergeOverlayCfg: function mergeOverlayCfg() {
      return _extends({}, this.overlayCfg, {
        hasAnimation: this.hasAnimation
      });
    },
    maskStyle: function maskStyle() {
      var width = this.width,
          height = this.height,
          showClose = this.showClose,
          hasAnimation = this.hasAnimation,
          opacity = this.opacity;

      var newHeight = showClose ? height - 0 + 100 : height;
      var _weex$config$env = weex.config.env,
          deviceHeight = _weex$config$env.deviceHeight,
          deviceWidth = _weex$config$env.deviceWidth,
          platform = _weex$config$env.platform;

      var _deviceHeight = deviceHeight || 1334;
      var isWeb = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
      var navHeight = isWeb ? 0 : 130;
      var pageHeight = _deviceHeight / deviceWidth * 750 - navHeight;
      return {
        width: width + 'px',
        height: newHeight + 'px',
        left: (750 - width) / 2 + 'px',
        top: (pageHeight - height) / 2 + 'px',
        opacity: hasAnimation ? opacity : 1
      };
    },
    contentStyle: function contentStyle() {
      return {
        width: this.width + 'px',
        backgroundColor: this.maskBgColor,
        height: this.height + 'px',
        borderRadius: this.borderRadius + 'px'
      };
    },
    shouldShow: function shouldShow() {
      var _this = this;

      var show = this.show,
          hasAnimation = this.hasAnimation;

      hasAnimation && setTimeout(function () {
        _this.appearMask(show);
      }, 50);
      return show;
    }
  },
  methods: {
    closeIconClicked: function closeIconClicked() {
      this.appearMask(false);
    },
    wxcOverlayBodyClicking: function wxcOverlayBodyClicking() {
      if (this.hasAnimation) {
        this.appearMask(false);
        this.$emit('wxcOverlayBodyClicking', {});
      }
    },
    wxcOverlayBodyClicked: function wxcOverlayBodyClicked() {
      if (!this.hasAnimation) {
        this.appearMask(false);
        this.$emit('wxcOverlayBodyClicked', {});
      }
    },
    needEmit: function needEmit() {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      !bool && this.$emit('wxcMaskSetHidden', {});
    },
    appearMask: function appearMask(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;
      var hasAnimation = this.hasAnimation,
          timingFunction = this.timingFunction;

      var maskEl = this.$refs['wxc-mask'];
      if (hasAnimation && maskEl) {
        animation.transition(maskEl, {
          styles: {
            opacity: bool ? 1 : 0
          },
          duration: duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0
        }, function () {
          _this2.needEmit(bool);
        });
      } else {
        this.needEmit(bool);
      }
    }
  }
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(92)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(94),
  /* template */
  __webpack_require__(95),
  /* scopeId */
  "data-v-16b9703a",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-overlay/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16b9703a", Component.options)
  } else {
    hotAPI.reload("data-v-16b9703a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(93);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("713b7bb1", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-16b9703a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-16b9703a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-overlay[data-v-16b9703a] {\n  width: 750px;\n  position: fixed;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-overlay/index.vue?474db8de"],"names":[],"mappings":";AAiBA;EACA,aAAA;EACA,gBAAA;EACA,QAAA;EACA,OAAA;EACA,UAAA;EACA,SAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A gray overlay mask-->\n\n<template>\n  <div>\n    <div class=\"wxc-overlay\"\n         ref=\"wxc-overlay\"\n         v-if=\"show\"\n         :hack=\"shouldShow\"\n         @click=\"overlayClicked\"\n         :style=\"overlayStyle\">\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-overlay {\n    width: 750px;\n    position: fixed;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    right: 0;\n  }\n</style>\n\n<script>\n  const animation = weex.requireModule('animation');\n  module.exports = {\n    props: {\n      show: {\n        type: Boolean,\n        default: true\n      },\n      hasAnimation: {\n        type: Boolean,\n        default: true\n      },\n      duration: {\n        type: [Number, String],\n        default: 300\n      },\n      timingFunction: {\n        type: Array,\n        default: () => (['ease-in', 'ease-out'])\n      },\n      opacity: {\n        type: [Number, String],\n        default: 0.6\n      },\n      canAutoClose: {\n        type: Boolean,\n        default: true\n      }\n    },\n    computed: {\n      overlayStyle () {\n        return {\n          opacity: this.hasAnimation ? 0 : 1,\n          backgroundColor: `rgba(0, 0, 0,${this.opacity})`\n        }\n      },\n      shouldShow () {\n        const { show, hasAnimation } = this;\n        hasAnimation && setTimeout(() => {\n          this.appearOverlay(show);\n        }, 50);\n        return show;\n      }\n    },\n    methods: {\n      overlayClicked (e) {\n        this.canAutoClose ? this.appearOverlay(false) : this.$emit('wxcOverlayBodyClicked', {});\n      },\n      appearOverlay (bool, duration = this.duration) {\n        const { hasAnimation, timingFunction, canAutoClose } = this;\n        const needEmit = !bool && canAutoClose;\n        needEmit && (this.$emit('wxcOverlayBodyClicking', {}));\n        const overlayEl = this.$refs['wxc-overlay'];\n        if (hasAnimation && overlayEl) {\n          animation.transition(overlayEl, {\n            styles: {\n              opacity: bool ? 1 : 0\n            },\n            duration,\n            timingFunction: timingFunction[bool ? 0 : 1],\n            delay: 0\n          }, () => {\n            needEmit && (this.$emit('wxcOverlayBodyClicked', {}));\n          });\n        } else {\n          needEmit && (this.$emit('wxcOverlayBodyClicked', {}));\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
module.exports = {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: Array,
      default: function _default() {
        return ['ease-in', 'ease-out'];
      }
    },
    opacity: {
      type: [Number, String],
      default: 0.6
    },
    canAutoClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    overlayStyle: function overlayStyle() {
      return {
        opacity: this.hasAnimation ? 0 : 1,
        backgroundColor: 'rgba(0, 0, 0,' + this.opacity + ')'
      };
    },
    shouldShow: function shouldShow() {
      var _this = this;

      var show = this.show,
          hasAnimation = this.hasAnimation;

      hasAnimation && setTimeout(function () {
        _this.appearOverlay(show);
      }, 50);
      return show;
    }
  },
  methods: {
    overlayClicked: function overlayClicked(e) {
      this.canAutoClose ? this.appearOverlay(false) : this.$emit('wxcOverlayBodyClicked', {});
    },
    appearOverlay: function appearOverlay(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;
      var hasAnimation = this.hasAnimation,
          timingFunction = this.timingFunction,
          canAutoClose = this.canAutoClose;

      var needEmit = !bool && canAutoClose;
      needEmit && this.$emit('wxcOverlayBodyClicking', {});
      var overlayEl = this.$refs['wxc-overlay'];
      if (hasAnimation && overlayEl) {
        animation.transition(overlayEl, {
          styles: {
            opacity: bool ? 1 : 0
          },
          duration: duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0
        }, function () {
          needEmit && _this2.$emit('wxcOverlayBodyClicked', {});
        });
      } else {
        needEmit && this.$emit('wxcOverlayBodyClicked', {});
      }
    }
  }
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show) ? _c('div', {
    ref: "wxc-overlay",
    staticClass: "wxc-overlay",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.overlayStyle)),
    attrs: {
      "hack": _vm.shouldShow
    },
    on: {
      "click": _vm.overlayClicked
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-16b9703a", module.exports)
  }
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Tw93 on 2016/10/29.
 */
module.exports = {
  closeIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAGIElEQVR4Xu1b3VUbRxSe0ex7nAqCKwhCs8/BFdhUEFyBoQLjCgwVBFcQqMDwvCNkVxBRQeBd0s35dGZ1VqP53xEiB+YcHmytdu797v+POHvhh79w/tkrAK8a8AQITCaT/fl8/gdjbJ8xttf5694+ZYxNiegH53wqhLgdDoc/tk3e1kygaZr3nPNjxtghY+xNJiMPjLEbIrqs6/o68x3erxUFYDKZvFksFp+I6KQH0y6CHzjn54PB4GI4HAKYIqcIAFtm3GS0KBC9AVBKfWCMfdV27ZLKo1Zl2PRNVVUPpn3DT8xmM5jKIeccvgKm84tHzPAZp1LKqz6q0AuApmm+cs6h7rYDpq+EEOe5zkw7T7wfIFvBIKLzuq5Pc0HIAgAqP5vNvmtJmXc/gqiqqsB4EVvV951osDeAQOSoqupdzn3JAGip/O1Q+QshxFkOITESBBDz+fyMMfbJfF6D8DFV25IA0Mx/t3j4eyHEh9TLY5i2PaPpgO3/Znz+IISAJkTnD9EAaPQnFslfCyGOtyV1F0iankvG2PvuM6nmEA1A0zQTi81/k1Ii2dnZUUoBhD9NEOq6HsYQFQWAUurcYnc7Z75l0AYCY+xCSumKUCtsggDoOA+n1z3XUkqEpmdzlFLwCaY5vKvr+sZHpBcAh93D4e0/tc2HkNa0wvl1HSOKqqGPVi8ATdOccc4/dy/XL4z2siHCS36uowMc9eoQ0Ze6rhE6rccJgEb0HyPkRdlVSaZS32XxVwiNb11a4ATAIv1HIcReSPW1FFAbMI2+1wZDDLbvI6I3VVUFEx0tONQJq4zRpwVOAJRS/3alH1KljkeGefze/ptz/nE0GiFUJR9L4vUgpfw19CKL8JzfswJg8fxR0gdhSimgv5ah5YDgyjqllMHIZdMCxtiRrXJ0AWCGlOiYPx6Pj4noL1NKKSC4mE95hyU3sPLgAmBN/VM9vwsEIgrG5RLMA/ymadBXQN3SHqsZbABgCSWPUsrknp4DBG+xUor5jj9COb5yhjZBbgAwHo9PiGjpxfXJzvpSQCjNvPZHa6bMOT8djUZI61dnAwDTdmK9v8szx4CwDea1GZiJ3EYeswFA0zQ3nHP08Jcnxm5DYckHwmKx2O/rNF33m36AiG7rukav0asByP4wvFieVAeYqgm29nmKt/eBb3GEUynl2xAA1H0gJu6GNKD93BUd1gjqkTjZ6FBKefmx+YCtAQACfSCUknwXiP8TAMn9vBjNe1YARJhAcRByAFjL5bfsBG1CLAaCxQneSylXDh6X7zIMMti8DrVm7VAEhNwwuNZl3VIitGS+LZNjkqUYezefsZTF4UToCVLhNeYDIbKXJpiN0qhU2FIMRTUhTPRzyuLSmmA2daKKITCilApWUT6VzGG+tCZYHKC1qn2WDZESmtC3IYKhR3cY4u2sGpnXmvYsQ01GeusAYSOXt2mio6Md3xKzmUFsNDDNJ4d5nznE1Ca2jrarqZPSFo/SAt1QbZsOJ31XWLqaYPPipgbYpJ/VFnd0VncyGAEtYDQ0k9Caaw5yvR3t19GYL5zlDhxzsra+38kd5AaHDI7x+JWU8qgv0SW/r5RC1Fob2ce084IAOOwK/30ppVwWM7s+SikUU+amSpS/igJAg7A289NM7xwEB/M/pZRYtgyeaAC0jWHSuxp86rdjGRJT2yI7gUGK9QOaHqj9WpeXMfZTCHEYS080ALhXF0oAwVxWxCbGUcp6WiyjjkwP6/e2XUWEPDAfvcCRBEAHBPQMTE3ADAEbol9i0U8FQW+Mfnas50LyWNeLZh73JwOgQcDGps0c8HHRbe72vsAafpLad4HPAqB9gWN9rv0YPuGKiL6FNrVcmqBLWuwAIry5BrRR3t51Ry8AdHQAcUg/zbXV7p3LX35wzvFzmOXKzMHBwW33gbu7u+U4jogOiahdl/dNpe+J6DgX3Pbu3gC0KjqbzZzb3Km2Hni+6DZ6EQBagkNr7T2BKMp4UQ2wMaZT6PZHU75ffvhwWf7oAn99y+qt+YAYqSJ/WCwWsO092DfnHMMJ02fApqfaT0wHg8FNakiLocV8pqgJ5BCw6++8ArBrCez6/hevAf8BQp52fZ98hnoAAAAASUVORK5CYII="
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [(_vm.show) ? _c('wxc-overlay', _vm._b({
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "show": _vm.show && _vm.hasOverlay
    },
    on: {
      "wxcOverlayBodyClicking": _vm.wxcOverlayBodyClicking,
      "wxcOverlayBodyClicked": _vm.wxcOverlayBodyClicked
    }
  }, 'wxc-overlay', _vm.mergeOverlayCfg, false)) : _vm._e(), _vm._v(" "), (_vm.show) ? _c('div', {
    ref: "wxc-mask",
    staticClass: "wxc-mask",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.maskStyle)),
    attrs: {
      "hack": _vm.shouldShow
    }
  }, [_c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.contentStyle))
  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.showClose) ? _c('div', {
    staticClass: "mask-bottom",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      width: _vm.width + 'px'
    })),
    on: {
      "click": _vm.closeIconClicked
    }
  }, [_c('image', {
    staticClass: "mask-close-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.closeIcon
    }
  })]) : _vm._e()]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3b9aece2", module.exports)
  }
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('wxc-mask', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "width": _vm.width,
      "height": _vm.height,
      "mask-bg-color": "transparent",
      "overlay-opacity": "0.8",
      "show": _vm.show,
      "show-close": _vm.showClose
    },
    on: {
      "wxcMaskSetHidden": _vm.maskOverlayClick
    }
  }, [(_vm.show) ? _c('slider', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: _vm.height + 'px'
    })),
    attrs: {
      "auto-play": "false"
    }
  }, [_vm._l((_vm.imageList), function(v, index) {
    return _c('div', {
      key: index,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        height: _vm.height + 'px'
      }))
    }, [_c('image', {
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        height: _vm.height + 'px',
        width: _vm.width + 'px'
      })),
      attrs: {
        "resize": "cover",
        "src": v.src
      }
    })])
  }), _vm._v(" "), _c('indicator', {
    staticClass: "indicator",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.indicatorStyle))
  })], 2) : _vm._e()], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1f2af058", module.exports)
  }
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(100);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(101)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(103),
  /* template */
  __webpack_require__(105),
  /* scopeId */
  "data-v-3681adcf",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-loading/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3681adcf", Component.options)
  } else {
    hotAPI.reload("data-v-3681adcf", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(102);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4a247770", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3681adcf\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3681adcf\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-loading[data-v-3681adcf] {\n  position: fixed;\n  left: 287px;\n  top: 500px;\n  z-index: 9999;\n}\n.loading-box[data-v-3681adcf] {\n  align-items: center;\n  justify-content: center;\n  border-radius: 20px;\n  width: 175px;\n  height: 175px;\n  background-color: rgba(0, 0, 0, 0.8);\n}\n.trip-loading[data-v-3681adcf] {\n  background-color: rgba(0, 0, 0, .2);\n}\n.loading-trip-image[data-v-3681adcf] {\n  height: 75px;\n  width: 75px;\n}\n.loading-text[data-v-3681adcf] {\n  color: #ffffff;\n  font-size: 24px;\n  line-height: 30px;\n  height: 30px;\n  margin-top: 8px;\n  text-overflow: ellipsis;\n  width: 140px;\n  text-align: center;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-loading/index.vue?2cbd85e7"],"names":[],"mappings":";AAsBA;EACA,gBAAA;EACA,YAAA;EACA,WAAA;EACA,cAAA;CACA;AAEA;EACA,oBAAA;EACA,wBAAA;EACA,oBAAA;EACA,aAAA;EACA,cAAA;EACA,qCAAA;CACA;AAEA;EACA,oCAAA;CACA;AAEA;EACA,aAAA;EACA,YAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,aAAA;EACA,gBAAA;EACA,wBAAA;EACA,aAAA;EACA,mBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/26. -->\n<!--A loading indicator. Custom text supported. -->\n\n<template>\n  <div :hack-show=\"needShow\">\n    <div class=\"wxc-loading\"\n         :style=\"{ top: topPosition +'px'}\"\n         v-if=\"showLoading\">\n      <div :class=\"['loading-box',loading.class]\">\n        <image :src=\"loading.url\"\n               class=\"loading-trip-image\"\n               resize=\"contain\"\n               quality=\"original\"></image>\n        <text v-if=\"showText\"\n              class=\"loading-text\">{{hackText}} </text>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-loading {\n    position: fixed;\n    left: 287px;\n    top: 500px;\n    z-index: 9999;\n  }\n\n  .loading-box {\n    align-items: center;\n    justify-content: center;\n    border-radius: 20px;\n    width: 175px;\n    height: 175px;\n    background-color: rgba(0, 0, 0, 0.8);\n  }\n\n  .trip-loading {\n    background-color: rgba(0, 0, 0, .2);\n  }\n\n  .loading-trip-image {\n    height: 75px;\n    width: 75px;\n  }\n\n  .loading-text {\n    color: #ffffff;\n    font-size: 24px;\n    line-height: 30px;\n    height: 30px;\n    margin-top: 8px;\n    text-overflow: ellipsis;\n    width: 140px;\n    text-align: center;\n  }\n</style>\n\n<script>\n  import { PNG, GIF, BLACK_GIF } from './icon.base64';\n  const Util = require('./util');\n  const appVersion = weex.config.env.appVersion || '0';\n  const needShowPng = Util.compareVersion('8.2.4', appVersion) && Util.isTrip() && Util.isAndroid();\n  module.exports = {\n    props: {\n      show: {\n        type: Boolean,\n        default: false\n      },\n      loadingText: {\n        type: String,\n        default: ''\n      },\n      type: {\n        type: String,\n        default: 'default'\n      },\n      interval: {\n        type: [Number, String],\n        default: 0\n      }\n    },\n    data: () => ({\n      showLoading: false,\n      tid: 0\n    }),\n    computed: {\n      showText () {\n        return this.loadingText || needShowPng;\n      },\n      hackText () {\n        return this.loadingText ? this.loadingText : (needShowPng ? '正在加载中...' : '');\n      },\n      loading () {\n        let loading = {};\n        switch (this.type) {\n          case 'trip':\n            loading = {\n              url: needShowPng ? PNG : GIF,\n              class: 'trip-loading'\n            }\n            break;\n          default:\n            loading = {\n              url: BLACK_GIF,\n              class: 'default-loading'\n            }\n        }\n        return loading;\n      },\n      topPosition () {\n        return (Util.getPageHeight() - 200) / 2;\n      },\n      needShow () {\n        this.setShow();\n        return this.show;\n      }\n    },\n    methods: {\n      setShow () {\n        const { interval, show, showLoading } = this;\n        const stInterval = parseInt(interval);\n        clearTimeout(this.tid);\n        if (show) {\n          if (showLoading) {\n            return;\n          }\n          if (stInterval === 0) {\n            this.showLoading = true;\n          } else {\n            this.tid = setTimeout(() => {\n              this.showLoading = true;\n            }, stInterval);\n          }\n        } else {\n          this.showLoading = false;\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _icon = __webpack_require__(10);

var Util = __webpack_require__(104); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var appVersion = weex.config.env.appVersion || '0';
var needShowPng = Util.compareVersion('8.2.4', appVersion) && Util.isTrip() && Util.isAndroid();
module.exports = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'default'
    },
    interval: {
      type: [Number, String],
      default: 0
    }
  },
  data: function data() {
    return {
      showLoading: false,
      tid: 0
    };
  },
  computed: {
    showText: function showText() {
      return this.loadingText || needShowPng;
    },
    hackText: function hackText() {
      return this.loadingText ? this.loadingText : needShowPng ? '正在加载中...' : '';
    },
    loading: function loading() {
      var loading = {};
      switch (this.type) {
        case 'trip':
          loading = {
            url: needShowPng ? _icon.PNG : _icon.GIF,
            class: 'trip-loading'
          };
          break;
        default:
          loading = {
            url: _icon.BLACK_GIF,
            class: 'default-loading'
          };
      }
      return loading;
    },
    topPosition: function topPosition() {
      return (Util.getPageHeight() - 200) / 2;
    },
    needShow: function needShow() {
      this.setShow();
      return this.show;
    }
  },
  methods: {
    setShow: function setShow() {
      var _this = this;

      var interval = this.interval,
          show = this.show,
          showLoading = this.showLoading;

      var stInterval = parseInt(interval);
      clearTimeout(this.tid);
      if (show) {
        if (showLoading) {
          return;
        }
        if (stInterval === 0) {
          this.showLoading = true;
        } else {
          this.tid = setTimeout(function () {
            _this.showLoading = true;
          }, stInterval);
        }
      } else {
        this.showLoading = false;
      }
    }
  }
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.compareVersion = compareVersion;
exports.isTrip = isTrip;
exports.isAndroid = isAndroid;
exports.isWeb = isWeb;
exports.getPageHeight = getPageHeight;
/**
 * Created by Tw93 on 2017/6/26.
 */

function compareVersion() {
  var currVer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "0.0.0";
  var promoteVer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "0.0.0";

  if (currVer === promoteVer) return true;
  var currVerArr = currVer.split(".");
  var promoteVerArr = promoteVer.split(".");
  var len = Math.max(currVerArr.length, promoteVerArr.length);
  for (var i = 0; i < len; i++) {
    var proVal = ~~promoteVerArr[i];
    var curVal = ~~currVerArr[i];
    if (proVal < curVal) {
      return true;
    } else if (proVal > curVal) {
      return false;
    }
  }
  return false;
}

function isTrip() {
  var appName = weex.config.env.appName;

  return appName === 'LX';
}

function isAndroid() {
  var platform = weex.config.env.platform;

  return platform.toLowerCase() === 'android';
}

function isWeb() {
  var platform = weex.config.env.platform;

  return (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
}

function getPageHeight() {
  var env = weex.config.env;

  var navHeight = isWeb() ? 0 : 130;
  return env.deviceHeight / env.deviceWidth * 750 - navHeight;
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "hack-show": _vm.needShow
    }
  }, [(_vm.showLoading) ? _c('div', {
    staticClass: "wxc-loading",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      top: _vm.topPosition + 'px'
    }))
  }, [_c('div', {
    class: ['loading-box', _vm.loading.class],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('image', {
    staticClass: "loading-trip-image",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.loading.url,
      "resize": "contain",
      "quality": "original"
    }
  }), _vm._v(" "), (_vm.showText) ? _c('text', {
    staticClass: "loading-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.hackText) + " ")]) : _vm._e()])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3681adcf", module.exports)
  }
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(107);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(108),
  /* template */
  __webpack_require__(109),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-part-loading/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-01c9e485", Component.options)
  } else {
    hotAPI.reload("data-v-01c9e485", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _icon = __webpack_require__(10);

module.exports = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 36
    },
    height: {
      type: [Number, String],
      default: 36
    }
  },
  data: function data() {
    return {
      PART: _icon.PART
    };
  },
  computed: {
    loadingStyle: function loadingStyle() {
      var height = this.height,
          width = this.width;

      return {
        height: height + 'px',
        width: width + 'px'
      };
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show) ? _c('image', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.loadingStyle)),
    attrs: {
      "src": _vm.PART,
      "resize": "contain",
      "quality": "original"
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-01c9e485", module.exports)
  }
}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(111)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(113),
  /* template */
  __webpack_require__(115),
  /* scopeId */
  "data-v-991a6e22",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-minibar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-991a6e22", Component.options)
  } else {
    hotAPI.reload("data-v-991a6e22", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(112);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0eec1a6d", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-991a6e22\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-991a6e22\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-minibar[data-v-991a6e22] {\n  width: 750px;\n  height: 90px;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  background-color: #009ff0;\n}\n.left[data-v-991a6e22] {\n  width: 90px;\n}\n.middle-title[data-v-991a6e22] {\n  font-size: 30px;\n  color: #ffffff;\n  height: 36px;\n  line-height: 34px;\n}\n.right[data-v-991a6e22] {\n  width: 80px;\n}\n.left-button[data-v-991a6e22] {\n  width: 21px;\n  height: 36px;\n  margin-left: 40px;\n}\n.right-button[data-v-991a6e22] {\n  width: 32px;\n  height: 32px;\n  margin-right: 16px;\n}\n.right-text[data-v-991a6e22] {\n  width: 80px;\n  margin-right: 20px;\n  font-size: 28px;\n  text-align: left;\n  color: #fff;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-minibar/index.vue?1afed8ce"],"names":[],"mappings":";AAkBA;EACA,aAAA;EACA,aAAA;EACA,oBAAA;EACA,+BAAA;EACA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,YAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,aAAA;EACA,kBAAA;CACA;AAEA;EACA,YAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;CACA;AAEA;EACA,YAAA;EACA,mBAAA;EACA,gBAAA;EACA,iBAAA;EACA,YAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A top navigation bar.-->\n\n<template>\n  <div class=\"wxc-minibar\" :style=\"{ backgroundColor: backgroundColor }\" v-if=\"show\">\n    <div class=\"left\" @click=\"leftButtonClicked\">\n      <image :src=\"leftButton\" class=\"left-button\"></image>\n    </div>\n    <text class=\"middle-title\" :style=\"{ color: textColor }\">{{title}}</text>\n    <div class=\"right\" @click=\"rightButtonClicked\">\n      <text class=\"right-text\" v-if=\"rightText\" :style=\"{ color: textColor }\">{{rightText}}</text>\n      <image :src=\"rightButton\" class=\"right-button\" v-if=\"rightButton\"></image>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-minibar {\n    width: 750px;\n    height: 90px;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    background-color: #009ff0;\n  }\n\n  .left {\n    width: 90px;\n  }\n\n  .middle-title {\n    font-size: 30px;\n    color: #ffffff;\n    height: 36px;\n    line-height: 34px;\n  }\n\n  .right {\n    width: 80px;\n  }\n\n  .left-button {\n    width: 21px;\n    height: 36px;\n    margin-left: 40px;\n  }\n\n  .right-button {\n    width: 32px;\n    height: 32px;\n    margin-right: 16px;\n  }\n\n  .right-text {\n    width: 80px;\n    margin-right: 20px;\n    font-size: 28px;\n    text-align: left;\n    color: #fff;\n  }\n</style>\n\n<script>\n  const icon = require('./icon.base64.js');\n  const Navigator = weex.requireModule('navigator');\n\n  module.exports = {\n    props: {\n      backgroundColor: {\n        type: String,\n        default: '#FFC900'\n      },\n      leftButton: {\n        type: String,\n        default: icon.iconArrow\n      },\n      textColor: {\n        type: String,\n        default: '#3D3D3D'\n      },\n      rightButton: {\n        type: String,\n        default: ''\n      },\n      title: {\n        type: String,\n        default: '阿里旅行'\n      },\n      rightText: {\n        type: String,\n        default: ''\n      },\n      useDefaultReturn: {\n        type: Boolean,\n        default: true\n      },\n      show: {\n        type: Boolean,\n        default: true\n      }\n    },\n    methods: {\n      leftButtonClicked () {\n        const self = this;\n        if (self.useDefaultReturn) {\n          Navigator.pop({}, e => {\n          });\n        }\n        self.$emit('minibarLeftButtonClick', {});\n      },\n      rightButtonClicked () {\n        const self = this;\n        if (self.rightText || self.rightButton) {\n          self.$emit('minibarRightButtonClick', {});\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var icon = __webpack_require__(114);
var Navigator = weex.requireModule('navigator');

module.exports = {
  props: {
    backgroundColor: {
      type: String,
      default: '#FFC900'
    },
    leftButton: {
      type: String,
      default: icon.iconArrow
    },
    textColor: {
      type: String,
      default: '#3D3D3D'
    },
    rightButton: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '阿里旅行'
    },
    rightText: {
      type: String,
      default: ''
    },
    useDefaultReturn: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    leftButtonClicked: function leftButtonClicked() {
      var self = this;
      if (self.useDefaultReturn) {
        Navigator.pop({}, function (e) {});
      }
      self.$emit('minibarLeftButtonClick', {});
    },
    rightButtonClicked: function rightButtonClicked() {
      var self = this;
      if (self.rightText || self.rightButton) {
        self.$emit('minibarRightButtonClick', {});
      }
    }
  }
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Tw93 on 2016/10/29.
 */
module.exports = {
  iconArrow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAkCAMAAABR74GsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUxpcTw8PD09PQAAADw8PDw8PDMzMz09PTw8PDw8PD09PWFW+gwAAAAKdFJOUwCAoAJ4/gWX8prBgCgwAAAAMElEQVQoz2NgQAcsHJwYYgyMXFysbFgEudixCTIxjwqSIYhDdFSYKsLsRKZqSA4AAKEHBO9H54HuAAAAAElFTkSuQmCC"
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: "wxc-minibar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      backgroundColor: _vm.backgroundColor
    }))
  }, [_c('div', {
    staticClass: "left",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.leftButtonClicked
    }
  }, [_c('image', {
    staticClass: "left-button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.leftButton
    }
  })]), _vm._v(" "), _c('text', {
    staticClass: "middle-title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.textColor
    }))
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
    staticClass: "right",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.rightButtonClicked
    }
  }, [(_vm.rightText) ? _c('text', {
    staticClass: "right-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.textColor
    }))
  }, [_vm._v(_vm._s(_vm.rightText))]) : _vm._e(), _vm._v(" "), (_vm.rightButton) ? _c('image', {
    staticClass: "right-button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.rightButton
    }
  }) : _vm._e()])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-991a6e22", module.exports)
  }
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(117);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(118)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(120),
  /* template */
  __webpack_require__(129),
  /* scopeId */
  "data-v-a7a9618a",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-lottery-rain/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a7a9618a", Component.options)
  } else {
    hotAPI.reload("data-v-a7a9618a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(119);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("a30710c0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-a7a9618a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-a7a9618a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-lottery-rain[data-v-a7a9618a] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(133, 11, 11, .8);\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-lottery-rain/index.vue?67dfa239"],"names":[],"mappings":";AAeA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,wCAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div class=\"wxc-lottery-rain\" :style=\"wrapStyle\">\n    <rain-item key=\"i\"\n               :src=\"src\"\n               :rain-id=\"i\"\n               :ref=\"`rain-item-${i}`\"\n               @wxcLotteryRainCaught=\"wxcLotteryRainCaught\"\n               v-for=\"(src,i) in picList\"></rain-item>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-lottery-rain {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(133, 11, 11, .8);\n  }\n</style>\n\n<script>\n  import RainItem from './rain-item.vue';\n\n  export default {\n    components: { RainItem },\n    props: {\n      picList: Array,\n      config: Object,\n      wrapStyle: Object\n    },\n    methods: {\n      wxcLotteryRainCaught (e) {\n        this.$emit('wxcLotteryRainCaught', { rainId: e.rainId });\n      },\n      destroy () {\n        const { picList } = this;\n        const length = picList.length;\n        for (let i = 0; i < length; i++) {\n          this.$refs[`rain-item-${i}`][0].destroy();\n        }\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rainItem = __webpack_require__(121);

var _rainItem2 = _interopRequireDefault(_rainItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { RainItem: _rainItem2.default },
  props: {
    picList: Array,
    config: Object,
    wrapStyle: Object
  },
  methods: {
    wxcLotteryRainCaught: function wxcLotteryRainCaught(e) {
      this.$emit('wxcLotteryRainCaught', { rainId: e.rainId });
    },
    destroy: function destroy() {
      var picList = this.picList;

      var length = picList.length;
      for (var i = 0; i < length; i++) {
        this.$refs['rain-item-' + i][0].destroy();
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(122)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(124),
  /* template */
  __webpack_require__(128),
  /* scopeId */
  "data-v-7513c695",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-lottery-rain/rain-item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] rain-item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7513c695", Component.options)
  } else {
    hotAPI.reload("data-v-7513c695", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(123);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("73465083", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7513c695\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./rain-item.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7513c695\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./rain-item.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.rain-item[data-v-7513c695] {\n  position: absolute;\n  opacity: 0;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-lottery-rain/rain-item.vue?ac3c1f24"],"names":[],"mappings":";AAcA;EACA,mBAAA;EACA,WAAA;CACA","file":"rain-item.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/09/06. -->\n<!--A weex lottery rain game,this is an item-->\n\n<template>\n  <image :src=\"src\"\n         :style=\"pos\"\n         @click=\"caught\"\n         class=\"rain-item\"\n         v-if=\"showItem && src\"\n         :ref=\"`rain-item-${rainId}`\"></image>\n</template>\n\n<style scoped>\n  .rain-item {\n    position: absolute;\n    opacity: 0;\n  }\n</style>\n\n<script>\n  const Ani = require('./libs/animate.js');\n  const Region = require('./libs/region.js');\n  const CFG = require('./libs/config');\n\n  export default {\n    props: {\n      src: String,\n      rainId: [String, Number],\n      config: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    computed: {\n      // 合并用户配置和默认\n      cfg () {\n        return {\n          ...CFG.DEFAULT,\n          ...this.config\n        }\n      }\n    },\n    data: () => ({\n      showItem: false,\n      hiding: false,\n      pos: {},\n      showTimer: null,\n      hideTimer: null,\n      intervalTimer: null\n    }),\n    created () {\n      const { width, height } = this.cfg;\n      this.pos = Region.get(width, height);\n    },\n    mounted () {\n      this.start();\n    },\n    methods: {\n      start () {\n        const { cfg } = this;\n        const random = Math.round(Math.random() * cfg.randomTime);\n        const showTime = cfg.showTime + random;\n        const intervalTime = Math.max(cfg.intervalTime, cfg.showAniTime + showTime + cfg.hideAniTime) + random;\n\n        this.onShow = () => {\n          this.hideTimer = setTimeout(() => {\n            this.hide();\n          }, showTime);\n        };\n\n        this.onHide = () => {\n          Region.remove(this.pos);\n          this.pos = {};\n          this.showItem = false;\n          this.hiding = false;\n          const { width, height } = this.cfg;\n          this.pos = Region.get(width, height);\n        };\n\n        this.showTimer = setTimeout(() => {\n          this.show();\n        }, random);\n\n        this.intervalTimer = setInterval(() => {\n          this.show();\n        }, intervalTime);\n      },\n\n      hide () {\n        const { cfg, rainId } = this;\n        this.hiding = true;\n        clearTimeout(this.showTimer);\n        clearTimeout(this.hideTimer);\n        Ani.hidePig(this.$refs[`rain-item-${rainId}`], cfg.hideAniTime, this.onHide);\n      },\n\n      show () {\n        const { cfg, rainId } = this;\n        this.showItem = true;\n        Ani.showPig(this.$refs[`rain-item-${rainId}`], cfg.showAniTime, this.onShow);\n      },\n\n      caught () {\n        const { rainId, hiding } = this;\n        if (hiding) return;\n        clearTimeout(this.showTimer);\n        clearTimeout(this.hideTimer);\n        Ani.shakePig(this.$refs[`rain-item-${rainId}`], () => {\n          this.hide();\n        });\n        this.$emit('wxcLotteryRainCaught', { rainId });\n      },\n\n      destroy () {\n        Region.remove(this.pos);\n        clearTimeout(this.showTimer);\n        clearTimeout(this.hideTimer);\n        clearInterval(this.intervalTimer);\n        this.showItem = false;\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Ani = __webpack_require__(125);
var Region = __webpack_require__(126);
var CFG = __webpack_require__(127);

exports.default = {
  props: {
    src: String,
    rainId: [String, Number],
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    // 合并用户配置和默认
    cfg: function cfg() {
      return _extends({}, CFG.DEFAULT, this.config);
    }
  },
  data: function data() {
    return {
      showItem: false,
      hiding: false,
      pos: {},
      showTimer: null,
      hideTimer: null,
      intervalTimer: null
    };
  },
  created: function created() {
    var _cfg = this.cfg,
        width = _cfg.width,
        height = _cfg.height;

    this.pos = Region.get(width, height);
  },
  mounted: function mounted() {
    this.start();
  },

  methods: {
    start: function start() {
      var _this = this;

      var cfg = this.cfg;

      var random = Math.round(Math.random() * cfg.randomTime);
      var showTime = cfg.showTime + random;
      var intervalTime = Math.max(cfg.intervalTime, cfg.showAniTime + showTime + cfg.hideAniTime) + random;

      this.onShow = function () {
        _this.hideTimer = setTimeout(function () {
          _this.hide();
        }, showTime);
      };

      this.onHide = function () {
        Region.remove(_this.pos);
        _this.pos = {};
        _this.showItem = false;
        _this.hiding = false;
        var _cfg2 = _this.cfg,
            width = _cfg2.width,
            height = _cfg2.height;

        _this.pos = Region.get(width, height);
      };

      this.showTimer = setTimeout(function () {
        _this.show();
      }, random);

      this.intervalTimer = setInterval(function () {
        _this.show();
      }, intervalTime);
    },
    hide: function hide() {
      var cfg = this.cfg,
          rainId = this.rainId;

      this.hiding = true;
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      Ani.hidePig(this.$refs['rain-item-' + rainId], cfg.hideAniTime, this.onHide);
    },
    show: function show() {
      var cfg = this.cfg,
          rainId = this.rainId;

      this.showItem = true;
      Ani.showPig(this.$refs['rain-item-' + rainId], cfg.showAniTime, this.onShow);
    },
    caught: function caught() {
      var _this2 = this;

      var rainId = this.rainId,
          hiding = this.hiding;

      if (hiding) return;
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      Ani.shakePig(this.$refs['rain-item-' + rainId], function () {
        _this2.hide();
      });
      this.$emit('wxcLotteryRainCaught', { rainId: rainId });
    },
    destroy: function destroy() {
      Region.remove(this.pos);
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      clearInterval(this.intervalTimer);
      this.showItem = false;
    }
  }
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showPig = showPig;
exports.hidePig = hidePig;
exports.shakePig = shakePig;
/**
 * Created by Tw93 on 2017/09/06.
 * 红包雨动画类
 */

var animation = weex.requireModule('animation');
var Util = __webpack_require__(12);
var isIos = Util.isIOS();

function showPig(ref, duration, callback) {
  ref && animation.transition(ref, {
    styles: {
      transform: 'translate(0, -140px)',
      opacity: 1
    },
    duration: duration,
    timingFunction: 'ease-in'
  }, function () {
    callback && callback();
  });
}

function hidePig(ref, duration, callback) {
  ref && animation.transition(ref, {
    styles: {
      transform: 'translate(0, 0)',
      opacity: 0
    },
    duration: duration,
    timingFunction: 'ease-out'
  }, function () {
    callback && callback();
  });
}

function shakePig(ref, callback) {
  var duration = isIos ? 20 : 10;
  ref && animation.transition(ref, {
    styles: {
      transform: 'rotate(12deg) translate(0, -140px)'
    },
    duration: duration,
    timingFunction: 'ease-in'
  }, function () {
    animation.transition(ref, {
      styles: {
        transform: 'rotate(0) translate(0, -140px)'
      },
      duration: duration,
      timingFunction: 'ease-out'
    }, function () {
      animation.transition(ref, {
        styles: {
          transform: 'rotate(-12deg) translate(0, -140px)'
        },
        duration: duration,
        timingFunction: 'ease-in'
      }, function () {
        animation.transition(ref, {
          styles: {
            transform: 'rotate(0) translate(0, -140px)'
          },
          duration: duration,
          timingFunction: 'ease-out'
        }, function () {
          callback && callback();
        });
      });
    });
  });
}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Tw93 on 2017/09/06.
 * 红包雨区域检测类
 */

var Util = __webpack_require__(12);

var Region = {
  regions: [],
  isCross: function isCross(region) {
    var regions = this.regions;


    region.right = region.left + region.width;
    region.bottom = region.top + region.height;

    for (var i = 0; i < regions.length; i++) {
      var curRegion = regions[i];
      // 两区域相交
      curRegion.right = curRegion.left + curRegion.width;
      curRegion.bottom = curRegion.top + curRegion.height;
      if (!(region.left > curRegion.right || region.right < curRegion.left || region.bottom < curRegion.top || region.top > curRegion.bottom)) {
        return true;
      }
    }
    return false;
  },
  get: function get(width, height) {
    if (!width || !height) {
      return;
    }
    var i = 1000;
    var viewWidth = 750;
    var viewHeight = Util.getPageHeight();
    var wrapWidth = viewWidth - width;
    var wrapHeight = viewHeight - height - 140;
    wrapHeight = wrapHeight < 0 ? 0 : wrapHeight;
    wrapWidth = wrapWidth < 0 ? 0 : wrapWidth;

    var region = {
      left: -9999,
      top: -9999,
      width: width,
      height: height
    };
    while (i--) {
      region.left = Math.round(Math.random() * wrapWidth);
      region.top = Math.round(Math.random() * wrapHeight + height);
      if (!this.isCross(region)) {
        this.add(region);
        return region;
      }
    }
  },
  buildRandom: function buildRandom() {
    var random = new Date().getTime() + '_' + parseInt(Math.random() * 1000000);
    return random;
  },
  add: function add(region) {
    var regions = this.regions;

    region.id = this.buildRandom();
    regions.push(region);
  },
  remove: function remove(region) {
    var regions = this.regions;

    if (!region) return;
    for (var i = 0; i < regions.length; i++) {
      if (region.id === regions[i].id) {
        regions.splice(i, 1);
      }
    }
  }
};
module.exports = Region;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT = exports.DEFAULT = {
  intervalTime: 400,
  hideAniTime: 300,
  showAniTime: 300,
  showTime: 400,
  randomTime: 300,
  width: 241,
  height: 206
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.showItem && _vm.src) ? _c('image', {
    ref: ("rain-item-" + _vm.rainId),
    staticClass: "rain-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.pos)),
    attrs: {
      "src": _vm.src
    },
    on: {
      "click": _vm.caught
    }
  }) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7513c695", module.exports)
  }
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-lottery-rain",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.wrapStyle))
  }, _vm._l((_vm.picList), function(src, i) {
    return _c('rain-item', {
      key: "i",
      ref: ("rain-item-" + i),
      refInFor: true,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "src": src,
        "rain-id": i
      },
      on: {
        "wxcLotteryRainCaught": _vm.wxcLotteryRainCaught
      }
    })
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a7a9618a", module.exports)
  }
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(131);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(132)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(134),
  /* template */
  __webpack_require__(137),
  /* scopeId */
  "data-v-4edbf20e",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-noticebar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4edbf20e", Component.options)
  } else {
    hotAPI.reload("data-v-4edbf20e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(133);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("92490984", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-4edbf20e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-4edbf20e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-noticebar[data-v-4edbf20e] {\n  width: 750px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  padding-left: 24px;\n  background-color: #FFF7D6;\n  border-bottom-width: 1px;\n  border-top-width: 1px;\n  border-color: #FFEEAE;\n  border-style: solid;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.noticebar-content[data-v-4edbf20e] {\n  color: #EE9900;\n  font-size: 26px;\n  line-height: 36px;\n  width: 592px;\n  text-overflow: ellipsis;\n}\n.more-click-content[data-v-4edbf20e] {\n  width: 64px;\n  align-items: center;\n  justify-content: center;\n}\n.mode-icon[data-v-4edbf20e],\n.type-icon[data-v-4edbf20e] {\n  width: 32px;\n  height: 32px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-noticebar/index.vue?e8ac36c2"],"names":[],"mappings":";AA0BA;EACA,aAAA;EACA,kBAAA;EACA,qBAAA;EACA,mBAAA;EACA,0BAAA;EACA,yBAAA;EACA,sBAAA;EACA,sBAAA;EACA,oBAAA;EACA,oBAAA;EACA,+BAAA;EACA,oBAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,aAAA;EACA,wBAAA;CACA;AAEA;EACA,YAAA;EACA,oBAAA;EACA,wBAAA;CACA;AAEA;;EAEA,YAAA;EACA,aAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/28. -->\n<!--A notice bar.-->\n\n<template>\n  <div>\n    <div class=\"wxc-noticebar\"\n         v-if=\"show\"\n         @click=\"noticeBarClicked\">\n      <image class=\"type-icon\"\n             v-if=\"typeIcon\"\n             :src=\"typeIcon\"></image>\n      <text class=\"noticebar-content\"\n            :style=\"{ width: contentWidth + 'px',lines:lines}\">{{notice}}</text>\n      <div class=\"more-click-content\"\n           @click=\"noticeIconClicked\"\n           v-if=\"modeIcon\"\n           :mode=\"mode\">\n        <image class=\"mode-icon\"\n               :src=\"modeIcon\"></image>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-noticebar {\n    width: 750px;\n    padding-top: 10px;\n    padding-bottom: 10px;\n    padding-left: 24px;\n    background-color: #FFF7D6;\n    border-bottom-width: 1px;\n    border-top-width: 1px;\n    border-color: #FFEEAE;\n    border-style: solid;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n  }\n\n  .noticebar-content {\n    color: #EE9900;\n    font-size: 26px;\n    line-height: 36px;\n    width: 592px;\n    text-overflow: ellipsis;\n  }\n\n  .more-click-content {\n    width: 64px;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .mode-icon,\n  .type-icon {\n    width: 32px;\n    height: 32px;\n  }\n</style>\n\n<script>\n  const icon = require('./icon.base64.js');\n  const Utils = require('./utils');\n\n  module.exports = {\n    props: {\n      notice: {\n        type: String,\n        default: ''\n      },\n      noticeUrl: {\n        type: String,\n        default: ''\n      },\n      mode: {\n        type: String,\n        default: ''\n      },\n      lines: {\n        type: [Number, String],\n        default: 1\n      },\n      type: {\n        type: String,\n        default: ''\n      },\n      spm: {\n        type: String,\n        default: ''\n      }\n    },\n    computed: {\n      contentWidth () {\n        return this.mode ? 605 : 683;\n      },\n      modeIcon () {\n        let modeIcon;\n        switch (this.mode) {\n          case 'link':\n            modeIcon = icon.linkIcon;\n            break;\n          case 'closable':\n            modeIcon = icon.closeIcon;\n            break;\n          default:\n            modeIcon = '';\n        }\n        return modeIcon;\n      },\n      typeIcon () {\n        let typeIcon;\n        switch (this.type) {\n          case 'success':\n            typeIcon = icon.successIcon;\n            break;\n          case 'error':\n            typeIcon = icon.errorIcon;\n            break;\n          case 'info':\n            typeIcon = icon.infoIcon;\n            break;\n          case 'question':\n            typeIcon = icon.questionIcon;\n            break;\n          case 'warn':\n            typeIcon = icon.warnIcon;\n            break;\n          case 'time':\n            typeIcon = icon.timeIcon;\n            break;\n          case 'redbag':\n            typeIcon = icon.redbag;\n            break;\n          default:\n            typeIcon = '';\n        }\n        return typeIcon;\n      }\n    },\n    data: () => ({\n      show: true\n    }),\n    methods: {\n      noticeBarClicked () {\n        const { mode, noticeUrl, spm } = this;\n        if (mode === 'link' && noticeUrl) {\n          const { ttid } = weex.config.env;\n          Utils.goToH5Page(noticeUrl, spm, ttid, true);\n          this.$emit('wxcNoticebarLinkClicked', { url: noticeUrl });\n        }\n      },\n      noticeIconClicked () {\n        const { mode } = this;\n        if (mode === 'closable') {\n          this.show = false;\n          this.$emit('wxcNoticebarCloseClicked', {});\n        } else {\n          this.noticeBarClicked();\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var icon = __webpack_require__(135);
var Utils = __webpack_require__(136);

module.exports = {
  props: {
    notice: {
      type: String,
      default: ''
    },
    noticeUrl: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: ''
    },
    lines: {
      type: [Number, String],
      default: 1
    },
    type: {
      type: String,
      default: ''
    },
    spm: {
      type: String,
      default: ''
    }
  },
  computed: {
    contentWidth: function contentWidth() {
      return this.mode ? 605 : 683;
    },
    modeIcon: function modeIcon() {
      var modeIcon = void 0;
      switch (this.mode) {
        case 'link':
          modeIcon = icon.linkIcon;
          break;
        case 'closable':
          modeIcon = icon.closeIcon;
          break;
        default:
          modeIcon = '';
      }
      return modeIcon;
    },
    typeIcon: function typeIcon() {
      var typeIcon = void 0;
      switch (this.type) {
        case 'success':
          typeIcon = icon.successIcon;
          break;
        case 'error':
          typeIcon = icon.errorIcon;
          break;
        case 'info':
          typeIcon = icon.infoIcon;
          break;
        case 'question':
          typeIcon = icon.questionIcon;
          break;
        case 'warn':
          typeIcon = icon.warnIcon;
          break;
        case 'time':
          typeIcon = icon.timeIcon;
          break;
        case 'redbag':
          typeIcon = icon.redbag;
          break;
        default:
          typeIcon = '';
      }
      return typeIcon;
    }
  },
  data: function data() {
    return {
      show: true
    };
  },
  methods: {
    noticeBarClicked: function noticeBarClicked() {
      var mode = this.mode,
          noticeUrl = this.noticeUrl,
          spm = this.spm;

      if (mode === 'link' && noticeUrl) {
        var ttid = weex.config.env.ttid;

        Utils.goToH5Page(noticeUrl, spm, ttid, true);
        this.$emit('wxcNoticebarLinkClicked', { url: noticeUrl });
      }
    },
    noticeIconClicked: function noticeIconClicked() {
      var mode = this.mode;

      if (mode === 'closable') {
        this.show = false;
        this.$emit('wxcNoticebarCloseClicked', {});
      } else {
        this.noticeBarClicked();
      }
    }
  }
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Tw93 on 2016/10/29.
 */
module.exports = {
  closeIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAiklEQVR42u3Uuw2DQBBF0VeCS6AEujWQ4Ab5dADa1JIDfCyLYF5CxJ4bTWq1226b0v/srTmPyz+sY45lyKz4MubV3vr6xxahePumzSMc9wjHPcJxj3DcIxz3CMc9AnGPQNwD8Fj5hYNj5Xj8YjoOEY5DhOMQ4ThEOA4Rjv8tYnume8cxYk+tVvuwE8W1BhjijgxwAAAAAElFTkSuQmCC",

  linkIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAaUlEQVR42u2XsQ2AMAwEbwRGYjRGoCOu4k0YgUkSRgClywLECvprXN5VLxkxDffBShTF8Go8JZFjAhJ7C4iNMFwRilCEIuaKMDZGcmeWmjj7gLFy4+rkLrnkkkv+5cR62Ma3G/uYiD/yAlUn8FXOOtT+AAAAAElFTkSuQmCC",

  infoIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAByUlEQVR42sVX7U3DMBC9ERihI7ABbAAb0A1gA9iA/iPmT9mg3YBu0GzQLNC6G4R7yC8KOQlybmIsWYmS3Pe754t4VnyX6xjk+RRkc6rkU68RO91v8A7fyJQrruUKitXIQY20Yza+hQxkLzNeyWOKkorrYyUrVX4f3+SWBnCve4l3+l3Tcybq80VW1CmtNLyFkbHycFDldpBlSbzGme4zlEmRReNB9kw3U1xsMe2ljbNuT0z7jMYJ2IVJPdHuARvKhayJY7E7fgR5DPKCF3r9yFDWemTYHbDZr/3BGT3lamxvCUhWwwd1MbCDrMgRTD9YTAqtxJgtgN/VxEs4BCF2RicsybB0wNTfD0I/DmC7AyDaopQDqD0d6JSQHIo7APT/ZwkKY8CC0LRhCQfAuGxDw0wFHIBcJBEZZsp2wF//xhxGmSdbmzNzAAfD4/jsZUQAGEDyzIpm5jBZ4Fk98QLPQPevQSKa5MQeTsw0a27/mojrqZxg5I5B1zgRTbr8hBNHGLdOsBzsDtePSSV3RDtHPejMjaDp//OpslcYUM64gVJwx/d9kAdl0/XgH7JBBi8GEDqEZRm5G8jIHK0E/k5cvuNQSj7AOy+bfgEoV4MBqNi7tQAAAABJRU5ErkJggg==",

  warnIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABXklEQVR42u1W7WnDMBR8I3SEjNARPEJH8AjdIBmh/2rnT7pBs0G9QbJBvUArb9Dq4B0UmwMb+ZkG8kAgyUjv7n2cbHe7Wftq7fDd2CdGam2/vfPWfv4O7NkWll5tR6eZ+VNe11zjm0VbDvnZGb9xD3PuRbOvnO0AtqOoDB6FKo59ax3zLeuisY8o9sx1n0724Om45vUFc+whCqyNCPa9h7jmHotvDBKtGdJ2YIy1AkCga7YlQ5tYYBLAtFATzpazb+zFL+yw1gCmxYqzq4kO5jMAiHMFbacFRgOgOPn392LRQS6XAsCZInFCxatq1gC0OBWKznIAjMJIP+a1HYRkdEhGCWMOGdwpyMi3vjNhAemUolNuWpx06+DNn6MR/CXDfHFLl4oHU+Wv33ORqJH9EvlMR3v0Cu8FYCHrIgoCXdj/pAQAZhZkuJt+ZHiih0wz2sNBDIHOB/iAL7vbf7FfHwI9GrUaFUcAAAAASUVORK5CYII=",

  successIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB00lEQVR42r2X4VHDMAyFNQIjMAIbwAYwQjcgG8AG8I+EP7BB2YBsUDZoFmidDYq/u8jnq6CJncS+812ayHqypPdqS8pw73LjGnk6NrI91vLt557JM+/4ho0sOdyHXOEYIA9ymjKxZQ1r54HX8ugdush5d6jl1Tt/cG9y5+c1IMPz5tDIJzaRvcMma9ekNHLUAjJ1PbasYS0lyQHfDcA9u5UCw4LX8qPpKzboZgUnmKLgrpFK077mzrV5Teq12zGQFUdgR5xhT59n7XZZeSg7wIxrvy+xey2BilWQVxWZhZm0vZCFTjUipB+FWwp8rJxgYUPjh5ogOMuAj9MYrMHuKwRAbdYFt30AdmjAkc7dAoDjueAMdCAEgPDw49JCHGOjQeSD2wBGS6BA50HkgdsSmCacGkQmuAaw0SY0NEwIIgPc0jAWol1Cx7fMRHCjvGAHZSolxZTaKK+WgfNAqTMH6T9Pa6/NWGD3PZj/HUhcam0TuO8ubhJa/CU4hf6kLNdzj2b5Um2DcDBjZs2dAU/g+knZkXox0W5XxcNn7km5j+98nrIvrpZ7LyK3OKVMPPOOb2d3yB7ZXeJyWqlYTZwd2rI0m/R6Xg1saakrk2feAZp6F/wF56nCjOMHayAAAAAASUVORK5CYII=",

  errorIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB4UlEQVR42r1X7U3DMBC9ERghI7ABbEBHYAPYADaAfyT9AxskG5AN0g2aBVpnA/CT/CLrFQkfIbFk1WrO9+7j3dk2zwh7uw6NPZ0ba8+1fWLGdUi/Lb5Bxv5zhHe7guIIcowgXyUTstiDvcvAa3uAh5ny8VTba1S+C292G2cFkLS+PzX2AZlMPkDmT14jpJmiHiCl+2Eg9mAvU+IFHxLwBGW2yVDw2g4M32YDbCY4CbTFYN4eGfY1wUnei9CT7STbWmOujtzJWD7PZLutPFgdiHie++MW3jMFbFbzH2wyhSQdhCNaQW1BFMbkcDWHHx2uwIADZGmEgpemEVhMQ56TXUmfUCMI7ilftO0k35m2TK8RTnBNe28sP370GuEF57E+G0AlDgWSc+WE34DeU4Kac+GEOwVuEmrOlRNeErrKUMF/4gR6xW96cHFhGeb5GAr6QKfgagRkChwJrDzpTNu1YmDKYcTwbXPnAA+UXBPJuBY4dPPOYRwaBZ7VK4S+gm7x/pJkvpr2Ny5UgOuwWQruPazUiADWLsx5EPAyq9khWR0eQyBLtrPjCbjrpjzlb76Yw5dQ213Y2w2UglxY4z98kzfkBMItziEqhM2qcI4w3uG163mOqPSYiStjWnf45n0LfgON7uEBnQHWwwAAAABJRU5ErkJggg==",

  questionIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACDklEQVR42r2X700CQRDFpwRLsAQ7kA60A+lAO9AO5BuHX7AD6IDrADqQBmDtAPeX8HKXTdjZ5Q43mYTczd83b+YWqzlhbvehsddDY8tjY5u+HBb2yTt0bMwTlnYXFvYeg/wcF3YqlG20eRkefG7TJPBvrPSb51EmiUx5h470sY2JPF9VNTD3ArcEKbUnaLTZyx5fVcGBUBXjbBCCHSJbfJcHb2w3BqHClz0IDXxnlWPQtYKTzJhEJolsO4BLsKtyh5ybqBvOJF2Fxp48JNQOtTXNMPBSZPNadEFW6GTI+abpsP6J4/Mhtjst2vVQmlIVaOGYZ0oi50OtwD59qOrdFlGlB3F+REXIzpAHe696OfcgZiHlfClR0BP8sHPmGJ2QXI9xqB7nfJEgeiRs9F3wewggznRMPDSFlIr2E6jffCCwLky07Qg4cPFolMWTGyXgfzXVptIEBrUA0iWLqaWQf0tAtqCoxaJTSkJ3DAeOpj+GWkT08BoEHMb7i6i/iknGbnyYkJSsagMPN3bjQ2B9jNIZFiyTGmc1SRNUpL3IzCiBhGpIWHE1C6o+eyXTBbIQgXXNRZcJyCritDSJ8sq7i26ZQZdEgBMDGR+qL7ooqh2ajppE0MUGW8FejaaImf7V4k9oROkRYZEg/OZWzDt9lCpWtI8Ge0LLqlD22NjYB37g+NyelkD0VisZxGq36R/zARfV9nDdlgAAAABJRU5ErkJggg==",

  timeIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABvElEQVR42sWXv0rEQBDGB0XBTuwEQSGbp7DR3lb0CWzs7Q7yBB4cXHLPIPoOVlYWHmhlYWF1brRWRHR/mpGTNZdcwpKBgfyZbz5mM/vtROrY9ZEs2Szey0fxIB+ZK5uZibt+w7nmGe+IIVba2kN/a9UlTuwoti7xZx0nFgzYRqRPw+iAajShq2bsvOee7dj+5vpdIss41zzjHTEaD5YctQnP9mXRgdKpBJeTLNquiycWzBQ+JWclqQu++AZl8XuemmNpaGDJ8ZPLnM8kLyol8MUOo11paeQgl1ZeQhodaqWzSB9PN1ZoHhd3UpdcK+ebe92rjVSxvBCvFd/veZ5l14b70+1UoI3kw9oTY9pwcP2Kg+5TOjIUMbl1n8MpqE2xT28ICEWM6T6HU5C64qYXmhgOsHAKOssN6hOaGA6wcIp2M9IXmhgO7W7hhOEG3Q1NDAdYODsjbr7Umflw2Pv/3H3D26qlbt5c5U6u1zL51OaaezsliSw4zTWzfDIwUdV2mhaQsQQzX0B8yQxivmT6h0QY8w+J+seib62PRR3uvEGgtfmDQNejjz/sMZiFHva6H2+7H+i7/4UJ/9P2Bb6l6yB4ISjfAAAAAElFTkSuQmCC",

  redbag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACJUlEQVR42u1WPWgUURB+MVEJIWIQMUUKtUuj2Fh5FoZ9u5uDwxQbCPt2PU85sYhgb3FNQtJ6hcUZQrqQLhwhRARFMcEqpEg4GysFkQQOTvwJ0fF7e8fTg929PXLLNjfwsbPvzex8M2+Yt6wrXSGiHnJ4noT2lmx+QLZGsULw33h+RrwSuRPnGJSi3EgEQltjUGoJEvjBpJIkWBtsV0kYUyT4xxCblyT0SdhUOk0AMMYYBA17CYE++QafNk8zCPSZGCrANyifP1knkR7F+9d/+3wTxAa8PdsckQQ7TEBluUIrVq8XyDWvYa2K4NuUvX3WW7ufuQCbD+31QNa4iHNLI6MX0Zz0RTk76iT063TXPO/pD9ND+MZOxET2UbFH5BpX2P+CxacRP1Bs8stlBlGJ9xGzrlIufZn5iWwiGHwP6IEKCC4oIHvlJ3QX+88bWJIZhpCfY2ECgz2f4D/RXGdYRAEhI5CAw+8FO2bHh+Ws9nV0jRtt3C1PQipQ8ndEJ8sLqcX51RQEX/f8CtYp6N8U1BEGgR+Ry00VGE42OntenVuw4yzd4TcVhH5VZSz0lILDb8G23CKRP7BZRswHLOqlQYVCXxs9kIpjED0DJhQQhEFA7ETTuqNZIPyqMwTCq/Ja9YDffvwE+LvG8BpIiIB2SI4xDiKF4xL4AlBCqKr5nwx4mdFjqx/l3Erif1DdhvJHQ45PLO7KIRFz1r9I8DfeZdaVrkD+Amv10kibNVl3AAAAAElFTkSuQmCC"
};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Tw93 on 2017/6/26.
 */
var UrlParser = __webpack_require__(3);
var Utils = {
  UrlParser: UrlParser,
  appendProtocol: function appendProtocol(url) {
    if (/^\/\//.test(url)) {
      var bundleUrl = weex.config.bundleUrl;

      return 'http' + (/^https:/.test(bundleUrl) ? 's' : '') + ':' + url;
    }
    return url;
  },
  encodeURLParams: function encodeURLParams(url) {
    var parsedUrl = new UrlParser(url, true);
    return parsedUrl.toString();
  },
  goToH5Page: function goToH5Page(jumpUrl) {
    var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var Navigator = weex.requireModule('navigator');
    var jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
    var url = appendProtocol(jumpUrlObj.toString());
    Navigator.push({
      url: Utils.encodeURLParams(url),
      animated: animated
    }, callback);
  }
};
module.exports = Utils;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show) ? _c('div', {
    staticClass: "wxc-noticebar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.noticeBarClicked
    }
  }, [(_vm.typeIcon) ? _c('image', {
    staticClass: "type-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.typeIcon
    }
  }) : _vm._e(), _vm._v(" "), _c('text', {
    staticClass: "noticebar-content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      width: _vm.contentWidth + 'px',
      lines: _vm.lines
    }))
  }, [_vm._v(_vm._s(_vm.notice))]), _vm._v(" "), (_vm.modeIcon) ? _c('div', {
    staticClass: "more-click-content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "mode": _vm.mode
    },
    on: {
      "click": _vm.noticeIconClicked
    }
  }, [_c('image', {
    staticClass: "mode-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.modeIcon
    }
  })]) : _vm._e()]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4edbf20e", module.exports)
  }
}

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(139);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(140)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(142),
  /* template */
  __webpack_require__(144),
  /* scopeId */
  "data-v-3472bf4f",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-page-calendar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3472bf4f", Component.options)
  } else {
    hotAPI.reload("data-v-3472bf4f", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(141);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2e830400", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3472bf4f\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3472bf4f\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-page-calendar[data-v-3472bf4f] {\n  position: fixed;\n  top: 0;\n  right: -750px;\n  width: 750px;\n  color: #333333;\n  background-color: #fff;\n}\n.flex-item[data-v-3472bf4f] {\n  flex: 1;\n  text-align: center;\n}\n.calendar-weekday[data-v-3472bf4f] {\n  height: 60px;\n  background-color: #ffffff;\n  border-bottom-width: 1px;\n  border-top-width: 1px;\n  border-color: #e2e2e2;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n}\n.weekday-text[data-v-3472bf4f] {\n  color: #000000;\n  flex: 1;\n  text-align: center;\n}\n.calendar-list[data-v-3472bf4f] {\n  flex-direction: column;\n}\n.calendar-month[data-v-3472bf4f] {\n  height: 60px;\n  justify-content: center;\n  align-items: center;\n  background-color: #f2f3f4;\n}\n.month-text[data-v-3472bf4f] {\n  font-size: 32px;\n}\n.calendar-row[data-v-3472bf4f] {\n  height: 140px;\n  flex-direction: row;\n  border-bottom-width: 1px;\n  border-color: #f2f3f4;\n  align-items: center;\n  justify-content: space-between;\n  position: relative;\n}\n.row-item[data-v-3472bf4f] {\n  flex: 1;\n  height: 140px;\n  background: #ffffff;\n  border-width: 0;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n.calendar-note[data-v-3472bf4f] {\n  height: 36px;\n  line-height: 36px;\n  font-size: 24px;\n  color: #000000;\n  text-align: center;\n}\n.calendar-item[data-v-3472bf4f] {\n  justify-content: center;\n  align-items: center;\n  height: 120px;\n}\n.calendar-day[data-v-3472bf4f] {\n  height: 48px;\n  line-height: 48px;\n  font-size: 36px;\n  color: #000000;\n  text-align: center;\n}\n.calendar-ext[data-v-3472bf4f] {\n  height: 36px;\n  line-height: 36px;\n  color: #999999;\n  text-align: center;\n  font-size: 24px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.calendar-holiday[data-v-3472bf4f] {\n  color: #FF5000;\n}\n.calendar-rest[data-v-3472bf4f] {\n  color: #FF5000;\n}\n.item-row-selected[data-v-3472bf4f] {\n  color: #fff;\n  background-color: #FFC900;\n  text-align: center;\n}\n.item-text-selected[data-v-3472bf4f] {\n  color: #3d3d3d;\n  text-align: center;\n}\n.calendar-disabled[data-v-3472bf4f] {\n  color: #CCCCCC;\n}\n.cell-disabled[data-v-3472bf4f] {\n  background-color: #FBFBFB;\n}\n.calendar-day-include[data-v-3472bf4f] {\n  background-color: #FFF7D6;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-page-calendar/index.vue?39f8b02e"],"names":[],"mappings":";AAgNA;EACA,gBAAA;EACA,OAAA;EACA,cAAA;EACA,aAAA;EACA,eAAA;EACA,uBAAA;CACA;AAEA;EACA,QAAA;EACA,mBAAA;CACA;AAEA;EACA,aAAA;EACA,0BAAA;EACA,yBAAA;EACA,sBAAA;EACA,sBAAA;EACA,oBAAA;EACA,8BAAA;EACA,oBAAA;CACA;AAEA;EACA,eAAA;EACA,QAAA;EACA,mBAAA;CACA;AAEA;EACA,uBAAA;CACA;AAEA;EACA,aAAA;EACA,wBAAA;EACA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,gBAAA;CACA;AAEA;EACA,cAAA;EACA,oBAAA;EACA,yBAAA;EACA,sBAAA;EACA,oBAAA;EACA,+BAAA;EACA,mBAAA;CACA;AAEA;EACA,QAAA;EACA,cAAA;EACA,oBAAA;EACA,gBAAA;EACA,kBAAA;EACA,qBAAA;CACA;AAEA;EACA,aAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,mBAAA;CACA;AAEA;EACA,wBAAA;EACA,oBAAA;EACA,cAAA;CACA;AAEA;EACA,aAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,mBAAA;CACA;AAEA;EACA,aAAA;EACA,kBAAA;EACA,eAAA;EACA,mBAAA;EACA,gBAAA;EACA,iBAAA;EACA,wBAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,YAAA;EACA,0BAAA;EACA,mBAAA;CACA;AAEA;EACA,eAAA;EACA,mBAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,0BAAA;CACA;AAEA;EACA,0BAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div class=\"wxc-page-calendar\"\n       ref=\"pageCalendar\"\n       :style=\"{ height: pageHeight +'px'}\">\n    <wxc-minibar :show=\"showHeader\"\n                 v-bind=\"minibarCfg\"\n                 :use-default-return=\"useDefaultReturn\"\n                 v-on:minibarLeftButtonClick=\"minibarLeftButtonClick\"></wxc-minibar>\n\n    <div class=\"calendar-weekday\"\n         v-if=\"isShow\">\n      <text class=\"flex-item weekday-text\"\n            :key=\"k\"\n            v-for=\"(week,k) in ['日','一','二','三','四','五','六']\">{{week}}</text>\n    </div>\n    <list class=\"calendar-list\"\n          :style=\"{ height: calendarHeight +'px'}\"\n          v-if=\"isShow\">\n      <cell v-for=\"(month,index) in monthsArray\"\n            :key=\"index\">\n        <div class=\"calendar-month\">\n          <text class=\"month-text\">{{month.title}}</text>\n        </div>\n        <div class=\"calendar-row\"\n             v-for=\"(row,rowIndex) in month.rowsData\"\n             :key=\"rowIndex\">\n          <div v-for=\"(cell,index) in row.cells\"\n               :key=\"index\"\n               :ref=\"cell.ref\"\n               :class=\"['row-item', cell.cellClass]\"\n               @click=\"onClickDate(cell)\">\n            <div v-if=\"cell.isEmpty\"></div>\n            <div v-if=\"!cell.isEmpty\"\n                 class=\"calendar-item\">\n              <text :class=\"['calendar-note', cell.cls]\">{{cell.note}}</text>\n              <text :class=\"['calendar-day', cell.cls]\">{{cell.text}}</text>\n              <text :class=\"['calendar-ext', cell.cls]\">{{cell.ext}}</text>\n            </div>\n          </div>\n        </div>\n      </cell>\n    </list>\n  </div>\n</template>\n\n<script>\n  import * as Util from './util';\n  const animation = weex.requireModule('animation');\n  const dom = weex.requireModule('dom');\n\n  import WxcMinibar from '../wxc-minibar'\n  module.exports = {\n    components: { WxcMinibar },\n    props: {\n      selectedDate: Array,\n      dateRange: {\n        type: Array,\n        required: true,\n        default: () => ([])\n      },\n      minibarCfg: {\n        type: Object,\n        default: () => ({\n          'title': '选择日期',\n          'background-color': '#FFC900',\n          'text-color': '#3D3D3D'\n        })\n      },\n      selectedNote: {\n        type: Array,\n        default: () => (['开始', '到达', '往返'])\n      },\n      isRange: {\n        type: Boolean,\n        default: false\n      },\n      needDestroy: {\n        type: Boolean,\n        default: false\n      },\n      descList: {\n        type: Array,\n        default: () => ([])\n      }\n    },\n    data: () => ({\n      isShow: false,\n      reSelect: true,\n      useDefaultReturn: false,\n      showHeader: Util.isWeb(),\n      today: Util.getToDay(),\n      calendarHeight: 1040,\n      pageHeight: 1334,\n      departDate: '',\n      arriveDate: ''\n    }),\n    computed: {\n      monthsArray () {\n        const { dateRange: range, today, departDate, arriveDate, selectedNote, descList } = this;\n        const param = { range, today, departDate, arriveDate, selectedNote, descList }\n        return Util.generateDateCell(param);\n      }\n    },\n    created () {\n      const self = this;\n      const env = weex.config.env;\n      self.pageHeight = env.deviceHeight / env.deviceWidth * 750;\n      self.calendarHeight = self.pageHeight - (this.showHeader ? 100 : 120) - 60;\n      self.detectShow();\n    },\n    methods: {\n      minibarLeftButtonClick () {\n        setTimeout(() => {\n          this.hide();\n          this.$emit('wxcPageCalendarBackClicked', {});\n        }, 100);\n      },\n      onClickDate (datConfig) {\n        const self = this;\n        if (datConfig.disabled || datConfig.isEmpty) return;\n\n        if (self.reSelect) {\n          self.departDate = '';\n          self.arriveDate = '';\n          self.reSelect = false;\n        }\n\n        if (self.isRange) {\n          if (self.departDate && Date.parse(self.departDate) <= Date.parse(datConfig.date)) {\n            self.arriveDate = datConfig.date;\n          } else {\n            self.departDate = datConfig.date;\n          }\n          if (self.departDate && self.arriveDate) {\n            self.dispatchDateChange([self.departDate, self.arriveDate]);\n          }\n        } else {\n          self.departDate = datConfig.date;\n          self.dispatchDateChange([self.departDate]);\n        }\n      },\n      scrollToDate () {\n        if (this.departDate) {\n          const el = this.$refs.departDate[0];\n          dom.getComponentRect && dom.getComponentRect(el, (e) => {\n            if (e && e.result) {\n              const bottom = e.size.bottom;\n              const { env } = weex.config;\n              // 误差\n              const height = env.deviceHeight / env.deviceWidth * 750 - 50;\n              if (bottom > height || bottom === 0) {\n                dom.scrollToElement(el, { offset: -146, animated: false });\n              }\n            }\n          })\n        }\n      },\n      dispatchDateChange (dateArr) {\n        setTimeout(() => {\n          this.hide();\n        }, 600);\n        this.$emit('wxcPageCalendarDateSelected', {\n          date: dateArr\n        });\n      },\n      detectShow () {\n        !this.needDestroy && (this.isShow = true);\n        if (this.isRange && this.selectedDate.length >= 2) {\n          this.departDate = this.selectedDate[0];\n          this.arriveDate = this.selectedDate[1];\n        } else if (this.selectedDate.length >= 1) {\n          this.departDate = this.selectedDate[0];\n          this.arriveDate = '';\n        }\n      },\n      _animate (width = 0) {\n        animation.transition(this.$refs.pageCalendar, {\n          styles: {\n            transform: `translateX(${-width}px)`\n          },\n          timingFunction: 'ease-out',\n          duration: 300\n        }, () => {\n        });\n      },\n      show () {\n        this.needDestroy && (this.isShow = true);\n        this.reSelect = true;\n        this.detectShow();\n        this._animate(750);\n        // 防止没有渲染完成\n        setTimeout(() => {\n          this.scrollToDate();\n        }, 1);\n      },\n      hide () {\n        this.needDestroy && (this.isShow = false);\n        this.reSelect = false;\n        this._animate(0);\n        this.$emit('wxcPageCalendarHide', {});\n      }\n    }\n  };\n</script>\n<style scoped>\n  .wxc-page-calendar {\n    position: fixed;\n    top: 0;\n    right: -750px;\n    width: 750px;\n    color: #333333;\n    background-color: #fff;\n  }\n\n  .flex-item {\n    flex: 1;\n    text-align: center;\n  }\n\n  .calendar-weekday {\n    height: 60px;\n    background-color: #ffffff;\n    border-bottom-width: 1px;\n    border-top-width: 1px;\n    border-color: #e2e2e2;\n    flex-direction: row;\n    justify-content: space-around;\n    align-items: center;\n  }\n\n  .weekday-text {\n    color: #000000;\n    flex: 1;\n    text-align: center;\n  }\n\n  .calendar-list {\n    flex-direction: column;\n  }\n\n  .calendar-month {\n    height: 60px;\n    justify-content: center;\n    align-items: center;\n    background-color: #f2f3f4;\n  }\n\n  .month-text {\n    font-size: 32px;\n  }\n\n  .calendar-row {\n    height: 140px;\n    flex-direction: row;\n    border-bottom-width: 1px;\n    border-color: #f2f3f4;\n    align-items: center;\n    justify-content: space-between;\n    position: relative;\n  }\n\n  .row-item {\n    flex: 1;\n    height: 140px;\n    background: #ffffff;\n    border-width: 0;\n    padding-top: 10px;\n    padding-bottom: 10px;\n  }\n\n  .calendar-note {\n    height: 36px;\n    line-height: 36px;\n    font-size: 24px;\n    color: #000000;\n    text-align: center;\n  }\n\n  .calendar-item {\n    justify-content: center;\n    align-items: center;\n    height: 120px;\n  }\n\n  .calendar-day {\n    height: 48px;\n    line-height: 48px;\n    font-size: 36px;\n    color: #000000;\n    text-align: center;\n  }\n\n  .calendar-ext {\n    height: 36px;\n    line-height: 36px;\n    color: #999999;\n    text-align: center;\n    font-size: 24px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .calendar-holiday {\n    color: #FF5000;\n  }\n\n  .calendar-rest {\n    color: #FF5000;\n  }\n\n  .item-row-selected {\n    color: #fff;\n    background-color: #FFC900;\n    text-align: center;\n  }\n\n  .item-text-selected {\n    color: #3d3d3d;\n    text-align: center;\n  }\n\n  .calendar-disabled {\n    color: #CCCCCC;\n  }\n\n  .cell-disabled {\n    background-color: #FBFBFB;\n  }\n\n  .calendar-day-include {\n    background-color: #FFF7D6;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(143);

var Util = _interopRequireWildcard(_util);

var _wxcMinibar = __webpack_require__(11);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var animation = weex.requireModule('animation'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');

module.exports = {
  components: { WxcMinibar: _wxcMinibar2.default },
  props: {
    selectedDate: Array,
    dateRange: {
      type: Array,
      required: true,
      default: function _default() {
        return [];
      }
    },
    minibarCfg: {
      type: Object,
      default: function _default() {
        return {
          'title': '选择日期',
          'background-color': '#FFC900',
          'text-color': '#3D3D3D'
        };
      }
    },
    selectedNote: {
      type: Array,
      default: function _default() {
        return ['开始', '到达', '往返'];
      }
    },
    isRange: {
      type: Boolean,
      default: false
    },
    needDestroy: {
      type: Boolean,
      default: false
    },
    descList: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      isShow: false,
      reSelect: true,
      useDefaultReturn: false,
      showHeader: Util.isWeb(),
      today: Util.getToDay(),
      calendarHeight: 1040,
      pageHeight: 1334,
      departDate: '',
      arriveDate: ''
    };
  },
  computed: {
    monthsArray: function monthsArray() {
      var range = this.dateRange,
          today = this.today,
          departDate = this.departDate,
          arriveDate = this.arriveDate,
          selectedNote = this.selectedNote,
          descList = this.descList;

      var param = { range: range, today: today, departDate: departDate, arriveDate: arriveDate, selectedNote: selectedNote, descList: descList };
      return Util.generateDateCell(param);
    }
  },
  created: function created() {
    var self = this;
    var env = weex.config.env;
    self.pageHeight = env.deviceHeight / env.deviceWidth * 750;
    self.calendarHeight = self.pageHeight - (this.showHeader ? 100 : 120) - 60;
    self.detectShow();
  },

  methods: {
    minibarLeftButtonClick: function minibarLeftButtonClick() {
      var _this = this;

      setTimeout(function () {
        _this.hide();
        _this.$emit('wxcPageCalendarBackClicked', {});
      }, 100);
    },
    onClickDate: function onClickDate(datConfig) {
      var self = this;
      if (datConfig.disabled || datConfig.isEmpty) return;

      if (self.reSelect) {
        self.departDate = '';
        self.arriveDate = '';
        self.reSelect = false;
      }

      if (self.isRange) {
        if (self.departDate && Date.parse(self.departDate) <= Date.parse(datConfig.date)) {
          self.arriveDate = datConfig.date;
        } else {
          self.departDate = datConfig.date;
        }
        if (self.departDate && self.arriveDate) {
          self.dispatchDateChange([self.departDate, self.arriveDate]);
        }
      } else {
        self.departDate = datConfig.date;
        self.dispatchDateChange([self.departDate]);
      }
    },
    scrollToDate: function scrollToDate() {
      if (this.departDate) {
        var el = this.$refs.departDate[0];
        dom.getComponentRect && dom.getComponentRect(el, function (e) {
          if (e && e.result) {
            var bottom = e.size.bottom;
            var env = weex.config.env;
            // 误差

            var height = env.deviceHeight / env.deviceWidth * 750 - 50;
            if (bottom > height || bottom === 0) {
              dom.scrollToElement(el, { offset: -146, animated: false });
            }
          }
        });
      }
    },
    dispatchDateChange: function dispatchDateChange(dateArr) {
      var _this2 = this;

      setTimeout(function () {
        _this2.hide();
      }, 600);
      this.$emit('wxcPageCalendarDateSelected', {
        date: dateArr
      });
    },
    detectShow: function detectShow() {
      !this.needDestroy && (this.isShow = true);
      if (this.isRange && this.selectedDate.length >= 2) {
        this.departDate = this.selectedDate[0];
        this.arriveDate = this.selectedDate[1];
      } else if (this.selectedDate.length >= 1) {
        this.departDate = this.selectedDate[0];
        this.arriveDate = '';
      }
    },
    _animate: function _animate() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      animation.transition(this.$refs.pageCalendar, {
        styles: {
          transform: 'translateX(' + -width + 'px)'
        },
        timingFunction: 'ease-out',
        duration: 300
      }, function () {});
    },
    show: function show() {
      var _this3 = this;

      this.needDestroy && (this.isShow = true);
      this.reSelect = true;
      this.detectShow();
      this._animate(750);
      // 防止没有渲染完成
      setTimeout(function () {
        _this3.scrollToDate();
      }, 1);
    },
    hide: function hide() {
      this.needDestroy && (this.isShow = false);
      this.reSelect = false;
      this._animate(0);
      this.$emit('wxcPageCalendarHide', {});
    }
  }
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports._getTraditionalHoliday = _getTraditionalHoliday;
exports._isDate = _isDate;
exports._checkHash = _checkHash;
exports.getTime = getTime;
exports._isInRange = _isInRange;
exports._isInSelectRange = _isInSelectRange;
exports._fixNum = _fixNum;
exports._isWeekend = _isWeekend;
exports._isToday = _isToday;
exports._getMonthDays = _getMonthDays;
exports._getPadding = _getPadding;
exports._unique = _unique;
exports.getToDay = getToDay;
exports.getWeekRows = getWeekRows;
exports.generateDateCell = generateDateCell;
exports.isWeb = isWeb;
//国际节日
var GLOBAL_HOLIDAY = exports.GLOBAL_HOLIDAY = {
  '01-01': '元旦',
  '02-14': '情人',
  '05-01': '劳动',
  '06-01': '儿童',
  '10-01': '国庆',
  '12-25': '圣诞'
};

//传统节日
var TRADITIONAL_HOLIDAY = {
  '除夕': ['2015-02-18', '2016-02-07', '2017-01-27', '2018-02-15', '2019-02-04', '2020-01-24'],
  '春节': ['2015-02-19', '2016-02-08', '2017-01-28', '2018-02-16', '2019-02-05', '2020-01-25'],
  '元宵': ['2015-03-05', '2016-02-22', '2017-02-11', '2018-03-02', '2019-02-19', '2020-02-08'],
  '清明': ['2015-04-05', '2016-04-04', '2017-04-04', '2018-04-05', '2019-04-05', '2020-04-04'],
  '端午': ['2015-06-20', '2016-06-09', '2017-05-30', '2018-06-18', '2019-06-07', '2020-06-25'],
  '中秋': ['2015-09-27', '2016-09-15', '2017-10-04', '2018-09-24', '2019-09-13', '2020-10-01'],
  '重阳': ['2015-10-21', '2016-10-09', '2017-10-28', '2018-10-17', '2019-10-07', '2020-10-25']
};

// 放假日
var REST_DAYS = ['2017-10-01', '2017-10-02', '2017-10-03', '2017-10-04', '2017-10-05', '2017-10-06', '2017-10-07', '2017-10-08'];

// 工作日
var WORK_DAYS = ['2017-09-30'];

function _getTraditionalHoliday() {
  var HOLIDAY_TEMP = {};

  var keys = Object.keys(TRADITIONAL_HOLIDAY);
  keys.forEach(function (k, index) {
    var arr = TRADITIONAL_HOLIDAY[k];
    arr.forEach(function (i) {
      HOLIDAY_TEMP[i] = k;
    });
  });

  return HOLIDAY_TEMP;
}

function _isDate(obj) {
  var type = obj == null ? String(obj) : {}.toString.call(obj) || 'object';
  return type == '[object date]';
}

/**
 * 检测Hash
 *
 * @method _checkHash
 * @private
 */
function _checkHash(url, hash) {
  return url && url.match(/#/) && url.replace(/^.*#/, '') === hash;
}
/**
 * 获取当前日期的毫秒数
 * @method getTime
 * @param {String} date
 * @return {Number}
 */
function getTime(date) {
  if (_isDate(date)) {
    return new Date(date).getTime();
  } else {
    try {
      return new Date(date.replace(/-/g, '/')).getTime();
    } catch (e) {
      return 0;
    }
  }
}

function _isInRange(range, date) {
  var start = getTime(range[0]),
      end = getTime(range[1]),
      date = getTime(date);
  return start <= date && end >= date;
}
function _isInSelectRange(range, date) {
  var start = getTime(range[0]),
      end = getTime(range[1]),
      date = getTime(date);
  return start < date && end > date;
}

function _fixNum(num) {
  return (num < 10 ? '0' : '') + num;
}
/**
 * 是否是周末
 * @method isWeekend
 * @param {String} date
 * @return {Boolean}
 */
function _isWeekend(date) {
  var day = new Date(date.replace(/-/g, '/')).getDay();
  return day === 0 || day === 6;
}

/**
 * 是否是今天
 * @method isToday
 * @param {String} date
 * @return {Boolean}
 */
function _isToday(_today, date) {
  return getTime(_today) === getTime(date);
}

/**
 * 检查是否是闰年
 * @method _checkLeapYear
 * @param {Number} y 年份
 * @param {Date} t today
 * @protected
 */
function _getMonthDays(y, t) {
  var MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var y = y || t.getFullYear(),
      isLeapYear = false;

  if (y % 100) {
    isLeapYear = !(y % 4);
  } else {
    isLeapYear = !(y % 400);
  }

  if (isLeapYear) {
    MONTH_DAYS[1] = 29;
  } else {
    MONTH_DAYS[1] = 28;
  }
  return MONTH_DAYS;
}
/**
 * 当月1号前面有多少空格
 * @method _getPadding
 * @protected
 */
function _getPadding(year, month) {
  var date = new Date(year + '/' + month + '/1'),
      day = date.getDay();
  return day;
}

function _unique(array) {
  return Array.prototype.filter.call(array, function (item, index) {
    return array.indexOf(item) == index;
  });
}

function getToDay() {
  return new Date().getFullYear() + '-' + _fixNum(new Date().getMonth() + 1) + '-' + _fixNum(new Date().getDate());
}

function getWeekRows(y, m, today, dateRange, departDate, arriveDate, selectedNote, descList) {
  var monthDays = _getMonthDays(y, today);
  var padding = _getPadding(y, m, 7);
  var num = monthDays[m - 1] + padding;
  var rows = Math.ceil(num / 7);
  var remain = num % 7;
  var rowsData = [];

  for (var i = 1; i <= rows; i++) {
    var row = {
      index: i,
      cells: []
    };

    for (var j = 1; j <= 7; j++) {
      var cell = {};
      // 前后空格
      if (i === 1 && j <= padding || remain && i === rows && j > remain) {
        cell.isEmpty = true;
      } else {
        (function () {
          var d = (i - 1) * 7 + j - padding;
          var date = y + '-' + _fixNum(m) + '-' + _fixNum(d);
          var cls = [];
          var ref = '';
          var cellClass = [];
          var isInRange = _isInRange(dateRange, date);
          var disabled = false;
          var global = _fixNum(m) + '-' + _fixNum(d);
          var note = '';
          var ext = '';

          if (descList && descList.length > 0) {
            var nowDesc = descList.filter(function (item) {
              return item.date == date;
            });
            if (nowDesc && nowDesc.length > 0) {
              ext = nowDesc[0].value;
              if (nowDesc[0].emphasize) {
                cls.push('calendar-holiday');
              }
            }
          }

          // 国际节日
          if (GLOBAL_HOLIDAY[global]) {
            note = GLOBAL_HOLIDAY[global];
            cls.push('calendar-holiday');
          }

          var tHolidy = _getTraditionalHoliday()[date];

          // 传统节日
          if (tHolidy) {
            note = tHolidy;
            cls.push('calendar-holiday');
          }
          // 放假日
          if (REST_DAYS.indexOf(date) > -1) {
            cls.push('calendar-holiday');
          }

          // 工作日
          if (WORK_DAYS.indexOf(date) > -1) {
            cls.push('calendar-work');
          }

          // 周末
          if (_isWeekend(date)) {
            cls.push('calendar-holiday');
          }

          // 今天
          if (_isToday(today, date)) {
            cls.push('calendar-today');
            note = '今天';
          }

          // 不在日期范围内
          if (!isInRange) {
            disabled = true;
          }

          if (disabled) {
            cls = [];
            cls.push('calendar-disabled');
            cellClass.push('cell-disabled');
          }

          if (!ext && disabled && isInRange) {
            ext = '不可选';
          }

          if (departDate === date || arriveDate === date) {
            note = departDate === date ? selectedNote[0] : selectedNote[1];
            ref = departDate === date ? 'departDate' : 'arriveDate';
            if (departDate === arriveDate && selectedNote.length >= 3) {
              note = selectedNote[2];
            }
            cls.push('item-text-selected');
            cellClass.push('item-row-selected');
          }

          if (departDate && arriveDate && _isInSelectRange([departDate, arriveDate], date)) {
            cellClass.push('calendar-day-include');
          }

          cell = {
            isEmpty: false,
            ref: ref,
            cls: _unique(cls).join(' '),
            cellClass: _unique(cellClass).join(' '),
            note: note,
            date: date,
            ext: ext,
            disabled: disabled,
            year: y,
            month: m,
            day: d,
            text: d
          };
        })();
      }
      row.cells.push(cell);
    }

    rowsData.push(row);
  }

  return rowsData;
}

function generateDateCell(_ref) {
  var range = _ref.range,
      today = _ref.today,
      departDate = _ref.departDate,
      arriveDate = _ref.arriveDate,
      selectedNote = _ref.selectedNote,
      descList = _ref.descList;

  var start = new Date(range[0].replace(/-/g, '/'));
  var end = new Date(range[1].replace(/-/g, '/'));
  var startYear = start.getFullYear();
  var startMonth = start.getMonth() + 1;
  var startDate = start.getDate();
  var endYear = end.getFullYear();
  var endMonth = end.getMonth() + 1;
  var endDate = end.getDate();
  var i = 0;
  var l = (endYear - startYear) * 12 + endMonth - startMonth + 1;
  var y = startYear;
  var n = startMonth;
  var months = [];

  for (; i < l; i++) {
    if (n > 12) {
      n = 1;
      y++;
    }
    months.push({
      title: y + '-' + _fixNum(n),
      year: y,
      month: n,
      startDate: i === 0 ? startDate : false,
      endDate: i === l - 1 ? endDate : false,
      rowsData: getWeekRows(y, n, today, range, departDate, arriveDate, selectedNote, descList)
    });
    n++;
  }
  return months;
}

function isWeb() {
  var platform = weex.config.env.platform;

  return (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
}

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "pageCalendar",
    staticClass: "wxc-page-calendar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: _vm.pageHeight + 'px'
    }))
  }, [_c('wxc-minibar', _vm._b({
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "show": _vm.showHeader,
      "use-default-return": _vm.useDefaultReturn
    },
    on: {
      "minibarLeftButtonClick": _vm.minibarLeftButtonClick
    }
  }, 'wxc-minibar', _vm.minibarCfg, false)), _vm._v(" "), (_vm.isShow) ? _c('div', {
    staticClass: "calendar-weekday",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, _vm._l((['日', '一', '二', '三', '四', '五', '六']), function(week, k) {
    return _c('text', {
      key: k,
      staticClass: "flex-item weekday-text",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_vm._v(_vm._s(week))])
  })) : _vm._e(), _vm._v(" "), (_vm.isShow) ? _c('list', {
    staticClass: "calendar-list",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: _vm.calendarHeight + 'px'
    }))
  }, _vm._l((_vm.monthsArray), function(month, index) {
    return _c('cell', {
      key: index,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_c('div', {
      staticClass: "calendar-month",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_c('text', {
      staticClass: "month-text",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_vm._v(_vm._s(month.title))])]), _vm._v(" "), _vm._l((month.rowsData), function(row, rowIndex) {
      return _c('div', {
        key: rowIndex,
        staticClass: "calendar-row",
        staticStyle: _vm.$processStyle(undefined),
        style: (_vm.$processStyle(undefined))
      }, _vm._l((row.cells), function(cell, index) {
        return _c('div', {
          key: index,
          ref: cell.ref,
          refInFor: true,
          class: ['row-item', cell.cellClass],
          staticStyle: _vm.$processStyle(undefined),
          style: (_vm.$processStyle(undefined)),
          on: {
            "click": function($event) {
              _vm.onClickDate(cell)
            }
          }
        }, [(cell.isEmpty) ? _c('div') : _vm._e(), _vm._v(" "), (!cell.isEmpty) ? _c('div', {
          staticClass: "calendar-item",
          staticStyle: _vm.$processStyle(undefined),
          style: (_vm.$processStyle(undefined))
        }, [_c('text', {
          class: ['calendar-note', cell.cls],
          staticStyle: _vm.$processStyle(undefined),
          style: (_vm.$processStyle(undefined))
        }, [_vm._v(_vm._s(cell.note))]), _vm._v(" "), _c('text', {
          class: ['calendar-day', cell.cls],
          staticStyle: _vm.$processStyle(undefined),
          style: (_vm.$processStyle(undefined))
        }, [_vm._v(_vm._s(cell.text))]), _vm._v(" "), _c('text', {
          class: ['calendar-ext', cell.cls],
          staticStyle: _vm.$processStyle(undefined),
          style: (_vm.$processStyle(undefined))
        }, [_vm._v(_vm._s(cell.ext))])]) : _vm._e()])
      }))
    })], 2)
  })) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3472bf4f", module.exports)
  }
}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(146);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(147)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(149),
  /* template */
  __webpack_require__(150),
  /* scopeId */
  "data-v-ca872182",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-popup/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ca872182", Component.options)
  } else {
    hotAPI.reload("data-v-ca872182", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(148);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("38aa59e4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-ca872182\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-ca872182\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-popup[data-v-ca872182] {\n  position: fixed;\n  width: 750px;\n}\n.top[data-v-ca872182] {\n  left: 0;\n  right: 0;\n}\n.bottom[data-v-ca872182] {\n  left: 0;\n  right: 0;\n}\n.left[data-v-ca872182] {\n  bottom: 0;\n  top: 0;\n}\n.right[data-v-ca872182] {\n  bottom: 0;\n  top: 0;\n}\n\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-popup/index.vue?2e392817"],"names":[],"mappings":";AA0BA;EACA,gBAAA;EACA,aAAA;CACA;AAEA;EACA,QAAA;EACA,SAAA;CACA;AAEA;EACA,QAAA;EACA,SAAA;CACA;AAEA;EACA,UAAA;EACA,OAAA;CACA;AAEA;EACA,UAAA;EACA,OAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A popup box with customized contents.-->\n\n<template>\n  <div>\n    <div @touchend=\"handleTouchEnd\">\n      <wxc-overlay :show=\"haveOverlay && isOverShow\"\n                   v-if=\"show\"\n                   ref=\"overlay\"\n                   v-bind=\"overlayCfg\"\n                   v-on:wxcOverlayBodyClicking=\"wxcOverlayBodyClicking\"></wxc-overlay>\n    </div>\n    <div ref=\"wxc-popup\"\n         v-if=\"show\"\n         :height=\"_height\"\n         :hack=\"isNeedShow\"\n         @click=\"()=>{}\"\n         :class=\"['wxc-popup', pos]\"\n         :style=\"padStyle\">\n      <slot></slot>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-popup {\n    position: fixed;\n    width: 750px;\n  }\n\n  .top {\n    left: 0;\n    right: 0;\n  }\n\n  .bottom {\n    left: 0;\n    right: 0;\n  }\n\n  .left {\n    bottom: 0;\n    top: 0;\n  }\n\n  .right {\n    bottom: 0;\n    top: 0;\n  }\n\n</style>\n\n<script>\n  const animation = weex.requireModule('animation');\n  const { platform } = weex.config.env;\n  const isWeb = typeof (window) === 'object' && platform.toLowerCase() === 'web';\n  import WxcOverlay from '../wxc-overlay';\n  module.exports = {\n    components: { WxcOverlay },\n    props: {\n      show: {\n        type: Boolean,\n        default: false\n      },\n      pos: {\n        type: String,\n        default: 'bottom'\n      },\n      popupColor: {\n        type: String,\n        default: '#FFFFFF'\n      },\n      overlayCfg: {\n        type: Object,\n        default: () => ({\n          hasAnimation: true,\n          timingFunction: ['ease-in', 'ease-out'],\n          duration: 300,\n          opacity: 0.6\n        })\n      },\n      height: {\n        type: [Number, String],\n        default: 840\n      },\n      standOut: {\n        type: [Number, String],\n        default: 0\n      },\n      width: {\n        type: [Number, String],\n        default: 750\n      },\n      animation: {\n        type: Object,\n        default: () => ({\n          timingFunction: 'ease-in'\n        })\n      }\n    },\n    data: () => ({\n      haveOverlay: true,\n      isOverShow: true\n    }),\n    computed: {\n      isNeedShow () {\n        setTimeout(() => {\n          this.appearPopup(this.show);\n        }, 50)\n        return this.show;\n      },\n      _height () {\n        this.appearPopup(this.show, 150);\n        return this.height;\n      },\n      transformValue () {\n        return this.getTransform(this.pos, this.width, this.height, true);\n      },\n      padStyle () {\n        const { pos, width, height, popupColor } = this;\n        let style = {\n          width: `${width}px`,\n          backgroundColor: popupColor\n        };\n        pos === 'top' && (style = {\n          ...style,\n          top: `${-height}px`,\n          height: `${height}px`\n        });\n        pos === 'bottom' && (style = {\n          ...style,\n          bottom: `${-height}px`,\n          height: `${height}px`\n        });\n        pos === 'left' && (style = {\n          ...style,\n          left: `${-width}px`\n        });\n        pos === 'right' && (style = {\n          ...style,\n          right: `${-width}px`\n        });\n        return style;\n      }\n    },\n    methods: {\n      handleTouchEnd (e) {\n        // 在支付宝上面有点击穿透问题\n        const { platform } = weex.config.env;\n        platform === 'Web' && e.preventDefault && e.preventDefault();\n      },\n      hide () {\n        this.appearPopup(false);\n        this.$refs.overlay.appearOverlay(false);\n      },\n      wxcOverlayBodyClicking () {\n        this.isShow && this.appearPopup(false);\n      },\n      appearPopup (bool, duration = 300) {\n        this.isShow = bool;\n        const popupEl = this.$refs['wxc-popup'];\n        if (!popupEl) {\n          return;\n        }\n        animation.transition(popupEl, {\n          styles: {\n            transform: this.getTransform(this.pos, this.width, this.height, !bool)\n          },\n          duration,\n          delay: 0,\n          ...this.animation\n        }, () => {\n          if (!bool) {\n            this.$emit('wxcPopupOverlayClicked', { pos: this.pos });\n          }\n        });\n      },\n      getTransform (pos, width, height, bool) {\n        let _size = pos === 'top' || pos === 'bottom' ? height : width;\n        let _transform;\n        if (isWeb) {\n          _size -= this.standOut;\n        }\n        bool && (_size = 0);\n        switch (pos) {\n          case 'top':\n            _transform = `translateY(${_size}px)`;\n            break;\n          case 'bottom':\n            _transform = `translateY(-${_size}px)`;\n            break;\n          case 'left':\n            _transform = `translateX(${_size}px)`;\n            break;\n          case 'right':\n            _transform = `translateX(-${_size}px)`;\n            break;\n        }\n        return _transform;\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _wxcOverlay = __webpack_require__(5);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
var platform = weex.config.env.platform;

var isWeb = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';

module.exports = {
  components: { WxcOverlay: _wxcOverlay2.default },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    pos: {
      type: String,
      default: 'bottom'
    },
    popupColor: {
      type: String,
      default: '#FFFFFF'
    },
    overlayCfg: {
      type: Object,
      default: function _default() {
        return {
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          duration: 300,
          opacity: 0.6
        };
      }
    },
    height: {
      type: [Number, String],
      default: 840
    },
    standOut: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 750
    },
    animation: {
      type: Object,
      default: function _default() {
        return {
          timingFunction: 'ease-in'
        };
      }
    }
  },
  data: function data() {
    return {
      haveOverlay: true,
      isOverShow: true
    };
  },
  computed: {
    isNeedShow: function isNeedShow() {
      var _this = this;

      setTimeout(function () {
        _this.appearPopup(_this.show);
      }, 50);
      return this.show;
    },
    _height: function _height() {
      this.appearPopup(this.show, 150);
      return this.height;
    },
    transformValue: function transformValue() {
      return this.getTransform(this.pos, this.width, this.height, true);
    },
    padStyle: function padStyle() {
      var pos = this.pos,
          width = this.width,
          height = this.height,
          popupColor = this.popupColor;

      var style = {
        width: width + 'px',
        backgroundColor: popupColor
      };
      pos === 'top' && (style = _extends({}, style, {
        top: -height + 'px',
        height: height + 'px'
      }));
      pos === 'bottom' && (style = _extends({}, style, {
        bottom: -height + 'px',
        height: height + 'px'
      }));
      pos === 'left' && (style = _extends({}, style, {
        left: -width + 'px'
      }));
      pos === 'right' && (style = _extends({}, style, {
        right: -width + 'px'
      }));
      return style;
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // 在支付宝上面有点击穿透问题
      var platform = weex.config.env.platform;

      platform === 'Web' && e.preventDefault && e.preventDefault();
    },
    hide: function hide() {
      this.appearPopup(false);
      this.$refs.overlay.appearOverlay(false);
    },
    wxcOverlayBodyClicking: function wxcOverlayBodyClicking() {
      this.isShow && this.appearPopup(false);
    },
    appearPopup: function appearPopup(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

      this.isShow = bool;
      var popupEl = this.$refs['wxc-popup'];
      if (!popupEl) {
        return;
      }
      animation.transition(popupEl, _extends({
        styles: {
          transform: this.getTransform(this.pos, this.width, this.height, !bool)
        },
        duration: duration,
        delay: 0
      }, this.animation), function () {
        if (!bool) {
          _this2.$emit('wxcPopupOverlayClicked', { pos: _this2.pos });
        }
      });
    },
    getTransform: function getTransform(pos, width, height, bool) {
      var _size = pos === 'top' || pos === 'bottom' ? height : width;
      var _transform = void 0;
      if (isWeb) {
        _size -= this.standOut;
      }
      bool && (_size = 0);
      switch (pos) {
        case 'top':
          _transform = 'translateY(' + _size + 'px)';
          break;
        case 'bottom':
          _transform = 'translateY(-' + _size + 'px)';
          break;
        case 'left':
          _transform = 'translateX(' + _size + 'px)';
          break;
        case 'right':
          _transform = 'translateX(-' + _size + 'px)';
          break;
      }
      return _transform;
    }
  }
};

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "touchend": _vm.handleTouchEnd
    }
  }, [(_vm.show) ? _c('wxc-overlay', _vm._b({
    ref: "overlay",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "show": _vm.haveOverlay && _vm.isOverShow
    },
    on: {
      "wxcOverlayBodyClicking": _vm.wxcOverlayBodyClicking
    }
  }, 'wxc-overlay', _vm.overlayCfg, false)) : _vm._e()], 1), _vm._v(" "), (_vm.show) ? _c('div', {
    ref: "wxc-popup",
    class: ['wxc-popup', _vm.pos],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.padStyle)),
    attrs: {
      "height": _vm._height,
      "hack": _vm.isNeedShow
    },
    on: {
      "click": function () {}
    }
  }, [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ca872182", module.exports)
  }
}

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(152);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(153)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(155),
  /* template */
  __webpack_require__(156),
  /* scopeId */
  "data-v-0f8938e0",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-progress/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0f8938e0", Component.options)
  } else {
    hotAPI.reload("data-v-0f8938e0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(154);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("14613556", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0f8938e0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0f8938e0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-progress[data-v-0f8938e0] {\n  position: relative;\n  background-color: #f2f3f4;\n}\n.progress[data-v-0f8938e0] {\n  position: absolute;\n  background-color: #FFC900;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-progress/index.vue?9586d10e"],"names":[],"mappings":";AAYA;EACA,mBAAA;EACA,0BAAA;CACA;AAEA;EACA,mBAAA;EACA,0BAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div class=\"wxc-progress\"\n       :style=\"runWayStyle\">\n    <div class=\"progress\"\n         :style=\"progressStyle\"></div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-progress {\n    position: relative;\n    background-color: #f2f3f4;\n  }\n\n  .progress {\n    position: absolute;\n    background-color: #FFC900;\n  }\n</style>\n\n<script>\n  export default {\n    props: {\n      barColor: {\n        type: String,\n        default: '#FFC900'\n      },\n      barWidth: {\n        type: Number,\n        default: 600\n      },\n      barHeight: {\n        type: Number,\n        default: 8\n      },\n      value: {\n        type: Number,\n        default: 0\n      }\n    },\n    computed: {\n      runWayStyle () {\n        const { barWidth, barHeight } = this;\n        return {\n          width: barWidth + 'px',\n          height: barHeight + 'px'\n        }\n      },\n      progressStyle () {\n        const { value, barWidth, barHeight, barColor } = this;\n        const newValue = value < 0 ? 0 : (value > 100 ? 100 : value);\n        return {\n          backgroundColor: barColor,\n          height: barHeight + 'px',\n          width: newValue / 100 * barWidth + 'px'\n        }\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    barColor: {
      type: String,
      default: '#FFC900'
    },
    barWidth: {
      type: Number,
      default: 600
    },
    barHeight: {
      type: Number,
      default: 8
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    runWayStyle: function runWayStyle() {
      var barWidth = this.barWidth,
          barHeight = this.barHeight;

      return {
        width: barWidth + 'px',
        height: barHeight + 'px'
      };
    },
    progressStyle: function progressStyle() {
      var value = this.value,
          barWidth = this.barWidth,
          barHeight = this.barHeight,
          barColor = this.barColor;

      var newValue = value < 0 ? 0 : value > 100 ? 100 : value;
      return {
        backgroundColor: barColor,
        height: barHeight + 'px',
        width: newValue / 100 * barWidth + 'px'
      };
    }
  }
};

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-progress",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.runWayStyle))
  }, [_c('div', {
    staticClass: "progress",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.progressStyle))
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0f8938e0", module.exports)
  }
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(158);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(159)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(161),
  /* template */
  __webpack_require__(168),
  /* scopeId */
  "data-v-56150864",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-radio/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56150864", Component.options)
  } else {
    hotAPI.reload("data-v-56150864", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(160);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6b53434e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-56150864\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-56150864\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _item = __webpack_require__(162);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { wxcRadio: _item2.default },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      checkedIndex: -1
    };
  },
  computed: {
    updateList: function updateList() {
      var checkedIndex = this.checkedIndex,
          list = this.list;

      var updateList = [];
      list && list.forEach(function (item, i) {
        item.checked = i === checkedIndex;
        updateList.push(item);
      });
      return updateList;
    }
  },
  created: function created() {
    var _this = this;

    var list = this.list;

    if (list && list.length > 0) {
      list.forEach(function (item, i) {
        item.checked && (_this.checkedIndex = i);
      });
    }
  },

  methods: {
    wxcRadioItemChecked: function wxcRadioItemChecked(i, e) {
      var oldIndex = this.checkedIndex;
      var _list$i = this.list[i],
          value = _list$i.value,
          title = _list$i.title;

      this.checkedIndex = i;
      this.$emit('wxcRadioListChecked', { value: value, title: title, oldIndex: oldIndex, index: i });
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(163)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(165),
  /* template */
  __webpack_require__(167),
  /* scopeId */
  "data-v-6f935647",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-radio/item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f935647", Component.options)
  } else {
    hotAPI.reload("data-v-6f935647", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(164);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("666ac25a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6f935647\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./item.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6f935647\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./item.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.radio[data-v-6f935647] {\n  width: 48px;\n  height: 48px;\n}\n.title-text[data-v-6f935647] {\n  font-size: 30px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-radio/item.vue?56594cce"],"names":[],"mappings":";AAkBA;EACA,YAAA;EACA,aAAA;CACA;AAEA;EACA,gBAAA;CACA","file":"item.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <wxc-cell :has-top-border=\"hasTopBorder\"\n            :cell-style=\"{backgroundColor:backgroundColor}\"\n            v-on:wxcCellDivClick=\"wxcCellDivClick\">\n    <text :style=\"{color:color}\"\n          class=\"title-text\"\n          slot=\"title\">{{title}}</text>\n    <image :src=\"radioIcon\"\n           v-if=\"radioIcon\"\n           slot=\"value\"\n           class=\"radio\"></image>\n  </wxc-cell>\n</template>\n\n<style scoped>\n  .radio {\n    width: 48px;\n    height: 48px;\n  }\n\n  .title-text {\n    font-size: 30px;\n  }\n</style>\n\n<script>\n  import WxcCell from '../wxc-cell';\n  import { CHECKED, UNCHECKED } from './icon.base64.js'\n  export default {\n    components: { WxcCell },\n    props: {\n      hasTopBorder: {\n        type: Boolean,\n        default: false\n      },\n      title: {\n        type: String,\n        require: true\n      },\n      value: {\n        type: [String, Number, Object],\n        require: true\n      },\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      checked: {\n        type: Boolean,\n        default: false\n      }\n    },\n    data: () => ({\n      icon: [CHECKED, UNCHECKED]\n    }),\n    computed: {\n      radioIcon () {\n        const { icon, disabled, checked } = this;\n        return checked ? icon[disabled ? 1 : 0] : '';\n      },\n      backgroundColor () {\n        const { disabled } = this;\n        return disabled ? '#F2F3F4' : '#FFFFFF';\n      },\n      color () {\n        const { disabled, checked } = this;\n        return checked && !disabled ? '#EE9900' : '#3D3D3D';\n      }\n    },\n    methods: {\n      wxcCellDivClick () {\n        const { disabled, value } = this;\n        if (!disabled) {\n          this.$emit('wxcRadioItemChecked', { value, disabled })\n        }\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wxcCell = __webpack_require__(4);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _iconBase = __webpack_require__(166);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: { WxcCell: _wxcCell2.default },
  props: {
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      require: true
    },
    value: {
      type: [String, Number, Object],
      require: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      icon: [_iconBase.CHECKED, _iconBase.UNCHECKED]
    };
  },
  computed: {
    radioIcon: function radioIcon() {
      var icon = this.icon,
          disabled = this.disabled,
          checked = this.checked;

      return checked ? icon[disabled ? 1 : 0] : '';
    },
    backgroundColor: function backgroundColor() {
      var disabled = this.disabled;

      return disabled ? '#F2F3F4' : '#FFFFFF';
    },
    color: function color() {
      var disabled = this.disabled,
          checked = this.checked;

      return checked && !disabled ? '#EE9900' : '#3D3D3D';
    }
  },
  methods: {
    wxcCellDivClick: function wxcCellDivClick() {
      var disabled = this.disabled,
          value = this.value;

      if (!disabled) {
        this.$emit('wxcRadioItemChecked', { value: value, disabled: disabled });
      }
    }
  }
};

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  CHECKED: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADzUExURUxpce2ZAOuJAAAAAOuTAO6YAO2YAO6ZAKpVAN+AAO2YANWAAO6YAOuUAOuWAO6ZAO2YAO2SAO2YAOuWAO2YAICAAO2ZAO6XAO6ZAO6ZAL+AAOqVAOqXAOyYAO6ZAO2ZAO6YAO6YAO6ZAO2YAO2ZAO2SAO2ZAO2YAO2YAO6ZAO2XAO6ZAOaZAO2VAO6YAOOOAO2YAOqVAO2YAOuXAOmYAOqWAOyYAO2ZAO2YAOqYAO6ZAO6YAOmQAOiLAO6ZAOyZAO6YAOyZAOyZAO6YAO6ZAO2ZAO2YAO2YAOuZAO6ZAO6YAO2YAO6ZAO6YAO6ZAO2ZAO6ZAE03vp0AAABQdFJOUwDmDQEa3YP6Awh0BtAmP+BFDuknxAK2O3W0BDAxamn37Pv+rn8cc/a3r2LbCjqzCZwMtUAvPUOMcj5m7hcLk1+jN4lo3qDJ0xn8wn7q38/Kd0v3qQAAARZJREFUWMPt1sdywjAQgGEwxYDpPaJjWgihJqF3UiChvP/TMMOA40mwkL26sf9Zs6NPe5HJhGEYhilZWuMajzmCpy1PGvA5Ab999TGDX8nhsfvEz3fwICEUNotu15cF7jIHba5nJw+XrW518nFZ0WXURQhhdj1QXOT1rUN4uBrdZrNfZHLFY7R3FtzDTMErwfclDdr58mNVYnBFqAtzvPSiuSfZWwS5TiVSWZGiu70v5aSQrmjr2FznScmSpo7ZdUPH7qLr9LhoOp0uTZ1el5ZOv+u6zpDris6Y67/OqOuvDuBS6zo1gEutq3zvAS6Vbrv5Abl+dYc1yKXoouKuBHJddNPFcg69z6nWiEQ4fTfxx41h2B13BDc5Jq/erDtTAAAAAElFTkSuQmCC",
  UNCHECKED: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADzUExURUxpceDg4NjY2AAAANjY2ODg4ODg4N/f36qqqt/f397e3tXV1d/f393d3d/f397e3t/f39vb29/f397e3uDg4ICAgN/f39zc3N7e3uDg4N/f37+/v+Dg4ODg4N/f39/f3+Dg4ODg4ODg4Nvb29/f39/f3+Dg4ODg4N/f39/f3+Dg4ODg4MzMzNzc3ODg4ODg4MbGxtXV1d/f39/f397e3t7e3t7e3t3d3eDg4ODg4N/f397e3t7e3tHR0d/f3+Dg4N/f3+Dg4N/f39/f39bW1t/f39/f3+Dg4ODg4N/f39/f3+Dg4N/f39/f39/f39/f3+Dg4KlnnBMAAABQdFJOUwDmDQEa3YP6Awh0BtAmP0XgDuknxAK2O3W0MAQxamn3/uz7HK5/c/a3r2LbCjqznAkMtUAvPYxD7nJmPhcLX5M3o4loGaDJ3tPfz/zCfurKXXWIkwAAARlJREFUWMPt1ltzwUAUwHESEhFCL5RuL24N2igS9F7qTkt9/0/TGdNGpmRtcvbN+T/vnNnfnpcNBDAMwzA7sflm8JgjxM1StwGfc5SQJuMP+JUicSkpT0fgQcLJaVCORYci3BU8DkdrCg9X+D6k8HGF0OXXRQhhdmUpLtJ+sAgPV6NTr78UmVyZM9o7C7HH6xtNhe9LfTZz5eqtyuBKURcWaT2lC3clrQhyrTu/zMsU3f592SeFq4q7js31O+lCd9Uxu/bo2F10nRcXTefR5arz6nLTeXft1vly7dD5c23r/Lr+6wAup84yAC6nrrL4BrgcutnXEuTa6FafIJetS8tzHeT60733Bz3ofdY1X0mK03cTf9wYhh1wP1u5Jq9N5fwAAAAAAElFTkSuQmCC"
};

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-cell', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "has-top-border": _vm.hasTopBorder,
      "cell-style": {
        backgroundColor: _vm.backgroundColor
      }
    },
    on: {
      "wxcCellDivClick": _vm.wxcCellDivClick
    }
  }, [_c('text', {
    staticClass: "title-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.color
    })),
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.radioIcon) ? _c('image', {
    staticClass: "radio",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "slot": "value",
      "src": _vm.radioIcon
    },
    slot: "value"
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6f935647", module.exports)
  }
}

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.updateList), function(item, i) {
    return _c('wxc-radio', _vm._b({
      key: i,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      on: {
        "wxcRadioItemChecked": function($event) {
          _vm.wxcRadioItemChecked(i, $event)
        }
      }
    }, 'wxc-radio', item, false))
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-56150864", module.exports)
  }
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(170);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(171)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(173),
  /* template */
  __webpack_require__(175),
  /* scopeId */
  "data-v-254bbf80",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-result/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-254bbf80", Component.options)
  } else {
    hotAPI.reload("data-v-254bbf80", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(172);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0542707b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-254bbf80\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-254bbf80\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wrap[data-v-254bbf80] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.wxc-result[data-v-254bbf80] {\n  width: 750px;\n  flex: 1;\n  align-items: center;\n  background-color: #f2f3f4;\n}\n.result-image[data-v-254bbf80] {\n  width: 320px;\n  height: 320px;\n}\n.result-content[data-v-254bbf80] {\n  margin-top: 36px;\n  align-items: center;\n}\n.content-text[data-v-254bbf80] {\n  font-size: 30px;\n  color: #A5A5A5;\n  height: 42px;\n  line-height: 42px;\n  text-align: center;\n}\n.content-desc[data-v-254bbf80] {\n  margin-top: 10px;\n}\n.result-button[data-v-254bbf80] {\n  margin-top: 60px;\n  border-width: 1px;\n  border-color: #979797;\n  background-color: #FFFFFF;\n  border-radius: 6px;\n  width: 240px;\n  height: 72px;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n.button-text[data-v-254bbf80] {\n  color: #666666;\n  font-size: 30px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-result/index.vue?7818a45e"],"names":[],"mappings":";AA2BA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;CACA;AAEA;EACA,aAAA;EACA,QAAA;EACA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,aAAA;EACA,cAAA;CACA;AAEA;EACA,iBAAA;EACA,oBAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,aAAA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,iBAAA;CACA;AAEA;EACA,iBAAA;EACA,kBAAA;EACA,sBAAA;EACA,0BAAA;EACA,mBAAA;EACA,aAAA;EACA,aAAA;EACA,oBAAA;EACA,oBAAA;EACA,wBAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A  fliggy result page-->\n<template>\n  <div class=\"wrap\"\n       v-if=\"show\"\n       :style=\"wrapStyle\">\n    <div class=\"wxc-result\"\n         :style=\"{paddingTop: setPaddingTop }\">\n      <image class=\"result-image\"\n             :src=\"resultType.pic\"></image>\n      <div class=\"result-content\"\n           v-if=\"resultType.content\">\n        <text class=\"content-text\">{{resultType.content}}</text> <text class=\"content-text content-desc\"\n                                                                       v-if=\"resultType.desc\">{{resultType.desc}}</text>\n      </div>\n      <div class=\"result-button\"\n           v-if=\"resultType.button\"\n           @touchend=\"handleTouchEnd\"\n           @click=\"onClick\">\n        <text class=\"button-text\">{{resultType.button}}</text>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wrap {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n\n  .wxc-result {\n    width: 750px;\n    flex: 1;\n    align-items: center;\n    background-color: #f2f3f4;\n  }\n\n  .result-image {\n    width: 320px;\n    height: 320px;\n  }\n\n  .result-content {\n    margin-top: 36px;\n    align-items: center;\n  }\n\n  .content-text {\n    font-size: 30px;\n    color: #A5A5A5;\n    height: 42px;\n    line-height: 42px;\n    text-align: center;\n  }\n\n  .content-desc {\n    margin-top: 10px;\n  }\n\n  .result-button {\n    margin-top: 60px;\n    border-width: 1px;\n    border-color: #979797;\n    background-color: #FFFFFF;\n    border-radius: 6px;\n    width: 240px;\n    height: 72px;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .button-text {\n    color: #666666;\n    font-size: 30px;\n  }\n</style>\n\n<script>\n  const TYPES = require('./type');\n  module.exports = {\n    props: {\n      type: {\n        type: String,\n        default: 'errorPage'\n      },\n      show: {\n        type: Boolean,\n        default: true\n      },\n      wrapStyle: Object,\n      paddingTop: {\n        type: [Number, String],\n        default: 232\n      },\n      customSet: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    computed: {\n      resultType () {\n        const { type, customSet } = this;\n        const allTypes = this.isEmptyObject(customSet) ? TYPES : this.mergeDeep(TYPES, customSet);\n        let types = allTypes['errorPage'];\n        if (['errorPage', 'noGoods', 'noNetwork', 'errorLocation'].indexOf(type) > -1) {\n          types = allTypes[type];\n        }\n        return types;\n      },\n      setPaddingTop () {\n        const paddingTop = this.paddingTop;\n        return `${paddingTop}px`\n      }\n    },\n    methods: {\n      handleTouchEnd (e) {\n        // 在支付宝上面有点击穿透问题\n        const { platform } = weex.config.env;\n        platform === 'Web' && e.preventDefault && e.preventDefault();\n      },\n      onClick () {\n        const type = this.type;\n        this.$emit('wxcResultButtonClicked', { type })\n      },\n      isObject (item) {\n        return (item && typeof item === 'object' && !Array.isArray(item));\n      },\n      isEmptyObject (obj) {\n        return Object.keys(obj).length === 0 && obj.constructor === Object;\n      },\n      mergeDeep (target, ...sources) {\n        if (!sources.length) return target;\n        const source = sources.shift();\n        if (this.isObject(target) && this.isObject(source)) {\n          for (const key in source) {\n            if (this.isObject(source[key])) {\n              if (!target[key]) {\n                Object.assign(target, {\n                  [key]: {}\n                });\n              }\n              this.mergeDeep(target[key], source[key]);\n            } else {\n              Object.assign(target, { [key]: source[key] });\n            }\n          }\n        }\n        return this.mergeDeep(target, ...sources);\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var TYPES = __webpack_require__(174);
module.exports = {
  props: {
    type: {
      type: String,
      default: 'errorPage'
    },
    show: {
      type: Boolean,
      default: true
    },
    wrapStyle: Object,
    paddingTop: {
      type: [Number, String],
      default: 232
    },
    customSet: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    resultType: function resultType() {
      var type = this.type,
          customSet = this.customSet;

      var allTypes = this.isEmptyObject(customSet) ? TYPES : this.mergeDeep(TYPES, customSet);
      var types = allTypes['errorPage'];
      if (['errorPage', 'noGoods', 'noNetwork', 'errorLocation'].indexOf(type) > -1) {
        types = allTypes[type];
      }
      return types;
    },
    setPaddingTop: function setPaddingTop() {
      var paddingTop = this.paddingTop;
      return paddingTop + 'px';
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // 在支付宝上面有点击穿透问题
      var platform = weex.config.env.platform;

      platform === 'Web' && e.preventDefault && e.preventDefault();
    },
    onClick: function onClick() {
      var type = this.type;
      this.$emit('wxcResultButtonClicked', { type: type });
    },
    isObject: function isObject(item) {
      return item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !Array.isArray(item);
    },
    isEmptyObject: function isEmptyObject(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    },
    mergeDeep: function mergeDeep(target) {
      for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
      }

      if (!sources.length) return target;
      var source = sources.shift();
      if (this.isObject(target) && this.isObject(source)) {
        for (var key in source) {
          if (this.isObject(source[key])) {
            if (!target[key]) {
              Object.assign(target, _defineProperty({}, key, {}));
            }
            this.mergeDeep(target[key], source[key]);
          } else {
            Object.assign(target, _defineProperty({}, key, source[key]));
          }
        }
      }
      return this.mergeDeep.apply(this, [target].concat(sources));
    }
  }
};

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Tw93 on 2016/11/4.
 */
module.exports = {
  errorPage: {
    pic: '//gtms01.alicdn.com/tfs/TB1HH4TSpXXXXauXVXXXXXXXXXX-320-320.png',
    content: '抱歉出错了，飞猪正在全力解决中',
    button: '再试一次',
    title: '出错啦'
  },
  noGoods: {
    pic: '//gw.alicdn.com/tfs/TB1QXlEQXXXXXcNXFXXXXXXXXXX-320-320.png',
    content: '主人，这里什么都没有找到',
    button: '再试一次',
    title: '暂无商品'
  },
  noNetwork: {
    pic: '//gw.alicdn.com/tfs/TB1rs83QXXXXXcBXpXXXXXXXXXX-320-320.png',
    content: '哎呀，没有网络了......',
    button: '刷新一下',
    title: '无网络'
  },
  errorLocation: {
    pic: '//gw.alicdn.com/tfs/TB1rs83QXXXXXcBXpXXXXXXXXXX-320-320.png',
    content: '哎呀，定位失败了......',
    button: '刷新一下',
    title: '定位失败'
  }
};

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: "wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.wrapStyle))
  }, [_c('div', {
    staticClass: "wxc-result",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      paddingTop: _vm.setPaddingTop
    }))
  }, [_c('image', {
    staticClass: "result-image",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.resultType.pic
    }
  }), _vm._v(" "), (_vm.resultType.content) ? _c('div', {
    staticClass: "result-content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "content-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.resultType.content))]), _vm._v(" "), (_vm.resultType.desc) ? _c('text', {
    staticClass: "content-text content-desc",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.resultType.desc))]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.resultType.button) ? _c('div', {
    staticClass: "result-button",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "touchend": _vm.handleTouchEnd,
      "click": _vm.onClick
    }
  }, [_c('text', {
    staticClass: "button-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.resultType.button))])]) : _vm._e()])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-254bbf80", module.exports)
  }
}

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(177);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(178)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(180),
  /* template */
  __webpack_require__(196),
  /* scopeId */
  "data-v-c98168de",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c98168de", Component.options)
  } else {
    hotAPI.reload("data-v-c98168de", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(179);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("65fe2a00", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-c98168de\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-c98168de\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-rich-text[data-v-c98168de] {\n  justify-content: flex-start;\n  align-items: center;\n  flex-wrap: wrap;\n  flex-direction: row;\n  flex-shrink: 1;\n}\n.default-text[data-v-c98168de] {\n  color: #A5A5A5;\n  font-size: 24px;\n  line-height: 30px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/index.vue?6b7a2352"],"names":[],"mappings":";AAoCA;EACA,4BAAA;EACA,oBAAA;EACA,gBAAA;EACA,oBAAA;EACA,eAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div>\n    <div class=\"wxc-rich-text\" v-if=\"isNotEmptyArray\">\n      <div v-for=\"v in configList\">\n        <wxc-rich-text-text v-if=\"v.type=='text' && v.value\"\n                            :text-value=\"v.value\"\n                            :text-style=\"v.style\"\n                            :has-text-margin=\"hasTextMargin\"\n                            :text-theme=\"v.theme\"></wxc-rich-text-text>\n\n        <wxc-rich-text-link v-if=\"v.type=='link' && v.href && v.value\"\n                            :link-value=\"v.value\"\n                            :link-href=\"v.href\"\n                            :link-style=\"v.style\"\n                            :has-text-margin=\"hasTextMargin\"\n                            :link-theme=\"v.theme\"></wxc-rich-text-link>\n\n        <wxc-rich-text-icon v-if=\"v.type=='icon' && v.src\"\n                            :icon-src=\"v.src\"\n                            :icon-style=\"v.style\"></wxc-rich-text-icon>\n\n        <wxc-rich-text-tag v-if=\"v.type=='tag' && v.value\"\n                           :tag-value=\"v.value\"\n                           :tag-theme=\"v.theme\"\n                           :tag-style=\"v.style\"></wxc-rich-text-tag>\n      </div>\n    </div>\n    <text class=\"default-text\" v-if=\"isString\">{{configList}}</text>\n\n  </div>\n</template>\n\n<style scoped>\n  .wxc-rich-text {\n    justify-content: flex-start;\n    align-items: center;\n    flex-wrap: wrap;\n    flex-direction: row;\n    flex-shrink: 1;\n  }\n\n  .default-text {\n    color: #A5A5A5;\n    font-size: 24px;\n    line-height: 30px;\n  }\n</style>\n\n<script>\n  const Utils = require('./utils');\n  module.exports = {\n    components: {\n      WxcRichTextText: require('./wxc-rich-text-text.vue'),\n      WxcRichTextLink: require('./wxc-rich-text-link.vue'),\n      WxcRichTextIcon: require('./wxc-rich-text-icon.vue'),\n      WxcRichTextTag: require('./wxc-rich-text-tag.vue')\n    },\n    props: {\n      configList: {\n        type: [Array, String],\n        default: function () {\n          return []\n        }\n      },\n      hasTextMargin: {\n        type: Boolean,\n        default: true\n      }\n    },\n    data: () => ({}),\n    computed: {\n      isNotEmptyArray () {\n        return Utils.isNonEmptyArray(this.configList);\n      },\n      isString () {\n        return Utils.isString(this.configList);\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Utils = __webpack_require__(6);
module.exports = {
  components: {
    WxcRichTextText: __webpack_require__(7),
    WxcRichTextLink: __webpack_require__(185),
    WxcRichTextIcon: __webpack_require__(13),
    WxcRichTextTag: __webpack_require__(14)
  },
  props: {
    configList: {
      type: [Array, String],
      default: function _default() {
        return [];
      }
    },
    hasTextMargin: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    isNotEmptyArray: function isNotEmptyArray() {
      return Utils.isNonEmptyArray(this.configList);
    },
    isString: function isString() {
      return Utils.isString(this.configList);
    }
  }
};

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(182);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ad56e70e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-72879af8\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wxc-rich-text-text.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-72879af8\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wxc-rich-text-text.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-text[data-v-72879af8] {\n  font-size: 24px;\n  color: #3d3d3d;\n}\n.black[data-v-72879af8] {\n  color: #3D3D3D;\n}\n.yellow[data-v-72879af8] {\n  color: #EE9900;\n}\n.blue[data-v-72879af8] {\n  color: #30A0FF,\n}\n.gray[data-v-72879af8] {\n  color: #A5A5A5;\n}\n.red[data-v-72879af8] {\n  color: #FF5000;\n}\n.margin-text[data-v-72879af8] {\n  margin-right: 6px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-text.vue?7e46472c"],"names":[],"mappings":";AAQA;EACA,gBAAA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,kBAAA;CACA","file":"wxc-rich-text-text.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <text :class=\"['wxc-text', textTheme,hasTextMargin ? 'margin-text' : '']\" :style=\"themeStyle\">{{textValue}}</text>\n</template>\n\n<style scoped>\n  .wxc-text {\n    font-size: 24px;\n    color: #3d3d3d;\n  }\n\n  .black {\n    color: #3D3D3D;\n  }\n\n  .yellow {\n    color: #EE9900;\n  }\n\n  .blue {\n    color: #30A0FF,\n  }\n\n  .gray {\n    color: #A5A5A5;\n  }\n\n  .red {\n    color: #FF5000;\n  }\n\n  .margin-text {\n    margin-right: 6px;\n  }\n</style>\n\n<script>\n  module.exports = {\n    props: {\n      textValue: {\n        type: String,\n        default: ''\n      },\n      textTheme: {\n        type: String,\n        default: 'gray'\n      },\n      textStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      hasTextMargin: {\n        type: Boolean,\n        default: true\n      }\n    },\n    computed: {\n      themeStyle () {\n        let style = {};\n        const textStyle = this.textStyle;\n        if (textStyle && textStyle.fontSize) {\n          style = {\n            ...style,\n            fontSize: `${textStyle.fontSize}px`,\n            height: `${textStyle.fontSize * 1.2}px`\n          }\n        }\n        if (textStyle && textStyle.color) {\n          style = {\n            ...style,\n            color: textStyle.color\n          }\n        }\n        return style;\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
  props: {
    textValue: {
      type: String,
      default: ''
    },
    textTheme: {
      type: String,
      default: 'gray'
    },
    textStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    hasTextMargin: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    themeStyle: function themeStyle() {
      var style = {};
      var textStyle = this.textStyle;
      if (textStyle && textStyle.fontSize) {
        style = _extends({}, style, {
          fontSize: textStyle.fontSize + 'px',
          height: textStyle.fontSize * 1.2 + 'px'
        });
      }
      if (textStyle && textStyle.color) {
        style = _extends({}, style, {
          color: textStyle.color
        });
      }
      return style;
    }
  }
};

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('text', {
    class: ['wxc-text', _vm.textTheme, _vm.hasTextMargin ? 'margin-text' : ''],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.themeStyle))
  }, [_vm._v(_vm._s(_vm.textValue))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-72879af8", module.exports)
  }
}

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(186),
  /* template */
  __webpack_require__(187),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-link.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] wxc-rich-text-link.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14f05176", Component.options)
  } else {
    hotAPI.reload("data-v-14f05176", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wxcRichTextText = __webpack_require__(7);

var _wxcRichTextText2 = _interopRequireDefault(_wxcRichTextText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//

var Utils = __webpack_require__(6);

module.exports = {
  components: { WxcRichTextText: _wxcRichTextText2.default },
  props: {
    linkValue: {
      type: [String, Number],
      default: ''
    },
    hasTextMargin: {
      type: Boolean,
      default: true
    },
    linkHref: {
      type: String,
      default: ''
    },
    linkTheme: {
      type: String,
      default: 'black'
    },
    linkStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      defObj: {}
    };
  },
  methods: {
    onLinkClick: function onLinkClick(e) {
      var self = this;
      Utils.goToH5Page(self.linkHref);
      self.$emit('wxcRichTextLinkClick', { element: e, href: self.linkHref });
    }
  }
};

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.onLinkClick
    }
  }, [_c('wxc-rich-text-text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "text-value": _vm.linkValue,
      "has-text-margin": _vm.hasTextMargin,
      "text-style": _vm.linkStyle ? _vm.linkStyle : _vm.defObj,
      "text-theme": _vm.linkTheme ? _vm.linkTheme : 'black'
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-14f05176", module.exports)
  }
}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(189);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3e98c75a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-fb43e778\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wxc-rich-text-icon.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-fb43e778\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wxc-rich-text-icon.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-image[data-v-fb43e778] {\n  width: 90px;\n  height: 24px;\n  margin-right: 6px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-icon.vue?3300624d"],"names":[],"mappings":";AAYA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;CACA","file":"wxc-rich-text-icon.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <image class=\"wxc-image\"\n         :src=\"iconSrc\"\n         @load=\"onLoad\"\n         :style=\"{ width: computedStyle.width, height: computedStyle.height }\">\n  </image>\n</template>\n\n<style scoped>\n  .wxc-image {\n    width: 90px;\n    height: 24px;\n    margin-right: 6px;\n  }\n</style>\n\n<script>\n  module.exports = {\n    props: {\n      iconSrc: {\n        type: String,\n        default: ''\n      },\n      iconStyle: {\n        type: Object,\n        default: () => ({\n          height: 24\n        })\n      }\n    },\n    data: () => ({\n      width: 90\n    }),\n    computed: {\n      computedStyle () {\n        const { width, iconStyle } = this;\n        if (iconStyle && iconStyle.width && iconStyle.height) {\n          return {\n            width: `${iconStyle.width}px`,\n            height: `${iconStyle.height}px`\n          }\n        } else {\n          return {\n            width: `${width}px`,\n            height: `${iconStyle.height}px`\n          }\n        }\n      }\n    },\n    methods: {\n      onLoad (e) {\n        if (e.success && e.size && e.size.naturalWidth > 0) {\n          const width = e.size.naturalWidth;\n          const height = e.size.naturalHeight;\n          this.width = width * (this.iconStyle.height / height);\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
  props: {
    iconSrc: {
      type: String,
      default: ''
    },
    iconStyle: {
      type: Object,
      default: function _default() {
        return {
          height: 24
        };
      }
    }
  },
  data: function data() {
    return {
      width: 90
    };
  },
  computed: {
    computedStyle: function computedStyle() {
      var width = this.width,
          iconStyle = this.iconStyle;

      if (iconStyle && iconStyle.width && iconStyle.height) {
        return {
          width: iconStyle.width + 'px',
          height: iconStyle.height + 'px'
        };
      } else {
        return {
          width: width + 'px',
          height: iconStyle.height + 'px'
        };
      }
    }
  },
  methods: {
    onLoad: function onLoad(e) {
      if (e.success && e.size && e.size.naturalWidth > 0) {
        var width = e.size.naturalWidth;
        var height = e.size.naturalHeight;
        this.width = width * (this.iconStyle.height / height);
      }
    }
  }
};

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('image', {
    staticClass: "wxc-image",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      width: _vm.computedStyle.width,
      height: _vm.computedStyle.height
    })),
    attrs: {
      "src": _vm.iconSrc
    },
    on: {
      "load": _vm.onLoad
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-fb43e778", module.exports)
  }
}

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(193);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("b34bc55c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-8c80ddc2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wxc-rich-text-tag.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-8c80ddc2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wxc-rich-text-tag.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-tag[data-v-8c80ddc2] {\n  border-color: #3d3d3d;\n  border-width: 2px;\n  border-radius: 4px;\n  margin-right: 6px;\n  background-color: transparent;\n  padding-left: 6px;\n  padding-right: 6px;\n  height: 26px;\n  justify-content: center;\n  align-items: center;\n}\n.tag-text[data-v-8c80ddc2] {\n  font-size: 20px;\n  color: #3d3d3d;\n}\n.black[data-v-8c80ddc2] {\n  color: #3D3D3D;\n}\n.yellow[data-v-8c80ddc2] {\n  color: #EE9900;\n}\n.blue[data-v-8c80ddc2] {\n  color: #30A0FF;\n}\n.gray[data-v-8c80ddc2] {\n  color: #A5A5A5;\n}\n.red[data-v-8c80ddc2] {\n  color: #FF5000;\n}\n.border-black[data-v-8c80ddc2] {\n  border-color: #A5A5A5;\n}\n.border-yellow[data-v-8c80ddc2] {\n  border-color: #EE9900;\n}\n.border-blue[data-v-8c80ddc2] {\n  border-color: #30A0FF,\n}\n.border-gray[data-v-8c80ddc2] {\n  border-color: #A5A5A5;\n}\n.border-red[data-v-8c80ddc2] {\n  border-color: #FF5000;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-tag.vue?36496200"],"names":[],"mappings":";AAYA;EACA,sBAAA;EACA,kBAAA;EACA,mBAAA;EACA,kBAAA;EACA,8BAAA;EACA,kBAAA;EACA,mBAAA;EACA,aAAA;EACA,wBAAA;EACA,oBAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA","file":"wxc-rich-text-tag.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div :class=\"['wxc-tag', 'border-' + tagTheme]\"\n       :style=\"newTheme.divStyle\">\n    <text :class=\"['tag-text', tagTheme]\"\n          :style=\"newTheme.textStyle\">{{tagValue}}</text>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-tag {\n    border-color: #3d3d3d;\n    border-width: 2px;\n    border-radius: 4px;\n    margin-right: 6px;\n    background-color: transparent;\n    padding-left: 6px;\n    padding-right: 6px;\n    height: 26px;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .tag-text {\n    font-size: 20px;\n    color: #3d3d3d;\n  }\n\n  .black {\n    color: #3D3D3D;\n  }\n\n  .yellow {\n    color: #EE9900;\n  }\n\n  .blue {\n    color: #30A0FF;\n  }\n\n  .gray {\n    color: #A5A5A5;\n  }\n\n  .red {\n    color: #FF5000;\n  }\n\n  .border-black {\n    border-color: #A5A5A5;\n  }\n\n  .border-yellow {\n    border-color: #EE9900;\n  }\n\n  .border-blue {\n    border-color: #30A0FF,\n  }\n\n  .border-gray {\n    border-color: #A5A5A5;\n  }\n\n  .border-red {\n    border-color: #FF5000;\n  }\n</style>\n\n<script>\n  module.exports = {\n    props: {\n      tagValue: {\n        type: [String, Number],\n        default: ''\n      },\n      tagTheme: {\n        type: String,\n        default: 'blue'\n      },\n      tagStyle: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    computed: {\n      newTheme () {\n        const tagStyle = this.tagStyle;\n        const tagValue = this.tagValue;\n        let divStyle = {};\n        let textStyle = {};\n        if (tagStyle && tagStyle.fontSize) {\n          textStyle = {\n            ...textStyle,\n            fontSize: `${tagStyle.fontSize}px`\n          }\n        }\n        if (tagStyle && tagStyle.color) {\n          textStyle = {\n            ...textStyle,\n            color: tagStyle.color\n          }\n        }\n\n        if (tagStyle && tagStyle.borderColor) {\n          divStyle = {\n            ...divStyle,\n            borderColor: tagStyle.borderColor\n          }\n        }\n\n        if (tagStyle && tagStyle.borderWidth) {\n          divStyle = {\n            ...divStyle,\n            borderWidth: `${tagStyle.borderWidth}px`\n          }\n        }\n\n        if (tagStyle && tagStyle.borderRadius) {\n          divStyle = {\n            ...divStyle,\n            borderRadius: `${tagStyle.borderRadius}px`\n          }\n        }\n\n        if (tagStyle && tagStyle.backgroundColor) {\n          divStyle = {\n            ...divStyle,\n            backgroundColor: tagStyle.backgroundColor\n          }\n        }\n\n        if (tagStyle && tagStyle.height) {\n          divStyle = {\n            ...divStyle,\n            height: `${tagStyle.height}px`\n          };\n        }\n\n        if (tagStyle && tagStyle.width) {\n          divStyle = {\n            ...divStyle,\n            width: `${tagStyle.width}px`\n          };\n        }\n\n        if (tagValue && tagValue.length === 1) {\n          divStyle = {\n            ...divStyle,\n            paddingLeft: 0,\n            paddingRight: 0\n          };\n        }\n\n        return {\n          divStyle,\n          textStyle\n        };\n      }\n    }\n  };\n</script>\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
  props: {
    tagValue: {
      type: [String, Number],
      default: ''
    },
    tagTheme: {
      type: String,
      default: 'blue'
    },
    tagStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    newTheme: function newTheme() {
      var tagStyle = this.tagStyle;
      var tagValue = this.tagValue;
      var divStyle = {};
      var textStyle = {};
      if (tagStyle && tagStyle.fontSize) {
        textStyle = _extends({}, textStyle, {
          fontSize: tagStyle.fontSize + 'px'
        });
      }
      if (tagStyle && tagStyle.color) {
        textStyle = _extends({}, textStyle, {
          color: tagStyle.color
        });
      }

      if (tagStyle && tagStyle.borderColor) {
        divStyle = _extends({}, divStyle, {
          borderColor: tagStyle.borderColor
        });
      }

      if (tagStyle && tagStyle.borderWidth) {
        divStyle = _extends({}, divStyle, {
          borderWidth: tagStyle.borderWidth + 'px'
        });
      }

      if (tagStyle && tagStyle.borderRadius) {
        divStyle = _extends({}, divStyle, {
          borderRadius: tagStyle.borderRadius + 'px'
        });
      }

      if (tagStyle && tagStyle.backgroundColor) {
        divStyle = _extends({}, divStyle, {
          backgroundColor: tagStyle.backgroundColor
        });
      }

      if (tagStyle && tagStyle.height) {
        divStyle = _extends({}, divStyle, {
          height: tagStyle.height + 'px'
        });
      }

      if (tagStyle && tagStyle.width) {
        divStyle = _extends({}, divStyle, {
          width: tagStyle.width + 'px'
        });
      }

      if (tagValue && tagValue.length === 1) {
        divStyle = _extends({}, divStyle, {
          paddingLeft: 0,
          paddingRight: 0
        });
      }

      return {
        divStyle: divStyle,
        textStyle: textStyle
      };
    }
  }
};

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['wxc-tag', 'border-' + _vm.tagTheme],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.newTheme.divStyle))
  }, [_c('text', {
    class: ['tag-text', _vm.tagTheme],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.newTheme.textStyle))
  }, [_vm._v(_vm._s(_vm.tagValue))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8c80ddc2", module.exports)
  }
}

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.isNotEmptyArray) ? _c('div', {
    staticClass: "wxc-rich-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, _vm._l((_vm.configList), function(v) {
    return _c('div', [(v.type == 'text' && v.value) ? _c('wxc-rich-text-text', {
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "text-value": v.value,
        "text-style": v.style,
        "has-text-margin": _vm.hasTextMargin,
        "text-theme": v.theme
      }
    }) : _vm._e(), _vm._v(" "), (v.type == 'link' && v.href && v.value) ? _c('wxc-rich-text-link', {
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "link-value": v.value,
        "link-href": v.href,
        "link-style": v.style,
        "has-text-margin": _vm.hasTextMargin,
        "link-theme": v.theme
      }
    }) : _vm._e(), _vm._v(" "), (v.type == 'icon' && v.src) ? _c('wxc-rich-text-icon', {
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "icon-src": v.src,
        "icon-style": v.style
      }
    }) : _vm._e(), _vm._v(" "), (v.type == 'tag' && v.value) ? _c('wxc-rich-text-tag', {
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "tag-value": v.value,
        "tag-theme": v.theme,
        "tag-style": v.style
      }
    }) : _vm._e()], 1)
  })) : _vm._e(), _vm._v(" "), (_vm.isString) ? _c('text', {
    staticClass: "default-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.configList))]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c98168de", module.exports)
  }
}

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(198);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(199)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(201),
  /* template */
  __webpack_require__(202),
  /* scopeId */
  "data-v-6f52a706",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-special-rich-text/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f52a706", Component.options)
  } else {
    hotAPI.reload("data-v-6f52a706", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(200);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("731597d2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6f52a706\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6f52a706\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-special-rich-text[data-v-6f52a706] {\n  position: relative;\n}\n.tag-div[data-v-6f52a706] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  color: #A5A5A5;\n  font-size: 24px;\n  line-height: 30px;\n}\n.wxc-text[data-v-6f52a706] {\n  font-size: 24px;\n  color: #3d3d3d;\n  lines: 2;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.black[data-v-6f52a706] {\n  color: #3D3D3D;\n}\n.yellow[data-v-6f52a706] {\n  color: #EE9900;\n}\n.blue[data-v-6f52a706] {\n  color: #30A0FF,\n}\n.gray[data-v-6f52a706] {\n  color: #A5A5A5;\n}\n.red[data-v-6f52a706] {\n  color: #FF5000;\n}\n.margin-text[data-v-6f52a706] {\n  margin-right: 6px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-special-rich-text/index.vue?6d372697"],"names":[],"mappings":";AAuBA;EACA,mBAAA;CACA;AAEA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,SAAA;EACA,wBAAA;EACA,iBAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,kBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n<!-- just hack for babel-plugin-component !!!-->\n\n<template>\n  <div class=\"wxc-special-rich-text\">\n    <div class=\"tag-div\"\n         :style=\"{top:top+'px'}\">\n      <wxc-rich-text-icon v-if=\"newList[0].type == 'icon' && newList[0].src\"\n                          :icon-src=\"newList[0].src\"\n                          :icon-style=\"newList[0].style\"></wxc-rich-text-icon>\n      <wxc-rich-text-tag v-if=\"newList[0].type=='tag' && newList[0].value\"\n                         :tag-value=\"newList[0].value\"\n                         :tag-theme=\"newList[0].theme\"\n                         :tag-style=\"newList[0].style\"></wxc-rich-text-tag>\n    </div>\n    <text :class=\"['wxc-text', newList[1].theme]\"\n          :style=\"newList[1].style\"\n          v-if=\"newList[1].value\">{{newList[1].value}}</text>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-special-rich-text {\n    position: relative;\n  }\n\n  .tag-div {\n    position: absolute;\n    top: 0;\n    left: 0;\n    color: #A5A5A5;\n    font-size: 24px;\n    line-height: 30px;\n  }\n\n  .wxc-text {\n    font-size: 24px;\n    color: #3d3d3d;\n    lines: 2;\n    text-overflow: ellipsis;\n    overflow: hidden;\n  }\n\n  .black {\n    color: #3D3D3D;\n  }\n\n  .yellow {\n    color: #EE9900;\n  }\n\n  .blue {\n    color: #30A0FF,\n  }\n\n  .gray {\n    color: #A5A5A5;\n  }\n\n  .red {\n    color: #FF5000;\n  }\n\n  .margin-text {\n    margin-right: 6px;\n  }\n</style>\n\n<script>\n  const Utils = require('../wxc-rich-text/utils');\n  module.exports = {\n    components: {\n      WxcRichTextText: require('../wxc-rich-text/wxc-rich-text-text.vue'),\n      WxcRichTextIcon: require('../wxc-rich-text/wxc-rich-text-icon.vue'),\n      WxcRichTextTag: require('../wxc-rich-text/wxc-rich-text-tag.vue')\n    },\n    props: {\n      configList: {\n        type: [Array, String],\n        default: () => ({})\n      }\n    },\n    computed: {\n      newList () {\n        const { configList } = this;\n        if (Utils.isNonEmptyArray(configList) && configList.length === 2) {\n          let r1 = configList[0];\n          let r2 = configList[1];\n          const iconStyle = r1.style;\n          const textStyle = r2.style;\n          let style = {};\n          let fontSize = 24;\n          const tagWidth = iconStyle && iconStyle.width ? iconStyle.width : 24;\n\n          if (textStyle && textStyle.fontSize) {\n            fontSize = textStyle.fontSize;\n            style = {\n              fontSize: `${textStyle.fontSize}px`,\n              lineHeight: `${textStyle.fontSize * 1.4}px`\n            }\n          }\n\n          if (textStyle && textStyle.color) {\n            style = {\n              ...style,\n              color: textStyle.color\n            }\n          }\n\n          if (r1.type === 'tag' && iconStyle && iconStyle.width) {\n            r1 = {\n              ...r1,\n              style: { ...iconStyle, width: null }\n            }\n          }\n          const newValue = r2.value ? new Array(Math.ceil(tagWidth / fontSize) + 1).join('    ') + ` ${r2.value}` : '';\n          r2 = {\n            ...r2,\n            style,\n            value: newValue\n          }\n          return [r1, r2];\n        } else {\n          return [];\n        }\n      },\n      top () {\n        const { configList } = this;\n        if (Utils.isNonEmptyArray(configList) && configList.length === 2) {\n          const iconStyle = configList[0].style;\n          const textStyle = configList[1].style;\n          let fontSize = 24;\n          const tagHeight = iconStyle && iconStyle.height ? iconStyle.height : 26;\n          if (textStyle && textStyle.fontSize) {\n            fontSize = textStyle.fontSize;\n          }\n          return Math.ceil((fontSize * 1.3 - tagHeight) / 2);\n        } else {\n          return 0;\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Utils = __webpack_require__(6);
module.exports = {
  components: {
    WxcRichTextText: __webpack_require__(7),
    WxcRichTextIcon: __webpack_require__(13),
    WxcRichTextTag: __webpack_require__(14)
  },
  props: {
    configList: {
      type: [Array, String],
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    newList: function newList() {
      var configList = this.configList;

      if (Utils.isNonEmptyArray(configList) && configList.length === 2) {
        var r1 = configList[0];
        var r2 = configList[1];
        var iconStyle = r1.style;
        var textStyle = r2.style;
        var style = {};
        var fontSize = 24;
        var tagWidth = iconStyle && iconStyle.width ? iconStyle.width : 24;

        if (textStyle && textStyle.fontSize) {
          fontSize = textStyle.fontSize;
          style = {
            fontSize: textStyle.fontSize + 'px',
            lineHeight: textStyle.fontSize * 1.4 + 'px'
          };
        }

        if (textStyle && textStyle.color) {
          style = _extends({}, style, {
            color: textStyle.color
          });
        }

        if (r1.type === 'tag' && iconStyle && iconStyle.width) {
          r1 = _extends({}, r1, {
            style: _extends({}, iconStyle, { width: null })
          });
        }
        var newValue = r2.value ? new Array(Math.ceil(tagWidth / fontSize) + 1).join('    ') + (' ' + r2.value) : '';
        r2 = _extends({}, r2, {
          style: style,
          value: newValue
        });
        return [r1, r2];
      } else {
        return [];
      }
    },
    top: function top() {
      var configList = this.configList;

      if (Utils.isNonEmptyArray(configList) && configList.length === 2) {
        var iconStyle = configList[0].style;
        var textStyle = configList[1].style;
        var fontSize = 24;
        var tagHeight = iconStyle && iconStyle.height ? iconStyle.height : 26;
        if (textStyle && textStyle.fontSize) {
          fontSize = textStyle.fontSize;
        }
        return Math.ceil((fontSize * 1.3 - tagHeight) / 2);
      } else {
        return 0;
      }
    }
  }
};

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-special-rich-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "tag-div",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      top: _vm.top + 'px'
    }))
  }, [(_vm.newList[0].type == 'icon' && _vm.newList[0].src) ? _c('wxc-rich-text-icon', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "icon-src": _vm.newList[0].src,
      "icon-style": _vm.newList[0].style
    }
  }) : _vm._e(), _vm._v(" "), (_vm.newList[0].type == 'tag' && _vm.newList[0].value) ? _c('wxc-rich-text-tag', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "tag-value": _vm.newList[0].value,
      "tag-theme": _vm.newList[0].theme,
      "tag-style": _vm.newList[0].style
    }
  }) : _vm._e()], 1), _vm._v(" "), (_vm.newList[1].value) ? _c('text', {
    class: ['wxc-text', _vm.newList[1].theme],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.newList[1].style))
  }, [_vm._v(_vm._s(_vm.newList[1].value))]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6f52a706", module.exports)
  }
}

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(204);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(205)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(207),
  /* template */
  __webpack_require__(209),
  /* scopeId */
  "data-v-3c9bb53e",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-searchbar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c9bb53e", Component.options)
  } else {
    hotAPI.reload("data-v-3c9bb53e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(206);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("65f5064c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3c9bb53e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3c9bb53e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-search-bar[data-v-3c9bb53e] {\n  padding-left: 20px;\n  padding-right: 20px;\n  background-color: #ffffff;\n  width: 750px;\n  height: 84px;\n  flex-direction: row;\n}\n.wxc-search-bar-yellow[data-v-3c9bb53e] {\n  background-color: #ffc900;\n}\n.search-bar-input[data-v-3c9bb53e] {\n  position: absolute;\n  top: 10px;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-right: 40px;\n  padding-left: 60px;\n  font-size: 26px;\n  width: 624px;\n  height: 64px;\n  line-height: 64px;\n  background-color: #E5E5E5;\n  outline: none;\n  border-radius: 6px;\n}\n.search-bar-input-yellow[data-v-3c9bb53e] {\n  background-color: #fff6d6;\n  placeholder-color: #666666;\n}\n.search-bar-icon[data-v-3c9bb53e] {\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  left: 34px;\n  top: 28px;\n}\n.search-bar-close[data-v-3c9bb53e] {\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  right: 120px;\n  top: 28px;\n}\n.search-bar-button[data-v-3c9bb53e] {\n  width: 94px;\n  height: 36px;\n  font-size: 30px;\n  text-align: center;\n  background-color: #ffffff;\n  margin-top: 16px;\n  margin-right: 0;\n  color: #333333;\n  position: absolute;\n  right: 8px;\n  top: 9px;\n}\n.search-bar-button-yellow[data-v-3c9bb53e] {\n  background-color: #FFC900;\n}\n.input-has-dep[data-v-3c9bb53e] {\n  padding-left: 240px;\n  width: 710px;\n}\n.bar-dep[data-v-3c9bb53e] {\n  width: 170px;\n  padding-right: 12px;\n  padding-left: 12px;\n  height: 42px;\n  align-items: center;\n  flex-direction: row;\n  position: absolute;\n  left: 24px;\n  top: 22px;\n  border-right-style: solid;\n  border-right-width: 1px;\n  border-right-color: #C7C7C7;\n}\n.bar-dep-yellow[data-v-3c9bb53e] {\n  border-right-color: #C7C7C7;\n}\n.dep-text[data-v-3c9bb53e] {\n  flex: 1;\n  text-align: center;\n  font-size: 26px;\n  color: #666666;\n  margin-right: 6px;\n  lines: 1;\n  text-overflow: ellipsis;\n}\n.dep-arrow[data-v-3c9bb53e] {\n  width: 24px;\n  height: 24px;\n}\n.icon-has-dep[data-v-3c9bb53e] {\n  left: 214px;\n}\n.disabled-input[data-v-3c9bb53e] {\n  width: 750px;\n  height: 64px;\n  position: absolute;\n  left: 0;\n  background-color: transparent;\n}\n.has-dep-disabled[data-v-3c9bb53e] {\n  width: 550px;\n  left: 200px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-searchbar/index.vue?29c5326a"],"names":[],"mappings":";AA6DA;EACA,mBAAA;EACA,oBAAA;EACA,0BAAA;EACA,aAAA;EACA,aAAA;EACA,oBAAA;CACA;AAEA;EACA,0BAAA;CACA;AAEA;EACA,mBAAA;EACA,UAAA;EACA,eAAA;EACA,kBAAA;EACA,oBAAA;EACA,mBAAA;EACA,gBAAA;EACA,aAAA;EACA,aAAA;EACA,kBAAA;EACA,0BAAA;EACA,cAAA;EACA,mBAAA;CACA;AAEA;EACA,0BAAA;EACA,2BAAA;CACA;AAEA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,WAAA;EACA,UAAA;CACA;AAEA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,aAAA;EACA,UAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,gBAAA;EACA,mBAAA;EACA,0BAAA;EACA,iBAAA;EACA,gBAAA;EACA,eAAA;EACA,mBAAA;EACA,WAAA;EACA,SAAA;CACA;AAEA;EACA,0BAAA;CACA;AAEA;EACA,oBAAA;EACA,aAAA;CACA;AAEA;EACA,aAAA;EACA,oBAAA;EACA,mBAAA;EACA,aAAA;EACA,oBAAA;EACA,oBAAA;EACA,mBAAA;EACA,WAAA;EACA,UAAA;EACA,0BAAA;EACA,wBAAA;EACA,4BAAA;CACA;AAEA;EACA,4BAAA;CACA;AAEA;EACA,QAAA;EACA,mBAAA;EACA,gBAAA;EACA,eAAA;EACA,kBAAA;EACA,SAAA;EACA,wBAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;CACA;AAEA;EACA,YAAA;CACA;AAEA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,QAAA;EACA,8BAAA;CACA;AAEA;EACA,aAAA;EACA,YAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A sSearch bar for city Search-->\n\n<template>\n  <div>\n    <div :class=\"['wxc-search-bar','wxc-search-bar-'+theme]\"\n         v-if=\"mod==='default'\">\n      <input @blur=\"onBlur\"\n             @focus=\"onFocus\"\n             @input=\"onInput\"\n             @return=\"onSubmit\"\n             :autofocus=\"autofocus\"\n             :disabled=\"disabled\"\n             :value=\"value\"\n             ref=\"search-input\"\n             :type=\"inputType\"\n             :placeholder=\"placeholder\"\n             :style=\"{ width: needShowCancel ? '624px' : '710px' }\"\n             :class=\"['search-bar-input','search-bar-input-'+theme]\"/>\n      <div v-if=\"disabled\"\n           @click=\"inputDisabledClicked\"\n           class=\"disabled-input\"></div>\n      <image class=\"search-bar-icon\"\n             :src=\"inputIcon\"></image>\n      <image class=\"search-bar-close\"\n             v-if=\"showClose\"\n             @click=\"closeClicked\"\n             :src=\"closeIcon\"></image>\n      <text :class=\"['search-bar-button','search-bar-button-'+theme]\"\n            v-if=\"needShowCancel\"\n            @click=\"cancelClicked\">取消 </text>\n    </div>\n    <div :class=\"['wxc-search-bar','wxc-search-bar-'+theme]\"\n         v-if=\"mod==='hasDep'\">\n      <input @blur=\"onBlur\"\n             @focus=\"onFocus\"\n             @input=\"onInput\"\n             @return=\"onSubmit\"\n             :disabled=\"disabled\"\n             :autofocus=\"autofocus\"\n             :value=\"value\"\n             :type=\"inputType\"\n             :placeholder=\"placeholder\"\n             :class=\"['search-bar-input','input-has-dep','search-bar-input-'+theme]\"/>\n      <div v-if=\"disabled\"\n           @click=\"inputDisabledClicked\"\n           class=\"disabled-input has-dep-disabled\"></div>\n      <div :class=\"['bar-dep','.bar-dep-'+theme]\"\n           @click=\"depClicked\">\n        <text class=\"dep-text\">{{depName}}</text>\n        <image :src=\"arrowIcon\"\n               class=\"dep-arrow\"></image>\n      </div>\n      <image class=\"search-bar-icon icon-has-dep\"\n             :src=\"inputIcon\"></image>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-search-bar {\n    padding-left: 20px;\n    padding-right: 20px;\n    background-color: #ffffff;\n    width: 750px;\n    height: 84px;\n    flex-direction: row;\n  }\n\n  .wxc-search-bar-yellow {\n    background-color: #ffc900;\n  }\n\n  .search-bar-input {\n    position: absolute;\n    top: 10px;\n    padding-top: 0;\n    padding-bottom: 0;\n    padding-right: 40px;\n    padding-left: 60px;\n    font-size: 26px;\n    width: 624px;\n    height: 64px;\n    line-height: 64px;\n    background-color: #E5E5E5;\n    outline: none;\n    border-radius: 6px;\n  }\n\n  .search-bar-input-yellow {\n    background-color: #fff6d6;\n    placeholder-color: #666666;\n  }\n\n  .search-bar-icon {\n    position: absolute;\n    width: 30px;\n    height: 30px;\n    left: 34px;\n    top: 28px;\n  }\n\n  .search-bar-close {\n    position: absolute;\n    width: 30px;\n    height: 30px;\n    right: 120px;\n    top: 28px;\n  }\n\n  .search-bar-button {\n    width: 94px;\n    height: 36px;\n    font-size: 30px;\n    text-align: center;\n    background-color: #ffffff;\n    margin-top: 16px;\n    margin-right: 0;\n    color: #333333;\n    position: absolute;\n    right: 8px;\n    top: 9px;\n  }\n\n  .search-bar-button-yellow {\n    background-color: #FFC900;\n  }\n\n  .input-has-dep {\n    padding-left: 240px;\n    width: 710px;\n  }\n\n  .bar-dep {\n    width: 170px;\n    padding-right: 12px;\n    padding-left: 12px;\n    height: 42px;\n    align-items: center;\n    flex-direction: row;\n    position: absolute;\n    left: 24px;\n    top: 22px;\n    border-right-style: solid;\n    border-right-width: 1px;\n    border-right-color: #C7C7C7;\n  }\n\n  .bar-dep-yellow {\n    border-right-color: #C7C7C7;\n  }\n\n  .dep-text {\n    flex: 1;\n    text-align: center;\n    font-size: 26px;\n    color: #666666;\n    margin-right: 6px;\n    lines: 1;\n    text-overflow: ellipsis;\n  }\n\n  .dep-arrow {\n    width: 24px;\n    height: 24px;\n  }\n\n  .icon-has-dep {\n    left: 214px;\n  }\n\n  .disabled-input {\n    width: 750px;\n    height: 64px;\n    position: absolute;\n    left: 0;\n    background-color: transparent;\n  }\n\n  .has-dep-disabled {\n    width: 550px;\n    left: 200px;\n  }\n</style>\n\n<script>\n  const icon = require('./icon.base64.js');\n  module.exports = {\n    props: {\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      alwaysShowCancel: {\n        type: Boolean,\n        default: false\n      },\n      inputType: {\n        type: String,\n        default: 'text'\n      },\n      mod: {\n        type: String,\n        default: 'default'\n      },\n      autofocus: {\n        type: Boolean,\n        default: false\n      },\n      theme: {\n        type: String,\n        default: 'gray'\n      },\n      defaultValue: {\n        type: String,\n        default: ''\n      },\n      placeholder: {\n        type: String,\n        default: '搜索'\n      },\n      depName: {\n        type: String,\n        default: '杭州'\n      }\n    },\n    computed: {\n      needShowCancel () {\n        return this.alwaysShowCancel || this.showCancel;\n      }\n    },\n    data: () => ({\n      inputIcon: icon.inputIcon,\n      closeIcon: icon.closeIcon,\n      arrowIcon: icon.arrowIcon,\n      showCancel: false,\n      showClose: false,\n      value: ''\n    }),\n    created () {\n      this.defaultValue && (this.value = this.defaultValue);\n      if (this.disabled) {\n        this.showCancel = false;\n        this.showClose = false;\n      }\n    },\n    methods: {\n      onBlur () {\n        const self = this;\n        setTimeout(() => {\n          self.showCancel = false;\n          self.detectShowClose();\n          self.$emit('searchbarInputOnblur', { value: self.value });\n        }, 10);\n      },\n      autoBlur () {\n        this.$refs['search-input'].blur();\n      },\n      onFocus () {\n        this.showCancel = true;\n        this.detectShowClose();\n        this.$emit('searchbarInputOnfocus', { value: this.value });\n      },\n      closeClicked () {\n        this.value = '';\n        this.showCancel && (this.showCancel = false);\n        this.showClose && (this.showClose = false);\n        this.$emit('searchbarCloseClick', { value: this.value });\n        this.$emit('searchbarInputOninput', { value: this.value });\n      },\n      onInput (e) {\n        this.value = e.value;\n        this.showCancel = true;\n        this.detectShowClose();\n        this.$emit('searchbarInputOninput', { value: this.value });\n      },\n      onSubmit (e) {\n        this.onBlur();\n        this.value = e.value;\n        this.showCancel = true;\n        this.detectShowClose();\n        this.$emit('searchbarInputOnReturn', { value: this.value });\n      },\n      cancelClicked () {\n        this.showCancel && (this.showCancel = false);\n        this.showClose && (this.showClose = false);\n        this.$emit('searchbarCancelClick', { value: this.value });\n      },\n      detectShowClose () {\n        this.showClose = (this.value.length > 0) && this.showCancel;\n      },\n      depClicked () {\n        this.$emit('searchbarDepChooseClick', {});\n      },\n      inputDisabledClicked () {\n        this.$emit('searchbarInputDisabledOnclick', {});\n      },\n      setValue (value) {\n        this.value = value;\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var icon = __webpack_require__(208);
module.exports = {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    alwaysShowCancel: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: 'text'
    },
    mod: {
      type: String,
      default: 'default'
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'gray'
    },
    defaultValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    depName: {
      type: String,
      default: '杭州'
    }
  },
  computed: {
    needShowCancel: function needShowCancel() {
      return this.alwaysShowCancel || this.showCancel;
    }
  },
  data: function data() {
    return {
      inputIcon: icon.inputIcon,
      closeIcon: icon.closeIcon,
      arrowIcon: icon.arrowIcon,
      showCancel: false,
      showClose: false,
      value: ''
    };
  },
  created: function created() {
    this.defaultValue && (this.value = this.defaultValue);
    if (this.disabled) {
      this.showCancel = false;
      this.showClose = false;
    }
  },

  methods: {
    onBlur: function onBlur() {
      var self = this;
      setTimeout(function () {
        self.showCancel = false;
        self.detectShowClose();
        self.$emit('searchbarInputOnblur', { value: self.value });
      }, 10);
    },
    autoBlur: function autoBlur() {
      this.$refs['search-input'].blur();
    },
    onFocus: function onFocus() {
      this.showCancel = true;
      this.detectShowClose();
      this.$emit('searchbarInputOnfocus', { value: this.value });
    },
    closeClicked: function closeClicked() {
      this.value = '';
      this.showCancel && (this.showCancel = false);
      this.showClose && (this.showClose = false);
      this.$emit('searchbarCloseClick', { value: this.value });
      this.$emit('searchbarInputOninput', { value: this.value });
    },
    onInput: function onInput(e) {
      this.value = e.value;
      this.showCancel = true;
      this.detectShowClose();
      this.$emit('searchbarInputOninput', { value: this.value });
    },
    onSubmit: function onSubmit(e) {
      this.onBlur();
      this.value = e.value;
      this.showCancel = true;
      this.detectShowClose();
      this.$emit('searchbarInputOnReturn', { value: this.value });
    },
    cancelClicked: function cancelClicked() {
      this.showCancel && (this.showCancel = false);
      this.showClose && (this.showClose = false);
      this.$emit('searchbarCancelClick', { value: this.value });
    },
    detectShowClose: function detectShowClose() {
      this.showClose = this.value.length > 0 && this.showCancel;
    },
    depClicked: function depClicked() {
      this.$emit('searchbarDepChooseClick', {});
    },
    inputDisabledClicked: function inputDisabledClicked() {
      this.$emit('searchbarInputDisabledOnclick', {});
    },
    setValue: function setValue(value) {
      this.value = value;
    }
  }
};

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Tw93 on 2016/10/31.
 */

module.exports = {
  inputIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAByUExURUxpcWdnZ2dnZ2ZmZmZmZmdnZ4CAgGZmZmZmZmZmZmdnZ3R0dGdnZ2dnZ2ZmZmdnZ2ZmZmdnZ2ZmZmlpaW1tbWdnZ2dnZ2pqamdnZ2ZmZmdnZ2hoaGdnZ2dnZ2dnZ2hoaGZmZmhoaGZmZmlpaWdnZ2ZmZkA5lL8AAAAldFJOUwDdmfcF6QT5S+ZcC4toHs6YzLlJB2aGNclw5FHQl7pCjGevP67QWKJRAAAA4klEQVQoz62S2RaCMAxEy9ZSFtkXRcVt/v8XrRRQWk6ezNPQS9IkHcZ01FVeSCGLvKqZFbyRWEI23KCHTB17pdu6padUdtjQLgCcKJ50HDlA0P3mKpr466efKP7N56pyuqmWqvrr/XeVa/Si8ptlIgnHN7DvQM7zVUBkDRoBlVY5vNjCsYdcqwKlvSZWotBCwt3BLqQWAu0ObiHo7IC6+4oz3fmFnnsgt3Zazhp75zfgSL5Yz6n33vxvuQUQ4a7Xrh+v9anY8l+nno6chQaffR6cL8PUhcWN+Acfaf4iMBsfzzdtFxehXooN0gAAAABJRU5ErkJggg==",

  closeIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABFUExURUxpcWZmZmZmZmlpaWZmZmZmZmdnZ2dnZ2ZmZmxsbG1tbWZmZmZmZmZmZuXl5XJycv///2lpaeTk5Hh4eHd3d/39/XNzc2EMiGIAAAANdFJOUwD8a07Zm/P9thoc8m5QAlfPAAAAn0lEQVQoz3VS6RrEEBCbKuro0KJ9/0dddXx0dyc/HMkgAkCFYYpLyRUzMEOLBRsWoQe/Wpxg187vG76w7a3+i89KWaMt/sA+54gyTGelzlg6kX0WP/EK/unvcKXizQCrheFwWfHuCHUpA1W3yJTzpalzBRyHMnjkIHEog0dJC+RW5OEvu/dkl7xgiyT2SFKPhA6RjJ1+KPpp6c/w7/t8AFQ8F1LEfZUoAAAAAElFTkSuQmCC",

  arrowIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABdUExURUxpcWxsbGhoaGZmZmZmZmZmZmZmZmdnZ2ZmZm9vb3FxcWtra2ZmZmdnZ3R0dICAgICAgGZmZmZmZmdnZ2dnZ2ZmZmZmZmZmZmhoaGlpaWdnZ2dnZ2dnZ2ZmZmZmZpgUTqAAAAAedFJOUwAaIOUj3tvTrxcSK+3HCwIGN5uruon5/FNEwsHz9AT339MAAABsSURBVCjP3ZFXDoAwDEM7KB0UCmWW4fsfEyHE5gKQr2dFkW2FkB+NGvQhdK92lojZxiyG3BeRAE9WTDhEdJxTCVssUFhIenYxKaZASBiRmqt/VqHpugZVdk+Wl2hblPkzs/OAd6916vq7r5gBMI0EqzF/qlIAAAAASUVORK5CYII="
};

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.mod === 'default') ? _c('div', {
    class: ['wxc-search-bar', 'wxc-search-bar-' + _vm.theme],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('input', {
    ref: "search-input",
    class: ['search-bar-input', 'search-bar-input-' + _vm.theme],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      width: _vm.needShowCancel ? '624px' : '710px'
    })),
    attrs: {
      "autofocus": _vm.autofocus,
      "disabled": _vm.disabled,
      "type": _vm.inputType,
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "input": _vm.onInput,
      "return": _vm.onSubmit
    }
  }), _vm._v(" "), (_vm.disabled) ? _c('div', {
    staticClass: "disabled-input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.inputDisabledClicked
    }
  }) : _vm._e(), _vm._v(" "), _c('image', {
    staticClass: "search-bar-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.inputIcon
    }
  }), _vm._v(" "), (_vm.showClose) ? _c('image', {
    staticClass: "search-bar-close",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.closeIcon
    },
    on: {
      "click": _vm.closeClicked
    }
  }) : _vm._e(), _vm._v(" "), (_vm.needShowCancel) ? _c('text', {
    class: ['search-bar-button', 'search-bar-button-' + _vm.theme],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.cancelClicked
    }
  }, [_vm._v("取消 ")]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.mod === 'hasDep') ? _c('div', {
    class: ['wxc-search-bar', 'wxc-search-bar-' + _vm.theme],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('input', {
    class: ['search-bar-input', 'input-has-dep', 'search-bar-input-' + _vm.theme],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "disabled": _vm.disabled,
      "autofocus": _vm.autofocus,
      "type": _vm.inputType,
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "input": _vm.onInput,
      "return": _vm.onSubmit
    }
  }), _vm._v(" "), (_vm.disabled) ? _c('div', {
    staticClass: "disabled-input has-dep-disabled",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.inputDisabledClicked
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    class: ['bar-dep', '.bar-dep-' + _vm.theme],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.depClicked
    }
  }, [_c('text', {
    staticClass: "dep-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.depName))]), _vm._v(" "), _c('image', {
    staticClass: "dep-arrow",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.arrowIcon
    }
  })]), _vm._v(" "), _c('image', {
    staticClass: "search-bar-icon icon-has-dep",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.inputIcon
    }
  })]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c9bb53e", module.exports)
  }
}

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(211);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(212)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(214),
  /* template */
  __webpack_require__(215),
  /* scopeId */
  "data-v-61efacbc",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-simple-flow/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61efacbc", Component.options)
  } else {
    hotAPI.reload("data-v-61efacbc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(213);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3e138a0d", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-61efacbc\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-61efacbc\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.flex-row[data-v-61efacbc] {\n  flex-direction: row;\n}\n.full-rest[data-v-61efacbc] {\n  flex: 1;\n}\n.root[data-v-61efacbc] {\n  padding-top: 28px;\n  padding-bottom: 24px;\n  background-color: #fff;\n}\n.title[data-v-61efacbc] {\n  height: 40px;\n}\n.content[data-v-61efacbc] {\n  padding-top: 9px;\n  padding-bottom: 42px;\n}\n.last-one-content[data-v-61efacbc] {\n  padding-bottom: 0;\n}\n.title[data-v-61efacbc],\n.content[data-v-61efacbc] {\n  padding-left: 70px;\n  padding-right: 70px;\n}\n.line[data-v-61efacbc] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 38px;\n  width: 2px;\n  background-color: #FFC300;\n}\n.first-one-title-line[data-v-61efacbc] {\n  top: 20px;\n}\n.last-one-title-line[data-v-61efacbc] {\n  bottom: 20px;\n}\n.last-one-content-line[data-v-61efacbc] {\n  width: 0;\n}\n.point[data-v-61efacbc] {\n  position: absolute;\n  top: 13px;\n  left: 32px;\n  width: 14px;\n  height: 14px;\n  background-color: #FFF0BD;\n  border-style: solid;\n  border-width: 2px;\n  border-color: #EE9900;\n  border-radius: 100%;\n}\n.highlight-point[data-v-61efacbc] {\n  top: 7px;\n  left: 26px;\n  width: 26px;\n  height: 26px;\n  background-color: #EE9900;\n  border-style: solid;\n  border-width: 6px;\n  border-color: #FFE78D;\n}\n.text-title[data-v-61efacbc] {\n  font-size: 30px;\n  color: #3d3d3d;\n}\n.text-highlight-title[data-v-61efacbc] {\n  color: #EE9900;\n}\n.text-desc[data-v-61efacbc],\n.text-date[data-v-61efacbc] {\n  font-size: 24px;\n  color: #a5a5a5;\n}\n.text-desc[data-v-61efacbc] {\n  margin-bottom: 12px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-simple-flow/index.vue?43b08854"],"names":[],"mappings":";AA2BA;EACA,oBAAA;CACA;AAEA;EACA,QAAA;CACA;AAEA;EACA,kBAAA;EACA,qBAAA;EACA,uBAAA;CACA;AAEA;EACA,aAAA;CACA;AAEA;EACA,iBAAA;EACA,qBAAA;CACA;AAEA;EACA,kBAAA;CACA;AAEA;;EAEA,mBAAA;EACA,oBAAA;CACA;AAEA;EACA,mBAAA;EACA,OAAA;EACA,UAAA;EACA,WAAA;EACA,WAAA;EACA,0BAAA;CACA;AAEA;EACA,UAAA;CACA;AAEA;EACA,aAAA;CACA;AAEA;EACA,SAAA;CACA;AAEA;EACA,mBAAA;EACA,UAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,0BAAA;EACA,oBAAA;EACA,kBAAA;EACA,sBAAA;EACA,oBAAA;CACA;AAEA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,0BAAA;EACA,oBAAA;EACA,kBAAA;EACA,sBAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;;EAEA,gBAAA;EACA,eAAA;CACA;AAEA;EACA,oBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by 南麓 on 2017/5/25. -->\n<template>\n  <div class=\"root\">\n    <div v-for=\"(item, index) in cItems\" :key=\"item.key\">\n      <div class=\"title flex-row\">\n        <div class=\"line\" :class=\"item.__titleLineClass__\" :style=\"item.__lineStyle__\"></div>\n\n        <div class=\"point\" :class=\"item.__pointClass__\" :style=\"item.__pointStyle__\"></div>\n\n        <text class=\"text-title full-rest\" :class=\"item.__titleTextClass__\" :style=\"item.__titleStyle__\">{{item.title}}</text>\n      </div>\n\n      <div class=\"content flex-row\" :class=\"item.__contentClass__\">\n        <div class=\"line\" :class=\"item.__contentLineClass__\" :style=\"item.__lineStyle__\"></div>\n\n        <div class=\"full-rest\">\n          <text v-if=\"item.desc\" class=\"text-desc\">{{item.desc}}</text>\n\n          <text v-if=\"item.date\" class=\"text-date\">{{item.date}}</text>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .flex-row {\n    flex-direction: row;\n  }\n\n  .full-rest {\n    flex: 1;\n  }\n\n  .root {\n    padding-top: 28px;\n    padding-bottom: 24px;\n    background-color: #fff;\n  }\n\n  .title {\n    height: 40px;\n  }\n\n  .content {\n    padding-top: 9px;\n    padding-bottom: 42px;\n  }\n\n  .last-one-content {\n    padding-bottom: 0;\n  }\n\n  .title,\n  .content {\n    padding-left: 70px;\n    padding-right: 70px;\n  }\n\n  .line {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 38px;\n    width: 2px;\n    background-color: #FFC300;\n  }\n\n  .first-one-title-line {\n    top: 20px;\n  }\n\n  .last-one-title-line {\n    bottom: 20px;\n  }\n\n  .last-one-content-line {\n    width: 0;\n  }\n\n  .point {\n    position: absolute;\n    top: 13px;\n    left: 32px;\n    width: 14px;\n    height: 14px;\n    background-color: #FFF0BD;\n    border-style: solid;\n    border-width: 2px;\n    border-color: #EE9900;\n    border-radius: 100%;\n  }\n\n  .highlight-point {\n    top: 7px;\n    left: 26px;\n    width: 26px;\n    height: 26px;\n    background-color: #EE9900;\n    border-style: solid;\n    border-width: 6px;\n    border-color: #FFE78D;\n  }\n\n  .text-title {\n    font-size: 30px;\n    color: #3d3d3d;\n  }\n\n  .text-highlight-title {\n    color: #EE9900;\n  }\n\n  .text-desc,\n  .text-date {\n    font-size: 24px;\n    color: #a5a5a5;\n  }\n\n  .text-desc {\n    margin-bottom: 12px;\n  }\n</style>\n\n<script>\n  export default {\n    props: {\n      list: {\n        type: Array,\n        required: true\n      },\n      themeColor: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    computed: {\n      cItems () {\n        return this.adapter(this.list);\n      }\n    },\n    methods: {\n      adapter (items) {\n        const {\n          lineColor,\n          pointInnerColor,\n          pointBorderColor,\n          highlightTitleColor,\n          highlightPointInnerColor,\n          highlightPointBorderColor\n        } = this.themeColor;\n        const len = items.length;\n        const pre = Date.now();\n\n        return items.map((item, index) => {\n          item.key = `${pre}_${index}`;\n          item.__titleLineClass__ = [];\n          item.__contentClass__ = [];\n          item.__contentLineClass__ = [];\n          item.__pointClass__ = [];\n          item.__titleTextClass__ = [];\n          item.__pointStyle__ = {};\n          item.__lineStyle__ = {};\n          item.__titleStyle__ = {};\n\n          if (lineColor) item.__lineStyle__.backgroundColor = lineColor;\n          if (pointInnerColor) item.__pointStyle__.backgroundColor = pointInnerColor;\n          if (pointBorderColor) item.__pointStyle__.borderColor = pointBorderColor;\n\n          if (index === 0) {\n            item.__titleLineClass__.push('first-one-title-line');\n          }\n\n          if (index === len - 1) {\n            item.__titleLineClass__.push('last-one-title-line');\n            item.__contentClass__.push('last-one-content');\n            item.__contentLineClass__.push('last-one-content-line');\n          }\n\n          if (item.highlight) {\n            item.__pointClass__.push('highlight-point');\n            item.__titleTextClass__.push('text-highlight-title');\n            if (highlightTitleColor) item.__titleStyle__.color = highlightTitleColor;\n            if (highlightPointInnerColor) item.__pointStyle__.backgroundColor = highlightPointInnerColor;\n            if (highlightPointBorderColor) item.__pointStyle__.borderColor = highlightPointBorderColor;\n          }\n          return item;\n        });\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    list: {
      type: Array,
      required: true
    },
    themeColor: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    cItems: function cItems() {
      return this.adapter(this.list);
    }
  },
  methods: {
    adapter: function adapter(items) {
      var _themeColor = this.themeColor,
          lineColor = _themeColor.lineColor,
          pointInnerColor = _themeColor.pointInnerColor,
          pointBorderColor = _themeColor.pointBorderColor,
          highlightTitleColor = _themeColor.highlightTitleColor,
          highlightPointInnerColor = _themeColor.highlightPointInnerColor,
          highlightPointBorderColor = _themeColor.highlightPointBorderColor;

      var len = items.length;
      var pre = Date.now();

      return items.map(function (item, index) {
        item.key = pre + '_' + index;
        item.__titleLineClass__ = [];
        item.__contentClass__ = [];
        item.__contentLineClass__ = [];
        item.__pointClass__ = [];
        item.__titleTextClass__ = [];
        item.__pointStyle__ = {};
        item.__lineStyle__ = {};
        item.__titleStyle__ = {};

        if (lineColor) item.__lineStyle__.backgroundColor = lineColor;
        if (pointInnerColor) item.__pointStyle__.backgroundColor = pointInnerColor;
        if (pointBorderColor) item.__pointStyle__.borderColor = pointBorderColor;

        if (index === 0) {
          item.__titleLineClass__.push('first-one-title-line');
        }

        if (index === len - 1) {
          item.__titleLineClass__.push('last-one-title-line');
          item.__contentClass__.push('last-one-content');
          item.__contentLineClass__.push('last-one-content-line');
        }

        if (item.highlight) {
          item.__pointClass__.push('highlight-point');
          item.__titleTextClass__.push('text-highlight-title');
          if (highlightTitleColor) item.__titleStyle__.color = highlightTitleColor;
          if (highlightPointInnerColor) item.__pointStyle__.backgroundColor = highlightPointInnerColor;
          if (highlightPointBorderColor) item.__pointStyle__.borderColor = highlightPointBorderColor;
        }
        return item;
      });
    }
  }
};

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "root",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, _vm._l((_vm.cItems), function(item, index) {
    return _c('div', {
      key: item.key,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_c('div', {
      staticClass: "title flex-row",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_c('div', {
      staticClass: "line",
      class: item.__titleLineClass__,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(item.__lineStyle__))
    }), _vm._v(" "), _c('div', {
      staticClass: "point",
      class: item.__pointClass__,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(item.__pointStyle__))
    }), _vm._v(" "), _c('text', {
      staticClass: "text-title full-rest",
      class: item.__titleTextClass__,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(item.__titleStyle__))
    }, [_vm._v(_vm._s(item.title))])]), _vm._v(" "), _c('div', {
      staticClass: "content flex-row",
      class: item.__contentClass__,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_c('div', {
      staticClass: "line",
      class: item.__contentLineClass__,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(item.__lineStyle__))
    }), _vm._v(" "), _c('div', {
      staticClass: "full-rest",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [(item.desc) ? _c('text', {
      staticClass: "text-desc",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_vm._v(_vm._s(item.desc))]) : _vm._e(), _vm._v(" "), (item.date) ? _c('text', {
      staticClass: "text-date",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_vm._v(_vm._s(item.date))]) : _vm._e()])])])
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-61efacbc", module.exports)
  }
}

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(217);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(218)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(220),
  /* template */
  __webpack_require__(221),
  /* scopeId */
  "data-v-1983b04c",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-slide-nav/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1983b04c", Component.options)
  } else {
    hotAPI.reload("data-v-1983b04c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(219);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("78a3b8ee", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1983b04c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1983b04c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.slide-nav[data-v-1983b04c] {\n  position: absolute;\n  z-index: 1000;\n}\n\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-slide-nav/index.vue?e92c3dca"],"names":[],"mappings":";AAUA;EACA,mBAAA;EACA,cAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div class=\"slide-nav\" ref=\"wrapper\">\n    <slot></slot>\n  </div>\n</template>\n\n<style scoped>\n  .slide-nav {\n    position: absolute;\n    z-index: 1000;\n  }\n\n</style>\n\n<script>\n  const DOM = weex.requireModule('dom');\n  // const Modal = weex.requireModule('modal');\n  const Animation = weex.requireModule('animation');\n  const OFFSET_ACCURACY = 10;\n  const SCALE = weex.config.env.platform.toLowerCase() === 'web' ? 2 : 1;\n\n  function _toNum(str) {\n    return typeof str === 'number' ? str : parseFloat((str || '').replace(/px$/i, ''));\n  }\n\n  function _getHeight(element, callback) {\n    if (!element) { return; }\n    if (element.__cacheHeight) {\n      element.__cacheHeight && callback && callback(element.__cacheHeight);\n    } else {\n      DOM.getComponentRect(element, (res) => {\n        let height = (parseFloat(res && res.size && res.size.height) || 0) / SCALE;\n        height && callback && callback((element.__cacheHeight = height));\n      });\n    }\n  }\n\n  export default {\n\n    props: {\n      position: {\n        'type': String,\n        'default': 'top'\n      },\n\n      height: [String, Number]\n    },\n\n    data() {\n      return {\n        visible: true\n      }\n    },\n\n    watch: {\n      visible(newVal) {\n        newVal ? this._slideIn() : this._slideOut();\n      }\n    },\n\n    created() {\n      this._height = _toNum(this.height) || 0;\n      this._isBottom = this.position === 'bottom';\n      this._direction = this._isBottom ? 1 : -1;\n    },\n\n    methods: {\n\n      _slideOut() {\n        this.getHeight((height) => {\n          this.$emit('slideOut');\n          this.slideY(height * this._direction * SCALE, () => {\n            this.$emit('slideOutEnd');\n          });\n        });\n      },\n\n      _slideIn() {\n        this.getHeight((height) => {\n          this.$emit('slideIn');\n          this.slideY(0, () => {\n            this.$emit('slideInEnd');\n          });\n        });\n      },\n\n      getHeight(callback) {\n        return _getHeight(this.$refs.wrapper, callback);\n      },\n\n      slideOut() {\n        this.visible = false;\n      },\n\n      slideIn() {\n        this.visible = true;\n      },\n\n      slideY(y, callback) {\n        Animation.transition(this.$refs.wrapper, {\n          styles: { transform: 'translateY(' + y  + 'px)' },\n          duration: 150, //ms\n          timingFunction: 'ease',\n          delay: 0 //ms\n        }, callback);\n      }\n    },\n\n    handleTouchStart(e) {\n      let touch = e.changedTouches[0];\n      this._touchParams = {\n        pageY: touch.screenY,\n        startY: touch.screenY,\n        lastPageY: touch.screenY,\n        timeStamp: e.timeStamp,\n        direction: -1\n      };\n    },\n\n    handleTouchMove(e, bottomNav) {\n      let tp = this._touchParams;\n      let touch = e.changedTouches[0];\n      let offsetY;\n\n      // 安卓下滚动的时候经常不触发touchstart事件\n      if (!tp || tp.hasEnd) {\n        return (this._touchParams = {\n          pageY: touch.screenY,\n          startY: touch.screenY,\n          lastPageY: touch.screenY,\n          timeStamp: e.timeStamp,\n          direction: -1\n        });\n      }\n\n      offsetY = touch.screenY - tp.pageY;\n\n      tp.lastPageY = tp.pageY;\n      tp.lastDirection = tp.direction;\n      tp.direction = offsetY > 0 ? 1 : -1;\n\n      if (tp.lastDirection !== tp.direction) {\n        tp.startY = tp.lastPageY;\n      }\n\n      tp.pageY = touch.screenY;\n      tp.offsetY = tp.pageY - tp.startY;\n\n      if (!this.__scrollable && bottomNav) {\n        if (tp.offsetY <= -OFFSET_ACCURACY) {\n          bottomNav.slideOut();\n        } else if (tp.offsetY >= OFFSET_ACCURACY) {\n          bottomNav.slideIn();\n        }\n      }\n    },\n\n    handleTouchEnd() {\n      let tp = this._touchParams;\n      tp && (tp.hasEnd = true);\n    },\n\n    handleScroll(e, scroller, topNav, bottomNav, startThreshold, moveThreshold = 5) {\n      let scrollY = e.contentOffset.y;\n      let nav = topNav || bottomNav;\n      let scrollFn = (maxScrollY) => {\n        if (-scrollY > maxScrollY) { return; }\n        maxScrollY = Math.abs(maxScrollY);\n        if (Math.abs(scrollY) < startThreshold) {\n          if (Math.abs(scrollY) >= maxScrollY - OFFSET_ACCURACY) {\n            let tp = this._touchParams;\n            if (!tp) { return; }\n            let offsetY = tp.offsetY;\n             if (offsetY < -OFFSET_ACCURACY) {\n               bottomNav && bottomNav.slideOut();\n             } else if (offsetY > OFFSET_ACCURACY) {\n               bottomNav && bottomNav.slideIn();\n            }\n          } else {\n            topNav && topNav.slideIn();\n            bottomNav && bottomNav.slideIn();\n          }\n        } else {\n          let tp = this._touchParams;\n          if (!tp) { return; }\n          let offsetY = tp.offsetY;\n          if (Math.abs(offsetY) >= moveThreshold) {\n            if (offsetY > 0) {\n              topNav && topNav.slideIn();\n              bottomNav && bottomNav.slideIn();\n            } else {\n              topNav && topNav.slideOut();\n              bottomNav && bottomNav.slideOut();\n            }\n          }\n        }\n      };\n\n      let maxScrollYCheck = (maxScrollY) => {\n        if (!this.__scrollable) { return; }\n        if (startThreshold) {\n          scrollFn(maxScrollY);\n        } else {\n          nav.getHeight((navHeight) => {\n            startThreshold = navHeight;\n            scrollFn(maxScrollY);\n          });\n        }\n      };\n\n      if (!nav) { return; }\n\n      _getHeight(scroller, (scrollerHeight) => {\n        let maxScrollY = e.contentSize.height - scrollerHeight;\n        this.__scrollable = maxScrollY >= OFFSET_ACCURACY;\n\n        if (bottomNav) {\n          bottomNav.getHeight((height) => {\n            this.__scrollable = maxScrollY >= height;\n            maxScrollYCheck(maxScrollY);\n          });\n        } else {\n          maxScrollYCheck(maxScrollY);\n        }\n      });\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var DOM = weex.requireModule('dom');
// const Modal = weex.requireModule('modal');
var Animation = weex.requireModule('animation');
var OFFSET_ACCURACY = 10;
var SCALE = weex.config.env.platform.toLowerCase() === 'web' ? 2 : 1;

function _toNum(str) {
  return typeof str === 'number' ? str : parseFloat((str || '').replace(/px$/i, ''));
}

function _getHeight(element, callback) {
  if (!element) {
    return;
  }
  if (element.__cacheHeight) {
    element.__cacheHeight && callback && callback(element.__cacheHeight);
  } else {
    DOM.getComponentRect(element, function (res) {
      var height = (parseFloat(res && res.size && res.size.height) || 0) / SCALE;
      height && callback && callback(element.__cacheHeight = height);
    });
  }
}

exports.default = {

  props: {
    position: {
      'type': String,
      'default': 'top'
    },

    height: [String, Number]
  },

  data: function data() {
    return {
      visible: true
    };
  },


  watch: {
    visible: function visible(newVal) {
      newVal ? this._slideIn() : this._slideOut();
    }
  },

  created: function created() {
    this._height = _toNum(this.height) || 0;
    this._isBottom = this.position === 'bottom';
    this._direction = this._isBottom ? 1 : -1;
  },


  methods: {
    _slideOut: function _slideOut() {
      var _this = this;

      this.getHeight(function (height) {
        _this.$emit('slideOut');
        _this.slideY(height * _this._direction * SCALE, function () {
          _this.$emit('slideOutEnd');
        });
      });
    },
    _slideIn: function _slideIn() {
      var _this2 = this;

      this.getHeight(function (height) {
        _this2.$emit('slideIn');
        _this2.slideY(0, function () {
          _this2.$emit('slideInEnd');
        });
      });
    },
    getHeight: function getHeight(callback) {
      return _getHeight(this.$refs.wrapper, callback);
    },
    slideOut: function slideOut() {
      this.visible = false;
    },
    slideIn: function slideIn() {
      this.visible = true;
    },
    slideY: function slideY(y, callback) {
      Animation.transition(this.$refs.wrapper, {
        styles: { transform: 'translateY(' + y + 'px)' },
        duration: 150, //ms
        timingFunction: 'ease',
        delay: 0 //ms
      }, callback);
    }
  },

  handleTouchStart: function handleTouchStart(e) {
    var touch = e.changedTouches[0];
    this._touchParams = {
      pageY: touch.screenY,
      startY: touch.screenY,
      lastPageY: touch.screenY,
      timeStamp: e.timeStamp,
      direction: -1
    };
  },
  handleTouchMove: function handleTouchMove(e, bottomNav) {
    var tp = this._touchParams;
    var touch = e.changedTouches[0];
    var offsetY = void 0;

    // 安卓下滚动的时候经常不触发touchstart事件
    if (!tp || tp.hasEnd) {
      return this._touchParams = {
        pageY: touch.screenY,
        startY: touch.screenY,
        lastPageY: touch.screenY,
        timeStamp: e.timeStamp,
        direction: -1
      };
    }

    offsetY = touch.screenY - tp.pageY;

    tp.lastPageY = tp.pageY;
    tp.lastDirection = tp.direction;
    tp.direction = offsetY > 0 ? 1 : -1;

    if (tp.lastDirection !== tp.direction) {
      tp.startY = tp.lastPageY;
    }

    tp.pageY = touch.screenY;
    tp.offsetY = tp.pageY - tp.startY;

    if (!this.__scrollable && bottomNav) {
      if (tp.offsetY <= -OFFSET_ACCURACY) {
        bottomNav.slideOut();
      } else if (tp.offsetY >= OFFSET_ACCURACY) {
        bottomNav.slideIn();
      }
    }
  },
  handleTouchEnd: function handleTouchEnd() {
    var tp = this._touchParams;
    tp && (tp.hasEnd = true);
  },
  handleScroll: function handleScroll(e, scroller, topNav, bottomNav, startThreshold) {
    var _this3 = this;

    var moveThreshold = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 5;

    var scrollY = e.contentOffset.y;
    var nav = topNav || bottomNav;
    var scrollFn = function scrollFn(maxScrollY) {
      if (-scrollY > maxScrollY) {
        return;
      }
      maxScrollY = Math.abs(maxScrollY);
      if (Math.abs(scrollY) < startThreshold) {
        if (Math.abs(scrollY) >= maxScrollY - OFFSET_ACCURACY) {
          var tp = _this3._touchParams;
          if (!tp) {
            return;
          }
          var offsetY = tp.offsetY;
          if (offsetY < -OFFSET_ACCURACY) {
            bottomNav && bottomNav.slideOut();
          } else if (offsetY > OFFSET_ACCURACY) {
            bottomNav && bottomNav.slideIn();
          }
        } else {
          topNav && topNav.slideIn();
          bottomNav && bottomNav.slideIn();
        }
      } else {
        var _tp = _this3._touchParams;
        if (!_tp) {
          return;
        }
        var _offsetY = _tp.offsetY;
        if (Math.abs(_offsetY) >= moveThreshold) {
          if (_offsetY > 0) {
            topNav && topNav.slideIn();
            bottomNav && bottomNav.slideIn();
          } else {
            topNav && topNav.slideOut();
            bottomNav && bottomNav.slideOut();
          }
        }
      }
    };

    var maxScrollYCheck = function maxScrollYCheck(maxScrollY) {
      if (!_this3.__scrollable) {
        return;
      }
      if (startThreshold) {
        scrollFn(maxScrollY);
      } else {
        nav.getHeight(function (navHeight) {
          startThreshold = navHeight;
          scrollFn(maxScrollY);
        });
      }
    };

    if (!nav) {
      return;
    }

    _getHeight(scroller, function (scrollerHeight) {
      var maxScrollY = e.contentSize.height - scrollerHeight;
      _this3.__scrollable = maxScrollY >= OFFSET_ACCURACY;

      if (bottomNav) {
        bottomNav.getHeight(function (height) {
          _this3.__scrollable = maxScrollY >= height;
          maxScrollYCheck(maxScrollY);
        });
      } else {
        maxScrollYCheck(maxScrollY);
      }
    });
  }
};

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "wrapper",
    staticClass: "slide-nav",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1983b04c", module.exports)
  }
}

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(223);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(224)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(226),
  /* template */
  __webpack_require__(228),
  /* scopeId */
  "data-v-1797400a",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-slider-bar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1797400a", Component.options)
  } else {
    hotAPI.reload("data-v-1797400a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(225);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3b396fff", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1797400a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1797400a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-slider-bar[data-v-1797400a] {\n  user-select: none;\n}\n.slider-bar-container[data-v-1797400a] {\n  height: 56px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.value-bar[data-v-1797400a] {\n  height: 4px;\n}\n.slide-block[data-v-1797400a] {\n  width: 56px;\n  height: 56px;\n  background-color: #fff;\n  border-radius: 28px;\n  border-width: 1px;\n  border-color: rgba(0, 0, 0, .1);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);\n  position: absolute;\n  left: 0;\n  bottom: 0;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-slider-bar/index.vue?03d5c308"],"names":[],"mappings":";AAmbA;EACA,kBAAA;CACA;AACA;EACA,aAAA;EACA,cAAA;EACA,wBAAA;EACA,oBAAA;CACA;AACA;EACA,YAAA;CACA;AACA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,oBAAA;EACA,kBAAA;EACA,gCAAA;EACA,2CAAA;EACA,mBAAA;EACA,QAAA;EACA,UAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by 走鹃 on 2017-05-09. -->\n\n<template>\n  <div class=\"wxc-slider-bar\">\n    <div\n      ref=\"bar-container\"\n      class=\"slider-bar-container\"\n      :style=\"containerStyle\">\n      <div\n        class=\"range-bar\"\n        :style=\"rangeBarStyle\">\n        <div\n          ref=\"value-bar\"\n          class=\"value-bar\"\n          :style=\"valueBarStyle\"><div></div></div>\n      </div>\n      <div\n        ref=\"slide-block-1\"\n        class=\"slide-block\"\n        @touchstart=\"_weexStartHandler1\"\n        @panstart=\"_webStartHandler\"\n        @panmove=\"_webMoveHandler1\"\n        @touchend=\"_weexEndHandler\"\n        @horizontalpan=\"dispatchPan\"\n        :prevent-move-event=\"preventMoveEvent\"\n        :style=\"blockStyle1\"><div></div>\n      </div>\n      <div\n        v-if=\"range\"\n        ref=\"slide-block-2\"\n        class=\"slide-block\"\n        @touchstart=\"_weexStartHandler2\"\n        @panstart=\"_webStartHandler\"\n        @panmove=\"_webMoveHandler2\"\n        @touchend=\"_weexEndHandler\"\n        @horizontalpan=\"dispatchPan\"\n        :prevent-move-event=\"preventMoveEvent\"\n        :style=\"blockStyle2\"><div></div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\n  const Utils = require('./utils');\n  const EB = weex.requireModule('expressionBinding');\n  const animation = weex.requireModule('animation');\n  const dom = weex.requireModule('dom');\n\n  export default {\n    data: () => ({\n      env: 'weex',\n      diffX1: 0,\n      diffX2: 0,\n      barWidth: 0,\n      preventMoveEvent: true,\n      timeout: 100,\n      minDiffX: 0,\n      selectRange: [0, 0]\n    }),\n    props: {\n      length: {\n        type: Number,\n        default: 500\n      },\n      height: {\n        type: Number,\n        default: 4\n      },\n      // 是否双滑块模式\n      range: {\n        type: Boolean,\n        default: false\n      },\n      // 最小值\n      min: {\n        type: Number,\n        default: 0\n      },\n      // 最大值\n      max: {\n        type: Number,\n        default: 100\n      },\n      // 最小取值范围，用于范围选择范围最小差值\n      minDiff: {\n        type: Number,\n        default: 5\n      },\n      // 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number]\n      value: {\n        type: [Number, Array],\n        default: 0\n      },\n      // 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number]\n      defaultValue: {\n        type: [Number, Array],\n        default: 0\n      },\n      // 值为 true 时，滑块为禁用状态\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      invalidColor: {\n        type: String,\n        default: '#E0E0E0'\n      },\n      validColor: {\n        type: String,\n        default: '#EE9900'\n      },\n      disabledColor: {\n        type: String,\n        default: '#AAA'\n      }\n    },\n    created () {\n      if (Utils.env.isWeb()) {\n        this.env = 'web';\n      }\n    },\n    mounted () {\n      this.block1 = this.$refs['slide-block-1'];        // 左侧滑块\n      this.block2 = this.$refs['slide-block-2'];        // 右侧滑块\n      this.valueBar = this.$refs['value-bar'];          // 黄色值条\n      this.barContainer = this.$refs['bar-container'];  // 滚动条容器\n\n      if (!this.range) {\n        this.diffX1 = this._getDiffX(this.value || this.defaultValue);\n      } else {\n        this.diffX1 = this._getDiffX(this.value[0] || this.defaultValue[0]);\n        this.diffX2 = this._getDiffX(this.value[1] || this.defaultValue[1]);\n        this.barWidth = this.diffX2 - this.diffX1;\n      }\n      // 是否支持expresstionBinding\n      if (Utils.env.supportsEB()) {\n        this.block1 && EB.enableBinding(this.block1.ref, 'pan');\n        this.block2 && EB.enableBinding(this.block2.ref, 'pan');\n        this.valueBar && EB.enableBinding(this.valueBar.ref, 'pan');\n      }\n      if (Utils.env.isAndroid()) {\n        this.timeout = 250;\n      }\n      if (this.range) {\n        this.selectRange = this.value || this.defaultValue;                    // 初始化范围选择返回数据\n        this.minDiffX = (this.minDiff / (this.max - this.min)) * this.length;  // 滑块1、2之前最小间距\n      }\n      // 由于weex在mounted后渲染是异步的不能确保元素渲染完成，需要异步执行\n      setTimeout(() => {\n        dom.getComponentRect(this.barContainer, option => {\n          const { left } = option.size;\n          this.leftDiffX = left;\n        });\n      }, 100);\n\n      this.bindExp();\n    },\n    computed: {\n      containerStyle () {\n        return {\n          width: this.length + 56 + 'px',\n          height: '56px'\n        };\n      },\n      rangeBarStyle () {\n        return {\n          width: this.length + 'px',\n          height: this.height + 'px',\n          flexDirection: 'row',\n          backgroundColor: this.invalidColor,\n          overflow: 'hidden'\n        };\n      },\n      valueBarStyle () {\n        let left = 0;\n        let width = 0\n        if (!this.range) {\n          width = this.diffX1;\n        } else {\n          left = this.diffX1;\n          width = this.diffX2 - this.diffX1;\n        }\n        return {\n          width: width + 'px',\n          height: this.height + 'px',\n          transform: `translateX(${left}px)`,\n          backgroundColor: this.disabled ? this.disabledColor : this.validColor\n        };\n      },\n      blockStyle1 () {\n        return {\n          transform: `translateX(${this.diffX1}px)`\n        };\n      },\n      blockStyle2 () {\n        return {\n          transform: `translateX(${this.diffX2}px)`\n        }\n      }\n    },\n    methods: {\n      dispatchPan () {},\n\n      // 更新单选值或最小值\n      _weexStartHandler1 () {\n        this.firstInterval = setInterval(() => {\n          if (!this.range) {\n            dom.getComponentRect(this.valueBar, option => {\n              const { width } = option.size;\n              const value = this._getValue(width);\n              this.$emit('updateValue', value);\n            });\n          } else {\n            dom.getComponentRect(this.block1, option => {\n              const { left } = option.size;\n              this.selectRange[0] = this._getValue(left - this.leftDiffX);\n              this.$emit('updateValue', this.selectRange);\n            });\n          }\n        }, this.timeout);\n      },\n\n      // 更新最大值\n      _weexStartHandler2 () {\n        this.secondInterval = setInterval(() => {\n          dom.getComponentRect(this.block2, option => {\n            const { left } = option.size;\n            this.selectRange[1] = this._getValue(left - this.leftDiffX);\n            this.$emit('updateValue', this.selectRange);\n          });\n        }, this.timeout);\n      },\n\n      // 清除定时器\n      _weexEndHandler () {\n        this.firstInterval && clearInterval(this.firstInterval);\n        this.secondInterval && clearInterval(this.secondInterval);\n      },\n\n      _webStartHandler (e) {\n        if (this.env === 'weex') {\n          return;\n        }\n        this.startX = e.touch.clientX;\n        this.startDiffX1 = this.diffX1;\n        this.startDiffX2 = this.diffX2;\n      },\n\n      _webMoveHandler1 (e) {\n        if (this.env === 'weex' || this.disabled) {\n          return;\n        }\n        const deltaX = e.touch.clientX - this.startX;\n        const diff = this.startDiffX1 + deltaX;\n        let max = this.length;\n        if (this.range) {\n          max = this.diffX2 - this.minDiffX;\n        }\n        if (diff > 0 && diff < max) {\n          this.diffX1 = diff;\n          animation.transition(this.block1, {\n            styles: {\n              transform: `translateX(${this.diffX1}px)`\n            }\n          }, () => {});\n          if (!this.range) {\n            this.$emit('updateValue', this._getValue(this.diffX1));\n          } else {\n            this.selectRange[0] = this._getValue(this.diffX1);\n            this.$emit('updateValue', this.selectRange);\n          }\n        }\n      },\n\n      _webMoveHandler2 (e) {\n        if (this.env === 'weex' || this.disabled) {\n          return;\n        }\n        const deltaX = e.touch.clientX - this.startX;\n        const diff = this.startDiffX2 + deltaX;\n        const min = this.diffX1 + this.minDiffX;\n        const max = this.length;\n        if (diff > min && diff < max) {\n          this.diffX2 = diff;\n          animation.transition(this.block2, {\n            styles: {\n              transform: `translateX(${this.diffX2}px)`\n            }\n          }, () => {});\n          if (!this.range) {\n            this.$emit('updateValue', this._getValue(this.diffX2));\n          } else {\n            this.selectRange[1] = this._getValue(this.diffX2);\n            this.$emit('updateValue', this.selectRange);\n          }\n        }\n      },\n\n      bindExp () {\n        const self = this;\n\n        // 如果禁用，不行进行表达式绑定\n        if (self.disabled) { return; }\n\n        // 初始化按钮&条的大小范围\n        let blockMax1 = 0;\n        if (self.range) {\n          blockMax1 = self.diffX2 - self.minDiffX;\n        } else {\n          blockMax1 = self.length;\n        }\n\n        const blockMax2 = self.length;\n        const blockMin2 = self.diffX1 + self.minDiffX;\n        const barMax1 = self.diffX2;\n        const barMax2 = self.length - self.diffX1;\n\n        // 滑块1表达式\n        var expBlock1 = `{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"min\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${blockMax1}},{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"max\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"+\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"x\\\"},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${self.diffX1}}]},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":0}]}]}]}]}`;\n        // 滑块2表达式\n        var expBlock2 = `{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"min\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${blockMax2}},{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"max\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"+\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"x\\\"},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${self.diffX2}}]},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${blockMin2}}]}]}]}]}`;\n        // valuebar表达式\n        var expBar1 = `{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"min\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${barMax1}},{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"max\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":0},{\\\"type\\\":\\\"-\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${self.barWidth}},{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"x\\\"}]}]}]}]}]}`;\n        // valuebar 范围表达式\n        var expBar2 = `{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"min\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${barMax2}},{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"max\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":0},{\\\"type\\\":\\\"+\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${self.barWidth}},{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"x\\\"}]}]}]}]}]}`;\n\n        if (!self.range) {\n          // 单选\n          const args = [{\n            element: self.block1.ref,\n            property: 'transform.translateX',\n            expression: expBlock1\n          }, {\n            element: self.valueBar.ref,\n            property: 'width',\n            expression: expBlock1\n          }];\n          EB && EB.createBinding(self.block1.ref, 'pan', '', args, e => {\n            if (e.state === 'end') {\n              const range = self.getRange();\n              // 限制diffX1范围\n              self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);\n              self.bindExp();\n            }\n          });\n        } else {\n          // 选范围\n          const args = [{\n            element: self.block1.ref,\n            property: 'transform.translateX',\n            expression: expBlock1\n          }, {\n            element: self.valueBar.ref,\n            property: 'transform.translateX',\n            expression: expBlock1\n          }, {\n            element: self.valueBar.ref,\n            property: 'width',\n            expression: expBar1\n          }];\n\n          const args2 = [{\n            element: self.block2.ref,\n            property: 'transform.translateX',\n            expression: expBlock2\n          }, {\n            element: self.valueBar.ref,\n            property: 'width',\n            expression: expBar2\n          }];\n\n          EB && EB.createBinding(self.block1.ref, 'pan', '', args, e => {\n            if (e.state === 'end') {\n              const range = self.getRange();\n              self.barWidth = self._restrictValue(range.rangeX1, self.barWidth - e.deltaX);\n              self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);\n              self.bindExp();\n            }\n          });\n\n          EB && EB.createBinding(self.block2.ref, 'pan', '', args2, e => {\n            if (e.state === 'end') {\n              const range = self.getRange();\n              self.diffX2 = self._restrictValue(range.rangeX2, self.diffX2 + e.deltaX);\n              self.barWidth = self._restrictValue([0, self.length - self.diffX1], self.barWidth + e.deltaX);\n              self.bindExp();\n            }\n          });\n        }\n      },\n\n      // 获取diffx1 diffx2 取值范围\n      getRange (deltaX) {\n        if (!this.range) {\n          return {\n            rangeX1: [0, this.length]\n          }\n        } else {\n          return {\n            rangeX1: [0, this.diffX2 - this.minDiffX],\n            rangeX2: [this.diffX1 + this.minDiffX, this.length]\n          }\n        }\n      },\n\n      // 限制取值范围\n      _restrictValue (range, value) {\n        if (range && range.length && range.length === 2) {\n          if (value < range[0]) {\n            return range[0];\n          } else if (value > range[1]) {\n            return range[1];\n          } else {\n            return value;\n          }\n        }\n        return;\n      },\n\n      // 根据x方向偏移量计算value\n      _getValue (diffX) {\n        return Math.round((diffX / this.length) * (this.max - this.min) + this.min);\n      },\n\n      // 根据value和length计算x方向偏移值\n      _getDiffX (value) {\n        return ((value - this.min) / (this.max - this.min)) * this.length;\n      }\n    }\n  }\n</script>\n\n<style scoped>\n  .wxc-slider-bar {\n    user-select: none;\n  }\n  .slider-bar-container {\n    height: 56px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  .value-bar {\n    height: 4px;\n  }\n  .slide-block {\n    width: 56px;\n    height: 56px;\n    background-color: #fff;\n    border-radius: 28px;\n    border-width: 1px;\n    border-color: rgba(0, 0, 0, .1);\n    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);\n    position: absolute;\n    left: 0;\n    bottom: 0;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Utils = __webpack_require__(227);
var EB = weex.requireModule('expressionBinding');
var animation = weex.requireModule('animation');
var dom = weex.requireModule('dom');

exports.default = {
  data: function data() {
    return {
      env: 'weex',
      diffX1: 0,
      diffX2: 0,
      barWidth: 0,
      preventMoveEvent: true,
      timeout: 100,
      minDiffX: 0,
      selectRange: [0, 0]
    };
  },
  props: {
    length: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 4
    },
    // 是否双滑块模式
    range: {
      type: Boolean,
      default: false
    },
    // 最小值
    min: {
      type: Number,
      default: 0
    },
    // 最大值
    max: {
      type: Number,
      default: 100
    },
    // 最小取值范围，用于范围选择范围最小差值
    minDiff: {
      type: Number,
      default: 5
    },
    // 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number]
    value: {
      type: [Number, Array],
      default: 0
    },
    // 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number]
    defaultValue: {
      type: [Number, Array],
      default: 0
    },
    // 值为 true 时，滑块为禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    invalidColor: {
      type: String,
      default: '#E0E0E0'
    },
    validColor: {
      type: String,
      default: '#EE9900'
    },
    disabledColor: {
      type: String,
      default: '#AAA'
    }
  },
  created: function created() {
    if (Utils.env.isWeb()) {
      this.env = 'web';
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.block1 = this.$refs['slide-block-1']; // 左侧滑块
    this.block2 = this.$refs['slide-block-2']; // 右侧滑块
    this.valueBar = this.$refs['value-bar']; // 黄色值条
    this.barContainer = this.$refs['bar-container']; // 滚动条容器

    if (!this.range) {
      this.diffX1 = this._getDiffX(this.value || this.defaultValue);
    } else {
      this.diffX1 = this._getDiffX(this.value[0] || this.defaultValue[0]);
      this.diffX2 = this._getDiffX(this.value[1] || this.defaultValue[1]);
      this.barWidth = this.diffX2 - this.diffX1;
    }
    // 是否支持expresstionBinding
    if (Utils.env.supportsEB()) {
      this.block1 && EB.enableBinding(this.block1.ref, 'pan');
      this.block2 && EB.enableBinding(this.block2.ref, 'pan');
      this.valueBar && EB.enableBinding(this.valueBar.ref, 'pan');
    }
    if (Utils.env.isAndroid()) {
      this.timeout = 250;
    }
    if (this.range) {
      this.selectRange = this.value || this.defaultValue; // 初始化范围选择返回数据
      this.minDiffX = this.minDiff / (this.max - this.min) * this.length; // 滑块1、2之前最小间距
    }
    // 由于weex在mounted后渲染是异步的不能确保元素渲染完成，需要异步执行
    setTimeout(function () {
      dom.getComponentRect(_this.barContainer, function (option) {
        var left = option.size.left;

        _this.leftDiffX = left;
      });
    }, 100);

    this.bindExp();
  },

  computed: {
    containerStyle: function containerStyle() {
      return {
        width: this.length + 56 + 'px',
        height: '56px'
      };
    },
    rangeBarStyle: function rangeBarStyle() {
      return {
        width: this.length + 'px',
        height: this.height + 'px',
        flexDirection: 'row',
        backgroundColor: this.invalidColor,
        overflow: 'hidden'
      };
    },
    valueBarStyle: function valueBarStyle() {
      var left = 0;
      var width = 0;
      if (!this.range) {
        width = this.diffX1;
      } else {
        left = this.diffX1;
        width = this.diffX2 - this.diffX1;
      }
      return {
        width: width + 'px',
        height: this.height + 'px',
        transform: 'translateX(' + left + 'px)',
        backgroundColor: this.disabled ? this.disabledColor : this.validColor
      };
    },
    blockStyle1: function blockStyle1() {
      return {
        transform: 'translateX(' + this.diffX1 + 'px)'
      };
    },
    blockStyle2: function blockStyle2() {
      return {
        transform: 'translateX(' + this.diffX2 + 'px)'
      };
    }
  },
  methods: {
    dispatchPan: function dispatchPan() {},


    // 更新单选值或最小值
    _weexStartHandler1: function _weexStartHandler1() {
      var _this2 = this;

      this.firstInterval = setInterval(function () {
        if (!_this2.range) {
          dom.getComponentRect(_this2.valueBar, function (option) {
            var width = option.size.width;

            var value = _this2._getValue(width);
            _this2.$emit('updateValue', value);
          });
        } else {
          dom.getComponentRect(_this2.block1, function (option) {
            var left = option.size.left;

            _this2.selectRange[0] = _this2._getValue(left - _this2.leftDiffX);
            _this2.$emit('updateValue', _this2.selectRange);
          });
        }
      }, this.timeout);
    },


    // 更新最大值
    _weexStartHandler2: function _weexStartHandler2() {
      var _this3 = this;

      this.secondInterval = setInterval(function () {
        dom.getComponentRect(_this3.block2, function (option) {
          var left = option.size.left;

          _this3.selectRange[1] = _this3._getValue(left - _this3.leftDiffX);
          _this3.$emit('updateValue', _this3.selectRange);
        });
      }, this.timeout);
    },


    // 清除定时器
    _weexEndHandler: function _weexEndHandler() {
      this.firstInterval && clearInterval(this.firstInterval);
      this.secondInterval && clearInterval(this.secondInterval);
    },
    _webStartHandler: function _webStartHandler(e) {
      if (this.env === 'weex') {
        return;
      }
      this.startX = e.touch.clientX;
      this.startDiffX1 = this.diffX1;
      this.startDiffX2 = this.diffX2;
    },
    _webMoveHandler1: function _webMoveHandler1(e) {
      if (this.env === 'weex' || this.disabled) {
        return;
      }
      var deltaX = e.touch.clientX - this.startX;
      var diff = this.startDiffX1 + deltaX;
      var max = this.length;
      if (this.range) {
        max = this.diffX2 - this.minDiffX;
      }
      if (diff > 0 && diff < max) {
        this.diffX1 = diff;
        animation.transition(this.block1, {
          styles: {
            transform: 'translateX(' + this.diffX1 + 'px)'
          }
        }, function () {});
        if (!this.range) {
          this.$emit('updateValue', this._getValue(this.diffX1));
        } else {
          this.selectRange[0] = this._getValue(this.diffX1);
          this.$emit('updateValue', this.selectRange);
        }
      }
    },
    _webMoveHandler2: function _webMoveHandler2(e) {
      if (this.env === 'weex' || this.disabled) {
        return;
      }
      var deltaX = e.touch.clientX - this.startX;
      var diff = this.startDiffX2 + deltaX;
      var min = this.diffX1 + this.minDiffX;
      var max = this.length;
      if (diff > min && diff < max) {
        this.diffX2 = diff;
        animation.transition(this.block2, {
          styles: {
            transform: 'translateX(' + this.diffX2 + 'px)'
          }
        }, function () {});
        if (!this.range) {
          this.$emit('updateValue', this._getValue(this.diffX2));
        } else {
          this.selectRange[1] = this._getValue(this.diffX2);
          this.$emit('updateValue', this.selectRange);
        }
      }
    },
    bindExp: function bindExp() {
      var self = this;

      // 如果禁用，不行进行表达式绑定
      if (self.disabled) {
        return;
      }

      // 初始化按钮&条的大小范围
      var blockMax1 = 0;
      if (self.range) {
        blockMax1 = self.diffX2 - self.minDiffX;
      } else {
        blockMax1 = self.length;
      }

      var blockMax2 = self.length;
      var blockMin2 = self.diffX1 + self.minDiffX;
      var barMax1 = self.diffX2;
      var barMax2 = self.length - self.diffX1;

      // 滑块1表达式
      var expBlock1 = '{"type":"CallExpression","children":[{"type":"Identifier","value":"min"},{"type":"Arguments","children":[{"type":"NumericLiteral","value":' + blockMax1 + '},{"type":"CallExpression","children":[{"type":"Identifier","value":"max"},{"type":"Arguments","children":[{"type":"+","children":[{"type":"Identifier","value":"x"},{"type":"NumericLiteral","value":' + self.diffX1 + '}]},{"type":"NumericLiteral","value":0}]}]}]}]}';
      // 滑块2表达式
      var expBlock2 = '{"type":"CallExpression","children":[{"type":"Identifier","value":"min"},{"type":"Arguments","children":[{"type":"NumericLiteral","value":' + blockMax2 + '},{"type":"CallExpression","children":[{"type":"Identifier","value":"max"},{"type":"Arguments","children":[{"type":"+","children":[{"type":"Identifier","value":"x"},{"type":"NumericLiteral","value":' + self.diffX2 + '}]},{"type":"NumericLiteral","value":' + blockMin2 + '}]}]}]}]}';
      // valuebar表达式
      var expBar1 = '{"type":"CallExpression","children":[{"type":"Identifier","value":"min"},{"type":"Arguments","children":[{"type":"NumericLiteral","value":' + barMax1 + '},{"type":"CallExpression","children":[{"type":"Identifier","value":"max"},{"type":"Arguments","children":[{"type":"NumericLiteral","value":0},{"type":"-","children":[{"type":"NumericLiteral","value":' + self.barWidth + '},{"type":"Identifier","value":"x"}]}]}]}]}]}';
      // valuebar 范围表达式
      var expBar2 = '{"type":"CallExpression","children":[{"type":"Identifier","value":"min"},{"type":"Arguments","children":[{"type":"NumericLiteral","value":' + barMax2 + '},{"type":"CallExpression","children":[{"type":"Identifier","value":"max"},{"type":"Arguments","children":[{"type":"NumericLiteral","value":0},{"type":"+","children":[{"type":"NumericLiteral","value":' + self.barWidth + '},{"type":"Identifier","value":"x"}]}]}]}]}]}';

      if (!self.range) {
        // 单选
        var args = [{
          element: self.block1.ref,
          property: 'transform.translateX',
          expression: expBlock1
        }, {
          element: self.valueBar.ref,
          property: 'width',
          expression: expBlock1
        }];
        EB && EB.createBinding(self.block1.ref, 'pan', '', args, function (e) {
          if (e.state === 'end') {
            var range = self.getRange();
            // 限制diffX1范围
            self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);
            self.bindExp();
          }
        });
      } else {
        // 选范围
        var _args = [{
          element: self.block1.ref,
          property: 'transform.translateX',
          expression: expBlock1
        }, {
          element: self.valueBar.ref,
          property: 'transform.translateX',
          expression: expBlock1
        }, {
          element: self.valueBar.ref,
          property: 'width',
          expression: expBar1
        }];

        var args2 = [{
          element: self.block2.ref,
          property: 'transform.translateX',
          expression: expBlock2
        }, {
          element: self.valueBar.ref,
          property: 'width',
          expression: expBar2
        }];

        EB && EB.createBinding(self.block1.ref, 'pan', '', _args, function (e) {
          if (e.state === 'end') {
            var range = self.getRange();
            self.barWidth = self._restrictValue(range.rangeX1, self.barWidth - e.deltaX);
            self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);
            self.bindExp();
          }
        });

        EB && EB.createBinding(self.block2.ref, 'pan', '', args2, function (e) {
          if (e.state === 'end') {
            var range = self.getRange();
            self.diffX2 = self._restrictValue(range.rangeX2, self.diffX2 + e.deltaX);
            self.barWidth = self._restrictValue([0, self.length - self.diffX1], self.barWidth + e.deltaX);
            self.bindExp();
          }
        });
      }
    },


    // 获取diffx1 diffx2 取值范围
    getRange: function getRange(deltaX) {
      if (!this.range) {
        return {
          rangeX1: [0, this.length]
        };
      } else {
        return {
          rangeX1: [0, this.diffX2 - this.minDiffX],
          rangeX2: [this.diffX1 + this.minDiffX, this.length]
        };
      }
    },


    // 限制取值范围
    _restrictValue: function _restrictValue(range, value) {
      if (range && range.length && range.length === 2) {
        if (value < range[0]) {
          return range[0];
        } else if (value > range[1]) {
          return range[1];
        } else {
          return value;
        }
      }
      return;
    },


    // 根据x方向偏移量计算value
    _getValue: function _getValue(diffX) {
      return Math.round(diffX / this.length * (this.max - this.min) + this.min);
    },


    // 根据value和length计算x方向偏移值
    _getDiffX: function _getDiffX(value) {
      return (value - this.min) / (this.max - this.min) * this.length;
    }
  }
};

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 工具方法库
 * @namespace Utils
 * @example
 *
 */
var Utils = {

  env: {

    /**
     * 是否是手淘容器
     * @method
     * @memberOf Utils.env
     * @returns {boolean}
     * @example
     *
     * const isTaobao = env.isTaobao();
     */
    isTaobao: function isTaobao() {
      var appName = weex.config.env.appName;

      return (/(tb|taobao|淘宝)/i.test(appName)
      );
    },


    /**
     * 是否是旅客容器
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isTrip = env.isTrip();
     */
    isTrip: function isTrip() {
      var appName = weex.config.env.appName;

      return appName === 'LX';
    },

    /**
     * 是否是 web 环境
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isWeb = env.isWeb();
     */
    isWeb: function isWeb() {
      var platform = weex.config.env.platform;

      return (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
    },

    /**
     * 是否是 iOS 系统
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isIOS = env.isIOS();
     */
    isIOS: function isIOS() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'ios';
    },

    /**
     * 是否是 Android 系统
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isAndroid = env.isAndroid();
     */
    isAndroid: function isAndroid() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'android';
    },


    /**
     * 是否是支付宝容器
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isAlipay = env.isAlipay();
     */
    isAlipay: function isAlipay() {
      var appName = weex.config.env.appName;

      return appName === 'AP';
    },


    /**
     * 是否是支付宝H5容器(防止以后支付宝接入weex)
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isAlipayWeb = env.isAlipayWeb();
     */
    isAlipayWeb: function isAlipayWeb() {
      return Utils.env.isAlipay() && Utils.env.isWeb();
    },


    /**
     * 判断是否支持expressionBinding
     * 当weex版本大于0.10.1.6，为客户端即可以支持expressionBinding
     * @returns {Boolean}
     */
    supportsEB: function supportsEB() {
      var weexVersion = weex.config.env.weexVersion || '0';
      var isHighWeex = Utils.compareVersion(weexVersion, '0.10.1.4') && (Utils.env.isIOS() || Utils.env.isAndroid());
      var expressionBinding = weex.requireModule('expressionBinding');
      return expressionBinding && expressionBinding.enableBinding && isHighWeex;
    },


    /**
     * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
     * @returns {boolean}
     */
    supportsEBForAndroid: function supportsEBForAndroid() {
      return Utils.env.isAndroid() && Utils.env.supportsEB();
    },


    /**
     * 判断IOS容器是否支持是否支持expressionBinding
     * @returns {boolean}
     */
    supportsEBForIos: function supportsEBForIos() {
      return Utils.env.isIOS() && Utils.env.supportsEB();
    },


    /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
    getPageHeight: function getPageHeight() {
      var env = weex.config.env;

      var navHeight = Utils.env.isWeb() ? 0 : 130;
      return env.deviceHeight / env.deviceWidth * 750 - navHeight;
    }
  },

  /**
   * 版本号比较
   * @memberOf Utils
   * @param currVer {string}
   * @param promoteVer {string}
   * @returns {boolean}
   * @example
   *
   * const { compareVersion } = Utils;
   * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
   */
  compareVersion: function compareVersion() {
    var currVer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "0.0.0";
    var promoteVer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "0.0.0";

    if (currVer === promoteVer) return true;
    var currVerArr = currVer.split(".");
    var promoteVerArr = promoteVer.split(".");
    var len = Math.max(currVerArr.length, promoteVerArr.length);
    for (var i = 0; i < len; i++) {
      var proVal = ~~promoteVerArr[i];
      var curVal = ~~currVerArr[i];
      if (proVal < curVal) {
        return true;
      } else if (proVal > curVal) {
        return false;
      }
    }
    return false;
  }
};

module.exports = Utils;

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-slider-bar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    ref: "bar-container",
    staticClass: "slider-bar-container",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.containerStyle))
  }, [_c('div', {
    staticClass: "range-bar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.rangeBarStyle))
  }, [_c('div', {
    ref: "value-bar",
    staticClass: "value-bar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.valueBarStyle))
  }, [_c('div')])]), _vm._v(" "), _c('div', {
    ref: "slide-block-1",
    staticClass: "slide-block",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.blockStyle1)),
    attrs: {
      "prevent-move-event": _vm.preventMoveEvent
    },
    on: {
      "touchstart": _vm._weexStartHandler1,
      "panstart": _vm._webStartHandler,
      "panmove": _vm._webMoveHandler1,
      "touchend": _vm._weexEndHandler,
      "horizontalpan": _vm.dispatchPan
    }
  }, [_c('div')]), _vm._v(" "), (_vm.range) ? _c('div', {
    ref: "slide-block-2",
    staticClass: "slide-block",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.blockStyle2)),
    attrs: {
      "prevent-move-event": _vm.preventMoveEvent
    },
    on: {
      "touchstart": _vm._weexStartHandler2,
      "panstart": _vm._webStartHandler,
      "panmove": _vm._webMoveHandler2,
      "touchend": _vm._weexEndHandler,
      "horizontalpan": _vm.dispatchPan
    }
  }, [_c('div')]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1797400a", module.exports)
  }
}

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(230);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(231)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(233),
  /* template */
  __webpack_require__(234),
  /* scopeId */
  "data-v-76fd3d24",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-stepper/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-76fd3d24", Component.options)
  } else {
    hotAPI.reload("data-v-76fd3d24", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(232);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1b34edfe", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-76fd3d24\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-76fd3d24\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-stepper[data-v-76fd3d24] {\n  flex-direction: row;\n}\n.stepper-plus[data-v-76fd3d24], .stepper-minus[data-v-76fd3d24] {\n  width: 56px;\n  height: 56px;\n  background-color: #ededed;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n}\n.stepper-input[data-v-76fd3d24] {\n  border-width: 0;\n  outline: none;\n  text-align: center;\n  color: #3d3d3d;\n  font-size: 30px;\n  line-height: 56px;\n  width: 86px;\n}\n.stepper-icon[data-v-76fd3d24] {\n  font-size: 36px;\n  color: #666666;\n  margin-top: -4px;\n}\n\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-stepper/index.vue?63d7336a"],"names":[],"mappings":";AAuBA;EACA,oBAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,0BAAA;EACA,oBAAA;EACA,wBAAA;EACA,mBAAA;CACA;AAEA;EACA,gBAAA;EACA,cAAA;EACA,mBAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,YAAA;CACA;AAEA;EACA,gBAAA;EACA,eAAA;EACA,iBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A Stepper-->\n\n<template>\n  <div class=\"wxc-stepper\">\n    <div class=\"stepper-minus\" @click=\"minusClicked\">\n      <text class=\"stepper-icon\" :style=\"{ color: isLess?'#cccccc':'#666666' }\">-</text>\n    </div>\n    <input class=\"stepper-input\"\n           type=\"number\"\n           :value=\"valueString\"\n           @input=\"onInput\"\n           @blur=\"onBlur\"\n           :style=\"disableStyle\"\n           :disabled=\"disabled||readOnly\"/>\n    <div class=\"stepper-plus\" @click=\"plusClicked\">\n      <text class=\"stepper-icon\" :style=\"{ color: isOver ? '#cccccc': '#666666' }\">+</text>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-stepper {\n    flex-direction: row;\n  }\n\n  .stepper-plus, .stepper-minus {\n    width: 56px;\n    height: 56px;\n    background-color: #ededed;\n    align-items: center;\n    justify-content: center;\n    border-radius: 6px;\n  }\n\n  .stepper-input {\n    border-width: 0;\n    outline: none;\n    text-align: center;\n    color: #3d3d3d;\n    font-size: 30px;\n    line-height: 56px;\n    width: 86px;\n  }\n\n  .stepper-icon {\n    font-size: 36px;\n    color: #666666;\n    margin-top: -4px;\n  }\n\n</style>\n\n<script>\n  module.exports = {\n    props: {\n      min: {\n        type: [String, Number],\n        default: 1\n      },\n      max: {\n        type: [String, Number],\n        default: 100\n      },\n      step: {\n        type: [String, Number],\n        default: 1\n      },\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      defaultValue: {\n        type: [String, Number],\n        default: 1\n      },\n      readOnly: {\n        type: Boolean,\n        default: false\n      }\n    },\n    computed: {\n      disableStyle () {\n        if (this.disabled) {\n          return {\n            color: '#cccccc'\n          }\n        }\n      },\n      valueString () {\n        return this.value.toString();\n      }\n    },\n    data: () => ({\n      value: 1,\n      isLess: false,\n      isOver: false\n    }),\n    created () {\n      const self = this;\n      self.value = parseInt(self.defaultValue, 10);\n      if (self.disabled) {\n        self.isLess = true;\n        self.isOver = true;\n      }\n    },\n    methods: {\n      minusClicked () {\n        const self = this;\n        if (self.disabled) {\n          return;\n        }\n        const isMinOver = self.value <= self.min;\n        const nowNum = self.value - parseInt(self.step, 10);\n        if (isMinOver) {\n          self.$emit('wxcStepperValueIsMinOver', { value: self.value });\n        } else {\n          self.value = nowNum;\n          self.resetDisabledStyle();\n        }\n        // 由于此处已经减step\n        if (nowNum <= self.min) {\n          self.value = parseInt(self.min, 10);\n          self.isLess = true;\n        }\n        self.$emit('wxcStepperValueChanged', { value: self.value });\n      },\n      plusClicked () {\n        const self = this;\n        if (self.disabled) {\n          return;\n        }\n        const isMaxOver = self.value >= self.max;\n        const nowNum = self.value + parseInt(self.step, 10);\n        if (isMaxOver) {\n          self.$emit('wxcStepperValueIsMaxOver', { value: self.value });\n        } else {\n          self.value = nowNum;\n          self.resetDisabledStyle();\n        }\n        // 由于此处已经加step\n        if (nowNum >= self.max) {\n          self.value = parseInt(self.max, 10);\n          self.isOver = true;\n        }\n        self.$emit('wxcStepperValueChanged', { value: self.value });\n      },\n      onInput (e) {\n        this.correctInputValue(e.value);\n      },\n      onBlur (e) {\n        this.correctInputValue(e.value);\n      },\n      correctInputValue (v) {\n        const self = this;\n        if (/^[1-9]\\d{0,}$/.test(v) && parseInt(v, 10) >= self.min && parseInt(v, 10) <= self.max) {\n          self.value = parseInt(v, 10);\n        }\n        self.$emit('wxcStepperValueChanged', { value: self.value });\n      },\n\n      resetDisabledStyle () {\n        this.isLess = false;\n        this.isOver = false;\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
  props: {
    min: {
      type: [String, Number],
      default: 1
    },
    max: {
      type: [String, Number],
      default: 100
    },
    step: {
      type: [String, Number],
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: [String, Number],
      default: 1
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    disableStyle: function disableStyle() {
      if (this.disabled) {
        return {
          color: '#cccccc'
        };
      }
    },
    valueString: function valueString() {
      return this.value.toString();
    }
  },
  data: function data() {
    return {
      value: 1,
      isLess: false,
      isOver: false
    };
  },
  created: function created() {
    var self = this;
    self.value = parseInt(self.defaultValue, 10);
    if (self.disabled) {
      self.isLess = true;
      self.isOver = true;
    }
  },

  methods: {
    minusClicked: function minusClicked() {
      var self = this;
      if (self.disabled) {
        return;
      }
      var isMinOver = self.value <= self.min;
      var nowNum = self.value - parseInt(self.step, 10);
      if (isMinOver) {
        self.$emit('wxcStepperValueIsMinOver', { value: self.value });
      } else {
        self.value = nowNum;
        self.resetDisabledStyle();
      }
      // 由于此处已经减step
      if (nowNum <= self.min) {
        self.value = parseInt(self.min, 10);
        self.isLess = true;
      }
      self.$emit('wxcStepperValueChanged', { value: self.value });
    },
    plusClicked: function plusClicked() {
      var self = this;
      if (self.disabled) {
        return;
      }
      var isMaxOver = self.value >= self.max;
      var nowNum = self.value + parseInt(self.step, 10);
      if (isMaxOver) {
        self.$emit('wxcStepperValueIsMaxOver', { value: self.value });
      } else {
        self.value = nowNum;
        self.resetDisabledStyle();
      }
      // 由于此处已经加step
      if (nowNum >= self.max) {
        self.value = parseInt(self.max, 10);
        self.isOver = true;
      }
      self.$emit('wxcStepperValueChanged', { value: self.value });
    },
    onInput: function onInput(e) {
      this.correctInputValue(e.value);
    },
    onBlur: function onBlur(e) {
      this.correctInputValue(e.value);
    },
    correctInputValue: function correctInputValue(v) {
      var self = this;
      if (/^[1-9]\d{0,}$/.test(v) && parseInt(v, 10) >= self.min && parseInt(v, 10) <= self.max) {
        self.value = parseInt(v, 10);
      }
      self.$emit('wxcStepperValueChanged', { value: self.value });
    },
    resetDisabledStyle: function resetDisabledStyle() {
      this.isLess = false;
      this.isOver = false;
    }
  }
};

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-stepper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "stepper-minus",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.minusClicked
    }
  }, [_c('text', {
    staticClass: "stepper-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.isLess ? '#cccccc' : '#666666'
    }))
  }, [_vm._v("-")])]), _vm._v(" "), _c('input', {
    staticClass: "stepper-input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.disableStyle)),
    attrs: {
      "type": "number",
      "disabled": _vm.disabled || _vm.readOnly
    },
    domProps: {
      "value": _vm.valueString
    },
    on: {
      "input": _vm.onInput,
      "blur": _vm.onBlur
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "stepper-plus",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.plusClicked
    }
  }, [_c('text', {
    staticClass: "stepper-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.isOver ? '#cccccc' : '#666666'
    }))
  }, [_vm._v("+")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-76fd3d24", module.exports)
  }
}

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(236);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(237)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(239),
  /* template */
  __webpack_require__(241),
  /* scopeId */
  "data-v-3f00baac",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-tab-page/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3f00baac", Component.options)
  } else {
    hotAPI.reload("data-v-3f00baac", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(238);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("282f1902", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3f00baac\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3f00baac\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-tab-page[data-v-3f00baac] {\n  width: 750px;\n  flex-direction: column;\n  background-color: #f2f3f4;\n}\n.tab-title-list[data-v-3f00baac] {\n  flex-direction: row;\n}\n.title-item[data-v-3f00baac] {\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  border-bottom-style: solid;\n  position: relative;\n}\n.border-bottom[data-v-3f00baac] {\n  position: absolute;\n  bottom: 0;\n}\n.tab-page-wrap[data-v-3f00baac] {\n  width: 750px;\n  overflow: hidden;\n  position: relative;\n}\n.tab-container[data-v-3f00baac] {\n  flex: 1;\n  flex-direction: row;\n  position: absolute;\n}\n.tab-text[data-v-3f00baac] {\n  lines: 1;\n  text-overflow: ellipsis;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-tab-page/index.vue?88c67054"],"names":[],"mappings":";AAgDA;EACA,aAAA;EACA,uBAAA;EACA,0BAAA;CACA;AAEA;EACA,oBAAA;CACA;AAEA;EACA,wBAAA;EACA,oBAAA;EACA,uBAAA;EACA,2BAAA;EACA,mBAAA;CACA;AAEA;EACA,mBAAA;EACA,UAAA;CACA;AAEA;EACA,aAAA;EACA,iBAAA;EACA,mBAAA;CACA;AAEA;EACA,QAAA;EACA,oBAAA;EACA,mBAAA;CACA;AAEA;EACA,SAAA;EACA,wBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div class=\"wxc-tab-page\"\n       :style=\"{ height: (tabPageHeight)+'px' }\">\n    <scroller class=\"tab-title-list\"\n              ref=\"tab-title-list\"\n              :show-scrollbar=\"false\"\n              scroll-direction=\"horizontal\"\n              :data-spm=\"spmC\"\n              :style=\"{ backgroundColor: tabStyles.bgColor, height: (tabStyles.height)+'px' }\">\n\n      <div class=\"title-item\"\n           v-for=\"(v,index) in tabTitles\"\n           :key=\"index\"\n           :ref=\"'wxc-tab-title-'+index\"\n           @click=\"setPage(index,v.url)\"\n           :data-spm-click=\"`gostr=/tbtrip;locaid=d${v.dataSpm!==undefined ? v.dataSpm : '996' + index}`\"\n           :style=\"{ width: tabStyles.width +'px', height: tabStyles.height +'px', backgroundColor: currentPage == index ? tabStyles.activeBgColor : tabStyles.bgColor }\">\n\n        <image :src=\"currentPage == index ? v.activeIcon : v.icon\"\n               v-if=\"titleType == 'icon'\"\n               :style=\"{ width: tabStyles.iconWidth + 'px', height:tabStyles.iconHeight+'px'}\"></image>\n        <text :style=\"{ fontSize: tabStyles.fontSize+'px', fontWeight: (currentPage == index && tabStyles.isActiveTitleBold)? 'bold' : 'normal', color: currentPage == index ? tabStyles.activeTitleColor : tabStyles.titleColor, paddingLeft:tabStyles.textPaddingLeft+'px', paddingRight:tabStyles.textPaddingRight+'px'}\"\n              class=\"tab-text\">{{v.title}}</text>\n        <div class=\"border-bottom\"\n             v-if=\"tabStyles.hasActiveBottom\"\n             :style=\"{ width: tabStyles.activeBottomWidth+'px', left: (tabStyles.width-tabStyles.activeBottomWidth)/2+'px', height: tabStyles.activeBottomHeight+'px', backgroundColor: currentPage == index ? tabStyles.activeBottomColor : 'transparent' }\"></div>\n      </div>\n    </scroller>\n    <div class=\"tab-page-wrap\"\n         ref=\"tab-page-wrap\"\n         @panstart=\"_onTouchStart\"\n         @panmove=\"_onTouchMove\"\n         @panend=\"_onTouchEnd\"\n         :prevent-move-event=\"true\"\n         @horizontalpan=\"startHandler\"\n         :style=\"{ height: (tabPageHeight-tabStyles.height)+'px' }\">\n      <div ref=\"tab-container\"\n           class=\"tab-container\">\n        <slot></slot>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-tab-page {\n    width: 750px;\n    flex-direction: column;\n    background-color: #f2f3f4;\n  }\n\n  .tab-title-list {\n    flex-direction: row;\n  }\n\n  .title-item {\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    border-bottom-style: solid;\n    position: relative;\n  }\n\n  .border-bottom {\n    position: absolute;\n    bottom: 0;\n  }\n\n  .tab-page-wrap {\n    width: 750px;\n    overflow: hidden;\n    position: relative;\n  }\n\n  .tab-container {\n    flex: 1;\n    flex-direction: row;\n    position: absolute;\n  }\n\n  .tab-text {\n    lines: 1;\n    text-overflow: ellipsis;\n  }\n</style>\n\n<script>\n  const dom = weex.requireModule('dom');\n  const animation = weex.requireModule('animation');\n  const swipeBack = weex.requireModule('swipeBack');\n  const expressionBinding = weex.requireModule('expressionBinding');\n\n  const Utils = require('./utils');\n  const supportsEB = Utils.env.supportsEB();\n  const supportsEBForIos = Utils.env.supportsEBForIos();\n  const isIos = Utils.env.isIOS();\n\n  module.exports = {\n    props: {\n      tabTitles: {\n        type: Array,\n        default: () => ([])\n      },\n      panDist: {\n        type: Number,\n        default: 200\n      },\n      spmC: {\n        type: [String, Number],\n        default: ''\n      },\n      tabStyles: {\n        type: Object,\n        default: () => ({\n          bgColor: '#FFFFFF',\n          titleColor: '#666666',\n          activeTitleColor: '#3D3D3D',\n          activeBgColor: '#FFFFFF',\n          isActiveTitleBold: true,\n          iconWidth: 70,\n          iconHeight: 70,\n          width: 160,\n          height: 120,\n          fontSize: 24,\n          hasActiveBottom: true,\n          activeBottomColor: '#FFC900',\n          activeBottomWidth: 120,\n          activeBottomHeight: 6,\n          textPaddingLeft: 10,\n          textPaddingRight: 10\n        })\n      },\n      titleType: {\n        type: String,\n        default: 'icon'\n      },\n      tabPageHeight: {\n        type: [String, Number],\n        default: 1334\n      },\n      isTabView: {\n        type: Boolean,\n        default: true\n      },\n      needSlider: {\n        type: Boolean,\n        default: true\n      },\n      duration: {\n        type: [Number, String],\n        default: 300\n      },\n      timingFunction: {\n        type: String,\n        default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'\n      }\n    },\n    data: () => ({\n      currentPage: 0,\n      isMoving: false,\n      startTime: 0,\n      deltaX: 0,\n      translateX: 0,\n      startPosX: 0,\n      startPosY: 0,\n      judge: 'INITIAL'\n    }),\n    mounted () {\n      if (swipeBack && swipeBack.forbidSwipeBack) {\n        swipeBack.forbidSwipeBack(true);\n      }\n      if (supportsEBForIos && this.needSlider && this.isTabView) {\n        setTimeout(() => {\n          const tabPageEl = this.$refs['tab-page-wrap'];\n          tabPageEl && tabPageEl.ref && this.bindExp(tabPageEl);\n        }, 20);\n      }\n    },\n    methods: {\n      next () {\n        let page = this.currentPage;\n        if (page < this.tabTitles.length - 1) {\n          page++;\n        }\n        this.setPage(page);\n      },\n      prev () {\n        let page = this.currentPage;\n        if (page > 0) {\n          page--;\n        }\n        this.setPage(page);\n      },\n      startHandler (e) {\n        if (supportsEBForIos && e.state === 'start' && this.isTabView && this.needSlider) {\n          // list下拉和到最下面问题修复\n          setTimeout(() => {\n            this.bindExp(this.$refs['tab-page-wrap']);\n          }, 0)\n        }\n      },\n      bindExp (element) {\n        if (!this.isMoving && element && element.ref) {\n          const tabElement = this.$refs['tab-container'];\n          const { currentPage, panDist } = this;\n          const dist = currentPage * 750;\n          // x-dist\n          const args = [{\n            element: tabElement.ref,\n            property: 'transform.translateX',\n            expression: `{\\\"type\\\":\\\"-\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"x\\\"},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${dist}}]}`\n          }];\n          expressionBinding.enableBinding(element.ref, 'pan');\n          expressionBinding.createBinding(element.ref, 'pan', '', args, e => {\n            const { deltaX, state } = e;\n            if (state === 'end') {\n              if (deltaX < -panDist) {\n                this.next();\n              } else if (deltaX > panDist) {\n                this.prev();\n              } else {\n                this.setPage(currentPage);\n              }\n            }\n          });\n        }\n      },\n      setPage (page, url = null) {\n        if (!this.isTabView) {\n          this.jumpOut(url);\n          return;\n        }\n        if (this.isMoving === true) {\n          return;\n        }\n        this.isMoving = true;\n        const previousPage = this.currentPage;\n        const currentTabEl = this.$refs[`wxc-tab-title-${page}`][0];\n        const { width } = this.tabStyles;\n        const appearNum = parseInt(750 / width);\n        const tabsNum = this.tabTitles.length;\n        const computedPage = tabsNum > appearNum ? 2 : page;\n        const offset = page > appearNum ? -(750 - width) / 2 : -width * computedPage;\n\n        (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {\n          offset\n        });\n\n        page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {\n          offset: -width * page\n        });\n\n        if (isIos) {\n          // 高版本ios 手淘上面会有不固定情况，hack一下\n          setTimeout(() => {\n            this._animateTransformX(page);\n          }, 10);\n        } else {\n          this._animateTransformX(page);\n        }\n\n        this.isMoving = false;\n        this.currentPage = page;\n        this.$emit('wxcTabPageCurrentTabSelected', { page });\n      },\n      jumpOut (url) {\n        url && Utils.goToH5Page(url)\n      },\n      _animateTransformX (page) {\n        const { duration, timingFunction } = this;\n        const containerEl = this.$refs[`tab-container`];\n        const dist = page * 750;\n        animation.transition(containerEl, {\n          styles: {\n            transform: `translateX(${-dist}px)`\n          },\n          duration,\n          timingFunction,\n          delay: 0\n        }, () => {\n        });\n      },\n      _onTouchStart (e) {\n        if (supportsEB || !this.isTabView || !this.needSlider) {\n          return;\n        }\n        this.startPosX = this._getTouchXPos(e);\n        this.startPosY = this._getTouchYPos(e);\n        this.deltaX = 0;\n        this.startTime = new Date().getTime();\n      },\n      _onTouchMove (e) {\n        if (supportsEB || !this.isTabView || !this.needSlider) {\n          return;\n        }\n        this.deltaX = this._getTouchXPos(e) - this.startPosX;\n        this.deltaY = Math.abs(this._getTouchYPos(e) - this.startPosY + 1);\n        if (this.judge === 'INITIAL' && Math.abs(this.deltaX) / this.deltaY > 1.73) {\n          this.judge = 'SLIDE_ING';\n        }\n      },\n      _onTouchEnd () {\n        if (supportsEB || !this.isTabView || !this.needSlider) {\n          return;\n        }\n        if (this.judge === 'SLIDE_ING') {\n          if (this.deltaX < -50) {\n            this.next();\n          } else if (this.deltaX > 50) {\n            this.prev();\n          }\n        }\n        this.judge = 'INITIAL';\n      },\n      _getTouchXPos (e) {\n        return e.changedTouches[0]['pageX'];\n      },\n      _getTouchYPos (e) {\n        return e.changedTouches[0]['pageY'];\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');
var animation = weex.requireModule('animation');
var swipeBack = weex.requireModule('swipeBack');
var expressionBinding = weex.requireModule('expressionBinding');

var Utils = __webpack_require__(240);
var supportsEB = Utils.env.supportsEB();
var supportsEBForIos = Utils.env.supportsEBForIos();
var isIos = Utils.env.isIOS();

module.exports = {
  props: {
    tabTitles: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    panDist: {
      type: Number,
      default: 200
    },
    spmC: {
      type: [String, Number],
      default: ''
    },
    tabStyles: {
      type: Object,
      default: function _default() {
        return {
          bgColor: '#FFFFFF',
          titleColor: '#666666',
          activeTitleColor: '#3D3D3D',
          activeBgColor: '#FFFFFF',
          isActiveTitleBold: true,
          iconWidth: 70,
          iconHeight: 70,
          width: 160,
          height: 120,
          fontSize: 24,
          hasActiveBottom: true,
          activeBottomColor: '#FFC900',
          activeBottomWidth: 120,
          activeBottomHeight: 6,
          textPaddingLeft: 10,
          textPaddingRight: 10
        };
      }
    },
    titleType: {
      type: String,
      default: 'icon'
    },
    tabPageHeight: {
      type: [String, Number],
      default: 1334
    },
    isTabView: {
      type: Boolean,
      default: true
    },
    needSlider: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: String,
      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  },
  data: function data() {
    return {
      currentPage: 0,
      isMoving: false,
      startTime: 0,
      deltaX: 0,
      translateX: 0,
      startPosX: 0,
      startPosY: 0,
      judge: 'INITIAL'
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (swipeBack && swipeBack.forbidSwipeBack) {
      swipeBack.forbidSwipeBack(true);
    }
    if (supportsEBForIos && this.needSlider && this.isTabView) {
      setTimeout(function () {
        var tabPageEl = _this.$refs['tab-page-wrap'];
        tabPageEl && tabPageEl.ref && _this.bindExp(tabPageEl);
      }, 20);
    }
  },

  methods: {
    next: function next() {
      var page = this.currentPage;
      if (page < this.tabTitles.length - 1) {
        page++;
      }
      this.setPage(page);
    },
    prev: function prev() {
      var page = this.currentPage;
      if (page > 0) {
        page--;
      }
      this.setPage(page);
    },
    startHandler: function startHandler(e) {
      var _this2 = this;

      if (supportsEBForIos && e.state === 'start' && this.isTabView && this.needSlider) {
        // list下拉和到最下面问题修复
        setTimeout(function () {
          _this2.bindExp(_this2.$refs['tab-page-wrap']);
        }, 0);
      }
    },
    bindExp: function bindExp(element) {
      var _this3 = this;

      if (!this.isMoving && element && element.ref) {
        var tabElement = this.$refs['tab-container'];
        var currentPage = this.currentPage,
            panDist = this.panDist;

        var dist = currentPage * 750;
        // x-dist
        var args = [{
          element: tabElement.ref,
          property: 'transform.translateX',
          expression: '{"type":"-","children":[{"type":"Identifier","value":"x"},{"type":"NumericLiteral","value":' + dist + '}]}'
        }];
        expressionBinding.enableBinding(element.ref, 'pan');
        expressionBinding.createBinding(element.ref, 'pan', '', args, function (e) {
          var deltaX = e.deltaX,
              state = e.state;

          if (state === 'end') {
            if (deltaX < -panDist) {
              _this3.next();
            } else if (deltaX > panDist) {
              _this3.prev();
            } else {
              _this3.setPage(currentPage);
            }
          }
        });
      }
    },
    setPage: function setPage(page) {
      var _this4 = this;

      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!this.isTabView) {
        this.jumpOut(url);
        return;
      }
      if (this.isMoving === true) {
        return;
      }
      this.isMoving = true;
      var previousPage = this.currentPage;
      var currentTabEl = this.$refs['wxc-tab-title-' + page][0];
      var width = this.tabStyles.width;

      var appearNum = parseInt(750 / width);
      var tabsNum = this.tabTitles.length;
      var computedPage = tabsNum > appearNum ? 2 : page;
      var offset = page > appearNum ? -(750 - width) / 2 : -width * computedPage;

      (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {
        offset: offset
      });

      page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {
        offset: -width * page
      });

      if (isIos) {
        // 高版本ios 手淘上面会有不固定情况，hack一下
        setTimeout(function () {
          _this4._animateTransformX(page);
        }, 10);
      } else {
        this._animateTransformX(page);
      }

      this.isMoving = false;
      this.currentPage = page;
      this.$emit('wxcTabPageCurrentTabSelected', { page: page });
    },
    jumpOut: function jumpOut(url) {
      url && Utils.goToH5Page(url);
    },
    _animateTransformX: function _animateTransformX(page) {
      var duration = this.duration,
          timingFunction = this.timingFunction;

      var containerEl = this.$refs['tab-container'];
      var dist = page * 750;
      animation.transition(containerEl, {
        styles: {
          transform: 'translateX(' + -dist + 'px)'
        },
        duration: duration,
        timingFunction: timingFunction,
        delay: 0
      }, function () {});
    },
    _onTouchStart: function _onTouchStart(e) {
      if (supportsEB || !this.isTabView || !this.needSlider) {
        return;
      }
      this.startPosX = this._getTouchXPos(e);
      this.startPosY = this._getTouchYPos(e);
      this.deltaX = 0;
      this.startTime = new Date().getTime();
    },
    _onTouchMove: function _onTouchMove(e) {
      if (supportsEB || !this.isTabView || !this.needSlider) {
        return;
      }
      this.deltaX = this._getTouchXPos(e) - this.startPosX;
      this.deltaY = Math.abs(this._getTouchYPos(e) - this.startPosY + 1);
      if (this.judge === 'INITIAL' && Math.abs(this.deltaX) / this.deltaY > 1.73) {
        this.judge = 'SLIDE_ING';
      }
    },
    _onTouchEnd: function _onTouchEnd() {
      if (supportsEB || !this.isTabView || !this.needSlider) {
        return;
      }
      if (this.judge === 'SLIDE_ING') {
        if (this.deltaX < -50) {
          this.next();
        } else if (this.deltaX > 50) {
          this.prev();
        }
      }
      this.judge = 'INITIAL';
    },
    _getTouchXPos: function _getTouchXPos(e) {
      return e.changedTouches[0]['pageX'];
    },
    _getTouchYPos: function _getTouchYPos(e) {
      return e.changedTouches[0]['pageY'];
    }
  }
};

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var UrlParser = __webpack_require__(3);

/**
 * 工具方法库
 * @namespace Utils
 * @example
 *
 */
var Utils = {
  UrlParser: UrlParser,
  isNonEmptyArray: function isNonEmptyArray() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  },
  appendProtocol: function appendProtocol(url) {
    if (/^\/\//.test(url)) {
      var bundleUrl = weex.config.bundleUrl;

      return 'http' + (/^https:/.test(bundleUrl) ? 's' : '') + ':' + url;
    }
    return url;
  },
  encodeURLParams: function encodeURLParams(url) {
    var parsedUrl = new UrlParser(url, true);
    return parsedUrl.toString();
  },
  goToH5Page: function goToH5Page(jumpUrl) {
    var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var Navigator = weex.requireModule('navigator');
    var jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
    var url = appendProtocol(jumpUrlObj.toString());
    Navigator.push({
      url: Utils.encodeURLParams(url),
      animated: animated
    }, callback);
  },

  /**
   * 环境判断辅助 API
   * @namespace Utils.env
   * @example
   *
   * const { Utils } = require('@ali/wxv-bridge');
   * const { env } = Utils;
   */
  env: {

    /**
     * 是否是手淘容器
     * @method
     * @memberOf Utils.env
     * @returns {boolean}
     * @example
     *
     * const isTaobao = env.isTaobao();
     */
    isTaobao: function isTaobao() {
      var appName = weex.config.env.appName;

      return (/(tb|taobao|淘宝)/i.test(appName)
      );
    },


    /**
     * 是否是旅客容器
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isTrip = env.isTrip();
     */
    isTrip: function isTrip() {
      var appName = weex.config.env.appName;

      return appName === 'LX';
    },

    /**
     * 是否是 web 环境
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isWeb = env.isWeb();
     */
    isWeb: function isWeb() {
      var platform = weex.config.env.platform;

      return (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
    },

    /**
     * 是否是 iOS 系统
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isIOS = env.isIOS();
     */
    isIOS: function isIOS() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'ios';
    },

    /**
     * 是否是 Android 系统
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isAndroid = env.isAndroid();
     */
    isAndroid: function isAndroid() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'android';
    },


    /**
     * 是否是支付宝容器
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isAlipay = env.isAlipay();
     */
    isAlipay: function isAlipay() {
      var appName = weex.config.env.appName;

      return appName === 'AP';
    },


    /**
     * 是否是支付宝H5容器(防止以后支付宝接入weex)
     * @memberOf Utils.env
     * @method
     * @returns {boolean}
     * @example
     *
     * const isAlipayWeb = env.isAlipayWeb();
     */
    isAlipayWeb: function isAlipayWeb() {
      return Utils.env.isAlipay() && Utils.env.isWeb();
    },


    /**
     * 判断是否支持expressionBinding
     * 当weex版本大于0.10.1.6，为客户端即可以支持expressionBinding
     * @returns {Boolean}
     */
    supportsEB: function supportsEB() {
      var weexVersion = weex.config.env.weexVersion || '0';
      var isHighWeex = Utils.compareVersion(weexVersion, '0.10.1.4') && (Utils.env.isIOS() || Utils.env.isAndroid());
      var expressionBinding = weex.requireModule('expressionBinding');
      return expressionBinding && expressionBinding.enableBinding && isHighWeex;
    },


    /**
     * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
     * @returns {boolean}
     */
    supportsEBForAndroid: function supportsEBForAndroid() {
      return Utils.env.isAndroid() && Utils.env.supportsEB();
    },


    /**
     * 判断IOS容器是否支持是否支持expressionBinding
     * @returns {boolean}
     */
    supportsEBForIos: function supportsEBForIos() {
      return Utils.env.isIOS() && Utils.env.supportsEB();
    },


    /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
    getPageHeight: function getPageHeight() {
      var env = weex.config.env;

      var navHeight = Utils.env.isWeb() ? 0 : 130;
      return env.deviceHeight / env.deviceWidth * 750 - navHeight;
    }
  },

  /**
   * 版本号比较
   * @memberOf Utils
   * @param currVer {string}
   * @param promoteVer {string}
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wx-bridge');
   * const { compareVersion } = Utils;
   * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
   */
  compareVersion: function compareVersion() {
    var currVer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "0.0.0";
    var promoteVer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "0.0.0";

    if (currVer === promoteVer) return true;
    var currVerArr = currVer.split(".");
    var promoteVerArr = promoteVer.split(".");
    var len = Math.max(currVerArr.length, promoteVerArr.length);
    for (var i = 0; i < len; i++) {
      var proVal = ~~promoteVerArr[i];
      var curVal = ~~currVerArr[i];
      if (proVal < curVal) {
        return true;
      } else if (proVal > curVal) {
        return false;
      }
    }
    return false;
  }
};

module.exports = Utils;

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-tab-page",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: (_vm.tabPageHeight) + 'px'
    }))
  }, [_c('scroller', {
    ref: "tab-title-list",
    staticClass: "tab-title-list",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      backgroundColor: _vm.tabStyles.bgColor,
      height: (_vm.tabStyles.height) + 'px'
    })),
    attrs: {
      "show-scrollbar": false,
      "scroll-direction": "horizontal",
      "data-spm": _vm.spmC
    }
  }, _vm._l((_vm.tabTitles), function(v, index) {
    return _c('div', {
      key: index,
      ref: 'wxc-tab-title-' + index,
      refInFor: true,
      staticClass: "title-item",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        width: _vm.tabStyles.width + 'px',
        height: _vm.tabStyles.height + 'px',
        backgroundColor: _vm.currentPage == index ? _vm.tabStyles.activeBgColor : _vm.tabStyles.bgColor
      })),
      attrs: {
        "data-spm-click": ("gostr=/tbtrip;locaid=d" + (v.dataSpm!==undefined ? v.dataSpm : '996' + index))
      },
      on: {
        "click": function($event) {
          _vm.setPage(index, v.url)
        }
      }
    }, [(_vm.titleType == 'icon') ? _c('image', {
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        width: _vm.tabStyles.iconWidth + 'px',
        height: _vm.tabStyles.iconHeight + 'px'
      })),
      attrs: {
        "src": _vm.currentPage == index ? v.activeIcon : v.icon
      }
    }) : _vm._e(), _vm._v(" "), _c('text', {
      staticClass: "tab-text",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        fontSize: _vm.tabStyles.fontSize + 'px',
        fontWeight: (_vm.currentPage == index && _vm.tabStyles.isActiveTitleBold) ? 'bold' : 'normal',
        color: _vm.currentPage == index ? _vm.tabStyles.activeTitleColor : _vm.tabStyles.titleColor,
        paddingLeft: _vm.tabStyles.textPaddingLeft + 'px',
        paddingRight: _vm.tabStyles.textPaddingRight + 'px'
      }))
    }, [_vm._v(_vm._s(v.title))]), _vm._v(" "), (_vm.tabStyles.hasActiveBottom) ? _c('div', {
      staticClass: "border-bottom",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        width: _vm.tabStyles.activeBottomWidth + 'px',
        left: (_vm.tabStyles.width - _vm.tabStyles.activeBottomWidth) / 2 + 'px',
        height: _vm.tabStyles.activeBottomHeight + 'px',
        backgroundColor: _vm.currentPage == index ? _vm.tabStyles.activeBottomColor : 'transparent'
      }))
    }) : _vm._e()])
  })), _vm._v(" "), _c('div', {
    ref: "tab-page-wrap",
    staticClass: "tab-page-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: (_vm.tabPageHeight - _vm.tabStyles.height) + 'px'
    })),
    attrs: {
      "prevent-move-event": true
    },
    on: {
      "panstart": _vm._onTouchStart,
      "panmove": _vm._onTouchMove,
      "panend": _vm._onTouchEnd,
      "horizontalpan": _vm.startHandler
    }
  }, [_c('div', {
    ref: "tab-container",
    staticClass: "tab-container",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("default")], 2)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3f00baac", module.exports)
  }
}

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(243);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(244)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(246),
  /* template */
  __webpack_require__(247),
  /* scopeId */
  "data-v-3c51aaad",
  /* cssModules */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-tag/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c51aaad", Component.options)
  } else {
    hotAPI.reload("data-v-3c51aaad", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(245);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("c4c1ea06", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3c51aaad\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3c51aaad\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-tag[data-v-3c51aaad] {\n  align-items: flex-start;\n}\n.tag-item[data-v-3c51aaad] {\n  height: 24px;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n  /* hack高度不居中问题，后续版本升级去掉 */\n  padding-bottom: 2px;\n}\n.tag-border[data-v-3c51aaad] {\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.tag-hollow[data-v-3c51aaad] {\n  border-width: 1px;\n}\n.tag-image[data-v-3c51aaad] {\n  height: 24px;\n}\n.tag-special[data-v-3c51aaad] {\n  border-width: 1px;\n  flex-direction: row;\n}\n.left-image[data-v-3c51aaad] {\n  width: 20px;\n  height: 20px;\n}\n.tag-left[data-v-3c51aaad] {\n  width: 24px;\n  height: 24px;\n  align-items: center;\n  justify-content: center;\n}\n.tag-text[data-v-3c51aaad] {\n  font-size: 20px;\n  height: 22px;\n  line-height: 22px;\n  padding-left: 6px;\n  padding-right: 6px;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-tag/index.vue?ee6c34da"],"names":[],"mappings":";AAoBA;EACA,wBAAA;CACA;AAEA;EACA,aAAA;EACA,wBAAA;EACA,oBAAA;EACA,iBAAA;EACA,0BAAA;EACA,oBAAA;CACA;AAEA;EACA,+BAAA;EACA,gCAAA;EACA,4BAAA;EACA,6BAAA;CACA;AAEA;EACA,kBAAA;CACA;AAEA;EACA,aAAA;CACA;AAEA;EACA,kBAAA;EACA,oBAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,oBAAA;EACA,wBAAA;CACA;AAEA;EACA,gBAAA;EACA,aAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<template>\n  <div class=\"wxc-tag\">\n    <div v-if=\"showSolid || showHollow\"\n         :class=\"['tag-item','tag-border',showHollow && 'tag-hollow']\"\n         :style=\"tagTextStyle\">\n      <text class=\"tag-text\" :style=\"{color:fontColor}\">{{value}}</text>\n    </div>\n    <image v-if=\"showImage\" :src=\"img\" @load=\"onLoad\" :style=\"{ width: imgWidth}\" class=\"tag-image\"></image>\n    <div class=\"tag-special tag-border\" :style=\"{borderColor:tagColor}\" v-if=\"showSpecial\">\n      <div class=\"tag-left\" :style=\"{backgroundColor:tagColor}\">\n        <image :src=\"specialIcon\" class=\"left-image\"></image>\n      </div>\n      <text class=\"tag-text\" :style=\"{color:fontColor}\">{{value}}</text>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n\n  .wxc-tag {\n    align-items: flex-start;\n  }\n\n  .tag-item {\n    height: 24px;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    /* hack高度不居中问题，后续版本升级去掉 */\n    padding-bottom: 2px;\n  }\n\n  .tag-border {\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n  }\n\n  .tag-hollow {\n    border-width: 1px;\n  }\n\n  .tag-image {\n    height: 24px;\n  }\n\n  .tag-special {\n    border-width: 1px;\n    flex-direction: row;\n  }\n\n  .left-image {\n    width: 20px;\n    height: 20px;\n  }\n\n  .tag-left {\n    width: 24px;\n    height: 24px;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .tag-text {\n    font-size: 20px;\n    height: 22px;\n    line-height: 22px;\n    padding-left: 6px;\n    padding-right: 6px;\n  }\n</style>\n\n<script>\n  export default {\n    props: {\n      type: {\n        type: String,\n        default: 'solid'\n      },\n      value: {\n        type: [String, Number],\n        default: '测试测试'\n      },\n      tagColor: {\n        type: String,\n        default: '#ff5000'\n      },\n      fontColor: {\n        type: String,\n        default: '#333'\n      },\n      specialIcon: {\n        type: String,\n        default: ''\n      },\n      img: {\n        type: String,\n        default: ''\n      }\n    },\n    computed: {\n      showSolid () {\n        const { type, value } = this;\n        return type === 'solid' && value !== '';\n      },\n      showHollow () {\n        const { type, value } = this;\n        return type === 'hollow' && value !== '';\n      },\n      showSpecial () {\n        const { type, value, specialIcon } = this;\n        return type === 'special' && value !== '' && specialIcon !== '';\n      },\n      showImage () {\n        const { type, img } = this;\n        return type === 'image' && img !== ''\n      },\n      tagTextStyle () {\n        const { tagColor, showSolid } = this;\n        return showSolid ? { backgroundColor: tagColor } : { borderColor: tagColor }\n      }\n    },\n    data: () => ({\n      imgWidth: 90\n    }),\n    methods: {\n      onLoad (e) {\n        if (e.success && e.size && e.size.naturalWidth > 0) {\n          const width = e.size.naturalWidth;\n          const height = e.size.naturalHeight;\n          this.imgWidth = width * (24 / height);\n        }\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    type: {
      type: String,
      default: 'solid'
    },
    value: {
      type: [String, Number],
      default: '测试测试'
    },
    tagColor: {
      type: String,
      default: '#ff5000'
    },
    fontColor: {
      type: String,
      default: '#333'
    },
    specialIcon: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  },
  computed: {
    showSolid: function showSolid() {
      var type = this.type,
          value = this.value;

      return type === 'solid' && value !== '';
    },
    showHollow: function showHollow() {
      var type = this.type,
          value = this.value;

      return type === 'hollow' && value !== '';
    },
    showSpecial: function showSpecial() {
      var type = this.type,
          value = this.value,
          specialIcon = this.specialIcon;

      return type === 'special' && value !== '' && specialIcon !== '';
    },
    showImage: function showImage() {
      var type = this.type,
          img = this.img;

      return type === 'image' && img !== '';
    },
    tagTextStyle: function tagTextStyle() {
      var tagColor = this.tagColor,
          showSolid = this.showSolid;

      return showSolid ? { backgroundColor: tagColor } : { borderColor: tagColor };
    }
  },
  data: function data() {
    return {
      imgWidth: 90
    };
  },
  methods: {
    onLoad: function onLoad(e) {
      if (e.success && e.size && e.size.naturalWidth > 0) {
        var width = e.size.naturalWidth;
        var height = e.size.naturalHeight;
        this.imgWidth = width * (24 / height);
      }
    }
  }
};

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-tag",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [(_vm.showSolid || _vm.showHollow) ? _c('div', {
    class: ['tag-item', 'tag-border', _vm.showHollow && 'tag-hollow'],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.tagTextStyle))
  }, [_c('text', {
    staticClass: "tag-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.fontColor
    }))
  }, [_vm._v(_vm._s(_vm.value))])]) : _vm._e(), _vm._v(" "), (_vm.showImage) ? _c('image', {
    staticClass: "tag-image",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      width: _vm.imgWidth
    })),
    attrs: {
      "src": _vm.img
    },
    on: {
      "load": _vm.onLoad
    }
  }) : _vm._e(), _vm._v(" "), (_vm.showSpecial) ? _c('div', {
    staticClass: "tag-special tag-border",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      borderColor: _vm.tagColor
    }))
  }, [_c('div', {
    staticClass: "tag-left",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      backgroundColor: _vm.tagColor
    }))
  }, [_c('image', {
    staticClass: "left-image",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.specialIcon
    }
  })]), _vm._v(" "), _c('text', {
    staticClass: "tag-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.fontColor
    }))
  }, [_vm._v(_vm._s(_vm.value))])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c51aaad", module.exports)
  }
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.web.js.map
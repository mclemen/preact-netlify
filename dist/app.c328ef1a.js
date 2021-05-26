// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/hyperapp/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = exports.h = exports.Lazy = void 0;
var RECYCLED_NODE = 1;
var LAZY_NODE = 2;
var TEXT_NODE = 3;
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var map = EMPTY_ARR.map;
var isArray = Array.isArray;
var defer = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : setTimeout;

var createClass = function (obj) {
  var out = "";
  if (typeof obj === "string") return obj;

  if (isArray(obj) && obj.length > 0) {
    for (var k = 0, tmp; k < obj.length; k++) {
      if ((tmp = createClass(obj[k])) !== "") {
        out += (out && " ") + tmp;
      }
    }
  } else {
    for (var k in obj) {
      if (obj[k]) {
        out += (out && " ") + k;
      }
    }
  }

  return out;
};

var merge = function (a, b) {
  var out = {};

  for (var k in a) out[k] = a[k];

  for (var k in b) out[k] = b[k];

  return out;
};

var batch = function (list) {
  return list.reduce(function (out, item) {
    return out.concat(!item || item === true ? 0 : typeof item[0] === "function" ? [item] : batch(item));
  }, EMPTY_ARR);
};

var isSameAction = function (a, b) {
  return isArray(a) && isArray(b) && a[0] === b[0] && typeof a[0] === "function";
};

var shouldRestart = function (a, b) {
  if (a !== b) {
    for (var k in merge(a, b)) {
      if (a[k] !== b[k] && !isSameAction(a[k], b[k])) return true;
      b[k] = a[k];
    }
  }
};

var patchSubs = function (oldSubs, newSubs, dispatch) {
  for (var i = 0, oldSub, newSub, subs = []; i < oldSubs.length || i < newSubs.length; i++) {
    oldSub = oldSubs[i];
    newSub = newSubs[i];
    subs.push(newSub ? !oldSub || newSub[0] !== oldSub[0] || shouldRestart(newSub[1], oldSub[1]) ? [newSub[0], newSub[1], newSub[0](dispatch, newSub[1]), oldSub && oldSub[2]()] : oldSub : oldSub && oldSub[2]());
  }

  return subs;
};

var patchProperty = function (node, key, oldValue, newValue, listener, isSvg) {
  if (key === "key") {} else if (key === "style") {
    for (var k in merge(oldValue, newValue)) {
      oldValue = newValue == null || newValue[k] == null ? "" : newValue[k];

      if (k[0] === "-") {
        node[key].setProperty(k, oldValue);
      } else {
        node[key][k] = oldValue;
      }
    }
  } else if (key[0] === "o" && key[1] === "n") {
    if (!((node.actions || (node.actions = {}))[key = key.slice(2).toLowerCase()] = newValue)) {
      node.removeEventListener(key, listener);
    } else if (!oldValue) {
      node.addEventListener(key, listener);
    }
  } else if (!isSvg && key !== "list" && key in node) {
    node[key] = newValue == null ? "" : newValue;
  } else if (newValue == null || newValue === false || key === "class" && !(newValue = createClass(newValue))) {
    node.removeAttribute(key);
  } else {
    node.setAttribute(key, newValue);
  }
};

var createNode = function (vdom, listener, isSvg) {
  var ns = "http://www.w3.org/2000/svg";
  var props = vdom.props;
  var node = vdom.type === TEXT_NODE ? document.createTextNode(vdom.name) : (isSvg = isSvg || vdom.name === "svg") ? document.createElementNS(ns, vdom.name, {
    is: props.is
  }) : document.createElement(vdom.name, {
    is: props.is
  });

  for (var k in props) {
    patchProperty(node, k, null, props[k], listener, isSvg);
  }

  for (var i = 0, len = vdom.children.length; i < len; i++) {
    node.appendChild(createNode(vdom.children[i] = getVNode(vdom.children[i]), listener, isSvg));
  }

  return vdom.node = node;
};

var getKey = function (vdom) {
  return vdom == null ? null : vdom.key;
};

var patch = function (parent, node, oldVNode, newVNode, listener, isSvg) {
  if (oldVNode === newVNode) {} else if (oldVNode != null && oldVNode.type === TEXT_NODE && newVNode.type === TEXT_NODE) {
    if (oldVNode.name !== newVNode.name) node.nodeValue = newVNode.name;
  } else if (oldVNode == null || oldVNode.name !== newVNode.name) {
    node = parent.insertBefore(createNode(newVNode = getVNode(newVNode), listener, isSvg), node);

    if (oldVNode != null) {
      parent.removeChild(oldVNode.node);
    }
  } else {
    var tmpVKid;
    var oldVKid;
    var oldKey;
    var newKey;
    var oldVProps = oldVNode.props;
    var newVProps = newVNode.props;
    var oldVKids = oldVNode.children;
    var newVKids = newVNode.children;
    var oldHead = 0;
    var newHead = 0;
    var oldTail = oldVKids.length - 1;
    var newTail = newVKids.length - 1;
    isSvg = isSvg || newVNode.name === "svg";

    for (var i in merge(oldVProps, newVProps)) {
      if ((i === "value" || i === "selected" || i === "checked" ? node[i] : oldVProps[i]) !== newVProps[i]) {
        patchProperty(node, i, oldVProps[i], newVProps[i], listener, isSvg);
      }
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if ((oldKey = getKey(oldVKids[oldHead])) == null || oldKey !== getKey(newVKids[newHead])) {
        break;
      }

      patch(node, oldVKids[oldHead].node, oldVKids[oldHead], newVKids[newHead] = getVNode(newVKids[newHead++], oldVKids[oldHead++]), listener, isSvg);
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if ((oldKey = getKey(oldVKids[oldTail])) == null || oldKey !== getKey(newVKids[newTail])) {
        break;
      }

      patch(node, oldVKids[oldTail].node, oldVKids[oldTail], newVKids[newTail] = getVNode(newVKids[newTail--], oldVKids[oldTail--]), listener, isSvg);
    }

    if (oldHead > oldTail) {
      while (newHead <= newTail) {
        node.insertBefore(createNode(newVKids[newHead] = getVNode(newVKids[newHead++]), listener, isSvg), (oldVKid = oldVKids[oldHead]) && oldVKid.node);
      }
    } else if (newHead > newTail) {
      while (oldHead <= oldTail) {
        node.removeChild(oldVKids[oldHead++].node);
      }
    } else {
      for (var i = oldHead, keyed = {}, newKeyed = {}; i <= oldTail; i++) {
        if ((oldKey = oldVKids[i].key) != null) {
          keyed[oldKey] = oldVKids[i];
        }
      }

      while (newHead <= newTail) {
        oldKey = getKey(oldVKid = oldVKids[oldHead]);
        newKey = getKey(newVKids[newHead] = getVNode(newVKids[newHead], oldVKid));

        if (newKeyed[oldKey] || newKey != null && newKey === getKey(oldVKids[oldHead + 1])) {
          if (oldKey == null) {
            node.removeChild(oldVKid.node);
          }

          oldHead++;
          continue;
        }

        if (newKey == null || oldVNode.type === RECYCLED_NODE) {
          if (oldKey == null) {
            patch(node, oldVKid && oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
            newHead++;
          }

          oldHead++;
        } else {
          if (oldKey === newKey) {
            patch(node, oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
            newKeyed[newKey] = true;
            oldHead++;
          } else {
            if ((tmpVKid = keyed[newKey]) != null) {
              patch(node, node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node), tmpVKid, newVKids[newHead], listener, isSvg);
              newKeyed[newKey] = true;
            } else {
              patch(node, oldVKid && oldVKid.node, null, newVKids[newHead], listener, isSvg);
            }
          }

          newHead++;
        }
      }

      while (oldHead <= oldTail) {
        if (getKey(oldVKid = oldVKids[oldHead++]) == null) {
          node.removeChild(oldVKid.node);
        }
      }

      for (var i in keyed) {
        if (newKeyed[i] == null) {
          node.removeChild(keyed[i].node);
        }
      }
    }
  }

  return newVNode.node = node;
};

var propsChanged = function (a, b) {
  for (var k in a) if (a[k] !== b[k]) return true;

  for (var k in b) if (a[k] !== b[k]) return true;
};

var getVNode = function (newVNode, oldVNode) {
  return newVNode.type === LAZY_NODE ? ((!oldVNode || propsChanged(oldVNode.lazy, newVNode.lazy)) && ((oldVNode = newVNode.lazy.view(newVNode.lazy)).lazy = newVNode.lazy), oldVNode) : newVNode;
};

var createVNode = function (name, props, children, node, key, type) {
  return {
    name: name,
    props: props,
    children: children,
    node: node,
    type: type,
    key: key
  };
};

var createTextVNode = function (value, node) {
  return createVNode(value, EMPTY_OBJ, EMPTY_ARR, node, undefined, TEXT_NODE);
};

var recycleNode = function (node) {
  return node.nodeType === TEXT_NODE ? createTextVNode(node.nodeValue, node) : createVNode(node.nodeName.toLowerCase(), EMPTY_OBJ, map.call(node.childNodes, recycleNode), node, undefined, RECYCLED_NODE);
};

var Lazy = function (props) {
  return {
    lazy: props,
    type: LAZY_NODE
  };
};

exports.Lazy = Lazy;

var h = function (name, props) {
  for (var vdom, rest = [], children = [], i = arguments.length; i-- > 2;) {
    rest.push(arguments[i]);
  }

  while (rest.length > 0) {
    if (isArray(vdom = rest.pop())) {
      for (var i = vdom.length; i-- > 0;) {
        rest.push(vdom[i]);
      }
    } else if (vdom === false || vdom === true || vdom == null) {} else {
      children.push(typeof vdom === "object" ? vdom : createTextVNode(vdom));
    }
  }

  props = props || EMPTY_OBJ;
  return typeof name === "function" ? name(props, children) : createVNode(name, props, children, undefined, props.key);
};

exports.h = h;

var app = function (props) {
  var state = {};
  var lock = false;
  var view = props.view;
  var node = props.node;
  var vdom = node && recycleNode(node);
  var subscriptions = props.subscriptions;
  var subs = [];

  var listener = function (event) {
    dispatch(this.actions[event.type], event);
  };

  var setState = function (newState) {
    if (state !== newState) {
      state = newState;

      if (subscriptions) {
        subs = patchSubs(subs, batch([subscriptions(state)]), dispatch);
      }

      if (view && !lock) defer(render, lock = true);
    }

    return state;
  };

  var dispatch = (props.middleware || function (obj) {
    return obj;
  })(function (action, props) {
    return typeof action === "function" ? dispatch(action(state, props)) : isArray(action) ? typeof action[0] === "function" ? dispatch(action[0], typeof action[1] === "function" ? action[1](props) : action[1]) : (batch(action.slice(1)).map(function (fx) {
      fx && fx[0](dispatch, fx[1]);
    }, setState(action[0])), state) : setState(action);
  });

  var render = function () {
    lock = false;
    node = patch(node.parentNode, node, vdom, vdom = typeof (vdom = view(state)) === "string" ? createTextVNode(vdom) : vdom, listener);
  };

  dispatch(props.init);
};

exports.app = app;
},{}],"../node_modules/hyperstatic/src/subscriptions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocationChanged = void 0;

// LocationChanged Subscription
const subFx = a => b => [a, b];

const LocationChanged = subFx((dispatch, props) => {
  const handleLocationChange = ev => {
    dispatch([props.action, window.location.pathname + window.location.search]);
  };

  addEventListener('pushstate', handleLocationChange);
  addEventListener('popstate', handleLocationChange);
  return () => {
    removeEventListener('pushstate', handleLocationChange);
    removeEventListener('popstate', handleLocationChange);
  };
});
exports.LocationChanged = LocationChanged;
},{}],"../node_modules/hyperstatic/src/effects.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeLocation = exports.LoadBundle = void 0;

// Load bundle FX
const loadBundleFx = (dispatch, {
  action,
  bundlePromise,
  path
}) => bundlePromise.then(importedModule => {
  dispatch(action, {
    path,
    bundle: importedModule
  });
});

const LoadBundle = ({
  action,
  bundlePromise,
  path
}) => [loadBundleFx, {
  action,
  bundlePromise,
  path
}]; // Change location FX


exports.LoadBundle = LoadBundle;

const locationFx = (dispatch, {
  to
}) => {
  if (to !== window.location.pathname) {
    // window.scrollTo(0, 0)
    history.pushState(null, '', to);
    dispatchEvent(new CustomEvent('pushstate'));
  }
};

const ChangeLocation = ({
  to
}) => [locationFx, {
  to
}];

exports.ChangeLocation = ChangeLocation;
},{}],"../node_modules/strict-uri-encode/index.js":[function(require,module,exports) {
'use strict';

module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => "%".concat(x.charCodeAt(0).toString(16).toUpperCase()));
},{}],"../node_modules/decode-uri-component/index.js":[function(require,module,exports) {
'use strict';

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
  try {
    // Try to decode the entire string first
    return decodeURIComponent(components.join(''));
  } catch (err) {// Do nothing
  }

  if (components.length === 1) {
    return components;
  }

  split = split || 1; // Split the array in 2 parts

  var left = components.slice(0, split);
  var right = components.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match(singleMatcher);

    for (var i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join('');
      tokens = input.match(singleMatcher);
    }

    return input;
  }
}

function customDecodeURIComponent(input) {
  // Keep track of all the replacements and prefill the map with the `BOM`
  var replaceMap = {
    '%FE%FF': '\uFFFD\uFFFD',
    '%FF%FE': '\uFFFD\uFFFD'
  };
  var match = multiMatcher.exec(input);

  while (match) {
    try {
      // Decode as big chunks as possible
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = decode(match[0]);

      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }

    match = multiMatcher.exec(input);
  } // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else


  replaceMap['%C2'] = '\uFFFD';
  var entries = Object.keys(replaceMap);

  for (var i = 0; i < entries.length; i++) {
    // Replace all decoded components
    var key = entries[i];
    input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
  }

  return input;
}

module.exports = function (encodedURI) {
  if (typeof encodedURI !== 'string') {
    throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
  }

  try {
    encodedURI = encodedURI.replace(/\+/g, ' '); // Try the built in decoder first

    return decodeURIComponent(encodedURI);
  } catch (err) {
    // Fallback to a more advanced decoder
    return customDecodeURIComponent(encodedURI);
  }
};
},{}],"../node_modules/split-on-first/index.js":[function(require,module,exports) {
'use strict';

module.exports = function (string, separator) {
  if (!(typeof string === 'string' && typeof separator === 'string')) {
    throw new TypeError('Expected the arguments to be of type `string`');
  }

  if (separator === '') {
    return [string];
  }

  var separatorIndex = string.indexOf(separator);

  if (separatorIndex === -1) {
    return [string];
  }

  return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
};
},{}],"../node_modules/query-string/index.js":[function(require,module,exports) {
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var strictUriEncode = require('strict-uri-encode');

var decodeComponent = require('decode-uri-component');

var splitOnFirst = require('split-on-first');

function encoderForArrayFormat(options) {
  switch (options.arrayFormat) {
    case 'index':
      return function (key) {
        return function (result, value) {
          var index = result.length;

          if (value === undefined) {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [[encode(key, options), '[', index, ']'].join('')]);
          }

          return [].concat(_toConsumableArray(result), [[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')]);
        };
      };

    case 'bracket':
      return function (key) {
        return function (result, value) {
          if (value === undefined) {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [[encode(key, options), '[]'].join('')]);
          }

          return [].concat(_toConsumableArray(result), [[encode(key, options), '[]=', encode(value, options)].join('')]);
        };
      };

    case 'comma':
      return function (key) {
        return function (result, value, index) {
          if (value === null || value === undefined || value.length === 0) {
            return result;
          }

          if (index === 0) {
            return [[encode(key, options), '=', encode(value, options)].join('')];
          }

          return [[result, encode(value, options)].join(',')];
        };
      };

    default:
      return function (key) {
        return function (result, value) {
          if (value === undefined) {
            return result;
          }

          if (value === null) {
            return [].concat(_toConsumableArray(result), [encode(key, options)]);
          }

          return [].concat(_toConsumableArray(result), [[encode(key, options), '=', encode(value, options)].join('')]);
        };
      };
  }
}

function parserForArrayFormat(options) {
  var result;

  switch (options.arrayFormat) {
    case 'index':
      return function (key, value, accumulator) {
        result = /\[(\d*)\]$/.exec(key);
        key = key.replace(/\[\d*\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {};
        }

        accumulator[key][result[1]] = value;
      };

    case 'bracket':
      return function (key, value, accumulator) {
        result = /(\[\])$/.exec(key);
        key = key.replace(/\[\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };

    case 'comma':
      return function (key, value, accumulator) {
        var isArray = typeof value === 'string' && value.split('').indexOf(',') > -1;
        var newValue = isArray ? value.split(',') : value;
        accumulator[key] = newValue;
      };

    default:
      return function (key, value, accumulator) {
        if (accumulator[key] === undefined) {
          accumulator[key] = value;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };
  }
}

function encode(value, options) {
  if (options.encode) {
    return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
  }

  return value;
}

function decode(value, options) {
  if (options.decode) {
    return decodeComponent(value);
  }

  return value;
}

function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  }

  if (_typeof(input) === 'object') {
    return keysSorter(Object.keys(input)).sort(function (a, b) {
      return Number(a) - Number(b);
    }).map(function (key) {
      return input[key];
    });
  }

  return input;
}

function removeHash(input) {
  var hashStart = input.indexOf('#');

  if (hashStart !== -1) {
    input = input.slice(0, hashStart);
  }

  return input;
}

function extract(input) {
  input = removeHash(input);
  var queryStart = input.indexOf('?');

  if (queryStart === -1) {
    return '';
  }

  return input.slice(queryStart + 1);
}

function parse(input, options) {
  options = Object.assign({
    decode: true,
    sort: true,
    arrayFormat: 'none',
    parseNumbers: false,
    parseBooleans: false
  }, options);
  var formatter = parserForArrayFormat(options); // Create an object with no prototype

  var ret = Object.create(null);

  if (typeof input !== 'string') {
    return ret;
  }

  input = input.trim().replace(/^[?#&]/, '');

  if (!input) {
    return ret;
  }

  for (var param of input.split('&')) {
    var [key, value] = splitOnFirst(param.replace(/\+/g, ' '), '='); // Missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    value = value === undefined ? null : decode(value, options);

    if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
      value = value.toLowerCase() === 'true';
    }

    formatter(decode(key, options), value, ret);
  }

  if (options.sort === false) {
    return ret;
  }

  return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce(function (result, key) {
    var value = ret[key];

    if (Boolean(value) && _typeof(value) === 'object' && !Array.isArray(value)) {
      // Sort object keys, not values
      result[key] = keysSorter(value);
    } else {
      result[key] = value;
    }

    return result;
  }, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (object, options) {
  if (!object) {
    return '';
  }

  options = Object.assign({
    encode: true,
    strict: true,
    arrayFormat: 'none'
  }, options);
  var formatter = encoderForArrayFormat(options);
  var keys = Object.keys(object);

  if (options.sort !== false) {
    keys.sort(options.sort);
  }

  return keys.map(function (key) {
    var value = object[key];

    if (value === undefined) {
      return '';
    }

    if (value === null) {
      return encode(key, options);
    }

    if (Array.isArray(value)) {
      return value.reduce(formatter(key), []).join('&');
    }

    return encode(key, options) + '=' + encode(value, options);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&');
};

exports.parseUrl = function (input, options) {
  return {
    url: removeHash(input).split('?')[0] || '',
    query: parse(extract(input), options)
  };
};
},{"strict-uri-encode":"../node_modules/strict-uri-encode/index.js","decode-uri-component":"../node_modules/decode-uri-component/index.js","split-on-first":"../node_modules/split-on-first/index.js"}],"../node_modules/hyperstatic/src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPathInfo = void 0;

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getPathInfo = (state, path) => {
  const parts = path.split('?');
  const pathName = parts[0];
  const query = parts[1]; // Ignore trailing slashes EXPEPT for home page

  const withoutTrailingSlash = pathName !== '/' ? pathName.replace(/\/$/, '') : pathName;
  const routes = Object.keys(state.routes).map(route => state.routes[route]);
  const matchedRoute = routes.find(route => route.pattern.match(withoutTrailingSlash));
  const matchParams = matchedRoute && matchedRoute.pattern.match(withoutTrailingSlash);
  const loaded = matchedRoute && matchedRoute.view;
  return {
    path: withoutTrailingSlash,
    params: matchParams || {},
    query: query || '',
    queryParams: _queryString.default.parse(query),
    route: matchedRoute && matchedRoute.route,
    // Route pattern, ex: /products/:id
    loaded: !!loaded
  };
};

exports.getPathInfo = getPathInfo;
},{"query-string":"../node_modules/query-string/index.js"}],"../node_modules/hyperstatic/src/actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerPageLoad = exports.TriggerPageLoadIfGoodConnection = exports.Navigate = exports.ParseUrl = void 0;

var _effects = require("./effects");

var _utils = require("./utils");

const ParseUrl = (state, path) => {
  // Set location params
  const pathInfo = (0, _utils.getPathInfo)(state, path);
  const next = { ...state,
    location: pathInfo // If route exists and isn't loaded, load it

  };
  return pathInfo.route && !pathInfo.loaded ? TriggerPageLoad(next, pathInfo.path) : next;
};

exports.ParseUrl = ParseUrl;

const BundleLoaded = (state, {
  path,
  bundle
}) => {
  const routes = Object.keys(state.routes).map(route => state.routes[route]);
  const matchedRoute = routes.find(route => route.pattern.match(path));
  const withBundleLoaded = { ...state,
    routes: { ...state.routes,
      [matchedRoute.route]: { ...matchedRoute,
        view: bundle.default,
        initAction: bundle.Init,
        loading: false
      }
    }
  };

  if (bundle.Init) {
    const markedAsInitiated = { ...withBundleLoaded,
      pageData: { ...withBundleLoaded.pageData,
        [path]: { ...withBundleLoaded.pageData[path],
          initiated: true
        }
      }
    };
    return bundle.Init(markedAsInitiated, (0, _utils.getPathInfo)(withBundleLoaded, path));
  }

  return withBundleLoaded;
}; // Navigate action


const Navigate = (state, to) => [state, (0, _effects.ChangeLocation)({
  to
})];

exports.Navigate = Navigate;

const TriggerPageLoadIfGoodConnection = (state, path) => {
  if (state.goodConnection) {
    return TriggerPageLoad(state, path);
  }

  return state;
};

exports.TriggerPageLoadIfGoodConnection = TriggerPageLoadIfGoodConnection;

const TriggerPageLoad = (state, path) => {
  const routes = Object.keys(state.routes).map(route => state.routes[route]);
  const matchedRoute = routes.find(route => route.pattern.match(path));
  const pageData = state.pageData[path];

  if (matchedRoute && !matchedRoute.view && !matchedRoute.loading) {
    return [{ ...state,
      routes: { ...state.routes,
        [matchedRoute.route]: { ...matchedRoute,
          loading: true
        }
      }
    }, (0, _effects.LoadBundle)({
      path,
      action: BundleLoaded,
      bundlePromise: matchedRoute.bundlePromise
    })];
  }

  if (matchedRoute && matchedRoute.view && !pageData && matchedRoute.initAction) {
    return matchedRoute.initAction({ ...state,
      pageData: { ...state.pageData,
        [path]: { ...pageData,
          initiated: true
        }
      }
    });
  }

  return state;
};

exports.TriggerPageLoad = TriggerPageLoad;
},{"./effects":"../node_modules/hyperstatic/src/effects.js","./utils":"../node_modules/hyperstatic/src/utils.js"}],"../node_modules/url-pattern/lib/url-pattern.js":[function(require,module,exports) {
var define;
// Generated by CoffeeScript 1.10.0
var slice = [].slice;

(function (root, factory) {
  if ('function' === typeof define && define.amd != null) {
    return define([], factory);
  } else if (typeof exports !== "undefined" && exports !== null) {
    return module.exports = factory();
  } else {
    return root.UrlPattern = factory();
  }
})(this, function () {
  var P, UrlPattern, astNodeContainsSegmentsForProvidedParams, astNodeToNames, astNodeToRegexString, baseAstNodeToRegexString, concatMap, defaultOptions, escapeForRegex, getParam, keysAndValuesToObject, newParser, regexGroupCount, stringConcatMap, stringify;

  escapeForRegex = function (string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  concatMap = function (array, f) {
    var i, length, results;
    results = [];
    i = -1;
    length = array.length;

    while (++i < length) {
      results = results.concat(f(array[i]));
    }

    return results;
  };

  stringConcatMap = function (array, f) {
    var i, length, result;
    result = '';
    i = -1;
    length = array.length;

    while (++i < length) {
      result += f(array[i]);
    }

    return result;
  };

  regexGroupCount = function (regex) {
    return new RegExp(regex.toString() + '|').exec('').length - 1;
  };

  keysAndValuesToObject = function (keys, values) {
    var i, key, length, object, value;
    object = {};
    i = -1;
    length = keys.length;

    while (++i < length) {
      key = keys[i];
      value = values[i];

      if (value == null) {
        continue;
      }

      if (object[key] != null) {
        if (!Array.isArray(object[key])) {
          object[key] = [object[key]];
        }

        object[key].push(value);
      } else {
        object[key] = value;
      }
    }

    return object;
  };

  P = {};

  P.Result = function (value, rest) {
    this.value = value;
    this.rest = rest;
  };

  P.Tagged = function (tag, value) {
    this.tag = tag;
    this.value = value;
  };

  P.tag = function (tag, parser) {
    return function (input) {
      var result, tagged;
      result = parser(input);

      if (result == null) {
        return;
      }

      tagged = new P.Tagged(tag, result.value);
      return new P.Result(tagged, result.rest);
    };
  };

  P.regex = function (regex) {
    return function (input) {
      var matches, result;
      matches = regex.exec(input);

      if (matches == null) {
        return;
      }

      result = matches[0];
      return new P.Result(result, input.slice(result.length));
    };
  };

  P.sequence = function () {
    var parsers;
    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return function (input) {
      var i, length, parser, rest, result, values;
      i = -1;
      length = parsers.length;
      values = [];
      rest = input;

      while (++i < length) {
        parser = parsers[i];
        result = parser(rest);

        if (result == null) {
          return;
        }

        values.push(result.value);
        rest = result.rest;
      }

      return new P.Result(values, rest);
    };
  };

  P.pick = function () {
    var indexes, parsers;
    indexes = arguments[0], parsers = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return function (input) {
      var array, result;
      result = P.sequence.apply(P, parsers)(input);

      if (result == null) {
        return;
      }

      array = result.value;
      result.value = array[indexes];
      return result;
    };
  };

  P.string = function (string) {
    var length;
    length = string.length;
    return function (input) {
      if (input.slice(0, length) === string) {
        return new P.Result(string, input.slice(length));
      }
    };
  };

  P.lazy = function (fn) {
    var cached;
    cached = null;
    return function (input) {
      if (cached == null) {
        cached = fn();
      }

      return cached(input);
    };
  };

  P.baseMany = function (parser, end, stringResult, atLeastOneResultRequired, input) {
    var endResult, parserResult, rest, results;
    rest = input;
    results = stringResult ? '' : [];

    while (true) {
      if (end != null) {
        endResult = end(rest);

        if (endResult != null) {
          break;
        }
      }

      parserResult = parser(rest);

      if (parserResult == null) {
        break;
      }

      if (stringResult) {
        results += parserResult.value;
      } else {
        results.push(parserResult.value);
      }

      rest = parserResult.rest;
    }

    if (atLeastOneResultRequired && results.length === 0) {
      return;
    }

    return new P.Result(results, rest);
  };

  P.many1 = function (parser) {
    return function (input) {
      return P.baseMany(parser, null, false, true, input);
    };
  };

  P.concatMany1Till = function (parser, end) {
    return function (input) {
      return P.baseMany(parser, end, true, true, input);
    };
  };

  P.firstChoice = function () {
    var parsers;
    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return function (input) {
      var i, length, parser, result;
      i = -1;
      length = parsers.length;

      while (++i < length) {
        parser = parsers[i];
        result = parser(input);

        if (result != null) {
          return result;
        }
      }
    };
  };

  newParser = function (options) {
    var U;
    U = {};
    U.wildcard = P.tag('wildcard', P.string(options.wildcardChar));
    U.optional = P.tag('optional', P.pick(1, P.string(options.optionalSegmentStartChar), P.lazy(function () {
      return U.pattern;
    }), P.string(options.optionalSegmentEndChar)));
    U.name = P.regex(new RegExp("^[" + options.segmentNameCharset + "]+"));
    U.named = P.tag('named', P.pick(1, P.string(options.segmentNameStartChar), P.lazy(function () {
      return U.name;
    })));
    U.escapedChar = P.pick(1, P.string(options.escapeChar), P.regex(/^./));
    U["static"] = P.tag('static', P.concatMany1Till(P.firstChoice(P.lazy(function () {
      return U.escapedChar;
    }), P.regex(/^./)), P.firstChoice(P.string(options.segmentNameStartChar), P.string(options.optionalSegmentStartChar), P.string(options.optionalSegmentEndChar), U.wildcard)));
    U.token = P.lazy(function () {
      return P.firstChoice(U.wildcard, U.optional, U.named, U["static"]);
    });
    U.pattern = P.many1(P.lazy(function () {
      return U.token;
    }));
    return U;
  };

  defaultOptions = {
    escapeChar: '\\',
    segmentNameStartChar: ':',
    segmentValueCharset: 'a-zA-Z0-9-_~ %',
    segmentNameCharset: 'a-zA-Z0-9',
    optionalSegmentStartChar: '(',
    optionalSegmentEndChar: ')',
    wildcardChar: '*'
  };

  baseAstNodeToRegexString = function (astNode, segmentValueCharset) {
    if (Array.isArray(astNode)) {
      return stringConcatMap(astNode, function (node) {
        return baseAstNodeToRegexString(node, segmentValueCharset);
      });
    }

    switch (astNode.tag) {
      case 'wildcard':
        return '(.*?)';

      case 'named':
        return "([" + segmentValueCharset + "]+)";

      case 'static':
        return escapeForRegex(astNode.value);

      case 'optional':
        return '(?:' + baseAstNodeToRegexString(astNode.value, segmentValueCharset) + ')?';
    }
  };

  astNodeToRegexString = function (astNode, segmentValueCharset) {
    if (segmentValueCharset == null) {
      segmentValueCharset = defaultOptions.segmentValueCharset;
    }

    return '^' + baseAstNodeToRegexString(astNode, segmentValueCharset) + '$';
  };

  astNodeToNames = function (astNode) {
    if (Array.isArray(astNode)) {
      return concatMap(astNode, astNodeToNames);
    }

    switch (astNode.tag) {
      case 'wildcard':
        return ['_'];

      case 'named':
        return [astNode.value];

      case 'static':
        return [];

      case 'optional':
        return astNodeToNames(astNode.value);
    }
  };

  getParam = function (params, key, nextIndexes, sideEffects) {
    var index, maxIndex, result, value;

    if (sideEffects == null) {
      sideEffects = false;
    }

    value = params[key];

    if (value == null) {
      if (sideEffects) {
        throw new Error("no values provided for key `" + key + "`");
      } else {
        return;
      }
    }

    index = nextIndexes[key] || 0;
    maxIndex = Array.isArray(value) ? value.length - 1 : 0;

    if (index > maxIndex) {
      if (sideEffects) {
        throw new Error("too few values provided for key `" + key + "`");
      } else {
        return;
      }
    }

    result = Array.isArray(value) ? value[index] : value;

    if (sideEffects) {
      nextIndexes[key] = index + 1;
    }

    return result;
  };

  astNodeContainsSegmentsForProvidedParams = function (astNode, params, nextIndexes) {
    var i, length;

    if (Array.isArray(astNode)) {
      i = -1;
      length = astNode.length;

      while (++i < length) {
        if (astNodeContainsSegmentsForProvidedParams(astNode[i], params, nextIndexes)) {
          return true;
        }
      }

      return false;
    }

    switch (astNode.tag) {
      case 'wildcard':
        return getParam(params, '_', nextIndexes, false) != null;

      case 'named':
        return getParam(params, astNode.value, nextIndexes, false) != null;

      case 'static':
        return false;

      case 'optional':
        return astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes);
    }
  };

  stringify = function (astNode, params, nextIndexes) {
    if (Array.isArray(astNode)) {
      return stringConcatMap(astNode, function (node) {
        return stringify(node, params, nextIndexes);
      });
    }

    switch (astNode.tag) {
      case 'wildcard':
        return getParam(params, '_', nextIndexes, true);

      case 'named':
        return getParam(params, astNode.value, nextIndexes, true);

      case 'static':
        return astNode.value;

      case 'optional':
        if (astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes)) {
          return stringify(astNode.value, params, nextIndexes);
        } else {
          return '';
        }

    }
  };

  UrlPattern = function (arg1, arg2) {
    var groupCount, options, parsed, parser, withoutWhitespace;

    if (arg1 instanceof UrlPattern) {
      this.isRegex = arg1.isRegex;
      this.regex = arg1.regex;
      this.ast = arg1.ast;
      this.names = arg1.names;
      return;
    }

    this.isRegex = arg1 instanceof RegExp;

    if (!('string' === typeof arg1 || this.isRegex)) {
      throw new TypeError('argument must be a regex or a string');
    }

    if (this.isRegex) {
      this.regex = arg1;

      if (arg2 != null) {
        if (!Array.isArray(arg2)) {
          throw new Error('if first argument is a regex the second argument may be an array of group names but you provided something else');
        }

        groupCount = regexGroupCount(this.regex);

        if (arg2.length !== groupCount) {
          throw new Error("regex contains " + groupCount + " groups but array of group names contains " + arg2.length);
        }

        this.names = arg2;
      }

      return;
    }

    if (arg1 === '') {
      throw new Error('argument must not be the empty string');
    }

    withoutWhitespace = arg1.replace(/\s+/g, '');

    if (withoutWhitespace !== arg1) {
      throw new Error('argument must not contain whitespace');
    }

    options = {
      escapeChar: (arg2 != null ? arg2.escapeChar : void 0) || defaultOptions.escapeChar,
      segmentNameStartChar: (arg2 != null ? arg2.segmentNameStartChar : void 0) || defaultOptions.segmentNameStartChar,
      segmentNameCharset: (arg2 != null ? arg2.segmentNameCharset : void 0) || defaultOptions.segmentNameCharset,
      segmentValueCharset: (arg2 != null ? arg2.segmentValueCharset : void 0) || defaultOptions.segmentValueCharset,
      optionalSegmentStartChar: (arg2 != null ? arg2.optionalSegmentStartChar : void 0) || defaultOptions.optionalSegmentStartChar,
      optionalSegmentEndChar: (arg2 != null ? arg2.optionalSegmentEndChar : void 0) || defaultOptions.optionalSegmentEndChar,
      wildcardChar: (arg2 != null ? arg2.wildcardChar : void 0) || defaultOptions.wildcardChar
    };
    parser = newParser(options);
    parsed = parser.pattern(arg1);

    if (parsed == null) {
      throw new Error("couldn't parse pattern");
    }

    if (parsed.rest !== '') {
      throw new Error("could only partially parse pattern");
    }

    this.ast = parsed.value;
    this.regex = new RegExp(astNodeToRegexString(this.ast, options.segmentValueCharset));
    this.names = astNodeToNames(this.ast);
  };

  UrlPattern.prototype.match = function (url) {
    var groups, match;
    match = this.regex.exec(url);

    if (match == null) {
      return null;
    }

    groups = match.slice(1);

    if (this.names) {
      return keysAndValuesToObject(this.names, groups);
    } else {
      return groups;
    }
  };

  UrlPattern.prototype.stringify = function (params) {
    if (params == null) {
      params = {};
    }

    if (this.isRegex) {
      throw new Error("can't stringify patterns generated from a regex");
    }

    if (params !== Object(params)) {
      throw new Error("argument must be an object or undefined");
    }

    return stringify(this.ast, params, {});
  };

  UrlPattern.escapeForRegex = escapeForRegex;
  UrlPattern.concatMap = concatMap;
  UrlPattern.stringConcatMap = stringConcatMap;
  UrlPattern.regexGroupCount = regexGroupCount;
  UrlPattern.keysAndValuesToObject = keysAndValuesToObject;
  UrlPattern.P = P;
  UrlPattern.newParser = newParser;
  UrlPattern.defaultOptions = defaultOptions;
  UrlPattern.astNodeToRegexString = astNodeToRegexString;
  UrlPattern.astNodeToNames = astNodeToNames;
  UrlPattern.getParam = getParam;
  UrlPattern.astNodeContainsSegmentsForProvidedParams = astNodeContainsSegmentsForProvidedParams;
  UrlPattern.stringify = stringify;
  return UrlPattern;
});
},{}],"../node_modules/hyperstatic/src/buildRoutesObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRoutesObject = void 0;

var _urlPattern = _interopRequireDefault(require("url-pattern"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Build routes object
const buildRoutesObject = routes => Object.keys(routes).reduce((routesObj, route) => ({ ...routesObj,
  [route]: { ...routesObj[route],
    route,
    bundlePromise: routes[route],
    pattern: new _urlPattern.default(route)
  }
}), window.initialState ? window.initialState.routes : {});

exports.buildRoutesObject = buildRoutesObject;
},{"url-pattern":"../node_modules/url-pattern/lib/url-pattern.js"}],"../node_modules/hyperstatic/src/hyperstatic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hyperstatic = void 0;

var _hyperapp = require("hyperapp");

var _subscriptions = require("./subscriptions");

var _actions = require("./actions");

var _buildRoutesObject = require("./buildRoutesObject");

const hyperstatic = ({
  routes,
  init: userInit,
  view,
  subscriptions: userSubs,
  node
}) => {
  // TODO: use something more reliable
  const connSpeed = navigator.connection ? navigator.connection.downlink : 10;
  const goodConnection = window.navigator.userAgent === 'puppeteer' ? false : connSpeed > 2;
  const init = {
    goodConnection,
    routes: (0, _buildRoutesObject.buildRoutesObject)(routes),
    pageData: {},
    ...userInit
  }; // Initialize hyperapp

  (0, _hyperapp.app)({
    // Merge user init with hyperstatic init
    init: (0, _actions.ParseUrl)(init, window.location.pathname + window.location.search),
    // Use view as-is
    view,
    // Add a subscription to the sub array
    subscriptions: state => {
      const subs = userSubs ? userSubs(state) : [];
      return subs.concat([(0, _subscriptions.LocationChanged)({
        action: _actions.ParseUrl
      })]);
    },
    node
  }); // TODO: find something better than this... (Init effect, find a nice way to merge with user's tuple)
  // I added this because there is no oncreate event when re-hydrating existing html (which is the expected behavior)

  setTimeout(() => {
    document.querySelectorAll('a').forEach(link => {
      link.dispatchEvent(new CustomEvent('triggerpageload'));
    });
  }, 75);
};

exports.hyperstatic = hyperstatic;
},{"hyperapp":"../node_modules/hyperapp/src/index.js","./subscriptions":"../node_modules/hyperstatic/src/subscriptions.js","./actions":"../node_modules/hyperstatic/src/actions.js","./buildRoutesObject":"../node_modules/hyperstatic/src/buildRoutesObject.js"}],"../node_modules/hyperstatic/src/Lifecycle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lifecycle = void 0;

var _hyperapp = require("hyperapp");

/**
 * Simple helper to add lifecycle events to v2
 * Thanks @sergey-shpak for this awesome hook!
 * https://codepen.io/sergey-shpak/pen/GbyOvx
 *
 */
const Lifecycle = (elementName, props, children) => {
  const fn = (method, eventName) => function (el) {
    const event = new CustomEvent(eventName, {
      detail: el
    });
    setTimeout(() => el.parentElement.dispatchEvent(event));
    return Object.getPrototypeOf(this)[method].call(this, el);
  };

  return (0, _hyperapp.h)(elementName, {
    appendChild: fn('appendChild', 'create'),
    removeChild: fn('removeChild', 'remove'),
    ...props
  }, children);
};

exports.Lifecycle = Lifecycle;
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"../node_modules/hyperstatic/src/Link.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = void 0;

var _Lifecycle = require("./Lifecycle");

var _actions = require("./actions");

// Link component
const Link = ({
  to,
  ...props
}, children) => {
  return (0, _Lifecycle.Lifecycle)('a', {
    href: to,
    onclick: [_actions.Navigate, ev => {
      ev.preventDefault();
      return to;
    }],
    onmouseover: [_actions.TriggerPageLoad, to],
    oncreate: [_actions.TriggerPageLoadIfGoodConnection, to],
    ontriggerpageload: [_actions.TriggerPageLoadIfGoodConnection, to],
    ...props
  }, children);
};

exports.Link = Link;
},{"./Lifecycle":"../node_modules/hyperstatic/src/Lifecycle.js","./actions":"../node_modules/hyperstatic/src/actions.js"}],"../node_modules/hyperstatic/src/htmlToVdom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlToVdom = void 0;

var _hyperapp = require("hyperapp");

/**
 * Html to hyperapp VDOM converter
 * Implemented by gungorkocak
 * https://github.com/gungorkocak
 * (shared on the hyperapp slack)
 * Someone should make this a package...
 */
const mapProps = attrs => [...attrs].reduce((props, attr) => attr.nodeName === 'style' ? props // ignore string style definitions for now.
: { ...props,
  [attr.nodeName]: attr.nodeValue
}, {});

const mapChildren = childNodes => {
  if (!!childNodes && childNodes.length > 0) {
    return [...childNodes].map(node => mapVNode(node));
  } else {
    return [];
  }
};

const mapVNode = node => {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return node.nodeValue;

    case Node.ELEMENT_NODE:
      return (0, _hyperapp.h)(node.tagName, mapProps(node.attributes), mapChildren(node.childNodes));

    default:
      throw new Error(`${node.nodeType} is not supported`);
  }
};

const htmlToVdom = html => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const node = mapVNode(doc.body);
  node.name = 'div';
  return node;
};

exports.htmlToVdom = htmlToVdom;
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"../node_modules/hyperstatic/src/Router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var _hyperapp = require("hyperapp");

var _htmlToVdom = require("./htmlToVdom");

// import serialize from 'serialize-javascript'
// Router component
const Router = state => {
  // State pre-fetching testing
  // if (window.navigator.userAgent === 'puppeteer') {
  //   let scriptTag = document.getElementById('initial-state')
  //   if (!scriptTag) {
  //     scriptTag = document.createElement('script')
  //     document.body.appendChild(scriptTag)
  //   }
  //   scriptTag.id = 'initial-state'
  //   scriptTag.text = `
  //     window.initialState = ${serialize(state)}
  //   `
  // }
  const matchedRoute = state.routes[state.location.route];

  if (!matchedRoute) {
    return '404';
  }

  const pageData = state.pageData[state.location.path];

  if (matchedRoute.view) {
    if (!matchedRoute.initAction) {
      return (0, _hyperapp.h)('div', {
        id: 'router-outlet'
      }, [matchedRoute.view(state)]);
    } else {
      if (pageData && pageData.initiated) {
        return (0, _hyperapp.h)('div', {
          id: 'router-outlet'
        }, [matchedRoute.view(state)]);
      }
    }
  }

  const previousOutlet = document.getElementById('router-outlet');

  if (previousOutlet) {
    // console.log('Keeping existing HTML while view loads...')
    return (0, _hyperapp.h)('div', {
      id: 'router-outlet'
    }, [(0, _htmlToVdom.htmlToVdom)(previousOutlet.innerHTML)]);
  } // console.log('Loading view...')


  return 'Loading...';
};

exports.Router = Router;
},{"hyperapp":"../node_modules/hyperapp/src/index.js","./htmlToVdom":"../node_modules/hyperstatic/src/htmlToVdom.js"}],"../node_modules/hyperstatic/src/NoPrerender.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoPrerender = void 0;

/**
 * Disables rendering of child nodes while pre-rendering
 */
const NoPrerender = (props, children) => {
  if (window.navigator.userAgent !== 'puppeteer') {
    return children;
  }
};

exports.NoPrerender = NoPrerender;
},{}],"../node_modules/hyperstatic/src/StaticFetch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticFetch = void 0;

/**
 * Static fetch effect
 * In development mode, will hit real APIs over HTTP.
 * Once built, your code will hit pre-rendered JSON files
 */
const fetchFx = (dispatch, {
  url,
  action,
  error
}) => {
  fetch(url).then(response => response.json()).then(data => {
    if (window.navigator.userAgent === 'puppeteer') {
      window.staticData = { ...window.staticData,
        [url]: data
      };
    }

    dispatch(action, data);
  }).catch(err => dispatch(error, err));
};

const StaticFetch = ({
  url,
  action,
  error
}) => [fetchFx, {
  url,
  action,
  error
}];

exports.StaticFetch = StaticFetch;
},{}],"../node_modules/hyperstatic/src/StaticQuery.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticQuery = void 0;

/**
 * Static GraphQL query
 * In development mode, will hit real APIs over HTTP.
 * Once built, your code will hit pre-rendered JSON files
 */
const graphQLEffect = (dispatch, {
  url,
  query,
  action,
  error
}) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query
    })
  }).then(data => {
    if (window.navigator.userAgent === 'puppeteer') {
      window.staticData = { ...window.staticData,
        [query]: data
      };
    }

    dispatch(action, data);
  }).catch(err => dispatch(error, err));
};

const StaticQuery = ({
  url,
  query,
  action,
  error
}) => [graphQLEffect, {
  url,
  query,
  action,
  error
}];

exports.StaticQuery = StaticQuery;
},{}],"../node_modules/hyperstatic/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "hyperstatic", {
  enumerable: true,
  get: function () {
    return _hyperstatic.hyperstatic;
  }
});
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function () {
    return _Link.Link;
  }
});
Object.defineProperty(exports, "Router", {
  enumerable: true,
  get: function () {
    return _Router.Router;
  }
});
Object.defineProperty(exports, "NoPrerender", {
  enumerable: true,
  get: function () {
    return _NoPrerender.NoPrerender;
  }
});
Object.defineProperty(exports, "StaticFetch", {
  enumerable: true,
  get: function () {
    return _StaticFetch.StaticFetch;
  }
});
Object.defineProperty(exports, "StaticQuery", {
  enumerable: true,
  get: function () {
    return _StaticQuery.StaticQuery;
  }
});

var _hyperstatic = require("./hyperstatic");

var _Link = require("./Link");

var _Router = require("./Router");

var _NoPrerender = require("./NoPrerender");

var _StaticFetch = require("./StaticFetch");

var _StaticQuery = require("./StaticQuery");
},{"./hyperstatic":"../node_modules/hyperstatic/src/hyperstatic.js","./Link":"../node_modules/hyperstatic/src/Link.js","./Router":"../node_modules/hyperstatic/src/Router.js","./NoPrerender":"../node_modules/hyperstatic/src/NoPrerender.js","./StaticFetch":"../node_modules/hyperstatic/src/StaticFetch.js","./StaticQuery":"../node_modules/hyperstatic/src/StaticQuery.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/sanitize.css/sanitize.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/sanitize.css/typography.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/sanitize.css/forms.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"global.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"app/routes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  '/': require("_bundle_loader")(require.resolve('./pages/Home')),
  '/project': require("_bundle_loader")(require.resolve('./pages/Project')) // '/starter': import('./pages/Starter'),
  // '/counter': import('./pages/Counter'),
  // '/heros': import('./pages/Heros'),
  // '/heros/:id': import('./pages/Heros/Pokemon'),
  // '/apod': import('./pages/Apod')

};
exports.default = _default;
},{"_bundle_loader":"../node_modules/parcel-bundler/src/builtins/bundle-loader.js","./pages/Home":[["Home.e77063ed.js","app/pages/Home/index.jsx"],"Home.e77063ed.js.map",["home.438fc2e8.html","app/pages/Home/home.md"],"app/pages/Home/index.jsx"],"./pages/Project":[["Project.83d2513a.js","app/pages/Project/index.jsx"],"Project.83d2513a.js.map",["project.de02d79a.html","app/pages/Project/project.md"],"app/pages/Project/index.jsx"]}],"app/init.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  extra: 'My extra garbage'
};
exports.default = _default;
},{}],"app/actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandleError = exports.ToggleGoodConnection = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ToggleGoodConnection = function ToggleGoodConnection(state) {
  return _objectSpread({}, state, {
    goodConnection: !state.goodConnection
  });
};

exports.ToggleGoodConnection = ToggleGoodConnection;

var HandleError = function HandleError(state, err) {
  console.error(err);
  return state;
};

exports.HandleError = HandleError;
},{}],"app/components/FetchingModeToggler.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

var _actions = require("../actions");

var _default = function _default(_ref) {
  var state = _ref.state;
  var checked = !state.goodConnection;
  return (0, _hyperapp.h)("div", {
    class: "fetching-mode-toggler"
  }, (0, _hyperapp.h)("input", {
    type: "checkbox",
    id: 'fetch-mode-checkbox',
    checked: checked,
    value: checked,
    oninput: _actions.ToggleGoodConnection
  }), (0, _hyperapp.h)("input", {
    name: "fetch-mode",
    type: "hidden",
    value: (!!checked).toString()
  }));
};

exports.default = _default;
},{"hyperapp":"../node_modules/hyperapp/src/index.js","../actions":"app/actions.js"}],"app/components/Header.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

var _FetchingModeToggler = _interopRequireDefault(require("./FetchingModeToggler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connSpeed = navigator.connection ? navigator.connection.downlink : 10; // Header

var _default = function _default(_ref) {
  var state = _ref.state;
  return (0, _hyperapp.h)("header", {
    class: "header"
  }, (0, _hyperapp.h)("p", null, "Connection speed: ", connSpeed > 2 ? '⚡' : '🐢'), (0, _hyperapp.h)(_FetchingModeToggler.default, {
    state: state
  }));
};

exports.default = _default;
},{"hyperapp":"../node_modules/hyperapp/src/index.js","./FetchingModeToggler":"app/components/FetchingModeToggler.jsx"}],"app/components/icons.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Github = exports.Check = exports.Plus = exports.CheckedCircle = exports.Circle = exports.Close = exports.Ready = exports.Loading = exports.Iddle = exports.Invalid = void 0;

var _hyperapp = require("hyperapp");

var Invalid = function Invalid() {
  return (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-alert-circle"
  }, (0, _hyperapp.h)("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), (0, _hyperapp.h)("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), (0, _hyperapp.h)("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "16"
  }));
};

exports.Invalid = Invalid;

var Iddle = function Iddle() {
  return (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-x"
  }, (0, _hyperapp.h)("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), (0, _hyperapp.h)("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
};

exports.Iddle = Iddle;

var Loading = function Loading() {
  return (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-loader"
  }, (0, _hyperapp.h)("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "6"
  }), (0, _hyperapp.h)("line", {
    x1: "12",
    y1: "18",
    x2: "12",
    y2: "22"
  }), (0, _hyperapp.h)("line", {
    x1: "4.93",
    y1: "4.93",
    x2: "7.76",
    y2: "7.76"
  }), (0, _hyperapp.h)("line", {
    x1: "16.24",
    y1: "16.24",
    x2: "19.07",
    y2: "19.07"
  }), (0, _hyperapp.h)("line", {
    x1: "2",
    y1: "12",
    x2: "6",
    y2: "12"
  }), (0, _hyperapp.h)("line", {
    x1: "18",
    y1: "12",
    x2: "22",
    y2: "12"
  }), (0, _hyperapp.h)("line", {
    x1: "4.93",
    y1: "19.07",
    x2: "7.76",
    y2: "16.24"
  }), (0, _hyperapp.h)("line", {
    x1: "16.24",
    y1: "7.76",
    x2: "19.07",
    y2: "4.93"
  }));
};

exports.Loading = Loading;

var Ready = function Ready() {
  return (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-check-circle"
  }, (0, _hyperapp.h)("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), (0, _hyperapp.h)("polyline", {
    points: "22 4 12 14.01 9 11.01"
  }));
};

exports.Ready = Ready;

var Close = function Close() {
  return (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-x"
  }, (0, _hyperapp.h)("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), (0, _hyperapp.h)("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
};

exports.Close = Close;

var Circle = function Circle() {
  return (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-circle"
  }, (0, _hyperapp.h)("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }));
};

exports.Circle = Circle;

var CheckedCircle = function CheckedCircle() {
  return (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-check-circle"
  }, (0, _hyperapp.h)("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), (0, _hyperapp.h)("polyline", {
    points: "22 4 12 14.01 9 11.01"
  }));
};

exports.CheckedCircle = CheckedCircle;

var Plus = function Plus() {
  return (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-plus"
  }, (0, _hyperapp.h)("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), (0, _hyperapp.h)("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }));
};

exports.Plus = Plus;

var Check = function Check() {
  return (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-check"
  }, (0, _hyperapp.h)("polyline", {
    points: "20 6 9 17 4 12"
  }));
};

exports.Check = Check;

var Github = function Github() {
  return (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-github"
  }, (0, _hyperapp.h)("path", {
    d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
  }));
};

exports.Github = Github;
},{"hyperapp":"../node_modules/hyperapp/src/index.js"}],"app/components/LinkWithStatus.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

var _hyperstatic = require("hyperstatic");

var _icons = require("./icons");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _default = function _default(_ref, children) {
  var state = _ref.state,
      to = _ref.to,
      props = _objectWithoutProperties(_ref, ["state", "to"]);

  var statusToSvg = {
    'invalid': _icons.Invalid,
    'iddle': _icons.Iddle,
    'loading': _icons.Loading,
    'ready': _icons.Check,
    'active': _icons.Check
  };
  var routes = Object.keys(state.routes).map(function (route) {
    return state.routes[route];
  });
  var matchedRoute = routes.find(function (route) {
    return route.pattern.match(to);
  });
  var active = to === state.location.path;
  var status = !matchedRoute ? 'invalid' : !matchedRoute.view && !matchedRoute.loading ? 'iddle' : matchedRoute.loading ? 'loading' : active ? 'active' : 'ready';
  return (0, _hyperapp.h)(_hyperstatic.Link, _extends({
    class: _defineProperty({
      'link-with-status': true
    }, status, true),
    to: to
  }, props), children, (0, _hyperapp.h)("small", null, status), statusToSvg[status]());
};

exports.default = _default;
},{"hyperapp":"../node_modules/hyperapp/src/index.js","hyperstatic":"../node_modules/hyperstatic/src/index.js","./icons":"app/components/icons.jsx"}],"app/components/Sidebar.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

var _LinkWithStatus = _interopRequireDefault(require("./LinkWithStatus"));

var _icons = require("./icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var state = _ref.state;
  return (0, _hyperapp.h)("aside", {
    class: "sidebar"
  }, (0, _hyperapp.h)("div", {
    class: "menu"
  }, (0, _hyperapp.h)("header", {
    role: "banner",
    id: "banner"
  }, (0, _hyperapp.h)("h1", null, "Mobile Gods"), (0, _hyperapp.h)("p", null, "Mobile Gods Pro Builds")), (0, _hyperapp.h)("nav", {
    role: "navigation"
  }, (0, _hyperapp.h)("div", {
    class: "container"
  }, (0, _hyperapp.h)("input", {
    type: "checkbox",
    id: "navbar-burger-toggle",
    class: "navbar-burger-toggle is-hidden"
  }), (0, _hyperapp.h)("label", {
    for: "navbar-burger-toggle",
    class: "navbar-burger"
  }, (0, _hyperapp.h)("span", null), (0, _hyperapp.h)("span", null), (0, _hyperapp.h)("span", null)), (0, _hyperapp.h)("div", {
    class: "navbar-menu"
  }, (0, _hyperapp.h)("div", null, (0, _hyperapp.h)(_LinkWithStatus.default, {
    state: state,
    to: "/"
  }, "Home"), (0, _hyperapp.h)(_LinkWithStatus.default, {
    state: state,
    to: "/project"
  }, "The project"), (0, _hyperapp.h)(_LinkWithStatus.default, {
    state: state,
    to: "/starter"
  }, "Quick start "), (0, _hyperapp.h)(_LinkWithStatus.default, {
    state: state,
    to: "/counter"
  }, "Counter"), (0, _hyperapp.h)(_LinkWithStatus.default, {
    state: state,
    to: "/heros"
  }, "Heros"), (0, _hyperapp.h)(_LinkWithStatus.default, {
    state: state,
    to: "/apod"
  }, "APOD"))))), (0, _hyperapp.h)("footer", null)));
};

exports.default = _default;
},{"hyperapp":"../node_modules/hyperapp/src/index.js","./LinkWithStatus":"app/components/LinkWithStatus.jsx","./icons":"app/components/icons.jsx"}],"app/view.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

var _hyperstatic = require("hyperstatic");

var _Header = _interopRequireDefault(require("./components/Header"));

var _Sidebar = _interopRequireDefault(require("./components/Sidebar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// root view
var _default = function _default(state) {
  // console.log('State:', state)
  return (0, _hyperapp.h)("div", {
    id: "app",
    class: "layout",
    role: "document"
  }, (0, _hyperapp.h)(_Sidebar.default, {
    state: state
  }), (0, _hyperapp.h)("main", {
    role: "main",
    class: "main-content"
  }, (0, _hyperapp.h)(_Header.default, {
    state: state
  }), (0, _hyperapp.h)("div", {
    key: state.location.path,
    class: "box"
  }, (0, _hyperstatic.Router)(state))));
};

exports.default = _default;
},{"hyperapp":"../node_modules/hyperapp/src/index.js","hyperstatic":"../node_modules/hyperstatic/src/index.js","./components/Header":"app/components/Header.jsx","./components/Sidebar":"app/components/Sidebar.jsx"}],"app.js":[function(require,module,exports) {
"use strict";

var _hyperstatic = require("hyperstatic");

require("sanitize.css");

require("sanitize.css/typography.css");

require("sanitize.css/forms.css");

require("./global.css");

var _routes = _interopRequireDefault(require("./app/routes"));

var _init = _interopRequireDefault(require("./app/init"));

var _view = _interopRequireDefault(require("./app/view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import best-practices defaults
// Global styling
// Import app
// Initialize the app
(0, _hyperstatic.hyperstatic)({
  routes: _routes.default,
  init: _init.default,
  view: _view.default,
  subscriptions: function subscriptions() {
    return [];
  },
  node: document.getElementById('app')
}); // Enable the service worker in production

if ("development" === 'production') {
  navigator.serviceWorker.register("".concat(window.location.origin, "/sw.js"));
}
},{"hyperstatic":"../node_modules/hyperstatic/src/index.js","sanitize.css":"../node_modules/sanitize.css/sanitize.css","sanitize.css/typography.css":"../node_modules/sanitize.css/typography.css","sanitize.css/forms.css":"../node_modules/sanitize.css/forms.css","./global.css":"global.css","./app/routes":"app/routes.js","./app/init":"app/init.js","./app/view":"app/view.jsx"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62811" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}],"../node_modules/parcel-bundler/src/builtins/loaders/browser/html-loader.js":[function(require,module,exports) {
module.exports = function loadHTMLBundle(bundle) {
  return fetch(bundle).then(function (res) {
    return res.text();
  });
};
},{}],"../node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("../node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("html",require("../node_modules/parcel-bundler/src/builtins/loaders/browser/html-loader.js"));b.register("js",require("../node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js"));
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0,"app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map
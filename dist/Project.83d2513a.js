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
})({"app/pages/Project/index.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

var _htmlToVdom = require("hyperstatic/src/htmlToVdom");

var _project = _interopRequireDefault(require("./project.md"));

var _hyperstatic = require("hyperstatic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export default () => htmlToVdom(markdown)
var _default = function _default() {
  return (0, _hyperapp.h)("div", {
    class: "project_section"
  }, (0, _hyperapp.h)("div", null, (0, _hyperapp.h)("header", {
    class: "hero"
  }, (0, _hyperapp.h)("div", {
    class: "hero-wrap"
  }, (0, _hyperapp.h)("p", {
    class: "intro",
    id: "intro"
  }, "MobileGods.GG"), (0, _hyperapp.h)("h1", {
    id: "headline"
  }, "Tournament"), (0, _hyperapp.h)("p", {
    class: "year"
  }, (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    class: "bi bi-star",
    viewBox: "0 0 16 16"
  }, (0, _hyperapp.h)("path", {
    d: "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
  })), " 2021 ", (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    class: "bi bi-star",
    viewBox: "0 0 16 16"
  }, (0, _hyperapp.h)("path", {
    d: "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
  }))), (0, _hyperapp.h)("p", null, "MobileGods Pro"))), (0, _hyperapp.h)("section", {
    id: "bracket"
  }, (0, _hyperapp.h)("div", {
    class: "container"
  }, (0, _hyperapp.h)("div", {
    class: "split split-one"
  }, (0, _hyperapp.h)("div", {
    class: "round round-one current"
  }, (0, _hyperapp.h)("div", {
    class: "round-details"
  }, "Round 1", (0, _hyperapp.h)("br", null), (0, _hyperapp.h)("span", {
    class: "date"
  }, "May 21")), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Shenanigans", (0, _hyperapp.h)("span", {
    class: "score"
  }, "22")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "HYDRA PREDATOR", (0, _hyperapp.h)("span", {
    class: "score"
  }, "6"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Force Esports", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "STALWARTS", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Anubis Eternal", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "PAG TALO TULOG", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "BEMBEM BM SQUAD", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "BETTERPLAY PH", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "ZULTRA", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Devil Outlaws", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "NAPADAAN LANG", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Reverie PH", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "CNCR IMPERIUM", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Frixon Zero", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Owshii Squad", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Neon Aces", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Basta_Squad_To", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "AFK Prodigies", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "LIGION CYBERS", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "PROPHECY MAIN", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Guardians\u2122", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "DUMZVILLE", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Squad Fafap", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "SadBoi Esports", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "iCON ESPORTS", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "EXILE", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Prodigy Esports", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Invictus Esports", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Trouble Makers\u2122", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "FE Frenzy Epro", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Xpected Gaming", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "OMEGA 2.0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")))), (0, _hyperapp.h)("div", {
    class: "round round-two"
  }, (0, _hyperapp.h)("div", {
    class: "round-details"
  }, "Round 2", (0, _hyperapp.h)("br", null), (0, _hyperapp.h)("span", {
    class: "date"
  }, "May 18")), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Shenanigans", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")))), (0, _hyperapp.h)("div", {
    class: "round round-three"
  }, (0, _hyperapp.h)("div", {
    class: "round-details"
  }, "Round 3", (0, _hyperapp.h)("br", null), (0, _hyperapp.h)("span", {
    class: "date"
  }, "May 22")), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))))), (0, _hyperapp.h)("div", {
    class: "champion"
  }, (0, _hyperapp.h)("div", {
    class: "semis-l"
  }, (0, _hyperapp.h)("div", {
    class: "round-details"
  }, "west semifinals ", (0, _hyperapp.h)("br", null), (0, _hyperapp.h)("span", {
    class: "date"
  }, "March 26-28")), (0, _hyperapp.h)("ul", {
    class: "matchup championship"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "vote-count"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "vote-count"
  }, "\xA0")))), (0, _hyperapp.h)("div", {
    class: "final"
  }, (0, _hyperapp.h)("i", {
    class: "fa fa-trophy"
  }), (0, _hyperapp.h)("div", {
    class: "round-details"
  }, "championship ", (0, _hyperapp.h)("br", null), (0, _hyperapp.h)("span", {
    class: "date"
  }, "May 22 - May 23")), (0, _hyperapp.h)("ul", {
    class: "matchup championship"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "vote-count"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "vote-count"
  }, "\xA0")))), (0, _hyperapp.h)("div", {
    class: "semis-r"
  }, (0, _hyperapp.h)("div", {
    class: "round-details"
  }, "east semifinals ", (0, _hyperapp.h)("br", null), (0, _hyperapp.h)("span", {
    class: "date"
  }, "March 26-28")), (0, _hyperapp.h)("ul", {
    class: "matchup championship"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "vote-count"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "vote-count"
  }, "\xA0"))))), (0, _hyperapp.h)("div", {
    class: "split split-two"
  }, (0, _hyperapp.h)("div", {
    class: "round round-three"
  }, (0, _hyperapp.h)("div", {
    class: "round-details"
  }, "Round 3", (0, _hyperapp.h)("br", null), (0, _hyperapp.h)("span", {
    class: "date"
  }, "March 22")), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")))), (0, _hyperapp.h)("div", {
    class: "round round-two"
  }, (0, _hyperapp.h)("div", {
    class: "round-details"
  }, "Round 2", (0, _hyperapp.h)("br", null), (0, _hyperapp.h)("span", {
    class: "date"
  }, "March 18")), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xA0", (0, _hyperapp.h)("span", {
    class: "score"
  }, "\xA0")))), (0, _hyperapp.h)("div", {
    class: "round round-one current"
  }, (0, _hyperapp.h)("div", {
    class: "round-details"
  }, "Round 1", (0, _hyperapp.h)("br", null), (0, _hyperapp.h)("span", {
    class: "date"
  }, "March 16")), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Area 69", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Pig Benis", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Kamras sa iring", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "ASTRAEUS FORCE", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "AYNARETRI", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Myoshu Athena", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "BREN Cells", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "\xC6ther Predators", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "GreeVilsGreed", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Cassiopeia Angels", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Myoshu Esports", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "MIRACULOUS HYDRA", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "FANTASMA", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "ANUBIS EMPIRE PH (AEPH)", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Nubplay Esports", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Iconic Esports", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "TURTLE ESPORTS", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "WPP Warriors", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Zealous Fatalis", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Deadnauts Esports", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Van Wilder", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Kamote Gaming", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "AFTERLIFE", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Fatalis Plague", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "Excalibur", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "AFK Einsteinium", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "5o1", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "Phoenix Esports PH", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "HYDRA GLADIATOR", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "ALA EH ESPORTS", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))), (0, _hyperapp.h)("ul", {
    class: "matchup"
  }, (0, _hyperapp.h)("li", {
    class: "team team-top"
  }, "EMPTY", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0")), (0, _hyperapp.h)("li", {
    class: "team team-bottom"
  }, "EMPTY", (0, _hyperapp.h)("span", {
    class: "score"
  }, "0"))))))), (0, _hyperapp.h)("section", {
    class: "share"
  }, (0, _hyperapp.h)("div", {
    class: "share-wrap"
  }, (0, _hyperapp.h)("a", {
    class: "share-icon",
    href: "#"
  }, (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    class: "bi bi-twitter",
    viewBox: "0 0 16 16"
  }, (0, _hyperapp.h)("path", {
    d: "M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
  }))), (0, _hyperapp.h)("a", {
    class: "share-icon",
    href: "https://www.facebook.com/mobilegodsgg"
  }, (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    class: "bi bi-facebook",
    viewBox: "0 0 16 16"
  }, (0, _hyperapp.h)("path", {
    d: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
  }))), (0, _hyperapp.h)("a", {
    class: "share-icon",
    href: "#"
  }, (0, _hyperapp.h)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    class: "bi bi-envelope",
    viewBox: "0 0 16 16"
  }, (0, _hyperapp.h)("path", {
    d: "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"
  })))))));
};

exports.default = _default;
},{"hyperapp":"../node_modules/hyperapp/src/index.js","hyperstatic/src/htmlToVdom":"../node_modules/hyperstatic/src/htmlToVdom.js","./project.md":"app/pages/Project/project.md","hyperstatic":"../node_modules/hyperstatic/src/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/Project.83d2513a.js.map
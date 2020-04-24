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
})({"epB2":[function(require,module,exports) {
(function () {
  var $siteList = $(".siteList");
  var $last = $(".last");
  var x = window.localStorage.getItem("x");
  var xObject = JSON.parse(x);
  var hashMap = xObject || [{
    logoType: "text",
    logo: "a",
    link: "acfun.cn",
    url: "//acfun.cn"
  }, {
    logoType: "image",
    logo: "b",
    img: "../src/images/bilibili.png",
    link: "bilibili.com",
    url: "//bilibili.com"
  }];

  var render = function render() {
    $siteList.find("li:not(.last)").remove();
    hashMap.forEach(function (node, index) {
      if (node.logoType === "text") {
        var $li = $("<li>\n    <a href=\"".concat(node.url, "\">\n      <div class=\"site\">\n        <div class=\"logo\">").concat(node.logo, "</div>\n        <div class=\"link\">").concat(node.link, "</div>\n        <div class=\"close\">\n          <svg class=\"icon\">\n            <use xlink:href=\"#icon-Close\"></use>\n          </svg>\n        </div>\n      </div>\n    </a>\n  </li>"));
        $last.before($li);
      } else if (node.logoType === "image") {
        var _$li = $("<li>\n    <a href=\"".concat(node.url, "\">\n      <div class=\"site\">\n        <div class=\"logo\">\n        <img src=\"").concat(node.img, "\" alt=\"").concat(node.logo, "\" />\n        </div>\n        <div class=\"link\">").concat(node.link, "</div>\n        <div class=\"close\">\n          <svg class=\"icon\">\n            <use xlink:href=\"#icon-Close\"></use>\n          </svg>\n        </div>\n      </div>\n    </a>\n  </li>"));

        $last.before(_$li);
      }

      $(".close").on("click", function (e) {
        e.stopPropagation();
        hashMap.splice(index, 1);
        var string = JSON.stringify(hashMap);
        window.localStorage.setItem("x", string);
        render();
        return false;
      });
      $(document).on("keypress", function (e) {
        if (node.logo === e.key) {
          window.open(node.url, "_self");
        }
      });
    });
    $last.css("display", "block");
  };

  render();
  $(".addButton").on("click", function () {
    var link = window.prompt("\u8BF7\u8F93\u5165\u7F51\u5740\uFF1A");
    var url;

    if (link) {
      if (link.indexOf("http") === 0 || link.indexOf("//") === 0) {
        url = link;
      } else {
        url = "//" + link;
      }

      link = link.replace("https://", "").replace("http://", "").replace(/\/.*/, "");
      var linkArr = link.split(".");
      hashMap.push({
        logoType: "text",
        logo: linkArr[linkArr.length - 2][0],
        link: link,
        url: url
      });
      var string = JSON.stringify(hashMap);
      window.localStorage.setItem("x", string);
      render();
    }
  });
})();
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.781d2d49.js.map
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
function loadData() {
  return JSON.parse(window.localStorage.getItem("x"));
}

function saveData(dataList) {
  return window.localStorage.setItem("x", JSON.stringify(dataList));
}

function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    if (node.logoType === "text") {
      $last.before($("<li>\n    <a href=\"".concat(node.url, "\">\n      <div class=\"site\">\n        <div class=\"logo\">").concat(node.logo, "</div>\n        <div class=\"link\">").concat(node.link, "</div>\n        <div class=\"close\">\n          <svg class=\"icon\">\n            <use xlink:href=\"#icon-close1\"></use>\n          </svg>\n        </div>\n      </div>\n    </a>\n  </li>")));
    } else if (node.logoType === "image") {
      $last.before($("<li>\n    <a href=\"".concat(node.url, "\">\n      <div class=\"site\">\n        <div class=\"logo\">\n        <img id=\"img").concat(index, "\" src=\"").concat(node.img, "\"/>\n        </div>\n        <div class=\"link\">").concat(node.link, "</div>\n        <div class=\"close\">\n          <svg class=\"icon\">\n            <use xlink:href=\"#icon-close1\"></use>\n          </svg>\n        </div>\n      </div>\n    </a>\n  </li>")));
      $("#img".concat(index)).on("error", function (e) {
        // $(this).parent().html(node.logo);
        hashMap[index].logoType = "text";
        saveData(hashMap);
        render();
      });
    }

    $("li:nth-child(".concat(index + 1)).on("click", ".close", function (e) {
      e.preventDefault();
      hashMap.splice(index, 1);
      saveData(hashMap);
      render();
    });
    $(document).on("keypress", function (e) {
      if (e.key === node.logo) {
        if (!e.target.matches("input")) {
          window.open(node.url, "_self");
        }
      }
    });
  });
  $last.css("visibility", "visible");
}

var $siteList = $(".siteList");
var $last = $(".last");
var hashMap = loadData() || [{
  logoType: "image",
  logo: "i",
  link: "iconfont.cn",
  url: "//iconfont.cn",
  img: "//iconfont.cn/favicon.ico"
}, {
  logoType: "image",
  logo: "b",
  link: "bilibili.com",
  url: "//bilibili.com",
  img: "//bilibili.com/favicon.ico"
}, {
  logoType: "image",
  logo: "c",
  link: "css-tricks.com",
  url: "//css-tricks.com",
  img: "//css-tricks.com/favicon.ico"
}, {
  logoType: "image",
  logo: "d",
  link: "developer.mozilla.org",
  url: "//developer.mozilla.org",
  img: "//developer.mozilla.org/favicon.ico"
}, {
  logoType: "image",
  logo: "g",
  link: "github.com",
  url: "//github.com",
  img: "//github.com/favicon.ico"
}, {
  logoType: "image",
  logo: "j",
  link: "api.jquery.com",
  url: "//api.jquery.com",
  img: "//api.jquery.com/favicon.ico"
}, {
  logoType: "image",
  logo: "y",
  link: "yuque.com",
  url: "//yuque.com",
  img: "//yuque.com/favicon.ico"
}, {
  logoType: "image",
  logo: "z",
  link: "zhihu.com",
  url: "//zhihu.com",
  img: "//zhihu.com/favicon.ico"
}];
render();
$(".addButton").on("click", function () {
  var urlString = window.prompt("\u8BF7\u8F93\u5165\u7F51\u5740\uFF1A");
  var url;

  if (urlString) {
    if (urlString.indexOf("http") === 0 || urlString.indexOf("//") === 0) {
      url = urlString;
    } else {
      url = "//" + urlString;
    }

    var link = urlString.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, "");
    hashMap.push({
      logoType: "image",
      logo: link[0],
      link: link,
      img: url + "/favicon.ico",
      url: url
    });
    saveData(hashMap);
    render();
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.6877d315.js.map
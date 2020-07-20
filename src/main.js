function loadData() {
  return JSON.parse(window.localStorage.getItem("x"));
}
function saveData(dataList) {
  return window.localStorage.setItem("x", JSON.stringify(dataList));
}
function render() {
  $siteList.find(`li:not(.last)`).remove();
  hashMap.forEach((node, index) => {
    if (node.logoType === "text") {
      $last.before(
        $(`<li>
    <a href="${node.url}">
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${node.link}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close1"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`)
      );
    } else if (node.logoType === "image") {
      $last.before(
        $(`<li>
    <a href="${node.url}">
      <div class="site">
        <div class="logo">
        <img id="img${index}" src="${node.img}"/>
        </div>
        <div class="link">${node.link}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close1"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`)
      );
      $(`#img${index}`).on("error", function (e) {
        // $(this).parent().html(node.logo);
        hashMap[index].logoType = "text";
        saveData(hashMap);
        render();
      });
    }
    $(`li:nth-child(${index + 1}`).on("click", ".close", function (e) {
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

const $siteList = $(`.siteList`);
const $last = $(`.last`);
const hashMap = loadData() || [
  {
    logoType: "image",
    logo: "i",
    link: "iconfont.cn",
    url: "//iconfont.cn",
    img: "//iconfont.cn/favicon.ico",
  },
  {
    logoType: "image",
    logo: "b",
    link: "bilibili.com",
    url: "//bilibili.com",
    img: "//bilibili.com/favicon.ico",
  },
  {
    logoType: "image",
    logo: "c",
    link: "css-tricks.com",
    url: "//css-tricks.com",
    img: "//css-tricks.com/favicon.ico",
  },
  {
    logoType: "image",
    logo: "d",
    link: "developer.mozilla.org",
    url: "//developer.mozilla.org",
    img: "//developer.mozilla.org/favicon.ico",
  },
  {
    logoType: "image",
    logo: "g",
    link: "github.com",
    url: "//github.com",
    img: "//github.com/favicon.ico",
  },
  {
    logoType: "image",
    logo: "j",
    link: "api.jquery.com",
    url: "//api.jquery.com",
    img: "//api.jquery.com/favicon.ico",
  },
  {
    logoType: "image",
    logo: "y",
    link: "yuque.com",
    url: "//yuque.com",
    img: "//yuque.com/favicon.ico",
  },
  {
    logoType: "image",
    logo: "z",
    link: "zhihu.com",
    url: "//zhihu.com",
    img: "//zhihu.com/favicon.ico",
  },
];

render();
$(".addButton").on("click", function () {
  let urlString = window.prompt(`请输入网址：`);
  let url;
  if (urlString) {
    if (urlString.indexOf("http") === 0 || urlString.indexOf("//") === 0) {
      url = urlString;
    } else {
      url = "//" + urlString;
    }
    let link = urlString
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(/\/.*/, "");
    hashMap.push({
      logoType: "image",
      logo: link[0],
      link: link,
      img: url + "/favicon.ico",
      url: url,
    });
    saveData(hashMap);
    render();
  }
});

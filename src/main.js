(function () {
  const $siteList = $(`.siteList`);
  const $last = $(`.last`);
  const x = window.localStorage.getItem("x");
  const xObject = JSON.parse(x);
  const hashMap = xObject || [
    { logoType: "text", logo: "a", link: "acfun.cn", url: "//acfun.cn" },
    {
      logoType: "image",
      logo: "b",
      img: "../src/images/bilibili.png",
      link: "bilibili.com",
      url: "//bilibili.com",
    },
  ];
  const render = () => {
    $siteList.find(`li:not(.last)`).remove();
    hashMap.forEach((node, index) => {
      if (node.logoType === "text") {
        const $li = $(`<li>
    <a href="${node.url}">
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${node.link}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-Close"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`);
        $last.before($li);
      } else if (node.logoType === "image") {
        const $li = $(`<li>
    <a href="${node.url}">
      <div class="site">
        <div class="logo">
        <img src="${node.img}" alt="${node.logo}" />
        </div>
        <div class="link">${node.link}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-Close"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`);
        $last.before($li);
      }
      $(".close").on("click", (e) => {
        e.stopPropagation();
        hashMap.splice(index, 1);
        const string = JSON.stringify(hashMap);
        window.localStorage.setItem("x", string);
        render();
        return false;
      });
      $(document).on("keypress", (e) => {
        if (node.logo === e.key) {
          window.open(node.url, "_self");
        }
      });
    });
    $last.css("display", "block");
  };

  render();
  $(".addButton").on("click", () => {
    let link = window.prompt(`请输入网址：`);
    let url;
    if (link) {
      if (link.indexOf("http") === 0 || link.indexOf("//") === 0) {
        url = link;
      } else {
        url = "//" + link;
      }
      link = link
        .replace("https://", "")
        .replace("http://", "")
        .replace(/\/.*/, "");
      let linkArr = link.split(".");

      hashMap.push({
        logoType: "text",
        logo: linkArr[linkArr.length - 2][0],
        link: link,
        url: url,
      });
      const string = JSON.stringify(hashMap);
      window.localStorage.setItem("x", string);
      render();
    }
  });
})();

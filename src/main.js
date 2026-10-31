// Keep site data as text/URL properties: never interpolate user input into HTML.
const STORAGE_KEY = "x";
const DEFAULT_HOSTS = [
  ["i", "iconfont.cn"],
  ["b", "bilibili.com"],
  ["c", "css-tricks.com"],
  ["d", "developer.mozilla.org"],
  ["g", "github.com"],
  ["j", "api.jquery.com"],
  ["y", "yuque.com"],
  ["z", "zhihu.com"],
];

function parseHttpUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  let input = value.trim();
  if (input.startsWith("//")) {
    input = "https:" + input;
  } else if (!/^[a-z][a-z0-9+.-]*:/i.test(input)) {
    input = "https://" + input;
  }
  try {
    const parsed = new URL(input);
    return ["http:", "https:"].includes(parsed.protocol) && parsed.hostname
      ? parsed
      : null;
  } catch (error) {
    return null;
  }
}

function normalizeSite(value) {
  if (!value || typeof value !== "object") return null;
  const url = parseHttpUrl(value.url);
  if (!url) return null;
  const name =
    typeof value.link === "string" && value.link.trim()
      ? value.link.trim()
      : url.hostname.replace(/^www\./, "");
  const favicon = parseHttpUrl(value.img);
  const logo =
    typeof value.logo === "string" && value.logo
      ? value.logo.charAt(0)
      : name.charAt(0);
  return {
    url: url.href,
    link: name,
    logo: logo.toLowerCase(),
    logoType: value.logoType === "text" ? "text" : "image",
    img: favicon ? favicon.href : url.origin + "/favicon.ico",
  };
}

function loadData() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.map(normalizeSite).filter(Boolean) : null;
  } catch (error) {
    console.warn("Could not load saved sites:", error);
    return null;
  }
}

function saveData() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
  } catch (error) {
    console.warn("Could not save sites:", error);
  }
}

const siteList = document.querySelector(".siteList");
const last = document.querySelector(".last");
const sites =
  loadData() ||
  DEFAULT_HOSTS.map(([logo, host]) =>
    normalizeSite({
      logo,
      url: "https://" + host,
      link: host,
      img: "https://" + host + "/favicon.ico",
    })
  );

function makeCloseIcon() {
  const iconNamespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(iconNamespace, "svg");
  const use = document.createElementNS(iconNamespace, "use");
  svg.classList.add("icon");
  use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#icon-close1");
  svg.appendChild(use);
  return svg;
}

function render() {
  siteList.querySelectorAll("li:not(.last)").forEach((li) => li.remove());
  sites.forEach((site, index) => {
    const li = document.createElement("li");
    const anchor = document.createElement("a");
    const wrapper = document.createElement("div");
    const logo = document.createElement("div");
    const link = document.createElement("div");
    const close = document.createElement("div");

    anchor.href = site.url;
    wrapper.className = "site";
    logo.className = "logo";
    link.className = "link";
    link.textContent = site.link;
    close.className = "close";
    close.appendChild(makeCloseIcon());

    if (site.logoType === "image") {
      const img = document.createElement("img");
      img.src = site.img;
      img.alt = "";
      img.addEventListener("error", () => {
        site.logoType = "text";
        logo.textContent = site.logo;
        saveData();
      });
      logo.appendChild(img);
    } else {
      logo.textContent = site.logo;
    }

    close.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      sites.splice(index, 1);
      saveData();
      render();
    });

    wrapper.append(logo, link, close);
    anchor.appendChild(wrapper);
    li.appendChild(anchor);
    last.before(li);
  });
  last.style.visibility = "visible";
}

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.key.length !== 1) {
    return;
  }
  const target = event.target;
  if (
    target &&
    (target.isContentEditable ||
      (target.closest && target.closest("input, textarea, select, [contenteditable]")))
  ) {
    return;
  }
  const shortcut = event.key.toLowerCase();
  const match = sites.find((site) => site.logo === shortcut);
  if (match) window.location.assign(match.url);
});

document.querySelector(".addButton").addEventListener("click", () => {
  const input = window.prompt("请输入网址：");
  if (input === null || !input.trim()) return;
  const url = parseHttpUrl(input);
  if (!url) {
    window.alert("请输入有效的 HTTP(S) 网址");
    return;
  }
  const name = url.hostname.replace(/^www\./, "");
  sites.push(
    normalizeSite({
      logo: name.charAt(0),
      link: name,
      url: url.href,
      img: url.origin + "/favicon.ico",
    })
  );
  saveData();
  render();
});

render();

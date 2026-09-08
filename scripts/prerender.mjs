import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import { parseHTML } from "linkedom";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

const server = await createServer({ server: { middlewareMode: true }, appType: "custom", ssr: { noExternal: ["gsap"] } });
try {
  const { default: App, seoPages, seoImage, buildStructuredData } = await server.ssrLoadModule("/src/App.jsx");
  const template = await readFile("dist/index.html", "utf8");
  for (const [route, meta] of Object.entries(seoPages)) {
    const { document } = parseHTML(template);
    const url = `https://jrstacosstl.com${route}`;
    document.title = meta.title;
    document.querySelector('link[rel="canonical"]').setAttribute("href", url);
    for (const [selector, content] of [
      ['meta[name="description"]', meta.description],
      ['meta[property="og:title"]', meta.title],
      ['meta[property="og:description"]', meta.description],
      ['meta[property="og:url"]', url],
      ['meta[property="og:image"]', seoImage],
      ['meta[property="og:image:alt"]', "Nachos and quesadillas from Juniors Tacos in St. Peters, Missouri"],
      ['meta[name="twitter:title"]', meta.title],
      ['meta[name="twitter:description"]', meta.description],
      ['meta[name="twitter:image"]', seoImage],
    ]) document.querySelector(selector).setAttribute("content", content);
    document.getElementById("site-structured-data").textContent = JSON.stringify(buildStructuredData(route)).replaceAll("<", "\\u003c");
    document.getElementById("root").innerHTML = renderToString(createElement(App, { initialPath: route }));
    // Owner controls are client-only, not public search content.
    document.getElementById("admin")?.remove();
    const noscript = document.createElement("noscript");
    noscript.innerHTML = '<style>.reveal{visibility:visible!important;opacity:1!important;transform:none!important}</style>';
    document.body.append(noscript);
    await writeFile(`dist/${route === "/" ? "index" : route.slice(1)}.html`, document.toString());
    console.log(`Prerendered ${route}`);
  }
} finally {
  await server.close();
}

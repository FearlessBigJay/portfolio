// Tells IndexNow search engines (Bing, which also powers ChatGPT Search and Copilot,
// plus Yandex, Seznam, Naver) that the site's pages changed. Run after a deploy:
//   npm run indexnow
// The key file public/ddda616c8a77714cf58bed7508f6a744.txt proves the site is yours; keep it deployed.
import { pathToFileURL } from "node:url";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { portfolioProfile } = await import(pathToFileURL(path.join(root, "src/data/portfolioProfile.js")).href);
const { routePaths } = await import(pathToFileURL(path.join(root, "src/routes.js")).href);

const KEY = "ddda616c8a77714cf58bed7508f6a744";
const site = portfolioProfile.site.replace(/\/$/, "");
const host = new URL(site).host;
const urlList = [...routePaths.map((p) => site + p), site + "/llms.txt"];

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${site}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`);
if (res.status >= 400) console.log(await res.text());

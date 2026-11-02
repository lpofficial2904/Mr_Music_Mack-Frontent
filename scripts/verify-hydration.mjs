import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { publicRoutes } from "../src/publicRoutes.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const route = process.argv[2];
if (!route) {
  const results = [];
  let next = 0;
  const routes = [...publicRoutes, "/404"];
  await Promise.all(
    Array.from({ length: 3 }, async () => {
      while (next < routes.length) {
        const path = routes[next++];
        const result = await new Promise((resolveResult) => {
          const child = spawn(
            process.execPath,
            [fileURLToPath(import.meta.url), path],
            { env: process.env },
          );
          let output = "";
          let error = "";
          child.stdout.on("data", (chunk) => {
            output += chunk;
          });
          child.stderr.on("data", (chunk) => {
            error += chunk;
          });
          child.on("error", (error) =>
            resolveResult({ route: path, passed: false, error: error.message }),
          );
          child.on("exit", (code) =>
            resolveResult({
              route: path,
              passed: code === 0,
              output: output.trim(),
              error: error.trim(),
            }),
          );
        });
        results.push(result);
        console.log(`${result.passed ? "PASS" : "FAIL"}: hydration ${path}`);
      }
    }),
  );
  await writeFile(
    resolve(root, "docs/hydration-validation.json"),
    JSON.stringify(
      {
        environment:
          "Simulated DOM with browser/media API stubs; not a real-browser performance or visual test",
        results,
      },
      null,
      2,
    ),
  );
  assert.ok(
    results.every((result) => result.passed),
    JSON.stringify(results.filter((result) => !result.passed)),
  );
} else {
  // Supply a temporary jsdom module via JSDOM_MODULE. No runtime dependency is added.
  const { JSDOM } = await import(process.env.JSDOM_MODULE || "jsdom");
  const file =
    route === "/404"
      ? "404.html"
      : `.${route === "/" ? "/" : `${route}/`}index.html`;
  const html = await readFile(resolve(root, "dist", file), "utf8");
  const dom = new JSDOM(html, {
    url: `https://mrmusicmack.com${route}`,
    pretendToBeVisual: true,
    runScripts: "dangerously",
  });
  for (const key of [
    "window",
    "document",
    "navigator",
    "HTMLElement",
    "Element",
    "Node",
    "MutationObserver",
    "getComputedStyle",
    "requestAnimationFrame",
    "cancelAnimationFrame",
    "SVGElement",
    "FormData",
    "FileReader",
    "File",
    "Blob",
  ]) {
    const value = dom.window[key];
    if (value)
      Object.defineProperty(globalThis, key, {
        value: [
          "getComputedStyle",
          "requestAnimationFrame",
          "cancelAnimationFrame",
        ].includes(key)
          ? value.bind(dom.window)
          : value,
        configurable: true,
      });
  }
  window.matchMedia = () => ({
    matches: false,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
  });
  globalThis.matchMedia = window.matchMedia;
  window.scrollTo = () => {};
  window.HTMLElement.prototype.scrollTo = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};
  globalThis.IntersectionObserver = window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  globalThis.ResizeObserver = window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  let accepted = false;
  let submissions = 0;
  globalThis.fetch = async (url) => {
    if (String(url).includes("/api/briefs")) {
      submissions++;
      return {
        ok: accepted,
        json: async () =>
          accepted
            ? { reference: "LOCAL-TEST-REFERENCE" }
            : { error: "Local simulated failure" },
      };
    }
    return { ok: true, json: async () => ({}) };
  };
  const errors = [];
  console.error = (...args) =>
    errors.push(args.map((error) => error?.stack || String(error)).join(" "));
  const timer = setInterval(
    () =>
      document
        .querySelectorAll("link")
        .forEach((link) => link.dispatchEvent(new window.Event("load"))),
    20,
  );
  const asset = html.match(/<script[^>]+src="([^"]+)"/)[1];
  await import(pathToFileURL(resolve(root, "dist", `.${asset}`)).href);
  await new Promise((resolve) => setTimeout(resolve, 1800));
  if (route === "/lets-connect") {
    const sent = [];
    window.__MMM_ANALYTICS_CONSENT__ = true;
    window.gtag = (...args) => sent.push(args);
    const form = document.querySelector("form");
    for (const [name, value] of Object.entries({
      name: "Local Test",
      phone: "+919999999999",
      email: "test@example.invalid",
      notes: "Local verification only",
    }))
      form.elements[name].value = value;
    const submit = () =>
      form.dispatchEvent(
        new window.Event("submit", { bubbles: true, cancelable: true }),
      );
    submit();
    await new Promise((resolve) => setTimeout(resolve, 150));
    assert.equal(
      sent.filter((event) => event[1] === "generate_lead").length,
      0,
      "Failure is not a lead",
    );
    accepted = true;
    submit();
    await new Promise((resolve) => setTimeout(resolve, 150));
    assert.equal(
      sent.filter((event) => event[1] === "generate_lead").length,
      1,
      `Confirmed success records one lead (requests: ${submissions}; connected: ${form.isConnected}; disabled: ${form.querySelector('[type="submit"]').disabled}; console: ${errors.join(";")}; fields: ${[...document.querySelectorAll(".field-error")].map((x) => x.textContent).join(";")}; status: ${document.querySelector(".form-status")?.textContent})`,
    );
  }
  clearInterval(timer);
  assert.deepEqual(errors, [], `Browser errors: ${route}`);
  console.log(
    JSON.stringify({
      route,
      errors,
      confirmedFormFlow: route === "/lets-connect",
    }),
  );
  dom.window.close();
  process.exit(0);
}

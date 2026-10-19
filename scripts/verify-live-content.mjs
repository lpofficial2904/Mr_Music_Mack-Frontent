import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" });
try {
  const { default: OurWork } = await vite.ssrLoadModule("/src/components/OurWork.jsx");
  const { default: MainServiceCards } = await vite.ssrLoadModule("/src/components/MainServiceCards.jsx");
  const { MemoryRouter } = await vite.ssrLoadModule("react-router-dom");
  const media = [
    { type: "audio", url: "/media/test.mp3", title: "Published audio test", poster: "/media/cover.png", enabled: true },
    { type: "audio", url: "/media/hidden.mp3", title: "Hidden audio test", enabled: false },
    { type: "image", url: "/media/photo.png", title: "Published photo test", enabled: true },
  ];
  const collection = (managedMedia) => renderToStaticMarkup(React.createElement(OurWork, {
    collectionPage: true, managedMedia, managedProjects: [], managedReels: [],
  }));
  const published = collection(media);
  assert.match(published, /Published audio test/);
  assert.match(published, /\/media\/test.mp3/);
  assert.match(published, /\/media\/cover.png/);
  assert.match(published, /Published photo test/);
  assert.doesNotMatch(published, /Hidden audio test/);
  assert.doesNotMatch(collection([]), /Published audio test|\/media\/test.mp3/);

  const cardHtml = renderToStaticMarkup(React.createElement(MemoryRouter, {},
    React.createElement(MainServiceCards, { siteContent: { home: { mainServiceCards: [
      { title: "Updated card", path: "/music-editing", image: "/media/card.png" },
    ] } } })));
  assert.match(cardHtml, /Updated card/);
  assert.match(cardHtml, /\/media\/card.png/);
  console.log("PASS: published collection media renders, hidden/removed audio stays hidden, and updated service-card images render.");
} finally {
  await vite.close();
}

import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Writable } from "node:stream";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

export function render(url) {
  // Wait for lazy route modules so every built page contains its full content.
  return new Promise((resolve, reject) => {
    const chunks = [];
    const helmetContext = {};
    const output = new Writable({
      write(chunk, encoding, done) {
        chunks.push(chunk);
        done();
      },
    });
    output.on("finish", () => {
      resolve({
        html: Buffer.concat(chunks).toString("utf8"),
        helmet: helmetContext.helmet,
      });
    });
    output.on("error", reject);
    const stream = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() {
          stream.pipe(output);
        },
        onError(error) {
          reject(error);
        },
      },
    );
  });
}

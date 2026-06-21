import assert from "node:assert/strict";
import { register } from "./index.js";

let createTestHarness;
try {
  ({ createTestHarness } = await import("@open-pets/plugin-sdk/testing"));
} catch {
  ({ createTestHarness } = await import("./node_modules/@open-pets/plugin-sdk/dist/testing.js"));
}

const permissions = ["pet:speak", "pet:reaction", "commands", "status"];
const locales = {
  en: JSON.parse(
    await (await import("node:fs/promises")).readFile(
      new URL("./locales/en.json", import.meta.url),
      "utf8",
    ),
  ),
};

const h = createTestHarness(register, {
  permissions,
  locales,
  config: { greeting: "Hello from tests!", reactOnStart: true },
});

await h.start();

assert.ok(h.calls.commands.has("say-hello"), "registers the Say Hello command");
assert.ok(h.calls.status.some((status) => status.text === "Hello Pet is ready"), "sets ready status");
assert.ok(h.calls.react.includes("waving"), "waves on start");

await h.calls.commands.get("say-hello").handler();

assert.ok(h.calls.speak.includes("Hello from tests!"), "speaks configured greeting");
assert.ok(h.calls.status.some((status) => status.text === "Greeting sent"), "updates status after command");

h.expectNoErrors();
await h.stop();

console.log("Hello Pet Starter tests passed.");

import assert from "node:assert/strict";
import test from "node:test";

import { findTemplate, templates } from "../src/catalog.js";
import { validateProjectName } from "../src/scaffold.js";

test("catalog exposes six unique templates", () => {
  assert.equal(templates.length, 6);
  assert.equal(new Set(templates.map(({ id }) => id)).size, 6);
  assert.equal(findTemplate("rag").repo, "nextjs-python-rag-kit");
});

test("project names are safe", () => {
  assert.equal(validateProjectName("my-agent"), true);
  assert.equal(validateProjectName("My Agent"), false);
  assert.equal(validateProjectName("../escape"), false);
});

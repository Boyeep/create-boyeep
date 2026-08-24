import assert from "node:assert/strict";
import test from "node:test";

import { findTemplate, templates } from "../src/catalog.js";
import { validateProjectName } from "../src/scaffold.js";

test("catalog exposes every unique template", () => {
  assert.equal(templates.length, 11);
  assert.equal(new Set(templates.map(({ id }) => id)).size, 11);
  assert.equal(findTemplate("rag").repo, "nextjs-python-rag-kit");
  assert.equal(findTemplate("realtime").install[0].cwd, ".");
  assert.equal(findTemplate("vision-api").install[0].command, "python");
});

test("project names are safe", () => {
  assert.equal(validateProjectName("my-agent"), true);
  assert.equal(validateProjectName("My Agent"), false);
  assert.equal(validateProjectName("../escape"), false);
});

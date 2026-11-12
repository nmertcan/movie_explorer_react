import test from "node:test";
import assert from "node:assert/strict";
import { FAVORITES_STORAGE_KEY, loadFavorites, saveFavorites, getBrowserStorage } from "../src/utils/favoritesStorage.js";

const favorite = {
  id: 12,
  customName: "Example",
  customDescription: "A favorite movie",
  originalData: { id: 12, title: "Example" }
};

function createStorage(initial) {
  const values = new Map(initial ? [[FAVORITES_STORAGE_KEY, initial]] : []);
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value)
  };
}

test("saves and restores favorites", () => {
  const storage = createStorage();
  assert.equal(saveFavorites(storage, [favorite]), true);
  assert.deepEqual(loadFavorites(storage), [favorite]);
});

test("returns an empty list when storage is empty", () => {
  assert.deepEqual(loadFavorites(createStorage()), []);
});

test("returns an empty list for invalid JSON", () => {
  assert.deepEqual(loadFavorites(createStorage("{invalid")), []);
});

test("rejects non-array stored data", () => {
  assert.deepEqual(loadFavorites(createStorage('{"id":1}')), []);
});

test("ignores malformed favorites while retaining valid records", () => {
  assert.deepEqual(loadFavorites(createStorage(JSON.stringify([{}, favorite, null]))), [favorite]);
});

test("handles unavailable storage", () => {
  assert.deepEqual(loadFavorites(null), []);
  assert.equal(saveFavorites(null, [favorite]), true);
});

test("handles blocked storage reads and writes", () => {
  const blocked = {
    getItem: () => { throw new Error("blocked"); },
    setItem: () => { throw new Error("blocked"); }
  };
  assert.deepEqual(loadFavorites(blocked), []);
  assert.equal(saveFavorites(blocked, [favorite]), false);
});

test("browser storage helper is safe in Node", () => {
  assert.equal(getBrowserStorage(), null);
});

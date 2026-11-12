import test from "node:test";
import assert from "node:assert/strict";
import { addOrUpdateFavorite, removeFavoriteById, validateFavorite } from "../src/utils/favorites.js";

const movie = { id: 1, title: "Example" };
const favorite = { id: 1, customName: "Example", customDescription: "A great movie" };

test("adds a new favorite without changing the original array", () => {
  const initial = [];
  assert.deepEqual(addOrUpdateFavorite(initial, favorite), [favorite]);
  assert.deepEqual(initial, []);
});

test("updates an existing favorite instead of creating a duplicate", () => {
  const updated = { ...favorite, customName: "Updated" };
  assert.deepEqual(addOrUpdateFavorite([favorite], updated), [updated]);
});

test("removes only the selected favorite", () => {
  const second = { id: 2 };
  assert.deepEqual(removeFavoriteById([favorite, second], 1), [second]);
});

test("requires a selected movie", () => {
  assert.equal(validateFavorite({ selectedMovie: null, name: "Test", description: "Long enough text" }).movie, "Önce bir film seçmelisin.");
});

test("requires nonempty name and description", () => {
  const errors = validateFavorite({ selectedMovie: movie, name: " ", description: " " });
  assert.ok(errors.name);
  assert.ok(errors.description);
});

test("requires at least ten description characters", () => {
  const errors = validateFavorite({ selectedMovie: movie, name: "Film", description: "short" });
  assert.ok(errors.description);
});

test("accepts valid favorite form data", () => {
  assert.deepEqual(validateFavorite({ selectedMovie: movie, name: "Film", description: "Interesting movie" }), {});
});

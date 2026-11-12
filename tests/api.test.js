import test from "node:test";
import assert from "node:assert/strict";
import { getMovies, getMovieById, movieCategories } from "../src/services/api.js";

test("getMovies fetches the selected category", async () => {
  const movies = [{ id: 1, title: "Example" }];
  const result = await getMovies("comedy", {
    get: async (path) => {
      assert.equal(path, "/comedy");
      return { data: movies };
    }
  });
  assert.deepEqual(result, movies);
});

test("getMovies rejects unknown categories before requesting", async () => {
  await assert.rejects(getMovies("../other", { get: () => { throw new Error("should not request"); } }), /Unknown movie category/);
});

test("getMovies rejects invalid response data", async () => {
  await assert.rejects(getMovies("drama", { get: async () => ({ data: {} }) }), /Invalid movie response/);
});

test("getMovieById searches categories and matches numeric and string IDs", async () => {
  const requested = [];
  const movie = { id: 17, title: "Found" };
  const client = {
    get: async (path) => {
      requested.push(path);
      return { data: path === "/comedy" ? [movie] : [] };
    }
  };
  assert.deepEqual(await getMovieById("17", client), movie);
  assert.equal(requested.length, movieCategories.length);
});

test("getMovieById returns null for missing films", async () => {
  assert.equal(await getMovieById("404", { get: async () => ({ data: [] }) }), null);
});

test("getMovieById propagates API failures", async () => {
  await assert.rejects(getMovieById("1", {
    get: async () => { throw new Error("network unavailable"); }
  }), /network unavailable/);
});

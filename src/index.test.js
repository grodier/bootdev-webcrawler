import { test, describe } from "node:test";
import assert from "node:assert";

import { normalizeURL, get_URLs_from_HTML } from "./index.js";

describe("normalizeURL", () => {
    let normalized_url = "example.com/path";
    test("already normalized", () => {
        assert.strictEqual(normalizeURL("http://example.com/path"), normalized_url);
    });
    test("different protocol", () => {
        assert.strictEqual(normalizeURL("https://example.com/path"), normalized_url);
    });
    test("slash at end of path", () => {
        assert.strictEqual(normalizeURL("http://example.com/path/"), normalized_url);
    });
    test("different protocol and slash at end of path", () => {
        assert.strictEqual(normalizeURL("https://example.com/path/"), normalized_url);
    });

});

describe("get_URLs_from_HTML", () => {
    test("body no URLs", () => {
        let body = "<body></body>";
        assert.deepEqual(get_URLs_from_HTML(body, ""), []);
    });
    test("body one anchor tag", () => {
        let body = `<body><div><a href="/test">Test</a></div></body>`;
        assert.deepEqual(get_URLs_from_HTML(body, "example.com"), ["example.com/test"]);
    });
    test("body multiple anchor tags", () => {
        let body = `<body><div><a href="/test">Test</a><a href="/test2/">Test 2</a></div></body>`;
        assert.deepEqual(get_URLs_from_HTML(body, "example.com"), ["example.com/test", "example.com/test2/"]);
    });

});

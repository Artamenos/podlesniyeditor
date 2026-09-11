import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const pages = [
  { locale: "ru", file: "out/index.html", other: "/en/", heading: "Видеомонтажёр", about: "7-летним опытом", category: "Подкасты" },
  { locale: "en", file: "out/en/index.html", other: "/", heading: "Video Editor", about: "7 years of experience", category: "Podcasts" },
];
for (const page of pages) {
  test(`${page.locale}: static translation, navigation and shared assets`, () => {
    const html = readFileSync(page.file, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    const text = html.replace(/<[^>]+>/g, " ");
    assert.match(html, new RegExp(`<html[^>]*lang="${page.locale}"`));
    assert.ok(text.includes(page.heading));
    assert.ok(text.includes(page.about));
    assert.ok(text.includes(page.category));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.match(html, /<details[^>]*class="language-picker"/);
    assert.match(html, /<summary[^>]*class="language-button"/);
    const languageLinks = [...html.matchAll(/<a\b[^>]*class="language-option"[^>]*>/g)].map(match => match[0]);
    assert.equal(languageLinks.length, 2);
    assert.ok(languageLinks.some(link => link.includes(`href="${page.other}"`)));
    assert.equal(languageLinks.filter(link => link.includes('aria-current="page"')).length, 1);
    for (const id of ["works", "shorts", "about", "reviews", "contact"]) {
      assert.ok(html.includes(`id="${id}"`), `Missing section: ${id}`);
    }
    assert.equal((html.match(/class="review-card"/g) ?? []).length, 3);
    assert.ok(!html.includes("<iframe"), "Video embeds must load only on play");
    assert.ok(!html.includes("Instagram"));
    for (const match of html.matchAll(/(?:src|href)="(\/(?:media|fonts)\/[^"?]+)(?:[^" ]*)"/g)) {
      assert.ok(existsSync(resolve("out", decodeURIComponent(match[1].slice(1)))), `Missing asset: ${match[1]}`);
    }
    if (page.locale === "en") {
      assert.doesNotMatch(text.replace("Русский", ""), /[А-Яа-яЁё]/, "English page has untranslated visible Russian text");
      assert.ok(text.includes("I turn raw footage into stories"));
      assert.ok(text.includes("Our views and engagement have increased"));
    }
  });
}

test("Timeweb directory index and 404 are included in the export", () => {
  const config = readFileSync("out/.htaccess", "utf8");
  assert.match(config, /^DirectoryIndex index\.html$/m);
  assert.match(config, /^ErrorDocument 404 \/404\.html$/m);
  assert.ok(existsSync("out/404.html"));
});

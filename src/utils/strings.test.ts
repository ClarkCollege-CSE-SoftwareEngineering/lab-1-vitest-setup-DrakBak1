import { describe, it, expect } from "vitest";
import { slugify, truncate, capitalize, countWords } from "./strings";

describe("string utilities", () => {
  describe("slugify", () => {
    it("converts a simple string to a slug", () => {
      expect(slugify("Hello World")).toBe("hello-world");
    });

    it("handles multiple spaces", () => {
      expect(slugify("Hello    World")).toBe("hello-world");
    });

    it("removes special characters", () => {
      expect(slugify("Hello, World!")).toBe("hello-world");
    });

    it("handles leading and trailing spaces", () => {
      expect(slugify("  Hello World  ")).toBe("hello-world");
    });

    it("handles already lowercase strings", () => {
      expect(slugify("hello world")).toBe("hello-world");
    });

    // TODO: Alpha
    it("handles underscores and hyphens consistently", () => {
      expect(slugify("Hello__World--Again")).toBe("hello-world-again");
    });
  });

  describe("truncate", () => {
    it("returns the original string if shorter than maxLength", () => {
      expect(truncate("Hello", 10)).toBe("Hello");
    });

    it("truncates and adds default suffix", () => {
      expect(truncate("Hello World", 8)).toBe("Hello...");
    });

    it("uses custom suffix", () => {
      expect(truncate("Hello World", 9, "…")).toBe("Hello Wo…");
    });

    it("handles exact length strings", () => {
      expect(truncate("Hello", 5)).toBe("Hello");
    });

    // TODO: Beta
    it("handles maxLength shorter than suffix length", () => {
      expect(truncate("Hello World", 2)).toBe("...");
    });

  });

  describe("capitalize", () => {
    it("capitalizes a lowercase word", () => {
      expect(capitalize("hello")).toBe("Hello");
    });

    it("handles already capitalized words", () => {
      expect(capitalize("HELLO")).toBe("Hello");
    });

    it("returns empty string for empty input", () => {
      expect(capitalize("")).toBe("");
    });

    // TODO: Charlie
    it("capitalizes only the first character and lowercases the rest", () => {
      expect(capitalize("hELLo WoRLD")).toBe("Hello world");
    });
  });

  describe("countWords", () => {
    it("counts words in a simple sentence", () => {
      expect(countWords("Hello world")).toBe(2);
    });

    it("handles multiple spaces between words", () => {
      expect(countWords("Hello    world")).toBe(2);
    });

    it("returns zero for empty string", () => {
      expect(countWords("")).toBe(0);
    });

    it("returns zero for whitespace-only string", () => {
      expect(countWords("   ")).toBe(0);
    });

    // Delta
    it("counts words separated by newlines and tabs", () => {
      expect(countWords("Hello\tworld\nagain")).toBe(3);
    });
  });
});
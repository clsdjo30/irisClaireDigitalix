import {
  getLocaleSign,
  getLocaleStone,
  getLocaleElement,
} from "../zodiacTranslate";

describe("Zodiac Translations", () => {
  describe("getLocaleSign", () => {
    it("should return the correct sign name for the given locale", () => {
      expect(getLocaleSign("Leo", "en")).toBe("Leo");
      expect(getLocaleSign("Leo", "fr")).toBe("Lion");
      // Ajoutez d'autres assertions pour d'autres signes et langues si nécessaire
    });
  });

  describe("getLocaleStone", () => {
    it("should return the correct stone for the given sign and locale", () => {
      expect(getLocaleStone("Leo", "en")).toBe("Onyx");
      expect(getLocaleStone("Leo", "fr")).toBe("Onyx");
      // Ajoutez d'autres assertions pour d'autres signes et langues si nécessaire
    });
  });

  describe("getLocaleElement", () => {
    it("should return the correct element for the given element name and locale", () => {
      expect(getLocaleElement("Fire", "en")).toBe("Fire");
      expect(getLocaleElement("Fire", "fr")).toBe("Feu");
      // Ajoutez d'autres assertions pour d'autres éléments et langues si nécessaire
    });
  });
});

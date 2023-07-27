import CARD_DECK from "../../src/utils/cards";

describe("CARD_DECK", () => {
  it("should be an array", () => {
    expect(Array.isArray(CARD_DECK)).toBe(true);
  });

  it("should have correct properties for each card", () => {
    CARD_DECK.forEach((card) => {
      expect(card).toHaveProperty("id");
      expect(card).toHaveProperty("name");
      expect(card).toHaveProperty("pseudo");
      expect(card).toHaveProperty("backImageUrl");
      expect(card).toHaveProperty("frontImageUrl");
      expect(card).toHaveProperty("tendance");
      expect(Array.isArray(card.tendance)).toBe(true);
    });
  });
});

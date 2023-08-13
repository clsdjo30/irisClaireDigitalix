import { getZodiacSign, determineElement } from "../zodiacHelpers"; // Remplacez 'yourComponentFile' par le nom de votre fichier
import { zodiacTranslate } from "../zodiacTranslate";

// Mockez les dépendances externes
jest.mock("zodiac-signs", () => {
  return jest.fn(() => ({
    getSignByDate: ({ day, month }: { day: number; month: number }) => {
      // Vous pouvez ajouter une logique de mock ici si nécessaire
      return { name: "Gemini" }; // exemple
    },
  }));
});

describe("Zodiac Functions", () => {
  it("should return correct zodiac sign, stone and element for a given date", () => {
    const result = getZodiacSign(21, 5); // Date pour Gémeaux par exemple
    expect(result.transUserSign).toBe(zodiacTranslate["en"].signs.Gemini.name);
    expect(result.transUserStone).toBe(
      zodiacTranslate["en"].signs.Gemini.stone
    );
    expect(result.element).toBe(zodiacTranslate["en"].elements.Air);
  });

  // Vous pouvez ajouter d'autres tests pour d'autres dates et signes

  it("should determine the correct element for a given sign", () => {
    const elementForGemini = determineElement("Gemini", "en");
    expect(elementForGemini).toBe(zodiacTranslate["en"].elements.Air);
  });

  // Vous pouvez ajouter d'autres tests pour d'autres éléments et signes
});



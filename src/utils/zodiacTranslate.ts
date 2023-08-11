interface ZodiacSignTranslate {
  [key: string]: {
    name: string;
    stone: string;
  };
}

interface ElementTranslations {
  [key: string]: string;
}

export const zodiacTranslate: Record<
  string,
  { signs: ZodiacSignTranslate; elements: ElementTranslations }
> = {
  en: {
    signs: {
      Aries: { name: "Aries", stone: "Héliotrope" },
      Leo: { name: "Leo", stone: "Onyx" },
      Sagittarius: { name: "Sagittarius", stone: "Topaz" },
      Gemini: { name: "Gemini", stone: "Agate" },
      Libra: { name: "Libra", stone: "Chrysolite" },
      Aquarius: { name: "Aquarius", stone: "Grenat" },
      Cancer: { name: "Cancer", stone: "Emerald" },
      Scorpio: { name: "Scorpio", stone: "Beryl" },
      Pisces: { name: "Pisces", stone: "Améthyste" },
      Taurus: { name: "Taurus", stone: "Sapphire" },
      Virgo: { name: "Virgo", stone: "Cornaline" },
      Capricorn: { name: "Capricorn", stone: "Rubis" },
    },
    elements: {
      Fire: "Fire",
      Air: "Air",
      Water: "Water",
      Earth: "Earth",
    },
  },
  fr: {
    signs: {
      Aries: { name: "Bellier", stone: "Héliotrope" },
      Leo: { name: "Lion", stone: "Onyx" },
      Sagittarius: { name: "Sagittaire", stone: "Topaze" },
      Gemini: { name: "Gemeaux", stone: "Agate" },
      Libra: { name: "Balance", stone: "Chrysolite" },
      Aquarius: { name: "Aquarius", stone: "Grenat" },
      Cancer: { name: "Cancer", stone: "Emeraude" },
      Scorpio: { name: "Scorpion", stone: "Beryl" },
      Pisces: { name: "Poisson", stone: "Améthyste" },
      Taurus: { name: "Taurus", stone: "Saphir" },
      Virgo: { name: "Vierge", stone: "Cornaline" },
      Capricorn: { name: "Capricorne", stone: "Rubis" },
    },
    elements: {
      Fire: "Feu",
      Air: "Air",
      Water: "Eau",
      Earth: "Terre",
    },
  },
  // ... (autres langues)
};


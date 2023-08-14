interface ZodiacSignTranslate {
  [key: string]: {
    name: string;
    stone: string;
  };
}

interface ElementTranslations {
  [key: string]: string;
}

interface AstroIcon {
  [key: string]: string;
}

export const zodiacTranslate: Record<
  string,
  {
    signs: ZodiacSignTranslate;
    elements: ElementTranslations;
    astroIcon: AstroIcon;
  }
> = {
  en: {
    signs: {
      Leo: { name: "Leo", stone: "Onyx" },
      Virgo: { name: "Virgo", stone: "Cornaline" },
      Pisces: { name: "Pisces", stone: "Amethyst" },
      Cancer: { name: "Cancer", stone: "Emerald" },
      Capricorn: { name: "Capricorn", stone: "Ruby" },
      Taurus: { name: "Taurus", stone: "Sapphire" },
      Sagittarius: { name: "Sagittarius", stone: "Topaz" },
      Gemini: { name: "Gemini", stone: "Agate" },
      Scorpio: { name: "Scorpio", stone: "Beryl" },
      Libra: { name: "Libra", stone: "Chrysolite" },
      Aquarius: { name: "Aquarius", stone: "Camelian" },
      Aries: { name: "Aries", stone: "Heliotrope" },
    },
    elements: {
      Fire: "Fire",
      Air: "Air",
      Water: "Water",
      Earth: "Earth",
    },
    astroIcon: {
      Leo: require("../../assets/icons/astroSign/leo.png"),
      Virgo: require("../../assets/icons/astroSign/virgo.png"),
      Pisces: require("../../assets/icons/astroSign/pisces.png"),
      Aquarius: require("../../assets/icons/astroSign/aquarius.png"),
      Aries: require("../../assets/icons/astroSign/aries.png"),
      Cancer: require("../../assets/icons/astroSign/cancer.png"),
      Capricorn: require("../../assets/icons/astroSign/capricorn.png"),
      Gemini: require("../../assets/icons/astroSign/gemini.png"),
      Libra: require("../../assets/icons/astroSign/libra.png"),
      Sagittarius: require("../../assets/icons/astroSign/sagittarius.png"),
      Scorpio: require("../../assets/icons/astroSign/scorpio.png"),
      Taurus: require("../../assets/icons/astroSign/taurus.png"),
    },
  },
  fr: {
    signs: {
      Leo: { name: "Lion", stone: "Onyx" },
      Virgo: { name: "Vierge", stone: "Cornaline" },
      Pisces: { name: "Poisson", stone: "Amethyste" },
      Cancer: { name: "Cancer", stone: "Emeraude" },
      Capricorn: { name: "Capricorne", stone: "Rubis" },
      Taurus: { name: "Taureau", stone: "Saphir" },
      Sagittarius: { name: "Sagittaire", stone: "Topaze" },
      Gemini: { name: "Gemeaux", stone: "Agate" },
      Scorpio: { name: "Scorpion", stone: "Beryl" },
      Libra: { name: "Balance", stone: "Chrysolite" },
      Aquarius: { name: "Verseau", stone: "Camelia" },
      Aries: { name: "Bellier", stone: "Heliotrope" },
    },
    elements: {
      Fire: "Feu",
      Air: "Air",
      Water: "Eau",
      Earth: "Terre",
    },
    astroIcon: {
      Verseau: require("../../assets/icons/astroSign/aquarius.png"),
      Bellier: require("../../assets/icons/astroSign/aries.png"),
      Cancer: require("../../assets/icons/astroSign/cancer.png"),
      Capricorne: require("../../assets/icons/astroSign/capricorn.png"),
      Gemeaux: require("../../assets/icons/astroSign/gemini.png"),
      Lion: require("../../assets/icons/astroSign/leo.png"),
      Balance: require("../../assets/icons/astroSign/libra.png"),
      Poisson: require("../../assets/icons/astroSign/pisces.png"),
      Sagittaire: require("../../assets/icons/astroSign/sagittarius.png"),
      Scorpion: require("../../assets/icons/astroSign/scorpio.png"),
      Taureau: require("../../assets/icons/astroSign/taurus.png"),
      Vierge: require("../../assets/icons/astroSign/virgo.png"),
    },
  },
  // ... (autres langues)
};

export const getLocaleSign = (sign: string, locale: string) => {
  return zodiacTranslate[locale].signs[sign].name;
}

export const getLocaleStone = (sign: string, locale: string) => {
  return zodiacTranslate[locale].signs[sign].stone;
}

export const getLocaleElement = (element: string, locale: string) => {
  return zodiacTranslate[locale].elements[element];
}

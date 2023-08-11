import { zodiacTranslate } from "./zodiacTranslate";
import * as Localization from "expo-localization";

export function getZodiacSign(
  day: number,
  month: number,
) {
  const zodiac = require("zodiac-signs")("en");
  const sign = zodiac.getSignByDate({day, month});
  const userSign = sign.name;

  // Récupérez la locale actuelle (par exemple, "fr-FR" ou "en-US")
    const locale = Localization.locale.split("-")[0];

//   if (!zodiacTranslate[locale] || !zodiacTranslate[locale].signs[sign]) {
//     console.error(`Translation missing for ${sign} in locale ${locale}`);
//     return null;
//   }

    const localizedSign = zodiacTranslate[locale];
    console.log("LocalizedSign: ", localizedSign);
    const element = determineElement(sign, locale);
    console.log("Element: ", element);

  return { ...userSign, ...localizedSign, element };
}

function determineElement(signName: string, locale: string) {
  const airSign = ["Gemini", "Libra", "Aquarius"];
  const waterSign = ["Cancer", "Scorpio", "Pisces"];
  const fireSign = ["Aries", "Leo", "Sagittarius"];
  const earthSign = ["Taurus", "Virgo", "Capricorn"];

  if (!zodiacTranslate[locale] || !zodiacTranslate[locale].elements) {
    console.error(`Element translations missing for locale ${locale}`);
    return "";
  }

  if (airSign.includes(signName)) return zodiacTranslate[locale].elements.Air;
  if (waterSign.includes(signName))
    return zodiacTranslate[locale].elements.Water;
  if (fireSign.includes(signName)) return zodiacTranslate[locale].elements.Fire;
  if (earthSign.includes(signName))
    return zodiacTranslate[locale].elements.Earth;

  return "";
}

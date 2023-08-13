import { zodiacTranslate } from "./zodiacTranslate";

export function getZodiacSign(day: number, month: number) {
  const zodiac = require("zodiac-signs")("en");
  const sign = zodiac.getSignByDate({ day, month });
  const userSign = sign.name;

    const localizedSign = zodiacTranslate['en'].signs[userSign];
    //recup du sign traduit
    const transUserSign = localizedSign.name;
    // recup de la pierre traduite
    const transUserStone = localizedSign.stone;
    // recup de l'element traduit
  const element = determineElement(userSign, 'en');

  return { transUserSign, transUserStone, element };
}

export function determineElement(signName: string, locale: string) {
  const airSign = ["Gemini", "Libra", "Aquarius"];
  const waterSign = ["Cancer", "Scorpio", "Pisces"];
  const fireSign = ["Aries", "Leo", "Sagittarius"];
  const earthSign = ["Taurus", "Virgo", "Capricorn"];

  if (airSign.includes(signName)) {
    return zodiacTranslate[locale].elements.Air;
  } else if (waterSign.includes(signName)) {
    return zodiacTranslate[locale].elements.Water;
  } else if (fireSign.includes(signName)) {
    return zodiacTranslate[locale].elements.Fire;
  } else if (earthSign.includes(signName)) {
    return zodiacTranslate[locale].elements.Earth;
  }
}

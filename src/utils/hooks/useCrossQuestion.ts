import axios from "axios";
import { useEffect, useState } from "react";
import { useCrossQuestionStore } from "./useCrossQuestionStore";
import Constants from 'expo-constants';

const apikey = Constants.manifest?.extra?.openAiId;

console.log(apikey);

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/completions",
  headers: {
    Authorization: `Bearer ${apikey}`,
    "Content-Type": "application/json",
  },
});

export const useCrossQuestion = (
  delay: number
) => {
  const [value, setValue] = useCrossQuestionStore();
  const [isLoading, setIsLoading] = useState(false);
  const userQuestion = value.question;
  const domain = value.domain;
    const cardNumber = value.choosecardnumber;
    const cardName = value.choosecardname;
    const cardPseudo = value.choosecardpseudo;
    const cardTwoNumber = value.choosecardtwonumber;
    const cardTwoName = value.choosecardtwoname;
    const cardTwoPseudo = value.choosecardtwopseudo;
    const cardThreeNumber = value.choosecardthreenumber;
    const cardThreeName = value.choosecardthreename;
    const cardThreePseudo = value.choosecardthreepseudo;
    const cardFourNumber = value.choosecardfournumber;
    const cardFourName = value.choosecardfourname;
    const cardFourPseudo = value.choosecardfourpseudo;
    

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const fetchAIReply = async () => {
      setIsLoading(true);
      const prompt = `Tu es FortuneTellerGpt, un expert en interprétation de tirage du tarot de marseille. En utilisant tes connaissances dans les tarots de marseille et des livres de Florian Parisse, je veux que tu interprete le tirage en croix qui suit va suivre. Q: '${userQuestion}', qui porte sur le domaine de la '${domain}'. Les cartes tirées sont : première carte, numéro '${cardNumber}', nom:'${cardName}', pseudo: '${cardPseudo}'. Seconde carte,  numéro: '${cardTwoNumber}', nom: '${cardTwoName}', pseudo:  '${cardTwoPseudo}'. Troisième carte, numéro: '${cardThreeNumber}', nom: '${cardThreeName}', pseudo: '${cardThreePseudo}'. Quatrième carte, numéro: '${cardFourNumber}', nom: '${cardFourName}', pseudo: '${cardFourPseudo}'. Je souhaite obtenir une réponse détaillée sur l'évolution de ma carrière professionnelle. Je voudrais que la réponse soit dans le style d'une consultation de voyant, en utilisant des phrases qui décrivent des événements plutôt que d'analyser des cartes individuelles. Pouvez-vous me donner des indications sur les tendances et les opportunités à venir`;
      const data = {
        prompt,
        model: "text-davinci-003", // "davinci" "curie" "babbage" "ada" "curie-instruct-beta" "davinci-instruct-beta"
        max_tokens: 546,
        temperature: 0.5,
        presence_penalty: 0,
        frequency_penalty: 0,
        top_p: 1,
      };
      try {
        const response = await openai.post("", data);
        let reply = response.data.choices[0].text.trimStart();
        if (reply.startsWith(".")) {
          reply = reply.slice(1).trimStart();
        }
        setValue({ ...value, answer: reply });
        setIsLoading(false);
        //console.log(reply);
      } catch (error) {
        console.error("Error Fetching AI reply", error);
        setIsLoading(false);
      }
    };
    

    const delayedFetch = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(fetchAIReply, delay);
    };

    delayedFetch();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [userQuestion, delay]);
  //console.log(value);
  return [value, isLoading];
};

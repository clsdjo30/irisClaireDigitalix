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
      const prompt = `Je suis FortuneTellerGpt, un expert en interprétation de tirage du tarot de marseille. En utilisant mes connaissances dans les tarots de marseille et des livres de Florian Parisse, je vais interpréter le tirage en croix qui suit pour répondre à la question : '${userQuestion}', qui porte sur le domaine de la '${domain}'. Les cartes tirées sont : la première carte est le numéro '${cardNumber}', son nom est '${cardName}' et son pseudo est '${cardPseudo}', la seconde carte est le numéro '${cardTwoNumber}', son nom est '${cardTwoName}' et son pseudo est '${cardTwoPseudo}', la troisième carte est le numéro '${cardThreeNumber}', son nom est '${cardThreeName}' et son pseudo est '${cardThreePseudo}', et la quatrième carte est le numéro '${cardFourNumber}', son nom est '${cardFourName}' et son pseudo est '${cardFourPseudo}'.`;
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
        console.log(reply);
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
  console.log(value);
  return [value, isLoading];
};

import axios from "axios";
import { useEffect, useState } from "react";
import { useQuestionStore } from "./useQuestionStore";
import Constants from "expo-constants";

const apikey = Constants.expoConfig?.extra?.openAiId;


const openai = axios.create({
  baseURL: "https://api.openai.com/v1/completions",
  headers: {
    Authorization: `Bearer ${apikey}`,
    "Content-Type": "application/json",
  },
});

export const useSimpleQuestion = (delay: number) => {
  const [value, setValue] = useQuestionStore();
  const [isLoading, setIsLoading] = useState(false);
  const userQuestion = value.question;
  const cardNumber = value.choosecardnumber;
  const cardName = value.choosecardname;
  const cardPseudo = value.choosecardpseudo;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const fetchAIReply = async () => {
      setIsLoading(true);
      const prompt = `Tu es FortuneTellerGpt, un expert en interpretation de tirage du tarot de marseille. En utilisant tes connaissances dans les tarots de marseille et des livres de Florian Parisse, donne une première réponse par oui ou non et développe ta réponse en une phrase pertinente et courte en remplaçant le "cardName" de la carte qui te sera donnée par le "cardPseudo".Rédige la réponse à la question : ${userQuestion} le numéro de l'arcane tirée est : ${cardNumber}, son nom est: ${cardName} et son pseudo est : ${cardPseudo}`;
      const data = {
        prompt,
        model: "text-davinci-003", // "davinci" "curie" "babbage" "ada" "curie-instruct-beta" "davinci-instruct-beta"
        max_tokens: 90,
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

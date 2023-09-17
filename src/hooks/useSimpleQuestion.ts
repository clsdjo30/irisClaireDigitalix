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
  const cardPseudo = value.choosecardpseudo;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const fetchAIReply = async () => {
      setIsLoading(true);
      const prompt = `tu vas agir en tant que voyante experte en tarologie. pour ce tirage a 1 carte, tu vas devoir fournir une réponse à la question:"${userQuestion}".J'ai tiré la carte ${cardNumber} du tarot de marseille et son pseudo est ${cardPseudo} . tu vas devoir repondre par oui ou non, et tout en ayant un ton de confiance et d'expert, développé en une phrase courte, sans jamais dire le nom de la carte tirée.`;
      const data = {
        prompt,
        model: "text-davinci-003", 
        max_tokens: 150,
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

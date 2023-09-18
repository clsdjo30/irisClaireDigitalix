import axios from "axios";
import { useEffect, useState } from "react";
import { useCrossQuestionStore } from "./useCrossQuestionStore";
import Constants from "expo-constants";
import { useUserInformation } from "./useUserInformations";

const apikey = Constants.expoConfig?.extra?.openAiId;

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/completions",
  headers: {
    Authorization: `Bearer ${apikey}`,
    "Content-Type": "application/json",
  },
});

export const useCrossQuestion = (delay: number) => {
  const [value, setValue] = useCrossQuestionStore();
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserInformation();
  const userName = user.user?.firstname;
  const userQuestion = value.question;
  const domain = value.domain;
  const cardName = value.choosecardname;
  const cardTwoName = value.choosecardtwoname;
  const cardThreeName = value.choosecardthreename;
  const cardFourName = value.choosecardfourname;
  const cardFiveName = value.choosecardfivename;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const fetchAIReply = async () => {
      setIsLoading(true);
      const prompt = `
      Tu vas agir en tantque voyante experte en tarologie, spécialisée dans le Tarot de Marseille.Je suis ${userName}, Pour ce tirage en croix approfondi, réponds à ma question : "${userQuestion}". Les cartes tirées sont : "Pour":"${cardName}", "Contre":"${cardTwoName}", "Vibration":"${cardThreeName}", "Direction":"${cardFourName}", "Synthèse":"${cardFiveName}" du tarot de Marseille. 
- Pour la carte "Pour" : Détaillez les facteurs positifs, les atouts et les alliés concernant la question. Comment ces éléments peuvent-ils influencer la situation en faveur du consultant ?  
- Pour la carte "Contre" : Analysez les aspects négatifs, les obstacles et les adversaires. Quels sont les défis potentiels que le consultant pourrait rencontrer ?
- Pour la carte "Vibration": Éclairez l'état d'esprit actuel du consultant, son potentiel et la tendance actuelle. Comment ces vibrations peuvent-elles influencer l'issue de la situation ?
- Pour la carte "Direction" : Indiquez l'orientation probable de la situation. Quels sont les chemins possibles que le consultant pourrait emprunter ?
- Pour la carte "Synthèse" : Fournissez une réponse globale à la question, en tenant compte des cartes précédentes. Cette carte confirme-t-elle ou nuance-t-elle le tirage ?
Je souhaite une réponse qui donne l'impression d'une conversation intime et directe avec le consultant. L'analyse doit être détaillée, riche en nuances et en interprétations. Prenez le temps de considérer chaque carte dans son contexte et en relation avec les autres. Utilisez un ton confiant, expert et empathique, sans jamais mentionner le nom des cartes tirées.`;
      const data = {
        prompt,
        model: "text-davinci-003", // "davinci" "curie" "babbage" "ada" "curie-instruct-beta" "davinci-instruct-beta"
        max_tokens: 3000,
        temperature: 0.3,
        presence_penalty: 0.5,
        frequency_penalty: 1,
        top_p: 1,
        stop: ["Bonne chance !", "n'hésite pas a me poser une autre question"],
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

import axios from "axios";
import { useEffect, useState } from "react";
import { useQuestionStore } from "./useQuestionStore";
import { useUserInformation } from "./useUserInformations";
import Constants from "expo-constants";

const apikey = Constants.expoConfig?.extra?.openAiId;

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/chat/completions",
  headers: {
    Authorization: `Bearer ${apikey}`,
    "Content-Type": "application/json",
  },
});

export const useSimpleQuestion = (delay: number) => {
  const [value, setValue] = useQuestionStore();
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserInformation();
  const userName = user.user?.firstname;
  const userQuestion = value.question;
  const domain = value.domain;
  const cardNumber = value.choosecardnumber;
  const cardName = value.choosecardname;
  const cardPseudo = value.choosecardpseudo;
const systemContent = `
Je suis un expert en interprétation de l'oracle "Iris Claire", qui est basé sur les arcanes du Tarot de Marseille. Voici la correspondance entre les cartes des deux oracles:
- Iris Alpha = Le Bateleur
- Iris Mathéra = La Papesse
- Iris Khali = L'Impératrice
- Iris Khal = L'Empereur
- Iris Patéra = Le Pape
- Iris Amour = L'Amoureux
- Iris Chemin = Le Chariot
- Iris Krisi = La Justice
- Iris Reflexion = L'Hermite
- Iris Cycle = La Roue de Fortune
- Iris Dynami = La Force
- Iris Attente = Le Pendu
- Iris Trepas = L'Arcane sans Nom
- Iris Equité = La Tempérance
- Iris Luxure = Le Diable
- Iris Tromos = La Maison Dieu
- Iris Aster = L'Étoile
- Iris Couchant = La Lune
- Iris Claire = Le Soleil
- Iris Messager = Le Jugement
- Iris Cosmos = Le Monde
- Iris Nomade = Le Mat

Veuillez me fournir le nom de la carte que vous avez tirée dans l'oracle "Iris Claire" et toute question ou contexte spécifique que vous avez en tête. Je répondrai par "oui" ou "non", suivi d'une courte phrase d'explication sans dire le nom de la carte du tarot de Marseille.
`;
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const fetchAIReply = async () => {
      setIsLoading(true);
      const messages = [
        {
          role: "system",
          content: systemContent,
        },
        {
          role: "user",
          content: `Q:"${userQuestion}". J'ai tiré la carte: "${cardName} connue sous le nom de "${cardPseudo}" "`,
        },
      ];
      const data = {
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 50,
        temperature: 0.1,
        presence_penalty: 0.5,
        frequency_penalty: 0,
        top_p: 1,
        stop: ["\n"],
      };
      try {
        const response = await openai.post("", data);
        const reply = response.data.choices[0].message.content.trimStart();
        setValue({ ...value, answer: reply });
        setIsLoading(false);
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

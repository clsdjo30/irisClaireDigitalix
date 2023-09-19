import axios from "axios";
import { useEffect, useState } from "react";
import { useCrossQuestionStore } from "./useCrossQuestionStore";
import Constants from "expo-constants";
import { useUserInformation } from "./useUserInformations";

const apikey = Constants.expoConfig?.extra?.openAiId;

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/chat/completions",
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
  const cardPseudo = value.choosecardpseudo;
  const cardTwoName = value.choosecardtwoname;
  const cardTwoPseudo = value.choosecardtwopseudo;
  const cardThreeName = value.choosecardthreename;
  const cardThreePseudo = value.choosecardthreepseudo;
  const cardFourName = value.choosecardfourname;
  const cardFourPseudo = value.choosecardfourpseudo;
  const cardFiveName = value.choosecardfivename;
  const cardFivePseudo = value.choosecardfivepseudo;
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

Je vais utiliser cette correspondance pour interpréter votre tirage en me basant sur la signification des arcanes du Tarot de Marseille. Cependant, je m'assurerai de ne pas mentionner explicitement les noms des cartes du Tarot de Marseille dans ma réponse. Je souhaite fournir une réponse qui donne l'impression d'une conversation intime et directe avec le consultant. L'analyse sera détaillée, riche en nuances et en interprétations, tout en respectant votre demande de ne pas mentionner les noms des cartes du Tarot de Marseille.
Veuillez me fournir le nom des cartes que vous avez tirée dans l'oracle "Iris Claire" et toute question ou contexte spécifique que vous avez en tête.
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
          content: `Consultant: #${userName}, Domaine: "${domain}", Q:"${userQuestion}". Mon tirage: "${cardPseudo}", "${cardTwoPseudo}", "${cardThreePseudo}", "${cardFourPseudo}" et  "${cardFivePseudo}". "`,
        },
      ];
      const data = {
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 3000,
        temperature: 0.7,
        presence_penalty: 0.5,
        frequency_penalty: 0,
        top_p: 1,
      };
      try {
        const response = await openai.post("", data);
        let reply = response.data.choices[0].message.content.trimStart();
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

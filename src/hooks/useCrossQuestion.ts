import axios from "axios";
import { useEffect, useState } from "react";
import { useCrossQuestionStore } from "../store/useCrossQuestionStore";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const user = useUserInformation();
  const userName = user.user?.firstname;
  const userQuestion = value.question;
  const domain = value.domain;
  const cardOne = value.choosecardpseudo;
  const cardTwo = value.choosecardtwopseudo;
  const cardThree = value.choosecardthreepseudo;
  const cardFour = value.choosecardfourpseudo;
  const cardFive = value.choosecardfivepseudo;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    // Recupereles informations dans l'encylopedie Iris Claire
    const fetchCardDetails = async () => {
      try {
        const carteResponse = await fetch(
          `https://iris-api.candcom.com/api/cartes?populate=*`
        );
        const carteData = await carteResponse.json();
        const cartes = carteData.data;

        const firstCard = cartes.find(
          (carte: any) => carte.attributes?.name === cardOne
        );
        if (!firstCard) {
          throw new Error(`Card with name ${cardOne} not found`);
        }
        const firstCardSignification =
          firstCard.attributes?.significations.data[0].attributes?.description;
        const firstCardDescription = firstCard.attributes?.description;
        const firstCardQualité = firstCard.attributes?.qualites;
        const firstCardDéfaut = firstCard.attributes?.defauts;
        const firstCardDelai = firstCard.attributes?.delai;

        const secondCard = cartes.find(
          (carte: any) => carte.attributes?.name === cardTwo
        );
        if (!secondCard) {
          throw new Error(`Card with name ${cardTwo} not found`);
        }
        const secondCardSignification =
          secondCard.attributes?.significations.data[1].attributes?.description;
        const secondCardDescription = secondCard.attributes?.description;
        const secondCardQualite = secondCard.attributes?.qualites;
        const secondCardDefaut = secondCard.attributes?.defauts;
        const secondCardDelai = secondCard.attributes?.delai;

        const thirdCard = cartes.find(
          (carte: any) => carte.attributes?.name === cardThree
        );
        if (!thirdCard) {
          throw new Error(`Card with name ${cardTwo} not found`);
        }
        const thirdCardSignification =
          thirdCard.attributes?.significations.data[2].attributes?.description;
        const thirdCardDescription = thirdCard.attributes?.description;
        const thirdCardQualite = thirdCard.attributes?.qualites;
        const thirdCardDefaut = thirdCard.attributes?.defauts;
        const thirdCardDelai = thirdCard.attributes?.delai;

        const fourthCard = cartes.find(
          (carte: any) => carte.attributes?.name === cardFour
        );
        if (!fourthCard) {
          throw new Error(`Card with name ${cardTwo} not found`);
        }
        const fourthCardSignification =
          fourthCard.attributes?.significations.data[3].attributes?.description;
        const fourthCardDescription = fourthCard.attributes?.description;
        const fourthCardQualite = fourthCard.attributes?.qualites;
        const fourthCardDefaut = fourthCard.attributes?.defauts;
        const fourthCardDelai = fourthCard.attributes?.delai;

        const fithCard = cartes.find(
          (carte: any) => carte.attributes?.name === cardFive
        );
        if (!fithCard) {
          throw new Error(`Card with name ${cardTwo} not found`);
        }
        const fithCardSignification =
          fithCard.attributes?.significations.data[4].attributes?.description;
        const fithCardDescription = fithCard.attributes?.description;
        const fithCardQualite = fithCard.attributes?.qualites;
        const fithCardDefaut = fithCard.attributes?.defauts;
        const fithCardDelai = fithCard.attributes?.delai;

        return {
          firstCardSignification: firstCardSignification,
          firstCardDescription: firstCardDescription,
          firstCardQualité: firstCardQualité,
          firstCardDéfaut: firstCardDéfaut,
          firstCardDelai: firstCardDelai,
          secondCardSignification: secondCardSignification,
          secondCardDescription: secondCardDescription,
          secondCardQualite: secondCardQualite,
          secondCardDefaut: secondCardDefaut,
          secondCardDelai: secondCardDelai,
          thirdCardSignification: thirdCardSignification,
          thirdCardDescription: thirdCardDescription,
          thirdCardQualite: thirdCardQualite,
          thirdCardDefaut: thirdCardDefaut,
          thirdCardDelai: thirdCardDelai,
          fourthCardSignification: fourthCardSignification,
          fourthCardDescription: fourthCardDescription,
          fourthCardQualite: fourthCardQualite,
          fourthCardDefaut: fourthCardDefaut,
          fourthCardDelai: fourthCardDelai,
          fithCardSignification: fithCardSignification,
          fithCardDescription: fithCardDescription,
          fithCardQualite: fithCardQualite,
          fithCardDefaut: fithCardDefaut,
          fithCardDelai: fithCardDelai,
        };
      } catch (error) {
        console.error("Error Fetching Card Details", error);
        setIsLoading(false);
      }
    };

    const fetchAIReply = async () => {
      setIsLoading(true);
      const cardDetails = await fetchCardDetails();
      if (!cardDetails) return;

      const loveSystemContent = `
   Bienvenue ${userName} dans l'exploration divinatoire à travers l'oracle "Iris Claire", une tradition mystique enracinée dans les arcanes du Tarot de Marseille.
   Cette lecture a pour but de vous offrir des éclaircissements et des orientations sur votre situation actuelle dans le domaine de: "${domain}".
   Si vous me posez une question fermée, je répondrais obligatoirement et formellement par "oui" ou "non", accompagné d'une interpretation fluide de l'enssemble de votre tirage. 
   Si la question est ouverte, je vous emmènerai dans un voyage à travers les énergies et les symboles révélés par les cartes, tissant une histoire qui éclaire votre situation ou vos questions.
   Vous me consultez pour que je réponde à la question suivante : "${userQuestion}". 
    Vous avez tirées les cartes: "${cardOne}", "${cardTwo}", "${cardThree}", "${cardFour}", et "${cardFive}". 
  
   Les informations encodées dans les cartes, ${JSON.stringify(
    cardDetails
    )}, vont maintenant prendre vie à travers mes mots. Chaque carte a une histoire à raconter, des messages à partager, que je vais interpréter pour vous en une narration fluide, révélant les fils cachés de votre situation dans le domaine de "${domain}".
  
    Je suis là pour vous aider à naviguer à travers les incertitudes, en révélant les récits cachés dans les cartes et en vous guidant vers une compréhension plus profonde.
  `;

      const messages = [
        {
          role: "system",
          content: loveSystemContent,
        },
        {
          role: "user",
          content: `Je suis impatient de lire votre ressenti sur mon tirage. Qu'en pensez-vous ?`,
        },
        {
          role: "assistant",
          content: `Assurez-vous de fournir une divination fluide,  détaillée et réfléchie, tout en répondant obligatoirement à votre question,`,
        },
      ];
      const data = {
        model: "gpt-4",
        messages: messages,
        max_tokens: 4000,
        temperature: 1.09,
        presence_penalty: 0,
        frequency_penalty: 0,
        top_p: 1,
      };
      console.log("USE CROSS QUESTION DATA SEND:", data);
      try {
        const response = await openai.post("", data);
        const tokensUsed = response.data.usage.total_tokens;
        console.log("USE CROSS QUESTION Total tokens used:", tokensUsed);
        let reply = response.data.choices[0].message.content.trimStart();
        setValue({ ...value, answer: reply, isanswered: true });
        setIsDone(false);
      } catch (error) {
        console.error(
          "Error Fetching AI reply",
          error as any,
          (error as any).response?.data?.error
        );
        setIsLoading(false);
      } finally {
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
  return [value, isLoading, isDone];
};

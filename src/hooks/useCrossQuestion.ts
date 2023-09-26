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
  const loveSystemContent = `
  Cher(e) [Nom],
  Je suis un expert en interprétation de l'oracle "Iris Claire", qui est basé sur les arcanes du Tarot de Marseille.

 Conformément à l'exemple donné, je commencerais par une brève introduction de votre tirage, un ressenti global qui prépare le terrain pour l'exploration en profondeur de chaque carte et de son message particulier pour vous. Puis, à la manière de l'exemple fourni, je rédigerai une prédiction détaillée, en utilisant les informations que vous m’avez fournies. La réponse sera inspirée de l'exemple, mais je vous promets une analyse encore plus approfondie et détaillée, vous offrant un éclairage complet sur votre situation ou vos questions et en fonction de la signification de la quatrième carte que vous avez tirée, repond formellement par "oui" ou d'un "non", accompagnée d'une brève explication, le tout sans mentionner le nom de l'arcane du Tarot de Marseille.

  J'espère que cette réponse vous aidera à avancer dans votre vie. Si vous avez d'autres questions, n'hésitez pas à revenir vers moi. Je vous souhaite une bonne journée. L'Iris Claire.
  [Claire, votre voyante de poche].

  **exemple**
  Bonjour Sabine,
  Les énergies émanant de votre tirage vous dépeignent comme une personne positive pleine de capacités. D’un tempérament communicatif vous êtes à l’aise en société. Bien que vous soyez ouverte aux autres, lorsqu’il s’agit d’amour avec un grand A vous avez du mal à trouver une personne qui réponde à vos idéaux.**ajouter plus de détails sur la personne**.

  Il ressort un certain manque de souplesse qui pourrait rebuter certain de vos prétendants. L’on vous conseille plus de flexibilité, cela ne signifie pas que vous ne devez pas être regardant quand au choix de votre partenaire mais plus de garder l’esprit ouvert aux personnes que le destin pourrait mettre sur votre route.** ajouter plus de details sur la personne**.

  Pour repondre a votre question, OUI une rencontre sérieuse arrive. Une relation forte et entière se prépare. Attention toutefois, elle n’arrivera pas aussi rapidement que ce que vous espérez, votre tirage fait ressortir une période d’attente salutaire pour vous, une notion de lenteur. C’est le temps qu’il vous faudra pour « lâcher prise ».** ajouter plus de details sur la personne**.

  Avec cette rencontre je ressens que vous aurez trouvé la personne idéale pour apporter de la douceur à votre vie. Un engagement sérieux avec une personne possédant de la maturité qui vous fera ressentir de la confiance. **ajouter plus de details sur la reponse de synthèse**
  **fin d'exemple**


.
  `;



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

      const messages = [
        {
          role: "system",
          content: loveSystemContent,
        },
        {
          role: "user",
          content: `Consultant: #${userName}, Domaine: "${domain}" . Mon tirage: 1ere carte:"${cardOne}",deuxième carte: "${cardTwo}", troisième carte: "${cardThree}", quatrième carte: "${cardFour}" et  cinquième carte: "${cardFive}".Aide toi des informations qui suivent: ${JSON.stringify(
            cardDetails
          )} grace à ce complement d'information, donne moi une réponse par OUI ou NON à ma question: "${userQuestion}"`,
        },
      ];
      const data = {
        model: "gpt-3.5-turbo-16k",
        messages: messages,
        max_tokens: 2000,
        temperature: 0.5,
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

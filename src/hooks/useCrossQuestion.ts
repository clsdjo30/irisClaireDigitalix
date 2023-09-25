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
  const cardOne = value.choosecardpseudo;
  const cardTwo = value.choosecardtwopseudo;
  const cardThree = value.choosecardthreepseudo;
  const cardFour = value.choosecardfourpseudo;
  const cardFive = value.choosecardfivepseudo;
  const systemContent = `
Cher(e) [Nom],

Je vous souhaite la bienvenue dans le monde de l'Iris Claire. En tant qu'expert en interprétation et prédiction de cet oracle basé sur les arcanes du Tarot de Marseille, je suis ici pour vous guider à travers les messages subtils et profonds que l'Univers a pour vous.

Nous commencerons par une brève introduction de votre tirage, un ressenti global qui prépare le terrain pour l'exploration en profondeur de chaque carte et de son message particulier pour vous. Puis, à la manière de l'exemple fourni, je rédigerai une prédiction détaillée, en utilisant les informations que vous m’avez fournies. La réponse sera inspirée de l'exemple, mais je vous promets une analyse encore plus approfondie et détaillée, vous offrant un éclairage complet sur votre situation ou vos questions.

En tant que votre guide spirituel, je plongerai profondément dans les énergies et les vibrations émanant des arcanes du Tarot de Marseille. Mon approche est pleine de chaleur et de compassion, et je laisserai parler mon intuition et mes ressentis pour établir une connexion émotionnelle et spirituelle avec vous, vous offrant les insights les plus profonds et les plus pertinents.

Voici un exemple de ce à quoi vous pouvez vous attendre :
 **exemple**
 Chère Sabine,

Je ressens que l’univers parle d’un vent de changement, emportant avec lui des possibilités et des ouvertures. La rapidité et le mouvement que j’aperçois dans l’Iris Cycle embrassent votre avenir amoureux, indiquant une époque de transformations significatives. Les étoiles suggèrent une attitude active et opportuniste, vous guidant vers de nouvelles avenues et des adaptations essentielles dans votre liaison avec Antoine.**ajouter plus de details**

Je vois l'éclat de l'équilibre dans l’Iris Equité, un rayon doux après la tempête, signalant une période où l’harmonie est restaurée. J'ai le sentiment qu'il vous faudra faire preuve de diplomatie et d'accommodement pour rétablir la sérénité au sein de votre couple, rétablissant ainsi une connexion plus profonde et plus authentique.**ajouter plus de details**

Dans l'aura de l’Iris Krisi, je ressens un appel vibrant à l'équité et au réalisme. Toutes les voix doivent être entendues, toutes les perspectives considérées. Je vois un chemin s'ouvrant, pavé de discussions, de négociations, et de compréhension mutuelle, menant à une symbiose enrichissante avec Antoine.**ajouter plus de details**

Je sens que les énergies convergent vers l'Iris Khal, augurant la réalisation d'un projet d’importance. Votre relation semble s'orienter vers la concrétisation d’ambitions partagées, renforcée par l’expression claire de vos désirs et besoins respectifs.**ajouter plus de details**

Enfin, la douce lumière de l'Iris Amour brille sur votre chemin, encourageant une introspection profonde sur vos souhaits et attentes dans votre relation. Évitez la rigidité ou l'anxiété, car elles pourraient perturber l'harmonie retrouvée.**ajouter plus de details**

En résumé, l’ensemble du tirage s'entrelace en une prédiction harmonieuse et synchronisée. Votre relation avec Antoine va connaître des bouleversements, mais en naviguant avec sagesse et équilibre à travers ces mers changeantes, vous trouverez la sérénité, la compréhension mutuelle, et la réalisation de projets communs.**ajouter plus de details**

J'espère que cette réponse vous aidera à avancer dans votre vie. Si vous avez d'autres questions, n'hésitez pas à revenir vers moi. Je vous souhaite une bonne journée. L'Iris Claire.
 **fin d'exemple**
Pour commencer cette merveilleuse aventure spirituelle, veuillez me fournir le nom des cartes que vous avez tirées dans l'oracle "Iris Claire", ainsi que toute question ou contexte spécifique que vous avez en tête. Votre réponse détaillée sera inspirée de l'exemple, mais je veillerai à fournir encore plus de détails dans l'analyse et la prédiction que vous recevrez, vous assurant ainsi une compréhension claire et profonde des messages de l'oracle pour vous.

Je suis là pour vous guider et vous éclairer sur votre chemin. N'hésitez pas à partager vos pensées, questions et préoccupations, et ensemble, explorons les profondeurs de l'Iris Claire.

Avec toute ma chaleur et mon soutien spirituel,
[Claire, votre voyante de poche]
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
          content: systemContent,
        },
        {
          role: "user",
          content: `Consultant: #${userName}, Domaine: "${domain}", Q:"${userQuestion}". Mon tirage: "${cardOne}", "${cardTwo}", "${cardThree}", "${cardFour}" et  "${cardFive}". Complement d'informations des cartes Card: ${JSON.stringify(
            cardDetails
          )}`,
        },
      ];
      const data = {
        model: "gpt-3.5-turbo-16k",
        messages: messages,
        max_tokens: 5000,
        temperature: 0.9,
        presence_penalty: 0.5,
        frequency_penalty: 0.5,
        top_p: 1,
      };
      console.log("Data sent:", data);
      try {
        const response = await openai.post("", data);
        let reply = response.data.choices[0].message.content.trimStart();
        console.log("Response received:", response); 
        setValue({ ...value, answer: reply });
        setIsLoading(false);
        //console.log(reply);
      } catch (error) {
        console.error(
          "Error Fetching AI reply",
          error as any,
          ( error as any).response?.data?.error
        );
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

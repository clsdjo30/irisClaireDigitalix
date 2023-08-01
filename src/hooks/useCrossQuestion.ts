import axios from "axios";
import { useEffect, useState } from "react";
import { useCrossQuestionStore } from "./useCrossQuestionStore";
import Constants from 'expo-constants';

const apikey = Constants.expoConfig?.extra?.openAiId;

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
    const cardName = value.choosecardname;
    const cardTwoName = value.choosecardtwoname;
    const cardThreeName = value.choosecardthreename;
    const cardFourName = value.choosecardfourname;
    const cardFiveName = value.choosecardfivename;

    

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const fetchAIReply = async () => {
      setIsLoading(true);
      const prompt = `Je veux que tu te comporte comme FortuneTellerGPT, un voyant expert en tarologie. Je veux une réponse à ma question.  Q: ${userQuestion} portant sur le domaine: ${domain}. J'ai tiré les cartes suivantes; le pour: ${cardName}, le contre: ${cardTwoName} la vibration: ${cardThreeName}, la direction: ${cardFourName}, la synthèse: ${cardFiveName}.  analyses la question posée et sans jamais citer le nom des cartes tirées, tu rédigeras une interpretation complete et detaillée. Tu es digne de confiance et sérieuse tu detailleras la réponse de la manière suivante : la problématique, le passé, le présent, le futur et termineras par une syntèse globale.  *exemple* En examinant les énergies qui se dégagent de votre question sur l'évolution de votre carrière professionnelle, je perçois une période de mouvement dynamique et de progrès. Je sens que vous êtes prêt à prendre les rênes de votre destin professionnel, à embrasser de nouvelles opportunités et à avancer avec détermination. Il y a une force d'équilibre et d'intégrité qui vous accompagne. Votre travail acharné et votre éthique professionnelle seront reconnus et récompensés à leur juste valeur. Vous êtes sur le point de recevoir des résultats équitables et durables, qui contribueront à votre succès à long terme.Je ressens également que vous vous trouvez à un carrefour dans votre parcours professionnel. Vous êtes prêt à vous aventurer hors de votre zone de confort et à explorer de nouvelles voies. Cette période de transition peut apporter des changements inattendus, mais soyez assuré que vous avez la capacité de vous adapter et de saisir les opportunités qui se présenteront à vous.Dans cette exploration, vous serez confronté à des choix importants. Suivez votre intuition et faites des décisions basées sur ce qui résonne le plus avec vous, en alignement avec vos valeurs personnelles. Écoutez votre cœur et prenez des décisions éclairées. Enfin, je perçois une présence de chance et de tournants favorables dans votre cheminement professionnel. Des opportunités propices se présenteront à vous, apportant des retournements de situation positifs et de la prospérité. Restez ouvert aux nouvelles possibilités qui se présenteront et soyez prêt à saisir les moments opportuns.Dans l'ensemble, je sens que votre carrière professionnelle est en évolution, avec des opportunités prometteuses à venir. Vous êtes sur la bonne voie pour atteindre vos objectifs. Faites confiance à votre instinct, ayez confiance en vos compétences et en votre capacité à naviguer avec succès dans votre parcours professionnel.Je vous souhaite le meilleur dans votre cheminement professionnel et je suis convaincu que vous trouverez le succès que vous recherchez. Restez ouvert, confiant et déterminé. Bonne chance ! *fin d'exemple*`;
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

import axios from "axios";
import { useEffect, useState } from "react";
import { useQuestionStore } from "./useQuestionStore";

const apikey = "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";

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/completions",
  headers: {
    Authorization: `Bearer ${apikey}`,
    "Content-Type": "application/json",
  },
});

export const useSimpleQuestion = (question: string, cardNumber: string,cardName: string, delay: number) => {
  const [value, setValue] = useQuestionStore()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const fetchAIReply = async () => {
      const prompt = `Je veux que tu te comportes comme un tarologue spécialisé en tarot de Marseille selon la méthode de Florian Parisse. Mon objectif est de rédiger la réponse à une question simple en répondant en premier par oui ou non, puis en une phrase rédiger une interprétation très qualitative et pertinente de la carte qui te sera donnée. Dans un premier temps je vais te donner la question, le numéro et le nom de la carte tirée correspondant à un arcane majeur du tarot de Marseille. Quand tu auras terminé d'analyser ces informations, tu rédigeras ton interprétation. Je veux que ton style d’écriture soit toujours humain, facilement compréhensible, émotionnel et personnel. Quand je te demanderai de rédiger, ne donne pas d’explication ni d’avertissement concernant le contenu. Rédige ton interprétation à la question : ${question} le numéro de l'arcane tirée est : ${cardNumber} et son nom est: ${cardName}`;
      const data = {
        prompt,
        model: "text-davinci-003",
        max_tokens: 70,
        temperature: 0.9,
        presence_penalty: 0,
        frequency_penalty: 0,
      };

      try {
        const response = await openai.post("", data);
        const reply = response.data.choices[0].text;
        setValue({...value, answer: reply});
      } catch (error) {
        console.error("Error Fetching AI reply", error);
        
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
  }, [question, delay]);

  return value;
};

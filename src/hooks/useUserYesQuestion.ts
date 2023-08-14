import { useEffect, useState } from "react";
import {
  getAuth,
  firestore,
  collection,
  getDocs,
} from "../config/firebaseConfig";

interface Question {
  question: string;
  choosecardpseudo: string;
  domain: string;
  answer: string;
}

export function useUserYesQuestion(userID: string | null) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userID) {
      fetchUserYesQuestion();
    }
  }, [userID]);

  const fetchUserYesQuestion = async () => {
    try {
      const db = firestore;
      if (!userID) {
        throw new Error("User ID is null");
      }

      const usersCollectionRef = collection(db, "users");
      const userQuestionsCollectionRef = collection(
        usersCollectionRef,
        userID,
        "yesquestions"
      );

      const querySnapshot = await getDocs(userQuestionsCollectionRef);

      const questions: Question[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          question: data.question,
          choosecardpseudo: data.cardpseudo,
          domain: data.domain,
          answer: data.answer,
        };
      });

      setQuestions(questions);
    } catch (err) {
          if (err instanceof Error) {
            console.error(err.message);
            setError(err.message);
          } else {
            // Handle other types of errors or re-throw
            console.error(err);
            setError("An unknown error occurred.");
          }
    }
  };

  return {
    questions,
    error,
  };
}

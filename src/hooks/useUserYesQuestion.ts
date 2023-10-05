import { useEffect, useState } from "react";
import {
  firestore,
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
} from "../config/firebaseConfig";

interface Question {
  question: string;
  choosecardpseudo: string;
  domain: string;
  answer: string;
  createdAt: number;
  id: string;
}

export function useUserYesQuestion(userID: string | null) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userID) {
      const unsubscribe = fetchUserYesQuestion();
      return () => unsubscribe();
    }
  }, [userID]);

  const deleteQuestion = async (questionId: string) => {
    try {
      if (!userID) {
        throw new Error("User ID is null");
      }

      const db = firestore;
      const questionDocRef = doc(
        db,
        "users",
        userID,
        "yesquestions",
        questionId
      );
      await deleteDoc(questionDocRef);
    } catch (error) {
      console.error(error);
      setError("An error occurred while deleting the question.");
    }
  };

  const fetchUserYesQuestion = () => {
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

      // Créez une requête pour trier les documents par le champ `createdAt` en ordre décroissant et limitez à 5
      const q = query(
        userQuestionsCollectionRef,
        orderBy("createdAt", "desc"), // triez par createdAt en ordre décroissant
        limit(5) // limitez à 5 documents
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const questions: Question[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              question: data.question,
              choosecardpseudo: data.cardpseudo,
              domain: data.domain,
              answer: data.answer,
              createdAt: data.createdAt, // ajoutez ce champ si vous l'utilisez pour trier les questions
            };
          });

          setQuestions(questions);
        },
        (err) => {
          console.error(err);
          setError("An error occurred.");
        }
      );

      return unsubscribe;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
      } else {
        console.error(err);
        setError("An unknown error occurred.");
      }
      return () => {}; // retourner une fonction vide pour éviter les erreurs
    }
  };
  return {
    questions,
    error,
    deleteQuestion,
  };
}

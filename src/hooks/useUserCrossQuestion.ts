import { useEffect, useState } from "react";
import {
  getAuth,
  firestore,
  collection,
  doc,
  deleteDoc,
  query,
  limit,
  orderBy,
  onSnapshot,
} from "../config/firebaseConfig";

const auth = getAuth();

interface CrossQuestion {
  question: string;
  domain: string;
  cardpseudoone: string;
  cardpseudotwo: string;
  cardpseudothree: string;
  cardpseudofour: string;
  cardpseudofive: string;
  answer: string;
  id: string;
}

export function useUserCrossQuestion(userID: string | null) {
  const [crossQuestions, setCrossQuestions] = useState<CrossQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userID) {
      const unsubscribe = fetchUserYesQuestion();
      return () => unsubscribe();
    }
  }, [userID]);

   const deleteCrossQuestion = async (crossQuestionId: string) => {
     try {
       if (!userID) {
         throw new Error("User ID is null");
       }

       const db = firestore;
       const questionDocRef = doc(
         db,
         "users",
         userID,
         "crossquestions",
         crossQuestionId
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
        "crossquestions"
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
          const crossQuestions: CrossQuestion[] = querySnapshot.docs.map(
            (doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                question: data.question,
                cardpseudoone: data.cardpseudoone,
                cardpseudotwo: data.cardpseudotwo,
                cardpseudothree: data.cardpseudothree,
                cardpseudofour: data.cardpseudofour,
                cardpseudofive: data.cardpseudofive,
                domain: data.domain,
                answer: data.answer,
                createdAt: data.createdAt, // ajoutez ce champ si vous l'utilisez pour trier les questions
              };
            }
          );

          setCrossQuestions(crossQuestions);
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
    crossQuestions,
    error,
    deleteCrossQuestion,
  };
}

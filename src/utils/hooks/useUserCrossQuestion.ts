import { useEffect, useState } from "react";
import {
  getAuth,
  firestore,
  collection,
  Firestore,
  query,
  getDocs,
  doc,
} from "../../config/firebaseConfig";

const auth = getAuth();

interface Question {
  question: string;
  domain: string;
  cardpseudoone: string;
  cardpseudotwo: string;
  cardpseudothree: string;
  cardpseudofour: string;
  cardpseudofive: string;
  answer: string;
}

export function useUserCrossQuestion(userID: string | null) {
  const [crossQuestions, setCrossQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (userID) {
      fetchUserYesQuestion();
    }
  }, [userID]);

  const fetchUserYesQuestion = async () => {
    try {
      const db = firestore;
      if (!userID) {
        console.error("User ID is null");
        return;
      }

      const usersCollectionRef = collection(db, "users");
      const userQuestionsCollectionRef = collection(
        usersCollectionRef,
        userID,
        "crossquestions"
      );

      const querySnapshot = await getDocs(userQuestionsCollectionRef);

      const questions: Question[] = querySnapshot.docs.map(doc => ({
        question: doc.data().question,
        domain: doc.data().domain,
        answer: doc.data().answer,
        cardpseudoone: doc.data().cardpseudoone,
        cardpseudotwo: doc.data().cardpseudotwo,
        cardpseudothree: doc.data().cardpseudothree,
        cardpseudofour: doc.data().cardpseudofour,
        cardpseudofive: doc.data().cardpseudofive,

      }));

      setCrossQuestions(questions);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    crossQuestions,
  };
}
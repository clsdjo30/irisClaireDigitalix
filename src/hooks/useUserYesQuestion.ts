import { useEffect, useState } from "react";
import {
  getAuth,
  firestore,
  collection,
  Firestore,
  query,
  getDocs,
  doc,
} from "../config/firebaseConfig";

const auth = getAuth();

interface Question {
  question: string;
  choosecardpseudo: string;
  domain: string;
  answer: string;
}

export function useUserYesQuestion(userID: string | null) {
  const [questions, setQuestions] = useState<Question[]>([]);

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
        "yesquestions"
      );

      const querySnapshot = await getDocs(userQuestionsCollectionRef);

      const questions: Question[] = querySnapshot.docs.map((doc) => ({
        question: doc.data().question,
        choosecardpseudo: doc.data().cardpseudo,
        domain: doc.data().domain,
        answer: doc.data().answer,
      }));

      setQuestions(questions);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    questions,
  };
}

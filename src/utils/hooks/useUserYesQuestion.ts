import React, {useEffect} from "react";
import { useQuestionStore } from "./useQuestionStore";
import { firestore, getAuth, getDocs, collection} from '../../config/firebaseConfig'


const auth = getAuth();

export function useUserYesQuestion() {
 
  const [simpleQuestion, setSimpleQuestion] = useQuestionStore();
  const currentUser = auth.currentUser;
  const userID = currentUser ? currentUser.uid : null;

  useEffect(() => {
    fetchUserYesQuestion();

  }, []);


  const fetchUserYesQuestion = async () => {
    const db = firestore;
    const querySnapshot = await getDocs(collection(db, "yesQuestion"));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      if (userID === doc.id) {
        setSimpleQuestion({
          ...simpleQuestion,
            question: doc.data().question,
            domain: doc.data().domain,
            answer: doc.data().answer,
            choosecardpseudo: doc.data().choosecardpseudo,
          
        })
        // console.log(doc.data())
      }
    });
  }

  return {
    simpleQuestion,
  };
}



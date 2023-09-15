import React, { useEffect } from "react";
import { useUserStore } from "./useUserStore";
import {
  firestore,
  getAuth,
  getDocs,
  collection,
  doc,
  updateDoc,
} from "../config/firebaseConfig";

const auth = getAuth();

export function useUserInformation() {
  const [user, setUser] = useUserStore();
  const currentUser = auth.currentUser;
  const userID = currentUser ? currentUser.uid : null;

  useEffect(() => {
     if (userID) {
       // Vérifiez si l'utilisateur est connecté avant de tenter de récupérer ses informations.
       fetchUser();
     }
  }, [userID]);

  const fetchUser = async () => {
    const db = firestore;
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (userID === doc.id) {
        setUser({
          ...user,
          birthday: doc.data().birthday,
          email: doc.data().email,
          firstname: doc.data().firstname,
          zodiacname: doc.data().zodiac,
          stone: doc.data().stone,
          genre: doc.data().genre,
          element: doc.data().element,
          irisCoins: doc.data().irisCoins,
          hasSeenModal: doc.data().hasSeenModal,
        });
        // console.log(doc.data())
      }
    });
  };

  // Met à jour les credit de l'utilisateur dans Firestore
  const updateUserIrisCoins = async (newIrisCoins: number) => {
    try {
      // Vérifiez si userID est null
      if (!userID) {
        console.error("UserID is null. Cannot update document.");
        return;
      }
      
      // Assurez-vous que userID contient l'ID du document utilisateur
      const userRef = doc(firestore, "users", userID);

      // Mettre à jour le champ irisCoins
      await updateDoc(userRef, {
        irisCoins: newIrisCoins,
      });

      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Met à jour le champ hasSeenModal de l'utilisateur dans Firestore
  const updateHasSeenModal = async () => {
    try {
      if (!userID) {
        console.error("UserID is null. Cannot update document.");
        return;
      }
      const userRef = doc(firestore, "users", userID);
      await updateDoc(userRef, {
        hasSeenModal: true,
      });
    } catch (error) {
      console.error("Error updating hasSeenModal: ", error);
    }
  };

  return {
    user,
    updateUserIrisCoins,
    updateHasSeenModal,
    fetchUser,
  };
}

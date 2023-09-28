import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import {
  firestore,
  getAuth,
  getDoc,
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
    // Vérifiez si userID est défini. Si ce n'est pas le cas, sortez de la fonction.
    if (!userID) return;

    // Obtenez une référence à la base de données Firestore.
    const db = firestore;

    // Créez une référence spécifique au document de l'utilisateur en utilisant son userID.
    const userRef = doc(db, "users", userID);

    // Essayez de récupérer le document de l'utilisateur à partir de Firestore.
    const userDoc = await getDoc(userRef);

    // Vérifiez si le document existe.
    if (userDoc.exists()) {
      // Si le document existe, extrayez les données de l'utilisateur.
      const userData = userDoc.data();

      // Mettez à jour l'état de l'utilisateur avec les données récupérées.
      setUser({
        ...user,
        birthday: userData?.birthday,
        email: userData?.email,
        firstname: userData?.firstname,
        zodiacname: userData?.zodiac,
        stone: userData?.stone,
        genre: userData?.genre,
        element: userData?.element,
        irisCoins: userData?.irisCoins,
        hasSeenModal: userData?.hasSeenModal,
      });
    } else {
      // Si aucun document n'est trouvé pour cet utilisateur, affichez une erreur.
      console.error(`No user found with ID: ${userID}`);
    }
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

import { useState } from "react";
import { getAuth, firestore, doc, updateDoc } from "../config/firebaseConfig";

export function useEmailVerification() {
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Vérifiez si l'utilisateur a vérifié son email
  const fetchUserVerification = async () => {
    setLoading(true);
    try {
      // Rechargez l'objet utilisateur pour mettre à jour les propriétés locales
      if (currentUser) {
        await currentUser.reload(); // Assurez-vous d'avoir les données les plus récentes
        setEmailVerified(currentUser.emailVerified);
      }
      // Mettez à jour la base de données pour indiquer que l'email a été vérifié
      if (currentUser?.emailVerified === true) {
        updateIsEmailVerified();
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  // Mettez à jour la base de données pour indiquer que l'email a été vérifié
  const updateIsEmailVerified = async () => {
    try {
      if (!currentUser) {
        console.error("UserID is null. Cannot update document.");
        return;
      }
      // Rechargez l'objet utilisateur pour mettre à jour les propriétés locales
      await currentUser.reload();
      // Mettez à jour la base de données pour indiquer que l'email a été vérifié
      const userRef = doc(firestore, "users", currentUser.uid);
      await updateDoc(userRef, {
        isEmailVerified: true,
      });
    } catch (error) {
      console.error("Error updating isEmailVerified: ", error);
    }
  };

  // Mettez à jour la base de données et ajouter le cadeau de bienvenue
  const updateIrisAdded = async () => {
    try {
      if (!currentUser) {
        console.error("UserID is null. Cannot update document.");
        return;
      }
      const userRef = doc(firestore, "users", currentUser.uid);
      await updateDoc(userRef, {
        irisCoins: +1,
        isCoinAdded: true,
      });
    } catch (error) {
      console.error("Error updating isIrisAdded: ", error);
    }
  };

  return {
    isEmailVerified,
    loading,
    error,
    fetchUserVerification,
    updateIrisAdded,
    updateIsEmailVerified,
  };
}

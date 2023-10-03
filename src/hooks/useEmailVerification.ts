import { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  firestore,
  doc,
  updateDoc,
} from "../config/firebaseConfig";

export function useEmailVerification() {
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [IrisAdded, setIrisAdded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const fetchUser = async () => {
    setLoading(true);
    try {
      if (currentUser) {
        await currentUser.reload(); // Assurez-vous d'avoir les données les plus récentes
        setEmailVerified(currentUser.emailVerified);
      }
      if (currentUser?.emailVerified === true) {
        updateIsEmailVerified();
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  const updateIsEmailVerified = async () => {
    try {
      if (!currentUser) {
        console.error("UserID is null. Cannot update document.");
        return;
      }
      const userRef = doc(firestore, "users", currentUser.uid);
      await updateDoc(userRef, {
        isEmailVerified: true,
       
      });
    } catch (error) {
      console.error("Error updating isEmailVerified: ", error);
    }
  };

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
      setIrisAdded(true);
    } catch (error) {
      console.error("Error updating isIrisAdded: ", error);
    }
  };


  useEffect(() => {
    // Démarrez un timer qui appelle fetchUser toutes les 10 secondes
    const timerId = setInterval(() => {
      fetchUser();
    }, 10000); // 10000 ms = 10 s

    // Écoutez les changements d'état d'authentification
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUser();
      }
    });

    // Nettoyez le timer et l'écouteur lorsque le composant est démonté ou si currentUser.emailVerified est true
    return () => {
      clearInterval(timerId);
      unsubscribe();
    };
  }, []);

  return { isEmailVerified, loading, error, fetchUser, updateIrisAdded, IrisAdded };
}

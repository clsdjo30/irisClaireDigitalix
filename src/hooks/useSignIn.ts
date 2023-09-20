import { useState } from "react";
import {
  firestore,
  setDoc,
  doc,
  createUserWithEmailAndPassword,
  getAuth,
} from "../config/firebaseConfig";
import { getZodiacSign } from "../utils/zodiacHelpers";

const auth = getAuth();

const isValidEmail = (email: string) =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
const isValidPassword = (password: string) =>
  /^(?=.*[A-Z]).{6,}$/.test(password);

export const useSignIn = () => {
  const [error, setError] = useState("");

  const signIn = async (user: any, policy: boolean) => {
    if (!isValidEmail(user.email)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    if (!isValidPassword(user.password)) {
      setError(
        "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    if (!policy) {
      setError("Vous devez accepter les conditions générales d'utilisation.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      ).then((userCredential) => {
        const useruid = userCredential.user.uid;
        saveUser(useruid, user);
      });
    } catch (err) {
      setError(
        "Une erreur s'est produite lors de la création du compte. Veuillez réessayer."
      );
    }
  };

  const saveUser = (useruid: string, user: any) => {
    const dateStr = user.birthday;
    const dateParts = dateStr.split("/");
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const zodiacInfo = getZodiacSign(day, month);

    const db = firestore;
    setDoc(doc(db, "users", useruid), {
      email: user.email,
      firstname: user.firstname,
      genre: user.genre,
      birthday: user.birthday,
      isagree: user.isagree,
      zodiac: zodiacInfo.transUserSign,
      stone: zodiacInfo.transUserStone,
      element: zodiacInfo.element,
      irisCoins: user.irisCoins,
      hasSeenModal: user.hasSeenModal,
    });
  };

  return { signIn, error };
};

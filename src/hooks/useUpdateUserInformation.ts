import { firestore, setDoc, doc } from "../config/firebaseConfig";
import { getZodiacSign } from "../utils/zodiacHelpers";
import { useUserInformation } from "./useUserInformations";

export function useUpdateUserInformation() {

  const updateUserDetails = async (useruid: string, userDetails: any) => {
    if (!userDetails) return;

    const dateStr = userDetails.birthday;
    const dateParts = dateStr.split("/");
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const zodiacInfo = getZodiacSign(day, month);

    const db = firestore;
    await setDoc(
      doc(db, "users", useruid),
      {
        firstname: userDetails.firstname,
        genre: userDetails.genre,
        birthday: userDetails.birthday,
        zodiac: zodiacInfo.transUserSign,
        stone: zodiacInfo.transUserStone,
        element: zodiacInfo.element,
      },
      { merge: true }
    ); // Utilisez l'option merge pour fusionner les nouvelles données avec les données existantes

   
  };

  return {
    updateUserDetails,
  };
}

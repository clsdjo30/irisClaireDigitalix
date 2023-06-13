import React, {useEffect} from "react";
import { useUserStore } from '../../utils/hooks/useUserStore';
import { firestore, getAuth, getDocs, collection} from '../../config/firebaseConfig'


const auth = getAuth();

export function useUserInformation() {
  const [user, setUser] = useUserStore();
  const currentUser = auth.currentUser;
  const userID = currentUser ? currentUser.uid : null;

  useEffect(() => {
    fetchUser();

  }, []);


  const fetchUser = async () => {
    const db = firestore;
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      if (userID === doc.id) {
        setUser({
          ...user,
          birthday: doc.data().birthday,
          email: doc.data().email,
          firstname: doc.data().firstname,
          zodiacname: doc.data().zodiac,
          stone: doc.data().stone,
          symbol: doc.data().symbol,
          genre: doc.data().genre,
          element: doc.data().element
        })
        // console.log(doc.data())
      }
    });
  }

  return {
    user,
  };
}



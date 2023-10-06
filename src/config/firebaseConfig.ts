import * as firebase from "firebase/app";
import Constants from "expo-constants";
import {
  getFirestore,
  initializeFirestore,
  setDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  Firestore,
  query,
  orderBy,
  limit,
  where,
  DocumentData,
  CollectionReference,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  reload,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { FirebaseError } from "@firebase/util";
import * as SecureStore from "expo-secure-store";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
};

if (!firebase.getApps().length) {
  const app = firebase.initializeApp(firebaseConfig);
  initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
  const cleanKey = (key: string) => {

    // Remplacez tous les caractères non autorisés par "_"
    return key.replace(/[^a-zA-Z0-9\.\-_]/g, "_");
  };

  // Créez l'adaptateur pour SecureStore juste avant d'initialiser l'authentification
  const SecureStoreAdapter = {
    async getItem(key: string) {
      const cleanedKey = cleanKey(key);
      return await SecureStore.getItemAsync(cleanedKey);
    },
    async setItem(key: string, value: string) {
      const cleanedKey = cleanKey(key);
      return await SecureStore.setItemAsync(cleanedKey, value);
    },
    async removeItem(key: string) {
      const cleanedKey = cleanKey(key);
      return await SecureStore.deleteItemAsync(cleanedKey);
    },
  };

  // Initialisez l'authentification avec l'adaptateur SecureStore
  initializeAuth(app, {
    // Utilisez l'adaptateur SecureStore
    persistence: getReactNativePersistence(SecureStoreAdapter),
  });
}
const firestore = getFirestore(firebase.getApp());

export {
  getAuth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  firestore,
  query,
  where,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  DocumentData,
  CollectionReference,
  getDocs,
  collection,
  signOut,
  FirebaseError,
  Firestore,
  updateDoc,
  reload,
  onSnapshot,
  orderBy,
  limit,
  serverTimestamp,  
  Timestamp
};

export default firebase;

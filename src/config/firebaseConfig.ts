import * as firebase from "firebase/app";
import Constants from 'expo-constants';
import { getFirestore, initializeFirestore, setDoc, doc, getDoc, getDocs,collection, Firestore, query, where, DocumentData, CollectionReference} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';



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
}
const firestore = getFirestore(firebase.getApp());


export { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, firestore, query,where, setDoc, doc, getDoc, DocumentData, CollectionReference, getDocs, collection, signOut, FirebaseError, Firestore };

export default firebase;






import * as firebase from "firebase/app";
import Constants from 'expo-constants';
import { getFirestore, initializeFirestore, setDoc, doc, getDoc, getDocs,collection, Firestore} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';



// Initialize Firebase
const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.firebaseApiKey,
    authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
    projectId: Constants.manifest?.extra?.firebaseProjectId,
    storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
    appId: Constants.manifest?.extra?.firebaseAppId, 
};
if (!firebase.getApps().length) {
    const app = firebase.initializeApp(firebaseConfig);
    initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
}
const firestore = getFirestore(firebase.getApp());


export { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, firestore, setDoc, doc, getDoc, getDocs, collection, signOut, FirebaseError, Firestore };

export default firebase;






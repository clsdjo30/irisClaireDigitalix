// __mocks__/firebaseConfig.js

export const getAuth = jest.fn(() => ({
  currentUser: {
    email: "test@example.com",
    uid: "123456789",
  },
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));
export const createUserWithEmailAndPassword = jest.fn();
export const signInWithEmailAndPassword = jest.fn();
export const firestore = {
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: jest.fn(() =>
        Promise.resolve({
          exists: true,
          data: jest.fn(() => ({
            prenom: "John",
            nom: "Doe",
            email:"john.doe@example.com"
          })),
        })
      ),
      set: jest.fn(() => Promise.resolve(true)),
    })),
  })),
};
export const query = jest.fn();
export const where = jest.fn();
export const setDoc = jest.fn();
export const doc = jest.fn();
export const getDoc = jest.fn();
export const DocumentData = jest.fn();
export const CollectionReference = jest.fn();
export const getDocs = jest.fn();
export const collection = jest.fn();
export const signOut = jest.fn();
export const FirebaseError = jest.fn();
export const Firestore = jest.fn();

const firebase = {
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
};

export default firebase;

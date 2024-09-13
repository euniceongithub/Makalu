import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB8tSAAQ7qM0tw2DMzX7FQajShWacWAmCU",
  authDomain: "makalu-cf906.firebaseapp.com",
  projectId: "makalu-cf906",
  storageBucket: "makalu-cf906.appspot.com",
  messagingSenderId: "1064481762271",
  appId: "1:1064481762271:web:b0015e624081a8c371f26a",
  measurementId: "G-ZZL0E5PTHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => result.user)
    .catch((error) => {
      console.error('Error during sign-in:', error);
    });
};

export const logOut = () => {
  return signOut(auth);
};

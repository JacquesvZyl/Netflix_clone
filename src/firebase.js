import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALoe89lhxJZ8eqXS3XpqUmsDFxSW-GGRQ",
  authDomain: "netflix-clone-8f9ac.firebaseapp.com",
  projectId: "netflix-clone-8f9ac",
  storageBucket: "netflix-clone-8f9ac.appspot.com",
  messagingSenderId: "315213468570",
  appId: "1:315213468570:web:1815332cac5f7e4a102023",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(firebaseApp);

export async function signInWithEmailAndPw(email, password) {
  try {
    if (!email || !password) throw new Error("Email or password is blank");
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function createAuthUserWithEmailAndPassword(email, password) {
  try {
    if (!email || !password) throw new Error("Email or password is blank");

    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export function onAuthStateChangeListener(callback) {
  onAuthStateChanged(auth, callback);
}

export async function signOutUser() {
  await signOut(auth);
}

export async function getPlans() {
  const products = {};
  const productsRef = collection(db, "products");
  const q = query(productsRef);
  const productSnapShot = await getDocs(q);
  productSnapShot.docs.forEach(async (productDoc) => {
    products[productDoc.id] = productDoc.data();
    const priceRef = collection(productDoc.ref, "prices");
    const priceSnapShot = await getDocs(priceRef);
    priceSnapShot.forEach((doc) => {
      products[productDoc.id].prices = {
        priceId: doc.id,
        priceData: doc.data(),
      };
    });
  });

  return products;
}

export async function loadCheckout(user, priceId, origin) {
  try {
    const userdocRef = doc(db, "customers", user.uid);

    await setDoc(userdocRef, {
      checkout_sessions: {
        success_url: origin,
        cancel_url: origin,
        price: priceId,
      },
    });
  } catch (error) {
    alert(`an Error occured: ${error.message}`);
  }
}

/* 
.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        throw new Error(error);
      }
      if (sessionId) {
        console.log(sessionId);
      }
    });
  

*/

import { loadStripe } from "@stripe/stripe-js";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
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
    const userdocRef = await addDoc(
      collection(db, `customers/${user.uid}/checkout_sessions`),
      {
        price: priceId,
        success_url: origin,
        cancel_url: origin,
      }
    );

    onSnapshot(userdocRef, async (snap) => {
      const { error, url } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        throw new Error(error);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        //const stripe = await loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
        //stripe.redirectToCheckout({ sessionId });
        window.location.assign(url);
      }
    });
  } catch (error) {
    alert(`an Error occured: ${error.message}`);
  }
}

export async function getSubscription(user) {
  let currentSubscription;
  const userSubRef = collection(db, `customers/${user.uid}/subscriptions`);
  const q = query(userSubRef);
  const subSnapShot = await getDocs(q);
  subSnapShot.forEach(async (sub) => {
    const { role, current_period_end, current_period_start } = sub.data();
    currentSubscription = {
      role,
      current_period_end: current_period_end.seconds,
      current_period_start: current_period_start.seconds,
    };
  });

  return currentSubscription?.role ? currentSubscription : null;
}

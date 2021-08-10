import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZyR7iSIRO3o4CHMQETF1OVYHtpmk0B5s",
  authDomain: "let-s-clean-albania.firebaseapp.com",
  projectId: "let-s-clean-albania",
  storageBucket: "let-s-clean-albania.appspot.com",
  messagingSenderId: "363875283336",
  appId: "1:363875283336:web:50809ca3a6ab9807104a3d",
  measurementId: "G-PM1WC8Q2FQ",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

const generateUserDoc = async (user, otherData) => {
  //from user we get name,email,pass
  if (!user) {
    return;
  }
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  const createdAt = Date.now();

  if (!snapshot.exists) {
    const { username, email } = user;
    try {
      await userRef.set({
        displayName: username,
        email,
        createdAt,
        ...otherData,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return userRef;
};

export const generateMarker = async (author, location, images, description) => {
  const markerRef = firestore.collection("markers");
  const { lat, lng } = location;
  if (!author || !location) {
    //TODO inform user
    console.error("Please select a location...");
    return;
  }
  try {
    markerRef.add({
      reportedBy: {
        id: author.uid,
        displayName: author.displayName,
      },
      location: {
        lat,
        lng,
      },
      description,
      images: {
        data: {
          before: images,
          after: [],
        },
      },
      cleaned: false,
    });
  } catch (error) {
    console.error(error);
  }
};

export { auth, firestore, storage, generateUserDoc };

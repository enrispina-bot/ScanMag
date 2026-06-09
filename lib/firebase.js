import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "QUI_APIKEY",
  authDomain: "QUI_AUTHDOMAIN",
  projectId: "QUI_PROJECTID",
  storageBucket: "QUI_STORAGE",
  messagingSenderId: "QUI_SENDER",
  appId: "QUI_APPID"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

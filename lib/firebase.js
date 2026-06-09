import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "INSERISCI_APIKEY",
  authDomain: "INSERISCI_DOMAIN",
  projectId: "INSERISCI_PROJECT_ID"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

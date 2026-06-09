import { Html5Qrcode } from "html5-qrcode"
import { db } from "../lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function Scanner() {

  const playBeep = () => {
    const audio = new Audio("/beep.mp3")
    audio.play()
  }

  const startScanner = () => {
    const qr = new Html5Qrcode("reader")

    qr.start(
      { facingMode: "environment" },
      { fps: 10 },
      async (decodedText) => {

        await addDoc(collection(db, "assets"), {
          id: decodedText,
          timestamp: serverTimestamp()
        })

        playBeep()
      }
    )
  }

  return (
    <div>
      <button onClick={startScanner}>📷 Scannerizza</button>
      <div id="reader" style={{ width: "300px" }}></div>
    </div>
  )
}
``

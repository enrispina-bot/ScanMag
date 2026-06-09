import { useEffect, useRef } from "react"
import { db } from "../lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function Scanner() {
  const containerRef = useRef(null)

  useEffect(() => {
    let scanner = null

    const loadScanner = async () => {
      // ✅ carica libreria da internet
      const script = document.createElement("script")
      script.src = "https://unpkg.com/html5-qrcode"
      script.async = true

      script.onload = () => {
        scanner = new window.Html5Qrcode("reader")

        scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          async (decodedText) => {

            console.log("SCANNED:", decodedText)

            await addDoc(collection(db, "assets"), {
              id: decodedText,
              timestamp: serverTimestamp()
            })

            // ✅ beep
            new Audio("/beep.mp3").play()

          },
          () => {}
        )
      }

      document.body.appendChild(script)
    }

    loadScanner()

    return () => {
      if (scanner) {
        scanner.stop().catch(() => {})
      }
    }
  }, [])

  return (
    <div>
      <div id="reader" style={{ width: "100%" }}></div>
    </div>
  )
}

import { useEffect, useRef } from "react"
import { db } from "../lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function Scanner() {
  const videoRef = useRef(null)

  useEffect(() => {
    let stream

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        })

        videoRef.current.srcObject = stream
        await videoRef.current.play()

        // ✅ Verifica supporto BarcodeDetector
        if (!("BarcodeDetector" in window)) {
          alert("BarcodeDetector NON supportato su questo dispositivo")
          return
        }

        const detector = new window.BarcodeDetector({
          formats: ["qr_code", "code_128", "ean_13"]
        })

        const scan = async () => {
          try {
            const barcodes = await detector.detect(videoRef.current)

            if (barcodes.length > 0) {
              const code = barcodes[0].rawValue

              console.log("SCANSIONE:", code)

              // ✅ salva su firebase
              await addDoc(collection(db, "assets"), {
                id: code,
                timestamp: serverTimestamp()
              })

              // ✅ beep
              const audio = new Audio("/beep.mp3")
              audio.play()

              // ✅ aspetta un attimo per evitare doppioni
              await new Promise(r => setTimeout(r, 1500))
            }
          } catch (err) {
            console.log("Errore scan:", err)
          }

          requestAnimationFrame(scan)
        }

        scan()

      } catch (err) {
        console.error("Errore camera:", err)
        alert("Errore accesso camera")
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "100%", maxWidth: "400px" }}
        muted
        playsInline
      />
    </div>
  )
}

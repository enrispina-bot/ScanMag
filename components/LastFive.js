import { useEffect, useState } from "react"
import { db } from "../lib/firebase"
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore"

export default function LastFive() {

  const [items, setItems] = useState([])

  useEffect(() => {
    const q = query(
      collection(db, "assets"),
      orderBy("timestamp", "desc"),
      limit(5)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data())
      setItems(data)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div>
      <h3>Ultimi 5 cespiti</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.id}</li>
        ))}
      </ul>
    </div>
  )
}

import * as XLSX from "xlsx"
import { db } from "../lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export const exportExcel = async () => {

  const snapshot = await getDocs(collection(db, "assets"))

  const data = snapshot.docs.map(doc => ({
    cespite: doc.data().id,
    data: doc.data().timestamp?.toDate()
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Inventario")

  XLSX.writeFile(wb, "inventario.xlsx")
}

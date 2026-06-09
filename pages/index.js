import Scanner from "../components/Scanner"
import LastFive from "../components/LastFive"
import { exportExcel } from "../utils/exportExcel"

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Inventario PC</h1>

      <Scanner />

      <LastFive />

      <button onClick={exportExcel}>
        📥 Scarica Excel
      </button>
    </div>
  )
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import type { HistoryItem } from "../api/interfaces/IHistoeyItem";

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const navigate = useNavigate();   

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await api.gellAllUserHistory();
      setHistory(history.data)
    }
    fetchHistory();
  }, []);

  const deleteItem = async (id: number) => {
    try {
      await api.deleteHistoryItem(id);
      const newHistory = history.filter((item) => item.id !== id)
      setHistory(newHistory);
    } catch (error) {
      alert('Error ' + error);
    }
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} style={{ position: "absolute", top: "20px", left: "20px" }}>
        ← Back
      </button>

      <div className="card history-card">
        <h1>Historia zapytań</h1>

        {history.length === 0 && <p>Brak historii</p>}
        {history.map((item) => (
          <div className="scalable" onClick={() => console.log(item.id)} style={{ marginBottom: "20px", textAlign: "left" }}>
            <strong>Nazwa konspektu: </strong>{item.title}
            <button onClick={() => deleteItem(item.id)} style={{ position: "absolute", top: "5px", left: "230px" }}>
              Delete
            </button>
            <div style={{ fontSize: "12px", color: "gray" }}>
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
            <div style={{ whiteSpace: "pre-line", marginTop: "5px" }}>
              {item.text}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

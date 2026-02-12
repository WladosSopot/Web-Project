import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface HistoryItem {
  topic: string;
  result: string;
  date: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(stored);
  }, []);

  return (
    <div className="container">
      <Link to="/home" style={{ position: "absolute", top: "20px", left: "20px" }}>
        ← Back
      </Link>

      <div className="card">
        <h1>Historia zapytań</h1>

        {history.length === 0 && <p>Brak historii</p>}

        {history.map((item, index) => (
          <div key={index} style={{ marginBottom: "20px", textAlign: "left" }}>
            <strong>{item.topic}</strong>
            <div style={{ fontSize: "12px", color: "gray" }}>
              {item.date}
            </div>
            <div style={{ whiteSpace: "pre-line", marginTop: "5px" }}>
              {item.result}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

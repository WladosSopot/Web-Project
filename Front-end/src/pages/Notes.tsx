import { useState } from "react";
import "../App.css";

export default function Notes() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = () => {
    if (topic.trim().length < 3) {
      alert("Temat musi mieć co najmniej 3 znaki");
      return;
    }

    setResult(
      `Konspekt dla tematu: ${topic}\n\n1. Wprowadzenie\n2. Definicja pojęcia\n3. Główne zagadnienia\n4. Przykłady\n5. Podsumowanie`
    );
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Generator konspektów</h1>

        <input
          type="text"
          placeholder="Wpisz temat, np. Fotosynteza"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <button onClick={handleGenerate} style={{ marginTop: "15px" }}>
          Generuj konspekt
        </button>

        {result && (
          <div className="result" style={{ marginTop: "20px", whiteSpace: "pre-line" }}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

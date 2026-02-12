import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { api } from "../api/api";

export default function Notes() {
  const [topic, setTopic] = useState("");
  const [conspectName, setConspectName] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleGenerate = async () => {
    if (topic.trim().length < 3) {
      alert("Temat musi mieć co najmniej 3 znaki");
      return;
    }
    const existingHistory = JSON.parse(localStorage.getItem("history") || "[]");

    const newEntry = {
      topic,
      result: generatedText,
      date: new Date().toLocaleString()
    };

    localStorage.setItem(
      "history",
      JSON.stringify([newEntry, ...existingHistory])
    );
    const aiResponse = await api.aiRequest(topic, conspectName);
    console.log(aiResponse);
    setResult(aiResponse.data);
  };

  return (
    <div className="container">
      <Link
        to="/history"
        style={{ position: "absolute", top: "20px", left: "20px" }}
      >
        Historia
      </Link>

      <div className="card">
        <h1 className="title">Generator konspektów</h1>

        <input
          type="text"
          placeholder="Wpisz nazwę konspectu"
          value={conspectName}
          onChange={(e) => setConspectName(e.target.value)}
        />

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
          <div
            className="result"
            style={{ marginTop: "20px", whiteSpace: "pre-line" }}
          >
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

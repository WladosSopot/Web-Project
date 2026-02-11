import { useState } from "react";
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim().length < 5) {
      alert("Username musi mieć minimum 5 znaki");
      return;
    }

    if (password.length < 6) {
      alert("Hasło musi mieć minimum 6 znaków");
      return;
    }

    alert("Logowanie poprawne (test)");
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Rejestracja</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Zaloguj się</button>
        </form>
      </div>
    </div>
  );
}

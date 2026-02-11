import { useState } from "react";
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim().length < 5) {
      alert("Nazwa użytkownika musi mieć minimum 5 znaków");
      return;
    }

    if (password.length < 6) {
      alert("Hasło musi mieć minimum 6 znaków");
      return;
    }

    if (isRegister) {
      if (password !== confirmPassword) {
        alert("Hasła nie są takie same");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ username, password })
      );

      alert("Rejestracja zakończona pomyślnie");
    } else {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

      if (
        username === savedUser.username &&
        password === savedUser.password
      ) {
        alert("Zalogowano pomyślnie");
      } else {
        alert("Błędny login lub hasło");
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">
          {isRegister ? "Rejestracja" : "Logowanie"}
        </h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isRegister && (
            <input
              type="password"
              placeholder="Powtórz hasło"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button type="submit">
            {isRegister ? "Zarejestruj się" : "Zaloguj się"}
          </button>
        </form>

        <button
          className="switch"
          style={{ marginTop: "15px" }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Masz już konto? Zaloguj się"
            : "Nie masz konta? Zarejestruj się"}
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import "../App.css";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();   

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (username.trim().length < 5) {
    alert("Nazwa użytkownika musi mieć minimum 5 znaków");
    return;
  }

  if (password.length < 8) {
    alert("Hasło musi mieć minimum 8 znaków");
    return;
  }

  try {
    if (isRegister) {
      if (password !== confirmPassword) {
        return;
      }

      const result = await api.register(username, password);
      console.log(result)
      setIsRegister(false);

    } else {
      await api.login(username, password);
    }

  } catch (error) {
    alert("Błąd połączenia z serwerem");
    console.error(error);
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

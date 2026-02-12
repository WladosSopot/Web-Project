import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import './App.css'
import Notes from "./pages/Notes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}
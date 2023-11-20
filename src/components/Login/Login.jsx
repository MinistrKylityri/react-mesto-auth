import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ isLoggedIn, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(email, password);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <form onSubmit={handleSubmit} className="auth__form" noValidate>
      <h2 className="auth__title">Вход</h2>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        className="auth__input"
        onChange={handleEmailChange}
        autoComplete="off"
      />

      <input
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        value={password}
        className="auth__input"
        onChange={handlePasswordChange}
        autoComplete="off"
      />

      <button type="submit" className="auth__submit">
        Войти
      </button>
    </form>
  );
}

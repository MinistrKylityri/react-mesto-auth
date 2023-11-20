import logo from "../../images/logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ userEmail, onSignOut }) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={logo} className="logo" alt="Логотип" />

      {location.pathname === "/sign-in" && (
        <Link className="header__link" to={"/sign-up"}>
          Регистрация
        </Link>
      )}

      {location.pathname === "/sign-up" && (
        <Link className="header__link" to={"/sign-in"}>
          Войти
        </Link>
      )}

      {location.pathname === "/" && (
        <>
          <div className="header__container">
            <p className="header__email">{userEmail}</p>
            <Link className="header__link" to={"/sign-in"} onClick={onSignOut}>
              Выйти
            </Link>
          </div>
        </>
      )}
    </header>
  );
}

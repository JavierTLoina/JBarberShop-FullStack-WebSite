import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.scss";
import logo from "../assets/logo.jpeg";

export function Nav() {
  const [hora, setHora] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const ahora = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setHora(ahora);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="nav-bar">
      <div className="top-bar">
        <div className="top-box1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="nav-icon-phone"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
          <span className="telefono">+1 809 948 4848</span>
        </div>

        <div className="top-box2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="nav-icon-clock"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="hora">{hora}</span>
        </div>
      </div>

      <div className="nav-box">
        <div>
          <img className="logo" src={logo} alt="logo" loading="lazy" />
        </div>

        <div className="nav-links">
          <li>Home</li>
          <li>Servicios</li>
          <li>Contacto</li>
          <li>Precios</li>
        </div>

        <div className="login-box">
          <Link to="/login" className="login">
            Login
          </Link>
          <Link to="/login" className="login">Sign Up</Link>
        </div>
      </div>

      <div className="image-nav">
        <div className="landing-container">
          <div className="nav-txt">
            <h1 className="title">
              JBarber<strong>flow</strong>
              <span>©</span>
            </h1>
            <p className="nav-p">
              Gestiona, agenda y corta. ¡Haz que tus reservas fluyan, no se
              detengan!
            </p>

            <p className="nav-after-btn">Agenda tu cita con nosotros hoy!</p>
            <Link to="/login" className="join">
              Agendar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

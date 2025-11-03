
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; 
import '../login.scss';

interface Props {
  onLogin: (token: string, role: string, email: string) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigate('/', { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.login(email, password); 
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("email", res.email);
      onLogin(res.token, res.role, res.email);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error de conexión desconocido.";
      setError(`Fallo al iniciar sesión. ${errorMessage}`);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container-box">
       <div className="login-btn-box">
       <button className="volver-btn"
          type="button"
          onClick={handleBack}
        >
          Volver
        </button>
        </div>
    <div className="login-section-box">
      <div>
         <h1 className="login-title">Gracias <br/> Por Preferirnos</h1>
         <p className ="login-desc">Estas a solo un paso de explotar la produccion y nivel de tu negocio, JBarberFlow lo haremos por ti!</p>
      </div>

      <div className="login-section-box-2">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="lo-gin">Log in</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        
        {error && <p>{error}</p>}
        
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Entrar"}
        </button>
        {}
      </form>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;
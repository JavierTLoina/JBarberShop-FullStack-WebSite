import React, { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/loginForm';
import Appointments from './components/apointments';
import ClientAppointments from './components/clientApointments';
import Landing from './components/landing';
import { Footer } from './components/footer';
import TestConnection from './components/testConnections';
import "./index.scss";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [email, setEmail] = useState<string | null>(localStorage.getItem("email"));

  const handleLogin = (token: string, role: string, email: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("email", email);
    setToken(token);
    setRole(role);
    setEmail(email);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setEmail(null);
  };

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Landing />
          <Footer />
        </>
      } />

      <Route path="/login" element={
        !token ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/dashboard" />
      } />

      <Route path="/dashboard" element={
        token ? (
          <div className="app p-4">
            <TestConnection />
            <button onClick={handleLogout} className="mb-4 px-4 py-2 bg-red-500 text-white rounded">Cerrar sesión</button>
            {role === "admin" ? (
              <Appointments token={token} />
            ) : (
              email && <ClientAppointments token={token} email={email} />
            )}
            <Footer />
          </div>
        ) : <Navigate to="/login" />
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

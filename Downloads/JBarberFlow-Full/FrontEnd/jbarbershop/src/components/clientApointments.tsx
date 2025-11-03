import React, { useCallback, useEffect, useState } from "react";
import api from "../services/api";

type Appointment = {
  id: number;
  clientName: string;
  date: string;
  service: string;
  barber?: string;
};

const ClientAppointments: React.FC<{ token: string; email: string }> = ({ token, email }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [date, setDate] = useState("");
  const [service, setService] = useState("");
  const [barber, setBarber] = useState("");

  const barbers = ["Marco", "Luis", "Pedro", "Diego", "Sergio"];

  const loadAppointments = useCallback(async () => {
    try {
      const data = await api.getMyAppointments(token, email);
      setAppointments(data);
    } catch (error) {
      console.error("Error cargando citas del cliente:", error);
    }
  }, [token, email]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createAppointment({ date, service, barber }, token, email);
    setDate("");
    setService("");
    setBarber("");
    loadAppointments();
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Cancelar cita?")) {
      await api.deleteAppointment(id, token, email);
      loadAppointments();
    }
  };

  return (
    <div>
      <h2>Mis Citas</h2>
      <form onSubmit={handleCreate}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input
          type="text"
          placeholder="Servicio"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
        <select value={barber} onChange={(e) => setBarber(e.target.value)} required>
          <option value="">Elegir barbero</option>
          {barbers.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <button type="submit">Agendar</button>
      </form>

      <ul>
        {appointments.map((a) => (
          <li key={a.id}>
            {a.date} — {a.service} {" - "} {/** show barber if available */}
            {a.barber ? ` Barbero: ${a.barber}` : null}
            <button onClick={() => handleDelete(a.id)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientAppointments;

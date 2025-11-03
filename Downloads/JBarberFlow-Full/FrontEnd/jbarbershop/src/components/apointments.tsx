import React, { useCallback, useEffect, useState } from "react";
import api from "../services/api";

type Appointment = {
  id: number;
  clientName: string;
  date: string;
  service: string;
  ownerEmail?: string;
  barber?: string;
};

const Appointments: React.FC<{ token: string }> = ({ token }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [service, setService] = useState("");
  const [barber, setBarber] = useState("");
  const [editing, setEditing] = useState<Appointment | null>(null);

  const barbers = ["Marco", "Luis", "Pedro", "Diego", "Sergio"];

  const loadAppointments = useCallback(async () => {
    try {
      const data = await api.getAppointments(token);
      setAppointments(data);
    } catch (error) {
      console.error("Error al cargar citas:", error);
      alert("Error al cargar las citas");
    }
  }, [token]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.updateAppointment(editing.id, { clientName, date, service, barber }, token);
        setEditing(null);
      } else {
        await api.createAppointment({ clientName, date, service, barber }, token, "admin@barber.com");
      }
      setClientName("");
      setDate("");
      setService("");
      setBarber("");
      await loadAppointments();
    } catch (error) {
      console.error("Error al guardar la cita:", error);
      alert("Error al guardar la cita");
    }
  };

  const handleEdit = (appt: Appointment) => {
    setEditing(appt);
  setClientName(appt.clientName);
  setDate(appt.date);
  setService(appt.service);
  setBarber(appt.barber || "");
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar cita?")) {
      try {
        await api.deleteAppointment(id, token);
        await loadAppointments();
      } catch (error) {
        console.error("Error al eliminar la cita:", error);
        alert("Error al eliminar la cita");
      }
    }
  };

  return (
    <div className="appointments">
      <h2>Gestión de Citas (Admin)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
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
        <button type="submit">{editing ? "Actualizar" : "Agregar"}</button>
      </form>

      <ul>
        {appointments.map((a) => (
          <li key={a.id}>
            <b>{a.clientName}</b> — {a.date} — {a.service} {a.barber ? ` - Barbero: ${a.barber}` : null}
            <button onClick={() => handleEdit(a)}>Editar</button>
            <button onClick={() => handleDelete(a.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;

import React, { useEffect, useState } from 'react';
import api, { type MUser } from '../services/api';

const TestConnection: React.FC = () => {
  const [users, setUsers] = useState<MUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.getAllUsers();
        setUsers(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido de conexión. ¿API corriendo en http://localhost:5081?");
        }
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-4 border border-blue-400 bg-blue-50 m-4 rounded-lg shadow-md">
        <p className="text-blue-500 font-semibold">Cargando usuarios... Conectando al backend de C#...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4 rounded-md shadow-md">
        <p className="font-bold">🚨 ERROR DE CONEXIÓN</p>
        <p className="text-sm mt-1">{error}</p>
        <p className="text-xs mt-2">Verifica: API de C# corriendo en http://localhost:5081; Configuración CORS correcta.</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 m-4 rounded-md shadow-md">
        <p className="font-bold">Advertencia:</p>
        <p className="text-sm">Conexión exitosa, pero la tabla 'Usuarios' está vacía.</p>
      </div>
    );
  }
}

export default TestConnection;

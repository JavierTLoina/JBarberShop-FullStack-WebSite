const BASE = import.meta.env.VITE_API_URL || "http://localhost:5081/api";

// --- Tipos de Datos ---
export interface MUser {
  id_User: number;
  nombreUsuario: string;
  correo: string;
  tipoUsuario: string;
  isDeleted: boolean;
  passwordHash: string;
}

export interface MCitas {
  id_Citas: number;
  fechaHora: string;
  iD_User: number;
  iD_Estilista: number;
  iD_Servicio: number;
  estado: string;
}

// Interfaz para manejar la estructura de errores de validación de ASP.NET Core
export interface NetValidationErrors {
  errors: {
    [key: string]: string[];
  };
  title: string;
  status: number;
}

// ------------------------------------------------
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    credentials: 'include',
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  
  const text = await res.text();
  
  // Parse seguro usando unknown
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    let message = `Error HTTP ${res.status}: ${res.statusText} en ${url}`;
    
    // 1. Comprobación de mensaje simple ('message' in data)
    if (
      data && 
      typeof data === 'object' && 
      'message' in data && 
      typeof (data as { message?: string }).message === 'string'
    ) {
      message = (data as { message: string }).message; 
    } 
    // 2. Comprobación de errores de validación de .NET ('errors' in data)
    else if (
        data && 
        typeof data === 'object' && 
        'errors' in data && 
        typeof (data as NetValidationErrors).errors === 'object'
    ) {
      // Usamos la interfaz tipada para acceder a 'errors' y serializar
      message = JSON.stringify((data as NetValidationErrors).errors); 
    }
    
    throw new Error(message);
  }

  // Casteamos a tipo genérico T para cada endpoint
  return data as T;
}

const api = {
  async getAllUsers(): Promise<MUser[]> {
    return await request<MUser[]>("/MUsers", { method: "GET" });
  },

  async login(email: string, password: string): Promise<{ token: string; role: string; email: string }> {
    const body = { email, password };
    return await request<{ token: string; role: string; email: string }>("/Auth/Login", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  async getAppointments(token: string): Promise<MCitas[]> {
    return await request<MCitas[]>("/MCitas", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async createAppointment(data: Omit<MCitas, 'id_Citas'>, token: string) {
    return await request<MCitas>("/MCitas", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  },
};

export default api;
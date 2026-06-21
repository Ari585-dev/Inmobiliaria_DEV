export interface Inmueble {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: 'apartamento' | 'casa' | 'terreno';
  ciudad: string;
  created_at: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  nombre: string;
  email: string;
  password: string;
}

export interface InmueblePayload {
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: string;
  ciudad: string;
}

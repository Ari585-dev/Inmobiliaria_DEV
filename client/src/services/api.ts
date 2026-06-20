import type { Inmueble, InmueblePayload, LoginPayload, RegisterPayload } from '../types';

const BASE_URL = '/api';

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  const base: HeadersInit = { 'Content-Type': 'application/json' };
  return token ? { ...base, Authorization: `Bearer ${token}` } : base;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const body = await res.json();
      if (body.message) message = body.message;
      else if (body.error) message = body.error;
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function login(payload: LoginPayload): Promise<{ token: string }> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function register(payload: RegisterPayload): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function getInmuebles(): Promise<Inmueble[]> {
  const res = await fetch(`${BASE_URL}/inmuebles`);
  return handleResponse(res);
}

export async function getInmueble(id: number): Promise<Inmueble> {
  const res = await fetch(`${BASE_URL}/inmuebles/${id}`);
  return handleResponse(res);
}

export async function createInmueble(data: InmueblePayload): Promise<Inmueble> {
  const res = await fetch(`${BASE_URL}/inmuebles`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateInmueble(id: number, data: InmueblePayload): Promise<Inmueble> {
  const res = await fetch(`${BASE_URL}/inmuebles/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteInmueble(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/inmuebles/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res);
}

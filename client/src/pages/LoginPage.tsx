import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login({ email, password });
      loginWithToken(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesion');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = 'w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <main className="max-w-sm mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Iniciar sesion</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo electronico</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contrasena</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-2 rounded text-sm hover:bg-blue-800 disabled:opacity-50"
        >
          <FiLogIn size={16} />
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4 text-center">
        No tienes cuenta?{' '}
        <Link to="/register" className="text-blue-700 hover:underline">
          Registrate
        </Link>
      </p>
    </main>
  );
}

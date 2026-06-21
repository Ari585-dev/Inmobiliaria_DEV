import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHome, FiLayers, FiMapPin } from 'react-icons/fi';
import { getInmueble } from '../services/api';
import type { Inmueble } from '../types';

const tipoIcon: Record<string, React.ReactNode> = {
  casa: <FiHome size={18} />,
  apartamento: <FiLayers size={18} />,
  terreno: <FiMapPin size={18} />,
};

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [inmueble, setInmueble] = useState<Inmueble | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getInmueble(Number(id))
      .then(setInmueble)
      .catch(err => setError(err instanceof Error ? err.message : 'Error al cargar'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-600 hover:text-blue-700 mb-6 text-sm"
      >
        <FiArrowLeft size={16} />
        Volver
      </button>

      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {inmueble && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 text-blue-700 mb-3">
            {tipoIcon[inmueble.tipo] ?? <FiHome size={18} />}
            <span className="text-sm font-medium uppercase tracking-wide">{inmueble.tipo}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{inmueble.titulo}</h1>
          <p className="text-gray-500 mb-4">{inmueble.ciudad}</p>
          <p className="text-gray-700 mb-6 leading-relaxed">{inmueble.descripcion}</p>
          <div className="flex items-baseline gap-2 border-t border-gray-100 pt-4">
            <span className="text-3xl font-bold text-blue-700">
              ${Number(inmueble.precio).toLocaleString('es-CO')}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Publicado: {new Date(inmueble.created_at).toLocaleDateString('es-CO')}
          </p>
        </div>
      )}
    </main>
  );
}

import { useEffect, useState } from 'react';
import { FiList } from 'react-icons/fi';
import PropertyCard from '../components/PropertyCard';
import { getInmuebles } from '../services/api';
import type { Inmueble } from '../types';

export default function HomePage() {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getInmuebles()
      .then(setInmuebles)
      .catch(err => setError(err instanceof Error ? err.message : 'Error al cargar propiedades'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center gap-2 mb-6">
        <FiList size={22} className="text-blue-700" />
        <h1 className="text-2xl font-bold text-gray-900">Propiedades disponibles</h1>
      </div>

      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && inmuebles.length === 0 && (
        <p className="text-gray-500">No hay propiedades registradas.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {inmuebles.map(i => (
          <PropertyCard key={i.id} inmueble={i} />
        ))}
      </div>
    </main>
  );
}

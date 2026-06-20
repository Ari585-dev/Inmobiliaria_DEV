import { Link } from 'react-router-dom';
import { FiHome, FiLayers, FiMapPin } from 'react-icons/fi';
import type { Inmueble } from '../types';

const tipoIcon: Record<string, React.ReactNode> = {
  casa: <FiHome size={16} />,
  apartamento: <FiLayers size={16} />,
  terreno: <FiMapPin size={16} />,
};

export default function PropertyCard({ inmueble }: { inmueble: Inmueble }) {
  const icon = tipoIcon[inmueble.tipo] ?? <FiHome size={16} />;

  return (
    <Link
      to={`/inmuebles/${inmueble.id}`}
      className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 text-blue-700 mb-2">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{inmueble.tipo}</span>
      </div>
      <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">{inmueble.titulo}</h3>
      <p className="text-gray-500 text-sm mb-3">{inmueble.ciudad}</p>
      <p className="text-blue-700 font-bold text-lg">
        ${Number(inmueble.precio).toLocaleString('es-CO')}
      </p>
    </Link>
  );
}

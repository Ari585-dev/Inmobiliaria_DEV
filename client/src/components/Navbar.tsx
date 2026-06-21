import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiLogIn, FiLogOut, FiUserPlus, FiGrid } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-blue-700 font-semibold text-lg">
        <FiHome size={20} />
        Inmobiliaria
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-700 text-sm"
            >
              <FiGrid size={16} />
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-gray-600 hover:text-red-600 text-sm"
            >
              <FiLogOut size={16} />
              Salir
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-700 text-sm"
            >
              <FiLogIn size={16} />
              Iniciar sesion
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-1 bg-blue-700 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-800"
            >
              <FiUserPlus size={16} />
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

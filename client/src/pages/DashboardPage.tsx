import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import PropertyForm from '../components/PropertyForm';
import { getInmuebles, createInmueble, updateInmueble, deleteInmueble } from '../services/api';
import type { Inmueble, InmueblePayload } from '../types';

type Mode = 'list' | 'create' | 'edit';

export default function DashboardPage() {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<Mode>('list');
  const [selected, setSelected] = useState<Inmueble | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const data = await getInmuebles();
      setInmuebles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  async function handleCreate(data: InmueblePayload) {
    await createInmueble(data);
    setMode('list');
    await refresh();
  }

  async function handleUpdate(data: InmueblePayload) {
    if (!selected) return;
    await updateInmueble(selected.id, data);
    setMode('list');
    setSelected(null);
    await refresh();
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Eliminar esta propiedad?')) return;
    try {
      await deleteInmueble(id);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
    }
  }

  function startEdit(inmueble: Inmueble) {
    setSelected(inmueble);
    setMode('edit');
  }

  function cancel() {
    setMode('list');
    setSelected(null);
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mis propiedades</h1>
        {mode === 'list' && (
          <button
            onClick={() => setMode('create')}
            className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded text-sm hover:bg-blue-800"
          >
            <FiPlus size={16} />
            Nueva propiedad
          </button>
        )}
      </div>

      {mode === 'create' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Nueva propiedad</h2>
          <PropertyForm submitLabel="Crear propiedad" onSubmit={handleCreate} onCancel={cancel} />
        </div>
      )}

      {mode === 'edit' && selected && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Editar propiedad</h2>
          <PropertyForm
            initialValues={{
              titulo: selected.titulo,
              descripcion: selected.descripcion,
              precio: selected.precio,
              tipo: selected.tipo,
              ciudad: selected.ciudad,
            }}
            submitLabel="Guardar cambios"
            onSubmit={handleUpdate}
            onCancel={cancel}
          />
        </div>
      )}

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-500">Cargando...</p>}

      {!loading && inmuebles.length === 0 && mode === 'list' && (
        <p className="text-gray-500">No hay propiedades aun. Crea la primera.</p>
      )}

      {!loading && inmuebles.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600 font-medium">Titulo</th>
                <th className="text-left px-4 py-3 text-gray-600 font-medium">Tipo</th>
                <th className="text-left px-4 py-3 text-gray-600 font-medium">Ciudad</th>
                <th className="text-left px-4 py-3 text-gray-600 font-medium">Precio</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inmuebles.map(i => (
                <tr key={i.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900 font-medium">{i.titulo}</td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{i.tipo}</td>
                  <td className="px-4 py-3 text-gray-600">{i.ciudad}</td>
                  <td className="px-4 py-3 text-gray-900">${Number(i.precio).toLocaleString('es-CO')}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(i)}
                        className="text-gray-500 hover:text-blue-700 p-1"
                        title="Editar"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(i.id)}
                        className="text-gray-500 hover:text-red-600 p-1"
                        title="Eliminar"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

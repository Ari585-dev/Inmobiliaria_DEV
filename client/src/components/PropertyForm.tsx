import { useState } from 'react';
import type { InmueblePayload } from '../types';

interface Props {
  initialValues?: InmueblePayload;
  onSubmit: (data: InmueblePayload) => Promise<void>;
  submitLabel: string;
  onCancel?: () => void;
}

const empty: InmueblePayload = {
  titulo: '',
  descripcion: '',
  precio: 0,
  tipo: 'apartamento',
  ciudad: '',
};

export default function PropertyForm({ initialValues, onSubmit, submitLabel, onCancel }: Props) {
  const [form, setForm] = useState<InmueblePayload>(initialValues ?? empty);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'precio' ? Number(value) : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = 'w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Titulo</label>
        <input name="titulo" value={form.titulo} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Descripcion</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required rows={3} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Precio</label>
          <input name="precio" type="number" min={0} value={form.precio} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Tipo</label>
          <select name="tipo" value={form.tipo} onChange={handleChange} className={inputClass}>
            <option value="apartamento">Apartamento</option>
            <option value="casa">Casa</option>
            <option value="terreno">Terreno</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Ciudad</label>
        <input name="ciudad" value={form.ciudad} onChange={handleChange} required className={inputClass} />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white px-4 py-2 rounded text-sm hover:bg-blue-800 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

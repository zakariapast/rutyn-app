// pages/dashboard/index.tsx
import { useState } from 'react';

export default function Dashboard() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    interval: 'monthly',
    sellerUsername: 'warungketo', // Hardcoded for MVP
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Loading...');

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseInt(form.price),
      }),
    });

    if (res.ok) {
      setForm({ title: '', description: '', price: '', interval: 'monthly', sellerUsername: 'warungketo' });
      setStatus('✅ Produk berhasil dibuat!');
    } else {
      setStatus('❌ Gagal membuat produk.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk Langganan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Judul produk"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Deskripsi produk"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
        />
        <input
          name="price"
          type="number"
          placeholder="Harga (Rp)"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select name="interval" value={form.interval} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="monthly">Bulanan</option>
          <option value="weekly">Mingguan</option>
        </select>
        <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition">
          Simpan Produk
        </button>
      </form>
      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
}

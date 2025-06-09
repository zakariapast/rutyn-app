import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

interface Subscription {
  _id: string;
  productTitle: string;
  amount: number;
  paidAt: string;
}

export default function Dashboard() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    interval: 'monthly',
    sellerUsername: 'warungketo', // Hardcoded for now
  });

  const [status, setStatus] = useState('');
  const [subs, setSubs] = useState<Subscription[]>([]);

  useEffect(() => {
    async function fetchSubs() {
      const res = await fetch('/api/subscriptions');
      const data = await res.json();
      setSubs(data);
    }
    fetchSubs();
  }, []);

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

  // Summary logic
  const revenueByProduct = subs.reduce((acc, s) => {
    acc[s.productTitle] = (acc[s.productTitle] || 0) + s.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(revenueByProduct).map(([name, amount]) => ({ name, amount }));
  const totalRevenue = subs.reduce((sum, s) => sum + s.amount, 0);
  const totalCustomers = subs.length;

  return (
    <Layout>
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* 📊 Summary Section */}
      <section>
        <h1 className="text-3xl font-semibold mb-6" style={{ color: '#2A4D8E' }}>Ringkasan Langganan</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white shadow border rounded p-4">
            <p className="text-sm text-gray-500">Total Pelanggan</p>
            <p className="text-2xl font-bold text-deepBlue">{totalCustomers}</p>
          </div>
          <div className="bg-white shadow border rounded p-4">
            <p className="text-sm text-gray-500">Total Pendapatan</p>
            <p className="text-2xl font-bold text-green-600">Rp {totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Pendapatan per Produk</h2>
        <div className="bg-white border rounded shadow p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => `Rp ${v / 1000}k`} />
              <Tooltip formatter={(v: number) => `Rp ${v.toLocaleString()}`} />
              <Bar dataKey="amount" fill="#1ABC9C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 🛠️ Product Form Section */}
      <section className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Tambah Produk Langganan</h2>
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
          <select
            name="interval"
            value={form.interval}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="monthly">Bulanan</option>
            <option value="weekly">Mingguan</option>
          </select>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
          >
            Simpan Produk
          </button>
        </form>
        {status && <p className="mt-4 text-center">{status}</p>}
      </section>
    </div>
    </Layout>  
  );
}

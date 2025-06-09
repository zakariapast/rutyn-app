import { useEffect, useState } from 'react';

interface Subscription {
  _id: string;
  email: string;
  productId: string;
  productTitle: string;
  amount: number;
  paidAt: string;
  status: string;
}

export default function SubscribersPage() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchSubs() {
      const res = await fetch('/api/subscriptions');
      const data = await res.json();
      setSubs(data);
    }
    fetchSubs();
  }, []);

  const filtered = subs.filter((s) =>
    s.email.toLowerCase().includes(query.toLowerCase()) ||
    s.productTitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-deepBlue">Daftar Pelanggan</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Cari email atau produk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-teal-500 outline-none"
      />

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Produk</th>
              <th className="px-4 py-3 text-left">Jumlah</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Dibayar Pada</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filtered.map((s) => (
              <tr key={s._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">{s.productTitle}</td>
                <td className="px-4 py-3">Rp {s.amount.toLocaleString()}</td>
                <td className="px-4 py-3 font-medium text-green-600">{s.status}</td>
                <td className="px-4 py-3">{new Date(s.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-6">Tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}

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

  // 🔍 Filtered list
  const filtered = subs.filter((s) =>
    s.email.toLowerCase().includes(query.toLowerCase()) ||
    s.productTitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Pelanggan</h1>

      {/* 🔎 Search Input */}
      <input
        type="text"
        placeholder="Cari email atau produk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <div className="overflow-auto">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Produk</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.productTitle}</td>
                <td className="p-2">Rp {s.amount.toLocaleString()}</td>
                <td className="p-2">{s.status}</td>
                <td className="p-2">{new Date(s.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center mt-4 text-sm text-gray-500">Tidak ditemukan.</p>}
      </div>
    </div>
  );
}

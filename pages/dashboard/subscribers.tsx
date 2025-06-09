import { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import Layout from '@/components/Layout';

interface Subscription {
  _id: string;
  email: string;
  productId: string;
  productTitle: string;
  amount: number;
  paidAt: string;
  status: string;
}

type TimeFilter = 'all' | 'today' | 'this-week';

export default function SubscribersPage() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [query, setQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

  useEffect(() => {
    async function fetchSubs() {
      const res = await fetch('/api/subscriptions');
      const data = await res.json();
      setSubs(data);
    }
    fetchSubs();
  }, []);

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const filtered = subs.filter((s) => {
    const matchesSearch =
      s.email.toLowerCase().includes(query.toLowerCase()) ||
      s.productTitle.toLowerCase().includes(query.toLowerCase());

    const paidAtDate = new Date(s.paidAt);
    const matchesTime =
      timeFilter === 'all' ||
      (timeFilter === 'today' && paidAtDate >= startOfToday) ||
      (timeFilter === 'this-week' && paidAtDate >= startOfWeek);

    return matchesSearch && matchesTime;
  });

  const totalRevenue = filtered.reduce((sum, s) => sum + s.amount, 0);
  const totalCustomers = filtered.length;

  const downloadCSV = () => {
    const headers = ['Email', 'Produk', 'Amount', 'Status', 'Paid At'];
    const rows = filtered.map((s) => [
      s.email,
      s.productTitle,
      s.amount,
      s.status,
      new Date(s.paidAt).toLocaleString(),
    ]);
    const csvContent = [headers, ...rows].map((r) => r.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'subscribers.csv';
    link.click();
  };

  return (
    <Layout>
      <div className="space-y-10">
        <h1 className="text-3xl font-bold text-[#2A4D8E]">Daftar Pelanggan</h1>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-gray-500">Total Pelanggan</p>
            <p className="text-2xl font-bold">{totalCustomers}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-gray-500">Total Pendapatan</p>
            <p className="text-2xl font-bold text-green-600">Rp {totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
            <p className="text-sm text-gray-500">Ekspor CSV</p>
            <button
              onClick={downloadCSV}
              className="text-sm px-3 py-1 border border-teal-500 text-teal-600 rounded hover:bg-teal-50"
            >
              Download
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="text"
            placeholder="Cari email atau produk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">Semua Waktu</option>
            <option value="today">Hari Ini</option>
            <option value="this-week">Minggu Ini</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Produk</th>
                <th className="p-3 text-left">Jumlah</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Dibayar Pada</th>
                <th className="p-3 text-left">WhatsApp</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filtered.map((s) => {
                const isNew = new Date(s.paidAt) >= startOfToday;
                const msg = `Halo, terima kasih telah berlangganan ${s.productTitle} 🙏`;
                const waLink = `https://wa.me/?text=${encodeURIComponent(msg)}`;
                return (
                  <tr key={s._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{s.email}</td>
                    <td className="p-3">{s.productTitle}</td>
                    <td className="p-3">Rp {s.amount.toLocaleString()}</td>
                    <td className="p-3 font-medium text-green-600">{s.status}</td>
                    <td className="p-3">{new Date(s.paidAt).toLocaleString()}</td>
                    <td className="p-3 space-y-1">
                      <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline text-sm block">
                        Kirim Pesan
                      </a>
                      <button
                        onClick={() => navigator.clipboard.writeText(msg)}
                        className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                      >
                        <Copy size={14} /> Salin Pesan
                      </button>
                      {isNew && (
                        <span className="inline-block mt-1 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                          NEW
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-6">Tidak ditemukan.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

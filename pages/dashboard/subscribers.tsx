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
    const csvContent =
      [headers, ...rows]
        .map(row => row.join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'subscribers.csv';
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-deepBlue">Daftar Pelanggan</h1>

      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow border rounded p-4">
          <p className="text-sm text-gray-500">Total Pelanggan</p>
          <p className="text-2xl font-bold text-deepBlue">{totalCustomers}</p>
        </div>
        <div className="bg-white shadow border rounded p-4">
          <p className="text-sm text-gray-500">Total Pendapatan</p>
          <p className="text-2xl font-bold text-green-600">Rp {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white shadow border rounded p-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">Ekspor CSV</p>
          <button onClick={downloadCSV} className="text-sm px-3 py-1 border border-teal-500 text-teal-600 rounded hover:bg-teal-50">
            Download
          </button>
        </div>
      </div>

      {/* 🔎 Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari email atau produk..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
        />
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="all">Semua Waktu</option>
          <option value="today">Hari Ini</option>
          <option value="this-week">Minggu Ini</option>
        </select>
      </div>

      {/* 📋 Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Produk</th>
              <th className="px-4 py-3 text-left">Jumlah</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Dibayar Pada</th>
              <th className="px-4 py-3 text-left">WhatsApp</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filtered.map((s) => {
              const msg = encodeURIComponent(`Halo, terima kasih telah berlangganan ${s.productTitle} 🙏`);
              const waLink = `https://wa.me/?text=${msg}`;
              return (
                <tr key={s._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3">{s.productTitle}</td>
                  <td className="px-4 py-3">Rp {s.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 font-medium text-green-600">{s.status}</td>
                  <td className="px-4 py-3">{new Date(s.paidAt).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline text-sm"
                    >
                      Kirim Pesan
                    </a>
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
  );
}

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: input }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white shadow-lg p-6 rounded w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold text-[#2A4D8E] text-center">Masuk ke Rutyn</h1>
        <input
          type="text"
          placeholder="Email atau WhatsApp"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          className="w-full border rounded p-3 focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
        >
          {loading ? 'Memproses...' : 'Masuk / Daftar'}
        </button>
      </form>
    </div>
  );
}

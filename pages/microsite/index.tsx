// pages/microsite/index.tsx
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  interval: string;
}

export default function MicrositePage() {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState<Product[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products?seller=warungketo');
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('Halo, saya tertarik langganan WarungKeto dari Rutyn!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 🧑 Seller Hero */}
      <div className="bg-[#2A4D8E] text-white py-12 px-6 text-center">
        <h1 className="text-3xl font-bold mb-2">WarungKeto</h1>
        <p className="max-w-xl mx-auto text-sm text-white/80">
          Makanan sehat langganan langsung ke rumah. Pilih paket yang cocok dan bayar otomatis setiap minggu atau bulan.
        </p>
        <button
          onClick={handleCopy}
          className="mt-4 px-4 py-2 bg-white text-[#2A4D8E] rounded font-medium hover:bg-gray-100 transition inline-flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Tersalin!' : 'Tanya via WhatsApp'}
        </button>
      </div>

      {/* 🛒 Product Grid */}
      <section className="max-w-5xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#2A4D8E]">Paket Langganan</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <div key={product._id} className="border rounded shadow p-4 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-lg font-bold text-[#2A4D8E]">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                <span className="text-sm font-semibold text-teal-600">Rp {product.price.toLocaleString()} / {product.interval}</span>
              </div>
              <a
                href={`/subscribe/${product._id}`}
                className="mt-4 text-center bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
              >
                Langganan Sekarang
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

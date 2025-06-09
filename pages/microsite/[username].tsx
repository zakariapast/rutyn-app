import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import Image from 'next/image';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  interval: string;
}

export default function SellerMicrosite({ username }: { username: string }) {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState<Product[]>([]);
  const [copied, setCopied] = useState(false);

  // Placeholder logic for new user
  const isNewUser = true;

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`/api/products?seller=${username}`);
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, [username]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Halo, saya tertarik langganan ${username} dari Rutyn!`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
     <div className="relative w-full">
  <img
    src="/default-banner.jpg"
    alt="Banner"
    className="w-full h-64 md:h-80 object-cover"
  />
  <div className="absolute inset-0 bg-[#2A4D8E]/70 flex flex-col items-center justify-center text-white text-center px-4">
    <h1 className="text-3xl font-bold capitalize">{username}</h1>
    <p className="max-w-md text-white/90 text-sm mt-1">
      Makanan sehat langganan langsung ke rumah.
    </p>
    <button
      onClick={handleCopy}
      className="mt-4 px-4 py-2 bg-white text-[#2A4D8E] rounded font-medium hover:bg-gray-100 transition inline-flex items-center gap-2"
    >
      <Copy className="w-4 h-4" />
      {copied ? 'Tersalin!' : 'Tanya via WhatsApp'}
    </button>
  </div>
</div>


      {/* Products */}
      <section className="max-w-5xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#2A4D8E]">Paket Langganan</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <div key={product._id} className="border rounded shadow p-4 flex flex-col justify-between bg-white relative">
              {isNewUser && (
                <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  NEW
                </span>
              )}
              <div>
                <h3 className="text-lg font-bold text-[#2A4D8E]">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                <span className="text-sm font-semibold text-teal-600">
                  Rp {product.price.toLocaleString()} / {product.interval}
                </span>
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // Use fallback
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const username = params?.username as string;
  return {
    props: {
      username,
      ...(await serverSideTranslations(locale ?? 'id', ['common'])),
    },
  };
};

// pages/microsite/index.tsx
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function MicrositePage() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-xl font-bold mb-4">
        {t('productFrom', { seller: 'WarungKeto' })}
      </h1>
      {/* map product cards here */}
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

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  interval: 'monthly' | 'weekly';
}

export default function MicrositePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products?seller=warungketo'); // Hardcoded for now
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-xl font-bold mb-4">Langganan Paket dari WarungKeto</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

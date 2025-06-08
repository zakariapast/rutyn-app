// pages/checkout/[productId].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  interval: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { productId } = router.query;
  const { t } = useTranslation('common');

  const [product, setProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!productId) return;

    async function fetchProduct() {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    }

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !product) return;

    setSubmitting(true);
    const res = await fetch('/api/checkout/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        productId: product._id,
        title: product.title,
        price: product.price,
      }),
    });

    const { invoiceUrl } = await res.json();
    window.location.href = invoiceUrl;
  };

  if (loading || !product) return <p className="p-4">{t('loading')}</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <LanguageSwitcher />
      <h1 className="text-xl font-bold mb-2">{product.title}</h1>
      <p className="text-sm text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg font-semibold text-blue-600 mb-4">
        Rp {product.price.toLocaleString()} / {product.interval}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
        >
          {submitting ? t('loading') : t('payNow')}
        </button>
      </form>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

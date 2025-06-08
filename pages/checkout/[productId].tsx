import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading || !product) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-xl font-bold mb-2">{product.title}</h1>
      <p className="text-sm text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg font-semibold text-blue-600 mb-4">
        Rp {product.price.toLocaleString()} / {product.interval}
      </p>
      <button className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition">
        Bayar Sekarang
      </button>
    </div>
  );
}

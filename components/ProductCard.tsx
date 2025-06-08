// components/ProductCard.tsx
import Link from 'next/link';

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    interval: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <p className="font-bold text-blue-600 mb-4">
        Rp {product.price.toLocaleString()} / {product.interval}
      </p>
      <Link href={`/checkout/${product._id}`}>
        <button className="w-full py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">
          Langganan
        </button>
      </Link>
    </div>
  );
}

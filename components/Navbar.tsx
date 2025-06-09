import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => router.pathname === href;

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-[#2A4D8E]">rutyn</div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/dashboard"
            className={`hover:text-[#2A4D8E] transition ${
              isActive('/dashboard') ? 'text-[#2A4D8E] font-semibold' : 'text-gray-700'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/subscribers"
            className={`hover:text-[#2A4D8E] transition ${
              isActive('/dashboard/subscribers') ? 'text-[#2A4D8E] font-semibold' : 'text-gray-700'
            }`}
          >
            Pelanggan
          </Link>
          <button className="ml-4 text-gray-500 text-sm hover:underline">Logout</button>
          <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
            Z
          </div>
        </nav>

        {/* Mobile nav toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t text-sm font-medium space-y-2 px-4 pb-4">
          <Link
            href="/dashboard"
            className={`block pt-3 ${
              isActive('/dashboard') ? 'text-[#2A4D8E] font-semibold' : 'text-gray-700'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/subscribers"
            className={`block ${
              isActive('/dashboard/subscribers') ? 'text-[#2A4D8E] font-semibold' : 'text-gray-700'
            }`}
          >
            Pelanggan
          </Link>
          <button className="block text-gray-500 pt-1 hover:underline">Logout</button>
        </div>
      )}
    </header>
  );
}

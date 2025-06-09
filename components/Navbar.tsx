export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-[#2A4D8E]">rutyn</div>
        <nav className="space-x-4 text-sm font-medium">
          <a href="/dashboard" className="text-gray-700 hover:text-[#2A4D8E]">Dashboard</a>
          <a href="/dashboard/subscribers" className="text-gray-700 hover:text-[#2A4D8E]">Pelanggan</a>
        </nav>
      </div>
    </header>
  );
}

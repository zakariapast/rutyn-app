// components/Layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
<header className="bg-white border-b shadow-sm">
  <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
    <h1 className="text-2xl font-bold text-[#2A4D8E]">rutyn dashboard</h1>
    {/* Optional: add nav or logout here */}
  </div>
</header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

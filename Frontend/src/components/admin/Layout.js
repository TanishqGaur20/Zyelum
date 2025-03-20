import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen  mt-[70px]">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="space-y-4">
          <Link
            href="/admin/testimonials"
            className="block hover:text-rose-500"
          >
            Testimonials
          </Link>
          <Link href="/admin/pricing" className="block hover:text-rose-500">
            Pricing Plans
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default Layout;

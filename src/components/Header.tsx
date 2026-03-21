import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/85 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 flex justify-between items-center w-full px-6 py-4">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-primary"
        >
          MergiFi
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm tracking-tight">
        <Link
          href="/"
          className="text-slate-500 hover:text-primary-container transition-colors duration-200"
        >
          Guide
        </Link>
        <Link
          href="#"
          className="text-slate-500 hover:text-primary-container transition-colors duration-200"
        >
          Docs
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="px-5 py-2 linear-shift-primary text-white text-xs font-bold uppercase tracking-widest transition-transform active:scale-95"
        >
          Login Admin
        </Link>
      </div>
    </header>
  );
}

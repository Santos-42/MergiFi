import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white/85 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 flex justify-between items-center w-full px-6 py-4">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-bold tracking-tighter text-primary hover:opacity-80 transition-opacity"
        >
          <Image src="/logo.jpg" alt="MergiFi Logo" width={48} height={48} className="rounded-lg object-cover" />
          MergiFi
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm tracking-tight">

        <Link
          href="/public-ledger"
          className="text-slate-500 hover:text-primary hover:bg-primary/10 px-4 py-2 rounded-md transition-all duration-200 font-medium"
        >
          Public Ledger
        </Link>
      </nav>


    </header>
  );
}

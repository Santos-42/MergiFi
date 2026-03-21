import Link from "next/link";
import Footer from "@/components/Footer";

const LOG_DATA = [
  {
    time: "14:22:01",
    mr: "MR-9021",
    score: 98.2,
    scoreColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    status: "SETTLED",
    statusColor: "text-primary-light",
    statusIcon: "done_all",
    txHash: "0x7a2...f4e1",
  },
  {
    time: "14:21:45",
    mr: "MR-9020",
    score: 89.4,
    scoreColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    status: "SETTLED",
    statusColor: "text-primary-light",
    statusIcon: "done_all",
    txHash: "0x1bc...d9a2",
  },
  {
    time: "14:21:12",
    mr: "MR-9019",
    score: 82.1,
    scoreColor: "bg-[#b2ecfe] text-primary",
    status: "PENDING",
    statusColor: "text-primary-container",
    statusIcon: "sync",
    txHash: "0x9ef...a331",
  },
  {
    time: "14:20:58",
    mr: "MR-9018",
    score: 95.0,
    scoreColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    status: "SETTLED",
    statusColor: "text-primary-light",
    statusIcon: "done_all",
    txHash: "0x44d...e22c",
  },
  {
    time: "14:20:30",
    mr: "MR-9017",
    score: 76.4,
    scoreColor: "bg-error-container text-on-error-container",
    status: "REJECTED",
    statusColor: "text-error",
    statusIcon: "block",
    txHash: "N/A",
  },
];

export default function DashboardPage() {
  return (
    <>
      {/* TopAppBar */}
      <header className="bg-white/85 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 flex justify-between items-center w-full px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-primary"
        >
          MergiFi
        </Link>
        <nav className="hidden md:flex gap-8 text-sm tracking-tight">
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
          <button className="px-4 py-2 border border-primary text-primary hover:bg-slate-100 transition-colors duration-200 text-xs uppercase tracking-widest cursor-pointer">
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* SideNavBar */}
        <aside className="h-screen w-64 fixed left-0 top-0 pt-20 bg-surface flex flex-col border-r border-slate-100">
          <div className="px-6 py-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">
                  smart_toy
                </span>
              </div>
              <div>
                <div className="text-lg font-black text-primary leading-none">
                  MergiFi Admin
                </div>
                <div className="text-[10px] font-[var(--font-mono)] uppercase tracking-widest text-slate-400">
                  System Autonomous
                </div>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 bg-white text-primary border-l-4 border-primary uppercase text-xs tracking-widest hover:pl-2 transition-all duration-300"
            >
              <span className="material-symbols-outlined">analytics</span>
              MR Monitoring
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-100 uppercase text-xs tracking-widest hover:pl-2 transition-all duration-300 opacity-80 hover:opacity-100"
            >
              <span className="material-symbols-outlined">receipt_long</span>
              Transactions
            </a>
          </nav>
        </aside>

        {/* Main Content Canvas */}
        <main className="ml-64 flex-1 p-12 bg-surface">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-primary tracking-tighter mb-2">
              Operational Dashboard
            </h1>
            <p className="text-secondary max-w-xl">
              Real-time autonomous SDLC evaluation and bounty distribution log.
            </p>
          </div>

          {/* Bento Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-surface-container-low p-8 border-l-4 border-primary">
              <div className="text-xs font-[var(--font-mono)] uppercase tracking-widest text-secondary mb-4">
                Total MRs Evaluated
              </div>
              <div className="text-5xl font-bold text-primary tracking-tighter">
                12,842
              </div>
              <div className="mt-4 flex items-center text-primary-light gap-1">
                <span className="material-symbols-outlined text-sm">
                  trending_up
                </span>
                <span className="text-xs font-bold">+12% this week</span>
              </div>
            </div>

            <div className="bg-surface-container-low p-8 border-l-4 border-primary-container">
              <div className="text-xs font-[var(--font-mono)] uppercase tracking-widest text-secondary mb-4">
                Total Bounties Paid
              </div>
              <div className="text-5xl font-bold text-primary tracking-tighter">
                $482.5k
              </div>
              <div className="mt-4 text-xs font-[var(--font-mono)] text-secondary">
                CURRENCY: USDC / ETH
              </div>
            </div>

            <div className="bg-surface-container-low p-8 border-l-4 border-primary-light">
              <div className="text-xs font-[var(--font-mono)] uppercase tracking-widest text-secondary mb-4">
                AI Success Rate
              </div>
              <div className="text-5xl font-bold text-primary-light tracking-tighter">
                94.2%
              </div>
              <div className="mt-4 flex items-center text-primary-light gap-1">
                <span className="material-symbols-outlined text-sm">
                  check_circle
                </span>
                <span className="text-xs font-bold">
                  ABOVE THRESHOLD (&gt;80%)
                </span>
              </div>
            </div>
          </div>

          {/* Live Activity Log Section */}
          <div className="bg-surface-container-lowest">
            <div className="flex justify-between items-end mb-8 p-4 bg-surface-container-low">
              <h2 className="text-xl font-bold text-primary tracking-tight">
                Live Activity Logs
              </h2>
              <div className="flex gap-4">
                <span className="text-[10px] font-[var(--font-mono)] text-primary-light flex items-center gap-1">
                  <span className="w-2 h-2 bg-primary-light rounded-full animate-pulse-dot" />
                  SYSTEM LIVE
                </span>
                <span className="text-[10px] font-[var(--font-mono)] text-secondary">
                  REFRESH: 5S
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container text-secondary text-[10px] uppercase tracking-widest">
                    <th className="px-6 py-4 font-bold">Time (UTC)</th>
                    <th className="px-6 py-4 font-bold">MR ID</th>
                    <th className="px-6 py-4 font-bold">AI Score</th>
                    <th className="px-6 py-4 font-bold">Tx Status</th>
                    <th className="px-6 py-4 font-bold">TxHash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high font-[var(--font-mono)] text-xs">
                  {LOG_DATA.map((row) => (
                    <tr
                      key={row.mr}
                      className="hover:bg-surface-container-low transition-colors group"
                    >
                      <td className="px-6 py-5 text-secondary">{row.time}</td>
                      <td className="px-6 py-5 font-bold text-primary">
                        {row.mr}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-2 py-1 ${row.scoreColor}`}>
                          {row.score}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`${row.statusColor} flex items-center gap-1`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {row.statusIcon}
                          </span>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-slate-400 group-hover:text-primary transition-colors">
                        {row.txHash}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-8 mt-4 border-t border-surface-container-high flex justify-between items-center">
              <button className="px-6 py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-colors cursor-pointer">
                Download Full Report (.CSV)
              </button>
              <div className="flex gap-2">
                <button className="w-10 h-10 border border-surface-container-high flex items-center justify-center hover:bg-surface-container-low cursor-pointer">
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>
                <button className="w-10 h-10 border border-primary flex items-center justify-center bg-primary text-white">
                  <span className="text-xs font-bold">1</span>
                </button>
                <button className="w-10 h-10 border border-surface-container-high flex items-center justify-center hover:bg-surface-container-low cursor-pointer">
                  <span className="text-xs">2</span>
                </button>
                <button className="w-10 h-10 border border-surface-container-high flex items-center justify-center hover:bg-surface-container-low cursor-pointer">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

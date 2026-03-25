"use client";
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Transaction {
  id?: number;
  mr_id?: number;
  date?: string;
  created_at?: string;
  score: number;
  wallet: string;
  txHash?: string;
  tx_hash?: string;
  status: string;
}

export default function PublicLedger() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PAID' | 'REJECTED'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Function to fetch ledger data
    const fetchLedger = () => {
      fetch('/api/ledger')
        .then(res => res.json())
        .then(data => {
          // Only update state if data exists to avoid layout flicker
          if (data && !data.error) {
            setTransactions(data);
          }
          setLoading(false);
        })
        .catch(err => console.error("Failed to sync ledger data", err));
    };

    fetchLedger();
    const pollingInterval = setInterval(fetchLedger, 5000); 
    return () => clearInterval(pollingInterval);
  }, []);

  // Filter logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      if (filterStatus === 'ALL') return true;
      const status = (tx.status || "").toUpperCase();
      return status.includes(filterStatus);
    });
  }, [transactions, filterStatus]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalEvaluated = transactions.length;
  const disbursedCount = transactions.filter(tx => (tx.status || "").toUpperCase().includes("PAID")).length;
  const passRate = totalEvaluated > 0 ? Math.round((disbursedCount / totalEvaluated) * 100) : 0;

  const handleFilterChange = (status: 'ALL' | 'PAID' | 'REJECTED') => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 flex-1 w-full min-h-[70vh]">
        <div className="mb-16">
          <Link href="/" className="text-primary-light hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-8 w-fit group">
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_left_alt</span>
            Back to Home
          </Link>
          <h2 className="text-xs uppercase tracking-[0.4em] font-black text-outline mb-4">
            Transparency
          </h2>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10">
            <div>
              <h1 className="text-5xl font-bold text-primary tracking-tighter mb-4">
                Open Ledger
              </h1>
              <p className="text-lg text-secondary max-w-2xl leading-relaxed">
                Real-time transparency dashboard for MergiFi autonomous payouts. Every merged PR and AI evaluation is permanently recorded.
              </p>
            </div>

            <a href="https://gitlab.com/Santos-42/test-bounty-repo" target="_blank" rel="noopener noreferrer" className="bg-primary text-on-primary hover:bg-primary-light transition-colors px-6 py-3 rounded-full font-bold flex items-center gap-2 w-fit shrink-0">
              <span className="material-symbols-outlined text-xl">account_tree</span>
              Test Bounty Repo
            </a>
          </div>

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-low border border-outline-variant/20 p-6 flex flex-col items-center justify-center text-center">
                <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Total Evaluated MRs</span>
                <span className="text-4xl font-black text-primary">{totalEvaluated}</span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/20 p-6 flex flex-col items-center justify-center text-center">
                <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Disbursed Bounties</span>
                <span className="text-4xl font-black text-primary">{disbursedCount}</span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/20 p-6 flex flex-col items-center justify-center text-center">
                <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">AI Pass Rate</span>
                <span className="text-4xl font-black text-primary">{passRate}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-sm font-bold text-secondary uppercase tracking-widest">Filter By:</span>
          <button 
            onClick={() => handleFilterChange('ALL')}
            className={`px-4 py-2 text-xs font-bold transition-all ${filterStatus === 'ALL' ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high text-secondary'}`}
          >
            ALL DATA
          </button>
          <button 
            onClick={() => handleFilterChange('PAID')}
            className={`px-4 py-2 text-xs font-bold transition-all ${filterStatus === 'PAID' ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high text-secondary'}`}
          >
            PAID
          </button>
          <button 
            onClick={() => handleFilterChange('REJECTED')}
            className={`px-4 py-2 text-xs font-bold transition-all ${filterStatus === 'REJECTED' ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high text-secondary'}`}
          >
            REJECTED
          </button>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/20 p-1">
          <div className="bg-surface overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container text-secondary text-xs uppercase tracking-widest border-b border-outline-variant/20">
                  <th className="px-6 py-5 font-bold">MR ID</th>
                  <th className="px-6 py-5 font-bold">Date (UTC)</th>
                  <th className="px-6 py-5 font-bold">AI Score</th>
                  <th className="px-6 py-5 font-bold">Recipient Wallet</th>
                  <th className="px-6 py-5 font-bold">Transaction Hash</th>
                  <th className="px-6 py-5 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high font-[var(--font-mono)] text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-secondary animate-pulse text-lg uppercase tracking-widest font-black">
                      Syncing with Autonomous Agent...
                    </td>
                  </tr>
                ) : paginatedTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-secondary font-bold">
                      {filterStatus === 'ALL' ? 'No transactions recorded yet. Awaiting Merge Requests.' : `No ${filterStatus} records found.`}
                    </td>
                  </tr>
                ) : (
                  paginatedTransactions.map((tx, i) => {
                    const txId = tx.mr_id || tx.id;
                    const hash = tx.tx_hash || tx.txHash;
                    const isPaid = (tx.status || "").toUpperCase().includes("PAID");
                    return (
                      <tr key={i} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-6 py-5 font-bold text-primary">#{txId}</td>
                        <td className="px-6 py-5 text-secondary">{new Date(tx.created_at || tx.date || "").toLocaleString()}</td>
                        <td className="px-6 py-5">
                          <span className={`px-2 py-1 text-xs font-bold ${tx.score >= 80 ? 'bg-primary-container text-on-primary-container' : 'bg-error-container text-on-error-container'}`}>
                            {tx.score}/100
                          </span>
                        </td>
                        <td className="px-6 py-5 text-secondary font-[family-name:var(--font-mono)]">
                          {tx.wallet === "N/A" || !tx.wallet ? (
                            <span className="italic opacity-50">Invalid Wallet</span>
                          ) : (
                            `${tx.wallet.substring(0, 6)}...${tx.wallet.substring(tx.wallet.length - 4)}`
                          )}
                        </td>
                        <td className="px-6 py-5">
                          {hash && hash !== "N/A" ? (
                            <a href={`https://sepolia.basescan.org/tx/${hash}`} target="_blank" className="text-primary-light hover:text-primary transition-colors hover:underline decoration-primary-light/30 underline-offset-4 flex items-center gap-1">
                              <span className="truncate max-w-[120px]">{hash}</span>
                              <span className="material-symbols-outlined text-xs">open_in_new</span>
                            </a>
                          ) : (
                            <span className="text-secondary italic">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-5 font-black border-none uppercase tracking-tighter">
                          <span className={`flex items-center gap-1 ${isPaid ? 'text-primary-light' : 'text-error'}`}>
                            {isPaid && <span className="material-symbols-outlined text-sm">done_all</span>}
                            {!isPaid && <span className="material-symbols-outlined text-sm">block</span>}
                            {tx.status.replace(" ✅", "").toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-surface-container hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-all ${currentPage === num ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high text-secondary'}`}
                >
                  {num}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 bg-surface-container hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

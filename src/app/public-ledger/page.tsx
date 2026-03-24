"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Transaction {
  id?: number;
  mr_id?: number;
  date: string;
  score: number;
  wallet: string;
  txHash?: string;
  tx_hash?: string;
  status: string;
}

export default function PublicLedger() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk menarik data
    const fetchLedger = () => {
      fetch('/api/ledger')
        .then(res => res.json())
        .then(data => {
          // Hanya update state jika ada data, menghindari kedipan layar
          if (data && !data.error) {
            setTransactions(data);
          }
          setLoading(false);
        })
        .catch(err => console.error("Gagal sinkronisasi buku kas", err));
    };

    // Tarik data pertama kali saat halaman dimuat
    fetchLedger();

    // RAHASIA DEMO SEAMLESS: 
    // Tarik data secara senyap setiap 2 detik di latar belakang
    const pollingInterval = setInterval(fetchLedger, 2000);

    // Bersihkan interval jika komponen ditutup agar tidak bocor memori
    return () => clearInterval(pollingInterval);
  }, []);

  const totalEvaluated = transactions.length;
  const disbursedCount = transactions.filter(tx => tx.score >= 80).length;
  const passRate = totalEvaluated > 0 ? Math.round((disbursedCount / totalEvaluated) * 100) : 0;

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
          <h1 className="text-5xl font-bold text-primary tracking-tighter mb-4">
            Open Ledger
          </h1>
          <p className="text-lg text-secondary max-w-2xl leading-relaxed mb-8">
            Real-time transparency dashboard for MergiFi autonomous payouts. Every merged PR and AI evaluation is permanently recorded.
          </p>

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
                    <td colSpan={6} className="px-6 py-12 text-center text-secondary animate-pulse">
                      Syncing with Agent...
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-secondary">
                      No transactions recorded yet. Awaiting Merge Requests.
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx, i) => {
                    const txId = tx.mr_id || tx.id;
                    const hash = tx.tx_hash || tx.txHash;
                    return (
                      <tr key={i} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-6 py-5 font-bold text-primary">#{txId}</td>
                        <td className="px-6 py-5 text-secondary">{new Date(tx.date).toLocaleString()}</td>
                        <td className="px-6 py-5">
                          <span className={`px-2 py-1 text-xs font-bold ${tx.score >= 80 ? 'bg-primary-container text-on-primary-container' : 'bg-error-container text-on-error-container'}`}>
                            {tx.score}/100
                          </span>
                        </td>
                        <td className="px-6 py-5 text-secondary truncate max-w-[150px]">{tx.wallet}</td>
                        <td className="px-6 py-5">
                          {hash ? (
                            <a href={`https://sepolia.arbiscan.io/tx/${hash}`} target="_blank" className="text-primary-light hover:text-primary transition-colors hover:underline decoration-primary-light/30 underline-offset-4">
                              {hash.length > 50 ? `${hash.substring(0, 10)}...${hash.substring(60)}` : hash}
                            </a>
                          ) : (
                            <span className="text-secondary italic">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-5 text-primary-light font-bold border-none">
                          <span className="flex items-center gap-1">
                            {tx.status === "PAID ✅" && <span className="material-symbols-outlined text-sm">done_all</span>}
                            {tx.status.replace(" ✅", "")}
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
      </main>

      <Footer />
    </>
  );
}

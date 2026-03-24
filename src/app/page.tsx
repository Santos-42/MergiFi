import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto flex-1">
        {/* ─── Hero Section ─── */}
        <section className="relative px-6 pt-24 pb-32 overflow-hidden">
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-surface-container-low opacity-50" />

          <div className="flex flex-col gap-8 max-w-4xl">
            <div className="flex flex-col gap-2">
              <span className="text-tertiary font-bold tracking-[0.2em] text-xs uppercase">
                Autonomous SDLC Protocol
              </span>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-primary leading-[0.85]">
                MergiFi
              </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-start md:items-end">
              <p className="text-2xl font-medium text-secondary max-w-lg leading-tight">
                GitLab Web3 Bounty Agent. Precision-engineered rewards for every
                merged contribution.
              </p>
              <div className="flex flex-col gap-4">
                <div className="h-24 w-1 bg-primary" />
                <span className="text-[10px] text-outline leading-none uppercase tracking-tighter">
                  System Status
                  <br />
                  <span className="text-primary-light">Operational</span>
                </span>
              </div>
            </div>
          </div>

          {/* Hero Visual Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-outline-variant/20">
            <div className="md:col-span-8 h-96 bg-surface-container-high relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Abstract server architecture"
                className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3aYrytGLSR0r2jmtpxqzH45G3nnRRLNq2KQfLRItYfNeoHW68VypmJBneFXIlJ246HSUR5f30E1W1PtBo-6a5qCRsGEAge3DZ3qqamPRoj9em9NHdBpoMJ1gV5sXtXPQYYmYTLKEvkhsG7rOvtXfRFmNG4Qr_-me9DVorg-hwz6RaYpHpt87Hw1x6ebPrOFEuibz6rpsG5ARD_Hw7REBhb_tElF3aW50iNtdEkYsdeoJYr2FXhVYbGS2hASb9sRjqKLrDusyU8DE"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20">
                  <span className="text-white text-4xl font-black italic tracking-widest">
                    AGENT_01
                  </span>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 p-8 bg-primary text-on-primary flex flex-col justify-between min-h-[200px] hover:bg-primary-container transition-colors cursor-pointer group">
              <span className="text-4xl material-symbols-outlined">
                terminal
              </span>
              <div>
                <h3 className="text-xl font-bold mb-4">Start Contributing</h3>
                <p className="text-sm opacity-80 leading-relaxed font-[var(--font-mono)]">
                  Connect your GitLab account and start solving issues to earn
                  instant payouts in $USDC.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section className="px-6 py-24 bg-surface-container-low">
          <div className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.4em] font-black text-outline mb-4">
              The Protocol
            </h2>
            <div className="text-5xl font-bold text-primary tracking-tighter">
              How It Works
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Card 1 */}
            <div className="group flex flex-col gap-6 bg-surface p-8 ghost-border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <div className="flex justify-between items-start">
                <span className="text-5xl font-black text-surface-container-highest">
                  01
                </span>
                <span className="material-symbols-outlined text-primary text-3xl">
                  cloud_upload
                </span>
              </div>
              <div className="mt-auto">
                <h4 className="text-xl font-bold text-primary mb-2">
                  Submit MR
                </h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Open a Merge Request against an issue with an active bounty
                  label. MergiFi tracks every line changed.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group flex flex-col gap-6 bg-surface p-8 ghost-border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <div className="flex justify-between items-start">
                <span className="text-5xl font-black text-surface-container-highest">
                  02
                </span>
                <span className="material-symbols-outlined text-primary text-3xl">
                  psychology
                </span>
              </div>
              <div className="mt-auto">
                <h4 className="text-xl font-bold text-primary mb-2">
                  AI Evaluation
                </h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Our autonomous agent reviews code quality, security, and test
                  coverage using proprietary SDLC logic.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group flex flex-col gap-6 bg-surface p-8 ghost-border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              <div className="flex justify-between items-start">
                <span className="text-5xl font-black text-surface-container-highest">
                  03
                </span>
                <span className="material-symbols-outlined text-primary-light text-3xl">
                  account_balance_wallet
                </span>
              </div>
              <div className="mt-auto">
                <h4 className="text-xl font-bold text-primary mb-2">
                  Smart Payout
                </h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Upon approval, the smart contract triggers an immediate
                  on-chain payout to your linked wallet address.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Contributor Rules ─── */}
        <section className="px-6 py-32 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5 flex flex-col justify-center">
            <h2 className="text-xs uppercase tracking-[0.4em] font-black text-outline mb-6">
              Compliance
            </h2>
            <div className="text-4xl font-bold text-primary tracking-tighter mb-8 leading-none">
              Contributor Rules &amp; Ethics
            </div>
            <div className="space-y-4">
              <p className="text-sm text-secondary leading-relaxed">
                To maintain system integrity, all contributors must adhere to
                the MergiFi Structural Guidelines. Non-compliance results in
                automatic agent-level disqualification.
              </p>
              <div className="pt-8">
                <button className="border border-primary px-8 py-3 text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
                  Read Full Terms
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-surface-container-lowest p-1">
            <div className="bg-surface border-l-8 border-primary p-12 space-y-8">
              {[
                {
                  num: "/01",
                  title: "No Plagiarism",
                  desc: "Agent scans all repositories for direct logic duplication.",
                },
                {
                  num: "/02",
                  title: "Test Requirement",
                  desc: "MRs without 80%+ unit test coverage are automatically rejected.",
                },
                {
                  num: "/03",
                  title: "Atomic Commits",
                  desc: "Commit history must follow the Conventional Commits specification.",
                },
                {
                  num: "/04",
                  title: "Wallet Verification",
                  desc: "EVM or Solana wallet must be linked via GitLab profile bio.",
                },
              ].map((rule) => (
                <div key={rule.num} className="flex gap-6 items-start">
                  <span className="text-primary-light font-[var(--font-mono)] text-lg">
                    {rule.num}
                  </span>
                  <div>
                    <h5 className="text-sm font-black uppercase tracking-widest text-primary">
                      {rule.title}
                    </h5>
                    <p className="text-xs text-secondary mt-1 font-[var(--font-mono)] uppercase tracking-tighter">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Newsletter CTA ─── */}
        <section className="mx-6 mb-24 p-16 linear-shift-primary text-white flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black tracking-tighter mb-4 uppercase">
              Join the Autonomous Workforce
            </h2>
            <p className="opacity-70 text-sm leading-relaxed font-[var(--font-mono)]">
              Stay updated with the latest bounties and system upgrades. Enter
              your email to join our developer network.
            </p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              className="bg-white/10 border-none text-white placeholder:text-white/30 text-xs tracking-widest uppercase focus:ring-0 px-6 py-4 w-full md:w-64 outline-none"
              placeholder="DEveloper@Gitlab.com"
              type="email"
            />
            <button className="bg-primary-light text-white px-8 py-4 text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-tertiary hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-200">
              Subscribe
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

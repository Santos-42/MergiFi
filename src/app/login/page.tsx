import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  return (
    <>
      <Header />

      <main className="flex-grow flex items-center justify-center px-6 py-20">
        {/* Login Shell */}
        <div className="w-full max-w-md bg-surface-container-low p-12 relative overflow-hidden">
          {/* Architectural Accent */}
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />

          <div className="mb-12">
            <h1 className="text-3xl font-black tracking-tighter text-primary mb-2 uppercase">
              System Access
            </h1>
            <p className="text-xs tracking-widest text-secondary uppercase opacity-70">
              Autonomous Agent Gateway
            </p>
          </div>

          <form className="space-y-10">
            {/* Email Field */}
            <div className="group">
              <label
                className="block text-[10px] uppercase tracking-widest text-primary mb-3 font-bold"
                htmlFor="email"
              >
                Root Identifier
              </label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container border-none focus:ring-0 focus:bg-surface-container-lowest transition-all duration-300 py-4 px-4 text-sm font-[var(--font-mono)] placeholder:opacity-30 border-b-2 border-transparent focus:border-primary outline-none"
                  id="email"
                  placeholder="ADMIN_EMAIL"
                  type="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label
                className="block text-[10px] uppercase tracking-widest text-primary mb-3 font-bold"
                htmlFor="password"
              >
                Cipher Token
              </label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container border-none focus:ring-0 focus:bg-surface-container-lowest transition-all duration-300 py-4 px-4 text-sm font-[var(--font-mono)] placeholder:opacity-30 border-b-2 border-transparent focus:border-primary outline-none"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4">
              <button
                className="w-full linear-shift-primary text-on-primary py-5 px-6 font-bold uppercase tracking-widest text-xs flex items-center justify-between group transition-all duration-300 active:scale-[0.98] cursor-pointer"
                type="submit"
              >
                <span>Execute Authentication</span>
                <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">
                  terminal
                </span>
              </button>
            </div>

            {/* Security Note */}
            <div className="mt-8 flex items-start space-x-3 opacity-40">
              <span className="material-symbols-outlined text-xs mt-0.5">
                security
              </span>
              <p className="text-[9px] leading-relaxed uppercase tracking-tight">
                Encrypted session protocol active. Unauthorized access attempts
                are logged and reported to the MergiFi core monitoring system.
              </p>
            </div>
          </form>
        </div>

        {/* Asymmetric Background Element */}
        <div className="fixed bottom-0 right-0 p-12 pointer-events-none opacity-5 hidden lg:block">
          <span className="text-[20rem] font-black tracking-tighter leading-none select-none">
            MF
          </span>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function Footer() {
  return (
    <footer className="bg-surface w-full py-8 border-t border-slate-100 flex justify-between items-center px-8 text-[10px] tracking-tight">
      <div className="text-slate-400">
        © 2024 MergiFi. All rights reserved.
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary-light" />
          <span className="text-primary-light font-bold">
            System Status: Operational
          </span>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-slate-400 text-sm">
            hub
          </span>
          <span className="material-symbols-outlined text-slate-400 text-sm">
            account_tree
          </span>
        </div>
      </div>
    </footer>
  );
}

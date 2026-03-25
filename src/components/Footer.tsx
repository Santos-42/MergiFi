export default function Footer() {
  return (
    <footer className="bg-surface w-full py-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center px-8 text-[10px] tracking-tight gap-8 md:gap-4">
      <div className="text-slate-400 md:flex-1">
        © 2026 MergiFi. All rights reserved.
      </div>

      <div className="flex flex-col items-center gap-3 md:flex-1 text-center">
        <span className="text-sm font-bold text-secondary uppercase tracking-widest">&lt;source code&gt;</span>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Santos-42/MergiFi" target="_blank" rel="noopener noreferrer" className="p-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant/20 rounded-full transition-colors group" title="GitHub Source">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-primary group-hover:fill-primary-light transition-colors"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://gitlab.com/Santos-42/MergiFi" target="_blank" rel="noopener noreferrer" className="p-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant/20 rounded-full transition-colors group" title="GitLab Source">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-primary group-hover:fill-primary-light transition-colors"><path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.45H7.582L4.919 1.263c-.137-.423-.73-.423-.868 0L1.386 9.452.045 13.587c-.121.375.014.784.34 1.01l11.62 8.444 11.61-8.444c.325-.226.46-.635.34-1.01z"/></svg>
          </a>
        </div>
      </div>
      
      <div className="flex items-center gap-6 md:flex-1 justify-end">
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

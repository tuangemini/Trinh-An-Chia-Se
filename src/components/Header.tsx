import { Sun, Moon, PenTool, BookOpen, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  activeView: "home" | "write" | "detail";
  setActiveView: (view: "home" | "write" | "detail") => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({
  activeView,
  setActiveView,
  isDarkMode,
  toggleDarkMode
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Trang Chủ", icon: BookOpen },
    { id: "write", label: "Viết Bài Mới", icon: PenTool },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-900/80 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveView("home"); setIsMobileMenuOpen(false); }}
          className="flex cursor-pointer items-center space-x-2.5 group"
          id="brand-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-sm shadow-emerald-200/50 transition-transform duration-300 group-hover:scale-105">
            <span className="text-white text-md font-extrabold tracking-wider">
              TT
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-md font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
              Ông Chủ Tuấn <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">Tử Tế</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Chân Thành • Tử Tế • Bền Vững
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id || (item.id === "home" && activeView === "detail");
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as any)}
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                }`}
                id={`nav-${item.id}`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="mx-3 h-5 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors duration-200"
            aria-label="Toggle theme"
            id="theme-toggle"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-amber-500 animate-pulse" />
            ) : (
              <Moon className="h-5 w-5 text-emerald-600" />
            )}
          </button>
        </nav>

        {/* Mobile menu button & Theme toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            id="theme-toggle-mobile"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-emerald-600" />
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800"
            id="mobile-menu-btn"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-gray-900 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id || (item.id === "home" && activeView === "detail");
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-base font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

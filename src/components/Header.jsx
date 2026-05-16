import { useState } from 'react';
import Navbar from './Navbar';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const { t, toggle } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.home, link: '#home' },
    { label: t.nav.about, link: '#about' },
    { label: t.nav.work, link: '#work' },
    { label: t.nav.reviews, link: '#reviews' },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-900 to-zinc-900/0">
      <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center">

        <h1>
          <a href="/">
            <img src="/images/favicon.png" width={40} height={40} alt="Shalom Emmanuel" />
          </a>
        </h1>

        <Navbar />

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="text-xs font-bold text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-colors tracking-widest"
          >
            {t.langToggle}
          </button>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white px-5 py-2 rounded-xl text-sm transition-colors"
          >
            {t.nav.contactBtn}
          </a>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-zinc-300 transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-zinc-300 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-zinc-300 transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>

      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-zinc-900 border-t border-zinc-800 px-4 py-6 flex flex-col gap-4">
          {navItems.map(({ label, link }) => (
            <a
              key={link}
              href={link}
              onClick={closeMenu}
              className="text-zinc-300 hover:text-white text-lg py-2 border-b border-zinc-800 last:border-0 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-2 inline-flex justify-center items-center border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white px-5 py-3 rounded-xl text-sm transition-colors"
          >
            {t.nav.contactBtn}
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;

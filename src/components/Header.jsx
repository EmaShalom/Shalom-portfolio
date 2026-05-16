import Navbar from './Navbar';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const { t, toggle } = useLanguage();

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
        </div>

      </div>
    </header>
  );
};

export default Header;

import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.home, link: '#home' },
    { label: t.nav.about, link: '#about' },
    { label: t.nav.work, link: '#work' },
    { label: t.nav.reviews, link: '#reviews' },
  ];

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center bg-zinc-800 border border-zinc-700 rounded-full px-2 py-1.5 gap-1">
        {navItems.map(({ label, link }) => (
          <li key={link}>
            <a
              href={link}
              className="px-4 py-1.5 rounded-full text-sm text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

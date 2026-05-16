import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const sitemap = [
  { labelKey: 'home', href: '#home' },
  { labelKey: 'about', href: '#about' },
  { labelKey: 'work', href: '#work' },
  { labelKey: 'reviews', href: '#reviews' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/EmaShalom' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/emmanuel-shalom-208ab12b/' },
  { label: 'Instagram', href: 'https://www.instagram.com/molash.leunamme/' },
];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="section border-t border-zinc-800">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          <div>
            <h2 className="text-3xl font-bold text-zinc-100 leading-tight mb-6">{t.footer.cta}</h2>
            <Link
              to="/start-project"
              className="inline-flex items-center gap-1 bg-sky-400 hover:bg-sky-300 text-zinc-900 font-semibold px-5 py-2 rounded-xl text-sm transition-colors"
            >
              {t.footer.startProject}
              <span className="material-symbols-rounded text-base">chevron_right</span>
            </Link>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">{t.footer.sitemap}</p>
            <ul className="space-y-2.5">
              {sitemap.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <a href={href} className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm">
                    {t.nav[labelKey]}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm">
                  {t.nav.contactBtn}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">{t.footer.socials}</p>
            <ul className="space-y-2.5">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

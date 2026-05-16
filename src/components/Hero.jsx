import heroImg from '../assets/hero.png';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="pt-28 lg:pt-36 pb-16 lg:pb-24">
      <div className="max-w-screen-2xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">

        {/* Left */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 mb-6">
            <figure className="w-20 h-20 rounded-full overflow-hidden border-2 border-sky-400 flex-shrink-0">
              <img src={heroImg} alt="Shalom Emmanuel" className="w-full h-full object-cover object-top" />
            </figure>
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t.hero.badge}
            </div>
          </div>

          <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-9">
            {t.hero.line1}<br />
            {t.hero.line2}<br />
            {t.hero.line3}
          </h2>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-300 text-zinc-900 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              {t.hero.downloadCv}
              <span className="material-symbols-rounded text-lg">download</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white px-6 py-3 rounded-xl transition-colors"
            >
              {t.hero.scrollDown}
              <span className="material-symbols-rounded text-lg">arrow_downward</span>
            </a>
          </div>
        </div>

        {/* Right - hero image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <figure className="w-92 lg:w-116 rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-sky-700 to-sky-400">
            <img src={heroImg} alt="Shalom Emmanuel" className="w-full h-auto object-cover" />
          </figure>
        </div>

      </div>
    </section>
  );
};

export default Hero;

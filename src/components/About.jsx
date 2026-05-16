import { useLanguage } from '../context/LanguageContext';

const aboutItems = [
  { key: 'projectsDone', number: 10 },
  { key: 'yearsExp', number: 3 },
];

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 md:p-12">
          <p className="text-zinc-300 text-lg leading-relaxed mb-10 w-full max-w-none">
            {t.about.bio}
          </p>
          <div className="flex flex-wrap gap-10">
            {aboutItems.map(({ key, number }) => (
              <div key={key}>
                <p className="text-5xl font-bold text-sky-400 mb-1">{number}+</p>
                <p className="text-zinc-400 text-sm">{t.about[key]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

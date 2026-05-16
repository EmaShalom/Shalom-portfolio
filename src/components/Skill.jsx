import { useLanguage } from '../context/LanguageContext';

const skillItem = [
  { imgSrc: '/images/figma.png', label: 'Figma', desc: 'Design tool' },
  { imgSrc: '/images/css.png', label: 'CSS', desc: 'User Interface' },
  { imgSrc: '/images/javascript.png', label: 'JavaScript', desc: 'Interaction' },
  { imgSrc: '/images/nodejs.png', label: 'NodeJS', desc: 'Web Server' },
  { imgSrc: '/images/mongodb.png', label: 'MongoDB', desc: 'Database' },
  { imgSrc: '/images/react.png', label: 'React', desc: 'Framework' },
  { imgSrc: '/images/tailwind.png', label: 'Tailwind', desc: 'User Interface' },
  { imgSrc: '/images/django.png', label: 'Django', desc: 'Backend Framework' },
  { imgSrc: '/images/java.png', label: 'Java', desc: 'Programming Language' },
  { imgSrc: '/images/json.png', label: 'JSON', desc: 'Data Format' },
  { imgSrc: '/images/postgresql.png', label: 'PostgreSQL', desc: 'Relational Database' },
  { imgSrc: '/images/python.png', label: 'Python', desc: 'Programming Language' },
  { imgSrc: '/images/sql.png', label: 'SQL', desc: 'Database Query Language' },
  { imgSrc: '/images/machine learning.png', label: 'Machine Learning', desc: 'Artificial Intelligence' },
];

const SkillCard = ({ imgSrc, label, desc }) => (
  <div className="flex items-center gap-3 bg-zinc-800 border border-zinc-700 rounded-2xl p-4 hover:border-zinc-500 transition-colors">
    <figure className="w-10 h-10 flex-shrink-0">
      <img src={imgSrc} alt={label} width={40} height={40} className="object-contain" />
    </figure>
    <div>
      <p className="font-medium text-zinc-100">{label}</p>
      <p className="text-zinc-400 text-sm">{desc}</p>
    </div>
  </div>
);

const Skill = () => {
  const { t } = useLanguage();

  return (
    <section id="skill" className="section">
      <div className="max-w-screen-2xl mx-auto px-4">
        <h2 className="headline-2 mb-2">{t.skill.title}</h2>
        <p className="text-zinc-400 mb-8 max-w-lg">{t.skill.subtitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {skillItem.map((item) => (
            <SkillCard key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skill;

import { useLanguage } from '../context/LanguageContext';

const works = [
  {
    imgSrc: '/images/hoscor.png',
    title: 'HosCor - Hospital Coordination Platform',
    tags: ['Spring Boot', 'React', 'PostgreSQL', 'Healthcare'],
    projectLink: 'https://github.com/EmaShalom/HosCor',
  },
  {
    imgSrc: '/images/uqorequests.png',
    title: 'UQO Requests - Request Management System',
    tags: ['Django', 'React', 'PostgreSQL', 'Full Stack'],
    projectLink: 'https://github.com/UQO-INF1743-H26/inf1743-projet-groupe-01-12-1',
  },
  {
    imgSrc: '/images/house-price-prediction.png',
    title: 'House Price Prediction',
    tags: ['Python', 'Django', 'Machine Learning', 'React'],
    projectLink: 'https://github.com/EmaShalom/house_price_prediction-Science-de-donn-e',
  },
];

const WorkCard = ({ imgSrc, title, tags, projectLink }) => (
  <div className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden hover:border-zinc-500 transition-colors group">
    <figure className="aspect-video overflow-hidden">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </figure>
    <div className="p-5">
      <h3 className="font-semibold text-zinc-100 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-zinc-700 rounded-full text-xs text-zinc-300">
            {tag}
          </span>
        ))}
      </div>
      <a
        href={projectLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 bg-sky-400 hover:bg-sky-300 rounded-xl flex items-center justify-center text-zinc-900 transition-colors"
      >
        <span className="material-symbols-rounded text-lg">arrow_outward</span>
      </a>
    </div>
  </div>
);

const Work = () => {
  const { t } = useLanguage();

  return (
    <section id="work" className="section">
      <div className="max-w-screen-2xl mx-auto px-4">
        <h2 className="headline-2 mb-8">{t.work.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {works.map((work) => (
            <WorkCard key={work.title} {...work} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;

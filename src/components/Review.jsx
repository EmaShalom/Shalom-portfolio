import { useLanguage } from '../context/LanguageContext';

const reviews = [
  { content: 'Exceptional web development! Delivered a seamless, responsive site with clean code and great UX.', name: 'Durrice Léa', imgSrc: '/images/Durrice Tahoc.png', company: 'UQO Computer science eng student' },
  { content: 'Impressive work! Fast loading times, intuitive design, and flawless backend integration. Highly recommend.', name: 'Cedric Fodouop', imgSrc: '/images/Cedric Fodouop.png', company: 'Cloud Solutions Architect' },
  { content: 'Outstanding developer! Built a robust site with perfect functionality. Efficient and detail-oriented.', name: 'Estelle Marcella', imgSrc: '/images/estelle bouopda.png', company: 'Software Developer' },
  { content: 'Creative and skilled! Produced a modern, user-friendly site that exceeded expectations. Great communication.', name: 'Winston Moh', imgSrc: '/images/Winston moh.png', company: 'engineering Microsoft' },
  { content: 'Professional work! Delivered on time, with a polished design and smooth user experience. Top-notch developer.', name: 'Carles Steve', imgSrc: '/images/Carles Steve.png', company: 'Software Developer' },
  { content: 'Excellent project execution! High-quality code, responsive design, and exceptional problem-solving skills.', name: 'Jack Rayane', imgSrc: '/images/Jack Rayane.png', company: 'Backend developer' },
];

const ReviewCard = ({ content, name, imgSrc, company }) => (
  <div className="flex-shrink-0 w-[300px] md:w-[360px] bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
    <div className="text-yellow-400 text-lg mb-4 tracking-widest">★★★★★</div>
    <p className="text-zinc-300 text-sm leading-relaxed mb-6">{content}</p>
    <div className="flex items-center gap-3">
      <figure className="w-25 h-25 rounded-full overflow-hidden flex-shrink-0">
        <img src={imgSrc} alt={name} width={40} height={40} className="w-full h-full object-cover" />
      </figure>
      <div>
        <p className="font-medium text-zinc-100 text-sm">{name}</p>
        <p className="text-zinc-400 text-xs">{company}</p>
      </div>
    </div>
  </div>
);

const Review = () => {
  const { t } = useLanguage();

  return (
    <section id="reviews" className="section">
      <div className="max-w-screen-2xl mx-auto px-4">
        <h2 className="headline-2 mb-8">{t.review.title}</h2>
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
          {reviews.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;

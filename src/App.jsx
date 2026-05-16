import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skill from './components/Skill';
import Work from './components/Work';
import Review from './components/Review';
import Contact from './components/Contact';
import Footer from './components/footer';
import ProjectQuestionnaire from './pages/ProjectQuestionnaire';

const Portfolio = () => (
  <>
    <Header />
    <main>
      <article>
        <Hero />
        <About />
        <Skill />
        <Work />
        <Review />
        <Contact />
      </article>
    </main>
    <Footer />
  </>
);

const App = () => (
  <LanguageProvider>
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/start-project" element={<ProjectQuestionnaire />} />
    </Routes>
  </LanguageProvider>
);

export default App;

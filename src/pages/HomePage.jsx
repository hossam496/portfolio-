import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/sections/Hero.jsx';
import { About } from '../components/sections/About.jsx';
import { Skills } from '../components/sections/Skills.jsx';
import { Projects } from '../components/sections/Projects.jsx';
import { Contact } from '../components/sections/Contact.jsx';
import { Footer } from '../components/layout/Footer.jsx';

export function HomePage() {
  return (
    <div className="pf-page">
      <Helmet>
        <title>Hossam Albasuony | MERN Stack Developer</title>
        <meta
          name="description"
          content="Portfolio of Hossam Albasuony — MERN stack developer building React, Node, Express, and MongoDB applications."
        />
        <meta property="og:title" content="Hossam Albasuony | MERN Developer" />
        <meta
          property="og:description"
          content="Full-stack portfolio — projects, skills, and contact."
        />
        <meta property="og:type" content="website" />
        {import.meta.env.VITE_SITE_URL ? (
          <link rel="canonical" href={import.meta.env.VITE_SITE_URL} />
        ) : null}
      </Helmet>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

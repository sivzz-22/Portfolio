import { SpiderThemeProvider } from './context/SpiderThemeContext';
import CustomCursor from './components/CustomCursor';
import SpiderWebBackground from './components/SpiderWebBackground';
import WebShooter from './components/WebShooter';
import SpiderCrawlers from './components/SpiderCrawlers';
import SpideyTrackerHUD from './components/SpideyTrackerHUD';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionSlideSeparator from './components/SectionSlideSeparator';
import useScrollReveal from './hooks/useScrollReveal';
import './styles/spiderman-effects.css';
import './styles/section-slide.css';

export default function App() {
  useScrollReveal();

  return (
    <SpiderThemeProvider>
      <div className="portfolio-app-root">
        {/* Spider-Man Custom Cursor for Desktop */}
        <CustomCursor />

        {/* Interactive Web-Shooter System (Click-to-Shoot with THWIP burst) */}
        <WebShooter />

        {/* Animated Multi-Legged Spiders Running on Screen with Mouse Evasion */}
        <SpiderCrawlers />

        {/* Hanging Upside-Down Spidey Mascot & Retro CRT Tracker HUD Modal */}
        <SpideyTrackerHUD />

        {/* Ambient Spider Web Canvas Background */}
        <SpiderWebBackground />

        {/* Floating Navigation Header with 3D Red Spider Emblem */}
        <Navbar />

        {/* Single-Page Scrolling Portfolio Sections with Kinetic Sliding Transitions */}
        <main>
          <Hero />

          <SectionSlideSeparator number="01" label="ORIGIN & BIO" />
          <About />

          <SectionSlideSeparator number="02" label="ACADEMIC FOUNDATION" />
          <Education />

          <SectionSlideSeparator number="03" label="TECHNICAL ARSENAL" />
          <Skills />

          <SectionSlideSeparator number="04" label="FEATURED MISSIONS" />
          <Projects />

          <SectionSlideSeparator number="05" label="HONORS & CREDENTIALS" />
          <Achievements />

          <SectionSlideSeparator number="06" label="TRANSMIT MESSAGE" />
          <Contact />
        </main>

        {/* Minimal Footer */}
        <Footer />
      </div>
    </SpiderThemeProvider>
  );
}


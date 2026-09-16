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
import './styles/spiderman-effects.css';

export default function App() {
  return (
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

      {/* Single-Page Scrolling Portfolio Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}

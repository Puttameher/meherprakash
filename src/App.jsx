import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TechStackCarousel from './components/TechStackCarousel';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import CertificationsSection from './components/CertificationsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import GlowingPath from './components/GlowingPath';
import './index.css';

function StarField() {
  return (
    <div className="stars-container">
      {[...Array(23)].map((_, i) => {
        const size = Math.random() * 2 + 1; // 1px to 3px
        return (
          <div
            key={i}
            className="star"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              '--duration': `${Math.random() * 4 + 3}s`, // Increased from 2-5s to 3-7s for smoother twinkle
              '--delay': `${Math.random() * 5}s`,
              '--base-opacity': Math.random() * 0.3 + 0.1,
            }}
          />
        );
      })}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ background: 'var(--clay-bg)', minHeight: '100vh', position: 'relative' }}>
      <StarField />
      {/* Glowing scroll path */}
      <GlowingPath />

      {/* Navigation */}
      <Navbar />

      {/* Page Sections */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <TechStackCarousel />
        <AboutSection />
        <ProjectsSection />
        <CertificationsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </div>
  );
}

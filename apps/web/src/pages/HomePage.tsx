import ContactSection from "./home/ContactSection";
import ExperiencesSection from "./home/ExperiencesSection";
import HeroSection from "./home/HeroSection";
import ProjectsSection from "./home/ProjectsSection";
import SkillsSection from "./home/SkillsSection";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperiencesSection />
      <ContactSection />
    </main>
  );
};

export default HomePage;

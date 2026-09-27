import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import EducationPage from "./pages/EducationPage";
import ContactMessagesPage from "./pages/ContactMessagesPage";
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Auth */}
        <Route path="/auth" element={<LoginPage />} />

        {/* Main */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="contact/messages" element={<ContactMessagesPage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
};

export default App;

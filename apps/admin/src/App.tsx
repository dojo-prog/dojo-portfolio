import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import EducationPage from "./pages/EducationPage";
import ContactMessagesPage from "./pages/ContactMessagesPage";
import ScrollToTop from "./components/common/ScrollToTop";
import AddProjectPage from "./pages/AddProjectPage";
import { useCurrentUser } from "./features/auth/hooks/useCurrentUser";
import UpdateProjectPage from "./pages/UpdateProjectPage";
import NotFoundPage from "./components/feedback/NotFoundPage";

const App = () => {
  const { data: user, isPending } = useCurrentUser();

  if (isPending) return null;

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Auth */}
        <Route
          path="/auth"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />

        {/* Main */}
        <Route
          path="/"
          element={user ? <AdminLayout /> : <Navigate to={"/auth"} />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/add" element={<AddProjectPage />} />
          <Route
            path="projects/:projectId/edit"
            element={<UpdateProjectPage />}
          />

          <Route path="skills" element={<SkillsPage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="contact/messages" element={<ContactMessagesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;

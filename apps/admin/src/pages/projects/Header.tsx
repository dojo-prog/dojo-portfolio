import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-semibold">Projects Page</h1>
        <p className="text-xs mt-1">Organize & configure your projects</p>
      </div>

      <Button
        size={"lg"}
        className={"text-white px-4"}
        onClick={() => navigate("/projects/add")}
      >
        <Plus className="mr-1 size-5" />
        Add Project
      </Button>
    </header>
  );
};

export default Header;

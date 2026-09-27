import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-semibold">Skills Page</h1>
        <p className="text-xs mt-1">
          Manage the skills displayed on your portfolio
        </p>
      </div>

      <Button size={"lg"} className={"text-white px-4"}>
        <Plus className="mr-1 size-5" />
        Add Skill
      </Button>
    </header>
  );
};

export default Header;

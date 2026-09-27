import AddSkillButton from "@/features/skills/components/AddSkillButton";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-semibold">Skills Page</h1>
        <p className="text-xs mt-1">
          Manage the skills displayed on your portfolio
        </p>
      </div>

      <AddSkillButton />
    </header>
  );
};

export default Header;

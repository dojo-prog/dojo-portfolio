import AddExperienceButton from "@/features/experiences/components/AddExperienceButton";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-semibold">Experiences</h1>
        <p className="text-xs mt-1">
          Manage your professional experience and work history
        </p>
      </div>

      <AddExperienceButton />
    </header>
  );
};

export default Header;

import AddEducationButton from "@/features/education/components/AddEducationButton";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-semibold">Education</h1>
        <p className="text-xs mt-1">
          Manage your educational background and academic history.
        </p>
      </div>

      <AddEducationButton />
    </header>
  );
};

export default Header;

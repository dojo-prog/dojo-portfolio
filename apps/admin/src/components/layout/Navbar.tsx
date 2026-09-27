import { ToggleTheme } from "../common/ToggleTheme";

const Navbar = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
      <div>
        <p className="text-sm font-medium">Web Portfolio Manager</p>
      </div>

      <ToggleTheme />
    </header>
  );
};

export default Navbar;

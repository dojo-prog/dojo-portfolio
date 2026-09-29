import { ThemeToggler } from "@/components/common/ThemeToggler";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className="
          flex h-14 w-full max-w-4xl items-center
          rounded-full
          border border-border/60
          bg-surface/80
          px-2
          shadow-lg shadow-black/5
          backdrop-blur-xl
          supports-backdrop-filter:bg-surface/60
        "
      >
        {/* Logo */}
        <a
          href="#home"
          className="
            group flex h-10 items-center gap-1
            rounded-full px-4
            text-sm font-semibold
            text-foreground
            transition-all
            hover:bg-muted
          "
        >
          <span>DJ</span>
          <span className="text-primary transition-transform group-hover:translate-x-0.5">
            .
          </span>
        </a>

        {/* Navigation */}
        <div className="mx-auto hidden items-center rounded-full p-1 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="
                rounded-full px-4 py-1.5
                text-sm
                text-muted-foreground
                transition-all duration-200
                hover:text-primary
                hover:font-semibold
              "
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <ThemeToggler />

          <a
            href="#contact"
            className="
              hidden items-center gap-2
              rounded-full
              bg-primary
              px-4 py-2
              text-sm font-medium
              text-white
              shadow-sm
              transition-all duration-200
              hover:scale-[1.03]
              hover:shadow-md
              active:scale-[0.97]
              sm:flex
            "
          >
            <span>Let's talk</span>
            <span className="text-xs opacity-70">↗</span>
          </a>

          {/* Mobile menu */}
          <button
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              text-muted-foreground
              transition-colors
              hover:bg-muted
              hover:text-foreground
              sm:hidden
            "
            aria-label="Open navigation menu"
          >
            <span className="text-lg">☰</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

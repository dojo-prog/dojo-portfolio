import {
  ArrowUpRight,
  ExternalLink,
  GitCommitHorizontal,
  Mail,
} from "lucide-react";

const navLinks = [
  { title: "Projects", href: "#projects" },
  { title: "Skills", href: "#skills" },
  { title: "Contact", href: "#contact" },
];

const connLinks = [
  {
    title: "Github",
    Icon: GitCommitHorizontal,
    link: "https://github.com/dojo-prog",
  },
  {
    title: "LinkedIn",
    Icon: ExternalLink,
    link: "https://www.linkedin.com/in/donald-john-dumaluan-8a311839a/",
  },
  { title: "Email", Icon: Mail, link: "mailto:djdumaluan@gmail.com" },
];

const Footer = () => {
  return (
    <footer className="bg-primary/20 border-t">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 py-12 sm:flex-row sm:items-start sm:justify-between">
          {/* Identity */}
          <div className="max-w-sm">
            <a href="#" className="text-lg font-semibold tracking-tight">
              Dojo
            </a>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Software engineer focused on building reliable and thoughtful
              software.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:flex sm:gap-16">
            <div>
              <p className="text-sm font-medium">Navigation</p>

              <nav className="mt-4 flex flex-col gap-3">
                {navLinks.map((nl) => (
                  <a
                    key={nl.title}
                    href={nl.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {nl.title}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-sm font-medium">Connect</p>

              <nav className="mt-4 flex flex-col gap-3">
                {connLinks.map((cl) => (
                  <a
                    key={cl.title}
                    href={cl.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <cl.Icon className="size-3.5" />
                    {cl.title}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dojo. All rights reserved.</p>

          <a href="#" className="transition-colors hover:text-foreground">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

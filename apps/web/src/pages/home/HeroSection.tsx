import { useTheme } from "@/app/providers/ThemeProvider";
import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/BlurText";
import ProfileCard from "@/components/ProfileCard";
import TextType from "@/components/TextType";
import AuroraBackground from "@/components/common/AuroraBackground";

const HeroSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <section
        id="home"
        className="relative flex min-h-screen w-full items-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <AuroraBackground />
        </div>

        {/* Hero */}
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 z-10">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
            {/* Left — Hero Content */}
            <div className="max-w-2xl">
              <TextType
                text={[
                  "Software Engineer.",
                  "APIs. Databases. Systems.",
                  "From request to response.",
                  "Understanding software from the inside out.",
                ]}
                className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-primary"
              />

              <BlurText
                text="Building things for the web."
                delay={200}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
              />

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                I’m Donald, a software engineer focused on building reliable,
                scalable, and thoughtful web applications.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <AnimatedContent
                  distance={100}
                  direction="vertical"
                  reverse={false}
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.1}
                  delay={0.2}
                >
                  <a
                    href="#projects"
                    className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
                  >
                    View my work
                  </a>
                </AnimatedContent>

                <AnimatedContent
                  distance={100}
                  direction="vertical"
                  reverse={false}
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.1}
                  delay={0.5}
                >
                  <a
                    href="#contact"
                    className="rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-muted"
                  >
                    Contact me
                  </a>
                </AnimatedContent>
              </div>
            </div>

            {/* Right — Profile Card */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-95 h-fit">
                <AnimatedContent
                  distance={100}
                  direction="vertical"
                  reverse={false}
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  threshold={0.1}
                  delay={0}
                >
                  <ProfileCard
                    name=""
                    title=""
                    handle="javicodes"
                    status="Online"
                    avatarUrl="/images/profile-card.jpg"
                    showUserInfo={false}
                    enableTilt={true}
                    enableMobileTilt={false}
                    behindGlowColor="rgba(125, 190, 255, 0.67)"
                    iconUrl="/profile-pattern.svg"
                    behindGlowEnabled
                    behindGlowSize="80%"
                    innerGradient={
                      isDark
                        ? "linear-gradient(145deg, #1E3A8A99 0%, #2563EB55 100%)"
                        : "linear-gradient(145deg, #EFF6FFCC 0%, #DBEAFE66 100%)"
                    }
                  />
                </AnimatedContent>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;

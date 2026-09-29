import AnimatedContent from "@/components/AnimatedContent";
import EducationCard from "@/features/education/components/EducationCard";
import { useAllEducations } from "@/features/education/hooks/useAllEducations";

const EducationSection = () => {
  const { data: educations } = useAllEducations();

  return (
    <section id="education" className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Education
          </p>

          <h2 className="text-5xl font-bold tracking-tight sm:text-5xl">
            Where I studied.
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            The academic background and foundations that have shaped how I
            approach software development.
          </p>
        </div>

        {educations && educations.length > 0 && (
          <div className="space-y-5">
            {educations.map((education, index) => (
              <AnimatedContent
                key={education.id}
                distance={12}
                direction="vertical"
                duration={0.4}
                ease="power2.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.1}
                delay={index * 0.05}
              >
                <EducationCard key={education.id} education={education} />
              </AnimatedContent>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EducationSection;

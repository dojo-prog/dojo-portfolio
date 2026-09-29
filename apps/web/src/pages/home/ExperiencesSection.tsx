import ExperienceCard from "@/features/experiences/components/ExperienceCard";
import { useAllExperiences } from "@/features/experiences/hooks/useAllExperiences";

const ExperiencesSection = () => {
  const { data: experiences } = useAllExperiences();

  return (
    <section id="experience" className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Experience
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Where I've worked.
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            A look at the roles, projects, and experiences that have shaped how
            I approach building software.
          </p>
        </div>

        {/* Timeline */}
        {experiences && experiences.length > 0 && (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute bottom-0 left-1.75 top-0 w-px bg-border md:left-2.75" />

            <div className="space-y-10">
              {experiences.map((experience) => (
                <div key={experience.id} className="relative pl-8 md:pl-12">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-px top-6 z-20 size-5 rounded-full border-4 border-background ${
                      experience.current ? "bg-primary" : "bg-muted-foreground"
                    }`}
                  />

                  {/* Experience */}
                  <ExperienceCard experience={experience} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperiencesSection;

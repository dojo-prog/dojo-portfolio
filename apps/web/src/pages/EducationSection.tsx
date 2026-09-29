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
            {educations.map((education) => (
              <EducationCard key={education.id} education={education} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EducationSection;

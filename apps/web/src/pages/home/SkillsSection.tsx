import SkillCard from "@/features/skills/components/SkillCard";
import { useAllSkills } from "@/features/skills/hooks/useAllSkills";

const SkillsSection = () => {
  const { data: skills } = useAllSkills();

  return (
    <section
      id="skills"
      className="mx-auto min-h-screen w-full max-w-7xl px-6 py-24"
    >
      {/* Section Header */}
      <div className="mb-14 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Skills
        </p>

        <h2 className="text-4xl font-bold tracking-tight">What I work with.</h2>

        <p className="mt-4 leading-7 text-muted-foreground">
          The languages, frameworks, tools, and technologies I use to build
          software.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {skills?.length &&
          skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
      </div>
    </section>
  );
};

export default SkillsSection;

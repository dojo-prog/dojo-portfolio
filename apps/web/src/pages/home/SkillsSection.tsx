import SkillCard from "@/features/skills/components/SkillCard";
import { useAllSkills } from "@/features/skills/hooks/useAllSkills";

const SkillsSection = () => {
  const { data: skills } = useAllSkills();

  return (
    <section
      id="skills"
      className="mx-auto min-h-screen w-full max-w-7xl px-6 py-24"
    >
      <h2 className="mb-8 text-5xl font-bold ">Skills</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {skills?.length &&
          skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
      </div>
    </section>
  );
};

export default SkillsSection;

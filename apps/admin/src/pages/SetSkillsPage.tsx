import ButtonLoader from "@/components/common/ButtonLoader";
import { Button } from "@/components/ui/button";
import { useProject } from "@/features/projects/hooks/useProject";
import { useUpdateProjectSkills } from "@/features/projects/hooks/useUpdateProjectSkills";
import { useSkills } from "@/features/skills/hooks/useSkills";
import { Plus, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SetSkillsPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const {
    data: project,
    isPending: isProjectPending,
    isError: isProjectError,
  } = useProject(projectId ?? "");

  const { data: skills, isPending: isSkillsPending } = useSkills({});

  const { mutateAsync: setSkills, isPending: isSettingSkills } =
    useUpdateProjectSkills();

  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);

  useEffect(() => {
    if (project) {
      setSelectedSkillIds(project.project_skills.map((skill) => skill.id));
    }
  }, [project]);

  if (!projectId) {
    return null;
  }

  if (isProjectPending || isProjectError || !project) {
    return null;
  }

  if (isSkillsPending) {
    return null;
  }

  const currentSkills =
    skills?.filter((skill) => selectedSkillIds.includes(skill.id)) ?? [];

  const availableSkills =
    skills?.filter((skill) => !selectedSkillIds.includes(skill.id)) ?? [];

  const toggleSkill = (skillId: string) => {
    setSelectedSkillIds((current) => {
      if (current.includes(skillId)) {
        return current.filter((id) => id !== skillId);
      }

      return [...current, skillId];
    });
  };

  const handleSave = async () => {
    await setSkills({ projectId, body: { skillIds: selectedSkillIds } });

    navigate("/projects");
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Set Project Skills
            </h1>

            <p className="text-sm text-muted-foreground">
              Setup project's skills / technologies.
            </p>
          </div>
        </div>

        <Button size="lg" className="px-4 text-white" onClick={handleSave}>
          <ButtonLoader isLoading={isSettingSkills}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </ButtonLoader>
        </Button>
      </div>

      {/* Content */}
      <div className="grid flex-1 grid-cols-1 overflow-hidden md:grid-cols-2">
        {/* Current Skills */}
        <section className="overflow-y-auto border-b p-6 md:border-b-0 md:border-r">
          <div className="mb-5">
            <h2 className="font-semibold text-2xl">Current Skills</h2>

            <p className="text-xs text-muted-foreground">
              Skills currently assigned to this project.
            </p>
          </div>

          {currentSkills.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No skills selected.
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Add skills from the list on the right.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {currentSkills.map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => toggleSkill(skill.id)}
                  className="group inline-flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  {skill.name}

                  <X className="size-3.5 opacity-50 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Available Skills */}
        <section className="overflow-y-auto p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-2xl">Available Skills</h2>

            <p className="text-xs text-muted-foreground">
              Click a skill to add it to this project.
            </p>
          </div>

          {availableSkills.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm text-muted-foreground">
                All available skills have been selected.
              </p>
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {availableSkills.map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => toggleSkill(skill.id)}
                  className="flex items-center justify-between rounded-md border px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                >
                  <span>{skill.name}</span>

                  <Plus className="size-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SetSkillsPage;

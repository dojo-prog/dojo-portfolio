import { Badge } from "@/components/ui/badge";
import type { SkillEntity } from "@dojo-portfolio/shared";
import { useState } from "react";
import DeleteSkillDialog from "./DeleteSkillDialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

type Props = {
  skill: SkillEntity;
};

const SkillCard = ({ skill }: Props) => {
  const [deletingSkill, setDeletingSkill] = useState(false);

  return (
    <>
      <div
        key={skill.id}
        className="rounded-lg border bg-card p-5 shadow-sm hover:scale-102 duration-150 group"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium">{skill.name}</h3>

            <Badge variant="secondary" className="mt-2 capitalize">
              {skill.category}
            </Badge>
          </div>

          <Button
            variant={"destructive"}
            className={"hidden group-hover:block"}
            onClick={() => setDeletingSkill(true)}
          >
            <TrashIcon />
          </Button>
        </div>
      </div>

      {deletingSkill && (
        <DeleteSkillDialog
          skill={skill}
          open={deletingSkill}
          onOpenChange={(value) => setDeletingSkill(value)}
        />
      )}
    </>
  );
};

export default SkillCard;

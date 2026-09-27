import { Badge } from "@/components/ui/badge";
import type { SkillEntity } from "@dojo-portfolio/shared";

type Props = {
  skill: SkillEntity;
};

const SkillCard = ({ skill }: Props) => {
  return (
    <div
      key={skill.id}
      className="rounded-lg border bg-card p-5 shadow-sm hover:scale-102 duration-150"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium">{skill.name}</h3>

          <Badge variant="secondary" className="mt-2 capitalize">
            {skill.category}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;

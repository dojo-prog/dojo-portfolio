import SpotlightCard from "@/components/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import type { SkillEntity } from "@dojo-portfolio/shared";

type Props = {
  skill: SkillEntity;
};

const SkillCard = ({ skill }: Props) => {
  return (
    <SpotlightCard
      key={skill.id}
      className="bg-card rounded-lg border border-neutral p-5 shadow-sm hover:scale-102 duration-150 "
      spotlightColor="rgba(29, 78, 216, 1)"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium">{skill.name}</h3>

          <Badge variant="secondary" className="mt-2 capitalize">
            {skill.category}
          </Badge>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default SkillCard;

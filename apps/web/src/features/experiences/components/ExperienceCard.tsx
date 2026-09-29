import type { ExperienceEntity } from "@dojo-portfolio/shared";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";

type Props = {
  experience: ExperienceEntity;
};

const ExperienceCard = ({ experience }: Props) => {
  return (
    <article
      id="experiences"
      className="rounded-lg border bg-card p-6 hover:scale-101 transition-transform duration-150"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight">
              {experience.position}
            </h2>

            {experience.current && (
              <Badge variant="secondary" className="font-normal">
                Current
              </Badge>
            )}
          </div>

          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {experience.company}
          </p>
        </div>

        <p className="shrink-0 text-sm text-muted-foreground">
          {formatDate(experience.start_date)}
          {" — "}
          {experience.current || !experience.end_date
            ? "Present"
            : formatDate(experience.end_date)}
        </p>
      </div>

      <p className="mt-5 max-w-3xl text-sm leading-6 text-muted-foreground">
        {experience.description}
      </p>
    </article>
  );
};

export default ExperienceCard;

import type { EducationEntity } from "@dojo-portfolio/shared";
import { formatDate } from "@/utils/formatDate";

type Props = {
  education: EducationEntity;
};

const EducationCard = ({ education }: Props) => {
  return (
    <article className="border-b py-6 first:pt-0 last:border-b-0 hover:border-primary transition-colors duration-150 group">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors duration-150">
            {education.degree}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {education.field}
          </p>

          <p className="mt-3 text-sm font-medium">{education.institution}</p>
        </div>

        <p className="shrink-0 text-sm text-muted-foreground">
          {education.start_date ? formatDate(education.start_date) : "Unknown"}{" "}
          {education.end_date ? `— ${formatDate(education.end_date)}` : ""}
        </p>
      </div>

      {education.description && (
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
          {education.description}
        </p>
      )}
    </article>
  );
};

export default EducationCard;

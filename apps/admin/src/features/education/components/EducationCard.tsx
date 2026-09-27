import type { EducationEntity } from "@dojo-portfolio/shared";
import { formatDate } from "@/utils/formatDate";
import { GraduationCap } from "lucide-react";
import UpdateEducationButton from "./UpdateEducationButton";
import DeleteEducationButton from "./DeleteEducationButton";

type Props = {
  education: EducationEntity;
};

const EducationCard = ({ education }: Props) => {
  return (
    <article
      key={education.id}
      className="group relative overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Accent */}
      <div className="h-1 w-full bg-primary/70" />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-4">
            {/* Icon */}
            <div className="hidden size-11 shrink-0 items-center justify-center rounded-lg bg-muted sm:flex">
              <GraduationCap className="size-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold tracking-tight">
                {education.degree}
              </h2>

              <p className="mt-1 font-medium text-muted-foreground">
                {education.field}
              </p>

              <p className="mt-2 text-sm font-medium">
                {education.institution}
              </p>

              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground/70">
                {education.start_date
                  ? formatDate(education.start_date)
                  : "Unknown"}{" "}
                <span className="mx-1">—</span>{" "}
                {education.end_date
                  ? formatDate(education.end_date)
                  : "Present"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-x-2">
            <UpdateEducationButton education={education} />

            <DeleteEducationButton education={education} />
          </div>
        </div>

        {/* Description */}
        <div className="mt-5 rounded-lg bg-muted/40 p-4">
          <p className="text-sm leading-6 text-muted-foreground">
            {education.description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default EducationCard;

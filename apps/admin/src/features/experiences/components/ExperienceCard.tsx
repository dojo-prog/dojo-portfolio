import type { ExperienceEntity } from "@dojo-portfolio/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { BriefcaseBusiness, Trash2 } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import UpdateExperienceButton from "./UpdateExperienceButton";

type Props = {
  experience: ExperienceEntity;
};

const ExperienceCard = ({ experience }: Props) => {
  return (
    <article
      key={experience.id}
      className="group relative overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Top accent */}
      <div
        className={`h-1 w-full ${
          experience.current ? "bg-primary" : "bg-muted"
        }`}
      />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-4">
            {/* Icon */}
            <div className="hidden size-11 shrink-0 items-center justify-center rounded-lg bg-muted sm:flex">
              <BriefcaseBusiness className="size-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold tracking-tight">
                  {experience.position}
                </h2>

                {experience.current && (
                  <Badge variant="secondary" className="font-medium">
                    Current
                  </Badge>
                )}
              </div>

              <p className="mt-1 font-medium text-muted-foreground">
                {experience.company}
              </p>

              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                {formatDate(experience.start_date)}
                {" — "}
                {experience.current || !experience.end_date
                  ? "Present"
                  : formatDate(experience.end_date)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-x-2">
            <UpdateExperienceButton experience={experience} />

            <Button variant={"destructive"}>
              <Trash2 className=" size-4" />
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5 rounded-lg bg-muted/40 p-4">
          <p className="text-sm leading-6 text-muted-foreground">
            {experience.description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ExperienceCard;

import { Skeleton } from "@/components/ui/skeleton";

const EducationSkeletonCard = () => {
  return (
    <article className="border-b py-6 first:pt-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {/* Degree */}
          <Skeleton className="h-6 w-48" />

          {/* Field */}
          <Skeleton className="mt-2 h-4 w-36" />

          {/* Institution */}
          <Skeleton className="mt-3 h-4 w-56" />
        </div>

        {/* Date */}
        <Skeleton className="h-4 w-32 shrink-0" />
      </div>

      {/* Description */}
      <div className="mt-4 max-w-3xl space-y-2">
        <Skeleton className="h-24 w-full" />
      </div>
    </article>
  );
};

export default EducationSkeletonCard;

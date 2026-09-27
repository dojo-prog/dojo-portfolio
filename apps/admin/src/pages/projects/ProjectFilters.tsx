import SearchInput from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import type { ProjectQuery, ProjectStatus } from "@dojo-portfolio/shared";
import { cn } from "cn";
import { type Dispatch, type SetStateAction } from "react";

type Props = {
  filters: ProjectQuery;
  setFilters: Dispatch<SetStateAction<ProjectQuery>>;
};

const ProjectFilters = ({ filters, setFilters }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Search Input */}
      <div className="w-full md:w-100">
        <SearchInput
          value={filters.search as string}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              search: value,
              page: 1,
            }))
          }
          placeholder="Search project name..."
        />
      </div>

      {/* Featured Toggle */}
      <Button
        className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
          filters.featured
            ? "bg-primary text-white  hover:text-white"
            : "bg-background text-neutral border border-neutral"
        }`}
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            featured: prev.featured ? undefined : true,
            page: 1,
          }))
        }
      >
        Featured
      </Button>

      {/* Status Dropdown */}
      <select
        value={filters.status ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            status: (e.target.value || undefined) as ProjectStatus | undefined,
            page: 1,
          }))
        }
        className={cn(
          "rounded-md border bg-background px-3 py-2 text-sm",
          filters.status && "ring-2 ring-primary",
        )}
      >
        <option value="">All Statuses</option>
        <option value="planned">Planned</option>
        <option value="in_progress">In Progress</option>
        <option value="maintained">Maintained</option>
        <option value="completed">Completed</option>
        <option value="archived">Archived</option>
      </select>
    </div>
  );
};

export default ProjectFilters;

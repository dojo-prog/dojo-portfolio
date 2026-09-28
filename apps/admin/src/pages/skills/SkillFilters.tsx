import SearchInput from "@/components/common/SearchInput";
import {
  SkillCategorySchema,
  type SkillCategory,
  type SkillQuery,
} from "@dojo-portfolio/shared";
import { cn } from "cn";
import { type Dispatch, type SetStateAction } from "react";

type Props = {
  filters: SkillQuery;
  setFilters: Dispatch<SetStateAction<SkillQuery>>;
};

const SkillFilters = ({ filters, setFilters }: Props) => {
  const skillCategory = SkillCategorySchema.options;

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
          placeholder="Search skill name..."
        />
      </div>

      {/* Category Dropdown */}
      <select
        value={filters.category ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            category: (e.target.value || undefined) as
              | SkillCategory
              | undefined,
            page: 1,
          }))
        }
        className={cn(
          "rounded-md border bg-background px-3 py-2 text-sm",
          filters.category && "ring-2 ring-primary",
        )}
      >
        <option value="">All Categories</option>

        {skillCategory.map((sc) => (
          <option value={sc} className="capitalize">
            {sc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SkillFilters;

import SearchInput from "@/components/common/SearchInput";
import type { ExperienceQuery } from "@dojo-portfolio/shared";
import { type Dispatch, type SetStateAction } from "react";

type Props = {
  filters: ExperienceQuery;
  setFilters: Dispatch<SetStateAction<ExperienceQuery>>;
};

const ExperienceFilters = ({ filters, setFilters }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Search Input */}
      <div className="w-full md:w-100">
        <SearchInput
          value={filters.search as string}
          onChange={(value) =>
            setFilters((prev: Partial<ExperienceQuery>) => ({
              ...prev,
              search: value,
              page: 1,
            }))
          }
          placeholder="Search company name..."
        />
      </div>
    </div>
  );
};

export default ExperienceFilters;

import SearchInput from "@/components/common/SearchInput";
import type { EducationQuery } from "@dojo-portfolio/shared";
import { type Dispatch, type SetStateAction } from "react";

type Props = {
  filters: EducationQuery;
  setFilters: Dispatch<SetStateAction<EducationQuery>>;
};

const EducationFilters = ({ filters, setFilters }: Props) => {
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
          placeholder="Search instiution name..."
        />
      </div>
    </div>
  );
};

export default EducationFilters;

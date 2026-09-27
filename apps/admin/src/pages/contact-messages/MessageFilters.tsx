import SearchInput from "@/components/common/SearchInput";
import type { ContactMessageQuery } from "@dojo-portfolio/shared";
import { type Dispatch, type SetStateAction } from "react";

type Props = {
  filters: ContactMessageQuery;
  setFilters: Dispatch<SetStateAction<ContactMessageQuery>>;
};

const MessageFilters = ({ filters, setFilters }: Props) => {
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
          placeholder="Search sender name or email..."
        />
      </div>
    </div>
  );
};

export default MessageFilters;

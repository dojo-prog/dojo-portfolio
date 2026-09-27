import SearchInput from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
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

      {/* Unread Toggle */}
      <Button
        className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
          filters.unread
            ? "bg-primary text-white  hover:text-white"
            : "bg-background text-neutral border border-neutral"
        }`}
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            unread: !prev.unread,
            page: 1,
          }))
        }
      >
        Unread
      </Button>
    </div>
  );
};

export default MessageFilters;

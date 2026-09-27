import { FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

const Empty = ({
  title = "Nothing here yet",
  description = "There is nothing to display.",
  icon = <FolderOpen className="size-6 text-muted-foreground" />,
  actionLabel,
  onAction,
}: Props) => {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>

      <h3 className="text-2xl font-semibold">{title}</h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground italic">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="outline" className="mt-8" onClick={onAction}>
          <Plus className="size-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;

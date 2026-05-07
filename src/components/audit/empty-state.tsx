import { Plus, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  onAdd: () => void;
};

export function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center rounded-xl border border-border/50 bg-muted/30 p-8 text-center">
      <Inbox className="mb-4 size-12 text-zinc-500" />
      <h3 className="text-lg font-semibold text-zinc-50">No AI tools yet</h3>
      <p className="mt-2 max-w-sm text-sm text-zinc-400">
        Add your AI subscriptions to get started. We'll analyze your spend and
        find optimization opportunities.
      </p>
      <Button onClick={onAdd} className="mt-6" size="sm">
        <Plus className="mr-2 size-4" />
        Add first tool
      </Button>
    </div>
  );
}

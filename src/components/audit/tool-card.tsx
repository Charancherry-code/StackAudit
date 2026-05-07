import { Trash2, AlertCircle } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AIProviders, type AuditFormData } from "@/types/audit";

type ToolCardProps = {
  index: number;
  onRemove: () => void;
  isRemovable: boolean;
};

export function ToolCard({ index, onRemove, isRemovable }: ToolCardProps) {
  const { control, formState, register } = useFormContext<AuditFormData>();
  const errors = (formState.errors.tools as any)?.[index];

  return (
    <Card className="relative border-border/80 bg-card">
      <CardContent className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-sm font-semibold text-zinc-50">
            AI Tool #{index + 1}
          </h3>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            disabled={!isRemovable}
            aria-label={`Remove tool ${index + 1}`}
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Provider
            </label>
            <Controller
              name={`tools.${index}.provider`}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={errors?.provider ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {AIProviders.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors?.provider && (
              <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="size-3" />
                {errors.provider.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Plan / Tier
            </label>
            <Input
              {...register(`tools.${index}.plan`)}
              placeholder="e.g., Pro, Team, Enterprise"
              className={errors?.plan ? "border-destructive" : ""}
            />
            {errors?.plan && (
              <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="size-3" />
                {errors.plan.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Monthly Spend ($)
              </label>
              <Input
                {...register(`tools.${index}.monthlySpend`)}
                type="number"
                placeholder="0"
                min="0"
                step="0.01"
                className={errors?.monthlySpend ? "border-destructive" : ""}
              />
              {errors?.monthlySpend && (
                <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="size-3" />
                  {errors.monthlySpend.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Seats
              </label>
              <Input
                {...register(`tools.${index}.seats`)}
                type="number"
                placeholder="1"
                min="1"
                step="1"
                className={errors?.seats ? "border-destructive" : ""}
              />
              {errors?.seats && (
                <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="size-3" />
                  {errors.seats.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Use Case / Purpose
            </label>
            <Input
              {...register(`tools.${index}.useCase`)}
              placeholder="e.g., Code generation, Customer support, Data analysis"
              className={errors?.useCase ? "border-destructive" : ""}
            />
            {errors?.useCase && (
              <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="size-3" />
                {errors.useCase.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolCard } from "@/components/audit/tool-card";
import { EmptyState } from "@/components/audit/empty-state";
import { AuditSummary } from "@/components/audit/audit-summary";
import type { AuditFormData } from "@/types/audit";

export function AuditFormContent() {
  const { formState, register } = useFormContext<AuditFormData>();
  const { fields, append, remove } = useFieldArray<AuditFormData>({
    name: "tools",
  });

  const errors = formState.errors;
  const isMaxTools = fields.length >= 20;

  const handleAddTool = () => {
    append({
      id: crypto.randomUUID(),
      provider: undefined as any,
      plan: "",
      monthlySpend: 0,
      seats: 1,
      useCase: "",
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
      <div className="md:col-span-2 lg:col-span-3">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-50 mb-2">
              Company Name
            </label>
            <Input
              {...register("companyName")}
              placeholder="Acme Corp"
              className={errors.companyName ? "border-destructive" : ""}
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="size-4" />
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-50">
                Your AI Tools
              </h2>
              {fields.length > 0 && (
                <span className="text-xs text-zinc-400">
                  {fields.length}/20
                </span>
              )}
            </div>

            {fields.length === 0 ? (
              <EmptyState onAdd={handleAddTool} />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {fields.map((field, index) => (
                  <ToolCard
                    key={field.id}
                    index={index}
                    onRemove={() => remove(index)}
                    isRemovable={fields.length > 1}
                  />
                ))}
              </div>
            )}

            {errors.tools && typeof errors.tools.message === "string" && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3">
                <p className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="size-4" />
                  {errors.tools.message}
                </p>
              </div>
            )}

            <Button
              type="button"
              onClick={handleAddTool}
              disabled={isMaxTools}
              variant="outline"
              className="w-full md:w-auto"
            >
              <Plus className="mr-2 size-4" />
              Add tool
            </Button>
          </div>
        </form>
      </div>

      <div className="md:col-span-2 lg:col-span-1">
        <AuditSummary />
      </div>
    </div>
  );
}

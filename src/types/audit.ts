import { z } from "zod";

export const AIProviders = [
  "ChatGPT",
  "Claude",
  "Cursor",
  "GitHub Copilot",
  "Gemini",
  "OpenAI API",
  "Anthropic API",
  "Windsurf",
] as const;

export const ToolSchema = z.object({
  id: z.string(),
  provider: z.enum(AIProviders),
  plan: z.string().min(1, "Plan is required"),
  monthlySpend: z.number().min(0, "Monthly spend must be non-negative"),
  seats: z.number().int().min(1, "Seats must be at least 1"),
  useCase: z.string().min(10, "Use case must be at least 10 characters"),
});

export const AuditFormSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  tools: z
    .array(ToolSchema)
    .min(1, "Add at least one AI tool")
    .max(20, "Maximum 20 tools allowed"),
});

export type Tool = z.infer<typeof ToolSchema>;
export type AuditFormData = z.infer<typeof AuditFormSchema>;

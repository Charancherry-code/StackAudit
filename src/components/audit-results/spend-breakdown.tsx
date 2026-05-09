"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SpendBreakdownProps {
  breakdown: { provider: string; spend: number; percentage: number }[];
}

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#6366f1",
  "#f97316",
];

export function SpendBreakdown({ breakdown }: SpendBreakdownProps) {
  const data = breakdown.map((item) => ({
    name: item.provider,
    value: Math.round(item.spend),
  }));

  return (
    <Card className="border-border/30 bg-card">
      <CardHeader className="border-b border-border/30">
        <CardTitle className="text-sm font-semibold">Spend Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `$${value}/mo`}
              contentStyle={{
                backgroundColor: "rgb(24, 24, 27)",
                border: "1px solid rgb(82, 82, 91)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "rgb(228, 228, 231)" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-xs">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-6 space-y-2 border-t border-border/30 pt-4">
          {breakdown.map((item, idx) => (
            <div
              key={item.provider}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="text-sm text-zinc-400">{item.provider}</span>
              </div>
              <span className="text-sm font-medium text-zinc-50">
                {item.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

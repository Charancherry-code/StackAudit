"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/formatting";
import type { AuditResult } from "@/types/audit-results";

const COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
  "#06B6D4",
  "#EC4899",
  "#6366F1",
  "#F97316",
];

interface AuditPerformanceChartsProps {
  result: AuditResult;
}

export function AuditPerformanceCharts({
  result,
}: AuditPerformanceChartsProps) {
  const spendTrend = [
    {
      name: "Current",
      monthly: result.currentState.monthlySpend,
      annual: result.currentState.annualSpend,
    },
    {
      name: "Optimized",
      monthly: result.optimizedState.monthlySpend,
      annual: result.optimizedState.annualSpend,
    },
  ];

  const breakdown = result.currentState.breakdown.map((item) => ({
    name: item.provider,
    value: item.spend,
  }));

  const spendPerSeat = result.currentState.breakdown.map((item) => ({
    name: item.provider,
    value: item.spend / Math.max(result.currentState.totalSeats, 1),
  }));

  const benchmarkComparison = [
    {
      name: "Spend per dev",
      yourValue: result.currentState.costPerSeat,
      benchmarkValue: Math.max(
        result.currentState.costPerSeat * (1 - result.savings.percentage / 220),
        10,
      ),
    },
    {
      name: "Tool count",
      yourValue: result.currentState.toolCount,
      benchmarkValue: Math.max(
        2,
        Math.round(result.currentState.toolCount * 0.72),
      ),
    },
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card className="border-border/60 bg-card">
        <CardHeader className="border-b border-border/40">
          <CardTitle className="text-sm font-semibold">
            Current vs Optimized Spend
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div
            className="h-72 w-full"
            aria-label="Current versus optimized spend chart"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={spendTrend}
                margin={{ top: 12, right: 12, left: -8, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(82,82,91,0.35)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  stroke="#A1A1AA"
                />
                <YAxis
                  tickFormatter={(value) => `$${formatNumber(value)}`}
                  tickLine={false}
                  axisLine={false}
                  stroke="#A1A1AA"
                  width={56}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "rgb(17 17 20)",
                    border: "1px solid rgb(63 63 70)",
                    borderRadius: "12px",
                  }}
                  formatter={(value) => formatCurrency(Number(value) || 0)}
                />
                <Bar
                  dataKey="monthly"
                  radius={[8, 8, 0, 0]}
                  fill="#3B82F6"
                  name="Monthly"
                />
                <Bar
                  dataKey="annual"
                  radius={[8, 8, 0, 0]}
                  fill="#10B981"
                  name="Annual"
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card">
        <CardHeader className="border-b border-border/40">
          <CardTitle className="text-sm font-semibold">
            Spend Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="h-72 w-full" aria-label="Spend breakdown chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={66}
                  outerRadius={104}
                  paddingAngle={2}
                  stroke="none"
                >
                  {breakdown.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgb(17 17 20)",
                    border: "1px solid rgb(63 63 70)",
                    borderRadius: "12px",
                  }}
                  formatter={(value) => formatCurrency(Number(value) || 0)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {breakdown.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/50 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-zinc-300">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-zinc-50">
                  {formatCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card">
        <CardHeader className="border-b border-border/40">
          <CardTitle className="text-sm font-semibold">
            Spend per Seat Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div
            className="h-72 w-full"
            aria-label="Spend per seat comparison chart"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={spendPerSeat}
                margin={{ top: 12, right: 12, left: -8, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(82,82,91,0.35)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  stroke="#A1A1AA"
                  interval={0}
                  angle={-10}
                  height={50}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#A1A1AA"
                  width={56}
                  tickFormatter={(value) => `$${Math.round(value)}`}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgb(17 17 20)",
                    border: "1px solid rgb(63 63 70)",
                    borderRadius: "12px",
                  }}
                  formatter={(value) => formatCurrency(Number(value) || 0)}
                />
                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  fill="#8B5CF6"
                  name="$/seat"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card">
        <CardHeader className="border-b border-border/40">
          <CardTitle className="text-sm font-semibold">
            Benchmark Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="h-72 w-full" aria-label="Benchmark comparison chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={benchmarkComparison}
                margin={{ top: 12, right: 12, left: -8, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(82,82,91,0.35)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  stroke="#A1A1AA"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#A1A1AA"
                  width={56}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgb(17 17 20)",
                    border: "1px solid rgb(63 63 70)",
                    borderRadius: "12px",
                  }}
                  formatter={(value) => formatCurrency(Number(value) || 0)}
                />
                <Line
                  type="monotone"
                  dataKey="yourValue"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  name="Your team"
                />
                <Line
                  type="monotone"
                  dataKey="benchmarkValue"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  name="Benchmark"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

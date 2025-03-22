"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface SecurityScoreGaugeProps {
  score: number
}

export function SecurityScoreGauge({ score }: SecurityScoreGaugeProps) {
  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ]

  const COLORS = ["#8A2CE2", "#2D1B69"]

  return (
    <div className="relative h-[200px] w-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl font-bold text-purple-500">{score}%</span>
          <p className="text-sm text-muted-foreground">Security Score</p>
        </div>
      </div>
    </div>
  )
}


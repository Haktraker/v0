"use client"

import { Progress } from "@/components/ui/progress"

interface CompromisedEmployee {
  email: string
  score: number
}

interface CompromisedEmployeesProps {
  employees: CompromisedEmployee[]
}

export function CompromisedEmployees({ employees }: CompromisedEmployeesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Most Compromised Employees</h3>
      <div className="space-y-3">
        {employees.map((employee, index) => (
          <div key={employee.email} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{employee.email}</span>
              <span className="font-medium text-purple-500">{employee.score}</span>
            </div>
            <Progress
              value={employee.score}
              max={300}
              className="h-2 bg-purple-100 dark:bg-purple-900/20"
              indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-600"
            />
          </div>
        ))}
      </div>
    </div>
  )
}


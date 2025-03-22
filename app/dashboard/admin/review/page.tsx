"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

const dataTypes = [
  { value: "security-posture", label: "Security Posture" },
  { value: "threat-detections", label: "Threat Detections" },
  { value: "social-mentions", label: "Social Mentions" },
  { value: "vulnerabilities", label: "Vulnerabilities" },
  { value: "assets", label: "Assets" },
  { value: "threat-intelligence", label: "Threat Intelligence" },
  { value: "dark-web-mentions", label: "Dark Web Mentions" },
  { value: "account-takeover", label: "Account Takeover" },
  { value: "attack-surface", label: "Attack Surface" },
  { value: "brand-reputation", label: "Brand Reputation" },
]

export default function DataReviewPage() {
  const [selectedType, setSelectedType] = useState<string>("")
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const fetchData = async (type: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/${type}`)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const result = await response.json()
      setData(Array.isArray(result) ? result : [result])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      })
      setData([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
    fetchData(value)
  }

  const renderTableHeaders = () => {
    if (data.length === 0) return null
    const headers = Object.keys(data[0])
    return (
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header} className="capitalize">
              {header.replace(/([A-Z])/g, " $1").trim()}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
    )
  }

  const renderTableRows = () => {
    if (data.length === 0) return null
    return (
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {Object.entries(row).map(([key, value]) => (
              <TableCell key={key}>
                {typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Data Review</CardTitle>
          <CardDescription>
            Review and verify data for different sections of the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Data Type</label>
              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  {dataTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              selectedType && (
                <div className="rounded-md border">
                  <Table>
                    {renderTableHeaders()}
                    {renderTableRows()}
                  </Table>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
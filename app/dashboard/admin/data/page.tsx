"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export default function DataManagementPage() {
  const [selectedType, setSelectedType] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedType || !file) {
      toast({
        title: "Error",
        description: "Please select a data type and upload a file",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(`/api/${selectedType}/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      toast({
        title: "Success",
        description: "Data uploaded successfully",
      })

      setFile(null)
      setSelectedType("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Upload and manage data for different sections of the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Data Type</label>
              <Select
                value={selectedType}
                onValueChange={setSelectedType}
              >
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Data File</label>
              <Input
                type="file"
                accept=".json,.csv"
                onChange={handleFileChange}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Accepted formats: JSON, CSV
              </p>
            </div>

            <Button type="submit" disabled={isLoading || !selectedType || !file}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload Data
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 
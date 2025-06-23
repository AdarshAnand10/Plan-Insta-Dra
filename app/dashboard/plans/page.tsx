"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  FileText,
  Search,
  MoreVertical,
  Edit,
  Copy,
  FolderOpen,
  Trash2,
  Calendar,
  Plus,
  Grid3X3,
  List,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockPlans = [
  {
    id: 1,
    name: "Tech Startup Business Plan",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
    status: "Draft",
    folder: null,
  },
  {
    id: 2,
    name: "Restaurant Expansion Plan",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-14",
    status: "Complete",
    folder: "Business Ideas",
  },
  {
    id: 3,
    name: "E-commerce Platform Plan",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-11",
    status: "In Progress",
    folder: null,
  },
  {
    id: 4,
    name: "SaaS Product Launch Plan",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-09",
    status: "Complete",
    folder: "Tech Projects",
  },
]

export default function PlansPage() {
  const [plans, setPlans] = useState(mockPlans)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [planToDelete, setPlanToDelete] = useState<number | null>(null)
  const { toast } = useToast()

  const filteredPlans = plans.filter((plan) => plan.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleDeletePlan = (planId: number) => {
    setPlanToDelete(planId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (planToDelete) {
      setPlans(plans.filter((plan) => plan.id !== planToDelete))
      toast({
        title: "Plan moved to trash",
        description: "The plan has been moved to trash and can be restored later.",
      })
    }
    setDeleteDialogOpen(false)
    setPlanToDelete(null)
  }

  const handleDuplicatePlan = (planId: number) => {
    const planToDuplicate = plans.find((plan) => plan.id === planId)
    if (planToDuplicate) {
      const newPlan = {
        ...planToDuplicate,
        id: Math.max(...plans.map((p) => p.id)) + 1,
        name: `${planToDuplicate.name} (Copy)`,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        status: "Draft" as const,
      }
      setPlans([newPlan, ...plans])
      toast({
        title: "Plan duplicated",
        description: "A copy of the plan has been created.",
      })
    }
  }

  return (
    <DashboardLayout currentPage="plans">
      <div className="space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Plans</h2>
            <p className="text-gray-600">Manage and organize your business plans</p>
          </div>
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105">
            <Plus className="h-5 w-5 mr-2" />
            Create New Plan
          </Button>
        </div>

        {/* Search and View Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-2xl bg-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-xl"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-xl"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Plans Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan, index) => (
              <Card
                key={plan.id}
                className="border-0 shadow-lg rounded-3xl hover-lift animate-fade-in-up bg-white"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl">
                        <DropdownMenuItem className="rounded-xl">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicatePlan(plan.id)} className="rounded-xl">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl">
                          <FolderOpen className="h-4 w-4 mr-2" />
                          Move to Folder
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeletePlan(plan.id)} className="text-red-600 rounded-xl">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{plan.name}</h3>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Created {plan.createdAt}
                    </div>
                    {plan.folder && (
                      <div className="flex items-center">
                        <FolderOpen className="h-4 w-4 mr-2" />
                        {plan.folder}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        plan.status === "Complete"
                          ? "bg-green-100 text-green-800"
                          : plan.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {plan.status}
                    </span>
                    <Button size="sm" className="rounded-xl">
                      Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg rounded-3xl">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {filteredPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Created {plan.createdAt}</span>
                          {plan.folder && <span>• {plan.folder}</span>}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              plan.status === "Complete"
                                ? "bg-green-100 text-green-800"
                                : plan.status === "In Progress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {plan.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="rounded-xl">
                        Open
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl">
                          <DropdownMenuItem className="rounded-xl">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicatePlan(plan.id)} className="rounded-xl">
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl">
                            <FolderOpen className="h-4 w-4 mr-2" />
                            Move to Folder
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeletePlan(plan.id)}
                            className="text-red-600 rounded-xl"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>Delete Plan</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this plan? It will be moved to trash and can be restored later.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="rounded-2xl">
                Cancel
              </Button>
              <Button onClick={confirmDelete} variant="destructive" className="rounded-2xl">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

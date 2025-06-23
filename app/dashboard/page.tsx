"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, Clock, TrendingUp } from "lucide-react"

const recentPlans = [
  {
    id: 1,
    name: "Tech Startup Business Plan",
    createdAt: "2024-01-15",
    status: "Draft",
  },
  {
    id: 2,
    name: "Restaurant Expansion Plan",
    createdAt: "2024-01-12",
    status: "Complete",
  },
  {
    id: 3,
    name: "E-commerce Platform Plan",
    createdAt: "2024-01-10",
    status: "In Progress",
  },
]

const stats = [
  {
    title: "Plans Created",
    value: "12",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Remaining Credits",
    value: "8",
    icon: TrendingUp,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Last Login",
    value: "Today",
    icon: Clock,
    color: "from-orange-500 to-red-500",
  },
]

export default function DashboardPage() {
  const [userName] = useState("John Doe")

  return (
    <DashboardLayout currentPage="dashboard" userName={userName}>
      <div className="space-y-8 animate-fade-in-up">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userName}!</h2>
          <p className="text-gray-600">Ready to create your next business plan?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`border-0 shadow-lg rounded-3xl hover-lift animate-fade-in-up bg-gradient-to-r ${stat.color}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Plans */}
        <Card className="border-0 shadow-lg rounded-3xl animate-fade-in-up animate-delay-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-orange-500" />
              Recent Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {plan.createdAt}
                        </span>
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
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" className="rounded-2xl">
                View All Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Calendar, DollarSign, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// Sample data for user's gigs
const userGigs = [
  {
    id: "1",
    title: "React Developer for E-commerce Platform",
    status: "active",
    budget: "$3,500",
    deadline: "2024-02-15",
    progress: 65,
    client: "TechCorp Inc.",
    description: "Building a modern e-commerce platform with React and Node.js",
  },
  {
    id: "2",
    title: "Mobile App UI Design",
    status: "completed",
    budget: "$1,200",
    deadline: "2024-01-20",
    progress: 100,
    client: "StartupXYZ",
    description:
      "Designed complete UI/UX for iOS and Android mobile application",
  },
  {
    id: "3",
    title: "Content Writing for Tech Blog",
    status: "pending",
    budget: "$800",
    deadline: "2024-02-28",
    progress: 0,
    client: "Digital Media Co.",
    description: "Writing 10 technical articles about AI and machine learning",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-600/20 text-green-300 border-green-600/30";
    case "completed":
      return "bg-blue-600/20 text-blue-300 border-blue-600/30";
    case "pending":
      return "bg-yellow-600/20 text-yellow-300 border-yellow-600/30";
    default:
      return "bg-gray-600/20 text-gray-300 border-gray-600/30";
  }
};

export default function YourGigs() {
  const [searchQuery, setSearchQuery] = useState("");
  const isTyping = searchQuery.trim().length > 0;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Your Gigs
          </h1>
          <p className="text-gray-300">
            Manage your active projects and find top talent for your needs.
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create Gig
        </Button>
      </div>
      {/* Filters and Search */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="sm:flex space-x-2 hidden">
          {["All Gigs", "Active", "Completed", "Pending"].map((status) => (
            <Button
              key={status}
              variant="secondary"
              className="bg-black border border-purple-800 text-purple-100 hover:bg-purple-900 hover:text-white"
            >
              {status}
            </Button>
          ))}
        </div>
        <div className="relative flex-1">
          {/* Search badges inside input box */}
          {!isTyping && (
            <div className="sm:absolute right-4 top-1/2 -translate-y-1/2 md:flex space-x-2 z-10 hidden">
              {["Design", "Frontend", "Remote"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-purple-900 text-purple-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Gigs..."
            className={cn(
              "w-full h-10 pl-4 pr-4 py-4 bg-black border border-purple-800 rounded-md text-purple-100 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-700"
            )}
          />
        </div>
      </div>

      {/* Gigs List */}
      <div className="space-y-6">
        {userGigs.map((gig) => (
          <Card
            key={gig.id}
            className="bg-gray-800/50 border-gray-700 hover:border-purple-600/50 transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      {gig.title}
                    </h3>
                    <Badge className={getStatusColor(gig.status)}>
                      {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-3">{gig.description}</p>
                  <p className="text-gray-400 text-sm">Client: {gig.client}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-gray-400">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{gig.budget}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    Due: {new Date(gig.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{gig.progress}% Complete</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-gray-400">{gig.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${gig.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                  >
                    View Details
                  </Button>
                  {gig.status === "active" && (
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Update Progress
                    </Button>
                  )}
                </div>
                {gig.status === "completed" && (
                  <Badge className="bg-green-600/20 text-green-300 border-green-600/30">
                    ✓ Payment Received
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Calendar, DollarSign, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GigForm } from "@/components/form/gig-form";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { GigStatus } from "@prisma/client";
import Link from "next/link";

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
  const [isOpen, setIsOpen] = useState(false);
  const isTyping = searchQuery.trim().length > 0;
  const { gigs } = useSelector((state: RootState) => state.gigs); // Assuming user data is stored in Redux

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
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => setIsOpen(true)}
        >
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
        {gigs.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <p>No gigs found. Create a new gig to get started!</p>
          </div>
        ) : (
          gigs.map((gig) => (
            <Link key={gig.id} href={`/gigs/${gig.id}`}>
              <Card
                className="bg-gray-800/50 border-gray-700 hover:border-purple-600/50 transition-all duration-300 m-4"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">
                          {gig.title}
                        </h3>
                        <Badge className={getStatusColor(gig.status)}>
                          {gig.status.charAt(0).toUpperCase() +
                            gig.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-3">{gig.description}</p>
                      {/* <p className="text-gray-400 text-sm">Client: {gig.}</p> */}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-400">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>{`${gig.budgetMin} - ${gig.budgetMax}`}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        Created At:{" "}
                        {new Date(gig.createdAt).toLocaleDateString()}
                      </span>
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
                      {gig.status === GigStatus.ACTIVE && (
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          Update Progress
                        </Button>
                      )}
                    </div>
                    {gig.status === GigStatus.COMPLETED && (
                      <Badge className="bg-green-600/20 text-green-300 border-green-600/30">
                        ✓ Completed
                      </Badge>
                    )}
                    {gig.status === GigStatus.PENDING && (
                      <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-600/30">
                        Pending
                      </Badge>
                    )}
                    {gig.status === GigStatus.TALENT_RECOMMENDED && (
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30">
                        Talents Recommended
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[75vh] overflow-y-auto bg-gradient-to-br from-black via-purple-950 to-black p-8">
          <GigForm
            onSubmit={() => setIsOpen(false)}
            isLoading={false}
            initialData={{
              status: "DRAFT",
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

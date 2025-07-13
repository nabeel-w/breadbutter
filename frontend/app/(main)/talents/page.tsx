"use client";

import { Button } from "@/components/ui/button";
import { Plus, Users, Star, TrendingUp, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { TalentCard } from "@/components/talent-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { TalentForm } from "@/components/form/talent-form";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";


export default function TalentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { talents } = useSelector((state: RootState) => state.talent); // Assuming talents data is stored in Redux
  return (
    <div className="p-6 lg:p-8">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-900/50 to-black rounded-2xl p-8 lg:p-12 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Meet Our
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Talent
            </span>
            <br />
            on Bread Butter
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with skilled professionals ready to bring your projects to
            life. Browse our curated community of verified talents across all
            industries.
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Talent Profile
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gray-800/50 border-gray-700 mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search talents by name, skills, or location..."
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex gap-4">
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem
                    value="design"
                    className="text-white hover:bg-gray-700"
                  >
                    Design
                  </SelectItem>
                  <SelectItem
                    value="development"
                    className="text-white hover:bg-gray-700"
                  >
                    Development
                  </SelectItem>
                  <SelectItem
                    value="marketing"
                    className="text-white hover:bg-gray-700"
                  >
                    Marketing
                  </SelectItem>
                  <SelectItem
                    value="writing"
                    className="text-white hover:bg-gray-700"
                  >
                    Writing
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-40">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem
                    value="junior"
                    className="text-white hover:bg-gray-700"
                  >
                    1-2 years
                  </SelectItem>
                  <SelectItem
                    value="mid"
                    className="text-white hover:bg-gray-700"
                  >
                    3-5 years
                  </SelectItem>
                  <SelectItem
                    value="senior"
                    className="text-white hover:bg-gray-700"
                  >
                    5+ years
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-40">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem
                    value="low"
                    className="text-white hover:bg-gray-700"
                  >
                    $25-50/hr
                  </SelectItem>
                  <SelectItem
                    value="mid"
                    className="text-white hover:bg-gray-700"
                  >
                    $50-100/hr
                  </SelectItem>
                  <SelectItem
                    value="high"
                    className="text-white hover:bg-gray-700"
                  >
                    $100+/hr
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white bg-transparent"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Talents Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Featured Talents
          </h2>
          <Button
            variant="outline"
            className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white bg-transparent"
          >
            View All Talents
          </Button>
        </div>

        {talents.length === 0 ? (
          <div className="text-gray-400 text-center py-12">
            No talents found. Be the first to create a talent profile!
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {talents.map((talent) => (
              <TalentCard joinedDate={""} key={talent.id} {...talent} />
            ))}
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="mt-12 bg-gray-800/30 rounded-2xl p-6 lg:p-8">
        <h3 className="text-xl font-bold text-white mb-6">
          Browse by Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Design", count: "12,450" },
            { name: "Development", count: "18,230" },
            { name: "Marketing", count: "8,940" },
            { name: "Writing", count: "6,780" },
            { name: "Video & Animation", count: "4,560" },
            { name: "Music & Audio", count: "2,340" },
            { name: "Business", count: "5,670" },
            { name: "Photography", count: "3,890" },
          ].map((category) => (
            <Button
              key={category.name}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent h-16 flex-col"
            >
              <span className="font-semibold">{category.name}</span>
              <span className="text-xs text-gray-400">
                {category.count} talents
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-purple-900/50 to-black rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          Ready to Join Our Talent Community?
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Showcase your skills, connect with amazing clients, and grow your
          freelance career on Bread Butter.
        </p>
        <Button
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Your Talent Profile
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[75vh] overflow-y-auto bg-gradient-to-br from-black via-purple-950 to-black p-8">
          <TalentForm
            onSubmit={() => setIsOpen(false)}
            isLoading={false}
            initialData={{

            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

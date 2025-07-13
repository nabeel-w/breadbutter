"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  DollarSign,
  User,
  Briefcase,
  Calendar,
} from "lucide-react";

interface TalentCardProps {
  id: string;
  name: string;
  city: string;
  categories: string[];
  skills: string[];
  experienceYears: number;
  budgetMin: number;
  budgetMax: number;
  portfolioLinks: string[];
  rating?: number;
  completedProjects?: number;
  joinedDate: string;
  isAvailable?: boolean;
}

export function TalentCard({
  id,
  name,
  city,
  categories,
  skills,
  experienceYears,
  budgetMin,
  budgetMax,
  portfolioLinks,
  rating = 5,
  completedProjects = 0,
  joinedDate,
  isAvailable = true,
}: TalentCardProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/10">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPin className="h-3 w-3" />
                <span>{city}</span>
                {rating && (
                  <>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>{rating}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Badge
            className={`${
              isAvailable
                ? "bg-green-600/20 text-green-300 border-green-600/30"
                : "bg-gray-600/20 text-gray-300 border-gray-600/30"
            }`}
          >
            {isAvailable ? "Available" : "Busy"}
          </Badge>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.slice(0, 3).map((category) => (
            <Badge
              key={category}
              className="bg-purple-600/20 text-purple-300 border-purple-600/30"
            >
              {category}
            </Badge>
          ))}
          {categories.length > 3 && (
            <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30">
              +{categories.length - 3} more
            </Badge>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {skills.slice(0, 4).map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-gray-700 text-gray-300 hover:bg-gray-600 text-xs"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge
              variant="secondary"
              className="bg-gray-700 text-gray-300 text-xs"
            >
              +{skills.length - 4} more
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-400">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>
              ${budgetMin}-${budgetMax}/hr
            </span>
          </div>
          <div className="flex items-center text-gray-400">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{experienceYears}+ years exp</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Joined {joinedDate}</span>
            </div>
            <span>•</span>
            <span>{completedProjects} projects completed</span>
          </div>

          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
            >
              View Profile
            </Button>
            <Button
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

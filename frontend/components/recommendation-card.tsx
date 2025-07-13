"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, DollarSign, User, Briefcase, Award, MessageSquare, Heart } from 'lucide-react'
import { useState } from "react"

interface RecommendationCardProps {
  id: string
  ranking: number
  details?: string
  talent: {
    id: string
    name: string
    city: string
    categories: string[]
    skills: string[]
    experienceYears: number
    budgetMin: number
    budgetMax: number
    portfolioLinks: string[]
  }
  // Additional display data
  rating?: number
  completedProjects?: number
  responseTime?: string
  isAvailable?: boolean
}

export function RecommendationCard({
  id,
  ranking,
  details,
  talent,
  rating = 4.8,
  completedProjects = 25,
  responseTime = "2 hours",
  isAvailable = true,
}: RecommendationCardProps) {
  const [isSaved, setIsSaved] = useState(false)

  const getRankingBadgeColor = (rank: number) => {
    if (rank <= 3) return "bg-yellow-600/20 text-yellow-300 border-yellow-600/30"
    if (rank <= 6) return "bg-green-600/20 text-green-300 border-green-600/30"
    return "bg-blue-600/20 text-blue-300 border-blue-600/30"
  }

  const getRankingIcon = (rank: number) => {
    if (rank === 1) return "🥇"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return `#${rank}`
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/10">
      <CardContent className="p-6">
        {/* Header with ranking and save button */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <Badge className={getRankingBadgeColor(ranking)}>
              <Award className="h-3 w-3 mr-1" />
              {getRankingIcon(ranking)}
            </Badge>
            <div className="text-sm text-purple-400 font-medium">Recommended Match</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSaved(!isSaved)}
            className={`h-8 w-8 p-0 ${
              isSaved ? "text-red-400 hover:text-red-300" : "text-gray-400 hover:text-red-400"
            }`}
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Talent Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">{talent.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <MapPin className="h-3 w-3" />
              <span>{talent.city}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span>{rating}</span>
              </div>
              <span>•</span>
              <span>{completedProjects} projects</span>
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

        {/* Recommendation Details */}
        {details && (
          <div className="bg-purple-900/20 border border-purple-600/30 rounded-lg p-3 mb-4">
            <p className="text-sm text-purple-200">
              <strong>Why this talent is recommended:</strong> {details}
            </p>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {talent.categories.slice(0, 3).map((category) => (
            <Badge key={category} className="bg-purple-600/20 text-purple-300 border-purple-600/30">
              {category}
            </Badge>
          ))}
          {talent.categories.length > 3 && (
            <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30">
              +{talent.categories.length - 3} more
            </Badge>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {talent.skills.slice(0, 5).map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-gray-700 text-gray-300 hover:bg-gray-600 text-xs">
              {skill}
            </Badge>
          ))}
          {talent.skills.length > 5 && (
            <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
              +{talent.skills.length - 5} more
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-400">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>
              ${talent.budgetMin}-${talent.budgetMax}/hr
            </span>
          </div>
          <div className="flex items-center text-gray-400">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{talent.experienceYears}+ years</span>
          </div>
          <div className="flex items-center text-gray-400">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>Responds in {responseTime}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t border-gray-700">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
          >
            View Profile
          </Button>
          <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
            Contact Talent
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

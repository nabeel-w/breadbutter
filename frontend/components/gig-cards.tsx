"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, DollarSign, User } from "lucide-react"

interface GigCardProps {
  id: string
  title: string
  description: string
  budget: string
  timeframe: string
  skills: string[]
  rating?: number
  clientName: string
  postedTime: string
  proposals?: number
}

export function GigCard({
  id,
  title,
  description,
  budget,
  timeframe,
  skills,
  rating,
  clientName,
  postedTime,
  proposals = 0,
}: GigCardProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/10">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{title}</h3>
          <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30 ml-4">{proposals} proposals</Badge>
        </div>

        <p className="text-gray-300 mb-4 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-gray-700 text-gray-300 hover:bg-gray-600">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="secondary" className="bg-gray-700 text-gray-300">
              +{skills.length - 4} more
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-400">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{budget}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>{timeframe}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{clientName}</p>
              <div className="flex items-center space-x-1">
                {rating && (
                  <>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-400">{rating}</span>
                  </>
                )}
                <span className="text-xs text-gray-400">• {postedTime}</span>
              </div>
            </div>
          </div>

          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

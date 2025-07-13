"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RecommendationCard } from "@/components/recommendation-card";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Tag,
  Palette,
  Users,
  Clock,
  Share2,
  Bookmark,
  ArrowLeft,
  Star,
} from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Customer, Gig, GigStatus } from "@prisma/client";
import { RecommendationData } from "@/types/interface";
import { getGigById } from "@/lib/data/gigs";

interface GigData extends Gig {
  Recommendations: RecommendationData[];
  customer: Customer;
}

export default function GigDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [gigData, setGigData] = useState<GigData | null>(null);
  const data = use(params);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const gigId = data.id;
        console.log(gigId);
        const res = await getGigById(gigId);
        setGigData(res);
      } catch (error) {
        setIsError("Failed to load gig details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [data.id]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-600/20 text-green-300 border-green-600/30";
      case "DRAFT":
        return "bg-yellow-600/20 text-yellow-300 border-yellow-600/30";
      case "CLOSED":
        return "bg-red-600/20 text-red-300 border-red-600/30";
      default:
        return "bg-gray-600/20 text-gray-300 border-gray-600/30";
    }
  };

  if (isLoading || !gigData) {
    return (
      <div className="text-center text-gray-400">Loading gig details...</div>
    );
  }
  if (isError) {
    return <div className="text-center text-red-500">{isError}</div>;
  }

  function getMembershipDuration(createdAt: Date): string {
    if (!createdAt) return "Unknown";
    const now = new Date();
    const years = now.getFullYear() - createdAt.getFullYear();
    if (years > 1) {
      return `Member for ${years} years`;
    } else if (years === 1) {
      return "Member for 1 year";
    } else {
      const months =
        now.getMonth() -
        createdAt.getMonth() +
        12 * (now.getFullYear() - createdAt.getFullYear());
      if (months > 1) {
        return `Member for ${months} months`;
      } else if (months === 1) {
        return "Member for 1 month";
      } else {
        return "New member";
      }
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/home"
            className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gig Header */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="border-b border-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {gigData.status === GigStatus.COMPLETED && (
                        <Badge className="bg-green-600/20 text-green-300 border-green-600/30">
                          ✓ Completed
                        </Badge>
                      )}
                      {gigData.status === GigStatus.PENDING && (
                        <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-600/30">
                          Pending
                        </Badge>
                      )}
                      {gigData.status === GigStatus.TALENT_RECOMMENDED && (
                        <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30">
                          Talents Recommended
                        </Badge>
                      )}
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30">
                        {gigData.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      {gigData.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Posted {formatDate(gigData.createdAt)}</span>
                      </div>
                      {gigData.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{gigData.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`${
                        isBookmarked ? "text-purple-400" : "text-gray-400"
                      } hover:text-purple-400`}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          isBookmarked ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-purple-400"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Budget */}
                {(gigData.budgetMin || gigData.budgetMax) && (
                  <div className="flex items-center space-x-2 mb-4">
                    <DollarSign className="h-5 w-5 text-purple-400" />
                    <span className="text-lg font-semibold text-white">
                      ${gigData.budgetMin?.toLocaleString()} - $
                      {gigData.budgetMax?.toLocaleString()}
                    </span>
                    <span className="text-gray-400">Project Budget</span>
                  </div>
                )}

                {/* Description */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                    {gigData.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills and Preferences */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Required Skills */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Tag className="h-5 w-5 mr-2 text-purple-400" />
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {gigData.skills.map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-purple-600/20 text-purple-300 border-purple-600/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  {/* Style Preferences */}
                  {gigData.stylePreferences.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <Palette className="h-5 w-5 mr-2 text-purple-400" />
                        Style Preferences
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {gigData.stylePreferences.map((style) => (
                          <Badge
                            key={style}
                            variant="secondary"
                            className="bg-gray-700 text-gray-300"
                          >
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Talents */}
            {gigData.status === GigStatus.PENDING ? (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="border-b border-gray-700">
                  <CardTitle className="text-xl font-bold text-white flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-400" />
                    Recommendations Pending
                  </CardTitle>
                  <p className="text-gray-400">
                    Recommendations will be available once the gig is reviewed
                    and published.
                  </p>
                </CardHeader>
              </Card>
            ) : (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="border-b border-gray-700">
                  <CardTitle className="text-xl font-bold text-white flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-400" />
                    Recommended Talents ({gigData.Recommendations.length})
                  </CardTitle>
                  <p className="text-gray-400">
                    Our AI has matched these talents based on your project
                    requirements and their expertise.
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {gigData.Recommendations.map((recommendation) => (
                      <RecommendationCard
                        key={recommendation.id}
                        id={recommendation.id}
                        ranking={recommendation.ranking}
                        details={recommendation.details!}
                        talent={recommendation.talent}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-lg font-bold text-white">
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {gigData.customer.name}
                      </p>
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{5}</span>
                        <span>•</span>
                        {/* <span>
                          {gigData.customer.projectsPosted} projects posted
                        </span> */}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>{getMembershipDuration(gigData.customer.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Timeline */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-lg font-bold text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple-400" />
                  Project Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Posted:</span>
                    <span className="text-white">
                      {formatDate(gigData.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="text-white">
                      {formatDate(gigData.updatedAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    {gigData.status === GigStatus.COMPLETED && (
                      <Badge className="bg-green-600/20 text-green-300 border-green-600/30">
                        ✓ Completed
                      </Badge>
                    )}
                    {gigData.status === GigStatus.PENDING && (
                      <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-600/30">
                        Pending
                      </Badge>
                    )}
                    {gigData.status === GigStatus.TALENT_RECOMMENDED && (
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30">
                        Talents Recommended
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-lg font-bold text-white">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Apply to This Gig
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                  >
                    Contact Client
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                  >
                    Report Gig
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

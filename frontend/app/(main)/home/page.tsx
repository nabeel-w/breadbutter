"use client";

import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Users, DollarSign } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";

import { Card, CardContent } from "@/components/ui/card";
import { GigCard } from "@/components/gig-cards";
import Link from "next/link";

// Sample data for recent gigs
const recentGigs = [
  {
    id: "1",
    title: "Full-Stack Web Application Development",
    description:
      "Looking for an experienced developer to build a modern web application using React and Node.js. The project includes user authentication, payment integration, and a responsive design.",
    budget: "$2,000 - $5,000",
    timeframe: "2-3 months",
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "Stripe"],
    rating: 4.9,
    clientName: "Sarah Johnson",
    postedTime: "2 hours ago",
    proposals: 12,
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    description:
      "Need a talented designer to create a modern and intuitive mobile app design for iOS and Android. Must include wireframes, prototypes, and final designs.",
    budget: "$800 - $1,500",
    timeframe: "3-4 weeks",
    skills: ["Figma", "UI/UX Design", "Mobile Design", "Prototyping"],
    rating: 4.8,
    clientName: "Mike Chen",
    postedTime: "5 hours ago",
    proposals: 8,
  },
  {
    id: "3",
    title: "Content Writing for Tech Blog",
    description:
      "Seeking a skilled content writer to create engaging blog posts about emerging technologies, AI, and software development trends.",
    budget: "$50 - $100 per article",
    timeframe: "Ongoing",
    skills: ["Content Writing", "Technical Writing", "SEO", "Research"],
    rating: 4.7,
    clientName: "Alex Rivera",
    postedTime: "1 day ago",
    proposals: 15,
  },
  {
    id: "4",
    title: "E-commerce Website Optimization",
    description:
      "Looking for an expert to optimize our existing e-commerce website for better performance, SEO, and conversion rates.",
    budget: "$1,200 - $2,500",
    timeframe: "1-2 months",
    skills: ["SEO", "Performance Optimization", "E-commerce", "Analytics"],
    rating: 4.6,
    clientName: "Emma Davis",
    postedTime: "2 days ago",
    proposals: 6,
  },
];

const stats = [
  {
    title: "Active Gigs",
    value: "1,247",
    icon: TrendingUp,
    change: "+12%",
  },
  {
    title: "Total Freelancers",
    value: "52,341",
    icon: Users,
    change: "+8%",
  },
  {
    title: "Avg. Project Value",
    value: "$2,450",
    icon: DollarSign,
    change: "+15%",
  },
];

export default function DashboardHome() {
  return (
    <div className="p-6 lg:p-8">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-900/50 to-black rounded-2xl p-8 lg:p-12 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Find Your Next
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Talent
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover amazing talent that match your skills and budget 
            today. From thousands of successful freelancers on Bread Butter.
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
            asChild
          >
            <Link href="/gigs">
              <Plus className="mr-2 h-5 w-5" />
              Create Your Gig
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-green-400 text-sm">
                    {stat.change} from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Gigs Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Recent Gigs
          </h2>
          <Button
            variant="outline"
            className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white bg-transparent"
          >
            View All Gigs
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recentGigs.map((gig) => (
            <GigCard key={gig.id} {...gig} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-12 bg-gray-800/30 rounded-2xl p-6 lg:p-8">
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent h-12"
          >
            Browse by Category
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent h-12"
          >
            Saved Gigs
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent h-12"
          >
            My Proposals
          </Button>
        </div>
      </div>
    </div>
  );
}

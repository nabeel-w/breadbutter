"use client";

import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Users, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GigCard } from "@/components/gig-cards";
import Link from "next/link";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

const stats = [
  {
    title: "Active Gigs",
    value: "1,247",
    icon: TrendingUp,
    change: "+12%",
  },
  {
    title: "Total Talents",
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
  const { gigs } = useSelector((state: RootState) => state.gigs);
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
            Discover amazing talent that match your skills and budget today.
            From thousands of successful freelancers on Bread Butter.
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

        {gigs.length === 0 ? (
          <div className="text-gray-400 text-center py-12">
            No gigs found. Create your first gig to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...gigs]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .slice(0, 4)
              .map((gig) => (
                <Link key={gig.id} href={`/gigs/${gig.id}`}>
                  <GigCard
                    id={gig.id}
                    title={gig.title}
                    description={gig.description}
                    budget={`${gig.budgetMin} - ${gig.budgetMax}`}
                    // timeframe={gig.timeframe}
                    skills={gig.skills}
                    recommendations={gig.Recommendations.length}
                    postedTime={new Date(gig.createdAt).toLocaleDateString()}
                  />
                </Link>
              ))}
          </div>
        )}
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

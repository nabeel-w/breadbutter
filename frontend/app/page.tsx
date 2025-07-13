import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Briefcase,
  Star,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BB</span>
            </div>
            <span className="text-xl font-bold">Bread Butter</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800"
              asChild
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              asChild
            >
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black"></div>
        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-600/30">
              🚀 Connecting Talent with Opportunity
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Where Gigs Meet
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Talent
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate platform connecting skilled professionals with
              exciting opportunities. Find your next gig or discover the perfect
              talent for your project.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
                asChild
              >
                <Link href="/home">
                  <span className="flex items-center">
                    Find Talent
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg bg-transparent"
                asChild
              >
                <Link href="/home">
                  <span className="flex items-center">
                    Find Gigs
                    <Briefcase className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">50K+</div>
                <div className="text-gray-400">Active Freelancers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">10K+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">98%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-purple-400">Bread Butter</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We've built the most comprehensive platform to make freelancing
              seamless for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-600/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Verified Talent
                </h3>
                <p className="text-gray-300">
                  All freelancers go through our rigorous verification process
                  to ensure quality and reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-600/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Secure Payments
                </h3>
                <p className="text-gray-300">
                  Escrow protection and secure payment processing ensure your
                  money is always safe.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-600/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Fast Matching
                </h3>
                <p className="text-gray-300">
                  Our AI-powered matching system connects you with the perfect
                  talent in minutes, not days.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-600/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Global Reach
                </h3>
                <p className="text-gray-300">
                  Access talent from around the world or find local experts for
                  your specific needs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-600/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Quality Assurance
                </h3>
                <p className="text-gray-300">
                  Comprehensive rating system and project milestones ensure
                  exceptional results every time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-600/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  24/7 Support
                </h3>
                <p className="text-gray-300">
                  Our dedicated support team is always here to help you succeed
                  on your projects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Getting started is simple. Follow these easy steps to begin your
              journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* For Clients */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center text-purple-400">
                For Clients
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Post Your Project
                    </h4>
                    <p className="text-gray-300">
                      Describe your project requirements, budget, and timeline
                      in detail.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Review Proposals
                    </h4>
                    <p className="text-gray-300">
                      Receive proposals from qualified freelancers and review
                      their profiles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Hire & Collaborate
                    </h4>
                    <p className="text-gray-300">
                      Choose the best freelancer and start working together on
                      your project.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Pay Securely</h4>
                    <p className="text-gray-300">
                      Release payment once you're satisfied with the completed
                      work.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Freelancers */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center text-purple-400">
                For Freelancers
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Create Your Profile
                    </h4>
                    <p className="text-gray-300">
                      Showcase your skills, experience, and portfolio to attract
                      clients.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Browse Projects
                    </h4>
                    <p className="text-gray-300">
                      Find projects that match your skills and interests from
                      our job board.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Submit Proposals
                    </h4>
                    <p className="text-gray-300">
                      Write compelling proposals that highlight your expertise
                      and approach.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Deliver Excellence
                    </h4>
                    <p className="text-gray-300">
                      Complete projects on time and build your reputation for
                      future opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-black">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful freelancers and clients who trust Bread
            Butter for their projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
            >
              Start Hiring Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg bg-transparent"
            >
              Join as Freelancer
            </Button>
          </div>

          <div className="max-w-md mx-auto">
            <p className="text-gray-400 mb-4">
              Get updates on new features and opportunities
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="bg-purple-600 hover:bg-purple-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BB</span>
                </div>
                <span className="text-xl font-bold">Bread Butter</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting talent with opportunity, one gig at a time.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-purple-400">
                  Twitter
                </Link>
                <Link href="#" className="text-gray-400 hover:text-purple-400">
                  LinkedIn
                </Link>
                <Link href="#" className="text-gray-400 hover:text-purple-400">
                  Facebook
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">For Clients</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    How to Hire
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Talent Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Project Catalog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">For Freelancers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    How to Find Work
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Direct Contracts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Find Freelance Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Leadership
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Bread Butter. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-purple-400 text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

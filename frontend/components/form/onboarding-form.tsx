"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomerType } from "@prisma/client";
import { toast } from "sonner";
import { onboardUser } from "@/lib/data/onboard";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";

export default function OnboardingForm({ userId }: { userId: string }) {
  const [customerType, setCustomerType] = useState<CustomerType | "">("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const router = useRouter();
  const { session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!session) return;

    const formData = {
      type: customerType as CustomerType,
      companyName:
        customerType === CustomerType.STARTUP ? companyName : undefined,
      website: website || undefined,
    };

    console.log("Form submitted:", formData);
    // Handle form submission here
    try {
      const res = await onboardUser(userId, formData);
      if (res.success) {
        toast.success(res.message);
        // Redirect or perform any other action after successful onboarding
        await session.reload();
        router.push("/home");
      }
    } catch (error) {
      console.error("Error during onboarding:", error);
      // Handle error appropriately, e.g., show a notification or alert
      toast.error("Onboarding failed. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/80 border-purple-800/50 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-white">
            Welcome!
          </CardTitle>
          <CardDescription className="text-purple-200">
            Let's get you set up with a few quick details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="customer-type" className="text-purple-100">
                What best describes you?
              </Label>
              <Select
                value={customerType}
                onValueChange={(value: CustomerType) => setCustomerType(value)}
              >
                <SelectTrigger className="bg-purple-950/50 border-purple-700 text-white focus:border-purple-500">
                  <SelectValue placeholder="Select your type" />
                </SelectTrigger>
                <SelectContent className="bg-purple-950 border-purple-700">
                  <SelectItem
                    value={CustomerType.INDIVIDUAL}
                    className="text-white hover:bg-purple-800"
                  >
                    Individual
                  </SelectItem>
                  <SelectItem
                    value={CustomerType.CREATOR}
                    className="text-white hover:bg-purple-800"
                  >
                    Creator
                  </SelectItem>
                  <SelectItem
                    value={CustomerType.STARTUP}
                    className="text-white hover:bg-purple-800"
                  >
                    Startup
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {customerType === CustomerType.STARTUP && (
              <div className="space-y-2">
                <Label htmlFor="company-name" className="text-purple-100">
                  Company Name
                </Label>
                <Input
                  id="company-name"
                  type="text"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="bg-purple-950/50 border-purple-700 text-white placeholder:text-purple-300 focus:border-purple-500"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="website" className="text-purple-100">
                Website{" "}
                <span className="text-purple-400 text-sm">(optional)</span>
              </Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="bg-purple-950/50 border-purple-700 text-white placeholder:text-purple-300 focus:border-purple-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-2.5"
              disabled={!customerType || !session}
            >
              Complete Setup
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

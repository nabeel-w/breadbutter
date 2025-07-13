"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelectInput } from "../multi-select-input";
import {
  User,
  MapPin,
  Briefcase,
  Star,
  DollarSign,
  Link,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/app/redux/useDispatch";
import { createTalentThunk } from "@/app/redux/slices/talentSlice";

export interface TalentFormData {
  name: string;
  city: string;
  categories: string[];
  skills: string[];
  experienceYears: number;
  budgetMin: number;
  budgetMax: number;
  portfolioLinks: string[];
}

interface TalentFormProps {
  onSubmit: () => void;
  initialData?: Partial<TalentFormData>;
  isLoading?: boolean;
}

const categoriesOptions = [
  "Design",
  "Development",
  "Marketing",
  "Writing",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Business",
  "Lifestyle",
  "Photography",
];

const skillsOptions = [
  "Figma",
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "SEO",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "WordPress",
  "Shopify",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Google Analytics",
  "Social Media Marketing",
  "Content Writing",
  "Video Editing",
  "UI/UX Design",
  "Graphic Design",
  "Digital Marketing",
];

export function TalentForm({
  onSubmit,
  initialData,
  isLoading = false,
}: TalentFormProps) {
  const [categories, setCategories] = useState<string[]>(
    initialData?.categories || []
  );
  const [skills, setSkills] = useState<string[]>(initialData?.skills || []);
  const [portfolioLinks, setPortfolioLinks] = useState<string[]>(
    initialData?.portfolioLinks || []
  );
  const [newPortfolioLink, setNewPortfolioLink] = useState("");
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TalentFormData>({
    defaultValues: {
      name: initialData?.name || "",
      city: initialData?.city || "",
      experienceYears: initialData?.experienceYears || 0,
      budgetMin: initialData?.budgetMin || 0,
      budgetMax: initialData?.budgetMax || 0,
    },
  });

  const addPortfolioLink = () => {
    if (
      newPortfolioLink.trim() &&
      !portfolioLinks.includes(newPortfolioLink.trim())
    ) {
      setPortfolioLinks([...portfolioLinks, newPortfolioLink.trim()]);
      setNewPortfolioLink("");
    }
  };

  const removePortfolioLink = (index: number) => {
    setPortfolioLinks(portfolioLinks.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: TalentFormData) => {
    const toastId = toast.loading("Creating talent profile...");
    try {
      const res = dispatch(
        createTalentThunk({
          data: {
            ...data,
            categories: categories,
            skills: skills,
            portfolioLinks: portfolioLinks,
          },
        })
      );
      if (createTalentThunk.rejected.match(res)) {
        throw new Error(res.error.message);
      }
      toast.success("Talent profile created successfully!", { id: toastId });
    } catch (error) {
      console.error("Error creating talent profile:", error);
      toast.error("Failed to create talent profile. Please try again.", {
        id: toastId,
      });
    } finally {
      toast.dismiss(toastId);
      onSubmit();
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 max-w-4xl mx-auto">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-2xl font-bold text-white flex items-center">
          <User className="mr-3 h-6 w-6 text-purple-400" />
          Create Talent Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center">
              <User className="mr-2 h-4 w-4" />
              Full Name *
            </label>
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="e.g. John Doe"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* City */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              City *
            </label>
            <Input
              {...register("city", { required: "City is required" })}
              placeholder="e.g. New York, London, Remote"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            {errors.city && (
              <p className="text-red-400 text-sm">{errors.city.message}</p>
            )}
          </div>

          {/* Categories */}
          <MultiSelectInput
            value={categories}
            onChange={setCategories}
            suggestions={categoriesOptions}
            placeholder="Add category..."
            label={
              <span className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                Categories *
              </span>
            }
          />

          {/* Skills */}
          <MultiSelectInput
            value={skills}
            onChange={setSkills}
            suggestions={skillsOptions}
            placeholder="Add skill..."
            label="Skills *"
          />

          {/* Experience Years */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center">
              <Star className="mr-2 h-4 w-4" />
              Years of Experience *
            </label>
            <Select
              onValueChange={(value) =>
                setValue("experienceYears", Number.parseInt(value))
              }
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="0" className="text-white hover:bg-gray-700">
                  Less than 1 year
                </SelectItem>
                <SelectItem value="1" className="text-white hover:bg-gray-700">
                  1 year
                </SelectItem>
                <SelectItem value="2" className="text-white hover:bg-gray-700">
                  2 years
                </SelectItem>
                <SelectItem value="3" className="text-white hover:bg-gray-700">
                  3 years
                </SelectItem>
                <SelectItem value="4" className="text-white hover:bg-gray-700">
                  4 years
                </SelectItem>
                <SelectItem value="5" className="text-white hover:bg-gray-700">
                  5+ years
                </SelectItem>
                <SelectItem value="10" className="text-white hover:bg-gray-700">
                  10+ years
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.experienceYears && (
              <p className="text-red-400 text-sm">
                {errors.experienceYears.message}
              </p>
            )}
          </div>

          {/* Budget Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                Minimum Rate (per hour) *
              </label>
              <Input
                type="number"
                {...register("budgetMin", {
                  required: "Minimum rate is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Rate must be at least $1" },
                })}
                placeholder="25"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              {errors.budgetMin && (
                <p className="text-red-400 text-sm">
                  {errors.budgetMin.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                Maximum Rate (per hour) *
              </label>
              <Input
                type="number"
                {...register("budgetMax", {
                  required: "Maximum rate is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Rate must be at least $1" },
                })}
                placeholder="100"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              {errors.budgetMax && (
                <p className="text-red-400 text-sm">
                  {errors.budgetMax.message}
                </p>
              )}
            </div>
          </div>

          {/* Portfolio Links */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center">
              <Link className="mr-2 h-4 w-4" />
              Portfolio Links
            </label>

            {/* Existing portfolio links */}
            {portfolioLinks.length > 0 && (
              <div className="space-y-2">
                {portfolioLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-700/50 rounded-md"
                  >
                    <Link className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-300 flex-1 truncate">
                      {link}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                      onClick={() => removePortfolioLink(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add new portfolio link */}
            <div className="flex gap-2">
              <Input
                value={newPortfolioLink}
                onChange={(e) => setNewPortfolioLink(e.target.value)}
                placeholder="https://your-portfolio.com"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addPortfolioLink();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addPortfolioLink}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <Button
              type="button"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isLoading ? "Creating Profile..." : "Create Profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

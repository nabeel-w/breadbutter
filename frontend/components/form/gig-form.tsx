"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Briefcase,
  DollarSign,
  MapPin,
  Palette,
  Tag,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { createGigThunk } from "@/app/redux/slices/gigsSlice";
import { useAppDispatch } from "@/app/redux/useDispatch";

export interface GigFormData {
  title: string;
  description: string;
  location?: string;
  budgetMin?: number;
  budgetMax?: number;
  stylePreferences: string[];
  category: string;
  skills: string[];
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
}

interface GigFormProps {
  onSubmit: () => void;
  initialData?: Partial<GigFormData>;
  isLoading?: boolean;
}

const categories = [
  "Branding",
  "UI/UX Design",
  "Web Development",
  "Mobile Development",
  "Content Writing",
  "Digital Marketing",
  "SEO",
  "Graphic Design",
  "Video Editing",
  "Photography",
];

const stylePreferencesOptions = [
  "Minimalist",
  "Bold",
  "Professional",
  "Creative",
  "Modern",
  "Classic",
  "Playful",
  "Elegant",
  "Rustic",
  "Futuristic",
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
];

export function GigForm({
  onSubmit,
  initialData,
  isLoading = false,
}: GigFormProps) {
  const [stylePreferences, setStylePreferences] = useState<string[]>(
    initialData?.stylePreferences || []
  );
  const [skills, setSkills] = useState<string[]>(initialData?.skills || []);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GigFormData>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      location: initialData?.location || "",
      budgetMin: initialData?.budgetMin || undefined,
      budgetMax: initialData?.budgetMax || undefined,
      category: initialData?.category || "",
      status: initialData?.status || "DRAFT",
    },
  });

  const handleFormSubmit = async (data: GigFormData) => {
    const toastId = toast.loading("Creating gig...");
    try {
      const res = await dispatch(
        createGigThunk({
          data: {
            ...data,
          },
        })
      );
      if (createGigThunk.rejected.match(res)) {
        throw new Error(res.error.message);
      }
      toast.success("Gig created successfully!", {
        id: toastId,
      });
    } catch (error) {
      console.error("Error creating gig:", error);
      toast.error("Failed to create gig. Please try again.", {
        id: toastId,
      });
      return;
    } finally {
      toast.dismiss(toastId);
      onSubmit();
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 max-w-4xl mx-auto">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-2xl font-bold text-white flex items-center">
          <Briefcase className="mr-3 h-6 w-6 text-purple-400" />
          Create New Gig
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Gig Title *
            </label>
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="e.g. Modern Website Design for Tech Startup"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Description *
            </label>
            <Textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Describe your project requirements, goals, and expectations..."
              rows={4}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            {errors.description && (
              <p className="text-red-400 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Location (Optional)
            </label>
            <Input
              {...register("location")}
              placeholder="e.g. Remote, New York, London"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>

          {/* Budget Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                Minimum Budget
              </label>
              <Input
                type="number"
                {...register("budgetMin", { valueAsNumber: true })}
                placeholder="500"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                Maximum Budget
              </label>
              <Input
                type="number"
                {...register("budgetMax", { valueAsNumber: true })}
                placeholder="2000"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              Category *
            </label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="text-white hover:bg-gray-700"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-400 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Style Preferences */}
          <MultiSelectInput
            value={stylePreferences}
            onChange={setStylePreferences}
            suggestions={stylePreferencesOptions}
            placeholder="Add style preference..."
            label={
              <span className="flex items-center text-white">
                <Palette className="mr-2 h-4 w-4" />
                Style Preferences
              </span>
            }
          />

          {/* Skills Required */}
          <MultiSelectInput
            value={skills}
            onChange={setSkills}
            suggestions={skillsOptions}
            placeholder="Add required skill..."
            label="Required Skills *"
          />

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Status</label>
            <Select
              onValueChange={(value) =>
                setValue("status", value as "DRAFT" | "PUBLISHED" | "CLOSED")
              }
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem
                  value="DRAFT"
                  className="text-white hover:bg-gray-700"
                >
                  Draft
                </SelectItem>
                <SelectItem
                  value="PUBLISHED"
                  className="text-white hover:bg-gray-700"
                >
                  Published
                </SelectItem>
                <SelectItem
                  value="CLOSED"
                  className="text-white hover:bg-gray-700"
                >
                  Closed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Buttons */}
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
              {isLoading ? "Creating..." : "Publish Gig"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

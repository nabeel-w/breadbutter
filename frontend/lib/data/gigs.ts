"use server";
import { GigFormData } from "@/components/form/gig-form";
import prisma from "../prisma";
import { currentUser } from "@clerk/nextjs/server";
import { GigStatus } from "@prisma/client";
import { gigQueue } from "../queue";

export const getGigs = async () => {
  try {
    const user = await currentUser();
    if (!user || !user.publicMetadata.customerId) {
      throw new Error("User not authenticated");
    }
    const gigs = await prisma.gig.findMany({
      where: {
        customerId: user.publicMetadata.customerId,
      },
      include: {
        Recommendations: {
          include: {
            talent: true,
          },
        },
      },
    });

    return gigs;
  } catch (error) {
    console.error("Error fetching gigs:", error);
    throw new Error("Failed to fetch gigs");
  }
};

export const createGig = async (data: GigFormData) => {
  try {
    const user = await currentUser();
    if (!user || !user.publicMetadata.customerId) {
      throw new Error("User not authenticated");
    }
    const gig = await prisma.gig.create({
      data: {
        customerId: user.publicMetadata.customerId,
        title: data.title,
        description: data.description,
        location: data.location!,
        budgetMin: data.budgetMin!,
        budgetMax: data.budgetMax!,
        category: data.category!,
        status: GigStatus.PENDING,
        skills: data.skills,
        stylePreferences: data.stylePreferences,
      },
    });

    await gigQueue.add("created-gig", gig);

    return gig;
  } catch (error) {
    console.error("Error creating gig:", error);
    throw new Error("Failed to create gig");
  }
};

export const getGigById = async (id: string) => {
  try {
    const gig = await prisma.gig.findUnique({
      where: { id },
      include: {
        customer: true,
        Recommendations: {
          include: {
            talent: true,
          },
        },
      },
    });

    if (!gig) {
      throw new Error("Gig not found");
    }

    return gig;
  } catch (error) {
    console.error("Error fetching gig by ID:", error);
    throw new Error("Failed to fetch gig");
  }
};

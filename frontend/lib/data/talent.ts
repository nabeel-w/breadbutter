'use server';
import { TalentFormData } from "@/components/form/talent-form";
import prisma from "../prisma";
import { talentQueue } from "../queue";

export const getAllTalents = async () => {
  try {
    const talents = await prisma.talent.findMany({
      include: {
        recommendations: {
          include: {
            talent: true,
          },
        },
      },
    });

    return talents;
  } catch (error) {
    console.error("Error fetching talents:", error);
    throw new Error("Failed to fetch talents");
  }
};

export const createTalent = async (data: TalentFormData) => {
  try {
    const talent = await prisma.talent.create({
      data: {
        ...data,
      },
    });
    
    await talentQueue.add('created-talent', talent);

    return talent;
  } catch (error) {
    console.error("Error creating talent:", error);
    throw new Error("Failed to create talent");
  }
};
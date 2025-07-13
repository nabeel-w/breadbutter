"use server";
import prisma from "../prisma";
import clerkClient from "../clerk";
import { CustomerType } from "@prisma/client";

interface OnboardingData {
  type: CustomerType
  companyName?: string;
  website?: string;
}

export async function onboardUser(
  userId: string,
  data: OnboardingData
) {
    try {
        const { type, companyName, website } = data;
        const user = await clerkClient.users.getUser(userId);

        // Create Customer in Prisma
        const customer = await prisma.customer.create({
            data: {
                email: user.emailAddresses[0]?.emailAddress || "",
                name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username || "",
                type,
                companyName: companyName ?? null,
                website: website ?? null,
            }
        });

        // Update user profile in Clerk
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                onboardingComplete: true,
                customerType: type,
                companyName: companyName ?? undefined,
                website: website ?? undefined,
                customerId: customer.id,
            }
        })

        return {
            success: true,
            message: "Onboarding completed successfully",
            customerId: customer.id,
        }
    } catch (error) {
        console.error("Error during onboarding:", error);
        throw new Error("Onboarding failed. Please try again later.");
    }
}

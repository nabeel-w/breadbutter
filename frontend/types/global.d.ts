import { CustomerType } from "@prisma/client";

export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      customerType?: CustomerType;
      companyName?: string;
      website?: string;
      customerId?: string;
    };
  }

  interface UserPublicMetadata {
    onboardingComplete?: boolean;
    customerType?: CustomerType;
    companyName?: string;
    website?: string;
    customerId?: string;
  }
}

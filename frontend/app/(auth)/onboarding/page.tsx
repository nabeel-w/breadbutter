import OnboardingForm from "@/components/form/onboarding-form"
import { currentUser } from "@clerk/nextjs/server"
import { use } from "react";


export default function Page() {
  const user = use(currentUser());
  return <OnboardingForm userId={user!.id} />
}

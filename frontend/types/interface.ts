import { Recommendation, Talent } from "@prisma/client";

export interface RecommendationData extends Recommendation {
    talent: Talent
}
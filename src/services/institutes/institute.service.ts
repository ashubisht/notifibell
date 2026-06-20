import { findCoachingInstitutes } from "institute-scraper";
import { getGooglePlacesApiKey } from "../../config/env";
import type { InstituteSearchRequest, InstituteSearchResponse } from "../../types/institutes";

export async function searchCoachingInstitutes(
  request: InstituteSearchRequest
): Promise<InstituteSearchResponse> {
  const apiKey = getGooglePlacesApiKey();
  const result = await findCoachingInstitutes(apiKey, {
    city: request.city,
    sources: request.sources,
    dryRun: true,
  });

  return {
    city: result.stats.city,
    validatedCity: result.stats.validatedCity,
    count: result.institutes.length,
    institutes: result.institutes,
    stats: {
      googleCount: result.stats.googleCount,
      justdialCount: result.stats.justdialCount,
      normalizedCount: result.stats.normalizedCount,
      mergedDuplicates: result.stats.mergedDuplicates,
      filteredCount: result.stats.filteredCount,
      uniqueCount: result.stats.uniqueCount,
      sources: result.stats.sources,
      errors: result.stats.errors,
    },
  };
}

import { caseStudies } from "./caseStudy.data";
import type { CaseStudy } from "./caseStudy.types";

export const selectAllCaseStudies = (): CaseStudy[] => caseStudies;

export const selectFeaturedCaseStudies = (): CaseStudy[] =>
  caseStudies.filter((caseStudy) => caseStudy.featured);

export const selectCaseStudyBySlug = (slug?: string): CaseStudy | undefined =>
  caseStudies.find((caseStudy) => caseStudy.slug === slug);

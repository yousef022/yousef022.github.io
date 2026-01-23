import { projects } from "./project.data";
import type { Project } from "./project.types";

export const selectAllProjects = (): Project[] => projects;

export const selectProjectBySlug = (slug?: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

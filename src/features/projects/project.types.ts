export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  stack: string[];
  highlights: string[];
  links?: { label: string; href: string }[];
  featured: boolean;
};

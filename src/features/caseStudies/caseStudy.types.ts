export type CaseStudyGalleryItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  framing?: "full-bleed" | "contained";
  source?: {
    label: string;
    href: string;
  };
};

export type CaseStudyGallery = {
  items: CaseStudyGalleryItem[];
  previewIndex?: number;
  previewPosition?: string;
  source: {
    label: string;
    href: string;
  };
  attribution: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  oneLiner: string;
  ownership: string;
  impact: string;
  stack: string[];
  links?: { label: string; href: string }[];
  company?: {
    name: string;
    attribution: string;
  };
  gallery?: CaseStudyGallery;
  featured: boolean;
  flagship?: boolean;
  detail: {
    overview: string;
    role: string;
    contributions: string[];
    implementation: string[];
    outcome: string;
    note?: string;
  };
};

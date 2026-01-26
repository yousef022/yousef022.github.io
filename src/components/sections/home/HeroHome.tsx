import React, { useMemo } from "react";
import Section from "../../ui/Section";
import HeroBento from "../../ui/base/hero/HeroBento";
import { profile } from "../../../features/profile/profile.data";
import { projects } from "../../../features/projects/project.data";
import {
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  BriefcaseIcon,
  UsersIcon,
  LayersIcon,
  PinIcon,
} from "../../../assets/icons";

const HomeHero: React.FC = () => {
  const emailLink = profile.links.find((l) => l.label === "Email");

  const socials = useMemo(
    () =>
      profile.links
        .filter((l) => ["GitHub", "LinkedIn", "Email"].includes(l.label))
        .map((l) => ({
          label: l.label,
          href: l.href,
          icon:
            l.label === "GitHub" ? <GithubIcon /> : l.label === "LinkedIn" ? <LinkedInIcon /> : <MailIcon />,
        })),
    [],
  );

  const stats = useMemo(
    () => [
      { label: "Experience", value: "2+ yrs", icon: <BriefcaseIcon /> },
      { label: "Startups", value: "3 teams", icon: <UsersIcon /> },
      { label: "Projects", value: `${projects.length}+`, icon: <LayersIcon /> },
      { label: "Location", value: profile.location, icon: <PinIcon /> },
    ],
    [],
  );

  return (
    <Section className="heroSection">
      <HeroBento
        title={profile.name}
        subtitle={profile.role}
        tagline="Shipping product-grade web & mobile apps for startups."
        chips={profile.focus}
        socials={socials}
        stats={stats}
        primaryCta={{ label: "View Projects", href: "/#/projects" }}
        secondaryCta={emailLink ? { label: "Contact", href: emailLink.href } : undefined}
        footerBadges={["Open to startup roles", "Fast shipping • Clean systems"]}
      />
    </Section>
  );
};

export default HomeHero;

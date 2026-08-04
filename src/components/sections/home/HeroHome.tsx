import React, { useMemo } from "react";
import { TbLayoutGrid, TbRocket, TbSparkles, TbStack2 } from "react-icons/tb";
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
import yoMark from "../../../assets/A_YO.svg?url";

const HomeHero: React.FC = () => {
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

  const focusChips = useMemo(
    () =>
      profile.focus.map((label) => ({
        label,
        icon:
          label === "Modern UI" ? <TbSparkles /> :
          label === "Scalable systems" ? <TbLayoutGrid /> :
          label === "Full-stack delivery" ? <TbStack2 /> :
          label === "Startups" ? <TbRocket /> : undefined,
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
        tagline="Shipping product-grade apps & systems for startups."
        chips={focusChips}
        socials={socials}
        stats={stats}
        avatarSrc={yoMark}
        primaryCta={{ label: "View Projects", href: "/#/projects" }}
      />
    </Section>
  );
};

export default HomeHero;

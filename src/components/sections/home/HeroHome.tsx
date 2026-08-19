import React, { useMemo } from "react";
import { TbBrowser, TbCloudComputing, TbDeviceMobile } from "react-icons/tb";
import Section from "../../ui/Section";
import HeroBento from "../../ui/base/hero/HeroBento";
import { profile } from "../../../features/profile/profile.data";
import { selectAllCaseStudies } from "../../../features/caseStudies/caseStudy.selectors";
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

const caseStudyCount = selectAllCaseStudies().length;
const resumeHref = `${import.meta.env.BASE_URL}Yousef-Osman-Resume.pdf`;

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
      profile.hero.focus.map((label) => ({
        label,
        icon:
          label === "Browser & web" ? (
            <TbBrowser />
          ) : label === "Mobile systems" ? (
            <TbDeviceMobile />
          ) : label === "Backend & cloud" ? (
            <TbCloudComputing />
          ) : undefined,
      })),
    [],
  );

  const stats = useMemo(
    () => [
      { label: "Experience", value: "3+ years", icon: <BriefcaseIcon /> },
      { label: "Product teams", value: "3", icon: <UsersIcon /> },
      { label: "Case studies", value: String(caseStudyCount), icon: <LayersIcon /> },
      { label: "Location", value: profile.location, icon: <PinIcon /> },
    ],
    [],
  );

  return (
    <Section className="heroSection">
      <HeroBento
        title={profile.name}
        subtitle={profile.role}
        tagline={profile.hero.tagline}
        chips={focusChips}
        socials={socials}
        stats={stats}
        avatarSrc={yoMark}
        primaryCta={{ label: "View Work", href: "#/projects" }}
        secondaryCta={{ label: "Resume", href: resumeHref, openInNewTab: true }}
      />
    </Section>
  );
};

export default HomeHero;

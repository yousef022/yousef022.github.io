import React, { useMemo } from "react";
import Card from "../../Card";
import Button from "../../Button";
import Tag from "../../Tag";
import "../../../../styles/HeroBento.css";

export type HeroBentoCta = { label: string; href: string };

export type HeroBentoSocial = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export type HeroBentoStat = {
  label: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
};

export type HeroBentoProps = {
  title: string; // usually name
  subtitle?: string; // usually role
  tagline: string;

  avatarText?: string; // e.g. initials; if omitted, computed from title

  primaryCta?: HeroBentoCta;
  secondaryCta?: HeroBentoCta;

  chips?: readonly string[]; // 0..n (we'll render up to 4)
  socials?: HeroBentoSocial[];
  stats?: HeroBentoStat[];

  footerBadges?: string[]; // optional “micro” row
  className?: string;

  avatarSrc?: string; // if provided, overrides initials avatar
};

const HeroBento: React.FC<HeroBentoProps> = ({
  title,
  subtitle,
  tagline,
  avatarText,
  primaryCta,
  secondaryCta,
  chips = [],
  socials = [],
  stats = [],
  footerBadges = [],
  className,
  avatarSrc,
}) => {
  const initials = useMemo(() => {
    if (avatarText?.trim()) return avatarText.trim().slice(0, 2).toUpperCase();
    return title
      .split(" ")
      .filter(Boolean)
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [avatarText, title]);

  return (
    <Card className={`hbCard${className ? ` ${className}` : ""}`}>
      <div className="hb">
        <div className="hbTop">
          <div className="hbId">
            <div className="hbAvatar" aria-hidden>
              {avatarSrc ? (
                <img className="hbAvatarImg" src={avatarSrc} alt="" />
              ) : (
                <div className="hbAvatarText">{initials}</div>
              )}
            </div>

            <div className="hbTitle">
              <div className="hbName">{title}</div>
              {subtitle ? <div className="hbRole">{subtitle}</div> : null}
            </div>
          </div>

          {socials.length ? (
            <div className="hbSocial">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className="hbIconBtn"
                  aria-label={s.label}
                  title={s.label}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="hbIcon">{s.icon}</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="hbBody">
          <div className="hbLeft">
            <p className="hbTagline">{tagline}</p>

            {(primaryCta || secondaryCta) && (
              <div className="hbActions">
                {primaryCta ? <Button href={primaryCta.href}>{primaryCta.label}</Button> : null}
                {secondaryCta ? <Button href={secondaryCta.href}>{secondaryCta.label}</Button> : null}
              </div>
            )}

            {chips.length ? (
              <div className="hbChips">
                {chips.slice(0, 4).map((c) => (
                  <Tag key={c} text={c} />
                ))}
              </div>
            ) : null}
          </div>

          {stats.length ? (
            <div className="hbRight">
              <div className="hbStats">
                {stats.map((st) => (
                  <div key={st.label} className="hbStat">
                    {st.icon ? <div className="hbStatIcon">{st.icon}</div> : null}
                    <div className="hbStatMeta">
                      <div className="hbStatValue">{st.value}</div>
                      <div className="hbStatLabel">{st.label}</div>
                      {st.sub ? <div className="hbStatSub">{st.sub}</div> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {footerBadges.length ? (
          <>
            <div className="hbDivider" />
            <div className="hbFoot">
              {footerBadges.slice(0, 3).map((b) => (
                <span key={b} className="kbd">
                  {b}
                </span>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </Card>
  );
};

export default HeroBento;

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "../../styles/Timeline.css";

export type TimelineEntry = {
  id?: string;
  title: React.ReactNode;
  content: React.ReactNode;
};

export type TimelineProps = {
  data: TimelineEntry[];
  stickyTopPx?: number;
  stickyTitle?: boolean;

  // optional “overall styling” hooks
  className?: string;
  titleWidthPx?: number;
};

const Timeline: React.FC<TimelineProps> = ({
  data,
  stickyTopPx = 84,
  stickyTitle = false,
  className,
  titleWidthPx = 220,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const lineCapPx = 29;

  useEffect(() => {
    if (!measureRef.current) return;

    const el = measureRef.current;
    const update = () => setContentHeight(el.getBoundingClientRect().height);

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, [data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 20%"],
  });

  const usableLineHeight = Math.max(contentHeight - lineCapPx * 2, 0);
  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, usableLineHeight]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const baseOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const itemOffset = prefersReducedMotion ? 0 : 14;
  const titleDur = prefersReducedMotion ? 0.18 : 0.28;
  const contentDur = prefersReducedMotion ? 0.22 : 0.32;
  const afterTitleGap = prefersReducedMotion ? 0.22 : 0.35;
  const rowViewport = { once: false, amount: 0.28, margin: "0px 0px -12% 0px" } as const;

  return (
    <div
      ref={containerRef}
      className={`ac-timeline${className ? ` ${className}` : ""}`}
      data-sticky-title={stickyTitle ? "true" : "false"}
      style={
        {
          ["--ac-sticky-top"]: `${stickyTopPx}px`,
          ["--ac-title-col"]: `${titleWidthPx}px`,
          ["--ac-line-cap"]: `${lineCapPx}px`,
        } as React.CSSProperties
      }
    >
      <div className="ac-timeline__inner" ref={measureRef}>
        <motion.div
          className="ac-timeline__lineBase"
          style={{ height: usableLineHeight, opacity: baseOpacity }}
          aria-hidden
        />

        <motion.div
          className="ac-timeline__lineFill"
          style={{ height: lineHeight, opacity: lineOpacity }}
          aria-hidden
        />

        {data.map((entry, idx) => {
          const rowDelay = prefersReducedMotion ? 0 : Math.min(idx * 0.06, 0.16);
          const contentDelay = rowDelay + titleDur + afterTitleGap;

          return (
            <div key={entry.id ?? `timeline-row-${idx}`} className="ac-timeline__item" data-current={idx === 0 ? "true" : "false"}>
              <div className="ac-timeline__dotWrap" aria-hidden>
                <motion.div
                  className="ac-timeline__dotOuter"
                  initial={{ scale: 0.9, opacity: 0.7 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: rowDelay }}
                  viewport={rowViewport}
                >
                  <div className="ac-timeline__dotInner" />
                </motion.div>
              </div>

              <motion.div
                className="ac-timeline__sticky"
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: titleDur, ease: "easeOut", delay: rowDelay }}
                viewport={rowViewport}
              >
                <div className="ac-timeline__title">{entry.title}</div>
              </motion.div>

              <motion.div
                className="ac-timeline__content"
                initial={{ opacity: 0, y: itemOffset }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: contentDur, ease: "easeOut", delay: contentDelay }}
                viewport={rowViewport}
              >
                {entry.content}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;

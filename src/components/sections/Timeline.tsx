import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../../styles/Timeline.css";

export type TimelineEntry = {
  title: string;
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
    offset: ["start 15%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, contentHeight]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={`ac-timeline${className ? ` ${className}` : ""}`}
      data-sticky-title={stickyTitle ? "true" : "false"}
      style={
        {
          ["--ac-sticky-top"]: `${stickyTopPx}px`,
          ["--ac-title-col"]: `${titleWidthPx}px`,
        } as React.CSSProperties
      }
    >
      <div className="ac-timeline__inner" ref={measureRef}>
        <div className="ac-timeline__lineBase" style={{ height: contentHeight }} />

        <motion.div
          className="ac-timeline__lineFill"
          style={{ height: lineHeight, opacity: lineOpacity }}
          aria-hidden
        />

        {data.map((entry, idx) => (
          <div key={`${entry.title}-${idx}`} className="ac-timeline__item">
            <div className="ac-timeline__dotWrap" aria-hidden>
              <motion.div
                className="ac-timeline__dotOuter"
                initial={{ scale: 0.9, opacity: 0.7 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                viewport={{ once: true, margin: "-20% 0px -60% 0px" }}
              >
                <div className="ac-timeline__dotInner" />
              </motion.div>
            </div>

            <div className="ac-timeline__sticky">
              <div className="ac-timeline__title">{entry.title}</div>
            </div>

            <div className="ac-timeline__content">{entry.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;

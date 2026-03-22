// import React, { useEffect, useRef, useState } from "react";
// import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
// import "../../styles/Timeline.css";

// export type TimelineEntry = {
//   id?: string;
//   title: React.ReactNode;
//   content: React.ReactNode;
// };

// export type TimelineProps = {
//   data: TimelineEntry[];
//   stickyTopPx?: number;
//   stickyTitle?: boolean;

//   // optional “overall styling” hooks
//   className?: string;
//   titleWidthPx?: number;
// };

// const Timeline: React.FC<TimelineProps> = ({
//   data,
//   stickyTopPx = 84,
//   stickyTitle = false,
//   className,
//   titleWidthPx = 220,
// }) => {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const measureRef = useRef<HTMLDivElement | null>(null);
// //   const prefersReducedMotion = useReducedMotion();
//   const lineCapPx = 29;

//   useEffect(() => {
//     if (!measureRef.current) return;

//     const el = measureRef.current;
//     const update = () => setContentHeight(el.getBoundingClientRect().height);

//     update();

//     const ro = new ResizeObserver(update);
//     ro.observe(el);

//     return () => ro.disconnect();
//   }, [data.length]);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start 70%", "end 20%"],
//   });

//   const usableLineHeight = Math.max(contentHeight - lineCapPx * 2, 0);
//   const lineHeight = useTransform(scrollYProgress, [0, 1], [0, usableLineHeight]);
//   const lineOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
//   const baseOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
//   const itemOffset = prefersReducedMotion ? 0 : 14;
//   const titleDur = prefersReducedMotion ? 0.18 : 0.28;
//   const contentDur = prefersReducedMotion ? 0.22 : 0.32;
//   const afterTitleGap = prefersReducedMotion ? 0.22 : 0.35;
//   const rowViewport = { once: false, amount: 0.28, margin: "0px 0px -12% 0px" } as const;

//   return (
//     <div
//       ref={containerRef}
//       className={`ac-timeline${className ? ` ${className}` : ""}`}
//       data-sticky-title={stickyTitle ? "true" : "false"}
//       style={
//         {
//           ["--ac-sticky-top"]: `${stickyTopPx}px`,
//           ["--ac-title-col"]: `${titleWidthPx}px`,
//           ["--ac-line-cap"]: `${lineCapPx}px`,
//         } as React.CSSProperties
//       }
//     >
//       <div className="ac-timeline__inner" ref={measureRef}>
//         <motion.div
//           className="ac-timeline__lineBase"
//           style={{ height: usableLineHeight, opacity: baseOpacity }}
//           aria-hidden
//         />

//         <motion.div
//           className="ac-timeline__lineFill"
//           style={{ height: lineHeight, opacity: lineOpacity }}
//           aria-hidden
//         />

//         {data.map((entry, idx) => {
//           const rowDelay = prefersReducedMotion ? 0 : Math.min(idx * 0.06, 0.16);
//           const contentDelay = rowDelay + titleDur + afterTitleGap;

//           return (
//             <div key={entry.id ?? `timeline-row-${idx}`} className="ac-timeline__item" data-current={idx === 0 ? "true" : "false"}>
//               <div className="ac-timeline__dotWrap" aria-hidden>
//                 <motion.div
//                   className="ac-timeline__dotOuter"
//                   initial={{ scale: 0.9, opacity: 0.7 }}
//                   whileInView={{ scale: 1, opacity: 1 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 20, delay: rowDelay }}
//                   viewport={rowViewport}
//                 >
//                   <div className="ac-timeline__dotInner" />
//                 </motion.div>
//               </div>

//               <motion.div
//                 className="ac-timeline__sticky"
//                 initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: titleDur, ease: "easeOut", delay: rowDelay }}
//                 viewport={rowViewport}
//               >
//                 <div className="ac-timeline__title">{entry.title}</div>
//               </motion.div>

//               <motion.div
//                 className="ac-timeline__content"
//                 initial={{ opacity: 0, y: itemOffset }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: contentDur, ease: "easeOut", delay: contentDelay }}
//                 viewport={rowViewport}
//               >
//                 {entry.content}
//               </motion.div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Timeline;

import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
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
  className?: string;
  titleWidthPx?: number;
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const MIN_REVEAL_OFFSET_PX = 88;
const REVEAL_OFFSET_RATIO = 0.12;
type Segment = { top: number; height: number };

const Timeline: React.FC<TimelineProps> = ({
  data,
  stickyTopPx = 84,
  stickyTitle = false,
  className,
  titleWidthPx = 220,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  const dotWrapRefs = useRef<Array<HTMLDivElement | null>>([]);
  const segmentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const prefersReducedMotion = useReducedMotion();
  const lineCapPx = 29;
  const dotRadiusPx = 11; // dotOuter is 22px
  const [segments, setSegments] = useState<Segment[]>([]);

  // which company is revealed
  const [builtItemIdx, setBuiltItemIdx] = useState(-1);

  // click ripple state
  const [click, setClick] = useState<{ idx: number; nonce: number }>({ idx: -1, nonce: 0 });
  const clickClearRef = useRef<number | null>(null);

  const [pendingDotIdx, setPendingDotIdx] = useState(-1);

  const stopsRef = useRef<number[]>([]); // dot centers relative to line start
  const currentStopIdxRef = useRef(-1);
  const targetStopIdxRef = useRef<number | null>(null);
  const animTokenRef = useRef(0);

  const triggerClick = (idx: number) => {
    setClick((prev) => ({ idx, nonce: prev.nonce + 1 }));
    if (clickClearRef.current) window.clearTimeout(clickClearRef.current);
    clickClearRef.current = window.setTimeout(() => {
      setClick((prev) => (prev.idx === idx ? { ...prev, idx: -1 } : prev));
      clickClearRef.current = null;
    }, 260);
  };

  const computeTargetStopIdx = () => {
    if (typeof window === "undefined") return -1;

    const revealLine = window.innerHeight - Math.max(MIN_REVEAL_OFFSET_PX, window.innerHeight * REVEAL_OFFSET_RATIO);
    let idx = -1;
    for (let i = 0; i < data.length; i++) {
      const dotEl = dotWrapRefs.current[i];
      if (!dotEl) continue;

      const rect = dotEl.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      if (centerY <= revealLine) idx = i;
    }
    return idx;
  };
  const setSegmentScale = (segIndex: number, scaleY: number) => {
    const el = segmentRefs.current[segIndex];
    if (!el) return;
    el.style.transform = `scaleY(${scaleY})`;
  };

  const runToStop = async (targetStopIdx: number) => {
    const token = ++animTokenRef.current;
    const currentStopIdx = currentStopIdxRef.current;

    // backward: snap-hide segments/items above target
    if (targetStopIdx < currentStopIdx) {
      currentStopIdxRef.current = targetStopIdx;
      setBuiltItemIdx(targetStopIdx);
      setPendingDotIdx(-1); // ✅ add this

      for (let s = 0; s < segments.length; s++) {
        if (s >= targetStopIdx) setSegmentScale(s, 0);
        else setSegmentScale(s, 1);
      }
      return;
    }

    // forward: step stop-by-stop:
    // stop 0: click + reveal company 0
    // stop i>0: animate segment (i-1) -> click dot i -> reveal company i
    for (let i = currentStopIdx + 1; i <= targetStopIdx; i++) {
      if (animTokenRef.current !== token) return;

      if (i === 0) {
        triggerClick(0);
        setBuiltItemIdx(0);
        currentStopIdxRef.current = 0;
        setPendingDotIdx(-1);
        if (!prefersReducedMotion) await new Promise((r) => setTimeout(r, 150));
        continue;
      }

      // show the next dot right before we connect to it
      setPendingDotIdx(i);

      // animate segment (i-1) down to dot i
      const segEl = segmentRefs.current[i - 1];
      if (segEl) {
        if (prefersReducedMotion) {
          setSegmentScale(i - 1, 1);
        } else {
          await animate(segEl, { scaleY: 1 }, { type: "spring", stiffness: 220, damping: 24, mass: 0.4 })
            .finished;
        }
      }

      triggerClick(i);
      setBuiltItemIdx(i);
      currentStopIdxRef.current = i;

      // dot i is now built (not pending anymore)
      setPendingDotIdx(-1);

      if (!prefersReducedMotion) await new Promise((r) => setTimeout(r, 150));
    }
  };

  // Measure dots -> create segments between them -> reset segment scales -> sync to scroll position
  useEffect(() => {
    if (!measureRef.current) return;
    const el = measureRef.current;

    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!measureRef.current) return;

        const containerRect = measureRef.current.getBoundingClientRect();
        const h = containerRect.height;

        const usable = Math.max(h - lineCapPx * 2, 0);

        // dot centers -> stops (relative to line start)
        const stops = dotWrapRefs.current.slice(0, data.length).map((dotEl) => {
          if (!dotEl) return 0;
          const r = dotEl.getBoundingClientRect();
          const centerY = r.top - containerRect.top + r.height / 2;
          const stop = centerY - lineCapPx;
          return Math.min(Math.max(stop, 0), usable);
        });

        if (stops.length) stops[0] = 0;
        for (let i = 1; i < stops.length; i++) stops[i] = Math.max(stops[i], stops[i - 1]);

        // Build segments BETWEEN DOTS ONLY: (0->1), (1->2), ...
        const nextSegments: Segment[] = [];
        for (let i = 0; i < stops.length - 1; i++) {
          // gap so line “connects” into dots (doesn't run through the circle)
          const top = stops[i] + dotRadiusPx;
          const height = Math.max(stops[i + 1] - stops[i] - dotRadiusPx * 2, 0);
          nextSegments.push({ top, height });
        }

        stopsRef.current = stops;
        setSegments(nextSegments);

        // reset segment scales (so the bar is NOT fully rendered)
        segmentRefs.current.forEach((seg) => {
          if (seg) seg.style.transform = "scaleY(0)";
        });
        currentStopIdxRef.current = -1;
        setBuiltItemIdx(-1);

        // sync to current scroll position and build up to that stop
        const idx = computeTargetStopIdx();
        targetStopIdxRef.current = idx;
        runToStop(idx);
      });
    };

    const ro = new ResizeObserver(update);
    ro.observe(el);

    update();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (clickClearRef.current) window.clearTimeout(clickClearRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, lineCapPx, prefersReducedMotion]);

  // Scroll/resize -> when the viewport crosses a dot, step build
  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const idx = computeTargetStopIdx();
        if (targetStopIdxRef.current === idx) return;
        targetStopIdxRef.current = idx;
        runToStop(idx);
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, segments.length]);
  const titleDur = prefersReducedMotion ? 0.18 : 0.32;
  const contentDur = prefersReducedMotion ? 0.2 : 0.38;
  const itemOffset = prefersReducedMotion ? 0 : 14;

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
        {/* NO full-height base line. We render segments only. */}
        {segments.map((seg, i) => (
          <div
            key={`seg-${i}`}
            ref={(el) => {
              segmentRefs.current[i] = el;
            }}
            className="ac-timeline__seg"
            style={{
              top: lineCapPx + seg.top,
              height: seg.height,
            }}
            aria-hidden
          />
        ))}

        {data.map((entry, idx) => {
          const isRevealed = builtItemIdx >= idx;
          const isPending = pendingDotIdx === idx; // ✅ add
          const isClicked = click.idx === idx;

          // show only if built OR pending OR currently clicking
          const showDot = isRevealed || isPending || isClicked;

          return (
            <div
              key={entry.id ?? `timeline-row-${idx}`}
              className="ac-timeline__item"
              data-current={idx === 0 ? "true" : "false"}
            >
              <div
                className="ac-timeline__dotWrap"
                aria-hidden
                ref={(el) => {
                  dotWrapRefs.current[idx] = el;
                }}
                style={{ opacity: showDot ? 1 : 0 }}  // ✅ safeguard
              >
                {/* click ripple */}
                {isClicked && (
                  <motion.span
                    key={`ripple-${idx}-${click.nonce}`}
                    className="ac-timeline__dotRipple"
                    initial={{ scale: 0.25, opacity: 0.0 }}
                    animate={{ scale: 2.1, opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.22 : 0.52, ease: EASE_OUT }}
                  />
                )}

                <motion.div
                  className="ac-timeline__dotOuter"
                  initial={{ scale: 0.75, opacity: 0 }}
                  animate={
                    showDot
                      ? isRevealed
                        ? isClicked
                          ? { scale: [1, 1.28, 1], opacity: 1 }
                          : { scale: 1, opacity: 1 }
                        : { scale: 0.95, opacity: 0.85 } // ✅ pending dot (only right before connect)
                      : { scale: 0.75, opacity: 0 } // ✅ fully invisible
                  }
                  transition={{ duration: prefersReducedMotion ? 0.2 : 0.34, ease: EASE_OUT }}
                >
                  <div className="ac-timeline__dotInner" />
                </motion.div>
              </div>

              {/* reveal company name ONLY when that stop is reached */}
              <motion.div
                className="ac-timeline__sticky"
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -12, filter: "blur(4px)" }}
                animate={
                  isRevealed
                    ? { opacity: 1, x: 0, filter: "blur(0px)" }
                    : { opacity: 0, x: prefersReducedMotion ? 0 : -12, filter: "blur(4px)" }
                }
                transition={{ duration: titleDur, ease: EASE_OUT, delay: isRevealed ? 0.05 : 0 }}
                style={{ pointerEvents: isRevealed ? "auto" : "none" }}
              >
                <div className="ac-timeline__title">{entry.title}</div>
              </motion.div>

              {/* reveal details card AFTER company name */}
              <motion.div
                className="ac-timeline__content"
                initial={{ opacity: 0, y: itemOffset, filter: "blur(4px)" }}
                animate={
                  isRevealed
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: itemOffset, filter: "blur(4px)" }
                }
                transition={{ duration: contentDur, ease: EASE_OUT, delay: isRevealed ? 0.22 : 0 }}
                style={{ pointerEvents: isRevealed ? "auto" : "none" }}
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









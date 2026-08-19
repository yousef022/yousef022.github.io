import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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

type Segment = { top: number; height: number };

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const MIN_REVEAL_OFFSET_PX = 88;
const REVEAL_OFFSET_RATIO = 0.12;
const MARKER_PAUSE_MS = 130;
const HEAD_SIZE_PX = 6;

const segmentGeometryMatches = (current: Segment[], next: Segment[]) =>
  current.length === next.length &&
  current.every(
    (segment, index) =>
      Math.abs(segment.top - next[index].top) < 0.5 &&
      Math.abs(segment.height - next[index].height) < 0.5
  );

const Timeline: React.FC<TimelineProps> = ({
  data,
  stickyTopPx = 84,
  stickyTitle = false,
  className,
  titleWidthPx = 220,
}) => {
  const measureRef = useRef<HTMLDivElement | null>(null);
  const dotWrapRefs = useRef<Array<HTMLDivElement | null>>([]);
  const segmentRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const segmentHeadRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const lineCapPx = 29;
  const dotRadiusPx = 8;

  const [segments, setSegments] = useState<Segment[]>([]);
  const [measuredDataLength, setMeasuredDataLength] = useState(-1);
  const [targetStopIdx, setTargetStopIdx] = useState(-1);
  const [builtItemIdx, setBuiltItemIdx] = useState(-1);
  const [click, setClick] = useState<{ idx: number; nonce: number }>({ idx: -1, nonce: 0 });
  const [pendingDotIdx, setPendingDotIdx] = useState(-1);

  const currentStopIdxRef = useRef(-1);
  const animTokenRef = useRef(0);
  const activeAnimationsRef = useRef<Array<ReturnType<typeof animate>>>([]);
  const clickClearRef = useRef<number | null>(null);

  const triggerClick = useCallback((idx: number) => {
    setClick((previous) => ({ idx, nonce: previous.nonce + 1 }));
    if (clickClearRef.current) window.clearTimeout(clickClearRef.current);
    clickClearRef.current = window.setTimeout(() => {
      setClick((previous) => (previous.idx === idx ? { ...previous, idx: -1 } : previous));
      clickClearRef.current = null;
    }, 360);
  }, []);

  const computeTargetStopIdx = useCallback(() => {
    if (typeof window === "undefined") return -1;

    const revealLine =
      window.innerHeight -
      Math.max(MIN_REVEAL_OFFSET_PX, window.innerHeight * REVEAL_OFFSET_RATIO);
    let idx = -1;

    for (let i = 0; i < data.length; i += 1) {
      const dotElement = dotWrapRefs.current[i];
      if (!dotElement) continue;

      const rect = dotElement.getBoundingClientRect();
      if (rect.top + rect.height / 2 <= revealLine) idx = i;
    }

    return idx;
  }, [data.length]);

  const setSegmentScale = useCallback((segmentIndex: number, scaleY: number) => {
    const element = segmentRefs.current[segmentIndex];
    if (element) element.style.transform = `scaleY(${scaleY})`;
  }, []);

  const resetSegmentHead = useCallback((segmentIndex: number) => {
    const element = segmentHeadRefs.current[segmentIndex];
    if (!element) return;
    element.style.opacity = "0";
    element.style.transform = "translateY(0px)";
  }, []);

  useLayoutEffect(() => {
    if (!measureRef.current) return;
    const element = measureRef.current;
    dotWrapRefs.current.length = data.length;
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!measureRef.current) return;

        const containerRect = measureRef.current.getBoundingClientRect();
        const usableHeight = Math.max(containerRect.height - lineCapPx * 2, 0);
        const stops = dotWrapRefs.current.slice(0, data.length).map((dotElement) => {
          if (!dotElement) return 0;
          const rect = dotElement.getBoundingClientRect();
          const centerY = rect.top - containerRect.top + rect.height / 2;
          return Math.min(Math.max(centerY - lineCapPx, 0), usableHeight);
        });

        if (stops.length) stops[0] = 0;
        for (let i = 1; i < stops.length; i += 1) {
          stops[i] = Math.max(stops[i], stops[i - 1]);
        }

        const nextSegments: Segment[] = [];
        for (let i = 0; i < stops.length - 1; i += 1) {
          const top = stops[i] + dotRadiusPx;
          const height = Math.max(stops[i + 1] - stops[i] - dotRadiusPx * 2, 0);
          nextSegments.push({ top, height });
        }

        setSegments((current) =>
          segmentGeometryMatches(current, nextSegments) ? current : nextSegments
        );
        setMeasuredDataLength(data.length);
        setTargetStopIdx(computeTargetStopIdx());
      });
    };

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);
    update();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [computeTargetStopIdx, data.length, dotRadiusPx, lineCapPx]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nextIndex = computeTargetStopIdx();
        setTargetStopIdx((current) => (current === nextIndex ? current : nextIndex));
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [computeTargetStopIdx]);

  useLayoutEffect(() => {
    segmentRefs.current.length = segments.length;
    segmentHeadRefs.current.length = segments.length;
    const builtThrough = currentStopIdxRef.current;

    segments.forEach((_, index) => {
      setSegmentScale(index, index < builtThrough ? 1 : 0);
      resetSegmentHead(index);
    });
  }, [resetSegmentHead, segments, setSegmentScale]);

  useEffect(() => {
    if (
      measuredDataLength !== data.length ||
      segments.length !== Math.max(data.length - 1, 0)
    ) {
      return;
    }

    const token = ++animTokenRef.current;
    let disposed = false;

    const isStale = () => disposed || animTokenRef.current !== token;
    const stopActiveAnimations = () => {
      activeAnimationsRef.current.forEach((controls) => controls.stop());
      activeAnimationsRef.current = [];
    };
    const wait = (duration: number) =>
      new Promise<void>((resolve) => window.setTimeout(resolve, duration));

    stopActiveAnimations();
    segmentHeadRefs.current.forEach((_, index) => resetSegmentHead(index));

    const drawSegment = async (segmentIndex: number) => {
      const element = segmentRefs.current[segmentIndex];
      const head = segmentHeadRefs.current[segmentIndex];
      const geometry = segments[segmentIndex];
      if (!element || !geometry) return;

      if (prefersReducedMotion) {
        setSegmentScale(segmentIndex, 1);
        return;
      }

      const progress = Math.min(
        Math.max(element.getBoundingClientRect().height / Math.max(geometry.height, 1), 0),
        1
      );
      const remaining = 1 - progress;
      const baseDuration = Math.min(0.64, Math.max(0.46, geometry.height / 720));
      const duration = Math.max(0.14, baseDuration * remaining);
      const fillControls = animate(element, { scaleY: 1 }, { duration, ease: EASE_OUT });
      const controls = [fillControls];

      if (head && geometry.height > HEAD_SIZE_PX) {
        const travel = geometry.height - HEAD_SIZE_PX;
        const start = travel * progress;
        const distance = travel - start;
        const headControls = animate(
          head,
          {
            y: [start, start + distance * 0.1, start + distance * 0.88, travel],
            opacity: [0, 1, 1, 0],
          },
          { duration, times: [0, 0.1, 0.86, 1], ease: "linear" }
        );
        controls.push(headControls);
      }

      activeAnimationsRef.current = controls;
      try {
        await Promise.all(controls.map((animationControls) => animationControls.finished));
      } catch {
        // A newer scroll position intentionally superseded this animation.
      }
      activeAnimationsRef.current = [];
      resetSegmentHead(segmentIndex);
    };

    const retractSegment = async (segmentIndex: number) => {
      const element = segmentRefs.current[segmentIndex];
      if (!element) return;

      resetSegmentHead(segmentIndex);
      if (prefersReducedMotion) {
        setSegmentScale(segmentIndex, 0);
        return;
      }

      const geometry = segments[segmentIndex];
      const progress = geometry
        ? Math.min(
            Math.max(element.getBoundingClientRect().height / Math.max(geometry.height, 1), 0),
            1
          )
        : 1;
      const controls = animate(
        element,
        { scaleY: 0 },
        { duration: Math.max(0.1, 0.2 * progress), ease: EASE_OUT }
      );
      activeAnimationsRef.current = [controls];

      try {
        await controls.finished;
      } catch {
        // A newer scroll position intentionally superseded this animation.
      }
      activeAnimationsRef.current = [];
    };

    const run = async () => {
      await Promise.resolve();
      if (isStale()) return;
      setPendingDotIdx(-1);

      const currentStopIdx = currentStopIdxRef.current;

      if (targetStopIdx < currentStopIdx) {
        setBuiltItemIdx(targetStopIdx);

        for (let index = currentStopIdx; index > targetStopIdx; index -= 1) {
          if (isStale()) return;
          const segmentIndex = index - 1;
          if (segmentIndex >= 0) await retractSegment(segmentIndex);
          if (isStale()) return;
          currentStopIdxRef.current = index - 1;
        }

        segments.forEach((_, index) => {
          setSegmentScale(index, index < targetStopIdx ? 1 : 0);
        });
        currentStopIdxRef.current = targetStopIdx;
        return;
      }

      if (targetStopIdx === currentStopIdx) {
        setBuiltItemIdx(currentStopIdx);
        segments.forEach((_, index) => {
          setSegmentScale(index, index < currentStopIdx ? 1 : 0);
        });
        return;
      }

      for (let index = currentStopIdx + 1; index <= targetStopIdx; index += 1) {
        if (isStale()) return;

        if (index > 0) {
          setPendingDotIdx(index);
          await drawSegment(index - 1);
          if (isStale()) return;
        }

        triggerClick(index);
        setBuiltItemIdx(index);
        setPendingDotIdx(-1);
        currentStopIdxRef.current = index;

        if (!prefersReducedMotion) {
          await wait(MARKER_PAUSE_MS);
          if (isStale()) return;
        }
      }
    };

    void run();

    return () => {
      disposed = true;
      if (animTokenRef.current === token) animTokenRef.current += 1;
      stopActiveAnimations();
    };
  }, [
    data.length,
    measuredDataLength,
    prefersReducedMotion,
    resetSegmentHead,
    segments,
    setSegmentScale,
    targetStopIdx,
    triggerClick,
  ]);

  useEffect(
    () => () => {
      if (clickClearRef.current) window.clearTimeout(clickClearRef.current);
    },
    []
  );

  const titleDuration = prefersReducedMotion ? 0 : 0.34;
  const contentDuration = prefersReducedMotion ? 0 : 0.42;
  const itemOffset = prefersReducedMotion ? 0 : 12;
  const itemBlur = prefersReducedMotion ? "blur(0px)" : "blur(2px)";

  return (
    <div
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
        {segments.map((segment, index) => (
          <div
            className="ac-timeline__segment"
            key={`segment-${index}`}
            style={{ top: lineCapPx + segment.top, height: segment.height }}
            aria-hidden
          >
            <span className="ac-timeline__segmentTrack" />
            <span
              className="ac-timeline__segmentFill"
              ref={(element) => {
                segmentRefs.current[index] = element;
              }}
            />
            <span
              className="ac-timeline__segmentHead"
              ref={(element) => {
                segmentHeadRefs.current[index] = element;
              }}
            />
          </div>
        ))}

        {data.map((entry, index) => {
          const isRevealed = builtItemIdx >= index;
          const isPending = pendingDotIdx === index;
          const isClicked = click.idx === index;
          const showDot = isRevealed || isPending || isClicked;

          return (
            <div
              className="ac-timeline__item"
              data-current={index === 0 ? "true" : "false"}
              key={entry.id ?? `timeline-row-${index}`}
            >
              <div
                className="ac-timeline__dotWrap"
                data-state={isRevealed ? "locked" : isPending ? "pending" : "hidden"}
                aria-hidden
                ref={(element) => {
                  dotWrapRefs.current[index] = element;
                }}
                style={{ opacity: showDot ? 1 : 0 }}
              >
                {isClicked && !prefersReducedMotion && (
                  <motion.span
                    className="ac-timeline__contactRing"
                    key={`contact-${index}-${click.nonce}`}
                    initial={{ scale: 0.7, opacity: 0.8 }}
                    animate={{ scale: 1.65, opacity: 0 }}
                    transition={{ duration: 0.36, ease: EASE_OUT }}
                  />
                )}

                <motion.span
                  className="ac-timeline__branch"
                  initial={false}
                  animate={
                    isRevealed
                      ? { scaleX: 1, opacity: 1 }
                      : { scaleX: 0, opacity: 0 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.18,
                    ease: EASE_OUT,
                    delay: isRevealed && !prefersReducedMotion ? 0.04 : 0,
                  }}
                />

                <motion.div
                  className="ac-timeline__dotOuter"
                  initial={false}
                  animate={
                    showDot
                      ? isRevealed
                        ? isClicked
                          ? { scale: [0.82, 1.12, 1], rotate: [-14, 3, 0], opacity: 1 }
                          : { scale: 1, rotate: 0, opacity: 1 }
                        : { scale: 0.76, rotate: -18, opacity: 0.34 }
                      : { scale: 0.62, rotate: -24, opacity: 0 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : isClicked ? 0.34 : 0.2,
                    ease: EASE_OUT,
                  }}
                >
                  <span className="ac-timeline__dotInner" />
                </motion.div>
              </div>

              <motion.div
                className="ac-timeline__sticky"
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10, filter: itemBlur }}
                animate={
                  isRevealed
                    ? { opacity: 1, x: 0, filter: "blur(0px)" }
                    : { opacity: 0, x: prefersReducedMotion ? 0 : -10, filter: itemBlur }
                }
                transition={{
                  duration: titleDuration,
                  ease: EASE_OUT,
                  delay: isRevealed && !prefersReducedMotion ? 0.08 : 0,
                }}
                style={{ pointerEvents: isRevealed ? "auto" : "none" }}
              >
                <div className="ac-timeline__title">{entry.title}</div>
              </motion.div>

              <motion.div
                className="ac-timeline__content"
                initial={{ opacity: 0, y: itemOffset, filter: itemBlur }}
                animate={
                  isRevealed
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: itemOffset, filter: itemBlur }
                }
                transition={{
                  duration: isRevealed ? contentDuration : titleDuration,
                  ease: EASE_OUT,
                  delay: isRevealed && !prefersReducedMotion ? 0.24 : 0,
                }}
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

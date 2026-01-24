import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

type Props = { containerEl: HTMLElement | null };

const NavPill: React.FC<Props> = ({ containerEl }) => {
  const location = useLocation();

  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const getActiveEl = () => {
    const root = containerEl;
    if (!root) return null;

    return (
      (root.querySelector('a[aria-current="page"]') as HTMLElement | null) ??
      (root.querySelector("a") as HTMLElement | null)
    );
  };

  // Apply pill position/size directly to the DOM element (no React state)
  const apply = (el: HTMLElement | null) => {
    const root = containerEl;
    const indicator = indicatorRef.current;
    if (!root || !indicator || !el) return;

    const rootBox = root.getBoundingClientRect();
    const elBox = el.getBoundingClientRect();

    const x = elBox.left - rootBox.left;
    const y = elBox.top - rootBox.top;

    indicator.style.width = `${elBox.width}px`;
    indicator.style.height = `${elBox.height}px`;
    indicator.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    indicator.dataset.ready = "true";
  };

  const scheduleApply = (el?: HTMLElement | null) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => apply(el ?? getActiveEl()));
  };

  useLayoutEffect(() => {
    const root = containerEl;
    if (!root) return;

    // First load
    scheduleApply();

    // Re-measure on resize
    const onResize = () => scheduleApply();
    window.addEventListener("resize", onResize);

    // Re-measure if nav wraps / size changes
    const ro = new ResizeObserver(() => scheduleApply());
    ro.observe(root);

    // Hover/focus preview
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      const a = t?.closest?.("a") as HTMLElement | null;
      if (a && root.contains(a)) scheduleApply(a);
    };

    const onLeave = () => scheduleApply();

    root.addEventListener("pointerover", onOver);
    root.addEventListener("focusin", onOver);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusout", onLeave);

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      root.removeEventListener("pointerover", onOver);
      root.removeEventListener("focusin", onOver);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusout", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerEl]);

  // Route change -> aria-current changes -> re-measure
  useLayoutEffect(() => {
    scheduleApply();
  }, [location.pathname, location.hash]);

  // Always render the indicator; it becomes visible once data-ready="true"
  return <span ref={indicatorRef} className="navIndicator" data-ready="false" />;
};

export default NavPill;

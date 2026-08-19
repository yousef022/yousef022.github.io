import { useId, useRef, useState, type KeyboardEvent } from "react";
import { TbArrowUpRight, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import type { CaseStudyGallery as CaseStudyGalleryData } from "../../../features/caseStudies/caseStudy.types";

type Props = {
  productName: string;
  gallery: CaseStudyGalleryData;
};

const resolvePublicSrc = (src: string) => {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;
  return `${normalizedBase}${normalizedSrc}`;
};

const CaseStudyGallery: React.FC<Props> = ({ productName, gallery }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const galleryId = useId();
  const activeItem = gallery.items[activeIndex];
  const itemCount = gallery.items.length;
  const activeSource = activeItem?.source ?? gallery.source;

  const selectItem = (index: number, focus = false) => {
    const nextIndex = (index + itemCount) % itemCount;
    setActiveIndex(nextIndex);
    if (focus) tabRefs.current[nextIndex]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectItem(index + 1, true);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectItem(index - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectItem(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      selectItem(itemCount - 1, true);
    }
  };

  if (!activeItem) return null;

  return (
    <section className="caseGallery" aria-labelledby={`${galleryId}-title`}>
      <div className="caseGallery__header">
        <h2 id={`${galleryId}-title`}>Product gallery</h2>

        {itemCount > 1 ? (
          <div className="caseGallery__controls">
            <span aria-live="polite">
              {activeIndex + 1} / {itemCount}
            </span>
            <button type="button" onClick={() => selectItem(activeIndex - 1)} aria-label="Previous image">
              <TbChevronLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={() => selectItem(activeIndex + 1)} aria-label="Next image">
              <TbChevronRight aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      <figure className="caseGallery__figure">
        <div
          id={`${galleryId}-panel`}
          className={
            activeItem.framing === "contained"
              ? "caseGallery__stage caseGallery__stage--contained"
              : "caseGallery__stage"
          }
          role="tabpanel"
          aria-labelledby={`${galleryId}-tab-${activeIndex}`}
        >
          <img
            key={activeItem.src}
            src={resolvePublicSrc(activeItem.src)}
            alt={activeItem.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className="caseGallery__caption">
          <p>{activeItem.caption}</p>
          <a href={activeSource.href} target="_blank" rel="noreferrer noopener">
            Source: {activeSource.label}
            <TbArrowUpRight aria-hidden="true" />
          </a>
        </figcaption>
      </figure>

      {itemCount > 1 ? (
        <div className="caseGallery__tabs" role="tablist" aria-label={`${productName} gallery images`}>
          {gallery.items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={item.src}
                id={`${galleryId}-tab-${index}`}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${galleryId}-panel`}
                tabIndex={isActive ? 0 : -1}
                className={isActive ? "caseGallery__tab is-active" : "caseGallery__tab"}
                onClick={() => selectItem(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span className="caseGallery__thumbnail" aria-hidden="true">
                  <img src={resolvePublicSrc(item.src)} alt="" loading="lazy" decoding="async" />
                </span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="caseGallery__attribution">{gallery.attribution}</p>
    </section>
  );
};

export default CaseStudyGallery;

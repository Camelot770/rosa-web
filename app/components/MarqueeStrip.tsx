import { Fragment } from 'react';

interface MarqueeStripProps {
  /** Pieces of text to print, joined by an editorial separator. */
  items: string[];
  /** Animation duration in seconds for one full pass. */
  durationSec?: number;
}

/**
 * Slow infinite horizontal ticker — a magazine-spine cue running across
 * the page. The content is duplicated three times inside the track so
 * the keyframe can translate by exactly one-third and loop seamlessly
 * regardless of viewport width.
 *
 * Lives outside the regular content rhythm: thin strip with a paper-2
 * background and the same mono-uppercase voice as the page markers.
 */
export function MarqueeStrip({ items, durationSec = 60 }: MarqueeStripProps) {
  const line = items.join('  ✦  ');
  return (
    <div
      className="marquee-strip"
      aria-hidden="true"
      style={{ ['--marquee-duration' as string]: `${durationSec}s` }}
    >
      <div className="marquee-track">
        {[0, 1, 2].map((i) => (
          <Fragment key={i}>
            <span className="marquee-line">{line}</span>
            <span className="marquee-sep" aria-hidden="true">
              ✦
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

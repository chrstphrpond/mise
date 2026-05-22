"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Per-character blur reveal. Splits the string by word so word boundaries are
 * preserved (each word is an inline-block container that can't break in the
 * middle), then animates each character with a small y + opacity + blur tween.
 *
 * Word-spacing is rendered as a literal space text node between word spans,
 * which the browser collapses correctly between adjacent inline-blocks. Don't
 * put the space inside the word's inline-block — trailing whitespace inside an
 * inline-block container collapses to zero width.
 *
 * a11y: chars are aria-hidden; the heading's accessible name comes from a
 * visually-hidden mirror of the full string plus aria-label on the wrapper.
 */
export function BlurTextEffect({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = children.split(" ");

  // Precompute the start char index per word so the stagger reads as one
  // continuous line rather than restarting per word.
  const wordStartIndices = words.reduce<number[]>((acc, _word, idx) => {
    if (idx === 0) acc.push(0);
    else acc.push(acc[idx - 1] + words[idx - 1].length + 1);
    return acc;
  }, []);

  return (
    <span className={`inline ${className}`} aria-label={children}>
      <span className="sr-only">{children}</span>
      {words.map((word, wIdx) => {
        const chars = Array.from(word);
        const wordStart = wordStartIndices[wIdx];
        return (
          <Fragment key={`${word}-${wIdx}`}>
            <span aria-hidden className="inline-block whitespace-nowrap">
              {chars.map((ch, i) => {
                const delay = reduce ? 0 : (wordStart + i) * 0.015;
                return (
                  <motion.span
                    key={`${ch}-${i}`}
                    className="inline-block"
                    initial={
                      reduce
                        ? { opacity: 1 }
                        : { opacity: 0, y: 10, filter: "blur(8px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 1, 0.5, 1],
                      delay,
                    }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </span>
            {wIdx < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </span>
  );
}

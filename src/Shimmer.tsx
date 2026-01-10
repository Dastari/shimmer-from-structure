import React, { useLayoutEffect, useState, useRef } from 'react';
import { ShimmerProps, ElementInfo } from './types';

/**
 * Check if an element is a "leaf" content element that should be rendered as shimmer
 */
function isLeafElement(element: Element): boolean {
  const tag = element.tagName.toLowerCase();
  
  // Always include these elements as they're always content
  const alwaysInclude = ['img', 'svg', 'video', 'canvas', 'iframe', 'input', 'textarea', 'button'];
  if (alwaysInclude.includes(tag)) {
    return true;
  }

  // Check if element has no element children (only text nodes or no children)
  const hasElementChildren = Array.from(element.children).length > 0;
  if (!hasElementChildren) {
    // This is a leaf element (contains only text or is empty)
    return true;
  }

  return false;
}

/**
 * Extracts dimension information from content-bearing elements in a DOM tree
 */
function extractElementInfo(element: Element, parentRect: DOMRect): ElementInfo[] {
  const elements: ElementInfo[] = [];
  const rect = element.getBoundingClientRect();
  
  // Skip elements with no dimensions
  if (rect.width === 0 || rect.height === 0) {
    return elements;
  }

  // If this is a leaf element, capture it
  if (isLeafElement(element)) {
    const info: ElementInfo = {
      x: rect.left - parentRect.left,
      y: rect.top - parentRect.top,
      width: rect.width,
      height: rect.height,
      tag: element.tagName.toLowerCase(),
    };
    elements.push(info);
  } else {
    // Otherwise, recursively process children
    Array.from(element.children).forEach((child) => {
      elements.push(...extractElementInfo(child, parentRect));
    });
  }

  return elements;
}

/**
 * Shimmer component that adapts to the actual rendered structure of its children
 */
export const Shimmer: React.FC<ShimmerProps> = ({
  children,
  loading = true,
  shimmerColor = '#e0e0e0',
  backgroundColor = '#f0f0f0',
  duration = 1.5,
  borderRadius = 4,
}) => {
  const [elements, setElements] = useState<ElementInfo[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  // Measure the structure using useLayoutEffect (synchronous, before paint)
  useLayoutEffect(() => {
    if (!loading || !measureRef.current) return;

    const container = measureRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Extract all element dimensions
    const extractedElements: ElementInfo[] = [];
    Array.from(container.children).forEach((child) => {
      extractedElements.push(...extractElementInfo(child, containerRect));
    });

    setElements(extractedElements);
  }, [loading, children]);

  if (!loading) {
    return <>{children}</>;
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Hidden version to measure - rendered invisibly in place */}
      <div
        ref={measureRef}
        style={{
          opacity: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Shimmer overlay based on measured dimensions */}
      <div
        ref={contentRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        <style>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>

        {elements.map((element, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${element.x}px`,
              top: `${element.y}px`,
              width: `${element.width}px`,
              height: `${element.height}px`,
              backgroundColor,
              borderRadius: `${borderRadius}px`,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
                animation: `shimmer ${duration}s infinite`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

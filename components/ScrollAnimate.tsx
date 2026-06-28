"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollAnimateProps extends React.ComponentProps<"div"> {
  animation?: "fade-in" | "slide-up" | "scale-up";
  duration?: number;
  delay?: number;
}

export function ScrollAnimate({
  children,
  className,
  animation = "slide-up",
  duration = 600,
  delay = 0,
  ...props
}: ScrollAnimateProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after showing the animation to avoid unnecessary recalculations
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before it enters the viewport fully
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getAnimationClass = () => {
    if (animation === "fade-in") {
      return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0";
    }
    if (animation === "scale-up") {
      return isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95";
    }
    // slide-up (default)
    return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-all ease-out",
        getAnimationClass(),
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

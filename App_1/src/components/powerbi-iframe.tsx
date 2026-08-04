//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface PowerBiIframeProps {
  title: string;
  src: string;
  className?: string;
}

type IframeState = "loading" | "loaded" | "error";

export function PowerBiIframe({ title, src, className }: PowerBiIframeProps) {
  const [state, setState] = useState<IframeState>("loading");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = useCallback(() => {
    setState("loaded");
  }, []);

  const handleError = useCallback(() => {
    setState("error");
  }, []);

  const handleRetry = useCallback(() => {
    setState("loading");
    // Force re-render by changing the src slightly (re-attach)
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = "";
      requestAnimationFrame(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
        }
      });
    }
  }, []);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-card border border-border",
        "aspect-video",
        className,
      )}
    >
      {/* Loading skeleton */}
      {state === "loading" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-l">
          <motion.div
            className="h-10 w-10 rounded-full bg-muted-foreground/20"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.p
            className="text-300 text-muted-foreground"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            正在加载报告...
          </motion.p>
        </div>
      )}

      {/* Error state */}
      {state === "error" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-m bg-card">
          <svg
            className="icon-size-400 text-destructive"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-300 text-muted-foreground">报告加载失败</p>
          <button
            onClick={handleRetry}
            className="rounded-md bg-primary px-l py-xs text-200 text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            重试
          </button>
        </div>
      )}

      {/* Actual iframe — hidden until loaded */}
      <iframe
        ref={iframeRef}
        title={title}
        src={src}
        className={cn(
          "absolute inset-0 h-full w-full border-0 transition-opacity duration-300",
          state === "loaded" ? "opacity-100" : "opacity-0",
        )}
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

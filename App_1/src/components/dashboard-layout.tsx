//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useThemeContext } from "@/hooks/theme.context";
import { SECTIONS } from "@/data/reports";
import { PowerBiIframe } from "@/components/powerbi-iframe";
import type { ProfileReportSection, CarouselSection } from "@/data/reports";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
  const { isDark, toggleTheme } = useThemeContext();

  // ── Tab state ──
  const [activeSection, setActiveSection] = useState(0);
  const [activeMainTab, setActiveMainTab] = useState(0);
  // For profile-report: "profile" | "report"; for carousel: carousel item index
  const [activeSubTab, setActiveSubTab] = useState<string | number>("profile");

  const section = SECTIONS[activeSection];
  const mainTab = section?.mainTabs[activeMainTab];

  // ── Reset main/sub when section changes ──
  const handleSectionChange = (sectionIdx: number) => {
    setActiveSection(sectionIdx);
    setActiveMainTab(0);
    const first = SECTIONS[sectionIdx]?.mainTabs[0];
    setActiveSubTab(first?.subTabs.type === "carousel" ? 0 : "profile");
  };

  const handleMainTabChange = (tabIdx: number) => {
    setActiveMainTab(tabIdx);
    const tab = section?.mainTabs[tabIdx];
    setActiveSubTab(tab?.subTabs.type === "carousel" ? 0 : "profile");
  };

  // ── Render helpers ──

  const renderIframe = (title: string, url: string) => (
    <AnimatePresence mode="wait">
      <motion.div
        key={title}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <PowerBiIframe title={title} src={url} />
      </motion.div>
    </AnimatePresence>
  );

  const renderProfileReport = (subTabs: ProfileReportSection) => {
    const active = activeSubTab as "profile" | "report";
    return (
      <div className="flex flex-col gap-l">
        {/* Sub tab pills */}
        <div className="flex gap-xs" role="tablist" aria-label="报表视图">
          {[
            { key: "profile", label: "Profile", desc: "架构图" },
            { key: "report", label: "Report", desc: "详细报表" },
          ].map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={active === tab.key}
              onClick={() => setActiveSubTab(tab.key)}
              className={cn(
                "relative flex items-center gap-xs rounded-lg px-m py-xs text-300 font-medium transition-all duration-200",
                active === tab.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <span>{tab.label}</span>
              {tab.desc && (
                <span
                  className={cn(
                    "text-100",
                    active === tab.key
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground/60",
                  )}
                >
                  {tab.desc}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Iframe */}
        {active === "profile"
          ? renderIframe(subTabs.profile.label, subTabs.profile.url)
          : renderIframe(subTabs.report.label, subTabs.report.url)}
      </div>
    );
  };

  const renderCarousel = (subTabs: CarouselSection) => {
    const activeIdx = activeSubTab as number;
    const items = subTabs.items;

    return (
      <div className="flex flex-col gap-l">
        {/* Report selector mini-tabs */}
        <div
          className="flex flex-wrap gap-xs"
          role="tablist"
          aria-label="报表列表"
        >
          {items.map((item, i) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={activeIdx === i}
              onClick={() => setActiveSubTab(i)}
              className={cn(
                "whitespace-nowrap rounded-lg px-m py-xs text-300 font-medium transition-all duration-200",
                activeIdx === i
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Currently selected report */}
        {renderIframe(items[activeIdx].label, items[activeIdx].url)}
      </div>
    );
  };

  const renderContent = () => {
    if (!mainTab) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-400 text-muted-foreground">暂无报表</p>
        </div>
      );
    }

    const { subTabs } = mainTab;
    if (subTabs.type === "profile-report") {
      return renderProfileReport(subTabs);
    }
    return renderCarousel(subTabs);
  };

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      {/* ── Header ── */}
      <header className="flex shrink-0 items-center justify-between border-b border-border px-xxl py-m">
        <div className="flex items-center gap-m">
          <h1 className="text-500 font-bold tracking-tight">
            <span className="text-primary">PowerBI</span> 作品集
          </h1>
          <span className="hidden sm:inline text-200 text-muted-foreground/60">
            /
          </span>
          <span className="hidden sm:inline text-200 text-muted-foreground">
            AIA Group — Cloud &amp; Cost Analytics
          </span>
        </div>

        <div className="flex items-center gap-m">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-lg p-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label={isDark ? "切换亮色主题" : "切换暗色主题"}
          >
            {isDark ? (
              <svg
                className="icon-size-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                className="icon-size-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex min-h-0 flex-1 flex-col overflow-auto">
        {/* Section tabs */}
        <div className="shrink-0 border-b border-border bg-muted/30">
          <div className="mx-auto flex w-full max-w-5xl gap-xs px-xl pt-m">
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleSectionChange(i)}
                className={cn(
                  "relative rounded-t-lg px-l py-s text-300 font-medium transition-all duration-200",
                  activeSection === i
                    ? "bg-background text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <span>{s.label}</span>
                {/* Active indicator line */}
                {activeSection === i && (
                  <motion.div
                    layoutId="section-active-line"
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main tabs */}
        <div className="shrink-0 border-b border-border">
          <div className="mx-auto flex w-full max-w-5xl gap-s overflow-x-auto px-xl py-s">
            {section.mainTabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => handleMainTabChange(i)}
                className={cn(
                  "relative whitespace-nowrap rounded-lg px-m py-xs text-300 font-medium transition-all duration-200",
                  activeMainTab === i
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {tab.label}
                {tab.hint && (
                  <span className="ml-xs text-100 text-muted-foreground/60">
                    {tab.hint}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="mx-auto w-full max-w-5xl flex-1 px-xl py-xl">
          {renderContent()}
        </div>

        {/* Footer */}
        <footer className="shrink-0 border-t border-border py-m text-center text-200 text-muted-foreground">
          AIA Group — Cloud &amp; Cost Analytics Portfolio
        </footer>
      </div>
    </div>
  );
}

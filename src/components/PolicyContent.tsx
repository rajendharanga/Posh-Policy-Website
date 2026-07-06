/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { POLICY_SECTIONS, PolicySection, SubSection, POLICY_METADATA } from "../policyData";
import { Link2, Check, Mail, Clock, ShieldAlert, ChevronDown, ChevronUp, Copy, BookOpen, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import AudioNarrator from "./AudioNarrator";

interface PolicyContentProps {
  searchQuery: string;
  onScrollToForm: () => void;
  onSectionVisible: (id: string) => void;
}

export default function PolicyContent({
  searchQuery,
  onScrollToForm,
  onSectionVisible,
}: PolicyContentProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedSubs, setExpandedSubs] = useState<Record<string, boolean>>({});

  // Setup intersection observer to track which section is currently on screen
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -60% 0px", // Trigger when section is in upper-middle of viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onSectionVisible(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    POLICY_SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [onSectionVisible]);

  // Copy Section Link Function
  const handleCopyLink = (sectionId: string) => {
    const origin = window.location.origin;
    const url = `${origin}#${sectionId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(sectionId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Toggle Subsection accordion
  const toggleSubsection = (subId: string) => {
    setExpandedSubs((prev) => ({
      ...prev,
      [subId]: !prev[subId],
    }));
  };

  // Real-time Text Highlighter Utility
  const highlightText = (text: string, query: string) => {
    if (!query) return <span>{text}</span>;
    
    // Safely escape regex characters
    const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={index}
              className="bg-yellow-500/25 text-white px-0.5 rounded-sm border-b border-yellow-400/50 font-medium"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div id="policy-body-content" className="flex-1 space-y-16 lg:pl-8">
      {/* Policy highlights audio explainer and speech reader */}
      <AudioNarrator />

      {POLICY_SECTIONS.map((section, index) => {
        // Automatically pre-expand some sections or collapse them
        const hasSubsections = section.subsections && section.subsections.length > 0;

        return (
          <article
            key={section.id}
            id={section.id}
            className="scroll-mt-24 pb-12 border-b border-zinc-900 last:border-0"
          >
            {/* Header Area with Anchor Copy Trigger */}
            <div className="flex items-center justify-between gap-4 mb-6 group/header">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                {highlightText(section.title, searchQuery)}
              </h3>
              
              <button
                onClick={() => handleCopyLink(section.id)}
                className={`p-1.5 rounded-md border text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all duration-150 ${
                  copiedId === section.id
                    ? "bg-zinc-900 border-emerald-900/60 text-emerald-400 hover:text-emerald-400"
                    : "bg-transparent border-zinc-900 opacity-0 group-hover/header:opacity-100 focus:opacity-100"
                }`}
                title="Copy Anchor Link"
              >
                {copiedId === section.id ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Link2 className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {/* Intro Content */}
            {section.intro && (
              <p className="text-sm font-medium text-zinc-300 leading-relaxed mb-4 pl-3 border-l-2 border-zinc-800">
                {highlightText(section.intro, searchQuery)}
              </p>
            )}

            {/* Paragraphs */}
            {section.paragraphs && section.paragraphs.length > 0 && (
              <div className="space-y-4 text-sm text-zinc-400 leading-relaxed mb-6">
                {section.paragraphs.map((p, pIdx) => {
                  // Special Highlights: styling email or parent division info
                  const isEmailLine = p.includes(POLICY_METADATA.poshEmail);
                  
                  if (isEmailLine) {
                    return (
                      <div
                        key={pIdx}
                        className="my-6 p-5 bg-zinc-950 rounded-lg border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <Mail className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-xs font-semibold text-white font-display">Official Redressal Channel</h5>
                            <p className="text-xs text-zinc-400 mt-1">Submit written complaints directly to the Presiding Officer.</p>
                            <span className="inline-block mt-2 font-mono text-xs text-[#eab308] font-semibold bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800">
                              {POLICY_METADATA.poshEmail}
                            </span>
                          </div>
                        </div>
                        <a
                          href={`mailto:${POLICY_METADATA.poshEmail}`}
                          className="shrink-0 text-center px-4 py-2 bg-zinc-900 hover:bg-zinc-850 text-white font-semibold text-xs border border-zinc-850 rounded transition-colors"
                        >
                          Send Secure Mail
                        </a>
                      </div>
                    );
                  }

                  return (
                    <p key={pIdx}>
                      {highlightText(p, searchQuery)}
                    </p>
                  );
                })}
              </div>
            )}

            {/* Bullet List */}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="space-y-3 pl-5 list-none mb-6">
                {section.bullets.map((bullet, bIdx) => {
                  const isContactEmail = bullet.includes(POLICY_METADATA.poshEmail);
                  return (
                    <li key={bIdx} className="relative text-sm text-zinc-400 leading-relaxed pl-4">
                      {/* Premium Custom Bullet Accent Indicator */}
                      <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-[#eab308]" />
                      {isContactEmail ? (
                        <div className="bg-zinc-950/40 p-3 rounded border border-zinc-900 inline-block w-full">
                          <strong>{highlightText(bullet.split(":")[0] + ":", searchQuery)}</strong>
                          <span className="text-[#eab308] font-mono text-xs font-semibold ml-1">
                            {bullet.split(":")[1]}
                          </span>
                        </div>
                      ) : (
                        highlightText(bullet, searchQuery)
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Custom Subsections (Expandable Accordion Cards) */}
            {hasSubsections && (
              <div className="space-y-3 mt-6">
                {section.subsections!.map((sub) => {
                  const subId = `${section.id}-${sub.id}`;
                  const isExpanded = expandedSubs[subId] !== false; // Pre-expand subsections by default for accessibility, user can collapse

                  return (
                    <div
                      key={sub.id}
                      className="bg-zinc-950/40 rounded-lg border border-zinc-900 hover:border-zinc-800 transition-all duration-200 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSubsection(subId)}
                        className="w-full flex items-center justify-between text-left p-4 bg-zinc-950/60 font-medium text-white hover:text-zinc-200 focus:outline-none"
                      >
                        <span className="text-xs font-semibold font-mono text-zinc-300">
                          {highlightText(sub.title, searchQuery)}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-zinc-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-zinc-500" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 border-t border-zinc-900/60 text-xs text-zinc-400 leading-relaxed space-y-3 bg-zinc-950/20 animate-in fade-in duration-200">
                          {sub.content.map((para, pIdx) => (
                            <p key={pIdx}>
                              {highlightText(para, searchQuery)}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Special Contextual Highlights / Accents based on Section index */}
            {section.id === "inquiry-process" && (
              <div className="mt-6 p-4 bg-red-950/20 border border-red-900/30 rounded flex gap-3 shadow-md">
                <Clock className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-200">Statutory Restriction:</strong> In accordance with the principles of natural justice and Indian labor regulations, neither the complainant nor the respondent is permitted to bring in legal practitioners (lawyers) to plead or advocate on their behalf during the Internal Committee inquiry.
                </p>
              </div>
            )}

            {/* Smart CTA link at the absolute end of the policy */}
            {section.id === "acknowledgement" && (
              <div className="mt-8 p-6 bg-zinc-950/50 rounded border border-dashed border-zinc-800 text-center shadow-lg">
                <h4 className="text-sm font-semibold text-white font-display mb-2">Ready to submit acknowledgement?</h4>
                <p className="text-xs text-zinc-400 mb-4 max-w-sm mx-auto">
                  By clicking below, you will scroll directly to the secure verification terminal to sign off your policy adherence.
                </p>
                <button
                  id="final-cta-sign"
                  onClick={onScrollToForm}
                  className="px-6 py-3 bg-[#e50914] text-white font-bold text-xs uppercase tracking-widest rounded hover:bg-red-700 transition-all duration-300 shadow-2xl cursor-pointer glow-btn-netflix"
                >
                  Go to Acknowledgement Form
                </button>
              </div>
            )}

          </article>
        );
      })}
    </div>
  );
}

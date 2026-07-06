/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { POLICY_SECTIONS, PolicySection } from "../policyData";
import { Search, ChevronRight, Menu, X, BookOpen, Check } from "lucide-react";
import { useState } from "react";

interface TableOfContentsProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function TableOfContents({
  activeSection,
  onSelectSection,
  searchQuery,
  onSearchChange,
}: TableOfContentsProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter sections to see if they match search query (e.g. title or body)
  const filteredSections = POLICY_SECTIONS.filter((section) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const matchTitle = section.title.toLowerCase().includes(query);
    const matchIntro = section.intro?.toLowerCase().includes(query);
    const matchParagraphs = section.paragraphs?.some(p => p.toLowerCase().includes(query));
    const matchBullets = section.bullets?.some(b => b.toLowerCase().includes(query));
    const matchSubsections = section.subsections?.some(sub => 
      sub.title.toLowerCase().includes(query) || 
      sub.content.some(c => c.toLowerCase().includes(query))
    );

    return matchTitle || matchIntro || matchParagraphs || matchBullets || matchSubsections;
  });

  const handleSectionClick = (id: string) => {
    onSelectSection(id);
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Desktop Sticky Sidebar (Hidden on mobile) */}
      <aside className="hidden lg:block w-72 shrink-0 h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto pr-4 border-r border-zinc-900">
        
        {/* Search Bar inside Sidebar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-3.5 w-3.5 text-zinc-500" />
          </div>
          <input
            id="sidebar-search"
            type="text"
            placeholder="Search policy content..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all duration-150"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[10px] text-zinc-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sidebar Header */}
        <div className="flex items-center gap-2 mb-4 px-2">
          <BookOpen className="h-4 w-4 text-zinc-400" />
          <h4 className="text-xs font-semibold text-zinc-400 font-mono tracking-wider uppercase">
            POLICY CHAPTERS
          </h4>
        </div>

        {/* Chapters Navigation List */}
        <nav className="space-y-1">
          {filteredSections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`w-full flex items-center justify-between text-left px-3 py-2.5 text-xs rounded-md transition-all duration-150 group cursor-pointer ${
                  isActive
                    ? "bg-red-950/20 active-item font-semibold text-white border-l-2 border-[#e50914]"
                    : "text-zinc-400 sidebar-item hover:text-zinc-200 hover:bg-zinc-900/40"
                }`}
              >
                <span className="truncate pr-2 font-sans font-medium">{section.title}</span>
                <ChevronRight
                  className={`h-3 w-3 text-zinc-600 transition-transform duration-150 shrink-0 ${
                    isActive ? "transform translate-x-0.5 text-red-500" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </button>
            );
          })}
          {filteredSections.length === 0 && (
            <p className="text-xs text-zinc-500 px-3 py-2 italic">
              No sections match your search.
            </p>
          )}
        </nav>
      </aside>

      {/* Mobile Floating TOC Panel (Visible on mobile/tablet) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          id="mobile-toc-btn"
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-5 py-3.5 bg-[#e50914] text-white font-bold text-xs rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer uppercase tracking-widest glow-btn-netflix"
        >
          <Menu className="h-4 w-4" />
          <span>Chapters Menu</span>
        </button>
      </div>

      {/* Mobile Chapters Drawer Overlay */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop blur */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-80 max-w-[85vw] bg-zinc-950 h-full border-l border-zinc-800 p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-900 mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-zinc-400" />
                  <h4 className="text-xs font-semibold text-zinc-400 font-mono uppercase tracking-wider">
                    Policy Navigation
                  </h4>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 text-zinc-500 hover:text-white rounded-md border border-zinc-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Drawer Search */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-3.5 w-3.5 text-zinc-500" />
                </div>
                <input
                  id="drawer-search"
                  type="text"
                  placeholder="Search chapters..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all duration-150"
                />
              </div>

              {/* Drawer Chapters List */}
              <nav className="space-y-1.5 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
                {filteredSections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full flex items-center justify-between text-left px-3 py-2.5 text-xs rounded-md transition-all duration-150 group cursor-pointer ${
                        isActive
                          ? "bg-red-950/25 active-item font-semibold text-white border-l-2 border-[#e50914]"
                          : "text-zinc-400 sidebar-item hover:text-zinc-200 hover:bg-zinc-900/40"
                      }`}
                    >
                      <span className="truncate pr-2">{section.title}</span>
                      {isActive && <Check className="h-3.5 w-3.5 text-[#e50914]" />}
                    </button>
                  );
                })}
                {filteredSections.length === 0 && (
                  <p className="text-xs text-zinc-500 py-2 italic text-center">
                    No chapters match search.
                  </p>
                )}
              </nav>
            </div>

            {/* Quick legal stats at bottom of drawer */}
            <div className="pt-4 border-t border-zinc-900 text-[10px] text-zinc-500 font-mono">
              <p>POLICY STATUS: ACTIVE</p>
              <p>VERSION: V1.0</p>
              <p className="truncate mt-0.5">SUPPORT: swapna@shreyasgroup.net</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { POLICY_METADATA } from "../policyData";
import { Mail, Shield, Menu, X, ExternalLink, Phone, Search } from "lucide-react";

interface HeaderProps {
  onScrollToSection: (id: string) => void;
  onScrollToForm: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({
  onScrollToSection,
  onScrollToForm,
  searchQuery = "",
  onSearchChange
}: HeaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      
      // Header background opacity on scroll
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="portal-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-[#e50914] transition-all duration-75" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img
                src={POLICY_METADATA.logoUrl}
                alt={`${POLICY_METADATA.company} Logo`}
                className="h-10 sm:h-12 md:h-14 w-auto object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Center Search Input with Icon */}
          <div className="hidden md:flex items-center relative w-64 max-w-xs">
            <Search className="absolute left-3 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search policy sections..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-zinc-950 border border-zinc-900 focus:border-red-600 rounded text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-all duration-150 font-sans"
            />
          </div>

          {/* Desktop Right Side Nav */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${POLICY_METADATA.poshPhone}`}
              className="flex items-center gap-2 px-3.5 py-2 text-[11px] uppercase tracking-wider font-semibold text-zinc-300 hover:text-white hover:bg-zinc-850 rounded border border-zinc-800 transition-all duration-200"
            >
              <Phone className="h-3.5 w-3.5 text-zinc-400" />
              <span>Contact IC: {POLICY_METADATA.poshPhone}</span>
            </a>

            <button
              id="sign-btn"
              onClick={onScrollToForm}
              className="flex items-center gap-1.5 px-5 py-2 text-[11px] font-bold text-white bg-[#e50914] hover:bg-red-700 rounded transition-all duration-200 shadow-lg shadow-red-950/20 uppercase tracking-widest cursor-pointer glow-btn-netflix"
            >
              <Shield className="h-3.5 w-3.5 fill-white" />
              <span>Sign Document</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md border border-zinc-800 transition-all duration-150"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-800 py-6 px-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-200">
          
          {/* Mobile Search Bar */}
          <div className="flex flex-col gap-2 pb-4 border-b border-zinc-900">
            <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Search Policy</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Type keywords to search..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-900 focus:border-red-600 rounded text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onScrollToSection("introduction");
              }}
              className="text-left py-2 text-sm text-zinc-300 hover:text-white transition-colors"
            >
              Read Policy
            </button>
            
            <a
              href={`tel:${POLICY_METADATA.poshPhone}`}
              className="flex items-center gap-2 py-2 text-sm text-zinc-300 hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4 text-zinc-500" />
              <span>Contact IC ({POLICY_METADATA.poshPhone})</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onScrollToForm();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-white bg-[#e50914] hover:bg-red-700 rounded transition-all duration-200 shadow-md uppercase tracking-wider"
            >
              <Shield className="h-4 w-4" />
              <span>Acknowledge & Sign</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

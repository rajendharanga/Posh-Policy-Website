/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { POLICY_METADATA } from "./policyData";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TableOfContents from "./components/TableOfContents";
import PolicyContent from "./components/PolicyContent";
import FAQSection from "./components/FAQSection";
import AcknowledgementForm from "./components/AcknowledgementForm";
import { ArrowUp, BookOpen, ShieldCheck, Mail, Calendar, ExternalLink } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSigned, setIsSigned] = useState(() => {
    return localStorage.getItem("posh_signed") === "true";
  });
  const [signData, setSignData] = useState<{
    name: string;
    employeeId: string;
    email: string;
    department: string;
    signedAt: string;
    device?: {
      userAgent: string;
      os: string;
      browser: string;
      screenSize: string;
      viewportSize: string;
      deviceType: string;
      touchPoints: number;
      language: string;
      timezone: string;
      isMobile: boolean;
    };
  } | null>(() => {
    const data = localStorage.getItem("posh_sign_data");
    return data ? JSON.parse(data) : null;
  });

  const handleSign = (data: {
    name: string;
    employeeId: string;
    email: string;
    department: string;
    signedAt: string;
    device?: {
      userAgent: string;
      os: string;
      browser: string;
      screenSize: string;
      viewportSize: string;
      deviceType: string;
      touchPoints: number;
      language: string;
      timezone: string;
      isMobile: boolean;
    };
  }) => {
    localStorage.setItem("posh_signed", "true");
    localStorage.setItem("posh_sign_data", JSON.stringify(data));
    setIsSigned(true);
    setSignData(data);
  };

  const handleResetSignature = () => {
    localStorage.removeItem("posh_signed");
    localStorage.removeItem("posh_sign_data");
    setIsSigned(false);
    setSignData(null);
  };

  useEffect(() => {
    const handleScrollVisibility = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScrollVisibility);
    return () => window.removeEventListener("scroll", handleScrollVisibility);
  }, []);

  const handleSelectSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToForm = () => {
    const element = document.getElementById("acknowledgement-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  return (
    <div className="min-h-screen bg-[#141414] text-[#f5f5f7] font-sans antialiased selection:bg-red-600/30 selection:text-white">
      
      {/* Decorative background grid elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#141414]" />
        <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-red-600/5 rounded-full blur-[140px] opacity-40 animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-12 left-12 h-[500px] w-[500px] bg-zinc-900/10 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Header */}
        <Header
          onScrollToSection={handleSelectSection}
          onScrollToForm={handleScrollToForm}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Sticky Statutory Compliance Banner */}
        <div className="pt-20 relative z-20">
          {!isSigned ? (
            <div className="bg-red-950/80 border-y border-red-900/40 text-center py-2.5 px-4 text-[11px] sm:text-xs text-red-200 font-sans tracking-wide animate-pulse flex items-center justify-center gap-2">
              <span className="font-extrabold bg-[#e50914] text-white text-[9px] px-1.5 py-0.5 rounded tracking-wider uppercase">ACTION REQUIRED</span>
              <span>Your mandatory statutory POSH V1.0 policy sign-off is <strong className="underline text-red-100">OUTSTANDING</strong>. Please read the document and sign the form below.</span>
            </div>
          ) : (
            <div className="bg-emerald-950/80 border-y border-emerald-900/40 text-center py-2.5 px-4 text-[11px] sm:text-xs text-emerald-200 font-sans tracking-wide flex items-center justify-center gap-2">
              <span className="font-extrabold bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded tracking-wider uppercase">SECURED</span>
              <span>Statutory sign-off verified for <strong className="text-white font-semibold">{signData?.name}</strong> ({signData?.employeeId}) on {signData?.signedAt}.</span>
            </div>
          )}
        </div>

        {/* Premium Hero Area */}
        <Hero
          onStartReading={() => handleSelectSection("introduction")}
          onScrollToForm={handleScrollToForm}
        />

        {/* Main Content Area: Sticky TOC Rail + Policy Text */}
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start relative">
            
            {/* Interactive Table of Contents (Sticky sidebar) */}
            <TableOfContents
              activeSection={activeSection}
              onSelectSection={handleSelectSection}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Dynamic Policy content panels */}
            <PolicyContent
              searchQuery={searchQuery}
              onScrollToForm={handleScrollToForm}
              onSectionVisible={setActiveSection}
            />

          </div>
        </main>

        {/* Mandatory Acknowledgement Form Frame */}
        <AcknowledgementForm
          isSigned={isSigned}
          signData={signData}
          onSign={handleSign}
          onReset={handleResetSignature}
        />

        {/* Searchable FAQ Section */}
        <FAQSection />

        {/* Enterprise Footer */}
        <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-zinc-900">
            
            {/* Column 1: Branding */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={POLICY_METADATA.logoUrl}
                  alt={`${POLICY_METADATA.company} Logo`}
                  className="h-10 sm:h-12 w-auto object-contain select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Shreyas Group is a division of Aadhyasree Infotainment. We are dedicated to providing an inclusive, safe, and professional workplace that adheres to the highest statutory standards.
              </p>
            </div>

            {/* Column 2: Legal compliance references */}
            <div>
              <h4 className="text-xs font-semibold text-zinc-300 font-mono tracking-wider uppercase mb-4">
                STATUTORY INFORMATION
              </h4>
              <ul className="space-y-2 text-xs text-zinc-500">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-zinc-600 shrink-0" />
                  <span>The POSH Act, 2013 Compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-zinc-600 shrink-0" />
                  <span>Effective Date: {POLICY_METADATA.effectiveDate}</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-zinc-600 shrink-0" />
                  <span>Policy Version: {POLICY_METADATA.policyVersion}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-zinc-600 shrink-0" />
                  <span className="truncate">Contact IC: {POLICY_METADATA.poshEmail}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-zinc-600 font-bold shrink-0">📞</span>
                  <span>IC Phone: <a href={`tel:${POLICY_METADATA.poshPhone}`} className="hover:text-white underline font-mono">{POLICY_METADATA.poshPhone}</a></span>
                </li>
              </ul>
            </div>

            {/* Column 3: Corporate Directory links */}
            <div>
              <h4 className="text-xs font-semibold text-zinc-300 font-mono tracking-wider uppercase mb-4">
                PORTAL DIRECTORY
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-500 font-sans">
                <button onClick={() => handleSelectSection("introduction")} className="text-left hover:text-white transition-colors">1. Introduction</button>
                <button onClick={() => handleSelectSection("definitions")} className="text-left hover:text-white transition-colors">3. Prohibited Conduct</button>
                <button onClick={() => handleSelectSection("internal-committee")} className="text-left hover:text-white transition-colors">4. Internal Committee</button>
                <button onClick={() => handleSelectSection("complaint-mechanism")} className="text-left hover:text-white transition-colors">5. Redressal Procedure</button>
                <button onClick={() => handleSelectSection("inquiry-process")} className="text-left hover:text-white transition-colors">7. Formal Inquiry</button>
                <button onClick={() => handleSelectSection("acknowledgement")} className="text-left hover:text-white transition-colors">12. Acknowledgement</button>
              </div>
            </div>

          </div>

          <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-600 font-mono">
            <div>
              <p>© 2026 {POLICY_METADATA.company}. All statutory rights reserved.</p>
              <p className="mt-0.5">Corporate Domain: <a href={POLICY_METADATA.domain} className="hover:text-zinc-400 underline">{POLICY_METADATA.domain.replace('https://', '')}</a></p>
            </div>
            <div className="flex items-center gap-4">
              <span>SECURITY: END-TO-END SSL</span>
              <span>AUDIT NODE: ACTIVE</span>
            </div>
          </div>
        </footer>

      </div>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850 rounded-full shadow-lg transition-all duration-200 cursor-pointer animate-in fade-in zoom-in-50 duration-200"
          title="Back to Top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { POLICY_METADATA } from "../policyData";
import { Shield, Clock, FileCheck, Mail, ShieldAlert } from "lucide-react";

interface HeroProps {
  onStartReading: () => void;
  onScrollToForm: () => void;
}

export default function Hero({ onStartReading, onScrollToForm }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 border-b border-zinc-900 bg-[#141414]">
      {/* Immersive background decoration (subtle grid and mesh glow) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Ambient Radial Cinematic Crimson Glow */}
      <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-red-600/10 blur-[130px] pointer-events-none animate-pulse duration-[6000ms]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Version Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800/80 rounded-full text-[10px] font-bold text-zinc-400 mb-6 font-mono tracking-wider">
            <span className="h-2 w-2 rounded-full bg-[#e50914] animate-pulse"></span>
            <span>POLICY PORTAL {POLICY_METADATA.policyVersion}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-red-500 font-extrabold">MANDATORY</span>
          </div>

          {/* Primary Typography Display Heading */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-wider text-white font-bebas mb-6 glow-text-netflix leading-[1.05]">
            SHREYAS GROUP <br />
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-white bg-clip-text text-transparent">
              POSH COMPLIANCE PORTAL
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            Official Prevention of Sexual Harassment (POSH) regulations of{" "}
            <span className="text-white font-semibold">{POLICY_METADATA.company}</span>. 
            Establishing a safe, respectful, and legally compliant working environment under the parent division{" "}
            <span className="text-white font-semibold">{POLICY_METADATA.parentCompany}</span>.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onStartReading}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl cursor-pointer"
            >
              Start Reading
            </button>
            <button
              onClick={onScrollToForm}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#e50914] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl cursor-pointer glow-btn-netflix"
            >
              Sign Acknowledgement
            </button>
          </div>
        </div>

        {/* Bento Grid Metadata & Statutory Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          
          {/* Metadata Card: Organization */}
          <div className="bg-zinc-900/40 backdrop-blur-md p-5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group">
            <div className="h-8 w-8 rounded-md bg-zinc-900 flex items-center justify-center border border-zinc-800 mb-4 group-hover:bg-zinc-800 transition-colors">
              <Shield className="h-4 w-4 text-zinc-400" />
            </div>
            <p className="text-xs text-zinc-500 font-mono mb-1 uppercase tracking-wider">Governed Division</p>
            <h4 className="text-sm font-semibold text-white font-display">{POLICY_METADATA.company}</h4>
            <p className="text-xs text-zinc-400 mt-1">{POLICY_METADATA.parentCompany}</p>
          </div>

          {/* Metadata Card: Effective Date */}
          <div className="bg-zinc-900/40 backdrop-blur-md p-5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group">
            <div className="h-8 w-8 rounded-md bg-zinc-900 flex items-center justify-center border border-zinc-800 mb-4 group-hover:bg-zinc-800 transition-colors">
              <Clock className="h-4 w-4 text-zinc-400" />
            </div>
            <p className="text-xs text-zinc-500 font-mono mb-1 uppercase tracking-wider">Effective Date</p>
            <h4 className="text-sm font-semibold text-white font-display">{POLICY_METADATA.effectiveDate}</h4>
            <p className="text-xs text-zinc-400 mt-1">Status: Active & Mandatory</p>
          </div>

          {/* Statutory Highlight: Absolute Confidentiality */}
          <div className="bg-zinc-900/40 backdrop-blur-md p-5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group">
            <div className="h-8 w-8 rounded-md bg-zinc-900 flex items-center justify-center border border-zinc-800 mb-4 group-hover:bg-zinc-800 transition-colors">
              <FileCheck className="h-4 w-4 text-zinc-400" />
            </div>
            <p className="text-xs text-zinc-500 font-mono mb-1 uppercase tracking-wider">Statutory Right</p>
            <h4 className="text-sm font-semibold text-white font-display">Section 16 Protections</h4>
            <p className="text-xs text-zinc-400 mt-1">Absolute identity and inquiry confidentiality guaranteed by law.</p>
          </div>

          {/* Metadata Card: IC Contact */}
          <div className="bg-zinc-900/40 backdrop-blur-md p-5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group">
            <div className="h-8 w-8 rounded-md bg-zinc-900 flex items-center justify-center border border-zinc-800 mb-4 group-hover:bg-zinc-800 transition-colors">
              <Mail className="h-4 w-4 text-zinc-400" />
            </div>
            <p className="text-xs text-zinc-500 font-mono mb-1 uppercase tracking-wider">Internal Committee Email</p>
            <h4 className="text-sm font-semibold text-white font-display truncate">{POLICY_METADATA.poshEmail}</h4>
            <p className="text-xs text-zinc-400 mt-1">Direct, confidential inbox. Accessible only by IC members.</p>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 max-w-6xl mx-auto bg-zinc-950 p-4 rounded-lg border border-red-950/40 flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-red-500/80 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200">Legal Notice:</strong> This website serves as the official corporate POSH Portal of Shreyas Group (A Division of Aadhyasree Infotainment). All policies, definitions, and grievance mechanisms published herein reflect the statutory provisions of <span className="text-zinc-200 font-medium">The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013</span>. All personnel are required by employment clauses to review and acknowledge compliance.
          </p>
        </div>

      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Search, ChevronDown, BookOpen, AlertTriangle, HelpCircle, ShieldAlert } from "lucide-react";
import { POLICY_METADATA } from "../policyData";

interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "reporting" | "investigation" | "confidentiality";
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: "general",
    question: "Who is covered under the Shreyas Group POSH Policy?",
    answer: "Every employee associated with Shreyas Group (A Division of Aadhyasree Infotainment) is covered. This includes regular full-time and part-time employees, temporary workers, contractual staff, consultants, daily-wage laborers, interns, trainees, apprentices, and volunteers. It also covers third parties like clients, vendors, and visitors who interact with our personnel in any work capacity."
  },
  {
    category: "general",
    question: "Does the policy apply to remote work, virtual meetings, and off-site events?",
    answer: "Yes, absolutely. Under Section 2(o) of the POSH Act, the 'workplace' is defined extensively as an extended workspace. This includes remote work settings, virtual business meetings (via Zoom, Google Meet, Teams), official communication channels (Slack, emails, WhatsApp), hotels, client sites, and any corporate transport or social gathering organized or supported by Shreyas Group."
  },
  {
    category: "reporting",
    question: "How do I report an incident of sexual harassment?",
    answer: "You can submit a detailed written complaint directly to the Internal Committee by emailing swapna@shreyasgroup.net. The email is highly secure and accessible only by IC members. Your complaint should include details of the incident(s), dates, times, locations, names of the respondent (accused), and any supporting documents or names of witnesses."
  },
  {
    category: "reporting",
    question: "What is the timeline for filing a POSH complaint?",
    answer: "Under the POSH Act, a formal complaint must be filed within three (3) months of the incident. In case of a series of incidents, it must be within three (3) months of the last incident. This timeline can be extended by another three (3) months by the IC if there were valid, sufficient reasons that prevented you from reporting earlier."
  },
  {
    category: "reporting",
    question: "Can someone else file a complaint on my behalf?",
    answer: "Yes. If you are unable to file a written complaint due to physical or mental incapacity, a legal heir, relative, close friend, co-worker, or any person who has direct knowledge of the incident may file the complaint on your behalf, with your written consent (or the consent of your family)."
  },
  {
    category: "confidentiality",
    question: "Will my identity be kept confidential during the inquiry?",
    answer: "Yes, absolute confidentiality is mandated by Section 16 of the POSH Act. It is strictly prohibited to publish or leak the identity of the complainant, respondent, or witnesses, or any details of the inquiry proceedings to any unauthorized person, press, or media. Any breach of confidentiality results in severe disciplinary action and financial penalties."
  },
  {
    category: "investigation",
    question: "What is the difference between Conciliation and a Formal Inquiry?",
    answer: "Conciliation is an informal, voluntary process requested by the complainant to settle the matter before a formal inquiry. No monetary transaction can be part of a conciliation settlement. If conciliation is not requested or fails, the IC conducts a formal, detailed inquiry, gathering evidence, interviewing witnesses, and compiling a binding recommendations report."
  },
  {
    category: "investigation",
    question: "What interim relief can I request while the inquiry is pending?",
    answer: "During the inquiry, you can submit a written request to the IC for interim relief. This can include: transferring either you or the respondent to another team or department; granting you up to three (3) months of paid leave (which is in addition to your standard leave balances); or transferring your reporting structure so that the respondent is no longer supervising or evaluating your performance."
  },
  {
    category: "investigation",
    question: "What is the timeline for resolving a formal inquiry?",
    answer: "The Internal Committee is legally required to complete the entire formal inquiry within ninety (90) days of its commencement. The final Inquiry Report must be submitted to the Shreyas Group management within ten (10) days of completion, and the management is legally obligated to implement the IC's recommendations within sixty (60) days."
  },
  {
    category: "confidentiality",
    question: "What protection is provided against retaliation?",
    answer: "Shreyas Group enforces a strict zero-tolerance policy against any form of retaliation, victimization, or intimidation. If a supervisor or co-worker treats you detrimentally (e.g., poor performance reviews, team exclusion, or hostility) because you filed a complaint or testified as a witness, they will face separate, severe disciplinary action, which may include immediate termination."
  }
];

export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "general" | "reporting" | "investigation" | "confidentiality">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Filter FAQs based on search and category
  const filteredFAQs = FAQ_ITEMS.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-20 border-b border-zinc-900 bg-[#141414]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800/80 rounded-full text-xs text-zinc-400 mb-4 font-mono">
            <HelpCircle className="h-3.5 w-3.5 text-[#e50914]" />
            <span className="font-bold tracking-wider uppercase">STATUTORY REFERENCE STATION</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-bebas tracking-wide uppercase">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-zinc-400 mt-2 max-w-lg mx-auto leading-relaxed">
            Practical answers regarding Shreyas Group POSH provisions, statutory timelines, and legal rights.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            id="faq-search"
            type="text"
            placeholder="Search FAQs by keywords (e.g., remote work, IC, timeline)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 bg-zinc-950/60 border border-zinc-900 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-150"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {(["all", "general", "reporting", "investigation", "confidentiality"] as const).map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded text-[11px] font-bold border capitalize transition-all duration-150 cursor-pointer uppercase tracking-wider ${
                activeCategory === category
                  ? "bg-[#e50914] text-white border-[#e50914] shadow-lg shadow-red-950/30"
                  : "bg-zinc-950/50 text-zinc-400 border-zinc-900 hover:text-white hover:border-zinc-700"
              }`}
            >
              {category === "all" ? "All FAQs" : category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        {filteredFAQs.length > 0 ? (
          <div className="space-y-3">
            {filteredFAQs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-zinc-950/40 rounded border border-zinc-900 overflow-hidden transition-all duration-200 hover:border-red-900/30 hover:bg-zinc-950/70 shadow-md"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between text-left p-4 sm:p-5 text-sm font-semibold text-white hover:text-zinc-200 focus:outline-none cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      {item.category === "confidentiality" && <BookOpen className="h-4 w-4 text-red-500 shrink-0" />}
                      {item.category === "reporting" && <ShieldAlert className="h-4 w-4 text-red-500 shrink-0" />}
                      {item.category === "investigation" && <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />}
                      {item.category === "general" && <HelpCircle className="h-4 w-4 text-red-500 shrink-0" />}
                      <span className="font-sans font-semibold tracking-wide">{item.question}</span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-250 ${
                        isOpen ? "transform rotate-180 text-red-500" : ""
                      }`}
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-zinc-900 bg-zinc-950/20 animate-in fade-in duration-200">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 bg-zinc-900/10 rounded-lg border border-dashed border-zinc-850">
            <p className="text-sm text-zinc-500">No matching FAQs found for your search term.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("all");
              }}
              className="text-xs font-semibold text-white mt-2 hover:underline"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

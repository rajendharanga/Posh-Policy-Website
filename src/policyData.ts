/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SubSection {
  id: string;
  title: string;
  content: string[];
}

export interface PolicySection {
  id: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  subsections?: SubSection[];
  bullets?: string[];
}

export const POLICY_METADATA = {
  websiteName: "Shreyas Group POSH Policy Portal",
  domain: "poshpolicy.shreyasgroup.net",
  company: "Shreyas Group",
  parentCompany: "A Division of Aadhyasree Infotainment",
  logoUrl: "https://static.wixstatic.com/media/14ff0a_34988c29359d4cc6b73a1b03273be836~mv2.png/v1/fill/w_330,h_170,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Shreyas-Logo-Png.png",
  poshEmail: "swapna@shreyasgroup.net",
  poshPhone: "+917993028484",
  policyVersion: "V1.0",
  effectiveDate: "06 July 2026",
  formUrl: "https://thedigidot.wixforms.com/f/7479904654193591424"
};

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "purpose",
    title: "1. Purpose & Scope of Applicability",
    intro: "Standard Operating Procedure (SOP): POSH Policy\nOrganization: Shreyas Group (A Division of Aadhyasree Infotainment)\nPolicy Version: V1.0\nApproved By: Rajesh, Operations Head, Shreyas Group\nPublished Date: 06 July 2026\nNext Review: July 2027\nEffective Date: 06 July 2026",
    paragraphs: [
      "This policy is established to prevent, prohibit, and redress sexual harassment at the workplace and to ensure a safe, respectful, and inclusive working environment for all employees, interns, freelancers, clients, and vendors associated with Shreyas Group (A Division of Aadhyasree Infotainment).",
      "The policy aligns with the provisions of the Prevention of Sexual Harassment (POSH).",
      "Scope of Applicability: This Policy applies across the entire Shreyas Group (A Division of Aadhyasree Infotainment) and every brand, division, subsidiary, LLP, private limited company or any present or future entity promoted, owned, managed or controlled by Mr. Gandra Srinivas Rao and/or Ms. Swapna Talluri, including but not limited to Shreyas Media LLP and Wassap Media Pvt. Ltd."
    ]
  },
  {
    id: "statutory-definition",
    title: "2. Statutory Definition",
    intro: "As per Section 2(n) of the POSH Act, \"sexual harassment\" includes any one or more of the following unwelcome acts or behaviour (whether directly or by implication):",
    bullets: [
      "Physical contact and advances",
      "A demand or request for sexual favours",
      "Making sexually coloured remarks",
      "Showing pornography",
      "Any other unwelcome physical, verbal, or non-verbal conduct of a sexual nature"
    ]
  },
  {
    id: "prohibited-conduct",
    title: "3. Practical Examples of Prohibited Conduct",
    intro: "The following list is illustrative and not exhaustive:",
    subsections: [
      {
        id: "verbal-harassment",
        title: "Verbal Harassment",
        content: [
          "• Making sexually suggestive remarks, innuendos, or lewd comments",
          "• Repeated offensive remarks about a person's body, appearance, or personal life",
          "• Inappropriate jokes of a sexual nature — including in group conversations, chat groups, or team gatherings",
          "• Singing songs, reciting verses, or making references with sexual undertones directed at an individual",
          "• Asking intrusive or inappropriate questions about a person's sexual or personal life",
          "• Persistent unwanted compliments about appearance or body that cause discomfort"
        ]
      },
      {
        id: "non-verbal-harassment",
        title: "Non-Verbal Harassment",
        content: [
          "• Displaying, forwarding, or sharing sexually explicit images, videos, memes, GIFs, or content",
          "• Showing pornography in any form",
          "• Leering, ogling, or giving unwanted personal attention",
          "• Gestures of a sexual nature",
          "• Sending emojis, stickers, or symbols with sexual connotations in a work context"
        ]
      },
      {
        id: "physical-harassment",
        title: "Physical Harassment",
        content: [
          "• Unwanted physical contact, touching, patting, pinching, or brushing against someone.",
          "• Invasion of personal space without consent",
          "• Physical intimidation or cornering"
        ]
      },
      {
        id: "digital-harassment",
        title: "Digital / Online Harassment",
        content: [
          "• Sending unwanted messages, images, videos, voice notes, or links of a sexual nature via any platform",
          "• Persistent messaging outside work hours after being asked to stop",
          "• Unwanted contact through social media platforms under the guise of professional connection",
          "• Misuse of digital platforms (WhatsApp, Telegram, Instagram, LinkedIn, etc.) for sexual advances",
          "• Creating, sharing, or forwarding deepfake images or videos of a sexual nature involving a colleague"
        ]
      }
    ]
  },
  {
    id: "employee-responsibilities",
    title: "4. Responsibilities of Employees",
    intro: "Every employee and individual covered under this Policy is expected to:",
    bullets: [
      "Conduct themselves professionally and respectfully at all times — in office, on-site, during travel, and on digital platforms.",
      "Refrain from any conduct that could constitute sexual harassment as defined under this Policy.",
      "Promptly report any incident of sexual harassment that they experience or witness to the Internal Committee or through the designated reporting channel.",
      "Cooperate fully and honestly in any inquiry conducted under this Policy.",
      "Maintain strict confidentiality regarding complaints, proceedings, and outcomes.",
      "Not make false, frivolous, or malicious complaints — as this too constitutes misconduct.",
      "Attend mandatory POSH awareness and training sessions as scheduled by the Organisation.",
      "Sign and acknowledge this Policy as part of onboarding and at any designated review points."
    ]
  },
  {
    id: "manager-responsibilities",
    title: "5. Responsibilities of Managers and Team Leaders",
    intro: "Managers and team leaders bear heightened responsibility in creating a safe and respectful workplace environment. They must:",
    bullets: [
      "Model professional, respectful, and appropriate workplace behaviour at all times.",
      "Proactively prevent harassment by setting clear conduct expectations within their teams.",
      "Never engage in, condone, or overlook conduct that may constitute sexual harassment.",
      "Immediately escalate to HR or the Internal Committee upon becoming aware of any complaint or incident — regardless of whether a formal complaint has been made.",
      "Provide full support to any employee who reports harassment, including facilitating interim protective measures.",
      "Ensure women team members are not disadvantaged in assignments, travel, events, or career opportunities as a result of reporting or potential vulnerability to harassment.",
      "Not discourage, dissuade, or pressure any team member from reporting a complaint.",
      "Ensure all new team members complete the mandatory POSH induction.",
      "Create psychologically safe event and travel environments, including protocols for late night work, solo travel, and client-facing engagements."
    ]
  },
  {
    id: "employer-responsibilities",
    title: "5A. Employer Responsibilities",
    paragraphs: [
      "The Organisation shall provide a safe working environment, constitute and support the Internal Committee, conduct POSH awareness programmes, display notices, maintain statutory records, assist complainants, submit annual reports and implement IC recommendations."
    ]
  },
  {
    id: "definition-workplace",
    title: "5B. Definition of Workplace",
    paragraphs: [
      "Workplace includes offices, event venues, exhibition grounds, convention centres, film promotion venues, sponsor activation sites, hotels and accommodation during official travel, transportation arranged by the Organisation, client premises, government event locations, work-from-home arrangements, virtual meetings, digital collaboration platforms and any location visited during employment."
    ]
  },
  {
    id: "jurisdiction-authority",
    title: "6. Jurisdiction and Exclusive Authority",
    paragraphs: [
      "The Internal Committee is the ONLY body authorised to investigate complaints of sexual harassment within the Organisation. No other body — including HR, Ethics Committees, or Disciplinary Committees — may investigate or adjudicate sexual harassment complaints. [Upheld by the Supreme Court of India]"
    ]
  },
  {
    id: "ic-contact-details",
    title: "7. IC Contact Details",
    paragraphs: [
      "Location: Head Office – Hyderabad (Applicable across all Shreyas Group offices, branches, events and operational locations)",
      "IC Contact Email: swapna@shreyasgroup.net",
      "Presiding Officer: Swapna Talluri"
    ]
  },
  {
    id: "ic-constitution",
    title: "8. Internal Complaint Committee (IC)",
    intro: "To handle complaints fairly, every organization must have an Internal Committee. It usually includes:",
    bullets: [
      "A Presiding Officer – Swapna Talluri (Managing Partner, Shreyas Group)",
      "At least 2 internal members - Mr. Rajesh, Ms Shruti",
      "1 external member – To be appointed"
    ],
    paragraphs: [
      "The IC is responsible for receiving complaints, conducting inquiries, and ensuring fair and unbiased resolution."
    ]
  },
  {
    id: "complaint-procedure",
    title: "9. Complaint Procedure",
    subsections: [
      {
        id: "filing-complaint",
        title: "1. Filing a Complaint",
        content: [
          "• Complaints must be submitted in writing or email to the IC within 3 months of the incident.",
          "• In case of repeated incidents, within 3 months of the last occurrence.",
          "• Assistance will be provided if the complainant is unable to write the complaint."
        ]
      },
      {
        id: "inquiry-process-details",
        title: "2. Inquiry Process",
        content: [
          "• Preliminary review of complaint validity",
          "• Formal inquiry conducted with both parties",
          "• Both parties will be given equal opportunity to present their case"
        ]
      },
      {
        id: "timeline",
        title: "3. Timeline",
        content: [
          "• Inquiry to be completed within 90 days",
          "• Final report to be submitted to Management within 10 days after completion"
        ]
      },
      {
        id: "interim-measures",
        title: "4. Interim Measures",
        content: [
          "During the inquiry period, IC may recommend:",
          "• Temporary transfer of either party : Either the complainant or the accused may be temporarily moved to another team, so they don’t have to work closely together during the investigation.",
          "• Leave for the complainant (if requested): The person who filed the complaint can be given time off from work if they feel stressed, unsafe, or need a break.",
          "• Restriction of interaction between parties."
        ]
      },
      {
        id: "confidentiality",
        title: "5. Confidentiality",
        content: [
          "• The company will not share details of the complaint, investigation, or names of the people involved with anyone who is not directly part of the process.",
          "• If someone leaks or shares this sensitive information without permission, they may face punishment from the company (like warning, suspension, or other action)."
        ]
      }
    ]
  },
  {
    id: "complaint-form-structure",
    title: "10. POSH Complaint Form Structure",
    intro: "A well-structured POSH complaint form should include:",
    bullets: [
      "Name and contact details of the complainant",
      "Name and designation of the respondent",
      "Detailed description of the incident(s) — dates, locations, and nature of conduct",
      "Names of any witnesses",
      "Any supporting documents, messages, or other evidence",
      "The relief sought by the complainant"
    ],
    paragraphs: [
      "Where a complainant is unable to submit a written complaint due to physical or mental incapacity, the IC has the authority to take cognizance based on an oral complaint recorded by a member."
    ]
  },
  {
    id: "evidence-standards",
    title: "11. Evidence Standards in IC Proceedings",
    intro: "The evidentiary standard in IC proceedings is lower than that in courts of law. The Indian Evidence Act does not strictly apply. Key points:",
    bullets: [
      "WhatsApp conversations, Telegram messages, emails, and screenshots may be produced as evidence and taken at face value, subject to context verification.",
      "The IC should request full chat backups — not just selected excerpts — to ensure context is properly assessed.",
      "Witnesses may provide testimony regarding consistent patterns of behaviour even where direct evidence of a specific incident is unavailable.",
      "Deepfake content or manipulated media may be encountered; the IC should apply caution and may seek technical assistance to authenticate digital evidence.",
      "Most incidents occur behind closed doors; absence of direct evidence does not automatically mean the complaint is false."
    ]
  },
  {
    id: "third-party-harassment",
    title: "12. Third-Party Harassment",
    intro: "Sexual harassment may be committed not only by fellow employees but also by clients, vendors, contractors, event attendees, sponsors, performers, or any other third party. This Policy provides protection in all such situations.",
    subsections: [
      {
        id: "reporting-third-party",
        title: "1. Reporting Third-Party Harassment",
        content: [
          "• Any employee who faces harassment by a third party should report immediately to the IC or designated HR representative.",
          "• The Organisation shall take all reasonable steps to address and remedy such harassment, including raising the matter with the third party's organisation.",
          "• Where a client or vendor relationship continues to result in harassment despite intervention, the Organisation shall review and, if necessary, discontinue the engagement."
        ]
      },
      {
        id: "vendor-obligations",
        title: "2. Vendor and Agency Partner Obligations",
        content: [
          "• All vendors, agency partners, and contractors are required to comply with the POSH Act and this Policy during their engagement with the Organisation.",
          "• Contracts with vendors and partners must include a POSH compliance clause.",
          "• Persistent violations by a vendor may result in contract termination and blacklisting."
        ]
      }
    ]
  },
  {
    id: "events-operations",
    title: "12A. Events, Activations & On-Ground Operations",
    paragraphs: [
      "All event venues, green rooms, backstage areas, hospitality lounges and production zones shall be treated as workplaces. Major events may designate a POSH Point of Contact."
    ]
  },
  {
    id: "travel-accommodation",
    title: "12B. Business Travel & Accommodation",
    paragraphs: [
      "Official travel, accommodation and transit are covered by this Policy. Employees shall not be compelled to attend non-mandatory social gatherings."
    ]
  },
  {
    id: "vip-interactions",
    title: "12C. Client, Celebrity, Artist & VIP Interactions",
    paragraphs: [
      "Harassment by clients, sponsors, artists, influencers, media personnel, celebrities and VIP guests shall be treated with the same seriousness as harassment by employees."
    ]
  },
  {
    id: "alcohol-events",
    title: "12D. Alcohol-Served Events",
    paragraphs: [
      "Consumption of alcohol shall never excuse misconduct. This Policy remains fully applicable during corporate parties, networking sessions, gala dinners and hospitality functions."
    ]
  },
  {
    id: "digital-media-conduct",
    title: "12E. Digital & Social Media Conduct",
    paragraphs: [
      "The Policy applies to any Social Media or Communication Platforms like WhatsApp, Telegram, LinkedIn, Instagram, Facebook, X, Microsoft Teams, Zoom, Google Meet and Email."
    ]
  },
  {
    id: "disciplinary-actions",
    title: "13. Disciplinary Actions",
    intro: "Where the IC finds that the allegation of sexual harassment is proved, it shall recommend appropriate action to the employer. Depending on the severity, nature, and circumstances of the misconduct, disciplinary action may include one or more of the following:",
    bullets: [
      "Minor / First-Time Offence: Written warning; Mandatory POSH sensitisation training; Formal apology letter; Removal from specific project or team",
      "Moderate Offence: Written reprimand on record; Withholding of increment, promotion, or bonus; Transfer or role reassignment; Suspension (with or without pay)",
      "Serious / Repeated Offence: Termination of employment; Recovery of financial damages from salary/wages payable to the aggrieved woman; Report to police (FIR) if required; Vendor blacklisting; Client escalation where applicable"
    ]
  },
  {
    id: "protection-retaliation",
    title: "13A. Protection Against Retaliation",
    paragraphs: [
      "No employee shall be subjected to adverse action for filing a complaint, acting as a witness, providing evidence or participating in an inquiry."
    ]
  },
  {
    id: "appeal",
    title: "13B. Appeal",
    paragraphs: [
      "Any person aggrieved by the recommendations of the Internal Committee may appeal in accordance with Section 18 of the POSH Act and applicable law."
    ]
  },
  {
    id: "annual-reporting",
    title: "14. Annual Reporting",
    paragraphs: [
      "The Internal Committee shall prepare annual reports containing complaint statistics, awareness programmes conducted and actions taken as required under law."
    ]
  },
  {
    id: "ic-contact-details-update",
    title: "IC Contact Details Update & Core Clarifications",
    paragraphs: [
      "POSH Email: swapna@shreyasgroup.net",
      "Presiding Officer: Ms. Swapna Talluri",
      "Internal Member: Mr. Rajesh",
      "Internal Member: Ms. Shruti",
      "External Member: To Be Appointed",
      "Employee Responsibility Clarification: Mere inability to substantiate a complaint shall not by itself constitute a false complaint. Action may be recommended only where malicious intent is established after inquiry.",
      "Evidence Standards Amendment: Digital evidence may be considered subject to verification of authenticity, completeness and context."
    ]
  }
];

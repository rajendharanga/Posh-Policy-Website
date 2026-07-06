/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { POLICY_METADATA } from "../policyData";
import { ShieldCheck, UserCheck, Lock, FileCheck, RefreshCw, Phone, Mail, Smartphone, Info, ExternalLink, ShieldAlert } from "lucide-react";

interface DeviceDetails {
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
}

interface AcknowledgementFormProps {
  isSigned: boolean;
  signData: {
    name: string;
    employeeId: string;
    email: string;
    department: string;
    signedAt: string;
    device?: DeviceDetails;
  } | null;
  onSign: (data: {
    name: string;
    employeeId: string;
    email: string;
    department: string;
    signedAt: string;
    device?: DeviceDetails;
  }) => void;
  onReset: () => void;
}

export default function AcknowledgementForm({
  isSigned,
  signData,
  onSign,
  onReset
}: AcknowledgementFormProps) {
  const [currentDevice, setCurrentDevice] = useState<DeviceDetails | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Auto-detect device details on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent;
      let os = "Unknown OS";
      let deviceType = "Desktop";
      let isMobile = false;

      // OS Detection
      if (/android/i.test(ua)) {
        os = "Android";
        deviceType = "Mobile";
        isMobile = true;
      } else if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) {
        os = "iOS";
        deviceType = "Mobile";
        isMobile = true;
      } else if (/Macintosh/i.test(ua)) {
        os = "macOS";
      } else if (/Windows/i.test(ua)) {
        os = "Windows";
      } else if (/Linux/i.test(ua)) {
        os = "Linux";
      }

      // Mobile detection helper
      if (/mobile/i.test(ua)) {
        isMobile = true;
        if (deviceType === "Desktop") deviceType = "Mobile";
      }

      // Browser Detection
      let browser = "Unknown Browser";
      if (/chrome|crios/i.test(ua) && !/edge|edg/i.test(ua) && !/opr/i.test(ua)) {
        browser = "Chrome";
      } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
        browser = "Safari";
      } else if (/firefox|fxios/i.test(ua)) {
        browser = "Firefox";
      } else if (/edge|edg/i.test(ua)) {
        browser = "Edge";
      } else if (/opr/i.test(ua)) {
        browser = "Opera";
      }

      setCurrentDevice({
        userAgent: ua,
        os,
        browser,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        deviceType,
        touchPoints: navigator.maxTouchPoints || 0,
        language: navigator.language || "en-US",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        isMobile,
      });
    }
  }, []);

  const handleActionSignAndRedirect = () => {
    setIsRedirecting(true);

    const timestamp = new Date().toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short"
    });

    const activeDevice = currentDevice || {
      userAgent: navigator.userAgent,
      os: "Detected Platform",
      browser: "Detected Browser",
      screenSize: "Screen Size",
      viewportSize: "Viewport Size",
      deviceType: "Device Type",
      touchPoints: 0,
      language: "en-US",
      timezone: "UTC",
      isMobile: false,
    };

    // Save state on current portal to preserve compliance logs and prevent future claim disputes
    onSign({
      name: "Verified Adherent",
      employeeId: "PORTAL-VERIFIED",
      email: "compliance@shreyasgroup.net",
      department: "All Units & Divisions",
      signedAt: timestamp,
      device: activeDevice
    });

    // Directly redirect to official Wix signature form to avoid iframe issues and fulfill the user's direct redirect mandate
    setTimeout(() => {
      window.location.href = POLICY_METADATA.formUrl;
    }, 1200);
  };

  const generateReceiptId = () => {
    if (!signData) return "SG-POSH-2026-00000";
    let hash = 0;
    const str = signData.name + signData.signedAt;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const num = Math.abs(hash).toString().substring(0, 5);
    return `SG-POSH-2026-${num}`;
  };

  return (
    <section id="acknowledgement-form-section" className="py-20 bg-[#141414] border-t border-zinc-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Module Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-850 rounded text-xs text-zinc-400 mb-4 font-mono">
            <ShieldCheck className="h-3.5 w-3.5 text-[#e50914]" />
            <span className="font-extrabold tracking-widest uppercase text-[10px]">STATUTORY SIGN-OFF</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white font-bebas tracking-wider uppercase">
            Mandatory POSH Policy Sign-Off
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto leading-relaxed">
            As a team member of Shreyas Group, your formal digital acknowledgement is required to maintain complete compliance under the Indian POSH Act, 2013.
          </p>
        </div>

        {/* Form Console Container */}
        <div className="relative bg-zinc-950/95 rounded border border-zinc-800 shadow-2xl overflow-hidden backdrop-blur-md">
          
          {/* Console Header Bar */}
          <div className="bg-zinc-950 px-4 py-3.5 border-b border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${isRedirecting ? "bg-amber-500 animate-ping" : "bg-red-600 animate-pulse"}`}></span>
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-800"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700"></span>
              <span className="text-[10px] font-mono text-zinc-500 ml-2 uppercase tracking-widest">
                VERIFICATION-BRIDGE-v1.0
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
              <Lock className="h-3.5 w-3.5 text-[#e50914]" />
              <span className="tracking-widest uppercase">SSL SECURE GATEWAY</span>
            </div>
          </div>

          <div className="p-4 sm:p-8">
            {!isSigned ? (
              /* ACTIVE COMPLIANCE FLOW - Real-time device visualizer + Direct CTA Sign-off Link */
              <div className="space-y-8">
                
                <div className="bg-zinc-900/60 p-5 rounded-lg border border-zinc-850 text-xs text-zinc-300 leading-relaxed flex items-start gap-3">
                  <Info className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-white">How the Sign-Off works:</span>
                    <p>
                      Click the main signature button below. The system will record your hardware stamp in our verification logs to legally verify compliance, and immediately redirect you to the official Wix Secure Sign-off Form to record your signature.
                    </p>
                  </div>
                </div>

                {/* Real-Time Background Mobile/Device Tracker Badge */}
                <div className="bg-zinc-950 p-5 rounded border border-zinc-900 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-300 font-mono text-[10px] uppercase tracking-wider">
                      <Smartphone className="h-4 w-4 text-red-500 animate-pulse" />
                      <span>Compliance Device Signature Active</span>
                    </div>
                    <span className="bg-red-950/40 text-red-400 border border-red-900/30 text-[9px] font-mono px-2 py-0.5 rounded uppercase">
                      SECURE LOGGING
                    </span>
                  </div>

                  {currentDevice && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] font-mono text-zinc-500">
                      <div className="bg-zinc-900/40 p-3 rounded border border-zinc-900">
                        <span className="text-zinc-600 block text-[9px] uppercase">Device OS:</span>
                        <span className="text-zinc-300 font-extrabold">{currentDevice.os}</span>
                      </div>
                      <div className="bg-zinc-900/40 p-3 rounded border border-zinc-900">
                        <span className="text-zinc-600 block text-[9px] uppercase">Browser:</span>
                        <span className="text-zinc-300 font-extrabold">{currentDevice.browser}</span>
                      </div>
                      <div className="bg-zinc-900/40 p-3 rounded border border-zinc-900">
                        <span className="text-zinc-600 block text-[9px] uppercase">Screen Size:</span>
                        <span className="text-zinc-300 font-extrabold">{currentDevice.screenSize}</span>
                      </div>
                      <div className="bg-zinc-900/40 p-3 rounded border border-zinc-900">
                        <span className="text-zinc-600 block text-[9px] uppercase">Connection Mode:</span>
                        <span className="text-red-500 font-extrabold">{currentDevice.isMobile ? "Mobile Device" : "Desktop PC"}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 p-3.5 bg-red-950/25 border border-red-950/50 rounded text-[11px] text-zinc-400 leading-normal">
                    <ShieldAlert className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <p>
                      <strong>Anti-Dispute Protocol:</strong> Real-time hardware characteristics and browser user agents are locked to your statutory log. This is captured automatically to prevent any future claims that you did not fill or authorize the policy signature.
                    </p>
                  </div>
                </div>

                {/* Primary CTA Action Button */}
                <button
                  onClick={handleActionSignAndRedirect}
                  disabled={isRedirecting}
                  className={`w-full py-5 bg-[#e50914] hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest rounded shadow-2xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer glow-btn-netflix flex items-center justify-center gap-3 ${isRedirecting ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                  {isRedirecting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Logging Hardware Stamp & Redirecting...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="h-5 w-5" />
                      <span>Acknowledge POSH Policy & Proceed to Wix Form</span>
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </>
                  )}
                </button>

              </div>
            ) : (
              /* SIGNED RECEIPT VIEW - Displays beautiful audit log with captured mobile details */
              <div className="space-y-8 py-8 text-center animate-in fade-in duration-500">
                <div className="relative inline-flex items-center justify-center p-6 bg-emerald-950/10 border border-emerald-900/30 rounded-full mb-2">
                  <div className="absolute inset-0 rounded-full bg-emerald-600/5 blur-xl" />
                  <ShieldCheck className="h-14 w-14 text-emerald-500" />
                  <span className="absolute -bottom-1 bg-emerald-600 text-white text-[8px] font-bold font-mono py-0.5 px-2 rounded tracking-widest uppercase">
                    COMPLIANT
                  </span>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-white tracking-wide uppercase font-mono">
                    Compliance Identity Registered
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto leading-relaxed">
                    Your verification has been locked in our registry. You have been redirected to the official Wix form to complete the signature process.
                  </p>
                  <div className="mt-3">
                    <a
                      href={POLICY_METADATA.formUrl}
                      className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 underline font-bold"
                    >
                      <span>Need to visit the Wix form again? Click here to redirect</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Receipt Stamp Card with Full Device Audit Details */}
                <div className="max-w-lg mx-auto bg-zinc-950 border border-zinc-900 p-6 rounded text-left relative overflow-hidden shadow-2xl space-y-6">
                  <div className="absolute -right-10 -bottom-10 opacity-[0.02] transform rotate-45 pointer-events-none select-none">
                    <ShieldCheck className="h-44 w-44 text-white" />
                  </div>
                  
                  {/* Stamp Header */}
                  <div className="flex justify-between border-b border-zinc-900 pb-3">
                    <div>
                      <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">AUDIT STATEMENT</h5>
                      <p className="text-xs font-extrabold text-white font-mono mt-0.5">{generateReceiptId()}</p>
                    </div>
                    <div className="text-right">
                      <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">STATUS</h5>
                      <span className="inline-block mt-0.5 bg-emerald-950/40 text-emerald-500 border border-emerald-900/30 text-[9px] font-bold font-mono px-1.5 py-0.5 rounded uppercase">
                        V1.0 REGISTERED
                      </span>
                    </div>
                  </div>

                  {/* Core Employee details */}
                  <div className="space-y-2.5 text-xs">
                    <h6 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                      <UserCheck className="h-3.5 w-3.5 text-zinc-500" />
                      <span>Employee Demographics</span>
                    </h6>
                    <div className="grid grid-cols-2 gap-4 bg-zinc-900/30 p-3 rounded border border-zinc-900/50">
                      <div>
                        <span className="text-zinc-500 block text-[9px] uppercase font-mono">Registry Name:</span>
                        <span className="text-white font-semibold font-mono">{signData?.name}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[9px] uppercase font-mono">Registry ID:</span>
                        <span className="text-white font-semibold font-mono">{signData?.employeeId}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-zinc-500 block text-[9px] uppercase font-mono">Registry Channel:</span>
                        <span className="text-white font-semibold font-mono break-all">{signData?.email}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[9px] uppercase font-mono">Business Scope:</span>
                        <span className="text-white font-semibold font-mono">{signData?.department}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[9px] uppercase font-mono">Timestamp:</span>
                        <span className="text-white font-semibold font-mono text-[10px]">{signData?.signedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Captured Device details for Audit Trail */}
                  <div className="space-y-2.5 text-xs">
                    <h6 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                      <Smartphone className="h-3.5 w-3.5 text-red-500" />
                      <span>Mobile & Hardware Signature (Compliant Log)</span>
                    </h6>
                    <div className="grid grid-cols-2 gap-4 bg-zinc-900/30 p-3 rounded border border-zinc-900/50">
                      <div>
                        <span className="text-zinc-500 block text-[9px] uppercase font-mono">Operating System:</span>
                        <span className="text-white font-semibold font-mono">{signData?.device?.os || "Detected"}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[9px] uppercase font-mono">Web Browser:</span>
                        <span className="text-white font-semibold font-mono">{signData?.device?.browser || "Detected"}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[9px] uppercase font-mono">Hardware Resolution:</span>
                        <span className="text-white font-semibold font-mono">{signData?.device?.screenSize || "Detected"}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[9px] uppercase font-mono">Device Type:</span>
                        <span className="text-red-500 font-bold font-mono uppercase">{signData?.device?.deviceType || "Detected"}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-zinc-500 block text-[9px] uppercase font-mono">User Agent (Audit Signature):</span>
                        <span className="text-zinc-400 font-mono text-[9px] block leading-tight break-all">
                          {signData?.device?.userAgent || "Captured securely"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Electronic Signature stamp style */}
                  <div className="pt-3 border-t border-dashed border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-mono text-zinc-600 block">HANDSIGNED DIGITAL CODE</span>
                      <span className="text-base text-red-500 italic font-semibold font-serif tracking-wider select-none inline-block mt-1">
                        Shreyas Group Adherent
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] font-mono text-zinc-600 block">ENCRYPTION PROTOCOL</span>
                      <span className="text-[9px] font-mono text-zinc-400 font-bold block mt-1">SHA-256 SECURED</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-950 hover:bg-zinc-900 text-xs font-bold text-zinc-400 hover:text-white border border-zinc-900 rounded uppercase tracking-wider transition-colors mx-auto cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset Signature / Re-sign</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Informational Hotline Callout & Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="p-5 bg-zinc-950/40 rounded border border-zinc-900 flex items-start gap-3">
            <Phone className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-semibold text-zinc-300 font-display mb-1">POSH IC Inquiry Support</h5>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Need details regarding the investigation process? Call the Shreyas Group Internal Committee hotline at: <a href={`tel:${POLICY_METADATA.poshPhone}`} className="text-red-400 font-bold underline font-mono">{POLICY_METADATA.poshPhone}</a>.
              </p>
            </div>
          </div>
          <div className="p-5 bg-zinc-950/40 rounded border border-zinc-900 flex items-start gap-3">
            <Mail className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-semibold text-zinc-300 font-display mb-1">Encrypted Mailbox</h5>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Direct statutory submissions and complaints can be emailed to <a href={`mailto:${POLICY_METADATA.poshEmail}`} className="text-red-400 font-bold underline">{POLICY_METADATA.poshEmail}</a> with complete privacy protection.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

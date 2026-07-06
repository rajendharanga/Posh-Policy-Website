/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Volume2, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

const SUMMARY_SPEECH_TEXT = `
Standard Operating Procedure for the Prevention of Sexual Harassment, or POSH Policy, of Shreyas Group, A Division of Aadhyasree Infotainment. 

This policy is established to prevent, prohibit, and redress sexual harassment at the workplace and ensure a safe, respectful, and inclusive working environment for all employees, interns, freelancers, clients, and vendors associated with Shreyas Group. 

Scope of Applicability: This policy applies across the entire Shreyas Group, and every division, subsidiary, LLP, or private limited company owned, managed, or controlled by Mr. Gandra Srinivas Rao or Ms. Swapna Talluri, including Shreyas Media LLP and Wassap Media Private Limited.

Key Statutory Definitions: Under Section 2(n) of the POSH Act, sexual harassment includes any unwelcome physical contact and advances, demands or requests for sexual favors, sexually colored remarks, showing pornography, or any other unwelcome conduct of a sexual nature.

Practical Examples of Prohibited Conduct:
Verbal harassment includes suggestive remarks, offensive comments about appearance, or inappropriate jokes.
Non-verbal harassment includes leering, showing pornography, or sending explicit emojis in work contexts.
Physical harassment includes unwanted physical contact, touching, or physical intimidation.
Digital and Online harassment includes sending explicit messages, persistent messages outside work hours on WhatsApp, Telegram, LinkedIn, or creating deepfake content.

Core Responsibilities:
Employees must conduct themselves professionally, report harassment promptly to the Internal Committee, maintain strict confidentiality, and attend mandatory training sessions.
Managers must model respectful behavior, proactively prevent harassment, and immediately escalate any incident to the HR or Internal Committee.
The Employer is obligated to maintain a safe environment, display penal consequences prominently, and conduct regular sensitization programs.

Internal Committee Structure:
The Internal Committee is the only authorized body to investigate complaints. It is head-officed in Hyderabad, and headed by Presiding Officer Ms. Swapna Talluri. Internal members are Mr. Rajesh and Ms. Shruti. The Internal Advisory Board consists of Raaaj (raj@shreyasgroup.net) and Sudharma (sudharma@shreyasgroup.net).
Grievances can be emailed securely to support@shreyasgroup.net.

Complaint Procedure:
Complaints must be submitted in writing or email to the IC within 3 months of the incident. Inquiries are completed within 90 days, and final reports are submitted to management within 10 days of completion. Interim measures like transfers or up to 3 months leave can be recommended during investigations. Absolute confidentiality is maintained.

Disciplinary Actions:
Minor offenses can lead to written warnings, mandatory training, or role reassignment.
Moderate offenses lead to written reprimand, withholding of increments, or unpaid suspension.
Serious or repeated offenses result in termination of employment, recovery of financial damages, or reporting to the police.
Retaliation against any complainant or witness is strictly prohibited.
`;

export default function AudioNarrator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1); // 1x, 1.25x, 1.5x
  const [showTranscript, setShowTranscript] = useState(false);
  const [supported, setSupported] = useState(true);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    } else {
      setSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Sync rate if changed during playing
  useEffect(() => {
    if (utteranceRef.current && isPlaying) {
      // Unfortunately, in Web Speech API, changing rate on-the-fly requires restarting or is browser dependent.
      // We'll update the ref value so next play/resume utilizes the rate.
      utteranceRef.current.rate = rate;
    }
  }, [rate, isPlaying]);

  const handlePlay = () => {
    if (!supported || !synthRef.current) return;

    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(SUMMARY_SPEECH_TEXT);
    utterance.rate = rate;
    
    // Attempt to select a clear English voice
    const voices = synthRef.current.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith("en-US") || v.lang.startsWith("en-GB") || v.lang.startsWith("en-IN")
    );
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (!supported || !synthRef.current) return;
    synthRef.current.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (!supported || !synthRef.current) return;
    synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!supported) {
    return null;
  }

  return (
    <div className="bg-zinc-950/80 border border-zinc-900 rounded-lg p-5 sm:p-6 mb-8 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
        <Volume2 className="h-24 w-24 text-white" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-1.5 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-950/50 border border-red-900/30 rounded text-[10px] text-red-400 font-mono font-bold tracking-wider uppercase">
            <Sparkles className="h-3 w-3" />
            <span>AI Policy Narrator & Explainer</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white font-display">
            Listen to POSH Policy Briefing
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Short on time? Let our automated auditor read and explain Shreyas Group's statutory POSH policy highlights directly.
          </p>
        </div>

        {/* Audio Player and Speed Controller */}
        <div className="flex flex-wrap items-center gap-4 bg-zinc-900/60 p-3 rounded-lg border border-zinc-850">
          
          {/* Waveform Equalizer Animation */}
          <div className="flex items-end gap-0.5 h-6 w-8 px-1">
            <span className={`w-1 rounded-full bg-red-600 transition-all duration-300 ${isPlaying ? "animate-bar-1 h-5" : "h-1 bg-zinc-700"}`} />
            <span className={`w-1 rounded-full bg-red-600 transition-all duration-300 ${isPlaying ? "animate-bar-2 h-3" : "h-1 bg-zinc-700"}`} />
            <span className={`w-1 rounded-full bg-red-600 transition-all duration-300 ${isPlaying ? "animate-bar-3 h-6" : "h-1 bg-zinc-700"}`} />
            <span className={`w-1 rounded-full bg-red-600 transition-all duration-300 ${isPlaying ? "animate-bar-4 h-4" : "h-1 bg-zinc-700"}`} />
          </div>

          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                className="p-2.5 bg-[#e50914] text-white rounded-full hover:bg-red-700 hover:scale-105 active:scale-95 transition-all shadow-md shadow-red-950/20 cursor-pointer"
                title="Play Narration"
              >
                <Play className="h-4 w-4 fill-white" />
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="p-2.5 bg-zinc-800 text-white rounded-full hover:bg-zinc-750 active:scale-95 transition-all cursor-pointer"
                title="Pause Narration"
              >
                <Pause className="h-4 w-4 fill-white" />
              </button>
            )}

            <button
              onClick={handleStop}
              disabled={!isPlaying && !isPaused}
              className={`p-2.5 rounded-full transition-all cursor-pointer ${
                isPlaying || isPaused
                  ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-750 hover:text-white"
                  : "bg-zinc-950 text-zinc-600 border border-zinc-900 cursor-not-allowed"
              }`}
              title="Stop Narration"
            >
              <Square className="h-4 w-4 fill-current" />
            </button>
          </div>

          {/* Speed Rate selector */}
          <div className="flex items-center gap-1 border-l border-zinc-800 pl-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Speed:</span>
            <div className="flex items-center gap-1 bg-zinc-950 p-0.5 rounded border border-zinc-850">
              {[1, 1.25, 1.5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRate(s)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                    rate === s
                      ? "bg-red-600/20 text-red-500 border border-red-900/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Transcript Collapse Section */}
      <div className="mt-4 pt-4 border-t border-zinc-900">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 hover:text-white transition-colors"
        >
          {showTranscript ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          <span>{showTranscript ? "Hide Transcript" : "Show Narration Transcript"}</span>
        </button>

        {showTranscript && (
          <div className="mt-3 p-4 bg-zinc-950/80 rounded border border-zinc-900 text-xs text-zinc-400 leading-relaxed max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 font-sans whitespace-pre-line animate-in fade-in duration-200">
            {SUMMARY_SPEECH_TEXT.trim()}
          </div>
        )}
      </div>
    </div>
  );
}

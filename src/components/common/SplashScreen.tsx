import React, { useEffect, useState, useCallback, useRef } from "react";

export interface SplashScreenProps {
  onComplete?: () => void;
  minDuration?: number;
  canSkip?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  minDuration = 1800,
  canSkip = true,
}) => {
  const [phase, setPhase] = useState<"ignite" | "motion" | "lock" | "exit">(
    "ignite",
  );
  const [isMounted, setIsMounted] = useState(true);
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState("INITIALIZING CORE TELEMETRY");

  const timersRef = useRef<number[]>([]);
  const hasExitedRef = useRef(false);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const handleFinish = useCallback(() => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;
    clearAllTimers();
    setPhase("exit");
    setProgress(100);
    setStatusText("ALL SYSTEMS OPERATIONAL");

    const exitTimer = window.setTimeout(() => {
      setIsMounted(false);
      onComplete?.();
    }, 450);
    timersRef.current.push(exitTimer);
  }, [clearAllTimers, onComplete]);

  const handleSkip = useCallback(() => {
    if (!canSkip || hasExitedRef.current) return;
    handleFinish();
  }, [canSkip, handleFinish]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setProgress(100);
      setStatusText("PLATFORM READY");
      const quickTimer = window.setTimeout(handleFinish, 350);
      timersRef.current.push(quickTimer);
      return () => {
        document.body.style.overflow = prevOverflow;
        clearAllTimers();
      };
    }

    const tMotion = window.setTimeout(() => {
      setPhase("motion");
      setProgress(45);
      setStatusText("CONNECTING SHOPFLOOR BUS");
    }, 80);

    const tMid = window.setTimeout(
      () => {
        setProgress(78);
        setStatusText("CALIBRATING MACHINE METRICS");
      },
      Math.floor(minDuration * 0.45),
    );

    const tLock = window.setTimeout(
      () => {
        setPhase("lock");
        setProgress(95);
        setStatusText("FINALIZING TELEMETRY SYNC");
      },
      Math.min(1300, minDuration - 450),
    );

    const tEnd = window.setTimeout(handleFinish, minDuration);

    timersRef.current.push(tMotion, tMid, tLock, tEnd);

    return () => {
      document.body.style.overflow = prevOverflow;
      clearAllTimers();
    };
  }, [minDuration, handleFinish, clearAllTimers]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  if (!isMounted) return null;

  return (
    <div
      role="status"
      aria-label="Loading FactoryOS Smart Manufacturing Platform"
      onClick={handleSkip}
      className={`fixed inset-0 h-[100dvh] z-[99999] flex flex-col items-center justify-center bg-[#001421] text-white overflow-hidden select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        phase === "exit"
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      <div className="absolute top-6 right-6 z-10">
        {canSkip && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#CFE8E1]/30 text-[#8EBED7] hover:text-white transition-all text-xs font-semibold backdrop-blur-xs cursor-pointer shadow-xs"
          >
            <span>Skip</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-white/70">
              ESC
            </kbd>
          </button>
        )}
      </div>

      <div className="absolute w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full bg-radial from-[#164E6E]/30 via-[#002941]/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#DFECF306_1px,transparent_1px),linear-gradient(to_bottom,#DFECF306_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

      <div className="relative flex flex-col items-center w-full max-w-[380px] sm:max-w-[560px] px-4">
        <div className="relative w-full aspect-[5/3] flex items-center justify-center">
          <svg
            viewBox="0 0 500 300"
            className="w-full h-full overflow-visible drop-shadow-[0_12px_40px_rgba(0,41,65,0.75)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="blueprintGlow"
                x1="250"
                y1="85"
                x2="250"
                y2="240"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#CFE8E1" stopOpacity="0.22" />
                <stop offset="50%" stopColor="#43A392" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#002941" stopOpacity="0.01" />
              </linearGradient>

              <linearGradient
                id="radarLine"
                x1="250"
                y1="150"
                x2="385"
                y2="150"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#CFE8E1" stopOpacity="0" />
                <stop offset="70%" stopColor="#CFE8E1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#CFE8E1" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient
                id="radarCone"
                x1="250"
                y1="150"
                x2="385"
                y2="150"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#CFE8E1" stopOpacity="0" />
                <stop offset="100%" stopColor="#CFE8E1" stopOpacity="0.12" />
              </linearGradient>

              <style>{`
                @keyframes gearSpoolDrive {
                  0% { transform: rotate(0deg); }
                  20% { transform: rotate(35deg); }
                  70% { transform: rotate(280deg); }
                  100% { transform: rotate(360deg); }
                }
                @keyframes gearSpoolDriven {
                  0% { transform: rotate(0deg); }
                  20% { transform: rotate(-50deg); }
                  70% { transform: rotate(-380deg); }
                  100% { transform: rotate(-480deg); }
                }
                @keyframes gearSpoolPinion {
                  0% { transform: rotate(0deg); }
                  20% { transform: rotate(70deg); }
                  70% { transform: rotate(560deg); }
                  100% { transform: rotate(720deg); }
                }
                @keyframes radarScan {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes laserSparkPulse {
                  0%, 100% { transform: scale(1); opacity: 0.95; }
                  50% { transform: scale(1.6); opacity: 0.5; }
                }
                @keyframes gantryPulse {
                  0% { stroke-dashoffset: 24; }
                  100% { stroke-dashoffset: 0; }
                }
              `}</style>
            </defs>

            <circle
              cx="250"
              cy="150"
              r="135"
              stroke="#CFE8E1"
              strokeWidth="1"
              strokeOpacity="0.08"
              strokeDasharray="3 3"
            />
            <circle
              cx="250"
              cy="150"
              r="95"
              stroke="#CFE8E1"
              strokeWidth="1"
              strokeOpacity="0.12"
            />
            <circle
              cx="250"
              cy="150"
              r="45"
              stroke="#CFE8E1"
              strokeWidth="1"
              strokeOpacity="0.15"
              strokeDasharray="4 4"
            />

            <line
              x1="80"
              y1="150"
              x2="420"
              y2="150"
              stroke="#DFECF3"
              strokeWidth="1"
              strokeOpacity="0.06"
            />
            <line
              x1="250"
              y1="20"
              x2="250"
              y2="280"
              stroke="#DFECF3"
              strokeWidth="1"
              strokeOpacity="0.06"
            />

            <path
              d="M 60 70 L 60 50 L 80 50"
              stroke="#CFE8E1"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
            <path
              d="M 440 70 L 440 50 L 420 50"
              stroke="#CFE8E1"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
            <path
              d="M 60 230 L 60 250 L 80 250"
              stroke="#CFE8E1"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
            <path
              d="M 440 230 L 440 250 L 420 250"
              stroke="#CFE8E1"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />

            <g className="origin-[250px_150px] animate-[radarScan_4s_linear_infinite] pointer-events-none">
              <line
                x1="250"
                y1="150"
                x2="385"
                y2="150"
                stroke="url(#radarLine)"
                strokeWidth="1.5"
              />
              <path
                d="M 250 150 L 385 150 A 135 135 0 0 0 355 75 Z"
                fill="url(#radarCone)"
              />
            </g>

            <path
              d="M 90 240 L 140 240 L 140 185 L 180 145 L 180 185 L 220 145 L 220 185 L 260 145 L 260 240 L 320 240 L 320 120 L 360 85 L 360 240 L 410 240 Z"
              fill="url(#blueprintGlow)"
              className="transition-opacity duration-700 ease-out"
              style={{
                opacity: phase === "lock" || phase === "exit" ? 1 : 0.25,
              }}
            />

            <g
              className="transition-opacity duration-700"
              style={{
                opacity: phase === "lock" || phase === "exit" ? 0.35 : 0.15,
              }}
            >
              <line
                x1="140"
                y1="240"
                x2="180"
                y2="185"
                stroke="#CFE8E1"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="180"
                y1="240"
                x2="140"
                y2="185"
                stroke="#CFE8E1"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="180"
                y1="240"
                x2="220"
                y2="185"
                stroke="#CFE8E1"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="220"
                y1="240"
                x2="180"
                y2="185"
                stroke="#CFE8E1"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="220"
                y1="240"
                x2="260"
                y2="185"
                stroke="#CFE8E1"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="260"
                y1="240"
                x2="220"
                y2="185"
                stroke="#CFE8E1"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              <line
                x1="330"
                y1="130"
                x2="350"
                y2="130"
                stroke="#74BFB0"
                strokeWidth="1"
              />
              <line
                x1="330"
                y1="160"
                x2="350"
                y2="160"
                stroke="#74BFB0"
                strokeWidth="1"
              />
              <line
                x1="330"
                y1="190"
                x2="350"
                y2="190"
                stroke="#74BFB0"
                strokeWidth="1"
              />
              <line
                x1="340"
                y1="120"
                x2="340"
                y2="240"
                stroke="#74BFB0"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
            </g>

            <g
              className="origin-[190px_145px]"
              style={{
                animation:
                  "gearSpoolDrive 2.4s cubic-bezier(0.25, 0.1, 0.25, 1) infinite",
              }}
            >
              <circle
                cx="190"
                cy="145"
                r="48"
                fill="#002941"
                stroke="#CFE8E1"
                strokeWidth="2"
                strokeOpacity="0.85"
              />
              <circle
                cx="190"
                cy="145"
                r="32"
                fill="#001421"
                stroke="#BDD7E7"
                strokeWidth="1"
                strokeOpacity="0.45"
              />
              <circle
                cx="190"
                cy="145"
                r="14"
                fill="#0C3953"
                stroke="#CFE8E1"
                strokeWidth="1.5"
              />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                (deg) => (
                  <rect
                    key={`cog1-${deg}`}
                    x="185"
                    y="92"
                    width="10"
                    height="10"
                    rx="2"
                    fill="#CFE8E1"
                    transform={`rotate(${deg} 190 145)`}
                  />
                ),
              )}
              {[0, 90, 180, 270].map((deg) => (
                <circle
                  key={`hole1-${deg}`}
                  cx="190"
                  cy="123"
                  r="5"
                  fill="#001421"
                  stroke="#CFE8E1"
                  strokeWidth="1"
                  strokeOpacity="0.65"
                  transform={`rotate(${deg} 190 145)`}
                />
              ))}
            </g>

            <g
              className="origin-[275px_145px]"
              style={{
                animation:
                  "gearSpoolDriven 2.4s cubic-bezier(0.25, 0.1, 0.25, 1) infinite",
              }}
            >
              <circle
                cx="275"
                cy="145"
                r="34"
                fill="#002941"
                stroke="#43A392"
                strokeWidth="2"
                strokeOpacity="0.9"
              />
              <circle
                cx="275"
                cy="145"
                r="20"
                fill="#001421"
                stroke="#CFE8E1"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <circle
                cx="275"
                cy="145"
                r="10"
                fill="#FD6E6E"
                stroke="#FFE6E4"
                strokeWidth="1.2"
              />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <rect
                  key={`cog2-${deg}`}
                  x="271"
                  y="106"
                  width="8"
                  height="8"
                  rx="1.5"
                  fill="#74BFB0"
                  transform={`rotate(${deg} 275 145)`}
                />
              ))}
            </g>

            <g
              className="origin-[275px_85px]"
              style={{
                animation:
                  "gearSpoolPinion 2.4s cubic-bezier(0.25, 0.1, 0.25, 1) infinite",
              }}
            >
              <circle
                cx="275"
                cy="85"
                r="20"
                fill="#0C3953"
                stroke="#CFE8E1"
                strokeWidth="1.5"
              />
              <circle cx="275" cy="85" r="6" fill="#002941" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <rect
                  key={`cog3-${deg}`}
                  x="272"
                  y="62"
                  width="6"
                  height="6"
                  rx="1"
                  fill="#CFE8E1"
                  transform={`rotate(${deg} 275 85)`}
                />
              ))}
            </g>

            <path
              d="M 90 240 L 140 240 L 140 185 L 180 145 L 180 185 L 220 145 L 220 185 L 260 145 L 260 240 L 320 240 L 320 120 L 360 85 L 360 240 L 410 240"
              stroke="#CFE8E1"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_10px_rgba(207,232,225,0.75)]"
              style={{
                strokeDasharray: 840,
                strokeDashoffset: phase === "ignite" ? 840 : 0,
                transition:
                  "stroke-dashoffset 1.1s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            />

            <line
              x1="90"
              y1="240"
              x2="410"
              y2="240"
              stroke="#CFE8E1"
              strokeWidth="2"
              strokeOpacity="0.45"
            />
            <line
              x1="100"
              y1="246"
              x2="400"
              y2="246"
              stroke="#43A392"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              strokeDasharray="8 6"
              className="animate-[gantryPulse_1.2s_linear_infinite]"
            />

            <line
              x1="335"
              y1="120"
              x2="335"
              y2="60"
              stroke="#74BFB0"
              strokeWidth="2"
              strokeDasharray="3 3"
              strokeOpacity="0.8"
            />
            <line
              x1="345"
              y1="120"
              x2="345"
              y2="50"
              stroke="#74BFB0"
              strokeWidth="2"
              strokeDasharray="3 3"
              strokeOpacity="0.8"
            />
            <circle
              cx="335"
              cy="55"
              r="3"
              fill="#FD6E6E"
              className="animate-pulse"
            />
            <circle
              cx="345"
              cy="45"
              r="3"
              fill="#FD6E6E"
              className="animate-pulse"
            />

            {phase !== "ignite" && (
              <g className="origin-[360px_85px] animate-[laserSparkPulse_0.6s_ease-in-out_infinite]">
                <circle
                  cx="360"
                  cy="85"
                  r="10"
                  fill="#FD6E6E"
                  fillOpacity="0.3"
                />
                <circle
                  cx="360"
                  cy="85"
                  r="5"
                  fill="#FD6E6E"
                  fillOpacity="0.7"
                />
                <circle cx="360" cy="85" r="2.5" fill="#FFFFFF" />
              </g>
            )}

            <circle
              cx="150"
              cy="240"
              r="3"
              fill="#CFE8E1"
              className="animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite]"
            />
            <circle
              cx="230"
              cy="240"
              r="3"
              fill="#FD6E6E"
              className="animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite_0.6s]"
            />
            <circle
              cx="370"
              cy="240"
              r="3"
              fill="#CFE8E1"
              className="animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite_1.2s]"
            />
          </svg>
        </div>

        <div
          className={`flex flex-col items-center text-center mt-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase !== "ignite"
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-3 scale-95"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E] border border-[#CFE8E1]/30 text-[#CFE8E1] flex items-center justify-center shadow-[0_0_20px_rgba(207,232,225,0.25)]">
              <span className="material-symbols-outlined text-[19px]">
                factory
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-brand drop-shadow-[0_0_24px_rgba(207,232,225,0.45)]">
              FactoryOS
            </span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FD6E6E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FD6E6E] shadow-[0_0_8px_#FD6E6E]" />
            </span>
          </div>

          <span className="text-[10px] sm:text-[11px] font-semibold text-[#8EBED7] tracking-[0.28em] uppercase font-sans mt-1.5">
            Smart Manufacturing Platform
          </span>

          <div className="w-52 sm:w-64 mt-4 flex flex-col items-center gap-1.5">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#43A392] via-[#CFE8E1] to-[#FD6E6E] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="w-full flex items-center justify-between text-[9px] font-mono tracking-widest text-[#8EBED7]">
              <span>{statusText}</span>
              <span className="tabular-nums font-bold text-white/90">
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {canSkip && (
          <div className="mt-7 transition-opacity duration-300">
            <span className="text-[11px] text-[#566E7F] hover:text-[#BDD7E7] transition-colors cursor-pointer">
              <span className="hidden sm:inline">
                Press{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-mono text-[10px]">
                  Esc
                </kbd>{" "}
                or click anywhere to skip
              </span>
              <span className="sm:hidden">Tap anywhere to skip</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;

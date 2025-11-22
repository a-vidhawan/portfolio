// src/components/PCBAnimationV2.jsx
import React, { useEffect, useState } from "react";

/**
 * Full-screen PCB-style background with a central CPU and
 * animated traces. Pure SVG, no masks or grids, only H/V
 * traces. CPU stays square; cursor glow floats over top.
 * Updated for 16:9 landscape aspect ratio (192 x 108).
 * 
 * V2 Refined:
 * - Slower pulses (6s animation).
 * - Complex component arrangement on edges (QFP, SOP, Passives).
 * - Realistic routing between components and CPU.
 */
function PCBAnimationV2() {
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const handleMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setMousePos({ x, y });
        };

        window.addEventListener("pointermove", handleMove);
        return () => window.removeEventListener("pointermove", handleMove);
    }, []);

    // CPU Center: (96, 54) | Size: 16x16
    // CPU Bounds: x: [88, 104], y: [46, 62]

    const primaryTraces = [
        // --- CPU FANOUT (Connecting to components) ---

        // To Left Top QFP (x=15, y=20)
        "M88 48 H60 V25 H25",
        "M92 46 V35 H40 V22 H25",

        // To Left Mid SOP (x=10, y=50)
        "M88 52 H50 V50 H20",
        "M88 56 H55 V54 H20",

        // To Left Bottom Passives (x=12, y=85)
        "M88 60 H45 V85 H20",
        "M92 62 V80 H30 V88 H20",

        // To Right Top SOP (x=170, y=25)
        "M104 48 H140 V25 H170",
        "M100 46 V35 H150 V28 H170",

        // To Right Mid QFP (x=165, y=60)
        "M104 52 H130 V60 H165",
        "M104 56 H135 V64 H165",
        "M104 60 H140 V56 H165",

        // To Right Bottom Passives (x=175, y=90)
        "M100 62 V85 H150 V90 H175",
        "M104 62 V75 H160 V93 H175",

        // --- INTER-COMPONENT & OFF-SCREEN ---

        // Left Top QFP -> Off-screen Top
        "M15 15 V-5",
        "M20 15 V-5",

        // Left Mid SOP -> Left Bottom Passives
        "M15 58 V80",
        "M10 58 V82",

        // Right Top SOP -> Right Mid QFP
        "M175 32 V50",
        "M180 32 V52",

        // Right Mid QFP -> Off-screen Right
        "M185 60 H195",
        "M185 65 H195",

        // CPU -> Off-screen Bottom
        "M96 62 V115",
        "M98 62 V110 H110 V115",
    ];

    const secondaryTraces = [
        // --- FILLER TRACES ---

        // Top Left Zone
        "M-5 10 H30 V5 H40",
        "M-5 30 H10 V40 H5",

        // Bottom Left Zone
        "M-5 95 H30 V105 H50",
        "M-5 70 H25 V65",

        // Top Right Zone
        "M195 10 H160 V5 H150",
        "M195 40 H185 V45",

        // Bottom Right Zone
        "M195 80 H160 V75",
        "M195 100 H170 V105 H150",

        // Center Vertical Buses
        "M70 -5 V115",
        "M122 -5 V115",
        "M65 10 V100",
        "M127 10 V100",

        // Horizontal Cross-links
        "M40 10 H150",
        "M40 98 H150",
    ];

    return (
        <div className="fixed inset-0 -z-10 bg-[#050816]">
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 192 108"
                preserveAspectRatio="xMidYMid slice"
            >
                <style>
                    {`
            .pcb-trace-v2 {
              fill: none;
              stroke: #1e293b;
              stroke-width: 0.3;
              stroke-linecap: round;
              stroke-linejoin: round;
            }
            .pcb-trace-dim-v2 {
              fill: none;
              stroke: #0f172a;
              stroke-width: 0.3;
              stroke-linecap: round;
            }
            .pcb-trace-active-v2 {
              fill: none;
              stroke: #38bdf8;
              stroke-width: 0.3;
              stroke-dasharray: 4 100;
              stroke-dashoffset: 100;
              animation: pulseTrace 6s linear infinite; /* Slower animation */
              opacity: 0.6;
            }
            @keyframes pulseTrace {
              0% { stroke-dashoffset: 100; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { stroke-dashoffset: -100; opacity: 0; }
            }
          `}
                </style>

                <rect x="0" y="0" width="192" height="108" fill="#050816" />

                {/* Secondary Traces */}
                {secondaryTraces.map((d, i) => (
                    <path key={`bg-${i}`} d={d} className="pcb-trace-dim-v2" />
                ))}

                {/* Primary Traces */}
                {primaryTraces.map((d, i) => (
                    <g key={`p-${i}`}>
                        <path d={d} className="pcb-trace-v2" />
                        <path
                            d={d}
                            className="pcb-trace-active-v2"
                            style={{ animationDelay: `${i * 0.8}s` }}
                        />
                    </g>
                ))}

                {/* --- COMPONENTS --- */}

                {/* Central CPU */}
                <rect x="88" y="46" width="16" height="16" rx="2.5" fill="#020617" stroke="#1f2937" strokeWidth="0.8" />

                {/* LEFT SIDE COMPONENTS */}

                {/* QFP Chip (Top Left) */}
                <g transform="translate(15, 15)">
                    <rect width="10" height="10" rx="1" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
                    {/* Pins Top/Bottom */}
                    {[...Array(4)].map((_, i) => (
                        <React.Fragment key={`l-qfp-v-${i}`}>
                            <line x1={2 + i * 2} y1="-1" x2={2 + i * 2} y2="0" stroke="#475569" strokeWidth="0.4" />
                            <line x1={2 + i * 2} y1="10" x2={2 + i * 2} y2="11" stroke="#475569" strokeWidth="0.4" />
                        </React.Fragment>
                    ))}
                    {/* Pins Left/Right */}
                    {[...Array(4)].map((_, i) => (
                        <React.Fragment key={`l-qfp-h-${i}`}>
                            <line x1="-1" y1={2 + i * 2} x2="0" y2={2 + i * 2} stroke="#475569" strokeWidth="0.4" />
                            <line x1="10" y1={2 + i * 2} x2="11" y2={2 + i * 2} stroke="#475569" strokeWidth="0.4" />
                        </React.Fragment>
                    ))}
                </g>

                {/* SOP Chip (Mid Left) */}
                <g transform="translate(10, 50)">
                    <rect width="8" height="12" rx="1" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
                    {[...Array(5)].map((_, i) => (
                        <React.Fragment key={`l-sop-${i}`}>
                            <line x1="-1" y1={2 + i * 2} x2="0" y2={2 + i * 2} stroke="#475569" strokeWidth="0.4" />
                            <line x1="8" y1={2 + i * 2} x2="9" y2={2 + i * 2} stroke="#475569" strokeWidth="0.4" />
                        </React.Fragment>
                    ))}
                </g>

                {/* Passives (Bottom Left) */}
                <g transform="translate(12, 85)">
                    <rect x="0" y="0" width="4" height="2" fill="#1e293b" />
                    <rect x="0" y="4" width="4" height="2" fill="#1e293b" />
                    <rect x="0" y="8" width="4" height="2" fill="#1e293b" />
                </g>

                {/* RIGHT SIDE COMPONENTS */}

                {/* SOP Chip (Top Right) */}
                <g transform="translate(170, 25)">
                    <rect width="8" height="14" rx="1" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
                    {[...Array(6)].map((_, i) => (
                        <React.Fragment key={`r-sop-${i}`}>
                            <line x1="-1" y1={2 + i * 2} x2="0" y2={2 + i * 2} stroke="#475569" strokeWidth="0.4" />
                            <line x1="8" y1={2 + i * 2} x2="9" y2={2 + i * 2} stroke="#475569" strokeWidth="0.4" />
                        </React.Fragment>
                    ))}
                </g>

                {/* QFP Chip (Mid Right) */}
                <g transform="translate(165, 60)">
                    <rect width="12" height="12" rx="1" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
                    {/* Pins Top/Bottom */}
                    {[...Array(5)].map((_, i) => (
                        <React.Fragment key={`r-qfp-v-${i}`}>
                            <line x1={2 + i * 2} y1="-1" x2={2 + i * 2} y2="0" stroke="#475569" strokeWidth="0.4" />
                            <line x1={2 + i * 2} y1="12" x2={2 + i * 2} y2="13" stroke="#475569" strokeWidth="0.4" />
                        </React.Fragment>
                    ))}
                    {/* Pins Left/Right */}
                    {[...Array(5)].map((_, i) => (
                        <React.Fragment key={`r-qfp-h-${i}`}>
                            <line x1="-1" y1={2 + i * 2} x2="0" y2={2 + i * 2} stroke="#475569" strokeWidth="0.4" />
                            <line x1="12" y1={2 + i * 2} x2="13" y2={2 + i * 2} stroke="#475569" strokeWidth="0.4" />
                        </React.Fragment>
                    ))}
                </g>

                {/* Passives (Bottom Right) */}
                <g transform="translate(175, 90)">
                    <rect x="0" y="0" width="2" height="4" fill="#1e293b" />
                    <rect x="4" y="0" width="2" height="4" fill="#1e293b" />
                    <rect x="8" y="0" width="2" height="4" fill="#1e293b" />
                </g>

            </svg>

            <div
                className="pointer-events-none absolute rounded-full"
                style={{
                    width: "380px",
                    height: "380px",
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    transform: "translate(-50%, -50%)",
                    background:
                        "radial-gradient(circle at center, rgba(56,189,248,0.06), transparent 70%)",
                    transition: "left 80ms linear, top 80ms linear",
                }}
            />
        </div>
    );
}

export default PCBAnimationV2;

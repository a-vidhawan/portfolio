// src/components/PCBAnimationV2.jsx
import React, { useEffect, useState } from "react";

/**
 * Full-screen PCB-style background with a central CPU and
 * animated traces. Pure SVG, no masks or grids, only H/V
 * traces. CPU stays square; cursor glow floats over top.
 * Updated for 16:9 landscape aspect ratio (192 x 108).
 * 
 * V2 Changes:
 * - Thinner traces (strokeWidth reduced).
 * - Added IC components to left and right edges.
 * - Increased trace density with connections between ICs and CPU.
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

    // Primary traces (animated) - connecting CPU to outside and ICs
    const primaryTraces = [
        // --- ORIGINAL CPU FANOUT ---
        // LEFT (connects to x=88)
        "M88 48 H70 V40 H50 V30 H-5",
        "M88 52 H74 V58 H60 V68 H-5",
        "M88 56 H76 V64 H54 V80 H-5",
        "M88 60 H72 V70 H40 V90 H-5",

        // RIGHT (connects to x=104)
        "M104 48 H122 V40 H142 V30 H195",
        "M104 52 H118 V58 H132 V68 H195",
        "M104 56 H116 V64 H138 V80 H195",
        "M104 60 H120 V70 H152 V90 H195",

        // TOP (connects to y=46)
        "M92 46 V34 H80 V20 H70 V-5",
        "M96 46 V30 H96 V15 H106 V-5",
        "M100 46 V34 H112 V20 H122 V-5",
        "M104 46 V36 H120 V24 H140 V-5",

        // BOTTOM (connects to y=62)
        "M92 62 V74 H80 V84 H70 V115",
        "M96 62 V78 H96 V90 H106 V115",
        "M100 62 V74 H112 V84 H122 V115",
        "M104 62 V72 H120 V80 H140 V115",

        // --- NEW IC CONNECTIONS (Left IC at x=18, Right IC at x=174) ---
        // Left IC -> CPU area
        "M18 44 H30 V47 H88",
        "M18 50 H40 V53 H88",
        "M18 58 H35 V55 H88",
        "M18 64 H25 V61 H88",

        // Right IC -> CPU area
        "M174 44 H160 V47 H104",
        "M174 50 H150 V53 H104",
        "M174 58 H155 V55 H104",
        "M174 64 H165 V61 H104",
    ];

    // Secondary traces (dim background) - denser network
    const secondaryTraces = [
        // --- ORIGINAL ZONES ---
        // upper-left
        "M-5 10 H40 V18 H60",
        "M-5 24 H30 V32 H50",
        "M-5 38 H45 V44 H65",
        "M-5 52 H35 V60 H55",

        // upper-right
        "M150 10 H170 V18 H195",
        "M140 24 H160 V32 H195",
        "M130 38 H155 V44 H195",
        "M145 52 H165 V60 H195",

        // lower-left
        "M-5 70 H40 V78 H60",
        "M-5 84 H30 V92 H50",
        "M-5 98 H45 V104 H65",

        // lower-right
        "M150 70 H170 V78 H195",
        "M140 84 H160 V92 H195",
        "M130 98 H155 V104 H195",

        // vertical “buses”
        "M30 -5 V40",
        "M50 -5 V30",
        "M70 -5 V20",
        "M122 -5 V20",
        "M142 -5 V30",
        "M162 -5 V40",

        "M30 70 V115",
        "M50 80 V115",
        "M70 90 V115",
        "M122 90 V115",
        "M142 80 V115",
        "M162 70 V115",

        // --- NEW DENSITY ---
        // Inter-IC connections (long horizontal runs)
        "M18 20 H174",
        "M18 88 H174",

        // More vertical density
        "M24 10 V98",
        "M168 10 V98",
        "M60 10 V40",
        "M132 10 V40",
        "M60 68 V98",
        "M132 68 V98",

        // Complex jogs around CPU
        "M65 35 H80 V25 H112 V35 H127",
        "M65 73 H80 V83 H112 V73 H127",

        // Corner fillers
        "M10 10 H20 V20 H10",
        "M182 10 H172 V20 H182",
        "M10 98 H20 V88 H10",
        "M182 98 H172 V88 H182",
    ];

    return (
        <div className="fixed inset-0 -z-10 bg-[#050816]">
            {/* PCB SVG background */}
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
              animation: pulseTrace 3s linear infinite;
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

                {/* solid navy base */}
                <rect x="0" y="0" width="192" height="108" fill="#050816" />

                {/* secondary traces (dim) */}
                {secondaryTraces.map((d, i) => (
                    <path key={`bg-${i}`} d={d} className="pcb-trace-dim-v2" />
                ))}

                {/* primary traces (with pulses) */}
                {primaryTraces.map((d, i) => (
                    <g key={`p-${i}`}>
                        <path d={d} className="pcb-trace-v2" />
                        <path
                            d={d}
                            className="pcb-trace-active-v2"
                            style={{ animationDelay: `${i * 0.5}s` }} // Faster stagger for more activity
                        />
                    </g>
                ))}

                {/* central CPU – small and always square */}
                <rect
                    x="88"
                    y="46"
                    width="16"
                    height="16"
                    rx="2.5"
                    fill="#020617"
                    stroke="#1f2937"
                    strokeWidth="0.8"
                />

                {/* Left IC */}
                <g transform="translate(10, 40)">
                    <rect width="8" height="28" rx="1" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
                    {/* Pins */}
                    {[...Array(6)].map((_, i) => (
                        <React.Fragment key={`l-pin-${i}`}>
                            <line x1="-2" y1={4 + i * 4} x2="0" y2={4 + i * 4} stroke="#475569" strokeWidth="0.5" />
                            <line x1="8" y1={4 + i * 4} x2="10" y2={4 + i * 4} stroke="#475569" strokeWidth="0.5" />
                        </React.Fragment>
                    ))}
                </g>

                {/* Right IC */}
                <g transform="translate(174, 40)">
                    <rect width="8" height="28" rx="1" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
                    {/* Pins */}
                    {[...Array(6)].map((_, i) => (
                        <React.Fragment key={`r-pin-${i}`}>
                            <line x1="-2" y1={4 + i * 4} x2="0" y2={4 + i * 4} stroke="#475569" strokeWidth="0.5" />
                            <line x1="8" y1={4 + i * 4} x2="10" y2={4 + i * 4} stroke="#475569" strokeWidth="0.5" />
                        </React.Fragment>
                    ))}
                </g>

            </svg>

            {/* cursor glow ABOVE PCB */}
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

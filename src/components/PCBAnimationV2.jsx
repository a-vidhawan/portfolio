// src/components/PCBAnimationV2.jsx
import React, { useEffect, useState } from "react";

/**
 * Full-screen PCB-style background with a central CPU and
 * animated traces. Pure SVG, no masks or grids, only H/V
 * traces. CPU stays square; cursor glow floats over top.
 * Updated for 16:9 landscape aspect ratio (192 x 108).
 * 
 * V3 Refined:
 * - Removed side ICs/components.
 * - Central CPU focus.
 * - Dense, long "snake" traces (Manhattan style).
 * - Slower pulses (6s).
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
        // --- CPU FANOUT (Extending to edges/off-screen) ---

        // LEFT (connects to x=88)
        "M88 48 H60 V20 H10 V-5",
        "M88 52 H50 V30 H-5",
        "M88 56 H50 V80 H-5",
        "M88 60 H60 V90 H10 V115",

        // RIGHT (connects to x=104)
        "M104 48 H130 V20 H180 V-5",
        "M104 52 H140 V30 H195",
        "M104 56 H140 V80 H195",
        "M104 60 H130 V90 H180 V115",

        // TOP (connects to y=46)
        "M92 46 V30 H60 V10 H-5",
        "M96 46 V20 H96 V-5",
        "M100 46 V20 H100 V-5",
        "M104 46 V30 H130 V10 H195",

        // BOTTOM (connects to y=62)
        "M92 62 V80 H60 V100 H-5",
        "M96 62 V90 H96 V115",
        "M100 62 V90 H100 V115",
        "M104 62 V80 H130 V100 H195",

        // --- LONG SNAKING TRACES (Manhattan Style) ---

        // Top-Left to Bottom-Right Snake
        "M10 -5 V15 H30 V40 H45 V60 H70 V85 H110 V100 H150 V115",

        // Bottom-Left to Top-Right Snake
        "M-5 100 H20 V80 H40 V50 H80 V35 H120 V20 H160 V-5",

        // Wide Horizontal Snake (Top)
        "M-5 25 H50 V35 H140 V25 H195",

        // Wide Horizontal Snake (Bottom)
        "M195 85 H140 V75 H50 V85 H-5",

        // Vertical Snake (Left)
        "M35 -5 V30 H25 V80 H35 V115",

        // Vertical Snake (Right)
        "M155 -5 V30 H165 V80 H155 V115",

        // Complex Central Loop (Left)
        "M-5 54 H30 V45 H45 V63 H30 V54",

        // Complex Central Loop (Right)
        "M195 54 H162 V45 H147 V63 H162 V54",
    ];

    const secondaryTraces = [
        // --- FILLER TRACES (High Density) ---

        // Top Left Quadrant
        "M5 5 V15 H15 V5 H5",
        "M20 5 H40 V10 H20",
        "M5 30 H20 V40 H5",
        "M40 20 V40 H55",

        // Top Right Quadrant
        "M187 5 V15 H177 V5 H187",
        "M152 5 H172 V10 H152",
        "M187 30 H172 V40 H187",
        "M152 20 V40 H137",

        // Bottom Left Quadrant
        "M5 103 V93 H15 V103 H5",
        "M20 103 H40 V98 H20",
        "M5 78 H20 V68 H5",
        "M40 88 V68 H55",

        // Bottom Right Quadrant
        "M187 103 V93 H177 V103 H187",
        "M152 103 H172 V98 H152",
        "M187 78 H172 V68 H187",
        "M152 88 V68 H137",

        // Mid-Vertical Buses
        "M75 -5 V40",
        "M117 -5 V40",
        "M75 115 V68",
        "M117 115 V68",

        // CPU Surround
        "M82 40 H110",
        "M82 68 H110",
        "M82 40 V68",
        "M110 40 V68",
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
                            style={{ animationDelay: `${i * 0.5}s` }}
                        />
                    </g>
                ))}

                {/* Central CPU */}
                <rect x="88" y="46" width="16" height="16" rx="2.5" fill="#020617" stroke="#1f2937" strokeWidth="0.8" />

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

import {Headphones, Leaf} from 'lucide-react'
import {NeonButton} from './NeonButton'

interface OnboardingProps {
  onStart: () => void
}

export function Onboarding({onStart}: OnboardingProps) {
  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-[#050508]">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[250px] h-[250px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Section: Typography */}
      <div className="pt-16 px-8 z-10">
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white mb-6">
          Stop <br />
          Overspending <br />
          on Sets
        </h1>
        <p className="text-gray-400 text-base max-w-[260px] leading-relaxed font-light">
          Tell us your budget. We build the perfect combo
        </p>
      </div>

      {/* Middle Section: Wireframe Illustration */}
      <div className="flex-1 flex items-center justify-center relative z-10 -mt-8">
        <div className="relative w-full max-w-[340px] aspect-square">
          {/* Center Glow behind box */}
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-[#a3ff12]/20 blur-[60px] rounded-full" />

          {/* Floating Icons Container */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Headphones - Top Left */}
            <div className="absolute top-[20%] left-[15%] animate-bounce-slow">
              <Headphones className="text-[#a3ff12] w-12 h-12 drop-shadow-[0_0_10px_rgba(163,255,18,0.5)] transform -rotate-[25deg] stroke-[1.5]" />
              {/* Wire connecting to box */}
              <svg className="absolute top-full left-1/2 w-20 h-20 -z-10 opacity-30 pointer-events-none overflow-visible">
                <path
                  d="M0 0 Q 10 40 60 80"
                  fill="none"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            {/* Plant/Cube - Top Rightish */}
            <div className="absolute top-[15%] right-[25%] animate-bounce-slower">
              <div className="relative">
                {/* Cube shape for plant pot */}
                <div className="w-8 h-8 border border-[#a3ff12]/50 bg-black/50 transform rotate-12 backdrop-blur-sm flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(163,255,18,0.2)]">
                  <Leaf className="text-[#a3ff12] w-5 h-5 drop-shadow-[0_0_10px_rgba(163,255,18,0.5)] -mt-4" />
                </div>
              </div>
            </div>

            {/* Shoe - High Right */}
            <div className="absolute top-[30%] right-[10%] animate-bounce-slowest">
              <svg
                width="50"
                height="50"
                viewBox="0 0 60 40"
                className="drop-shadow-[0_0_10px_rgba(163,255,18,0.5)] transform rotate-[15deg]"
              >
                <path
                  d="M10 20 Q 30 10 50 20 L 55 25 Q 60 30 50 35 L 20 40 Q 5 35 10 20"
                  fill="none"
                  stroke="#a3ff12"
                  strokeWidth="1.5"
                />
                <path
                  d="M15 22 L 45 22"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <path
                  d="M20 28 L 40 28"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
              </svg>
              {/* Wire */}
              <svg className="absolute top-full right-1/2 w-20 h-20 -z-10 opacity-30 pointer-events-none overflow-visible">
                <path
                  d="M0 0 Q -10 30 -50 60"
                  fill="none"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          </div>

          {/* The Wireframe Box */}
          <div className="absolute inset-0 flex items-center justify-center top-10">
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full drop-shadow-[0_0_20px_rgba(163,255,18,0.7)] overflow-visible"
            >
              <defs>
                <linearGradient
                  id="boxGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a3ff12" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#a3ff12" stopOpacity="0" />
                </linearGradient>
              </defs>

              <g transform="translate(150, 150)">
                {/* Inner Glow Floor */}
                <path
                  d="M-60 -20 L0 10 L60 -20 L0 -50 Z"
                  fill="#a3ff12"
                  fillOpacity="0.15"
                  className="animate-pulse"
                />

                {/* Icon Inside Box (Shoe/Item) */}
                <g transform="translate(-15, -45) scale(0.8)">
                  {/* Stylized shoe outline inside */}
                  <path
                    d="M10 20 Q 30 10 50 20 L 55 25 Q 60 30 50 35 L 20 40 Q 5 35 10 20"
                    fill="none"
                    stroke="#a3ff12"
                    strokeWidth="2"
                  />
                  <path
                    d="M15 22 L 45 22"
                    stroke="#a3ff12"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                  />
                  <path
                    d="M20 28 L 40 28"
                    stroke="#a3ff12"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                  />
                  {/* Glow under shoe */}
                  <ellipse
                    cx="30"
                    cy="35"
                    rx="20"
                    ry="8"
                    fill="#a3ff12"
                    fillOpacity="0.3"
                    filter="blur(5px)"
                  />
                </g>

                {/* Vertical Walls */}
                {/* Front Left Wall */}
                <path
                  d="M-60 -20 L-60 40 L0 70 L0 10 Z"
                  fill="url(#boxGradient)"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                {/* Front Right Wall */}
                <path
                  d="M60 -20 L60 40 L0 70 L0 10 Z"
                  fill="url(#boxGradient)"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />

                {/* Back lines (dashed) */}
                <path
                  d="M-60 -20 L0 -50"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="5,5"
                />
                <path
                  d="M60 -20 L0 -50"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="5,5"
                />
                <path
                  d="M0 -50 L0 10"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="5,5"
                />

                {/* Top Flaps (Opening) */}
                {/* Back Left Flap (opens up-left) */}
                <path
                  d="M-60 -20 L0 -50 L-30 -80 L-90 -50 Z"
                  fill="none"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />

                {/* Back Right Flap (opens up-right) */}
                <path
                  d="M60 -20 L0 -50 L30 -80 L90 -50 Z"
                  fill="none"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />

                {/* Front Left Flap (opens down-left) */}
                <path
                  d="M-60 -20 L0 10 L-30 40 L-90 10 Z"
                  fill="none"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />

                {/* Front Right Flap (opens down-right) */}
                <path
                  d="M60 -20 L0 10 L30 40 L90 10 Z"
                  fill="none"
                  stroke="#a3ff12"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />

                {/* Highlight Edges (Neon Lines) */}
                <path d="M0 10 L0 70" stroke="#a3ff12" strokeWidth="2" />{' '}
                {/* Center Vertical */}
                <path
                  d="M-60 -20 L0 10 L60 -20"
                  stroke="#a3ff12"
                  strokeWidth="2"
                />{' '}
                {/* Top V */}
                <path
                  d="M-60 40 L0 70 L60 40"
                  stroke="#a3ff12"
                  strokeWidth="2"
                />{' '}
                {/* Bottom V */}
                {/* Corner Accents (Dots) */}
                <circle cx="-60" cy="-20" r="2" fill="#a3ff12" />
                <circle cx="60" cy="-20" r="2" fill="#a3ff12" />
                <circle cx="0" cy="10" r="2" fill="#a3ff12" />
                <circle cx="0" cy="70" r="2" fill="#a3ff12" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Section: CTA */}
      <div className="pb-12 px-8 z-10 w-full flex flex-col items-center gap-6">
        <div className="w-full max-w-[340px] shadow-[0_10px_40px_-10px_rgba(163,255,18,0.3)] rounded-full">
          <NeonButton onClick={onStart} icon="arrow" className="text-lg">
            Let's Start
          </NeonButton>
        </div>
      </div>
    </div>
  )
}

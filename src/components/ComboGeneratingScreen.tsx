import { Sparkles } from 'lucide-react'

const BARS = 7
const BEAT_MS = 400

export function ComboGeneratingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508] px-6 safe-area-bottom">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#050508] to-[#0a0a0f] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Icon with soft glow */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#a3ff12]/10 border border-[#a3ff12]/30 shadow-[0_0_40px_rgba(163,255,18,0.15)]">
          <Sparkles className="text-[#a3ff12]" size={32} strokeWidth={2} />
        </div>

        <h2 className="text-xl font-semibold text-white text-center mb-2">
          Generating your combo
        </h2>
        <p className="text-sm text-gray-500 text-center max-w-[260px] mb-12">
          Finding the best products for you
        </p>

        {/* Rhythmic beat bars — same duration, staggered delay for one continuous rhythm */}
        <div className="flex items-end justify-center gap-1.5 h-12" aria-hidden>
          {Array.from({ length: BARS }, (_, i) => (
            <div
              key={i}
              className="combo-beat-bar h-10 w-2 rounded-full bg-[#a3ff12]"
              style={{
                animationDelay: `${(i * BEAT_MS) / BARS}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

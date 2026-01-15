import {ArrowRight, Sparkles} from 'lucide-react'

interface NeonButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
  icon?: 'arrow' | 'sparkles' | 'none'
  disabled?: boolean
  className?: string
}

export function NeonButton({
  onClick,
  children,
  variant = 'primary',
  fullWidth = true,
  icon = 'arrow',
  disabled = false,
  className = '',
}: NeonButtonProps) {
  const baseClasses =
    'relative flex items-center justify-center gap-3 py-4 px-8 rounded-full font-bold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]'

  const primaryClasses =
    'bg-[#a3ff12] text-black shadow-[0_0_20px_rgba(163,255,18,0.3)] hover:shadow-[0_0_30px_rgba(163,255,18,0.5)]'
  const secondaryClasses =
    'bg-transparent border border-[#a3ff12] text-[#a3ff12] hover:bg-[#a3ff12]/10'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {icon === 'sparkles' && <Sparkles size={20} />}
      <span className="text-lg tracking-wide">{children}</span>
      {icon === 'arrow' && (
        <div className="bg-white rounded-full p-1.5 ml-1 flex items-center justify-center">
          <ArrowRight size={16} className="text-black stroke-[3]" />
        </div>
      )}
    </button>
  )
}

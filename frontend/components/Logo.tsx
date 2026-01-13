'use client'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 56, text: 'text-2xl' },
  }

  const { icon, text } = sizes[size]

  return (
    <div className="flex items-center gap-3">
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Africa continent silhouette */}
        <path
          d="M32 4C18.745 4 8 14.745 8 28c0 8.837 4.784 16.549 11.9 20.7L32 60l12.1-11.3C51.216 44.549 56 36.837 56 28c0-13.255-10.745-24-24-24z"
          fill="#0f766e"
          opacity="0.2"
        />
        
        {/* Trophy base */}
        <path
          d="M24 44h16v4H24z"
          fill="#facc15"
        />
        <path
          d="M26 48h12v4H26z"
          fill="#ca8a04"
        />
        
        {/* Trophy cup */}
        <path
          d="M20 16h24v4c0 8-4 14-12 18-8-4-12-10-12-18v-4z"
          fill="#facc15"
        />
        <path
          d="M22 18h20v2c0 6.5-3.5 11.5-10 15-6.5-3.5-10-8.5-10-15v-2z"
          fill="#fde047"
        />
        
        {/* Trophy handles */}
        <path
          d="M16 18c-2 0-4 2-4 4s2 6 6 6v-2c-2 0-4-2-4-4s1-2 2-2v-2z"
          fill="#facc15"
        />
        <path
          d="M48 18c2 0 4 2 4 4s-2 6-6 6v-2c2 0 4-2 4-4s-1-2-2-2v-2z"
          fill="#facc15"
        />
        
        {/* Star on trophy */}
        <path
          d="M32 22l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z"
          fill="#0f766e"
        />
        
        {/* Football pattern */}
        <circle cx="32" cy="28" r="3" fill="#0f766e" opacity="0.3" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-bold ${text} text-white leading-tight`}>
            CAN 2025
          </span>
          <span className="text-xs font-medium text-caf-green-light tracking-wider uppercase">
            Predictor
          </span>
        </div>
      )}
    </div>
  )
}

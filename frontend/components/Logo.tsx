'use client'

import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 36, text: 'text-sm' },
    md: { icon: 48, text: 'text-base' },
    lg: { icon: 64, text: 'text-xl' },
  }

  const { icon, text } = sizes[size]

  return (
    <div className="flex items-center gap-3">
      <Image
        src="/can2025-logo.png"
        alt="CAN 2025 Morocco"
        width={icon}
        height={icon}
        className="flex-shrink-0 object-contain"
        priority
      />

      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-bold ${text} text-white leading-tight`}>
            CAN 2025
          </span>
          <span className="text-[10px] font-medium text-caf-green-light tracking-wider uppercase">
            Predictor
          </span>
        </div>
      )}
    </div>
  )
}

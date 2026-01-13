'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

// Team type for convenience
interface Team {
  flag: string
  name: string
  nameFr?: string
  code?: string
}

interface FlagProps {
  // Option 1: Pass team object directly
  team?: Team
  // Option 2: Pass src and alt separately
  src?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  rounded?: boolean
}

const sizeMap = {
  xs: { width: 20, height: 15, class: 'w-5 h-[15px]' },
  sm: { width: 32, height: 24, class: 'w-8 h-6' },
  md: { width: 48, height: 36, class: 'w-12 h-9' },
  lg: { width: 64, height: 48, class: 'w-16 h-12' },
  xl: { width: 96, height: 72, class: 'w-24 h-18' },
}

export function Flag({ team, src, alt, size = 'md', className, rounded = true }: FlagProps) {
  const { width, height, class: sizeClass } = sizeMap[size]
  
  // Use team object if provided, otherwise use src/alt
  const flagSrc = team?.flag || src || ''
  const flagAlt = team?.name || alt || 'Flag'
  
  if (!flagSrc) return null
  
  return (
    <div className={cn(
      'relative overflow-hidden shadow-lg flex-shrink-0',
      rounded ? 'rounded-sm' : '',
      sizeClass,
      className
    )}>
      <Image
        src={flagSrc}
        alt={flagAlt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        unoptimized // Using external CDN
      />
      {/* Subtle border overlay for better flag definition */}
      <div className="absolute inset-0 border border-white/10 rounded-sm pointer-events-none" />
    </div>
  )
}

// Flag with country name
interface FlagWithNameProps {
  team?: Team
  src?: string
  alt?: string
  name?: string
  code?: string
  showCode?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  direction?: 'horizontal' | 'vertical'
  className?: string
}

export function FlagWithName({ 
  team,
  src, 
  alt, 
  name, 
  code,
  showCode = false,
  size = 'sm', 
  direction = 'horizontal',
  className 
}: FlagWithNameProps) {
  const flagSrc = team?.flag || src || ''
  const flagAlt = team?.name || alt || 'Flag'
  const displayName = team?.nameFr || team?.name || name || ''
  const displayCode = team?.code || code
  
  return (
    <div className={cn(
      'flex items-center gap-2',
      direction === 'vertical' && 'flex-col text-center gap-1',
      className
    )}>
      <Flag src={flagSrc} alt={flagAlt} size={size} />
      <div className={cn(
        'flex flex-col',
        direction === 'vertical' && 'items-center'
      )}>
        <span className="font-medium text-white">{displayName}</span>
        {showCode && displayCode && (
          <span className="text-xs text-white/50 font-mono">{displayCode}</span>
        )}
      </div>
    </div>
  )
}

// Circular flag variant
interface CircularFlagProps {
  team?: Team
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  ring?: boolean
  ringColor?: string
}

const circularSizeMap = {
  sm: { width: 32, height: 32, class: 'w-8 h-8' },
  md: { width: 48, height: 48, class: 'w-12 h-12' },
  lg: { width: 64, height: 64, class: 'w-16 h-16' },
}

export function CircularFlag({ 
  team,
  src, 
  alt, 
  size = 'md', 
  className,
  ring = false,
  ringColor = 'ring-caf-green/50'
}: CircularFlagProps) {
  const { width, height, class: sizeClass } = circularSizeMap[size]
  const flagSrc = team?.flag || src || ''
  const flagAlt = team?.name || alt || 'Flag'
  
  if (!flagSrc) return null
  
  return (
    <div className={cn(
      'relative overflow-hidden rounded-full shadow-lg flex-shrink-0',
      sizeClass,
      ring && `ring-2 ${ringColor}`,
      className
    )}>
      <Image
        src={flagSrc}
        alt={flagAlt}
        width={width}
        height={height}
        className="object-cover w-full h-full scale-150"
        unoptimized
      />
      <div className="absolute inset-0 border border-white/20 rounded-full pointer-events-none" />
    </div>
  )
}

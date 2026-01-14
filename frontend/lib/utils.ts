import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function getProbabilityColor(prob: number): string {
  if (prob >= 30) return 'text-green-400'
  if (prob >= 15) return 'text-yellow-400'
  if (prob >= 5) return 'text-orange-400'
  return 'text-red-400'
}

export function getProbabilityBg(prob: number): string {
  if (prob >= 30) return 'bg-green-500'
  if (prob >= 15) return 'bg-yellow-500'
  if (prob >= 5) return 'bg-orange-500'
  return 'bg-red-500'
}

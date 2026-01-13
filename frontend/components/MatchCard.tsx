'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { getTeamById } from '@/lib/data'
import { Flag } from '@/components/Flag'

interface Match {
  id: number
  team1: string
  team2: string
  winner?: string
  team1Prob?: number
  team2Prob?: number
}

interface MatchCardProps {
  match: Match
  compact?: boolean
  isFinal?: boolean
  onClick?: () => void
}

export default function MatchCard({ match, compact = false, isFinal = false, onClick }: MatchCardProps) {
  const team1 = getTeamById(match.team1)
  const team2 = getTeamById(match.team2)

  if (!team1 || !team2) return null

  const isTeam1Winner = match.winner === match.team1
  const isTeam2Winner = match.winner === match.team2

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-dark-800/80 backdrop-blur-sm border border-white/10 rounded-xl p-3 
        cursor-pointer transition-all duration-300
        ${isFinal ? 'border-caf-gold/40 bg-caf-gold/5 shadow-lg shadow-caf-gold/10' : ''}
        ${match.winner ? '' : 'opacity-70'}
        hover:border-caf-green/50 hover:bg-dark-700/80
      `}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      {/* Team 1 */}
      <div className={`
        flex items-center justify-between p-2.5 rounded-lg mb-1.5 transition-colors
        ${isTeam1Winner ? 'bg-caf-green/20 border border-caf-green/30' : 'bg-dark-700/50'}
      `}>
        <div className="flex items-center gap-2.5">
          <Flag team={team1} size={compact ? 'sm' : 'md'} />
          <span className={`font-medium ${compact ? 'text-sm' : ''} ${isTeam1Winner ? 'text-white' : 'text-gray-300'}`}>
            {compact ? team1.nameFr.substring(0, 10) : team1.nameFr}
          </span>
        </div>
        {match.team1Prob !== undefined && (
          <span className={`text-xs font-mono ${isTeam1Winner ? 'text-caf-green-light' : 'text-gray-500'}`}>
            {match.team1Prob.toFixed(0)}%
          </span>
        )}
      </div>

      {/* VS Divider */}
      <div className="text-center text-[10px] text-gray-600 font-medium uppercase tracking-wider my-1">vs</div>

      {/* Team 2 */}
      <div className={`
        flex items-center justify-between p-2.5 rounded-lg transition-colors
        ${isTeam2Winner ? 'bg-caf-green/20 border border-caf-green/30' : 'bg-dark-700/50'}
      `}>
        <div className="flex items-center gap-2.5">
          <Flag team={team2} size={compact ? 'sm' : 'md'} />
          <span className={`font-medium ${compact ? 'text-sm' : ''} ${isTeam2Winner ? 'text-white' : 'text-gray-300'}`}>
            {compact ? team2.nameFr.substring(0, 10) : team2.nameFr}
          </span>
        </div>
        {match.team2Prob !== undefined && (
          <span className={`text-xs font-mono ${isTeam2Winner ? 'text-caf-green-light' : 'text-gray-500'}`}>
            {match.team2Prob.toFixed(0)}%
          </span>
        )}
      </div>

      {/* Winner indicator */}
      {match.winner && (
        <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-caf-green" />
          <span className="text-xs text-caf-green-light font-medium">
            {isTeam1Winner ? team1.nameFr : team2.nameFr} advances
          </span>
        </div>
      )}
    </motion.div>
  )
}

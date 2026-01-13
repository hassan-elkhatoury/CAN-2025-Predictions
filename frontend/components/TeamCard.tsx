'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Award } from 'lucide-react'
import { Team } from '@/lib/data'
import { formatPercent, getProbabilityColor } from '@/lib/utils'
import { Flag } from '@/components/Flag'

interface TeamCardProps {
  team: Team
  rank: number
  expanded?: boolean
}

const rankColors = [
  'from-yellow-500/20 to-yellow-600/5 border-yellow-500/30',  // Gold
  'from-gray-300/20 to-gray-400/5 border-gray-400/30',        // Silver
  'from-amber-600/20 to-amber-700/5 border-amber-700/30',     // Bronze
  'from-dark-700 to-dark-800 border-white/10',
  'from-dark-700 to-dark-800 border-white/10',
]

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />
  if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />
  if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />
  return <span className="text-lg font-bold text-gray-500">#{rank}</span>
}

export default function TeamCard({ team, rank, expanded = false }: TeamCardProps) {
  const isTopThree = rank <= 3

  return (
    <motion.div
      className={`
        bg-gradient-to-br ${rankColors[Math.min(rank - 1, 4)]} 
        border rounded-xl p-5 relative overflow-hidden
        backdrop-blur-sm transition-all duration-300
        hover:border-caf-green/40 hover:shadow-lg hover:shadow-caf-green/5
      `}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Rank badge */}
      <div className="absolute top-3 right-3">
        <RankBadge rank={rank} />
      </div>

      {/* Flag and Name */}
      <div className="flex items-center gap-3 mb-4">
        <Flag team={team} size="lg" className="ring-2 ring-white/10" />
        <div>
          <h3 className="font-bold text-white text-lg">{team.nameFr}</h3>
          <p className="text-xs text-gray-400">FIFA #{team.fifaRank}</p>
        </div>
      </div>

      {/* Champion Probability */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-400">Champion</span>
          <span className={`font-bold text-sm ${getProbabilityColor(team.championProb)}`}>
            {formatPercent(team.championProb)}
          </span>
        </div>
        <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-caf-green to-caf-green-light"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(team.championProb * 2.5, 100)}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Finalist Probability */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-400">Finalist</span>
          <span className="text-sm text-gray-300">
            {formatPercent(team.finalistProb)}
          </span>
        </div>
        <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-caf-gold/70"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(team.finalistProb * 2.5, 100)}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </div>

      {/* Recent Form */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
        <span className="text-xs text-gray-400">Recent Form</span>
        <div className="flex gap-1">
          {team.recentForm.map((result: string, i: number) => (
            <span
              key={i}
              className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                result === 'W' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                result === 'D' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {result}
            </span>
          ))}
        </div>
      </div>

      {/* CAN Titles */}
      {team.canTitles > 0 && (
        <div className="flex items-center gap-1.5 mt-3">
          <Trophy className="w-3.5 h-3.5 text-caf-gold" />
          <span className="text-xs text-gray-400">
            {team.canTitles} CAN title{team.canTitles > 1 ? 's' : ''}
          </span>
        </div>
      )}
    </motion.div>
  )
}

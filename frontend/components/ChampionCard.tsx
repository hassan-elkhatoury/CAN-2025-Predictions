'use client'

import { motion } from 'framer-motion'
import { Trophy, TrendingUp, Star } from 'lucide-react'
import { Team } from '@/lib/data'
import { formatPercent } from '@/lib/utils'
import { Flag } from '@/components/Flag'

interface ChampionCardProps {
  team: Team
}

export default function ChampionCard({ team }: ChampionCardProps) {
  return (
    <motion.div
      className="relative bg-gradient-to-b from-dark-800/90 to-dark-900/90 backdrop-blur-xl 
                 border border-caf-green/30 rounded-2xl p-8 md:p-12 text-center max-w-md w-full
                 shadow-2xl shadow-caf-green/20"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-caf-green/10 via-transparent to-caf-gold/5 rounded-2xl" />
      
      {/* Decorative stars */}
      <div className="absolute top-4 left-4">
        <Star className="w-4 h-4 text-caf-gold/40" />
      </div>
      <div className="absolute top-6 right-8">
        <Star className="w-3 h-3 text-caf-gold/30" />
      </div>
      <div className="absolute bottom-8 left-6">
        <Star className="w-3 h-3 text-caf-gold/20" />
      </div>
      
      {/* Trophy animation */}
      <motion.div
        className="relative z-10 mb-4"
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Trophy className="w-16 h-16 md:w-20 md:h-20 mx-auto text-caf-gold drop-shadow-lg" />
      </motion.div>

      {/* Label */}
      <p className="relative z-10 text-caf-gold font-semibold text-sm uppercase tracking-[0.2em] mb-4">
        Predicted Champion
      </p>

      {/* Flag */}
      <div className="relative z-10 flex justify-center mb-4">
        <Flag 
          team={team} 
          size="xl" 
          className="ring-4 ring-caf-green/30 shadow-xl shadow-black/50" 
        />
      </div>

      {/* Team Name */}
      <h2 className="relative z-10 text-3xl md:text-4xl font-display font-bold text-white mb-3">
        {team.nameFr}
      </h2>

      {/* Probability */}
      <div className="relative z-10 flex items-center justify-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-caf-green-light" />
        <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-caf-green-light to-caf-gold bg-clip-text text-transparent">
          {formatPercent(team.championProb)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 h-3 bg-dark-700 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-caf-green to-caf-green-light"
          initial={{ width: 0 }}
          animate={{ width: `${team.championProb}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      {/* Additional stats */}
      <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
        <div className="bg-dark-700/50 rounded-lg p-3">
          <p className="text-xl font-bold text-caf-gold">{formatPercent(team.finalistProb)}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Finalist</p>
        </div>
        <div className="bg-dark-700/50 rounded-lg p-3">
          <p className="text-xl font-bold text-white">{team.fifaRank}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">FIFA Rank</p>
        </div>
        <div className="bg-dark-700/50 rounded-lg p-3">
          <p className="text-xl font-bold text-white">{team.canTitles}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">CAN Titles</p>
        </div>
      </div>

      {/* Simulation info */}
      <p className="relative z-10 text-xs text-gray-500 mt-6">
        Based on 1,000 Monte Carlo simulations
      </p>
    </motion.div>
  )
}

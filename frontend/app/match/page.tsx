'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, RotateCcw, TrendingUp, Users, Scale, Target, Sparkles } from 'lucide-react'
import { teams, getTeamById, predictMatch, Team, getFormColor } from '@/lib/data'
import { Flag, CircularFlag } from '@/components/Flag'

export default function MatchPage() {
  const [team1, setTeam1] = useState<Team | null>(null)
  const [team2, setTeam2] = useState<Team | null>(null)
  const [prediction, setPrediction] = useState<{
    winner: string | 'draw'
    team1WinProb: number
    drawProb: number
    team2WinProb: number
    confidence: number
  } | null>(null)
  const [isPredicting, setIsPredicting] = useState(false)
  const [draggedTeam, setDraggedTeam] = useState<Team | null>(null)

  const handleDragStart = (team: Team) => {
    setDraggedTeam(team)
  }

  const handleDrop = (slot: 1 | 2) => {
    if (!draggedTeam) return
    
    if (slot === 1) {
      if (team2?.id === draggedTeam.id) setTeam2(null)
      setTeam1(draggedTeam)
    } else {
      if (team1?.id === draggedTeam.id) setTeam1(null)
      setTeam2(draggedTeam)
    }
    setDraggedTeam(null)
    setPrediction(null)
  }

  const handleTeamClick = (team: Team) => {
    if (!team1) {
      setTeam1(team)
    } else if (!team2 && team.id !== team1.id) {
      setTeam2(team)
    } else if (team1.id === team.id) {
      setTeam1(null)
    } else if (team2?.id === team.id) {
      setTeam2(null)
    }
    setPrediction(null)
  }

  const runPrediction = async () => {
    if (!team1 || !team2) return
    
    setIsPredicting(true)
    setPrediction(null)
    
    await new Promise(r => setTimeout(r, 800))
    
    const result = await predictMatch(team1.id, team2.id)
    setPrediction(result)
    setIsPredicting(false)
  }

  const reset = () => {
    setTeam1(null)
    setTeam2(null)
    setPrediction(null)
  }

  const getWinnerTeam = () => {
    if (!prediction || prediction.winner === 'draw') return null
    return prediction.winner === team1?.id ? team1 : team2
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2 flex items-center gap-3">
          <Target className="text-caf-green" />
          Match Predictor
        </h1>
        <p className="text-white/50">
          Drag teams to the arena or click to select. Run AI prediction for any matchup.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Selection Panel */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-caf-green" />
            <h3 className="text-lg font-semibold text-white">Select Teams</h3>
          </div>
          
          <div className="card-glass p-4 max-h-[600px] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {teams.map((team) => {
                const isSelected = team1?.id === team.id || team2?.id === team.id
                const isTeam1 = team1?.id === team.id
                const isTeam2 = team2?.id === team.id
                
                return (
                  <motion.div
                    key={team.id}
                    draggable
                    onDragStart={() => handleDragStart(team)}
                    onClick={() => handleTeamClick(team)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-3 rounded-xl cursor-pointer transition-all duration-200
                      ${isTeam1 ? 'bg-blue-500/20 ring-2 ring-blue-500' : 
                        isTeam2 ? 'bg-red-500/20 ring-2 ring-red-500' : 
                        'bg-white/5 hover:bg-white/10 ring-1 ring-white/10'}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Flag src={team.flag} alt={team.name} size="xs" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm truncate">{team.name}</p>
                        <p className="text-xs text-white/40">#{team.fifaRank}</p>
                      </div>
                      {isTeam1 && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                      {isTeam2 && <span className="w-2 h-2 rounded-full bg-red-500" />}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Match Arena */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Drop Zones */}
          <div className="flex items-stretch justify-center gap-4 md:gap-6 mb-6">
            {/* Team 1 Drop Zone */}
            <motion.div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(1)}
              className={`
                flex-1 max-w-[280px] rounded-2xl border-2 border-dashed transition-all duration-300
                ${team1 ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/20 bg-white/5 hover:border-white/30'}
              `}
            >
              {team1 ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-6 text-center"
                >
                  <div className="relative inline-block mb-4">
                    <Flag src={team1.flag} alt={team1.name} size="xl" className="mx-auto" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                      A
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{team1.name}</h3>
                  <p className="text-sm text-white/40 mb-3">FIFA Rank #{team1.fifaRank}</p>
                  
                  {/* Recent Form */}
                  <div className="flex justify-center gap-1">
                    {team1.recentForm.map((r, i) => (
                      <span key={i} className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center border ${getFormColor(r)}`}>
                        {r}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl text-white/20">A</span>
                  </div>
                  <p className="text-white/30 text-sm">Drop Team A</p>
                  <p className="text-white/20 text-xs mt-1">or click to select</p>
                </div>
              )}
            </motion.div>

            {/* VS Divider */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-caf-green/20 to-caf-gold/20 flex items-center justify-center border border-white/10">
                <span className="text-lg font-bold text-white/60">VS</span>
              </div>
            </div>

            {/* Team 2 Drop Zone */}
            <motion.div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(2)}
              className={`
                flex-1 max-w-[280px] rounded-2xl border-2 border-dashed transition-all duration-300
                ${team2 ? 'border-red-500/50 bg-red-500/5' : 'border-white/20 bg-white/5 hover:border-white/30'}
              `}
            >
              {team2 ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-6 text-center"
                >
                  <div className="relative inline-block mb-4">
                    <Flag src={team2.flag} alt={team2.name} size="xl" className="mx-auto" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold text-white">
                      B
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{team2.name}</h3>
                  <p className="text-sm text-white/40 mb-3">FIFA Rank #{team2.fifaRank}</p>
                  
                  {/* Recent Form */}
                  <div className="flex justify-center gap-1">
                    {team2.recentForm.map((r, i) => (
                      <span key={i} className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center border ${getFormColor(r)}`}>
                        {r}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl text-white/20">B</span>
                  </div>
                  <p className="text-white/30 text-sm">Drop Team B</p>
                  <p className="text-white/20 text-xs mt-1">or click to select</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={runPrediction}
              disabled={!team1 || !team2 || isPredicting}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPredicting ? (
                <Sparkles className="w-5 h-5 animate-pulse" />
              ) : (
                <Zap className="w-5 h-5" />
              )}
              {isPredicting ? 'Analyzing...' : 'Predict Match'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={reset}
              className="btn-secondary flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </motion.button>
          </div>

          {/* Prediction Result */}
          <AnimatePresence>
            {prediction && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30 }}
                className="card-premium p-6 md:p-8"
              >
                {/* Winner */}
                <div className="text-center mb-8">
                  {prediction.winner === 'draw' ? (
                    <div>
                      <div className="w-20 h-20 rounded-full bg-yellow-500/20 mx-auto mb-4 flex items-center justify-center">
                        <Scale className="w-10 h-10 text-yellow-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-yellow-400">Draw Predicted</h3>
                      <p className="text-white/40 text-sm mt-2">Teams are evenly matched</p>
                    </div>
                  ) : (
                    <div>
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 0.6, repeat: 2 }}
                        className="inline-block mb-4"
                      >
                        <Flag src={getWinnerTeam()!.flag} alt={getWinnerTeam()!.name} size="xl" />
                      </motion.div>
                      <p className="text-caf-green font-semibold uppercase tracking-widest text-sm mb-2">
                        Predicted Winner
                      </p>
                      <h3 className="text-3xl font-display font-bold text-white">
                        {getWinnerTeam()?.name}
                      </h3>
                    </div>
                  )}
                </div>

                {/* Probability Bars */}
                <div className="space-y-4 mb-8">
                  {/* Team 1 Win */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-white/60 flex items-center gap-2">
                        <Flag src={team1!.flag} alt={team1!.name} size="xs" />
                        {team1?.name} Win
                      </span>
                      <span className="text-sm font-bold text-blue-400">{prediction.team1WinProb.toFixed(1)}%</span>
                    </div>
                    <div className="progress-bar h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.team1WinProb}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Draw */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-white/60">Draw</span>
                      <span className="text-sm font-bold text-yellow-400">{prediction.drawProb.toFixed(1)}%</span>
                    </div>
                    <div className="progress-bar h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.drawProb}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Team 2 Win */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-white/60 flex items-center gap-2">
                        <Flag src={team2!.flag} alt={team2!.name} size="xs" />
                        {team2?.name} Win
                      </span>
                      <span className="text-sm font-bold text-red-400">{prediction.team2WinProb.toFixed(1)}%</span>
                    </div>
                    <div className="progress-bar h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.team2WinProb}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Confidence Meter */}
                <div className="card-glass p-4 text-center">
                  <p className="text-sm text-white/40 mb-2">Model Confidence</p>
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-5 h-5 text-caf-green" />
                    <span className="text-2xl font-bold text-caf-green">
                      {Math.min(prediction.confidence + 50, 95).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-center text-sm text-white/40 mt-6">
                  {prediction.winner !== 'draw' ? (
                    <>
                      {getWinnerTeam()?.name} predicted to win based on FIFA ranking (#{getWinnerTeam()?.fifaRank}),
                      recent form, and historical CAN performance.
                    </>
                  ) : (
                    <>Both teams have similar strength levels, resulting in a predicted draw.</>
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

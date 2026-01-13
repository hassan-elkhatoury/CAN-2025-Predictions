'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Trophy, Zap, AlertTriangle, ChevronRight, Award } from 'lucide-react'
import { teams, roundOf16Matches, getTeamById, predictMatch } from '@/lib/data'
import { Flag } from '@/components/Flag'

interface PredictionStep {
  stage: string
  match: {
    team1: string
    team2: string
    winner: string
    team1Prob: number
    team2Prob: number
    isUpset: boolean
  }
}

export default function BracketPage() {
  const [isPredicting, setIsPredicting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [predictions, setPredictions] = useState<PredictionStep[]>([])
  const [champion, setChampion] = useState<string | null>(null)

  const runPrediction = async () => {
    setIsPredicting(true)
    setPredictions([])
    setChampion(null)
    setCurrentStep(0)

    const allPredictions: PredictionStep[] = []
    
    // Round of 16
    const ro16Winners: string[] = []
    for (const match of roundOf16Matches) {
      const result = predictMatch(match.team1, match.team2)
      const winner = result.winner === 'draw' ? match.team1 : result.winner
      const team1 = getTeamById(match.team1)
      const team2 = getTeamById(match.team2)
      const isUpset = winner === match.team2 && (team2?.championProb || 0) < (team1?.championProb || 0) * 0.5
      
      ro16Winners.push(winner)
      allPredictions.push({
        stage: 'Round of 16',
        match: {
          team1: match.team1,
          team2: match.team2,
          winner,
          team1Prob: result.team1WinProb,
          team2Prob: result.team2WinProb,
          isUpset,
        }
      })
      
      setPredictions([...allPredictions])
      setCurrentStep(allPredictions.length)
      await new Promise(r => setTimeout(r, 500))
    }

    // Quarter Finals
    const qfWinners: string[] = []
    for (let i = 0; i < 4; i++) {
      const team1 = ro16Winners[i * 2]
      const team2 = ro16Winners[i * 2 + 1]
      const result = predictMatch(team1, team2)
      const winner = result.winner === 'draw' ? team1 : result.winner
      const t1 = getTeamById(team1)
      const t2 = getTeamById(team2)
      const isUpset = winner === team2 && (t2?.championProb || 0) < (t1?.championProb || 0) * 0.5
      
      qfWinners.push(winner)
      allPredictions.push({
        stage: 'Quarter Final',
        match: {
          team1,
          team2,
          winner,
          team1Prob: result.team1WinProb,
          team2Prob: result.team2WinProb,
          isUpset,
        }
      })
      
      setPredictions([...allPredictions])
      setCurrentStep(allPredictions.length)
      await new Promise(r => setTimeout(r, 700))
    }

    // Semi Finals
    const sfWinners: string[] = []
    for (let i = 0; i < 2; i++) {
      const team1 = qfWinners[i * 2]
      const team2 = qfWinners[i * 2 + 1]
      const result = predictMatch(team1, team2)
      const winner = result.winner === 'draw' ? team1 : result.winner
      const t1 = getTeamById(team1)
      const t2 = getTeamById(team2)
      const isUpset = winner === team2 && (t2?.championProb || 0) < (t1?.championProb || 0) * 0.5
      
      sfWinners.push(winner)
      allPredictions.push({
        stage: 'Semi Final',
        match: {
          team1,
          team2,
          winner,
          team1Prob: result.team1WinProb,
          team2Prob: result.team2WinProb,
          isUpset,
        }
      })
      
      setPredictions([...allPredictions])
      setCurrentStep(allPredictions.length)
      await new Promise(r => setTimeout(r, 900))
    }

    // Final
    const team1 = sfWinners[0]
    const team2 = sfWinners[1]
    const result = predictMatch(team1, team2)
    const winner = result.winner === 'draw' ? team1 : result.winner
    
    allPredictions.push({
      stage: 'Final',
      match: {
        team1,
        team2,
        winner,
        team1Prob: result.team1WinProb,
        team2Prob: result.team2WinProb,
        isUpset: false,
      }
    })
    
    setPredictions([...allPredictions])
    setCurrentStep(allPredictions.length)
    await new Promise(r => setTimeout(r, 500))
    
    setChampion(winner)
    setIsPredicting(false)
  }

  const championTeam = champion ? getTeamById(champion) : null

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2 flex items-center gap-3">
          <Award className="text-caf-gold" />
          Bracket Predictor
        </h1>
        <p className="text-white/50 max-w-xl">
          Watch the AI predict each match step-by-step through the entire tournament bracket.
        </p>
      </motion.div>

      {/* Start Button */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={runPrediction}
          disabled={isPredicting}
          className="btn-gold flex items-center gap-2 text-lg"
        >
          {isPredicting ? (
            <>
              <Zap className="w-5 h-5 animate-pulse" />
              Predicting...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Predict Tournament
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Progress Bar */}
      {predictions.length > 0 && (
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between text-sm text-white/40 mb-2">
            <span>Progress</span>
            <span>{currentStep} / 15 matches</span>
          </div>
          <div className="progress-bar h-3">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 15) * 100}%` }}
            />
          </div>
        </motion.div>
      )}

      {/* Champion Display */}
      <AnimatePresence>
        {championTeam && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mb-10"
          >
            <div className="card-premium p-10 text-center max-w-md mx-auto relative overflow-hidden">
              {/* Background glow */}
              <div 
                className="absolute inset-0 opacity-20 blur-3xl"
                style={{ backgroundColor: championTeam.accentColor }}
              />
              
              <div className="relative z-10">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-6"
                >
                  <Trophy className="w-20 h-20 text-caf-gold" />
                </motion.div>
                
                <p className="text-caf-gold font-bold uppercase tracking-widest text-sm mb-4">
                  CAN 2025 Champion
                </p>
                
                <Flag src={championTeam.flag} alt={championTeam.name} size="xl" className="mx-auto mb-4" />
                
                <h2 className="text-3xl font-display font-bold text-white">
                  {championTeam.name}
                </h2>
                <p className="text-white/50 text-sm mt-1">{championTeam.nameFr}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Predictions Timeline */}
      <div className="space-y-3">
        <AnimatePresence>
          {predictions.map((pred, index) => {
            const team1 = getTeamById(pred.match.team1)
            const team2 = getTeamById(pred.match.team2)
            const winner = getTeamById(pred.match.winner)
            const isFinal = pred.stage === 'Final'
            
            if (!team1 || !team2 || !winner) return null
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`
                  card-glass p-4 md:p-5
                  ${isFinal ? 'ring-1 ring-caf-gold/30 bg-caf-gold/5' : ''}
                  ${pred.match.isUpset ? 'ring-1 ring-orange-500/30' : ''}
                `}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Stage Badge */}
                  <div className={`
                    px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider w-fit
                    ${isFinal ? 'bg-caf-gold/20 text-caf-gold' : 
                      pred.stage === 'Semi Final' ? 'bg-purple-500/20 text-purple-400' :
                      pred.stage === 'Quarter Final' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-white/10 text-white/60'}
                  `}>
                    {pred.stage}
                  </div>

                  {/* Match */}
                  <div className="flex-1 flex items-center justify-center gap-4">
                    {/* Team 1 */}
                    <div className={`
                      flex items-center gap-2 p-2 rounded-lg transition-opacity
                      ${pred.match.winner === pred.match.team1 ? 'bg-caf-green/10' : 'opacity-40'}
                    `}>
                      <Flag src={team1.flag} alt={team1.name} size="sm" />
                      <div className="hidden md:block">
                        <p className="font-medium text-white text-sm">{team1.name}</p>
                        <p className="text-xs text-white/40">{pred.match.team1Prob.toFixed(0)}%</p>
                      </div>
                    </div>

                    <span className="text-white/30 font-bold text-sm">VS</span>

                    {/* Team 2 */}
                    <div className={`
                      flex items-center gap-2 p-2 rounded-lg transition-opacity
                      ${pred.match.winner === pred.match.team2 ? 'bg-caf-green/10' : 'opacity-40'}
                    `}>
                      <Flag src={team2.flag} alt={team2.name} size="sm" />
                      <div className="hidden md:block">
                        <p className="font-medium text-white text-sm">{team2.name}</p>
                        <p className="text-xs text-white/40">{pred.match.team2Prob.toFixed(0)}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Winner */}
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-caf-green" />
                    <div className="flex items-center gap-2 bg-caf-green/10 px-3 py-2 rounded-lg">
                      <Flag src={winner.flag} alt={winner.name} size="xs" />
                      <span className="font-semibold text-caf-green text-sm">{winner.name}</span>
                    </div>
                    
                    {pred.match.isUpset && (
                      <span className="flex items-center gap-1 text-orange-400 text-xs bg-orange-500/10 px-2 py-1 rounded">
                        <AlertTriangle className="w-3 h-3" />
                        Upset
                      </span>
                    )}
                  </div>
                </div>

                {/* Probability Bar */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] text-white/40 w-16 truncate">{team1.code}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden flex">
                    <motion.div 
                      className="h-full bg-caf-green"
                      initial={{ width: 0 }}
                      animate={{ width: `${pred.match.team1Prob}%` }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      className="h-full bg-white/20"
                      initial={{ width: 0 }}
                      animate={{ width: `${pred.match.team2Prob}%` }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                  </div>
                  <span className="text-[10px] text-white/40 w-16 text-right truncate">{team2.code}</span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

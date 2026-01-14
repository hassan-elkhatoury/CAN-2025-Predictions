'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RefreshCw, Trophy, Zap, Target, Award } from 'lucide-react'
import { teams, roundOf16Matches, getTeamById, predictMatch } from '@/lib/data'
import { Flag } from '@/components/Flag'

interface Match {
  id: number
  team1: string
  team2: string
  winner?: string
  team1Prob?: number
  team2Prob?: number
}

interface TournamentState {
  roundOf16: Match[]
  quarterFinals: Match[]
  semiFinals: Match[]
  final: Match | null
  thirdPlace: Match | null
  champion: string | null
}

// Modern Match Card Component
function MatchCard({ match, isFinal = false, size = 'default' }: { match: Match; isFinal?: boolean; size?: 'compact' | 'default' | 'large' }) {
  const team1 = getTeamById(match.team1)
  const team2 = getTeamById(match.team2)
  
  if (!team1 || !team2) return null

  const isCompact = size === 'compact'
  const isLarge = size === 'large'

  return (
    <motion.div 
      className={`
        relative rounded-xl border transition-all duration-300 overflow-hidden
        ${isFinal 
          ? 'bg-gradient-to-br from-caf-gold/10 to-dark-800 border-caf-gold/30 shadow-lg shadow-caf-gold/10' 
          : 'bg-dark-800/90 border-white/10 hover:border-white/20'}
        ${isCompact ? 'p-2.5' : isLarge ? 'p-5' : 'p-3.5'}
      `}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {/* Team 1 */}
      <div className={`flex items-center justify-between ${isCompact ? 'mb-1.5' : 'mb-2.5'}`}>
        <div className="flex items-center gap-2">
          <Flag team={team1} size={isCompact ? 'xs' : 'sm'} />
          <span className={`font-semibold ${match.winner === match.team1 ? 'text-caf-green-light' : 'text-white/80'} ${isCompact ? 'text-xs' : 'text-sm'}`}>
            {team1.code}
          </span>
          {match.winner === match.team1 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4 rounded-full bg-caf-green/20 flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-caf-green" />
            </motion.div>
          )}
        </div>
        {match.team1Prob !== undefined && (
          <div className="flex items-center gap-1.5">
            <div className="h-1 w-8 bg-dark-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-caf-green rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${match.team1Prob}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className={`font-mono text-white/50 ${isCompact ? 'text-[10px]' : 'text-xs'}`}>
              {match.team1Prob.toFixed(0)}%
            </span>
          </div>
        )}
      </div>

      {/* VS Divider */}
      <div className="flex items-center gap-2 my-1.5">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span className="text-[9px] text-white/20 font-bold tracking-wider">VS</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Team 2 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flag team={team2} size={isCompact ? 'xs' : 'sm'} />
          <span className={`font-semibold ${match.winner === match.team2 ? 'text-caf-green-light' : 'text-white/80'} ${isCompact ? 'text-xs' : 'text-sm'}`}>
            {team2.code}
          </span>
          {match.winner === match.team2 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4 rounded-full bg-caf-green/20 flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-caf-green" />
            </motion.div>
          )}
        </div>
        {match.team2Prob !== undefined && (
          <div className="flex items-center gap-1.5">
            <div className="h-1 w-8 bg-dark-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-caf-green rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${match.team2Prob}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className={`font-mono text-white/50 ${isCompact ? 'text-[10px]' : 'text-xs'}`}>
              {match.team2Prob.toFixed(0)}%
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Empty Match Placeholder
function EmptyMatchSlot({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="rounded-lg border border-dashed border-white/10 bg-dark-900/50 p-2 h-[60px] flex items-center justify-center">
          <span className="text-[9px] text-white/20 font-medium tracking-wider">AWAITING</span>
        </div>
      ))}
    </>
  )
}

// Round Header Component
function RoundHeader({ title, badge, badgeColor, icon: Icon }: { title: string; badge: string; badgeColor: string; icon?: any }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-6 h-6 rounded-lg ${badgeColor} flex items-center justify-center`}>
        {Icon ? <Icon className="w-3 h-3" /> : <span className="text-[10px] font-bold">{badge}</span>}
      </div>
      <h3 className="text-xs font-semibold text-white">{title}</h3>
    </div>
  )
}

export default function SimulationPage() {
  const [simCount, setSimCount] = useState(1000)
  const [isSimulating, setIsSimulating] = useState(false)
  const [tournament, setTournament] = useState<TournamentState>({
    roundOf16: roundOf16Matches.map(m => ({ ...m })),
    quarterFinals: [],
    semiFinals: [],
    final: null,
    thirdPlace: null,
    champion: null,
  })

  const simulateTournament = async () => {
    setIsSimulating(true)
    
    // Simulate Round of 16
    const ro16Results: Match[] = []
    for (const match of roundOf16Matches) {
      const result = await predictMatch(match.team1, match.team2)
      ro16Results.push({
        ...match,
        winner: result.winner === 'draw' ? match.team1 : result.winner,
        team1Prob: result.team1WinProb,
        team2Prob: result.team2WinProb,
      })
      await new Promise(r => setTimeout(r, 150))
      setTournament(prev => ({ ...prev, roundOf16: [...ro16Results] }))
    }

    // Quarter Finals
    await new Promise(r => setTimeout(r, 400))
    const qfMatches: Match[] = [
      { id: 9, team1: ro16Results[0].winner!, team2: ro16Results[1].winner! },
      { id: 10, team1: ro16Results[2].winner!, team2: ro16Results[3].winner! },
      { id: 11, team1: ro16Results[4].winner!, team2: ro16Results[5].winner! },
      { id: 12, team1: ro16Results[6].winner!, team2: ro16Results[7].winner! },
    ]

    const qfResults: Match[] = []
    for (const match of qfMatches) {
      const result = await predictMatch(match.team1, match.team2)
      qfResults.push({
        ...match,
        winner: result.winner === 'draw' ? match.team1 : result.winner,
        team1Prob: result.team1WinProb,
        team2Prob: result.team2WinProb,
      })
      await new Promise(r => setTimeout(r, 250))
      setTournament(prev => ({ ...prev, quarterFinals: [...qfResults] }))
    }

    // Semi Finals
    await new Promise(r => setTimeout(r, 400))
    const sfMatches: Match[] = [
      { id: 13, team1: qfResults[0].winner!, team2: qfResults[1].winner! },
      { id: 14, team1: qfResults[2].winner!, team2: qfResults[3].winner! },
    ]

    const sfResults: Match[] = []
    const sfLosers: string[] = []
    for (const match of sfMatches) {
      const result = await predictMatch(match.team1, match.team2)
      const winner = result.winner === 'draw' ? match.team1 : result.winner
      const loser = winner === match.team1 ? match.team2 : match.team1
      sfLosers.push(loser)
      sfResults.push({
        ...match,
        winner,
        team1Prob: result.team1WinProb,
        team2Prob: result.team2WinProb,
      })
      await new Promise(r => setTimeout(r, 350))
      setTournament(prev => ({ ...prev, semiFinals: [...sfResults] }))
    }

    // Third Place Match
    await new Promise(r => setTimeout(r, 400))
    const thirdPlaceMatch: Match = { id: 15, team1: sfLosers[0], team2: sfLosers[1] }
    const tpResult = await predictMatch(thirdPlaceMatch.team1, thirdPlaceMatch.team2)
    const thirdPlace: Match = {
      ...thirdPlaceMatch,
      winner: tpResult.winner === 'draw' ? thirdPlaceMatch.team1 : tpResult.winner,
      team1Prob: tpResult.team1WinProb,
      team2Prob: tpResult.team2WinProb,
    }
    setTournament(prev => ({ ...prev, thirdPlace }))

    // Final
    await new Promise(r => setTimeout(r, 400))
    const finalMatch: Match = { id: 16, team1: sfResults[0].winner!, team2: sfResults[1].winner! }
    const finalResult = await predictMatch(finalMatch.team1, finalMatch.team2)
    const final: Match = {
      ...finalMatch,
      winner: finalResult.winner === 'draw' ? finalMatch.team1 : finalResult.winner,
      team1Prob: finalResult.team1WinProb,
      team2Prob: finalResult.team2WinProb,
    }
    
    setTournament(prev => ({ 
      ...prev, 
      final,
      champion: final.winner!
    }))

    setIsSimulating(false)
  }

  const resetSimulation = () => {
    setTournament({
      roundOf16: roundOf16Matches.map(m => ({ ...m })),
      quarterFinals: [],
      semiFinals: [],
      final: null,
      thirdPlace: null,
      champion: null,
    })
  }

  const championTeam = tournament.champion ? getTeamById(tournament.champion) : null
  const progress = tournament.champion ? 100 : 
    tournament.final ? 90 :
    tournament.semiFinals.length > 0 ? 70 :
    tournament.quarterFinals.length > 0 ? 45 :
    tournament.roundOf16.some(m => m.winner) ? 20 : 0

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col p-4 lg:p-6 overflow-hidden">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-caf-green to-caf-green-light flex items-center justify-center shadow-lg shadow-caf-green/20">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-display font-bold text-white">
              Tournament Simulation
            </h1>
            <p className="text-white/40 text-xs hidden sm:block">
              CAN 2025 Knockout Stage
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Progress */}
          <div className="hidden md:flex items-center gap-2 bg-dark-800/80 border border-white/10 rounded-lg px-3 py-2">
            <span className="text-xs text-white/40">Progress</span>
            <div className="w-12 h-1.5 bg-dark-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-caf-green to-caf-green-light rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-white">{progress}%</span>
          </div>

          {/* Simulate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={simulateTournament}
            disabled={isSimulating}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm
              transition-all duration-300
              ${isSimulating 
                ? 'bg-dark-700 text-white/50 cursor-not-allowed' 
                : 'bg-gradient-to-r from-caf-green to-caf-green-light text-white shadow-lg shadow-caf-green/20'}
            `}
          >
            {isSimulating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{isSimulating ? 'Running...' : 'Simulate'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetSimulation}
            className="p-2 rounded-lg bg-dark-800 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Champion Banner - Compact */}
      <AnimatePresence>
        {championTeam && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 flex-shrink-0"
          >
            <div className="bg-gradient-to-r from-caf-gold/10 via-dark-800 to-caf-gold/10 border border-caf-gold/30 rounded-xl px-4 py-3 flex items-center justify-center gap-4">
              <Trophy className="w-8 h-8 text-caf-gold" />
              <div className="flex items-center gap-3">
                <Flag team={championTeam} size="md" className="ring-2 ring-caf-gold/30" />
                <div>
                  <p className="text-caf-gold text-[10px] uppercase tracking-wider font-semibold">Champion</p>
                  <p className="text-white font-bold text-lg">{championTeam.nameFr}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tournament Bracket - Fill remaining space */}
      <div className="flex-1 bg-dark-800/30 border border-white/5 rounded-xl p-4 overflow-auto min-h-0">
        <div className="min-w-[900px] h-full">
          {/* Round Labels */}
          <div className="grid grid-cols-5 gap-3 mb-3">
            <RoundHeader title="Round of 16" badge="R16" badgeColor="bg-white/10 text-white/60" />
            <RoundHeader title="Quarter Finals" badge="QF" badgeColor="bg-blue-500/20 text-blue-400" />
            <RoundHeader title="Semi Finals" badge="SF" badgeColor="bg-purple-500/20 text-purple-400" />
            <RoundHeader title="Final" badge="" badgeColor="bg-caf-gold/20 text-caf-gold" icon={Trophy} />
            <RoundHeader title="3rd Place" badge="3rd" badgeColor="bg-amber-600/20 text-amber-500" icon={Award} />
          </div>

          {/* Bracket Grid */}
          <div className="grid grid-cols-5 gap-3">
            {/* Round of 16 */}
            <div className="space-y-1">
              {tournament.roundOf16.map((match) => (
                <MatchCard key={match.id} match={match} size="compact" />
              ))}
            </div>

            {/* Quarter Finals */}
            <div className="pt-6 space-y-3">
              {tournament.quarterFinals.length > 0 ? (
                tournament.quarterFinals.map((match) => (
                  <MatchCard key={match.id} match={match} size="compact" />
                ))
              ) : (
                <EmptyMatchSlot count={4} />
              )}
            </div>

            {/* Semi Finals */}
            <div className="pt-16 space-y-10">
              {tournament.semiFinals.length > 0 ? (
                tournament.semiFinals.map((match) => (
                  <MatchCard key={match.id} match={match} size="compact" />
                ))
              ) : (
                <EmptyMatchSlot count={2} />
              )}
            </div>

            {/* Final */}
            <div className="pt-24">
              {tournament.final ? (
                <MatchCard match={tournament.final} isFinal size="compact" />
              ) : (
                <div className="rounded-lg border border-dashed border-caf-gold/20 bg-caf-gold/5 p-3 h-[68px] flex items-center justify-center">
                  <span className="text-[10px] text-caf-gold/40 font-medium">FINAL</span>
                </div>
              )}
            </div>

            {/* Third Place */}
            <div className="pt-24">
              {tournament.thirdPlace ? (
                <MatchCard match={tournament.thirdPlace} size="compact" />
              ) : (
                <EmptyMatchSlot />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

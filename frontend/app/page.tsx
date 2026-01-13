'use client'

import { motion } from 'framer-motion'
import { Trophy, TrendingUp, Target, Zap, ChevronRight, BarChart3, Users } from 'lucide-react'
import Link from 'next/link'
import { teams, getTopTeams, getFormColor } from '@/lib/data'
import { Flag, CircularFlag } from '@/components/Flag'

// Animation variants
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
}

// Top Contender Card - Hero style
function TopContenderCard() {
  const topTeam = getTopTeams(1)[0]
  
  return (
    <motion.div 
      className="card-premium relative overflow-hidden"
      variants={scaleIn}
    >
      {/* Background Glow */}
      <div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: topTeam.accentColor }}
      />
      
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="icon-badge">
            <Trophy size={18} className="text-caf-gold" />
          </div>
          <span className="text-sm font-medium text-white/60">Predicted Champion</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <Flag src={topTeam.flag} alt={topTeam.name} size="xl" className="shadow-2xl" />
            <motion.div 
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-caf-gold flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <span className="text-xs font-bold text-black">1</span>
            </motion.div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-display font-bold text-white mb-1">{topTeam.name}</h2>
            <p className="text-white/50 text-sm mb-4">FIFA Rank #{topTeam.fifaRank} • {topTeam.canTitles} CAN Titles</p>
            
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-display font-bold text-caf-gold">{topTeam.championProb}%</span>
              <span className="text-white/40 text-sm">win probability</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>Championship Odds</span>
            <span>{topTeam.championProb}%</span>
          </div>
          <div className="progress-bar h-3">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${topTeam.championProb}%` }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Recent Form */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-white/40 mb-3">Recent Form</p>
          <div className="flex gap-2">
            {topTeam.recentForm.map((result, idx) => (
              <span 
                key={idx}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${getFormColor(result)}`}
              >
                {result}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Quick Stats Card
function QuickStatsCard() {
  const stats = [
    { label: 'Teams Analyzed', value: teams.length, icon: Users, color: 'text-blue-400' },
    { label: 'Matches Simulated', value: '10K+', icon: BarChart3, color: 'text-caf-green' },
    { label: 'Prediction Accuracy', value: '84%', icon: Target, color: 'text-caf-gold' },
  ]

  return (
    <motion.div className="card-premium p-6" variants={fadeInUp}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Zap className="text-caf-gold" size={20} />
        Model Statistics
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className={`inline-flex p-2 rounded-lg bg-white/5 ${stat.color} mb-2`}>
              <stat.icon size={18} />
            </div>
            <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/40">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Top 5 Teams List
function TopTeamsList() {
  const topTeams = getTopTeams(5)
  
  return (
    <motion.div className="card-glass p-6" variants={fadeInUp}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp className="text-caf-green" size={20} />
          Top Contenders
        </h3>
        <Link href="/simulation" className="text-xs text-caf-green hover:text-caf-green-light transition-colors flex items-center gap-1">
          View All <ChevronRight size={14} />
        </Link>
      </div>
      
      <div className="space-y-3">
        {topTeams.map((team, idx) => (
          <motion.div
            key={team.id}
            className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              idx === 0 ? 'bg-caf-gold text-black' : 
              idx === 1 ? 'bg-gray-400 text-black' : 
              idx === 2 ? 'bg-amber-700 text-white' : 
              'bg-white/10 text-white/60'
            }`}>
              {idx + 1}
            </span>
            
            <Flag src={team.flag} alt={team.name} size="sm" />
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate group-hover:text-caf-green-light transition-colors">
                {team.name}
              </p>
              <p className="text-xs text-white/40">
                FIFA #{team.fifaRank}
              </p>
            </div>
            
            <div className="text-right">
              <p className="font-display font-bold text-caf-green">{team.championProb}%</p>
              <p className="text-xs text-white/40">to win</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Quick Action Cards
function QuickActions() {
  const actions = [
    {
      title: 'Tournament Simulation',
      desc: 'Run Monte Carlo simulations',
      href: '/simulation',
      icon: BarChart3,
      gradient: 'from-blue-600/20 to-purple-600/20',
      iconColor: 'text-blue-400'
    },
    {
      title: 'Bracket Predictor',
      desc: 'Build your tournament bracket',
      href: '/bracket',
      icon: Trophy,
      gradient: 'from-caf-gold/20 to-orange-600/20',
      iconColor: 'text-caf-gold'
    },
    {
      title: 'Match Predictor',
      desc: 'Simulate any head-to-head',
      href: '/match',
      icon: Target,
      gradient: 'from-caf-green/20 to-emerald-600/20',
      iconColor: 'text-caf-green'
    }
  ]

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={stagger}
    >
      {actions.map((action, idx) => (
        <motion.div key={idx} variants={fadeInUp}>
          <Link href={action.href}>
            <div className={`card-glass p-5 group hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br ${action.gradient}`}>
              <div className={`icon-badge ${action.iconColor} mb-4`}>
                <action.icon size={20} />
              </div>
              <h4 className="font-semibold text-white group-hover:text-caf-green-light transition-colors">
                {action.title}
              </h4>
              <p className="text-sm text-white/40 mt-1">{action.desc}</p>
              <ChevronRight className="mt-4 text-white/30 group-hover:text-caf-green group-hover:translate-x-1 transition-all" size={18} />
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

// All Teams Grid
function AllTeamsGrid() {
  const sortedTeams = [...teams].sort((a, b) => b.championProb - a.championProb)

  return (
    <motion.div className="card-glass p-6" variants={fadeInUp}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">All 16 Teams</h3>
        <span className="text-xs text-white/40">Sorted by championship probability</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {sortedTeams.map((team, idx) => (
          <motion.div
            key={team.id}
            className="flex flex-col items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.03 }}
            whileHover={{ y: -4 }}
          >
            <CircularFlag src={team.flag} alt={team.name} size="md" ring />
            <p className="mt-2 text-xs font-medium text-white/80 text-center truncate w-full">
              {team.code}
            </p>
            <p className="text-xs font-mono text-caf-green">{team.championProb}%</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Hero Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-2">
          CAN <span className="gradient-text">2025</span> Predictions
        </h1>
        <p className="text-white/50 text-lg">
          AI-powered tournament predictions based on 10,000+ Monte Carlo simulations
        </p>
      </motion.div>

      {/* Main Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <TopContenderCard />
        <div className="space-y-6">
          <QuickStatsCard />
          <TopTeamsList />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Explore Predictions</h2>
        <QuickActions />
      </motion.div>

      {/* All Teams */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <AllTeamsGrid />
      </motion.div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { BarChart3, Cpu, Database, Zap } from 'lucide-react'

const stats = [
  {
    icon: Cpu,
    value: '1000',
    label: 'Monte Carlo Simulations',
    color: 'text-caf-green-light',
    bgColor: 'bg-caf-green/10',
  },
  {
    icon: Database,
    value: '500+',
    label: 'Historical Matches',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: BarChart3,
    value: '23',
    label: 'Prediction Features',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Zap,
    value: '16',
    label: 'Teams Analyzed',
    color: 'text-caf-gold',
    bgColor: 'bg-caf-gold/10',
  },
]

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`glass-card p-6 text-center hover-card ${stat.bgColor}`}
        >
          <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
          <p className={`text-3xl font-bold font-display ${stat.color}`}>
            {stat.value}
          </p>
          <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

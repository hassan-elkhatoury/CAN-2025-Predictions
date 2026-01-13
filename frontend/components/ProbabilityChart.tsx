'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Team } from '@/lib/data'

interface ProbabilityChartProps {
  teams: Team[]
}

const getBarColor = (prob: number): string => {
  if (prob >= 30) return '#22c55e'  // Green
  if (prob >= 15) return '#14b8a6'  // Teal
  if (prob >= 8) return '#0f766e'   // CAF Green
  if (prob >= 3) return '#facc15'   // Gold
  if (prob >= 1) return '#f97316'   // Orange
  return '#6b7280'                   // Gray
}

export default function ProbabilityChart({ teams }: ProbabilityChartProps) {
  const data = [...teams]
    .sort((a, b) => b.championProb - a.championProb)
    .map(team => ({
      name: team.nameFr,
      shortName: team.nameFr.substring(0, 3).toUpperCase(),
      probability: team.championProb,
    }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-800/95 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-bold mb-1">{label}</p>
          <p className="text-caf-green-light text-sm">
            Champion: <span className="font-bold">{payload[0].value.toFixed(1)}%</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis 
            dataKey="name" 
            stroke="#4b5563"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
          />
          <YAxis 
            stroke="#4b5563"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 'dataMax + 5']}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Bar 
            dataKey="probability" 
            radius={[6, 6, 0, 0]}
            maxBarSize={45}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getBarColor(entry.probability)}
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Trophy, BarChart3, GitBranch, Gamepad2, Brain, Github, Sun, Moon, Play } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: BarChart3 },
  { href: '/simulation', label: 'Tournament Simulation', icon: GitBranch },
  { href: '/bracket', label: 'Bracket Predictor', icon: Trophy },
  { href: '/match', label: 'Match Predictor', icon: Gamepad2 },
  { href: '/about', label: 'About Model', icon: Brain },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(true)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="text-3xl"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🏆
            </motion.div>
            <div>
              <span className="font-display font-bold text-xl gradient-text">CAN 2025</span>
              <span className="text-gray-400 text-sm ml-2 hidden sm:inline">Predictor</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link flex items-center gap-2 ${isActive ? 'nav-link-active' : ''}`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Play size={16} />
              <span className="hidden sm:inline">Run Simulation</span>
            </motion.button>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {isDark ? <Sun size={20} className="text-gray-400" /> : <Moon size={20} className="text-gray-400" />}
            </button>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Github size={20} className="text-gray-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-white/10 px-4 py-2 flex overflow-x-auto gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link flex items-center gap-2 whitespace-nowrap ${isActive ? 'nav-link-active' : ''}`}
            >
              <Icon size={16} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  GitBranch, 
  Trophy, 
  Gamepad2, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react'
import Logo from './Logo'

const navItems = [
  { 
    href: '/', 
    label: 'Dashboard', 
    icon: LayoutDashboard,
    description: 'Overview & predictions'
  },
  { 
    href: '/simulation', 
    label: 'Tournament', 
    icon: GitBranch,
    description: 'Full bracket simulation'
  },
  { 
    href: '/bracket', 
    label: 'AI Predictor', 
    icon: Trophy,
    description: 'Step-by-step AI'
  },
  { 
    href: '/match', 
    label: 'Match Predictor', 
    icon: Gamepad2,
    description: 'Custom matchups'
  },
  { 
    href: '/about', 
    label: 'About Model', 
    icon: BookOpen,
    description: 'How it works'
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const sidebarContent = (
    <>
      {/* Logo Section */}
      <div className="p-4 border-b border-white/5">
        <Logo size={isCollapsed ? 'sm' : 'md'} showText={!isCollapsed} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`
                group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-caf-green/15 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-caf-green rounded-r-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              <div className={`
                flex items-center justify-center w-10 h-10 rounded-lg transition-colors
                ${isActive ? 'bg-caf-green/20' : 'bg-white/5 group-hover:bg-white/10'}
              `}>
                <Icon size={20} className={isActive ? 'text-caf-green-light' : ''} />
              </div>

              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${isActive ? 'text-white' : ''}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {item.description}
                  </p>
                </div>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="
                  absolute left-full ml-2 px-3 py-2 bg-dark-700 rounded-lg
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-all duration-200 whitespace-nowrap z-50
                  border border-white/10 shadow-xl
                ">
                  <p className="font-medium text-sm text-white">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/5 space-y-2">
        {/* Version Badge */}
        {!isCollapsed && (
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-caf-green animate-pulse" />
              <span>Version 1.0.0</span>
            </div>
          </div>
        )}

        {/* Collapse Button - Desktop only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex w-full items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!isCollapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-dark-800 border border-white/10 text-white"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-dark-900 border-r border-white/5 z-50 flex flex-col"
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="hidden lg:flex fixed left-0 top-0 bottom-0 bg-dark-900 border-r border-white/5 flex-col z-40"
      >
        {sidebarContent}
      </motion.aside>

      {/* Spacer for main content */}
      <div 
        className={`hidden lg:block flex-shrink-0 transition-all duration-300`}
        style={{ width: isCollapsed ? 80 : 260 }}
      />
    </>
  )
}

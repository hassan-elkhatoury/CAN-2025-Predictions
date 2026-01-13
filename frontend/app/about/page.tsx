'use client'

import { motion } from 'framer-motion'
import { 
  Database, Cpu, GitBranch, BarChart3, Settings, 
  TreeDeciduous, Shuffle, Target, Layers, 
  TrendingUp, Zap, FileCode, Brain, CheckCircle2
} from 'lucide-react'

const dataSources = [
  { name: 'African Football Matches', records: '500+', years: '2010-2024', icon: Database, color: 'text-blue-400' },
  { name: 'CAN Tournament History', records: '200+', years: '1957-2024', icon: TrendingUp, color: 'text-caf-gold' },
  { name: 'FIFA World Rankings', records: '210', years: 'June 2024', icon: BarChart3, color: 'text-purple-400' },
  { name: 'Team Statistics', records: '16', years: 'Historical', icon: FileCode, color: 'text-caf-green' },
]

const features = [
  { name: 'FIFA Rank Differential', description: 'Difference in world rankings between teams', category: 'Ranking' },
  { name: 'Last 5 Matches Points', description: 'Points earned in recent matches (W=3, D=1, L=0)', category: 'Form' },
  { name: 'Last 5 Goal Differential', description: 'Average goals scored minus conceded', category: 'Form' },
  { name: 'Head-to-Head Win Rate', description: 'Historical win percentage against opponent', category: 'H2H' },
  { name: 'CAN Win Rate', description: 'Historical performance in African Cup of Nations', category: 'CAN' },
  { name: 'CAN Titles', description: 'Number of championships won', category: 'CAN' },
  { name: 'Host Country Advantage', description: 'Binary flag for home team advantage', category: 'Context' },
  { name: 'Form Momentum', description: 'Composite score of recent performance trend', category: 'Form' },
  { name: 'H2H Dominance', description: 'Head-to-head advantage adjusted for baseline', category: 'H2H' },
  { name: 'Titles Advantage', description: 'Differential in championship count', category: 'CAN' },
]

const pipelineSteps = [
  {
    step: 1,
    title: 'Data Collection',
    description: 'Historical match data, FIFA rankings, tournament stats',
    icon: Database,
    color: 'from-blue-500 to-blue-600',
  },
  {
    step: 2,
    title: 'Data Cleaning',
    description: 'Normalize names, handle missing values, standardize',
    icon: Settings,
    color: 'from-purple-500 to-purple-600',
  },
  {
    step: 3,
    title: 'Feature Engineering',
    description: 'Create predictive features (form, H2H, rankings)',
    icon: Layers,
    color: 'from-green-500 to-green-600',
  },
  {
    step: 4,
    title: 'Model Training',
    description: 'Random Forest with hyperparameter optimization',
    icon: Cpu,
    color: 'from-orange-500 to-orange-600',
  },
  {
    step: 5,
    title: 'Simulation',
    description: 'Monte Carlo for probability distributions',
    icon: Shuffle,
    color: 'from-caf-gold to-yellow-600',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2 flex items-center gap-3">
          <Brain className="text-purple-400" />
          About the Model
        </h1>
        <p className="text-white/50 max-w-2xl">
          Understanding the machine learning pipeline behind CAN 2025 predictions
        </p>
      </motion.div>

      {/* Data Sources */}
      <motion.section 
        className="mb-12"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Database className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Data Sources</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dataSources.map((source, index) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-800/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 group hover:scale-[1.02] hover:border-caf-green/30 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${source.color} mb-4`}>
                <source.icon size={22} />
              </div>
              <h3 className="font-semibold text-white mb-2">{source.name}</h3>
              <div className="flex justify-between text-sm">
                <span className="text-caf-green font-mono">{source.records}</span>
                <span className="text-white/40">{source.years}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ML Pipeline */}
      <motion.section 
        className="mb-12"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 mb-6">
          <GitBranch className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">ML Pipeline</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {pipelineSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector arrow - only on lg screens and not on last item */}
              {index < pipelineSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-20">
                  <div className="w-4 h-4 border-t-2 border-r-2 border-white/20 rotate-45" />
                </div>
              )}
              
              <div className={`
                h-full p-5 rounded-xl border transition-all duration-300
                bg-gradient-to-br ${step.color} bg-opacity-10
                border-white/10 hover:border-white/20
                hover:shadow-lg hover:scale-[1.02]
              `}
              style={{
                background: `linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(17,24,39,0.95) 100%)`,
              }}
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                    0{step.step}
                  </span>
                </div>
                
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Feature Engineering */}
      <motion.section 
        className="mb-12"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Feature Engineering</h2>
          <span className="ml-2 px-2.5 py-1 text-xs font-medium text-caf-green border border-caf-green/30 rounded-full bg-caf-green/10">23 Features</span>
        </div>

        <div className="bg-dark-800/80 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className={`
                  px-2 py-1 rounded text-[10px] font-bold uppercase shrink-0
                  ${feature.category === 'Form' ? 'bg-green-500/20 text-green-400' :
                    feature.category === 'H2H' ? 'bg-blue-500/20 text-blue-400' :
                    feature.category === 'CAN' ? 'bg-caf-gold/20 text-caf-gold' :
                    feature.category === 'Ranking' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-white/10 text-white/60'}
                `}>
                  {feature.category}
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">{feature.name}</h4>
                  <p className="text-xs text-white/40 mt-0.5">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Model Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Random Forest */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TreeDeciduous className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-semibold text-white">Random Forest Classifier</h2>
          </div>

          <div className="bg-dark-800/80 backdrop-blur-sm border border-white/10 rounded-xl p-5">
            <h3 className="text-sm font-medium text-white/60 mb-3">Hyperparameters</h3>
            <div className="space-y-2">
              {[
                { param: 'n_estimators', value: '100-200', desc: 'Number of trees' },
                { param: 'max_depth', value: '5-15', desc: 'Maximum tree depth' },
                { param: 'min_samples_split', value: '5-10', desc: 'Min samples to split' },
                { param: 'min_samples_leaf', value: '2-5', desc: 'Min samples in leaf' },
                { param: 'class_weight', value: 'balanced', desc: 'Handle class imbalance' },
              ].map((item) => (
                <div key={item.param} className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                  <div>
                    <span className="font-mono text-caf-green text-xs">{item.param}</span>
                    <p className="text-[10px] text-white/40">{item.desc}</p>
                  </div>
                  <span className="font-mono text-white text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Training Details */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-caf-green" />
            <h2 className="text-lg font-semibold text-white">Training Details</h2>
          </div>

          <div className="bg-dark-800/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 space-y-3">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-white/40 mb-2">Output Classes</p>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">Win</span>
                <span className="px-2.5 py-1 text-xs font-medium bg-white/10 text-white/70 border border-white/20 rounded-full">Draw</span>
                <span className="px-2.5 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">Loss</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-white/40 mb-1">Data Split</p>
                <p className="text-white font-medium text-sm">80% / 20%</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-white/40 mb-1">Optimization</p>
                <p className="text-white font-medium text-sm">RandomizedSearchCV</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-white/40 mb-1">Cross Validation</p>
                <p className="text-white font-medium text-sm">3-fold CV</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-white/40 mb-1">Scoring</p>
                <p className="text-white font-medium text-sm">F1-Macro</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Monte Carlo */}
      <motion.section
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Shuffle className="w-5 h-5 text-caf-gold" />
          <h2 className="text-xl font-semibold text-white">Monte Carlo Simulation</h2>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 backdrop-blur-sm border border-caf-gold/20 rounded-xl p-6 shadow-lg shadow-caf-gold/5">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-display font-bold text-caf-gold mb-1">10K+</div>
              <p className="text-white/40 text-sm">Simulations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-display font-bold text-caf-green mb-1">15</div>
              <p className="text-white/40 text-sm">Matches/Sim</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-display font-bold text-purple-400 mb-1">16</div>
              <p className="text-white/40 text-sm">Teams</p>
            </div>
          </div>

          <div className="p-5 bg-white/5 rounded-xl">
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-caf-gold" />
              How It Works
            </h4>
            <div className="space-y-3">
              {[
                'Predict every match in knockout bracket using trained model',
                'Record tournament winner, finalist, and third-place finisher',
                'After 10,000+ simulations, calculate position percentages',
                'Present aggregated probabilities as final predictions'
              ].map((step, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-caf-green/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-caf-green" />
                  </div>
                  <span className="text-white/70 text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

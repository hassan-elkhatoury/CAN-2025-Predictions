// Team data with proper flag URLs and statistics
export interface Team {
  id: string
  name: string
  nameFr: string
  code: string
  flag: string
  fifaRank: number
  canTitles: number
  championProb: number
  finalistProb: number
  thirdPlaceProb: number
  recentForm: ('W' | 'D' | 'L')[]
  group: string
  accentColor: string
}

// Using flagcdn.com for high-quality SVG flags
const FLAG_BASE = 'https://flagcdn.com/w160'

export const teams: Team[] = [
  {
    id: 'algeria',
    name: 'Algeria',
    nameFr: 'Algérie',
    code: 'ALG',
    flag: `${FLAG_BASE}/dz.png`,
    fifaRank: 48,
    canTitles: 2,
    championProb: 38.20,
    finalistProb: 39.60,
    thirdPlaceProb: 12.50,
    recentForm: ['W', 'W', 'D', 'W', 'W'],
    group: 'A',
    accentColor: '#006233'
  },
  {
    id: 'egypt',
    name: 'Egypt',
    nameFr: 'Égypte',
    code: 'EGY',
    flag: `${FLAG_BASE}/eg.png`,
    fifaRank: 33,
    canTitles: 7,
    championProb: 13.50,
    finalistProb: 13.00,
    thirdPlaceProb: 19.30,
    recentForm: ['W', 'D', 'W', 'W', 'L'],
    group: 'B',
    accentColor: '#C8102E'
  },
  {
    id: 'ivory-coast',
    name: 'Ivory Coast',
    nameFr: "Côte d'Ivoire",
    code: 'CIV',
    flag: `${FLAG_BASE}/ci.png`,
    fifaRank: 39,
    canTitles: 3,
    championProb: 12.90,
    finalistProb: 8.90,
    thirdPlaceProb: 16.20,
    recentForm: ['W', 'W', 'W', 'D', 'W'],
    group: 'C',
    accentColor: '#FF8200'
  },
  {
    id: 'senegal',
    name: 'Senegal',
    nameFr: 'Sénégal',
    code: 'SEN',
    flag: `${FLAG_BASE}/sn.png`,
    fifaRank: 17,
    canTitles: 1,
    championProb: 12.60,
    finalistProb: 13.70,
    thirdPlaceProb: 15.10,
    recentForm: ['W', 'W', 'L', 'W', 'D'],
    group: 'A',
    accentColor: '#00853F'
  },
  {
    id: 'morocco',
    name: 'Morocco',
    nameFr: 'Maroc',
    code: 'MAR',
    flag: `${FLAG_BASE}/ma.png`,
    fifaRank: 13,
    canTitles: 1,
    championProb: 11.00,
    finalistProb: 11.20,
    thirdPlaceProb: 12.00,
    recentForm: ['W', 'W', 'W', 'W', 'D'],
    group: 'D',
    accentColor: '#C1272D'
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
    nameFr: 'Nigeria',
    code: 'NGA',
    flag: `${FLAG_BASE}/ng.png`,
    fifaRank: 44,
    canTitles: 3,
    championProb: 5.20,
    finalistProb: 6.10,
    thirdPlaceProb: 8.50,
    recentForm: ['D', 'W', 'L', 'W', 'W'],
    group: 'B',
    accentColor: '#008751'
  },
  {
    id: 'cameroon',
    name: 'Cameroon',
    nameFr: 'Cameroun',
    code: 'CMR',
    flag: `${FLAG_BASE}/cm.png`,
    fifaRank: 49,
    canTitles: 5,
    championProb: 3.80,
    finalistProb: 4.20,
    thirdPlaceProb: 6.30,
    recentForm: ['W', 'D', 'D', 'W', 'L'],
    group: 'C',
    accentColor: '#007A5E'
  },
  {
    id: 'tunisia',
    name: 'Tunisia',
    nameFr: 'Tunisie',
    code: 'TUN',
    flag: `${FLAG_BASE}/tn.png`,
    fifaRank: 47,
    canTitles: 1,
    championProb: 2.10,
    finalistProb: 2.50,
    thirdPlaceProb: 4.80,
    recentForm: ['D', 'L', 'W', 'D', 'W'],
    group: 'D',
    accentColor: '#E70013'
  },
  {
    id: 'mali',
    name: 'Mali',
    nameFr: 'Mali',
    code: 'MLI',
    flag: `${FLAG_BASE}/ml.png`,
    fifaRank: 51,
    canTitles: 0,
    championProb: 1.50,
    finalistProb: 1.80,
    thirdPlaceProb: 3.20,
    recentForm: ['W', 'D', 'W', 'L', 'D'],
    group: 'A',
    accentColor: '#14B53A'
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    nameFr: 'Afrique du Sud',
    code: 'RSA',
    flag: `${FLAG_BASE}/za.png`,
    fifaRank: 57,
    canTitles: 1,
    championProb: 1.20,
    finalistProb: 1.50,
    thirdPlaceProb: 2.80,
    recentForm: ['D', 'W', 'D', 'L', 'W'],
    group: 'B',
    accentColor: '#007749'
  },
  {
    id: 'dr-congo',
    name: 'DR Congo',
    nameFr: 'RD Congo',
    code: 'COD',
    flag: `${FLAG_BASE}/cd.png`,
    fifaRank: 61,
    canTitles: 2,
    championProb: 0.90,
    finalistProb: 1.10,
    thirdPlaceProb: 2.10,
    recentForm: ['L', 'W', 'D', 'W', 'D'],
    group: 'C',
    accentColor: '#007FFF'
  },
  {
    id: 'burkina-faso',
    name: 'Burkina Faso',
    nameFr: 'Burkina Faso',
    code: 'BFA',
    flag: `${FLAG_BASE}/bf.png`,
    fifaRank: 75,
    canTitles: 0,
    championProb: 0.60,
    finalistProb: 0.80,
    thirdPlaceProb: 1.50,
    recentForm: ['D', 'L', 'W', 'D', 'L'],
    group: 'D',
    accentColor: '#009E49'
  },
  {
    id: 'benin',
    name: 'Benin',
    nameFr: 'Bénin',
    code: 'BEN',
    flag: `${FLAG_BASE}/bj.png`,
    fifaRank: 91,
    canTitles: 0,
    championProb: 0.30,
    finalistProb: 0.40,
    thirdPlaceProb: 0.80,
    recentForm: ['L', 'D', 'L', 'W', 'D'],
    group: 'A',
    accentColor: '#FCD116'
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    nameFr: 'Tanzanie',
    code: 'TAN',
    flag: `${FLAG_BASE}/tz.png`,
    fifaRank: 105,
    canTitles: 0,
    championProb: 0.20,
    finalistProb: 0.30,
    thirdPlaceProb: 0.50,
    recentForm: ['L', 'L', 'D', 'L', 'W'],
    group: 'B',
    accentColor: '#00A3DD'
  },
  {
    id: 'mozambique',
    name: 'Mozambique',
    nameFr: 'Mozambique',
    code: 'MOZ',
    flag: `${FLAG_BASE}/mz.png`,
    fifaRank: 108,
    canTitles: 0,
    championProb: 0.15,
    finalistProb: 0.20,
    thirdPlaceProb: 0.40,
    recentForm: ['L', 'D', 'L', 'L', 'D'],
    group: 'C',
    accentColor: '#007168'
  },
  {
    id: 'sudan',
    name: 'Sudan',
    nameFr: 'Soudan',
    code: 'SDN',
    flag: `${FLAG_BASE}/sd.png`,
    fifaRank: 123,
    canTitles: 1,
    championProb: 0.10,
    finalistProb: 0.15,
    thirdPlaceProb: 0.30,
    recentForm: ['L', 'L', 'L', 'D', 'L'],
    group: 'D',
    accentColor: '#D21034'
  }
]

// Round of 16 bracket
export const roundOf16Matches = [
  { id: 1, team1: 'senegal', team2: 'sudan', position: 'top' },
  { id: 2, team1: 'mali', team2: 'tunisia', position: 'top' },
  { id: 3, team1: 'morocco', team2: 'tanzania', position: 'top' },
  { id: 4, team1: 'south-africa', team2: 'cameroon', position: 'top' },
  { id: 5, team1: 'egypt', team2: 'benin', position: 'bottom' },
  { id: 6, team1: 'nigeria', team2: 'mozambique', position: 'bottom' },
  { id: 7, team1: 'algeria', team2: 'dr-congo', position: 'bottom' },
  { id: 8, team1: 'ivory-coast', team2: 'burkina-faso', position: 'bottom' },
]

export function getTeamById(id: string): Team | undefined {
  return teams.find(t => t.id === id)
}

export function getTopTeams(count: number = 5): Team[] {
  return [...teams].sort((a, b) => b.championProb - a.championProb).slice(0, count)
}

// Simulate match prediction with more realistic probabilities
export function predictMatch(team1Id: string, team2Id: string): {
  winner: string | 'draw'
  team1WinProb: number
  drawProb: number
  team2WinProb: number
  confidence: number
} {
  const team1 = getTeamById(team1Id)
  const team2 = getTeamById(team2Id)
  
  if (!team1 || !team2) {
    return { winner: 'draw', team1WinProb: 33, drawProb: 34, team2WinProb: 33, confidence: 0 }
  }

  // More sophisticated probability calculation
  const rankDiff = team2.fifaRank - team1.fifaRank
  const probDiff = team1.championProb - team2.championProb
  
  // Base probabilities influenced by ranking and championship odds
  let team1Base = 0.5 + (rankDiff / 200) + (probDiff / 100)
  team1Base = Math.max(0.2, Math.min(0.8, team1Base))
  
  // Draw probability varies based on how close teams are
  const closeness = 1 - Math.abs(team1Base - 0.5)
  const drawProb = 15 + closeness * 15
  
  const remaining = 100 - drawProb
  const team1WinProb = Math.round(team1Base * remaining * 10) / 10
  const team2WinProb = Math.round((remaining - team1WinProb) * 10) / 10

  // Determine winner with some randomness for simulation
  const rand = Math.random() * 100
  let winner: string | 'draw'
  if (rand < team1WinProb) {
    winner = team1Id
  } else if (rand < team1WinProb + drawProb) {
    winner = 'draw'
  } else {
    winner = team2Id
  }

  const confidence = Math.abs(team1WinProb - team2WinProb)

  return {
    winner,
    team1WinProb,
    drawProb: Math.round(drawProb * 10) / 10,
    team2WinProb,
    confidence
  }
}

// Get form color
export function getFormColor(result: 'W' | 'D' | 'L'): string {
  switch (result) {
    case 'W': return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'D': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'L': return 'bg-red-500/20 text-red-400 border-red-500/30'
  }
}

// Get probability color class
export function getProbabilityColor(prob: number): string {
  if (prob >= 30) return 'text-green-400'
  if (prob >= 15) return 'text-caf-green-light'
  if (prob >= 5) return 'text-yellow-400'
  if (prob >= 1) return 'text-orange-400'
  return 'text-red-400'
}

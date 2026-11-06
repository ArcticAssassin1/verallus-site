// Lore Vault archive: the world in depth, the places off the map, and the codex.
// Source of truth: the locations doc (v9) in the private Book repo, chapters 4 to 10, with power system v18,
// races v14, factions v14, timeline v15 and the Book 1 outline (v11).
// Codex entries for races, factions, power topics, bending forms and map regions are generated from those
// sections' own data files, so they stay in step when a section changes. Only the terms no section defines
// are written here.
// Spoilers: wrap any text in {{ }} and the site blurs it until the reader taps it (or turns spoilers on).

import { RACE_GROUPS } from './races'
import { FACTION_GROUPS } from './factions'
import { FOUNDATIONS, CATEGORIES, BENDING_TOPICS, CORRUPTION_TOPICS, BEYOND, BENDING_PATHS, type Topic } from './power'
import { REGIONS } from './regions'
import { GROUPS as CHARACTER_GROUPS } from './characters'

export type Detail = { l: string; v: string }

export type Site = {
  key: string
  name: string
  kind: string            // eyebrow
  short: string           // one line, shown on the card or chip
  color: string
  rgb: string
  desc: string            // may hold {{spoilers}}
  details?: Detail[]
  sections?: { title: string; items: string[] }[]
  mapRef?: string         // a line pointing to the map's fuller entry
}

// ── The Depths ──

export type Layer = {
  key: string
  realm: 'SKY' | 'SURFACE' | 'SUBSTRATUM'
  name: string
  range: string
  color: string
  rgb: string
  line: string
  features: string[]
  sites: Site[]
  onMap?: string[]        // named places in this layer that have a full entry on the map
}

const VORGATH: Site = {
  key: 'vorgath', name: 'Vorgath Underdeep', kind: 'EXTINCT CIVILIZATION', color: '#d97706', rgb: '217,119,6',
  short: 'Ruins of a beast-taming people who destroyed themselves.',
  desc: `The Vorgath were beast tamers and bonding specialists who lived in vast underground cave systems. They were isolated and powerful, and they accidentally set off a corruption catastrophe that ended them thousands of years ago. Their ruins are still down here. So are the corruption creatures they tamed, semi-intelligent after generations alone in the dark.`,
  details: [
    { l: 'Status', v: 'Extinct. Collapsed thousands of years ago.' },
    { l: 'Safest way in', v: 'Heartwood Underdeep, through Dormose territory. It is the deepest point of the ruins anyone can reach.' },
  ],
  sections: [
    { title: 'WHAT IS STILL DOWN THERE', items: [
      `Collapsed tunnels and automated traps.`,
      `Corrupted creatures, shaped by generations of isolation.`,
      `Forbidden experiments, still running on their own logic.`,
      `The Vault of Broken Bonds, where the Vorgath tried to control the Prime Corruptor and failed.`,
    ] },
  ],
}

const PRISON: Site = {
  key: 'prison', name: `The Prime Corruptor's Prison`, kind: 'SEALED', color: '#dc2626', rgb: '220,38,38',
  short: 'An extinction-level entity, sealed in the deepest layer anyone can reach.',
  desc: `Something called the Prime Corruptor is sealed in the deepest layer of the underground that anyone can reach. It is catastrophic. If it ever got out, the result would be extinction. The Dormose keep ancient wards on the prison, and the Elite Six come down periodically to maintain the seals with them.`,
  sections: [
    { title: 'THE SEALS', items: [
      `Ancient wards, kept by the Dormose.`,
      `Dimensional locks, checked and reinforced by the Elite Six on their seal-maintenance missions.`,
      `{{In Book 6 the seals begin to weaken. It is one of several crises Arah has to face at once.}}`,
    ] },
  ],
}

export const LAYERS: Layer[] = [
  {
    key: 'high', realm: 'SKY', name: 'High Sky', range: '30,000+ FT',
    color: '#c4b5fd', rgb: '196,181,253',
    line: `The dimensional boundary. Reality thins this high, and only advanced flyers make it up here.`,
    features: ['Dimensional boundary', 'Reality thins', 'Advanced flyers only'],
    sites: [],
  },
  {
    key: 'mid', realm: 'SKY', name: 'Mid Sky', range: '10,000 TO 30,000 FT',
    color: '#93c5fd', rgb: '147,197,253',
    line: `Thin air and extreme weather, where navigation turns hard. The Skyfold Labyrinth is up here.`,
    features: ['Skyfold Labyrinth', 'Thin air', 'Extreme weather'],
    sites: [],
  },
  {
    key: 'low', realm: 'SKY', name: 'Low Sky', range: 'GROUND TO 10,000 FT',
    color: '#7dd3fc', rgb: '125,211,252',
    line: `Safe for flight. The Primidian sky-cities ride here, among flying creatures and ordinary cloud.`,
    features: ['Primidian sky-cities', 'Flying creatures', 'Safe for flight'],
    sites: [],
    onMap: ['Skyspire Zenith'],
  },
  {
    key: 'surface', realm: 'SURFACE', name: 'The Surface', range: 'GROUND LEVEL',
    color: '#86efac', rgb: '134,239,172',
    line: `Where most life on Verallus lives. Reality holds still here, and gravity behaves. This is the layer the map shows.`,
    features: ['Most life', 'Stable reality', 'Normal gravity'],
    sites: [],
    onMap: ['The world map'],
  },
  {
    key: 'shallow', realm: 'SUBSTRATUM', name: 'Shallow Substratum', range: '100 TO 1,000 FT DOWN',
    color: '#a3e635', rgb: '163,230,53',
    line: `Safe and inhabited. Dormose infrastructure runs through it, along underground rivers and the glowing roots of the Verdant Veins.`,
    features: ['Dormose infrastructure', 'Underground rivers', 'Safe, inhabited'],
    sites: [],
    onMap: ['Verdant Veins'],
  },
  {
    key: 'midsub', realm: 'SUBSTRATUM', name: 'Mid Substratum', range: '1,000 TO 5,000 FT DOWN',
    color: '#f59e0b', rgb: '245,158,11',
    line: `Dangerous and rarely explored. Ancient tunnels and pockets of corruption run through the ruins of the Vorgath.`,
    features: ['Ancient tunnels', 'Corruption pockets', 'Rarely explored'],
    sites: [VORGATH],
    onMap: ['Heartwood Underdeep'],
  },
  {
    key: 'deep', realm: 'SUBSTRATUM', name: 'Deep Substratum', range: '5,000+ FT DOWN',
    color: '#ef4444', rgb: '239,68,68',
    line: `Extreme pressure and sealed gates. Entities nobody has identified live down here, and at the bottom of what can be reached, something is imprisoned.`,
    features: ['Extreme pressure', 'Unknown entities', 'Sealed gates'],
    sites: [PRISON],
  },
]

export const ECHO_WEB: Site = {
  key: 'echoweb', name: 'The Echo Web', kind: 'SPIRITUAL OVERLAY', color: '#a78bfa', rgb: '167,139,250',
  short: 'Laid over every layer at once.',
  desc: `A network of Sopher connections laid over the physical world. Echo Spirits exist here. So does the River of Echoes: the water runs through the Regalus Heartlands, and the River truly exists in the Web. The living can reach it through deep meditation or Oracle training. Some reach it by coming close to death.`,
  sections: [
    { title: 'HOW IT BEGAN', items: [
      `In the Primal Age, before any people, the points where Sofra pooled began to link up. Those were the first seeds of the Web.`,
    ] },
    { title: 'WHAT IT HOLDS', items: [
      `Echo Spirits: what some of the dead leave behind. They gather at the River of Echoes.`,
      `The Pale Court, the realm only Oracles can enter.`,
      `Knowledge the Keeper of Archives can't reach. Some of it lives only in the River and the Pale Court.`,
      `{{Arah's grandmother's Echo Spirit rests in the River after she dies at the end of Book 2.}}`,
    ] },
  ],
}

// ── Folded into reality: pocket dimensions and realms ──

export type Fold = Site & {
  anchor: string          // where it attaches to the world
  lights: string[]        // layer keys to light up on hover
}

export const FOLDS: Fold[] = [
  {
    key: 'oathless', name: 'The Oathless Sky', kind: 'POCKET DIMENSION', color: '#a855f7', rgb: '168,85,247',
    anchor: 'ABOVE OPEN OCEAN · ENTERED FROM THE HIGH SKY', lights: ['high'],
    short: `Khaervos's domain, over the most isolated ocean on Verallus.`,
    desc: `A pocket dimension anchored above remote ocean, at the most isolated point on Verallus, far east beyond the Ashen Dominion. Its way in sits in the high sky, where reality thins. Inside are floating islands with unstable gravity and waterfalls that run upward. A storm raised by Khaervos's presence alone keeps nearly everyone out.`,
    details: [
      { l: 'Ruler', v: 'Khaervos, from the Tempest Throne' },
      { l: 'Getting in', v: 'An invitation. Without one, it takes Tier 9 power or real knowledge of dimensions.' },
    ],
    mapRef: 'The full entry, with all six layers of deterrence, is on the map.',
  },
  {
    key: 'veilheim', name: 'Veilheim', kind: 'POCKET DIMENSION · TRIAL GROUND', color: '#22d3ee', rgb: '34,211,238',
    anchor: 'NEAR SACRED SITES, WHEN CONDITIONS ARE RIGHT', lights: ['surface'],
    short: 'A trial ground with no fixed door.',
    desc: `A pocket dimension used for training and trials. Its entrance is unpredictable: it appears near sacred sites when conditions are right. Inside, Sofra runs twice as dense and the place folds back on itself like a maze. Reality is slightly unstable. The light has no source, and sounds arrive a half-beat late.`,
    sections: [
      { title: 'WHAT IT TESTS', items: [
        `Echo-creatures appear to test combat skill.`,
      ] },
      { title: 'IN BOOK 1', items: [
        `Arah's Redmare trial happens here, with Mallory assisting.`,
        `The trial is hijacked by an outside party. {{Arah fights a Chrono, a peon under one of the SinHarvesters.}}`,
      ] },
    ],
  },
  {
    key: 'enclave', name: 'The Shaleh-Kai Enclave', kind: 'HIDDEN CIVILIZATION · UNDERGROUND', color: '#5eead4', rgb: '94,234,212',
    anchor: 'UNDERGROUND, BEHIND A DIMENSIONAL FOLD', lights: [],
    short: 'A people who will not be found.',
    desc: `A hidden underground civilization, home to the descendants of the ancient Sanori people and to refugees from corrupt governments. It can't be found by accident. Getting there means surviving four layers of deterrence, and then convincing the people who live there not to kill you. Inside, bioluminescent plants light the caverns and roots thread through the walls.`,
    details: [
      { l: 'Worldview', v: '"Life unseen is life protected."' },
      { l: 'Who lives here', v: 'Sanori descendants, refugees and spiritual practitioners. Keepers of forbidden and ancient knowledge.' },
    ],
    sections: [
      { title: 'FOUR LAYERS OF DETERRENCE', items: [
        `Wild country above: ancient forest and mountain with no paths, where experienced travelers get turned around.`,
        `A dimensional fold that makes the whole region look like unbroken ground. You can stand on top of the entrance and never see it.`,
        `The caves themselves: dead ends, sudden drops and flooding chambers, with corruption-adjacent creatures in the outer tunnels.`,
        `The guardians: skilled protectors who know the ground and fight on their own terms.`,
      ] },
      { title: 'INSIDE', items: [
        `The Founding Chamber, the most sacred space in the Enclave. {{It is named for the First Bender, a Farrow woman who fled here and trained among the Sanori.}}`,
        `The Chronoscript Archive: the most complete true history the Enclave holds, including records erased from public knowledge.`,
        `The Memory Gardens, where Sopher-infused plants hold ancestral memory. It is read through meditation and touch.`,
        `The Council Hall, where the elders meet. Its walls carry Sopher impressions of every major decision made there.`,
      ] },
      { title: 'WHO GETS IN', items: [
        `Anyone without a reference or a good reason to come is barred.`,
        `{{The Farrow live here. Oris Faren has hidden here for about seventeen years, and Arah lived here with both parents until he was three.}}`,
        `{{Book 3 opens at its entrance.}}`,
      ] },
    ],
  },
  {
    key: 'shatter', name: 'The Shatter Layer', kind: 'THIN DIMENSION', color: '#a1a1aa', rgb: '161,161,170',
    anchor: 'BETWEEN VERALLUS AND THE VOID', lights: [],
    short: 'Where the worst corruption is born.',
    desc: `A thin dimension between Verallus and the void beyond it. It is gray and formless. Gravity is optional and time won't hold steady. Nobody enters it willingly: people end up here through a dimensional tear or a failed experiment, and certain forbidden techniques open the way too. Treswack's chaos leaks into Verallus through it, and the worst corruption the world knows is born here.`,
    sections: [
      { title: 'WHAT DRIFTS THERE', items: [
        `Ghosts of failed fusions.`,
        `Corruption mists, born here, that leak into Verallus.`,
        `Dimensional parasites, and the Echo-Lost.`,
      ] },
      { title: 'THE DANGER', items: [
        `Sofra destabilizes on arrival, and corruption spreads instantly.`,
        `Souls fragment here.`,
      ] },
      { title: 'NEAR KHAERVOS', items: [
        `His chaos Sofra tears small weak points in the world, so the Shatter Layer bleeds through near him more than anywhere else.`,
      ] },
    ],
  },
  {
    key: 'pale', name: 'The Pale Court', kind: 'ORACLE REALM', color: '#e2e8f0', rgb: '226,232,240',
    anchor: 'INSIDE THE ECHO WEB', lights: [],
    short: 'One visit. One question.',
    desc: `A realm inside the Echo Web that only Oracles can enter. It is a white void with no features, where time runs as memory instead of a line. Echoes of past Oracles appear there as presences, and through them an Oracle can reach knowledge from lineages that go back to the first stirrings of consciousness.`,
    sections: [
      { title: 'THE RULES', items: [
        `No Oracle may enter twice.`,
        `One question per visit.`,
        `The answer is always cryptic, and always enough.`,
      ] },
      { title: 'IN THE STORY', items: [
        `{{One Oracle, with the right lineage and exactly the right question, will spend their single visit on the truth about Auren.}}`,
      ] },
    ],
  },
  {
    key: 'sovara', name: 'Sovara', kind: 'REALM OF THE SOVA', color: '#fde68a', rgb: '253,230,138',
    anchor: 'ALONGSIDE THE MORTAL WORLD', lights: [],
    short: 'Home of the spirit companions.',
    desc: `The realm where the Sova live, alongside the mortal one. The Sova aren't bound to Verallus, and they travel to other worlds as well. Several Absolutes tend Sovara every day, mainly Serena, Father and the twins. They love it there, and they spend real time with the Sova.`,
    sections: [
      { title: 'WHO STAYS AWAY', items: [
        `{{The Old Corrupted Gods. An Absolute is usually near, a threatened Sova can call one, and the fighter Sova would overwhelm an intruder by numbers.}}`,
      ] },
      { title: 'THE THREAT', items: [
        `People on Verallus have tried experimenting on captured Sova.`,
      ] },
    ],
  },
  {
    key: 'aestrenfall', name: 'Aestrenfall', kind: 'LOST CIVILIZATION · STATUS UNKNOWN', color: '#c084fc', rgb: '192,132,252',
    anchor: 'UNKNOWN · GHOST CITIES SIGHTED IN THE SKY', lights: [],
    short: 'A floating society of scholars that vanished.',
    desc: `A floating society of scholars who pushed Sofra research further than anyone, and created the Oracle bloodlines. They predicted their own downfall. Centuries ago they disappeared, and nobody knows what became of them. Some believe they transcended physical reality, and others think they were destroyed. They may be hidden in a pocket dimension.`,
    sections: [
      { title: 'WHAT THEY LEFT', items: [
        `The Oracle bloodlines, which descend from them.`,
        `Ancient texts, scattered across the world.`,
        `Floating ruins that sometimes appear. Rare sightings of ghost cities in the sky are put down to Aestrenfall.`,
      ] },
    ],
  },
]

// ── Off the map ──

export type OffMapSite = Site & { where: string }

export const OFFMAP: OffMapSite[] = [
  {
    key: 'spire', name: 'The Fallen Spire', kind: `SOL'VASTARAN RUIN`, where: 'TERRA PRIMUS MOUNTAINS',
    color: '#7ecef4', rgb: '126,206,244',
    short: 'A tower that fell sideways, and kept its own gravity.',
    desc: `An ancient tower from the Sol'Vastaran era that fell sideways across a mountain range. Inside, gravity is reversed: you reach the rooms by climbing the walls. Fragments of Sol'Vastaran texts survive in it. So do the Gateward Sentinels, dormant constructs that wake if threatened.`,
    sections: [
      { title: 'THE DANGER', items: [
        `Gravity that shifts without warning.`,
        `The Sentinels: ancient automated defenses. They're constructs, so corruption has nothing to do with them. They're dangerous anyway.`,
        `Dimensional weak points.`,
      ] },
      { title: 'WHY FEW GO', items: [
        `It is remote, and the reversed gravity disorients anyone who gets inside.`,
      ] },
    ],
  },
  {
    key: 'prism', name: 'The Prism Wells', kind: 'SOFRA GEYSERS', where: 'SEVEN KNOWN SITES · ONE IN THE REGALUS HEARTLANDS',
    color: '#c084fc', rgb: '192,132,252',
    short: 'Liquid Sofra, erupting in color.',
    desc: `Natural Sofra geysers that erupt periodically. They formed in the Primal Age, before any people. Multicolored liquid Sofra bursts from the ground, crystallized Sofra grows around each well, and every well has its own color spectrum. Exposure strengthens a user's domain for a while. Afterward, they're more vulnerable to corruption for a while too.`,
    details: [
      { l: 'Safe use', v: 'Tier 6 and up. Below that, it can kill.' },
      { l: 'Guardians', v: 'Luminant Wardens, crystal-furred quadrupeds that refract Sofra. The Elite Six sometimes patrol with them.' },
    ],
  },
  {
    key: 'echowells', name: 'Echo Wells', kind: 'SATURATED GROUND', where: 'SCATTERED WORLDWIDE',
    color: '#94a3b8', rgb: '148,163,184',
    short: 'Old violence, still radiating.',
    desc: `Where great battles were fought or large experiments run, Sofra sank into the ground for good. Long habitation by Stage 3 creatures makes them too. They radiate ambient Sofra without stopping. In small doses that helps, and lower-tier users who stay too long risk corruption. They cluster wherever history was most violent.`,
    sections: [
      { title: 'KNOWN CLUSTERS', items: [
        `Below Khaervos's storm, where decades of challengers fought and died in the water.`,
        `Blackwatch Yard in the Ashen Dominion, forming now out of decades of forbidden research.`,
      ] },
    ],
  },
]

export const PRISM_COLORS = [
  { name: 'Cyan', color: '#22d3ee', rgb: '34,211,238', effect: 'Ice and water domains strengthen.', risk: 'Overcooling: frostbite from the inside.' },
  { name: 'Gold', color: '#facc15', rgb: '250,204,21', effect: 'Light and clarity strengthen.', risk: 'Blindness, of the eyes and otherwise.' },
  { name: 'Red', color: '#ef4444', rgb: '239,68,68', effect: 'Fire and aggression strengthen.', risk: 'Corruption speeds up.' },
  { name: 'Green', color: '#4ade80', rgb: '74,222,128', effect: 'Nature and growth strengthen.', risk: 'Root-binding: the Sopher goes immobile.' },
  { name: 'Violet', color: '#a78bfa', rgb: '167,139,250', effect: 'Perception sharpens.', risk: `Sensory overload that won't switch off.` },
  { name: 'Black', color: '#52525b', rgb: '161,161,170', effect: 'Chaos and destruction strengthen. The most dangerous of the seven.', risk: 'An immediate risk of Stage 2 corruption.' },
  { name: 'White', color: '#f8fafc', rgb: '248,250,252', effect: 'Balance and clarity.', risk: 'Sofra erasure: so much clarity it wipes out who you are.' },
]

export type Zone = { name: string; where: string; threat: 'ABSOLUTE' | 'EXTREME' | 'HIGH' | 'VARIABLE'; origin: string; onMap: boolean }

export const THREAT_COLOR: Record<Zone['threat'], { color: string; rgb: string }> = {
  ABSOLUTE: { color: '#ef4444', rgb: '239,68,68' },
  EXTREME: { color: '#f97316', rgb: '249,115,22' },
  HIGH: { color: '#f59e0b', rgb: '245,158,11' },
  VARIABLE: { color: '#94a3b8', rgb: '148,163,184' },
}

export const ZONES: Zone[] = [
  { name: 'The Abyssal Scar', where: 'The strait', threat: 'ABSOLUTE', origin: 'The Cataclysm of Four Nations. It blocks the crossing between continents.', onMap: true },
  { name: 'The Mawlands', where: 'Ashen Dominion', threat: 'EXTREME', origin: 'Decades of forbidden experimentation and Sofra dumping.', onMap: true },
  { name: 'Maw Depths', where: 'Chrono waters', threat: 'EXTREME', origin: 'Ancient ocean corruption, possibly older than civilization. Stage 2 and 3 creatures.', onMap: true },
  { name: 'Bonespire Forest', where: 'Eastern buffer zone', threat: 'HIGH', origin: 'Long habitation by ancient corruption creatures. The Hollow Choir descendants attack intruders.', onMap: true },
  { name: 'The Weeping Marsh', where: 'Southern swamplands', threat: 'HIGH', origin: 'Unknown. It may have been a battlefield once.', onMap: false },
  { name: 'Echo Wells', where: 'Scattered', threat: 'VARIABLE', origin: 'Where battles were fought or experiments run, Sofra sank in for good.', onMap: false },
]

// ── The Codex ──

export type CodexCat = 'COSMOLOGY' | 'POWER' | 'CREATURES' | 'PEOPLES' | 'CHARACTERS' | 'ORDERS' | 'HISTORY' | 'PLACES'

export const CODEX_CATS: { key: CodexCat; color: string; rgb: string }[] = [
  { key: 'COSMOLOGY', color: '#f59e0b', rgb: '245,158,11' },
  { key: 'POWER', color: '#4fc3f7', rgb: '79,195,247' },
  { key: 'CREATURES', color: '#f87171', rgb: '248,113,113' },
  { key: 'PEOPLES', color: '#4ade80', rgb: '74,222,128' },
  { key: 'CHARACTERS', color: '#cbd5e1', rgb: '203,213,225' },
  { key: 'ORDERS', color: '#e879f9', rgb: '232,121,249' },
  { key: 'HISTORY', color: '#fb923c', rgb: '251,146,60' },
  { key: 'PLACES', color: '#2dd4bf', rgb: '45,212,191' },
]

export type CodexEntry = {
  term: string
  cat: CodexCat
  kind?: string           // a short label above the term
  tag?: string            // the section's own one-line hook, shown under the term; may hold {{spoilers}}
  def: string             // may hold {{spoilers}}
  href: string            // the section that tells the full story
  where: string           // that section's name
  aka?: string[]
  see?: string[]          // other terms, by exact name
}

const SECTION: Record<string, { href: string; where: string }> = {
  world: { href: '#world', where: 'THE MAP' },
  characters: { href: '#characters', where: 'CHARACTERS' },
  races: { href: '#races', where: 'RACES' },
  power: { href: '#power', where: 'POWER' },
  factions: { href: '#factions', where: 'FACTIONS' },
  timeline: { href: '#timeline', where: 'TIMELINE' },
  depths: { href: '#depths', where: 'THE DEPTHS' },
  offmap: { href: '#offmap', where: 'OFF THE MAP' },
}

// Up to two opening sentences, stopping before any spoiler, so a definition never ends mid-thought.
const lead = (s: string) => {
  const [a, b] = s.split(/(?<=[.!?]["”]?)\s+/)
  return b && !b.includes('{{') && a.length + b.length < 260 ? `${a} ${b}` : a
}
const lcfirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

// Generated entries take the first sentence of a section's own description.
// Where that sentence doesn't work as a definition, these replace it.
const OVERRIDE: Record<string, Partial<CodexEntry>> = {
  // races
  'race:torn': { aka: ['Vorath'], see: ['The Torn Overseers', 'The Torn Underground', 'Ashen Dominion'] },
  'race:regalus': { see: ['Regalus Heartlands', 'Splitting Ceremony', 'Pre-Awakening Ceremony', 'Redmare'] },
  'race:feyvey': { see: ['FeyVey Territories', 'Splitting Ceremony', 'The FeyVey Purists', 'The Harmonist Coalition'] },
  'race:solarii': { see: ['Frostwardens', 'Cryobending', 'The Frozen Wastes', 'Auren'] },
  'race:oracles': { see: ['The Oracle Network', 'Oracle Mass Purge', 'Aestrenfall', 'The Pale Court'] },
  'race:farrow': { tag: '', def: `A people the general population doesn't know exists. {{The First Bender was one of them. When she escaped the Torn, they hunted every bending-compatible bloodline, and the Farrow went underground.}}`, see: ['The First Bender', 'The Shaleh-Kai Enclave', 'Catalyst gene'] },
  // factions
  'faction:keeper': { def: 'A single individual: the custodian of the official historical record, and one of the four voices the Elite Six answer to.' },
  'faction:maletonian': { def: 'A Torn Overseer incursion onto Terra Primus, across the Abyssal Scar. Regalus, Dormose and some FeyVey forces stood against it.' },
  'faction:oldgods': { def: '{{The Old Corrupted Gods: an older order of gods, corrupted long ago and displaced. The Absolutes believe that order is only a myth. They seep into Verallus through corruption itself and work through mortal hands.}}' },
  'faction:council': { aka: ['Intercontinental Peace Council'], see: ['Accord of Ashes', 'Suppression marks', 'Fake summonses'] },
  'faction:elite6': { see: ['The World Council', "The Prime Corruptor's Prison"] },
  // power
  'power:absolutes': { tag: '', def: 'Ten gods whose existence radiates Sofra like a star radiates heat. They give no one power on purpose. Eight remain active and two are dead. {{Auren was the one exception: he gave the Solarii Sofra himself.}}', cat: 'COSMOLOGY', see: ['Auren', 'Father', 'Treswack', 'The Silent Absolutes', 'Demigods'] },
  'power:sopher': { see: ['Sofra', 'Sopher Draw', 'Corruption'] },
  'power:sofra': { see: ['Sopher', 'Tiers', 'Resonance', 'Reserves'] },
  'power:reserves': { see: ['The Thirds', 'Sopher Draw', 'Breakthrough'] },
  'power:benders': { term: 'Bending', def: 'The lost seventh category. It takes a biological catalyst gene that bridges Sofra and a physical element, and most of the world believes it is an extinct fable.', aka: ['Benders'], see: ['Catalyst gene', 'Cryobending', 'Bending evolution', 'The First Bender'] },
  'power:evolution': { term: 'Bending evolution', def: `Evolved bending forms aren't unlocked by mastery alone. They're discovered and chosen, by a bender who meets five conditions, and one of them is a significant loss.` },
  'power:awakenings': { term: 'Two Awakenings', def: 'Bending has had two great awakenings: among the Solarii more than 4,000 years ago, and through the First Bender 300 to 500 years ago.', see: ['Solarii', 'The First Bender'] },
  'power:rules': { term: 'Corruption', tag: '', see: ['Purification', 'Corruption Creatures', 'The Shatter Layer'] },
  'power:purification': { def: `Stages 1 and 2 can be treated. Stage 3 can't: there's no one left to save. Immersion at a sacred site works best, about 95% of the time.` },
  'power:creatures': { cat: 'CREATURES', def: 'Any animal can turn with enough exposure. Stage 1 creatures are common enough that local soldiers handle them. Stage 3 takes several Elite Six members.', see: ['Frostgnaw Leviathan', 'Hollow Choir descendants', 'Luminant Wardens'] },
  'power:lostarts': { def: 'At extreme tiers, a handful of people across history have pushed their category so far that their Sofra became something the system has no name for. Few reach one, and fewer document it.', see: ['Monoliths'] },
  'power:actus': { def: 'A lost, forbidden technique, unknown to almost everyone alive. The user empties their Sofra, then forces maximum output out of their own Sopher.', see: ['Sopher Draw', 'Forbidden Techniques'] },
  'power:sova': { cat: 'CREATURES', see: ['Sovara'] },
  'power:twocats': { def: 'Normally a person has exactly one category, revealed at awakening. Failed fusions and forbidden experiments have grafted more than one onto a single subject, and most of those subjects die. {{A demigod line carrying the Farrow catalyst is the other way.}}' },
  'power:demigods': { cat: 'COSMOLOGY', see: ['Suppression marks', 'The Absolutes'] },
  'power:monoliths': { see: ['Lost Art Deviations'] },
  // map regions
  'region:scar': { def: 'The strait between Terra Primus and the Ashen Dominion, destroyed by the Cataclysm of Four Nations. Sofra cannot function inside it.', see: ['Cataclysm of Four Nations'] },
  'region:frozen': { term: 'The Frozen Wastes', kind: `FORMER SOL'VASTARA`, aka: [`Sol'Vastara`], see: ['Solarii', 'Auren'] },
  'region:redwake': { kind: 'SACRED DESERT', def: `A sacred desert on an unnamed landmass off the southeast of the Regalus Heartlands. Its sand changes color with the Sopher around it, and staying too long brings Sand Sickness.`, see: ['Emberfell'] },
  'region:oathless': { def: 'A pocket dimension anchored above the most isolated stretch of ocean on Verallus, far east beyond the Ashen Dominion. Khaervos rules it from the Tempest Throne.', see: ['Khaervos'] },
  // characters
  'character:khaervos': { see: ['Treswack', 'The Oathless Sky', 'Demigods'] },
  'character:arah': { see: ['Cryobending', 'Redmare', 'The Riverlands'] },
}

const SKIP = new Set(['power:wells', 'character:sinharvesters'])

function fromTopics(topics: Topic[], cat: CodexCat): CodexEntry[] {
  return topics.map(t => ({ id: `power:${t.key}`, term: t.name, cat, kind: t.eyebrow, tag: t.hook, def: lead(t.desc), ...SECTION.power }))
    .filter(e => !SKIP.has(e.id))
    .map(({ id, ...e }) => ({ ...e, ...OVERRIDE[id] }))
}

function generated(): CodexEntry[] {
  const out: CodexEntry[] = []
  for (const g of CHARACTER_GROUPS) for (const c of g.members) {
    if (SKIP.has(`character:${c.key}`)) continue
    out.push({ term: c.name, cat: 'CHARACTERS', kind: `${c.epithet} · ${c.role}`.toUpperCase(), def: lead(c.desc), ...SECTION.characters, ...OVERRIDE[`character:${c.key}`] })
  }
  for (const g of RACE_GROUPS) for (const r of g.members) {
    out.push({ term: r.name, cat: 'PEOPLES', kind: r.epithet.toUpperCase(), tag: r.hook ?? (r.motto && r.motto.length < 100 ? r.motto : undefined), def: lead(r.desc), ...SECTION.races, ...OVERRIDE[`race:${r.key}`] })
  }
  for (const g of FACTION_GROUPS) for (const f of g.members) {
    const cat: CodexCat = f.key === 'maletonian' ? 'HISTORY' : f.key === 'oldgods' ? 'COSMOLOGY' : 'ORDERS'
    const kind = f.key === 'oldgods' ? 'THE SHADOW' : f.role.includes('{{') || f.role.startsWith('"') ? undefined : f.role.toUpperCase()
    out.push({ term: f.name, cat, kind, def: lead(f.desc), ...SECTION.factions, ...OVERRIDE[`faction:${f.key}`] })
  }
  out.push(...fromTopics(FOUNDATIONS, 'POWER'), ...fromTopics(CATEGORIES, 'POWER'), ...fromTopics(BENDING_TOPICS, 'POWER'),
    ...fromTopics(CORRUPTION_TOPICS, 'POWER'), ...fromTopics(BEYOND, 'POWER'))
  for (const p of BENDING_PATHS) {
    const element = p.note.split(' to ')[0].toLowerCase()
    out.push({
      term: p.base, cat: 'POWER', kind: 'BASE BENDING FORM',
      def: `Bending ${element}. One of the four base forms, and it can evolve into ${p.evolved}. Its cost: ${lcfirst(p.baseCost)}.`,
      ...SECTION.power, see: [p.evolved, 'Bending'],
    })
    out.push({
      term: p.evolved, cat: 'POWER', kind: 'EVOLVED BENDING FORM',
      def: `The evolved form of ${p.base}. ${p.note} Its cost: ${lcfirst(p.evolvedCost)}${p.evolvedCost.endsWith('.') ? '' : '.'}`,
      ...SECTION.power, see: [p.base, 'Bending evolution'],
    })
  }
  for (const [key, r] of Object.entries(REGIONS)) {
    const same = r.eye.replace(/^THE /, '') === r.name.toUpperCase().replace(/^THE /, '')
    out.push({ term: r.name, cat: 'PLACES', kind: same ? r.sub : r.eye, def: lead(r.desc), ...SECTION.world, ...OVERRIDE[`region:${key}`] })
  }
  return out
}

// Terms no section defines on its own.
const WRITTEN: CodexEntry[] = [
  // cosmology
  { term: 'Auren', cat: 'COSMOLOGY', kind: 'THE ERASED GOD', ...SECTION.power, aka: ['The Ninth'],
    def: `{{The Ninth Absolute, who walked among the Solarii as a friend. His blood ran through them, and he gave them Sofra himself, the only Absolute ever to do so. Frostwardens manipulated into fearing him killed him about 4,000 years ago. His death infused him into the world itself, and his residual energy became the River of Echoes. The surviving Absolutes erased his name from history.}}`,
    see: ['The Absolutes', 'Frostwardens', 'Icebirth Cycle', 'River of Echoes'] },
  { term: 'Father', cat: 'COSMOLOGY', kind: 'ABSOLUTE · THE OVERSEER', ...SECTION.power,
    def: `The overseer among the Absolutes. He intervenes when it's necessary, and he can't have children.`, see: ['The Absolutes', 'Sovara'] },
  { term: 'Serena', cat: 'COSMOLOGY', kind: 'ABSOLUTE · LOVE AND COMPASSION', ...SECTION.power,
    def: `The Absolute of love and compassion. Her imprint is strongest near the River of Echoes, and her compassion for Verallus keeps her near.`, see: ['River of Echoes', 'Sovara'] },
  { term: 'Porish', cat: 'COSMOLOGY', kind: 'ABSOLUTE · LOGIC AND INTELLECT', ...SECTION.power,
    def: `The Absolute of logic and intellect, mostly withdrawn and pursuing knowledge elsewhere. Porish-domain users read auras at an advanced level.`, see: ['Aura Reading'] },
  { term: 'Ortox', cat: 'COSMOLOGY', kind: 'ABSOLUTE · STRENGTH AND COURAGE', ...SECTION.power,
    def: `The Absolute of strength and courage. Bound by duty, he can't fully let go of Verallus.` },
  { term: 'Treswack', cat: 'COSMOLOGY', kind: 'ABSOLUTE · HATE, CORRUPTION AND CHAOS', ...SECTION.power,
    def: `The Absolute of hate, corruption and chaos. Evil for its own sake. He has a son, Khaervos, whose existence breaks cosmic law.`, see: ['Khaervos', 'The Shatter Layer'] },
  { term: 'Retallia and Retaan', cat: 'COSMOLOGY', kind: 'ABSOLUTES · THE TWINS', ...SECTION.power, aka: ['Retallia', 'Retaan', 'The twins'],
    def: `The twin Absolutes. Retallia is balance, and too curious about how things turn out to leave. Retaan is freedom, and respects the freedom to fail.`, see: ['Sovara'] },
  { term: 'Argon', cat: 'COSMOLOGY', kind: 'ABSOLUTE · THE OUTCAST', ...SECTION.power,
    def: `The outcast Absolute, who keeps entirely to himself. {{Arah's father's line descends from him.}}` },
  { term: 'The Tenth', cat: 'COSMOLOGY', kind: 'ABSOLUTE', ...SECTION.timeline,
    def: `{{An Absolute who died in prehistory. Its name, domain and fate are unknown, and the surviving Absolutes barely speak of it.}}`, see: ['The Absolutes'] },
  { term: 'The Silent Absolutes', cat: 'COSMOLOGY', kind: 'ERA XI · ONGOING', ...SECTION.timeline,
    def: `The gods' long distance from Verallus, kept since the Icebirth Era. Most people take it for indifference. {{It's a policy, set after one of them was killed by the mortals he walked among.}}`, see: ['The Absolutes', 'Auren'] },
  { term: 'The Echo Web', cat: 'COSMOLOGY', kind: 'SPIRITUAL OVERLAY', ...SECTION.depths,
    def: `A network of Sopher connections laid over the physical world. Echo Spirits exist in it, and the River of Echoes truly exists there.`, see: ['Echo Spirits', 'The Pale Court', 'River of Echoes'] },
  { term: 'Echo Spirits', cat: 'COSMOLOGY', ...SECTION.depths,
    def: `What some of the dead leave behind in the Echo Web. They gather at the River of Echoes, and Solarii Echo Spirits haunt the ruins of Sol'Vastara.`, see: ['The Echo Web', 'River of Echoes'] },

  // power
  { term: 'Resonance', cat: 'POWER', ...SECTION.power,
    def: `A rare attunement of a high-tier user's Sopher to one Absolute's direct radiation. It happens or it doesn't. It unlocks techniques pure Sofra can't produce, and it makes the user visible to that Absolute.`, see: ['Sofra', 'The Absolutes'] },
  { term: 'Tiers', cat: 'POWER', kind: 'THE TEN-TIER SYSTEM', ...SECTION.power, aka: ['Tier'],
    def: `The scale of Sofra, from Tier 0, the dormant 80% of all people, up to Tier 10, Destiny Manifest. Every climb carries a breakthrough toll.`, see: ['Awakening', 'Breakthrough', 'Sofra'] },
  { term: 'Awakening', cat: 'POWER', kind: 'TIER 1', ...SECTION.power,
    def: `The first activation of Sofra, and it is involuntary: a huge spike that briefly shows the user what they could do, then subsides. One significant event triggers it, and intense emotion is only one possible trigger.`, see: ['Tiers', 'Pre-Awakening Ceremony'] },
  { term: 'The Thirds', cat: 'POWER', kind: 'MEASURING OVERUSE', ...SECTION.power,
    def: `How overuse is measured. The first third of your reserves is normal use, and the second brings fatigue that rest fixes. Push into the final third and it takes full rest to recover.`, see: ['Reserves'] },
  { term: 'Sopher Draw', cat: 'POWER', ...SECTION.power,
    def: `Burning Sopher, life energy itself, once Sofra runs dry. For a trained user it takes a deliberate act, and even knowing it's possible is dangerous information.`, see: ['Sopher', 'Actus Ultimus', 'Corruption'] },
  { term: 'Breakthrough', cat: 'POWER', ...SECTION.power,
    def: `Climbing a tier. It costs exhaustion and a recovery period with no Sofra at all. A natural breakthrough does no lasting damage. A forced one can.`, see: ['Tiers'] },
  { term: 'Catalyst gene', cat: 'POWER', ...SECTION.power,
    def: `The biological gene bending requires. It bridges a user's Sofra and a physical element. About 5% of people carry it dormant, and most never know.`, see: ['Bending'] },
  { term: 'Suppression marks', cat: 'POWER', ...SECTION.power, aka: ['Demi-God Containment Laws'],
    def: `Engineered marks that the World Council's Demi-God Containment Laws put on demigods. A mark caps the Sofra a demigod can express, and never the ceiling.`, see: ['Demigods', 'The World Council'] },

  // creatures
  { term: 'Luminant Wardens', cat: 'CREATURES', kind: 'GUARDIANS', ...SECTION.offmap,
    def: `Crystal-furred quadrupeds that refract Sofra and guard the Prism Wells. The Elite Six sometimes patrol with them.`, see: ['The Prism Wells'] },
  { term: 'Cryos Wards', cat: 'CREATURES', kind: 'CONSTRUCTS', ...SECTION.world,
    def: `Living glacier constructs the Solarii left to guard the Glacial Choir in the Frozen Wastes. They still work after thousands of years.`, see: ['Solarii', 'The Frozen Wastes'] },
  { term: 'Gateward Sentinels', cat: 'CREATURES', kind: 'CONSTRUCTS', ...SECTION.offmap,
    def: `Dormant Sol'Vastaran constructs in the Fallen Spire. They wake if threatened.`, see: ['The Fallen Spire'] },
  { term: 'Frostgnaw Leviathan', cat: 'CREATURES', kind: 'STAGE 3', ...SECTION.power,
    def: `A Stage 3 corruption creature of the Frozen Wastes. It was an ice-domain user who fully corrupted, possibly thousands of years ago.`, see: ['Corruption Creatures', 'The Frozen Wastes'] },
  { term: 'Hollow Choir descendants', cat: 'CREATURES', kind: 'STAGE 2', ...SECTION.power,
    def: `Corrupted beings, close to human in shape, who live in the depths of Bonespire Forest and attack intruders.`, see: ['Corruption Creatures'] },
  { term: 'The Prime Corruptor', cat: 'CREATURES', kind: 'SEALED', ...SECTION.depths,
    def: `A catastrophic entity sealed in the deepest layer of the underground anyone can reach. Its escape would mean extinction.`, see: ["The Prime Corruptor's Prison", 'Vorgath'] },

  // peoples
  { term: 'Frostwardens', cat: 'PEOPLES', kind: 'THE SOLARII ELITE', ...SECTION.races,
    def: `The Solarii's elite order of spiritual warriors. {{The strongest of Auren's line, born with the most potential for Sofra. A faction of them, manipulated into fearing him, killed him. Treswack destroyed the Frostwardens for it and spared the rest of the Solarii.}}`, see: ['Solarii', 'Auren'] },
  { term: 'Sanori', cat: 'PEOPLES', kind: 'AN ANCIENT PEOPLE', ...SECTION.depths,
    def: `An ancient people, spiritual and reclusive from the start. Their descendants built the Shaleh-Kai Enclave.`, see: ['The Shaleh-Kai Enclave'] },
  { term: 'Vorgath', cat: 'PEOPLES', kind: 'EXTINCT', ...SECTION.depths,
    def: `Underground beast tamers, isolated and powerful, who destroyed themselves in a corruption catastrophe thousands of years ago.`, see: ['Vorgath Underdeep', 'The Prime Corruptor'] },
  { term: 'Aestrenfall', cat: 'PEOPLES', kind: 'LOST CIVILIZATION', ...SECTION.depths,
    def: `A floating society of scholars who created the Oracle bloodlines, then vanished centuries ago. Nobody knows whether they were destroyed or are hidden.`, see: ['Oracle Bloodlines'] },

  // history
  { term: 'Primal Age', cat: 'HISTORY', kind: 'ERA I', ...SECTION.timeline,
    def: `A young planet flooded with raw Sofra, before any people. The Prism Wells formed then, and the Echo Web began.` },
  { term: 'Icebirth Cycle', cat: 'HISTORY', kind: 'ERA IV · ~4,000 YEARS AGO', ...SECTION.timeline, aka: ['Icebirth Era'],
    def: `The forgotten era. No school on Verallus teaches it, and most scholars call it myth. {{The surviving Absolutes erased it together after one of their own was killed.}}`, see: ['Auren', 'Solarii'] },
  { term: 'Splitting Ceremony', cat: 'HISTORY', kind: '~4,000 YEARS AGO', ...SECTION.timeline, aka: ['First Sofra Awakening', 'Terra Split'],
    def: `The day the Terra people gathered for a blessing they'd been led to expect, and received it in two shapes. One side became the first Regalus and the other the first FeyVey. Sofra woke across every race at the same time.`, see: ['Regalus', 'FeyVey'] },
  { term: 'The long dark', cat: 'HISTORY', kind: 'ERA V · ~4,000 TO ~500', ...SECTION.timeline,
    def: `The rest of Era V after the awakening settled: about three and a half thousand years that almost nobody recorded. A forbidden fusion war was fought late in it.`, see: ['Splitting Ceremony', 'Forbidden fusion war'] },
  { term: 'Forbidden fusion war', cat: 'HISTORY', kind: '~1,000 YEARS AGO', ...SECTION.timeline,
    def: `A war fought with forbidden fusions about 1,000 years before Book 1, in Era V's long dark. Its battlefield is the Echo Graves, where echoes still replay the final moments of the dead.`, see: ['The long dark'] },
  { term: 'The Long Centuries', cat: 'HISTORY', kind: 'ERA VI · ~500 TO ~120', ...SECTION.timeline,
    def: `Cultures stabilize and institutions take shape, while tension between the races builds slowly. Bending returns in this era, in secret.`, see: ['The First Bender'] },
  { term: 'The First Bender', cat: 'HISTORY', kind: '~300 TO ~500 YEARS AGO', ...SECTION.timeline,
    def: `The girl through whom bending returned, thousands of years after it died with the Solarii. {{A Farrow-Regalus hybrid and the only survivor of a Torn project called Elemental Graft. She escaped with one child and founded the tradition that still hides the Farrow.}}`, see: ['Bending', 'Farrow'] },
  { term: 'The Shattered Century', cat: 'HISTORY', kind: 'ERA VII · ~120 TO ~20', ...SECTION.timeline, aka: ['First Great War'],
    def: `The First Great War. It lasted about a hundred years, and nobody has recovered from it.`, see: ['Cataclysm of Four Nations', 'Siege of Solhaven', 'Accord of Ashes'] },
  { term: 'Siege of Solhaven', cat: 'HISTORY', kind: 'THE SHATTERED CENTURY', ...SECTION.timeline,
    def: `FeyVey Purists and Torn besieged Solhaven, the Regalus spiritual capital, for six months. It still defines relations between the Regalus and the FeyVey.`, see: ['The FeyVey Purists'] },
  { term: 'Cataclysm of Four Nations', cat: 'HISTORY', kind: '~100 YEARS AGO', ...SECTION.timeline,
    def: `A coalition of scientists built a living weapon. It became conscious, and when it understood what had been done to it, it destroyed itself. More than 200,000 died at once, and the strait became the Abyssal Scar. The official record calls it a natural disaster.`, see: ['The Abyssal Scar'] },
  { term: 'Oracle Mass Purge', cat: 'HISTORY', kind: '~65 TO ~90 YEARS AGO', ...SECTION.timeline,
    def: `The coordinated killing of Oracle bloodlines worldwide by the Torn Overseers and the FeyVey Purists. Hundreds died, and the Oracles have never recovered.`, see: ['Oracle Bloodlines', 'The Oracle Network'] },
  { term: 'Accord of Ashes', cat: 'HISTORY', kind: '~20 YEARS AGO', ...SECTION.timeline,
    def: `The treaty that ended the Shattered Century in exhaustion, about twenty years before Book 1. It created the World Council.`, see: ['The World Council', 'The Shattered Century'] },
  { term: 'Dark Age of Experimentation', cat: 'HISTORY', kind: 'ERA VIII · ~50 TO ~20', ...SECTION.timeline,
    def: `Recent history, kept quiet. Forbidden research turned darker and better protected, with governments shielding the people who ran it.`, see: ['Forbidden Techniques'] },
  { term: 'Fake summonses', cat: 'HISTORY', kind: '~40 YEARS AND RUNNING', ...SECTION.timeline,
    def: `Forged World Council summonses that send gifted children who haven't awakened yet to Torn land, where they're drugged and taken. The forgers can't copy the Council's seal. The scheme is still running when Book 1 opens.`, see: ['The World Council'] },
  { term: 'The Quiet Era', cat: 'HISTORY', kind: 'ERA IX', ...SECTION.timeline,
    def: `From the Accord of Ashes to the story. Peace on the surface and a Primidian golden age. Underneath, old hatreds simmer and the forbidden research never stopped.` },
  { term: 'The Age of Resonance', cat: 'HISTORY', kind: 'ERA X · NOW', ...SECTION.timeline,
    def: `Book 1 onward. Arah is sixteen, and every unresolved thread in Verallus history runs through him.` },
  { term: 'Pre-Awakening Ceremony', cat: 'PEOPLES', kind: 'REGALUS', ...SECTION.races,
    def: `The Regalus ceremony at the River of Echoes, held whenever a child is ready. The River draws out a dim personal design in the child's tattoo, a promise to awaken.`, see: ['Regalus', 'Awakening', 'River of Echoes'] },
  { term: 'Redmare', cat: 'PEOPLES', kind: 'REGALUS', ...SECTION.races,
    def: `The Regalus coming-of-age trial, a combat and Sofra challenge in the mid-to-late teens. Pass and you're an adult in the community. Fail and you try again, with no shame in it.`, see: ['Regalus', 'Veilheim'] },

  // places
  { term: 'River of Echoes', cat: 'PLACES', kind: 'SACRED SITE · ECHO WEB ANCHOR', ...SECTION.world,
    def: `The sacred river of the Regalus Heartlands. Its water reflects memories and never freezes, even in winter. {{Auren's residual energy became the River.}}`, see: ['The Echo Web', 'Echo Spirits', 'Order of Echo Stewards'] },
  { term: 'The Riverlands', cat: 'PLACES', kind: 'REGALUS HEARTLANDS', ...SECTION.world,
    def: `Arah's home village: about 2,000 people under deep tree cover on the forested outskirts of Solhaven. The River of Echoes runs right through it.`, see: ['River of Echoes', 'Solhaven'] },
  { term: 'Solhaven', cat: 'PLACES', kind: 'REGALUS SPIRITUAL CAPITAL', ...SECTION.world,
    def: `The Regalus spiritual capital, in an arid basin ringed by mountains. It has no walls, by philosophy.`, see: ['Siege of Solhaven'] },
  { term: 'Terra Primus', cat: 'PLACES', kind: 'CONTINENT', ...SECTION.world,
    def: `Home of the Regalus and the FeyVey, south and north. The Dormose hold the west.`, see: ['Regalus Heartlands', 'FeyVey Territories', 'The Heartwood'] },
  { term: 'Veilheim', cat: 'PLACES', kind: 'POCKET DIMENSION', ...SECTION.depths,
    def: `A pocket dimension for training and trials. Its entrance appears near sacred sites when conditions are right.`, see: ['Redmare'] },
  { term: 'The Shaleh-Kai Enclave', cat: 'PLACES', kind: 'HIDDEN CIVILIZATION', ...SECTION.depths,
    def: `A hidden underground civilization behind four layers of deterrence. It can't be found by accident.`, see: ['Sanori'] },
  { term: 'The Shatter Layer', cat: 'PLACES', kind: 'THIN DIMENSION', ...SECTION.depths,
    def: `A thin dimension between Verallus and the void. Nobody enters it willingly, and the worst corruption on Verallus is born there.`, see: ['Corruption', 'Treswack'] },
  { term: 'The Pale Court', cat: 'PLACES', kind: 'ORACLE REALM', ...SECTION.depths,
    def: `A realm inside the Echo Web that only Oracles can enter. No Oracle may enter twice, and each visit allows one question.`, see: ['The Echo Web', 'Oracle Bloodlines'] },
  { term: 'Sovara', cat: 'PLACES', kind: 'REALM OF THE SOVA', ...SECTION.depths,
    def: `The realm where the Sova live, alongside the mortal one. Several Absolutes tend it every day.`, see: ['Sova'] },
  { term: 'Skyfold Labyrinth', cat: 'PLACES', kind: 'MID SKY', ...SECTION.depths,
    def: `A maze in the mid sky, 10,000 to 30,000 feet up, where the air thins and navigation turns hard.` },
  { term: 'Vorgath Underdeep', cat: 'PLACES', kind: 'MID SUBSTRATUM', ...SECTION.depths,
    def: `The ruins of the Vorgath, deep underground. Their tamed corruption creatures still live there, along with forbidden experiments that never stopped running.`, see: ['Vorgath'] },
  { term: `The Prime Corruptor's Prison`, cat: 'PLACES', kind: 'DEEP SUBSTRATUM', ...SECTION.depths,
    def: `The sealed prison at the bottom of the reachable underground. The Dormose keep its wards, and the Elite Six maintain its seals.`, see: ['The Prime Corruptor'] },
  { term: 'The Fallen Spire', cat: 'PLACES', kind: `SOL'VASTARAN RUIN`, ...SECTION.offmap,
    def: `An ancient tower that fell sideways across the Terra Primus mountains. Inside, gravity is reversed.`, see: ['Gateward Sentinels'] },
  { term: 'The Prism Wells', cat: 'PLACES', kind: 'SOFRA GEYSERS', ...SECTION.offmap, aka: ['Prism Well'],
    def: `Seven known Sofra geysers that erupt in color. They strengthen a domain for a while, and they can kill anyone below Tier 6.`, see: ['Luminant Wardens', 'Echo Wells'] },
  { term: 'Echo Wells', cat: 'PLACES', kind: 'SATURATED GROUND', ...SECTION.offmap,
    def: `Old battlefields and experiment sites where Sofra sank into the ground for good and still radiates. Living near one is a recognized cause of corruption.`, see: ['The Prism Wells', 'Corruption'] },
  { term: 'The Weeping Marsh', cat: 'PLACES', kind: 'CORRUPTION ZONE', ...SECTION.offmap,
    def: `A high-threat corruption zone in the southern swamplands. Nobody knows what made it.` },
]

const sortKey = (t: string) => t.replace(/^The /, '').toLowerCase()

export const CODEX: CodexEntry[] = [...generated(), ...WRITTEN].sort((a, b) => sortKey(a.term).localeCompare(sortKey(b.term)))

export const codexSort = sortKey

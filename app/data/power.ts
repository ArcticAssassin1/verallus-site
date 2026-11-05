// Power system archive.
// Source of truth: the power system doc in the private Book repo (v18), with characters and locations.
// Spoilers: wrap any text in {{ }} and the site blurs it until the reader taps it (or turns spoilers on).

export type Topic = {
  key: string
  name: string
  eyebrow: string
  hook: string
  color: string
  rgb: string
  stats?: { v: string; l: string }[]
  desc: string
  sections: { title: string; items: string[] }[]
}

export type Tier = {
  n: number
  name: string
  rarity: string
  level: string
  phys: string
  sofra: string
  desc: string
  cost?: string
  ceiling?: string
  counter?: string
}

// ── Foundations ──
export const FOUNDATIONS: Topic[] = [
  {
    key: 'sopher', name: 'Sopher', eyebrow: 'THE LIVING VESSEL', hook: 'Life energy. Only living things have it, and it does not want to be used.',
    color: '#4ade80', rgb: '74,222,128',
    desc: `Sopher is life energy itself. Only living things carry it: stone, water, air and fire may be soaked in ambient Sofra, but none of them has Sopher. A person's Sopher signature is unique, set early in life, and hints at the kind of Sofra they could develop if they ever awaken. It can be developed. It can't be fundamentally changed. And Sopher resists being manipulated or controlled. That resistance is why breakthroughs are so hard, why drawing on Sopher as a last resort is so dangerous, and why corruption shows warning signs at all: the signs are Sopher fighting back.`,
    sections: [
      { title: 'THE SOPHER DRAW', items: [
        `When Sofra reserves run dry, a trained user doesn't automatically start burning Sopher. They hit empty and stop. Reaching for Sopher as fuel takes a deliberate, conscious act, and knowing it's possible is itself dangerous information.`,
        `Pre-awakening Sopher classes, like the ones Master Zollu runs in the Riverlands, teach children to feel the flow in their own bodies. That familiarity quietly trains the body to refuse a Sopher draw after awakening, which is a big part of why corruption is so hard to bring about by accident.`,
        `{{A body the classes didn't take with has a weaker safeguard. Arah is the example.}}`,
      ] },
    ],
  },
  {
    key: 'sofra', name: 'Sofra', eyebrow: 'THE AWAKENED CHANNEL', hook: 'Sopher evolved, and shaped to fit the person who carries it, for better or worse.',
    color: '#4fc3f7', rgb: '79,195,247',
    desc: `Sofra is Sopher evolved, expanded and shaped to fit its user. It's the active channeling of the ambient energy the Absolutes radiate, through a developed Sopher signature. Once awakened, it grows more individual over time, adapting to the user's personality, instincts and fighting style. It will adapt to any direction they grow, including corruption. Sofra isn't a personality trait or a gift from the gods. Progress comes from discipline, training, mastery and Sopher compatibility. Emotion is one valid trigger for awakening at Tier 1, and nothing more. "Anger makes you stronger" is not how this world works.`,
    sections: [
      { title: 'RESONANCE', items: [
        `A rare few high-tier users go further: their Sopher attunes to one Absolute's direct radiation. It isn't earned or sought. It happens or it doesn't. It unlocks techniques pure Sofra can't produce, and it makes the user visible to that Absolute, with all the risks that brings.`,
      ] },
      { title: 'THE DEPENDENCY RULE', items: [
        `Sofra adapts to its user. Someone who leans on repeated boosts from an Enhancer instead of building their own power ends up with less refined, less controlled output, even at the same raw level. Their Sofra learns to expect help.`,
      ] },
    ],
  },
  {
    key: 'absolutes', name: 'The Absolutes', eyebrow: 'THE SOURCE', hook: 'Ten gods whose existence radiates Sofra like a star radiates heat.',
    color: '#f59e0b', rgb: '245,158,11',
    stats: [
      { v: '10', l: 'Originally' },
      { v: '8', l: 'Still active' },
      { v: '2', l: 'Dead' },
    ],
    desc: `The Absolutes give no one Sofra on purpose. They simply exist, and their existence saturates the cosmos with it, the energy they use to birth planets and sustain everything. There were originally ten. Eight remain active. Two are dead. {{One of the dead was Auren, the Ninth, killed by Frostwardens who had been manipulated into fearing him. His death infused him into the world itself, which is a large part of why Verallus runs so dense with Sofra, and his residual energy became the River of Echoes. The surviving Absolutes erased his name from history. The Tenth is dead too, and almost nothing is known about it.}}`,
    sections: [
      { title: 'THE EIGHT', items: [
        `Serena: love and compassion. Her imprint is strongest near the River of Echoes.`,
        `Porish: logic and intellect. Ortox: strength and courage.`,
        `Treswack: hate, corruption and chaos. Evil for its own sake. {{He has a son, Khaervos, which breaks cosmic law.}}`,
        `Father: the overseer, who intervenes when it's necessary.`,
        `Retallia and Retaan: the twins. Balance, and freedom.`,
        `Argon: the outcast, who keeps to himself. {{Arah's father's line descends from him.}}`,
      ] },
    ],
  },
  {
    key: 'reserves', name: 'Reserves', eyebrow: 'THE MEAL ANALOGY', hook: `You can only eat so much, and then you have to wait.`,
    color: '#a78bfa', rgb: '167,139,250',
    desc: `Sofra reserves work like how much you can eat in a day. You can only take in so much before you're full, push past that and it goes badly, and you have to wait to digest before you can eat again. Run your reserves empty and you wait out the recovery. Capacity itself grows with sustained training. Instant-recovery items exist, from black markets and expensive specialists only, with side effects nobody guarantees.`,
    sections: [
      { title: 'THE THIRDS', items: [
        `First third spent: normal use. No lasting effect.`,
        `Second third: moderate use. Minor fatigue that rest fixes.`,
        `Into the final third: overuse. Real strain, and it takes full rest to recover.`,
        `Fully exhausted: empty. For a trained user, the only way further is a deliberate Sopher draw.`,
        `Overuse is relative to your tier. A long, steady output wears you down faster than one big burst of the same total.`,
      ] },
      { title: 'BREAKTHROUGHS', items: [
        `Climbing a tier comes with a toll: exhaustion, and no Sofra at all for a recovery period. It's Sopher resisting being evolved. Higher tiers mean longer recoveries. A natural breakthrough does no permanent damage. A forced one can.`,
      ] },
    ],
  },
]

// ── The ten tiers ──
export const TIERS: Tier[] = [
  { n: 0, name: 'Dormant', rarity: '80% of all people', level: 'None', phys: 'None', sofra: 'None',
    desc: `No Sofra awakened. Most of Verallus lives here, perfectly normal lives with small Sopher enhancements. The signs that someone might awaken: unusually strong instinct, a body slightly better than it should be, sensitivity to lumini flies, unease near corruption.` },
  { n: 1, name: 'Awakening', rarity: 'Every Sofra user', level: '100–500', phys: 'x1.0', sofra: 'x1.0',
    desc: `The first activation is involuntary: an enormous spike, about 15,000, that briefly shows the user what they could do up to Tier 3, then subsides. The trigger is one significant event: physical trauma, high Sofra density, a sacred site, or intense emotion. Control is nearly none.`,
    cost: `Uncontrolled emissions leave a fatigue that stacks, and sleep only partly clears it.`,
    ceiling: `Sofra can't be held for more than seconds. Forcing it causes a shutdown the body treats like a seizure.`,
    counter: `A sudden, sharp calm can snuff the power out entirely.` },
  { n: 2, name: 'Seedling', rarity: '1 in 2 users', level: '500–750', phys: 'x1.5', sofra: 'x1.5',
    desc: `The start of the foundational training stage, where progress is discipline and repetition. Sopher compatibility starts to show. So does corruption risk, from overuse, forced progress, or exposure to corrupted places before the Sopher is stable. {{Arah starts Book 1 here.}}`,
    cost: `Sustained use burns physical stamina. Reactions slow and decisions dull.`,
    ceiling: `Output is capped by Sopher compatibility. Training against that wall won't move it.`,
    counter: `Break their form or flood their senses, and active techniques collapse.` },
  { n: 3, name: 'Training', rarity: '1 in 10 users', level: '750–1,500', phys: 'x2.0', sofra: 'x2.0',
    desc: `Most people who awaken plateau somewhere in Tiers 2 and 3. It's also the minimum tier for deliberate bending, for those who carry the catalyst.`,
    cost: `Sustained use burns physical stamina. Reactions slow and decisions dull.`,
    ceiling: `Output is capped by Sopher compatibility. Training against that wall won't move it.`,
    counter: `Break their form or flood their senses, and active techniques collapse.` },
  { n: 4, name: 'First Expression', rarity: '1 in 100', level: '2,000–6,000', phys: 'x4.0', sofra: 'x4.0',
    desc: `What standard armies aim for in their regular soldiers, and where most professional combat teams operate. Sofra starts to feel like a natural extension of the body. Constructs become possible. Physical enhancement starts to matter in a fight.`,
    cost: `Heavy output flattens decision-making for hours after. Tactics turn blunt and predictable.`,
    ceiling: `Output tracks focus. Severe pain or sensory overload drops them to Tier 2 or 3.`,
    counter: `A real shock to who they believe they are makes their power visibly fluctuate.` },
  { n: 5, name: 'Harmonized', rarity: '1 in 1,000', level: '6,000–10,000', phys: 'x6.0', sofra: 'x5.0',
    desc: `Combat veterans and elite-unit candidates. Signature techniques begin to emerge, and Sofra feels like part of the user, not a tool. The first signs of a Spirit Form can appear at the top of this tier.`,
    cost: `Their hands shake for hours afterward. Pushing again without recovery adds up.`,
    ceiling: `Specialization narrows. Deep training in one direction leaves the neighbors undeveloped.`,
    counter: `Repetition leaves grooves in their Sofra. Read the grooves and you can predict them.` },
  { n: 6, name: 'Pre-Breakthrough', rarity: '1 in 10,000', level: '10,000–20,000', phys: 'x6.0*', sofra: 'x8.0',
    desc: `The entry requirement for most elite units. Sofra and Sopher begin forming a dual alignment, and the body hasn't caught up yet, so the physical multiplier stays at Tier 5 through the transition.`,
    cost: `The transition is unstable. Output can spike or collapse without warning, and forcing it risks corruption.`,
    ceiling: `It can't be rushed. Forcing the pace does lasting structural damage.`,
    counter: `Drag them into a long fight and the pressure pushes them past the transition's pace.` },
  { n: 7, name: 'Dual Soul', rarity: '1 in 50,000', level: '20,000–50,000', phys: 'x10', sofra: 'x12',
    desc: `The dual alignment has stabilized, and the body surges ahead of every tier before it. The minimum for the Elite Six. Demigods begin here.`,
    cost: `Holding Tier 7 taxes the Sopher itself. Long campaigns age the user faster.`,
    ceiling: `Brief peaks are fine. Days of sustained dual flow are not.`,
    counter: `Rare, specialized attacks on the Sopher-Sofra alignment can collapse it for a time.` },
  { n: 8, name: 'Sovereign Flow', rarity: '1 in 100,000', level: '50,000–100,000', phys: 'x15', sofra: 'x15',
    desc: `Sofra and Sopher are fully integrated. Most of the Elite Six sit here or at Tier 9. Those with the potential manifest a Spirit Form: wings, elemental armor, halos, living weapons.`,
    cost: `Sofra has begun reshaping their body and personality for good. They've become their power.`,
    ceiling: `Specialization is locked. New directions are extremely hard.`,
    counter: `Targeted Sopher attacks at the integrated layer bypass normal defenses.` },
  { n: 9, name: 'Absolute Echo', rarity: '1 in 1,000,000', level: '100,000+', phys: 'x30', sofra: 'x30',
    desc: `Approaching Absolute-level expression. The world reacts to them without being asked: weather responds, gravity bends slightly, ambient Sofra stirs when they enter a room.`,
    cost: `Never fully off. Their Sofra radiates whether they want it to or not.`,
    ceiling: `Most will never reach Tier 10, whatever they do. The ceiling is structural.`,
    counter: `Instability among the Absolutes ripples through them as structural shocks.` },
  { n: 10, name: 'Destiny Manifest', rarity: '1 in 10,000,000', level: 'Immeasurable', phys: 'x50', sofra: 'x50',
    desc: `A myth. The threshold between mortal Sofra and something near the Absolutes, with one known record of a mortal reaching it. It can't be trained toward, and the world around it is constantly transformed. {{Arah touches it, briefly, in the final arc. Holding it would cost him what makes him Arah.}}`,
    cost: `It threatens the user's humanity. At this scale Sofra starts overwriting the person, not through corruption but through sheer size.`,
    ceiling: `It can't be maintained. Holding it accelerates the dissolving of the self.`,
    counter: `Unknown. No consistent data exists.` },
]

// ── The seven categories ──
export const CATEGORIES: Topic[] = [
  {
    key: 'artifacters', name: 'Artifacters', eyebrow: 'CATEGORY I', hook: 'Imbue the inert. A cracked sword stays cracked.', color: '#fbbf24', rgb: '251,191,36',
    desc: `Artifacters imbue non-living objects with Sofra. They never change an object's physical structure, only the Sofra layered on top of it: a cracked sword stays cracked, a wall stays the same size. They can't work with living things. That's the hard wall between them and the Enhancers. The Primidians produce the most Artifacters, which fits their culture of engineering.`,
    sections: [
      { title: 'THREE PATHS (NOT A LADDER)', items: [
        `Passive: always on, no conditions. The most common way in.`,
        `Triggered: activates under conditions the Artifacter sets. A wall that turns impenetrable only when Sofra hits it.`,
        `Relational: responds to one specific Sopher signature. High-tier work. {{The Faren earrings sit at the threshold of this type.}}`,
      ] },
      { title: 'FORBIDDEN AND LOST', items: [
        `Forbidden: Trammel. Bonding an object to someone's Sopher without their knowledge. What's done to the object reaches the person.`,
        `Lost arts: Genesis (an object that sustains its own Sofra field), Prescience (conditions that read intent), and Communion (a true Sopher bond, reached willingly by both sides: Trammel's mirror, with the opposite ethics).`,
      ] },
    ],
  },
  {
    key: 'enhancers', name: 'Enhancers', eyebrow: 'CATEGORY II', hook: 'Turn up the volume. Never change the channel.', color: '#4fc3f7', rgb: '79,195,247',
    desc: `Enhancers amplify what already exists: their own body, another living being's abilities, or forces already in motion. They can work with living things, but they can't change what something fundamentally is. They can boost a Healer's output. They can't give anyone an ability their Sopher doesn't support, or make someone bend who lacks the catalyst.`,
    sections: [
      { title: 'TWO PATHS', items: [
        `Self-Imbuing: speed, strength, durability, senses and output, all directed inward. Arah's momentum chains are a Self-Imbuing specialty.`,
        `Other-Imbuing: boosting another living being. It drains the Enhancer, takes sustained focus, and destabilizes a receiver who leans on it too much. Armies treat Enhancers as finite force multipliers.`,
      ] },
      { title: 'FORBIDDEN AND LOST', items: [
        `Forbidden: Forced Other-Imbuing, overloading an unwilling target's Sofra until it corrupts.`,
        `Lost art: Space Convergence. Self-amplification pushed so far it compresses space itself, pulling force, objects and people toward a single point. {{Oris Faren.}}`,
      ] },
    ],
  },
  {
    key: 'healers', name: 'Healers', eyebrow: 'CATEGORY III', hook: 'Restore what was damaged. Cleanse what does not belong.', color: '#4ade80', rgb: '74,222,128',
    desc: `Healers work directly with the Sopher and Sofra of living things. They're the most morally constrained category, because their domain naturally pulls them toward preservation. "Support" is a role, not a category: Healers fill it by healing, Enhancers by amplifying, Conjurers with shields, Artifacters with gear.`,
    sections: [
      { title: 'TWO PATHS', items: [
        `Restoration: returning damaged systems to how they were. Injuries, Sopher damage, nerves, Sofra channels.`,
        `Cleansing: removing what doesn't belong. Corruption at every stage, hostile foreign Sofra, toxins, contaminated Sopher. Disease sits here at the highest tiers.`,
      ] },
      { title: 'THE UNINSULATED RISK', items: [
        `Proper Cleansing training builds insulation first, so corruption passes through and out of the patient without touching the healer. Self-taught healers often skip it and pull corruption through themselves. The technique works. The damage builds up in the healer. {{Mallory never learned the insulation.}}`,
      ] },
    ],
  },
  {
    key: 'illusionists', name: 'Illusionists', eyebrow: 'CATEGORY IV', hook: 'Work on the mind. Never on the world.', color: '#a78bfa', rgb: '167,139,250',
    desc: `Illusionists manipulate perception and consciousness. Physical reality is never affected. They're the most psychologically taxing category, and the most punishing of an unsteady mind: panic, exhaustion or emotional compromise collapses their precision across every layer.`,
    sections: [
      { title: 'THREE LAYERS', items: [
        `Sensory: what the target perceives right now. Projection adds false input and concealment removes real input. It costs more the bigger the scale and the more senses involved.`,
        `Cognitive: how the target processes and remembers. Suggestion, false impressions, fragmented memory. Strong Sopher resists it, and it's costly even at low tier.`,
        `Psychological: emotion and instinct directly, like fear, calm or paralysis. It needs a tuning-in period first, and the Illusionist's own stability must be airtight.`,
      ] },
      { title: 'FORBIDDEN AND LOST', items: [
        `Forbidden: Memory Rewriting. Permanently erasing or replacing what someone remembers, at the Sopher level.`,
        `Lost art: Space Fracturing. Sensory work pushed until it tore real space. {{Saint Fracture.}}`,
      ] },
    ],
  },
  {
    key: 'conjurers', name: 'Conjurers', eyebrow: 'CATEGORY V', hook: 'Make something from nothing. It will have no will of its own.', color: '#f97316', rgb: '249,115,22',
    desc: `Conjurers manifest non-living constructs out of Sofra. They create rather than amplify, and everything they make is inert: no will, no independent action. How much punishment a construct can take depends on the tier gap between maker and attacker.`,
    sections: [
      { title: 'TWO PATHS', items: [
        `Constructs: shaped, stable Sofra. Weapons, barriers, shields, platforms, structures. They need sustained Sofra, can be repositioned while active, and dissolve when concentration drops.`,
        `Releases: force expelled all at once. Blasts, shockwaves, pressure waves. No upkeep. One shot, one effect, gone.`,
      ] },
    ],
  },
  {
    key: 'prime', name: 'Prime', eyebrow: 'CATEGORY VI', hook: 'Abilities the world has no name for yet.', color: '#e9d5ff', rgb: '233,213,255',
    desc: `Prime users have Sofra that doesn't fit any existing domain. Every domain was once this: one person doing something the world had no word for. There are no subgroups, because every Prime user is genuinely different. Summoners, who call living creatures into partnership, currently sit here. The Gray Assembly uses the label for anyone it can't map at assessment. It isn't permanent. If enough people with similar abilities appear, a new domain can be recognized.`,
    sections: [],
  },
  {
    key: 'benders', name: 'Benders', eyebrow: 'THE LOST CATEGORY', hook: 'Considered a fable. It is not.', color: '#7ecef4', rgb: '126,206,244',
    stats: [
      { v: '~5%', l: 'Carry the dormant gene' },
      { v: 'Tier 3+', l: 'To bend' },
      { v: 'Catalyst', l: 'Required' },
    ],
    desc: `The lost seventh category. Unlike the other six, bending isn't decided by Sopher at awakening. It takes a biological catalyst gene that bridges the user's Sofra and a physical element, since elements have no Sopher of their own. Without the catalyst, no amount of training produces bending. Most of the world believes bending is an extinct fable. Bending is efficient and environmental, cheaper per output than raw Sofra, and the best fighters combine the two.`,
    sections: [
      { title: 'WHO CAN BEND', items: [
        `The catalyst gene. About 5% of people carry it dormant, and most never know.`,
        `Tier 3 at least, Tier 4 or higher to be good at it. Below Tier 3 only unconscious flickers happen.`,
        `Deliberate training, to understand the element and build technique. {{Varel Shyre and Kaisho bend today. Varel inherited the catalyst. Kaisho's was implanted through illegal experimentation, and his body pays for it.}}`,
      ] },
    ],
  },
]

// ── Bending ──
export const BENDING_PATHS = [
  { base: 'Hydrobending', evolved: 'Cryobending', note: 'Water to ice and cold. Extinct for 4,000+ years until its modern return.', baseCost: 'Joint and fluid strain', evolvedCost: 'Cold burn, skin damage, scarring', color: '#7ecef4', rgb: '126,206,244' },
  { base: 'Pyrobending', evolved: 'Electrobending', note: 'Fire to plasma and lightning.', baseCost: 'Overheating, internal burns', evolvedCost: 'Neural overload. Short bursts only.', color: '#facc15', rgb: '250,204,21' },
  { base: 'Geobending', evolved: 'Florabending', note: 'Earth to living earth. The hardest evolution.', baseCost: 'Muscle and bone strain', evolvedCost: 'Draws on Sopher as well as Sofra', color: '#4ade80', rgb: '74,222,128' },
  { base: 'Aerobending', evolved: 'Sonobending', note: 'Air to sound and resonance.', baseCost: 'Total-body nerve fatigue', evolvedCost: 'Sensory overload, internal vibration damage', color: '#c4b5fd', rgb: '196,181,253' },
]

export const BENDING_STAGES = [
  { n: 0, name: 'Latent', d: 'Genetic potential only.' },
  { n: 1, name: 'Sensitivity', d: `Sensing the element's presence.` },
  { n: 2, name: 'Influence', d: 'Unconscious shifts. Frost appears.' },
  { n: 3, name: 'Basic Control', d: 'Minor deliberate techniques.' },
  { n: 4, name: 'Combat', d: 'Battlefield-level skill.' },
  { n: 5, name: 'Flow State', d: 'Rare moments where it feels effortless.' },
  { n: 6, name: 'Mastery', d: 'Elite techniques, large constructs.' },
  { n: 7, name: 'Transcendent', d: 'The element behaves as if it has a mind.' },
]

export const BENDING_TOPICS: Topic[] = [
  {
    key: 'evolution', name: 'Evolution and the Trade', eyebrow: 'BENDING', hook: 'To reach the evolved form, you give up the base form forever.', color: '#7ecef4', rgb: '126,206,244',
    desc: `Evolved forms aren't unlocked by mastery alone. They're discovered and chosen. Every one was first reached by a bender who happened to line up all the right conditions, and even with a teacher pointing the way, most never get there. When it happens, it's a trade: the base form is gone, permanently. {{Varel Shyre mastered Hydrobending, chose Cryobending, and can never hydrobend again. Arah never had Hydrobending at all. He started at the destination without the journey.}}`,
    sections: [
      { title: 'ALL FIVE, OR NOTHING', items: [
        `Conscious choice: you have to pursue it. Evolution never happens by accident.`,
        `Sopher compatibility: present or not. It can't be trained.`,
        `Personal compatibility: your nature has to fit what the element is at its core.`,
        `Experiential understanding: you have to feel the element's essence, not just know it.`,
        `Significant loss: the element won't accept the surrender of your base form from someone who has never lost something irreplaceable.`,
      ] },
      { title: 'THE FLORA EXCEPTION', items: [
        `Flora is the only evolution that crosses from dead matter into living matter, so it needs a sixth condition: a living, Sopher-bearing plant or ecosystem has to recognize the bender and accept them, in a moment of offering, not command. It's the one evolution that can't be done alone. The Dormose, who believe they are of the earth and do not own it, are built for it.`,
      ] },
    ],
  },
  {
    key: 'awakenings', name: 'Two Awakenings', eyebrow: 'BENDING', hook: 'Bending has died once and come back once.', color: '#93c5fd', rgb: '147,197,253',
    desc: `Bending has had two great awakenings. The first was among the Solarii of Sol'Vastara, more than 4,000 years ago, where Cryobending grew as a natural expression of their people. When their civilization collapsed, the tradition died with them, and for thousands of years bending simply didn't exist. The second came 300 to 500 years ago, through a girl remembered only as the First Bender. {{She was a Farrow-Regalus hybrid, experimented on by Torn scientists in a project that killed 999 of every 1,000 subjects. She was the only one who survived, and the catalyst they engineered in her became the gene every natural bender carries. She is a Monolith, though the public record hides it. The Solarii's Cryobending was cultivated among them by Auren himself, and modern Cryobending still runs on his frequency, the same one the River of Echoes is tuned to. Arah stands where the two awakenings meet: the catalyst through his Farrow mother, and the craft Auren built.}}`,
    sections: [],
  },
]

// ── Corruption ──
export const CORRUPTION_STAGES = [
  { n: 1, name: 'Flicker', reversible: 'Easily treated', d: `Seconds-long losses of control, small aura distortions, techniques that misfire or overperform. Lumini flies flee or turn gray. Oracles see it at once. Strong users often explain it away as fatigue, until it's too late.` },
  { n: 2, name: 'Echo Distortion', reversible: 'Treatable, at a cost', d: `Black cracks in the aura, visual distortion around the user, personality shifts, nightmares of their own corrupted self. Ordinary people feel a wrongness nearby. Animals avoid them.` },
  { n: 3, name: 'Full Corruption', reversible: 'Impossible', d: `The person is gone. What remains is corrupted Sofra in a body, driven by primal hunger, attacking anything alive, beyond any standard tier. The only answer is a mercy kill.` },
]

export const CORRUPTION_TOPICS: Topic[] = [
  {
    key: 'rules', name: 'The Three Rules', eyebrow: 'CORRUPTION', hook: 'What makes corruption genuinely dangerous.', color: '#ef4444', rgb: '239,68,68',
    desc: `Corruption is Sofra that has lost its structural integrity: power without the Sopher foundation to hold it. Nothing about it is demonic, and nobody is being punished. It comes from overuse, forced progress, forcing incompatible techniques, long exposure to corrupted places, failed fusions, and sometimes something subtler working on people from outside.`,
    sections: [
      { title: 'PURIFICATION LEAVES A MARK', items: [
        `After Stage 2: weeks or months of heightened sensitivity, so the next exposure hits faster.`,
        `After a near-Stage 3 save: a permanently lower Sofra ceiling, a window where re-corruption comes easily, and possibly real memory loss.`,
      ] },
      { title: 'STRESS ACCELERATES IT', items: [
        `Stage 1 to Stage 2 normally takes days to weeks. Under sustained combat, hours. A fighter who notices the first signs and keeps fighting is gambling.`,
      ] },
      { title: 'CURES ARE A RESOURCE PROBLEM', items: [
        `Sacred sites like the River of Echoes are the best cure, and they don't move. In wartime they're out of reach.`,
        `Oracle rituals work once a month, and cost the Oracle years of life.`,
        `{{Compassion Sofra has no institutional backup. If Mallory is absent, exhausted or dead, it simply doesn't exist.}}`,
      ] },
    ],
  },
  {
    key: 'purification', name: 'Purification', eyebrow: 'CORRUPTION', hook: 'Four ways to fight it back, none of them free.', color: '#4ade80', rgb: '74,222,128',
    desc: `Stage 1 and 2 can be treated. Stage 3 can't: there's no one left to save.`,
    sections: [
      { title: 'THE METHODS', items: [
        `Sacred site immersion: about 95% success at Stages 1 and 2. The best option, if you can get there.`,
        `Oracle ritual: about 90%. The Oracle loses years of life, and it's limited to once a month.`,
        `Compassion Sofra: about 80%. The healer takes the corruption on, temporarily, and risks it herself. {{Mallory is the only one known who can reach cases on the edge of Stage 3.}}`,
        `{{Arah's Ice Halt: freezes the spread completely, but doesn't cure it. It buys time, drains him heavily, and can't stop his own.}}`,
      ] },
    ],
  },
  {
    key: 'creatures', name: 'Corruption Creatures', eyebrow: 'CORRUPTION', hook: 'A corrupted wolf is still a wolf. Just wrong.', color: '#b91c1c', rgb: '185,28,28',
    desc: `Corruption reaches wildlife first. Any animal can turn with enough exposure: a corrupted wolf is still recognizably a wolf, wrong in specific ways. Stage 1 creatures are common enough that local soldiers handle them routinely. Stage 2 needs several skilled fighters or one Tier 6 user. Stage 3 needs several Elite Six members with support, because they spawn corruption zones and lesser creatures around themselves. Guardians and constructs, like the Cryos Wards of the Glacial Choir, are a separate thing entirely: built, not corrupted.`,
    sections: [
      { title: 'NAMED THREATS', items: [
        `Hollow Choir descendants (Stage 2): Bonespire Forest.`,
        `Icebound Revenants (Stage 2): failed Frostwarden undead in the Frozen Wastes.`,
        `Maw-Tide Lurkers (Stage 2): the Maw Depths, under the sea.`,
        `The Frostgnaw Leviathan (Stage 3): an ice-domain user who fully corrupted, possibly thousands of years ago.`,
        `The Ember Wraith (Stage 3): living flame, in Emberfell.`,
      ] },
    ],
  },
]

// ── Beyond the tiers ──
export const BEYOND: Topic[] = [
  {
    key: 'monoliths', name: 'Monoliths', eyebrow: 'CLASSIFICATION', hook: 'One of a kind, and able to rival a demigod.', color: '#e2e8f0', rgb: '226,232,240',
    desc: `A public, formal classification taught in school history: individuals whose singular Sofra-born technique or creation is their mark on the world, with power that can rival a demigod's. Only a handful exist in recorded memory. Sovren is a living, publicly acknowledged one, a FeyVey and Regalus hybrid who forced recognition out of institutions that spent his career denying him. A deviation alone doesn't make a Monolith. {{Two more are hidden. The First Bender was one, and the public record doesn't say so. Oris Faren qualifies too, for Space Convergence, and would be classified if anyone knew he was alive.}}`,
    sections: [],
  },
  {
    key: 'demigods', name: 'Demigods', eyebrow: 'CLASSIFICATION', hook: 'Born of an Absolute. Celebrated, feared, and marked.', color: '#f59e0b', rgb: '245,158,11',
    desc: `Direct descendants of an Absolute, born with enormous potential: their breakthroughs start at Tier 7, and they live much longer than mortals. Many treat them like celebrities, and governments fear and control them. The divine line thins with every generation that mixes with mortal blood, until by two or three generations out it barely shows.`,
    sections: [
      { title: 'SUPPRESSION MARKS', items: [
        `Under the World Council's Demi-God Containment Laws, demigods carry engineered marks that cap the Sofra they can express. The mark caps output, never the ceiling: a marked demigod may look Tier 4 or 5 while holding Tier 7 potential.`,
        `The laws are recent. Demigods born before them were never marked.`,
      ] },
    ],
  },
  {
    key: 'lostarts', name: 'Lost Art Deviations', eyebrow: 'CLASSIFICATION', hook: 'A category pushed so far it became something else.', color: '#a855f7', rgb: '168,85,247',
    desc: `Every user has a root category, always. But at extreme tiers, a handful of people across history have pushed one so far that their Sofra became something the system has no name for. They're called lost arts because almost no one reaches them, fewer document them, and most who develop one don't fully understand what they've done. Two users who reach the same deviation from different roots express it completely differently. A deviation doesn't make someone a Monolith.`,
    sections: [
      { title: 'KNOWN DEVIATIONS', items: [
        `Space Fracturing, from Illusion: breaking space as a weapon. {{Saint Fracture.}}`,
        `Space Convergence, from Enhancement: compressing space toward a point, shaping it like a language. {{Oris Faren.}}`,
        `Time: historical and unnamed. Possibly tied to the Oracles.`,
      ] },
    ],
  },
  {
    key: 'spirit', name: 'Spirit Forms', eyebrow: 'TIER 8 AND ABOVE', hook: 'Sofra made visible, and almost alive.', color: '#7dd3fc', rgb: '125,211,252',
    desc: `At Tier 8 and above, some users manifest their Sofra as a visible, semi-tangible presence. Not everyone does. It can be wings for those who can fly, elemental armor like a fire cloak or ice plate, halos and tendrils, or weapons that feel half-alive. {{Arah's grows from a frozen shoulder-light at Tier 6 into ice-aurora wings, and finally a full Frost-Phoenix Mare. Mallory's Guardian Bloom, glowing petal armor, appears only once.}}`,
    sections: [],
  },
  {
    key: 'sova', name: 'Sova', eyebrow: 'SPIRIT COMPANIONS', hook: 'They choose you.', color: '#fde68a', rgb: '253,230,138',
    desc: `Spirit companions in animal form, every kind and personality, who live in a realm called Sovara and travel between worlds. You have to be awakened to see one, and a Sova can hide from anyone it chooses, except its master. The Sova chooses its person, by fit of Sofra and character, and its animal reflects something true about them that they may not see yet. The bond is a contract. When the master dies, the Sova chooses to return home or die with them. In rare cases it stays, bound to the master's children or to unfinished business.`,
    sections: [
      { title: 'SOVARA', items: [
        `Tended daily by several Absolutes, mainly Serena, Father and the twins. {{The Old Corrupted Gods won't go there. An Absolute is usually near, a threatened Sova can call one, and the fighter Sova would bury an intruder in numbers.}}`,
      ] },
    ],
  },
  {
    key: 'actus', name: 'Actus Ultimus', eyebrow: 'THE FORBIDDEN LAST RITE', hook: 'One enormous final output, and then death.', color: '#dc2626', rgb: '220,38,38',
    desc: `A lost, forbidden technique, unknown to almost everyone alive. The user empties their Sofra completely, then deliberately draws on their Sopher and forces maximum output, burning their life at a catastrophic rate. Done perfectly, it ends in one enormous final output and death. Done imperfectly, which is almost always, it throws the user into Stage 2 corruption almost instantly. The scrolls exist because improvised attempts fail. {{They were engineered under corrupt Torn leadership, and they're hidden at the Shaleh-Kai Enclave beside the First Bender's records.}}`,
    sections: [
      { title: 'THE ONE WHO USES IT', items: [
        `{{Arah finds a reference to it in the Chronoscript Archive. He doesn't know his father read the same passage during his years in hiding.}}`,
        `{{In Book 6, facing a foe no one else can handle, Oris uses it. Arah recognizes what's happening and can't stop it. Their eyes meet. Oris is at peace. That's the goodbye.}}`,
      ] },
    ],
  },
  {
    key: 'forbidden', name: 'Forbidden Techniques', eyebrow: 'OUTLAWED', hook: 'Some things are banned because of what they cost. Others because of who pays.', color: '#f87171', rgb: '248,113,113',
    desc: `A technique is forbidden when it carries high corruption risk, works on a living being against their will, demands sacrificing part of the self, tampers with dimensions, or steals Sopher. Several categories have one forbidden art of their own.`,
    sections: [
      { title: 'THE LIST', items: [
        `Blood Bending: moving the water in a living person's blood. Lasting Sopher damage in the victim, high corruption risk for the bender.`,
        `Soul Shatter: fracturing someone's Sopher signature directly. Their Sofra never fully recovers. Mostly theoretical.`,
        `Life Drain: absorbing someone else's Sofra to extend your life or refill your reserves. {{Varek Voss used a modified version.}}`,
        `Forced Other-Imbuing, Trammel and Memory Rewriting: the forbidden arts of the Enhancers, Artifacters and Illusionists.`,
        `Forbidden Summoning: calling up the undead, corruption beasts, or things no creature classification covers.`,
        `Forbidden Life Extension: Sopher-based life extension, outlawed by the World Council after the Dark Age of Experimentation. {{Yureth performed it on Oris before his faked execution. The Proctor keeps himself alive with his own version.}}`,
      ] },
    ],
  },
  {
    key: 'aura', name: 'Aura Reading', eyebrow: 'PERCEPTION', hook: 'Seeing someone\'s Sofra, and everything it gives away.', color: '#93c5fd', rgb: '147,197,253',
    desc: `Perceiving another person's Sofra signature visually. Tier 5 users can do it at a basic level, Porish-domain users at an advanced one, and Oracles at a master's. It usually needs line of sight, advanced users can block it, and holding it costs focus.`,
    sections: [
      { title: 'WHAT IT SHOWS', items: [
        `Rough tier, category and domain, read in color and pattern.`,
        `State: stable, strained, depleted or corrupted. Corruption shows as gray and black distortion.`,
        `Lies: an aura stutters when its owner is actively lying. Hostile intent feels sharp and directional.`,
      ] },
    ],
  },
  {
    key: 'wells', name: 'Prism Wells and Echo Wells', eyebrow: 'HIGH-ENERGY ZONES', hook: 'Places so soaked in Sofra the land itself changed.', color: '#c084fc', rgb: '192,132,252',
    desc: `Only living things carry Sopher, so these places aren't alive with it. They're saturated with ambient Sofra, so concentrated it has permanently altered the environment. Great battles between high-tier users make them. So do large experiments, direct Absolute influence, and long habitation by extremely powerful people. Echo Wells are old battlefields and experiment sites where Sofra sank into the ground and still radiates out.`,
    sections: [
      { title: 'THE RISK', items: [
        `A Prism Well gives a real Sofra boost, and it's temporary. Stay too long and the body can't integrate that much ambient Sofra. Living near an Echo Well is a recognized cause of corruption.`,
        `Luminant Wardens, crystal-furred quadrupeds that refract Sofra, guard the Prism Wells. The Elite Six sometimes patrol with them.`,
      ] },
    ],
  },
  {
    key: 'twocats', name: 'Two Categories', eyebrow: 'THE EXCEPTION', hook: 'One person, one category. Almost always.', color: '#e879f9', rgb: '232,121,249',
    desc: `Normally a person has exactly one category, and it's revealed at awakening, not chosen. There are two exceptions. Failed fusions and forbidden experiments have grafted more than one Sopher orientation onto a single subject. Most don't survive, and the few who do are unstable. {{The other is a demigod line carrying the Farrow catalyst. The diluted divine heritage lets bending live alongside another category. Arah is the example: an Enhancer and a Cryobender at once. It's never free. The two systems grind against each other for the rest of his life, and he manages it. He never solves it.}}`,
    sections: [],
  },
]

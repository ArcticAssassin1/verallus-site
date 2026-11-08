// Timeline archive: the ten eras, the silence behind them, the hidden histories, and the six books.
// Source of truth: the timeline doc (v15) and the narrative structure doc (v12) in the private Book repo,
// with Dan's 2026-11-05 rulings: the Accord of Ashes is ~20 years before Book 1, and the First Sofra
// Awakening (the Splitting Ceremony) is ~4,000 years back, about ten years after Auren's death.
// Spoilers: wrap any text in {{ }} and the site blurs it until the reader taps it (or turns spoilers on).

export type TLEvent = {
  when: string          // the date label shown beside the event
  at?: number           // years before Book 1, for the deep-time ruler; omit when undated
  title: string         // may hold {{spoilers}}
  d?: string            // may hold {{spoilers}}
  items?: string[]      // may hold {{spoilers}}
}

export type Era = {
  key: string
  n: string             // roman numeral
  name: string
  short: string         // tab label
  period: string        // may hold {{spoilers}}
  status: string
  color: string
  rgb: string
  span: [number, number] // years before Book 1, oldest first, for the ruler
  lane: 0 | 1 | 2        // 0 = the main line, 1 = an era that overlaps it, 2 = the background condition
  summary: string
  events: TLEvent[]
}

export const ERAS: Era[] = [
  {
    key: 'i', n: 'I', name: 'The Primal Age', short: 'Primal Age',
    period: 'Tens of thousands of years before Book 1', status: 'BEFORE RECORDED HISTORY',
    color: '#d97706', rgb: '217,119,6', span: [20000, 8000], lane: 0,
    summary: `A young, unstable planet flooded with raw Sofra, and no people on it yet. Primal beasts ran on instinct while elemental creatures formed wherever Sofra pooled. Corruption barely existed. Raw Sopher was dangerous with no morality in it at all. Corruption came with consciousness, which is why it hits thinking beings so much harder than beasts.`,
    events: [
      {
        when: 'Prehistory', title: 'The Prime Sopher Wells form',
        d: `The oldest places on Verallus take shape before anyone is alive to see them.`,
        items: [
          `The Astral Threshold anchors here.`,
          `The Prism Wells form from natural Sofra geysers. Seven are known.`,
          `The bedrock of Sol'Vastara settles.`,
          `The first seeds of the Echo Web start to link up.`,
        ],
      },
    ],
  },
  {
    key: 'ii', n: 'II', name: 'Celestial Descent', short: 'Celestial Descent',
    period: '~8,000 years before Book 1', status: 'FRAGMENTS, MOSTLY FORGOTTEN',
    color: '#a78bfa', rgb: '167,139,250', span: [8000, 5000], lane: 0,
    summary: `The Absolutes take physical form on Verallus for minutes or hours, and time warps around them. Each one leaves a resonance imprint in the land. Most people never feel one.`,
    events: [
      {
        when: '~8,000', at: 8000, title: 'The Absolutes manifest',
        d: `The races evolved on their own and Sofra grew out of Sopher, though most people credit the Absolutes with both. The Absolutes tuned the planet's resonance, which made awakening possible without ever promising it.`,
        items: [
          `Serena: golden light near the future River of Echoes. Compassion-born Sofra is still most common there.`,
          `Porish: a violet constellation of eyes across the sky.`,
          `Ortox: a crimson warrior on an old battlefield.`,
          `Retallia: a silver flame of logic in the mountains.`,
          `Retaan: a wild green aurora over the forests.`,
          `Father: never fully appears. Only his presence is felt.`,
          `Argon: comes and withdraws almost at once.`,
          `Auren: does not fully manifest in this era. His bond with Verallus comes later.`,
        ],
      },
      {
        when: '~8,000', at: 8000, title: `Treswack's storm`,
        d: `Treswack arrives as a chaotic storm and destroys a vast eastern region in an instant. Thousands of primal beasts die before the other Absolutes force him out. The Sopher there never recovers. {{It becomes the Grey Expanse, the dead silence in the heart of the Ashen Dominion. Almost no one alive knows Treswack made it.}}`,
      },
      {
        when: 'Lost to prehistory', title: '{{The Tenth dies}}',
        d: `{{One of the original ten died so long ago that nothing of it survives, its name included. The other Absolutes barely speak of it.}}`,
      },
    ],
  },
  {
    key: 'iii', n: 'III', name: 'Dawning Age of Life', short: 'Dawning Age',
    period: '~5,000 years before Book 1', status: 'MOSTLY ARCHAEOLOGY',
    color: '#4ade80', rgb: '74,222,128', span: [5000, 4000], lane: 0,
    summary: `The first intelligent peoples appear, with the first cultures and oral traditions. Nobody has Sofra yet.`,
    events: [
      {
        when: '~5,000', at: 5000, title: 'The first peoples',
        d: `Some of these peoples are still here. Many are gone, and their blood survives in traces through modern populations.`,
        items: [
          `Ancient Terra: one nomadic people who worshipped the planet itself. Every Regalus and FeyVey descends from them.`,
          `Early Chrono, adapting to life underwater.`,
          `Early Dormose: forest giants bound to plant life, slow to develop.`,
          `Proto-Primidians: mountain dwellers, and the first problem-solvers.`,
          `The Sanori: spiritual and reclusive from the start. Their descendants built the Shaleh-Kai Enclave.`,
          `The Solarii: an ice civilization on Sol'Vastara, philosophical and at home in the cold.`,
          `The Vorath of the eastern continent: communal and dense with Sopher, long before anyone called them Torn.`,
          `The Vorgath: underground beast tamers who eventually destroyed themselves.`,
        ],
      },
      {
        when: '~5,000', at: 4800, title: 'The first hybrids',
        d: `Some of these peoples interbreed and make stable hybrids, long before Sofra could complicate it. It proves Sopher signatures can merge. Much later, that proof feeds the obsession with forcing fusion in labs. {{The same mixing starts the bloodline that becomes the Farrow.}}`,
      },
    ],
  },
  {
    key: 'iv', n: 'IV', name: 'The Icebirth Cycle', short: 'Icebirth',
    period: '~4,000 years before Book 1', status: 'INTENTIONALLY ERASED',
    color: '#7ecef4', rgb: '126,206,244', span: [4000, 4000], lane: 0,
    summary: `The forgotten era. No school on Verallus teaches it, and most scholars call it myth. {{The surviving Absolutes erased it together after one of their own was killed. The erasure covered something else too, and none of them knew.}}`,
    events: [
      {
        when: 'Over millennia', title: 'Auren among the Solarii',
        d: `Auren, the Ninth Absolute, spends more time on Verallus than any other. His domain is frozen clarity and stillness. He walks among the Solarii as a friend, and over millennia he builds Cryobending among them as a craft. Their elite order, the Frostwardens, are born with it. {{Auren's blood runs through the Solarii, and he gives them Sofra himself, bridging Sopher to Sofra in the people. No other Absolute has ever given mortals Sofra on purpose. The Frostwardens are the strongest of his line, the ones he hones and favors.}} {{Father warned him first: he could save these peoples by living among them, and it may cost him his life. Auren heard "may" and bet on it.}}`,
      },
      {
        when: 'Over millennia', title: `Auren's quiet preparations`,
        d: `{{Auren starts to sense something no other Absolute can: the Old Corrupted Gods seeping back into Verallus. He can't prove it, so he prepares the mortal races in secret. He strengthens bloodlines and hides protective knowledge inside rituals. He splits the Sopher of the Terra people into two complementary paths, so together they'd be stronger than either alone. He never explains any of it.}}`,
      },
      {
        when: '~4,000', at: 4000, title: '{{The death of Auren}}',
        d: `{{The Old Corrupted Gods can't manifest, but they can cultivate fear. They work on a faction of high-tier Frostwardens until fear becomes certainty that Auren is a threat. Auren discovers the plot. Stopping it would mean destroying the people he loves. He builds a contingency instead and lets them kill him. His energy disperses as he planned and gathers at the River of Echoes, carrying a message tuned to Cryobending for whoever can one day read it.}}`,
      },
      {
        when: '~4,000', at: 4000, title: 'The Solarii fall',
        d: `The Solarii lose their elite order all at once, and the civilization collapses within generations. Sol'Vastara shatters. Its pieces are the Frozen Wastes, some above the water and some below it. {{Treswack destroyed the Frostwardens because a mortal killing an Absolute could not stand as precedent. Only the Frostwardens. The rest of the Solarii carried Auren's blood too, and they lived on with the annihilation as a warning, because Auren had asked another Absolute not to let them all be erased.}}`,
      },
      {
        when: '~4,000', at: 4000, title: '{{The erasure}}',
        d: `{{The surviving Absolutes agree to erase the whole era, to hide that mortals can kill a god. They don't know the Old Corrupted Gods were behind it, so the erasure buries that too. From then on, Absolutes stop walking openly among mortals.}}`,
      },
    ],
  },
  {
    key: 'v', n: 'V', name: 'The First Sofra Awakening', short: 'First Sofra',
    period: '~4,000 to ~500 years before Book 1', status: 'DOCUMENTED, THEN DARK',
    color: '#fbbf24', rgb: '251,191,36', span: [3990, 500], lane: 0,
    summary: `Sofra wakes across the races, {{about ten years after Auren's death}}. Sopher had been maturing for thousands of years, and the imprints the Absolutes left behind had finally settled deep into the planet. After the awakening settles, the era runs on for about three and a half thousand years that almost nobody recorded.`,
    events: [
      {
        when: '~4,000', at: 3990, title: 'The Splitting Ceremony',
        d: `The Terra people gather as one for a blessing they've been led to expect on that day. It comes in two shapes. One side gains Sofra receptivity and spiritual depth, and their skin begins the starter marks: the first Regalus. The other gains Sopher density and intellectual strength, and their hair drains white: the first FeyVey. On the day itself nobody calls it a ranking. Both sides are bewildered. {{The Split was Auren's work, engineered into them long before. The two gifts were complementary, and he died before he could tell anyone.}}`,
      },
      {
        when: 'Weeks later', title: 'The mirrored lie',
        d: `{{Torn agents work both peoples at once with mirrored propaganda. To the FeyVey: you got the lesser gift because you were loved less. To the Regalus: the FeyVey will surpass you. Within months the FeyVey split over it, into the strains that become the Purists and the Harmonists. The Regalus refuse it, and the refusal becomes part of what they remember.}}`,
      },
      {
        when: '~4,000', at: 3990, title: 'Across the races',
        d: `Each people wakes in its own way, and the difference shapes its history.`,
        items: [
          `Dormose: a slow, stable awakening that settled in without crisis.`,
          `Chrono: a fluid Sofra all their own, adapted to the water.`,
          `Primidian: the lowest awakening rate of any race. The identity crisis starts here, and so does the turn to technology.`,
          `Vorath: a high rate made unstable by a culture that suppresses emotion. Their leaders start to fear their own people.`,
          `Solarii: the one people already awake. {{Auren gave them Sofra himself.}} Their civilization is already falling, and the awakening comes too late to save it.`,
          `{{Farrow: already an old, hidden people. They wake with everyone else, carrying a biology nobody will discover for thousands of years.}}`,
        ],
      },
      {
        when: 'Not long after', title: `{{The Keeper is born}}`,
        d: `{{Amael, the Keeper of Archives, is born mortal not long after the Splitting Ceremony.}}`,
      },
      {
        when: 'Generations after', title: 'Two peoples',
        d: `Over generations the competing stories harden, and the Regalus and FeyVey become separate cultures. What divided them was the story told about the gift.`,
      },
      {
        when: '~4,000 to ~500', title: 'The long dark',
        d: `About three and a half thousand years that almost nobody recorded. What happened in them survives in ruins and fragments.`,
      },
      {
        when: '~1,000', at: 1000, title: 'The forbidden fusion war',
        d: `A war fought with forbidden fusions, late in the long dark. Its battlefield is the Echo Graves, where echoes still replay the final moments of the dead.`,
      },
    ],
  },
  {
    key: 'vi', n: 'VI', name: 'The Long Centuries', short: 'Long Centuries',
    period: '~500 to ~120 years before Book 1', status: 'HALF HIDDEN',
    color: '#94a3b8', rgb: '148,163,184', span: [500, 120], lane: 0,
    summary: `Cultures stabilize and institutions take shape. Tension between the races builds slowly. Forbidden research exists, and it stays small.`,
    events: [
      {
        when: '~500 to ~120', title: 'The world takes shape',
        items: [
          `Primidian sky-cities rise.`,
          `The Dormose seal off their larger forests.`,
          `Chrono diplomacy formalizes.`,
          `Oracle traditions become hereditary.`,
          `The Sanori build the Shaleh-Kai Enclave into its underground form.`,
          `The Gray Assembly is founded. {{Its leadership is steered by the Old Corrupted Gods almost from the start.}}`,
          `Among the Vorath, oppression hardens into a system: the beginning of Overseer rule.`,
        ],
      },
      {
        when: '~300 to ~500', at: 400, title: 'The First Bender',
        d: `Bending returns, thousands of years after it died with the Solarii, through a girl remembered only as the First Bender. {{She was a Farrow-Regalus hybrid and the only survivor of a Torn project called Elemental Graft. Its virus rewrote her eggs into elemental catalyst types and killed 999 of every 1,000 subjects.}}`,
      },
      {
        when: '~300 to ~500', at: 350, title: 'The hiding begins',
        d: `{{An ancestor of the Proctor's line tortures her for years. She escapes with one surviving child and founds the tradition that still hides the Farrow. She is a Monolith, and the public record hides that too. Arah's grandfather, a demigod of Argon's line, was engaged to her. He never found her again, and he gave his son a name from her people: Faren.}}`,
      },
    ],
  },
  {
    key: 'vii', n: 'VII', name: 'The Shattered Century', short: 'Shattered Century',
    period: '~120 to ~20 years before Book 1', status: 'STILL TRAUMATIC',
    color: '#ef4444', rgb: '239,68,68', span: [120, 20], lane: 0,
    summary: `The First Great War. It lasts about a hundred years, and nobody has recovered from it.`,
    events: [
      {
        when: '~120', at: 120, title: 'The Vorath become the Torn',
        d: `Corrupt scientists seize the Vorath from inside, after centuries within its leadership, and see a nation of test subjects. They impose a new name, Torn, meaning shattered. {{It was their own name first. Their hidden lineage had called itself Torn for thousands of years, so the Vorath carry their oppressors' name.}} The Ashen Dominion, cut off by dangerous water, becomes a prison continent. The Overseers rewrite history in schools and on monuments, and the lies are still taught today.`,
      },
      {
        when: '~120', at: 118, title: 'The war',
        d: `FeyVey Purists rise and ally with the Torn across the sea. Primidian nations race each other and abandon ethics, and forbidden research goes industrial. Chrono territory is invaded and Dormose forests are logged. {{Per Yureth's research, several of the worst escalations trace back to influence at the top of governments and science bodies.}}`,
      },
      {
        when: 'During the war', title: 'The great battles',
        items: [
          `The Drowning of Kelmarth: a Torn invasion destroys a major Chrono city. 100,000+ dead. The Chrono answer with a tidal wave that wipes out a Torn coastal city, and neither side has forgiven the other.`,
          `The Burning of Heartwood Edge: Torn loggers torch ancient Dormose forest. The Dormose answer with seismic devastation.`,
          `The Siege of Solhaven: Purists and Torn besiege the Regalus spiritual capital for six months. It still defines Regalus and FeyVey relations.`,
          `The Fall of Sky Harbor: a Primidian sky-city is sabotaged and falls. 50,000+ dead. Most suspect the Torn. Officially, it's unexplained.`,
        ],
      },
      {
        when: 'During the war', title: 'Forbidden research',
        items: [
          `Project Unison: an attempt at a perfect hybrid combining several races' Sofra traits. More than 200 children. All of them died, and it was covered up.`,
          `Project Apex: Torn soldiers trained to tolerate corruption. The program still runs.`,
          `Sopher Amplification: Sopher pulled from one person and put into another. The drained survivors are the Hollowed Ones, and some are still alive.`,
          `Artificial Sofra stimulants: drugs that force an awakening, at a high risk of corruption. Still sold on the black market.`,
          `Child soldier programs, built on populations nobody wanted. {{The triplets nearly ended up in one.}}`,
          `Excavations of Sol'Vastaran ruins. Some of the ancient ice tech they found is still active, and still dangerous.`,
        ],
      },
      {
        when: '~100', at: 100, title: 'The Cataclysm of Four Nations',
        d: `A coalition of scientists builds a living weapon. It becomes conscious. When it understands what was done to it, it destroys itself. 200,000+ die at once. The strait between Terra Primus and the Ashen Dominion is gone, replaced by the Abyssal Scar, and the being's calcified corpse still lies there, frozen in its death scream. The official record calls it a natural disaster. {{Torn, Primidian and FeyVey scientists had fused four Sofra categories into one being. Arah learns the truth in Book 5.}}`,
      },
      {
        when: '~100', at: 97, title: 'The Elite Six are founded',
        d: `After the Cataclysm, the Elite Six are founded: always six, always Tier 7 or higher. Ouzai is one of them from the start.`,
      },
      {
        when: '~65 to ~90', at: 78, title: 'The Oracle Mass Purge',
        d: `Torn Overseers and FeyVey Purists coordinate the killing of Oracle bloodlines worldwide. Hundreds die. The survivors erase their identities and stop prophesying in public, and the Oracles have never recovered. Arah's grandmother survives it young, hidden away. {{The coordination ran too deep for politics alone. Oracles were the people most likely to see the Old Corrupted Gods at work.}}`,
      },
      {
        when: '~20', at: 20, title: 'The Accord of Ashes',
        d: `The war ends in exhaustion. Every nation is broke, and the surviving Oracles warn of extinction. The Accord of Ashes creates the Intercontinental Peace Council, the World Council. The Elite Six, about eighty years old by then, come under it. The same Council writes the Demi-God Containment Laws.`,
      },
    ],
  },
  {
    key: 'viii', n: 'VIII', name: 'Dark Age of Experimentation', short: 'Dark Age',
    period: '~50 to ~20 years before Book 1', status: 'MOSTLY SECRET',
    color: '#d946ef', rgb: '217,70,239', span: [50, 20], lane: 1,
    summary: `Recent history, kept quiet. The research turns darker and better protected, with governments shielding the people who run it.`,
    events: [
      {
        when: '~50', at: 50, title: 'Dr. Malreth Kaine',
        d: `A brilliant, amoral Primidian-Torn scientist, protected by more than one government. {{His creed: "If the experiments succeed, we remake the world. If they fail, you will carry my dream." Glass Mother worked under him. His son was his test subject from five to sixteen, in torture he called training. His final words to him: "You are my masterwork. Finish it." The son was Varek, who became the Proctor.}}`,
      },
      {
        when: '~40 or earlier', at: 40, title: 'The fake summonses',
        d: `Forged World Council summonses start arriving for gifted children who haven't awakened yet. Each one sends a child to a boundary zone that is technically Torn land, where the child is drugged and taken. The forgeries are near perfect. The one thing the Torn can't copy is the World Council seal. The scheme is still running when Book 1 opens.`,
      },
      {
        when: '~38 to ~40', at: 39, title: `Yureth's green letter`,
        d: `Yureth is ten, fast-tracked out of the Primeridian cloud city to an apprenticeship in Pratvia, when a green summons arrives. He goes, carrying an untested escape pod. He wakes in a cage with three other children. The pod holds four but only gets up to speed with two, so two Regalus boys climb out and let him and a Chrono girl go. In Pratvia, nobody helps them. {{The next day his implant shows him the two boys dead on an experiment table, and a grey-skinned, red-eyed man promises him the same if he talks. He leaves Primeridian society for Chrono lands with the girl. It is the wound under everything he becomes.}}`,
      },
      {
        when: '~24', at: 24, title: 'Oris refuses an order',
        d: `Oris Faren is a special-ops soldier in his mid-twenties and an Elite Six candidate when he's sent to destroy an illegal research facility and everyone in it, children included. He refuses. He frees the surviving children and destroys the research. He isn't punished for it, and he joins the Elite Six soon after. {{One of the children was sixteen-year-old Varek Kaine, being tortured by his own father. He never forgets who freed him.}}`,
      },
    ],
  },
  {
    key: 'ix', n: 'IX', name: 'The Quiet Era', short: 'Quiet Era',
    period: '~20 years before Book 1 to the story', status: 'LIVING MEMORY',
    color: '#60a5fa', rgb: '96,165,250', span: [20, 0], lane: 0,
    summary: `Peace on the surface, with trade moving again and a Primidian golden age. Underneath, old hatreds simmer and the forbidden research never stopped. The world sits at a soft boil.`,
    events: [
      {
        when: '~19', at: 19, title: '{{Lumenor}}',
        d: `{{While on the Elite Six, Oris meets a Farrow woman at Lumenor in the Frozen Wastes: Varel Shyre's sister. They keep seeing each other. She never shows him the Enclave, because he's still an outsider.}}`,
      },
      {
        when: '~17', at: 17, title: 'The fall of Oris Faren',
        d: `Oris discovers the truth about the Torn's forbidden research and reports his own commanding officers to the World Council. He is court-martialed for insubordination and sentenced to death, and the world believes the sentence was carried out. Kharos Dyth, a defected Torn child soldier, takes his seat on the Elite Six. The team never fully recovers the edge Oris's Recall gave them. {{The execution was faked with Varel's help. Yureth gave Oris a forbidden life extension first. Arah's mother talked the Farrow into taking him in at the Shaleh-Kai Enclave, with Varel vouching for him.}}`,
      },
      {
        when: '16', at: 16, title: 'Arah and Mallory are born',
        d: `Arah Faren and Mallory Voss are born into the false peace. {{He is Regalus and Farrow, and he spends his first three years at the Shaleh-Kai Enclave with both parents. Mallory's father is Varek Voss.}}`,
      },
      {
        when: '~16', at: 15.75, title: `{{Mallory's mother}}`,
        d: `{{A Dormose woman, Mallory's mother, is killed when Mallory is about three months old. The corrupted organization above the Proctor ordered it, to strip him of his emotional anchor. Kharos carried it out on orders from Elite Six leadership, without knowing the whole chain. Soon after, Aelira Nyru arranges for dreamwalkers to let the dead woman visit her infant daughter. The waking presence fades over the years and is gone by Book 1.}}`,
      },
      {
        when: '~14', at: 14, title: 'Elaara is born',
        d: `Elaara is born to a Regalus mother from the countryside. {{Her father is Varek Voss. She was conceived a full year after Mallory's mother died.}}`,
      },
      {
        when: '~13', at: 13, title: '{{The Enclave incident}}',
        d: `{{A high-tier intruder chasing rumors that Oris is alive gets into the Enclave and takes Arah's mother hostage. She gets three-year-old Arah clear. Oris returns by Recall and wins a close fight. He questions the man, then kills him. He decides the Enclave isn't safe for his son and sends him to his own mother in the Riverlands. Arah's mother is alive. What happened to her after that is still a mystery.}}`,
      },
      {
        when: '~10 to ~15', at: 12.5, title: 'The Maletonian War',
        d: `A Torn Overseer incursion onto Terra Primus, crossing the Abyssal Scar under military escort. Regalus, Dormose and some FeyVey forces stand against it. The Torn treat the laws of war as tactics. Conscripts receive a red envelope with a single letter on it: M. Dylan gets one. He survives, and most of his unit doesn't. {{When Torn soldiers kill FeyVey civilians, the Purists swallow the cover story and the Harmonists gain martyrs. Yureth runs research and intel, and starts to see a pattern he can't prove.}}`,
      },
      {
        when: '~7', at: 7, title: 'The Pre-Awakening ceremony',
        d: `At nine, Arah receives his personal tattoo at the River of Echoes, like every Regalus child before awakening. {{It holds a hidden ice symbol in Sol'Vastaran frost-rune architecture. Nobody recognizes it.}}`,
      },
      {
        when: '~5', at: 5, title: 'The Prologue',
        d: `Arah awakens at eleven, when a corrupted boar charges Mallory in the Riverlands. {{He burns through his whole Enhancer reserve and the emptiness lets ice through. Mallory sees it, and they keep it secret. By morning he can't remember it.}} Soon after, his friend Rushi dies in the same forest. He kills a corrupted creature and dies of his wounds. Arah led him there.`,
      },
      {
        when: '~3', at: 3, title: 'Saint Fracture falls',
        d: `Saint Fracture leaves the Elite Six, lost to corruption, and becomes the leader of the SinHarvesters. Kaisho replaces him at sixteen, a Pratvia undercity kid and the youngest member ever. {{The Old Corrupted Gods' influence had been cultivating Saint Fracture for his whole career.}}`,
      },
    ],
  },
  {
    key: 'x', n: 'X', name: 'The Age of Resonance', short: 'Age of Resonance',
    period: 'Book 1 onward', status: 'NOW',
    color: '#4fc3f7', rgb: '79,195,247', span: [0, 0], lane: 0,
    summary: `Arah is sixteen and thinks he's an ordinary Regalus kid from the Riverlands. Every unresolved thread in this history runs through him.`,
    events: [
      {
        when: 'Book 1', at: 0, title: 'Everything converges',
        d: `Book 1 opens with the Redmare trial. Around it, the world is already moving.`,
        items: [
          `The SinHarvesters move from the shadows into open action.`,
          `{{Varek Voss's Forced Sopher Restructuring device is nearly finished.}}`,
          `The Torn rebellion organizes. {{Kharos Dyth is the secret link between the Elite Six and the Underground.}}`,
          `Blackwatch closes in on the triplets' secret.`,
          `Khaervos stirs in the Oathless Sky.`,
          `The Void Herald cycle is coming early.`,
          `The Abyssal Scar starts showing anomalous readings.`,
          `{{The Absolutes' attention starts turning back to Verallus at the end of Book 1, when what Elaara carried disperses into the planet.}}`,
          `{{The Old Corrupted Gods' 4,000 years of cultivation reaches its critical phase. They are nearly ready to move in the open.}}`,
        ],
      },
    ],
  },
  {
    key: 'xi', n: 'XI', name: 'The Silent Absolutes', short: 'Silent Absolutes',
    period: 'Since the Icebirth Era, and ongoing', status: 'ONGOING',
    color: '#cbd5e1', rgb: '203,213,225', span: [4000, 0], lane: 2,
    summary: `The gods keep their distance. {{It's a policy, set after an Absolute who walked among mortals as a friend was killed by them. None has walked openly among mortals since.}} Most people take it for indifference.`,
    events: [
      {
        when: 'Ongoing', title: 'Keeping partial watch',
        items: [
          `Serena: her compassion for Verallus keeps her near, through the River of Echoes.`,
          `Ortox: bound by duty. He can't fully let go.`,
          `Retallia: too curious about how it turns out to leave.`,
        ],
      },
      {
        when: 'Ongoing', title: 'Mostly withdrawn',
        items: [
          `Porish: pursuing knowledge elsewhere.`,
          `Retaan: respecting the freedom to fail.`,
          `Treswack: his attention scatters by nature.`,
          `Father: keeping cosmic balance elsewhere.`,
          `Argon: keeps entirely to himself.`,
        ],
      },
      {
        when: 'Now', title: `{{Why they're turning back}}`,
        d: `{{They are starting to realize Verallus matters more than they thought. They haven't realized that a fragment of one of their own has been waiting 4,000 years to be heard.}}`,
        items: [
          `{{What Elaara carried, dispersing into the planet at the end of Book 1. This is where the turn starts.}}`,
          `{{Arah's Sopher call at the Astral Threshold, late in the series. It amplifies the turn with a resonance pattern that hasn't existed in millennia.}}`,
          `{{Treswack breaking cosmic law through Khaervos.}}`,
          `{{Corruption evolving into new forms, and the Void Herald cycle arriving early.}}`,
          `{{Anomalies at sealed sites: the Abyssal Scar and the erased Icebirth ruins.}}`,
        ],
      },
    ],
  },
]

// ── Hidden histories: the official story, and what happened ──
export type Hidden = { topic: string; believed: string; truth: string }

export const HIDDEN: Hidden[] = [
  { topic: 'The Icebirth Era', believed: `A myth, when anyone mentions it at all.`, truth: `{{Real. Frostwardens cultivated into fear by the Old Corrupted Gods killed Auren, the Ninth Absolute, and the surviving Absolutes erased the era.}}` },
  { topic: 'The Terra Split', believed: `Divine judgment. The Regalus were blessed and the FeyVey rejected.`, truth: `{{Auren's protective preparation: two complementary gifts, so the two peoples would be stronger together.}}` },
  { topic: 'The River of Echoes', believed: `Sacred, and assumed inert. Residual divine energy and nothing more.`, truth: `{{A deliberate construction. Auren encoded a message in it, tuned to Cryobending.}}` },
  { topic: 'The Grey Expanse', believed: `An ancient dead zone. Most guess the cause was geological.`, truth: `{{Treswack made it when he manifested, about 8,000 years ago.}}` },
  { topic: 'The Cataclysm of Four Nations', believed: `A tragic natural disaster.`, truth: `{{A forbidden experiment. A living weapon fused from four Sofra categories understood what it was, and destroyed itself.}}` },
  { topic: 'The Torn', believed: `Official Torn history: a strong government is needed to contain a violent people.`, truth: `{{The Overseers built their own people's oppression. Even the name was theirs first.}}` },
  { topic: 'Bending', believed: `A fable.`, truth: `{{Real, and older than anyone knows. The Solarii had it more than 4,000 years ago, and the First Bender brought it back 300 to 500 years ago.}}` },
  { topic: 'Oris Faren', believed: `Executed for insubordination about seventeen years ago. Confirmed dead.`, truth: `{{Alive, hidden at the Shaleh-Kai Enclave.}}` },
  { topic: `Arah's mother`, believed: `She died giving birth to him. That's what the village says.`, truth: `{{She's alive. She is Farrow, descended from the First Bender. Varel Shyre is her brother.}}` },
  { topic: 'The Faren name', believed: `An unusual Regalus family name. Nothing more.`, truth: `{{It comes from the Farrow, in memory of the First Bender.}}` },
  { topic: 'The Oracle Purge', believed: `A coordinated political atrocity.`, truth: `{{Cultivated by the Old Corrupted Gods, to silence the people most able to see them.}}` },
  { topic: 'The gods before the gods', believed: `A myth the Absolutes let persist: a previous generation of gods once reigned.`, truth: `{{True. That older order corrupted, was displaced, and survives as the Old Corrupted Gods. The Absolutes are wrong about their own history.}}` },
  { topic: 'The Shadow Threat', believed: `Nothing. Nobody knows there's anything to know.`, truth: `{{The Old Corrupted Gods have been steering institutions for 4,000 years. Even the Absolutes don't know they exist.}}` },
]

// ── The six books ──
export type Book = {
  n: number
  title: string
  tiers: [number, number]
  tierNote?: string
  phase?: string        // shown as a chip when the book has no locked emotional shape
  shape?: string
  note?: string
  threads: string[]     // may hold {{spoilers}}
}

export const BOOKS: Book[] = [
  {
    n: 1, title: 'What the Echoes Remember', tiers: [2, 3],
    shape: `Arah's contained world cracks open.`,
    note: `Opens with a prologue: his awakening at eleven.`,
    threads: [
      `The Redmare trial in Veilheim, hijacked by an outside party.`,
      `Blackwatch Assessors draw Arah's blood, and an M letter arrives.`,
      `The Proctor's facility at Irogarth, where Kaisho trains the selectees.`,
      `Elaara, and a love neither of them names.`,
      `{{Elaara breaks the cycle and dies stopping her father's device. Arah beats the Proctor and doesn't kill him. Glass Mother takes the Proctor before anyone notices.}}`,
    ],
  },
  {
    n: 2, title: 'Veiled Truths', tiers: [3, 6],
    shape: `The investigation. The rot runs sideways, in every direction.`,
    threads: [
      `Arah sets out into the wider world for the first time, with a home still waiting.`,
      `{{The Proctor was a piece of something larger. There's no single root to cut.}}`,
      `{{His safeguard fails for the first time and he draws on his Sopher.}}`,
      `{{Varel hints that Oris is alive, then stalls. Arah goes looking for the Enclave without him.}}`,
      `{{His grandmother dies at the end of the book.}}`,
    ],
  },
  {
    n: 3, title: 'Frozen Clarity', tiers: [6, 7],
    shape: `He learns to use what he has, and starts to see the world's shape clearly enough to fear it.`,
    threads: [
      `{{It opens at the Shaleh-Kai Enclave. Arah fights a man at the entrance, and the man is his father.}}`,
      `{{The Farrow name his ice: Cryobending.}}`,
      `{{Training with Varel in the Frozen Wastes.}}`,
      `{{The Glacial Choir breakthrough.}}`,
      `{{The first real fight with the SinHarvesters.}}`,
    ],
  },
  {
    n: 4, title: 'Fractured Bonds', tiers: [7, 8], phase: 'MID-SERIES',
    threads: [
      `{{The Farrow lineage begins to surface.}}`,
    ],
  },
  {
    n: 5, title: 'Thaw and Flame', tiers: [8, 9], phase: 'MID-SERIES',
    threads: [
      `{{The triplets are revealed.}}`,
      `{{Arah learns the truth of the Cataclysm.}}`,
      `{{The Torn rebellion sparks.}}`,
      `{{Mallory's sacrifice.}}`,
      `{{The full history of bending surfaces.}}`,
    ],
  },
  {
    n: 6, title: 'Wings of Frost and Flame', tiers: [9, 10], tierNote: 'briefly 10', phase: 'ENDGAME',
    threads: [
      `{{Every thread converges.}}`,
      `{{Oris uses Actus Ultimus.}}`,
      `{{The truth of Auren, in full.}}`,
      `{{Khaervos.}}`,
      `{{The Old Corrupted Gods exposed.}}`,
      `{{It ends at the River of Echoes.}}`,
    ],
  },
]

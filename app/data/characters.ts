// Character archive.
// Source of truth: the canon docs in the private Book repo (characters, power system, narrative structure, timeline).
// Spoilers: wrap any text in {{ }} and the site blurs it until the reader taps it (or turns spoilers on).

export type Character = {
  key: string
  name: string
  epithet: string
  role: string
  race: string          // shown on the card: never put spoilers here
  color: string
  rgb: string
  glyph: string         // one or two letters for the sigil
  stats: { v: string; l: string }[]
  desc: string
  tells: string[]
  bonds: { n: string; d: string }[]
  quote?: { t: string; by: string }
}

export type Group = { key: string; title: string; blurb: string; members: Character[] }

export const GROUPS: Group[] = [
  {
    key: 'heart',
    title: 'THE HEART OF IT',
    blurb: `A boy who reads wrong, the healer who keeps showing up, a girl in a beautiful cage, and a father the world says is dead.`,
    members: [
      {
        key: 'arah', name: 'Arah Faren', epithet: 'The Iceheart', role: 'PROTAGONIST',
        race: 'Regalus · 16', color: '#4fc3f7', rgb: '79,195,247', glyph: 'AF',
        stats: [
          { v: '16', l: 'Age in Book 1' },
          { v: 'Tier 2 → 3', l: 'Book 1' },
          { v: 'Enhancer', l: 'Sofra' },
          { v: 'Twin daggers', l: 'Weapon' },
        ],
        desc: `A sixteen-year-old Regalus boy from the Riverlands, raised by his grandmother in a house full of strays. He was the last kid in his Sofra class to progress, and everybody knew it. His Sofra is momentum: it threads through his own motion and compounds, so every spin and vault feeds the next. It only works while he moves, so he never sits still. Every adult has tried to classify him and failed. He wants to see past his street, find his mother, and learn the truth about his parents. {{He also carries Cryobending, through a Farrow mother he barely remembers. The two systems grind against each other, and nobody names the ice until the Farrow do, at the Shaleh-Kai Enclave at the start of Book 3.}}`,
        tells: [
          `Can't stand still. He bounces on his heels, spins a dagger, paces while he thinks. When Arah goes still, something is badly wrong.`,
          `His loads fire on reflex. Clap him on the shoulder and he's a step away before he decides to move.`,
          `When he loads Sofra into a limb, the skin glows ember red. Anyone fighting him can read it. Late in Book 1 he learns to fake it.`,
          `He carries twin daggers because of Rushi, the friend who followed him into the forest and died there.`,
          `His people sing their history, and he can't hold a tune. He can dance, though, and it shows in how he fights.`,
          `Before a hard decision he closes his eyes and exhales through his nose. {{So does his father.}}`,
        ],
        bonds: [
          { n: 'Mallory Voss', d: `Closest friend since they were small. She's been healing him since she caught him training himself bloody in the woods.` },
          { n: 'Grandmother', d: `His roots and his home. {{She dies at the end of Book 2. Her Echo Spirit rests in the River of Echoes.}}` },
          { n: 'Dylan', d: `Has thrown real and illusory knives at him since he was small. Arah's reflexes are Dylan before breakfast.` },
          { n: 'Elaara', d: `First love, met at the Proctor's facility. {{She dies at the end of Book 1 and he wasn't strong enough to stop it. He keeps her bracelet.}}` },
          { n: 'Oris Faren', d: `His father, executed as a traitor by the official record. Something about that story always sat wrong with him. {{He's alive. They nearly kill each other at the Enclave entrance before either knows who the other is.}}` },
        ],
        quote: { t: `Everyone keeps telling me who I'm supposed to be. Nobody's asking who I actually am.`, by: 'Arah' },
      },
      {
        key: 'mallory', name: 'Mallory Voss', epithet: 'The Compassionate Heart', role: 'PROTAGONIST',
        race: 'Dormose / Primidian · 16', color: '#4ade80', rgb: '74,222,128', glyph: 'MV',
        stats: [
          { v: '16', l: 'Age in Book 1' },
          { v: 'Tier 2 → 3', l: 'Book 1' },
          { v: 'Healer', l: 'Sofra · Cleansing' },
          { v: `5'3"`, l: 'Among giants' },
        ],
        desc: `A self-taught healer raised in Roothold, the city inside the great tree of Morwood. Small among a people of giants, fast among a patient one. Gems in her skin glow when she feels too much, which is why she works so hard to feel nothing in front of you. She reads everyone. Like all Dormose she can't lie, so when she wants to hide something she goes quiet. In Book 1 she leaves for Irogarth on her own, after a meeting with Grand Oracle Mourai. {{She learned to cleanse without the insulation a Dormose teacher would have built in, because Arah kept getting hurt and she couldn't wait. Years of purification have been building corruption inside her. She dies in Book 5, and Arah gives up godhood to bring her back.}}`,
        tells: [
          `She never says "I'm fine." She says "I can walk" or "It's handled." Every line she says is true.`,
          `She bills people. Two Honeybarks a healing, and the price goes up when Arah does something especially stupid.`,
          `She diagnoses as small talk. "Your left side's tight." "You haven't slept." Never once about herself.`,
          `Known in Roothold as Mallory of the Rain.`,
          `Her Sova is Moro, a giant mallow that looks harmless and fights like nothing she's ever seen.`,
        ],
        bonds: [
          { n: 'Arah Faren', d: `Her idiot. She's been showing up to heal him since they were kids, without being asked. Her frustration and her care are the same act.` },
          { n: 'Alisai', d: `Her Dormose guardian, who runs a famous bakery in Roothold and can't lie either.` },
          { n: 'Aelira Nyru', d: `Teaches her advanced healing. {{Her aunt by marriage, who arranged for Mallory's dead mother to visit her in dreams.}}` },
          { n: 'Kharos Dyth', d: `She heals him at the facility and they connect. {{He killed her mother on Elite Six orders, and works it out late in Book 1. She doesn't know.}}` },
          { n: '{{The Proctor}}', d: `{{Her father. She doesn't know. Elaara is her half-sister, and neither of them knows that either.}}` },
        ],
        quote: { t: `The world doesn't need a savior. It needs people who stay.`, by: 'Mallory' },
      },
      {
        key: 'elaara', name: 'Elaara', epithet: `Arah's First Love`, role: 'MAJOR SUPPORTING',
        race: 'Regalus / Primidian · 14', color: '#f0abfc', rgb: '240,171,252', glyph: 'E',
        stats: [
          { v: '14', l: 'At introduction' },
          { v: 'Never', l: 'Awakens' },
          { v: 'Book 1', l: 'Her story' },
          { v: 'A Sova', l: 'Her only friend' },
        ],
        desc: `Fourteen, brilliant, lonely, and raised inside a laboratory. She is Regalus through her mother, but she has only the starter marks she was born with: no River, no ceremony, no songs. She talks about her feelings like lab results and asks the question nobody else asks. She refuses mangoes. It's the smallest rebellion she has. {{She is the Proctor's daughter, engineered from birth as the template for his device. He gives her two choices, and both belong to his research. She finds a third. She dies stopping the device, and what she carried disperses into the world and comes to rest in the River of Echoes. The girl with no songs becomes the echo in the river.}}`,
        tells: [
          `"I think I have an elevated response to you." Her words for feelings are clinical, and she says Arah's name carefully, like she's practicing it.`,
          `She collects the outside. She asks Arah to describe rain, rivers and what Honeybarks taste like, and writes his answers down.`,
          `"I'm not allowed to date," with a look that means the opposite. She tests rules to see which ones are real.`,
          `She whispers to her Sova when she thinks nobody's there. The moment it lets Arah see it is the moment she trusts him.`,
        ],
        bonds: [
          { n: 'Arah Faren', d: `The first Regalus person she's really talked to. She wants to learn the Regalus way, and she wants to learn it from him.` },
          { n: 'Her Sova', d: `Her mother's Sova first, which stayed and bound to her. Her only friend before Arah. {{It dies with her, by its own choice.}}` },
          { n: '{{The Proctor}}', d: `{{Her father. "I do love you. Can't you see?" He means it.}}` },
          { n: '{{Mallory Voss}}', d: `{{Her half-sister. Neither knows.}}` },
        ],
        quote: { t: `Don't tell me you love me unless you mean it. I'd rather have nothing than something that isn't real.`, by: 'Elaara' },
      },
      {
        key: 'oris', name: 'Oris Faren', epithet: 'The Untouchable', role: `ARAH'S FATHER`,
        race: 'Regalus · Former Elite Six', color: '#f59e0b', rgb: '245,158,11', glyph: 'OF',
        stats: [
          { v: 'Elite Six', l: 'Former seat' },
          { v: 'Enhancer', l: 'Sofra root' },
          { v: '{{Space Convergence}}', l: 'Lost Art' },
          { v: '{{Alive}}', l: 'Status' },
        ],
        desc: `A legendary Elite Six hero, executed as a traitor about seventeen years ago by the official record. "Oris the Untouchable," they called him. With his Recall the team could move anywhere he had been, so they could never truly be cornered. Arah knows him only through rumor. {{He faked his death with Varel's help and has lived hidden at the Shaleh-Kai Enclave ever since. His Enhancer Sofra evolved into Space Convergence: he pulls force, objects and people toward a single point. He is a Monolith. In Book 6 he uses Actus Ultimus. His eyes meet Arah's, and he is at peace.}}`,
        tells: [
          `{{He closes his eyes and exhales through his nose before a fight. His son does the same, without ever learning it from him.}}`,
          `{{The Faren earrings were his, and his father's before him. Seeing them on a stranger's face at the Enclave is what freezes him.}}`,
          `{{As a young special-ops soldier he found a sixteen-year-old named Varek Kaine being tortured by his own father, and refused to leave him. That boy became the Proctor.}}`,
        ],
        bonds: [
          { n: 'Arah Faren', d: `His son. {{Arah was three the last time they saw each other.}}` },
          { n: 'Varel Shyre', d: `Best friend and former teammate. {{Each was the only person who knew the other's secret.}}` },
          { n: 'Grandmother', d: `His mother. {{She knows he's alive.}}` },
          { n: 'Yureth', d: `{{Gave him a forbidden life extension before the execution. Yureth suspects he's alive and can't prove it.}}` },
        ],
        quote: { t: `{{I'm sorry. I know that doesn't fix anything. But it's all I have.}}`, by: `{{Oris, to Arah}}` },
      },
    ],
  },
  {
    key: 'household',
    title: `GRANDMA'S HOUSE OF ORPHANS`,
    blurb: `What the Riverlands calls the Faren house. Nobody in it is blood except Grandma and Arah. Everybody in it is family.`,
    members: [
      {
        key: 'grandmother', name: 'Grandmother', epithet: 'The Gravitational Center', role: 'MAJOR SUPPORTING',
        race: 'Regalus · Retired Oracle', color: '#fbbf24', rgb: '251,191,36', glyph: 'G',
        stats: [
          { v: 'Lesser Oracle', l: 'Retired' },
          { v: 'Survived', l: 'The Oracle Purge' },
          { v: 'Quarterly', l: 'Capital crimes' },
          { v: 'Everyone', l: 'Takes in' },
        ],
        desc: `One of the last Oracles of her time, retired, and the axis the whole Riverlands turns on. She shelters people because someone once sheltered her. The woman the FeyVey Purists hunted raises a FeyVey boy. The woman the Torn Overseers hunted hides three Torn children under her floor. She never says a word about the irony. The gentlest woman on the street commits a capital crime at every quarterly Assessor visit. {{She knows almost everything: that Oris is alive, what happened to Arah's mother, why Arah was sent to her at three. She never lies. She just doesn't say. She dies at the end of Book 2 without telling him, and her Echo Spirit rests in the River.}}`,
        tells: [
          `She answers hard questions with a chore. "Hand me that pot." A chore from Grandma means the question hit something.`,
          `She hums Regalus history songs over the stove. When she stops mid-verse, something's wrong.`,
          `She talks about Arah's mother in the present tense without noticing. "Your mother would think the same."`,
          `She held the Faren earrings for thirteen years and gave them to Arah the night he became Redmare.`,
        ],
        bonds: [
          { n: 'Arah Faren', d: `Her grandson. She uses his full name when it matters.` },
          { n: 'Alisai', d: `Her old friend, Mallory's guardian. Their friendship is why Arah and Mallory grew up together.` },
          { n: 'Oris Faren', d: `Her son. {{Sentenced, gone, and alive.}}` },
        ],
        quote: { t: `The river doesn't ask where you've been. It just holds you.`, by: 'Grandmother' },
      },
      {
        key: 'dylan', name: 'Dylan', epithet: 'Older Brother in All But Blood', role: 'MAJOR SUPPORTING',
        race: 'FeyVey · War veteran', color: '#a78bfa', rgb: '167,139,250', glyph: 'D',
        stats: [
          { v: 'Tier 4', l: 'Stagnated' },
          { v: 'Illusionist', l: 'Projection' },
          { v: 'Maletonian War', l: 'Survived' },
          { v: 'None', l: 'Good jobs given' },
        ],
        desc: `A FeyVey veteran of the Maletonian War, drafted by an M letter into the bloodiest division. Most of his unit died. Arah's grandmother took him in. For years he has thrown knives at Arah before breakfast, some real and some projections, and never once explained why. It's why Arah's reflexes sit far above his tier. Dylan's control is FeyVey before it's military, and it's why he's stuck at Tier 4: growing would mean feeling what he's locked away. He knows it. He'd rather stay stuck.`,
        tells: [
          `He never says "good job." The closest he gets is throwing the next knife a little harder.`,
          `He doesn't sleep in a bed. A chair by the door, the floor, the roof.`,
          `Ask him about the war and he tells you the gate needs fixing.`,
          `He wears his white FeyVey hair freely in the Riverlands, and dyes it when he travels.`,
        ],
        bonds: [
          { n: 'Arah Faren', d: `"Kid." He couldn't change what Arah is, so he made him harder to kill.` },
          { n: 'The Triplets', d: `The one place his persona drops.` },
          { n: 'Leira', d: `The only person who can make him laugh.` },
        ],
        quote: { t: `Damn, you're cooked.`, by: 'Dylan, reading the M letter' },
      },
      {
        key: 'leira', name: 'Leira', epithet: 'The House Manager', role: 'SUPPORTING',
        race: 'Regalus · No Sofra', color: '#fde68a', rgb: '253,230,138', glyph: 'L',
        stats: [
          { v: 'Oldest', l: 'Of the strays' },
          { v: 'None', l: 'Sofra' },
          { v: 'Illumis', l: 'Dreams of' },
          { v: 'Everyone', l: 'Gossip on' },
        ],
        desc: `The oldest of the strays, so she became the mother of the house by default. Nobody asked her. She wakes Arah, carries messages, fixes collars, and steps between Arah and Dylan before Arah starts a fight he'd lose. She dreams of FeyVey and Primidian cities and stays because someone has to run the house. When Arah is declared Redmare and gets to leave first, she's happy for him and jealous, and doesn't say it.`,
        tells: [
          `She narrates while she works. "I'm putting this here, don't touch it, someone feed Nala."`,
          `Care as correction: she fixes Arah's collar, re-wraps his locs, tells Dylan his dye job is uneven.`,
          `She's the street's information hub. Who's sick, who's fighting, which Assessor is new.`,
        ],
        bonds: [
          { n: 'Arah Faren', d: `"Little brother."` },
          { n: 'Dylan', d: `She's the only one who can make him laugh.` },
        ],
        quote: { t: `Make sure you pass today, so you can help with the adult work.`, by: 'Leira, Ch1' },
      },
      {
        key: 'triplets', name: 'The Triplets', epithet: 'Zev, Seren and Orin', role: 'MAJOR SUPPORTING',
        race: 'Torn · Raised Regalus · 7', color: '#f87171', rgb: '248,113,113', glyph: 'III',
        stats: [
          { v: '7', l: 'Age in Book 1' },
          { v: 'Vorath', l: 'True name of their people' },
          { v: 'Hidden', l: 'At every visit' },
          { v: 'Orin', l: 'The oldest' },
        ],
        desc: `Three Torn boys smuggled out of the Middle Ring as infants and raised Regalus, in a house that sings its history. None of the songs are about their people. Being outside Torn territory is a capital crime for them, so when the Assessors come they hide in the basement. Their eyes flicker red under stress, so in the hiding spot, fear can give them away. {{They are stable forbidden fusion children. Together their signatures form the Resonance Triad, a harmony that has never occurred before. When their existence becomes public in Book 5, the Torn Underground gains its most powerful symbol.}}`,
        tells: [
          `Zev kept his Torn birth name. He asks why there are no songs about the Torn, and he's the one whose eyes flicker.`,
          `Seren learns every song Grandma knows and keeps the other two calm, because calm keeps their eyes gray.`,
          `Orin studies what the Assessors look for. He hears the caravan wheels before anyone else.`,
        ],
        bonds: [
          { n: 'Arah Faren', d: `Their big brother. They hit him from three directions at once.` },
          { n: 'Dylan', d: `Gentlest with them, of all people.` },
          { n: 'Grandmother', d: `The one who hides them.` },
        ],
      },
      {
        key: 'yureth', name: 'Yureth', epithet: 'The Retired Architect', role: 'MAJOR SUPPORTING',
        race: 'Primidian · Inventor', color: '#38bdf8', rgb: '56,189,248', glyph: 'Y',
        stats: [
          { v: '~50', l: 'Age in Book 1' },
          { v: 'None', l: 'Sofra' },
          { v: 'Gorian', l: 'His AI' },
          { v: 'Chief of intel', l: 'Maletonian War' },
        ],
        desc: `A grumpy Primidian inventor living among the Regalus, with tech built into his body and his hands always on a device. Behind a hidden wall in a neighbor's house he keeps a lab, and an AI named Gorian who pretends to delete his files. At ten he answered a forged summons and woke up caged. Two Regalus boys stayed behind so he could escape. He has lived beside their people ever since. He ran research and intel in the Maletonian War, saw things that never added up, and walked away. {{Before Oris Faren's execution, Yureth gave him a forbidden life extension. He suspects Oris is alive and can't prove it.}}`,
        tells: [
          `"There's still a lot I can't say under law." He hides behind rules and procedure.`,
          `"Daggnabbit! Take off your shoes!" Affection comes out as grumpy insults.`,
          `He gave Arah a purple jacket that turned out to be a Sofra parachute. He knew exactly what it was.`,
          `When his story reaches the two Regalus boys, his hands stop.`,
        ],
        bonds: [
          { n: 'Arah Faren', d: `"Kid." Or "brat."` },
          { n: 'Gorian', d: `"Deleting this week's archive log." "No!" "Ha. Ha. Just kidding."` },
          { n: 'Reily', d: `The little girl of the house he built his lab in. She jump-scares him.` },
        ],
        quote: { t: `No one has come through here in decades, kid. Not since your father.`, by: 'Yureth' },
      },
      {
        key: 'rushi', name: 'Rushi', epithet: `Riverland's Grand Hero`, role: 'PROLOGUE',
        race: 'Regalus · Unawakened', color: '#fcd34d', rgb: '252,211,77', glyph: 'R',
        stats: [
          { v: '10 for 10', l: 'Targets hit' },
          { v: 'Twin daggers', l: 'Weapon' },
          { v: 'Assassin hero', l: 'Dream' },
          { v: 'Prologue', l: 'His story' },
        ],
        desc: `A younger Riverlands kid with made-up missions, twin daggers, and dead-on aim with anything he can throw. He wanted to be an Assassin hero. Arah knew he'd get there someday, and it inspired him. {{In the Prologue Arah talks him into sneaking past the barrier to their old training spot, and a corrupted creature finds them. Rushi blinds it, kills it, and dies asking if he's a hero now. His stone says yes. Arah has carried it ever since.}}`,
        tells: [
          `"The sneak attack doesn't work if you tell me about it beforehand."`,
          `He pretended to refill his Sofra at the River. He wasn't awakened. Arah played along anyway.`,
        ],
        bonds: [
          { n: 'Arah Faren', d: `His training partner and fellow Grand Hero.` },
        ],
        quote: { t: `{{Am I a hero now, Arah?}}`, by: 'Rushi' },
      },
      {
        key: 'zollu', name: 'Master Zollu', epithet: 'The Riverlands Instructor', role: 'BOOK 1',
        race: 'Regalus · Sofra instructor', color: '#fb923c', rgb: '251,146,60', glyph: 'Z',
        stats: [
          { v: 'Instructor', l: 'Sofra and combat' },
          { v: 'Redmare', l: 'Declared Arah' },
        ],
        desc: `The Riverlands' Sofra combat instructor. He teaches the pre-awakened children to feel the Sopher flow in their bodies, along with fundamentals, history and tips for awakening. When Arah awakened fidgety, on edge and fast, Zollu saw a strength and steered him into conditioning his Sofra to load on reflex. He declared Arah Redmare. And when Arah started forward a second time during the Assessor visit, Zollu chopped him unconscious before he could get himself killed, then told him he'd quite enjoyed the kick.`,
        tells: [
          `His core lesson: the moment an opponent commits to an attack is when they are most open.`,
        ],
        bonds: [
          { n: 'Arah Faren', d: `His most frustrating student, and the one who proved him right.` },
        ],
        quote: { t: `You keep fighting the attack. Start fighting the fighter.`, by: 'Master Zollu' },
      },
    ],
  },
  {
    key: 'six',
    title: 'THE ELITE SIX',
    blurb: `S-ranked international special forces. Exactly six, always. Tier 7 or higher. Founded about a century ago, after the Cataclysm of Four Nations.`,
    members: [
      {
        key: 'varel', name: 'Varel Shyre', epithet: 'The Quiet Edge', role: 'ELITE SIX',
        race: 'Regalus · 39', color: '#7ecef4', rgb: '126,206,244', glyph: 'VS',
        stats: [
          { v: 'Tier 8', l: 'Power' },
          { v: 'Cryobending', l: 'Sofra' },
          { v: '39', l: 'Age' },
          { v: '{{Farrow}}', l: 'True race' },
        ],
        desc: `An Elite Six Cryobender and a familiar face in the Riverlands, where the village knows him as a Regalus man who still visits home. Playful with kids, masterful in a fight. During the Book 1 Assessor visit he stops a Torn sentry's blade with his bare hand, and for one second Arah feels a pressure presence unlike anything he's ever felt. His signature technique is Ice Phantom Quietus: silent strikes where the ice forms after he's gone. {{He is Farrow, hiding as Regalus at the top of the world. He helped fake Oris's execution and has known he's alive for seventeen years. Arah's mother is his sister. Every visit was an uncle watching his nephew grow up from a distance.}}`,
        tells: [
          `He broke the treehouse kids' seeing-far glasses on purpose.`,
          `He doesn't run cold. He has mastered his Sofra so completely that insulating against the ice is like breathing.`,
          `{{He lies outright, the only person in Arah's life who does, and he goes quiet afterward.}}`,
          `{{His stillness method fails Arah in the Frozen Wastes. Finding the flow way changes Varel too.}}`,
        ],
        bonds: [
          { n: 'Arah Faren', d: `{{His nephew, and eventually his student.}}` },
          { n: 'Oris Faren', d: `{{Best friend. Each kept the other's deepest secret.}}` },
          { n: 'Shyrin', d: `The only one on the Six who fully sees through her.` },
        ],
        quote: { t: `Ice is truth. It shows reality without mercy. But truth without compassion is cruelty.`, by: 'Varel' },
      },
      {
        key: 'aelira', name: 'Aelira Nyru', epithet: 'Moonwake Seraph', role: 'ELITE SIX',
        race: 'Chrono · 70+', color: '#06b6d4', rgb: '6,182,212', glyph: 'AN',
        stats: [
          { v: 'Tier 8–9', l: 'Power' },
          { v: 'Healer', l: 'Sofra' },
          { v: '70+', l: 'Looks 30' },
          { v: 'Kelmarth', l: 'Survived the Drowning' },
        ],
        desc: `The Six's healer. She is past seventy and looks thirty. Her Tidal Embrace heals every ally within a hundred feet. She senses bonds forming between people and recognized the one between Arah and Mallory early. She has seen the shape of Mallory's fate, without the details, and grieves it silently. {{She is the daughter of Serena, the Absolute of love. She is also Mallory's aunt by marriage. For years she quietly arranged for dreamwalkers to let Mallory's dead mother visit her in dreams. She knows who Mallory's father is and has never told her.}}`,
        tells: [
          `She teaches Mallory advanced healing.`,
          `{{After Mallory's death she teaches "Mallory's Light" to the next generation.}}`,
        ],
        bonds: [
          { n: 'Mallory Voss', d: `Loves her like a daughter. {{Knows she can't stop what's coming.}}` },
          { n: 'Kharos Dyth', d: `{{Knows what he did, and doesn't resent him for it.}}` },
        ],
      },
      {
        key: 'ouzai', name: 'Ouzai', epithet: 'The Glass Mountain', role: 'ELITE SIX',
        race: 'Dormose · 150+', color: '#22c55e', rgb: '34,197,94', glyph: 'O',
        stats: [
          { v: 'Tier 9', l: 'Power' },
          { v: 'Enhancer', l: 'Earth and endurance' },
          { v: '150+', l: 'Age' },
          { v: 'Since the start', l: 'On the Six' },
        ],
        desc: `The oldest living member of the Elite Six, on the team since it was founded after the Cataclysm of Four Nations, which he saw with his own eyes. He speaks rarely. When he speaks, everyone listens. He knows nearly everything happening in the Six and almost never interferes. In Book 3 he lectures Arah on stillness, then tells Varel in private that he's teaching the boy wrong, knowing full well Arah is listening. "Did you get all of that, Arah?" {{When Mallory dies, Ouzai cries for the only time in living memory. The ground shakes. He survives the series.}}`,
        tells: [],
        bonds: [
          { n: 'Arah Faren', d: `A spiritual grandfather. He teaches grounding through silence.` },
        ],
        quote: { t: `The mountain does not fight the wind. The mountain remains.`, by: 'Ouzai' },
      },
      {
        key: 'kaisho', name: 'Kaisho', epithet: 'The Sky Ripper', role: 'ELITE SIX',
        race: 'Primidian · Pratvia · 19', color: '#facc15', rgb: '250,204,21', glyph: 'K',
        stats: [
          { v: 'Tier 7', l: 'Power' },
          { v: 'Electrobending', l: 'Sofra' },
          { v: '16', l: 'Youngest recruit ever' },
          { v: 'Trainer', l: 'At the facility' },
        ],
        desc: `The youngest Elite Six member ever, recruited at sixteen out of the Pratvia undercity. In Book 1 he's the selectees' trainer at the Proctor's facility. "I may be part of the Elite 6, but here I am just your trainer." He rates everyone out loud by race and tier, and calls Arah "Two." He shocks door handles and people who touch him, and plays it off as a prank. He can't help it. {{His catalyst gene was implanted at twelve, harvested from a Farrow child who died on the table. He traded himself to save his sister, and they killed her anyway. Tier 7 is his ceiling, and his body is burning out. In Book 4, Arah's ice saves him.}}`,
        tells: [
          `He eats fast with an arm around the plate and sits where he can see the exits.`,
          `{{A shaking hand after a fight, a nosebleed wiped before anyone sees, a headache he blames on the noise.}}`,
          `His laugh is rationed. When it comes, it's real.`,
        ],
        bonds: [
          { n: 'Arah Faren', d: `"Two." Rival first. {{Brothers in all but blood by the end.}}` },
          { n: '{{Ryn}}', d: `{{His brother. They lost the same sister.}}` },
        ],
      },
      {
        key: 'shyrin', name: 'Shyrin', epithet: 'The Veil-Split Widow', role: 'ELITE SIX',
        race: 'FeyVey · 50', color: '#818cf8', rgb: '129,140,248', glyph: 'S',
        stats: [
          { v: 'Tier 9', l: 'Power' },
          { v: 'Illusionist', l: 'Shadow and perception' },
          { v: '50', l: 'Looks 25' },
          { v: 'Secrets', l: 'Collects' },
        ],
        desc: `A disowned FeyVey noble and psychological warfare specialist whose partner was killed in war. She collects secrets as a hobby and as a weapon. Morally gray, not evil, and genuinely unpredictable. If her heart breaks or she feels too deeply, she loses control of her shadow Sofra. {{She betrays the Six in Book 4, for personal reasons rather than villainy, and returns in Book 6 for a defining moment.}}`,
        tells: [],
        bonds: [
          { n: 'Varel Shyre', d: `The only one who fully sees through her. She respects him for it and will never admit it.` },
        ],
      },
      {
        key: 'kharos', name: 'Kharos Dyth', epithet: 'The Crimson Herald', role: 'ELITE SIX',
        race: 'Torn · Reformed · 34', color: '#dc2626', rgb: '220,38,38', glyph: 'KD',
        stats: [
          { v: 'Tier 8–9', l: 'Power' },
          { v: 'Enhancer', l: 'Willpower' },
          { v: '34', l: 'Age' },
          { v: 'Apex Division', l: 'Former child soldier' },
        ],
        desc: `A Torn child soldier who defected when he was ordered to kill an innocent family. He was recruited to the Six about seventeen years ago to fill Oris Faren's seat. He is unbearably polite, a former weapon proving he isn't one, and says the name and race of everyone he has killed under his breath. In Book 1 Mallory heals him at the facility and they connect. {{He keeps secret contact with the Torn Underground. And under Elite Six orders, steered from above, he once killed a Dormose woman: Mallory's mother. He works it out late in Book 1. She doesn't know.}}`,
        tells: [
          `He thanks Mallory too many times and apologizes for bleeding on her.`,
        ],
        bonds: [
          { n: 'Mallory Voss', d: `{{He watches her grieve, knowing he's the reason.}}` },
          { n: 'Wolf Who Remembers', d: `{{He keeps showing up for him, as proof that a Torn person can choose differently.}}` },
        ],
      },
    ],
  },
  {
    key: 'shadows',
    title: 'THE SHADOWS AND THE STORM',
    blurb: `A father who owns what he loves, a fallen saint, the coalition behind him, and a demigod who belongs to no one.`,
    members: [
      {
        key: 'proctor', name: 'The Proctor', epithet: 'The Tragic Architect', role: 'PRIMARY ANTAGONIST',
        race: 'Primidian · Varek Voss', color: '#84cc16', rgb: '132,204,22', glyph: 'P',
        stats: [
          { v: '~40', l: 'Age' },
          { v: 'One', l: 'Glowing green eye' },
          { v: 'Irogarth', l: 'His facility' },
          { v: 'Always', l: 'Has a mango' },
        ],
        desc: `A charming, brilliant Primidian scientist who runs the facility at Irogarth of Primeridia, evaluating "unique users" for the Primidian government and for interests of his own. He speaks in complete lecture sentences, grades your answers out loud, and decides the price of every question. He seems to read minds. He doesn't. He reads people very well and gambles on the rest. {{He sent Arah's M letter himself, disguised as a Torn forgery. As a boy he was his father's experiment, tortured into awakening. He tried once to be someone else, with a Dormose woman whose surname he took, and the world killed her. Now he does to his daughter Elaara what was done to him, while loving her. His device would force every Sopher in range toward hybrid compatibility, without consent. Arah beats him at the end of Book 1 and leaves him alive. Glass Mother takes him before anyone comes back.}}`,
        tells: [
          `He calls Arah "young Faren." {{He knows exactly whose son he is.}}`,
          `{{The mangoes are a clock. They feed the ritual that keeps him alive. When he's late on one, his hands shake.}}`,
          `He cooks, a habit from his good years. He's a different man in a kitchen.`,
          `He has an android, and he is a slightly pervy old man about it.`,
        ],
        bonds: [
          { n: '{{Elaara}}', d: `{{His daughter, and his last test.}}` },
          { n: '{{Mallory Voss}}', d: `{{His daughter by the Dormose woman. He knows who she is. She doesn't know who he is.}}` },
          { n: '{{Oris Faren}}', d: `{{The man who freed him at sixteen. The boy who beats him is Oris's son.}}` },
        ],
        quote: { t: `{{If the experiments succeed, I remake the world. If they fail, you will carry my dream. Either way, you belong to my research.}}`, by: `{{The Proctor, to Elaara}}` },
      },
      {
        key: 'saint', name: 'Saint Fracture', epithet: 'The Shattered Saint', role: 'SINHARVESTERS · LEADER',
        race: 'Former Elite Six', color: '#a855f7', rgb: '168,85,247', glyph: 'SF',
        stats: [
          { v: 'Tier 9', l: 'Burning toward 10' },
          { v: 'Space Fracturing', l: 'Lost Art' },
          { v: 'Classified', l: 'Former name' },
          { v: 'Recruit', l: 'What he wants with Arah' },
        ],
        desc: `Leader of the SinHarvesters, and once a legendary Elite Six hero whose name is now classified. He held the line for an entire city against a catastrophic corruption event, and learned too late that the event had been staged to break him. His own compassion was the lever. He switched sides, and his mind fractured. He doesn't want to kill Arah. He wants to recruit him, and some of what he says isn't wrong. Only his method and his cost are monstrous. {{He was born of one of the Old Corrupted Gods, and chose good anyway, for a whole lifetime. Arah gives him a mercy kill in Book 6. He smiles, at peace for the first time.}}`,
        tells: [
          `His Sofra began as Illusion and was pushed until it tore real space.`,
          `The recruitment pressure gets heaviest after every loss Arah suffers.`,
        ],
        bonds: [
          { n: 'Broken Halo', d: `Imprinted on him like a child on a parent.` },
          { n: 'Arah Faren', d: `What he could have been.` },
        ],
        quote: { t: `{{I just wanted... to stop suffering.}}`, by: `{{His final words}}` },
      },
      {
        key: 'sinharvesters', name: 'The SinHarvesters', epithet: 'The Coalition', role: 'VILLAIN COALITION',
        race: 'Six core members', color: '#9f1239', rgb: '159,18,57', glyph: 'SH',
        stats: [
          { v: '6', l: 'Core members' },
          { v: 'Illegal', l: 'International' },
          { v: 'Saint Fracture', l: 'Leader' },
          { v: 'No', l: 'Khaervos is not one' },
        ],
        desc: `An illegal international coalition of six, led by Saint Fracture. Khaervos is not a member and sometimes aligns with them when it suits him. Neither side trusts the other. The Chrono who hijacked Arah's Redmare trial was a peon under one of them.`,
        tells: [],
        bonds: [
          { n: 'Glass Mother', d: `The clinical surgeon, raised in laboratories. She sees life as material, and even Saint Fracture is unsettled by her. "I will create the Perfect Hybrid." {{She was on the team that implanted Kaisho's gene, and she takes the Proctor after Book 1.}}` },
          { n: 'Wolf Who Remembers', d: `Torn, raised from birth as a weapon in the Apex program, and he still remembers his mother's face. {{In Book 6 he simply stops fighting.}}` },
          { n: 'Night-Tooth Raza', d: `A Harmonist FeyVey singer whose voice was stolen in Blackwatch experiments. {{Mallory gives it back for a few moments. Raza cries, and it plants her defection.}}` },
          { n: 'Broken Halo', d: `A Sol'Vastaran construct fused to a living host, loyal to Saint Fracture like a child. It asks, "Am I alive?" {{Its core detonates when he dies.}}` },
          { n: 'The Starved Prophet', d: `A former Oracle who ate corruption to silence his visions, and now sees every timeline at once. He predicts the others will die, and says so regularly. He is usually right.` },
        ],
      },
      {
        key: 'khaervos', name: 'Khaervos', epithet: `Treswack's Son`, role: 'WILDCARD · SEPARATE THREAT',
        race: 'Demigod · Oathless Sky', color: '#7c3aed', rgb: '124,58,237', glyph: 'Kh',
        stats: [
          { v: 'Tier 10', l: 'Equivalent, unstable' },
          { v: 'Chaos', l: 'Sofra' },
          { v: `6'7"`, l: 'Height' },
          { v: '80–100', l: 'Looks 30' },
        ],
        desc: `The son of Treswack, Absolute of chaos. His existence breaks cosmic law. He looks thirty and is nearly a hundred, with cyan-glowing eyes and his dead mother's earrings, his only sentimental possession. Dozens of women didn't survive bearing him. His mother did, long enough. He rules the Oathless Sky alone and answers to no faction. He holds Maera, a Chrono civilian, in the Tempest Throne. {{Treswack does not know his son exists until Khaervos dies in Book 6.}}`,
        tells: [],
        bonds: [
          { n: 'Maera', d: `"I don't know how to do this... being human. Teach me."` },
          { n: 'Arah Faren', d: `His foil. Chaos and clarity. Both sons of legends, both love deeply and express it badly.` },
        ],
        quote: { t: `You fight for love. I fight to keep it. We're not so different.`, by: 'Khaervos, to Arah' },
      },
      {
        key: 'maera', name: 'Maera', epithet: 'The Beauty of the Deep', role: 'WILDCARD',
        race: 'Chrono · Civilian', color: '#22d3ee', rgb: '34,211,238', glyph: 'M',
        stats: [
          { v: 'None', l: 'Sofra' },
          { v: 'Captive', l: 'Tempest Throne' },
        ],
        desc: `A Chrono civilian with no Sofra, no lineage and no power, captured by Khaervos. Her bioluminescent skin pulses with what she feels, and her hair moves as if it were still underwater. All she has is herself: her refusal to be broken and her choice to see him clearly. That is what gets through to him. Her story is not captivity bending her. She keeps her own eyes, and in every scene she is making a choice.`,
        tells: [],
        bonds: [
          { n: 'Khaervos', d: `Terror, then complexity, then connection, then a love neither of them dares say out loud. It doesn't fix him.` },
        ],
      },
    ],
  },
  {
    key: 'free',
    title: 'FREE AGENTS',
    blurb: `People who answer to no one, for very different reasons.`,
    members: [
      {
        key: 'sovren', name: 'Sovren', epithet: 'The Free Sovereign', role: 'INDEPENDENT',
        race: 'FeyVey / Regalus · Monolith', color: '#e2e8f0', rgb: '226,232,240', glyph: 'Sv',
        stats: [
          { v: 'Monolith', l: 'Publicly acknowledged' },
          { v: 'Both', l: 'Awakening marks' },
          { v: 'No', l: 'To the Elite Six, repeatedly' },
          { v: 'Constant', l: 'Bounties' },
        ],
        desc: `A FeyVey/Regalus hybrid with white locs and full Regalus tattoos: both awakening marks at once, a walking contradiction of the Splitting Ceremony's mythology. Institutions denied him for his blood his whole career, so he became a Monolith and left them no choice. He's the rare Monolith the world openly acknowledges. He has turned down the Elite Six more than once. Bounties follow him everywhere. Very few collect. "Sovren" was a warning label society gave him. He claimed it.`,
        tells: [],
        bonds: [
          { n: 'Arah Faren', d: `Something about Arah draws his attention. When they meet is still being written.` },
        ],
      },
      {
        key: 'ryn', name: 'Ryn', epithet: 'The Laughing Knife', role: 'FROM BOOK 2',
        race: 'Primidian · Pratvia', color: '#fb923c', rgb: '251,146,60', glyph: 'Ry',
        stats: [
          { v: 'Book 2', l: 'First appears' },
          { v: 'Higher', l: 'Than he lets on' },
        ],
        desc: `A Pratvia street kid with a joke for every silence. His sister used to say the world is sad as it is, have a laugh sometimes. He figures if he stops laughing, she's really gone. He's far stronger than he lets on, a survival habit from the undercity. {{He arrives as a spy for the organization that took him in. Arah finds out in Book 3 and forgives him. As repentance, Ryn commissions Arah's Sofra-tuned daggers. He is also Kaisho's brother.}}`,
        tells: [],
        bonds: [
          { n: 'Arah Faren', d: `His first real friend. {{The friendship survives the betrayal.}}` },
        ],
        quote: { t: `Look, I'm not saying I have a plan. I'm saying I have several bad ideas and one of them might accidentally work.`, by: 'Ryn' },
      },
    ],
  },
]

// Races & peoples archive.
// Source of truth: the races doc in the private Book repo (v13), with power system, locations and characters.
// Spoilers: wrap any text in {{ }} and the site blurs it until the reader taps it (or turns spoilers on).

export type Race = {
  key: string
  name: string
  epithet: string
  region: string
  color: string
  rgb: string
  motto?: string        // a canon tagline, shown in quotes
  hook?: string         // a short line for the card when there is no tagline
  stats: { v: string; l: string }[]
  desc: string
  sections: { title: string; items: string[] }[]
  people: { n: string; d: string }[]
}

export type RaceGroup = { key: string; title: string; blurb: string; members: Race[] }

export const RACE_GROUPS: RaceGroup[] = [
  {
    key: 'peoples',
    title: 'THE SIX PEOPLES',
    blurb: `About fifty million people live on Verallus. Most of them belong to one of these six. No people is one thing: every one of them is divided inside.`,
    members: [
      {
        key: 'regalus', name: 'Regalus', epithet: 'The Compassion-Driven People', region: 'SOUTHERN TERRA PRIMUS',
        color: '#fbbf24', rgb: '251,191,36',
        motto: `We build in circles. We sing our history. We protect the vulnerable. We remember.`,
        stats: [
          { v: '~8M', l: 'Population' },
          { v: '70–90', l: 'Lifespan (yrs)' },
          { v: `5'8"–6'0"`, l: 'Typical height' },
          { v: 'High', l: 'Awakening rate' },
        ],
        desc: `The people of the Heartlands: communal, spiritual, artisan, and fierce when they have to be. Knowledge lives in people, not books, so they sing their history. They have no kings, only community councils, with Ritualists for spiritual leadership, Lore-Weavers for memory and the Crusade Orders for war. Compassion is their strength, not their weakness, and protecting the vulnerable is a sacred duty.`,
        sections: [
          { title: 'LOOK', items: [
            `Rich warm skin, deep brown to golden brown. Lean to athletic, from generations of warrior tradition and field work.`,
            `Tightly curled to coiled hair, from birth. It's the everyday way to tell a Regalus from a FeyVey. Braid patterns show community and spiritual practice, and locs with gold beads are celebrated.`,
            `Brown eyes most often, sometimes amber or gold. A rare purple flicker shows in those with deep Sopher sensitivity.`,
          ] },
          { title: 'SOFRA', items: [
            `One of the highest awakening rates of any people. Healing and protective expressions are most common, then clarity and perception. Ice and cold are rare, and historically significant.`,
            `The awakening tattoo completes in three stages. Every Regalus is born with a small starter mark: that's the race. At the Pre-Awakening Ceremony the River of Echoes draws out a dim personal design: that's the individual. At awakening it fills in dark: that's the power.`,
          ] },
          { title: 'COMING OF AGE', items: [
            `The Pre-Awakening Ceremony has no fixed age. It happens at the River, whenever a child is ready, and the tattoo it draws is a promise to awaken.`,
            `The Redmare trial is a combat and Sofra challenge in the mid-to-late teens. Pass it and you're an adult in the community. Fail it and you try again. There's no shame in that.`,
            `Regalus progress along numbered trial paths called Crusades. The 12th Crusade is the combat path to adulthood. Others exist for healing, woodworking and more.`,
          ] },
          { title: 'WOUNDS', items: [
            `The Siege of Solhaven: six months of assault on a capital with no walls. They held it. Many alive today had grandparents on that line, and the pride runs as deep as the cost.`,
            `Regalus culture values all life. In practice, hybrid children still feel a quiet distance from full belonging.`,
          ] },
        ],
        people: [
          { n: 'Arah Faren', d: `Regalus, as far as he knows. {{His mother is Farrow.}}` },
          { n: 'Grandmother', d: `A retired Oracle, and the center of the Riverlands.` },
          { n: 'Leira', d: `Unawakened in one of the most awakened peoples on Verallus. In the cities she dreams of, that isn't a lack.` },
          { n: 'Master Zollu', d: `The Riverlands' Sofra instructor.` },
          { n: 'Varel Shyre', d: `The Regalus face on the Elite Six. {{He's Farrow.}}` },
        ],
      },
      {
        key: 'feyvey', name: 'FeyVey', epithet: 'The Intellectually Driven People', region: 'NORTHERN TERRA PRIMUS',
        color: '#a78bfa', rgb: '167,139,250',
        motto: `Power flows through discipline and study.`,
        stats: [
          { v: '~10M', l: 'Population' },
          { v: '70–100', l: 'Lifespan (yrs)' },
          { v: `5'7"–5'11"`, l: 'Typical height' },
          { v: 'Unstable', l: 'Awakening' },
        ],
        desc: `A glass-and-cloth culture that treats control, study and presentation as moral virtues. Architectural glass, fine lenses, illusion art, and tailoring where every element says something about rank or credentials. Their society is refined, orderly and comfortable: cold in its values, not its living conditions. When they awaken, their hair turns white. They are split by a cold war between Harmonists, who want reconciliation with the Regalus, and Purists, who believe the Absolutes rejected the FeyVey and hold the institutions to prove it.`,
        sections: [
          { title: 'LOOK', items: [
            `Olive to medium brown skin, slightly cooler in undertone than the Regalus. The cloistered city life trends lighter, but that's environment, not race: a FeyVey field worker reads darker than a scholar.`,
            `Straight to wavy hair from birth, often lighter in color before awakening. At awakening it turns white: the FeyVey mark, the parallel to the Regalus tattoo.`,
            `Brown to hazel eyes, sometimes deep green. Iris patterns appear in those with strong Sopher sensitivity.`,
          ] },
          { title: 'SOFRA', items: [
            `A high awakening rate, but unstable. A culture that suppresses emotion produces volatile early awakenings, and technically perfect users with hidden instabilities.`,
            `Perception and analysis are most common. Illusion is a FeyVey specialty. These are tendencies, not destiny: a FeyVey Enhancer or Healer is unusual, not unheard of.`,
          ] },
          { title: 'HARMONISTS AND PURISTS', items: [
            `Harmonists, about 60% and growing, want reconciliation and accept hybrids. It's a youth movement, led publicly by Minister Aelyndra, while Scholar Thessan exposes the historical lies.`,
            `Purists, about 40% and entrenched, control key institutions and the older generation. They are anti-hybrid and obsessed with bloodline purity. A hybrid in a Purist stronghold isn't just unwelcome. They're a target. Some Purist cells are funded by the Torn Overseer network.`,
            `FeyVey nobles are nearly all pure-blood, even the Harmonist ones.`,
          ] },
          { title: 'WOUNDS', items: [
            `Many FeyVey believe they were rejected by the Absolutes when the Terra Split happened. On the day of the Splitting Ceremony, nobody said that. Both peoples were simply bewildered, and the stories came in the months after.`,
            `{{The truth is that Auren split the Terra peoples into two complementary gifts so they would be stronger together. The rejection story was seeded by Torn propaganda in the weeks after the ceremony. When it comes out, it will be one of the most destabilizing revelations in the world.}}`,
          ] },
        ],
        people: [
          { n: 'Dylan', d: `A FeyVey veteran raised in a Regalus house, by an Oracle whose people the Purists helped hunt.` },
          { n: 'Shyrin', d: `A disowned FeyVey noble on the Elite Six.` },
          { n: 'Night-Tooth Raza', d: `A Harmonist singer whose voice was stolen.` },
          { n: 'Sovren', d: `Half FeyVey, half Regalus, and proof the Split was never a ranking.` },
        ],
      },
      {
        key: 'dormose', name: 'Dormose', epithet: 'The Heartwood People', region: 'WESTERN TERRA PRIMUS',
        color: '#4ade80', rgb: '74,222,128',
        motto: `We are the roots that hold. We are the memory of stone and the patience of trees. The forest is our home, our teacher, our flesh. We do not own the earth. We are of it.`,
        stats: [
          { v: '~3M', l: 'Population' },
          { v: '150–200+', l: 'Lifespan (yrs)' },
          { v: '8–18 ft', l: 'Height' },
          { v: 'Stable', l: 'Awakening' },
        ],
        desc: `Giants of the Heartwood, with bark or stone in their skin and moss in their hair. They measure time in tree rings, keep their history in roots, and treat every life as sacred, whether plant, animal or person. "Our strength is rooted, not displayed." They are capable of immense violence, and they treat it as the last resort. Nothing they wear is manufactured. Everything is gathered, and it looks grown from the forest.`,
        sections: [
          { title: 'LOOK', items: [
            `Earth-toned skin across a wide range: light warm tan, bark-brown, ash-gray, gray-green, stone-gray. Some Dormose look nearly human, some look like the forest itself, and the earthly ones lean toward bark or toward stone.`,
            `Gem deposits are optional, like freckles: amber, citrine, garnet, tourmaline, green. They grow with age and with depth of Sopher.`,
            `Wild hair, root-like, with moss and small ferns growing in it. It's never styled. It grows.`,
            `Builds run from slender to massive, and every one of them is dense like a tree trunk, not cut like a fighter.`,
          ] },
          { title: 'SOFRA', items: [
            `A moderate awakening rate, and extremely stable. Earth, endurance and nature are most common.`,
            `Dormose Sopher is extraordinarily dense. A Dormose at Tier 5 holds the raw Sopher of another people's Tier 7.`,
            `Natural empathy is part of their biology: they feel what others feel, long before any Sofra is involved.`,
          ] },
          { title: 'CULTURE', items: [
            `Elder councils, where age is authority. The Root-Keeper Archives hold their memory, and ancestors are said to speak through the roots.`,
            `The Stonecall Covenant for spiritual practice. The Branchwarden Rangers for defense, and only for defense.`,
            `Dormose can't lie.`,
            `"Mourai": keep your peace, may the tree's patience be with you. The saying grew from the Grand Oracle it's now named for.`,
          ] },
        ],
        people: [
          { n: 'Ouzai', d: `The Glass Mountain of the Elite Six, stone-leaning at the extreme end.` },
          { n: 'Mallory Voss', d: `Half Dormose, raised in Roothold. The gems, the mossy hair and the empathy came through. The height didn't.` },
          { n: 'Alisai', d: `Mallory's guardian, about ten feet tall, with a famous bakery.` },
          { n: 'Grand Oracle Mourai', d: `Five hundred years old, blind, bark-skinned and fifteen feet tall.` },
        ],
      },
      {
        key: 'torn', name: 'Torn', epithet: 'The People Called Vorath', region: 'THE ASHEN DOMINION',
        color: '#dc2626', rgb: '220,38,38',
        hook: `Their name was taken from them. The Underground is taking it back.`,
        stats: [
          { v: '~15M', l: 'Population' },
          { v: '60–80', l: 'Lifespan (yrs)' },
          { v: 'Ashen gray', l: 'Skin' },
          { v: 'Vorath', l: 'True name' },
        ],
        desc: `The largest people on Verallus, in the worst conditions, under Overseer rule in the Ashen Dominion. They may not legally leave it. "Torn" was never their name. The Overseers imposed it, meaning shattered, because stripping a people of their name strips them of who they are. Their real name is Vorath. Most Torn today don't remember it, and the Torn Underground speaks it carefully, as an act of reclamation. The Torn aren't evil. They're suffering. The people who run them are another matter.`,
        sections: [
          { title: 'LOOK', items: [
            `Ashen gray skin, from light ash to deep charcoal. It's the first thing anyone notices.`,
            `Gray eyes that flicker red under stress or rage.`,
            `Black to silver-gray hair. The Apex program enforces military cuts. Rebels wear their own styles as defiance.`,
            `Middle Ring Torn tend lean and wiry, from going hungry.`,
          ] },
          { title: 'UNDER THE OVERSEERS', items: [
            `The Apex program raises children as weapons from birth.`,
            `The Blackwatch's Assessors make quarterly compliance visits to other lands, officially to keep the balance.`,
            `The Torn Underground runs a resistance through the Underbelly Warrens and smuggles people across the Abyssal Scar.`,
            `{{The Overseer system was never a conquest. It was manufactured by scientists who wanted an unlimited supply of research subjects.}}`,
          ] },
          { title: 'WOUNDS', items: [
            `The Drowning of Kelmarth: a Torn invasion destroyed a Chrono city of more than 100,000 during the Shattered Century. The Chrono answered with a tidal wave that destroyed a Torn coastal city. Neither side has forgiven the other.`,
          ] },
        ],
        people: [
          { n: 'The Triplets', d: `Three Torn boys hidden in a Regalus basement.` },
          { n: 'Kharos Dyth', d: `An Apex child soldier who defected, now on the Elite Six.` },
          { n: 'Wolf Who Remembers', d: `Raised as a weapon. He still remembers his mother's face.` },
          { n: 'Cardeena', d: `A Blackwatch sentry with a red-glowing longsword. Arah kicks her.` },
        ],
      },
      {
        key: 'primidian', name: 'Primidian', epithet: 'The Technology-Driven People', region: 'SKYSPIRE ZENITH',
        color: '#38bdf8', rgb: '56,189,248',
        hook: `The lowest awakening rate on Verallus, so they built everything else.`,
        stats: [
          { v: '~5M', l: 'Population' },
          { v: '70–120', l: 'Lifespan (yrs)' },
          { v: `5'3"–5'7"`, l: 'Typical height' },
          { v: 'Lowest', l: 'Awakening rate' },
        ],
        desc: `The people of the floating continent, with the lowest Sofra awakening rate of any race. That one fact has shaped their history more than any other. Centuries of identity crisis resolved into one answer: if you can't have Sofra, build tools that do what it does. Many upper-city Primidians wear devices so constantly they feel like part of the body. Their society is split by altitude, between the sky utopia of Primeridia and the neon undercity of Pratvia beneath it, and haunted by what their scientists have done.`,
        sections: [
          { title: 'LOOK', items: [
            `Pale to light brown skin. Brown, hazel or occasionally pale blue eyes.`,
            `Average builds, trained for precision and endurance. Pratvia-raised Primidians run taller and more built, and scars are common.`,
            `A standard lifespan of 70 to 90. With tech-assisted life extension, 100 to 120.`,
          ] },
          { title: 'THE ALTITUDE DIVIDE', items: [
            `Primeridia, about 1.5 million: clean air, floating gardens, glass, ethical research and luxury.`,
            `Pratvia, about 3 million, below it: neon chaos, scrap towers, ten-plus layers of streets, the black market and the Null Labs.`,
          ] },
          { title: 'THE ETHICAL CRISIS', items: [
            `Primidian scientists were behind some of the worst atrocities of the Shattered Century and the Dark Age of Experimentation. The torture program that created the First Bender was Primidian-run.`,
            `The Ethical Research Alliance in the upper city is partly an answer to that guilt. The black market below is the other answer, from people who watched ethics fail and decided the rules mean nothing.`,
          ] },
        ],
        people: [
          { n: 'Yureth', d: `A Primidian inventor living among the Regalus.` },
          { n: 'The Proctor', d: `Mostly Primidian, with a small Torn share. Forced awake by torture, and he lost it later.` },
          { n: 'Kaisho', d: `Pratvia-raised, youngest on the Elite Six. {{His bending was implanted.}}` },
          { n: 'Ryn', d: `Pratvia street kid, from Book 2.` },
        ],
      },
      {
        key: 'chrono', name: 'Chrono', epithet: 'The Aquatic People', region: 'OCEANUS VASTARA',
        color: '#06b6d4', rgb: '6,182,212',
        hook: `Skin that shows what they feel, and cities hundreds of feet down.`,
        stats: [
          { v: '~6M', l: 'Population' },
          { v: '150+', l: 'Oldest (yrs)' },
          { v: `5'8"–6'2"`, l: 'Typical height' },
          { v: 'Stable', l: 'Awakening' },
        ],
        desc: `The people of Oceanus Vastara, whose great cities lie hundreds of feet beneath the surface. Their skin carries bioluminescent patterns that pulse with emotion and Sofra state, unique as fingerprints and impossible to fake, so Chrono read each other's health and honesty at a glance and are very hard to deceive. Their hair moves as if it's still underwater. On land they move too smoothly, as if the usual friction doesn't apply to them. They don't trust surface-dwellers, and they have their reasons.`,
        sections: [
          { title: 'LOOK', items: [
            `Deep blue-gray to slate skin, with patterns that pulse on their own.`,
            `Large eyes adapted to the deep, pale silver to deep aqua, faintly glowing in the dark.`,
            `Gills on the neck and ribs. Most Chrono can stay on land for a few hours, some for a whole day. More developed Chrono can stay above water for longer.`,
          ] },
          { title: 'SOFRA', items: [
            `A moderate, stable awakening rate. Water, flow, perception and healing are most common.`,
            `Deep Memory: Chrono can reach ancestral memories held in the collective Sopher of their people. It's memory of the past, not prophecy.`,
            `True age is hard to tell. High-tier Chrono can live past 150.`,
          ] },
          { title: 'WOUNDS', items: [
            `The Drowning of Kelmarth, a Chrono city of more than 100,000 destroyed by Torn invasion. The Chrono answered with a tidal wave that wiped out a Torn coastal city. Their territorial paranoia today traces straight back to it.`,
          ] },
        ],
        people: [
          { n: 'Aelira Nyru', d: `The Elite Six's healer, and a survivor of Kelmarth.` },
          { n: 'Maera', d: `A civilian with no Sofra, held in the Oathless Sky.` },
          { n: 'The Redmare Chrono', d: `The merman-shaped intruder who hijacked Arah's trial. {{A peon under one of the SinHarvesters.}}` },
        ],
      },
    ],
  },
  {
    key: 'hidden',
    title: 'HIDDEN, LOST, AND IN BETWEEN',
    blurb: `A people the world doesn't know exists, a civilization history erased, a bloodline that sees futures, and the children who belong to two peoples at once.`,
    members: [
      {
        key: 'farrow', name: 'Farrow', epithet: 'The Lost People', region: 'HIDDEN',
        color: '#7ecef4', rgb: '126,206,244',
        hook: `A people the world doesn't know exists.`,
        stats: [
          { v: 'Uncounted', l: 'Population' },
          { v: 'None', l: 'Public knowledge' },
          { v: 'Barred', l: 'Outsiders' },
          { v: '{{Catalyst}}', l: 'What they carry' },
        ],
        desc: `A people the general population doesn't know exists. {{The First Bender was one of them: a Farrow-Regalus girl who survived Torn experimentation 300 to 500 years ago and became the origin of modern bending. When she escaped, the Torn hunted every bending-compatible bloodline, and the Farrow went underground. They have no single look, because their blood has mixed for generations. What they carry is internal: the catalyst gene, invisible except in the Sopher signature of someone who knows what to look for. Every bender alive descends from their line.}}`,
        sections: [
          { title: 'WHERE', items: [
            `{{The Shaleh-Kai Enclave, an underground civilization behind four layers of deterrence. Lumenor, in the Frozen Wastes, once had Farrow there too.}}`,
          ] },
          { title: 'OUTSIDERS', items: [
            `{{No outsiders, by default. Their founder was tortured and hunted by the outside world.}}`,
            `{{Compassion is the only thing that moves them: an outsider who has done real good for people who couldn't help themselves, vouched for by one of the clan. Oris Faren was the first ever let in. Kaisho and Ryn are barred.}}`,
          ] },
          { title: 'THE FAREN NAME', items: [
            `{{"Faren" is a softened "Farrow." Arah's grandfather, a demigod, was engaged to the First Bender before she fled, and named his son for the people of the woman he never stopped looking for.}}`,
          ] },
        ],
        people: [
          { n: '{{Varel Shyre}}', d: `{{Farrow, hiding as Regalus on the Elite Six.}}` },
          { n: `{{Arah's mother}}`, d: `{{Farrow, with no Sofra of her own. She carried the catalyst and passed it to her son.}}` },
          { n: '{{Arah Faren}}', d: `{{Half Farrow, and he doesn't know it until Books 4 and 5.}}` },
        ],
      },
      {
        key: 'solarii', name: 'Solarii', epithet: 'The Vanished Ice Civilization', region: "FORMER SOL'VASTARA",
        color: '#93c5fd', rgb: '147,197,253',
        hook: `Their craft was Cryobending. Their history was erased.`,
        stats: [
          { v: 'Extinct', l: 'Status' },
          { v: '~4,000 yrs', l: 'Since collapse' },
          { v: 'Cryobending', l: 'Their craft' },
          { v: 'Frostwardens', l: 'Elite order' },
        ],
        desc: `The vanished people of Sol'Vastara, in what is now the Frozen Wastes. Their craft was Cryobending, cultivated among them by Auren, the Ninth Absolute, who walked with them as a friend. Their elite order, the Frostwardens, were spiritual warriors. {{The Old Corrupted Gods manipulated the Frostwardens into killing Auren. Treswack destroyed them for it, the civilization collapsed, and the surviving Absolutes erased the whole era from history.}} The Solarii were not the Farrow. The two carried bending down different paths.`,
        sections: [
          { title: 'WHAT REMAINS', items: [
            `Frozen temples, crystal palaces and ancient laboratories, above the water and below it. Echo Spirits haunt them.`,
            `The Glacial Choir, a cave where ice sings, is guarded by Cryos Wards: living glacier constructs they left behind, still working after thousands of years.`,
          ] },
        ],
        people: [
          { n: 'Auren', d: `The erased Ninth Absolute. {{His death became the River of Echoes.}}` },
        ],
      },
      {
        key: 'oracles', name: 'Oracle Bloodlines', epithet: 'A Condition, Not a Race', region: 'ANY PEOPLE',
        color: '#e9d5ff', rgb: '233,213,255',
        hook: `Possible futures, never fate. Every vision costs them life.`,
        stats: [
          { v: 'Any race', l: 'Who' },
          { v: 'Aestrenfall', l: 'Origin' },
          { v: 'Possible', l: 'Futures' },
          { v: '65–90 yrs', l: 'Since the Purge' },
        ],
        desc: `An inherited condition that can appear in any people, traced back to the vanished Aestrenfall scholars. Oracles see possible futures, never fixed fate. They sense lineage and corruption, walk in dreams, and feel a lie as it happens. Many are pale, delicate and nearly blind to the physical world, because they see the spiritual one instead. Heavy use burns their life away, so retiring is how an Oracle survives. About 65 to 90 years ago Torn Overseers and FeyVey Purists ran the Oracle Mass Purge to wipe the bloodlines out. The survivors went underground. {{The Oracle Network contacts Arah directly in Book 4.}}`,
        sections: [
          { title: 'ABILITIES', items: [
            `Prophecy of possible futures, which can be changed.`,
            `Sensing Sofra states, corruption and lineage in people nearby.`,
            `Dream-walking, lie detection, and a sense for dimensional weak points.`,
            `One visit to the Pale Court, ever: one question, asked of every Oracle who came before.`,
          ] },
        ],
        people: [
          { n: 'Grandmother', d: `A Lesser Oracle, retired. She survived the Purge as a teenager.` },
          { n: 'Grand Oracle Mourai', d: `The highest-ranking Oracle on Verallus.` },
          { n: 'The Starved Prophet', d: `A Purge survivor who ate corruption to silence the visions.` },
        ],
      },
      {
        key: 'mallows', name: 'Mallows', epithet: 'Small, Soft, and Sopher-Sensitive', region: 'FORESTS EVERYWHERE',
        color: '#d6d3d1', rgb: '214,211,209',
        hook: `When corruption comes, the mallows know first.`,
        stats: [
          { v: 'Forests', l: 'Everywhere' },
          { v: 'Sopher', l: 'Sensitive' },
          { v: 'Mallow-talk', l: 'Language' },
        ],
        desc: `Small rabbit-like creatures that live in forests all over Verallus and scatter for home at the first drop of rain. They are deeply Sopher-sensitive, which makes the mallow villages near the River of Echoes an early warning system: when corruption comes, the mallows know first. Some Dormose can talk with them. Mallory is one.`,
        sections: [],
        people: [
          { n: 'Moro', d: `A giant mallow, the size of a small horse. It looks harmless. It isn't. It's Mallory's Sova.` },
        ],
      },
      {
        key: 'hybrids', name: 'Hybrids', epithet: 'Children of Two Peoples', region: 'EVERYWHERE, RARELY',
        color: '#f0abfc', rgb: '240,171,252',
        hook: `Born to two peoples, and a target because of it.`,
        stats: [
          { v: 'Rare', l: 'Born' },
          { v: 'Unusual', l: 'Sofra' },
          { v: 'White locs', l: 'Terra hybrid tell' },
        ],
        desc: `Rare, unpredictable, and always unusual in their Sofra. Compatibility depends on the pairing. Chrono and Dormose almost never survive birth, while FeyVey and Regalus, both descended from the same people before the Split, are among the most compatible of all. Those hybrids are rare for political reasons, not biological ones. The Torn and their allies fear a united Terra Primus above everything, so a FeyVey/Regalus child is a target from birth. When one awakens, they carry both marks at once: Regalus tattoos, and white hair grown out as white locs. In a Purist space, that's a cosmological insult.`,
        sections: [],
        people: [
          { n: 'Sovren', d: `FeyVey/Regalus, white locs and full tattoos. The first of his kind named in the story.` },
          { n: 'Mallory Voss', d: `Dormose and Primidian.` },
          { n: 'Elaara', d: `Regalus and Primidian.` },
          { n: 'Arah Faren', d: `Regalus and... {{Farrow.}}` },
          { n: 'The Triplets', d: `Torn by birth. {{Stable forbidden fusions, living proof the Overseers' propaganda lied.}}` },
        ],
      },
    ],
  },
]

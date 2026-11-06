// Factions & organizations archive.
// Source of truth: the factions doc in the private Book repo (v14), with characters, races, timeline and locations.
// Spoilers: wrap any text in {{ }} and the site blurs it until the reader taps it (or turns spoilers on).

export type Alignment = 'HEROIC' | 'NEUTRAL' | 'ANTAGONISTIC' | 'COMPLEX' | 'SHADOW' | 'HISTORICAL'

export const ALIGN: Record<Alignment, { color: string; rgb: string }> = {
  HEROIC: { color: '#4fc3f7', rgb: '79,195,247' },
  NEUTRAL: { color: '#cbd5e1', rgb: '203,213,225' },
  ANTAGONISTIC: { color: '#ef4444', rgb: '239,68,68' },
  COMPLEX: { color: '#f59e0b', rgb: '245,158,11' },
  SHADOW: { color: '#a855f7', rgb: '168,85,247' },
  HISTORICAL: { color: '#a8a29e', rgb: '168,162,158' },
}

export type Faction = {
  key: string
  name: string
  role: string            // one line under the name; may hold {{spoilers}}
  align: Alignment
  stats: { v: string; l: string }[]
  desc: string
  sections: { title: string; items: string[] }[]
  links: { n: string; d: string }[]
}

export type FactionGroup = { key: string; title: string; blurb: string; members: Faction[] }

export const FACTION_GROUPS: FactionGroup[] = [
  {
    key: 'power',
    title: 'WHO HOLDS POWER',
    blurb: `The institutions above the nations, and the soldiers who guard them.`,
    members: [
      {
        key: 'elite6', name: 'The Elite Six', role: 'S-ranked international special forces', align: 'HEROIC',
        stats: [
          { v: '6', l: 'Exactly, always' },
          { v: 'Tier 7+', l: 'To be invited' },
          { v: '~100 yrs', l: 'Since founding' },
          { v: 'The Nexus', l: 'Headquarters' },
        ],
        desc: `The world's primary defense: six people above every national government, funded without limit by international treaty. Their existence is public. Their missions are classified. It's always exactly six. When one dies or steps down, recruitment begins at once, by invitation only. They were founded about a century ago, after the Cataclysm of Four Nations, and they answer to only four authorities: the High Oracles, the World Council, the Keeper of Archives, and in wartime emergencies, the Prime Ministerial Authority. Nobody else.`,
        sections: [
          { title: 'WHAT THEY DO', items: [
            `Hunt Stage 2 and 3 corruption creatures and seal corruption zones.`,
            `Shut down illegal fusion labs and free the experiment victims.`,
            `Maintain the seals on the Prime Corruptor's prison deep underground, with the Dormose.`,
            `Mediate between nations, escort dangerous relics, and watch the Blackwatch and the SinHarvesters.`,
            `Void Herald cycles: once per corruption cycle. It takes all six, and six is barely enough.`,
          ] },
          { title: 'INSIDE THE TEAM', items: [
            `Varel sees straight through Shyrin. She respects him for it and will never say so.`,
            `Kaisho's chaos sets Kharos off, and Kharos looks out for him like a younger brother anyway.`,
            `Aelira keeps everyone functional. It's exhausting.`,
            `Ouzai watches, and steps in so rarely that when he speaks, everyone listens.`,
          ] },
          { title: 'THE LAST GENERATION', items: [
            `The previous team lost two members in one generation: Oris Faren, executed for treason, and Saint Fracture, lost to corruption. Kharos replaced Oris about seventeen years ago. Kaisho replaced Saint Fracture three years ago, at sixteen.`,
            `With Oris went his Recall, which could move the team anywhere he had been. They could never be truly cornered. The current team has adapted, and the gap is acknowledged quietly.`,
            `Varelle, the Burnt Seraph, died fighting corruption. Wynn Ardent retired, and is still consulted.`,
            `{{Oris Faren isn't dead. And Arah joins the Six officially in Books 5 and 6.}}`,
          ] },
        ],
        links: [
          { n: 'Varel Shyre', d: `The Quiet Edge. Cryobender, Tier 8.` },
          { n: 'Aelira Nyru', d: `Moonwake Seraph. The healer, Tier 8 to 9.` },
          { n: 'Ouzai', d: `The Glass Mountain. A member from the start, Tier 9.` },
          { n: 'Kaisho', d: `The Sky Ripper. Youngest ever, Tier 7.` },
          { n: 'Shyrin', d: `The Veil-Split Widow. Collector of secrets, Tier 9.` },
          { n: 'Kharos Dyth', d: `The Crimson Herald. A defected Torn child soldier, Tier 8 to 9.` },
        ],
      },
      {
        key: 'council', name: 'The World Council', role: 'The Intercontinental Peace Council. Same body, two names.', align: 'NEUTRAL',
        stats: [
          { v: 'Accord of Ashes', l: 'Formed by' },
          { v: '~20 yrs', l: 'Since founding' },
          { v: 'On paper', l: 'Its authority' },
          { v: 'Suppression marks', l: 'It commissions' },
        ],
        desc: `The international governing body formed by the Accord of Ashes at the end of the Shattered Century, about twenty years before Book 1. It enforces international law, manages treaties, oversees the ban on forbidden research, and is supposed to protect the Oracle bloodlines. It largely fails at that last one. Its authority is significant on paper and variable in practice. The Torn Overseers have always ignored it when it suits them.`,
        sections: [
          { title: 'THE DEMI-GOD CONTAINMENT LAWS', items: [
            `Its most significant act: formal classification of demigods, and suppression marks that cap what they can express without touching what they could become.`,
            `The laws apply from Oris Faren's generation on. His father, a demigod who predates them, was never marked.`,
            `So the Elite Six answer to the same body that made laws to contain people like them. The series never resolves that tension.`,
          ] },
          { title: 'WHAT IT DOES NOT KNOW', items: [
            `{{The Maletonian War's real origins. That the Gray Assembly's leadership has been steered for centuries. That the Old Corrupted Gods exist at all.}}`,
          ] },
          { title: 'LATER', items: [
            `{{In Book 5, Arah testifies before the Council about the triplets. It debates whether stable forbidden fusions deserve legal protection. Verdict: asylum for the triplets, and Arah cleared.}}`,
          ] },
        ],
        links: [
          { n: 'The Elite Six', d: `Answer to it, as one of their four authorities.` },
          { n: 'Oris Faren', d: `Marked under its laws. Sentenced to death under its authority.` },
        ],
      },
      {
        key: 'keeper', name: 'The Keeper of Archives', role: 'One person. The most informed being on Verallus.', align: 'NEUTRAL',
        stats: [
          { v: '1', l: 'Person, not an office' },
          { v: 'All of it', l: 'Held in memory' },
          { v: 'Unknown', l: 'Name, race, origin' },
          { v: '{{Never}}', l: 'Succession' },
        ],
        desc: `Not a council, not an institution: a single individual. The Keeper is the custodian of the official historical record, one of the four voices the Elite Six answer to, and the most dangerous person on Verallus. The danger isn't combat. It's that every government secret ever written down sits in one head that no institution can reach. The Keeper doesn't need the documents. Everyone else does. Nobody knows the Keeper's name, race, or what they were before. The world believes the role passes by a private appointment known only to the current Keeper and the last. {{There has only ever been one. His name was Amael. Born mortal thousands of years ago, he was a genius who treated immortality as a puzzle, solved it, and never reckoned with what solving it meant. He fused his Sopher and Sofra into a closed loop that cannot run dry and cannot be broken. He is a Monolith, and the one mortal on record to reach Tier 10. Things float around him, and he's hard to track with your eyes even when he stands still. He looks divine and is exhausted by it, and he has been looking for a way to die for hundreds of years.}}`,
        sections: [
          { title: 'THE LIMITS', items: [
            `The Chronoscript Archive at the Shaleh-Kai Enclave is separate from the Keeper's record. The Keeper knows it exists and can't reach it. The gap between the two is where the most dangerous truths live.`,
            `{{The Keeper does not know about the Old Corrupted Gods, the full truth of Auren's message, or how the Gray Assembly has been steered.}}`,
          ] },
        ],
        links: [
          { n: 'The Elite Six', d: `Answer to the Keeper.` },
        ],
      },
      {
        key: 'imperials', name: 'The Imperials', role: `Each nation's most formidable soldiers`, align: 'NEUTRAL',
        stats: [
          { v: '~3', l: 'Per zone' },
          { v: 'Always one', l: 'On guard' },
          { v: 'Below the Six', l: 'Tier' },
        ],
        desc: `The peak of government military power: about three per zone, guarding the King or Prime Minister in shifts so one is always present. They operate below Elite Six tier, and work with special ops when a case is severe enough. {{About thirteen years before Book 1, a high-tier intruder got into the Shaleh-Kai Enclave chasing rumors that Oris Faren was alive. He may have been an Imperial. Which nation's, and who sent him, is still open.}}`,
        sections: [],
        links: [],
      },
      {
        key: 'aurora', name: 'Aurora Vanguard', role: 'Chrono-Regalus elite force', align: 'HEROIC',
        stats: [
          { v: '12', l: 'Members' },
          { v: 'Oceanic', l: 'Corruption containment' },
        ],
        desc: `A twelve-member Chrono-Regalus coalition that specializes in containing corruption at sea. It's one of the few cross-racial military units with a strong track record. Aelira had ties to it before she joined the Elite Six.`,
        sections: [],
        links: [
          { n: 'Aelira Nyru', d: `Connected to them before the Six.` },
        ],
      },
    ],
  },
  {
    key: 'against',
    title: 'WHO WANTS IT BROKEN',
    blurb: `A coalition of broken heroes, a black-ops network nobody can kill, and the two powers keeping Terra Primus divided on purpose.`,
    members: [
      {
        key: 'sinharvesters', name: 'The SinHarvesters', role: 'Illegal international villain coalition', align: 'ANTAGONISTIC',
        stats: [
          { v: '6', l: 'Core members' },
          { v: '6–4–2', l: 'Six wins, their wins, draws' },
          { v: 'Overseers', l: 'Main funding' },
          { v: 'Whispers', l: 'Public knowledge' },
        ],
        desc: `An illegal international strike team of six core members and a support network, unknown to the public and whispered about in the underworld. They're funded by the Torn Overseers first, then the Blackwatch, corrupt officials and wealthy extremists. Their leader, Saint Fracture, wants to control corruption rather than destroy it. If mortals could direct it instead of fearing it, he believes, they'd transcend what they are. His reasoning isn't insane. His methods are. Of twelve major clashes with the Elite Six, the Six have won six, the SinHarvesters four, and two ended in stalemate.`,
        sections: [
          { title: 'THE SIX', items: [
            `Saint Fracture, the leader: a fallen Elite Six hero, Tier 9 and burning toward 10.`,
            `Glass Mother: the clinical surgeon. "I will create the Perfect Hybrid."`,
            `Wolf Who Remembers: a Torn weapon who remembers being loved.`,
            `Night-Tooth Raza: a singer whose voice was stolen.`,
            `Broken Halo: a Sol'Vastaran construct that asks if it's alive.`,
            `The Starved Prophet: a former Oracle who sees every timeline at once.`,
          ] },
          { title: 'IN BOOK 1', items: [
            `The Chrono who hijacked Arah's Redmare trial was a peon under one of them. He doesn't report to the Proctor. Which member sent him, and why they wanted Arah tested, is still open.`,
          ] },
        ],
        links: [
          { n: 'Khaervos', d: `Not a member. He and the SinHarvesters use each other when it suits them, and neither trusts the other.` },
          { n: 'Arah Faren', d: `Saint Fracture wants to recruit him, not kill him.` },
          { n: '{{The Old Corrupted Gods}}', d: `{{Saint Fracture's fall fits their pattern exactly. He may be one of their vessels and not know it.}}` },
        ],
      },
      {
        key: 'blackwatch', name: 'The Blackwatch', role: 'Illegal decentralized black ops, cells worldwide', align: 'ANTAGONISTIC',
        stats: [
          { v: 'None', l: 'Single leader' },
          { v: 'Cells', l: 'Everywhere' },
          { v: 'Quarterly', l: 'Assessor visits' },
          { v: 'Impossible', l: 'To wipe out' },
        ],
        desc: `A black-ops network with no single leader. Kill one cell and the rest carry on, and reforming after an Elite Six raid is standard procedure. Rogue Torn operatives, corrupt FeyVey agents, renegade Primidian scientists, mercenaries, voluntary corruption hosts and failed-experiment survivors. They run forbidden fusion labs, capture children (hybrids and Oracle bloodlines especially), assassinate reformers, sell forbidden tech and harvest corruption. Funded by the Torn Overseers first, then FeyVey Purist extremists, Pratvia syndicates and corrupt governments.`,
        sections: [
          { title: 'THE ASSESSORS', items: [
            `The Blackwatch's compliance arm. Every quarter they visit the Regalus and other communities, officially to "keep the balance."`,
            `In reality they monitor Sofra anomalies, enforce World Council regulations, investigate flagged people, and remove "illegals": anyone born with forbidden heritage, abilities or bloodlines.`,
            `Some of the people they take are never seen again. Arah has watched executions. The community knows, and nobody can say it out loud.`,
            `They travel with the Retund, enforcement animals somewhere between a dog and a cat, trained to track Sofra signatures.`,
            `Varel Shyre sometimes escorts the visits to the Riverlands, presented as a Regalus man revisiting his old hometown.`,
          ] },
        ],
        links: [
          { n: 'The Proctor', d: `Never a member, but he used their resources and shared research. After his fall, that trail is what the Elite Six follow.` },
          { n: 'Arah Faren', d: `{{They know his lineage, have watched his family for years, and know where the triplets came from. They try to kidnap him in Book 3.}}` },
          { n: '{{The Old Corrupted Gods}}', d: `{{Which cells survive, which research gets funded and which leaders rise all follow a pattern no mortal mind is directing.}}` },
        ],
      },
      {
        key: 'overseers', name: 'The Torn Overseers', role: 'Rulers of the Ashen Dominion', align: 'ANTAGONISTIC',
        stats: [
          { v: '~15M', l: 'People they rule' },
          { v: '"Torn"', l: 'The name they imposed' },
          { v: 'Never', l: 'Obey the Council' },
        ],
        desc: `The rulers of the Ashen Dominion. They named the Vorath "Torn," meaning shattered, run the Apex program that raises children as weapons, fund the SinHarvesters and the Blackwatch, and pour money into Purist politics in the FeyVey Territories. Their strategy is consistent across everything they do: a united Terra Primus is their worst outcome, so they keep the Regalus and FeyVey divided, and they target the hybrids who prove the two belong together. {{The system they run was never a conquest. Scientists manufactured it to create an unlimited supply of research subjects. "Torn" was their own name first, carried by their hidden lineage for thousands of years. And the Overseers are being steered without knowing it.}}`,
        sections: [
          { title: 'WHAT THEY HAVE DONE', items: [
            `The Oracle Mass Purge, run with the FeyVey Purists about 65 to 90 years ago.`,
            `The Maletonian War: an Overseer-directed incursion onto Terra Primus, 10 to 15 years ago.`,
            `The forged summons: a scheme decades old that lures gifted children to the boundary zone with fake military letters. Yureth was one of them, at ten.`,
            `They ignore the World Council whenever it suits them.`,
          ] },
          { title: 'LATER', items: [
            `{{The Torn revolution sparks in Book 5. The Overseers fall in Book 6.}}`,
          ] },
        ],
        links: [
          { n: 'The Torn Underground', d: `The resistance building quietly under them.` },
          { n: 'The FeyVey Purists', d: `Allies through trade and propaganda.` },
        ],
      },
      {
        key: 'purists', name: 'The FeyVey Purists', role: 'Extremist faction of the FeyVey', align: 'ANTAGONISTIC',
        stats: [
          { v: '~40%', l: 'Of the FeyVey' },
          { v: 'Key institutions', l: 'Control' },
          { v: 'Anti-hybrid', l: 'Doctrine' },
        ],
        desc: `About 40% of the FeyVey, entrenched in the older generation and in key institutions. They believe the Absolutes rejected the FeyVey at the Terra Split, and they are fixated on keeping the bloodline "pure." A hybrid in a Purist stronghold isn't just unwelcome. They're a target. Purists hold old trade ties with Torn leadership, and some of their cells connect to extremists. When Torn soldiers killed FeyVey civilians in the Maletonian War, Torn propaganda produced cover stories, and the Purists accepted them, because the alternative was too much to sit with.`,
        sections: [
          { title: 'WHAT THEY HAVE DONE', items: [
            `Coordinated the Oracle Mass Purge with the Torn Overseers.`,
            `{{Purist-aligned officials gave the Proctor's facility the political protection it needed.}}`,
            `Some Purist cells are funded by the Overseer network.`,
          ] },
          { title: 'THE LIE UNDERNEATH', items: [
            `{{The Split was never a ranking. Auren gave the two peoples complementary gifts so they would be stronger together, and the rejection story was Torn propaganda. The Purists' whole identity rests on it.}}`,
          ] },
        ],
        links: [
          { n: 'The Harmonist Coalition', d: `The other 60%, and growing.` },
        ],
      },
    ],
  },
  {
    key: 'resist',
    title: 'WHO FIGHTS BACK',
    blurb: `Resistance in the dark, reconciliation in the open, and prophets in hiding.`,
    members: [
      {
        key: 'underground', name: 'The Torn Underground', role: 'Resistance network of the Vorath', align: 'HEROIC',
        stats: [
          { v: 'Cells', l: 'Structure' },
          { v: 'Secret', l: 'Leadership' },
          { v: 'Runners', l: 'And coded messages' },
        ],
        desc: `The resistance inside the Ashen Dominion. Their goal: overthrow the Overseers, free the Vorath, and give them back their true name. They're built in cells for safety, led by a council with secret identities, and they talk through coded messages and runners. They fund themselves through theft, sympathetic nations and some Harmonist money. Their routes run through the Underbelly Warrens and across the Abyssal Scar. They got the triplets out of the Middle Ring as infants.`,
        sections: [
          { title: 'THE ARC', items: [
            `Books 1 to 3: organizing below the surface.`,
            `{{Book 4: public actions begin, and the Overseers crack down violently.}}`,
            `{{Book 5: the triplets become public, the Underground's most powerful symbol, and the revolution sparks. Book 6: the Overseers fall, and a new government forms in the epilogue.}}`,
          ] },
        ],
        links: [
          { n: 'The Triplets', d: `Smuggled out by the Underground as infants.` },
          { n: '{{Kharos Dyth}}', d: `{{Their secret contact on the Elite Six.}}` },
          { n: '{{The Exiled Philosopher}}', d: `{{Their internal leader, who emerges in Book 5.}}` },
        ],
      },
      {
        key: 'harmonists', name: 'The Harmonist Coalition', role: 'FeyVey reconciliation movement', align: 'HEROIC',
        stats: [
          { v: '~60%', l: 'Of the FeyVey' },
          { v: 'Growing', l: 'Youth-led' },
          { v: 'Public', l: 'Organization' },
        ],
        desc: `The FeyVey majority that wants to reconcile with the Regalus, reject Purist extremism, and heal the wound of the Terra Split. A public, democratic movement, led politically by Minister Aelyndra, with Scholar Thessan exposing the historical lies. The youth dominate it, through cultural events and protests. The Maletonian War gave them their martyrs and their strongest argument: FeyVey graves dug by Torn hands, and a generation of young FeyVey who fought beside the Regalus and came home changed.`,
        sections: [
          { title: 'THE SILENT CHOIR', items: [
            `The Harmonists' counter-intelligence arm. They gather information on Purist activity, protect Harmonist leaders from assassination, and keep covert lines open across racial borders. The name is ironic: they're very quiet about what they do.`,
          ] },
          { title: 'LATER', items: [
            `{{When the truth about the Split comes out in Books 4 and 5, the Harmonists gain their most powerful argument.}}`,
          ] },
        ],
        links: [
          { n: 'Arah Faren', d: `His existence ends up validating everything they believe.` },
          { n: 'Dylan', d: `A FeyVey veteran who fought beside the Regalus.` },
        ],
      },
      {
        key: 'oracles', name: 'The Oracle Network', role: 'The surviving prophets, in hiding', align: 'HEROIC',
        stats: [
          { v: 'Secret', l: 'Since the Purge' },
          { v: 'Dreams', l: 'How they talk' },
          { v: 'Survive', l: 'The mission' },
        ],
        desc: `What's left of the Oracle bloodlines after the Purge, operating in deep secrecy: no public prophecy, no public identity. They talk through coded messages and dream-walking, and avoid meeting in person when they can. Their mission is preservation: stay alive, protect the bloodlines, keep the minimum knowledge alive. Arah's grandmother was one of them. They noted his strange Sopher signature at birth and have been watching him ever since. {{They contact him directly in Book 4. And one of them will spend their single visit to the Pale Court asking the question that reveals the truth about Auren.}}`,
        sections: [
          { title: 'THE PURGE', items: [
            `{{The coordination across nations and ideologies, the speed, the choice of targets: the Oracles who could perceive the deepest truths. Yureth's research suggests the Purge wasn't just politics.}}`,
          ] },
        ],
        links: [
          { n: 'Grandmother', d: `A member, retired.` },
          { n: 'The High Oracles', d: `One of the Elite Six's four authorities.` },
        ],
      },
    ],
  },
  {
    key: 'orders',
    title: 'KEEPERS OF QUIET KNOWLEDGE',
    blurb: `Spiritual orders guarding sacred places, and remembering more than they know.`,
    members: [
      {
        key: 'stewards', name: 'Order of Echo Stewards', role: 'Guardians of the River of Echoes', align: 'HEROIC',
        stats: [
          { v: '~50', l: 'Members' },
          { v: 'Regalus', l: 'Tradition' },
          { v: 'The River', l: 'What they guard' },
        ],
        desc: `About fifty Regalus Ritualists, retired warriors and a few Oracles who protect the River of Echoes from pollution and corruption, guide pilgrims, keep the rituals and preserve the oral histories. The mallow villages along the River are their early warning system. {{They grant Arah unrestricted access to the River, something they almost never do, because they recognize his grandmother's Echo Spirit there. What they don't know: the River isn't passive divine residue. It's a deliberate construction by Auren, tuned to Cryobending. Their rituals have kept his message reachable for thousands of years without knowing what they were protecting.}}`,
        sections: [],
        links: [],
      },
      {
        key: 'tidecallers', name: `Tidecallers' Convocation`, role: 'Chrono order of Deep Memory', align: 'HEROIC',
        stats: [
          { v: 'Deep Memory', l: 'Communion' },
          { v: 'Storms', l: 'And currents, predicted' },
        ],
        desc: `A Chrono order that communes with Deep Memory, predicts storms and currents, performs bonding rituals and preserves the knowledge of the sea. Aelira Nyru trained here before the Elite Six, and her healing and Deep Memory grew here. During the Quiet Era they warned of "ice returning" and "fractured blood awakening." Most people dismissed it.`,
        sections: [],
        links: [
          { n: 'Aelira Nyru', d: `A member before the Six.` },
        ],
      },
      {
        key: 'stoneguard', name: 'The Stoneguard Covenant', role: 'Ancient Dormose protectors', align: 'HEROIC',
        stats: [
          { v: 'Defensive', l: 'Only' },
          { v: 'Sacred groves', l: 'What they guard' },
        ],
        desc: `Ancient Dormose protectors of sacred groves and natural sites. Purely defensive: they guard the Heartwood's sacred places from intruders, ecological damage and the spread of corruption. They work closely with the Dormose Conservation Alliance. When Mallory comes home to Roothold in Book 1, it's a stoneguard who brings word that she's wanted.`,
        sections: [],
        links: [],
      },
    ],
  },
  {
    key: 'science',
    title: 'SCIENCE AND THE UNDERCITY',
    blurb: `The people who study power, the people who sell it, and the line between them.`,
    members: [
      {
        key: 'era', name: 'Ethical Research Alliance', role: 'Science done right', align: 'HEROIC',
        stats: [
          { v: 'Primeridia', l: 'Headquarters' },
          { v: 'Consent', l: 'Their rule' },
        ],
        desc: `A multi-national scientific cooperative headquartered in Primeridia's upper city. They study Sofra safely, build non-invasive tools, develop medical applications and oversee Primidian research ethically. Their projects include corruption detection, healing amplifiers, consensual Sopher mapping and theoretical bending research. They are partly an answer to Primidian guilt. They oppose everything the Blackwatch, the Gray Assembly and Glass Mother do. {{After Glass Mother is captured, they take her on for deprogramming research.}}`,
        sections: [],
        links: [],
      },
      {
        key: 'gray', name: 'The Gray Assembly', role: '"Science requires sacrifice. Progress demands risk."', align: 'COMPLEX',
        stats: [
          { v: 'Long Centuries', l: 'Founded in' },
          { v: 'The middle', l: 'Allied with no one' },
        ],
        desc: `A morally ambiguous research collective that tests ethical boundaries, attempts "safe" fusions, studies corruption and develops weapons. Not evil, but dangerous. Governments fund them covertly, alongside wealthy patrons and black-market sales. They aren't allied with the Blackwatch or the SinHarvesters, or with the Elite Six or the Ethical Research Alliance. They sit genuinely in the middle, and that's what makes them dangerous. Yureth was one of their scientists, and walked away. {{Their leadership has been steered by the Old Corrupted Gods at key moments for centuries. Not the rank and file: whoever sits at the top, generation after generation. Research that would expose the Old Gods gets buried. Research that builds their vessels gets quietly accelerated.}}`,
        sections: [],
        links: [
          { n: 'Yureth', d: `A former Assembly scientist, retired among the Regalus.` },
        ],
      },
      {
        key: 'chrome', name: 'The Chrome Assembly', role: 'Primidian tech elite, outside the law', align: 'COMPLEX',
        stats: [
          { v: 'Hidden', l: 'Headquarters, Skyspire' },
          { v: 'None', l: 'Ethical oversight' },
        ],
        desc: `Primidian tech elite who operate outside the law. The Elite Six consider them a threat, not because they're openly villainous, but because they push technology with no ethical oversight, in ways that could tip the balance of power. Their research overlaps uncomfortably with what the Blackwatch and the Gray Assembly do, though they'd reject the comparison.`,
        sections: [],
        links: [],
      },
      {
        key: 'syndicates', name: 'The Pratvia Syndicates', role: 'Organized crime of the undercity', align: 'COMPLEX',
        stats: [
          { v: '4', l: 'Major syndicates' },
          { v: 'Pratvia', l: 'Home' },
        ],
        desc: `Survival-driven organized crime in the neon undercity beneath Primeridia, occasionally useful to everyone. Kaisho grew up there and knows every syndicate's patterns, which lets the Elite Six move through Pratvia in ways no other government-aligned force can.`,
        sections: [
          { title: 'THE FOUR', items: [
            `The Null Cartel: illegal Sofra suppression devices and forbidden tech. Works with the Blackwatch.`,
            `The Red Merchants: stolen relics and forbidden items. The SinHarvesters shop there.`,
            `The Shadow Guilds: assassination. Governments hire them in secret.`,
            `The Data Lords: intelligence and blackmail. Every faction uses them eventually.`,
          ] },
          { title: 'SMALLER SHADOWS', items: [
            `{{Ryn was recruited by a smaller, more shadowed Pratvia organization that gave him a family when he had nothing. It's the one that sends him to spy on Arah.}}`,
          ] },
        ],
        links: [],
      },
      {
        key: 'lumini', name: 'The Lumini Fly Black Market', role: 'Trade in living light', align: 'COMPLEX',
        stats: [
          { v: 'Banned', l: 'In most nations' },
          { v: 'Hunted', l: 'By the Dormose' },
        ],
        desc: `A black market built on lumini flies: live ones sold as portable aura scanners, Resonance Dust (a drug made from them), resonance tattoo ink, and corruption detection charms. Most nations ban it. The Elite Six enforce the ban when they can, and the Dormose actively hunt poachers. But the charms are also bought by people who need a warning about corruption and can't get the Elite Six's attention.`,
        sections: [],
        links: [],
      },
    ],
  },
  {
    key: 'history',
    title: 'HISTORY AND SHADOW',
    blurb: `A war that's officially over, and the thing behind all of it.`,
    members: [
      {
        key: 'maletonian', name: 'The Maletonian War', role: 'A regional war, 10 to 15 years ago', align: 'HISTORICAL',
        stats: [
          { v: '10–15 yrs', l: 'Ago' },
          { v: 'Over', l: 'Officially' },
          { v: 'M', l: 'The letter' },
        ],
        desc: `Not a great war like the Shattered Century, but brutal for everyone who served. A Torn Overseer incursion crossed onto Terra Primus under military escort through the Abyssal Scar, against a coalition of Regalus, Dormose and some FeyVey forces. The Torn ignored the conventions of war whenever it gave them an edge. "Maletonian" is the name of the war, not a people. It's officially over. Its veterans are still carrying it.`,
        sections: [
          { title: 'THE M LETTER', items: [
            `Drafted citizens received a red envelope holding a single letter, M, and their division. Anyone old enough to remember the war fears it: a piece of paper that took children and sent back veterans, or didn't send them back at all.`,
          ] },
          { title: 'THE FIVE DIVISIONS', items: [
            `Research and Intel: strategy, code-breaking, weapon design. Yureth was its chief.`,
            `Cavalry and Assault: the front line, and the bloodiest division. Dylan was drafted into it.`,
            `Arms and Tails Supply, and Medical, which leaned heavily on Healers.`,
            `The Gifted Division: S-tier covert operatives. Names classified.`,
          ] },
          { title: 'THE FEYVEY FRACTURE', items: [
            `When Torn soldiers killed FeyVey civilians, Torn propaganda blamed the Regalus, and the Purists believed it. The Harmonists had watched it happen. The war gave them their martyrs, and their movement grew faster than the Overseers ever planned for.`,
            `{{Its deeper origins: escalation cultivated at the top of governments and science organizations. The Overseers were being steered without knowing it.}}`,
          ] },
        ],
        links: [
          { n: 'Yureth', d: `Chief of research and intel.` },
          { n: 'Dylan', d: `Drafted by M letter. Most of his unit died.` },
        ],
      },
      {
        key: 'oldgods', name: 'The Shadow Threat', role: '{{The Old Corrupted Gods}}', align: 'SHADOW',
        stats: [
          { v: '{{4,000 yrs}}', l: 'Preparing' },
          { v: '{{None}}', l: 'Headquarters, members' },
          { v: '{{Cannot}}', l: 'Manifest' },
        ],
        desc: `Not a faction in any normal sense. Something behind the factions. {{The Old Corrupted Gods: diminished, ancient divinities from before the current order, not among the ten Absolutes, displaced long ago. The Absolutes believe that older order is only a myth. They can't manifest on Verallus. They seep in through corruption itself and work through influence: they don't possess anyone, they widen the cracks in people already broken. Their goal is revenge on the Absolutes, and since they can't fight them directly, they build mortal vessels to do it for them. The Absolutes don't know they exist. Auren sensed them, and died before he could tell anyone.}}`,
        sections: [
          { title: 'THEIR WORK', items: [
            `{{The Frostwarden conspiracy, about 4,000 years ago: Auren killed by Frostwardens they had cultivated into fear. Their first success.}}`,
            `{{The erasure of the Icebirth Era. They didn't cause it, but their part was buried with everything else.}}`,
            `{{Centuries of steering at the top of the Gray Assembly, escalations in the Shattered Century, the Dark Age of Experimentation, and the Oracle Mass Purge.}}`,
            `{{The Maletonian War, on a smaller scale. Yureth saw the pattern and can't prove it.}}`,
          ] },
          { title: 'WHY IT MATTERS', items: [
            `{{Several factions that believe they're independent are being used. The Elite Six's enemies aren't the worst threat on Verallus. The worst threat is the pattern behind the enemies, which the Six can't see and can't fight.}}`,
          ] },
        ],
        links: [
          { n: '{{Saint Fracture}}', d: `{{Fits their vessel pattern exactly.}}` },
          { n: '{{Yureth}}', d: `{{Holds fragments of the truth.}}` },
        ],
      },
    ],
  },
]

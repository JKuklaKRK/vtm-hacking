export interface FileEntry {
  fileId: number
  filename: string
  content: string
  encryptedName?: string,
  img?: string
}

export interface Category {
  catId: number
  catName: string
  files: FileEntry[]
}

export let categories: Category[] = [
  {
    catId: 1,
    catName: 'Clans',
    files: [
      { fileId: 1, filename: 'brujah_notes', content: 'Brujah are often described as rebels, but this description hides a deeper truth. Their rage is not chaotic by nature, but ideological. Many elders whisper that Brujah were once philosophers and kings, not anarchs. When dealing with a Brujah, remember that appealing to their sense of justice may calm them more than threats. However, once their temper is unleashed, logic ceases to matter. Rumors persist of Brujah elders manipulating revolutions from the shadows, guiding mortal unrest to serve ancient grudges.' },
      { fileId: 2, filename: 'toreador_observations', content: 'Toreador claim to be patrons of art, but their true obsession is emotion. They feed on beauty, suffering, passion, and despair with equal hunger. In social encounters, never underestimate how much they notice: a flicker of doubt, a stain on a sleeve, a lie poorly delivered. Toreador favor subtle influence over direct force, and many of their feuds are fought with reputation rather than blood. Insulting their taste is often more dangerous than threatening their unlives.' },
      { fileId: 3, filename: 'ventrue_hierarchies', content: 'The Ventrue see themselves as rulers by divine right, though they rarely phrase it so bluntly. Their power lies in structure: debts, oaths, and long-standing agreements. When negotiating with a Ventrue, understand that nothing is free and everything is recorded, if not on paper then in memory. Breaking a promise to a Ventrue is remembered for decades. Some claim that entire cities are run according to ancient Ventrue playbooks passed down since Rome.' },
      { fileId: 4, filename: 'nosferatu_networks', content: 'For fuckin sake! Do not show that to anyone! I beg you! Come on! I\'m giving you few more entrances! Just DONT SHOW IT TO ANYONE!', img: 'nosfersfeet.png' },
      { fileId: 5, filename: 'malkavian_fragments', content: 'Malkavian madness is often misunderstood. It is not randomness, but a different pattern of perception. Their prophecies are rarely clear, but often accurate in retrospect. Listening to a Malkavian requires patience and an open mind; dismissing them outright has doomed many Kindred. Some elders suspect that the clan shares a fractured collective insight, glimpses of a truth too vast to comprehend without breaking the mind.' }
    ]
  },
  {
    catId: 2,
    catName: 'Masquerade',
    files: [
      { fileId: 6, filename: 'breach_protocols', content: 'The Masquerade survives not through denial, but through swift and decisive action. Small breaches are tolerated if they can be explained away, but patterns draw attention. Kindred who rely too heavily on technology risk exposure through data aggregation. Elders recommend redundancy: false leads, compromised witnesses, and scapegoats. Remember that mortals want to believe comforting lies, but once convinced otherwise, they become dangerous in unpredictable ways.' },
      { fileId: 7, filename: 'media_manipulation', content: 'Control of information channels is essential to maintaining the Masquerade. Sensational stories can be redirected, reframed, or drowned out by competing narratives. Influencing editors and producers is often more effective than silencing journalists. Some Princes maintain entire departments devoted to steering public discourse. A single viral incident, if left unchecked, can unravel decades of careful concealment.' },
      { fileId: 8, filename: 'cleanup_operations', content: 'After violence, speed matters more than subtlety. Witnesses must be managed within hours, not nights. Blood traces can be explained, but patterns of drained bodies attract scrutiny. Specialized Kindred handle cleanup, often working alongside ghouled mortals who believe they serve private security firms. Failure to act decisively marks a vampire as a liability in the eyes of the domain.' },
      { fileId: 9, filename: 'digital_threats', content: 'Surveillance cameras and smartphones have made feeding more dangerous than ever. Digital records do not forget, and deleting data often leaves traces. Princes increasingly rely on tech-savvy Kindred or retainers to manage this threat. However, dependence on such specialists creates new vulnerabilities, as knowledge itself becomes leverage.' },
      { fileId: 10, filename: 'public_incidents', content: 'Not every incident can be erased. Sometimes damage control means shaping the narrative rather than hiding it. Urban legends, hoaxes, and conspiracy theories can serve as useful smoke screens. Encouraging disbelief may be more effective than censorship, especially among younger mortals conditioned to doubt official statements.' }
    ]
  },
  {
    catId: 3,
    catName: 'Elysium',
    files: [
      { fileId: 11, filename: 'rules_of_haven', content: 'Elysium is neutral ground in theory, but never in practice. Violence is forbidden, yet social conflict flourishes. Words become weapons, favors become shields. Knowing when to speak and when to remain silent is vital. Many Kindred have lost more in Elysium through careless remarks than they ever did in open conflict.' },
      { fileId: 12, filename: 'status_games', content: 'Status within Elysium is fluid, shaped by rumor and perception. A single public slight can diminish standing, while a well-timed gesture of respect can elevate it. Elders watch these interactions closely, often rewarding those who demonstrate restraint and punishing those who embarrass the domain.' },
      { fileId: 13, filename: 'hidden_agendas', content: 'Every gathering in Elysium serves multiple purposes. Alliances are tested, secrets exchanged, and enemies measured. Pay attention to who speaks with whom, and who avoids eye contact. Absence can be as meaningful as presence, and invitations withheld often signal deeper conflicts.' },
      { fileId: 14, filename: 'boons_exchange', content: 'Boons are the true currency of Elysium. They bind Kindred together in invisible webs of obligation. Even minor favors accumulate, and calling in a boon at the wrong moment can be disastrous. Wise vampires track their debts meticulously and avoid owing more than they can afford to repay.' },
      { fileId: 15, filename: 'sanctity_violations', content: 'Breaking the peace of Elysium invites severe punishment. However, enforcement is selective and political. Those with sufficient influence may escape consequences, while lesser Kindred are made examples of. Understanding who truly enforces the rules is as important as knowing the rules themselves.' }
    ]
  },
  {
    catId: 4,
    catName: 'Politics',
    files: [
      { fileId: 16, filename: 'praxis_claims', content: 'Praxis is rarely seized outright; it is accumulated. Influence over mortal institutions, control of resources, and loyalty of key figures matter more than titles. Princes who rely solely on tradition often fall to those who quietly undermine their support networks.' },
      { fileId: 17, filename: 'primogen_council', content: 'The Primogen Council serves as both advisory body and battleground. Members represent clan interests, but personal ambition frequently overrides loyalty. Observing voting patterns reveals hidden alliances and brewing dissent.' },
      { fileId: 18, filename: 'anarch_pressure', content: 'Anarchs are not a unified movement, but a collection of grievances. Ignoring them allows resentment to fester. Co-opting their leaders or addressing symbolic issues can defuse unrest more effectively than brute force.' },
      { fileId: 19, filename: 'elder_manipulation', content: 'Elders rarely act openly. They influence events through intermediaries, often several steps removed. Identifying the true source of a directive can reveal its purpose, though such knowledge is dangerous.' },
      { fileId: 20, filename: 'succession_crises', content: 'The question of succession is often more destabilizing than the act itself. Preparing for power vacuums and shaping narratives around legitimacy can prevent chaos—or exploit it.' }
    ]
  },
  {
    catId: 5,
    catName: 'Hunting',
    files: [
      { fileId: 21, filename: 'feeding_patterns', content: 'Consistent feeding patterns reduce risk, but predictability can be exploited. Rotating hunting grounds and varying methods is advised. Some Kindred cultivate specific mortal communities, while others prefer anonymity.' },
      { fileId: 22, filename: 'territorial_disputes', content: 'Hunting rights are a frequent source of conflict. Even unclaimed areas may be watched by those seeking leverage. Clarifying boundaries through negotiation is safer than testing them through force.' },
      { fileId: 23, filename: 'ethical_considerations', content: 'While morality is subjective among Kindred, reckless feeding draws attention. Some vampires impose personal rules to maintain control, while others see restraint as weakness.' },
      { fileId: 24, filename: 'mortals_of_interest', content: 'Certain mortals are more valuable than others: those with influence, access, or resilience. Identifying such individuals can provide both nourishment and strategic advantage.' },
      { fileId: 25, filename: 'blood_quality', content: 'Not all blood is equal. Emotional state, health, and supernatural exposure affect its potency. Savvy Kindred learn to recognize these differences and plan accordingly.' }
    ]
  },
  {
    catId: 6,
    catName: 'Enemies',
    files: [
      { fileId: 26, filename: 'hunters_overview', content: 'Hunters range from organized cells to lone zealots. Underestimating them is fatal. They adapt quickly and learn from mistakes. Identifying their funding and leadership is key to dismantling their operations.' },
      { fileId: 27, filename: 'sabbat_tactics', content: 'The Sabbat embrace terror as a weapon. Their attacks are brutal and theatrical, designed to provoke overreaction. Understanding their ideology helps predict their targets.' },
      { fileId: 28, filename: 'inquisition_signs', content: 'Modern inquisitors rarely announce themselves. Subtle changes in law enforcement behavior or unusual data requests can indicate their presence. Early detection allows for misdirection.' },
      { fileId: 29, filename: 'internal_threats', content: 'Not all enemies come from outside. Ambitious Kindred may sabotage rivals while pretending loyalty. Paranoia is justified, but unchecked suspicion breeds isolation.' },
      { fileId: 30, filename: 'ancient_feuds', content: 'Some conflicts predate recorded history. Inheriting an elder’s enemy can doom a neonate. Understanding the origins of feuds can reveal paths to resolution—or escalation.' }
    ]
  },
  {
    catId: 7,
    catName: 'Rituals',
    files: [
      { fileId: 31, filename: 'blood_bonds', content: 'Blood bonds are among the most powerful tools in Kindred society. They create loyalty that feels like love, but fades unevenly. Misjudging a bond’s strength can lead to betrayal.' },
      { fileId: 32, filename: 'vaulderie_notes', content: 'The Vaulderie promises freedom from bonds, but at a cost. Participation creates new loyalties and expectations. Those who practice it often underestimate its long-term effects.' },
      { fileId: 33, filename: 'thaumaturgy_limits', content: 'Blood magic offers immense power, but demands discipline and secrecy. Each ritual leaves traces, and careless use invites scrutiny from rivals and hunters alike.' },
      { fileId: 34, filename: 'forbidden_practices', content: 'Some rituals are banned not because they fail, but because they succeed too well. Knowledge of them persists in fragments, traded at great risk.' },
      { fileId: 35, filename: 'preparation_methods', content: 'Rituals require planning: components, timing, and focus. Rushing invites disaster. Experienced practitioners spend nights preparing for moments that last seconds.' }
    ]
  },
  {
    catId: 8,
    catName: 'Final Nights',
    files: [
      { fileId: 36, filename: 'omens', content: 'Signs of the Final Nights are subtle at first: increased unrest, strange dreams, and ancient Kindred stirring. Interpreting these omens correctly may mean survival.' },
      { fileId: 37, filename: 'gehenna_theories', content: 'No consensus exists on Gehenna. Some believe it is literal apocalypse, others a cyclical purge. Each interpretation shapes how Kindred prepare—or deny—the possibility.' },
      { fileId: 38, filename: 'elder_movements', content: 'Elders withdrawing from domains may signal preparation for something larger. Tracking these movements is difficult, but patterns emerge for those who watch patiently.' },
      { fileId: 39, filename: 'last_alliances', content: 'Old enemies sometimes cooperate when faced with extinction. Such alliances are fragile and temporary, but can reshape entire regions.' },
      { fileId: 40, filename: 'survival_strategies', content: 'In the end, adaptability matters more than power. Those willing to change, hide, or flee may outlast those who cling to tradition.' }
    ]
  }
]
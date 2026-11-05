import Nav from './components/Nav'
import Hero from './components/Hero'
import WorldMap from './components/WorldMap'
import Characters from './components/Characters'
import Races from './components/Races'
import Power from './components/Power'
import Factions from './components/Factions'
import Timeline from './components/Timeline'
import Lore from './components/Lore'
import { SpoilerProvider } from './components/Spoiler'

export default function Home() {
  return (
    <SpoilerProvider>
      <Nav />
      <Hero />
      <WorldMap />
      <Characters />
      <Races />
      <Power />
      <Factions />
      <Timeline />
      <Lore />
    </SpoilerProvider>
  )
}
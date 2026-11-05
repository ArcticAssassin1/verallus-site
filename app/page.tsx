import Nav from './components/Nav'
import Hero from './components/Hero'
import WorldMap from './components/WorldMap'
import Characters from './components/Characters'
import Races from './components/Races'
import Factions from './components/Factions'
import { SpoilerProvider } from './components/Spoiler'

export default function Home() {
  return (
    <SpoilerProvider>
      <Nav />
      <Hero />
      <WorldMap />
      <Characters />
      <Races />
      <Factions />
    </SpoilerProvider>
  )
}
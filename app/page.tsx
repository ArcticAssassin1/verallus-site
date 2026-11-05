import Nav from './components/Nav'
import Hero from './components/Hero'
import WorldMap from './components/WorldMap'
import Characters from './components/Characters'
import { SpoilerProvider } from './components/Spoiler'

export default function Home() {
  return (
    <SpoilerProvider>
      <Nav />
      <Hero />
      <WorldMap />
      <Characters />
    </SpoilerProvider>
  )
}
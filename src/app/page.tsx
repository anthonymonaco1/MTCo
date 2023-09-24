import Image from 'next/image'
import CardDesign from '@/components/cardDesign'
import Header from '@/components/Header'
// import '../../styles/card.css'
// import '../../styles/regular-holo.css'

export default function Home() {
  return (
    <main className="h-screen">
      <Header/>
      <CardDesign/>
    </main>
  )
}
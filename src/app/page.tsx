import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import AIAction from '@/components/sections/AIAction'
import Stack from '@/components/sections/Stack'
import Experience from '@/components/sections/Experience'
import Certificates from '@/components/sections/Certificates'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <AIAction />
        <Stack />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

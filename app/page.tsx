import Nav from './components/Nav'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Services from './components/Services'
import Projects from './components/Projects'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Services />
        <Projects />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

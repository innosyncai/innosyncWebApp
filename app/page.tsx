import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientCarousel from '@/components/ClientCarousel';
import AboutUs from '@/components/AboutUs';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Navbar />
      <section id="hero" className='w-full'>
      <Hero />
      </section>
      <section id="about-us" className='w-full'>
      <AboutUs />
      </section>
      <section id="services" className='w-full'>
      <Features />
      </section>
      <section id="clients" className='w-full'>
      <ClientCarousel />
      </section>
      <section id="footer" className='w-full'>
      <Footer />
      </section>
    </main>
  );
}
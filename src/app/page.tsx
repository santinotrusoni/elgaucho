// HOME PAGE — completa.
//
// Orquesta todas las secciones definidas en la Parte 1, en el orden exacto
// del storytelling de scroll: apertura (Hero) -> marca (AboutUs) ->
// catálogo (Categories, Products) -> pico visual (Gallery) -> cierre calmo
// (Benefits, Testimonials, Contact, Footer).

import Hero from '@/components/sections/Hero/Hero';
import Navbar from '@/components/layout/Navbar/Navbar';
import AboutUs from '@/components/sections/AboutUs/AboutUs';
import Categories from '@/components/sections/Categories/Categories';
import Products from '@/components/sections/Products/Products';
import Gallery from '@/components/sections/Gallery/Gallery';
import Benefits from '@/components/sections/Benefits/Benefits';
import Testimonials from '@/components/sections/Testimonials/Testimonials';
import Contact from '@/components/sections/Contact/Contact';
import Footer from '@/components/layout/Footer/Footer';

export default function HomePage() {
  return (
    <main id="top" className="relative min-h-screen bg-base-black" tabIndex={-1}>
      <div id="main-content" />
      <Navbar />
      <Hero />
      <AboutUs />
      <Categories />
      <Products />
      <Gallery />
      <Benefits />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

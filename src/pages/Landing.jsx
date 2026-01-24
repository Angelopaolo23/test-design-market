import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { FeaturedWorks } from '../components/sections/FeaturedWorks';

/**
 * Landing - Página principal del marketplace
 */
export function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar fijo con glassmorphism */}
      <Navbar />

      {/* Contenido principal con padding-top para el navbar fijo */}
      <main className="flex-1 pt-[72px]">
        {/* Hero Section */}
        <Hero />

        {/* Obras Destacadas */}
        <FeaturedWorks />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Landing;

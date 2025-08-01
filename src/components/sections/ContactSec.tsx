import AnimatedSection from '../AnimatedSection';

/**
 * Définition du section ContactSec
 * L'id est relié avec les liens dans le Header
 */
export default function ContactSec(){
    return(
        <section id="contact" className="min-h-screen flex items-center justify-center">
          <AnimatedSection>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Contact</h2>
              <div className="max-w-2xl mx-auto">
              </div>
            </div>
          </AnimatedSection>
        </section>
    )
}

/**
 * Définition du section Formations 
 * L'id est relié avec les liens dans le Header
 */

import AnimatedSection from '../AnimatedSection';

export default function FormationsSec(){
    return(
        <section id="formations" className="min-h-screen flex items-center justify-center">
          <AnimatedSection>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Mes Formations</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    formations
              </div>
            </div>
          </AnimatedSection>
        </section>
    )
}

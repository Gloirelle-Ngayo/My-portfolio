/**
 * Définition du section Projets 
 * L'id est relié avec les liens dans le Header
 */
export default function ProjetsSec(){
    return(
        <section id="projets" className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Mes Projets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ajoutez vos projets ici */}
            <div className="card-border-gradient bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold">Mon projet</h2>
              <p>Un texte ici</p>
            </div>
          </div>
        </div>
      </section>
    )
}

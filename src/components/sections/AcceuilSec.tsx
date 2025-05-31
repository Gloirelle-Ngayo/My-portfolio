/**
 * Définition du section Acceuil 
 * L'id est relié avec les liens dans le Header
 */

export default function AcceuilSec(){
    return(
        <section id="accueil" className="min-h-screen flex items-center justify-center bg-base-100">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Bienvenue sur mon Portfolio</h1>
                <p className="text-xl md:text-2xl">Développeur Full Stack</p>
            </div>
        </section>
    )
}



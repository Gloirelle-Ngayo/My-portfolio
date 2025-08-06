import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '../AnimatedSection'

/**
 * Définition du section Acceuil 
 * L'id est relié avec les liens dans le Header
 */

export default function AcceuilSec(){
    return(
        <section id="accueil" className="min-h-screen flex items-center justify-center relative bg-base-200">
            <AnimatedSection>
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
                    <div className="flex-shrink-0 mt-25 w-[320px] h-[320px] rounded-full overflow-hidden hidden lg:block">
                        <Image 
                            src="/images/acceuil/Gloirelle.jpg" 
                            alt="Mon image"  
                            width={250}
                            height={250}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div className="text-center text-center md:mb-10">
                        <h1 className="text-2xl md:text-3xl font-bold mt-30">À propos de moi</h1>
                        <h2 className='italic opacity-80 text-xl md:text-medium mb-4'>Technicienne en réseaux et télécommunications / Développeuse web</h2>
                        <p className="text-xl md:text-medium text-center md:text-justify">
                                Je suis passionnée par les technologies et motivée par 
                                l&apos;envie constante d&apos;apprendre et d&apos;innover. Grâce à ma double compétence, 
                                je suis capable d&apos;intervenir aussi bien sur les infrastructures réseau que 
                                sur le développement de solutions web performantes. Polyvalente, rigoureuse et 
                                orientée résultats, je m&apos;adapte facilement aux environnements techniques variés. 
                                Mon objectif est de contribuer activement à des projets à fort impact au sein 
                                d&apos;une équipe dynamique,tout en continuant à développer mes compétences dans un cadre stimulant
                        </p>
                        <div className="flex justify-center gap-4 mt-8">
                           <div className='card-border-gradient'>
                                <button>
                                    <div className='bg-base-100 rounded-lg m-1'>
                                        <Link href="#contact">
                                            <span className="block px-3 py-1 bg-gradient-to-r from-primary/90 via-secondary/90 to-accent/90 bg-clip-text text-transparent hover:opacity-90">Contactez-moi</span>
                                        </Link>
                                    </div>
                                </button>
                            </div>
                            <div className='card-border-gradient'>
                                <button>
                                    <div className='bg-base-100 rounded-lg m-1'>
                                        <a href="/assets/Cv_Ngayo_G.pdf" download="Cv_Ngayo_G.pdf">
                                            <span className="block px-3 py-1 bg-gradient-to-r from-primary/90 via-secondary/90 to-accent/90 bg-clip-text text-transparent hover:opacity-90">Télécharger mon CV</span>
                                        </a>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </section>
    )
}



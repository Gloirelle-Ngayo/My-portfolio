import Image from 'next/image'
import Link from 'next/link'
import ParticleNetwork from '../ParticleNetwork'
import { motion } from "framer-motion";

/**
 * Définition du section Acceuil 
 * L'id est relié avec les liens dans le Header
 */
export default function AcceuilSec(){
    return(
        <section id="accueil" className="min-h-screen flex items-center justify-center bg-base-100 relative">
            <ParticleNetwork />
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
                <div className="flex-shrink-0 w-[400px] h-[400px] rounded-full overflow-hidden hidden lg:block">
                    <Image 
                        src="/images/Gloirelle.jpg" 
                        alt="Mon image"  
                        width={250}
                        height={250}
                        className="w-full h-full object-cover object-top"
                    />
                </div>
                <div className="text-center text-center mt-4">
                    <h1 className="text-4xl md:text-3xl font-bold mb-4">À propos de moi</h1>
                    <h2 className='italic opacity-80 text-xl md:text-medium mb-4'>Technicienne en réseaux et télécommunications / Développeuse web</h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-xl md:text-medium text-center md:text-justify"
                        >
                            Je suis passionnée par les technologies et motivée par 
                            l&apos;envie constante d&apos;apprendre et d&apos;innover. Grâce à ma double compétence, 
                            je suis capable d&apos;intervenir aussi bien sur les infrastructures réseau que 
                            sur le développement de solutions web performantes. Polyvalente, rigoureuse et 
                            orientée résultats, je m&apos;adapte facilement aux environnements techniques variés. 
                            Mon objectif est de contribuer activement à des projets à fort impact au sein 
                            d&apos;une équipe dynamique,tout en continuant à développer mes compétences dans un cadre stimulant
                    </motion.p>
                    <div className='flex justify-center gap-4 mt-8'>
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

           

        </section>
    )
}



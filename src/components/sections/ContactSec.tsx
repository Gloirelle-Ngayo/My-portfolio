import AnimatedSection from '../AnimatedSection';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BtnScintillant from '../BtnScintillant';
/**
 * Définition du section ContactSec
 * L'id est relié avec les liens dans le Header
 */
export default function ContactSec(){
    return(
        <section id="contact" className="min-h-screen flex items-center justify-center">
          <AnimatedSection>
              <div className="max-w-6xl mx-auto flex flex-col items-center justify-center bg-base-300/50 py-12 px-12">
                <div className="text-center">
                  <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Contactez-moi</h2>
                  <p className="text-base text-base-content/70 mb-4">Vous avez un projet, une question ou vous voulez simplement discuter ? Écrivez-moi !</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-center">
                  {/* Illustration */}
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full flex justify-center"
                  >
                    <Image
                      src="/images/Happy Bunch - Desk.png"
                      alt="Contact illustration"
                      width={400}
                      height={400}
                      className="object-contain max-h-[500px]"
                    />
                  </motion.div>
                  
                  {/* Formulaire */}
                  <motion.form
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4 mx-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Message envoyé !");
                    }}
                  >
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="input input-bordered w-full"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Sujet"
                      className="input input-bordered w-full"
                      required
                    />
                    <textarea
                      placeholder="Votre message"
                      className="textarea textarea-bordered w-full h-32"
                      required
                    ></textarea>
                    <BtnScintillant/>
                  </motion.form>
                </div>
              </div>

              
          </AnimatedSection>
        </section>
    )
}
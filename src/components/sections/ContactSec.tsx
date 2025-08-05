"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "../AnimatedSection";
import BtnScintillant from "../BtnScintillant";

export default function ContactSec() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState<"green" | "red">("green");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback("Message envoyé avec succès !");
        setFeedbackColor("green");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setFeedback("Erreur : " + data.error);
        setFeedbackColor("red");
      }
    } catch (err) {
      console.error(err);
      setFeedback("Erreur lors de l’envoi.");
      setFeedbackColor("red");
    } finally {
      setLoading(false);
    }
  };

  // Auto hide feedback after 5 seconds
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-base-300/50">
      <AnimatedSection>
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">Contactez-moi</h2>
            <p className="text-base text-base-content/70 mt-4">
              Vous avez un projet ou une question ? Écrivez-moi !
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center w-full px-4">
            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <Image
                src="/images/Happy Bunch - Desk.png"
                alt="Contact illustration"
                width={400}
                height={400}
                className="object-contain max-h-[400px]"
              />
            </motion.div>

            {/* Formulaire */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 w-full"
            >
              <div className="p-2 card-border-gradient backdrop-blur-sm bg-base-100 text-sm">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full focus:border-none focus:outline-none bg-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="p-2 card-border-gradient backdrop-blur-sm bg-base-100 text-sm">
                <input
                  type="text"
                  placeholder="Sujet"
                  className="w-full focus:border-none focus:outline-none bg-transparent"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="card-border-gradient backdrop-blur-sm bg-base-100 text-sm">
                <textarea
                  placeholder="Votre message"
                  className="w-full h-32 p-2 focus:border-none focus:outline-none bg-transparent"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Bouton d'envoi */}
              <BtnScintillant
                text="Envoyer"
                loading={loading}
                disabled={loading}
              />

              {/* Message d’alerte */}
              {feedback && (
                <p
                  className={`text-center text-sm ${
                    feedbackColor === "green" ? "text-green-500 bg-green/10 p-4 border-1 border-green/20 rounded-md" : "text-red-500 bg-primary/10 p-4 border-1 border-primary/20 rounded-md"
                  }`}
                >
                  {feedback}
                </p>
              )}
            </motion.form>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

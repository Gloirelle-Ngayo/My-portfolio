'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../AnimatedSection';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

type Cursus = {
  date: string;
  title: string;
  description: string;
  image_url?: string;
};

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  image_url?: string;
  description?: string;
};

// --- Timeline Component ---

function Timeline({ cursus }: { cursus: Cursus[] }) {

  return (
    <section>
      <ul className="relative mt-4">
        {/* Ligne verticale à gauche sur tous les écrans */}
        <span
          className="absolute top-0 h-full w-1 bg-pink-500 z-0 left-4"
          aria-hidden="true"
        />

        {cursus.map((item, idx) => (
          <li key={idx} className="relative z-10 mb-8 pl-10 pr-2 md:pl-14">
            {/* Point aligné avec la ligne */}
            <span className="absolute top-8 left-4 z-20 h-5 w-5 rounded-full ring-4 ring-pink-500 bg-base-100" />

            {/* Carte toujours à droite et largeur complète */}
            <div className="w-full">
  <div className="flex flex-col md:flex-row md:items-start card-border-gradient bg-base-100 duration-300 backdrop-blur-sm rounded-lg shadow px-4 py-4 md:px-6 md:py-6">
    
    {/* Image responsive */}
    {item.image_url && (
      <div className="w-full md:w-auto mb-4 md:mb-0 md:mr-4">
        <Image
          src={item.image_url}
          alt={item.title}
          width={400}
          height={200}
          className="w-full h-auto max-h-40 object-contain rounded"
        />
      </div>
    )}

    {/* Texte */}
    <div className="flex-1 text-center md:text-left">
      <time className="font-mono italic text-xs text-gray-500 dark:text-gray-400 block mb-1">
        {item.date}
      </time>
      <h3 className="text-lg font-black text-pink-600 dark:text-pink-400 mb-1">
        {item.title}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {item.description}
      </p>
    </div>
  </div>
</div>

          </li>
        ))}
      </ul>
    </section>
  );
}

// --- Certificates Component ---

function Certificates({ certificates }: { certificates: Certificate[] }) {

  return (
    <section>
      <div className="flex flex-col gap-2">
        {certificates.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="flex card-border-gradient bg-base-100 duration-300 backdrop-blur-sm h-auto w-full rounded-lg shadow"
          >
            {cert.image_url && (
              <div className="flex-shrink-0 p-4">
                <Image
                  src={cert.image_url}
                  alt={cert.title}
                  width={100}
                  height={50}
                  className="w-full h-full rounded"
                />
              </div>
            )}
            <div className="flex-1 mx-1 my-4">
              <h5 className="font-semibold text-pink-500 dark:text-pink-400">{cert.title}</h5>
              <p className="text-sm text-gray-500 dark:text-gray-300">{cert.issuer}</p>
              <p className="text-xs text-gray-400 dark:text-gray-400">{cert.date}</p>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-pink-400 underline"
                >
                  Voir le certificat
                </a>
              )}
              <div>
                {cert.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


// --- Main Section ---

export default function FormationsSec() {
  const [cursus, setCursus] = useState<Cursus[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: cursusData } = await supabase.from('cursus').select('*').order('date', { ascending: false });
      const { data: certificatesData } = await supabase.from('certificates').select('*').order('date', { ascending: false });
      setCursus(cursusData || []);
      setCertificates(certificatesData || []);
    }
    fetchData();
  }, []);

  return (
    <section id="formations" className="py-12 min-h-screen flex items-center justify-center">
      <AnimatedSection>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Mes Formations</h2>
          <div className="grid md:grid-cols-[1fr_1fr] gap-12">
            {/* Timeline cursus */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-pink-600 dark:text-pink-400">Mon parcours</h3>
              <Timeline cursus={cursus} />
            </div>
            {/* Certificats */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-pink-600 dark:text-pink-400">Certificats</h3>
              <Certificates certificates={certificates} />
            </div>
              </div>
            </div>
          </AnimatedSection>
        </section>
  );
}

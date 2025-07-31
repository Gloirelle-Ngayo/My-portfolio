'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
//import AnimatedSection from '../AnimatedSection';
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
    <section className="relative">
      <ul className="mt-4 relative">
        {/* Ligne verticale */}
        <span
          className="absolute top-0 bottom-0 w-1 bg-pink-500 left-4 z-0"
          aria-hidden="true"
        />

        {cursus.map((item, idx) => (
          <li key={idx} className="relative z-10 mb-10 pl-8 pr-2 md:pl-14">
            {/* Point de la ligne */}
            <span className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 h-5 w-5 rounded-full ring-4 ring-pink-500 bg-base-100" />

            {/* Carte animée */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="flex flex-col lg:flex-row lg:items-center card-border-gradient bg-base-100 duration-300 backdrop-blur-sm rounded-lg shadow overflow-hidden"
            >
              {item.image_url && (
                <div className="w-full lg:w-1/3 p-4 flex justify-center items-center">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}

              <div className="flex-1 p-4 text-center lg:text-left">
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
            </motion.div>
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
      <div className="flex flex-col gap-4">
        {certificates.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="flex flex-row items-center card-border-gradient bg-base-100 duration-300 backdrop-blur-sm rounded-lg shadow overflow-hidden"
          >
            {cert.image_url && (
              <div className="p-3 flex-shrink-0 hidden  min-[320px]:block">
                <Image
                  src={cert.image_url}
                  alt={cert.title}
                  width={120}
                  height={96}
                  className="w-28 h-24 object-cover rounded"
                />
              </div>
            )}

            <div className="flex-1 p-4 text-left overflow-hidden">
              <h5 className="font-semibold text-pink-500 dark:text-pink-400">
                {cert.title}
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {cert.issuer}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-400">
                {cert.date}
              </p>
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
              <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
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
        </section>
  );
}

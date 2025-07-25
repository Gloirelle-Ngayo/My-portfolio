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
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <ul className="relative">
      {/* Ligne verticale centrale avec animation d'étirement */}
      <motion.span
        className="hidden md:block absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-pink-300 z-0"
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ transformOrigin: 'top center' }}
      />
      {cursus.map((item, idx) => (
        <li key={idx} className="relative z-10 mb-8 flex">
          {/* Point central animé (zoom in) */}
          <motion.span
            className="absolute left-1/2 top-8 -translate-x-1/2 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-4 ring-pink-500 dark:bg-gray-900"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <svg
              className="h-3 w-3 text-pink-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </motion.span>

          {/* Carte à gauche ou droite avec animation latérale */}
          <motion.div
            initial={{ opacity: 0, x: idx % 2 === 0 ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className={`w-1/2 ${idx % 2 === 0 ? 'justify-end flex p-4' : 'ml-auto flex p-4'}`}
          >
            <div className="flex items-center card-border-gradient bg-base-100 duration-300 backdrop-blur-sm h-auto w-full rounded-lg shadow">
              {item.image_url && (
                <div className="flex-shrink-0 p-4">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={100}
                    height={64}
                    className="w-full h-full rounded"
                  />
                </div>
              )}
              <div className="mx-1">
                <time className="font-mono italic text-xs text-gray-500 dark:text-gray-400">{item.date}</time>
                <div className="text-lg font-black text-pink-600 dark:text-pink-400">{item.title}</div>
                <div className={expanded === idx ? '' : 'line-clamp-2'}>
                  {item.description}
                </div>
                {item.description && item.description.length > 60 && (
                  <button
                    className="text-xs text-pink-500 underline mt-1"
                    onClick={() => setExpanded(expanded === idx ? null : idx)}
                  >
                    {expanded === idx ? 'Voir moins' : 'Voir plus'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </li>
      ))}
    </ul>
  );
}

// --- Certificates Component ---

function Certificates({ certificates }: { certificates: Certificate[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
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
          <div className="flex-1 mx-1">
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
            <div className={expanded === idx ? '' : 'line-clamp-2'}>
              {cert.description}
            </div>
            {cert.description && cert.description.length > 60 && (
              <button
                className="text-xs text-pink-500 underline mt-1"
                onClick={() => setExpanded(expanded === idx ? null : idx)}
              >
                {expanded === idx ? 'Voir moins' : 'Voir plus'}
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
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
          <div className="grid md:grid-cols-[2fr_1fr] gap-12">
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

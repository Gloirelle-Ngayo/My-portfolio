/**
 * Définition du section Projets 
 * L'id est relié avec les liens dans le Header
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import ProjectCarousel from '@/components/ProjectCarousel';
import AnimatedSection from '@/components/AnimatedSection';

interface Project {
    id: string;
    image_url?: string;
    title: string;
    description: string;
    technologies: string[];
    category: 'network' | 'programming';
    project_url?: string;
    objectives: string[];
    completion_date: string;
}

export default function ProjetsSec() {
    const [networkProjects, setNetworkProjects] = useState<Project[]>([]);
    const [programmingProjects, setProgrammingProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                // Test de connexion
                const { data: testData, error: testError } = await supabase
                    .from('projects')
                    .select('*');
                
                console.log('Test de connexion - Tous les projets:', testData);
                if (testError) console.error('Erreur de test:', testError);

                // Récupérer les projets réseau
                const { data: networkData, error: networkError } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('category', 'network')
                    .order('completion_date', { ascending: false })
                    .limit(6);

                if (networkError) throw networkError;
                console.log('Projets réseau récupérés:', networkData);
                setNetworkProjects(networkData || []);

                // Récupérer les projets programmation
                const { data: programmingData, error: programmingError } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('category', 'programming')
                    .order('completion_date', { ascending: false })
                    .limit(6);

                if (programmingError) throw programmingError;
                console.log('Projets programmation récupérés:', programmingData);
                setProgrammingProjects(programmingData || []);
            } catch (error) {
                console.error('Erreur lors de la récupération des projets:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section id="projets" className="min-h-screen py-2 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center h-64">
                        <div className="loading loading-spinner loading-lg"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projets" className="min-h-screen py-2">
            <AnimatedSection>
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 hover:opacity-90">Mes Projets</h2>

                    {/* Section Projets Réseau */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold mb-8 text-center">Projets en Réseau</h3>
                        <ProjectCarousel projects={networkProjects} />
                    </div>

                    {/* Section Projets Programmation */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold mb-8 text-center">Projets en Programmation</h3>
                        <ProjectCarousel projects={programmingProjects} />
                    </div>

                    {/* Bouton pour voir tous les projets */}
                    <div className='mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 relative z-10'>
                        <button className='card-border-gradient'>
                            <div className='bg-base-100 rounded-lg m-1'>
                                <Link href="/project">
                                    <span className="block px-3 py-1 bg-gradient-to-r from-primary/90 via-secondary/90 to-accent/90 bg-clip-text text-transparent hover:opacity-90">Voir tous mes projets</span>
                                </Link>
                            </div>
                        </button>
                      </div>
                </div>
            </AnimatedSection>
        </section>
    );
}

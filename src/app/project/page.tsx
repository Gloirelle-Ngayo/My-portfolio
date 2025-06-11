'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';

interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    category: 'network' | 'programming';
    image_url?: string;
    project_url?: string;
    objectives: string[];
    completion_date: string;
}

export default function AllProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'network' | 'programming'>('network');

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setProjects(data || []);
            } catch (error) {
                console.error('Erreur lors de la récupération des projets:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project => project.category === activeTab);

    if (loading) {
        return (
            <main className="min-h-screen py-20 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center h-64">
                        <div className="loading loading-spinner loading-lg"></div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold">Tous mes projets</h1>
                    <Link href="/" className="btn btn-primary">
                        Retour à l&apos;accueil
                    </Link>
                </div>

                {/* Onglets */}
                <div className="flex justify-center mb-8">
                    <div className="tabs tabs-boxed">
                        <button 
                            className={`tab ${activeTab === 'network' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('network')}
                        >
                            Projets Réseau
                        </button>
                        <button 
                            className={`tab ${activeTab === 'programming' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('programming')}
                        >
                            Projets Programmation
                        </button>
                    </div>
                </div>

                {/* Grille de projets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </main>
    );
}

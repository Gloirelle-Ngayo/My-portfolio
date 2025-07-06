import { motion } from "framer-motion";
import Image from 'next/image';
import Modal from "./Modal";

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

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className='flex flex-col md:flex-row items-center md:justify-center relative z-10'>
            <div className="w-full md:w-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="card-border-gradient bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm h-auto w-full md:w-[320px] flex flex-col"
                >
                    {project.image_url && (
                        <figure className="p-1 h-[140px] md:h-[180px]">
                            <Image 
                                src={project.image_url} 
                                alt={project.title} 
                                width={300}
                                height={180}
                                className="rounded-md object-cover w-full h-full hover:scale-101 transition-transform duration-300"
                            />
                        </figure>
                    )}

                    <div className="card-body px-3 py-2 flex-grow space-y-2">
                        <h3 className="card-title text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent line-clamp-2">
                            {project.title}
                        </h3>
                        <p className="text-sm text-base-content/80 line-clamp-3">
                            {project.description}
                        </p>
                    </div>

                    <div className="px-3 pb-3">
                        <Modal project={project} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}


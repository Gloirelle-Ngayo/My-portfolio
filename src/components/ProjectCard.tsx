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
        <div className='mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative z-10'>
            <div className="w-full md:w-auto">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card-border-gradient bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm h-full flex flex-col"
                >
                {project.image_url && (
                    <figure className="p-1 md:p-1 h-[150px] md:h-[250px]">
                        <Image 
                            src={project.image_url} 
                            alt={project.title} 
                            width={300}
                            height={200}
                            className="rounded-md object-cover w-full h-full hover:scale-101 transition-transform duration-300"
                        />
                    </figure>
                )}
                <div className="card-body px-1 py-1 md:p-5 flex-grow">
                    <h3 className="card-title text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent line-clamp-2">{project.title}</h3>
                    <p className="text-sm md:text-base text-base-content/80 line-clamp-3">{project.description}</p>
                </div>
                <div className="p-2 md:p-2 mt-auto">
                    <Modal project={project} />
                </div>
                </motion.div>
            </div>
        </div>
    );
} 

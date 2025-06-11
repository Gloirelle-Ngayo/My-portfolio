import Image from 'next/image';

interface Project {
    id: string;
    image_url?: string;
    title: string;
    description: string;
    technologies: string[];
    category: 'network' | 'programming';
    project_url?: string;
    completion_date: string;
    objectives: string[];
}

export default function Modal({ project }: { project: Project }){
    const modalId = `modal-${project.id}`;
    
    return(
        <div className="text-center">
            <button 
                className="btn btn-primary text-center" 
                onClick={()=>(document.getElementById(modalId) as HTMLDialogElement)?.showModal()}
            >
                Voir plus
            </button>
            
            <dialog id={modalId} className="modal">
                <div className="modal-box max-w-2xl max-h-[80vh] p-4 md:p-6 relative">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50 hover:bg-base-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </form>
                    
                    {project.image_url && (
                        <figure className="mb-4 md:m-1 md:mt-0">
                            <Image 
                                src={project.image_url} 
                                alt={project.title} 
                                width={800}
                                height={400}
                                className="w-full h-[150px] md:h-[250px] object-cover rounded-xl"
                            />
                        </figure>
                    )}
                    
                    <h3 className="font-bold text-2xl md:text-3xl mb-3 md:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {project.title}
                    </h3>
                    
                    <div className="mb-4 md:mb-6">
                        <h4 className="text-lg md:text-xl font-semibold text-primary mb-2">Date de réalisation</h4>
                        <p className="text-base-content/80">{project.completion_date}</p>
                    </div>

                    <div className="mb-4 md:mb-6">
                        <h4 className="text-lg md:text-xl font-semibold text-primary mb-2">Description</h4>
                        <p className="text-base md:text-lg text-base-content/80">
                            {project.description}
                        </p>
                    </div>

                    <div className="mb-4 md:mb-6">
                        <h4 className="text-lg md:text-xl font-semibold text-primary mb-2">Objectifs atteints</h4>
                        <ul className="list-disc list-inside space-y-2 text-start">
                            {project.objectives.map((objective, index) => (
                                <li key={index} className="text-base-content/80">{objective}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="mb-4 md:mb-6">
                        <h4 className="text-lg md:text-xl font-semibold text-primary mb-2 md:mb-3">Technologies utilisées</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-full bg-primary/10 text-primary">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    {project.project_url && (
                        <div className="flex justify-end">
                            <a 
                                href={project.project_url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-primary btn-sm md:btn-lg"
                            >
                                Voir le projet
                            </a>
                        </div>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}


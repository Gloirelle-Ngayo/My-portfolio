'use client';

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-base-100 text-base-content py-3 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Nom & Copyright */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-bold">Gloirelle Ngayo</h4>
          <p className="text-sm text-base-content/70">© {new Date().getFullYear()} Tous droits réservés.</p>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex space-x-4">
          <a href="https://github.com/Gloirelle-Ngayo" target="_blank" rel="noopener noreferrer">
            <FaGithub className="w-5 h-5 hover:text-pink-500 transition-colors" />
          </a>
          <a href="www.linkedin.com/in/gloirelle-ngayo" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-5 h-5 hover:text-pink-500 transition-colors" />
          </a>
          <a href="mailto:gloirengayo@email.com">
            <FaEnvelope className="w-5 h-5 hover:text-pink-500 transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}

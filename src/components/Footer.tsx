import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Youtube, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Navegação': [
      { name: 'Home', href: '/' },
      { name: 'Tutoriais', href: '/tutoriais' },
      { name: 'Contato', href: '/contato' },
    ],
    'Categorias': [
      { name: 'Iniciante', href: '/tutoriais?categoria=iniciante' },
      { name: 'Chefes', href: '/tutoriais?categoria=chefes' },
      { name: 'Equipamentos', href: '/tutoriais?categoria=equipamentos' },
      { name: 'Exploração', href: '/tutoriais?categoria=exploracao' },
    ],
    'Recursos': [
      { name: 'Mapa Interativo', href: '#' },
      { name: 'Calculadora de Builds', href: '#' },
      { name: 'Speedrun Tracker', href: '#' },
      { name: 'Comunidade', href: '#' },
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-hollow-darker border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-hollow-gold rounded-full flex items-center justify-center">
                <span className="text-hollow-dark font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold text-white">Hollow Knight FAQ</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              O melhor lugar para encontrar tutoriais, guias e dicas sobre Hollow Knight. 
              Feito com amor pela comunidade.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-hollow-gold transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-hollow-gold transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Hollow Knight FAQ. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 md:mt-0">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>pela comunidade</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              Hollow Knight é uma marca registrada da Team Cherry. Este site não é afiliado oficialmente.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



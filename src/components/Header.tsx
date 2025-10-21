import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tutoriais', href: '/tutoriais' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-hollow-darker border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo (somente texto-imagem) */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/logotipo-texto.png"
              alt="Hollow Knight FAQ"
              className="h-8 w-auto md:h-9 lg:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isActive(item.href)
                    ? 'text-hollow-gold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <img
                  src="/images/logotipo.png"
                  alt="Hollow Knight - Logotipo"
                  className={`h-5 w-auto transition-opacity duration-200 ${
                    isActive(item.href)
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar tutoriais..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 pr-4 py-2 w-64"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-hollow-darker border-t border-gray-700">
              <>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-hollow-gold bg-hollow-dark'
                        : 'text-gray-300 hover:text-white hover:bg-hollow-dark'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar tutoriais..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-field pl-10 pr-4 py-2 w-full"
                    />
                  </div>
                </div>
              </>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


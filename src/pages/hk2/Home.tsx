import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, BookOpen, Trophy } from 'lucide-react';

const HomeHK2: React.FC = () => {
  const stats = [
    { icon: BookOpen, label: 'Tutoriais', value: '0' },
    { icon: Star, label: 'Avaliações', value: 'N/A' },
    { icon: Trophy, label: 'Comunidade', value: 'Em breve' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Bem-vindo ao
              <span className="text-blue-400 block">Hollow Knight 2 FAQ</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore os novos reinos e descubra os segredos da continuação. 
              Este site está em construção e em breve terá todos os guias e tutoriais!
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/hk2/tutoriais"
                className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-3"
              >
                <span>Explorar Tutoriais</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/hk1"
                className="btn-secondary inline-flex items-center space-x-2 text-lg px-8 py-3"
              >
                <span>Voltar ao Hollow Knight 1</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-hollow-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Available Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Conteúdo Disponível
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Explore os tutoriais e guias disponíveis para Hollow Knight: Silksong
            </p>
            <div className="bg-hollow-dark rounded-lg p-8 border border-gray-700 max-w-2xl mx-auto">
              <p className="text-gray-300 mb-4">
                <strong className="text-blue-400">Tutoriais Disponíveis:</strong>
              </p>
              <ul className="text-left text-gray-400 space-y-2 max-w-md mx-auto">
                <li>• Checklist de Fragmentos de Carretel</li>
                <li>• Checklist de Localização das Máscaras</li>
                <li>• E mais tutoriais em breve...</li>
              </ul>
              <div className="mt-6">
                <Link
                  to="/hk2/tutoriais"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>Ver Todos os Tutoriais</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeHK2;


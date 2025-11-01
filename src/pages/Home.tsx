import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Star, BookOpen, Trophy, Heart } from 'lucide-react';
import TutorialCard from '../components/TutorialCard';
import { tutorials } from '../data/tutorials';

const Home: React.FC = () => {
  const location = useLocation();
  
  // Detecta o prefixo do jogo baseado na rota atual
  const getGamePrefix = () => {
    if (location.pathname.startsWith('/hk1')) return '/hk1';
    if (location.pathname.startsWith('/hk2')) return '/hk2';
    return '';
  };

  const gamePrefix = getGamePrefix();
  const featuredTutorials = tutorials.slice(0, 3);
  const stats = [
    { icon: BookOpen, label: 'Tutoriais', value: tutorials.length },
    { icon: Star, label: 'Avaliações', value: '4.9' },
    { icon: Trophy, label: 'Comunidade', value: '2.5K' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-hollow-darker to-hollow-dark py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(./images/header.jpg)`,
            opacity: 0.6
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-hollow-darker to-hollow-dark" style={{ opacity: 0.5 }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Bem-vindo ao
              <span className="text-hollow-gold block">Hollow Knight FAQ</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Descubra todos os segredos de Hallownest com nossos tutoriais detalhados, 
              guias de chefes e estratégias avançadas. Domine o mundo de Hollow Knight!
            </p>
            <div className="flex justify-center">
              <Link
                to={`${gamePrefix}/tutoriais`}
                className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-3"
              >
                <span>Explorar Tutoriais</span>
                <ArrowRight className="w-5 h-5" />
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
                  <div className="bg-hollow-dark rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-hollow-gold" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Tutoriais em Destaque
            </h2>
            <p className="text-gray-400 text-lg">
              Os guias mais populares e úteis da nossa comunidade
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredTutorials.map((tutorial, index) => (
              <div key={tutorial.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <TutorialCard tutorial={tutorial} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to={`${gamePrefix}/tutoriais`}
              className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-3"
            >
              <span>Ver Todos os Tutoriais</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-hollow-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Por que escolher nosso site?
            </h2>
            <p className="text-gray-400 text-lg">
              Oferecemos a melhor experiência para aprender sobre Hollow Knight
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-up">
              <div className="bg-hollow-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-hollow-dark" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Tutoriais Detalhados
              </h3>
              <p className="text-gray-400">
                Guias completos com estratégias testadas e aprovadas pela comunidade
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-hollow-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-hollow-dark" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Comunidade Ativa
              </h3>
              <p className="text-gray-400">
                Conecte-se com outros jogadores e compartilhe suas experiências
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-hollow-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-hollow-dark" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Estratégias Avançadas
              </h3>
              <p className="text-gray-400">
                Técnicas de speedrun, builds otimizadas e segredos escondidos
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


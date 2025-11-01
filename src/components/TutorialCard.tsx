import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Heart, User, Calendar } from 'lucide-react';
import { Tutorial } from '../types';

interface TutorialCardProps {
  tutorial: Tutorial;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
  const location = useLocation();
  
  // Detecta o prefixo do jogo baseado na rota atual
  const getGamePrefix = () => {
    if (location.pathname.startsWith('/hk1')) return '/hk1';
    if (location.pathname.startsWith('/hk2')) return '/hk2';
    return '';
  };

  const gamePrefix = getGamePrefix();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante':
        return 'bg-green-500';
      case 'Intermediário':
        return 'bg-yellow-500';
      case 'Avançado':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card group hover:scale-105 transition-transform duration-300">
      <Link to={`${gamePrefix}/tutorial/${tutorial.id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={tutorial.image}
            alt={tutorial.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getDifficultyColor(tutorial.difficulty)}`}>
              {tutorial.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-hollow-gold transition-colors duration-200 line-clamp-2">
            {tutorial.title}
          </h3>
          
          <p className="text-gray-400 text-sm line-clamp-3">
            {tutorial.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tutorial.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-hollow-dark text-hollow-silver text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-400 pt-2 border-t border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{tutorial.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(tutorial.date)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{tutorial.readTime} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{tutorial.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TutorialCard;



import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Clock, User, Calendar, MessageCircle } from 'lucide-react';
import { tutorials } from '../data/tutorials';
import CompletionChecklist from '../components/CompletionChecklist';
import DetonadoGuide from '../components/DetonadoGuide';
import AchievementsChecklist from '../components/AchievementsChecklist';

const TutorialDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const tutorial = tutorials.find(t => t.id === id);

  if (!tutorial) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Tutorial não encontrado</h1>
          <p className="text-gray-400 mb-8">O tutorial que você está procurando não existe.</p>
          <Link to="/tutoriais" className="btn-primary">
            Voltar aos Tutoriais
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tutorial.title,
          text: tutorial.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
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

  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/tutoriais"
          className="inline-flex items-center space-x-2 text-hollow-gold hover:text-yellow-400 transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar aos Tutoriais</span>
        </Link>

        {/* Tutorial Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getDifficultyColor(tutorial.difficulty)}`}>
              {tutorial.difficulty}
            </span>
            <span className="px-3 py-1 bg-hollow-dark text-hollow-silver text-sm rounded-full">
              {tutorial.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {tutorial.title}
          </h1>
          
          <p className="text-xl text-gray-300 mb-6">
            {tutorial.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>{tutorial.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(tutorial.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{tutorial.readTime} min de leitura</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleLike}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                liked
                  ? 'bg-red-500 text-white'
                  : 'bg-hollow-dark text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              <span>{tutorial.likes + likes}</span>
            </button>
            
            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-hollow-dark text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <Share2 className="w-5 h-5" />
              <span>Compartilhar</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-hollow-dark text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Comentários</span>
            </button>
          </div>
        </div>

        {/* Tutorial Image */}
        <div className="mb-8">
          <img
            src={tutorial.image}
            alt={tutorial.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Tutorial Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {tutorial.id === '7' ? (
            // Checklist interativo para o guia de 112%
            <CompletionChecklist tutorialId={tutorial.id} />
          ) : tutorial.id === '8' ? (
            // Componente específico para o Detonado 112%
            <DetonadoGuide />
          ) : tutorial.id === '9' ? (
            // Checklist interativo para as Conquistas
            <AchievementsChecklist tutorialId={tutorial.id} />
          ) : (
            // Conteúdo normal para outros tutoriais
            <div className="bg-hollow-darker rounded-lg p-8">
              <div 
                className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: tutorial.content.replace(/\n/g, '<br>') }}
              />
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tutorial.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-hollow-dark text-hollow-silver text-sm rounded-full hover:bg-gray-700 transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-12 bg-hollow-darker rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Comentários</h3>
            <div className="space-y-6">
              <div className="bg-hollow-dark rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-hollow-gold rounded-full flex items-center justify-center">
                    <span className="text-hollow-dark font-bold">U</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Usuario123</div>
                    <div className="text-sm text-gray-400">2 dias atrás</div>
                  </div>
                </div>
                <p className="text-gray-300">
                  Excelente tutorial! Me ajudou muito a entender as mecânicas básicas do jogo. 
                  Obrigado por compartilhar!
                </p>
              </div>
              
              <div className="bg-hollow-dark rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-hollow-blue rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">G</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">GamerPro</div>
                    <div className="text-sm text-gray-400">1 semana atrás</div>
                  </div>
                </div>
                <p className="text-gray-300">
                  Muito detalhado e bem explicado. Recomendo para todos os iniciantes!
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <textarea
                placeholder="Deixe seu comentário..."
                className="input-field w-full h-24 resize-none"
              />
              <button className="btn-primary mt-4">
                Comentar
              </button>
            </div>
          </div>
        )}

        {/* Related Tutorials */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-white mb-8">Tutoriais Relacionados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials
              .filter(t => t.id !== tutorial.id && t.category === tutorial.category)
              .slice(0, 2)
              .map((relatedTutorial) => (
                <Link
                  key={relatedTutorial.id}
                  to={`/tutorial/${relatedTutorial.id}`}
                  className="bg-hollow-darker rounded-lg p-6 hover:bg-gray-800 transition-colors duration-200"
                >
                  <h4 className="text-lg font-semibold text-white mb-2 hover:text-hollow-gold transition-colors duration-200">
                    {relatedTutorial.title}
                  </h4>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {relatedTutorial.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail;





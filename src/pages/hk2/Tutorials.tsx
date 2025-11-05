import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import TutorialCard from '../../components/TutorialCard';
import CategoryFilter from '../../components/CategoryFilter';
import { tutorialsHK2 } from '../../data/tutorialsHK2';

const TutorialsHK2: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || '');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTutorials = useMemo(() => {
    return tutorialsHK2.filter(tutorial => {
      const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || tutorial.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('categoria', category);
    } else {
      newParams.delete('categoria');
    }
    setSearchParams(newParams);
  };

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Tutoriais de Hollow Knight: Silksong
          </h1>
          <p className="text-gray-400 text-lg">
            Encontre o guia perfeito para sua jornada em Pharloom
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-hollow-darker rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar tutoriais..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="input-field pl-10 pr-4 py-3 w-full text-lg"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary inline-flex items-center space-x-2 px-6 py-3"
            >
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Category Filter */}
          {showFilters && (
            <div className="mt-6">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-400">
            {filteredTutorials.length === 0 ? (
              <span>Nenhum tutorial encontrado</span>
            ) : (
              <span>
                {filteredTutorials.length} tutorial{filteredTutorials.length !== 1 ? 'is' : ''} encontrado{filteredTutorials.length !== 1 ? 's' : ''}
                {searchQuery && ` para "${searchQuery}"`}
                {selectedCategory && ` na categoria "${selectedCategory}"`}
              </span>
            )}
          </div>
        </div>

        {/* Tutorials Grid */}
        {filteredTutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tutorial, index) => (
              <div key={tutorial.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <TutorialCard tutorial={tutorial} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-hollow-darker rounded-lg p-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Nenhum tutorial encontrado
              </h3>
              <p className="text-gray-400 mb-6">
                Tente ajustar seus filtros ou termos de busca
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                  setSearchParams({});
                }}
                className="btn-primary"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {filteredTutorials.length > 0 && filteredTutorials.length >= 6 && (
          <div className="text-center mt-12">
            <button className="btn-secondary px-8 py-3">
              Carregar Mais Tutoriais
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsHK2;


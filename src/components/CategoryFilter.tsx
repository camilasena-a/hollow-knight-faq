import React from 'react';
import { categories } from '../data/tutorials';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-hollow-darker rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">Filtrar por Categoria</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => onCategoryChange('')}
          className={`p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
            selectedCategory === ''
              ? 'bg-hollow-gold text-hollow-dark'
              : 'bg-hollow-dark text-gray-300 hover:bg-gray-700'
          }`}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.name)}
            className={`p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category.name
                ? 'bg-hollow-gold text-hollow-dark'
                : 'bg-hollow-dark text-gray-300 hover:bg-gray-700'
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

import React from 'react';
import { Link } from 'react-router-dom';

const GameSelection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-hollow-darker via-hollow-dark to-hollow-darker flex items-center justify-center px-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="text-hollow-gold">Hollow Knight</span>
            <span className="text-gray-300"> FAQ Collection</span>
          </h1>
        </div>

        {/* Game Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* Hollow Knight 1 */}
          <Link
            to="/hk1"
            className="group relative overflow-hidden rounded-lg bg-hollow-dark border-2 border-gray-700 hover:border-hollow-gold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-hollow-gold/50 cursor-pointer animate-slide-up"
          >
            <div className="relative h-full p-4 md:p-6">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-hollow-gold to-transparent" />
              </div>
              
              {/* Click Indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-3 h-3 bg-hollow-gold rounded-full animate-pulse" />
              </div>
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {/* Icon */}
                <div className="mb-3 flex justify-center">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="./images/knight.png"
                      alt="Knight"
                      className="w-12 h-12 md:w-16 md:h-16 object-contain"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="flex justify-center group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="./images/logotipo-texto.png"
                    alt="Hollow Knight"
                    className="h-8 md:h-10 w-auto"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/*  */}
          <Link
            to="/hk2"
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-red-300 via-red-400 to-red-500 border-2 border-red-400 hover:border-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50 cursor-pointer animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="relative h-full p-4 md:p-6">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600" />
              </div>
              
              {/* Click Indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {/* Icon */}
                <div className="mb-3 flex justify-center">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="./images/hornet.png"
                      alt="Hornet"
                      className="w-12 h-12 md:w-16 md:h-16 object-contain"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="flex justify-center group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="./images/HK-Silksong_logo.webp"
                    alt="Silksong"
                    className="h-8 md:h-10 w-auto"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default GameSelection;


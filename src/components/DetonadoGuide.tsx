import React, { useState } from 'react';
import { CheckCircle, Clock, Sword, Star, Zap, Eye, MapPin, Trophy } from 'lucide-react';

interface StepData {
  stepNumber: number;
  title: string;
  objective: string;
  progress: number;
  timeEstimate: string;
  bosses: string[];
  items: string[];
  abilities: string[];
  observations: string[];
  image?: string;
  description: string;
}

const DetonadoGuide: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const steps: StepData[] = [
    {
      stepNumber: 1,
      title: "Pegando o primeiro amuleto e primeiro passeio pela Encruzilhada",
      objective: "Coletar o primeiro amuleto, derrotar o Falso Cavaleiro e obter habilidades básicas",
      progress: 4,
      timeEstimate: "15-20 minutos",
      bosses: ["Falso Cavaleiro (1%)"],
      items: ["Fúria dos Caídos (1%)", "Apanhador de Almas (1%)"],
      abilities: ["Espírito Vingativo (1%)"],
      observations: [
        "Primeiro amuleto do jogo obtido",
        "Encontro com Cornifer para compra do mapa",
        "Ativação do besouro para acesso a novas áreas",
        "Primeiro chefe principal derrotado"
      ],
      image: "/images/mapa1.png",
      description: `Assim que iniciar o jogo, siga para a direita abrindo o caminho pelos portões e eliminando os pequenos inimigos que surgem até chegar às plataformas elevadas. Suba em cada plataforma, seguindo o caminho até chegar ao topo da área. Ao subir todas as plataformas, você chegará ao Lifeblood Rom, siga para a direita e atravesse o portão. O chão se quebrará no momento em que você atravessar o portão, caia até o final e siga para a direita. Siga saltando sobre os espinhos e desça para encontrar um baú. Este é o primeiro amuleto do jogo, a Fúria dos Caídos.

Retorne pela esquerda e suba novamente as plataformas refazendo o caminho feito anteriormente, ao chegar novamente no buraco aberto, caia e siga pelo caminho acima a direita até chegar no grande portão para Dirtmouth. Ao chegar em Dirtmouth, siga para a direita até cair no poço para a encruzilhada esquecida. Nesse momento, siga para a esquerda, desça por todas as plataformas na área seguinte, encontre Cornifer e compre um mapa. Em seguida, siga para a direita na saída abaixo de Cornifer. Lute contra os Aspids caçadores na área seguinte e siga para a direita por todas as áreas até encontrar a placa do besouro. Ao encontrar a placa, suba na área seguinte, entre na primeira saída à esquerda para ativar o besouro, retorne para a área anterior e entre na segunda área a esquerda para enfrentar o falso cavaleiro.

Derrote o faso cavaleiro para obter o Brasão da Cidade e siga para a área a esquerda para encontrar com o Xamã e obter o Espírito Vingativo. Após passar pelo miniboss na área acima do Xamã, pegue o amuleto Apanhador de Almas Desça até o Xamã e sente-se no banco.`
    }
  ];

  const totalProgress = steps.reduce((sum, step) => sum + step.progress, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header do Tutorial */}
      <div className="bg-gradient-to-r from-hollow-purple/20 to-hollow-blue/20 rounded-xl p-8 border border-hollow-gold/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Detonado 112%</h1>
            <p className="text-hollow-silver text-lg">
              Guia completo e detalhado para alcançar 112% de conclusão em Hollow Knight
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-hollow-gold">{totalProgress}%</div>
            <div className="text-sm text-hollow-silver">Progresso Total</div>
          </div>
        </div>
        
        {/* Barra de Progresso Global */}
        <div className="w-full bg-hollow-darker rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-hollow-gold to-hollow-purple h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(totalProgress / 112) * 100}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-sm text-hollow-silver">
          <span>Progresso: {totalProgress}/112%</span>
          <span>Tempo estimado: {steps.reduce((sum, step) => {
            const time = parseInt(step.timeEstimate.split('-')[0]);
            return sum + time;
          }, 0)}-{steps.reduce((sum, step) => {
            const time = parseInt(step.timeEstimate.split('-')[1].split(' ')[0]);
            return sum + time;
          }, 0)} minutos</span>
        </div>
      </div>

      {/* Lista de Passos */}
      <div className="space-y-6">
        {steps.map((step) => (
          <StepCard
            key={step.stepNumber}
            step={step}
            isExpanded={expandedStep === step.stepNumber}
            onToggle={() => setExpandedStep(
              expandedStep === step.stepNumber ? null : step.stepNumber
            )}
          />
        ))}
      </div>

      {/* Próximos Passos (Placeholder) */}
      <div className="bg-hollow-darker/50 rounded-xl p-8 border border-hollow-gold/20 text-center">
        <Trophy className="w-16 h-16 text-hollow-gold mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Próximos Passos</h3>
        <p className="text-hollow-silver">
          Mais passos serão adicionados em breve para completar o guia até 112%
        </p>
      </div>
    </div>
  );
};

interface StepCardProps {
  step: StepData;
  isExpanded: boolean;
  onToggle: () => void;
}

const StepCard: React.FC<StepCardProps> = ({ step, isExpanded, onToggle }) => {
  return (
    <div className="bg-hollow-darker rounded-xl border border-hollow-gold/30 overflow-hidden hover:border-hollow-gold/50 transition-all duration-300">
      {/* Header do Card */}
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-hollow-gold text-hollow-dark font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center">
              {step.stepNumber}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
              <p className="text-hollow-silver text-sm">{step.objective}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-hollow-gold font-bold text-lg">+{step.progress}%</div>
              <div className="text-xs text-hollow-silver">Progresso</div>
            </div>
            <div className="flex items-center space-x-1 text-hollow-silver">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{step.timeEstimate}</span>
            </div>
            <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
              <svg className="w-6 h-6 text-hollow-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Expandido */}
      {isExpanded && (
        <div className="border-t border-hollow-gold/20 p-6 space-y-6">
          {/* Imagem do Passo */}
          {step.image && (
            <div className="rounded-lg overflow-hidden">
              <img 
                src={step.image} 
                alt={`Mapa do passo ${step.stepNumber}`}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Descrição */}
          <div className="bg-hollow-dark/50 rounded-lg p-4">
            <p className="text-hollow-silver leading-relaxed whitespace-pre-line">
              {step.description}
            </p>
          </div>

          {/* Grid de Informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Chefes Enfrentados */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Sword className="w-5 h-5 text-red-400" />
                <h4 className="font-semibold text-white">Chefes Enfrentados</h4>
              </div>
              <div className="space-y-1">
                {step.bosses.map((boss, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-hollow-silver">{boss}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itens Obtidos */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Star className="w-5 h-5 text-blue-400" />
                <h4 className="font-semibold text-white">Itens Obtidos</h4>
              </div>
              <div className="space-y-1">
                {step.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-hollow-silver">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Habilidades Obtidas */}
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-5 h-5 text-purple-400" />
                <h4 className="font-semibold text-white">Habilidades Obtidas</h4>
              </div>
              <div className="space-y-1">
                {step.abilities.map((ability, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-hollow-silver">{ability}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Observações */}
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Eye className="w-5 h-5 text-yellow-400" />
                <h4 className="font-semibold text-white">Observações</h4>
              </div>
              <div className="space-y-1">
                {step.observations.map((observation, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-hollow-silver">{observation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetonadoGuide;

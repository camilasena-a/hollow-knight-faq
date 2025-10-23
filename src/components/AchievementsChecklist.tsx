import React, { useState, useEffect } from 'react';

interface AchievementItem {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Extremo';
  points: number;
}

interface AchievementsChecklistProps {
  tutorialId: string;
}

const AchievementsChecklist: React.FC<AchievementsChecklistProps> = ({ tutorialId }) => {
  const [completedAchievements, setCompletedAchievements] = useState<Set<string>>(new Set());
  const [totalPoints, setTotalPoints] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Dados das conquistas baseadas nas conquistas reais do jogo
  const achievementsData: AchievementItem[] = [
    // Miscelania (1-21)
    { id: 'negligencia', name: 'Negligência', description: 'Deixe Zote morrer', category: 'Miscelania', difficulty: 'Fácil', points: 10 },
    { id: 'testemunha', name: 'Testemunha', description: 'Passe um momento final com Quirrel', category: 'Miscelania', difficulty: 'Médio', points: 20 },
    { id: 'pureza', name: 'Pureza', description: 'Mate o Forjador de Ferrões com o Ferrão Puro', category: 'Miscelania', difficulty: 'Difícil', points: 30 },
    { id: 'casal-feliz', name: 'Casal Feliz', description: 'Permita que o Forjador de Ferrões encontre uma nova vocação', category: 'Miscelania', difficulty: 'Médio', points: 20 },
    { id: 'consolacao', name: 'Consolação', description: 'Traga a paz para a Pranteadora Cinzenta', category: 'Miscelania', difficulty: 'Médio', points: 20 },
    { id: 'vazio', name: 'Vazio', description: 'Relembre o passado e una o Abismo', category: 'Miscelania', difficulty: 'Difícil', points: 30 },
    { id: 'professora', name: 'Professora', description: 'Destrua Monomon, a Professora', category: 'Miscelania', difficulty: 'Difícil', points: 30 },
    { id: 'observador', name: 'Observador', description: 'Destrua Lurien, o Observador', category: 'Miscelania', difficulty: 'Difícil', points: 30 },
    { id: 'besta', name: 'Besta', description: 'Destrua Herrah, a Besta', category: 'Miscelania', difficulty: 'Difícil', points: 30 },
    { id: 'cartografo', name: 'Cartógrafo', description: 'Adquira um mapa de cada área', category: 'Miscelania', difficulty: 'Médio', points: 20 },
    { id: 'conclusao', name: 'Conclusão', description: 'Consiga 100% de conclusão e termine o jogo', category: 'Miscelania', difficulty: 'Difícil', points: 40 },
    { id: 'finalizacao-rapida', name: 'Finalização Rápida', description: 'Consiga 100% de conclusão e termine o jogo em menos de 20 horas', category: 'Miscelania', difficulty: 'Extremo', points: 50 },
    { id: 'cacador-habilidoso', name: 'Caçador Habilidoso', description: 'Registre todas as criaturas de Hallownest no Diário do Caçador', category: 'Miscelania', difficulty: 'Difícil', points: 30 },
    { id: 'verdadeiro-cacador', name: 'Verdadeiro Caçador', description: 'Receba a Marca do Caçador', category: 'Miscelania', difficulty: 'Difícil', points: 30 },
    { id: 'alma-de-aco', name: 'Alma de Aço', description: 'Finalize o jogo no modo Alma de Aço', category: 'Miscelania', difficulty: 'Extremo', points: 50 },
    { id: 'coracao-de-aco', name: 'Coração de Aço', description: 'Consiga 100% de conclusão do jogo no modo Alma de Aço', category: 'Miscelania', difficulty: 'Extremo', points: 60 },
    { id: 'speedrun-1', name: 'Speedrun 1', description: 'Complete o jogo em menos de 10 horas', category: 'Miscelania', difficulty: 'Difícil', points: 30 },
    { id: 'speedrun-2', name: 'Speedrun 2', description: 'Complete o Jogo em menos de 5 horas', category: 'Miscelania', difficulty: 'Extremo', points: 50 },
    { id: 'guerreiro', name: 'Guerreiro', description: 'Complete a Provação do Guerreiro', category: 'Miscelania', difficulty: 'Difícil', points: 30 },
    { id: 'conquistador', name: 'Conquistador', description: 'Complete a Provação do Conquistador', category: 'Miscelania', difficulty: 'Extremo', points: 40 },
    { id: 'tolo', name: 'Tolo', description: 'Complete a Provação do Tolo', category: 'Miscelania', difficulty: 'Extremo', points: 50 },

    // Conquistas de Amuletos (22-24)
    { id: 'afortunado', name: 'Afortunado', description: 'Adquira seu primeiro Amuleto', category: 'Amuletos', difficulty: 'Fácil', points: 10 },
    { id: 'encantado', name: 'Encantado', description: 'Adquira metade dos Amuletos de Hallownest', category: 'Amuletos', difficulty: 'Médio', points: 20 },
    { id: 'abencoado', name: 'Abençoado', description: 'Adquira todos os Amuletos e receba a bênção de Salubra', category: 'Amuletos', difficulty: 'Difícil', points: 40 },

    // Fragmentos de Máscara (25-26)
    { id: 'protegido', name: 'Protegido', description: 'Adquira 4 Fragmentos de Máscara', category: 'Fragmentos de Máscara', difficulty: 'Fácil', points: 15 },
    { id: 'mascarado', name: 'Mascarado', description: 'Adquira todos os Fragmentos de Máscara', category: 'Fragmentos de Máscara', difficulty: 'Médio', points: 25 },

    // Fragmentos de Receptáculo (27-28)
    { id: 'cheio-de-alma', name: 'Cheio de Alma', description: 'Adquira 3 Fragmentos de Receptáculo', category: 'Fragmentos de Receptáculo', difficulty: 'Fácil', points: 15 },
    { id: 'alma-do-mundo', name: 'Alma do mundo', description: 'Adquira todos os Fragmentos de Receptáculo', category: 'Fragmentos de Receptáculo', difficulty: 'Médio', points: 25 },

    // Chefes (29-41)
    { id: 'falsidade', name: 'Falsidade', description: 'Derrote o Falso Cavaleiro', category: 'Chefes', difficulty: 'Fácil', points: 10 },
    { id: 'forca', name: 'Força', description: 'Derrote o Campeão Fracassado', category: 'Chefes', difficulty: 'Médio', points: 15 },
    { id: 'teste-de-resolucao', name: 'Teste de Resolução', description: 'Derrote Hornet no Caminho Verde', category: 'Chefes', difficulty: 'Médio', points: 20 },
    { id: 'prova-de-resolucao', name: 'Prova de Resolução', description: 'Derrote Hornet na Borda do Reino', category: 'Chefes', difficulty: 'Difícil', points: 30 },
    { id: 'iluminacao', name: 'Iluminação', description: 'Derrote o Mestre das Almas', category: 'Chefes', difficulty: 'Médio', points: 15 },
    { id: 'mortalidade', name: 'Mortalidade', description: 'Derrote o Tirano das Almas', category: 'Chefes', difficulty: 'Difícil', points: 25 },
    { id: 'libertacao', name: 'Libertação', description: 'Derrote o Receptáculo Quebrado', category: 'Chefes', difficulty: 'Difícil', points: 25 },
    { id: 'paz', name: 'Paz', description: 'Derrote o Parente Perdido', category: 'Chefes', difficulty: 'Médio', points: 15 },
    { id: 'honra', name: 'Honra', description: 'Derrote o Defensor do Esterco', category: 'Chefes', difficulty: 'Médio', points: 15 },
    { id: 'respeito', name: 'Respeito', description: 'Derrote os Lordes Louva-a-Deus', category: 'Chefes', difficulty: 'Difícil', points: 25 },
    { id: 'obsessao', name: 'Obsessão', description: 'Derrote o Colecionador', category: 'Chefes', difficulty: 'Difícil', points: 25 },
    { id: 'execucao', name: 'Execução', description: 'Derrote o Lorde Traidor', category: 'Chefes', difficulty: 'Difícil', points: 25 },
    { id: 'rivalidade', name: 'Rivalidade', description: 'Derrote Zote no Coliseu dos Tolos', category: 'Chefes', difficulty: 'Difícil', points: 25 },

    // Essência (42-44)
    { id: 'sintonia', name: 'Sintonia', description: 'Colete 600 Essências', category: 'Essência', difficulty: 'Médio', points: 20 },
    { id: 'despertar', name: 'Despertar', description: 'Colete 1800 Essências e desperte o Ferrão dos Sonhos', category: 'Essência', difficulty: 'Difícil', points: 30 },
    { id: 'ascensao', name: 'Ascensão', description: 'Colete 2400 Essências e ouça as palavras finais da Vidente', category: 'Essência', difficulty: 'Difícil', points: 35 },

    // Larvas (45-46)
    { id: 'amigo-das-larvas', name: 'Amigo das Larvas', description: 'Resgate metade das larvas prisioneiras', category: 'Larvas', difficulty: 'Fácil', points: 15 },
    { id: 'metamorfose', name: 'Metamorfose', description: 'Resgate todas as larvas prisioneiras', category: 'Larvas', difficulty: 'Médio', points: 25 },

    // Estações de Besouro (47-48)
    { id: 'conexao', name: 'Conexão', description: 'Abra metade das Estações de Besouro de Hallownest', category: 'Estações de Besouro', difficulty: 'Fácil', points: 15 },
    { id: 'esperanca', name: 'Esperança', description: 'Abra todas as Estações de Besouro de Hallownest e descubra o Ninho dos Besouros', category: 'Estações de Besouro', difficulty: 'Médio', points: 25 },

    // Finais (49-52)
    { id: 'cavaleiro-vazio', name: 'O Cavaleiro Vazio', description: 'Derrote o Cavaleiro Vazio e torne-se o Receptáculo', category: 'Finais', difficulty: 'Difícil', points: 40 },
    { id: 'irmaos-selados', name: 'Irmãos Selados', description: 'Derrote o Cavaleiro Vazio com Hornet ao seu lado', category: 'Finais', difficulty: 'Difícil', points: 40 },
    { id: 'nao-sonhe-mais', name: 'Não Sonhe Mais', description: 'Derrote a Radiância e consuma a luz', category: 'Finais', difficulty: 'Extremo', points: 50 },
    { id: 'passagem-da-era', name: 'Passagem da Era', description: 'Ajude o Arauto a seguir em frente', category: 'Finais', difficulty: 'Difícil', points: 35 },

    // Conquistas de sonhos escondidos (53-54)
    { id: 'memoria', name: 'Memória', description: 'Derrote o Defensor Branco', category: 'Sonhos Escondidos', difficulty: 'Difícil', points: 30 },
    { id: 'romance-sombrio', name: 'Romance Sombrio', description: 'Derrote o Príncipe Cinza Zote', category: 'Sonhos Escondidos', difficulty: 'Difícil', points: 30 },

    // Conquistas da Trupe Grimm (55-57)
    { id: 'grande-atucao', name: 'Grande Atuação', description: 'Derrote o Líder da Trupe Grimm', category: 'Trupe Grimm', difficulty: 'Difícil', points: 30 },
    { id: 'ritual', name: 'Ritual', description: 'Derrote o Rei do Pesadelo e complete o Ritual', category: 'Trupe Grimm', difficulty: 'Extremo', points: 45 },
    { id: 'banimento', name: 'Banimento', description: 'Bana a Trupe Grimm de Hallownest', category: 'Trupe Grimm', difficulty: 'Difícil', points: 30 },

    // Conquistas de Deus Mestre (58-63)
    { id: 'irmandade', name: 'Irmandade', description: 'Complete o Panteão do Mestre', category: 'Deus Mestre', difficulty: 'Extremo', points: 50 },
    { id: 'inspiracao', name: 'Inspiração', description: 'Complete o Panteão do Pintor', category: 'Deus Mestre', difficulty: 'Extremo', points: 55 },
    { id: 'foco', name: 'Foco', description: 'Complete o Panteão do Sábio', category: 'Deus Mestre', difficulty: 'Extremo', points: 60 },
    { id: 'alma-sombra', name: 'Alma & Sombra', description: 'Complete o Panteão do Cavaleiro', category: 'Deus Mestre', difficulty: 'Extremo', points: 65 },
    { id: 'abrace-o-vazio', name: 'Abrace o Vazio', description: 'Ascenda no Panteão de Hallownest e tome seu lugar no pico', category: 'Deus Mestre', difficulty: 'Extremo', points: 80 },
    { id: 'conclusao-pura', name: 'Conclusão Pura', description: 'Conquiste 112% de conclusão e termine o jogo', category: 'Deus Mestre', difficulty: 'Extremo', points: 100 }
  ];

  // Carregar progresso salvo
  useEffect(() => {
    const saved = localStorage.getItem(`achievements_${tutorialId}`);
    if (saved) {
      const savedAchievements = JSON.parse(saved);
      setCompletedAchievements(new Set(savedAchievements));
    }
  }, [tutorialId]);

  // Calcular pontos totais
  useEffect(() => {
    const points = achievementsData
      .filter(achievement => completedAchievements.has(achievement.id))
      .reduce((total, achievement) => total + achievement.points, 0);
    setTotalPoints(points);
  }, [completedAchievements]);

  // Salvar progresso
  const saveProgress = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem(`achievements_${tutorialId}`, JSON.stringify(Array.from(completedAchievements)));
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular salvamento
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Alternar conquista
  const toggleAchievement = (achievementId: string) => {
    const newCompleted = new Set(completedAchievements);
    if (newCompleted.has(achievementId)) {
      newCompleted.delete(achievementId);
    } else {
      newCompleted.add(achievementId);
    }
    setCompletedAchievements(newCompleted);
    saveProgress();
  };

  // Marcar todas as conquistas
  const completeAll = () => {
    const allAchievementIds = achievementsData.map(achievement => achievement.id);
    setCompletedAchievements(new Set(allAchievementIds));
    saveProgress();
  };

  // Limpar todas as conquistas
  const clearAll = () => {
    setCompletedAchievements(new Set());
    saveProgress();
  };

  // Agrupar conquistas por categoria
  const achievementsByCategory = achievementsData.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, AchievementItem[]>);

  // Calcular estatísticas
  const totalAchievements = achievementsData.length;
  const completedCount = completedAchievements.size;
  const completionPercentage = Math.round((completedCount / totalAchievements) * 100);
  const maxPoints = achievementsData.reduce((total, achievement) => total + achievement.points, 0);

  // Função para criar gradiente da barra de progresso baseado na porcentagem
  const getProgressBarGradient = (percentage: number) => {
    // Se atingiu 100%, mostrar todas as 5 cores
    if (percentage >= 100) {
      return 'linear-gradient(to right, #10b981 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%)';
    }
    // Se atingiu 80%, mostrar 4 cores
    else if (percentage >= 80) {
      return 'linear-gradient(to right, #10b981 0%, #059669 33%, #047857 66%, #065f46 100%)';
    }
    // Se atingiu 60%, mostrar 3 cores
    else if (percentage >= 60) {
      return 'linear-gradient(to right, #10b981 0%, #059669 50%, #047857 100%)';
    }
    // Se atingiu 40%, mostrar 2 cores
    else if (percentage >= 40) {
      return 'linear-gradient(to right, #10b981 0%, #059669 100%)';
    }
    // Se não atingiu 40%, mostrar apenas 1 cor
    else {
      return '#10b981';
    }
  };

  // Função para determinar a cor atual da porcentagem
  const getCurrentPercentageColor = (percentage: number) => {
    if (percentage < 20) {
      return '#6b7280'; // Cinza claro
    } else if (percentage >= 20 && percentage < 40) {
      return '#4b5563'; // Cinza médio
    } else if (percentage >= 40 && percentage < 60) {
      return '#1f2937'; // Cinza escuro
    } else if (percentage >= 60 && percentage < 80) {
      return '#c6b7be'; // Rosa claro
    } else if (percentage >= 80 && percentage < 100) {
      return '#fafbf6'; // Branco/creme
    } else if (percentage >= 100) {
      return '#fbbf24'; // Dourado
    }
    return '#6b7280'; // Cor padrão
  };

  // Função para obter cor da dificuldade
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-400 bg-green-900/30';
      case 'Médio': return 'text-yellow-400 bg-yellow-900/30';
      case 'Difícil': return 'text-orange-400 bg-orange-900/30';
      case 'Extremo': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">🏆 Conquistas de Hollow Knight</h1>
        <p className="text-gray-300 text-lg">
          Acompanhe seu progresso através de todas as conquistas disponíveis em Hallownest
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-hollow-darker rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{completedCount}</div>
          <div className="text-sm text-gray-400">Conquistas Completas</div>
        </div>
        <div className="bg-hollow-darker rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{totalAchievements}</div>
          <div className="text-sm text-gray-400">Total de Conquistas</div>
        </div>
        <div className="bg-hollow-darker rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{completionPercentage}%</div>
          <div className="text-sm text-gray-400">Progresso</div>
        </div>
        <div className="bg-hollow-darker rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{totalPoints}</div>
          <div className="text-sm text-gray-400">Pontos ({maxPoints} total)</div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={completeAll}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
        >
          Marcar Todas
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
        >
          Limpar Todas
        </button>
      </div>

      {/* Barra de Progresso */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Progresso Geral</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            style={{ 
              width: `${completionPercentage}%`,
              height: '12px',
              background: getProgressBarGradient(completionPercentage),
              borderRadius: '9999px',
              transition: 'all 0.5s ease',
              minWidth: completionPercentage > 0 ? '4px' : '0px'
            }}
          />
        </div>
      </div>

      {/* Lista de Conquistas por Categoria */}
      <div className="space-y-8">
        {Object.entries(achievementsByCategory).map(([category, achievements]) => {
          const categoryCompleted = achievements.filter(a => completedAchievements.has(a.id)).length;
          const categoryTotal = achievements.length;
          const categoryPercentage = Math.round((categoryCompleted / categoryTotal) * 100);

          return (
            <div key={category} className="bg-hollow-darker rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{category}</h2>
                <div className="text-sm text-gray-400">
                  {categoryCompleted}/{categoryTotal} ({categoryPercentage}%)
                </div>
              </div>
              
              <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    style={{ 
                      width: `${categoryPercentage}%`,
                      height: '8px',
                      background: getProgressBarGradient(categoryPercentage),
                      borderRadius: '9999px',
                      transition: 'all 0.5s ease',
                      minWidth: categoryPercentage > 0 ? '4px' : '0px'
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {achievements.map((achievement) => {
                  const isCompleted = completedAchievements.has(achievement.id);
                  
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                        isCompleted
                          ? 'bg-green-900/20 border-green-500 text-green-100'
                          : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                      onClick={() => toggleAchievement(achievement.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">
                              {isCompleted ? '✅' : '⭕'}
                            </span>
                            <h3 className="font-semibold text-sm">{achievement.name}</h3>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">{achievement.description}</p>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(achievement.difficulty)}`}>
                              {achievement.difficulty}
                            </span>
                            <span className="text-xs text-yellow-400 font-medium">
                              {achievement.points} pts
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mensagem de conclusão */}
      {completionPercentage >= 100 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-600 to-green-500 rounded-lg text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white mb-2">Parabéns!</h3>
          <p className="text-green-100">
            Você completou todas as conquistas de Hollow Knight! Você é uma verdadeira lenda de Hallownest!
          </p>
        </div>
      )}

      {/* Indicador de salvamento */}
      {isSaving && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Salvando progresso...
        </div>
      )}
    </div>
  );
};

export default AchievementsChecklist;

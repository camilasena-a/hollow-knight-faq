import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface ChecklistItem {
  id: string;
  name: string;
  category: string;
  percentage: number;
}

interface CompletionChecklistProps {
  tutorialId: string;
}

const CompletionChecklist: React.FC<CompletionChecklistProps> = ({ tutorialId }) => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Dados do checklist de 112%
  const checklistData: ChecklistItem[] = [
    // Chefes (17%)
    { id: 'false-knight', name: 'Falso Cavaleiro', category: 'Chefes', percentage: 1 },
    { id: 'hornet-protector', name: 'Hornet Protetora', category: 'Chefes', percentage: 1 },
    { id: 'brooding-mawlek', name: 'Mawlek Incubador', category: 'Chefes', percentage: 1 },
    { id: 'gruz-mother', name: 'Mãe Mosca', category: 'Chefes', percentage: 1 },
    { id: 'mantis-lords', name: 'Lordes Louva-a-Deus', category: 'Chefes', percentage: 1 },
    { id: 'soul-master', name: 'Mestre das Almas', category: 'Chefes', percentage: 1 },
    { id: 'dung-defender', name: 'Defensor do Esterco', category: 'Chefes', percentage: 1 },
    { id: 'broken-vessel', name: 'Receptáculo Quebrado', category: 'Chefes', percentage: 1 },
    { id: 'watcher-knights', name: 'Cavaleiros Sentinelas', category: 'Chefes', percentage: 1 },
    { id: 'uumuu', name: 'Uumuu', category: 'Chefes', percentage: 1 },
    { id: 'hornet-sentinel', name: 'Hornet Sentinela', category: 'Chefes', percentage: 1 },
    { id: 'collector', name: 'O Colecionador', category: 'Chefes', percentage: 1 },
    { id: 'nosk', name: 'Nosk', category: 'Chefes', percentage: 1 },
    { id: 'traitor-lord', name: 'Lorde Traidor', category: 'Chefes', percentage: 1 },
    { id: 'grimm', name: 'Grimm', category: 'Chefes', percentage: 1 },
    { id: 'nightmare-grimm', name: 'Rei do Pesadelo Grimm/Banimento', category: 'Chefes', percentage: 1 },
    { id: 'hive-knight', name: 'Cavaleiro da Colmeia', category: 'Chefes', percentage: 1 },

    // Amuletos (40%)
    { id: 'wayward-compass', name: 'Bússola Caprichosa', category: 'Amuletos', percentage: 1 },
    { id: 'gathering-swarm', name: 'Enxame de Colecionadores', category: 'Amuletos', percentage: 1 },
    { id: 'stalwart-shell', name: 'Carapaça Robusta', category: 'Amuletos', percentage: 1 },
    { id: 'soul-catcher', name: 'Apanhador de Almas', category: 'Amuletos', percentage: 1 },
    { id: 'shaman-stone', name: 'Pedra do Xamã', category: 'Amuletos', percentage: 1 },
    { id: 'soul-eater', name: 'Devorador de Almas', category: 'Amuletos', percentage: 1 },
    { id: 'dashmaster', name: 'Mestre da Esquiva', category: 'Amuletos', percentage: 1 },
    { id: 'thorns-of-agony', name: 'Espinhos da Agonia', category: 'Amuletos', percentage: 1 },
    { id: 'fury-of-the-fallen', name: 'Fúria dos Caídos', category: 'Amuletos', percentage: 1 },
    { id: 'fragile-heart', name: 'Coração Frágil/Inquebrável', category: 'Amuletos', percentage: 1 },
    { id: 'fragile-greed', name: 'Ganância Frágil/Inquebrável', category: 'Amuletos', percentage: 1 },
    { id: 'fragile-strength', name: 'Força Frágil/Inquebrável', category: 'Amuletos', percentage: 1 },
    { id: 'spell-twister', name: 'Dobrador de Magias', category: 'Amuletos', percentage: 1 },
    { id: 'steady-body', name: 'Corpo Firme', category: 'Amuletos', percentage: 1 },
    { id: 'heavy-blow', name: 'Golpe Pesado', category: 'Amuletos', percentage: 1 },
    { id: 'quick-slash', name: 'Corte Rápido', category: 'Amuletos', percentage: 1 },
    { id: 'longnail', name: 'Ferrão Longo', category: 'Amuletos', percentage: 1 },
    { id: 'mark-of-pride', name: 'Marca de Orgulho', category: 'Amuletos', percentage: 1 },
    { id: 'baldur-shell', name: 'Carapaça de Baldur', category: 'Amuletos', percentage: 1 },
    { id: 'flukenest', name: 'Ninho de Flukes', category: 'Amuletos', percentage: 1 },
    { id: 'defenders-crest', name: 'Insígnia do Defensor', category: 'Amuletos', percentage: 1 },
    { id: 'glowing-womb', name: 'Útero Brilhante', category: 'Amuletos', percentage: 1 },
    { id: 'quick-focus', name: 'Foco Rápido', category: 'Amuletos', percentage: 1 },
    { id: 'deep-focus', name: 'Foco Profundo', category: 'Amuletos', percentage: 1 },
    { id: 'lifeblood-heart', name: 'Coração de Sangue Vital', category: 'Amuletos', percentage: 1 },
    { id: 'lifeblood-core', name: 'Núcleo de Sangue Vital', category: 'Amuletos', percentage: 1 },
    { id: 'jonis-blessing', name: 'Bênção de Joni', category: 'Amuletos', percentage: 1 },
    { id: 'hiveblood', name: 'Sangue da Colmeia', category: 'Amuletos', percentage: 1 },
    { id: 'spore-shroom', name: 'Cogumelo com Esporos', category: 'Amuletos', percentage: 1 },
    { id: 'sharp-shadow', name: 'Sombra Afiada', category: 'Amuletos', percentage: 1 },
    { id: 'shape-of-unn', name: 'Forma de Unn', category: 'Amuletos', percentage: 1 },
    { id: 'nailmasters-glory', name: 'Glória do Mestre do Ferrão', category: 'Amuletos', percentage: 1 },
    { id: 'weaversong', name: 'Canção das Tecelãs', category: 'Amuletos', percentage: 1 },
    { id: 'dream-wielder', name: 'Portador dos Sonhos', category: 'Amuletos', percentage: 1 },
    { id: 'kingsoul', name: 'Alma do Rei/Coração Vazio', category: 'Amuletos', percentage: 1 },
    { id: 'dreamshield', name: 'Escudo dos Sonhos', category: 'Amuletos', percentage: 1 },
    { id: 'grimmchild', name: 'Criança Grimm/Melodia Despreocupada', category: 'Amuletos', percentage: 1 },
    { id: 'sprintmaster', name: 'Mestre da Corrida', category: 'Amuletos', percentage: 1 },
    { id: 'grubsong', name: 'Canção das Larvas', category: 'Amuletos', percentage: 1 },
    { id: 'grubberflys-elegy', name: 'Elegia da Larvamosca', category: 'Amuletos', percentage: 1 },

    // Equipamentos (14%)
    { id: 'crystal-heart', name: 'Coração de Cristal', category: 'Equipamentos', percentage: 2 },
    { id: 'ismas-tear', name: 'Lágrima de Isma', category: 'Equipamentos', percentage: 2 },
    { id: 'kings-brand', name: 'Marca do Rei', category: 'Equipamentos', percentage: 2 },
    { id: 'monarch-wings', name: 'Asas do Monarca', category: 'Equipamentos', percentage: 2 },
    { id: 'mothwing-cloak', name: 'Manto de Asa de Mariposa', category: 'Equipamentos', percentage: 2 },
    { id: 'shade-cloak', name: 'Manto Sombrio', category: 'Equipamentos', percentage: 2 },
    { id: 'mantis-claw', name: 'Garra de Mantis', category: 'Equipamentos', percentage: 2 },

    // Fragmentos de Máscara (4%)
    { id: 'mask-upgrade-1', name: 'Melhoria de Máscara 1', category: 'Fragmentos de Máscara', percentage: 1 },
    { id: 'mask-upgrade-2', name: 'Melhoria de Máscara 2', category: 'Fragmentos de Máscara', percentage: 1 },
    { id: 'mask-upgrade-3', name: 'Melhoria de Máscara 3', category: 'Fragmentos de Máscara', percentage: 1 },
    { id: 'mask-upgrade-4', name: 'Melhoria de Máscara 4', category: 'Fragmentos de Máscara', percentage: 1 },

    // Fragmentos de Receptáculo (3%)
    { id: 'vessel-upgrade-1', name: 'Melhoria de Receptáculo 1', category: 'Fragmentos de Receptáculo', percentage: 1 },
    { id: 'vessel-upgrade-2', name: 'Melhoria de Receptáculo 2', category: 'Fragmentos de Receptáculo', percentage: 1 },
    { id: 'vessel-upgrade-3', name: 'Melhoria de Receptáculo 3', category: 'Fragmentos de Receptáculo', percentage: 1 },

    // Artes do Ferrão (3%)
    { id: 'cyclone-slash', name: 'Corte Ciclone', category: 'Artes do Ferrão', percentage: 1 },
    { id: 'great-slash', name: 'Corte Impulsionado', category: 'Artes do Ferrão', percentage: 1 },
    { id: 'dash-slash', name: 'Grande Corte', category: 'Artes do Ferrão', percentage: 1 },

    // Magias (6%)
    { id: 'vengeful-spirit', name: 'Espírito Vingativo', category: 'Magias', percentage: 1 },
    { id: 'shade-soul', name: 'Alma Sombria', category: 'Magias', percentage: 1 },
    { id: 'desolate-dive', name: 'Mergulho Desolador', category: 'Magias', percentage: 1 },
    { id: 'descending-dark', name: 'Escuridão Descente', category: 'Magias', percentage: 1 },
    { id: 'howling-wraiths', name: 'Espectros Uivantes', category: 'Magias', percentage: 1 },
    { id: 'abyss-shriek', name: 'Grito do Abismo', category: 'Magias', percentage: 1 },

    // Melhorias do Ferrão (4%)
    { id: 'nail-sharp', name: 'Ferrão Velho -> Ferrão Afiado', category: 'Melhorias do Ferrão', percentage: 1 },
    { id: 'nail-channeled', name: 'Ferrão Afiado -> Ferrão Canalizado', category: 'Melhorias do Ferrão', percentage: 1 },
    { id: 'nail-coiled', name: 'Ferrão Canalizado -> Ferrão Serpenteado', category: 'Melhorias do Ferrão', percentage: 1 },
    { id: 'nail-pure', name: 'Ferrão Serpenteado -> Ferrão Puro', category: 'Melhorias do Ferrão', percentage: 1 },

    // Coliseu dos Tolos (3%)
    { id: 'warrior-trial', name: 'Provação do Guerreiro', category: 'Coliseu dos Tolos', percentage: 1 },
    { id: 'conqueror-trial', name: 'Provação do Conquistador', category: 'Coliseu dos Tolos', percentage: 1 },
    { id: 'fool-trial', name: 'Provação do Tolo', category: 'Coliseu dos Tolos', percentage: 1 },

    // Sonhadores (3%)
    { id: 'herrah', name: 'Herrah, a Besta', category: 'Sonhadores', percentage: 1 },
    { id: 'lurien', name: 'Lurien, o Observador', category: 'Sonhadores', percentage: 1 },
    { id: 'monomon', name: 'Monomon, a Professora', category: 'Sonhadores', percentage: 1 },

    // Ferrão dos Sonhos e Essência (3%)
    { id: 'dream-nail-acquired', name: 'Ferrão dos Sonhos adquirido', category: 'Ferrão dos Sonhos', percentage: 1 },
    { id: 'dream-nail-awakened', name: 'Despertar o Ferrão dos Sonhos', category: 'Ferrão dos Sonhos', percentage: 1 },
    { id: 'seer-final-words', name: 'Ouvir as palavras finais da Vidente', category: 'Ferrão dos Sonhos', percentage: 1 },

    // Guerreiros dos Sonhos (7%)
    { id: 'elder-hu', name: 'Ancião Hu', category: 'Guerreiros dos Sonhos', percentage: 1 },
    { id: 'galien', name: 'Galien', category: 'Guerreiros dos Sonhos', percentage: 1 },
    { id: 'gorb', name: 'Gorb', category: 'Guerreiros dos Sonhos', percentage: 1 },
    { id: 'markoth', name: 'Markoth', category: 'Guerreiros dos Sonhos', percentage: 1 },
    { id: 'marmu', name: 'Marmu', category: 'Guerreiros dos Sonhos', percentage: 1 },
    { id: 'no-eyes', name: 'Sem Olhos', category: 'Guerreiros dos Sonhos', percentage: 1 },
    { id: 'xero', name: 'Xero', category: 'Guerreiros dos Sonhos', percentage: 1 },

    // Panteões (5%)
    { id: 'god-tuner', name: 'Sintonizador de Deuses', category: 'Panteões', percentage: 1 },
    { id: 'pantheon-master', name: 'Panteão do Mestre', category: 'Panteões', percentage: 1 },
    { id: 'pantheon-artist', name: 'Panteão do Artista', category: 'Panteões', percentage: 1 },
    { id: 'pantheon-sage', name: 'Panteão do Sábio', category: 'Panteões', percentage: 1 },
    { id: 'pantheon-knight', name: 'Panteão do Cavaleiro', category: 'Panteões', percentage: 1 },
  ];

  // Carregar progresso salvo do localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(`completion-${tutorialId}`);
      if (savedProgress) {
        const parsedData = JSON.parse(savedProgress);
        if (Array.isArray(parsedData)) {
          setCompletedItems(new Set(parsedData));
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar progresso salvo:', error);
      // Se houver erro, limpa o localStorage corrompido
      localStorage.removeItem(`completion-${tutorialId}`);
    }
  }, [tutorialId]);

  // Calcular porcentagem total
  useEffect(() => {
    const total = checklistData.reduce((sum, item) => {
      return completedItems.has(item.id) ? sum + item.percentage : sum;
    }, 0);
    setTotalPercentage(total);
  }, [completedItems, checklistData]);

  // Salvar progresso no localStorage
  const saveProgress = (newCompletedItems: Set<string>) => {
    setIsSaving(true);
    try {
      localStorage.setItem(`completion-${tutorialId}`, JSON.stringify(Array.from(newCompletedItems)));
    } catch (error) {
      console.warn('Erro ao salvar progresso:', error);
      // Se o localStorage estiver cheio, tenta limpar dados antigos
      if (error instanceof DOMException && error.code === 22) {
        console.log('localStorage cheio, tentando limpar dados antigos...');
        // Remove dados de outros tutoriais se necessário
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('completion-') && key !== `completion-${tutorialId}`) {
            localStorage.removeItem(key);
            break;
          }
        }
        // Tenta salvar novamente
        try {
          localStorage.setItem(`completion-${tutorialId}`, JSON.stringify(Array.from(newCompletedItems)));
        } catch (retryError) {
          console.error('Falha ao salvar progresso mesmo após limpeza:', retryError);
        }
      }
    } finally {
      // Remove o indicador de salvamento após um pequeno delay
      setTimeout(() => setIsSaving(false), 500);
    }
  };

  const toggleItem = (itemId: string) => {
    const newCompletedItems = new Set(completedItems);
    if (newCompletedItems.has(itemId)) {
      newCompletedItems.delete(itemId);
    } else {
      newCompletedItems.add(itemId);
    }
    setCompletedItems(newCompletedItems);
    saveProgress(newCompletedItems);
  };

  const clearAll = () => {
    setCompletedItems(new Set());
    saveProgress(new Set());
  };

  const completeAll = () => {
    const allItems = new Set(checklistData.map(item => item.id));
    setCompletedItems(allItems);
    saveProgress(allItems);
  };

  // Função para criar gradiente da barra de progresso baseado na porcentagem
  const getProgressBarGradient = (percentage: number) => {
    // Se atingiu 112%, mostrar todas as 5 cores
    if (percentage >= 112) {
      return 'linear-gradient(to right, #10b981 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%)';
    }
    // Se atingiu 84%, mostrar 4 cores
    else if (percentage >= 84) {
      return 'linear-gradient(to right, #10b981 0%, #059669 33%, #047857 66%, #065f46 100%)';
    }
    // Se atingiu 56%, mostrar 3 cores
    else if (percentage >= 56) {
      return 'linear-gradient(to right, #10b981 0%, #059669 50%, #047857 100%)';
    }
    // Se atingiu 28%, mostrar 2 cores
    else if (percentage >= 28) {
      return 'linear-gradient(to right, #10b981 0%, #059669 100%)';
    }
    // Se não atingiu 28%, mostrar apenas 1 cor
    else {
      return '#10b981';
    }
  };

  // Função para determinar a cor atual da porcentagem (última faixa atingida)
  const getCurrentPercentageColor = (percentage: number) => {
    if (percentage < 28) {
      return '#6b7280'; // Cinza claro
    } else if (percentage >= 28 && percentage < 56) {
      return '#4b5563'; // Cinza médio
    } else if (percentage >= 56 && percentage < 84) {
      return '#1f2937'; // Cinza escuro
    } else if (percentage >= 84 && percentage < 112) {
      return '#c6b7be'; // Rosa claro
    } else if (percentage >= 112) {
      return '#fafbf6'; // Branco/creme
    }
    return '#6b7280'; // Cor padrão
  };

  // Agrupar itens por categoria
  const groupedItems = checklistData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  return (
    <div className="bg-hollow-darker rounded-lg p-8">
      {/* Header com progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-white">Checklist de 112%</h2>
            {isSaving && (
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Salvando...</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div 
              className="text-3xl font-bold"
              style={{ color: getCurrentPercentageColor(totalPercentage) }}
            >
              {totalPercentage}%
            </div>
            <div className="text-sm text-gray-400">de 112%</div>
          </div>
        </div>
        
        {/* Barra de progresso */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div 
            style={{ 
              width: `${(totalPercentage / 112) * 100}%`,
              height: '12px',
              background: getProgressBarGradient(totalPercentage),
              borderRadius: '9999px',
              transition: 'all 0.5s ease',
              minWidth: totalPercentage > 0 ? '4px' : '0px'
            }}
          ></div>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-4">
          <button
            onClick={completeAll}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
          >
            Marcar Todos
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
          >
            Limpar Todos
          </button>
        </div>
      </div>

      {/* Checklist por categoria */}
      <div className="space-y-8">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              {category}
              <span className="ml-2 text-sm text-gray-400">
                ({items.filter(item => completedItems.has(item.id)).length}/{items.length})
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    completedItems.has(item.id)
                      ? 'bg-green-900/30 border border-green-500/50'
                      : 'bg-hollow-dark hover:bg-gray-700 border border-transparent'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={completedItems.has(item.id)}
                    onChange={() => toggleItem(item.id)}
                    className="sr-only"
                  />
                  
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    completedItems.has(item.id)
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-400 hover:border-hollow-gold'
                  }`}>
                    {completedItems.has(item.id) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-white font-medium">{item.name}</div>
                    <div className="text-sm text-gray-400">{item.percentage}%</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem de conclusão */}
      {totalPercentage >= 112 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-600 to-green-500 rounded-lg text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white mb-2">Parabéns!</h3>
          <p className="text-green-100">
            Você completou 112% de Hollow Knight! Você é um verdadeiro completionist!
          </p>
        </div>
      )}
    </div>
  );
};

export default CompletionChecklist;

import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface SpoolFragmentItem {
  id: string;
  name: string;
  location: string;
  description: string;
  category: string;
}

interface SpoolFragmentChecklistProps {
  tutorialId: string;
}

const SpoolFragmentChecklist: React.FC<SpoolFragmentChecklistProps> = ({ tutorialId }) => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);

  // Dados dos fragmentos de carretel em Silksong
  // Nota: Esta lista é baseada em informações disponíveis e pode ser expandida conforme o jogo é lançado
  const fragmentData: SpoolFragmentItem[] = [
    // ATO 1 - Início da Jornada (5 fragmentos)
    { 
      id: 'spool-1', 
      name: 'Vale dos Ossos', 
      location: 'Vale dos Ossos',
      description: 'Encontrado no Vale dos Ossos',
      category: 'Ato 1'
    },
    { 
      id: 'spool-2', 
      name: 'Docas Profundas', 
      location: 'Docas Profundas',
      description: 'Encontrado nas Docas Profundas',
      category: 'Ato 1'
    },
    { 
      id: 'spool-3', 
      name: 'Missão Entregador Perdido', 
      location: 'Varia',
      description: 'Obtido ao completar a missão do Entregador Perdido',
      category: 'Ato 1'
    },
    { 
      id: 'spool-4-ato1', 
      name: 'Pântano Cinzento', 
      location: 'Pântano Cinzento',
      description: 'Encontrado no Pântano Cinzento',
      category: 'Ato 1'
    },
    { 
      id: 'spool-5-ato1', 
      name: 'Ninho de Atla', 
      location: 'Ninho de Atla',
      description: 'Encontrado no Ninho de Atla',
      category: 'Ato 1'
    },

    // ATO 2 - Meio da Jornada (13 fragmentos)
    { 
      id: 'spool-6', 
      name: 'Rochedo', 
      location: 'Rochedo',
      description: 'Encontrado no Rochedo',
      category: 'Ato 2'
    },
    { 
      id: 'spool-7', 
      name: 'Loja Grindle', 
      location: 'Loja Grindle',
      description: 'Obtido na Loja Grindle',
      category: 'Ato 2'
    },
    { 
      id: 'spool-8', 
      name: 'Salvar 14 Pulgas', 
      location: 'Varia',
      description: 'Recompensa por salvar 14 Pulgas',
      category: 'Ato 2'
    },
    { 
      id: 'spool-9', 
      name: 'Degraus Entrada Principal', 
      location: 'Varia',
      description: 'Encontrado nos Degraus da Entrada Principal',
      category: 'Ato 2'
    },
    { 
      id: 'spool-10', 
      name: 'Ala Branca', 
      location: 'Ala Branca',
      description: 'Encontrado na Ala Branca',
      category: 'Ato 2'
    },
    { 
      id: 'spool-11', 
      name: 'Missão Sherma na Ala Branca', 
      location: 'Ala Branca',
      description: 'Obtido ao completar a missão de Sherma na Ala Branca',
      category: 'Ato 2'
    },
    { 
      id: 'spool-12', 
      name: 'Claustroforjas Após Arena', 
      location: 'Claustroforjas',
      description: 'Encontrado nas Claustroforjas após a arena',
      category: 'Ato 2'
    },
    { 
      id: 'spool-13', 
      name: 'Claustroforjas Direito', 
      location: 'Claustroforjas',
      description: 'Encontrado no lado direito das Claustroforjas',
      category: 'Ato 2'
    },
    { 
      id: 'spool-14', 
      name: 'Mecanismo Vital', 
      location: 'Varia',
      description: 'Encontrado no Mecanismo Vital',
      category: 'Ato 2'
    },
    { 
      id: 'spool-15', 
      name: 'Jubilana Após Desaparecimento', 
      location: 'Varia',
      description: 'Encontrado em Jubilana após seu desaparecimento',
      category: 'Ato 2'
    },
    { 
      id: 'spool-16', 
      name: 'Memorium', 
      location: 'Memorium',
      description: 'Encontrado no Memorium',
      category: 'Ato 2'
    },
    { 
      id: 'spool-17', 
      name: 'Salões Supremos', 
      location: 'Salões Supremos',
      description: 'Encontrado nos Salões Supremos',
      category: 'Ato 2'
    },
    { 
      id: 'spool-18', 
      name: 'Docas Profundas (Chave ou Arpão)', 
      location: 'Docas Profundas',
      description: 'Encontrado nas Docas Profundas - requer Chave ou Arpão',
      category: 'Ato 2'
    },

  ];

  // Carregar progresso salvo do localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(`spool-fragments-${tutorialId}`);
      if (savedProgress) {
        const parsedData = JSON.parse(savedProgress);
        if (Array.isArray(parsedData)) {
          setCompletedItems(new Set(parsedData));
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar progresso salvo:', error);
      localStorage.removeItem(`spool-fragments-${tutorialId}`);
    }
  }, [tutorialId]);

  // Salvar progresso no localStorage
  const saveProgress = (newCompletedItems: Set<string>) => {
    setIsSaving(true);
    try {
      localStorage.setItem(`spool-fragments-${tutorialId}`, JSON.stringify(Array.from(newCompletedItems)));
    } catch (error) {
      console.warn('Erro ao salvar progresso:', error);
      if (error instanceof DOMException && error.code === 22) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('spool-fragments-') && key !== `spool-fragments-${tutorialId}`) {
            localStorage.removeItem(key);
            break;
          }
        }
        try {
          localStorage.setItem(`spool-fragments-${tutorialId}`, JSON.stringify(Array.from(newCompletedItems)));
        } catch (retryError) {
          console.error('Falha ao salvar progresso mesmo após limpeza:', retryError);
        }
      }
    } finally {
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
    const allItems = new Set(fragmentData.map(item => item.id));
    setCompletedItems(allItems);
    saveProgress(allItems);
  };

  // Agrupar itens por categoria
  const groupedItems = fragmentData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SpoolFragmentItem[]>);

  const totalFragments = fragmentData.length;
  const collectedFragments = completedItems.size;
  const percentage = Math.round((collectedFragments / totalFragments) * 100);

  return (
    <div className="bg-hollow-darker rounded-lg p-8">
      {/* Header com progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-white">Checklist de Fragmentos de Carretel</h2>
            {isSaving && (
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Salvando...</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-400">
              {collectedFragments}/{totalFragments}
            </div>
            <div className="text-sm text-gray-400">{percentage}% coletados</div>
          </div>
        </div>
        
        {/* Barra de progresso */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div 
            style={{ 
              width: `${percentage}%`,
              height: '12px',
              background: 'linear-gradient(to right, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
              borderRadius: '9999px',
              transition: 'all 0.5s ease',
              minWidth: percentage > 0 ? '4px' : '0px'
            }}
          ></div>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-4">
          <button
            onClick={completeAll}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
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
        {Object.entries(groupedItems).map(([category, items]) => {
          // Determinar cores do ato
          const getAtoStyles = (ato: string) => {
            if (ato === 'Ato 1') {
              return {
                textColor: 'text-green-400',
                borderColor: 'border-green-500',
                bgColor: 'bg-green-500'
              };
            }
            if (ato === 'Ato 2') {
              return {
                textColor: 'text-yellow-400',
                borderColor: 'border-yellow-500',
                bgColor: 'bg-yellow-500'
              };
            }
            if (ato === 'Ato 3') {
              return {
                textColor: 'text-red-400',
                borderColor: 'border-red-500',
                bgColor: 'bg-red-500'
              };
            }
            return {
              textColor: 'text-blue-400',
              borderColor: 'border-blue-500',
              bgColor: 'bg-blue-500'
            };
          };

          const atoStyles = getAtoStyles(category);
          const completedCount = items.filter(item => completedItems.has(item.id)).length;
          const totalCount = items.length;
          const atoPercentage = Math.round((completedCount / totalCount) * 100);

          return (
            <div key={category}>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-2xl font-bold ${atoStyles.textColor} flex items-center border-b-2 ${atoStyles.borderColor} pb-2`}>
                    {category}
                  </h3>
                  <div className="text-right">
                    <div className={`text-lg font-semibold ${atoStyles.textColor}`}>
                      {completedCount}/{totalCount}
                    </div>
                    <div className="text-xs text-gray-400">{atoPercentage}% completo</div>
                  </div>
                </div>
              </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
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
                  
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 mt-0.5 ${
                    completedItems.has(item.id)
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-400 hover:border-green-400'
                  }`}>
                    {completedItems.has(item.id) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium mb-1">{item.name}</div>
                    <div className="text-sm text-blue-300 mb-1">{item.location}</div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                  </div>
                </label>
              ))}
            </div>
            </div>
          );
        })}
      </div>

      {/* Mensagem de conclusão */}
      {collectedFragments === totalFragments && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white mb-2">Parabéns!</h3>
          <p className="text-blue-100">
            Você coletou todos os {totalFragments} fragmentos de carretel! Sua Hornet está no máximo poder!
          </p>
        </div>
      )}
    </div>
  );
};

export default SpoolFragmentChecklist;


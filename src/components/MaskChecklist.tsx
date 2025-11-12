import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface MaskItem {
  id: string;
  name: string;
  location: string;
  description: string;
  category: string;
  requirement?: string;
}

interface MaskChecklistProps {
  tutorialId: string;
}

const MaskChecklist: React.FC<MaskChecklistProps> = ({ tutorialId }) => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);

  // Dados das máscaras em Silksong
  // Nota: Esta lista é baseada em informações disponíveis e pode ser expandida conforme o jogo é lançado
  const maskData: MaskItem[] = [
    // ÁREA INICIAL - Cidade de Fósforo (3 máscaras)
    { 
      id: 'mask-1', 
      name: 'Máscara da Cidade', 
      location: 'Cidade de Fósforo',
      description: 'Encontrada na área inicial da Cidade de Fósforo, em uma sala escondida',
      category: 'Cidade de Fósforo',
      requirement: 'Nenhuma'
    },
    { 
      id: 'mask-2', 
      name: 'Máscara do Mercado', 
      location: 'Cidade de Fósforo - Mercado',
      description: 'Obtida ao completar uma missão no mercado da cidade',
      category: 'Cidade de Fósforo',
      requirement: 'Missão do Mercado'
    },
    { 
      id: 'mask-3', 
      name: 'Máscara do Túnel', 
      location: 'Cidade de Fósforo - Túneis',
      description: 'Encontrada nos túneis abaixo da cidade, requer exploração cuidadosa',
      category: 'Cidade de Fósforo',
      requirement: 'Exploração'
    },

    // VALE DOS OSSOS (2 máscaras)
    { 
      id: 'mask-4', 
      name: 'Máscara dos Ossos', 
      location: 'Vale dos Ossos',
      description: 'Encontrada em uma área elevada do Vale dos Ossos',
      category: 'Vale dos Ossos',
      requirement: 'Habilidade de escalada'
    },
    { 
      id: 'mask-5', 
      name: 'Máscara do Caverna', 
      location: 'Vale dos Ossos - Caverna',
      description: 'Obtida após derrotar um chefe menor na caverna',
      category: 'Vale dos Ossos',
      requirement: 'Derrotar chefe'
    },

    // DOCAS PROFUNDAS (3 máscaras)
    { 
      id: 'mask-6', 
      name: 'Máscara das Docas', 
      location: 'Docas Profundas',
      description: 'Encontrada na área principal das docas',
      category: 'Docas Profundas',
      requirement: 'Nenhuma'
    },
    { 
      id: 'mask-7', 
      name: 'Máscara Submersa', 
      location: 'Docas Profundas - Área Submersa',
      description: 'Encontrada em uma área submersa, requer habilidade de mergulho',
      category: 'Docas Profundas',
      requirement: 'Lágrima de Isma ou habilidade similar'
    },
    { 
      id: 'mask-8', 
      name: 'Máscara do Navio', 
      location: 'Docas Profundas - Navio Abandonado',
      description: 'Encontrada em um navio abandonado nas docas',
      category: 'Docas Profundas',
      requirement: 'Exploração'
    },

    // PÂNTANO CINZENTO (2 máscaras)
    { 
      id: 'mask-9', 
      name: 'Máscara do Pântano', 
      location: 'Pântano Cinzento',
      description: 'Encontrada em uma área escondida do pântano',
      category: 'Pântano Cinzento',
      requirement: 'Exploração'
    },
    { 
      id: 'mask-10', 
      name: 'Máscara da Névoa', 
      location: 'Pântano Cinzento - Área de Névoa',
      description: 'Obtida ao completar um desafio na área de névoa',
      category: 'Pântano Cinzento',
      requirement: 'Desafio de plataforma'
    },

    // NINHO DE ATLA (2 máscaras)
    { 
      id: 'mask-11', 
      name: 'Máscara do Ninho', 
      location: 'Ninho de Atla',
      description: 'Encontrada no topo do ninho, requer escalada avançada',
      category: 'Ninho de Atla',
      requirement: 'Habilidades de movimento'
    },
    { 
      id: 'mask-12', 
      name: 'Máscara da Rainha', 
      location: 'Ninho de Atla - Câmara da Rainha',
      description: 'Recompensa por derrotar a Rainha de Atla',
      category: 'Ninho de Atla',
      requirement: 'Derrotar chefe'
    },

    // ROChedo (2 máscaras)
    { 
      id: 'mask-13', 
      name: 'Máscara do Rochedo', 
      location: 'Rochedo',
      description: 'Encontrada em uma caverna no Rochedo',
      category: 'Rochedo',
      requirement: 'Exploração'
    },
    { 
      id: 'mask-14', 
      name: 'Máscara do Pico', 
      location: 'Rochedo - Pico Mais Alto',
      description: 'Encontrada no pico mais alto do Rochedo',
      category: 'Rochedo',
      requirement: 'Habilidades de movimento avançadas'
    },

    // ALA BRANCA (3 máscaras)
    { 
      id: 'mask-15', 
      name: 'Máscara da Ala', 
      location: 'Ala Branca',
      description: 'Encontrada na área principal da Ala Branca',
      category: 'Ala Branca',
      requirement: 'Nenhuma'
    },
    { 
      id: 'mask-16', 
      name: 'Máscara da Biblioteca', 
      location: 'Ala Branca - Biblioteca',
      description: 'Obtida ao completar um quebra-cabeça na biblioteca',
      category: 'Ala Branca',
      requirement: 'Resolver quebra-cabeça'
    },
    { 
      id: 'mask-17', 
      name: 'Máscara do Salão', 
      location: 'Ala Branca - Salão Real',
      description: 'Encontrada no salão real, requer chave especial',
      category: 'Ala Branca',
      requirement: 'Chave do Salão'
    },

    // CLAUSTROFORJAS (2 máscaras)
    { 
      id: 'mask-18', 
      name: 'Máscara da Forja', 
      location: 'Claustroforjas',
      description: 'Encontrada na área principal das forjas',
      category: 'Claustroforjas',
      requirement: 'Nenhuma'
    },
    { 
      id: 'mask-19', 
      name: 'Máscara do Ferreiro', 
      location: 'Claustroforjas - Oficina do Ferreiro',
      description: 'Obtida como recompensa por ajudar o ferreiro',
      category: 'Claustroforjas',
      requirement: 'Missão do Ferreiro'
    },

    // MECANISMO VITAL (2 máscaras)
    { 
      id: 'mask-20', 
      name: 'Máscara do Mecanismo', 
      location: 'Mecanismo Vital',
      description: 'Encontrada no coração do mecanismo',
      category: 'Mecanismo Vital',
      requirement: 'Acesso ao núcleo'
    },
    { 
      id: 'mask-21', 
      name: 'Máscara da Engrenagem', 
      location: 'Mecanismo Vital - Sala de Engrenagens',
      description: 'Obtida ao resolver um puzzle mecânico complexo',
      category: 'Mecanismo Vital',
      requirement: 'Resolver puzzle'
    },

    // MEMORIUM (2 máscaras)
    { 
      id: 'mask-22', 
      name: 'Máscara da Memória', 
      location: 'Memorium',
      description: 'Encontrada em uma sala de memórias antigas',
      category: 'Memorium',
      requirement: 'Exploração'
    },
    { 
      id: 'mask-23', 
      name: 'Máscara do Guardião', 
      location: 'Memorium - Câmara do Guardião',
      description: 'Recompensa por derrotar o Guardião do Memorium',
      category: 'Memorium',
      requirement: 'Derrotar chefe'
    },

    // SALÕES SUPREMOS (3 máscaras)
    { 
      id: 'mask-24', 
      name: 'Máscara do Salão', 
      location: 'Salões Supremos',
      description: 'Encontrada no salão principal',
      category: 'Salões Supremos',
      requirement: 'Nenhuma'
    },
    { 
      id: 'mask-25', 
      name: 'Máscara Real', 
      location: 'Salões Supremos - Câmara Real',
      description: 'Encontrada na câmara real, requer acesso especial',
      category: 'Salões Supremos',
      requirement: 'Chave Real'
    },
    { 
      id: 'mask-26', 
      name: 'Máscara da Coroação', 
      location: 'Salões Supremos - Arena da Coroação',
      description: 'Obtida após completar o desafio da arena',
      category: 'Salões Supremos',
      requirement: 'Completar desafio da arena'
    },

    // ÁREAS SECRETAS E OPcionais (3 máscaras)
    { 
      id: 'mask-27', 
      name: 'Máscara Perdida', 
      location: 'Área Secreta - Varia',
      description: 'Encontrada em uma área secreta escondida',
      category: 'Áreas Secretas',
      requirement: 'Exploração avançada'
    },
    { 
      id: 'mask-28', 
      name: 'Máscara do Colecionador', 
      location: 'Varia - Missão',
      description: 'Obtida ao completar todas as missões de colecionáveis',
      category: 'Áreas Secretas',
      requirement: 'Completar todas as missões'
    },
    { 
      id: 'mask-29', 
      name: 'Máscara Dourada', 
      location: 'Área Secreta Final',
      description: 'A máscara mais rara, encontrada em uma área secreta final',
      category: 'Áreas Secretas',
      requirement: '100% de exploração'
    },
  ];

  // Carregar progresso salvo do localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(`masks-${tutorialId}`);
      if (savedProgress) {
        const parsedData = JSON.parse(savedProgress);
        if (Array.isArray(parsedData)) {
          const validMaskIds = new Set(maskData.map(item => item.id));
          const validCompletedItems = parsedData.filter(id => validMaskIds.has(id));
          setCompletedItems(new Set(validCompletedItems));
          if (validCompletedItems.length !== parsedData.length) {
            localStorage.setItem(`masks-${tutorialId}`, JSON.stringify(validCompletedItems));
          }
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar progresso salvo:', error);
      localStorage.removeItem(`masks-${tutorialId}`);
    }
  }, [tutorialId]);

  // Salvar progresso no localStorage
  const saveProgress = (newCompletedItems: Set<string>) => {
    setIsSaving(true);
    try {
      localStorage.setItem(`masks-${tutorialId}`, JSON.stringify(Array.from(newCompletedItems)));
    } catch (error) {
      console.warn('Erro ao salvar progresso:', error);
      if (error instanceof DOMException && error.code === 22) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('masks-') && key !== `masks-${tutorialId}`) {
            localStorage.removeItem(key);
            break;
          }
        }
        try {
          localStorage.setItem(`masks-${tutorialId}`, JSON.stringify(Array.from(newCompletedItems)));
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
    const allItems = new Set(maskData.map(item => item.id));
    setCompletedItems(allItems);
    saveProgress(allItems);
  };

  // Agrupar itens por categoria
  const groupedItems = maskData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MaskItem[]>);

  const totalMasks = maskData.length;
  const validMaskIds = new Set(maskData.map(item => item.id));
  const collectedMasks = Array.from(completedItems).filter(id => validMaskIds.has(id)).length;
  const percentage = Math.round((collectedMasks / totalMasks) * 100);

  return (
    <div className="bg-hollow-darker rounded-lg p-8">
      {/* Header com progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-white">Checklist de Localização das Máscaras</h2>
            {isSaving && (
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Salvando...</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-400">
              {collectedMasks}/{totalMasks}
            </div>
            <div className="text-sm text-gray-400">{percentage}% coletadas</div>
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
            Marcar Todas
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
          >
            Limpar Todas
          </button>
        </div>
      </div>

      {/* Informações sobre máscaras */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-3">Sobre as Máscaras</h3>
        <p className="text-gray-300 mb-4">
          As máscaras em Hollow Knight: Silksong são colecionáveis importantes que aumentam a vida máxima da Hornet. 
          Cada máscara coletada aumenta sua capacidade de sobrevivência durante a jornada em Pharloom.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-300 font-semibold mb-2">Dicas de Coleta:</p>
            <ul className="text-gray-400 space-y-1 list-disc list-inside">
              <li>Explore todas as áreas cuidadosamente</li>
              <li>Complete missões secundárias</li>
              <li>Derrote chefes e mini-chefes</li>
              <li>Procure por áreas secretas</li>
            </ul>
          </div>
          <div>
            <p className="text-blue-300 font-semibold mb-2">Requisitos Comuns:</p>
            <ul className="text-gray-400 space-y-1 list-disc list-inside">
              <li>Habilidades de movimento avançadas</li>
              <li>Chaves especiais</li>
              <li>Completar quebra-cabeças</li>
              <li>Derrotar chefes específicos</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Checklist por categoria */}
      <div className="space-y-8">
        {Object.entries(groupedItems).map(([category, items]) => {
          const completedCount = items.filter(item => completedItems.has(item.id)).length;
          const totalCount = items.length;
          const categoryPercentage = Math.round((completedCount / totalCount) * 100);

          return (
            <div key={category}>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-blue-400 flex items-center border-b-2 border-blue-500 pb-2">
                    {category}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-400">
                      {completedCount}/{totalCount}
                    </div>
                    <div className="text-xs text-gray-400">{categoryPercentage}% completo</div>
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
                      <div className="text-xs text-gray-400 mb-1">{item.description}</div>
                      {item.requirement && (
                        <div className="text-xs text-yellow-400 mt-1">
                          <span className="font-semibold">Requisito:</span> {item.requirement}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mensagem de conclusão */}
      {collectedMasks === totalMasks && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white mb-2">Parabéns!</h3>
          <p className="text-blue-100">
            Você coletou todas as {totalMasks} máscaras! Sua Hornet está com vida máxima!
          </p>
        </div>
      )}
    </div>
  );
};

export default MaskChecklist;






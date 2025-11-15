import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface ChecklistItem {
  id: string;
  name: string;
  category: string;
  description?: string;
}

interface CraftMetalsChecklistProps {
  tutorialId: string;
}

const CraftMetalsChecklist: React.FC<CraftMetalsChecklistProps> = ({ tutorialId }) => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Dados do checklist de Metais Artesanais
  const checklistData: ChecklistItem[] = [
    // Metais Artesanais
    { id: 'metal-1', name: 'Metal Artesanal 1', category: 'Metais Artesanais', description: 'Vale dos Ossos, na loja' },
    { id: 'metal-2', name: 'Metal Artesanal 2', category: 'Metais Artesanais', description: 'Medula, próximo a Skar' },
    { id: 'metal-3', name: 'Metal Artesanal 3', category: 'Metais Artesanais', description: 'Docas Profundas, com chave simples' },
    { id: 'metal-4', name: 'Metal Artesanal 4', category: 'Metais Artesanais', description: 'Degraus Devastados, caminho pra juiza' },
    { id: 'metal-5', name: 'Metal Artesanal 5', category: 'Metais Artesanais', description: 'Claustroforjas, lado direito com fogo' },
    { id: 'metal-6', name: 'Metal Artesanal 6', category: 'Metais Artesanais', description: 'Bosque dos Lumes' },
    { id: 'metal-7', name: 'Metal Artesanal 7', category: 'Metais Artesanais', description: 'Cantoclave, loja Jubilana' },
    { id: 'metal-8', name: 'Metal Artesanal 8', category: 'Metais Artesanais', description: 'Canais Pestilentos, final do lago' },

    // Medalhões Memoriais
    { id: 'metal-1', name: 'Medalhao Memorial 1', category: 'Medalhões Memoriais', description: 'Trilha de Skar' },
    { id: 'metal-2', name: 'Medalhao Memorial 2', category: 'Medalhões Memoriais', description: 'Campos Longiquos, na loja' },
    { id: 'metal-3', name: 'Medalhao Memorial 3', category: 'Medalhões Memoriais', description: 'Medula, próximo a Eira' },
    { id: 'metal-4', name: 'Medalhao Memorial 4', category: 'Medalhões Memoriais', description: 'Vale dos Ossos, quest  dos caralignos' },
    { id: 'metal-5', name: 'Medalhao Memorial 5', category: 'Medalhões Memoriais', description: 'Pântano Cinzento, próximo a Eira' },
    { id: 'metal-6', name: 'Medalhao Memorial 6', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-7', name: 'Medalhao Memorial 7', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 8', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 9', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 10', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 11', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 12', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 13', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 14', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 15', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 16', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 17', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 18', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 19', category: 'Medalhões Memoriais', description: '' },
    { id: 'metal-8', name: 'Medalhao Memorial 20', category: 'Medalhões Memoriais', description: '' },
  ];
  

  // Carregar progresso salvo do localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(`craft-metals-${tutorialId}`);
      if (savedProgress) {
        const parsedData = JSON.parse(savedProgress);
        if (Array.isArray(parsedData)) {
          setCompletedItems(new Set(parsedData));
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar progresso salvo:', error);
      localStorage.removeItem(`craft-metals-${tutorialId}`);
    }
  }, [tutorialId]);

  // Salvar progresso no localStorage
  const saveProgress = (newCompletedItems: Set<string>) => {
    setIsSaving(true);
    try {
      localStorage.setItem(`craft-metals-${tutorialId}`, JSON.stringify(Array.from(newCompletedItems)));
    } catch (error) {
      console.warn('Erro ao salvar progresso:', error);
      if (error instanceof DOMException && error.code === 22) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('craft-metals-') && key !== `craft-metals-${tutorialId}`) {
            localStorage.removeItem(key);
            break;
          }
        }
        try {
          localStorage.setItem(`craft-metals-${tutorialId}`, JSON.stringify(Array.from(newCompletedItems)));
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
    const allItems = new Set(checklistData.map(item => item.id));
    setCompletedItems(allItems);
    saveProgress(allItems);
  };

  // Agrupar itens por categoria
  const groupedItems = checklistData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  // Inicializar todas as seções como expandidas por padrão
  useEffect(() => {
    const allCategories = Object.keys(groupedItems);
    if (allCategories.length > 0 && expandedSections.size === 0) {
      setExpandedSections(new Set(allCategories));
    }
  }, [checklistData]);

  // Toggle de seção
  const toggleSection = (category: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedSections(newExpanded);
  };

  // Calcular porcentagem de conclusão
  const totalItems = checklistData.length;
  const completedCount = completedItems.size;
  const completionPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  return (
    <div className="bg-hollow-darker rounded-lg p-8">
      {/* Header com progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-white">Checklist de Metais Artesanais</h2>
            {isSaving && (
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Salvando...</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              {completionPercentage}%
            </div>
            <div className="text-sm text-gray-400">
              {completedCount}/{totalItems} metais coletados
            </div>
          </div>
        </div>
        
        {/* Barra de progresso */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div 
            style={{ 
              width: `${completionPercentage}%`,
              height: '12px',
              background: completionPercentage >= 100 
                ? 'linear-gradient(to right, #10b981 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%)'
                : completionPercentage >= 75
                ? 'linear-gradient(to right, #10b981 0%, #059669 33%, #047857 66%, #065f46 100%)'
                : completionPercentage >= 50
                ? 'linear-gradient(to right, #10b981 0%, #059669 50%, #047857 100%)'
                : completionPercentage >= 25
                ? 'linear-gradient(to right, #10b981 0%, #059669 100%)'
                : '#10b981',
              borderRadius: '9999px',
              transition: 'all 0.5s ease',
              minWidth: completionPercentage > 0 ? '4px' : '0px'
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
        {Object.entries(groupedItems).map(([category, items]) => {
          const isExpanded = expandedSections.has(category);
          return (
            <div key={category} className="border-b border-gray-700 pb-6 last:border-b-0">
              <button
                onClick={() => toggleSection(category)}
                className="w-full flex items-center justify-between text-left mb-4 hover:opacity-80 transition-opacity"
              >
                <h3 className="text-xl font-semibold text-white flex items-center">
                  {category}
                  <span className="ml-2 text-sm text-gray-400 font-normal">
                    ({items.filter(item => completedItems.has(item.id)).length}/{items.length})
                  </span>
                </h3>
                <div className="flex items-center">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
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
                          : 'border-gray-400 hover:border-blue-400'
                      }`}>
                        {completedItems.has(item.id) && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-white font-medium">{item.name}</div>
                        {item.description && (
                          <div className="text-sm text-gray-400">{item.description}</div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
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
            Você coletou todos os Metais Artesanais em Hollow Knight: Silksong!
          </p>
        </div>
      )}
    </div>
  );
};

export default CraftMetalsChecklist;


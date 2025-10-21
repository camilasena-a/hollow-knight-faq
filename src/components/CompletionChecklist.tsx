import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

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
    // Chefes Obrigatórios (40%)
    { id: 'false-knight', name: 'False Knight', category: 'Chefes', percentage: 1 },
    { id: 'hornet-greenpath', name: 'Hornet (Greenpath)', category: 'Chefes', percentage: 1 },
    { id: 'brooding-mawlek', name: 'Brooding Mawlek', category: 'Chefes', percentage: 1 },
    { id: 'gruz-mother', name: 'Gruz Mother', category: 'Chefes', percentage: 1 },
    { id: 'mantis-lords', name: 'Mantis Lords', category: 'Chefes', percentage: 1 },
    { id: 'soul-master', name: 'Soul Master', category: 'Chefes', percentage: 1 },
    { id: 'dung-defender', name: 'Dung Defender', category: 'Chefes', percentage: 1 },
    { id: 'broken-vessel', name: 'Broken Vessel', category: 'Chefes', percentage: 1 },
    { id: 'watcher-knights', name: 'Watcher Knights', category: 'Chefes', percentage: 1 },
    { id: 'uumuu', name: 'Uumuu', category: 'Chefes', percentage: 1 },
    { id: 'hornet-sentinel', name: 'Hornet Sentinel', category: 'Chefes', percentage: 1 },
    { id: 'enraged-guardian', name: 'Enraged Guardian', category: 'Chefes', percentage: 1 },
    { id: 'lost-kin', name: 'Lost Kin', category: 'Chefes', percentage: 1 },
    { id: 'no-eyes', name: 'No Eyes', category: 'Chefes', percentage: 1 },
    { id: 'traitor-lord', name: 'Traitor Lord', category: 'Chefes', percentage: 1 },
    { id: 'white-defender', name: 'White Defender', category: 'Chefes', percentage: 1 },
    { id: 'soul-tyrant', name: 'Soul Tyrant', category: 'Chefes', percentage: 1 },
    { id: 'grey-prince-zote', name: 'Grey Prince Zote', category: 'Chefes', percentage: 1 },
    { id: 'failed-champion', name: 'Failed Champion', category: 'Chefes', percentage: 1 },
    { id: 'markoth', name: 'Markoth', category: 'Chefes', percentage: 1 },
    { id: 'galien', name: 'Galien', category: 'Chefes', percentage: 1 },
    { id: 'xero', name: 'Xero', category: 'Chefes', percentage: 1 },
    { id: 'gorb', name: 'Gorb', category: 'Chefes', percentage: 1 },
    { id: 'elder-hu', name: 'Elder Hu', category: 'Chefes', percentage: 1 },
    { id: 'marmu', name: 'Marmu', category: 'Chefes', percentage: 1 },
    { id: 'no-eyes-dream', name: 'No Eyes (Dream)', category: 'Chefes', percentage: 1 },
    { id: 'collector', name: 'Collector', category: 'Chefes', percentage: 1 },
    { id: 'god-tamer', name: 'God Tamer', category: 'Chefes', percentage: 1 },
    { id: 'crystal-guardian', name: 'Crystal Guardian', category: 'Chefes', percentage: 1 },
    { id: 'oblobbles', name: 'Oblobbles', category: 'Chefes', percentage: 1 },
    { id: 'flukemarm', name: 'Flukemarm', category: 'Chefes', percentage: 1 },
    { id: 'broken-vessel-dream', name: 'Broken Vessel (Dream)', category: 'Chefes', percentage: 1 },
    { id: 'soul-master-dream', name: 'Soul Master (Dream)', category: 'Chefes', percentage: 1 },
    { id: 'dung-defender-dream', name: 'Dung Defender (Dream)', category: 'Chefes', percentage: 1 },
    { id: 'white-defender-dream', name: 'White Defender (Dream)', category: 'Chefes', percentage: 1 },
    { id: 'grey-prince-zote-dream', name: 'Grey Prince Zote (Dream)', category: 'Chefes', percentage: 1 },
    { id: 'failed-champion-dream', name: 'Failed Champion (Dream)', category: 'Chefes', percentage: 1 },
    { id: 'lost-kin-dream', name: 'Lost Kin (Dream)', category: 'Chefes', percentage: 1 },
    { id: 'soul-tyrant-dream', name: 'Soul Tyrant (Dream)', category: 'Chefes', percentage: 1 },
    { id: 'hollow-knight', name: 'Hollow Knight', category: 'Chefes', percentage: 1 },

    // Áreas Descobertas (12%)
    { id: 'forgotten-crossroads', name: 'Forgotten Crossroads', category: 'Áreas', percentage: 1 },
    { id: 'greenpath', name: 'Greenpath', category: 'Áreas', percentage: 1 },
    { id: 'fungal-wastes', name: 'Fungal Wastes', category: 'Áreas', percentage: 1 },
    { id: 'city-of-tears', name: 'City of Tears', category: 'Áreas', percentage: 1 },
    { id: 'crystal-peak', name: 'Crystal Peak', category: 'Áreas', percentage: 1 },
    { id: 'royal-waterways', name: 'Royal Waterways', category: 'Áreas', percentage: 1 },
    { id: 'ancient-basin', name: 'Ancient Basin', category: 'Áreas', percentage: 1 },
    { id: 'kingdoms-edge', name: 'Kingdom\'s Edge', category: 'Áreas', percentage: 1 },
    { id: 'deepnest', name: 'Deepnest', category: 'Áreas', percentage: 1 },
    { id: 'queens-gardens', name: 'Queen\'s Gardens', category: 'Áreas', percentage: 1 },
    { id: 'howling-cliffs', name: 'Howling Cliffs', category: 'Áreas', percentage: 1 },
    { id: 'resting-grounds', name: 'Resting Grounds', category: 'Áreas', percentage: 1 },

    // Itens e Upgrades (20%)
    { id: 'masks', name: 'Máscaras (4 máscaras)', category: 'Itens', percentage: 4 },
    { id: 'soul-fragments', name: 'Fragmentos de Alma (3 fragmentos)', category: 'Itens', percentage: 3 },
    { id: 'nail-upgrades', name: 'Nail Upgrades (4 upgrades)', category: 'Itens', percentage: 4 },
    { id: 'charms', name: 'Amuletos (40 amuletos)', category: 'Itens', percentage: 4 },
    { id: 'charm-notches', name: 'Charm Notches (8 notches)', category: 'Itens', percentage: 3 },
    { id: 'vessel-fragments', name: 'Vessel Fragments (3 fragmentos)', category: 'Itens', percentage: 2 },

    // Colecionáveis (20%)
    { id: 'grubs', name: 'Grubs (46 grubs)', category: 'Colecionáveis', percentage: 1 },
    { id: 'rancid-eggs', name: 'Rancid Eggs (5 eggs)', category: 'Colecionáveis', percentage: 1 },
    { id: 'wanderers-journal', name: 'Wanderer\'s Journal (10 journals)', category: 'Colecionáveis', percentage: 1 },
    { id: 'hallownest-seal', name: 'Hallownest Seal (4 seals)', category: 'Colecionáveis', percentage: 1 },
    { id: 'kings-idol', name: 'King\'s Idol (4 idols)', category: 'Colecionáveis', percentage: 1 },
    { id: 'arcane-egg', name: 'Arcane Egg (4 eggs)', category: 'Colecionáveis', percentage: 1 },
    { id: 'pale-ore', name: 'Pale Ore (6 ores)', category: 'Colecionáveis', percentage: 1 },
    { id: 'geo', name: 'Geo (25.000 geo)', category: 'Colecionáveis', percentage: 1 },
    { id: 'soul-vessel', name: 'Soul Vessel (3 vessels)', category: 'Colecionáveis', percentage: 1 },
    { id: 'mask-shard', name: 'Mask Shard (4 shards)', category: 'Colecionáveis', percentage: 1 },
    { id: 'charm-collectible', name: 'Charm (40 charms)', category: 'Colecionáveis', percentage: 1 },
    { id: 'nail-collectible', name: 'Nail (4 upgrades)', category: 'Colecionáveis', percentage: 1 },
    { id: 'spell', name: 'Spell (3 spells)', category: 'Colecionáveis', percentage: 1 },
    { id: 'dream-nail', name: 'Dream Nail (1 nail)', category: 'Colecionáveis', percentage: 1 },
    { id: 'crystal-heart', name: 'Crystal Heart (1 heart)', category: 'Colecionáveis', percentage: 1 },
    { id: 'monarch-wings', name: 'Monarch Wings (1 wings)', category: 'Colecionáveis', percentage: 1 },
    { id: 'mantis-claw', name: 'Mantis Claw (1 claw)', category: 'Colecionáveis', percentage: 1 },
    { id: 'mothwing-cloak', name: 'Mothwing Cloak (1 cloak)', category: 'Colecionáveis', percentage: 1 },
    { id: 'ismas-tear', name: 'Isma\'s Tear (1 tear)', category: 'Colecionáveis', percentage: 1 },
    { id: 'shade-cloak', name: 'Shade Cloak (1 cloak)', category: 'Colecionáveis', percentage: 1 },

    // Conteúdo Opcional (20%)
    { id: 'pantheons', name: 'Pantheons (5 pantheons)', category: 'Opcional', percentage: 5 },
    { id: 'godhome', name: 'Godhome (3 áreas)', category: 'Opcional', percentage: 3 },
    { id: 'path-of-pain', name: 'Path of Pain (1 área)', category: 'Opcional', percentage: 2 },
    { id: 'white-palace', name: 'White Palace (1 área)', category: 'Opcional', percentage: 2 },
    { id: 'grimm-troupe', name: 'Grimm Troupe (3 bosses)', category: 'Opcional', percentage: 3 },
    { id: 'lifeblood', name: 'Lifeblood (2 bosses)', category: 'Opcional', percentage: 2 },
    { id: 'hidden-dreams', name: 'Hidden Dreams (3 bosses)', category: 'Opcional', percentage: 3 },
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
  }, [completedItems]);

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
            <div className="text-3xl font-bold text-hollow-gold">{totalPercentage}%</div>
            <div className="text-sm text-gray-400">de 112%</div>
          </div>
        </div>
        
        {/* Barra de progresso */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-hollow-gold to-yellow-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(totalPercentage / 112) * 100}%` }}
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

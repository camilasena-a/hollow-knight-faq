import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface ChecklistItem {
  id: string;
  name: string;
  category: string;
  percentage: number;
  description?: string;
}

interface CompletionChecklistHK2Props {
  tutorialId: string;
}

const CompletionChecklistHK2: React.FC<CompletionChecklistHK2Props> = ({ tutorialId }) => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Dados do checklist de 100% para Silksong
  const checklistData: ChecklistItem[] = [
    // Máscaras (10%)
    { id: 'mask-1', name: 'Máscara 1', category: 'Máscaras', percentage: 0.5, description: 'Loja no Vale dos Ossos' },
    { id: 'mask-2', name: 'Máscara 2', category: 'Máscaras', percentage: 0.5, description: 'Entrada do Covil dos Vermes' },
    { id: 'mask-3', name: 'Máscara 3', category: 'Máscaras', percentage: 0.5, description: 'Campos Longiquos, com planador' },
    { id: 'mask-4', name: 'Máscara 4', category: 'Máscaras', percentage: 0.5, description: 'Cascomadeira' },
    { id: 'mask-5', name: 'Máscara 5', category: 'Máscaras', percentage: 0.5, description: 'Ninho de Atla (Eva)' },
    { id: 'mask-6', name: 'Máscara 6', category: 'Máscaras', percentage: 0.5, description: 'Docas Profundas, na fronteira com Medula' },
    { id: 'mask-7', name: 'Máscara 7', category: 'Máscaras', percentage: 0.5, description: 'Mercadora Jubilana' },
    { id: 'mask-8', name: 'Máscara 8', category: 'Máscaras', percentage: 0.5, description: 'Quest: Besta Alada Selvagem' },
    { id: 'mask-9', name: 'Máscara 9', category: 'Máscaras', percentage: 0.5, description: 'Arena em Campos Longiquos, com arpão no fogo' },
    { id: 'mask-10', name: 'Máscara 10', category: 'Máscaras', percentage: 0.5, description: 'Degraus Devastados, com pulo duplo' },
    { id: 'mask-11', name: 'Máscara 11', category: 'Máscaras', percentage: 0.5, description: 'Bosque dos Lumes' },
    { id: 'mask-12', name: 'Máscara 12', category: 'Máscaras', percentage: 0.5, description: 'Mecanismo Vital, após arena' },
    { id: 'mask-13', name: 'Máscara 13', category: 'Máscaras', percentage: 0.5, description: 'Câmaras Sussurantes, região abaixo do sentinela' },
    { id: 'mask-14', name: 'Máscara 14', category: 'Máscaras', percentage: 0.5, description: 'Rochedo, area de espinhos e engrenagens' },
    { id: 'mask-15', name: 'Máscara 15', category: 'Máscaras', percentage: 0.5, description: 'Monte Plumidio, próximo ao banco no extremo do mapa' },
    { id: 'mask-16', name: 'Máscara 16', category: 'Máscaras', percentage: 0.5, description: 'Bilebrejo' },
    { id: 'mask-17', name: 'Máscara 17', category: 'Máscaras', percentage: 0.5, description: 'Monte Plumidio, ato 3' },
    { id: 'mask-18', name: 'Máscara 18', category: 'Máscaras', percentage: 0.5, description: 'Quest: Massas de vazio, ato 3' },
    { id: 'mask-19', name: 'Máscara 19', category: 'Máscaras', percentage: 0.5, description: 'Quest: Caçador Oculto, ato 3' },
    { id: 'mask-20', name: 'Máscara 20', category: 'Máscaras', percentage: 0.5, description: 'Quest: Mais Rapido de Fiarlongo, ato 3 ' },

    // Carretel de Seda (15%)
    { id: 'spool-1', name: 'Fragmento de Carretel 1', category: 'Carretel de Seda', percentage: 0.5, description: 'Vale dos Ossos, sala secreta' },
    { id: 'spool-2', name: 'Fragmento de Carretel 2', category: 'Carretel de Seda', percentage: 0.5, description: 'Docas Profundas, sul do mapa' },
    { id: 'spool-3', name: 'Fragmento de Carretel 3', category: 'Carretel de Seda', percentage: 0.5, description: 'Loja Campanula, após quest do entregador' },
    { id: 'spool-4', name: 'Fragmento de Carretel 4', category: 'Carretel de Seda', percentage: 0.5, description: 'Pântano Cinzento, acima do banco dos corvos' },
    { id: 'spool-5', name: 'Fragmento de Carretel 5', category: 'Carretel de Seda', percentage: 0.5, description: 'Ninho de Atla (Eva)' },
    { id: 'spool-6', name: 'Fragmento de Carretel 6', category: 'Carretel de Seda', percentage: 0.5, description: 'Rochedo, fronteira com Monte Plumidio' },
    { id: 'spool-7', name: 'Fragmento de Carretel 7', category: 'Carretel de Seda', percentage: 0.5, description: 'Degraus Devastados, loja do Grindle' },
    { id: 'spool-8', name: 'Fragmento de Carretel 8', category: 'Carretel de Seda', percentage: 0.5, description: 'Grande Portão, após chegar com as 14 pulgas' },
    { id: 'spool-9', name: 'Fragmento de Carretel 9', category: 'Carretel de Seda', percentage: 0.5, description: 'Grande Portão, acima das balanças' },
    { id: 'spool-10', name: 'Fragmento de Carretel 10', category: 'Carretel de Seda', percentage: 0.5, description: 'Ala Branca, por baixo do elevador' },
    { id: 'spool-11', name: 'Fragmento de Carretel 11', category: 'Carretel de Seda', percentage: 0.5, description: 'Ala Branca, quest da Sherma' },
    { id: 'spool-12', name: 'Fragmento de Carretel 12', category: 'Carretel de Seda', percentage: 0.5, description: 'Claustroforjas, após arena na área central' },
    { id: 'spool-13', name: 'Fragmento de Carretel 13', category: 'Carretel de Seda', percentage: 0.5, description: 'Claustroforjas, sul direita' },
    { id: 'spool-14', name: 'Fragmento de Carretel 14', category: 'Carretel de Seda', percentage: 0.5, description: 'Mecanismo Vital, sul direita' },
    { id: 'spool-15', name: 'Fragmento de Carretel 15', category: 'Carretel de Seda', percentage: 0.5, description: 'Loja Jubilana, após 2º desaparecimento' },
    { id: 'spool-16', name: 'Fragmento de Carretel 16', category: 'Carretel de Seda', percentage: 0.5, description: 'Memorium' },
    { id: 'spool-17', name: 'Fragmento de Carretel 17', category: 'Carretel de Seda', percentage: 0.5, description: 'Salões Supremos, no topo' },
    { id: 'spool-18', name: 'Fragmento de Carretel 18', category: 'Carretel de Seda', percentage: 0.5, description: 'Docas Profundas, área com chave ou arpão' },

    // História Principal (20%)
    { id: 'main-story', name: 'Completar a história principal', category: 'História Principal', percentage: 10, description: '' },
    { id: 'silk-city', name: 'Alcançar a Cidade de Seda', category: 'História Principal', percentage: 5, description: '' },
    { id: 'final-boss', name: 'Derrotar o chefe final', category: 'História Principal', percentage: 5, description: '' },

    // Chefes Obrigatórios (15%)
    { id: 'boss-1', name: 'Chefe Principal 1', category: 'Chefes Obrigatórios', percentage: 1.5, description: '' },
    { id: 'boss-2', name: 'Chefe Principal 2', category: 'Chefes Obrigatórios', percentage: 1.5, description: '' },
    { id: 'boss-3', name: 'Chefe Principal 3', category: 'Chefes Obrigatórios', percentage: 1.5, description: '' },
    { id: 'boss-4', name: 'Chefe Principal 4', category: 'Chefes Obrigatórios', percentage: 1.5, description: '' },
    { id: 'boss-5', name: 'Chefe Principal 5', category: 'Chefes Obrigatórios', percentage: 1.5, description: '' },
    { id: 'boss-6', name: 'Chefe Principal 6', category: 'Chefes Obrigatórios', percentage: 1.5, description: '' },
    { id: 'boss-7', name: 'Chefe Principal 7', category: 'Chefes Obrigatórios', percentage: 1.5, description: '' },
    { id: 'boss-8', name: 'Chefe Principal 8', category: 'Chefes Obrigatórios', percentage: 1.5, description: '' },
    { id: 'boss-9', name: 'Chefe Principal 9', category: 'Chefes Obrigatórios', percentage: 1.5, description: '' },
    { id: 'boss-10', name: 'Chefe Principal 10', category: 'Chefes Obrigatórios', percentage: 1.5, description: '' },

    // Chefes Opcionais (10%)
    { id: 'optional-boss-1', name: 'Chefe Opcional 1', category: 'Chefes Opcionais', percentage: 1, description: '' },
    { id: 'optional-boss-2', name: 'Chefe Opcional 2', category: 'Chefes Opcionais', percentage: 1, description: '' },
    { id: 'optional-boss-3', name: 'Chefe Opcional 3', category: 'Chefes Opcionais', percentage: 1, description: '' },
    { id: 'optional-boss-4', name: 'Chefe Opcional 4', category: 'Chefes Opcionais', percentage: 1, description: '' },
    { id: 'optional-boss-5', name: 'Chefe Opcional 5', category: 'Chefes Opcionais', percentage: 1, description: '' },
    { id: 'optional-boss-6', name: 'Chefe Opcional 6', category: 'Chefes Opcionais', percentage: 1, description: '' },
    { id: 'optional-boss-7', name: 'Chefe Opcional 7', category: 'Chefes Opcionais', percentage: 1, description: '' },
    { id: 'optional-boss-8', name: 'Chefe Opcional 8', category: 'Chefes Opcionais', percentage: 1, description: '' },
    { id: 'optional-boss-9', name: 'Chefe Opcional 9', category: 'Chefes Opcionais', percentage: 1, description: '' },
    { id: 'optional-boss-10', name: 'Chefe Opcional 10', category: 'Chefes Opcionais', percentage: 1, description: '' },

    // Ferramentas (5%)
    { id: 'tool-1', name: 'Ferramenta de Movimento 1', category: 'Ferramentas', percentage: 1, description: '' },
    { id: 'tool-2', name: 'Ferramenta de Movimento 2', category: 'Ferramentas', percentage: 1, description: '' },
    { id: 'tool-3', name: 'Ferramenta de Combate 1', category: 'Ferramentas', percentage: 1, description: '' },
    { id: 'tool-4', name: 'Ferramenta de Combate 2', category: 'Ferramentas', percentage: 1, description: '' },
    { id: 'tool-5', name: 'Ferramenta de Exploração', category: 'Ferramentas', percentage: 1, description: '' },

    // Habilidades (5%)
    { id: 'skill-1', name: 'Técnica de Combate 1', category: 'Habilidades', percentage: 1, description: '' },
    { id: 'skill-2', name: 'Técnica de Combate 2', category: 'Habilidades', percentage: 1, description: '' },
    { id: 'skill-3', name: 'Movimento Especial 1', category: 'Habilidades', percentage: 1, description: '' },
    { id: 'skill-4', name: 'Movimento Especial 2', category: 'Habilidades', percentage: 1, description: '' },
    { id: 'skill-5', name: 'Habilidade de Tecelagem', category: 'Habilidades', percentage: 1, description: '' },

    // Upgrades de Ferrão (8%)
    { id: 'nail-upgrade-1', name: 'Upgrade de Ferrão 1', category: 'Upgrades de Ferrão', percentage: 2, description: '' },
    { id: 'nail-upgrade-2', name: 'Upgrade de Ferrão 2', category: 'Upgrades de Ferrão', percentage: 2, description: '' },
    { id: 'nail-upgrade-3', name: 'Upgrade de Ferrão 3', category: 'Upgrades de Ferrão', percentage: 2, description: '' },
    { id: 'nail-upgrade-4', name: 'Upgrade de Ferrão 4', category: 'Upgrades de Ferrão', percentage: 2, description: '' },

    // Áreas e Exploração (7%)
    { id: 'area-1', name: 'Região 1', category: 'Áreas e Exploração', percentage: 0.5, description: '' },
    { id: 'area-2', name: 'Região 2', category: 'Áreas e Exploração', percentage: 0.5, description: '' },
    { id: 'area-3', name: 'Região 3', category: 'Áreas e Exploração', percentage: 0.5, description: '' },
    { id: 'area-4', name: 'Região 4', category: 'Áreas e Exploração', percentage: 0.5, description: '' },
    { id: 'area-5', name: 'Região 5', category: 'Áreas e Exploração', percentage: 0.5, description: '' },
    { id: 'area-6', name: 'Região 6', category: 'Áreas e Exploração', percentage: 0.5, description: '' },
    { id: 'area-7', name: 'Região 7', category: 'Áreas e Exploração', percentage: 0.5, description: '' },
    { id: 'area-8', name: 'Região 8', category: 'Áreas e Exploração', percentage: 0.5, description: '' },
    { id: 'area-9', name: 'Região 9', category: 'Áreas e Exploração', percentage: 0.5, description: '' },
    { id: 'area-10', name: 'Região 10', category: 'Áreas e Exploração', percentage: 0.5, description: '' },
    { id: 'map-1', name: 'Mapa da Região 1', category: 'Áreas e Exploração', percentage: 0.2, description: '' },
    { id: 'map-2', name: 'Mapa da Região 2', category: 'Áreas e Exploração', percentage: 0.2, description: '' },
    { id: 'map-3', name: 'Mapa da Região 3', category: 'Áreas e Exploração', percentage: 0.2, description: '' },
    { id: 'map-4', name: 'Mapa da Região 4', category: 'Áreas e Exploração', percentage: 0.2, description: '' },
    { id: 'map-5', name: 'Mapa da Região 5', category: 'Áreas e Exploração', percentage: 0.2, description: '' },
    { id: 'map-6', name: 'Mapa da Região 6', category: 'Áreas e Exploração', percentage: 0.2, description: '' },
    { id: 'map-7', name: 'Mapa da Região 7', category: 'Áreas e Exploração', percentage: 0.2, description: '' },
    { id: 'map-8', name: 'Mapa da Região 8', category: 'Áreas e Exploração', percentage: 0.2, description: '' },
    { id: 'map-9', name: 'Mapa da Região 9', category: 'Áreas e Exploração', percentage: 0.2, description: '' },
    { id: 'map-10', name: 'Mapa da Região 10', category: 'Áreas e Exploração', percentage: 0.2, description: '' },

    // Missões e NPCs (5%)
    { id: 'quest-main-1', name: 'Missão Principal 1', category: 'Missões e NPCs', percentage: 0.5, description: '' },
    { id: 'quest-main-2', name: 'Missão Principal 2', category: 'Missões e NPCs', percentage: 0.5, description: '' },
    { id: 'quest-main-3', name: 'Missão Principal 3', category: 'Missões e NPCs', percentage: 0.5, description: '' },
    { id: 'quest-main-4', name: 'Missão Principal 4', category: 'Missões e NPCs', percentage: 0.5, description: '' },
    { id: 'quest-main-5', name: 'Missão Principal 5', category: 'Missões e NPCs', percentage: 0.5, description: '' },
    { id: 'quest-main-6', name: 'Missão Principal 6', category: 'Missões e NPCs', percentage: 0.5, description: '' },
    { id: 'npc-1', name: 'Interagir com NPC 1', category: 'Missões e NPCs', percentage: 0.2, description: '' },
    { id: 'npc-2', name: 'Interagir com NPC 2', category: 'Missões e NPCs', percentage: 0.2, description: '' },
    { id: 'npc-3', name: 'Interagir com NPC 3', category: 'Missões e NPCs', percentage: 0.2, description: '' },
    { id: 'npc-4', name: 'Interagir com NPC 4', category: 'Missões e NPCs', percentage: 0.2, description: '' },
    { id: 'npc-5', name: 'Interagir com NPC 5', category: 'Missões e NPCs', percentage: 0.2, description: '' },
    { id: 'npc-6', name: 'Interagir com NPC 6', category: 'Missões e NPCs', percentage: 0.2, description: '' },
    { id: 'npc-7', name: 'Interagir com NPC 7', category: 'Missões e NPCs', percentage: 0.2, description: '' },
    { id: 'npc-8', name: 'Interagir com NPC 8', category: 'Missões e NPCs', percentage: 0.2, description: '' },
    { id: 'npc-9', name: 'Interagir com NPC 9', category: 'Missões e NPCs', percentage: 0.2, description: '' },
    { id: 'npc-10', name: 'Interagir com NPC 10', category: 'Missões e NPCs', percentage: 0.2, description: '' },
  ];

  // Carregar progresso salvo do localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(`completion-hk2-${tutorialId}`);
      if (savedProgress) {
        const parsedData = JSON.parse(savedProgress);
        if (Array.isArray(parsedData)) {
          setCompletedItems(new Set(parsedData));
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar progresso salvo:', error);
      localStorage.removeItem(`completion-hk2-${tutorialId}`);
    }
  }, [tutorialId]);

  // Calcular porcentagem total
  useEffect(() => {
    const total = checklistData.reduce((sum, item) => {
      return completedItems.has(item.id) ? sum + item.percentage : sum;
    }, 0);
    setTotalPercentage(Math.min(100, Math.round(total * 10) / 10)); // Arredondar para 1 casa decimal e limitar a 100%
  }, [completedItems]);

  // Salvar progresso no localStorage
  const saveProgress = (newCompletedItems: Set<string>) => {
    setIsSaving(true);
    try {
      localStorage.setItem(`completion-hk2-${tutorialId}`, JSON.stringify(Array.from(newCompletedItems)));
    } catch (error) {
      console.warn('Erro ao salvar progresso:', error);
      if (error instanceof DOMException && error.code === 22) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('completion-hk2-') && key !== `completion-hk2-${tutorialId}`) {
            localStorage.removeItem(key);
            break;
          }
        }
        try {
          localStorage.setItem(`completion-hk2-${tutorialId}`, JSON.stringify(Array.from(newCompletedItems)));
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

  // Função para criar gradiente da barra de progresso baseado na porcentagem
  const getProgressBarGradient = (percentage: number) => {
    if (percentage >= 100) {
      return 'linear-gradient(to right, #10b981 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%)';
    } else if (percentage >= 75) {
      return 'linear-gradient(to right, #10b981 0%, #059669 33%, #047857 66%, #065f46 100%)';
    } else if (percentage >= 50) {
      return 'linear-gradient(to right, #10b981 0%, #059669 50%, #047857 100%)';
    } else if (percentage >= 25) {
      return 'linear-gradient(to right, #10b981 0%, #059669 100%)';
    } else {
      return '#10b981';
    }
  };

  // Função para determinar a cor atual da porcentagem
  const getCurrentPercentageColor = (percentage: number) => {
    if (percentage < 25) {
      return '#6b7280';
    } else if (percentage >= 25 && percentage < 50) {
      return '#4b5563';
    } else if (percentage >= 50 && percentage < 75) {
      return '#1f2937';
    } else if (percentage >= 75 && percentage < 100) {
      return '#c6b7be';
    } else if (percentage >= 100) {
      return '#fafbf6';
    }
    return '#6b7280';
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
            <h2 className="text-2xl font-bold text-white">Checklist de 100%</h2>
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
              {totalPercentage.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">de 100%</div>
          </div>
        </div>
        
        {/* Barra de progresso */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div 
            style={{ 
              width: `${Math.min(100, totalPercentage)}%`,
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
                      : 'border-gray-400 hover:border-blue-400'
                  }`}>
                    {completedItems.has(item.id) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-white font-medium">{item.name}</div>
                    {item.description ? (
                      <div className="text-sm text-gray-400">{item.description}</div>
                    ) : (
                      <div className="text-sm text-gray-400">{item.percentage}%</div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem de conclusão */}
      {totalPercentage >= 100 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-600 to-green-500 rounded-lg text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white mb-2">Parabéns!</h3>
          <p className="text-green-100">
            Você completou 100% de Hollow Knight: Silksong! Você é um verdadeiro completionist!
          </p>
        </div>
      )}
    </div>
  );
};

export default CompletionChecklistHK2;


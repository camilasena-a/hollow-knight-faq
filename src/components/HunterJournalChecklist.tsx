import React, { useState, useEffect } from 'react';

interface CreatureItem {
  id: string;
  name: string;
  area: string;
}

interface HunterJournalChecklistProps {
  tutorialId: string;
}

const HunterJournalChecklist: React.FC<HunterJournalChecklistProps> = ({ tutorialId }) => {
  const [completedCreatures, setCompletedCreatures] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);

  // Lista de todas as criaturas do Diário do Caçador (168 total)
  const creaturesData: CreatureItem[] = [
    { id: '1', name: 'Crawlid', area: 'Various' },
    { id: '2', name: 'Vengemosca', area: 'Various' },
    { id: '3', name: 'Rei Vengemosca', area: 'Various' },
    { id: '4', name: 'Mosca', area: 'Various' },
    { id: '5', name: 'Mãe Mosca', area: 'Various' },
    { id: '6', name: 'Tiktik', area: 'Various' },
    { id: '7', name: 'Aspid Caçador', area: 'Various' },
    { id: '8', name: 'Aspid Mãe', area: 'Various' },
    { id: '9', name: 'Aspid Filhote', area: 'Various' },
    { id: '10', name: 'Goam (registro)', area: 'Various' },
    { id: '11', name: 'Carcaça Errante', area: 'Various' },
    { id: '12', name: 'Carcaça Chifruda', area: 'Various' },
    { id: '13', name: 'Carcaça Saltadora', area: 'Various' },
    { id: '14', name: 'Carcaça Valente', area: 'Various' },
    { id: '15', name: 'Carcaça Guerreira', area: 'Various' },
    { id: '16', name: 'Carcaça Guardiã', area: 'Various' },
    { id: '17', name: 'Carcaça Sepultada', area: 'Various' },
    { id: '18', name: 'Falso Cavaleiro', area: 'Various' },
    { id: '19', name: 'Verme', area: 'Various' },
    { id: '20', name: 'Inseto Reparador', area: 'Various' },
    { id: '21', name: 'Germe de Vida', area: 'Various' },
    { id: '22', name: 'Baldur', area: 'Various' },
    { id: '23', name: 'Baldur Ancião', area: 'Various' },
    { id: '24', name: 'Rastejante Musgoso', area: 'Various' },
    { id: '25', name: 'Musgoso Voador', area: 'Various' },
    { id: '26', name: 'Musgoso', area: 'Various' },
    { id: '27', name: 'Musgoso Volátil', area: 'Various' },
    { id: '28', name: 'Devorador de Tolos', area: 'Various' },
    { id: '29', name: 'Mosquito', area: 'Various' },
    { id: '30', name: 'Obble', area: 'Various' },
    { id: '31', name: 'Gulka', area: 'Various' },
    { id: '32', name: 'Mosca Mascarada', area: 'Various' },
    { id: '33', name: 'Batedor Musgoso', area: 'Various' },
    { id: '34', name: 'Batedor Musgoso Imenso', area: 'Various' },
    { id: '35', name: 'Cavaleiro Musgoso', area: 'Various' },
    { id: '36', name: 'Vagabundo Musgoso', area: 'Various' },
    { id: '37', name: 'Durandoo', area: 'Various' },
    { id: '38', name: 'Duranda', area: 'Various' },
    { id: '39', name: 'Aluba', area: 'Various' },
    { id: '40', name: 'Charged Lumafly (registro)', area: 'Various' },
    { id: '41', name: 'Uoma', area: 'Various' },
    { id: '42', name: 'Ooma', area: 'Various' },
    { id: '43', name: 'Uumuu', area: 'Various' },
    { id: '44', name: 'Ambloom', area: 'Various' },
    { id: '45', name: 'Cria Fúngica', area: 'Various' },
    { id: '46', name: 'Balão Fúngico', area: 'Various' },
    { id: '47', name: 'Sporg', area: 'Various' },
    { id: '48', name: 'Carcaça Fúngica', area: 'Various' },
    { id: '49', name: 'Filhote Fúngico', area: 'Various' },
    { id: '50', name: 'Guerreiro Fúngico', area: 'Various' },
    { id: '51', name: 'Ogro Fúngico', area: 'Various' },
    { id: '52', name: 'Louva-a-Deus Jovem', area: 'Various' },
    { id: '53', name: 'Louva-a-Deus Guerreiro', area: 'Various' },
    { id: '54', name: 'Lordes Louva-a-Deus', area: 'Various' },
    { id: '55', name: 'Carcaça Sentinela', area: 'Various' },
    { id: '56', name: 'Sentinela Pesada', area: 'Various' },
    { id: '57', name: 'Sentinela Alada', area: 'Various' },
    { id: '58', name: 'Sentinela Lanceira', area: 'Various' },
    { id: '59', name: 'Erro', area: 'Various' },
    { id: '60', name: 'Louco', area: 'Various' },
    { id: '61', name: 'Manipulador de Alma', area: 'Various' },
    { id: '62', name: 'Guerreiro das Almas', area: 'Various' },
    { id: '63', name: 'Mestre das Almas', area: 'Various' },
    { id: '64', name: 'Carcaça Elegante', area: 'Various' },
    { id: '65', name: 'Carcaça Covarde', area: 'Various' },
    { id: '66', name: 'Carcaça Gulosa', area: 'Various' },
    { id: '67', name: 'Carcaça Deslumbrante', area: 'Various' },
    { id: '68', name: 'Carcaça Sentinela Grandiosa', area: 'Various' },
    { id: '69', name: 'Cavaleiro Sentinela', area: 'Various' },
    { id: '70', name: 'O Colecionador', area: 'Various' },
    { id: '71', name: 'Ventremosca', area: 'Various' },
    { id: '72', name: 'Pilflip', area: 'Various' },
    { id: '73', name: 'Hwurmp', area: 'Various' },
    { id: '74', name: 'Saco Viscoso', area: 'Various' },
    { id: '75', name: 'Defensor do Esterco', area: 'Various' },
    { id: '76', name: 'Defensor Branco', area: 'Various' },
    { id: '77', name: 'Flukefey', area: 'Various' },
    { id: '78', name: 'Flukemon', area: 'Various' },
    { id: '79', name: 'Flukemunga', area: 'Various' },
    { id: '80', name: 'Flukemarm', area: 'Various' },
    { id: '81', name: 'Ácaro Cristalizado', area: 'Various' },
    { id: '82', name: 'Couraçado de Cristal', area: 'Various' },
    { id: '83', name: 'Caçador de Cristal', area: 'Various' },
    { id: '84', name: 'Rastejador de Cristal', area: 'Various' },
    { id: '85', name: 'Carcaça Mineradora', area: 'Various' },
    { id: '86', name: 'Carcaça Cristalizada', area: 'Various' },
    { id: '87', name: 'Guardião Cristalizado', area: 'Various' },
    { id: '88', name: 'Vengemosca Furiosa', area: 'Various' },
    { id: '89', name: 'Mosca Volátil', area: 'Various' },
    { id: '90', name: 'Carcaça Violenta', area: 'Various' },
    { id: '91', name: 'Carcaça Cuspidora', area: 'Various' },
    { id: '92', name: 'Escavador', area: 'Various' },
    { id: '93', name: 'Cavador Incubador', area: 'Various' },
    { id: '94', name: 'Centopéia (registro)', area: 'Various' },
    { id: '95', name: 'Rouba-Cadáveres', area: 'Various' },
    { id: '96', name: 'Aranha Filhote', area: 'Various' },
    { id: '97', name: 'Aranha Caçadora', area: 'Various' },
    { id: '98', name: 'Pequena Tecelã', area: 'Various' },
    { id: '99', name: 'Devoto Espreitador', area: 'Various' },
    { id: '100', name: 'Nosk', area: 'Various' },
    { id: '101', name: 'Rastejador Sombrio', area: 'Various' },
    { id: '102', name: 'Mawlek Menor', area: 'Various' },
    { id: '103', name: 'Mawlurk', area: 'Various' },
    { id: '104', name: 'Mawlek Incubador', area: 'Various' },
    { id: '105', name: 'Germe de Luz', area: 'Various' },
    { id: '106', name: 'Balão Infectado', area: 'Various' },
    { id: '107', name: 'Receptáculo Quebrado', area: 'Various' },
    { id: '108', name: 'Bubélula', area: 'Various' },
    { id: '109', name: 'Aspid Primitiva', area: 'Various' },
    { id: '110', name: 'Saltador', area: 'Various' },
    { id: '111', name: 'Grande Saltador', area: 'Various' },
    { id: '112', name: 'Mímico de Larva', area: 'Various' },
    { id: '113', name: 'Filhote da Colmeia', area: 'Various' },
    { id: '114', name: 'Soldado da Colmeia', area: 'Various' },
    { id: '115', name: 'Guardião da Colmeia', area: 'Various' },
    { id: '116', name: 'Carcaça Colmeia', area: 'Various' },
    { id: '117', name: 'Cavaleiro da Colmeia', area: 'Various' },
    { id: '118', name: 'Carcaça Espinhosa', area: 'Various' },
    { id: '119', name: 'Loodle', area: 'Various' },
    { id: '120', name: 'Louva-a-Deus Petra', area: 'Various' },
    { id: '121', name: 'Louva-a-Deus Traidor', area: 'Various' },
    { id: '122', name: 'Lorde Traidor', area: 'Various' },
    { id: '123', name: 'Baldur Afiado', area: 'Various' },
    { id: '124', name: 'Mosquito Encouraçado', area: 'Various' },
    { id: '125', name: 'Obble de Guerra', area: 'Various' },
    { id: '126', name: 'Oblobbles', area: 'Various' },
    { id: '127', name: 'Tolo Protegido', area: 'Various' },
    { id: '128', name: 'Tolo Robusto', area: 'Various' },
    { id: '129', name: 'Tolo Alado', area: 'Various' },
    { id: '130', name: 'Tolo Pesado', area: 'Various' },
    { id: '131', name: 'Loodle Letal', area: 'Various' },
    { id: '132', name: 'Manipulador Voltaico', area: 'Various' },
    { id: '133', name: 'Domador de Deuses', area: 'Various' },
    { id: '134', name: 'Espreitadora Pálida', area: 'Various' },
    { id: '135', name: 'Zote', area: 'Various' },
    { id: '136', name: 'Príncipe Cinza Zote', area: 'Various' },
    { id: '137', name: 'Zoutinho Alado', area: 'Various' },
    { id: '138', name: 'Zoutinho Saltitante', area: 'Various' },
    { id: '139', name: 'Zoutinho Volátil', area: 'Various' },
    { id: '140', name: 'Xero', area: 'Various' },
    { id: '141', name: 'Gorb', area: 'Various' },
    { id: '142', name: 'Ancião Hu', area: 'Various' },
    { id: '143', name: 'Marmu', area: 'Various' },
    { id: '144', name: 'Sem Olhos', area: 'Various' },
    { id: '145', name: 'Galien', area: 'Various' },
    { id: '146', name: 'Markoth', area: 'Various' },
    { id: '147', name: 'Novato Grimmário', area: 'Various' },
    { id: '148', name: 'Mestre Grimmário', area: 'Various' },
    { id: '149', name: 'Pesadelo Grimmário', area: 'Various' },
    { id: '150', name: 'Grimm', area: 'Various' },
    { id: '151', name: 'Rei do Pesadelo', area: 'Various' },
    { id: '152', name: 'Irmãos Oro & Mato', area: 'Various' },
    { id: '153', name: 'Mestre da Pintura Sheo', area: 'Various' },
    { id: '154', name: 'Grande Sábio do Ferrão Sly', area: 'Various' },
    { id: '155', name: 'Armadura Alada', area: 'Various' },
    { id: '156', name: 'Servo Real', area: 'Various' },
    { id: '157', name: 'Armadura Real', area: 'Various' },
    { id: '158', name: 'Irmão', area: 'Various' },
    { id: '159', name: 'Tentáculos do Vazio (registro)', area: 'Various' },
    { id: '160', name: 'Hornet', area: 'Various' },
    { id: '161', name: 'Cavaleiro Vazio', area: 'Various' },
    { id: '162', name: 'Receptáculo Puro', area: 'Various' },
    { id: '163', name: 'Radiância', area: 'Various' },
    { id: '164', name: 'Sombra', area: 'Various' },
    // 4 que não entram na contagem do diário:
    { id: '165', name: 'Marca do Caçador', area: 'Reward' },
    { id: '166', name: 'Selo de Ligação', area: 'Reward' },
    { id: '167', name: 'Ídolo Vazio', area: 'Reward' },
    { id: '168', name: 'Máscara Desgastada', area: 'Reward' },
  ];

  // Carregar progresso salvo
  useEffect(() => {
    const saved = localStorage.getItem(`hunter_journal_${tutorialId}`);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        if (Array.isArray(parsedData)) {
          setCompletedCreatures(new Set(parsedData));
        }
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      }
    }
  }, [tutorialId]);

  // Salvar progresso
  const saveProgress = () => {
    setIsSaving(true);
    try {
      localStorage.setItem(`hunter_journal_${tutorialId}`, JSON.stringify(Array.from(completedCreatures)));
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    } finally {
      setTimeout(() => setIsSaving(false), 300);
    }
  };

  // Alternar criatura
  const toggleCreature = (creatureId: string) => {
    const newCompleted = new Set(completedCreatures);
    if (newCompleted.has(creatureId)) {
      newCompleted.delete(creatureId);
    } else {
      newCompleted.add(creatureId);
    }
    setCompletedCreatures(newCompleted);
    
    // Delay para salvar após todas as mudanças
    setTimeout(() => {
      saveProgress();
    }, 500);
  };

  // Marcar todas as criaturas
  const completeAll = () => {
    const allCreatureIds = creaturesData.map(creature => creature.id);
    const newCompleted = new Set(allCreatureIds);
    setCompletedCreatures(newCompleted);
    localStorage.setItem(`hunter_journal_${tutorialId}`, JSON.stringify(Array.from(newCompleted)));
  };

  // Limpar todas as criaturas
  const clearAll = () => {
    const newCompleted = new Set<string>();
    setCompletedCreatures(newCompleted);
    localStorage.setItem(`hunter_journal_${tutorialId}`, JSON.stringify(Array.from(newCompleted)));
  };

  // Separar criaturas em completas e incompletas
  const incompleteCreatures = creaturesData.filter(c => !completedCreatures.has(c.id));
  const completeCreatures = creaturesData.filter(c => completedCreatures.has(c.id));

  // Calcular progresso
  const totalCreatures = creaturesData.length;
  const completedCount = completeCreatures.length;
  const completionPercentage = Math.round((completedCount / totalCreatures) * 100);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Diário do Caçador</h1>
        <p className="text-gray-300 text-lg">
          Acompanhe todas as criaturas que você já derrotou em Hallownest
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-hollow-darker rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{incompleteCreatures.length}</div>
          <div className="text-sm text-gray-400">Criaturas na Lista</div>
        </div>
        <div className="bg-hollow-darker rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{completeCreatures.length}</div>
          <div className="text-sm text-gray-400">Criaturas Concluídas</div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={completeAll}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
        >
          Marcar Tudo
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
        >
          Desmarcar Tudo
        </button>
      </div>

      {/* Barra de Progresso */}
      <div className="mb-8 bg-hollow-darker rounded-lg p-6">
        <div className="w-full bg-gray-700 rounded-full h-8">
          <div 
            className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
            style={{ 
              width: `${(completedCount / totalCreatures) * 100}%`,
              minWidth: completedCount > 0 ? '60px' : '0px'
            }}
          >
            <span className="text-white text-sm font-semibold">
              {completionPercentage}%
            </span>
          </div>
        </div>
        <p className="text-center text-gray-400 mt-3 text-lg">
          {completedCount}/168 concluído
        </p>
      </div>

      {/* Grid de duas colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coluna de Incompletos */}
        <div className="bg-hollow-darker rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4 pb-4 border-b border-gray-700">
            Lista de Criaturas ({incompleteCreatures.length})
          </h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
            {incompleteCreatures.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <img src="./images/hunterMark.png" alt="Hunter's Mark" className="w-16 h-16 mx-auto mb-2" />
                <p>Todas as criaturas foram concluídas!</p>
              </div>
            ) : (
              incompleteCreatures.map((creature) => (
                <label
                  key={creature.id}
                  className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors duration-200 bg-transparent"
                  onClick={() => toggleCreature(creature.id)}
                >
                  <div className="flex items-center justify-center w-5 h-5 border-2 border-gray-400 rounded bg-transparent">
                  </div>
                  <span className="text-white text-sm flex-1">{creature.name}</span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Coluna de Completos */}
        <div className="bg-hollow-darker rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4 pb-4 border-b border-gray-700">
            Concluído ({completeCreatures.length})
          </h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
            {completeCreatures.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <img src="./images/hunter.png" alt="Hunter" className="w-16 h-16 mx-auto mb-2" />
                <p>Nenhuma criatura concluída ainda</p>
              </div>
            ) : (
              completeCreatures.map((creature) => (
                <label
                  key={creature.id}
                  className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors duration-200 bg-blue-900/20"
                  onClick={() => toggleCreature(creature.id)}
                >
                  <div className="flex items-center justify-center w-5 h-5 border-2 border-blue-500 rounded bg-blue-500">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white text-sm flex-1">{creature.name}</span>
                </label>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mensagem de conclusão */}
      {completeCreatures.length === creaturesData.length && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-600 to-green-500 rounded-lg text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white mb-2">Parabéns!</h3>
          <p className="text-green-100">
            Você completou o Diário do Caçador! Você é um Verdadeiro Caçador de Hallownest!
          </p>
        </div>
      )}

      {/* Indicador de salvamento */}
      {isSaving && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Salvando progresso...
        </div>
      )}
    </div>
  );
};

export default HunterJournalChecklist;

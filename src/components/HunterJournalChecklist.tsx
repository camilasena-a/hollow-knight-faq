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

  // Lista de todas as criaturas do Diário do Caçador
  const creaturesData: CreatureItem[] = [
    // Forgotten Crossroads (15 criaturas)
    { id: 'aspid-hatchling', name: 'Aspid Hatchling', area: 'Forgotten Crossroads' },
    { id: 'aspid-hunter', name: 'Aspid Hunter', area: 'Forgotten Crossroads' },
    { id: 'aspid-mother', name: 'Aspid Mother', area: 'Forgotten Crossroads' },
    { id: 'baldur', name: 'Baldur', area: 'Forgotten Crossroads' },
    { id: 'battle-obble', name: 'Battle Obble', area: 'Forgotten Crossroads' },
    { id: 'belfly', name: 'Belfly', area: 'Forgotten Crossroads' },
    { id: 'bluggsac', name: 'Bluggsac', area: 'Forgotten Crossroads' },
    { id: 'boofly', name: 'Boofly', area: 'Forgotten Crossroads' },
    { id: 'broken-vessel', name: 'Broken Vessel', area: 'Forgotten Crossroads' },
    { id: 'brooding-mawlek', name: 'Brooding Mawlek', area: 'Forgotten Crossroads' },
    { id: 'carver-hatcher', name: 'Carver Hatcher', area: 'Forgotten Crossroads' },
    { id: 'charged-lumafly', name: 'Charged Lumafly', area: 'Forgotten Crossroads' },
    { id: 'crawlid', name: 'Crawlid', area: 'Forgotten Crossroads' },
    { id: 'death-loodle', name: 'Death Loodle', area: 'Forgotten Crossroads' },
    { id: 'dirtcarver', name: 'Dirtcarver', area: 'Forgotten Crossroads' },
    
    // Greenpath (12 criaturas)
    { id: 'aluba', name: 'Aluba', area: 'Greenpath' },
    { id: 'amablom', name: 'Ambloom', area: 'Greenpath' },
    { id: 'armoured-squit', name: 'Armoured Squit', area: 'Greenpath' },
    { id: 'durandoo', name: 'Durandoo', area: 'Greenpath' },
    { id: 'duranda', name: 'Duranda', area: 'Greenpath' },
    { id: 'goam', name: 'Goam', area: 'Greenpath' },
    { id: 'gorgeous-husk', name: 'Gorgeous Husk', area: 'Greenpath' },
    { id: 'gruzzer', name: 'Gruzzer', area: 'Greenpath' },
    { id: 'moss-knight', name: 'Moss Knight', area: 'Greenpath' },
    { id: 'mosscreep', name: 'Mosscreep', area: 'Greenpath' },
    { id: 'mossfly', name: 'Mossfly', area: 'Greenpath' },
    { id: 'squit', name: 'Squit', area: 'Greenpath' },

    // Fungal Wastes (10 criaturas)
    { id: 'fungling', name: 'Fungling', area: 'Fungal Wastes' },
    { id: 'fungoon', name: 'Fungoon', area: 'Fungal Wastes' },
    { id: 'fungus-core', name: 'Fungus Core', area: 'Fungal Wastes' },
    { id: 'mantis', name: 'Mantis', area: 'Fungal Wastes' },
    { id: 'mantis-traitor', name: 'Mantis Traitor', area: 'Fungal Wastes' },
    { id: 'mantis-warrior', name: 'Mantis Warrior', area: 'Fungal Wastes' },
    { id: 'mantis-youth', name: 'Mantis Youth', area: 'Fungal Wastes' },
    { id: 'shrumal-ogre', name: 'Shrumal Ogre', area: 'Fungal Wastes' },
    { id: 'shrumal-warrior', name: 'Shrumal Warrior', area: 'Fungal Wastes' },
    { id: 'sporg', name: 'Sporg', area: 'Fungal Wastes' },

    // City of Tears (18 criaturas)
    { id: 'city-guard', name: 'City Guard', area: 'City of Tears' },
    { id: 'corpse-creeper', name: 'Corpse Creeper', area: 'City of Tears' },
    { id: 'crystal-crawler', name: 'Crystal Crawler', area: 'City of Tears' },
    { id: 'crystal-hunter', name: 'Crystal Hunter', area: 'City of Tears' },
    { id: 'dung-defender', name: 'Dung Defender', area: 'City of Tears' },
    { id: 'entombed-husk', name: 'Entombed Husk', area: 'City of Tears' },
    { id: 'fool-eater', name: 'Fool Eater', area: 'City of Tears' },
    { id: 'giant-fly', name: 'Giant Fly', area: 'City of Tears' },
    { id: 'great-husk-sentry', name: 'Great Husk Sentry', area: 'City of Tears' },
    { id: 'heavy-fool', name: 'Heavy Fool', area: 'City of Tears' },
    { id: 'husk-dandy', name: 'Husk Dandy', area: 'City of Tears' },
    { id: 'husk-warrior', name: 'Husk Warrior', area: 'City of Tears' },
    { id: 'lance-sentry', name: 'Lance Sentry', area: 'City of Tears' },
    { id: 'mistake', name: 'Mistake', area: 'City of Tears' },
    { id: 'nailmaster-oro', name: 'Nailmaster Oro', area: 'City of Tears' },
    { id: 'nailmaster-sheo', name: 'Nailmaster Sheo', area: 'City of Tears' },
    { id: 'nailmaster-mato', name: 'Nailmaster Mato', area: 'City of Tears' },
    { id: 'soul-warrior', name: 'Soul Warrior', area: 'City of Tears' },

    // Crystal Peak (8 criaturas)
    { id: 'crystal-crawler-2', name: 'Crystal Crawler', area: 'Crystal Peak' },
    { id: 'crystal-fly', name: 'Crystal Fly', area: 'Crystal Peak' },
    { id: 'crystal-guardian', name: 'Crystal Guardian', area: 'Crystal Peak' },
    { id: 'crystal-hunter-2', name: 'Crystal Hunter', area: 'Crystal Peak' },
    { id: 'crystal-mite', name: 'Crystal Mite', area: 'Crystal Peak' },
    { id: 'crystal-warrior', name: 'Crystal Warrior', area: 'Crystal Peak' },
    { id: 'garpede', name: 'Garpede', area: 'Crystal Peak' },
    { id: 'laser-turret', name: 'Laser Turret', area: 'Crystal Peak' },

    // Resting Grounds (5 criaturas)
    { id: 'glowing-womb', name: 'Glowing Womb', area: 'Resting Grounds' },
    { id: 'grimmkin-novice', name: 'Grimmkin Novice', area: 'Resting Grounds' },
    { id: 'grimmkin-nightmare', name: 'Grimmkin Nightmare', area: 'Resting Grounds' },
    { id: 'grimmkin-troupe', name: 'Grimmkin Troupe', area: 'Resting Grounds' },
    { id: 'xero', name: 'Xero', area: 'Resting Grounds' },

    // Ancient Basin (6 criaturas)
    { id: 'brooding-mawlek-2', name: 'Brooding Mawlek', area: 'Ancient Basin' },
    { id: 'garpede-2', name: 'Garpede', area: 'Ancient Basin' },
    { id: 'infected-balloon', name: 'Infected Balloon', area: 'Ancient Basin' },
    { id: 'mawlek', name: 'Mawlek', area: 'Ancient Basin' },
    { id: 'pale-lurker', name: 'Pale Lurker', area: 'Ancient Basin' },
    { id: 'royal-retainer', name: 'Royal Retainer', area: 'Ancient Basin' },

    // Kingdom's Edge (7 criaturas)
    { id: 'belfly-2', name: 'Belfly', area: 'Kingdom\'s Edge' },
    { id: 'great-hopper', name: 'Great Hopper', area: 'Kingdom\'s Edge' },
    { id: 'hopper', name: 'Hopper', area: 'Kingdom\'s Edge' },
    { id: 'primal-aspid', name: 'Primal Aspid', area: 'Kingdom\'s Edge' },
    { id: 'shade', name: 'Shade', area: 'Kingdom\'s Edge' },
    { id: 'shade-soul', name: 'Shade Soul', area: 'Kingdom\'s Edge' },
    { id: 'shade-lord', name: 'Shade Lord', area: 'Kingdom\'s Edge' },

    // Deepnest (9 criaturas)
    { id: 'corpse-creeper-2', name: 'Corpse Creeper', area: 'Deepnest' },
    { id: 'dirtcarver-2', name: 'Dirtcarver', area: 'Deepnest' },
    { id: 'garpede-3', name: 'Garpede', area: 'Deepnest' },
    { id: 'lightseed', name: 'Lightseed', area: 'Deepnest' },
    { id: 'maskfly', name: 'Maskfly', area: 'Deepnest' },
    { id: 'nosk', name: 'Nosk', area: 'Deepnest' },
    { id: 'shardmite', name: 'Shardmite', area: 'Deepnest' },
    { id: 'stalking-devout', name: 'Stalking Devout', area: 'Deepnest' },
    { id: 'weaver', name: 'Weaver', area: 'Deepnest' },

    // Queen's Gardens (6 criaturas)
    { id: 'durandoo-2', name: 'Durandoo', area: 'Queen\'s Gardens' },
    { id: 'duranda-2', name: 'Duranda', area: 'Queen\'s Gardens' },
    { id: 'mantis-traitor-2', name: 'Mantis Traitor', area: 'Queen\'s Gardens' },
    { id: 'moss-knight-2', name: 'Moss Knight', area: 'Queen\'s Gardens' },
    { id: 'spiny-husk', name: 'Spiny Husk', area: 'Queen\'s Gardens' },
    { id: 'traitor-lord', name: 'Traitor Lord', area: 'Queen\'s Gardens' },

    // Howling Cliffs (4 criaturas)
    { id: 'gruzzer-2', name: 'Gruzzer', area: 'Howling Cliffs' },
    { id: 'husk-guard', name: 'Husk Guard', area: 'Howling Cliffs' },
    { id: 'vengefly', name: 'Vengefly', area: 'Howling Cliffs' },
    { id: 'zote', name: 'Zote', area: 'Howling Cliffs' },

    // Colosseum of Fools (3 criaturas)
    { id: 'fool-eater-2', name: 'Fool Eater', area: 'Colosseum of Fools' },
    { id: 'heavy-fool-2', name: 'Heavy Fool', area: 'Colosseum of Fools' },
    { id: 'zote-2', name: 'Zote', area: 'Colosseum of Fools' },

    // Flying Sentry (adicional)
    { id: 'flying-sentry', name: 'Flying Sentry', area: 'Forgotten Crossroads' },
    { id: 'husk-bully', name: 'Husk Bully', area: 'Forgotten Crossroads' },
    { id: 'husk-hornhead', name: 'Husk Hornhead', area: 'Forgotten Crossroads' },
    { id: 'husk-sentry', name: 'Husk Sentry', area: 'Forgotten Crossroads' },
    { id: 'leaping-husk', name: 'Leaping Husk', area: 'Forgotten Crossroads' },
    { id: 'tiktik', name: 'Tiktik', area: 'Forgotten Crossroads' },
    { id: 'vengefly-2', name: 'Vengefly', area: 'Forgotten Crossroads' },

    // Fog Canyon (8 criaturas)
    { id: 'obble', name: 'Obble', area: 'Fog Canyon' },
    { id: 'oof-moss-charger', name: 'Ooma', area: 'Fog Canyon' },
    { id: 'ooma', name: 'Ooma', area: 'Fog Canyon' },
    { id: 'uum-uu', name: 'Uumuu', area: 'Fog Canyon' },
    { id: 'moss-creep-2', name: 'Mosscreep', area: 'Fog Canyon' },
    { id: 'fungling-2', name: 'Fungling', area: 'Fog Canyon' },
    { id: 'sporg-2', name: 'Sporg', area: 'Fog Canyon' },
    { id: 'crafty-weaverling', name: 'Weaverling', area: 'Fog Canyon' },

    // Royal Waterways (12 criaturas)
    { id: 'flukefey', name: 'Flukefey', area: 'Royal Waterways' },
    { id: 'fluke-hermit', name: 'Fluke Hermit', area: 'Royal Waterways' },
    { id: 'flukemongo', name: 'Flukemongo', area: 'Royal Waterways' },
    { id: 'flukemarm', name: 'Flukemarm', area: 'Royal Waterways' },
    { id: 'water-leaper', name: 'Water Leaper', area: 'Royal Waterways' },
    { id: 'blug-sac', name: 'Bluggsac', area: 'Royal Waterways' },
    { id: 'dung-defender-2', name: 'Dung Defender', area: 'Royal Waterways' },
    { id: 'white-defender', name: 'White Defender', area: 'Royal Waterways' },
    { id: 'corpse-creeper-3', name: 'Corpse Creeper', area: 'Royal Waterways' },
    { id: 'splat', name: 'Splat', area: 'Royal Waterways' },
    { id: 'hoppip', name: 'Hoppip', area: 'Royal Waterways' },
    { id: 'corpse-roller', name: 'Corpse Roller', area: 'Royal Waterways' },

    // Hive (6 criaturas)
    { id: 'hive-knight', name: 'Hive Knight', area: 'Hive' },
    { id: 'hive-honey', name: 'Honey Hive', area: 'Hive' },
    { id: 'hive-guardian', name: 'Hive Guardian', area: 'Hive' },
    { id: 'bee-knight', name: 'Bee Knight', area: 'Hive' },
    { id: 'bee-husk', name: 'Bee Husk', area: 'Hive' },
    { id: 'hive-larva', name: 'Hive Larva', area: 'Hive' },

    // Abyss (7 criaturas)
    { id: 'abyss-tendril', name: 'Abyss Tendril', area: 'Abyss' },
    { id: 'void-tendril', name: 'Void Tendril', area: 'Abyss' },
    { id: 'shade-lurker', name: 'Shade Lurker', area: 'Abyss' },
    { id: 'sibling-shade', name: 'Sibling Shade', area: 'Abyss' },
    { id: 'void-spawn', name: 'Void Spawn', area: 'Abyss' },
    { id: 'abyss-creature', name: 'Abyss Creature', area: 'Abyss' },
    { id: 'king-ghost', name: 'King\'s Ghost', area: 'Abyss' },

    // White Palace (5 criaturas)
    { id: 'winged-obble', name: 'Winged Obble', area: 'White Palace' },
    { id: 'rock-bat', name: 'Rock Bat', area: 'White Palace' },
    { id: 'flukemon', name: 'Flukemon', area: 'White Palace' },
    { id: 'king-mould', name: 'King Mould', area: 'White Palace' },
    { id: 'winged-fool', name: 'Winged Fool', area: 'White Palace' },

    // Godhome (4 criaturas)
    { id: 'god-tuner', name: 'God Tuner', area: 'Godhome' },
    { id: 'statue', name: 'Statue', area: 'Godhome' },
    { id: 'godseeker', name: 'Godseeker', area: 'Godhome' },
    { id: 'void-god', name: 'Void God', area: 'Godhome' },
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
          {completedCount}/{totalCreatures} concluído
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


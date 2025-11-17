import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface ChecklistItem {
  id: string;
  name: string;
  category: string;
  percentage: number;
  description?: string;
  subcategory?: string; // Para subseções dentro de Extras
}

interface CompletionChecklistHK2Props {
  tutorialId: string;
}

const CompletionChecklistHK2: React.FC<CompletionChecklistHK2Props> = ({ tutorialId }) => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Dados do checklist de 100% para Silksong
  const checklistData: ChecklistItem[] = [
    // Ferramentas de Ataque (18%)
    { id: 'tool-1', name: 'Pino Reto', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-2', name: 'Pino Tríplice', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-3', name: 'Fragmento de Ferrão', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-4', name: 'Tachinhas', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-5', name: 'Pinolongo', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-6', name: 'Curvafoice', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-7', name: 'Anel de Arremesso', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-8', name: 'Almofapino', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-9', name: 'Corta-concha', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-10', name: 'Tiro de Seda', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-11', name: 'Broca de Cavador', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-12', name: 'Roda Mecânica', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-13', name: 'Mosca Mecânica', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-14', name: 'Canhão de Rosários', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-15', name: 'Orbevolts', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-16', name: 'Frasco de Plásmio', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-17', name: 'Cerveja de Pulga', category: 'Ferramentas de Ataque', percentage: 1, description: '' },
    { id: 'tool-18', name: 'Placa Ignea', category: 'Ferramentas de Ataque', percentage: 1, description: '' },

    // Ferramentas de Defesa (21%)
    { id: 'defense-tool-1', name: 'Olho do Druida', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-2', name: 'Sino de Magma', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-3', name: 'Sino Protetor', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-4', name: 'Multivinculador', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-5', name: 'Máscara Fraturada', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-6', name: 'Bolsa de Pólipo', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-7', name: 'Teceleve', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-8', name: 'Bainha Serrilhada', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-9', name: 'Conjunto Injetor', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-10', name: 'Espelhos de Garra', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-11', name: 'Vínculo Reserva', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-12', name: 'Extensor de Carretel', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-13', name: 'Cristal da Memória', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-14', name: 'Catassaque', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-15', name: 'Filamento Voltaico', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-16', name: 'Garralonga', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-17', name: 'Lanterna de Lumefogo', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-18', name: 'Guirlanda da Pureza', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-19', name: 'Sela Rápida', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-20', name: 'Ovo de Pulgalia', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    { id: 'defense-tool-21', name: 'Emblema de Pino', category: 'Ferramentas de Defesa', percentage: 1, description: '' },
    
    // Ferramentas Auxiliares (12%)
    { id: 'aux-tool-1', name: 'Bússola', category: 'Ferramentas Auxiliares', percentage: 1, description: '' },
    { id: 'aux-tool-2', name: 'Pingente de Fragmento', category: 'Ferramentas Auxiliares', percentage: 1, description: '' },
    { id: 'aux-tool-3', name: 'Broche de Magnetita', category: 'Ferramentas Auxiliares', percentage: 1, description: '' },
    { id: 'aux-tool-4', name: 'Bolsa de Inseto Morto', category: 'Ferramentas Auxiliares', percentage: 1, description: '' },
    { id: 'aux-tool-5', name: 'Bracelete Farpado', category: 'Ferramentas Auxiliares', percentage: 1, description: '' },
    { id: 'aux-tool-6', name: 'Cinto Pesado', category: 'Ferramentas Auxiliares', percentage: 1, description: '' },
    { id: 'aux-tool-7', name: 'Dados de Magnetita', category: 'Ferramentas Auxiliares', percentage: 1, description: '' },
    { id: 'aux-tool-8', name: 'Braçaranha', category: 'Ferramentas Auxiliares', percentage: 1, description: '' },
    { id: 'aux-tool-9', name: 'Empunhadora de Subida', category: 'Ferramentas Auxiliares', percentage: 1, description: '' },
    { id: 'aux-tool-10', name: 'Marca do Ladrão', category: 'Ferramentas Auxiliares', percentage: 1, description: '' },
    { id: 'aux-tool-11', name: 'Tornozeleiras Sedavelozes', category: 'Ferramentas Auxiliares', percentage: 1, description: '' },
    { id: 'aux-tool-12', name: 'Cordões de Aranha', category: 'Ferramentas Auxiliares', percentage: 1, description: '' },

    // Bolsa de Ferramentas e Conjunto de Fabricação (8%)
    { id: 'bag-capacity-1', name: 'Capacidade da Bolsa 1', category: 'Bolsa de Ferramentas e Conjunto de Fabricação', percentage: 1, description: 'Campos Longiquos, loja do Mort' },
    { id: 'bag-capacity-2', name: 'Capacidade da Bolsa 2', category: 'Bolsa de Ferramentas e Conjunto de Fabricação', percentage: 1, description: 'Medula, NPC Loddie com desafio dos pinos' },
    { id: 'bag-capacity-3', name: 'Capacidade da Bolsa 3', category: 'Bolsa de Ferramentas e Conjunto de Fabricação', percentage: 1, description: 'Pântano Cinzento, quest do diário do caçador' },
    { id: 'bag-capacity-4', name: 'Capacidade da Bolsa 4', category: 'Bolsa de Ferramentas e Conjunto de Fabricação', percentage: 1, description: 'Grande Portão, após pegar 20 pulgas' },
    { id: 'tool-damage-1', name: 'Dano das Ferramentas 1', category: 'Bolsa de Ferramentas e Conjunto de Fabricação', percentage: 1, description: 'Docas Profundas, loja daFilha da Forja' },
    { id: 'tool-damage-2', name: 'Dano das Ferramentas 2', category: 'Bolsa de Ferramentas e Conjunto de Fabricação', percentage: 1, description: 'Campânula, quest dos corvos' },
    { id: 'tool-damage-3', name: 'Dano das Ferramentas 3', category: 'Bolsa de Ferramentas e Conjunto de Fabricação', percentage: 1, description: 'Claustroforjas, loja do arquiteto' },
    { id: 'tool-damage-4', name: 'Dano das Ferramentas 4', category: 'Bolsa de Ferramentas e Conjunto de Fabricação', percentage: 1, description: 'Degraus Devastados, loja do Grindle' },

    // Máscaras (10%)
    { id: 'mask-1', name: 'Máscara 1', category: 'Máscaras', percentage: 0.25, description: 'Loja no Vale dos Ossos' },
    { id: 'mask-2', name: 'Máscara 2', category: 'Máscaras', percentage: 0.25, description: 'Entrada do Covil dos Vermes' },
    { id: 'mask-3', name: 'Máscara 3', category: 'Máscaras', percentage: 0.25, description: 'Campos Longiquos, com planador' },
    { id: 'mask-4', name: 'Máscara 4', category: 'Máscaras', percentage: 0.25, description: 'Cascomadeira' },
    { id: 'mask-5', name: 'Máscara 5', category: 'Máscaras', percentage: 0.25, description: 'Ninho de Atla (Eva)' },
    { id: 'mask-6', name: 'Máscara 6', category: 'Máscaras', percentage: 0.25, description: 'Docas Profundas, na fronteira com Medula' },
    { id: 'mask-7', name: 'Máscara 7', category: 'Máscaras', percentage: 0.25, description: 'Mercadora Jubilana' },
    { id: 'mask-8', name: 'Máscara 8', category: 'Máscaras', percentage: 0.25, description: 'Quest: Besta Alada Selvagem' },
    { id: 'mask-9', name: 'Máscara 9', category: 'Máscaras', percentage: 0.25, description: 'Arena em Campos Longiquos, com arpão no fogo' },
    { id: 'mask-10', name: 'Máscara 10', category: 'Máscaras', percentage: 0.25, description: 'Degraus Devastados, com pulo duplo' },
    { id: 'mask-11', name: 'Máscara 11', category: 'Máscaras', percentage: 0.25, description: 'Bosque dos Lumes' },
    { id: 'mask-12', name: 'Máscara 12', category: 'Máscaras', percentage: 0.25, description: 'Mecanismo Vital, após arena' },
    { id: 'mask-13', name: 'Máscara 13', category: 'Máscaras', percentage: 0.25, description: 'Câmaras Sussurantes, região abaixo do sentinela' },
    { id: 'mask-14', name: 'Máscara 14', category: 'Máscaras', percentage: 0.25, description: 'Rochedo, area de espinhos e engrenagens' },
    { id: 'mask-15', name: 'Máscara 15', category: 'Máscaras', percentage: 0.25, description: 'Monte Plumidio, próximo ao banco no extremo do mapa' },
    { id: 'mask-16', name: 'Máscara 16', category: 'Máscaras', percentage: 0.25, description: 'Bilebrejo' },
    { id: 'mask-17', name: 'Máscara 17', category: 'Máscaras', percentage: 0.25, description: 'Monte Plumidio, ato 3' },
    { id: 'mask-18', name: 'Máscara 18', category: 'Máscaras', percentage: 0.25, description: 'Quest: Massas de vazio, ato 3' },
    { id: 'mask-19', name: 'Máscara 19', category: 'Máscaras', percentage: 0.25, description: 'Quest: Caçador Oculto, ato 3' },
    { id: 'mask-20', name: 'Máscara 20', category: 'Máscaras', percentage: 0.25, description: 'Quest: Mais Rapido de Fiarlongo, ato 3 ' },

    // Carretel de Seda (6%)
    { id: 'spool-1', name: 'Fragmento de Carretel 1', category: 'Carretel de Seda', percentage: 0.3333, description: 'Vale dos Ossos, sala secreta' },
    { id: 'spool-2', name: 'Fragmento de Carretel 2', category: 'Carretel de Seda', percentage: 0.3333, description: 'Docas Profundas, sul do mapa' },
    { id: 'spool-3', name: 'Fragmento de Carretel 3', category: 'Carretel de Seda', percentage: 0.3333, description: 'Loja Campanula, após quest do entregador' },
    { id: 'spool-4', name: 'Fragmento de Carretel 4', category: 'Carretel de Seda', percentage: 0.3333, description: 'Pântano Cinzento, acima do banco dos corvos' },
    { id: 'spool-5', name: 'Fragmento de Carretel 5', category: 'Carretel de Seda', percentage: 0.3333, description: 'Ninho de Atla (Eva)' },
    { id: 'spool-6', name: 'Fragmento de Carretel 6', category: 'Carretel de Seda', percentage: 0.3333, description: 'Rochedo, fronteira com Monte Plumidio' },
    { id: 'spool-7', name: 'Fragmento de Carretel 7', category: 'Carretel de Seda', percentage: 0.3333, description: 'Degraus Devastados, loja do Grindle' },
    { id: 'spool-8', name: 'Fragmento de Carretel 8', category: 'Carretel de Seda', percentage: 0.3333, description: 'Grande Portão, após chegar com as 14 pulgas' },
    { id: 'spool-9', name: 'Fragmento de Carretel 9', category: 'Carretel de Seda', percentage: 0.3333, description: 'Grande Portão, acima das balanças' },
    { id: 'spool-10', name: 'Fragmento de Carretel 10', category: 'Carretel de Seda', percentage: 0.3333, description: 'Ala Branca, por baixo do elevador' },
    { id: 'spool-11', name: 'Fragmento de Carretel 11', category: 'Carretel de Seda', percentage: 0.3333, description: 'Ala Branca, quest da Sherma' },
    { id: 'spool-12', name: 'Fragmento de Carretel 12', category: 'Carretel de Seda', percentage: 0.3333, description: 'Claustroforjas, após arena na área central' },
    { id: 'spool-13', name: 'Fragmento de Carretel 13', category: 'Carretel de Seda', percentage: 0.3333, description: 'Claustroforjas, sul direita' },
    { id: 'spool-14', name: 'Fragmento de Carretel 14', category: 'Carretel de Seda', percentage: 0.3333, description: 'Mecanismo Vital, sul direita' },
    { id: 'spool-15', name: 'Fragmento de Carretel 15', category: 'Carretel de Seda', percentage: 0.3333, description: 'Loja Jubilana, após 2º desaparecimento' },
    { id: 'spool-16', name: 'Fragmento de Carretel 16', category: 'Carretel de Seda', percentage: 0.3333, description: 'Memorium' },
    { id: 'spool-17', name: 'Fragmento de Carretel 17', category: 'Carretel de Seda', percentage: 0.3333, description: 'Salões Supremos, no topo' },
    { id: 'spool-18', name: 'Fragmento de Carretel 18', category: 'Carretel de Seda', percentage: 0.3336, description: 'Docas Profundas, área com chave ou arpão' },

    // Habilidades de Seda (6%)
    { id: 'silk-ability-1', name: 'Lança de Seda', category: 'Habilidades de Seda', percentage: 1, description: 'Musgalia' },
     { id: 'silk-ability-2', name: 'Turbilhão de Fios', category: 'Habilidades de Seda', percentage: 1, description: 'Pantano Cizento' },
    { id: 'silk-ability-3', name: 'Ponto Cruz', category: 'Habilidades de Seda', percentage: 1, description: 'Derrotar Fantasma' },
    { id: 'silk-ability-4', name: 'Dardo Afiado', category: 'Habilidades de Seda', percentage: 1, description: 'Ninho de Telelã Covil dos Vermes' },
    { id: 'silk-ability-5', name: 'Fúria de Runas', category: 'Habilidades de Seda', percentage: 1, description: 'Derrotar Primeira Pecadora' },
    { id: 'silk-ability-6', name: 'Lâminas Giratórias', category: 'Habilidades de Seda', percentage: 1, description: 'Braço Grande Mãe' },

    // Habilidades (6%)
    { id: 'ability-1', name: 'Passo Veloz', category: 'Habilidades', percentage: 1, description: 'Dash' },
    { id: 'ability-2', name: 'Garra de Seda', category: 'Habilidades', percentage: 1, description: 'Arpão' },
    { id: 'ability-3', name: 'Silfonia', category: 'Habilidades', percentage: 1, description: 'Fundir Eva' },
    { id: 'ability-4', name: 'Agulino', category: 'Habilidades', percentage: 1, description: 'Derrotar Viuva' },
    { id: 'ability-5', name: 'Garra Aderente', category: 'Habilidades', percentage: 1, description: 'Cascomadeira' },
    { id: 'ability-6', name: 'Impulso de Seda', category: 'Habilidades', percentage: 1, description: 'Abismo' },
    { id: 'ability-7', name: 'Ataque focado', category: 'Habilidades', percentage: 1, description: 'Alfinistra' },
    { id: 'ability-8', name: 'Flor da eternidade', category: 'Habilidades', percentage: 1, description: 'Quest Para ato 3' },

    // Brasões (5%)
    { id: 'badge-1', name: 'Brasão da Besta', category: 'Brasões', percentage: 1, description: '' },
    { id: 'badge-2', name: 'Brasão do Ceifador', category: 'Brasões', percentage: 1, description: '' },
    { id: 'badge-3', name: 'Brasão do Viajante', category: 'Brasões', percentage: 1, description: '' },
    { id: 'badge-4', name: 'Brasão da Bruxa', category: 'Brasões', percentage: 1, description: '' },
    { id: 'badge-5', name: 'Brasão do Arquiteto', category: 'Brasões', percentage: 1, description: '' },
    { id: 'badge-6', name: 'Brasão do Xamã', category: 'Brasões', percentage: 1, description: '' },
   
    // Melhoria de Agulha (4%)
    { id: 'needle-upgrade-1', name: 'Melhoria de Agulha 1', category: 'Melhoria de Agulha', percentage: 1, description: 'Agulha Afiada' },
    { id: 'needle-upgrade-2', name: 'Melhoria de Agulha 2', category: 'Melhoria de Agulha', percentage: 1, description: 'Agulha Reluzente' },
    { id: 'needle-upgrade-3', name: 'Melhoria de Agulha 3', category: 'Melhoria de Agulha', percentage: 1, description: 'Agulha de Aço Favônio' },
    { id: 'needle-upgrade-4', name: 'Melhoria de Agulha 4', category: 'Melhoria de Agulha', percentage: 1, description: 'Agulha de Aço Pálido' },
  
    // Corações de Seda (3%)
    { id: 'silk-heart-1', name: 'Coração de Seda 1', category: 'Corações de Seda', percentage: 1, description: 'Derrotar Tessela no Berço' },
     { id: 'silk-heart-2', name: 'Coração de Seda 2', category: 'Corações de Seda', percentage: 1, description: 'Derrotar Eira' },
    { id: 'silk-heart-3', name: 'Coração de Seda 3', category: 'Corações de Seda', percentage: 1, description: 'Derrotar Boss da Ala Branca' },

    // Extras - Metais Artesanais (0% - não conta para 100%)
    { id: 'metal-1', name: 'Metal Artesanal 1', category: 'Metais Artesanais', percentage: 0, description: 'Vale dos Ossos, na loja' },
    { id: 'metal-2', name: 'Metal Artesanal 2', category: 'Metais Artesanais', percentage: 0, description: 'Medula, próximo a Skar' },
    { id: 'metal-3', name: 'Metal Artesanal 3', category: 'Metais Artesanais', percentage: 0, description: 'Docas Profundas, com chave simples' },
    { id: 'metal-4', name: 'Metal Artesanal 4', category: 'Metais Artesanais', percentage: 0, description: 'Degraus Devastados, caminho pra juiza' },
    { id: 'metal-5', name: 'Metal Artesanal 5', category: 'Metais Artesanais', percentage: 0, description: 'Claustroforjas, lado direito com fogo' },
    { id: 'metal-6', name: 'Metal Artesanal 6', category: 'Metais Artesanais', percentage: 0, description: 'Bosque dos Lumes' },
    { id: 'metal-7', name: 'Metal Artesanal 7', category: 'Metais Artesanais', percentage: 0, description: 'Cantoclave, loja Jubilana' },
    { id: 'metal-8', name: 'Metal Artesanal 8', category: 'Metais Artesanais', percentage: 0, description: 'Canais Pestilentos, final do lago' },
 
    // Medalhões Memoriais (0% - não conta para 100%)
    { id: 'medalhao-1', name: 'Medalhao Memorial 1', category: 'Medalhões Memoriais', percentage: 0, description: 'Trilha de Skar' },
    { id: 'medalhao-2', name: 'Medalhao Memorial 2', category: 'Medalhões Memoriais', percentage: 0, description: 'Campos Longiquos, na loja' },
    { id: 'medalhao-3', name: 'Medalhao Memorial 3', category: 'Medalhões Memoriais', percentage: 0, description: 'Medula, próximo a Eira' },
    { id: 'medalhao-4', name: 'Medalhao Memorial 4', category: 'Medalhões Memoriais', percentage: 0, description: 'Vale dos Ossos, quest  dos caralignos' },
    { id: 'medalhao-5', name: 'Medalhao Memorial 5', category: 'Medalhões Memoriais', percentage: 0, description: 'Pântano Cinzento, próximo a Eira' },
    { id: 'medalhao-6', name: 'Medalhao Memorial 6', category: 'Medalhões Memoriais', percentage: 0, description: 'Campanula, na loja' },
    { id: 'medalhao-7', name: 'Medalhao Memorial 7', category: 'Medalhões Memoriais', percentage: 0, description: 'Degraus Devastados, próximo a Shakra' },
    { id: 'medalhao-8', name: 'Medalhao Memorial 8', category: 'Medalhões Memoriais', percentage: 0, description: 'Covil dos Vermes, abaixo do mapa' },
    { id: 'medalhao-9', name: 'Medalhao Memorial 9', category: 'Medalhões Memoriais', percentage: 0, description: 'Quase lar, dentro do bar' },
    { id: 'medalhao-10', name: 'Medalhao Memorial 10', category: 'Medalhões Memoriais', percentage: 0, description: 'Claustroforjas, próximo aos bancos pagos' },
    { id: 'medalhao-11', name: 'Medalhao Memorial 11', category: 'Medalhões Memoriais', percentage: 0, description: 'Areias de Karak' },
    { id: 'medalhao-12', name: 'Medalhao Memorial 12', category: 'Medalhões Memoriais', percentage: 0, description: 'Orgão Exaustor, no caminho para Cidadela' },
    { id: 'medalhao-13', name: 'Medalhao Memorial 13', category: 'Medalhões Memoriais', percentage: 0, description: 'Câmaras Sussurantes, passagem secreta' },
    { id: 'medalhao-14', name: 'Medalhao Memorial 14', category: 'Medalhões Memoriais', percentage: 0, description: 'Bilebrejo, esquerda acima da Eira' },
    { id: 'medalhao-15', name: 'Medalhao Memorial 15', category: 'Medalhões Memoriais', percentage: 0, description: 'Bilibrejo, acima direita' },
    { id: 'medalhao-16', name: 'Medalhao Memorial 16', category: 'Medalhões Memoriais', percentage: 0, description: 'Memorium' },
    { id: 'medalhao-17', name: 'Medalhao Memorial 17', category: 'Medalhões Memoriais', percentage: 0, description: 'Rochedo, com chave da apostata'},
    { id: 'medalhao-18', name: 'Medalhao Memorial 18', category: 'Medalhões Memoriais', percentage: 0, description: 'Docas Profundas, com chave simples ou arpão' },
    { id: 'medalhao-19', name: 'Medalhao Memorial 19', category: 'Medalhões Memoriais', percentage: 0, description: 'Campos Longiquos, area do ato 3' },
    { id: 'medalhao-20', name: 'Medalhao Memorial 20', category: 'Medalhões Memoriais', percentage: 0, description: 'Campanula, ato 3' },
 
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

  // Separar itens normais dos extras
  const normalItems = checklistData.filter(item => item.category !== 'Extras' && item.category !== 'Metais Artesanais' && item.category !== 'Medalhões Memoriais');
  const extraItems = checklistData.filter(item => item.category === 'Extras' || item.category === 'Metais Artesanais' || item.category === 'Medalhões Memoriais');

  // Agrupar itens normais por categoria
  const groupedItems = normalItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  // Agrupar itens extras por categoria (ou subcategoria se existir)
  const groupedExtras = extraItems.reduce((acc, item) => {
    const category = item.subcategory || item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  // Inicializar todas as seções como expandidas por padrão
  useEffect(() => {
    const allCategories = Object.keys(groupedItems);
    const allExtraSections = Object.keys(groupedExtras).map(sub => `extras-${sub}`);
    const allSections = [...allCategories, ...allExtraSections];
    if (allSections.length > 0 && expandedSections.size === 0) {
      setExpandedSections(new Set(allSections));
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
                    {(() => {
                      const completedPercentage = items.reduce((sum, item) => {
                        return completedItems.has(item.id) ? sum + item.percentage : sum;
                      }, 0);
                      const totalPercentage = items.reduce((sum, item) => sum + item.percentage, 0);
                      return `(${completedPercentage.toFixed(2)}%-${totalPercentage.toFixed(2)}%)`;
                    })()}
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
            </div>
          );
        })}
      </div>

      {/* Seção Extras - região separada no final */}
      {extraItems.length > 0 && (
        <div className="mt-12 pt-8 border-t-2 border-gray-600 bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Extras</h2>
          <div className="space-y-6">
            {Object.entries(groupedExtras).map(([subcategory, items]) => {
              const extraSectionKey = `extras-${subcategory}`;
              const isExpanded = expandedSections.has(extraSectionKey);
              return (
                <div key={subcategory} className="border-b border-gray-600 pb-6 last:border-b-0">
                  <button
                    onClick={() => toggleSection(extraSectionKey)}
                    className="w-full flex items-center justify-between text-left mb-4 hover:opacity-80 transition-opacity"
                  >
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      {subcategory}
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
        </div>
      )}

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


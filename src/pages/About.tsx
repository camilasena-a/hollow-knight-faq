import React from 'react';
import { Users, Target, Heart, Award } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'GameMaster',
      role: 'Criador de Conteúdo',
      description: 'Especialista em tutoriais para iniciantes e estratégias básicas',
      avatar: 'GM'
    },
    {
      name: 'BossHunter',
      role: 'Especialista em Chefes',
      description: 'Mestre em derrotar todos os chefes de Hollow Knight',
      avatar: 'BH'
    },
    {
      name: 'BuildMaster',
      role: 'Especialista em Builds',
      description: 'Criador das melhores combinações de amuletos e estratégias',
      avatar: 'BM'
    },
    {
      name: 'ExplorerPro',
      role: 'Explorador',
      description: 'Descobridor de todos os segredos e áreas escondidas',
      avatar: 'EP'
    },
    {
      name: 'SpeedRunner',
      role: 'Speedrunner',
      description: 'Especialista em técnicas avançadas e otimização de rotas',
      avatar: 'SR'
    },
    {
      name: 'Collector',
      role: 'Colecionador',
      description: 'Encontrou todos os itens e colecionáveis do jogo',
      avatar: 'C'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Nossa Missão',
      description: 'Fornecer os melhores tutoriais e guias para ajudar jogadores de todos os níveis a dominar Hollow Knight.'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Construir uma comunidade forte e acolhedora onde jogadores podem compartilhar conhecimento e experiências.'
    },
    {
      icon: Heart,
      title: 'Paixão',
      description: 'Nossa paixão por Hollow Knight nos motiva a criar conteúdo de alta qualidade e sempre atualizado.'
    },
    {
      icon: Award,
      title: 'Qualidade',
      description: 'Cada tutorial é cuidadosamente criado e testado para garantir a melhor experiência de aprendizado.'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-hollow-darker to-hollow-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Sobre o
            <span className="text-hollow-gold block">Hollow Knight FAQ</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Somos uma comunidade apaixonada por Hollow Knight, dedicada a criar 
            os melhores tutoriais e guias para jogadores de todos os níveis.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Nossa História</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  O Hollow Knight FAQ nasceu da paixão de um grupo de jogadores que se apaixonaram 
                  pelo mundo misterioso e desafiador de Hallownest. Percebemos que muitos jogadores 
                  tinham dificuldades para progredir no jogo e decidimos criar um espaço onde 
                  conhecimento e experiência pudessem ser compartilhados.
                </p>
                <p>
                  Começamos como um pequeno grupo de amigos compartilhando dicas em fóruns, 
                  mas rapidamente crescemos para uma comunidade maior. Hoje, oferecemos 
                  tutoriais detalhados, guias de chefes, estratégias de builds e muito mais.
                </p>
                <p>
                  Nossa missão é tornar Hollow Knight acessível para todos, desde iniciantes 
                  que estão começando sua jornada até veteranos que buscam técnicas avançadas 
                  e speedruns otimizados.
                </p>
              </div>
            </div>
            <div className="bg-hollow-darker rounded-lg p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Mais de 2.5K jogadores ajudados
                </h3>
                <p className="text-gray-400">
                  Nossa comunidade cresce a cada dia com novos membros descobrindo 
                  os segredos de Hallownest através dos nossos tutoriais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-hollow-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Nossos Valores</h2>
            <p className="text-gray-400 text-lg">
              Os princípios que guiam tudo o que fazemos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="bg-hollow-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-hollow-dark" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Nossa Equipe</h2>
            <p className="text-gray-400 text-lg">
              Conheça os especialistas por trás dos nossos tutoriais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-hollow-darker rounded-lg p-6 text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-20 h-20 bg-hollow-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-hollow-dark font-bold text-2xl">{member.avatar}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-hollow-gold font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-hollow-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Junte-se à Nossa Comunidade
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-3xl mx-auto">
            Faça parte de uma comunidade apaixonada por Hollow Knight. Compartilhe suas 
            experiências, faça perguntas e ajude outros jogadores em sua jornada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-3"
            >
              <span>Discord</span>
            </a>
            <a
              href="#"
              className="btn-secondary inline-flex items-center space-x-2 text-lg px-8 py-3"
            >
              <span>Reddit</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

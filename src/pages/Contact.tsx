import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Envie-nos um email para suporte ou colaborações',
      contact: 'contato@hollowknightfaq.com',
      action: 'Enviar Email'
    },
    {
      icon: MessageSquare,
      title: 'Discord',
      description: 'Junte-se à nossa comunidade no Discord',
      contact: 'Hollow Knight FAQ',
      action: 'Entrar no Discord'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-hollow-darker to-hollow-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Entre em
            <span className="text-hollow-gold block">Contato</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tem alguma dúvida, sugestão ou quer colaborar conosco? 
            Adoraríamos ouvir de você!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-hollow-darker rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Envie uma Mensagem</h2>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Mensagem Enviada!
                </h3>
                <p className="text-gray-400">
                  Obrigado pelo seu contato. Responderemos em breve!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-field w-full"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-field w-full"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="input-field w-full resize-none"
                    placeholder="Conte-nos como podemos ajudar..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center space-x-2 py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-hollow-dark"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Outras Formas de Contato</h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="bg-hollow-dark rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-hollow-gold rounded-full p-3">
                          <Icon className="w-6 h-6 text-hollow-dark" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {method.title}
                          </h3>
                          <p className="text-gray-400 mb-3">
                            {method.description}
                          </p>
                          <p className="text-hollow-gold font-medium mb-4">
                            {method.contact}
                          </p>
                          <button className="btn-secondary text-sm px-4 py-2">
                            {method.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-hollow-darker rounded-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Perguntas Frequentes
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-hollow-gold font-medium mb-2">
                    Como posso contribuir com tutoriais?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Entre em contato conosco através do formulário ou Discord. 
                    Adoramos receber contribuições da comunidade!
                  </p>
                </div>
                
                <div>
                  <h4 className="text-hollow-gold font-medium mb-2">
                    Vocês aceitam sugestões de conteúdo?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Sim! Estamos sempre abertos a sugestões de novos tutoriais 
                    e melhorias no site.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-hollow-gold font-medium mb-2">
                    Com que frequência vocês atualizam o conteúdo?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Adicionamos novos tutoriais semanalmente e atualizamos 
                    o conteúdo existente conforme necessário.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;





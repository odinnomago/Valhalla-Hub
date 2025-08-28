'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const subjects = [
    { value: '', label: 'Selecione um assunto' },
    { value: 'artistas', label: '🎤 Para Artistas - Demos e Contratos' },
    { value: 'fas', label: '❤️ Para Fãs - Memberships e Eventos' },
    { value: 'parcerias', label: '🤝 Parcerias Comerciais' },
    { value: 'imprensa', label: '📰 Imprensa e Mídia' },
    { value: 'suporte', label: '⚙️ Suporte Técnico' },
    { value: 'outros', label: '💬 Outros Assuntos' }
  ];

  // Real-time validation
  const validateField = useCallback((field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
        return undefined;
      
      case 'email':
        if (!value.trim()) return 'Email é obrigatório';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Email inválido';
        return undefined;
      
      case 'subject':
        if (!value) return 'Selecione um assunto';
        return undefined;
      
      case 'message':
        if (!value.trim()) return 'Mensagem é obrigatória';
        if (value.trim().length < 10) return 'Mensagem deve ter pelo menos 10 caracteres';
        if (value.trim().length > 1000) return 'Mensagem muito longa (máximo 1000 caracteres)';
        return undefined;
      
      default:
        return undefined;
    }
  }, []);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  }, [validateField]);

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as (keyof FormData)[]).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    return isValid;
  }, [formData, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus({ type: 'error', message: 'Por favor, corrija os erros no formulário' });
      return;
    }

    setStatus({ type: 'loading' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would make the actual API call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Mensagem enviada com sucesso! Responderemos em até 24 horas.' 
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTouched({});
        setErrors({});
      } else {
        throw new Error('Erro no envio');
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Erro ao enviar mensagem. Tente novamente ou use outro canal de contato.' 
      });
    }
  };

  const getFieldError = (field: keyof FormData) => {
    return touched[field] && errors[field];
  };

  const isFieldValid = (field: keyof FormData) => {
    return touched[field] && !errors[field] && formData[field];
  };

  return (
    <section className="py-20 bg-background relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4">
            Ainda precisa de{' '}
            <span className="text-primary">ajuda</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Envie uma mensagem detalhada e nossa equipe responderá com a solução personalizada para você
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nome *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`w-full bg-card border text-foreground placeholder-muted-foreground px-4 py-3 rounded-xl focus:outline-none transition-all ${
                      getFieldError('name')
                        ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20'
                        : isFieldValid('name')
                        ? 'border-primary focus:border-primary focus:ring-2 focus:ring-primary/20'
                        : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="Seu nome completo"
                  />
                  {isFieldValid('name') && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary">
                      ✓
                    </div>
                  )}
                </div>
                <AnimatePresence>
                  {getFieldError('name') && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-destructive text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full bg-card border text-foreground placeholder-muted-foreground px-4 py-3 rounded-xl focus:outline-none transition-all ${
                      getFieldError('email')
                        ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20'
                        : isFieldValid('email')
                        ? 'border-primary focus:border-primary focus:ring-2 focus:ring-primary/20'
                        : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="seu@email.com"
                  />
                  {isFieldValid('email') && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary">
                      ✓
                    </div>
                  )}
                </div>
                <AnimatePresence>
                  {getFieldError('email') && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-destructive text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Subject */}
            <div className="relative">
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                Assunto *
              </label>
              <div className="relative">
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  onBlur={() => handleBlur('subject')}
                  className={`w-full bg-card border text-foreground px-4 py-3 rounded-xl focus:outline-none transition-all appearance-none cursor-pointer ${
                    getFieldError('subject')
                      ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20'
                      : isFieldValid('subject')
                      ? 'border-primary focus:border-primary focus:ring-2 focus:ring-primary/20'
                      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                >
                  {subjects.map((subject) => (
                    <option key={subject.value} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  {isFieldValid('subject') ? (
                    <span className="text-primary">✓</span>
                  ) : (
                    <span className="text-muted-foreground">⌄</span>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {getFieldError('subject') && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-destructive text-sm mt-1"
                  >
                    {errors.subject}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Message */}
            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Mensagem *
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={`w-full bg-card border text-foreground placeholder-muted-foreground px-4 py-3 rounded-xl focus:outline-none transition-all resize-none ${
                    getFieldError('message')
                      ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20'
                      : isFieldValid('message')
                      ? 'border-primary focus:border-primary focus:ring-2 focus:ring-primary/20'
                      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                  placeholder="Descreva detalhadamente sua necessidade, dúvida ou sugestão. Quanto mais informações, melhor poderemos ajudar!"
                />
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                  {formData.message.length}/1000
                </div>
              </div>
              <AnimatePresence>
                {getFieldError('message') && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-destructive text-sm mt-1"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                type="submit"
                disabled={status.type === 'loading'}
                whileHover={{ scale: status.type === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: status.type === 'loading' ? 1 : 0.98 }}
                className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 netflix-button ${
                  status.type === 'loading'
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : status.type === 'success'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl hover:shadow-primary/25'
                }`}
              >
                {status.type === 'loading' && (
                  <span className="inline-flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
                    Enviando mensagem...
                  </span>
                )}
                {status.type === 'success' && (
                  <span className="inline-flex items-center gap-2">
                    ✓ Mensagem enviada!
                  </span>
                )}
                {status.type === 'idle' && 'Enviar Mensagem'}
                {status.type === 'error' && 'Tentar Novamente'}
              </motion.button>

              {/* Status Message */}
              <AnimatePresence>
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-4 p-4 rounded-xl ${
                      status.type === 'success'
                        ? 'bg-primary/10 border border-primary/20 text-primary'
                        : 'bg-destructive/10 border border-destructive/20 text-destructive'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Note */}
              <p className="text-sm text-muted-foreground mt-4 text-center">
                📱 <strong>Resposta garantida:</strong> Nossa equipe responde todas as mensagens em até 24 horas úteis
              </p>
            </div>
          </form>
        </motion.div>

        {/* Alternative Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Ou se preferir:</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contato@valhallahub.com.br"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              📧 contato@valhallahub.com.br
            </a>
            <div className="hidden sm:block w-1 h-1 bg-border rounded-full"></div>
            <a
              href="tel:+5511999999999"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              📞 +55 11 99999-9999
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
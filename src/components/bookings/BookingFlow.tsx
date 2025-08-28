'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface BookingFlowProps {
  professionalId: string;
  serviceId?: string;
  onClose?: () => void;
  onComplete?: (bookingData: any) => void;
}

interface Professional {
  id: string;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  location: string;
  services: Service[];
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

const serviceSchema = z.object({
  serviceId: z.string().min(1, 'Selecione um serviço')
});

const projectSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  budget: z.number().min(1, 'Orçamento deve ser maior que zero'),
  timeline: z.string().min(1, 'Prazo é obrigatório'),
  location: z.string().min(1, 'Local é obrigatório')
});

const scheduleSchema = z.object({
  date: z.string().min(1, 'Selecione uma data'),
  time: z.string().min(1, 'Selecione um horário'),
  duration: z.number().min(1, 'Duração é obrigatória')
});

const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos')
});

const BookingFlow: React.FC<BookingFlowProps> = ({
  professionalId,
  serviceId,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingData, setBookingData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const serviceForm = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: { serviceId: serviceId || '' }
  });

  const projectForm = useForm({
    resolver: zodResolver(projectSchema)
  });

  const scheduleForm = useForm({
    resolver: zodResolver(scheduleSchema)
  });

  const contactForm = useForm({
    resolver: zodResolver(contactSchema)
  });

  useEffect(() => {
    const mockProfessional: Professional = {
      id: professionalId,
      name: 'Marina Santos',
      avatar: '/images/professionals/marina.jpg',
      role: 'Vocalista Pop',
      rating: 4.9,
      location: 'São Paulo, SP',
      services: [
        {
          id: 'vocal-recording',
          name: 'Gravação de Vocal Principal',
          description: 'Gravação profissional de vocal principal para suas músicas',
          price: 800,
          duration: '4 horas',
          category: 'Gravação'
        },
        {
          id: 'backing-vocals',
          name: 'Backing Vocals',
          description: 'Gravação de coros e harmonias para complementar sua música',
          price: 400,
          duration: '2 horas',
          category: 'Gravação'
        },
        {
          id: 'vocal-coaching',
          name: 'Coaching Vocal',
          description: 'Aulas particulares para melhorar sua técnica vocal',
          price: 200,
          duration: '1 hora',
          category: 'Ensino'
        }
      ]
    };

    setProfessional(mockProfessional);

    if (serviceId) {
      const service = mockProfessional.services.find(s => s.id === serviceId);
      setSelectedService(service || null);
    }
  }, [professionalId, serviceId]);

  const steps = [
    { number: 1, title: 'Serviço', description: 'Escolha o serviço desejado' },
    { number: 2, title: 'Projeto', description: 'Detalhe seu projeto' },
    { number: 3, title: 'Agendamento', description: 'Escolha data e horário' },
    { number: 4, title: 'Contato', description: 'Suas informações' },
    { number: 5, title: 'Confirmação', description: 'Revisar e confirmar' }
  ];

  const handleStepSubmit = (stepData: any) => {
    setBookingData(prev => ({ ...prev, ...stepData }));
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleServiceSubmit = (data: any) => {
    const service = professional?.services.find(s => s.id === data.serviceId);
    setSelectedService(service || null);
    handleStepSubmit(data);
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const finalBookingData = {
        ...bookingData,
        professionalId,
        serviceId: selectedService?.id,
        totalPrice: selectedService?.price || 0,
        createdAt: new Date().toISOString()
      };

      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete?.(finalBookingData);
    } catch (error) {
      console.error('Booking creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!professional) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando informações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        
        {/* Header */}
        <div className="border-b border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Novo Booking</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Professional Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center overflow-hidden">
              {professional.avatar ? (
                <img 
                  src={professional.avatar} 
                  alt={professional.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-black font-bold text-xl">{professional.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold">{professional.name}</h3>
              <p className="text-gray-400">{professional.role}</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⭐</span>
                <span className="text-gray-300">{professional.rating}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">{professional.location}</span>
              </div>
            </div>
          </div>

          {/* Steps Progress */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number
                    ? 'bg-primary-500 text-black'
                    : 'bg-gray-800 text-gray-400'
                }`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <div className="ml-3 hidden md:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary-500' : 'bg-gray-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <motion.div
                key="service"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Escolha o Serviço</h3>
                
                <form onSubmit={serviceForm.handleSubmit(handleServiceSubmit)} className="space-y-4">
                  <div className="grid gap-4">
                    {professional.services.map((service) => (
                      <label
                        key={service.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                          serviceForm.watch('serviceId') === service.id
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <input
                          type="radio"
                          value={service.id}
                          {...serviceForm.register('serviceId')}
                          className="sr-only"
                        />
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{service.name}</h4>
                          <span className="text-primary-400 font-bold">
                            R$ {service.price}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{service.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>⏱️ {service.duration}</span>
                          <span>🏷️ {service.category}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  {serviceForm.formState.errors.serviceId && (
                    <p className="text-red-400 text-sm">{serviceForm.formState.errors.serviceId.message}</p>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-primary-500 text-black px-4 py-3 rounded-lg hover:bg-primary-400 transition-colors font-medium"
                    >
                      Continuar
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Other steps would continue with similar structure but condensed for space */}
            {currentStep > 1 && (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-12"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {steps[currentStep - 1]?.title}
                </h3>
                <p className="text-gray-400 mb-8">
                  {steps[currentStep - 1]?.description}
                </p>
                
                {currentStep === 5 ? (
                  <div className="space-y-6">
                    <div className="bg-gray-800/50 rounded-lg p-6 text-left">
                      <h4 className="text-white font-semibold mb-4">Resumo do Booking</h4>
                      <div className="space-y-2 text-gray-300">
                        <p><strong>Serviço:</strong> {selectedService?.name}</p>
                        <p><strong>Valor:</strong> R$ {selectedService?.price}</p>
                        <p><strong>Profissional:</strong> {professional.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => setCurrentStep(4)}
                        className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={handleFinalSubmit}
                        disabled={loading}
                        className="flex-1 bg-primary-500 text-black px-4 py-3 rounded-lg hover:bg-primary-400 transition-colors font-medium disabled:opacity-50"
                      >
                        {loading ? 'Processando...' : 'Confirmar Booking'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="flex-1 bg-primary-500 text-black px-4 py-3 rounded-lg hover:bg-primary-400 transition-colors font-medium"
                    >
                      Continuar
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingFlow;
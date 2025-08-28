'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BookingCalendarProps {
  professionalId: string;
  selectedService?: string;
  onClose: () => void;
}

interface TimeSlot {
  time: string;
  available: boolean;
  price?: number;
}

interface AvailabilityData {
  [date: string]: TimeSlot[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  professionalId,
  selectedService,
  onClose
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availability, setAvailability] = useState<AvailabilityData>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'date' | 'time' | 'details' | 'payment'>('date');
  const [bookingDetails, setBookingDetails] = useState({
    projectName: '',
    description: '',
    requirements: '',
    budget: '',
    clientInfo: {
      name: '',
      email: '',
      phone: ''
    }
  });

  // Mock availability data
  useEffect(() => {
    const mockAvailability: AvailabilityData = {};
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate random availability
      const timeSlots: TimeSlot[] = [
        { time: '09:00', available: Math.random() > 0.3, price: 500 },
        { time: '10:00', available: Math.random() > 0.4, price: 500 },
        { time: '11:00', available: Math.random() > 0.3, price: 500 },
        { time: '14:00', available: Math.random() > 0.2, price: 600 },
        { time: '15:00', available: Math.random() > 0.3, price: 600 },
        { time: '16:00', available: Math.random() > 0.4, price: 600 },
        { time: '19:00', available: Math.random() > 0.5, price: 800 },
        { time: '20:00', available: Math.random() > 0.6, price: 800 },
      ];
      
      mockAvailability[dateStr] = timeSlots;
    }
    
    setAvailability(mockAvailability);
  }, [professionalId]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateAvailable = (dateStr: string) => {
    const dayAvailability = availability[dateStr];
    return dayAvailability && dayAvailability.some(slot => slot.available);
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateStr = date.toISOString().split('T')[0];
    
    if (isDateAvailable(dateStr)) {
      setSelectedDate(dateStr);
      setStep('time');
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('details');
  };

  const handleBookingSubmit = async () => {
    setLoading(true);
    
    try {
      // In a real implementation, this would submit to your booking API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay
      
      // Show success and close
      alert('Booking solicitado com sucesso! Você receberá uma confirmação em breve.');
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      alert('Erro ao solicitar booking. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const today = new Date();
    const days = [];

    // Empty cells for days before the month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateStr = date.toISOString().split('T')[0];
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today;
      const isAvailable = isDateAvailable(dateStr);
      const isSelected = selectedDate === dateStr;

      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateSelect(day)}
          disabled={isPast || !isAvailable}
          className={`h-12 rounded-lg text-sm font-medium transition-all ${
            isSelected
              ? 'bg-primary-500 text-black'
              : isPast
              ? 'text-gray-600 cursor-not-allowed'
              : isAvailable
              ? 'text-white hover:bg-gray-700 border border-gray-700'
              : 'text-gray-500 cursor-not-allowed'
          } ${isToday ? 'ring-2 ring-primary-400' : ''}`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6">
        {[
          { id: 'date', label: 'Data', icon: '📅' },
          { id: 'time', label: 'Horário', icon: '⏰' },
          { id: 'details', label: 'Detalhes', icon: '📝' },
          { id: 'payment', label: 'Pagamento', icon: '💳' }
        ].map((stepItem, index) => (
          <div key={stepItem.id} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              step === stepItem.id
                ? 'bg-primary-500 text-black'
                : index < ['date', 'time', 'details', 'payment'].indexOf(step)
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}>
              {stepItem.icon}
            </div>
            <span className={`ml-2 text-sm ${
              step === stepItem.id ? 'text-white font-medium' : 'text-gray-400'
            }`}>
              {stepItem.label}
            </span>
            {index < 3 && <div className="w-8 h-px bg-gray-700 mx-4"></div>}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 'date' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-white mb-4">Escolha a Data</h3>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Anterior
            </button>
            <h4 className="text-lg font-bold text-white">
              {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </h4>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Próximo →
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="h-12 flex items-center justify-center text-gray-400 text-sm font-medium">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary-500 rounded"></div>
              <span className="text-gray-300">Disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-700 border border-gray-600 rounded"></div>
              <span className="text-gray-300">Indisponível</span>
            </div>
          </div>
        </motion.div>
      )}

      {step === 'time' && selectedDate && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setStep('date')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Voltar
            </button>
            <h3 className="text-xl font-bold text-white">
              Escolha o Horário - {new Date(selectedDate).toLocaleDateString('pt-BR')}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availability[selectedDate]?.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && handleTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`p-4 rounded-xl text-sm font-medium transition-all ${
                  selectedTime === slot.time
                    ? 'bg-primary-500 text-black'
                    : slot.available
                    ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                    : 'bg-gray-900 text-gray-500 cursor-not-allowed border border-gray-800'
                }`}
              >
                <div className="font-bold">{slot.time}</div>
                {slot.available && slot.price && (
                  <div className="text-xs mt-1">R$ {slot.price}</div>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {step === 'details' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setStep('time')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Voltar
            </button>
            <h3 className="text-xl font-bold text-white">Detalhes do Projeto</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Nome do Projeto</label>
              <input
                type="text"
                value={bookingDetails.projectName}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, projectName: e.target.value }))}
                placeholder="Ex: Gravação de single pop"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Descrição</label>
              <textarea
                value={bookingDetails.description}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva seu projeto..."
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Requisitos Especiais</label>
              <textarea
                value={bookingDetails.requirements}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, requirements: e.target.value }))}
                placeholder="Algum requisito específico?"
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Orçamento Esperado</label>
              <input
                type="text"
                value={bookingDetails.budget}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, budget: e.target.value }))}
                placeholder="Ex: R$ 800 - R$ 1200"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500"
              />
            </div>

            {/* Client Info */}
            <div className="border-t border-gray-800 pt-6">
              <h4 className="text-lg font-bold text-white mb-4">Suas Informações</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    value={bookingDetails.clientInfo.name}
                    onChange={(e) => setBookingDetails(prev => ({ 
                      ...prev, 
                      clientInfo: { ...prev.clientInfo, name: e.target.value }
                    }))}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={bookingDetails.clientInfo.email}
                    onChange={(e) => setBookingDetails(prev => ({ 
                      ...prev, 
                      clientInfo: { ...prev.clientInfo, email: e.target.value }
                    }))}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-white font-medium mb-2">Telefone</label>
                <input
                  type="tel"
                  value={bookingDetails.clientInfo.phone}
                  onChange={(e) => setBookingDetails(prev => ({ 
                    ...prev, 
                    clientInfo: { ...prev.clientInfo, phone: e.target.value }
                  }))}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleBookingSubmit}
            disabled={loading || !bookingDetails.projectName || !bookingDetails.clientInfo.name || !bookingDetails.clientInfo.email}
            className="w-full bg-primary-500 text-black py-3 rounded-xl font-bold hover:bg-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando Solicitação...' : 'Solicitar Booking'}
          </button>
        </motion.div>
      )}

      {/* Summary */}
      {(step === 'time' || step === 'details') && selectedDate && selectedTime && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mt-6">
          <h4 className="text-white font-semibold mb-2">Resumo</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Data:</span>
              <span className="text-white">{new Date(selectedDate).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Horário:</span>
              <span className="text-white">{selectedTime}</span>
            </div>
            {selectedService && (
              <div className="flex justify-between">
                <span className="text-gray-400">Serviço:</span>
                <span className="text-white">{selectedService}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
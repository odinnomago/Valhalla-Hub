'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StatusUpdateProps {
  bookingId: string;
  currentStatus: string;
  userRole: 'client' | 'professional';
  onStatusUpdate?: (newStatus: string) => void;
}

interface StatusOption {
  value: string;
  label: string;
  description: string;
  color: string;
  icon: string;
  requiresMessage?: boolean;
}

const BookingStatusManager: React.FC<StatusUpdateProps> = ({
  bookingId,
  currentStatus,
  userRole,
  onStatusUpdate
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [message, setMessage] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');

  const statusOptions: Record<string, StatusOption[]> = {
    pending: [
      {
        value: 'accepted',
        label: 'Aceitar Booking',
        description: 'Aceitar a solicitação de booking',
        color: 'bg-primary',
        icon: '✅'
      },
      {
        value: 'cancelled',
        label: 'Recusar Booking',
        description: 'Recusar a solicitação',
        color: 'bg-destructive',
        icon: '❌',
        requiresMessage: true
      }
    ],
    accepted: [
      {
        value: 'confirmed',
        label: 'Confirmar Pagamento',
        description: 'Confirmar que o pagamento foi realizado',
        color: 'bg-accent',
        icon: '💳'
      },
      {
        value: 'cancelled',
        label: 'Cancelar',
        description: 'Cancelar o booking',
        color: 'bg-destructive',
        icon: '❌',
        requiresMessage: true
      }
    ],
    confirmed: [
      {
        value: 'in-progress',
        label: 'Iniciar Projeto',
        description: 'Marcar projeto como em andamento',
        color: 'bg-primary',
        icon: '🚀'
      },
      {
        value: 'cancelled',
        label: 'Cancelar',
        description: 'Cancelar o booking',
        color: 'bg-destructive',
        icon: '❌',
        requiresMessage: true
      }
    ],
    'in-progress': [
      {
        value: 'completed',
        label: 'Marcar como Concluído',
        description: 'Finalizar o projeto',
        color: 'bg-primary',
        icon: '🎉'
      },
      {
        value: 'disputed',
        label: 'Abrir Disputa',
        description: 'Reportar problema com o projeto',
        color: 'bg-accent',
        icon: '⚠️',
        requiresMessage: true
      }
    ]
  };

  const getStatusDisplay = (status: string) => {
    const statusMap: Record<string, { label: string; color: string; icon: string }> = {
      pending: { label: 'Pendente', color: 'text-accent bg-accent/10', icon: '⏳' },
      accepted: { label: 'Aceito', color: 'text-primary bg-primary/10', icon: '✅' },
      confirmed: { label: 'Confirmado', color: 'text-primary bg-primary/10', icon: '💳' },
      'in-progress': { label: 'Em Andamento', color: 'text-primary bg-primary/10', icon: '🚀' },
      completed: { label: 'Concluído', color: 'text-primary bg-primary/10', icon: '🎉' },
      cancelled: { label: 'Cancelado', color: 'text-destructive bg-destructive/10', icon: '❌' },
      disputed: { label: 'Em Disputa', color: 'text-accent bg-accent/10', icon: '⚠️' }
    };

    return statusMap[status] || { label: status, color: 'text-muted-foreground bg-muted/10', icon: '❓' };
  };

  const handleStatusChange = async (newStatus: string, messageText?: string, reason?: string) => {
    setIsUpdating(true);

    try {
      const response = await fetch('/api/bookings/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          status: newStatus,
          userId: 'current_user_id', // This would come from auth context
          userRole,
          message: messageText,
          cancellationReason: reason
        })
      });

      const result = await response.json();

      if (result.success) {
        onStatusUpdate?.(newStatus);
        setShowConfirmation(false);
        setMessage('');
        setCancellationReason('');
      } else {
        console.error('Failed to update status:', result.error);
      }
    } catch (error) {
      console.error('Status update error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const currentStatusDisplay = getStatusDisplay(currentStatus);
  const availableOptions = statusOptions[currentStatus] || [];

  // Filter options based on user role
  const filteredOptions = availableOptions.filter(option => {
    if (userRole === 'client') {
      return ['confirmed', 'cancelled', 'disputed'].includes(option.value);
    } else if (userRole === 'professional') {
      return ['accepted', 'in-progress', 'completed', 'cancelled'].includes(option.value);
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Current Status */}
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm">Status atual:</span>
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${currentStatusDisplay.color}`}>
          <span>{currentStatusDisplay.icon}</span>
          <span>{currentStatusDisplay.label}</span>
        </span>
      </div>

      {/* Status Update Options */}
      {filteredOptions.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-white font-medium">Ações Disponíveis:</h4>
          
          <div className="grid gap-3">
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSelectedStatus(option.value);
                  if (option.requiresMessage) {
                    setShowConfirmation(true);
                  } else {
                    handleStatusChange(option.value);
                  }
                }}
                disabled={isUpdating}
                className="flex items-center gap-3 p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:bg-gray-700/30 hover:border-gray-600 transition-all text-left disabled:opacity-50"
              >
                <div className={`w-10 h-10 ${option.color} rounded-lg flex items-center justify-center text-white`}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h5 className="text-white font-medium">{option.label}</h5>
                  <p className="text-gray-400 text-sm">{option.description}</p>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Confirmar Ação
              </h3>

              <div className="mb-6">
                <p className="text-gray-300 mb-4">
                  Tem certeza que deseja{' '}
                  <span className="text-primary-400">
                    {filteredOptions.find(opt => opt.value === selectedStatus)?.label.toLowerCase()}
                  </span>
                  ?
                </p>

                {selectedStatus === 'cancelled' && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">
                      Motivo do cancelamento:
                    </label>
                    <select
                      value={cancellationReason}
                      onChange={(e) => setCancellationReason(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                    >
                      <option value="">Selecione um motivo</option>
                      <option value="schedule_conflict">Conflito de agenda</option>
                      <option value="technical_issues">Problemas técnicos</option>
                      <option value="payment_issues">Problemas de pagamento</option>
                      <option value="client_request">Solicitação do cliente</option>
                      <option value="other">Outro</option>
                    </select>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">
                    Mensagem adicional:
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Adicione uma mensagem explicando a ação..."
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 h-20 resize-none focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleStatusChange(selectedStatus, message, cancellationReason)}
                  disabled={isUpdating}
                  className="flex-1 bg-primary-500 text-black px-4 py-2 rounded-lg hover:bg-primary-400 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? 'Atualizando...' : 'Confirmar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status History Timeline */}
      <div className="mt-8">
        <h4 className="text-white font-medium mb-4">Histórico de Status</h4>
        <div className="space-y-3">
          {/* Mock status history */}
          {[
            { status: 'pending', date: '20/01/2024 10:30', user: 'Cliente', message: 'Solicitação de booking criada' },
            { status: 'accepted', date: '20/01/2024 11:45', user: 'Profissional', message: 'Booking aceito' },
            { status: 'confirmed', date: '20/01/2024 12:15', user: 'Cliente', message: 'Pagamento confirmado' }
          ].map((entry, index) => {
            const statusDisplay = getStatusDisplay(entry.status);
            return (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/20 rounded-lg">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${statusDisplay.color}`}>
                  {statusDisplay.icon}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{statusDisplay.label}</span>
                    <span className="text-gray-400 text-sm">• {entry.user}</span>
                    <span className="text-gray-500 text-xs">{entry.date}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{entry.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookingStatusManager;
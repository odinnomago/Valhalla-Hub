'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  MapPin,
  Music,
  Clock,
  User,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BookingCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Festival Verão',
      date: new Date(2024, 7, 15, 20, 0),
      endDate: new Date(2024, 7, 15, 23, 0),
      location: 'Parque dos Artistas, São Paulo',
      status: 'confirmed',
      attendees: 5000
    },
    {
      id: 2,
      title: 'Show Acústico',
      date: new Date(2024, 6, 22, 21, 0),
      endDate: new Date(2024, 6, 22, 23, 0),
      location: 'Clube da Esquina, Rio de Janeiro',
      status: 'confirmed',
      attendees: 300
    },
    {
      id: 3,
      title: 'Festa Universitária',
      date: new Date(2024, 8, 5, 22, 0),
      endDate: new Date(2024, 8, 6, 2, 0),
      location: 'Universidade Federal, Belo Horizonte',
      status: 'pending',
      attendees: 800
    },
    {
      id: 4,
      title: 'Evento Corporativo',
      date: new Date(2024, 7, 10, 19, 0),
      endDate: new Date(2024, 7, 10, 22, 0),
      location: 'Hotel Executivo, Curitiba',
      status: 'confirmed',
      attendees: 200
    }
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const selectDate = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const days = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  // Add cells for each day of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Calendário de Eventos</h1>
          <p className="text-muted-foreground">Visualize e gerencie seus compromissos de booking</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Evento
          </Button>
          <Button variant="outline" size="sm">
            Importar
          </Button>
        </div>
      </div>

      {/* View Controls */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={view === 'month' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setView('month')}
        >
          Mês
        </Button>
        <Button 
          variant={view === 'week' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setView('week')}
        >
          Semana
        </Button>
        <Button 
          variant={view === 'day' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setView('day')}
        >
          Dia
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-card border border-border/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Hoje
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const isToday = day === new Date().getDate() && 
                              currentDate.getMonth() === new Date().getMonth() && 
                              currentDate.getFullYear() === new Date().getFullYear();
              
              const isSelected = day === selectedDate.getDate() && 
                                currentDate.getMonth() === selectedDate.getMonth() && 
                                currentDate.getFullYear() === selectedDate.getFullYear();
              
              const dayEvents = day ? getEventsForDate(new Date(year, month, day)) : [];
              
              return (
                <div 
                  key={index} 
                  className={`min-h-24 border border-border/30 rounded-lg p-2 ${
                    isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
                  }`}
                >
                  {day && (
                    <>
                      <button
                        className={`w-7 h-7 rounded-full text-sm flex items-center justify-center ${
                          isToday ? 'bg-primary text-primary-foreground' : ''
                        } ${isSelected ? 'bg-primary text-primary-foreground' : ''}`}
                        onClick={() => selectDate(day)}
                      >
                        {day}
                      </button>
                      <div className="mt-1 space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div 
                            key={event.id} 
                            className={`text-xs p-1 rounded truncate ${getStatusColor(event.status)}`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayEvents.length - 2} mais
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Events */}
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            {formatDate(selectedDate)}
          </h2>
          
          {selectedDateEvents.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum evento para esta data</p>
              <Button variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Evento
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateEvents.map((event) => (
                <div key={event.id} className="border border-border/50 rounded-lg p-4 hover:bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{event.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                      {getStatusText(event.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(event.date)} - {formatTime(event.endDate)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <User className="h-4 w-4" />
                    <span>{event.attendees} participantes</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-3">
                    Ver Detalhes
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
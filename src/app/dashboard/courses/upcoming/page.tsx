'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  Bell,
  CheckCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UpcomingClassesPage() {
  // This will be replaced with real data from user context/hooks
  const [upcomingClasses] = useState<any[]>([]);
  
  // This will be replaced with real data from user context/hooks
  const [notifications] = useState({
    email: true,
    push: true
  });

  const handleJoinClass = (id: number) => {
    // This will be replaced with actual class join functionality
    console.log('Joining class:', id);
  };

  const handleSetReminder = (id: number) => {
    // This will be replaced with actual reminder functionality
    console.log('Setting reminder for class:', id);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Próximas Aulas</h1>
          <p className="text-muted-foreground">Acompanhe suas aulas agendadas</p>
        </div>
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Lembretes:</span>
          <Button 
            variant={notifications.email ? "default" : "outline"} 
            size="sm"
          >
            E-mail
          </Button>
          <Button 
            variant={notifications.push ? "default" : "outline"} 
            size="sm"
          >
            Push
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Aulas Agendadas</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Aulas Hoje</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Participação</p>
              <p className="text-2xl font-bold mt-1">0%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Aulas Agendadas</h2>
        
        {upcomingClasses.length > 0 ? (
          <div className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{classItem.title || 'Aula sem título'}</h3>
                    <p className="text-muted-foreground">{classItem.course || 'Curso não especificado'}</p>
                    
                    <div className="mt-3 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {classItem.date || 'Data não especificada'}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {classItem.time || 'Horário não especificado'}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {classItem.instructor || 'Instrutor não especificado'}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => handleJoinClass(classItem.id)}>
                      Participar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSetReminder(classItem.id)}
                    >
                      <Bell className="h-4 w-4 mr-1" />
                      Lembrar-me
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border/50 rounded-xl p-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma aula agendada</h3>
            <p className="text-muted-foreground mb-4">
              Inscreva-se em cursos para agendar aulas
            </p>
            <Button>Explorar Cursos</Button>
          </div>
        )}
      </div>
    </div>
  );
}
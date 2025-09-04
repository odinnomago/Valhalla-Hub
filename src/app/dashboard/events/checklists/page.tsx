'use client';

import React, { useState } from 'react';
import { 
  FileBarChart, 
  Plus, 
  CheckSquare, 
  Square,
  Calendar,
  User,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function EventChecklistsPage() {
  // This will be replaced with real data from user context/hooks
  const [checklists] = useState<any[]>([]);
  const [newTask, setNewTask] = useState('');
  const [selectedChecklist, setSelectedChecklist] = useState<number | null>(null);

  const handleCreateChecklist = () => {
    // This will be replaced with actual checklist creation functionality
    console.log('Creating checklist');
  };

  const handleAddTask = () => {
    if (newTask.trim() && selectedChecklist !== null) {
      // This will be replaced with actual task addition functionality
      console.log('Adding task:', newTask);
      setNewTask('');
    }
  };

  const handleToggleTask = (checklistId: number, taskId: number) => {
    // This will be replaced with actual task toggle functionality
    console.log('Toggling task:', checklistId, taskId);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Checklists de Produção</h1>
          <p className="text-muted-foreground">Organize suas tarefas para eventos</p>
        </div>
        <Button onClick={handleCreateChecklist}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Checklist
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Checklists</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <FileBarChart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tarefas Concluídas</p>
              <p className="text-2xl font-bold mt-1">0%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <CheckSquare className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pendências</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Checklists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checklists List */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-border/50">
              <h2 className="text-xl font-semibold">Suas Checklists</h2>
            </div>
            <div className="divide-y divide-border/50">
              {checklists.length > 0 ? (
                checklists.map((checklist) => (
                  <div 
                    key={checklist.id} 
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedChecklist === checklist.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedChecklist(checklist.id)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{checklist.name || 'Checklist sem nome'}</h3>
                      <span className="text-sm text-muted-foreground">
                        {checklist.completedTasks || 0}/{checklist.totalTasks || 0}
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${checklist.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  Nenhuma checklist criada
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Checklist Details */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border/50 rounded-xl p-6">
            {selectedChecklist !== null ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Preparação do Evento</h2>
                    <p className="text-muted-foreground">Checklist para evento principal</p>
                  </div>
                  <Button variant="outline">Editar</Button>
                </div>
                
                <div className="space-y-3">
                  {[
                    { id: 1, text: 'Confirmar data e local do evento', completed: true },
                    { id: 2, text: 'Contratar equipe de segurança', completed: true },
                    { id: 3, text: 'Reservar equipamentos de som e iluminação', completed: false },
                    { id: 4, text: 'Enviar convites para convidados VIP', completed: false },
                    { id: 5, text: 'Preparar material de divulgação', completed: true },
                    { id: 6, text: 'Contratar fornecedores de catering', completed: false },
                    { id: 7, text: 'Montar equipe de apoio', completed: false },
                    { id: 8, text: 'Realizar testes de equipamentos', completed: false }
                  ].map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                      <Checkbox 
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => handleToggleTask(selectedChecklist, task.id)}
                      />
                      <label 
                        htmlFor={`task-${task.id}`}
                        className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {task.text}
                      </label>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        Você
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex gap-2">
                  <input
                    type="text"
                    placeholder="Adicionar nova tarefa..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1 bg-muted px-3 py-2 rounded-md text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                  />
                  <Button onClick={handleAddTask}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <FileBarChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma checklist selecionada</h3>
                <p className="text-muted-foreground mb-4">
                  Selecione uma checklist ao lado ou crie uma nova
                </p>
                <Button onClick={handleCreateChecklist}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Checklist
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
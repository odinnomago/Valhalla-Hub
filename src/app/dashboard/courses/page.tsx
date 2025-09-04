'use client';

import React, { useState } from 'react';
import { 
  School, 
  Play, 
  BookOpen, 
  Clock, 
  User, 
  Award, 
  TrendingUp, 
  CheckCircle,
  Search,
  Filter,
  Book
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CoursesPage() {
  // This will be replaced with real data from user context/hooks
  const [courses] = useState([]);
  
  // This will be replaced with real data from user context/hooks
  const [stats] = useState({
    enrolled: 0,
    completed: 0,
    hours: 0,
    certificates: 0
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-blue-100 text-blue-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Academy</h1>
          <p className="text-muted-foreground">Aprenda com os melhores da indústria musical</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Book className="h-4 w-4 mr-2" />
          Novo Curso
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cursos Inscritos</p>
              <p className="text-2xl font-bold mt-1">{stats.enrolled}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cursos Concluídos</p>
              <p className="text-2xl font-bold mt-1">{stats.completed}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Award className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Horas Estudadas</p>
              <p className="text-2xl font-bold mt-1">{stats.hours}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Certificados</p>
              <p className="text-2xl font-bold mt-1">{stats.certificates}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar cursos..."
            className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{course.title || 'Curso sem título'}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {course.instructor ? `por ${course.instructor}` : 'Instrutor não especificado'}
                    </p>
                  </div>
                  {course.completed ? (
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Concluído
                    </div>
                  ) : (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getLevelColor(course.level || 'Iniciante')}`}>
                      {course.level || 'Iniciante'}
                    </span>
                  )}
                </div>
                
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration || 'Duração não especificada'}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {course.lessons || 0} aulas
                  </div>
                </div>
                
                {!course.completed && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progresso</span>
                      <span>{course.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    {course.completed ? 'Rever Curso' : 'Continuar'}
                  </Button>
                  <Button size="sm" className="flex-1">
                    Detalhes
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <School className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum curso encontrado</h3>
            <p className="text-muted-foreground mb-4">Você ainda não se inscreveu em nenhum curso</p>
            <Button>
              <Book className="h-4 w-4 mr-2" />
              Explorar Cursos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
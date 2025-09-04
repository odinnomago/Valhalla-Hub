'use client';

import React, { useState } from 'react';
import { 
  Database, 
  FileText, 
  Download, 
  Play, 
  Image,
  Music,
  Film,
  BookOpen,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CourseResourcesPage() {
  // This will be replaced with real data from user context/hooks
  const [resources] = useState<any[]>([]);
  
  // This will be replaced with real data from user context/hooks
  const [searchTerm, setSearchTerm] = useState('');

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'video':
        return <Play className="h-5 w-5 text-blue-500" />;
      case 'audio':
        return <Music className="h-5 w-5 text-purple-500" />;
      case 'image':
        return <Image className="h-5 w-5 text-green-500" />;
      case 'document':
        return <BookOpen className="h-5 w-5 text-yellow-500" />;
      default:
        return <Database className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleDownloadResource = (id: number) => {
    // This will be replaced with actual resource download functionality
    console.log('Downloading resource:', id);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Biblioteca de Recursos</h1>
        <p className="text-muted-foreground">Acesse materiais complementares dos cursos</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar recursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
          <div className="bg-primary/10 p-2 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">PDFs</p>
          <p className="text-xl font-bold">0</p>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
          <div className="bg-primary/10 p-2 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <Play className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Vídeos</p>
          <p className="text-xl font-bold">0</p>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
          <div className="bg-primary/10 p-2 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <Music className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Áudios</p>
          <p className="text-xl font-bold">0</p>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
          <div className="bg-primary/10 p-2 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <Image className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Imagens</p>
          <p className="text-xl font-bold">0</p>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
          <div className="bg-primary/10 p-2 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <Database className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-xl font-bold">0</p>
        </div>
      </div>

      {/* Resources List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recursos Disponíveis</h2>
        
        {resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex gap-3">
                  <div className="bg-muted p-2 rounded-lg">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{resource.title || 'Recurso sem título'}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {resource.description || 'Nenhuma descrição disponível'}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <BookOpen className="h-3 w-3" />
                        {resource.course || 'Curso não especificado'}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDownloadResource(resource.id)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border/50 rounded-xl p-12 text-center">
            <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum recurso disponível</h3>
            <p className="text-muted-foreground mb-4">
              Recursos complementares aparecerão aqui conforme você avança nos cursos
            </p>
            <Button>Explorar Cursos</Button>
          </div>
        )}
      </div>
    </div>
  );
}
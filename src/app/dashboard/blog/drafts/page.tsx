'use client';

import React, { useState } from 'react';
import { 
  FileBarChart, 
  FileText, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogDraftsPage() {
  // This will be replaced with real data from user context/hooks
  const [drafts] = useState<any[]>([]);

  const handleEditDraft = (id: number) => {
    // This will be replaced with actual draft edit functionality
    console.log('Editing draft:', id);
  };

  const handleDeleteDraft = (id: number) => {
    // This will be replaced with actual draft deletion functionality
    console.log('Deleting draft:', id);
  };

  const handlePreviewDraft = (id: number) => {
    // This will be replaced with actual draft preview functionality
    console.log('Previewing draft:', id);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Rascunhos</h1>
          <p className="text-muted-foreground">Gerencie seus posts não publicados</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Novo Rascunho
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Rascunhos</p>
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
              <p className="text-sm text-muted-foreground">Último Rascunho</p>
              <p className="text-2xl font-bold mt-1">N/A</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Média de Palavras</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Edit className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Drafts List */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Seus Rascunhos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Título</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Última Modificação</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Palavras</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {drafts.length > 0 ? (
                drafts.map((draft) => (
                  <tr key={draft.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium max-w-xs">
                      {draft.title || 'Rascunho sem título'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {draft.lastModified || 'Data não especificada'}
                      </div>
                    </td>
                    <td className="p-4">{draft.wordCount || 0}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handlePreviewDraft(draft.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Pré-visualizar
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleEditDraft(draft.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeleteDraft(draft.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    Nenhum rascunho encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
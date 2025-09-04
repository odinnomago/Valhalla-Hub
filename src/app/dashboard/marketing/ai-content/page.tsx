'use client';

import React, { useState } from 'react';
import { 
  Wand2, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Play, 
  Pause, 
  Download,
  Copy,
  Share2,
  Heart,
  MessageCircle,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function AIContentPage() {
  // This will be replaced with real data from user context/hooks
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [prompt, setPrompt] = useState('');

  const handleGenerateContent = () => {
    // This will be replaced with actual AI content generation
    console.log('Generating content with prompt:', prompt);
  };

  const handleSaveContent = (id: number) => {
    // This will be replaced with actual save functionality
    console.log('Saving content:', id);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Conteúdo Gerado por IA</h1>
        <p className="text-muted-foreground">Crie conteúdo automaticamente para suas campanhas de marketing</p>
      </div>

      {/* Content Generator */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Gerador de Conteúdo</h2>
        <div className="space-y-4">
          <Textarea
            placeholder="Descreva o tipo de conteúdo que você deseja gerar... (ex: post para Instagram sobre novo lançamento)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px]"
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleGenerateContent}>
              <Wand2 className="h-4 w-4 mr-2" />
              Gerar Conteúdo
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Post de Texto
            </Button>
            <Button variant="outline">
              <Image className="h-4 w-4 mr-2" />
              Imagem
            </Button>
            <Button variant="outline">
              <Video className="h-4 w-4 mr-2" />
              Vídeo
            </Button>
          </div>
        </div>
      </div>

      {/* Generated Content */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Conteúdo Gerado</h2>
        
        {generatedContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generatedContent.map((content) => (
              <div key={content.id} className="bg-card border border-border/50 rounded-xl overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold">{content.title || 'Conteúdo sem título'}</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {content.type === 'text' && (
                    <div className="mb-4">
                      <p className="text-muted-foreground">{content.content}</p>
                    </div>
                  )}
                  
                  {content.type === 'image' && (
                    <div className="mb-4">
                      <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {content.likes || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {content.comments || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {content.views || 0}
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleSaveContent(content.id)}>
                      Salvar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border/50 rounded-xl p-12 text-center">
            <Wand2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum conteúdo gerado</h3>
            <p className="text-muted-foreground mb-4">
              Use o gerador acima para criar conteúdo automaticamente para suas campanhas
            </p>
            <Button onClick={handleGenerateContent}>
              <Wand2 className="h-4 w-4 mr-2" />
              Gerar Primeiro Conteúdo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
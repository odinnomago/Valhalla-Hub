'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Award,
  Eye,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CourseCertificatesPage() {
  // This will be replaced with real data from user context/hooks
  const [certificates] = useState<any[]>([]);

  const handleDownloadCertificate = (id: number) => {
    // This will be replaced with actual certificate download functionality
    console.log('Downloading certificate:', id);
  };

  const handleViewCertificate = (id: number) => {
    // This will be replaced with actual certificate view functionality
    console.log('Viewing certificate:', id);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Certificados</h1>
        <p className="text-muted-foreground">Acesse e compartilhe seus certificados de conclusão</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Certificados</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Award className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Horas Certificadas</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Último Certificado</p>
              <p className="text-2xl font-bold mt-1">N/A</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Certificates List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Seus Certificados</h2>
        
        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((certificate) => (
              <div key={certificate.id} className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-r from-primary to-accent h-32 flex items-center justify-center">
                  <Award className="h-16 w-16 text-primary-foreground opacity-80" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{certificate.title || 'Certificado sem título'}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {certificate.course || 'Curso não especificado'}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Emitido em: {certificate.issueDate || 'Data não especificada'}
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleViewCertificate(certificate.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Visualizar
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleDownloadCertificate(certificate.id)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Baixar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border/50 rounded-xl p-12 text-center">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum certificado disponível</h3>
            <p className="text-muted-foreground mb-4">
              Conclua cursos para receber certificados
            </p>
            <Button>Explorar Cursos</Button>
          </div>
        )}
      </div>
    </div>
  );
}
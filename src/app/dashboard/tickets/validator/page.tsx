'use client';

import React, { useState } from 'react';
import { 
  QrCode, 
  CheckCircle, 
  XCircle, 
  Smartphone,
  Camera,
  Upload,
  Scan
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TicketValidatorPage() {
  // This will be replaced with real data from user context/hooks
  const [validationResult, setValidationResult] = useState<{
    status: 'idle' | 'valid' | 'invalid' | 'error';
    message: string;
    ticketInfo?: any;
  }>({ status: 'idle', message: '' });

  const handleScanQR = () => {
    // This will be replaced with actual QR scanning functionality
    console.log('Scanning QR code');
  };

  const handleManualEntry = (ticketId: string) => {
    // This will be replaced with actual manual entry validation
    console.log('Validating ticket ID:', ticketId);
  };

  const handleUploadQR = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This will be replaced with actual QR upload functionality
    console.log('Uploading QR code image');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Validador de Ingressos</h1>
        <p className="text-muted-foreground">Verifique a autenticidade dos ingressos</p>
      </div>

      {/* Validation Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
            <Camera className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Escanear QR Code</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use a câmera do seu dispositivo para escanear o código
          </p>
          <Button onClick={handleScanQR} className="w-full">
            <Scan className="h-4 w-4 mr-2" />
            Escanear
          </Button>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
            <Smartphone className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Entrada Manual</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Digite o código do ingresso manualmente
          </p>
          <Button variant="outline" className="w-full">
            Inserir Código
          </Button>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Upload de Imagem</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Faça upload de uma imagem do QR code
          </p>
          <label className="w-full">
            <Button variant="outline" className="w-full" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Selecionar Imagem
              </span>
            </Button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadQR}
            />
          </label>
        </div>
      </div>

      {/* Validation Result */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Resultado da Validação</h2>
        
        {validationResult.status === 'idle' && (
          <div className="text-center py-8">
            <QrCode className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Escaneie um QR code ou insira um código para validar um ingresso
            </p>
          </div>
        )}
        
        {validationResult.status === 'valid' && (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-600 mb-2">Ingresso Válido</h3>
            <p className="text-muted-foreground mb-4">
              {validationResult.message}
            </p>
            {validationResult.ticketInfo && (
              <div className="bg-muted rounded-lg p-4 text-left max-w-md mx-auto">
                <h4 className="font-medium mb-2">Informações do Ingresso</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Evento:</span> {validationResult.ticketInfo.event}</p>
                  <p><span className="font-medium">Tipo:</span> {validationResult.ticketInfo.type}</p>
                  <p><span className="font-medium">Data:</span> {validationResult.ticketInfo.date}</p>
                  <p><span className="font-medium">Portador:</span> {validationResult.ticketInfo.holder}</p>
                </div>
              </div>
            )}
            <Button className="mt-4">Validar Outro Ingresso</Button>
          </div>
        )}
        
        {validationResult.status === 'invalid' && (
          <div className="text-center py-8">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-600 mb-2">Ingresso Inválido</h3>
            <p className="text-muted-foreground mb-4">
              {validationResult.message}
            </p>
            <Button variant="outline">Tentar Novamente</Button>
          </div>
        )}
        
        {validationResult.status === 'error' && (
          <div className="text-center py-8">
            <XCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-yellow-600 mb-2">Erro na Validação</h3>
            <p className="text-muted-foreground mb-4">
              {validationResult.message}
            </p>
            <Button variant="outline">Tentar Novamente</Button>
          </div>
        )}
      </div>

      {/* Recent Validations */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Validações Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Código</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Evento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data/Hora</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  Nenhuma validação registrada
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
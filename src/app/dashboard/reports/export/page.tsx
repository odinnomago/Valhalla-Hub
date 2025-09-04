'use client';

import React, { useState } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Database,
  Calendar,
  Filter,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ExportReportsPage() {
  const [exportFormat, setExportFormat] = useState('csv');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedData, setSelectedData] = useState<string[]>(['revenue', 'streams', 'downloads']);

  const dataTypes = [
    { id: 'revenue', label: 'Receita', icon: <FileText className="h-4 w-4" /> },
    { id: 'streams', label: 'Streams', icon: <FileSpreadsheet className="h-4 w-4" /> },
    { id: 'downloads', label: 'Downloads', icon: <Database className="h-4 w-4" /> },
    { id: 'users', label: 'Usuários', icon: <FileText className="h-4 w-4" /> },
    { id: 'engagement', label: 'Engajamento', icon: <FileSpreadsheet className="h-4 w-4" /> },
    { id: 'platforms', label: 'Plataformas', icon: <Database className="h-4 w-4" /> }
  ];

  const exportFormats = [
    { id: 'csv', label: 'CSV', description: 'Formato de valores separados por vírgula' },
    { id: 'xlsx', label: 'Excel', description: 'Planilha do Microsoft Excel' },
    { id: 'pdf', label: 'PDF', description: 'Documento PDF para impressão' },
    { id: 'json', label: 'JSON', description: 'Formato de dados estruturados' }
  ];

  const handleExport = () => {
    // This will be replaced with actual export functionality
    console.log('Exporting data:', { exportFormat, dateRange, selectedData });
    alert(`Exportando dados no formato ${exportFormat.toUpperCase()}...`);
  };

  const toggleDataType = (id: string) => {
    setSelectedData(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Exportar Dados</h1>
        <p className="text-muted-foreground">Baixe seus relatórios em diferentes formatos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Format Selection */}
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">Formato de Exportação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exportFormats.map((format) => (
                <div 
                  key={format.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    exportFormat === format.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border/50 hover:bg-muted/50'
                  }`}
                  onClick={() => setExportFormat(format.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Download className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{format.label}</h3>
                      <p className="text-sm text-muted-foreground">{format.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">Período</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Data Inicial</label>
                <Input 
                  type="date" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Data Final</label>
                <Input 
                  type="date" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setDateRange({ start: '2024-01-01', end: '2024-01-31' })}
              >
                Janeiro 2024
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setDateRange({ start: '2024-01-01', end: '2024-03-31' })}
              >
                1º Trimestre 2024
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setDateRange({ start: '2024-01-01', end: '2024-06-30' })}
              >
                1º Semestre 2024
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setDateRange({ start: '2024-01-01', end: '2024-12-31' })}
              >
                Ano Completo 2024
              </Button>
            </div>
          </div>

          {/* Data Selection */}
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">Selecionar Dados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors flex items-center gap-3 ${
                    selectedData.includes(type.id) 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border/50 hover:bg-muted/50'
                  }`}
                  onClick={() => toggleDataType(type.id)}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    selectedData.includes(type.id) 
                      ? 'bg-primary border-primary' 
                      : 'border-border'
                  }`}>
                    {selectedData.includes(type.id) && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    )}
                  </div>
                  <div className="bg-primary/10 p-2 rounded-lg">
                    {type.icon}
                  </div>
                  <span className="font-medium">{type.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview and Export */}
        <div className="space-y-6">
          {/* Export Preview */}
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">Pré-visualização</h2>
            <div className="space-y-4">
              <div className="border border-border/50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Resumo da Exportação</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Formato:</span>
                    <span className="font-medium">{exportFormat.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Período:</span>
                    <span className="font-medium">
                      {dateRange.start ? new Date(dateRange.start).toLocaleDateString('pt-BR') : 'Não definido'} - 
                      {dateRange.end ? new Date(dateRange.end).toLocaleDateString('pt-BR') : 'Não definido'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipos de Dados:</span>
                    <span className="font-medium">{selectedData.length}</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-border/50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Estrutura do Arquivo</h3>
                <div className="text-sm space-y-1">
                  {selectedData.map((dataType) => {
                    const type = dataTypes.find(t => t.id === dataType);
                    return (
                      <div key={dataType} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{type?.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleExport}
              disabled={!dateRange.start || !dateRange.end || selectedData.length === 0}
            >
              <Download className="h-5 w-5 mr-2" />
              Exportar Dados
            </Button>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="mb-2">Formatos suportados:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>CSV - Valores separados por vírgula</li>
                <li>XLSX - Planilha do Excel</li>
                <li>PDF - Documento para impressão</li>
                <li>JSON - Dados estruturados</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
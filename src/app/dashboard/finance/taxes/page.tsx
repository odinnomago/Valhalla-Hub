'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  FileText, 
  Calculator, 
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function FinanceTaxesPage() {
  const [taxConfigurations, setTaxConfigurations] = useState([
    {
      id: 1,
      name: 'IRPF sobre royalties',
      type: 'income',
      rate: 15,
      description: 'Imposto de renda sobre royalties recebidos',
      active: true
    },
    {
      id: 2,
      name: 'ISS sobre shows',
      type: 'service',
      rate: 5,
      description: 'Imposto sobre serviços de apresentações artísticas',
      active: true
    },
    {
      id: 3,
      name: 'INSS Artista',
      type: 'social',
      rate: 20,
      description: 'Contribuição previdenciária para artistas',
      active: false
    }
  ]);

  const [newTax, setNewTax] = useState({
    name: '',
    type: 'income',
    rate: 0,
    description: ''
  });

  const [editingTax, setEditingTax] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreateTax = () => {
    if (newTax.name && newTax.rate > 0) {
      const tax = {
        id: taxConfigurations.length + 1,
        ...newTax,
        active: true
      };
      setTaxConfigurations([...taxConfigurations, tax]);
      setNewTax({ name: '', type: 'income', rate: 0, description: '' });
      setShowForm(false);
    }
  };

  const handleUpdateTax = () => {
    if (editingTax !== null && newTax.name && newTax.rate > 0) {
      setTaxConfigurations(taxConfigurations.map(tax => 
        tax.id === editingTax 
          ? { ...tax, ...newTax }
          : tax
      ));
      setEditingTax(null);
      setNewTax({ name: '', type: 'income', rate: 0, description: '' });
      setShowForm(false);
    }
  };

  const handleDeleteTax = (id: number) => {
    setTaxConfigurations(taxConfigurations.filter(tax => tax.id !== id));
  };

  const toggleTaxStatus = (id: number) => {
    setTaxConfigurations(taxConfigurations.map(tax => 
      tax.id === id 
        ? { ...tax, active: !tax.active }
        : tax
    ));
  };

  const startEditing = (id: number) => {
    const tax = taxConfigurations.find(t => t.id === id);
    if (tax) {
      setNewTax({
        name: tax.name,
        type: tax.type,
        rate: tax.rate,
        description: tax.description
      });
      setEditingTax(id);
      setShowForm(true);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'income':
        return 'Renda';
      case 'service':
        return 'Serviço';
      case 'social':
        return 'Previdência';
      default:
        return type;
    }
  };

  const getStatusIcon = (active: boolean) => {
    return active ? 
      <CheckCircle className="h-5 w-5 text-green-500" /> : 
      <AlertCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Configurar Impostos</h1>
          <p className="text-muted-foreground">Gerencie as configurações fiscais da sua conta</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Imposto
        </Button>
      </div>

      {/* Tax Configuration Form */}
      {showForm && (
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-4">
            {editingTax ? 'Editar Imposto' : 'Configurar Novo Imposto'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nome do Imposto</label>
              <Input
                value={newTax.name}
                onChange={(e) => setNewTax({...newTax, name: e.target.value})}
                placeholder="Ex: IRPF sobre royalties"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tipo</label>
              <select
                className="w-full border border-border/50 rounded-md p-2 bg-background"
                value={newTax.type}
                onChange={(e) => setNewTax({...newTax, type: e.target.value})}
              >
                <option value="income">Renda</option>
                <option value="service">Serviço</option>
                <option value="social">Previdência</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Alíquota (%)</label>
              <Input
                type="number"
                value={newTax.rate || ''}
                onChange={(e) => setNewTax({...newTax, rate: parseFloat(e.target.value) || 0})}
                placeholder="Ex: 15"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Descrição</label>
              <Textarea
                value={newTax.description}
                onChange={(e) => setNewTax({...newTax, description: e.target.value})}
                placeholder="Descreva quando este imposto deve ser aplicado"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {editingTax ? (
              <Button onClick={handleUpdateTax}>Atualizar Imposto</Button>
            ) : (
              <Button onClick={handleCreateTax}>Criar Imposto</Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => {
                setShowForm(false);
                setEditingTax(null);
                setNewTax({ name: '', type: 'income', rate: 0, description: '' });
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Tax Configurations */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Configurações de Impostos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Imposto</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Tipo</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Alíquota</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Descrição</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {taxConfigurations.length > 0 ? (
                taxConfigurations.map((tax) => (
                  <tr key={tax.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">{tax.name}</td>
                    <td className="p-4">
                      <span className="bg-muted px-2 py-1 rounded-full text-xs">
                        {getTypeLabel(tax.type)}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{tax.rate}%</td>
                    <td className="p-4 text-muted-foreground max-w-xs">{tax.description}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(tax.active)}
                        <span>{tax.active ? 'Ativo' : 'Inativo'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => toggleTaxStatus(tax.id)}
                        >
                          {tax.active ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => startEditing(tax.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeleteTax(tax.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    Nenhuma configuração de imposto encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Calculator */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-4">Calculadora de Impostos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Valor Bruto (R$)</label>
            <Input type="number" placeholder="0,00" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Imposto Aplicável</label>
            <select className="w-full border border-border/50 rounded-md p-2 bg-background">
              <option>Selecione um imposto</option>
              {taxConfigurations.filter(t => t.active).map(tax => (
                <option key={tax.id} value={tax.id}>
                  {tax.name} ({tax.rate}%)
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button className="w-full">
              <Calculator className="h-4 w-4 mr-2" />
              Calcular
            </Button>
          </div>
        </div>
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Valor Bruto:</span>
            <span className="font-medium">R$ 0,00</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Impostos:</span>
            <span className="font-medium">R$ 0,00</span>
          </div>
          <div className="flex justify-between border-t border-border/50 pt-2 mt-2">
            <span className="font-medium">Valor Líquido:</span>
            <span className="font-bold">R$ 0,00</span>
          </div>
        </div>
      </div>

      {/* Tax Documentation */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-4">Documentação Fiscal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border/50 rounded-lg p-4">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Guia de Declaração</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Passo a passo para declarar seus rendimentos artísticos
            </p>
            <Button variant="outline" size="sm">Baixar PDF</Button>
          </div>
          
          <div className="border border-border/50 rounded-lg p-4">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Modelos de Documentos</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Modelos de recibos, contratos e declarações
            </p>
            <Button variant="outline" size="sm">Acessar Modelos</Button>
          </div>
          
          <div className="border border-border/50 rounded-lg p-4">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Prazos Importantes</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Calendário fiscal com datas importantes para artistas
            </p>
            <Button variant="outline" size="sm">Ver Calendário</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
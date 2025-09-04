'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Receipt, 
  Calendar,
  Filter,
  Download,
  Eye,
  PieChart,
  LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FinanceReportsPage() {
  // This will be replaced with real data from user context/hooks
  const [financialData] = useState({
    totalRevenue: 45000,
    totalExpenses: 18500,
    netProfit: 26500,
    monthlyGrowth: 12.5
  });

  const [timeRange, setTimeRange] = useState('6m');

  const reportTypes = [
    {
      id: 1,
      title: 'Relatório de Receitas',
      description: 'Detalhamento de todas as receitas recebidas',
      icon: <Receipt className="h-5 w-5" />
    },
    {
      id: 2,
      title: 'Relatório de Despesas',
      description: 'Análise detalhada das despesas e custos',
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      id: 3,
      title: 'Fluxo de Caixa',
      description: 'Movimentação financeira entrada e saída',
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: 4,
      title: 'Impostos e Tributos',
      description: 'Cálculo e relatório de obrigações fiscais',
      icon: <PieChart className="h-5 w-5" />
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Relatórios Financeiros</h1>
          <p className="text-muted-foreground">Acompanhe sua saúde financeira e performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex flex-wrap gap-2">
        {['1m', '3m', '6m', '1y', 'all'].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange(range)}
          >
            {range === '1m' && '1 mês'}
            {range === '3m' && '3 meses'}
            {range === '6m' && '6 meses'}
            {range === '1y' && '1 ano'}
            {range === 'all' && 'Todo período'}
          </Button>
        ))}
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold mt-1">R$ {financialData.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Receipt className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Despesas Totais</p>
              <p className="text-2xl font-bold mt-1">R$ {financialData.totalExpenses.toLocaleString()}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Lucro Líquido</p>
              <p className="text-2xl font-bold mt-1">R$ {financialData.netProfit.toLocaleString()}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Crescimento</p>
              <p className="text-2xl font-bold mt-1">{financialData.monthlyGrowth}%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <h3 className="font-semibold mb-4">Receita vs Despesas</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <p>Gráfico de receita versus despesas</p>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <h3 className="font-semibold mb-4">Distribuição de Receitas</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <p>Gráfico de distribuição por fonte de receita</p>
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Tipos de Relatórios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((report) => (
            <div key={report.id} className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  {report.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                  <p className="text-muted-foreground mb-4">{report.description}</p>
                  <div className="flex gap-2">
                    <Button className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Visualizar
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Baixar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Relatórios Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Relatório</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Período</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data de Geração</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  Nenhum relatório gerado ainda
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
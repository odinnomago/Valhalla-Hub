'use client';

import React, { useState } from 'react';
import { 
  Album, 
  Play, 
  CheckCircle, 
  Clock,
  XCircle,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminReleasesPage() {
  // This will be replaced with real data from user context/hooks
  const [releases] = useState([
    {
      id: 1,
      title: 'Summer Vibes',
      artist: 'Sunset Band',
      status: 'approved',
      releaseDate: '2024-06-15',
      platforms: ['Spotify', 'Apple Music', 'YouTube']
    },
    {
      id: 2,
      title: 'Midnight Dreams',
      artist: 'Luna Project',
      status: 'pending',
      releaseDate: '2024-07-20',
      platforms: ['Spotify', 'Deezer']
    },
    {
      id: 3,
      title: 'Urban Echoes',
      artist: 'City Sound',
      status: 'rejected',
      releaseDate: '2024-05-10',
      platforms: ['Spotify']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprovado';
      case 'pending':
        return 'Pendente';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleViewRelease = (id: number) => {
    // This will be replaced with actual functionality
    console.log('Viewing release:', id);
  };

  const handleEditRelease = (id: number) => {
    // This will be replaced with actual functionality
    console.log('Editing release:', id);
  };

  const handleDeleteRelease = (id: number) => {
    // This will be replaced with actual functionality
    console.log('Deleting release:', id);
  };

  const filteredReleases = releases.filter(release => 
    release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    release.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Gerenciar Lançamentos</h1>
          <p className="text-muted-foreground">Aprovar ou rejeitar lançamentos de artistas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar lançamentos..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Lançamentos</p>
              <p className="text-2xl font-bold mt-1">{releases.length}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Album className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold mt-1">
                {releases.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Aprovados</p>
              <p className="text-2xl font-bold mt-1">
                {releases.filter(r => r.status === 'approved').length}
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Releases Table */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Lançamentos Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Lançamento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Artista</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Plataformas</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredReleases.length > 0 ? (
                filteredReleases.map((release) => (
                  <tr key={release.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">{release.title}</td>
                    <td className="p-4">{release.artist}</td>
                    <td className="p-4">{new Date(release.releaseDate).toLocaleDateString('pt-BR')}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {release.platforms.map((platform, index) => (
                          <span key={index} className="bg-muted px-2 py-1 rounded-full text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(release.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(release.status)}`}>
                          {getStatusText(release.status)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleViewRelease(release.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEditRelease(release.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeleteRelease(release.id)}
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
                    Nenhum lançamento encontrado
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
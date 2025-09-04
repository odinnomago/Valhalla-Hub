'use client';

import React, { useState } from 'react';
import { 
  Music, 
  Upload, 
  Plus, 
  Save, 
  X,
  Play,
  Pause,
  Volume2,
  FileAudio,
  Image as ImageIcon,
  Tag,
  Calendar,
  Clock,
  Globe,
  Lock,
  Eye,
  Users,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewReleasePage() {
  const [trackFiles, setTrackFiles] = useState<File[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    releaseDate: '',
    description: '',
    price: '',
    visibility: 'public',
    rights: 'all'
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'track' | 'cover') => {
    if (e.target.files && e.target.files.length > 0) {
      if (type === 'track') {
        setTrackFiles(Array.from(e.target.files));
      } else {
        setCoverFile(e.target.files[0]);
      }
    }
  };

  const removeTrack = (index: number) => {
    setTrackFiles(trackFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { ...formData, trackFiles, coverFile });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Enviar Nova Música</h1>
        <p className="text-muted-foreground">Publique sua música na Gravadora Digital</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Track Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Informações Básicas</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Título da Música *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Digite o título da música"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Artista *</label>
                  <input
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Nome do artista"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Álbum</label>
                  <input
                    type="text"
                    name="album"
                    value={formData.album}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Nome do álbum (opcional)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Gênero *</label>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Selecione um gênero</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="hip-hop">Hip-Hop</option>
                    <option value="electronic">Eletrônica</option>
                    <option value="jazz">Jazz</option>
                    <option value="classical">Clássica</option>
                    <option value="reggae">Reggae</option>
                    <option value="country">Country</option>
                    <option value="blues">Blues</option>
                    <option value="folk">Folk</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Data de Lançamento *</label>
                  <input
                    type="date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Conte a história por trás da música..."
                  />
                </div>
              </div>
            </div>

            {/* Track Upload */}
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Upload das Faixas</h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <FileAudio className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="font-medium mb-1">Arraste e solte suas faixas aqui</p>
                  <p className="text-sm text-muted-foreground mb-4">ou</p>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="audio/*"
                      onChange={(e) => handleFileUpload(e, 'track')}
                      className="hidden"
                    />
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Selecionar Arquivos
                    </Button>
                  </label>
                  <p className="text-xs text-muted-foreground mt-2">
                    Formatos suportados: WAV, AIFF, FLAC (24-bit/48kHz ou superior)
                  </p>
                </div>
                
                {trackFiles.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium">Faixas Selecionadas:</h3>
                    {trackFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <Music className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-2 rounded-full hover:bg-background"
                          >
                            {isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeTrack(index)}
                            className="p-2 rounded-full hover:bg-background"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Cover Art and Settings */}
          <div className="space-y-6">
            {/* Cover Art */}
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Capa do Álbum</h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {coverFile ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(coverFile)}
                        alt="Cover preview"
                        className="mx-auto h-48 w-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setCoverFile(null)}
                        className="absolute -top-2 -right-2 p-1 bg-destructive rounded-full text-destructive-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="font-medium mb-1">Arraste e solte a capa aqui</p>
                      <p className="text-sm text-muted-foreground mb-4">ou</p>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'cover')}
                          className="hidden"
                        />
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Selecionar Imagem
                        </Button>
                      </label>
                      <p className="text-xs text-muted-foreground mt-2">
                        Formatos: JPG, PNG (3000x3000px mínimo)
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Preço</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Preço de Venda</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">R$</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="w-full rounded-lg border border-border bg-background pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Deixe em branco para distribuição gratuita
                  </p>
                </div>
              </div>
            </div>

            {/* Visibility */}
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Visibilidade</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Visibilidade</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={formData.visibility === 'public'}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                      <Globe className="h-4 w-4" />
                      <span>Público</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="visibility"
                        value="private"
                        checked={formData.visibility === 'private'}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                      <Lock className="h-4 w-4" />
                      <span>Privado</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="visibility"
                        value="unlisted"
                        checked={formData.visibility === 'unlisted'}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                      <Eye className="h-4 w-4" />
                      <span>Não listado</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Rights */}
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Direitos</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Direitos de Autor</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="rights"
                        value="all"
                        checked={formData.rights === 'all'}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                      <Users className="h-4 w-4" />
                      <span>Todos os direitos reservados</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="rights"
                        value="creative-commons"
                        checked={formData.rights === 'creative-commons'}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                      <Globe className="h-4 w-4" />
                      <span>Creative Commons</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button">
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Salvar e Publicar
          </Button>
        </div>
      </form>
    </div>
  );
}
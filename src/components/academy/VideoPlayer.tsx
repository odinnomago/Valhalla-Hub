'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoResource {
  id: string;
  title: string;
  type: 'pdf' | 'audio' | 'image' | 'project';
  url: string;
  size?: string;
}

interface VideoChapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
}

interface Note {
  id: string;
  timestamp: number;
  content: string;
  createdAt: string;
}

interface VideoData {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number;
  instructor: {
    name: string;
    avatar: string;
  };
  transcription?: Array<{
    start: number;
    end: number;
    text: string;
  }>;
  chapters: VideoChapter[];
  resources: VideoResource[];
  nextVideo?: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
  };
}

interface VideoPlayerProps {
  videoData: VideoData;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  autoplay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoData,
  onProgress,
  onComplete,
  autoplay = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'transcription' | 'notes'>('overview');
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [showControls, setShowControls] = useState(true);

  // Quality options
  const qualityOptions = [
    { label: '480p', value: '480' },
    { label: '720p', value: '720' },
    { label: '1080p', value: '1080' }
  ];

  // Playback speed options
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onProgress) {
        onProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onComplete) {
        onComplete();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onProgress, onComplete]);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isPlaying && showControls) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = time;
    setCurrentTime(time);
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
    video.currentTime = newTime;
  };

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const changeVolume = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const addNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      timestamp: currentTime,
      content: newNote,
      createdAt: new Date().toISOString()
    };

    setNotes(prev => [...prev, note].sort((a, b) => a.timestamp - b.timestamp));
    setNewNote('');
  };

  const jumpToNote = (timestamp: number) => {
    handleSeek(timestamp);
  };

  const getCurrentChapter = () => {
    return videoData.chapters.find(chapter => 
      currentTime >= chapter.startTime && currentTime <= chapter.endTime
    );
  };

  const getCurrentTranscription = () => {
    if (!videoData.transcription) return null;
    return videoData.transcription.find(item =>
      currentTime >= item.start && currentTime <= item.end
    );
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      {/* Video Container */}
      <div 
        className="relative aspect-video bg-background group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => !isPlaying && setShowControls(true)}
      >
        <video
          ref={videoRef}
          src={videoData.url}
          className="w-full h-full"
          autoPlay={autoplay}
          onClick={togglePlay}
        />

        {/* Controls Overlay */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40"
            >
              {/* Top Controls */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-foreground font-semibold">{videoData.title}</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Quality Selector */}
                  <select 
                    className="bg-card/50 text-foreground text-sm rounded px-2 py-1 border border-border"
                    onChange={(e) => console.log('Quality:', e.target.value)}
                  >
                    {qualityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* Speed Control */}
                  <select 
                    className="bg-card/50 text-foreground text-sm rounded px-2 py-1 border border-border"
                    value={playbackRate}
                    onChange={(e) => changePlaybackRate(Number(e.target.value))}
                  >
                    {speedOptions.map(speed => (
                      <option key={speed} value={speed}>
                        {speed}x
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-card/50 rounded-full flex items-center justify-center text-foreground hover:bg-card/70 transition-colors"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Progress Bar */}
                <div className="mb-4">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  />
                  
                  {/* Chapter Markers */}
                  <div className="relative mt-1">
                    {videoData.chapters.map(chapter => (
                      <div
                        key={chapter.id}
                        className="absolute w-1 h-3 bg-primary-400 rounded"
                        style={{ 
                          left: `${(chapter.startTime / duration) * 100}%`,
                          transform: 'translateX(-50%)'
                        }}
                        title={chapter.title}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlay}
                      className="text-foreground text-xl hover:text-primary transition-colors"
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>

                    {/* Skip Buttons */}
                    <button
                      onClick={() => skipTime(-10)}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      ⏪ 10s
                    </button>
                    <button
                      onClick={() => skipTime(10)}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      10s ⏩
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeVolume(volume === 0 ? 1 : 0)}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={volume}
                        onChange={(e) => changeVolume(Number(e.target.value))}
                        className="w-16 h-1"
                      />
                    </div>

                    {/* Time */}
                    <span className="text-foreground text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Current Chapter */}
                    {getCurrentChapter() && (
                      <span className="text-primary text-sm">
                        {getCurrentChapter()?.title}
                      </span>
                    )}

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {isFullscreen ? '⛶' : '⛶'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtitles */}
        {getCurrentTranscription() && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-card/80 text-foreground px-4 py-2 rounded max-w-2xl text-center border border-border">
            {getCurrentTranscription()?.text}
          </div>
        )}
      </div>

      {/* Video Info Tabs */}
      <div className="bg-card border-t border-border">
        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          {[
            { id: 'overview', name: 'Visão Geral', icon: '📋' },
            { id: 'resources', name: 'Recursos', icon: '📎' },
            { id: 'transcription', name: 'Transcrição', icon: '📝' },
            { id: 'notes', name: 'Anotações', icon: '🗒️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-foreground font-bold text-lg mb-2">{videoData.title}</h3>
                    <p className="text-muted-foreground">{videoData.description}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <img
                      src={videoData.instructor.avatar}
                      alt={videoData.instructor.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-foreground font-medium">{videoData.instructor.name}</p>
                      <p className="text-muted-foreground text-sm">Instrutor</p>
                    </div>
                  </div>

                  {/* Chapters */}
                  <div>
                    <h4 className="text-foreground font-semibold mb-3">Capítulos</h4>
                    <div className="space-y-2">
                      {videoData.chapters.map(chapter => (
                        <button
                          key={chapter.id}
                          onClick={() => handleSeek(chapter.startTime)}
                          className="w-full text-left p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-foreground">{chapter.title}</span>
                            <span className="text-muted-foreground text-sm">
                              {formatTime(chapter.startTime)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h3 className="text-foreground font-bold text-lg mb-4">Recursos da Aula</h3>
                  <div className="grid gap-3">
                    {videoData.resources.map(resource => (
                      <div key={resource.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {resource.type === 'pdf' ? '📄' : 
                             resource.type === 'audio' ? '🎵' :
                             resource.type === 'image' ? '🖼️' : '📁'}
                          </span>
                          <div>
                            <p className="text-foreground font-medium">{resource.title}</p>
                            {resource.size && (
                              <p className="text-muted-foreground text-sm">{resource.size}</p>
                            )}
                          </div>
                        </div>
                        <button className="bg-primary-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-primary-400 transition-colors">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'transcription' && (
                <div>
                  <h3 className="text-foreground font-bold text-lg mb-4">Transcrição</h3>
                  {videoData.transcription ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {videoData.transcription.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSeek(item.start)}
                          className="w-full text-left p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="flex gap-3">
                            <span className="text-primary text-sm font-mono min-w-fit">
                              {formatTime(item.start)}
                            </span>
                            <span className="text-muted-foreground">{item.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Transcrição não disponível para este vídeo.</p>
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div>
                  <h3 className="text-foreground font-bold text-lg mb-4">Minhas Anotações</h3>
                  
                  {/* Add Note */}
                  <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-primary font-mono text-sm">
                        {formatTime(currentTime)}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground text-sm">Nova anotação</span>
                    </div>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Adicione sua anotação..."
                        className="flex-1 bg-card text-foreground px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-border"
                        onKeyPress={(e) => e.key === 'Enter' && addNote()}
                      />
                      <button
                        onClick={addNote}
                        className="bg-primary-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-primary-400 transition-colors"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>

                  {/* Notes List */}
                  <div className="space-y-3">
                    {notes.map(note => (
                      <div key={note.id} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <button
                            onClick={() => jumpToNote(note.timestamp)}
                            className="text-primary font-mono text-sm hover:text-primary/80 transition-colors"
                          >
                            {formatTime(note.timestamp)}
                          </button>
                          <span className="text-muted-foreground text-xs">
                            {new Date(note.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{note.content}</p>
                      </div>
                    ))}

                    {notes.length === 0 && (
                      <p className="text-muted-foreground text-center py-8">
                        Nenhuma anotação ainda. Adicione suas primeiras observações!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Next Video */}
      {videoData.nextVideo && (
        <div className="bg-muted/30 p-6 border-t border-border">
          <h3 className="text-foreground font-bold mb-4">Próxima Aula</h3>
          <div className="flex items-center gap-4 p-4 bg-card rounded-lg hover:bg-card/80 transition-colors cursor-pointer border border-border">
            <img
              src={videoData.nextVideo.thumbnail}
              alt={videoData.nextVideo.title}
              className="w-24 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="text-foreground font-medium">{videoData.nextVideo.title}</h4>
              <p className="text-muted-foreground text-sm">{videoData.nextVideo.duration}</p>
            </div>
            <button className="bg-primary-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-primary-400 transition-colors">
              Assistir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
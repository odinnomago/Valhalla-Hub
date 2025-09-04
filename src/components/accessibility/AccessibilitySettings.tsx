'use client';

import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Contrast, 
  Volume2, 
  Pause, 
  Move, 
  Type, 
  Sun, 
  Moon,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const AccessibilitySettings = () => {
  const [isAccessibilityPanelOpen, setIsAccessibilityPanelOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState(16);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply accessibility settings to the document
  useEffect(() => {
    // Text size
    document.documentElement.style.fontSize = `${textSize}px`;
    
    // High contrast
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    // Reduce motion
    if (reduceMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
    
    // Dyslexia font
    if (dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
    
    // Dark mode
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [highContrast, textSize, reduceMotion, dyslexiaFont, isDarkMode]);

  const toggleAccessibilityPanel = () => {
    setIsAccessibilityPanelOpen(!isAccessibilityPanelOpen);
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 left-6 z-50 rounded-full w-14 h-14 shadow-lg touch-btn"
        onClick={toggleAccessibilityPanel}
        aria-label="Configurações de acessibilidade"
      >
        <Settings className="h-6 w-6" />
      </Button>

      {/* Accessibility Panel */}
      {isAccessibilityPanelOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 bg-card border border-border rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Acessibilidade</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleAccessibilityPanel}
              className="touch-btn"
            >
              <Pause className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-6">
            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Contrast className="h-5 w-5" />
                </div>
                <Label htmlFor="high-contrast">Alto Contraste</Label>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
            </div>
            
            {/* Text Size */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Type className="h-5 w-5" />
                </div>
                <Label>Tamanho do Texto</Label>
              </div>
              <Slider
                value={[textSize]}
                onValueChange={([value]) => setTextSize(value)}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>Pequeno</span>
                <span className="font-medium">{textSize}px</span>
                <span>Grande</span>
              </div>
            </div>
            
            {/* Reduce Motion */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Move className="h-5 w-5" />
                </div>
                <Label htmlFor="reduce-motion">Reduzir Movimento</Label>
              </div>
              <Switch
                id="reduce-motion"
                checked={reduceMotion}
                onCheckedChange={setReduceMotion}
              />
            </div>
            
            {/* Sound */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Volume2 className="h-5 w-5" />
                </div>
                <Label htmlFor="sound">Som</Label>
              </div>
              <Switch
                id="sound"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
            
            {/* Dyslexia Font */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Eye className="h-5 w-5" />
                </div>
                <Label htmlFor="dyslexia-font">Fonte para Dislexia</Label>
              </div>
              <Switch
                id="dyslexia-font"
                checked={dyslexiaFont}
                onCheckedChange={setDyslexiaFont}
              />
            </div>
            
            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </div>
                <Label htmlFor="dark-mode">Modo {isDarkMode ? 'Escuro' : 'Claro'}</Label>
              </div>
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
          </div>
          
          {/* Reset Button */}
          <Button 
            variant="outline" 
            className="w-full mt-6 touch-btn"
            onClick={() => {
              setHighContrast(false);
              setTextSize(16);
              setReduceMotion(false);
              setSoundEnabled(true);
              setDyslexiaFont(false);
              setIsDarkMode(false);
            }}
          >
            Redefinir Configurações
          </Button>
        </div>
      )}
    </>
  );
};

export default AccessibilitySettings;
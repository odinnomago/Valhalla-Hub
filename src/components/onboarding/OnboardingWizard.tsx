'use client';

import React, { useState } from 'react';
import { 
  User, 
  Music, 
  Users, 
  Briefcase, 
  Heart, 
  Play, 
  Calendar, 
  Store, 
  School, 
  Globe,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<'artist' | 'fan' | 'professional' | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    location: ''
  });

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Bem-vindo à Valhalla Hub',
      description: 'Vamos configurar sua experiência personalizada',
      icon: <Sparkles className="h-6 w-6" />
    },
    {
      id: 2,
      title: 'Qual é o seu perfil?',
      description: 'Isso nos ajudará a personalizar sua experiência',
      icon: <User className="h-6 w-6" />
    },
    {
      id: 3,
      title: 'Selecione seus interesses',
      description: 'Escolha as áreas que mais te interessam',
      icon: <Heart className="h-6 w-6" />
    },
    {
      id: 4,
      title: 'Configure seu perfil',
      description: 'Conte-nos um pouco sobre você',
      icon: <User className="h-6 w-6" />
    },
    {
      id: 5,
      title: 'Tour guiado',
      description: 'Vamos explorar as principais funcionalidades',
      icon: <Play className="h-6 w-6" />
    },
    {
      id: 6,
      title: 'Você está pronto!',
      description: 'Sua experiência personalizada está configurada',
      icon: <Check className="h-6 w-6" />
    }
  ];

  const userTypes = [
    { id: 'artist', label: 'Artista', icon: <Music className="h-5 w-5" />, description: 'Você cria música e quer distribuir seus lançamentos' },
    { id: 'fan', label: 'Fã', icon: <Users className="h-5 w-5" />, description: 'Você ama descobrir novos artistas e conteúdo' },
    { id: 'professional', label: 'Profissional', icon: <Briefcase className="h-5 w-5" />, description: 'Você trabalha na indústria musical' }
  ];

  const interests = [
    { id: 'releases', label: 'Lançamentos', icon: <Music className="h-4 w-4" /> },
    { id: 'events', label: 'Eventos', icon: <Calendar className="h-4 w-4" /> },
    { id: 'marketplace', label: 'Marketplace', icon: <Store className="h-4 w-4" /> },
    { id: 'courses', label: 'Cursos', icon: <School className="h-4 w-4" /> },
    { id: 'blog', label: 'Blog', icon: <Globe className="h-4 w-4" /> },
    { id: 'community', label: 'Comunidade', icon: <Users className="h-4 w-4" /> }
  ];

  const handleUserTypeSelect = (type: 'artist' | 'fan' | 'professional') => {
    setUserType(type);
  };

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId) 
        : [...prev, interestId]
    );
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center py-8">
            <div className="bg-primary/10 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Bem-vindo à Valhalla Hub</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              A plataforma definitiva para artistas, fãs e profissionais da música. 
              Vamos configurar sua experiência personalizada em poucos passos.
            </p>
          </div>
        );
      
      case 2:
        return (
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-6 text-center">Qual é o seu perfil?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    userType === type.id ? 'border-primary ring-2 ring-primary/20' : ''
                  }`}
                  onClick={() => handleUserTypeSelect(type.id as any)}
                >
                  <CardContent className="p-6">
                    <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                      {type.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{type.label}</h4>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-2 text-center">Selecione seus interesses</h3>
            <p className="text-muted-foreground text-center mb-6">
              Escolha as áreas que mais te interessam para personalizar seu feed
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interests.map((interest) => (
                <Card 
                  key={interest.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedInterests.includes(interest.id) 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : ''
                  }`}
                  onClick={() => handleInterestToggle(interest.id)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedInterests.includes(interest.id) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      {interest.icon}
                    </div>
                    <span className="font-medium">{interest.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-6 text-center">Configure seu perfil</h3>
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="text-sm font-medium mb-2 block">Nome completo</label>
                <input
                  type="text"
                  className="w-full border border-input rounded-md p-3 bg-background"
                  placeholder="Digite seu nome"
                  value={profileData.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Biografia</label>
                <textarea
                  className="w-full border border-input rounded-md p-3 bg-background min-h-[100px]"
                  placeholder="Conte um pouco sobre você"
                  value={profileData.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Localização</label>
                <input
                  type="text"
                  className="w-full border border-input rounded-md p-3 bg-background"
                  placeholder="Cidade, Estado"
                  value={profileData.location}
                  onChange={(e) => handleProfileChange('location', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-2 text-center">Tour Guiado</h3>
            <p className="text-muted-foreground text-center mb-6">
              Vamos explorar as principais funcionalidades da plataforma
            </p>
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Music className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Distribuição de Música</h4>
                  <p className="text-sm text-muted-foreground">
                    Envie suas músicas para todas as plataformas de streaming com um clique
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Agendamento de Shows</h4>
                  <p className="text-sm text-muted-foreground">
                    Gerencie seus eventos e contratos em um só lugar
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Store className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Marketplace Colaborativo</h4>
                  <p className="text-sm text-muted-foreground">
                    Venda produtos e serviços diretamente para sua audiência
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <School className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Academy</h4>
                  <p className="text-sm text-muted-foreground">
                    Aprenda com cursos e tutoriais criados por profissionais da indústria
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="text-center py-8">
            <div className="bg-primary/10 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Check className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Tudo pronto!</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Sua experiência personalizada está configurada. 
              Agora você pode aproveitar todas as funcionalidades da Valhalla Hub.
            </p>
            <Button size="lg" onClick={() => {
              // This would normally redirect to the dashboard
              console.log('Onboarding completed');
            }}>
              Acessar Dashboard
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 2:
        return userType !== null;
      case 3:
        return selectedInterests.length > 0;
      case 4:
        return profileData.name.trim() !== '';
      default:
        return true;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              {steps.find(step => step.id === currentStep)?.icon}
            </div>
          </div>
          <CardTitle className="text-2xl">
            {steps.find(step => step.id === currentStep)?.title}
          </CardTitle>
          <CardDescription>
            {steps.find(step => step.id === currentStep)?.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2 text-sm">
              <span>Passo {currentStep} de {steps.length}</span>
              <span>{Math.round((currentStep / steps.length) * 100)}% completo</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Step content */}
          {renderStepContent()}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            
            {currentStep < steps.length ? (
              <Button 
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center gap-2"
              >
                Próximo
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
      
      {/* Step indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`w-3 h-3 rounded-full ${
              step.id === currentStep 
                ? 'bg-primary' 
                : step.id < currentStep 
                  ? 'bg-primary/50' 
                  : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingWizard;
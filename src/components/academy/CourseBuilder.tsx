'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  duration: number;
  preview: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  modules: Module[];
  learningOutcomes: string[];
  status: 'draft' | 'published';
}

interface CourseBuilderProps {
  onSave?: (course: Course) => void;
  onPublish?: (course: Course) => void;
}

const CourseBuilder: React.FC<CourseBuilderProps> = ({ onSave, onPublish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [course, setCourse] = useState<Course>({
    id: '',
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: 0,
    modules: [],
    learningOutcomes: [],
    status: 'draft'
  });

  const steps = [
    { id: 'basic', title: 'Informações Básicas', icon: '📝' },
    { id: 'curriculum', title: 'Currículo', icon: '📚' },
    { id: 'pricing', title: 'Preços', icon: '💰' },
    { id: 'review', title: 'Revisão', icon: '👀' }
  ];

  const categories = [
    'Produção Musical',
    'Performance',
    'DJ & Mixing',
    'Composição',
    'Negócios da Música'
  ];

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: '',
      description: '',
      lessons: []
    };
    setCourse(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
  };

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(mod => 
        mod.id === moduleId ? { ...mod, ...updates } : mod
      )
    }));
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: '',
      type: 'video',
      duration: 0,
      preview: false
    };

    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(mod => 
        mod.id === moduleId 
          ? { ...mod, lessons: [...mod.lessons, newLesson] }
          : mod
      )
    }));
  };

  const getTotalDuration = () => {
    return course.modules.reduce((total, module) => 
      total + module.lessons.reduce((moduleTotal, lesson) => moduleTotal + lesson.duration, 0), 0
    );
  };

  const getTotalLessons = () => {
    return course.modules.reduce((total, module) => total + module.lessons.length, 0);
  };

  const BasicInfoStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-medium mb-2">Título do Curso*</label>
        <input
          type="text"
          value={course.title}
          onChange={(e) => setCourse(prev => ({ ...prev, title: e.target.value }))}
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Ex: Produção Musical do Zero ao Profissional"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Descrição*</label>
        <textarea
          value={course.description}
          onChange={(e) => setCourse(prev => ({ ...prev, description: e.target.value }))}
          rows={5}
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Descreva o que os alunos aprenderão neste curso..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-medium mb-2">Categoria*</label>
          <select
            value={course.category}
            onChange={(e) => setCourse(prev => ({ ...prev, category: e.target.value }))}
            className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Nível*</label>
          <select
            value={course.level}
            onChange={(e) => setCourse(prev => ({ ...prev, level: e.target.value as any }))}
            className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="beginner">Iniciante</option>
            <option value="intermediate">Intermediário</option>
            <option value="advanced">Avançado</option>
          </select>
        </div>
      </div>
    </div>
  );

  const CurriculumStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Currículo do Curso</h3>
        <button
          onClick={addModule}
          className="bg-primary-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-primary-400 transition-colors"
        >
          + Adicionar Módulo
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary-400">{course.modules.length}</div>
          <div className="text-gray-400 text-sm">Módulos</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{getTotalLessons()}</div>
          <div className="text-gray-400 text-sm">Aulas</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{Math.round(getTotalDuration() / 60)}h</div>
          <div className="text-gray-400 text-sm">Duração Total</div>
        </div>
      </div>

      <div className="space-y-4">
        {course.modules.map((module, moduleIndex) => (
          <div key={module.id} className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-black font-bold">
                {moduleIndex + 1}
              </div>
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={module.title}
                  onChange={(e) => updateModule(module.id, { title: e.target.value })}
                  className="w-full bg-gray-700 text-white p-2 rounded-lg font-medium"
                  placeholder="Título do módulo"
                />
                <textarea
                  value={module.description}
                  onChange={(e) => updateModule(module.id, { description: e.target.value })}
                  rows={2}
                  className="w-full bg-gray-700 text-white p-2 rounded-lg text-sm"
                  placeholder="Descrição do módulo"
                />
              </div>
            </div>

            <div className="ml-12 space-y-3">
              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm">{lessonIndex + 1}.</span>
                    <input
                      type="text"
                      value={lesson.title}
                      className="flex-1 bg-gray-600 text-white p-2 rounded text-sm"
                      placeholder="Título da aula"
                    />
                    <select className="bg-gray-600 text-white p-2 rounded text-sm">
                      <option value="video">📹 Vídeo</option>
                      <option value="text">📝 Texto</option>
                      <option value="quiz">❓ Quiz</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-20 bg-gray-600 text-white p-2 rounded text-sm"
                    />
                  </div>
                </div>
              ))}
              
              <button
                onClick={() => addLesson(module.id)}
                className="w-full bg-gray-700 border-2 border-dashed border-gray-500 text-gray-400 py-3 rounded-lg hover:border-primary-500 hover:text-primary-500 transition-colors"
              >
                + Adicionar Aula
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PricingStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-medium mb-2">Preço do Curso (R$)*</label>
        <input
          type="number"
          value={course.price}
          onChange={(e) => setCourse(prev => ({ ...prev, price: Number(e.target.value) }))}
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="297"
        />
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4">Simulação de Receita</h4>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">R$ {(course.price * 0.7).toFixed(2)}</div>
            <div className="text-gray-400 text-sm">Sua parte (70%)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-400">R$ {(course.price * 0.3).toFixed(2)}</div>
            <div className="text-gray-400 text-sm">Taxa da plataforma (30%)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-400">R$ {course.price.toFixed(2)}</div>
            <div className="text-gray-400 text-sm">Preço final</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-white font-semibold">Objetivos de Aprendizado</h4>
        {course.learningOutcomes.map((outcome, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={outcome}
              onChange={(e) => {
                const newOutcomes = [...course.learningOutcomes];
                newOutcomes[index] = e.target.value;
                setCourse(prev => ({ ...prev, learningOutcomes: newOutcomes }));
              }}
              className="flex-1 bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="O que o aluno será capaz de fazer?"
            />
          </div>
        ))}
        <button
          onClick={() => setCourse(prev => ({ ...prev, learningOutcomes: [...prev.learningOutcomes, ''] }))}
          className="text-primary-400 hover:text-primary-300 transition-colors"
        >
          + Adicionar objetivo
        </button>
      </div>
    </div>
  );

  const ReviewStep = () => (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Resumo do Curso</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-primary-400 font-semibold mb-2">Informações Básicas</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-400">Título:</span> <span className="text-white">{course.title}</span></div>
              <div><span className="text-gray-400">Categoria:</span> <span className="text-white">{course.category}</span></div>
              <div><span className="text-gray-400">Nível:</span> <span className="text-white">{course.level}</span></div>
              <div><span className="text-gray-400">Preço:</span> <span className="text-white">R$ {course.price}</span></div>
            </div>
          </div>
          <div>
            <h4 className="text-primary-400 font-semibold mb-2">Estatísticas</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-400">Módulos:</span> <span className="text-white">{course.modules.length}</span></div>
              <div><span className="text-gray-400">Aulas:</span> <span className="text-white">{getTotalLessons()}</span></div>
              <div><span className="text-gray-400">Duração:</span> <span className="text-white">{Math.round(getTotalDuration() / 60)}h</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onSave?.(course)}
          className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Salvar Rascunho
        </button>
        <button
          onClick={() => onPublish?.(course)}
          className="flex-1 bg-primary-500 text-black py-3 rounded-lg font-medium hover:bg-primary-400 transition-colors"
        >
          Publicar Curso
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setCurrentStep(index)}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                  index === currentStep
                    ? 'bg-primary-500 text-black'
                    : index < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {index < currentStep ? '✓' : step.icon}
              </button>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${index < currentStep ? 'bg-green-500' : 'bg-gray-700'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{steps[currentStep].title}</h1>
        </div>

        {/* Step Content */}
        <div className="bg-gray-900 rounded-2xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && <BasicInfoStep />}
              {currentStep === 1 && <CurriculumStep />}
              {currentStep === 2 && <PricingStep />}
              {currentStep === 3 && <ReviewStep />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {currentStep < 3 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="px-6 py-3 bg-primary-500 text-black rounded-lg font-medium hover:bg-primary-400 transition-colors"
            >
              Próximo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseBuilder;
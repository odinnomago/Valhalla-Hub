'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  color: string;
  subcategories: string[];
}

const CategoryGrid: React.FC = () => {
  const router = useRouter();

  const categories: Category[] = [
    {
      id: 'musicians',
      name: 'Músicos',
      description: 'Instrumentistas e vocalistas para todos os gêneros',
      icon: '',
      count: 1248,
      color: 'from-primary/20 to-primary/30',
      subcategories: ['Guitarristas', 'Vocalistas', 'Baixistas', 'Bateristas', 'Tecladistas']
    },
    {
      id: 'technicians',
      name: 'Técnicos',
      description: 'Som, iluminação e especialistas de palco',
      icon: '',
      count: 892,
      color: 'from-accent/20 to-accent/30',
      subcategories: ['Técnicos de Som', 'Iluminação', 'Roadies', 'Operadores de PA']
    },
    {
      id: 'producers',
      name: 'Produtores',
      description: 'Beatmakers e produtores musicais',
      icon: '',
      count: 567,
      color: 'from-primary/15 to-accent/25',
      subcategories: ['Produtores Musicais', 'Beatmakers', 'Mixagem', 'Mastering']
    },
    {
      id: 'djs',
      name: 'DJs',
      description: 'DJs para todos os estilos e eventos',
      icon: '',
      count: 734,
      color: 'from-accent/25 to-primary/20',
      subcategories: ['DJ Eventos', 'DJ Casamentos', 'DJ Corporativo', 'DJ Baladas']
    },
    {
      id: 'creatives',
      name: 'Criativos',
      description: 'Fotógrafos, designers e videomakers',
      icon: '',
      count: 423,
      color: 'from-primary/20 to-accent/20',
      subcategories: ['Fotógrafos', 'Designers', 'Videomakers', 'Motion Graphics']
    },
    {
      id: 'events',
      name: 'Eventos',
      description: 'Produtores e equipes especializadas',
      icon: '',
      count: 356,
      color: 'from-accent/30 to-primary/25',
      subcategories: ['Produtores de Eventos', 'Coordenadores', 'Segurança', 'Logística']
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/bookings/search?category=${categoryId}`);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-headline">
          Escolha a Categoria
        </h2>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Encontre exatamente o tipo de profissional que você precisa para seu projeto
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => handleCategoryClick(category.id)}
            className="group cursor-pointer"
          >
            <div className={`netflix-card bg-gradient-to-br ${category.color} backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group-hover:scale-105 bg-card/50`}>
              {/* Category Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-foreground/70 text-sm mb-3">
                  {category.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-card/50 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-foreground/80 text-sm">
                    {category.count.toLocaleString()} disponíveis
                  </span>
                </div>
              </div>

              {/* Subcategories */}
              <div className="space-y-2">
                <h4 className="text-foreground font-semibold text-sm mb-3">Especialidades:</h4>
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.map((sub, idx) => (
                    <span
                      key={idx}
                      className="bg-card/50 text-foreground/70 text-xs px-3 py-1 rounded-full border border-border/50"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 text-center">
                <button className="netflix-button bg-primary/20 text-primary px-6 py-2 rounded-lg font-medium hover:bg-primary/30 transition-colors">
                  Ver Profissionais →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popular Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <h3 className="text-xl font-bold text-foreground mb-6">Serviços Mais Procurados</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Guitarrista para Gravação',
            'DJ para Casamento',
            'Técnico de Som',
            'Vocalista Feminina',
            'Produtor de Hip Hop',
            'Fotógrafo de Shows',
            'Beatmaker Trap',
            'Mixagem e Master'
          ].map((service, index) => (
            <motion.button
              key={service}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.0 + index * 0.05 }}
              onClick={() => router.push(`/bookings/search?q=${encodeURIComponent(service)}`)}
              className="bg-card/50 backdrop-blur-sm border border-border text-foreground/70 px-4 py-2 rounded-lg hover:bg-card hover:text-foreground hover:border-primary/50 transition-all text-sm"
            >
              {service}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryGrid;
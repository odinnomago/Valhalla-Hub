'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Heart,
  Bookmark,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonsProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    slug?: string;
  };
  className?: string;
  variant?: 'floating' | 'inline';
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  post, 
  className = '',
  variant = 'floating'
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const shareUrl = `https://valhallahub.com.br/blog/${post.slug || post.id}`;
  const shareTitle = post.title;
  const shareDescription = post.excerpt;

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}&via=valhallahub`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareDescription)}`
    };

    if (urls[platform as keyof typeof urls]) {
      window.open(
        urls[platform as keyof typeof urls], 
        '_blank', 
        'width=600,height=400,scrollbars=yes,resizable=yes'
      );
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    // Here you would integrate with your like system
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // Here you would integrate with your bookmark system
  };

  const shareButtons = [
    {
      platform: 'facebook',
      icon: Facebook,
      label: 'Facebook',
      color: 'hover:text-blue-600',
      action: () => handleShare('facebook')
    },
    {
      platform: 'twitter',
      icon: Twitter,
      label: 'Twitter',
      color: 'hover:text-blue-400',
      action: () => handleShare('twitter')
    },
    {
      platform: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      color: 'hover:text-blue-700',
      action: () => handleShare('linkedin')
    },
    {
      platform: 'copy',
      icon: copied ? Check : Copy,
      label: copied ? 'Copiado!' : 'Copiar Link',
      color: copied ? 'text-green-500' : 'hover:text-foreground',
      action: copyToClipboard
    }
  ];

  const actionButtons = [
    {
      icon: Heart,
      label: liked ? 'Curtido' : 'Curtir',
      color: liked ? 'text-red-500' : 'hover:text-red-500',
      action: handleLike,
      active: liked
    },
    {
      icon: Bookmark,
      label: bookmarked ? 'Salvo' : 'Salvar',
      color: bookmarked ? 'text-yellow-500' : 'hover:text-yellow-500',
      action: handleBookmark,
      active: bookmarked
    }
  ];

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center gap-4 ${className}`}>
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Compartilhar:</span>
        </div>
        
        {shareButtons.map((button) => {
          const Icon = button.icon;
          return (
            <motion.button
              key={button.platform}
              onClick={button.action}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-card/50 hover:bg-card/80 transition-colors text-sm ${button.color}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{button.label}</span>
            </motion.button>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div 
      className={`flex flex-col gap-3 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        {actionButtons.map((button) => {
          const Icon = button.icon;
          return (
            <motion.div
              key={button.label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={button.action}
                className={`w-12 h-12 p-0 rounded-full bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 shadow-lg ${button.color} group`}
                title={button.label}
              >
                <Icon className={`w-5 h-5 transition-all duration-300 ${button.active ? 'scale-110' : 'group-hover:scale-110'}`} />
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Separator */}
      <div className="w-8 h-px bg-border/50 mx-auto" />

      {/* Share Buttons */}
      <div className="flex flex-col gap-2">
        {shareButtons.map((button, index) => {
          const Icon = button.icon;
          return (
            <motion.div
              key={button.platform}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={button.action}
                className={`w-12 h-12 p-0 rounded-full bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 shadow-lg ${button.color} group`}
                title={button.label}
              >
                <Icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Share Count (Mock) */}
      <motion.div 
        className="text-center mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="text-xs text-muted-foreground">
          <div className="font-semibold">234</div>
          <div>shares</div>
        </div>
      </motion.div>

      {/* Floating Animation */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-lg shadow-lg whitespace-nowrap"
          >
            Link copiado!
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-green-500 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShareButtons;
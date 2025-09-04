// Performance optimization utilities

// Lazy loading components
export const lazyLoad = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const component = entry.target;
        // In a real implementation, this would dynamically import the component
        // import(`./components/${component.dataset.component}.js`)
        //   .then(module => module.default(component));
        observer.unobserve(component);
      }
    });
  });
  
  document.querySelectorAll('[data-component]').forEach(el => {
    observer.observe(el);
  });
};

// Optimized image component
export const optimizedImage = (src: string, alt: string) => {
  return `
    <picture>
      <source srcset="${src}?format=webp" type="image/webp">
      <source srcset="${src}?format=jpg" type="image/jpeg">
      <img src="${src}" loading="lazy" alt="${alt}" class="optimized-image">
    </picture>
  `;
};

// Performance metrics tracking
export const trackPerformance = () => {
  // In a real implementation, this would use the Performance API
  // and send metrics to an analytics service
  
  const navigationStart = performance.timing.navigationStart;
  
  // First Contentful Paint (FCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('FCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['paint'] });
  
  // Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });
  
  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    console.log('CLS:', clsValue);
  }).observe({ entryTypes: ['layout-shift'] });
};

// A/B Testing utility
export const abTest = (variantA: any, variantB: any) => {
  const userSegment = Math.random() > 0.5 ? 'A' : 'B';
  return userSegment === 'A' ? variantA : variantB;
};

// User feedback collection
export const collectFeedback = (action: string) => {
  // Collect feedback after important actions
  if (action === 'upload') {
    setTimeout(() => {
      // In a real implementation, this would show a feedback modal
      console.log('Collecting feedback for upload action');
    }, 5000);
  }
};

// Memory management
export const manageMemory = () => {
  // Clean up event listeners and references
  // This would be called when components unmount
  console.log('Managing memory usage');
};

// Cache management
export const manageCache = () => {
  // Implement cache strategies
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};
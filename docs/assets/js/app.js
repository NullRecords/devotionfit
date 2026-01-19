// ===================================
// Influencer Platform - Main App JS
// Progressive Web App Functionality
// ===================================

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration.scope);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ===================================
// Smooth Scrolling Enhancement
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// PWA Install Prompt
// ===================================
let deferredPrompt;
const installPrompt = document.getElementById('install-prompt');
const installBtn = document.getElementById('install-btn');
const dismissBtn = document.getElementById('dismiss-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Check if user dismissed before
  if (!localStorage.getItem('pwa-dismissed')) {
    setTimeout(() => {
      installPrompt?.classList.remove('hidden');
    }, 3000);
  }
});

installBtn?.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('PWA install outcome:', outcome);
    deferredPrompt = null;
    installPrompt?.classList.add('hidden');
  }
});

dismissBtn?.addEventListener('click', () => {
  installPrompt?.classList.add('hidden');
  localStorage.setItem('pwa-dismissed', 'true');
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with data-animate attribute
document.querySelectorAll('[data-animate]').forEach(el => {
  observer.observe(el);
});

// ===================================
// Form Handling
// ===================================
const contactForm = document.querySelector('form');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  // Simulate form submission (replace with actual endpoint)
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Success state
  submitBtn.textContent = '✓ Message Sent!';
  submitBtn.classList.add('bg-green-600', 'hover:bg-green-500');
  submitBtn.classList.remove('bg-primary-600', 'hover:bg-primary-500');
  
  // Reset form
  contactForm.reset();
  
  // Reset button after 3 seconds
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.classList.remove('bg-green-600', 'hover:bg-green-500');
    submitBtn.classList.add('bg-primary-600', 'hover:bg-primary-500');
  }, 3000);
});

// ===================================
// Navbar Background on Scroll
// ===================================
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add background opacity on scroll
  if (currentScroll > 50) {
    nav?.classList.add('bg-slate-900/80');
  } else {
    nav?.classList.remove('bg-slate-900/80');
  }
  
  lastScroll = currentScroll;
});

// ===================================
// Haptic Feedback for Touch Devices
// ===================================
if ('vibrate' in navigator) {
  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('touchstart', () => {
      navigator.vibrate(10);
    }, { passive: true });
  });
}

// ===================================
// Prevent Pull-to-Refresh on Mobile
// ===================================
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  const touchY = e.touches[0].clientY;
  const touchDiff = touchY - touchStartY;
  
  if (touchDiff > 0 && window.scrollY === 0) {
    e.preventDefault();
  }
}, { passive: false });

console.log('🚀 Influencer Platform loaded');

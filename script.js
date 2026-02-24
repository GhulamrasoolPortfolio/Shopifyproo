/* ============================================
   ShopifyPro Agency - Main Script
   script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Page transitions removed for instant navigation

  // ============================================
  // NAVBAR SCROLL & ACTIVE LINK
  // ============================================
  const navbar = document.querySelector('.navbar');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // ============================================
  // HAMBURGER MENU
  // ============================================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks?.classList.toggle('open');
  });

  // ============================================
  // SCROLL REVEAL
  // ============================================
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current) + suffix;
          if (current < target) requestAnimationFrame(update);
        };
        update();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ============================================
  // RIPPLE EFFECT ON BUTTONS
  // ============================================
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.cssText = `left:${x}px;top:${y}px;width:20px;height:20px;margin:-10px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // ============================================
  // ANIMATED PARTICLES (HERO)
  // ============================================
  const particleContainer = document.querySelector('.particles');
  if (particleContainer) {
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 20 + 8;
      const left = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 10 + 8;
      p.style.cssText = `width:${size}px;height:${size}px;left:${left}%;animation-duration:${duration}s;animation-delay:${delay}s`;
      particleContainer.appendChild(p);
    }
  }

  // ============================================
  // MODAL SYSTEM (PORTFOLIO)
  // ============================================
  const projectCards = document.querySelectorAll('[data-modal]');
  const modalOverlay = document.getElementById('projectModal');
  const modalClose = document.querySelector('.modal-close');

  if (modalOverlay && projectCards.length) {
    projectCards.forEach(card => {
      card.querySelector('.overlay-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(card.dataset);
      });
      card.addEventListener('click', () => openModal(card.dataset));
    });

    function openModal(data) {
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-desc').textContent = data.desc;
      document.getElementById('modal-fullDesc').textContent = data.fulldesc;
      const techContainer = document.getElementById('modal-tech');
      techContainer.innerHTML = '';
      (data.tech || '').split(',').forEach(t => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = t.trim();
        techContainer.appendChild(tag);
      });
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    modalClose?.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // ============================================
  // HERO TEXT ANIMATION (TYPED EFFECT)
  // ============================================
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const words = ['Shopify Stores', 'Custom Themes', 'Shopify Apps', 'Store Growth'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
      const word = words[wordIndex];
      if (!isDeleting) {
        typedEl.textContent = word.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === word.length) {
          isDeleting = true;
          setTimeout(typeEffect, 1800);
          return;
        }
      } else {
        typedEl.textContent = word.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(typeEffect, isDeleting ? 60 : 100);
    }
    typeEffect();
  }

  // ============================================
  // CONTACT FORM HANDLING
  // ============================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      }, 1500);
    });
  }

  // ============================================
  // 3D CARD TILT EFFECT
  // ============================================
  document.querySelectorAll('.service-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ============================================
  // SMOOTH ANCHOR SCROLLING
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // PORTFOLIO FILTER
  // ============================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectItems.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  // ============================================
  // BACK TO TOP
  // ============================================
  const backTop = document.createElement('button');
  backTop.innerHTML = '↑';
  backTop.className = 'back-to-top';
  backTop.style.cssText = `
    position:fixed;bottom:2rem;right:2rem;z-index:500;
    width:48px;height:48px;border-radius:50%;border:none;
    background:var(--gradient);color:white;font-size:1.2rem;cursor:pointer;
    box-shadow:0 8px 25px rgba(0,0,0,0.2);
    opacity:0;transform:translateY(20px);pointer-events:none;
    transition:opacity 0.3s,transform 0.3s;
  `;
  document.body.appendChild(backTop);
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backTop.style.opacity = '1';
      backTop.style.transform = 'translateY(0)';
      backTop.style.pointerEvents = 'all';
    } else {
      backTop.style.opacity = '0';
      backTop.style.transform = 'translateY(20px)';
      backTop.style.pointerEvents = 'none';
    }
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

});

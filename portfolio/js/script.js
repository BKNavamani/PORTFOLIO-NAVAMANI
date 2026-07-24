/**
 * ALEX CARTER - EDITORIAL PERSONAL PORTFOLIO WEBSITE
 * Primary JavaScript File (script.js)
 * Implements sticky navbar, typing effect, portfolio filters, stats counter,
 * scroll progress bar, scroll reveal, form validation, and project modal logic.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. SCROLL PROGRESS BAR
  // --------------------------------------------------------------------------
  const scrollProgress = document.getElementById('scroll-progress');
  
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  }

  // --------------------------------------------------------------------------
  // 2. STICKY NAVBAR & ACTIVE LINK SCROLLSPY
  // --------------------------------------------------------------------------
  const navbar = document.querySelector('.custom-navbar');
  const navLinks = document.querySelectorAll('.custom-navbar .nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar?.classList.add('navbar-scrolled');
    } else {
      navbar?.classList.remove('navbar-scrolled');
    }

    // Scrollspy active section detection
    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    handleNavbarScroll();
  });

  // Mobile nav item auto-close on click
  const navbarCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse?.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        bsCollapse?.hide();
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. TYPING ANIMATION EFFECT
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  const phrases = [
    'Frontend Developer',
    'UI/UX Enthusiast',
    'B.Tech IT Student',
    'Creative Designer'
  ];

  if (typingElement) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before new word
      }

      setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1000);
  }

  // --------------------------------------------------------------------------
  // 4. PORTFOLIO FILTERING
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      filterBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.85)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. ANIMATED STATISTICS COUNTER
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  let statsTriggered = false;

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-count') || '0', 10);
      let count = 0;
      const duration = 2000; // 2 seconds
      const stepTime = Math.abs(Math.floor(duration / target));

      const timer = setInterval(() => {
        count += 1;
        stat.textContent = `${count}+`;
        if (count >= target) {
          stat.textContent = `${target}+`;
          clearInterval(timer);
        }
      }, Math.max(stepTime, 20));
    });
  }

  // IntersectionObserver for Stats Section
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsTriggered) {
        animateStats();
        statsTriggered = true;
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // --------------------------------------------------------------------------
  // 6. TECHNICAL SKILLS PROGRESS BARS
  // --------------------------------------------------------------------------
  const progressBars = document.querySelectorAll('.progress-bar[data-width]');
  let skillsTriggered = false;

  function animateSkills() {
    progressBars.forEach((bar) => {
      const width = bar.getAttribute('data-width') || '0%';
      bar.style.width = width;
    });
  }

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !skillsTriggered) {
        animateSkills();
        skillsTriggered = true;
      }
    }, { threshold: 0.25 });

    observer.observe(skillsSection);
  }

  // --------------------------------------------------------------------------
  // 7. INTERSECTION OBSERVER SCROLL REVEAL ANIMATIONS
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((el) => revealObserver.observe(el));

  // --------------------------------------------------------------------------
  // 8. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --------------------------------------------------------------------------
  // 9. CONTACT FORM EMAILJS INTEGRATION
  // --------------------------------------------------------------------------
  // EmailJS Configuration Keys
  const EMAILJS_PUBLIC_KEY = 'cdDogOr7TT44U7NIc';
  const EMAILJS_SERVICE_ID = 'service_02aw8uk';
  const EMAILJS_TEMPLATE_ID = 'template_q4d5m2k';

  // Initialize EmailJS Browser SDK with Public Key
  if (typeof emailjs !== 'undefined') {
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY,
    });
  }

  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');
      const captchaInput = document.getElementById('contact-captcha');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';
      const captcha = captchaInput ? captchaInput.value.trim() : '';

      // Validate all required fields
      if (!name || name.length < 2) {
        showFeedback('Please enter a valid full name.', 'danger');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showFeedback('Please enter a valid email address.', 'danger');
        return;
      }

      if (!subject || subject.length < 3) {
        showFeedback('Please enter a message subject.', 'danger');
        return;
      }

      if (!message || message.length < 10) {
        showFeedback('Please enter a message containing at least 10 characters.', 'danger');
        return;
      }

      if (captchaInput && captcha !== '8') {
        showFeedback('Security verification failed: 5 + 3 equals 8.', 'danger');
        return;
      }

      // Show loading state while sending via EmailJS
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '<i class="bi bi-send-fill me-2"></i> Send Message';
      if (submitBtn) {
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
        submitBtn.disabled = true;
      }

      // Prepare template parameters for EmailJS service
      const templateParams = {
        from_name: name,
        name: name,
        user_name: name,
        from_email: email,
        email: email,
        user_email: email,
        reply_to: email,
        subject: subject,
        message: message,
        to_email: 'navamanib01@gmail.com'
      };

      try {
        if (typeof emailjs === 'undefined') {
          throw new Error('EmailJS SDK is not loaded');
        }

        // Send email via EmailJS API
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);

        // Success state: display required success message & clear form
        showFeedback('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
      } catch (error) {
        console.error('EmailJS Submission Error:', error);
        // Failure state: display required failure message
        showFeedback('Failed to send message. Please try again.', 'danger');
      } finally {
        // Reset submit button state
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }
      }
    });
  }

  function showFeedback(msg, type) {
    if (!formFeedback) return;
    formFeedback.className = `alert alert-${type} mt-3 mb-0 text-start`;
    formFeedback.innerHTML = msg;
    formFeedback.classList.remove('d-none');
    
    setTimeout(() => {
      if (type === 'success') {
        formFeedback.classList.add('d-none');
      }
    }, 7000);
  }

  // --------------------------------------------------------------------------
  // 10. PROJECT DETAILS MODAL DYNAMIC POPULATOR
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  if (projectModal) {
    projectModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      if (!button) return;

      const title = button.getAttribute('data-title') || 'Project Details';
      const category = button.getAttribute('data-category') || 'Web Project';
      const image = button.getAttribute('data-image') || 'images/project1.jpg';
      const description = button.getAttribute('data-desc') || 'A comprehensive web application designed with modern UI principles.';
      const tools = button.getAttribute('data-tools') || 'HTML5, Bootstrap 5, JavaScript';

      const titleEl = document.getElementById('modalProjectTitle');
      const categoryEl = document.getElementById('modalProjectCategory');
      const descEl = document.getElementById('modalProjectDesc');
      const toolsEl = document.getElementById('modalProjectTools');
      const imgEl = document.getElementById('modalProjectImg');

      if (titleEl) titleEl.textContent = title;
      if (categoryEl) categoryEl.textContent = category;
      if (descEl) descEl.textContent = description;
      if (toolsEl) toolsEl.textContent = tools;
      if (imgEl) imgEl.src = image;
    });
  }

  // --------------------------------------------------------------------------
  // 11. CV DOWNLOAD TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  const downloadCvBtns = document.querySelectorAll('.btn-download-cv');
  downloadCvBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const toastEl = document.getElementById('downloadToast');
      if (toastEl && window.bootstrap && window.bootstrap.Toast) {
        const toast = new window.bootstrap.Toast(toastEl);
        toast.show();
      }
    });
  });

});

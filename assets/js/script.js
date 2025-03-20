document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (nav.classList.contains('active') && !nav.contains(event.target) && event.target !== mobileMenuBtn) {
      nav.classList.remove('active');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu after clicking a link
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
        }
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }
  
  // Contact form validation
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      
      // Simple validation
      let valid = true;
      
      if (!nameInput.value.trim()) {
        valid = false;
        markInvalid(nameInput, 'Name is required');
      } else {
        markValid(nameInput);
      }
      
      if (!emailInput.value.trim()) {
        valid = false;
        markInvalid(emailInput, 'Email is required');
      } else if (!isValidEmail(emailInput.value)) {
        valid = false;
        markInvalid(emailInput, 'Please enter a valid email address');
      } else {
        markValid(emailInput);
      }
      
      if (!messageInput.value.trim()) {
        valid = false;
        markInvalid(messageInput, 'Message is required');
      } else {
        markValid(messageInput);
      }
      
      if (valid) {
        // In a real scenario, you would submit the form to a server here
        // For now, we'll just show a success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thanks for your message! We\'ll get back to you soon.';
        
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
      }
    });
  }
  
  function markInvalid(element, message) {
    element.classList.add('invalid');
    
    // Remove existing error message if it exists
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    element.parentElement.appendChild(errorMessage);
  }
  
  function markValid(element) {
    element.classList.remove('invalid');
    
    // Remove error message if it exists
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Testimonials slider (if implemented)
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    // Simple implementation - in a real site you might use a library like Swiper
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;
    let currentTestimonial = 0;
    
    // Hide all except the first one
    testimonials.forEach((testimonial, index) => {
      if (index !== 0) {
        testimonial.style.display = 'none';
      }
    });
    
    // Next button
    const nextBtn = testimonialSlider.querySelector('.next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        testimonials[currentTestimonial].style.display = 'none';
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        testimonials[currentTestimonial].style.display = 'block';
      });
    }
    
    // Previous button
    const prevBtn = testimonialSlider.querySelector('.prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        testimonials[currentTestimonial].style.display = 'none';
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        testimonials[currentTestimonial].style.display = 'block';
      });
    }
  }
});

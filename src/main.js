// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGACIÓN MÓVIL =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ===== SCROLL SUAVE PARA NAVEGACIÓN =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== NAVBAR TRANSPARENTE AL HACER SCROLL =====
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(94, 8, 130, 0.95)';
        } else {
            navbar.style.background = 'rgba(94, 8, 130, 0.9)';
        }
    });
    
    // ===== ANIMACIONES AL HACER SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
    
    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });
    
    // ===== ANIMACIÓN DE BARRAS DE HABILIDADES =====
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validación básica
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        // Simular envío del formulario
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
// MANEJO DE BOTONES CON ENLACES Y DESCARGAS
document.querySelectorAll('.btn[data-url], [data-url]').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('data-url');
        
        if (url) {
            console.log('URL encontrada:', url); // Para debugging
            
            // Verificar si es un PDF o archivo para descargar
            if (url.includes('.pdf') || url.includes('download') || url.includes('attachment')) {
                // Crear enlace temporal para descarga
                const link = document.createElement('a');
                link.href = url;
                link.download = this.textContent.includes('CV') ? 'Cv-Mariana Maldonado IT 2025.pdf' : '';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                showNotification('Descarga iniciada', 'success');
            } else {
                // Para otros enlaces, abrir en nueva pestaña
                window.open(url, '_blank');
            }
        } else {
            console.log('No se encontró URL en data-url');
        }
    });
});
// DEBUGGING - Agrega esto temporalmente para ver qué pasa
document.addEventListener('DOMContentLoaded', function() {
    console.log('Botones encontrados:', document.querySelectorAll('[data-url]').length);
    document.querySelectorAll('[data-url]').forEach((btn, index) => {
        console.log(`Botón ${index}:`, btn.getAttribute('data-url'));
    });
});

    // ===== EFECTOS DE HOVER EN PROYECTOS =====
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== BOTONES CTA =====
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Ver Proyectos')) {
                e.preventDefault();
                document.querySelector('#proyectos').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== EFECTOS DE PARTÍCULAS EN EL FONDO =====
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            animation: particleFloat 8s linear infinite;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 8000);
    }
    
    // Crear partículas cada cierto tiempo
    setInterval(createParticle, 3000);
    
    // ===== CONTADOR ANIMADO EN ESTADÍSTICAS =====
    function animateNumbers() {
        const stats = document.querySelectorAll('.stat h4');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
            }, 20);
        });
    }
    
    // Observar sección de estadísticas
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // ===== TEMA OSCURO/CLARO (OPCIONAL) =====
    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    }
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    // ===== CURSOR PERSONALIZADO =====
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(212, 190, 240, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });
    
    // Efecto especial en elementos interactivos
    document.querySelectorAll('a, button, .project-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(212, 190, 240, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });
    
    // ===== LOADING SCREEN =====
    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #5e0882, #9c6dd4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        `;
        
        const spinner = document.createElement('div');
        spinner.style.cssText = `
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `;
        
        loader.appendChild(spinner);
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    });
    
    // ===== PARALAJE SUAVE =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.querySelectorAll('.floating-shapes .shape').forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    
    
});

// === FUNCIÓN PARA MOSTRAR SPINNER ===
function mostrarSpinner() {
  const spinner = document.getElementById("spinner");
  if (spinner) spinner.style.display = "block";
}

function ocultarSpinner() {
  const spinner = document.getElementById("spinner");
  if (spinner) spinner.style.display = "none";
}

// === FUNCIÓN PARA MOSTRAR NOTIFICACIONES ===
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
      color: white;
      border-radius: 8px;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
      word-wrap: break-word;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// === ENVÍO DEL FORMULARIO ===
document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.querySelector('input[placeholder="Tu Nombre"]').value;
  const email = document.querySelector('input[placeholder="Tu Email"]').value;
  const proyecto = document.querySelector('input[placeholder="¿Cuál es tu proyecto?"]').value;
  const mensaje = document.querySelector("textarea").value;

  mostrarSpinner();

  fetch("https://portfolio-ix55.onrender.com/enviar-formulario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, proyecto, mensaje }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al enviar");
      return res.text();
    })
    .then((data) => {
      showNotification("Mensaje enviado con éxito 🎉", "success");
      document.querySelector(".contact-form").reset();
    })
    .catch((err) => {
      showNotification("Hubo un error al enviar 😢", "error");
      console.error(err);
    })
    .finally(() => {
      ocultarSpinner();
    });
});


// Agregar estilos CSS dinámicos
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .light-theme {
        filter: invert(1) hue-rotate(180deg);
    }
    
    .light-theme img,
    .light-theme video {
        filter: invert(1) hue-rotate(180deg);
    }
    
    .notification {
        font-family: 'Gotham', sans-serif;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
`;

document.head.appendChild(dynamicStyles);
// ===== PARTICLE SYSTEM =====
function createParticles() {
    const particleContainers = document.querySelectorAll('.particles');
    
    particleContainers.forEach(container => {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(0, 242, 255, ${Math.random() * 0.5 + 0.3});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(particle);
        }
    });
    
    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translate(0, 0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, -1000px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== TYPEWRITER EFFECT =====
function typewriterEffect() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const texts = [
        'Innovating the Future Through Technology',
        'Excellence in Computer Education',
        'Shaping Tomorrow\'s Tech Leaders'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed = 50;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ===== MATRIX RAIN CANVAS =====
function createMatrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00f2ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Intersection Observer for triggering animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ===== SKILL BAR ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress[data-progress]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.setProperty('--progress', progress + '%');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== PROGRAM TABS SWITCHING =====
function switchProgram(programId) {
    // Hide all program contents
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected program
    const selectedContent = document.getElementById(programId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Add active class to clicked button
    const selectedButton = document.querySelector(`[data-tab="${programId}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}

// ===== FACULTY SEARCH AND FILTER =====
function performSearch() {
    filterFaculty();
}

function filterFaculty() {
    const searchTerm = document.getElementById('facultySearch')?.value.toLowerCase() || '';
    const facultyCards = document.querySelectorAll('.faculty-card');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;
    
    facultyCards.forEach(card => {
        const name = card.getAttribute('data-name')?.toLowerCase() || '';
        const spec = card.getAttribute('data-spec')?.toLowerCase() || '';
        const text = card.textContent.toLowerCase();
        
        if (name.includes(searchTerm) || spec.includes(searchTerm) || text.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

function filterByDepartment(dept) {
    const facultyCards = document.querySelectorAll('.faculty-card');
    const filterTags = document.querySelectorAll('.filter-tag');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;
    
    // Update active filter tag
    filterTags.forEach(tag => {
        tag.classList.remove('active');
    });
    event.target.classList.add('active');
    
    facultyCards.forEach(card => {
        const cardDept = card.getAttribute('data-dept');
        
        if (dept === 'all' || cardDept === dept) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

// Real-time search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('facultySearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterFaculty);
    }
});

// ===== ANNOUNCEMENTS FILTER =====
function filterAnnouncements(category) {
    const announcements = document.querySelectorAll('.announcement');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    announcements.forEach(announcement => {
        const announcementCategory = announcement.getAttribute('data-category');
        
        if (category === 'all' || announcementCategory === category) {
            announcement.style.display = 'block';
            announcement.style.animation = 'slideInLeft 0.5s';
        } else {
            announcement.style.display = 'none';
        }
    });
}

// ===== CONTACT FORM VALIDATION =====
function validateContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const inquiryType = document.getElementById('inquiryType');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Character counter for message
    if (message) {
        const charCount = document.getElementById('charCount');
        message.addEventListener('input', () => {
            const length = message.value.length;
            charCount.textContent = `${length} / 500 characters`;
            
            if (length > 500) {
                charCount.style.color = 'var(--error-color)';
            } else {
                charCount.style.color = 'var(--text-gray)';
            }
        });
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        let isValid = true;
        
        // Validate first name
        if (!firstName.value.trim()) {
            document.getElementById('firstNameError').textContent = 'First name is required';
            isValid = false;
        }
        
        // Validate last name
        if (!lastName.value.trim()) {
            document.getElementById('lastNameError').textContent = 'Last name is required';
            isValid = false;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            document.getElementById('emailError').textContent = 'Invalid email format';
            isValid = false;
        }
        
        // Validate inquiry type
        if (!inquiryType.value) {
            document.getElementById('inquiryTypeError').textContent = 'Please select an inquiry type';
            isValid = false;
        }
        
        // Validate subject
        if (!subject.value.trim()) {
            document.getElementById('subjectError').textContent = 'Subject is required';
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            document.getElementById('messageError').textContent = 'Message is required';
            isValid = false;
        } else if (message.value.length > 500) {
            document.getElementById('messageError').textContent = 'Message exceeds 500 characters';
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('show');
            
            // Reset form
            form.reset();
            document.getElementById('charCount').textContent = '0 / 500 characters';
            
            // Reset button state
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// ===== CANVAS ANIMATIONS =====
function initializeCanvases() {
    // About page canvas
    const aboutCanvas = document.getElementById('aboutCanvas');
    if (aboutCanvas) {
        const ctx = aboutCanvas.getContext('2d');
        aboutCanvas.width = aboutCanvas.offsetWidth;
        aboutCanvas.height = aboutCanvas.offsetHeight;
        
        let particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * aboutCanvas.width,
                y: Math.random() * aboutCanvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 2 + 1
            });
        }
        
        function drawAboutCanvas() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, aboutCanvas.width, aboutCanvas.height);
            
            ctx.fillStyle = '#00f2ff';
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
                
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > aboutCanvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > aboutCanvas.height) p.vy *= -1;
            });
            
            requestAnimationFrame(drawAboutCanvas);
        }
        
        drawAboutCanvas();
    }
    
    // Map canvas
    const mapCanvas = document.getElementById('mapCanvas');
    if (mapCanvas) {
        const ctx = mapCanvas.getContext('2d');
        mapCanvas.width = mapCanvas.offsetWidth;
        mapCanvas.height = mapCanvas.offsetHeight;
        
        function drawMap() {
            ctx.fillStyle = '#0f0c29';
            ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);
            
            // Draw grid
            ctx.strokeStyle = 'rgba(0, 242, 255, 0.3)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < mapCanvas.width; i += 20) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, mapCanvas.height);
                ctx.stroke();
            }
            
            for (let i = 0; i < mapCanvas.height; i += 20) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(mapCanvas.width, i);
                ctx.stroke();
            }
            
            // Draw location marker
            const centerX = mapCanvas.width / 2;
            const centerY = mapCanvas.height / 2;
            
            ctx.fillStyle = '#00f2ff';
            ctx.beginPath();
            ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = '#00f2ff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        drawMap();
    }
    
    // Facility canvases
    const facilityCanvases = document.querySelectorAll('.facility-canvas');
    facilityCanvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const type = canvas.getAttribute('data-type');
        
        function drawFacility() {
            ctx.fillStyle = '#0f0c29';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = '#00f2ff';
            ctx.lineWidth = 2;
            
            switch (type) {
                case 'lab':
                    // Draw computer screens
                    for (let i = 0; i < 5; i++) {
                        const x = (i + 1) * (canvas.width / 6);
                        const y = canvas.height / 2;
                        ctx.strokeRect(x - 20, y - 15, 40, 30);
                    }
                    break;
                case 'ai':
                    // Draw neural network
                    ctx.beginPath();
                    for (let i = 0; i < 4; i++) {
                        const x = canvas.width / 2;
                        const y = (i + 1) * (canvas.height / 5);
                        ctx.arc(x, y, 5, 0, Math.PI * 2);
                    }
                    ctx.stroke();
                    break;
                case 'network':
                    // Draw network nodes
                    const nodes = 6;
                    for (let i = 0; i < nodes; i++) {
                        const angle = (i / nodes) * Math.PI * 2;
                        const x = canvas.width / 2 + Math.cos(angle) * 60;
                        const y = canvas.height / 2 + Math.sin(angle) * 60;
                        ctx.beginPath();
                        ctx.arc(x, y, 5, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                    break;
                case 'cloud':
                    // Draw cloud
                    ctx.beginPath();
                    ctx.arc(canvas.width / 2 - 20, canvas.height / 2, 20, 0, Math.PI * 2);
                    ctx.arc(canvas.width / 2 + 20, canvas.height / 2, 20, 0, Math.PI * 2);
                    ctx.arc(canvas.width / 2, canvas.height / 2 - 15, 20, 0, Math.PI * 2);
                    ctx.stroke();
                    break;
            }
        }
        
        drawFacility();
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===== 3D TILT EFFECT =====
function init3DTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ===== FLOATING NAVIGATION =====
let lastScroll = 0;
function initFloatingNav() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    typewriterEffect();
    createMatrixRain();
    animateCounters();
    animateSkillBars();
    validateContactForm();
    initializeCanvases();
    initScrollAnimations();
    initSmoothScroll();
    init3DTilt();
    initFloatingNav();
    updateActiveNavLink();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', () => {
    createMatrixRain();
    initializeCanvases();
});

// Make functions globally available
window.switchProgram = switchProgram;
window.filterFaculty = filterFaculty;
window.filterByDepartment = filterByDepartment;
window.filterAnnouncements = filterAnnouncements;
window.performSearch = performSearch;
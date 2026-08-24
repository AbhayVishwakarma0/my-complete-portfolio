const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('#navMenu a');
const sections = document.querySelectorAll('main section');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.innerHTML = isOpen
        ? "<i class='bx bx-x'></i>"
        : "<i class='bx bx-menu'></i>";
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        if (menuToggle) menuToggle.innerHTML = "<i class='bx bx-menu'></i>";
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.parentElement.classList.remove('active'));
            const active = document.querySelector(`#navMenu a[href="#${entry.target.id}"]`);
            active?.parentElement.classList.add('active');
        }
    });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('waName')?.value.trim() || '';
        const phone = document.getElementById('waPhone')?.value.trim() || '';
        const city = document.getElementById('waCity')?.value.trim() || '';
        const message = document.getElementById('waMessage')?.value.trim() || '';

        const text = `Hello Abhay, I would like to discuss a project.%0A%0AName: ${encodeURIComponent(name)}%0AMobile / Contact Number: ${encodeURIComponent(phone)}%0ACity: ${encodeURIComponent(city)}%0AMessage: ${encodeURIComponent(message)}`;
        window.open(`https://wa.me/919026619235?text=${text}`, '_blank', 'noopener,noreferrer');
    });
}
/* Service details popup */
const serviceModal = document.getElementById('serviceModal');
const serviceTitle = document.getElementById('serviceModalTitle');
const serviceDescription = document.getElementById('serviceModalDescription');
const serviceList = document.getElementById('serviceModalList');
const serviceIcon = document.getElementById('serviceModalIcon');
const serviceDetails = {
  'Web Development': {icon:'bx-code-alt', desc:'Responsive, modern websites and web applications built around usability, performance and business goals.', items:['Responsive website development','Landing pages and portfolio websites','Frontend UI implementation','Forms and interactive features','Performance and mobile optimisation']},
  'UI/UX Designing': {icon:'bxs-paint', desc:'Clean and intuitive interface design that gives users a clear path through a website or digital product.', items:['Website UI design','User-friendly page layouts','Mobile-first interface thinking','Visual hierarchy and typography','Design improvements and refinements']},
  'Graphic Designing': {icon:'bx-palette', desc:'Creative visual design for digital communication, branding and online content.', items:['Social media creatives','Digital banners and graphics','Promotional designs','Visual branding support','Custom creative assets']},
  'Search Engine Optimization': {icon:'bx-bar-chart-alt', desc:'Practical SEO improvements focused on discoverability, content structure and a search-friendly website experience.', items:['On-page SEO basics','Metadata and heading structure','Content structure improvements','Mobile and performance considerations','Search-friendly page optimisation']},
  'Video Editing': {icon:'bx-slideshow', desc:'Engaging video editing for social media, promotional content and digital storytelling.', items:['Short-form social videos','Promotional video editing','Cuts, transitions and pacing','Text and basic motion elements','Platform-ready exports']},
  'Back Office': {icon:'bx-chalkboard', desc:'Digital back-office support for content, data handling and day-to-day online business operations.', items:['Data and content handling','Website content updates','Digital documentation support','Online workflow assistance','Routine administrative support']}
};
function openServiceModal(name){const d=serviceDetails[name];if(!d||!serviceModal)return;serviceTitle.textContent=name;serviceDescription.textContent=d.desc;serviceList.innerHTML=d.items.map(x=>`<li>${x}</li>`).join('');serviceIcon.className=`bx ${d.icon}`;serviceModal.classList.add('open');serviceModal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeServiceModal(){if(!serviceModal)return;serviceModal.classList.remove('open');serviceModal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelectorAll('.service-details-btn').forEach(b=>b.addEventListener('click',()=>openServiceModal(b.dataset.service)));
document.querySelectorAll('[data-close-service]').forEach(x=>x.addEventListener('click',closeServiceModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeServiceModal();});
document.getElementById('serviceModalContact')?.addEventListener('click',closeServiceModal);

/* Portfolio carousel: supports additional project cards when added later. */
const portfolioCarousel = document.getElementById('portfolioCarousel');
if (portfolioCarousel) {
    const track = portfolioCarousel.querySelector('.portfolio-track');
    const cards = Array.from(portfolioCarousel.querySelectorAll('.project-card'));
    const prevBtn = portfolioCarousel.querySelector('.portfolio-prev');
    const nextBtn = portfolioCarousel.querySelector('.portfolio-next');
    const resetBtn = portfolioCarousel.querySelector('.portfolio-reset');
    let portfolioIndex = 0;

    const visibleCards = () => {
        if (window.innerWidth <= 760) return 1;
        if (window.innerWidth <= 1050) return 2;
        return 3;
    };

    function updatePortfolio() {
        const visible = visibleCards();
        const maxIndex = Math.max(0, cards.length - visible);
        portfolioIndex = Math.min(portfolioIndex, maxIndex);
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const cardWidth = cards[0]?.getBoundingClientRect().width || 0;
        track.style.transform = `translateX(-${portfolioIndex * (cardWidth + gap)}px)`;
        prevBtn.disabled = portfolioIndex === 0;
        nextBtn.disabled = portfolioIndex >= maxIndex;
        prevBtn.style.opacity = prevBtn.disabled ? '.35' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '.35' : '1';
    }

    prevBtn?.addEventListener('click', () => { portfolioIndex--; updatePortfolio(); });
    nextBtn?.addEventListener('click', () => { portfolioIndex++; updatePortfolio(); });
    resetBtn?.addEventListener('click', () => {
        portfolioIndex = 0;
        updatePortfolio();
        portfolioCarousel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    window.addEventListener('resize', updatePortfolio);
    window.addEventListener('load', updatePortfolio);
    updatePortfolio();
}

/* Prevent placeholder live-preview links from opening a fake URL. */
document.querySelectorAll('.live-preview-link').forEach(link => {
    link.addEventListener('click', (event) => {
        if ((link.getAttribute('href') || '').startsWith('YOUR-LIVE-PREVIEW')) {
            event.preventDefault();
            alert('Please replace this button URL with the live preview URL of this project in index.html.');
        }
    });
});

/* Client-side color preference: stored only in the visitor's browser. */
(function () {
    const toggle = document.getElementById('themeToggle');
    const palette = document.getElementById('themePalette');
    const swatches = document.querySelectorAll('.theme-swatch');
    if (!toggle || !palette) return;

    const allowedThemes = ['emerald', 'ocean', 'blue', 'indigo', 'violet', 'magenta', 'rose', 'coral', 'amber', 'lime', 'cyan', 'teal'];
    const saved = localStorage.getItem('portfolio-theme');
    const initial = allowedThemes.includes(saved) ? saved : 'emerald';

    document.body.dataset.theme = initial;
    swatches.forEach(s => s.classList.toggle('active', s.dataset.theme === initial));

    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const open = palette.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
    });

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const theme = swatch.dataset.theme;
            if (!allowedThemes.includes(theme)) return;

            document.body.dataset.theme = theme;
            localStorage.setItem('portfolio-theme', theme);
            swatches.forEach(s => s.classList.toggle('active', s === swatch));
            palette.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.theme-picker')) {
            palette.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            palette.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
})();


/* Experience navigation: a tiny control that scrolls through the timeline.
   It also supports any additional experience entries added later. */
(function () {
    const timeline = document.querySelector('.experience-timeline');
    const next = document.querySelector('.experience-next');
    const items = timeline ? Array.from(timeline.querySelectorAll('.experience-item')) : [];
    if (!timeline || !next || items.length < 2) return;

    let index = 0;
    const update = () => {
        next.innerHTML = index >= items.length - 1
            ? "<i class='bx bx-chevron-up' aria-hidden='true'></i>"
            : "<i class='bx bx-chevron-down' aria-hidden='true'></i>";
        next.setAttribute('aria-label', index >= items.length - 1 ? 'Back to first experience' : 'View next experience');
        next.title = index >= items.length - 1 ? 'Back to first experience' : 'View next experience';
    };

    next.addEventListener('click', () => {
        index = index >= items.length - 1 ? 0 : index + 1;
        items[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        update();
    });
    update();
})();

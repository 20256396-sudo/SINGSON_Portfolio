// ── Reel Modal ──
const reelPreview = document.getElementById('reelPreview');
const modal = document.getElementById('videoModal');
const player = document.getElementById('youtubePlayer');
const closeBtn = document.getElementById('closeModal');

reelPreview.addEventListener('click', () => {
    modal.style.display = 'flex';
    player.src = "https://www.youtube.com/embed/G6Rr-7USs3s?autoplay=1";
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    player.src = "";
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        player.src = "";
    }
});


// ── Sticky Nav ──
const nav = document.getElementById('site-nav');
const NAV_H = nav.offsetHeight;

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});


// ── Smooth Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const top = target.getBoundingClientRect().top + window.scrollY - NAV_H;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});


// ── Video Fallback ──
const iframe = document.querySelector('.video-container iframe');
const fallback = document.getElementById('videoFallback');

setTimeout(() => {
    try {
        if (!iframe.contentWindow || iframe.contentWindow.length === 0) {
            iframe.style.display = 'none';
            fallback.style.display = 'flex';
        }
    } catch (e) {
        iframe.style.display = 'none';
        fallback.style.display = 'flex';
    }
}, 5000);


// ── Projects ──
const allProjects = [
    {
        title: "Yden - Petsa",
        description: "Official collaboration | DoP, Editor, Cam Op",
        category: "music",
        link: "https://www.youtube.com/watch?v=akB8z58a1_g",
        thumbnail: "https://img.youtube.com/vi/akB8z58a1_g/maxresdefault.jpg"
    },
    {
        title: "Kyupone - Ilaw Sa'king Pag-uwi",
        description: "Lyric Video Collaboration",
        category: "music",
        link: "https://www.youtube.com/watch?v=C53Hs1FQO7E",
        thumbnail: "https://img.youtube.com/vi/C53Hs1FQO7E/maxresdefault.jpg"
    },
    {
        title: "Kyupone - Guni-Guni",
        description: "Artist Visuals Collaboration",
        category: "music",
        link: "https://www.youtube.com/watch?v=-bCYs6H6DE4",
        thumbnail: "https://img.youtube.com/vi/-bCYs6H6DE4/maxresdefault.jpg"
    },
    {
        title: "University of the Cordilleras",
        description: "Promotional video advertisement | Director, Editor",
        category: "commercial",
        link: "https://www.facebook.com/UCjaguars/videos/1144622297864521/",
        thumbnail: "https://i.imgur.com/CKqMwAR.png"
    },
    {
        title: "SM City Baguio Skyranch Collab",
        description: "Promotional video advertisement | Responsible for Everything",
        category: "commercial",
        link: "https://www.facebook.com/rainniersingson/videos/1574239629712740/",
        thumbnail: "https://i.imgur.com/Jkq2kJw.png"
    },
    {
        title: "Multo Astral Projection VFX",
        description: "4M+ views",
        category: "vfx",
        link: "https://www.tiktok.com/@rainniersingson/video/7535230911009361160",
        thumbnail: "https://i.imgur.com/HAsviZt.png"
    },
    {
        title: "Flying Whales 3D VFX",
        description: "1M+ views across platforms",
        category: "vfx",
        link: "https://www.tiktok.com/@rainniersingson/video/7353208212868517126",
        thumbnail: "https://i.imgur.com/ol4fI5v.png"
    },
    {
        title: "MANAMo Seanehan Entry (2nd Place)",
        description: "Award-winning school film project | Director, Editor",
        category: "films",
        link: "https://www.youtube.com/watch?v=K2FGMtfi894",
        thumbnail: "https://img.youtube.com/vi/K2FGMtfi894/maxresdefault.jpg"
    },
    {
        title: "Reach Out To Me",
        description: "School short film project | Responsible for Everything",
        category: "films",
        link: "https://www.youtube.com/watch?v=GzMxT3lxtmM",
        thumbnail: "https://img.youtube.com/vi/GzMxT3lxtmM/maxresdefault.jpg"
    },
    {
        title: "Katok",
        description: "School short film project | Cinematographer, Editor",
        category: "films",
        link: "https://www.facebook.com/100023704280367/videos/452459743675838/",
        thumbnail: "https://i.imgur.com/MmUXmuS.png"
    }
];

let activeTab = 'all';

function getCategoryLabel(category) {
    const labels = {
        music: 'Music Video',
        commercial: 'Commercial',
        vfx: 'Visual Effects',
        films: 'Film'
    };
    return labels[category] || category;
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');

    const filtered = activeTab === 'all'
        ? allProjects
        : allProjects.filter(p => p.category === activeTab);

    emptyState.classList.add('hidden');
    grid.classList.remove('hidden');

    grid.innerHTML = filtered.map(project => `
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-card">
            <div class="project-thumbnail">
                ${project.thumbnail
                    ? `<img src="${project.thumbnail}" alt="${project.title}">`
                    : `<div class="project-placeholder">${project.title.charAt(0)}</div>`
                }
                <div class="project-overlay">
                    <div class="play-button">
                        <div class="play-icon"></div>
                    </div>
                </div>
            </div>
            <div>
                <p class="project-category">${getCategoryLabel(project.category)}</p>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
            </div>
        </a>
    `).join('');
}

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        activeTab = this.dataset.tab;
        renderProjects();
    });
});

renderProjects();


// ── NAV HIGHLIGHT FIX (NO JITTER) ──
const links = document.querySelectorAll('.nav-link');
const highlight = document.getElementById('navHighlight');
const sections = document.querySelectorAll('section');

let currentActive = null;
let isClickScrolling = false;

// Move highlight
function moveHighlight(el) {
    highlight.style.width = el.offsetWidth + 'px';
    highlight.style.height = el.offsetHeight + 'px';
    highlight.style.transform = `translateX(${Math.round(el.offsetLeft)}px)`;
}

// Set active (with guard to prevent jitter)
function setActive(link) {
    if (currentActive === link) return;

    currentActive = link;

    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    moveHighlight(link);
}

// Click behavior
links.forEach(link => {
    link.addEventListener('click', () => {
        isClickScrolling = true; // 🔒 lock scroll updates
        setActive(link);

        // unlock after scroll finishes
        setTimeout(() => {
            isClickScrolling = false;
        }, 700); // match your smooth scroll duration
    });
});


// ── SCROLL TRACKING (THROTTLED) ──
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            if (isClickScrolling) {
                ticking = false;
                return;
            }
        
            let current = '';

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();

                if (
                    rect.top <= window.innerHeight * 0.4 &&
                    rect.bottom >= window.innerHeight * 0.4
                ) {
                    current = section.getAttribute('id');
                }
            });

            links.forEach(link => {
                if (link.getAttribute('href') === `#${current}`) {
                    setActive(link);
                }
            });

            ticking = false;
        });

        ticking = true;
    }
});


// ── INIT (delay prevents layout jump) ──
window.addEventListener('load', () => {
    setTimeout(() => {
        if (links[0]) setActive(links[0]);
    }, 50);
});

const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
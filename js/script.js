const langButton = document.getElementById("langBtn");
const themeButtons = document.querySelectorAll(".theme-switch button");
const revealItems = document.querySelectorAll(".section, .connect-section, .reveal, .work-setup, .stats, .hero-actions");
const navLinks = document.querySelectorAll(".mini-nav a");
const projectCards = document.querySelectorAll("#projects .card");
const projectSearch = document.getElementById("projectSearch");
const projectCount = document.getElementById("projectCount");
const scrollProgress = document.querySelector(".scroll-progress");

let currentLanguage = localStorage.getItem("lang") || "🇬🇧 EN";

const translations = {
    "🇬🇧 EN": {
        role: "Your Position",
        workSetup: "Remote • On-site • Hybrid",
        heroName: "Your Name",
        cv: "View CV",
        sectionAboutMe: "About Me",
        aboutMeText: "• I’m a developer passionate about building clean, user-friendly applications.\n• I enjoy solving complex problems and turning ideas into real products.",
        softSkills: ["Communication", "Teamwork", "Problem Solving"],
        hardSkills: ["GIT", "UI/UX", "Networking"],
        experience: ["Employee @ Company1", "Employee @ Company2", "Employee @ Company3"],
        projects: ["Your Project1", "Your Project2", "Your Project3", "Your Project4", "Your Project5"],
        links: ["GitHub", "LinkedIn", "Website"],
        openToWork: "Open to work",
        sectionSoftSkills: "Soft Skills",
        sectionHardSkills: "Hard Skills",
        sectionExperience: "Experience",
        sectionTools: "Tools",
        tools: ["Figma", "Xcode", "Postman"],
        sectionProjects: "Projects",
        sectionContact: "Contact",
        contacts: ["📧 email@example.com", "📱 +123 456 789"],
        sectionConnect: "Connect",
        statYears: "Years",
        statProjects: "Projects",
        statApps: "Apps",
        searchPlaceholder: "Search projects",
        projectsLabel: "projects",
        projectLabel: "project"
    },
    "🇪🇸 ES": {
        role: "Tu Cargo",
        workSetup: "Remoto • Presencial • Híbrido",
        heroName: "Tu Nombre",
        cv: "Ver CV",
        sectionAboutMe: "Sobre mí",
        aboutMeText: "• Soy un desarrollador apasionado por crear aplicaciones limpias y fáciles de usar.\n• Disfruto resolver problemas complejos y convertir ideas en productos reales.",
        softSkills: ["Comunicación", "Trabajo en equipo", "Resolución de problemas"],
        hardSkills: ["GIT", "UI/UX", "Networking"],
        experience: ["Empleado @ Compania1", "Empleado @ Compania2", "Empleado @ Compania3"],
        projects: ["Tu Proyecto1", "Tu Proyecto2", "Tu Proyecto3", "Tu Proyecto4", "Tu Proyecto5"],
        links: ["GitHub", "LinkedIn", "Sitio Web"],
        openToWork: "Disponible para trabajar",
        sectionSoftSkills: "Habilidades Blandas",
        sectionHardSkills: "Habilidades Técnicas",
        sectionTools: "Herramientas",
        tools: ["Figma", "Xcode", "Postman"],
        sectionExperience: "Experiencia",
        sectionProjects: "Proyectos",
        sectionContact: "Contacto",
        contacts: ["📧 email@example.com", "📱 +123 456 789"],
        sectionConnect: "Conectar",
        statYears: "Años",
        statProjects: "Proyectos",
        statApps: "Apps",
        searchPlaceholder: "Buscar proyectos",
        projectsLabel: "proyectos",
        projectLabel: "proyecto"
    }
};

function fadeText(element, newText, duration = 160) {
    if (!element || element.textContent === newText) return;

    element.style.opacity = 0;
    window.setTimeout(() => {
        element.textContent = newText;
        element.style.opacity = 1;
    }, duration);
}

function applyTranslations() {
    const t = translations[currentLanguage];

    langButton.textContent = currentLanguage;
    fadeText(document.querySelector(".role"), t.role);
    fadeText(document.querySelector(".hero h1"), t.heroName);
    fadeText(document.querySelector(".status-badge"), t.openToWork);
    fadeText(document.querySelector(".work-setup"), t.workSetup);
    fadeText(document.getElementById("cv-label"), t.cv);
    fadeText(document.getElementById("about-title"), t.sectionAboutMe);
    fadeText(document.querySelector("#about p"), t.aboutMeText);
    fadeText(document.getElementById("soft-skills-title"), t.sectionSoftSkills);
    fadeText(document.getElementById("hard-skills-title"), t.sectionHardSkills);
    fadeText(document.getElementById("tools-title"), t.sectionTools);
    fadeText(document.getElementById("experience-title"), t.sectionExperience);
    fadeText(document.getElementById("projects-title"), t.sectionProjects);
    fadeText(document.getElementById("contact-title"), t.sectionContact);
    fadeText(document.getElementById("connect-title"), t.sectionConnect);
    fadeText(document.getElementById("stat-years"), t.statYears);
    fadeText(document.getElementById("stat-projects"), t.statProjects);
    fadeText(document.getElementById("stat-apps"), t.statApps);

    projectSearch.placeholder = t.searchPlaceholder;

    updateList("#soft-skills .chips span", t.softSkills);
    updateList("#hard-skills .chips span", t.hardSkills);
    updateList("#tools .chips span", t.tools);
    updateCardList("#experience .card", t.experience);
    updateCardList("#projects .card", t.projects);
    updateList(".contact-list a", t.contacts);
    updateList(".links a", t.links);
    filterProjects();
}

function updateList(selector, values) {
    document.querySelectorAll(selector).forEach((element, index) => {
        if (values[index]) fadeText(element, values[index]);
    });
}

function updateCardList(selector, values) {
    document.querySelectorAll(selector).forEach((card, index) => {
        if (!card.querySelector("span")) {
            const span = document.createElement("span");
            span.textContent = card.textContent;
            card.textContent = "";
            card.appendChild(span);
        }

        if (values[index]) fadeText(card.querySelector("span"), values[index]);
    });
}

function setTheme(theme) {
    const resolvedTheme = theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : theme === "auto"
            ? "light"
            : theme;

    document.documentElement.setAttribute("data-theme", resolvedTheme);
    localStorage.setItem("theme", theme);

    themeButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.theme === theme);
    });
}

function setupReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 45, 320)}ms`;
        observer.observe(item);
    });
}

function updateScrollUI() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;

    let activeId = "";
    document.querySelectorAll("section[id]").forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom > 140) activeId = section.id;
    });

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
}

function filterProjects() {
    const query = projectSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(card => {
        const text = `${card.textContent} ${card.dataset.tags || ""}`.toLowerCase();
        const isVisible = !query || text.includes(query);
        card.classList.toggle("is-hidden", !isVisible);
        if (isVisible) visibleCount += 1;
    });

    const label = visibleCount === 1
        ? translations[currentLanguage].projectLabel
        : translations[currentLanguage].projectsLabel;
    projectCount.textContent = `${visibleCount} ${label}`;
}

function setupProjectCards() {
    projectCards.forEach(card => {
        card.tabIndex = 0;
        card.setAttribute("role", "link");
        card.setAttribute("aria-label", `Open ${card.textContent.trim()}`);

        const openProject = () => {
            const url = card.getAttribute("data-url");
            if (url) window.open(url, "_blank", "noopener,noreferrer");
        };

        card.addEventListener("click", openProject);
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openProject();
            }
        });
    });
}

function setupCopyContact() {
    document.querySelectorAll("[data-copy]").forEach(link => {
        link.addEventListener("click", async event => {
            if (!navigator.clipboard) return;

            event.preventDefault();
            const original = link.textContent;
            await navigator.clipboard.writeText(link.dataset.copy);
            link.textContent = "Copied email";
            window.setTimeout(() => {
                link.textContent = original;
            }, 1200);
        });
    });
}

langButton.addEventListener("click", () => {
    currentLanguage = currentLanguage === "🇬🇧 EN" ? "🇪🇸 ES" : "🇬🇧 EN";
    localStorage.setItem("lang", currentLanguage);
    applyTranslations();
});

themeButtons.forEach(button => {
    button.addEventListener("click", () => setTheme(button.dataset.theme));
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (localStorage.getItem("theme") === "auto") setTheme("auto");
});

window.addEventListener("scroll", updateScrollUI, { passive: true });
projectSearch.addEventListener("input", filterProjects);

updateCardList(".card", []);
setTheme(localStorage.getItem("theme") || "dark");
applyTranslations();
setupReveal();
setupProjectCards();
setupCopyContact();
updateScrollUI();

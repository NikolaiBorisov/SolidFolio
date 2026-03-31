// 🌐 Language switcher button
const btn = document.getElementById("langBtn");

// ✅ Current selected language with flag
// Change this to the default language you want to show
let current = localStorage.getItem("lang") || "🇬🇧 EN";

// 🔄 Language text mapping
// Add more languages here if needed
const translations = {
    "🇬🇧 EN": {
        role: "Your Position",
        workSetup: "Remote • On-site • Hybrid",
        heroName: "Your Name",
        sectionAboutMe: "About Me",
        aboutMeText: "I’m a developer passionate about building clean, user-friendly applications.\nI enjoy solving complex problems and turning ideas into real products.",
        softSkills: ["Communication", "Teamwork", "Problem Solving"],
        hardSkills: ["GIT", "UI/UX", "Networking"],
        experience: ["Employee @ Company1", "Employee @ Company2", "Employee @ Company3"],
        projects: ["Your Project1", "Your Project2", "Your Project3", "Your Project4", "Your Project5"],
        links: ["GitHub", "LinkedIn", "Website"],
        openToWork: "Open to work",
        sectionSoftSkills: "🌟 Soft Skills",
        sectionHardSkills: "⚙️ Hard Skills",
        sectionExperience: "🛠️ Experience",
        sectionTools: "🧰 Tools",
        tools: ["Figma", "Xcode", "Postman"],
        sectionProjects: "📁 Projects",
        sectionContact: "📮 Contact",
        contacts: ["📧 email@example.com", "📱 +123 456 789"],
        sectionConnect: "🔗 Connect"
    },
    "🇪🇸 ES": {
        role: "Tu Cargo",
        workSetup: "Remoto • Presencial • Híbrido",
        heroName: "Tu Nombre",
        sectionAboutMe: "Sobre mí",
        aboutMeText: "Soy un desarrollador apasionado por crear aplicaciones limpias y fáciles de usar.\nDisfruto resolver problemas complejos y convertir ideas en productos reales.",
        softSkills: ["Comunicación", "Trabajo en equipo", "Resolución de problemas"],
        hardSkills: ["GIT", "UI/UX", "Networking"],
        experience: ["Empleado @ Compañía1", "Empleado @ Compañía2", "Empleado @ Compañía3"],
        projects: ["Tu Proyecto1", "Tu Proyecto2", "Tu Proyecto3", "Tu Proyecto4", "Tu Proyecto5"],
        links: ["GitHub", "LinkedIn", "Sitio Web"],
        openToWork: "Disponible para trabajar",
        sectionSoftSkills: "🌟 Habilidades Blandas",
        sectionHardSkills: "⚙️ Habilidades Técnicas",
        sectionTools: "🧰 Herramientas",
        tools: ["Figma", "Xcode", "Postman"],
        sectionExperience: "🛠️ Experiencia",
        sectionProjects: "📁 Proyectos",
        sectionContact: "📮 Contacto",
        contacts: ["📧 email@example.com", "📱 +123 456 789"],
        sectionConnect: "🔗 Conectar"
    }
};

// Run once on page load
document.querySelectorAll(".card").forEach(card => {
    if (!card.querySelector("span")) {
        const span = document.createElement("span");
        span.textContent = card.textContent;
        card.textContent = "";
        card.appendChild(span);
    }
});

btn.addEventListener("click", () => {
    current = current === "🇬🇧 EN" ? "🇪🇸 ES" : "🇬🇧 EN";
    localStorage.setItem("lang", current);

    fadeText(btn, current);
    applyTranslations();
});

// Make project cards clickable
document.querySelectorAll(".card[data-url]").forEach(card => {
    card.style.cursor = "pointer"; // show pointer on hover
    card.addEventListener("click", () => {
        const url = card.getAttribute("data-url");
        window.open(url, "_blank"); // open in new tab
    });
});

function applyTranslations() {
    const t = translations[current];

    fadeText(document.querySelector(".role"), t.role);
    fadeText(document.querySelector(".hero h1"), t.heroName);
    fadeText(document.querySelector(".status-badge"), t.openToWork);
    fadeText(document.querySelector(".work-setup"), t.workSetup);

    fadeText(document.getElementById("about-title"), t.sectionAboutMe);
    fadeText(document.querySelector("#about p"), t.aboutMeText);
    fadeText(document.getElementById("soft-skills-title"), t.sectionSoftSkills);
    fadeText(document.getElementById("hard-skills-title"), t.sectionHardSkills);
    fadeText(document.getElementById("tools-title"), t.sectionTools);
    fadeText(document.getElementById("experience-title"), t.sectionExperience);
    fadeText(document.getElementById("projects-title"), t.sectionProjects);
    fadeText(document.getElementById("contact-title"), t.sectionContact);
    fadeText(document.getElementById("connect-title"), t.sectionConnect);

    document.querySelectorAll("#soft-skills .chips span").forEach((el, i) => {
        const value = t.softSkills[i];
        if (value) fadeText(el, value);
    });

    document.querySelectorAll("#hard-skills .chips span").forEach((el, i) => {
        const value = t.hardSkills[i];
        if (value) fadeText(el, value);
    });

    document.querySelectorAll("#tools .chips span").forEach((el, i) => {
        const value = t.tools[i];
        if (value) fadeText(el, value);
    });

    document.querySelectorAll("#experience .card").forEach((card, i) => {
        const value = t.experience[i];
        const span = card.querySelector("span");
        if (value && span) fadeText(span, value);
    });

    document.querySelectorAll("#projects .card").forEach((card, i) => {
        const value = t.projects[i];
        const span = card.querySelector("span");
        if (value && span) fadeText(span, value);
    });

    document.querySelectorAll(".contact-list a").forEach((el, i) => {
        const value = t.contacts[i];
        if (value) fadeText(el, value);
    });

    document.querySelectorAll(".links a").forEach((el, i) => {
        const value = t.links[i];
        if (value) fadeText(el, value);
    });
}

// Helper: fade out, change text, fade in
function fadeText(element, newText, duration = 300) {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0; // fade out
    setTimeout(() => {
        element.textContent = newText; // change text
        element.style.opacity = 1; // fade in
    }, duration);
}

btn.textContent = current;
applyTranslations();
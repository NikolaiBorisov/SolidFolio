// 🌐 Language switcher button
const btn = document.getElementById("langBtn");

// ✅ Current selected language with flag
// Change this to the default language you want to show
let current = "🇬🇧 EN";

// 🔄 Language text mapping
// Add more languages here if needed
const translations = {
    "🇬🇧 EN": {
        role: "iOS Developer",
        heroName: "Your Name",
        softSkills: ["Communication", "Teamwork", "Problem Solving"],
        hardSkills: ["Swift", "UIKit", "SwiftUI"],
        experience: ["Employee @ Company1", "Employee @ Company2", "Employee @ Company3"],
        projects: ["Your Project1", "Your Project2", "Your Project3", "Your Project4", "Your Project5"],
        links: ["GitHub", "LinkedIn", "Website"],
        openToWork: "Open to work",
        sectionSoftSkills: "Soft Skills",
        sectionHardSkills: "Hard Skills",
        sectionExperience: "🛠️ Experience",
        sectionProjects: "🗃️ Projects",
        sectionLinks: "🔗 Links"
    },
    "🇪🇸 ES": {
        role: "Desarrollador iOS",
        heroName: "Tu Nombre",
        softSkills: ["Comunicación", "Trabajo en equipo", "Resolución de problemas"],
        hardSkills: ["Swift", "UIKit", "SwiftUI"],
        experience: ["Empleado @ Compañía1", "Empleado @ Compañía2", "Empleado @ Compañía3"],
        projects: ["Tu Proyecto1", "Tu Proyecto2", "Tu Proyecto3", "Tu Proyecto4", "Tu Proyecto5"],
        links: ["GitHub", "LinkedIn", "Sitio Web"],
        openToWork: "Abierto a trabajar",
        sectionSoftSkills: "Habilidades Blandas",
        sectionHardSkills: "Habilidades Técnicas",
        sectionExperience: "🛠️ Experiencia",
        sectionProjects: "🗃️ Proyectos",
        sectionLinks: "🔗 Enlaces"
    }
};

// Helper: fade out, change text, fade in
function fadeText(element, newText, duration = 300) {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0; // fade out
    setTimeout(() => {
        element.textContent = newText; // change text
        element.style.opacity = 1; // fade in
    }, duration);
}

btn.addEventListener("click", () => {
    // 🔄 Toggle language
    current = current === "🇬🇧 EN" ? "🇪🇸 ES" : "🇬🇧 EN";

    // ✏️ Update button text to show flag + language code
    fadeText(btn, current);

    // 📝 Load translations for current language
    const t = translations[current];

    // 👤 Update role and hero name
    fadeText(document.querySelector(".role"), t.role);
    fadeText(document.querySelector(".hero h1"), t.heroName);

    // 🧠 Update soft skills chips
    document.querySelectorAll(".section:nth-of-type(1) .chips span")
        .forEach((el, i) => fadeText(el, t.softSkills[i]));

    // 💻 Update hard skills chips
    document.querySelectorAll(".section:nth-of-type(2) .chips span")
        .forEach((el, i) => fadeText(el, t.hardSkills[i]));

    // 🧳 Update experience cards
    document.querySelectorAll(".section:nth-of-type(3) .card")
        .forEach((el, i) => fadeText(el, t.experience[i]));

    // 🚀 Update project cards
    // Wrap card text in a span so fade won't affect hover animation
document.querySelectorAll(".projects-grid .card").forEach(card => {
    if (!card.querySelector("span")) { // avoid double wrapping
        const span = document.createElement("span");
        span.textContent = card.textContent;
        card.textContent = "";
        card.appendChild(span);
    }
});

    // 🔗 Update social links text
    document.querySelectorAll(".links a")
        .forEach((el, i) => fadeText(el, t.links[i]));

    // ✨ Update section headers
    const headers = document.querySelectorAll(".section h2");
    fadeText(headers[0], t.sectionSoftSkills);
    fadeText(headers[1], t.sectionHardSkills);
    fadeText(headers[2], t.sectionExperience);
    fadeText(headers[3], t.sectionProjects);
    fadeText(headers[4], t.sectionLinks);

    // 👤 Update "Open to work" badge
    fadeText(document.querySelector(".status-badge"), t.openToWork);
});

// 👤 "Open to work" badge logic
// To toggle visibility, uncomment the line below:
// document.querySelector(".status-badge").classList.toggle("hidden");

// To always show the badge, uncomment this line:
document.querySelector(".status-badge").classList.remove("hidden");

// To always hide the badge (default behavior):
// document.querySelector(".status-badge").classList.add("hidden");

// 🚀 Make project cards clickable
document.querySelectorAll(".card[data-url]").forEach(card => {
    card.style.cursor = "pointer"; // show pointer on hover
    card.addEventListener("click", () => {
        const url = card.getAttribute("data-url");
        window.open(url, "_blank"); // open in new tab
    });
});

// 🔧 Tips for customization:
// - Add more languages: add them to the translations object above
// - Update role descriptions, badge text, section headers, and card names for each language
// - Badge text can also be customized in HTML and toggled here
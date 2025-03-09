const PROJECTS_API = 'https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/refs/heads/main/projects/meta.json';

async function createProjects() {
    try {
        const response = await fetch(PROJECTS_API);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const projects = await response.json();
        const projectsContainer = document.getElementById("projects-container");
        const fullscreenContainer = document.getElementById("fullscreen-container");
        const fullscreenIframe = document.getElementById("fullscreen-iframe");
        const closeButton = document.querySelector(".close-btn");

        if (!projectsContainer) {
            console.error("Error: #projects-container not found in the DOM.");
            return;
        }

        let htmlContent = '';
        projects.forEach(project => {
            htmlContent += `
                <div class="project" onclick="openProject('${project.embedLink}')">
                    <img src="${project.logo}" alt="${project.title}"/>
                    <div class="project-title">${project.title}</div>
                </div>
            `;
        });

        projectsContainer.innerHTML = htmlContent;

        closeButton.addEventListener("click", function () {
            fullscreenContainer.classList.remove("active");
            setTimeout(() => {
                fullscreenContainer.classList.add("hidden");
                fullscreenIframe.src = "";
            }, 300);
        });

    } catch (error) {
        console.log(error, "ERROR CREATING PROJECTS, ARI! 🥴");
    }
}

function openProject(embedLink) {
    const fullscreenContainer = document.getElementById("fullscreen-container");
    const fullscreenIframe = document.getElementById("fullscreen-iframe");

    fullscreenIframe.src = embedLink;
    fullscreenContainer.classList.remove("hidden");
    setTimeout(() => {
        fullscreenContainer.classList.add("active");
    }, 10);
}

createProjects();

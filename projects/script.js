const PROJECTS_API = './meta.json';

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
            window.pageLoader?.markReady();
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

        function closeFullscreen() {
            fullscreenContainer.classList.remove("active");
            setTimeout(() => {
                fullscreenContainer.classList.add("hidden");
                fullscreenIframe.src = "";
            }, 300);
        }

        closeButton.addEventListener("click", closeFullscreen);

        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape" || event.key === "Esc") {
                if (fullscreenContainer.classList.contains("active")) {
                    closeFullscreen();
                }
            }
        });

        window.pageLoader?.markReady();
    } catch (error) {
        console.log(error, "ERROR CREATING PROJECTS, ARI!");
        window.pageLoader?.markReady();
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

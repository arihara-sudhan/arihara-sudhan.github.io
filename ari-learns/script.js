const LEARNINGS_API = "https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/refs/heads/main/ari-learns/learnins.txt";

document.addEventListener("DOMContentLoaded", loadLearnings);

async function loadLearnings() {
    try {
        const response = await fetch(LEARNINGS_API);
        if (!response.ok) {
            throw new Error(`HTTP down! Status: ${response.status}`);
        }
        const text = await response.text();
        const sections = text.split(/(?:\n|\r)?-+\s*(?:\n|\r)/).filter(section => section.trim());
        const contentDiv = document.getElementById("content");
        let htmlContent = "";
        sections.forEach((section, index) => {
            htmlContent += `
                <div class="section">
                    <h2>Section ${index + 1}</h2>
                    <pre>${section.trim()}</pre>
                </div>
            `;
        });
        
        contentDiv.innerHTML = htmlContent;
    } catch (error) {
        console.error("Error loading learnings.txt:", error);
        alert("Some Error Occurred!");
    }
}
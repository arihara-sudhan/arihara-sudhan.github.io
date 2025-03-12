const LEARNINGS_API = "https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/refs/heads/main/ari-learns/learnings.txt";

document.addEventListener("DOMContentLoaded", loadLearnings);

async function loadLearnings() {
    try {
        const response = await fetch(LEARNINGS_API);
        if (!response.ok) {
            throw new Error(`HTTP down! Status: ${response.status}`);
        }
        const text = await response.text();
        const sections = text.split(/-+\s*\[(\d{2}\/\d{2}\/\d{4})\]/).filter(section => section.trim());
        const contentDiv = document.getElementById("content");
        let htmlContent = "";
        console.log(sections);
        
        for (let i = 1; i < sections.length; i += 2) {
            const date = sections[i];
            const content = sections[i + 1] ? sections[i + 1].replace(/- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -/g, "").trim() : "";
            
            htmlContent += `
                <div class="section">
                    <h2 id="date">Date: ${date}</h2>
                    <pre>${content}</pre>
                </div>
            `;
        }
        
        contentDiv.innerHTML = htmlContent;
    } catch (error) {
        console.error("Error loading learnings.txt:", error);
        alert("Some Error Occurred!");
    }
}

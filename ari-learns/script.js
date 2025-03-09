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
        
        sections.forEach((section) => {
            console.log(section)
            const match = section.match(/\[(\d{2}\/\d{2}\/\d{4})\]/);
            const date = match ? match[1] : "Unknown Date";
            const cleanedSection = section.replace(/\[\d{2}\/\d{2}\/\d{4}\]/, "").trim();
            
            htmlContent += `
                <div class="section">
                    <h2 id="date">Date: ${date}</h2>
                    <pre>${cleanedSection}</pre>
                </div>
            `;
        });
        
        contentDiv.innerHTML = htmlContent;
    } catch (error) {
        console.error("Error loading learnings.txt:", error);
        alert("Some Error Occurred!");
    }
}

const BASE_URL = "https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/refs/heads/main/ari-learns/learnings/";

async function loadLearnings(fileName) {
    const fileUrl = `${BASE_URL}${fileName}.txt`;
    alert("CLICKED");
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const text = await response.text();
        const sections = text.split(/-+\s*\[(\d{2}\/\d{2}\/\d{4})\]/).filter(section => section.trim());
        const contentDiv = document.getElementById("content");
        let htmlContent = "";

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
        console.error("Error loading file:", error);
        alert("Failed to load content!");
    }
}

// Load first file on page load
document.addEventListener("DOMContentLoaded", function () {
    loadLearnings('learnings'); // Default to 'learnings.txt'
});

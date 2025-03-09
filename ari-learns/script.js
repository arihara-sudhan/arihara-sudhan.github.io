const LEARNINGS_API = "learnings.txt";
document.addEventListener("DOMContentLoaded", loadLearnings);

async function loadLearnings() {
    try {
        const response = await fetch(LEARNINGS_API);
        if (!response.ok) {
            throw new Error(`HTTP down! Status: ${response.status}`);
        }
        const text = await response.text();
        const sections = text.split(/-+\n/).filter(section => section.trim());
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
        alert("Some Error Occured!");
    }
}
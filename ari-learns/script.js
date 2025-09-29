const BASE_URL = "https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/refs/heads/main/ari-learns/learnings/";
let activeButton = null;

async function loadLearnings(fileName) {
    const fileUrl = `${BASE_URL}${fileName}.txt`;
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const text = await response.text();
        console.log(text);
        const sections = text.split(/-+\s*\[(\d{2}\/\d{2}\/\d{4})\]/).filter(section => section.trim());
        const source = sections[0].replace(/- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -/g, "");
        const contentDiv = document.getElementById("content");
        let htmlContent = `<h2 id="source">${source}</h2>`;

        for (let i = 1; i < sections.length; i += 2) {
            const date = sections[i];
            let content = sections[i + 1] ? sections[i + 1].replace(/- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -/g, "").trim() : "";

            content = content.split('\n').map(line => {
                const imgMatch = line.match(/^IMG_URL\s*@?(.+)$/);
                if (imgMatch) {
                    const imgValue = imgMatch[1].trim();
                    let url = imgValue;
                    if (!/^https?:\/\//.test(imgValue) && !imgValue.includes('/')) {
                        url = `images/${fileName}/${imgValue}`;
                    }
                    return `<img src=\"${url}\" style=\"border-radius:0.5rem;margin-top:0.2rem;margin-bottom:0.2rem;margin-left:auto;margin-right:auto;max-width:100%;display:block;border:1px solid lightgreen;\" />`;
                }
                return line;
            }).join('\n');

            htmlContent += `
                <div class="section">
                    <h2 id="date">Date: ${date}</h2>
                    <pre>${content}</pre>
                </div>
            `;
        }
        contentDiv.innerHTML = htmlContent;
        updateActiveButton(fileName);
    } catch (error) {
        alert("AN ERROR OCCURED!")
    }
}

function updateActiveButton(topic) {
    if (activeButton) {
        activeButton.style.backgroundColor = "black";
        activeButton.style.color = "lightgreen";
    }

    const clickedButton = document.querySelector(`h2[onclick="loadLearnings('${topic}')"]`);
    if (clickedButton) {
        clickedButton.style.backgroundColor = "red";
        clickedButton.style.color = "white";
        activeButton = clickedButton;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadLearnings('nlp');
});

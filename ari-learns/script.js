const BASE_URL = "https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/refs/heads/main/ari-learns/learnings/";
let activeButton = null;

// Function to calculate node positions based on number of points
function calculateNodePositions(centerX, centerY, offset, numPoints) {
    const positions = [];
    if (numPoints === 3) { // Triangular
        positions.push({ x: centerX, y: centerY - offset });
        positions.push({ x: centerX - offset * Math.cos(Math.PI / 6), y: centerY + offset * Math.sin(Math.PI / 6) });
        positions.push({ x: centerX + offset * Math.cos(Math.PI / 6), y: centerY + offset * Math.sin(Math.PI / 6) });
    } else if (numPoints === 4) { // Rectangular
        positions.push({ x: centerX - offset, y: centerY - offset });
        positions.push({ x: centerX + offset, y: centerY - offset });
        positions.push({ x: centerX - offset, y: centerY + offset });
        positions.push({ x: centerX + offset, y: centerY + offset });
    } else if (numPoints === 5) { // Pentagonal
        for (let i = 0; i < 5; i++) {
            const angle = (2 * Math.PI * i) / 5 - Math.PI / 2;
            positions.push({ x: centerX + offset * Math.cos(angle), y: centerY + offset * Math.sin(angle) });
        }
    } else if (numPoints === 6) { // Hexagonal
        for (let i = 0; i < 6; i++) {
            const angle = (2 * Math.PI * i) / 6 - Math.PI / 2;
            positions.push({ x: centerX + offset * Math.cos(angle), y: centerY + offset * Math.sin(angle) });
        }
    }
    return positions;
}

// Function to create a mind map
function createMindMap(containerId, title, points) {
    const nodes = new vis.DataSet([
        { id: 1, label: title, shape: "box", color: "#FFD700", font: { size: 16, color: "#000" }, x: 0, y: 0, fixed: true }
    ]);
    const edges = new vis.DataSet([]);
    const originalPositions = {};

    points.forEach((point, index) => {
        const nodeId = index + 2;
        nodes.add({
            id: nodeId,
            label: point,
            shape: "box",
            color: "#ADD8E6",
            x: 0,
            y: 0,
            originalX: 0,
            originalY: 0
        });
        edges.add({ from: 1, to: nodeId, color: { color: "#000000" } });
    });

    const container = document.getElementById(containerId);
    const data = { nodes: nodes, edges: edges };
    const options = {
        layout: { hierarchical: false },
        nodes: {
            shape: "box",
            font: { size: 14 },
            widthConstraint: { maximum: 200 },
            heightConstraint: { minimum: 50 }
        },
        edges: {
            width: 2,
            smooth: { type: "curvedCW", roundness: 0.2 }
        },
        physics: { enabled: false },
        interaction: { hover: true }
    };

    const network = new vis.Network(container, data, options);

    function updateNodePositions() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        const offset = Math.min(width, height) / 4;

        const positions = calculateNodePositions(centerX, centerY, offset, points.length);

        nodes.update([{ id: 1, x: centerX, y: centerY, fixed: true }]);
        points.forEach((_, index) => {
            const nodeId = index + 2;
            const pos = positions[index] || { x: centerX, y: centerY };
            nodes.update({
                id: nodeId,
                x: pos.x,
                y: pos.y,
                originalX: pos.x,
                originalY: pos.y
            });
            originalPositions[nodeId] = { x: pos.x, y: pos.y };
        });

        network.redraw();
    }

    let animationInterval = null;
    function startInsectAnimation(nodeId) {
        if (animationInterval) return;
        const node = nodes.get(nodeId);
        const maxOffset = Math.min(container.clientWidth, container.clientHeight) / 20;
        const steps = 10;
        let step = 0;

        animationInterval = setInterval(() => {
            if (step >= steps) {
                clearInterval(animationInterval);
                animationInterval = null;
                return;
            }

            const jitterX = (Math.random() - 0.5) * maxOffset * 0.5;
            const jitterY = (Math.random() - 0.5) * maxOffset * 0.5;
            let newX = node.originalX;
            let newY = node.originalY;

            const angle = Math.atan2(node.originalY - nodes.get(1).y, node.originalX - nodes.get(1).x);
            newX += jitterX + maxOffset * Math.cos(angle);
            newY += jitterY + maxOffset * Math.sin(angle);

            nodes.update({ id: nodeId, x: newX, y: newY });
            step++;
        }, 50);
    }

    network.on("blurNode", function(params) {
        const nodeId = params.node;
        if (nodeId !== 1) {
            if (animationInterval) {
                clearInterval(animationInterval);
                animationInterval = null;
            }
            const originalPos = originalPositions[nodeId];
            const node = nodes.get(nodeId);
            const steps = 10;
            let step = 0;
            const dx = (originalPos.x - node.x) / steps;
            const dy = (originalPos.y - node.y) / steps;

            const returnInterval = setInterval(() => {
                if (step >= steps) {
                    clearInterval(returnInterval);
                    nodes.update({ id: nodeId, x: originalPos.x, y: originalPos.y });
                    return;
                }
                nodes.update({ id: nodeId, x: node.x + dx, y: node.y + dy });
                step++;
            }, 50);
        }
    });

    network.on("hoverNode", function(params) {
        const nodeId = params.node;
        if (nodeId !== 1) {
            startInsectAnimation(nodeId);
        }
    });

    updateNodePositions();
    window.addEventListener('resize', updateNodePositions);
    return updateNodePositions;
}

async function loadLearnings(fileName) {
    const fileUrl = `${BASE_URL}${fileName}.txt`;
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const text = await response.text();
        const sections = text.split(/-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-\s-/).map(section => section.trim()).filter(section => section);
        const contentDiv = document.getElementById("content");
        let htmlContent = "";
        const updateFunctions = [];

        sections.forEach((section, index) => {
            const lines = section.split('\n').map(line => line.trim()).filter(line => line);
            let sectionContent = "";
            let isMindMap = false;
            let mindMapTitle = "";
            let mindMapPoints = [];

            if (lines[0].startsWith('@mindmap')) {
                isMindMap = true;
                mindMapTitle = lines[1] ? lines[1].replace(/^\d+\.\s*/, '') : "Mind Map";
                mindMapPoints = lines.slice(2).filter(line => line.startsWith('<pt>') && line.endsWith('</pt>'))
                    .map(line => line.replace(/<pt>(.*?)<\/pt>/, '$1').trim());
            }

            if (isMindMap && mindMapPoints.length >= 3 && mindMapPoints.length <= 6) {
                const containerId = `mindmap-${fileName}-${index}`;
                sectionContent = `<div id="${containerId}" class="mindmap-container"></div>`;
                setTimeout(() => {
                    const updateFunc = createMindMap(containerId, mindMapTitle, mindMapPoints);
                    updateFunctions.push(updateFunc);
                }, 0);
            } else {
                sectionContent = `<pre>${section}</pre>`;
            }

            htmlContent += `<div class="section">${sectionContent}</div>`;
        });

        contentDiv.innerHTML = htmlContent;
        updateActiveButton(fileName);

        // Cleanup previous resize listeners
        window.__mindMapUpdateFunctions = window.__mindMapUpdateFunctions || [];
        window.__mindMapUpdateFunctions.forEach(func => window.removeEventListener('resize', func));
        window.__mindMapUpdateFunctions = updateFunctions;
        updateFunctions.forEach(func => window.addEventListener('resize', func));
    } catch (error) {
        alert("AN ERROR OCCURED!");
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

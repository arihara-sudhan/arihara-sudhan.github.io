document.addEventListener('DOMContentLoaded', function() {
    const tagsElement = document.getElementById("tags");
    const div = document.getElementById("contents");
    let tagSelected = "";
    const tagColors = ["DodgerBlue", "lightblue", "yellow", "pink", "orange", "lightgreen"];
    let color_idx = 0;

    function createTagBanner(tags, container) {
        tags.forEach(tag => {
            const tagElement = document.createElement("h2");
            tagElement.innerText = tag;
            tagElement.style.backgroundColor = tagColors[color_idx];
            if(color_idx+1==tagColors.length)
                color_idx=0
            else
                color_idx+=1;
            tagElement.addEventListener("click", () => {
                tagSelected = tag;
                updateContent();
            });
            container.appendChild(tagElement);
        });
    }

    function updateContent() {
        fetch("https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/main/hobbies/meta.json")
            .then(resp => resp.json())
            .then(data => {
                let innerContents = '';
                data.forEach(hobby => {
                    if (tagSelected === "" || hobby.tag === tagSelected) {
                        if(hobby.hash)
                            innerContents += `<div class="hobby-hash">
                                                <iframe src="https://youtube.com/embed/${hobby.hash}" class="embed-responsive-item" allowFullscreen>
                                                </iframe>
                                                <h4>${hobby.title}</h4>
                                            </div>`;
                    }
                });
                div.innerHTML = innerContents;
            })
            .catch(error => console.error('Error fetching the JSON file:', error));
    }

    const tags = ["tamizh-poems", "stage", "book-review"] 
    createTagBanner(tags, tagsElement);
    updateContent();
});
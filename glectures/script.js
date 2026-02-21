document.addEventListener("DOMContentLoaded", async function () {
    let metaData = [];
    try {
        const response = await fetch("meta.json");
        metaData = await response.json();
    } catch (err) {
        console.error("Failed to load meta.json:", err);
        return;
    }

    const carousels = [];

    metaData.forEach((entry, entryIndex) => {
        const folderPath = "lectures" + entry["folder-path"];
        const imageList = entry.images;
        if (!Array.isArray(imageList) || imageList.length === 0) return;

        let currentIndex = 0;
        let intervalId = null;
        let autoSlide = true;

        const carousel = document.createElement("div");
        carousel.id = `carousel-${entryIndex}`;
        carousel.classList.add("carousel");

        const img = document.createElement("img");
        img.src = folderPath + imageList[currentIndex];
        carousel.appendChild(img);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("carousel-content");

        const h1 = document.createElement("h1");
        const title = document.createElement("span");
        title.classList.add("carousel-title");
        title.textContent = `${entry.title}`;
        
        const collegeName = document.createElement("span");
        collegeName.textContent = ` | ${entry.college}`;        

        h1.appendChild(title);
        h1.appendChild(collegeName);

        const about = document.createElement("p");
        about.textContent = entry.about;
        
        contentDiv.appendChild(h1);
        contentDiv.appendChild(about);

        if (entry["recorded-session"]) {
            const recordedSessionLink = document.createElement("a");
            recordedSessionLink.href = entry["recorded-session"];
            recordedSessionLink.target = "_blank";
            const youtubeLogo = document.createElement("img");
            youtubeLogo.src = "./youtube.png";
            youtubeLogo.alt = "YouTube";
            youtubeLogo.style.width = "3rem";
            youtubeLogo.style.height = "auto";
            youtubeLogo.style.marginRight = "0.5rem"; 
            youtubeLogo.style.verticalAlign = "middle";
            recordedSessionLink.appendChild(youtubeLogo);
            recordedSessionLink.appendChild(document.createTextNode(" RECORDED SESSION"));
            contentDiv.appendChild(recordedSessionLink);
        }
        
        carousel.appendChild(contentDiv);
        document.body.appendChild(carousel);

        function showImage(index) {
            img.src = folderPath + imageList[index];
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % imageList.length;
            showImage(currentIndex);
        }

        function startAutoSlide() {
            if (!intervalId) {
                intervalId = setInterval(() => {
                    if (autoSlide) nextImage();
                }, 2000);
            }
        }

        function stopAutoSlide() {
            clearInterval(intervalId);
            intervalId = null;
        }

        carousels.push({ el: carousel, start: startAutoSlide, stop: stopAutoSlide });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const carouselObj = carousels.find(c => c.el === entry.target);
            if (!carouselObj) return;

            if (entry.isIntersecting) {
                carouselObj.start();
            } else {
                carouselObj.stop();
            }
        });
    }, {
        threshold: 0.6
    });

    carousels.forEach(c => observer.observe(c.el));
});

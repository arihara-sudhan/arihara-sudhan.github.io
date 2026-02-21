document.addEventListener('DOMContentLoaded', function() {
    const hobbiesContainer = document.getElementById('hobbies');
    
    function isMobile() {
        return window.innerWidth <= 600;
    }
    
    function isTablet() {
        return window.innerWidth <= 1000 && window.innerWidth > 600;
    }
    
    function createHobbyCard(hobby) {
        return `
            <div class="hobby" onclick="window.open('${hobby.url}', '_blank')">
                <img src="${hobby.imgURL}" alt="${hobby.title}"/>
                <h3>${hobby.title}</h3>
            </div>
        `;
    }
    
    function createVideoCard(video) {
        return `
            <div class="video-hobby ${video.isLandscape ? 'landscape' : 'portrait'}">
                <div class="video-container">
                    <iframe 
                        src="${video.url}" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        `;
    }
    
    function createHeroSection() {
        return `
            <div class="hero-section">
                <img src="./static/hero.jpg" alt="Ari's Ikigai" class="hero-image">
            </div>
        `;
    }
    
    function renderContent() {
        const hobbies = [
            { title: "Blogging", url: "https://arihara-sudhan.github.io/blog", imgURL: "https://arihara-sudhan.github.io/blog/static/clover-1.png" },
            { title: "LinkedIning", url: "https://www.linkedin.com/in/arihara-sudhan/", imgURL: "./static/linkedin.gif" },
            { title: "Tech Teaching", url: "https://www.youtube.com/@clever_clover_7", imgURL: "./static/clever_clover.png" },
            { title: "Contributing to Tamil", url: "https://arihara-sudhan.github.io/tamizh", imgURL: "https://arihara-sudhan.github.io/resume/statics/languages/tamizh.png" },
            { title: "Poem Writing (Tamil)", url: "https://arihara-sudhan.github.io/ariyin-kavithaigal", imgURL: "./static/pen.png" },
            { title: "Clay Art", url: "https://www.instagram.com/stories/highlights/17885298282028761/", imgURL: "./static/clayArt.png" },
            { title: "Flora & Fauna", url: "https://www.youtube.com/@ferns-and-friends/shorts", imgURL: "./static/flora_and_fauna.webp" },
            { title: "Binomial Names", url: "https://youtu.be/CXd4P4M8lPA?si=VAjLUD-pHkJQejFA", imgURL: "./static/hibiscus.png" },
            { title: "Singing", url: "https://youtu.be/ulGfscwn6jA?si=22lr8Ckh0QpiUjXv", imgURL: "https://png.pngtree.com/png-vector/20230324/ourmid/pngtree-hand-draw-young-man-singer-icon-vector-png-image_6667321.png" },
            { title: "Stage speech", url: "https://youtu.be/t8MWH2EMrbo?si=2lOSlpRBm-xOHYVG", imgURL: "https://cdn.iconscout.com/icon/free/png-256/free-speech-icon-svg-download-png-1306010.png" }
        ];
        
        const videos = [
            { url: "https://www.youtube.com/embed/CXd4P4M8lPA?si=vprfszhbUQfRpiAf", isLandscape: false },
            { url: "https://www.youtube.com/embed/1-qctj4rSG4?si=5BKpOTaiWy1yEmja", isLandscape: true }
        ];
        
        let htmlContent = createHeroSection();
        
        if (isMobile()) {
            // Mobile: Simple vertical stack
            htmlContent += `
                ${createVideoCard(videos[0])}
                ${hobbies.slice(0, 8).map(createHobbyCard).join('')}
                ${createVideoCard(videos[1])}
                ${hobbies.slice(8).map(createHobbyCard).join('')}
            `;
        } else if (isTablet()) {
            // Tablet: Simplified layout
            htmlContent += `
                <div class="hobbies-main-section">
                    <div class="portrait-video-container">${createVideoCard(videos[0])}</div>
                    <div class="hobbies-grid">
                        ${hobbies.slice(0, 8).map(createHobbyCard).join('')}
                    </div>
                </div>
                <div class="hobbies-bottom-section">
                    <div class="landscape-video-container">${createVideoCard(videos[1])}</div>
                    <div class="singing-stage-container">
                        ${hobbies.slice(8).map(createHobbyCard).join('')}
                    </div>
                </div>
            `;
        } else {
            // Desktop: Full layout
            htmlContent += `
                <div class="hobbies-main-section">
                    <div class="portrait-video-container">${createVideoCard(videos[0])}</div>
                    <div class="hobbies-grid">
                        <div class="hobbies-row">${hobbies.slice(0, 2).map(createHobbyCard).join('')}</div>
                        <div class="hobbies-row">${hobbies.slice(2, 4).map(createHobbyCard).join('')}</div>
                        <div class="hobbies-row">${hobbies.slice(4, 6).map(createHobbyCard).join('')}</div>
                        <div class="hobbies-row">${hobbies.slice(6, 8).map(createHobbyCard).join('')}</div>
                    </div>
                </div>
                <div class="hobbies-bottom-section">
                    <div class="landscape-video-container">${createVideoCard(videos[1])}</div>
                    <div class="singing-stage-container">${hobbies.slice(8).map(createHobbyCard).join('')}</div>
                </div>
            `;
        }
        
        hobbiesContainer.innerHTML = htmlContent;
    }
    
    // Initial render
    renderContent();
    
    // Re-render on resize
    window.addEventListener('resize', renderContent);
});
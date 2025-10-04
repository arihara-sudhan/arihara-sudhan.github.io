document.addEventListener('DOMContentLoaded', function() {
    const hobbiesContainer = document.getElementById('hobbies');
    
    const htmlContent = `
        <!-- First Section: Portrait Video + Regular Hobbies -->
        <div class="hobbies-main-section">
            <!-- Portrait Video (spans 4 rows) -->
            <div class="portrait-video-container">
                <div class="video-hobby portrait">
                    <div class="video-container">
                        <iframe 
                            src="https://www.youtube.com/embed/CXd4P4M8lPA?si=vprfszhbUQfRpiAf" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
            
            <!-- Regular Hobbies Grid (4 rows, 2 per row) -->
            <div class="hobbies-grid">
                <!-- Row 1 -->
                <div class="hobbies-row">
                    <div class="hobby" onclick="window.open('https://arihara-sudhan.github.io/blog', '_blank')">
                        <img src="https://arihara-sudhan.github.io/blog/static/clover-1.png" alt="Blogging"/>
                        <h3>Blogging</h3>
                    </div>
                    <div class="hobby" onclick="window.open('https://www.linkedin.com/in/arihara-sudhan/', '_blank')">
                        <img src="./static/linkedin.gif" alt="LinkedIning"/>
                        <h3>LinkedIning</h3>
                    </div>
                </div>
                
                <!-- Row 2 -->
                <div class="hobbies-row">
                    <div class="hobby" onclick="window.open('https://www.youtube.com/@clever_clover_7', '_blank')">
                        <img src="./static/clever_clover.png" alt="Tech Teaching"/>
                        <h3>Tech Teaching</h3>
                    </div>
                    <div class="hobby" onclick="window.open('https://arihara-sudhan.github.io/tamizh', '_blank')">
                        <img src="https://arihara-sudhan.github.io/resume/statics/languages/tamizh.png" alt="Contributing to Tamil"/>
                        <h3>Contributing to Tamil</h3>
                    </div>
                </div>
                
                <!-- Row 3 -->
                <div class="hobbies-row">
                    <div class="hobby" onclick="window.open('https://arihara-sudhan.github.io/ariyin-kavithaigal', '_blank')">
                        <img src="./static/pen.png" alt="Poem Writing (Tamil)"/>
                        <h3>Poem Writing (Tamil)</h3>
                    </div>
                    <div class="hobby" onclick="window.open('https://www.instagram.com/stories/highlights/17885298282028761/', '_blank')">
                        <img src="./static/clayArt.png" alt="Clay Art"/>
                        <h3>Clay Art</h3>
                    </div>
                </div>
                
                <!-- Row 4 -->
                <div class="hobbies-row">
                    <div class="hobby" onclick="window.open('https://www.youtube.com/@ferns-and-friends/shorts', '_blank')">
                        <img src="./static/flora_and_fauna.webp" alt="Flora & Fauna"/>
                        <h3>Flora & Fauna</h3>
                    </div>
                    <div class="hobby" onclick="window.open('https://youtu.be/CXd4P4M8lPA?si=VAjLUD-pHkJQejFA', '_blank')">
                        <img src="./static/hibiscus.png" alt="Binomial Names"/>
                        <h3>Binomial Names</h3>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Second Section: Landscape Video + Singing + Stage Speech -->
        <div class="hobbies-bottom-section">
            <!-- Left side: Landscape Video -->
            <div class="landscape-video-container">
                <div class="video-hobby landscape">
                    <div class="video-container">
                        <iframe 
                            src="https://www.youtube.com/embed/1-qctj4rSG4?si=5BKpOTaiWy1yEmja" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
            
            <!-- Right side: Singing and Stage Speech -->
            <div class="singing-stage-container">
                <!-- Singing (top row) -->
                <div class="hobby singing" onclick="window.open('https://youtu.be/ulGfscwn6jA?si=22lr8Ckh0QpiUjXv', '_blank')">
                    <img src="https://png.pngtree.com/png-vector/20230324/ourmid/pngtree-hand-draw-young-man-singer-icon-vector-png-image_6667321.png" alt="Singing"/>
                    <h3>Singing</h3>
                </div>
                
                <!-- Stage Speech (spans both rows) -->
                <div class="hobby stage-speech" onclick="window.open('https://youtu.be/t8MWH2EMrbo?si=2lOSlpRBm-xOHYVG', '_blank')">
                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-speech-icon-svg-download-png-1306010.png" alt="Stage speech"/>
                    <h3>Stage speech</h3>
                </div>
            </div>
        </div>
    `;
    
    hobbiesContainer.innerHTML = htmlContent;
});
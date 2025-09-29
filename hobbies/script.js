const HOBBIES_API = 'https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/refs/heads/main/hobbies/meta.json';

async function createHobbies() {
  try {
    const response = await fetch(HOBBIES_API);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const hobbies = await response.json();
    const hobbiesContainer = document.querySelector('#hobbies');
    let htmlContent = '';
    hobbies.forEach(hobby => {
      htmlContent += `
        <div class="hobby" onclick="window.open('${hobby.url}', '_blank')">
            <img src="${hobby.imgURL}" alt="hobbyImage"/>
            <h3>${hobby.title}</h3>
        </div>
      `;
    });
    hobbiesContainer.innerHTML = htmlContent;
  } catch (error) {
    console.log(error, "ERROR CREATING HOBBIES, ARI! 🥴");
  }
}

createHobbies();
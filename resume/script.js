const PROJECTS_API = './meta/projects.json';
const LANGUAGES_API = './meta/languages.json';
const SKILLS_API = './meta/skills.json';
const ACADEMICS_API = './meta/academics.json';
const ACTIVITIES_API = './meta/activities.json';

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`${path}: ${response.status}`);
  }

  return response.json();
}

async function createProjects() {
  try {
    const projects = await fetchJson(PROJECTS_API);
    const projectsContainer = document.querySelector('.projects');
    let htmlContent = '';
    projects.forEach(project => {
      htmlContent += `
        <div class="project">
          <div class="primary">
            <div class="secondary">
              <img src="${project.imageUrl}" alt="${project.title}">
              <h2>${project.title}</h2>
            </div>
            <h2 class="dept">${project.dept}</h2>
          </div>
          <div class="description">
            <span>${project.description}</span>
          </div>
        </div>
      `;
    });
    projectsContainer.innerHTML = htmlContent;
  } catch (error) {
    console.log(error, "ERROR CREATING PROJECTS ARI! ðŸ¥´");
  }
}

async function createLanguages() {
  try {
    const languages = await fetchJson(LANGUAGES_API);
    const languagesContainer = document.querySelector('.languages');
    let htmlContent = '';
    languages.forEach(language => {
      htmlContent += `
        <div class="lang">
          <img src="${language.image.src}" alt="${language.image.alt}">
          <h2>${language.name}</h2>
        </div>
      `;
    });
    languagesContainer.innerHTML = htmlContent;
  } catch (error) {
    console.log(error, "ERROR CREATING LANGUAGES ARI! ðŸ¥´");
  }
}

async function createSkills() {
  try {
    const skills = await fetchJson(SKILLS_API);
    const skillsContainer = document.querySelector('.skills');
    let htmlContent = '';
    
    skills.forEach(skill => {
      htmlContent += `
        <div class="skill">
          <img src="${skill.image}" alt="${skill.alt}">
          <h3>${skill.skill}</h3>
        </div>
      `;
    });
    
    skillsContainer.innerHTML = htmlContent;
  } catch (error) {
    console.log(error, "ERROR CREATING SKILLS ARI! ðŸ¥´");
  }
}

async function createAcademics() {
  try {
    const academics = await fetchJson(ACADEMICS_API);
   
    const academicsContainer = document.querySelector('.academics');
    let htmlContent = '';
    academics.forEach(school => {
      htmlContent += `
        <div class="school">
          <h3>${school.institution}</h3>
          <h4>${school.location}</h4>
          <img src="${school.image.src}" alt="${school.image.alt}">
          <h5>${school.achievement}</h5>
        </div>
      `;
    });
    academicsContainer.innerHTML = htmlContent;
  } catch (error) {
    console.log(error, "ERROR CREATING ACADEMICS ARI! ðŸ¥´");
  }
}

async function createActivities() {
  try {
    const activities = await fetchJson(ACTIVITIES_API);
    const activitiesContainer = document.querySelector('.activities');
    let htmlContent = '';
    activities.forEach(activity => {
      htmlContent += `
        <div class="activity">
          <div class="description">
            <img src="${activity.image}" alt="" width="50px" height="50px">
            <div>
              <h2 class="activity-title">${activity.title}</h2>
              <span class="subtitle">${activity.subtitle}</span>
            </div>
          </div>
          <h3 class="year">${activity.year}</h3>
        </div>
      `;
    });
    activitiesContainer.innerHTML = htmlContent;
  } catch (error) {
    console.log(error, "ERROR CREATING ACTIVITIES ARI! ðŸ¥´");
  }
}

Promise.all([
  createLanguages(),
  createAcademics(),
  createSkills(),
  createProjects(),
  createActivities()
]).catch((error) => {
  console.error("Failed to initialize resume page:", error);
}).finally(() => {
  window.pageLoader?.markReady();
});

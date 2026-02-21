const PROJECTS_API = 'https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/refs/heads/main/resume/meta/projects.json';

async function createProjects() {
  try {
    const response = await fetch(PROJECTS_API);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const projects = await response.json();
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
    console.log(error, "ERROR CREATING PROJECTS ARI! 🥴");
  }
}


const LANGUAGES_API = 'https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/refs/heads/main/resume/meta/languages.json';

async function createLanguages() {
  try {
    const response = await fetch(LANGUAGES_API);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const languages = await response.json();
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
    console.log(error, "ERROR CREATING LANGUAGES ARI! 🥴");
  }
}

const SKILLS_API = 'https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/refs/heads/main/resume/meta/skills.json';

async function createSkills() {
  try {
    const response = await fetch(SKILLS_API);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const skills = await response.json();
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
    console.log(error, "ERROR CREATING SKILLS ARI! 🥴");
  }
}


const ACADEMICS_API = 'https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/refs/heads/main/resume/meta/academics.json';

async function createAcademics() {
  try {
    const response = await fetch(ACADEMICS_API);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const academics = await response.json();
   
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
    console.log(error, "ERROR CREATING ACADEMICS ARI! 🥴");
  }
}


const ACTIVITIES_API = 'https://raw.githubusercontent.com/arihara-sudhan/arihara-sudhan.github.io/refs/heads/main/resume/meta/activities.json';

async function createActivities() {
  try {
    const response = await fetch(ACTIVITIES_API);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const activities = await response.json();
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
    console.log(error, "ERROR CREATING ACTIVITIES ARI! 🥴");
  }
}


createLanguages();
createAcademics();
createSkills();
createProjects();
createActivities();
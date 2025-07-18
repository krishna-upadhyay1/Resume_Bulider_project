// Auto-update preview as user types
document.addEventListener('input', updatePreview);
document.addEventListener('DOMContentLoaded', updatePreview);

// Clear form function to reset all inputs and dynamic sections
function clearForm() {
    // Clear all simple inputs and textareas
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], textarea');
    inputs.forEach(input => {
        input.value = '';
    });

    // Clear personal info inputs separately if needed
    const personalInfoIds = ['fullName', 'email', 'phone', 'location', 'portfolio', 'websiteLink', 'summary', 'skills'];
    personalInfoIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    // Clear dynamic sections containers
    const experienceContainer = document.getElementById('experience-container');
    const educationContainer = document.getElementById('education-container');
    const projectsContainer = document.getElementById('projects-container');

    experienceContainer.innerHTML = '';
    educationContainer.innerHTML = '';
    projectsContainer.innerHTML = '';

    // Add one empty section for each dynamic section to keep UI consistent
    addExperience();
    addEducation();
    addProject();

    // Update preview after clearing
    updatePreview();
}

function updatePreview() {
    updatePersonalInfo();
    updateSummary();
    updateExperience();
    updateEducation();
    updateSkills();
    updateProjects();
}

function updatePersonalInfo() {
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const portfolio = document.getElementById('portfolio').value;
    const websiteLink = document.getElementById('websiteLink').value;

    document.getElementById('previewName').textContent = fullName;
    
    let contactInfo = [];
    if (email) contactInfo.push(email);
    if (phone) contactInfo.push(phone);
    if (location) contactInfo.push(location);
    
    let contactLine1 = contactInfo.join(' • ');
    let contactLine2 = [];
    if (portfolio) contactLine2.push(portfolio);
    if (websiteLink) contactLine2.push(websiteLink);
    
    let fullContact = contactLine1;
    if (contactLine2.length > 0) {
        fullContact += '<br>' + contactLine2.join(' • ');
    }
    
    document.getElementById('previewContact').innerHTML = fullContact;
}

function updateSummary() {
    const summary = document.getElementById('summary').value;
    const summarySection = document.getElementById('summarySection');
    const previewSummary = document.getElementById('previewSummary');
    
    if (summary.trim()) {
        summarySection.style.display = 'block';
        previewSummary.textContent = summary;
    } else {
        summarySection.style.display = 'none';
    }
}

function updateExperience() {
    const experienceContainer = document.getElementById('experience-container');
    const previewExperience = document.getElementById('previewExperience');
    const experienceSection = document.getElementById('experienceSection');
    
    const experiences = experienceContainer.querySelectorAll('.dynamic-section');
    let hasExperience = false;
    let html = '';
    
    experiences.forEach(exp => {
        const jobTitle = exp.querySelector('.job-title').value;
        const company = exp.querySelector('.company').value;
        const startDate = exp.querySelector('.start-date').value;
        const endDate = exp.querySelector('.end-date').value;
        const description = exp.querySelector('.job-description').value;
        
        if (jobTitle || company) {
            hasExperience = true;
            html += `
                <div class="resume-item">
                    <div class="resume-item-title">${jobTitle || 'Job Title'}</div>
                    <div class="resume-item-subtitle">${company || 'Company Name'}</div>
                    <div class="resume-item-date">${startDate} - ${endDate}</div>
                    ${description ? `<div class="resume-item-description">${description}</div>` : ''}
                </div>
            `;
        }
    });
    
    if (hasExperience) {
        experienceSection.style.display = 'block';
        previewExperience.innerHTML = html;
    } else {
        experienceSection.style.display = 'none';
    }
}

function updateEducation() {
    const educationContainer = document.getElementById('education-container');
    const previewEducation = document.getElementById('previewEducation');
    const educationSection = document.getElementById('educationSection');
    
    const educations = educationContainer.querySelectorAll('.dynamic-section');
    let hasEducation = false;
    let html = '';
    
    educations.forEach(edu => {
        const degree = edu.querySelector('.degree').value;
        const field = edu.querySelector('.field').value;
        const institution = edu.querySelector('.institution').value;
        const gradYear = edu.querySelector('.grad-year').value;
        const gpa = edu.querySelector('.gpa').value;
        
        if (degree || institution) {
            hasEducation = true;
            const fullDegree = field ? `${degree} in ${field}` : degree;
            html += `
                <div class="resume-item">
                    <div class="resume-item-title">${fullDegree || 'Degree'}</div>
                    <div class="resume-item-subtitle">${institution || 'Institution'}</div>
                    <div class="resume-item-date">${gradYear}</div>
                    ${gpa ? `<div class="resume-item-description">GPA: ${gpa}</div>` : ''}
                </div>
            `;
        }
    });
    
    if (hasEducation) {
        educationSection.style.display = 'block';
        previewEducation.innerHTML = html;
    } else {
        educationSection.style.display = 'none';
    }
}

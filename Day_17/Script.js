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

function updateSkills() {
    const skills = document.getElementById('skills').value;
    const skillsSection = document.getElementById('skillsSection');
    const previewSkills = document.getElementById('previewSkills');
    
    if (skills.trim()) {
        skillsSection.style.display = 'block';
        const skillsList = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
        const skillsHtml = skillsList.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
        previewSkills.innerHTML = skillsHtml;
    } else {
        skillsSection.style.display = 'none';
    }
}

function updateProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const previewProjects = document.getElementById('previewProjects');
    const projectsSection = document.getElementById('projectsSection');
    
    const projects = projectsContainer.querySelectorAll('.dynamic-section');
    let hasProjects = false;
    let html = '';
    
    projects.forEach(proj => {
        const name = proj.querySelector('.project-name').value;
        const tech = proj.querySelector('.project-tech').value;
        const description = proj.querySelector('.project-description').value;
        const link = proj.querySelector('.project-link').value;
        
        if (name || description) {
            hasProjects = true;
            html += `
                <div class="resume-item">
                    <div class="resume-item-title">${name || 'Project Name'}</div>
                    ${tech ? `<div class="resume-item-subtitle">${tech}</div>` : ''}
                    ${description ? `<div class="resume-item-description">${description}</div>` : ''}
                    ${link ? `<div class="resume-item-description"><a href="${link}" target="_blank">${link}</a></div>` : ''}
                </div>
            `;
        }
    });
    
    if (hasProjects) {
        projectsSection.style.display = 'block';
        previewProjects.innerHTML = html;
    } else {
        projectsSection.style.display = 'none';
    }
}

function addExperience() {
    const container = document.getElementById('experience-container');
    const newExperience = document.createElement('div');
    newExperience.className = 'dynamic-section';
    newExperience.innerHTML = `
        <button type="button" class="btn btn-danger remove-btn" onclick="removeSection(this)">
            <i class="fas fa-times"></i>
        </button>
        
        <div class="form-group">
            <div class="form-row">
                <div>
                    <label>Job Title</label>
                    <input type="text" class="job-title" placeholder="Software Engineer">
                </div>
                <div>
                    <label>Company</label>
                    <input type="text" class="company" placeholder="Tech Corp">
                </div>
            </div>
        </div>

        <div class="form-group">
            <div class="form-row">
                <div>
                    <label>Start Date</label>
                    <input type="text" class="start-date" placeholder="Jan 2020">
                </div>
                <div>
                    <label>End Date</label>
                    <input type="text" class="end-date" placeholder="Present">
                </div>
            </div>
        </div>

        <div class="form-group">
            <label>Job Description</label>
            <textarea class="job-description" placeholder="Describe your responsibilities and achievements..."></textarea>
        </div>
    `;
    container.appendChild(newExperience);
    
    // Add event listeners to new inputs
    newExperience.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', updatePreview);
    });
}

function addEducation() {
    const container = document.getElementById('education-container');
    const newEducation = document.createElement('div');
    newEducation.className = 'dynamic-section';
    newEducation.innerHTML = `
        <button type="button" class="btn btn-danger remove-btn" onclick="removeSection(this)">
            <i class="fas fa-times"></i>
        </button>
        
        <div class="form-group">
            <div class="form-row">
                <div>
                    <label>Degree</label>
                    <input type="text" class="degree" placeholder="Bachelor of Science">
                </div>
                <div>
                    <label>Field of Study</label>
                    <input type="text" class="field" placeholder="Computer Science">
                </div>
            </div>
        </div>

        <div class="form-group">
            <div class="form-row">
                <div>
                    <label>Institution</label>
                    <input type="text" class="institution" placeholder="University of Technology">
                </div>
                <div>
                    <label>Graduation Year</label>
                    <input type="text" class="grad-year" placeholder="2020">
                </div>
            </div>
        </div>

        <div class="form-group">
            <label>GPA (Optional)</label>
            <input type="text" class="gpa" placeholder="3.8/4.0">
        </div>
    `;
    container.appendChild(newEducation);
    
    // Add event listeners to new inputs
    newEducation.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', updatePreview);
    });
}

function addProject() {
    const container = document.getElementById('projects-container');
    const newProject = document.createElement('div');
    newProject.className = 'dynamic-section';
    newProject.innerHTML = `
        <button type="button" class="btn btn-danger remove-btn" onclick="removeSection(this)">
            <i class="fas fa-times"></i>
        </button>
        
        <div class="form-group">
            <label>Project Name</label>
            <input type="text" class="project-name" placeholder="E-commerce Website">
        </div>

        <div class="form-group">
            <label>Technologies Used</label>
            <input type="text" class="project-tech" placeholder="React, Node.js, MongoDB">
        </div>

        <div class="form-group">
            <label>Project Description</label>
            <textarea class="project-description" placeholder="Describe your project and your role..."></textarea>
        </div>

        <div class="form-group">
            <label>Project Link (Optional)</label>
            <input type="url" class="project-link" placeholder="https://github.com/username/project">
        </div>
    `;
    container.appendChild(newProject);
    
    // Add event listeners to new inputs
    newProject.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', updatePreview);
    });
}

function removeSection(button) {
    const section = button.closest('.dynamic-section');
    section.remove();
    updatePreview();
}

function downloadResume() {
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadStatus = document.getElementById('downloadStatus');
    
    // Show loading state
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    downloadStatus.style.display = 'block';
    
    // Check if jsPDF is available, if not, load it dynamically
    if (typeof window.jsPDF === 'undefined') {
        loadJsPDF().then(() => {
            generatePDF();
            resetDownloadButton();
        }).catch(() => {
            alert('Failed to load PDF library. Please try again.');
            resetDownloadButton();
        });
    } else {
        generatePDF();
        resetDownloadButton();
    }
}

function resetDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadStatus = document.getElementById('downloadStatus');
    
    // Reset button state
    setTimeout(() => {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Resume as PDF';
        downloadStatus.style.display = 'none';
    }, 1000);
}

function loadJsPDF() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
    });
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Get data from form
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const portfolio = document.getElementById('portfolio').value;
    const websiteLink = document.getElementById('websiteLink').value;
    const summary = document.getElementById('summary').value;
    
    let yPosition = 20;
    const leftMargin = 20;
    const pageWidth = doc.internal.pageSize.width;
    
    // Helper function to add text with word wrapping
    function addText(text, x, y, maxWidth, fontSize = 12, style = 'normal') {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', style);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        return y + (lines.length * (fontSize * 0.4));
    }
    
    // Header - Name
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(fullName.toUpperCase(), leftMargin, yPosition);
    yPosition += 15;

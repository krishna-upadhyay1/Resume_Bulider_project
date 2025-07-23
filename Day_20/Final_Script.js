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
    
    // Contact Information
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    let contactInfo = [];
    if (email) contactInfo.push(email);
    if (phone) contactInfo.push(phone);
    if (location) contactInfo.push(location);
    if (portfolio) contactInfo.push(portfolio);
    if (websiteLink) contactInfo.push(websiteLink);
    
    if (contactInfo.length > 0) {
        doc.text(contactInfo.join(' | '), leftMargin, yPosition);
        yPosition += 15;
    }
    
    // Add line separator
    doc.setLineWidth(0.5);
    doc.line(leftMargin, yPosition, pageWidth - leftMargin, yPosition);
    yPosition += 10;
    
    // Professional Summary
    if (summary.trim()) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('PROFESSIONAL SUMMARY', leftMargin, yPosition);
        yPosition += 8;
        
        yPosition = addText(summary, leftMargin, yPosition, pageWidth - 40, 11);
        yPosition += 10;
    }
    
    // Work Experience
    const experiences = document.getElementById('experience-container').querySelectorAll('.dynamic-section');
    if (experiences.length > 0) {
        let hasValidExperience = false;
        
        experiences.forEach(exp => {
            const jobTitle = exp.querySelector('.job-title').value;
            const company = exp.querySelector('.company').value;
            
            if (jobTitle || company) {
                if (!hasValidExperience) {
                    doc.setFontSize(14);
                    doc.setFont('helvetica', 'bold');
                    doc.text('WORK EXPERIENCE', leftMargin, yPosition);
                    yPosition += 8;
                    hasValidExperience = true;
                }
                
                const startDate = exp.querySelector('.start-date').value;
                const endDate = exp.querySelector('.end-date').value;
                const description = exp.querySelector('.job-description').value;
                
                // Job title and company
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text(`${jobTitle || 'Job Title'} - ${company || 'Company'}`, leftMargin, yPosition);
                yPosition += 6;
                
                // Dates
                if (startDate || endDate) {
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'italic');
                    doc.text(`${startDate || ''} - ${endDate || ''}`, leftMargin, yPosition);
                    yPosition += 6;
                }
                
                // Description
                if (description) {
                    yPosition = addText(description, leftMargin, yPosition, pageWidth - 40, 10);
                }
                
                yPosition += 8;
                
                // Check if we need a new page
                if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 20;
                }
            }
        });
        
        if (hasValidExperience) yPosition += 5;
    }
    
    // Education
    const educations = document.getElementById('education-container').querySelectorAll('.dynamic-section');
    if (educations.length > 0) {
        let hasValidEducation = false;
        
        educations.forEach(edu => {
            const degree = edu.querySelector('.degree').value;
            const institution = edu.querySelector('.institution').value;
            
            if (degree || institution) {
                if (!hasValidEducation) {
                    doc.setFontSize(14);
                    doc.setFont('helvetica', 'bold');
                    doc.text('EDUCATION', leftMargin, yPosition);
                    yPosition += 8;
                    hasValidEducation = true;
                }
                
                const field = edu.querySelector('.field').value;
                const gradYear = edu.querySelector('.grad-year').value;
                const gpa = edu.querySelector('.gpa').value;
                
                // Degree and field
                const fullDegree = field ? `${degree} in ${field}` : degree;
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text(fullDegree || 'Degree', leftMargin, yPosition);
                yPosition += 6;
                
                // Institution and year
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.text(`${institution || 'Institution'} ${gradYear ? `(${gradYear})` : ''}`, leftMargin, yPosition);
                yPosition += 6;
                
                // GPA
                if (gpa) {
                    doc.text(`GPA: ${gpa}`, leftMargin, yPosition);
                    yPosition += 6;
                }
                
                yPosition += 5;
            }
        });
        
        if (hasValidEducation) yPosition += 5;
    }
    
    // Skills
    const skills = document.getElementById('skills').value;
    if (skills.trim()) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('SKILLS', leftMargin, yPosition);
        yPosition += 8;
        
        const skillsList = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
        yPosition = addText(skillsList.join(', '), leftMargin, yPosition, pageWidth - 40, 11);
        yPosition += 10;
    }
    
    // Projects
    const projects = document.getElementById('projects-container').querySelectorAll('.dynamic-section');
    if (projects.length > 0) {
        let hasValidProjects = false;
        
        projects.forEach(proj => {
            const name = proj.querySelector('.project-name').value;
            const description = proj.querySelector('.project-description').value;
            
            if (name || description) {
                if (!hasValidProjects) {
                    // Check if we need a new page
                    if (yPosition > 220) {
                        doc.addPage();
                        yPosition = 20;
                    }
                    
                    doc.setFontSize(14);
                    doc.setFont('helvetica', 'bold');
                    doc.text('PROJECTS', leftMargin, yPosition);
                    yPosition += 8;
                    hasValidProjects = true;
                }
                
                const tech = proj.querySelector('.project-tech').value;
                const link = proj.querySelector('.project-link').value;
                
                // Project name
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text(name || 'Project Name', leftMargin, yPosition);
                yPosition += 6;
                
                // Technologies
                if (tech) {
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'italic');
                    doc.text(`Technologies: ${tech}`, leftMargin, yPosition);
                    yPosition += 6;
                }
                
                // Description
                if (description) {
                    yPosition = addText(description, leftMargin, yPosition, pageWidth - 40, 10);
                }
                
                // Link
                if (link) {
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    doc.text(`Link: ${link}`, leftMargin, yPosition);
                    yPosition += 6;
                }
                
                yPosition += 8;
                
                // Check if we need a new page
                if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 20;
                }
            }
        });
    }
    
    // Save the PDF
    const fileName = `${fullName.replace(/\s+/g, '_')}_Resume.pdf`;
    doc.save(fileName);
}

// Share Functions
function shareViaEmail() {
    const fullName = document.getElementById('fullName').value || 'Professional';
    const subject = `${fullName}'s Resume`;
    const body = `Hi,\n\nI'd like to share my resume with you. I've created it using an online resume builder.\n\nYou can view my resume details and download the PDF version.\n\nBest regards,\n${fullName}`;
    
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
    
    showShareStatus('Email client opened! 📧', 'success');
}

function shareViaWhatsApp() {
    const fullName = document.getElementById('fullName').value || 'Professional';
    const message = `Hi! I'd like to share my resume with you. I'm ${fullName} and I've created my professional resume. Please let me know if you'd like me to send you the PDF version!`;
    
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    
    showShareStatus('WhatsApp opened! 💬', 'success');
}

function shareViaLinkedIn() {
    const fullName = document.getElementById('fullName').value || 'Professional';
    const summary = document.getElementById('summary').value;
    const title = `${fullName}'s Professional Resume`;
    const description = summary ? summary.substring(0, 200) + '...' : 'Check out my professional resume created with an online resume builder.';
    
    const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
    window.open(linkedinLink, '_blank');
    
    showShareStatus('LinkedIn opened! 💼', 'success');
}

function shareViaTwitter() {
    const fullName = document.getElementById('fullName').value || 'Professional';
    const tweet = `Just created my professional resume! Check out ${fullName}'s resume created with an awesome online resume builder. #Resume #JobSearch #Professional`;
    
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(twitterLink, '_blank');
    
    showShareStatus('Twitter opened! 🐦', 'success');
}

function copyResumeLink() {
    const currentUrl = window.location.href;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(currentUrl).then(() => {
            showShareStatus('Link copied to clipboard! 📋', 'success');
            updateCopyButton(true);
        }).catch(() => {
            fallbackCopyTextToClipboard(currentUrl);
        });
    } else {
        fallbackCopyTextToClipboard(currentUrl);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showShareStatus('Link copied to clipboard! 📋', 'success');
        updateCopyButton(true);
    } catch (err) {
        showShareStatus('Failed to copy link. Please copy manually.', 'error');
    }
    
    document.body.removeChild(textArea);
}

function updateCopyButton(copied) {
    const copyBtn = document.getElementById('copyBtn');
    if (copied) {
        copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        copyBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
        
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i><span>Copy Link</span>';
            copyBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 2000);
    }
}

function printResume() {
    const resumePreview = document.getElementById('resumePreview');
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <html>
            <head>
                <title>Resume - ${document.getElementById('fullName').value || 'Professional'}</title>
                <style>
                    body {
                        font-family: 'Times New Roman', serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .resume-header {
                        text-align: center;
                        border-bottom: 3px solid #667eea;
                        padding-bottom: 20px;
                        margin-bottom: 25px;
                    }
                    .resume-name {
                        font-size: 2.5rem;
                        font-weight: bold;
                        color: #2d3748;
                        margin-bottom: 10px;
                    }
                    .resume-contact {
                        font-size: 1rem;
                        color: #4a5568;
                        line-height: 1.5;
                    }
                    .resume-section {
                        margin-bottom: 25px;
                        page-break-inside: avoid;
                    }
                    .resume-section-title {
                        font-size: 1.3rem;
                        font-weight: bold;
                        color: #667eea;
                        border-bottom: 2px solid #e2e8f0;
                        padding-bottom: 5px;
                        margin-bottom: 15px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    .resume-item {
                        margin-bottom: 15px;
                        page-break-inside: avoid;
                    }
                    .resume-item-title {
                        font-weight: bold;
                        color: #2d3748;
                    }
                    .resume-item-subtitle {
                        color: #667eea;
                        font-style: italic;
                    }
                    .resume-item-date {
                        color: #718096;
                        font-size: 0.9rem;
                    }
                    .resume-item-description {
                        margin-top: 5px;
                        color: #4a5568;
                    }
                    .skills-list {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                    }
                    .skill-tag {
                        background: #667eea;
                        color: white;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 0.9rem;
                        display: inline-block;
                    }
                    @media print {
                        body { print-color-adjust: exact; }
                        .resume-section { page-break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                ${resumePreview.innerHTML}
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
    
    showShareStatus('Print dialog opened! 🖨️', 'success');
}

function generateShareableHTML() {
    const resumePreview = document.getElementById('resumePreview');
    const fullName = document.getElementById('fullName').value || 'Professional';
    
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - ${fullName}</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f8f9fa;
        }
        .resume-container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .resume-header {
            text-align: center;
            border-bottom: 3px solid #667eea;
            padding-bottom: 20px;
            margin-bottom: 25px;
        }
        .resume-name {
            font-size: 2.5rem;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 10px;
        }
        .resume-contact {
            font-size: 1rem;
            color: #4a5568;
            line-height: 1.5;
        }
        .resume-section {
            margin-bottom: 25px;
        }
        .resume-section-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #667eea;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 5px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .resume-item {
            margin-bottom: 15px;
        }
        .resume-item-title {
            font-weight: bold;
            color: #2d3748;
        }
        .resume-item-subtitle {
            color: #667eea;
            font-style: italic;
        }
        .resume-item-date {
            color: #718096;
            font-size: 0.9rem;
        }
        .resume-item-description {
            margin-top: 5px;
            color: #4a5568;
        }
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .skill-tag {
            background: #667eea;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.9rem;
            display: inline-block;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #718096;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="resume-container">
        ${resumePreview.innerHTML}
        <div class="footer">
            Generated with Online Resume Builder
        </div>
    </div>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, '_')}_Resume.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showShareStatus('HTML file downloaded! 📄', 'success');
}

function saveToLocalStorage() {
    const resumeData = {
        personalInfo: {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        portfolio: document.getElementById('portfolio').value,
        websiteLink: document.getElementById('websiteLink').value
        },
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value,
        experience: [],
        education: [],
        projects: []
    };
    
    // Save experience
    document.getElementById('experience-container').querySelectorAll('.dynamic-section').forEach(exp => {
        resumeData.experience.push({
            jobTitle: exp.querySelector('.job-title').value,
            company: exp.querySelector('.company').value,
            startDate: exp.querySelector('.start-date').value,
            endDate: exp.querySelector('.end-date').value,
            description: exp.querySelector('.job-description').value
        });
    });
    
    // Save education
    document.getElementById('education-container').querySelectorAll('.dynamic-section').forEach(edu => {
        resumeData.education.push({
            degree: edu.querySelector('.degree').value,
            field: edu.querySelector('.field').value,
            institution: edu.querySelector('.institution').value,
            gradYear: edu.querySelector('.grad-year').value,
            gpa: edu.querySelector('.gpa').value
        });
    });
    
    // Save projects
    document.getElementById('projects-container').querySelectorAll('.dynamic-section').forEach(proj => {
        resumeData.projects.push({
            name: proj.querySelector('.project-name').value,
            tech: proj.querySelector('.project-tech').value,
            description: proj.querySelector('.project-description').value,
            link: proj.querySelector('.project-link').value
        });
    });
    
    localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
    showShareStatus('Resume saved successfully! 💾', 'success');
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('resumeBuilderData');
    
    if (!savedData) {
        showShareStatus('No saved resume found! 🤷‍♂️', 'error');
        return;
    }
    
    try {
        const resumeData = JSON.parse(savedData);
        
        // Load personal info
        document.getElementById('fullName').value = resumeData.personalInfo.fullName || '';
        document.getElementById('email').value = resumeData.personalInfo.email || '';
        document.getElementById('phone').value = resumeData.personalInfo.phone || '';
        document.getElementById('location').value = resumeData.personalInfo.location || '';
        document.getElementById('portfolio').value = resumeData.personalInfo.portfolio || '';
        document.getElementById('websiteLink').value = resumeData.personalInfo.websiteLink || '';
        
        // Load summary and skills
        document.getElementById('summary').value = resumeData.summary || '';
        document.getElementById('skills').value = resumeData.skills || '';
        
        // Clear existing sections
        document.getElementById('experience-container').innerHTML = '';
        document.getElementById('education-container').innerHTML = '';
        document.getElementById('projects-container').innerHTML = '';
        
        // Load experience
        resumeData.experience.forEach((exp, index) => {
            if (index === 0) addExperience();
            else addExperience();
            
            const expSection = document.getElementById('experience-container').lastElementChild;
            expSection.querySelector('.job-title').value = exp.jobTitle || '';
            expSection.querySelector('.company').value = exp.company || '';
            expSection.querySelector('.start-date').value = exp.startDate || '';
            expSection.querySelector('.end-date').value = exp.endDate || '';
            expSection.querySelector('.job-description').value = exp.description || '';
        });
        
        // Load education
        resumeData.education.forEach((edu, index) => {
            if (index === 0) addEducation();
            else addEducation();
            
            const eduSection = document.getElementById('education-container').lastElementChild;
            eduSection.querySelector('.degree').value = edu.degree || '';
            eduSection.querySelector('.field').value = edu.field || '';
            eduSection.querySelector('.institution').value = edu.institution || '';
            eduSection.querySelector('.grad-year').value = edu.gradYear || '';
            eduSection.querySelector('.gpa').value = edu.gpa || '';
        });
        
        // Load projects
        resumeData.projects.forEach((proj, index) => {
            if (index === 0) addProject();
            else addProject();
            
            const projSection = document.getElementById('projects-container').lastElementChild;
            projSection.querySelector('.project-name').value = proj.name || '';
            projSection.querySelector('.project-tech').value = proj.tech || '';
            projSection.querySelector('.project-description').value = proj.description || '';
            projSection.querySelector('.project-link').value = proj.link || '';
        });
        
        // Add default sections if none exist
        if (resumeData.experience.length === 0) addExperience();
        if (resumeData.education.length === 0) addEducation();
        if (resumeData.projects.length === 0) addProject();
        
        updatePreview();
        showShareStatus('Resume loaded successfully! ✅', 'success');
        
    } catch (error) {
        showShareStatus('Error loading saved resume! ❌', 'error');
    }
}

function showShareStatus(message, type) {
    const statusDiv = document.getElementById('shareStatus');
    statusDiv.textContent = message;
    statusDiv.className = `share-status-${type}`;
    statusDiv.style.display = 'block';
    
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

// Auto-save functionality
setInterval(() => {
    if (document.getElementById('fullName').value.trim()) {
        saveToLocalStorage();
    }
}, 60000); // Auto-save every minute

// Header Animation Effects
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    addHeaderInteractivity();
});

function createFloatingElements() {
    const header = document.querySelector('.header');
    
    // Create floating icons
    const icons = ['📄', '💼', '🎯', '⚡', '🚀', '💎', '🌟', '✨'];
    
    for (let i = 0; i < 6; i++) {
        const floatingIcon = document.createElement('div');
        floatingIcon.className = 'floating-icon';
        floatingIcon.textContent = icons[Math.floor(Math.random() * icons.length)];
        floatingIcon.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0.3;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            z-index: 1;
        `;
        header.appendChild(floatingIcon);
    }
}

function addHeaderInteractivity() {
    const header = document.querySelector('.header h1');
    
    // Add click effect
    header.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'gradientShift 3s ease-in-out infinite, bounceIn 1s ease-out, glow 2s ease-in-out infinite alternate';
        }, 10);
        
        // Create burst effect
        createBurstEffect(this);
    });
    
    // Add mouse enter effect
    header.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    header.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

function createBurstEffect(element) {
    const particles = ['✨', '⭐', '💫', '🌟', '💎', '⚡'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
            position: absolute;
            font-size: 20px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
            animation: burst 1s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        
        const angle = (i / 8) * 360;
        const distance = 100;
        particle.style.setProperty('--angle', angle + 'deg');
        particle.style.setProperty('--distance', distance + 'px');
        
        element.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Add CSS for dynamic effects via JavaScript
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-20px) rotate(90deg);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.4;
        }
        75% {
            transform: translateY(-30px) rotate(270deg);
            opacity: 0.7;
        }
    }
    
    @keyframes burst {
        0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) 
                       translate(
                           calc(cos(var(--angle)) * var(--distance)),
                           calc(sin(var(--angle)) * var(--distance))
                       ) 
                       scale(0) 
                       rotate(360deg);
            opacity: 0;
        }
    }
    
    .floating-icon {
        user-select: none;
        will-change: transform, opacity;
    }
`;
document.head.appendChild(dynamicStyles);

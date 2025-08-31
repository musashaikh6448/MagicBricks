// Contact form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Clear previous validation states
            clearValidation();
            
            let isValid = true;
            
            // Validate first name
            if (!firstName.value.trim()) {
                showError(firstName, 'First name is required');
                isValid = false;
            } else {
                showSuccess(firstName);
            }
            
            // Validate last name
            if (!lastName.value.trim()) {
                showError(lastName, 'Last name is required');
                isValid = false;
            } else {
                showSuccess(lastName);
            }
            
            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                showSuccess(email);
            }
            
            // Validate phone
            if (!phone.value.trim()) {
                showError(phone, 'Phone number is required');
                isValid = false;
            } else if (!isValidPhone(phone.value)) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            } else {
                showSuccess(phone);
            }
            
            // Validate subject
            if (!subject.value) {
                showError(subject, 'Please select a subject');
                isValid = false;
            } else {
                showSuccess(subject);
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters long');
                isValid = false;
            } else {
                showSuccess(message);
            }
            
            if (isValid) {
                // Show success message
                showSubmissionSuccess();
                
                // Reset form
                contactForm.reset();
                clearValidation();
            }
        });
    }
    
    function showError(element, message) {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        
        // Remove existing feedback
        const existingFeedback = element.parentNode.querySelector('.invalid-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        element.parentNode.appendChild(errorDiv);
    }
    
    function showSuccess(element) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        
        // Remove error message
        const existingFeedback = element.parentNode.querySelector('.invalid-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
    }
    
    function clearValidation() {
        const inputs = contactForm.querySelectorAll('.form-control, .form-select');
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        const feedbacks = contactForm.querySelectorAll('.invalid-feedback');
        feedbacks.forEach(feedback => feedback.remove());
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
        return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
    }
    
    function showSubmissionSuccess() {
        // Create success alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show';
        alertDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Success!</strong> Your message has been sent successfully. We'll get back to you within 24 hours.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insert at the top of the form
        contactForm.insertBefore(alertDiv, contactForm.firstChild);
        
        // Scroll to the alert
        alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
});
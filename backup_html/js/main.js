// Main JavaScript for All Purpose Contractors LLC Website

document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // For now, just alert with the form data (demo only)
            alert('Thank you for your submission! We will contact you shortly.');
            console.log('Form Data:', formObject);
            
            // Reset the form
            bookingForm.reset();
            
            // In a real implementation, you would send this data to a server
            // via fetch() or another AJAX method
            // Example:
            /*
            fetch('your-server-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Thank you for your submission! We will contact you shortly.');
                bookingForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your form. Please try again later.');
            });
            */
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle (for future implementation)
    // This can be expanded when adding a mobile menu button
    
    // Add current year to copyright in footer
    const yearSpan = document.querySelector('.year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}); 
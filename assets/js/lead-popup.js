document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const headerDemoButton = document.getElementById('header-demo-button');
    const demoButtons = document.querySelectorAll('.demo-button');
    const popup = document.getElementById('bevision-lead-popup');
    const overlay = document.getElementById('popup-overlay');
    const closeButton = document.querySelector('.popup-close');
    const leadForm = document.getElementById('lead-form');
    const successMessage = document.getElementById('success-message');
    
    // Set nonce value
    if (leadForm) {
        const nonceField = document.getElementById('lead_form_nonce');
        if (nonceField && typeof bevisionLeadPopup !== 'undefined') {
            nonceField.value = bevisionLeadPopup.nonce;
        }
    }
    
 
    
    // Function to open popup
    function openPopup() {
        if (popup && overlay) {
            popup.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    // Function to close popup
    function closePopup() {
        if (popup && overlay) {
            popup.style.display = 'none';
            overlay.style.display = 'none';
            document.body.style.overflow = ''; // Enable scrolling
        }
    }
    
    // Add click event to header demo button
    if (headerDemoButton) {
        headerDemoButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default behavior
            openPopup();
        });
    }
    
    // Add click event to all other demo buttons
    if (demoButtons) {
        demoButtons.forEach(button => {
            // Skip header button as we've already handled it
            if (button.id !== 'header-demo-button') {
                button.addEventListener('click', function(e) {
                    e.preventDefault(); // Prevent default link behavior
                    openPopup();
                });
            }
        });
    }
    
    // Close popup when X button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }
    
    // Close popup when overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', closePopup);
    }
    
    // Form submission
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(leadForm);
            
            // Add action and nonce for WordPress AJAX
            formData.append('action', 'bevision_submit_lead');
            formData.append('lead_form_nonce', bevisionLeadPopup.nonce);
            
            // Send data to server using WordPress AJAX
            fetch(bevisionLeadPopup.ajaxUrl, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    leadForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    successMessage.textContent = data.data.message || 'Your request has been submitted successfully!';
                    
                    // Close popup after 3 seconds
                    setTimeout(function() {
                        closePopup();
                        // Reset form after closing
                        setTimeout(function() {
                            leadForm.reset();
                            leadForm.style.display = 'block';
                            successMessage.style.display = 'none';
                        }, 500);
                    }, 3000);
                } else {
                    // Show error message
                    alert(data.data.message || 'There was an error submitting your request. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your request. Please try again.');
            });
        });
    }
});

// Function to hide one element and show another
function hideThisShowThat(hideId, showId) {
    // Extra logging to debug
    console.log('Function called with:', hideId, showId);
    console.log('Elements:', document.getElementById(hideId), document.getElementById(showId));
    
    // Hide first element
    var hideElement = document.getElementById(hideId);
    if (hideElement) {
        hideElement.style.display = 'none';
        console.log('Hidden:', hideId);
    }
    
    // Show second element
    var showElement = document.getElementById(showId);
    if (showElement) {
        showElement.style.display = 'block';
        console.log('Showing:', showId);
    }
}

// Form validation function
function validateAndSubmit() {
    // Get all form fields
    var nameField = document.getElementById('lead-name');
    var companyField = document.getElementById('lead-company');
    var phoneField = document.getElementById('lead-phone');
    var emailField = document.getElementById('lead-email');
    
    // Basic validation
    if (nameField.value.trim() === '' || 
        companyField.value.trim() === '' || 
        phoneField.value.trim() === '' || 
        emailField.value.trim() === '') {
        
        // Show error if any field is empty
        alert('Please fill in all fields');
        return false;
    }
    
    // Additional email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailField.value.trim())) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // If all validation passes, show success message
    hideThisShowThat('form-part', 'success-part');
    
    // Hide header and subtitle when showing success
    var headerElement = document.getElementById('popup-header');
    var subtitleElement = document.getElementById('popup-subtitle');
    if (headerElement) {
        headerElement.style.display = 'none';
    }
    if (subtitleElement) {
        subtitleElement.style.display = 'none';
    }
    
    return true;
}

// Function to check if all fields are filled and enable/disable submit button
function checkFormValidity() {
    var nameField = document.getElementById('lead-name');
    var companyField = document.getElementById('lead-company');
    var phoneField = document.getElementById('lead-phone');
    var emailField = document.getElementById('lead-email');
    var submitButton = document.getElementById('lead-submit-button');
    
    if (nameField.value.trim() !== '' && 
        companyField.value.trim() !== '' && 
        phoneField.value.trim() !== '' && 
        emailField.value.trim() !== '') {
        
        // Enable button if all fields have values
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.style.cursor = 'pointer';
    } else {
        // Disable button if any field is empty
        submitButton.disabled = true;
        submitButton.style.opacity = '0.6';
        submitButton.style.cursor = 'not-allowed';
    }
}

// Define global function to open the popup - can be called from any block or element
function openPopup(popupId) {
    // If popup ID is provided, use that, otherwise use the default
    const popupElement = popupId ? document.getElementById(popupId) : document.getElementById('bevision-new-popup');
    const overlayElement = document.getElementById('new-popup-overlay');
    
    if (popupElement && overlayElement) {
        popupElement.style.display = 'block';
        overlayElement.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

// Document ready event handler
document.addEventListener('DOMContentLoaded', function() {
    // Add event to show demo popup
    const addDemoEvents = function() {
        // Get elements
        const popup = document.getElementById('bevision-new-popup');
        const overlay = document.getElementById('new-popup-overlay');
        const closeButton = document.querySelector('.new-popup-close');
        const cancelButtons = document.querySelectorAll('.new-cancel-button'); // Get all cancel buttons
        const formPart = document.getElementById('form-part');
        const successPart = document.getElementById('success-part');
        
        // Local reference to global openPopup function
        const openLocalPopup = function() {
            openPopup('bevision-new-popup');
        }
        
        // Function to close popup
        function closePopup() {
            if (popup && overlay) {
                popup.style.display = 'none';
                overlay.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
                
                // Reset form state when closing
                if (formPart && successPart) {
                    formPart.style.display = 'block';
                    successPart.style.display = 'none';
                    
                    // Reset header and subtitle visibility
                    var headerElement = document.getElementById('popup-header');
                    var subtitleElement = document.getElementById('popup-subtitle');
                    if (headerElement) {
                        headerElement.style.display = 'block';
                    }
                    if (subtitleElement) {
                        subtitleElement.style.display = 'block';
                    }
                    
                    // Reset form fields
                    var fields = document.querySelectorAll('.new-form-input');
                    fields.forEach(function(field) {
                        field.value = '';
                    });
                    
                    // Disable submit button
                    var submitButton = document.getElementById('lead-submit-button');
                    if (submitButton) {
                        submitButton.disabled = true;
                        submitButton.style.opacity = '0.6';
                        submitButton.style.cursor = 'not-allowed';
                    }
                }
            }
        }
        
        // Find all demo trigger buttons and attach event listeners
        const demoTriggers = document.querySelectorAll('.open-lead-popup');
        if (demoTriggers.length > 0) {
            console.log('Found', demoTriggers.length, 'demo triggers');
            demoTriggers.forEach(function(trigger) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    openLocalPopup();
                });
            });
        } else {
            console.warn('No demo trigger buttons found with class .open-lead-popup');
        }
        
        // Close popup when clicking close button
        if (closeButton) {
            closeButton.addEventListener('click', closePopup);
        }
        
        // Close popup when clicking cancel buttons
        if (cancelButtons.length > 0) {
            cancelButtons.forEach(function(button) {
                button.addEventListener('click', closePopup);
            });
        }
        
        // Close popup when clicking overlay (outside popup)
        if (overlay) {
            overlay.addEventListener('click', closePopup);
        }
        
        // Add input event listeners to all form fields
        var validateFields = document.querySelectorAll('.validate-field');
        validateFields.forEach(function(field) {
            field.addEventListener('input', checkFormValidity);
        });
        
        // Find close button in success message and add event listener
        const successCloseButton = document.querySelector('#success-part button');
        if (successCloseButton) {
            successCloseButton.addEventListener('click', closePopup);
        }
    };
    
    // Initialize events
    addDemoEvents();
});

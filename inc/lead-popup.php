<?php
/**
 * Lead Popup Implementation
 * PHP-based implementation to avoid caching issues with JS/React blocks
 */

// Function to output the popup HTML
function bevision_render_lead_popup() {
    // Don't show popup in admin or login page
    if (is_admin() || $GLOBALS['pagenow'] === 'wp-login.php') {
        return;
    }
    
    // Create nonce for the form
    $nonce = wp_create_nonce('bevision_lead_form');
    
    // Popup HTML
    ?>
    <div id="bevision-lead-popup" class="bevision-lead-popup" style="display: none;">
        <div class="popup-header">
            <h2 class="popup-title">მოითხოვეთ დემო</h2>
            <button class="popup-close">&times;</button>
        </div>
        <div class="popup-content">
            <p class="popup-subtitle">გთხოვთ შეიყვანოთ თქვენი სახელი და ნომერი, ჩვენ დაგიკავშირდებით მალე</p>
            
            <form id="lead-form" class="popup-form">
                <input type="hidden" id="lead_form_nonce" name="lead_form_nonce" value="<?php echo esc_attr($nonce); ?>" />
                <div class="form-group">
                    <input type="text" id="name" name="name" placeholder="თქვენი სახელი" required />
                </div>
                <div class="form-group">
                    <input type="text" id="company" name="company" placeholder="კომპანია" required />
                </div>
                <div class="form-group">
                    <input type="tel" id="phone" name="phone" placeholder="ტელეფონის ნომერი" required />
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder="ელ-ფოსტა" required />
                </div>
                <div class="form-buttons">
                    <button type="submit" class="submit-button">მოთხოვნა</button>
                    <button type="button" class="cancel-button">გაუქმება</button>
                </div>
            </form>
            <div id="success-message" class="success-message" style="display: none;">
                მადლობას გიხდით თქვენი შეტყობინებისთვის! ჩვენ დაგიკავშირდებით მალე.
            </div>
        </div>
    </div>
    <div id="popup-overlay" class="popup-overlay" style="display: none;"></div>
    <?php
}

// Function to add inline CSS for the popup
function bevision_lead_popup_styles() {
    ?>
    <style type="text/css">
        /* Lead Popup Styles */
        .bevision-lead-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            padding: 0;
            border-radius: 8px;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            max-width: 460px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }

        .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
        }
        
        .popup-header {
            position: relative;
            padding: 40px 40px 0px;
        }

        .popup-close {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 30px;
            background: none;
            border: none;
            cursor: pointer;
            color: #888;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .popup-close:hover {
            color: #333;
        }

        .popup-title {
            margin-top: 0;
            margin-bottom: 0;
            font-size: 30px;
            font-weight: 600;
            color: #333356;
        }

        .popup-content {
            padding: 0 40px 40px;
        }

        .popup-subtitle {
            margin-top: 15px;
            margin-bottom: 20px;
            font-size: 16px;
            color: #6e7c90;
            line-height: 1.5;
        }

        .popup-form .form-group {
            margin-bottom: 15px;
        }

        .popup-form input {
            width: 100%;
            padding: 15px 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            color: #333;
            box-sizing: border-box;
        }

        .popup-form input:focus {
            outline: none;
            border-color: #6c62fd;
            box-shadow: 0 0 0 2px rgba(108, 98, 253, 0.1);
        }
        
        .popup-form input::placeholder {
            color: #aab7c4;
        }

        .form-buttons {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin-top: 25px;
        }

        .submit-button, 
        .cancel-button {
            flex: 1;
            padding: 15px 20px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
        }

        .submit-button {
            background-color: #6c62fd;
            color: #fff;
            border: none;
        }

        .submit-button:hover {
            background-color: #5a52d5;
        }

        .cancel-button {
            background-color: #f5f6f8;
            color: #6e7c90;
            border: none;
        }

        .cancel-button:hover {
            background-color: #e8eaed;
        }

        .success-message {
            padding: 15px;
            background-color: #d4edda;
            color: #155724;
            border-radius: 4px;
            margin-top: 20px;
            text-align: center;
        }

        /* Responsive adjustments */
        @media (max-width: 576px) {
            .bevision-lead-popup {
                padding: 20px;
                width: 95%;
            }
            
            .popup-title {
                font-size: 20px;
            }
            
            .popup-subtitle {
                font-size: 14px;
            }
        }
    </style>
    <?php
}

// Function to add inline JS for the popup functionality
function bevision_lead_popup_scripts() {
    ?>
    <script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function() {
        // Get elements
        const headerDemoButton = document.getElementById('header-demo-button');
        const demoButtons = document.querySelectorAll('.demo-button');
        const popup = document.getElementById('bevision-lead-popup');
        const overlay = document.getElementById('popup-overlay');
        const closeButton = document.querySelector('.popup-close');
        const cancelButton = document.querySelector('.cancel-button');
        const leadForm = document.getElementById('lead-form');
        const successMessage = document.getElementById('success-message');
        
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
        
        // Close popup when Cancel button is clicked
        if (cancelButton) {
            cancelButton.addEventListener('click', closePopup);
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
                
                // Add action for WordPress AJAX
                formData.append('action', 'bevision_submit_lead');
                
                // Show loading state
                const submitButton = leadForm.querySelector('.submit-button');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.innerHTML = 'იგზავნება...';
                }
                
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
                        
                        // Close popup after 3 seconds
                        setTimeout(function() {
                            closePopup();
                            // Reset form after closing
                            setTimeout(function() {
                                leadForm.reset();
                                leadForm.style.display = 'block';
                                successMessage.style.display = 'none';
                                if (submitButton) {
                                    submitButton.disabled = false;
                                    submitButton.innerHTML = 'მოთხოვნა';
                                }
                            }, 300);
                        }, 3000);
                    } else {
                        // Show error message
                        alert(data.data.message || 'An error occurred. Please try again later.');
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.innerHTML = 'მოთხოვნა';
                        }
                    }
                })
                .catch(error => {
                    console.error('Error submitting lead form:', error);
                    alert('დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ მოგვიანებით.');
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerHTML = 'მოთხოვნა';
                    }
                });
            });
        }
    });
    </script>
    <?php
}

// Hook into wp_footer to output the popup HTML, CSS, and JS
function bevision_add_lead_popup_to_footer() {
    bevision_render_lead_popup();
    bevision_lead_popup_styles();
    bevision_lead_popup_scripts();
}
add_action('wp_footer', 'bevision_add_lead_popup_to_footer', 100);

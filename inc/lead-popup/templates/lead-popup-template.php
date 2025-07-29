<?php
/**
 * Template for the lead popup form
 * 
 * @package BeVision
 */

// Don't allow direct access to this file
if (!defined('ABSPATH')) {
    exit;
}

// Create nonce for the form
$nonce = wp_create_nonce('bevision_lead_form');
?>
<div id="bevision-new-popup" style="display: none;">
    <div class="new-popup-header" id="popup-header">
        <h2 class="new-popup-title">მოითხოვე დემო</h2>
        <button class="new-popup-close">&times;</button>
    </div>
    <div class="new-popup-content">
        <p class="new-popup-subtitle" id="popup-subtitle">გთხოვთ, შეიყვანოთ თქვენი სახელი და ნომერი, ჩვენ მალე დაგიკავშირდებით</p>
        
        <div id="demo-form-wrapper">
            <!-- Form (Initially Visible) -->
            <div id="form-part" style="display: block;" class="new-popup-form">
                <div class="new-form-group">
                    <input type="text" name="name" id="lead-name" placeholder="შენი სახელი" required class="new-form-input validate-field" />
                </div>
                <div class="new-form-group">
                    <input type="text" name="company" id="lead-company" placeholder="კომპანია" required class="new-form-input validate-field" />
                </div>
                <div class="new-form-group">
                    <input type="tel" name="phone" id="lead-phone" placeholder="ტელეფონის ნომერი" required class="new-form-input validate-field" />
                </div>
                <div class="new-form-group">
                    <input type="email" name="email" id="lead-email" placeholder="ელ-ფოსტა" required class="new-form-input validate-field" />
                </div>
                <div class="new-form-buttons">
                    <button type="button" id="lead-submit-button" class="new-submit-button" onclick="validateAndSubmit();" disabled style="opacity: 0.6; cursor: not-allowed;">მოთხოვნა</button>
                    <button type="button" class="new-cancel-button">გაუქმება</button>
                </div>
            </div>
            
            <!-- Success (Initially Hidden) -->
            <div id="success-part" style="display: none; text-align: center; position: relative;">
                <button class="new-popup-close" style="position: absolute; top: -45px; right: -10px; font-size: 30px; background: none; border: none; cursor: pointer; color: #888; width: 30px; height: 30px; line-height: 30px; text-align: center; transition: all 0.3s ease; z-index: 10;">&times;</button>
                <div style="margin: 35px 0px 25px 0px; position: relative; z-index: 1;">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/form-success-part.svg" alt="Success" width="50" height="51" />
                </div>
                <h3 style="color: var(--Dark-Blue, #221A4C); font-size: 20px; font-style: normal; font-weight: 700; line-height: normal; margin-bottom: 10px;">თქვენი მოთხოვნა გაგზავნილია</h3>
                <p style="color: var(--Grey, #8399AF); text-align: center; font-size: 16px; font-style: normal; font-weight: 400; line-height: normal; margin-bottom: 30px;">მალე დაგიკავშირდებით</p>
                <button type="button" style="background-color: transparent; border: none; color: #6e7c90; font-size: 16px; padding: 10px 30px; cursor: pointer;">დახურვა</button>
            </div>
        </div>
    </div>
</div>
<div id="new-popup-overlay" style="display: none;"></div>

<!-- Define ajaxurl for front-end -->
<script>
var ajaxurl = '<?php echo esc_url(admin_url('admin-ajax.php')); ?>';
</script>

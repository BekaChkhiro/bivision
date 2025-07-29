<?php
/**
 * BeVision Admin Documentation
 * 
 * Creates a documentation page in the WordPress admin area as an options page
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register the documentation page as a top-level admin menu item
 */
function bevision_register_documentation_page() {
    add_menu_page(
        'BeVision დოკუმენტაცია', // Page title
        'BeVision დოკუმენტაცია',  // Menu title
        'manage_options',         // Capability
        'bevision-documentation', // Menu slug
        'bevision_render_documentation_page', // Callback function
        'dashicons-book-alt',     // Icon
        30                        // Position - after Comments (25) but before Appearance (60)
    );
}
add_action('admin_menu', 'bevision_register_documentation_page');

/**
 * Render the documentation page content
 */
function bevision_render_documentation_page() {
    ?>
    <div class="bevision-documentation-wrapper">
        <div class="bevision-documentation-header">
            <h1>BeVision საიტის დოკუმენტაცია</h1>
            <p class="bevision-intro">ეს გვერდი შეიცავს სრულ ინფორმაციას თუ როგორ მართოთ BeVision ვებსაიტი. აქ იხილავთ ინსტრუქციებს პოსტების, პროდუქტების და Gutenberg ბლოკების მართვის შესახებ.</p>
        </div>

        <div class="bevision-documentation-navigation">
            <ul>
                <li><a href="#posts">პოსტების მართვა</a></li>
                <li><a href="#products">პროდუქტების მართვა</a></li>
                <li><a href="#blocks">Gutenberg ბლოკები</a></li>
                <li><a href="#menus">მენიუს მართვა</a></li>
                <li><a href="#faq">ხშირად დასმული კითხვები</a></li>
            </ul>
        </div>

        <div class="bevision-documentation-content">
            <!-- Posts Section -->
            <section id="posts" class="documentation-section">
                <h2>პოსტების მართვა</h2>
                
                <div class="documentation-subsection">
                    <h3>ახალი პოსტის შექმნა</h3>
                    <ol>
                        <li>დააჭირეთ მარცხენა მენიუში <strong><a href="<?php echo admin_url('post-new.php'); ?>" target="_blank">Posts → Add New</a></strong></li>
                        <li>შეიყვანეთ პოსტის სათაური</li>
                        <li>დაამატეთ შინაარსი Gutenberg ედიტორში</li>
                        <li>დაამატეთ სურათი "Featured Image" სექციაში</li>
                        <li>აირჩიეთ შესაბამისი კატეგორიები</li>
                        <li>დააჭირეთ <strong>Publish</strong> ღილაკს</li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>მთავარი გვერდი:</strong> თუ ეს ახალი პოსტია, შესაძლოა გამოჩნდეს მთავარ გვერდზე ბოლო პოსტების სექციაში</li>
                            <li><strong>ბლოგის გვერდი:</strong> ყველა პოსტი გამოჩნდება ბლოგის გვერდზე</li>
                            <li><strong>კატეგორიების გვერდები:</strong> პოსტი გამოჩნდება შესაბამისი კატეგორიის გვერდზე</li>
                            <li><strong>RSS ფიდი:</strong> ახალი პოსტები ავტომატურად ემატება RSS ფიდს</li>
                        </ul>
                    </div>
                    <div class="note">
                        <p><strong>რჩევა:</strong> ყოველთვის დაამატეთ მთავარი სურათი პოსტისთვის, რათა უკეთ გამოჩნდეს საიტზე.</p>
                    </div>
                </div>

                <div class="documentation-subsection">
                    <h3>პოსტის რედაქტირება</h3>
                    <ol>
                        <li>გადადით <strong><a href="<?php echo admin_url('edit.php'); ?>" target="_blank">Posts → All Posts</a></strong></li>
                        <li>მოძებნეთ პოსტი, რომლის რედაქტირებაც გსურთ</li>
                        <li>გადაატარეთ მაუსი პოსტის სათაურზე და დააჭირეთ <strong>Edit</strong></li>
                        <li>შეცვალეთ საჭირო ინფორმაცია</li>
                        <li>დააჭირეთ <strong>Update</strong> ღილაკს ცვლილებების შესანახად</li>
                    </ol>
                    <div class="where-appears">
                        <h4>ცვლილებები სად გამოჩნდება?</h4>
                        <p>ცვლილებები დაუყოვნებლივ აისახება საიტის ყველა ნაწილში, სადაც ეს პოსტია გამოყენებული - ინდივიდუალურ გვერდზე, ბლოგში, კატეგორიების გვერდებზე და RSS ფიდში.</p>
                    </div>
                </div>

                <div class="documentation-subsection">
                    <h3>კატეგორიების მართვა</h3>
                    <p>კატეგორიები საშუალებას გაძლევთ დაალაგოთ პოსტები ლოგიკურ ჯგუფებად:</p>
                    <ol>
                        <li>გადადით <strong><a href="<?php echo admin_url('edit-tags.php?taxonomy=category'); ?>" target="_blank">Posts → Categories</a></strong></li>
                        <li>შეავსეთ კატეგორიის სახელი და სხვა დეტალები</li>
                        <li>დააჭირეთ <strong>Add New Category</strong> ღილაკს</li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>კატეგორიის გვერდი:</strong> ავტომატურად შეიქმნება ახალი კატეგორიის გვერდი URL-ზე: <code>/category/your-category-slug/</code></li>
                            <li><strong>მენიუები:</strong> შეგიძლიათ დაამატოთ კატეგორია მენიუში <a href="<?php echo admin_url('nav-menus.php'); ?>" target="_blank">Appearance → Menus</a> გვერდიდან</li>
                            <li><strong>ვიჯეტები:</strong> კატეგორიები ჩანს Categories ვიჯეტში, თუ გამოყენებულია</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Products Section -->
            <section id="products" class="documentation-section">
                <h2>პროდუქტების მართვა</h2>
                
                <div class="documentation-subsection">
                    <h3>BeVision პროდუქტები</h3>
                    <p>ჩვენი საიტი იყენებს სპეციალურ პროდუქტების ტიპს (Custom Post Type), რომელიც საშუალებას გაძლევთ მარტივად მართოთ პროდუქტები.</p>

                    <h3>ახალი პროდუქტის შექმნა</h3>
                    <ol>
                        <li>გადადით მარცხენა მენიუში <strong><a href="<?php echo admin_url('post-new.php?post_type=bevision_product'); ?>" target="_blank">Products → Add New</a></strong></li>
                        <li>შეიყვანეთ პროდუქტის სათაური "პროდუქტის სათაური" ველში</li>
                        <li>შეავსეთ ყველა სავალდებულო ველი:
                            <ul>
                                <li><strong>ქვესათაური (subtitle)</strong> - მოკლე აღწერა პროდუქტისთვის</li>
                                <li><strong>სათაური გამოსაჩენად (display title)</strong> - როგორ გამოჩნდება სათაური საიტზე</li>
                                <li><strong>მახასიათებლების სია (features)</strong> - პროდუქტის მახასიათებლები</li>
                            </ul>
                        </li>
                        <li>დაამატეთ სურათი "Featured Image" სექციაში</li>
                        <li>შეიყვანეთ პროდუქტის აღწერა Gutenberg ედიტორში</li>
                        <li>დააჭირეთ <strong>Publish</strong> ღილაკს</li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>პროდუქტის გვერდი:</strong> ყოველ პროდუქტს აქვს საკუთარი გვერდი URL-ზე: <code>/bevision_product/your-product-name</code></li>
                            <li><strong>"Products from CPT" ბლოკში:</strong> პროდუქტები ავტომატურად გამოჩნდება ამ ბლოკში ტაბების სახით</li>
                            <li><strong>მენიუში:</strong> პროდუქტები შეიძლება დაემატოს მენიუს <a href="<?php echo admin_url('nav-menus.php'); ?>" target="_blank">Appearance → Menus</a> გვერდიდან</li>
                        </ul>
                    </div>
                    <div class="note">
                        <p><strong>მნიშვნელოვანი:</strong> "პროდუქტის სათაური" ველი ავტომატურად ანახლებს WordPress-ის სტანდარტულ სათაურის ველსაც, რაც საშუალებას გაძლევთ გამოაქვეყნოთ პროდუქტი.</p>
                    </div>
                </div>

                <div class="documentation-subsection">
                    <h3>პროდუქტის რედაქტირება</h3>
                    <ol>
                        <li>გადადით <strong><a href="<?php echo admin_url('edit.php?post_type=bevision_product'); ?>" target="_blank">Products → All Products</a></strong></li>
                        <li>მოძებნეთ პროდუქტი, რომლის რედაქტირებაც გსურთ</li>
                        <li>გადაატარეთ მაუსი პროდუქტის სათაურზე და დააჭირეთ <strong>Edit</strong></li>
                        <li>შეცვალეთ საჭირო ინფორმაცია</li>
                        <li>დააჭირეთ <strong>Update</strong> ღილაკს ცვლილებების შესანახად</li>
                    </ol>
                    <div class="where-appears">
                        <h4>ცვლილებები სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>პროდუქტის გვერდი:</strong> ყველა ცვლილება დაუყოვნებლივ აისახება პროდუქტის გვერდზე URL-ზე: <code>/bevision_product/your-product-name</code></li>
                            <li><strong>"Products from CPT" ბლოკში:</strong> ცვლილებები აისახება ბლოკის ტაბებშიც, სადაც ეს პროდუქტი გამოჩნდება</li>
                            <li><strong>მენიუში:</strong> თუ პროდუქტი დამატებულია მენიუში, მისი სახელი და აღწერა ავტომატურად განახლდება</li>
                        </ul>
                    </div>
                </div>

                <div class="documentation-subsection">
                    <h3>პროდუქტების ბლოკი</h3>
                    <p>საიტზე გვაქვს "Products from CPT" ბლოკი, რომელიც ავტომატურად აჩვენებს თქვენს პროდუქტებს ტაბების სახით.</p>
                    <ol>
                        <li>გადადით <a href="<?php echo admin_url('post-new.php?post_type=page'); ?>" target="_blank">გვერდის</a> ან <a href="<?php echo admin_url('post-new.php'); ?>" target="_blank">პოსტის</a> რედაქტირებაზე</li>
                        <li>დაამატეთ ახალი ბლოკი (+) და მოძებნეთ "Products from CPT"</li>
                        <li>ბლოკს აქვს ორი ღილაკი:
                            <ul>
                                <li><strong>Learn More</strong> - გადაამისამართებს პროდუქტის გვერდზე</li>
                                <li><strong>Book a Call</strong> - გახსნის ლიდ ფორმას</li>
                            </ul>
                        </li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>გვერდის ან პოსტის შუა ნაწილში:</strong> ბლოკი გამოჩნდება ყველა პროდუქტით ტაბების სახით</li>
                            <li><strong>პროდუქტების სექცია:</strong> ხშირად გამოიყენება მთავარ გვერდზე ან პროდუქტების მთავარ გვერდზე</li>
                            <li><strong>ღილაკების ფერები:</strong> "Learn More" ღილაკი იისფერია (#6653C6), "Book a Call" ღილაკი მწვანე ფერისაა (#2FCA02)</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Gutenberg Blocks Section -->
            <section id="blocks" class="documentation-section">
                <h2>Gutenberg ბლოკები</h2>
                <p>BeVision თემა შეიცავს რამდენიმე მორგებულ Gutenberg ბლოკს, რომლებიც საშუალებას გაძლევთ შექმნათ მიმზიდველი და ფუნქციონალური გვერდები.</p>
                <p>ბლოკების დამატება შეგიძლიათ ნებისმიერ <a href="<?php echo admin_url('post-new.php?post_type=page'); ?>" target="_blank">გვერდზე</a> ან <a href="<?php echo admin_url('post-new.php'); ?>" target="_blank">პოსტზე</a> Gutenberg ედიტორში.</p>

                <div class="documentation-subsection">
                    <h3>Simple Content Block</h3>
                    <p>ეს ბლოკი გამოიყენება მარტივი კონტენტის გამოსაჩენად, სათაურით და აღწერით.</p>
                    <ol>
                        <li>დაამატეთ ახალი ბლოკი (+) და მოძებნეთ <strong>"Simple Content Block"</strong></li>
                        <li>შეიყვანეთ სათაური და აღწერა</li>
                        <li>შეცვალეთ სტილი თქვენი სურვილისამებრ</li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>გვერდზე ან პოსტზე:</strong> ზუსტად ისე, როგორც ედიტორში ჩანს</li>
                            <li><strong>სტილი:</strong> გააჩნია სუფთა, ცენტრირებული დიზაინი, მხოლოდ სათაურით და აღწერით</li>
                            <li><strong>მაგალითი:</strong> ხშირად გამოიყენება გვერდის შუა ნაწილში მოკლე ინფორმაციის გამოსაჩენად</li>
                        </ul>
                    </div>
                </div>

                <div class="documentation-subsection">
                    <h3>Contact Us Block</h3>
                    <p>საკონტაქტო ბლოკი მობილური მოწყობილობებისთვის ოპტიმიზირებული დიზაინით.</p>
                    <ol>
                        <li>დაამატეთ ახალი ბლოკი (+) და მოძებნეთ <strong>"Contact Us"</strong></li>
                        <li>შეავსეთ საკონტაქტო ინფორმაცია</li>
                        <li>მოარგეთ ღილაკი თქვენი სურვილისამებრ</li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>საკონტაქტო გვერდები:</strong> ხშირად გამოიყენება <a href="<?php echo admin_url('post.php?post=' . get_page_by_path('contact')->ID . '&action=edit'); ?>" target="_blank">საკონტაქტო გვერდზე</a></li>
                            <li><strong>მობილური მაქსიმალიზაცია:</strong> ბლოკი ავტომატურად ერგება სვეტებიან განლაგებას მობილურ მოწყობილობებზე</li>
                            <li><strong>ღილაკის სტილი:</strong> ღილაკს აქვს თეთრი ტექსტი მწვანე ფონზე და 10px 40px padding</li>
                        </ul>
                    </div>
                </div>

                <div class="documentation-subsection">
                    <h3>Analytics Hero Block</h3>
                    <p>მთავარი გმირის ბლოკი ანალიტიკის გვერდებისთვის.</p>
                    <ol>
                        <li>დაამატეთ ახალი ბლოკი (+) და მოძებნეთ <strong>"Analytics Hero"</strong></li>
                        <li>შეცვალეთ სათაური, ქვესათაური და ღილაკის ტექსტი</li>
                        <li>ღილაკის სტილი:
                            <ul>
                                <li>padding: 15px 40px</li>
                                <li>height: 51px</li>
                                <li>font-size: 18px</li>
                                <li>font-weight: bold</li>
                            </ul>
                        </li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>ანალიტიკის გვერდები:</strong> ხშირად გამოიყენება ანალიტიკის პროდუქტების გვერდების თავში</li>
                            <li><strong>შრიფტის ზომები:</strong>
                                <ul>
                                    <li>ქვესათაური: 18px, font-weight: 600</li>
                                    <li>მთავარი სათაური: 40px, font-weight: 600</li>
                                </ul>
                            </li>
                            <li><strong>რესპონსიულობა:</strong> ბლოკი ავტომატურად ერგება როგორც დესკტოპს, ისე მობილურ მოწყობილობებს</li>
                        </ul>
                    </div>
                </div>

                <div class="documentation-subsection">
                    <h3>Product Cards Block</h3>
                    <p>ბლოკი პროდუქტების ბარათების გამოსაჩენად 3 სვეტად.</p>
                    <ol>
                        <li>დაამატეთ ახალი ბლოკი (+) და მოძებნეთ <strong>"Product Cards"</strong></li>
                        <li>შეავსეთ თითოეული ბარათის ინფორმაცია</li>
                        <li>დაამატეთ ბმულები ბარათებზე</li>
                        <li>გამოიყენეთ "Add Card" ღილაკი მეტი ბარათის დასამატებლად</li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>პროდუქტების სექცია:</strong> ხშირად გამოიყენება მთავარ გვერდზე ან კატეგორიის გვერდებზე</li>
                            <li><strong>განლაგება:</strong> ყოველთვის აჩვენებს ზუსტად 3 ბარათს ერთ რიგში დესკტოპზე (1250px max-width)</li>
                            <li><strong>ბმულები:</strong> თითოეული ბარათი შეიძლება გახდეს ბმული და გადაამისამართოს ნებისმიერ URL-ზე</li>
                            <li><strong>რესპონსიულობა:</strong> მობილურზე ავტომატურად ერგება 1 ან 2 სვეტიან განლაგებას ეკრანის ზომის მიხედვით</li>
                        </ul>
                    </div>
                </div>

                <div class="documentation-subsection">
                    <h3>Why BeVision Block</h3>
                    <p>ბლოკი, რომელიც აჩვენებს BeVision-ის უპირატესობებს.</p>
                    <ol>
                        <li>დაამატეთ ახალი ბლოკი (+) და მოძებნეთ <strong>"Why BeVision"</strong></li>
                        <li>დაამატეთ სურათი</li>
                        <li>შეავსეთ ტექსტი და სტატისტიკის ელემენტები</li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>მთავარი გვერდი:</strong> ხშირად გამოიყენება მთავარ გვერდზე ან "About Us" სექციაში</li>
                            <li><strong>დიზაინის ელემენტები:</strong>
                                <ul>
                                    <li>ყველა ბორდერის რადიუსი სტანდარტიზებულია 12px-ზე</li>
                                    <li>სურათის სიმაღლე ავტომატურად ემთხვევა მარჯვენა სვეტის სიმაღლეს</li>
                                </ul>
                            </li>
                            <li><strong>სტატისტიკის ელემენტები:</strong> მარჯვენა სვეტში შეგიძლიათ დაამატოთ სხვადასხვა სტატისტიკური მონაცემები იკონებით და მოკლე აღწერით</li>
                        </ul>
                    </div>
                </div>

                <div class="documentation-subsection">
                    <h3>Testimonial Block</h3>
                    <p>ბლოკი ტესტიმონიალების გამოსაჩენად ორსვეტიანი განლაგებით.</p>
                    <ol>
                        <li>დაამატეთ ახალი ბლოკი (+) და მოძებნეთ <strong>"Testimonial"</strong></li>
                        <li>შეავსეთ შესავალი ტექსტი მარცხენა სვეტში</li>
                        <li>დაამატეთ ტესტიმონიალის ციტატა, ავტორის სურათი, სახელი და თანამდებობა</li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>მთავარი გვერდი:</strong> ხშირად გამოიყენება მთავარ გვერდზე ან "About Us" სექციაში</li>
                            <li><strong>დიზაინის ელემენტები:</strong>
                                <ul>
                                    <li>ორსვეტიანი განლაგება - მარცხენა სვეტში შესავალი, მარჯვენა სვეტში ტესტიმონიალი</li>
                                    <li>მარცხენა სვეტის flex მნიშვნელობა 0.8-ია, რაც მას უფრო ვიწროს ხდის</li>
                                    <li>ტესტიმონიალის მარჯვენა სვეტს აქვს იისფერი საზღვარი</li>
                                </ul>
                            </li>
                            <li><strong>ავტორის ელემენტები:</strong>
                                <ul>
                                    <li>წრიული ავტორის სურათი 56px ზომით</li>
                                    <li>ავტორის სახელი და თანამდებობა იწერება HTML ფორმატში</li>
                                </ul>
                            </li>
                            <li><strong>რესპონსიულობა:</strong> მობილურზე ბლოკი ავტომატურად იცვლის სვეტების განლაგებას ერთი მეორის ქვეშ</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Menus Section -->
            <section id="menus" class="documentation-section">
                <h2>მენიუს მართვა</h2>
                
                <div class="documentation-subsection">
                    <h3>მთავარი მენიუს კონფიგურაცია</h3>
                    <ol>
                        <li>გადადით <strong><a href="<?php echo admin_url('nav-menus.php'); ?>" target="_blank">Appearance → Menus</a></strong></li>
                        <li>აირჩიეთ მენიუ, რომლის რედაქტირებაც გსურთ ან შექმენით ახალი</li>
                        <li>დაამატეთ გვერდები, პოსტები ან ბმულები მარცხენა პანელიდან</li>
                        <li>გადაიტანეთ მენიუს ელემენტები სასურველი თანმიმდევრობით</li>
                        <li>ქვემენიუების შესაქმნელად, გადაიტანეთ ელემენტი მარჯვნივ მშობელი ელემენტის ქვეშ</li>
                        <li>დააჭირეთ <strong>Save Menu</strong> ღილაკს</li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>საიტის მთავარი სანავიგაციო ზონა:</strong> მთავარი მენიუ ჩვეულებრივ გამოჩნდება საიტის ძირითად ნავიგაციაში</li>
                            <li><strong>მობილური მენიუ:</strong> მობილურ მოწყობილობებზე მენიუ იხსნება "hamburger" ღილაკით</li>
                            <li><strong>ქვემენიუები:</strong> მენიუს ელემენტები, რომლებსაც აქვთ ქვემენიუ, ავტომატურად მიიღებენ ჩევრონის ტიპის ისრის ნიშანს</li>
                        </ul>
                    </div>
                    <div class="note">
                        <p><strong>გაითვალისწინეთ:</strong> მენიუს ელემენტები, რომლებსაც აქვთ ქვემენიუ, ავტომატურად მიიღებენ ისრის ნიშანს, რაც მიუთითებს, რომ მათ აქვთ ჩამოსაშლელი მენიუ.</p>
                    </div>
                </div>

                <div class="documentation-subsection">
                    <h3>ენის სელექტორის მენიუ</h3>
                    <p>ენის სელექტორს აქვს სპეციალური სტილი:</p>
                    <ul>
                        <li>ფონტის ზომა: 20px</li>
                        <li>ფონტის წონა: 600</li>
                        <li>ჩამოსაშლელი მენიუს ნიშანი: სამკუთხედი</li>
                    </ul>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>ძირითადი მენიუს მარჯვენა მხარეს:</strong> ენის სელექტორი ჩვეულებრივ გამოჩნდება მთავარი მენიუს ბოლოს</li>
                            <li><strong>ინტერაქცია:</strong> დაწკაპუნებისას ჩამოშლის სამკუთხედი ისარი, რომელიც გაშლისას შემობრუნდება</li>
                            <li><strong>ფერი:</strong> ენის სელექტორი იყენებს იმავე სტილს რასაც ძირითადი მენიუ, მხოლოდ უფრო მსხვილი შრიფტით</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- FAQ Section -->
            <section id="faq" class="documentation-section">
                <h2>ხშირად დასმული კითხვები</h2>
                <p>აქ იხილავთ პასუხები ყველაზე ხშირად დასმულ კითხვებზე და მოკლე ინსტრუქციები საიტის მართვისთვის.</p>
                
                <div class="documentation-subsection faq-item">
                    <h3>როგორ განვაახლო მთავარი გვერდი?</h3>
                    <p>მთავარი გვერდის განსაახლებად:</p>
                    <ol>
                        <li>გადადით <strong><a href="<?php echo admin_url('edit.php?post_type=page'); ?>" target="_blank">Pages</a></strong> სექციაში</li>
                        <li>მოძებნეთ და დააჭირეთ <a href="<?php echo admin_url('post.php?post=' . get_option('page_on_front') . '&action=edit'); ?>" target="_blank">"Home" ან "მთავარი გვერდი"</a></li>
                        <li>განაახლეთ საჭირო ბლოკები</li>
                        <li>დააჭირეთ <strong>Update</strong> ღილაკს</li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოჩნდება?</h4>
                        <ul>
                            <li><strong>მთავარი გვერდი:</strong> ცვლილებები აისახება საიტის მთავარ გვერდზე <code>yourdomain.com</code></li>
                            <li><strong>ბლოკები:</strong> რომელი ბლოკიც შეცვალეთ, ის აისახება მის შესაბამის ადგილას მთავარ გვერდზე</li>
                            <li><strong>სწრაფი განახლება:</strong> განახლებები დაუყოვნებლივ აისახება საიტზე "Update" ღილაკზე დაჭერისთანავე</li>
                        </ul>
                    </div>
                </div>


                <div class="documentation-subsection faq-item">
                    <h3>როგორ ვმართო მედია ფაილები?</h3>
                    <p>მედია ფაილების მართვისთვის:</p>
                    <ol>
                        <li>გადადით <strong><a href="<?php echo admin_url('upload.php'); ?>" target="_blank">Media → Library</a></strong></li>
                        <li>აქ შეგიძლიათ ნახოთ, შეცვალოთ ან წაშალოთ ატვირთული ფაილები</li>
                        <li>ახალი ფაილის ასატვირთად, დააჭირეთ <strong><a href="<?php echo admin_url('media-new.php'); ?>" target="_blank">Add New</a></strong> ღილაკს</li>
                    </ol>
                    <div class="where-appears">
                        <h4>სად გამოიყენება ატვირთული მედია?</h4>
                        <ul>
                            <li><strong>ბლოკებში:</strong> მედია ფაილები შეიძლება დაამატოთ Gutenberg ბლოკებში სურათების და გალერეის სახით</li>
                            <li><strong>მთავარი სურათები:</strong> შეგიძლიათ დააყენოთ "Featured Image" სახით პოსტებსა და პროდუქტებზე</li>
                            <li><strong>პროდუქტის სურათები:</strong> პროდუქტის ფოტოები იტვირთება მედია ბიბლიოთეკიდან</li>
                            <li><strong>მედია არჩევანი:</strong> როდესაც ამატებთ სურათს საიტზე, აუტვირთება მედია არჩევანი არსებული ფაილების სანახავად</li>
                        </ul>
                    </div>
                    <div class="note">
                        <p><strong>რჩევა:</strong> სურათები ატვირთეთ ოპტიმიზირებული ზომით, რომ არ შეანელოთ საიტის სიჩქარე. რეკომენდებული მაქსიმალური ზომა სურათებისთვის არის 1920px სიგანეზე.</p>
                    </div>
                </div>

            </section>
        </div>
    </div>
    <?php
}

/**
 * Enqueue admin styles for the documentation page
 */
function bevision_documentation_styles() {
    $screen = get_current_screen();
    
    // Only load styles on our custom documentation page
    if ($screen && $screen->id === 'toplevel_page_bevision-documentation') {
        wp_enqueue_style(
            'bevision-documentation-styles',
            get_template_directory_uri() . '/inc/css/admin-documentation.css',
            array(),
            '1.0.0'
        );
    }
}
add_action('admin_enqueue_scripts', 'bevision_documentation_styles');

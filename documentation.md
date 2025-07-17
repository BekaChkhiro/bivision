# BeVision WordPress Theme - ტექნიკური დოკუმენტაცია

## 1. პროექტის მიმოხილვა

BeVision არის თანამედროვე WordPress ბლოკ თემა, რომელიც შექმნილია WordPress-ის Full Site Editing (FSE) შესაძლებლობების გამოყენებით. თემა შექმნილია მოქნილი, მოდულური და მომხმარებლისთვის მარტივად გამოსაყენებელი ინტერფეისით.

### 1.1 ძირითადი მახასიათებლები

- **ბლოკზე დაფუძნებული დიზაინი**: სრულად იყენებს WordPress-ის ბლოკ რედაქტორის შესაძლებლობებს
- **მორგებადი ფონტების სისტემა**: საშუალებას აძლევს ადმინისტრატორებს ატვირთონ და მართონ საკუთარი ფონტები
- **AJAX-ზე დაფუძნებული პოსტების ფილტრაცია**: დინამიური პოსტების ჩატვირთვა კატეგორიების მიხედვით
- **თანამედროვე UI კომპონენტები**: სლაიდერები, ანიმაციები და რესპონსიული დიზაინი
- **TailwindCSS ინტეგრაცია**: მოქნილი და სწრაფი CSS სტილების სისტემა
- **REST API გაფართოებები**: მორგებული API ენდპოინტები მონაცემების მისაღებად

## 2. ტექნიკური სპეციფიკაციები

### 2.1 ტექნოლოგიური სტეკი

- **WordPress**: 6.0+ ვერსია
- **PHP**: 7.4 ან უფრო ახალი ვერსია
- **JavaScript**: ES6+ სტანდარტი
- **CSS**: TailwindCSS ფრეიმვორკი
- **Build Tools**: Webpack, PostCSS
- **Package Manager**: npm

### 2.2 დამოკიდებულებები

#### WordPress კომპონენტები:
- @wordpress/block-editor (v12.3.0)
- @wordpress/blocks (v12.12.0)
- @wordpress/components (v25.3.0)
- @wordpress/element (v5.14.0)

#### JavaScript ბიბლიოთეკები:
- react-slick (v0.30.3)
- slick-carousel (v1.8.1)
- swiper (v11.2.6)
- tiny-slider (v2.9.4)

#### Development Tools:
- @wordpress/scripts (v26.6.0)
- autoprefixer (v10.4.21)
- css-loader (v7.1.2)
- mini-css-extract-plugin (v2.9.2)
- postcss (v8.5.3)
- postcss-loader (v8.1.1)
- sass-loader (v16.0.5)
- style-loader (v4.0.0)
- tailwindcss (v3.4.17)

## 3. პროექტის სტრუქტურა

### 3.1 ძირითადი ფაილები

- **functions.php**: თემის მთავარი ფუნქციონალი
- **style.css**: თემის მეტადატა და მინიმალური სტილები
- **theme.json**: ბლოკ თემის კონფიგურაცია
- **tailwind.config.js**: TailwindCSS კონფიგურაცია
- **webpack.config.js**: Build კონფიგურაცია
- **package.json**: npm პაკეტების კონფიგურაცია

### 3.2 დირექტორიები

- **/assets**: სტატიკური ფაილები (ფონტები, სურათები)
- **/build**: კომპილირებული ფაილები
- **/inc**: PHP ინკლუდები (ფონტების მენეჯერი, ბლოკების რეგისტრაცია)
- **/parts**: თემის ნაწილები ბლოკ შაბლონებისთვის
- **/src**: საწყისი კოდი ბლოკებისა და კომპონენტებისთვის
- **/templates**: ბლოკ თემის შაბლონები
- **/node_modules**: npm პაკეტები (არ შედის ვერსიის კონტროლში)

### 3.3 ბლოკების სტრუქტურა

ბლოკები ორგანიზებულია შემდეგ კატეგორიებად:

#### ლეიაუტის ბლოკები:
- footer
- hero-section
- header-section

#### კონტენტის ბლოკები:
- products
- importance-section
- why-bivision
- partners
- analytics-hero
- client-testimonials
- product-hero
- dashboard-features
- category-analysis
- cross-sell-basket
- posts-tab

თითოეული ბლოკი შეიცავს შემდეგ ფაილებს:
- **index.js**: ბლოკის რეგისტრაცია და რედაქტორის ინტერფეისი
- **frontend.js**: ფრონტენდ ფუნქციონალი (საჭიროების შემთხვევაში)
- **style.css**: ბლოკის სტილები

## 4. ძირითადი კომპონენტები და ფუნქციონალი

### 4.1 ფონტების მენეჯმენტი

BeVision-ის ფონტების მენეჯმენტი სისტემა (`class-bevision-fonts.php`) საშუალებას აძლევს ადმინისტრატორებს:

- ატვირთონ საკუთარი ფონტები (TTF, OTF, WOFF, WOFF2 ფორმატებში)
- ნახონ და წაშალონ არსებული ფონტები
- ავტომატურად დაარეგისტრირონ ფონტები WordPress-ის თემის JSON-ში

ფონტების მენეჯერი იყენებს Singleton პატერნს და ავტომატურად რეგისტრირდება თემის ინიციალიზაციისას.

```php
// ფონტების მენეჯერის ინიციალიზაცია
add_action('after_setup_theme', function() {
    $fonts = BeVision_Fonts::get_instance();
    add_action('admin_menu', [$fonts, 'add_font_upload_page']);
    add_action('wp_enqueue_scripts', [$fonts, 'register_fonts']);
    add_action('admin_enqueue_scripts', [$fonts, 'register_fonts']);
});
```

### 4.2 ბლოკების რეგისტრაცია

ბლოკების რეგისტრაცია ხდება `blocks.php` ფაილში, სადაც თითოეული ბლოკი რეგისტრირდება `register_block_type` ფუნქციის გამოყენებით:

```php
function bevision_register_blocks() {
    if (!function_exists('register_block_type')) {
        return;
    }

    // ლეიაუტის ბლოკები
    register_block_type(get_template_directory() . '/src/blocks/layout/footer');
    register_block_type(get_template_directory() . '/src/blocks/layout/hero-section');
    // ...

    // კონტენტის ბლოკები
    register_block_type(get_template_directory() . '/src/blocks/content/products');
    register_block_type(get_template_directory() . '/src/blocks/content/importance-section');
    // ...
}
add_action('init', 'bevision_register_blocks');
```

განსაკუთრებული ბლოკებისთვის, როგორიცაა `posts-tab`, გამოიყენება დამატებითი პარამეტრები რენდერინგისა და ატრიბუტების მისათითებლად.

### 4.3 პოსტების ფილტრაცია და AJAX ფუნქციონალი

პოსტების ფილტრაციის ბლოკი (`posts-tab`) იყენებს AJAX-ს დინამიური კონტენტის ჩასატვირთად:

#### სერვერის მხარე (PHP):
```php
function bevision_ajax_get_posts() {
    $current_page = isset($_POST['page']) ? intval($_POST['page']) : 1;
    $posts_per_page = isset($_POST['per_page']) ? intval($_POST['per_page']) : 4;
    $category = isset($_POST['category']) ? sanitize_text_field($_POST['category']) : 'all';

    // პოსტების მოთხოვნა და დაბრუნება JSON ფორმატში
    // ...
}
add_action('wp_ajax_get_posts', 'bevision_ajax_get_posts');
add_action('wp_ajax_nopriv_get_posts', 'bevision_ajax_get_posts');
```

#### კლიენტის მხარე (JavaScript):
```javascript
function loadPosts(resetContainer = false) {
    // AJAX მოთხოვნის გაგზავნა
    fetch(window.bevisionSettings.ajaxUrl, {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(response => {
        // პოსტების დამუშავება და ჩვენება
        // ...
    });
}
```

### 4.4 REST API გაფართოებები

თემა აფართოებს WordPress-ის REST API-ს დამატებითი ენდპოინტებით:

```php
// ტესტური ენდპოინტი
register_rest_route('bevision/v1', '/test', array(
    'methods' => 'GET',
    'callback' => function() {
        return array('status' => 'ok');
    },
    'permission_callback' => function() {
        return true;
    }
));

// პოსტების ენდპოინტი
register_rest_route('bevision/v1', '/posts', array(
    'methods' => 'GET',
    'callback' => function() {
        // პოსტების მოთხოვნა და დაბრუნება
        // ...
    },
    'permission_callback' => function() {
        return true;
    }
));
```

## 5. სტილების სისტემა

### 5.1 TailwindCSS კონფიგურაცია

თემა იყენებს TailwindCSS-ს სტილებისთვის, კონფიგურაცია განსაზღვრულია `tailwind.config.js` ფაილში:

```javascript
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './templates/**/*.{html,php}',
    './parts/**/*.{html,php}',
    './*.php',
    './build/**/*.{js,css}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // გამორთულია Tailwind-ის საბაზისო სტილები WordPress-თან კონფლიქტის თავიდან ასაცილებლად
  },
}
```

### 5.2 Webpack კონფიგურაცია

Webpack კონფიგურაცია (`webpack.config.js`) აწყობს CSS და JavaScript ფაილებს:

```javascript
module.exports = {
    ...defaultConfig,
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules.filter(
                rule => !rule.test?.toString().includes('.css')
            ),
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('tailwindcss'),
                                    require('autoprefixer'),
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        ...defaultConfig.plugins,
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],
};
```

## 6. თემის კონფიგურაცია

### 6.1 theme.json

`theme.json` ფაილი განსაზღვრავს თემის ძირითად პარამეტრებს:

```json
{
    "version": 2,
    "settings": {
        "layout": {
            "contentSize": "840px",
            "wideSize": "1100px"
        },
        "color": {
            "palette": [
                {
                    "slug": "primary",
                    "color": "#0073a8",
                    "name": "Primary"
                },
                {
                    "slug": "secondary",
                    "color": "#6c757d",
                    "name": "Secondary"
                }
            ]
        },
        "typography": {
            "fontFamilies": [
                {
                    "name": "System Default",
                    "slug": "system",
                    "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif"
                },
                {
                    "fontFamily": "helvetica-neue-lt-ge",
                    "slug": "helvetica-neue-lt-ge",
                    "fontFace": [
                        {
                            "fontFamily": "helvetica-neue-lt-ge",
                            "fontStretch": "",
                            "fontStyle": "normal",
                            "fontWeight": "400",
                            "src": "http://bevision.local/wp-content/uploads/useanyfont/404Helvetica-Neue-LT-GE.woff2"
                        }
                    ],
                    "isUAF": true
                }
            ],
            "fontSizes": [
                {
                    "slug": "normal",
                    "size": "16px",
                    "name": "Normal"
                },
                {
                    "slug": "large",
                    "size": "24px",
                    "name": "Large"
                }
            ]
        }
    }
}
```

## 7. დეველოპმენტი და დეპლოიმენტი

### 7.1 დეველოპმენტის გარემო

დეველოპმენტისთვის გამოიყენება შემდეგი npm სკრიპტები:

```bash
# დეველოპმენტის რეჟიმში გაშვება (watch mode)
npm run start

# პროდაქშენ ბილდის შექმნა
npm run build

# პაკეტების განახლება
npm run packages-update
```

### 7.2 დებაგინგი

თემაში ჩართულია დებაგინგის რეჟიმი დეველოპმენტისთვის:

```php
// დებაგინგის ჩართვა
if (!defined('WP_DEBUG')) {
    define('WP_DEBUG', true);
}
if (!defined('WP_DEBUG_DISPLAY')) {
    define('WP_DEBUG_DISPLAY', true);
}
if (!defined('WP_DEBUG_LOG')) {
    define('WP_DEBUG_LOG', true);
}
```

პროდაქშენ გარემოში რეკომენდებულია ამ პარამეტრების გამორთვა.

## 8. ბლოკების დეტალური აღწერა

### 8.1 posts-tab ბლოკი

პოსტების ფილტრაციის ბლოკი საშუალებას აძლევს მომხმარებელს:
- დაათვალიეროს პოსტები კატეგორიების მიხედვით
- ჩატვირთოს მეტი პოსტი AJAX-ის გამოყენებით
- ნახოს პოსტების სათაურები, სურათები და მოკლე აღწერები

#### ატრიბუტები:
- `categories`: მასივი კატეგორიების ID-ებით
- `currentTab`: მიმდინარე არჩეული კატეგორია
- `postsPerPage`: პოსტების რაოდენობა თითო გვერდზე
- `maxPosts`: მაქსიმალური პოსტების რაოდენობა

#### რენდერინგი:
ბლოკი იყენებს სერვერის მხარეს რენდერინგს `bevision_render_posts_tab` ფუნქციის გამოყენებით, რომელიც აბრუნებს HTML სტრუქტურას და ტვირთავს საჭირო JavaScript-ს.

### 8.2 hero-section ბლოკი

მთავარი გმირის სექცია, რომელიც ჩვეულებრივ გამოიყენება ვებგვერდის ზედა ნაწილში.

### 8.3 products ბლოკი

პროდუქტების ჩვენების ბლოკი, სავარაუდოდ გამოიყენება პროდუქტების გალერეის ან სიის საჩვენებლად.

### 8.4 analytics-hero ბლოკი

ანალიტიკის სექცია, სავარაუდოდ გამოიყენება ანალიტიკური მონაცემების ვიზუალიზაციისთვის.

## 9. გაფართოების შესაძლებლობები

### 9.1 ახალი ბლოკების დამატება

ახალი ბლოკის დასამატებლად:

1. შექმენით ახალი დირექტორია `src/blocks/[category]/[block-name]/`
2. შექმენით `index.js` ფაილი ბლოკის რეგისტრაციისთვის
3. დაამატეთ ბლოკი `inc/blocks.php` ფაილში:

```php
register_block_type(get_template_directory() . '/src/blocks/[category]/[block-name]');
```

### 9.2 თემის გაფართოება

თემის გასაფართოებლად შეგიძლიათ:
- დაამატოთ ახალი შაბლონები `templates/` დირექტორიაში
- შექმნათ ახალი შაბლონის ნაწილები `parts/` დირექტორიაში
- გააფართოვოთ `functions.php` ახალი ფუნქციონალით

## 10. ცნობილი პრობლემები და გადაწყვეტები

### 10.1 დებაგინგი პროდაქშენში

პრობლემა: დებაგინგის რეჟიმი ჩართულია `functions.php`-ში, რაც არ არის რეკომენდებული პროდაქშენ გარემოსთვის.

გადაწყვეტა: გამორთეთ დებაგინგი პროდაქშენ გარემოში `wp-config.php` ფაილში:

```php
define('WP_DEBUG', false);
define('WP_DEBUG_DISPLAY', false);
define('WP_DEBUG_LOG', false);
```

### 10.2 CORS პოლიტიკა

პრობლემა: REST API-ს CORS პოლიტიკა ძალიან ღიაა, რაც შეიძლება უსაფრთხოების რისკი იყოს.

გადაწყვეტა: შეზღუდეთ CORS დაშვებები კონკრეტული დომენებისთვის:

```php
header('Access-Control-Allow-Origin: https://yourdomain.com');
```

## 11. მომავალი განვითარების გეგმები

### 11.1 რეკომენდებული გაუმჯობესებები

- წარმადობის ოპტიმიზაცია
- უსაფრთხოების გაძლიერება
- კოდის რეფაქტორინგი დუბლირების შესამცირებლად
- ტესტების დამატება
- დოკუმენტაციის გაუმჯობესება

### 11.2 შესაძლო ახალი ფუნქციები

- მრავალენოვანი მხარდაჭერის გაუმჯობესება
- დამატებითი ბლოკების შექმნა
- ინტეგრაცია სხვა პლაგინებთან
- მობილური ოპტიმიზაციის გაუმჯობესება

## 12. დასკვნა

BeVision არის თანამედროვე WordPress ბლოკ თემა, რომელიც იყენებს უახლეს ტექნოლოგიებს და საუკეთესო პრაქტიკებს. თემა შექმნილია მოქნილობისა და გაფართოების შესაძლებლობით, რაც საშუალებას აძლევს დეველოპერებს მარტივად მოარგონ იგი სხვადასხვა პროექტის მოთხოვნებს.

---

დოკუმენტაცია შექმნილია: 2025-04-24

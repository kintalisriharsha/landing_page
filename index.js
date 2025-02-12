<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZEPJM8D27P"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZEPJM8D27P');
</script>

<!-- Facebook Pixel -->
<script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1017889230362521');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1017889230362521&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Meta Pixel Code -->

<!-- Add this before closing </body> tag -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const toastContainer = document.querySelector('.toast-container');

    // Confetti Function
    function createConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        confettiContainer.innerHTML = '';

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = ['#f2d74e', '#95c3de', '#ff9a91'][Math.floor(Math.random() * 3)];
            confettiContainer.appendChild(confetti);
        }

        setTimeout(() => {
            confettiContainer.innerHTML = '';
        }, 5000);
    }

    // Toast Function
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div>
                <h4 style="font-weight: 600; margin-bottom: 4px;">Success!</h4>
                <p style="font-size: 0.9rem; opacity: 0.9;">${message}</p>
            </div>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }

    // Validation Functions
    function validateForm() {
        let isValid = true;
        const fields = ['name', 'email', 'phone', 'country'];
        const errorMessages = {
            name: 'Please enter your full name',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number',
            country: 'Please select a country'
        };

        fields.forEach(field => {
            const value = form[field].value.trim();
            clearError(field);

            if (!value) {
                showError(field, errorMessages[field]);
                isValid = false;
            } else if (field === 'email' && !/\S+@\S+\.\S+/.test(value)) {
                showError(field, errorMessages[field]);
                isValid = false;
            } else if (field === 'phone' && !/^\+?[\d\s-]{10,}$/.test(value)) {
                showError(field, errorMessages[field]);
                isValid = false;
            }
        });

        return isValid;
    }

    function showError(field, message) {
        const errorElement = document.querySelector(`[data-error="${field}"]`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        document.querySelector(`[name="${field}"]`).classList.add('error');
    }

    function clearError(field) {
        const errorElement = document.querySelector(`[data-error="${field}"]`);
        errorElement.style.display = 'none';
        document.querySelector(`[name="${field}"]`).classList.remove('error');
    }

    // Form Field Tracking
    form.querySelectorAll('input, select').forEach(element => {
        // Track field interactions
        element.addEventListener('focus', function() {
            gtag('event', 'form_field_focus', {
                'event_category': 'Form Interaction',
                'event_label': element.name
            });
            
            fbq('trackCustom', 'FormFieldFocus', {
                field_name: element.name
            });
        });

        // Clear errors on input
        element.addEventListener('input', () => {
            clearError(element.name);
        });
    });

    // Form Submission Handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            // Visual feedback
            showToast('Your application has been submitted successfully! We will contact you soon.');
            createConfetti();

            // Google Analytics tracking
            gtag('event', 'form_submission', {
                'event_category': 'Lead Generation',
                'event_label': 'MBBS Application'
            });

            // Facebook Pixel tracking
            fbq('track', 'Lead', {
                content_name: 'MBBS Application',
                status: 'submitted'
            });

            form.reset();
        }
    });
});

// Check and set tracking consent
document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize tracking
    function initializeTracking() {
        // Initialize Facebook Pixel tracking
        if (typeof fbq !== 'undefined') {
            fbq('consent', 'grant'); // Grant consent to Facebook Pixel
            fbq('track', 'PageView'); // Track page view
        }

        // Track form interactions
        const form = document.getElementById('applicationForm');
        if (form) {
            // Track form field interactions
            form.querySelectorAll('input, select').forEach(element => {
                element.addEventListener('focus', function() {
                    fbq('trackCustom', 'FormFieldFocus', {
                        field_name: element.name
                    });
                });
            });

            // Track form submissions
            form.addEventListener('submit', function(e) {
                if (validateForm()) {
                    fbq('track', 'Lead', {
                        content_name: 'MBBS Application',
                        status: 'submitted'
                    });
                }
            });
        }

        // Track button clicks
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function() {
                fbq('trackCustom', 'ButtonClick', {
                    button_text: button.textContent.trim()
                });
            });
        });

        // Track scroll depth
        let scrollDepthTracked = new Set();
        window.addEventListener('scroll', function() {
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
            
            [25, 50, 75, 100].forEach(depth => {
                if (scrollPercent >= depth && !scrollDepthTracked.has(depth)) {
                    scrollDepthTracked.add(depth);
                    fbq('trackCustom', 'ScrollDepth', {
                        depth: depth + '%'
                    });
                }
            });
        });
    }

    // Initialize tracking immediately
    initializeTracking();
});
</script>
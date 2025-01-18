document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscribeForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    // Strict email validation
    const validateEmail = (email) => {
        const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
        if (!validEmailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email ending with .com';
            emailInput.classList.add('error');
            return false;
        }
        return true;
    };

    // Custom form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Create the final form data
            const formData = new FormData(form);
            
            // Only if validation passes, submit to Formspree
            fetch("https://formspree.io/f/mdkkpkpz", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    emailError.textContent = 'Thanks for subscribing!';
                    emailError.style.color = 'green';
                    form.reset();
                }
            })
            .catch(() => {
                emailError.textContent = 'Submission failed. Please try again.';
                emailError.style.color = 'red';
            });
        }
        return false;
    });

    // Real-time validation
    emailInput.addEventListener('input', function() {
        validateEmail(this.value.trim());
    });
});
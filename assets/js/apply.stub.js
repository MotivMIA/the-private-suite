document.getElementById("email-signup-form").addEventListener("submit", e => {
  e.preventDefault();
  requireConsent(() => {
    window.location.href = "/dashboard";
  });
});

document.querySelectorAll("[data-provider]").forEach(btn => {
  btn.addEventListener("click", () => {
    requireConsent(() => {
      window.location.href = "/dashboard";
    });
  });
});

/* ██████████████████████████████████████████████████
   APPLY FORM STUB
   Handles Apply Form behavior
   ██████████████████████████████████████████████████ */

document.addEventListener('content:hydrated', () => {
  const applyFormSection = document.querySelector('.section-apply');
  if (!applyFormSection) {
    console.warn('Apply form section not found.');
    return;
  }

  console.log('Apply form initialized.');

  const form = applyFormSection.querySelector('form');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');
  const submitButton = form.querySelector('button[type="submit"]');
  const backButton = form.querySelector('.btn-back');

  // Ensure password field is hidden initially
  if (passwordInput) passwordInput.hidden = true;

  // Handle primary submit button
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form submitted with:', {
      email: emailInput.value,
      password: passwordInput.value,
    });
  });

  // Handle progressive email-to-password flow
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!emailInput.value) {
      alert('Please enter your email.');
      return;
    }
    passwordInput.hidden = false;
    passwordInput.focus();
  });

  // Handle back button (if applicable)
  if (backButton) {
    backButton.addEventListener('click', (e) => {
      e.preventDefault();
      form.reset();
      passwordInput.hidden = true;
      console.log('Form reset and back to initial state.');
    });
  }
});

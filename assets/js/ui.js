// ██████████████████████████████████████████████████
// ui.js
// Stage 2 Apply-Form + Consent Modal
// Fully working version
// ██████████████████████████████████████████████████

import { startAuth } from './auth/index.js';
import { requireConsent } from './auth/consent.js';

document.addEventListener('DOMContentLoaded', () => {
  const applyForm = document.querySelector('.section-apply');
  if (!applyForm) return;

  // Panels and form
  const methodPanel = applyForm.querySelector('.auth-methods');
  const emailPanel = applyForm.querySelector('.email-auth');
  const emailForm = applyForm.querySelector('#email-auth-form');
  if (!methodPanel || !emailPanel || !emailForm) return;

  // Inputs and buttons
  const emailInput = emailForm.querySelector('input[type="email"]');
  const passwordInput = emailForm.querySelector('input[type="password"]');
  const signupBtn = emailForm.querySelector('.btn-signup');
  const backBtn = emailForm.querySelector('.btn-back');

  // Initial state
  emailPanel.hidden = true;
  passwordInput.hidden = true;

  // ─────────────────────────────
  // Auth method buttons (OAuth + Email)
  // ─────────────────────────────
  methodPanel.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-provider], [data-auth]');
    if (!btn) return;

    // Email button
    if (btn.dataset.auth === 'email') {
      methodPanel.hidden = true;
      emailPanel.hidden = false;
      emailInput.focus();
      return;
    }

    // OAuth buttons
    if (btn.dataset.provider) {
      const consentGiven = await requireConsent();
      if (consentGiven) {
        startAuth(btn.dataset.provider);
      } else {
        alert('You must accept the consent to proceed.');
      }
    }
  });

  // ─────────────────────────────
  // Show password after email entered
  // ─────────────────────────────
  signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!emailInput.value) {
      alert('Please enter your email.');
      emailInput.focus();
      return;
    }
    passwordInput.hidden = false;
    passwordInput.focus();
  });

  // ─────────────────────────────
  // Back button resets flow
  // ─────────────────────────────
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    emailForm.reset();
    passwordInput.hidden = true;
    emailPanel.hidden = true;
    methodPanel.hidden = false;
  });

  // ─────────────────────────────
  // Submit form with consent
  // ─────────────────────────────
  emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!emailInput.value || !passwordInput.value) {
      alert('Please fill out both fields.');
      return;
    }

    const consentGiven = await requireConsent();
    if (!consentGiven) {
      alert('You must accept the consent to proceed.');
      return;
    }

    console.log('Email signup submitted:', {
      email: emailInput.value,
      password: passwordInput.value,
    });

    startAuth('email');
  });
});


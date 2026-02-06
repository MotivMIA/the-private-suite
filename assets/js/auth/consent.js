// ██████████████████████████████████████████████████
// auth/consent.js
// Handles legal consent modal and sessionStorage flag
// ██████████████████████████████████████████████████

export function grantConsent() {
  sessionStorage.setItem('consentGiven', 'true');
}

export function revokeConsent() {
  sessionStorage.removeItem('consentGiven');
}

export function hasConsent() {
  return sessionStorage.getItem('consentGiven') === 'true';
}

export async function requireConsent() {
  // Check if consent has already been given in this session
  if (sessionStorage.getItem('consentGiven') === 'true') {
    return true;
  }

  // Show the consent modal
  const modal = document.querySelector('.consent-modal');
  if (!modal) {
    console.error('Consent modal not found.');
    return false;
  }

  modal.hidden = false;

  return new Promise((resolve) => {
    const acceptBtn = modal.querySelector('.btn-accept');
    const rejectBtn = modal.querySelector('.btn-reject');

    const cleanup = () => {
      modal.hidden = true;
      acceptBtn.removeEventListener('click', onAccept);
      rejectBtn.removeEventListener('click', onReject);
    };

    const onAccept = () => {
      sessionStorage.setItem('consentGiven', 'true');
      cleanup();
      resolve(true);
    };

    const onReject = () => {
      cleanup();
      resolve(false);
    };

    acceptBtn.addEventListener('click', onAccept);
    rejectBtn.addEventListener('click', onReject);
  });
}
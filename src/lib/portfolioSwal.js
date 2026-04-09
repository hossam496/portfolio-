import Swal from 'sweetalert2';

function palette() {
  const dark = document.documentElement.classList.contains('dark');
  return {
    background: dark ? '#0a0a0b' : '#ffffff',
    color: dark ? '#fafafa' : '#18181b',
    confirmButtonColor: dark ? '#60a5fa' : '#2563eb',
  };
}

/** Portfolio contact form only — matches site theme */
export function contactSuccess(userMessage) {
  return Swal.fire({
    icon: 'success',
    iconColor: '#22c55e',
    title: 'Message sent successfully 🚀',
    text:
      userMessage ||
      'Thanks for reaching out — I will get back to you soon.',
    confirmButtonText: 'Done',
    customClass: {
      popup: 'pf-swal-popup',
      confirmButton: 'pf-swal-confirm',
      title: 'pf-swal-title',
      htmlContainer: 'pf-swal-text',
    },
    buttonsStyling: false,
    ...palette(),
  });
}

export function contactError(message) {
  const p = palette();
  return Swal.fire({
    ...p,
    icon: 'error',
    iconColor: '#ef4444',
    title: 'Something went wrong ❌',
    text: message || 'Please try again in a moment.',
    confirmButtonText: 'OK',
    confirmButtonColor: '#dc2626',
    customClass: {
      popup: 'pf-swal-popup',
      confirmButton: 'pf-swal-confirm',
      title: 'pf-swal-title',
      htmlContainer: 'pf-swal-text',
    },
    buttonsStyling: false,
  });
}

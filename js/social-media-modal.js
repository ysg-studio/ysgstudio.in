(() => {
  const modal = document.querySelector('#social-media-modal');
  if (!modal) return;

  const panel = modal.querySelector('.studio-modal__panel');
  const closeControls = modal.querySelectorAll('[data-modal-close]');
  const inquiryLink = modal.querySelector('.studio-modal__cta');
  const hasSeenModal = 'ysg-social-media-modal-seen';
  let opener = null;

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    window.setTimeout(() => { modal.hidden = true; }, 220);
    if (opener) opener.focus();
  };

  const openModal = () => {
    if (sessionStorage.getItem(hasSeenModal)) return;
    opener = document.activeElement;
    modal.hidden = false;
    window.requestAnimationFrame(() => {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      modal.querySelector('.studio-modal__close').focus();
    });
    sessionStorage.setItem(hasSeenModal, 'true');
  };

  window.setTimeout(openModal, 3000);

  closeControls.forEach((control) => control.addEventListener('click', closeModal));
  inquiryLink.addEventListener('click', closeModal);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  panel.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [...panel.querySelectorAll('button, a[href]')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();

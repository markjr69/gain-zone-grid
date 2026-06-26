// GymTitan static site JS
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Mark active link
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // Duplicate marquee content for seamless scroll
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML = track.innerHTML + track.innerHTML;
  });

  // Forms -> mailto
  document.querySelectorAll('form[data-mailto]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const to = form.dataset.mailto;
      const subject = encodeURIComponent(form.dataset.subject || 'GymTitan Inquiry');
      const fd = new FormData(form);
      let body = '';
      fd.forEach((v, k) => { body += `${k}: ${v}\n\n`; });
      window.location.href = `mailto:${to}?subject=${subject}&body=${encodeURIComponent(body)}`;
    });
  });
});

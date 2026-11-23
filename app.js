// scroll reveal + count-up. Content stays visible if JS fails (class added only here).
(() => {
  const els = document.querySelectorAll('.rv');
  const counters = document.querySelectorAll('[data-count]');
  const run = el => {
    const end = +el.dataset.count, dec = (el.dataset.count.split('.')[1] || '').length;
    const t0 = performance.now(), dur = 1200;
    const step = t => {
      const p = Math.min(1, (t - t0) / dur), v = end * (1 - Math.pow(1 - p, 3));
      el.textContent = v.toLocaleString('ko-KR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion:reduce)').matches) {
    els.forEach(e => e.classList.add('in')); return;
  }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-count]').forEach(run);
    if (e.target.dataset.count) run(e.target);
    io.unobserve(e.target);
  }), { threshold: .15 });
  els.forEach(e => io.observe(e));
  counters.forEach(c => { if (!c.closest('.rv')) io.observe(c); });
})();

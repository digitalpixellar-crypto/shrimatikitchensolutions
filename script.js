
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if(menuBtn && navLinks){
  menuBtn.addEventListener('click',()=>navLinks.classList.toggle('show'));
}
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click',()=>btn.parentElement.classList.toggle('open'));
});
document.querySelectorAll('[data-wa]').forEach(el=>{
  el.addEventListener('click',(e)=>{
    e.preventDefault();
    const size = document.querySelector('[name="size"]')?.value || '';
    const qty = document.querySelector('[name="quantity"]')?.value || '1';
    const msg = `Hi Shrimati Kitchen Solutions,%0A%0AI'm interested in your Premium Wooden Roti Press.${size ? `%0ASize: ${size}`:''}%0AQuantity: ${qty}%0APlease share the current product details, size availability and delivery information.`;
    window.open(`https://wa.me/919742470099?text=${msg}`,'_blank');
  });
});
const orderForm = document.querySelector('#quick-order');
if(orderForm){
  orderForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    alert('Design prototype: form submission will be connected to Supabase after approval.');
  });
}

// Subtle scroll-reveal animations
const revealTargets = document.querySelectorAll(
  '.section-head,.product-card,.feature-card,.food-card,.step,.offer,.review-card,.order-card,.faq-item,.page-hero .container'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

const stickyNav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (!stickyNav) return;
  stickyNav.classList.toggle('scrolled', window.scrollY > 12);
});

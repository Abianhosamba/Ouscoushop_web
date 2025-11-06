// main.js - global popup, filters, scroll animations
document.addEventListener('DOMContentLoaded', () => {
    /* ========== GLOBAL IMAGE POPUP ========== */
    const popup = document.createElement('div');
    popup.className = 'image-popup';
    popup.innerHTML = '<img alt="Agrandissement" />';
    document.body.appendChild(popup);
    const popupImg = popup.querySelector('img');
  
    popup.addEventListener('click', () => {
      popup.style.display = 'none';
      popupImg.src = '';
      popupImg.alt = '';
    });
  
    // Attach to every clickable image
    document.querySelectorAll('.clickable-img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        popupImg.src = img.dataset.large || img.src;
        popupImg.alt = img.alt || '';
        popup.style.display = 'flex';
      });
    });
  
    /* ========== CATALOGUE FILTERS (if present) ========== */
    const catalogSearch = document.querySelector('#catalogSearch');
    const catalogSelect = document.querySelector('#catalogCategory');
    const productsGrid = document.querySelector('.grid.products');
  
    function filterCatalogue(){
      if(!productsGrid) return;
      const q = catalogSearch ? catalogSearch.value.trim().toLowerCase() : '';
      const cat = catalogSelect ? catalogSelect.value : 'all';
      const cards = productsGrid.querySelectorAll('.product-card');
      cards.forEach(card => {
        const title = (card.querySelector('h3,h2')?.textContent || '').toLowerCase();
        const category = (card.dataset.category || 'all').toLowerCase();
        const matchSearch = !q || title.includes(q);
        const matchCat = (cat === 'all') || (category === cat);
        card.style.display = (matchSearch && matchCat) ? '' : 'none';
      });
    }
    if(catalogSearch) catalogSearch.addEventListener('input', filterCatalogue);
    if(catalogSelect) catalogSelect.addEventListener('change', filterCatalogue);
  
    /* ========== SCROLL ANIMATIONS ========== */
    const observers = document.querySelectorAll('.fade-up');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    observers.forEach(el => io.observe(el));
  });
  
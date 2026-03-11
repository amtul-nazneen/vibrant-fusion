// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});

// Desktop Order Online
const orderButton = document.getElementById('orderButton');
const orderMenu = document.getElementById('orderMenu');

// Mobile Order Online
const orderButtonMobile = document.querySelector('.order-btn-mobile');
const orderMenuMobile = document.getElementById('orderMenuMobile');

// Toggle desktop dropdown
orderButton.addEventListener('click', (e) => {
  e.stopPropagation();
  orderMenu.style.display = orderMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Toggle mobile dropdown
orderButtonMobile.addEventListener('click', (e) => {
  e.stopPropagation();
  orderMenuMobile.style.display = orderMenuMobile.style.display === 'flex' ? 'none' : 'flex';
});

// Close menus if clicking outside
window.addEventListener('click', (e) => {
  // Desktop dropdown
  if (!orderButton.contains(e.target) && !orderMenu.contains(e.target)) {
    orderMenu.style.display = 'none';
  }

  // Mobile dropdown
  if (!orderButtonMobile.contains(e.target) && !orderMenuMobile.contains(e.target)) {
    orderMenuMobile.style.display = 'none';
  }

  // Mobile menu overlay
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('show');
  }
});

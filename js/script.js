// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});

const orderBtn = document.getElementById("orderButton");
const orderMenu = document.getElementById("orderMenu");
orderButton.addEventListener('click', () => {
  orderMenu.style.display = orderMenu.style.display === 'flex' ? 'none' : 'flex';
});

// const floatingBtn = document.getElementById("floatingBtn");
// const floatingMenu = document.getElementById("floatingMenu");
//
// floatingBtn.addEventListener("click", () => {
//   floatingMenu.style.display =
//     floatingMenu.style.display === "block" ? "none" : "block";
// });
//
// window.onclick = function(e){
//
//   if(!e.target.matches('.order-btn')){
//     orderMenu.style.display = "none";
//   }
//
//   if(!e.target.matches('.floating-btn')){
//     floatingMenu.style.display = "none";
//   }
//
// }

// Close dropdown if clicked outside
// Close both menus if click happens outside
window.addEventListener('click', (e) => {
  // Close order menu if click is outside
  if (!orderButton.contains(e.target) && !orderMenu.contains(e.target)) {
    orderMenu.style.display = 'none';
  }

  // Close mobile menu if click is outside
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('show');
  }
});

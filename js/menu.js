// ===== GLOBAL VARIABLES =====
 let menuData = null;
// const navbar = document.getElementById('navbar');
// const categoryBar = document.getElementById('categoryBar');
// const navbarHeight = navbar ? navbar.offsetHeight : 0;
//
// // Apply CSS variable for sticky positioning
// categoryBar.style.setProperty('--navbar-height', navbarHeight + 'px');
window.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar'); // <-- your header
  const categoryBar = document.getElementById('categoryBar');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  // Set CSS variable for sticky top
  categoryBar.style.setProperty('--navbar-height', navbarHeight + 'px');
});

// Optional: recalc on window resize if navbar height can change
window.addEventListener('resize', () => {
  const navbar = document.querySelector('.navbar');
  const categoryBar = document.getElementById('categoryBar');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  categoryBar.style.setProperty('--navbar-height', navbarHeight + 'px');
});
// ===== FETCH MENU DATA =====
fetch("../data/menu.json")//important
  .then(response => response.json())
  .then(data => {
    menuData = data;
    renderMenu(data);
    setupCategoryHighlight();
  });

// ===== ACTIVE CATEGORY HIGHLIGHT ON SCROLL =====
// function setupCategoryHighlight() {
//   const categoryLinks = document.querySelectorAll('.category-bar a');
//
//   window.addEventListener('scroll', () => {
//     const scrollPos = window.scrollY + navbarHeight + categoryBar.offsetHeight + 5;
//
//     menuData.menu.forEach(category => {
//       const sectionId = category.category.replace(/\s+/g, '-').toLowerCase();
//       const section = document.getElementById(sectionId);
//       const link = document.querySelector(`.category-bar a[href="#${sectionId}"]`);
//
//       if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
//         categoryLinks.forEach(l => l.classList.remove('active'));
//         link.classList.add('active');
//       }
//     });
//   });
// }
function setupCategoryHighlight() {

  window.addEventListener('scroll', () => {

    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    const categoryBar = document.getElementById('categoryBar');
    const categoryBarHeight = categoryBar ? categoryBar.offsetHeight : 0;

    const scrollPos = window.scrollY + navbarHeight + categoryBarHeight + 20;

    menuData.menu.forEach(category => {

      const sectionId = category.category.replace(/\s+/g, '-').toLowerCase();
      const section = document.getElementById(sectionId);
      const link = document.querySelector(`.category-bar a[href="#${sectionId}"]`);

      if (!section || !link) return;

      if (
        section.offsetTop <= scrollPos &&
        (section.offsetTop + section.offsetHeight) > scrollPos
      ) {

        document.querySelectorAll('.category-bar a')
          .forEach(l => l.classList.remove('active'));

        link.classList.add('active');

// Auto-scroll category bar so active pill is visible
const categoryBar = document.getElementById('categoryBar');

const linkLeft = link.offsetLeft;
const linkWidth = link.offsetWidth;
const barWidth = categoryBar.offsetWidth;

const scrollPosition = linkLeft - (barWidth / 2) + (linkWidth / 2);

categoryBar.scrollTo({
  left: scrollPosition,
  behavior: 'smooth'
});

      }

    });

  });

}


// ===== RENDER MENU =====
function renderMenu(data) {
  const menuContainer = document.getElementById("menuContainer");
  const categoryBarHeight = categoryBar.offsetHeight;

  data.menu.forEach(category => {
    const categoryId = category.category.replace(/\s+/g, '-').toLowerCase();

    // ---- CATEGORY NAV ----
    const nav = document.createElement("a");
    nav.href = "#" + categoryId;
    nav.innerHTML = `${category.icon} ${category.category}`;
    categoryBar.appendChild(nav);

    // ---- CATEGORY SECTION ----
    const section = document.createElement("div");
    section.id = categoryId;
    section.classList.add("category-section");

    section.innerHTML = `
      <h2 class="category-title">${category.icon} ${category.category}</h2>
      <div class="menu-grid"></div>
    `;

    menuContainer.appendChild(section);
    const grid = section.querySelector(".menu-grid");

    // ---- SORT ITEMS BY POPULARITY ----
    const items = category.items.sort((a, b) => a.popularity - b.popularity);

    // ---- RENDER ITEMS ----
    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "menu-card";

      // ---- PRICE HTML ----
      let priceHTML = "";
      if (typeof item.price === "object") {
        const sizes = Object.keys(item.price);
        let selectedSize = sizes[0];

        const sizeButtons = sizes.map(size => `
          <button class="size-pill ${size === selectedSize ? 'selected' : ''}" data-size="${size}">
            ${size}
          </button>
        `).join('');

        const priceId = `price-${item.name.replace(/\s+/g, '-')}`;

        priceHTML = `
          <div class="size-prices-container">
            ${sizeButtons}
            <div class="price" id="${priceId}">$${item.price[selectedSize].toFixed(2)}</div>
          </div>
        `;
      } else {
        priceHTML = `<div class="price">$${item.price.toFixed(2)}</div>`;
      }

      // ---- POPULAR BADGE ----
      const popularBadge = item.popularity === 1 ? `<div class="popular-badge">🔥 Popular</div>` : "";

      // ---- CARD HTML ----
      card.innerHTML = `
        <div class="image-container" style="position: relative;">
          ${popularBadge}
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="card-content">
          <div class="item-title">${item.name}</div>
          <div class="description">${item.description}</div>
          ${priceHTML}
        </div>
      `;

      // ---- SIZE BUTTON EVENTS ----
      if (typeof item.price === "object") {
        const priceId = `price-${item.name.replace(/\s+/g, '-')}`;
        card.querySelectorAll('.size-pill').forEach(btn => {
          btn.addEventListener('click', () => {
            const size = btn.dataset.size;
            btn.parentElement.querySelectorAll('.size-pill').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            card.querySelector(`#${priceId}`).textContent = `$${item.price[size].toFixed(2)}`;
          });
        });
      }

      grid.appendChild(card);
    });

    // ---- SMOOTH SCROLL ON CATEGORY CLICK ----
    // ---- SMOOTH SCROLL ON CATEGORY CLICK ----
    // nav.addEventListener('click', e => {
    //   e.preventDefault();
    //
    //   const target = document.querySelector(nav.getAttribute('href'));
    //
    //   // Recalculate heights at click time
    //   const navbar = document.querySelector('.navbar');
    //   const navbarHeight = navbar ? navbar.offsetHeight : 0;
    //
    //   const categoryBar = document.getElementById('categoryBar');
    //   const categoryBarHeight = categoryBar ? categoryBar.offsetHeight : 0;
    //
    //   const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - categoryBarHeight;
    //
    //   window.scrollTo({ top, behavior: 'smooth' });
    // });

    nav.addEventListener('click', e => {
  e.preventDefault();

  // remove active from all pills
  document.querySelectorAll('.category-bar a').forEach(link => {
    link.classList.remove('active');
  });

  // activate clicked pill
  nav.classList.add('active');

  const target = document.querySelector(nav.getAttribute('href'));

  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  const categoryBar = document.getElementById('categoryBar');
  const categoryBarHeight = categoryBar ? categoryBar.offsetHeight : 0;

  const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - categoryBarHeight;

  window.scrollTo({
    top,
    behavior: 'smooth'
  });
});
  });
}

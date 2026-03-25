// ===== GLOBAL VARIABLES =====
 let menuData = null;

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

    //const categoryId = category.category.replace(/\s+/g, '-').toLowerCase();
    const categoryId = category.category
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')   // replace EVERYTHING non-alphanumeric
  .replace(/(^-|-$)/g, '');      // remove leading/trailing dashes
const showImage = category.showImage !== false;//catImg
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
      <!-- Add this only if nutritionType is category -->
  ${category.nutritionType === 'category' ? `<button class="view-nutrition-btn">
  <span class="icon">ⓘ</span>
  <span>Nutrition</span>
</button>` : ''}

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
      if (!showImage) {
        card.classList.add("no-image");
      }//cardImg
      // ---- PRICE HTML ----
      let priceHTML = "";

  // ✅ CASE 1: price is a NUMBER
  if (typeof item.price === "number") {
    priceHTML = `
      <div class="price">
        $${item.price.toFixed(2)}
      </div>
    `;
  }

  // ✅ CASE 2 & 3: price is OBJECT
  else if (typeof item.price === "object") {
    const sizes = Object.keys(item.price);
    const priceId = `price-${item.name.replace(/\s+/g, '-')}`;

    // ✅ ONLY ONE SIZE → no pills
    if (sizes.length === 1) {
      const size = sizes[0];
      priceHTML = `
        <div class="price single-size">
          ${size} • $${item.price[size].toFixed(2)}
        </div>
      `;
    }

    // ✅ MULTIPLE SIZES → pills
    else {
      let selectedSize = sizes[0];

      const sizeButtons = sizes.map(size => `
        <button class="size-pill ${size === selectedSize ? 'selected' : ''}" data-size="${size}">
          ${size}
        </button>
      `).join('');

      priceHTML = `
        <div class="size-prices-container">
          ${sizeButtons}
          <div class="price" id="${priceId}">
            $${item.price[selectedSize].toFixed(2)}
          </div>
        </div>
      `;
    }
  }

      // ---- POPULAR BADGE ----
      const popularBadge = item.popularity === 1 ? `<div class="popular-badge">🔥 Popular</div>` : "";

      // ---- CARD HTML ----
      /*card.innerHTML = `
        <div class="image-container" style="position: relative;">
          ${popularBadge}
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="card-content">
          <div class="item-title">${item.name}</div>
          <div class="description">${item.description}</div>
          ${priceHTML}
        </div>
      `;*/

      /*let imageHTML = "";

// ✅ Only render image if category allows AND image exists
if (showImage && item.image) {
  imageHTML = `
    <div class="image-container" style="position: relative;">
      ${popularBadge}
      <img src="${item.image}" alt="${item.name}" loading="lazy">
    </div>
  `;
}*/
/*let imageHTML = "";

if (showImage) {
  imageHTML = `
    <div class="image-container" style="position: relative;">
      ${popularBadge}
      ${
        item.image
          ? `<img src="${item.image}" alt="${item.name}" loading="lazy">`
          : `<div class="image-placeholder">${category.icon}</div>`
      }
    </div>
  `;
}*/
let imageHTML = "";

if (showImage) {
  imageHTML = `
    <div class="image-container">
      ${popularBadge}
      ${item.image
        ? `<img src="${item.image}" alt="${item.name}" loading="lazy">`
        : `<div class="image-placeholder">${category.icon}</div>`
      }
    </div>
  `;
}

// ✅ If images are OFF, still show popular badge inside content
let titleHTML = `
  <div class="item-title">
    ${item.name}
    ${!showImage && item.popularity === 1 ? `<span class="popular">🔥 Popular</span>` : ""}
  </div>
`;

card.innerHTML = `
  ${imageHTML}
  <div class="card-content">
    ${titleHTML}
    <div class="description">${item.description}</div>
    ${priceHTML}
  </div>
`;//cardImg
if (category.nutritionType === 'item' && item.nutrition) {
  const nutBtn = document.createElement('button');
  nutBtn.className = 'view-nutrition-btn-item';
//  nutBtn.textContent = 'View Nutrition ⓘ';
nutBtn.innerHTML = `
  <span class="icon">ⓘ</span>
  <span>Nutrition</span>
`;
  nutBtn.addEventListener('click', () => openNutritionModalItem(item));
  card.querySelector('.card-content').appendChild(nutBtn);
}

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

  document.querySelectorAll('.view-nutrition-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const section = btn.closest('.category-section');
      const categoryId = section.id;
      const categoryData = menuData.menu.find(c =>
        c.category.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') === categoryId
      );

      openNutritionModal(categoryData);
    });
  });

}

function openNutritionModal(category) {
  const modal = document.getElementById('nutrition-modal');
  const container = modal.querySelector('.nutrition-variants');
  container.innerHTML = '';
  const title = document.createElement('div');
  title.className = 'nutrition-title';
  title.textContent = category.category;

  container.appendChild(title);
  // 🔹 Create variant buttons container
  const btnContainer = document.createElement('div');

  // 🔹 Create ONE nutrition display area
  const infoDiv = document.createElement('div');
  infoDiv.className = 'nutrition-info';

  if (category.variants) {
    category.variants.forEach((v, idx) => {
      const btn = document.createElement('button');
      btn.textContent = v.label;

      if (idx === 0) btn.classList.add('selected');

      btn.addEventListener('click', () => {
        // remove selected from all
        btnContainer.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // ✅ update nutrition display
        infoDiv.innerHTML = `
          <span class="nutrition-chip">🔥 ${v.nutrition.calories} kcal</span>
          <span class="nutrition-chip">🍞 ${v.nutrition.carbs}g carbs</span>
          <span class="nutrition-chip">💪 ${v.nutrition.protein}g protein</span>
        `;
      });

      btnContainer.appendChild(btn);
    });

    // ✅ Set default (first variant)
    const first = category.variants[0];
    infoDiv.innerHTML = `
      <span class="nutrition-chip">🔥 ${first.nutrition.calories} kcal</span>
      <span class="nutrition-chip">🍞 ${first.nutrition.carbs}g carbs</span>
      <span class="nutrition-chip">💪 ${first.nutrition.protein}g protein</span>
    `;

    container.appendChild(btnContainer);
    container.appendChild(infoDiv);
  }else if (category.nutrition) {
  const infoDiv = document.createElement('div');
  infoDiv.className = 'nutrition-info';

  infoDiv.innerHTML = `
    <span class="nutrition-chip">🔥 ${category.nutrition.calories} kcal</span>
    <span class="nutrition-chip">🍞 ${category.nutrition.carbs}g carbs</span>
    <span class="nutrition-chip">💪 ${category.nutrition.protein}g protein</span>
  `;

  container.appendChild(infoDiv);
}

  // 🔹 Show modal
  modal.classList.remove('hidden');

  modal.querySelector('.close-modal').onclick = () => {
    modal.classList.add('hidden');
  };
}
function openNutritionModalItemOld(item) {
  const modal = document.getElementById('nutrition-modal');
  const container = modal.querySelector('.nutrition-variants');
  container.innerHTML = '';

  const infoDiv = document.createElement('div');
  infoDiv.className = 'nutrition-info';
  infoDiv.textContent = `🔥 ${item.nutrition.calories} kcal • 🍞 ${item.nutrition.carbs}g carbs • 💪 ${item.nutrition.protein}g protein`;
  container.appendChild(infoDiv);

  modal.classList.remove('hidden');

  modal.querySelector('.close-modal').onclick = () => modal.classList.add('hidden');
}


function openNutritionModalItem(item) {
  const modal = document.getElementById('nutrition-modal');
  const container = modal.querySelector('.nutrition-variants');
  container.innerHTML = '';

  // 🔹 Title (BIG UX improvement)
  const title = document.createElement('div');
  title.className = 'nutrition-title';
  title.textContent = item.name;

  // 🔹 Nutrition chips
  const infoDiv = document.createElement('div');
  infoDiv.className = 'nutrition-info';

  infoDiv.innerHTML = `
    <span class="nutrition-chip">🔥 ${item.nutrition.calories} kcal</span>
    <span class="nutrition-chip">🍞 ${item.nutrition.carbs}g carbs</span>
    <span class="nutrition-chip">💪 ${item.nutrition.protein}g protein</span>
  `;

  container.appendChild(title);
  container.appendChild(infoDiv);

  modal.classList.remove('hidden');

  modal.querySelector('.close-modal').onclick = () => {
    modal.classList.add('hidden');
  };
}

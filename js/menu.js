let menuData = null;
fetch("../data/menu.json")
.then(response => response.json())
.then(data => {
  menuData = data;          // store globally
      renderMenu(data);          // render all categories and items
      setupCategoryHighlight();

});

function setupCategoryHighlight() {
  const categoryLinks = document.querySelectorAll('.category-bar a');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + document.getElementById('categoryBar').offsetHeight + 10;
    menuData.menu.forEach(category => {
      const sectionId = category.category.replace(/\s+/g,'-').toLowerCase();
      const section = document.getElementById(sectionId);
      const link = document.querySelector(`.category-bar a[href="#${sectionId}"]`);
      if(section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos){
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}

function renderMenu(data){

const categoryBar = document.getElementById("categoryBar")
const menuContainer = document.getElementById("menuContainer")

data.menu.forEach(category => {

const categoryId = category.category.replace(/\s+/g,"-").toLowerCase()

/* CATEGORY NAV */

const nav = document.createElement("a")
nav.href = "#" + categoryId
nav.innerHTML = `${category.icon} ${category.category}`
categoryBar.appendChild(nav)

/* CATEGORY SECTION */

const section = document.createElement("div")
section.id = categoryId
section.classList.add("category-section")
section.innerHTML = `
<h2 class="category-title">${category.icon} ${category.category}</h2>
<div class="menu-grid"></div>
`

menuContainer.appendChild(section)

const grid = section.querySelector(".menu-grid")

/* SORT BY POPULARITY */

const items = category.items.sort((a,b)=>a.popularity-b.popularity)

/* RENDER ITEMS */

items.forEach(item=>{

const card = document.createElement("div")
card.className = "menu-card"

let priceHTML = ""

if(typeof item.price === "object"){
  const sizes = Object.keys(item.price) // ["20oz","32oz"]
  let selectedSize = sizes[0] // default 20oz

  const sizeButtons = sizes.map(size => `
    <button class="size-pill ${size === selectedSize ? 'selected' : ''}" data-size="${size}">
      ${size}
    </button>
  `).join('')

  const priceId = `price-${item.name.replace(/\s+/g,'-')}`

  priceHTML = `
    <div class="size-prices-container">
      ${sizeButtons}
      <div class="price" id="${priceId}">$${item.price[selectedSize].toFixed(2)}</div>
    </div>
  `
} else {
  priceHTML = `<div class="price">$${item.price.toFixed(2)}</div>`
}

const popularIcon = item.popularity === 1 ? `<span class="popular">🔥 Popular</span>` : ""

// card.innerHTML = `
//
// <div class="item-title">
// ${item.name} ${popularIcon}
// </div>
//
// <div class="description">
// ${item.description}
// </div>
//
// ${priceHTML}
//
// `

// card.innerHTML = `
// <div class="image-container">
//   <img src="${item.image}" alt="${item.name}" loading="lazy">
// </div>
//
// <div class="card-content">
//   <div class="item-title">
//     ${item.name} ${popularIcon}
//   </div>
//
//   <div class="description">
//     ${item.description}
//   </div>
//
//   ${priceHTML}
// </div>
// `

const popularBadge = item.popularity === 1 ? `<div class="popular-badge">🔥 Popular</div>` : "";

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
`

if(typeof item.price === "object"){
  const priceId = `price-${item.name.replace(/\s+/g,'-')}`
  card.querySelectorAll('.size-pill').forEach(btn => {
    btn.addEventListener('click', e => {
      const size = btn.dataset.size
      // remove selected class from siblings
      btn.parentElement.querySelectorAll('.size-pill').forEach(b=>b.classList.remove('selected'))
      btn.classList.add('selected')
      // update price
      card.querySelector(`#${priceId}`).textContent = `$${item.price[size].toFixed(2)}`
    })
  })
}
grid.appendChild(card)

})

});


const categoryBarHeight = document.getElementById('categoryBar').offsetHeight;

document.querySelectorAll('.category-bar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    const top = target.getBoundingClientRect().top + window.scrollY - categoryBarHeight;
    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
  });
});

}

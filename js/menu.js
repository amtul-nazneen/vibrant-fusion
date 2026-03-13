fetch("../data/menu.json")
.then(response => response.json())
.then(data => renderMenu(data))

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

priceHTML = `
<div class="size-prices">
20oz - $${item.price["20oz"].toFixed(2)} |
32oz - $${item.price["32oz"].toFixed(2)}
</div>
`

}else{

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

card.innerHTML = `
<div class="image-container">
  <img src="${item.image}" alt="${item.name}" loading="lazy">
</div>

<div class="card-content">
  <div class="item-title">
    ${item.name} ${popularIcon}
  </div>

  <div class="description">
    ${item.description}
  </div>

  ${priceHTML}
</div>
`

grid.appendChild(card)

})

});


document.querySelectorAll('.category-bar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    const offset = 100; // nav height
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth'
    });
  });
});

}

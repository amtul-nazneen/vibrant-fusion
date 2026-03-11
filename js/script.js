const orderBtn = document.getElementById("orderButton");
const orderMenu = document.getElementById("orderMenu");

orderBtn.addEventListener("click", () => {
  orderMenu.style.display =
    orderMenu.style.display === "block" ? "none" : "block";
});

const floatingBtn = document.getElementById("floatingBtn");
const floatingMenu = document.getElementById("floatingMenu");

floatingBtn.addEventListener("click", () => {
  floatingMenu.style.display =
    floatingMenu.style.display === "block" ? "none" : "block";
});

window.onclick = function(e){

  if(!e.target.matches('.order-btn')){
    orderMenu.style.display = "none";
  }

  if(!e.target.matches('.floating-btn')){
    floatingMenu.style.display = "none";
  }

}

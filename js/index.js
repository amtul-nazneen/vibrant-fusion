
let featuredIndex = 0;

const featuredTrack = document.getElementById("featuredTrack");
const featuredCards = featuredTrack.children;

function getVisibleCards() {
  if (window.innerWidth < 600) return 1;
  if (window.innerWidth < 900) return 2;
  return 3;
}

function updateFeaturedSlider() {
  const visibleCards = getVisibleCards();
  const maxIndex = featuredCards.length - visibleCards;

  if (featuredIndex < 0) featuredIndex = 0;
  if (featuredIndex > maxIndex) featuredIndex = maxIndex;

  const cardWidth = featuredCards[0].getBoundingClientRect().width;

  featuredTrack.style.transform = `translateX(-${featuredIndex * cardWidth}px)`;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  featuredIndex++;
  updateFeaturedSlider();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  featuredIndex--;
  updateFeaturedSlider();
});

window.addEventListener("resize", updateFeaturedSlider);


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.view-nutrition-btn-item').forEach(btn => {
    btn.addEventListener('click', () => {
        //console.log("CLICK WORKS");
      const calories = btn.dataset.calories;
      const carbs = btn.dataset.carbs;
      const protein = btn.dataset.protein;

      openStaticNutritionModal({
        name: btn.closest('.card').querySelector('h3').textContent,
        calories,
        carbs,
        protein
      });
    });
  });
});
// btn.addEventListener('click', () => {
//   console.log("CLICK WORKS");
// });


function openStaticNutritionModal(data) {
  const modal = document.getElementById('nutrition-modal');
  const container = modal.querySelector('.nutrition-variants');
  container.innerHTML = '';

  // Title
  const title = document.createElement('div');
  title.className = 'nutrition-title';
  title.textContent = data.name;

  // Nutrition
  const info = document.createElement('div');
  info.className = 'nutrition-info';
  info.innerHTML = `
    <span class="nutrition-chip">🔥 ${data.calories} kcal</span>
    <span class="nutrition-chip">🍞 ${data.carbs}g carbs</span>
    <span class="nutrition-chip">💪 ${data.protein}g protein</span>
  `;

  container.appendChild(title);
  container.appendChild(info);

  modal.classList.remove('hidden');

  modal.querySelector('.close-modal').onclick = () => {
    modal.classList.add('hidden');
  };
}

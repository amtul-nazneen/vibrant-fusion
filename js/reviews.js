const track = document.getElementById("reviews-track");

let currentIndex = 0;

fetch("./data/reviews.json")
.then(res => res.json())
.then(data => {

  const reviews = data.reviews
    .filter(r => r.rating === 5)
    .slice(0,6);

  reviews.forEach(r => {

    const card = document.createElement("div");

    card.className = "review-card";

    card.innerHTML = `
      <div class="review-stars">★★★★★</div>
      <div class="review-text">${r.review}</div>
      <div class="review-name">— ${r.name}</div>
    `;

    track.appendChild(card);

  });

  /* Final Slide with Buttons */

  const buttonsCard = document.createElement("div");

  buttonsCard.className = "review-card review-buttons";

  buttonsCard.innerHTML = `
      <h3>Enjoyed your bowl?</h3>

      <a class="google-read"
      href="https://search.google.com/local/reviews?placeid=ChIJ-Q8ORmGpD4gRzUSldM9u1Vg"
      target="_blank">
      Read All Reviews
      </a>

      <a class="google-write"
      href="https://g.page/r/Cc1EpXTPbtVYEAE/review"
      target="_blank">
      Leave Us a Review
      </a>
  `;

  track.appendChild(buttonsCard);

});


/* Slider Logic */

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

function moveSlider(direction){

  const cards = document.querySelectorAll(".review-card");
  const cardWidth = cards[0].offsetWidth + 20;

  currentIndex += direction;

  if(currentIndex < 0) currentIndex = 0;
  if(currentIndex > cards.length - 1) currentIndex = cards.length - 1;

  track.style.transform =
  `translateX(-${currentIndex * cardWidth}px)`;

}

nextBtn.onclick = () => moveSlider(1);
prevBtn.onclick = () => moveSlider(-1);

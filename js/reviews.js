const track = document.getElementById("reviews-track");

let currentIndex = 0;

fetch("./data/reviews.json")
.then(res => res.json())
.then(data => {

  const reviews = data.reviews
    .filter(r => r.rating === 5)
    .slice(0,6);

  const GOOGLE_REVIEWS_URL = "https://search.google.com/local/reviews?placeid=ChIJ-Q8ORmGpD4gRzUSldM9u1Vg";

reviews.forEach(r => {

  const card = document.createElement("div");
  card.className = "review-card";

  const maxLength = 150;
  const fullText = r.review || "";

  let displayText = fullText;
  let readMoreHTML = "";

  if (fullText.length > maxLength) {
    displayText = fullText.slice(0, maxLength).trim() + "...";
    readMoreHTML = `<a href="${GOOGLE_REVIEWS_URL}" target="_blank" class="read-more"> Read more</a>`;
  }

  // Build safely instead of risking broken HTML
  const textDiv = document.createElement("div");
  textDiv.className = "review-text";
  textDiv.textContent = displayText;

  // Add Read More as real element (safer than innerHTML)
  if (readMoreHTML) {
    const readMore = document.createElement("a");
    readMore.href = GOOGLE_REVIEWS_URL;
    readMore.target = "_blank";
    readMore.className = "read-more";
    readMore.textContent = " Read more";

    textDiv.appendChild(readMore);
  }

  card.innerHTML = `
    <div class="review-stars">★★★★★</div>
    <div class="review-name">
    <img src = "images/google-icon.svg" class="google-icon-small" alt="Google">— ${r.name}</div>
  `;

  // Insert text between stars and name
  card.insertBefore(textDiv, card.querySelector(".review-name"));

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

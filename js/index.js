////////////// DOM ELEMENTS ///////////////////////
const headerEl = document.getElementById("header");
const heroHeaderEl = document.getElementById("hero-header");
const teamHeaderEl = document.getElementById("team-header");
const productsHeaderEl = document.getElementById("products-header");
const productTabEls = document.querySelectorAll(".tab");
const productsContainer = document.getElementById("products-container");
const slidesContainer = document.getElementById("slides-container");
const slideEls = document.querySelectorAll(".slide");
const slideLeftBtn = document.getElementById("slide-left-btn");
const slideRightBtn = document.getElementById("slide-right-btn");

/////////// EVENT LISTENER SHOWS HERO SECTION HEADERS ON INITIAL LOAD /////////////
window.addEventListener("load", () => {
  heroHeaderEl.classList.remove("hidden");
});

/////////// EVENT LISTENER CALLS ELEMENTS ANIMATEDLY WHEN IN VIEWPORT /////////////
window.addEventListener("scroll", () => {
  headerEl.classList.toggle("fixed", window.pageYOffset > 120);
  showHiddenElement(teamHeaderEl);
  showHiddenElement(productsHeaderEl);
});

//////////// FUNCTIONS DISPLAYS RELEVANT PRODUCTS ON THE BASIS OF TABS SELECTION ///////////////
productTabEls.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    productTabEls.forEach((tab) => {
      tab.classList.remove("tab-active");
    });
    tab.classList.add("tab-active");

    const cardTemplate = `
      <figure class="card-photo">
        <img src="/images/products-img.png" alt="Technology" loading="lazy" />
        <img src="/images/products-shadow.png" alt="Shadow" loading="lazy" class="shadow" />
      </figure>
      <p class="card-description">
        Lorem Ipsum is simply dummy text of the is simply dummy text of the text of the is simply
      </p>
    `;

    productsContainer.innerHTML = "";

    const count = index === 0 ? 8 : index;

    for (let i = 0; i <= count; i++) {
      const element = document.createElement("div");
      element.classList.add("card");
      element.innerHTML = cardTemplate;
      productsContainer.appendChild(element);
    }
  });
});

///////////////// SLIDERS FUNCTIONALITY ///////////////////////
let currentSlideIndex = 0;

slideLeftBtn.addEventListener("click", () => {
  slideLeft();
  updateSlideButtonStates();
});

slideRightBtn.addEventListener("click", () => {
  slideRight();
  updateSlideButtonStates();
});

function slideLeft() {
  currentSlideIndex = Math.max(currentSlideIndex - 1, 0);
  updateSlideTransform();
}

function slideRight() {
  currentSlideIndex = Math.min(currentSlideIndex + 1, slideEls.length - 1);
  updateSlideTransform();
}

function updateSlideTransform() {
  const currentSlideWidth = slideEls[currentSlideIndex].clientWidth;
  slidesContainer.style.transform = `translateX(-${
    currentSlideIndex * currentSlideWidth
  }px)`;

  slideLeftBtn.classList.toggle("active", currentSlideIndex > 0);
  slideRightBtn.classList.toggle(
    "active",
    currentSlideIndex < slideEls.length - 1
  );
}

function updateSlideButtonStates() {
  slideLeftBtn.classList.toggle("active", currentSlideIndex > 0);
  slideRightBtn.classList.toggle(
    "active",
    currentSlideIndex < slideEls.length - 1
  );
}

////////////////// FUNCTION CREATED TO USE REPITIVE LOGIC ///////////////////////
function showHiddenElement(element) {
  element.classList.toggle("hidden", !isInViewport(element));
}

///////////////// FUNCTION CHECKS IF THE ELEMENT IS IN VIEWPORT ////////////////
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}

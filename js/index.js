////////////// DOM ELEMENTS ///////////////////////
const headerEl = document.getElementById("header");
const heroHeaderEl = document.getElementById("hero-header");
const teamHeaderEl = document.getElementById("team-header");
const productsHeaderEl = document.getElementById("products-header");
const productTabEls = document.querySelectorAll(".tab");
const productsContainer = document.getElementById("products-container");
const productCards = productsContainer.querySelectorAll(".card");
const productsEls = document.querySelectorAll(".cards");
const slidesContainer = document.getElementById("slides-container");
const slideEls = document.querySelectorAll(".slide");
const slideLeftBtn = document.getElementById("slide-left-btn");
const slideRightBtn = document.getElementById("slide-right-btn");
const headerNavLinks = document.querySelectorAll("#header-nav a");
const sections = [
  "hero",
  "team",
  "products",
  "contact",
  "features",
  "footer",
].map((id) => document.querySelector(`#${id}`));

/////////// function displays side navbar on small screens /////////////
const hamburger = document.getElementById("hamburger");
const crossMark = document.getElementById("cross-mark");
const sidebar = document.getElementById("header-nav");

hamburger.addEventListener("click", () => {
  sidebar.style.transform = "translateX(0)";
  hamburger.style.display = "none";
  crossMark.style.display = "block";
});

crossMark.addEventListener("click", () => {
  sidebar.style.transform = "translateX(-100%)";
  hamburger.style.display = "block";
  crossMark.style.display = "none";
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    sidebar.style.display = "flex";
    sidebar.style.transform = "translateX(0)";
    hamburger.style.display = "none";
    crossMark.style.display = "none";
  } else {
    hamburger.style.display = "block";
    sidebar.style.transform = "translateX(-100%)";
    crossMark.style.display = "none";
  }
});

/////////// EVENT LISTENER SHOWS HERO SECTION HEADERS ON INITIAL LOAD /////////////
window.addEventListener("load", () => {
  heroHeaderEl.classList.remove("hidden");
});

/////////// FUNCTION TO HANDLE SCROLL ELEMENTS /////////////
window.addEventListener("scroll", () => {
  if (window.innerWidth > 770) {
    headerEl.classList.toggle("fixed", window.pageYOffset > 120);

    sections.forEach((section, index) => setActiveNavLink(section, index));
  }

  showHiddenElement(teamHeaderEl);
  showHiddenElement(productsHeaderEl);
});

// Function to set the "active" class on the appropriate headerNavLink
function setActiveNavLink(section, index) {
  if (isElementXPercentInViewport(section, 35)) {
    headerNavLinks.forEach((link) => link.classList.remove("active"));
    headerNavLinks[index].classList.add("active");
  }
}

//////////// FUNCTIONS DISPLAYS RELEVANT PRODUCTS ON THE BASIS OF TABS SELECTION ///////////////
productTabEls.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    productTabEls.forEach((tab) => tab.classList.remove("tab-active"));
    tab.classList.add("tab-active");

    productsContainer.innerHTML = "";
    const count = index === 0 ? 8 : index;

    for (let i = 0; i <= count; i++) {
      productsContainer.appendChild(productCards[i]);
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
}

function updateSlideButtonStates() {
  slideLeftBtn.classList.toggle("active", currentSlideIndex > 0);
  slideRightBtn.classList.toggle(
    "active",
    currentSlideIndex < slideEls.length - 1
  );
}

////////////////// FUNCTION CREATED TO TOGGLE ELEMENTS ANIMATEDLY WHEN IN VIEWPORT ///////////////////////
function showHiddenElement(element) {
  element.classList.toggle(
    "hidden",
    !isElementXPercentInViewport(element, 100)
  );
}

///////////////// FUNCTION CHECKS IF THE ELEMENT IS IN VIEWPORT ////////////////
const isElementXPercentInViewport = function (el, percentVisible) {
  let rect = el.getBoundingClientRect(),
    windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return !(
    Math.floor(100 - ((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100) <
      percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) <
      percentVisible
  );
};

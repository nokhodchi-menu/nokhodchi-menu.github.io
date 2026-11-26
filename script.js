
const categoryButtons = document.querySelectorAll(".category");
const sections = document.querySelectorAll(".menu-section");
const searchInput = document.getElementById("searchInput");
const languageBtn = document.getElementById("languageBtn");
const noResults = document.getElementById("noResults");

let currentLanguage = "fa";

/* SET ACTIVE CATEGORY */
function setActiveCategory(category) {
  categoryButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === category
    );
  });

  const activeButton = document.querySelector(
    `.category[data-category="${category}"]`
  );

  if (activeButton) {
    activeButton.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  }
}

/* CLICK CATEGORY: SCROLL TO SECTION */
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    if (category === "all") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      setActiveCategory("all");
      return;
    }

    const target = document.getElementById(category);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    setActiveCategory(category);
  });
});

/* SCROLL OBSERVER */
const observer = new IntersectionObserver(entries => {
  const visibleSections = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) =>
      b.intersectionRatio - a.intersectionRatio
    );

  if (visibleSections.length > 0) {
    setActiveCategory(
      visibleSections[0].target.dataset.section
    );
  }
}, {
  root: null,
  rootMargin: "-22% 0px -58% 0px",
  threshold: [0, 0.1, 0.25, 0.5]
});

sections.forEach(section => observer.observe(section));

/* SEARCH */
function searchMenu() {
  const query = searchInput.value.trim().toLowerCase();
  let total = 0;

  sections.forEach(section => {
    let sectionCount = 0;

    const cards = section.querySelectorAll(".food-card");

    cards.forEach(card => {
      const searchable = [
        card.querySelector("h3")?.innerText || "",
        card.querySelector("p")?.innerText || "",
        card.querySelector("h3")?.dataset.fa || "",
        card.querySelector("h3")?.dataset.en || "",
        card.querySelector("p")?.dataset.fa || "",
        card.querySelector("p")?.dataset.en || ""
      ].join(" ").toLowerCase();

      const matches = searchable.includes(query);

      card.style.display = matches ? "" : "none";

      if (matches) {
        sectionCount++;
        total++;
      }
    });

    section.style.display = sectionCount > 0 ? "" : "none";
  });

  noResults.style.display = total === 0 ? "block" : "none";
}

searchInput.addEventListener("input", searchMenu);

/* LANGUAGE */
languageBtn.addEventListener("click", () => {
  currentLanguage = currentLanguage === "fa" ? "en" : "fa";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir =
    currentLanguage === "fa" ? "rtl" : "ltr";

  document.querySelectorAll("[data-fa][data-en]").forEach(element => {
    element.textContent =
      currentLanguage === "fa"
        ? element.dataset.fa
        : element.dataset.en;
  });

  searchInput.placeholder =
    currentLanguage === "fa"
      ? searchInput.dataset.placeholderFa
      : searchInput.dataset.placeholderEn;

  languageBtn.textContent =
    currentLanguage === "fa" ? "EN" : "FA";
});

/* TOP = ALL */
window.addEventListener("scroll", () => {
  if (window.scrollY < 120) {
    categoryButtons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.category === "all"
      );
    });
  }
});

/* INITIAL */
searchMenu();

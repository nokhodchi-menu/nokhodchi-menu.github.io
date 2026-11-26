const categoryButtons = document.querySelectorAll(".category");
const foodCards = document.querySelectorAll(".food-card");
const searchInput = document.getElementById("searchInput");
const languageBtn = document.getElementById("languageBtn");
const noResults = document.getElementById("noResults");

let selectedCategory = "all";
let currentLanguage = "fa";

/* ===== FILTER MENU ===== */
function filterMenu() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  foodCards.forEach(card => {
    const category = card.dataset.category;

    const title = card.querySelector("h3");
    const description = card.querySelector("p");

    const searchText = (
      title.innerText + " " +
      description.innerText + " " +
      (title.dataset.fa || "") + " " +
      (title.dataset.en || "") + " " +
      (description.dataset.fa || "") + " " +
      (description.dataset.en || "")
    ).toLowerCase();

    const categoryMatch =
      selectedCategory === "all" ||
      category === selectedCategory;

    const searchMatch = searchText.includes(query);

    if (categoryMatch && searchMatch) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  noResults.style.display =
    visibleCount === 0 ? "block" : "none";
}

/* ===== CATEGORY BUTTONS ===== */
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    selectedCategory = button.dataset.category;

    filterMenu();
  });
});

/* ===== SEARCH ===== */
searchInput.addEventListener("input", filterMenu);

/* ===== LANGUAGE SWITCH ===== */
languageBtn.addEventListener("click", () => {
  currentLanguage =
    currentLanguage === "fa" ? "en" : "fa";

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

  filterMenu();
});

/* ===== INITIAL ===== */
filterMenu();

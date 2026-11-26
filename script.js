const buttons = document.querySelectorAll(".category");
const foods = document.querySelectorAll(".food-card");

buttons.forEach(button => {

  button.addEventListener("click", () => {

    // حذف حالت فعال از همه دسته‌ها
    buttons.forEach(btn => btn.classList.remove("active"));

    // فعال کردن دسته انتخاب‌شده
    button.classList.add("active");

    // دریافت دسته
    const selectedCategory = button.dataset.category;

    // فیلتر غذاها
    foods.forEach(food => {

      if (
        selectedCategory === "all" ||
        food.dataset.category === selectedCategory
      ) {
        food.style.display = "";
      } else {
        food.style.display = "none";
      }

    });

  });

});
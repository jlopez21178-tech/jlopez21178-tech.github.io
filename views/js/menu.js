const btnCategories = document.querySelectorAll(".categories button");
const btnFilters = document.querySelectorAll(".filters button");
const menuPlats = document.querySelectorAll(".menu > article")

btnCategories.forEach((category) => {
  category.addEventListener("click", () => {

    btnCategories.forEach((btn) => {
      btn.classList.remove("category-focus");
    });

    menuPlats.forEach((plat) => {
      if (plat.className == category.id || category.id == "todos") {
        plat.style.display = "flex";
      } else {
        plat.style.display = "none";
      }
    });

    category.classList.add("category-focus");
  });
});

btnFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filter.classList.toggle("filter-focus");
  });
});


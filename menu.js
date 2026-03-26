const btnCategories = document.querySelectorAll(".categories button");
const btnFilters = document.querySelectorAll(".filters button");

btnCategories.forEach((category) => {
  category.addEventListener("click", () => {
    category.classList.toggle("category-focus");
  });
});

btnFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filter.classList.toggle("filter-focus");
  });
});
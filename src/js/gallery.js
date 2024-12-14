import { flowers, categories } from '../helpers/flowers';

const container = document.querySelector('.js-gallery');
const select = document.querySelector('.js-select');

categories.map(category => {
  select.insertAdjacentHTML(
    'beforeend',
    `<option value="${category}">${category}</option>`
  );
});

create('Бестселлери');

select.addEventListener('change', onCategoryOptions);

function onCategoryOptions(e) {
  const value = e.currentTarget.value;
  create(value);
}

function create(value) {
  const filteredFlowers = flowers.filter(({ category }) => value === category);
  const markup = filteredFlowers
    .map(
      ({
        id,
        name,
        price,
        photo_1,
        photo_2,
      }) => `<li data-id="${id}" class="gallery-item">
    <div class="gallery-holder">
        <h3 class="gallery-subtitle">${name}</h3>
        <p class="gallery-subtitle">${price} грн</p>
    </div>
    <img
    srcset="${photo_2} 2x"
    src="${photo_1}" alt="${name}" width="274" height="346"/>
</li>`
    )
    .join('');
  container.innerHTML = markup;
}

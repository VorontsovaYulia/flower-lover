import { setCustomSelect } from '../helpers/quick_order_select';
import { closePopupBtnEl, openPopup, closePopup } from '../js/pop_up_for_order';

const orderFormEl = document.querySelector('.order-form');
const selectContainerEl = document.querySelector('.js-select-container');
const selectItemEl = document.querySelector('.js-select-item');

setCustomSelect(selectContainerEl, selectItemEl);

const selectSelectedEl = document.querySelector('.select-selected');
const labelOwnVersionEl = selectContainerEl.nextElementSibling;
const optionOwnVersionEl = selectContainerEl.lastElementChild;

const popupDescriptionSuccess =
  '<p class="popup-desc">Дякуємо за замовлення.</p><p class="popup-desc">Очікуйте на дзвінок від менеджера.</p>';

const popupDescriptionError =
  '<p class="popup-desc">На жаль, сталася помилка.</p><p class="popup-desc">Спробуйте ще раз.</p>';

optionOwnVersionEl.addEventListener('click', () => {
  if (selectSelectedEl.dataset.id) {
    labelOwnVersionEl.classList.remove('hiddenvisualy');
  }
  if (!selectSelectedEl.dataset.id) {
    labelOwnVersionEl.classList.add('hiddenvisualy');
  }
});

orderFormEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const {
    user_name,
    user_phone,
    number_of_bouquets,
    cost,
    reason_own_version,
    user_message,
  } = evt.currentTarget.elements;

  const data = {
    userName: user_name.value,
    userPhone: user_phone.value,
    numberOfBouquets: number_of_bouquets.value,
    cost: cost.value,
    reasonForPurchase: selectSelectedEl.textContent,
    reasonOwnVersion: reason_own_version.value,
    message: user_message.value,
  };

  console.log(data);
  orderFormEl.reset();
  selectSelectedEl.textContent = 'Привід покупки';
  labelOwnVersionEl.classList.add('hiddenvisualy');
  console.log('first', addQuickOrder(data));
  closePopupBtnEl.addEventListener('click', closePopup);
}

async function addQuickOrder(data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const resp = await fetch(
      'https://676ca9ac0e299dd2ddfd3e48.mockapi.io/order/quick-order',
      options
    );
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    openPopup(popupDescriptionSuccess);
    const data = await resp.json();
    console.log(data);
  } catch (_) {
    openPopup(popupDescriptionError);
  }
}
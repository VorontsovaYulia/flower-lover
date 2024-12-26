const popupEl = document.querySelector('.js-popup-for-order');
const closePopupBtnEl = document.querySelector('.js-popup-close');

function openPopup() {
  popupEl.classList.remove('pop-up-is-hidden');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
    popupEl.classList.add('pop-up-is-hidden');
    document.body.style.overflow = 'unset';
}

export { closePopupBtnEl, openPopup, closePopup };

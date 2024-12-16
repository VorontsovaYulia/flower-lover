const selectContainerEl = document.querySelector('.js-select-container');
const selectItemEl = document.querySelector('.js-select-item');

const numberOfOptions = selectItemEl.length;

const divForSelectSelectedEl = document.createElement('DIV');
divForSelectSelectedEl.classList.add('select-selected');
divForSelectSelectedEl.innerHTML =
  selectItemEl.options[selectItemEl.selectedIndex].innerHTML;
selectContainerEl.appendChild(divForSelectSelectedEl);

const divForSelectItemsEl = document.createElement('DIV');
divForSelectItemsEl.classList.add('select-items', 'select-hide');

for (let j = 1; j < numberOfOptions; j++) {
  const divOptionEl = document.createElement('DIV');
  divOptionEl.innerHTML = selectItemEl.options[j].innerHTML;
  divOptionEl.addEventListener('click', onClickDivOptionEl);
  divForSelectItemsEl.appendChild(divOptionEl);
}
selectContainerEl.appendChild(divForSelectItemsEl);

selectContainerEl.addEventListener('click', onClickCloseAllSelect);

function onClickDivOptionEl(event) {
  for (let i = 0; i < numberOfOptions; i++) {
    if (selectItemEl.options[i].innerHTML === this.innerHTML) {
      selectItemEl.selectedIndex = i;
      divForSelectSelectedEl.innerHTML = this.innerHTML;
      const sameAsSelectedEl = document.querySelectorAll('.same-as-selected');
      const sameAsSelectedElLenght = sameAsSelectedEl.length;

      for (let k = 0; k < sameAsSelectedElLenght; k++) {
        sameAsSelectedEl[k].classList.remove('same-as-selected');
      }
      this.classList.add('same-as-selected');
      break;
    }
  }
}

function onClickCloseAllSelect(event) {
  event.stopPropagation();
  closeAllSelect(divForSelectSelectedEl);
  divForSelectItemsEl.classList.toggle('select-hide');
  divForSelectSelectedEl.classList.toggle('select-arrow-active');
}

function closeAllSelect(element) {
  const arr = [];
  const divForSelectItemsElLenght = divForSelectItemsEl.length;
  const divForSelectSelectedElLenght = divForSelectSelectedEl.length;
  for (let i = 0; i < divForSelectSelectedElLenght; i++) {
    if (element === divForSelectSelectedEl[i]) {
      arr.push(i);
    } else {
      divForSelectSelectedEl[i].classList.remove('select-arrow-active');
    }
  }
  for (let i = 0; i < divForSelectItemsElLenght; i++) {
    if (arr.indexOf(i)) {
      divForSelectItemsEl[i].classList.add('select-hide');
    }
  }
}

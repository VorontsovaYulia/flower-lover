import { setCustomSelect } from "../helpers/quick_order_select";

const selectContainerEl = document.querySelector('.js-select-container');
const selectItemEl = document.querySelector('.js-select-item');

setCustomSelect(selectContainerEl, selectItemEl);
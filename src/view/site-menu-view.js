import AbstractView from './abstract-view';
import {MenuItem} from '../consts';

const createItemTemplate = ({type, name}) => {
  const labelClassName = type === 'new-task' ? 'control__label--new-task' : '';

  return `<input
      type="radio"
      name="control"
      id="control__${type}"
      value="${type}"
      class="control__input visually-hidden"
    />
    <label for="control__${type}" class="control__label ${labelClassName}">${name}</label>`;
};

const createSiteMenuTemplate = () => {
  const menuItems = Object.values(MenuItem).map(createItemTemplate).join('\n');

  return `<section class="control__btn-wrap">${menuItems}</section>`;
};

export default class SiteMenuView extends AbstractView {
  get template() {
    return createSiteMenuTemplate();
  }

  setActiveMenu = (activeMenu) => {
    const item = this.element.querySelector(`[value=${activeMenu}]`);

    if (item !== null) {
      item.checked = true;
    }
  }

  setItemClickHandler = (callback) => {
    this._callback.itemClick = callback;
    this.element.addEventListener('change', this.#itemClickHandler);
  }

  #itemClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.itemClick(evt.target.value);
  }
}

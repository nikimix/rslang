import Observer from '../Abstract/observer';
import { IMenuServise } from '../Interfaces/common';

export default class MenuService extends Observer implements IMenuServise {
  openMenu = (): void => {
    this.dispatch('open-menu');
  };

  closeMenu = (): void => {
    this.dispatch('close-menu');
  };

  showDarkLayer = (): void => {
    this.dispatch('show-dark-layer');
  };

  removeDarkLayer = (): void => {
    this.dispatch('remove-dark-layer');
  };
}

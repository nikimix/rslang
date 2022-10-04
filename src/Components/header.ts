import BaseComponent from '../Abstract/base-component';
import Services from '../Interfaces/services';
import Navigation from './navigation';
import DarkLayer from './dark-layer';
import ButtonWithCallback from './button-component';
import ContainerExitAutorise from './container-exit-autorise';

import AutoriseFormModal from './form-modal-autorise';
import EnterFormModal from './form-modal-enter';
import ContainerCoiceAutorise from './container-coice-autorise';

export default class Header extends BaseComponent {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('header', 'header');
  }

  render = () => {
    new ButtonWithCallback(
      this.element,
      this.services,
      'header__btn_openMenu',
      '',
      'button',
      this.services.menu.openMenu
    ).render();
    new Navigation(this.element, this.services).render();
    new DarkLayer(this.element, this.services).render();
    new ContainerCoiceAutorise(this.element, this.services).render();
    new ContainerExitAutorise(this.element, this.services).render();
    new AutoriseFormModal(this.element, this.services).render();
    new EnterFormModal(this.element, this.services).render();
    this.parent.appendChild(this.element);
  };
}

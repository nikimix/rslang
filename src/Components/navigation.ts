import BaseComponent from '../Abstract/base-component';
// import { getNavSetting } from '../Model/getSettings';
import linksProps from '../Settings/menu.json';
import Services from '../Interfaces/services';
import NavLink from './nav-link';
import ButtonWithCallback from './button-component';

export default class Navigation extends BaseComponent {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('nav', 'header__nav');
  }

  render = () => {
    new ButtonWithCallback(
      this.element,
      this.services,
      'header__btn_closeMenu',
      '',
      'button',
      this.services.menu.closeMenu
    ).render();

    const navList = new BaseComponent('ul', 'nav-list').element;
    linksProps.forEach((link) => new NavLink(navList, this.services, link).render());

    this.services.menu.add('close-menu', this.closeMenu);
    this.services.menu.add('open-menu', this.openMenu);
    this.services.menu.add('scroll-off', this.scrollOff);
    this.services.menu.add('scroll-on', this.scrollOn);

    this.element.appendChild(navList);
    this.parent.appendChild(this.element);
  };

  destroy = () => {
    this.services.menu.remove('close-menu', this.closeMenu);
    this.services.menu.remove('open-menu', this.openMenu);
    this.services.menu.remove('scroll-off', this.scrollOff);
    this.services.menu.remove('scroll-on', this.scrollOn);
    super.destroy();
  };

  closeMenu = () => {
    this.element.classList.remove('open');
    this.services.menu.removeDarkLayer();
    this.scrollOff();
  };

  openMenu = () => {
    this.element.classList.add('open');
    this.services.menu.showDarkLayer();
    this.scrollOn();
  };

  scrollOff = () => {
    document.body.style.overflow = '';
  };

  scrollOn = () => {
    document.body.style.overflow = 'hidden';
  };
}

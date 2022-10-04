import BaseComponent from '../Abstract/base-component';
import { ILinkProps } from '../Interfaces/common';
import Services from '../Interfaces/services';

export default class NavLink extends BaseComponent {
  private link?: HTMLElement;

  constructor(private readonly parent: HTMLElement, private readonly services: Services, private props: ILinkProps) {
    super('li', 'nav-list__item');
  }

  render = () => {
    const { content, path, game } = this.props;
    const link = new BaseComponent('a', 'nav-list__link').element;
    link.setAttribute('href', `#${path}`);
    link.textContent = `${content}`;
    link.onclick = () => {
      if (game) {
        this.services.levelSelection.gamePath = game;
      }
      this.services.menu.closeMenu();
    };
    this.element.appendChild(link);
    this.parent.appendChild(this.element);

    this.services.router.add('router', (router: string) => {
      if (path === router) {
        this.setActive();
      } else {
        this.removeActive();
      }
    });
  };

  setActive(): void {
    this.element.classList.add('active');
  }

  removeActive(): void {
    this.element.classList.remove('active');
    this.services.menu.dispatch('close-menu');
    this.services.menu.dispatch('scroll-off');
    if (document.querySelector('.owerflov'))
      (document.querySelector('.owerflov') as HTMLElement).style.display = 'none';
  }
}

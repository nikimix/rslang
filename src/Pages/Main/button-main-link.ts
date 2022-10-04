import BaseComponent from '../../Abstract/base-component';
import { ILinkButtonProps } from '../../Interfaces/common';
import Services from '../../Interfaces/services';

export default class ButtonLink extends BaseComponent {
  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private props: ILinkButtonProps
  ) {
    super('a', 'button__link');
  }

  render = () => {
    const { content, clas, path, game } = this.props;
    this.element.setAttribute('href', `#${path}`);
    this.element.classList.add(`${clas}`);
    this.element.textContent = `${content}`;
    if (this.element.textContent === 'Авторизация') {
      this.element.addEventListener('click', this.services.form.openAutoriseForm);
    }
    if (this.element.textContent === 'Войти') {
      this.element.addEventListener('click', this.services.form.openEnterForm);
    }
    if (this.element.textContent === 'Спринт') {
      this.element.addEventListener('click', () => {
        if (game) {
          this.services.levelSelection.gamePath = game;
        }
      });
    }
    if (this.element.textContent === 'Аудиовызов') {
      this.element.addEventListener('click', () => {
        if (game) {
          this.services.levelSelection.gamePath = game;
        }
      });
    }
    this.parent.appendChild(this.element);
  };

  destroy = () => {
    if (this.element.textContent === 'Авторизация') {
      this.element.removeEventListener('click', this.services.form.openAutoriseForm);
    }
    if (this.element.textContent === 'Войти') {
      this.element.removeEventListener('click', this.services.form.openEnterForm);
    }
    super.destroy();
  };
}

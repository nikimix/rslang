import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';

export default class ButtonNext extends BaseComponent<HTMLButtonElement> {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('button', `answers__btn-next btn`);
  }

  render = () => {
    this.element.addEventListener('click', this.showOrNext);
    document.addEventListener('keydown', this.showOrNext);

    this.services.audioCall.add('show-answer', this.changeBtnState);
    this.services.audioCall.add('next-word', this.update);

    this.element.textContent = 'не знаю';

    this.element.setAttribute('data-state', 'dont-know');

    this.parent.appendChild(this.element);
  };

  showOrNext = (evt: MouseEvent | KeyboardEvent) => {
    if (evt instanceof KeyboardEvent && evt.code !== 'Enter') {
      return;
    }
    if (evt instanceof KeyboardEvent) {
      evt.preventDefault();
      // if (evt.repeat) {
      //   return;
      // }
    }
    const state = this.element.getAttribute('data-state');
    if (state) {
      this.services.audioCall.onClickShowOrNext(state);
    }
  };

  changeBtnState = () => {
    this.element.textContent = 'дальше';
    this.element.setAttribute('data-state', 'next');
  };

  update = () => {
    this.element.textContent = 'не знаю';
    this.element.setAttribute('data-state', 'dont-know');
  };

  destroy = () => {
    this.element.removeEventListener('click', this.showOrNext);
    this.services.audioCall.remove('show-answer', this.changeBtnState);
    this.services.audioCall.remove('next-word', this.update);
    document.removeEventListener('keydown', this.showOrNext);

    super.destroy();
  };
}

import BaseComponent from '../Abstract/base-component';
import Services from '../Interfaces/services';
// import { ICallback } from '../Interfaces/interfaces';

export default class Button extends BaseComponent<HTMLButtonElement> {
  constructor(
    private readonly parent: HTMLElement,
    private readonly service: Services,
    private readonly classes: string,
    private readonly nameBtn: string,
    private readonly type: string
  ) {
    super('button', classes);
  }
  // private readonly callback: ICallback

  render = () => {
    this.element.textContent = `${this.nameBtn}`;
    this.element.setAttribute('type', `${this.type}`);
    this.parent.appendChild(this.element);
    (this.element as HTMLButtonElement).disabled = false;
    this.service.form.add('disabled-btn-autorise', this.disabledBtnAutorise);
    this.service.form.add('un-disabled-btn-autorise', this.unDisabledBtnAutorise);
    if (this.element.textContent === `Авторизация`) {
      this.element.addEventListener('click', this.service.form.clickAutorise);
    }
    if (this.element.textContent === `Войти`) {
      this.element.addEventListener('click', this.service.form.clickEnter);
    }
  };

  destroy = () => {
    if (this.element.textContent === `Авторизация`)
      this.element.removeEventListener('click', this.service.form.clickAutorise);
    if (this.element.textContent === `Войти`) this.element.removeEventListener('click', this.service.form.clickEnter);
    this.service.form.remove('disabled-btn-autorise', this.disabledBtnAutorise);
    this.service.form.remove('un-disabled-btn-autorise', this.unDisabledBtnAutorise);
    super.destroy();
  };

  disabledBtnAutorise = () => {
    (this.element as HTMLButtonElement).disabled = true;
  };

  unDisabledBtnAutorise = () => {
    (this.element as HTMLButtonElement).disabled = false;
  };
}

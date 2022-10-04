import BaseComponent from '../Abstract/base-component';
import Services from '../Interfaces/services';
import { ICallback } from '../Interfaces/common';

export default class ButtonAutorise extends BaseComponent<HTMLButtonElement> {
  constructor(
    private readonly parent: HTMLElement,
    private readonly service: Services,
    private readonly classes: string,
    private readonly nameBtn: string,
    private readonly type: string,
    private readonly callback: ICallback
  ) {
    super('button', classes);
  }

  render = () => {
    this.element.textContent = `${this.nameBtn}`;
    this.element.setAttribute('type', `${this.type}`);
    this.element.addEventListener('click', this.callback);
    this.service.form.add('hide-button-autorise', this.hideButtonAutorise);
    this.service.form.add('show-button-autorise', this.showBtnAutorise);
    this.parent.appendChild(this.element);
  };

  hideButtonAutorise = () => {
    this.element.style.display = 'none';
  };

  showBtnAutorise = () => {
    this.element.style.display = 'block';
  };

  destroy = () => {
    this.element.removeEventListener('click', this.callback);
    this.service.form.remove('hide-button-autorise', this.hideButtonAutorise);
    this.service.form.remove('show-button-autorise', this.showBtnAutorise);
    super.destroy();
  };
}

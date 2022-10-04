import BaseComponent from '../Abstract/base-component';
import Services from '../Interfaces/services';
import { ICallback } from '../Interfaces/common';

export default class ButtonWithCallback extends BaseComponent<HTMLButtonElement> {
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
    this.parent.appendChild(this.element);
  };

  destroy = () => {
    this.element.removeEventListener('click', this.callback);
    super.destroy();
  };
}
